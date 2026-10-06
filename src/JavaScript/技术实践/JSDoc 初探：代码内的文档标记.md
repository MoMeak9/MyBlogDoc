# JSDoc 初探：代码内的文档标记

JSDoc 3 是一个用于 JavaScript 的API文档生成器，类似于 Javadoc 或 phpDocumentor。可以将文档注释直接添加到源代码中。JSDoc 工具将扫描你的源代码并为您生成一个 HTML 文档网站（当然，即使你不进行生成，其也被大部分浏览器所识别和支持）。JSDoc 的目的是记录 JavaScript 应用程序或库的 API。假设你想要记录诸如模块、名称空间、类、方法、方法参数等内容。 JSDoc注释通常应该放在记录代码之前。为了被 JSDoc 解析器识别，每个注释必须以 `/**` 序列开头。以 `/*`、`/***`开头或超过3颗星的注释将被忽略。这个特性用于控制解析注释块的功能。

JSDoc是一种用于为JavaScript代码生成文档的工具。它基于标签（tag）的形式，通过注释来提取代码中的类型、描述、参数、返回值等信息，生成文档供其他人参考。

使用JSDoc可以提高代码可读性和可维护性，让代码更易于理解和使用。在阅读和使用第三方库时，可以通过查看JSDoc生成的文档来了解函数和方法的使用方式、参数、返回值等信息。

在JSDoc中，可以使用各种标签来描述代码的不同方面，例如：

- `@param`：用于描述函数或方法的参数类型和含义；
- `@returns`：用于描述函数或方法的返回值类型和含义；
- `@throws`：用于描述函数或方法可能抛出的异常类型和含义；
- `@typedef`：用于定义类型别名；
- `@property`：用于描述对象的属性类型和含义；
- `@template`：用于定义泛型类型参数。

等等......

## 常见用法

### 使用`@typedef`标签定义类型别名

`@typedef`标签用于定义类型别名，可以用于简化代码和提高代码可读性。例如：

```js
/**
 * 用户信息
 * @typedef {Object} UserInfo
 * @property {string} name - 姓名
 * @property {number} age - 年龄
 */

/**
 * 函数说明
 * @param {UserInfo} userInfo - 用户信息
 */
function myFunction(userInfo) {
  // 函数实现
}
```

在上面的示例中，我们使用`@typedef`标签定义了一个名为`UserInfo`的类型别名，它表示一个对象，包含两个属性：`name`和`age`。然后我们在函数的`@param`标签中使用了这个类型别名，以便更清晰地描述参数的类型和含义。

### 使用`@throws`标签描述异常

`@throws`标签用于描述函数可能抛出的异常。它的语法和`@param`标签类似，可以指定异常的类型和描述。例如：

```js
/**
 * 函数说明
 * @param {string} name - 名称
 * @throws {Error} 如果名称为空，则抛出异常
 */
function myFunction(name) {
  if (!name) {
    throw new Error('名称不能为空');
  }
  // 函数实现
}
```

在上面的示例中，我们使用`@throws`标签指明函数可能抛出的异常类型为`Error`，并添加了一条描述。当函数中出现名称为空的情况时，将抛出一个新的`Error`异常。

### 使用`@template`标签定义泛型类型参数

`@template`标签用于定义泛型类型参数，以便在函数、类或对象中使用泛型。例如：

```js
/**
 * 函数说明
 * @template T
 * @param {Array<T>} arr - 数组
 * @returns {T} 数组中的第一个元素
 */
function myFunction(arr) {
  return arr[0];
}
```

在上面的示例中，我们使用`@template`标签定义了一个名为`T`的泛型类型参数。然后在函数的`@param`标签和`@returns`标签中使用了这个泛型类型参数，以便更通用地描述参数类型和返回值类型。

### 使用方括号 `[]` 来标记可选参数

具体来说，在 `@param` 标签后面添加一个可选参数名以作为可选参数，用方括号括起来即可。例如：

```js
/**
 * 函数说明
 * @param {string} name - 名称
 * @param {string} [type] - 类型（可选）
 * @returns {string} 字符串
 */
function myFunction(name, type) {
  // 函数实现
}
```

在上面的示例中，我们使用 `[]` 来标记 `type` 参数为可选参数。这意味着调用该函数时可以只传入一个参数 `name`，也可以同时传入两个参数 `name` 和 `type`。如果不传入 `type` 参数，则函数中可以通过 `if (!type)` 进行判断，避免出现未定义的错误。

### 使用`=`标记具有默认值的参数or可选参数

在JSDoc中，可以使用 `=` 符号来标记具有默认值的参数。具体来说，在 `@param` 标签后面添加一个参数名和默认值，用 `=` 符号连接即可。例如：

```js
/**
 * 函数说明
 * @param {string} name - 名称
 * @param {string} [type='default'] - 类型（可选，默认为 'default'）
 * @returns {string} 字符串
 */
function myFunction(name, type='default') {
  // 函数实现
}
```

在上面的示例中，我们使用 `=` 符号来标记 `type` 参数具有默认值，且默认值为 `'default'`。这意味着在调用该函数时，如果不传入 `type` 参数，则函数中默认使用 `'default'` 作为 `type` 的值。

需要注意的是，在JSDoc中标记参数具有默认值并不会改变函数或方法的实际调用方式，你可以只在注释中写好标记的默认参数，而不写在代码中，反之亦然（君子协定）。

同时等号还可以卸载`{}`当中，其效果相当于TS的`?`，但是不能标记默认值。如下所示：

```js
/**
 * 函数说明
 * @param {string=} name - 名称
 * @param {string=} type - 类型
 * @returns {string} 字符串
 */
function myFunction(name='', type='default') {
    // 函数实现
}
```

### 加餐：不使用类型别名指明对象内参数

例如指明某个函数的`config`对象内的参数，你可以使用嵌套的`@property`标签。

```js
/**
 * 函数说明
 * @param {Object} config - 配置项
 * @param {string=} config.name - 名称
 * @param {number} config.age - 年龄
 */
function myFunction(config) {
  // 函数实现
}
```

在上面的示例中，我们使用`@param`标签指明`config`是一个对象，并且包含两个属性：`name`和`age`。其中`name`是可选属性。

## 参考

- [Use JSDoc: Index](https://jsdoc.app/)
- [JSDoc 入门 | JSDoc中文文档 | JSDoc中文网](https://www.jsdoc.com.cn/)