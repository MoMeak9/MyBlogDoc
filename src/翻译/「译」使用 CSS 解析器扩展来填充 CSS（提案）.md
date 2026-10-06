> 四月，我参加了 BlinkOn，这是为 Chromium 开源项目中 Web 平台贡献者举办的会议。在会上，我做了关于“CSS Parser Extensions”的演讲，这是一个我提出的彻底解决 CSS polyfilling 问题的疯狂想法。
>
> 如果你不知道，polyfill CSS 特性极其困难，主要是因为 CSS 解析器会丢弃它不理解的内容。那么，如果作者们不必编写自己的解析器和级联来 polyfill CSS 特性，而是可以教会解析器一些新技巧呢？

****

> ⚠️ 注意！⚠️ ：这是一个个人想法。目前还没有任何官方内容……暂时如此。
>
> 我演讲的目标（幻灯片、录音）是吸引在场的一些工程师，并获取他们对这个我过去两年一直在酝酿的疯狂想法的意见。接下来的步骤将是编写一个合适的解释器，然后将其提交给 CSS 工作组以寻求更广泛的兴趣。完成这项工作可能需要数年时间，如果它最终能完成的话。

## 介绍

在采用新的 CSS 特性时，Web 开发者经常告诉我，他们暂时不会使用某个特性，因为该特性尚未获得跨浏览器支持。在他们的组织内部，通常仍然存在一种期望，即网站在每个浏览器中的外观必须完全一致。或者，他们只是希望只编写一次代码——他们知道这些代码在各种浏览器（包括这些浏览器的一些旧版本）中都能正常运行。

因此，新 CSS 功能的采用——包括那些非常适合渐进增强的功能——被阻止，直到该功能在 Baseline 中广泛可用。假设平均互操作性实现时间为±1.5 年，这意味着一个 CSS 功能在首次在浏览器中发布后，需要 4 年时间才能获得更广泛的采用。

*（当然也有一些例外，还有许多其他因素会影响一个功能的（非）采用，但通常情况下就是这样。）*

![img](https://www.bram.us/wordpress/wp-content/uploads/2025/04/css-parser-extensions-time-to-interop.png)

典型功能发布的时间线。从功能在第一个浏览器中发布到功能成为 Baseline Widely Available，至少需要 4 年时间。

为了加速新 CSS 特性的采用，可以创建 polyfill。例如，容器查询的 polyfill 已经证明了其价值。然而，这个 polyfill——如同其他任何 CSS polyfill 一样——并非完美，存在一些限制。此外，该 polyfill 约±65%的代码专门用于解析 CSS 并从中提取必要信息，如属性值和容器 at 规则——这显得有些荒谬。

CSS Parser Extensions 旨在通过允许作者扩展 CSS 解析器以支持新语法、属性、关键字等，来消除这些限制并简化信息收集。通过直接接入 CSS 解析器，CSS polyfill 的编写变得更加容易，减少了大小和性能开销，并变得更加健壮。

## 目前如何（尝试）填充 CSS

> *Philip Walton 在演讲《The Dark Side of Polyfilling CSS》中清晰地阐述了这个问题。建议观看此演讲以深入理解该问题。以下是问题陈述的简略版本。*

当开发者为一个 CSS 特性创建 polyfill 时，他们无法依赖 CSS 解析器提供关于他们想要 polyfill 的声明等信息。这是因为 CSS 解析器会丢弃它无法成功解析的规则和声明。因此，polyfill 需要自行收集并重新处理样式表，以获取他们想要 polyfill 的特性的标记。

虽然这看起来像执行这三个步骤一样简单，但实际上比看起来要复杂得多。

1. 收集所有样式
2. 解析样式
3. 应用样式

每个步骤都有其自身的挑战和限制，详情如下，并且 Philip Walton 在 2016 年（！）的这句话很好地总结了这一点：

> 如果你从未尝试过自己编写 CSS polyfill，那么你可能从未体验过这种痛苦。

– Philip Walton, 《CSS Polyfill 的阴暗面》, 2016 年 12 月

#### 1. 收集所有样式

收集所有样式本身已经具有挑战性，因为作者需要从各种来源中搜集这些样式：

1. `document.styleSheets`
2. `document.adoptedStyleSheets`
3. 元素附加样式

在收集了所有这些样式表的引用后，工作就完成了，因为作者还需要留意这些来源中的任何变化。

#### 2. 解析样式

有了所有样式表后，作者可以继续解析样式表的内容。这听起来很简单，但已经带来了挑战，因为在许多情况下，他们无法访问来自 CORS 保护源的样式表内容。

如果他们确实能够访问样式表的内容，作者需要手动对内容进行标记化和解析，重复了用户代理已经完成的工作。

他们对源代码释放的自定义 CSS 解析器也必须与整个 CSS 语法兼容。例如，当用户代理（UA）推出像 CSS 嵌套这样的功能时，polyfill 的 CSS 解析器也需要支持它。因此，用于 CSS polyfill 的 CSS 解析器需要不断追赶以支持最新的语法。

#### 3. 应用样式

在解析样式后，作者必须确定需要将样式应用到哪些元素上。例如，对于声明，这基本上意味着他们需要编写自己的级联规则。他们还需要实现 CSS 功能，如媒体查询，并将其考虑在内。哦，还有 Shadow DOM，这使事情变得更加复杂。

## 提议的解决方案

如果，与其让 polyfill 作者编写自己的 CSS 解析器和级联，他们可以教解析器一些新技巧呢？

例如：通过 `CSS.parser` 让作者使用 JavaScript 访问 CSS 解析器——这样他们就可以扩展它，支持新的语法、属性、关键字和函数。

- CSS 关键词: `CSS.parser.registerKeyword(…)`
- CSS 函数： `CSS.parser.registerFunction(…)`
- CSS 语法: `CSS.parser.registerSyntax(…)`
- CSS 声明: `CSS.parser.registerProperty(…)`

在 CSS 解析器中注册这些功能之一后，解析器将不再丢弃与其相关的令牌，作者可以像解析器从未丢弃它们一样使用该功能。

例如，当注册一个不受支持的 CSS 属性 + 语法时，解析器将保留声明，并且该属性会出现在诸如 `window.getComputedStyle()` 的内容中。使用 `CSS.supports()` / `@supports()` 的功能检查也会通过。

除了这些注册之外，一些实用函数也应提供给作者。例如，获取元素指定样式的方法、将长度计算为其表示的像素值的方法、确定哪些注册已经完成的方法等。

## Examples

> *⚠️ 这些示例应该能让你了解 CSS Parser Extensions 可以实现的功能。这里的语法并非一成不变，它是我在探索可能性时想出来的。*

#### 注册关键字： `random`

在以下示例中，不存在的 `random` 关键字被注册。每当 CSS 引擎解析该关键字时，它将返回一个随机值。

```js
CSS.parser
  .registerKeyword('random:<number>', {
    caching_mode: CSS.parser.caching_modes.PER_MATCH,
    invalidation: CSS.parser.invalidation.NONE,
  })
  .computeTo((match) => {
    return Math.random();
  });
;
```

替换仅在样式表中每次出现时发生一次，这由 `caching_mode` 和 `invalidation` 选项控制。

#### 注册一个函数： `light-dark()`

以下代码片段为强大的 `light-dark()` 提供了兼容性补丁。它是一个根据元素使用的 `color-scheme` 返回两个传入颜色之一的函数。当 `color-scheme` 为 `light` 时，使用第一个值；否则返回第二个值。

```js
CSS.parser
  .registerFunction(
    'light-dark(light:<color>, dark:<color>):<color>',
    { invalidation: ['color-scheme'] }
  )
  .computeTo((match, args) => {
    const { element,  property, propertyValue } = match;
    const colorScheme =
      CSS.parser.getSpecifiedStyle(element) 
      .getPropertyValue('color-scheme');

    if (colorScheme == 'light') return args.light;
    return args.dark;
  })
);
```

因为返回值依赖于 `color-scheme` 值，所以 `color-scheme` 属性被列为会导致失效的属性。

#### 注册一个函数： `at-rule()`

以下代码片段为神奇的 `at-rule()` 函数提供了补丁，该函数允许您检测@规则。它根据检查返回一个 `<boolean>` 。

```js
CSS.parser
  .registerFunction('at-rule(keyword:<string>):<boolean>', { 
    caching_mode: CSS.parser.computation_modes.GLOBAL,
  })
  .computeTo((match, args) => {
    switch (args.keyword) {
      case '@view-transition':
        return ("CSSViewTransitionRule" in window);
      case '@starting-style':
        return ("CSSStartingStyleRule" in window);
      // …
      default:
        return false;
    }
  })
;
```

由于检测只需执行一次，因此检查结果可以全局缓存。

此处排除了自定义函数。也许应该添加这些函数，也许不应该。

#### 注册属性： `size`

CSS `size` 属性是一个全新的属性，最近才被确定。它仍需进行规范制定和实现，并将作为一次性设置 `width` 和 `height` 的简写方式。

该属性会使用标准特性进行注册。除了用于确定其计算值的 `computeTo` 方法外， `onMatch` 方法还会返回一个声明块，用于在检测到使用该属性的声明时进行替换。

```js
CSS.parser
  .registerProperty('size', {
      syntax: '[<length-percentage [0,∞]> | auto]{1,2}',
      initialValue: 'auto',
      inherits: false,
      percentages: 'inline-size'
      animatable: CSS.parser.animation_types.BY_COMPUTED_VALUE,
  })
  .computeTo(…)
  .onMatch((match, computedValue) => {
    const { element, specifiedValue } = match;
    return {
      'width': computedValue[0],
      'height': computedValue[1] ?? computedValue[0],
    };
  });
;
```

#### 注册属性： `scroll-timeline`

这是注册属性的另一个示例，即 `scroll-timeline` 属性。注册和匹配可以分开进行，它还表明可以在匹配时存储一些数据以供后续使用。这里是一个 `ResizeObserver` ，它被添加到匹配的元素中，并在稍后移除。

```js
CSS.parser.registerProperty('scroll-timeline', { … });

CSS.parser
  .matchProperty('scroll-timeline')
  // No .computeTo … so it would just return the declared value
  .onMatch(parserMatch => {
    const resizeObserver = new ResizeObserver((entries) => {
        // …
    });
    resizeObserver.observe(parserMatch.element);
    parserMatch.data.set('ro', resizeObserver);
  })
  .onElementUnmatch(parserMatch => {
    const resizeObserver = parserMatch.data.get('ro');
    resizeObserver.disconnect();
  })
;
```

#### 注册一个语法

也可以注册一个语法以供以后使用。

```js
CSS.parser
  .registerSyntax(
    '<single-animation-timeline>',
    'auto | none | <dashed-ident> | <scroll()> | <view()>'
  )
;

CSS.parser
  .registerProperty('animation-timeline', {
    syntax: '<single-animation-timeline>#',
    initialValue: 'auto',
    inherits: false,
    animatable: CSS.parser.ANIMATABLE_NO,
  })
  .onMatch(…);
```

#### 完整示例： `position: fixed / visual`

在 w3c/csswg-drafts#7475 中，我建议对 `position: fixed` 进行扩展，允许您指示元素应固定到哪个对象。

1. `position: fixed / layout` = 当前行为，将与 `position: fixed` 相同）
2. `position: fixed / visual` = 固定到视觉视口，即使在放大时也是如此
3. `position: fixed / visual-unzoomed` = 相对于未缩放的视觉视口定位

用于 polyfill 的代码可能如下所示：

```js
// Register syntaxes used by the polyfill.
CSS.parser.registerSyntax('<position>', 'static | relative | absolute | sticky | fixed');
CSS.parser.registerSyntax('<position-arg>', 'layout | visual | visual-unzoomed');

// Extend the existing `position` property registration, only overriding certain parts.
// The non-overriden parts remain untouched
const positionWithArgRegistration = CSS.parser
  .registerProperty('position', {
    extends: 'position',
    syntax: '<position> [/ arg:<position-arg>]?',
  })
  // No .computeTo … so the syntax will compute individually
;

const cssPositionFixed =
    positionWithArgRegistration
      .with('position', 'fixed') // Only `position: fixed`
      .with('arg') // Any arg value
    .onMatch((match) => {
        const { element, specifiedValue } = match;
        const { position, arg } = specifiedValue;

        const styles = CSS.parser.getSpecifiedStyle(element);
        const visualViewport = determineVisualViewport();

        switch (arg) {
            case 'layout':
                return {
                    position: 'fixed',
                };

            case 'visual':                    
                return {
                    position: 'fixed',
                    bottom: (() => {
                        if (styles.bottom.toString() != 'auto') {
                            return styles.bottom.add(CSS.px(visualViewport.height));
                        }
                    })(),
                };

            case 'visual-unzoomed':
                return {
                    position: 'fixed',
                    // @TODO: change all other properties
                };
        }
    })
;

window.visualViewport.addEventListener('resize', () => {
    cssPositionFixed.triggerMatch();
});
```

## 总结与注意事项

#### 优势

通过允许 polyfill 作者扩展用户代理自带的 CSS 解析器，他们不再需要收集所有样式、自行解析样式表或确定何时将样式应用于元素。由此产生的 polyfill 将更易于编写、体积更小、性能更快，并且更加健壮和高效。

借助由 CSS 解析器扩展支持的强大 CSS polyfill，CSS 功能的采用不再受限于跨浏览器广泛支持的基线，从而提高了采用率。

此外，这也将使浏览器厂商更容易对功能进行原型设计，因为它需要的前期投入更少。

#### 风险 / 注意事项

为了实现这一点，执行操作的时机至关重要。你不想在像素管道的样式-布局-绘制步骤之间运行阻塞的 JavaScript。这是需要仔细考虑的事情。也许这应该被建模为一个观察者？

目前未包含的是选择器的 polyfill。我还没有对此进行任何思考，因此一旦深入研究后可以添加。我最初的猜测是，像 `:has-interest` 这样的选择器可以很容易地进行 polyfill，但伪元素的 polyfill 会稍微困难一些，因为你还需要为这些元素修改 DOM。

此外，并非所有的 CSS 特性都可以进行 polyfill。比如视图过渡（View Transitions）这样的功能。

最终，这个想法的成败取决于所有浏览器厂商的支持。如果其中一家（主要）浏览器厂商不支持，那么这个项目将会失败。

## 那么，接下来呢？

自《可扩展 Web 宣言》 [The Extensible Web Manifesto](https://extensiblewebmanifesto.org/)  发布已有 12 年，[Philip Walton 分享 CSS polyfill 的难度](https://philipwalton.com/articles/the-dark-side-of-polyfilling-css/)也有 9 年了，然而自那时以来，情况似乎并没有太大改变。

为了尝试推动这一进展，我的下一步是撰写一份详细的解释文档，并将其提交给 CSS 工作组，以寻求更广泛的关注。我在谷歌的一些同事对此表示感兴趣，并提供了帮助，我也知道 Brian 对此同样感兴趣……所以也许会有更多人（来自其他浏览器厂商）也会感兴趣。

不过，这里要设定一下预期：不要指望这能很快实现。即使最终能够实现，这也需要数年时间，我希望它能成功。