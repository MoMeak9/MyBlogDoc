import {sidebar} from "vuepress-theme-hope";
import sidebars from "./sidebars";

export default sidebar({
    ...sidebars,
    "/Network/": [
        {
            text: "HTTP",
            prefix: "HTTP",
            children: [
                "HTTPS",
                "HTTPS",
                "TLS",
            ]
        },
        {
            text: "网络基础笔记",
            children: [
                "CDN",
                "Nginx",
                "HTTPProxy",
                "OpenResty",
                "WAF",
                "WebSocket",
            ]
        },
    ],
    "/浏览器工作原理/": "structure",
    "/leetcode/": "structure",
    "/interview/": "structure",
    "/JavaScript/": [
        {
            text: "JavaScript知识体系",
            prefix: "",
            children: "structure"
        }
    ],
    "/nowcoder/": "structure",
    "/CSS/": [
        {
            text: "CSS面试题",
            prefix: "interview",
            children: "structure"
        },
        {
            text: "CSS知识体系",
            prefix: "",
            children: "structure"
        }
    ],
    "/HTML/": "structure",
    "/TypeScript/": "structure"
});
