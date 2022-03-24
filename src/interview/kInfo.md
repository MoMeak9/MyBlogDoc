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
 	return function(...args) {
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
 return +new Date()
}
/**
* 防抖函数，返回函数连续调⽤时，空闲时间必须⼤于或等于 wait，func 才会执⾏
 *
 * @param {function} func 回调函数
 * @param {number} wait 表示时间窗⼝的间隔
 * @param {boolean} immediate 设置为ture时，是否⽴即调⽤函数
 * @return {function} 返回客户调⽤函数
 */
function debounce (func, wait = 50, immediate = true) {
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
 return function(...params) {
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
