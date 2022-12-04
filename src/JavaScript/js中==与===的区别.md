---
date: 2022-07-15
category:
- 前端
- JavaScript
---
# js中`==`与`===`的区别

## 介绍

### 起因

当开始使用WebStorm进行编程的时候，原本不会报错的`==``（也是因为过去写java不太在意），突然，满屏黄色波浪线，得换成 `===` 才行，开始发掘是怎么回事......

### JavaScript 中的相等性判断

**ES2015**中有四种相等算法：

- 抽象（非严格）相等比较 (`==`)
- 严格相等比较 (`===`): 用于 `Array.prototype.indexOf`, `Array.prototype.lastIndexOf`, 和 `case`-matching
- 同值零: 用于 `%TypedArray%` 和 `ArrayBuffer `构造函数、以及`Map`和`Set`操作, 并将用于 ES2016/ES7 中的`String.prototype.includes`
- 同值: 用于所有其他地方

JavaScript提供三种不同的值比较操作：

- 严格相等比较 (也被称作"strict equality", "identity", "triple equals")，使用 [===](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity) ,
- 抽象相等比较 ("loose equality"，"double equals") ，使用 [==](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality)
- 以及 `Object.is`（ECMAScript 2015/ ES6 新特性）

本文就js 中 == 和 === 的区别做详细讨论，更多介绍[JavaScript 中的相等性判断](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

## 分析

### js 中 == 和 === 的区别

> `===` 严格相等，会比较两个值的类型和值 `==`  抽象相等，比较时，会先进行类型转换，然后再比较值

#### 举个栗子

```js
console.log([10] == 10);                //true
console.log('10' == 10);                //true
console.log([] == 0);                   //true
console.log(true == 1);                 //true
console.log([] == false);               //true
console.log(![] == false);              //true
console.log('' == 0);                   //true
console.log('' == false);               //true
console.log(null == false);             //false
console.log(!null == true);             //true
console.log(null == undefined);         //true
```

所以，发生什么事了！？？除了 `null==false`是false外，其他的都是true?但是 `!null==true`却是true?这是为啥？

### Strict Equality Comparison === 严格相等

> The comparison x === y, where x and y are values, produces true or false. Such a comparison is performed as follows:
>
> 1. If Type(x) is different from Type(y), return false.
> 2. If Type(x) is Number, then
>    - a. If x is NaN, return false.
>    - b. If y is NaN, return false.
>    - c. If x is the same Number value as y, return true.
>    - d. If x is `+0` and y is `‐0`,return true.
>    - e. If x is ‐0 and y is +0, return true.
>    - f. Return false.
> 3. Return SameValueNonNumber(x, y).
>    **NOTE** This algorithm differs from the SameValue Algorithm in its treatment of signed zeroes and NaNs.

**译文：**

- 如果Type(x)和Type(y)不同，返回false
- 如果Type(x)和Type(y)相同
  - 如果Type(x)是Undefined，返回true
  - 如果Type(x)是Null，返回true
  - 如果Type(x)是String，当且仅当x,y字符序列完全相同（长度相同，每个位置上的字符也相同）时返回true，否则返回false
  - 如果Type(x)是Boolean，如果x,y都是true或x,y都是false返回true，否则返回false
  - 如果Type(x)是Symbol，如果x,y是相同的Symbol值，返回true,否则返回false
  - 如果Type(x)是Number类型
    - 如果x是NaN，返回false
    - 如果y是NaN，返回false
    - 如果x的数字值和y相等，返回true
    - 如果x是+0，y是-0，返回true
    - 如果x是-0，y是+0，返回true
    - 其他返回false

### Abstract Equality Comparison 非严格相等 ==

> The comparison x == y, where x and y are values, produces true or false. Such a comparison is performed as follows:
>
> 1. If Type(x) is the same as Type(y), then
>     a. Return the result of performing Strict Equality Comparison x === y.
> 2. If x is null and y is undefined, return true.
> 3. If x is undefined and y is null, return true.
> 4. If Type(x) is Number and Type(y) is String, return the result of the comparison x == ToNumber(y).
> 5. If Type(x) is String and Type(y) is Number, return the result of the comparison ToNumber(x) == y.
> 6. If Type(x) is Boolean, return the result of the comparison ToNumber(x) == y.
> 7. If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).
> 8. If Type(x) is either String, Number, or Symbol and Type(y) is Object, return the result of the comparison x == ToPrimitive(y).
> 9. If Type(x) is Object and Type(y) is either String, Number, or Symbol, return the result of the comparison ToPrimitive(x)== y.
> 10. Return false.

**译文：**

- 如果Type(x)和Type(y)相同，返回x===y的结果
- 如果Type(x)和Type(y)不同
  - 如果x是null，y是undefined，返回true
  - 如果x是undefined，y是null，返回true
  - 如果Type(x)是Number，Type(y)是String，返回 x==ToNumber(y) 的结果
  - 如果Type(x)是String，Type(y)是Number，返回 ToNumber(x)==y 的结果
  - 如果Type(x)是Boolean，返回 ToNumber(x)==y 的结果
  - 如果Type(y)是Boolean，返回 x==ToNumber(y) 的结果
  - 如果Type(x)是String或Number或Symbol中的一种并且Type(y)是Object，返回 x==ToPrimitive(y) 的结果
  - 如果Type(x)是Object并且Type(y)是String或Number或Symbol中的一种，返回 ToPrimitive(x)==y 的结果
  - 其他返回false

其中涉及到几个es定义的抽象操作：

- Type(x) : 获取x的类型
- ToNumber(x) : 将x转换为Number类型
- ToBoolean(x) : 将x转换为Boolean类型
- ToString(x) : 将x转换为String类型
- SameValueNonNumber(x,y) : 计算非数字类型x,y是否相同
- ToPrimitive(x) : 将x转换为原始值

#### SameValueNonNumber(x,y) 方法

[SameValueNonNumber](http://www.ecma-international.org/ecma-262/#sec-samevaluenonnumber) 方法接收两个参数 x 和 y ，其中 x 和 y 都不是 Number 类型，该方法返回 **true** 或 **false**。

##### 主要规则

1. 断言：x 不是 Number 类型。
2. 断言：x 和 y 是 相同类型。
3. 如果 x 是 Undefined 类型，返回 **true** 。
4. 如果 x 是 Null 类型，返回 **true** 。
5. 如果 x 是 String 类型：
   - 如果 x 和 y 长度相同且相应编码单元相同，返回 **true** 。
   - 否则返回 **false** 。
6. 如果 x 是 Boolean 类型：
   - 如果 x 和 y 都是true 或者 都是false，返回 **true** 。
   - 否则返回 **false** 。
7. 如果 x 是 Symbol 类型：
   - 如果 x 和 y 都是相同 Symbol 值，返回 **true** 。
   - 否则返回 **false** 。
8. 如果 x 和 y 指向同一对象，返回 **true** 。否则返回 **false** 。

##### 小结

**相同类型比较规则（除Number类型）**

1. 都是 undefined，**相等**。
2. 都是 null，**相等**。
3. String 类型中，都是相同字符串，**相等**。
4. Boolean 类型中，都是 true 或者 都是 false，**相等**。
5. Symbol 类型中，都是相同 Symbol 值，**相等**。
6. Object 类型中，引用同一对象，**相等**。

##### 使用

哪些 JavaScript 公开方法采用了 SameValueNonNumber 比较呢？**

1. 公开方法木有
2. 接着看下去你就会知道，撇开数值类型比较，`SameValueNonNumber` 是 `SameValue`、`SameValueZero`、 `===` 的公共方法。

#### 关于-0、+0、0 的疑惑

**明明日常没什么卵用，为什么会有±0？**

- 其实遵从`IEEE754`标准的编程语言都有±0的概念，`IEEE754`标准的64位浮点数，是以`1+11+53`形式的`符号位+阶数位+尾数位`表示。
- 符号位、阶数位、尾数位都是0，那便是`+0`，也就是常规的数字`0`。
- 符号位为1，阶数位、尾数位都是0，那便是 `-0`。
- `IEEE754`还规定了`NaN`、`无穷`及其它的相应规范，有兴趣可自行查找相关资料。

#### ToPrimitive 方法

[传送门](http://www.ecma-international.org/ecma-262/#sec-toprimitive)。内部方法，主要功能是将**引用数据类型**转化为**基本数据类型**。

- 根据内部标记 `hint` 的不同有不同的调用顺序。
- `hint`有三种：**default**、**number**、**string**。**default** 默认遵照 **number** 规则。
- **default/number**：先 valueOf，后 toString。一般转化规则皆如此。
- **string**：先 toString，后 valueOf。如Date对象方法、String()转化等。
- 如果 toString/valueOf 中某一方法返回类型不为对象类型，则直接返回该值，不会继续调用后面方法。如果两者都返回对象类型，会抛 TypeError 错误。

### 理解相等比较的模型

在 ES2015 以前，你可能会说双等和三等是“扩展”的关系。比如有人会说双等是三等的扩展版，因为他处理三等所做的，还做了类型转换。例如 6 == "6" 。反之另一些人可能会说三等是双等的扩展，因为他还要求两个参数的类型相同，所以增加了更多的限制。怎样理解取决于你怎样看待这个问题。

**希望下表可以帮到你：**

|          x          |          y          |  `==`   |  `===`  | `Object.is` |
| :-----------------: | :-----------------: | :-----: | :-----: | :---------: |
|     `undefined`     |     `undefined`     | `true`  | `true`  |   `true`    |
|       `null`        |       `null`        | `true`  | `true`  |   `true`    |
|       `true`        |       `true`        | `true`  | `true`  |   `true`    |
|       `false`       |       `false`       | `true`  | `true`  |   `true`    |
|       `"foo"`       |       `"foo"`       | `true`  | `true`  |   `true`    |
|         `0`         |         `0`         | `true`  | `true`  |   `true`    |
|        `+0`         |        `-0`         | `true`  | `true`  |   `false`   |
|         `0`         |       `false`       | `true`  | `false` |   `false`   |
|        `""`         |       `false`       | `true`  | `false` |   `false`   |
|        `""`         |         `0`         | `true`  | `false` |   `false`   |
|        `"0"`        |         `0`         | `true`  | `false` |   `false`   |
|       `"17"`        |        `17`         | `true`  | `false` |   `false`   |
|       `[1,2]`       |       `"1,2"`       | `true`  | `false` |   `false`   |
| `new String("foo")` |       `"foo"`       | `true`  | `false` |   `false`   |
|       `null`        |     `undefined`     | `true`  | `false` |   `false`   |
|       `null`        |       `false`       | `false` | `false` |   `false`   |
|     `undefined`     |       `false`       | `false` | `false` |   `false`   |
|  `{ foo: "bar" }`   |  `{ foo: "bar" }`   | `false` | `false` |   `false`   |
| `new String("foo")` | `new String("foo")` | `false` | `false` |   `false`   |
|         `0`         |       `null`        | `false` | `false` |   `false`   |
|         `0`         |        `NaN`        | `false` | `false` |   `false`   |
|       `"foo"`       |        `NaN`        | `false` | `false` |   `false`   |
|        `NaN`        |        `NaN`        | `false` | `false` |   `true`    |

## 总结

1. `SameValueZero`、`SameValue`、`===`这仨完全差不多
   - 相同点：
     - 不同类型即不相等。
     - 相同类型遵从`SameValueNonNumber`规则。
   - 不同点：对`±0`、`NaN` 的判断上各有不同。

2. 以 **Array.prototype.includes** 为代表的`SameValueZero`
   - ±0 **相等**
   - NaN 和 NaN **相等**

3. 以 **Object.is** 为代表的`SameValue`
   - ±0 **不相等**
   - NaN 和 NaN **相等**

4. 以 **===**、**Array.prototype.indexOf** 为代表的`===`
   - ±0 **相等**
   - NaN 和 NaN **不相等**

5. ==
   - 相同类型采用`===`严格比较。
   - 不同类型会隐式转换：
     - 基本数据类型转换为 Number 类型再 == 比较。
     - 引用数据类型执行 ToPrimitive 转换后再 == 比较。
     - undefined/null 特例。
