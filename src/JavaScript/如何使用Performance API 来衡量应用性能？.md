---
date: 2022-11-02
category:
- JavaScript
---

# 如何使用Performance API 来衡量应用性能？

从历史上看，我们对客户端性能监控方式非常有限，而且还遇到了API浏览器的限制，阻碍了我们准确地衡量客户端性能。

幸运的是，由于有了新的面向性能的api，这种情况正在开始改变。现在，浏览器的Performance API给我们提供了精确度量Web页面性能的工具。

> 不耐烦看的同学可以直接调到末尾**使用方法一览**

## 使用 Performance API 的好处

- 这些api增加了在开发工具中使用性能分析时的经验；
- Chrome开发工具和其他工具，如Lighthouse只在开发阶段有帮助。但是使用Performance API，我们可以在生产中获得真实的用户度量数据(RUM - real user measurement)；
- 我们可以得到非常精确的时间戳数据，这使得这些性能指标的分析非常准确。

> Performance 接口可以获取到当前页面中与性能相关的信息。它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、Navigation Timing API、 User Timing API 和 Resource Timing API。
><p align=right> —— MDN </p>

### High resolution time

高分辨率时间的精确程度可达几分之一毫秒。相比之下，基于Date的时间只能精确到毫秒。这种精确度使它成为精确测量时间的理想工具。

由User-Agent (UA)测量的高分辨率时间不会随着系统时间的任何更改而更改，因为它是从UA创建的全局时钟中获取的。

在Performance API中测量的每个测量值都是高分辨率时间。这就是为什么你总是听到性能API是高分辨率时间API的一部分。

### Performance timeline API

Performance timeline API 是Performance API的扩展。该扩展提供了基于特定筛选条件检索性能指标的接口。

Performance Timeline API提供了以下三个方法，包含在性能接口中:

-   `getEntries()`
-   `getEntriesByName()`
-   `getEntriesByType()`

每个方法返回从Performance API的所有其他扩展收集的`entries`列表。

`PerformanceObserver` 是API中包含的另一个接口。它主要用于观察性能时间轴（Performance Timeline），并在浏览器记录时通知新的性能条目。它可以用来度量浏览器和 Node.js 应用程序中某些性能指标。

### Performance entries

我们用Performance API度量的东西称为`entries`。以下是可供我们使用的性能项:

-   `mark`
-   `measure`
-   `navigation`
-   `resource`
-   `paint`
-   `frame`

使用这些条目和各自的API来度量性能。

## 使用 Navigation timing API 和 Resource timing API测量

navigation timing API 和 resource timing API 有许多内容重叠，你可以阅读[此文章](https://www.w3.org/TR/navigation-timing-2/#processing-model)详细了解他们之间的差异。

获取方法：
```js
// Navigation Timing entries:
const navigationEntries = performance.getEntriesByType("navigation")[0];

// 内容
{
  "name": "https://awebsite.com",
  "entryType": "navigation",
  "startTime": 0,
  "duration": 7816.495000151917,
  "initiatorType": "navigation",
  "nextHopProtocol": "",
  "workerStart": 9.504999965429306,
  "redirectStart": 0,
  "redirectEnd": 0,
  "fetchStart": 39.72000000067055,
  "domainLookupStart": 39.72000000067055,
  "domainLookupEnd": 39.72000000067055,
  "connectStart": 39.72000000067055,
  "connectEnd": 39.72000000067055,
  "secureConnectionStart": 0,
  "requestStart": 39.72000000067055,
  "responseStart": 6608.200000133365,
  "responseEnd": 6640.834999969229,
  "transferSize": 0,
  "encodedBodySize": 0,
  "decodedBodySize": 0,
  "serverTiming": [],
  "unloadEventStart": 0,
  "unloadEventEnd": 0,
  "domInteractive": 6812.060000142083,
  "domContentLoadedEventStart": 6812.115000095218,
  "domContentLoadedEventEnd": 6813.680000137538,
  "domComplete": 7727.995000081137,
  "loadEventStart": 7760.385000146925,
  "loadEventEnd": 7816.495000151917,
  "type": "navigate",
  "redirectCount": 0
}
```

```js
// Resource Timing entries
const resourceListEntries = performance.getEntriesByType("resource");
```

这将返回一个资源计时对象数组。单个对象看起来是这样的，可用于获取某一Web资源的前后表现信息:

```js
{
  "name": "https://awebsite.com/images/image.png",
  "entryType": "resource",
  "startTime": 237.85999999381602,
  "duration": 11.274999938905239,
  "initiatorType": "img",
  "nextHopProtocol": "h2",
  "workerStart": 0,
  "redirectStart": 0,
  "redirectEnd": 0,
  "fetchStart": 237.85999999381602,
  "domainLookupStart": 237.85999999381602,
  "domainLookupEnd": 237.85999999381602,
  "connectStart": 237.85999999381602,
  "connectEnd": 237.85999999381602,
  "secureConnectionStart": 0,
  "requestStart": 243.38999995961785,
  "responseStart": 244.40500000491738,
  "responseEnd": 249.13499993272126,
  "transferSize": 0,
  "encodedBodySize": 29009,
  "decodedBodySize": 29009,
  "serverTiming": []
}
```

### 使用场景一览
```js
// DNS解析
const dnsTime = navigationEntries.domainLookupEnd - navigationEntries.domainLookupStart;

// 响应 + 响应时间
const totalTime = navigationEntries.responseEnd - navigationEntries.requestStart;

// 缓存查找响应时间
const fetchTime = navigationEntries.responseEnd - navigationEntries.fetchStart;

// 使用Service worker响应时间
let workerTime = 0;
if (navigationEntries.workerStart > 0) {
workerTime = navigationEntries.responseEnd - navigationEntries.workerStart;
}

// 收到第一个字节
const ttfb = navigationEntries.responseStart - navigationEntries.requestStart;

// 重定向时间
const redirectTime = navigationEntries.redirectEnd - navigationEntries.redirectStart;

// 测量HTTP报头大小
const headerSize = navigationEntries.transferSize - navigationEntries.encodedBodySize;

// 测量资源加载时间
resourceListEntries.forEach(resource => {
  if (resource.initiatorType == 'img') {
    console.info(`Time taken to load ${resource.name}: `, resource.responseEnd - resource.startTime);
  }
});

// 获取单个资源指标
const impResourceTime = performance.getEntriesByName("https://awebsite.com/imp-resource.png");
```

## 补充：[直接使用 `performance.timing` 计算](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/timing)

**警告：** 该属性在 Navigation Timing Level 2 specification 中已经被废弃，请使用 PerformanceNavigationTiming 替代。虽然一些浏览器仍然支持它，但也许正准备移除或出于兼容性而保留。

```js
const timingInfo = window.performance.timing;
// DNS解析，DNS查询耗时
timingInfo.domainLookupEnd - timingInfo.domainLookupStart;

// TCP连接耗时
timingInfo.connectEnd - timingInfo.connectStart;

// 获得首字节耗费时间，也叫TTFB
timingInfo.responseStart - timingInfo.navigationStart;

// domReady时间(与DomContentLoad事件对应)
timingInfo.domContentLoadedEventStart - timingInfo.navigationStart;

// DOM资源下载
timingInfo.responseEnd - timingInfo.responseStart;

// 准备新页面时间耗时
timingInfo.fetchStart - timingInfo.navigationStart;

// 重定向耗时
timingInfo.redirectEnd - timingInfo.redirectStart;

// Appcache 耗时
timingInfo.domainLookupStart - timingInfo.fetchStart;

// unload 前文档耗时
timingInfo.unloadEventEnd - timingInfo.unloadEventStart;

// request请求耗时
timingInfo.responseEnd - timingInfo.requestStart;

// 请求完毕至DOM加载
timingInfo.domInteractive - timingInfo.responseEnd;

// 解释dom树耗时
timingInfo.domComplete - timingInfo.domInteractive;

// 从开始至load总耗时
timingInfo.loadEventEnd - timingInfo.navigationStart;

// 白屏时间
timingInfo.responseStart - timingInfo.fetchStart;

// 首屏时间
timingInfo.domComplete - timingInfo.fetchStart;
```

> 参考：
>
> [Using the Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Using_the_Performance_API)
>
> [How to practically use Performance API to measure performance](https://blog.logrocket.com/how-to-practically-use-performance-api-to-measure-performance/)
>
> [Performance.timing](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/timing)
