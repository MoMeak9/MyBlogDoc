---
date: 2022-08-24
category:
- React
- 源码探究
---

# React 中的 Fiber（纤程）及其工作原理

## 代数效应

`代数效应`能够将`副作用`（例子中为`请求图片数量`）从函数逻辑中分离，使函数关注点保持纯粹。（函数调用产生的副作用不需要使用者关心，并且是上下文无关的，并不与上下文逻辑相绑定）

## Fiber

`Fiber`并不是计算机术语中的新名词，他的中文翻译叫做`纤程`，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

> **Wiki：**
>
> 在计算机科学中，纤程（英语：Fiber）是一种最轻量化的线程（lightweight threads）。它是一种用户态线程（user thread），让应用程式可以独立决定自己的线程要如何运作。作业系统内核不能看见它，也不会为它进行排程。
>
> 就像一般的线程，纤程有自己的定址空间。但是纤程采取合作式多工（Cooperative multitasking），而线程采取先占式多工（Pre-emptive multitasking）。应用程式可以在一个线程环境中建立多个纤程，然后手动执行它。纤程不会被自动执行，必须要由应用程式自己指定让它执行，或换到下一个纤程。
>
> 跟线程相比，纤程较不需要作业系统的支援。

在很多文章中将`纤程`理解为`协程`的一种实现。在`JS`中，`协程`的实现便是`Generator`。

**`React Fiber`可以理解为：**

`React`内部实现的一套状态更新机制。支持任务不同`优先级`，可中断与恢复，并且恢复后可以复用之前的`中间状态`。其中每个任务更新单元为`React Element`对应的`Fiber节点`。

### 起源、含义

在`React15`及以前，`Reconciler`采用递归的方式创建虚拟DOM，递归过程是不能中断的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿。

为了解决这个问题，`React16`将**递归的无法中断的更新**重构为**异步的可中断更新**，由于曾经用于递归的**虚拟DOM**数据结构已经无法满足需要。于是，全新的`Fiber`架构应运而生。

**`Fiber`包含三层含义：**

1. 作为架构来说，之前`React15`的`Reconciler`采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack Reconciler`。`React16`的`Reconciler`基于`Fiber节点`实现，被称为`Fiber Reconciler`。
2. 作为静态的数据结构来说，每个`Fiber节点`对应一个`React element`，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。
3. 作为动态的工作单元来说，每个`Fiber节点`保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

### 结构

完整结构：

```js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

### 架构实现

#### 组成树形结构

靠如下三个属性形成树，这实际上是一颗  树（记录的是子节点和右边第一个兄弟Fiber节点）

```js
// 指向父级Fiber节点
this.return = null;
// 指向子Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```

举个例子，如下的组件结构：

```js
function App() {
  return (
    <div>
      i am
      <span>KaSong</span>
    </div>
  )
}
```

对应的`Fiber树`结构： <img src="https://cdn.yihuiblog.top/images/202208251236891.png" alt="Fiber架构" style="zoom: 33%;" />

> 什么父级指针叫做`return`而不是`parent`或者`father`呢？因为作为一个工作单元，`return`指节点执行完`completeWork`（本章后面会介绍）后会返回的下一个节点。子`Fiber节点`及其兄弟节点完成工作后会返回其父级节点，所以用`return`指代父级节点。

#### 静态数据结构

作为一种静态的数据结构，保存了组件相关的信息：

```js
// Fiber对应组件的类型 Function/Class/Host...
this.tag = tag;
// key属性
this.key = key;
// 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
this.elementType = null;
// 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
this.type = null;
// Fiber对应的真实DOM节点
this.stateNode = null;
```

#### 动态的工作单元

作为动态的工作单元，`Fiber`中如下参数保存了本次更新相关的信息，我们会在后续的更新流程中使用到具体属性时再详细介绍。

```js
// 保存本次更新造成的状态改变相关信息
this.pendingProps = pendingProps;
this.memoizedProps = null;
this.updateQueue = null;
this.memoizedState = null;
this.dependencies = null;

this.mode = mode;

// 保存本次更新会造成的DOM操作
this.effectTag = NoEffect;
this.nextEffect = null;

this.firstEffect = null;
this.lastEffect = null;
```

如下两个字段保存调度优先级相关的信息，会在讲解`Scheduler`时介绍。

```js
// 调度优先级相关
this.lanes = NoLanes;
this.childLanes = NoLanes;
```

## Fiber 架构工作原理

`Fiber节点`构成的`Fiber树`就对应`DOM树`，更新DOM则用到双缓存技术。

### 双缓存 Fiber 树

#### 什么是双缓存

当我们用`canvas`绘制动画，每一帧绘制前都会调用`ctx.clearRect`清除上一帧的画面。

如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题，我们可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。

这种**在内存中构建并直接替换**的技术叫做[双缓存](https://baike.baidu.com/item/双缓冲)

#### 构建方法

`React`使用“双缓存”来完成`Fiber树`的构建与替换——对应着`DOM树`的创建与更新

`current Fiber树`中的`Fiber节点`被称为`current fiber`，`workInProgress Fiber树`中的`Fiber节点`被称为`workInProgress fiber`，他们通过`alternate`属性连接。

```js
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```

`React`应用的根节点通过使`current`指针在不同`Fiber树`的`rootFiber`间切换来完成`current Fiber`树指向的切换，完成`DOM`更新。当当前的`workInProgress Fiber树`变成`current Fiber树`，相应地也开始进行新的`workInProgress Fiber树`的生成。

## 生命周期中的构建/替换流程

### mount 时



