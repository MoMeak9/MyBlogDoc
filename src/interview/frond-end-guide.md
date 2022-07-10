---
date: 2022-03-28
icon: page
sticky: true
category:
- 面试题
- 前端
headerDepth: 3
---

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

#### 说一下 HTTP2.0

- 提升访问速度（可以对于，请求资源所需时间更少，访问速度更快，相比 http1.0）
- 允许多路复用：多路复用允许同时通过单一的 HTTP/2 连接发送多重请求-响应信息。改善了：在 http1.1 中，浏览器客户端在同一时间，针对同一域名下的请求有一定数量限制（连接数量），超过限制会被阻塞。
- 二进制分帧：HTTP2.0 会将所有的传输信息分割为更小的信息或者帧，并对他们进行二进制编码（http1.X 的解析是基于文本的，http2.0 将所有的传输信息分割为更小的 消息和帧，并对他们采用二进制格式编码，基于二进制可以让协议有更多的扩展性，比 如引入了帧来传输数据和指令）
- 首部压缩
- 服务器端推送
- 内容安全，应为 http2.0 是基于 https 的，天然具有安全特性，通过 http2.0 的特性可 以避免单纯使用 https 的性能下降

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

Accept 可接受的响应内容类型（Content-Types）。

Accept-Charset 可接受的字符集。

Accept-Encoding 可接受的响应内容的编码方式。

Accept-Language 可接受的响应内容语言列表。

Authorization 用于表示 HTTP 协议中需要认证资源的认证信

Cache-Control 用来指定当前的请求/回复中的，是否使用缓存机制。

Cookie 由之前服务器通过Set-Cooki（e 见下文）设置的一个HTTP协议Cookie

Content-Length 以 8 进制表示的请求体的长

Host 表示服务器的域名以及服务器所监听的端口号。如果所请求的端口是对应的服务的标准端口（80），则端口号可以省略。

Origin 发起一个针对跨域资源共享的请求（该请求要求服务器在响应中加入一个 Access-Control-Allow-Origin 的消息头，表示访问控制所允许的来源）。

####  强/协商缓存

缓存分为两种：强缓存和协商缓存，根据响应的 header 内容来决定。

![image-20220321195538632](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202203211955368.png)

强缓存相关字段有 expires，cache-control。如果 cache-control 与 expires 同时存在的话，cache-control 的优先级高于 expires。协商缓存相关字段有 Last-Modified/If-Modified-Since，Etag/If-None-Match

####  讲讲 304

304：如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自
上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个 304 状态码。

#### 强缓存、协商缓存什么时候用哪个

我们希望服务器上的资源更新了浏览器就请求新的资源，没有更新就使用本地的缓存，以最大程度的减少因网络请求而产生的资源浪费。（最终由服务器抉择是否为200or304）

#### 前端优化

降低请求量：合并资源，减少 HTTP 请求数，minify / gzip 压缩，webP，lazyLoad。

加快请求速度：预解析 DNS，减少域名数，并行加载，CDN 分发。

缓存：HTTP 协议缓存请求，离线缓存 manifest，离线数据缓存 localStorage。

渲染：JS/CSS 优化，加载顺序，服务端渲染，pipeline。

#### GET 和 POST 的区

- get 参数通过 url 传递，post 放在 request body 中（从规范来说，实际上从协议来说也可以使用get的body）。

- get 请求在 url 中传递的参数是有长度限制的（2048），而 post 没有。

- get 比 post 更不安全，因为参数直接暴露在 url 中，所以不能用来传递敏感信息。

- get 请求只能进行 url 编码，而 post 支持多种编码方式

- get 请求会浏览器主动 cache，而 post 支持多种编码方式。

- get 请求参数会被完整保留在浏览历史记录里，而 post 中的参数不会被保留。

- GET 和 POST 本质上就是 TCP 链接，并无差别。但是由于 HTTP 的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。

- GET 产生一个 TCP 数据包；POST 产生两个 TCP 数据包。

#### 301 和 302 的区别

301 Moved Permanently 被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一。如果可能，拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址。除非额外指定，否则这个响应也是**可缓存的**。 

302 Found 请求的资源现在临时从不同的 URI 响应请求。由于这样的重定向是临时的， 客户端应当继续向原有地址发送以后的请求。**只有在 Cache-Control 或 Expires 中进行了 指定的情况下，这个响应才是可缓存的**。 字面上的区别就是 301 是永久重定向，而 302 是临时重定向。 <u>301 比较常用的场景是使用域名跳转。302 用来做临时跳转比如未登陆的用户访问用户中心重定向到登录页面。</u>

#### 状态码 304 和 20

状态码 200：请求已成功，请求所希望的响应头或数据体将随此响应返回。即返回的数 据为全量的数据，如果文件不通过 GZIP 压缩的话，文件是多大，则要有多大传输量。 

状态码 304：如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的 内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。即客户端和服务器端只需要传输很少的数据量来做文件的校验，如果文件没有修改过，则不需要返回全量的数据。

#### 说一下浏览器缓存

缓存分为两种：强缓存和协商缓存，根据响应的 header 内容来决定。

强缓存相关字段有 expires，cache-control。如果 cache-control 与 expires 同时存在的话，
cache-control 的优先级高于 expires。

协商缓存相关字段有 Last-Modified/If-Modified-Since，Etag/If-None-Match

#### 在地址栏里输入一个 URL,到这个页面呈现出来，中间会发生什么？

使用整理补充

#### cookie 和 session 的区别，localstorage 和 sessionstorage 的区别

Cookie 和 session 都可用来存储用户信息，cookie 存放于客户端，session 存放于服务器端，因为 cookie 存放于客户端有可能被窃取，所以 cookie 一般用来存放不敏感的信息，比如用户设置的网站主题，敏感的信息用 session 存储，比如用户的登陆信息，session 可以存放于文件，数据库，内存中都可以，cookie 可以服务器端响应的时候设置，也可以客户端通过 JS 设置 cookie 会在请求时在 http 首部发送给客户端，cookie 一般在客户端有大小限制，一般为 4K，
下面从几个方向区分一下 cookie，localstorage，sessionstorage 的区别

1、生命周期：
Cookie：可设置失效时间，否则默认为关闭浏览器后失效
Localstorage:除非被手动清除，否则永久保存
Sessionstorage：仅在当前网页会话下有效，关闭页面或浏览器后就会被清除

2、存放数据：
Cookie：4k 左右
Localstorage 和 sessionstorage：可以保存 5M 的信息

3、http 请求：
Cookie：每次都会携带在 http 头中，如果使用 cookie 保存过多数据会带来性能问题
其他两个：仅在客户端即浏览器中保存，不参与和服务器的通信

4、易用性：
Cookie：需要程序员自己封装，原生的 cookie 接口不友好
其他两个：即可采用原生接口，亦可再次封装

5、应用场景：
从安全性来说，因为每次 http 请求都回携带 cookie 信息，这样子浪费了带宽，所以 cookie应该尽可能的少用，此外 cookie 还需要指定作用域，不可以跨域调用，限制很多，但是用户识别用户登陆来说，cookie还是比storage好用，其他情况下可以用storage，localstorage可以用来在页面传递参数，sessionstorage 可以用来保存一些临时的数据，防止用户刷新页面后丢失了一些参数。

#### 浏览器在生成页面的时候，会生成那两颗树？

构造两棵树，DOM 树和 CSSOM 规则树，

当浏览器接收到服务器相应来的 HTML 文档后，会遍历文档节点，生成 DOM 树，

CSSOM 规则树由浏览器解析 CSS 文件生成

#### 怎么看网站的性能如何

检测页面加载时间一般有两种方式，**一种是被动去测**：就是在被检测的页面置入脚本或探针，当用户访问网页时，探针自动采集数据并传回数据库进行分析，**另一种主动监测的方式**，即主动的搭建分布式受控环境，模拟用户发起页面访问请求，主动采集性能数据并分析，在检测的精准度上，专业的第三方工具效果更佳，比如说性能极客

#### 输入 URL 到页面加载显示完成发生了什么?

DNS 解析
TCP 连接
发送 HTTP 请求
服务器处理请求并返回 HTTP 报文
浏览器解析渲染页面
连接结束

#### HTML5 和 CSS3 用的多吗？你了解它们的新属性吗？有在项目中用过吗？

**HTML5**：

1）标签增删

8 个语义元素 header section footer aside nav main article figure

内容元素 mark 高亮 progress 进度

新的表单控件 calander date time email url search

新的 input 类型 color date datetime datetime-local email

移除过时标签 big font frame frameset

2）canvas 绘图，支持内联 SVG。支持 MathML

3）多媒体 audio video source embed track

4）本地离线存储，把需要离线存储在本地的文件列在一个 manifest 配置文件

5）web 存储。localStorage、SessionStorage

**CSS3**：

CSS3边框如border-radius，box-shadow等；

CSS3背景如background-size，background-origin
等；

CSS3 2D，3D 转换如 transform 等；

CSS3 动画如 animation

#### 说说 302，301，304 的状态

301 Moved Permanently 永久移动。请求的资源已被永久的移动到新 URI，返回信息会包括新的 URI，浏览器会自动定向到新 URI。今后任何新的请求都应使用新的 URI 代替302 Found 临时移动。与 301 类似。但资源只是临时被移动。客户端应继续使用原有URI

304 Not Modified 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源

### CSS

#### 说一下 css 盒模

简介：就是用来装页面上的元素的矩形区域。CSS 中的盒子模型包括 IE 盒子模型和标 准的 W3C 盒子模型。 box-sizing(有 3 个值哦)：border-box,padding-box,content-box. 标准盒子模型：

![image-20220323215733110](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220323215733110.png)

![image-20220323215740198](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220323215740198.png)

#### 画一条 0.5px 的线

采用 meta viewport 的方式

\<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

采用 border-image 的方式  边框绘制的方式

采用 transform: scale()的方 缩放的方式

#### link 标签和 import 标签的区

link 属于 html 标签，而@import 是 css 提供的

页面被加载时，link 会同时被加载，而**@import 引用的 css 会等到页面加载结束后加载。**

link 是 html 标签，因此没有兼容性，而@import 只有 IE5 以上才能识别。

link 方式样式的权重高于@import 的

####  transition 和 animation 的区别

Animation 和 transition 大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是 transition  需要触发一个事件才能改变属性，让属性变化成为一个持续一段时间的过程，而不是立即生效的。而 animation 不需要触发任何事件的情况下才会随时间改变属性值，并且 transition 为 2 帧，从 from .... to，而 animation 可以一帧一帧的。

####  关于 JS 动画和 css3 动画的差异性

渲染线程分为 main thread 和 compositor thread（合成线程），如果 css 动画只改变 transform 和 opacity，这时整个 CSS 动画得以在 compositor trhead 完成（而 JS 动画则会在 main thread 执行，然后出发 compositor thread 进行下一步操作），**特别注意的是如果改变 transform 和 opacity 是不会 layout 或者 paint 的（回流和重绘的）**。

区别：

功能涵盖面，JS 比 CSS 大

实现/重构难度不一，CSS3 比 JS 更加简单，性能跳优方向固定

对帧速表现不好的低版本浏览器，css3 可以做到自然降级

css 动画有天然事件支持

css3 有兼容性问题

#### 说一下块元素和行元素

块元素：独占一行，并且有自动填满父元素，可以设置 margin 和 pading 以及高度和宽 度 

行元素：不会独占一行，**width 和 height 会失效**，**并且在垂直方向的 padding 和 margin会失效**

#### visibility=hidden, opacity=0，display:none

opacity=0，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定一些 事件，如 click 事件，那么点击该区域，也能触发点击事件的 

visibility=hidden，该元素 隐藏起来了，但不会改变页面布局，但是不会触发该元素已经绑定的事件 

display=none， 把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删除掉一样。

####  双边距重叠问题（外边距折叠）

多个相邻（兄弟或者父子关系）普通流的块元素垂直方向（同一个BFC） marigin 会重叠 折叠的结果为：

两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。

两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。

两个外边距一正一负时，折叠结果是两者的相加的和。

### JavaScript



## 前端核心

### 服务端编程

#### JSONP 的缺点

JSONP 只支持 get，因为 script 标签只能使用 get 请求；（JSONP 是一种【请求一段 JS 脚本，把执行这段脚本的结果当做数据】的玩法。）

JSONP 需要后端配合返回指定格式的数据。

**实现跨域**

JSONP：ajax 请求受同源策略影响，不允许进行跨域请求，而 script 标签 src 属性中的链接却可以访问跨域的 js 脚本，利用这个特性，服务端不再返回 JSON 格式的数据，而是返回一段调用某个函数的 js 代码，在 src 中进行了调用，这样实现了跨域。

####  如何实现跨域

iframe 跨域：两个页面都通过 js 强制设置 document.domain 为基础主域，就实现了同域。

location.hash + iframe 跨域：a 欲与 b 跨域相互通信，通过中间页 c 来实现。 三个页面，不同域之间利用 iframe 的 location.hash 传值，相同域之间直接 js 访问来通信。

window.name + iframe跨域：通过iframe的src属性由外域转向本地域，跨域数据即由iframe的 window.name 从外域传递到本地域。

postMessage 跨域：可以跨域操作的 window 属性之一。

CORS：服务端设置 Access-Control-Allow-Origin 即可，前端无须设置，若要带 cookie 请求，前后端都需要设置。

代理跨域：起一个代理服务器，实现数据的转发

#### dom 是什么，你的理解？

文档对象模型（Document Object Model，简称 DOM），是 W3C 组织推荐的处理可扩展 标志语言的标准编程接口。在网页上，组织页面（或文档）的对象被组织在一个树形结 构中，用来表示文档中对象的标准模型就称为 DOM。

#### 实现一个 Ajax

Ajax 能够在不重新加载整个页面的情况下与服务器交换数据并更新部分网页内容，实现 局部刷新，大大降低了资源的浪费，是一门用于快速创建动态网页的技术，ajax 的使用 分为四部分：

1、创建 XMLHttpRequest 对象 var xhr = new XMLHttpRequest();

2、向服务器发送请求，使用 xmlHttpRequest 对象的 open 和 send 方法，

3、监听状态变化，执行相应回调函数

```js
var xhr = new XMLHttpRequest();
xhr.open('get', 'aabb.php', true);
xhr.send(null);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            console.log(xhr.responseText);
        }
    }
}
```

### 移动 web 开发



## 前端进阶

### 前端工程化

####  Babel 的原理是什么?

babel 的转译过程也分为三个阶段，这三步具体是：

- **解析 Parse**: 将代码解析生成**抽象语法树**( 即 **AST** )，即词法分析与语法分析的过程。

- **转换 Transform**: 对于 AST 进行变换一系列的操作，babel 接受得到AST 并通过 babel-traverse 对其进行遍历，**在此过程中进行添加、更新及移除等操作**。

- **生成 Generate**: 将变换后的 AST 再转换为 JS 代码, 使用到的模块是babel-generator。

![image-20220407114237037](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204071142124.png)

#### 如何写一个 babel 插件?



### Git

#### rebase 和 merge 的区别

git rebase 和 git merge 一样都是用于从一个分支获取并且合并到当前分支.

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204071149969.png" alt="image-20220407114906889" style="zoom: 80%;" />

- marge 特点：自动创建一个新的 commit 如果合并的时候遇到冲突，仅需 要修改后重新 commit。
- 优点：记录了真实的 commit 情况，包括每个分支的详情。
- 缺点：因为每次 merge 会自动产生一个 merge commit，所以在使用一些 git 的 GUI tools，特别是 commit 比较频繁时，看到分支很杂。

![image-20220407115329273](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204071153342.png)

- rebase 特点：会合并之前的 commit 历史
- 优点：得到更简洁的项目历史，去掉了 merge commit
- 缺点：如果合并出现代码问题不容易定位，因为 re-write 了 history

因此,当需要保留详细的合并信息的时候建议使用 git merge，特别是需要将分支合并进入 master 分支时；当发现自己修改某个功能时，频繁进行了 git commit 提交时，发现其实 过多的提交信息没有必要时，可以尝试 git rebase。

#### git reset、git revert 和 git checkout 有什么区别

这个问题同样也需要先了解 git 仓库的三个组成部分：工作区（Working Directory）、 暂存区（Stage）和历史记录区（History）。

- 工作区：在 git 管理下的正常目录都算是工作区，我们平时的编辑工作 都是在工作区完成
-  暂存区：临时区域。里面存放将要提交文件的快照
-  历史记录区：git commit 后的记录区

####  webpack 和 gulp 区别（模块化与流的区别）

gulp 强调的是前端开发的工作流程，我们可以通过配置一系列的 task，定义 task 处理的 事务（例如文件压缩合并、雪碧图、启动 server、版本控制等），然后定义执行顺序， 来让 gulp 执行这些 task，从而构建项目的整个前端开发流程。 

webpack 是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源（图 片、js 文件、css 文件等）都看成模块，通过 loader（加载器）和 plugins（插件）对资源 进行处理，打包成符合生产环境部署的前端资源。

### Vue 框架

#### 有使用过 Vue 吗？说说你对 Vue 的理解

Vue 是一个构建数据驱动的渐进性框架，它的目标是通过 API 实现响应数据绑定和视图更新。

####  说说 Vue 的优缺点

优点：

1、数据驱动视图，对真实 dom 进行抽象出 virtual dom（本质就是一个 js 对象），
并配合 diff 算法、响应式和观察者、异步队列等手段以最小代价更新 dom，渲染
页面

2、组件化，组件用单文件的形式进行代码的组织编写，使得我们可以在一个文
件里编写 html\css（scoped 属性配置 css 隔离）\js 并且配合 Vue-loader 之后，支
持更强大的预处理器等功能

3、强大且丰富的 API 提供一系列的 api 能满足业务开发中各类需求

4、由于采用虚拟 dom，让 Vue ssr 先天就足

5、生命周期钩子函数，选项式的代码组织方式，写熟了还是蛮顺畅的，但仍然
有优化空间（Vue3 composition-api）

6、生态好，社区活跃

缺点：

1、由于底层基于 Object.defineProperty 实现响应式，而这个 api 本身不支持 IE8
及以下浏览器

2、csr 的先天不足，首屏性能问题（白屏）

3、由于百度等搜索引擎爬虫无法爬取 js 中的内容，故 spa 先天就对 seo 优化心
有余力不足（谷歌的 puppeteer 就挺牛逼的，实现预渲染底层也是用到了这个工
具）

####  vue 如何监听键盘事件？

1. @keyup. 方法
2. addEventListener

#### watch 怎么深度监听对象变化

deep 设置为 true 就可以监听到对象的变化

```js
let vm = new Vue({
    el: "#first", data: {msg: {name: '北京'}}, watch: {
        msg: {
            handler(newMsg, oldMsg) {
                console.log(newMsg);
            }, immediate: true, deep: true
        }
    }
})
```

#### 删除数组用 delete 和 Vue.delete 有什么区别？

- delete：只是被删除数组成员变为 empty / undefined，其他元素键值不变
- Vue.delete：直接删了数组成员，并改变了数组的键值（对象是响应式的，确保 删除能触发更新视图，这个方法主要用于避开 Vue 不能检测到属性被删除的限 制）

####  watch 和计算属性有什么区别？

通俗来讲，既能用 computed 实现又可以用 watch 监听来实现的功能，推荐用 computed， 重点在于 computed 的缓存功能 computed 计算属性是用来声明式的描述一个值依赖了其它的值，当所依赖的值或者变量 改变时，计算属性也会跟着改变； watch 监听的是已经在 data 中定义的变量，当该变量变化时，会触发 watch 中的方法。

####  Vue 双向绑定原理

Vue 数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的。利用了Object.defineProperty() 这个方法重新定义了对象获取属性值(get)和设置属性值(set)。

#### v-model 是什么？有什么用呢？

一则语法糖，相当于 v-bind:value="xxx" 和 @input，意思是绑定了一个 value 属性的值， 子组件可对 value 属性监听，通过$emit('input', xxx)的方式给父组件通讯。自己实现 v-model 方式的组件也是这样的思路。

#### axios 是什么？怎样使用它？怎么解决跨域的问题？

axios 的是一种异步请求，用法和 ajax 类似，安装 npm install axios --save 即可使用，请 求中包括 get,post,put, patch ,delete 等五种请求方式，解决跨域可以在请求头中添加 Access-Control-Allow-Origin，也可以在 index.js 文件中更改 proxyTable 配置等解决跨域 问题。

####  在 vue 项目中如何引入第三方库（比如 jQuery）？有哪些方法可以做到？

1、绝对路径直接引入 在 index.html 中用 script 引入 然后在 webpack 中配置 external externals: { 'jquery': 'jQuery' } 在组件中使用时 import import $ from 'jquery' 2 、在 webpack 中配置 alias resolve: { extensions: ['.js', '.vue', '.json'], alias: { '@': resolve('src'), 'jquery': resolve('static/jquery-1.12.4.js') } } 然后在组件中 import 3、在 webpack 中配置 plugins plugins: [ new webpack.ProvidePlugin({ $: 'jquery' }) ] 全局使用，但在使用 eslint 情况下会报错，需要在使用了 $ 的代码前添加 /* eslint-disable*/ 来去掉 ESLint 的检查。
