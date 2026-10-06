> 原文：https://www.smashingmagazine.com/2024/05/forensics-react-server-components/
>
> 原标题：# The Forensics Of React Server Components (RSCs)
>
> 作者：Lazar Nikolov

> 快速总结：我们喜欢客户端渲染，因为它减轻了服务器的负担，但仅提供一个空的 HTML 页面会导致初始加载时的用户体验不佳。我们喜欢服务器端渲染，因为它可以通过快速的 CDN 提供静态资源，但不适用于动态内容的大规模项目。React 服务器组件（RSC）结合了两者的优点，作者 Lazar Nikolov 深入探讨了我们是如何走到这一步的，以及 RSC 对页面加载时间线的影响。

在这篇文章中，我们将深入探讨 React 服务器组件（RSC），它们是 React 生态系统中的最新创新，结合服务器端和客户端渲染以及 [流式 HTML](https://en.wikipedia.org/wiki/Chunked_transfer_encoding) 以尽可能快速地传输内容。

我们将深入探讨 RFC 在 React 生态系统中的适应方式、它们对组件渲染生命周期的控制程度，以及有 RFC 存在时页面加载的表现。

但在深入研究这些之前，我认为值得回顾一下 React 到目前为止是如何渲染网站的，以此为背景，让我们了解为什么我们首先需要 RFC。

## 早期：React 客户端渲染

最初的 React 应用是在客户端，即在浏览器中渲染的。作为开发者，我们用 JavaScript 类作为组件编写应用，并使用 Webpack 这样的打包工具，将所有内容打包成一个经过良好编译和树摇（tree-shaken）的代码包，准备在生产环境中发布。

从服务器返回的 HTML 包含以下内容：

- 一个 HTML 文档，其中 `<head>` 包含元数据，`<body>` 包含一个空的 `<div>`，用作将应用注入到 DOM 中的钩子；
- 包含 React 核心代码和网页应用实际代码的 JavaScript 资源，这些代码将生成用户界面并填充空白的 `<div>`。

![img](https://fs.lwmc.net/uploads/2024/06/1718438390688-202406151559079.webp)

在此过程中，Web 应用只有在 JavaScript 完全加载完成后才能完全互动。这里存在一个问题，即**改进的开发者体验（DX）对用户体验（UX）产生了负面影响**。

事实上，React 中的 CSR 有其优缺点。从积极的方面来看，Web 应用提供了**平滑、快速的过渡**，这减少了页面加载时间，因为响应式组件可以在不触发页面刷新的情况下根据用户交互更新。CSR 减轻了服务器负担，并允许我们通过速度快的内容交付网络（CDN）提供资源，这些 CDN 可以更接近用户，从而优化页面加载。

然而，CSR 也带来了不利影响，其中最突出的就是组件可以独立获取数据，导致[**瀑布式网络请求**](https://blog.sentry.io/fetch-waterfall-in-react/)，这大大减慢了速度。这看似是微小的 UX 问题，但对用户来说影响甚大。Eric Bailey 的“[现代健康、框架、性能与伤害](https://ericwbailey.design/published/modern-health-frameworks-performance-and-harm/)”应成为所有 CSR 工作的警示故事。

其他负面影响没有那么严重，但仍然会导致损害。例如，过去，一个只包含元数据和空`<div>`的 HTML 文档对于从未获得完整呈现体验的搜索引擎爬虫来说是难以辨认的。虽然这个问题今天已经解决了，但当时的SEO打击是依靠搜索引擎流量产生收入的公司网站的拖累。

## 变革：服务器端渲染（SSR）

我们需要改变。CSR 为开发者提供了一种构建快速、互动界面的强大方法，但用户却不得面对空白屏幕和加载指示器。解决方案是将渲染体验从**客户端**移到**服务器端**。虽然听起来像是回归，但这的确解决了不少问题。

因此，React 获得了服务器端渲染（SSR）的能力。在某一时刻，SSR 在 React 社区中成为了一个热门话题，[甚至有过自己的高光时刻](https://sentry.io/resources/moving-to-server-side-rendering/)。转向 SSR 给应用开发带来了重大变化，特别是在它如何影响 React 行为以及如何通过服务器而非浏览器传递内容方面。

![img](https://fs.lwmc.net/uploads/2024/06/1718438409159-202406151600056.webp)

### 解决 CSR 限制

与发送一个空白 HTML 文档不同，SSR 在服务器上渲染初始 HTML 并将其发送给浏览器。浏览器能够立即显示内容，无需加载指示器。这显著提升了 [首次内容绘制 (FCP) 在 Web Vitals 中的性能指标](https://docs.sentry.io/product/performance/web-vitals/web-vitals-concepts/#first-contentful-paint-fcp)。

服务器端渲染还解决了 CSR 带来的 SEO 问题。因为爬虫可以直接接收到网站内容，能够立即索引。最初的数据获取也在服务器上进行，这是一个优点，因为离数据源更近，而且如果做得恰当，可以消除数据获取的瀑布流 [*如果做得恰当*](https://blog.sentry.io/fetch-waterfall-in-react/#fetch-data-on-server-to-avoid-a-fetch-waterfall)。

### 水合作用

SSR 有其复杂性。为了使 React 能够将从服务器接收的静态 HTML 变得可交互，需要对其进行**水合作用**。水合作用发生在 React 在客户端基于初始 HTML DOM 重构其虚拟文档对象模型（DOM）的过程。

> **注意**：React 维护自己的 [虚拟 DOM](https://legacy.reactjs.org/docs/faq-internals.html)，因为在它上面进行更新的计算比在实际 DOM 上快。当需要更新 UI 时，它会将实际 DOM 与虚拟 DOM 同步，但是首先在虚拟 DOM 上执行差异算法。

我们现在有两种 React 渲染风格：

1. **服务端风格**：能够从组件树中渲染静态 HTML，
2. **客户端风格**：能够使页面变得交互。

我们仍然需要向浏览器发送 React 和应用程序代码，因为为了水合初始 HTML，React 需要在客户端上使用与服务器端相同的组件。在水合作用过程中，React 会执行一个称为[*对帐*](https://css-tricks.com/how-react-reconciliation-works/)的过程，它比较服务器渲染的 DOM 与客户端渲染的 DOM，并试图识别两者之间的差异。如果存在不一致的地方，React 会尝试通过水合组件树并更新组件层次来解决。如果仍然存在无法解决的差异，React 会抛出错误提示问题，这个问题通常称为 *水合错误*。

### SSR 的缺点

SSR 并非是解决 CSR 限制的万能药。SSR 自身也存在许多缺点。由于将初始 HTML 渲染和数据获取移至服务器，因此服务器的负荷比在客户端加载所有数据时要大得多。

还记得提到 SSR 通常会改善 FCP 性能指标吗？这可能是真的，但是 [首字节时间 (TTFB) 性能指标](https://docs.sentry.io/product/performance/web-vitals/web-vitals-concepts/#time-to-first-byte-ttfb) 在使用 SSR 时会受到负面影响。浏览器需要等待服务器获取数据，生成初始 HTML，并发送第一个字节。虽然 TTFB 本身不是核心网络指标，但它会影响这些指标。较差的 TTFB 会导致核心网络指标的恶化。

SSR 的另一个缺点是，在客户端 React 完成对页面的水合作用之前，页面是无响应的。在 React 对它们进行水合作用之前，即在预期的事件监听器附加到组件之前，交互元素不能监听和“响应”用户互动。水合作用过程通常很快，但互联网连接和设备硬件可能显著减慢渲染速度。

## 现在：一种混合方法

至今，我们讨论了两种不同的 React 渲染方式：CSR 和 SSR。虽然这两者是相互改进的，我们现在已经可以说，存在一个结合两者优点的解决方案，因为 SSR 已经演变出另外三种 React 方式，提供混合方法，减少 CSR 和 SSR 的限制。

我们将先看前两种——**静态站点生成**和**增量静态再生**，之后深入讨论 React 服务器组件，即第三种方式。

### 静态站点生成 (SSG)

提出 SSG 是为了解决每次请求都重新生成相同 HTML 的问题。这种 React 渲染方式在构建时编译和生成整个应用的静态（即纯 HTML 和 CSS）文件，这些文件被托管在一个快速的 CDN 上。

正如您可能猜想的，这种混合渲染方式非常适合内容变动不大的小型项目，比如营销网站或个人博客，而不太适合内容会随用户互动而变化的大型项目，比如电子商务网站。

SSG 减轻了服务器的负担，因为服务器不再需要执行重渲染页面的繁重任务，而 TTFB 相关的性能指标有所改善。

### 增量静态再生（ISR）

SSG 的一个缺点是，当需要更改内容时，必须重建应用的所有代码。因为内容是固定的（静态的），所以无法只更改其中一部分而不重建整个应用。

Next.js 团队提出了解决 SSG 完全重建缺陷的第二种混合方式：**增量静态再生（ISR）**。这种方法仅重建必要部分而不是整个应用。我们在构建时静态生成页面的“初始版本”，但在用户访问后（服务器请求触发数据检查时），能重建包含过时数据的页面。

从那时起，服务器在需要时以增量方式静态提供页面的新版本，使 ISR 成为介于 SSG 和传统 SSR 之间的混合方法。

然而，ISR 未解决“内容过时”的问题，即用户可能在页面完成再生前访问该页面。与 SSG 不同，ISR 需要一个真正的服务器来应答用户的服务器请求以再生页面，因此无法将基于 ISR 的应用部署在 CDN 上以优化资产交付。

## 未来：React 服务器组件

目前，我们在 CSR、SSR、SSG 和 ISR 方法间不断折衷，这些方法在性能、开发复杂性和用户体验上都有一定的妥协。新引入的 [React 服务器组件](https://nextjs.org/docs/app/building-your-application/rendering/server-components) (RSC) 旨在通过允许开发者**为每个独立的 React 组件选择合适的渲染策略**来解决大多数缺点。

RSCs 可以显著减少发送到客户端的 JavaScript 量，因为我们可以选择性地决定哪些组件在服务器上静态生成，哪些在客户端渲染。这为特定项目提供了更多控制和灵活性。

但 RSC 究竟是什么呢？让我们深入探讨一下其内部工作原理。


## React 服务器组件剖析

这种新方法引入了两种类型的渲染组件：**服务器组件**和**客户端组件**。这两者的区别不在于它们的工作方式，而在于它们执行的位置和为之设计的环境。在写这篇文章的时候，使用 RSCs 的唯一方式是通过 React 框架。目前，只有三个框架支持它们：[Next.js](https://nextjs.org/docs/app/building-your-application/rendering/server-components), [Gatsby](https://www.gatsbyjs.com/docs/conceptual/partial-hydration/), 和 [RedwoodJS](https://redwoodjs.com/blog/rsc-now-in-redwoodjs)。

![](https://fs.yihuiblog.top/i/2025/12/12/872e8e5a-5a73-5cc6-6464-189a95656096-0.png)

### 服务器组件

服务器组件旨在服务器上执行，它们的代码永远不会被发送到浏览器。提供的只有 HTML 输出和它们可能接受的任何属性。这种方法具有多重性能优势和用户体验增强：

- **服务器组件允许大型依赖项保留在服务器端。**
  想象一下，为一个组件使用一个大型库。如果你在客户端执行该组件，意味着你也将整个库发送到浏览器。有了服务器组件，你只需要取静态 HTML 输出，避免将任何 JavaScript 发送到浏览器。服务器组件是真正的静态的，它们去除了整个 hydration 步骤。
- **服务器组件位于距离它们需要生成代码的数据源（例如，数据库或文件系统）更近的位置。**
  它们还利用服务器的计算能力加速计算密集型渲染任务，并仅将生成的结果发送回客户端。它们还在单次传递中生成，这[避免了请求瀑布和 HTTP 往返](https://blog.sentry.io/fetch-waterfall-in-react/#fetch-data-on-server-to-avoid-a-fetch-waterfall)。
- **服务器组件安全地将敏感数据和逻辑保留在浏览器之外。**
  这得益于个人令牌和 API 密钥是在安全服务器上执行，而不是客户端。
- **渲染结果可以在后续请求甚至不同会话之间缓存和重用。**
  这显著减少了渲染时间，以及每个请求获取的数据总量。

这种架构还利用了 **HTML 流式传输**，这意味着服务器推迟生成特定组件的 HTML，而是在它工作以发送回生成的 HTML 时，先渲染一个回退元素代替它们。流式服务器组件将组件包裹在 [``](https://react.dev/reference/react/Suspense) 标签中，提供一个回退值。实施框架最初使用回退值，但当准备好时流式传输新生成的内容。我们将进一步讨论流式传输，但首先让我们看看客户端组件并将其与服务器组件进行比较。

### 客户端组件

客户端组件是我们已经熟悉并喜爱的组件。它们在客户端执行。正因为此，客户端组件能够处理用户交互，并且能够访问浏览器 API，如 `localStorage` 和地理定位。

“客户端组件”这个术语并没有描述任何新的概念；它们仅仅被贴上标签，以帮助将“旧”的 CSR 组件与服务器组件区分开。客户端组件通过在文件顶部定义一个 [`"use client"`](https://react.dev/reference/react/use-server) 指令来标识。

```javascript
解释"use client"
export default function LikeButton() {
  const likePost = () => {
    // ...
  }
  return (
    <button onClick={likePost}>Like</button>
  )
}
```

在 Next.js 中，所有组件默认都是服务器组件。这就是为什么我们需要使用 `"use client"` 明确地定义我们的客户端组件。还有一个 `"use server"` 指令，但它用于服务器操作（这些是从客户端调用但在服务器上执行的类 RPC 操作）。你不使用它来定义你的服务器组件。

你可能（正确地）假设客户端组件只在客户端渲染，但 Next.js 在服务器上渲染客户端组件以生成初始 HTML。因此，浏览器可以立即开始渲染它们，然后稍后执行水合操作。

### 服务器组件和客户端组件之间的关系

客户端组件只能_明确地_导入其他客户端组件。换句话说，我们不能将一个服务器组件导入到一个客户端组件中，因为这会导致重新渲染问题。但是，我们可以在客户端组件的子树中包含服务器组件 —— 只能通过 `children` 属性传递。由于客户端组件存在于浏览器中，它们处理用户交互或定义自己的状态，它们会经常重新渲染。当客户端组件重新渲染时，其子树也会这样做。但是，如果其子树包含服务器组件，它们将如何重新渲染？它们不在客户端上。这就是 React 团队设置这一限制的原因。

但等一下！我们实际上 *可以* 将服务器组件导入到客户端组件中。只是并非一对一的直接关系，因为服务器组件将被转换成客户端组件。如果你使用了在浏览器中无法使用的服务器 API，你会遇到错误；如果没有 — 你将拥有一个其代码被“泄露”到浏览器中的服务器组件。

这是在使用 RSCs 时需要记住的一个极其重要的细微差别。

## 渲染生命周期

以下是 Next.js 处理页面内容的顺序：

1. 应用程序路由器将页面的 URL 与一个服务器组件匹配，构建组件树，并指示服务器端的 React 渲染该服务器组件及其所有子组件。
2. 在渲染过程中，React 生成一个“RSC 负载”。RSC 负载向 Next.js 通报页面的预期返回内容，以及在 `<Suspense>` 期间的备用内容。
3. 如果 React 遇到一个挂起的组件，它会暂停渲染那个子树，并使用挂起组件的备用值。
4. 当 React 处理完所有静态组件时，Next.js 将准备好的 HTML 和 RSC 负载通过一个或多个块流式传输回客户端。
5. 客户端的 React 使用 RSC 负载中的指令来渲染 UI，并在加载时水合每个客户端组件。
6. 服务器将挂起的服务器组件作为 RSC 负载流式传输，随着它们变得可用。如果挂起的组件包含任何客户端组件的子组件，这些子组件也会在此时被水合。

接下来，我们将从浏览器的视角观察 RSC 渲染生命周期。下面的图解展示了上述步骤。

![img](https://fs.lwmc.net/uploads//1718438350072-202406151559609.webp)

稍后我们将详细探讨浏览器视角下的操作流程。

## RSC 负载

RSC 负载是服务器在渲染组件树时生成的一种特殊数据格式，包括以下内容：

- 渲染的 HTML，
- 客户端组件的占位符，
- 对客户端组件 JavaScript 文件的引用，
- JavaScript 文件调用的指令，
- 从服务器组件传递给客户端组件的任何 props。

了解 RSC 负载的细节是有意义的，尽管不用过于担心它。下面是一个示例（为简洁起见已截断）取自我创建的 [演示应用](https://github.com/nikolovlazar/rsc-forensics)：

```javascript
解释1:HL["/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
2:HL["/_next/static/css/app/layout.css?v=1711137019097","style"]
0:"$L3"
4:HL["/_next/static/css/app/page.css?v=1711137019097","style"]
5:I["(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js",["app-pages-internals","static/chunks/app-pages-internals.js"],""]
8:"$Sreact.suspense"
a:I["(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js",["app-pages-internals","static/chunks/app-pages-internals.js"],""]
b:I["(app-pages-browser)/./node_modules/next/dist/client/components/render-from-template-context.js",["app-pages-internals","static/chunks/app-pages-internals.js"],""]
d:I["(app-pages-browser)/./src/app/global-error.jsx",["app/global-error","static/chunks/app/global-error.js"],""]
f:I["(app-pages-browser)/./src/components/clearCart.js",["app/page","static/chunks/app/page.js"],"ClearCart"]
7:["$","main",null,{"className":"page_main__GlU4n","children":[["$","$Lf",null,{}],["$","$8",null,{"fallback":["$","p",null,{"children":"LOADING loading products..."}],"children":"$L10"}]]}]
c:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}]...
9:["$","p",null,{"children":["SHOP ",3]}]
11:I["(app-pages-browser)/./src/components/addToCart.js",["app/page","static/chunks/app/page.js"],"AddToCart"]
10:["$","ul",null,{"children":[["$","li","1",{"children":["Gloves"," - $",20,["$...
```

要在演示应用中找到这段代码，请打开浏览器的开发者工具，切换到 Elements 标签页，并在页面底部查看 `<script>` 标签。你会看到这样的行：

```javascript
self.__next_f.push([1,"PAYLOAD_STRING_HERE"]).
```

上面的代码片段中的每一行都是一个单独的 RSC 负载。每行以一个数字或字母开头，后跟一个冒号，然后是一个数组，其中有时带有字母前缀。通常：

- **`HL` 负载** 是“提示”，链接到特定资源，如 CSS 和字体。
- **`I` 负载** 是“模块”，调用特定脚本。这是客户端组件如何被加载的方式。如果客户端组件是主包的一部分，它将被执行。如果不是（即懒加载），一个获取脚本被添加到主包中，当需要渲染时，该脚本将获取组件的 CSS 和 JavaScript 文件。当需要时，服务器的 `I` 负载会调用获取器脚本。
- **`"$"` 负载** 是为某个服务器组件生成的 DOM 定义，伴随着从服务器流式传输的静态 HTML。当挂起的组件准备好被渲染时，服务器生成其静态 HTML 和 RSC 负载，并将它们流式传输到浏览器。


## 流式传输

流式传输允许我们从服务器逐步渲染 UI。通过 RSCs，每个组件都能够获取其自己的数据。一些组件是完全静态的，可以立即发送给客户端，而其他组件在加载前需要更多工作。基于此，Next.js 将这些工作分成多个块，并在它们准备好时将它们流式传输到浏览器。因此，当用户访问一个页面时，服务器调用所有服务器组件，生成页面的初始 HTML（即页面外壳），用它们的后备内容替换“挂起”的组件内容，并通过一个或多个块将所有这些内容流式传输回客户端。

服务器返回了一个 `Transfer-Encoding: chunked` 头部，让浏览器知道要期待流式 HTML。这为浏览器接收文档的多个块并在接收时渲染它们做好了准备。我们实际上可以在打开开发者工具的网络标签页时看到该头部。刷新并点击文档请求。

![img](https://fs.lwmc.net/uploads/2024/06/1718438458695-202406151600298.webp)

我们还可以使用 `curl` 命令在终端中调试 Next.js 发送块的方式：

```bash
curl -D - --raw localhost:3000 > chunked-response.txt
```

![img](https://fs.lwmc.net/uploads/2024/06/1718438469489-202406151601443.webp)

你可能看出了规律。对于每个块，服务器在发送块的内容前会响应该块的大小。从输出中我们可以看到，服务器通过 16 个不同的块传输了整个页面。最后，服务器发送回一个大小为零的块，表示流的结束。

第一个块以 `<!DOCTYPE html>` 声明开始。倒数第二个块包含结束的 `</body>` 和 `</html>` 标签。因此，我们可以看到服务器从上到下流式传输整个文档，然后暂停等待挂起的组件，最后，在结束时关闭 body 和 HTML，然后停止流式传输。

即使服务器还没有完全完成文档的传输，浏览器的容错特性也允许它绘制并调用当前已有的内容，无需等待关闭的 `</body>` 和 `</html>` 标签。

### 挂起的组件

我们从渲染生命周期中学到，当访问一个页面时，Next.js 匹配该页面的 RSC 组件，并请求 React 以 HTML 渲染其子树。当 React 遇到一个挂起的组件（即异步函数组件）时，它会从 `<Suspense>` 组件（或如果是 Next.js 路径，则从 `loading.js` 文件）获取其回退值，代替渲染该值，然后继续加载其他组件。与此同时，RSC 在后台调用异步组件，随着加载的完成，稍后将其流式传输。

此时，Next.js 已经返回了一个包含组件本身（以静态 HTML 渲染）或其回退值（如果它们被挂起）的完整静态 HTML 页面。它将静态 HTML 和 RSC 负载通过一个或多个块流式传回浏览器。

![img|38](https://fs.lwmc.net/uploads//1718438350792-202406151559291.webp)

随着挂起的组件完成加载，React 递归地生成 HTML，同时寻找其他嵌套的 `<Suspense>` 边界，生成其 RSC 负载，然后让 Next.js 将 HTML 和 RSC 负载作为新的块流式传回浏览器。当浏览器接收到新的块时，它具有所需的 HTML 和 RSC 负载，并准备好用新流式传输的 HTML 替换 DOM 中的回退元素。依此类推。

![img](https://files.smashing.media/articles/forensics-react-server-components/8-suspended-components-html.jpeg)

在图 7 和图 8 中，注意到 fallback 元素有一个独特的 ID，形式为 `B:0`、`B:1` 等等，而实际组件有一个类似的 ID，形式也是类似的：`S:0` 和 `S:1` 等等。

除了包含 Suspense 组件 HTML 的第一块数据外，服务器还会发送一个 `$RC` 函数（即来自 [React 的源代码](https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/server/fizz-instruction-set/ReactDOMFizzInstructionSetShared.js#L46) 的 `completeBoundary`），该函数知道如何在 DOM 中找到 `B:0` fallback 元素，并用它从服务器收到的 `S:0` 模板替换它。这就是让我们在浏览器中看到组件内容时使用的“替换器”函数。

整个页面最终会一块一块地完成加载。

### 组件懒加载

如果一个 Suspense 的服务器组件包含一个懒加载的客户端组件，Next.js 也会发送一个包含如何获取和加载懒加载组件代码指令的 RSC 负载块。这代表了一个_显著的性能改进_，因为页面加载不会因为 JavaScript 而拖延，而 JavaScript 在那个会话期间甚至可能还没有加载。

![img](https://fs.lwmc.net/uploads/2024/06/1718438353046-202406151559716.webp)

在我写这篇文章的时候，Next.js 中在服务器组件中懒加载客户端组件的动态方法并不像您期望的那样工作。要有效地懒加载一个客户端组件，将其放在一个使用 `dynamic` 方法本身来懒加载实际客户端组件的 [“包装器” 客户端组件](https://github.com/nikolovlazar/rsc-forensics/blob/main/src/components/addToCartWrapper.js) 中。这个包装器将被转换成一个脚本，用于在需要时获取并加载客户端组件的 JavaScript 和 CSS 文件。

### 要点总结

我知道这似乎有很多事情在不同时刻旋转和移动。然而，归根结底，页面访问会触发 Next.js 渲染尽可能多的 HTML，使用任何 Suspense 组件的后备值，然后将其发送到浏览器。与此同时，Next.js 触发挂起的异步组件，并将它们格式化为 HTML 并包含在一个个流式传输到浏览器的 RSC 负载中，连同一个知道如何交换事物的 `$RC` 脚本。

## 页面加载时间线

到目前为止，我们应该对 RSC 的工作方式、Next.js 如何处理它们的渲染以及所有部分如何组合在一起有了坚实的理解。在本节中，我们将重点了解在浏览器中访问 RSC 页面时到底发生了什么。

### 初始加载

正如我们在上面的要点总结部分提到的，访问页面时，Next.js 将渲染初始 HTML（减去挂起的组件）并将其作为第一批流式传输的块传输到浏览器。

为了看到页面加载期间发生的所有事情，我们将访问 Chrome DevTools 中的“性能”标签，并点击“重新加载”按钮以重新加载页面并捕获一个概况。这是它的样子：

![img](https://fs.lwmc.net/uploads/2024/06/1718438355964-202406151559129.webp)

当我们放大看最开始的时候，我们可以看到第一个“解析 HTML”跨度。那是服务器向浏览器流式传输文档的第一块数据。浏览器刚刚接收到了初始 HTML，其中包含页面外壳和一些资源链接，如字体、CSS 文件和 JavaScript。浏览器开始调用脚本。

![img](https://fs.lwmc.net/uploads/2024/06/1718438354547-202406151559160.webp)

一段时间后，我们开始看到页面的首帧出现，伴随着初始的 JavaScript 脚本被加载和水合作用的进行。如果你仔细观察帧，你会看到整个页面外壳被渲染，而被挂起的服务器组件的位置使用了“加载中”组件。你可能会注意到，这大约在 800ms 发生，而浏览器开始在 100ms 时获取第一个 HTML。在这 700ms 期间，浏览器持续从服务器接收数据块。

请记住，这是在本地开发模式下运行的 Next.js 演示应用程序，因此它会比在生产模式下运行时慢。