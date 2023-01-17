# 来了解一下 Island Architecture 孤岛架构 

> 原文标题：Island Architecture
>
> 原文：[Island Architecture | Maina Wycliffe Blog](https://mainawycliffe.dev/blog/island-architecture/)
>
> 作者：[Maina Wycliffe](https://github.com/mainawycliffe)

建立一个网站有不同的方法，其中之一便是多页应用程序(MPA)，它大约在十年前就过时了，现在又重新流行起来。MPA已经被Angular和React以及其他现代框架所普及的单页应用(SPA)方法所取代。

由于应用软件迭代趋势的运作方式，方法/工具很容易过时。这并不是因为它的效率低，而是因为开发人员不再使用它们来支持其他东西。这就是多页应用(MPA)所发生的事情，开发人员开始采用流行的Web框架，如Angular、React、Vue等。这导致了SPA使用的上升，因为框架变得越来越流行。

由于SPA的工作方式，导致我们发送到浏览器的 Javascript 数量增加了。也就是说，如果没有 React 来管理状态和渲染，你就不能有一个 React Web 应用程序。SPA 使用 Javascript 来呈现要在浏览器中显示的 HTML。在许多情况下，这是可取的，例如，在 Facebook 或 YouTube 等网络应用程序中，管理状态至关重要。但在其他情况下，这没有意义，例如博客、个人作品集等。

## SSR Server-Side Rendering 服务端渲染

当使用 Angular 或 React 等SPA框架时，服务器做的很少，所有的渲染都是在客户端完成的，也就是所谓的客户端渲染。要查看内容，你首先需要下载框架的运行态(JS需要支撑你的web应用程序)，还需要一个渲染内容的环境，也就是浏览器。

这有一些缺点，值得注意的是它在屏幕上显示一些东西的速度很慢，这对低端设备和较慢的网络状况和搜索引擎优化的影响更糟——机器人和爬虫通常无法渲染这些页面，也不能通过解析内容来获取显示结果。

我们有两个标准的解决方案来解决上述问题:服务器端渲染(SSR)和构建时渲染(SSG)。SSG 类似于 SSR，但在构建时，不需要在服务器上对每个请求进行渲染。SSG 通常用于内容不那么动态的网站。这两种解决方案的问题在于，它们不能解决 SPA 的问题，而是推迟它。

如果你想要拥有任何形式的交互性，比如打开和关闭网页应用上的导航栏，你就需要从SSG或SSR中为渲染的应用润色。这其实是引导你正在使用的框架的过程，从服务器传输状态，以便框架可以接管。这通常发生在绘制第一个内容之后（从服务器呈现服务器端呈现的 HTML 之后），但在 Web 应用中的交互性之前。

这意味着必须下载和解析框架所需的JS，并且用户必须等待所有这些事情发生后才能与您的Web应用程序进行交互。这意味着即使在我们不需要交互性的页面上，即“关于我们”页面、条款等等，仍然需要执行所有这些下载和解析操作，这有点没有必要。

## 岛屿 Islands

这就是孤岛架构（Islands Architecture）的用武之地了。想象一下：你可以使用纯 HTML 和 CSS 为所有静态内容创建 Web 应用程序，然后添加动态内容或交互区域（孤岛），这些区域可以使用框架来添加交互性，并且这些区域可以使用任何框架，运行态框架只有在使用到它的页面上才会被下载，而不是在网站的初始加载中。

Astro（[我的网站](https://mainawycliffe.dev/)是用Astro构建的）、Marko和最近的Qwik等Web框架都在实现这种架构方法。以Astro为例，Astro组件使用JSX的某些变体，但没有客户端状态，因此没有运行态。

## Astro 框架

Astro使用JS选择加入的概念，这意味着在默认情况下，不会生成Javascript，除非你主动告诉Astro需要包含这些Javascript。如下所示:

```html
<script>
  document.getElementById("menuToggle").addEventListener("click", () => {
    const collapsibleMenu = document.getElementById("collapsibleMenu");
    collapsibleMenu.classList.toggle("navbar-menu-show");
    collapsibleMenu.classList.toggle("navbar-menu-hidden");
  });
</script>
```

以上JS代码片段来切换移动菜单的打开和关闭

> Astro组件不能被 **hydrate**（注水），因为它们是HTML模板组件，任何 Javascript脚本都需要通过如上方法或通过 React、SolidJS 等框架包含其在内。


第二种选择是引入你使用的框架，例如React, Preact, Lit, slvelte, Vue等，来创建在你的web应用中添加交互区域(岛)的组件。

```jsx
// index.astro file
---
import ReactComponent from "./ReactComponent"

---

<ReactComponent />
```

你也可以控制必要部位的补水时间。这是通过指示Astro何时进行注水作用来完成的。例如，您可能希望一个岛在装载时或仅当它可见时才加水。有几个指令可以帮助您实现这一点，您可以[在这里](https://docs.astro.build/en/core-concepts/component-hydration/)了解更多。

```
// index.astro file
import ReactComponent from "./ReactComponent"

<ReactComponent client:visible />
```

## Marko 和 Qwik 框架

虽然我不是Marko或Qwik（社区新秀）的专家，但如果您有兴趣了解更多，我将在下面链接了其他资源。与Astro相比，Marko和Qwik将岛屿的概念更进一步。

Marko是一个MPA框架，它的Island架构更聪明一些，因为它会自动决定加载一个Island所需的JS，尽可能地延迟它，允许更高效的Island。这与Astro目前的方法不同，后者依赖于开发人员告诉Astro何时进行注水。Astro仍处于预发布阶段，也许未来这种情况会有所改变。

Marko相对于Astro的另一个关键优势是，Marko可以决定岛上有什么or岛上没有什么。这意味着仅显示静态内容的组件（如页脚、页眉等）不会成为孤岛，而表单和其他具有动态内容的丰富组件将成为可以水化的孤岛。

另一方面，Qwik将其带到组件级别，分解了注水的方式，以便仅在需要时进行注水。这是通过积极地将网站的JavaScript分解为多个块，设置全局事件侦听器并将兴趣点直接序列化为HTML来实现的。对于每个不同的用户交互，Qwik 拥有仅加载执行操作所需的代码所需的一切，仅此而已。


<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/100b174b5edd41be94d7b2df8eed7d91~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"  /></p>

作为回报，这将导致代码块更小，从而能够更快地加载、解析和加载用户需要的内容。这就是所谓的渐进式注水，这超出了本文的讨论范围，希望我能很快就此进行讨论。

## 总结

本文着眼于岛屿架构，它们存在的原因以及当前应用它们的框架。在接下来的系列文章中，我想更深入地研究上面提到的框架 —— Astro，Marko和Qwik，以及其他框架，如Svelte，Angular和React，以及它们在内部之间的区别。

## 参考来源

1.  [Why Progressive Hydration is Harder than You Think](https://www.builder.io/blog/why-progressive-hydration-is-harder-than-you-think?utm_source=twitter)
1.  [From Static to Interactive: Why Resumability is the Best Alternative to Hydration](https://www.builder.io/blog/from-static-to-interactive-why-resumability-is-the-best-alternative-to-hydration)
1.  [JavaScript vs. JavaScript. Fight!](https://dev.to/this-is-learning/javascript-vs-javascript-fight-53fa)
1.  [Why Efficient Hydration in JavaScript Frameworks is so Challenging](https://dev.to/this-is-learning/why-efficient-hydration-in-javascript-frameworks-is-so-challenging-1ca3)
1.  [Resumable JavaScript with Qwik](https://dev.to/this-is-learning/resumable-javascript-with-qwik-2i29)
1.  [Conquering JavaScript Hydration Event delegation is the key to not running over the component... Apr 15](https://dev.to/ryansolid/comment/1ni8p)
1.  [State of JavaScript 2021: Framework Reflections](https://dev.to/ryansolid/state-of-javascript-2021-framework-reflections-2i77)
1.  [A first look at Qwik - the HTML first framework WRITTEN BYMIŠKO HEVERY JULY 2, 2021](https://www.builder.io/blog/introducing-qwik-framework)

## 推荐扩展阅读（译者）

1. [Islands 架构原理和实践 - 掘金](https://juejin.cn/post/7155300194773860382)
2. [从 Islands Architecture 看前端有多卷 - 掘金](https://juejin.cn/post/7131767287979180040)
