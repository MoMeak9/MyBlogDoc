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

    sidebarDepth: 4,

    displayAllHeaders: true,

    iconPrefix: "iconfont icon-",

    logo: "https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/ココアシガレット_91951407.png.png",

    repo: "https://github.com/MoMeak9/MyBlogDoc",

    docsDir: "/src",

    // navbar
    navbar: navbar,

    // sidebar
    sidebar: sidebar,

    footer: " ",

    displayFooter: true,

    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

    blog: {
        description: "前端技术狂热者",
        intro: "/intro.html",
        medias: {
            // Baidu: "https://example.com",
            // Bitbucket: "https://example.com",
            // Dingding: "https://example.com",
            // Discord: "https://example.com",
            // Dribbble: "https://example.com",
            Email: "mailto:shi_yihui@qq.com",
            // Evernote: "https://example.com",
            // Facebook: "https://example.com",
            // Flipboard: "https://example.com",
            Gitee: "https://gitee.com/shiyifei332",
            GitHub: "https://github.com/MoMeak9",
            // Gitlab: "https://example.com",
            // Gmail: "https://example.com",
            // Instagram: "https://example.com",
            // Lines: "https://example.com",
            // Linkedin: "https://example.com",
            // Pinterest: "https://example.com",
            // Pocket: "https://example.com",
            // QQ: "https://example.com",
            // Qzone: "https://example.com",
            // Reddit: "https://example.com",
            // Rss: "https://example.com",
            // Steam: "https://example.com",
            // Twitter: "https://example.com",
            // Wechat: "https://example.com",
            // Weibo: "https://example.com",
            // Whatsapp: "https://example.com",
            // Youtube: "https://example.com",
            // Zhihu: "https://example.com",
        },
    },

    encrypt: {
        config: {
            "/guide/encrypt.html": ["1234"],
        },
    },

    plugins: {
        blog: {
            autoExcerpt: true,
        },

        // 你也可以使用 Waline
        comment: {
            type: "giscus",
            repo: "MoMeak9/giscus_discuess",
            repoId: "R_kgDOHAxnrQ",
            category: "General",
            categoryId: "DIC_kwDOHAxnrc4COIL7",
        },

        mdEnhance: {
            presentation: {
                plugins: ["highlight", "math", "search", "notes", "zoom"],
            },
        },
        copyright: {
            hostname: "https://yihuiBlog.top",
            author: 'YihuiBlog',
            license: 'MIT',
            global: true,
            triggerWords: 20,
            disableCopy: true,
            disableSelection: true,
        },
        copyCode: {},
    },
    fullscreen: false,
    themeColor: false,
    darkmode: "switch",
    titleIcon: true,
});
