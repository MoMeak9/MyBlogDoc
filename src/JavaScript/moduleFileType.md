# 前端模块：CJS, AMD, UMD, ESM, System 和 IIFE 

现代 Javascript 项目需要用打包工具来将小段代码编译成库或者应用程序那种更大更复杂的东西。流行的打包器有webpack、Rollup、Parcel、RequireJS 和 Browserify。它们将 JavaScript 代码转换为可以作为一个 bundle 加载的模块。

**一般来说，常见的模块类型有：**

- CJS(CommonJS) — 适用于 Node 和其他打包工具
- AMD(Asynchronous Module Definition，异步模块化定义) — 与 RequireJS 等模块加载工具一起使用。
- UMD(Universal Module Definition，通用模块化定义) — amd，cjs 和 iife 包含在一个文件中。
- ES— 将 bundle 保存为 ES 模块文件。适用于其他打包工具，在现代浏览器中用\<script type=module> 标签引入（别名：ems, module）。
  system — SystemJS 加载器的原生格式 （别名：systemjs）。
- IIFF— \<script> 标签引入的自执行函数。如果你想为你的应用创建一个包，你需要用到的可能就是这种。

## CommonJS[（CJS）](https://en.wikipedia.org/wiki/CommonJS)

CJS 适用于浏览器之外的 Node 和其他生态系统。它在服务端被广泛使用。CJS 可以通过使用 `require()` 函数和 `module.exports` 来识别。`require()` 是一个可用于从另一个模块导入 symbols 到当前作用域的函数。 `module.exports` 是当前模块在另一个模块中引入时返回的对象。

CJS 模块的设计考虑到了服务器开发。这个 API 天生是同步的。换言之，在源文件中按 require 的顺序瞬时加载模块。
由于 CJS 是同步的且不能被浏览器识别，CJS 模块不能在浏览器端使用，除非它被转译器打包。

## 异步模块定义[（AMD）](https://en.wikipedia.org/wiki/Asynchronous_module_definition)

AMD脱胎于 CJS，支持异步模块加载。AMD 和 CJS 的主要区别在于它是否支持异步模块加载。RequireJS 使用 AMD 在浏览器端工作。

> AMD 提供了一些 CJS 相似的特性。它允许在代码中使用类似的 `exports` 和 `require()` 接口，尽管它自己的 `define()` 接口更基础更受欢迎。

## 通用模块定义[（UMD）](https://github.com/umdjs/umd)

UMD 被设计用于任何地方 — 包括服务端和浏览器端。它试图兼容目前最流行的 script 加载器（如 RequireJS）。在许多情况下，它使用 AMD 作为基础，且兼容 CJS。然而兼容增加了一些复杂度，使得读写变得更加困难。

## ECMAScript modules[（ESM）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)

静态 `import` 指令可用于将模块引入当前作用域。与 `require` 和 `define` 不同，这个指令只能放在文件的顶部。动态 `import()` 目前处于 TC39 流程的第4阶段（项目中所见的由打包工具支持，如Webpack的同态module，但存在额外消耗）。

通常的 ESM 格式的文件无法直接在浏览器上通过默认脚本标签运行，报错：

`Uncaught SyntaxError: Unexpected token 'export'`

可以通过设置 `script` 标签的 `type` 为 `module` 来修复：

```jsx
<script type=”module” src=”dist/bundle.js”></script>
```

此外，关于`.mjs`扩展名，[V8 推荐了这样的做法](https://v8.dev/features/modules#mjs)，但是官方持以推荐继续使用`.js` 扩展名的态度。其中一些工具不支持 `.mjs`，比如 [TypeScript](https://www.typescriptlang.org/)。

## 系统模块 [SystemJS](https://github.com/systemjs/systemjs)

SystemJs 是一个通用的模块**加载器**，支持 CJS，AMD 和 ESM 模块。Rollup 可以将代码打包成 SystemJS 的原生格式。

在使用时需要在 `index.html` 中引入 `system.js`

## 立即执行的函数表达式（IIFE）模块

正如模块名所示，IIFE 是一个适合用 `<script>` 标签引入的自执行函数。我们可以用这种格式为应用创建一个包。它帮助我们将内容放到命名空间中，避免变量冲突并使代码私有。

```js
(function foo(){
  console.log('我是第二个立即执行函数')
}())
```

此代码可以在浏览器中运行，也是较为常见的Javascript SDK 引入方式

> **参照转译：**
>
> [What Are CJS, AMD, UMD, ESM, System, and IIFE?](https://betterprogramming.pub/what-are-cjs-amd-umd-esm-system-and-iife-3633a112db62)
