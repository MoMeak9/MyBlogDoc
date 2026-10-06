# Tiptap 深度教程（三）：掌握内容 - 核心扩展全面指南

## 前言回顾

在 [第二章](https://www.google.com/search?q=...) 中，我们成功使用 `StarterKit` 快速搭建了一个功能完备且经过性能优化的富文本编辑器。`StarterKit` 确实是一个极佳的起点，它为我们提供了开箱即用的基础功能。

然而，Tiptap 的真正威力在于其精细的模块化设计和"按需引入"的架构哲学。就像搭建乐高积木一样，你可以精确选择需要的功能模块，避免不必要的代码冗余。

## 为什么要学习独立扩展？

在实际项目开发中，你可能会遇到以下场景：

- **性能优化需求**：项目对包体积有严格要求，需要去除不必要的功能
- **功能定制需求**：需要更精细地控制每个功能的具体行为
- **扩展功能需求**：需要添加 `StarterKit` 中没有包含的高级功能
- **品牌定制需求**：需要深度定制编辑器的外观和交互方式

当遇到这些情况时，深入了解 Tiptap 丰富的独立扩展生态系统就变得至关重要。

## 本章学习目标

通过本章的学习，你将掌握：

- **扩展管理技能**：独立查找、安装和配置 Tiptap 的核心扩展
- **富内容集成**：为编辑器添加链接、图片、语法高亮代码块等多媒体内容
- **用户体验优化**：通过占位符、@提及等交互功能，显著提升编辑器的易用性
- **模块化思维**：培养按需选择功能模块的架构思维

## 从 StarterKit 到独立扩展：模块化的艺术

### 理解 StarterKit 的本质

`StarterKit` 本质上是一个预配置的扩展包，它将多个常用的扩展打包在一起，为开发者提供便利。想象一下，它就像是一个"精装修"的房子，基础设施齐全，拎包入住。

但在实际开发中，我们往往需要"毛坯房"，这样可以：
- 精确控制每一个功能模块
- 根据实际需求进行个性化配置
- 优化最终的代码包体积

### 独立扩展配置示例

让我们看看如何用独立扩展替代 `StarterKit`：

```jsx
import { useEditor } from '@tiptap/react';

// 核心功能扩展（必需）
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import History from '@tiptap/extension-history';

// 格式化扩展（按需引入）
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';

const editor = useEditor({
  extensions: [
    // 基础扩展 - 这些是编辑器运行的基石
    Document,        // 文档根节点
    Paragraph,       // 段落节点
    Text,           // 文本节点
    History,        // 撤销/重做功能
    
    // 功能扩展 - 根据需求配置
    Bold,           // 粗体
    Italic,         // 斜体
    Heading.configure({
      levels: [1, 2, 3], // 只启用 H1、H2、H3 标题
    }),
  ],
  content: '<p>开始编写内容...</p>',
});
```

### 这种方式的核心优势

**1. 精确控制**
```jsx
// 示例：限制标题层级
Heading.configure({
  levels: [1, 2, 3], // 只保留主要标题层级
})

// 示例：自定义历史记录深度
History.configure({
  depth: 50, // 设置撤销历史记录数量
})
```

**2. 性能优化**
如果你的应用不需要引用块（`Blockquote`）或水平分割线（`HorizontalRule`），完全可以不引入这些扩展，从而：
- 减少 JavaScript 包体积
- 降低内存占用
- 提升加载速度

**3. 渐进式增强**
你可以从最基础的功能开始，然后根据用户反馈和业务需求，逐步添加新功能：

```jsx
// 第一版：基础功能
const basicExtensions = [Document, Paragraph, Text, History, Bold, Italic];

// 第二版：增加列表功能
const enhancedExtensions = [...basicExtensions, BulletList, OrderedList, ListItem];

// 第三版：增加多媒体支持
const richExtensions = [...enhancedExtensions, Image, Link];
```

理解了这种模式后，添加任何新功能都变得非常简单：**找到它、安装它、将它添加到 `extensions` 数组中**。

## 核心扩展分类详解

接下来，我们将从 Tiptap 官方的扩展库中精选几个最具代表性的例子，按功能分类进行深入讲解。

### 1. 交互式标记扩展（Interactive Marks）

这类扩展为内联文本添加交互能力，让用户可以对选中的文字进行特殊处理。

#### 核心代表：链接扩展（`@tiptap/extension-link`）

链接扩展不仅能将文本标记为可点击的链接，还具备自动识别 URL、链接预览等高级功能。

**安装方式：**
```bash
npm install @tiptap/extension-link
```

**基础配置：**
```jsx
import Link from '@tiptap/extension-link';

const editor = useEditor({
  extensions: [
    // ...其他扩展
    Link.configure({
      openOnClick: true,      // 点击时在新标签页中打开链接
      autolink: true,         // 自动将 URL 字符串转换为链接
      linkOnPaste: true,      // 粘贴时自动转换链接
      HTMLAttributes: {
        class: 'custom-link',  // 为链接添加自定义样式类
      },
    }),
  ],
});
```

**UI 集成实现：**
在实际项目中，你需要为用户提供添加和编辑链接的交互界面：

```jsx
import { useCallback } from 'react';

const MenuBar = ({ editor }) => {
  // 添加链接的处理函数
  const addLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('请输入链接地址：', previousUrl);

    // 用户取消操作
    if (url === null) return;
    
    // 用户输入空字符串，移除链接
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // 设置链接
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="menu-bar">
      <button 
        onClick={addLink} 
        className={editor.isActive('link') ? 'is-active' : ''}
        title="添加链接"
      >
        🔗 链接
      </button>
    </div>
  );
};
```

**高级功能扩展：**
```jsx
// 支持更多链接属性
Link.configure({
  protocols: ['http', 'https', 'mailto', 'tel'], // 支持的协议
  validate: href => /^https?:\/\//.test(href),    // 链接验证
  HTMLAttributes: {
    target: '_blank',        // 新窗口打开
    rel: 'noopener noreferrer', // 安全属性
  },
})
```

### 2. 富内容节点扩展（Rich Content Nodes）

这类扩展允许你在编辑器中插入更复杂的块级内容，如图片、视频、代码块等。

#### 核心代表一：图片扩展（`@tiptap/extension-image`）

图片扩展让编辑器支持插入和展示图片，是构建现代富文本编辑器的必备功能。

**安装方式：**
```bash
npm install @tiptap/extension-image
```

**基础使用：**
```jsx
import Image from '@tiptap/extension-image';

const editor = useEditor({
  extensions: [
    // ...其他扩展
    Image.configure({
      inline: true,           // 是否内联显示
      allowBase64: true,      // 是否允许 base64 图片
      HTMLAttributes: {
        class: 'custom-image',
      },
    }),
  ],
});
```

**完整的图片插入功能：**
```jsx
const MenuBar = ({ editor }) => {
  // 通过 URL 添加图片
  const addImage = useCallback(() => {
    const url = window.prompt('请输入图片地址：');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  // 通过文件上传添加图片
  const uploadImage = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editor.chain().focus().setImage({ src: e.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
  }, [editor]);

  return (
    <div className="menu-bar">
      <button onClick={addImage}>
        🖼️ 插入图片（URL）
      </button>
      <input 
        type="file" 
        accept="image/*" 
        onChange={uploadImage}
        style={{ display: 'none' }}
        id="image-upload"
      />
      <label htmlFor="image-upload" className="upload-button">
        📁 上传图片
      </label>
    </div>
  );
};
```

#### 核心代表二：语法高亮代码块（`@tiptap/extension-code-block-lowlight`）

这是一个展示 Tiptap 与第三方库深度集成能力的绝佳例子，使用 `lowlight` 库实现代码语法高亮。

**安装方式：**
```bash
npm install @tiptap/extension-code-block-lowlight lowlight
```

**完整配置：**
```jsx
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/core';

// 按需导入语言支持
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';

// 导入高亮主题样式
import 'highlight.js/styles/github-dark.css';

// 注册支持的编程语言
lowlight.registerLanguage('javascript', javascript);
lowlight.registerLanguage('typescript', typescript);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('python', python);

const editor = useEditor({
  extensions: [
    // ...其他扩展
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: 'javascript', // 默认语言
    }),
  ],
});
```

**UI 集成：**
```jsx
const MenuBar = ({ editor }) => {
  const addCodeBlock = useCallback(() => {
    editor.chain().focus().toggleCodeBlock().run();
  }, [editor]);

  const setLanguage = useCallback((language) => {
    editor.chain().focus().updateAttributes('codeBlock', { language }).run();
  }, [editor]);

  return (
    <div className="menu-bar">
      <button 
        onClick={addCodeBlock}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        💻 代码块
      </button>
      
      {editor.isActive('codeBlock') && (
        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="css">CSS</option>
          <option value="python">Python</option>
        </select>
      )}
    </div>
  );
};
```

### 3. 用户体验增强扩展（UX Enhancement Extensions）

这类扩展专注于改善用户的编辑体验，让编辑器更加易用和友好。

#### 核心代表：占位符扩展（`@tiptap/extension-placeholder`）

占位符扩展在编辑器内容为空时显示提示文字，为用户提供编辑指导。

**安装方式：**
```bash
npm install @tiptap/extension-placeholder
```

**基础配置：**
```jsx
import Placeholder from '@tiptap/extension-placeholder';

const editor = useEditor({
  extensions: [
    // ...其他扩展
    Placeholder.configure({
      placeholder: '开始编写你的内容...',
      showOnlyWhenEditable: true,  // 只在可编辑状态显示
      showOnlyCurrent: false,      // 在所有空行显示占位符
    }),
  ],
});
```

**样式定制：**
```css
/* 基础占位符样式 */
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #6b7280;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

/* 高级占位符样式 */
.tiptap .is-empty::before {
  content: attr(data-placeholder);
  color: #adb5bd;
  font-style: italic;
  pointer-events: none;
}

/* 不同节点类型的占位符 */
.tiptap h1.is-empty::before {
  content: '输入标题...';
}

.tiptap p.is-empty::before {
  content: '输入段落内容...';
}
```

**动态占位符：**
```jsx
// 根据光标位置显示不同占位符
Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === 'heading') {
      return '输入标题...';
    }
    if (node.type.name === 'paragraph') {
      return '在这里开始编写...';
    }
    return '开始输入内容...';
  },
});
```

### 4. 高级交互功能扩展（Advanced Interactive Features）

#### 核心代表：@提及扩展（`@tiptap/extension-mention`）

@提及功能是现代应用的标配，它基于 Tiptap 的 `suggestion` 工具实现，展示了如何构建复杂的交互功能。

**安装方式：**
```bash
npm install @tiptap/extension-mention
```

**建议系统实现：**
首先，我们需要创建一个建议系统：

```jsx
// suggestion.js
import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import MentionList from './MentionList';

export default {
  items: ({ query }) => {
    // 模拟用户数据库查询
    const users = [
      { id: 1, name: '张三', avatar: '/avatars/zhang.jpg', role: '前端工程师' },
      { id: 2, name: '李四', avatar: '/avatars/li.jpg', role: '后端工程师' },
      { id: 3, name: '王五', avatar: '/avatars/wang.jpg', role: '产品经理' },
      { id: 4, name: '赵六', avatar: '/avatars/zhao.jpg', role: 'UI设计师' },
    ];

    return users
      .filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  },

  render: () => {
    let component;
    let popup;

    return {
      onStart: (props) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide();
          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
```

**提及列表组件：**
```jsx
// MentionList.jsx
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

const MentionList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index) => {
    const item = props.items[index];
    if (item) {
      props.command({ id: item.id, label: item.name });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="mention-list">
      {props.items.length ? (
        props.items.map((item, index) => (
          <div
            className={`mention-item ${index === selectedIndex ? 'is-selected' : ''}`}
            key={item.id}
            onClick={() => selectItem(index)}
          >
            <img src={item.avatar} alt={item.name} className="avatar" />
            <div className="user-info">
              <div className="name">{item.name}</div>
              <div className="role">{item.role}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="mention-item">未找到用户</div>
      )}
    </div>
  );
});

export default MentionList;
```

**完整配置：**
```jsx
import Mention from '@tiptap/extension-mention';
import suggestion from './suggestion';

const editor = useEditor({
  extensions: [
    // ...其他扩展
    Mention.configure({
      HTMLAttributes: {
        class: 'mention',
      },
      suggestion,
    }),
  ],
});
```

**样式设计：**
```css
.mention {
  background-color: #e3f2fd;
  border-radius: 4px;
  padding: 2px 6px;
  color: #1976d2;
  text-decoration: none;
  cursor: pointer;
}

.mention:hover {
  background-color: #bbdefb;
}

.mention-list {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.mention-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.mention-item:hover,
.mention-item.is-selected {
  background-color: #f3f4f6;
}

.mention-item .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
}

.mention-item .user-info .name {
  font-weight: 500;
  color: #111827;
}

.mention-item .user-info .role {
  font-size: 12px;
  color: #6b7280;
}
```

## 扩展资源与社区

### 官方扩展库

Tiptap 官方提供了丰富的扩展库，涵盖各种功能需求：

**文本格式化类：**
- `@tiptap/extension-bold` - 粗体
- `@tiptap/extension-italic` - 斜体
- `@tiptap/extension-underline` - 下划线
- `@tiptap/extension-strike` - 删除线
- `@tiptap/extension-highlight` - 高亮

**布局结构类：**
- `@tiptap/extension-bullet-list` - 无序列表
- `@tiptap/extension-ordered-list` - 有序列表
- `@tiptap/extension-blockquote` - 引用块
- `@tiptap/extension-table` - 表格

**多媒体类：**
- `@tiptap/extension-image` - 图片
- `@tiptap/extension-youtube` - YouTube 视频
- `@tiptap/extension-link` - 链接

**交互功能类：**
- `@tiptap/extension-mention` - @提及
- `@tiptap/extension-task-list` - 任务列表
- `@tiptap/extension-collaboration` - 协作编辑

### 寻找扩展的最佳途径

1. **官方文档**：访问 [Tiptap Extensions 页面](https://tiptap.dev/docs/editor/extensions)
2. **GitHub 仓库**：查看 [tiptap 官方仓库](https://github.com/ueberdosis/tiptap)
3. **社区贡献**：npm 上搜索 `tiptap-extension-` 前缀的第三方扩展
4. **示例项目**：研究官方提供的示例代码

### 选择扩展的决策指南

在选择扩展时，建议考虑以下因素：

**功能匹配度：**
- 扩展是否完全满足你的需求？
- 是否有多余的功能会增加包体积？

**维护状态：**
- 扩展是否持续更新？
- 是否与最新版本的 Tiptap 兼容？

**社区支持：**
- 是否有活跃的社区讨论？
- 遇到问题时是否容易找到解决方案？

**性能影响：**
- 扩展会增加多少包体积？
- 是否会影响编辑器的性能？

## 实战练习：构建一个完整的富文本编辑器

让我们将本章学到的知识整合起来，构建一个功能丰富的编辑器：

```jsx
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

// 基础扩展
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import History from '@tiptap/extension-history';

// 格式化扩展
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';

// 富内容扩展
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

// UX 增强扩展
import Placeholder from '@tiptap/extension-placeholder';
import Mention from '@tiptap/extension-mention';

// 第三方库
import { lowlight } from 'lowlight/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

// 注册语言
lowlight.registerLanguage('javascript', javascript);

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      // 基础扩展
      Document,
      Paragraph,
      Text,
      History,
      
      // 格式化扩展
      Bold,
      Italic,
      Underline,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      
      // 富内容扩展
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
      Image,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      
      // UX 增强扩展
      Placeholder.configure({
        placeholder: '开始编写你的内容...',
      }),
    ],
    content: '<p>欢迎使用富文本编辑器！</p>',
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="rich-text-editor">
      <div className="menu-bar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          粗体
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          斜体
        </button>
        {/* 更多按钮... */}
      </div>
      
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};

export default RichTextEditor;
```

## 总结与展望

在本章中，我们深入探索了 Tiptap 模块化架构的强大威力：

### 核心收获

1. **掌握了按需引入的哲学**：学会了如何从 `StarterKit` 过渡到独立扩展配置
2. **学会了扩展分类管理**：理解了不同类型扩展的特点和应用场景
3. **实践了完整的集成流程**：从安装、配置到 UI 集成的完整开发流程
4. **培养了模块化思维**：建立了可扩展、可维护的编辑器架构思维

### 技术深度

- **交互式标记**：掌握了链接等内联功能的实现
- **富内容节点**：学会了图片、代码块等复杂内容的集成
- **用户体验增强**：了解了占位符等 UX 功能的价值
- **高级交互功能**：初步了解了 @提及等复杂功能的实现原理

### 架构思维

现在你已经具备了根据任何产品需求，灵活组合 Tiptap 功能的能力。你可以：

- 根据性能要求选择最小化的扩展集合
- 根据功能需求添加特定的扩展模块
- 根据用户体验目标配置最佳的交互方式

### 下章预告

但如果官方扩展仍然无法满足你的特殊需求呢？比如需要一个完全定制的内容类型，或者独特的编辑交互方式？

这正是我们下一章要探讨的主题。在**《Tiptap 深度教程（四）：终极定制 - 从零创建你的专属扩展》**中，我们将：

- 深入 Tiptap 扩展的底层原理
- 学习如何从零开始创建 Node 和 Mark 扩展
- 掌握扩展的高级配置和优化技巧
- 构建一个完全自定义的扩展案例

准备好进入 Tiptap 的"深水区"了吗？让我们继续这段精彩的技术之旅！
