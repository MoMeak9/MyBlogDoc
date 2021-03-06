---
date: 2022-07-13
star: true
category:
- 前端
- JavaScript
---

# 正则表达式卷起来！

>  [jex.im/regulex](https://link.juejin.cn/?target=https%3A%2F%2Fjex.im%2Fregulex)/，正则可视化网站
>
> 参照
>
> [想要白嫖正则是吧？这一次给你个够！](https://juejin.cn/post/7119242343798013959)
>
> [就因为这三个知识点，我彻底学废了”正则表达式“](https://juejin.cn/post/7021672733213720613)
>
> 补充

##  匹配位置

>正则表达式是`匹配模式`，要么`匹配字符`，要么`匹配位置`

**啥是位置？**

正则表达式是匹配模式，要么匹配字符，要么匹配位置。那什么是**位置**呢?

如下图箭头所指，位置可以理解为**相邻字符之间的位置**。

![image-20220714203353764](https://cdn.yihuiblog.top/images/202207142034848.png)

咱们可以和**空字符串**进行类比, 字符的首尾、间隙都可以用空字符串进行连接。

```javascript
'hello' === '' + 'h' + '' + 'e' + '' + 'l' + '' +  'l' + '' + 'o' + '' // true
```

**有哪些位置？**

正则中常用来表示位置的符号主要有：

^、$、\b、\B、?=p、(?!p)、(?<=p)、(?<!p)

### ^

> 脱字符，匹配行的开头

例如要在hello的开头塞一个笑脸(😄 )怎么搞,这个肯定难不倒你

```javascript
let string = 'hello'

console.log(string.replace(/^/, '😄')) // 😄hello


复制代码
```

### $

> 美元符号，匹配行的结尾

同理想在hello的结尾塞一个笑脸(😄 )呢？

```javascript
let string = 'hello'

console.log(string.replace(/$/, '😄')) // hello😄


复制代码
```

这两个表示首尾位置的符号，相信大家一定都很熟悉。

### \b

> 单词的边界（单词与非单词之间），具体讲有三点规则。

① \w和\W之间的位置

②  ^与\w之间的位置

③ \w与$之间的位置

比如藏在你们电脑上`学习教程`文件夹中的某一集种子长这样**xxx_love_study_1.mp4**，想要把他变成`❤️xxx_love_study_1❤️.❤️mp4❤️`怎么搞呢？

```js
'xxx_love_study_1.mp4'.replace(/\b/g, '❤️') // ❤️xxx_love_study_1❤️.❤️mp4❤️
```

<img src="https://cdn.yihuiblog.top/images/202207142105667.png" alt="image-20220714210512597" style="zoom:50%;" />

### \B

> 非单词的边界，也就是\b反着来的意思（非单词与非单词之间），它的规则如下：

① \w与\w之间的位置

② \W与\W之间的位置

③^与\W之间的位置

④\W与$之间的位置

同样还是用`学习教程`文件夹中的种子，稍稍改造一下，当执行这行代码之后，会输出啥？

```javascript
'[[xxx_love_study_1.mp4]]'.replace(/\B/g, '❤️')
```

<img src="https://cdn.yihuiblog.top/images/202207142110484.png" alt="image-20220714211021405" style="zoom:50%;" />

### (?=p)

> 符合p子模式前面的那个位置。换句话说是，有一个位置，紧跟其后需要满足p子模式。也有一个学名叫**正向先行断言**。

还是这个例子`xxx_love_study_1.mp4`，要在xxx(xxx可以指代任何你喜欢的那个TA)前面塞一个❤️,怎么写呢？

是这样吗？ 不是的，这样会导致你的xxx都不见了，那还要❤️做什么呢？

```javascript
'xxx_love_study_1.mp4'.replace('xxx', '❤️') // ❤️_love_study_1.mp4
```

利用(?=p)就可以很方便这这件事（可以想想和上面有什么不同？）

```javascript
'xxx_love_study_1.mp4'.replace(/(?=xxx)/g, '❤️') // ❤️xxx_love_study_1.mp4
```

<img src="https://cdn.yihuiblog.top/images/202207142119898.png" alt="image-20220714211957836" style="zoom:50%;" />

### (?!p)

> (?=p)反过来的意思，可以理解为(?=p)匹配到的位置之外的位置都是属于(?!p)的，它也有一个学名叫负向先行断言。

```javascript
'xxx_love_study_1.mp4'.replace(/(?!xxx)/g, '❤️') 

// (?=xxx)的输出
❤️xxx_love_study_1.mp4
// (?!xxx)的输出
x❤️x❤️x❤️_❤️l❤️o❤️v❤️e❤️_❤️s❤️t❤️u❤️d❤️y❤️_❤️1❤️.❤️m❤️p❤️4❤️
```

仔细对比一下，是不是除了(?=xxx)匹配到最前面那个位置，其他位置都是(?!xxx)匹配到的啦。

### (?<=p)

> 符合p子模式后面(注意(?=p)表示的是前面)的那个位置。换句话说是，有一个位置，其前面的部分需要满足p子模式。

依然是这个例子：我们要在xxx(xxx可以指代任何你喜欢的那个TA)的后面塞一个❤️,怎么写呢？

```javascript
'xxx_love_study_1.mp4'.replace(/(?<=xxx)/g, '❤️') //xxx❤️_love_study_1.mp4
```

### (?<!p)

> (?<=p)反过来的意思，可以理解为(?<=p)匹配到的位置之外的位置都是属于(?<!p)的，

```javascript
'xxx_love_study_1.mp4'.replace(/(?<!xxx)/g, '❤️') 

// (?<=xxx)的输出
xxx❤️_love_study_1.mp4
// (?<!xxx)的输出
❤️x❤️x❤️x_❤️l❤️o❤️v❤️e❤️_❤️s❤️t❤️u❤️d❤️y❤️_❤️1❤️.❤️m❤️p❤️4❤️

复制代码
```

仔细对比一下，是不是除了(?<=xxx)匹配到后面那个位置，其他位置都是(?<!xxx)匹配到的啦。

## 匹配字符串

## 两种模糊匹配

正则如果只有精确匹配，那么便完全没有了意义

### 横向

> 一个正则可匹配的字符串的长度不是固定的，可以是多种情况，通过量词+、*、?、{m,n}，可实现横向匹配

```javascript
let reg = /ab{2,5}c/g
let str = 'abc abbc abbbc abbbbc abbbbbc abbbbbbc'

str.match(reg) // [ 'abbc', 'abbbc', 'abbbbc', 'abbbbbc' ]
```

### 纵向

> 一个正则匹配的字符串，具体到某一位字符时，可以不是某个确定的字符串，可以有多种可能，实现方式是字符组( 其实多选分支|也可以实现 )

```javascript
let reg = /a[123]b/g
let str = 'a0b a1b a2b a3b a4b'

str.match(reg) // [ 'a1b', 'a2b', 'a3b' ]
```

## 字符组

> 不要被名字给糊弄了，虽然他叫做字符组，但其实只是代表一个字符的可能性

### 范围表示法

```javascript
[123456abcdefABCDEF] => [1-6a-fA-F]
```

### 排除字符组

> 某位字符可以是任何东西，但是就是不能是xxx, 使用^符号

问题：如何要表示除了某个单词之外的任意东西呢？

```javascript
[^abc]
```

### 常见简写形式

```javascript
\d // 数字
\D // 非数字
\w // [0-9a-zA-Z_]
\W // [^0-9a-zA-Z_]
\s // [\t\v\n\r\f]
\S // [^\t\v\n\r\f]
.
```

## 量词

### 量词 & 简写

```javascript
1. {m,} // 至少出现m次
2. {m} // 出现m次
3. ? // 出现0次或者1次，等价于{0,1}    
4. + // 至少出现1次,等价于{1,} 
5. * // 出现人一次,等价于{0,}  
```

### 贪婪匹配 VS 惰性匹配 :star:

> 正则本身是贪婪的，会尽可能的多匹配符合模式的字符

```javascript
let regex = /\d{2,5}/g
let string = '123 1234 12345 123456'
// 贪婪匹配
// string.match(regex) // [ 123, 1234, 12345, 12345 ]

// 惰性匹配
let regex2 = /\d{2,5}?/g
// string.match(regex) // [ 12, 12, 34, 12, 34, 12, 34, 56  ]
```

量词后面加一个？，即变成了惰性匹配

```javascript
贪婪量词        惰性量词
{m,n}            {m,n}?
{m,}             {m,}?
?                       ??
+                       +?
*                   *?  
```

## 多选分支

一个模式可以实现横向和纵向的模糊匹配，而多选分支可以支持多个子模式任选其一，形式是(p1|p2|p3)

```javascript
let regex = /good|nice/g
let string = 'good idea, nice try.'

// string.match(regex) // [ 'good', 'nice' ]

// 注意，用/good|goodbye/去匹配'goodbye' 匹配到的是good
// 因为分支结构是惰性的，前面的匹配上了，后面的就不再尝试了
```

## 括号的作用

> 括号的作用是提供了分组(括号内的正则是一个整体，即提供子表达式)，便于我们引用它

### 分组

如何让量词作用于一个整体？

```javascript
let reg = /(ab)+/g
let string = 'ababa abbb ababab'

console.log(string.match(reg)) // ["abab", "ab", "ababab"]
```

### 分支结构

分支结构有点像编程里面或的概念||

```javascript
/*
匹配 
I love JavaScript
I love Regular Expression
*/

let reg = /I love (JavaScript|Regular Expression)/

console.log(reg.test('I love JavaScript')) // true
console.log(reg.test('I love Regular Expression')) // true
```

## 分组引用

通过括号创建子表达式，可以进行数据提取和强大的替换操作，也可以通过js来引用分组内容

### 提取数据:star:

```javascript
/*
提取年月日
2021-08-14
*/

let reg = /(\d{4})-(\d{2})-(\d{2})/

console.log('2021-08-14'.match(reg))
//  ["2021-08-14", "2021", "08", "14", index: 0, input: "2021-08-14", groups: undefined]

// 第二种解法,通过全局的$1...$9读取 引用的括号数据
let reg = /(\d{4})-(\d{2})-(\d{2})/
let string = '2021-08-14'

reg.test(string)

console.log(RegExp.$1) // 2021
console.log(RegExp.$2) // 08
console.log(RegExp.$3) // 14
```

### 数据替换

```javascript
/*
将以下格式替换为mm/dd/yyy
2021-08-14
*/

let reg = /(\d{4})-(\d{2})-(\d{2})/
let string = '2021-08-14'
// 第一种写法
let result1 = string.replace(reg, '$2/$3/$1')
console.log(result1) // 08/14/2021
// 第二种写法
let result2 = string.replace(reg, () => {
    return RegExp.$2 + '/' + RegExp.$3 + '/' + RegExp.$1
})
console.log(result2) // 08/14/2021

// 第三种写法
let result3 = string.replace(reg, ($0, $1, $2, $3) => {
    return $2 + '/' + $3 + '/' + $1
})
// $0 是被匹配成功的整个字符串
console.log(result3) // 08/14/2021
```

## 反向引用（很重要）

除了通过js引用分组的内容，也可以通过正则来引用分组内容

```javascript
/*
    写一个正则支持以下三种格式
  2016-06-12
  2016/06/12
  2016.06-12
*/
let regex = /(\d{4})([-/.])\d{2}\2\d{2}/

var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";

console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // true
console.log( regex.test(string4) ); // false
```

### 注意

1. 引用不存在的分组会怎样？
   1. 即匹配的就是\1 \2本身
2. 分组后面有量词会怎样？
   1. 分组后面如果有量词，分组最终(注意是分组，不是说整体)捕获的数据是最后一次的匹配

```bash
'12345'.match(/(\d)+/) // ["12345", "5", index: 0, input: "12345", groups: undefined]

/(\d)+ \1/.test('12345 1') // false
/(\d)+ \1/.test('12345 5') // true
```

## 非捕获性括号

上面使用的括号都会匹配他们匹配到的数据，以便后续引用，所以也可以称为捕获型分组和捕获型分支。

如果想要括号最原始的功能，但不会引用它，也就是既不会出现在API引用里，也不会出现在正则引用里，可以使用

非捕获性括号（?:p）

```javascript
// 非捕获型引用
let reg = /(?:ab)+/g
console.log('ababa abbb ababab'.match(reg)) // ["abab", "ab", "ababab"]
// 注意这里，因为是非捕获型分组，所以使用match方法时，不会出现在数组的1位置了
let reg = /(?:ab)+/
console.log('ababa abbb ababab'.match(reg)) // ["abab", index: 0, input: "ababa abbb ababab", groups: undefined]
let reg = /(ab)+/
console.log('ababa abbb ababab'.match(reg)) // ["abab", "ab", index: 0, input: "ababa abbb ababab", groups: undefined]
```

## 常用正则~ :headphones:

### 📞号码相关

- 手机号（以 1 开头）：`/^(?:(?:\+|00)86)?1\d{10}$/`
- 手机号（以 13 至19 开头）：`/^(?:(?:\+|00)86)?1[3-9]\d{9}$/`
- 手机号（以工信部公布的手机号段开头）：`/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/`
- 国内固话号码：`/\d{3}-\d{8}|\d{4}-\d{7}/`
- 邮箱号：`/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/`
- 邮政编码：`/[1-9]\d{5}(?!\d)/`
- 身份证号：`/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/`
- 银行卡号（公、私账户）：`/^[1-9]\d{9,29}$/`
- 车牌号：`/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/`
- QQ 号：`/^[1-9][0-9]{4,10}$/`
- 微信号：`/^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/`
- 版本号（ x.y.z ）：`/^\d+(?:\.\d+){2}$/`
- 合法账号1（字母开头，5-16位，允许字母数字下划线）：`/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/`
- 合法账号2（4-16位，允许字母，数字，下划线，减号）：`/^[a-zA-Z0-9_-]{4,16}$/`
- 强密码1（必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间）：`/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/`
- 强密码2（必须包含字母、数字、特殊字符：**@#$%^& *`~()-+=** ）：

```
/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&* ~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^& *~()-+=]+$)(?![0-9\W_!@#$%^&* ~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*~()-+=]/
```

- 网址：`/^(((ht|f)tps?):\/\/)?(^!@#$%^&*?.\s-?\.)+[a-z]{2,6}\/?/`
- 网址带端口号：`/^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/`
- ip-v4：`/\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b/`
- ip-v6：`/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/`

### 🔢数字相关

- 只有数字：`/^[0-9]*$/` 或 `/^\d{1,}$/`
- 整数：`/^-?[0-9]\d*$/`
- 正整数：`/^\+?[1-9]\d*$/`
- 非正整数：`/^-[1-9]\d*|0$/`
- 负整数：`/^-[1-9]\d*$/`
- 非负整数：`/^\d+$/`
- 浮点数：`/^(-?\d+)(\.\d+)?$/`
- 正浮点数：`/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/`
- 负浮点数：`/^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)/`
- 小数：`/^-?\d+\.\d+$/`
- 正数/负数/小数：`/^(\-|\+)?\d+(\.\d+)?$/`
- 正实数保留小数点后 2 位：`/^[0-9]+(.[0-9]{2})?$/`
- 正实数保留小数点后 1 到 3 位：`/^[0-9]+(.[0-9]{1,3})?$/`
- n 位数字：`/^\d{n}$/`
- 至少 n 位数字：`/^\d{n,}$/`
- m 至 n 位的数字：`/^\d{m,n}$/`
- 数字和字母至少包含其一：`/^[A-Za-z0-9]+$/`
- 必须包含数字和字母：`/^(?=.*[a-zA-Z])(?=.*\d).+$/`
- md5 值 ：`/^([a-f\d]{32}|[A-F\d]{32})$/`
- base64 值：`/^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i`

### 🔣字符相关

- m 至 n 位的字符：`/^.{3,20}$/`
- 英文字母字符：`/^[A-Za-z]+$/`
- 大写英文字母字符：`/^[A-Z]+$/`
- 小写英文字母字符：`/^[a-z]+$/`
- 汉字：`/^[\u4e00-\u9fa5]{0,}$/`
- 全角符号：`/[\uFF00-\uFFFF]/`
- 半角符号：`/[\u0000-\u00FF]/`
- 汉字、英文、数字、下划线至少其一：`/^[\u4E00-\u9FA5A-Za-z0-9_]+$/`
- 不包含字符 “~” ：`/[^~\x22]+/`
- 字符连续重复：`/(.)\1+/`

### ⌚时间相关

- 24小时制时间（HH:mm:ss）：`/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/`
- 12小时制时间（hh:mm:ss）：`/^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/`
- 24小时制时间（HHmmss）：`/([0-1]?[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/`
- 日期1（yyyy-MM-dd，如 2222-01-01，年份必为4位）：`/^\d{4}-\d{1,2}-\d{1,2}/`
- 日期2（如 333-01-01，年份可小于4位）：`/^\d{1,4}(-)(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31)$/`
- 日期3（yyyyMMdd，如 20220202）：`/^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229))$/`
- 日期+时间1（YYYYMMDD HH:mm:ss）：`/^\d{4}([/:-\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/`
- 日期+时间2：` /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/`
- 一年 12 个月（(01～09 或 1～12)）：`/^(0?[1-9]|1[0-2])$/`
- 一个月 31 天（01～09 或 1～31）：`/^((0?[1-9])|((1|2)[0-9])|30|31)$/`
- 有 31 天的月份：`/^(0?[13578]|1[02])$/`
- 有 30 天月的份：`/(0[469]|11)-(0[1-9]|[12][0-9]|30)/`
- 2 月 28 天（"02-28"）：`/^02-(0[1-9]|[1][0-9]|2[0-8])$/`
- 闰年：`/^(((19|20)([13579][26]|[2468][048]|0[48]))|(2000))$/`
- 闰年 2 月（比如 2008-02-01）：`/^(((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-(0?[1-9]|[12]\d)$/`
- 日期（包括闰年、大小月的判断）：`/((((19|20)\d{2})-(0?(1|[3-9])|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/`
- 年份区间-年（比如 19 年至 20 年）：`/^((19|20)\d{2})$/`
- 年份区间-年月（比如 1999-01）：`/^((((19|20)\d{2})-(0?[13-9]|1[012]))|(((19|20)\d{2})-(0?[13578]|1[02]))|(((19|20)\d{2})-0?2)|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2))$/`
- 年份区间-年月日（比如 1999-01-01）：`/^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/.test('2021-02-21')$/`
- 年份区间-年月日（间隔符号可为 - / 或空）：`/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))$/`

### 💻编程相关

- 16进制颜色：`/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/`
- 提取网页颜色代码：`/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/`
- 视频链接地址：`/^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i`
- 图片链接地址：`/^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i`
- mac 地址：`/^((([a-f0-9]{2}:){5})|(([a-f0-9]{2}-){5}))[a-f0-9]{2}$/i`
- 子网掩码：`/^((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))$/`
- 文件扩展名效验：`/^([a-zA-Z]\\:|\\\\)\\\\([^\\\\]+\\\\)*[^\\/:*?"<>|]+\\.txt(l)?$/`
- java包名（x.x.x）：`/^([a-zA-Z_]\w*)+([.][a-zA-Z_]\w*)+$/`
- xml文件：`/^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$/`
- html 注释：`/<!--[\s\S]*?-->/g`
- html 标签1：`/<(\w+)[^>]*>(.*?<\/\1>)?/`
- html 标签2：`/<(\S*?)[^>]*>.*?</\1>|<.*? />/`
- 首尾空白字符：`/^\s*|\s*$/`
- 查找CSS属性:`/^\\s*[a-zA-Z\\-]+\\s*[:]{1}\\s[a-zA-Z0-9\\s.#]+[;]{1}/`
- 提取页面超链接:`/(<a\\s*(?!.*\\brel=)[^>]*)(href="https?:\\/\\/)((?!(?:(?:www\\.)?'.implode('|(?:www\\.)?', $follow_list).'))[^" rel="external nofollow" ]+)"((?!.*\\brel=)[^>]*)(?:[^>]*)>/`
- 提取网页图片：`/\\< *[img][^\\\\>]*[src] *= *[\\"\\']{0,1}([^\\"\\'\\ >]*)/`
- 迅雷链接：`/^thunder:\/\/[a-zA-Z0-9]+=$/`
- ed2k链接：`/^ed2k:\/\/|file|.+|\/$/`
- linux"文件"路径：`/^\/(\w+\/)+\w+\.\w+$/`
- window下"文件"路径：`/^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/`

### 🍕生活相关

- 金额（宽松，可为负、首位可为0，支持千分位分隔）：`/^-?\d+(,\d{3})*(\.\d{1,2})?$/`
- 金额（大于 0 ，两位小数）：`/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/`
- 金额（严格，不为负、小数点后最多两位，首位不为0）：`/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/`
- 护照：`/(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/`
- 香港身份证：`/^[a-zA-Z]\d{6}\([\dA]\)$/`
- 澳门身份证：`/^[1|5|7]\d{6}\(\d\)$/`
- 湾湾身份证：`/^[a-zA-Z][0-9]{9}$/`
- 股票代码：`/^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/`
- 不含 abc 的单词：`/\b((?!abc)\w)+\b/`
  
