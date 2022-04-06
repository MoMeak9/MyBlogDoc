import type {HopeThemeSidebarArrayConfig} from "vuepress-theme-hope";

export const code: HopeThemeSidebarArrayConfig = [
    "",
    {
        text: "基础介绍",
        icon: "module",
        children: ["basic/", "windows/", "github/"],
    },
    {
        text: "前端开发",
        icon: "code",
        children: [
            "website/",
            "node-js/",
            "vue/",
            "Angular/",
            "react/",
            "mini-app/",
        ],
    },
    {
        text: "语言",
        icon: "language",
        prefix: "language/",
        link: "language/",
        children: [
            "learning",
            "js/",
            "typescript/",
            "python/",
            "json/",
            "yaml/",
            "linter/",
        ],
    },
    "Android/",
    "backEnd/",
];
