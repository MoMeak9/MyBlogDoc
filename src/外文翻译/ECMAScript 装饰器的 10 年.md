2015年，ECMAScript 6 发布，这是JavaScript语言的一个重大发布。这个版本引入了许多新特性，比如const/let、箭头函数、类等。大多数这些特性的目标是消除JavaScript的怪癖。因此，所有这些特性都被标记为“Harmony”。一些消息来源称整个ECMAScript 6被称为“ECMAScript Harmony”。除了这些特性，“Harmony”标签还突出了其他预计很快会成为规范一部分的特性。装饰器就是其中一种预期特性。

自从第一次提到装饰器以来已经过去了将近10年。装饰器的规范已经被重新多次从头开始编写，但它们还没有成为规范的一部分。随着JavaScript早已不仅限于基于浏览器的应用程序，规范的作者必须考虑JavaScript可以执行的各种平台。这正是为什么这项提案进展到第3阶段花费了这么长时间。

## 全新的东西？
首先，让我们澄清一下在编程世界中装饰器是什么。

> “装饰器是一种结构设计模式，它允许您通过将这些对象放置在包含行为的特殊包装器对象内，来附加新的行为到对象上。”
> © https://refactoring.guru/design-patterns/decorator

关键在于装饰器是一种设计模式。这意味着通常可以在任何编程语言中实现它。如果你对JavaScript有基本的了解，那么很有可能你已经在不经意间使用过这种模式。

听起来有趣吗？那么试着猜猜世界上最流行的装饰器是什么... 认识一下世界上最著名的装饰器，高阶函数 - 防抖函数`debounce`。

### Debounce

在我们深入讨论防抖函数的细节之前，让我们先回顾一下什么是高阶函数。高阶函数是指接受一个或多个函数作为参数或将函数作为结果返回的函数。防抖函数是高阶函数的一个显著例子，同时也是JavaScript开发者中最流行的装饰器。

高阶函数防抖会延迟调用另一个函数，直到自上次调用以来已经过了一定时间，而不会改变其行为。最常见的用例是在用户输入数值到搜索栏时防止多次向服务器发送请求，例如加载自动完成建议。相反，它会等到用户完成或暂停输入后才向服务器发送请求。

在大多数学习JavaScript语言的资源中，在关于超时的部分，你会找到涉及编写这个函数的练习。最简单的实现看起来是这样的：

```js
const debounce = (fn, delay) => {
  let lastTimeout = null

  return (...args) => {
    clearInterval(lastTimeout)

    lastTimeout = setTimeout(() => fn.call(null, ...args), delay)
  }
}
```

使用这个函数可能看起来像下面这样：

```js
class SearchForm {
  constructor() {
    this.handleUserInput = debounce(this.handleUserInput, 300)
  }

  handleUserInput(evt) {
    console.log(evt.target.value)
  }
}
```

在下一节中我们将讨论一种特殊的装饰器语法，使用这种语法实现相同行为的代码如下所示：

```js
class SearchForm {
  @debounce(300)
  handleUserInput(evt) {
    console.log(evt.target.value)
  }
}
```

所有的样板代码都已经删除，只留下了必要的部分。看起来很简洁清晰，是吧？

### 高阶组件（HOC）

接下来的例子将来自React世界。虽然在使用React构建的应用程序中，高阶组件（HOC）的使用变得不太常见，但HOC仍然是装饰器使用的一个良好而且广为人知的例子。

让我们来看一个`withModal` HOC的例子：

```js
const withModal = (Component) => {
  return (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleModalVisibilityToggle = () => setIsOpen(!isOpen)

    return (
      <Component
        {...props}
        isOpen={isOpen}
        onModalVisibilityToggle={handleModalVisibilityToggle}
      />
    )
  }
}
```

现在，让我们看看它可以如何使用：

```js
const AuthPopup = ({ onModalVisibilityToggle }) => {
  // Component
}

const WrappedAuthPopup = withModal(AuthPopup)

export { WrappedAuthPopup as AuthPopup }
```

使用高阶组件和特殊的装饰器语法将如下所示：

```js
@withModal()
const AuthPopup = ({ onModalVisibilityToggle }) => {
  // Component
}

export { AuthPopup }
```

重要提示：函数装饰器不是当前提案的一部分。然而，它们在可能被考虑用于未来装饰器规范的事物清单上。

再次强调，所有样板代码都已经消失，只留下了真正重要的部分。

也许一些读者在这里没有看到任何特别之处。在上面的示例中，只使用了一个装饰器。让我们看一个这样的例子：

```js
const AuthPopup = ({
  onSubmit,
  onFocusTrapInit,
  onModalVisibilityToggle,
}) => {
  // Component
}

const WrappedAuthPopup = withForm(
  withFocusTrap(
    withModal(AuthPopup)
  ), {
  mode: 'submit',
})

export { WrappedAuthPopup as AuthPopup }
```

注意到那些难以阅读的嵌套了吗？你花了多少时间才能理解代码中到底发生了什么？现在，让我们看看同样的例子，但使用装饰器语法：

```js
@withForm({ mode: 'submit' })
@withFocusTrap()  
@withModal()
const AuthPopup = ({
  onSubmit,
  onFocusTrapInit,
  onModalVisibilityToggle,
}) => {
  // Component
}

export { AuthPopup }
```

你难道不同意，按顺序从上到下的代码比之前嵌套函数调用的示例更易读吗？

高阶函数 debounce 和高阶组件 withModal 只是装饰器模式在日常生活中应用的几个例子。这种模式可以在我们经常使用的许多框架和库中找到，尽管我们许多人经常不太注意它。试着分析你正在处理的项目，寻找装饰器模式应用的地方。你可能会发现不止一个这样的例子。

## JavaScript 实现

在我们深入讨论装饰器提案及其实现之前，我想让我们先看一下这张图片：

![Old browser](https://res.cloudinary.com/practicaldev/image/fetch/s--Lrlx3swg--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fd701nqukwdq6udx84rw.png)

通过这幅图像，我想提醒你 JavaScript 语言最初被创建的主要目的。我不是那些喜欢抱怨说：“哦，JavaScript 只适用于突出显示表单字段”的人。通常，我称这样的人为“dinosaurs”。

JavaScript 主要关注我们编写代码的最终用户。这是一个至关重要的观点，因为每当在 JavaScript 语言中引入新功能，比如类与其他编程语言中不同的实现，同样的抱怨者就会出现并开始哀叹事情并非以用户友好的方式完成。相反，在 JavaScript 中，一切都是以最终用户为考量而设计的，这是其他编程语言无法夸耀的地方。

如今，JavaScript 不仅仅是一种浏览器语言。它可以在各种环境中运行，包括服务器端。负责向语言引入新功能的 TC39 委员会面临着满足所有平台、框架和库需求的艰巨任务。然而，主要关注点仍然是浏览器中的最终用户。

### 装饰器的历史

为了更深入地了解这一提议的历史，让我们回顾一下一系列关键事件。

**2014年4月 - 阶段0。**装饰器是由Yehuda Katz提出的，最初打算成为ECMAScript 7的一部分。

```js
type Decorator = (
  target: DecoratedClass,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor | void

function debounce(delay: number): PropertyDescriptor {
  return (target, propertyKey, descriptor) => {
    let lastTimeout: number
    const method = descriptor.value

    descriptor.value = (...args: unknown[]) => {
      clearInterval(lastTimeout)

      lastTimeout = setTimeout(() => method.call(null, ...args), delay)
    }

    return descriptor
  }
}
```

在这个阶段，你已经可以看到装饰器 API 为什么会在后来经历如此重大的变化之一。装饰器的第一个参数是整个类，即使你只是装饰其中的一个成员。此外，它假定开发人员可以改变这个类。JavaScript 引擎总是努力尽可能地进行优化，在这种情况下，开发人员对整个类的改变削弱了引擎提供的大量优化。后来，我们会看到，这确实是装饰器 API 多次重写的一个重要原因，几乎是从头开始。

**2015-03 – 阶段 1。**在没有重大变化的情况下，该提案进入了第二阶段。然而，发生了一件显著影响该提案进一步发展的事件：TypeScript 1.5 发布了，它支持装饰器。尽管装饰器被标记为实验性的（--experimentalDecorators），像 Angular 和 MobX 这样的项目开始积极地使用它们。此外，这些项目的整体工作流程假定专门使用装饰器。由于这些项目的流行，许多开发人员错误地认为装饰器已经成为官方 JS 标准的一部分。

这为 TC39 委员会带来了额外的挑战，因为他们不得不考虑开发者社区的期望和要求以及语言引擎中的优化问题。

**2016-07 – 阶段 2。**在装饰器提案达到第二阶段后，其 API 开始经历重大变化。此外，该提案曾一度被称为“JavaScript 的 ESnext 类特性”。在其开发过程中，有许多关于装饰器应该如何结构化的想法。为了全面了解整个变更历史，我建议查看该提案仓库中的提交记录。以下是装饰器 API 以前的一个示例。

```js
type Decorator = (args: {
  kind: 'method' | 'property' | 'field',
  key: string | symbol,
  isStatic: boolean,
  descriptor: PropertyDescriptor
}) => {
  kind: 'method' | 'property' | 'field',
  key: string | symbol,
  isStatic: boolean,
  descriptor: PropertyDescriptor,
  extras: unknown[]
}
```

在第二阶段结束时，装饰器API的形式如下所示：

```js
type Decorator = (
  value: DecoratedValue,
  context: {
    kind: 'class' | 'method' | 'getter' | 'setter' | 'field' | 'accessor',
    name: string | symbol,
    access?: {
      get?: () => unknown,
      set?: (value: unknown) => void
    },
    private?: boolean,
    static?: boolean,
    addInitializer?: (initializer: () => void) => void
  }
) => UpdatedDecoratedValue | void

function debounce(delay: number): UpdatedDecoratedValue {
  return (value, context) => {
    let lastTimeout = null

    return (...args) => {
      clearInterval(lastTimeout)

      lastTimeout = setTimeout(() => value.call(null, ...args), delay)
    }
  }
}
```

第二阶段历时6年，期间装饰器API经历了重大变化。然而，正如我们从上面的代码中可以看到的，变异被排除在外。这使得该提案对于JS引擎以及各种平台、框架和库更加可接受。但装饰器的发展历史并未结束。

2020年9月 - 宣布MobX 6。再见，装饰器。一些完全依赖装饰器的库开始摆脱旧的实现，因为他们意识到他们使用装饰器的方式将不再被标准化。

> “在MobX中，使用装饰器已不再是常态。对于一些人来说，这是个好消息，但其他人会讨厌它。这是理所当然的，因为我认为装饰器的声明性语法仍然是最好的。当MobX刚开始时，它是一个仅支持TypeScript的项目，所以装饰器是可用的。虽然是实验性的，但显然它们很快就会被标准化。至少这是我的期望（之前我主要做Java和C#）。然而，那一刻仍未到来，与此同时两个装饰器提案已经被取消。尽管它们仍然可以被转译。”
> © Michel Weststrate，MobX的作者

**2022年3月 - 阶段3。**经过多年的变化和完善，装饰器终于达到了第三阶段。在第二阶段的广泛调整和完善的基础上，第三阶段开始时并没有出现重大变化。一个特别的亮点是创建了一个名为装饰器元数据的新提案。

**2022年8月 - SpiderMonkey Newsletter。**SpiderMonkey，Firefox使用的浏览器引擎，成为第一个开始着手实现装饰器的引擎。像这样的实现表明该提案基本准备好成为规范的一个完整部分。

**2022年9月 - Babel 7.19.0。**第三阶段的装饰器。在编译器中添加对一个提案的支持是一个非常重大的更新。大多数提案的标准中都会有类似的内容。

宣布 TypeScript 4.9 版本。ECMAScript 装饰器已列入 TS 4.9 迭代计划。然而，一段时间后，TS 团队决定将装饰器移到 5.0 版本。以下是作者的评论：

“虽然装饰器已经达到第三阶段，但我们发现规范中有一些行为需要与领导讨论。在解决这个问题并审查变化之间，我们预计装饰器将在下一个版本中实现。”

总的来说，这个决定是有道理的，因为他们不想冒着过早将一个功能纳入 TS 的风险，特别是如果它没有成为标准的一部分。这种情况总是有可能发生。虽然在这种情况下，它可能不像第一次实现那么重要。

在 TS 4.9 中，只有装饰器规范的一小部分被包括进来 – 类自动访问器。装饰器规范的这一补充作为对实现初期普遍存在的突变的修正。其背后的原因是经常希望使属性具有响应性，这意味着在属性更改时应发生一些效果，比如 UI 重新渲染，例如：

```js
class Dashboard extends HTMLElement {
  @reactive
  tab = DashboardTab.USERS
}
```

在旧的实现中，使用reactive装饰器时，您必须通过添加额外的设置和获取访问器来改变目标类以实现期望的行为。而使用自动访问器，这种行为现在变得更加明确，从而使引擎能够更好地优化它。

```js
class Dashboard extends HTMLElement {
  @reactive
  accessor tab = DashboardTab.USERS
}
```

装饰器的工作原理也是一个有趣的事情。由于TS团队无法移除在--experimentalDecorators标志下运行的旧实现，他们决定采取以下方法：如果配置中存在--experimentalDecorators标志，则将使用旧实现。如果不存在该标志，则将使用新实现。

**2023年3月 - TypeScript 5.0 发布。**正如承诺的那样，TS团队在TS 5.0中发布了完整版本的装饰器规范。

**2023年3月 - Deno 1.32。**尽管在1.32版本中Deno支持了TS 5.0，但他们决定推迟与装饰器相关的功能。

“请注意，ES装饰器尚未得到支持，但我们将努力在未来版本中默认启用它们。”

**2023年5月 - Angular v16发布。**Angular 16还增加了对ECMAScript装饰器的支持。然而，一些围绕装饰器构建的其他框架（受Angular启发？）已经表示他们暂时不会针对ECMAScript装饰器进行更改。对于他们中的许多人来说，元数据和参数装饰器是两个重要的方面。

> “我认为在元数据支持和参数装饰器实现之前，我们不会支持JS装饰器。”
> © Kamil Mysliwiec，NextJS的创始人

**2023年8月 - TypeScript 5.2 发布。**在TS 5.2中，又添加了一个与装饰器规范相辅相成的标准 - 装饰器元数据。该提案的主要思想是简化装饰器对其所用类的元数据的访问。关于语法和使用方式为何存在如此多的争论的另一个原因是，作者们不得不为此目的创建一个完全独立的提案。

## JavaScript中的装饰器只是一种语法糖吗？

经过所有的解释和示例，你可能会有一个问题：“那么，在JavaScript中，装饰器只是具有特殊语法的高阶函数，就是这样吗？”。

事实并不那么简单。除了之前提到的JavaScript主要关注最终用户的内容之外，还值得补充的是，JS引擎总是试图使用新语法作为参考点，至少试图加快JavaScript的运行速度。

```js
import { groupBy } from 'npm:lodash@4.17.21'

const getGroupedOffersByCity = (offers) => {
  return groupBy(offers, (it) => it.city.name)
}

// OR ?

const getGroupedOffersByCity = (offers) => {
  return Object.groupBy(offers, (it) => it.city.name)
}
```

虽然看起来可能没有区别，但对于引擎来说确实有区别。只有在使用原生函数的第二种情况下，引擎才能尝试优化。

描述 JavaScript 引擎中优化工作的方式需要单独一篇文章。毫不犹豫地探索浏览器源代码或搜索文章，以更好地理解这个主题。

还要记住有许多 JavaScript 引擎，它们都以不同的方式进行优化。然而，如果您通过使用原生语法来帮助引擎，那么在大多数情况下，您的应用代码通常会运行得更快。

## 可能的扩展

规范中的新语法也为将来引入其他功能打开了大门。打个比方，考虑一下构造函数和类。当私有字段被引入规范时，它们被作为类的一个特性引入。对于那些坚决否认类的有用性并声称构造函数是等效的人来说，私有字段成为另一个远离构造函数、转向类的理由。这样的功能可能会不断演变。

虽然我们目前在许多情况下可以通过使用高阶函数来实现与装饰器相同的效果，但它们仍无法涵盖装饰器规范将来可能添加的所有潜在功能。

装饰器规范存储库中的“可能的扩展”文件提供了装饰器规范可能在未来发展的见解。一些观点在最初阶段列出，但在当前标准中并不存在，比如参数装饰器。然而，也提到了一些全新的概念，比如const/let装饰器或块装饰器。这些潜在的扩展展示了JavaScript中装饰器功能的不断发展和扩展。

事实上，有许多提案和扩展正在考虑进一步增强装饰器规范。其中一些提案，比如装饰器元数据，甚至在核心装饰器规范尚未标准化的情况下已经在考虑之中。这凸显了装饰器在规范中有着光明的未来，并且我们可以期待它们在不久的将来成为标准的一部分。

## 结论

在过去的10年中对装饰器提案进行了深入的考虑，这似乎确实是一个很长的时间。诚然，早期领先框架和库对装饰器的早期采用在发现最初实现的缺陷方面发挥了作用。然而，这种早期采用也作为宝贵的学习经验，突显了与Web平台协调和开发解决方案的重要性，使其与平台和开发者社区保持一致，同时保留装饰器的本质。对提案的完善所花费的时间最终有助于使其成为JavaScript语言更加健壮和深思熟虑的补充。

的确，装饰器将会对我们今天编写应用程序的方式带来重大变化。也许不会立即产生影响，因为当前的规范主要侧重于类，但随着所有的补充和不断进行的工作，许多应用程序中的JavaScript代码很快就会有所不同。我们现在比以往任何时候都更接近最终能够看到规范中真正的装饰器的时刻。这是一项令人兴奋的进展，承诺增强JavaScript应用程序的表现力和功能。