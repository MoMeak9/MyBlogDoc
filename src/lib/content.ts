import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { extractPostMetadata, plainText } from "./markdown.mjs";
import { localizeDocumentHtml } from "./paths.mjs";
import {
  contentLanguage,
  extractAttribution,
  isPublicArticle,
  resolveArticleDates,
  type SEOArticle,
} from "./seo";
import { site } from "../config/site";

export type DocumentEntry = CollectionEntry<"docs">;
export type DocumentHeading = { depth: number; slug: string; text: string };
export type Post = SEOArticle & {
  entry: DocumentEntry;
  id: string;
  title: string;
  description: string;
  date: Date;
  dateSource: "frontmatter" | "migration" | "git" | "filesystem" | "unknown";
  categories: string[];
  tags: string[];
  readMinutes: number;
  body: string;
  featured: boolean;
  empty: boolean;
  sourcePath: string;
  cover?: string;
};

let gitDates: Map<string, Date> | undefined;
let migrationMetadata:
  Record<string, { sourceModifiedAt?: string }> | undefined;
const postCache = new Map<
  string,
  { digest: string | number | undefined; post: Post }
>();

/** One history scan supplies deterministic dates for all notes without frontmatter. */
function getGitDates() {
  if (gitDates) return gitDates;
  gitDates = new Map();
  try {
    const log = execFileSync(
      "git",
      [
        "-c",
        "core.quotepath=false",
        "log",
        "--format=@@%cI",
        "--name-only",
        "--",
        "src",
      ],
      {
        cwd: process.cwd(),
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
        stdio: ["ignore", "pipe", "ignore"],
      },
    );
    let currentDate: Date | undefined;
    for (const line of log.split(/\r?\n/)) {
      if (line.startsWith("@@")) currentDate = new Date(line.slice(2));
      else if (line.endsWith(".md") && currentDate && !gitDates.has(line))
        gitDates.set(line, currentDate);
    }
  } catch {
    // A newly created local document can still be previewed outside a Git checkout.
  }
  return gitDates;
}

function migratedDate(id: string) {
  if (!migrationMetadata) {
    try {
      migrationMetadata = JSON.parse(
        readFileSync(
          resolve(process.cwd(), "src/data/migration-metadata.json"),
          "utf8",
        ),
      );
    } catch {
      migrationMetadata = {};
    }
  }
  return migrationMetadata?.[id]?.sourceModifiedAt;
}

function fallbackDate(sourcePath: string): {
  date: Date;
  source: Post["dateSource"];
} {
  const fromGit = getGitDates().get(sourcePath);
  if (fromGit) return { date: fromGit, source: "git" };
  try {
    return {
      date: statSync(resolve(process.cwd(), sourcePath)).mtime,
      source: "filesystem",
    };
  } catch {
    return { date: new Date(0), source: "unknown" };
  }
}

export function toPost(entry: DocumentEntry): Post {
  const cached = postCache.get(entry.id);
  if (cached && cached.digest === entry.digest) return cached.post;
  const sourcePath = entry.filePath ?? `src/${entry.id}.md`;
  const body = entry.body ?? "";
  const fallback = fallbackDate(sourcePath);
  const metadata = extractPostMetadata({
    id: entry.id,
    body,
    data: entry.data,
    fallbackDate: fallback.date,
    fallbackDateSource: fallback.source,
  });
  const dates = resolveArticleDates(
    entry.data,
    migratedDate(entry.id),
    getGitDates().get(sourcePath),
  );
  const attribution = extractAttribution(entry.data, body, site.author.name);
  const knownDate = dates.publishedDate ?? dates.modifiedDate;
  const post: Post = {
    ...metadata,
    description: metadata.description || metadata.title,
    ...dates,
    ...attribution,
    date: knownDate ?? metadata.date,
    dateSource: dates.publishedDate
      ? "frontmatter"
      : (dates.modifiedDateSource ??
        (metadata.dateSource as Post["dateSource"])),
    language: contentLanguage(entry.data, plainText(body)),
    indexable:
      !metadata.empty &&
      isPublicArticle(entry.data) &&
      entry.data.unlisted !== true,
    entry,
    id: entry.id,
    body,
    sourcePath,
  };
  postCache.set(entry.id, { digest: entry.digest, post });
  return post;
}

export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection(
    "docs",
    ({ id, data }) =>
      id !== "README" && id !== "个人简介" && isPublicArticle(data),
  );
  return entries
    .map(toPost)
    .sort(
      (a, b) =>
        b.date.getTime() - a.date.getTime() ||
        a.title.localeCompare(b.title, "zh-Hans"),
    );
}

export async function getAbout() {
  return getEntry("docs", "个人简介");
}

export async function getIndexablePosts(): Promise<Post[]> {
  return (await getPosts()).filter((post) => post.indexable);
}

export async function getHome() {
  return getEntry("docs", "README");
}

export async function renderDocument(entry: DocumentEntry, locale = "zh") {
  return {
    html: localizeDocumentHtml(
      entry.rendered?.html ?? "",
      locale,
      import.meta.env.BASE_URL,
    ),
    headings: (entry.rendered?.metadata?.headings ?? []) as DocumentHeading[],
  };
}

export async function renderPost(post: Post, locale = "zh") {
  return renderDocument(post.entry, locale);
}
