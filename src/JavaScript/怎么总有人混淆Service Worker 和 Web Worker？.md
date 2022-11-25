---
date: 2022-10-22
category:
- 前端
- JavaScript
---

# 怎么总有人混淆Service Worker 和 Web Worker？

Web技术日新月异，我们可以发现21世纪初和现在的网页之间的巨大差异。随着我们对性能提升的体验越好，浏览器或应用程序所需处理的多线程任务就越多。

## Service Worker 是如何工作的?

在Service Worker的帮助下，你的浏览器在后台工作，但令人惊讶的是，它不会将当前网页捆绑到后台任务中。Service Worker通常被安装到JavaScript 中，作为脚本在后台运行，并且在脱机时执行。它帮助浏览器处理缓存，并部署从缓存中检索到的合适函数。例如，加载离线博客改善用户体验。

Service Worker 基本上是用于充当代理服务器，位于web应用程序、浏览器和网络之间。它们的目的是创建有效的离线应用体验和拦截网络请求，并根据网络是否可用和更新来自服务器上的新资源而采取适当的操作。它们还被允许访问推送通知和后台同步API。

![image-20221022155138648](https://cdn.yihuiblog.top/images/202210221551702.png)

在概述了Service Worker之后，让我们来看看Web Worker及其工作方式。

## Web Worker 是如何工作的?

Web Worker 和 Service Worker 的工作流程完全不同，但类似的是，它们都有助于卸载复杂的任务，并帮助平稳地运行主线程。

Web Worker，也被称为“Dedicated Workers”（专用工作者），是在应用程序中用JavaScript进行的多线程操作。

Web Worker为Web内容在后台线程中运行脚本提供了一种简单的方法。Web Worker可以在不干扰用户界面的情况下执行任务。此外，它们可以使用`XMLHttpRequest`执行I/O（尽管`responseXML`和通道属性总是空的）。一旦创建，Worker就可以将消息发送到创建它的JavaScript代码（线程），方法是将`message`发送到代码指定的事件处理程序(反之亦然)。

![Diagram of web worker as separate to main thread, with postMessage as communication](https://cdn.yihuiblog.top/images/202210221558354.jpeg)

这使得Web Worker将它与主线程完全隔离开来。JavaScript中的`postMessage()`允许JavaScript应用程序用我们提供的值的副本在另一个作用域中触发事件，基本上是用结构化克隆算法完成的。

![image-20221022155321596](https://cdn.yihuiblog.top/images/202210221553655.png)

## 总结一下：

**Web Workers :**

- 主要用于运行沉重而复杂的脚本
- 可以安装在脚本中使用

```js
const webworker = new Worker(‘worker.js’);
```

**Service Workers :**

- 处理网络请求及其响应，更像一个代理。
- 主要用于在应用程序或网页中创建离线操作。
- Service Workers 必须注册才能使用它。

```js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js');
    });
}
```

> **参考：**
>
> [Web workers vs Service workers vs Worklets](https://bitsofco.de/web-workers-vs-service-workers-vs-worklets/)
>
> [What can service workers do that web workers cannot?](https://stackoverflow.com/questions/38632723/what-can-service-workers-do-that-web-workers-cannot)
>
> [深入分析Web worker, Service worker, Worklet](https://www.jianshu.com/p/e2cdc78ff47c)

