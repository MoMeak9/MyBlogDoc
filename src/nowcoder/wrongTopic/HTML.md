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
   
7. **1.什么是 XML?**
   XML 指可扩展标记语言（EXtensible Markup Language）
   XML 是一种标记语言，很类似 HTML
   XML 的设计宗旨是传输数据，而非显示数据
   XML 标签没有被预定义。您需要自行定义标签。
   XML 被设计为具有自我描述性。
   XML 是 W3C 的推荐标准

   **2.XML 与 HTML 的主要差异**

   XML 不是 HTML 的替代。

   XML 和 HTML 为不同的目的而设计：

   XML 被设计为传输和存储数据，其焦点是数据的内容。

   HTML 被设计用来显示数据，其焦点是数据的外观。

   HTML 旨在显示信息，而 XML 旨在传输信息。

8. 如果你试图删除的属性不存在，那么delete将不会起任何作用，但仍会返回true
   如果对象的原型链上有一个与待删除属性同名的属性，那么删除属性之后，对象会使用原型链上的那个属性（也就是说，delete操作只会在自身的属性上起作用）
   任何使用 var 声明的属性不能从全局作用域或函数的作用域中删除。
   这样的话，delete操作不能删除任何在全局作用域中的函数（无论这个函数是来自于函数声明或函数表达式）
   除了在全局作用域中的函数不能被删除，在对象(object)中的函数是能够用delete操作删除的。
   任何用let或const声明的属性不能够从它被声明的作用域中删除。
   不可设置的(Non-configurable)属性不能被移除。这意味着像Math, Array, Object内置对象的属性以及使用Object.defineProperty()方法设置为不可设置的属性不能被删除。

9. ```js
   var a = 1;
   b = 2;
   eval('var c = 3');
   delete a;
   delete b;
   delete c;
   ```

   在eval中使用var声明的全局变量可以被delete删除，所以变量c能删除成功，除此之外，在其他情况下，使用var声明的全局变量或者局部变量一般是不能被delete删除的，所以变量a无法被删除，仍然可以访问到，而未使用var声明的全局变量可以使用delete进行删除，所以无法访问到b。

10. ele.clientWidth = 宽度 + padding

   ele.offsetWidth = 宽度 + padding + border

   ele.scrollTop = 被卷去的上侧距离

   ele.scrollHeight = 自身实际的高度（不包括边框）

11. **Input标签的readonly属性**

    Readonly规定输入的字段为只读，即用户不可修改，但是用户可以通过tab切换到该字段，还可以选中复制该字段。可以配合js设置条件控制用户是否可以更改或输入内容

     

    **Input标签的step属性**

    Step规定输入字段的合法数字间隔(如step=”2”,则合法数字可为-2，0，2，4等)

    Step属性的值为负数或0时默认为1，该属性可以配合max，min属性来创建合法值得范围。

    Step，max，min属性适用于<input>类型有:number,range,date,datetime,month,time,week

     

    **form标签的enctype属性**

    规定在发送表单数据之前如何对其编码，可取值有：

    application/x-www-form-urlencoded

    multipart/form-data

    text/plain

    **form标签的method属性**

    规定用于发送表单数据的http方法，可取值有：post和get

    **video标签，****H5新标签**

    用来定义视频，电影片段或其他视频流

    常用属性：autoplay(视频就绪后马上播放)

    ​     controls(向用户显示播放控件，如按钮)

    ​     loop(循环播放)

    可以为没有controls控件属性的video嵌套按钮控件



