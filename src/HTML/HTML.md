---
date: 2022-06-28
icon: page
category:
- 面试题
- 前端
---

# HTML 高频

### 引用URL的标签属性href与src的区别是什么？

- 区别

  - href

    - 表示超文本引用，指向网络资源的所在位置，用来建立当前文档和引用资源的联系

    - 浏览器会识别该文档为css文档，并行下载该文档，并且不会停止对当前文档的处理，这也是在文档中不使用@import的原因

      ```html
      <link href="./style.css" rel="stylesheet" />
      ```

      ```html
      <a href="https://xdclass.net" />
      ```

  - src

    - 引用资源（js脚本、图片），将目标资源下载应用到当前文档

      ```html
      <script src="script.js"></script>
      ```

    - 当浏览器解析到该元素时，会暂停浏览器的渲染，直到该资源加载完毕，这也是js脚本放到底部的原因

- 总结

  - src用于引入文件，href用于在当前文档和引用资源之间建立联系。

### link标签和script标签的引用位置？

**简介：link标签和script标签的引用位置**

- 考点：页面渲染机制

- link标签放在head标签中

  - 用户访问网站时，代码是从上往下解析的，正常展示页面内容的样式，提高用户体验

  - 放在 html 结构底部时，加载页面会出现 html 结构混乱的情况

- script标签放在body结束标签之前

  - JS脚本在下载和执行期间会阻止 html 解析

  - 把 script 标签放在底部，保证 html和css 首先完成解析之后再加载 JS 脚本

  - script 标签加上 defer 属性时，可以放在 head 标签中  （async）

    ```html
    <script defer ></script> 
    ```

    

### 如何提高一个网站的搜索权重？

**简介：提高网站的搜索权重**

- 考点：SEO优化、HTML语义化

- 难度【*】

- SEO优化（TDK）

  - 设置网站的 **title** 标题标签，如：

    ```html
    <title>小滴课堂</title>
    ```

  - 设置网站的 **description** 描述标签，如：

    ```html
    <meta name="Description" content="小滴课堂是IT技能学习平台,提供了丰富的java开发、web前端" />
    ```

  - 设置网站的 **keywords** 关键词标签，如：

    ```html
    <meta name="keywords" content="小滴课堂 小D课堂,xdclass,java,vue教程,html教程,js教程,w3c教程,css,webpack">
    ```


- HTML语义化

  - 使用正确的标签引用正确的内容

  - 增强了可读性，结构更加清晰，便于对浏览器、搜索引擎解析

  - 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO

    ```js
    header、footer、a、p、ul、ol、li、h1、h2、h3...
    ```

### 在不同移动设备的屏幕下正常展示网页的内容？

**简介：设置移动端视口大小**

- 考点：meta标签viewport属性

- viewport

  ![image-20220224161329007](https://cdn.yihuiblog.top/images/image-20220224161329007.png)

  - 定义

    - 手机浏览器会把页面放入到一个虚拟的视口（viewpoint）中，但 viewport 又不局限于浏览器可视区域的大小，它可能比浏览器的可视区域大，也可能比浏览器的可视区域小。通常这个虚拟的视口（viewport）比屏幕宽，会把网页挤到一个很小的窗口。

  - 使用

    ```html
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
    ```

  - 属性

    ```js
    width：设置viewport的宽度
    height：设置viewport的高度
    initial-scale：设置页面的初始缩放值
    minimum-scale：允许用户的最小缩放值
    maximum-scale：允许用户的最大缩放值
    user-scalable：是否允许用户进行缩放，no 代表不允许，yes代表允许
    ```


### DOM和BOM的区别和使用？

- DOM

  - 定义

    - DOM就是⽂档对象模型，是⼀个抽象的概念 

    - 定义了访问和操作HTML⽂档的⽅法和属性

      

  - 使用

    - 查找节点

      ```js
      document.getElementById("xd")
      ```

    - 改变元素

      ```js
      document.getElementById("xd").innerHTML = '<h1>xdclass.net</h1>';
      ```

    - 创建元素

      ```js
      document.createElement('h1')
      ```

- BOM

  - 定义

    - BOM就是浏览器对象模型

    - 内置对象定义操作浏览器的方法

- 使用

  - window 

    ```js
    window.alert('你好，小滴课堂')
    ```

  - screen 

    ```js
    console.log(window.screen.width)
    ```

  - location

    ```js
    window.location.href
    ```

  - localStorage

    ```js
    window.localStorage.setItem(key, value)
    ```

  - history

    ```js
    window.history.go(1)
    ```

