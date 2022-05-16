import { defineUserConfig } from "vuepress";
// @ts-ignore
import theme from "./theme";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  base: "/",

  dest: "./dist",

  head: [],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Yihui's Blog",
      description: "前端小白的技术博客",
    },
  },
  plugins: [
    // @ts-ignore
    searchPlugin({
    }),
  ],
  theme,
});
