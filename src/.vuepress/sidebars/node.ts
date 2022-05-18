import {HopeThemeSidebarArrayConfig} from "vuepress-theme-hope/src/shared/sidebar";

const nodeSidebar: HopeThemeSidebarArrayConfig = [
    {
        text: "Node基础笔记",
        children: [
            "01",
            "02-03",
            "04",
            "05",
            "06",
            "Stream",
            "07",
            "09",
            "10",
        ]
    },
    {
        text: "Node 进阶",
        children: [
            "npmPatch",
        ],
    },
];

export default nodeSidebar;
