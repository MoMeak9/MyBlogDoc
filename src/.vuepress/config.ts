import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

export default defineHopeConfig({
  base: "/MyBlogDoc/",

  dest: "./dist",

  head: [],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Yihui's Blog",
      description: "前端小白的技术博客",
    },
  },

  themeConfig,
});
