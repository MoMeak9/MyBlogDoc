import assert from "node:assert/strict";
import test from "node:test";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import {
  createLegacySlugger,
  extractPostMetadata,
  firstHeading,
  legacySlugify,
  normalizeList,
  parseDate,
  plainText,
  remarkLegacyMarkdown,
  rehypeLegacyMedia,
  stripFrontmatter,
} from "../src/lib/markdown.mjs";

test("sharing covers come from visible images rather than Markdown code examples", () => {
  const body =
    "# 标题\n\n```md\n![demo](https://example.com/example.png)\n```\n\n正文。";
  assert.equal(extractPostMetadata({ id: "笔记", body }).cover, undefined);
  assert.equal(
    extractPostMetadata({
      id: "笔记",
      body: body + "\n![real](https://example.com/real.png)",
    }).cover,
    "https://example.com/real.png",
  );
});

test("legacy frontmatter remains optional and the first real H1 supplies a title", () => {
  const body =
    "---\ntitle: unused in this body helper\ncategory:\n  - React\n---\n\n```md\n# Example, not the article title\n```\n\n# **真实标题** #\n\n这里是一篇正文。";
  assert.equal(firstHeading(body), "真实标题");
  assert.equal(stripFrontmatter(body).startsWith("\n```md"), true);
  const metadata = extractPostMetadata({ id: "React/笔记", body });
  assert.equal(metadata.title, "真实标题");
  assert.equal(metadata.description.includes("这里是一篇正文。"), true);
  assert.deepEqual(metadata.categories, ["React"]);
});

test("explicit title and description win, with metadata aliases and duplicate cleanup", () => {
  const metadata = extractPostMetadata({
    id: "JavaScript/嵌套/旧名称",
    body: "# Markdown title\n\n正文内容",
    data: {
      title: "新的 **标题**",
      description: "自定义 `摘要`",
      category: ["JavaScript", "JavaScript", "  Web "],
      tag: "API",
      star: true,
    },
  });
  assert.equal(metadata.title, "新的 标题");
  assert.equal(metadata.description, "自定义 摘要");
  assert.deepEqual(metadata.categories, ["JavaScript", "Web"]);
  assert.deepEqual(metadata.tags, ["API"]);
  assert.equal(metadata.featured, true);
  assert.deepEqual(normalizeList([null, 4, "CSS", "CSS", " "]), ["CSS"]);
});

test("frontmatter dates win over Git dates and missing dates expose their fallback source", () => {
  const fallbackDate = new Date("2023-07-14T00:44:34+08:00");
  const explicit = extractPostMetadata({
    id: "React/文章",
    data: { date: "2022-05-17" },
    fallbackDate,
    fallbackDateSource: "git",
  });
  assert.equal(explicit.date.toISOString(), "2022-05-17T00:00:00.000Z");
  assert.equal(explicit.dateSource, "frontmatter");
  const legacy = extractPostMetadata({
    id: "React/文章",
    fallbackDate,
    fallbackDateSource: "git",
  });
  assert.equal(legacy.date.toISOString(), fallbackDate.toISOString());
  assert.equal(legacy.dateSource, "git");
  assert.equal(parseDate("2024-02-31"), undefined);
  assert.equal(parseDate("not a date"), undefined);
  assert.equal(
    parseDate("2024-02-29").toISOString(),
    "2024-02-29T00:00:00.000Z",
  );
});

test("empty documents retain a filename title and body summaries omit code and image URLs", () => {
  const empty = extractPostMetadata({ id: "前端/嵌套/空文章", body: "  \n" });
  assert.equal(empty.title, "空文章");
  assert.equal(empty.empty, true);
  assert.equal(empty.readMinutes, 1);
  assert.equal(
    plainText(
      '# 标题\n```js\nconsole.log("internal");\n```\n![图](https://example.com/a.png)\n[说明](https://example.com)\n正文。',
    ),
    "标题 说明 正文。",
  );
});

test("Markdown adaptations remove one page title while preserving later H1 sections", () => {
  const tree = {
    type: "root",
    children: [
      {
        type: "heading",
        depth: 1,
        children: [{ type: "text", value: "Title" }],
      },
      { type: "code", lang: "vue", value: "<template />" },
      {
        type: "heading",
        depth: 1,
        children: [{ type: "text", value: "Real section" }],
      },
      { type: "link", url: "../React 笔记.md#hooks", children: [] },
      { type: "definition", url: "/个人简介.md" },
      {
        type: "html",
        value:
          '<video src="https://example.com/movie.mp4"></video><img src="https://example.com/a.png"/><a href="../React 笔记.html">上一篇</a>',
      },
    ],
  };
  remarkLegacyMarkdown({ base: "/MyBlogDoc/" })(tree, {
    path: "/workspace/src/React/Hooks/当前文章.md",
  });
  assert.equal(tree.children[0].data.hName, "span");
  assert.equal(
    tree.children[0].data.hProperties["data-legacy-removed-title"],
    "title",
  );
  assert.equal(tree.children[1].type, "code");
  assert.equal(tree.children[1].lang, "html");
  assert.equal(tree.children[2].children[0].value, "Real section");
  assert.equal(
    tree.children[3].url,
    "/MyBlogDoc/posts/React/React%20%E7%AC%94%E8%AE%B0/#hooks",
  );
  assert.equal(tree.children[4].url, "/MyBlogDoc/about/");
  assert.match(
    tree.children[5].value,
    /<video[^>]* controls[^>]* preload="metadata"/,
  );
  assert.match(tree.children[5].value, /<img[^>]*loading="lazy"/);
  assert.match(
    tree.children[5].value,
    /href="\/MyBlogDoc\/posts\/React\/React%20%E7%AC%94%E8%AE%B0\/"/,
  );
});

test("responsive profile pictures keep every source mounted without changing external or data URLs", () => {
  const picture =
    '<picture><source media="(prefers-color-scheme: dark)" srcset="/content-assets/profile-dark.svg 1x, /content-assets/profile-dark@2x.svg 2x"><img src="/content-assets/profile-light.svg" srcset="https://example.com/profile.svg 1x, /content-assets/profile-light@2x.svg 2x"></picture>';
  const inline = '<img srcset="data:image/svg+xml,%3Csvg%3E 1x">';
  for (const base of ["/", "/MyBlogDoc/"]) {
    const tree = {
      type: "root",
      children: [
        { type: "html", value: picture },
        { type: "html", value: inline },
      ],
    };
    remarkLegacyMarkdown({ base })(tree, {
      path: "/workspace/src/个人简介.md",
    });
    const html = tree.children[0].value;
    assert.ok(
      html.includes(
        `srcset="${base}content-assets/profile-dark.svg 1x, ${base}content-assets/profile-dark@2x.svg 2x"`,
      ),
    );
    assert.ok(html.includes(`src="${base}content-assets/profile-light.svg"`));
    assert.ok(
      html.includes(
        `srcset="https://example.com/profile.svg 1x, ${base}content-assets/profile-light@2x.svg 2x"`,
      ),
    );
    assert.ok(
      tree.children[1].value.includes(
        'srcset="data:image/svg+xml,%3Csvg%3E 1x"',
      ),
    );
  }
});

test("media adaptations preserve author choices and include playback controls", () => {
  const tree = {
    children: [
      { type: "element", tagName: "img", properties: { loading: "eager" } },
      { type: "element", tagName: "img", properties: {} },
      { type: "element", tagName: "video", properties: { preload: "none" } },
    ],
  };
  rehypeLegacyMedia()(tree);
  assert.equal(tree.children[0].properties.loading, "eager");
  assert.equal(tree.children[1].properties.loading, "lazy");
  assert.equal(tree.children[1].properties.decoding, "async");
  assert.equal(tree.children[2].properties.controls, true);
  assert.equal(tree.children[2].properties.preload, "none");
});

test("VuePress slugs preserve numeric prefixes, Chinese punctuation and normalized accents", () => {
  assert.equal(legacySlugify("1. 组件：初始化（示例）"), "_1-组件-初始化-示例");
  assert.equal(legacySlugify("开发、构建 & 发布"), "开发、构建-发布");
  assert.equal(legacySlugify("Café résumé"), "cafe-resume");
  const slug = createLegacySlugger();
  assert.equal(slug("Repeat"), "repeat");
  assert.equal(slug("Repeat"), "repeat-1");
  assert.equal(slug("Repeat-1"), "repeat-1-1");
  assert.equal(slug("Repeat"), "repeat-2");
});

async function renderLegacyMarkdown(source) {
  const processor = await createMarkdownProcessor({
    syntaxHighlight: false,
    remarkPlugins: [remarkLegacyMarkdown],
    rehypePlugins: [rehypeLegacyMedia],
  });
  return processor.render(source, {
    fileURL: new URL("file:///workspace/src/React/文章.md"),
  });
}

function assertUniqueIds(html) {
  const ids = [...html.matchAll(/\bid="([^"]*)"/g)].map((match) => match[1]);
  assert.equal(
    ids.length,
    new Set(ids).size,
    `Duplicate anchor IDs: ${ids.join(", ")}`,
  );
  return ids;
}

test("rendered articles retain removed-title and numeric/Chinese aliases without changing heading text", async () => {
  const { code, metadata } = await renderLegacyMarkdown(
    "# 1. 首页：说明（版本）\n\n引言。\n\n## 2. 模块：状态（更新）\n\n正文。\n\n## 开发、构建 & 发布",
  );
  const ids = assertUniqueIds(code);
  assert.equal(ids.includes("_1-首页-说明-版本"), true);
  assert.equal(ids.includes("_2-模块-状态-更新"), true);
  assert.equal(ids.includes("开发、构建-发布"), true);
  assert.equal(code.includes("<h1"), false);
  assert.equal(code.includes("data-legacy-heading-slug"), false);
  assert.deepEqual(
    metadata.headings.map((heading) => heading.text),
    ["2. 模块：状态（更新）", "开发、构建 & 发布"],
  );
});

test("repeated headings count the removed page title and keep every old shared link unique", async () => {
  const { code, metadata } = await renderLegacyMarkdown(
    "# Repeat\n\n## Repeat\n\nOne\n\n## Repeat\n\nTwo\n\n## Repeat-1",
  );
  const ids = assertUniqueIds(code);
  for (const id of ["repeat", "repeat-1", "repeat-2", "repeat-1-1"])
    assert.equal(ids.includes(id), true, id);
  assert.deepEqual(
    metadata.headings.map((heading) => heading.slug),
    ["repeat-1", "repeat-2", "repeat-1-1"],
  );
});

test("a new heading slug cannot steal another section’s old anchor", async () => {
  const { code, metadata } = await renderLegacyMarkdown(
    "# Intro\n\n## A：B\n\nFirst\n\n## A-B\n\nSecond",
  );
  const ids = assertUniqueIds(code);
  assert.equal(ids.includes("a-b"), true);
  assert.match(code, /<span id="a-b"[^>]*><\/span><h2 id="ab">A：B<\/h2>/);
  assert.deepEqual(
    metadata.headings.map((heading) => heading.slug),
    ["ab", "a-b-1"],
  );
});
