# **yargs** 使用指南 - 优雅处理命令行参数

在现代软件开发中，命令行界面是一个非常常见的用户界面，用于与应用程序进行交互。处理命令行参数是命令行界面的重要部分，它可以让用户通过命令行输入不同的选项和参数来配置应用程序的行为。在 Node.js 中，yargs 是一个流行的库，用于处理命令行参数，它提供了许多功能和选项，使得处理命令行参数变得非常简单和优雅。

## 什么是 yargs？
yargs 是一个用于处理命令行参数的 Node.js 库，它提供了一个简洁和灵活的方式来解析和处理命令行参数。它允许你定义应用程序的命令和选项，并自动处理用户在命令行中输入的参数。yargs 还支持许多高级功能，例如类型验证、默认值、别名、子命令等，使得处理复杂的命令行参数变得非常简单。

## 安装 yargs

在使用 yargs 之前，你需要先安装它。你可以使用 npm 或 yarn 进行安装，如下所示：

```shell
npm install yargs
```

或者

```shell
yarn add yargs
```

安装完成后，你可以在你的 Node.js 项目中引入 yargs：

```js
const yargs = require('yargs')
```

or

```js
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

yargs(hideBin(process.argv))
// 其他方法
```

> 注意：hideBin是process.argv.slice(2)的一个缩写。它的好处是考虑到了某些环境下的变化，例如Electron。
>
> 不使用这种缩写则是长这样
>
> ```js
> const yargs = require('yargs/yargs')(process.argv.slice(2))
> ```

## yargs 的基本用法

yargs 提供了一种简单的方式来定义命令和选项，并处理用户在命令行中输入的参数。下面是 yargs 的基本用法：

yargs 提供了一种简单的方式来定义命令和选项，并处理用户在命令行中输入的参数。下面是 yargs 的基本用法：

1. 定义命令：

```js
yargs.command('hello', 'Prints hello world', (yargs) => {}, (argv) => {});
```

在这个例子中，我们使用 `command` 方法来定义一个名为 `hello` 的命令。`hello` 命令的描述是 `Prints hello world`。`command` 方法接受两个回调函数作为参数。第一个回调函数用于定义命令的选项，我们可以在这里配置命令的参数、别名、类型、默认值等。第二个回调函数用于处理用户在命令行中输入的参数，我们可以在这里编写具体的命令逻辑。

1. 定义选项：

```js
.option('name', {
  alias: 'n',
  description: 'Your name',
  type: 'string',
  demandOption: true
})
```

在这个例子中，我们使用 `option` 方法来定义一个名为 `name` 的选项，它的别名是 `n`。`description` 字段用于定义选项的描述信息。`type` 字段用于指定选项的类型，这里我们指定为 `string`。`demandOption` 字段用于指定选项是否为必需的，这里我们将其设置为 `true`，表示 `name` 选项是必需

当我们定义了命令和选项后，我们可以通过调用 `argv` 方法来解析命令行参数并获取用户输入的值：

```js
const argv = yargs.argv;
```

`argv` 对象将包含解析后的命令行参数的值，可以通过属性的方式来访问。例如，对于上面定义的 `name` 选项，我们可以通过 `argv.name` 来获取用户输入的 `name` 参数的值。

除了基本的命令和选项定义外，yargs 还提供了许多其他功能，例如：

- 默认值：你可以通过 `default` 方法为选项设置默认值，当用户没有输入该选项时，将使用默认值。

```js
.option('age', {
  description: 'Your age',
  type: 'number',
  default: 18
})
```

- 别名：你可以通过 `alias` 字段为选项设置别名，使得用户可以使用更短的命令来输入参数。

```js
.option('gender', {
  alias: 'g',
  description: 'Your gender',
  type: 'string'
})
```

- 类型验证：你可以通过 `type` 字段来指定选项的类型，并进行类型验证。yargs 支持多种类型，如 string、number、boolean 等。
- 参数校验：你可以通过 `check` 方法来添加自定义的参数校验逻辑，以确保用户输入的参数符合预期的格式和值。

```js
.check((argv) => {
  if (argv.age < 0) {
    throw new Error('Age cannot be negative');
  }
  return true;
})
```

- 子命令：你可以通过 `command` 方法来定义子命令，从而实现更复杂的命令行界面。

```js
yargs.command('add', 'Add a new item', (yargs) => {}, (argv) => {})
```

这只是 yargs 提供的一些基本功能，还有很多其他高级功能可以帮助你更好地处理命令行参数，如自动生成帮助信息、处理位置参数、支持多级命令等。

在编写命令行应用程序时，yargs 可以帮助你优雅地处理命令行参数，简化开发过程，提高代码的可读性和可维护性。

## 总结

在本篇文章中，我们介绍了 yargs 的基本用法，包括定义命令和选项、设置默认值、别名、类型验证、参数校验和子命令等功能。yargs 是一个功能丰富且易于使用的 Node.js 库，可以帮助你在命令行应用程序中优雅地处理命令行参数。希望这篇博客对你学习和使用 yargs 提供了一些帮助，让你能够更加轻松地处理命令行参数，并编写出高质量的命令行应用程序。

## 参考

- [yargs - npm](https://www.npmjs.com/package/yargs)
- [yargs.org](http://yargs.js.org/)
