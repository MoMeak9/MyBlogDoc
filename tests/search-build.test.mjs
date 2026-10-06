import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { gunzipSync } from "node:zlib";
import test from "node:test";
import * as pagefind from "pagefind";
import {
  finalizeManifest,
  prepareSearchHtml,
  staticReferences,
} from "../scripts/build-search.mjs";

const base = `/${(process.env.BASE_PATH || "/").split("/").filter(Boolean).join("/")}${(process.env.BASE_PATH || "/").split("/").filter(Boolean).length ? "/" : ""}`;
const dist = resolve("dist");
const fragmentData = (bytes) => {
  const decoded = gunzipSync(bytes).toString();
  return JSON.parse(decoded.slice(decoded.indexOf("{")));
};

test("real Pagefind indexing retains code, facets and metadata without indexing navigation or record JSON", async () => {
  const record = {
    id: "React/100%20  知识",
    title: "并发  更新",
    description: "abstractOnlyToken",
    tags: ["tagOnlyToken"],
    notIndexed: "recordOnlyToken",
    categories: ["React", "前端"],
    url: "https://example.org/MyBlogDoc/posts/React/100%2520%20%20%E7%9F%A5%E8%AF%86/",
    alternates: {
      en: "https://example.org/MyBlogDoc/en/posts/React/100%2520%20%20%E7%9F%A5%E8%AF%86/",
    },
  };
  const html = prepareSearchHtml(
    '<html lang="zh-CN"><head></head><body><nav>navigationOnlyToken</nav><h1 data-pagefind-body data-pagefind-meta="title" data-pagefind-weight="8">并发  更新</h1><article data-pagefind-body><p>微任务执行顺序</p><pre><code>dispatchAction codeOnlyToken</code></pre></article><aside class="toc">tocOnlyToken</aside><footer>footerOnlyToken</footer></body></html>',
    record,
  );
  try {
    const { errors, index } = await pagefind.createIndex({
      forceLanguage: "zh",
    });
    assert.deepEqual(errors, []);
    const added = await index.addHTMLFile({
      url: new URL(record.url).pathname,
      content: html,
    });
    assert.deepEqual(added.errors, []);
    assert.equal(added.file.url, new URL(record.url).pathname);
    assert.equal(decodeURIComponent(added.file.meta.id), record.id);
    assert.deepEqual(
      JSON.parse(Buffer.from(added.file.meta.record, "base64url").toString()),
      record,
    );
    const generated = await index.getFiles();
    assert.deepEqual(generated.errors, []);
    const fragments = generated.files
      .filter((file) => file.path.endsWith(".pf_fragment"))
      .map((file) => fragmentData(file.content));
    assert.equal(fragments.length, 1);
    const fragment = fragments[0];
    assert.deepEqual(
      new Set(fragment.filters.category),
      new Set(record.categories),
    );
    const content = fragment.content.replaceAll("\u200b", "");
    assert.match(content, /并发\s*更新/);
    assert.match(content, /微任务执行顺序/);
    assert.match(content, /dispatchAction/);
    assert.match(content, /codeOnlyToken/);
    assert.match(content, /abstractOnlyToken/);
    assert.match(content, /tagOnlyToken/);
    assert.doesNotMatch(
      content,
      /navigationOnlyToken|footerOnlyToken|tocOnlyToken|recordOnlyToken/,
    );
  } finally {
    await pagefind.close();
  }
});

test("offline closure follows static JavaScript and CSS resources, leaving dynamic Mermaid unloaded", () => {
  assert.deepEqual(
    staticReferences(
      'import{a}from"./shared.js";import "./boot.js";export{a}from"./other.js";const diagram=()=>import("./mermaid.js");',
      ".js",
    ),
    ["./shared.js", "./boot.js", "./other.js"],
  );
  assert.deepEqual(
    staticReferences(
      '@import "./theme.css"; .image{background:url("../images/a.jpg")}',
      ".css",
    ),
    ["./theme.css", "../images/a.jpg"],
  );
});

test("manifest versions depend on exact asset bytes and byte totals include the version file", () => {
  const files = [
    { url: "/MyBlogDoc/pagefind/pagefind.js", content: Buffer.from("runtime") },
    { url: "/MyBlogDoc/content-index.json", content: Buffer.from("metadata") },
  ];
  const first = finalizeManifest(files, {
    base: "/MyBlogDoc/",
    articleCount: 2,
  });
  const second = finalizeManifest([...files].reverse(), {
    base: "/MyBlogDoc/",
    articleCount: 2,
  });
  assert.deepEqual(first, second);
  assert.match(first.manifest.version, /^[a-f0-9]{64}$/);
  assert.equal(
    first.manifest.totalBytes,
    first.manifest.files.reduce((sum, file) => sum + file.bytes, 0),
  );
  assert.equal(
    JSON.parse(first.versionContent).totalBytes,
    first.manifest.totalBytes,
  );
  assert.ok(
    first.manifest.files.some(
      (file) => file.url === "/MyBlogDoc/search-version.json",
    ),
  );
  const changed = finalizeManifest(
    [{ ...files[0], content: Buffer.from("changed runtime") }, files[1]],
    { base: "/MyBlogDoc/", articleCount: 2 },
  );
  assert.notEqual(changed.manifest.version, first.manifest.version);
});

test("built search pack indexes each public article once and declares every cacheable byte", () => {
  const manifest = JSON.parse(
    readFileSync(join(dist, "search-manifest.json"), "utf8"),
  );
  const version = JSON.parse(
    readFileSync(join(dist, "search-version.json"), "utf8"),
  );
  const { articles } = JSON.parse(
    readFileSync(join(dist, "content-index.json"), "utf8"),
  );
  assert.equal(manifest.base, base);
  assert.equal(manifest.articleCount, articles.length);
  assert.equal(manifest.version, version.version);
  assert.equal(manifest.totalBytes, version.totalBytes);
  assert.equal(manifest.files.length, version.filesCount);
  assert.equal(
    new Set(manifest.files.map((file) => file.url)).size,
    manifest.files.length,
  );
  assert.equal(
    manifest.totalBytes,
    manifest.files.reduce((sum, file) => sum + file.bytes, 0),
  );
  const urls = new Set(manifest.files.map((file) => file.url));
  for (const suffix of [
    "content-index.json",
    "search-version.json",
    "search-dictionary.json",
    "blog/",
    "en/blog/",
    "pagefind/pagefind.js",
    "pagefind/pagefind-entry.json",
    "images/editorial-writing.jpg",
    "images/editorial-design.jpg",
    "images/editorial-engineering.jpg",
  ])
    assert.ok(
      urls.has(`${base}${suffix}`),
      `Offline search pack misses ${suffix}.`,
    );
  assert.equal(
    urls.has(`${base}search-index.json`),
    false,
    "The legacy raw-text index must not be cached.",
  );
  assert.equal(
    urls.has(`${base}search-manifest.json`),
    false,
    "Manifest self-bytes must not create a recursive hash.",
  );
  for (const file of manifest.files) {
    assert.ok(
      file.url.startsWith(base) &&
        !file.url.startsWith("//") &&
        !/[?#]/.test(file.url),
    );
    const path = decodeURIComponent(file.url.slice(base.length));
    assert.equal(
      statSync(join(dist, path.endsWith("/") ? `${path}index.html` : path))
        .size,
      file.bytes,
      `Cache byte mismatch: ${file.url}`,
    );
  }
  const filesUnder = (directory) =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory()
        ? filesUnder(join(directory, entry.name))
        : [join(directory, entry.name)],
    );
  const files = filesUnder(join(dist, "pagefind"));
  for (const file of files)
    assert.ok(
      urls.has(
        `${base}${file
          .slice(dist.length + 1)
          .split("/")
          .map(encodeURIComponent)
          .join("/")}`,
      ),
      `Uncached Pagefind asset: ${file}`,
    );
  const fragments = files
    .filter((path) => path.endsWith(".pf_fragment"))
    .map((path) => fragmentData(readFileSync(path)));
  assert.equal(fragments.length, articles.length);
  assert.deepEqual(
    new Set(fragments.map((fragment) => decodeURIComponent(fragment.meta.id))),
    new Set(articles.map((article) => article.id)),
  );
  const metadata = new Map(articles.map((article) => [article.id, article]));
  for (const fragment of fragments) {
    const article = metadata.get(decodeURIComponent(fragment.meta.id));
    assert.equal(
      fragment.meta.title,
      article.title.replace(/\s+/g, " ").trim(),
    );
    assert.deepEqual(
      JSON.parse(Buffer.from(fragment.meta.record, "base64url").toString()),
      article,
    );
    assert.deepEqual(
      new Set(fragment.filters.category),
      new Set(article.categories),
    );
    assert.equal(fragment.url, new URL(article.url).pathname);
  }
});
