---
date: 2022-08-27
category:
- JavaScript
---

# IIFE 立即执行函数表达式

`IIFE`全称为`Immediately Invoked Function Express`-立即执行函数（表达式），顾名思义，是在定义之后立即执行的函数。`IIFE`主要以保护变量范围著称，时候也会被称为“自执行的匿名函数”（self-executing anonymous function）。

## 实际使用

### 闭包

定义在`IIFE`内部的变量外界是访问不到的。换句话说，当使用`let`或`const`声明的变量，在块内部才能访问到。(注：块即为`{}`定义的范围)

然而，有时候你会需要修改这些变量，这种情况不可避免。

怎么修改呢：

闭包大家都了解吧，闭包提供了在函数内部访问外部函数范围的能力。创建闭包只不过是在另一个函数内部定义一个函数并且对外暴露该函数。

当闭包跟`IIFE`结合的时候，会有以下两种优势：

1. 变量范围得到安全限制，能够避免被意外行为修改；
2. 你可以在函数外部修改函数内部的变量。这听起来破坏了第一种优势，实际上并没有。因为变量并不能被直接修改，只能通过内部暴露的函数修改。这种方式是安全的。

```javascript
const user = (function() {
  let name = 'anonymous';  
  return {
    getName: _ => name,
    setName: newName => name = newName
  };
})();

console.log(user.getName()) // anonymous
user.setName('Amy');
console.log(user.getName()); // Amy
```

`name`是私有变量，只能在立即执行函数`user`内部修改。但是因为这里我们使用了闭包，我们可以通过暴露`setName()`方法，在外部修改该变量。

### 全局变量的别名

使用大量的`JavaScript`库可能会导致冲突，因为这些库对外暴露的对象可能同名。

比如果你使用了`jQuery`。我们都知道它暴露了`$`作为主要对象。因为，只要在你的项目依赖中有任意库也使用了`$`符号导出变量，冲突就发生了。

幸运的是，你可以通过`立即执行函数`设置别名来解决这个问题：

```javascript
(function ($) {
// You’re safe to use jQuery here
})(jQuery);
```

通过将代码包裹在`IIFE`中，并将`jQuery`作为参数传入，就能保证`$`符号只会引用`jQuery`而不是其他库。

### 安全的变量范围

`ES6`引入了`let`和`const`来以一种更为安全的方式定义变量。使用`var`可能会导致意外行为，因为`var`的范围很容易遭到破坏。

但是如果生产环境不支持`ES6`怎么办呢？或者在某些情况下你不能使用`let`和`const`?

不用担心。你还有`IIFE`可以用，*Immediately Invoked Function Expression*-立即执行函数可以达到相同的目的。

```javascript
(function () {
  var greeting = ‘Good morning! How are you today?’;
  console.log(greeting); // Good morning! How are you today?
})();
console.log(greeting); // error: Uncaught ReferenceError: greeting is not defined
```

正如在以上demo中见到的，在立即执行函数内部执行的，仅仅在`IIFE`内有效。你无法在外部访问`IIFE`内部定义的变量。

### 循环索引

我们可以通过将`setTimeout`放入`IIFE`中，来解决这个问题：

```javascript
for (var i = 0; i < 3; i++) {
    (function(index) {
        setTimeout(_ => console.log(`We’re at ${index}`), 100);
    })(i);
}
```

另外，这是`ES6`的时代，我们可以使用`let`简化代码：

```js
for (let i = 0; i < 3; i++) {
    setTimeout(_ => console.log(`We’re at ${i}`), 100);
}
```

## 语法分析

### 常见错误写法

1. `function (){ }()`

   期望是立即调用一个匿名函数表达式，结果是进行了函数声明，函数声明必须要有标识符做为函数名称。

2. `function g(){ }()`

   期望是立即调用一个具名函数表达式，结果是声明了函数 g。末尾的括号作为分组运算符，必须要提供表达式做为参数。

所以那些匿名函数附近使用括号或一些一元运算符的惯用法，就是来**引导解析器**，指明运算符附近是一个表达式。

### 写法分类

按照这个理解，可以举出五类，超过十几种的让匿名函数表达式立即调用的写法：

**1）使用括号**

```delphi
( function() {}() );
( function() {} )();
[ function() {}() ];
```

**2）使用一元操作符**

```delphi
~ function() {}();
! function() {}();
+ function() {}();
- function() {}();
```

**3）使用void等操作符**

```actionscript
delete function() {}();
typeof function() {}();
void function() {}();
```

**4）使用表达式**

```delphi
var i = function(){ return 10; }();
14.true && function(){ /* code */ }();
15.0, function(){ /* code */ }();
1 ^ function() {}();
1 > function() {}();
```

**5）使用new关键字**

```js
new function(){ /* code */ }

new function(){ /* code */ }() //如果没有参数，最后的()就不需要了
```

但是总体来说，比较常见的是如下三种写法：

```js
// Crockford's preference - parens on the inside
(function() {
  console.log('Welcome to the Internet. Please follow me.');
}()); 

(function() {
  console.log('Welcome to the Internet. Please follow me.'); 

})(); 

!function() {

  console.log('Welcome to the Internet. Please follow me.'); 

}(); 
```
