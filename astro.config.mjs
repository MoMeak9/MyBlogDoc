import { defineConfig } from "astro/config";
import { readFileSync } from "node:fs";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import {
  remarkLegacyMarkdown,
  rehypeLegacyMedia,
} from "./src/lib/markdown.mjs";
import { normalizeBase } from "./src/lib/paths.mjs";
import { literalPercentRoutes } from "./src/lib/literal-percent-routes.mjs";

let articleIndex;
function indexedArticles() {
  if (!articleIndex) {
    // serialize runs after static routes, so this shares the exact published dates.
    const { articles } = JSON.parse(
      readFileSync(
        new URL("./dist/content-index.json", import.meta.url),
        "utf8",
      ),
    );
    articleIndex = new Map(
      articles.flatMap((article) => [
        [article.url, article],
        [article.alternates.en, article],
      ]),
    );
  }
  return articleIndex;
}

export default defineConfig({
  site: process.env.SITE_URL || "https://momeak9.github.io",
  base: normalizeBase(process.env.BASE_PATH || "/"),
  output: "static",
  trailingSlash: "always",
  integrations: [
    literalPercentRoutes(),
    sitemap({
      filter: (page) => !page.endsWith(".html") && !/\/404\/?$/.test(page),
      serialize(item) {
        // Use the same component encoding as canonical links, including literal =.
        const url = new URL(item.url);
        url.pathname = url.pathname
          .split("/")
          .map((segment) =>
            encodeURIComponent(
              decodeURIComponent(segment.replace(/%(?![0-9a-f]{2})/gi, "%25")),
            ),
          )
          .join("/");
        const relativePath = url.pathname.slice(
          normalizeBase(process.env.BASE_PATH || "/").length,
        );
        if (/^(?:en\/)?posts\//.test(relativePath)) {
          const article = indexedArticles().get(url.href);
          if (!article) return undefined;
          const lastmod = article.modifiedDate || article.publishedDate;
          return { ...item, url: url.href, ...(lastmod ? { lastmod } : {}) };
        }
        return { ...item, url: url.href };
      },
    }),
  ],
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        [
          remarkLegacyMarkdown,
          { base: normalizeBase(process.env.BASE_PATH || "/") },
        ],
      ],
      rehypePlugins: [rehypeLegacyMedia],
    }),
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: false,
    },
  },
});
