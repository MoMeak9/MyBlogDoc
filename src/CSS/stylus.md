---
date: 2021-04-24
category:
- CSS
- 前端
---

# Stylus 学习整合

> stylus 代码很简介，但是工作过程当中更多的接触的是scss和less，stylus很少人可以驾驭，而且语法更加的简洁和不同

## 特征

冒号可选、分号可选逗号可选、括号可选、变量、插值、混合书写、算术、强制类型转换、动态导入、条件、迭代、嵌套选择、父级参考、变量函数调用、词法作用域、内置函数、内部语言函数、压缩可选、图像内联可选、可执行 `Stylus`、健壮的错误报告、单行和多行注释、`CSS` 字面量、字符转义、`TextMate` 捆绑等。

## 使用

#### 全局安装

```bash
$ npm install stylus -g

```

#### 编译单个文件

```bash
stylus demo.styl

```

#### 编译整个文件夹

```bash
当前文件夹下 stylus

```

#### 动态监听整个文件夹

```bash
stylus -w

```

#### 动态监听整个文件夹并压缩

```bash
stylus -w --compress

```

## 基本语法

### 选择器

#### 缩排

`Stylus` 语法是基于缩进，空格有重要的意义，使用缩排和凹排代替花括号 `{` 及 `}`。

```stylus
body
  color white

```

上面代码对应于：

```stylus
body {
  color: #fff;
}

```

可以加上冒号，用做分隔，便于阅读：

```stylus
body
  color: white

```

#### 规则集

`Stylus` 就跟 `CSS` 一样，允许使用逗号为多个选择器同时定义属性。

```stylus
textarea, input
  border 1px solid #eee

```

使用新行是一样的效果：

```stylus
textarea
input
  border 1px solid #eee

```

等同于：

```stylus
textarea,
input {
  border: 1px solid #eee;
}

```

该规则唯一的例外就是长得像属性的选择器。例如，下面的 `foo bar baz` 可能是个属性或者是选择器。

```stylus
foo bar baz
> input
  border 1px solid

```

为解决这个问题，可以在尾部加个逗号：

```stylus
foo bar baz,
form input,
> a
  border 1px solid

```

#### 父级引用

字符 `&` 指向父选择器。下面这个例子，两个选择器( `textarea` 和 `input` )在 `:hover` 伪类选择器上都改变了 `color` 值

```stylus
textarea
input
  color #A7A7A7
  &:hover
    color #000

```

等同于：

```stylus
textarea,
input {
  color: #a7a7a7;
}
textarea:hover,
input:hover {
  color: #000;
}

```

下面这个例子，`IE浏览器` 利用了父级引用以及混合书写来实现 `2px` 的边框。

```stylus
  box-shadow()
    -webkit-box-shadow arguments
    -moz-box-shadow arguments
    box-shadow arguments
    html.ie8 &,
    html.ie7 &,
    html.ie6 &
      border 2px solid arguments[length(arguments) - 1]

  body
    #login
      box-shadow 1px 1px 3px #eee

```

结果：

```stylus
  body #login {
    -webkit-box-shadow: 1px 1px 3px #eee;
    -moz-box-shadow: 1px 1px 3px #eee;
    box-shadow: 1px 1px 3px #eee;
  }
  html.ie8 body #login,
  html.ie7 body #login,
  html.ie6 body #login {
    border: 2px solid #eee;
  }

```

#### 消除歧义

类似 `padding - n` 的表达式可能既被解释成 `减法运算`，也可能被释义成 `一元负号属性`。为了避免这种歧义，用括号包裹表达式：

```stylus
pad(n)
  padding (- n)

body
  pad(5px)

```

结果：

```stylus
body {
  padding: -5px;
}

```

然而，只有在函数中才会这样（因为函数同时用返回值扮演混合或回调）。 例如，下面这个就是OK的：

```stylus
body
  padding -5px

```

`unquote()` 可以处理有 `Stylus` 无法处理的属性值：

```stylus
filter unquote('progid:DXImageTransform.Microsoft.BasicImage(rotation=1)')

```

结果：

```stylus
filter progid:DXImageTransform.Microsoft.BasicImage(rotation=1)

```

### 变量

#### 变量

我们可以指定表达式为变量，然后在样式中贯穿使用：

```stylus
font-size = 14px

body
  font font-size Arial, sans-seri

```

结果：

```stylus
body {
  font: 14px Arial, sans-serif;
}

```

变量甚至可以组成一个表达式列表：

```stylus
font-size = 14px
font = font-size "Lucida Grande", Arial

body
  font font sans-serif

```

结果：

```stylus
body {
  font: 14px "Lucida Grande", Arial sans-serif;
}

```

标识符（变量名，函数等），也可能包括$字符。例如：

```stylus
$font-size = 14px
body {
  font: $font-size sans-serif;
}

```

#### 属性查找

`Stylus` 有另外一个很酷的独特功能，不需要分配值给变量就可以定义引用属性。下面是个很好的例子，元素水平垂直居中对齐（典型的方法是使用百分比和 `margin` 负值），如下：

```stylus
#logo
  position: absolute
  top: 50%
  left: 50%
  width: w = 150px
  height: h = 80px
  margin-left: -(w / 2)
  margin-top: -(h / 2)

```

我们不使用这里的变量 `w` 和 `h`, 而是简单地前置 `@` 字符在属性名前来访问该属性名对应的值：

```stylus
#logo
  position: absolute
  top: 50%
  left: 50%
  width: 150px
  height: 80px
  margin-left: -(@width / 2)
  margin-top: -(@height / 2)

```

另外使用案例是基于其他属性有条件地定义属性。在下面这个例子中，我们默认指定 `z-index` 值为 `1`，但是，只有在 `z-index` 之前未指定的时候才这样：

```stylus
position()
  position: arguments
  z-index: 1 unless @z-index

#logo
  z-index: 20
  position: absolute

#logo2
  position: absolute

```

属性会 `向上冒泡` 查找堆栈直到被发现，或者返回 `null`（如果属性搞不定）。下面这个例子，`@color` 值为 `blue`.

```stylus
body
  color: red
  ul
    li
      color: blue
      a
        background-color: @color

```

### 插值

#### 插值

`Stylus` 支持通过使用 `{}` 字符包围表达式来插入值，其会变成标识符的一部分。例如，`-webkit-{'border' + '-radius'}` 等同于 `-webkit-border-radius`。比较好的例子就是私有前缀属性扩展：

```stylus
vendor(prop, args)
  -webkit-{prop} args
  -moz-{prop} args
  {prop} args

border-radius()
  vendor('border-radius', arguments)

box-shadow()
  vendor('box-shadow', arguments)

button
  border-radius 1px 2px / 3px 4px

```

结果：

```stylus
button {
  -webkit-border-radius: 1px 2px / 3px 4px;
  -moz-border-radius: 1px 2px / 3px 4px;
  border-radius: 1px 2px / 3px 4px;
}

```

#### 选择器插值

插值也可以在选择器上起作用。例如，我们可以指定表格前 `5` 行的高度，如下：

```stylus
table
  for row in 1 2 3 4 5
    tr:nth-child({row})
      height: 10px * row

```

结果：

```stylus
table tr:nth-child(1) {
  height: 10px;
}
table tr:nth-child(2) {
  height: 20px;
}
table tr:nth-child(3) {
  height: 30px;
}
table tr:nth-child(4) {
  height: 40px;
}
table tr:nth-child(5) {
  height: 50px;
}

```

### 运算符

#### 运算符优先级

下表运算符优先级，从最高到最低：

```stylus
[]
! ~ + -
is defined
** * / %
+ -
... ..
<= >= < >
in
== is != is not isnt
is a
&& and || or
?:
= := ?= += -= *= /= %=
not
if unless

```

#### 一元运算符

以下一元运算符可用，`!`, `not`, `-`, `+`, 以及 `~`.

```stylus
!0              // => true
!!0             // => false
!1              // => false
!!5px           // => true
-5px            // => -5px
--5px           // => 5px
not true        // => false
not not true    // => true

```

逻辑运算符 `not` 的优先级较低，因此，下面这个例子可以替换：

```stylus
a = 0
b = 1
!a and !b       // => false，解析为: (!a) and (!b)

```

用：

```stylus
not a or b      // => false，解析为: not (a or b)

```

#### 二元运算符

`下标运算符[]` 允许我们通过索引获取表达式内部值。`括号表达式` 可以充当元组（如`(15px 5px), (1, 2, 3)` ）。

下面这个例子使用错误处理的元组（并展示了该结构的多功能性）：

```stylus
add(a, b)
  if a is a 'unit' and b is a 'unit'
    a + b
  else
    (error 'a 和 b 必须是 units!')

body
  padding add(1,'5')              // => padding: error "a 和 b 必须是 units";
  padding add(1,'5')[0]           // => padding: error;
  padding add(1,'5')[0] == error  // => padding: true;
  padding add(1,'5')[1]           // => padding: "a 和 b 必须是 units";

```

这儿有个更复杂的例子。现在，我们调用内置的 `error()` 函数，当标识符（第一个值）等于 `error` 的时候返回错误信息。

```stylus
if (val = add(1,'5'))[0] == error
  error(val[1])

```

#### 范围 `..` `...`

同时提供包含界线操作符(`..`)和范围操作符(`...`)，见下表达式：

```stylus
1..5                              // => 1 2 3 4 5
1...5                             // => 1 2 3 4

```

#### 加减：`+` `-`

二元加乘运算其单位会转化，或使用默认字面量值。例如，`5s - 2px` 结果是 `3s`.

```stylus
15px - 5px                        // => 10px
5 - 2                             // => 3
5in - 50mm                        // => 3.031in
5s - 1000ms                       // => 4s
20mm + 4in                        // => 121.6mm
"foo " + "bar"                    // => "foo bar"
"num " + 15                       // => "num 15"

```

#### 乘除：`/` `*` `%`

```stylus
2000ms + (1s * 2)                 // => 4000ms
5s / 2                            // => 2.5s
4 % 2                             // => 0

```

当在属性值内使用 `/` 时候，你必须用括号包住。否则 `/` 会根据其字面意思处理（支持 `CSS` 的 `line-height`）。

```stylus
font: 14px/1.5;                   // 但是，下面这个却等同于14px ÷ 1.5:
font: (14px/1.5);                 // 只有/操作符的时候需要这样。

```

#### 指数：**

指数操作符：

```stylus
2 ** 8                            // => 256

```

#### 相等与关系运算：`==` `!=` `>=` `<=` `>` `<`

相等运算符可以被用来等同单位、颜色、字符串甚至标识符。这是个强大的概念，甚至任意的标识符（例如 `wahoo` ）可以作为原子般使用。函数可以返回 `yes` 和 `no` 代替 `true` 和 `false`（虽然不建议）。

```stylus
5 == 5                            // => true
10 > 5                            // => true
#fff == #fff                      // => true
true == false                     // => false
wahoo == yay                      // => false
wahoo == wahoo                    // => true
"test" == "test"                  // => true
true is true                      // => true
'hey' is not 'bye'                // => true
'hey' isnt 'bye'                  // => true
(foo bar) == (foo bar)            // => true
(1 2 3) == (1 2 3)                // => true
(1 2 3) == (1 1 3)                // => false

```

只有精确值才匹配，例如，`0 == false` 和 `null == false` 均返回 `false`.

别名：

- `==`: is
- `!=`: is not
- `!=`: isnt

#### 真与假

`Stylus` 近乎一切都是 `true`, 包括有后缀的单位，甚至 `0%`, `0px` 等都被认作 `true`. 不过，`0` 在算术上本身是 `false`，表达式（或“列表”）长度大于 `1` 被认为是真。

`true` 例子：

```stylus
0%
0px
1px
-1
-1px
hey
'hey'
(0 0 0)
('' '')

```

`false` 例子：

```stylus
0
null
false

```

#### 逻辑操作符：`&&` `||` 和 `or`

逻辑操作符 `&&` 和 `||` 别名是 `and` / `or`。它们优先级相同。

```stylus
5 && 3                                // => 3
0 || 5                                // => 5
0 && 5                                // => 0
#fff is a 'rgba' and 15 is a 'unit'   // => true

```

#### 存在操作符：`in`

检查左边内容是否在右边的表达式中。 简单的例子：

```stylus
nums = 1 2 3
1 in nums                             // => true
5 in nums                             // => false

```

一些未定义标识符：

```stylus
words = foo bar baz
bar in words                          // => true
HEY in words                          // => false

```

元组同样适用：

```stylus
vals = (error 'one') (error 'two')
error in vals                         // => false
(error 'one') in vals                 // => true
(error 'two') in vals                 // => true
(error 'something') in vals           // => false

```

混合书写适用例子：

```stylus
pad(types = padding, n = 5px)
  if padding in types
    padding n
  if margin in types
    margin n

body
  pad()
body
  pad(margin)
body
  pad(padding margin, 10px)

```

对应于：

```stylus
body {
  padding: 5px;
}
body {
  margin: 5px;
}
body {
  padding: 10px;
  margin: 10px;
}

```

#### 条件赋值：`?=` `:=`

条件赋值操作符 `?=`（别名`?:`）使得无需破坏旧值（如果存在）定义变量。该操作符可以扩展成三元 `is defined` 的二元操作。例如，下面这些作用都是相同的：

```stylus
color := white
color ?= white
color = color is defined ? color : white

```

如果我们使用等号=, 就只是简单地赋值。

```stylus
color = white
color = black
color                             // => black

```

但当使用 `?=`，第二个赋值失效了：

```stylus
color = white
color ?= black
color                             // => white

```

#### 实例检查：`is a`

`Stylus` 提供一个二元运算符叫做 `is a`, 用做类型检查。

```stylus
15 is a 'unit'                    // => true
#fff is a 'rgba'                  // => true
15 is a 'rgba'                    // => false

```

另外，我们可以使用 `type()` 这个内置函数。

```stylus
type(#fff) == 'rgba'              // => true

```

> 注意：`color` 是唯一的特殊情况，当左边是 `RGBA` 或者 `HSLA` 节点时，都为 `true`.

#### 变量定义：`is defined`

此伪二元运算符右边空荡荡，左边无计算。用来检查变量是否已经分配了值。

```stylus
foo is defined                    // => false
foo = 15px
foo is defined                    // => true
#fff is defined                   // => 'invalid "is defined" check on non-variable #fff'

```

另外，我们可以使用内置 `lookup(name)` 方法做这个活动态查找。

```stylus
name = 'blue'
lookup('light-' + name)           // => null
light-blue = #80e2e9
lookup('light-' + name)           // => #80e2e9

```

该操作符必不可少，因为一个未定义的标识符仍是真值。如：

```stylus
body
  if ohnoes
    padding 5px

```

当未定义的时候，产生的是下面的 `CSS`：

```stylus
body {
  padding: 5px;
}

```

显然，这不是我们想要的，如下书写就安全了：

```stylus
body
  if ohnoes is defined
    padding 5px

```

#### 三元

三元运算符的运作正如大部分语言里面的那样。三个操作对象的操作符（条件表达式、真表达式以及假表达式）。

```stylus
num = 15
num ? unit(num, 'px') : 20px                // => 15px

```

#### 铸造

作为替代简洁的内置 `unit()` 函数，语法 `(expr) unit` 可用来强制后缀。

```stylus
body
  n = 5
  foo: (n)em
  foo: (n)%
  foo: (n + 5)%
  foo: (n * 5)px
  foo: unit(n + 5, '%')
  foo: unit(5 + 180 / 2, deg)

```

#### 颜色操作

颜色操作提供了一个简洁，富有表现力的方式来改变其组成。例如，我们可以对每个 `RGB`：

```stylus
#0e0 + #0e0                                 // => #0f0

```

另外一个例子是通过增加或减少百分值调整颜色亮度。颜色亮，加；暗，则减。

```stylus
#888 + 50%                                  // => #c3c3c3
#888 - 50%                                  // => #444

```

我们也可以通过增加或减去色度调整色调。例如，红色增加 `65deg` 就变成了黄色。

```stylus
#f00 + 50deg                                // => #ffd500

```

值适当固定。例如，我们可以"旋转" `180度` 的色调，如果目前的值是 `320deg`, 将变成 `140deg`.

我们也可能一次调整几个值（包括 `alpha`），通过使用 `rgb()`, `rgba()`, `hsl()`, 或 `hsla()`:

```stylus
#f00 - rgba(100,0,0,0.5)                    // => rgba(155,0,0,0.5)

```

#### 格式化字符串

格式化字符串模样的字符串 `%` 可以用来生成字面量值，通过传参给内置 `s()` 方法。

```stylus
'X::Microsoft::Crap(%s)' % #fc0             // => X::Microsoft::Crap(#fc0)

```

多个值需要括起来：

```stylus
'-webkit-gradient(%s, %s, %s)' % (linear (0 0) (0 100%))      // => -webkit-gradient(linear, 0 0, 0 100%)

```

### 混合书写

#### 混入

混入和函数定义方法一致，但是应用却大相径庭。例如，下面有定义的 `border-radius(n)` 方法，其却作为一个 `mixin`（如，作为状态调用，而非表达式）调用。 当 `border-radius()` 选择器中调用时候，属性会被扩展并复制在选择器中。

```stylus
border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius(5px)

```

编译成：

```stylus
form input[type=button] {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

```

使用混入书写，可以完全忽略括号。

```stylus
border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius 5px

```

注意到我们混合书写中的 `border-radius` 当作了属性，而不是一个递归函数调用。

更进一步，我们可以利用 `arguments` 这个局部变量，传递可以包含多值的表达式。

```stylus
border-radius()
  -webkit-border-radius arguments
  -moz-border-radius arguments
  border-radius arguments

```

现在，我们可以像这样子传值：`border-radius 1px 2px / 3px 4px` 另外一个很赞的应用是特定的私有前缀支持——例如IE浏览器的透明度：

```stylus
support-for-ie ?= true

opacity(n)
  opacity n
  if support-for-ie
    filter unquote('progid:DXImageTransform.Microsoft.Alpha(Opacity=' + round(n * 100) + ')')

#logo
  &:hover
    opacity 0.5

```

渲染为：

```stylus
#logo:hover {
  opacity: 0.5;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
}

```

#### 父级引用

混合书写可以利用父级引用字符 `&`, 继承父业而不是自己筑巢。

例如，我们要用 `stripe(even, odd)` 创建一个条纹表格。`even` 和 `odd` 均提供了默认颜色值，每行也指定了 `background-color` 属性。我们可以在 `tr` 嵌套中使用 `&` 来引用 `tr`，以提供 `even` 颜色。

```stylus
stripe(even = #fff, odd = #eee)
 tr
   background-color odd
   &.even
   &:nth-child(even)
       background-color even

```

然后，利用混合书写，如下：

```stylus
table
  stripe()
  td
    padding 4px 10px

table#users
  stripe(#303030, #494848)
  td
    color white

```

另外，`stripe()` 的定义无需父引用：

```stylus
stripe(even = #fff, odd = #eee)
  tr
    background-color odd
  tr.even
  tr:nth-child(even)
    background-color even

```

如果你愿意，你可以把 `stripe()` 当作属性调用。

```stylus
stripe #fff #000

```

#### 混合书写中的混合书写

混合书写可以利用其它混合书写，建立在它们自己的属性和选择器上。 例如，下面创建内联 `comma-list()`（通过 `inline-list()`）以及逗号分隔的无序列表。

```stylus
inline-list()
  li
    display inline

comma-list()
  inline-list()
  li
    &:after
      content ', '
    &:last-child:after
      content ''

ul
  comma-list()

```

渲染：

```stylus
ul li:after {
  content: ", ";
}
ul li:last-child:after {
  content: "";
}
ul li {
  display: inline;
}

```

### 函数

#### 函数

`Stylus` 强大之处就在于其内置的语言函数定义。其定义与混入(`mixins`)一致；却可以返回值。

#### 返回值

例如，两数值相加的方法

```stylus
add(a, b)
  a + b

body
  padding add(10px, 5)

```

渲染：

```stylus
body {
  padding: 15px;
}

```

#### 默认参数

在 `Stylus` 中，可以设置默认参数。例如：

```stylus
add(a, b = a)
  a + b

add(10, 5)                        // => 15
add(10)                           // => 20

```

因为参数默认是赋值，我们可以使用函数调用作为默认值：

```stylus
add(a, b = unit(a, px))
  a + b

```

#### 函数体

可以把简单的 `add()` 方法更进一步。通过内置 `unit()` 把单位都变成 `px`, 因为赋值在每个参数上，因此可以无视单位换算。

```stylus
add(a, b = a)
  a = unit(a, px)
  b = unit(b, px)
  a + b

add(15%, 10deg)                 // => 25

```

#### 多个返回值

`Stylus` 的函数可以返回多个值，就像你给变量赋多个值一样。例如下面就是一个有效赋值：

```stylus
sizes = 15px 10px

sizes[0]                        // => 15px

```

类似的，我们可以在函数中返回多个值：

```stylus
sizes()
 15px 10px

sizes()[0]                      // => 15px

```

有个小小的例外就是返回值是标识符。例如，下面看上去像一个属性赋值给 `Stylus`（因为没有操作符）。

```stylus
swap(a, b)
  b a

```

为避免歧义，可以使用括号，或是 `return` 关键字。

```stylus
swap(a, b)
  (b a)

swap(a, b)
  return b a

```

#### 条件

假如，我们想要创建一个名为 `stringish()` 的函数，用来决定参数是否是字符串。检查 `val` 是否是字符串或缩进（类似字符）。如下，使用 `yes` 和 `no` 代替 `true` 和 `false`.

```stylus
stringish(val)
  if val is a 'string' or val is a 'ident'
    yes
  else
    no

```

使用：

```stylus
stringish('yay') == yes                 // => true
stringish(yay) == yes                   // => true
stringish(0) == no                      // => true

```

> 注意：`yes` 和 `no` 并不是布尔值。

另外一个例子：

```stylus
compare(a, b)
  if a > b
    higher
  else if a < b
    lower
  else
    equal

// 使用：
compare(5, 2)                             // => higher
compare(1, 5)                             // => lower
compare(10, 10)                           // => equal

```

#### 别名

给函数起个别名，例如上面的 `add()` 添加别名plus(), 如下：

```stylus
plus = add

plus(1, 2)                                // => 3

```

#### 变量函数

可以把函数当作变量传递到新的函数中。例如，`invoke()` 接受函数作为参数，因此可以传递`add()` 以及 `sub()`.

```stylus
invoke(a, b, fn)
  fn(a, b)

add(a, b)
  a + b

body
  padding invoke(5, 10, add)
  padding invoke(5, 10, sub)

```

结果：

```stylus
body {
  padding: 15;
  padding: -5;
}

```

#### 参数

`arguments` 是所有函数体都有的局部变量，包含传递的所有参数。

例如：

```stylus
sum()
  n = 0
  for num in arguments
    n = n + num

sum(1,2,3,4,5)                              // => 15

```

#### 哈希示例

下面，我们定义 `get(hash, key)` 方法，用来返回 `key` 值或 `null`. 我们遍历每个键值对，如果键值匹配，返回对应的值。

```stylus
get(hash, key)
  return pair[1] if pair[0] == key for pair in hash

```

下面例子可以证明，语言函数模样的 `Stylus` 表达式具有更大的灵活性。

```stylus
hash = (one 1) (two 2) (three 3)
get(hash, two)                            // => 2
get(hash, three)                          // => 3
get(hash, something)                      // => null

```

## 关键字参数

#### 关键字参数

`Stylus` 支持关键字参数，或 `kwargs`. 允许你根据相关参数名引用参数。

下面这些例子功能上都是一样的。但是，我们可以在列表中的任何地方放置关键字参数。其余不键入参数将适用于尚未得到满足的参数。

```stylus
body {
  color: rgba(255, 200, 100, 0.5);
  color: rgba(red: 255, green: 200, blue: 100, alpha: 0.5);
  color: rgba(alpha: 0.5, blue: 100, red: 255, 200);
  color: rgba(alpha: 0.5, blue: 100, 255, 200);
}

```

等同于：

```stylus
body {
  color: rgba(255,200,100,0.5);
  color: rgba(255,200,100,0.5);
  color: rgba(255,200,100,0.5);
  color: rgba(255,200,100,0.5);
}

```

查看函数或混合书写中接受的参数，可以使用 `p()` 方法。

```stylus
p(rgba)

```

生成：

```stylus
inspect: rgba(red, green, blue, alpha)

```

### 注释

#### 注释

`Stylus` 支持三种注释，单行注释，多行注释，以及多行缓冲注释。

#### 单行注释

跟 `JavaScript` 一样，双斜杠，`CSS` 中不输出。

```stylus
// 我是注释!
body
  padding 5px // padding

```

#### 多行注释

多行注释看起来有点像 `CSS` 的常规注释，它们只有在 `compress` 选项未启用的时候才会被输出。

```stylus
/*
 * 给定数值合体
 */

```

#### 多行缓冲注释

跟多行注释类似，不同之处在于开始的时候，这里是 `/*!`. 这个相当于告诉 `Stylus` 压缩的时候这段无视直接输出。

```stylus
/*!
 * 给定数值合体
 */
```

## Stylus进阶用法

### 剩余参数

#### 剩余参数

`Stylus` 支持 `name...` 形式的其余参数。这些参数可以消化传递给混写或函数的参数们。这在处理浏览器私有属性，如 `-moz` 或 `-webkit` 的时候很管用。下面这个例子中，所有的参数 `(1px, 2px, ...)` 都被一个 `args` 参数给简单处理了：

```stylus
box-shadow(args...)
  -webkit-box-shadow args
  -moz-box-shadow args
  box-shadow args
#login
  box-shadow 1px 2px 5px #eee

```

生成为：

```stylus
#login {
  -webkit-box-shadow: 1px 2px 5px #eee;
  -moz-box-shadow: 1px 2px 5px #eee;
  box-shadow: 1px 2px 5px #eee;
}

```

想指定特定的参数，如 `x-offset`，可以使用 `args[0]`, 或者，可能希望重新定义混入。

```stylus
box-shadow(offset-x, args...)
  got-offset-x offset-x
  -webkit-box-shadow offset-x args
  -moz-box-shadow offset-x args
  box-shadow offset-x args
#login
  box-shadow 1px 2px 5px #eee

```

生成为：

```stylus
#login {
  got-offset-x: 1px;
  -webkit-box-shadow: 1px 2px 5px #eee;
  -moz-box-shadow: 1px 2px 5px #eee;
  box-shadow: 1px 2px 5px #eee;
}
```

#### 参数

`arguments` 变量可以实现表达式的精确传递，包括逗号等等。这可以弥补 `args...` 参数的一些不足，例子：

```stylus
box-shadow(args...)
  -webkit-box-shadow args
  -moz-box-shadow args
  box-shadow args
#login
  box-shadow #ddd 1px 1px, #eee 2px 2px

```

结果并非想要得到的：

```stylus
#login {
  -webkit-box-shadow: #ddd 1px 1px #eee 2px 2px;
  -moz-box-shadow: #ddd 1px 1px #eee 2px 2px;
    box-shadow: #ddd 1px 1px #eee 2px 2px;
}

```

逗号被忽略了。现在使用 `arguments` 重新定义这个混合书写。

```stylus
box-shadow()
  -webkit-box-shadow arguments
  -moz-box-shadow arguments
  box-shadow arguments
body
  box-shadow #ddd 1px 1px, #eee 2px 2px

```

得到想要的结果：

```stylus
body {
  -webkit-box-shadow: #ddd 1px 1px, #eee 2px 2px;
  -moz-box-shadow: #ddd 1px 1px, #eee 2px 2px;
  box-shadow: #ddd 1px 1px, #eee 2px 2px;
}

```

### 条件

#### 条件

条件提供了语言的流控制，否则就是纯粹的静态语言。提供的条件有导入、混入、函数以及更多。

#### if / else if / else

跟一般的语言一致， `if` 表达式满足 `(true)` 的时候执行后面语句块，否则，继续后面的 `else if` 或 `else`.

下面这个例子，根据 `overload` 的条件，决定是使用 `padding` 还是 `margin`.

```stylus
overload-padding = true

if overload-padding
  padding(y, x)
    margin y x

body
  padding 5px 10px

```

另外的例子：

```stylus
box(x, y, margin = false)
  padding y x
  if margin
    margin y x

body
  box(5px, 10px, true)

```

另外的box()帮手：

```stylus
box(x, y, margin-only = false)
  if margin-only
    margin y x
  else
    padding y x

```

#### 除非(unless)

熟悉 `Ruby` 程序语言的用户应该都知道 `unless` 条件，其基本上与 `if` 相反，本质上是 `(!(expr))`.

下面这个例子中，如果 `disable-padding-override` 是 `undefined` 或 `false`, `padding` 将被干掉，显示 `margin` 代替之。但是，如果是 `true`, `padding` 将会如期继续输出 `padding 5px 10px`.

```stylus
disable-padding-override = true

unless disable-padding-override is defined and disable-padding-override
  padding(x, y)
    margin y x

body
  padding 5px 10px

```

#### 后缀条件

`Stylus` 支持后缀条件，这就意味着 `if` 和 `unless` 可以当作操作符；当右边表达式为真的时候执行左边的操作对象。例如，我们定义 `negative()` 来执行一些基本的检查。下面我们使用块式条件：

```stylus
negative(n)
  unless n is a 'unit'
    error('无效数值')
  if n < 0
    yes
  else
    no

```

接下来，利用后缀条件让我们的方法简洁。

```stylus
negative(n)
  error('无效数值') unless n is a 'unit'
  return yes if n < 0
  no

```

当然，我们可以更进一步。如这个 `n < 0 ? yes : no` 可以用布尔代替：`n < 0`。后缀条件适用于大多数的单行语句。如，`@import`, `@charset`, 混合书写等。当然，下面所示的属性也是可以的：

```stylus
pad(types = margin padding, n = 5px)
  padding unit(n, px) if padding in types
  margin unit(n, px) if margin in types
body
  pad()
body
  pad(margin)
body
  apply-mixins = true
  pad(padding, 10) if apply-mixins

```

结果为：

```stylus
body {
  padding: 5px;
  margin: 5px;
}
body {
  margin: 5px;
}
body {
  padding: 10px;
}

```

### 迭代

#### 迭代

`Stylus` 允许你通过 `for/in` 对表达式进行迭代形式如下：

```stylus
for <val-name> [, <key-name>] in <expression>

```

例如：

```stylus
body
  for num in 1 2 3
    foo num

```

生成：

```stylus
body {
  foo: 1;
  foo: 2;
  foo: 3;
}

```

下面这个例子演示了如何使用 `<key-name>`：

```stylus
body
  fonts = Impact Arial sans-serif
  for font, i in fonts
    foo i font

```

生成为：

```stylus
body {
  foo: 0 Impact;
  foo: 1 Arial;
  foo: 2 sans-serif;
}
```
