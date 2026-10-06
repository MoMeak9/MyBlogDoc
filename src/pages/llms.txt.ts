import type { APIRoute } from "astro";
import { getPosts } from "../lib/content";
import { articleIndexEntry, llmsIndex } from "../lib/seo";

export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const articles = (await getPosts())
    .filter((post) => post.indexable)
    .map((post) => articleIndexEntry(post, site!.href, base));
  return new Response(llmsIndex(articles, site!.href, base), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
