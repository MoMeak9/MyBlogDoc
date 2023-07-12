# Nuxt3：新渲染模式-边缘渲染与swr

[Rendering Modes · Nuxt Concepts](https://nuxt.com/docs/guide/concepts/rendering)

浏览器和服务器都可以解析 JavaScript 代码以将 Vue.js 组件呈现为 HTML 元素。此步骤称为**渲染**。Nuxt 同时支持**客户端**和**同构**渲染。这两种方法各有利弊，我们将在本节中介绍。

## 仅客户端呈现

开箱即用，传统的 Vue.js 应用程序在浏览器（或客户端）中呈现。然后，在浏览器下载并解析所有包含创建当前界面的指令的 JavaScript 代码后，Vue.js 生成 HTML 元素。

![csr](https://fs.lwmc.net/uploads/2023/05/1683049208497-202305030140109.webp)

虽然这种技术允许构建具有平滑页面转换的复杂和动态 UI，但它具有不同的优点和缺点：

### 优点

- **开发速度**：当完全在客户端工作时，我们不必担心代码的服务器兼容性，例如，通过使用像对象这样的仅限浏览器的 API `window`。
- **更便宜：**运行服务器会增加基础设施成本，因为您需要在支持 JavaScript 的平台上运行。我们可以在任何带有 HTML、CSS 和 JavaScript 文件的静态服务器上托管仅客户端应用程序。
- **离线：**因为代码完全在浏览器中运行，所以它可以在互联网不可用时很好地继续工作。

### 缺点

- **性能**：用户必须等待浏览器下载、解析和运行 JavaScript 文件。根据下载部分的网络和解析和执行的用户设备，这可能需要一些时间并影响用户体验。
- **搜索引擎优化 SEO**：索引和更新通过客户端呈现交付的内容比使用服务器呈现的 HTML 文档需要更多时间。这与我们讨论的性能缺陷有关，因为搜索引擎爬虫不会在第一次尝试索引页面时等待界面完全呈现。您的内容将花费更多时间在纯客户端呈现的搜索结果页面中显示和更新。

### 例子

对于不需要索引或用户访问频繁的高度交互的**Web 应用程序，**客户端呈现是一个不错的选择。它可以利用浏览器缓存来跳过后续访问的下载阶段，例如**SaaS、后台应用程序或在线游戏**。

## 通用渲染

当浏览器请求启用了通用（客户端+服务器端）呈现的 URL 时，服务器会向浏览器返回一个完全呈现的 HTML 页面。无论页面是预先生成并缓存还是动态呈现，Nuxt 都在某个时刻在服务器环境中运行了 JavaScript (Vue.js) 代码，生成了 HTML 文档。用户立即获得我们应用程序的内容，这与客户端呈现相反。此步骤类似于由 PHP 或 Ruby 应用程序执行的传统**服务器端呈现。**

为了不失去客户端呈现方法的好处，例如动态界面和页面转换，一旦下载了 HTML 文档，客户端就会在后台加载在服务器上运行的 javascript 代码。浏览器再次解释它（因此**Universal rendering**）并且 Vue.js 控制文档并启用交互性。

使静态页面在浏览器中交互称为“Hydration”。

通用渲染允许 Nuxt 应用程序提供快速的页面加载时间，同时保留客户端渲染的优势。此外，由于内容已经存在于 HTML 文档中，爬虫可以在没有开销的情况下对其进行索引。

![ssr](https://fs.lwmc.net/uploads/2023/05/1683049824167-202305030150588.webp)

### 优点

- **性能**：用户可以立即访问页面内容，因为浏览器显示静态内容的速度比 JavaScript 生成的内容快得多。同时，Nuxt 在水合过程发生时保留了 Web 应用程序的交互性。
- **搜索引擎优化**：通用呈现将页面的整个 HTML 内容作为经典服务器应用程序提供给浏览器。Web 爬虫可以直接索引页面的内容，这使得通用呈现成为您想要快速索引的任何内容的绝佳选择。

### 缺点

- **开发限制：**服务器和浏览器环境不提供相同的 API，编写可以在两端无缝运行的代码可能很棘手。幸运的是，Nuxt 提供了指南和特定变量来帮助您确定一段代码的执行位置。
- **成本：**需要运行服务器才能动态呈现页面。这会像任何传统服务器一样增加每月费用。然而，由于浏览器接管客户端导航的通用渲染，服务器调用大大减少了。

有关编写无水合作用不匹配的 Vue 代码的更多示例，请参阅Vue 文档。

当导入依赖于浏览器 API 且有副作用的库时，请确保导入它的组件仅称为客户端。捆绑器不会对包含副作用的模块进行 treeshake 导入。

### [例子](https://nuxt.com/docs/guide/concepts/rendering#examples-1)

通用渲染非常通用，几乎可以适合任何用例，尤其适用于任何面向内容的网站：**博客、营销网站、投资组合、电子商务网站和市场。**

## [概括](https://nuxt.com/docs/guide/concepts/rendering#summary)

客户端和通用渲染是在浏览器中显示界面的不同策略。

默认情况下，Nuxt 使用**通用渲染**来提供更好的用户体验和性能，并优化搜索引擎索引，但您可以在[一行配置](https://nuxt.com/docs/api/configuration/nuxt-config#ssr)中切换渲染模式。

## [Nuxt 3 中的新渲染模式](https://nuxt.com/docs/guide/concepts/rendering#new-rendering-patterns-in-nuxt-3)

在大多数情况下，在 Nuxt 2 中执行的通用渲染提供了良好的用户和开发人员体验。然而，Nuxt 3 通过引入混合渲染和边缘渲染，将通用渲染更进一步。

### [混合渲染](https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering)

混合渲染允许使用路由规则为每个路由使用不同的缓存规则**，**并决定服务器应如何响应给定 URL 上的新请求。

### [在 CDN Edge Worker 上呈现](https://nuxt.com/docs/guide/concepts/rendering#rendering-on-cdn-edge-workers)

传统上，服务器端和通用渲染只能使用 Node.js。Nuxt 3 通过直接在 CDN 边缘工作者中渲染代码，将其提升到另一个层次，减少了延迟和成本。

Nitro 是为 Nuxt 3 提供支持的新[服务器引擎。](https://nuxt.com/docs/guide/concepts/server-engine)它为 Node.js、Deno、Workers 等提供跨平台支持。Nitro 的设计与平台无关，允许在边缘渲染 Nuxt 应用程序，更接近您的用户，允许复制和进一步优化。

### [路由规则](https://nuxt.com/docs/guide/concepts/rendering#route-rules)

> 🧪 路线规则仍在积极开发中，可能会发生变化。

以前，Nuxt 应用程序和服务器的每个路由/页面都必须使用相同的渲染模式，客户端或通用。但在各种情况下，一些页面可以在构建时生成，而其他页面应该在客户端呈现。例如，考虑一个带有管理部分的内容网站。每个内容页面应该主要是静态的并且生成一次，但是管理部分需要注册并且表现得更像一个动态应用程序。

Nuxt 3 包括路由规则和混合渲染支持。使用路由规则，您可以为一组 nuxt 路由定义规则，更改渲染模式或分配基于路由的缓存策略！Nuxt 服务器会自动注册相应的中间件，并使用[nitro 缓存层](https://nitro.unjs.io/guide/cache)将路由与缓存处理程序包装起来。只要有可能，路由规则就会自动应用于部署平台的原生规则（目前支持 Netlify 和 Vercel）。

- `redirect`- 定义服务器端重定向。
- `ssr`- 禁用应用程序部分的服务器端呈现，并使它们成为 SPA-only`ssr: false`
- `cors`- 自动添加 cors 标头`cors: true`- 您可以通过覆盖来自定义输出`headers`
- `headers`- 将特定标题添加到您网站的部分 - 例如，您的资产
- `swr`- 将缓存标头添加到服务器响应并将其缓存在服务器或可配置 TTL 的反向代理中。Nitro 的预设`node-server`能够缓存完整的响应。对于 Netlify 和 Vercel，响应也被添加到 CDN 层。
- `static``swr`-除了没有 TTL 外，行为与其他相同；响应被缓存到下一次部署。在 Netlify 和 Vercel 上，它支持完全增量静态生成。
- `prerender`- 在构建时预渲染路由并将它们作为静态资产包含在您的构建中
- `experimentalNoScripts`- 禁止呈现 Nuxt 脚本和网站部分的 JS 资源提示。

**例子：**

```
export default defineNuxtConfig({
  routeRules: {
    // Static page generated on-demand, revalidates in background
    '/blog/**': { swr: true },
    // Static page generated on-demand once
    '/articles/**': { static: true },
    // Set custom headers matching paths
    '/_nuxt/**': { headers: { 'cache-control': 's-maxage=0' } },
    // Render these routes with SPA
    '/admin/**': { ssr: false },
    // Add cors headers
    '/api/v1/**': { cors: true },
    // Add redirect headers
    '/old-page': { redirect: '/new-page' },
    '/old-page2': { redirect: { to: '/new-page', statusCode: 302 } }
  }
})
```
