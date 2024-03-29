---
date: 2022-04-14
category:
- Node
---
# Node 笔记（9）深入事件循环

## 阻塞IO和非阻塞IO

操作系统为我们提供了阻塞式调用和非阻塞式调用：

- **阻塞式调用：** 调用结果返回之前，当前线程处于阻塞态（阻塞态CPU是不会分配时间片的），调用线程只有 在得到调用结果之后才会继续执行。
- **非阻塞式调用：** 调用执行之后，当前线程不会停止执行，只需要过一段时间来检查一下有没有结果返回即可。

所以我们开发中的很多耗时操作，都可以基于这样的 非阻塞式调用：

- 比如网络请求本身使用了Socket通信，而Socket本身提供了select模型，可以进行非阻塞方式的工作；
- 比如文件读写的IO操作，我们可以使用操作系统提供的基于事件的回调机制；

## 非阻塞IO的问题

但是非阻塞IO也会存在一定的问题：我们并没有获取到需要读取（我们以读取为例）的结果，那么就意味着为了可以知道是否读取到了完整的数据，我们需要频繁的去确定读取到的数据是否是完整的；**这个过程我们称之为轮询操作；**

**那么这个轮询的工作由谁来完成呢？**

libuv提供了一个线程池（Thread Pool）：

- 线程池会负责所有相关的操作，并且会通过轮训等方式等待结果；
- 当获取到结果时，就可以将对应的回调放到事件循环（某一个事件队列）中；
- 事件循环就可以负责接管后续的回调工作，告知JavaScript应用程序执行对应的回调函数；

## 阻塞和非阻塞，同步和异步的区别

**阻塞和非阻塞是对于被调用者来说的**，在我们这里就是系统调用，操作系统为我们提供了阻塞调用和非阻塞调用。

**同步和异步是对于调用者来说的，**如果我们在发起调用之后，不会进行其他任何的操作，只是等待结果，这个过程就称之为同步调用；如果我们再发起调用之后，并不会等待结果，继续完成其他的工作，等到有回调时再去执行，这个过程就是 异步调用

Libuv采用的就是非阻塞异步IO的调用方式

## Node事件循环的阶段

一次完整的事件循环Tick分成很多个阶段：

- **定时器（Timers）**：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
- **待定回调（Pending Callback）**：对某些系统操作（如TCP错误类型）执行回调，比如TCP连接时接收到ECONNREFUSED。
- **idle, prepare：**仅系统内部使用。
- **轮询（Poll）：**检索新的 I/O 事件；执行与 I/O 相关的回调；
- **检测：**setImmediate() 回调函数在这里执行。
- **关闭的回调函数：**一些关闭的回调函数，如：socket.on('close', ...)。

![image-20220410145058029](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204101450106.png)

### Node的微任务和宏任务

我们会发现从一次事件循环的Tick来说，Node的事件循环更复杂，它也分为微任务和宏任务：

- 宏任务（macrotask）：setTimeout、setInterval、IO事件、setImmediate、close事件；
- 微任务（microtask）：Promise的then回调、process.nextTick、queueMicrotask；

**Node中的事件循环不只是 微任务队列和 宏任务队列：**

微任务队列：

- next tick queue：process.nextTick；
- other queue：Promise的then回调、queueMicrotask；

宏任务队列：

- timer queue：setTimeout、setInterval；
- poll queue：IO事件；
- check queue：setImmediate；
- close queue：close事件；
