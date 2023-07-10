---
date: 2022-04-01
category:
- 前端
- JavaScript
---

# JavaScript 进阶整合

## 20个 Javascript 技巧

### 1.声明和初始化数组

我们可以使用特定的大小来初始化数组，也可以通过指定值来初始化数组内容，大家可能用的是一组数组，其实二维数组也可以这样做，如下所示：

```js
const array = Array(5).fill(''); 
// 输出
(5) ["", "", "", "", ""]

const matrix = Array(5).fill(0).map(() => Array(5).fill(0))
// 输出
(5) [Array(5), Array(5), Array(5), Array(5), Array(5)]
0: (5) [0, 0, 0, 0, 0]
1: (5) [0, 0, 0, 0, 0]
2: (5) [0, 0, 0, 0, 0]
3: (5) [0, 0, 0, 0, 0]
4: (5) [0, 0, 0, 0, 0]
length: 5
```

### 2. 求和，最小值和最大值

### 2. 求和，最小值和最大值

我们应该利用 `reduce`方法快速找到基本的数学运算。

```js
const array  = [5,4,7,8,9,2];
```

**求和**

```js
array.reduce((a,b) => a+b);
// 输出: 35
```

**最大值**

```js
array.reduce((a,b) => a>b?a:b);
Math.max(...array);
// 输出: 9
```

**最小值**

```js
array.reduce((a,b) => a<b?a:b);
Math.min(...array);
// 输出: 2
```

### 3.排序字符串，数字或对象等数组

我们有内置的方法`sort()`和`reverse()`来排序字符串，但是如果是数字或对象数组呢

**字符串数组排序**

### 3.排序字符串，数字或对象等数组

我们有内置的方法`sort()`和`reverse()`来排序字符串，但是如果是数字或对象数组呢

**字符串数组排序**

```js
const stringArr = ["Joe", "Kapil", "Steve", "Musk"]
stringArr.sort();
// 输出
(4) ["Joe", "Kapil", "Musk", "Steve"]

stringArr.reverse();
// 输出
(4) ["Steve", "Musk", "Kapil", "Joe"]
```

**数字数组排序**

```js
const array  = [40, 100, 1, 5, 25, 10];
array.sort((a,b) => a-b);
// 输出
(6) [1, 5, 10, 25, 40, 100]

array.sort((a,b) => b-a);
// 输出
(6) [100, 40, 25, 10, 5, 1]
```

**对象数组排序**

```js
const objectArr = [ 
    { first_name: 'Lazslo', last_name: 'Jamf'     },
    { first_name: 'Pig',    last_name: 'Bodine'   },
    { first_name: 'Pirate', last_name: 'Prentice' }
];
objectArr.sort((a, b) => a.last_name.localeCompare(b.last_name));
// 输出 
(3) [{…}, {…}, {…}]
0: {first_name: "Pig", last_name: "Bodine"}
1: {first_name: "Lazslo", last_name: "Jamf"}
2: {first_name: "Pirate", last_name: "Prentice"}
length: 3
```

### 4.从数组中过滤到虚值

像 `0`, `undefined`, `null`, `false`, `""`, `''`这样的假值可以通过下面的技巧轻易地过滤掉。

```js
const array = [3, 0, 6, 7, '', false];
array.filter(Boolean);


// 输出
(3) [3, 6, 7]
```

### 5. 使用逻辑运算符处理需要条件判断的情况

```js
function doSomething(arg1){ 
    arg1 = arg1 || 10; 
// 如果arg1没有值，则取默认值 10
}

let foo = 10;  
foo === 10 && doSomething(); 
// 如果 foo 等于 10，刚执行 doSomething();
// 输出: 10

foo === 5 || doSomething();
// is the same thing as if (foo != 5) then doSomething();
// Output: 10
```

### 6. 去除重复值

```js
const array  = [5,4,7,8,9,2,7,5];
array.filter((item,idx,arr) => arr.indexOf(item) === idx);
// or
const nonUnique = [...new Set(array)];
// Output: [5, 4, 7, 8, 9, 2]
```

### 7. 创建一个计数器对象或 Map

大多数情况下，可以通过创建一个对象或者Map来计数某些特殊词出现的频率。

```js
let string = 'kapilalipak';

const table={}; 
for(let char of string) {
  table[char]=table[char]+1 || 1;
}
// 输出
{k: 2, a: 3, p: 2, i: 2, l: 2}
```

或者

```js
const countMap = new Map();
  for (let i = 0; i < string.length; i++) {
    if (countMap.has(string[i])) {
      countMap.set(string[i], countMap.get(string[i]) + 1);
    } else {
      countMap.set(string[i], 1);
    }
  }
// 输出
Map(5) {"k" => 2, "a" => 3, "p" => 2, "i" => 2, "l" => 2}
```

### 8. 三元运算符很酷

```js
function Fever(temp) {
    return temp > 97 ? 'Visit Doctor!' : temp < 97 ? 'Go Out and Play!!' : 'Take Some Rest!';
}


// 输出
Fever(97): "Take Some Rest!" 
Fever(100): "Visit Doctor!"
```

### 9. 循环方法的比较

- `for` 和 `for..in` 默认获取索引，但你可以使用`arr[index]`。
- `for..in`也接受非数字，所以要避免使用。
- `forEach`, `for...of` 直接得到元素。
- forEach 也可以得到索引，但 `for...of` 不行。

### 10. 合并两个对象

```js
const user = { 
 name: 'Kapil Raghuwanshi', 
 gender: 'Male' 
 };
const college = { 
 primary: 'Mani Primary School', 
 secondary: 'Lass Secondary School' 
 };
const skills = { 
 programming: 'Extreme', 
 swimming: 'Average', 
 sleeping: 'Pro' 
 };

const summary = {...user, ...college, ...skills};

// 合并多个对象
gender: "Male"
name: "Kapil Raghuwanshi"
primary: "Mani Primary School"
programming: "Extreme"
secondary: "Lass Secondary School"
sleeping: "Pro"
swimming: "Average"
```

### 11. 箭头函数

箭头函数表达式是传统函数表达式的一种替代方式，但受到限制，不能在所有情况下使用。因为它们有词法作用域(父作用域)，并且没有自己的`this`和`argument`，因此它们引用定义它们的环境。

```js
const person = {
name: 'Kapil',
sayName() {
    return this.name;
    }
}
person.sayName();
// 输出
"Kapil"
```

但是这样：

```js
const person = {
name: 'Kapil',
sayName : () => {
    return this.name;
    }
}
person.sayName();
// Output
"
```

### 13. 可选的链

```js
const user = {
  employee: {
    name: "Kapil"
  }
};
user.employee?.name;
// Output: "Kapil"
user.employ?.name;
// Output: undefined
user.employ.name
// 输出: VM21616:1 Uncaught TypeError: Cannot read property 'name' of undefined
```

### 13.洗牌一个数组

利用内置的`Math.random()`方法。

```js
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
list.sort(() => {
    return Math.random() - 0.5;
});
// 输出
(9) [2, 5, 1, 6, 9, 8, 4, 3, 7]
// 输出
(9) [4, 1, 7, 5, 3, 8, 2, 9, 6]
```

### 14.双问号语法

```js
const foo = null ?? 'my school';
// 输出: "my school"

const baz = 0 ?? 42;
// 输出: 0
```

### 剩余和展开语法

```js
function myFun(a,  b, ...manyMoreArgs) {
   return arguments.length;
}
myFun("one", "two", "three", "four", "five", "six");

// 输出: 6
```

和

```js
const parts = ['shoulders', 'knees']; 
const lyrics = ['head', ...parts, 'and', 'toes']; 

lyrics;
// 输出: 
(5) ["head", "shoulders", "knees", "and", "toes"]
```

### 16.默认参数

```js
const search = (arr, low=0,high=arr.length-1) => {
    return high;
}
search([1,2,3,4,5]);

// 输出: 4
```

### 17. 将十进制转换为二进制或十六进制

```js
const num = 10;

num.toString(2);
// 输出: "1010"
num.toString(16);
// 输出: "a"
num.toString(8);
// 输出: "12"
```

### 18. 使用解构来交换两个数

```js
let a = 5;
let b = 8;
[a,b] = [b,a]

[a,b]
// 输出
(2) [8, 5]
```

### 19. 单行的回文数检查

```js
function checkPalindrome(str) {
  return str == str.split('').reverse().join('');
}
checkPalindrome('naman');
// 输出: true
```

### 20.将Object属性转换为属性数组

```js
const obj = { a: 1, b: 2, c: 3 };

Object.entries(obj);
// Output
(3) [Array(2), Array(2), Array(2)]
[ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
0: (2) ["a", 1]
1: (2) ["b", 2]
2: (2) ["c", 3]
length: 3

Object.keys(obj);
(3) ["a", "b", "c"]

Object.values(obj);
(3) [1, 2, 3]
```

## 如何动态导入ECMAScript模块？

> 原文：https://dmitripavlutin.com/ecmascript-modules-dynamic-import/

ECMAScript(又名ES2015或ES)模块是在JavaScript中组织内聚代码块的一种方法。

ES模块系统有2个部分：

- `import`模块 - 使用 `import { func } from './myModule'`
- `export`模块-  使用 `export const func = () => {}`

`import` 模块是使用 `import` 语法导入依赖项的模块:

```js
import { concat } from './concatModule';

concat('a', 'b'); // => 'ab'
```

而被导入的模块使用`export`语法从自身导出组件:

```js
export const concat = (paramA, paramB) => paramA + paramB;
```

`import { concat } from './concatModule'`使用ES模块的方式是静态的：**意味着模块之间的依赖关系在编译时就已经知道了。**

虽然静态导入在大多数情况下是有效的，但有时我们想节省客户的带宽并有条件地加载模块。

为了实现这一点，**我们可以用不同的方式使用 `import(pathToModule)` 语法对模块进行新的动态导入：作为一个函数。动态导入是`ES2020`开始的一个JavaScript语言特性。**

### 1. 动态模块的导入

当`import`关键字用作函数而不是静态导入语法时:

```js
const module = await import(pathToModule);
```

它返回一个`promise` ，并开始一个加载模块的异步任务。如果模块被成功加载，那么`promise`就会解析到模块的内容，否则，`promise` 就会被拒绝。

请注意，`pathToModule`可以是任何表达式，其值为表示导入模块路径的字符串。有效的值是普通的字符串字面意义（如`./myModule`）或有字符串的变量。

例如，我们在一个异步函数中加载一个模块。

```js
async function loadMyModule() {
  const myModule = await import('./myModule');
  // ... use myModule
}

loadMyModule();
```

有趣的是，与静态导入相反，动态导入接受以模块路径求值的表达式

```js
async function loadMyModule(pathToModule) {
  const myModule = await import(pathToModule);
  // ... use myModule
}

loadMyModule('./myModule');
```

现在，了解了如何加载模块后，我们来看看如何从导入的模块中提取组件。

### 2.导入组件

#### 2.1 导入命名组件

考虑下面的模块：

```js
// namedConcat.js
export const concat = (paramA, paramB) => paramA + paramB;
```

这里导出了一个 `concat` 函数。

如果想动态导入`namedConcat.js`，并访问命名的导出`concat`，那么只需通解构的方式就行了：

```js
async function loadMyModule() {
  const { concat } = await import('./namedConcat');
  concat('b', 'c'); // => 'bc'
}

loadMyModule();
```

#### 2.2 默认导出

如果模块是默认导出的，我们可以使用`default`属性来访问。

还是上面的例子，我们将`defaultConcat.js`里面的`concat`函数默认导出:

```js
// defaultConcat.js
export default (paramA, paramB) => paramA + paramB;
```

在动态导入模块中,可以使用`default`属性来访问:

```js
async function loadMyModule() {
  const { default: defaultImport } = await import('./defaultConcat');
  defaultImport('b', 'c'); // => 'bc'
}

loadMyModule();
```

注意，`default`在JavaScript中是一个关键字，所以它不能用作变量名。

#### 2.3导入混合形式

如果模块里面既有默认导出也有命名导出，同样也是使用解构的方式来访问：

```js
async function loadMyModule() {
  const { 
    default: defaultImport,
    namedExport1,
    namedExport2
  } = await import('./mixedExportModule');
  // ...
}

loadMyModule();
```

#### 3.何时使用动态导入

建议在模块比较大的，或者要根据条件才导入的模块可以使用**动态导入**。

```js
async function execBigModule(condition) {
  if (condition) {
    const { funcA } = await import('./bigModuleA');
    funcA();
  } else {
    const { funcB } = await import('./bigModuleB');
    funcB();
  }
}

execBigModule(true);
```

对于小模块(如前面例子中的`namedConcat.js`或`defaultConcat.js`)，只有几十行代码，使用动态导入在点杀鸡用牛刀感觉。

### 总结

当调用 `import(pathToModule)` 作为一个函数时，其参数表示一个模块的指定符（又称路径），那么就会动态加载该模块。

在这种情况下，`module = await import(pathToModule)` 返回一个 promise ，该承诺解析为一个包含导入模块组件的对象。

Node.js（13.2及以上版本）和大多数现代浏览器都支持动态导入。





