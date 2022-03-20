

# 前端工程师面试手册

> [在线预览](https://my-doc-1259409954.cos.ap-guangzhou.myqcloud.com/pdf/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E9%A2%98%E6%89%8B%E5%86%8C.pdf?ci-process=doc-preview&dstType=html)

## 前端基础

###  HTTP/HTML/浏览器

####  说一下 HTTP 和 HTTPS

HTTPS 的 SSL 加密是在传输层实现的。

**(1)HTTP 和 HTTPS 的基本概念** 

HTTP: 超文本传输协议（基于TCP），它可以使浏览器更加高效，使网络传输减少。 

HTTPS: 是以安全为目标的 HTTP 通道，简单讲是 HTTP 的安全版，即 HTTP 下加入 SSL 层，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL。 **HTTPS 协议的主要作用是：建立一个信息安全通道，来确保数组的传输，确保网站的真实性。** 

**(2)HTTP 和 HTTPS 的区别？**

HTTP 传输的数据都是未加密的，也就是明文的， SSL 协议来对 HTTP 协议传输的数据进行加密处理，简单来说 HTTPS 协议是由 HTTP 和 SSL 协议构建的可进行加密传 输和身份认证的网络协议，比 HTTP 协议的安全性更高。 

**主要的区别如下：** 

HTTPS 协议需要 CA 证书，费用较高。 HTTP 是超文本传输协议，信息是明文传输，HTTPS 则是具有安全性的 SSL 加密传输协议。 

使用不同的链接方式，端口也不同，一般而言，HTTP 协议的端口为 80，HTTPS 的端口为 443，HTTP 的连接很简单，是无状态的；HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输（非对称加密）、身份认证的网络协议，比 HTTP 协议安全。 

(3)HTTPS 协议的工作原理 

客户端在使用 HTTPS 方式与 Web 服务器通信时有以下几个步骤。 

客户使用 HTTPS url 访问服务器，则要求 web 服务器建立 ssl 链接。 

web 服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），返回或 者说传输给客户端。 

客户端和 web 服务器端开始协商 SSL 链接的安全等级，也就是加密等级。 

客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥，并传送给网站。 

web 服务器通过自己的私钥解密出会话密钥。 web 服务器通过会话密钥加密与客户端之间的通信。 

**(4)HTTPS 协议的优点** 

使用 HTTPS 协议可认证用户和服务器，确保数据发送到正确的客户机和服务器HTTPS 协议是由 SSL+HTTP 协议构建的可进行**加密传输、身份认证的网络协议**，要比 http 协议安全，可防止数据在传输过程中不被窃取、改变，确保数据的完整性。

HTTPS 是现行架构下最安全的解决方案，虽然不是绝对安全，但它大幅增加了中间人攻 击的成本。

**(5)https 协议的缺点** 

https 握手阶段比较**费时**，会使页面加载时间延长 50%，增加 10%~20%的耗电。 https 缓存不如 http 高效，会增加数据开销。 SSL 证书也需要钱，功能越强大的证书费用越高。 **SSL 证书需要绑定 IP**，不能再同一个 ip 上绑定多个域名，ipv4 资源支持不了这种消耗。

#### TCP 三次握手，一句话概括

C 发起请求连接 S 确认，也发起连接 C 确认我们 再看看每次握手的作用：第一次握手：S 只可以确认 自己可以接受 C 发送的报文段第 二次握手：C 可以确认 S 收到了自己发送的报文段，并且可以确认 自己可以接受 S 发 送的报文段第三次握手：S 可以确认 C 

#### TCP 和 UDP 的区别

（1）TCP 是面向连接的，UDP是无连接的即发送数据前**不需要先建立链接**。
（2）TCP 提供可靠的服务。也就是说，通过 TCP 连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP 尽最大努力交付，即不保证可靠交付。 并且因为 TCP可靠，面向连接，不会丢失数据因此适合大数据量的交换。
（3）TCP 是面向字节流，UDP 面向报文，并且网络出现拥塞不会使得发送速率降低（因此会出现丢包，对实时的应用比如 IP 电话和视频会议等）。
（4）TCP 只能是 1 对 1 的，UDP 支持 1 对 1,1 对多。
（5）TCP 的首部较大为 20 字节，而 UDP 只有 8 字节。
（6）TCP 是面向连接的可靠性传输，而 UDP 是不可靠的

####  WebSocket 的实现和应用

**(1)什么是 WebSocket?**

WebSocket 是 HTML5 中的协议，支持持久连续，http 协议不支持持久性连接。Http1.0 和 HTTP1.1 都不支持持久性的链接，**HTTP1.1 中的 keep-alive，将多个 http 请求合并为 1 个。**

**(2)WebSocket 是什么样的协议，具体有什么优点？**

HTTP 的生命周期通过 Request 来界定，也就是 Request 一个 Response，那么在 Http1.0 协议中，这次 Http 请求就结束了。在 Http1.1 中进行了改进，是的有一个 connection： Keep-alive，也就是说，在一个 Http 连接中，可以发送多个 Request，接收多个 Response。 但是必须记住，**在 Http 中一个 Request 只能对应有一个 Response，而且这个 Response 是被动的，不能主动发起。** 

WebSocket 是基于 Http 协议的，或者说**借用了 Http 协议来完成一部分握手**，在握手阶段 与 Http 是相同的。

#### HTTP 请求的方式，HEAD 方式

head：类似于 get 请求，只不过返回的响应中没有具体的内容，用户获取报头 

options：允许客户端查看服务器的性能，比如说服务器支持的请求方式等等

#### 说一下 web Quality（无障碍

能够被残障人士使用的网站才能称得上一个易用的（易访问的）网站。 残障人士指的是那些带有残疾或者身体不健康的用户。 使用 **alt 属性**： 

`<img src="person.jpg" alt="this is a person"/>`

有时候浏览器会无法显示图像。具体的原因有：

用户关闭了图像显示 

浏览器是不支持图形显示的迷你浏览器 

浏览器是语音浏览器（供盲人和弱视人群使用) 

如果您使用了 alt 属性，那么浏览器至少可以显示或读出有关图像的描述

#### 几个很实用的 BOM 属性对象方法

**(1)location 对象**

location.href-- 返回或设置当前文档的 URL

location.search -- 返回 URL 中的查询字符串部分

location.href-- 返回或设置当前文档的 URL

location.search -- 返回 URL 中的查询字符串部分。

location.hostname -- 返回 URL 中的主域名部分，

location.pathname -- 返回 URL 的域名后的部分。

location.port -- 返回 URL 中的端口部分。

location.protocol -- 返回 URL 中的协议部分。

location.assign -- 设置当前文档的 URL



**(2)history 对象**

history.go() -- 前进或后退指定的页面数 history.go(num);

history.back() -- 后退一页

history.forward() -- 前进一页

**(3)对象**

navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字
符串)
navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie

#### 说一下 http2.0

- 提升访问速度（可以对于，请求资源所需时间更少，访问速度更快，相比 http1.0）
- 允许多路复用：多路复用允许同时通过单一的 HTTP/2 连接发送多重请求-响应信息。改善了：在 http1.1 中，浏览器客户端在同一时间，针对同一域名下的请求有一定数量限
  制（连接数量），超过限制会被阻塞。
- 二进制分帧：HTTP2.0 会将所有的传输信息分割为更小的信息或者帧，并对他们进行二
- 进制编码
- 首部压缩
- 服务器端推送

#### 补充 400 和 401、403 状态码

**(1)400 状态码：请求无效**

产生原因：
前端提交数据的字段名称和**字段类型与后台的实体没有保持一致**
前端提交到后台的数据应该是 **json** 字符串类型，但是前端没有将对象 JSON.stringify 转化成字符串。
解决方法：
对照字段的名称，保持一致性
将 obj 对象通过 JSON.stringify 实现序列化

**(2) 401 状态码**：当前请求需要用户验证

**(3) 403 状态码**：服务器已经得到请求，但是**拒绝执行**

#### fetch 发送 2 次请求的原因

**<u>fetch 发送 post 请求的时候，总是发送 2 次，第一次状态码是 204，第二次才成功？</u>** 

原因很简单，因为你用 fetch 的 post 请求的时候，导致 **fetch 第一次发送了一个 Options 请求**，**询问服务器是否支持修改的请求头（更改传输的内容，如form表单，JSON等）**，如果服务器支持，则在第二次中**发送真正的请求**。

#### Cookie、sessionStorage、localStorage 的区

**共同点：**都是保存在浏览器端，并且是同源的

**Cookie：**cookie 数据始终在同源的 http 请求中携带**（即使不需要）**，即 cookie 在浏览器 和服务器间来回传递。（CSRF攻击）而 sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。

cookie 数据还有路径（path）的概念，可以限制 cookie 只属于某个路径下, 存储的大小很小只有 4K 左右。 （key：可以在浏览器和服务器端来回传递，存储容量 小，只有大约 4K 左右，数量限制，子cookie解决，不同浏览器不同。）

**sessionStorage**：仅在当前浏览器窗口关闭前有效（刷新等都没事），自然也就不可能持久保持，

**localStorage**： 始终有效，窗口或浏览器关闭也一直保存，因此用作**持久数据**；cookie 只在设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。 localStorage：localStorage 在**所有同源窗口中都是共享的**；**cookie 也是在所有同源窗口中都是共享的**，sessionStorage用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些。（key：同源窗口都会共享，并且不会失效，不管窗口或者浏览器关闭与否都会始终生效）

#### 说一下 web work

在 HTML 页面中，如果在执行脚本时，页面的状态是不可相应的，直到脚本执行完成后， 页面才变成可相应。web worker 是运行在后台的 js，独立于其他脚本，不会影响页面你 的性能。并且通过 postMessage 将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。

如何创建 web worker：

- 检测浏览器对于 web worker 的支持性
- 创建 web worker 文件（js，回传函数等）
- 创建 web worker 对

#### 对 HTML 语义化标签的

HTML5 语义化标签是指正确的标签包含了正确的内容，结构良好，便于阅读，比如 nav 表示导航条，类似的还有 article、header、footer 等等标签。

#### iframe 是什么？有什么缺点？

定义：iframe 元素会创建包含另一个文档的内联框架
提示：可以将提示文字放\<iframe>\</iframe>之间，来提示某些不支持 iframe 的浏览器

缺点：

会阻塞主页面的 onload 事件

搜索引擎无法解读这种页面，不利于 SEO

iframe 和主页面共享连接池，而浏览器对相同区域有限制所以会影响性能（还需要同协议下）

#### Doctype 作用?严格模式与混杂模式如何区分？它们有何意义?

Doctype 声明于文档最前面，告诉浏览器以何种方式来渲染页面，这里有两种模式，严格模式和混杂模式。

严格模式的排版和 JS 运作模式是 以该浏览器支持的最高标准运行。 

混杂模式，向后兼容，模拟老式浏览器，防止浏览器无法兼容页面。

#### 一句话概括 RESTFU

就是用 URL 定位资源，用 HTTP 描述操作。

#### 讲讲 viewport（视窗） 和移动端布

参考文章

https://github.com/forthealllight/blog/issues/13

#### addEventListener 参数

addEventListener(event, function, useCapture)

其中，event 指定事件名；function 指定要事件触发时执行的函数；useCapture 指定事件 是否在捕获或冒泡阶段执行。

#### 介绍知道的 http 返回的状态 :star:

100 Continue 继续。客户端应继续其请求

101 Switching Protocols 切换协议。服务器根据客户端的请求切换协议。只能切换到更
高级的协议，例如，切换到 HTTP 的新版本协议

200 OK 请求成功。一般用于 GET 与 POST 请求

201 Created 已创建。成功请求并创建了新的资源

202 Accepted 已接受。已经接受请求，但未处理完成

203 Non-Authoritative Information 非授权信息。请求成功。但返回的 meta 信息不在原
始的服务器，而是一个副本

204 No Content 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档

205 Reset Content 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域

206 Partial Content 部分内容。服务器成功处理了部分 GET 请求

300 Multiple Choices 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择

301 Moved Permanently 永久移动（重定向，有缓存）。请求的资源已被永久的移动到新 URI，返回信息会包括新的 URI，浏览器会自动定向到新 URI。今后任何新的请求都应使用新的 URI 代替

302 Found 临时移动。与 301 类似。但资源只是临时被移动。客户端应继续使用原有URI

303 See Other 查看其它地址。与 301 类似。使用 GET 和 POST 请求查看

304 Not Modified 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回
任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返
回在指定日期之后修改的资源

305 Use Proxy 使用代理。所请求的资源必须通过代理访问

306 Unused 已经被废弃的 HTTP 状态码

307 Temporary Redirect 临时重定向。与 302 类似。使用 GET 请求重定向

400 Bad Request 客户端请求的语法错误，服务器无法理解

401 Unauthorized 请求要求用户的身份认证

402 Payment Required 保留，将来使用

403 Forbidden 服务器理解请求客户端的请求，但是拒绝执行此请求

404 Not Found 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站
设计人员可设置"您所请求的资源无法找到"的个性页面

405 Method Not Allowed 客户端请求中的方法被禁止

406 Not Acceptable 服务器无法根据客户端请求的内容特性完成请求

407 Proxy Authentication Required 请求要求代理的身份认证，与 401 类似，但请求者
应当使用代理进行授权

408 Request Time-out 服务器等待客户端发送的请求时间过长，超时

409 Conflict 服务器完成客户端的 PUT 请求是可能返回此代码，服务器处理请求时发
生了冲突

410 Gone 客户端请求的资源已经不存在。410 不同于 404，如果资源以前有现在被永
久删除了可使用 410 代码，网站设计人员可通过 301 代码指定资源的新位置

411 Length Required 服务器无法处理客户端发送的不带 Content-Length 的请求信息

412 Precondition Failed 客户端请求信息的先决条件错误

413 Request Entity Too Large 由于请求的实体过大，服务器无法处理，因此拒绝请求。
为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则
会包含一个 Retry-After 的响应信息

414 Request-URI Too Large 请求的 URI 过长（URI 通常为网址），服务器无法处理

415 Unsupported Media Type 服务器无法处理请求附带的媒体格式

416 Requested range not satisfiable 客户端请求的范围无效

417 Expectation Failed 服务器无法满足 Expect 的请求头信息

500 Internal Server Error 服务器内部错误，无法完成请求

501 Not Implemented 服务器不支持请求的功能，无法完成请求

502 Bad Gateway 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接
收到了一个无效的响应

503 Service Unavailable 由于超载或系统维护，服务器暂时的无法处理客户端的请求。
延时的长度可包含在服务器的 Retry-After 头信息中

504 Gateway Time-out 充当网关或代理的服务器，未及时从远端服务器获取请求

505 HTTP Version not supported 服务器不支持请求的 HTTP 协议的版本，无法完成处
理

#### http 常用请求头

P21
