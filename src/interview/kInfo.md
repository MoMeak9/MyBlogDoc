---
icon: edit
date: 2022-03-19
category:
- 面试题
- 前端
---


# 前端面试十万字书籍总结



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

