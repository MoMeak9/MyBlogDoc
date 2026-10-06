# 在 Node.js 事件循环中可视化 I/O 轮询



![img](https://fs.lwmc.net/uploads/2023/04/1682658775557-202304281312618.webp)


> **原文：**[Visualizing the I/O Queue in the Node.js Event Loop](https://www.builder.io/blog/visualizing-nodejs-io-queue#visualization)
>
> **作者：**[VISHWAS GOPINATH](https://twitter.com/CodevolutionWeb)

欢迎阅读我们关于可视化 Node.js 事件循环的系列文章的第五篇。在[上一篇文章](https://www.builder.io/blog/visualizing-nodejs-io-queue)中，我们探讨了 I/O 队列及其在执行异步代码时的优先级顺序。在本文中，我们将继续关注 I/O 队列，同时逐步介绍检查队列。有一点需要注意，我将在下一个实验中解释。

[排队回调函数](https://www.builder.io/blog/visualizing-nodejs-io-polling#enqueueing-callback-functions)

在我们继续实验之前，我想提一下，要在检查队列中加入一个回调函数，我们使用内置函数`setImmediate()`。语法很简单：`setImmediate(callbackFn)`. 当此函数在调用堆栈上执行时，回调函数将入队到检查队列中。

前八个实验涉及微任务、定时器和 I/O 队列，在之前的文章中已经介绍过。所有实验都使用 CommonJS 模块格式运行。

[实验九](https://www.builder.io/blog/visualizing-nodejs-io-polling#experiment-9)

[代码](https://www.builder.io/blog/visualizing-nodejs-io-polling#code)

```javascript
// index.js
const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("this is readFile 1");
});

process.nextTick(() => console.log("this is process.nextTick 1"));
Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
setTimeout(() => console.log("this is setTimeout 1"), 0);
setImmediate(() => console.log("this is setImmediate 1"));

for (let i = 0; i < 2000000000; i++) {}
```

代码片段继续上一个实验。它包括对 的调用`readFile()`，它在 I/O 队列中对回调函数进行排队，对 的调用，它在队列`process.nextTick()`中对回调函数进行排队，`nextTick`对 的调用`Promise.resolve().then()`，它在承诺队列中对回调函数进行排队，以及一个调用`setTimeout()`，它在定时器队列中排队回调函数。

本次实验中引入的调用`setImmediate()`，将回调函数排队到检查队列中。为避免实验 7 中的计时器问题，长时间运行的`for`循环可确保当控件进入计时器队列时，`setTimeout()`计时器已过且回调已准备好执行。

[可视化](https://www.builder.io/blog/visualizing-nodejs-io-polling#visualization)

如果您运行代码片段，您可能会注意到输出不是您所期望的。来自 的回调消息`setImmediate()`在来自 的回调消息之前被记录`readFile()`。这是供参考的输出。

![img](https://fs.lwmc.net/uploads/2023/04/1682658797613-202304281313059.webp)

这可能看起来很奇怪，因为 I/O 队列出现在检查队列之前，但是一旦我们理解了发生在两个队列之间的 I/O 轮询的概念，它就有意义了。为了帮助说明这个概念，让我提供一个可视化。







首先，所有函数都在调用堆栈上执行，导致回调在适当的队列中排队。但是，`readFile()`回调并没有同时排队。让我解释一下为什么。

当控件进入事件循环时，首先检查微任务队列中的回调。在这种情况下，nextTick 队列和 promise 队列中各有一个回调。nextTick 队列具有优先权，因此我们看到首先记录“nextTick 1”，然后是“Promise 1”。

两个队列都是空的，控制移至定时器队列。有一个回调，将“setTimeout 1”记录到控制台。

现在到了有趣的部分。当控件到达 I/O 队列时，我们希望`readFile()`回调出现，对吗？毕竟，我们有一个长时间运行的`for`循环，`readFile()`现在应该已经完成了。

然而，实际上，事件循环必须轮询以检查 I/O 操作是否完成，并且它只对完成的操作回调进行排队。这意味着当控件第一次进入 I/O 队列时，队列仍然是空的。

然后控制进入事件循环的轮询部分，检查`readFile()`任务是否已经完成。`readFile()`确认它有，事件循环现在将关联的回调函数添加到 I/O 队列。然而，执行已经移过 I/O 队列，回调必须等待轮到它执行。

控件然后继续检查队列，在那里找到一个回调。它将“setImmediate 1”记录到控制台，然后开始新的迭代，因为在事件循环的当前迭代中没有其他要处理的内容。

看起来 microtask 和 timer 队列是空的，但是 I/O 队列中有一个回调。回调被执行，“readFile 1”最终被记录到控制台。

这就是为什么我们看到“setImmediate 1”记录在“readFile 1”之前。这种行为实际上也发生在我们之前的实验中，但是我们没有任何进一步的代码可以运行，所以我们没有观察到它。

[推理](https://www.builder.io/blog/visualizing-nodejs-io-polling#inference)

只有在 I/O 完成后才会轮询 I/O 事件并将回调函数添加到 I/O 队列

[结论](https://www.builder.io/blog/visualizing-nodejs-io-polling#conclusion)

一旦 I/O 操作完成，其回调函数不会立即排队到 I/O 队列中。相反，I/O 轮询阶段会检查 I/O 操作的完成情况，并对已完成操作的回调进行排队。这有时会导致在 I/O 队列回调之前执行检查队列回调。

但是，当两个队列都包含回调函数时，I/O 队列中的回调总是优先并首先运行。在设计依赖 I/O 回调的系统以确保回调的正确排序和执行时，了解此行为至关重要。



## 继续阅读

第 1 部分：可视化 Node.js 事件循环
第 2 部分：在 Node.js 中可视化 nextTick 和 Promise 队列
第 3 部分：可视化 Node.js 中的计时器队列
第 4 部分：可视化 Node.js 事件循环中的 I/O 队列
第 5 部分：可视化 Node.js 事件循环中的 I/O 轮询
第 6 部分：可视化 Node.js 事件循环中的检查队列
第 7 部分：可视化 Node.js 事件循环中的关闭队列