---
date: 2023-05-27
category:
  - 前端
  - 浏览器
theme: vuepress
highlight: atom-one-dark
---
# Chrome浏览器插件（扩展）- Manifest V3 插件开发规范简介

随着互联网的快速发展，浏览器插件成为了许多用户提升浏览器功能和个性化体验的重要工具。Chrome浏览器作为全球最受欢迎的浏览器之一，其插件生态系统也日益壮大。为了保证插件的安全性和性能，Chrome团队推出了Manifest V3，这是一种新的插件开发规范。

> A step in the direction of security, privacy, and performance.
>
> 向安全性、隐私性和性能方向迈出了一步。

Manifest V3是Chrome浏览器插件开发的一种新的规范和架构。它旨在提供更高的安全性、更好的性能和更好的隐私保护。Manifest V3引入了一些新的概念和功能，以帮助开发者更好地构建和管理插件。

扩展清单（Extension Manifest）向浏览器提供有关扩展功能和它使用的文件的信息。可供扩展使用的功能由当前清单版本定义。Manifest V3引入了扩展安全性、隐私性和性能的增强，并允许扩展使用开放Web技术，如service worker和promises。

> Chrome 应用商店不再接受新的Manifest V2 插件（扩展）
>
> -   2022年1月，Chrome网上应用商店停止接受新的Manifest V2扩展程序，并将原有的V2其可见性设置为“公开”或“未列出”。同时，将Manifest V2扩展从“私人”更改为“公共”或“未列出”的功能已删除。
> -   2022年6月，Chrome网上应用商店停止接受新的Manifest V2扩展，并将原有的V2扩展可见性设置为“私人”。

## 功能摘要

使用Manifest V3的扩展有许多新特性和功能更改：

-   Service workers 替换 background pages.
-   使用新的declarativeNetRequest API 进行网络请求修改
-   不再允许远程载入的代码，扩展只能执行包含在其包中的JavaScript
-   Promise支持已经被添加到许多方法中，尽管回调仍然被支持作为替代方案（Chrome 最终将支持所有合适的方法上的Promise能力）
-   Manifest V3中还引入了许多其他相对较小的特性变化

## 主要特点

### Service workers

Manifest V3将后台页面（background pages）替换为Service Worker。

与其网页对应物一样，扩展 Service Workers 侦听并响应事件，以增强用户的体验。对于Web Service Worker，这通常意味着管理缓存，预加载资源和启用离线Web页面。虽然扩展 Service Worker 仍然可以完成所有这些工作，但扩展程序包已经包含了一组可以离线访问的资源。因此，扩展 Service Worker 倾向于专注于响应由扩展API公开的浏览器事件。

### 修改网络请求

扩展程序修改网络请求的方式在Manifest V3中发生了变化。有一个新的`declarativeNetRequest API`[chrome.declarativeNetRequest - Chrome Developers](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/)，它可以让扩展程序以保护隐私和高性能的方式修改和阻止网络请求。这个API的本质是：

-   扩展程序不再拦截并以程序化方式修改请求，而是请求Chrome代表其评估和修改请求。
-   扩展程序声明一组规则：用于匹配请求的模式和匹配时执行的操作。然后浏览器根据这些规则修改网络请求。 采用这种声明性方法大大减少了持久主机权限的需求。

> 某些扩展程序可能仍然需要广泛的主机权限来满足特定的用例（例如重定向请求）。有关详细信息，请参阅条件权限和declarativeNetRequest。

webRequest API 在Manifest V3中仅限于强制安装的扩展程序。这是由于阻止web请求方法存在的问题：

-   隐私

    需要过多地访问用户数据，因为扩展程序需要读取用户发出的每个网络请求。

<!---->

-   性能

    在多个进程切换和C++/JS边界之间进行数据的序列化和反序列化会导致下降。

-   兼容性

    与基于事件的后台执行不兼容，因为它需要Service Worke在处理每个请求时运行。

这意味着开发人员可以实现许多常见的用例，例如内容阻止，而无需任何主机权限。

### 托管远程代码

Manifest V3 中的一个关键安全改进是扩展无法加载 JavaScript 或 Wasm 文件等远程代码。这使扩展程序提交到 Chrome 网上应用店时更可靠、更高效地检查扩展程序的安全行为。具体来说，所有逻辑都必须包含在扩展包中。

官方建议使用远程配置文件，而不是远程代码。请参阅[迁移指南](https://developer.chrome.com/docs/extensions/migrating/improve-security#remotely-hosted-code)以获取更多信息。

### Promise

Manifest V3 为 Promise 提供一流的支持。现在许多流行的 API 支持 Promise，Chrome最终决定将支持所有适当方法的 Promise。还支持Promise链、异步和等待。某些 API 功能（例如事件侦听器）仍然需要回调。

为了向后兼容，许多方法在添加 Promise 支持后继续支持回调。请注意，不能在同一个函数调用中同时使用两者。如果传递回调，该函数将不会返回 Promise，如果希望返回 Promise，则不要传递回调。

有关使用 Promise 的信息，请参阅[MDN 上的 Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)。有关将回调转换为 Promise 以及在扩展中使用它们的信息，请参阅[文章](https://developer.chrome.com/docs/extensions/mv3/promises#compare-to-callback)。

## 结语

Manifest V3也引发了一些争议。一些开发者担心Manifest V3的新权限模型和事件页模型会限制插件的功能和灵活性。他们担心这可能会影响到已有的插件，并给开发者带来额外的工作量。此外，一些开发者还担心Manifest V3的改变可能导致插件生态系统的不稳定和插件的兼容性问题。

总之，Manifest V3是Chrome浏览器插件开发的一次重要改进。它引入了新的权限模型、事件页模型和消息传递机制，提供了更高的安全性、更好的性能和更好的隐私保护。然而，Manifest V3也引发了一些争议，开发者们对其功能和灵活性的限制表示担忧。无论如何，Manifest V3的推出将进一步推动Chrome浏览器插件生态系统的发展和创新（Chrome 可越来越像操作系统了）。

> **参考:**
>
> -   [Chrome Extensions Manifest V2 support timeline - Chrome Developers](https://developer.chrome.com/docs/extensions/migrating/mv2-sunset/)
> -   [Welcome to the Chrome Extension Manifest V3 - Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/intro/)
> -   [Chrome 扩展清单 V3 概述 - Chrome 开发者](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/#service-workers)
> -   [chrome.declarativeNetRequest - Chrome Developers --- chrome.declarativeNetRequest - Chrome Developers](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/)