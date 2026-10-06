import type { APIRoute } from "astro";
import { getIndexablePosts } from "../lib/content";
import { plainText } from "../lib/markdown.mjs";

/** Downloaded when a reader searches, never embedded in the archive HTML. */
export const GET: APIRoute = async () =>
  new Response(
    JSON.stringify({
      articles: (await getIndexablePosts()).map((post) => ({
        id: post.id,
        text: plainText(post.body).normalize("NFKC").toLocaleLowerCase(),
      })),
    }),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
  );
