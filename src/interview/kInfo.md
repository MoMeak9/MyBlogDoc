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
