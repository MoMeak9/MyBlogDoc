import {navbar} from "vuepress-theme-hope";

export default navbar([
    {
        text: "首页",
        link: "/",
    },
    {
        text: "关于",
        link: "/个人简介",
    },
    {
        text: "收藏",
        link: "/star",
    },
    {
        text: "知识大纲",
        link: "/校招/知识大纲",
    },
    {
        text: "必读文章",
        link: "/软技能/精选文章列表",
    },
    {
        text: "友链",
        children: [
            {
                text: "辉光世界官网",
                link: "https://lwmc.net",
            },
            {
                text: "DiF1202 博客",
                link: "http://182.61.38.183:3000/home"
            }
        ]
    }
]);
