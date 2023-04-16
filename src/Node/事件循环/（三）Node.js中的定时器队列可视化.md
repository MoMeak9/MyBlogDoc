# （三）Node.js中的定时器队列可视化

![img](https://fs.lwmc.net/uploads/2023/04/1681119608252-202304101740033.webp)

> **原文：**[Visualizing The Timer Queue in Node.js Event Loop](https://www.builder.io/blog/visualizing-nodejs-timer-queue)
>
> **作者：**[VISHWAS GOPINATH](https://twitter.com/CodevolutionWeb)

欢迎阅读我们关于可视化 Node.js 事件循环系列的第三篇文章。在上一篇文章中，我们探讨了微任务队列及其在执行异步代码时的优先级顺序。在本文中，我们将讨论 Timer Queue，这是 Node.js 中用于处理异步代码的另一个队列。

在深入了解定时器队列之前，让我们快速回顾一下微任务队列。要将回调函数排队到 Microtask 队列中，我们使用`process.nextTick()`和等函数`Promise.resolve()`。在 Node.js 中执行异步代码时，Microtask Queue 具有最高优先级。

## 回调函数排序

现在让我们继续讨论定时器队列。要将回调函数排队到定时器队列中，我们可以使用`setTimeout`和等函数`setInterval`。出于这篇博文的目的，我们将使用`setTimeout`.

为了理解定时器队列中的执行顺序，让我们进行一系列实验。我们将在 Microtask Queue 和 Timer Queue 中对任务进行排队。

### 实验三

```js
// index.js
setTimeout(() => console.log("this is setTimeout 1"), 0);
setTimeout(() => console.log("this is setTimeout 2"), 0);
setTimeout(() => console.log("this is setTimeout 3"), 0);

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

该代码包含对 的三个调用`process.nextTick()`和对 的三个调用`Promise.resolve()`以及对 的三个调用`setTimeout`。每个回调函数记录一条适当的消息。这三个`setTimeout`调用的延迟均为`0ms`，这意味着一旦`setTimeout`在调用堆栈上执行每个语句，回调函数就会排队。第二个`process.nextTick()`，第二个`Promise.resolve()`有一个额外的`process.nextTick()`语句，每个都有一个回调函数。

**可视化**

<video autoplay="autoplay" src="https://cdn.builder.io/o/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fc4034ba006d840128b729005183abdf4%2Fcompressed?apiKey=YJIGb4i01jvw0SRdL5Bt&token=c4034ba006d840128b729005183abdf4&alt=media&optimized=true"></video>

当调用堆栈执行所有语句时，我们最终在 nextTick 队列中有三个回调，在 Promise 队列中有三个，在 Timer 队列中有三个。没有进一步的代码要执行，控制进入事件循环。

nextTick 队列的优先级最高，其次是 Promise 队列，然后是 Timer Queue。来自 nextTick 队列的第一个回调被出列并执行，将消息记录到控制台。然后，第二个回调出列并执行，同时记录一条消息。第二个回调包括对 的调用`process.nextTick()`，它向 nextTick 队列添加一个新的回调。执行继续，第三个回调出列并执行，同时记录一条消息。最后，新添加的回调出列并在调用堆栈上执行，从而在控制台中产生第四条日志消息。

nextTick 队列为空后，事件循环进入 Promise 队列。第一个回调出列并在调用堆栈上执行，在控制台中打印一条消息。第二个回调具有类似的效果，同样向 nextTick 队列添加了一个回调。Promise 中的第三个回调被执行，产生下一条日志消息。此时，Promise 队列为空，事件循环检查 nextTick 队列是否有新的回调。它会找到一个，这也是通过向控制台记录一条消息来执行的。

现在，两个 Microtask 队列都为空，事件循环移至定时器队列。我们有三个回调，它们中的每一个都在调用堆栈上一个一个地出队和执行。这将打印“setTimeout 1”、“setTimeout 2”和“setTimeout 3”。

### 推论

>  微任务队列中的回调在定时器队列中的回调之前执行。

好了，至此，优先级顺序是nextTick队列，其次是Promise队列，最后是timer队列。现在让我们进行下一个实验。

## 实验四

```js
// index.js
setTimeout(() => console.log("this is setTimeout 1"), 0);
setTimeout(() => {
  console.log("this is setTimeout 2");
  process.nextTick(() =>
    console.log("this is inner nextTick inside setTimeout")
  );
}, 0);
setTimeout(() => console.log("this is setTimeout 3"), 0);

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

第四个实验的代码与第三个基本相同，只有一个例外。传递给第二个`setTimeout`函数的回调函数现在包括对`process.nextTick()`.

**可视化**

<video autoplay="autoplay" src="https://cdn.builder.io/o/assets%2FYJIGb4i01jvw0SRdL5Bt%2F094c1ec47f5a4bac9453d9e50c7ca942%2Fcompressed?apiKey=YJIGb4i01jvw0SRdL5Bt&token=094c1ec47f5a4bac9453d9e50c7ca942&alt=media&optimized=true"></video>

让我们应用我们从之前的实验中学到的知识，并快进到微任务队列中的回调已经被执行的地步。假设我们有三个回调在定时器队列中排队。第一个回调出列并在调用堆栈上执行，导致“setTimeout 1”消息打印到控制台。事件循环继续并运行第二个回调，导致“setTimeout 2”消息被打印到控制台。但是，这也会在 nextTick 队列中排队一个回调函数。

在计时器队列中执行每个回调后，事件循环返回并检查微任务队列。它检查 nextTick 队列并确定需要执行的回调。此回调出队并在调用堆栈上执行，导致“inner nextTick”消息打印到控制台。

现在微任务队列为空，控制权返回到计时器队列，执行最后一个回调，导致控制台中出现“setTimeout 3”消息。

### 推论

>  微任务队列中的回调在定时器队列中的回调执行之间执行

## 实验五

```jsx
// index.js
setTimeout(() => console.log("this is setTimeout 1"), 1000);
setTimeout(() => console.log("this is setTimeout 2"), 500);
setTimeout(() => console.log("this is setTimeout 3"), 0);
```

该代码包含三个`setTimeout`语句，将三个不同的回调函数排队。第一个`setTimeout`有 1000 毫秒的延迟，第二个有 500 毫秒的延迟，第三个有 0 毫秒的延迟。回调函数在执行时只是将一条消息记录到控制台。

我们将跳过此实验的可视化，因为代码片段的执行非常简单。当进行多个`setTimeout`调用时，事件循环首先将延迟最短的一个排队，然后在其他调用之前执行。结果，我们观察到“setTimeout 3”首先执行，然后是“setTimeout 2”，然后是“setTimeout 1”。

### 推论

定时器队列回调以先进先出 (FIFO) 的顺序执行。

## 结论

实验表明，Microtask Queue中的回调比Timer Queue中的回调具有更高的优先级，并且Microtask Queue中的回调是在Timer Queue中的回调执行之间执行的。定时器队列遵循先进先出 (FIFO) 的顺序。

## 继续阅读

第1部分：Node.js事件循环实现可视化

第2部分：Node.js中的nextTick和Promise队列可视化

第3部分：Node.js中的定时器队列可视化

第4部分：Node.js事件循环中的I/O队列可视化