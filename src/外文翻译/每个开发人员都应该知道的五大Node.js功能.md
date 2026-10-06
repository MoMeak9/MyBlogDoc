> 标题：Top 5 Node.js Features Every Developer Should Know
> 
> 作者：Danusha Navod
> 
> 链接：https://blog.bitsrc.io/top-5-features-of-nodejs-e49d1c68f4a7

无论你是经验丰富的 Node.js 开发人员还是初出茅庐的新人开发者，总有一些东西在 Node.js 中等待着我们去探索。

在本文中，我将探讨可以增强整体体验的五个Node.js功能，它们是：

- Worker Threads 
- Cluster Process Module
- Built-in HTTP/2 Support
- Streams API 
- REPL

> 让我们逐一探讨这些功能中的每一个。

但在此之前，让我们快速看一下 Node.js 的**单线程行为**。了解这个基本知识将为我们将要深入研究的功能提供有价值的背景信息。

## 单线程 Node.js：快速概述

Node.js 以其单线程架构而闻名。但更准确地说，称其为“单线程事件循环”。

### **但为什么要使用单线程事件循环呢？**

最初，Node.js 是为 I/O 绑定任务（如 Web 服务器）设计的。对于这些，创建多个线程会增加管理线程同步和上下文切换的开销和复杂性。相反，Node.js 采用了事件驱动的方法。

这种行为给 Node.js 带来了一些优点和局限性。

### **优点还可以，但是局限性呢？**

Node.js 单线程事件循环带来的主要限制如下：

- **受 CPU 限制的任务可能会阻塞循环：** 大量的计算可能会“冻结”循环，从而影响对其他请求的响应能力。
- **没有真正的并行性：** 任务仍然一个接一个地执行，而不是同时执行。

> 为了解决这些限制，Node.js引入了各种Node.js版本的工作**线程**和**集群模块**。

这两个功能可以真正影响我们的软件开发之旅。因此，让我们在接下来的部分中深入研究**工作者线程** **Worker Threads**和**集群模块** **Cluster Module**，以了解它们令人难以置信的有用性。

之后，我们将探索**另外三个 Node.js 功能**，它们可以在各种情况下提供帮助。敬请关注！

****

##  1. Worker Threads **工作者线程**

<img src="https://fs.lwmc.net/uploads/2024/02/1708076388928-202402161739358.webp" alt="0*uHcdivbqfc5PwBei" style="zoom:50%;" />

虽然单线程事件循环擅长处理 I/O 密集型任务，但 Node.js 的 `worker_threads` 模块使你能够在处理 [**CPU 密集型**](https://en.wikipedia.org/wiki/CPU-bound) 时摆脱其限制运行。

想象一下，多个厨师在厨房里独立工作，同时准备不同的菜肴（任务）——这就是工作者线程的本质！

**幕后发生了什么？**

默认情况下，Node.js 具有单线程事件循环，擅长处理 I/O 密集型任务。但对于 CPU 密集型任务来说，它可能会成为瓶颈。

> *将工作线程视为同一 Node.js 进程中单独的 JavaScript 执行上下文。*

它可以将 CPU 密集型任务委托给这些工作线程，而不是由主线程处理所有事情。这允许主线程保持响应并处理其他请求，同时工作者线程处理复杂的计算。

**本质上，工作者线程允许：**

- **卸载 CPU 密集型任务：** 释放主线程以进行其他工作。
- **实现并行性：**并发执行任务以获得更快的性能。
- **高效共享数据：**避免在进程之间复制数据的开销。

### 工作者线程入门

`worker_threads` 模块提供了一个简单的 API 用于创建工作线程并与其通信：

```js
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js', { data: { someData: 'to process' } });

worker.on('message', (message) => {
  console.log(Received message from worker: ${message} );
});

worker.postMessage({ anotherData: 'to send' });
```

请记住，工作者线程共享内存。因此，建议进行大型数据交换时使用 `ArrayBuffer` 或 `SharedArrayBuffer` 等数据结构，以避免不必要的复制。

**还请记住：**

- 创建和管理工作线程会产生一些开销，因此请根据你的特定用例考虑其收益与成本。
- 线程安全至关重要！使用同步机制来确保数据完整性。
- 工作者线程会增加复杂性，因此请明智地使用它们来执行真正受益于并行性的任务。

****

## 2. Cluster Process Module 集群进程模块

<img src="https://fs.lwmc.net/uploads/2024/02/1708077038739-202402161750378.webp" alt="0*4F2f1LHzjAJE8pDf" style="zoom: 67%;" />

虽然工作者线程非常适合并行性，但集群模块使你能够在多核系统中走得更远。

想象一下，有多个厨房（Node.js 进程）独立运行，每个厨房同时处理请求 - 这就是集群的力量！

**幕后发生了什么？**

[**集群模块**](https://nodejs.org/api/cluster.html)创建多个独立的 Node.js 进程，每个进程都有自己的事件循环和内存空间。

> *这些进程在* **不同的内核** *上独立运行，利用多个内核来提高性能（* **水平扩展** *）*

这是通过创建一个主进程和多个工作进程来操作的。主进程管理工作进程之间传入连接的分配。如果工作进程发生故障，主进程可以重新生成一个新进程，从而确保在发生故障时的稳健性。

**但为什么要拥抱集群呢？**

- **提升性能：**处理更高的流量并缩短响应时间，尤其是对于 I/O 密集型任务。
- **最大限度地提高资源利用率：**充分利用服务器中的所有可用内核，显着提高处理能力。
- **增强的容错能力：**如果一个Worker崩溃，其他Worker会保持应用程序运行，从而确保可靠性和正常运行时间。

### **集群入门**

`cluster` 模块提供了一个简单的 API 用于设置和管理工作进程：

```js
const cluster = require('cluster');

if (cluster.isMaster) {
  // Master process
  const numWorkers = require('os').cpus().length;

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(worker ${worker.process.pid} died );
  });
} else {
  // Worker process
  // Your application logic here
  app.listen(3000);
}
```

**记住：**

- Worker进程共享内存和资源，所以要仔细考虑数据同步。
- 集群模块增加了应用程序架构的复杂性，因此请根据你的特定需求评估其优势与复杂性。

**何时考虑使用集群：**

- **高流量网站：**当单线程事件循环达到极限时，通过集群水平扩展有助于有效管理大型用户群。
- **长时间运行的任务：**如果某些请求涉及冗长的操作（例如图像处理或数据加密），则将它们分布在工作进程之间可以提高对其他请求的响应能力。

- **容错至关重要：**对于关键任务应用程序，集群模块对单个进程故障的恢复能力提供了宝贵的保护。

## 3. 内置HTTP/2支持

<img src="https://fs.lwmc.net/uploads/2024/02/1708143321433-202402171215881.webp" alt="0*4LhdUVLCf5JMGLr_" style="zoom:50%;" />

虽然工作者线程和集群模块解决了不同的问题，但 Node.js 的 `http2` 模块通过为高效的 [**HTTP/2 协议**](https://en.wikipedia.org/wiki/HTTP/2) 提供内置支持来直接解决性能问题。

### **什么是HTTP/2？**

HTTP/2 是 HTTP/1.1 的后继者，带来了多项性能增强：

- **多路复用：**允许在单个连接上同时发送和接收多个请求和响应，消除困扰 HTTP/1.1 的队头阻塞问题。
- **header压缩：** 通过压缩header来缩小标头大小，从而显着减少数据传输开销。
- **服务器推送 Server push：**允许服务器在客户端请求资源之前主动将资源发送给客户端，从而可能加快页面加载时间。

### Node.js 如何支持HTTP/2 ？

Node.js 提供了一个强大的 `http2` 模块来使用 HTTP/2。以下是它提供的一些功能：

- [**创建 HTTP/2 服务器**](https://nodejs.org/api/http2.html#core-api)**：** 使用熟悉的 Node.js 服务器模式以及用于管理流和服务器推送功能的附加选项。
- [**HTTP/2 客户端**](https://nodejs.org/api/http2.html#client-side-example)**：**访问客户端功能以连接到 HTTP/2 服务器并与之交互。
- [**Extensive API**](https://nodejs.org/api/http2.html#core-api)**：** 探索各种方法和事件来管理连接、流、推送机制和错误处理。

### **http2 入门**

[Node.js 文档](https://nodejs.org/api/http2.html) 提供了使用 http2 模块的详细指南和示例。然而，仅仅提供链接是不够的。让我们通过一些实际示例来演示其用法。

**1. 创建一个基本的 HTTP/2 服务器：**

```js
const http2 = require('http2');

const server = http2.createServer();

server.on('stream', (stream, headers) => {
  stream.respond({
    'status': 200,
    'content-type': 'text/plain',
  });
  stream.end('Hello from your HTTP/2 server!');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

此代码创建一个简单的服务器，向通过 HTTP/2 连接的任何客户端发送“Hello”消息。

**2. 处理客户请求：**

```js
const http2 = require('http2');

const server = http2.createServer();

server.on('stream', (stream, headers) => {
  const path = headers[':path'];

  if (path === '/') {
    stream.respond({
      'status': 200,
      'content-type': 'text/plain',
    });
    stream.end('Hello from HTTP/2 server!');
  } else {
    stream.respond({
      'status': 404,
      'content-type': 'text/plain',
    });
    stream.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

此代码扩展了前面的示例以处理不同的请求路径 (/) 并发送适当的响应。

## 4. Streams API

<img src="https://fs.lwmc.net/uploads/2024/02/1708156649905-202402171557076.webp" alt="0*EmBQH-2R-H_F0yJo" style="zoom:50%;" />

Node.js 的 Streams API 为应用程序中的高效数据处理提供了强大的基础。了解流可以帮助我们构建可扩展且高性能的系统。

### **什么是流？**

> *想象一下数据像水流一样流动——这就是本质上的概念。*

流表示随时间传送的连续数据块序列。 Node.js 提供[各种流类型](https://nodejs.org/api/stream.html#types-of-streams)，每种流类型适合不同的用例：

- **可读流：**发出数据块以供使用，非常适合读取文件、网络连接或用户输入。
- **可写流：**允许写入数据块，非常适合写入文件、网络连接或数据库。
- **双工流：**结合读取和写入功能，对于套接字或管道等双向通信很有用。
- **转换流：**在数据流经时修改数据，从而实现加密、压缩或数据操作。

### 为什么应该使用流 Streams？

流在涉及大数据集或连续数据流的场景中表现出色。它们具有以下几个优点：

- **内存效率：**它们以块的形式处理数据，避免一次性将整个数据集加载到内存中。
- **非阻塞性质：**它们不会阻塞主线程，允许你的应用程序在处理数据时保持响应。
- **灵活性：**不同的流类型可以满足不同的数据处理需求。

### **Streams 入门**

我们来通过内置的`fs` 模块进行探索。下面是一个逐块读取文件的示例：

```js
const fs = require('fs');

const readableStream = fs.createReadStream('large_file.txt');

readableStream.on('data', (chunk) => {
  console.log('Received data chunk:', chunk.toString());
});

readableStream.on('end', () => {
  console.log('Finished reading file');
});
```

此代码按块读取 `large_file.txt` 文件并将其记录到控制台。你可以通过探索 [Node.js 文档](https://nodejs.org/api/stream.html) 了解更多类型及其用法。

## 5. REPL (Read-Eval-Print Loop)

<img src="https://fs.lwmc.net/uploads/2024/02/1708156971290-202402171602962.webp" alt="0*Ti2y12Xw0U00RMg9" style="zoom: 67%;" />

工作者线程和集群模块有助于提高性能和可扩展性，而 HTTP/2 和流的动态组合扩展了它们的能力，提供跨多个域的多功能优势。另一方面，[**REPL（读取-评估-打印循环）**](https://nodejs.org/en/learn/command-line/how-to-use-the-nodejs-repl) 引入了一种独特的功能 - **交互性和探索**。

> *想象一个沙箱环境，你可以在其中试验代码片段、测试想法并获得即时反馈——这就是 REPL 的本质。*

将其视为**对话式编码体验**。你输入代码表达式，REPL 会对其进行计算并显示结果，从而使你能够快速迭代和学习。这使得 REPL 对于以下方面是无价的：

- **学习和实验：**在安全、隔离的环境中尝试新的 JavaScript 功能、探索库并测试假设。
- **调试和故障排除：**逐行隔离并修复代码中的问题，在每一步检查变量和值。
- **交互式开发：**快速构建想法原型，立即获得反馈，并迭代地完善你的代码。

**访问 REPL：**

打开你的终端并简单地输入node。瞧！你现在已进入 REPL，可以开始玩了。键入任何 JavaScript 变量赋值、函数调用，甚至复杂的计算。

```shell
Welcome to Node.js v20.11.0.
Type ".help" for more information.
> Math.random()
0.6148448277159013
```

与前面概述的所有强大功能相比，REPL 可能看起来非常简单。然而，它的真正价值只有通过实践经验才能显现出来。作为一名 Node.js 开发人员，采用 REPL 并将其集成到你的工作流程中不仅有益，而且至关重要。

# 结论性思考

在 Node.js 提供的强大工具库中，**工作者线程**负责处理 CPU 密集型任务，**集群模块**支持水平扩展，**http2**赋予 HTTP/2 网络协议的能力， **Streams** 提供高效的数据处理，**REPL** 支持交互式探索和学习。

通过理解与掌握这些功能，将释放 Node.js 的全部潜力，并构建高性能、可扩展且令人愉悦的开发体验。