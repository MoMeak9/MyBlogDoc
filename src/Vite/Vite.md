Esbuild 作为打包工具也有一些缺点。

-   不支持降级到 `ES5` 的代码。这意味着在低端浏览器代码会跑不起来。
-   不支持 `const enum` 等语法。这意味着单独使用这些语法在 esbuild 中会直接抛错。
-   不提供操作打包产物的接口，像 Rollup 中灵活处理打包产物的能力(如`renderChunk`钩子)在 Esbuild 当中完全没有。
-   不支持自定义 Code Splitting 策略。传统的 Webpack 和 Rollup 都提供了自定义拆包策略的 API，而 Esbuild 并未提供，从而降级了拆包优化的灵活性。
- Esbuild 并没有实现 TS 的类型系统，在编译 `TS`(或者 `TSX`) 文件时仅仅抹掉了类型相关的代码，暂时没有能力实现类型检查。`vite build`之前会先执行`tsc`命令，也就是借助 TS 官方的编译器进行类型检查。
