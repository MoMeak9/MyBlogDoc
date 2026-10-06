/* Versioned offline search. Automatic preparation yields to visible-page activity. */
const SCOPE = new URL(self.registration.scope);
const BASE = SCOPE.pathname;
const PREFIX = `myblogdoc-search-v1:${encodeURIComponent(BASE)}:`;
const MARKER = new URL(".offline-search-complete.json", SCOPE).href;
const VISITED_STATE = new URL(".offline-search-visited.json", SCOPE).href;
const VISITED_CACHE = `${PREFIX}visited`;
const MAX_VISITED = 20;
const MAX_VISITED_ASSETS = 256;
let snapshotsPromise;
let warmJob;
let epoch = 0;
let visitedQueue = Promise.resolve();
const automaticClients = new Map();
let automaticQuotaBlocked = false;

const scoped = (url) =>
  url.origin === SCOPE.origin && url.pathname.startsWith(BASE);
const validVersion = (value) =>
  typeof value === "string" && /^[\w.-]{1,128}$/.test(value);
const jsonResponse = (value) =>
  new Response(JSON.stringify(value), {
    headers: { "Content-Type": "application/json" },
  });
const stateFor = (snapshot) =>
  snapshot
    ? {
        phase: "ready",
        hasDownload: true,
        version: snapshot.version,
        completed: snapshot.files.length,
        total: snapshot.files.length,
        totalBytes: snapshot.totalBytes,
      }
    : { phase: "available", hasDownload: false };

async function networkFetch(resource, options = {}, timeout = 45000) {
  const controller = new AbortController();
  const parent = options.signal;
  const abort = () => controller.abort();
  if (parent?.aborted) controller.abort();
  else parent?.addEventListener("abort", abort, { once: true });
  const timer = setTimeout(abort, timeout);
  try {
    return await fetch(resource, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
    parent?.removeEventListener("abort", abort);
  }
}

function manifestData(value) {
  if (
    !value ||
    !validVersion(value.version) ||
    value.base !== BASE ||
    !Array.isArray(value.files) ||
    !Number.isSafeInteger(value.totalBytes) ||
    value.totalBytes < 0
  )
    throw new Error("Invalid offline search manifest.");
  const seen = new Set();
  const files = value.files.map((file) => {
    if (
      typeof file.url !== "string" ||
      !Number.isSafeInteger(file.bytes) ||
      file.bytes < 0
    )
      throw new Error("Invalid search asset.");
    const url = new URL(file.url, SCOPE);
    if (
      !scoped(url) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      /%(?:2f|5c)/i.test(url.pathname) ||
      [MARKER, VISITED_STATE].includes(url.href) ||
      seen.has(url.href)
    )
      throw new Error("Search asset leaves its project scope.");
    seen.add(url.href);
    return { url: url.href, bytes: file.bytes };
  });
  if (
    !files.length ||
    files.reduce((sum, file) => sum + file.bytes, 0) !== value.totalBytes
  )
    throw new Error("Search asset sizes do not match the manifest.");
  for (const required of [
    "search-version.json",
    "search-dictionary.json",
    "content-index.json",
    "blog/",
    "en/blog/",
    "pagefind/pagefind.js",
  ]) {
    if (!seen.has(new URL(required, SCOPE).href))
      throw new Error("Offline search manifest is missing a required asset.");
  }
  return {
    version: value.version,
    base: BASE,
    articleCount: value.articleCount,
    totalBytes: value.totalBytes,
    files,
  };
}

async function snapshots() {
  if (!snapshotsPromise)
    snapshotsPromise = (async () => {
      const complete = [];
      for (const name of await caches.keys()) {
        if (!name.startsWith(`${PREFIX}pack:`)) continue;
        const cache = await caches.open(name);
        const response = await cache.match(MARKER);
        if (!response) continue;
        try {
          const marker = await response.json();
          const manifest = manifestData(marker);
          const keys = new Set(
            (await cache.keys()).map((request) => request.url),
          );
          if (!manifest.files.every((file) => keys.has(file.url))) continue;
          complete.push({
            ...manifest,
            name,
            cache,
            completedAt: marker.completedAt || 0,
            urls: new Set(manifest.files.map((file) => file.url)),
          });
        } catch {
          /* An interrupted or malformed pack is never published. */
        }
      }
      return complete.sort((a, b) => b.completedAt - a.completedAt);
    })().catch((error) => {
      snapshotsPromise = undefined;
      throw error;
    });
  return snapshotsPromise;
}

async function broadcast(state) {
  for (const client of await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  })) {
    if (scoped(new URL(client.url)))
      client.postMessage({ type: "OFFLINE_SEARCH_STATE", state });
  }
}
function progress(job) {
  for (const port of job.ports) {
    try {
      port.postMessage({ type: "OFFLINE_SEARCH_PROGRESS", state: job.state });
    } catch {
      job.ports.delete(port);
    }
  }
  void broadcast(job.state);
}
async function offlineCacheStatus() {
  return warmJob ? warmJob.state : stateFor((await snapshots())[0]);
}

async function automaticPermission(job) {
  if (!job.automatic) return;
  while (true) {
    job.controller.signal.throwIfAborted();
    let permitted = false;
    let foregroundBusy = false;
    for (const [id, policy] of automaticClients) {
      const client = await self.clients.get(id);
      if (!client || !scoped(new URL(client.url))) {
        automaticClients.delete(id);
        continue;
      }
      if (client.visibilityState === "visible") {
        if (policy.busy) foregroundBusy = true;
        if (policy.allowed) permitted = true;
      }
    }
    permitted = permitted && !foregroundBusy;
    if (job.state.paused === permitted) {
      job.state.paused = !permitted;
      progress(job);
    }
    if (permitted) return;
    progress(job); // A paused sender still gets a heartbeat without fetching any assets.
    await new Promise((resolve, reject) => {
      const finish = () => {
        clearTimeout(timer);
        job.wake.delete(finish);
        job.controller.signal.removeEventListener("abort", abort);
        resolve();
      };
      const abort = () => {
        finish();
        reject(job.controller.signal.reason);
      };
      const timer = setTimeout(finish, 15000);
      job.wake.add(finish);
      job.controller.signal.addEventListener("abort", abort, { once: true });
      if (job.controller.signal.aborted) abort();
    });
  }
}

async function resumableCache(manifest, complete) {
  const preserved = complete[0]?.name;
  let resumed;
  for (const name of await caches.keys()) {
    if (!name.startsWith(`${PREFIX}pack:`) || name === preserved) continue;
    const cache = await caches.open(name);
    if (
      !resumed &&
      name.startsWith(`${PREFIX}pack:${manifest.version}:`) &&
      !(await cache.match(MARKER))
    ) {
      try {
        const saved = manifestData(
          await (
            await cache.match(new URL("search-manifest.json", SCOPE).href)
          ).json(),
        );
        if (JSON.stringify(saved.files) === JSON.stringify(manifest.files))
          resumed = { name, cache };
      } catch {
        /* A partial pack is reusable only with the exact same reviewed manifest. */
      }
    }
    if (resumed?.name !== name) await caches.delete(name);
  }
  return resumed;
}

async function downloadPack(job, expectedVersion) {
  const controller = job.controller;
  const manifestUrl = new URL("search-manifest.json", SCOPE).href;
  let cacheName;
  let committed = false;
  let quotaFailure = false;
  try {
    await automaticPermission(job);
    const response = await networkFetch(manifestUrl, {
      cache: "no-store",
      signal: controller.signal,
      ...(job.automatic ? { priority: "low" } : {}),
    });
    if (!response.ok)
      throw new Error("Offline search manifest could not be loaded.");
    const rawManifest = await response.json();
    const manifest = manifestData(rawManifest);
    if (expectedVersion && manifest.version !== expectedVersion)
      throw new Error("Search content changed. Try the download again.");
    const complete = await snapshots();
    const existing = complete.find((item) => item.version === manifest.version);
    if (existing) return stateFor(existing);
    // Same-version partial downloads can resume after a tab closes or a worker stops.
    const resumed = await resumableCache(manifest, complete);
    snapshotsPromise = undefined;
    cacheName =
      resumed?.name ||
      `${PREFIX}pack:${manifest.version}:${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const cache = resumed?.cache || (await caches.open(cacheName));
    await cache.put(manifestUrl, jsonResponse(rawManifest));
    job.state = {
      phase: "downloading",
      hasDownload: complete.length > 0,
      version: manifest.version,
      completed: 0,
      total: manifest.files.length,
      totalBytes: manifest.totalBytes,
      ...(job.automatic ? { paused: false } : {}),
    };
    progress(job);
    let position = 0;
    const workers = Array.from(
      { length: Math.min(job.automatic ? 1 : 4, manifest.files.length) },
      async () => {
        try {
          while (position < manifest.files.length) {
            await automaticPermission(job);
            controller.signal.throwIfAborted();
            if (position >= manifest.files.length) break;
            const file = manifest.files[position++];
            const prior = await cache.match(file.url);
            const reusable =
              prior?.ok &&
              (await prior.clone().arrayBuffer()).byteLength === file.bytes;
            const asset = reusable
              ? prior
              : await networkFetch(file.url, {
                  cache: "no-store",
                  signal: controller.signal,
                  ...(job.automatic ? { priority: "low" } : {}),
                });
            if (
              !asset.ok ||
              !scoped(new URL(asset.url || file.url)) ||
              (await asset.clone().arrayBuffer()).byteLength !== file.bytes
            )
              throw new Error("A search asset changed or could not be saved.");
            controller.signal.throwIfAborted();
            if (!reusable) await cache.put(file.url, asset);
            job.state.completed++;
            progress(job);
          }
        } catch (error) {
          controller.abort();
          throw error;
        }
      },
    );
    const results = await Promise.allSettled(workers);
    const failure = results.find((result) => result.status === "rejected");
    if (failure) throw failure.reason;
    await automaticPermission(job);
    controller.signal.throwIfAborted();
    const versionResponse = await networkFetch(
      new URL("search-version.json", SCOPE),
      {
        cache: "no-store",
        signal: controller.signal,
        ...(job.automatic ? { priority: "low" } : {}),
      },
    );
    if (
      !versionResponse.ok ||
      (await versionResponse.json()).version !== manifest.version
    )
      throw new Error("Search content changed during the download.");
    controller.signal.throwIfAborted();
    await cache.put(manifestUrl, jsonResponse(rawManifest));
    controller.signal.throwIfAborted();
    // This is the only publication point: every listed asset is already present.
    await cache.put(
      MARKER,
      jsonResponse({ ...manifest, completedAt: Date.now() }),
    );
    committed = true;
    snapshotsPromise = undefined;
    return stateFor({ ...manifest });
  } catch (error) {
    quotaFailure =
      error?.name === "QuotaExceededError" ||
      /quota/i.test(error?.message || "");
    throw error;
  } finally {
    if (cacheName && !committed && (!job.automatic || quotaFailure))
      await caches.delete(cacheName);
    snapshotsPromise = undefined;
  }
}

self.addEventListener("install", (event) =>
  event.waitUntil(self.skipWaiting()),
);
self.addEventListener("activate", (event) =>
  event.waitUntil(self.clients.claim()),
);
self.addEventListener("message", (event) => {
  const port = event.ports?.[0];
  if (!event.source?.url || !scoped(new URL(event.source.url))) return;
  if (!port && event.data?.type !== "OFFLINE_SEARCH_ACTIVITY") return;
  event.waitUntil(
    (async () => {
      try {
        let state;
        if (event.data?.type === "OFFLINE_SEARCH_ACTIVITY") {
          if (event.source.id)
            automaticClients.set(event.source.id, {
              allowed: event.data.allowed === true,
              busy: event.data.busy === true,
            });
          if (warmJob?.automatic) for (const wake of [...warmJob.wake]) wake();
          state = await offlineCacheStatus();
        } else if (event.data?.type === "OFFLINE_SEARCH_STATUS")
          state = await offlineCacheStatus();
        else if (event.data?.type === "OFFLINE_SEARCH_CLAIM") {
          await self.clients.claim();
          state = await offlineCacheStatus();
        } else if (event.data?.type === "OFFLINE_SEARCH_DOWNLOAD") {
          if (event.data.automatic === true && automaticQuotaBlocked)
            throw Object.assign(
              new Error("Offline storage quota is unavailable."),
              { name: "QuotaExceededError" },
            );
          if (!warmJob) {
            const complete = await snapshots();
            if (!warmJob) {
              const job = {
                controller: new AbortController(),
                ports: new Set(),
                wake: new Set(),
                automatic: event.data.automatic === true,
                state: {
                  phase: "downloading",
                  hasDownload: complete.length > 0,
                  completed: 0,
                  version: event.data.expectedVersion,
                  ...(event.data.automatic === true ? { paused: false } : {}),
                },
              };
              warmJob = job;
              job.promise = downloadPack(job, event.data.expectedVersion)
                .then(async (result) => {
                  await broadcast(result);
                  return result;
                })
                .catch(async (error) => {
                  const quota =
                    error?.name === "QuotaExceededError" ||
                    /quota/i.test(error?.message || "");
                  if (quota && job.automatic) automaticQuotaBlocked = true;
                  const complete = await snapshots().catch(() => []);
                  await broadcast({
                    ...job.state,
                    phase: "error",
                    hasDownload: complete.length > 0,
                    errorKind: quota ? "quota" : "network",
                  });
                  throw error;
                })
                .finally(() => {
                  if (warmJob === job) warmJob = undefined;
                });
            }
          }
          const job = warmJob;
          job.ports.add(port);
          port.postMessage({
            type: "OFFLINE_SEARCH_PROGRESS",
            state: job.state,
          });
          try {
            state = await job.promise;
          } finally {
            job.ports.delete(port);
          }
        } else if (event.data?.type === "OFFLINE_SEARCH_REMOVE") {
          epoch++;
          automaticQuotaBlocked = false;
          if (warmJob) {
            warmJob.controller.abort();
            await warmJob.promise.catch(() => {});
          }
          await visitedQueue.catch(() => {});
          for (const name of await caches.keys())
            if (name.startsWith(PREFIX)) await caches.delete(name);
          snapshotsPromise = undefined;
          state = { phase: "available", hasDownload: false };
          await broadcast(state);
        } else return;
        port?.postMessage({ type: "OFFLINE_SEARCH_REPLY", ok: true, state });
      } catch (error) {
        port?.postMessage({
          type: "OFFLINE_SEARCH_REPLY",
          ok: false,
          error: error?.message || "Offline search operation failed.",
          code: error?.name,
        });
      }
    })(),
  );
});

function safeQueryPath(url) {
  const path = url.pathname.slice(BASE.length);
  return /^(?:pagefind\/|_astro\/|(?:images|content-assets)\/.+\.(?:svg|png|jpe?g|avif|webp)$|(?:content-index|search-version|search-manifest)\.json$|(?:en\/)?blog\/$)/i.test(
    path,
  );
}
async function cachedResponse(url) {
  const complete = await snapshots();
  if (!complete.length) return undefined;
  const canonical = new URL(url.href);
  canonical.hash = "";
  const relativePath = url.pathname.slice(BASE.length);
  if (safeQueryPath(url)) canonical.search = "";
  const tag = relativePath.startsWith("pagefind/")
    ? url.searchParams.get("v") ||
      url.searchParams.get("ts") ||
      url.searchParams.get("metaCacheTag")
    : null;
  const eligible = tag
    ? complete.filter((snapshot) => snapshot.version === tag)
    : complete;
  for (const snapshot of eligible) {
    if (
      !snapshot.urls.has(canonical.href) &&
      relativePath !== "search-manifest.json"
    )
      continue;
    const response = await snapshot.cache.match(canonical.href);
    if (response) return response;
  }
  if (tag && !eligible.length) return undefined;
  const visited = await caches.open(VISITED_CACHE);
  return visited.match(url.href);
}

function visitable(url, request) {
  const path = url.pathname.slice(BASE.length);
  if (request.mode === "navigate") return /^(?:en\/)?posts\/.+\/$/.test(path);
  return /^(?:_astro\/.+\.(?:js|css)|images\/.+\.(?:avif|webp|png|jpe?g|svg)|content-assets\/.+\.(?:svg|png|jpe?g|webp|avif|mp4|webm|woff2?))$/i.test(
    path,
  );
}
function rememberVisit(url, request, response, requestEpoch) {
  if (!response.ok || !visitable(url, request)) return Promise.resolve();
  const task = visitedQueue
    .catch(() => {})
    .then(async () => {
      if (epoch !== requestEpoch || !(await snapshots()).length) return;
      const cache = await caches.open(VISITED_CACHE);
      await cache.put(url.href, response);
      const prior = await cache.match(VISITED_STATE);
      const record = prior ? await prior.json() : { urls: [], assets: [] };
      const key = request.mode === "navigate" ? "urls" : "assets";
      record[key] = [
        ...(record[key] || []).filter((value) => value !== url.href),
        url.href,
      ];
      const limit = key === "urls" ? MAX_VISITED : MAX_VISITED_ASSETS;
      while (record[key].length > limit)
        await cache.delete(record[key].shift());
      await cache.put(VISITED_STATE, jsonResponse(record));
    })
    .catch(() => {}); // Quota exhaustion for optional reading must not break live pages.
  visitedQueue = task;
  return task;
}
function filteredArchiveRedirect(url) {
  const match = url.pathname
    .slice(BASE.length)
    .match(/^(en\/)?blog\/[1-9]\d*\/$/);
  if (
    !match ||
    (!url.searchParams.has("q") && !url.searchParams.has("category"))
  )
    return undefined;
  const archive = new URL(match[1] ? "en/blog/" : "blog/", SCOPE);
  archive.search = url.search;
  archive.hash = url.hash;
  return Response.redirect(archive.href, 302);
}
function offlinePage(url) {
  const english = url.pathname.slice(BASE.length).startsWith("en/");
  const archive = new URL(english ? "en/blog/" : "blog/", SCOPE).pathname;
  const title = english
    ? "This page is not saved offline."
    : "此页面尚未保存到离线缓存。";
  const description = english
    ? "Downloaded search is available. Articles can be read offline after you visit them."
    : "已下载的文章搜索仍可使用。访问过的文章可供离线阅读。";
  return new Response(
    `<!doctype html><html lang="${english ? "en" : "zh-CN"}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>body{font:18px/1.7 system-ui;margin:10vh auto;padding:24px;max-width:640px;background:#faf9f6;color:#282522}a{color:inherit}h1{font-size:28px}</style><h1>${title}</h1><p>${description}</p><a href="${archive}">${english ? "Open offline search" : "打开离线搜索"}</a></html>`,
    {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || !scoped(url)) return;
  const requestEpoch = epoch;
  event.respondWith(
    (async () => {
      try {
        const response = await networkFetch(request, {}, 15000);
        if (response.ok) {
          event.waitUntil(
            rememberVisit(url, request, response.clone(), requestEpoch),
          );
          return response;
        }
        return (await cachedResponse(url)) || response;
      } catch {
        const saved = await cachedResponse(url);
        if (saved) return saved;
        if (request.mode === "navigate" && (await snapshots()).length)
          return filteredArchiveRedirect(url) || offlinePage(url);
        return Response.error();
      }
    })(),
  );
});
