# 第二章：你的第一个Lit组件 - 从零到"Hello, World"

> **本章核心问题**：
> 如何快速开始Lit开发？最小化的Lit组件需要哪些部分？装饰器和原生API有什么区别？
>
> **本章你将掌握**：
> - 三种不同的开发环境选择（Playground、CDN、Starter Kit）
> - LitElement 基类和 html 标签函数的作用
> - 使用装饰器或原生API注册自定义元素
> - 从零创建并运行你的第一个 Lit 组件

### 2.1 环境搭建：Lit Playground、CDN与入门套件

开启Lit开发之旅有多种途径，可以根据不同的需求选择最合适的方式，从无需任何安装的在线环境到功能完备的专业开发工作流。

- **即时体验 (Lit Playground)**：最快捷的方式是使用官方提供的交互式Lit Playground 。这是一个完全在浏览器中运行的代码沙箱，无需安装任何工具，可以直接编写和运行Lit组件，是初学者体验核心概念的绝佳选择。  
    
- **本地开发，无需工具 (CDN)**：Lit的简洁性体现在它甚至可以完全脱离构建工具使用。你只需创建一个HTML文件，通过CDN在一个`<script type="module">`标签中引入Lit的核心库包，就可以开始编写组件了 。这种方式清晰地展示了Lit只是一个标准的JavaScript模块，有助于揭开其“神秘面纱”。  
    
- **专业工作流 (入门套件)**：对于正式项目开发，官方推荐使用入门套件（Starter Kits）。套件分为JavaScript和TypeScript版本，预配置了一整套专业的开发工具，包括用于管理依赖的Node.js和npm、本地开发服务器（ES dev server）、代码规范检查工具（ESLint和lit-analyzer）以及测试框架（Karma）。此外，由Open WC项目提供的脚手架也是一个备受推荐的选择，它能通过交互式问答快速生成一个基于Lit的项目 。  
    

本教程将引导你使用官方的JavaScript入门套件，逐步了解一个标准的Lit项目结构及其中的工具链。

### 2.2 Lit组件剖析：`LitElement`与`html`

一个最基础的 Lit 组件由几个核心部分构成。让我们通过一个经典的“Hello, World”示例来逐一解析：


```JavaScript
import { LitElement, html } from 'lit';

class MyElement extends LitElement {
  render() {
    return html`<h1>Hello, World!</h1>`;
  }
}
```

- **`import { LitElement, html } from 'lit';`**：这行代码从`lit`包中导入了两个核心模块。`LitElement`是所有Lit组件的基类，提供了响应式更新等核心功能 。  
    
    `html`是一个标签函数，用于创建Lit的声明式模板 。  
    
- **`class MyElement extends LitElement`**：我们通过创建一个继承自`LitElement`的JavaScript类来定义一个新组件。这种面向对象的方式使得组件的逻辑、状态和模板得以封装。
    
- **`render()`**：这是`LitElement`中的一个生命周期方法，负责定义组件的UI结构 。当组件需要更新时，这个方法会被调用，并且它必须返回一个由  
    
    `html`标签函数创建的`TemplateResult`对象。
    

### 2.3 定义与注册你的元素

定义了组件类之后，还需要告知浏览器这个新元素的存在，这个过程称为“注册”。


```JavaScript
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  render() {
    return html`<h1>Hello, World!</h1>`;
  }
}
```

- **`@customElement('my-element')`**：这是一个装饰器（Decorator），它是注册自定义元素的一种便捷语法。它所做的事情等同于调用浏览器原生的`customElements.define()` API 。括号中的字符串  
    
    `'my-element'`是你为组件定义的HTML标签名。自定义元素标签名必须包含一个连字符（-），这是W3C标准的要求，用以区分自定义元素和原生HTML元素。
    

如果你不使用装饰器（例如在纯JavaScript项目中），可以直接调用标准API来完成注册：



```JavaScript
class MyElement extends LitElement {
  //...
}
customElements.define('my-element', MyElement);
```

两种方式效果完全相同，装饰器只是提供了一种更简洁、更具声明性的语法。这再次体现了Lit紧密贴合Web平台标准的理念。

### 2.4 在HTML中使用你的组件

一旦组件被成功注册，它就成为了一个功能完备的HTML元素。你可以像使用任何内置标签一样在你的HTML文件中使用它 。  

在你的`index.html`文件中，只需添加以下代码：


```HTML
<my-element></my-element>
```

当浏览器加载页面时，它会识别这个标签，找到与之关联的`MyElement`类，实例化该组件，并将其渲染到页面上。至此，你已经完成了从零到一的整个流程，并在屏幕上看到了你的第一个Lit组件——这是体验Lit强大功能的第一个"啊哈！"时刻。

### 💻 完整示例：创建一个交互式问候组件

让我们创建一个更完整的示例，展示 Lit 组件的基本功能，包括属性、状态和事件处理：

**方式1：使用 TypeScript 和装饰器（推荐）**

```typescript
// greeting-card.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('greeting-card')
export class GreetingCard extends LitElement {
  // 定义组件样式（封装在 Shadow DOM 中）
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      border-radius: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: Arial, sans-serif;
      max-width: 400px;
      margin: 20px auto;
    }

    h1 {
      margin: 0 0 16px 0;
      font-size: 24px;
    }

    input {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      width: 200px;
      margin-right: 8px;
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background: white;
      color: #667eea;
      font-size: 16px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    button:hover {
      transform: scale(1.05);
    }

    .greeting {
      margin-top: 20px;
      padding: 16px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      font-size: 18px;
    }
  `;

  // 公共属性：可从外部传入
  @property({ type: String }) title = 'Lit 问候组件';

  // 内部状态
  @state() private userName = '';
  @state() private greeting = '';

  // 处理输入变化
  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.userName = input.value;
  }

  // 生成问候语
  private generateGreeting() {
    if (this.userName.trim()) {
      const hour = new Date().getHours();
      let timeGreeting = '你好';

      if (hour < 6) timeGreeting = '凌晨好';
      else if (hour < 12) timeGreeting = '早上好';
      else if (hour < 14) timeGreeting = '中午好';
      else if (hour < 18) timeGreeting = '下午好';
      else if (hour < 22) timeGreeting = '晚上好';
      else timeGreeting = '深夜好';

      this.greeting = `${timeGreeting}，${this.userName}！欢迎体验 Lit 的魔力 ✨`;
    } else {
      this.greeting = '请输入您的名字';
    }
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <div>
        <input
          type="text"
          placeholder="请输入您的名字"
          .value=${this.userName}
          @input=${this.handleInput}
        />
        <button @click=${this.generateGreeting}>
          生成问候语
        </button>
      </div>
      ${this.greeting ? html`
        <div class="greeting">
          ${this.greeting}
        </div>
      ` : ''}
    `;
  }
}
```

**方式2：使用纯 JavaScript（无装饰器）**

```javascript
// greeting-card-js.js
import { LitElement, html, css } from 'lit';

export class GreetingCard extends LitElement {
  static properties = {
    title: { type: String },
    userName: { type: String, state: true },
    greeting: { type: String, state: true }
  };

  static styles = css`
    /* 样式同上 */
  `;

  constructor() {
    super();
    this.title = 'Lit 问候组件';
    this.userName = '';
    this.greeting = '';
  }

  handleInput(e) {
    this.userName = e.target.value;
  }

  generateGreeting() {
    // 逻辑同上
  }

  render() {
    // 模板同上
  }
}

// 注册组件
customElements.define('greeting-card', GreetingCard);
```

**方式3：使用 CDN 快速体验（无需构建工具）**

创建一个 `index.html` 文件：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的第一个 Lit 组件</title>
  <script type="module">
    import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

    class GreetingCard extends LitElement {
      static properties = {
        title: { type: String },
        userName: { type: String },
        greeting: { type: String }
      };

      static styles = css`
        :host {
          display: block;
          padding: 20px;
          background: #f0f0f0;
          border-radius: 8px;
          max-width: 400px;
        }

        button {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background: #0056b3;
        }
      `;

      constructor() {
        super();
        this.title = '欢迎使用 Lit！';
        this.userName = '';
        this.greeting = '';
      }

      render() {
        return html`
          <h1>${this.title}</h1>
          <div>
            <input
              type="text"
              placeholder="输入名字"
              @input=${(e) => this.userName = e.target.value}
            />
            <button @click=${() => {
              this.greeting = this.userName
                ? `你好，${this.userName}！`
                : '请先输入名字';
            }}>
              打招呼
            </button>
          </div>
          ${this.greeting ? html`<p>${this.greeting}</p>` : ''}
        `;
      }
    }

    customElements.define('greeting-card', GreetingCard);
  </script>
</head>
<body>
  <h1>Lit 入门示例</h1>

  <!-- 使用组件，传入自定义标题 -->
  <greeting-card title="我的问候卡片"></greeting-card>

  <!-- 可以创建多个实例 -->
  <greeting-card title="另一个问候卡片"></greeting-card>
</body>
</html>
```

**运行和测试**

1. **使用 CDN 版本**：
   - 直接在浏览器中打开 `index.html`
   - 无需任何构建工具或服务器

2. **使用 Starter Kit**：
   ```bash
   # 克隆官方 starter
   git clone https://github.com/lit/lit-element-starter-ts.git
   cd lit-element-starter-ts

   # 安装依赖
   npm install

   # 将组件代码添加到 src 目录
   # 在 index.html 中引入组件

   # 启动开发服务器
   npm start
   ```

3. **在 Lit Playground 中测试**：
   - 访问 https://lit.dev/playground/
   - 粘贴组件代码
   - 实时预览结果

**关键学习点**：

1. **Shadow DOM 样式封装**：组件样式不会影响外部，外部样式也不会影响组件
2. **响应式属性**：`@property` 和 `@state` 的区别和用法
3. **事件处理**：使用 `@event` 语法绑定事件
4. **条件渲染**：使用三元运算符或逻辑运算符控制渲染
5. **属性绑定**：`.value` 用于属性绑定，`value` 用于特性绑定

---

## 📝 本章小结

通过本章学习，你已经掌握了：

1. **环境选择**：三种开发环境各有特点
   - Lit Playground：零配置在线体验，适合快速原型
   - CDN 方式：无需构建工具，展示 Lit 的简洁性
   - Starter Kit：专业工作流，包含完整工具链（ESLint、Karma、dev server）

2. **核心概念**：
   - `LitElement`：所有 Lit 组件的基类，提供响应式更新能力
   - `html`：标签函数，用于创建声明式模板
   - `render()`：生命周期方法，返回组件的 UI 结构

3. **元素注册**：两种等效方式
   - 装饰器：`@customElement('my-element')` - 更简洁声明式
   - 原生 API：`customElements.define()` - 直接调用标准 API
   - 标签名规范：必须包含连字符（-）以区分自定义元素

4. **使用组件**：注册后像普通 HTML 标签一样使用 `<my-element></my-element>`

> **⚡ 关键认知**：Lit 不是在创造新的概念，而是在增强 Web 标准。你写的每个组件都是标准的 Web Component。

在下一章中，我们将深入探索 lit-html 的强大功能，学习如何创建动态、响应式的模板。

## 🤔 思考题

1. 为什么自定义元素的标签名必须包含连字符？这个设计决策背后的原因是什么？
2. 装饰器语法和原生 API 在功能上完全相同，那为什么 Lit 要提供两种方式？
3. 如果不使用任何构建工具（纯 CDN 方式），Lit 组件能实现哪些功能，又有哪些限制？