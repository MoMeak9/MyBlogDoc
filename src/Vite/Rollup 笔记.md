比较常用的 Rollup 插件库:

- [@rollup/plugin-json](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frollup%2Fplugins%2Ftree%2Fmaster%2Fpackages%2Fjson "https://github.com/rollup/plugins/tree/master/packages/json")： 支持`.json`的加载，并配合`rollup`的`Tree Shaking`机制去掉未使用的部分，进行按需打包。
- [@rollup/plugin-babel](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frollup%2Fplugins%2Ftree%2Fmaster%2Fpackages%2Fbabel "https://github.com/rollup/plugins/tree/master/packages/babel")：在 Rollup 中使用 Babel 进行 JS 代码的语法转译。
- [@rollup/plugin-typescript](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frollup%2Fplugins%2Ftree%2Fmaster%2Fpackages%2Ftypescript "https://github.com/rollup/plugins/tree/master/packages/typescript"): 支持使用 TypeScript 开发。
- [@rollup/plugin-alias](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frollup%2Fplugins%2Ftree%2Fmaster%2Fpackages%2Falias "https://github.com/rollup/plugins/tree/master/packages/alias")：支持别名配置。
- [@rollup/plugin-replace](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frollup%2Fplugins%2Ftree%2Fmaster%2Fpackages%2Freplace "https://github.com/rollup/plugins/tree/master/packages/replace")：在 Rollup 进行变量字符串的替换。
- [rollup-plugin-visualizer](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbtd%2Frollup-plugin-visualizer "https://github.com/btd/rollup-plugin-visualizer"): 对 Rollup 打包产物进行分析，自动生成产物体积可视化分析图。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67d0f8c753ed4eb29ac513439ac198ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp)

目前经过 Build 阶段的 `bundle` 对象其实并没有进行模块的打包，这个对象的作用在于存储各个模块的内容及依赖关系，同时暴露`generate`和`write`方法，以进入到后续的 `Output` 阶段（`write`和`generate`方法唯一的区别在于前者打包完产物会写入磁盘，而后者不会）。

所以，真正进行打包的过程会在 `Output` 阶段进行，即在`bundle`对象的 `generate`或者`write`方法中进行。


### Hooks 

除了根据构建阶段可以将 Rollup 插件进行分类，根据不同的 Hook 执行方式也会有不同的分类，主要包括`Async`、`Sync`、`Parallel`、`Sequential`、`First`这五种。在后文中我们将接触各种各样的插件 Hook，但无论哪个 Hook 都离不开这五种执行方式。

**1. Async & Sync**

首先是`Async`和`Sync`钩子函数，两者其实是相对的，分别代表`异步`和`同步`的钩子函数，两者最大的区别在于同步钩子里面不能有异步逻辑，而异步钩子可以有。

**2. Parallel**

这里指并行的钩子函数。如果有多个插件实现了这个钩子的逻辑，一旦有钩子函数是异步逻辑，则并发执行钩子函数，不会等待当前钩子完成(底层使用 `Promise.all`)。

比如对于`Build`阶段的`buildStart`钩子，它的执行时机其实是在构建刚开始的时候，各个插件可以在这个钩子当中做一些状态的初始化操作，但其实插件之间的操作并不是相互依赖的，也就是可以并发执行，从而提升构建性能。反之，对于需要**依赖其他插件处理结果**的情况就不适合用 `Parallel` 钩子了，比如 `transform`。

**3. Sequential**

**Sequential** 指串行的钩子函数。这种 Hook 往往适用于插件间处理结果相互依赖的情况，前一个插件 Hook 的返回值作为后续插件的入参，这种情况就需要等待前一个插件执行完 Hook，获得其执行结果，然后才能进行下一个插件相应 Hook 的调用，如`transform`。

**4. First**

如果有多个插件实现了这个 Hook，那么 Hook 将依次运行，直到返回一个非 null 或非 undefined 的值为止。比较典型的 Hook 是 `resolveId`，一旦有插件的 resolveId 返回了一个路径，将停止执行后续插件的 resolveId 逻辑。

刚刚我们介绍了 Rollup 当中不同插件 Hook 的类型，实际上不同的类型是可以叠加的，`Async`/`Sync` 可以搭配后面三种类型中的任意一种，比如一个 Hook既可以是 `Async` 也可以是 `First` 类型，接着我们将来具体分析 Rollup 当中的插件工作流程，里面会涉及到具体的一些 Hook，大家可以具体地感受一下。


## 执行顺序

### Build 阶段工作流

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58ce9fa2b0f14dd1bc50a9c849157e43~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp)

1. 首先经历 `options` 钩子进行配置的转换，得到处理后的配置对象。
   
2. 随之 Rollup 会调用`buildStart`钩子，正式开始构建流程。
   
3. Rollup 先进入到 `resolveId` 钩子中解析文件路径。(从 `input` 配置指定的入口文件开始)。
   
4. Rollup 通过调用`load`钩子加载模块内容。
   
5. 紧接着 Rollup 执行所有的 `transform` 钩子来对模块内容进行进行自定义的转换，比如 babel 转译。
   
6. 现在 Rollup 拿到最后的模块内容，进行 AST 分析，得到所有的 import 内容，调用 moduleParsed 钩子:
   
    - **6.1** 如果是普通的 import，则执行 `resolveId` 钩子，继续回到步骤`3`。
    - **6.2** 如果是动态 import，则执行 `resolveDynamicImport` 钩子解析路径，如果解析成功，则回到步骤`4`加载模块，否则回到步骤`3`通过 `resolveId` 解析路径。
7. 直到所有的 import 都解析完毕，Rollup 执行`buildEnd`钩子，Build 阶段结束。

**关于Watcher**

`watchChange`和`closeWatcher`这两个 Hook，这里其实是对应了 rollup 的`watch`模式。当你使用 `rollup --watch` 指令或者在配置文件配有`watch: true`的属性时，代表开启了 Rollup 的`watch`打包模式，这个时候 Rollup 内部会初始化一个 `watcher` 对象，当文件内容发生变化时，watcher 对象会自动触发`watchChange`钩子执行并对项目进行重新构建。在当前**打包过程结束**时，Rollup 会自动清除 watcher 对象调用`closeWacher`钩子。

### Output 阶段工作流

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dc4935d712d451fb6978fad46dd7b74~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12142ea189be4a8f918cf247f408487e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp)

## 具体常用钩子

resolveId
load
transform
renderChunk
gengerateBundle


