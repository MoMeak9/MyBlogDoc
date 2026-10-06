# 第六章：样式与主题 - Shadow DOM的封装艺术

> **本章核心问题**：
> Shadow DOM 如何实现样式隔离？`:host` 和 `::slotted()` 怎么用？如何让用户自定义组件主题？
>
> **本章你将掌握**：
> - Shadow DOM 的样式封装机制
> - `:host`、`::slotted()` 等特殊选择器
> - CSS 自定义属性创建主题 API
> - 实现明暗主题切换系统

### 6.1 作用域样式的魔力

Lit最强大的特性之一就是它利用Shadow DOM实现了默认的样式封装 。这意味着你在一个组件内部定义的CSS规则，将只作用于该组件的内部DOM，完全不会“泄露”出去影响页面上的其他元素，也不会被外部的全局样式所污染 。  

这种封装性带来了巨大的好处：你可以放心地使用简洁、通用的CSS选择器（如`p`, `button`, `#header`），而不必担心命名冲突 。这极大地简化了CSS的编写和维护，尤其是在大型应用或组件库中。  

在Lit中，样式通常通过一个静态类字段`styles`来定义，并使用`css`标签函数进行包裹 。  

```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-styled-element')
export class MyStyledElement extends LitElement {
  static styles = css`
    p {
      color: blue;
      font-family: sans-serif;
    }
  `;

  render() {
    return html`<p>This text is blue.</p>`;
  }
}
```

即使页面上其他地方有`p { color: red; }`的全局样式，这个组件内的段落依然会是蓝色的。

### 6.2 样式化组件宿主：`:host`选择器

有时，你需要为组件本身（即自定义元素标签，如`<my-styled-element>`）设置样式，而不是为其内部的元素。为此，Shadow DOM提供了一个特殊的伪类选择器：`:host` 。  

```typescript
static styles = css`
  :host {
    display: block;
    border: 1px solid black;
    padding: 16px;
  }
`;
```

一个常见的最佳实践是为`:host`设置`display`属性。因为自定义元素默认的`display`值是`inline`，这意味着直接设置`width`或`height`可能不会生效，这常常会让初学者感到困惑 。通过显式设置  

`display: block;`或`display: inline-block;`可以避免这个问题。

### 6.3 样式化投影内容：`::slotted()`伪元素

当你的组件使用`<slot>`来接收和渲染外部传入的子元素（也称为“Light DOM”或“投影内容”）时，组件内部的常规CSS规则无法直接作用于这些子元素。为了跨越Shadow DOM的边界来为这些“被插入”的元素定义样式，你需要使用`::slotted()`伪元素 。  

```typescript
static styles = css`
  ::slotted(p) {
    color: green;
  }
`;
```

这个规则会选中所有被插入到slot中并且是`<p>`标签的元素，并将它们的颜色设置为绿色。

然而，`::slotted()`有一个重要的限制，也是一个常见的陷阱：它只能选择直接被分配到slot中的子元素，无法选择这些子元素的后代 。例如，如果用户传入  

`<div><p>text</p></div>`，`::slotted(p)`将无法选中这个`<p>`，因为它不是slot的直接子节点。理解这一限制对于正确使用`::slotted()`至关重要。

### 6.4 通过CSS自定义属性创建主题API

那么，如何才能让组件的用户能够安全地自定义组件的内部样式，同时又不破坏其封装性呢？最佳的现代解决方案是使用CSS自定义属性（也称为CSS变量）来创建一个“主题API” 。  

CSS自定义属性有一个特性：它们可以穿透Shadow DOM的边界。这意味着在组件外部为组件设置的自定义属性值，可以在组件内部的Shadow DOM中被接收和使用 。  

最佳实践如下：

1. **在组件内部使用`var()`**：在组件的样式中，使用`var()`函数来消费一个自定义属性，并提供一个备用值。
    
    JavaScript
    
    ```
    static styles = css`
     .header {
        background-color: var(--header-bg-color, #333);
        color: var(--header-text-color, white);
      }
    `;
    ```
    
2. **在组件外部定义属性值**：组件的使用者可以通过标准的CSS来为组件设置这些自定义属性的值，从而实现主题定制。
    
    CSS
    
    ```
    my-component {
      --header-bg-color: steelblue;
    }
    
    my-component.dark-theme {
      --header-bg-color: #222;
      --header-text-color: #eee;
    }
    ```
    

通过这种方式，组件的作者可以精确地控制哪些样式是可定制的，而组件的使用者则可以灵活地调整组件外观以适应其应用的设计系统，实现了封装性与灵活性的完美平衡。

#### 🎨 完整示例：明暗主题切换系统

以下是一个完整的主题切换系统，展示如何使用 CSS 自定义属性实现明暗主题：

**主题化卡片组件（theme-card.ts）**

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('theme-card')
export class ThemeCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      border-radius: 8px;
      padding: 24px;
      /* 使用 CSS 自定义属性，提供默认值（浅色主题） */
      background: var(--card-bg, #ffffff);
      color: var(--card-text, #333333);
      border: 1px solid var(--card-border, #e0e0e0);
      box-shadow: 0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.1));
      transition: all 0.3s ease;
    }

    :host(:hover) {
      box-shadow: 0 4px 12px var(--card-shadow-hover, rgba(0, 0, 0, 0.15));
    }

    .card-header {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid var(--card-divider, #f0f0f0);
    }

    h3 {
      margin: 0;
      color: var(--card-title, #1976d2);
      font-size: 1.25rem;
    }

    .card-content {
      line-height: 1.6;
    }

    .tag {
      display: inline-block;
      padding: 4px 12px;
      margin-top: 12px;
      border-radius: 4px;
      font-size: 0.875rem;
      background: var(--tag-bg, #e3f2fd);
      color: var(--tag-text, #1976d2);
    }
  `;

  @property({ type: String }) title = '';

  render() {
    return html`
      <div class="card-header">
        <h3>${this.title}</h3>
      </div>
      <div class="card-content">
        <slot></slot>
      </div>
      <div class="tag">
        <slot name="tag">默认标签</slot>
      </div>
    `;
  }
}
```

**主题切换器组件（theme-switcher.ts）**

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

type Theme = 'light' | 'dark';

@customElement('theme-switcher')
export class ThemeSwitcher extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      background: var(--button-bg, #1976d2);
      color: var(--button-text, white);
    }

    button:hover {
      opacity: 0.9;
      transform: scale(1.05);
    }

    .icon {
      margin-right: 6px;
    }
  `;

  @state() private currentTheme: Theme = 'light';

  connectedCallback() {
    super.connectedCallback();
    // 从 localStorage 读取用户偏好
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.applyTheme(savedTheme);
    } else {
      // 检测系统主题偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
      this.applyTheme(this.currentTheme);
    }
  }

  private toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);

    // 保存用户偏好
    localStorage.setItem('theme', this.currentTheme);

    // 分发自定义事件，通知其他组件
    this.dispatchEvent(new CustomEvent('theme-changed', {
      detail: { theme: this.currentTheme },
      bubbles: true,
      composed: true
    }));
  }

  private applyTheme(theme: Theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
      // 深色主题
      root.style.setProperty('--card-bg', '#1e1e1e');
      root.style.setProperty('--card-text', '#e0e0e0');
      root.style.setProperty('--card-border', '#333333');
      root.style.setProperty('--card-shadow', 'rgba(0, 0, 0, 0.5)');
      root.style.setProperty('--card-shadow-hover', 'rgba(0, 0, 0, 0.7)');
      root.style.setProperty('--card-divider', '#333333');
      root.style.setProperty('--card-title', '#64b5f6');
      root.style.setProperty('--tag-bg', '#1565c0');
      root.style.setProperty('--tag-text', '#e3f2fd');
      root.style.setProperty('--button-bg', '#64b5f6');
      root.style.setProperty('--button-text', '#1e1e1e');

      document.body.style.background = '#121212';
      document.body.style.color = '#e0e0e0';
    } else {
      // 浅色主题
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--card-text', '#333333');
      root.style.setProperty('--card-border', '#e0e0e0');
      root.style.setProperty('--card-shadow', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--card-shadow-hover', 'rgba(0, 0, 0, 0.15)');
      root.style.setProperty('--card-divider', '#f0f0f0');
      root.style.setProperty('--card-title', '#1976d2');
      root.style.setProperty('--tag-bg', '#e3f2fd');
      root.style.setProperty('--tag-text', '#1976d2');
      root.style.setProperty('--button-bg', '#1976d2');
      root.style.setProperty('--button-text', 'white');

      document.body.style.background = '#f5f5f5';
      document.body.style.color = '#333333';
    }
  }

  render() {
    const icon = this.currentTheme === 'light' ? '🌙' : '☀️';
    const label = this.currentTheme === 'light' ? '深色模式' : '浅色模式';

    return html`
      <button @click=${this.toggleTheme}>
        <span class="icon">${icon}</span>
        ${label}
      </button>
    `;
  }
}
```

**使用示例（index.html）**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主题切换示例</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 20px;
      transition: background 0.3s, color 0.3s;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
  </style>
  <script type="module" src="./theme-card.js"></script>
  <script type="module" src="./theme-switcher.js"></script>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Lit 主题系统示例</h1>
      <theme-switcher></theme-switcher>
    </div>

    <div class="cards">
      <theme-card title="产品介绍">
        Lit 是一个用于构建快速、轻量级 Web 组件的简单库。
        它基于 Web 标准，提供了响应式状态管理和声明式模板。
        <span slot="tag">✨ 特性</span>
      </theme-card>

      <theme-card title="性能优势">
        只有 5KB 的核心库，精准更新机制，无需虚拟 DOM 对比。
        让你的应用加载更快，运行更流畅。
        <span slot="tag">⚡ 性能</span>
      </theme-card>

      <theme-card title="开发体验">
        TypeScript 支持，装饰器语法，完善的开发工具。
        让组件开发变得简单而愉悦。
        <span slot="tag">🛠️ 工具</span>
      </theme-card>
    </div>
  </div>

  <script>
    // 监听主题变化事件
    document.addEventListener('theme-changed', (e) => {
      console.log('主题已切换为:', e.detail.theme);
    });
  </script>
</body>
</html>
```

**关键技术点**：

1. **CSS 自定义属性穿透 Shadow DOM**：
   - 在组件内部使用 `var(--card-bg, #ffffff)` 定义可自定义样式
   - 在外部通过 `document.documentElement.style.setProperty()` 全局修改

2. **主题持久化**：
   - 使用 `localStorage` 保存用户主题偏好
   - 检测系统主题偏好 `prefers-color-scheme`

3. **跨组件通信**：
   - 使用 `CustomEvent` 分发主题变化事件
   - `bubbles: true` 和 `composed: true` 让事件穿透 Shadow DOM

4. **平滑过渡**：
   - CSS `transition` 属性实现主题切换动画

5. **封装性**：
   - 组件内部样式完全隔离
   - 仅通过预定义的 CSS 变量暴露可定制项

---

## 📝 本章小结

通过本章学习，你应该掌握了：

1. **样式封装原理**：Shadow DOM 创建了样式边界，组件内部 CSS 不影响外部，外部全局样式也不影响组件
2. **特殊选择器**：
   - `:host` - 选择组件自身（宿主元素）
   - `:host()` - 根据条件选择宿主
   - `::slotted()` - 选择被投影到 slot 的元素（仅限直接子元素）
3. **主题 API 设计**：使用 CSS 自定义属性（CSS 变量）穿透 Shadow DOM 边界，让用户可控地定制组件外观
4. **最佳实践**：为 `:host` 设置 `display` 属性，为自定义属性提供合理默认值

在下一章中，我们将学习组件间如何通信——"属性向下，事件向上"的黄金法则。

## 🤔 思考题

1. 为什么 `::slotted()` 只能选择直接子元素？这个限制是技术实现导致的还是有意设计的？
2. 如果不使用 CSS 自定义属性，还有其他方式让用户定制组件样式吗？各有什么优缺点？
3. Shadow DOM 的样式封装对性能有影响吗（相比传统的 BEM 或 CSS Modules）？