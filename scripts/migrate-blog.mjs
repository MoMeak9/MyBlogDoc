#!/usr/bin/env node
/**
 * Migrate reviewed Markdown decisions without changing the source collection.
 *
 * Preview: node scripts/migrate-blog.mjs --source <notes> --manifest <review.json>
 * Apply:   node scripts/migrate-blog.mjs --source <notes> --manifest <review.json> --apply
 * Optional --aliases <reviewed-aliases.json> accepts explicit, reviewed old-name mappings.
 * A completed reports/content-migration.json can itself be used as the next manifest.
 */
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
  realpathSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { dirname, resolve, relative, sep, posix } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const repository = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const targetRoot = resolve(repository, "src");
const reportPath = resolve(repository, "reports/content-migration.json");
const metadataPath = resolve(repository, "src/data/migration-metadata.json");
const importActions = new Set(["import_new", "update_existing"]);
const excludedActions = new Set(["skip_sensitive", "skip_private"]);
// These reviewed source notes are never read, copied, hashed, or described in the report.
const excludedNames = new Set(["TAPD.md", "2025-12-28.md"]);
const homeNames = new Set(["README.md"]);
const aboutNames = new Set(["intro.md", "个人简介.md", "About.md"]);
const excludedByRequest = (path) =>
  slash(path)
    .split("/")
    .slice(0, -1)
    .some((directory) => /抖音|法律/.test(directory));

const { values } = parseArgs({
  options: {
    source: { type: "string" },
    manifest: { type: "string" },
    aliases: { type: "string" },
    apply: { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
  strict: true,
});

if (values.help) {
  process.stdout.write(
    "node scripts/migrate-blog.mjs --source <notes> --manifest <review.json> [--aliases <aliases.json>] [--apply]\nDefault: dry run. Source files are read only.\n",
  );
  process.exit(0);
}
if (!values.source || !values.manifest || (values.apply && values["dry-run"])) {
  throw new Error(
    "Supply --source and --manifest; choose at most one of --apply and --dry-run.",
  );
}

const sourceRoot = realpathSync(resolve(values.source));
if (sourceRoot === realpathSync(targetRoot))
  throw new Error("Source and destination must differ.");
const manifest = JSON.parse(readFileSync(resolve(values.manifest), "utf8"));
const previousReport = existsSync(reportPath)
  ? JSON.parse(readFileSync(reportPath, "utf8"))
  : null;
const previousMetadata = existsSync(metadataPath)
  ? JSON.parse(readFileSync(metadataPath, "utf8"))
  : {};
const hash = (value) => createHash("sha256").update(value).digest("hex");
const slash = (value) => String(value).replaceAll("\\", "/").normalize("NFC");

function safeRelative(value, kind = "document") {
  const path = slash(value);
  if (
    !path ||
    path.startsWith("/") ||
    /^[a-z]:/i.test(path) ||
    path.split("/").some((part) => part === "..")
  ) {
    throw new Error(`Invalid relative ${kind} path in the review.`);
  }
  const normalized = posix.normalize(path).replace(/^\.\//, "");
  if (normalized === "." || normalized.startsWith("../"))
    throw new Error(`Invalid ${kind} path.`);
  return normalized;
}

function inside(root, relativePath) {
  const result = resolve(root, relativePath);
  if (!result.startsWith(`${root}${sep}`))
    throw new Error("A reviewed path leaves its allowed directory.");
  return result;
}

function readSource(sourceRelativePath) {
  const sourcePath = inside(sourceRoot, sourceRelativePath);
  const real = realpathSync(sourcePath);
  if (!real.startsWith(`${sourceRoot}${sep}`))
    throw new Error("A source symlink leaves the source collection.");
  return {
    bytes: readFileSync(real),
    modifiedAt: statSync(real).mtime.toISOString(),
  };
}

function readMarkdownPaths(root, prefix = "") {
  const found = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      if (entry.name !== ".vuepress")
        found.push(...readMarkdownPaths(resolve(root, entry.name), `${path}/`));
    } else if (entry.isFile() && /\.md$/i.test(entry.name))
      found.push(slash(path));
  }
  return found;
}

const decisions = (manifest.relations ?? manifest.decisions ?? []).map(
  (entry) => {
    // The anonymous excluded records in a previous report intentionally have no source path.
    if (entry.excluded)
      return { recommendation: entry.recommendation, excluded: true };
    const sourceRelativePath = safeRelative(
      entry.relative ?? entry.sourceRelativePath,
      "source",
    );
    const recommendation = entry.recommendation;
    if (
      excludedActions.has(recommendation) ||
      excludedNames.has(posix.basename(sourceRelativePath))
    ) {
      return { recommendation: "skip_private_or_sensitive", excluded: true };
    }
    const targetRelativePath =
      entry.recommended_target_relative ?? entry.targetRelativePath;
    return {
      sourceRelativePath,
      targetRelativePath: targetRelativePath
        ? safeRelative(targetRelativePath, "target")
        : null,
      recommendation,
      rationale: entry.rationale ?? null,
      titleOverride: entry.title_override ?? entry.titleOverride ?? null,
      expectedSourceHash: entry.raw_hash,
      title: entry.title,
      h1: entry.h1,
      excludedByRequest:
        entry.excludedByRequest === true ||
        excludedByRequest(sourceRelativePath),
    };
  },
);
if (!decisions.length) throw new Error("The review contains no decisions.");

const planned = decisions.filter(
  (entry) =>
    !entry.excludedByRequest && importActions.has(entry.recommendation),
);
const plannedTargets = new Set();
for (const entry of planned) {
  if (!entry.targetRelativePath?.endsWith(".md"))
    throw new Error("Every import must target a Markdown file.");
  if (
    entry.targetRelativePath.startsWith(".vuepress/") ||
    homeNames.has(entry.targetRelativePath) ||
    aboutNames.has(entry.targetRelativePath)
  ) {
    throw new Error(
      "The migration may not replace site configuration or profile content.",
    );
  }
  if (plannedTargets.has(entry.targetRelativePath))
    throw new Error(`Two imports target ${entry.targetRelativePath}.`);
  plannedTargets.add(entry.targetRelativePath);
}
const existingTargets = new Set(readMarkdownPaths(targetRoot));
const requestExcludedTargets = new Set(
  decisions
    .filter((entry) => entry.excludedByRequest && entry.targetRelativePath)
    .map((entry) => entry.targetRelativePath),
);
const availableTargets = new Set(
  [...existingTargets, ...plannedTargets].filter(
    (path) => !excludedByRequest(path) && !requestExcludedTargets.has(path) && !homeNames.has(path) && !aboutNames.has(path),
  ),
);
const priorHashes = new Map(
  (previousReport?.decisions ?? [])
    .filter((entry) => entry.resultHash)
    .map((entry) => [entry.targetRelativePath, entry.resultHash]),
);
for (const entry of planned) {
  const targetPath = inside(targetRoot, entry.targetRelativePath);
  if (entry.recommendation === "update_existing" && !existsSync(targetPath))
    throw new Error(`Reviewed update is missing: ${entry.targetRelativePath}.`);
  if (entry.recommendation === "import_new" && existsSync(targetPath)) {
    const id = entry.targetRelativePath.replace(/\.md$/i, "");
    const previous = previousMetadata[id];
    if (
      previous?.action !== "added" ||
      previous?.sourceRelativePath !== entry.sourceRelativePath
    ) {
      throw new Error(
        `Unreviewed destination collision: ${entry.targetRelativePath}.`,
      );
    }
  }
  const previousHash = priorHashes.get(entry.targetRelativePath);
  if (
    previousHash &&
    existsSync(targetPath) &&
    hash(readFileSync(targetPath)) !== previousHash
  ) {
    throw new Error(
      `Destination changed since migration: ${entry.targetRelativePath}. Review it before reapplying.`,
    );
  }
}

const documentKey = (value) =>
  posix
    .normalize(slash(value).replace(/^\/+/, ""))
    .replace(/\.(?:md|html)$/i, "")
    .replace(/\/$/, "");
const canonicalTitle = (value) =>
  String(value)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\p{P}\p{S}\s]+/gu, "");
const aliases = new Map();
const titleTargets = new Map();

function addAlias(name, target) {
  const key = documentKey(name);
  if (!key || key.startsWith("../")) return;
  const targets = aliases.get(key) ?? new Set();
  targets.add(target);
  aliases.set(key, targets);
}

function addTitle(name, target) {
  if (!name) return;
  const key = canonicalTitle(name);
  if (!key) return;
  const targets = titleTargets.get(key) ?? new Set();
  targets.add(target);
  titleTargets.set(key, targets);
}

for (const target of availableTargets) {
  addAlias(target, target);
  addAlias(`src/${target}`, target);
  addTitle(posix.basename(target, ".md"), target);
}
for (const entry of decisions) {
  if (entry.excluded || entry.excludedByRequest) continue;
  const target = entry.targetRelativePath;
  if (!availableTargets.has(target)) continue;
  addAlias(entry.sourceRelativePath, target);
  if (entry.sourceRelativePath.startsWith("src/"))
    addAlias(entry.sourceRelativePath.slice(4), target);
  addTitle(posix.basename(entry.sourceRelativePath, ".md"), target);
  addTitle(entry.title, target);
  addTitle(entry.h1, target);
}
// These links lead to the existing Astro pages; their source files never replace the UI.
for (const [names, page] of [[homeNames, "@home"], [aboutNames, "@about"]]) {
  for (const name of names) {
    if (page === "@home" && !existsSync(inside(sourceRoot, name))) continue;
    aliases.set(documentKey(name), new Set([page]));
  }
}

const reviewedAliases = {
  ...(manifest.reviewedLinkAliases ?? {}),
  ...(values.aliases
    ? JSON.parse(readFileSync(resolve(values.aliases), "utf8"))
    : {}),
};
for (const [oldPath, item] of Object.entries(reviewedAliases)) {
  const old = safeRelative(oldPath, "alias");
  const target = safeRelative(
    typeof item === "string" ? item : item.targetRelativePath,
    "alias target",
  );
  if (!availableTargets.has(target))
    throw new Error(`Reviewed alias has no article: ${target}.`);
  // An explicit reviewed alias takes precedence over automatic title candidates.
  aliases.set(documentKey(old), new Set([target]));
}

const assets = (manifest.asset_migrations ?? manifest.assets ?? []).map(
  (asset) => {
    const sourceRelativePath =
      asset.sourceRelativePath ?? slash(relative(sourceRoot, asset.source));
    const targetRelativePath = asset.public_target ?? asset.targetRelativePath;
    return {
      sourceRelativePath: safeRelative(sourceRelativePath, "asset source"),
      targetRelativePath: safeRelative(targetRelativePath, "asset target"),
      articleRelativePath: safeRelative(
        asset.article ?? asset.articleRelativePath,
        "asset article",
      ),
      articleUrl: asset.article_url ?? asset.articleUrl,
    };
  },
);
const assetMap = new Map();
const assetWrites = [];
for (const asset of assets) {
  if (
    !asset.targetRelativePath.startsWith("public/content-assets/") ||
    !asset.articleUrl?.startsWith("/content-assets/")
  ) {
    throw new Error(
      "Reviewed assets must remain inside public/content-assets.",
    );
  }
  const { bytes } = readSource(asset.sourceRelativePath);
  const targetPath = inside(repository, asset.targetRelativePath);
  if (
    existsSync(targetPath) &&
    hash(readFileSync(targetPath)) !== hash(bytes)
  ) {
    throw new Error(`Destination asset differs: ${asset.targetRelativePath}.`);
  }
  assetMap.set(asset.sourceRelativePath, asset.articleUrl);
  assetWrites.push({ targetPath, bytes, asset });
}

// Reuse Astro's installed Markdown parser; no extra dependency or rendering/build is needed.
const markdownRequire = createRequire(
  import.meta.resolve("@astrojs/markdown-remark"),
);
const { unified } = await import(
  pathToFileURL(markdownRequire.resolve("unified"))
);
const { default: remarkParse } = await import(
  pathToFileURL(markdownRequire.resolve("remark-parse"))
);
const { default: remarkGfm } = await import(
  pathToFileURL(markdownRequire.resolve("remark-gfm"))
);
const parser = unified().use(remarkParse).use(remarkGfm);
const linkReport = [];
const sourceMissingDocumentReferences =
  manifest.sourceMissingDocumentReferences ??
  (manifest.risks?.local_docs ?? [])
    .filter((item) => !item.exists)
    .map((item) => ({ sourceRelativePath: item.file, href: item.url }));
const assetReferences =
  manifest.assetReferences ??
  (manifest.risks?.assets ?? []).map((item) => ({
    sourceRelativePath: item.file,
    href: item.url,
    sourceExists: item.exists,
  }));
const protectedAssetExamples = new Set();

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function splitHref(href) {
  const decoded = decode(
    String(href).trim().replace(/^<|>$/g, "").replaceAll("&amp;", "&"),
  );
  const match = decoded.match(/^([^?#]*)([?#].*)?$/);
  return { path: slash(match?.[1] ?? decoded), suffix: match?.[2] ?? "" };
}

function sourceResolved(path, sourceRelativePath) {
  return path.startsWith("/")
    ? posix.normalize(path.replace(/^\/+/, ""))
    : posix.normalize(posix.join(posix.dirname(sourceRelativePath), path));
}

function sole(set) {
  return set?.size === 1 ? [...set][0] : null;
}

function resolveDocument(href, sourceRelativePath, { wiki = false } = {}) {
  if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(href))
    return { external: true };
  const { path, suffix } = splitHref(href);
  if (!path) return { external: true };
  // Known interface routes retain their semantics and get BASE_URL at render time.
  if (/^\/(?:en\/)?(?:about|blog|contact)?\/?$/.test(path)) return { external: true };
  const resolvedPath = sourceResolved(path, sourceRelativePath);
  if (excludedNames.has(posix.basename(resolvedPath)))
    return { unresolved: true, excluded: true };
  if (
    excludedByRequest(resolvedPath) ||
    excludedByRequest(path.replace(/^\/+/, ""))
  )
    return { unresolved: true, excludedByRequest: true };
  const keys = [resolvedPath, path.replace(/^\/+/, "")];
  for (const key of keys) {
    // A missing sibling README/profile must not fall back to the source root page.
    if (key !== resolvedPath && /^(?:README|index|intro|About|个人简介)(?:\.(?:md|html))?$/i.test(key)) continue;
    const target = sole(aliases.get(documentKey(key)));
    if (target) return { target, suffix, method: "path-or-reviewed-alias" };
  }
  // Old VuePress document links can omit an extension. Other extensions may be assets.
  if (!wiki && !/\.(?:md|html)$/i.test(path) && posix.extname(path.replace(/\/$/, ""))) return { external: true };
  // Directory moves and whitespace/punctuation-only renames are unambiguous only
  // when the normalized full title refers to one available article.
  const title = posix.basename(path.replace(/\/$/, "")).replace(/\.(?:md|html)$/i, "");
  // Generic landing-page filenames are meaningful only with an exact reviewed path.
  if (/^(?:readme|index|intro|about|个人简介)$/i.test(title)) return { unresolved: true, resolvedPath };
  const target = sole(titleTargets.get(canonicalTitle(title)));
  if (target) return { target, suffix, method: "unique-normalized-title" };
  return { unresolved: true, resolvedPath };
}

function routeFor(target, suffix = "") {
  const route =
    target === "@home"
      ? "/"
      : target === "@about"
        ? "/about/"
        : `/posts/${target.replace(/\.md$/i, "").split("/").map(encodeURIComponent).join("/")}/`;
  // Astro's Markdown adapter supplies BASE_URL at render time; this source stays portable.
  return `${route}${encodeURI(suffix).replaceAll("%25", "%")}`;
}

function recordLink(sourceRelativePath, href, result, kind) {
  if (result.external) return;
  linkReport.push({
    sourceRelativePath,
    kind,
    ...(result.excluded ? {} : { originalHref: href }),
    action: result.unresolved ? "unresolved-to-text" : "rewritten",
    ...(result.target
      ? { targetRelativePath: result.target, method: result.method }
      : {}),
    ...(result.excluded
      ? { reason: "excluded-private-or-sensitive-target" }
      : {}),
    ...(result.excludedByRequest ? { reason: "excluded-by-user-request" } : {}),
  });
}

function frontmatter(source) {
  const match = source.match(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/);
  return {
    header: match?.[0] ?? "",
    body: match ? source.slice(match[0].length) : source.replace(/^\uFEFF/, ""),
  };
}

function walk(node, visit) {
  visit(node);
  for (const child of node.children ?? []) walk(child, visit);
}

function escapeMarkdown(value) {
  return String(value).replace(/([\\[\]])/g, "\\$1");
}
function htmlText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
function htmlAttribute(value) {
  return htmlText(value).replaceAll('"', "&quot;");
}

function migrateBody(body, sourceRelativePath) {
  const tree = parser.parse(body);
  const edits = [];
  const protectedRanges = [];
  const definitions = new Map();
  const addEdit = (node, replacement) => {
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    if (start == null || end == null)
      throw new Error("Markdown parser omitted a source position.");
    edits.push({ start, end, replacement });
  };
  const labelFor = (node) => {
    const first = node.children?.[0]?.position?.start.offset;
    const last = node.children?.at(-1)?.position?.end.offset;
    return first == null || last == null ? "" : body.slice(first, last);
  };
  walk(tree, (node) => {
    if (
      node.position &&
      [
        "link",
        "linkReference",
        "image",
        "imageReference",
        "definition",
        "html",
      ].includes(node.type)
    ) {
      protectedRanges.push([
        node.position.start.offset,
        node.position.end.offset,
      ]);
    }
    if (["code", "inlineCode"].includes(node.type)) {
      protectedRanges.push([
        node.position.start.offset,
        node.position.end.offset,
      ]);
      for (const reference of assetReferences) {
        if (
          reference.sourceRelativePath === sourceRelativePath &&
          node.value.includes(reference.href)
        )
          protectedAssetExamples.add(
            `${sourceRelativePath}\n${reference.href}`,
          );
      }
    }
    if (node.type === "definition") definitions.set(node.identifier, node);
  });
  const imageResult = (href) => {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) return { external: true };
    const { path } = splitHref(href);
    const sourceAsset = sourceResolved(path, sourceRelativePath);
    const asset = assetMap.get(sourceAsset);
    if (asset) return { url: asset };
    return { missing: true };
  };
  const missingImage = (alt) =>
    `${escapeMarkdown(alt || "原文图片")}（图片文件缺失）`;
  const titleSuffix = (node) =>
    node.title ? ` ${JSON.stringify(node.title)}` : "";
  const definitionResults = new Map();
  for (const [id, node] of definitions) {
    const result = resolveDocument(node.url, sourceRelativePath);
    if (!result.external) {
      definitionResults.set(id, result);
      recordLink(sourceRelativePath, node.url, result, "definition");
      addEdit(
        node,
        result.unresolved
          ? ""
          : `[${node.label ?? node.identifier}]: ${routeFor(result.target, result.suffix)}${titleSuffix(node)}`,
      );
    }
  }
  walk(tree, (node) => {
    if (node.type === "link") {
      const result = resolveDocument(node.url, sourceRelativePath);
      if (result.external) return;
      recordLink(sourceRelativePath, node.url, result, "markdown");
      addEdit(
        node,
        result.unresolved
          ? labelFor(node)
          : `[${labelFor(node)}](${routeFor(result.target, result.suffix)}${titleSuffix(node)})`,
      );
    } else if (node.type === "linkReference") {
      const result = definitionResults.get(node.identifier);
      if (result?.unresolved) addEdit(node, labelFor(node));
    } else if (node.type === "image") {
      const result = imageResult(node.url);
      if (result.external) return;
      linkReport.push({
        sourceRelativePath,
        kind: "image",
        originalHref: node.url,
        action: result.missing
          ? "missing-image-to-alt-text"
          : "asset-rewritten",
      });
      addEdit(
        node,
        result.missing
          ? missingImage(node.alt)
          : `![${escapeMarkdown(node.alt ?? "")}](${result.url}${titleSuffix(node)})`,
      );
    } else if (node.type === "imageReference") {
      const definition = definitions.get(node.identifier);
      if (!definition) return;
      const result = imageResult(definition.url);
      if (result.external) return;
      linkReport.push({
        sourceRelativePath,
        kind: "image-reference",
        originalHref: definition.url,
        action: result.missing
          ? "missing-image-to-alt-text"
          : "asset-rewritten",
      });
      addEdit(
        node,
        result.missing
          ? missingImage(node.alt)
          : `![${escapeMarkdown(node.alt ?? "")}](${result.url}${titleSuffix(definition)})`,
      );
    } else if (node.type === "html") {
      let html = node.value;
      html = html.replace(
        /<a\b([^>]*?)\bhref\s*=\s*(["'])(.*?)\2([^>]*)>([\s\S]*?)<\/a>/gi,
        (match, before, quote, href, after, label) => {
          const result = resolveDocument(href, sourceRelativePath);
          if (result.external) return match;
          recordLink(sourceRelativePath, href, result, "html");
          return result.unresolved
            ? label
            : `<a${before}href=${quote}${htmlAttribute(routeFor(result.target, result.suffix))}${quote}${after}>${label}</a>`;
        },
      );
      html = html.replace(
        /<img\b[^>]*?\bsrc\s*=\s*(["'])(.*?)\1[^>]*\/?>/gi,
        (match, _quote, href) => {
          const result = imageResult(href);
          if (result.external) return match;
          linkReport.push({
            sourceRelativePath,
            kind: "html-image",
            originalHref: href,
            action: result.missing
              ? "missing-image-to-alt-text"
              : "asset-rewritten",
          });
          const alt =
            match.match(/\balt\s*=\s*(["'])(.*?)\1/i)?.[2] ?? "原文图片";
          return result.missing
            ? `${htmlText(alt)}（图片文件缺失）`
            : match.replace(href, result.url);
        },
      );
      if (html !== node.value) addEdit(node, html);
    }
  });
  // Obsidian double links are converted only outside code and existing Markdown edits.
  const wikiPattern = /(!?)\[\[([^\]\r\n]+)\]\]/g;
  for (const match of body.matchAll(wikiPattern)) {
    const start = match.index;
    const end = start + match[0].length;
    if (
      protectedRanges.some(([a, b]) => start < b && end > a) ||
      edits.some((edit) => start < edit.end && end > edit.start)
    )
      continue;
    const [href, ...labelParts] = match[2].split("|");
    const label =
      labelParts.join("|") || posix.basename(href).replace(/\.md$/i, "");
    if (match[1]) {
      const result = imageResult(href);
      if (result.external) continue;
      linkReport.push({
        sourceRelativePath,
        kind: "wiki-embed",
        originalHref: href,
        action: result.missing
          ? "missing-image-to-alt-text"
          : "asset-rewritten",
      });
      edits.push({
        start,
        end,
        replacement: result.missing
          ? missingImage(label)
          : `![${escapeMarkdown(label)}](${result.url})`,
      });
    } else {
      const result = resolveDocument(href, sourceRelativePath, { wiki: true });
      recordLink(sourceRelativePath, href, result, "wiki");
      edits.push({
        start,
        end,
        replacement:
          result.external || result.unresolved
            ? escapeMarkdown(label)
            : `[${escapeMarkdown(label)}](${routeFor(result.target, result.suffix)})`,
      });
    }
  }
  // Children of Markdown links can contain images: apply the enclosing replacement
  // once, rather than corrupting the file through overlapping source offsets.
  const selected = edits
    .sort((a, b) => a.start - b.start || b.end - a.end)
    .filter(
      (edit, index, all) =>
        !all
          .slice(0, index)
          .some(
            (parent) => edit.start >= parent.start && edit.end <= parent.end,
          ),
    );
  let result = body;
  for (const edit of selected.sort((a, b) => b.start - a.start))
    result =
      result.slice(0, edit.start) + edit.replacement + result.slice(edit.end);
  return result;
}

const documentWrites = [];
const metadata = { ...previousMetadata };
const reportDecisions = [];
for (const entry of decisions) {
  if (entry.excluded) {
    reportDecisions.push({
      excluded: true,
      recommendation: "skip_private_or_sensitive",
      action: "excluded",
      rationale:
        "Private or sensitive working note omitted; no contents or fingerprints retained.",
    });
    continue;
  }
  const reportEntry = {
    sourceRelativePath: entry.sourceRelativePath,
    targetRelativePath: entry.targetRelativePath,
    recommendation: entry.recommendation,
    action: entry.excludedByRequest
      ? "excluded_by_request"
      : importActions.has(entry.recommendation)
        ? entry.recommendation === "import_new"
          ? "added"
          : "updated"
        : "skipped",
    rationale: entry.excludedByRequest
      ? "Source directory excluded by the user's request."
      : entry.rationale,
    ...(entry.excludedByRequest ? { excludedByRequest: true } : {}),
    ...(entry.titleOverride ? { titleOverride: entry.titleOverride } : {}),
  };
  if (entry.excludedByRequest || !importActions.has(entry.recommendation)) {
    reportDecisions.push(reportEntry);
    continue;
  }
  const { bytes, modifiedAt } = readSource(entry.sourceRelativePath);
  const sourceHash = hash(bytes);
  // Python-based inventories may normalize CRLF when hashing decoded text.
  if (
    entry.expectedSourceHash &&
    sourceHash !== entry.expectedSourceHash &&
    hash(bytes.toString("utf8").replace(/\r\n?/g, "\n")) !==
      entry.expectedSourceHash
  ) {
    throw new Error(
      `Source changed since review: ${entry.sourceRelativePath}.`,
    );
  }
  const source = frontmatter(bytes.toString("utf8"));
  const targetPath = inside(targetRoot, entry.targetRelativePath);
  const existing = existsSync(targetPath)
    ? readFileSync(targetPath, "utf8")
    : null;
  let header =
    entry.recommendation === "update_existing" && existing != null
      ? frontmatter(existing).header
      : source.header;
  if (entry.titleOverride) {
    header = header
      ? header.replace(
          /^(title\s*:).*$/m,
          `$1 ${JSON.stringify(entry.titleOverride)}`,
        )
      : `---\ntitle: ${JSON.stringify(entry.titleOverride)}\n---\n`;
    if (!/^title\s*:/m.test(header))
      header = header.replace(
        /^(?:\uFEFF)?---\r?\n/,
        `---\ntitle: ${JSON.stringify(entry.titleOverride)}\n`,
      );
  }
  const output = header + migrateBody(source.body, entry.sourceRelativePath);
  const action = entry.recommendation === "import_new" ? "added" : "updated";
  metadata[entry.targetRelativePath.replace(/\.md$/i, "")] = {
    sourceRelativePath: entry.sourceRelativePath,
    sourceModifiedAt: modifiedAt,
    sourceHash,
    action,
  };
  reportDecisions.push({ ...reportEntry, resultHash: hash(output) });
  documentWrites.push({ targetPath, output, unchanged: existing === output });
}

const byRecommendation = {};
const byAction = {};
for (const entry of reportDecisions) {
  byRecommendation[entry.recommendation] =
    (byRecommendation[entry.recommendation] ?? 0) + 1;
  byAction[entry.action] = (byAction[entry.action] ?? 0) + 1;
}
const linkActions = {};
for (const entry of linkReport)
  linkActions[entry.action] = (linkActions[entry.action] ?? 0) + 1;
const missingReferenceKeys = new Set(
  sourceMissingDocumentReferences.map(
    (item) => `${item.sourceRelativePath}\n${decode(item.href)}`,
  ),
);
const originallyMissing = linkReport.filter(
  (item) =>
    item.originalHref &&
    missingReferenceKeys.has(
      `${item.sourceRelativePath}\n${decode(item.originalHref)}`,
    ),
);
const report = {
  schemaVersion: 1,
  sourceReadOnly: true,
  datePolicy:
    "Explicit article frontmatter stays intact. Source filesystem modification times are provenance and dateModified only; they are never treated as publication dates.",
  counts: {
    reviewed: reportDecisions.length,
    ...byAction,
    assets: assets.length,
    recommendations: byRecommendation,
    links: linkActions,
    originallyMissingDocumentLinks: {
      inventoried: sourceMissingDocumentReferences.length,
      rewritten: originallyMissing.filter((item) => item.action === "rewritten")
        .length,
      convertedToText: originallyMissing.filter(
        (item) => item.action === "unresolved-to-text",
      ).length,
    },
  },
  existingRequestExcludedTargets: [...requestExcludedTargets].filter((path) =>
    existingTargets.has(path),
  ),
  decisions: reportDecisions,
  assets,
  assetReferences: assetReferences.map((item) => ({
    ...item,
    ...(protectedAssetExamples.has(`${item.sourceRelativePath}\n${item.href}`)
      ? { disposition: "code-example-preserved; never emitted as an image" }
      : {}),
  })),
  sourceMissingDocumentReferences,
  reviewedLinkAliases: reviewedAliases,
  links: linkReport,
};
const writeIfChanged = (path, content) => {
  if (existsSync(path) && readFileSync(path).equals(Buffer.from(content)))
    return false;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  return true;
};
let documentsWritten = 0;
let assetsWritten = 0;
if (values.apply) {
  // Validate the full plan and render every edit before any destination write.
  for (const item of documentWrites)
    if (!item.unchanged && writeIfChanged(item.targetPath, item.output))
      documentsWritten++;
  for (const item of assetWrites)
    if (writeIfChanged(item.targetPath, item.bytes)) assetsWritten++;
  writeIfChanged(
    metadataPath,
    `${JSON.stringify(Object.fromEntries(Object.entries(metadata).sort(([a], [b]) => a.localeCompare(b, "en"))), null, 2)}\n`,
  );
  writeIfChanged(reportPath, `${JSON.stringify(report, null, 2)}\n`);
}
process.stdout.write(
  `${JSON.stringify(
    {
      mode: values.apply ? "apply" : "dry-run",
      counts: report.counts,
      documentsToWrite: documentWrites.filter((item) => !item.unchanged).length,
      documentsWritten,
      assetsWritten,
      report: "reports/content-migration.json",
      metadata: "src/data/migration-metadata.json",
    },
    null,
    2,
  )}\n`,
);
