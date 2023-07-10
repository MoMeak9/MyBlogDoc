# button标签和div模拟按钮的区别

蛮有意思的，之前面试某厂的时候遇到了这个问题，答得不是很好，专门整理一波~

## 表单使用上

如果button在form表单内部，则可以不用JavaScript绑定onclick属性就可以提交表单内容`（type = 'submit'）`，而如果不在form表单内部，又不考虑语义化，那么作为按钮，用div和button来写按钮就没什么太多的区别，只存在一些外观上和语义化的细微区别。

### button 的 type 属性

实际上，它还能与menu产生联动，如MDN对button 的 type 属性描述：

-   `submit`: 此按钮将表单数据提交给服务器。如果未指定属性，或者属性动态更改为空值或无效值，则此值为默认值。
-   `reset`: 此按钮重置所有组件为初始值。
-   `button`: 此按钮没有默认行为。它可以有与元素事件相关的客户端脚本，当事件出现时可触发。
-   `menu`: 此按钮打开一个由指定`<menu>`元素进行定义的弹出菜单。

## SEO 以及语义化

语义化就是说，HTML 元素具有相应的含义，而对于SEO来说，就是让机器可以读懂网页的内容。它用于描述元素的内容或者跟其他元素的关系。在 HTML 里，除了`<div>`和`<span>`，基本上都是语义化的元素。

转言之，`<div>`是非语义化元素，`<div>`没有给内容附加任何含义，它只是个`<div>`，那么你所模拟的button和其他用`<div>`包裹的内容没有区别，甚至会被抓取模拟button的内容。另外，大部分搜索引擎并不对button和input做过多处理（不感兴趣），如果你想实现分享、页面锚点or链接到别的页面并需要由搜索引擎抓取，使用`<a>`标签对SEO更有意义。

## 外观差异

1. div的默认box-sizing属性为content-box，而button默认为border-box，因此其他样式属性相同的情况下，div会比button看上去大一些；
2. button的cursor属性默认值类似于default，鼠标悬停在button上方为默认形式。而div的cursor则是text类型，并且div的user-select为text属性，即可以内部文本可以被选中，而button的默认为none，不可选中内部文本；

   > 关于默认cursor属性可千万不要被组件库的默认样式误导了哦，因为通常`<Button>`组件的`cursor`会被处理为`pointer`，也就是和链接一样的小手。

4. 如果不给button设置background-color或border属性，则它存在一个默认的点击动画，鼠标点击时背景颜色或边框会动态变化以呈现出点击的动画效果，而div则不会，但是如果给button设置了background-color和border属性，这些默认的点击动画将会消失。

> **参考：**
>
> [用div与button标签作为按钮的一些区别](https://blog.csdn.net/hhthht8888/article/details/86553277)
>
> [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)
>
> [SEO: \<button> vs \<a> HTML tags [closed]](https://stackoverflow.com/questions/19201420/seo-button-vs-a-html-tags)
