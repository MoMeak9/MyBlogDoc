# Tailwind CSS 核心概念：功能类优先

在一组受约束的原始功能类的基础上构建复杂的组件，Tailwind CSS内置了很多类名，直接放在class属性中，以代替CSS。。

方便起见，我们直接使用官网的讲解案例。

## 案例说明

传统情况下，当我们需要在网页上设置样式时，都需要编写专门的 CSS 代码，以结构+表现的形式，而且我们还通常会使用预处理语言，例如SCSS，Less等等，而Tailwind的思路简单来说就是将其变成长长的class类名。

**使用传统方式时，定制的设计需要定制的 CSS：**

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

**而使用功能类构建自定义设计而无需编写 CSS：**

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

## Tailwind 展现出的优势

- **不需要为了给类命名而浪费精力**。 不需要仅仅为了设置一些样式而额外添加一些像 `sidebar-inner-wrapper` 这样冗长的类名，不必再为了一个 flex 容器的完美抽象命名而倍受折磨。
- **不会增加的CSS代码量。** 使用传统方法，每次添加新功能时 CSS 文件都会变大。使用功能类，所有内容都是可重用的，因此我们几乎不需要编写新的CSS。
- **更改会更安全**。 CSS 是全局性的，我们永远不知道当进行更改时会破坏掉什么，甚至影响到别的业务样式。但是我们的 HTML 中的类是本地的（HTML的UI普遍组件化、模块化的），不必担心影响到不可预知的问题。

## 与内联样式的区别

- **基于约束的设计**。使用内联样式，每个值都是一个数字， 而功能类是从预定义的设计系统中**选择样式**，这使得构建统一的UI变得更加容易。
- **适合响应式的设计。**在内联样式中不能使用媒体查询, 但可以使用 Tailwind 的响应式功能类非常容易的构建完全响应式的界面。
- **支持hover, focus, 以及其它伪类状态。**内联样式无法设置 hover 或者 focus 这样的状态, 但 Tailwind 的状态变体可以通过使用功能类非常容易地为这些状态设置样式。

## 可维护性

在使用功能优先的方式时，最大的可维护性问题是管理通用的可重复使用的功能类组合。官方文档说明则是认为，通过[提取组件](https://www.tailwindcss.com/docs/extracting-components)（通常做为模板片断或者组件），可以轻松解决此问题，类比就是我们在Vue，React框架中经常进行的组件的拆分和复用。

除此之外，维护功能优先的 CSS 项目比维护大型 CSS 代码库要容易得多，因为 HTML 比 CSS 维护容易得多（更加直观）。

但是我觉得这边可能也是值得讨论的地方，在没有更加优秀统一的CSS约定（包括使用预处理语言）的团队当中，这样的维护成本、开发和学习成本是很低的，而且当新员工刚刚接手项目的适合会很直观，不用花大量时间阅读CSS代码。但是，也有同学反应这样使得我们的HTML文件变得巨大，而且单行很长，不易阅读。就我个人而言，对于React这样本身将标记和逻辑放在一起，再辅以tailwind的功能类组合，确实有点一段就代码就将结构、表现和逻辑一网打尽的感觉。

