import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    '/Vue/': [
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
    ],
});
