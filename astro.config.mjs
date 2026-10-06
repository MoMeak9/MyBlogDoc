import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import {
  remarkLegacyMarkdown,
  rehypeLegacyMedia,
} from "./src/lib/markdown.mjs";
import { normalizeBase } from "./src/lib/paths.mjs";

export default defineConfig({
  site: process.env.SITE_URL || "https://momeak9.github.io",
  base: normalizeBase(process.env.BASE_PATH || "/"),
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith(".html") && !/\/404\/?$/.test(page),
      serialize(item) {
        // Use the same component encoding as canonical links, including literal =.
        const url = new URL(item.url);
        url.pathname = url.pathname
          .split("/")
          .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
          .join("/");
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
