---
category:
  - Vite
  - 前端
---

Esbuild 作为打包工具也有一些缺点。

-   不支持降级到 `ES5` 的代码。这意味着在低端浏览器代码会跑不起来。
-   不支持 `const enum` 等语法。这意味着单独使用这些语法在 esbuild 中会直接抛错。
-   不提供操作打包产物的接口，像 Rollup 中灵活处理打包产物的能力(如`renderChunk`钩子)在 Esbuild 当中完全没有。
-   不支持自定义 Code Splitting 策略。传统的 Webpack 和 Rollup 都提供了自定义拆包策略的 API，而 Esbuild 并未提供，从而降级了拆包优化的灵活性。
- Esbuild 并没有实现 TS 的类型系统，在编译 `TS`(或者 `TSX`) 文件时仅仅抹掉了类型相关的代码，暂时没有能力实现类型检查。`vite build`之前会先执行`tsc`命令，也就是借助 TS 官方的编译器进行类型检查。


![vite插件开发钩子函数 (1).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a951108fd62d44f88b1489d7906c9482~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)


### 独有 Hook

1. 给配置再加点料: config
2. 记录最终配置: configResolved
3. 获取 Dev Server 实例: configureServer
4. 转换 HTML 内容: transformIndexHtml
5. 热更新处理: handleHotUpdate



[Vite 小册笔记](/posts/Vite/Vite%20%E5%B0%8F%E5%86%8C%E7%AC%94%E8%AE%B0/)
[Rollup 基本概念、使用和插件机制](/posts/Vite/Rollup%20%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5%E3%80%81%E4%BD%BF%E7%94%A8%E5%92%8C%E6%8F%92%E4%BB%B6%E6%9C%BA%E5%88%B6/)
[项目 Lint 管理](/posts/Vite/%E9%A1%B9%E7%9B%AE%20Lint%20%E7%AE%A1%E7%90%86/)
[构建Vite知识体系-项目性能优化](/posts/Vite/%E6%9E%84%E5%BB%BAVite%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB-%E9%A1%B9%E7%9B%AE%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/)