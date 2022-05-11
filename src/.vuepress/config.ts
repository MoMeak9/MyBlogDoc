import { defineUserConfig } from "vuepress";
import theme from "./theme";

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
  theme,
});
