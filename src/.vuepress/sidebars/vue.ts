import {HopeThemeSidebarArrayConfig} from "vuepress-theme-hope/src/shared/sidebar";

const vueSidebar: HopeThemeSidebarArrayConfig = [
    {
        text: "Vue源码解析",
        prefix: "code",
        children: "structure",
    },
    {
        text: "Vue基础知识体系",
        prefix: "",
        children: "structure",
    }
]

export default vueSidebar;
