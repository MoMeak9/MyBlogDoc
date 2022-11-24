---
date: 2021-04-24
star: true
category:
- CSS
- 前端
---

> 关于写公司项目的时候因为没有给组件的`<style>`加上`scoped` 属性，导致影响了整个项目的样式，而且还`push`上了`gitlab`，特别写了此篇避坑，希望大家引以为戒。

# scoped属性的用途和工作原理

## style加scoped的用途和原理

> 在标签上绑定了自定义属性，防止css全局污染
> 但是很多时候使用ui框架如果加scope就不能覆盖，这个时候一般写sass 会在最外层包裹该组件名的id 就可以不使用scoped 了, 不过用/deep/也可以对组件内的样式进行覆盖

用途：防止全局同名CSS污染

原理：在标签加上v-data-something属性，再在选择器时加上对应[v-data-something]，即CSS带属性选择器，以此完成类似作用域的选择方式

![img](https://pic2.zhimg.com/80/v2-75d8c9a12c8b3049677f09fdf72a14dd_720w.png)

**一、scoped会在元素上添加唯一的属性（data-v-x形式），css编译后也会加上属性选择器，从而达到限制作用域的目的。**

缺点：

（1）由于只是通过属性限制，类还是原来的类，所以在其他地方对类设置样式还是可以造成污染。

（2）添加了属性选择器，对于CSS选择器的权重加重了。

（3）外层组件包裹子组件，会给子组件的根节点添加data属性。在外层组件中无法修改子组件中除了根节点以外的节点的样式。比如子组件中有box类，在父节点中设置样式，会被编译为

.box[data-v-x]的形式，但是box类所在的节点上没有添加data属性，因此无法修改样式。

可以使用/deep/或者>>>穿透CSS，这样外层组件设置的box类编译后的就为[data-v-x] .box了，就可以进行修改。

**二、可以使用CSS Module**

CSS Module没有添加唯一属性，而是通过修改类名限制作用域。这样类发生了变化，在其他地方设置样式无法造成污染，也没有使CSS选择器的权重增加。

这里给大家排个坑，这里虽然设置了scoped 如果我们使用bootstrap的话，因为bootstrap是设置的全局属性，可能会有冲突，

## Scoped CSS

当 `<style>` 标签有 `scoped` 属性时，它的 CSS 只作用于当前组件中的元素。这类似于 Shadow DOM 中的样式封装。它有一些注意事项，但不需要任何 polyfill。它通过使用 PostCSS 来实现以下转换：

```html

<style scoped>
    .example {
        color: red;
    }
</style>

<template>
    <div class="example">hi</div>
</template>
```

转换结果：

```html

<style>
    .example[data-v-f3f3eg9] {
        color: red;
    }
</style>

<template>
    <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### 关于css作用域

之前一直很困扰css的作用域问题，即使是模块化编程下，在对应的模块的js中import css进来，这个css仍然是全局的。导致在css中需要加上对应模块的html的id/class 使用css选择器 保证css的作用域不会变成全局
而被其它模块的css污染。

在vue中引入了scoped这个概念，scoped的设计思想就是让当前组件的样式不会修改到其它地方的样式，使用了data-v-hash的方式来使css有了它对应模块的标识，这样写css的时候不需要加太多额外的选择器，方便很多。

但是要注意scoped的作用域，因为权重的问题，如果是在子组件使用了scoped，那么在父组件中是不能直接修改子组件的样式的，需要在父组件中使用vue的深度作用选择器。

### scoped坑点

在覆盖iview组件样式的时候发现一个问题，就是无法覆盖组件原有的样式，最后在github的`issue`中找到了答案： 不要使用`scoped`属性。于是我查找了下关于`scoped`的文章。

我们假设把这种组件叫做模块私有组件，其他的未加scoped的叫做模块一般组件。通过查看DOM结构发现：vue通过在DOM结构以及css样式上加唯一不重复的标记，以保证唯一，达到样式私有化模块化的目的。

**`scoped`三条渲染规则：**

1. 给HTML的DOM节点加一个不重复data属性(形如：`data-v-19fca230`)来表示他的唯一性

2. 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的`data`属性选择器（如`[data-v-19fca230]`）来私有化样式

3. 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性

## 混用本地和全局样式

你可以在一个组件中同时使用有 scoped 和非 scoped 样式：

```html

<style>
    /* 全局样式 */
</style>

<style scoped>
    /* 本地样式 */
</style>
```

### 子组件的根元素

使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

### 深度作用选择器

如果你希望 `scoped` 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 `>>>` 操作符：

```html

<style scoped>
    .a >>> .b { /* ... */
    }
</style>
```

上述代码将会编译成：

```css
.a[data-v-f3f3eg9] .b { /* ... */
}
```

有些像 Sass 之类的预处理器无法正确解析 `>>>`。这种情况下你可以使用 `/deep/` 或 `::v-deep` 操作符取而代之——两者都是 `>>>` 的别名，同样可以正常工作。

### 动态生成的内容

通过 `v-html` 创建的 DOM 内容不受 scoped 样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式。

### 还有一些要留意

- **Scoped 样式不能代替 class**。考虑到浏览器渲染各种 CSS 选择器的方式，当 `p { color: red }` 是 scoped 时 (即与特性选择器组合使用时) 会慢很多倍。如果你使用 class 或者 id
  取而代之，比如 `.example { color: red }`，性能影响就会消除。
- **在递归组件中小心使用后代选择器!** 对选择器 `.a .b` 中的 CSS 规则来说，如果匹配 `.a` 的元素包含一个递归子组件，则所有的子组件中的 `.b` 都将被这个规则匹配。

## **问题补充：**

### 如果不使用`scoped，`如何解决样式全局污染？

推荐使用`scoped`推动组件私有化，文章所提到的不使用仅出现在已有UI库的样式覆盖上（当然人家用了`scoped` 那就很难办了）。

首先，解决**组件样式全局污染**，也就是我们在这里不使用`scoped` 覆盖了样式，那么我们在其他地方调用该组件就会被覆盖。那么我们在使用组件的时候对组件给一个**类名** 或者其他甄别属性（id），覆盖样式就针对该类名进行重写样式。

其次，解决**其他样式全局污染**，如果我们通过：

```vue

<style lang="less">
@import "./test.less";
</style>
```

引进样式，那么不使用`scoped` ，`"./test.less"` 中的其他类名样式可能会污染全局，我这里用一个比较笨的方法处理：在模板中使用两次`<style></style>` 标签：

```vue

<style lang="less" scoped>
@import "./test.less";
</style>
<style lang="less">
//你的覆盖样式
</style>
```

这样既覆盖了样式，其他样式不会被覆盖到全局，感兴趣的同学可以自己试一试。（注意两个标签的顺序）。

官网 [vue-loader](https://vue-loader.vuejs.org/zh/guide/scoped-css.html) 中提到每个vue模板中可以有多个`<style></style>`
标签，所以上面的写法是没有问题的。
