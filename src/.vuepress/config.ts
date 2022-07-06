import {defineUserConfig} from "vuepress";
import theme from "./theme";

const {searchPlugin} = require("@vuepress/plugin-search");

export default defineUserConfig({
    base: "/",

    dest: "./dist",

    head: [
        [
            'script', {}, `
            var _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?43cbf856b430fee41af63fc72731d1d6";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
            })();`
        ]
    ],

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
