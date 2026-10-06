![img](https://fs.lwmc.net/uploads/2023/08/1690906074507-202308020007758.webp)

https://www.builder.io/blog/tailwind-css-tips-and-tricks#visually-build-with-your-tailwind-components



在这篇博客文章中，我不会说为什么你应该使用Tailwind。我在之[前的文章](https://www.builder.io/blog/the-tailwind-css-drama-your-users-don't-care-about)中已经详细讨论过这个个争论。

这次我将探讨一些可以显著提升你的Web开发体验的Tailwind技巧。无论你是初学者还是高级的Tailwind用户，我希望你能找到一些有用的东西。

让我们开始吧！

## 动态实用工具类

 Tailwind会清除未使用的类。这就是它能够拥有如此多的功能，同时保持我们的CSS包大小较小的原因。因此，如果你想使用动态类名，你需要在代码的某个地方写下你想要使用的所有类名。这样Tailwind才能够静态分析你的代码。

例如，像这样的代码是行不通的：

```jsx
const DoesntWork = () => {
  const colors = ['red', 'green', 'yellow'];
  const [color, setColor] = React.useState(colors[0]);
  const changeColor = () => {
    setColor('green');
  };
  return (
    <>
      <div className={`w-40 h-40 border bg-${color}-500`}></div>
      <select
        value={color}
        className={`bg-${color}-500`}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="">choose</option>
        {colors.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button onClick={changeColor}>Change color</button>
    </>
  );
};
```

这是因为 Tailwind 无法静态地找到被使用的类。需要`bg-${color}-500`在运行时进行计算。相反的，如果我们确实使用完整的类名，则Tailwind 编译器可以使其起作用：

```jsx
const Works = () => {
  const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500'];
  const [color, setColor] = React.useState(colors[0]);
  const changeColor = () => {
    setColor('bg-green-500');
  };
  return (
    <>
      <div className={`w-40 h-40 border ${color}`}></div>
      <select
        value={color}
        className={`${color}`}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="">choose</option>
        {colors.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button onClick={changeColor}>Change color</button>
    </>
  );
};
```

## 在 CSS 中使用 Tailwind

有时我们被迫使用CSS来设置样式，例如在使用第三方库时。我们可以通过使用@apply指令或theme函数来使用Tailwind的颜色。让我们看一个代码示例：

```css
.__some-external-class {
  /* Using @apply we can use any utility class name from Tailwind */
  @apply text-blue-300 bg-gray-300 py-2 px-6 rounded-lg uppercase;

  /* or using the theme() function */

  color: theme('colors.blue.300');
  background-color: theme('colors.gray.300');
  padding: theme('padding.2') theme('padding.6');
  border-radius: theme('borderRadius.lg');
  text-transform: uppercase;
}
```

### Arbitrary values

在 Tailwind 中编写纯 CSS 的另一种方法是使用方括号 ( `[]`)。这就是所谓的“Arbitrary values 任意值”。你可以这样做：

```html
<div class="w-[100vw] bg-[rebbecapurple]"></div>
```

更重要的是，你还可以使用主题功能：

```html
<div class="grid grid-cols-[fit-content(theme(spacing.32))]">
  <!-- ... -->
</div>
```

如果你想引用[CSS 自定义属性](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)，则无需使用`var`关键字（自 v3.3 起）。你可以简单地将 CSS 变量作为任意值传递：

```html
<div class="bg-[--my-color]">
  <!-- ... -->
</div>
```

此外，你可以轻松定义自定义变量，如下所示：

```html
<div class="--my-color: rebbecapurple">
  <h1 class="bg-[--my-color]">Hello</h1>
</div>
```

## group和peer实用类 

Tailwind允许我们使用诸如`:hover`、`:checked`、`:disabled`、`:focus`等辅助类来根据元素的状态改变其样式（你可以在[这里](https://tailwindcss.com/docs/hover-focus-and-other-states#quick-reference)找到它们）。因此，我们可以很容易地做到这样的效果：

```html
<button class="bg-purple-500 border border-blue-500 text-white text-2xl uppercase p-6 rounded-md m-4 transition-colors hover:bg-purple-800 hover:border-blue-200 hover:text-gray-200">Click me!</button>
```

其结果如下：

<iframe src="https://codepen.io/hamatoyogi/embed/preview/WNYOVgy?default-tabs=html%2Cresult&amp;height=300&amp;host=https%3A%2F%2Fcodepen.io&amp;slug-hash=WNYOVgy" style="top: 0; left: 0; width: 100%; height: 400px; position: absolute; border: 0;" allowfullscreen=""></iframe>

如果我们想要根据另一个元素的状态来改变样式怎么办？这就是peer和group实用类派上用场的地方。

### 基于父元素状态的样式

例如，当父元素被悬停时，我们可以通过将父元素转换为一个组，并使用`group`和`group-hover`实用类来改变子元素的样式：

```html
<div class="relative rounded-xl overflow-auto p-8">
  <a href="#" class="group block max-w-xs mx-auto rounded-lg p-4 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 
     hover:bg-sky-500 
     hover:ring-sky-500">
    <div class="flex items-center space-x-3">
     <svg class="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24">
      <!--  ...  -->
     </svg>
     <h3 class="text-sm text-slate-900 font-semibold group-hover:text-white">New project</h3>
    </div>
    <p class="text-sm text-slate-500 group-hover:text-white">Create a new project from a variety of starting templates.</p>
 </a>
</div>
```

其结果如下：

<iframe src="https://codepen.io/hamatoyogi/embed/preview/GRwEVOr?default-tabs=html%2Cresult&amp;height=300&amp;host=https%3A%2F%2Fcodepen.io&amp;slug-hash=GRwEVOr" style="top: 0; left: 0; width: 100%; height: 400px; position: absolute; border: 0;" allowfullscreen=""></iframe>

还有更多的辅助类可以修改子元素的样式，几乎适用于所有伪类修饰符（[完整列表](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference)）。

#### 基于兄弟状态 sibling state 的样式 

`peer`类修饰符可用于根据兄弟元素的状态来设置元素的样式。你可以使用`peer-{modifier}`，其中`{modifier}`可以是任何伪类修饰符。

这里有一个简单的例子：

```html
<div class="flex flex-col items-center gap-20 p-10 bg-pink-400">
 <p class="peer cursor-pointer">I am sibling 1</p>
 <p class="peer-hover:text-white">I am sibling 2</p>
</div>
```

当我们将鼠标悬停在 "sibling 1 "上时，文本将改变 "sibling 2 "元素：

<img src="https://fs.lwmc.net/uploads/2023/08/1690909606662-202308020106312.gif" alt="1" style="zoom:50%;" />

### 你可以命名他们

无论是在`group`还是`peer`中，你都可以给它们起唯一的名字来区分不同的组和对等元素。

通过在辅助类后面添加`/{name}`来实现，例如：

```html
<div class="group/main w-[30vw] bg-purple-300">
 <div class="group/hello peer/second h-20 w-full flex flex-col items-center justify-around">
  <p class="group-hover/hello:text-white">Hello Wolrd!</p>
  <p>All this code belogs to us</p>
 </div>
 <div class="peer-hover/second:bg-red-400 w-[200px] h-[200px] bg-blue-300">
 </div>
 <div class="group-hover/main:bg-green-200 peer-hover/main:bg-red-400 w-[200px] h-[200px] bg-orange-300">
 </div>
```



