import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { before, test } from "node:test";

const root = process.cwd();
const dist = resolve(root, "dist");
const mountSegments = (process.env.BASE_PATH || "/").split("/").filter(Boolean);
const base = mountSegments.length ? `/${mountSegments.join("/")}/` : "/";
const origin = new URL(process.env.SITE_URL || "https://momeak9.github.io")
  .origin;

function filesIn(directory, ignoreHidden = false) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignoreHidden && entry.name.startsWith(".")) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path, ignoreHidden) : [path];
  });
}

const notes = filesIn(join(root, "src"), true)
  .filter((path) => path.endsWith(".md"))
  .map((path) => relative(join(root, "src"), path).replaceAll("\\", "/"));
function publicSource(path) {
  const content = readFileSync(join(root, "src", path), "utf8");
  const frontmatter =
    content.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? "";
  return (
    !/^(?:draft|private)\s*:\s*true\s*(?:#.*)?$/im.test(frontmatter) &&
    !/^(?:publish|published|public)\s*:\s*false\s*(?:#.*)?$/im.test(
      frontmatter,
    ) &&
    !/^visibility\s*:\s*["']?private["']?\s*(?:#.*)?$/im.test(frontmatter) &&
    !/^redirect\s*:\s*(?!false\s*$|null\s*$|~\s*$)\S+/im.test(frontmatter)
  );
}
const postIds = notes
  .filter(
    (path) =>
      !["README.md", "个人简介.md"].includes(path) && publicSource(path),
  )
  .map((path) => path.slice(0, -3));
const encodeId = (id) => id.split("/").map(encodeURIComponent).join("/");
const localizedRoute = (path, locale) =>
  `${base}${locale === "en" ? "en/" : ""}${path ? `${path}/` : ""}`;
const expectedUrl = (path) => new URL(path, origin).href;
const regularPages = ["zh", "en"].flatMap((locale) => [
  ...["", "blog", "about", "contact"].map((path) => ({
    locale,
    route: path,
    file: join(locale === "en" ? "en" : "", path, "index.html"),
  })),
  ...postIds.map((id) => ({
    locale,
    route: `posts/${encodeId(id)}`,
    file: join(locale === "en" ? "en" : "", "posts", id, "index.html"),
    id,
  })),
]);
const htmlCache = new Map();

let index;

before(() => {
  assert.ok(
    existsSync(dist) && statSync(dist).isDirectory(),
    "dist/ must exist; run pnpm build before pnpm test:build.",
  );
  const pageCount = Math.max(1, Math.ceil(contentIndex().articles.length / 12));
  for (let page = 2; page <= pageCount; page++) {
    for (const locale of ["zh", "en"])
      regularPages.push({
        locale,
        route: `blog/${page}`,
        file: join(
          locale === "en" ? "en" : "",
          "blog",
          String(page),
          "index.html",
        ),
      });
  }
});

function contentIndex() {
  index ??= JSON.parse(artifact("content-index.json"));
  return index;
}

function artifact(file) {
  const path = resolve(dist, file);
  assert.ok(
    existsSync(path) && statSync(path).isFile(),
    `Missing built file: ${file}`,
  );
  if (!htmlCache.has(path)) htmlCache.set(path, readFileSync(path, "utf8"));
  return htmlCache.get(path);
}

function decodeEntities(value) {
  return value.replace(
    /&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi,
    (entity) => {
      const named = {
        "&amp;": "&",
        "&quot;": '"',
        "&apos;": "'",
        "&lt;": "<",
        "&gt;": ">",
      };
      if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
      const code = entity.slice(2, -1);
      return String.fromCodePoint(
        code[0].toLowerCase() === "x"
          ? parseInt(code.slice(1), 16)
          : parseInt(code, 10),
      );
    },
  );
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/\b([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
      ([, name, doubleQuoted, singleQuoted]) => [
        name.toLowerCase(),
        decodeEntities(doubleQuoted ?? singleQuoted),
      ],
    ),
  );
}

function localTarget(pathname, from) {
  assert.ok(
    pathname.startsWith(base),
    `${from}: local URL misses deployment base ${base}: ${pathname}`,
  );
  const path = resolve(dist, decodeURIComponent(pathname.slice(base.length)));
  assert.ok(
    path === dist || path.startsWith(`${dist}/`),
    `${from}: local URL escapes dist/: ${pathname}`,
  );
  const target =
    pathname.endsWith("/") || (existsSync(path) && statSync(path).isDirectory())
      ? join(path, "index.html")
      : path;
  assert.ok(
    existsSync(target) && statSync(target).isFile(),
    `${from}: missing local target ${pathname}`,
  );
  return target;
}

function assertAbsoluteSiteUrl(value, from) {
  const url = new URL(value);
  assert.equal(url.origin, origin, `${from}: unexpected site origin`);
  localTarget(url.pathname, from);
  return url;
}

function locations(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    decodeEntities(match[1]),
  );
}

test("WeChat follow cards serve the original QR under the deployment base and only in Chinese", () => {
  const qrPath = "images/wechat-ml-qr.jpg";
  assert.deepEqual(
    readFileSync(join(dist, qrPath)),
    readFileSync(join(root, "public", qrPath)),
    "The QR image must be published without modification.",
  );
  for (const page of regularPages) {
    const html = artifact(page.file);
    const qrTags = [...html.matchAll(/<img\b[^>]*>/g)]
      .map(([tag]) => attributes(tag))
      .filter((attrs) => attrs.class?.includes("wechat-qr"));
    if (page.locale === "en") {
      assert.equal(qrTags.length, 0, page.file);
      assert.ok(!html.includes('class="social-link social-link--wechat"'), page.file);
    } else if (["", "contact"].includes(page.route) || page.id) {
      assert.equal(qrTags.length, 1, page.file);
      assert.equal(qrTags[0].src, `${base}${qrPath}`, page.file);
      assert.equal(qrTags[0].width, "430");
      assert.equal(qrTags[0].height, "430");
      assert.ok(html.includes('download="泯泷ML-公众号二维码.jpg"'), page.file);
    }
  }
});

test("public article comments share a discussion identity across locales and remain outside indexed prose", () => {
  for (const article of contentIndex().articles) {
    for (const locale of ["zh", "en"]) {
      const file = join(locale === "en" ? "en" : "", "posts", article.id, "index.html");
      const html = artifact(file);
      const sections = [...html.matchAll(/<section\b[^>]*>/g)]
        .map(([tag]) => ({ tag, attrs: attributes(tag) }))
        .filter(({ attrs }) => attrs.id === "comments");
      assert.equal(sections.length, 1, file);
      const { tag, attrs } = sections[0];
      assert.equal(attrs["data-term"], article.id, file);
      assert.equal(attrs["data-lang"], locale === "en" ? "en" : "zh-CN", file);
      assert.equal(attrs["data-repo"], "MoMeak9/MyBlogDoc", file);
      assert.match(tag, /\bdata-pagefind-ignore\b/, file);
      if (attrs["data-comments-enabled"] === "true") {
        assert.ok(attrs["data-repo-id"] && attrs["data-category-id"], file);
      } else {
        assert.ok(!html.includes("data-load-comments"), file);
      }
      const prose = html.match(/<article\b[^>]*class="prose"[\s\S]*?<\/article>/)?.[0];
      assert.ok(prose, file);
      assert.ok(!prose.includes('id="comments"'), file);
    }
  }
  for (const path of ["index.html", "contact/index.html", "en/index.html", "en/contact/index.html"]) {
    assert.ok(!artifact(path).includes('id="comments"'), path);
  }
});

test("every Markdown article has both locale pages and a real legacy HTML entry", (t) => {
  assert.ok(
    notes.includes("README.md") && notes.includes("个人简介.md"),
    "Home and biography Markdown sources must remain present.",
  );
  assert.ok(postIds.length > 0, "No article Markdown sources were found.");
  t.diagnostic(
    `${notes.length} Markdown sources produce ${postIds.length} articles in each locale.`,
  );
  for (const page of regularPages) artifact(page.file);
  for (const id of postIds) {
    const html = artifact(`${id}.html`);
    const target = localizedRoute(`posts/${encodeId(id)}`, "zh");
    const canonical = [...html.matchAll(/<link\b[^>]*>/gi)]
      .map((match) => attributes(match[0]))
      .find((link) => link.rel === "canonical");
    assert.equal(
      canonical?.href,
      expectedUrl(target),
      `${id}.html: legacy canonical must point to the new article.`,
    );
    assert.match(
      html,
      /http-equiv="refresh"/i,
      `${id}.html: legacy entry must redirect readers.`,
    );
    assert.ok(
      html.includes("location.replace("),
      `${id}.html: browser redirect must preserve old shared links.`,
    );
  }
  const countPages = (locale) =>
    filesIn(join(dist, locale === "en" ? "en/posts" : "posts")).filter((path) =>
      path.endsWith("/index.html"),
    ).length;
  assert.equal(
    countPages("zh"),
    postIds.length,
    "Unexpected Chinese article count.",
  );
  assert.equal(
    countPages("en"),
    postIds.length,
    "Unexpected English article count.",
  );
  artifact("404.html");
  artifact("en/404/index.html");
});

test("canonical and all language alternates use the configured site origin and mount", () => {
  for (const page of regularPages) {
    const html = artifact(page.file);
    const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) =>
      attributes(match[0]),
    );
    const canonicals = links.filter((link) => link.rel === "canonical");
    assert.equal(
      canonicals.length,
      1,
      `${page.file}: expected one canonical URL.`,
    );
    assert.equal(
      canonicals[0].href,
      expectedUrl(localizedRoute(page.route, page.locale)),
      `${page.file}: canonical URL mismatch.`,
    );
    const alternates = links.filter(
      (link) => link.rel === "alternate" && link.hreflang,
    );
    for (const [language, locale] of [
      ["zh-CN", "zh"],
      ["en", "en"],
      ["x-default", "zh"],
    ]) {
      const matches = alternates.filter((link) => link.hreflang === language);
      assert.equal(
        matches.length,
        1,
        `${page.file}: missing or duplicate ${language} alternate.`,
      );
      assert.equal(
        matches[0].href,
        expectedUrl(localizedRoute(page.route, locale)),
        `${page.file}: ${language} alternate URL mismatch.`,
      );
      assertAbsoluteSiteUrl(matches[0].href, page.file);
    }
    assert.match(
      html,
      new RegExp(
        `<html\\b[^>]*lang="${page.locale === "en" ? "en" : "zh-CN"}"`,
      ),
      `${page.file}: document language mismatch.`,
    );
  }
});

test("absolute local navigation and media URLs resolve to published files", (t) => {
  const checked = new Set();
  for (const file of filesIn(dist).filter((path) => path.endsWith(".html"))) {
    const from = relative(dist, file);
    const html = artifact(from);
    for (const match of html.matchAll(
      /<(?:a|link|script|img|source|video|audio|iframe)\b[^>]*>/gi,
    )) {
      const attrs = attributes(match[0]);
      const values = [attrs.href, attrs.src, attrs.poster];
      if (attrs.srcset && !attrs.srcset.startsWith("data:"))
        values.push(
          ...attrs.srcset
            .split(",")
            .map((value) => value.trim().split(/\s+/)[0]),
        );
      for (const value of values) {
        if (!value?.startsWith("/") || value.startsWith("//")) continue;
        const pathname = new URL(value, origin).pathname;
        if (checked.has(pathname)) continue;
        localTarget(pathname, from);
        checked.add(pathname);
      }
    }
  }
  assert.ok(
    checked.size >= regularPages.length,
    "Local navigation discovery missed published routes.",
  );
  t.diagnostic(
    `${checked.size} distinct local navigation/resource URLs resolve under ${base}.`,
  );
});

test("sitemaps include every public locale page and omit errors and legacy redirects", () => {
  const index = artifact("sitemap-index.xml");
  assert.match(index, /<sitemapindex\b/);
  const sitemapUrls = locations(index);
  assert.ok(sitemapUrls.length > 0, "Sitemap index is empty.");
  const pageUrls = [];
  for (const sitemapUrl of sitemapUrls) {
    const url = assertAbsoluteSiteUrl(sitemapUrl, "sitemap-index.xml");
    const xml = readFileSync(
      localTarget(url.pathname, "sitemap-index.xml"),
      "utf8",
    );
    assert.match(xml, /<urlset\b/);
    pageUrls.push(...locations(xml));
  }
  assert.equal(
    pageUrls.length,
    new Set(pageUrls).size,
    "Sitemap contains duplicate URLs.",
  );
  for (const value of pageUrls) {
    const url = assertAbsoluteSiteUrl(value, "sitemap");
    assert.ok(
      !url.pathname.endsWith(".html"),
      `Legacy HTML URL leaked into sitemap: ${value}`,
    );
    assert.ok(
      !/\/404\/?$/.test(url.pathname),
      `404 URL leaked into sitemap: ${value}`,
    );
  }
  const indexedIds = new Set(
    contentIndex().articles.map((article) => article.id),
  );
  assert.deepEqual(
    new Set(pageUrls),
    new Set(
      regularPages
        .filter((page) => !page.id || indexedIds.has(page.id))
        .map((page) => expectedUrl(localizedRoute(page.route, page.locale))),
    ),
    "Sitemap must cover public indexable pages and pagination, excluding empty notes.",
  );
  const articlesByUrl = new Map(
    contentIndex().articles.flatMap((article) => [
      [article.url, article],
      [article.alternates.en, article],
    ]),
  );
  for (const sitemapUrl of sitemapUrls) {
    const xml = readFileSync(
      localTarget(new URL(sitemapUrl).pathname, "sitemap"),
      "utf8",
    );
    for (const [, entry] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const article = articlesByUrl.get(locations(entry)[0]);
      if (!article) continue;
      const expectedDate = article.modifiedDate || article.publishedDate;
      const actualDate = entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
      if (expectedDate)
        assert.equal(
          new Date(actualDate).toISOString(),
          expectedDate,
          "Sitemap lastmod must match the known article date.",
        );
      else
        assert.equal(
          actualDate,
          undefined,
          "Undated articles must not use the build timestamp.",
        );
    }
  }
});

test("RSS publishes 50 complete articles with valid mounted links and escaped XML", () => {
  const xml = artifact("rss.xml");
  assert.match(xml, /^<\?xml[^>]*\?><rss\b[^>]*version="2\.0"/);
  assert.ok(xml.endsWith("</channel></rss>"), "RSS document is not closed.");
  assert.doesNotMatch(
    xml,
    /&(?!(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);)/i,
    "RSS contains an unescaped ampersand.",
  );
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(
    (match) => match[1],
  );
  assert.equal(
    items.length,
    50,
    "RSS must contain the latest 50 nonempty articles.",
  );
  const links = [];
  for (const item of items) {
    for (const field of ["title", "link", "description"])
      assert.match(
        item,
        new RegExp(`<${field}>[^<]+</${field}>`),
        `RSS article lacks ${field}.`,
      );
    const link = decodeEntities(item.match(/<link>([^<]+)<\/link>/)[1]);
    const url = assertAbsoluteSiteUrl(link, "RSS");
    assert.ok(
      url.pathname.startsWith(`${base}posts/`),
      `RSS article must use the Chinese article route: ${link}`,
    );
    const guid = decodeEntities(
      item.match(/<guid\s+isPermaLink="true">([^<]+)<\/guid>/)?.[1] || "",
    );
    assert.equal(guid, link, "RSS permalink GUID must match its article link.");
    const article = contentIndex().articles.find(
      (article) => article.url === link,
    );
    assert.ok(article, "RSS article must belong to the public content index.");
    assert.equal(
      item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1],
      article.publishedDate
        ? new Date(article.publishedDate).toUTCString()
        : undefined,
      "RSS publication date must not be invented from a modification timestamp.",
    );
    assert.equal(
      item.match(/<dc:date>([^<]+)<\/dc:date>/)?.[1],
      article.modifiedDate,
      "RSS modification date must match the visible article.",
    );
    links.push(link);
  }
  assert.equal(
    links.length,
    new Set(links).size,
    "RSS contains duplicate articles.",
  );
  const self = attributes(xml.match(/<atom:link\b[^>]*>/)[0]);
  assert.equal(self.href, expectedUrl(`${base}rss.xml`));
  assert.equal(
    decodeEntities(xml.match(/<channel>[\s\S]*?<link>([^<]+)<\/link>/)[1]),
    expectedUrl(base),
  );
});

test("metadata and optional llms indexes contain public canonical articles without body duplication", () => {
  const entries = contentIndex().articles;
  assert.ok(entries.length > 0);
  assert.equal(
    entries.length,
    new Set(entries.map((article) => article.id)).size,
  );
  const llms = artifact("llms.txt");
  assert.ok(llms.startsWith("# Yihui’s Blog\n"));
  const migration = JSON.parse(
    readFileSync(join(root, "src/data/migration-metadata.json"), "utf8"),
  );
  for (const article of entries) {
    assert.ok(
      postIds.includes(article.id),
      `Indexed article has no public Markdown source: ${article.id}`,
    );
    assert.equal(
      article.url,
      expectedUrl(localizedRoute(`posts/${encodeId(article.id)}`, "zh")),
    );
    assert.equal(
      article.alternates.en,
      expectedUrl(localizedRoute(`posts/${encodeId(article.id)}`, "en")),
    );
    assertAbsoluteSiteUrl(article.url, "content index");
    assert.ok(
      llms.includes(`](${article.url})`),
      `llms index misses ${article.id}`,
    );
    assert.equal(
      "body" in article,
      false,
      "Metadata index must not duplicate all article bodies.",
    );
    assert.ok(Number.isFinite(article.readMinutes) && article.readMinutes >= 1);
    if (article.modifiedDateSource === "migration")
      assert.equal(
        article.modifiedDate,
        new Date(migration[article.id].sourceModifiedAt).toISOString(),
        "Migration must retain the original source modification date.",
      );
    if (article.publishedDate)
      assert.equal(
        article.publishedDateSource,
        "frontmatter",
        "Publication requires explicit source metadata.",
      );
  }
  assert.equal(
    (llms.match(/^\- \[[^\n]+\]\(https?:[^\n]+\/posts\//gm) ?? []).length,
    entries.length,
    "llms must list each public article once.",
  );
});

test("published JSON-LD and social metadata agree with article bylines, dates and visible breadcrumbs", () => {
  const entries = new Map(
    contentIndex().articles.map((article) => [article.id, article]),
  );
  for (const page of regularPages) {
    const html = artifact(page.file);
    const scripts = [
      ...html.matchAll(
        /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
      ),
    ];
    assert.equal(
      scripts.length,
      1,
      `${page.file}: expected one JSON-LD graph.`,
    );
    const graph = JSON.parse(scripts[0][1])["@graph"];
    const person = graph.find((item) => item["@type"] === "Person");
    assert.equal(person.name, "Yihui");
    assert.deepEqual(person.sameAs, [
      "https://github.com/MoMeak9",
      "https://space.bilibili.com/298768693",
    ]);
    assert.ok(graph.some((item) => item["@type"] === "Blog"));
    const meta = new Map(
      [...html.matchAll(/<meta\b[^>]*>/gi)]
        .map((match) => attributes(match[0]))
        .map((attrs) => [attrs.property || attrs.name, attrs.content]),
    );
    const image = new URL(meta.get("og:image"));
    if (image.origin === origin) localTarget(image.pathname, page.file);
    assert.equal(meta.get("twitter:image"), meta.get("og:image"));
    assert.equal(meta.get("twitter:card"), "summary_large_image");
    assert.ok(meta.get("og:image:alt"));
    const entry = entries.get(page.id);
    const post = graph.find((item) => item["@type"] === "BlogPosting");
    if (!page.id) {
      assert.equal(post, undefined);
      continue;
    }
    if (!entry) {
      assert.equal(
        post,
        undefined,
        "Empty/unlisted notes must not claim article schema.",
      );
      assert.ok(meta.get("robots")?.includes("noindex"));
      continue;
    }
    assert.ok(post, `${page.file}: article schema is absent.`);
    assert.equal(
      post.url,
      expectedUrl(localizedRoute(page.route, page.locale)),
    );
    assert.equal(post.inLanguage, entry.inLanguage);
    assert.equal(post.datePublished, entry.publishedDate);
    assert.equal(post.dateModified, entry.modifiedDate);
    assert.equal(meta.get("article:published_time"), entry.publishedDate);
    assert.equal(meta.get("article:modified_time"), entry.modifiedDate);
    if (entry.author.name !== "Yihui")
      assert.equal(
        post.author.name,
        entry.author.name,
        "Source author must not be replaced with the blog publisher.",
      );
    for (const [kind, date] of [
      ["published", entry.publishedDate],
      ["modified", entry.modifiedDate],
    ]) {
      const times = [...html.matchAll(/<time\b[^>]*>/gi)]
        .map((match) => attributes(match[0]))
        .filter((attrs) => attrs["data-date-kind"] === kind);
      assert.equal(
        times.length,
        date ? 1 : 0,
        `${page.file}: ${kind} date visibility mismatch.`,
      );
      if (date) assert.equal(times[0].datetime, date);
    }
    const breadcrumb = graph.find((item) => item["@type"] === "BreadcrumbList");
    const nav = html.match(
      /<nav\b[^>]*class="article-breadcrumbs"[^>]*>([\s\S]*?)<\/nav>/,
    )?.[1];
    assert.ok(nav, `${page.file}: structured breadcrumbs must be visible.`);
    const links = [...nav.matchAll(/<a\b[^>]*>/gi)].map(
      (match) => attributes(match[0]).href,
    );
    assert.deepEqual(
      links.map(expectedUrl),
      breadcrumb.itemListElement.map((item) => item.item),
    );
    for (const source of entry.sources)
      assert.ok(
        decodeEntities(html).includes(source.url),
        "Structured citation must be visible in the article.",
      );
    if (post.image)
      assert.ok(
        !post.image.endsWith("/social-card.jpg"),
        "Brand artwork is not a representative article image.",
      );
    assert.equal(post.aggregateRating, undefined);
  }
  for (const file of ["404.html", "en/404/index.html"])
    assert.doesNotMatch(
      artifact(file),
      /application\/ld\+json/,
      "Error pages must not publish structured article data.",
    );
});

test("IDE project files are absent from Git tracking", () => {
  const tracked = execFileSync("git", ["ls-files", "--", ".idea"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(tracked.trim(), "", ".idea files must not be committed.");
});
