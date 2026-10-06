import { localePath, normalizeBase, postPath } from "./paths.mjs";

type Metadata = Record<string, unknown>;
export type SourceLink = { url: string; title?: string };
export type ArticleAuthor = { name: string; url?: string; explicit: boolean };
export type ArticleDates = {
  publishedDate?: Date;
  modifiedDate?: Date;
  publishedDateSource?: "frontmatter";
  modifiedDateSource?: "frontmatter" | "migration" | "git";
};
export type SEOArticle = ArticleDates & {
  id: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  language: string;
  author: ArticleAuthor;
  sources: SourceLink[];
  indexable: boolean;
  cover?: string;
  readMinutes?: number;
  date?: Date;
  dateSource?: string;
};
type SiteIdentity = {
  author: { name: string };
  socials: { github: { href: string }; bilibili: { href: string } };
};

export function validDate(value: unknown): Date | undefined {
  if (!(value instanceof Date) && typeof value !== "string") return undefined;
  if (typeof value === "string" && !value.trim()) return undefined;
  const date =
    value instanceof Date ? new Date(value.getTime()) : new Date(value);
  if (!Number.isFinite(date.getTime())) return undefined;
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    date.toISOString().slice(0, 10) !== value
  )
    return undefined;
  return date;
}

function firstDate(...values: unknown[]) {
  for (const value of values) {
    const date = validDate(value);
    if (date) return date;
  }
  return undefined;
}

/** Migration timestamps and Git history describe modification, never publication. */
export function resolveArticleDates(
  data: Metadata,
  migrationModifiedAt?: unknown,
  gitModifiedAt?: unknown,
): ArticleDates {
  const publishedDate = firstDate(data.datePublished, data.pubDate, data.date);
  let modifiedDate = firstDate(
    data.dateModified,
    data.updated,
    data.updatedDate,
    data.lastmod,
  );
  let modifiedDateSource: ArticleDates["modifiedDateSource"] = modifiedDate
    ? "frontmatter"
    : undefined;
  if (!modifiedDate) {
    modifiedDate = validDate(migrationModifiedAt);
    if (modifiedDate) modifiedDateSource = "migration";
  }
  if (!modifiedDate) {
    modifiedDate = validDate(gitModifiedAt);
    if (modifiedDate) modifiedDateSource = "git";
  }
  // An older source file timestamp cannot establish a post-publication update.
  if (modifiedDate && publishedDate && modifiedDate < publishedDate) {
    modifiedDate = undefined;
    modifiedDateSource = undefined;
  }
  return {
    publishedDate,
    modifiedDate,
    publishedDateSource: publishedDate ? "frontmatter" : undefined,
    modifiedDateSource,
  };
}

export function isPublicArticle(data: Metadata) {
  return !(
    data.draft === true ||
    data.private === true ||
    data.published === false ||
    data.publish === false ||
    data.public === false ||
    data.visibility === "private" ||
    data.redirect
  );
}

export function safeHttpUrl(
  value: unknown,
  origin?: string,
): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    const url = origin ? new URL(value, origin) : new URL(value);
    return ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export function articleImageUrl(value: unknown, origin: string, base = "/") {
  if (typeof value !== "string" || !value.trim()) return undefined;
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value))
    return safeHttpUrl(value, origin);
  const mount = normalizeBase(base);
  const path =
    value.startsWith(mount) && mount !== "/"
      ? value
      : `${mount}${value.replace(/^\.?\//, "")}`;
  const url = safeHttpUrl(path, origin);
  return url && new URL(url).pathname.startsWith(mount) ? url : undefined;
}

function text(value: unknown): string {
  return typeof value === "string"
    ? value
        .replace(/<[^>]+>/g, "")
        .replace(/[*_`]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

function source(value: unknown): SourceLink | undefined {
  if (typeof value === "string") {
    const url = safeHttpUrl(value);
    return url ? { url } : undefined;
  }
  if (value && typeof value === "object") {
    const item = value as Metadata;
    const url = safeHttpUrl(item.url ?? item.href);
    return url
      ? { url, title: text(item.title ?? item.name) || undefined }
      : undefined;
  }
  return undefined;
}

/** Only explicit attribution labels qualify; ordinary article links are not citations. */
export function extractAttribution(
  data: Metadata,
  body: string,
  defaultName = "Yihui",
) {
  let author: ArticleAuthor = { name: defaultName, explicit: false };
  const rawAuthor = data.author;
  if (typeof rawAuthor === "string" && text(rawAuthor))
    author = { name: text(rawAuthor), explicit: true };
  else if (
    rawAuthor &&
    typeof rawAuthor === "object" &&
    text((rawAuthor as Metadata).name)
  ) {
    author = {
      name: text((rawAuthor as Metadata).name),
      url: safeHttpUrl((rawAuthor as Metadata).url),
      explicit: true,
    };
  }
  const sources: SourceLink[] = [];
  for (const raw of [
    data.source,
    data.canonicalOrigin,
    ...(Array.isArray(data.sources) ? data.sources : []),
  ]) {
    const item = source(raw);
    if (item) sources.push(item);
  }
  const visibleLines: string[] = [];
  let fence: { marker: string; length: number } | undefined;
  const prose = body.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "");
  for (const line of prose.split(/\r?\n/)) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = { marker: marker[1][0], length: marker[1].length };
      else if (
        marker[1][0] === fence.marker &&
        marker[1].length >= fence.length
      )
        fence = undefined;
      continue;
    }
    if (!fence) visibleLines.push(line);
  }
  for (const rawLine of visibleLines.slice(0, 120)) {
    const line = rawLine
      .replace(/^[\s>#-]+/, "")
      .replace(/\*\*/g, "")
      .trim();
    const authorLine = line.match(
      /^(?:原文作者|作者|original author|author)\s*[:：]\s*(.+)$/i,
    );
    if (!author.explicit && authorLine) {
      const namedLink = authorLine[1].match(
        /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/,
      );
      const name = text(namedLink?.[1] ?? authorLine[1]);
      if (name && name.length <= 100)
        author = { name, url: safeHttpUrl(namedLink?.[2]), explicit: true };
    }
    const sourceLine = line.match(
      /^(?:原文(?:链接|地址)?|文章来源|来源|original(?: article| source)?|source|translated from)\s*[:：]\s*(.+)$/i,
    );
    if (sourceLine) {
      const markdownLink = sourceLine[1].match(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/,
      );
      const htmlLink = sourceLine[1].match(
        /<a\b[^>]*href\s*=\s*["'](https?:\/\/[^"']+)["']/i,
      );
      const url = safeHttpUrl(
        markdownLink?.[2] ??
          htmlLink?.[1] ??
          sourceLine[1].match(/https?:\/\/[^\s<>"')]+/)?.[0],
      );
      if (url)
        sources.push({ url, title: text(markdownLink?.[1]) || undefined });
    }
  }
  return {
    author,
    sources: [...new Map(sources.map((item) => [item.url, item])).values()],
  };
}

export function contentLanguage(data: Metadata, visibleText = "") {
  const value = data.inLanguage ?? data.language ?? data.lang;
  if (
    typeof value === "string" &&
    /^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(value)
  )
    return value;
  const chinese = (visibleText.match(/[\u3400-\u9fff]/g) ?? []).length;
  const englishWords = (visibleText.match(/[A-Za-z]+/g) ?? []).length;
  return chinese <= 5 && englishWords > 100 ? "en" : "zh-CN";
}

export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function buildPageGraph({
  origin,
  base = "/",
  path = "",
  locale = "zh",
  title,
  description,
  identity,
  article,
}: {
  origin: string;
  base?: string;
  path?: string;
  locale?: string;
  title: string;
  description: string;
  identity: SiteIdentity;
  article?: SEOArticle;
}) {
  const absolute = (url: string) => new URL(url, origin).href;
  const home = absolute(localePath("", "zh", base));
  const canonical = absolute(localePath(path, locale, base));
  const personId = `${home}#person`;
  const blogId = `${home}#blog`;
  const person = {
    "@type": "Person",
    "@id": personId,
    name: identity.author.name,
    url: absolute(localePath("about", "zh", base)),
    sameAs: [
      identity.socials.github.href,
      identity.socials.bilibili.href,
    ].filter((value) => safeHttpUrl(value)),
  };
  const graph: Record<string, unknown>[] = [
    person,
    {
      "@type": "Blog",
      "@id": blogId,
      name: "Yihui’s Blog",
      url: home,
      description: "前端技术笔记与工程实践",
      inLanguage: "zh-CN",
      author: { "@id": personId },
      publisher: { "@id": personId },
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: article?.language ?? (locale === "en" ? "en" : "zh-CN"),
      isPartOf: { "@id": blogId },
    },
  ];
  if (article?.indexable) {
    const author =
      article.author.name === identity.author.name
        ? { "@id": personId }
        : {
            "@type": "Person",
            name: article.author.name,
            ...(article.author.url ? { url: article.author.url } : {}),
          };
    const image = articleImageUrl(article.cover, origin, base);
    graph.push(
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        url: canonical,
        mainEntityOfPage: { "@id": `${canonical}#webpage` },
        headline: article.title,
        description: article.description,
        inLanguage: article.language,
        author,
        editor: { "@id": personId },
        publisher: { "@id": personId },
        isPartOf: { "@id": blogId },
        ...(article.publishedDate
          ? { datePublished: article.publishedDate.toISOString() }
          : {}),
        ...(article.modifiedDate
          ? { dateModified: article.modifiedDate.toISOString() }
          : {}),
        ...(image ? { image } : {}),
        ...(article.tags.length ? { keywords: article.tags } : {}),
        articleSection: article.categories,
        ...(article.sources.length
          ? {
              isBasedOn: article.sources.map((item) => item.url),
              citation: article.sources.map((item) => ({
                "@type": "CreativeWork",
                url: item.url,
                ...(item.title ? { name: item.title } : {}),
              })),
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "en" ? "Home" : "首页",
            item: absolute(localePath("", locale, base)),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "en" ? "Journal" : "文章",
            item: absolute(localePath("blog", locale, base)),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: canonical,
          },
        ],
      },
    );
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function articleIndexEntry(
  article: SEOArticle,
  origin: string,
  base = "/",
) {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    url: new URL(postPath(article.id, "zh", base), origin).href,
    alternates: { en: new URL(postPath(article.id, "en", base), origin).href },
    inLanguage: article.language,
    categories: article.categories,
    tags: article.tags,
    ...(article.publishedDate
      ? { publishedDate: article.publishedDate.toISOString() }
      : {}),
    ...(article.modifiedDate
      ? { modifiedDate: article.modifiedDate.toISOString() }
      : {}),
    publishedDateSource: article.publishedDateSource,
    modifiedDateSource: article.modifiedDateSource,
    ...(article.date
      ? { date: article.date.toISOString(), dateSource: article.dateSource }
      : {}),
    readMinutes: article.readMinutes,
    author: {
      name: article.author.name,
      ...(article.author.url ? { url: article.author.url } : {}),
    },
    sources: article.sources,
  };
}

export function llmsIndex(
  entries: ReturnType<typeof articleIndexEntry>[],
  origin: string,
  base = "/",
) {
  const home = new URL(normalizeBase(base), origin).href;
  const label = (value: string) =>
    value
      .replace(/[\r\n\[\]]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  return `# Yihui’s Blog\n\n> 个人前端技术笔记与工程实践。界面有中英文，文章保持原始语言。\n\n此文件是可选的内容导航索引，不是搜索排名或 AI 引用保证。文章的真实日期和来源可在页面与 JSON 索引中查看。\n\n## 网站\n\n- [首页](${home})\n- [内容元数据索引](${new URL(`${normalizeBase(base)}content-index.json`, origin).href})\n\n## 文章\n\n${entries.map((entry) => `- [${label(entry.title)}](${entry.url}): ${label(entry.description)}`).join("\n")}\n`;
}
