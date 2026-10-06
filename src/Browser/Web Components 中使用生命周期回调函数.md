---
date: 2023-09-07
category:
  - 浏览器
  - 前端
  - WebComponent
---
# Web Components 中使用生命周期回调函数

在 custom element 的构造函数中，可以指定多个不同的回调函数，它们将会在元素的不同生命时期被调用。这是 Web Components 技术中的一个重要特性，它能够让开发者更加灵活地控制元素的行为

- `connectedCallback`：当 custom element 首次被插入文档 DOM 时，被调用。
- `disconnectedCallback`：当 custom element 从文档 DOM 中删除时，被调用。
- `adoptedCallback`：当 custom element 被移动到新的文档时，被调用。
- `attributeChangedCallback`: 当 custom element 增加、删除、修改自身属性时，被调用。

其中，`connectedCallback` 是在 custom element 首次被插入文档 DOM 时被调用的。这个回调函数通常用于执行一些初始化操作，比如添加事件监听器、请求数据等等。在这个时候，元素已经被添加到了文档中，可以访问到 DOM 和其他元素。

`disconnectedCallback` 是在 custom element 从文档 DOM 中删除时被调用的。这个回调函数通常用于清理一些资源，比如取消事件监听器、停止定时器等等。在这个时候，元素已经不再被文档所包含，无法访问到 DOM 和其他元素。

`adoptedCallback` 是在 custom element 被移动到新的文档时被调用的。这个回调函数通常用于处理一些文档级别的操作，比如重新计算布局（重排）、修改样式等等。在这个时候，元素已经从原来的文档中移除，并被添加到了新的文档中。

`attributeChangedCallback` 是在 custom element 增加、删除、修改自身属性时被调用的。这个回调函数通常用于处理一些属性相关的逻辑，比如根据属性值的变化更新元素的样式、重新渲染元素等等。在这个时候，元素的属性已经被修改，可以通过新的属性值来进行相应的处理。

需要注意的是，这些回调函数都是可选的，开发者可以根据实际需求来选择使用哪些回调函数。另外，这些回调函数只能在 custom element 的构造函数中进行定义，不能在元素实例中进行修改。

### 用法示例

我们来看一下它们的一下用法示例。下面的代码出自[life-cycle-callbacks](https://github.com/mdn/web-components-examples/tree/master/life-cycle-callbacks)示例（[查看在线示例](https://mdn.github.io/web-components-examples/life-cycle-callbacks/)）。这个简单示例只是生成特定大小、颜色的方块。custom element 看起来像下面这样：

```html
<custom-square l="100" c="red"></custom-square>
```

这里，类的构造函数很简单 — 我们将 shadow DOM 附加到元素上，然后将一个[`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div)元素和[`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style)元素附加到 shadow root 上：

```js
var shadow = this.attachShadow({ mode: "open" });

var div = document.createElement("div");
var style = document.createElement("style");
shadow.appendChild(style);
shadow.appendChild(div);
```

示例中的关键函数是 `updateStyle()`—它接受一个元素作为参数，然后获取该元素的 shadow root，找到`<style>`元素，并添加[`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width)，[`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)以及[`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color)样式。

```js
function updateStyle(elem) {
  var shadow = elem.shadowRoot;
  shadow.querySelector("style").textContent = `
    div {
      width: ${elem.getAttribute("l")}px;
      height: ${elem.getAttribute("l")}px;
      background-color: ${elem.getAttribute("c")};
    }
  `;
}
```

实际的更新操作是在生命周期的回调函数中处理的，我们在构造函数中设定类这些回调函数。当元素插入到 DOM 中时，`connectedCallback()`函数将会执行 — 在该函数中，我们执行`updateStyle()` 函数来确保方块按照定义来显示；

```js
connectedCallback() {
  console.log('Custom square element added to page.');
  updateStyle(this);
}
```

`disconnectedCallback()`和`adoptedCallback()`回调函数只是简单地将消息发送到控制台，提示我们元素什么时候从 DOM 中移除、或者什么时候移动到不同的页面：

```js
disconnectedCallback() {
  console.log('Custom square element removed from page.');
}

adoptedCallback() {
  console.log('Custom square element moved to new page.');
}
```

每当元素的属性变化时，`attributeChangedCallback()`回调函数会执行。正如它的属性所示，我们可以查看属性的名称、旧值与新值，以此来对元素属性做单独的操作。在当前的示例中，我们只是再次执行了`updateStyle()`函数，以确保方块的样式在元素属性值变化后得以更新：

```js
attributeChangedCallback(name, oldValue, newValue) {
  console.log('Custom square element attributes changed.');
  updateStyle(this);
}
```

需要注意的是，如果需要在元素属性变化后，触发`attributeChangedCallback()`回调函数，你必须监听这个属性。这可以通过定义`observedAttributes()` get 函数来实现，`observedAttributes()`函数体内包含一个 return 语句，返回一个数组，包含了需要监听的属性名称：

```js
static get observedAttributes() {return ['w', 'l']; }
```

**完整代码**

```js
// Create a class for the element
class Square extends HTMLElement {
  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
    return ['c', 'l'];
  }

  constructor() {
    // Always call super first in constructor
    super();

    const shadow = this.attachShadow({mode: 'open'});

    const div = document.createElement('div');
    const style = document.createElement('style');
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  connectedCallback() {
    console.log('Custom square element added to page.');
    updateStyle(this);
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
    updateStyle(this);
  }
}

customElements.define('custom-square', Square);

function updateStyle(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
      background-color: ${elem.getAttribute('c')};
    }
  `;
}

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');
let square;

update.disabled = true;
remove.disabled = true;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

add.onclick = function() {
  // Create a custom square element
  square = document.createElement('custom-square');
  square.setAttribute('l', '100');
  square.setAttribute('c', 'red');
  document.body.appendChild(square);

  update.disabled = false;
  remove.disabled = false;
  add.disabled = true;
};

update.onclick = function() {
  // Randomly update square's attributes
  square.setAttribute('l', random(50, 200));
  square.setAttribute('c', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
};

remove.onclick = function() {
  // Remove the square
  document.body.removeChild(square);

  update.disabled = true;
  remove.disabled = true;
  add.disabled = false;
};
```

Custom element 的生命周期回调函数是 Web Components 技术中的一个重要特性，它能够让开发者更加灵活地控制元素的行为。通过合理地使用这些回调函数，可以让自定义元素更加易用、易维护，提高开发效率和代码质量。