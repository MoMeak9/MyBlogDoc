# 第五章：致React开发者 - 将你的知识平移到Lit

> **致React开发者**：
> 你已经掌握了组件化思维、Hooks、生命周期——这些知识在 Lit 中同样适用！本章将帮助你快速建立 React 与 Lit 的概念对应关系。
>
> **本章你将了解**：
> - JSX vs lit-html：语法差异与相似之处
> - Props/State vs @property/@state：数据管理的对应关系
> - Hooks vs 生命周期：useEffect 如何映射到 Lit
> - 如何在现有 React 项目中逐步引入 Lit 组件

### 5.1 核心理念：VDOM抽象 vs. 平台原生

对于习惯了React的开发者来说，转向Lit最需要理解的是两者在核心理念上的根本差异。React通过虚拟DOM（VDOM）在浏览器原生API之上构建了一个强大的抽象层，提供了自成一体的组件模型和状态管理机制 。  

而Lit则选择了一条更贴近平台的道路。它是一个围绕原生Web组件标准的轻量级封装，旨在消除原生API的样板代码，同时保留其核心优势 。用Lit开发的组件是标准的、可互操作的Web组件，这意味着它们可以无缝地在任何框架（包括React）中使用，甚至可以完全脱离框架运行 。对于需要在现有React项目中逐步引入或共享组件的场景，官方还提供了  

`@lit/react`包，它可以方便地将Web组件封装成React组件，处理属性传递和事件绑定等兼容性问题 。  

从React转向Lit，意味着你投资学习的技能（Web组件）将具有更长的生命周期和更广泛的适用性，因为它们是Web平台自身的一部分。

### 5.2 语法之辩：JSX vs. `lit-html`

在模板语法上，React和Lit各有特色。React使用JSX，一种类似XML的JavaScript语法扩展，它允许开发者在JavaScript代码中编写HTML结构 。JSX功能强大，但需要经过编译步骤才能在浏览器中运行。  

Lit则使用标准的JavaScript带标签模板字面量，结合`html`标签函数 。这种方式有几个显著优点：它完全是有效的JavaScript，无需学习自定义语法，并且在开发过程中通常不需要编译步骤 。模板的解析和更新由  

`lit-html`在运行时高效处理。

### 5.3 状态与属性：`useState`/`props` vs. `@state`/`@property`

React和Lit在组件数据管理上有着相似的概念，但实现方式和命名有所不同。下面的“概念速查表”旨在帮助React开发者快速将现有知识映射到Lit中。

|概念|React实现|Lit实现|
|---|---|---|
|**组件定义**|函数组件 `function MyComponent() {}` 或类组件|继承`LitElement`的类 `class MyElement extends LitElement {}`|
|**模板语法**|JSX: `<div>Hello {name}</div>`|`lit-html`: ``html`<div>Hello ${this.name}</div>``|
|**数据传入 (Props)**|`<MyComponent name="X" />` 在组件内通过`props.name`访问|`<my-element.name=${"X"}></my-element>` 在组件内通过`@property() name`声明和访问|
|**内部状态 (State)**|`const [count, setCount] = useState(0)`|`@state() private count = 0;`|
|**副作用 (Side Effects)**|`useEffect(() => { /*...*/ },);`|`connectedCallback()`, `firstUpdated()`等生命周期方法|
|**事件处理**|`onClick={handleClick}`|`@click=${this.handleClick}`|
|**内容投影 (Children)**|`{props.children}`|`<slot></slot>`|

这个表格清晰地展示了两者之间的对应关系。React中的`props`概念直接对应Lit的`@property`，用于从父级接收数据 。React的  

`useState` Hook或类组件的`this.state`则对应Lit的`@state`，用于管理组件内部的私有状态 。  

### 5.4 从Hooks到生命周期：`useEffect` vs. 生命周期回调

React Hooks，特别是`useEffect`，提供了一种统一的方式来处理组件的副作用，如数据获取、订阅或手动DOM操作，这些都与组件的生命周期紧密相关 。Lit则使用更传统的、基于类的生命周期回调方法来实现类似的功能 。  

以下是一些常见的`useEffect`模式及其在Lit中的等效实现：

- **模拟 `componentDidMount` (仅运行一次)**
    
    - **React**: `useEffect(() => { /*... */ },)`
        
    - **Lit**: 在`firstUpdated()`生命周期方法中执行代码。这个方法在组件首次渲染到DOM后被调用，是执行一次性DOM操作的理想位置。
        
- **模拟 `componentDidUpdate` (依赖项变更时运行)**
    
    - **React**: `useEffect(() => { /*... */ }, [props.someProp])`
        
    - **Lit**: 在`updated(changedProperties)`方法中执行代码。`changedProperties`是一个Map对象，包含了本次更新中发生变化的属性及其旧值。可以通过`changedProperties.has('someProp')`来判断特定属性是否已更新。
        
- **模拟 `componentWillUnmount` (清理副作用)**
    
    - **React**: `useEffect(() => { const subscription = source.subscribe(); return () => subscription.unsubscribe(); },)`
        
    - **Lit**: 在`connectedCallback()`中设置订阅或监听，然后在`disconnectedCallback()`中进行清理。`connectedCallback`在元素插入DOM时触发，`disconnectedCallback`在元素移除时触发，完美对应了副作用的建立和销毁。
        

通过这种映射，React开发者可以轻松地将他们对组件生命周期和副作用管理的理解应用到Lit开发中。

#### 🔄 并排代码对比：同一个计数器组件

以下通过一个完整的计数器组件示例，直观对比 React 和 Lit 的实现方式：

**React 实现（函数组件 + Hooks）**

```jsx
// Counter.jsx
import { useState, useEffect } from 'react';

function Counter({ initialCount = 0, step = 1 }) {
  const [count, setCount] = useState(initialCount);
  const [history, setHistory] = useState([]);

  // 副作用：每次 count 变化时记录历史
  useEffect(() => {
    setHistory(prev => [...prev, count]);
    console.log('Count changed to:', count);
  }, [count]);

  // 副作用：组件挂载时添加键盘监听
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowUp') setCount(c => c + step);
      if (e.key === 'ArrowDown') setCount(c => c - step);
    };

    window.addEventListener('keydown', handleKeyPress);

    // 清理函数
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [step]); // 依赖 step，step 变化时重新绑定

  return (
    <div className="counter">
      <h2>计数: {count}</h2>
      <button onClick={() => setCount(count + step)}>+{step}</button>
      <button onClick={() => setCount(count - step)}>-{step}</button>
      <button onClick={() => setCount(initialCount)}>重置</button>
      <p>历史记录: {history.join(' → ')}</p>
    </div>
  );
}

export default Counter;
```

**Lit 实现（Web Component）**

```typescript
// counter-element.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('counter-element')
export class CounterElement extends LitElement {
  static styles = css`
    :host { display: block; padding: 16px; }
    button { margin: 4px; }
  `;

  // 公共属性（对应 React props）
  @property({ type: Number }) initialCount = 0;
  @property({ type: Number }) step = 1;

  // 内部状态（对应 React useState）
  @state() private count = 0;
  @state() private history: number[] = [];

  // 私有方法引用（用于清理）
  private handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') this.count += this.step;
    if (e.key === 'ArrowDown') this.count -= this.step;
  };

  // 对应 useEffect(fn, []) - 组件挂载
  connectedCallback() {
    super.connectedCallback();
    this.count = this.initialCount;
    window.addEventListener('keydown', this.handleKeyPress);
  }

  // 对应 useEffect 的清理函数
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  // 对应 useEffect(fn, [count, step]) - 属性变化时
  updated(changedProperties: Map<PropertyKey, unknown>) {
    // count 变化时记录历史（对应 useEffect 依赖 count）
    if (changedProperties.has('count')) {
      this.history = [...this.history, this.count];
      console.log('Count changed to:', this.count);
    }

    // step 变化时重新绑定事件（对应 useEffect 依赖 step）
    if (changedProperties.has('step') && changedProperties.get('step') !== undefined) {
      // 已在 connectedCallback 中绑定，这里只是示例
      // 实际场景可能需要重新计算逻辑
    }
  }

  render() {
    return html`
      <div class="counter">
        <h2>计数: ${this.count}</h2>
        <button @click=${() => this.count += this.step}>+${this.step}</button>
        <button @click=${() => this.count -= this.step}>-${this.step}</button>
        <button @click=${() => this.count = this.initialCount}>重置</button>
        <p>历史记录: ${this.history.join(' → ')}</p>
      </div>
    `;
  }
}
```

**使用方式对比**

```jsx
// React 使用
<Counter initialCount={10} step={2} />

// Lit 使用（在任何框架或原生 HTML 中）
<counter-element initial-count="10" step="2"></counter-element>
```

**关键差异总结**：

| 特性 | React | Lit |
|------|-------|-----|
| **组件定义** | 函数组件 `function Counter()` | 类组件 `class CounterElement extends LitElement` |
| **外部数据** | `props.initialCount` | `@property() initialCount` |
| **内部状态** | `useState(0)` | `@state() count = 0` |
| **状态更新** | `setCount(newValue)` | `this.count = newValue`（直接赋值） |
| **副作用（挂载）** | `useEffect(() => {...}, [])` | `connectedCallback()` |
| **副作用（更新）** | `useEffect(() => {...}, [count])` | `updated(changedProperties)` + 手动检查 |
| **副作用（清理）** | `useEffect(() => { return cleanup }, [])` | `disconnectedCallback()` |
| **模板语法** | JSX `<button onClick={...}>` | lit-html ``html`<button @click=${...}>` `` |
| **事件绑定** | `onClick={handler}` | `@click=${handler}` |
| **条件渲染** | `{condition && <div>...</div>}` | ``${condition && html`<div>...</div>`}`` |
| **列表渲染** | `{items.map(item => <li>...</li>)}` | ``${items.map(item => html`<li>...</li>`)}`` |

**迁移建议**：

1. **思维转换**：从"声明整个 UI"（React）转向"声明模板 + 精准更新"（Lit）
2. **生命周期映射**：将 `useEffect` 的依赖逻辑转换为 `updated()` 中的手动检查
3. **状态管理简化**：Lit 无需 `setState`，直接赋值即可触发更新
4. **逐步迁移**：先用 `@lit/react` 在 React 项目中引入 Lit 组件，再逐步替换

---

## 📝 本章小结

通过本章学习，作为 React 开发者的你应该建立了以下对应关系：

1. **理念差异**：React（VDOM 抽象层）vs Lit（Web 标准增强）
2. **模板语法**：JSX（需编译）vs lit-html（原生 JS，无需编译）
3. **数据管理对照表**：
   - React `props` ↔ Lit `@property`
   - React `useState` ↔ Lit `@state`
   - React `useEffect` ↔ Lit 生命周期方法
   - React `{props.children}` ↔ Lit `<slot></slot>`
4. **互操作性**：可以通过 `@lit/react` 在 React 项目中无缝使用 Lit 组件

你现有的组件化思维完全适用于 Lit，只是换了一种更贴近 Web 标准的表达方式。

在下一章中，我们将学习 Lit 的样式系统——Shadow DOM 如何实现真正的样式封装。

## 🤔 思考题

1. 为什么 Lit 组件可以在 React 中使用，但 React 组件不能在 Lit 中使用？
2. 如果你要将一个复杂的 React 项目迁移到 Lit，应该从哪里开始？
3. `useEffect` 的依赖数组自动追踪 vs Lit 的 `changedProperties.has()` 手动检查，各有什么优缺点？
