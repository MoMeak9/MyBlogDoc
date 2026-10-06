# （二）Node.js中的nextTick和Promise队列可视化

![img](https://fs.lwmc.net/uploads/2023/04/1681118974425-202304101729278.webp)

>**原文：**[Visualizing nextTick and Promise Queues in Node.js Event Loop](https://www.builder.io/blog/NodeJS-visualizing-nextTick-and-promise-queues)
>
>**作者：**[VISHWAS GOPINATH](https://twitter.com/CodevolutionWeb)

欢迎阅读可视化 Node.js 事件循环系列的第二篇文章。在 [第一篇文章](https://www.builder.io/blog/visual-guide-to-nodejs-event-loop)中，我们了解到事件循环是 Node.js 的重要组成部分，它有助于协调同步和异步代码的执行。

它由六个不同的队列组成。一个`nextTick`队列和一个承诺队列（在本系列文章中称为微任务队列）、一个定时器队列、一个 I/O 队列、一个检查队列，最后是一个关闭队列。

在每个循环中，回调函数在适当的时候出列并在调用堆栈上执行。从这篇文章开始，让我们运行一些实验来确保我们对事件循环的可视化是正确的。

对于我们的第一组实验，我们将专注于`nextTick`队列和`promise`队列。但在我们深入实验之前，让我们首先了解如何在每个队列中排队回调函数。

## 回调函数排序

要在队列中加入回调函数`nextTick`，我们使用内置`process.nextTick()`方法。语法很简单：`process.nextTick(callbackFn)`. 当这个方法在调用栈上执行时，回调函数会被入队到队列中`nextTick`。

要在 promise 队列中加入回调函数，我们将使用`Promise.resolve().then(callbackFn)`. 当承诺解决时，传递到`then()`块中的函数将在承诺队列中排队。

现在我们了解了如何向两个队列添加回调函数，让我们开始我们的第一个实验。

> 所有实验均以 CommonJS 模块格式进行。

## 实验一

```javascript
// index.js
console.log("console.log 1");
process.nextTick(() => console.log("this is process.nextTick 1"));
console.log("console.log 2");
```

在这里，我们有一小段代码记录了三个不同的语句。第二条语句使用方法`process.nextTick()`将回调函数加入队列`nextTick`。

<video autoplay="autoplay" loop="" src="https://cdn.builder.io/o/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fb32c606155c14ecfa60c8dc102f3bcf0%2Fcompressed?apiKey=YJIGb4i01jvw0SRdL5Bt&token=b32c606155c14ecfa60c8dc102f3bcf0&alt=media&optimized=true"></video>

第一条`console.log()`语句通过被压入调用堆栈来执行。它在控制台中记录相应的消息，然后从堆栈中弹出。

接下来，`process.nextTick()`在调用堆栈上执行。这会将回调函数排队到 nextTick 队列中并弹出。由于还有用户编写的代码要执行，回调函数必须等待轮到它。

执行继续进行，最后一条`console.log()`语句被压入堆栈。消息被记录到控制台，函数从堆栈中弹出。现在，不再有用户编写的同步代码要执行，因此控制权进入事件循环。

来自 nextTick 队列的回调函数被压入堆栈，`console.log()`被压入堆栈，执行，并将相应的消息记录到控制台。

### 推论

> 所有用户编写的同步 JavaScript 代码都优先于运行时最终要执行的异步代码。

让我们继续进行第二个实验。

## 实验二

```javascript
// index.js
Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
process.nextTick(() => console.log("this is process.nextTick 1"));
```

我们一通电话`Promise.resolve().then()`和一通电话`process.nextTick()`。

<video autoplay="autoplay" loop="" src="https://cdn.builder.io/o/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fbaa7c934557948b2894c8689ef203482%2Fcompressed?apiKey=YJIGb4i01jvw0SRdL5Bt&token=baa7c934557948b2894c8689ef203482&alt=media&optimized=true"></video>

当调用堆栈执行第 1 行时，它会将回调函数放入队列中`Promise`。

当调用堆栈执行第 2 行时，它会将回调函数放入队列中`nextTick`。

第 2 行之后不再有用户编写的代码要执行。

控制进入事件循环，其中`nextTick`队列优先于承诺队列（这就是 Node.js 运行时的工作方式）。

事件循环执行`nextTick `队列回调函数，然后执行 promise 队列回调函数。

控制台显示“这是 process.nextTick 1”，然后是“这是 Promise.resolve 1”。

## 额外实验🧪

```javascript
// index.js
process.nextTick(() => console.log("this is process.nextTick 1"));
process.nextTick(() => {
  console.log("this is process.nextTick 2");
  process.nextTick(() =>
    console.log("this is the inner next tick inside next tick")
  );
});
process.nextTick(() => console.log("this is process.nextTick 3"));

Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
Promise.resolve().then(() => {
  console.log("this is Promise.resolve 2");
  process.nextTick(() =>
    console.log("this is the inner next tick inside Promise then block")
  );
});
Promise.resolve().then(() => console.log("this is Promise.resolve 3"));
```

该代码包含三个调用`process.nextTick()`和三个调用语句`Promise.resolve()`。每个回调函数记录一条适当的消息。

但是，second`process.nextTick()`和 second`Promise.resolve()`有一个额外的`process.nextTick()`语句，每个语句都有一个回调函数。

<video autoplay="autoplay" loop="" src="https://cdn.builder.io/o/assets%2FYJIGb4i01jvw0SRdL5Bt%2Ffe593c783f86498f88a92a85eee9c3c8%2Fcompressed?apiKey=YJIGb4i01jvw0SRdL5Bt&token=fe593c783f86498f88a92a85eee9c3c8&alt=media&optimized=true"></video>

为了加快对此可视化的解释，我将省略调用堆栈。当调用堆栈执行完所有 6 个语句时，队列中有 3 个回调`nextTick`，promise 队列中有 3 个。没有什么可执行的，控制进入事件循环。

众所周知，`nextTick`队列获得优先权。执行第一个回调，并将相应的消息记录到控制台。

接下来，执行第二个回调函数，记录第二条日志语句。但是，此回调函数包含对 的另一个调用`process.nextTick()`，它将内部日志语句排入队列末尾`nextTick`。

Node 然后执行第三个`nextTick`回调，将相应的消息记录到控制台。最初，只有三个回调，但第二个回调向队列中添加了另一个回调，现在轮到它了。

事件循环推送内部`nextTick`回调，并`console.log()`执行语句。

队列`nextTick`是空的，并且控制继续到 promise 队列。Promise 队列类似于队列`nextTick`。

首先，记录“Promise.resolve 1”，然后记录“Promise.resolve 2”。`nextTick`但是，通过调用将一个函数添加到队列中`process.nextTick()`。尽管如此，控制权仍保留在承诺队列中并继续执行其他回调函数。然后我们得到 Promise.resolve 3，此时，promise 队列为空。

Node 将再次检查微任务队列中是否有新的回调。由于队列中有一个`nextTick`，它会执行它，这会产生我们的最后一条日志语句。

这可能是一个稍微高级的实验，但推论是一样的。

### 推论

>  **队列中的所有回调都**`nextTick`**在 promise 队列中的所有回调之前执行。**

使用时要小心`process.nextTick()`。过度使用此方法会导致事件循环变得饥饿starved，从而阻止队列的其余部分运行。即使有大量`nextTick()`调用，也可以阻止 I/O 队列执行它自己的回调。官方文档建议使用`process.nextTick()`有两个主要原因：处理错误或允许回调在调用堆栈展开之后但在事件循环继续之前运行。使用时`process.nextTick()`，一定要谨慎使用。

### 额外实验

实验表明，所有用户编写的同步 JavaScript 代码都优先于运行时希望最终执行的异步代码，并且队列中的所有回调都在`nextTick`promise 队列中的所有回调之前执行。

## 继续阅读

第1部分：Node.js事件循环实现可视化

第2部分：Node.js中的nextTick和Promise队列可视化

第3部分：Node.js中的定时器队列可视化

第4部分：Node.js事件循环中的I/O队列可视化
