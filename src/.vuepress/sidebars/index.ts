import nodeSidebar from "./node";
import vueSidebar from "./vue";
import reactSidebar from "./react";
import webpackSidebar from "./webpack";

export default {
    ...nodeSidebar as Object,
    ...vueSidebar as Object,
    ...reactSidebar as Object,
    ...webpackSidebar as Object,
};

