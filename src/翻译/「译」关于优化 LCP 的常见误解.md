> 原文：https://web.dev/blog/common-misconceptions-lcp
> 
> 原标题：Common misconceptions about how to optimize LCP
>
> 作者：Brendan Kenny

页面的最大内容绘制（Largest Contentful Paint，LCP）可能很复杂，难以改进，通常涉及多个变动因素和权衡。这篇文章查看了来自网络上真实页面加载的现场数据，以确定开发人员应该将优化工作重点放在哪里。

## 经典 LCP 建议：缩减图片大小！

对于网络上的大多数页面来说，最大内容绘制（Largest Contentful Paint，LCP）元素是一幅图像。那么，很自然地会认为改善 LCP 的最佳方法是优化你的 LCP 图像。

在 LCP（最大内容绘制）推出以来的五年左右时间里，这通常是头条建议。确保你的图像大小合适且压缩充分，并且在可能的情况下使用 21 世纪的图像格式。Lighthouse 甚至有三个不同的审核来提出这些建议。

![The three image-optimization audits in a Lighthouse report](https://fs.lwmc.net/uploads/2024/09/1727665651801-202409301107731.webp)

之所以如此常见建议，原因之一在于：过多的字节数易于测量，而图像压缩工具容易推荐使用。根据您的构建和部署流水线，实现起来可能也很简单。

如果有，就去执行吧！向用户发送的字节数很少会带来优势。网络上有*许多*网站仍在提供不必要的大图片，即使进行基本压缩就可以解决问题。

然而，当我们开始查看 Chrome 中用户的现场性能数据，了解 LCP 时间通常都花在哪些地方时，我们发现图片下载时间几乎从未成为瓶颈。

相反，LCP 的其他部分是一个大得多的问题。

## LCP 子部分细分

为了了解改进 LCP 的最大机会领域，我们查看了 LCP 子部分的数据，如[优化 LCP](https://web.dev/articles/optimize-lcp?hl=zh-cn) 中所述。

虽然每个网页和每个框架都可能会采用不同的方法来加载和显示将成为网页 LCP 元素的内容，但每个网页都可以分为以下子部分：

![LCP 明细，显示四个子部分](https://fs.lwmc.net/uploads/2024/09/1727665729037-202409301108682.webp)

[引用该文章](https://web.dev/articles/optimize-lcp?hl=zh-cn#lcp-breakdown:~:text=following sub-parts:-,Time to First Byte (TTFB),the LCP resource finishes loading and the LCP element rendering fully.,-Every page's LCP)中的各子部分如下：

- 首字节时间 (TTFB)

  从用户开始加载网页到浏览器加载网页之间的时间 接收 HTML 文档响应的第一个字节。

- 资源加载延迟

  从 TTFB 到浏览器开始加载 LCP 资源所用的时间。如果 LCP 元素不需要加载资源即可渲染，现为 `0`。

- 资源加载时长

  加载 LCP 资源本身所用的时长。如果 LCP 元素不需要加载资源即可渲染，时间为 `0`。

- 元素渲染延迟

  从 LCP 资源完成加载到 LCP 元素完成加载之间的时间 才能完全呈现

## 真实的导航性能数据

![一个条形图，直观显示每个 LCP 子部分所花费的时间差异，分为“良好”“需要改进”和“较差”的 LCP 存储分区。TTFB 和加载延迟时间在持续时间上快速增加，而加载持续时间和渲染延迟时间仍然很短。下表中重现了数据](https://fs.lwmc.net/uploads/2024/09/1727665863646-202409301111263.webp)

| LCP 分级 | TTFB（毫秒） | 图片加载延迟（毫秒） | 图片加载时长（毫秒） | 渲染延迟（毫秒） |
| :------- | :----------- | :------------------- | :------------------- | :--------------- |
| 良好     | 600          | 350                  | 160                  | 230              |
| 需要改进 | 1,360,000    | 720                  | 270                  | 310              |
| 差       | 2,270,000    | 1290                 | 350                  | 360              |

在这篇博文中，我们使用了 Chrome 中带有子资源图片 LCP 的网页导航数据来查看 LCP 子部分。[我们以前了解过此类数据](https://youtu.be/fWoI9DXmpdk?t=561)，但从未通过实测数据来了解真实用户在等待网页 LCP 时将时间花在了何处。

> Google 开发者专家 Estela Franco 在 2023 年 11 月的 performance.now() 会议上[抢先了解了此实测数据](https://perfnow.nl/2023#estela)。

[与 Core Web Vitals 一样，对于 CrUX 数据集中每个来源的每个 LCP 子部分，我们选取了第 75 个百分位 (p75)](https://web.dev/articles/defining-core-web-vitals-thresholds?hl=zh-cn#choice_of_percentile)，从而得出 p75 值的 4 次分布（每个子部分各一个）。为了总结这些分布情况，我们针对四个 LCP 子部分分别取了所有源中这些值的中位数。

最后，我们根据源[是“良好”“需要改进”还是“较差”将源分成多个存储分区第 75 百分位的 LCP](https://web.dev/articles/lcp?hl=zh-cn#what-is-a-good-lcp-score)。这有助于显示 LCP 良好与 LCP 不良的来源有何区别。

## 要缩减 LCP 图片的大小吗？这次有数据

加载时长用于衡量提取 LCP 资源（在本例中为图片）所需的时间。该时间通常与映像中的字节数成正比，因此所有减少该字节数的性能建议都是如此。

从前面的图表中时间趋势来看，有一点也值得注意，那就是图片加载时长没有花费很多时间。事实上，在所有 LCP 分桶中，它是最短的 LCP 子部分。与 LCP 性能良好的源相比，LCP 性能不佳的来源的加载时长更长，但这并不是耗费大量时间的因素。

**大多数 LCP 表现不佳的来源在下载 LCP 映像时所花的时间都不到其 p75 LCP 时间的 10%。**

是的，你应确保对图片进行优化，但这只是改进 LCP 的一个环节。从这些数据可以看出，对于网络上的典型来源，无论压缩方案有多复杂，LCP 整体上的潜在毫秒增益都很小。

> 请注意，LCP 的实测数据包括到网页的所有类型的导航，包括 LCP 资源已存在于浏览器缓存中的导航。这可以降低这些数字，但是用每个源站的 p75 加载时长过滤掉了很多这种情况（在访问您的网站的 75% 的导航中，虽然有 75% 的导航已在缓存中保存了 LCP 图片，但这种情况不太可能发生）。

最后令人惊讶的是，加载速度过慢通常是在移动设备上和移动网络的质量造成的。我们可能曾以为，普通手机要像使用有线连接的桌面设备一样要多次下载同一张图片。数据显示，情况不再如此。**对于 LCP 较低的来源，P75 图片在移动设备上的加载时间中位数仅比桌面设备慢 20%。**

## 首字节时间 (TTFB)

对于发出网络请求的导航，TTFB 始终需要一些时间。执行 DNS 查找和启动连接需要花费一些时间。物理问题无与伦比：一项请求必须通过电线和光缆在现实世界中穿行才能到达服务器，然后响应必须返回该服务器。即使是具有良好 LCP 的中位数来源，在第 75 个百分位的 TTFB 上花费的时间也超过 0.5 秒。

然而，良好 LCP 源与不良 LCP 源之间的 TTFB 差异表明了改进空间。**对于至少一半的 LCP 较差的来源来说，\*仅\* 2,270 毫秒的 p75 TTFB 几乎可以保证 p75 LCP 不会比 2.5 秒的“良好”快阈值。**即便是该时间的适度缩短百分比，也意味着 LCP 会得到显著提升。

你可能无法通过物理验证，但可以做到这一点。例如，如果您的用户经常与您的服务器位于不同的位置，那么 CDN 可以使您的内容更靠近他们。

如需了解详情，请参阅[优化 TTFB 指南](https://web.dev/articles/optimize-ttfb?hl=zh-cn)。

## 资源加载延迟，被忽视的缓慢最大内容绘制（LCP）罪魁祸首。

如果首次字节时间（TTFB）可以得到改善，并且任何改善都受到物理条件的限制，那么资源加载延迟就有可能被消除，实际上，它仅受服务架构的限制。

此子部分测量从 HTML 响应的第一个字节到达（TTFB）到浏览器开始请求最大内容绘制（LCP）图像之间的时间。多年来，我们一直关注下载最大内容绘制图像需要多长时间，但我们经常忽略在浏览器被告知开始下载之前浪费的时间。

**具有较差最大内容绘制（LCP）的中等网站在等待开始下载 LCP 图像上花费的时间几乎是实际下载它的四倍**，在首字节时间（TTFB）和图像请求之间等待 1.3 秒。这在单个子部分中就消耗了 2.5 秒 LCP 预算的一半以上。

依赖链是导致加载延迟时间长的常见原因。在较简单的情况中，一个页面加载样式表，在浏览器进行布局后，设置一个背景图像，该图像最终将成为最大内容绘制（LCP）。在浏览器知道开始下载 LCP 图像之前，所有这些步骤都必须发生。

使用 HTTP Archive 公开抓取数据，其中记录了“发起者”从 HTML 文档到 LCP 图片的网络请求链，您可以看到请求链长度与 LCP 速度较慢之间有明确的关联。

<img src="https://fs.lwmc.net/uploads/2024/09/1727666484641-202409301121003.webp" alt="直观呈现从属请求链与 LCP 之间的关系的图表。LCP 中间值从 2,150 毫秒（包含 0 个依赖请求）上升到 2,540 毫秒（有 1 个依赖请求）到 2,850 毫秒（有 2 个依赖请求）" style="zoom:50%;" />

关键是要尽快让浏览器知道 LCP 是什么，这样浏览器就能开始加载，即使在页面布局中有可用位置之前也是如此。您可以使用一些工具完成此操作，例如在 HTML 中使用经典的 `<img>` 标记（这样[预加载扫描器可以快速找到它](https://web.dev/articles/preload-scanner?hl=zh-cn)并开始下载），或者使用 `<link rel="preload">` 标记（或 HTTP 标头）来标记不属于 `<img>` 的图片。

帮助浏览器确定要优先处理的资源也很重要。如果您的网页在网页加载期间发出了很多请求，这一点尤为重要，因为浏览器通常只有在其中许多资源都已加载且布局已加载完毕之后才会知道 LCP 元素是什么。使用 [`fetchpriority="high"` 属性](https://web.dev/articles/fetch-priority?hl=zh-cn#fetchpriority-attribute)为可能的 LCP 元素添加注解（并确保避免使用 `loading="lazy"`），可让浏览器明确知道应立即开始加载资源。

阅读[有关优化加载延迟的更多建议](https://web.dev/articles/optimize-lcp?hl=zh-cn#1_eliminate_resource_load_delay)。

## 渲染延迟

呈现延迟时间用于衡量从浏览器加载并准备就绪 LCP 图片开始的时间，但出于某种原因，图片在屏幕上显示时会有延迟。有时，这是一个耗时较长的任务，在图片准备就绪时阻塞主线程，而在其他情况下，这可能是显示隐藏元素的界面选择。

对于网络上的典型来源，呈现延迟似乎并不大，但在优化期间，有时您可以*创建*渲染延迟，让之前在其他子部分花费的时间占到。例如，如果网页开始预加载 LCP 图片以便快速加载，则不会再有很长的加载延迟，但如果网页本身尚未准备好显示图片（例如，如果网页本身尚未准备好显示图片（例如，从会阻止内容呈现的大型样式表或客户端渲染应用中必须加载完所有 JavaScript 才能显示），则 LCP 会比它应该变慢，而且等待时间也会显示为呈现延迟。正因如此，在 LCP 方面，服务器端呈现或静态 HTML 通常具有优势。

如果您自己的内容受到影响，请参阅[有关优化渲染延迟的更多建议](https://web.dev/articles/optimize-lcp?hl=zh-cn#2_eliminate_element_render_delay)。

## 请检查所有这些子部分

很明显，要有效优化 LCP，开发者需要全面关注网页加载情况，而不仅仅是专注于优化图片。请每时每刻检查一次 LCP，因为目前改进的空间可能要大得多。

为了在字段中收集此类数据，[web-vitals 库的归因 build](https://github.com/GoogleChrome/web-vitals#attribution-build) 中会包含 LCP 子部分的计时。[Chrome 用户体验报告 (CrUX)](https://developer.chrome.com/docs/crux?hl=zh-cn) 尚未包含所有数据，但包含 TTFB 和 LCP 条目，因此是一个开始。我们希望将来在 CrUX 中包含这篇博文使用的数据，敬请关注更多相关新闻。

如需在本地测试 LCP 子部分，请尝试使用[网页指标扩展程序](https://web.dev/articles/optimize-lcp?hl=zh-cn#monitor_lcp_breakdowns_using_the_web_vitals_extension)或[本文中的 JavaScript 代码段](https://web.dev/articles/optimize-lcp?hl=zh-cn#monitor_lcp_breakdown_in_javascript)。Lighthouse [还在其“Largest Contentful Paint 元素”中添加了细分。审核](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint?hl=zh-cn#how_to_improve_your_lcp_score)。您可以在开发者工具性能面板中查看更多 LCP 子部分建议（[即将推出](https://developer.chrome.com/blog/perf-tooling-2024?hl=zh-cn#the_power_of_lighthouse_in_the_performance_panel)）。

****

![1_1025715938_2007_94_3_919650622_3897f447572b21673da004dd8d953ad7.png](https://fs.lwmc.net/uploads/2024/09/1727680148451-202409301509055.webp)

> [前端妙妙屋 - 分享知识](https://minntaki.com/)