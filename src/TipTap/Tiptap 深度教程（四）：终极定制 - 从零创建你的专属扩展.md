
## 引言

欢迎来到《Tiptap 深度教程》系列的第四篇，也是最具深度的一章。在前几篇教程中，我们探索了如何利用 Tiptap 强大的开箱即用功能和丰富的扩展生态来快速构建编辑器。然而，Tiptap 的真正威力并不仅限于此，它最核心的优势在于其近乎无限的可扩展性。当标准功能无法满足你独特的产品需求时，你需要的能力，是**创造**。

本篇教程将是一次深入 Tiptap 核心的旅程。我们将不再仅仅是 Tiptap 功能的"消费者"，而是成为其功能的"创造者"。我们将一起揭开 Tiptap 扩展系统背后的神秘面纱，赋予你从零开始构建任何可以想象到的编辑器功能的能力。

## 为什么需要自定义扩展？

在实际项目开发中，你可能会遇到这些场景，而官方扩展无法完全满足：

- **🎨 产品特色需求**：需要独特的"警告框"、"提示卡片"等品牌化组件，体现产品个性
- **💼 业务逻辑集成**：评论系统的 @提及、文档协作的批注功能、工单系统的状态标签
- **🏥 行业特殊需求**：法律文档的条款自动编号、医疗记录的结构化字段、教育平台的互动题目
- **⚡ 性能极致优化**：为特定场景定制轻量级扩展，移除不必要的功能，优化包体积
- **🔧 深度定制交互**：实现符合用户习惯的特殊编辑行为，如特定的快捷键、自动补全逻辑

当你遇到这些情况时，自定义扩展就是你的"超级武器"。

## 📋 本章学习目标

完成本章学习后，你将能够：

✅ **理解扩展本质**：深入掌握 Node、Mark、Extension 三种扩展类型的底层原理和使用场景
✅ **创建自定义 Node**：从零构建块级节点（如 Callout 提示框），掌握文档结构定制
✅ **创建自定义 Mark**：实现行内标记（如彩色高亮），掌握文本格式扩展
✅ **掌握高级 API**：灵活运用命令、输入规则、Storage 等高级能力
✅ **构建复杂扩展**：完成生产级 Mention 扩展的完整实现，整合所有知识点

## 学习路径

在这趟旅程中，我们将遵循一条从理论到实践，从基础到专家的学习路径：

- **🔍 探究底层原理**：深入剖析 Tiptap 与其底层引擎 ProseMirror 之间的关系，为你建立坚实的理论基础

- **✍️ 实践创造**：逐行代码，从无到有地创建自定义的 `Node`（节点）和 `Mark`（标记），亲手体验扩展开发的全过程

- **🚀 掌握高级 API**：学习如何通过命令（Commands）、输入规则（Input Rules）和状态管理（Storage）等高级 API，为扩展注入强大的交互能力

- **🏗️ 构建终极案例**：将所学知识融会贯通，构建一个生产级别的、完全交互式的 `@mention`（提及）扩展


准备好迎接挑战，开启你的 Tiptap 大师之路！

## 第一节：Tiptap 扩展的解剖学：超越基础

在动手编写代码之前，我们必须建立一个清晰且准确的心智模型。理解 Tiptap 扩展的本质、其与底层引擎 ProseMirror 的关系，以及不同类型扩展的职责划分，是进行高级定制的前提。

### ProseMirror 的连接：Tiptap 的引擎室

要真正理解 Tiptap，就必须认识到它是一个“无头（headless）”的编辑器框架，它本身并不提供用户界面，而是专注于编辑器逻辑。其强大的功能构建在一个名为 ProseMirror 的工具集之上。你可以将 ProseMirror 想象成一个高性能的汽车引擎，而 Tiptap 则是围绕这个引擎精心设计的底盘、传动系统和一套对开发者更友好的驾驶舱（API）。

Tiptap 巧妙地封装了 ProseMirror 的复杂性，提供了更易于理解和使用的 API。然而，当我们需要进行深度定制时，仅仅了解 Tiptap 的 API 是不够的。我们必须深入引擎室，理解 ProseMirror 的核心概念，例如：

- **Schema（模式）**：这是文档的“语法规则”，定义了哪些类型的内容（节点和标记）是合法的，以及它们之间如何嵌套。创建自定义
  
    `Node` 或 `Mark` 的本质，就是在修改这个 Schema。
    
- **State（状态）**：一个不可变的（immutable）对象，包含了编辑器的所有信息，包括文档内容、当前选区、激活的标记等。编辑器的每一次变更都会产生一个新的 State。
  
- **Plugins（插件）**：它们是 ProseMirror 的“事件监听器”和“行为干预器”，可以观察并响应编辑器的各种变化，实现如协同编辑、输入快捷方式等复杂功能 8。
  

Tiptap 的设计哲学可以看作是一种“渐进式披露”。对于常规需求，你只需使用 Tiptap 的高层 API。但当你需要极致的控制力时，Tiptap 会为你打开通往底层 ProseMirror 的大门。本教程也将遵循这一哲学，从 Tiptap 的便捷 API 开始，逐步深入到更强大的 ProseMirror 概念中。

### Node、Mark 和 Extension：职责明确的三驾马车

Tiptap 的一切皆为扩展，但根据其核心职责，我们可以将其分为三种基本类型 10。理解它们的区别至关重要，因为它决定了你在实现特定功能时应该选择哪种类型的扩展。

- **Nodes（节点）**：它们是构成文档结构的“积木” 11。想象一下，一篇文章由标题、段落、图片、代码块等组成，这些都是节点。节点可以是块级元素（
  
    `block`），如段落（`Paragraph`）；也可以是行内元素（`inline`），如表情符号（`Emoji`）或图片（`Image`）12。它们是文档内容的承载者。
    
- **Marks（标记）**：它们用于为节点内的文本添加“行内样式”或“元数据”，而不会改变文档的结构 14。例如，将一段文字加粗（
  
    `Bold`）、设置为斜体（`Italic`）或添加超链接（`Link`），这些都是通过 Mark 实现的 13。Mark 就像是给文字涂上的高光，它依附于文字，但文字本身依然在段落（Node）中。
    
- **Generic Extensions（通用扩展）**：这类扩展不直接向文档的 Schema 中添加新的内容类型。它们的职责是增强编辑器的功能或行为 10。例如，
  
    `TextAlign` 扩展通过添加命令和属性来控制文本对齐，但它并没有创造一个新的“居中段落”节点 10。其他例子还包括监听编辑器更新事件（
    
    `onUpdate`）、添加全局键盘快捷键或集成复杂的 ProseMirror 插件。
    

为了更清晰地理解这三者的区别，下表提供了一个快速参考：

|类型 (Type)|主要目的 (Primary Purpose)|对 Schema 的影响 (Impact on Schema)|常见示例 (Common Examples)|
|---|---|---|---|
|`Node`|定义文档的结构性内容块。|**修改 Schema**，添加新的内容类型。|`Paragraph`, `Heading`, `Image`, `CodeBlock`|
|`Mark`|为文本添加行内格式或元数据。|**修改 Schema**，添加新的格式类型。|`Bold`, `Italic`, `Link`, `Highlight`|
|`Extension`|增强编辑器功能、行为和交互。|**不修改 Schema**。|`History` (undo/redo), `Placeholder`, `CharacterCount`|

这个表格清晰地揭示了一个核心原则：**Schema 为王**。当你需要定义一种新的内容类型时，你必须选择 `Node` 或 `Mark`。当你只需要添加行为逻辑时，`Extension` 则是正确的选择。这个看似简单的区分，是构建健壮、可维护的自定义扩展的基石。

### 扩展 API：核心 Schema 定义

无论是创建哪种类型的扩展，我们都将从 Tiptap 提供的 `create` 方法开始，例如 `Node.create({})` 或 `Mark.create({})` 。在这个核心对象中，有几个属性是定义 Schema 的关键：

- **`name`**: 扩展的唯一标识符，必须是字符串。这个名字至关重要，后续的命令调用、状态存储访问都将依赖它 11。
  
- **`group`**: 定义了该节点所属的类别，例如 `'block'` 或 `'inline'` 8。这个属性直接影响到 ProseMirror 的内容表达式如何解析该节点，决定了它能出现在文档的什么位置 6。
  
- **`content`**: 仅用于 `Node` 类型，这是一个“内容表达式”字符串，定义了该节点可以包含哪些子节点。例如，`'inline*'` 表示可以包含零个或多个行内节点，而 `'paragraph+'` 表示必须包含至少一个段落节点 5。这是 ProseMirror Schema 规则的直接体现，也是保证文档结构合法性的关键 19。
  
- **`parseHTML`**: 定义了如何将一段 HTML 代码解析成当前扩展所代表的节点或标记。当用户粘贴内容或从数据库加载 HTML 时，这个函数会被调用，它就像是“输入转换器” 。
  
- **`renderHTML`**: 定义了如何将编辑器内部状态中的节点或标记渲染成 HTML。当你需要保存文档内容或在只读模式下显示时，这个函数会被调用，它就像是“输出转换器” 。

掌握了这些基础概念，我们就拥有了与 Tiptap 核心对话的语言。接下来，我们将通过亲手实践，将这些理论知识转化为具体的、功能强大的自定义扩展。

## 第二节：从零到 Node：构建一个自定义“Callout”块

理论知识是基础，但真正的掌握源于实践。在本章中，我们将一步步地创建一个功能完整的自定义块级 `Node`——一个“Callout”组件。这种组件在文档中非常常见，用于高亮显示提示、警告或重要信息。通过这个例子，我们将把上一章的概念付诸实践。

### 步骤一：搭建 Node 的骨架

万丈高楼平地起。我们首先要用 `Node.create` 方法定义 Callout 节点的基本结构 10。创建一个新文件

`Callout.js`：

```javascript
import { Node, mergeAttributes } from '@tiptap/core';

export const Callout = Node.create({
  name: 'callout', // 1. 唯一名称
  
  group: 'block', // 2. 属于块级节点组

  content: 'paragraph+', // 3. 内容必须是至少一个段落

  defining: true, // 4. 这是一个定义边界的节点

  //... 更多配置将在这里添加
});
```

让我们来解析这段骨架代码：

1. **`name: 'callout'`**: 为我们的节点提供一个全局唯一的名称 11。
   
2. **`group: 'block'`**: 声明这是一个块级元素，它会独占一行，不能和普通文本混排 11。
   
3. **`content: 'paragraph+'`**: 这是对节点内容最核心的约束。它规定了 Callout 内部必须包含一个或多个段落（`paragraph`）节点 6。这确保了 Callout 内部内容的结构规范，避免了直接在其中放置裸露文本或其他不合规的块级节点。
   
4. **`defining: true`**: 这是一个非常重要的属性。它告诉编辑器，这个节点是一个独立的“定义单元”。这意味着用户的光标无法部分选中 Callout 的内容和外部内容，也无法轻易地通过按回车或删除键将其与其他节点合并或拆分。这对于保持 Callout 结构的完整性至关重要。
   

### 步骤二：序列化（HTML 与编辑器状态的桥梁）

现在我们有了节点的内部定义，但 Tiptap 还不知道如何将它显示为 HTML，也不知道如何从 HTML 中识别它。这就是 `renderHTML` 和 `parseHTML` 的工作。

#### 2.1 最简单的渲染实现

让我们从最基础的版本开始：

```javascript
// 在 Callout.js 的 Node.create({}) 内部添加

renderHTML() {
  // 最简版本：只渲染一个 div 标签
  // 0 表示子内容的插入位置
  return ['div', {}, 0];
},
```

#### 2.2 添加类型标识

为了让 HTML 更具语义化，我们添加一个 `data-type` 属性来标识这是 Callout 节点：

```javascript
renderHTML() {
  // 添加 data-type 属性标识节点类型
  return ['div', { 'data-type': 'callout' }, 0];
},
```

#### 2.3 完整版本：合并属性

最终版本需要能够接收并合并动态属性（后面会用到）：

```javascript
renderHTML({ HTMLAttributes }) {
  // 使用 mergeAttributes 合并默认属性和传入的属性
  return [
    'div',
    mergeAttributes(HTMLAttributes, { 'data-type': 'callout' }),
    0  // 子内容渲染位置
  ];
},
```

> 💡 **渲染数组格式说明**：
> - 第一个元素：HTML 标签名（`'div'`）
> - 第二个元素：标签属性对象
> - 第三个元素：`0` 是特殊占位符，表示子内容应该被渲染到这里

#### 2.4 配置解析规则

现在添加相反的逻辑——如何从 HTML 识别 Callout 节点：

```javascript
parseHTML() {
  return [
    {
      tag: 'div[data-type="callout"]', // 匹配带有特定属性的 div 标签
    },
  ];
},
```

**工作原理**：
- ✅ `renderHTML`：编辑器状态 → HTML（用于保存和显示）
- ✅ `parseHTML`：HTML → 编辑器状态（用于加载和粘贴）


### 步骤三：添加动态属性

一个静态的 Callout 不够灵活。我们希望能够创建不同类型的 Callout，比如“提示（info）”、“警告（warning）”和“危险（danger）”，并通过 CSS 为它们应用不同的样式。这需要用到属性（Attributes）。

添加属性是一个闭环操作，需要三步：定义、渲染和解析。这体现了属性数据的双向流动性：从编辑器状态到 HTML，再从 HTML 回到编辑器状态。遗漏任何一环都会导致数据在保存或加载时丢失。

1. **定义属性**：使用 `addAttributes` 方法。

    ```javascript
    // 在 Node.create({}) 内部添加
    
    addAttributes() {
      return {
        calloutType: {
          default: 'info', // 默认类型是 'info'
        },
      };
    },
    ```
    
    这里我们定义了一个名为 `calloutType` 的属性，并为其设置了默认值 `'info'` 5。
    
2. **渲染属性**：修改 `renderHTML`，将属性值写入 DOM。

    ```javascript
    // 修改 renderHTML 方法
    
    renderHTML({ HTMLAttributes }) {
      // HTMLAttributes 中会自动包含 calloutType
      return [
        'div',
        mergeAttributes(HTMLAttributes, { 'data-type': 'callout' }),
        0
      ];
    },
    ```
    
    Tiptap 会自动将 `addAttributes` 中定义的属性（如 `calloutType`）映射到 `HTMLAttributes` 对象中，并以 `data-` 前缀的形式渲染到 HTML 标签上。最终生成的 HTML 会是 `<div data-type="callout" data-callout-type="info">...</div>`。
    
3. **解析属性**：修改 `parseHTML`，从 DOM 中读取属性值。

    ```javascript
    // 修改 parseHTML 方法
    
    parseHTML() {
      return [
        {
          tag: 'div[data-type="callout"]',
          getAttrs: (element) => ({
            calloutType: element.getAttribute('data-callout-type'),
          }),
        },
      ];
    },
    ```
    
    我们在解析规则中添加了 `getAttrs` 函数。当匹配到 `div` 标签时，此函数会执行，读取 `data-callout-type` 属性的值，并将其赋值给我们节点状态中的 `calloutType` 属性。
    

现在，我们的 Callout 节点已经具备了动态样式的能力。你可以通过 CSS 选择器 `div[data-callout-type="warning"]` 来为其定义独特的样式。

### 步骤四：创建命令

如果用户只能通过手动编写 HTML 来创建 Callout，那体验就太糟糕了。我们需要提供编程式的接口——命令（Commands），以便通过按钮或其他 UI 元素来操作 Callout 扩展。

```javascript
// 在 Node.create({}) 内部添加
// 别忘了在文件顶部引入 declare module '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      /**
       * 设置或切换 Callout 块
       */
      toggleCallout: (attributes: { calloutType: string }) => ReturnType,
    }
  }
}

//...

addCommands() {
  return {
    toggleCallout: (attributes) => ({ commands }) => {
      // 使用 toggleBlock 来在段落和 Callout 之间切换
      return commands.toggleBlock(this.name, 'paragraph', attributes);
    },
  };
},
```

我们使用 `addCommands` 方法来定义命令。这里我们创建了一个 `toggleCallout` 命令。我们巧妙地利用了 Tiptap 内置的 `toggleBlock` 命令，它可以智能地在两种块类型之间切换。如果当前选区是段落，它会将其转换为 `callout`；如果已经是 `callout`，则会将其转换回段落。我们还通过 `attributes` 参数，允许在创建 Callout 时动态指定其类型。

通过 TypeScript 的 `declare module`，我们将自定义命令注入到了 Tiptap 的全局命令接口中，这能为我们带来极佳的类型提示和自动补全体验。

### 步骤五：集成到编辑器与样式定制

#### 5.1 集成扩展

最后一步，将我们精心打造的 `Callout` 扩展集成到 Tiptap 编辑器实例中：

```javascript
// 在你的编辑器配置文件中
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Callout } from './Callout.js'; // 引入我们的扩展

const editor = new Editor({
  extensions: [
    StarterKit,
    Callout,  // 添加 Callout 扩展
  ],
  //... 其他配置
});
```

#### 5.2 完整的 CSS 样式

现在让我们为 Callout 添加美观且实用的样式，实现不同类型的视觉效果：

```css
/* Callout 基础样式 */
.tiptap div[data-type="callout"] {
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  border-left: 4px solid;
  background-color: #f8fafc;
  transition: all 0.2s ease;
}

/* Info 类型 - 蓝色主题 */
.tiptap div[data-callout-type="info"] {
  background-color: #eff6ff;
  border-left-color: #3b82f6;
}

.tiptap div[data-callout-type="info"]::before {
  content: 'ℹ️ 提示';
  display: block;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

/* Warning 类型 - 黄色主题 */
.tiptap div[data-callout-type="warning"] {
  background-color: #fefce8;
  border-left-color: #eab308;
}

.tiptap div[data-callout-type="warning"]::before {
  content: '⚠️ 警告';
  display: block;
  font-weight: 600;
  color: #a16207;
  margin-bottom: 0.5rem;
}

/* Danger 类型 - 红色主题 */
.tiptap div[data-callout-type="danger"] {
  background-color: #fef2f2;
  border-left-color: #ef4444;
}

.tiptap div[data-callout-type="danger"]::before {
  content: '🚨 危险';
  display: block;
  font-weight: 600;
  color: #b91c1c;
  margin-bottom: 0.5rem;
}

/* Success 类型 - 绿色主题 */
.tiptap div[data-callout-type="success"] {
  background-color: #f0fdf4;
  border-left-color: #22c55e;
}

.tiptap div[data-callout-type="success"]::before {
  content: '✅ 成功';
  display: block;
  font-weight: 600;
  color: #15803d;
  margin-bottom: 0.5rem;
}

/* Callout 内部段落样式 */
.tiptap div[data-type="callout"] p {
  margin: 0;
  line-height: 1.6;
}

.tiptap div[data-type="callout"] p + p {
  margin-top: 0.5rem;
}
```

#### 5.3 使用示例

现在，你就可以在编辑器 UI 中添加一个按钮，点击时调用命令：

```jsx
// 在你的工具栏组件中
<button
  onClick={() => editor.commands.toggleCallout({ calloutType: 'warning' })}
  className={editor.isActive('callout', { calloutType: 'warning' }) ? 'is-active' : ''}
>
  ⚠️ 警告框
</button>

<button
  onClick={() => editor.commands.toggleCallout({ calloutType: 'info' })}
  className={editor.isActive('callout', { calloutType: 'info' }) ? 'is-active' : ''}
>
  ℹ️ 提示框
</button>
```

#### 5.4 功能验证清单

测试你的 Callout 扩展是否完整实现：

✅ 通过命令创建 Callout 块
✅ 切换不同的 calloutType（info、warning、danger、success）
✅ 验证属性正确序列化到 HTML
✅ 从 HTML 粘贴能正确解析为 Callout
✅ CSS 样式正确应用到不同类型
✅ 在 Callout 内部可以正常编辑段落内容

> 🎉 **恭喜！** 你已经成功创建了第一个功能完整、样式精美的自定义节点扩展！


## 第三节：从零到 Mark：打造一个带颜色的自定义“高亮”

掌握了 `Node` 的创建之后，`Mark` 的创建就变得轻车熟路了。`Mark` 用于实现行内格式，如加粗、链接等。在本章中，我们将创建一个比 Tiptap 内置高亮更强大的版本：一个可以自定义高亮颜色的 `coloredHighlight` 标记。这个过程将巩固我们对属性和命令的理解，并引入新的概念，如键盘快捷键。

### 步骤一：搭建 Mark 的骨架

与 `Node` 类似，我们使用 `Mark.create` 方法开始 10。创建一个新文件

`ColoredHighlight.js`。

```javascript
import { Mark, mergeAttributes } from '@tiptap/core';

export const ColoredHighlight = Mark.create({
  name: 'coloredHighlight', // 1. 唯一名称

  spanning: false, // 2. 默认情况下，标记不能跨越块级节点

  //... 更多配置
});
```

1. **`name: 'coloredHighlight'`**: 同样，一个唯一的名称是必不可少的。
   
2. **`spanning: false`**: 这个属性默认为 `false`，意味着标记不能跨越不同的块级节点。例如，如果用户选中了两个段落的部分文本，应用此标记后，它会分别在两个段落内生效，而不会形成一个单一的、跨越段落边界的标记。在大多数情况下，这是我们期望的行为 15。
   

### 步骤二：序列化与属性

我们的核心需求是能够自定义颜色。这自然需要一个 `color` 属性。与 `Node` 一样，我们需要完成定义、渲染、解析三部曲。

#### 2.1 配置选项（Options）

首先，我们需要为扩展添加配置选项，定义默认颜色：

```javascript
// 在 Mark.create({}) 内部添加

addOptions() {
  return {
    color: '#FFFF00',  // 默认颜色为黄色
  }
},
```

> 💡 **Options vs Attributes**：
> - **Options**：扩展级别的配置，在扩展实例化时设置，影响所有该扩展的实例
> - **Attributes**：节点级别的数据，每个节点实例可以有不同的值

#### 2.2 定义属性

```javascript
addAttributes() {
  return {
    color: {
      default: this.options.color,  // 使用 options 中的默认颜色
      parseHTML: element => element.style.backgroundColor || '',
      renderHTML: attributes => {
        if (!attributes.color) {
          return {};
        }
        return {
          style: `background-color: ${attributes.color}`,
        };
      },
    },
  };
},
```

#### 2.3 配置序列化

```javascript
parseHTML() {
  return [
    {
      tag: 'mark',  // 匹配 <mark> 标签
      getAttrs: (element) => {
        // 从 style 属性中解析背景颜色
        const color = element.style.backgroundColor;
        return color ? { color } : {};
      },
    },
  ];
},

renderHTML({ HTMLAttributes }) {
  // mergeAttributes 会自动处理 color 属性转为 style
  return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
},
```

**工作原理解析**：
- ✅ **`addOptions`**：定义扩展级别的默认配置
- ✅ **`addAttributes`**：定义节点级别的动态数据，引用 options
- ✅ **`parseHTML`**：从 HTML 的 style 提取背景色
- ✅ **`renderHTML`**：将 color 属性渲染为内联 style

### 步骤三：创建一套完整的命令

一个优秀的扩展应该提供一个完整、可预测的编程接口（API），方便 UI 调用。这不仅仅是"让按钮工作"，而是精心设计扩展的外部交互方式。对于高亮标记，我们需要设置、切换和取消三种操作 14。

```javascript
// 在 ColoredHighlight.js 中

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    coloredHighlight: {
      /**
       * 设置高亮并指定颜色
       */
      setHighlight: (attributes: { color: string }) => ReturnType,
      /**
       * 切换高亮状态
       */
      toggleHighlight: (attributes: { color: string }) => ReturnType,
      /**
       * 取消高亮
       */
      unsetHighlight: () => ReturnType,
    }
  }
}

// 在 Mark.create({}) 内部添加
addCommands() {
  return {
    setHighlight: (attributes) => ({ commands }) => {
      return commands.setMark(this.name, attributes);
    },
    toggleHighlight: (attributes) => ({ commands }) => {
      return commands.toggleMark(this.name, attributes);
    },
    unsetHighlight: () => ({ commands }) => {
      return commands.unsetMark(this.name);
    },
  };
},
```

我们再次使用了 Tiptap 内置的命令助手：`setMark`、`toggleMark` 和 `unsetMark`。它们极大地简化了逻辑。通过提供这一整套命令，我们让 UI 层的开发变得异常简单：

- 颜色选择器可以选择一个颜色，然后调用 `editor.commands.setHighlight({ color: '#FFC0CB' })`。
  
- 一个开关按钮可以调用 `editor.commands.toggleHighlight({ color: '#FFFF00' })`。
  
- 一个“清除格式”按钮可以调用 `editor.commands.unsetHighlight()`。
  

通过 `declare module` 再次扩展 TypeScript 接口，我们确保了这套 API 是完全类型安全且具备自动补全的，极大地提升了开发体验 20。

### 步骤四：添加键盘快捷键

为了提升效率，我们可以为最常用的命令绑定键盘快捷键。`addKeyboardShortcuts` 方法让这一切变得简单。

```javascript
// 在 Mark.create({}) 内部添加

addKeyboardShortcuts() {
  return {
    'Mod-Shift-H': () => this.editor.commands.toggleHighlight({ color: this.options.color }),
  };
},
```

这段代码将 `Cmd+Shift+H` (在 Mac 上) 或 `Ctrl+Shift+H` (在 Windows 上) 绑定到了 `toggleHighlight` 命令上 14。当用户按下快捷键时，它会使用我们在

`addAttributes` 中定义的默认颜色来切换高亮。

至此，我们的 `coloredHighlight` 扩展已经完成。它不仅能实现基本的文本高亮，还能自定义颜色，提供了一套完整的命令 API，并支持键盘快捷键。通过这个例子，我们进一步巩固了对 Tiptap 扩展核心概念的理解，并为进入更高级的主题做好了准备。

## 第四节：高级能力 - 让你的扩展活起来

我们已经掌握了如何定义扩展的“骨骼”（Schema）和“肌肉”（Commands）。现在，是时候为它们注入“神经系统”了。本章将探索 Tiptap 提供的高级 API，它们能让你的扩展具备动态行为、状态管理和智能自动化能力，从而极大地提升用户体验。

### 使用输入和粘贴规则实现自动化

`addInputRules` 和 `addPasteRules` 是两个极为强大的 UX 增强工具。它们允许扩展监听用户的输入和粘贴行为，并根据预设的模式自动触发相应的操作，例如实现流行的 Markdown 快捷语法。

- **`addInputRules`：实时输入转换**

    输入规则会在用户键入时实时匹配文本模式。我们将为第二章创建的 `Callout` 节点添加一个输入规则：当用户在新的一行输入 `>>` (大于号加空格) 时，自动将该段落转换为一个 Callout 块。

    ```javascript
    // 在 Callout.js 的 Node.create({}) 内部添加
    import { nodeInputRule } from '@tiptap/core';
    
    //...
    addInputRules() {
      return [
        nodeInputRule({
          find: /^>>\s$/,
          type: this.type,
        }),
      ];
    },
    ```
    
    我们使用了 Tiptap 提供的 `nodeInputRule` 帮助函数。它接收一个配置对象，
    
    `find` 属性是一个正则表达式，用于匹配触发模式；`type` 属性则指定了匹配成功后要创建的节点类型，`this.type` 在这里就指向 `Callout` 节点本身。现在，用户无需点击任何按钮，只需输入简单的快捷符，就能创建 Callout，效率大增。
    
- **`addPasteRules`：智能粘贴处理**

    粘贴规则与输入规则类似，但它作用于用户粘贴内容时。我们将为第三章的 `coloredHighlight` 标记添加一个粘贴规则：当用户粘贴形如 `==被高亮的文本==` 的内容时，自动为其应用高亮标记。

    ```javascript
    // 在 ColoredHighlight.js 的 Mark.create({}) 内部添加
    import { markPasteRule } from '@tiptap/core';
    
    //...
    addPasteRules() {
      return [
        markPasteRule({
          find: /==(.*?)==/g,
          type: this.type,
        }),
      ];
    },
    ```
    
    这里我们使用了 `markPasteRule` 帮助函数 22。
    
    `find` 正则表达式中的 `g` (global) 标志至关重要，它确保了如果粘贴的内容中有多处匹配，规则会对每一处都生效 22。这个小小的功能，使得从其他支持类似 Markdown 语法的应用（如 Obsidian, Notion）中复制内容到我们的编辑器时，格式能够被无缝保留。
    

### 使用 `addStorage` 管理内部状态

在开发复杂扩展时，我们经常需要存储一些数据。Tiptap 提供了两种状态存储机制：`addAttributes` 和 `addStorage`。理解它们的区别是设计高级扩展的关键。

这是一个关于状态二元性的核心概念：**文档状态 vs. 运行时状态**。

- **`addAttributes`** 用于存储 **文档状态**。这些数据是文档内容的一部分，需要被序列化（保存到 HTML 或 JSON），并在加载时恢复。例如，一个链接的 `href` 地址，或者我们 Callout 的 `calloutType`。这些数据必须是可序列化为 JSON 的简单值。
  
- **`addStorage`** 用于存储 **运行时状态**。这些数据只存在于当前编辑器实例的生命周期中，不会被保存到文档内容里 17。它可以是任何类型的数据，比如一个函数的引用、一个复杂的对象、一个计时器 ID，或者用于分析的计数器。
  

让我们创建一个简单的扩展来演示 `addStorage` 的用法。这个扩展将统计编辑器内容被更新了多少次。

```javascript
import { Extension } from '@tiptap/core';

// 为存储添加 TypeScript 类型，增强代码健壮性
declare module '@tiptap/core' {
  interface ExtensionStorage {
    updateCounter: {
      count: number,
    }
  }
}

export const UpdateCounter = Extension.create({
  name: 'updateCounter',

  addStorage() {
    return {
      count: 0, // 初始化存储
    };
  },

  onUpdate() {
    this.storage.count += 1; // 在每次更新时修改存储
    console.log('Editor updated', this.storage.count, 'times.');
  },
});
```

在这个例子中：

1. 我们使用 `addStorage` 返回一个对象，作为这个扩展的初始状态 18。
   
2. 在 `onUpdate` 生命周期钩子中，我们通过 `this.storage` 访问并修改这个状态 18。
   
3. 这个 `count` 值是临时的，刷新页面后就会重置。
   

我们也可以从扩展外部访问这个存储，只需通过 `editor.storage.extensionName` 18：

```javascript
const count = editor.storage.updateCounter.count;
```

通过 `declare module` 为存储定义类型，可以让我们在访问 `editor.storage.updateCounter` 时获得完整的 TypeScript 类型支持，避免拼写错误和类型滥用 20。

### 扩展的生命周期与副作用

Tiptap 扩展拥有一套丰富的生命周期钩子（Lifecycle Hooks），允许我们在编辑器的关键时刻执行代码，处理副作用。

常用的钩子包括：

- `onCreate`: 编辑器实例创建并准备就绪时触发。
  
- `onUpdate`: 编辑器内容发生变化时触发。
  
- `onSelectionUpdate`: 编辑器选区变化时触发。
  
- `onTransaction`: 每一次状态变更（Transaction）发生时触发。这是最底层的变化监听。
  
- `onFocus` / `onBlur`: 编辑器获得或失去焦点时触发。
  
- `onDestroy`: 编辑器实例被销毁前触发，适合用于清理工作。
  

重要陷阱：生命周期钩子中的无限循环

一个常见的错误是在 onUpdate 或 onTransaction 钩子中直接调用 editor.commands 来修改编辑器状态。这会导致一个新的更新事件，从而再次触发钩子，形成一个无限循环，最终导致浏览器崩溃 8。

**错误的做法**：

```javascript
onUpdate({ editor }) {
  // 危险！这会造成无限循环！
  editor.commands.setNode('paragraph');
}
```

正确的做法：在事务（Transaction）层面思考

这些钩子通常会提供一个 transaction 对象（简写为 tr）。如果你确实需要在这些钩子中修改状态，你应该直接操作这个 tr 对象，而不是派发一个新的命令。ProseMirror 会将这些修改合并到当前的事务中，从而避免了循环。

```javascript
onTransaction({ transaction }) {
  if (someCondition) {
    // 安全的做法：直接修改当前事务
    transaction.setNodeMarkup(...);
  }
}
```

虽然直接操作 `tr` 属于更高级的 ProseMirror API，但理解这个原则至关重要：**生命周期钩子是用于“响应”变化的，而不是“创造”新的变化**。

为了帮助你快速查阅这些高级 API，下表总结了它们的核心用途：

|方法 (Method)|目的 (Purpose)|用例 (Use Case Example)|
|---|---|---|
|`addCommands`|定义扩展的编程接口，供 UI 或其他逻辑调用。|`toggleHighlight()` 命令用于切换高亮。|
|`addKeyboardShortcuts`|绑定键盘快捷键到特定命令。|`Mod-B` 绑定到 `toggleBold()` 命令。|
|`addInputRules`|根据用户输入实时转换文本（Markdown 语法）。|输入 `*` 自动创建无序列表。|
|`addPasteRules`|根据粘贴的内容自动转换文本。|粘贴 `(url)` 自动创建链接。|
|`addStorage`|管理扩展的、非持久化的、运行时的内部状态。|存储一个 debounce 函数或用于分析的计数器。|
|`addNodeView`|(高级) 使用框架组件（如 React/Vue）完全自定义节点的渲染和交互。|创建一个带可编辑标题和交互按钮的视频嵌入节点。|
|`addProseMirrorPlugins`|(最高级) 注入底层的 ProseMirror 插件，以获得对编辑器行为的完全控制。|实现提及（Mention）功能的建议弹出框。|

掌握了这些“超能力”，你就拥有了构建几乎任何复杂交互的工具。它们是 Tiptap 便捷 API 和底层 ProseMirror 强大功能之间的桥梁。在下一章，我们将把所有这些能力集于一身，挑战一个终极案例。

## 第五节：终极案例研究：构建一个交互式提及（Mention）扩展

现在，我们将踏上本次教程的顶峰。我们将综合运用前面所有章节学到的知识——`Node` 定义、属性、命令、`Node View` 和 `ProseMirror` 插件——来构建一个功能完整、高度交互、生产级别的 `@mention`（提及或标签）扩展。

这个案例之所以是“终极”，因为它完美地展示了构建复杂 Tiptap 扩展所需的三位一体架构：

1. **数据模型 (`Node`)**：定义“提及”在文档中如何存储。
   
2. **视图渲染 (`Node View`)**：定义“提及”在编辑器中如何显示为一个漂亮的、不可编辑的“胶囊”UI。
   
3. **交互逻辑 (`ProseMirror Plugin`)**：定义当用户输入 `@` 时，如何触发、显示和处理建议列表的弹出框。
   

### 步骤一：架构设计

在动手之前，我们先规划好架构。我们的 `Mention` 扩展将由以下几个部分组成：

1. **`Mention.js`**: 这是扩展的主文件，它将：
   
    - 使用 `Node.create` 定义 `mention` 节点的数据结构。
      
    - 使用 `addNodeView` 将节点的渲染委托给一个 React (或 Vue) 组件。
      
    - 使用 `addProseMirrorPlugins` 注入一个自定义插件来处理建议弹出框的逻辑。
    
2. **`MentionComponent.jsx`**: 一个 React 组件，负责渲染“提及胶囊”的 UI。
   
3. **`suggestion.js`**: 一个辅助文件，包含创建和管理建议弹出框（我们将使用([https://atomiks.github.io/tippyjs/](https://atomiks.github.io/tippyjs/)) 库）的 ProseMirror 插件逻辑。
   

### 步骤二：构建 `Mention` 节点（数据模型）

首先，我们来定义 `mention` 节点本身。它是一个行内（`inline`）节点，用于在文本流中表示一个提及。

```javascript
// Mention.js
import { Node, mergeAttributes } from '@tiptap/core';

export const Mention = Node.create({
  name: 'mention',
  group: 'inline',
  inline: true,
  selectable: false,
  atom: true, // 关键！

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('data-id'),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {};
          }
          return { 'data-id': attributes.id };
        },
      },
      label: {
        default: null,
        parseHTML: element => element.getAttribute('data-label'),
        renderHTML: attributes => {
          if (!attributes.label) {
            return {};
          }
          return { 'data-label': attributes.label };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-type="mention"]' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes({ 'data-type': 'mention' }, HTMLAttributes),
      `@${node.attrs.label}`
    ];
  },

  //... addNodeView 和 addProseMirrorPlugins 将在这里添加
});
```

这里的关键是 `atom: true`。这个属性告诉 ProseMirror，这个节点是一个不可分割的“原子”单元。用户不能将光标移动到它的内部，也不能编辑它的内容。ProseMirror 会将整个节点的管理权完全交给我们的 `Node View` 5。

`addAttributes` 定义了我们需要存储的数据：被提及用户的唯一 `id` 和显示的 `label`。`renderHTML` 提供了一个简单的后备方案，用于在不支持 JavaScript 的环境中（如发送邮件）也能正确显示提及内容。

### 步骤三：使用 `addNodeView` 进行自定义渲染（视图渲染）

现在，我们要用一个交互式的 React 组件来取代 `renderHTML` 的静态渲染。这就是 `addNodeView` 的用武之地 5。

```javascript
// 在 Mention.js 的 Node.create({}) 内部添加
import { ReactNodeViewRenderer } from '@tiptap/react';
import MentionComponent from './MentionComponent.jsx';

//...
addNodeView() {
  return ReactNodeViewRenderer(MentionComponent);
},
```

`addNodeView` 返回一个 `ReactNodeViewRenderer`（或 `VueNodeViewRenderer`），它将我们的 `MentionComponent` 组件与 `mention` 节点绑定起来 5。

现在，我们来创建 `MentionComponent.jsx`：

```javascript
// MentionComponent.jsx
import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';

export default (props) => {
  return (
    <NodeViewWrapper as="span" className="mention">
      @{props.node.attrs.label}
    </NodeViewWrapper>
  );
};
```

这个组件非常简单。它使用了 Tiptap 提供的 `NodeViewWrapper`，它会渲染一个容器元素（我们指定为 `<span>`），并处理好所有 ProseMirror 需要的 DOM 属性和事件 5。组件通过

`props.node.attrs` 可以访问到我们在 `addAttributes` 中定义的 `id` 和 `label`，从而渲染出我们想要的“胶囊”UI。你可以随意为 `.mention` 类添加 CSS 样式。

### 步骤四：使用 `addProseMirrorPlugins` 实现建议引擎（交互逻辑）

这是最核心、最复杂的部分。当用户输入 `@` 时，我们需要一个弹出框来显示用户列表。Tiptap 的标准 API 无法直接实现这种复杂的、与 UI 紧密耦合的交互，因此我们必须深入底层，编写一个 ProseMirror 插件 8。

这是一个高度简化的实现思路，完整的代码会更长，但核心逻辑如下：

```javascript
// suggestion.js (这是一个简化的逻辑概览)
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import tippy from 'tippy.js';

export const suggestionPlugin = (options) => {
  return new Plugin({
    key: new PluginKey('mention_suggestion'),

    state: {
      init: () => ({ active: false, range: {}, query: '' }),
      apply: (tr, value) => {
        //... 在每次事务中，检查光标前的文本是否匹配触发符，如 /@(\w*)$/
        // 如果匹配，更新插件状态，记录 active=true, range 和 query
        // 如果不匹配，重置状态
        return newValue;
      },
    },

    view: (editorView) => {
      let popup;

      return {
        update: (view, prevState) => {
          const currentState = this.key.getState(view.state);
          const previousState = this.key.getState(prevState);

          // 如果状态从 inactive 变为 active，创建并显示 tippy 弹出框
          if (currentState.active &&!previousState.active) {
            // popup = tippy('body', {...配置... });
            // 在弹出框中渲染用户列表，列表数据可以根据 currentState.query 过滤
          }

          // 如果状态从 active 变为 inactive，销毁弹出框
          if (!currentState.active && previousState.active) {
            // popup.destroy();
          }
        },
        destroy: () => {
          // popup?.destroy();
        },
      };
    },
  });
};
```

这个插件的核心工作流程是：

1. **`state.apply`**: 在每次编辑器状态更新时，检查光标前的文本。如果匹配 `@` 触发符，就更新插件自己的内部状态，记录下触发的位置（`range`）和查询词（`query`）。
   
2. **`view.update`**: 监听插件状态的变化。当状态变为“激活”时，它会创建一个 Tippy.js 弹出框，并根据查询词渲染建议列表。当状态变为“非激活”时，它会销毁弹出框。
   
3. **命令交互**: 在建议列表的 UI 中，当用户点击或回车选择一个用户时，UI 组件会调用一个 Tiptap 命令，例如 `editor.commands.insertContent(...)`，用一个完整的 `mention` 节点替换掉触发文本（如 `@john`）。
   

最后，我们将这个插件集成到我们的 `Mention.js` 扩展中：

```javascript
// 在 Mention.js 的 Node.create({}) 内部添加
import { suggestionPlugin } from './suggestion.js';

//...
addProseMirrorPlugins() {
  return [
    suggestionPlugin({
      editor: this.editor,
      //... 其他配置，如获取用户列表的函数
    }),
  ];
},
```

### 步骤五：最终集成

通过以上步骤，我们已经将数据模型（`Node`）、视图渲染（`Node View`）和交互逻辑（`Plugin`）这三个部分完美地结合在了一个单一的 `Mention.js` 扩展文件中。开发者在使用时，只需像注册任何其他扩展一样，将 `Mention` 添加到编辑器的 `extensions` 数组中，一个功能强大的提及系统就此诞生。

这个案例充分证明了 Tiptap 的分层设计思想。对于简单的需求，你可以使用高层 API；而对于像建议弹出框这样复杂的交互，Tiptap 也为你保留了通往底层 ProseMirror 的通道，让你拥有实现任何功能的终极自由。

> 💡 **完整代码获取**
> Mention 扩展的完整实现代码较长，建议参考：
> - [Tiptap 官方 Mention 示例](https://tiptap.dev/docs/editor/extensions/custom-extensions/extend-existing#mention)
> - [Tippy.js 安装文档](https://atomiks.github.io/tippyjs/)

## 第六节：⚠️ 常见陷阱与调试技巧

在开发自定义扩展的过程中，你可能会遇到一些常见的问题。本节将帮助你快速识别和解决这些陷阱。

### 陷阱 1：生命周期钩子中的无限循环

**问题现象**：
浏览器卡死、内存占用飙升、控制台大量重复日志

**错误示例**：
```javascript
// ❌ 危险！会造成无限循环
onUpdate({ editor }) {
  editor.commands.setNode('paragraph');  // 这会触发新的 update
}

onTransaction({ transaction }) {
  this.editor.commands.insertContent('text');  // 同样会无限循环
}
```

**正确做法**：
```javascript
// ✅ 在事务层面思考，直接修改当前事务
onTransaction({ transaction }) {
  if (someCondition) {
    // 直接修改当前事务，不派发新命令
    transaction.setNodeMarkup(pos, type, attrs);
  }
}

// ✅ 或者添加条件检查避免重复触发
onUpdate({ editor }) {
  if (!editor.isActive('paragraph')) {
    editor.commands.setParagraph();
  }
}
```

> ⚠️ **核心原则**：生命周期钩子用于"响应"变化，不是"创造"新变化

### 陷阱 2：属性序列化丢失

**问题现象**：
扩展的自定义属性在保存/加载后丢失

**常见原因**：
```javascript
// ❌ 只定义了 addAttributes，但没有配置 parseHTML 和 renderHTML
addAttributes() {
  return {
    customData: {
      default: null,
    },
  };
},

// 缺少这两个关键方法导致属性无法序列化
parseHTML() { ... }
renderHTML() { ... }
```

**完整解决方案**：
```javascript
// ✅ 完整的属性闭环：定义 → 渲染 → 解析
addAttributes() {
  return {
    customData: {
      default: null,
      // 2. 解析：从 HTML 读取
      parseHTML: element => element.getAttribute('data-custom'),
      // 3. 渲染：写入 HTML
      renderHTML: attributes => {
        if (!attributes.customData) return {};
        return { 'data-custom': attributes.customData };
      },
    },
  };
},
```

> 💡 **记忆口诀**：属性三步走 - 定义、渲染、解析，一个都不能少

### 陷阱 3：Schema 冲突导致的渲染错误

**问题现象**：
- 内容显示不正确
- 某些节点无法创建
- 控制台报 Schema 相关错误

**常见原因**：
```javascript
// ❌ content 表达式与实际内容不匹配
export const CustomBlock = Node.create({
  name: 'customBlock',
  content: 'paragraph+',  // 要求至少一个段落

  // 但 renderHTML 允许空内容
  renderHTML() {
    return ['div', { class: 'custom' }, 0];  // 0 允许任意内容
  },
})
```

**解决方法**：
```javascript
// ✅ 确保 content 定义与实际使用一致
export const CustomBlock = Node.create({
  name: 'customBlock',
  content: 'paragraph+',  // 明确要求段落

  // 创建时提供默认内容
  addCommands() {
    return {
      setCustomBlock: () => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          content: [
            { type: 'paragraph', content: [] }  // 提供默认段落
          ],
        });
      },
    };
  },
})
```

### 陷阱 4：命令执行顺序混乱

**问题现象**：
链式命令不按预期执行

**错误示例**：
```javascript
// ❌ focus() 应该在其他命令之前
editor.chain().toggleBold().focus().run();
```

**正确做法**：
```javascript
// ✅ focus() 放在链的开头
editor.chain().focus().toggleBold().run();

// ✅ 或者分步执行关键命令
editor.chain().focus().run();
editor.chain().toggleBold().run();
```

### 调试技巧与工具

#### 1. 使用 ProseMirror DevTools

```javascript
import { Editor } from '@tiptap/core';

const editor = new Editor({
  extensions: [/* ... */],
  // 开启开发者模式
  enableDebugMode: true,
})

// 在控制台访问编辑器状态
window.editor = editor;

// 查看当前文档结构
console.log(editor.state.doc.toJSON());

// 查看当前选区
console.log(editor.state.selection);
```

#### 2. 监听关键事件

```javascript
const DebugExtension = Extension.create({
  name: 'debugger',

  onCreate({ editor }) {
    console.log('📝 编辑器已创建', editor.getJSON());
  },

  onUpdate({ editor, transaction }) {
    console.log('🔄 内容更新', {
      docChanged: transaction.docChanged,
      steps: transaction.steps.length,
      content: editor.getJSON(),
    });
  },

  onSelectionUpdate({ editor }) {
    console.log('👆 选区变化', editor.state.selection.toJSON());
  },

  onTransaction({ transaction }) {
    if (transaction.steps.length > 0) {
      console.log('⚙️ 事务步骤', transaction.steps.map(s => s.toJSON()));
    }
  },
})
```

#### 3. 验证扩展完整性检查清单

在发布自定义扩展前，使用此清单验证：

✅ **基础功能**
- [ ] 扩展名称唯一且语义化
- [ ] Schema 定义完整（group、content、marks 等）
- [ ] parseHTML 和 renderHTML 配对正确

✅ **属性管理**
- [ ] addAttributes 定义完整
- [ ] 每个属性都有 parseHTML 和 renderHTML
- [ ] 默认值设置合理

✅ **命令系统**
- [ ] 提供完整的命令集（set/toggle/unset）
- [ ] TypeScript 声明完整
- [ ] 命令可以正确执行和撤销

✅ **用户体验**
- [ ] 键盘快捷键不冲突
- [ ] 输入规则不影响正常输入
- [ ] 粘贴规则正确处理各种格式

✅ **性能与稳定性**
- [ ] 无内存泄漏（正确清理事件监听）
- [ ] 无无限循环风险
- [ ] 大文档下性能可接受

> 🔍 **调试黄金法则**：从简单到复杂，逐步排查。先验证 Schema，再检查属性，最后调试命令和交互。

## 本章核心成就

通过本章深入学习，你已经掌握了 Tiptap 扩展开发的完整技能树：

| 技能点 | 掌握程度 | 实际应用 |
|--------|----------|----------|
| **扩展理论** | ✅ 完成 | 理解 Node/Mark/Extension 本质区别与 ProseMirror 关系 |
| **自定义 Node** | ✅ 完成 | 创建 Callout 块级节点，掌握文档结构定制 |
| **自定义 Mark** | ✅ 完成 | 实现 ColoredHighlight 标记，掌握文本格式扩展 |
| **高级 API** | ✅ 完成 | 灵活运用命令、输入规则、Storage、生命周期钩子 |
| **复杂扩展** | ✅ 完成 | 构建 Mention 交互系统，整合 NodeView 和 Plugin |
| **问题排查** | ✅ 完成 | 识别常见陷阱，掌握调试技巧和验证方法 |

## 🔑 核心概念速查表

### 扩展创建模板

```javascript
// Node 创建模板
const CustomNode = Node.create({
  name: 'customNode',
  group: 'block',
  content: 'paragraph+',

  addAttributes() {
    return {
      attrName: {
        default: null,
        parseHTML: element => element.getAttribute('data-attr'),
        renderHTML: attributes => ({ 'data-attr': attributes.attrName }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="custom"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'custom' }), 0];
  },

  addCommands() {
    return {
      setCustomNode: (attributes) => ({ commands }) => {
        return commands.insertContent({ type: this.name, content: [{ type: 'paragraph' }] });
      },
    };
  },
})

// Mark 创建模板
const CustomMark = Mark.create({
  name: 'customMark',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: element => element.style.color,
        renderHTML: attributes => ({ style: `color: ${attributes.color}` }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-custom-mark]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setCustomMark: (attributes) => ({ commands }) => {
        return commands.setMark(this.name, attributes);
      },
      toggleCustomMark: (attributes) => ({ commands }) => {
        return commands.toggleMark(this.name, attributes);
      },
      unsetCustomMark: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
    };
  },
})
```

## 🚀 进阶学习路径

掌握了本章知识后，你可以探索以下高级主题：

1. **NodeView 深度定制**
   - 使用 React/Vue 组件渲染复杂节点
   - 实现拖拽、调整大小等高级交互
   - 构建完全自定义的编辑体验

2. **Collaboration 协同编辑**
   - 集成 Y.js 实现实时协作
   - 处理冲突解决和用户光标
   - 构建类似 Google Docs 的体验

3. **ProseMirror 插件系统**
   - 深入理解 Plugin State
   - 自定义 DecorationSet 实现高亮
   - 构建复杂的编辑器交互逻辑

4. **性能优化进阶**
   - 虚拟滚动处理大文档
   - 懒加载和按需渲染策略
   - 节流和防抖优化编辑器响应

## 结论

我们已经走完了一段漫长而收获颇丰的旅程。从剖析 Tiptap 与 ProseMirror 的底层关系，到亲手构建自定义的 `Node` 和 `Mark`；从掌握 `addCommands`、`addInputRules` 等高级 API，到最终将所有知识融会贯-通，构建出一个复杂的、生产级别的 `@mention` 扩展。你现在所拥有的，已经不仅仅是使用 Tiptap 的能力，更是创造和扩展 Tiptap 的能力。

通过本教程的学习，我们揭示了几个关键的、超越代码本身的设计思想：

- **Tiptap 的渐进式披露**：它允许开发者从简单的高层 API 入手，在需要时逐步深入到底层 ProseMirror，实现了易用性与强大功能之间的完美平衡。
  
- **Schema 为王**：我们认识到，创建 `Node` 和 `Mark` 的本质是设计文档的“语法”，这是一种比“添加功能”更深刻的思考方式。
  
- **状态的二元性**：我们区分了需要持久化的“文档状态”（`attributes`）和临时的“运行时状态”（`storage`），这是构建健壮扩展的架构基石。
  
- **高级交互的三位一体**：对于复杂的交互式节点，我们掌握了结合 `atom` 属性、`addNodeView` 和 `addProseMirrorPlugins` 的核心架构模式。
  

掌握了这些知识，你就拥有了解锁 Tiptap 全部潜能的钥匙。你不再受限于 Tiptap 官方或社区提供的扩展，你的编辑器现在是一块真正的画布，而扩展就是你手中的画笔，可以随心所欲地描绘出你产品所需的用户体验 2。

**下一步行动**

- **深入探索**：官方文档永远是最好的老师。我们强烈建议你花时间深入阅读 Tiptap 和 ProseMirror 的官方文档，那里有更详尽的 API 参考和示例 2。
  
- **动手实践**：知识只有在实践中才能真正内化。尝试为你自己的项目构建一个独特的扩展，解决一个实际问题。
  
- **拥抱社区**：Tiptap 拥有一个活跃的社区 4。如果你想将自己的扩展分享给更多人，可以使用官方提供的 CLI 工具
  
    `npm init tiptap-extension` 来快速创建一个标准化的、可发布的扩展项目 4。
    

感谢你跟随本系列教程走到这里。希望这篇深度指南能够成为你在 Tiptap 定制化道路上的坚实基石和灵感源泉。祝你创造愉快！