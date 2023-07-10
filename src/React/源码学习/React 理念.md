---
date: 2022-08-24
category:
- React
- 源码探究
---

>  笔记内容来自于：
> 
> [React官网](https://reactjs.org/docs/react-component.html#setstate)
> 
> [React技术揭秘](https://react.iamkasong.com/)
> 
> 添加了个人笔记注释和观点，希望能帮助大家理解。此外，如果想要完整阅读原文内容，请前往卡颂的网站 [React技术揭秘](https://react.iamkasong.com/)。

# React 理念

> 我们认为，React 是用 JavaScript 构建**快速响应**的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。

React 通过解决Web应用的CPU的瓶颈、IO的瓶颈达到快速响应。

### CPU瓶颈

当项目变得庞大、组件数量繁多时（构建树压力大），就容易遇到CPU的瓶颈。

主流浏览器刷新频率为60Hz，即每（1000ms / 60Hz）16.6ms浏览器刷新一次。我们知道，JS可以操作DOM，`GUI渲染线程`与`JS线程`是互斥的。所以**JS脚本执行**和**浏览器布局、绘制**不能同时执行。即在这短时间内要完成：

```js
JS脚本执行 -----  样式布局 ----- 样式绘制
```

当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行**样式布局**和**样式绘制**，即常见的页面未响应，不更新等情况。

**React 解决**

在浏览器每一帧的时间中，预留一些时间给JS线程，`React`利用这部分时间更新组件（在[源码](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L119)中，预留的初始时间是5ms）。当预留的时间不够用时，`React`将线程控制权交还给浏览器使其有时间渲染UI，`React`则等待下一帧时间到来继续被中断的工作。

这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为`时间切片`（time slice）

此时我们的长任务被拆分到每一帧不同的`task`中，`JS脚本`执行时间大体在`5ms`左右，这样浏览器就有剩余时间执行**样式布局**和**样式绘制**，减少掉帧的可能性。

所以，解决`CPU瓶颈`的关键是实现`时间切片`，而`时间切片`的关键是：将**同步的更新**变为**可中断的异步更新**。

> `React`从v15升级到v16后重构了整个架构，这是16 + 架构的重要更新，此前的同步更新遇到长递归更新的情况会直接导致页面卡死，长时间占用CPU资源

### IO 瓶颈

对于前端应用主要需要解决的是网络延迟情况下减少用户对这种情况的感知。`React`给出的答案是[将人机交互研究的结果整合到真实的 UI 中](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html#putting-research-into-production)，实际上是对用户行为有意的“延迟”对UI的更新和反馈，并在背后并行地执行数据请求，并且使这个时间足够的短，使用户无感知，直到这个时间超过某个阈值之后再显示`loading`效果。

为了支持这些特性，同样需要将同步的更新变为可中断的异步更新。



