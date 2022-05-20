---
date: 2022-05-17
category:
- React
---

# Hooks ：如何正确理解函数组件的生命周期？

比如对于在第三讲介绍的例子，一个用于显示博客文章的组件接收一个文章的 id 作为参数，然后根据这个 id 从服务器端获取文章的内容并显示出来。那么当 id 变化的时候，你就需要检测到这个变化，并重新发送请求，显示在界面上。在 Class 组件中，你通常要用如下的代码实现：

```jsx
class BlogView extends React.Component {
  // ...
  componentDidMount() {
    // 组件第一次加载时去获取 Blog 数据
    fetchBlog(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      // 当 Blog 的 id 发生变化时去获取博客文章
      fetchBlog(this.props.id);
    }
  }
  // ...
}
```

to

```jsx
function BlogView({ id }) {
  useEffect(() => {
    // 当 id 变化时重新获取博客文章
    fetchBlog(id);
  }, [id]); // 定义了依赖项 id
}
```

在函数组件中你要思考的方式永远是：**当某个状态发生变化时，我要做什么**，而不再是在 Class 组件中的某个生命周期方法中我要做什么。

## 重新思考组件的生命周期

### 构造函数

那么在函数组件中，我们应该如何去做一些初始化的事情呢？答案是：函数组件基本上没有统一的初始化需要，因为 Hooks 自己会负责自己的初始化。比如 useState 这个 Hook，接收的参数就是定义的 State 初始值。而在过去的类组件中，你通常需要在构造函数中直接设置 this.state ，也就是设置某个值来完成初始化。

构造函数的本质，其实就是：<u>在所以其它代码执行之前的一次性初始化工作。</u>

虽然没有直接的机制可以做到这一点，但是利用 useRef 这个 Hook，我们可以实现一个 useSingleton 这样的一次性执行某段代码的自定义 Hook，代码如下：

```jsx
import { useRef } from 'react';

// 创建一个自定义 Hook 用于执行一次性代码
function useSingleton(callback) {
  // 用一个 called ref 标记 callback 是否执行过
  const called = useRef(false);
  // 如果已经执行过，则直接返回
  if (called.current) return;
  // 第一次调用时直接执行
  callBack();
  // 设置标记为已执行过
  called.current = true;
}
```

从而在一个函数组件中，可以调用这个自定义 Hook 来执行一些一次性的初始化逻辑：

```jsx
import useSingleton from './useSingleton';

const MyComp = () => {
  // 使用自定义 Hook
  useSingleton(() => {
    console.log('这段代码只执行一次');
  });

  return (
    <div>My Component</div>
  );
};
```

### 三种常用的生命周期方法

在类组件中，componentDidMount，componentWillUnmount，和 componentDidUpdate 这三个生命周期方法可以说是日常开发最常用的。业务逻辑通常要分散到不同的生命周期方法中，比如说在上面的 Blog 文章的例子中，你需要同时在 componentDidMount 和 componentDidUpdate 中去获取数据。

而在函数组件中，这几个生命周期方法可以统一到 useEffect 这个 Hook，正如 useEffect 的字面含义，它的作用就是触发一个副作用，即在组件每次 render 之后去执行。

```jsx
useEffect(() => {
  // componentDidMount + componentDidUpdate
  console.log('这里基本等价于 componentDidMount + componentDidUpdate');
  return () => {
    // componentWillUnmount
    console.log('这里基本等价于 componentWillUnmount');
  }
}, [deps])
```

一方面，useEffect(callback) 这个 Hook 接收的 callback，只有在依赖项变化时才被执行。而传统的 componentDidUpdate 则一定会执行。这样来看，Hook 的机制其实更具有语义化，因为过去在 componentDidUpdate 中，我们通常都需要手动判断某个状态是否发生变化，然后再执行特定的逻辑。

<u>另一方面，callback 返回的函数（一般用于清理工作）在下一次依赖项发生变化以及组件销毁之前执行，而传统的 componentWillUnmount 只在组件销毁时才会执行。</u>

useEffect 中返回的回调函数，只是清理当前执行的 Effect 本身。这其实是更加语义化的，因此你不用将其映射到 componentWillUnmount，它也完全不等价于 componentWillUnmount。你只需记住它的作用就是用于清理上一次 Effect 的结果就行了，这样在实际的开发中才能够使用得更加自然和合理。

### 其他方法

Class 组件中还有其它一些比较少用的方法，比如 getSnapshotBeforeUpdate, componentDidCatch, getDerivedStateFromError。比较遗憾的是目前 Hooks 还没法实现这些功能。因此如果必须用到，你的组件仍然需要用类组件去实现。date: 2022-05-17
category:
- React