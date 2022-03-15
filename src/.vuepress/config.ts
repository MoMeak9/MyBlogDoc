import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

export default defineHopeConfig({
  base: "/",

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
  ],

  locales: {
    "/zh/": {
      lang: "zh-CN",
      title: "一方净土",
      description: "Yihui's Blog",
    },
    "/": {
      lang: "en-US",
      title: "一方净土",
      description: "Yihui's Blog",
    },
  },

  themeConfig,
});
