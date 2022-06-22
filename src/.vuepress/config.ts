import {defineUserConfig} from "vuepress";
import theme from "./theme";
const { searchPlugin } = require("@vuepress/plugin-search");

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
        searchPlugin({
            // 你的选项
        }),
    ],
    theme,
});
