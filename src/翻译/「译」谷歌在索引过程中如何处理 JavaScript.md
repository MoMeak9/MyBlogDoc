> 原文：https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process
> 
> 原标题：How Google handles JavaScript throughout the indexing process
>
> 作者：Giacomo Zecchini 等

> MERJ 和 Vercel 的研究通过经验证据揭开了 Google 渲染的神秘面纱。

了解搜索引擎如何抓取、呈现和索引网页对于优化搜索引擎的网站至关重要。多年来，随着 Google 等搜索引擎改变其流程，很难跟踪哪些有效，哪些无效，尤其是对于客户端 JavaScript。

我们注意到，一些旧的理念仍然存在，并使社区对应用程序SEO的最佳实践不确定。

1. “Google 无法呈现客户端 JavaScript。”
2. “Google 以不同的方式对待 JavaScript 页面。”
3. “渲染队列和时间对 SEO 有重大影响。”
4. “大量使用 JavaScript 的网站的页面发现速度较慢。”

为了解决这些理念，我们与领先的 SEO 和数据工程咨询公司 [MERJ](https://merj.com/) 合作，对 Google 的抓取行为进行了新的实验。我们分析了各个网站上超过 100,000 次 Googlebot 抓取，以测试和验证 Google 的 SEO 功能。

## Google 渲染能力的演变

多年来，Google 抓取和索引网络内容的能力发生了重大变化。看到这种演变对于了解现代 Web 应用程序的 SEO 的当前状态非常重要。

### 2009 年之前：有限的 JavaScript 支持

在搜索的早期，Google 主要索引静态 HTML 内容。JavaScript 生成的内容对搜索引擎来说基本上是不可见的，导致静态 HTML 被广泛用于 SEO 目的。

### 2009–2015：AJAX 爬虫方案

Google 引入了 AJAX 抓取方案，允许网站提供动态生成内容的 HTML 快照。这是一种权宜之计，要求开发人员创建其页面的单独、可抓取版本。

### 2015–2018：早期 JavaScript 渲染

谷歌开始使用无头Chrome浏览器渲染页面，这标志着向前迈出了重要的一步。但是，这个较旧的浏览器版本在处理现代 JS 功能方面仍然存在限制。

### 2018 年至今：现代渲染功能

如今，Google 使用最新版本的 Chrome 进行渲染，与最新的 Web 技术保持同步。当前系统的关键方面包括：

1. **通用渲染：**Google 现在尝试呈现所有 HTML 页面，而不仅仅是一个子集。
2. **最新的浏览器：**Googlebot 使用最新的稳定版 Chrome/Chromium，支持现代 JS 功能。
3. **无状态渲染：**每个页面呈现都在新的浏览器会话中进行，而不保留先前呈现的 cookie 或状态。Google 通常不会点击页面上的项目，[例如选项卡式内容](https://merj.com/blog/12-experiments-for-tabbed-content-seo)或 Cookie 横幅。
4. **伪装**：谷歌禁止向用户和搜索引擎展示不同的内容以操纵排名。避免使用 `User-Agent` 更改内容的代码。相反，应针对 Google 优化应用的无状态呈现，并通过有状态方法实现个性化。
5. **资产缓存：**Google 通过缓存资产来加快网页呈现速度，这对于共享资源的页面和同一页面的重复呈现非常有用。Google 的 Web Rendering Service 不使用 HTTP `Cache-Control` 标头，而是[采用自己的内部启发式方法来](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics#caching)确定缓存资产何时仍是最新的，以及何时需要再次下载。

![Today, Google's indexing process looks something like this.](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F1hIDIxDIvmIV0mdeNSojg2%2F672ae68da3daf2f33256504bf9501d8c%2Fgoogles-indexing-processing.png&w=1920&q=75&dpl=dpl_FqM12o1rSuCWyUTu3kWkHjvZGGWn)

在更好地了解谷歌的能力之后，让我们来看看一些常见的方法论以及它们如何影响SEO。

## 方法论

为了调查以下误区，我们使用 Vercel 的基础设施和 MERJ 的 Web 渲染监视器 （WRM） 技术进行了一项研究。我们的研究主要针对 [`nextjs.org`](http://nextjs.org/)，补充数据来自 [`monogram.io`](http://monogram.io/) 和 [`basement.io`](http://basement.io/)，时间跨度为 2024 年 4 月 1 日至 4 月 30 日。

### 数据采集

我们在这些网站上放置了一个定制[的边缘中间件](https://vercel.com/docs/functions/edge-middleware)，以拦截和分析来自搜索引擎机器人的请求。这个中间件使我们能够：

1. 识别和跟踪来自各种搜索引擎和 AI 爬虫的请求。（此查询中未包含任何用户数据。
2. 在机器人的 HTML 响应中注入[轻量级 JavaScript 库](https://github.com/merj/wrm-research-vercel)。

JavaScript 库在页面完成呈现时触发，将数据发送回长时间运行的服务器，包括：

- 页面 URL。
- 唯一请求标识符（用于将页面呈现与常规服务器访问日志进行匹配）。
- 渲染完成的时间戳（这是使用服务器上的 JavaScript 库请求接收时间计算得出的）。

### 数据分析

通过将服务器访问日志中存在的初始请求与从我们的中间件发送到外部信标服务器的数据进行比较，我们可以：

- 确认搜索引擎已成功呈现哪些页面。
- 计算初始爬网和完成渲染之间的时间差。
- 分析如何处理不同类型的内容和 URL 的模式。

### 数据范围

在本文中，我们主要关注来自 Googlebot 的数据，它提供了最大、最可靠的数据集。我们的分析包括超过 37,000 个与服务器信标对匹配的渲染 HTML 页面，为我们提供了一个强大的样本来得出结论。

我们仍在收集有关其他搜索引擎的数据，包括 OpenAI 和 Anthropic 等 AI 提供商，并希望将来更多地谈论我们的发现。

在接下来的章节中，我们将深入探讨每个误区，并在必要时提供更相关的方法。

##  误区 1：“Google 无法呈现 JavaScript 内容”

这个误区导致许多开发人员避免使用 JS 框架或求助于 SEO 的复杂解决方法。

### 测试

为了测试 Google 呈现 JavaScript 内容的能力，我们重点关注了三个关键方面：

1. **JS框架兼容性：**我们使用 `nextjs.org` 的数据分析了 Googlebot 与Next.js的交互， 混合使用了静态预渲染、服务器端渲染和客户端渲染。
2. **动态内容索引**：我们检查`nextjs.org` 上通过 API 调用异步加载内容的页面。这使我们能够确定 Googlebot 是否可以处理和索引初始 HTML 响应中不存在的内容。
3. **通过 React 服务器组件 （RSC） 流式传输内容：**与上述类似，`nextjs.org` 的大部分内容都是使用 [Next.js App Router](https://nextjs.org/docs/app) 和 [RSC](https://vercel.com/blog/understanding-react-server-components?nxtPslug=understanding-react-server-components) 构建的。我们可以看到 Googlebot 如何处理内容并将其编入索引，这些内容会逐步流式传输到网页上。
4. **渲染成功率**：我们将服务器日志中的 Googlebot 请求数量与收到的成功渲染信标数量进行了比较。这使我们能够深入了解完全呈现的抓取页面的百分比。

### 我们的发现

1. 在 `nextjs.org` 上分析的超过 100,000 个 Googlebot 抓取中（不包括状态代码错误和不可索引的网页），**100% 的 HTML 网页进行了整页呈现，包括具有复杂 JS 交互的网页。**
2. 通过 API 调用异步加载的所有内容均已成功编入索引，这表明 Googlebot 能够处理动态加载的内容。
3. Next.js 是一个基于 React 的框架，由 Googlebot 完全渲染，确认了与现代 JavaScript 框架的兼容性。
4. 通过 RSC 的流媒体内容也完全呈现，确认[流媒体不会对 SEO 产生不利影响](https://vercel.com/guides/does-streaming-affect-seo)。
5. Google 尝试呈现它抓取的几乎所有 HTML 页面，而不仅仅是 JavaScript 密集页面的一个子集。

## 误区 2：“Google 以不同的方式对待 JavaScript 页面”

一个常见的误解是，谷歌对大量使用JavaScript的页面有一个单独的流程或标准。我们的研究，结合[谷歌的官方声明](https://www.youtube.com/watch?v=XBT_DUzUbOI)，揭穿了这个谣言。

### 测试

为了测试 Google 在哪些方面以不同的方式处理 JS 密集型页面，我们采取了几种有针对性的方法：

1. **CSS** **`@import`** **测试：** 我们创建了一个*没有* JavaScript 的测试页面，但*其中包含*一个`@imports`第二个 CSS 文件的 CSS 文件（只有在渲染第一个 CSS 文件时才会下载并显示在服务器日志中）。通过将此行为与启用了 JS 的分页进行比较，我们可以验证 Google 的渲染器在启用 JS 和未启用 JS 的情况下处理 CSS 的方式是否有所不同。
2. **状态代码和元标记处理：**我们开发了一个带有中间件的Next.js应用程序，用于与 Google 一起测试各种 HTTP 状态代码。我们的分析重点是 Google 如何处理具有不同状态代码（200、304、3xx、4xx、5xx）和带有 `noindex` 元标记的页面。这有助于我们理解在这些场景中是否会以不同的方式处理大量 JavaScript 的页面。
3. **JavaScript 复杂性分析**：我们比较了 Google 在 [nextjs.org](http://nextjs.org/) 上不同程度的 JS 复杂度跨页面的渲染行为。这包括具有最小 JS 的页面、具有中等交互性的页面以及具有大量客户端渲染的高度动态的页面。我们还计算并比较了初始抓取和完成渲染之间的时间，以查看更复杂的 JS 是否会导致更长的渲染队列或处理时间。

### 我们的发现

1. 我们的 CSS `@import`测试证实，无论有没有 JS，Google 都能成功呈现页面。
2. 无论 JS 内容如何，Google 都会呈现*所有* 200 状态 HTML 页面。具有 304 状态的页面使用原始 200 状态页面的内容呈现。不会呈现包含其他 3xx、4xx 和 5xx 错误的页面。
3. 无论 JS 内容如何，初始 HTML 响应中带有 `noindex` 元标记的页面都不会呈现。**客户端删除** **`noindex`** **标签** **对于 SEO 目的*****无效\***;如果页面在初始 HTML 响应中包含 `noindex` 标签，则不会呈现该标签，并且不会执行删除该标签的 JavaScript。
4. 我们发现 Google 在渲染具有不同 JS 复杂程度的页面方面的成功率没有显着差异。在 `nextjs.org` 的规模下，我们还发现 JavaScript 复杂性和渲染延迟之间没有相关性。但是，在更大的站点上更复杂的 JS [可能会影响抓取效率](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget)。

## 误区 3：“渲染队列和时间对 SEO 有重大影响

许多 SEO 从业者认为，由于渲染队列，大量使用 JavaScript 的页面在索引方面面临严重的延迟。我们的研究为这一过程提供了更清晰的视角。

### 测试

为了解决渲染队列和时间对 SEO 的影响，我们调查了：

1. **渲染延迟：**我们研究了 Google 首次抓取页面和完成呈现之间的时间差，使用了 `nextjs.org` 上超过 37,000 对匹配的服务器信标对的数据。
2. **URL 类型：**我们分析了带查询字符串和不带查询字符串的 URL 的渲染时间，以及 `nextjs.org` 的不同部分（例如 `/docs`、`/learn`、`/showcase`）。
3. **频率模式：**我们研究了 Google 重新呈现页面的频率，以及不同类型内容的呈现频率是否存在模式。

### 我们的发现

渲染延迟分布如下：

- 第 50 个百分位数（中位数）：10 秒。
- 第 75 个百分位数：26 秒
- 第 90 个百分位数：~3 小时
- 第 95 个百分位数：~6 小时
- 第 99 个百分位数：~18 小时

![The exact rendering delay distribution we found across over 37,000 matched server-beacon pairs.](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F3FOTu0jm94k7GHzNi54qaO%2Fc24c6c57d49f43b629d2b04f92d9b5d0%2Frendering-data-timeline-light.png&w=1920&q=75&dpl=dpl_FqM12o1rSuCWyUTu3kWkHjvZGGWn)

令人惊讶的是，第 25 个百分位数的页面在初次抓取后的 4 秒内呈现，这挑战了长“队列”的概念。

虽然有些页面面临严重的延迟（在第 99 个百分位长达 ~18 小时），但这些都是例外，而不是规则。

我们还观察到与 Google 呈现带有查询字符串的 URL 的速度相关的有趣模式 （？param=xyz）：

| **URL Type**                  | **50th Percentile** | **75th Percentile** | **90th Percentile** |
| ----------------------------- | ------------------- | ------------------- | ------------------- |
| **All URLs**                  | 10 seconds          | 26 seconds          | ~3 hours            |
| **URLs without Query String** | 10 seconds          | 22 seconds          | ~2.5 hours          |
| **URLs with Query String**    | 13 seconds          | 31 minutes          | ~8.5 hours          |

这些数据表明，如果 URL 具有不影响内容的查询字符串，Google 会以不同的方式对待 URL。例如，在 `nextjs.org` 上，具有 `?ref=` 参数的网页的呈现延迟时间更长，尤其是在较高的百分位数上。

此外，我们注意到，与更静态的部分相比，经常更新的部分（如 `/docs`）的中位数渲染时间更短。例如，尽管 `/showcase` 页面经常被链接，但呈现时间更长，这表明 Google 可能会减慢对没有显着变化的页面的重新呈现速度。

### 误区 4：“JavaScript 密集型网站的页面发现速度较慢”

SEO 社区的一个坚持信念是，大量使用 JavaScript 的网站，尤其是那些依赖客户端渲染 （CSR） 的网站，如单页应用程序 （SPA），会受到 Google 页面发现速度较慢的影响。我们的研究在这里提供了新的见解。

### 测试

1. **分析了不同渲染场景下的链接发现：**我们比较了 Google 在 [nextjs.org](http://nextjs.org/) 上发现和抓取服务器呈现、静态生成和客户端呈现的网页中链接的速度。
2. **已测试的未呈现的 JavaScript 有效负载：**我们在 [nextjs.org](http://nextjs.org/) 的 `/showcase` 页面添加了一个类似于 React 服务器组件 （RSC） 有效负载的 JSON 对象，其中包含指向以前未被发现的新页面的链接。这使我们能够测试 Google 是否可以在 JavaScript 数据中发现未呈现的链接。
3. **比较发现时间：**我们监控了 Google 发现并抓取以不同方式链接的新网页的速度：标准 HTML 链接、客户端呈现内容中的链接以及未呈现的 JavaScript 负载中的链接。

### 我们发现

1. 无论采用何种呈现方法，Google 都能成功发现并抓取完全呈现网页中的链接。
2. Google 可以在网页上未呈现的 JavaScript 有效负载中发现链接，例如 React 服务器组件或类似结构中的链接。
3. 在初始 HTML 和呈现的 HTML 中，Google 都会通过识别看起来像 URL 的字符串来处理内容，并使用当前主机和端口作为相对 URL 的基础。（*Google 在我们的类似* RSC 的负载中没有发现编码的 URL（即 `https%3A%2F%2Fwebsite.com`），这表明其链接解析非常严格。
4. 链接的来源和格式（例如，在`<a>`或嵌入在 JSON 有效负载中）不会影响 Google 确定抓取的优先级。无论在初始抓取过程中找到 URL 还是在呈现后找到 URL，抓取优先级都保持一致。
5. 虽然 Google 成功地发现了 CSR 页面中的链接，但确实需要首先呈现这些页面。服务器呈现的页面或部分预呈现的页面在立即发现链接方面略有优势。
6. Google 区分了链接发现和链接价值评估。对链接对网站架构和抓取优先级的价值的评估发生在整页呈现之后。
7. 拥有更新`sitemap.xml`可以显著减少（如果不能消除）不同渲染模式之间的发现时间差异。

## A. 总体影响和建议

我们的研究揭穿了关于谷歌处理大量JavaScript网站的几个常见误区。以下是关键要点和可操作的建议：

### 影响

1. JavaScript 兼容性：Google 可以有效地呈现和索引 JavaScript 内容，包括复杂的 SPA、动态加载的内容和流式传输内容。
2. **呈现奇偶校验：**与静态 HTML 页面相比，Google 处理大量 JavaScript 页面的方式没有根本区别。所有页面都会呈现。
3. **渲染队列现实：**虽然存在渲染队列，但其影响不如以前想象的那么重要。大多数页面在几分钟内呈现，而不是几天或几周。
4. **页面发现：**以 JavaScript 为主的网站，包括 SPA，在 Google 的页面发现方面并非天生就处于劣势。
5. **内容时间：**当某些元素（如`noindex`标签）被添加到页面中时是至关重要的，因为Google可能不会处理客户端的更改。
6. **链接价值评估：**Google 区分了链接发现和链接价值评估。后者发生在整页呈现之后。
7. **渲染优先级：**Google 的渲染过程并不是严格意义上的先进先出。内容新鲜度和更新频率等因素对优先级的影响比 JavaScript 的复杂性更大。
8. **渲染性能和抓取预算：**虽然 Google 可以有效地渲染 JS 密集的页面，但与静态 HTML 相比，该过程对你和 Google 来说都更加耗费资源。对于大型网站（10,000+ 个独特且经常更改的页面），这可能会[影响网站的抓取预算](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget)。优化应用程序性能并最小化不必要的 JS 有助于加快渲染过程，提高抓取效率，并可能允许抓取、呈现和索引更多页面。

## 建议

1. **拥抱 JavaScript：**自由利用 JavaScript 框架来增强用户和开发者的体验，但要优先考虑性能并遵守 [Google 关于延迟加载的最佳做法](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading)。
2. **错误处理：**在 React 应用程序中实现[错误边界](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)，以防止由于单个组件错误而导致的渲染失败。
3. **关键的SEO元素。**对关键 SEO 标签和重要内容使用服务器端渲染或静态生成，以确保它们存在于初始 HTML 响应中。
4. **资源管理：**确保[用于渲染的关键资源](https://merj.com/blog/managing-webpages-resources-for-efficient-crawling-and-rendering)（API、JavaScript 文件、CSS 文件）未被`robots.txt`阻止。
5. **内容更新：**对于需要快速重新编制索引的内容，请确保更改反映在服务器呈现的 HTML 中，而不仅仅是在客户端 JavaScript 中。考虑采用[增量静态再生](https://vercel.com/docs/incremental-static-regeneration#differences-between-isr-and-cache-control-headers)等策略，以平衡内容新鲜度与 SEO 和性能。
6. **内部链接和URL结构：**创建一个清晰、合乎逻辑的内部链接结构。将重要的导航链接实现为真实的 HTML 锚标记 （`<a href="...">`） 而不是基于 JavaScript 的导航。这种方法有助于提高用户导航和搜索引擎抓取效率，同时有可能减少渲染延迟。
7. **站点地图：**[使用并定期更新站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)。对于大型网站或经常更新的网站，你可以在 XML 站点地图中使用该`<lastmod>`代码来指导 Google 的抓取和索引编制过程。请记住，仅在发生重大内容更新时才`<lastmod>`更新 。
8. **监测：**使用 Google Search Console 的[网址检查工具](https://support.google.com/webmasters/answer/9012289?hl=en)或[富媒体搜索结果工具](https://search.google.com/test/rich-results)来验证 Googlebot 如何查看你的网页。监控抓取统计信息，确保你选择的呈现策略不会导致意外问题。

## 利用新信息向前迈进

正如我们所探讨的，当涉及到 Google 的能力时，[渲染策略](https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app)之间存在一些差异：

| **Feature**                                                  | **Static Site Generation (SSG)** | **Incremental Static Regeneration (ISR)** | **Server-Side Rendering (SSR)** | **Client-Side Rendering (CSR)**                            |
| ------------------------------------------------------------ | -------------------------------- | ----------------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| **抓取效率：** Google 访问、呈现和检索网页的速度和效率如何。 | Excellent                        | Excellent                                 | Very Good                       | Poor                                                       |
| **发现：**查找要抓取的新网址的过程。*                        | Excellent                        | Excellent                                 | Excellent                       | Average                                                    |
| **渲染完整性（错误、失败等）：**Google 如何准确、完整地加载和处理你的网页而不会出错。 | Robust                           | Robust                                    | Robust                          | Might fail**                                               |
| **渲染时间：**Google 完全呈现和处理网页需要多长时间。        | Excellent                        | Excellent                                 | Excellent                       | Poor                                                       |
| **链路结构评估：**Google 如何评估链接以了解网站架构和页面的重要性。 | After rendering                  | After rendering                           | After rendering                 | After rendering, links might be missing if rendering fails |
| **索引：**Google 存储和整理你网站内容的过程。                | Robust                           | Robust                                    | Robust                          | Might not be indexed if rendering fails                    |

-  * 拥有更新`sitemap.xml`可以显著减少（如果不能消除）不同渲染模式之间的发现时间差异。
- ** 正如我们的研究所证明的那样，在 Google 中呈现通常不会失败;当它出现时，通常是由于`robots.txt`或特定边缘情况下的资源被阻塞。

这些细微的差异是存在的，但无论呈现策略如何，谷歌都会迅速发现你的网站并将其编入索引。专注于创建高性能的 Web 应用程序，这些应用程序使用户受益更多，而不是担心 Google 渲染过程的特殊便利。

毕竟，**页面速度仍然是一个排名因素，**因为 Google 的页面体验排名系统会根据 Google [的 Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) 指标评估你网站的性能。

此外，页面速度与良好的用户体验息息相关——每节省 100 毫秒的加载时间[，网站转化率就会上升 8%。](https://www2.deloitte.com/content/dam/Deloitte/ie/Documents/Consulting/Milliseconds_Make_Millions_report.pdf)从你的页面上跳出的用户较少意味着 Google 将其视为更相关。高性能化合物;毫秒很重要。

## 更多资源

- [**Core Web Vitals 如何影响你的 SEO**](https://vercel.com/blog/how-core-web-vitals-affect-seo-giuMUCEQOZjD5Q1z65gix)**：**全面概述了 Core Web Vitals （CWV） 如何影响 SEO，解释了 Google 的页面体验排名系统以及字段数据（用于排名）和实验室数据（Lighthouse 分数）之间的区别。
- [**如何选择正确的渲染策略**](https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app)**：**指导开发者为Web应用选择最优渲染策略，讲解SSG、ISR、SSR、CSR等各种方法及其使用案例，以及使用Next.js实现注意事项。

- [**前端云的用户体验**](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud-43fi9hfOeVbRkJN0nZiik7?__vercel_draft=1)**：**解释 Vercel 的前端云如何通过结合高级缓存策略、边缘网络功能和灵活的渲染选项来实现快速、个性化的 Web 体验，以优化用户体验和开发人员生产力。
