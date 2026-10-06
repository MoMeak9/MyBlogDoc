import { rewriteLegacyHref } from "./paths.mjs";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import { createRequire } from "node:module";

// Reuse Astro's installed Markdown/HTML parsers without adding another parser stack.
const moduleRequire = createRequire(import.meta.url);
const markdownRequire = createRequire(
  moduleRequire.resolve("@astrojs/markdown-remark"),
);
const { unified: unifiedParser } = markdownRequire("unified");
const remarkParse = markdownRequire("remark-parse").default;
const { definitions: markdownDefinitions } = markdownRequire(
  "mdast-util-definitions",
);
const { fromHtml } = markdownRequire("hast-util-from-html");
const coverParser = unifiedParser().use(remarkParse);

/** VuePress 2's original @mdit-vue/shared slug convention. */
export function legacySlugify(text) {
  return String(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[\u0000-\u001f]/g, "")
    .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/^(\d)/, "_$1")
    .toLowerCase();
}

export function createLegacySlugger() {
  const used = new Set();
  return (text) => {
    const base = legacySlugify(text);
    let slug = base;
    let count = 1;
    while (used.has(slug)) slug = `${base}-${count++}`;
    used.add(slug);
    return slug;
  };
}

function legacyHeadingText(node) {
  if (node.type === "text" || node.type === "inlineCode")
    return node.value.replace(/\r?\n/g, "");
  if (node.type === "html" || node.type === "image") return "";
  return (node.children ?? []).map(legacyHeadingText).join("");
}

export function stripFrontmatter(source = "") {
  return source.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "");
}

export function plainText(source = "") {
  return stripFrontmatter(source)
    .replace(
      /(^|\n)\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\s*\2[^\n]*(?=\n|$)/g,
      " ",
    )
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/^[ \t]*[#>*-]+[ \t]*/gm, "")
    .replace(/[`*_~|]/g, "")
    .replace(/&(?:nbsp|amp|lt|gt|quot|#\d+);/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function firstHeading(source = "") {
  let fence;
  for (const line of stripFrontmatter(source).split(/\r?\n/)) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1][0];
      else if (marker[1][0] === fence) fence = undefined;
      continue;
    }
    if (fence) continue;
    const heading = line.match(/^\s{0,3}#\s+(.+?)(?:\s+#+)?\s*$/);
    if (heading) return plainText(heading[1]);
  }
  return undefined;
}

export function normalizeList(value) {
  const values = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? [value]
      : [];
  return [
    ...new Set(
      values
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}

export function parseDate(value) {
  if (value == null || value === "") return undefined;
  const date =
    value instanceof Date
      ? new Date(value)
      : typeof value === "string"
        ? new Date(value)
        : undefined;
  if (!date || Number.isNaN(date.getTime())) return undefined;
  // Date-only YAML values must not silently roll an invalid day into the next month.
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    date.toISOString().slice(0, 10) !== value
  )
    return undefined;
  return date;
}

export function estimateReadMinutes(body = "") {
  const text = plainText(body);
  const chineseCharacters = (text.match(/[\u3400-\u9fff]/g) ?? []).length;
  const otherWords = (
    text.replace(/[\u3400-\u9fff]/g, " ").match(/[\p{L}\p{N}]+/gu) ?? []
  ).length;
  return Math.max(1, Math.ceil(chineseCharacters / 350 + otherWords / 220));
}

const summarySegmenter =
  typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : undefined;

function summarySegments(value) {
  if (summarySegmenter) {
    return (function* () {
      for (const { segment } of summarySegmenter.segment(value)) yield segment;
    })();
  }
  // Code-point fallback keeps joined emoji, modifiers, marks and flag pairs intact.
  const groups = [];
  for (const point of value) {
    const previous = groups.at(-1);
    const joinsPrevious =
      previous &&
      (point === "\u200d" ||
        previous.endsWith("\u200d") ||
        /^[\p{M}\p{Emoji_Modifier}]$/u.test(point) ||
        (/^\p{Regional_Indicator}$/u.test(point) &&
          /^\p{Regional_Indicator}$/u.test(previous)));
    if (joinsPrevious) groups[groups.length - 1] += point;
    else groups.push(point);
  }
  return groups;
}

function truncateSummary(value) {
  const summary = value.toWellFormed();
  if (summary.length <= 160) return summary;
  let description = "";
  for (const segment of summarySegments(summary)) {
    if (description.length + segment.length > 157) break;
    description += segment;
  }
  return `${description}…`;
}

function safeCoverUrl(value) {
  if (typeof value !== "string") return undefined;
  const url = value.trim();
  if (!url || /[\u0000-\u001f\u007f\\]/.test(url) || /^[?#]/.test(url))
    return undefined;
  if (/^[a-z][a-z\d+.-]*:/i.test(url) || url.startsWith("//")) {
    try {
      const parsed = new URL(url.startsWith("//") ? `https:${url}` : url);
      if (
        !["https:", "http:"].includes(parsed.protocol) ||
        parsed.username ||
        parsed.password
      )
        return undefined;
    } catch {
      return undefined;
    }
  }
  return url;
}

function coverAttribute(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
}

function firstParagraphCover(content) {
  const tree = coverParser.parse(content);
  const definition = markdownDefinitions(tree);
  const blocks = tree.children.filter(
    (node) =>
      node.type !== "definition" &&
      !(
        node.type === "html" && /^\s*(?:<!--[\s\S]*?-->\s*)+$/.test(node.value)
      ),
  );
  if (blocks[0]?.type === "heading" && blocks[0].depth === 1) blocks.shift();
  const paragraph = blocks[0];
  if (!paragraph || !["paragraph", "html"].includes(paragraph.type))
    return undefined;

  function inlineHtml(node) {
    if (node.type === "text") return coverAttribute(node.value);
    if (node.type === "html") return node.value;
    if (node.type === "break") return "<br>";
    if (node.type === "image" || node.type === "imageReference") {
      const url =
        node.type === "image" ? node.url : definition(node.identifier)?.url;
      return url ? `<img src="${coverAttribute(url)}">` : undefined;
    }
    if (["link", "linkReference", "emphasis", "strong"].includes(node.type)) {
      const children = node.children.map(inlineHtml);
      return children.some((child) => child === undefined)
        ? undefined
        : `<a>${children.join("")}</a>`;
    }
    return undefined;
  }

  const parts =
    paragraph.type === "html"
      ? [paragraph.value]
      : paragraph.children.map(inlineHtml);
  if (parts.some((part) => part === undefined)) return undefined;
  const fragment = fromHtml(parts.join(""), { fragment: true });
  let imageParagraph = fragment;
  if (
    paragraph.type === "html" ||
    (paragraph.type === "paragraph" &&
      paragraph.children.some((node) => node.type === "html"))
  ) {
    const children = fragment.children.filter(
      (node) =>
        node.type !== "comment" &&
        !(node.type === "text" && !node.value.trim()),
    );
    const first = children[0];
    if (
      first?.type === "element" &&
      ["p", "div", "figure"].includes(first.tagName)
    ) {
      imageParagraph = first;
    } else {
      const boundary = children.findIndex(
        (node, index) =>
          index > 0 &&
          node.type === "element" &&
          [
            "p",
            "div",
            "figure",
            "blockquote",
            "pre",
            "table",
            "ul",
            "ol",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
          ].includes(node.tagName),
      );
      imageParagraph = {
        type: "root",
        children: boundary < 0 ? children : children.slice(0, boundary),
      };
    }
  }
  const images = [];
  function imageOnly(node) {
    if (node.type === "comment") return true;
    if (node.type === "text") return !node.value.trim();
    if (node.type === "root") return node.children.every(imageOnly);
    if (node.type !== "element") return false;
    if (node.tagName === "img") {
      const url = safeCoverUrl(node.properties?.src);
      if (!url) return false;
      images.push(url);
      return true;
    }
    if (node.tagName === "source") return true;
    if (node.tagName === "br") return true;
    if (
      ["p", "picture", "a", "div", "figure", "strong", "em"].includes(
        node.tagName,
      )
    )
      return node.children.every(imageOnly);
    return false;
  }
  return imageOnly(imageParagraph) ? images[0] : undefined;
}

/** Normalize metadata without requiring edits to the existing Markdown files. */
export function extractPostMetadata({
  id,
  body = "",
  data = {},
  fallbackDate = new Date(0),
  fallbackDateSource = "unknown",
}) {
  const content = stripFrontmatter(body);
  const heading = firstHeading(content);
  const filename = id.split("/").at(-1) ?? id;
  const title =
    typeof data.title === "string" && data.title.trim()
      ? plainText(data.title)
      : heading || filename;
  const summaryBody = heading
    ? content.replace(/^\s{0,3}#\s+[^\r\n]+\r?\n?/m, "")
    : content;
  const summary =
    typeof data.description === "string" && data.description.trim()
      ? plainText(data.description)
      : plainText(summaryBody);
  const explicitDate = parseDate(data.date);
  const categories = normalizeList(data.categories ?? data.category);
  const tags = normalizeList(data.tags ?? data.tag);
  const hasExplicitCover =
    typeof data.cover === "string" && Boolean(data.cover.trim());
  const explicitCover = hasExplicitCover ? safeCoverUrl(data.cover) : undefined;
  const bodyCover = hasExplicitCover ? undefined : firstParagraphCover(content);
  return {
    title,
    description: truncateSummary(summary),
    date: explicitDate ?? parseDate(fallbackDate) ?? new Date(0),
    dateSource: explicitDate ? "frontmatter" : fallbackDateSource,
    categories: categories.length
      ? categories
      : [id.includes("/") ? id.split("/")[0] : "随笔"],
    tags,
    readMinutes: estimateReadMinutes(content),
    featured: data.star === true || data.featured === true,
    empty: !content.trim(),
    cover: explicitCover ?? bodyCover,
    coverFromBody: !hasExplicitCover && Boolean(bodyCover),
  };
}

function visit(node, callback) {
  callback(node);
  for (const child of node.children ?? []) visit(child, callback);
}

function sourceIdFromFile(file) {
  const path = String(file.path ?? file.history?.[0] ?? "").replaceAll(
    "\\",
    "/",
  );
  const marker = path.lastIndexOf("/src/");
  return (
    marker < 0 ? path.replace(/^src\//, "") : path.slice(marker + 5)
  ).replace(/\.md$/i, "");
}

/** Adapt legacy article markup in the render pipeline, keeping Markdown as the source. */
export function remarkLegacyMarkdown({ base = "/" } = {}) {
  return (tree, file) => {
    // Reserve the original title too, so repeated sections retain VuePress's -1 suffix.
    const legacySlug = createLegacySlugger();
    visit(tree, (node) => {
      if (node.type !== "heading") return;
      node.data ??= {};
      node.data.hProperties ??= {};
      node.data.hProperties["data-legacy-heading-slug"] = legacySlug(
        legacyHeadingText(node),
      );
    });
    const firstTitle = tree.children?.findIndex(
      (node) => node.type === "heading" && node.depth === 1,
    );
    if (firstTitle >= 0) {
      tree.children.splice(firstTitle, 1, {
        type: "paragraph",
        data: {
          hName: "span",
          hProperties: {
            "data-legacy-removed-title":
              tree.children[firstTitle].data.hProperties[
                "data-legacy-heading-slug"
              ],
          },
        },
        children: [],
      });
    }
    const sourceId = sourceIdFromFile(file);
    visit(tree, (node) => {
      if ((node.type === "link" || node.type === "definition") && node.url) {
        node.url = rewriteLegacyHref(node.url, { sourceId, base });
      }
      if (node.type === "image" && node.url) {
        node.url = rewriteLegacyHref(node.url, { sourceId, base });
      }
      if (node.type === "code" && node.lang) {
        const language = node.lang.toLowerCase().trim();
        node.lang =
          {
            vue: "html",
            js: "javascript",
            ts: "typescript",
            dts: "typescript",
            shell: "bash",
            sh: "bash",
            npm: "bash",
            env: "dotenv",
            ".env": "dotenv",
            arduino: "cpp",
            dust: "html",
            delphi: "pascal",
            reasonml: "ocaml",
          }[language] ?? language;
      }
      if (node.type === "html") {
        node.value = node.value.replace(
          /(<(?:img|source)\b[^>]*\bsrcset\s*=\s*)(["'])([^"']*)\2/gi,
          (match, prefix, quote, srcset) => {
            if (/(?:^|,\s*)data:/i.test(srcset)) return match;
            const mounted = srcset.replace(
              /(^|,\s*)([^\s,]+)/g,
              (_, separator, href) =>
                `${separator}${rewriteLegacyHref(href, { sourceId, base })}`,
            );
            return `${prefix}${quote}${mounted}${quote}`;
          },
        );
        node.value = node.value.replace(
          /(<(?:img|video|source)\b[^>]*\bsrc=)(["'])([^"']*)\2/gi,
          (_, prefix, quote, href) =>
            `${prefix}${quote}${rewriteLegacyHref(href, { sourceId, base })}${quote}`,
        );
        node.value = node.value.replace(
          /(<a\b[^>]*\bhref\s*=\s*)(["'])([^"']*)\2/gi,
          (_, prefix, quote, href) =>
            `${prefix}${quote}${rewriteLegacyHref(href, { sourceId, base })}${quote}`,
        );
        node.value = node.value.replace(
          /<video\b([^>]*)>/gi,
          (_, attributes) => {
            if (!/(?:^|\s)controls(?:\s|=|$)/i.test(attributes))
              attributes += " controls";
            if (!/(?:^|\s)preload(?:\s|=|$)/i.test(attributes))
              attributes += ' preload="metadata"';
            return `<video${attributes}>`;
          },
        );
        node.value = node.value.replace(
          /<img\b([^>]*?)(\/?)>/gi,
          (_, attributes, closing) => {
            if (!/(?:^|\s)loading\s*=/i.test(attributes))
              attributes += ' loading="lazy"';
            if (!/(?:^|\s)decoding\s*=/i.test(attributes))
              attributes += ' decoding="async"';
            return `<img${attributes}${closing}>`;
          },
        );
      }
    });
  };
}

export function rehypeLegacyMedia() {
  return (tree, file = { data: {}, history: [] }) => {
    // Custom rehype plugins run before Astro's final heading collection.
    rehypeHeadingIds()(tree, file);
    addLegacyHeadingAliases(tree);
    visit(tree, (node) => {
      if (node.type !== "element") return;
      if (node.tagName === "img") {
        node.properties ??= {};
        node.properties.loading ??= "lazy";
        node.properties.decoding ??= "async";
      }
      if (node.tagName === "video") {
        node.properties ??= {};
        node.properties.controls = true;
        node.properties.preload ??= "metadata";
      }
    });
    rehypeHeadingIds()(tree, file);
  };
}

function marker(node, name) {
  return node.properties?.[name];
}

function legacyAnchor(id) {
  return {
    type: "element",
    tagName: "span",
    properties: {
      id,
      className: ["legacy-anchor"],
      ariaHidden: "true",
      style: "display:block;scroll-margin-top:0",
    },
    children: [],
  };
}

function addLegacyHeadingAliases(tree) {
  const legacyOwners = new Map();
  const headings = [];
  const otherIds = new Set();
  visit(tree, (node) => {
    if (node.type === "raw") {
      for (const match of node.value.matchAll(/\bid\s*=\s*(["'])([^"']+)\1/g))
        otherIds.add(match[2]);
      return;
    }
    if (node.type !== "element") return;
    const headingSlug = marker(node, "data-legacy-heading-slug");
    const removedTitleSlug = marker(node, "data-legacy-removed-title");
    if (headingSlug !== undefined) {
      headings.push(node);
      if (headingSlug) legacyOwners.set(headingSlug, node);
    } else if (removedTitleSlug !== undefined) {
      if (removedTitleSlug) legacyOwners.set(removedTitleSlug, node);
    } else if (typeof node.properties?.id === "string")
      otherIds.add(node.properties.id);
  });

  // An Astro slug can equal another section's old slug. Give old shared links
  // their intended destination, while keeping the final table of contents valid.
  for (const heading of headings) {
    const currentId = heading.properties.id;
    const owner = legacyOwners.get(currentId);
    const ownLegacyId = marker(heading, "data-legacy-heading-slug");
    if (owner && owner !== heading && ownLegacyId && !otherIds.has(ownLegacyId))
      heading.properties.id = ownLegacyId;
  }

  const usedIds = new Set(otherIds);
  visit(tree, (node) => {
    if (node.type === "element" && typeof node.properties?.id === "string")
      usedIds.add(node.properties.id);
  });

  function insertAliases(parent) {
    if (!parent.children) return;
    const children = [];
    for (const node of parent.children) {
      const removedTitle = marker(node, "data-legacy-removed-title");
      if (removedTitle !== undefined) {
        if (removedTitle && !usedIds.has(removedTitle)) {
          children.push(legacyAnchor(removedTitle));
          usedIds.add(removedTitle);
        }
        continue;
      }
      const oldSlug = marker(node, "data-legacy-heading-slug");
      if (oldSlug !== undefined) {
        delete node.properties["data-legacy-heading-slug"];
        if (
          oldSlug &&
          oldSlug !== node.properties.id &&
          !usedIds.has(oldSlug)
        ) {
          children.push(legacyAnchor(oldSlug));
          usedIds.add(oldSlug);
        }
      }
      insertAliases(node);
      children.push(node);
    }
    parent.children = children;
  }
  insertAliases(tree);
}
