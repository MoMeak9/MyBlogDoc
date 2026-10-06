> 原文：[Static vs Unit vs Integration vs E2E Testing for Frontend Apps --- 前端应用的静态测试与单元测试与集成测试与E2E测试](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests)
> 
> 标题：Static vs Unit vs Integration vs E2E Testing for Frontend Apps
> 
> 作者：Kent C. Dodds

在我的采访“Testing Practices with [J.B. Rainsberger](https://twitter.com/jbrains)”中，[TestingJavaScript.com](https://testingjavascript.com/)给了我一个我很喜欢的比喻。他说：

> You can throw paint against the wall and eventually you might get most of the wall, but until you go up to the wall with a brush, you'll never get the corners. 🖌️ 
>
> 你可以把颜料往墙上扔，最终你可能会图到大部分的墙，但除非你拿着刷子到墙上，否则你永远不会画出角落。️

我喜欢这个比喻，因为它基本上是在说，选择正确的测试策略，就像选择画笔粉刷墙壁一样。你会用细点刷整个墙吗？当然不会，这将花费太长时间，最终结果也可能看起来不太均匀。你会用滚筒来油漆所有的东西吗？包括两百年前你的曾曾祖母从海外带来的那些镶嵌家具？不可能，不同的用例有不同的笔刷，同样的事情也适用于测试。

这就是为什么我创建了测试奖杯。从那时起， [Maggie Appleton](https://twitter.com/Mappletons) （[egghead.io](https://egghead.io/?af=5236ad)'精湛的艺术/设计背后的策划者）为[TestingJavaScript.com](https://testingjavascript.com/)创作了这个：

<img src="https://res.cloudinary.com/kentcdodds-com/image/upload/f_auto,q_auto,dpr_2.0,w_1600/v1625033466/kentcdodds.com/content/blog/unit-vs-integration-vs-e2e-tests/testing-trophy.png" alt="The Testing Trophy" style="zoom:25%;" />


在测试奖杯中，有四种测试类型。上面显示了这段文字，但为了那些使用辅助技术的人（以及图像无法加载的情况下），我将从上到下写出这里的内容：

- 端到端 **End to End**：一个像用户一样行为的辅助机器人，点击应用程序并验证其正确运行。有时称为“功能测试”或e2e。
- 集成 **Integration**：验证几个单元之间的协调工作。
- 单元 **Unit**：验证单独的、隔离的部分按预期工作。
- 静态 **Static**：在编写代码时捕捉拼写错误和类型错误。

这些测试形式在奖杯上的大小与你在测试应用程序时应给予它们的关注程度有关（通常情况下）。我想深入探讨这些不同形式的测试，它们在实际中意味着什么，以及我们可以做些什么来优化我们的测试效果。

## 测试类型

让我们自上而下地看一些此类测试的示例：

### 端到端测试 End to End

通常，这些将运行整个应用程序（前端和后端），并且测试将像典型用户一样与应用程序交互。这些测试是用[cypress](https://cypress.io/)编写的。

```js
import {generate} from 'todo-test-utils'

describe('todo app', () => {
  it('should work for a typical user', () => {
    const user = generate.user()
    const todo = generate.todo()
    // here we're going through the registration process.
    // I'll typically only have one e2e test that does this.
    // the rest of the tests will hit the same endpoint
    // that the app does so we can skip navigating through that experience.
    cy.visitApp()

    cy.findByText(/register/i).click()

    cy.findByLabelText(/username/i).type(user.username)

    cy.findByLabelText(/password/i).type(user.password)

    cy.findByText(/login/i).click()

    cy.findByLabelText(/add todo/i)
      .type(todo.description)
      .type('{enter}')

    cy.findByTestId('todo-0').should('have.value', todo.description)

    cy.findByLabelText('complete').click()

    cy.findByTestId('todo-0').should('have.class', 'complete')
    // etc...
    // My E2E tests typically behave similar to how a user would.
    // They can sometimes be quite long.
  })
})
```

### 集成测试 **Integration**

下面的测试呈现完整的应用程序。这不是集成测试的要求，我的大多数集成测试都不会呈现完整的应用程序。然而，它们将使用我的应用程序中使用的所有提供程序进行渲染（这就是`render` 虚构的“ `test/app-test-utils`”模块中的方法的作用）。集成测试背后的想法是尽可能少地模拟。我几乎只是mock：

1. 网络请求（使用[MSW](https://mswjs.io/)）

2. 负责动画的组件（因为谁愿意在你的测试中等待它？）

```js
import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from 'test/app-test-utils'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import App from '../app'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// integration tests typically only mock HTTP requests via MSW
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test(`logging in displays the user's username`, async () => {
  // The custom render returns a promise that resolves when the app has
  //   finished loading (if you're server rendering, you may not need this).
  // The custom render also allows you to specify your initial route
  await render(<App />, {route: '/login'})
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // assert whatever you need to verify the user is logged in
  expect(screen.getByText(username)).toBeInTheDocument()
})
```

对于这些，我通常还会[全局配置](https://jestjs.io/docs/configuration#resetmocks-boolean)一些东西，比如在测试之间自动重置所有mocks。

[testing-library.com/docs/react-testing-library/setup/](https://testing-library.com/docs/react-testing-library/setup/) 了解如何在React Testing Library安装文档中设置一个test-utils文件。

### 单元测试 Unit  

```js
import '@testing-library/jest-dom/extend-expect'
import * as React from 'react'
// if you have a test utils module like in the integration test example above
// then use that instead of @testing-library/react
import {render, screen} from '@testing-library/react'
import ItemList from '../item-list'

// Some people don't call these a unit test because we're rendering to the DOM with React.
// They'd tell you to use shallow rendering instead.
// When they tell you this, send them to https://kcd.im/shallow
test('renders "no items" when the item list is empty', () => {
  render(<ItemList items={[]} />)
  expect(screen.getByText(/no items/i)).toBeInTheDocument()
})

test('renders the items in a list', () => {
  render(<ItemList items={['apple', 'orange', 'pear']} />)
  // note: with something so simple I might consider using a snapshot instead, but only if:
  // 1. the snapshot is small
  // 2. we use toMatchInlineSnapshot()
  // Read more: https://kcd.im/snapshots
  expect(screen.getByText(/apple/i)).toBeInTheDocument()
  expect(screen.getByText(/orange/i)).toBeInTheDocument()
  expect(screen.getByText(/pear/i)).toBeInTheDocument()
  expect(screen.queryByText(/no items/i)).not.toBeInTheDocument()
})
```

每个人都称之为单元测试，他们是正确的：

```js
// pure functions are the BEST for unit testing and I LOVE using jest-in-case for them!
import cases from 'jest-in-case'
import fizzbuzz from '../fizzbuzz'

cases(
  'fizzbuzz',
  ({input, output}) => expect(fizzbuzz(input)).toBe(output),
  [
    [1, '1'],
    [2, '2'],
    [3, 'Fizz'],
    [5, 'Buzz'],
    [9, 'Fizz'],
    [15, 'FizzBuzz'],
    [16, '16'],
  ].map(([input, output]) => ({title: `${input} => ${output}`, input, output})),
)
```

### 静态测试 Static 

```js
// can you spot the bug?
// I'll bet ESLint's for-direction rule could
// catch it faster than you in a code review 😉
for (var i = 0; i < 10; i--) {
  console.log(i)
}

const two = '2'
// ok, this one's contrived a bit,
// but TypeScript will tell you this is bad:
const result = add(1, two)
```

## 我们为什么要再测试一次？

我认为重要的是要记住我们为什么要写测试。你为什么要写测试？是因为我让你这么做的吗是不是因为你的PR会被拒绝，除非它包括测试？是因为测试增强了你的工作流程吗？

我写测试的最大和最重要的原因是信心。我希望我为未来编写的代码不会破坏我今天在生产环境中运行的应用程序。所以无论我做什么，我都希望确保我编写的测试能给我带来最大的信心，我需要意识到我在测试时所做的权衡。

## 我们来谈谈权衡

我想在这张图片中（从[我的幻灯片](https://slides.com/kentcdodds/confident-react)中摘录）指出测试奖杯的一些重要元素：

![The Testing Trophy with arrows indicating the trade-offs](https://fs.lwmc.net/uploads/2023/09/2023/09/1693930888344-202309060021827.webp)

图中的箭头表示在编写自动化测试时需要做出的三个权衡：

### 开销: ￠ heap ➡ 💰🤑💰

随着测试奖杯的提升，测试的成本也越来越高。这是以在持续集成环境中运行测试的实际资金的形式出现的，但也是工程师编写和维护每个单独测试所花费的时间。

奖杯越高，失败点就越多，因此测试失败的可能性就越大，导致需要更多的时间来分析和修复测试。记住这一点，因为它很重要#预示……

### 速度: 🏎💨 ➡ 🐢

随着测试奖杯的上升，测试通常运行得更慢。这是因为你在测试奖杯上的位置越高，你的测试运行的代码就越多。单元测试通常测试一些没有依赖关系的小东西，或者将模拟这些依赖关系（有效地将数千行代码交换为几行代码）。记住这一点，因为它很重要#预示……

### 信心: Simple problems 👌 ➡ Big problems 😖

当人们谈论测试金字塔时，通常会提到成本和速度的权衡。🔺如果这些是唯一的权衡，那么我会把100%的精力集中在单元测试上，而在测试金字塔中完全忽略任何其他形式的测试。当然，我们不应该这样做，这是因为一个超级重要的原则，你可能已经听我说过：

> The more your tests resemble the way your software is used, the more confidence they can give you.
>
> 你的测试越像你的软件的使用方式，他们可以给予你更多的信心。

这是什么意思？这意味着没有更好的方法来确保你的玛丽阿姨将能够使用你的税务软件申报她的税收，而不是让她这样做。但我们不想等玛丽阿姨帮我们找到虫子对吧？这将花费太长的时间，她可能会错过一些我们可能应该测试的功能。再加上我们定期发布软件更新的事实，任何数量的人类都无法跟上。

那我们该怎么办我们会做出取舍。我们要怎么做我们编写测试我们软件的软件。当我们这样做的时候，我们总是在做权衡，现在我们的测试不像我们的软件被使用的方式，像我们让玛丽阿姨测试我们的软件时那样可靠。但我们这样做是因为我们用这种方法解决了真实的问题。这就是我们在每个级别的测试奖杯上所做的。

当你在测试奖杯上移动时，你会增加我所说的“置信系数”。“这是每个测试可以让你达到这个水平的相对信心。你可以想象，奖杯上方是人工测试。这会让你从这些测试中获得很大的信心，但测试会非常昂贵和缓慢。

之前我告诉过你要记住两件事

> - The higher up the trophy you go, the more points of failure there are and therefore the more likely it is that a test will break
>
>   奖杯越高，失败点就越多，因此测试失败的可能性就越大
>
> - Unit tests typically test something small that has no dependencies or will mock those dependencies (effectively swapping what could be thousands of lines of code with only a few).
>
>   单元测试通常测试一些没有依赖关系的小东西，或者将模拟这些依赖关系（有效地将数千行代码交换为几行代码）。

他们说的是，奖杯越低，测试测试的代码就越少。如果你在一个较低的级别上运行，你需要更多的测试来覆盖你的应用程序中相同数量的代码行，因为一个单一的测试可以提高奖杯。事实上，当你把测试奖杯放得更低时，有些东西是不可能测试的。

特别是，静态分析工具无法让你对业务逻辑充满信心。单元测试无法确保当你调用一个依赖时，你正在正确地调用它（尽管你可以断言它是如何被调用的，但你不能确保它在单元测试中被正确地调用）。UI集成测试无法确保你将正确的数据传递到后端，以及你正确地响应和解析错误。端到端测试的能力非常强，但通常你将在非生产环境（类似于生产环境，但不是生产环境）中运行这些测试，以权衡实用性的可靠性。

我们走另一条路吧。在测试奖杯的顶部，如果你尝试使用E2E测试来检查在表单和URL生成器之间的集成中键入某个字段并单击提交按钮的边缘情况，那么你将通过运行整个应用程序（包括后端）来完成大量设置工作。这可能更适合集成测试。如果你尝试使用集成测试来达到优惠券代码计算器的边缘情况，你可能会在设置函数中做大量工作，以确保你可以呈现使用优惠券代码计算器的组件，并且你可以在单元测试中更好地覆盖边缘情况。如果你试图使用单元测试来验证当你用字符串而不是数字调用add函数时会发生什么，你可以使用静态类型检查工具（如TypeScript）来更好地服务。

## 结论

每一级都有自己的取舍。E2E测试有更多的失败点，这使得跟踪导致中断的代码变得更加困难，但这也意味着你的测试给了你更多的信心。如果你没有太多的时间来编写测试，这一点尤其有用。我宁愿有信心，并面跟踪知道为什么它会失败，而不是没有抓住问题，通过将测试摆在首位。

最后，我真的不在乎这些区别。如果你想称我的单元测试为集成测试，甚至是E2E测试（有些人称之为🤷‍♂️），那就这样吧。我感兴趣的是，当我交付我的更改时，我是否有信心我的代码满足业务需求，并且我将使用不同测试策略的混合来实现该目标。

祝你好运！