---
date: 2022-10-31
category:
- JavaScript
---
# 页面生命周期：DOMContentLoaded, load, beforeunload, unload

HTML页面的生命周期有以下三个重要事件：

- `DOMContentLoaded` —— 浏览器已经完全加载了 HTML，DOM 树已经构建完毕，但是像是 `<img>` 和样式表等外部资源可能并没有下载完毕。
- `load` —— 浏览器已经加载了所有的资源（图像，样式表等）。
- `beforeunload/unload` —— 当用户离开页面的时候触发。

每个事件都有特定的用途

- `DOMContentLoaded` —— **DOM 加载**完毕，所以 JS 可以访问所有 DOM 节点，初始化界面。
- `load` —— **附加资源**已经加载完毕，可以在此事件触发时获得图像的大小（如果没有被在 HTML/CSS 中指定）
- `beforeunload/unload` —— 用户正在离开页面：可以询问用户是否保存了更改以及是否确定要离开页面。

## DOMContentLoaded

`DOMContentLoaded` 由 `document` 对象触发。

我们使用 `addEventListener` 来监听它：

```js
document.addEventListener("DOMContentLoaded", ready);
```

举个例子

```js
<script>
  function ready() {
    alert('DOM is ready');

    // image is not yet loaded (unless was cached), so the size is 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

  document.addEventListener("DOMContentLoaded", ready);
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

在这个例子中 `DOMContentLoaded` 在 document 加载完成后就被触发，无需等待其他资源的载入，所以 `alert` 输出的图像的大小为 0。

这么看来 `DOMContentLoaded` 似乎很简单，DOM 树构建完毕之后就运行该事件，不过其实存在一些陷阱。

### DOMContentLoaded 和 JS 脚本

当浏览器在解析 HTML 页面时遇到了 `<script>...</script>` 标签，将无法继续构建DOM树（译注：UI 渲染线程与 JS 引擎是互斥的，当 JS 引擎执行时 UI 线程会被挂起），必须立即执行脚本。所以 `DOMContentLoaded` 有可能在所有脚本执行完毕后触发。

外部脚本（带 `src` 的）的加载和解析也会暂停DOM树构建，所以 `DOMContentLoaded` 也会等待外部脚本。

不过有两个例外是带 `async` 和 `defer` 的外部脚本，他们告诉浏览器继续解析而不需要等待脚本的执行，所以用户可以在脚本加载完成前可以看到页面，有较好的用户体验。

`async` 和 `defer` 属性仅仅对外部脚本起作用，并且他们在 `src` 不存在时会被自动忽略。

它们都告诉浏览器继续处理页面上的内容，而在后台加载脚本，然后在脚本加载完毕后再执行。所以脚本不会阻塞DOM树的构建和页面的渲染。

**区别：**

|         | 顺序                                                         | `DOMContentLoaded`                                           |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `async` | **加载优先顺序**。脚本在文档中的顺序不重要 —— 先加载完成的先执行 | 不相关。可能在文档加载完成前加载并执行完毕。如果脚本很小或者来自于缓存，同时文档足够长，就会发生这种情况。 |
| `defer` | **文档顺序**（它们在文档中的顺序）                           | 在文档加载和解析完成之后（如果需要，则会等待），即在 `DOMContentLoaded` 之前执行。 |

> 表格参照：https://zh.javascript.info/script-async-defer

### DOMContentLoaded 与样式表

外部样式表并不会阻塞 DOM 的解析，所以 `DOMContentLoaded` 并不会被它们影响。

不过仍然有一个陷阱：如果在样式后面有一个内联脚本，那么脚本必须等待样式先加载完。简单来说，JS 因为有可能会去获取 DOM 的样式，所以 JS 会等待样式表加载完毕，而 JS 是阻塞 DOM 的解析的，所以在有外部样式表的时候，JS 会一直阻塞到外部样式表下载完毕，所以，这直接影响DOMContentLoaded的完成。

```js
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // 脚本直到样式表加载完毕后才会执行。
  alert(getComputedStyle(document.body).marginTop);
</script>
```

发生这种事的原因是脚本也许会像上面的例子中所示，去得到一些元素的坐标或者基于样式的属性。所以他们自然要等到样式加载完毕才可以执行。

`DOMContentLoaded `需要等待脚本的执行，脚本又需要等待样式的加载。

### 浏览器的自动补全

Firefox, Chrome 和 Opera 会在 `DOMContentLoaded` 执行时自动补全表单。

例如，如果页面有登录的界面，浏览器记住了该页面的用户名和密码，那么在 `DOMContentLoaded` 运行的时候浏览器会试图自动补全表单（如果用户设置允许）。

所以如果 `DOMContentLoaded` 被一个需要长时间执行的脚本阻塞，那么自动补全也会等待。你也许见过某些网站（如果你的浏览器开启了自动补全）—— 浏览器并不会立刻补全登录项，而是等到整个页面加载完毕后才填充。这就是因为在等待 `DOMContentLoaded` 事件。

> defer脚本一定是在DOMContentLoaded事件前执行。

`defer` 是会阻塞 `DOMContentLoaded` 的，被 `defer` 的脚本要在 `DOMContentLoaded` 触发前执行，所以如果HTML很快就加载完了（先不考虑 CSS 阻塞 `DOMContentLoaded` 的情况），而 `defer` 的脚本还没有加载完，浏览器就会等，等到脚本加载完，执行完，再触发 `DOMContentLoaded`，放上一张图（取自在 devTool 下分析自己写的一个页面）

[![image](https://cdn.yihuiblog.top/images/202210302046112.png)](https://user-images.githubusercontent.com/12322740/35795637-bb7d438c-0a94-11e8-9fd6-71bfe1b99b32.png)

可以看到，HTML很快就加载和解析完毕（CSS 在这里是动态加载的，不阻塞 `DOMContentLoaded`），jQuery 和main.js 的脚本是 `defer` 的， `DOMContentLoaded`（蓝线）一直在等，等到这两个脚本下载完并执行完，才触发了 `DOMContentLoaded`。
从这个角度看来，`defer` 和把脚本放在 `</body>` 前真是没啥区别，只不过 `defer` 脚本位 于`head `中，更早被读到，加载更早，而且不担心会被其他的脚本推迟下载开始的时间。

## window.onload

`window` 对象上的 `onload` 事件在所有文件包括样式表，图片和其他资源下载完毕后触发。

下面的例子正确检测了图片的大小，因为 `window.onload` 会等待所有图片的加载。

```js
<script>
  window.onload = function() {
    alert('Page loaded');

    // image is loaded at this time
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

用户离开（关闭）页面的时候，`window` 对象上的 `unload` 事件会被触发，我们可以做一些不存在延迟的事情，比如关闭弹出的窗口，可是我们无法阻止用户转移到另一个页面上。

所以我们需要使用另一个事件 — `onbeforeunload`。

## window.onbeforeunload

如果用户即将离开页面或者关闭窗口时，`beforeunload` 事件将会被触发以进行额外的确认。

浏览器将显示返回的字符串，举个例子：

```js
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
```

有些浏览器像 **Chrome 和火狐**会忽略返回的字符串取而代之显示浏览器自身的文本，这是为了安全考虑，来保证用户不受到错误信息的误导。

## readyState

如果我们在整个页面加载完毕后设置 `DOMContentLoaded` 会发生什么呢？

啥也没有，`DOMContentLoaded` 不会被触发。

**`document.readyState `属性给了我们加载的信息**，有三个可能的值：

- `loading` 加载 —— document仍在加载。
- `interactive` 互动 —— 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
- `complete` —— 文档和所有子资源已完成加载。状态表示 `load` 事件即将被触发。

所以我们可以检查 `document.readyState` 的状态，如果没有就绪可以选择挂载事件，如果已经就绪了就可以直接立即执行。

像这样：

```
function work() { /*...*/ }

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', work);
} else {
  work();
}
```

每当文档的加载状态改变的时候就有一个 `readystatechange` 事件被触发，所以我们可以打印所有的状态。

```js
// current state
console.log(document.readyState);

// print state changes
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

`readystatechange` 是追踪页面加载的一个可选的方法，很早之前就已经出现了。不过现在很少被使用了，为了保持完整性还是介绍一下它。

`readystatechange` 的在各个事件中的执行顺序又是如何呢？

```js
<script>
  function log(text) { /* output the time and message */ }
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

输出如下:

1. `[1] initial readyState:loading`
2. `[2] readyState:interactive`
3. `[2] DOMContentLoaded`
4. `[3] iframe onload`
5. `[4] readyState:complete`
6. `[4] img onload`
7. `[4] window onload`

方括号中的数字表示他们发生的时间，真实的发生时间会更晚一点，不过相同数字的时间可以认为是在同一时刻被按顺序触发（误差在几毫秒之内）

- `document.readyState` 在 `DOMContentLoaded` 前一刻变为 `interactive`，这两个事件可以认为是同时发生。
- `document.readyState` 在所有资源加载完毕后（包括 `iframe` 和 `img`）变成 `complete`，我们可以看到`complete`、 `img.onload` 和 `window.onload` 几乎同时发生，区别就是 `window.onload` 在所有其他的 `load` 事件之后执行。

## 总结

- 当 DOM 准备就绪时，`document` 上的 `DOMContentLoaded` 事件就会被触发。在这个阶段，我们可以将 JavaScript 应用于元素。
  - 诸如 `<script>...</script>` 或 `<script src="..."></script>` 之类的脚本会阻塞 `DOMContentLoaded`，浏览器将等待它们执行结束，`async` 不在此列，但`defer`在此之前执行。
  - 图片和其他资源仍然可以继续被加载。
- `load` 事件在页面所有资源被加载完毕后触发，通常我们不会用到这个事件，因为我们不需要等那么久。
- `beforeunload` 在用户即将离开页面时触发，它返回一个字符串，浏览器会向用户展示并询问这个字符串以确定是否离开。如果我们取消这个事件，浏览器就会询问我们是否真的要离开（例如，我们有未保存的更改）。
- `unload` 在用户已经离开时触发，我们在这个阶段仅可以做一些没有延迟的操作，由于种种限制，很少被使用。在处理程序中，我们只能执行不涉及延迟或询问用户的简单操作。正是由于这个限制，它很少被使用。我们可以使用 `navigator.sendBeacon` 来发送网络请求。

- `document.readyState`是文档的当前状态，可以在`readystatechange` 事件中跟踪状态更改：
  - `loading` —— 文档正在被加载。
  - `interactive` —— 文档已被解析完成，与 `DOMContentLoaded` 几乎同时发生，但是在 `DOMContentLoaded` 之前发生。
  - `complete` —— 文档和资源均已加载完成，与 `window.onload` 几乎同时发生，但是在 `window.onload` 之前发生。

> **参考：** 
>
> http://javascript.info/onload-ondomcontentloaded
>
> https://github.com/fi3ework/blog/issues/3
