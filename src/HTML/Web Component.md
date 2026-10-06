> 原文：https://www.robinwieruch.de/web-components-tutorial/
>
> 原标题：Web Components Tutorial for Beginners
>
> 作者：ROBIN WIERUCH

本教程将教你如何构建你的第一个Web Components以及如何在应用程序中使用它们。在我们开始之前，让我们花点时间了解一下Web Components的一般情况：近年来，Web Components（也称为自定义元素）已成为几个浏览器的标准API，允许开发人员只使用HTML、CSS和JavaScript来实现可重用的组件。这里不需要React、Angular或Vue。相反，自定义元素为你提供了将所有结构（HTML）、样式（CSS）和行为（JavaScript）封装在一个自定义HTML元素中的功能。例如，想象一下，你可以拥有一个像以下代码片段中的HTML下拉组件：

```html
<my-dropdown
  label="Dropdown"
  option="option2"
  options='{ "option1": { "label": "Option 1" }, "option2": { "label": "Option 2" } }'
></my-dropdown>
```

在本教程中，我们将使用Web Components从头开始逐步实现此下拉组件。之后，你可以在整个应用程序中继续使用它，将其作为开源Web Components安装在其他地方，或者使用像React这样的框架中，在Web Components的坚实基础上构建React应用程序。

## 为什么选 Web Components

一个个人故事，用来说明如何从Web Components中受益：当我有一个客户，他有很多跨职能团队，想要基于一个样式指南创建一个UI库时，我开始接触Web Components。两个团队开始根据样式指南实现组件，但每个团队使用了不同的框架：React和Angular。尽管这两个实现在结构（HTML）和样式（CSS）上与样式指南有些相似，但行为的实现（例如打开/关闭下拉菜单，在下拉菜单中选择项目）由各个团队根据他们所选择的框架来实现。此外，如果样式指南在组件的样式或结构上出现错误，每个团队都会单独修复这些错误，而不会随后调整样式指南。不久之后，这两个UI库在外观和行为上开始分歧。

*注意：与Web Components无关，这是样式指南的一个常见缺陷，如果它们不被积极使用（例如作为活动样式指南）在代码中，而只是作为逐渐过时的文档。*

最终，两个团队走到了一起，讨论如何解决问题。他们请我研究Web Components，看看它们是否能解决他们的问题。事实上，Web Components 提供了一个令人信服的解决方案：两个团队可以根据样式指南实现共同的Web Components。像下拉菜单、按钮和表格这样的组件只需使用HTML、CSS和JavaScript来实现。此外，他们不必强制使用Web Components来实现他们后续的个别应用程序，而是可以在他们的React或Angular应用程序中使用这些组件。如果样式指南的要求发生变化，或者需要修复一个组件，两个团队可以在他们共享的Web ComponentsUI库上进行合作。

## 开始使用Web Components

如果你需要以下教程的入门项目，可以[从 GitHub 克隆此项目](https://github.com/rwieruch/web-components-starter-kit)。你应该查看*dist/*和*src/*文件夹，以便根据教程进行调整。[本教程的完成项目可以在 GitHub 上](https://github.com/rwieruch/web-components-dropdown)找到。

让我们开始使用我们的第一个 Web 组件。我们不会从一开始就实现下拉组件，而是一个简单的按钮组件，稍后会在下拉组件中使用。使用 Web 组件实现一个简单的按钮组件没有多大意义，因为你可以使用`<button>`带有一些 CSS 的元素，但是，为了学习 Web 组件，我们将从这个按钮组件开始。因此，以下代码块足以为具有自定义结构和样式的单个按钮创建 Web 组件：

```jsx
const template = document.createElement('template');

template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }

    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;

      width: 100%;
      height: 40px;

      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
    }
  </style>

  <div class="container">
    <button>Label</button>
  </div>
`;

class Button extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('my-button', Button);
```

让我们逐步进行所有步骤。自定义元素（Web Components）的定义是通过一个继承自HTMLElement的JavaScript类来完成的，该类可以帮助你实现任何自定义HTML元素。通过继承自它，你将可以访问各种类方法，例如组件的生命周期回调（生命周期方法），这些方法有助于你实现Web Components。稍后你将看到我们如何利用这些类方法。

此外，Web Components使用Shadow DOM，不应将其与虚拟DOM（性能优化）混淆。Shadow DOM用于封装CSS、HTML和JavaScript，以便对使用Web Components的外部组件/HTML进行隐藏。你可以为Shadow DOM设置模式，在我们的情况下设置为true，以使Shadow DOM在某种程度上对外界可访问。无论如何，你可以将Shadow DOM视为自定义元素内部的自己的子树，该子树封装了结构和样式。

构造函数中的另一个语句通过克隆上述声明的模板来将一个子元素附加到我们的Shadow DOM上。模板通常用于使HTML可重用。然而，在Web Components中，模板也在定义其结构和样式方面起着关键作用。在我们的自定义元素顶部，我们使用这样的模板来定义结构和样式，该模板在自定义元素的构造函数中使用。

我们代码片段的最后一行通过在window上定义自定义元素将其定义为我们的HTML的有效元素。第一个参数是我们可重用自定义元素的名称作为HTML，必须有一个连字符，第二个参数是我们自定义元素的定义，包括呈现的模板。之后，我们可以在我们的HTML中的某个地方使用我们的新自定义元素`<my-button></my-button>`。请注意，自定义元素不能/不应用作自闭合标签。

## 如何将属性传递给 Web Components？

到目前为止，我们的自定义元素除了拥有自己的结构和样式之外并没有做太多事情。我们可以通过使用带有一些 CSS 的按钮元素来实现同样的效果。不过，为了了解 Web 组件，我们继续讨论自定义按钮元素。就目前而言，我们无法改变它显示的内容。例如，将标签作为 HTML 属性传递给它怎么样：

```html
<my-button label="Click Me"></my-button>
```

渲染的输出仍将显示使用字符串的内部自定义元素的模板`Label`。为了使自定义元素对这个新属性做出反应，你可以监听它，并使用来自扩展 HTMLElement 类的类方法对其执行某些操作：

```js
class Button extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['label'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}
```

每次标签属性发生变化时，都会调用attributeChangedCallback()函数，因为我们在observedAttributes()函数中将标签定义为可观察的属性。在我们的情况下，回调函数除了在我们的Web Components类实例上设置标签（这里是：this.label = 'Click Me'）之外，没有太多的操作。然而，自定义元素仍然没有渲染这个标签。为了调整渲染的输出，你必须获取实际的HTML按钮并设置其HTML内容：

```js
class Button extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$button = this._shadowRoot.querySelector('button');
    }

    static get observedAttributes() {
        return ['label'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;

        this.render();
    }

    render() {
        this.$button.innerHTML = this.label;
    }
}
```

现在，初始标签属性已在按钮中设置。此外，自定义元素也将对属性的更改做出反应。你可以以相同的方式实现其他属性。但是，你会注意到非JavaScript原始类型（如对象和数组）需要以JSON格式的字符串形式传递。在实现下拉组件时，我们将在稍后看到这一点。

## 将属性映射到属性

到目前为止，我们已经使用属性将信息传递给我们的自定义元素。每当属性发生变化时，我们在回调函数中将该属性设置为我们Web Components实例上的属性。然后，我们以命令方式进行所有必要的更改以进行渲染。但是，我们也可以使用一个获取方法将属性反映到属性。通过这种方式，我们确保始终获得最新的值，而无需在回调函数中自己进行分配。然后，this.label总是从我们的getter函数返回最新的属性：

```js
class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$button = this._shadowRoot.querySelector('button');
  }

  get label() {
    return this.getAttribute('label');
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$button.innerHTML = this.label;
  }
}
```

这就是将属性映射到属性的全部内容。然而，反过来，你也可以使用属性将信息传递给自定义元素。例如，我们可以将信息设置为元素的属性，而不是使用属性`<my-button label="Click Me"></my-button>`来渲染我们的按钮。通常，当将对象和数组等信息分配给元素时，会使用这种方式：

```html
<my-button></my-button>

<script>
  const element = document.querySelector('my-button');
  element.label = 'Click Me';
</script>
```

很不幸，当使用属性而不是属性时，我们用于更改属性的回调函数不再被调用，因为它只对属性更改做出反应，而不处理属性赋值。这就是我们类中的set方法派上用场的地方：

```js
class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$button = this._shadowRoot.querySelector('button');
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$button.innerHTML = this.label;
  }
}
```

现在，由于我们从元素的外部*设置属性*，因此我们的自定义元素的 setter 方法通过将元素的属性设置为反射的属性值，确保将属性**反映到属性。**之后，我们的属性回调再次运行，因为属性已更改，因此我们恢复了渲染机制。

你可以为此类的每个方法添加控制台日志，以了解每个方法发生的顺序。通过打开浏览器的开发工具，也可以在 DOM 中见证整个反射：即使属性被设置为属性，属性也应该出现在元素上。

最后，在为我们的信息准备好 getter 和 setter 方法之后，我们可以将信息作为属性和特性传递给我们的自定义元素。整个过程称为**将属性反映到属性**，反之亦然。

## 如何将函数传递给 Web Components？

最后但并非最不重要的是，我们需要在点击时使我们的自定义元素起作用。首先，自定义元素可以注册一个事件监听器来响应用户的交互。例如，我们可以选择按钮并为其添加一个事件监听器：

```js
class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$button = this._shadowRoot.querySelector('button');

    this.$button.addEventListener('click', () => {
      // do something
    });
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$button.innerHTML = this.label;
  }
}
```

*注意：可以简单地在元素的外部添加此监听器，而不需要在自定义元素中烦恼 -- 然而，将其定义在自定义元素内部可以更好地控制应该传递给外部注册的监听器的内容。*

缺少的是从外部传递的回调函数，可以在此监听器中调用。有多种方法可以解决这个任务。首先，我们可以将函数作为属性传递。然而，由于我们已经了解到将非原始类型传递给HTML元素是麻烦的，我们希望避免这种情况。其次，我们可以将函数作为属性传递。让我们看看当使用我们的自定义元素时，这将是什么样子：

```html
<my-button label="Click Me"></my-button>

<script>
  document.querySelector('my-button').onClick = value =>
    console.log(value);
</script>
```

我们刚刚将一个onClick处理程序定义为我们元素的函数。接下来，在我们自定义元素的监听器中，我们可以调用这个函数属性：

```js
class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$button = this._shadowRoot.querySelector('button');

    this.$button.addEventListener('click', () => {
      this.onClick('Hello from within the Custom Element');
    });
  }
  ...
}
```

如果你没有在自定义元素内部使用监听器，你只会接收到事件。你可以自己尝试一下。现在，即使这样按预期工作，我宁愿使用DOM API提供的内置事件系统。因此，让我们从外部注册一个事件监听器，而不将函数分配为元素的属性：

```html
<my-button label="Click Me"></my-button>

<script>
  document
    .querySelector('my-button')
    .addEventListener('click', value => console.log(value));
</script>
```

点击按钮时的输出与之前的相同，但这次使用了点击交互的事件监听器。这样，自定义元素仍然能够通过使用点击事件向外界发送信息，因为我们从自定义元素的内部工作中发送的消息仍然会被发送并可以在浏览器的日志中看到。通过这种方式，如果不需要特殊的行为，也可以省略在自定义元素中定义事件监听器的步骤，如前所述。

然而，通过这种方式留下的一个注意事项是：我们只能使用内置事件来处理自定义元素。然而，如果以后在不同的环境中使用你的Web Components（例如React），你可能还希望为组件提供自定义事件（例如onClick）作为API。当然，我们也可以手动将自定义元素的点击事件映射到我们框架的onClick函数，但如果我们可以在那里简单地使用相同的命名约定，那将更加方便。让我们看看如何进一步改进我们之前的实现，以支持自定义事件：

## Web Components 的生命周期回调函数

我们几乎完成了自定义按钮。在我们继续自定义下拉元素（将使用我们的自定义按钮元素）之前，让我们添加最后一个点睛之笔。目前，该按钮定义了一个带有填充的内部容器元素。这对于并排使用这些自定义按钮并具有彼此的自然边距时非常有用。但是，在另一个上下文（例如下拉列表组件）中使用该按钮时，你可能希望从容器中删除此填充。因此，你可以使用名为 `connectedCallback` 的 Web 组件的生命周期回调之一：

```js
class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$container = this._shadowRoot.querySelector('.container');
    this.$button = this._shadowRoot.querySelector('button');

    ...
  }

  connectedCallback() {
    if (this.hasAttribute('as-atom')) {
      this.$container.style.padding = '0px';
    }
  }
  ...
}
```

在此情况下，如果元素上存在一个名为as-atom的属性，它将将我们的按钮容器的填充重置为零。顺便说一下，这就是你可以按照原子设计原则创建一个出色的UI库的方式，其中自定义按钮元素是一个原子，自定义下拉菜单元素是一个分子。也许两者最终会与更大的有机体中的另一个元素结合在一起。现在我们的按钮可以在下拉菜单元素中无填充地使用，如下所示：`<my-button as-atom></my-button>`。按钮的标签将稍后通过使用属性来设置。

那么生命周期回调呢？connectedCallback在Web Components附加到DOM时运行一次。这就是为什么可以在组件渲染后执行所有需要完成的任务的原因。当组件被移除时，存在一个等效的生命周期回调函数，称为disconnectedCallback。此外，之前已经在自定义元素中使用了一个生命周期方法，称为attributeChangedCallback，以对属性更改做出反应。Web Components提供了各种生命周期回调函数，请务必详细了解它们。

## Web Components 中的 Web Components 

Last but not least, 我们希望在另一个 Web 组件中使用完成的按钮 Web 组件。因此，我们将实现一个自定义下拉元素，应按以下方式使用：

```jsx
<my-dropdown
  label="Dropdown"
  option="option2"
  options='{ "option1": { "label": "Option 1" }, "option2": { "label": "Option 2" } }'
></my-dropdown>
```

请注意，options（对象）作为 JSON 格式的属性传递给自定义元素，这种将对象和数组作为属性传递会更方便：

```html
<my-dropdown
  label="Dropdown"
  option="option2"
></my-dropdown>

<script>
  document.querySelector('my-dropdown').options = {
    option1: { label: 'Option 1' },
    option2: { label: 'Option 2' },
  };
</script>
```

让我们深入了解自定义下拉元素的实现。我们将从一个简单的基础开始，该基础为定义 Web 组件的类定义我们的结构、样式和样板代码。后者用于设置 Shadow DOM 的模式，将模板附加到我们的自定义元素，为我们的属性/属性定义 getter 和 setter 方法，观察我们的属性变化并对其做出响应：

```jsx
const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }

    .dropdown {
      padding: 3px 8px 8px;
    }

    .label {
      display: block;
      margin-bottom: 5px;
      color: #000000;
      font-size: 16px;
      font-weight: normal;
      line-height: 16px;
    }

    .dropdown-list-container {
      position: relative;
    }

    .dropdown-list {
      position: absolute;
      width: 100%;
      display: none;
      max-height: 192px;
      overflow-y: auto;
      margin: 4px 0 0;
      padding: 0;
      background-color: #ffffff;
      border: 1px solid #a1a1a1;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      list-style: none;
    }

    .dropdown-list li {
      display: flex;
      align-items: center;
      margin: 4px 0;
      padding: 0 7px;
      font-size: 16px;
      height: 40px;
      cursor: pointer;
    }
  </style>

  <div class="dropdown">
    <span class="label">Label</span>

    <my-button as-atom>Content</my-button>

    <div class="dropdown-list-container">
      <ul class="dropdown-list"></ul>
    </div>
  </div>
`;

class Dropdown extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: 'open' });
    this._sR.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['label', 'option', 'options'];
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get option() {
    return this.getAttribute('option');
  }

  set option(value) {
    this.setAttribute('option', value);
  }

  get options() {
    return JSON.parse(this.getAttribute('options'));
  }

  set options(value) {
    this.setAttribute('options', JSON.stringify(value));
  }

  static get observedAttributes() {
    return ['label', 'option', 'options'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {

  }
}

window.customElements.define('my-dropdown', Dropdown);
```

这里有几点需要注意：首先，在我们的风格中，我们可以使用 `:host` 选择器为我们的自定义元素设置全局样式。其次，模板使用我们的自定义按钮元素，但尚未为其提供标签属性。第三，每个属性/属性都有 getter 和 setter，但是，属性/ `options` 属性反射的 getter 和 setter 正在解析对象从or到 JSON格式。

*注意：除了所有提到的内容之外，你可能还会注意到所有用于属性/属性反射的 getter 和 setter 方法的样板文件。此外，属性的生命周期回调看起来是重复的，构造函数与自定义按钮元素中的构造函数相同。稍后可能会了解到，存在各种轻量级库（例如带有 LitHTML 的 LitElement）用于 Web 组件之上，以消除我们的这种重复性。*

到目前为止，尚未使用所有传递的属性和属性。我们只是用一个空的渲染方法对它们做出响应。让我们通过将它们分配给下拉列表和按钮元素以此来利用它们：

```js
class Dropdown extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: 'open' });
    this._sR.appendChild(template.content.cloneNode(true));

    this.$label = this._sR.querySelector('.label');
    this.$button = this._sR.querySelector('my-button');
  }

  ...

  static get observedAttributes() {
    return ['label', 'option', 'options'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$label.innerHTML = this.label;

    this.$button.setAttribute('label', 'Select Option');
  }
}

window.customElements.define('my-dropdown', Dropdown);
```

下拉列表从外部获取其标签作为要设置为内部 HTML 的属性，而按钮现在将任意标签设置为属性。稍后我们将根据下拉列表中的选定选项设置此标签。此外，我们可以利用这些选项为我们的下拉列表呈现实际的可选项目：

```js
class Dropdown extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: 'open' });
    this._sR.appendChild(template.content.cloneNode(true));

    this.$label = this._sR.querySelector('.label');
    this.$button = this._sR.querySelector('my-button');
    this.$dropdownList = this._sR.querySelector('.dropdown-list');
  }

  ...

  render() {
    this.$label.innerHTML = this.label;

    this.$button.setAttribute('label', 'Select Option');

    this.$dropdownList.innerHTML = '';

    Object.keys(this.options || {}).forEach(key => {
      let option = this.options[key];
      let $option = document.createElement('li');
      $option.innerHTML = option.label;

      this.$dropdownList.appendChild($option);
    });
  }
}

window.customElements.define('my-dropdown', Dropdown);
```

在这种情况下，在每次渲染时，我们都会擦除下拉列表的内部 HTML，因为选项可能已更改。然后，我们为对象 `option` 元素动态创建一个列表元素，并将其附加到我们的列表元素中，其中包含 `option` 属性的 `label` . `options` 如果未定义， `properties` 我们使用默认的空对象来避免在此处遇到异常，因为传入属性和属性之间存在争用条件。但是，即使列表被呈现，我们的样式也将 CSS `display` 属性定义为 `none` 。这就是为什么我们还看不到列表的原因，但是在我们为自定义元素的行为添加更多JavaScript之后，我们将在下一步中看到它。

## Web Components 与 JavaScript 

到目前为止，我们主要构建和样式化了自定义元素。我们也对更改的属性做出了反应，但在渲染步骤中还没有做太多事情。现在我们将向 Web 组件添加更多 JavaScript 的行为。只有这样，它才真正不同于使用 CSS 样式的简单 HTML 元素。你将看到如何将所有行为封装在自定义下拉元素中，而无需从外部执行任何操作。

让我们首先使用我们的按钮元素打开和关闭下拉列表，这应该使我们的下拉列表可见。首先，定义一个新样式，用于使用 `open` 类呈现下拉列表。请记住，我们之前曾将 `display: none;` 下拉列表用作默认样式。

```js
const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }

    ...

    .dropdown.open .dropdown-list {
      display: flex;
      flex-direction: column;
    }

    ...
  </style>

  ...
`;
```

在下一步中，我们定义一个类方法，用于切换自定义元素的内部状态。此外，当调用此类方法时，将根据新状态将新 `open` 类添加或删除到我们的下拉元素中。

```js
class Dropdown extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: 'open' });
    this._sR.appendChild(template.content.cloneNode(true));

    this.open = false;

    this.$label = this._sR.querySelector('.label');
    this.$button = this._sR.querySelector('my-button');
    this.$dropdown = this._sR.querySelector('.dropdown');
    this.$dropdownList = this._sR.querySelector('.dropdown-list');
  }

  toggleOpen(event) {
    this.open = !this.open;

    this.open
      ? this.$dropdown.classList.add('open')
      : this.$dropdown.classList.remove('open');
  }

  ...
}
```

我们需要为自定义按钮元素的事件添加一个事件侦听器，以将下拉列表的内部状态从打开切换到关闭，反之亦然。使用它时不要忘记绑定 `this` 到我们的新类方法，否则它无法访问 `this` 设置新的内部状态或访问分配 `$dropdown` 的元素。

```js
class Dropdown extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: 'open' });
    this._sR.appendChild(template.content.cloneNode(true));

    this.open = false;

    this.$label = this._sR.querySelector('.label');
    this.$button = this._sR.querySelector('my-button');
    this.$dropdown = this._sR.querySelector('.dropdown');
    this.$dropdownList = this._sR.querySelector('.dropdown-list');

    this.$button.addEventListener(
      'onClick',
      this.toggleOpen.bind(this)
    );
  }

  toggleOpen(event) {
    this.open = !this.open;

    this.open
      ? this.$dropdown.classList.add('open')
      : this.$dropdown.classList.remove('open');
  }

  ...
}
```

立即亲自试用你的 Web 组件。应该可以通过单击我们的自定义按钮来打开和关闭自定义下拉元素。这是我们自定义元素的第一个真正的内部行为，否则它将在 React 或 Angular 等框架中实现。现在，你的框架可以简单地使用此 Web 组件，并期望它提供此行为。让我们继续在单击时从打开的列表中选择一个项目：

```js
class Dropdown extends HTMLElement {

  ...

  render() {
    ...

    Object.keys(this.options || {}).forEach(key => {
      let option = this.options[key];
      let $option = document.createElement('li');
      $option.innerHTML = option.label;

      $option.addEventListener('click', () => {
        this.option = key;

        this.toggleOpen();

        this.render();
      });

      this.$dropdownList.appendChild($option);
    });
  }
}
```

列表中的每个呈现选项都会获取单击事件的事件侦听器。单击该选项时，该选项将设置为属性，下拉列表切换到 `close` ，组件将再次呈现。但是，为了查看发生了什么，让我们可视化下拉列表中的选定选项项：

```js
const template = document.createElement('template');

template.innerHTML = `
  <style>
    ...

    .dropdown-list li.selected {
      font-weight: 600;
    }
  </style>

  <div class="dropdown">
    <span class="label">Label</span>

    <my-button as-atom>Content</my-button>

    <div class="dropdown-list-container">
      <ul class="dropdown-list"></ul>
    </div>
  </div>
`;
```

接下来，只要选项属性与列表中的选项匹配，我们就可以在 render 方法中设置这个新类。有了这个新样式，并在下拉列表中的一个选项上动态设置样式，我们可以看到该功能实际上有效：

```js
class Dropdown extends HTMLElement {

  ...

  render() {
    ...

    Object.keys(this.options || {}).forEach(key => {
      let option = this.options[key];
      let $option = document.createElement('li');
      $option.innerHTML = option.label;

      if (this.option && this.option === key) {
        $option.classList.add('selected');
      }

      $option.addEventListener('click', () => {
        this.option = key;

        this.toggleOpen();

        this.render();
      });

      this.$dropdownList.appendChild($option);
    });
  }
}
```

让我们在自定义按钮元素中显示当前选定的选项，而不是设置任意值：

```js
class Dropdown extends HTMLElement {

  ...

  render() {
    this.$label.innerHTML = this.label;

    if (this.options) {
      this.$button.setAttribute(
        'label',
        this.options[this.option].label
      );
    }

    this.$dropdownList.innerHTML = '';

    Object.keys(this.options || {}).forEach(key => {
      ...
    });
  }
}
```

自定义下拉元素的内部行为有效。我们能够打开和关闭它，并且可以通过从下拉列表中选择一个选项来设置一个新选项。缺少一件关键的事情：我们需要再次向外界提供 API（例如自定义事件），以通知他们更改的选项。因此，请为每个列表项单击调度一个自定义事件，但为每个自定义事件提供一个键，以标识单击了哪个项：

```js
class Dropdown extends HTMLElement {

  ...

  render() {
    ...

    Object.keys(this.options || {}).forEach(key => {
      let option = this.options[key];
      let $option = document.createElement('li');
      $option.innerHTML = option.label;

      if (this.option && this.option === key) {
        $option.classList.add('selected');
      }

      $option.addEventListener('click', () => {
        this.option = key;

        this.toggleOpen();

        this.dispatchEvent(
          new CustomEvent('onChange', { detail: key })
        );

        this.render();
      });

      this.$dropdownList.appendChild($option);
    });
  }
}
```

最后，将下拉列表用作 Web 组件时，可以为自定义事件添加事件侦听器，以获取有关更改的通知：

```html
<my-dropdown label="Dropdown" option="option2"></my-dropdown>

<script>
  document.querySelector('my-dropdown').options = {
    option1: { label: 'Option 1' },
    option2: { label: 'Option 2' },
  };

  document
    .querySelector('my-dropdown')
    .addEventListener('onChange', event => console.log(event.detail));
</script>
```

就是这样。你已经创建了一个完全封装的下拉组件作为 Web 组件，具有自己的结构、样式和行为。后者是Web Components的关键部分，因为否则你可以简单地使用带有一些CSS的HTML元素作为样式。现在，你还将 behvaior 封装在新的自定义 HTML 元素中。祝贺！

****

下拉列表和按钮元素作为 Web 组件的实现可以在此 GitHub 项目中找到，其中包含一些有用的扩展。正如我之前所说，自定义按钮元素对于下拉组件来说有点不重要，因为它没有实现任何特殊行为。你可以使用带有CSS样式的普通HTML按钮元素。但是，自定义按钮元素通过一个简单的示例帮助我们掌握了 Web 组件的概念。这就是为什么我认为从按钮组件开始是一个很好的想法，该组件稍后将在下拉组件中使用。如果你想继续在 React 中使用你的 Web 组件，请查看这个简洁的 React 钩子或这个 Web Components for React 教程。最后，我希望你从这个 Web 组件教程中学到了很多东西。如果你有反馈或只是喜欢它，请发表评论：-）



> 参考：
>
> [rwieruch/web-components-starter-kit: Starter Kit for Web Components with Webpack as application bundler.](https://github.com/rwieruch/web-components-starter-kit)



非常感谢您看到这里~来自译者 - 泯泷 :smile:



