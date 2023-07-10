import {defineUserConfig} from "vuepress";
import {searchProPlugin} from "vuepress-plugin-search-pro";
import {cut} from "nodejs-jieba";
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
        ['meta', {name: 'google-site-verification', content: '9vkxYqOlDYYQz21WsvuXk9ztRIK5L0_MuzL1WvFmBuY'}],
        // 关键词
        ['meta', {name: 'keywords', content: '前端博客, vuepress, Vue, React, JavaScript'}],
        ['meta', {charset: 'utf-8'}],
        ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1.0'}],
        ['meta', {name: 'author', content: '泯泷 Yihui'}],
        // 网站图标
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        // Open Graph (OG) 标签
        ['meta', {property: 'og:type', content: 'website'}],
        ['meta', {property: 'og:url', content: 'https://yihuiblog.top/'}],
        ['meta', {property: 'og:title', content: 'Yihui\'s Blog'}],
        ['meta', {property: 'og:description', content: '前端小白的技术博客'}],
        ['meta', {property: 'og:image', content: 'https://cdn.yihuiblog.top/images/logo-for-blog.jpg'}],
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
            indexOptions: {
                // 使用 nodejs-jieba 进行分词
                tokenize: (text, fieldName) =>
                    fieldName === "id" ? [text] : cut(text, true),
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
