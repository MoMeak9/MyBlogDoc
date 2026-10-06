import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const workerSource = readFileSync(
  new URL("../public/search-sw.js", import.meta.url),
  "utf8",
);
const scope = "https://example.test/MyBlogDoc/";
const key = (request) =>
  typeof request === "string" ? new URL(request).href : request.url;

class FakeCache {
  entries = new Map();
  async put(request, response) {
    this.entries.set(key(request), response.clone());
  }
  async match(request) {
    return this.entries.get(key(request))?.clone();
  }
  async delete(request) {
    return this.entries.delete(key(request));
  }
  async keys() {
    return [...this.entries.keys()].map((url) => new Request(url));
  }
}
function harness() {
  const handlers = new Map();
  const storage = new Map();
  const routes = new Map();
  const calls = [];
  const priorities = [];
  let online = true;
  let visible = true;
  let fetchHook;
  const caches = {
    async keys() {
      return [...storage.keys()];
    },
    async open(name) {
      if (!storage.has(name)) storage.set(name, new FakeCache());
      return storage.get(name);
    },
    async delete(name) {
      return storage.delete(name);
    },
  };
  const context = vm.createContext({
    self: {
      registration: { scope },
      addEventListener: (type, callback) => handlers.set(type, callback),
      clients: {
        claim: async () => {},
        matchAll: async () => [],
        get: async (id) => ({
          id,
          url: `${scope}blog/`,
          visibilityState: visible ? "visible" : "hidden",
        }),
      },
      skipWaiting: async () => {},
    },
    caches,
    URL,
    Request,
    Response,
    AbortController,
    setTimeout,
    clearTimeout,
    fetch: async (resource, options) => {
      const url =
        typeof resource === "string"
          ? resource
          : resource instanceof URL
            ? resource.href
            : resource.url;
      calls.push(url);
      priorities.push({ url, priority: options?.priority });
      if (fetchHook) await fetchHook(url, options);
      if (!online || options?.signal?.aborted) throw new Error("Offline");
      const route = routes.get(url);
      if (!route) return new Response("missing", { status: 404 });
      return new Response(route, {
        headers: {
          "Content-Type": url.endsWith(".json")
            ? "application/json"
            : "text/plain",
        },
      });
    },
  });
  vm.runInContext(workerSource, context);
  const message = async (type, detail = {}) => {
    const messages = [];
    let complete;
    handlers.get("message")({
      data: { type, ...detail },
      source: { id: "archive-client", url: `${scope}blog/` },
      ports: [{ postMessage: (value) => messages.push(value) }],
      waitUntil: (promise) => {
        complete = promise;
      },
    });
    await complete;
    return messages.findLast((item) => item.type === "OFFLINE_SEARCH_REPLY");
  };
  const request = async (path, navigate = false) => {
    let response;
    const pending = [];
    handlers.get("fetch")({
      request: {
        url: new URL(path, scope).href,
        method: "GET",
        mode: navigate ? "navigate" : "cors",
      },
      respondWith: (promise) => {
        response = promise;
      },
      waitUntil: (promise) => pending.push(promise),
    });
    const result = await response;
    await Promise.all(pending);
    return result;
  };
  return {
    storage,
    routes,
    calls,
    priorities,
    hook: (callback) => {
      fetchHook = callback;
    },
    visibility: (value) => {
      visible = value;
    },
    message,
    request,
    offline: () => {
      online = false;
    },
    online: () => {
      online = true;
    },
  };
}

function installRoutes(env, version = "version-1") {
  const assets = {
    "search-version.json": JSON.stringify({ version }),
    "search-dictionary.json": JSON.stringify({
      words: ["React", "never-queried"],
    }),
    "content-index.json": JSON.stringify({
      articles: [{ id: "unknown-term" }],
    }),
    "blog/": "zh archive shell",
    "en/blog/": "en archive shell",
    "pagefind/pagefind.js": `module-${version}`,
    "pagefind/pagefind-entry.json": `metadata-${version}`,
    "pagefind/fragment/never-queried.pf_fragment": `never queried data ${version}`,
    "pagefind/wasm.zh.pagefind": "wasm payload",
    "_astro/journal.123.js": "archive application",
    "content-assets/cover.svg": "<svg>cover</svg>",
  };
  const files = Object.entries(assets).map(([path, text]) => {
    const url = new URL(path, scope).href;
    env.routes.set(url, text);
    return { url, bytes: Buffer.byteLength(text) };
  });
  const manifest = {
    version,
    base: "/MyBlogDoc/",
    articleCount: 1,
    files,
    totalBytes: files.reduce((sum, file) => sum + file.bytes, 0),
  };
  env.routes.set(
    new URL("search-manifest.json", scope).href,
    JSON.stringify(manifest),
  );
  return manifest;
}

test("status performs no corpus fetch; one complete pack supports new offline queries and both query shells", async () => {
  const env = harness();
  const manifest = installRoutes(env);
  assert.equal(
    (await env.message("OFFLINE_SEARCH_STATUS")).state.phase,
    "available",
  );
  assert.equal(env.calls.length, 0);
  const reply = await env.message("OFFLINE_SEARCH_DOWNLOAD", {
    expectedVersion: manifest.version,
  });
  assert.equal(reply.ok, true);
  assert.equal(reply.state.phase, "ready");
  assert.equal(reply.state.hasDownload, true);
  assert.equal(reply.state.completed, manifest.files.length);
  env.offline();
  assert.equal(
    await (
      await env.request("pagefind/fragment/never-queried.pf_fragment")
    ).text(),
    "never queried data version-1",
  );
  assert.equal(
    await (await env.request("pagefind/pagefind.js?v=version-1")).text(),
    "module-version-1",
  );
  assert.equal(
    await (
      await env.request("pagefind/pagefind-entry.json?ts=version-1")
    ).text(),
    "metadata-version-1",
  );
  assert.equal(
    await (await env.request("blog/?q=never-used&category=Vue", true)).text(),
    "zh archive shell",
  );
  assert.equal(
    await (await env.request("en/blog/?q=another-new-query", true)).text(),
    "en archive shell",
  );
});

test("a failed update cannot publish a partial pack or mix version-tagged metadata", async () => {
  const env = harness();
  installRoutes(env);
  await env.message("OFFLINE_SEARCH_DOWNLOAD", {
    expectedVersion: "version-1",
  });
  installRoutes(env, "version-2");
  env.routes.delete(
    new URL("pagefind/fragment/never-queried.pf_fragment", scope).href,
  );
  const failed = await env.message("OFFLINE_SEARCH_DOWNLOAD", {
    expectedVersion: "version-2",
  });
  assert.equal(failed.ok, false);
  const status = (await env.message("OFFLINE_SEARCH_STATUS")).state;
  assert.equal(status.phase, "ready");
  assert.equal(status.version, "version-1");
  assert.equal(
    [...env.storage.keys()].filter((name) => name.includes("pack:")).length,
    1,
  );
  env.offline();
  assert.equal(
    await (
      await env.request("pagefind/pagefind-entry.json?ts=version-1")
    ).text(),
    "metadata-version-1",
  );
  assert.equal(
    (await env.request("pagefind/pagefind-entry.json?ts=version-2")).status,
    0,
  );
});

test("foreign-scope manifests are rejected and clear preserves another application's cache", async () => {
  const env = harness();
  const manifest = installRoutes(env);
  manifest.files.push({
    url: "https://example.test/another-app/private.json",
    bytes: 1,
  });
  manifest.totalBytes++;
  env.routes.set(
    new URL("search-manifest.json", scope).href,
    JSON.stringify(manifest),
  );
  assert.equal((await env.message("OFFLINE_SEARCH_DOWNLOAD")).ok, false);
  installRoutes(env);
  await env.message("OFFLINE_SEARCH_DOWNLOAD");
  env.storage.set("another-application-cache", new FakeCache());
  const reply = await env.message("OFFLINE_SEARCH_REMOVE");
  assert.equal(reply.state.phase, "available");
  assert.equal(reply.state.hasDownload, false);
  assert.deepEqual([...env.storage.keys()], ["another-application-cache"]);
});

test("a pack without the complete search dictionary cannot be marked ready", async () => {
  const env = harness();
  const manifest = installRoutes(env);
  const dictionaryUrl = new URL("search-dictionary.json", scope).href;
  const dictionary = manifest.files.find((file) => file.url === dictionaryUrl);
  manifest.files = manifest.files.filter((file) => file.url !== dictionaryUrl);
  manifest.totalBytes -= dictionary.bytes;
  env.routes.set(
    new URL("search-manifest.json", scope).href,
    JSON.stringify(manifest),
  );
  const reply = await env.message("OFFLINE_SEARCH_DOWNLOAD");
  assert.equal(reply.ok, false);
  assert.match(reply.error, /required asset/);
  assert.equal(
    (await env.message("OFFLINE_SEARCH_STATUS")).state.hasDownload,
    false,
  );
  installRoutes(env);
  assert.equal(
    (await env.message("OFFLINE_SEARCH_DOWNLOAD")).state.phase,
    "ready",
  );
  env.offline();
  assert.deepEqual(await (await env.request("search-dictionary.json")).json(), {
    words: ["React", "never-queried"],
  });
});

test("quota failure at the publication marker leaves the previous complete snapshot usable", async () => {
  const env = harness();
  installRoutes(env);
  await env.message("OFFLINE_SEARCH_DOWNLOAD");
  installRoutes(env, "version-2");
  const set = env.storage.set.bind(env.storage);
  env.storage.set = (name, cache) => {
    if (name.includes("pack:version-2:")) {
      const put = cache.put.bind(cache);
      cache.put = async (request, response) => {
        if (key(request).endsWith(".offline-search-complete.json"))
          throw new Error("QuotaExceededError");
        return put(request, response);
      };
    }
    return set(name, cache);
  };
  assert.equal(
    (
      await env.message("OFFLINE_SEARCH_DOWNLOAD", {
        expectedVersion: "version-2",
      })
    ).ok,
    false,
  );
  assert.equal(
    (await env.message("OFFLINE_SEARCH_STATUS")).state.version,
    "version-1",
  );
  env.offline();
  assert.equal(
    await (
      await env.request("pagefind/fragment/never-queried.pf_fragment")
    ).text(),
    "never queried data version-1",
  );
});

test("optional reading keeps at most 20 exact article URLs and supplies an honest uncached-page fallback", async () => {
  const env = harness();
  installRoutes(env);
  await env.message("OFFLINE_SEARCH_DOWNLOAD");
  for (let index = 0; index < 22; index++) {
    const path = `posts/article-${index}/`;
    env.routes.set(new URL(path, scope).href, `article ${index}`);
    await env.request(path, true);
  }
  env.offline();
  assert.equal(
    await (await env.request("posts/article-21/", true)).text(),
    "article 21",
  );
  assert.equal((await env.request("posts/article-0/", true)).status, 503);
  assert.equal(
    (await env.request("posts/article-21/?different=1", true)).status,
    503,
  );
  const cache = [...env.storage.entries()].find(([name]) =>
    name.endsWith(":visited"),
  )[1];
  assert.equal(
    (await cache.keys()).filter((request) => request.url.includes("/posts/"))
      .length,
    20,
  );
});

test("offline filtered numbered archives redirect to the matching language shell and keep every query parameter", async () => {
  const env = harness();
  installRoutes(env);
  await env.message("OFFLINE_SEARCH_DOWNLOAD");
  const query = "?q=React%20hooks&category=React&page=3&custom=keep";
  env.routes.set(
    new URL(`en/blog/2/${query}`, scope).href,
    "live numbered archive",
  );
  assert.equal(
    await (await env.request(`en/blog/2/${query}`, true)).text(),
    "live numbered archive",
  );
  env.offline();
  for (const [path, shell, body] of [
    [`en/blog/2/${query}`, `en/blog/${query}`, "en archive shell"],
    [
      "blog/6/?category=Vue&page=2",
      "blog/?category=Vue&page=2",
      "zh archive shell",
    ],
  ]) {
    const response = await env.request(path, true);
    assert.equal(response.status, 302);
    assert.equal(response.headers.get("Location"), new URL(shell, scope).href);
    assert.equal(
      await (await env.request(response.headers.get("Location"), true)).text(),
      body,
    );
  }
  assert.equal((await env.request("blog/2/", true)).status, 503);
  assert.equal((await env.request("en/blog/2/?page=3", true)).status, 503);
});

const delay = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));
async function until(predicate) {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await predicate()) return;
    await delay(2);
  }
  assert.fail("The expected asynchronous state did not arrive.");
}

test("automatic warming uses one low-priority request, pauses when hidden/busy, and leaves a foreground query free", async () => {
  const env = harness();
  const manifest = installRoutes(env);
  const held = new Set(manifest.files.slice(0, 1).map((file) => file.url));
  let release;
  const hold = new Promise((resolve) => {
    release = resolve;
  });
  let active = 0;
  let maximum = 0;
  env.hook(async (url, options) => {
    if (options?.priority !== "low" || !held.has(url)) return;
    active++;
    maximum = Math.max(maximum, active);
    await hold;
    active--;
  });
  await env.message("OFFLINE_SEARCH_ACTIVITY", { allowed: true, busy: false });
  const downloaded = env.message("OFFLINE_SEARCH_DOWNLOAD", {
    automatic: true,
  });
  await until(() => active === 1);
  await env.message("OFFLINE_SEARCH_ACTIVITY", { allowed: false, busy: true });
  release();
  await until(
    async () =>
      (await env.message("OFFLINE_SEARCH_STATUS")).state.paused === true,
  );
  const stoppedAt = env.calls.length;
  await delay(10);
  assert.equal(env.calls.length, stoppedAt);
  assert.equal(maximum, 1);
  assert.equal((await env.request("content-index.json")).ok, true);
  assert.equal(env.priorities.at(-1).priority, undefined);
  env.visibility(false);
  await env.message("OFFLINE_SEARCH_ACTIVITY", { allowed: true, busy: false });
  const hiddenAt = env.calls.length;
  await delay(10);
  assert.equal(env.calls.length, hiddenAt);
  env.visibility(true);
  await env.message("OFFLINE_SEARCH_ACTIVITY", { allowed: true, busy: false });
  const reply = await downloaded;
  assert.equal(reply.state.phase, "ready");
  assert.equal(
    env.priorities.filter((item) => item.priority === "low").length,
    manifest.files.length + 2,
  );
  env.offline();
  assert.equal(
    await (await env.request("content-assets/cover.svg?v=1")).text(),
    "<svg>cover</svg>",
  );
  assert.equal((await env.request("content-assets/unknown.svg?v=1")).status, 0);
});

test("an interrupted automatic pack resumes saved same-version files without publishing a partial snapshot", async () => {
  const env = harness();
  installRoutes(env);
  env.routes.delete(new URL("pagefind/wasm.zh.pagefind", scope).href);
  await env.message("OFFLINE_SEARCH_ACTIVITY", { allowed: true });
  assert.equal(
    (await env.message("OFFLINE_SEARCH_DOWNLOAD", { automatic: true })).ok,
    false,
  );
  assert.equal(
    (await env.message("OFFLINE_SEARCH_STATUS")).state.phase,
    "available",
  );
  const partial = [...env.storage.entries()].find(([name]) =>
    name.includes("pack:"),
  )[1];
  const saved = new Set(
    (await partial.keys())
      .map((request) => request.url)
      .filter(
        (url) =>
          !url.endsWith("search-manifest.json") &&
          !url.endsWith("search-version.json"),
      ),
  );
  assert.ok(saved.size > 0);
  installRoutes(env);
  const start = env.calls.length;
  assert.equal(
    (await env.message("OFFLINE_SEARCH_DOWNLOAD", { automatic: true })).state
      .phase,
    "ready",
  );
  assert.ok(env.calls.slice(start).every((url) => !saved.has(url)));
});

function schedulerHarness(
  connectionSettings = {},
  readyState = "complete",
  visibilityState = "visible",
) {
  let now = 0;
  let id = 0;
  const timers = new Map();
  const window = new EventTarget();
  const document = new EventTarget();
  document.readyState = readyState;
  document.visibilityState = visibilityState;
  const connection = Object.assign(
    new EventTarget(),
    { effectiveType: "4g", saveData: false },
    connectionSettings,
  );
  const messages = [];
  const states = [];
  const clockTimeout = (callback, ms = 0) => {
    const timer = ++id;
    timers.set(timer, { at: now + ms, callback });
    return timer;
  };
  const clockClear = (timer) => timers.delete(timer);
  const worker = {
    scriptURL: new URL("search-sw.js", scope).href,
    state: "activated",
    postMessage: (message, ports = []) => {
      messages.push(message);
      if (!ports[0]) return;
      const state =
        message.type === "OFFLINE_SEARCH_DOWNLOAD"
          ? {
              phase: "ready",
              hasDownload: true,
              version: "version-1",
              total: 11,
              completed: 11,
            }
          : { phase: "available", hasDownload: false };
      ports[0].postMessage({ type: "OFFLINE_SEARCH_REPLY", ok: true, state });
    },
  };
  const registration = { scope, active: worker };
  const serviceWorker = Object.assign(new EventTarget(), {
    controller: worker,
    getRegistration: async () => registration,
    register: async () => registration,
  });
  window.isSecureContext = true;
  window.caches = {};
  window.requestIdleCallback = (callback) => clockTimeout(callback, 1);
  window.cancelIdleCallback = clockClear;
  const storage = new Map();
  const context = vm.createContext({
    window,
    document,
    navigator: { serviceWorker, connection, onLine: true },
    location: { origin: new URL(scope).origin, pathname: "/MyBlogDoc/blog/" },
    sessionStorage: {
      getItem: (key) => storage.get(key),
      setItem: (key, value) => storage.set(key, value),
    },
    URL,
    Response,
    AbortController,
    Date: class extends Date {
      static now() {
        return now;
      }
    },
    setTimeout: clockTimeout,
    clearTimeout: clockClear,
    MessageChannel: class {
      constructor() {
        let closed = false;
        this.port1 = {
          close: () => {
            closed = true;
          },
          onmessage: null,
        };
        this.port2 = {
          postMessage: (data) =>
            queueMicrotask(() => {
              if (!closed) this.port1.onmessage?.({ data });
            }),
        };
      }
    },
    fetch: async () =>
      new Response(
        JSON.stringify({
          version: "version-1",
          totalBytes: 1234,
          filesCount: 11,
        }),
      ),
  });
  const source = ts.transpileModule(
    readFileSync(
      new URL("../src/scripts/offline-search.ts", import.meta.url),
      "utf8",
    ),
    {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
    },
  ).outputText;
  vm.runInContext(
    `${source.replace(/^export /gm, "")}\nglobalThis.create = createOfflineSearch;`,
    context,
  );
  const api = context.create("/MyBlogDoc/", (state) => states.push(state), {
    automatic: true,
  });
  const flush = async () => {
    for (let step = 0; step < 8; step++) await Promise.resolve();
  };
  const advance = async (ms) => {
    const target = now + ms;
    await flush();
    while (true) {
      const next = [...timers]
        .filter(([, timer]) => timer.at <= target)
        .sort((a, b) => a[1].at - b[1].at)[0];
      if (!next) break;
      now = next[1].at;
      timers.delete(next[0]);
      next[1].callback();
      await flush();
    }
    now = target;
    await flush();
  };
  return {
    api,
    messages,
    states,
    document,
    window,
    connection,
    advance,
    flush,
  };
}

test("automatic scheduling waits for load plus five seconds and yields until an active query becomes idle", async () => {
  const env = schedulerHarness({}, "interactive");
  await env.advance(10000);
  const downloads = () =>
    env.messages.filter(
      (message) => message.type === "OFFLINE_SEARCH_DOWNLOAD",
    );
  assert.equal(downloads().length, 0);
  env.window.dispatchEvent(new Event("load"));
  await env.advance(4999);
  assert.equal(downloads().length, 0);
  env.api.setBusy(true);
  await env.advance(4000);
  assert.equal(downloads().length, 0);
  env.api.setBusy(false);
  await env.advance(1000);
  assert.equal(downloads().length, 0);
  await env.advance(1);
  await env.flush();
  assert.equal(downloads().length, 1);
  assert.equal(downloads()[0].automatic, true);
  assert.equal(env.states.at(-1).phase, "ready");
  env.api.dispose();
});

test("automatic scheduling stays disabled on save-data, slow 2g, or a hidden page", async () => {
  for (const settings of [
    { saveData: true },
    { effectiveType: "slow-2g" },
    { effectiveType: "2g" },
  ]) {
    const env = schedulerHarness(settings);
    await env.advance(15000);
    assert.equal(
      env.messages.some(
        (message) => message.type === "OFFLINE_SEARCH_DOWNLOAD",
      ),
      false,
    );
    env.api.dispose();
  }
  const hidden = schedulerHarness({}, "complete", "hidden");
  await hidden.advance(15000);
  assert.equal(
    hidden.messages.some(
      (message) => message.type === "OFFLINE_SEARCH_DOWNLOAD",
    ),
    false,
  );
  hidden.api.dispose();
});
