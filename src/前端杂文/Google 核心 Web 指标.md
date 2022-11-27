---
date: 2022-10-22
category:
- 浏览器原理
---

# Google 核心 Web 指标（Core Web Vitals）及其他感官性能优化指标

### LCP (Largest Contentful Paint) 最大内容绘制

![image-20221022001805189](https://cdn.yihuiblog.top/images/202210220018236.png)

LCP(Largest Contentful Paint)翻译为最大内容绘制，用于记录首屏中最大元素渲染的时间，和 FCP 不同的是，FCP 更关注浏览器什么时候开始绘制内容，比如一个 loading 页面或者骨架屏，并没有实际价值，所以 LCP 相较于 FCP 更适合作为首屏指标。

其中，最大内容绘制考量的元素类型为：

- `<img>`元素
- 内嵌在`<svg>`元素内的`<image>`元素
- `<video>`元素（使用封面图像）
- 通过`url()`函数（而非使用CSS 渐变）加载的带有背景图像的元素
- 包含文本节点或其他行内级文本元素子元素的块级元素。

### FID (First Input Delay) 首次输入延迟


![image-20221022001828708](https://cdn.yihuiblog.top/images/202210220018757.png)

FID 测量从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。

一般来说，发生输入延迟（又称输入延时）是因为浏览器的主线程正忙着执行其他工作，所以（还）不能响应用户。可能导致这种情况发生的一种常见原因是浏览器正忙于解析和执行大型 JavaScript 文件。在此过程中，浏览器不能运行任何事件侦听器，因为正在加载的 JavaScript 可能会让浏览器去执行其他工作。


### CLS (Cumulative Layout Shift) 累积布局偏移

![image-20221022001847787](https://cdn.yihuiblog.top/images/202210220018826.png)

累积布局偏移 (CLS) 是测量视觉稳定性的一个以用户为中心的重要指标，因为该项指标有助于量化用户经历**意外布局偏移**的频率，较低的 CLS 有助于确保一个页面的交互是令人愉悦的。

> **布局偏移：**
>
> 每当一个可见元素的位置从一个已渲染帧变更到下一个已渲染帧时，就发生了布局偏移。



## 其他感官性能指标

### FP

`FP(First Paint)`翻译为首次绘制，表示浏览器第一次向屏幕传输像素的时间点，可以理解为浏览器首次开始绘制像素，页面首次在屏幕上发生了视觉变化 。听起来是不是很烦人？不过问题不大 你只要知道有这么个东西就行了，因为这个指标有虽然有但没啥子意义可言。

### FCP

`FCP(First Contentful Paint)`简单来说就是浏览器首次绘制屏幕内容的时间，包括(任何文本，图像，SVG等等)。这个指标就是我们常说的白屏时间

### FMP

`FMP(First Meaningful Paint)`首次进行有意义的绘制，这个指标反应就是主要内容出现在页面上要的时间，FMP的本质是一个主观认知的指标，一般提高一个算法来计算时间节点

### TTI

`TTI(Time to Interactive)`翻译为整体链接耗时，可交互时间，等到服务器通过HTTP协议将响应全部返回之后，便开始DOM Tree 的构建，完成之后，网页变成可交互状态，到此为止便是网页的可交互时间。用户可以进行正常的事件输入交互操作。

## 性能优化检测工具

1. [浏览器 DevTools](https://leeon.gitbooks.io/devtools/content/learn_basic/overview.html)
2. [LightHouse](https://developer.chrome.com/docs/lighthouse/overview/)
3. [Webpagetest](https://www.webpagetest.org/)

### Performance API

这个是HTML5新增的API。早期看见有些开发者在页面加载时，在`<head>`里面添加上一段获取时间戳的代码，然后在开始获取数据的时候在获取一次时间戳，相减来计算白屏时间。这其实是一种非常麻烦的做法，并不友好。因此W3C后面推出了Performance这个API来帮助开发者查看这些性能时间点。
更多内容可以看我的另一篇文章，待更新......

> **参考：**
>
> [机械大猛子 - Web性能优化](https://www.yuque.com/u21926970/lg2gvi/ods5ss#ZV1jm)
>
> [Google Web 指标](https://web.dev/i18n/zh/vitals/)
