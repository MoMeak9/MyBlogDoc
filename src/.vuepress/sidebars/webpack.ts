import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/Webpack/": [
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
    ],
});
