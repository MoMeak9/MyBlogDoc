> 原文：https://alexkondov.com/full-stack-tao-styling/
>
> 原标题：How to Style a React Application
>
> 作者：Alexander

过去十年间，Web 应用程序的构建方式已经发生了根本性的变化。我们现在关注的不是页面，而是组件。不再将数据传递给模板进行渲染，而是管理动态状态。我们借助强大的 API，将以前难以解决的一致性错误简化为微不足道的逻辑处理。

然而，有一点基本保持不变，那就是样式。

我可以轻松区分 2014 年与 2024 年编写的代码库，但如果你向我展示样式表，它们似乎都像是最近才编写的一样。这说明 CSS 已经达到了一个相对成熟的阶段，不需要重大变革。然而，前端开发实践和我们所构建产品的规模却在不断演变。对于许多团队来说，样式管理仍然是个未解决的问题。

我见过许多工程师，他们在实现复杂的状态管理时游刃有余，但在正确应用样式和响应式设计时却面临困难。前端开发的独特之处在于它结合了逻辑结构和美学，而 CSS 往往被低估，因为人们认为它是这两者中较为简单的部分。

或许你会认为，一旦逻辑和组件准备就绪并发挥作用，让它们看起来漂亮应该很简单，对吧？

作为一个在 CSS 上挣扎了足够多的人，我深知事实并非如此。

## 简短的旁白

这不仅仅是一篇充满代码示例的文章，也是我即将公开撰写的新书《全栈道》（The Full-Stack Tao）的一个章节。

以下是迄今为止已发布的所有章节：

- [1. 从域名开始](https://alexkondov.com/full-stack-tao-start-with-the-domain/)
- [2. 选择技术栈](https://alexkondov.com/full-stack-tao-picking-tech-stack/)
- [3. 设置项目](https://alexkondov.com/full-stack-tao-setting-up-the-project/)
- [4. React 中的简洁架构](https://alexkondov.com/full-stack-tao-clean-architecture-react/)
- [5. 构建合适的 REST API](https://alexkondov.com/full-stack-tao-proper-rest-api/)
- [6. 如何编写 React 应用程序的样式](https://alexkondov.com/full-stack-tao-styling/)

## **语义类**

在本章接下来的部分中，我们将暂时放下功能，专注于组件及其 CSS 标记。以下是一个渲染文章的简单组件，我们将通过优化其外观进行改进。

```tsx
function Essay({ title, content, author }) {
  return (
    <article>
      <h1>{title}</h1>
      <p>{content}</p>
      <div>
        <img src={author.image} />
        <div>— {author.name}</div>
      </div>
    </article>
  )
}
```

根据 HTML 规范，标记应只包含内容相关的信息。因此，我们应该使用所谓的“语义”类来让我们的元素可以通过 CSS 进行选择。

```tsx
function Essay({ title, content, author }) {
  return (
    <article className="essay">
      <h1>{title}</h1>
      <p>{content}</p>
      <div>
        <img src={author.image} />
        <div>— {author.name}</div>
      </div>
    </article>
  )
}
```

在类的上下文中，语义意味着它应该解释元素内所含内容的意义。在上面的示例中，我们使用 `essay`，因为这正是该组件所渲染的内容。

我们可以使用该类作为锚点来选择组件内的不同元素。

```css
.essay {
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 5px;
}

.essay h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.essay p {
  font-size: 16px;
  margin-bottom: 10px;
}

.essay div {
  display: flex;
  align-items: center;
}

.essay div img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.essay div div {
  font-size: 14px;
  font-style: italic;
}
```

为每个元素写出完整选择器会使 CSS 变得冗长，因此我们应该使用嵌套选择器。嵌套选择器已被最新的浏览器所支持，而且我们有预处理器来兼容旧浏览器。

```css
.essay {
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 5px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    margin-bottom: 10px;
  }

  div {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }

    div {
      font-size: 14px;
      font-style: italic;
    }
  }
}
```

遵循关注点分离原则，我们的标记应该处理内容，CSS 处理样式，并且两者应当分离。这种方法体现了该理念。

不过，如果并排查看组件和其 CSS，可以看到它们的结构几乎相同。尤其是在使用嵌套选择器时，CSS 与 HTML 的耦合非常紧密。如果需要用 `div` 可视化另一段内容，这会继承可能无关的样式。

因此，尽管这种方法符合原则，但耦合过于紧密。我们应该更多地使用类，以便更轻松地选择元素。

```tsx
function Essay({ title, content, author }) {
  return (
    <article className="essay">
      <h1 className="title">{title}</h1>
      <p className="content">{content}</p>
      <div>
        <img className="author-image" src={author.image} />
        <div className="author-name">— {author.name}</div>
      </div>
    </article>
  )
}
```

这样效果更好。

现在这些类与具体内容部分相关联，不再需要在 CSS 中引用元素类型。同时，我们避免了类名冲突的潜在问题，防止样式冲突。

```scss
.essay {
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 5px;

  .essay-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .essay-content {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .essay-author {
    display: flex;
    align-items: center;

    .essay-author-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .essay-author-name {
      font-size: 14px;
      font-style: italic;
    }
  }
}
```

上述 CSS 依然与标记结构高度相似，但通过分离元素选择器与类名，我们减少了对具体 HTML 结构的耦合，提升了样式的独立性和灵活性。这样可以更方便地维护和扩展我们的组件，确保样式的可重用性和一致性。

## 创建相似的组件

大多数 Web 应用程序都试图拥有一致的外观和感觉，组件相似也是正常的。实际上，我们经常会发现，如果设计得当，组件在应用程序的其他部分使用时几乎不需要或不需要进行调整。

我们的应用程序需要一个组件来显示引用，我们将在用户等待数据加载时显示此引用。

它需要被包裹在一个盒子里，它应该渲染引用、其作者的图片和他们的名字。它与我们已经有的 `Essay` 组件非常相似，其样式也应该是相同的。因此，本着不重复自己的精神，我们复制了标记和它的类，瞧！一切看起来都很好。

```tsx
function Quote({ content, author }) {
  return (
    <article className="essay">
      <p className="essay-content">{content}</p>
      <div className="essay-author">
        <img className="essay-author-image" src={author.image} />
        <div className="essay-author-name">— {author.name}</div>
      </div>
    </article>
  )
}
```

但是，这种方法存在问题。

新组件中的类不再反映其内容。按照 HTML 规范，我们知道我们应该编写语义类来赋予标记意义。但是，由于我们想要重用我们的CSS，我们唯一的选择是将类重命名为可以涵盖两种用例的更通用的类。

```scss
.text-box {
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 5px;

  .text-box-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .text-box-content {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .text-box-author {
    display: flex;
    align-items: center;

    .text-box-author-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .text-box-author-name {
      font-size: 14px;
      font-style: italic;
    }
  }
}
```

我们有效地重用了样式，并且在这两种情况下，类名仍然反映了内容的性质，因此我们的 CSS 努力开始得到了回报。

然而，这种方法导致 CSS 被耦合到标记中的多个部分。例如，Quote 组件没有标题，但由于 Essay 组件的存在，有一个选择器对其应用了样式。

这种耦合使得处理边缘情况变得像管理广泛使用的编程抽象一样复杂。

## 特定更改

几周后，我们决定突出显示一些文章，使这些特定的文章具有黑色背景和白色文字，以引起注意。我们现在不关注突出显示的标准或功能，而只专注于样式。

```css
.highlighted {
  background-color: black;
  color: white;
}
```

我们可以将类名设为 highlighted，并通过简单的条件检查将其添加到组件中。

```tsx
function Essay({ title, content, author, highlighted }) {
  return (
    <article
      className={`text-box ${highlighted ? 'highlighted' : ''}`}
    >
      ...
    </article>
  )
}
```

但是，几周后，我们决定将突出显示的文章更改为浅紫色背景，文本再次变为黑色。

```css
.highlighted {
  background-color: #d5b8ff;
}
```

我们测试并部署这些更改，它们看起来不错。然而，尽管每次重用时都小心确保类名反映内容的性质，我们可能会遇到工作不够细致的同事。

他们可能重用了 .text-box 和 .highlighted 类，即使新组件的目的与原来的不同。

我们让我们的类过于通用。由于它未能准确反映设计意图，不同的人可能会在不适当的地方重用它。

```scss
.text-box.text-box-highlited {
  // ...
}
```

通过这个更改，我们明确了该类应在何处使用。因此，他们可以创建自己的组件并实现特定于该组件的语义类，即使这损害了我们的可重用性，但用例过于不同，必须做出妥协。

## 更具体的变化

下一个我们需要开发的功能是 Quote 组件中文本的第一个字母应大写，类似于书籍章节中的样式。

```scss
.text-box {
  // ...

  .text-box-content {
    // ...
    &::first-letter {
      text-transform: uppercase;
      font-size: 200%;
      font-weight: bold;
    }
  }
}
```

但这也会影响到 `Essay` 组件，这是我们不希望发生的。因此，我们应该将其实现为仅在 `Quote` 组件中添加的附加类。

对于默认样式的问题，我的理念是最简单的样式应该是基础。因此，我会将大写风格作为附加类添加。但是我们应该如何命名它呢？

尽管回到 HTML 标准，类应该反映元素内容，我们可以命名为 `.capitalized-first-letter`，但这可能会导致和 `.highlighted` 类似的问题。有人可能会将其误用在其他地方。

我们可以添加一个特定的类，如 `.quote-content`，但这会破坏关注点的分离。

## 重复

这让我们回到之前的问题——两个组件有许多样式重复，但又有足够的差异，无法重用相同的类。

```css
.author-image {
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid black;
  border-radius: 50%;
}

.company-image {
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #d5b8ff;
  border-radius: 5px;
}
```

我们可以提取一个描述重复行为的类，因为我们期望很多元素需要使用 Flexbox 并居中对齐。

```css
??? {
  display: flex;
  justify-content: center;
  align-items: center;
}

.author-image {
  border: 1px solid black;
  border-radius: 50%;
}

.company-image {
  border: 1px solid #d5b8ff;
  border-radius: 5px;
}
```

这增加了 HTML 和 CSS 之间的耦合，我们的标记必须知道我们的样式决策，再次破坏了关注点的分离。

过去，我们使用 SCSS 混入来重用较小的逻辑片段，但请注意，每个决定都是在过去平衡灵活性和分离关注点之间的权衡。这是一个微妙的取舍，需要在可维护性和复用性之间找到适当的平衡。

**在处理了多年的类似问题之后，我得出的结论是，可重用的CSS有点像红鲱鱼。**

屏幕上有许多元素是相似的，但在特定情况下却有所不同。是的，关于按钮、输入和低级组件的粒度类是可重用的，但内容越具体，重用任何样式就越困难。

## 样式不足

如果元素的类不是设计为可重用的，你会发现它的某些样式可能来自其父级，例如间距、字体或颜色。这意味着我们可以重用 CSS 的“一些”，但随后我们必须在我们自己的类中复制其余的。

## 硬编码值

因此，我接受重复是一种必要的邪恶。考虑正确的CSS架构会给一个我们没有合适的工具来处理的项目增加很多不必要的复杂性。我们本质上是在实现一种继承形式，但没有我们在编写代码时获得的智能感知。

所以我一遍又一遍地写出样式——边距、字体、颜色等等。

在进行第一千次思考关注点分离的想法时，我注意到我违反了另一个重要原则，一个我们已经在代码库中建立的原则。

避免使用神奇的硬编码值。

## 抽象样式值

当我审视我的风格时，它们不仅重复，而且充满了神奇的价值。各种颜色、边距和从 `10` 像素到 `48` 像素的各种可以想象的字体大小将 UI 结合在一起。

就像在我们的代码库中一样，这些数字并不能描述它们的用途。

例如，你不知道 `font-size: 24px` 与当前应用程序的关系。文本到底有多大？在仪表板中，这可能是一个标题，但在野兽派登录页面中，这可能是页面上文本的正常大小。

但认知负荷并不是我们唯一的问题。屏幕的一致性和对称性是使产品看起来不错的原因，对于任何前端应用程序来说，拥有好看的最终结果与其状态管理一样重要。

## 通过设计令牌实现一致性

没有一致间距的 UI 会让使用它的人感到“不对劲”，即使他们无法查明问题所在。

我们想要提取公共值，不仅因为我们想要重用它们，还因为我们想要限制首先应该使用哪些值。使用适合比例的字体大小、边距和填充可为 UI 提供对称感和一致性。

所有其他值也是如此。

颜色是应用程序的标识。即使你选择简约的调色板，即使对于未经训练的眼睛来说，具有多种灰色变化仍然看起来很糟糕。

例如，一个按钮可能需要多种颜色才能达到正常、悬停、按下和禁用状态。现在，如果所有这些颜色都是同一基本原色的不同阴影，那么这个组件看起来会好得多。

## 设计令牌

我们不能可靠地重用类，但我们可以重用CSS值。重用复杂元素的CSS是很困难的，但所有这些CSS都可以由同一组“设计标记”来支持。

设计标记是表示设计系统的最小单位的原子值 - 颜色、字体大小、间距、动画以及我们需要重用的所有其他内容。与将视觉和功能（事物）结合在一起的组件库相反，设计令牌只携带样式。

它们旨在抽象出在实现组件时选择正确值的决策，并帮助我们保持一致性。在现代浏览器中，我们可以使用 CSS 变量来定义这些值。

```css
:root {
  /* Color variables */
  /* HSL allows us to make easier modifications to brightness */
  --color-primary: hsl(221, 44%, 41%);
  --color-primary-light: hsl(221, 32%, 65%);
  --color-primary-dark: hsl(211, 50%, 29%);
  /* But hardcoded hex values are also fine */
  --color-grey: #65737e;
  --color-grey-light: #c0c5ce;
  --color-grey-dark: #343d46;
  --color-black: #1a1a1a;
  /* RGBA too */
  --color-white: rgba(255, 255, 255, 0.9);

  /* Font family variables */
  --font-serif: 'Merriweather', serif;
  --font-sans-serif: 'Montserrat', sans-serif;

  /* Font size variables */
  --font-size-2xs: 0.75rem;
  --font-size-xs: 0.875rem;
  --font-size-sm: 1rem;
  --font-size-md: 1.125rem;
  --font-size-ml: 1.5rem;
  --font-size-lg: 2.25rem;
  --font-size-xl: 3rem;
  --font-size-2xl: 3.75rem;

  /* Spacing variables */
  --space-2xs: 0.25rem;
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-ml: 1.25rem;
  --space-lg: 2rem;
  --space-xl: 3.25rem;
  --space-2xl: 5rem;
}
```

通过使用CSS变量，我们从应用程序中删除了大量的决策和论证燃料。每个人都在同样的创造性约束下运作，他们需要一个很好的论据来打破它。

## 重用组件而不是样式

我注意到，每次我需要重用一个类时，我实际上是在尝试重用一个组件。当我将CSS重用为一个按钮时，我不会把它放在任何其他元素上，而是把它放在一个按钮上。输入字段、布局和我构建的任何自定义组件也是如此。

我正在重用组件，而不是`class`。

但这有什么不同呢？组件是一个完整的内聚单元，具有其样式和功能。它还解决了类层次结构的智能感知问题 - 我们可以通过其道具传达组件中可以调整的内容。

## 在组件中思考

以我们在文章开头思考过的 `.highlighted` 类为例。它的存在反映了需要传递给组件的道具。这是样式和标记耦合的另一个例子。

但是，如果我们滥用组件的 API，我们得到报错。

当我开始考虑组件而不是标记和样式时，我开始将它们的分离视为不必要的摩擦。他们描述了相同的实体，这在耦合中是可见的。我需要的CSS解决方案是一个不依赖于语义类的解决方案。

## CSS-in-JS

屏幕上的大多数元素没有与之相关的事件处理程序或域逻辑，它们是样式传递的 React 组件，其唯一职责是接受子元素并呈现它们。

一些前端开发人员意识到样式和标记之间的紧密耦合，并决定创建完全依赖它的工具。CSS-in-JS 库为我们提供了一个简写 API 来创建组件并同时设置其样式。

现在，我们将拥有一组表示其每个部分的组件，而不是上面的 `.text-box` 类。

```tsx
const TextBox = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 5px;
`

const TextBoxTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
`

const TextBoxContent = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`

const TextBoxAuthor = styled.div`
  display: flex;
  align-items: center;
`

const TextBoxAuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`

const TextBoxAuthorName = styled.div`
  font-size: 14px;
  font-style: italic;
`

export function TextComponent() {
  return (
    <TextBox>
      <TextBoxTitle>What is the meaning of life?</TextBoxTitle>
      <TextBoxContent>42</TextBoxContent>
      <TextBoxAuthor>
        <TextBoxAuthorImage
          src="/path/to/image.jpg"
          alt="Alex Kondov"
        />
        <TextBoxAuthorName>Alex Kondov</TextBoxAuthorName>
      </TextBoxAuthor>
    </TextBox>
  )
}
```

我们导出整个 `TextComponent`，将其呈现为一个有凝聚力的单元，在其构建块上保持抽象。这传达了组件只能作为一个整体重用。

我们不必考虑语义类，因为组件的名称描述了它的目的。请注意，我们不是使用嵌套样式，而是单独描述每个组件，将它们与它们在组件中的位置分离。

## 实用程序类

CSS-in-JS 是将标记与样式耦合的一种方式，因此我们可以处理组件。另一个乍一看似乎有悖常理的是实用类。

```tsx
function TextComponent() {
  return (
    <div className="border border-black rounded p-2.5 mb-1.5">
      <div className="text-2xl font-bold mb-4">Title of the Box</div>
      <div className="text-lg mb-2.5">
        Content of the box goes here.
      </div>
      <div className="flex items-center">
        <img
          src="/path/to/image.jpg"
          alt="Author"
          className="w-12 h-12 rounded-full mr-2.5"
        />
        <div className="text-base italic">Author Name</div>
      </div>
    </div>
  )
}
```

此示例使用 Tailwind 类来实现与我们前面的示例相同的结果，其实现是迄今为止最精简的实现。我们没有定义单独的组件，而是再次伸手去寻找类，但这次它们不是语义的。

我们使用速记样式来设置每个元素的样式。如果说经典的样式方法类似于编程中的继承，那么这种方法就等同于组合，我发现后者在 CSS 的上下文中效果要好得多。

## 耦合标记、样式和设计标记

我们依赖同行评议的事情越多，被忽视的可能性就越大。这里最大的罪魁祸首是设计代币。

一个团队同意使用预先选择的调色板、间距和字体，却发现他们的代码库充满了神奇的值，因为人们很匆忙，或者他们找不到合适的值来使用。设计令牌增加了一点摩擦，因为你必须寻找合适的令牌来使用。

对于 Tailwind 的实用类，使用设计令牌是样式本身的一部分。决定字体大小、边距、填充和颜色被烘焙到实用程序类中，尽可能减少摩擦。

编写样式也容易得多，因为你不需要在多个文件之间跳转 - 你可以一次性编写标记和 CSS。

## scale（可扩展性） 是什么意思？

虽然我与 Tailwind 没有任何关系，但我认为使用实用程序类的样式方法是最具可扩展性的。在 CSS 的上下文中，可扩展性意味着能够在不成比例增加样式工作的情况下向页面添加更多内容。

实用类的样式工作始终是固定的。一个开发人员不会因为更新一个类而无意中改变其它组件的外观。

没有可重用性需要考虑，也没有设计令牌需要在代码审查中强制执行。使用语义类的原因是它们描述了所标记的内容，但实际中却发现并没有那么简单。

将类的语义与内容的性质联系起来已经影响了可扩展性。

唯一可复用的组件是那些名称与其内容无关的组件。这并不是说这些类名没有语义，只是它们的语义与内容无关。

## Semantic （语意）是什么意思？

语义是关于某事**的商定含义**，一种共同的理解。

语义 HTML 意味着我们以预期的编写方式编写标记，以便其他工程师和工具可以理解它。我们一致认为标题元素标记为 `h1` 到 `h6`，并且该`button`应用于提交表单，而不是 `div`。

但是当涉及到CSS时，就没有语义了。这些课程背后没有商定的意义。没有人描述过`.text-box`、`.card` 或 `.card-title`。这些都是我们赋予类的意义。

从这个意义上说，类不能**是无语义**的。你不能写一个没有意义的类，因为你是给它的人。

尽管 HTML 规范说鼓励开发人员使用描述内容的类，但没有具体的原因说明为什么这个建议应该适用于长期偏离旧实践的现代前端开发。

## 语义类更好

`.text-box` 是比`border border-black rounded p-2.5 mb-1.5` 更好的类吗？当然可以。

但是我在编写CSS时的目标不是写出好的类。这是以一种有助于我在未来使用它的方式设计产品。

有一天，在我编写`.card-header` 类之后，我将不知道它的确切样式，只是通过查看代码。边距、填充、字体大小 - 除非我跳到 CSS 文件，否则我不会知道它的作用。

现在，当我看到另一个类时，我可以理解它有什么风格。但更重要的是，从现在起一个月或一年后，当我必须对项目进行快速更改时，我将能够理解它们。

## 进行 CSS 更改

我们编写CSS的方式和我们改变它的方式有很大不同。

当我们以经典的方式编写CSS时，我们会想到用类描述内容的最佳方式。当我们需要改变一些东西时，如果它不再足够好，我们很少考虑更新类设计。

通常，我们会在控制台的帮助下确定需要修改的位置，并应用手术风格更改。如果我们在撰写本文后不利用它，那么拥有复杂的类层次结构是没有意义的。

我还没有看到有人通过语义类正确地跟踪风格。另一方面，对于实用程序类，我们需要进行的更改始终在组件内部。

## 无Class样式理念

我的样式理念是让过去的类成为构建复杂 UI 不再需要的工具。关注点的分离很重要，但在现代前端开发中，关注点是组件。

为了理解为什么我如此欣赏这种方法，我们需要回顾一下在基于组件的库存在之前CSS是如何编写的。

在 React、Angular 和其他让我们的生活更轻松的东西出现之前，我们有数英里长的 HTML 文件来描述网站的整个页面。

如果你需要弄清楚元素的开始和结束位置，标签、换行符和缩进是很好的选择。但这仍然留下了一些问题 - 基于标签选择带有CSS的元素是一场噩梦，并且不可能弄清楚长HTML文件中每个元素的含义。

因此，classes是我们的解决方案。

如果不是类，深度嵌套的 HTML 几乎不可能破译。他们通过提供一种简单的方法来根据其类使用CSS选择特定元素，并为每个元素提供目的，从而解决了这两个问题。

当每个标签都附加了一个名称时，浏览标记变得容易得多，你可以弄清楚它的用途。

但是由于太长的原因，我们在这里无法描述，我们现在使用的是组件，而不是页面。

我们的开发流程变得容易得多，因为我们可以一次专注于一个元素，考虑它需要的数据以及需要应用于它的样式。

但这比大多数开发人员想象的要大。突然之间，支撑我们整个造型理念的两个问题不复存在。当我们一次只处理一小部分 UI 时，选择元素并理解它们要容易得多。

不再需要语义类来解决这些问题。

我们经常谈论限制复杂性，并且在组件中拥有实用程序类比我们拥有的任何其他替代方案都要简单得多。

## 使用实用程序类处理复杂性

我们上面的组件非常简单，因为它没有采用任何道具，但是当它变得更加复杂时，实用类作为解决方案会不会设计得太少？

有几种方法可以用它们处理更高的复杂性。

影响组件样式的道具将反映为对组件实用程序类的更改。因此，在 `className` props 中内联条件是执行此操作的最简单方法。

```tsx
function TextComponent({ highlighted }) {
  return (
    <div
      className={`border border-black rounded p-2.5 mb-1.5 ${
        highlighted ? 'bg-black' : ''
      }`}
    >
      // ...
    </div>
  )
}
```

但这很快就会失控。我们的开始标签现在需要 5 行，因为有一个条件，所以我们可以想象如果我们必须再添加两行会发生什么。另一种方法是使用类似 `classnames` 的库来构造类。

```tsx
function TextComponent({ highlighted }) {
  const classes = classNames(
    'border',
    'border-black',
    'rounded',
    'p-2.5',
    'mb-1.5',
    { highlighted }
  )
  return <div className={classes}>...</div>
}
```

但这不是更长吗？是的，但我们需要记住的一件事是，需要应用于它们的任何动态类的元素只是整个应用程序的一小部分。最重要的是，我们正在使用组件，因此我们只需要管理一次这种复杂性。

如果组件中的其他元素需要对它们应用条件逻辑，我会像处理任何其他冗长的函数一样 - 提取另一个函数。

样式很复杂，提取一个组件以便我们可以管理其中的一些组件是绝对可以的。

## Complex Classes复杂类

不过，有些组件不会只改变一两个类。

```tsx
function TextComponent({ highlighted, large, disabled, error }) {
  const classes = classNames(
    'border',
    'border-black',
    'rounded',
    'p-2.5',
    'mb-1.5',
    {
      highlighted: highlighted,
      'bg-yellow-200': highlighted && !error,
      'bg-red-200': highlighted && error,
      'text-lg': large,
      'opacity-50': disabled,
      'cursor-not-allowed': disabled,
      'font-bold': highlighted || large,
      'border-red-500': error,
      'hover:bg-gray-100': !disabled,
    }
  )

  return <div className={classes}>...</div>
}
```

当我们发现自己处于这个位置时，另一个值得考虑的技术是将其拆分为单独的组件。一个函数应该有一个单一的职责，如果一个组件太灵活，就意味着它做了太多的事情。

一种常见的做法是拆分另一个组件中的基础，只将可配置位留在原始组件中。

```tsx
function StyledTextComponent({
  highlighted,
  large,
  disabled,
  error,
  children,
}) {
  const styledClasses = classNames({
    'bg-yellow-200': highlighted && !error,
    'bg-red-200': highlighted && error,
    'text-lg': large,
    'opacity-50': disabled,
    'cursor-not-allowed': disabled,
    'font-bold': highlighted || large,
    'border-red-500': error,
    'hover:bg-gray-100': !disabled,
  })

  return (
    <BaseTextComponent className={styledClasses}>
      {children}
    </BaseTextComponent>
  )
}
```

## 组件架构，而不是 CSS 架构

流行的 CSS 范式让我们专注于构建我们的 CSS，但我宁愿样式成为我们组件设计工作的一部分，而不是单独考虑的东西。

我们应该有组件架构，而不是样式架构。

我不希望这一章听起来像是造型是世界上最难的事情。糟糕的CSS会让你的页面看起来有点坏，它可能会激怒客户，或者在绝对最坏的情况下会给你一些钱。但是，数据库错误可能会毁掉你的整个公司。

是的，复杂的 UI、动画和布局始终是一个挑战，但绝大多数 Web 应用程序不需要这些。我们需要的是一种编写CSS的常识性方法，它与我们使用的现有工具很好地结合在一起

在状态管理方面，我们已经在考虑组件。造型也很自然。

我不想考虑CSS架构。我希望能够以一种能够让我高效工作并专注于应用程序的关键方面的方式设置我的组件样式。
