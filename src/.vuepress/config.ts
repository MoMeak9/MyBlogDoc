import {defineUserConfig} from "vuepress";
import {searchProPlugin} from "vuepress-plugin-search-pro";
import theme from "./theme";

export default defineUserConfig({
    theme: theme,
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
        ],
        [
            'meta', {name: 'google-site-verification', content: '9vkxYqOlDYYQz21WsvuXk9ztRIK5L0_MuzL1WvFmBuY'}
        ],
    ],

    locales: {
        "/": {
            lang: "zh-CN",
            title: "Yihui's Blog",
            description: "前端小白的技术博客",
        },
    },
    plugins: [
        searchProPlugin({
            // 索引全部内容
            indexContent: true,
        })
    ],
});
