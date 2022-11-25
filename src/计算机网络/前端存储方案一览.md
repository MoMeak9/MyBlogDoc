---
date: 2022-08-12
category:
- Network
---
# 前端存储方案一览

### **Cookies**

在HTML5标准前本地储存的主要的也是最早提出的⽅式，优点是兼容性好，请求头⾃带cookie⽅便（使用fetch的话需要额外配置），缺点是⼤⼩只有4k，⾃动请求头加⼊cookie浪费流量，而且每个domain限制20个cookie，使⽤起来麻烦，需要自行封装相关方法。

- Cookie一旦创建成功，名称就无法修改
- Cookie是无法跨域名的，但是子域名之间共享
- 有安全问题，如果Cookie被拦截了，那就可获得session的所有信息，预防方式包括设置httpOnly
- Cookie在请求一个新的页面的时候都会被发送过去

跨域名共享方案：

- Nginx反向代理
- 单个站点登入后，通过setCookie的方式，在其他网站上写上Cookie，同时服务端的Session使用同一个节点

### **LocalStorage**

HTML5加⼊的以键值对(Key-Value)为标准的⽅式，优点是操作⽅便，永久性储存（除⾮⼿动删除），⼤⼩为5M，兼容IE8+ 。

如果浏览器设置为隐私模式，那我们将无法读取到LocalStorage，同时受到同源策略的限制，非同源页面无法访问。

### **SessionStorage**

与LocalStorage基本类似，区别是SessionStorage当⻚⾯关闭后会被清理，⽽且与cookie、LocalStorage不同，其主要用于临时保存同一窗口(或标签页)的数据，刷新页面时不会删除，关闭窗口或标签页之后将会删除这些数据。

### [**Web SQL**](https://www.w3.org/TR/webdatabase/)

2010年被W3C**废弃**的本地数据库数据存储⽅案，但是主流浏览器（⽕狐除外）都已经有了相关的实现，Web SQL类似于SQLite，是真正意义上的关系型数据库。Web SQL 数据库 API 并不是 HTML5 规范的一部分，但是它是一个独立的规范，引入了一组使用 SQL 操作客户端数据库的 APIs。

> > Beware. This specification is no longer in active maintenance and the Web Applications Working Group does not intend to maintain it further.
>
> 本文档是 2010 年 11 月 18 日 Web SQL 数据库工作组的说明。作为工作组说明发布并不意味着得到 W3C 成员的认可。这是一份草稿文件，可能随时被其他文件更新、替换或废止。除了正在进行的工作之外，引用本文件是不恰当的。W3C [Web 应用程序工作组](http://www.w3.org/2008/webapps/)是负责本文档的 W3C 工作组。

### [**IndexedDB**](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

IndexedDB 是一种底层 API，用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））。其是被正式纳⼊HTML5标准的数据库储存⽅案，它是NoSQL数据库，⽤键值对进⾏储存。

- 键值对储存
- 异步
- 支持事务
- 同源限制
- 储存空间大
- 支持二进制储存
