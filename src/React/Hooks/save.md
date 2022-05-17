# 内置 Hooks（1）：如何保存组件状态和使用生命周期？

## useState：让函数组件具有维持状态的能力

在第一讲中，你已经知道了 state 是 React 组件的一个核心机制，那么 useState 这个 Hook 就是用来管理 state 的，它可以让函数组件具有**维持状态的能力**。也就是说，<u>在一个函数组件的多次渲染之间，这个 state 是共享的。</u>下面这个例子就显示了 useState 的用法：

```jsx
import React, { useState } from 'react';

function Example() {
  // 创建一个保存 count 的 state，并给初始值 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}
```

在这个例子中，我们声明了一个名为 count 的 state，并得到了设置这个 count 值的函数 setCount。当调用 setCount 时，count 这个 state 就会被更新，并触发组件的刷新。那么 useState 这个 Hook 的用法总结出来就是这样的：

1. useState(initialState) 的参数 initialState 是创建 state 的初始值，它可以是任意类型，比如数字、对象、数组等等。

2. useState() 的返回值是一个有着两个元素的数组。第一个数组元素用来读取 state 的值，第二个则是用来设置这个 state 的值。在这里要注意的是，state 的变量（例子中的 count）是只读的，所以我们必须通过第二个数组元素 setCount 来设置它的值。

3. 如果要创建多个 state，那么我们就需要多次调用 useState。比如要创建多个 state，使用的代码如下：

   ```jsx
   // 定义一个年龄的 state，初始值是 42
   const [age, setAge] = useState(42);
   // 定义一个水果的 state，初始值是 banana
   const [fruit, setFruit] = useState('banana');
   // 定一个一个数组 state，初始值是包含一个 todo 的数组
   const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
   ```

类组件中的 state 只能有一个。所以我们一般都是把一个对象作为 一个 state，然后再通过不同的属性来表示不同的状态。<u>而函数组件中用 useState 则可以很容易地创建多个 state，所以它更加语义化。</u>

**我们要遵循的一个原则就是：state 中永远不要保存可以通过计算得到的值。比如说：**

1. 从 props 传递过来的值。有时候 props 传递过来的值无法直接使用，而是要通过一定的计算后再在 UI 上展示，比如说排序。那么我们要做的就是每次用的时候，都重新排序一下，或者利用某些 cache 机制，而不是将结果直接放到 state 里。
2. 从 URL 中读到的值。比如有时需要读取 URL 中的参数，把它作为组件的一部分状态。那么我们可以在每次需要用的时候从 URL 中读取，而不是读出来直接放到 state 里。
3. 从 cookie、localStorage 中读取的值。通常来说，也是每次要用的时候直接去读取，而不是读出来后放到 state 里。

不过，state 虽然便于维护状态，但也有自己的弊端。**一旦组件有自己状态，意味着组件如果重新创建，就需要有恢复状态的过程，这通常会让组件变得更复杂。**

<u>比如一个组件想在服务器端请求获取一个用户列表并显示，如果把读取到的数据放到本地的 state 里，那么每个用到这个组件的地方，就都需要重新获取一遍。</u>（重新获取一遍的意思是，一个组件多处使用那么每个组件的状态互不干扰独立存在。）

## useEffect：执行副作用

什么是副作用呢？通常来说，副作用是指一段和当前执行结果无关的代码。比如说要修改函数外部的某个变量，要发起一个请求，等等。也就是说，在函数组件的当次执行过程中，<u>useEffect 中代码的执行是不影响渲染出来的 UI 的。</u>

我们先来看一下它的具体用法。useEffect 可以接收两个参数，函数签名如下：

```js
useEffect(callback, dependencies)
```

第一个为要执行的函数 callback，第二个是可选的依赖项数组 dependencies。<u>其中依赖项是可选的，如果不指定，那么 callback 就会在每次函数组件执行完后都执行；如果指定了，那么只有依赖项中的值发生变化的时候，它才会执行。</u>

对应到 Class 组件，那么 useEffect 就涵盖了 ComponentDidMount、componentDidUpdate 和 componentWillUnmount 三个生命周期方法。不过如果你习惯了使用 Class 组件，那千万不要按照把 useEffect 对应到某个或者某几个生命周期的方法。你只要记住，**useEffect 是每次组件 render 完后判断依赖并执行就可以了。**

举个例子，某个组件用于显示一篇 Blog 文章，那么这个组件会接收一个参数来表示 Blog 的 ID。而当 ID 发生变化时，组件需要发起请求来获取文章内容并展示：

```jsx
import React, { useState, useEffect } from "react";

function BlogView({ id }) {
  // 设置一个本地 state 用于保存 blog 内容
  const [blogContent, setBlogContent] = useState(null);

  useEffect(() => {
    // useEffect 的 callback 要避免直接的 async 函数，需要封装一下
    const doAsync = async () => {
      // 当 id 发生变化时，将当前内容清楚以保持一致性
      setBlogContent(null);
      // 发起请求获取数据
      const res = await fetch(`/blog-content/${id}`);
      // 将获取的数据放入 state
      setBlogContent(await res.text());
    };
    doAsync();
  }, [id]); // 使用 id 作为依赖项，变化时则执行副作用

  // 如果没有 blogContent 则认为是在 loading 状态
  const isLoading = !blogContent;
  return <div>{isLoading ? "Loading..." : blogContent}</div>;
}
```

useEffect 还有两个特殊的用法：**没有依赖项，以及依赖项作为空数组**。我们来具体分析下。

1. 没有依赖项，则每次 render 后都会重新执行。例如：

   ```jsx
   useEffect(() => {
     // 每次 render 完一定执行
     console.log('re-rendered');
   });
   ```

2. 空数组作为依赖项，则只在首次执行时触发，对应到 Class 组件就是 componentDidMount。例如：

   ```jsx
   useEffect(() => {
     // 组件首次渲染时执行，等价于 class 组件中的 componentDidMount
     console.log('did mount');
   }, [])
   ```

3. useEffect **还允许你返回一个函数，用于在组件销毁的时候做一些清理的操作。**

总结一下，useEffect 让我们能够在下面四种时机去执行一个回调函数产生副作用：

1. 每次 render 后执行：不提供第二个依赖项参数。比如useEffect(() => {})。
2. 仅第一次 render 后执行：提供一个空数组作为依赖项。比如useEffect(() => {}, [])。
3. 第一次以及依赖项发生变化后执行：提供依赖项数组。比如useEffect(() => {}, [deps])。
4. 组件 unmount 后执行：返回一个回调函数。比如useEffect() => { return () => {} }, [])。

## 理解 Hooks 的依赖

那么在定义依赖项时，我们需要注意以下三点：

1. 依赖项中定义的变量一定是会在回调函数中用到的，否则声明依赖项其实是没有意义的。
2. 依赖项一般是一个常量数组，而不是一个变量。因为一般在创建 callback 的时候，你其实非常清楚其中要用到哪些依赖项了。
3. **React 会使用浅比较来对比依赖项是否发生了变化，所以要特别注意数组或者对象类型**。如果你是每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化。这是一个刚开始使用 Hooks 时很容易导致 Bug 的地方。

```jsx
function Sample() {
  // 这里在每次组件执行时创建了一个新数组
  const todos = [{ text: 'Learn hooks.'}];
  useEffect(() => {
    console.log('Todos changed.');
  }, [todos]);
}
```

代码的原意可能是在 todos 变化的时候去产生一些副作用，但是<u>这里的 todos 变量是在函数内创建的，实际上每次都产生了一个新数组</u>。所以在作为依赖项的时候进行引用的比较，实际上被认为是发生了变化的。

## 掌握 Hooks 的使用规则

- **只能在函数组件的顶级作用域使用；只能在函数组件或者其他 Hooks 中使用。**

  所谓顶层作用域，**就是 Hooks 不能在循环、条件判断或者嵌套函数内执行，而必须是在顶层。**同时 **Hooks 在组件的多次渲染之间，必须按顺序被执行。**

- **Hooks 只能在函数组件或者其它 Hooks 中使用**

  Hooks 作为专门为函数组件设计的机制，使用的情况只有两种，**一种是在函数组件内，另外一种则是在自定义的 Hooks 里面。**

  但是如果一定要在 Class 组件中使用，那应该如何做呢？其实有一个通用的机制，**那就是利用高阶组件的模式，将 Hooks 封装成高阶组件，从而让类组件使用。**

## 使用 ESLint 插件帮助检查 Hooks 的使用

- 在 useEffect 的回调函数中使用的变量，都必须在依赖项中声明；

- Hooks 不能出现在条件语句或者循环中，也不能出现在 return 之后；

- Hooks 只能在函数组件或者自定义 Hooks 中使用。

专门用来检查 Hooks 是否正确被使用，它就是 eslint-plugin-react-hooks 。

```sh
npm install eslint-plugin-react-hooks --save-dev
```

