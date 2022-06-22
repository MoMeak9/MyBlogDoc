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
        text: "校招汇总",
        link: "/campusRec",
    },
    {
        text: "友链",
        children: [
            {
                text: "vuepress-theme-hope",
                link: "https://vuepress-theme-hope.github.io/v2/zh/",
            }
        ]
    }
]);
