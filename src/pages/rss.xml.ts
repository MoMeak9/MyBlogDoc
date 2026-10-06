import type { APIRoute } from "astro";
import { getPosts } from "../lib/content";
import { localePath, postPath } from "../lib/paths.mjs";

const escape = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );
export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const posts = (await getPosts())
    .filter((post) => post.indexable)
    .slice(0, 50);
  const home = new URL(localePath("", "zh", base), site).href;
  const self = new URL(`${base}rss.xml`, site).href;
  const items = posts
    .map((post) => {
      const url = escape(new URL(postPath(post.id, "zh", base), site).href);
      return `<item><title>${escape(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escape(post.description)}</description>${post.publishedDate ? `<pubDate>${post.publishedDate.toUTCString()}</pubDate>` : ""}${post.modifiedDate ? `<dc:date>${post.modifiedDate.toISOString()}</dc:date>` : ""}${post.categories.map((category) => `<category>${escape(category)}</category>`).join("")}</item>`;
    })
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>Yihui’s Blog</title><link>${escape(home)}</link><description>前端技术笔记与工程实践</description><language>zh-CN</language><atom:link href="${escape(self)}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
};
