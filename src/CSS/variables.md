# CSS 自定义属性/变量 (variables）

自定义属性（有时候也被称作CSS 变量或者级联变量）是由 CSS 开发者自行定义的，它包含的值可以在整个文档中重复使用。由自定义属性标记设定值（比如： --main-color: black;），由 var() 函数来获取值（比如： color: var(--main-color);）复杂的网站都会有大量的 CSS 代码，通常也会有许多重复的值。

## 基本用法

声明一个自定义属性，属性名需要以两个减号（`--`）开始，属性值则可以是任何有效的 CSS 值。和其他属性一样，自定义属性也是写在规则集之内的，如下：

```css
element {
  --main-bg-color: brown;
}
```

所定义自定义属性需要在其可见作用域内（即被嵌套的标签内使用），通常的最佳实践是定义在根伪类 :root 下，这样就可以在 HTML 文档的任何地方访问到它了：

```css
:root {
  --main-bg-color: brown;
}
```

## 相关知识点

### var() 函数

**`var()`**函数可以代替元素中任何属性中的**值（value）**的任何部分。

**`var()`**方法的第一个参数是要替换的自定义属性的名称。函数的可选第二个参数用作回退值。如果第一个参数引用的自定义属性无效，则该函数将使用第二个值。

```css
<var()> = var( <custom-property-name> , <declaration-value>)
```

#### 举个栗子

```css
/* 后备值 */

/* 在父元素样式中定义一个值 */
.component {
  --text-color: #080; /* header-color 并没有被设定 */
}

/* 在 component 的样式中使用它： */
.component .text {
  color: var(--text-color, black); /* 此处 color 正常取值 --text-color */
}
.component .header {
  color: var(--header-color, blue); /* 此处 color 被回退到 blue */
}
```

#### 特性

- **继承：**自定义属性会继承。这意味着如果在一个给定的元素上，没有为这个自定义属性设置值，在其父元素上的值会被使用。

- **备用值嵌套：**var()本身可以作为第二个值进行无限嵌套

  ```css
  .three {
    background-color: var(--my-var, var(--my-background, pink)); 
  }
  ```

  这样写可能会导致性能问题，因为它花了更多的时间在处理这些变量上。

- **有效性：**当自定义属性值被解析，浏览器不知道它们什么时候会被使用，所以必须认为这些值都是有效的。但是真实情况是，只有当`var()`函数调用的时候才能知道这些值的有效性，即*计算时有效性*。

- **无效情况：**先会检查属性 color 是否为继承属性，如果不是则将该值设置为它的**默认初始值**。

### `:root` 伪类

`:root` 这个 CSS 伪类匹配文档树的根元素。对于 HTML 来说，`:root` 表示 \<html> 元素，除了优先级更高之外，与 html 选择器相同。实践中主要用于声明全局CSS变量。

## 与Less和Sass变量的区别

### 声明

LESS用@符号，SCSS用$符号表示

```less
@link-color:#000
@main-top : search;
```

```scss
$to-color:#000
$main-top : search;
```

### 使用

不同于CSS，声明变量以“插值”的形式使用，并且不但可以表示为数值，文本嵌入表达式，还可以作为类名、属性名等。

```less
@myColor: red;

h1 {
  @myColor: green;   // 只在 h1 里头有用，局部作用域
  color: @myColor;
}

.@{myColor}{
	background-color: red
}

@url-prefix: "http://XXXX";

.test {
  background: url("@{url-prefix}/images/picutre001.png") no-repeat;
}
```

```scss
$myColor: red;

h1 {
  $myColor: green;   // 只在 h1 里头有用，局部作用域
  color: $myColor;
}

// 变量用#{}包裹
.#{$myColor}{
	background-color: red
}

$url-prefix: "http://XXXX";

.test {
  background: url("#{$url-prefix}/images/picutre001.png") no-repeat;
}
```

### Less和Sass作用域规则不同

Less-作用域

```less
@color: #00c; /* 蓝色 */
#header {
  @color: #c00; /* red */
  border: 1px solid @color; /* 红色边框 */
}

#footer {
  border: 1px solid @color; /* 蓝色边框 */
}
```

Less-作用域编译后

```css
#header{border:1px solid #cc0000;}
#footer{border:1px solid #0000cc;}
```

scss-作用域

```scss
$color: #00c; /* 蓝色 */

#header {
  $color: #c00; /* red */
  border: 1px solid $color; /* 红色边框 */
}

#footer {
  border: 1px solid $color; /* 蓝色边框 */
}
```

Sass-作用域编译后

```scss
#header{border:1px solid #c00}
#footer{border:1px solid #c00}
```

Less区分上下级作用域，使用与原生CSS `var()` 一致的作用域规则，SCSS为就近原则，即至顶向下的转换规则。
