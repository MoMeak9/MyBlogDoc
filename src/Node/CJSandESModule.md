---
date: 2022-08-06
category:
- 前端
- JavaScript
---

# CJS 和 ES Module 横向对比

## ES Module

### export关键字

export关键字将一个模块中的变量、函数、类等导出；

**我们希望将其他中内容全部导出，它可以有如下的方式：**

- 方式一：在语句声明的前面直接加上export关键字

```js
export const myName = "ypf";
export const myAge = 18;
export function foo() {
	console.log("foo start");
}
export class Person {
	GetMsg() {
		console.log("Person GetMsg start");
	}
}
```

- 方式二：将所有需要导出的标识符，放到export后面的 {}中

```js
const myName = "ypf";
const myAge = 18;
function foo() {
	console.log("foo start");
}
class Person {
	GetMsg() {
		console.log("Person GetMsg start");
	}
}
export { myName, myAge, foo, Person };
```

- 方式三：导出时给标识符起一个别名

```js
const myName1 = "ypf";
const myAge1 = 18;
function foo1() {
	console.log("foo start");
}
class Person1 {
	GetMsg() {
		console.log("Person GetMsg start");
	}
}
export { myName1 as myName, myAge1 as myAge, foo1 as foo, Person1 as Person };
```

### import关键字

**导入内容的方式也有多种：**

- import { 标识符列表 } from ' 模块 '，原名输出；

```js
import { myName, myAge, foo, Person } from "./module.js";
```

- 方式二：导入时给标识符起别名

```js
import {
	myName as myName2,
	myAge as myAge2,
	foo as foo2,
	Person as Person2,
} from "./module.js";
```

- 方式三：通过 * 将模块功能放到一个模块功能对象（a module object）上

```js
import * as myData from "./module.js";
```

### export和import结合使用

```js
export {sum as barSum} from './bar.js';
```

**为什么要这样做呢？**

在开发和封装一个功能库时，通常我们希望将暴露的所有接口放到一个文件中，这样方便指定统一的接口规范，也方便阅读。

### default用法 默认导出

默认导出export时可以不需要指定名字，在导入时不需要使用 {}，并且可以自己来指定名字，它也方便我们和现有的CommonJS等规范相互操作。

**注意：在一个模块中，只能有一个默认导出（default export）；**

### import() 函数

**import 是静态解析并加载一个模块的，是不可以将其放到逻辑代码中的**

因为ES Module在被JS引擎解析时，就必须知道它的依赖关系，由于这个时候js代码没有任何的运行，所以无法在进行类似于if判断中根据代码的执行情况。

但是某些情况下，我们确确实实希望动态的来加载某一个模块，这个时候我们需要使用 import() 函数来动态加载。

## 加载对比

### CommonJS的加载过程

1. **CommonJS模块加载 js 文件的过程是运行时加载的，并且是同步的。**

   这意味着是js引擎在**执行js代码的过程中加载模块**。同步的也就意味着一个文件没有加载结束之前，后面的代码都不会执行。

2. **CommonJS通过module.exports导出的是一个对象（对对象的引用）。**

   导出的是一个对象意味着可以将这个对象的引用在其他模块中赋值给其他变量，但是最终他们指向的都是同一个对象，那么一个变量修改了对象的属性，所有的地方都会被修改。

### ES Module加载过程

1. **ES Module加载js文件的过程是编译（解析）时加载的，并且是异步的**

   编译（解析）时加载，意味着import不能和运行时相关的内容放在一起使用，比如from后面的路径需要动态获取，比如不能将import放到if等语句的代码块中。所以我们有时候也称ES Module是静态解析的，而不是动态或者运行时解析的。

   **异步的意味着**，JS引擎在遇到import时会去获取这个js文件，但是这个获取的过程是异步的，并不会阻塞主线程继续执行。**在`type="module"`的情况下，不管是文件还是行内脚本，都会具有`defer`的特性。**

   而`async`可以作用于所有的`module`类型的脚本，无论是行内还是文件形式的。但是添加了`async`关键字以后并不意味着浏览器在解析到这个脚本文件时就会执行，**而是会等到这段脚本所依赖的所有`module`加载完毕后再执行。**

   ![image](https://cdn.yihuiblog.top/images/202208081618461.png)

2. **ES Module通过export导出的是变量本身的引用**

   export在导出一个变量时，js引擎会解析这个语法，并且创建**模块环境记录（module environment  record）**。模块环境记录会和变量进行绑定（binding），并且这个绑定是实时的。

   而在导入的地方，我们是可以实时的获取到绑定的最新值的，如果在导出的模块中修改了变化，那么导入的地方可以**实时获取最新的变量**。

   但是，在导入的地方不可以修改变量，因为它只是被绑定到了这个变量上**（其实是一个常量，或理解成静态只读引用）**

## CJS和ES Module交互

**通常情况下，CommonJS不能加载ES Module**

因为CommonJS是同步加载的，但是ES Module必须经过静态分析等，无法在这个时候执行JavaScript代码，Node当中是不支持的。

**多数情况下，ES Module可以加载CommonJS**

ES Module在加载CommonJS时，会将其module.exports导出的内容作为default导出方式来使用，这个依然需要看具体的实现，比如webpack中是支持的、Node最新的Current版本也是支持的，但是在最新的LTS版本中就不支持。

>  文章内容根据`codewhy`老师的`《深入Node.js技术栈》`课程整理的笔记。
