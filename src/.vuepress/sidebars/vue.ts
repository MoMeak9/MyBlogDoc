import {HopeThemeSidebarArrayConfig} from "vuepress-theme-hope/src/shared/sidebar";

const vueSidebar: HopeThemeSidebarArrayConfig = [
    {
        text: "Vue源码解析",
        prefix: "code",
        children: [
            "Compiler",
            "reactive",
            "Vite",
            "VDom",
        ]
    },
    "structure",
]

export default vueSidebar;
