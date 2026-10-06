其实就是一个用在console的加载动画显示器～

![image.png](https://github.com/sindresorhus/ora/raw/main/screenshot.svg)

### 安装

```shell
npm install ora
```

### 使用

```js
import ora from 'ora';

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);
```

### API

#### ora(text)

#### ora(options)

如果提供了字符串，则将其视为 [`options.text`](https://link.segmentfault.com/?enc=M8J9jWwpx5wG2mFWQHvdzg%3D%3D.qqpC33LLRQrwAs3lZzOEX4wEtZ7j44Q82nKM5eUtlJ0wp2CoSV7R4d8LbJJsaqaA)的快捷方式

##### options

Type: `object`

###### text

Type: `string`

在转轮后显示的文本。

###### prefixText

Type: `string | () => string`

文本或返回要在转轮前显示的文本的函数。如果设置为空字符串，将不显示前缀文本。

###### spinner

Type: `string | object`  
Default: `'dots'` <img src="https://github.com/sindresorhus/ora/raw/main/screenshot-spinner.gif" style="zoom: 20%;" />

如果您想测试不同的`spinner` ，请参阅repo中的 `example.js`。在Windows上，它总是使用`line`转轮，因为Windows命令行没有适当的Unicode支持。

或者像这样的对象:

```dts
{
    interval: 80, // Optional
    frames: ['-', '+', '-']
}
```

###### color

Type: `string`
Default: `'cyan'`
Values: `'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'`

转轮颜色

###### hideCursor

Type: `boolean`
Default: `true`

设置为false将阻止Ora隐藏光标

###### indent

Type: `number`
Default: `0`

用给定的空格数缩进微调格

###### interval

Type: `number`
Default: 由转轮提供或 `100`

每帧之间的间隔。

转轮提供了它们自己的推荐间隔，所以实际上不需要指定这个间隔。

###### stream

Type: `stream.Writable`
Default: `process.stderr`

流来写入输出。

例如，您可以将其设置为`process.stdout`。

###### isEnabled

Type: `boolean`

强制启用/禁用转轮。如果未指定，则如果流在TTY上下文中(未派生或管道传输)和/或不在CI环境中运行，则转轮将被启用。

注意 `{isEnabled: false}` 并不意味着它不会输出任何东西。它只是意味着它不会输出转轮、颜色和其他ansi转义代码。它仍然会记录文本。

###### isSilent

Type: `boolean`
Default: `false`

禁用转轮和所有日志文本。将考虑压制和启用所有输出`false`.

###### discardStdin

Type: `boolean`
Default: `true`

丢弃stdin输入(Ctrl+C除外) 当它是TTY运行。这可以防止转轮在输入时抖动，在按 Enter 键时输出折线，并防止在转轮运行时对输入进行缓冲。

这对Windows没有影响，因为没有好的方法来正确地实现丢弃stdin。

#### Instance

##### .start(text?)

启动转轮。返回的实例。如果提供了文本，则设置当前文本。

##### .stop()

停止并清除转轮。返回的实例。

##### .succeed(text?)

停止转轮，将其更改为绿色 `✔` 并持久化当前文本，或 `text` 如果提供。返回的实例。请看下面的GIF图

##### .fail(text?)

停止旋转，将其改为红色 `✖`并持久化当前文本，或 `text` 如果提供。返回的实例。请看下面的GIF。

##### .warn(text?)

停止转轮，将其更改为黄色 `⚠` 并持久化当前文本，或`text` 如果提供。返回的实例。

##### .info(text?)

停止转轮，将其更改为蓝色 `ℹ` 并持久化当前文本，或`text` 如果提供。返回的实例。

##### .isSpinning

一个布尔值，表示实例当前是否在旋转。

##### .stopAndPersist(options?)

停止转轮并更改符号或文本。返回的实例。请看下面的GIF。

###### options

Type: `object`

###### symbol

Type: `string`
Default: `' '`

将转轮替换为

###### text

Type: `string`
Default: Current `'text'`

将持久存储在符号之后的文本

###### prefixText

Type: `string`
Default: Current `prefixText`

将保存在符号之前的文本。如果设置为空字符串，将不显示前缀文本。

<img src="https://fs.lwmc.net/uploads/2023/03/1679908917314-202303271721896.webp" alt="img" style="zoom:33%;" />

##### .clear()

清理转轮。返回的实例。

##### .render()

手工渲染一个新帧。返回的实例。

##### .frame()

给一个新帧

##### .text

更改转轮后的文本。

##### .prefixText

更改转轮之前的文本。如果设置为空字符串，将不显示前缀文本。

##### .color

更改转轮颜色。

##### .spinner

改变转轮。

##### .indent

更改转轮缩进。

#### ora.promise(action, text)

#### ora.promise(action, options)

开始一个转轮的promise。如果promise实现，则在fulfills情况下使用`.succeed()`停止转轮;如果rejects，则使用.`fail()`停止转轮。返回转轮实例。

```js
import {oraPromise} from 'ora';

await oraPromise(somePromise);
```

##### action

Type: `Promise`

#### options

Type: `object`

所有 [options](https://github.com/sindresorhus/ora#options) 加上以下内容

##### successText

Type: `string | ((result: T) => string) | undefined`

当承诺被解决时，spinner的新文本。

如果未定义，则保留现有文本。

##### failText

Type: `string | ((error: Error) => string) | undefined`

当承诺被拒绝时，作为spinner的新文本。

如果未定义，则保留现有文本。

### spinners

Type: `Record<string, Spinner>`

所有 [provided spinners](https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json).

### Example

```js
import process from 'node:process';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import ora from 'ora';

const spinner = ora({
	discardStdin: false,
	text: 'Loading unicorns, not discarding stdin',
	spinner: process.argv[2],
});

const spinnerDiscardingStdin = ora({
	text: 'Loading unicorns',
	spinner: process.argv[2],
});

spinnerDiscardingStdin.start();

setTimeout(() => {
	spinnerDiscardingStdin.succeed();
}, 1000);

setTimeout(() => {
	spinnerDiscardingStdin.start();
}, 2000);

setTimeout(() => {
	spinnerDiscardingStdin.succeed();
	spinner.start();
}, 3000);

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = `Loading ${chalk.red('rainbows')}`;
}, 4000);

setTimeout(() => {
	spinner.color = 'green';
	spinner.indent = 2;
	spinner.text = 'Loading with indent';
}, 5000);

setTimeout(() => {
	spinner.indent = 0;
	spinner.spinner = 'moon';
	spinner.text = 'Loading with different spinners';
}, 6000);

setTimeout(() => {
	spinner.prefixText = chalk.dim('[info]');
	spinner.spinner = 'dots';
	spinner.text = 'Loading with prefix text';
}, 8000);

setTimeout(() => {
	spinner.prefixText = '';
	spinner.suffixText = chalk.dim('[info]');
	spinner.text = 'Loading with suffix text';
}, 10_000);

setTimeout(() => {
	spinner.prefixText = chalk.dim('[info]');
	spinner.suffixText = chalk.dim('[info]');
	spinner.text = 'Loading with prefix and suffix text';
}, 12_000);

setTimeout(() => {
	spinner.stopAndPersist({
		prefixText: '',
		suffixText: '',
		symbol: logSymbols.info,
		text: 'Stopping with different text!',
	});
}, 14_000);

```

