import {sidebar} from "vuepress-theme-hope";
import nodeSidebar from "./sidebars/node";
import vueSidebar from "./sidebars/vue";
export default sidebar({
    "/codeTop/": [],
    "/Node/": nodeSidebar,
    "/Vue/": vueSidebar,
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
    ]
});
