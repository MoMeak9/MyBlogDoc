>  详细了解Express v5.0中的主要更改和改进以及如何迁移你的应用程序

Express. js终于在GitHub上发布了版本[5.0](https://github.com/expressjs/express/releases/tag/v5.0.0)。这是Express.js团队自2014年以来的第一个主要版本。

Express. js 5.0带来了一系列重要的更新、优化和删除。虽然它仍处于测试阶段，但此版本正在形成以提高性能并简化未来Node.js项目的开发。

> Express. js 5.0需要**Node.js 18或更高版本**，因此任何仍在使用旧版本的人都需要升级。

### 安装Express. js 5.0

要试用Express. js 5.0，请运行：

```npm
npm install --save express@next
```

确保在NPM上检查最新版本的Express. js。现在，让我们探索新功能以及你需要进行哪些更新。

### Express. js 5.0中的变化

在本节中，我将介绍Express. js 5.0中最重要的更改，并提供实用技巧来帮助你将现有应用顺利过渡到新版本。

#### 删除的方法和属性

一些遗留方法已被删除，如果你使用以下任何一种方法，你将需要重构代码：

1. `app.del()`-现在替换为`app.delete()`以符合现代JavaScript标准。是时候更新使用`app.del()`的所有实例了。
2. `app.param(fn)`-这个用于修改app.`param(name, fn)`的助手完全消失了。它已经被弃用了一段时间，现在是时候永远删除它了。
3. 复数方法-像`req.acceptsCharset()`这样的函数现在是复数的，例如，`req.acceptsCharsets()`。这是一个小变化，但对于保持代码兼容至关重要。
4. `req.param(name)`-此方法已被删除。相反，你现在需要显式使用`req.params`、`req.body`或`req.query`来检索参数。

#### 路径路由匹配更新

Express 5引入了路径路由匹配工作方式的变化。如果你的应用依赖于复杂的路由模式，你需要注意这些变化：

- 你现在可以使用`?`、`*`和`+`参数修饰符。
- RegExp语法更严格，因此必须将`/foo*`等路径更新为`/foo(.*)`

例如，如果你的代码之前匹配的路由如下：

```js
app.get('/user*', (req, res) => res.send('User'));
```

你需要将其更新为：

```js
app.get('/user(.*)', (req, res) => res.send('User'));
```

#### 拒绝承诺处理

Express. js 5使异步中间件和路由中的错误处理变得更加容易。被拒绝的承诺会自动传递给错误处理中间件。这简化了使用`async`函数时的错误管理。

例如：

```js
app.get('/route', async (req, res, next) => {
  const result = await someAsyncFunction();
  res.send(result);
});
```

如果`someAsyncFunction()`抛出错误，它会自动被错误处理程序捕获，你不再需要手动调用`next(err)`。

在Express. js 4中，如果你使用`async/await`并且Promise被拒绝（或抛出错误），你必须使用`next(err)`手动将错误传递给下一个中间件

```js
// Express 4
app.get('/route', async (req, res, next) => {
  try {
    const result = await someAsyncFunction();
    res.send(result);
  } catch (err) {
    next(err); // Manually pass the error to the error-handling middleware
  }
});
```

此设置需要`try/catch`块在每个使用`async/await`的路由或中间件中，以确保正确捕获错误并将其传递给Express. js的错误处理程序。

#### 放弃对旧Node. js版本的支持

Express. js 5正式采用Node.js 18作为支持的最低版本。这意味着如果你运行的是Node.js 14等旧版本，是时候升级你的Node.js环境了。

#### 重新引入`app.router`

在Express. js 4中删除的`app.router`对象已在Express.js 5中返回。然而，它现在只是对基本Express路由器的引用。你不再需要像在Express 3中那样显式加载它——当你开始使用路由时，它会自动可用。与Express 3等早期版本相比，这简化了事情。

```js
const express = require('express')
const app = express()

// Create a new router instance
const router = express.Router()

// Middleware that runs for any requests handled by this router
router.use((req, res, next) => {
  console.log('Router middleware triggered')
  next()
})

// Define a route that will handle requests to /events
router.get('/events', (req, res) => {
  res.send('Event list')
})

// Use the router for requests to /calendar
app.use('/calendar', router)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
```

- `router`对象处理所有以`/calendar`开头的请求
- 如果请求来到`/calendar/events`，路由器中间件运行，然后路由处理程序以“事件列表”响应。
- 路由器还可以处理多条路径，帮助你在应用程序的不同部分分离关注点。

#### 对无效状态码进行更严格的错误处理

如果你尝试在响应中使用无效的状态代码，Express. js 5现在将抛出错误。例如：

```js
// This will throw an error in Express.js 5
res.status(999).send('Invalid status');
```

在Express. js 4中，这将静默失败，但Express 5强制正确使用有效的HTTP状态代码。

#### `res.render()`的改进

`res.render()`方法现在在所有视图引擎之间强制执行异步行为。这可以防止由使用同步渲染的旧视图引擎引起的错误。

#### Express. js生态系统的显着增强

除了Express. js中的核心更改外，该项目还在相关包中看到了一些改进：

- 依赖项重构：Express. js 5现在使用`Array.flat()`等原生Node.js方法，而不是依赖`array-flatten`等包。此外，该项目删除了`path-is-absolute`等依赖项，更喜欢内置的`path.isAbsolute()`方法。
- **安全改进：**已添加威胁模型以提高项目内的安全意识和措施。CodeQL（静态应用程序安全测试）也已集成以捕获代码库中的漏洞。
- **CI改进：**持续集成（CI）管道已进行优化，以减少重复运行并提高效率。Node. js 22支持已添加到CI测试矩阵中，使Express.js与最新的Node.js版本兼容。
- **OSSF记分卡：**Express. js 5现在包含一个OSSF记分卡徽章，它提供了对项目安全运行状况和开源最佳实践的可见性。
- **更新的依赖项：**核心依赖项，如`encodeurl`、`send`、`cookie-parser`和`qs`都已更新到最新版本，以提高安全性、性能和与现代Node. js的兼容性。

------

#### 参考文献

1. https://expressjs.com/en/5x/api.html
2. https://expressjs.com/en/guide/migrating-5.html
3. https://github.com/expressjs/express/releases/tag/v5.0.0