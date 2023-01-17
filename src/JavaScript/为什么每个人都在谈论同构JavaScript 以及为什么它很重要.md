---
date: 2022-12-30
category:
- 前端
- 翻译
---

# 为什么每个人都在谈论同构JavaScript 以及为什么它很重要

> **原文标题：** Why Everyone is Talking About Isomorphic / Universal JavaScript and Why it Matters
>
>**原文：** [Why Everyone is Talking About Isomorphic / Universal JavaScript and Why it Matters | by Azat Mardan | Capital One Tech | Medium](https://medium.com/capital-one-tech/why-everyone-is-talking-about-isomorphic-universal-javascript-and-why-it-matters-38c07c87905)
>
>**作者：** [Azat Mardan](https://medium.com/@azatmardan)

“同构 isomorphic ”一词最初应用于数学领域，最初是由[Airbnb的Spike Brehm](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)在Javascript开发中推广的。从一开始，许多开发人员就反对这种用法，最近（此时为2016年）它一直出现在新闻中，因为与其相竞争的流行语“Universal Javascript”已经出现（最著名的是在[Michael Jackson的帖子](https://medium.com/@mjackson/universal-javascript-4761051b7ae9)中）作为“同构Javascript”的替代品。为简单起见，我将坚持使用更吸引人的单词同构 Isomorphic，也是为了避免卷入技术领域如此普遍的术语大战中。在这篇文章中，我们将更深入地探讨同构的概念，并阐明为什么它对 Web 开发很重要——不管用来描述它的流行语是什么。

应用于 Web 开发的**同构**意味着在服务器端和客户端渲染页面。它通常意味着使用 JavaScript 和 Node.js/Io.js因为它们允许重用库，允许浏览器 JavaScript 代码在 Node.js/Io.js 环境中运行，只需很少的修改。由于这种互换性，Node.js和JavaScript生态系统支持各种各样的同构框架，如[React](http://reactjs.net/).js，[lazo.js](http://lazojs.org/)和[Rendr](http://rendrjs.github.io/)等。

<img src="https://cdn.yihuiblog.top/images/202301152205147.png" alt="image-20230115214505499" style="zoom:50%;" />

开发人员对同构赞不绝口的三个主要原因是：

-   更好的搜索引擎优化 （SEO）
-   更好的性能
-   更好的可维护性

在我们谈到这些好处之前，让我们退后一步，看看Web的历史以及它与同构的关系。

# 网站开发历史快速回顾

在Web早期，服务器呈现所有HTML页面，Web体验比桌面应用程序差得多。每次用户与页面交互时，页面都必须刷新，大多数交互都是单个操作，例如提交一些数据或更新记录。再加上对用户体验 （UX） 的了解不足和连接速度慢，你就会明白......

到 2000 年代末，所谓的单页应用程序 （SPA） 变得更加流行，因为这种架构允许更快速、更用户友好的应用程序，其性能更像桌面应用程序。 （如今，桌面应用程序是使用 Web 技术构建的，使用 Electron 或 Adobe Air 等包装器，所以桌面端被扭转了！SPA 的定义特征是它们不需要页面重新加载，并异步加载数据，以便用户可以在数据加载时执行其他操作。例如，您可以在 Gmail 中为多封电子邮件并行加星标，而无需等待为电子邮件加星标的第一个过程成功完成。这改善了用户体验，因为 SPA 的功能更像桌面应用程序。这就是为什么你可能使用很多SPA——谷歌文档就是一个很好的例子——或者甚至可能已经开发了一个。

SPA 的另一个功能是 HTML 在客户端（即浏览器）上呈现和操作。这会减小有效负载的大小，因为服务器仅返回 JSON 而不是 HTML。但是，这种方法有一些缺点：

-   大多数搜索引擎在抓取网站时不支持客户端呈现。甚至谷歌也表示，[代码必须足够简单，以便其爬虫正确解释](http://www.capitalone.io/blog/why-is-everyone-talking-about-isomorphic-javascript/).
-   随着 SPA 变得越来越大，它们要求用户下载越来越多的前端 JavaScript 代码，从而导致等待时间增加（“加载...”消息），然后才能使用应用程序。
-   用户必须启用 JavaScript。
-   在页面框架加载后，用户必须等待JSON数据通过AJAX/XHR 返回。

用非同构策略修补这些问题充其量是很麻烦的。例如，在服务器端呈现页面早在同构JavaScript成为流行术语之前就是一种实践。但是，沿着 SPA 渲染服务器端通常需要使用不同的模板和逻辑集，因为服务器端平台使用 Ruby、Java 或 PHP 等语言。同样，另一种重要的策略涉及将爬虫重定向到[运行Phantom等无头浏览器的独立机器.js](http://www.capitalone.io/blog/why-is-everyone-talking-about-isomorphic-javascript/).

随着 Node.js 的出现，编写在浏览器和服务器上呈现的代码成为可能。不用说，从可维护性的角度来看，只有一组代码要好得多，并且开始超越其他 Web 开发策略。那么同构如何解决SEO、性能和可维护性的问题呢？

# 搜索引擎能够准确地索引页面

使用Backbone.js，Angular.js，Ember.js等框架构建的单页应用程序广泛用于编写受保护的应用程序，即需要用户名和密码才能访问的应用程序。大多数 SPA 提供受保护的资源，并且不需要 Web 索引，因为它们没有公共仪表板。例如，从Capital One网上银行到Gmail再到 Evernote.com，每个人都要求用户在看到实际应用程序之前登录。

但是，绝大多数网站在登录后不受保护。对于这些公共应用程序和页面，SEO实际上是强制性的，因为它们的商业模式在很大程度上依赖于搜索索引和自然流量。最近，谷歌在他们的爬虫中添加了JavaScript渲染功能。从理论上讲，这意味着Google将像普通浏览器一样呈现SPA，并索引其内容。但是，Google本身表示，“有时在渲染过程中事情并不完美，这可能会对您网站的搜索结果产生负面影响。 [](http://www.capitalone.io/blog/why-is-everyone-talking-about-isomorphic-javascript/)因此，为了安全起见，SPA 开发人员**仍然需要将他们的非** JavaScript 渲染尽可能接近支持 JavaScript（浏览器或 SPA）的渲染，以避免被爬虫忽略。例如，Capital One 主页必须由搜索引擎编入索引，以便我们的客户轻松找到可公开访问的页面。

虽然一些应用程序优先考虑正确的搜索引擎索引，但其他应用程序则以快速性能蓬勃发展。像 mobile.walmart.com（[文章](http://www.walmartlabs.com/2014/06/in-search-of-the-holy-grail-again)）和 Twitter.com（[文章](https://blog.twitter.com/2012/improving-performance-on-twittercom)）这样的网站所做的研究表明，提高第一页（首次加载）的速度可以提高一般网站的性能。

这项研究证实了服务器端呈现需要尽快显示第一页的做法，而其他代码可以在用户浏览页面时加载。*因此，当用户加载第一页时，他/她不会看到 *“正在加载...”* 消息;他们将看到一个功能页面，从而拥有更好的用户体验 （UX），并且总体上具有更好的应用体验。

# 更好的代码可维护性

代码是一种责任。越多，您和您的团队就越需要支持。因此，您通常希望避免对同一页面使用不同的模板和逻辑。幸运的是，Node.js/Io.js - 以及Handlebars，Mustache和Dust等模板引擎 - 使得在服务器上使用前端/浏览器模块变得毫不费力。

除了重用模板之外，开发人员还可以在服务器和浏览器上重用相同的库和实用程序，从而进一步减少对多余代码的需求。由于这个原因，像Underscore.js，lodash，Request和SuperAgent这样的库非常受欢迎。在服务器和浏览器上拥有相同的库可以更好地开发和代码重用，从而使软件工程师更快乐，并减少维护代码所花费的时间。如果我们更进一步，我们甚至可以开发自己的内部模块，以便在浏览器和服务器之间共享。我们在 Storify 使用翡翠浏览器就是这样做的。此模块允许您的 Node.js 和 Express.js 驱动的应用程序向浏览器公开 Jade 模板，在那里它们可以被浏览器的 JavaScript 代码使用（我们在浏览器上使用 Backbone 和 jQuery）。

同构JavaScript的另一个优点是数据模型可以在浏览器和服务器之间共享，例如Meteor或[Falcor](http://netflix.github.io/falcor)。这最大限度地提高了浏览器和服务器之间的一致性。在DocuSign，我们调整了Backbone.js模型（浏览器框架）以在服务器上工作。这使我们能够在 AJAX/XHR 请求之前获取 DocuSign Web SPA 的数据，从而提高应用程序的性能。

# 可选项：React.js、Lazo.js 和 Rendr

所以你想在你的 Web 开发中处理同构吗？虽然有各种各样的库和框架允许开发人员在JavaScript中使用同构，但一些最受欢迎的选择是React.js，Lazo.js和Rendr。以下是对这些库的快速比较。

## Rendr

Rendr是AirBnb开发的一个库，用于解决首页加载缓慢的问题。它旨在利用服务器上的 Backbone.js 体系结构。Rendr还与Express.js合作。如果我们仔细探索 Rendr，您会发现路由的设置类似于 Backbone 中的路由.js：

```js
module.exports = function(match) {
    match('',                   'home#index');
    match('repos',              'repos#index');
    match('repos/:owner/:name', 'repos#show');
    match('users',              'users#index');
    match('users/:login',       'users#show');
};
```

Rendr 应用程序将拥有自己的 Express 实例.js我们通过以下方式将其挂载到主服务器：

```js
var server = rendr.createServer({
    dataAdapterConfig: dataAdapterConfig  // Some configurations
});//...app.use('/', server.expressApp); // Mount Rendr app to the main app
```

更多 Rendr 示例可在 <https://github.com/rendrjs/rendr-examples> 中找到。有很多类似的项目利用 Backbone 库来编写可以在服务器上运行的代码或设计要在客户端和服务器之间共享的组件。其中一些项目可以在这里找到：[主干服务器端](http://www.capitalone.io/blog/why-is-everyone-talking-about-isomorphic-javascript/)和[预览科](http://www.capitalone.io/blog/why-is-everyone-talking-about-isomorphic-javascript/).

## Lazo.js

Lazo与Rendr相似，因为它利用了Backbone.js。此外，它还利用了RequireJS和jQuery前端JavaScript库。Lazo 路由存储在 JSON 文件中：

```js
{
    "routes": {
        "":             { "component": "todos-single" },
        "multiple(/)":  { "component": "todos-multiple" },
        "single(/)":    { "component": "todos-single" },
        "layout(/)":    { "component": "main", "layout": "todos-layout" },
        "header(/)":    { "component": "header" },
        "main(/)":      { "component": "main" },
        "footer(/)":    { "component": "footer" },
        "hello(/)":     { "component": "hello", "layout": "todos-layout" }
    },
    "css": ["/app/client/base.css"]
}
```

这些模块以 RequireJS 样式定义：

```js
define(['lazoBundle'], function (LazoBundle) {...})
```

## React.js

React.js 不是一个模型视图控制器 （MVC） 框架;它只有MVC的视图层。这意味着它可以与大多数其他库前端库（如 Backbone.js）一起使用。React.js 通常与 JSX 语言一起使用，JSX 语言是 JavaScript 和 XML/HTML 的混合体。在此方案中，JSX 代码在浏览器中执行之前编译为本机 JavaScript。与其他库相比，使用 React .js 的主要优点是使用虚拟 DOM 进行渲染，这意味着只有更改的增量才会在页面上呈现，而保持不变的元素保持不变。

下面是 React 前端代码的示例：

```js
var Header = React.createClass({
    render: function(){
        return (<h1>Message Board</h1>)
    }
})
//...
```

React 的亮点在于没有使用到模板——所有的 HTML 元素都是从 JavaScript 代码渲染的。类似XML的语法只是糖衣，因为功能在JS和HTML之间拆分，这种方法有助于防止从JS到HTML到JS到HTML的不断跳转，等等。当它编译为同构时，React 毫不费力地在服务器上渲染，从而实现我们之前讨论的更快的首页加载，而后面的交互则由浏览器 React 启用。

让我们看一下在使用 Express.js 构建的服务器上呈现的相同组件 Header。public/js/app.js 是带有 React 组件的浏览器文件，我们将在服务器上重用它：

```js
var React = require('react/addons'),
    components = require('./public/js/app.js'),
    Header = React.createFactory(components.Header)
    //...
    app.get('/', function(req, res, next) {
        req.messages.find({}, {sort: {_id: -1}}).toArray(function(err, docs){
            if (err) return next(err)
            res.render('index', {
                header: React.renderToString(Header()),  props: '<script type="text/javascript">var messages='+JSON.stringify(docs)+'</script>'
            })   
        })
    }
```

在 props 中传递的数据将暴露在客户端/浏览器上。视图的服务器端模板（Handlebars 模板引擎）如下所示：

```jsx
{{{props}}}
<div id="header">
    {{{header}}}
</div>
```

一旦客户端 React 代码从数据存储（Reflux、jQuery、Backbone 等）获取数据，它将检查服务器渲染元素上的校验和。之后它们将会匹配，因为数据是相同的，并且不会有不必要的重新呈现来减慢页面时间。第一次加载此页面将非常快，因为渲染发生在服务器上，后来部分 DOM 更新发生在浏览器上。

随着 SPA 变得越来越普遍，为谋求支持 SEO、non-JavaScript 客户端、更好的用户体验和快速的首页加载，对仅使用单个C/S代码的需求也越来越大。简而言之，同构JavaScript是这个Web开发问题的答案。

同构方法通过使用一组代码（通常是JavaScript / Node.js）来解决这些问题，该代码在后端和前端进行渲染，从而实现更好的可维护性、搜索引擎索引和用户体验。虽然这是一个有争议的术语，但这个概念的效用是坚实的。Node.js / Io.js 使同构开发更容易、更易于访问，使其越来越受欢迎并扩展到多个框架。

如果说“them all”是指从浏览器到服务器再到数据库的 Web 技术堆栈的每一层，JavaScript 则已经是统治它们的ONE LANGUAGE。如果同构 JavaScript 代表了 Web 开发的下一次演变，剥离了跟踪几千个活动代码位的复杂性，那会怎样？如果所有那些Web开发人员简历上的缩写——HTML、CSS、HTTP、SQL、RoR、J2EE、PHP——都可以被一个漂亮的JavaScript同构方法所取代呢？那不是举世地伟大吗？

> **译者：**
>
> 之前一直在查阅关于同构渲染、CSH和SSR等的资料，翻到了这篇Medium的早期文章，还是非常有学习价值的。
