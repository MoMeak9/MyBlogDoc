import {hopeTheme} from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
    outlookLocales: undefined,
    hostname: "https://yihuiBlog.top",

    author: {
        name: "Yihui",
        url: "https://yihuiBlog.top",
    },

    headerDepth: 4,

    iconPrefix: "iconfont icon-",

    logo: "https://cdn.yihuiblog.top/images/logo-for-blog.jpg",

    repo: "https://github.com/MoMeak9/MyBlogDoc",

    docsDir: "/src",

    // navbar
    navbar: navbar,

    // sidebar
    sidebar: sidebar,

    footer: "<a href=\"https://beian.miit.gov.cn/\" target='_blank'>闽ICP备19026932号-1</a>",

    copyright: "Licensed under <a href=\"https://creativecommons.org/licenses/by/4.0/\" target='_blank'>CC-BY 4.0</a>",

    displayFooter: true,

    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

    blog: {
        description: "泯泷 - 前端开发爱好者",
        intro: "/intro.html",
        medias: {
            // https://vuepress-theme-hope.github.io/v2/zh/config/theme/feature.html#blog-medias
            Email: "mailto:shi_yihui@qq.com",
            GitHub: "https://github.com/MoMeak9",
            BiliBili: "https://space.bilibili.com/298768693",
        },
    },

    plugins: {
        blog: {

        },

        // 你也可以使用 Waline
        comment: {
            provider: "Giscus",
            repo: "MoMeak9/giscus_discuess",
            repoId: "R_kgDOHAxnrQ",
            category: "General",
            categoryId: "DIC_kwDOHAxnrc4COIL7",
        },

        mdEnhance: {
            presentation: ["highlight", "math", "search", "notes", "zoom"],
        },
        // copyright: {
        //     hostname: "https://yihuiblog.top",
        //     author: 'YihuiBlog',
        //     license: 'CC-BY 4.0',
        //     global: true,
        //     triggerWords: 20,
        // },
        copyCode: {},
    },
    fullscreen: false,
    themeColor: false,
    darkmode: "switch",
    titleIcon: true,
});
