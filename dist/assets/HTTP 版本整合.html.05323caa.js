import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as s,a as e,b as t,d as a,e as r,r as d}from"./app.d7b34baa.js";const l={},c=r(`<h1 id="http-版本整合" tabindex="-1"><a class="header-anchor" href="#http-版本整合" aria-hidden="true">#</a> HTTP 版本整合</h1><h2 id="http-1-0" tabindex="-1"><a class="header-anchor" href="#http-1-0" aria-hidden="true">#</a> HTTP 1.0</h2><p>随着互联网技术的飞速发展，HTTP协议被使用的越来越广泛，协议本身的局限性已经不能满足互联网功能的多样性。因此，<code>1996年5月HTTP/1.0诞生</code>，其内容和功能都大大增加了。对比与HTTP/0.9，新的版本包含了以下功能：</p><ul><li>在每个request的GET一行后面添加版本号</li><li>在response第一行中添加状态行</li><li>在request和response中添加header的概念</li><li>在header中添加content-type以此可以传输html之外类型的文件</li><li>在header中添加content-encoding来支持不同编码格式文件的传输</li><li>引入了POST和HEAD命令</li><li>支持长连接（默认短连接）</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /index.html HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/html；charset=utf-8 // 类型，编码。
&lt;HTML&gt;
A page with an image
  &lt;IMG src=&quot;/image.gif&quot;&gt;
&lt;HTML&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="content" tabindex="-1"><a class="header-anchor" href="#content" aria-hidden="true">#</a> content</h3><p>简单的文字页面自然无法满足用户的需求，于是1.0加入了更多的文件类型</p><table><thead><tr><th>常见Content-Type</th><th></th><th></th></tr></thead><tbody><tr><td>text/plan</td><td>text/html</td><td>text/css</td></tr><tr><td>image/jpeg</td><td>image/png</td><td>image/svg + xml</td></tr><tr><td>application/javascript</td><td>application/zip</td><td>application/pdf</td></tr></tbody></table><p>也同样可以用在html中</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>meta http<span class="token operator">-</span>equiv<span class="token operator">=</span><span class="token string">&quot;Content-Type&quot;</span> content<span class="token operator">=</span><span class="token string">&quot;text/html; charset=UTF-8&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="content-encoding" tabindex="-1"><a class="header-anchor" href="#content-encoding" aria-hidden="true">#</a> Content-encoding</h3><p>由于支持任意数据格式的发送，因此可以先把数据进行压缩再发送。HTTP/1.0进入了Content-Encoding来表示数据的压缩方式。</p>`,12),h={href:"https://link.juejin.cn?target=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLZ77_and_LZ78%23LZ77",target:"_blank",rel:"noopener noreferrer"},p={href:"https://link.juejin.cn?target=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLZW",target:"_blank",rel:"noopener noreferrer"},T={href:"https://link.juejin.cn?target=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FZlib",target:"_blank",rel:"noopener noreferrer"},u=r(`<p>客户端发送请求带有表明我可以接受<code>gzip</code>、<code>deflate</code>两种压缩方式</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Accept-Encoding: gzip, deflate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>服务器在 <code>Content-Encoding</code> 响应首部提供了实际采用的压缩模式</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Content<span class="token operator">-</span>Encoding<span class="token operator">:</span> gzip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="http-1-1" tabindex="-1"><a class="header-anchor" href="#http-1-1" aria-hidden="true">#</a> HTTP 1.1</h2><p>仅仅在HTTP/1.0公布后的几个月，HTTP/1.1发布了，到目前为止<code>HTTP1.1协议都是作为主流的版本</code>，以至于随后的近10年时间里都没有新的HTTP协议版本发布。</p><p>对比之前的版本，其主要更新如下：⭐</p>`,7),g=e("li",null,"可以重复使用连接（keep-alive），从而节省时间，不再需要多次打开才能显示嵌入在单个原始文档中的资源",-1),P=e("li",null,"添加了Pipeline，这允许在第一个请求的答案完全传输之前发送第二个请求这降低了通信的延迟",-1),b=e("li",null,"chunked机制，分块响应",-1),m=e("li",null,"引入了额外的缓存控制机制",-1),H=e("li",null,"引入了内容协商，包括语言、编码和类型，客户端和服务器现在可以就交换哪些内容达成一致",-1),v={href:"https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FHTTP%2FHeaders%2FHost",target:"_blank",rel:"noopener noreferrer"},_=e("code",null,"Host",-1),f=r(`<h3 id="keep-alive" tabindex="-1"><a class="header-anchor" href="#keep-alive" aria-hidden="true">#</a> keep-alive</h3><p>由于建立一个连接的过程需要DNS解析过程以及TCP的三次握手，但在同服务器获取资源不断的建立和断开链接需要消耗的资源和时间是巨大的，为了提升连接的效率。 HTTP/1.1的及时出现将长连接加入了标准并作为默认实现，服务器端也按照协议保持客户端的长连接状态，<code>一个服务端上的多个资源都可以通过这一条连接多个request来获取</code>。</p><p>可以在request header中引入如下信息来告知服务器完成一次request请求后不要关闭连接。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">Connection</span><span class="token operator">:</span> keep<span class="token operator">-</span>alive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>服务器端也会答复一个相同的信息表示连接仍然有效，但是在当时这只是属于程序员的自定义行为，在1.0中没有被纳入标准， 这其中的提升对于通讯之间的效率提升几乎是倍增的，</p><p>这也为管线化方式（pipelining）打下基础。</p><h3 id="pipeline-管线化" tabindex="-1"><a class="header-anchor" href="#pipeline-管线化" aria-hidden="true">#</a> Pipeline （管线化）</h3><p>HTTP/1.1尝试通过HTTP管线化技术来解决性能瓶颈，诞生了pipeline机制，如图从每次response返回结果才能进行下一次request，变为<code>一次连接上多个http request不需要等待response就可以连续发送</code>的技术。</p><p><img src="https://cdn.yihuiblog.top/images/202207101514360.png" alt="image-20220710151407273"></p><blockquote><p>不幸的是因为HTTP是一个无状态的协议，一个体积很大的或慢response仍然会阻塞后面所有的<strong>请求发送</strong>，每条request无法知道哪条response是返回给他的，服务端只能根据顺序来返回response，这就是<code>队头阻塞</code>，这导致主流浏览器上默认下该功能都是关闭状态，在http2.0中会解决这个问题</p></blockquote><h3 id="host头域" tabindex="-1"><a class="header-anchor" href="#host头域" aria-hidden="true">#</a> host头域</h3><p>在 <code>HTTP1.0</code> 中认为每台服务器都绑定一个唯一的 <code>IP</code> 地址，因此，请求消息中的 <code>URL</code> 并没有传递主机名（<code>hostname</code>）,1.1中新增的host用来处理一个 <code>IP</code> 地址上面多个虚拟主机的情况。</p><p>在请求头域中新增了Host字段，其用来指定服务器的域名。有了Host字段，在同一台服务器上就可以搭建不同的网站了，这也为后来虚拟化的发展建好啦地基。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Host: www.alibaba-inc.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="cache机制" tabindex="-1"><a class="header-anchor" href="#cache机制" aria-hidden="true">#</a> cache机制</h3><p>Cache不仅可以提高用户的访问速率，在移动端设备上还可以为用户极大节省流量。因此，在HTTP/1.1中新增了很多与Cache相关的头域并围绕这些头域设计了更灵活、更丰富的Cache机制。</p><p>Cache机制需要解决的问题包括：</p><ol><li>判断哪些资源可以被Cache及访问访问策略</li><li>在本地判断Cache资源是否已经过期</li><li>向服务端发起问询，查看已过期的Cache资源是否在服务端发生了变化</li></ol><h3 id="chunked机制" tabindex="-1"><a class="header-anchor" href="#chunked机制" aria-hidden="true">#</a> chunked机制</h3><p>建立好链接之后客户端可以使用该链接发送多个请求，用户通常会通过response header中返回的<code>Content-Length</code>来判断服务端返回数据的大小。但随着网络技术的不断发展，越来越多的动态资源被引入进来，这时候服务端就无法在传输之前知道待传递资源的大小，也就无法通过Content-Length来告知用户资源大小。服务器可以一边动态产生资源，一边传递给用户，这种机制称为“分块传输编码”（Chunkded Transfer Encoding），<strong>允许服务端发送给客户端的数据分为多个部分</strong>，此时服务器端需要在header中添加“<strong>Transfer-Encoding: chunked</strong>”头域来替代传统的“Content-Length。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Transfer<span class="token operator">-</span>Encoding<span class="token operator">:</span> chunked
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="http-缓存机制" tabindex="-1"><a class="header-anchor" href="#http-缓存机制" aria-hidden="true">#</a> HTTP 缓存机制</h3><p>见文章 []</p><h3 id="新增了五种请求方法" tabindex="-1"><a class="header-anchor" href="#新增了五种请求方法" aria-hidden="true">#</a> 新增了五种请求方法</h3><p><strong>OPTIONS</strong>： 浏览器为确定跨域请求资源的安全做的预请求</p><p><strong>PUT</strong>：从客户端向服务器传送的数据取代指定的文档的内容</p><p><strong>DELETE</strong> ：请求服务器删除指定的页面</p><p><strong>TRACE</strong>： 回显服务器收到的请求，主要用于测试或诊断</p><p><strong>CONNECT</strong>： HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器</p><h3 id="新增一系列的状态码" tabindex="-1"><a class="header-anchor" href="#新增一系列的状态码" aria-hidden="true">#</a> 新增一系列的状态码</h3>`,30),k={href:"https://link.juejin.cn?target=https%3A%2F%2Fcloud.tencent.com%2Fdeveloper%2Farticle%2F1752690",target:"_blank",rel:"noopener noreferrer"},x=r('<h3 id="http1-1缺陷" tabindex="-1"><a class="header-anchor" href="#http1-1缺陷" aria-hidden="true">#</a> Http1.1缺陷</h3><ol><li>高延迟，带来页面加载速度的降低，（网络延迟问题只要由于队头阻塞，导致宽带无法被充分利用）</li><li>无状态特性，带来巨大的Http头部</li><li>明文传输，不安全</li><li>不支持服务器推送消息</li></ol><h2 id="http-2" tabindex="-1"><a class="header-anchor" href="#http-2" aria-hidden="true">#</a> HTTP 2</h2><p>由于 HTTPS 在安全方面已经做的非常好了，HTTP 改进的关注点放在了性能方面。对于 HTTP/2 而言，它对于性能的提升主要在于两点:</p><ul><li><strong>头部压缩</strong></li><li><strong>多路复用</strong></li></ul><p>当然还有一些颠覆性的功能实现:</p><ul><li><strong>设置请求优先级</strong></li><li><strong>服务器推送</strong></li></ul><p>这些重大的提升本质上也是为了解决 HTTP 本身的问题而产生的。接下来我们来看看 HTTP/2 解决了哪些问题，以及解决方式具体是如何的。</p><p>在 HTTP/1.1 及之前的时代，<strong>请求体</strong>一般会有响应的压缩编码过程，通过<code>Content-Encoding</code>头部字段来指定，但你有没有想过头部字段本身的压缩呢？当请求字段非常复杂的时候，尤其对于 GET 请求，请求报文几乎全是请求头，这个时候还是存在非常大的优化空间的。HTTP/2 针对头部字段，也采用了对应的压缩算法——HPACK，对请求头进行压缩。</p><p>HPACK 算法是专门为 HTTP/2 服务的，它主要的亮点有两个：</p><ul><li>首先是在服务器和客户端之间建立哈希表，将用到的字段存放在这张表中，那么在传输的时候对于之前出现过的值，只需要把<strong>索引</strong>(比如0，1，2，...)传给对方即可，对方拿到索引查表就行了。这种<strong>传索引</strong>的方式，可以说让请求头字段得到极大程度的精简和复用。</li></ul><p><img src="https://cdn.yihuiblog.top/images/202207101452200.png" alt="image-20220710145236084"></p><blockquote><p>HTTP/2 当中废除了起始行的概念，将起始行中的请求方法、URI、状态码转换成了头字段，不过这些字段都有一个&quot;:&quot;前缀，用来和其它请求头区分开。</p></blockquote><ul><li>其次是对于整数和字符串进行<strong>哈夫曼编码</strong>，哈夫曼编码的原理就是先将所有出现的字符建立一张索引表，然后让出现次数多的字符对应的索引尽可能短，传输的时候也是传输这样的<strong>索引序列</strong>，可以达到非常高的压缩率。</li></ul><h3 id="多路复用" tabindex="-1"><a class="header-anchor" href="#多路复用" aria-hidden="true">#</a> 多路复用</h3><h4 id="http-队头阻塞" tabindex="-1"><a class="header-anchor" href="#http-队头阻塞" aria-hidden="true">#</a> HTTP 队头阻塞</h4><p>我们之前讨论了 HTTP 队头阻塞的问题，其根本原因在于HTTP 基于<code>请求-响应</code>的模型，在同一个 TCP 长连接中，前面的请求没有得到响应，后面的请求就会被阻塞。</p><p>后面我们又讨论到用<strong>并发连接</strong>和<strong>域名分片</strong>的方式来解决这个问题，但这并没有真正从 HTTP 本身的层面解决问题，只是增加了 TCP 连接，分摊风险而已。而且这么做也有弊端，多条 TCP 连接会竞争<strong>有限的带宽</strong>，让真正优先级高的请求不能优先处理。</p><p>而 HTTP/2 便从 HTTP 协议本身解决了<code>队头阻塞</code>问题。注意，这里并不是指的<code>TCP队头阻塞</code>，而是<code>HTTP队头阻塞</code>，两者并不是一回事。<u>TCP 的队头阻塞是在<code>数据包</code>层面</u>，单位是<code>数据包</code>，前一个报文没有收到便不会将后面收到的报文上传给 HTTP，<u>而HTTP 的队头阻塞是在 <code>HTTP 请求-响应</code>层面</u>，前一个请求没处理完，后面的请求就要阻塞住。两者所在的层次不一样。</p><p>那么 HTTP/2 如何来解决所谓的队头阻塞呢？</p><h4 id="二进制分帧" tabindex="-1"><a class="header-anchor" href="#二进制分帧" aria-hidden="true">#</a> 二进制分帧</h4><p>首先，HTTP/2 认为明文传输对机器而言太麻烦了，不方便计算机的解析，因为对于文本而言会有多义性的字符，比如回车换行到底是内容还是分隔符，在内部需要用到状态机去识别，效率比较低。于是 HTTP/2 干脆把报文全部换成二进制格式，全部传输<code>01</code>串，方便了机器的解析。</p><p>原来<code>Headers + Body</code>的报文格式如今被拆分成了一个个二进制的帧，用<strong>Headers帧</strong>存放头部字段，<strong>Data帧</strong>存放请求体数据。分帧之后，服务器看到的不再是一个个完整的 HTTP 请求报文，而是一堆乱序的二进制帧。这些二进制帧不存在先后关系，因此也就不会排队等待，也就没有了 HTTP 的队头阻塞问题。</p><p>通信双方都可以给对方发送二进制帧，这种二进制帧的<strong>双向传输的序列</strong>，也叫做<code>流</code>(Stream)。HTTP/2 用<code>流</code>来在一个 TCP 连接上来进行多个数据帧的通信，这就是<strong>多路复用</strong>的概念。</p><p>可能你会有一个疑问，既然是乱序首发，那最后如何来处理这些乱序的数据帧呢？</p><p>首先要声明的是，所谓的乱序，指的是不同 ID 的 Stream 是乱序的，但同一个 Stream ID 的帧一定是按顺序传输的。二进制帧到达后对方会将 Stream ID 相同的二进制帧组装成完整的<strong>请求报文</strong>和<strong>响应报文</strong>。当然，在二进制帧当中还有其他的一些字段，实现了<strong>优先级</strong>和<strong>流量控制</strong>等功能，我们放到下一节再来介绍。</p><h3 id="服务器推送" tabindex="-1"><a class="header-anchor" href="#服务器推送" aria-hidden="true">#</a> 服务器推送</h3><p>另外值得一说的是 HTTP/2 的服务器推送(Server Push)。在 HTTP/2 当中，服务器已经不再是完全被动地接收请求，响应请求，它也能新建 stream 来给客户端发送消息，当 TCP 连接建立之后，比如浏览器请求一个 HTML 文件，服务器就可以在返回 HTML 的基础上，将 HTML 中引用到的其他资源文件一起返回给客户端，减少客户端的等待。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>当然，HTTP/2 新增那么多的特性，是不是 HTTP 的语法要重新学呢？不需要，HTTP/2 完全兼容之前 HTTP 的语法和语义，如<strong>请求头、URI、状态码、头部字段</strong>都没有改变，完全不用担心。同时，在安全方面，HTTP 也支持 TLS，并且现在主流的浏览器都公开只支持加密的 HTTP/2, 因此你现在能看到的 HTTP/2 也基本上都是跑在 TLS 上面的了。最后放一张分层图给大家参考:</p><p><img src="https://cdn.yihuiblog.top/images/202207101456278.png" alt="image-20220710145611195"></p><h2 id="http-3" tabindex="-1"><a class="header-anchor" href="#http-3" aria-hidden="true">#</a> HTTP 3</h2><h3 id="quic-和-http-3-中真正的多路复用" tabindex="-1"><a class="header-anchor" href="#quic-和-http-3-中真正的多路复用" aria-hidden="true">#</a> QUIC 和 HTTP/3 中真正的多路复用</h3>',33),C={href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc9000.html",target:"_blank",rel:"noopener noreferrer"},F={href:"https://link.juejin.cn?target=https%3A%2F%2Fquicwg.org%2Fbase-drafts%2Fdraft-ietf-quic-http.html%23name-delegation-to-quic",target:"_blank",rel:"noopener noreferrer"},j=r('<blockquote><p>QUIC 传输协议包含流的复用和对每个流的流量控制，这两者与 HTTP/2 中实现的类似。通过在整个连接中提供流级别的可靠性和拥塞控制，比起 TCP 映射，<strong>QUIC 更能提高 HTTP 的性能</strong>。</p></blockquote><h3 id="为什么-http-3-这么快" tabindex="-1"><a class="header-anchor" href="#为什么-http-3-这么快" aria-hidden="true">#</a> 为什么 HTTP/3 这么快？</h3><h4 id="真正的多路复用" tabindex="-1"><a class="header-anchor" href="#真正的多路复用" aria-hidden="true">#</a> 真正的多路复用</h4><p>HTTP/3 真正的多路复用特性意味着堆栈上的任何地方都不会发生队头阻塞。当你从更远的地理位置请求资源时，丢包的可能性会高出很多，TCP 重新传输的需求也会提高。</p><h4 id="颠覆局面的-0-rtt" tabindex="-1"><a class="header-anchor" href="#颠覆局面的-0-rtt" aria-hidden="true">#</a> 颠覆局面的 0-RTT</h4>',5),q={href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc9001.html%23section-4.6-1",target:"_blank",rel:"noopener noreferrer"},w=e("blockquote",null,[e("p",null,"QUIC 中的 0-RTT 功能能让客户端在三次握手完成之前发送应用数据。这个功能通过重用先前连接的参数实现。0-RTT 依赖于客户端记住的重要参数，并向服务器提供 TLS 会话票证（session ticket）以恢复相同的信息。")],-1),E={href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc8446%23section-2.3",target:"_blank",rel:"noopener noreferrer"},L={href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc9001.html%23name-replay-attacks-with-0-rtt",target:"_blank",rel:"noopener noreferrer"},A=e("p",null,"0-RTT 数据的安全属性弱于其他类型的 TLS 数据。具体来说：",-1),I=e("li",null,"数据不是前向保密（forward secret）的；数据仅仅只被预共享密钥（pre-shared key，PSK）衍生的密钥加密。",-1),S={href:"https://link.juejin.cn?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%E9%87%8D%E6%94%BE%E6%94%BB%E5%87%BB%2F2229240",target:"_blank",rel:"noopener noreferrer"};function U(y,R){const n=d("ExternalLinkIcon");return o(),s("div",null,[c,e("ul",null,[e("li",null,[t("Content-Encoding: gzip。【表示采用 "),e("a",h,[t("Lempel-Ziv coding"),a(n)]),t(" (LZ77) 压缩算法，以及32位CRC校验的编码方式】")]),e("li",null,[t("Content-Encoding: compress。【采用 "),e("a",p,[t("Lempel-Ziv-Welch"),a(n)]),t(" (LZW) 压缩算法】")]),e("li",null,[t("Content-Encoding: deflate。【采用 "),e("a",T,[t("zlib"),a(n)]),t(" 】")])]),u,e("ul",null,[g,P,b,m,H,e("li",null,[t("由于"),e("a",v,[_,a(n)]),t("标头，从同一 IP 地址托管不同域的能力允许服务器搭配")])]),f,e("p",null,[t("可以参考"),e("a",k,[t("状态码大全"),a(n)])]),x,e("p",null,[t("现在说到 HTTP/3。HTTP/2 和 HTTP/3 的主要区别在于所使用的传输协议。与之前的 TCP 协议不同，HTTP/3 使用了一个全新的协议 —— "),e("a",C,[t("QUIC"),a(n)]),t("。QUIC 是一个通用的传输协议，解决了 HTTP/2 因为 TCP 而产生的队头阻塞问题（HTTP2 只解决了HTTP应用层请求-响应的队头阻塞问题）。"),e("u",null,[t("这个协议能让你通过 UDP 创建"),e("a",F,[t("一系列带状态的流"),a(n)]),t("（这与 TCP 很相似）。")])]),j,e("p",null,[t("此外，HTTP/3 也支持 "),e("a",q,[t("0-RTT"),a(n)]),t(" QUIC 连接，减少了建立安全 TLS 连接的数据往返次数。")]),w,e("p",null,[t("然而，你不应该盲目地启用 0-RTT。基于你的威胁模型，它"),e("a",E,[t("可能"),a(n)]),e("a",L,[t("存在一些安全问题"),a(n)]),t("。")]),e("blockquote",null,[A,e("ol",null,[I,e("li",null,[t("不能保证连接之间不重放（译者注：详情见"),e("a",S,[t("重放攻击"),a(n)]),t("）。")])])])])}const B=i(l,[["render",U],["__file","HTTP 版本整合.html.vue"]]);export{B as default};
