---
date: 2023-07-14
category:
  - 浏览器
  - 前端
  - JavaScript
---
# Web浏览器滚动方案一览｜ rAF等

在Web开发中，实现流畅的滚动效果对于提升用户体验至关重要。为了实现这一目标，开发人员可以利用一系列的滚动方案。其中，请求动画帧（requestAnimationFrame，简称rAF）是一种常用的技术。rAF通过优化动画效果的渲染，可以避免卡顿和过度绘制的问题。此外，还有其他滚动方案如CSS动画、滚动事件监听等等，开发人员可以根据具体需求选择合适的方案。通过合理选择和应用这些滚动方案，我们可以提供更加流畅和优化的用户体验。
## Window 大小与文档大小

要获取窗口大小和文档大小，我们可以使用JavaScript编程语言。通过使用window对象的innerWidth和innerHeight属性，我们可以获取窗口的宽度和高度。而要获取文档的大小，我们可以使用document对象的clientWidth和clientHeight属性。这些属性将返回以像素为单位的值，从而使我们能够准确地确定窗口和文档的尺寸。通过使用这些属性，我们可以对网页进行响应式设计，并确保其在不同设备上的显示效果良好。

在 Chrome/Safari/Opera 中，如果没有滚动条，`documentElement.scrollHeight` 甚至可能小于 `documentElement.clientHeight`

为了可靠地获得完整的文档高度，我们应该采用以下这些属性的最大值：

```javascript
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Full document height, with scrolled out part: ' + scrollHeight);
```

为什么这样？最好不要问。这些不一致来源于远古时代，而不是“聪明”的逻辑。

## 获取当前滚动

获取文档或DOM元素当前滚动状态是前端开发中很常见的需求。根据标准，我们可以通过元素的`scrollLeft`和`scrollTop`属性来获取其当前水平和垂直滚动的像素位置。对于整个页面，我们可以使用`document.documentElement`的这两个属性。但是，需要注意，在旧版的WebKit内核浏览器(如早期版本的Safari)中，这两个属性返回无效值，我们需要使用`document.body`来取代。

为了兼容所有主流浏览器，一个更好的方式是直接使用`window`对象的`pageXOffset`和`pageYOffset`属性。这两个属性分别返回页面内容区域从文档左上角滚动了多少像素，它们提供了一种跨浏览器兼容的方式来获取当前页面滚动状态。开发人员不必再记住各种浏览器的差异性，只需要调用这两个属性即可简单高效地实现功能。总体来说，获取滚动状态是前端开发中常见的需求之一。我们应该选择最简单高效且兼容所有主流浏览器的方式来实现它，那就是使用`window.pageXOffset`和`window.pageYOffset`属性。

```js
alert('当前已从顶部滚动：' + window.pageYOffset);
alert('当前已从左侧滚动：' + window.pageXOffset);
```

这些属性是只读的。

> Tips:
>
> **我们也可以从 `window` 的 `scrollX` 和 `scrollY` 属性中获取滚动信息**
>
> 由于历史原因，存在了这两种属性，但它们是一样的：
>
> - `window.pageXOffset` 是 `window.scrollX` 的别名。
> - `window.pageYOffset` 是 `window.scrollY` 的别名。

## 基于浏览器API的滚动方法

### scrollTo

scrollTo 方法用于将页面或元素滚动到指定位置。它接收两个参数，第一个参数是横坐标，第二个参数是纵坐标。

```ts
// 将页面滚动到坐标 (0, 100) 
window.scrollTo(0, 100);

// 将元素 elem 滚动到坐标 (0, 0)
elem.scrollTo(0, 0);
```

scrollTo 方法支持传入behavior，这样可以实现平滑滚动效果。例如：

```ts
window.scrollTo({
  top: 100,
  behavior: 'smooth'
});
```

scrollTo 方法对整个页面和单个元素都起作用，常用于点击某个按钮后滚动到页面指定位置，或者滚动元素内部内容。

### scrollBy

scrollBy 方法用于将页面或元素相对当前位置滚动指定的距离。

方法 `scrollBy(x,y)` 将页面滚动至 **相对于当前位置的 `(x, y)` 位置**。例如，`scrollBy(0,10)` 会将页面向下滚动 `10px`。

```ts
// 让元素滚动
elem.scrollBy(300, 300);
```

使用 `options`:

```ts
elem.scrollBy({
  top: 100,
  left: 100,
  behavior: "smooth",
});
```

### scrollIntoView

为了完整起见，让我们再介绍一种方法：[elem.scrollIntoView(top)](https://developer.mozilla.org/zh/docs/Web/API/Element/scrollIntoView)。

```js
// 将元素 elem 滚动到可视区域
elem.scrollIntoView();
```

对 `elem.scrollIntoView(top)` 的调用将滚动页面以使 `elem` 可见。它有一个参数`alignToTop`：

- 如果 `top=true`（默认值），页面滚动，使 `elem` 出现在窗口顶部。元素的上边缘将与窗口顶部对齐。
- 如果 `top=false`，页面滚动，使 `elem` 出现在窗口底部。元素的底部边缘将与窗口底部对齐。

亦或是接受一个包含以下属性的对象：

- behavior：定义滚动是立即的还是平滑的动画。可以取值为 smooth（平滑动画）、instant（立即发生）或 auto（由 scroll-behavior 的计算值决定）。
- block：定义垂直方向的对齐方式，可以取值为 start（顶部对齐）、center（居中对齐）、end（底部对齐）或 nearest（最近对齐）。默认为 start。
- inline：定义水平方向的对齐方式，可以取值为 start（左对齐）、center（居中对齐）、end（右对齐）或 nearest（最近对齐）。默认为 nearest。

```js
const elem = document.getElementById("box");

elem.scrollIntoView();
elem.scrollIntoView(false);
elem.scrollIntoView({ block: "end" });
elem.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
```

## 实现滚动动画

### 使滚动动画并兼容非现代浏览器

`behavior: "smooth"` 等使用behavior参数的Scroll API需要在较高版本浏览器（实际上主要是Safari浏览器版本要求较高）：

<img src="https://fs.lwmc.net/uploads/2023/10/1696517179824-202310052246610.webp" alt="image-20231005224618442" style="zoom: 67%;" />

如图所示的`window.scrollTo` API 中behavior参数的兼容性，所以通常需要补充一下非现代浏览器的方法作为兜底：

1. 实现基于raf的滚动函数`ScrollTo`

   ```ts
   /**
    * @description 基于raf的滚动函数
    * @param el 元素
    * @param to 目标滚动位置
    * @param duration 动画时长 ms
    */
   export const rAFScrollTo = (el: HTMLElement, to: number, duration: number) => {
     const start = el.scrollTop
     const change = to - start
     const increment = 1000 / 60
     let currentTime = 0
     let requestId: number | undefined
   
     const cancelRAF = () => {
       if (requestId) {
         cancelAnimationFrame(requestId)
         window.removeEventListener('wheel', cancelRAF)
       }
     }
     // 监听鼠标滚轮
     window.addEventListener('wheel', cancelRAF)
   
     const animateScroll = () => {
       currentTime += increment
       el.scrollTop = easeInOutQuad(currentTime, start, change, duration)
       if (currentTime < duration) {
         requestId = requestAnimationFrame(animateScroll)
       }
     }
   
     const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
       t /= d / 2
       if (t < 1) return (c / 2) * t * t + b
       t--
       return (-c / 2) * (t * (t - 2) - 1) + b
     }
   
     animateScroll()
   }
   ```

2. scrollBy 兼容在非现代浏览器的平滑滚动

   ```ts
   /**
    * @description scrollBy 兼容在非现代浏览器的平滑滚动
    * @param options 传入参数
    * @param options.el 元素
    * @param options.offset 滚动相对距离
    * @param options.duration 动画时长 ms
    * @param options.useRAF 使用RAF动画
    */
   export const scrollBy = ({
     el,
     offset,
     duration = 500,
     useRAF = false,
   }: {
     el: HTMLElement
     offset: number
     duration: number
     useRAF?: boolean
   }) => {
     if (
       typeof window.getComputedStyle(document.body).scrollBehavior ==
         'undefined' ||
       useRAF
     ) {
       // 传统的JS平滑滚动处理代码
       const start = el.scrollTop
       rAFScrollTo(el, start + offset, duration)
     } else {
       el.scrollBy({
         top: offset,
         behavior: 'smooth',
       })
     }
   }
   ```

3. scrollIntoView 兼容在非现代浏览器的平滑滚动

   ```ts
   /**
    * @description scrollIntoView 兼容在非现代浏览器的平滑滚动
    * @param options 传入参数
    * @param options.el 元素
    * @param options.scrollMarginTop 滚动时距离viewport的上边距
    * @param options.duration 动画时长 ms
    * @param options.useRAF 使用RAF动画
    */
   export const scrollIntoView = ({
     el,
     scrollMarginTop = 0,
     duration = 500,
     useRAF = false,
   }: {
     el: HTMLElement
     scrollMarginTop: number
     duration: number
     useRAF?: boolean
   }) => {
     if (
       typeof window.getComputedStyle(document.body).scrollBehavior ==
         'undefined' ||
       useRAF
     ) {
       const { top } = el.getBoundingClientRect()
       const pageYOffset = window.pageYOffset
       const to = top + pageYOffset - scrollMarginTop
       rAFScrollTo(document.documentElement, to, duration)
     } else {
       el.style.scrollMarginTop = scrollMarginTop + 'px'
       el.scrollIntoView({
         behavior: 'smooth',
       })
       el.style.scrollMarginTop = '0px'
     }
   }
   ```

## 禁止滚动

有时候我们需要使文档“不可滚动”。要使文档不可滚动，只需要设置 `document.body.style.overflow = "hidden"`。该页面将“冻结”在其当前滚动位置上。这个方法的缺点是会使滚动条消失。如果滚动条占用了一些空间，它原本占用的空间就会空出来，那么内容就会“跳”进去以填充它。

这看起来有点奇怪，但是我们可以对比冻结前后的 `clientWidth`。如果它增加了（滚动条消失后），那么我们可以在 `document.body` 中滚动条原来的位置处通过添加 `padding`，来替代滚动条，这样这个问题就解决了。保持了滚动条冻结前后文档内容宽度相同。

亦或是参考这篇文章：[css - 如何解决滚动条scrollbar出现造成的页面宽度被挤压的问题？ - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000017044563)

## 参考

>  - [【前端性能】高性能滚动 scroll 及页面渲染优化-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1136660)
>  - [pointer-events:none提高页面滚动时候的绘制性能？ « 张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/2014/01/pointer-events-none-avoiding-unnecessary-paints/)
>  - [平滑滚动的实现(上) - 掘金](https://juejin.cn/post/6844903925473083405)