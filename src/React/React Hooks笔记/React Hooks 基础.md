---
date: 2022-05-17
category:
- React
- React Hooks
---
# React Hooks 基础

<img src="https://cdn.yihuiblog.top/images/a4089b1acf12d52575ebfc89dd6b7593.png" alt="img"  />

## 思考 React 组件的本质

React 组件的模型其实很直观，就是从 Model 到 View 的映射，这里的 Model 对应到 React 中就是 state 和 props。如下图所示：

<img src="https://cdn.yihuiblog.top/images/a29c89ffd7c2ce101183407fe7d90e5b.png" alt="img" style="zoom:50%;" />

在过去，我们需要处理当 Model 变化时，DOM 节点应该如何变化的细节问题。而现在，我们只需要通过 JSX，根据 Model 的数据用声明的方式去描述 UI 的最终展现就可以了，因为 React 会帮助你处理所有 DOM 变化的细节。而且，当 Model 中的状态发生变化时，UI 会自动变化，**即所谓的数据绑定。**

<u>所以呢，我们可以把 UI 的展现看成一个函数的执行过程。其中，Model 是输入参数，函数的执行结果是 DOM 树，也就是 View。而 React 要保证的，就是每当 Model 发生变化时，函数会重新执行，并且生成新的 DOM 树，然后 React 再把新的 DOM 树以最优的方式更新到浏览器。</u>

<u>一方面，React 组件之间是不会互相继承的。比如说，你不会创建一个 Button 组件，然后再创建一个 DropdownButton 来继承 Button。所以说，React 中其实是没有利用到 Class 的继承特性的。</u>

<u>另一方面，因为所有 UI 都是由状态驱动的，因此很少会在外部去调用一个类实例（即组件）的方法。要知道，组件的所有方法都是在内部调用，或者作为生命周期方法被自动调用的。</u>

## Hooks 是如何诞生的？

简单想一下，函数和对象不同，并没有一个实例的对象能够在多次执行之间保存状态，那势必需要一个函数之外的空间来保存这个状态，而且要能够检测其变化，从而能够触发函数组件的重新渲染。

再进一步想，那我们是不是就是需要这样一个机制，能够把一个外部的数据绑定到函数的执行。当数据变化时，函数能够自动重新执行。这样的话，任何会影响 UI 展现的外部数据，都可以通过这个机制绑定到 React 的函数组件。

在 React 中，这个机制就是 Hooks。

在 React 中，**Hooks 就是把某个目标结果钩到某个可能会变化的数据源或者事件源上，那么当被钩到的数据或事件发生变化时，产生这个目标结果的代码会重新执行，产生更新后的结果。**

对于函数组件，这个结果是最终的 DOM 树；对于 useCallback、useMemo 这样与缓存相关的组件，则是在依赖项发生变化时去更新缓存。所以 Hooks 的结构可以如下图所示：

![img](https://cdn.yihuiblog.top/images/f764a904bba8836597e441884804b41d.png)

从图中可以看到，一个执行过程（Execution），例如是函数组件本身，可以绑定在（钩在）传统意义的 State，或者 URL，甚至可以是窗口的大小。这样当 State、URL、窗口大小发生变化时，都会重新执行某个函数，产生更新后的结果。

当然，既然我们的初衷是为了实现 UI 组件的渲染，那么在 React 中，其实所有的 Hooks 的最终结果都是导致 UI 的变化。但是正如 React 官方曾经提到过的，**Hooks 的思想其实不仅可以用在 React，在其它一些场景也可以被利用。**

<u>Hooks 中被钩的对象，不仅可以是某个独立的数据源，也可以是另一个 Hook 执行的结果，这就带来了 Hooks 的最大好处：逻辑的复用。</u>

## Hooks 带来的最大好处：逻辑复用

在之前的 React 使用中，有一点经常被大家诟病，就是非常难以实现逻辑的复用，必须借助于高阶组件等复杂的设计模式。但是高阶组件会产生冗余的组件节点，让调试变得困难。不过这些问题可以通过 Hooks 得到很好的解决。所以如果有人问你 Hooks 有什么好处，那么最关键的答案就是**简化了逻辑复用。**

就以刚才我们提到的绑定窗口大小的场景为例。如果有多个组件需要在用户调整浏览器窗口大小时，重新调整布局，那么我们需要把这样的逻辑提取成一个公共的模块供多个组件使用。以 React 思想，在 JSX 中我们会根据 Size 大小来渲染不同的组件，例如：

```jsx
function render() {
  if (size === "small") return <SmallComponent />;
  else return <LargeComponent />;
}
```

这段代码看上去简单，但如果在过去的 Class 组件中，我们甚至需要一个比较复杂的设计模式来解决，这就是高阶组件。

在 Class 组件的场景下，我们首先需要定义一个高阶组件，负责监听窗口大小变化，并将变化后的值作为 props 传给下一个组件。

```jsx
const withWindowSize = Component => {
  // 产生一个高阶组件 WrappedComponent，只包含监听窗口大小的逻辑
  class WrappedComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        size: this.getSize()
      };
    }
    componentDidMount() {
      window.addEventListener("resize", this.handleResize); 
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
    }
    getSize() {
      return window.innerWidth > 1000 ? "large" ："small";
    }
    handleResize = ()=> {
      const currentSize = this.getSize();
      this.setState({
        size: this.getSize()
      });
    }
    render() {
      // 将窗口大小传递给真正的业务逻辑组件
      return <Component size={this.state.size} />;
    }
  }
  return WrappedComponent;
};
```

这样，在你的自定义组件中可以调用 withWindowSize 这样的函数来产生一个新组件，并自带 size 属性，例如:

```jsx
class MyComponent extends React.Component{
  render() {
    const { size } = this.props;
    if (size === "small") return <SmallComponent />;
    else return <LargeComponent />;
  }
}
// 使用 withWindowSize 产生高阶组件，用于产生 size 属性传递给真正的业务组件
export default withWindowSize(MyComponent); 
```

在这里，我们可以看到，为了传递一个外部的状态，我们不得不定义一个没有 UI 的外层组件，而这个组件只是为了封装一段可重用的逻辑。更为糟糕的是，高阶组件几乎是 Class 组件中实现代码逻辑复用的唯一方式，其缺点其实比较显然：

1. 代码难理解，不直观，很多人甚至宁愿重复代码，也不愿用高阶组件；
2. 会增加很多额外的组件节点。每一个高阶组件都会多一层节点，这就会给调试带来很大的负担。

可以说，正因为这些缺点被抱怨已久，React 团队才终于提出了 Hooks 这样一个全新的方案。那么现在我们不妨看一下，同样的逻辑如果用 Hooks 和函数组件该如何实现。首先我们需要实现一个 Hooks：

```jsx
const getSize = () => {
  return window.innerWidth > 1000 ? "large" : "small";
}
const useWindowSize = () => {
  const [size, setSize] = useState(getSize());
  useEffect(() => {
  const handler = () => {
      setSize(getSize())
    };
    window.addEventListener('resize', handler);
    return () => {
    	window.removeEventListener('resize', handler);
    };
  }, []);
  
  return size;
};
```

这样，我们在组件中使用窗口大小就会非常简单：

```jsx
const Demo = () => {
  const size = useWindowSize();
  if (size === "small") return <SmallComponent />;
  else return <LargeComponent />;
};
```

可以看到，窗口大小是一个外部的一个数据状态，我们通过 Hooks 的方式对其进行了封装，从而将其变成一个可绑定的数据源。<u>这样当窗口大小发生变化时，使用这个 Hook 的组件就都会重新渲染。而且代码也更加简洁和直观，</u>不会产生额外的组件节点。

## Hooks 的另一大好处：有助于关注分离

除了逻辑复用之外，Hooks 能够带来的另外一大好处就是**有助于关注分离**，意思是说 Hooks 能够让针对同一个业务逻辑的代码尽可能聚合在一块儿。这是过去在 Class 组件中很难做到的。因为在 Class 组件中，你不得不把同一个业务逻辑的代码分散在类组件的不同生命周期的方法中。

所以通过 Hooks 的方式，把业务逻辑清晰地隔离开，能够让代码更加容易理解和维护。仍然以上面监听浏览器窗口大小的变化为例，我们来看 Hooks 是如何做到关注分离的。在过去的 Class 组件中，我们需要在 componentDidMount 中监听事件，在 componentWillUnmount 中去解绑事件。而在函数组件中，我们可以把所有逻辑写在一起。

React 社区曾用一张图直观地展现了对比结果：

![img](https://cdn.yihuiblog.top/images/f8a255ca1ec737a8ff5a40160e789fd5.png)

图的左侧是 Class 组件，右侧是函数组件结合 Hooks。

## 小结

Hooks 作为 React 自诞生以来最大的一个新功能，可以说得到了普遍好评，成为了 React 开发的主流方式。而它也在一定程度上**更好地体现了 React 的开发思想，即从 State => View 的函数式映射。**

 此外， Hooks 也解决了 Class 组件存在的一些代码冗余、难以逻辑复用的问题。

> 组合的话组件之间就仅仅需要通过 props 的方式来互相交互，依赖关系更加清楚，组件内聚性更好。继承会让两个组件紧密耦合到一起。继承也不是完全不能用，只是非常不推荐。在 React 中，继承要达到的目的用组合完全可以 cover。
