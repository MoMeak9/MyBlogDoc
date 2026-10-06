import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import * as pagefind from "pagefind";
import { buildSearchDictionary } from "../src/lib/search-dictionary.mjs";

const normalizeBase = (value) => {
  const parts = String(value || "/")
    .split("/")
    .filter(Boolean);
  return parts.length ? `/${parts.join("/")}/` : "/";
};
const encodePath = (path) => path.split("/").map(encodeURIComponent).join("/");
const hash = (content) => createHash("sha256").update(content).digest("hex");
const escapeAttribute = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );

function inside(directory, path) {
  const candidate = resolve(directory, path);
  assert.ok(
    candidate !== directory && candidate.startsWith(`${directory}${sep}`),
    `Search asset escapes its output directory: ${path}`,
  );
  return candidate;
}

function checkErrors(response, action) {
  if (response.errors?.length)
    throw new Error(`${action}: ${response.errors.join("; ")}`);
  return response;
}

/** Enrich the rendered document in memory; metadata never becomes searchable body text. */
export function prepareSearchHtml(html, article) {
  assert.match(html, /<\/head>/i, `${article.id}: rendered HTML has no head.`);
  assert.match(
    html,
    /\bdata-pagefind-body(?:\s|=|>)/i,
    `${article.id}: rendered article is missing search body markers.`,
  );
  const meta = [
    ["id", encodeURIComponent(article.id)],
    ["title", article.title],
    // Pagefind normalizes metadata whitespace; preserve filenames and fields exactly.
    ["record", Buffer.from(JSON.stringify(article)).toString("base64url")],
  ]
    .map(
      ([name, value]) =>
        `<meta data-pagefind-meta="${name}[content]" content="${escapeAttribute(value)}">`,
    )
    .join("");
  const filters = [...new Set(article.categories)]
    .map(
      (category) =>
        `<meta data-pagefind-filter="category[content]" content="${escapeAttribute(category)}">`,
    )
    .join("");
  const keywords = [article.description, ...(article.tags ?? [])]
    .filter((value) => typeof value === "string" && value.trim())
    .map(escapeAttribute)
    .join(" ");
  return html
    .replace(/<\/head>/i, `${meta}${filters}</head>`)
    .replace(
      /<\/body>(\s*<\/html>)/i,
      `<p data-pagefind-body data-pagefind-weight="0.5">${keywords}</p></body>$1`,
    )
    .toWellFormed();
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/\b([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
      ([, name, doubleQuoted, singleQuoted]) => [
        name.toLowerCase(),
        (doubleQuoted ?? singleQuoted).replaceAll("&amp;", "&"),
      ],
    ),
  );
}

/** Only follow static imports; dynamic Mermaid and other page-only chunks stay out. */
export function staticReferences(source, extension) {
  if (extension === ".js") {
    return [
      ...source.matchAll(
        /\b(?:import|export)\s*(?:[^"'();]*?\bfrom\s*)?["']([^"']+)["']/g,
      ),
    ].map((match) => match[1]);
  }
  if (extension === ".css") {
    return [
      ...[...source.matchAll(/@import\s+["']([^"']+)["']/g)].map(
        (match) => match[1],
      ),
      ...[
        ...source.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/g),
      ].map((match) => match[1] ?? match[2] ?? match[3]),
    ];
  }
  return [];
}

/** Version files participate in download bytes, but not their own version hash. */
export function finalizeManifest(assets, { base, articleCount }) {
  const sorted = [...assets].sort((left, right) =>
    left.url < right.url ? -1 : left.url > right.url ? 1 : 0,
  );
  const version = hash(
    JSON.stringify({
      format: 1,
      base,
      articleCount,
      files: sorted.map((asset) => ({
        url: asset.url,
        sha256: hash(asset.content),
      })),
    }),
  );
  const bytesWithoutVersion = sorted.reduce(
    (sum, asset) => sum + asset.content.byteLength,
    0,
  );
  const filesCount = sorted.length + 1;
  let totalBytes = bytesWithoutVersion;
  let versionContent;
  for (let attempt = 0; attempt < 10; attempt++) {
    versionContent = Buffer.from(
      `${JSON.stringify({ version, articleCount, totalBytes, filesCount })}\n`,
    );
    const exactTotal = bytesWithoutVersion + versionContent.byteLength;
    if (exactTotal === totalBytes) break;
    totalBytes = exactTotal;
  }
  assert.equal(
    totalBytes,
    bytesWithoutVersion + versionContent.byteLength,
    "Search version byte total did not converge.",
  );
  const files = [
    ...sorted.map((asset) => ({
      url: asset.url,
      bytes: asset.content.byteLength,
    })),
    { url: `${base}search-version.json`, bytes: versionContent.byteLength },
  ].sort((left, right) =>
    left.url < right.url ? -1 : left.url > right.url ? 1 : 0,
  );
  return {
    manifest: { version, base, articleCount, totalBytes, files },
    versionContent,
  };
}

export async function buildSearch({
  directory = resolve("dist"),
  base = process.env.BASE_PATH || "/",
} = {}) {
  directory = resolve(directory);
  base = normalizeBase(base);
  const contentIndex = await readFile(inside(directory, "content-index.json"));
  const { articles } = JSON.parse(contentIndex.toString());
  assert.ok(
    Array.isArray(articles) && articles.length > 0,
    "Search build requires public articles in content-index.json.",
  );
  assert.equal(
    new Set(articles.map((article) => article.id)).size,
    articles.length,
    "Duplicate public article IDs would create duplicate search results.",
  );
  const origin = new URL(articles[0].url).origin;
  const assets = new Map();
  const pending = [];
  const originUrl = (pathname) => new URL(pathname, origin).href;

  function localUrl(reference, from) {
    if (
      !reference ||
      reference.startsWith("#") ||
      /^(?:data|blob|javascript|node):/i.test(reference)
    )
      return undefined;
    const url = new URL(reference, originUrl(from));
    if (url.origin !== origin) return undefined;
    assert.ok(
      url.pathname.startsWith(base),
      `Offline search resource misses mount ${base}: ${reference}`,
    );
    return url.pathname;
  }

  function addBytes(url, content) {
    assert.ok(
      url.startsWith(base) && !/[?#]/.test(url),
      `Unsafe offline search URL: ${url}`,
    );
    if (assets.has(url)) return;
    assets.set(url, { url, content: Buffer.from(content) });
    if (/\.(?:js|css)$/.test(url)) pending.push(url);
  }

  async function addLocal(url) {
    if (assets.has(url)) return;
    const rawPath = decodeURIComponent(url.slice(base.length));
    const file = inside(
      directory,
      rawPath.endsWith("/") ? `${rawPath}index.html` : rawPath,
    );
    addBytes(url, await readFile(file));
  }

  try {
    const { index } = checkErrors(
      await pagefind.createIndex({
        forceLanguage: "zh",
        writePlayground: false,
        excludeSelectors: [
          "nav",
          "footer",
          ".toc",
          ".article-breadcrumbs",
          ".article-bottom",
          ".article-sources",
          "button",
        ],
      }),
      "Create Pagefind index",
    );
    assert.ok(index, "Pagefind did not create an index.");
    for (const article of articles) {
      assert.ok(
        typeof article.id === "string" &&
          article.id &&
          Array.isArray(article.categories),
        "Invalid public article metadata.",
      );
      const url = new URL(article.url);
      assert.equal(
        url.origin,
        origin,
        `${article.id}: article origin mismatch.`,
      );
      assert.equal(
        url.pathname,
        `${base}posts/${encodePath(article.id)}/`,
        `${article.id}: URL must preserve its encoded ID and one mount prefix.`,
      );
      const sourceFile = inside(directory, `posts/${article.id}/index.html`);
      const html = prepareSearchHtml(
        await readFile(sourceFile, "utf8"),
        article,
      );
      const result = checkErrors(
        await index.addHTMLFile({ url: url.pathname, content: html }),
        `Index ${article.id}`,
      );
      assert.equal(
        result.file.url,
        url.pathname,
        `${article.id}: Pagefind altered the explicit article URL.`,
      );
      assert.equal(
        result.file.meta.id,
        encodeURIComponent(article.id),
        `${article.id}: missing search metadata ID.`,
      );
      assert.equal(
        result.file.meta.title,
        article.title.replace(/\s+/g, " ").trim(),
        `${article.id}: missing search title.`,
      );
      assert.deepEqual(
        JSON.parse(
          Buffer.from(result.file.meta.record, "base64url").toString(),
        ),
        article,
        `${article.id}: fragment metadata must retain the public article record.`,
      );
    }
    const { files } = checkErrors(
      await index.getFiles(),
      "Generate Pagefind assets",
    );
    assert.ok(
      files.some((file) => file.path === "pagefind.js") &&
        files.some((file) => file.path === "pagefind-entry.json"),
      "Pagefind runtime files are missing.",
    );
    const dictionary = Buffer.from(
      `${JSON.stringify(buildSearchDictionary(files))}\n`,
    );
    await writeFile(inside(directory, "search-dictionary.json"), dictionary);
    addBytes(`${base}search-dictionary.json`, dictionary);
    await rm(inside(directory, "pagefind"), { recursive: true, force: true });
    for (const file of files) {
      const output = inside(directory, `pagefind/${file.path}`);
      await mkdir(dirname(output), { recursive: true });
      await writeFile(output, file.content);
      addBytes(`${base}pagefind/${encodePath(file.path)}`, file.content);
    }
  } finally {
    await pagefind.close();
  }

  addBytes(`${base}content-index.json`, contentIndex);
  for (const route of ["blog/", "en/blog/"]) {
    const url = `${base}${route}`;
    await addLocal(url);
    const html = assets.get(url).content.toString();
    for (const match of html.matchAll(/<(?:script|link)\b[^>]*>/gi)) {
      const attrs = attributes(match[0]);
      const reference =
        attrs.src ||
        (/^(?:stylesheet|modulepreload|icon)$/.test(attrs.rel || "")
          ? attrs.href
          : undefined);
      const resource = localUrl(reference, url);
      if (resource) await addLocal(resource);
    }
    for (const match of html.matchAll(
      /<script\b[^>]*type="module"[^>]*>([\s\S]*?)<\/script>/gi,
    )) {
      for (const reference of staticReferences(match[1], ".js")) {
        const resource = localUrl(reference, url);
        if (resource) await addLocal(resource);
      }
    }
  }
  for (const image of [
    "editorial-writing.jpg",
    "editorial-design.jpg",
    "editorial-engineering.jpg",
  ])
    await addLocal(`${base}images/${image}`);
  for (let position = 0; position < pending.length; position++) {
    const from = pending[position];
    const extension = from.endsWith(".js") ? ".js" : ".css";
    for (const reference of staticReferences(
      assets.get(from).content.toString(),
      extension,
    )) {
      const resource = localUrl(reference, from);
      if (resource) await addLocal(resource);
    }
  }

  const { manifest, versionContent } = finalizeManifest(assets.values(), {
    base,
    articleCount: articles.length,
  });
  await writeFile(inside(directory, "search-version.json"), versionContent);
  await writeFile(
    inside(directory, "search-manifest.json"),
    `${JSON.stringify(manifest)}\n`,
  );
  console.log(
    `Pagefind indexed ${articles.length} public articles; offline search pack: ${manifest.files.length} files, ${(manifest.totalBytes / 1024 / 1024).toFixed(2)} MiB, version ${manifest.version.slice(0, 12)}.`,
  );
  return manifest;
}

if (
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url
) {
  await buildSearch();
}
