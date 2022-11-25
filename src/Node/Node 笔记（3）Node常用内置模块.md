---
icon: edit
date: 2022-04-08
category:
- Node
---

# Node 笔记（3）Node常用内置模块

## 内置模块path

path模块用于对路径和文件进行处理，提供了很多好用的方法。并且我们知道在Mac OS、Linux和window上的路径时不一样的，window上会使用 \或者 \\ 来作为文件路径的分隔符，当然目前也支持 /，在Mac OS、Linux的Unix操作系统上使用 / 来作为文件路径的分隔符；

提供可移植操作系统接口（英语：Portable Operating System Interface，缩写为POSIX），

Linux和Mac OS都实现了POSIX接口，Window部分电脑实现了POSIX接口。

### 常见的API

从路径中获取信息：

- dirname：获取文件的父文件夹；
- basename：获取文件名；
- extname：获取文件扩展名；

```js
// 1.获取路径的信息
const filepath = '/User/why/abc.txt';

console.log(path.dirname(filepath));
console.log(path.basename(filepath));
console.log(path.extname(filepath));
```

路径的拼接：

- 如果我们希望将多个路径进行拼接，但是不同的操作系统可能使用的是不同的分隔符；这个时候我们可以使用path.join函数；

将文件和某个文件夹拼接：

- 如果我们希望将某个文件和文件夹拼接，可以使用 path.resolve;
- resolve函数会判断我们拼接的路径前面是否有 /或../或./；
- 如果有表示是一个绝对路径，会返回对应的拼接路径；
- 如果没有，那么会和当前执行文件所在的文件夹进行路径的拼接

```js
const path = require('path');

const basePath = '/User/why';
const filename = 'abc.txt';

// const path = basePath + "/" + filename;

const filepath = path.resolve(basePath, filename);
console.log(filepath);  // C:\User\why\abc.txt
```

### 在webpack中的使用

在webpack中获取路径或者起 别名的地方也可以使用

![image-20220414171722469](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204141717534.png)

## 内置模块fs

Node也有自己的文件系统操作模块，就是fs：

- 借助于Node帮我们封装的文件系统，我们可以在任何的操作系统（window、Mac OS、Linux）上面直接去 操作文件；
- 这也是Node可以开发服务器的一大原因，也是它可以成为前端自动化脚本等热门工具的原因；

### fs的API

方式一：同步操作文件：代码会被阻塞，不会继续执行；

方式二：异步回调函数操作文件：代码不会被阻塞，需要传入回调函数，当获取到结果时，回调函数被执行；

方式三：异步Promise操作文件：代码不会被阻塞，通过 fs.promises 调用方法操作，会返回一个Promise，可以通过then、catch进行处理；

**案例：获取一个文件的状态**

```js
const fs = require('fs');

// 案例: 读取文件的信息
const filepath = "./abc.txt";

// 1.方式一: 同步操作
const info = fs.statSync(filepath);
console.log("后续需要执行的代码");
console.log(info);

// 2.方式二: 异步操作
fs.stat(filepath, (err, info) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(info);
  console.log(info.isFile());
  console.log(info.isDirectory());
});
console.log("后续需要执行的代码");

// 3.方式三: Promise
fs.promises.stat(filepath).then(info => {
  console.log(info);
}).catch(err => {
  console.log(err);
});

console.log("后续需要执行的代码");
```

### 文件描述符

**文件描述符（File descriptors）是什么呢？**

- 在 POSIX 系统上，对于每个进程，内核都维护着一张当前打开着的文件和资源的表格。
- 每个打开的文件都分配了一个称为文件描述符的简单的数字标识符。
- 在系统层，所有文件系统操作都使用这些文件描述符来标识和跟踪每个特定的文件。
- Windows 系统使用了一个虽然不同但概念上类似的机制来跟踪资源。

为了简化用户的工作，Node.js 抽象出操作系统之间的特定差异，并为所有打开的文件分配一个数字型的文件描述 符。

fs.open() 方法用于分配新的文件描述符。一旦被分配，则文件描述符可用于从文件读取数 据、向文件写入数据、或请求关于文件的信息。

```js
const fs = require('fs');

fs.open("./abc.txt", (err, fd) => {
  if (err) {
    console.log(err);
    return;
  }

  // 通过描述符去获取文件的信息
  fs.fstat(fd, (err, info) => {
    console.log(info);
  })
})
```

### 文件的读写

如果我们希望对文件的内容进行操作，这个时候可以使用文件的读写：

- fs.readFile(path[, options], callback)：读取文件的内容；
- fs.writeFile(file, data[, options], callback)：在文件中写入内容；

```js
// 1.文件写入
const content = "你好啊,李银河";

fs.writeFile('./abc.txt', content, {flag: "a"}, err => {
  console.log(err);
});

// 2.文件读取
fs.readFile("./abc.txt", {encoding: 'utf-8'}, (err, data) => {
  console.log(data);
});
```

#### flag选项

- w 打开文件写入，默认值；
- w+打开文件进行读写，如果不存在则创建文件；
- r+ 打开文件进行读写，如果不存在那么抛出异常；
- r打开文件读取，读取时的默认值；
- a打开要写入的文件，将流放在文件末尾。如果不存在则创建文件；
- a+打开文件以进行读写，将流放在文件末尾。如果不存在则创建文件

#### encoding选项

目前基本用的都是UTF-8编码；如果不填写encoding，返回的结果是Buffer；

### 文件夹操作

新建一个文件夹: 使用fs.mkdir()或fs.mkdirSync()创建一个新文件夹：

```js
const fs = require('fs');
const path = require('path');

// 1.创建文件夹
const dirname = './why';
if (!fs.existsSync(dirname)) {
  fs.mkdir(dirname, err => {
    console.log(err);
  });
}

// 2.读取文件夹中的所有文件
fs.readdir(dirname, (err, files) => {
  console.log(files);
});

function getFiles(dirname) {
  fs.readdir(dirname, { withFileTypes: true }, (err, files) => {
    for (let file of files) {
      // fs.stat(file) 可以, 但是有点麻烦
      if (file.isDirectory()) {
        const filepath = path.resolve(dirname, file.name);
        getFiles(filepath);
      } else {
        console.log(file.name);
      }
    }
  });
}

getFiles(dirname);

// 3.重命名
fs.rename("./why", "./kobe", err => {
  console.log(err);
})
```

## events模块

Node中的核心API都是基于异步事件驱动的：

- 在这个体系中，某些对象（发射器（Emitters））发出某一个事件；
- 我们可以监听这个事件（监听器 Listeners），并且传入的回调函数，这个回调函数会在监听到事件时调用；

**发出事件和监听事件都是通过EventEmitter类**来完成的，它们都属 于events对象。

- emitter.on(eventName, listener)：监听事件，也可以使用addListener；
- emitter.off(eventName, listener)：移除事件监听，也可以使用removeListener；
- emitter.emit(eventName[, ...args])：发出事件，可以携带一些参数；

```js
const EventEmitter = require("events");

// 1.创建发射器
const emitter = new EventEmitter();

// 2.监听某一个事件
// addListener是on的alias简写
emitter.on('click', (args) => {
  console.log("监听1到click事件", args);
})

const listener2 = (args) => {
  console.log("监听2到click事件", args);
}
emitter.on('click', listener2)

// 3.发出一个事件
setTimeout(() => {
  emitter.emit("click", "coderwhy", "james", "kobe");
  emitter.off("click", listener2);
  emitter.emit("click", "coderwhy", "james", "kobe");
}, 2000);
```

**获取信息**

```js
const EventEmitter = require('events');

// 1.创建发射器
const emitter = new EventEmitter();

// 2.监听某一个事件
// addListener是on的alias简写
emitter.on('click', (args) => {
  console.log("监听1到click事件", args);
})

const listener2 = (args) => {
  console.log("监听2到click事件", args);
}
emitter.on('click', listener2)

emitter.on("tap", (args) => {
  console.log(args);
})

// 3.获取注册的事件
console.log(emitter.eventNames());
console.log(emitter.listenerCount("click"));
console.log(emitter.listeners("click"));
```

### 常见的属性

EventEmitter的实例有一些属性，可以记录一些信息：

- emitter.eventNames()：返回当前 EventEmitter对象注册的事件字符串数组；
- emitter.getMaxListeners()：返回当前 EventEmitter对象的最大监听器数量，可以通过setMaxListeners()来修改，默认是10；
- emitter.listenerCount(事件名称)：返回当前 EventEmitter对象某一个事件名称，监听器的个数；
- emitter.listeners(事件名称)：返回当前 EventEmitter对象某个事件监听器上所有的监听器数组；

### 方法的补充

- emitter.once(eventName, listener)：事件监听一次
- emitter.prependListener()：将监听事件添加到最前面
- emitter.prependOnceListener()：将监听事件添加到最前面，但是只监听一次
- emitter.removeAllListeners([eventName])：移除所有的监听器
