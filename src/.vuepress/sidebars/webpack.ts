import {HopeThemeSidebarArrayConfig} from "vuepress-theme-hope/src/shared/sidebar";

const webpackSidebar: HopeThemeSidebarArrayConfig = [
    {
        text: 'Webpack基础',
        children: [
            "better",
            "config",
            "plugin",
            "loader",
            "work",
        ],
    },
    {
        text: 'Webpack面试',
        prefix: 'interview',
        children: 'structure',
    }
]

export default webpackSidebar;
