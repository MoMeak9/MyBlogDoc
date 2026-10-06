---
theme: devui-blue
highlight: a11y-dark
---

> 原文：[github.com/reactwg/server-components/discussions/5](https://github.com/reactwg/server-components/discussions/5)
>
> 原标题：RSC From Scratch. Part 1: Server Components
>
> 作者：[gaearon (dan)](https://github.com/gaearon)
>
> 译者注：虽然这篇文章很长，而且有三个部分（目前仅更新了第一部分）。但是可以帮助你从0开始学习并深入探索新技术，希望下文可以帮助到你。如有翻译不当的地方，欢迎指正\~

在本次深入技术探究中，我们将从头开始实现一个非常简化的[React 服务器组件(RSC) ](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)

本次深入探究将分几个部分发布：

*   **第 1 部分：服务器组件**（本页）
*   第 2 部分：客户端组件 *（尚未编写）*
*   第 3 部分：待定 *（尚未编写）*

## 说真的，这是一次深度探索！

本次深入研究并未解释 React 服务器组件（React Server Component）的优势、如何使用 RSC 实现应用程序或如何使用它们实现框架。相反，它会引导你从头开始自己“发明”它们。

🔬 **对于喜欢通过从0开始实施新技术来学习新技术的人来说，这是一次深刻的探索。**
它假定你具有一些 Web 编程背景并且熟悉 React。

🚧 **此次深入探讨并非旨在介绍如何*使用*服务器组件。** 我们正努力在 React 网站上补充服务器组件的文档。同时，如果你的框架支持服务器组件，请参阅其文档。

😳 **出于教学原因，我们实现的性能将明显低于 React 使用的真实实现。**
我们将在文本中指出未来的优化方向，但我们将强烈优先考虑概念清晰度而不是性能。

## 让我们回到过去……

假设你有一天早上醒来，发现又是 2003 年了。Web 开发仍处于起步阶段。假设你要创建一个个人博客网站，以显示你服务器上文本文件中的内容。在 PHP 中，它可能看起来像这样：

```php

<?php
  $author = "Jae Doe";
  $post_content = @file_get_contents("./posts/hello-world.txt");
?>
<html>
  <head>
    <title>My blog</title>
  </head>
  <body>
    <nav>
      <a href="/">Home</a>
      <hr>
    </nav>
    <article>
      <?php echo htmlspecialchars($post_content); ?>
    </article>
    <footer>
      <hr>
      <p><i>(c) <?php echo htmlspecialchars($author); ?>, <?php echo date("Y"); ?></i></p>
    </footer>
  </body>
</html>
```

*（我们将假装`<nav>`,`<article>`和 之类的标签`<footer>`在当时已经存在，以保持 HTML 易于阅读。）*

当你在浏览器中打开时`http://locahost:3000/hello-world`，此 PHP 脚本会返回一个 HTML 页面，其中包含来自`./posts/hello-world.txt`. 使用当今的 Node.js API 编写的等效 Node.js 脚本可能如下所示：

```jsx
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import escapeHtml from  'escape-html';

createServer(async (req, res) => {
  const author = "Jae Doe";
  const postContent = await readFile("./posts/hello-world.txt", "utf8");
  sendHTML(
    res,
    `<html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <article>
          ${escapeHtml(postContent)}
        </article>
        <footer>
          <hr>
          <p><i>(c) ${escapeHtml(author)}, ${new Date().getFullYear()}</i></p>
        </footer>
      </body>
    </html>`
  );
}).listen(8080);

function sendHTML(res, html) {
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}
```

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/nostalgic-platform-kvog0r?file=%2Fserver.js)**

想象一下，你可以将带有 Node.js 引擎的 CD-ROM 带回到 2003 年，然后你可以在服务器上运行此代码。如果你想为那个世界带来 React 风格的范例，你会添加哪些功能，以什么顺序添加？

## 第 1 步：让我们发明 JSX

上面代码的第一个不理想之处是直接的字符串操作。请注意，你必须调用`escapeHtml(postContent)`以确保不会意外地将文本文件中的内容视为 HTML。

解决此问题的一种方法是将你的逻辑从“模板”中分离出来，然后引入一种单独的模板语言，该语言提供了一种方法来为文本和属性注入动态值，安全地转义文本内容，并为条件提供特定于域的语法和循环。这是 2000 年代一些最流行的以服务器为中心的框架所采用的方法。

但是，你现有的 React 知识可能会启发你改为这样做：

```jsx
createServer(async (req, res) => {
  const author = "Jae Doe";
  const postContent = await readFile("./posts/hello-world.txt", "utf8");
  sendHTML(
    res,
    <html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <article>
          {postContent}
        </article>
        <footer>
          <hr />
          <p><i>(c) {author}, {new Date().getFullYear()}</i></p>
        </footer>
      </body>
    </html>
  );
}).listen(8080);
```

这看起来很相似，但我们的“模板”不再是字符串。我们不是编写字符串插值代码，而是将 XML 的子集放入 JavaScript。换句话说，我们刚刚“发明”了 JSX。JSX 让你的标记接近于相关的渲染逻辑，但与字符串插值不同的是，它可以防止诸如不匹配的打开/关闭 HTML 标签或忘记转义文本内容之类的错误。

在底层，JSX 生成了一个对象树，如下所示：

```json
// Slightly simplified
{
  $$typeof: Symbol.for("react.element"), // Tells React it's a JSX element (e.g. <html>)
  type: 'html',
  props: {
    children: [
      {
        $$typeof: Symbol.for("react.element"),
        type: 'head',
        props: {
          children: {
            $$typeof: Symbol.for("react.element"),
            type: 'title',
            props: { children: 'My blog' }
          }
        }
      },
      {
        $$typeof: Symbol.for("react.element"),
        type: 'body',
        props: {
          children: [
            {
              $$typeof: Symbol.for("react.element"),
              type: 'nav',
              props: {
                children: [{
                  $$typeof: Symbol.for("react.element"),
                  type: 'a',
                  props: { href: '/', children: 'Home' }
                }, {
                  $$typeof: Symbol.for("react.element"),
                  type: 'hr',
                  props: null
                }]
              }
            },
            {
              $$typeof: Symbol.for("react.element"),
              type: 'article',
              props: {
                children: postContent
              }
            },
            {
              $$typeof: Symbol.for("react.element"),
              type: 'footer',
              props: {
                /* ...And so on... */
              }              
            }
          ]
        }
      }
    ]
  }
}
```

但是，最终你需要发送给浏览器的是 HTML，而不是 JSON 树。（最起码到现在！）

让我们编写一个将 JSX 转换为 HTML 字符串的函数。为此，我们需要指定不同类型的节点（字符串、数字、数组或带有子节点的 JSX 节点）应如何转换为 HTML 片段：

```js
function renderJSXToHTML(jsx) {
  if (typeof jsx === "string" || typeof jsx === "number") {
    // This is a string. Escape it and put it into HTML directly.
    return escapeHtml(jsx);
  } else if (jsx == null || typeof jsx === "boolean") {
    // This is an empty node. Don't emit anything in HTML for it.
    return "";
  } else if (Array.isArray(jsx)) {
    // This is an array of nodes. Render each into HTML and concatenate.
    return jsx.map((child) => renderJSXToHTML(child)).join("");
  } else if (typeof jsx === "object") {
    // Check if this object is a React JSX element (e.g. <div />).
    if (jsx.$$typeof === Symbol.for("react.element")) {
      // Turn it into an an HTML tag.
      let html = "<" + jsx.type;
      for (const propName in jsx.props) {
        if (jsx.props.hasOwnProperty(propName) && propName !== "children") {
          html += " ";
          html += propName;
          html += "=";
          html += escapeHtml(jsx.props[propName]);
        }
      }
      html += ">";
      html += renderJSXToHTML(jsx.props.children);
      html += "</" + jsx.type + ">";
      return html;
    } else throw new Error("Cannot render an object.");
  } else throw new Error("Not implemented.");
}
```

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/recursing-kepler-yw7dlx?file=%2Fserver.js)**

试一试，看看正在呈现和提供的 HTML！

将 JSX 转换为 HTML 字符串通常被称为“服务器端渲染”（SSR）。**重要的是要注意 RSC 和 SSR 是两个截然不同的东西（往往一起使用）。** 在本指南中，我们从 SSR*开始*，因为这是你在服务器环境中可能尝试做的自然而然的第一件事。但是，这只是第一步，稍后你会看到显着差异。

## 第 2 步：让我们发明组件

在 JSX 之后，你可能想要的下一个特性是组件。无论你的代码是在客户端还是在服务器上运行，将 UI 分成不同的部分、给它们命名并通过 props 向它们传递信息是有意义的。

让我们将前面的示例分成两个组件，称为`BlogPostPage`和`Footer`：

```jsx
function BlogPostPage({ postContent, author }) {
  return (
    <html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <article>
          {postContent}
        </article>
        <Footer author={author} />
      </body>
    </html>
  );
}

function Footer({ author }) {
  return (
    <footer>
      <hr />
      <p>
        <i>
          (c) {author} {new Date().getFullYear()}
        </i>
      </p>
    </footer>
  );
}
```

然后，让我们替换我们拥有的内联 JSX 树`<BlogPostPage postContent={postContent} author={author} />`：

```jsx
createServer(async (req, res) => {
  const author = "Jae Doe";
  const postContent = await readFile("./posts/hello-world.txt", "utf8");
  sendHTML(
    res,
    <BlogPostPage
      postContent={postContent}
      author={author}
    />
  );
}).listen(8080);
```

如果你尝试在不对你的`renderJSXToHTML`实现进行任何更改的情况下运行此代码，则生成的 HTML 看起来会是损坏的：

```html
<!-- This doesn't look like valid at HTML at all... -->
<function BlogPostPage({postContent,author}) {...}>
</function BlogPostPage({postContent,author}) {...}>
```

问题在于我们的`renderJSXToHTML`函数（将 JSX 转换为 HTML）假定它接受的`jsx.type`始终是带有 HTML 标签名称（例如`"html"`、`"footer"`或`"p"`）的字符串：

```js
if (jsx.$$typeof === Symbol.for("react.element")) {
  // Existing code that handles HTML tags (like <p>).
  let html = "<" + jsx.type;
  // ...
  html += "</" + jsx.type + ">";
  return html;
} 
```

但是这里，`BlogPostPage`是一个函数，所以`"<" + jsx.type + ">"`打印它的源代码。你不想在 HTML 标记名称中发送该函数的代码。相反，让我们*调用这个函数——并将它返回的*JSX 序列化为HTML：

```js
if (jsx.$$typeof === Symbol.for("react.element")) {
  if (typeof jsx.type === "string") { // Is this a tag like <div>?
    // Existing code that handles HTML tags (like <p>).
    let html = "<" + jsx.type;
    // ...
    html += "</" + jsx.type + ">";
    return html;
  } else if (typeof jsx.type === "function") { // Is it a component like <BlogPostPage>?
    // Call the component with its props, and turn its returned JSX into HTML.
    const Component = jsx.type;
    const props = jsx.props;
    const returnedJsx = Component(props);
    return renderJSXToHTML(returnedJsx); 
  } else throw new Error("Not implemented.");
}
```

现在，如果你在生成 HTML 时遇到 JSX 元素`<BlogPostPage author="Jae Doe" />`，你将把`BlogPostPage`作为函数调用，并传递`{ author: "Jae Doe" }`给该函数。该函数将返回更多的 JSX。而且你已经知道如何处理 JSX——你将它传回`renderJSXToHTML` 并继续从它生成HTML。

仅此更改就足以添加对组件和传递props的支持。一探源码：

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/thirsty-frost-8oug3o?file=%2Fserver.js)**

## 第 3 步：让我们添加一些路由

既然我们已经获得了对组件工作的基本支持，那么向博客添加更多页面会很好。

假设一个 URL like`/hello-world`需要显示包含来自 的内容的单个博客文章页面`./posts/hello-world.txt`，而请求根`/`URL 需要显示一个包含每个博客文章内容的长索引页面。这意味着我们要添加一个`BlogIndexPage`共享布局给到`BlogPostPage`，但内部展示不同的新内容。

目前，该`BlogPostPage`组件代表整个页面，从最`<html>`根部开始。让我们将页面（页眉和页脚）之间的共享 UI 部分从`BlogPostPage`中提取到一个可重用的`BlogLayout`组件中：

```jsx
function BlogLayout({ children }) {
  const author = "Jae Doe";
  return (
    <html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <main>
          {children}
        </main>
        <Footer author={author} />
      </body>
    </html>
  );
}
```

我们将更改组件以仅包含我们要*在*该布局中`BlogPostPage` 插入的内容：

```jsx
function BlogPostPage({ postSlug, postContent }) {
  return (
    <section>
      <h2>
        <a href={"/" + postSlug}>{postSlug}</a>
      </h2>
      <article>{postContent}</article>
    </section>
  );
}
```

这是`<BlogPostPage>`嵌套在里面时的样子`<BlogLayout>`：

[![单个博客文章页面的屏幕截图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e03729947f94dacb0f89648716d92b5~tplv-k3u1fbpfcp-zoom-1.image)](https://camo.githubusercontent.com/dcea9e9bf1bad6c54eed69f36b8807b019dbdaa850fea3fec65c0efb7db00cde/68747470733a2f2f692e696d6775722e636f6d2f546c415a346b522e706e67)

我们还添加一个*新* `BlogIndexPage`组件，一个接一个地显示每个帖子`./posts/*.txt`：

```jsx
function BlogIndexPage({ postSlugs, postContents }) {
  return (
    <section>
      <h1>Welcome to my blog</h1>
      <div>
        {postSlugs.map((postSlug, index) => (
          <section key={postSlug}>
            <h2>
              <a href={"/" + postSlug}>{postSlug}</a>
            </h2>
            <article>{postContents[index]}</article>
          </section>
        ))}
      </div>
    </section>
  );
}
```

然后你也可以将它嵌套在`BlogLayout`里面，这样它就有相同的页眉和页脚：

[![显示所有博客文章的主页屏幕截图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1340d402e67d48eb901885f0e804b788~tplv-k3u1fbpfcp-zoom-1.image)](https://camo.githubusercontent.com/46270a98111bb2be99084df33ceaf6da3ac58a6b5a1436d9ae118e22bdc46383/68747470733a2f2f692e696d6775722e636f6d2f38356472454c522e706e67)

最后，让我们更改服务器处理程序以根据 URL 选择页面，为其加载数据，并在布局中呈现该页面：

```jsx
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    // Match the URL to a page and load the data it needs.
    const page = await matchRoute(url);
    // Wrap the matched page into the shared layout.
    sendHTML(res, <BlogLayout>{page}</BlogLayout>);
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode ?? 500;
    res.end();
  }
}).listen(8080);

async function matchRoute(url) {
  if (url.pathname === "/") {
    // We're on the index route which shows every blog post one by one.
    // Read all the files in the posts folder, and load their contents.
    const postFiles = await readdir("./posts");
    const postSlugs = postFiles.map((file) => file.slice(0, file.lastIndexOf(".")));
    const postContents = await Promise.all(
      postSlugs.map((postSlug) =>
        readFile("./posts/" + postSlug + ".txt", "utf8")
      )
    );
    return <BlogIndexPage postSlugs={postSlugs} postContents={postContents} />;
  } else {
    // We're showing an individual blog post.
    // Read the corresponding file from the posts folder.
    const postSlug = sanitizeFilename(url.pathname.slice(1));
    try {
      const postContent = await readFile("./posts/" + postSlug + ".txt", "utf8");
      return <BlogPostPage postSlug={postSlug} postContent={postContent} />;
    } catch (err) {
      throwNotFound(err);
    }
  }
}

function throwNotFound(cause) {
  const notFound = new Error("Not found.", { cause });
  notFound.statusCode = 404;
  throw notFound;
}
```

现在你可以浏览博客了。然而，代码变得有点冗长和笨拙。我们接下来会解决这个问题。

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/trusting-turing-bi5vjr?file=%2Fserver.js)**

## 第 4 步：让我们发明异步组件

你可能已经注意到这部分的`BlogIndexPage`和`BlogPostPage`组件看起来完全一样：

![在单个帖子页面上发布标题和内容](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d43d15df60454b44b45357f7a2a862e2~tplv-k3u1fbpfcp-zoom-1.image)

![在主页上发布带有内容的标题（显示两次）](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e07e27018e60488da768162943fd2424~tplv-k3u1fbpfcp-zoom-1.image)

如果我们能以某种方式使它成为一个可重用的组件，那就太好了。然而，即使你将它的呈现逻辑提取到一个单独的`Post`组件中，你仍然需要以某种方式“深入研究”每个单独帖子的`content`：

```jsx
function Post({ slug, content }) { // Someone needs to pass down the `content` prop from the file :-(
  return (
    <section>
      <h2>
        <a href={"/" + slug}>{slug}</a>
      </h2>
      <article>{content}</article>
    </section>
  )
}
```

目前，为帖子加载内容的逻辑在这里和这里是重复的。我们在组件层次结构之外加载它，因为readFile API是异步的--所以我们不能在组件树中直接使用它。 (让我们忽略fs API有同步版本--这可能是从数据库中读取，或调用一些异步的第三方库。)

或者我们可以？...

如果你习惯了客户端 React，你可能会习惯这样的想法，即你不能像`fs.readFile`从组件那样调用 API。即使使用传统的 React SSR（服务器渲染），你现有的直觉可能会告诉你，你的每个组件也需要能够*在*浏览器中运行——因此像仅服务器 API 这样的 API`fs.readFile`是行不通的。

但如果你试图在 2003 年向某人解释这一点，他们会发现这种限制相当奇怪。你不能`fs.readFile`，真的吗？

回想一下，我们是从第一原则开始处理所有事情的。现在，我们*只*针对服务器环境，因此我们不需要将我们的组件限制为在浏览器中运行的代码。组件异步也完全没问题，因为服务器可以等待它发出 HTML，直到它的数据已加载并准备好显示。

让我们删除`content` prop，而是让`Post`作为一个`async`函数通过`await readFile()`调用加载文件内容：

```jsx
async function Post({ slug }) {
  let content;
  try {
    content = await readFile("./posts/" + slug + ".txt", "utf8");
  } catch (err) {
    throwNotFound(err);
  }
  return (
    <section>
      <h2>
        <a href={"/" + slug}>{slug}</a>
      </h2>
      <article>{content}</article>
    </section>
  )
}
```

同样，让我们​​创建`BlogIndexPage`作为一个`async`函数来处理枚举帖子`await readdir()`：

```jsx
async function BlogIndexPage() {
  const postFiles = await readdir("./posts");
  const postSlugs = postFiles.map((file) =>
    file.slice(0, file.lastIndexOf("."))
  );
  return (
    <section>
      <h1>Welcome to my blog</h1>
      <div>
        {postSlugs.map((slug) => (
          <Post key={slug} slug={slug} />
        ))}
      </div>
    </section>
  );
}
```

现在`Post`和`BlogIndexPage`都将自己加载数据，我们可以用`<Router>`组件替换`matchRoute`：

```jsx
function Router({ url }) {
  let page;
  if (url.pathname === "/") {
    page = <BlogIndexPage />;
  } else {
    const postSlug = sanitizeFilename(url.pathname.slice(1));
    page = <BlogPostPage postSlug={postSlug} />;
  }
  return <BlogLayout>{page}</BlogLayout>;
}
```

最后，顶层服务器处理程序可以将所有渲染委托给`<Router>`：

```jsx
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    await sendHTML(res, <Router url={url} />);
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode ?? 500;
    res.end();
  }
}).listen(8080);
```

但是等等，我们需要先在组件内部*实际*进行`async`/`await`工作。我们如何做到这一点？

让我们在`renderJSXToHTML`实现中找到调用组件函数的地方：

```jsx
  } else if (typeof jsx.type === "function") {
    const Component = jsx.type;
    const props = jsx.props;
    const returnedJsx = Component(props); // <--- This is where we're calling components
    return renderJSXToHTML(returnedJsx);
  } else throw new Error("Not implemented.");
```

由于组件函数现在可以是异步的，让我们`await`在其中添加一个：

```js
    // ...
    const returnedJsx = await Component(props);
    // ...
```

这意味着`renderJSXToHTML`它自己现在必须是一个`async`函数，并且需要`await`编辑对它的调用。

```jsx
async function renderJSXToHTML(jsx)  {
  // ...
}
```

通过此更改，树中的任何组件都可以是`async`，生成的 HTML“等待”它们解析。

请注意，在新代码中，没有特殊的逻辑来“准备”`BlogIndexPage`循环中的所有文件内容。我们的`BlogIndexPage`仍然呈现一组组`Post`件——但现在，每个组件都`Post`知道如何读取自己的文件。

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/relaxed-pare-gicsdi?file=%2Fserver.js)**

> 请注意，此实现并不理想，因为每个`await`都是“阻塞”的。例如，在生成所有 HTML*之前*，我们甚至无法*开始*发送 HTML 。理想情况下，我们希望在生成服务器负载时对其*进行流式处理。* 这更复杂，我们不会在演练的这一部分中这样做——现在我们只关注数据流。但是，需要注意的是，我们可以稍后添加流，而无需对组件本身进行任何更改。每个组件只用于等待自己的*数据*（这是不可避免的），但父组件不需要它们的子组件——即使子组件是\*\* **`await`**`await``async`. 这就是为什么 React 可以在子组件完成渲染之前流式传输父组件的输出。

## 第 5 步：让我们保留导航栏状态

到目前为止，我们的服务器只能渲染到 HTML 字符串的路由：

```js
async function sendHTML(res, jsx) {
  const html = await renderJSXToHTML(jsx);
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}
```

这对于首次加载非常有用——浏览器经过优化以尽可能快地显示 HTML——但它对于导航来说并不理想。**我们希望能够*就地*更新“仅更改的部分” ，同时保留它们内部和周围的客户端状态（例如输入、视频、弹出窗口等）。** 这也会让mutations（例如，在博客文章中添加评论）变得流畅。

为了说明问题，让我们在组件内部[添加一个`<input />`](https://codesandbox.io/p/sandbox/heuristic-lalande-gp6gcj?file=%2Fserver.js%3A77%2C11-77%2C20)JSX：`<nav>``BlogLayout`

```html
<nav>
  <a href="/">Home</a>
  <hr />
  <input />
  <hr />
</nav>
```

注意每次浏览博客时输入的状态是如何“消失”的：

![1](https://fs.lwmc.net/uploads/2023/06/1686889624352-202306161226304.gif)

这对于一个简单的博客来说可能没问题，但如果你希望能够构建更具交互性的应用程序，那么在某些时候这种行为会成为一个交互破坏者，你是想让用户在应用程序中导航而不总是丢失本地状态。

我们将分三步解决这个问题：

1.  添加一些客户端 JS 逻辑来拦截导航（因此我们可以在不重新加载页面的情况下手动重新获取内容）。
2.  教我们的服务器通过网络去服务 JSX 而不是 HTML 用于后续导航。
3.  教客户端在不破坏 DOM 的情况下应用 JSX 更新（提示：我们将在该部分使用 React）。

### 步骤 5.1：让我们进行导航拦截

我们将需要一些客户端逻辑，因此我们将为`<script>`名为`client.js`. 在这个文件中，我们将覆盖站点内导航的默认行为，以便它们调用我们自己的函数`navigate`：

```js
async function navigate(pathname) {
  // TODO
}

window.addEventListener("click", (e) => {
  // Only listen to link clicks.
  if (e.target.tagName !== "A") {
    return;
  }
  // Ignore "open in a new tab".
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }
  // Ignore external URLs.
  const href = e.target.getAttribute("href");
  if (!href.startsWith("/")) {
    return;
  }
  // Prevent the browser from reloading the page but update the URL.
  e.preventDefault();
  window.history.pushState(null, null, href);
  // Call our custom logic.
  navigate(href);
}, true);

window.addEventListener("popstate", () => {
  // When the user presses Back/Forward, call our custom logic too.
  navigate(window.location.pathname);
});
```

在`navigate`函数中，我们将`fetch`下一条路线的HTML响应，并将DOM更新到它：

```jsx
let currentPathname = window.location.pathname;

async function navigate(pathname) {
  currentPathname = pathname;
  // Fetch HTML for the route we're navigating to.
  const response = await fetch(pathname);
  const html = await response.text();

  if (pathname === currentPathname) {
    // Get the part of HTML inside the <body> tag.
    const bodyStartIndex = html.indexOf("<body>") + "<body>".length;
    const bodyEndIndex = html.lastIndexOf("</body>");
    const bodyHTML = html.slice(bodyStartIndex, bodyEndIndex);

    // Replace the content on the page.
    document.body.innerHTML = bodyHTML;
  }
}
```

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/agitated-bush-ql7kid?file=%2Fclient.js)**

此代码尚未完全准备好（例如，它不会更改`document.title`或宣布路由更改），但它表明我们可以成功覆盖浏览器导航行为。目前，我们正在获取下一条路线的 HTML，因此`<input>`状态仍然会丢失。在下一步中，我们将教我们的服务器为导航提供 JSX 而不是 HTML。👀

### 步骤 5.2：让我们通过网络发送 JSX

还记得我们之前看过的 JSX 生成的对象树吗：

```json
{
  $$typeof: Symbol.for("react.element"),
  type: 'html',
  props: {
    children: [
      {
        $$typeof: Symbol.for("react.element"),
        type: 'head',
        props: {
          // ... And so on ...
```

我们将向我们的服务器添加一个新模式。当请求以`?jsx`结尾时，我们将发送这样的树而不是 HTML。这将使客户端很容易确定哪些部分发生了变化，并且只在必要时更新 DOM。这将解决我们`<input>`在每次导航时状态丢失的直接问题，但这不是我们这样做的唯一原因。在下一部分（不是现在！）中，你将看到这如何让我们将新信息（不仅仅是 HTML）从服务器传递到客户端。

首先，让我们更改服务器代码以`sendJSX`在有`?jsx`搜索参数时调用新函数：

```js
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/client.js") {
      // ...
    } else if (url.searchParams.has("jsx")) {
      url.searchParams.delete("jsx"); // Keep the url passed to the <Router> clean
      await sendJSX(res, <Router url={url} />);
    } else {
      await sendHTML(res, <Router url={url} />);
    }
    // ...
```

在`sendJSX`中，我们将使用`JSON.stringify(jsx)`将上面的对象树转换为我们可以向下传递网络的 JSON 字符串：

```js
async function sendJSX(res, jsx) {
  const jsxString = JSON.stringify(jsx, null, 2); // Indent with two spaces.
  res.setHeader("Content-Type", "application/json");
  res.end(jsxString);
}
```

我们将继续称其为“发送 JSX”，但我们不会通过网络发送 JSX 语法本身（如 `"<Foo />"`）。我们只获取 JSX 生成的对象树，并将其转换为 JSON 格式的字符串。然而，确切的传输格式会随着时间而改变（例如，实际的 RSC 实现是使用不同的格式，我们将在本系列的后面探讨）。

让我们更改客户端代码以查看通过网络传递的内容：

```js
async function navigate(pathname) {
  currentPathname = pathname;
  const response = await fetch(pathname + "?jsx");
  const jsonString = await response.text();
  if (pathname === currentPathname) {
    alert(jsonString);
  }
}
```

[试试这个。](https://codesandbox.io/p/sandbox/heuristic-bartik-gk8ggy?file=%2Fserver.js%3A1%2C1)如果你现在加载索引`/`页面，然后按一个链接，你将看到一个带有如下对象的警报：

```json
{
  "key": null,
  "ref": null,
  "props": {
    "url": "http://localhost:3000/hello-world"
  },
  // ...
}
```

这不是很有用——我们希望得到一个 JSX 树，比如`<html>...</html>`. 什么地方出了错？

最初，我们的 JSX 看起来像这样：

    <Router url="http://localhost:3000/hello-world" />
    // {
    //   $$typeof: Symbol.for('react.element'),
    //   type: Router,
    //   props: { url: "http://localhost:3000/hello-world" } },
    //    ...
    // }

**将这个 JSX 转换为客户端的 JSON 还为时过早，因为我们不知道要`Router`呈现什么 JSX，并且`Router`只存在于服务器上。我们需要*调用*该`Router`组件来找出我们需要发送给客户端的 JSX。**

如果我们`Router`用`{ url: "http://localhost:3000/hello-world" } }`as props 调用这个函数，我们会得到这段 JSX：

```html
<BlogLayout>
  <BlogIndexPage />
</BlogLayout>
```

同样，将此 JSX 转换为客户端的 JSON 还为时过早，因为我们不知道`BlogLayout`要呈现什么——而且它只存在于服务器上。我们也必须调用`BlogLayout`，并找出它想传递给客户端的 JSX，等等。

*（有经验的 React 用户可能会反对：我们不能将他们的代码发送到客户端以便它可以执行它们吗？保持这个想法直到本系列的下一部分！但即使那样也只适用于 `BlogLayout`，因为`BlogIndexPage`调用`fs.readdir`）*

在此过程结束时，我们最终得到一个不引用任何仅服务器代码的 JSX 树。例如：

```html
<html>
  <head>...</head>
  <body>
    <nav>
      <a href="/">Home</a>
      <hr />
    </nav>
    <main>
    <section>
      <h1>Welcome to my blog</h1>
      <div>
        ...
      </div>
    </main>
    <footer>
      <hr />
      <p>
        <i>
          (c) Jae Doe 2003
        </i>
      </p>
    </footer>
  </body>
</html>
```

现在，*这*就是我们可以传递给`JSON.stringify`并发送给客户端的那种树。

让我们编写一个名为`renderJSXToClientJSX`. 它将一段 JSX 作为参数，它会尝试“解析”其仅用于服务器的部分（通过调用相应的组件），直到我们只剩下客户端可以理解的 JSX。

在结构上，这个函数类似于`renderJSXToHTML`，但是它不是 HTML，而是遍历并返回对象：

```js
async function renderJSXToClientJSX(jsx) {
  if (
    typeof jsx === "string" ||
    typeof jsx === "number" ||
    typeof jsx === "boolean" ||
    jsx == null
  ) {
    // Don't need to do anything special with these types.
    return jsx;
  } else if (Array.isArray(jsx)) {
    // Process each item in an array.
    return Promise.all(jsx.map((child) => renderJSXToClientJSX(child)));
  } else if (jsx != null && typeof jsx === "object") {
    if (jsx.$$typeof === Symbol.for("react.element")) {
      if (typeof jsx.type === "string") {
        // This is a component like <div />.
        // Go over its props to make sure they can be turned into JSON.
        return {
          ...jsx,
          props: await renderJSXToClientJSX(jsx.props),
        };
      } else if (typeof jsx.type === "function") {
        // This is a custom React component (like <Footer />).
        // Call its function, and repeat the procedure for the JSX it returns.
        const Component = jsx.type;
        const props = jsx.props;
        const returnedJsx = await Component(props);
        return renderJSXToClientJSX(returnedJsx);
      } else throw new Error("Not implemented.");
    } else {
      // This is an arbitrary object (for example, props, or something inside of them).
      // Go over every value inside, and process it too in case there's some JSX in it.
      return Object.fromEntries(
        await Promise.all(
          Object.entries(jsx).map(async ([propName, value]) => [
            propName,
            await renderJSXToClientJSX(value),
          ])
        )
      );
    }
  } else throw new Error("Not implemented");
}
```

接下来，让我们`sendJSX`先将 JSX like编辑`<Router />`成“client JSX”，然后再将其字符串化：

```js
async function sendJSX(res, jsx) {
  const clientJSX = await renderJSXToClientJSX(jsx);
  const clientJSXString = JSON.stringify(clientJSX, null, 2); // Indent with two spaces
  res.setHeader("Content-Type", "application/json");
  res.end(clientJSXString);
}
```

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/competent-dawn-grmx8d?file=%2Fserver.js%3A1%2C1)**

现在点击一个链接会显示一个警报，其中有一个看起来类似于 HTML 的树——这意味着我们已经准备好尝试比较它了！

> 注意：目前，我们的目标是让某些东西正常工作，但在实施过程中还有很多不足之处。该格式本身非常冗长和重复，因此真正的 RSC 使用更紧凑的格式。`await`与早期的 HTML 生成一样，一次编辑整个响应是不好的。理想情况下，我们希望能够在 JSX 可用时以块的形式流式传输，并在客户端将它们拼凑在一起。同样不幸的是，当我们知道它们没有改变的事实时，我们正在重新发送部分共享布局（如`<html>`和）。*虽然能够*就地刷新整个屏幕`<nav>`很重要，但单个布局中的导航在默认情况下不应该理想地重新获取该布局。**生产就绪的 RSC 实现不会受到这些缺陷的影响，但我们现在将接受它们以使代码更易于理解。**

### 步骤 5.3：让我们在客户端应用 JSX 更新

严格来说，我们不必使用 React 来 diff JSX。到目前为止，我们的 JSX 节点*只*包含内置浏览器组件，如`<nav>`, `<footer>`. 你可以从一个完全没有客户端组件概念的库开始，然后使用它来比较和应用 JSX 更新。但是，我们稍后会希望允许丰富的交互性，因此我们将从一开始就使用 React。

我们的应用程序由服务器呈现为 HTML。为了让 React 接管管理它没有创建的 DOM 节点（例如浏览器从 HTML 创建的 DOM 节点），你需要向 React 提供与该 DOM 节点对应的初始 JSX。想象一下，承包商要求你在进行装修之前查看房屋平面图。他们更愿意知道最初的计划，以便安全地进行未来的更改。同样，React 遍历 DOM 以查看每个 DOM 节点对应于 JSX 的哪一部分。这让 React 将事件处理程序附加到 DOM 节点，使它们具有交互性，或稍后更新它们。它们现在被*hydrated*，就像植物因水而活了一样。

传统上，为了hydrate服务器渲染的标记，你会调用[`hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot#usage)你想要用 React 管理的 DOM 节点，以及它在服务器上创建的初始 JSX。它可能看起来像这样：

    // Traditionally, you would hydrate like this
    hydrateRoot(document, <App />);

问题是我们根本没有像客户端`<App />`那样的根组件！从客户的角度来看，目前我们的整个应用程序是一大块 JSX，其中只有零个 React 组件 *。* 然而，React 真正需要的只是对应于初始 HTML 的 JSX 树。`<html>...</html>`像我们*刚刚*教服务器生成的“客户端 JSX”树可以工作：

```jsx
import { hydrateRoot } from 'react-dom/client';

const root = hydrateRoot(document, getInitialClientJSX());

function getInitialClientJSX() {
  // TODO: return the <html>...</html> client JSX tree mathching the initial HTML
}
```

这将非常快，因为现在客户端 JSX 树中根本没有任何组件。React 将在近乎瞬间遍历 DOM 树和 JSX 树，并构建其内部数据结构，这是稍后更新该树所必需的。

然后，每当用户导航时，我们将获取下一页的 JSX 并使用以下内容通过 [`root.render`](https://react.dev/reference/react-dom/client/hydrateRoot#updating-a-hydrated-root-component)更新 DOM ：

```jsx
async function navigate(pathname) {
  currentPathname = pathname;
  const clientJSX = await fetchClientJSX(pathname);
  if (pathname === currentPathname) {
    root.render(clientJSX);
  }
}

async function fetchClientJSX(pathname) {
  // TODO: fetch and return the <html>...</html> client JSX tree for the next route
}
```

这将实现我们想要的——它将以与 React 通常相同的方式更新 DOM，而不会破坏状态。

现在让我们弄清楚如何实现这两个功能。

#### 步骤 5.3.1：让我们从服务器获取 JSX

我们将从`fetchClientJSX`开始，因为它更容易实施。

首先，让我们回顾一下我们的`?jsx`服务器端点是如何工作的：

```js
async function sendJSX(res, jsx) {
  const clientJSX = await renderJSXToClientJSX(jsx);
  const clientJSXString = JSON.stringify(clientJSX);
  res.setHeader("Content-Type", "application/json");
  res.end(clientJSXString);
}
```

在客户端，我们将调用这个endpoint，然后将响应提供给以[`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)将其返回到 JSX：

```js
async function fetchClientJSX(pathname) {
  const response = await fetch(pathname + "?jsx");
  const clientJSXString = await response.text();
  const clientJSX = JSON.parse(clientJSXString);
  return clientJSX;
}
```

如果你[尝试这个实现](https://codesandbox.io/p/sandbox/vibrant-golick-x09dj7?file=%2Fclient.js)，每当你点击一个链接并试图渲染获取的 JSX 时，你都会看到一个错误：

    Objects are not valid as a React child (found: object with keys {type, key, ref, props, _owner, _store}).

这就是为什么。我们传递给的对象`JSON.stringify`如下所示：

    {
      $$typeof: Symbol.for("react.element"),
      type: 'html',
      props: {
        // ...

但是，如果你在客户端查看`JSON.parse`结果，该`$$typeof`属性似乎在传输过程中丢失了：

    {
      type: 'html',
      props: {
        // ...

没有`$$typeof: Symbol.for("react.element")`，客户端上的 React 将拒绝将其识别为有效的 JSX 节点。

这是一种有意的安全机制。默认情况下，React 拒绝将从网络获取的任意 JSON 对象视为 JSX 标签。诀窍在于像这样的 Symbol 值`Symbol.for('react.element')`不会将“幸存” JSON 序列化，并被`JSON.stringify`. 这可以防止你的应用程序渲染不是由你的应用程序代码直接创建的 JSX。

然而，我们确实创建*了*这些 JSX 节点（在服务器上）并且*确实*希望在客户端上呈现它们。因此，我们需要调整我们的逻辑以“继承”该`$$typeof: Symbol.for("react.element")`属性，尽管它不是 JSON 可序列化的。

幸运的是，这并不难解决。`JSON.stringify`接受一个[替换函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter)，让我们自定义 JSON 的生成方式。在服务器上，我们将`Symbol.for('react.element')`用一个特殊的字符串代替，例如`"$RE"`：

```js
async function sendJSX(res, jsx) {
  // ...
  const clientJSXString = JSON.stringify(clientJSX, stringifyJSX); // Notice the second argument
  // ...
}

function stringifyJSX(key, value) {
  if (value === Symbol.for("react.element")) {
    // We can't pass a symbol, so pass our magic string instead.
    return "$RE"; // Could be arbitrary. I picked RE for React Element.
  } else if (typeof value === "string" && value.startsWith("$")) {
    // To avoid clashes, prepend an extra $ to any string already starting with $.
    return "$" + value;
  } else {
    return value;
  }
}
```

在客户端，我们将传递一个[reviver 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#the_reviver_parameter)以`JSON.parse`替换`"$RE"`为`Symbol.for('react.element')`：

```js
async function fetchClientJSX(pathname) {
  // ...
  const clientJSX = JSON.parse(clientJSXString, parseJSX); // Notice the second argument
  // ...
}

function parseJSX(key, value) {
  if (value === "$RE") {
    // This is our special marker we added on the server.
    // Restore the Symbol to tell React that this is valid JSX.
    return Symbol.for("react.element");
  } else if (typeof value === "string" && value.startsWith("$$")) {
    // This is a string starting with $. Remove the extra $ added by the server.
    return value.slice(1);
  } else {
    return value;
  }
}
```

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/silly-silence-v7lq4p?file=%2Fclient.js%3A1%2C1)**

现在你可以再次在页面之间导航——但是更新是作为 JSX 获取并应用到客户端的！

如果你在输入中键入内容然后单击一个链接，你会注意到`<input>`除了第一个导航之外的所有导航都保留了状态。这是因为我们没有告诉 React 页面的初始 JSX 是什么，因此它无法正确附加到服务器 HTML。

#### 步骤 5.3.2：让我们将初始 JSX 内联到 HTML 中

我们还有这段代码：

```js
const root = hydrateRoot(document, getInitialClientJSX());

function getInitialClientJSX() {
  return null; // TODO
}
```

我们需要将根与初始客户端 JSX 结合起来，但是我们从哪里获得客户端上的 JSX？

我们的页面由服务器呈现为 HTML；然而，为了进一步的导航，我们需要告诉 React 页面的初始 JSX 是什么。在某些情况下，可能可以从 HTML 部分重构，但并非总是如此——尤其是当我们在本系列的下一部分开始添加交互功能时。我们也不想*获取*它，因为它会产生不必要的瀑布。

在使用 React 的传统 SSR 中，你也会遇到类似的问题，但是对于数据。你需要拥有页面的数据，以便组件可以组合并返回它们的初始 JSX。在我们的例子中，到目前为止页面上没有任何组件（至少没有在浏览器中运行的组件），所以不需要运行任何东西——但客户端上也没有知道如何生成初始 JSX 的代码。

为了解决这个问题，我们假设带有初始 JSX 的字符串在客户端上作为全局变量可用：

```js
const root = hydrateRoot(document, getInitialClientJSX());

function getInitialClientJSX() {
  const clientJSX = JSON.parse(window.__INITIAL_CLIENT_JSX_STRING__, reviveJSX);
  return clientJSX;
}
```

在服务器上，我们将修改该`sendHTML`函数以将我们的应用程序*也*呈现给客户端 JSX，并将其内联在 HTML 的末尾：

```js
async function sendHTML(res, jsx) {
  let html = await renderJSXToHTML(jsx);

  // Serialize the JSX payload after the HTML to avoid blocking paint:
  const clientJSX = await renderJSXToClientJSX(jsx);
  const clientJSXString = JSON.stringify(clientJSX, stringifyJSX);
  html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `;
  html += JSON.stringify(clientJSXString).replace(/</g, "\u003c");
  html += `</script>`;
  // ...
```

最后，我们需要对我们为文本节点生成 HTML 的方式进行一些[小的调整](https://codesandbox.io/p/sandbox/vigorous-lichterman-i30pi4?file=%2Fserver.js%3A200%2C1-211%2C17)，以便 React 可以将它们hydrate。

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/vigorous-lichterman-i30pi4?file=%2Fserver.js%3A1%2C1)**

现在你可以输入一个输入，并且它的状态在导航之间不再丢失：

![2](https://fs.lwmc.net/uploads/2023/06/1686917307706-202306162008399.gif)

这就是我们最初设定的目标！当然，保留这个特定输入的状态不是重点——重要的是我们的应用程序现在可以在任何页面上“就地”刷新和导航，而不用担心破坏任何状态。

> 注意：虽然真正的 RSC 实现确实在 HTML 有效负载中对​​ JSX*进行*了编码，但还是有一些重要的区别。生产就绪的 RSC 设置在生成时发送 JSX 块，而不是在最后发送单个大 blob。当 React 加载时，水合可以立即开始——React 开始使用已经可用的 JSX 块遍历树，而不是等待它们全部到达。RSC 还允许你将某些组件标记为*客户端*组件，这意味着它们*仍然*可以通过 SSR 转换为 HTML，但它们的代码*包含*在捆绑包中。对于客户端组件，只有它们的 props 的 JSON 被序列化。将来，React 可能会添加额外的机制来删除 HTML 和嵌入式有效负载之间的重复内容。

## 第 6 步：让我们整理一下

现在我们的代码确实*可以工作了*，我们将把体系结构移动得更接近真正的 RSC。我们仍然不会实现像流式传输这样的复杂机制，但我们会修复一些缺陷并为下一波功能做好准备。

### 步骤 6.1：让我们避免重复工作

再看看[我们是如何生成初始 HTML 的](https://codesandbox.io/p/sandbox/vigorous-lichterman-i30pi4?file=%2Fserver.js%3A118%2C1-119%2C53)：

```js
async function sendHTML(res, jsx) {
  // We need to turn <Router /> into "<html>...</html>" (a string):
  let html = await renderJSXToHTML(jsx);

  // We *also* need to turn <Router /> into <html>...</html> (an object):
  const clientJSX = await renderJSXToClientJSX(jsx);
```

假设`jsx`这里是`<Router url="https://localhost:3000" />`。

首先，我们调用`renderJSXToHTML`，它会在创建 HTML 字符串时递归地调用`Router`和其他组件。但我们还需要发送初始客户端 JSX——所以`renderJSXToClientJSX`在之后立即调用，它*再次*调用`Router`和所有其他组件。我们调用每个组件两次！这不仅速度慢，而且可能不正确——例如，如果我们正在渲染一个`Feed`组件，我们可能会从这些函数中获得不同的输出。我们需要重新考虑数据的流动方式。

如果我们*先生*成客户端 JSX 树呢？

```js
async function sendHTML(res, jsx) {
  // 1. Let's turn <Router /> into <html>...</html> (an object) first:
  const clientJSX = await renderJSXToClientJSX(jsx);
```

至此，我们所有的组件都已执行。然后，让我们从*该*树生成 HTML：

```js
async function sendHTML(res, jsx) {
  // 1. Let's turn <Router /> into <html>...</html> (an object) first:
  const clientJSX = await renderJSXToClientJSX(jsx);
  // 2. Turn that <html>...</html> into "<html>...</html>" (a string):
  let html = await renderJSXToHTML(clientJSX);
  // ...
```

现在每个请求只调用一次组件，这是它们应该调用的。

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/serverless-morning-ith5fg?file=%2Fserver.js)**

### 步骤 6.2：让我们使用 React 呈现 HTML

最初，我们需要一个自定义`renderJSXToHTML`实现，以便我们可以控制它如何执行我们的组件。例如，我们需要`async`为其添加对函数的支持。但是现在我们将预先计算好的客户端 JSX 树传递给它，就没有必要维护自定义实现了。让我们删除它，并使用 React 的内置[`renderToString`](https://react.dev/reference/react-dom/server/renderToString)代替：

```js
import { renderToString } from 'react-dom/server';

// ...

async function sendHTML(res, jsx) {
  const clientJSX = await renderJSXToClientJSX(jsx);
  let html = renderToString(clientJSX);
  // ...
```

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/vigorous-tess-ykpez3?file=%2Fserver.js%3A189%2C1)**

注意与客户端代码的并行。即使我们实现了新功能（如`async`组件），我们仍然能够使用现有的 React API，例如`renderToString`或`hydrateRoot`. 只是我们使用它们的方式不同。

在一个传统的服务器渲染的React应用中，你会用你的根`<App />`组件调用`renderToString`和`hydrateRoot`。但在我们的方法中，我们首先使用`renderJSXToClientJSX`评估 "服务器 "的JSX树，并将其输出传递给React APIs。

*在传统的服务器呈现的 React 应用程序中，组件在*服务器和客户端上的执行方式相同。但在我们的方法中，像`Router`和`BlogIndexPage`之类的组件实际上是`Footer`仅限服务器的 *（* 至少目前是这样）。

就`renderToString`和`hydrateRoot`而言，它几乎就像`Router`，`BlogIndexPage`和`Footer`从来没有存在过一样。到那时，他们已经从树上“融化”了，只留下了他们的输出。

### 步骤 6.3：让我们将服务器一分为二

在上一步中，我们将运行组件与生成 HTML 分离：

-   首先，`renderJSXToClientJSX`运行我们的组件来生成客户端 JSX。
-   然后，React`renderToString`将该客户端 JSX 转换为 HTML。

由于这些步骤是独立的，因此它们不必在同一进程中甚至在同一台机器上完成。  
为了证明这一点，我们将分成`server.js`两个文件：

-   [`server/rsc.js`](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Frsc.js)：此服务器将运行我们的组件。它总是输出 JSX——没有 HTML。如果我们的组件正在访问数据库，那么将此服务器运行在靠近数据中心的位置以降低延迟是有意义的。
-   [`server/ssr.js`](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Fssr.js): 此服务器将生成 HTML。它可以存在于“边缘”，生成 HTML 并提供静态资产。

我们将在我们的中并行运行它们`package.json`：

```
  "scripts": {
    "start": "concurrently "npm run start:ssr" "npm run start:rsc"",
    "start:rsc": "nodemon -- --experimental-loader ./node-jsx-loader.js ./server/rsc.js",
    "start:ssr": "nodemon -- --experimental-loader ./node-jsx-loader.js ./server/ssr.js"
  },
```

在此示例中，它们将位于同一台计算机上，但你可以单独托管它们。

RSC 服务器是呈现我们组件的服务器。它只能提供他们的 JSX 输出：

```js
// server/rsc.js

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    await sendJSX(res, <Router url={url} />);
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode ?? 500;
    res.end();
  }
}).listen(8081);

function Router({ url }) {
  // ...
}

// ...
// ... All other components we have so far ...
// ...

async function sendJSX(res, jsx) {
  // ...
}

function stringifyJSX(key, value) {
  // ...
}

async function renderJSXToClientJSX(jsx) {
  // ...
}
```

另一台服务器是 SSR 服务器。SSR服务器就是我们用户会去访问的服务器。它向 RSC 服务器请求 JSX，然后将该 JSX 作为字符串提供（用于页面之间的导航），或者将其转换为 HTML（用于初始加载）：

```jsx
// server/ssr.js

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/client.js") {
      // ...
    }
    // Get the serialized JSX response from the RSC server
    const response = await fetch("http://127.0.0.1:8081" + url.pathname);
    if (!response.ok) {
      res.statusCode = response.status;
      res.end();
      return;
    }
    const clientJSXString = await response.text();
    if (url.searchParams.has("jsx")) {
      // If the user is navigating between pages, send that serialized JSX as is
      res.setHeader("Content-Type", "application/json");
      res.end(clientJSXString);
    } else {
      // If this is an initial page load, revive the tree and turn it into HTML
      const clientJSX = JSON.parse(clientJSXString, parseJSX);
      let html = renderToString(clientJSX);
      html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `;
      html += JSON.stringify(clientJSXString).replace(/</g, "\u003c");
      html += `</script>`;
      // ...
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    }
  } catch (err) {
    // ...
  }
}).listen(8080);
```

**[在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Fssr.js)**

在整个系列中，我们将保持 RSC 与“世界其他地方”（SSR 和用户计算机）之间的这种分离。在接下来的部分中，当我们开始向这两个世界添加功能并将它们联系在一起时，它的重要性将变得更加清晰。

*（严格来说，在同一进程中运行 RSC 和 SSR 在技术上是可行的，但它们的模块环境必须相互隔离。这是一个高级主题，超出了本文的范围。）*

## 回顾

我们今天完成了！

看起来我们已经写了很多代码，但实际上并没有：

-   [`server/rsc.js`](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Frsc.js)是 160 行代码，其中 80 行是我们自己的组件。
-   [`server/ssr.js`](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Fssr.js)是60行代码。
-   [`client.js`](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fclient.js%3A1%2C1)是60行代码。

通读一遍。为了帮助数据流在我们的脑海中“沉淀”下来，我们来画几张图。

这是第一页加载期间发生的情况：

![A diagram showing the SSR server proxying the request to the RSC server, and then turning the output into HTML with inlined RSC payload](https://fs.lwmc.net/uploads/2023/06/1686917866864-202306162017782.webp)

这是在页面之间导航时发生的情况：

![A diagram showing the SSR server proxying the request to the RSC server, and returning the payload as is so that React can apply the DOM update on the client](https://fs.lwmc.net/uploads/2023/06/1686917797184-202306162016956.webp)

最后，让我们建立一些术语：

-   我们会说**React Server** （或只是大写的 Server） *仅*表示RSC 服务器环境。仅存在于 RSC 服务器上的组件（在此示例中，这是我们目前的所有组件）称为**服务器组件**。
-   我们会说**React Client**（或只是大写的 Client）来表示任何使用 React Server 输出的环境。正如你刚刚看到的，[SSR 是一个 React 客户端](https://github.com/reactwg/server-components/discussions/4)——浏览器也是。*我们还不*支持客户端上的组件——我们接下来会构建它！— 但说我们将称它们为**Client Components**应该不是什么剧透。

## 挑战

如果通读这篇文章还不足以满足你的好奇心，为什么不玩一下[最终代码](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Frsc.js)呢？

以下是你可以尝试的一些想法：

-   为页面添加随机背景色`<body>`，并在背景色上添加过渡效果。当你在页面之间导航时，你应该看到背景颜色动画。
-   在 RSC 渲染器中实现对[片段 ( `<>`)的支持。](https://react.dev/reference/react/Fragment)这应该只需要几行代码，但你需要弄清楚将它们放在哪里以及它们应该做什么。
-   完成后，更改博客以使用`<Markdown>`来自`react-markdown`. 是的，我们现有的代码应该能够处理这个问题！
-   该`react-markdown`组件支持为不同的标签指定自定义实现。例如，你可以制作自己的`Image`组件并将其作为`<Markdown components={{ img: Image }}>`. 编写一个`Image`测量图像尺寸的组件（你可以为此使用一些 npm 包）并自动发出`width`和`height`。
-   在每篇博文中添加评论部分。将评论保存在磁盘上的 JSON 文件中。你将需要使用`<form>`来提交评论。作为额外的挑战，扩展逻辑以`client.js`拦截表单提交并防止重新加载页面。相反，在表单提交后，重新获取页面 JSX，以便评论列表就地更新。
-   目前按下返回按钮总是重新获取新的 JSX。更改其中的逻辑`client.js`，以便后退/前进导航重用以前缓存的响应，但单击链接始终会获取新的响应。这将确保按“后退”和“前进”始终感觉即时，类似于浏览器处理整页导航的方式。
-   当你在两篇不同的博客文章之间导航时，它们的*整个*JSX 都会发生差异。但这并不总是有意义 — 从概念上讲，这是两个*不同的*帖子。例如，如果你开始在其中一个上输入评论，然后点击链接，你不希望仅仅因为输入位于同一位置而保留该评论。你能想办法解决这个问题吗？（提示：你可能希望`Router`通过用一些东西包装 来教会组件将具有不同 URL 的不同页面视为不同的组件`{page}`。然后你需要确保这个“东西”不会在网络中丢失。）
-   我们序列化 JSX 的格式目前非常重复。你对如何让它更紧凑有什么想法吗？你可以查看生产就绪的 RSC 框架，如 Next.js App Router，或我们的[官方非框架 RSC 演示](https://github.com/reactjs/server-components-demo)以获取灵感。即使不实现流，至少以更紧凑的方式表示 JSX 元素也会很好。
-   想象一下，你希望在此代码中添加对客户端组件的支持。你会怎么做？你会从哪里开始？

玩得开心！
