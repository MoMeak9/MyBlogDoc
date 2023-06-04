# （四）Node.js事件循环中的I/O队列可视化

![img](https://fs.lwmc.net/uploads/2023/04/1681119832702-202304101743504.webp)

> **原文：**[Visualizing the I/O Queue in the Node.js Event Loop](https://www.builder.io/blog/visualizing-nodejs-io-queue#visualization)
>
> **作者：**[VISHWAS GOPINATH](https://twitter.com/CodevolutionWeb)

欢迎阅读我们关于 Node.js 事件循环可视化系列的第四篇文章。在上一篇文章中，我们探讨了定时器队列及其在执行异步代码时的优先级顺序。在本文中，我们将深入研究输入/输出队列，这是另一个在事件循环中起着至关重要作用的队列。

在我们深入 I/O 队列之前，让我们快速回顾一下微任务 Microtask 和计时器 Timer 队列。要将回调函数添加到 Microtask 队列中，我们使用`process.nextTick()`和等函数`Promise.resolve()`。

在 Node.js 中执行异步代码时，Microtask 队列具有最高优先级。要将回调函数添加到 Timer 计时器队列中，我们使用`setTimeout()`和等函数`setInterval()`。

## 回调函数排序

要向 I/O 队列添加回调函数，我们可以使用内置 Node.js 模块中的大多数异步方法。对于我们的实验，我们将使用`fs`模块中的`readFile()`方法。

> 前五个实验处理 Microtask 和 Timer 队列，在前两篇文章中已经介绍过。所有实验都使用 CommonJS 模块格式运行。

## 实验六

```javascript
// index.js
const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("this is readFile 1");
});

process.nextTick(() => console.log("this is process.nextTick 1"));
Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
```

首先，我们导入`fs`模块并调用它的`readFile()`方法。这会向输入/输出队列添加一个回调函数。之后进行`readFile()`，我们在队列中添加一个回调函数`nextTick`，在Promise队列中添加一个回调函数。

![1](https://fs.lwmc.net/uploads/2023/04/1682435233676-202304252307444.gif)

执行完调用栈中的所有语句后，nextTick 队列、Promise 队列和 I/O 队列各有一个回调。由于没有进一步的代码要执行，开始进入事件循环。

队列`nextTick`具有最高优先级，其次是`Promise`队列，然后是 I/O 队列。nextTick 队列中的第一个回调被出列并执行，将消息记录到控制台。

队列为`nextTick`空时，事件循环进入 Promise 队列。回调出列并在调用堆栈上执行，将消息打印到控制台。

由于 Promise 队列现在是空的，事件循环继续到定时器队列。定时器队列中没有回调，事件循环进入 I/O 队列，它有一个回调。此回调已出队并执行，从而在控制台上生成最终日志消息。

### 推理

> 微任务队列中的回调在 I/O 队列中的回调之前执行。



对于我们的下一个实验，让我们将 Microtask 队列与 Timer 队列交换。

## 实验七

```javascript
// index.js
const fs = require("fs");

setTimeout(() => console.log("this is setTimeout 1"), 0);

fs.readFile(__filename, () => {
  console.log("this is readFile 1");
});
```

该代码涉及使用具有 0 秒延迟的 Timer 队列的`setTimeout()`排序，而不是 Microtask 队列。

乍一看，预期的输出似乎很简单：`setTimeout()`回调在回调之前执行`readFile()`。然而，事情并非如此简单。这是运行同一段代码五次的输出。

<img src="https://fs.lwmc.net/uploads/2023/04/1681119979950-202304101746775.webp" alt="每次代码运行时，控制台日志显示 setTimeout 和 readFile 以不同的顺序记录。" style="zoom:67%;" />

`setTimeout()`这种输出不一致的发生是由于使用延迟 0 毫秒和 I/O 异步方法时执行顺序的不可预测性。出现的明显问题是，“为什么不能保证执行顺序？”

<u>异常是由于如何为计时器设置最小延迟。在[DOMTimer 的 C++ 代码](https://chromium.googlesource.com/chromium/blink/+/master/Source/core/frame/DOMTimer.cpp#93)中，我们遇到了一段非常有趣的代码。以毫秒为单位计算间隔，但计算上限为 1 毫秒或用户传递的间隔乘以 1 毫秒。</u>

<u>这意味着如果我们传入 0 毫秒，则间隔设置为 max(1,0)，即 1。这将导致 setTimeout 延迟 1 毫秒。似乎 Node.js 遵循类似的实现。当你设置 0 毫秒延迟时，它会被覆盖为 1 毫秒延迟。</u>

但是 1ms 的延迟如何影响两个日志语句的执行顺序？

![2](https://fs.lwmc.net/uploads/2023/04/1682435242923-202304252307704.gif)

在事件循环开始时，Node.js 需要确定 1ms 计时器是否已经过去。如果事件循环在 0.05 毫秒时进入定时器队列并且 1 毫秒回调尚未排队，控制将移至 I/O 队列，执行回调`readFile()`。在事件循环的下一次迭代中，定时器队列回调将被执行。

![3](https://fs.lwmc.net/uploads/2023/04/1682435248403-202304252307116.gif)

另一方面，如果 CPU 很忙并在 1.01 ms 时进入定时器队列，则定时器将超时并执行回调函数。然后控制将进入 I/O 队列，回调`readFile() `将被执行。

由于 CPU 会有多忙以及 0ms 延迟被覆盖为 1ms 延迟的不确定性，我们永远无法保证 0ms 计时器和 I/O 回调之间的执行顺序。

### 推理

> 当`setTimeout()`以 0ms 延迟和 I/O 异步方法运行时，执行顺序永远无法保证。



接下来我们回顾一下回调在Microtask队列、Timer队列、I/O队列中的执行顺序。

## 实验八

```javascript
// index.js
const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("this is readFile 1");
});

process.nextTick(() => console.log("this is process.nextTick 1"));
Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
setTimeout(() => console.log("this is setTimeout 1"), 0);

for (let i = 0; i < 2000000000; i++) {}
```

该代码包括多个调用，这些调用在不同队列中对回调函数进行排队。调用`readFile()`将回调函数放入 I/O 队列中，`process.nextTick()`调用将其放入 nextTick 队列中，`Promise.resolve().then()`调用将其放入`Promise` 队列中，调用将 `setTimeout()` 其放入定时器队列中。

为了避免之前实验中的任何计时器问题，我们添加了一个不执行任何操作的 for 循环。这确保当控件进入定时器队列时，定时器`setTimeout()`已经过去，回调已准备好执行。

![4](https://fs.lwmc.net/uploads/2023/04/1682435256852-202304252307663.gif)

对于可视化执行顺序，让我们逐步分解代码中发生的事情。当调用堆栈执行所有语句时，我们最终在队列中有一个回调`nextTick`，一个在`Promise`队列中，一个在定时器队列中，一个在 I/O 队列中。

由于没有进一步的代码可执行，控制进入事件循环。来自队列的第一个回调`nextTick`被出列并执行，将消息记录到控制台。现在 nextTick 队列为空，事件循环进入 Promise 队列。回调函数出列并在调用堆栈上执行，在控制台中打印一条消息。

此时Promise队列为空，事件循环进入定时器队列。回调函数出列并执行。最后，事件循环进入 I/O 队列，我们有一个回调出队并执行，从而在控制台中产生最终日志消息。

### 推理

>  I/O 队列回调在 Microtask 队列回调和 Timer 队列回调之后执行。

## 结论

实验表明，Input/Output Queue中的回调是在Microtask队列中的回调和Timer队列中的回调之后执行的。当以 0 毫秒延迟和 I/O 异步方法运行 setTimeout() 时，执行顺序取决于 CPU 的繁忙程度。

## 继续阅读

第1部分：Node.js事件循环实现可视化

第2部分：Node.js中的nextTick和Promise队列可视化

第3部分：Node.js中的定时器队列可视化

第4部分：Node.js事件循环中的I/O队列可视化# 在 Node.js 事件循环中可视化 I/O 轮询