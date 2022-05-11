# JavaScript 错误处理指南

## 什么是编程中的错误

我们的开发过程中并不总是一帆风顺。特别是在某些情况下，我们可能希望停止程序或在发生不良情况时通知用户。

例如：

- 程序试图打开一个不存在的文件、
- 网络连接断开
- 用户输入了无效字符

在类似这些情况下，我们可以自己写个自定义的错误来管理，或者直接让引擎为我们去定义这些错误。有了错误定义后，我们可以用消息通知用户，或者停止执行程序的运行。

## JavaScript 中的错误是什么

JavaScript中的错误是一个对象。要在 JS 创建一个错误，可以使用 `Error` 对象，如下所示：

```
const err = new Error('霍霍，好像哪里出问题了！')
```

也可以省略`new`关键字:

```
const err = Error('霍霍，好像哪里出问题了！')
```

创建，错误对象有三个属性：

- **message**:带有错误消息的字符串
- **name**：错误的类型
- **stack**：函数执行的堆栈跟踪

例如，我们使用 `TypeError` 对象创建一个错误，对应的 `message` 是创建的传入的字符号，`name` 是 **"TypeError"** 😀

```
const wrongType = TypeError("霍霍，好像哪里出问题了！")

wrongType.message // "霍霍，好像哪里出问题了！"
wrongType.name // "TypeError"
```

## JavaScript中的许多类型的错误

JavaScript 中有很多类型的错误 😱,如：

- Error
- EvalError
- InternalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

记住，所有这些错误类型都是实际的构造函数，意味着返回一个新的错误对象。

在我们的代码中，主要还是使用`Error`和`TypeError`这两种最常见的类型来创建自己的错误对象 😳。

大多数时候，大多数错误将直接来自JavaScript引擎，例如`InternalError`或`SyntaxError`。

如果你重新赋值给 `const` 声明的变量时，就会引发 `TypeError` 错误。

```
const name = "前端小智"
name = "王大冶"

// // TypeError: Assignment to constant variable.
```

`SyntaxError` 错误一般是关键字打错了，如下所示：

```
va x = '33';
// SyntaxError: Unexpected identifier
```

或者，当在错误的地方使关键字时，例如`await` 和 `async` 的使用：

```
function wrong(){
    await 99;
}

wrong();

// SyntaxError: await is only valid in async function
```

另一个`TypeError`的例子是，在页面操作不存在的 DOM 元素。

```
Uncaught TypeError: button is null
```

除了这些内置错误外，在浏览器中还有：

- DOMException
- DOMError，现在已经废弃，不再使用了。

`DOMException`是与 Web API 相关的一系列错误。当我们在浏览器中执行愚蠢的操作时，它们会被抛出，例如：

```
document.body.appendChild(document.cloneNode(true));
```

结果：

```
Uncaught DOMException: Node.appendChild: May not add a Document as a child
```

## 什么是异常？

大多数开发人员认为错误和异常是一回事。实际上，**错误对象只有在抛出时才会变成异常。**

要在JavaScript中引发异常，我们使用`throw` 关键字把错误抛出去：

```
const wrongType = TypeError("霍霍，好像哪里出问题了！")

throw wrongType;
```

简写形式：

```
throw TypeError("霍霍，好像哪里出问题了！")
```

或者

```
throw new TypeError("霍霍，好像哪里出问题了！")
```

在函数体或者条件之外抛出异步的可能性不大，考虑下面的例子：

```
function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("霍霍，好像哪里出问题了！");
  }

  return string.toUpperCase();
}
```

这里我们检查函数参数是否为字符串。如果不是，我们抛出一个异常。从技术上讲，JavaScript中可以抛出任何东西，而不仅仅是错误对象

```
throw Symbol();
throw 33;
throw "Error!";
throw null;
```

但是，最好避免这些事情：始终抛出正确的错误对象，而不是一些基本类型。

这样有助于在代码中，错误处理的一致性。其他成员可以期望在错误对象上访问`error.message`或`error.stack` 来知道错误的源头。

## 当我们抛出异常时会发生什么？

异常就像一个上升的电梯:一旦你抛出一个，它就会在程序堆栈中冒泡，除非它在某个地方被捕获。

考虑以下代码：

```
function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("参数类型需要是 string 的");
  }

  return string.toUpperCase();
}

toUppercase(4);
```

运行代码会在控制台看到：

```
Uncaught TypeError: Wrong type given, expected a string
    toUppercase http://localhost:5000/index.js:3
    <anonymous> http://localhost:5000/index.js:9
```

可以看到发生错误的确切行。

这个报告是一个堆栈跟踪，它有助于跟踪代码中的问题。堆栈跟踪从下至上:

```
 toUppercase http://localhost:5000/index.js:3
    <anonymous> http://localhost:5000/index.js:9
```

除了在浏览器的控制台中看到此堆栈跟踪外，还可以通过错误对象的`stack`属性进行查看。

如果异常未被捕获，也就是说，程序员不采取任何措施来捕获它，程序将崩溃。

**何时何地捕获代码中的异常取决于特定的用例。**

例如，我们可能想在堆栈中传递一个异常，以使程序完全崩溃。这种情况发生在， 让错误停止程序比处理无效数据来得更安全。

接下来，我们来看看 JavaScript 同步和异步中的错误和异常处理。

## 同步中的错误处理

同步代码在大多数情况下都很简单，因此它的错误处理也很简单。

#### 常规函数的错误处理

同步代码的执行顺序与写入顺序相同。我们再看一下前面的例子:

```js
function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("参数类型需要是 string 的");
  }

  return string.toUpperCase();
}

toUppercase(4);
```

在这里，引擎调用并执行`toUppercase`。所有这些都是同步发生的。要捕获同步函数引发的异常，我们可以使用`try/catch/finally`：

```js
try {
  toUppercase(4);
} catch (error) {
  console.error(error.message);
} finally {
}
```

`try/catch/finally`是一个同步结构，但它也可以捕获异步出现的异常。

## 使用 generator 函数来处理错误

JavaScript中的`生成器函数`是一种特殊的函数。除了在其内部作用域和使用者之间提供双向通信通道之外，还可以随意**暂停**和**恢复**。

要创建一个生成器函数，我们在`function`关键字后面放一个`*`:

JavaScript中的`生成器函数`是一种特殊的函数。除了在其内部作用域和使用者之间提供双向通信通道之外，还可以随意**暂停**和**恢复**。

要创建一个生成器函数，我们在`function`关键字后面放一个`*`:

```js
function* generate() {
  //
}
```

在函数内可以使用`yield`返回值：

```js
function* generate() {
  yield 33;
  yield 99;
}
```

生成器函数的返回值是一个**迭代器对象**(iterator object)。要从生成器中提取值，我们可以使用两种方法:

- 使用 `next()` 方法
- 通过 `for...of` 遍历

如下所示，要想在生成器中获取值，我们可以这样做：

```js
function* generate() {
  yield 33;
  yield 99;
}

const go = generate();

const firstStep = go.next().value; // 33
const secondStep = go.next().value; // 99
```

成器也可以采用其他方法工作：它们可以接收调用者返回的值和异常。

除了`next()`之外，**从生成器返回的迭代器对象还具有`throw()`方法。使用这种方法，我们可以通过向生成器中注入一个异常来停止程序**

```js
function* generate() {
  yield 33;
  yield 99;
}

const go = generate();

const firstStep = go.next().value; // 33

go.throw(Error("我要结束你!"));

const secondStep = go.next().value; // 这里会抛出异常
```

要获取此错误，可以在生成器函数中使用 `try/catch/finally`:

```js
function* generate() {
  try {
    yield 33;
    yield 99;
  } catch (error) {
    console.error(error.message);
  }
}
```

下面这个事例是使用 `for...of` 来获取 生成器函数中的值:

```js
function* generate() {
  yield 33;
  yield 99;
  
  throw Error("我要结束你!")
}

try {
  for (const value of generate()) {
    console.log(value)
  }
} catch (error) {
  console.log(error.message)
}

/* 输出：
  33
  99
  我要结束你!
*/
```

## 异步中的错误处理

**JavaScript本质上是同步的，是一种单线程语言。**

诸如浏览器引擎之类的宿主环境使用许多Web API， 增强了 JS 以与外部系统进行交互并处理与 I/O 绑定的操作。

浏览器中异步操作有：定时器相关的函数、事件和 Promise。

异步中的错误处理不同于同步的错误处理。我们来看一些例子。

#### 定时器的错误处理

考虑下面的代码片段:

```
function failAfterOneSecond() {
  setTimeout(() => {
    throw Error("Something went wrong!");
  }, 1000);
}
```

这个函数大约在1秒后抛出异常，处理这个异常的正确方法是什么？

下面的方法不起作用：

```
function failAfterOneSecond() {
  setTimeout(() => {
    throw Error("Something went wrong!");
  }, 1000);
}

try {
  failAfterOneSecond();
} catch (error) {
  console.error(error.message);
}
```

我们知道 `try/catch` 是同步，而 `setTimeout` 是异步的。当执行到 `setTimeout`回调时，`try/catch` 早已跑完了，所以异常就无法捕获到。

它们在两务不同的轨道上：

```
Track A: --> try/catch
Track B: --> setTimeout --> callback --> throw
```

如果能让程序跑下去，把 `try/catch` 移动到 `setTimeout` 里面。但这种做法意义不大，后面我们会使用 Promise 来解决这类的问题。

#### 事件中错误处理

DOM 的事件操作（监听和触发），都定义在`EventTarget`接口。`Element`节点、`document`节点和`window`对象，都部署了这个接口。此外，XMLHttpRequest、`AudioNode`、`AudioContext`等浏览器内置对象，也部署了这个接口。该接口就是三个方法，`addEventListener`和`removeEventListener`用于绑定和移除监听函数，`dispatchEvent`用于触发事件。

DOM 事件的错误处理机制遵循任何异步Web API的相同方案。

考虑下面示例：

```
const button = document.querySelector("button");

button.addEventListener("click", function() {
  throw Error("Can't touch this button!");
});
```

在这里，单击按钮后立即引发异常。我们如何抓住它？下面这种方式没啥作用，也不会阻止程序崩溃：

```
const button = document.querySelector("button");

try {
  button.addEventListener("click", function() {
    throw Error("Can't touch this button!");
  });
} catch (error) {
  console.error(error.message);
}
```

与 `setTimeout` 一样，`addEventListener` 也是异步执行的。

```
Track A: --> try/catch
Track B: --> addEventListener --> callback --> throw
```

如果能让程序跑下去，把 `try/catch` 移动到 `addEventListener` 里面。但这种做法意义不大，后面我们会使用 Promise 来解决这类的问题。

## onerror 怎么样

HTML元素具有许多事件处理程序，例如`onclick`，`onmouseenter`，`onchange`等，当然还有 `onerror`。

当 `img` 标签或 `script` 标签遇到不存在的资源时，`onerror`事件处理程序都会触发。

考虑下面示例：

```
...
<body>
  <img src="nowhere-to-be-found.png" alt="So empty!">
</body>
...
```

当文件不存在时，控制台就会报如下的错误：

```
GET http://localhost:5000/nowhere-to-be-found.png
[HTTP/1.1 404 Not Found 3ms]
```

在 JS 中，我们可以通过 `onerror` 来捕获这个错误：

```
const image = document.querySelector("img");

image.onerror = function(event) {
  console.log(event);
};
```

更好的方式：

```
const image = document.querySelector("img");

image.addEventListener("error", function(event) {
  console.log(event);
});
```

这种方式对于一些请求资源丢失的情况很有用，但 `onerror` 与 `throw` 与 `try/cathc` 无关。

## 使用 Promise 处理错误

为了演示 `Promise` 处理方式，我们先回到一开始的那个事例：

```
function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Wrong type given, expected a string");
  }

  return string.toUpperCase();
}

toUppercase(4);
```

相对简单抛出异常，我们可以使用 `Promise.reject` 和`Promise.resolve`:

```
function toUppercase(string) {
  if (typeof string !== "string") {
    return Promise.reject(TypeError("Wrong type given, expected a string"));
  }

  const result = string.toUpperCase();

  return Promise.resolve(result);
}
```

因为使用了 **Promise** ，所以可以使用 `then` 来接收返回的内容，或者用 `catch` 来捕获出现的错误。

```
toUppercase(99)
  .then(result => result)
  .catch(error => console.error(error.message));
```

上面的执行结果：

```
Wrong type given, expected a string
```

除了 `then` 和 `catch` , Promise 中还有  `finally` 方法，这类似于`try/catch` 中的 `finally`。

```
toUppercase(99)
  .then(result => result)
  .catch(error => console.error(error.message))
  .finally(() => console.log("Run baby, run"));
```

## Promise, error, 和 throw

使用 Promise.reject 可以很方便的抛出错误：

```
Promise.reject(TypeError("Wrong type given, expected a string"));
```

除了`Promise.reject`，我们也可以通过抛出异常来退出 Promise。

考虑以下示例：

```js
Promise.resolve("A string").then(value => {
  if (typeof value === "string") {
    throw TypeError("Expected a number!");
  }
});
```

要停止异常传播，我们照常使用`catch`：

```js
Promise.resolve("A string")
  .then(value => {
    if (typeof value === "string") {
      throw TypeError("Expected a number!");
    }
  })
  .catch(reason => console.log(reason.message));
```

这种模式在`fetch`中很常见:

```js
fetch("https://example-dev/api/")
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  })
  .then(json => console.log(json));
```

这里可以使用`catch`拦截异常。如果我们失败了，或者决定不捕获它，异常可以在堆栈中自由冒泡。

## 使用 Promise 来处理定时器中的异常

使用定时器或事件无法捕获从回调引发的异常。

```js
function failAfterOneSecond() {
  setTimeout(() => {
    throw Error("Something went wrong!");
  }, 1000);
}

// DOES NOT WORK
try {
  failAfterOneSecond();
} catch (error) {
  console.error(error.message);
}
```

解决方案就是使用 Promise:

```js
function failAfterOneSecond() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(Error("Something went wrong!"));
    }, 1000);
  });
}
```

使用`reject`，我们启动了一个 Promise 拒绝，它携带一个错误对象。

此时，我们可以使用`catch`处理异常:

```js
failAfterOneSecond().catch(reason => console.error(reason.message));
```

## 使用 Promise.all 来处理错误

`Promise.all(iterable)` 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；

```js
const promise1 = Promise.resolve("All good!");
const promise2 = Promise.resolve("All good here too!");

Promise.all([promise1, promise2]).then((results) => console.log(results));

// [ 'All good!', 'All good here too!' ]
```

**如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败的原因是第一个失败 promise 的结果。**

```js
const promise1 = Promise.resolve("All good!");
const promise2 = Promise.reject(Error("No good, sorry!"));
const promise3 = Promise.reject(Error("Bad day ..."));

Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.error(error.message));

// No good, sorry!
```

同样，无论`Promise.all`的结果如何运行函数，`finally` 都会被执行：

```js
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.error(error.message))
  .finally(() => console.log("Always runs!"));
```

## 使用 Promise.any 来处理错误

`Promise.any()` (Firefox > 79, Chrome > 85)  接收一个 Promise 可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。**如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 `promise` 和`AggregateError`类型的实例，它是 `Error` 的一个子类，用于把单一的错误集合在一起。本质上，这个方法和`Promise.all()`是相反的。**

```js
const promise1 = Promise.reject(Error("No good, sorry!"));
const promise2 = Promise.reject(Error("Bad day ..."));

Promise.any([promise1, promise2])
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Always runs!"));
```

在这里，我们使用`catch`处理错误，输出如下：

```js
AggregateError: No Promise in Promise.any was resolved
Always runs!
```

`AggregateError`对象具有与基本`Error`相同的属性，外加`errors`属性：

```js
//
  .catch(error => console.error(error.errors))
//
```

此属性是由`reject`产生的每个单独错误的数组

```js
[Error: "No good, sorry!, Error: "Bad day ..."]
```

## 使用 Promise.race  来处理错误

`Promise.race(iterable)` 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

```js
const promise1 = Promise.resolve("The first!");
const promise2 = Promise.resolve("The second!");

Promise.race([promise1, promise2]).then(result => console.log(result));

// The first!
```

这里说明，第一个 Promise 比第二个行执行完。那包含拒绝的情况又是怎么样的？

```js
const promise1 = Promise.resolve("The first!");
const rejection = Promise.reject(Error("Ouch!"));
const promise2 = Promise.resolve("The second!");

Promise.race([promise1, rejection, promise2]).then(result =>
  console.log(result)
);

// The first!
```

如果把`reject`放在第一个又会怎么样？

```js
const promise1 = Promise.resolve("The first!");
const rejection = Promise.reject(Error("Ouch!"));
const promise2 = Promise.resolve("The second!");

Promise.race([rejection, promise1, promise2])
  .then(result => console.log(result))
  .catch(error => console.error(error.message));

// Ouch!
```

## 使用 Promise.allSettled  来处理错误

`Promise.allSettled()`方法返回一个在所有给定的promise都已经`fulfilled`或`rejected`后的promise，并带有一个对象数组，每个对象表示对应的promise结果。

考虑下面示例：

```js
const promise1 = Promise.resolve("Good!");
const promise2 = Promise.reject(Error("No good, sorry!"));

Promise.allSettled([promise1, promise2])
  .then(results => console.log(results))
  .catch(error => console.error(error))
  .finally(() => console.log("Always runs!"));
```

我们传递给`Promise.allSettled`一个由两个Promise组成的数组：一个已解决，另一个被拒绝。

这种情况 `catch` 不会被执行， `finally` 永远会执行。

```js
[
  { status: 'fulfilled', value: 'Good!' },
  {
    status: 'rejected',
    reason: Error: No good, sorry!
  }
]
```

## 使用 async/await  来处理错误

为了简单起见，我们使用前面的同步函数`toUppercase`，并通过在`function`关键字前放置`async`来将其转换为异步函数

```js
async function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Wrong type given, expected a string");
  }

  return string.toUpperCase();
}
```

只要在函数前面加上`async`，该函数就会返回一个`Promise`。这意味着我们可以在函数调用之后进行`then`、`catch`和`finally` 操作

```js
async function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Wrong type given, expected a string");
  }

  return string.toUpperCase();
}

toUppercase("abc")
  .then(result => console.log(result))
  .catch(error => console.error(error.message))
  .finally(() => console.log("Always runs!"));
```

当从 `async` 函数抛出异常时，我们就可以使用 `catch` 来捕获。

最重要的是，除了这种方式外，我们可以还使用`try/catch/finally`，就像我们使用同步函数所做的一样。

```js
async function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Wrong type given, expected a string");
  }

  return string.toUpperCase();
}

async function consumer() {
  try {
    await toUppercase(98);
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log("Always runs!");
  }
}

consumer(); 
```

输出：

```
Wrong type given, expected a string
Always runs!
```

## 使用 async generators  来处理错误

JavaScript中的`async generators`是能够生成 Promises 而不是简单值的生成器函数。

```js
async function* asyncGenerator() {
  yield 33;
  yield 99;
  throw Error("Something went wrong!"); // Promise.reject
}
```

基于 Promise，此处适用于错误处理的相同规则。在异步生成器中 `throw` 将会触发 Promise 的`reject`，我们可以使用`catch`对其进行拦截。

为了使用异步生成器的 Promise，我们可以这样做：

- then 方法
- 异步遍历

从上面我们知道，在两次调用 `yield`之后，下一次会抛出一个异常：

```js
const go = asyncGenerator();

go.next().then(value => console.log(value));
go.next().then(value => console.log(value));
go.next().catch(reason => console.error(reason.message));
```

输出结果：

```js
{ value: 33, done: false }
{ value: 99, done: false }
Something went wrong!
```

别一种是使用 `异步遍历`与`for await...of`:

```js
async function* asyncGenerator() {
  yield 33;
  yield 99;
  throw Error("Something went wrong!"); // Promise.reject
}

async function consumer() {
  for await (const value of asyncGenerator()) {
    console.log(value);
  }
}

consumer();
```

有了 `async/await` 我们可以使用 `try/catch` 来捕获异常：

```js
async function* asyncGenerator() {
  yield 33;
  yield 99;
  throw Error("Something went wrong!"); // Promise.reject
}

async function consumer() {
  try {
    for await (const value of asyncGenerator()) {
      console.log(value);
    }
  } catch (error) {
    console.error(error.message);
  }
}

consumer();
```

输出结果：

```js
33
99
Something went wrong!
```

从异步生成器函数返回的迭代器对象也具有`throw()`方法，非常类似于其同步副本。在此处的迭代器对象上调用`throw()`不会引发异常，但是会被Promise拒绝

```js
async function* asyncGenerator() {
  yield 33;
  yield 99;
  yield 11;
}

const go = asyncGenerator();

go.next().then(value => console.log(value));
go.next().then(value => console.log(value));

go.throw(Error("Let's reject!"));

go.next().then(value => console.log(value)); // value is undefined
```

要从外部处理这种情况，我们可以做：

```js
go.throw(Error("Let's reject!")).catch(reason => console.error(reason.message));
```

## Node 中的错误处理

#### Node 中的同步错误处理

Node.js 中的同步错误处理与到目前为止所看到的并没有太大差异。对于同步，使用 `try/catch/finally` 就可以很好的工作了。

#### Node.js 中的异步错误处理：回调模式

对于异步代码，Node.js 主要使用这两种方式：

- 回调模式
- event emitters

在回调模式中，异步 Node.js API 接受一个函数，该函数通过事件循环处理，并在调用堆栈为空时立即执行。

考虑以下代码:

```js
const { readFile } = require("fs");

function readDataset(path) {
  readFile(path, { encoding: "utf8" }, function(error, data) {
    if (error) console.error(error);
    // do stuff with the data
  });
}
```

我们可以看到，这里处理错误的方式是使用了回调：

```js
//
function(error, data) {
    if (error) console.error(error);
    // do stuff with the data
  }
//
```

如果使用`fs.readFile`读取给定路径而引起任何错误，我们将获得一个错误对象。

在这一点上，我们可以：

- 简单的把对象错误打出来
- 抛出错误
- 把错误传到另一个回调

我们可以抛出一个异常

```js
const { readFile } = require("fs");

function readDataset(path) {
  readFile(path, { encoding: "utf8" }, function(error, data) {
    if (error) throw Error(error.message);
    // do stuff with the data
  });
}
```

但是，与 DOM 中的事件和定时器一样，此异常将使程序崩溃。通过`try/catch`捕获它是不起作用的：

```js
const { readFile } = require("fs");

function readDataset(path) {
  readFile(path, { encoding: "utf8" }, function(error, data) {
    if (error) throw Error(error.message);
    // do stuff with the data
  });
}

try {
  readDataset("not-here.txt");
} catch (error) {
  console.error(error.message);
}
```

如果我们不想使程序崩溃，则将错误传递给另一个回调是首选方法：

```js
const { readFile } = require("fs");

function readDataset(path) {
  readFile(path, { encoding: "utf8" }, function(error, data) {
    if (error) return errorHandler(error);
    // do stuff with the data
  });
}
```

这里的`errorHandler`顾名思义，是一个用于错误处理的简单函数:

```js
function errorHandler(error) {
  console.error(error.message);
  // do something with the error:
  // - write to a log.
  // - send to an external logger.
}
```

## Node.js 中的异步错误处理：event emitters

在 Node.js 中所做的大部分工作都是基于**事件**的。大多数情况下，**emitter object** 和一些观察者进行交互以侦听消息。

Node.js中的任何事件驱动模块（例如net）都扩展了一个名为`EventEmitter`的根类。

Node.js中的**EventEmitter**有两种基本方法：`on`和`emit`。

考虑以下简单的 HTTP 服务器：

```js
const net = require("net");

const server = net.createServer().listen(8081, "127.0.0.1");

server.on("listening", function () {
  console.log("Server listening!");
});

server.on("connection", function (socket) {
  console.log("Client connected!");
  socket.end("Hello client!");
});
```

这里我们来听两个事件:`listening` 和`connection`。除了这些事件之外，event emitters 还公开一个 `error` 事件，以防发生错误。

如果在端口80上运行这段代码，而不是在前面的示例上侦听，将会得到一个异常：

```js
const net = require("net");

const server = net.createServer().listen(80, "127.0.0.1");

server.on("listening", function () {
  console.log("Server listening!");
});

server.on("connection", function (socket) {
  console.log("Client connected!");
  socket.end("Hello client!");
});
```

输出：

```js
events.js:291
      throw er; // Unhandled 'error' event
      ^

Error: listen EACCES: permission denied 127.0.0.1:80
Emitted 'error' event on Server instance at: ...
```

要捕获它，我们可以注册一个`error`事件处理程序：

```js
server.on("error", function(error) {
  console.error(error.message);
});
```

输出结果：

```js
listen EACCES: permission denied 127.0.0.1:80
```

## 总结

在这个指南中，我们介绍了JavaScript的各种错误处理，从简单的同步代码到高级的异步。在JavaScript程序中，可以通过多种方式来捕获异常。

同步代码中的异常是最容易捕获的。相反，异步中的异常需要一些技巧来处理。

浏览器中的新JavaScript API几乎都偏向 `Promise`。`then/catch/finally`或`try/catch`的模式对于`async/await`的异常处理变得更加容易。