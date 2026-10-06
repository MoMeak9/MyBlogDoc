> 标题：Top 5 Node.js Tools for Debugging and Profiling
> 
> 作者：[Binara Prabhanga](https://binaraprabhanga.medium.com/?source=post_page-----bee7c4c83592--------------------------------)
> 
> 链接：https://blog.bitsrc.io/top-5-node-js-tools-for-debugging-and-profiling-bee7c4c83592

[Node.js](https://nodejs.org/en)需要适当的工具进行调试和分析。

调试和分析是查找和修复错误、测量和优化性能，同时确保Node.js应用程序的质量和效率的重要过程。

*但是，Node.js有许多工具可用于调试和分析应用程序，那么如何选择最适合你需求的工具呢？*

好吧，这就是本文的目的。让我们看一下用于调试和分析的前 5 个Node.js工具。

## 1. Node.js内置调试器

[Node.js 内置调试器](https://nodejs.org/en/guides/debugging-getting-started/)是Node.js本身附带的简单有效的工具。你可以使用它来检查代码、设置断点和监视变量。要使用它，你只需要使用 `--inspect` 标志运行 Node.js 应用程序，并使用 Chrome DevTools 或 Node 调试客户端连接到它。

**代价**：Node.js内置调试器是免费使用的，因为它是Node.js平台的一部分。你可以从其官方[网站](https://nodejs.org/en)下载Node.js。

若要设置和使用 Node.js 内置调试器，可以执行以下步骤：

**步骤 01**

创建Node.js应用或使用现有应用。在这个例子中，我将使用一个简单的应用程序，它打印“Hello， world！”，然后抛出一个错误。完成后将其另存为项目文件夹中的`app.js`。

```js
// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
  throw new Error('Oops!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

**步骤 02**

打开终端并导航到你的项目文件夹。然后，使用以下命令运行应用。

```shell
node --inspect app.js
```

这将启动你的应用程序并启用调试器。你应该在终端中看到如下消息：

```shell
Debugger listening on ws://127.0.0.1:9229/uuid-here
For help, see: https://nodejs.org/en/docs/inspector
Hello, world!
```

**步骤03**

打开另一个终端并运行命令 `node inspect 127.0.0.1:9229/uuid-here`，将 `uuid-here` 部分替换为上一条消息中的实际 UUID。这将连接到调试器并暂停应用程序的执行。你应该看到如下提示：

```shell
< Debugger listening on ws://127.0.0.1:9229/uuid-here
< For help, see: https://nodejs.org/en/docs/inspector
connecting to 127.0.0.1:9229/uuid-here ... ok
break in app.js:1
> 1 console.log('Hello, world!');
  2
  3 throw new Error('Oops!');
debug>
```

**步骤04**

在调试提示符下，你可以使用各种命令来控制应用程序的执行并检查其状态。你可以使用 `n`、`c`、`s`、`o`、`repl`、`watch`、`list`、`setBreakpoint` 等命令来控制和检查你的应用。让我们使用 `n` 命令单步执行下一行。此时应该看到 `console.log` 语句的输出和当前行已更新为 `throw` 语句。

```shell
debug> n
Hello, world!
break in app.js:3
  1 console.log('Hello, world!');
  2
> 3 throw new Error('Oops!');
  4
debug>
```

**步骤05**

接下来，让我们使用 `c` 命令继续执行，直到下一个断点或应用程序结束。

```shell
debug> c
break in internal/errors.js:259
 257     }
 258   }
>259   return ${prefix}${this.message} ;
 260 };
 261
Watchers:
  0: Error = function Error() { [native code] }
```

**步骤06**

最后，使用`quit`命令退出调试器。

```shell
debug> quit
< undefined
```

以上就是使用 Node.js 内置调试器调试 Node.js 应用程序的基本步骤。

## 2. WebStorm

![0*Wxvgs2-VMkwNi24N](https://fs.lwmc.net/uploads/2024/02/1708182939723-202402172315235.webp)

WebStorm 是一款功能强大且多功能的 Node.js 开发 IDE，具有支持 Node.js 核心和流行框架的内置调试器。你可以使用它通过图形界面调试 Node.js 应用程序、动态编辑代码以及使用代码完成、重构、测试等各种功能。你可以从其官方[网站](https://www.jetbrains.com/webstorm/features/)下载WebStorm。

**代价：**WebStorm 具有不同的定价和许可选项。当前[价格](https://www.jetbrains.com/webstorm/buy/#commercial)如下：

> 译者：目前国区代理不同，价格也可能会有所不同

- **个人：** 第一年 69 美元，第二年 55 美元，第三年及以后 41 美元。
- **对于组织：** 第一年每位用户 159 美元，第二年 127 美元，第三年及以后 95 美元。
- **对于学生和教师：**免费。
- **对于开源项目：** 对于合格的项目免费。

要设置并使用 WebStorm 来调试 Node.js 应用程序，你可以按照以下步骤操作：

**步骤01**

使用你的应用程序文件创建或打开项目。对于此示例，我将使用一个简单的应用程序来打印“Hello, world!”然后抛出错误。

转到 `**Run | Edit Configurations**` 或单击工具栏上的`**Edit Configurations**` 按钮。在打开的对话框中，单击 `**Add**` 按钮，然后从列表中选择 `**Node.js**`。这将为你的应用程序创建一个新的 Node.js 运行/调试配置。

**步骤03**

在 `**Node.js**` 配置对话框中，设置 `name`、`interpreter`、`file`、<sd5你的应用的>参数和`environment`变量。单击`OK`保存配置并在工具栏上查看它。

**步骤04**

开始调试你的应用程序并使用调试工具栏和选项卡来控制和检查你的应用程序。你还可以通过将鼠标悬停在编辑器或 `**Debug Console**` 选项卡上或键入表达式来进行计算。

## 3. Node.js 内置分析器

![0*SRhFDxVVI7ebD3gA](https://fs.lwmc.net/uploads/2024/02/1708667896726-202402231358990.webp)

Node.js 内置分析器是 Node.js 附带的命令行工具，可帮助开发人员识别应用程序中的性能问题。它以 V8 日志文件的形式生成输出，可以对其进行分析以深入了解分析会话期间调用的函数及其执行时间

**代价**：Node.js 内置分析器可以免费使用，因为它是 Node.js 程序的一部分。

要设置并使用 Node.js 内置分析器来分析 Node.js 应用程序，你可以按照以下步骤操作。

**步骤01**

使用 `--prof` 标志和 `NODE_ENV=production` 变量运行你的应用程序。例如，

```js
NODE_ENV=production node --prof app.js
```

这将启动你的应用程序并在同一文件夹中生成一个日志文件，其名称类似于 `isolate-0x102801c00-v8.log`。

**步骤02**

通过向你的应用程序发送请求来增加一些负载。你可以使用curl 或ab (ApacheBench) 等工具来执行此操作。例如，

```shell
curl -X GET "http://localhost:3000/"
ab -k -c 20 -n 250 "http://localhost:3000/"
```

这将使用curl向你的应用程序发送一个GET请求，然后使用ab发送250个并发请求。

**步骤03**

使用 `Ctrl+C` 停止你的应用程序，并使用 `--prof-process` 标志处理日志文件。例如，

```js
node --prof-process isolate-0x102801c00-v8.log > profile.txt
```

这将在同一文件夹中创建一个 `profile.txt` 文件，其中包含处理后的数据。这将向你展示如下内容：

```js
Statistical profiling result from isolate-0x102801c00-v8.log, (250 ticks, 0 unaccounted, 0 excluded).

 [Shared libraries]:
   ticks  total  nonlib   name
      9    3.6%          /usr/lib/...
      2    0.8%          /usr/lib/...
```

## 4. 节点检查器

![0*nmqO_V9C8uhT0Rx6](https://fs.lwmc.net/uploads/2024/02/1708190438992-202402180120559.webp)

Node Inspector 是一个独立的调试器，提供与 Chrome DevTools 类似的体验。你可以使用它在单独的浏览器窗口中调试和分析 Node.js 应用程序，并具有实时代码编辑、性能分析等功能。

**代价**：Node Inspector 可以免费使用，因为它是开源且跨平台的软件。你可以使用 npm 安装它。

要设置并使用 Node Inspector 来分析 Node.js 应用程序，你可以按照以下步骤操作：

**步骤01**
使用 `npm` 全局安装它，并使用 `node-inspector` 命令启动它。

```
npm install -g node-inspector
node-inspector
```

这将启动 Node Inspector 并打印 URL 以在浏览器中访问它。默认情况下，它类似于 `http://127.0.0.1:8080/?port=5858`

**步骤02**
使用 `--inspect` 标志加  Node Inspector 相同的端口号运行你的应用程序。

```
node --inspect=5858 app.js
```

在浏览器中打开 Node Inspector URL，然后使用“配置文件”选项卡记录应用程序的 CPU 配置文件。

**步骤03**

要分析你的 Node.js 应用程序，请转到“配置文件”选项卡并单击“开始”按钮。这将开始记录你的应用程序的 CPU 配置文件。你可以通过向你的应用程序发送请求来增加一些负载，比如使用curl 或ab (ApacheBench) 等工具来执行此操作。

```
curl -X GET "http://localhost:3000/"
ab -k -c 20 -n 250 "http://localhost:3000/"
```

**步骤04**

单击“停止”按钮停止分析并查看分析报告以识别代码中的性能瓶颈和热点。

## 5. 代码调试器

![img](https://fs.lwmc.net/uploads/2024/02/1708190707774-202402180125283.webp)

**Visual Studio Code 调试器** 是一个功能丰富且用户友好的调试器，与流行的代码编辑器 Visual Studio Code 集成。你可以使用它通过图形界面调试 Node.js 应用程序、动态编辑代码以及使用各种扩展。

**代价**：Visual Studio Code 调试器可以免费使用，因为它是 Visual Studio Code 编辑器的一部分，而 Visual Studio Code 编辑器是一款开源跨平台软件。

要设置并使用 Visual Studio Code 调试器来调试和分析 Node.js 应用程序，你可以按照以下步骤操作：

**步骤01**

打开 Visual Studio Code 并创建一个新项目或打开现有项目。对于此示例，我将使用一个简单的 Express 应用程序来打印“Hello, world!”然后抛出错误。将其保存在你的项目文件夹中。

单击 Visual Studio Code 左侧活动栏中的 `**Run and Debug**` 图标，转到 `**Run and Debug**` 视图。如果尚未配置运行和调试（尚未创建 `launch.json`），Visual Studio Code 将显示“运行”启动视图。

**步骤02**

单击“运行开始”视图中的`**create a launch.json file**` 链接。选择 `**Node.js**` 作为环境。这将在项目的 `.vscode` 文件夹中生成一个 `launch.json` 文件，并具有一些默认设置。你可以根据需要编辑此文件。这是 launch.json 文件的示例

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/app.js",
      // Enable profiling for this configuration
      "profile": true
    }
  ]
}
```

**步骤03**

在代码中要暂停执行的位置设置断点。然后，开始调试你的应用程序并使用调试工具栏和选项卡来控制和检查你的应用程序。

**步骤04**

结束调试会话并打开 CPU 配置文件以查看应用程序的性能。有关详细信息，请参阅[在 Visual Studio Code 中调试](https://code.visualstudio.com/Docs/editor/debugging)。

**步骤05**

Visual Studio Code 调试器在调试后在 `.vscode` 文件夹中创建 CPU 配置文件。该文件显示了应用程序的 CPU 使用情况的火焰图，以及功能及其时间。你可以使用此信息来识别代码中的性能瓶颈和热点。有关更多信息，请参阅此处分析 Node.js 应用程序。

## 总结


调试和分析对于开发高质量且高性能的 Node.js 应用程序至关重要。

根据你的需求和偏好，你可能会发现更适合且更有效的适合你项目的不同工具。在选择工具时应考虑其功能、可用性和受欢迎程度。

通过比较和评估这些因素，你可以找到满足你期望的工具，并帮助你排查和优化 Node.js 应用程序。