>  原文：https://www.speedcurve.com/blog/INP-user-experience-correlation/
>
> 标题：Does Interaction to Next Paint actually correlate to user behavior?
>
> 作者：Cliff Crocker



![img](https://fs.lwmc.net/uploads/2023/12/1702492193072-202312140229426.webp)

今年早些时候，谷歌宣布 Interaction to Next Paint （INP） 不再是一个实验性指标。INP 将在 2024 年 3 月取代首次输入延迟 （FID） 成为核心 Web Vital。

现在 INP 已经取代了 FID 作为 [Core Web Vitals](https://support.speedcurve.com/docs/get-started-with-core-web-vitals) 中的响应能力指标，我们已经将目光转向了审查其有效性。在这篇文章中，我们将查看真实世界的数据并尝试回答：**INP 与实际用户行为和业务指标有什么相关性（如果有的话）？**

## Core Web Vitals 背景知识

自 2020 年 5 月启动 Core Web Vitals 计划以来，已经过去了三年多。在那段时间里，我们看到人们对前端 Web 性能的兴趣急剧增加，尤其是在 SEO 领域。拥有一组简单的三个指标（专注于加载、交互性和响应能力）非常有帮助，每个人都可以理解和关注这些指标。

在这段时间里，SpeedCurve 在对待 Vitals 指标时保持客观。当涉及到新的性能指标时，很容易随波逐流。虽然我们肯定会对新兴指标感到兴奋，但我们也以批判的眼光对待每个新指标。（例如，早在 2020 年 11 月，[我们仔细研究了核心 Web 指标之一，即首次输入延迟，](https://www.speedcurve.com/blog/first-input-delay-google-core-web-vitals/)发现在与实际用户行为有意义关联方面，它总体上有点“嗯.....”。

## 什么是 Interaction to Next Paint ？

INP 旨在衡量页面对用户交互的响应程度。这是根据用户交互后页面的视觉响应速度来衡量的（即，当你与页面交互后，页面在浏览器*的*下一帧中绘制某些内容时）。由于 INP 测量实际用户交互，因此只能使用[真实用户监控 （RUM） 工具进行监控](https://www.speedcurve.com/features/performance-monitoring/)。

就 INP 而言，交互被视为以下任何一种：

- Mouse click鼠标点击
- Touchscreen tap触摸屏点击
- Key press按键

INP 是使用 Event Timing API 测量的，Chrome、Edge、Firefox 和 Opera [都支持](https://caniuse.com/mdn-api_performanceeventtiming)该 API。

唉，Safari 不支持 INP。如果你像许多网站所有者一样，有大量访问者使用 Safari，请务必记住这一点。（Safari 用户目前约占[全球流量的 20%。](https://gs.statcounter.com/browser-market-share#monthly-202210-202310)在北美，Safari 用户几乎占所有流量的[三分之一](https://gs.statcounter.com/browser-market-share/all/north-america/#monthly-202210-202310)。

![Browser support for the EventTiming API](https://fs.lwmc.net/uploads/2023/12/1702923341118-202312190215039.webp)

## 什么是“好”的 INP 分数？

INP 是一个相对较新的指标，因此 Google 建议的阈值可能会发生变化。目前，这些阈值如下：

- **Good – 良好** – 低于 200 毫秒
- **Needs improvement** – **需要改进** – 200-500 毫秒之间
- **Poor** – **差** – 超过 500 毫秒

请注意，这些阈值均基于第 75 个百分位数的 RUM 数据。同样重要的是要注意，这些阈值适用于桌面和移动流量。（[在此处](https://www.speedcurve.com/blog/core-web-vitals-inp-mobile/)了解为什么这很重要。

![Illustration of recommended thresholds for Good (<200ms), Needs Improvement(200-500ms) and Poor(>500ms)](https://fs.lwmc.net/uploads/2023/12/1702923487586-202312190218583.webp)

## 什么会影响INP？

大多数用户交互将在页面最初加载后进行，因此请务必了解，测量通常是在大多数其他指标（即 FCP、LCP、负载等）发生后捕获的。通常，页面在这一点上似乎处于休眠状态，但情况并非总是如此。

可能影响 INP 的因素包括：

- 长时间运行的 JavaScript 事件处理程序
- 由于[长任务](https://www.speedcurve.com/blog/javascript-long-tasks/)阻塞主线程而导致输入延迟
- 性能不佳的 JavaScript 框架
- 页面复杂性导致呈现延迟

有关优化 INP 的一些想法，我在本文底部提供了一些很棒的资源。

## INP 与用户行为有何关联？

虽然了解 Next Paint 的交互很重要，但它真的与用户与你的网站的交互方式相关吗？这是我们应该问的最重要的问题。

我们很容易过于专注于改进指标（例如 Core Web Vitals），以至于失去了大局观。为最终用户创造愉快的体验是网络性能的核心。

### 使用相关图表根据业务指标跟踪绩效

理解 INP 等指标如何与用户保持一致的一种方法是将其与转化率等结果关联起来。

[相关性图表](https://support.speedcurve.com/docs/create-correlation-charts)为你提供所有用户流量的直方图视图，并根据性能指标（例如 INP）分为群组。该图表还包括一个叠加层，显示与每个群组相关的用户参与度指标或业务指标（例如跳出率或转化率）。这让你可以一目了然地了解性能、用户参与度和你的业务之间的关系。

以下示例展示了 INP 如何与四个不同电子商务网站的转化率相关。蓝色条代表访问队列，按 INP 持续时间细分。红线显示了这些群体的转化率。

### 观察点 1：结果因站点而异

毫不奇怪，我们看到影响因转换线的斜率以及 INP 在用户会话中的分布而异。

### 观察点 2：随着 INP 变得更糟，转化率往往会受到影响

与下一次绘制的交互与转化之间总体呈负相关。这告诉我们，是的，当涉及到用户感知的性能时，INP 似乎是一个有意义的指标。

###  观察点 3：与Google的阈值没有一致的相关性

与谷歌的“良好”、“需要改进”和“差”的阈值没有一致的相关性。例如，对于一个网站，当 INP 为 100 毫秒时，转化率会受到影响，而这完全在 Google 低于 200 毫秒的“良好”参数范围内。这并不意味着拥有一组通用阈值不是一个好主意。这只是意味着这些阈值可能不适用于你的网站。你需要查看自己的数据来确认。

## 在 SpeedCurve 中测量 INP


我们在 SpeedCurve 中展示你的 Vitals 的任何地方都添加了 INP，包括主页、Vitals、性​​能和 JavaScript 仪表板。

![INP summary, histogram and time series from the SpeedCurve Vitals dashboard.](https://fs.lwmc.net/uploads/2023/12/1702924015631-202312190226454.webp)

在 SpeedCurve 中[创建你自己的相关性图表](https://support.speedcurve.com/docs/create-correlation-charts)非常简单。你可以立即创建将交互与下一次绘制与跳出率相关联的图表。如果你想将 INP 与转化率关联起来，你还可以[添加你自己的转化数据](https://support.speedcurve.com/docs/customer-data)。无论哪种方式，你都会了解改进 INP 如何帮助你的业务。

## Resources

- [INP解释器](https://web.dev/inp/)
- [Optimizing INP](https://web.dev/optimize-inp/)
- [Adding INP to Favorites in SpeedCurve](https://support.speedcurve.com/docs/add-interaction-to-next-paint-inp-to-your-core-web-vitals-dashboard) 
- [Modern Frameworks and INP现代框架和 INP](https://developer.chrome.com/blog/inp-in-frameworks/)
- [Core Web Vitals Changelog 核心 Web Vitals 变更日志](https://chromium.googlesource.com/chromium/src/+/master/docs/speed/metrics_changelog/README.md)
