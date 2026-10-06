---
date: 2022-06-27
category:
- JavaScript
---
# axios、XHR、XML、AJAX和Fetch分不清怎么办？

由面试引出的问题：

> axios 是基于什么技术进行封装的？那xhr的全称是什么？还有哪些方法？还有什么发请求的库吗？

不可谓作死连环问~

## axios

axios 是一个轻量的HTTP**客户端**，它基于 `XMLHttpRequest` 服务（浏览器）来执行 HTTP 请求，支持丰富的配置，支持 `Promise`，支持浏览器端和 Node.js 端。在服务器端它使用本机 node.js `http`模块，而在客户端（浏览器）它使用 `XMLHttpRequests`。

### 特点

-   从浏览器发出`XMLHttpRequests`
-   从node.js发出`http`请求
-   支持Promise API
-   拦截请求和响应
-   转换请求和响应数据
-   取消请求
-   JSON数据的自动转换
-   客户端支持防止`XSRF`

> 引出问题，什么是XHR

## XHR (XMLHttpRequest)

`XMLHttpRequest`（XHR）对象用于与服务器交互。通过 `XMLHttpRequest` 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。`XMLHttpRequest` 在 AJAX 编程中被大量使用。

尽管名称如此，`XMLHttpRequest` 可以用于获取任何类型的数据，而不仅仅是 XML。它甚至支持 HTTP 以外的协议（包括 file:// 和 FTP），尽管可能受到更多出于安全等原因的限制。

> 深究一下，XML是什么？

## XML

可扩展标记语言（Extensible Markup Language，XML）是一种标记语言。XML是从标准通用标记语言（SGML）中简化修改出来的。它主要用到的有可扩展标记语言、可扩展样式语言（XSL）、XBRL和XPath等。

XML设计是用来传送和携带数据信息，不用于表现和展示数据，HTML则用来表现数据，**所以XML用途的焦点是在于说明数据是什么以及携带数据信息。** 但是 XML 及其扩展经常因冗长、复杂和冗余而受到批评。

JSON、YAML和S-Expressions经常被提出作为更简单的替代方案，它们专注于表示高度结构化的数据而不是文档，文档可能同时包含高度结构化和相对非结构化的内容。然而，与更简单的序列化格式相比，W3C 标准化的 XML 模式规范提供了更广泛的结构化XSD数据类型，并通过XML 命名空间提供了模块化和重用。

> 前文提到，AJAX是？

## AJAX (Asynchronous JavaScript And XML)

AJAX（Asynchronous JavaScript And XML，异步 JavaScript 和 XML）是一种使用 `XMLHttpRequest` 技术构建更复杂，动态的网页的**编程实践**。

AJAX 允许只更新一个 HTML 页面的部分 DOM，而无须重新加载整个页面。AJAX 还允许异步工作，这意味着当网页的一部分正试图重新加载时，您的代码可以继续运行（相比之下，同步会阻止代码继续运行，直到这部分的网页完成重新加载）。

通过交互式网站和现代 Web 标准，AJAX 正在逐渐被 JavaScript 框架中的函数和官方的 Fetch API 标准取代。

> 那么原生Fetch 是？

## 新秀 Fetch

Fetch 是一种新的用于获取资源的技术，是浏览器提供的原生 AJAX 接口。由于原来的`XMLHttpRequest`不符合关注分离原则，且基于事件的模型在处理异步上已经没有现代的`Promise`等那么有优势，因此Fetch出现来解决这种问题。

Fetch 使用起来很简单，它返回的是一个 `Promise`，即使你没有 XHR 的开发经验也能快速上手。在 Fetch 中有四个基本概念，他们分别是 Headers、Request 、Response 和 Body。在一个完整的 HTTP 请求中，其实就已经包含了这四个概念。

进一步学习前往 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

**fetch的优点：**

-   基于标准 Promise 实现，支持 async/await。
-   更加底层，提供的API丰富，易上手。
-   脱离了XHR，是ES规范里新的实现方式。

**fetch的缺点：**

-   fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
-   fetch默认不会带cookie，需要添加配置项。
-   fetch不支持abort，不支持超时控制。
-   fetch没有办法原生监测请求的进度，而XHR可以。
-   其他兼容性问题。

## 补充：其他用于发起请求的库

-   **[SuperAgent](https://visionmedia.github.io/superagent/)**
-   **[request](https://www.npmjs.com/package/request)**
-   **[Supertest](https://www.npmjs.com/package/supertest)**

## 快速总结

-   axios 是一个轻量的HTTP**客户端**，它基于 `XMLHttpRequest` 服务，支持丰富的配置，支持 `Promise`。

-   AJAX 不是新的编程语言，而是一种使用现有标准的**新方法（编程实践）** ，底层使用了宿主环境的（XHR）。

-   fetch不是对 AJAX 的进一步封装，而是原生JavaScript，没有使用`XMLHttpRequest`对象。Fetch API 提供了一个 JavaScript接口，用于访问和操纵HTTP管道部分。

-   XHR 是过去和现在很多网络请求方案、工具库的基础，可以用于获取任何类型的数据，而且不仅仅是 XML。
