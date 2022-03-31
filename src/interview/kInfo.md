---
icon: edit
date: 2022-03-19
category:
- 面试题
- 前端
sticky: true
star: true
---


# 前端面试十万字书籍总结

> [在线预览](https://my-doc-1259409954.cos.ap-guangzhou.myqcloud.com/pdf/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E5%8D%81%E4%B8%87%E5%AD%97%E8%B5%84%E6%96%99.pdf?ci-process=doc-preview&dstType=html)

## JavaScript专题

### 防抖

你是否在⽇常开发中遇到⼀个问题，在滚动事件中需要做个复杂计算或者实现⼀个按钮的防⼆次点击操作。

这些需求都可以通过函数防抖动来实现。尤其是第⼀个需求，如果在频繁的事件回调中做复杂计算，很有可能导致⻚⾯卡顿，不如将多次计算合并为⼀次计算，只在⼀个精确点做操作。

PS：防抖和节流的作⽤都是防⽌函数多次调⽤。区别在于，假设⼀个⽤户⼀直触发这个函数，且每次触发函数的间隔⼩于wait，防抖的情况下只会调⽤⼀次，⽽节流的 情况会每隔⼀定时间（参数wait）调⽤函数。

我们先来看⼀个袖珍版的防抖理解⼀下防抖的实现：

```js
// func是⽤户传⼊需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
    // 缓存⼀个定时器id
    let timer = 0
    // 这⾥返回的函数是每次⽤户实际调⽤的防抖函数
    // 如果已经设定过定时器了就清空上⼀次的定时器
    // 开始⼀个新的定时器，延迟执⾏⽤户传⼊的⽅法
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}
// 不难看出如果⽤户调⽤该函数的间隔⼩于wait的情况下，上⼀次的时间还未到就被清除了，并不会执⾏函数
```

这是⼀个简单版的防抖，但是有缺陷，这个防抖只能在最后调⽤。⼀般的防抖会有immediate选项，表示是否⽴即调⽤。这两者的区别，举个栗⼦来说：

- 例如在搜索引擎搜索问题的时候，我们当然是希望⽤户输⼊完最后⼀个字才调⽤查询接⼝，这个时候适⽤ 延迟执⾏ 的防抖函数，它总是在⼀连串（间隔⼩于wait的）函数触发之后调⽤。

- 例如⽤户给interviewMap点star的时候，我们希望⽤户点第⼀下的时候就去调⽤接⼝，并且成功之后改变star按钮的样⼦，⽤户就可以⽴⻢得到反馈是否star成功了，这个情况适⽤ ⽴即执⾏ 的防抖函数，它总是在第⼀次调⽤，并且下⼀次调⽤必须与前⼀次调⽤的时间间隔⼤于wait才会触发。

下⾯我们来实现⼀个带有⽴即执⾏选项的防抖函数

```js
// 这个是⽤来获取当前时间戳的
function now() {
    return new Date()
}

/**
 * 防抖函数，返回函数连续调⽤时，空闲时间必须⼤于或等于 wait，func 才会执⾏
 *
 * @param {function} func 回调函数
 * @param {number} wait 表示时间窗⼝的间隔
 * @param {boolean} immediate 设置为ture时，是否⽴即调⽤函数
 * @return {function} 返回客户调⽤函数
 */
function debounce(func, wait = 50, immediate = true) {
    let timer, context, args

    // 延迟执⾏函数
    const later = () => setTimeout(() => {
        // 延迟函数执⾏完毕，清空缓存的定时器序号
        timer = null
        // 延迟执⾏的情况下，函数会在延迟函数中执⾏
        // 使⽤到之前缓存的参数和上下⽂
        if (!immediate) {
            func.apply(context, args)
            context = args = null
        }
    }, wait)
    // 这⾥返回的函数是每次实际调⽤的函数
    return function (...params) {
        // 如果没有创建延迟执⾏函数（later），就创建⼀个
        if (!timer) {
            timer = later()
            // 如果是⽴即执⾏，调⽤函数
            // 否则缓存参数和调⽤上下⽂
            if (immediate) {
                func.apply(this, params)
            } else {
                context = this
                args = params
            }
            // 如果已有延迟执⾏函数（later），调⽤的时候清除原来的并重新设定⼀
            // 这样做延迟函数会重新计时
        } else {
            clearTimeout(timer)
            timer = later()
        }
    }
}
```

整体函数实现的不难，总结⼀下。

- 对于按钮防点击来说的实现：如果函数是⽴即执⾏的，就⽴即调⽤，如果函数是延迟执⾏的，就缓存上下⽂和参数，放到延迟函数中去执⾏。⼀旦我开始⼀个定时器，只要我定时器还在，你每次点击我都重新计时。⼀旦你点累了，定时器时间到，定时器重置为null ，就可以再次点击了。

- 对于延时执⾏函数来说的实现：清除定时器ID，如果是延迟调⽤就调⽤函数

### 节流

防抖动和节流本质是不⼀样的。防抖动是将多次执⾏变为最后⼀次执⾏，节流是将多次执⾏ 变成每隔⼀段时间执⾏。

```js
/*
   * 节流 思路：
   * 先开启一个定时任务执行，定时任务完成后则清空，当再调用时，如果定时任务仍存在则不执行任何操作
   * */
function throttle(fn, space) {
    let task = null;
    return function () {
        if (!task) {
            task = setTimeout(function (...arg) {
                task = null;
                fn.apply(this, arg);
            }, space);
        }
    }
}

let throttleShowLog = throttle(()=>{}, 3000);
```

### 模拟实现 call 和 apply

可以从以下⼏点来考虑如何实现

- 不传⼊第⼀个参数，那么默认为 window

- 改变了 this 指向，让新的对象可以执⾏该函数。那么思路是否可以变成给新的对象添加
  ⼀个函数，然后在执⾏完以后删除？

```js
Function.prototype.myCall = function (context) {
    context = context || window
    // 给 context 添加⼀个属性
    // getValue.call(a, 'yck', '24') => a.fn = getValue
    context.fn = this // 核心
    
    // 将 context 后⾯的参数取出来
    const args = [...arguments].slice(1)
    // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
    const result = context.fn(...args)
    // 删除 fn
    delete context.fn
    return result
}
```

以上就是 call 的思路， apply 的实现也类似

```js
Function.prototype.myApply = function (context) {
    context = context || window
    context.fn = this
    let result
    // 需要判断是否存储第⼆个参数
    // 如果存在，就将第⼆个参数展开
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}
```

bind 和其他两个⽅法作⽤也是⼀致的，只是该⽅法会返回⼀个函数。并且我们可以通过bind 实现柯⾥化。

同样的，也来模拟实现下 bind

```js
Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    const _this = this
    const args = [...arguments].slice(1)
    // 返回⼀个函数
    return function F() {
        // 因为返回了⼀个函数，我们可以 new F()，所以需要判断
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}
```

### Promise 实现
Promise 是 ES6 新增的语法，解决了回调地狱的问题。

可以把 Promise 看成⼀个状态机。初始是 pending 状态，可以通过函数 resolve 和 reject ，将状态转变为 resolved 或者 rejected 状态，状态⼀旦改变就不能再次变化。

### Generator 实现

Generator 是 ES6 中新增的语法，和 Promise ⼀样，都可以⽤来异步编程

从以上代码可以发现，加上 * 的函数执⾏后拥有了 next 函数，也就是说函数执⾏后返回 了⼀个对象。每次调⽤ next 函数可以继续执⾏被暂停的代码。以下是 Generator 函数的简单实现。

### Map、FlatMap 和 Reduce

Map 作⽤是⽣成⼀个新数组，遍历原数组，将每个元素拿出来做⼀些变换然后 append 到新 的数组中。

```js
[1, 2, 3].map((v) => v + 1)
// -> [2, 3, 4]
```

Map 有三个参数，分别是当前索引元素，索引，原数组

```js
['1','2','3'].map(parseInt)
// parseInt('1', 0) -> 1
// parseInt('2', 1) -> NaN
// parseInt('3', 2) -> NaN
```

FlatMap 和 map 的作⽤⼏乎是相同的，但是对于多维数组来说，会将原数组降维。可以将 FlatMap 看成是 map + flatten ，⽬前该函数在浏览器中还不⽀持。

而且仅支持一维

```js
const res = [1, [2], 3].flatMap((v) => v + 1)
// -> [ 2, '21', 4 ]
```

如果想将⼀个**多维数组彻底的降维**，可以这样实现

```js
const flattenDeep = (arr) => Array.isArray(arr)
 ? arr.reduce( (a, b) => [...a, ...flattenDeep(b)] , [])
 : [arr]
flattenDeep([1, [[2], [3, [4]], 5]])
```

Reduce 作⽤是数组中的值组合起来，最终得到⼀个值

```js
function a() {
    console.log(1);
}
function b() {
    console.log(2);
}
[a, b].reduce((a, b) => a(b()))
// -> 2 1
```

async 和 await ⼀个函数如果加上 async ，那么该函数就会返回⼀个 Promise

```js
async function test() {
 return "1";
}
console.log(test()); // -> Promise {<resolved>: "1"}
```

可以把 async 看成将函数返回值使⽤ Promise.resolve() 包裹了下。 

await 只能在 async 函数中使⽤。

```js
function sleep() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('finish')
            resolve("sleep");
        }, 2000);
    });
}

async function test() {
    let value = await sleep();
    console.log("object");
}

test()
```

上⾯代码会先打印 finish 然后再打印 object 。因为 await 会等待 sleep 函数resolve ，所以即使后⾯是同步代码，也不会先去执⾏同步代码再来执⾏异步代码。

async 和 await 相⽐直接使⽤ Promise 来说，优势在于处理 then 的调⽤链，能够更清晰准确的写出代码。缺点在于滥⽤ await 可能会导致性能问题，因为 await 会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致代码失去了并发性。

下⾯来看⼀个使⽤ await 的代码。

```js
var a = 0
var b = async () => {
    a = a + await 10
    console.log('2', a) // -> '2' 10
    a = (await 10) + a
    console.log('3', a) // -> '3' 20
}
b()
a++
console.log('1', a) // -> '1' 1
```

对于以上代码你可能会有疑惑，这⾥说明下原理

- ⾸先函数 b 先执⾏，在执⾏到 await 10 之前变量 a 还是 0，因为在 await 内部实现了 generators ， generators 会保留堆栈中东⻄，所以这时候 a = 0 被保存了下来
- 因为 await 是异步操作，遇到 await 就会⽴即返回⼀个 pending 状态的 Promise 对象，暂时返回执⾏代码的控制权，使得函数外的代码得以继续执⾏，所以会先执⾏console.log('1', a)
- 这时候同步代码执⾏完毕，开始执⾏异步代码，将保存下来的值拿出来使⽤，这时候 a = 10
- 然后后⾯就是常规执⾏代码了

### Proxy

Proxy 是 ES6 中新增的功能，可以⽤来⾃定义对象中的操作

可以很⽅便的使⽤ Proxy 来实现⼀个数据绑定和监听

### 为什么 0.1 + 0.2 != 0.3

因为 JS 采⽤ IEEE 754 双精度版本（64位），并且只要采⽤ IEEE 754 的语⾔都有该问题。 我们都知道计算机表示⼗进制是采⽤⼆进制表示的，所以 0.1 在⼆进制表示为

`0.1 = 2^-4 * 1.10011(0011)` 符号位 + 2 次方位 + 小数精度位

0.1 和 0.2 都是⽆限循环的⼆进制

所以 2^-4 * 1.10011...001 进位后就变成了 2^-4 * 1.10011(0011 * 12次)010 。那么 把这两个⼆进制加起来会得出 2^-2 * 1.0011(0011 * 11次)0100 , 这个值算成⼗进制就是 0.30000000000000004

下⾯说⼀下原⽣解决办法，如下代码所示

```js
parseFloat((0.1 + 0.2).toFixed(10))
```

### 正则表达式

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220328184718088.png" alt="image-20220328184718088" style="zoom:50%;" /><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220328184727564.png" alt="image-20220328184727564" style="zoom:50%;" />

### V8 下的垃圾回收机制

V8 实现了准确式 GC，GC 算法采⽤了分代式垃圾回收机制。因此，V8 将内存（堆）分为新 ⽣代和⽼⽣代两部分。

## ⽹络章节

### 事件机制

**事件触发三阶段**

事件触发有三个阶段

- window 往事件触发处传播，遇到注册的捕获事件会触发
- 传播到事件触发处时触发注册的事件
- 从事件触发处往 window 传播，遇到注册的冒泡事件会触发

事件触发⼀般来说会按照上⾯的顺序进⾏，但是也有特例，如果给⼀个⽬标节点同时注册冒
泡和捕获事件，事件触发会按照注册的顺序执⾏。

```js
// 以下会先打印冒泡然后是捕获
node.addEventListener('click',(event) =>{
    console.log('冒泡')
},false);
node.addEventListener('click',(event) =>{
    console.log('捕获 ')
},true)
```

### 注册事件

通常我们使⽤ addEventListener 注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值 useCapture 参数来说，该参数默认值为 false 。 useCapture 决定了注册的事件是捕获事件还是冒泡事件。对于对象参数来说，可以使⽤以下⼏个属性：

- capture ，布尔值，和 useCapture 作⽤⼀样
- once ，布尔值，值为 true 表示该回调只会调⽤⼀次，调⽤后会移除监听
- passive ，布尔值，表示永远不会调⽤ preventDefault

⼀般来说，我们只希望事件只触发在⽬标上，这时候可以使⽤ stopPropagation 来阻⽌事 件的进⼀步传播。通常**我们认为 stopPropagation 是⽤来阻⽌事件冒泡的，其实该函数也可以阻⽌捕获事件。**stopImmediatePropagation 同样也能实现阻⽌事件，但是还能阻⽌该 事件⽬标执⾏别的注册事件。

```js
node.addEventListener('click',(event) =>{
    event.stopImmediatePropagation()
    console.log('冒泡')
},false);
// 点击 node 只会执⾏上⾯的函数，该函数不会执⾏
node.addEventListener('click',(event) => {
    console.log('捕获 ')
},true)
```

### 事件代理

如果⼀个节点中的⼦节点是动态⽣成的，那么⼦节点需要注册事件的话应该注册在⽗节点上

```html
<ul id="ul">
 <li>1</li>
 <li>2</li>
 <li>3</li>
 <li>4</li>
 <li>5</li>
</ul>
<script>
 let ul = document.querySelector('#ul')
 ul.addEventListener('click', (event) => {
     console.log(event.target); 
     // target是关键
     //Event对象提供了一个属性叫target，可以返回事件的目标节点，我们成为事件源，也就是说，target就可以表示为当前的事件操作的dom
 })
</script>
```

事件代理的⽅式相对于直接给⽬标注册事件来说，有以下优点

- 节省内存
- 不需要给⼦节点注销事件

### 跨域

因为浏览器出于安全考虑，有同源策略。也就是说，如果协议、域名或者端⼝有⼀个不同就 是跨域，Ajax 请求会失败。 

我们可以通过以下⼏种常⽤⽅法解决跨域的问题：

- JSONP
- CORS
- document.domain
- postMessage

### Event loop :star: 事件循环

众所周知 JS 是⻔⾮阻塞单线程语⾔，因为在最初 JS 就是为了和浏览器交互⽽诞⽣的。如果 JS 是⻔多线程的语⾔话，我们在多个线程中处理 DOM 就可能会发⽣问题（⼀个线程中新加 节点，另⼀个线程中删除节点），当然可以引⼊读写锁解决这个问题。

JS 在执⾏的过程中会产⽣执⾏环境，这些执⾏环境会被顺序的加⼊到执⾏栈中。如果遇到异 步的代码，会被挂起并加⼊到 Task队列（任务队列，包括微任务，宏任务）中。⼀旦执⾏栈为空，Event Loop 就会从 Task 队列中拿出需要执⾏的代码并放⼊执⾏栈中执⾏，所以本质上来说 JS 中的异步 还是同步⾏为

```js
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0);
console.log('script end');
```

以上代码虽然 setTimeout 延时为 0，其实还是异步。这是因为 HTML5 标准规定这个函数 第⼆个参数不得⼩于 4 毫秒，不⾜会⾃动增加。所以 setTimeout 还是会在 script end 之后打印。

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（microtask） 和 宏任务（macrotask）。在 ES6 规范中，microtask 称为 jobs ，macrotask 称为 task 。

```js
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0);
new Promise((resolve) => {
    console.log('Promise') // 这个在主线哦
    resolve()
}).then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});
console.log('script end');
// script start => Promise => script end => promise1 => promise2 => setTimeout
```

以上代码虽然 setTimeout 写在 Promise 之前，但是因为 Promise 属于微任务⽽ setTimeout 属于宏任务，所以会有以上的打印。

微任务包括 `process.nextTick` ， `promise.then` ， `Object.observe` ， `MutationObserver`

宏任务包括 `script` ， `setTimeout` ， `setInterval` ， `setImmediate` ， `I/O` ， `UI rendering`

很多⼈有个误区，认为微任务快于宏任务，其实是错误的。**<u>因为宏任务中包括了 script ， 浏览器会先执⾏⼀个宏任务，接下来有异步代码的话就先执⾏微任</u>务**。

1. 执⾏同步代码，这属于宏任务
2. 执⾏栈为空，查询是否有微任务需要执⾏
3. 执⾏所有微任务
4. 必要的话渲染 UI
5. 然后开始下⼀轮 Event loop，执⾏宏任务中的异步代码

通过上述的 Event loop 顺序可知，如果宏任务中的异步代码有⼤量的计算并且需要操作 DOM 的话，为了更快的 界⾯响应，我们可以把操作 DOM 放⼊微任务中。

### Node 中的 Event loop

Node 中的 Event loop 和浏览器中的不相同。

Node 的 Event loop 分为6个阶段，它们会按照顺序反复运⾏

1. timer
2. I/O
3. idle, prepare
4. poll
5. check
6. close callbacks

### 存储

cookie，localStorage，sessionStorage，indexedDB（Web数据库）

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220328193531427.png" alt="image-20220328193531427" style="zoom: 80%;" />

从上表可以看到， cookie 已经不建议⽤于存储。如果没有⼤量数据存储需求的话，可以使⽤ localStorage 和 sessionStorage 。对于不怎么改变的数据尽量使⽤ localStorage存储，否则可以⽤ sessionStorage 存储。

对于 cookie ，我们还需要注意安全性。

![image-20220328193611835](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220328193611835.png)

### 渲染机制

浏览器的渲染机制⼀般分为以下⼏个步骤
1. 处理 HTML 并构建 DOM 树。
2. 处理 CSS 构建 CSSOM 树。
3. 将 DOM 与 CSSOM 合并成⼀个渲染树。
4. 根据渲染树来布局，计算每个节点的位置。
5. 调⽤ GPU 绘制，合成图层，显示在屏幕上。

**在构建 CSSOM 树时，会阻塞渲染**，直⾄ CSSOM 树构建完成。并且构建 CSSOM 树是⼀个 ⼗分消耗性能的过程，所以应该尽量保证层级扁平，减少过度层叠，越是具体的 CSS 选择 器，执⾏速度越慢。

当 HTML **解析到 script 标签时，会暂停构建 DOM**，完成后才会从暂停的地⽅重新开始。也 就是说，**如果你想⾸屏渲染的越快，就越不应该在⾸屏就加载 JS ⽂件**。**并且 CSS 也会影响 JS 的执⾏，<u>只有当解析完样式表才会执⾏ JS</u>，所以也可以认为这种情况下，CSS 也会暂停构建 DOM。**

合理顺序

- CSS
- HTML
- JS

### Load 和 DOMContentLoaded 区别

Load 事件触发代表⻚⾯中的 DOM，CSS，JS，图⽚已经全部加载完毕。

DOMContentLoaded 事件触发代表初始的 **HTML 被完全加载和解析**，不需要等待 CSS， JS，图⽚加载。

### 图层

⼀般来说，可以把普通⽂档流看成⼀个图层。特定的属性可以⽣成⼀个新的图层。不同的图 层渲染互不影响，所以对于某些频繁需要渲染的建议单独⽣成⼀个新图层，提⾼性能。但也 不能⽣成过多的图层，会引起反作⽤。

通过以下⼏个常⽤属性可以⽣成新图层

- 3D 变换： translate3d 、 translateZ
- will-change
- video 、 iframe 标签
- 通过动画实现的 opacity 动画转换
- position: fixed

重绘（Repaint）和回流（Reflow） 重绘和回流是渲染步骤中的⼀⼩节，但是这两个步骤对于性能影响很⼤。 

- 重绘是当节点需要更改外观⽽不会影响布局的，⽐如改变 color 就叫称为重绘 
- 回流是布局或者⼏何属性需要改变就称为回流

回流必定会发⽣重绘，重绘不⼀定会引发回流。回流所需的成本⽐重绘⾼的多，改变深层次 的节点很可能导致⽗节点的⼀系列回流。

所以以下⼏个动作可能会导致性能问题：

- 改变 window ⼤⼩
- 改变字体
- 添加或删除样式
- ⽂字改变
- 定位或者浮动
- 盒模型

很多⼈不知道的是，重绘和回流其实和 Event loop 有关。

1. 当 Event loop 执⾏完 Microtasks 后，会判断 document 是否需要更新。因为浏览器是60Hz 的刷新率，每 16ms 才会更新⼀次。
2. ...
3. 执⾏ requestAnimationFrame 回调

### 减少重绘和回流

- 使⽤ translate 替代 top

- 使⽤ visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流 （改变了布局）

- 把 DOM 离线后修改，⽐如：先把 DOM 给 display:none (有⼀次 Reflow)，然后你修 改100次，然后再把它显示出来

- 不要把 DOM 结点的属性值放在⼀个循环⾥当成循环⾥的变量

  ```js
  for(let i = 0; i < 1000; i++) {
   // 获取 offsetTop 会导致回流，因为需要去获取正确的值
       console.log(document.querySelector('.test').style.offsetTop)
  }
  ```

- 不要使⽤ table 布局，可能很⼩的⼀个⼩改动会造成整个 table 的重新布局

- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使⽤
  requestAnimationFrame

- CSS 选择符从右往左匹配查找，避免 DOM 深度过深

- 将频繁运⾏的动画变为图层，图层能够阻⽌该节点回流影响别的元素。⽐如对于 video 标签，浏览器会⾃动将该节点变为图层。

## 性能章节

### DNS 预解析 

DNS 解析也是需要时间的，可以通过预解析的⽅式来预先获得域名所对应的 IP

### 缓存

缓存对于前端性能优化来说是个很重要的点，良好的缓存策略可以降低资源的重复加载提⾼ ⽹⻚的整体加载速度。

通常浏览器缓存策略分为两种：强缓存和协商缓存。

**强缓存**

实现强缓存可以通过两种响应头实现： Expires 和 Cache-Control 。强缓存表示在缓存期 间不需要请求， state code 为 200

```
Expires: Wed, 22 Oct 2018 08:41:00 GMT
```

Expires 是 HTTP / 1.0 的产物，表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过 期，需要再次请求。并且 Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存 失效。

```
Cache-control: max-age=30
```

Cache-Control 出现于 HTTP / 1.1，优先级⾼于 Expires 。该属性表示资源会在 30 秒后 过期，需要再次请求。

**协商缓存**

如果缓存过期了，我们就可以使⽤协商缓存来解决问题。协商缓存需要请求，如果缓存有效 会返回 304。 

协商缓存需要客户端和服务端共同实现，和强缓存⼀样，也有两种实现⽅式。

**Last-Modified 和 If-Modified-Since**

Last-Modified 表示本地⽂件最后修改⽇期， If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该⽇期后资源是否有更新，有更新的话就会将新的资源发 送回来。

但是如果在**本地打开缓存⽂件，就会造成 Last-Modified 被修改，所以在 HTTP / 1.1 出现 了 ETag 。**

**ETag 和 If-None-Match**

ETag 类似于⽂件指纹， If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来。并且 ETag 优先级⽐ Last-Modified ⾼。

### 选择合适的缓存策略

对于⼤部分的场景都可以使⽤强缓存配合协商缓存解决，但是在⼀些特殊的地⽅可能需要选 择特殊的缓存策略

- 对于某些不需要缓存的资源，可以使⽤ **Cache-control: no-store** ，表示该资源不需 要缓存 
- 对于频繁变动的资源，可以使⽤ **Cache-Control: no-cache 并配合 ETag 使⽤**，表示 该资源已被缓存，但是每次都会发送请求询问资源是否更新。
-  对于代码⽂件来说，通常使⽤ Cache-Control: max-age=31536000(超长时间) 并配合策略缓存使⽤，**然后对⽂件进⾏指纹处理，⼀旦⽂件名变动就会⽴刻下载新的⽂件**。

### 使⽤ HTTP / 2.0
因为浏览器会有并发请求限制，在 HTTP / 1.1 时代，每个请求都需要建⽴和断开，消耗了好⼏个 RTT 时间，并且由于 TCP 慢启动的原因，加载体积⼤的⽂件会需要更多的时间。

在 HTTP / 2.0 中引⼊了多路复⽤，能够让多个请求使⽤同⼀个 TCP 链接，极⼤的加快了⽹
⻚的加载速度。并且还⽀持 Header 压缩，进⼀步的减少了请求的数据⼤⼩。

### 预加载

在开发中，可能会遇到这样的情况。有些资源不需要⻢上⽤到，但是希望尽早获取，这时候 就可以使⽤预加载。

预加载其实是**声明式的 fetch ，强制浏览器请求资源，并且不会阻塞 onload 事件**，可以 使⽤以下代码开启预加载

```
<link rel="preload" href="http://example.com">
```

预加载可以⼀定程度上降低⾸屏的加载时间，因为可以将⼀些不影响⾸屏但重要的⽂件延后 加载，唯⼀缺点就是兼容性不好。

### 预渲染

可以通过预渲染将下载的⽂件预先在后台渲染，可以使⽤以下代码开启预渲染

```
<link rel="prerender" href="http://example.com">
```

预渲染虽然可以提⾼⻚⾯的加载速度，但是要确保该⻚⾯百分百会被⽤户在之后打开，否则 就⽩⽩浪费资源去渲染

### 优化渲染过程

**懒执⾏**

懒执⾏就是将某些逻辑延迟到使⽤时再计算。该技术可以⽤于⾸屏优化，对于某些耗时逻辑 并**不需要在⾸屏就使⽤的**，就可以使⽤懒执⾏。**懒执⾏需要唤醒，⼀般可以通过定时器或者 事件的调⽤来唤醒。**

**懒加载**

懒加载就是将不关键的资源延后加载。

懒加载的原理就是只加载⾃定义区域（通常是可视区域，但也可以是即将进⼊可视区域）内 需要加载的东⻄。**对于图⽚来说，先设置图⽚标签的 src 属性为⼀张占位图，将真实的图⽚ 资源放⼊⼀个⾃定义属性中，当进⼊⾃定义区域时，就将⾃定义属性替换为 src 属性，这样 图⽚就会去下载资源，实现了图⽚懒加载**。

懒加载不仅可以⽤于图⽚，也可以使⽤在别的资源上。⽐如进⼊可视区域才开始播放视频等 等。

## ⽂件优化

### 图⽚优化

**图⽚加载优化**

1. 不⽤图⽚。很多时候会使⽤到很多修饰类图⽚，其实这类修饰图⽚完全可以⽤ CSS 去代
替。
2. 对于移动端来说，屏幕宽度就那么点，完全没有必要去加载原图浪费带宽。⼀般图⽚都⽤
CDN 加载，可以计算出适配屏幕的宽度，然后去请求相应裁剪好的图⽚。
3. ⼩图使⽤ base64 格式
4. 将多个图标⽂件整合到⼀张图⽚中（雪碧图）
5. 选择正确的图⽚格式：
- 对于能够显示 WebP 格式的浏览器尽量使⽤ WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更⼩的图⽚体积，⽽且拥有⾁眼识别⽆差异的图像质量，缺点就是兼容性并不好
- ⼩图使⽤ PNG，其实对于⼤部分图标这类图⽚，完全可以使⽤ SVG 代替
- 照⽚使⽤ JPEG

**其他⽂件优化**

- CSS ⽂件放在 head 中
- 服务端开启⽂件压缩功能
- 将 script 标签放在 body 底部，因为 JS ⽂件执⾏会阻塞渲染。当然也可以把script 标签放在任意位置然后加上 **defer** ，表示该⽂件会**并⾏下载**，但是会放到HTML 解析完成后顺序执⾏。对于没有任何依赖的 JS ⽂件可以加上 **async** ，表示**加载和渲染后续⽂档元素的过程将和 JS ⽂件的加载与执⾏并⾏⽆序进⾏**。
- 执⾏ JS 代码过⻓会卡住渲染，对于需要很多时间计算的代码可以考虑使⽤
  Webworker 。 Webworker 可以让我们另开⼀个线程执⾏脚本⽽不影响渲染。

**CDN**

静态资源尽量使⽤ CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使⽤多个 CDN 域名。对于 CDN 加载静态资源需要注意 CDN 域名要与主站不同，否则每次请求都会带 上主站的 Cookie。

### 其他

**使⽤ Webpack 优化项⽬**

- 对于 Webpack4，打包项⽬使⽤ production 模式，这样会⾃动开启代码压缩
- 使⽤ ES6 模块来开启 tree shaking(树摇)，这个技术可以移除没有使⽤的代码
- 优化图⽚，对于⼩图可以使⽤ base64 的⽅式写⼊⽂件中
- 按照路由拆分代码，实现按需加载
- 给打包出来的⽂件名添加哈希，实现浏览器缓存⽂

**如何渲染⼏万条数据并不卡住界⾯**

这道题考察了如何在不卡住⻚⾯的情况下渲染数据，也就是说不能⼀次性将⼏万条都渲染出来，⽽应该⼀次渲染部分 DOM，**那么就可以通过 requestAnimationFrame 来每 16 ms刷 新⼀次**。

## 框架基本原理篇

MVVM 由以下三个内容组成 

View：界⾯ 

Model：数据模型 

ViewModel：作为桥梁负责沟通 View 和 Model 

在 JQuery 时期，如果需要刷新 UI 时，需要先取到对应的 DOM 再更新 UI，这样数据和业务 的逻辑就和⻚⾯有强耦合。

在 MVVM 中，UI 是通过数据驱动的，数据⼀旦改变就会相应的刷新对应的 UI，UI 如果改 变，也会改变对应的数据。这种⽅式就可以在业务处理中只关⼼数据的流转，⽽⽆需直接和 ⻚⾯打交道。ViewModel 只关⼼数据和业务的处理，不关⼼ View 如何处理数据，在这种情况 下，View 和 Model 都可以独⽴出来，任何⼀⽅改变了也不⼀定需要改变另⼀⽅，并且可以将 ⼀些可复⽤的逻辑放在⼀个 ViewModel 中，让多个 View 复⽤这个 ViewModel。

在 MVVM 中，最核⼼的也就是**数据双向绑定**，例如 Angluar 的脏数据检测，**Vue 中的数据劫持。**

### 数据劫持

Vue2 内部使⽤了 Object.defineProperty() 来实现双向绑定，通过这个函数可以监听到 set 和 get 的事件。

以上代码简单的实现了如何监听数据的 set 和 get 的事件，但是仅仅如此是不够的，还需 要在适当的时候给属性添加发布订阅

```html
<div>
 {{name}}
</div>
```

在解析如上模板代码时，遇到 {{name}} 就会给属性 name 添加发布订阅。

### Proxy 与 Object.defineProperty 对⽐

Object.defineProperty 虽然已经能够实现双向绑定了，但是他还是有缺陷的。
1. 只能对属性进⾏数据劫持，所以需要**深度遍历整个对象**
2. 对于数组不能监听到数据的变化(Vue2重写数组方法)

### 路由原理

前端路由实现起来其实很简单，本质就是监听 URL 的变化，然后匹配路由规则，显示相应的 ⻚⾯，并且⽆须刷新。⽬前单⻚⾯使⽤的路由就只有两种实现⽅式

- hash 模式
- history 模式

www.test.com/#/ 就是 Hash URL，当 # 后⾯的哈希值发⽣变化时，不会向服务器请求数 据，可以通过 **hashchange 事件**来监听到 URL 的变化，从⽽进⾏跳转⻚⾯。

![image-20220330135438925](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220330135438925.png)

**History** 模式是 **HTML5 新推出的功能**，⽐之 Hash URL 更加美观

![image-20220330135446497](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220330135446497.png)

### Virtual Dom

**为什么需要 Virtual Dom**

众所周知，操作 DOM 是很耗费性能的⼀件事情，既然如此，我们可以考虑通过 JS 对象来模 拟 DOM 对象，毕竟操作 JS 对象⽐操作 DOM 省时的多。

当然在实际操作中，我们还需要给每个节点⼀个标识，作为判断是同⼀个节点的依据。**所以 这也是 Vue 和 React 中官⽅推荐列表⾥的节点使⽤唯⼀的 key 来保证性能**。

那么既然 DOM 对象可以通过 JS 对象来模拟，反之也可以通过 JS 对象来渲染出对应的 DOM

**Virtual Dom 算法简述**
DOM 是多叉树的结构，**如果需要完整的对⽐两颗树的差异**，那么需要的时间复杂度会是 O(n^ 3)，这个复杂度肯定是不能接受的。于是 React 团队优化了算法，实现了 O(n) 的复杂度来对⽐差异。

实现 O(n) 复杂度的关键就是**<u>只对⽐同层的节点，⽽不是跨层对⽐</u>**，这也是考虑到在实际业**务中很少会去跨层的移动 DOM 元素。**

所以判断差异的算法就分为了**两步**

- ⾸先从上⾄下，从左往右遍历对象，也就是树的**深度遍历**，**这⼀步中会给每个节点添加索引，便于最后渲染差异**
- ⼀旦节点有⼦元素，就去判断⼦元素是否有不同

## Vue 章节

### NextTick 原理分析

nextTick 可以让我们在**下次 DOM 更新循环结束之后**执⾏延迟回调，⽤于获得更新后的 DOM。

### ⽣命周期分析

⽣命周期函数就是组件在初始化或者数据更新时会触发的钩⼦函数。

- created
- mounted
- upadted
- destoryed

## 安全章节

### XSS

> 跨⽹站指令码（英语：Cross-site scripting，通常简称为：XSS）是⼀种⽹站应⽤程 式的安全漏洞攻击，是代码注⼊的⼀种。它允许恶意使⽤者将程式码注⼊到⽹⻚上， 其他使⽤者在观看⽹⻚时就会受到影响。这类攻击通常包含了 HTML 以及使⽤者端 脚本语⾔。

XSS 分为三种：反射型，存储型和 DOM-based

- 例如通过 URL 获取某些参数
- ⽐如写了⼀篇包含攻击代码  的⽂章

**如何防御**

最普遍的做法是转义输⼊输出的内容，对于**引号，尖括号，斜杠**进⾏转义

对于显示富⽂本来说，**不能通过上⾯的办法来转义所有字符，因为这样会把需要的格式也过滤掉**。这种情况通常采⽤**⽩名单过滤**的办法，当然也可以通过⿊名单过滤，但是考虑到需要 过滤的标签和标签属性实在太多，更加推荐使⽤⽩名单的⽅式。

### CSP

> 内容安全策略 (CSP) 是⼀个额外的安全层，⽤于检测并削弱某些特定类型的攻击， 包括跨站脚本 (XSS) 和数据注⼊攻击等。⽆论是数据盗取、⽹站内容污染还是散发恶 意软件，这些攻击都是主要的⼿段。

### CSRF

> 跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或 者 session riding，通常缩写为 CSRF 或者 XSRF， 是⼀种挟制⽤户在当前已登录 的Web应⽤程序上执⾏⾮本意的操作的攻击⽅法。跟跨網站指令碼（XSS）相 ⽐，XSS 利⽤的是⽤户对指定⽹站的信任，CSRF 利⽤的是⽹站对⽤户⽹⻚浏览器 的信任。

假设⽹站中有⼀个通过 Get 请求提交⽤户评论的接⼝，那么攻击者就可以在钓⻥⽹站中加⼊ ⼀个图⽚，图⽚的地址就是评论接⼝

```js
<img src="http://www.domain.com/xxx?comment='attack'"/>
```

如果接⼝是 Post 提交的，就相对麻烦点，需要⽤表单来提交接⼝

```html
<form action="http://www.domain.com/xxx" id="CSRF" method="post">
 <input name="comment" value="attack" type="hidden">
</form>
```

**如何防御**

防范 CSRF 可以遵循以下⼏种规则：

1. Get 请求不对数据进⾏修改
2. 不让第三⽅⽹站访问到⽤户 Cookie
3. 阻⽌第三⽅⽹站请求接⼝
4. 请求时附带验证信息，⽐如验证码或者 token

**SameSite**

可以对 Cookie 设置 SameSite 属性。该属性设置 Cookie 不随着跨域请求发送，该属性可以很⼤程度减少 CSRF 的攻击，但是该属性⽬前并不是所有浏览器都兼容。

**验证 Referer**

对于需要防范 CSRF 的请求，我们可以通过验证 Referer 来判断该请求是否为第三⽅⽹站发起的。（用referer来判断上一页面是不是自己网站）

**Token**

服务器下发⼀个随机 Token（算法不能复杂），每次发起请求时将 Token 携带上，服务器验证 Token 是否有效。

## 密码安全

密码安全虽然⼤多是后端的事情，但是作为⼀名优秀的前端程序员也需要熟悉这⽅⾯的知识。

**加盐**

对于密码存储来说，必然是不能明⽂存储在数据库中的，否则⼀旦数据库泄露，会对⽤户造 成很⼤的损失。并且不建议只对密码单纯通过加密算法加密，因为存在彩虹表的关系。

## ⽹络章节

### UDP

**⾯向报⽂**

UDP 是⼀个⾯向报⽂（报⽂可以理解为⼀段段的数据）的协议。意思就是 UDP 只是报⽂的搬运⼯，不会对报⽂进⾏任何拆分和拼接操作。

具体来说

- 在发送端，应⽤层将数据传递给传输层的 UDP 协议，UDP 只会给数据增加⼀个 UDP 头标识下是 UDP 协议，然后就传递给⽹络层了
- 在接收端，⽹络层将数据传递给传输层，UDP 只去除 IP 报⽂头就传递给应⽤层，不会任何拼接操作

**不可靠性**

1. UDP 是⽆连接的，也就是说通信不需要建⽴和断开连接。
2. UDP 也是不可靠的。协议收到什么数据就传递什么数据，并且也不会备份数据，对⽅能不能收到是不关⼼的
3. UDP 没有拥塞控制，⼀直会以恒定的速度发送数据。即使⽹络条件不好，也不会对发送速率进⾏调整。这样实现的弊端就是在⽹络条件不好的情况下可能会导致丢包，但是优点也很明显，在某些实时性要求⾼的场景（⽐如电话会议）就需要使⽤ UDP ⽽不是 TCP。

**⾼效**

因为 UDP 没有 TCP 那么复杂，需要保证数据不丢失且有序到达。**所以 UDP 的头部开销⼩， 只有⼋字节，相⽐ TCP 的⾄少⼆⼗字节要少得多**，在传输数据报⽂时是很⾼效的。

![image-20220331003314946](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220331003314946.png)
