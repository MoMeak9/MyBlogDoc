对于项目的加载性能优化而言，常见的优化手段可以分为下面三类:

1. **网络优化**。包括 `HTTP2`、`DNS 预解析`、`Preload`、`Prefetch`等手段。
2. **资源优化**。包括`构建产物分析`、`资源压缩`、`产物拆包`、`按需加载`等优化方式。
3. **预渲染优化**，本文主要介绍`服务端渲染`(SSR)和`静态站点生成`(SSG)两种手段。

## 一、网络优化

### 1. HTTP2

传统的 `HTTP 1.1` 存在**队头阻塞**的问题，同一个 TCP 管道中同一时刻只能处理一个 HTTP 请求，也就是说如果当前请求没有处理完，其它的请求都处于阻塞状态，另外浏览器对于同一域名下的并发请求数量都有限制，比如 Chrome 中只允许 `6` 个请求并发（这个数量不允许用户配置），也就是说请求数量超过 6 个时，多出来的请求只能**排队**、等待发送。因此，在 HTTP 1.1 协议中，**队头阻塞**和**请求排队**问题很容易成为网络层的性能瓶颈。

HTTP 2实现能力：

- **多路复用**。将数据分为多个二进制帧，多个请求和响应的数据帧在同一个 TCP 通道进行传输，解决了之前的队头阻塞问题。
- **Server Push**，即服务端推送能力。比如对于一个 html 的请求，通过 HTTP 2 我们可以同时将相应的 js 和 css 资源推送到浏览器，省去了后续请求的开销。

在 Vite 中，可以通过`vite-plugin-mkcert`在本地 Dev Server 上开启 HTTP2

插件的原理也比较简单，由于 HTTP2 依赖 TLS 握手，插件会帮你自动生成 TLS 证书，然后支持通过 HTTPS 的方式启动，而 Vite 会自动把 HTTPS 服务升级为 HTTP2。

> 其中有一个特例，即当你使用 Vite 的 proxy 配置时，Vite 会将 HTTP2 降级为 HTTPS，不过这个问题你可以通过[vite-plugin-proxy-middleware](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwilliamyorkl%2Fvite-plugin-proxy-middleware)插件解决。

`vite-plugin-mkcert`插件仅用于开发阶段，在生产环境中我们会对线上的服务器进行配置，从而开启 HTTP2 的能力，如 [Nginx 的 HTTP2 配置](http://nginx.org/en/docs/http/ngx_http_v2_module.html)。

### 2. DNS 预解析

通过 `dns-prefetch` 技术将这一过程提前，降低 DNS 解析的延迟时间，具体使用方式如下:

```html
<!-- href 为需要预解析的域名 -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com/"> 
```

一般情况下 `dns-prefetch`会与`preconnect` 搭配使用，前者用来解析 DNS，而后者用来会建立与服务器的连接，建立 TCP 通道及进行 TLS 握手，进一步降低请求延迟。使用方式如下所示:

```html
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
<link rel="dns-prefetch" href="https://fonts.gstatic.com/">
```

> 值得注意的是，对于 preconnect 的 link 标签一般需要加上 crorssorigin(跨域标识)，否则对于一些字体资源 `preconnect` 会失效。

### 3. Preload/Prefetch

对于一些比较重要的资源，我们可以通过 `Preload` 方式进行预加载，即在资源使用之前就进行加载，而不是在用到的时候才进行加载，这样可以使资源更早地到达浏览器。具体使用方式如下:

```html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">
```

其中我们一般会声明 `href` 和 `as` 属性，分别表示资源地址和资源类型。`Preload`的浏览器[兼容性](https://link.juejin.cn/?target=https%3A%2F%2Fcaniuse.com%2F%3Fsearch%3Dpreload)也比较好，目前 90% 以上的浏览器已经支持。

**预加载原生模块：**

与普通 script 标签不同的是，对于原生 ESM 模块，浏览器提供了`modulepreload`来进行预加载:

```html
<link rel="modulepreload" href="/src/app.js" />
```

仅有 70% 左右的浏览器支持这个特性，不过在 Vite 中我们可以通过配置一键开启 `modulepreload` 的 Polyfill，从而在使所有支持原生 ESM 的浏览器([占比 90% 以上](https://link.juejin.cn/?target=https%3A%2F%2Fcaniuse.com%2F%3Fsearch%3Dtype%3D%22%20module%22))都能使用该特性，配置方式如下:

```ts
// vite.config.ts
export default {
  build: {
    polyfillModulePreload: true
  }
}
```

**`Prefetch`预加载其他页面资源** 

```ts
<link rel="prefetch" href="https://B.com/index.js" as="script">
```

这样浏览器会在 A 页面加载完毕之后去加载`B`这个域名下的资源，如果用户跳转到了`B`页面中，浏览器会直接使用预加载好的资源，从而提升 B 页面的加载速度。而相比 Preload， `Prefetch` 的浏览器[兼容性](https://link.juejin.cn/?target=https%3A%2F%2Fcaniuse.com%2F%3Fsearch%3Dprefetch)不太乐观，小于78%

## 资源优化

### 1. 产物分析报告

为了能可视化地感知到产物的体积情况，推荐用`rollup-plugin-visualizer`进行产物分析

## 2. 资源压缩

有这样几类资源可以被压缩处理: `JavaScript 代码`、`CSS 代码`和`图片文件`

### JavaScript 压缩

在 Vite 生产环境构建的过程中，JavaScript 产物代码会自动进行压缩，相关的配置参数如下:

```ts
// vite.config.ts
export default {
  build: {
    // 类型: boolean | 'esbuild' | 'terser'
    // 默认为 `esbuild`
    minify: 'esbuild',
    // 产物目标环境
    target: 'modules',
    // 如果 minify 为 terser，可以通过下面的参数配置具体行为
    // https://terser.org/docs/api-reference#minify-options
    terserOptions: {}
  }
}
```

Target 也会影响压缩成果，为了达到极致的压缩效果，压缩器一般会根据浏览器的目标，会对代码进行语法层面的转换，比如下面这个例子:

```ts
// 业务代码中
info == null ? undefined : info.name
```

如果你将 `target` 配置为`exnext`，也就是最新的 JS 语法，会发现压缩后的代码变成了下面这样:

```ts
info?.name
```

为了线上的稳定性，推荐最好还是将 target 参数设置为`ECMA`语法的最低版本`es2015`/`es6`。

### CSS 压缩

对于 CSS 代码的压缩，Vite 中的相关配置如下:

```ts
// vite.config.ts
export default {
  build: {
    // 设置 CSS 的目标环境
    cssTarget: ''
  }
}
```

默认情况下 Vite 会使用 Esbuild 对 CSS 代码进行压缩，一般不需要我们对 `cssTarget` 进行配置。

不过在需要兼容安卓端微信的 webview 时，我们需要将 `build.cssTarget` 设置为 `chrome61`，以防止 vite 将 `rgba()` 颜色转化为 `#RGBA` 十六进制符号的形式，出现样式问题。

### 图片压缩

一般使用 `vite-plugin-imagemin`来进行图片压缩

### 产物拆包

如果不对产物进行`代码分割`(或者`拆包`)，全部打包到一个 chunk 中，会产生如下的问题:

- 首屏加载的代码体积过大，即使是当前页面不需要的代码也会进行加载。
- 线上**缓存复用率**极低，改动一行代码即可导致整个 bundle 产物缓存失效。

而 Vite 中内置如下的代码拆包能力:

- CSS 代码分割，即实现一个 chunk 对应一个 css 文件。
- 默认有一套拆包策略，将应用的代码和第三方库的代码分别打包成两份产物，并对于动态 import 的模块单独打包成一个 chunk。

当然，我们也可以通过`manualChunks`参数进行自定义配置

### 按需加载

在一个完整的 Web 应用中，对于某些模块当前页面可能并不需要，如果浏览器在加载当前页面的同时也需要加载这些不必要的模块，那么可能会带来严重的性能问题。一个比较好的方式是对路由组件进行动态引入，比如在 React 应用中使用 `@loadable/component` 进行组件异步加载

当然，对于组件内部的逻辑，我们也可以通过动态 `import()` 的方式来延迟执行，进一步优化首屏的加载性能

## 预渲染优化

而 SSG 可以在构建阶段生成完整的 HTML 内容，它与 SSR 最大的不同在于 HTML 的生成在构建阶段完成，而不是在服务器的运行时。SSG 同样可以给浏览器完整的 HTML 内容，不依赖于 JS 的加载，可以有效提高页面加载性能。