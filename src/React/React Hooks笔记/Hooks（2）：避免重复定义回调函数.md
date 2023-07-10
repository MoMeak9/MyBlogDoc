---
date: 2022-05-17
category:
- React
- React Hooks
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

```jsx
import React, { useState, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrement = useCallback(
    () => setCount(count + 1),
    [count], // 只有当 count 发生变化时，才会重新创建回调函数
  );
  // ...
  return <button onClick={handleIncrement}>+</button>
}
```

在这里，我们把 count 这个 state ，作为一个依赖传递给 useCallback。这样，只有 count 发生变化的时候，才需要重新创建一个回调函数，这样就保证了组件不会创建重复的回调函数。<u>而接收这个回调函数作为属性的组件，也不会频繁地需要重新渲染。</u>

<u>useCallback 缓存的是一个函数，而 useMemo 缓存的是计算的结果</u>

## useMemo：缓存计算的结果

useMemo 的 API 签名如下：

```js
useMemo(fn, deps);
```

这里的 fn 是产生所需数据的一个计算函数。通常来说，fn 会使用 deps 中声明的一些变量来生成一个结果，用来渲染出最终的 UI。

这个场景应该很容易理解：**如果某个数据是通过其它数据计算得到的，那么只有当用到的数据，也就是依赖的数据发生变化的时候，才应该需要重新计算。**

举个例子，对于一个显示用户信息的列表，现在需要对用户名进行搜索，且 UI 上需要根据搜索关键字显示过滤后的用户，那么这样一个功能需要有两个状态：

1. 用户列表数据本身：来自某个请求。
2. 搜索关键字：用户在搜索框输入的数据。

无论是两个数据中的哪一个发生变化，都需要过滤用户列表以获得需要展示的数据。那么如果不使用 useMemo 的话，就需要用这样的代码实现：

```jsx
import React, { useState, useEffect } from "react";

export default function SearchUserList() {
  const [users, setUsers] = useState(null);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const doFetch = async () => {
      // 组件首次加载时发请求获取用户数据
      const res = await fetch("https://reqres.in/api/users/");
      setUsers(await res.json());
    };
    doFetch();
  }, []);
  let usersToShow = null;

  if (users) {
    // 无论组件为何刷新，这里一定会对数组做一次过滤的操作
    usersToShow = users.data.filter((user) =>
      user.first_name.includes(searchKey),
    );
  }

  return (
    <div>
      <input
        type="text"
        value={searchKey}
        onChange={(evt) => setSearchKey(evt.target.value)}
      />
      <ul>
        {usersToShow &&
          usersToShow.length > 0 &&
          usersToShow.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </div>
  );
}
```

在这个例子中，无论组件为何要进行一次重新渲染，实际上都需要进行一次过滤的操作。但其实你只需要在 users 或者 searchKey 这两个状态中的某一个发生变化时，重新计算获得需要展示的数据就行了。那么，这个时候，我们就可以用 useMemo 这个 Hook 来实现这个逻辑，缓存计算的结果：

```jsx

//...
// 使用 userMemo 缓存计算的结果
const usersToShow = useMemo(() => {
    if (!users) return null;
    return users.data.filter((user) => {
      return user.first_name.includes(searchKey));
    }
  }, [users, searchKey]);
//...
```

除了避免重复计算之外，useMemo 还有一个很重要的好处：**避免子组件的重复渲染。**

比如在例子中的 usersToShow 这个变量，如果每次都需要重新计算来得到，那么对于 UserList 这个组件而言，就会每次都需要刷新，因为它将 usersToShow 作为了一个属性。而一旦能够缓存上次的结果，就和 useCallback 的场景一样，可以避免很多不必要的组件刷新。

**useCallback 的功能其实是可以用 useMemo 来实现的。**

```jsx
const myEventHandler = useMemo(() => {
   // 返回一个函数作为缓存结果
   return () => {
     // 在这里进行事件处理
   }
}, [dep1, dep2]);
```

它们只是做了同一件事情：**建立了一个绑定某个结果到依赖数据的关系。只有当依赖变了，这个结果才需要被重新得到。**

## useRef：在多次渲染之间共享数据

函数组件虽然非常直观，简化了思考 UI 实现的逻辑，但是比起 Class 组件，还缺少了一个很重要的能力：**在多次渲染之间共享数据。**

在类组件中，我们可以定义类的成员变量，以便能在对象上通过成员属性去保存一些数据。但是在函数组件中，是没有这样一个空间去保存数据的。因此，React 让 useRef 这样一个 Hook 来提供这样的功能。

```js
const myRefContainer = useRef(initialValue);
```

**我们可以把 useRef 看作是在函数组件之外创建的一个容器空间。**

> 假设你要去做一个计时器组件，这个组件有开始和暂停两个功能。很显然，你需要用 window.setInterval 来提供计时功能；而为了能够暂停，你就需要在某个地方保存这个 window.setInterval 返回的计数器的引用，确保在点击暂停按钮的同时，也能用 window.clearInterval 停止计时器。那么，这个保存计数器引用的最合适的地方，就是 useRef，因为它可以存储跨渲染的数据。代码如下：

```js
import React, { useState, useCallback, useRef } from "react";

export default function Timer() {
  // 定义 time state 用于保存计时的累积时间
  const [time, setTime] = useState(0);

  // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const timer = useRef(null);

  // 开始计时的事件处理函数
  const handleStart = useCallback(() => {
    // 使用 current 属性设置 ref 的值
    timer.current = window.setInterval(() => {
      setTime((time) => time + 1);
    }, 100);
  }, []);

  // 暂停计时的事件处理函数
  const handlePause = useCallback(() => {
    // 使用 clearInterval 来停止计时
    window.clearInterval(timer.current);
    timer.current = null;
  }, []);

  return (
    <div>
      {time / 10} seconds.
      <br />
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}
```

使用 useRef 保存的数据一般是和 UI 的渲染无关的，因此当 ref 的值发生变化时，是不会触发组件的重新渲染的，这也是 useRef 区别于 useState 的地方。

<u>除了存储跨渲染的数据之外，useRef 还有一个重要的功能，**就是保存某个 DOM 节点的引用**。我们知道，在 React 中，几乎不需要关心真实的 DOM 节点是如何渲染和修改的。但是在某些场景中，我们必须要获得真实 DOM 节点的引用，所以结合 React 的 ref 属性和 useRef 这个 Hook，我们就可以获得真实的 DOM 节点，并对这个节点进行操作。</u>

> 比如说，你需要在点击某个按钮时让某个输入框获得焦点，可以通过下面的代码来实现：

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // current 属性指向了真实的 input 这个 DOM 节点，从而可以调用 focus 方法
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## useContext：定义全局状态

**全局状态管理**

为此，React 提供了 Context 这样一个机制，能够让所有在某个组件开始的组件树上创建一个 Context。这样这个组件树上的所有组件，就都能访问和修改这个 Context 了。那么在函数组件里，我们就可以使用 useContext 这样一个 Hook 来管理 Context。

useContext 的 API 签名如下：

```js
const value = useContext(MyContext);
```

正如刚才提到的，一个 Context 是从某个组件为根组件的组件树上可用的，所以我们需要有 API 能够创建一个 Context，这就是 **React.createContext API，**如下：

```js
const MyContext = React.createContext(initialValue);
```

这里的 MyContext 具有一个 Provider 的属性，一般是作为组件树的根组件。

一个主题的切换机制。代码如下：

```jsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};
// 创建一个 Theme 的 Context

const ThemeContext = React.createContext(themes.light);
function App() {
  // 整个应用使用 ThemeContext.Provider 作为根组件
  return (
    // 使用 themes.dark 作为当前 Context 
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 在 Toolbar 组件中使用一个会使用 Theme 的 Button
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// 在 Theme Button 中使用 useContext 来获取当前的主题
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{
      background: theme.background,
      color: theme.foreground
    }}>
      I am styled by theme context!
    </button>
  );
}
```

> <u>Context 看上去就是一个全局的数据，为什么要设计这样一个复杂的机制，而不是直接用一个全局的变量去保存数据呢？</u>
>
> **为了能够进行数据的绑定**

Context 相当于提供了一个定义 React 世界中全局变量的机制，而全局变量则意味着两点：

1. 会让调试变得困难，因为你很难跟踪某个 Context 的变化究竟是如何产生的。
2. 让组件的复用变得困难，因为一个组件如果使用了某个 Context，它就必须确保被用到的地方一定有这个 Context 的 Provider 在其父组件的路径上

<u>所以在 React 的开发中，除了像 Theme、Language 等一目了然的需要全局设置的变量外，我们很少会使用 Context 来做太多数据的共享。需要再三强调的是，**Context 更多的是提供了一个强大的机制，让 React 应用具备定义全局的响应式数据的能力。**</u>
