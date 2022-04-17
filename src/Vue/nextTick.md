---
title: 详解Vue的nextTick
date: 2021-9-26
author: MoMeaks
sidebar: 'auto'
categories:
- blog
tags:
- Vue
---

## Vue.$nextTick()

其实一句话就可以把`$nextTick`这个东西讲明白：就是你放在`$nextTick  `当中的操作不会立即执行，而是等数据更新、DOM更新完成之后再执行，这样我们拿到的肯定就是最新的了。

再准确一点来讲就是`$nextTick`方法将回调延迟到下次DOM更新循环之后执行。（看不懂这句人话的，可以看上面[狗头]）

意思我们都懂了，那`$nextTick`是怎样完成这个神奇的功能的呢？ 核心如下：

> `Vue`在内部对异步队列尝试使用原生的`Promise.then`、`MutationObserver`和`setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)`代替。

仔细地看这句话，你就可以发现这不就是利用 JavaScript 的这些异步回调任务队列，来实现 Vue 框架中自己的异步回调队列。这其实就是一个典型的将底层 JavaScript 执行原理应用到具体案例中的示例。

具体地源码分析可以看[面试题：Vue中$nextTick原理 - 云+社区 - 腾讯云 (tencent.com)](https://link.juejin.cn?target=https%3A%2F%2Fcloud.tencent.com%2Fdeveloper%2Farticle%2F1633546)  讲的很清晰

我在这里稍微总结一下：**就是`$nextTick`将回调函数放到微任务或者宏任务当中以延迟它地执行顺序**；（总结的也比较懒👶）

重要的是理解源码中它的三个参数的意思：

- callback：我们要执行的操作，可以放在这个函数当中，我们没执行一次`$nextTick`就会把回调函数放到一个异步队列当中；
- pending：标识，用以判断在某个事件循环中是否为第一次加入，第一次加入的时候才触发异步执行的队列挂载
- timerFunc：用来触发执行回调函数，也就是`Promise.then`或`MutationObserver`或`setImmediate` 或`setTimeout`的过程

理解之后，在看整个`$nextTick`里面的执行过程，其实就是把一个个`$nextTick`中的回调函数压入到callback队列当中，然后根据事件的性质等待执行，轮到它执行的时候，就执行一下，然后去掉callback队列中相应的事件。

### nextTick的使用场景

- 1.在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中。
- 2.在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted()钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。
- 3.在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。
- 例如，当你设置vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。

## 补充

之前我一直搞不懂一个的问题，`$nextTick`既然把它传入的方法变成微任务了，那它和其它微任务的执行顺序是怎样的呢？

这简单来说就是谁先挂载`Promise`对象的问题，在调用`$nextTick`方法时就会将其闭包内部维护的执行队列挂载到`Promise`对象，在数据更新时`Vue`内部首先就会执行`$nextTick`方法，之后便将执行队列挂载到了`Promise`对象上，其实在明白`Js`的`Event Loop`模型后，将数据更新也看做一个`$nextTick`方法的调用，并且明白`$nextTick`方法会一次性执行所有推入的回调，就可以明白执行顺序的问题了

还有`$nextTick`和`nextTick`区别就是`nextTick`多了一个context参数，用来指定上下文。但两个的本质是一样的，`$nextTick`是实例方法，`nextTick`是类的静态方法而已；实例方法的一个好处就是，自动给你绑定为调用实例的`this`罢了。


作者：乐嫣
