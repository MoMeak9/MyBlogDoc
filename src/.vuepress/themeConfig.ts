import {defineThemeConfig} from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineThemeConfig({
    hostname: "https://yihuiBlog.top",

    author: {
        name: "Yihui",
        url: "https://yihuiBlog.top",
    },

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
        description: "前端技术热爱者",
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
            enableAll: true,
            presentation: {
                plugins: ["highlight", "math", "search", "notes", "zoom"],
            },
        },

        // search: {
        //     locales: {
        //         '/': {
        //             placeholder: 'Search',
        //         },
        //         '/zh/': {
        //             placeholder: '搜索',
        //         },
        //     }
        // },

        docsearch: {
            appId: "S2002RFJTX",
            apiKey: "c6ec3a26c6e35a847b961332ed6f07f3",
            indexName: "yihui",
            locales: {
                "/": {
                    placeholder: "搜索",
                    translations: {
                        button: {
                            buttonText: "搜索",
                            buttonAriaLabel: "搜索",
                        },
                        modal: {
                            searchBox: {
                                resetButtonTitle: "清除查询条件",
                                resetButtonAriaLabel: "清除查询条件",
                                cancelButtonText: "取消",
                                cancelButtonAriaLabel: "取消",
                            },
                            startScreen: {
                                recentSearchesTitle: "搜索历史",
                                noRecentSearchesText: "没有搜索历史",
                                saveRecentSearchButtonTitle: "保存至搜索历史",
                                removeRecentSearchButtonTitle: "从搜索历史中移除",
                                favoriteSearchesTitle: "收藏",
                                removeFavoriteSearchButtonTitle: "从收藏中移除",
                            },
                            errorScreen: {
                                titleText: "无法获取结果",
                                helpText: "你可能需要检查你的网络连接",
                            },
                            footer: {
                                selectText: "选择",
                                navigateText: "切换",
                                closeText: "关闭",
                                searchByText: "搜索提供者",
                            },
                            noResultsScreen: {
                                noResultsText: "无法找到相关结果",
                                suggestedQueryText: "你可以尝试查询",
                                openIssueText: "你认为该查询应该有结果？",
                                openIssueLinkText: "点击反馈",
                            },
                        },
                    },
                },
            },
        },
    },
});
