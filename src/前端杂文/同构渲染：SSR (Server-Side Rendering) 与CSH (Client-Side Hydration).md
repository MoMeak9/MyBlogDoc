# 同构渲染：SSR (Server-Side Rendering) 与CSH (Client-Side Hydration)

## 什么是同构渲染？

同构（Isomorphic） JavaScript，通常称为通用（Universal）JavaScript，在服务器端和客户端均渲染。在这种呈现方法下，预渲染用于向搜索引擎或用户提供的内容。之后，JavaScript 所需的交互内容在客户端处理。

同构 JavaScript 意味着应用程序在服务器和客户端上使用类似的渲染引擎。这种呈现方法使开发人员更容易维护标记模板，从而简化了 Web 开发。

同构渲染意味着使用 Node.js 和 JavaScript，因为它们允许重用库，并使浏览 JavaScript 代码能够在 Node.js 环境中运行，而无需进行太多修改。Node.js 和 JavaScript 在编码生态系统中的这种互换性可以支持几种不同的同构框架，如React.js等。

实际上，简单来说就是一份代码，服务端先通过服务端渲染(server-side rendering，下称SSR)，生成HTML以及初始化数据，客户端拿到代码和初始化数据后，通过对HTML的dom进行patch和事件绑定来对dom进行客户端激活(client-side hydration，下称CSH)，这个整体的过程叫同构渲染。其实就是满足三个条件：

1. 同一份代码
2. SSR
3. CSR

## 单说SSR

“服务端渲染”一词在前端框架盛行之前并未被提及，但它确实存在。比如.php文件就直接支持用语法来渲染HTML，还包括java的JSP技术等。

## 与传统PHP，JSP渲染有什么不同？算得上是SSR吗？

既然同构渲染就是一份代码SSR加CSH，那么SSR部分本质上跟php，jsp也是一样，也就是模版引擎出来HTML字符串，但是同构要求能通过一份代码实现SSR，CSH，同时服务端需要提供一份初始化数据以便CSH，而且传统php，jsp不关注CSH过程。这三点就是与传统SSR的区别


## 同构方法的优点

同构处理的优点可以分为两个方面。

-   **功能方面** 

    -   代码在应用程序的前端和后端之间共享。
-   加载时间更快，并自动支持旧版浏览器。

-   **技术方面** 

    -   开发人员将需要学习更少的语言。
-   该库将能够与自身集成。
-   服务器在加载初始页面时呈现 HTML。
-   数据以一致的数据格式存储。
-   开发人员将不得不编写和维护更少的代码。


## 同构方法的缺点

同构处理有一些缺点：

-   由于应用程序的体系结构复杂，故障排除更具有挑战性。
-   敏感数据更容易暴露。
-   整个应用程序的体系结构变得更加复杂。

> **参考：**
>
> [Why Everyone is Talking About Isomorphic / Universal JavaScript and Why it Matters | by Azat Mardan | Capital One Tech | Medium](https://medium.com/capital-one-tech/why-everyone-is-talking-about-isomorphic-universal-javascript-and-why-it-matters-38c07c87905)
>
> [Isomorphic Rendering vs. Dynamic Rendering for JavaScript](https://prerender.io/blog/isomorphic-rendering/)
>
> [Isomorphic JavaScript - Wikipedia](https://en.wikipedia.org/wiki/Isomorphic_JavaScript)
>
> [什么是前端的同构渲染？](https://www.zhihu.com/question/325952676/answer/694270730)
>
> [同构并非想象中完美](https://www.css3.io/isomorphic-Is-not-perfect-as-you-think.html)
