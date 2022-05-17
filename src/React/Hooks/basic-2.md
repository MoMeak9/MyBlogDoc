---
date: 2022-05-17
category:
- React
---
# Hooks（2）：避免重复定义回调函数

## useCallback：缓存回调函数

在 React 函数组件中，每一次 UI 的变化，都是通过重新执行整个函数来完成的，这和传统的 Class 组件有很大区别：<u>函数组件中并没有一个直接的方式在多次渲染之间维持一个状态。</u>

比如下面的代码中，我们在加号按钮上定义了一个事件处理函数，用来让计数器加 1。<u>但是因为定义是在函数组件内部，因此在多次渲染之间，是无法重用 handleIncrement 这个函数的，而是每次都需要创建一个新的：</u>

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => setCount(count + 1);
  // ...
  return <button onClick={handleIncrement}>+</button>
}
```

这也意味着，即使 count 没有发生变化，但是函数组件因为其它状态发生变化而重新渲染时，这种写法也会每次创建一个新的函数。创建一个新的事件处理函数，虽然不影响结果的正确性，但其实是没必要的。因为这样做不仅增加了系统的开销，更重要的是：**每次创建新函数的方式会让接收事件处理函数的组件，需要重新渲染。**

<u>比如这个例子中的 button 组件，接收了 handleIncrement ，并作为一个属性。如果每次都是一个新的，那么这个 React 就会认为这个组件的 props 发生了变化，从而必须重新渲染。因此，我们需要做到的是：**只有当 count 发生变化时，我们才需要重新定一个回调函数。而这正是 useCallback 这个 Hook 的作用。**</u>

```js
useCallback(fn, deps)
```

这里 fn 是定义的回调函数，deps 是依赖的变量数组。<u>只有当某个依赖变量发生变化时，才会重新声明 fn 这个回调函数。</u>

