---
date: 2022-06-21
category:
- 牛客网刷题
---

# HTML刷题【错题本】

1. fieldset 元素可将表单内的相关元素分组。

   `<fieldset> `标签将表单内容的一部分打包，生成一组相关表单的字段。

   当一组表单元素放到 `<fieldset>` 标签内时，浏览器会以特殊方式来显示它们，它们可能有特殊的边界、3D 效果，或者甚至可创建一个子表单来处理这些元素。

   `<fieldset>` 标签没有必需的或唯一的属性。

   `<legend>` 标签为 fieldset 元素定义标题。

2. link是HTML方式， @import是CSS方式

   link最大限度支持并行下载，@import过多嵌套导致串行下载，出现FOUC(文档样式短暂失效)

   link可以通过rel="alternate stylesheet"指定候选样式

   浏览器对link支持早于@import，可以使用@import对老浏览器隐藏样式

   @import必须在样式规则之前，可以在css文件中引用其他文件
   
2. 一个常用的针对移动网页优化过的页面的 viewport meta 标签大致如下：

   ```html
   <meta name=``"viewport"` `content=``"width=device-width, initial-scale=1.0"``>
   ```

   - width：控制 viewport 的大小，可以指定的一个值，如 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
   - height：和 width 相对应，指定高度。
   - initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
   - maximum-scale：允许用户缩放到的最大比例。
   - minimum-scale：允许用户缩放到的最小比例。
   - user-scalable：用户是否可以手动缩放。
   
2.  disabled指当 input 元素加载时禁用此元素。input内容不会随着表单提交

    readonly规定输入字段为只读。input内容会随着表单提交。

   无论设置readonly还是disabled，通过js脚本都能更改input的value

5. `<q>`元素表示所附文本是短内联引号。 大多数现代浏览器通过用引号括起文本来实现这一点。 此元素用于不需要分段符号的简短引号; 对于长引号，可以使用`<blockquote>`元素。

6. DOM树一共有12种节点类型，常用的有4种：

   1、Document类型（document节点）——DOM的“入口点”

   2、Element节点（元素节点）——HTML标签，树构建块

   3、Text类型（文本节点）——包含文本

   4、Comment类型（注释节点）——有时我们可以将一些信息放入其中，它不会显示，但JS可以从DOM中读取它。
