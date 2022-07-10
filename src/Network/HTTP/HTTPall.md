# HTTP 版本整合

## HTTP 1.0

随着互联网技术的飞速发展，HTTP协议被使用的越来越广泛，协议本身的局限性已经不能满足互联网功能的多样性。因此，`1996年5月HTTP/1.0诞生`，其内容和功能都大大增加了。对比与HTTP/0.9，新的版本包含了以下功能：

- 在每个request的GET一行后面添加版本号
- 在response第一行中添加状态行
- 在request和response中添加header的概念
- 在header中添加content-type以此可以传输html之外类型的文件
- 在header中添加content-encoding来支持不同编码格式文件的传输
- 引入了POST和HEAD命令
- 支持长连接（默认短连接）

```
GET /index.html HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/html；charset=utf-8 // 类型，编码。
<HTML>
A page with an image
  <IMG src="/image.gif">
<HTML>
```

### content

简单的文字页面自然无法满足用户的需求，于是1.0加入了更多的文件类型

| 常见Content-Type       |                 |                 |
| ---------------------- | --------------- | --------------- |
| text/plan              | text/html       | text/css        |
| image/jpeg             | image/png       | image/svg + xml |
| application/javascript | application/zip | application/pdf |

也同样可以用在html中

```js
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
```

### Content-encoding

由于支持任意数据格式的发送，因此可以先把数据进行压缩再发送。HTTP/1.0进入了Content-Encoding来表示数据的压缩方式。

- Content-Encoding: gzip。【表示采用 [Lempel-Ziv coding](https://link.juejin.cn?target=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLZ77_and_LZ78%23LZ77) (LZ77) 压缩算法，以及32位CRC校验的编码方式】
- Content-Encoding: compress。【采用 [Lempel-Ziv-Welch](https://link.juejin.cn?target=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLZW) (LZW) 压缩算法】
- Content-Encoding: deflate。【采用 [zlib](https://link.juejin.cn?target=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FZlib) 】

客户端发送请求带有表明我可以接受`gzip`、`deflate`两种压缩方式

```
Accept-Encoding: gzip, deflate
```

服务器在 `Content-Encoding` 响应首部提供了实际采用的压缩模式

```js
Content-Encoding: gzip
```

## HTTP 1.1

仅仅在HTTP/1.0公布后的几个月，HTTP/1.1发布了，到目前为止`HTTP1.1协议都是作为主流的版本`，以至于随后的近10年时间里都没有新的HTTP协议版本发布。

对比之前的版本，其主要更新如下：:star:

- 可以重复使用连接（keep-alive），从而节省时间，不再需要多次打开才能显示嵌入在单个原始文档中的资源
- 添加了Pipeline，这允许在第一个请求的答案完全传输之前发送第二个请求这降低了通信的延迟
- chunked机制，分块响应
- 引入了额外的缓存控制机制
- 引入了内容协商，包括语言、编码和类型，客户端和服务器现在可以就交换哪些内容达成一致
- 由于[`Host`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FHTTP%2FHeaders%2FHost)标头，从同一 IP 地址托管不同域的能力允许服务器搭配

### keep-alive

由于建立一个连接的过程需要DNS解析过程以及TCP的三次握手，但在同服务器获取资源不断的建立和断开链接需要消耗的资源和时间是巨大的，为了提升连接的效率。 HTTP/1.1的及时出现将长连接加入了标准并作为默认实现，服务器端也按照协议保持客户端的长连接状态，`一个服务端上的多个资源都可以通过这一条连接多个request来获取`。

可以在request header中引入如下信息来告知服务器完成一次request请求后不要关闭连接。

```js
Connection: keep-alive
```

服务器端也会答复一个相同的信息表示连接仍然有效，但是在当时这只是属于程序员的自定义行为，在1.0中没有被纳入标准， 这其中的提升对于通讯之间的效率提升几乎是倍增的，

这也为管线化方式（pipelining）打下基础。

### Pipeline （管线化）

HTTP/1.1尝试通过HTTP管线化技术来解决性能瓶颈，诞生了pipeline机制，如图从每次response返回结果才能进行下一次request，变为`一次连接上多个http request不需要等待response就可以连续发送`的技术。

![image-20220710151407273](https://cdn.yihuiblog.top/images/202207101514360.png)

> 不幸的是因为HTTP是一个无状态的协议，一个体积很大的或慢response仍然会阻塞后面所有的请求，每条request无法知道哪条response是返回给他的，服务端只能根据顺序来返回response，这就是`队头阻塞`，这导致主流浏览器上默认下该功能都是关闭状态，在http2.0中会解决这个问题

### host头域

在 `HTTP1.0` 中认为每台服务器都绑定一个唯一的 `IP` 地址，因此，请求消息中的 `URL` 并没有传递主机名（`hostname`）,1.1中新增的host用来处理一个 `IP` 地址上面多个虚拟主机的情况。

在请求头域中新增了Host字段，其用来指定服务器的域名。有了Host字段，在同一台服务器上就可以搭建不同的网站了，这也为后来虚拟化的发展建好啦地基。

```
Host: www.alibaba-inc.com
```

### cache机制

Cache不仅可以提高用户的访问速率，在移动端设备上还可以为用户极大节省流量。因此，在HTTP/1.1中新增了很多与Cache相关的头域并围绕这些头域设计了更灵活、更丰富的Cache机制。

Cache机制需要解决的问题包括：

1. 判断哪些资源可以被Cache及访问访问策略
2. 在本地判断Cache资源是否已经过期
3. 向服务端发起问询，查看已过期的Cache资源是否在服务端发生了变化

### chunked机制

建立好链接之后客户端可以使用该链接发送多个请求，用户通常会通过response header中返回的`Content-Length`来判断服务端返回数据的大小。但随着网络技术的不断发展，越来越多的动态资源被引入进来，这时候服务端就无法在传输之前知道待传递资源的大小，也就无法通过Content-Length来告知用户资源大小。服务器可以一边动态产生资源，一边传递给用户，这种机制称为“分块传输编码”（Chunkded Transfer Encoding），**允许服务端发送给客户端的数据分为多个部分**，此时服务器端需要在header中添加“**Transfer-Encoding: chunked**”头域来替代传统的“Content-Length。

```js
Transfer-Encoding: chunked
```

### HTTP 缓存机制

见文章 []

### 新增了五种请求方法

**OPTIONS**： 浏览器为确定跨域请求资源的安全做的预请求

**PUT**：从客户端向服务器传送的数据取代指定的文档的内容

**DELETE** ：请求服务器删除指定的页面

**TRACE**： 回显服务器收到的请求，主要用于测试或诊断

**CONNECT**： HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器

### 新增一系列的状态码

可以参考[状态码大全](https://link.juejin.cn?target=https%3A%2F%2Fcloud.tencent.com%2Fdeveloper%2Farticle%2F1752690)

### Http1.1缺陷

1. 高延迟，带来页面加载速度的降低，（网络延迟问题只要由于队头阻塞，导致宽带无法被充分利用）
2. 无状态特性，带来巨大的Http头部
3. 明文传输，不安全
4. 不支持服务器推送消息

## HTTP 2

由于 HTTPS 在安全方面已经做的非常好了，HTTP 改进的关注点放在了性能方面。对于 HTTP/2 而言，它对于性能的提升主要在于两点:

- **头部压缩**
- **多路复用**

当然还有一些颠覆性的功能实现:

- **设置请求优先级**
- **服务器推送**

这些重大的提升本质上也是为了解决 HTTP 本身的问题而产生的。接下来我们来看看 HTTP/2 解决了哪些问题，以及解决方式具体是如何的。

在 HTTP/1.1 及之前的时代，**请求体**一般会有响应的压缩编码过程，通过`Content-Encoding`头部字段来指定，但你有没有想过头部字段本身的压缩呢？当请求字段非常复杂的时候，尤其对于 GET 请求，请求报文几乎全是请求头，这个时候还是存在非常大的优化空间的。HTTP/2 针对头部字段，也采用了对应的压缩算法——HPACK，对请求头进行压缩。

HPACK 算法是专门为 HTTP/2 服务的，它主要的亮点有两个：

- 首先是在服务器和客户端之间建立哈希表，将用到的字段存放在这张表中，那么在传输的时候对于之前出现过的值，只需要把**索引**(比如0，1，2，...)传给对方即可，对方拿到索引查表就行了。这种**传索引**的方式，可以说让请求头字段得到极大程度的精简和复用。

![image-20220710145236084](https://cdn.yihuiblog.top/images/202207101452200.png)

> HTTP/2 当中废除了起始行的概念，将起始行中的请求方法、URI、状态码转换成了头字段，不过这些字段都有一个":"前缀，用来和其它请求头区分开。

- 其次是对于整数和字符串进行**哈夫曼编码**，哈夫曼编码的原理就是先将所有出现的字符建立一张索引表，然后让出现次数多的字符对应的索引尽可能短，传输的时候也是传输这样的**索引序列**，可以达到非常高的压缩率。

### 多路复用

#### HTTP 队头阻塞

我们之前讨论了 HTTP 队头阻塞的问题，其根本原因在于HTTP 基于`请求-响应`的模型，在同一个 TCP 长连接中，前面的请求没有得到响应，后面的请求就会被阻塞。

后面我们又讨论到用**并发连接**和**域名分片**的方式来解决这个问题，但这并没有真正从 HTTP 本身的层面解决问题，只是增加了 TCP 连接，分摊风险而已。而且这么做也有弊端，多条 TCP 连接会竞争**有限的带宽**，让真正优先级高的请求不能优先处理。

而 HTTP/2 便从 HTTP 协议本身解决了`队头阻塞`问题。注意，这里并不是指的`TCP队头阻塞`，而是`HTTP队头阻塞`，两者并不是一回事。<u>TCP 的队头阻塞是在`数据包`层面</u>，单位是`数据包`，前一个报文没有收到便不会将后面收到的报文上传给 HTTP，<u>而HTTP 的队头阻塞是在 `HTTP 请求-响应`层面</u>，前一个请求没处理完，后面的请求就要阻塞住。两者所在的层次不一样。

那么 HTTP/2 如何来解决所谓的队头阻塞呢？

#### 二进制分帧

首先，HTTP/2 认为明文传输对机器而言太麻烦了，不方便计算机的解析，因为对于文本而言会有多义性的字符，比如回车换行到底是内容还是分隔符，在内部需要用到状态机去识别，效率比较低。于是 HTTP/2 干脆把报文全部换成二进制格式，全部传输`01`串，方便了机器的解析。

原来`Headers + Body`的报文格式如今被拆分成了一个个二进制的帧，用**Headers帧**存放头部字段，**Data帧**存放请求体数据。分帧之后，服务器看到的不再是一个个完整的 HTTP 请求报文，而是一堆乱序的二进制帧。这些二进制帧不存在先后关系，因此也就不会排队等待，也就没有了 HTTP 的队头阻塞问题。

通信双方都可以给对方发送二进制帧，这种二进制帧的**双向传输的序列**，也叫做`流`(Stream)。HTTP/2 用`流`来在一个 TCP 连接上来进行多个数据帧的通信，这就是**多路复用**的概念。

可能你会有一个疑问，既然是乱序首发，那最后如何来处理这些乱序的数据帧呢？

首先要声明的是，所谓的乱序，指的是不同 ID 的 Stream 是乱序的，但同一个 Stream ID 的帧一定是按顺序传输的。二进制帧到达后对方会将 Stream ID 相同的二进制帧组装成完整的**请求报文**和**响应报文**。当然，在二进制帧当中还有其他的一些字段，实现了**优先级**和**流量控制**等功能，我们放到下一节再来介绍。

### 服务器推送

另外值得一说的是 HTTP/2 的服务器推送(Server Push)。在 HTTP/2 当中，服务器已经不再是完全被动地接收请求，响应请求，它也能新建 stream 来给客户端发送消息，当 TCP 连接建立之后，比如浏览器请求一个 HTML 文件，服务器就可以在返回 HTML 的基础上，将 HTML 中引用到的其他资源文件一起返回给客户端，减少客户端的等待。

### 总结

当然，HTTP/2 新增那么多的特性，是不是 HTTP 的语法要重新学呢？不需要，HTTP/2 完全兼容之前 HTTP 的语法和语义，如**请求头、URI、状态码、头部字段**都没有改变，完全不用担心。同时，在安全方面，HTTP 也支持 TLS，并且现在主流的浏览器都公开只支持加密的 HTTP/2, 因此你现在能看到的 HTTP/2 也基本上都是跑在 TLS 上面的了。最后放一张分层图给大家参考:

![image-20220710145611195](https://cdn.yihuiblog.top/images/202207101456278.png)

## HTTP 3

### QUIC 和 HTTP/3 中真正的多路复用

现在说到 HTTP/3。HTTP/2 和 HTTP/3 的主要区别在于所使用的传输协议。与之前的 TCP 协议不同，HTTP/3 使用了一个全新的协议 —— [QUIC](https://link.juejin.cn?target=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc9000.html)。QUIC 是一个通用的传输协议，解决了 HTTP/2 因为 TCP 而产生的队头阻塞问题（HTTP2 只解决了HTTP应用层请求-响应的队头阻塞问题）。<u>这个协议能让你通过 UDP 创建[一系列带状态的流](https://link.juejin.cn?target=https%3A%2F%2Fquicwg.org%2Fbase-drafts%2Fdraft-ietf-quic-http.html%23name-delegation-to-quic)（这与 TCP 很相似）。</u>

> QUIC 传输协议包含流的复用和对每个流的流量控制，这两者与 HTTP/2 中实现的类似。通过在整个连接中提供流级别的可靠性和拥塞控制，比起 TCP 映射，**QUIC 更能提高 HTTP 的性能**。

### 为什么 HTTP/3 这么快？

#### 真正的多路复用

HTTP/3 真正的多路复用特性意味着堆栈上的任何地方都不会发生队头阻塞。当你从更远的地理位置请求资源时，丢包的可能性会高出很多，TCP 重新传输的需求也会提高。

#### 颠覆局面的 0-RTT

此外，HTTP/3 也支持 [0-RTT](https://link.juejin.cn?target=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc9001.html%23section-4.6-1) QUIC 连接，减少了建立安全 TLS 连接的数据往返次数。

> QUIC 中的 0-RTT 功能能让客户端在三次握手完成之前发送应用数据。这个功能通过重用先前连接的参数实现。0-RTT 依赖于客户端记住的重要参数，并向服务器提供 TLS 会话票证（session ticket）以恢复相同的信息。

然而，你不应该盲目地启用 0-RTT。基于你的威胁模型，它[可能](https://link.juejin.cn?target=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc8446%23section-2.3)[存在一些安全问题](https://link.juejin.cn?target=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc9001.html%23name-replay-attacks-with-0-rtt)。

> 0-RTT 数据的安全属性弱于其他类型的 TLS 数据。具体来说：
>
> 1. 数据不是前向保密（forward secret）的；数据仅仅只被预共享密钥（pre-shared key，PSK）衍生的密钥加密。
> 2. 不能保证连接之间不重放（译者注：详情见[重放攻击](https://link.juejin.cn?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%E9%87%8D%E6%94%BE%E6%94%BB%E5%87%BB%2F2229240)）。

