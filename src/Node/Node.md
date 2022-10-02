---
date: 2022-04-06
icon: page
---

# Node.js 进程通信

> 由面试题引出的，直接拿我掘金的文章过来吧，[掘金地址 - Node.js 的事件驱动模型和进程通信笔记](https://juejin.cn/post/7129039130025000974)

两个 Node.js 进程之间如何进行通信呢？区分为两种情况：

- 不同计算机上的两个Node.js进程间的通信
- 同计算机上的两个Node.js进程间的通信

针对第一种，我们使用TCP 套接字（socket）亦或是使用 HTTP 协议就可以进行实现，而第二种是着重讲解的部分

## Node的事件驱动模型说起

为了解决高并发问题，基于事件驱动的服务模型出现了，像Node与Nginx均是基于事件驱动的方式实现的，采用单线程避免了不必要的内存开销和上下文切换开销。

> Nginx的服务原理类似，Node采用事件驱动的运行方式。不过Nginx是多进程单线程，而Node通过事件驱动的方式处理请求时无需为每一个请求创建额外的线程。在事件驱动的模型当中，每一个IO工作被添加到事件队列中，线程循环地处理队列上的工作任务，当执行过程中遇到来堵塞(读取文件、查询时，线程不会停下来等待结果，而是留下一个处理结果的回调函数，转而继续执行队列中的下一个任务。这个传递到队列中的回调函数在堵塞任务运行结束后才被线程调用......


![image.png](https://cdn.yihuiblog.top/images/202209231635216.png)

**讲人话就是：**

-  Node是一个单线程的，采用事件驱动和异步回调的机制。在执行代码的时候，主线程从上往下依次执行，遇到有需要回调的地方，就将此处加入到事件队列中，然后主线程继续往下走，直到运行结束以后，才去执行事件队列中的回调。
-  当执行过程中遇到I/O阻塞(读取文件、查询数据库、请求套接字、访问远程服务等)时，事件循环线程不会停下等待结果，转而继续执行队列中的下一个任务，不会在事件循环线程中执行。在函数执行时，Node.js在事件队列中放置回调函数,它的顺序根据函数的完成快慢决定。

好，我们点到为止。

## Node如何创建子进程？

child_process模块给予Node可以随意创建子进程（child_process）的能力。它提供了4个方法用于创建子进程：

### spawn() 方法
spawn()启动一个子进程来执行命令，child_process.spawn 使用指定的命令行参数创建新进程，语法格式如下：

```js
child_process.spawn(command[, args][, options])
```

spawn() 方法返回流 (stdout & stderr)，在进程返回大量数据时使用。进程一旦开始执行时 spawn() 就开始接收响应。

### exec() 方法
启动一个子进程来执行命令，与spawn()不同的是其接口不同，它能够缓存子进程的输出、并且有一个回调函数获知子进程的状况。语法如下所示：

```js
child_process.exec(command[, options], callback)
```

exec() 方法返回最大的缓冲区，并等待进程结束，一次性返回缓冲区的内容。

### execFile()方法

启动一个子进程来执行可执行文件。

```js
child_process.execFile(file[, args][, options][, callback])
```

该`child_process.execFile()`功能类似于[`child_process.exec()`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) ，默认情况下不生成shell。相反，指定的可执行文件`file`直接作为新进程生成，使其比[`child_process.exec()`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback)更加高效.

### fork()方法
与spawn()类似，不同点在于它创建Node的子进程只需指定要执行的JavaScript文件模块即可。

```js
child_process.fork(modulePath[, args][, options])
```

返回的对象除了拥有ChildProcess实例的所有方法，还有一个内建的通信信道。

## 进程间通信

在Master-Worker 主从模式中，要实现主进程管理和调度工作进程的功能，就需要主进程和工作进程之间的通信。

Node中对应示例如下所示：

```js
// parent.js
var cp = require('child_process');
var n = cp.fork(__dirname + '/sub.js');
n.on('message', function (m) { // 监听message事件
    console.log('PARENT got message:', m);
});
n.send({hello: 'world'}); // 发送数据

// sub.js
process.on('message', function (m) { // 监听message事件
    console.log('CHILD got message:', m);
});
process.send({foo: 'bar'});  // 发送数据
```

通过`fork()`或者其他API，创建子进程之后，为了实现父子进程之间的通信，父进程与子进程之间将会**创建IPC通道**。通过IPC通道，父子进程之间才能通过`message`和`send()`传递消息。

### Node 原生 IPC（Inter-Process Communication，进程间通信）支持

IPC的全称是Inter-Process Communication，即进程间通信。进程间通信的目的是为了让不同 的进程能够互相访问资源并进行协调工作。实现进程间通信的技术有很多，如**命名管道、匿名管道、socket、信号量、共享内存、消息队列、Domain Socket**等。Node中实现IPC通道的是**管道（pipe） 技术**。但此管道非彼管道，在Node中管道是个抽象层面的称呼，具体细节实现由libuv提供，**在Windows下由命名管道（named pipe）实现，\*nix系统则采用Unix Domain Socket实现**。**<u>表现在应用层上**的进程间通信**只有简单的message事件和send()方法</u>**，接口十分简洁和消息化。图9-2为IPC 创建和实现的示意图。

![image-20220406222630302](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204062226499.png)

父进程**在实际创建子进程之前，会创建IPC通道并监听它(中间者)**，然后才真正创建出子进程，并通 过环境变量（NODE_CHANNEL_FD）**告诉子进程这个IPC通道的文件描述符**。子进程在启动的过程中， 根据文件描述符去连接这个已存在的IPC通道，从而完成父子进程之间的连接。图9-3为创建IPC 管道的步骤示意图。

![image-20220406223102209](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204062231266.png)

由于IPC通道是用命名管道或Domain Socket创建的，它们与网络socket的行为比较类似，**属于双向通信**。**不同的是它们在<u>系统内核</u>中就完成了进程间的通信**，而不用经过实际的网络层，非常高效。在Node中，IPC通道被抽象为Stream（流）对象，在调用`send()`时发送数据（类似于`write()`），接收到的消息会通过`message`事件（类似于`data`）触发给应用层。


> **参考：**
>
> [Node.js v18.6.0 documentation](https://nodejs.org/dist/latest-v18.x/docs/api/)
>
> [《深入浅出Node.js》](https://book.douban.com/subject/25768396/)
