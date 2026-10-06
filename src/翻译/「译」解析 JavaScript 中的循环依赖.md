我写了很多 JavaScript 代码，但循环依赖对我来说一直是个谜。错误信息总是显得随机且难以理解，有时甚至根本没有错误信息！我想更好地理解这个话题，所以进行了一系列实验，并想分享我学到的东西。让我们来解析 JavaScript 中的循环依赖。

## 什么是循环依赖？

当你的 JavaScript `import` 语句导致循环时，就会发生循环依赖：

![Diagram showing a two-way dependency loop and a three-way dependency loop.](https://www.bryanbraun.com/assets/images/circular-dependencies.svg)

循环可以由两个文件、三个文件或更多文件组成。

每当你的 `import` 语句创建这样的循环时，你的代码就有可能无法按预期工作。

## 如何知道何时存在循环依赖？

语言本身没有内置的简单方法！

在 JavaScript 中，循环依赖通常表现为一个看似无关的错误（如 `ReferenceError` 或 `TypeError` ）。这与许多其他编程语言不同，这些语言通常会直接告诉你导入有问题：

- Python: `ImportError`
- Go: `import cycle not allowed`

那么为什么 JavaScript 不能直接说⚠️ `CircularDependencyError` 呢？

这是因为 JavaScript 模块设计为按需加载和执行。

当你的浏览器加载一个网页并开始执行第一个 JavaScript 文件时，它并不知道还有多少文件即将到来。这些文件可能还存放在世界另一端的服务器上。

这与 Go 或 Python 程序的情况非常不同，后者的导入系统可以在执行任何一行代码之前分析整个依赖树。

## 逐步解析 JavaScript 中的循环依赖

解释 JavaScript 给出的错误的最佳方法是逐步解析一个循环依赖的场景：

![A diagram showing step-by-step execution of code leading to a circular dependency error.](https://www.bryanbraun.com/assets/images/circular-dependencies.png)

这是我们在每一步中看到的内容：

步骤 1：在 `index.js` 的第 1 行，执行暂停以下载 `a.js` ，以便可以导入其值 `a` 。

步骤 2：下载 `a.js` 后，执行在 `a.js` 中继续，但在第 1 行暂停以下载 `b.js` ，以便可以导入其值 `b` 。

步骤 3：下载 `b.js` 后，执行在 `b.js` 中继续，并在第 1 行找到一个指向 `a.js` 的导入（循环导入）。

步骤 4： `a.js` 已经下载，但由于此时我们尚未执行 `a.js` 中第 1 行之后的内容，因此它没有定义任何导出。因此，我们无法满足 `b.js` 中的导入。

第 5 步：执行在 `b.js` 中继续， `a` 仍未初始化。当在第 3 行调用 `a` 时，程序报错： `ReferenceError: Cannot access 'a' before initialization` 。

总结一下，循环依赖导致代码在未初始化的值下执行。这可能会导致各种错误，比如上面的 `ReferenceError` 。

## 为什么循环依赖有时不会导致错误？

JavaScript 的导入被描述为“实时绑定”。这意味着导入的值可能一开始是未初始化的（由于循环依赖），但在代码的其余部分被评估后变得完全可用。换句话说，一些循环依赖是无错误的，因为它们在你调用受影响的代码之前“自行解决”。

我曾经在一个充满循环导入的代码库中工作，但它们从未引起任何问题。为什么？

这是因为所有代码都定义在函数中，这些函数在所有内容加载完毕之前都不会被调用。

为了演示，我们可以更新最后一个场景，使其以类似的方式工作：

![A diagram showing step-by-step execution circular dependency code without any errors.](https://www.bryanbraun.com/assets/images/circular-dependencies-2.png)

步骤 1-4 与上述相同，但从步骤 5 开始有所变化：

步骤 5： `a` 仍然未初始化，但不是直接调用，而是被放入函数定义中（无错误）。

步骤 6： `b.js` 完成后， `a.js` 中的执行继续到第 3 行，该行定义了 `a` 的导出。从这一点开始，任何调用 `a` 的代码都将获得一个初始化值，这是由于实时绑定的结果。

步骤 7：我们成功调用了 `a()` ，它又调用了 `b()` 。最终，所有代码都被调用且没有错误。

总结来说，当我们实际调用那个“未初始化的 a”时，实时绑定已经更新了它的值，它不再是未初始化的。我们之所以安全，是因为 `a` 的值只在变量实际使用时才会被获取。

现在，我不会推荐用这种方式来解决依赖问题。我更倾向于彻底移除循环依赖。不过，我打赌有很多生产应用目前依赖于这种行为来处理循环依赖。

## 防止循环依赖

虽然 JavaScript 可能没有内置的循环依赖检查，但我们仍有办法防止这些问题。

像 madge 和 eslint-plugin-import 这样的第三方工具可以对你的 JavaScript 代码库进行静态分析，并在循环依赖变得难以处理之前检测到它们。一些 monorepo 工具如 NX 和 Rush 在其工作流程中内置了类似的功能。

当然，最好的预防措施是一个组织良好的代码库，具有清晰的共享代码层次结构。

## Node / Bun / Webpack / 等呢？

我上面分享的例子主要关注“浏览器中的 ES 模块”这一使用场景，但 JavaScript 运行在许多不同的环境中。服务器端的 JavaScript 不需要通过网络下载其源代码（使其更像 Python），而像 Webpack 这样的打包工具可以将所有代码合并到一个文件中。在这些场景中，循环依赖是否是一个问题？

简而言之，是的。在我的实验中，我惊讶地发现浏览器、服务器和打包器的错误结果基本一致。

例如，使用 Webpack 时， `import` 语句被移除，但合并后的代码仍然产生相同的错误：

```js
// b.js
console.log('b.js:', a); // ReferenceError: Cannot access 'a' before initialization
const b = 'B';

// a.js
console.log('a.js:', b);
const a = 'A';
```

我还应该提到，虽然 Node.js 在使用 `import` 语法（ESM）时产生了相同的错误，但在使用 `require` 语法（CommonJS）时表现不同：

```js
$ node node-entry.cjs

(node:13010) Warning: Accessing non-existent property 'Symbol(nodejs.util.inspect.custom)' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:13010) Warning: Accessing non-existent property 'constructor' of module exports inside circular dependency
(node:13010) Warning: Accessing non-existent property 'Symbol(Symbol.toStringTag)' of module exports inside circular dependency
```

考虑到 CommonJS 是一个完全不同的导入系统，它并不符合 ECMAScript Modules 规范，这就说得通了。将两者进行比较就像是在比较苹果和橘子！

##  结论

循环依赖可能会让人困惑，但当你逐步分析场景时，它会变得更加清晰。一如既往，没有什么比通过实验来清晰理解这类问题更有效的方法了。

如果你想更详细地查看我的测试结果，请随时查看 repo。