import {sidebar} from "vuepress-theme-hope";
import sidebars from "./sidebars";

export default sidebar({
    ...sidebars,
    "/codeTop/": [],
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
});
