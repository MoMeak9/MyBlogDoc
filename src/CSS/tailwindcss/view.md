# Tailwind CSS 核心概念：效用优先

方便起见，我们直接使用官网的讲解案例

## 案例说明

传统情况下，当我们需要在网页上设置样式时，都需要编写 CSS，而且我们还通常会使用预处理语言，例如SaSS，Less等等。

**使用传统方式时，定制的设计需要定制的 CSS**

比如实现以下的小卡片

![image-20220801175009372](https://cdn.yihuiblog.top/images/202208011750577.png)

```html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

使用 Tailwind，则可以通过直接在 HTML 中应用预先存在的类来设置元素的样式，不需要再去设计CSS样式，命名和层级。

**使用功能类构建自定义设计而无需编写 CSS**

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
```

在上面的示例中：

- 使用 Tailwind 的 [flexbox](https://www.tailwindcss.com/docs/display#flex) 和 [padding](https://www.tailwindcss.com/docs/padding) 功能类 (`flex`, `flex-shrink-0`, 和 `p-6`) 来控制整体的卡片布局
- 使用 [max-width](https://www.tailwindcss.com/docs/max-width) 和 [margin](https://www.tailwindcss.com/docs/margin) 功能类 (`max-w-sm` 和 `mx-auto`) 来设置卡片的宽度和水平居中
- 使用 [background color](https://www.tailwindcss.com/docs/background-color), [border radius](https://www.tailwindcss.com/docs/border-radius), 和 [box-shadow](https://www.tailwindcss.com/docs/box-shadow) 功能类 (`bg-white`, `rounded-xl`, 和 `shadow-md`) 设置卡片的外观样式
- 使用 [width](https://www.tailwindcss.com/docs/width) 和 [height](https://www.tailwindcss.com/docs/height) 功能类 (`w-12` and `h-12`) 来设置 logo 图片的大小
- 使用 [space-between](https://www.tailwindcss.com/docs/space) 功能类 (`space-x-4`) 来处理 logo 和文本之间的间距
- 使用 [font size](https://www.tailwindcss.com/docs/font-size)，[text color](https://www.tailwindcss.com/docs/text-color)，和 [font-weight](https://www.tailwindcss.com/docs/font-weight) 功能类 (`text-xl`，`text-black`，`font-medium` 等等) 给卡片文字设置样式

这种方法使我们无需编写一行自定义的 CSS 即可实现一个完全定制的组件设计。

### Tailwind 的优势

- **不需要为了给类命名而浪费精力**。 不需要仅仅为了设置一些样式而额外添加一些像 `sidebar-inner-wrapper` 这样冗长的类名，不必再为了一个 flex 容器的完美抽象命名而倍受折磨。
- **不会变大的CSS代码量。** 使用传统方法，每次添加新功能时 CSS 文件都会变大。使用功能类，所有内容都是可重用的，因此您几乎不需要编写新的CSS。
- **更改会更安全**。 CSS 是全局性的，您永远不知道当您进行更改时会破坏掉什么。您 HTML 中的类是本地的，因此您可以更改它们而不必担心其他问题。

