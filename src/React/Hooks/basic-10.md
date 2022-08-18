# 自定义事件

在 React 中，父子组件的交互是通过 props。这个机制其实是双向的，父组件通过 props 把值传递给子组件，而子组件则通过暴露一些事件，给父组件反馈到一些状态或数据，**这两个环节是组件之间通信的基础。**

## 在 React 中使用原生事件

在 React 中进行事件监听的语法，和原生 DOM 事件的写法是非常类似的，都是在一个节点上加一个回调函数的属性来实现。比如下面的方式：

```jsx
<button onClick={handler}>Hello</button> 
```

在 React 中，都是约定使用骆驼体（Camel Case）。只要原生 DOM 有的事件，在 React 中基本都可以使用，只是写法上采用骆驼体就可以了。

<u>其实是否需要 useCallback ，和函数的复杂度没有必然关系，而是和回调函数绑定到哪个组件有关。这是为了避免因组件属性变化而导致不必要的重新渲染。</u>

如果你使用的是自定义组件，或者一些 UI 框架的组件，那么回调函数还都应该用 useCallback 进行封装。

## React 原生事件的原理：合成事件（Synthetic Events）

<u>由于虚拟 DOM 的存在，在 React 中即使绑定一个事件到原生的 DOM 节点，事件也并不是绑定在对应的节点上，而是**所有的事件都是绑定在根节点上**。然后由 React 统一监听和管理，获取事件后再分发到具体的虚拟 DOM 节点上。</u>

在 React 17 之前，所有的事件都是绑定在 document 上的，而从 React 17 开始，**所有的事件都绑定在整个 App 上的根节点上，**这主要是为了以后页面上可能存在多版本 React 的考虑。

**React 这么做的原因主要有两个:**

1. 第一，虚拟 DOM render 的时候， DOM 很可能还没有真实地 render 到页面上，所以无法绑定事件。
2. 第二，React 可以屏蔽底层事件的细节，避免浏览器的兼容性问题。同时呢，对于 React Native 这种不是通过浏览器 render 的运行时，也能提供一致的 API。

**为什么事件绑定在某个根节点上，也能触发实际 DOM 节点的事件?**

我们知道，在浏览器的原生机制中，事件会从被触发的节点往父节点冒泡，然后沿着整个路径一直到根节点，所以根节点其实是可以收到所有的事件的。**这也称之为浏览器事件的冒泡模型。**

因此，无论事件在哪个节点被触发， React 都可以通过事件的 srcElement 这个属性，知道它是从哪个节点开始发出的，这样 React 就可以收集管理所有的事件，然后再以一致的 API 暴露出来。

这样的话，我们在写原生事件的时候，就再也不用再担心浏览器兼容性的问题了。如下图所示，就展示了事件机制冒泡模型的原理：

<img src="https://cdn.yihuiblog.top/images/1bd06yy56b1103376d0ec45fb87b7906.png" alt="img" style="zoom:50%;" />

对于原生事件的处理，可以说是 React 的一个创新，不仅能够让你像以前在原生 DOM 节点上定义事件的方式一样，而且还提供了一致的 API，让我们不用再担心浏览器的兼容问题，使用起来也更加容易。

## 创建自定义事件

对于一个自定义组件，除了可以从 props 接收参数并用于渲染之外，还很可能需要和父组件进行交互，从而反馈信息。这个时候，我们就需要为组件创建自定义事件，这也是 React 整个 UI 模型中非常重要的一个环节。

<u>虽然自定义事件和原生事件看上去类似，但是两者的机制是完全不一样的：</u>

- 原生事件是浏览器的机制；
- 而自定义事件则是纯粹的组件自己的行为，本质是一种回调函数机制。

在 React 中，自定义事件不用通过任何特殊的 API，只需要通过 props 给组件传递一个回调函数，然后在组件中的某个时机，比如用户输入，或者某个请求完成时，去调用这个传过来的回调函数就可以了。

当然，习惯上我们都会**将这样的回调函数命名为 onSomething 这种以“ on ”开头的名字**，方便在使用的时候理解。

```jsx
import { useState } from "react";

// 创建一个无状态的受控组件
function ToggleButton({ value, onChange }) {
  const handleClick = () => {
    onChange(!value);
  };
  return (
    <button style={{ width: "60px" }} onClick={handleClick}>
      <span>{value ? "On" : "Off"}</span>
    </button>
  );
}
```

那么下面的代码就演示了如何使用这样一个组件：

```jsx
import { useState } from "react";
import ToggleButton from './ToggleButton';

function ToggleButtonExample() {
  const [on, setOn] = useState(true);
  return (
    <>
      <h1>Toggle Button</h1>
      <ToggleButton value={on} onChange={(value) => setOn(value)} />
    </>
  );
};
```

## 使用 Hooks 封装键盘事件

**Hooks 具备绑定任何数据源的能力**

在没有 Hooks 的时候，比如说我们要让某个显示表格的页面，支持通过左右键进行翻页的功能。那么我们就需要在 useEffect 里去做 window.addEventListnner，然后在返回的回调函数里去 window.removeEventListnner，实现起来就很麻烦。

但是，如果我们用一个 Hook 来实现这个功能，那么只要实现一次，就可以在多个组件中使用了。下面就是这个 Hook 的实现代码：

```jsx
import { useEffect, useState } from "react";

// 使用 document.body 作为默认的监听节点
const useKeyPress = (domNode = document.body) => {
  const [key, setKey] = useState(null);
  useEffect(() => {
    const handleKeyPress = (evt) => {
      setKey(evt.keyCode);
    };
    // 监听按键事件
    domNode.addEventListener("keypress", handleKeyPress);
    return () => {
      // 接触监听按键事件
      domNode.removeEventListener("keypress", handleKeyPress);
    };
  }, [domNode]);
  return key;
};
```

有了这个 Hook，我们在使用的时候就非常方便，无需做任何事件的绑定，**而是只要把键盘按键看做是一个不断变化的数据源**，这样，就可以去实时监听某个 DOM 节点上触发的键盘事件了。

比如下面就是去显示当前按键的一个简单使用例子：

```jsx
import useKeyPress from './useKeyPress';

function UseKeyPressExample(){
  const key = useKeyPress();
  return (
    <div>
      <h1>UseKeyPress</h1>
      <label>Key pressed: {key || "N/A"}</label>
    </div>
  );
};
```

