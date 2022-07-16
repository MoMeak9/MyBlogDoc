import {navbar} from "vuepress-theme-hope";

export default navbar([
    {
        text: "首页",
        link: "/",
    },
    {
        text: "关于",
        link: "/intro",
    },
    {
        text: "收藏",
        link: "/star",
    },
    {
        text: "知识大纲",
        link: "/campusRec",
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
