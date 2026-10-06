---
Theme: devui-blue
---
在[上一篇文章](https://juejin.cn/post/7535511727035891754)中，我们深入探讨了 Tiptap 的三大核心设计哲学：基于 ProseMirror 的坚实基础、赋予开发者完全自由的"无头"理念，以及"万物皆扩展"的模块化架构。

理论学习固然重要，但实践出真知。从本章开始，我们将正式踏入实战阶段，通过构建一个完整的富文本编辑器来掌握 Tiptap 的精髓。

## 📋 本章学习目标

完成本章学习后，你将能够：

✅ **环境搭建**：在 React 项目中正确安装和配置 Tiptap  
✅ **快速上手**：使用 `StarterKit` 构建功能完备的基础编辑器  
✅ **UI 定制**：实践"无头"理念，打造个性化工具栏界面  
✅ **性能调优**：掌握核心优化技巧，避免组件重渲染陷阱  
✅ **跨框架应用**：了解在 Vue、Svelte 中的应用要点

> 💡 **适用范围说明**  
> 本文以 React 为主要演示框架，但核心概念（扩展配置、命令链、事件处理）在 Vue、Svelte 等框架中完全通用。文末会提供其他框架的实现要点。

## 🚀 第一步：项目环境搭建

### 前置条件检查

在开始之前，请确保你的开发环境满足以下要求：

- **Node. Js 版本**：16. X 或更高版本
- **包管理器**：npm 7. X+ 或 yarn 1.22. X+
- **React 项目**：通过 Create React App、Vite 或 Next. Js 创建的项目均可

> 💡 **推荐使用 Vite**  
> 相比 Create React App，Vite 提供更快的开发体验和更小的构建包。如果你还没有项目，可以通过 `npm create vite@latest my-tiptap-app -- --template react` 快速创建。

### 核心依赖包安装

进入你的项目根目录，执行以下命令安装 Tiptap 的核心依赖：

```bash
# 使用 npm
npm install @tiptap/react @tiptap/starter-kit

# 使用 yarn  
yarn add @tiptap/react @tiptap/starter-kit

# 使用 pnpm（推荐）
pnpm add @tiptap/react @tiptap/starter-kit
```

### 依赖包详解

让我们了解一下刚才安装的两个核心包的作用：

| 包名 | 作用 | 包含内容 |
|------|------|----------|
| `@tiptap/react` | React 框架集成层 | `useEditor`、`EditorContent`、`EditorProvider` 等核心 Hook 和组件 |
| `@tiptap/starter-kit` | 官方精选扩展集合 | 段落、标题、粗体、斜体、列表、链接等 15+ 常用扩展 |

> 🔍 **StarterKit 包含的扩展一览**  
> - **文本格式**：Bold、Italic、Strike、Code  
> - **段落结构**：Paragraph、Heading、Blockquote  
> - **列表功能**：BulletList、OrderedList、ListItem  
> - **其他功能**：HardBreak、HorizontalRule、History（撤销重做）等

### 可选：安装类型声明（TypeScript 项目）

如果你使用 TypeScript，建议同时安装类型声明文件：

```bash
npm install --save-dev @types/prosemirror-view @types/prosemirror-state
```

## 📝 第二步：创建基础编辑器组件

安装完成后，让我们动手创建第一个 Tiptap 编辑器。我们将从最简单的版本开始，逐步添加功能。

### 创建编辑器核心组件

在 `src` 目录下新建文件 `components/TiptapEditor.jsx`：

```javascript
// src/components/TiptapEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
      <h2>欢迎来到 Tiptap 深度教程</h2>
      <p>这是你的第一个 Tiptap 编辑器。你可以直接在这里 <strong>编辑</strong> 文字。</p>
      <p>试试以下功能：</p>
      <ul>
        <li>选中文字按 <strong>Ctrl+B</strong> 加粗</li>
        <li>按 <strong>Ctrl+I</strong> 斜体</li>
        <li>输入 <code># </code> 创建标题</li>
        <li>输入 <code>- </code> 创建列表</li>
      </ul>
    `,
    // 编辑器配置选项
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    // 当内容变化时的回调
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('内容已更新:', html);
    },
  });

  return (
    <div className="tiptap-editor">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
```

### 核心 API 解析

让我们深入理解上述代码中的关键概念：

#### 1. `useEditor` Hook

这是 Tiptap 的核心 Hook，接收一个配置对象：

```javascript
const editor = useEditor({
  extensions: [],      // 扩展配置
  content: '',        // 初始内容
  editorProps: {},    // 编辑器属性
  onUpdate: () => {}, // 内容更新回调
  onCreate: () => {}, // 编辑器创建回调
  onDestroy: () => {},// 编辑器销毁回调
});
```

#### 2. `extensions` 数组

这是 Tiptap "万物皆扩展" 理念的核心体现：

```javascript
// 最简配置
extensions: [StarterKit]

// 自定义配置
extensions: [
  StarterKit.configure({
    // 禁用某些功能
    strike: false,
    // 自定义标题级别
    heading: {
      levels: [1, 2, 3],
    },
  }),
]
```

#### 3. `content` 初始内容

支持多种格式的初始内容：

```javascript
// HTML 字符串
content: '<p>Hello <strong>World</strong>!</p>'

// JSON 格式（ProseMirror 文档格式）
content: {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Hello World!' }
      ]
    }
  ]
}

// 纯文本
content: 'Hello World!'
```

### 在应用中使用编辑器

修改你的 `src/App.jsx` 文件：

```javascript
// src/App.jsx
import TiptapEditor from './components/TiptapEditor';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🚀 Tiptap 编辑器演示</h1>
        <p>基于 React 的富文本编辑器实战教程</p>
      </header>
      
      <main className="app-main">
        <TiptapEditor />
      </main>
    </div>
  );
}

export default App;
```

### 添加基础样式

创建 `src/App.css` 文件，为编辑器添加美观的样式：

```css
/* src/App.css */
.App {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
}

.app-header h1 {
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.app-header p {
  color: #6b7280;
  font-size: 1.1rem;
}

/* 编辑器容器样式 */
.tiptap-editor {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.tiptap-editor:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 编辑器内容区域样式 */
.tiptap {
  padding: 1.5rem;
  min-height: 300px;
  background: white;
  outline: none;
  line-height: 1.6;
}

/* 编辑器内元素样式 */
.tiptap h1, .tiptap h2, .tiptap h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.tiptap h1 { font-size: 1.875rem; color: #1f2937; }
.tiptap h2 { font-size: 1.5rem; color: #374151; }
.tiptap h3 { font-size: 1.25rem; color: #4b5563; }

.tiptap p {
  margin-bottom: 1rem;
  color: #374151;
}

.tiptap ul, .tiptap ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.tiptap li {
  margin-bottom: 0.25rem;
}

.tiptap strong {
  font-weight: 600;
  color: #1f2937;
}

.tiptap code {
  background: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
}

.tiptap blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #6b7280;
}
```

### 🎉 运行测试

现在启动你的开发服务器：

```bash
npm run dev
# 或者
yarn dev
```

访问 `http://localhost:3000`（或 Vite 默认的 `http://localhost:5173`），你应该能看到一个功能完整的富文本编辑器！

尝试以下操作来验证编辑器功能：
- ✅ 直接输入文字
- ✅ 选中文字使用快捷键（Ctrl+B 加粗、Ctrl+I 斜体）
- ✅ 输入 `# ` 创建标题
- ✅ 输入 `- ` 创建无序列表
- ✅ 使用 Ctrl+Z 撤销操作

## 🎨 第三步：打造专属工具栏 - 实践"无头"理念

一个只能通过键盘快捷键操作的编辑器还不够人性化，我们需要一个可视化的工具栏。这正是体现 Tiptap "无头"设计威力的绝佳时机——Tiptap 专注于编辑逻辑，UI 完全由我们掌控。

### 创建基础工具栏组件

新建 `src/components/MenuBar.jsx` 文件：

```javascript
// src/components/MenuBar.jsx
import React from 'react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menu-bar">
      {/* 文本格式按钮 */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title="加粗 (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="斜体 (Ctrl+I)"
        >
          <em>I</em>
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          title="删除线"
        >
          <s>S</s>
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
          title="行内代码"
        >
          &lt;/&gt;
        </button>
      </div>

      {/* 分隔线 */}
      <div className="divider"></div>

      {/* 标题按钮 */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          title="一级标题"
        >
          H1
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          title="二级标题"
        >
          H2
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          title="三级标题"
        >
          H3
        </button>
        
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
          title="正文段落"
        >
          P
        </button>
      </div>

      {/* 分隔线 */}
      <div className="divider"></div>

      {/* 列表按钮 */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          title="无序列表"
        >
          • 列表
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          title="有序列表"
        >
          1. 列表
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          title="引用块"
        >
          " 引用
        </button>
      </div>

      {/* 分隔线 */}
      <div className="divider"></div>

      {/* 操作按钮 */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="撤销 (Ctrl+Z)"
        >
          ↶ 撤销
        </button>
        
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="重做 (Ctrl+Y)"
        >
          ↷ 重做
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
```

### 深入理解核心 API

在上述工具栏代码中，我们使用了 Tiptap 的三个核心 API：

#### 1. 命令链 API：`editor.chain()`

```javascript
// 基础语法
editor.chain().focus().toggleBold().run()

// 链式操作：先聚焦，再加粗，最后执行
editor
  .chain()           // 开启命令链
  .focus()           // 聚焦编辑器
  .toggleBold()      // 切换加粗状态
  .run()             // 执行所有命令

// 复合操作示例
editor
  .chain()
  .focus()
  .clearContent()                    // 清空内容
  .setContent('<p>新内容</p>')        // 设置新内容
  .selectAll()                       // 全选
  .run()
```

#### 2. 状态检测 API：`editor.isActive()`

```javascript
// 检测当前是否为加粗状态
editor.isActive('bold')              // 返回 true/false

// 检测是否为特定级别的标题
editor.isActive('heading', { level: 1 })

// 检测是否为列表项
editor.isActive('listItem')

// 检测是否有选中内容
editor.state.selection.empty        // 返回 true/false
```

#### 3. 能力检测 API：`editor.can()`

```javascript
// 检测是否可以执行某个命令
editor.can().chain().focus().toggleBold().run()

// 检测撤销能力
editor.can().undo()

// 检测重做能力  
editor.can().redo()
```

### 集成工具栏到编辑器

修改 `src/components/TiptapEditor.jsx`，将工具栏集成进来：

```javascript
// src/components/TiptapEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
      <h2>欢迎来到 Tiptap 深度教程</h2>
      <p>现在你可以使用上方的工具栏来格式化文本了！</p>
      <p>试试以下功能：</p>
      <ul>
        <li>点击 <strong>B</strong> 按钮加粗文字</li>
        <li>使用 <em>H1、H2、H3</em> 创建不同级别的标题</li>
        <li>创建 <strong>有序</strong> 和 <strong>无序</strong> 列表</li>
        <li>添加 <blockquote>引用块</blockquote></li>
      </ul>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  return (
    <div className="tiptap-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
```

### 工具栏样式设计

在 `src/App.css` 中添加工具栏样式：

```css
/* 工具栏样式 */
.menu-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.button-group {
  display: flex;
  gap: 2px;
}

.menu-bar button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  color: #374151;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.menu-bar button:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.menu-bar button:active:not(:disabled) {
  background: #e5e7eb;
  transform: translateY(1px);
}

.menu-bar button.is-active {
  background: #3b82f6;
  border-color: #2563eb;
  color: white;
}

.menu-bar button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.divider {
  width: 1px;
  height: 24px;
  background: #d1d5db;
  margin: 0 8px;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .menu-bar {
    padding: 8px 12px;
  }
  
  .button-group {
    gap: 1px;
  }
  
  .menu-bar button {
    min-width: 28px;
    height: 28px;
    font-size: 11px;
  }
  
  .divider {
    height: 20px;
    margin: 0 4px;
  }
}
```

### 🎉 测试工具栏功能

刷新页面，你现在拥有一个功能完备且美观的编辑器工具栏！尝试以下操作：

- ✅ 点击格式化按钮（加粗、斜体、删除线）
- ✅ 切换不同级别的标题
- ✅ 创建和管理列表
- ✅ 使用撤销/重做功能
- ✅ 观察按钮的激活状态变化

> 💡 **UI 自由度体现**  
> 注意到了吗？我们完全控制了工具栏的外观、布局和交互。这就是"无头"设计的魅力：Tiptap 负责复杂的编辑逻辑，而 UI 的一切都由我们决定。

## ⚡ 第四步：性能优化实战 - 解决重渲染陷阱

目前我们的编辑器工作良好，但隐藏着一个严重的性能问题。让我们通过 React Developer Tools 观察一下：

### 问题分析

当前的实现中，`useEditor` Hook 所在的组件会在编辑器每次状态变化时都触发重新渲染：

- ✋ 每次按键都会导致 `TiptapEditor` 组件重渲染
- ✋ `MenuBar` 组件也会跟着重渲染
- ✋ 在长文档编辑时会造成明显的性能下降

### 解决方案：EditorProvider 模式

Tiptap 提供了 `EditorProvider` 和 `useCurrentEditor` 来解决这个问题。让我们重构代码：

#### 1. 重构 MenuBar 组件

修改 `src/components/MenuBar.jsx`：

```javascript
// src/components/MenuBar.jsx
import React from 'react';
import { useCurrentEditor } from '@tiptap/react';

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="menu-bar">
      {/* 文本格式按钮 */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title="加粗 (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="斜体 (Ctrl+I)"
        >
          <em>I</em>
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          title="删除线"
        >
          <s>S</s>
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
          title="行内代码"
        >
          &lt;/&gt;
        </button>
      </div>

      {/* 分隔线 */}
      <div className="divider"></div>

      {/* 标题按钮 */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          title="一级标题"
        >
          H1
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          title="二级标题"
        >
          H2
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          title="三级标题"
        >
          H3
        </button>
        
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
          title="正文段落"
        >
          P
        </button>
      </div>

      {/* 分隔线 */}
      <div className="divider"></div>

      {/* 列表按钮 */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          title="无序列表"
        >
          • 列表
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          title="有序列表"
        >
          1. 列表
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          title="引用块"
        >
          " 引用
        </button>
      </div>

      {/* 分隔线 */}
      <div className="divider"></div>

      {/* 操作按钮 */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="撤销 (Ctrl+Z)"
        >
          ↶ 撤销
        </button>
        
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="重做 (Ctrl+Y)"
        >
          ↷ 重做
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
```

#### 2. 重构主编辑器组件

修改 `src/components/TiptapEditor.jsx`：

```javascript
// src/components/TiptapEditor.jsx
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';

const TiptapEditor = () => {
  // 编辑器配置
  const extensions = [StarterKit];
  
  const content = `
    <h2>🚀 性能优化后的 Tiptap 编辑器</h2>
    <p>现在编辑器的性能已经得到大幅优化！</p>
    <p><strong>优化要点：</strong></p>
    <ul>
      <li>使用 <code>EditorProvider</code> 管理编辑器实例</li>
      <li>工具栏通过 <code>useCurrentEditor</code> 获取编辑器引用</li>
      <li>避免了不必要的组件重渲染</li>
      <li>大幅提升了编辑体验的流畅度</li>
    </ul>
    <blockquote>
      <p>💡 <strong>性能提示</strong>：在长文档编辑时，这种优化尤其重要。</p>
    </blockquote>
  `;

  const editorProps = {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  };

  return (
    <div className="tiptap-editor">
      <EditorProvider
        extensions={extensions}
        content={content}
        editorProps={editorProps}
        slotBefore={<MenuBar />}
        onUpdate={({ editor }) => {
          console.log('内容已更新:', editor.getHTML());
        }}
      >
        {/* EditorProvider 会自动渲染 EditorContent */}
        {/* 如果需要，可以在这里添加其他子组件 */}
      </EditorProvider>
    </div>
  );
};

export default TiptapEditor;
```

### 性能优化原理解析

让我们理解一下这种重构带来的性能提升：

| 优化前（useEditor） | 优化后（EditorProvider） |
|-------------------|------------------------|
| 每次编辑都重渲染主组件 | 主组件保持静态 |
| 工具栏跟随重渲染 | 工具栏独立渲染 |
| Props 传递链条长 | Context 直接访问 |
| 性能随内容增长下降 | 性能稳定 |

#### UseCurrentEditor 的工作机制

```javascript
// useCurrentEditor 的特点
const { editor } = useCurrentEditor();

// ✅ 仅获取编辑器实例引用，不监听状态变化
// ✅ 不会导致组件重渲染
// ✅ 适合用于工具栏等静态 UI 组件
// ✅ 命令执行和状态检测功能完全正常
```

### 🎯 性能测试

重构完成后，让我们验证性能提升：

1. **打开 React Developer Tools**
2. **启用 "Highlight updates when components render"**
3. **在编辑器中快速输入文字**
4. **观察组件重渲染情况**

您会发现：
- ✅ 输入时只有编辑内容区域更新
- ✅ 工具栏保持静态，不再闪烁
- ✅ 整体编辑体验更加流畅

## 🌍 跨框架应用指南

虽然本文以 React 为例，但 Tiptap 对其他主流前端框架同样提供了优秀的支持。

### Vue 3 集成要点

```vue
<!-- Vue 3 示例 -->
<template>
  <div class="tiptap-editor">
    <MenuBar :editor="editor" />
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar.vue'

const editor = useEditor({
  extensions: [StarterKit],
  content: '<p>Hello Vue!</p>',
  onUpdate: ({ editor }) => {
    console.log('内容更新:', editor.getHTML())
  }
})
</script>
```

### Svelte 集成要点

```svelte
<!-- Svelte 示例 -->
<script>
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  
  let editor
  let element

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit],
      content: '<p>Hello Svelte!</p>',
      onTransaction: () => {
        // 强制重新渲染以更新 UI
        editor = editor
      },
    })
  })

  onDestroy(() => {
    if (editor) {
      editor.destroy()
    }
  })
</script>

<div bind:this={element}></div>
```

### 跨框架通用要点

无论使用哪种框架，以下概念都是一致的：

```javascript
// 1. 扩展配置
extensions: [StarterKit, /* 其他扩展 */]

// 2. 命令链语法
editor.chain().focus().toggleBold().run()

// 3. 状态检测
editor.isActive('bold')

// 4. 内容操作
editor.getHTML()        // 获取 HTML
editor.setContent()     // 设置内容
editor.clearContent()   // 清空内容
```

## 📚 本章要点总结

通过本章学习，你已经掌握了 Tiptap 的核心使用技能：

### 🎯 核心成就

| 技能点 | 掌握程度 | 实际应用 |
|--------|----------|----------|
| **环境搭建** | ✅ 完成 | 正确安装和配置 Tiptap 依赖 |
| **基础编辑器** | ✅ 完成 | 使用 useEditor 创建功能完备的编辑器 |
| **自定义 UI** | ✅ 完成 | 实现完整的工具栏界面 |
| **性能优化** | ✅ 完成 | 掌握 EditorProvider 优化模式 |
| **API 理解** | ✅ 完成 | 熟练使用命令链、状态检测等核心 API |

### 🔑 关键 API 速查

```javascript
// 编辑器初始化
const editor = useEditor({ extensions, content, onUpdate })

// 命令执行
editor.chain().focus().toggleBold().run()

// 状态检测  
editor.isActive('bold')
editor.can().undo()

// 内容操作
editor.getHTML()
editor.setContent('<p>新内容</p>')
editor.clearContent()

// 性能优化
const { editor } = useCurrentEditor()  // 不触发重渲染
```

### 🚀 下一步学习方向

在下一篇文章 **《Tiptap 深度教程 (三)：扩展的力量：分类详解与实战》** 中，我们将深入探索 `StarterKit` 之外的广阔世界，学习如何集成和使用链接、图片、占位符、代码高亮等更多强大的官方扩展。