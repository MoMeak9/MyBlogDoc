> category:
>   - 前端
>   - JavaScript
>   - 外文翻译

# Islands Architecture 孤岛（岛屿）架构

> 原文：https://www.patterns.dev/vanilla/islands-architecture
>
> 标题：Import On Interaction
>
> 作者：patterns.dev
>
> PS：文章来自最近很火的良心网站[Patterns.dev](https://www.patterns.dev/)，站点文章不单单教你写代码，更是教你学习设计模式等。

> tl;dr：孤岛架构鼓励在服务器渲染的网页中进行小而集中的交互。岛屿的输出是逐步增强的HTML，对增强发生的方式更加具体。与单个应用程序控制整个页面渲染不同，其存在多个入口点。这些交互的“岛屿”的脚本可以独立地传递和激活，允许页面的其余部分只是静态HTML。

加载和处理过多的 JavaScript 可能会影响性能。然而，即使在主要是静态网站中，一定程度的互动和 JavaScript 通常是必需的。我们已经讨论了静态渲染的各种变体，使你能够构建试图达到以下平衡的应用程序：

- 与客户端渲染（CSR）应用程序相当的互动性
- 与服务器端渲染（SSR）应用程序相当的 SEO 优势

SSR 的核心原则是在服务器端渲染 HTML，并附带必要的 JavaScript 在客户端重新激活它。重新激活是指在服务器端渲染后，在客户端重新生成 UI 组件状态的过程。由于重新激活会带来成本，因此每个 SSR 的变体都试图优化重新激活的过程。这主要通过对关键组件进行部分重新激活或在组件渲染时进行流式传输来实现。然而，以上技术最终传输的 JavaScript 净量保持不变。

“Islands” 架构这个术语是由 Katie Sylor-Miller 和 Jason Miller 推广，用来描述一种旨在通过“岛屿”式的互动来减少通过的 JavaScript 量的范式。岛屿是一种基于组件的架构，建议以静态和动态岛屿的方式对页面进行分隔的视图。页面的静态区域是纯非互动的 HTML，不需要重新激活。动态区域是 HTML 和脚本的组合，在渲染后能够重新激活自己。

![theislandsarch--avuxy9rrkk8](https://fs.lwmc.net/uploads/2023/11/1700573486733-202311212131657.webp)

让我们进一步探讨岛屿建筑的细节，以及目前可以实现它的不同选择。

### 动态组件岛屿

大多数页面都是静态和动态内容的组合。通常，页面由静态内容和可以被隔离的交互式区域组成。例如：

1. 博客文章、新闻文章和组织主页包含文本和图片，以及社交媒体嵌入和聊天等交互式组件。
2. 电子商务网站上的产品页面包含静态产品描述和指向应用程序其他页面的链接。页面的不同区域还包括图像轮播和搜索等交互式组件。
3. 典型的银行账户详情页面包含静态交易列表，并提供一些交互性的筛选功能。

静态内容是无状态的，不会触发事件，并且在呈现后不需要再次激活。呈现后，动态内容（按钮、筛选器、搜索栏）必须重新连接到其事件。DOM 必须在客户端重新生成（虚拟 DOM）。这种重新生成、激活和事件处理功能会导致发送到客户端的 JavaScript。

岛屿架构有助于服务器端呈现包含所有静态内容的页面。但在这种情况下，呈现的 HTML 将包含动态内容的占位符。动态内容的占位符包含独立的组件小部件。每个小部件类似于一个应用程序，结合了服务器端呈现的输出和用于在客户端激活应用程序的 JavaScript。

在渐进式激活中，页面的激活架构是自上而下的。页面控制着个别组件的调度和激活。在岛屿架构中，每个组件都有自己的激活脚本，可以异步执行，与页面上的任何其他脚本无关。一个组件中的性能问题不应影响其他组件。

![theislandsarch--99emuo8lgf](https://fs.lwmc.net/uploads/2023/11/1700573829135-202311212137810.webp)

## 实现岛屿

孤岛架构借鉴了不同来源的概念，旨在将它们最佳地结合起来。基于模板的静态站点生成器（例如 [Jekyll](https://jekyllrb.com/) 和 [Hugo](https://gohugo.io/)）支持将静态组件渲染到页面。大多数现代 JavaScript 框架还支持[同构渲染](https://en.wikipedia.org/wiki/Isomorphic_JavaScript)，它允许您使用相同的代码在服务器和客户端上渲染元素。

ason 的帖子建议使用 [`requestIdleCallback()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) 来实现组件水合的调度方法。组件级部分水合的静态同构渲染和调度可以构建到框架中以支持岛屿架构。因此，该框架应该

1. Support static rendering of pages on the server with zero JavaScript.  
    支持零 JavaScript 在服务器上静态渲染页面。
2. Support embed of independent dynamic components via placeholders in static content. Each dynamic component contains its scripts and can hydrate itself using requestIdleCallback() as soon as the main thread is free.  
    支持通过静态内容中的占位符嵌入独立的动态组件。每个动态组件都包含其脚本，并且一旦主线程空闲，就可以使用 requestIdleCallback() 来补充自身。
3. Allow isomorphic rendering of components on the server with hydration on the client to recognize the same component at both ends.  
    允许服务器上的组件同构渲染，并在客户端上进行水合作用，以识别两端的相同组件。

可以使用接下来讨论的开箱即用选项之一来实现此目的。


### Frameworks构架

1. **Marko**：[Marko](https://markojs.com/) 是由 eBay [开发](https://tech.ebayinc.com/engineering/the-future-of-marko/)和[维护](https://tech.ebayinc.com/engineering/ebay-launches-marko-5/)的开源框架，用于提高服务器渲染性能。它通过将流渲染与自动部分水合相结合来支持岛屿架构。 HTML 和其他静态资源一旦准备好就会立即传输到客户端。自动部分水合允许交互组件自行水合。 Hydration 代码仅[为交互式组件提供](https://medium.com/@mlrawlings/maybe-you-dont-need-that-spa-f2c659bc7fec)，它可以更改浏览器上的状态。它是同构的，Marko 编译器根据运行位置（客户端或服务器）生成优化的代码。
2. Astro：Astro 是一个静态网站构建器，可以从其他框架（如 React、Preact、Svelte、Vue 等）中构建的 UI 组件生成轻量级静态 HTML 页面。需要客户端 JavaScript 的组件会单独加载其依赖项。因此，它提供了内置的部分水合作用。Astro 还可以延迟加载组件，具体取决于它们何时变得可见。在下一节中，我们将包含一个使用 Astro 的示例实现。
3. Eleventy + Preact：Markus Oberlehner 演示了 Eleventy 的使用，Eleventy 是一种静态站点生成器，具有可以部分水合的同构 Preact 组件。它还支持懒惰补水。组件本身以声明方式控制组件的水化。交互式组件使用 WithHydration 包装器，以便在客户端上冻结它们。

请注意，Marko 和 Eleventy 早于 Jason 提供的 Islands 定义，但包含支持它所需的一些功能。然而，**Astro** 是基于定义构建的，并且本质上支持 Islands 架构。在下一节中，我们将演示如何使用 Astro 作为前面讨论的简单博客页面示例。

### 示例实现

以下是我们使用 Astro 实现的示例博客页面。页面 SamplePost 导入一个交互式组件 SocialButtons。此组件通过标记包含在 HTML 中的所需位置。

```html
---
// Component Imports
import { SocialButtons } from '../../components/SocialButtons.js';
---

<html lang="en">
 <head>
   <link rel="stylesheet" href="/blog.css" />
 </head>

 <body>
   <div class="layout">
     <article class="content">
       <section class="intro">
         <h1 class="title">Post title (static)</h1>
         <br/>
         <p>Post sub-title (static)</p>
       </section>
       <section class="intro">
           <p>This is the post content with images that is rendered by the server.</p>
           <Image src="https://source.unsplash.com/user/c_v_r/200x200" />
           <p>The next section contains the interactive social buttons component which includes its script.</p>
       </section>
       <section class="social">
           <div>
           <SocialButtons client:visible></SocialButtons>
           </div>
       </section>
     </article>
   </div>
 </body>
</html>

```

```jsx
import { useState } from "preact/hooks";

export function SocialButtons() {
  const [count, setCount] = useState(0);
  const add = () => setCount((i) => i + 1);
  const subtract = () => setCount((i) => i - 1);
  return (
    <>
      <div>{count} people liked this post</div>
      <div align="right">
        <Image src="/like.png" width="32" height="32" onclick={add}></img>
        <Image src="/unlike.png" width="32" height="32" onclick={subtract}></img>
      </div>
    </>
  );
}

```

`SocialButtons` 组件是一个 Preact 组件，其中包含其 HTML 和相应的事件处理程序。

该组件在运行时嵌入到页面中，并在客户端冻结，以便单击事件根据需要运行。

![](https://fs.lwmc.net/uploads/2023/11/1701088549064-202311272035043.webp)

Astro 允许 HTML、CSS 和脚本之间完全分离，并鼓励基于组件的设计。使用此框架可以轻松安装和开始构建网站。

## 优点和缺点

Islands 体系结构结合了来自不同渲染技术（如服务器端渲染、静态站点生成和部分冻结）的想法。实施岛屿的一些潜在好处如下。

1. **性能**：减少传送到客户端的 JavaScript 代码量。发送的代码仅包含交互式组件所需的脚本，这比为整个页面重新创建虚拟 DOM 并解除冻结页面上所有元素所需的脚本要少得多。JavaScript 的较小大小自动对应于更快的页面加载和交互时间 （TTI）。

> 将 Astro 与为 Next.js 和 Nuxt.js 创建的文档网站[进行比较](https://docs.astro.build/comparing-astro-vs-other-tools#nextjs-vs-astro)，发现 JavaScript 代码减少了 83%。[其他用户](https://divriots.com/blog/our-experience-with-astro/)也报告了 Astro 的性能改进。

![img](https://fs.lwmc.net/uploads/2023/11/1701142673968-202311281137354.webp)

*图片提供：*https://divriots.com/blog/our-experience-with-astro/

2. **搜索引擎优化：**由于所有静态内容都在服务器上呈现;页面对 SEO 友好。
3. **优先处理重要内容：**关键内容（尤其是博客、新闻文章和产品页面）几乎可以立即提供给用户。在使用关键内容逐渐可用后，通常需要交互性的辅助功能。
4. **可访问性：**使用标准静态 HTML 链接访问其他页面有助于提高网站的可访问性。
5. **基于组件：**该架构提供了基于组件的架构的所有优点，例如可重用性和可维护性。

尽管有这些优势，但这个概念仍处于起步阶段。有限的支持导致了一些缺点。

1. 开发人员实现 Islands 的唯一选择是使用为数不多的可用框架之一或自己开发架构。将现有站点迁移到 Astro 或 Marko 需要额外的工作。
2. 除了 Jason 最初的帖子之外，关于这个想法的讨论很少。
3. [新框架](https://github.com/bensmithett/tropical-utils/tree/main/packages/tropical-islands)声称支持 Islands 架构，因此很难判断上适合你的框架。
4. 该架构<u>不适合高度互动的页面</u>，如社交媒体应用程序，这可能需要数千个岛屿。

Islands 架构概念相对较新，但由于其性能优势，可能会加快速度。它强调了使用 SSR 来呈现静态内容，同时通过动态组件支持交互性，同时将对页面性能的影响降至最低。我们希望未来在这个领域看到更多的参与者，并有更广泛的实施选项可供选择。

### Further reading延伸阅读

- [Islands Architecture孤岛（岛屿）架构](https://jasonformat.com/islands-architecture/)
- [Is 0KB of JavaScript in your future
  你的未来是 0KB 的 JavaScript](https://dev.to/this-is-learning/is-0kb-of-javascript-in-your-future-48og)
- [Modernizing Etsy’s codebase with React
  使用 React 对 Etsy 的代码库进行现代化改造](https://changelog.com/jsparty/105)
