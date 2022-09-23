# Node.js 进阶（面试）合集
> **参照：**
>
> [NodeJS有难度的面试题，你能答对几个？](https://juejin.cn/post/6844903951742025736)
>
> [分享 10 道 Nodejs 进程相关面试题](https://juejin.cn/post/6844903870066327566)
>
> [Web前端面试-面试官系列](https://vue3js.cn/interview/NodeJS/nodejs.html)

`Node.js` 是一个开源与跨平台的 `JavaScript` 运行时环境

在浏览器外运行 V8 JavaScript 引擎（Google Chrome 的内核），利用事件驱动、非阻塞和异步输入输出模型等技术提高性能

可以理解为 `Node.js` 就是一个服务器端的、非阻塞式I/O的、事件驱动的`JavaScript`运行环境

**特点：**

- 非阻塞异步
- 事件驱动

**优缺点：**

优点：

- 处理高并发场景性能更佳
- 适合I/O密集型应用，值的是应用在运行极限时，CPU占用率仍然比较低，大部分时间是在做 I/O硬盘内存读写操作

因为`Nodejs`是单线程，带来的缺点有：

- 不适合CPU密集型应用
- 只支持单核CPU，不能充分利用CPU
- 可靠性低，一旦代码某个环节崩溃，整个系统都崩溃

**全局对象：**

- Class:Buffer
- process
- console
- clearInterval、setInterval
- clearTimeout、setTimeout
- global

## 进程相关 process

### 常见属性方法

- process.env：环境变量，例如通过 `process.env.NODE_ENV 获取不同环境项目配置信息
- process.nextTick：这个在谈及 `EventLoop` 时经常为会提到
- process.pid：获取当前进程id
- process.ppid：当前进程对应的父进程
- process.cwd()：获取当前进程工作目录，
- process.platform：获取当前进程运行的操作系统平台
- process.uptime()：当前进程已运行时间，例如：pm2 守护进程的 uptime 值
- 进程事件： process.on(‘uncaughtException’,cb) 捕获异常信息、 process.on(‘exit’,cb）进程推出监听
- 三个标准流： process.stdout 标准输出、 process.stdin 标准输入、 process.stderr 标准错误输出
- process.title 指定进程名称，有的时候需要给进程指定一个名称

### process.nextTick()

我们知道`NodeJs`是基于事件轮询，在这个过程中，同一时间只会处理一件事情

在这种处理模式下，`process.nextTick()`就是定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行

## Node 事件循环机制

<img src="https://cdn.yihuiblog.top/images/202209221524823.png" alt="img" style="zoom: 67%;" />

在`Node`中，同样存在宏任务和微任务，与浏览器中的事件循环相似

微任务对应有：

- next tick queue：process.nextTick
- other queue：Promise的then回调、queueMicrotask

宏任务对应有：

- timer queue：setTimeout、setInterval
- poll queue：IO事件
- check queue：setImmediate
- close queue：close事件

其执行顺序为（优先级）：

- next tick microtask queue
- other microtask queue
- timer queue
- poll queue 
- check queue
- close queue

## 模块化相关

在Node中每一个js文件都是一个单独的模块，模块中包括CommonJS规范的核心变量：exports、module.exports、require。

### **传参方式**

`require`方法接收一下几种参数的传递：

- 原生模块：http、fs、path等
- 相对路径的文件模块：./mod或../mod
- 绝对路径的文件模块：/pathtomodule/mod
- 目录作为模块：./dirname
- 非原生模块的文件模块：mod

### 文件查找的优先级

优先查询缓存模块和内置模块，让后去根据路径进行查找

- **缓存的模块**优先级最高
- 如果是**内置模块**，则直接返回，优先级仅次缓存的模块
- 如果是绝对路径 / 开头，则从**根**目录找
- 如果是相对路径 ./开头，则从当前require文件**相对位置**找
- 如果文件没有携带后缀，先从js、json、node**按顺序查找**
- 如果是**目录**，则根据 package.json的main属性值决定目录下的入口文件，默认情况为 index.js
- 如果文件为**第三方模块**，则会引入 node_modules 文件，如果不在当前仓库文件中，则自动从上级递归查找，直到根目录

