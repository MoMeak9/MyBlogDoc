import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/Webpack/": [
        {
            text: 'Webpack基础',
            prefix: '',
            children: "structure",
        },
        {
            text: 'Webpack面试',
            prefix: 'interview',
            children: 'structure',
        }
    ],
});
