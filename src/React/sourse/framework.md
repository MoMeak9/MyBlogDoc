---
date: 2022-08-24
category:
- React
- 源码探究
---

# React 架构

因为v15不能满足快速响应的理念（或者说原先的设计缺陷），`React`从v15升级到v16后重构了整个架构。

## React 15 架构

React15架构可以分为两层：

- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

### Reconciler（协调器）

我们知道，在`React`中可以通过`this.setState`、`this.forceUpdate`、`ReactDOM.render`等API触发更新。

每当有更新发生时，**Reconciler**会做如下工作（对比并协调渲染器更新）：

1. 调用函数组件、或class组件的`render`方法，将返回的 JSX 转化为虚拟 DOM

2. 将虚拟DOM和上次更新时的虚拟DOM对比
3. 通过对比找出本次更新中变化的虚拟DOM
4. 通知**Renderer**将变化的虚拟DOM渲染到页面上

> **官方描述：**
>
> “stack” reconciler 是 React 15 及更早的解决方案，React已经停止了对它的使用。
>

### Renderer（渲染器）

由于`React`支持跨平台，所以不同平台有不同的**Renderer**。我们前端最熟悉的是负责在浏览器环境渲染的**Renderer** —— [ReactDOM](https://www.npmjs.com/package/react-dom) （接受协调的工具人）

> **渲染器用于管理一棵 React 树，使其根据底层平台进行不同的调用。**

除此之外，还有：

- [ReactNative (opens new window)](https://www.npmjs.com/package/react-native)渲染器，渲染App原生组件
- [ReactTest (opens new window)](https://www.npmjs.com/package/react-test-renderer)渲染器，渲染出纯Js对象用于测试
- [ReactArt (opens new window)](https://www.npmjs.com/package/react-art)渲染器，渲染到Canvas, SVG 或 VML (IE8)

在每次更新发生时，**Renderer**接到**Reconciler**通知，将变化的组件渲染在当前宿主环境。

###  React15架构的缺点

在Reconciler中，mount的组件会调用mountComponent (opens new window)，update的组件会调用updateComponent (opens new window)。这两个方法都会递归更新子组件。

#### 递归更新的缺点

由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。

![更新流程](https://cdn.yihuiblog.top/images/202208241736854.png)

而v15使用同步更新，**Reconciler**和**Renderer**是交替工作的，当第一个`li`在页面上已经变化后，第二个`li`再进入**Reconciler**。由于整个过程都是同步的，所以在用户看来所有DOM是同时更新的，但是这样也就导致了对多个节点同步更新的卡顿问题，因为他需要“全部”更新完成后交付给用户，只有当时间比较短的时候才会使用户感觉是同步更新的。

让我们模拟一下，如果中途中断更新会怎么样？

> 实际中v15并不能直接中断，而这也是导致卡顿的矛盾点

![中断更新流程](https://cdn.yihuiblog.top/images/202208241738053.png)

当第一个`li`完成更新时中断更新，即步骤3完成后中断更新，此时后面的步骤都还未执行。

用户本来期望`123`变为`246`。实际却看见更新不完全的DOM！（即`223`）

基于这个原因，`React`决定重写整个架构。

## React 16 架构

React16架构可以分为三层：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

### Scheduler（调度器）:star:

既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。

其实部分浏览器已经实现了这个API，这就是[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)，但由于以下缺陷，React放弃使用：

- 服务器兼容性
- 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的`requestIdleCallback`触发的频率会变得很低

> 又再次证明了，前端工程师的技术升级靠的是客户的浏览器的升级

基于以上原因，`React`实现了功能更完备的`requestIdleCallback ` polyfill（腻子脚本），这就是**Scheduler**。除了在空闲时触发回调的功能外，**Scheduler**还提供了多种调度优先级供任务设置。[Scheduler](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/README.md)是独立于`React`的库。

### Reconciler（协调器）变动

更新工作从递归变成了可以中断的循环过程。每次循环都会调用`shouldYield`判断当前是否有剩余时间。

```js
/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

在React16中，**Reconciler**与**Renderer**不再是交替工作。当**Scheduler**将任务交给**Reconciler**后，**Reconciler**会为变化的虚拟DOM打上代表增/删/更新的标记，类似这样：

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

整个**Scheduler**与**Reconciler**的工作都在内存中进行。只有当所有组件都完成**Reconciler**的工作，才会统一交给**Renderer**。

> **官方描述：**
>
> “fiber” reconciler 是一个新尝试，致力于解决 stack reconciler 中固有的问题，同时解决一些历史遗留问题。Fiber 从 React 16 开始变成了默认的 reconciler。
>
> 它的主要目标是：
>
> - 能够把可中断的任务切片处理。
> - 能够调整优先级，重置并复用任务。
> - 能够在父元素与子元素之间交错处理，以支持 React 中的布局。
> - 能够在 `render()` 中返回多个元素。
> - 更好地支持错误边界。
>
> 你可以在[这里](https://github.com/acdlite/react-fiber-architecture)和[这里](https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e)，深入了解 React Fiber 架构。虽然这已经在 React 16 中启用了，但是 async 特性还没有默认开启。

### Renderer（渲染器）变动

在React16架构中整个更新流程为：

![更新流程](https://cdn.yihuiblog.top/images/202208251059950.png)

其中红框中的步骤随时可能由于以下原因被中断：

- 有其他更高优任务需要先更新
- 当前帧没有剩余时间

由于红框中的工作都在内存中进行，不会更新页面上的DOM，所以即使反复中断，用户也不会看见更新不完全的DOM（即上一节演示的情况）。所以，实际上真实DOM更新还是同步进行的，但对虚拟DOM的检查和更新是异步可中断的，当没有其他变化的时候，Reconciler将完整的可交付虚拟DOM交给渲染器统一渲染。

> 实际上，由于**Scheduler**和**Reconciler**都是平台无关的，所以`React`为他们单独发了一个包[react-Reconciler](https://www.npmjs.com/package/react-reconciler)
>
> 还有就是，从红色框到渲染器的部分还依赖于双缓存的实现，以保证用户无法明显感知这一更新过程。

