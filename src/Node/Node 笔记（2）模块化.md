---
icon: edit
date: 2022-04-08
category:
- Node
---

# Node 笔记（2）模块化

## 模块化

### 什么是模块化开发？

- 事实上模块化开发最终的目的是将程序**划分成一个个小的结构**；
- 这个结构中编写属于**自己的逻辑代码**，有自己的作用域，不会影响到其他的结构；
- 这个结构可以将自己希望暴露的**变量、函数、对象等导出**给其结构使用；
- 也可以通过某种方式，导入另外结构中的**变量、函数、对象**等；

上面说提到的结构，就是模块；按照这种结构划分开发程序的过程，就是模块化开发的过程；

## CommonJS和Node

我们需要知道CommonJS是一个规范，最初提出来是在浏览器以外的地方使用，并且当时被命名为ServerJS，后来为了 体现它的广泛性，修改为CommonJS，平时我们也会简称为CJS。

- Node中对**CommonJS进行了支持和实现**；

- 在Node中**每一个js文件都是一个单独的模块**；

- 这个模块中包括**CommonJS规范的核心变量**：exports、module.exports、require；

## exports导出

exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出；

```js
exports.name = 'name';
exports.age = 'age';
exports.sayHello = 'sayHello';
```

另外一个文件中可以导入：

```js
const bar = require('./bar');
```

上面这行完成了什么操作呢？

- 意味着main中的bar变量等于exports对象；
- 也就是require通过各种查找方式，最终找到了exports这个对象；
- 并且将这个exports对象赋值给了bar变量；
- bar变量就是exports对象了；

### 它们实际上是一个浅层拷贝

- **bar对象是exports对象的浅拷贝（引用赋值）；**
- 浅拷贝的本质就是一种引用的赋值而已；

![image-20220408201318574](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204082013660.png)

## module.exports又是什么？

**在Node中真正用于导出的其实根本不是exports，而是module.exports；**CommonJS中是没有module.exports的概念的；但是为了实现模块的导出，Node中使用的是Module的类，每一个模块都是Module的一个实例，也就是 module；

**为什么exports也可以导出呢？**

这是因为module对象的exports属性是exports对象的一个引用；

也就是说 `module.exports = exports = main中的bar`；

## 模块的加载过程

- 模块在被第一次引入时，模块中的js代码会被运行一次

- 模块被多次引入时，会缓存，**最终只加载（运行）一次**

  这是因为每个模块对象module都有一个属性：loaded。为false表示还没有加载，为true表示已经加载；

- 如果有循环引入，那么加载顺序是采取深度优先算法

main -> aaa -> ccc -> ddd -> eee ->bbb

![image-20220408203317949](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204082033004.png)

## CommonJS规范缺点

**CommonJS加载模块是同步的：**

- 同步的意味着只有等到对应的模块加载完毕，当前模块中的内容才能被运行；
- 这个在服务器不会有什么问题，因为服务器加载的js文件都是本地文件，加载速度非常快；

**如果将它应用于浏览器呢？**

- 浏览器加载js文件需要先从服务器将文件下载下来，之后在加载运行；
- 那么采用同步的就意味着后续的js代码都无法正常运行，即使是一些简单的DOM操作；所以在浏览器中，我们通常不使用CommonJS规范；

**在早期为了可以在浏览器中使用模块化，通常会采用AMD或CMD**

- 但是目前一方面现代的浏览器已经支持ES Modules，另一方面借助于webpack等工具可以实现对CommonJS或者 ES Module代码的转换；

## AMD规范

![image-20220408203759224](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204082037402.png)

## CMD规范

![image-20220408203810211](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204082038316.png)

## ES Module

### export关键字

export关键字将一个模块中的变量、函数、类等导出；

**我们希望将其他中内容全部导出，它可以有如下的方式：**

- 方式一：在语句声明的前面直接加上export关键字
- 方式二：将所有需要导出的标识符，放到export后面的 {}中
- 方式三：导出时给标识符起一个别名

### import关键字

**导入内容的方式也有多种：**

- import {标识符列表} from '模块'；
- 方式二：导入时给标识符起别名
-  方式三：通过 * 将模块功能放到一个模块功能对象（a module object）上

### Export和import结合使用

```js
export {sum as barSum} from './bar.js';
```

**为什么要这样做呢？**

- 在开发和封装一个功能库时，通常我们希望将暴露的所有接口放到一个文件中；
- 这样方便指定统一的接口规范，也方便阅读；
- 这个时候，我们就可以使用export和import结合使用；

### default用法

默认导出（default export）:

- 默认导出export时可以不需要指定名字；
- 在导入时不需要使用 {}，并且可以自己来指定名字；
- 它也方便我们和现有的CommonJS等规范相互操作；

**注意：在一个模块中，只能有一个默认导出（default export）；**

### import函数

**通过import加载一个模块，是不可以在其放到逻辑代码中的；**

- 因为ES Module在被JS引擎解析时，就必须知道它的依赖关系;由于这个时候js代码没有任何的运行，所以无法在进行类似于if判断中根据代码的执行情况；甚至下面的这种写法也是错误的：因为我们必须到运行时能确定path的值

**但是某些情况下，我们确确实实希望动态的来加载某一个模块：**

- 这个时候我们需要使用 import() 函数来动态加载；

## CommonJS的加载过程

CommonJS模块加载 js 文件的过程是运行时加载的，并且是同步的：

- 运行时加载意味着是js引擎在执行js代码的过程中加载 模块；

- 同步的就意味着一个文件没有加载结束之前，后面的代码都不会执行；

CommonJS通过module.exports导出的是一个对象：

- 导出的是一个对象意味着可以将这个对象的引用在其他模块中赋值给其他变量；
- 但是最终他们指向的都是同一个对象，那么一个变量修改了对象的属性，所有的地方都会被修改；

## ES Module加载过程

**ES Module加载js文件的过程是编译（解析）时加载的，并且是异步的：**

编译时（解析）时加载，意味着import不能和运行时相关的内容放在一起使用，比如from后面的路径需要动态获取，比如不能将import放到if等语句的代码块中。所以我们有时候也称ES Module是静态解析的，而不是动态或者运行时解析的。

**异步的意味着：JS引擎在遇到import时会去获取这个js文件，但是这个获取的过程是异步的，并不会阻塞主线程继 续执行；**也就是说设置了 type=module 的代码，相当于在script标签上也加上了 async 属性。如果我们后面有普通的script标签以及对应的代码，那么ES Module对应的js文件和代码不会阻塞它们的执行；

![image-20220410132012411](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204101320628.png)

 **ES Module通过export导出的是变量本身的引用：**

- export在导出一个变量时，js引擎会解析这个语法，并且创建**模块环境记录（module environment  record）；**
- 模块环境记录会和变量进行 绑定（binding），并且这个绑定是实时的；
-  而在导入的地方，我们是可以实时的获取到绑定的最新值的；
- 如果在导出的模块中修改了变化，那么导入的地方可以**实时获取最新的变量**；
- 在导入的地方不可以修改变量，因为它只是被绑定到了这个变量上**（其实是一个常量，或理解成静态只读引用）**
- **如果bar.js中导出的是一个对象，那么main.js中是否可以修改对象中的属性，他们指向同一块内存空间**

![image-20220410133157221](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204101331286.png)

## Node对ES Module的支持

方式一：在package.json中配置 type: module

方式二：文件以 .mjs 结尾，表示使用的是ES Module；

## CommonJS和ES Module交互

**通常情况下，CommonJS不能加载ES Module**

- 因为CommonJS是同步加载的，但是ES Module必须经过静态分析等，无法在这个时候执行JavaScript代码；Node当中是不支持的；

**多数情况下，ES Module可以加载CommonJS**

- ES Module在加载CommonJS时，会将其module.exports导出的内容作为default导出方式来使用；
- 这个依然需要看具体的实现，比如webpack中是支持的、Node最新的Current版本也是支持的；但是在最新的LTS版本中就不支持







