---
icon: edit
date: 2022-04-08
category:
- Node
---

# Node 笔记（1）内核引擎

> Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境。
>
> 参照：

> coderwhy - 深入Node.js技术栈

## 浏览器内核是什么？

我们经常会说：不同的浏览器有不同的内核组成

- Gecko：早期被Netscape和Mozilla Firefox浏览器使用；
- Trident：微软开发，被IE4~IE11浏览器使用，但是Edge浏览器已经转向Blink；
- Webkit：苹果基于KHTML开发、开源的，用于Safari，Google Chrome之前也在使用；
- Blink：是Webkit的一个分支，Google开发，目前应用于Google Chrome、Edge、Opera等；

事实上，我们经常说的浏览器内核指的是浏览器的排版引擎：

- 排版引擎（layout engine），也称为浏览器引擎（browser engine）
- 页面渲染引擎（rendering engine） 或样版引擎

## 渲染引擎工作的过程

- 但是在这个执行过程中，HTML解析的时候遇到了JavaScript标签，应该怎么办呢？
  - 会停止解析HTML，而去加载和执行JavaScript代码；
- 为什么不直接异步去加载执行JavaScript代码，而要在这里停止掉呢？
  - 因为JavaScript代码可以操作我们的DOM；所以浏览器希望将HTML解析的DOM和JavaScript操作之后的DOM放到一起来生成最终的DOM树，而不是 频繁的去生成新的DOM树；

- JavaScript代码由谁来执行呢？
  - JavaScript引擎

![image-20220408192435249](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204081924322.png)

## JavaScript引擎

为什么需要JavaScript引擎呢？

-  事实上我们编写的JavaScript无论你交给浏览器或者Node执行，最后都是需要被CPU执行的；
- 但是CPU只认识自己的指令集，实际上是机器语言，才能被CPU所执行；
- 所以我们需要JavaScript引擎帮助我们将JavaScript代码翻译成CPU指令来执行；

 比较常见的JavaScript引擎有哪些呢？

- SpiderMonkey：第一款JavaScript引擎，由Brendan Eich开发（也就是JavaScript作者）；
-  Chakra：微软开发，用于IT浏览器；
- JavaScriptCore：WebKit中的JavaScript引擎，Apple公司开发；
- V8：Google开发的强大JavaScript引擎，也帮助Chrome从众多浏览器中脱颖而出；

### WebKit内核

WebKit事实上由两部分组成的：

- WebCore：负责HTML解析、布局、渲染等等相关的工作；
- JavaScriptCore：解析、执行JavaScript代码；

> 在小程序中编写的JavaScript代码就是被JSCore执行的；

![image-20220408192945217](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204081929274.png)

![image-20220408192950865](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204081929916.png)

### V8引擎

- V8是用C ++编写的Google开源高性能JavaScript和WebAssembly引擎，它用于Chrome和Node.js等。
- 它实现ECMAScript和WebAssembly，并在Windows 7或更高版本，macOS 10.12+和使用x64，IA-32， ARM或MIPS处理器的Linux系统上运行。
- V8可以独立运行，也可以嵌入到任何C ++应用程序中。

![image-20220408193327902](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204081933032.png)

#### V8引擎的原理

Parse模块会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码；

Ignition是一个解释器，会将AST转换成ByteCode（字节码）

TurboFan是一个编译器，可以将字节码编译为CPU可以直接执行的机器码；

Orinoco模块，负责垃圾回收，将程序中不需要的内存回收；

## Node.js是什么

也就是说Node.js基于V8引擎来执行JavaScript的代码，但是不仅仅只有V8引擎：

- 前面我们知道V8可以嵌入到任何C ++应用程序中，无论是Chrome还是Node.js，事实上都是嵌入了V8引擎 来执行JavaScript代码；
- 但是在Chrome浏览器中，还需要解析、渲染HTML、CSS等相关渲染引擎，另外还需要提供支持浏览器操作 的API、浏览器自己的事件循环等；

- 另外，在Node.js中我们也需要进行一些额外的操作，比如文件系统读/写、网络IO、加密、压缩解压文件等 操作；

## 浏览器和Node.js架构区别

![image-20220408194003372](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204081940509.png)

## Node.js架构

- 我们编写的JavaScript代码会经过V8引擎，再通过Node.js的Bindings，将任务放到Libuv的事件循环中；
- libuv（Unicorn Velociraptor—独角伶盗龙）是使用C语言编写的库；
- libuv提供了事件循环、文件系统读写、网络IO、线程池等等内容；

![image-20220408194214765](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204081942836.png)

## Node.js的应用场景

- 目前前端开发的库都是以node包的形式进行管理；
-  npm、yarn工具成为前端开发使用最多的工具；
- 越来越多的公司使用Node.js作为web服务器开发；
- 大量项目需要借助Node.js完成前后端渲染的同构应用；
- 资深前端工程师需要为项目编写脚本工具（前端工程师编写脚本通常会使用JavaScript，而不是Python或者shell）；
- 很多企业在使用**Electron**来开发桌面应用程序；

## Node的版本工具

- nvm：Node Version Manager；已经可以在Windows使用
- n：Interactively Manage Your Node.js Versions（交互式管理你的Node.js版本）

## Node的REPL

REPL是Read-Eval-Print Loop的简称，翻译为“读取-求值-输出”循环；REPL是一个简单的、交互式的编程环境；

事实上，我们浏览器的console就可以看成一个REPL。Node也给我们提供了一个REPL环境，我们可以在其中演练简单的代码。

![image-20220408195428822](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204081954878.png)

## Node程序传递参数

在某些情况下执行node程序的过程中，我们可能希望给node传递一些参数：

```sh
node index.js env=development coderwhy
```

如果我们这样来使用程序，就意味着我们需要在程序中获取到传递的参数：获取参数其实是在process的内置对象中的；

argv属性中包含了我们需要的参数

![image-20220408195712648](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204081957701.png)

## 特殊的全局对象

这些全局对象可以在模块中任意使用，但是在命令行交互中是不可以使用的；

- __dirname：获取当前文件所在的路径
- __filename：获取当前文件所在的路径和文件名称、

## 常见的全局对象

**process**对象：process提供了Node进程中相关的信息：

- 比如Node的运行环境、参数信息等

**console**对象：提供了简单的调试控制台，在前面讲解输入内容时已经学习过了。

**定时器函数**：在Node中使用定时器有好几种方式：

- setTimeout(callback, delay[, ...args])：callback在delay毫秒后执行一次； 
- setInterval(callback, delay[, ...args])：callback每delay毫秒重复执行一次； 
- setImmediate(callback[, ...args])：callbackI / O事件后的回调的“立即”执行；
- process.nextTick(callback[, ...args])：添加到下一次tick队列中；

**global**是一个全局对象，事实上前端我们提到的process、console、setTimeout等都有被放到global中

## global和window的区别

在浏览器中，全局变量都是在window上的，比如有document、setInterval、setTimeout、alert、console等等

在Node中，我们也有一个global属性，并且看起来它里面有很多其他对象。

但是在浏览器中执行的JavaScript代码，如果我们在顶级范围内通过var定义的一个属性，默认会被添加到window 对象上

![image-20220408200444677](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204082004719.png)

但是在node中，我们通过var定义一个变量，它只是在当前模块中有一个变量，不会放到全局中

![image-20220408200450948](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204082004988.png)
