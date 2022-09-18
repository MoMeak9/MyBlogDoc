# ES5、6 指导规范

## ES6 常用规范

### 1. 基本类型

**基本类型**: 直接存取基本类型。

- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `symbol`

**正例**

```javascript
const foo = 1;
let bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9
```

**复杂类型**: 通过引用的方式存取复杂类型。

- `object`
- `array`
- `function`

**正例**

```javascript
const foo = {
  a: 1,
  b: 2,
};
const bar = foo;

bar.a = 9;

console.log(foo.a, bar.a); // => 9, 9
```

### 2. 引用

- 对所有的引用使用 `const` ；不要使用 `var`。

> 这能确保你无法对引用重新赋值，也不会导致出现 bug 或难以理解。

- 如果你一定需要可变动的引用，使用 `let` 代替 `var`。`const`声明的变量是不允许修改的。

> 因为 `let` 是块级作用域，而 `var` 是函数作用域。

- `let`和`const`不允许一次声明多个变量/常量，用逗号隔开。

反例

```javascript
const bar = 1, baz = 'test';
let a, b;
```

- 注意 `let` 和 `const` 都是块级作用域。

### 3. 对象

- 使用字面语法创建对象。

反例

```javascript
const item = new Object();
```

正例

```javascript
const item = {};
```

- 如果你的代码在浏览器环境下执行，别使用 保留字 作为键值。这样的话在 IE8 不会运行。 更多信息。 但在 ES6 模块和服务器端中使用没有问题。

反例

```javascript
const superman = {
  default: { clark: 'kent' },
  private: true,
};
```

- 使用同义词替换需要使用的保留字。

- 创建有动态属性名的对象时，使用可被计算的属性名称。

  > 因为这样可以让你在一个地方定义所有的对象属性。

正例：

```javascript
function getKey(k) {
  return `a key named ${k}`;
}

const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```

- 使用对象属性值和方法的简写。

  > 这样更短更有描述性。

  ```javascript
  const lukeSkywalker = 'Luke Skywalker';
  
  const obj = {
    lukeSkywalker,
    addValue(value) {
      return atom.value + value;
    },
  };
  ```

- 如果对象的键是字符串，请使用长格式语法。

  ```javascript
    const foo = {
      'bar-baz': function () {},
    };
  ```

- 在对象属性声明前把简写的属性分组。

  ```javascript
  const anakinSkywalker = 'Anakin Skywalker';
  const lukeSkywalker = 'Luke Skywalker';
  
  const obj = {
    lukeSkywalker,
    anakinSkywalker,
    episodeOne: 1,
    twoJedisWalkIntoACantina: 2,
    episodeThree: 3,
    mayTheFourth: 4,
  };
  ```

- 不允许在使用对象字面量申明对象时使用相同的键名。

- 禁止将全局对象（Math和JSON)作为函数调用。

- 禁止在对象中使用不必要的计算属性

  反例

  ```javascript
  const a = { ['0']: 0 };
  const a = { ['0+1,234']: 0 };
  const a = { [0]: 0 };
  const a = { ['x']: 0 };
  const a = { ['x']() {} };
  ```

- 只允许引号标注无效标识符的属性。

  ```javascript
  const good = {
    foo: 3,
    bar: 4,
    'data-blah': 5,
  };
  ```

### 4. 数组

- 使用字面值创建数组。禁止使用new创建包装实例，如 new String、new Number，这样会变成初始化一个对象，而不是对应的初始类型。
- 向数组添加元素时使用 Arrary.push 替代直接赋值。
- 使用数组展开方法`...`来浅拷贝数组。
- 将一个类数组对象转换成一个数组， 使用展开方法`...`代替`Array.from`。

### 5. 解构

- 在访问和使用对象的多个属性的时候使用对象的解构。

  > 解构可以避免为这些属性创建临时引用。

  ```js
  function getFullName(obj) {
    const { firstName, lastName } = obj;
    return `${firstName} ${lastName}`;
  }
  // or
  function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }
  ```

- 对数组使用结构赋值

  ```javascript
  const arr = [1, 2, 3, 4];
  
  const [first, second] = arr; // first = 1  second = 2
  const [, first, second] = arr;
  ```

- 对于多个返回值使用对象解构，而不是数组解构。

  > 你可以随时添加新的属性或者改变属性的顺序，而不用修改调用方。

  ```javascript
  function processInput(input) {
    // then a miracle occurs
    return { left, right, top, bottom };
  }
  
  const { left, right } = processInput(input);
  ```

### 6. 字符串

- 静态字符串一律使用单引号 `''` 。（如果不是引号嵌套，不要使用双引号）

  > *模板文字应该包含插值或换行。*

- 使行超过100个字符的字符串不应使用字符串连接跨多行写入

  > 过度使用字串连接符号可能会对性能造成影响。[jsPerf](http://jsperf.com/ya-string-concat) 和 [讨论](https://github.com/airbnb/javascript/issues/40).

  反例：

  ```javascript
  const errorMessage = 'This is a super long error that was thrown because \
  of Batman. When you stop to think about how Batman had anything to do \
  with this, you would get nowhere \
  fast.';
  ```

- 建议使用模板字符串。

  ```javascript
  function sayHi(name) {
    return `How are you, ${name}?`;
  }
  ```

-  模板字符串中的嵌入表达式两端不要存在空格。

- 不要在转义字符串中不转义必要的字符

### 7. 函数

- 使用函数声明代替函数表达式。

> 因为函数声明是可命名的，所以他们在调用栈中更容易被识别。此外，函数声明会把整个函数提升（hoisted），而函数表达式只会把函数的引用变量名提升。这条规则使得箭头函数可以取代函数表达式

**正例 good**

```javascript
const short = function test() {
  // ...
};
const foo = () => {};
```

**正例 best**

```javascript
function foo() {
}
```

- 函数表达式 IIFE

```javascript
(() => {
  console.log('Welcome to the Internet. Please follow me.');
})();
```

- 永远不要在一个非函数代码块（`if`、`while` 等）中声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但它们的解析表现不一致。

-  注意: ECMA-262 把 block 定义为一组语句。函数声明不是语句。阅读 ECMA-262 关于这个问题的说明。

  **反例**

  ```javascript
  if (currentUser) {
    function test() {
      console.log('Nope.');
    }
  }
  ```

  **正例**

  ```javascript
  let test;
  if (currentUser) {
    test = () => {
      console.log('Yup.');
    };
  }
  ```

- 永远不要把参数命名为 `arguments`。这将取代原来函数作用域内的 `arguments` 对象。

- 不要使用 `arguments`。可以选择 rest 语法 `...` 替代。

  > 使用 `...` 能明确你要传入的参数。另外 rest 参数是一个真正的数组，而 `arguments` 是一个类数组。

- 使用默认的参数语法，而不是改变函数参数。

  ```javascript
  function handleThings(opts = {}) {
    // ...
  }
  ```

- 直接给函数参数赋值时需要避免副作用。

- 在函数中有分支时，保证所有的return 语句必须指定返回值。

- 数组方法的回调函数中要有 return 语句。以下方法的回调函数必须最终有`return`语句。

  - `Array.from`
  - `Array.prototype.every`
  - `Array.prototype.filter`
  - `Array.prototype.find`
  - `Array.prototype.findIndex`
  - `Array.prototype.map`
  - `Array.prototype.reduce`
  - `Array.prototype.reduceRight`
  - `Array.prototype.some`
  - `Array.prototype.sort`

  ```javascript
  const indexMap = myArray.reduce((memo, item, index) => {
    memo[item] = index;
    return memo;
  }, {});
  
  const foo = Array.from(nodes, node => {
    if (node.tagName === 'DIV') {
      return true;
    }
    return false;
  });
  
  const bar = foo.map(node => node.getAttribute('id'));
  ```

- 调用无参构造函数时必须带括号。

- 不要改变参数和再分配参数

  ```javascript
  function f3(a) {
    const b = a || 1;
    // ...
  }
  
  function f4(a = 1) {
    // ...
  }
  ```

- `Generator` 函数是 ES6 提供的一种异步编程解决方案.

  > 为什么需要`Generator`？为了解决javascript异步回调层层嵌套的问题，`Generator` 函数提供了异步编程解决方案。他有以下几个特征：

  - `function`关键字后面会带一个`*`号;函数体内部会使用`yield`表达式
  - `Generator`函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行

  **正例**

  ```javascript
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }
  const hw = helloWorldGenerator();
  
  hw.next();
  // { value: 'hello', done: false }
  
  hw.next();
  // { value: 'world', done: false }
  
  hw.next();
  // { value: 'ending', done: true }
  
  hw.next();
  // { value: undefined, done: true }
  ```

- Generator 函数内一定要有yield

### 8. 箭头函数

- 当你必须使用函数表达式（或传递一个匿名函数）时，使用箭头函数符号。

- 要求使用箭头函数作为回调。

  > 箭头函数自动绑定到其周围作用域/上下文，可以替代显式绑定函数表达式

- 如果一个函数适合用一行写出并且只有一个参数，那就把花括号、圆括号和 `return` 都省略掉。如果不是，那就不要省略。

### 9. 构造函数

- 总是使用 `class`。避免直接操作 `prototype` 。

  >因为 `class` 语法更为简洁更易读。ES6的类class只是一个语法糖，完全可以看作构造函数的另一种写法。新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

- 使用 `extends` 继承

  > `extends` 是一个内建的原型继承方法并且可以在不破坏 instanceof 的情况下继承原型功能。这比ES5的通过修改原型链实现继承，要清晰和方便很多

- 方法可以返回 `this` 来供其内部方法调用。(亦可模拟级联)

  ```javascript
  class Jedi {
    jump() {
      this.jumping = true;
      return this;
    }
  
    setHeight(height) {
      this.height = height;
      return this;
    }
  }
  
  const luke = new Jedi();
  
  luke.jump()
    .setHeight(20);
  ```

- 可以写一个自定义的 `toString()` 方法，但要确保它能正常运行并且不会引起副作用。

- 构造函数中禁止在`super()`调用之前使用`this`或`super`。

- 如果没有指定类，则类具有默认的构造器。 一个空的构造器或是一个代表父类的函数是没有必要的。

- 构造函数类成员中不允许出现重复名称。

## 10. 模块



