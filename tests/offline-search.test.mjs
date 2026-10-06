import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

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
  let online = true;
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
      clients: { claim: async () => {}, matchAll: async () => [] },
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
      source: { url: `${scope}blog/` },
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
