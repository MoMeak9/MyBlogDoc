# dva 数据获取和处理

> 将简单留给自己
>
> PS：UmiJS优先级高于dva，目前最新版本停留在19年版本

## [dva 入门课](https://dvajs.com/guide/introduce-class.html)

> 内容来自之前为阿里内部同学准备的入门课。根据 alita 中的使用情况，对无需关注的概念做了删减。

## React 没有解决的问题

React 本身只是一个 DOM 的抽象层，使用组件构建虚拟 DOM。

如果开发大应用，还需要解决一个问题。

- 通信：组件之间如何通信？
- 数据流：数据如何和视图串联起来？路由和数据如何绑定？如何编写异步逻辑？等等

## 通信问题

组件会发生三种通信。

- 向子组件发消息
- 向父组件发消息
- 向其他组件发消息

React 只提供了一种通信手段：传参。对于大应用，很不方便。

## 组件通信的例子

### 步骤 1

```jsx
class Son extends React.Component {
  render() {
    return <input/>;
  }
}

class Father extends React.Component {
  render() {
    return <div>
      <Son/>
      <p>这里显示 Son 组件的内容</p>
    </div>;
  }
}

ReactDOM.render(<Father/>, mountNode);
```

看这个例子，想一想父组件如何拿到子组件的值。

### 步骤2

```jsx
class Son extends React.Component {
  render() {
    return <input onChange={this.props.onChange}/>;
  }
}

class Father extends React.Component {
  constructor() {
    super();
    this.state = {
      son: ""
    }
  }
  changeHandler(e) {
    this.setState({
      son: e.target.value
    });
  }
  render() {
    return <div>
      <Son onChange={this.changeHandler.bind(this)}/>
      <p>这里显示 Son 组件的内容：{this.state.son}</p>
    </div>;
  }
}

ReactDOM.render(<Father/>, mountNode);
```

看下这个例子，看懂源码，理解子组件如何通过父组件传入的函数，将自己的值再传回父组件。

## 数据流问题

目前流行的数据流方案有：

- Flux，单向数据流方案，以 [Redux](https://github.com/reactjs/redux) 为代表 【需要绑定响应方法】
- Reactive，响应式数据流方案，以 [Mobx](https://github.com/mobxjs/mobx) 为代表



## dva 是什么

dva 是体验技术部开发的 React 应用框架，将上面三个 React 工具库包装在一起，简化了 API，让开发 React 应用更加方便和快捷。

dva = React-Router + Redux + Redux-saga

## dva 应用的最简结构

```js
import dva from 'dva';
const App = () => <div>Hello dva</div>;

// 创建应用
const app = dva();
// 注册视图
app.router(() => <App />);
// 启动应用
app.start('#root');
```

## 数据流图

<img src="https://cdn.yihuiblog.top/images/202207221105911.png" alt="img" style="zoom:50%;" />

## 核心概念

- State：一个对象，保存整个应用状态
- View：React 组件构成的视图层
- Action：一个对象，描述事件
- connect 方法：一个函数，绑定 State 到 View
- dispatch 方法：一个函数，发送 Action 到 State

> **对比Redux**
>
> - store(state)
> - action
> - dispatch
> - reducer(view + connect)

### State 和 View

State 是储存数据的地方，收到 Action 以后，会更新数据。

View 就是 React 组件构成的 UI 层，从 State 取数据后，渲染成 HTML 代码。只要 State 有变化，View 就会自动更新。

### Action

Action 是用来描述 UI 层事件的一个对象。

```js
{
  type: 'click-submit-button',
  payload: this.form.data
}
```

### connect 方法

connect 是一个函数，绑定 State 到 View。

```js
import { connect } from 'dva';

function mapStateToProps(state) {
  return { todos: state.todos };
}
connect(mapStateToProps)(App);
```

connect 方法返回的也是一个 React 组件，通常称为容器组件。因为它是原始 UI 组件的容器，即在外面包了一层 State。

connect 方法传入的第一个参数是 mapStateToProps 函数，mapStateToProps 函数会返回一个对象，用于建立 State 到 Props 的映射关系。

### dispatch 方法

dispatch 是一个函数方法，用来将 Action 发送给 State。

> 此时已经绑定了State到View，此时由State接收

```js
dispatch({
  type: 'click-submit-button',
  payload: this.form.data
})
```

dispatch 方法从哪里来？被 connect 的 Component 会自动在 props 中拥有 dispatch 方法。

> connect 的数据从哪里来? connect 方法传入的第一个参数是 mapStateToProps 函数，该函数默认传入一个参数 state 对应了整个应用的 state，你可以通过设置映射关系，将 state 中的某个值，绑定到页面组件的 props 里面。

<img src="https://cdn.yihuiblog.top/images/202207221114782.png" alt="img" style="zoom:50%;" />

## Model 最简结构

```js
export default {
  namespace: 'count',
  state: 0,
  reducers: {
    add(state) {
      return state + 1;
    },
  },
  effects: {
    *addAfter1Second(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'add' });
    },
  },
};
```

### Model 对象的属性

- namespace: 当前 Model 的名称。整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成
- state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
- reducers: Action 处理器，处理同步动作，用来算出最新的 State
- effects：Action 处理器，处理异步动作

### Reducer

> 基础来源于Redux

Reducer 是 Action 处理器，用来处理同步操作，可以看做是 state 的计算器。它的作用是根据 Action，从上一个 State 算出当前 State。

一些例子：

### Effect

Action 处理器，处理异步动作，基于 Redux-saga 实现。Effect 指的是副作用。根据函数式编程，计算以外的操作都属于 Effect，典型的就是 I/O 操作、数据库读写。

```js
function *addAfter1Second(action, { put, call }) {
  yield call(delay, 1000);
  yield put({ type: 'add' });
}
```

#### Generator 函数 （生成器）

Effect 是一个 Generator 函数，内部使用 yield 关键字，标识每一步的操作（不管是异步或同步）。

#### call 和 put

dva 提供多个 effect 函数内部的处理函数，比较常用的是 `call` 和 `put`。

- call：执行异步函数
- put：发出一个 Action，类似于 dispatch

到这里，我们就将 dva 的基本概念讲解清楚了，如果你不是很理解，建议你多看几遍。如果你稍微有了一点概念，那就可以进入下一小节，我们通过构建一个简单的 demo，来演示以上的所有概念。这样你会更加清楚的了解到如何在项目中使用 dva。
