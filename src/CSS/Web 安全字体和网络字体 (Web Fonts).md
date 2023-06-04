## 什么是Web安全字体

网络安全字体是由许多操作系统预先安装的字体。虽然不是所有的系统都安装了相同的字体，但你可以使用网络安全字体堆栈来选择几种看起来类似的字体，并且安装在你想支持的各种系统上。如果你想使用预装字体以外的字体，从CSS3开始，你可以使用网络字体[Web fonts - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)。

> Web safe fonts are fonts that are pre-installed by many operating systems. While not all systems have the same fonts installed, you can use a web safe font stack to choose several fonts that look similar, and are installed on the various systems that you want to support. If you want to use fonts other than ones pre-installed, as of CSS3, you can use Web Fonts.

- 英文Web安全字体合集 [CSS Font Stack: Web Safe and Web Font Family with HTML and CSS code.](https://www.cssfontstack.com/)

### 没有网页安全中文字体

相比通常只有几十 KB 的英文字体，网页加载一个 GB2312 的中文字体至少要增加 2 MB 以上加载量，而大部分中文字体都在 5 MB 以上。所以网络字体在国内没有流行起来，还是要像英文网页好多年前一样，用网页安全字体。

下表可以看到各系统预置的中文字体——各系统根本没有相同的字体，即没有网页安全中文字体！

| 系统     | 预置中文字体                                                 |
| :------- | ------------------------------------------------------------ |
| Mac OS X | 华康苹方 Pingfang（10.11 开始） 冬青黑体: Hiragino Sans GB （10.6 开始） 华文细黑：STHeiti Light （又名STXihei） 华文黑体：STHeiti 华文楷体：STKaiti 华文宋体：STSong 华文仿宋：STFangsong |
| Windows  | 微软雅黑: Microsoft YaHei（Windows 7开始） 黑体: SimHei 宋体: SimSun 新宋体: NSimSun 仿宋: FangSong 楷体: KaiTi 仿宋GB2312: FangSong_GB2312 楷体GB2312: KaiTi_GB2312 |
| Android  | Droid Sans Fallback                                          |
| iOS      | 苹方（iOS 9开始） 黑体：Heiti SC (iOS 8) 华文黑体：STHeiti（iOS 7.0 及以下） |

## 什么是网络字体

与网络安全字体不同，网络字体没有预先安装在用户的系统中。这些字体是由用户的浏览器在渲染网页时下载的，然后应用于你的文本。使用网络字体的主要缺点是它会减慢你网站的加载时间。在旧的浏览器中，对CSS3的支持也很有限，而使用网络字体是需要CSS3的。后面的限制可以通过使用字体堆栈来弥补，类似于网络安全字体堆栈，但包括一个网络字体作为堆栈的第一个字体。如果浏览器无法使用网络字体，它就会退回到堆栈中的网络安全字体。

> Unlike web safe fonts, web fonts are not pre-installed on the user's system. The fonts are downloaded by the user's browser while rendering the webpage, and then applied to your text. The main drawbacks of using web fonts is it will slow your site's load time. There is also limited support for CSS3 in older browsers which is required to use web fonts. The later limitation can be remedied by using a font stack, similar to the web safe font stacks, but including a web font as the first font of the stack. If a browser is unable to use the web font it will fall back on the web safe fonts in the stack.

Web 字体是一种 CSS 特性，允许我们指定在访问时随您的网站一起下载的字体文件，这意味着任何支持 Web 字体的浏览器都可以使用指定的字体。所需的语法如下所示：

首先，在 CSS 的开始处有一个[`@font-face`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)块，它指定要下载的字体文件：

```css
@font-face {
  font-family: "myFont";
  src: url("myFont.ttf");
}
```

在这个下面，你可以使用 @font-face 中指定的字体种类名称来将你的定制字体应用到你喜欢的任何东西上，比如说：

```css
html {
  font-family: "myFont", "Bitstream Vera Serif", serif;
}
```

关于网页字体有两件重要的事情要注意：

1. 浏览器支持不同的字体格式，因此需要多种字体格式以获得良好的跨浏览器支持。例如，大多数现代浏览器都支持 WOFF / WOFF2(Web Open Font Format versions 1 and 2，Web 开放字体格式版本 1 和 2)，它是最有效的格式，但是旧版本 IE 只支持 EOT (Embedded Open Type，嵌入式开放类型) 的字体，你可能需要包括一个 SVG 版本的字体支持旧版本的 iPhone 和 Android 浏览器。
2. 字体一般都不能自由使用。我们必须为他们付费，或者遵循其他许可条件，比如在代码中 (或者在站点上) 提供字体创建者标识。你不应该在没有适当的授权的情况下偷窃字体。

## 字体类型 - 常见字体族

### serif 衬线字体族

serif 是一种具有装饰性小横线的字体族，这些小横线被称为“衬线”。Serif 字体通常被用于印刷材料中，如书籍、杂志、报纸等，因为它们的衬线可以增强字体的可读性和易读性。常见的 Serif 字体包括 Times New Roman、Georgia、和 Garamond。

### sans-serif 无衬线字体族

sans-serif 是一种不带装饰性小横线的字体族。这种字体通常被用于数字屏幕上，如电脑、手机和电视。与 Serif 字体相比，Sans-serif 字体看起来更现代、更简洁。常见的 Sans-serif 字体包括 Arial、Helvetica 和 Verdana。

### monospace 等宽字体族

monospace 是一种字母宽度相等的字体族，每个字符都占据相同的宽度。Monospace 字体通常用于计算机编程、打印机输出和其他需要对齐文本的应用程序。常见的 Monospace 字体包括 Courier、Consolas 和 Monaco。

### cursive 手写字体族

cursive 是一种仿效手写的字体族，具有曲线、流畅的线条。这种字体通常被用于设计师、艺术家和文具爱好者等需要体现个性和艺术感的场合。常见的 Cursive 字体包括 Brush Script、Lucida Calligraphy 和 Comic Sans。

### fantasy 梦幻字体族

fantasy 是一种具有艺术性和独特性的字体族，经常用于海报、书籍封面和广告等场合。这种字体的外形往往是有趣、古怪、奇特或装饰性的，常常包含有装饰性的花纹或图案。常见的 Fantasy 字体包括 Harrington、Viner Hand ITC 和 Zapfino。

### Script 手写字体族

Script 字体族是一类字体，通常被设计用于模拟手写或手绘效果，以及营造一种自然、随意的艺术氛围。这类字体通常具有不规则的笔画、流畅的曲线和变化多端的字母间距，使得文本看起来像是手写而非打印。Script 字体族的应用领域非常广泛，例如印刷品设计、标志设计、广告设计等。常见的 Script 字体有 Brush Script、Lobster、Pacifico、Vibur 等。

## 总结

为了确保中文字符在不同计算机和浏览器上的正确显示，网页设计or开发者可以考虑：

1.  使用 Web 服务商提供的字体库：像 Google Fonts、Adobe Fonts 等服务商提供了很多中英文字体库，这些字体可以被网页直接引用，无需用户安装字体即可正常显示。
2.  使用图像或矢量图形：将中文字符转换为图像或矢量图形，并将其嵌入到网页中。虽然这种方法可以确保字符在不同浏览器和计算机上的正确显示，但其缺点是无法进行文本搜索和复制粘贴等操作。
3.  引用多个字体：如果设计者希望在网页中使用多种中文字体，可以在 CSS 样式表中指定多个备选字体。例如：font-family: "宋体", "SimSun", "Microsoft YaHei", "微软雅黑", sans-serif;

需要注意的是，尽管某些字体在设计中看起来很不错，但并不一定适合用作 Web 安全字体。设计or开发者需要权衡字体的外观和可用性，选择最适合自己需求的中文 Web 安全字体。

## 参考

- [Web fonts - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)
- [CSS Font Stack: Web Safe and Web Font Family with HTML and CSS code.](https://www.cssfontstack.com/)
- [中文网页字体设置 | inDev. Journal](https://frankindev.com/2018/03/01/chinese-fonts-in-web/)
- [serif，sans-serif，monospace，cursive和fantasy - 腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1444565)
