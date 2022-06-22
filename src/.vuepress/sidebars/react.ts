import {HopeThemeSidebarArrayConfig} from "vuepress-theme-hope/src/shared/sidebar";

const reactSidebar: HopeThemeSidebarArrayConfig = [
    {
        text: 'React基础',
        children: [
            "basic",
            "reactRouterV6",
            "project",
            "Hooks",
            "Mobx",
        ]
    },
    {
        text: 'React Hooks',
        prefix: 'Hooks',
        children: [
            "basic",
            "basic-1",
            "basic-2",
            "basic-3",
            "basic-4",
            "basic-5",
            "basic-6",
            "basic-7",
        ]
    },
    {
        text: 'React面试题',
        prefix: 'interview',
        children: 'structure',
    },
    {
        text: 'React Native',
        children: []
    }
]

export default reactSidebar;
