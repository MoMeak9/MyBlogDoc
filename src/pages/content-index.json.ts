import type { APIRoute } from "astro";
import { getPosts } from "../lib/content";
import { articleIndexEntry } from "../lib/seo";

export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const articles = (await getPosts())
    .filter((post) => post.indexable)
    .map((post) => articleIndexEntry(post, site!.href, base));
  return new Response(
    JSON.stringify({
      name: "Yihui’s Blog",
      description:
        "Public article metadata; interface languages do not translate article bodies.",
      articles,
    }),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
  );
};
