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
                text: "辉光世界",
                link: "https://lwmc.net",
            }
        ]
    }
]);
