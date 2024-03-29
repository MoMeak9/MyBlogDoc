import {defineUserConfig} from "vuepress";
import {searchProPlugin} from "vuepress-plugin-search-pro";
import theme from "./theme";

export default defineUserConfig({
    theme: theme,
    base: "/",
    dest: "./dist",
    title: "Yihui's Blog",
    description: "前端小白的技术博客",
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
        [
            'meta', {name: 'keywords', content: '前端博客 vuepress Vue React JavaScript'}
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
        searchProPlugin({
            // 索引全部内容
            indexContent: true,
            locales: {
                "/": {
                    placeholder: "搜索",
                }
            },
            // 自定义搜索项目 https://vuepress-theme-hope.github.io/v2/search-pro/zh/config.html#customfields
            customFields: [
                {
                    name: "category",
                    // @ts-ignore
                    getter: (page) => page.frontmatter.category,
                    formatter: {
                        "/": "分类: $content",
                    },
                },
                {
                    name: "tag",
                    // @ts-ignore
                    getter: (page) => page.frontmatter.tag,
                    formatter: {
                        "/": "标签: $content",
                    },
                },
            ],
            hotKeys: [{
                key: "h",
                ctrl: true,
            }],
        })
    ],
});
