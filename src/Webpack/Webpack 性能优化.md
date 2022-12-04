---
date: 2022-08-23
category:
- Webpack
---


# Webpack 性能优化

- 使用动态加载，减少首屏资源加载量；
- 使用 externals 外置依赖、Tree-Shaking、Scope Hoisting 特性，减少应用体积；
- 正确使用 `[hash]` 占位符，优化 HTTP 资源缓存效率；

## 动态加载

Webpack 默认会将同一个 Entry 下的所有模块全部打包成一个产物文件 —— 包括那些与页面 [关键渲染路径](https://web.dev/critical-rendering-path/) 无关的代码，这会导致页面初始化时需要花费多余时间去下载这部分暂时用不上的代码，影响首屏渲染性能，例如：

```js
import someBigMethod from "./someBigMethod";

document.getElementById("someButton").addEventListener("click", () => {
  someBigMethod();
});
```

> <img src="https://cdn.yihuiblog.top/images/202208230937460.png" alt="渐进式页面渲染" style="zoom: 80%;" />
>
> 性能优化就是要了解在接收 HTML、CSS 和 JavaScript 字节以及将它们转换为渲染像素所需的处理之间的这些中间步骤中发生了什么——这是**关键的渲染路径**。

逻辑上，直到点击页面的 `someButton` 按钮时才会调用 `someBigMethod` 方法，因此这部分代码没必要出现在首屏资源列表中，此时我们可以使用 Webpack 的动态加载功能将该模块更改为异步导入，修改上述代码：

```js
document.getElementById("someButton").addEventListener("click", async () => {
  // 使用 `import("module")` 动态加载模块
  const someBigMethod = await import("./someBigMethod");
  someBigMethod();
});
```

此时，重新构建将产生额外的产物文件 `src_someBigMethod_js.js`，这个文件直到执行 `import` 语句时 —— 也就是上例 `someButton` 被点击时才被加载到浏览器，也就不会影响到关键渲染路径了。

**<u>动态加载是 Webpack 内置能力</u>**之一，我们不需要做任何额外配置就可以通过动态导入语句(`import`、`require.ensure`)轻易实现。但请 注意，这一特性有时候反而会带来一些新的性能问题：

**一是过度使用会使产物变得过度细碎，产物文件过多，运行时 HTTP 通讯次数也会变多**，在 HTTP 1.x 环境下这可能反而会降低网络性能，得不偿失；

**二是使用时 Webpack 需要在客户端注入一大段用于支持动态加载特性的 Runtime（2.5KB）**

![image-20220823092900750](https://cdn.yihuiblog.top/images/202208230929920.png)

多数情况下我们没必要为小模块使用动态加载能力。**目前社区比较常见的用法是配合 SPA 的前端路由能力实现页面级别的动态加载**，例如在 Vue 中：

```js
import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import("./Home.vue");
const Foo = () => import(/* webpackChunkName: "sub-pages" */ "./Foo.vue");
const Bar = () => import(/* webpackChunkName: "sub-pages" */ "./Bar.vue");

// 基础页面
const routes = [
  { path: "/bar", name: "Bar", component: Bar },
  { path: "/foo", name: "Foo", component: Foo },
  { path: "/", name: "Home", component: Home },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
```

示例中，`Home/Foo/Bar` 三个组件均通过 `import()` 语句动态导入，这使得仅当页面切换到相应路由时才会加载对应组件代码。

```js
import(/* webpackChunkName: "sub-pages" */ "./Bar.vue");
```

`webpackChunkName` 用于指定该异步模块的 Chunk 名称，相同 Chunk 名称的模块最终会打包在一起。

## HTTP 缓存优化

我们可以调整产物文件的名称(通过 Hash)与内容(通过代码拆分 Code Splitting)，使其更适配 HTTP 持久化缓存策略。

> 提示：Hash 是一种将任意长度的消息压缩到某一固定长度的消息**摘要**的函数，不同明文计算出的摘要值不同，所以常常被用作**内容唯一标识**。

Webpack 提供了一种模板字符串([Template String](https://webpack.js.org/configuration/output/#template-strings))能力，用于根据构建情况动态拼接产物文件名称([output.filename](https://webpack.js.org/configuration/output/#outputfilename))，从性能角度看，比较值得关注的是其中的几个 Hash 占位符：

- `[fullhash]`：整个项目的内容 Hash 值，项目中任意模块变化都会产生新的 `fullhash`；
- `[chunkhash]`：产物对应 Chunk 的 Hash，Chunk 中任意模块变化都会产生新的 `chunkhash`；
- `[contenthash]`：**产物内容 Hash 值，仅当产物内容发生变化时才会产生新的 `contenthash`，因此实用性较高**。

用法很简单，只需要在 `output.filename` 值中插入相应占位符即可，如 `"[name]-[contenthash].js"`。

```js
module.exports = {
  // ...
  entry: { index: "./src/index.js", foo: "./src/foo.js" },
  output: {
    filename: "[name]-[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new MiniCssExtractPlugin({ filename: "[name]-[contenthash].css" })],
};
```

![image-20220823094247913](https://cdn.yihuiblog.top/images/202208230942045.png)

> 提示：也可以通过占位符传入 Hash 位数，如 [contenthash:7] ，即可限定生成的 Hash 长度。

可以看到每个产物文件名都会带上一段由产物内容计算出的唯一 Hash 值，文件内容不变，Hash 也不会变化，这就很适合用作 HTTP 持久缓存 资源

此时，产物文件不会被重复下载，一直到文件内容发生变化，引起 Hash 变化生成不同 URL 路径之后，才需要请求新的资源文件，能有效提升网络性能，因此，生产环境下应尽量使用 `[contenthash]` 生成有版本意义的文件名。

## 使用外置依赖

`externals` 的主要作用是将部分模块排除在 Webpack 打包系统之外，例如：

```js
module.exports = {
  // ...
  externals: {
    lodash: "_",
  },
};
```

使用上述配置后，Webpack 会 **预设** 运行环境中已经内置 Lodash 库 —— 无论是通过 CDN 还是其它方式注入，所以不需要再将这些模块打包到产物中

> 提示：`externals` 不仅适用于优化产物性能，在特定环境下还能用于跳过若干运行时模块，例如 Node 中的 `fs/net` 等，避免将这部分源码错误打包进 Bundle。

使用 `externals` 时必须确保这些外置依赖代码已经被正确注入到上下文环境中，这在 Web 应用中通常可以通过 CDN 方式实现

```html
<script defer crossorigin src="//unpkg.com/react@18/umd/react.development.js"></script>
<script defer crossorigin src="//unpkg.com/lodash@4.17.21/lodash.min.js"></script>
```

## 使用 Tree-Shaking （树摇）删除多余模块导出

Webpack 自 2.0 版本开始接入，是一种基于 ES Module 规范的 Dead Code Elimination 技术，它会在运行过程中静态分析模块之间的导入导出，判断哪些模块导出值没有被其它模块使用 —— 相当于模块层面的 Dead Code，并将其删除。

在 Webpack 中，启动 Tree Shaking 功能必须同时满足两个条件：

- 配置 `optimization.usedExports` 为 `true`，标记模块导入导出列表；
- 启动代码优化功能，可以通过如下方式实现：
  - 配置 `mode = production`
  - 配置 `optimization.minimize = true`
  - 提供 `optimization.minimizer` 数组

## 使用 Scope Hoisting （作用域提升）合并模块

默认情况下 Webpack 会将模块打包成一个个单独的函数，例如：

```js
// common.js
export default "common";

// index.js
import common from './common';
console.log(common);
```

经过 Webpack 打包后会生成：

```js
"./src/common.js":
  ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
     const __WEBPACK_DEFAULT_EXPORT__ = ("common");
     __webpack_require__.d(__webpack_exports__, {
      /* harmony export */
      "default": () => (__WEBPACK_DEFAULT_EXPORT__)
      /* harmony export */
    });
  }),
"./src/index.js":
  ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./common */ "./src/common.js");
      console.log(_common__WEBPACK_IMPORTED_MODULE_0__)
  })
```

Webpack 提供了 Scope Hoisting 功能，用于 **将符合条件的多个模块合并到同一个函数空间**(提升到同一个函数空间)：

```js
((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    ;// CONCATENATED MODULE: ./src/common.js
    /* harmony default export */ const common = ("common");
    
    ;// CONCATENATED MODULE: ./src/index.js
    console.log(common);
})
```

Webpack 提供了三种开启 Scope Hoisting 的方法：

- 使用 `mode = 'production'` 开启生产模式；
- 使用 `optimization.concatenateModules` 配置项；
- 直接使用 `ModuleConcatenationPlugin` 插件。

```js
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {
    // 方法1： 将 `mode` 设置为 production，即可开启
    mode: "production",
    // 方法2： 将 `optimization.concatenateModules` 设置为 true
    optimization: {
        concatenateModules: true,
        usedExports: true,
        providedExports: true,
    },
    // 方法3： 直接使用 `ModuleConcatenationPlugin` 插件
    plugins: [new ModuleConcatenationPlugin()]
};
```

与 Tree-Shaking 类似，Scope Hoisting 底层基于 ES Module 方案的 静态特性，推断模块之间的依赖关系，并进一步判断模块与模块能否合并，因此在以下场景下会失效：

- 非 ESM 模块
- 模块被多个 Chunk 引用

## 监控产物体积

Webpack 专门为此提供了一套 性能监控方案，当构建生成的产物体积超过阈值时抛出异常警告，以此帮助我们时刻关注资源体积，避免因项目迭代增长带来过大的网络传输
```js
module.exports = {
  // ...
  performance: {    
    // 设置所有产物体积阈值
    maxAssetSize: 172 * 1024,
    // 设置 entry 产物体积阈值
    maxEntrypointSize: 244 * 1024,
    // 报错方式，支持 `error` | `warning` | false
    hints: "error",
    // 过滤需要监控的文件类型
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js");
    },
  },
};
```

一个比较好的 经验法则 是确保 关键路径 资源体积始终小于 170KB，超过这个体积就应该使用上面介绍的若干方法做好裁剪优化。
