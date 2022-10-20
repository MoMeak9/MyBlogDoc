---
date: 2022-08-06
category:
- Node
---

# 横向对比 CJS 和 ES Module

## 模块化 🖥️

### 什么是模块化开发

模块化开发最终的目的是将程序**划分成一个个小的结构**。在这个结构中编写属于**自己的逻辑代码**，有自己的作用域，不会影响到其他的结构。结构可以将自己希望暴露的**变量、函数、对象等导出**给其结构使用。也可以通过某种方式，导入另外结构中的**变量、函数、对象**等。

上面说提到的结构，就是模块，按照这种结构划分开发程序的过程，就是模块化开发的过程。

## CommonJS 🦜

[CommonJS](https://zhaoda.net/webpack-handbook/commonjs.html)是一个规范，最初提出来是在浏览器以外的地方使用，并且当时被命名为ServerJS，后来为了 体现它的广泛性，修改为CommonJS，通常简称CJS。

> CommonJS 是以在浏览器环境之外构建 JavaScript 生态系统为目标而产生的项目，比如在服务器和桌面环境中。
>
> 这个项目最开始是由 Mozilla 的工程师 Kevin Dangoor 在2009年1月创建的，当时的名字是 ServerJS。

### 通过 exports 导出模块内容

exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出；

```js
// bar.js
exports.name = 'name';
exports.age = 'age';
exports.sayHello = 'sayHello';
```

另外一个文件中可以导入：

```js
// main.js
const bar = require('./bar');
```

上面这行完成了什么操作呢？

意味着main中的bar变量等于exports对象，也就是require通过各种查找方式，最终找到了exports这个对象，并且将这个exports对象赋值给了bar变量，bar变量就是exports对象了。


需要注意 `exports` 不能被赋值，可以理解为在模块开始前`exports = module.exports`， 因为赋值之后`exports`失去了 对`module.exports`的引用，成为了一个模块内的局部变量。

### 浅拷贝（引用赋值）

实际上有别于ES Module

```js
// main.js
const bar = require('./bar');
```

**bar对象是exports对象的浅拷贝（引用赋值）**，浅拷贝的本质就是一种引用的赋值而已，是不是想到了什么问题？对，exports对象中的属性修改，所引用的bar对象内容也会被修改。

### module.exports 咋来的？

**在Node中真正用于导出的其实根本不是exports，而是module.exports；Node内部提供一个`Module`构建函数。所有模块都是`Module`的实例。** CommonJS中是没有module.exports的概念的。


## Node.js模块加载过程 ✨

模块在被第一次引入时，模块中的js代码会被运行一次，模块被多次引入时，会缓存，**最终只加载（运行）一次**，这是因为每个模块对象 `module` 都有一个属性：`loaded`。`loaded` 为`false` 表示还没有加载，为`true`表示已经加载，如果有循环引入，那么加载顺序是采取深度优先算法。

> **module属性和方法：**
> -   [module.id](https://www.bookstack.cn/read/nodejs-api-doc-cn/modules-module.md#moduleid)
> -   [module.filename](https://www.bookstack.cn/read/nodejs-api-doc-cn/modules-module.md#modulefilename)
> -   [module.loaded](https://www.bookstack.cn/read/nodejs-api-doc-cn/modules-module.md#moduleloaded)
> -   [module.parent](https://www.bookstack.cn/read/nodejs-api-doc-cn/modules-module.md#moduleparent)
> -   [module.children](https://www.bookstack.cn/read/nodejs-api-doc-cn/modules-module.md#modulechildren)
> -   [module.exports](https://www.bookstack.cn/read/nodejs-api-doc-cn/modules-module.md#moduleexports)
>     - [exports 的别名](https://www.bookstack.cn/read/nodejs-api-doc-cn/modules-module.md#exports-%E7%9A%84%E5%88%AB%E5%90%8D)
> -   [module.require(id)](https://www.bookstack.cn/read/nodejs-api-doc-cn/modules-module.md#modulerequireid)

## CommonJS规范缺点 🪄

**CommonJS同步加载模块是双刃剑**

同步的意味着只有等到对应的模块加载完毕，当前模块中的内容才能被运行。这个在服务端不会有什么问题，因为服务器加载的js文件都是本地文件，加载速度非常快。但是当用于浏览器的时候，因为浏览器加载js文件需要先从服务器将文件下载下来，之后在加载运行（全量加载）。而且采用同步的就意味着后续的js代码都无法正常运行，即使是一些简单的DOM操作，所以在浏览器中，我们通常不使用CommonJS规范；

**早期为了可以在浏览器中使用模块化，通常会采用AMD或CMD**。目前一方面现代的浏览器已经支持ES Modules，另一方面借助于webpack等工具可以实现对CommonJS或者 ES Module代码的转换；

## 其他模块规范 ♣️

#### AMD规范

AMD规范就是其中比较著名一个，**全称是Asynchronous Module Definition，即异步模块加载机制**。 从它的规范描述页面看，AMD很短也很简单，但它却完整描述了模块的定义，依赖关系，引用关系以及加载机制，是异步加载模块。

#### CMD规范

CMD（Common Module Definition）是国内大牛玉伯在开发SeaJS的时候提出来的，**属于CommonJS的一种规范，根据浏览器的异步环境做了自己的实现**。 它和AMD 很相似，尽量保持简单，并与CommonJS 和Node.js 的Modules 规范保持了很大的兼容性。


## 结语 📓

文章内容是根据`codewhy`老师的`《深入Node.js技术栈》`课程整理的笔记，并补充了其他的课外内容，其中还涵盖了`《深入浅出Node.js》`的内容。下篇会更新ES Module，之后横向比较一下两者，这也是面试的时候经常被问到的，例如什么是模块化，CJS和ES Module的区别等等。
