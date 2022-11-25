---
icon: edit
date: 2022-08-17
category:
- Webpack
---

# Webpack 配置及规则

> 参考来源：
>
> [Webpack5 核心原理与应用实践](https://juejin.cn/book/7115598540721618944)

## 配置方法

### 对象配置

在前面章节中，我们已经编写了许多 Webpack 配置示例，其大多数都以单文件导出单个配置对象方式实现，类似：

```js
module.exports = {
  entry: './src/index.js',
  // 其它配置...
};
```

比较常用的一种方式，逻辑简单，适合大多数业务项目；

### 使用配置数组

> 同一份代码打包出多种产物”场景

导出数组的方式很简单，如：

```js
// webpack.config.js
module.exports = [{
  entry: './src/index.js',
  // 其它配置...
}, {
  entry: './src/index.js',
  // 其它配置...
}];
```



使用数组方式时，Webpack 会在启动后创建多个 `Compilation` 实例，并行执行构建工作，但需要注意，`Compilation` 实例间基本上不作通讯，这意味着这种并行构建对运行性能并没有任何正向收益，<u>例如某个 Module 在 `Compilation` 实例 A 中完成解析、构建后，在其它 `Compilation` 中依然需要完整经历构建流程，无法直接复用结果。</u>

数组方式主要用于应对“同一份代码打包出多种产物”的场景，例如在构建 Library 时，我们通常需要同时构建出 ESM/CMD/UMD 等模块方案的产物，如：

```js
// webpack.config.js
module.exports = [
  {
    output: {
      filename: './dist-amd.js',
      libraryTarget: 'amd',
    },
    name: 'amd',
    entry: './app.js',
    mode: 'production',
  },
  {
    output: {
      filename: './dist-commonjs.js',
      libraryTarget: 'commonjs',
    },
    name: 'commonjs',
    entry: './app.js',
    mode: 'production',
  },
];
```

>提示：
>
>使用配置数组时，还可以通过 `--config-name` 参数指定需要构建的配置对象，例如上例配置中若执行 `npx webpack --config-name='amd'`，则仅使用数组中 `name='amd'` 的项做构建。

此时适合使用配置数组方式解决；若是“多份代码打包多份产物”的场景，则建议使用 `entry` 配置多个应用入口。

使用数组方式时，我们还可以借助 [webpack-merge](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-merge) 工具简化配置逻辑，如：

```js
const { merge } = require("webpack-merge");

const baseConfig = {
  output: {
    path: "./dist"
  },
  name: "amd",
  entry: "./app.js",
  mode: "production",
};

module.exports = [
  merge(baseConfig, {
    output: {
      filename: "[name]-amd.js",
      libraryTarget: "amd",
    },
  }),
  merge(baseConfig, {
    output: {
      filename: "./[name]-commonjs.js",
      libraryTarget: "commonjs",
    },
  }),
];
```

> 提示：`webpack-merge` 是 Webpack 生态内专门用于合并配置对象的工具

示例中将公共配置抽取为 `baseConfig` 对象，之后配合 `webpack-merge` 创建不同目标数组项，这种方式可有效减少重复的配置代码，非常推荐使用。

### 使用配置函数

配置函数方式要求在配置文件中导出一个函数，并在函数中返回 Webpack 配置对象，或配置数组，或 `Promise` 对象，如：

```js
module.exports = function(env, argv) {
  // ...
  return {
    entry: './src/index.js',
    // 其它配置...
  }
}
```

运行时，Webpack 会传入两个环境参数对象：

- `env`：通过 `--env` 传递的命令行参数，适用于自定义参数，例如：

| 命令：                                                       | `env` 参数值：                               |
| ------------------------------------------------------------ | -------------------------------------------- |
| npx webpack --env prod                                       | { prod: true }                               |
| npx webpack --env prod --env min                             | { prod: true, min: true }                    |
| npx webpack --env platform=app --env production              | { platform: "app", production: true }        |
| npx webpack --env foo=bar=app                                | { foo: "bar=app"}                            |
| npx webpack --env app.platform="staging" --env app.name="test" | { app: { platform: "staging", name: "test" } |

- `argv`：命令行 [Flags](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fapi%2Fcli%2F%23flags) 参数，支持 `entry`/`output-path`/`mode`/`merge` 等。

<u>“**配置函数**”这种方式的意义在于，允许用户根据命令行参数动态创建配置对象，可用于实现简单的多环境治理策略</u>

```js
// npx webpack --env app.type=miniapp --mode=production
module.exports = function (env, argv) {
  return {
    mode: argv.mode ? "production" : "development",
    devtool: argv.mode ? "source-map" : "eval",
    output: {
      path: path.join(__dirname, `./dist/${env.app.type}`,
      filename: '[name].js'
    },
    plugins: [
      new TerserPlugin({
        terserOptions: {
          compress: argv.mode === "production", 
        },
      }),
    ],
  };
};
```

> 不过这种方式并不常用，
>
> 一是因为需要在配置函数内做许多逻辑判断，复杂场景下可能可读性会很低，维护成本高；
>
> 二是强依赖于命令行参数，可能最终需要写出一串很长的运行命令，应用体验较差。目前社区比较流行通过不同配置文件区分不同环境的运行配置，配合 `--config` 参数实现环境治理。

## 环境治理策略 :star:

在现代前端工程化实践中，通常需要将同一个应用项目部署在不同环境(如生产环境、开发环境、测试环境)中，以满足项目参与各方的不同需求。这就要求我们能根据部署环境需求，对同一份代码执行各有侧重的打包策略，例如：

- **开发环境需要使用 `webpack-dev-server` 实现 Hot Module Replacement；**
- **测试环境需要带上完整的 Soucemap 内容，以帮助更好地定位问题；**
- **生产环境需要尽可能打包出更快、更小、更好的应用代码，确保用户体验。**

Webpack 中有许多实现环境治理的方案，比如上面介绍过的，使用“配置函数”配合命令行参数动态计算配置对象。除此之外，**业界比较流行将不同环境配置分别维护在单独的配置文件中，如：**

之后配合 `--config` 选项指定配置目标，如：

```arduino
npx webpack --config webpack.development.js
```

这种模式下通常会将部分通用配置放在基础文件中，如上例的 `webpack.common.js`，之后在其它文件中引入该模块并使用 [webpack-merge](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.org%2Fpackage%2Fwebpack-merge) 合并配置对象。

`webpack-merge` 是一个专为 Webpack 设计的数据合并(`merge`)的工具，功能逻辑与 Lodash 的 [merge](https://link.juejin.cn/?target=https%3A%2F%2Fdevdocs.io%2Flodash~4%2Findex%23merge) 函数、 [Object.assign](https://link.juejin.cn/?target=https%3A%2F%2Fdevdocs.io%2Fjavascript%2Fglobal_objects%2Fobject%2Fassign) 等相似，但支持更多特性，如：

- 支持数组属性合并，例如：

```js
merge({ arr: [1] }, { arr: [2] }) === { arr: [1, 2] }
```

- 支持函数属性合并，例如：

```js
const res = merge(
  { func: () => console.log(1) },
  { func: () => console.log(2) }
);
res.func();
// => 1,2 
```

- 支持设定对象合并策略，支持 `match/append/prepend/replace/merge` 规则；
- 支持传入自定义对象合并函数；

[**参考仓库地址**]()



## 核心配置项汇总



![image.png](https://cdn.yihuiblog.top/images/202208171121387.webp)

较常用，需要着重学习的配置有：

- `entry`：声明项目入口文件，Webpack 会从这个文件开始递归找出所有文件依赖；
- `output`：声明构建结果的存放位置；
- `target`：用于配置编译产物的目标运行环境，支持 `web`、`node`、`electron` 等值，不同值最终产物会有所差异；
- `mode`：编译模式短语，支持 `development`、`production` 等值，Webpack 会根据该属性推断默认配置；
- `optimization`：用于控制如何优化产物包体积，内置 Dead Code Elimination、Scope Hoisting、代码混淆、代码压缩等功能；
- `module`：用于声明模块加载规则，例如针对什么类型的资源需要使用哪些 Loader 进行处理；
- `plugin`：Webpack 插件列表。

其中，`optimization/module/plugin` 属性将在后续章节做专门介绍，此处先不展开。接下来我们将集中讲解 `entry/output/target/mode` 属性，帮你更全面、立体、透彻地理解 Webpack 配置项逻辑。

### entry 配置详解

Webpack 的基本运行逻辑是从 **「入口文件」** 开始，递归加载、构建所有项目资源，所以几乎所有项目都必须使用 [entry](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fentry-context%2F) 配置项明确声明项目入口。`entry` 配置规则比较复杂，支持如下形态：

- 字符串：指定入口文件路径；
- 对象：对象形态功能比较完备，除了可以指定入口文件列表外，还可以指定入口依赖、Runtime 打包方式等；
- 函数：动态生成 Entry 配置信息，函数中可返回字符串、对象或数组；
- 数组：指明多个入口文件，数组项可以为上述介绍的文件路径字符串、对象、函数形式，Webpack 会将数组指明的入口全部打包成一个 Bundle。

```js
module.exports = {
  //...
  entry: {
    // 字符串形态
    home: './home.js',
    // 数组形态
    shared: ['react', 'react-dom', 'redux', 'react-redux'],
    // 对象形态
    personal: {
      import: './personal.js',
      filename: 'pages/personal.js',
      dependOn: 'shared',
      chunkLoading: 'jsonp',
      asyncChunks: true
    },
    // 函数形态
    admin: function() {
      return './admin.js';
    }
  },
};
```

对象为例，支持以下属性配置：

- `import`：声明入口文件，支持路径字符串或路径数组(多入口)；

- `dependOn`：声明该入口的前置依赖 Bundle，从效果上看能够减少重复代码，优化构建产物质量。例如：

  ```js
  module.exports = {
    // ...
    entry: {
      main: "./src/index.js",
      foo: { import: "./src/foo.js", dependOn: "main" },
    },
  };
  ```

  示例中，`foo` 入口的 `dependOn` 属性指向 `main` 入口，此时 Webpack 认为：客户端在加载 `foo` 产物之前必然会加载 `main`，因此可以将重复的模块代码、运行时代码等都放到 `main` 产物，减少不必要的重复。

  ![image.png](https://cdn.yihuiblog.top/images/202208171421507.webp)

  左边为 `main` 产物，包含所有模块、运行时代码，与普通 Bundle 无异；右边为 `foo` 产物，代码结构非常清爽。作为对比，若不指定 `dependOn` 属性，则构建结果：

  ![image.png](https://cdn.yihuiblog.top/images/202208171421435.webp)

  <u>`dependOn` 适用于哪些有明确入口依赖的场景，例如我们构建了一个主框架 Bundle，其中包含了项目基本框架(如 React)，之后还需要为每个页面单独构建 Bundle，这些页面代码也都依赖于主框架代码，此时可用 `dependOn` 属性优化产物内容，减少代码重复。</u>

- `runtime`：设置该入口的 Runtime Chunk（管理运行时代码），若该属性不为空，Webpack 会将该入口的运行时代码抽离成单独的 Bundle；

  为支持产物代码在各种环境中正常运行，Webpack 会在产物文件中注入一系列运行时代码，用以支撑起整个应用框架。运行时代码的多寡取决于我们用到多少特性，例如：

  - 需要导入导出文件时，将注入 `__webpack_require__.r` 等；
  - 使用异步加载时，将注入 `__webpack_require__.l` 等；

- `filename`：效果与 [output.filename](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputfilename) 类同，用于声明该模块构建产物路径；

- `library`：声明该入口的 [output.library](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputlibrary) 配置，一般在构建 NPM Library 时使用；

- `publicPath`：效果与 [output.publicPath](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputpublicpath) 相同，用于声明该入口文件的发布 URL；

- `chunkLoading`：效果与 [output.chunkLoading](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputchunkloading) 相同，用于声明异步模块加载的技术方案，支持 `false/jsonp/require/import` 等值；

- `asyncChunks`：效果与 [output.asyncChunks](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputasyncchunks) 相同，用于声明是否支持异步模块加载，默认值为 `true`。

### 使用 output 声明输出方式

Webpack 的 [output](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F) 配置项用于声明：如何输出构建结果，比如产物放在什么地方、文件名是什么、文件编码等。`output` 支持许多子配置项，包括：

- [output.path](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputpath)：声明产物放在什么文件目录下；
- [output.filename](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputfilename)：声明产物文件名规则，支持 `[name]/[hash]` 等占位符；
- [output.publicPath](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputpublicpath)：文件发布路径，在 Web 应用中使用率较高；
- [output.clean](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputclean)：是否自动清除 `path` 目录下的内容，调试时特别好用；
- [output.library](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputlibrary)：NPM Library 形态下的一些产物特性，例如：Library 名称、模块化(UMD/CMD 等)规范；
- [output.chunkLoading](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputchunkloading)：声明加载异步模块的技术方案，支持 `false/jsonp/require` 等方式。

对于 Web 应用场景，多数情况下我们只需要使用 `path/filename/publicPath` 即可满足需求，其它属性使用率不高，篇幅关系，此处不再赘述。

### 使用 target 设置构建目标

虽然多数时候 Webpack 都被用于打包 Web 应用，但实际上 Webpack 还支持构建 Node、Electron、NW.js、WebWorker 等应用形态，这一特性主要通过 [target](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Ftarget%2F) 配置控制，支持如下数值：

- `node[[X].Y]`：编译为 Node 应用，此时将使用 Node 的 `require` 方法加载其它 Chunk，支持指定 Node 版本，如：`node12.13`；
- `async-node[[X].Y]`：编译为 Node 应用，与 `node` 相比主要差异在于：`async-node` 方式将以异步(Promise)方式加载异步模块(`node` 时直接使用 `require`)。支持指定 Node 版本，如：`async-node12.13`；
- `nwjs[[X].Y]`：编译为 NW.js 应用；
- `node-webkit[[X].Y]`：同 `nwjs`；
- `electron[[X].Y]-main`：构建为 Electron [主进程](https://link.juejin.cn/?target=https%3A%2F%2Fwww.electronjs.org%2Fzh%2Fdocs%2Flatest%2Ftutorial%2Fprocess-model%23%E4%B8%BB%E8%BF%9B%E7%A8%8B)；
- `electron[[X].Y]-renderer`：构建为 Electron [渲染进程](https://link.juejin.cn/?target=https%3A%2F%2Fwww.electronjs.org%2Fzh%2Fdocs%2Flatest%2Ftutorial%2Fprocess-model%23%E6%B8%B2%E6%9F%93%E5%99%A8%E8%BF%9B%E7%A8%8B)；
- `electron[[X].Y]-preload`：构建为 Electron Preload [脚本](https://link.juejin.cn/?target=https%3A%2F%2Fwww.electronjs.org%2Fzh%2Fdocs%2Flatest%2Ftutorial%2Fprocess-model%23preload-%E8%84%9A%E6%9C%AC)；
- `web`：构建为 Web 应用；
- `esX`：构建为特定版本 ECMAScript 兼容的代码，支持 `es5`、`es2020` 等；
- `browserslist`：根据浏览器平台与版本，推断需要兼容的 ES 特性，数据来源于 [Browserslist](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbrowserslist%2Fbrowserslist%23queries) 项目，用法如：`browserslist: 'last 2 major versions'`。

### 使用 `mode` 短语 设置构建模式

Webpack [内置](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack%2Fblob%2Fmain%2Flib%2Fconfig%2Fdefaults.js) 了许多构建优化策略，我们可以通过 [mode](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fmode%2F) 配置项切换默认优化规则，支持如下值：

- `production`：默认值，生产模式，使用该值时 Webpack 会自动帮我们开启一系列优化措施：Three-Shaking、Terser 压缩代码、SplitChunk 提起公共代码，通常用于生产环境构建；
- `development`：开发模式，使用该值时 Webpack 会保留更语义化的 Module 与 Chunk 名称，更有助于调试，通常用于开发环境构建；
- `none`：关闭所有内置优化规则。

`mode` 规则比较简单，一般在开发模式使用 `mode = 'development'`，生产模式使用 `mode = 'production'` 即可。

## 总结

- `entry` 配置项支持字符串、对象、函数、数组等方式，其中对象形式下的 `dependOn/runtime` 规则比较复杂，建议深入学习；
- `output` 用于声明构建产物的输出规则；
- `target` 用于设置构建目标，不同目标会导致产物内容有轻微差异，支持 Node、Web、Electron、WebWorker 等场景；
- `mode` 构建模式，支持 `development/production/none` 三种值。



