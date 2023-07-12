import {sidebar} from "vuepress-theme-hope";
// import sidebars from "./sidebars";

export default sidebar({
    // ...sidebars,
    "/计算机网络/": "structure",
    "/浏览器工作原理/": "structure",
    "/leetcode/": "structure",
    "/面试通用/": "structure",
    "/JavaScript/": [
        {
            text: "JavaScript知识体系",
            prefix: "",
            children: "structure"
        }
    ],
    "/牛客/": "structure",
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
    "/TypeScript/": "structure",
    "/八股文/": "structure"
});
