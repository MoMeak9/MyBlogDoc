# Vite SSR 指南

## 示例项目

Vite 为服务端渲染（SSR）提供了内建支持。这里的 Vite 范例包含了 Vue 3 和 React 的 SSR 设置示例，可以作为本指南的参考：

- [Vue 3](https://github.com/vitejs/vite-plugin-vue/tree/main/playground/ssr-vue)
- [React](https://github.com/vitejs/vite-plugin-react/tree/main/playground/ssr-react)

## 源码结构

一个典型的 SSR 应用应该有如下的源文件结构：

```
- index.html
- server.js # main application server
- src/
  - main.js          # 导出环境无关的（通用的）应用代码
  - entry-client.js  # 将应用挂载到一个 DOM 元素上
  - entry-server.js  # 使用某框架的 SSR API 渲染该应用
```

`index.html` 将需要引用 `entry-client.js` 并包含一个占位标记供给服务端渲染时注入：

```
<div id="app"><!--ssr-outlet--></div>
<script type="module" src="/src/entry-client.js"></script>
```

你可以使用任何你喜欢的占位标记来替代 `<!--ssr-outlet-->`，只要它能够被正确替换。

**模版配置：**

## 设置开发服务器

在构建 SSR 应用程序时，你可能希望完全控制主服务器，并将 Vite 与生产环境脱钩（生产环境渲染不再依赖于Vute）。因此，建议以中间件模式使用 Vite。下面是一个关于 [express](https://expressjs.com/) 的例子：

```js
// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const isTest = process.env.VITEST

export async function createServer(
  root = process.cwd(),
   // 在 server.js 中，通过 process.env.NODE_ENV 条件分支，需要添加一些用于生产环境的特定逻辑
  isProd = process.env.NODE_ENV === 'production',
  hmrPort,
) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  const manifest = isProd
    ? JSON.parse(
        fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'),
      )
    : {}

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      base: '/test/',
      root,
      logLevel: isTest ? 'error' : 'info',
      
      // 以中间件模式创建 Vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑
  		// 并让上级服务器接管控制
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: 'custom',
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use((await import('compression')).default())
    app.use(
      '/test/',
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      }),
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace('/test/', '/')

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        // 1. 读取 index.html
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
   			//    同时也会从 Vite 插件应用 HTML 转换。
        //    例如：@vitejs/plugin-react 中的 global preambles
        template = await vite.transformIndexHtml(url, template)
        // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
        //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
        //    并提供类似 HMR 的根据情况随时失效。
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        template = indexProd
        // 此时访问的render是SSR构建后的最终结果
        render = (await import('./dist/server/entry-server.js')).render
      }
      // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
      //    函数调用了适当的 SSR 框架 API。
      //    例如 ReactDOMServer.renderToString()
      const [appHtml, preloadLinks] = await render(url, manifest)

      // 5. 注入渲染后的应用程序 HTML 到模板中。
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

      // 6. 返回渲染后的 HTML。
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(6173, () => {
      console.log('http://localhost:6173')
    }),
  )
}
```

这里 `vite` 是 [ViteDevServer](https://cn.vitejs.dev/guide/api-javascript.html#vitedevserver) 的一个实例。`vite.middlewares` 是一个 [Connect](https://github.com/senchalabs/connect) 实例，它可以在任何一个兼容 connect 的 Node.js 框架中被用作一个中间件。

`package.json` 中的 `dev` 脚本也应该相应地改变，使用服务器脚本：

diff

```json
"scripts": {
  "dev": "vite"
  "dev": "node server"
}
```

## 生产环境构建

为了将 SSR 项目交付生产，我们需要：

1. 正常生成一个客户端构建；
2. 再生成一个 SSR 构建，使其通过 `import()` 直接加载，这样便无需再使用 Vite 的 `ssrLoadModule`；

`package.json` 中的脚本应该看起来像这样：

```json
{
  "scripts": {
    "dev": "node server",
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --outDir dist/server --ssr src/entry-server.js"
  }
}
```

模版中的完整版应该是这样：

```json
{
  "scripts": {
    "dev": "node server",
    "build": "npm run build:client && npm run build:server",
    "build:noExternal": "npm run build:client && npm run build:server:noExternal",
    "build:client": "vite build --ssrManifest --outDir dist/client",
    "build:server": "vite build --ssr src/entry-server.js --outDir dist/server",
    "build:server:noExternal": "vite build --config vite.config.noexternal.js --ssr src/entry-server.js --outDir dist/server",
    "generate": "vite build --ssrManifest --outDir dist/static && npm run build:server && node prerender",
    "serve": "NODE_ENV=production node server",
    "debug": "node --inspect-brk server"
  }
}
```

## 生成预加载指令

`vite build` 支持使用 `--ssrManifest` 标志，这将会在构建输出目录中生成一份 `ssr-manifest.json`：

> 保持原样则为生成CSR客户端

```
- "build:client": "vite build --outDir dist/client",
+ "build:client": "vite build --outDir dist/client --ssrManifest",
```

上面的脚本将会为客户端构建生成 `dist/client/ssr-manifest.json`（是的，该 SSR 清单是从客户端构建生成而来，因为我们想要将模块 ID 映射到客户端文件上）。清单包含模块 ID 到它们关联的 chunk 和资源文件的映射。

为了利用该清单，框架需要提供一种方法来收集在服务器渲染调用期间使用到的组件模块 ID。

`@vitejs/plugin-vue` 支持该功能，开箱即用，并会自动注册使用的组件模块 ID 到相关的 Vue SSR 上下文：

```js
// src/entry-server.js
const ctx = {}
const html = await vueServerRenderer.renderToString(app, ctx)
// ctx.modules 现在是一个渲染期间使用的模块 ID 的 Set
```

我们现在需要在 `server.js` 的生产环境分支下读取该清单，并将其传递到 `src/entry-server.js` 导出的 `render` 函数中。这将为我们提供足够的信息，来为异步路由相应的文件渲染预加载指令！

### 预渲染 / SSG

如果预先知道某些路由所需的路由和数据，我们可以使用与生产环境 SSR 相同的逻辑将这些路由预先渲染到静态 HTML 中。这也被视为一种静态站点生成（SSG）的形式。查看 示例渲染代码 获取有效示例。

```js
// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = JSON.parse(
  fs.readFileSync(toAbsolute('dist/static/ssr-manifest.json'), 'utf-8'),
)
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute('src/pages'))
  .map((file) => {
    const name = file.replace(/\.vue$/, '').toLowerCase()
    return name === 'home' ? `/` : `/${name}`
  })

;(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const [appHtml, preloadLinks] = await render(url, manifest)

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }

  // done, delete ssr manifest
  fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()
```

## SSR 外部化

当运行 SSR 时依赖会由 Vite 的 SSR 转换模块系统作外部化。这会同时提速开发与构建。

例如，如果依赖项需要通过 Vite 的管道进行转换，因为在这些依赖在管道中使用 Vite 特性时是不转翻译的，则可以将它们添加到 [`ssr.noExternal`](https://cn.vitejs.dev/config/ssr-options.html#ssrnoexternal) 中。

> 使用别名
>
> 如果你为某个包配置了一个别名，为了能使 SSR 外部化依赖功能正常工作，你可能想要使用的别名应该指的是实际的 `node_modules` 中的包。[Yarn](https://classic.yarnpkg.com/en/docs/cli/add/#toc-yarn-add-alias) 和 [pnpm](https://pnpm.js.org/en/aliases) 都支持通过 `npm:` 前缀来设置别名。

## SSR 构建目标

SSR 构建的默认目标为 node 环境，但你也可以让服务运行在 Web Worker 上。每个平台的打包条目解析是不同的。你可以将`ssr.target` 设置为 `webworker`，以将目标配置为 Web Worker。

## SSR 构建产物

在某些如 `webworker` 运行时等特殊情况中，你可能想要将你的 SSR 打包成单个 JavaScript 文件。你可以通过设置 `ssr.noExternal` 为 `true` 来启用这个行为。这将会做两件事：

- 将所有依赖视为 `noExternal`（非外部化）
- 若任何 Node.js 内置内容被引入，将抛出一个错误

## SSR 格式

默认情况下，Vite 生成的 SSR 打包产物是 ESM 格式。实验性地支持配置 `ssr.format` ，但不推荐这样做。未来围绕 SSR 的开发工作将基于 ESM 格式，并且为了向下兼容，commonjs 仍然可用。如果你的 SSR 项目不能使用 ESM，你可以通过 [Vite v2 外部启发式方法](https://v2.vitejs.dev/guide/ssr.html#ssr-externals) 设置 `legacy.buildSsrCjsExternalHeuristics: true` 生成 CJS 格式的产物。