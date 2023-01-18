import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as d,e as t}from"./app.d7b34baa.js";const c={},l=t(`<h1 id="计算机网络面试题" tabindex="-1"><a class="header-anchor" href="#计算机网络面试题" aria-hidden="true">#</a> 计算机网络面试题</h1><blockquote><p>参照：</p><p>https://yihuiblog.top/browser-working/L2.html</p><p>https://mp.weixin.qq.com/s/-IOy2hXd-AcuIQ02saf6Rw</p><p>https://www.cnblogs.com/yaochunhui/p/14175396.html</p><p>https://blog.csdn.net/weixin_39829073/article/details/112907168</p></blockquote><h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识" aria-hidden="true">#</a> 基础知识</h2><h3 id="_1-osi与tcp-ip-模型" tabindex="-1"><a class="header-anchor" href="#_1-osi与tcp-ip-模型" aria-hidden="true">#</a> 1. OSI与TCP/IP 模型</h3><p>OSI七层：物理层、数据链路层、网络层、传输层、会话层、表示层、应用层</p><p>TCP/IP五层：物理层、数据链路层、网络层、传输层、应用层</p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111230156.jpeg" alt="图片"></p><p>七层网络体系结构各层的主要功能：</p><ul><li><p>应用层：为应用程序提供交互服务。在互联网中的应用层协议很多，如域名系统<code>DNS</code>， 支持万维网应用的<code>HTTP</code>协议，支持电子邮件的<code>SMTP</code>协议等。</p></li><li><p>表示层：主要负责数据格式的转换，如加密解密、转换翻译、压缩解压缩等。</p></li><li><p>会话层：负责在网络中的两节点之间建立、维持和终止通信，如服务器验证用户登录便是由会话层完成的。</p></li><li><p>运输层：有时也译为传输层，向主机进程提供通用的数据传输服务。该层主要有以下两种协议:</p></li><li><ul><li><code>TCP</code>：提供面向连接的、可靠的数据传输服务;</li><li><code>UDP</code>：提供无连接的、尽最大努力的数据传输服务，但不保证数据传输的可靠性。</li></ul></li><li><p>网络层：选择合适的路由和交换结点，确保数据及时传送。主要包括<code>IP</code>协议。</p></li><li><p>数据链路层：数据链路层通常简称为链路层。将网络层传下来的<code>IP</code>数据包组装成帧，并再相邻节点的链路上传送帧。</p></li><li><p>物理层：实现相邻节点间比特流的透明传输，尽可能屏蔽传输介质和通信手段的差异。</p></li></ul><h3 id="_2-常见网络服务分层" tabindex="-1"><a class="header-anchor" href="#_2-常见网络服务分层" aria-hidden="true">#</a> 2. 常见网络服务分层</h3><p>应用层：<code>HTTP</code>、<code>DNS</code>、<code>FTP</code>、<code>SMTP</code></p><p>传输层：<code>TCP </code>、<code>UDP</code></p><p>网络层：<code>IP</code>、<code>ICMP </code>、路由器、防火墙</p><p>数据链路层：网卡、网桥、交换机</p><p>物理层：中继器、集线器</p><h3 id="_3-tcp三次握手" tabindex="-1"><a class="header-anchor" href="#_3-tcp三次握手" aria-hidden="true">#</a> 3. TCP三次握手</h3><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111232193.jpeg" alt="图片" style="zoom:80%;"><p><strong>三次握手过程：</strong></p><ol><li>客户端——发送带有<code>SYN</code>标志的数据包——服务端 <strong>一次握手</strong> 客户端进入<code>syn_sent</code>状态</li><li>服务端——发送带有<code>SYN/ACK</code>标志的数据包——客户端 <strong>二次握手</strong> 服务端进入<code>syn_rcvd</code></li><li>客户端——发送带有<code>ACK</code>标志的数据包——服务端 <strong>三次握手</strong> 连接就进入<code>Established</code>状态</li></ol><p><strong>为什么三次：</strong> 主要是为了建立可靠的通信信道，保证客户端与服务端同时具备发送、接收数据的能力。</p><p><strong>为什么两次不行？</strong></p><ol><li>防止已失效的请求报文又传送到了服务端，建立了多余的链接，浪费资源。</li><li><strong>两次握手只能保证单向连接是畅通的。</strong>（为了实现可靠数据传输， <code>TCP </code>协议的通信双方， 都必须维护一个序列号， 以标识发送出去的数据包中， 哪些是已经被对方收到的。三次握手的过程即是通信双方 相互告知序列号起始值， 并确认对方已经收到了序列号起始值的必经步骤；如果只是两次握手， 至多只有连接发起方的起始序列号能被确认， 另一方选择的序列号则得不到确认）。</li></ol><h3 id="_4-四次挥手过程" tabindex="-1"><a class="header-anchor" href="#_4-四次挥手过程" aria-hidden="true">#</a> 4. 四次挥手过程：</h3><ol><li>客户端——发送带有<code>FIN</code>标志的数据包——服务端，关闭与服务端的连接 ，客户端进入<code>FIN-WAIT-1</code>状态</li><li>服务端收到这个 <code>FIN</code>，它发回⼀ 个 <code>ACK</code>，确认序号为收到的序号加<code>1</code>，服务端就进入了<code>CLOSE-WAIT</code>状态</li><li>服务端——发送⼀个<code>FIN</code>数据包——客户端，关闭与客户端的连接，客户端就进入<code>FIN-WAIT-2</code>状态</li><li>客户端收到这个 <code>FIN</code>，发回 <code>ACK </code>报⽂确认，并将确认序号设置为收到序号加<code>1</code>，客户端进入<code>TIME-WAIT</code>状态</li></ol><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111232185.jpeg" alt="图片" style="zoom:80%;"><p>**为什么四次：**因为需要确保客户端与服务端的数据能够完成传输。</p><p><strong>CLOSE-WAIT：</strong> 这种状态的含义其实是表示在<strong>等待关闭</strong>。</p><p><strong>TIME-WAIT：</strong> 为了解决网络的丢包和网络不稳定所带来的其他问题，确保连接方能在时间范围内，关闭自己的连接。</p><h3 id="_5-为什么连接的时候是三次握手-关闭的时候却是四次握手" tabindex="-1"><a class="header-anchor" href="#_5-为什么连接的时候是三次握手-关闭的时候却是四次握手" aria-hidden="true">#</a> 5. 为什么连接的时候是三次握手，关闭的时候却是四次握手?</h3><p>服务器在收到客户端的<code>FIN</code>报文段后，可能还有一些数据要传输，所以不能马上关闭连接，但是会做出应答，返回<code>ACK</code>报文段。</p><p>接下来可能会继续发送数据，在数据发送完后，服务器会向客户端发送<code>FIN</code>报文，表示数据已经发送完毕，请求关闭连接。服务器的<code>ACK</code>和<code>FIN</code>一般都会分开发送，从而导致多了一次，因此一共需要四次挥手。</p><h3 id="_6-如何查看time-wait状态的链接数量" tabindex="-1"><a class="header-anchor" href="#_6-如何查看time-wait状态的链接数量" aria-hidden="true">#</a> 6. 如何查看TIME-WAIT状态的链接数量？</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-an</span> <span class="token operator">|</span> <span class="token function">grep</span> TIME_WAIT <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>  //查看连接数等待time_wait状态连接数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-为什么会time-wait过多-解决方法是怎样的" tabindex="-1"><a class="header-anchor" href="#_7-为什么会time-wait过多-解决方法是怎样的" aria-hidden="true">#</a> 7. 为什么会TIME-WAIT过多？解决方法是怎样的？</h3><p>**可能原因：**高并发短连接的<code>TCP</code>服务器上，当服务器处理完请求后立刻按照主动正常关闭连接</p><p>**解决：**负载均衡服务器；Web服务器首先关闭来自负载均衡服务器的连接</p><h3 id="_8-半连接-洪泛攻击问题以及如何解决-syn-cookie" tabindex="-1"><a class="header-anchor" href="#_8-半连接-洪泛攻击问题以及如何解决-syn-cookie" aria-hidden="true">#</a> 8. 半连接，洪泛攻击问题以及如何解决（syn_cookie）</h3><p>在三次握手的过程中，服务器为了响应一个受到的<code>SYN</code>报文段，会分配并初始化连接变量和缓存，然后服务器发送一个<code>SYN/ACK</code>报文段进行响应，并等待客户端的<code>ACK</code>报文段。**如果客户不发送<code>ACK</code>来完成该三次握手的第三步，最终(通常在一分多钟之后)服务器将终止该半开连接并回收资源。这种<code>TCP</code>连接管理协议的特性就会有这样一个漏洞，攻击者发送大量的<code>TCP SYN</code>报文段，而不完成第三次握手的步骤。**随着这种<code>SYN</code>报文段的不断到来，服务器不断为这些半开连接分配资源，从而导致服务器连接资源被消耗殆尽。这种攻击就是<code>SYN</code>泛供攻击。</p><p>为了应对这种攻击，现在有一种<strong>有效的防御系统，称为SYN cookie</strong>。SYN cookie的工作方式如下：</p><ol><li>当服务器接收到一个<code>SYN</code>报文段时，它并不知道该报文段是来自一个合法的用户，还是这种SYN洪泛攻击的一部分。因为服务器不会为该报文段生成一个半开的连接。相反，服务器生成一个初始<code>TCP</code>序列号，该序列号是SYN报文段的源IP地址和目的IP地址，源端口号和目的端口号以及仅有服务器知道的秘密数的复杂函数(散列函数)。这种精心制作的初始序列号称为为“cookie”。服务器则发送具有这种特殊初始序号的<code>SYN/ACK</code>报文分组。服务器并不记忆该cookie或任何对应于SYN的其他状态信息。</li><li>如果该客户是合法的，则它将返回一个<code>ACK</code>报文段。当服务器收到该<code>ACK</code>报文段，需要验证该ACK是与前面发送的某个<code>SYN</code>相对应。由于服务器并不维护有关<code>SYN</code>报文段的记忆，所以服务器通过使用<code>SYN/ACK</code>报文段中的源和目的IP地址与端口号以及秘密数运行相同的散列函数。如果这个函数的结果(cookie值)加1和在客户的ACK报文段中的确认值相同的话，那么服务器就会认为该<code>ACK</code>对应于较早的<code>SYN</code>报文段，因此它是合法的。服务器则会生成一个套接字的全开连接。</li><li>另一方面，如果客户没有返回一个<code>ACK</code>报文段，说明之前的<code>SYN</code>报文段是洪泛攻击的一部分，但是它并没有对服务器产生危害，因为服务器没有为它分配任何资源。</li></ol><h3 id="_9-为什么客户端的time-wait状态必须等待2msl" tabindex="-1"><a class="header-anchor" href="#_9-为什么客户端的time-wait状态必须等待2msl" aria-hidden="true">#</a> 9. 为什么客户端的TIME-WAIT状态必须等待2MSL ?</h3><p>主要有两个原因:</p><ol><li>**为了保证客户端发送的最后一个ACK报文段能够达到服务器。**这个<code>ACK</code>报文段可能丢失，因而使处在<code>LAST-ACK</code>状态的服务器收不到确认。服务器会超时重传<code>FIN+ACK</code>报文段，客户端就能在2MSL时间内收到这个重传的<code>FIN+ACK</code>报文段，接着客户端重传一次确认，重启计时器。最好，客户端和服务器都正常进入到<code>CLOSED</code>状态。如果客户端在<code>TIME-WAIT</code>状态不等待一段时间，而是再发送完<code>ACK</code>报文后立即释放连接，那么就无法收到服务器重传的<code>FIN+ACK</code>报文段，因而也不会再发送一次确认报文。这样，服务器就无法按照正常步骤进入<code>CLOSED</code>状态。</li><li>**防止已失效的连接请求报文段出现在本连接中。**客户端在发送完最后一个<code>ACK</code>确认报文段后，再经过时间<code>2MSL</code>，就可以使本连接持续的时间内所产生的所有报文段都从网络中消失。这样就可以使下一个新的连接中不会出现这种旧的连接请求报文段。</li></ol><h3 id="_10-4g切换wifi会发生什么" tabindex="-1"><a class="header-anchor" href="#_10-4g切换wifi会发生什么" aria-hidden="true">#</a> 10. 4g切换wifi会发生什么</h3><p>当移动设备的网络从<code>4G</code>切换到<code>WiFi</code>时，意味着IP地址变化了，那么必须要断开连接，然后重新连接，而建立连接的过程包含TCP三次握手和TLS四次挥手的时延，以及TCP慢启动的减速过程，给用户的感觉就是突然网络卡顿了一下，所以说，迁移的成本是很高的。</p><p><strong>http3是怎么解决连接迁移</strong></p><p><code>HTTP3</code>中<code>QUIC</code>协议没有用四元组的方式来&quot;绑定”连接，而是<strong>通过连接ID来标记通信的两个端点</strong>，客户端和服务器可以各自选择一组ID来标记自己，因此即使移动设备的网络变化后，导致IP地址变化了，<strong>只要仍保有上下文信息(比如连接ID、TLS 密钥等)</strong>，就可以&quot;<strong>无缝&quot;地复用原连接</strong>，消除重连的成本，没有丝毫卡顿感，达到了<strong>连接迁移</strong>的功能。</p><h3 id="_11-tcp与udp区别及场景" tabindex="-1"><a class="header-anchor" href="#_11-tcp与udp区别及场景" aria-hidden="true">#</a> 11. TCP与UDP区别及场景</h3><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">特点</th><th style="text-align:left;">性能</th><th style="text-align:left;">应用过场景</th><th style="text-align:left;">首部字节</th></tr></thead><tbody><tr><td style="text-align:left;">TCP</td><td style="text-align:left;">面向连接、可靠、字节流</td><td style="text-align:left;">传输效率慢、所需资源多</td><td style="text-align:left;">文件、邮件传输</td><td style="text-align:left;">20-60</td></tr><tr><td style="text-align:left;">UDP</td><td style="text-align:left;">无连接、不可靠、数据报文段</td><td style="text-align:left;">传输效率快、所需资源少</td><td style="text-align:left;">语音、视频、直播</td><td style="text-align:left;">8个字节</td></tr></tbody></table><p><strong>基于TCP的协议：</strong><code>HTTP</code>、<code>FTP</code>、<code>SMTP</code></p><p><strong>基于UDP的协议：</strong> <code>RIP</code>、<code>DNS</code>、<code>SNMP</code></p><h3 id="_12-tcp滑动窗口-拥塞控制" tabindex="-1"><a class="header-anchor" href="#_12-tcp滑动窗口-拥塞控制" aria-hidden="true">#</a> 12. TCP滑动窗口，拥塞控制</h3><p>**TCP通过：**应用数据分割、对数据包进行编号、校验和、流量控制、拥塞控制、超时重传等措施保证数据的可靠传输。</p><p>**拥塞控制目的：**为了防止过多的数据注入到网络中，避免网络中的路由器、链路过载。</p><p>**拥塞控制过程：**TCP维护一个拥塞窗口，该窗口随着网络拥塞程度动态变化，通过慢开始、拥塞避免等算法减少网络拥塞的发生。</p><h3 id="_13-tcp粘包原因和解决方法" tabindex="-1"><a class="header-anchor" href="#_13-tcp粘包原因和解决方法" aria-hidden="true">#</a> 13. TCP粘包原因和解决方法</h3><p><strong>TCP粘包是指</strong>：发送方发送的若干包数据到接收方接收时粘成一包</p><p><strong>发送方原因：</strong></p><p>TCP默认使用Nagle算法（主要作用：减少网络中报文段的数量）：</p><p>收集多个小分组，在一个确认到来时一起发送、导致发送方可能会出现粘包问题</p><p><strong>接收方原因：</strong></p><p>TCP将接收到的数据包保存在接收缓存里，如果TCP接收数据包到缓存的速度大于应用程序从缓存中读取数据包的速度，多个包就会被缓存，应用程序就有可能读取到多个首尾相接粘到一起的包。</p><ul><li><p><strong>传输层的UDP协议不会发生粘包或者拆包问题</strong></p><p><code>UDP</code>是基于报文发送的，在<code>UDP</code>首部采用了16bit来指示<code>UDP</code>数据报文的长度，因此在应用层能很好的将不同的数据报文区分开，从而避免粘包和拆包的问题。</p></li><li><p><strong>传输层的TCP协议会发生粘包或者拆包问题</strong></p><p>原因有以下两点：</p></li><li><ol><li><code>TCP</code>是基于字节流的，虽然应用层和传输层之间的数据交互是大小不等的数据块，但是<code>TCP</code>把这些数据块仅仅看成一连串无结构的字节流，没有边界；</li><li>在<code>TCP</code>的首部没有表示数据长度的字段，基于上面两点，在使用<code>TCP</code>传输数据时，才有粘包或者拆包现象发生的可能。</li></ol></li></ul><p>**解决粘包问题：**解决问题的关键在于如何给每个数据包添加边界信息</p><p>最本质原因在与接收对等方无法分辨消息与消息之间的边界在哪，通过使用某种方案给出边界，例如：</p><ul><li>发送定长包。每个消息的大小都是一样的，接收方只要累计接收数据，直到数据等于一个定长的数值就将它作为一个消息。</li><li>包尾加上\\r\\n标记。<code>FTP</code>协议正是这么做的。但问题在于如果数据正文中也含有\\r\\n，则会误判为消息的边界。</li><li>包头加上包体长度。包头是定长的4个字节，说明了包体的长度。接收对等方先接收包体长度，依据包体长度来接收包体。</li></ul><h3 id="_14-tcp、udp报文格式" tabindex="-1"><a class="header-anchor" href="#_14-tcp、udp报文格式" aria-hidden="true">#</a> 14. TCP、UDP报文格式</h3><p><strong>TCP报文格式：</strong></p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111514362.jpeg" alt="图片"></p><p><strong>源端口号和目的端口号</strong>：</p><p>用于寻找发端和收端应用进程。这两个值加上<code>IP</code>首部源端IP地址和目的端<code>IP</code>地址唯一确定一个<code>TCP</code>连接。</p><p><strong>序号字段：</strong></p><p>序号用来标识从<code>TCP</code>发端向<code>TCP</code>收端发送的数据字节流，它表示在这个报文段中的的第一个数据字节。如果将字节流看作在两个应用程序间的单向流动，则 <code>TCP</code>用序号对每个字节进行计数。序号是32 bit的无符号数，序号到达 2^32-1后又从0开始。</p><p>当建立一个新的连接时，<code>SYN</code>标志变1。序号字段包含由这个主机选择的该连接的初始序号ISN（Initial Sequence Number）。该主机要发送数据的第一个字节序号为这个ISN加1，因为<code>SYN</code>标志消耗了一个序号</p><p><strong>确认序号</strong>：</p><p>既然每个传输的字节都被计数，确认序号包含发送确认的一端所期望收到的下一个序号。因此，确认序号应当是上次已成功收到数据字节序号加 1。只有<code>ACK</code>标志为 1时确认序号字段才有效。发送<code>ACK</code>无需任何代价，因为 32 bit的确认序号字段和A C K标志一样，总是TCP首部的一部分。因此，我们看到一旦一个连接建立起来，这个字段总是被设置， ACK标志也总是被设置为1。TCP为应用层提供全双工服务。这意味数据能在两个方向上独立地进行传输。因此，连接的每一端必须保持每个方向上的传输数据序号。</p><p><strong>首都长度</strong>：</p><p>首部长度给出首部中 32 bit字的数目。需要这个值是因为任选字段的长度是可变的。这个字段占4 bit，因此TCP最多有6 0字节的首部。然而，没有任选字段，正常的长度是 20字节。</p><p><strong>标志字段</strong>：在<code>TCP</code>首部中有 6个标志比特，它们中的多个可同时被设置为1。</p><ul><li><code>URG</code>紧急指针（u rgent pointer）有效</li><li><code>ACK</code>确认序号有效。</li><li><code>PSH</code>接收方应该尽快将这个报文段交给应用层。</li><li><code>RST</code>重建连接。</li><li><code>SYN</code>同步序号用来发起一个连接。这个标志和下一个标志将在第 1 8章介绍。</li><li><code>FIN</code>发端完成发送任务。</li></ul><p><strong>窗口大小</strong>：</p><p><code>TCP</code>的流量控制由连接的每一端通过声明的窗口大小来提供。窗口大小为字节数，起始于确认序号字段指明的值，这个值是接收端期望接收的字节。窗口大小是一个 16 bit字段，因而窗口大小最大为 65535字节。</p><p><strong>检验和：</strong></p><p>检验和覆盖了整个的 <code>TCP</code>报文段：<code>TCP</code>首部和<code>TCP</code>数据。这是一个强制性的字段，一定是由发端计算和存储，并由收端进行验证。</p><p><strong>紧急指针</strong>：</p><p>只有当<code>URG</code>标志置1时紧急指针才有效。紧急指针是一个正的偏移量，和序号字段中的值相加表示紧急数据最后一个字节的序号。<code>TCP</code>的紧急方式是发送端向另一端发送紧急数据的一种方式。</p><p><strong>选项</strong>：</p><p>最常见的可选字段是最长报文大小，又称为 <code>MSS </code>(Maximum Segment Size)。每个连接方通常都在通信的第一个报文段（为建立连接而设置 <code>SYN</code>标志的那个段）中指明这个选项。它指明本端所能接收的最大长度的报文段。</p><p><strong>UDP报文格式：</strong></p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111514354.jpeg" alt="图片"></p><p><strong>端口号</strong>：</p><p>用来表示发送和接受进程。由于 <code>IP</code>层已经把I P数据报分配给<code>TCP</code>或 <code>UDP</code>（根据I P首部中协议字段值），因此<code>TCP</code>端口号由<code>TCP</code>来查看，而 <code>UDP</code>端口号由 <code>UDP</code>来查看。<code>TCP</code>端口号与 <code>UDP</code>端口号是相互独立的。</p><p><strong>长度</strong>：</p><p><code>UDP</code>长度字段指的是 <code>UDP</code>首部和 <code>UDP</code>数据的字节长度。该字段的最小值为 8字节（发送一份0字节的 <code>UDP</code>数据报是 O K）。</p><p><strong>检验和</strong>：</p><p><code>UDP</code>检验和是一个端到端的检验和。它由发送端计算，然后由接收端验证。其目的是为了发现 <code>UDP</code>首部和数据在发送端到接收端之间发生的任何改动。</p><p>**IP报文格式：**普通的IP首部长为20个字节，除非含有可选项字段。</p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111514369.jpeg" alt="图片"></p><p><strong>4位版本</strong>：目前协议版本号是4，因此IP有时也称作IPV4.</p><p><strong>4位首部长度</strong>：</p><p>首部长度指的是首部占<code>32bit</code>字的数目，包括任何选项。由于它是一个4比特字段，因此首部长度最长为60个字节。</p><p><strong>服务类型（TOS）</strong>：</p><p>服务类型字段包括一个<code>3bit</code>的优先权字段（现在已经被忽略），<code>4bit</code>的TOS子字段和1bit未用位必须置0。<code>4bit</code>的TOS分别代表：最小时延，最大吞吐量，最高可靠性和最小费用。4bit中只能置其中1比特。如果所有4bit均为0，那么就意味着是一般服务。</p><p><strong>总长度</strong>：</p><p>总长度字段是指整个IP数据报的长度，以字节为单位。利用首部长度和总长度字段，就可以知道IP数据报中数据内容的起始位置和长度。由于该字段长<code>16bit</code>，所以IP数据报最长可达65535字节。当数据报被分片时，该字段的值也随着变化。</p><p><strong>标识字段</strong>：</p><p>标识字段唯一地标识主机发送的每一份数据报。通常每发送一份报文它的值就会加1。</p><p><strong>生存时间</strong>：</p><p>TTL（time-to-live）生存时间字段设置了数据报可以经过的最多路由器数。它指定了数据报的生存时间。TTL的初始值由源主机设置（通常为 3 2或6 4），一旦经过一个处理它的路由器，它的值就减去 1。当该字段的值为 0时，数据报就被丢弃，并发送 <code>ICMP </code>报文通知源主机。</p><p><strong>首部检验和</strong>：</p><p>首部检验和字段是根据 I P首部计算的检验和码。它不对首部后面的数据进行计算。<code>ICMP</code>、<code>IGMP</code>、<code>UDP</code>和<code>TCP</code>在它们各自的首部中均含有同时覆盖首部和数据检验和码。</p><p><strong>以太网报文格式：</strong></p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111514395.jpeg" alt="图片"></p><p><strong>目的地址和源地址：</strong> 是指网卡的硬件地址（也叫MAC 地址），长度是48 位，是在网卡出厂时固化的。</p><p><strong>数据：</strong></p><p>以太网帧中的数据长度规定最小46 字节，最大1500 字节，<code>ARP </code>和<code>RARP </code>数据包的长度不够46 字节，要在后面补填充位。最大值1500 称为以太网的最大传输单元（<code>MTU</code>），不同的网络类型有不同的<code>MTU</code>，如果一个数据包从以太网路由到拨号链路上，数据包度大于拨号链路的<code>MTU</code>了，则需要对数据包进行分片fragmentation）。<code>ifconfig </code>命令的输出中也有“MTU:1500”。注意，<code>MTU</code>个概念指数据帧中有效载荷的最大长度，不包括帧首部的长度。</p><h3 id="_15-tcp协议如何保证可靠传输机制" tabindex="-1"><a class="header-anchor" href="#_15-tcp协议如何保证可靠传输机制" aria-hidden="true">#</a> 15. TCP协议如何保证可靠传输机制？</h3><p><strong>TCP主要提供了检验和、序列号/确认应答、超时重传、滑动窗口、拥塞控制和流量控制等方法实现了可靠性传输。</strong></p><ul><li>**检验和：**通过检验和的方式，接收端可以检测出来数据是否有差错和异常，假如有差错就会直接丢弃<code>TCP</code>段，重新发送。</li><li>**序列号/确认应答：**序列号的作用不仅仅是应答的作用，有了序列号能够将接收到的数据根据序列号排序，并且去掉重复序列号的数据。<code>TCP</code>传输的过程中，每次接收方收到数据后，都会对传输方进行确认应答。也就是发送<code>ACK</code>报文,这个<code>ACK</code>报文当中带有对应的确认序列号，告诉发送方，接收到了哪些数据，下一次的数据从哪里发。</li><li><strong>超时重传：</strong> 超时重传是指发送出去的数据包到接收到确认包之间的时间，如果超过了这个时间会被认为是丢包了，需要重传。最大超时时间是动态计算的。</li><li><strong>滑动窗口：</strong> 滑动窗口既提高了报文传输的效率，也避免了发送方发送过多的数据而导致接收方无法正常处理的异常。</li><li><strong>拥塞控制：</strong> 在数据传输过程中，可能由于网络状态的问题，造成网络拥堵，此时引入拥塞控制机制，在保证<code>TCP</code>可靠性的同时，提高性能。</li><li><strong>流量控制：</strong> 如果主机A一直向主机B发送数据，不考虑主机B的接受能力，则可能导致主机B的接受缓冲区满了而无法再接受数据，从而会导致大量的数据丢包，引发重传机制。而在重传的过程中，若主机B的接收缓冲区情况仍未好转，则会将大量的时间浪费在重传数据上，降低传送数据的效率。所以引入流量控制机制，主机B通过告诉主机A自己接收缓冲区的大小，来使主机A控制发送的数据量。流量控制与<code>TCP</code>协议报头中的窗口大小有关。</li></ul><h3 id="_16-tcp的滑动窗口" tabindex="-1"><a class="header-anchor" href="#_16-tcp的滑动窗口" aria-hidden="true">#</a> 16. TCP的滑动窗口?</h3><p>在进行数据传输时，如果传输的数据比较大，就需要拆分为多个数据包进行发送。<code>TCP</code>协议需要对数据进行确认后，才可以发送下一个数据包。这样一来，就会在等待确认应答包环节浪费时间。为了避免这种情况，<code>TCP</code>引入了窗口概念。窗口大小指的是不需要等待确认应答包而可以继续发送数据包的最大值。</p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111514470.jpeg" alt="图片"></p><p>从上面的图可以看到滑动窗口左边的是已发送并且被确认的分组，滑动窗口右边是还没有轮到的分组。</p><p>滑动窗口里面也分为两块，一块是已经发送但是未被确认的分组，另一块是窗口内等待发送的分组。随着已发送的分组不断被确认，窗口内等待发送的分组也会不断被发送。整个窗口就会往右移动，让还没轮到的分组进入窗口内。</p><p>可以看到滑动窗口起到了一个限流的作用，也就是说当前滑动窗口的大小决定了当前<code>TCP</code>发送包的速率，而滑动窗口的大小取决于拥塞控制窗口和流量控制窗口的两者间的最小值。</p><h3 id="_17-详细讲一下拥塞控制-为何要进行拥塞控制" tabindex="-1"><a class="header-anchor" href="#_17-详细讲一下拥塞控制-为何要进行拥塞控制" aria-hidden="true">#</a> 17. 详细讲一下拥塞控制? 为何要进行拥塞控制？</h3><p>A在给B传输数据, A却没有收到B反馈的<code>TCP</code>,A就认为B发送的数据包丢失了..进而会重新传输这个丢失的数据包。然而实际情况有可能此时有太多主机正在使用信道资源，导致<strong>网络拥塞</strong>了。重传数据浪费了资源，所以要进行拥塞控制。发送发不知道一次发多少数据合适，所以设置一个拥塞窗口。</p><p><strong>TCP拥塞控制原理是通过：慢启动、拥塞避免、快重传、快启动</strong></p><p>发送方维持一个叫做拥塞窗口cwnd (congestion window)的状态变量。当cwndssthresh时， 改用拥塞避免算法。</p><ul><li><strong>慢开始:</strong> 不要一开始就发送大量的数据，由小到大逐渐增加拥塞窗口的大小。</li><li><strong>拥塞避免:</strong> 拥塞避免算法让拥塞窗口缓慢增长，即每经过一个往返时间RTT就把发送方的拥塞窗口cwnd加1而不是加倍。这样拥塞窗口按线性规律缓慢增长。</li><li><strong>快重传:</strong> 我们可以剔除一些不必要的拥塞报文，提高网络吞吐量。比如接收方在收到一个失序的报文段后就立即发出重复确认，而不要等到自己发送数据时捎带确认。快重传规定:发送方只要一连收到三个重复确认就应当立即重传对方尚未收到的报文段，而不必继续等待设置的重传计时器时间到期。</li><li><strong>快恢复:</strong> 主要是配合快重传。当发送方连续收到三个重复确认时，就执行“乘法减小”算法，把ssthresh门限减半(为了预防网络发生拥塞)，但接下来并不执行慢开始算法，因为如果网络出现拥塞的话就不会收到好几个重复的确认，收到三个重复确认说明网络状况还可以。</li></ul><h3 id="_18-tcp拥塞控制4种算法" tabindex="-1"><a class="header-anchor" href="#_18-tcp拥塞控制4种算法" aria-hidden="true">#</a> 18. TCP拥塞控制4种算法</h3><ul><li><strong>基于丢包的拥塞控制</strong>：将丢包视为出现拥塞，采取缓慢探测的方式，逐渐增大拥塞窗口，当出现丢包时，将拥塞窗口减小，如<code>Reno</code>、<code>Cubic</code>等。</li><li><strong>基于时延的拥塞控制</strong>：将时延增加视为出现拥塞，延时增加时增大拥塞窗口，延时减小时减小拥塞窗口，如<code>Vegas</code>、<code>FastTCP</code>等。</li><li><strong>基于链路容量的拥塞控制</strong>：实时测量网络带宽和时延，认为网络上报文总量大于带宽时延乘积时出现了拥塞，如<code>BBR</code>。</li><li><strong>基于学习的拥塞控制</strong>：没有特定的拥塞信号，而是借助评价函数，基于训练数据，使用机器学习的方法形成一个控制策略，如<code>Remy</code>。</li></ul><h2 id="http协议" tabindex="-1"><a class="header-anchor" href="#http协议" aria-hidden="true">#</a> HTTP协议</h2><h3 id="_1-http协议1-0-1-1-2-0" tabindex="-1"><a class="header-anchor" href="#_1-http协议1-0-1-1-2-0" aria-hidden="true">#</a> 1. HTTP协议1.0 1.1 2.0</h3><p>**HTTP1.0：**服务器处理完成后立即断开<code>TCP</code>连接（<strong>无连接</strong>），服务器不跟踪每个客户端也不记录过去的请求（<strong>无状态</strong>）</p><p><strong>HTTP1.1：</strong> <code>KeepAlived</code> <strong>长连接</strong>避免了连接建立和释放的开销；通过<code>Content-Length</code>来判断当前请求数据是否已经全部接受（<strong>有状态</strong>）</p><p><strong>HTTP2.0：<strong>引入二进制数据帧和流的概念，其中帧对数据进行顺序标识；因为有了序列，服务器可以</strong>并行</strong>的传输数据。</p><hr><p><strong>无状态的好坏</strong></p><ul><li><strong>无状态的好处</strong>，因为服务器不会去记忆 <code>HTTP </code>的状态，所以不需要额外的资源来记录状态信息，这能减 轻服务器的负担，能够把更多的 <code>CPU </code>和内存用来对外提供服务。</li><li><strong>无状态的坏处</strong>，既然服务器没有记忆能力，这样每操作一次，都要验证信息。例如登录-&gt;添加购物车-&gt;下单-&gt;结算-&gt;支付，这系列操作都要知道用户的身份才行。但服务器不知道这些请求是有关联的，每次都要问一遍身份信息。</li></ul><p>解决无状态的问题，解法方案有很多种，其中比较简单的方式用 <code>Cookie </code>和<code>Session</code>技术。</p><h3 id="_2-http1-0和http1-1的主要区别如下" tabindex="-1"><a class="header-anchor" href="#_2-http1-0和http1-1的主要区别如下" aria-hidden="true">#</a> 2. HTTP1.0和HTTP1.1的主要区别如下：</h3><ol><li><strong>缓存处理</strong>：1.1添加更多的缓存控制策略（如：<code>Entity tag</code>，<code>If-Match</code>）</li><li><strong>网络连接的优化</strong>：1.1支持断点续传</li><li><strong>错误状态码的增多</strong>：1.1新增了24个错误状态响应码，丰富的错误码更加明确各个状态</li><li><strong>Host头处理</strong>：支持<code>Host</code>头域，不在以<code>IP</code>为请求方标志</li><li><strong>长连接</strong>：减少了建立和关闭连接的消耗和延迟。</li></ol><h3 id="_3-http1-1和http2-0的主要区别" tabindex="-1"><a class="header-anchor" href="#_3-http1-1和http2-0的主要区别" aria-hidden="true">#</a> 3. HTTP1.1和HTTP2.0的主要区别：</h3><ol><li><strong>新的传输格式</strong>：2.0使用二进制格式，1.0依然使用基于文本格式</li><li><strong>多路复用</strong>：连接共享，不同的<code>request</code>可以使用同一个连接传输（最后根据每个<code>request</code>上的id号组合成正常的请求）</li><li><strong>header压缩</strong>：由于1.X中<code>header</code>带有大量的信息，并且得重复传输，2.0使用<code>encoder</code>来减少需要传输的<code>hearder</code>大小</li><li><strong>服务端推送</strong>：同<code>google</code>的<code>SPDUY</code>（1.0的一种升级）一样</li></ol><h3 id="_4-http和-https的区别" tabindex="-1"><a class="header-anchor" href="#_4-http和-https的区别" aria-hidden="true">#</a> 4. HTTP和 HTTPS的区别：</h3><ol><li>最重要的区别就是<strong>安全性</strong>，<code>HTTP </code>明文传输，不对数据进行加密安全性较差。<code>HTTPS </code>(HTTP + SSL / TLS)的数据传输过程是加密的，安全性较好。</li><li><strong>证书</strong>：使用 <code>HTTPS </code>协议需要申请 <code>CA </code>证书，一般免费证书较少，因而需要一定费用。证书颁发机构如：<code>Symantec</code>、<code>Comodo </code>、<code>DigiCert </code>和 <code>GlobalSign </code>等。</li><li><strong>响应速度</strong>：<code>HTTP </code>页面响应速度比 <code>HTTPS </code>快，这个很好理解，由于加了一层安全层，建立连接的过程更复杂，也要交换更多的数据，难免影响速度。</li><li><strong>加密</strong>：<code>HTTP</code>协议运行在<code>TCP</code>（三次握手）之上，所有传输的内容都是明文，<code>HTTPS</code>运行在<code>SSL/TLS</code>之上，<code>SSL/TLS</code>运行在<code>TCP</code>之上，所有传输的内容都经过加密的。</li><li><strong>端口不同</strong>：<code>HTTPS </code>和 <code>HTTP </code>使用的是完全不同的连接方式，用的端口也不一样，前者是 <code>443</code>，后者是 <code>80</code>。</li></ol><table><thead><tr><th style="text-align:left;">HTTP</th><th style="text-align:left;">HTTPS</th></tr></thead><tbody><tr><td style="text-align:left;">默认端口80</td><td style="text-align:left;">默认端口443</td></tr><tr><td style="text-align:left;">明文传输、数据未加密、安全性较差</td><td style="text-align:left;">传输协议ssl加密、安全性较好</td></tr><tr><td style="text-align:left;">响应速度快，消耗资源少</td><td style="text-align:left;">响应速度慢、消耗资源多，需要用到CA证书</td></tr></tbody></table><h3 id="_5-https-的缺点" tabindex="-1"><a class="header-anchor" href="#_5-https-的缺点" aria-hidden="true">#</a> 5. HTTPS 的缺点：</h3><ol><li>在相同网络环境中，<code>HTTPS </code>相比 <code>HTTP </code>无论是响应时间还是耗电量都有大幅度上升。</li><li><code>HTTPS </code>的安全是有范围的，在黑客攻击、服务器劫持等情况下几乎起不到作用。</li><li>在现有的证书机制下，中间人攻击依然有可能发生。</li><li><code>HTTPS </code>需要更多的服务器资源，也会导致成本的升高。</li></ol><h3 id="_6-https链接建立的过程" tabindex="-1"><a class="header-anchor" href="#_6-https链接建立的过程" aria-hidden="true">#</a> 6. HTTPS链接建立的过程：</h3><ol><li>首先客户端先给服务器发送一个请求</li><li>服务器发送一个<code>SSL</code>证书给客户端，内容包括：证书的发布机构、有效期、所有者、签名以及公钥</li><li>客户端对发来的公钥进行真伪校验，校验为真则使用公钥对对称加密算法以及对称密钥进行加密</li><li>服务器端使用私钥进行解密并使用对称密钥加密确认信息发送给客户端</li><li>随后客户端和服务端就使用对称密钥进行信息传输</li></ol><hr><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111528110.jpeg" alt="图片">加密流程按图中的序号分为:</p><ol><li>客户端请求<code>HTTPS</code>网址，然后连接到<code>server</code>的443端口(<code>HTTPS</code>默认端口，类似于<code>HTTP</code>的80端口)。</li><li>采用<code>HTTPS</code>协议的服务器必须要有一套数字<code>CA </code>(Certification Authority)证书。颁发证书的同时会产生一个私钥和公钥。私钥由服务端自己保存，不可泄漏。公钥则是附带在证书的信息中，可以公开的。证书本身也附带-一个证书电子签名，这个签名用来验证证书的完整性和真实性，可以防止证书被篡改。</li><li>服务器响应客户端请求，将证书传递给客户端，证书包含公钥和大量其他信息，比如证书颁发机构信息，公司信息和证书有效期等。</li><li>客户端解析证书并对其进行验证。如果证书不是可信机构颁布，或者证书中的域名与实际域名不一致，或者证书已经过期，就会向访问者显示一个警告，由其选择是否还要继续通信。如果证书没有问题，客户端就会从服务器证书中取出服务器的公钥A。然后客户端还会生成一一个随机码<code>KEY</code>,并使用公钥A将其加密。</li><li>客户端把加密后的随机码<code>KEY</code>发送给服务器，作为后面对称加密的密钥。</li><li>服务器在收到随机码<code>KEY</code>之后会使用私钥B将其解密。经过以上这些步骤，客户端和服务器终于建立了安全连接，完美解决了对称加密的密钥泄露问题，接下来就可以用对称加密愉快地进行通信了。</li><li>服务器使用密钥(随机码<code>KEY</code>)对数据进行对称加密并发送给客户端，客户端使用相同的密钥(随机码<code>KEY</code>)解密数据。</li><li>双方使用对称加密愉快地传输所有数据。</li></ol><h3 id="_7-http常见响应状态码" tabindex="-1"><a class="header-anchor" href="#_7-http常见响应状态码" aria-hidden="true">#</a> 7. HTTP常见响应状态码</h3><p><code>100</code>：Continue 一一 继续。客户端应继续其请求。</p><p><code>200</code>：OK 一一 请求成功。一 般用于GET与POST请求。</p><p><code>301</code>：Moved Permanently 一一 永久重定向。</p><p><code>302</code>：Found 一一 暂时重定向。</p><p><code>400</code>：Bad Request 一一 客户端请求的语法错误，服务器无法理解。请求没有包含host头</p><p><code>403</code>：Forbideen 一一 服务器理解请求客户端的请求，但是拒绝执行此请求。禁止客户访问该资源</p><p><code>404</code>：Not Found 一一 服务器无法根据客户端的请求找到资源（网页）。资源未找到</p><p><code>500</code>：Internal Server Error 一一 服务器内部错误，无法完成请求。</p><p><code>502</code>：Bad Gateway 一一 作为网关或者代理服务器尝试执行请求时，从远程服务器接收到了无效的响应。</p><h3 id="_8-状态码301和302的区别是什么" tabindex="-1"><a class="header-anchor" href="#_8-状态码301和302的区别是什么" aria-hidden="true">#</a> 8. 状态码301和302的区别是什么?</h3><p><code>301</code>为永久重定向，<code>302</code>为临时重定向</p><p><strong>共同点</strong>: <code>301</code>和<code>302</code>状态码都表示重定向，就是说浏览器在拿到服务器返回的这个状态码后会自动跳转到一个新的URL地址，这个地址可以从响应的Location首部中获取(用户看到的效果就是他输入的地址A瞬间变成了另一个地址B)。</p><p><strong>不同点</strong>: <code>301</code>表示旧地址A的资源已经被永久地移除了(这个资源不可访问了)，搜索引擎在抓取新内容的同时也将旧的网址交换为重定向之后的网址;<code>302</code>表示旧地址A的资源还在(仍然可以访问)，这个重定向只是临时地从旧地址A跳转到地址B，搜索引擎会抓取新的内容而保存旧的网址。SEO中<code>302</code>好于<code>301</code>。</p><p>补充，重定向原因:</p><ol><li>网站调整(如改变网页目录结构);</li><li>网页被移到一个新地址;</li><li>网页扩展名改变(如应用需要把.php改成.Html或.shtml)。</li></ol><h3 id="_9-对称加密算法与非对称加密算法的区别" tabindex="-1"><a class="header-anchor" href="#_9-对称加密算法与非对称加密算法的区别" aria-hidden="true">#</a> 9. 对称加密算法与非对称加密算法的区别</h3><p><strong>对称加密算法：</strong></p><p>双方持有相同的密钥，且加密速度快，典型对称加密算法：<code>DES</code>、<code>AES</code></p><p><strong>非对称加密算法：</strong></p><p>密钥成对出现（私钥、公钥），私钥只有自己知道，不在网络中传输；而公钥可以公开。相比对称加密速度较慢，典型的非对称加密算法有：<code>AES</code>、<code>DSA</code></p><h3 id="_10-http请求方法" tabindex="-1"><a class="header-anchor" href="#_10-http请求方法" aria-hidden="true">#</a> 10. HTTP请求方法：</h3><table><thead><tr><th style="text-align:left;">方法</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">GET</td><td style="text-align:left;">像特定资源发送请求，查询数据，并返回实体</td></tr><tr><td style="text-align:left;">POST</td><td style="text-align:left;">向指定资源提交数据进行处理，可能会导致新的资源建立、已有的资源修改</td></tr><tr><td style="text-align:left;">PUT</td><td style="text-align:left;">向服务器上传新的内容</td></tr><tr><td style="text-align:left;">HEAD</td><td style="text-align:left;">类似GET请求，返回的响应式中没有具体内容，用于获取报头</td></tr><tr><td style="text-align:left;">DELETE</td><td style="text-align:left;">请求服务器删除指定标识的资源</td></tr><tr><td style="text-align:left;">OPTIONS</td><td style="text-align:left;">可以原来向服务器发送请求来测试服务器的功能性</td></tr><tr><td style="text-align:left;">TRACE</td><td style="text-align:left;">回显服务器收到的请求，用于测试和诊断</td></tr><tr><td style="text-align:left;">CONNECT</td><td style="text-align:left;">HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器</td></tr></tbody></table><h3 id="_11-get和post请求区别" tabindex="-1"><a class="header-anchor" href="#_11-get和post请求区别" aria-hidden="true">#</a> 11. Get和Post请求区别</h3><table><thead><tr><th style="text-align:left;"></th><th style="text-align:left;">GET</th><th style="text-align:left;">POST</th></tr></thead><tbody><tr><td style="text-align:left;">HTTP规范</td><td style="text-align:left;">GET用于信息获取</td><td style="text-align:left;">修改服务器上的资源的请求</td></tr><tr><td style="text-align:left;">可见性</td><td style="text-align:left;">数据在URL中对所有人可见</td><td style="text-align:left;">数据不会显示在URL中</td></tr><tr><td style="text-align:left;">安全性</td><td style="text-align:left;">与post相比，get的安全性较差，因为所发送的数据是URL的一部分</td><td style="text-align:left;">安全，因为参数不会被保存在浏览器历史或web服务器日志中</td></tr><tr><td style="text-align:left;">数据长度</td><td style="text-align:left;">受限制，最长2kb</td><td style="text-align:left;">无限制</td></tr><tr><td style="text-align:left;">编码类型</td><td style="text-align:left;">application/x-www-form-urlencoded</td><td style="text-align:left;">multipart/form-data</td></tr><tr><td style="text-align:left;">缓存</td><td style="text-align:left;">能被缓存</td><td style="text-align:left;">不能被缓存</td></tr></tbody></table><h3 id="_12-get-和-post-方法都是安全和幂等的吗" tabindex="-1"><a class="header-anchor" href="#_12-get-和-post-方法都是安全和幂等的吗" aria-hidden="true">#</a> 12. GET 和 POST 方法都是安全和幂等的吗？</h3><p>先说明下安全和幂等的概念：</p><ul><li>在 <code>DSA</code>协议里，所谓的「安全」是指请求方法不会「破坏」服务器上的资源。</li><li>所谓的「幂等」，意思是多次执行相同的操作，结果都是「相同」的。</li></ul><p>那么很明显 <strong>GET 方法就是安全且幂等的</strong>，因为它是「只读」操作，无论操作多少次，服务器上的数据 都是安全的，且每次的结果都是相同的。</p><p><code>POST </code>因为是「新增或提交数据」的操作，会修改服务器上的资源，所以是<strong>不安全</strong>的，且多次提交数据 就会创建多个资源，所以<strong>不是幂等</strong>的。</p><h3 id="_13-重定向和转发区别" tabindex="-1"><a class="header-anchor" href="#_13-重定向和转发区别" aria-hidden="true">#</a> 13. 重定向和转发区别</h3><p><strong>转发是服务器行为,重定向是客户端行为</strong></p><p><strong>重定向：redirect：</strong></p><p>地址栏发生变化</p><p>重定向可以访问其他站点（服务器）的资源</p><p>重定向是两次请求。不能使用request对象来共享数据</p><p><strong>转发：forward：</strong></p><p>转发地址栏路径不变</p><p>转发只能访问当前服务器下的资源</p><p>转发是一次请求，可以使用<code>request</code>对象共享数据</p><h3 id="_14-cookie和session区别" tabindex="-1"><a class="header-anchor" href="#_14-cookie和session区别" aria-hidden="true">#</a> 14. Cookie和Session区别</h3><p><strong>Cookie 和 Session都是用来跟踪浏览器用户身份的会话方式</strong>，但两者有所区别：</p><p><code>Cookie </code>数据保存在客户端(浏览器端)，<code>Session </code>数据保存在服务器端。</p><p><code>cookie</code>不是很安全，别人可以分析存放在本地的<code>Cookie</code>并进行欺骗,考虑到安全应当使用session。</p><p><code>Cookie </code>⼀般⽤来保存⽤户信息，<code>Session </code>的主要作⽤就是通过服务端记录⽤户的状态</p><h3 id="_15-浏览器输入url过程" tabindex="-1"><a class="header-anchor" href="#_15-浏览器输入url过程" aria-hidden="true">#</a> 15. 浏览器输入URL过程</h3><p><strong>过程：</strong><code>DNS</code>解析、<code>TCP</code>连接、发送<code>HTTP</code>请求、服务器处理请求并返回<code>HTTP</code>报文、浏览器渲染、结束</p><ol><li><p>域名解析(域名www.baidu.com变为IP地址)。浏览器搜索自己的<code>DNS</code>缓存(维护一张域名与IP的对应表);</p></li><li><ol><li>若没有，则搜索操作系统的<code>DNS</code>缓存(维护一张域名与IP的对应表) ;</li><li>若没有，则搜索操作系统的hosts文件(维护一张域名与IP的对应表)。</li><li>若都没有，则找TCP/IP参数中设置的首选dns服务器，即本地<code>DNS</code>服务器(递归查询)，本地域名服务器查询自己的<code>DNS</code>缓存，如果没有，则进行迭代查询。将本地dns服务器将IP返回给操作系统，同时缓存IP。</li></ol></li><li><p>发起<code>TCP</code>的三次握手，建立<code>TCP</code>连接。浏览器会以一个随机端口(1024-65535) 向服务端的web程序80端口发起<code>TCP</code>的连接。</p></li><li><p>建立<code>TCP</code>连接后发起HTTP请求。</p></li><li><p>服务器响应<code>HTTP</code>请求，客户端得到<code>html</code>代码。服务器web应用程序收到<code>HTTP</code>请求后，就开始处理请求，处理之后就返回给浏览器<code>html</code>文件。</p></li><li><p>浏览器解析<code>html</code>代码，并请求<code>html</code>中的资源。</p></li><li><p>浏览器对页面进行渲染，并呈现给用户。</p></li></ol><hr><p>如何查看 TCP 的连接状态？<strong>TCP 的连接状态查看，在 Linux 可以通过 netstat -napt 命令查看。</strong></p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111528120.jpeg" alt="图片"></p><h3 id="_16-dns协议是tcp还是udp" tabindex="-1"><a class="header-anchor" href="#_16-dns协议是tcp还是udp" aria-hidden="true">#</a> 16. DNS协议是TCP还是UDP?</h3><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111528118.jpeg" alt="图片"></p><ul><li><p><code>DNS</code>占用53号端口，同时使用<code>TCP</code>和<code>UDP</code>协议。那么<code>DNS</code>在什么情况下使用这两种协议？</p><p><strong>DNS在区域传输的时候使用TCP协议，其他时候使用UDP协议。</strong></p></li><li><ul><li>客户端向<code>DNS</code>服务器查询域名，一般返回的内容都不超过512字节，用<code>UDP</code>传输即可。不用经过<code>TCP</code>三次握手，这样<code>DNS</code>服务器负载更低，响应更快。虽然从理论上说，客户端也可以指定向<code>DNS</code>服务器查询的时候使用<code>TCP</code>，但事实上，很多<code>DNS</code>服务器进行配置的时候，仅支持<code>UDP</code>查询包。</li><li>辅域名服务器会定时（一般3小时）向主域名服务器进行查询以便了解数据是否有变动。如有变动，会执行一次区域传送，进行数据同步。区域传送使用<code>TCP</code>而不是<code>UDP</code>，因为数据同步传送的数据量比一个请求应答的数据量要多得多。</li><li><code>TCP</code>是一种可靠连接，保证了数据的准确性。</li><li><strong>DNS区域传输的时候使用TCP协议：</strong></li><li><strong>域名解析时使用UDP协议：</strong></li></ul></li></ul><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111528245.jpeg" alt="图片"></p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111528146.jpeg" alt="图片"></p><h3 id="_17-arp协议如何找到对应ip地址和mac的映射的" tabindex="-1"><a class="header-anchor" href="#_17-arp协议如何找到对应ip地址和mac的映射的" aria-hidden="true">#</a> 17. ARP协议如何找到对应IP地址和mac的映射的</h3><p>简单地说，<code>ARP</code> 是借助 <code>ARP</code> 请求与 <code>ARP</code> 响应两种类型的包确定 <code>MAC</code> 地址的。</p><ul><li>主机会通过广播发送 <code>ARP</code> 请求，这个包中包含了想要知道的 <code>MAC</code> 地址的主机 IP 地址。</li><li>当同个链路中的所有设备收到 <code>ARP</code> 请求时，会去拆开 <code>ARP</code> 请求包里的内容，如果 <code>ARP</code> 请求包中 的目标 IP 地址与自己的 IP 地址一致，那么这个设备就将自己的 MAC 地址塞入 <code>ARP</code> 响应包返回 给主机。</li></ul><p>操作系统通常会把第一次通过 <code>ARP</code> 获取的 <code>MAC</code> 地址缓存起来，以便下次直接从缓存中找到对应 IP 地 址的 <code>MAC</code> 地址。不过， <code>MAC</code> 地址的缓存是有一定期限的，超过这个期限，缓存的内容将被清除</p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111528376.jpeg" alt="图片"></p><h3 id="_18-rarp-协议你知道是什么吗" tabindex="-1"><a class="header-anchor" href="#_18-rarp-协议你知道是什么吗" aria-hidden="true">#</a> 18. RARP 协议你知道是什么吗？</h3><p>ARP 协议是已知 IP 地址求 <code>MAC</code> 地址，那 <code>RARP</code> 协议正好相反，它是已知 <code>MAC</code>地址求 IP 地址。例如 将打印机服务器等小型嵌入式设备接入到网络时就经常会用得到。</p><p>通常这需要架设一台 <code>RARP</code> 服务器，在这个服务器上注册设备的 <code>MAC</code> 地址及其 IP 地址。然后再将 这个设备接入到网络，接着：</p><ul><li>该设备会发送一条「我的 <code>MAC</code> 地址是XXXX，请告诉我，我的IP地址应该是什么」的请求信息。</li><li><code>RARP</code> 服务器接到这个消息后返回「 <code>MAC</code>地址为 XXXX 的设备，IP地址为 XXXX」的信息给这个 设备。</li></ul><p>最后，设备就根据从 <code>RARP</code> 服务器所收到的应答信息设置自己的 IP 地址</p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204111528489.jpeg" alt="图片"></p><h3 id="_19-什么是ddos攻击" tabindex="-1"><a class="header-anchor" href="#_19-什么是ddos攻击" aria-hidden="true">#</a> 19. 什么是DDos攻击?</h3><p><code>DDos</code>全称Distributed Denial of Service，分布式拒绝服务攻击。最基本的DOS攻击过程如下:</p><ol><li>客户端向服务端发送请求链接数据包。</li><li>服务端向客户端发送确认数据包。</li><li>客户端不向服务端发送确认数据包，服务器一直等待来自客户端的确认</li></ol><p><code>DDos</code>则是采用分布式的方法，通过在网络上占领多台“肉鸡”，用多台计算机发起攻击。</p><p><code>DDos</code>攻击现在基本没啥作用了，因为服务器的性能都很好，而且是多台服务器共同作用，1V1的模式黑客无法占上风。对于<code>DDos</code>攻击，预防方法有:</p><ul><li>减少SYN timeout时间。在握手的第三步，服务器会等待30秒-120秒的时间，减少这个等待时间就能释放更多的资源。</li><li>限制同时打开的SYN半连接数目。</li></ul><h3 id="_20-什么是xss攻击" tabindex="-1"><a class="header-anchor" href="#_20-什么是xss攻击" aria-hidden="true">#</a> 20. 什么是XSS攻击?</h3><p>XSS也称cross-sitescripting,跨站脚本。这种攻击是由于服务器将攻击者存储的数据原原本本地显示给其他用户所致的。比如一个存在XSS漏洞的论坛，用户发帖时就可以引入带有&lt; script&gt;标签的代码，导致恶意代码的执行。</p><p>预防措施有:</p><ul><li>前端：过滤。</li><li>后端：转义，比如go自带的处理器就具有转义功能。</li></ul><h3 id="_21-sql注入是什么-如何避免sql注入" tabindex="-1"><a class="header-anchor" href="#_21-sql注入是什么-如何避免sql注入" aria-hidden="true">#</a> 21. SQL注入是什么，如何避免SQL注入?</h3><p><code>SQL</code>注入就是在用户输入的字符串中加入<code>SQL</code>语句，如果在设计不良的程序中忽略了检查，那么这些注入进去的<code>SQL</code>语句就会被数据库服务器误认为是正常的<code>SQL</code>语句而运行，攻击者就可以执行计划外的命令或访问未被授权的数据。</p><p><code>SQL</code>注入的原理主要有以下4点：</p><ol><li>恶意拼接查询</li><li>利用注释执行非法命令</li><li>传入非法参数</li><li>添加额外条件</li></ol><p>避免<code>SQL</code>注入的一些方法：</p><ol><li>参数校验：在一些不该有特殊字符的参数中提前进行特殊字符校验即可。</li><li>限制数据库权限，给用户提供仅仅能够满足其工作的最低权限。</li><li>提供参数化查询接口，不要直接使用原生<code>SQL</code>。</li><li><strong>SQL预编译</strong></li></ol><p>在知道了<code>SQL</code>注入的原理之后，我们同样也了解到<code>MySQL</code>有预编译的功能，指的是在服务器启动时，<code>MySQL</code> Client把<code>SQL</code>语句的模板（变量采用占位符进行占位）发送给<code>MySQL</code>服务器，<code>MySQL</code>服务器对<code>SQL</code>语句的模板进行编译，编译之后根据语句的优化分析对相应的索引进行优化，在最终绑定参数时把相应的参数传送给<code>MySQL</code>服务器，直接进行执行，节省了<code>SQL</code>查询时间，以及<code>MySQL</code>服务器的资源，达到一次编译、多次执行的目的，除此之外，还可以防止SQL注入。</p><p>具体是怎样防止<code>SQL</code>注入的呢？实际上当将绑定的参数传到<code>MySQL</code>服务器，<code>MySQL</code>服务器对参数进行编译，即填充到相应的占位符的过程中，做了转义操作。我们常用的JDBC就有预编译功能，不仅提升性能，而且防止<code>SQL</code>注入。</p><h3 id="_22-网络编程socket-客户端和服务端通信过程-分别调用了哪些函数-作用是什么" tabindex="-1"><a class="header-anchor" href="#_22-网络编程socket-客户端和服务端通信过程-分别调用了哪些函数-作用是什么" aria-hidden="true">#</a> 22. 网络编程socket，客户端和服务端通信过程，分别调用了哪些函数，作用是什么</h3><ul><li><p>服务器端程序：</p></li><li><ol><li>创建一个<code>socket</code>，用函数<code>socket()</code></li><li>绑定IP地址、端口等信息到<code>socket</code>上，用函数<code>bind()</code></li><li>设置允许的最大连接数，用函数<code>listen()</code></li><li>接收客户端上来的连接，用函数<code>accept()</code></li><li>收发数据，用函数<code>send()</code>和<code>recv()</code>，或者<code>read()</code>和<code>write()</code></li><li>关闭网络连接</li></ol></li><li><p>客户端程序：</p></li><li><ol><li>创建一个<code>socket</code>，用函数<code>socket()</code></li><li>设置要连接的对方的IP地址和端口等属性</li><li>连接服务器，用函数<code>connect()</code></li><li>收发数据，用函数<code>send()</code>和<code>recv()</code>，或<code>read()</code>和<code>write()</code></li><li>关闭网络连接</li></ol></li></ul><h3 id="_23-负载均衡算法有哪些" tabindex="-1"><a class="header-anchor" href="#_23-负载均衡算法有哪些" aria-hidden="true">#</a> 23. 负载均衡算法有哪些?</h3><p>nginx负载均衡的三种方式主要是<strong>轮询模式、weight权重模式、ip_hash</strong>。</p><p>当一台服务器的单位时间内的访问量越大时，服务器压力就越大，大到超过自身承受能力时，服务器就会崩溃。为了避免服务器崩溃，让用户有更好的体验，我们通过负载均衡的方式来分担服务器压力。</p><ol><li><p>**轮询模式（默认）**每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。适合服务器配置相当，无状态且短平快的服务使用。也适用于图片服务器集群和纯静态页面服务器集群。</p></li><li><p><strong>weight权重模式</strong>这种方式比较灵活，当后端服务器性能存在差异的时候，通过配置权重，可以让服务器的性能得到充分发挥，有效利用资源。weight和访问比率成正比，用于后端服务器性能不均的情况。权重越高，在被访问的概率越大</p></li><li><p><strong>ip_hash</strong>上述weight权重模式方式存在一个问题，在负载均衡系统中，假如用户在某台服务器上登录了，那么该用户第二次请求的时候，因为我们是负载均衡系统，每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的。</p><p>可以采用ip_hash指令解决这个问题，如果客户已经访问了某个服务器，当用户再次访问时，会将该请求通过哈希算法，自动定位到该服务器。每个请求按访问IP的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session不能跨服务器的问题。</p></li></ol>`,246),i=[l];function a(s,r){return o(),d("div",null,i)}const h=e(c,[["render",a],["__file","计算机网络面试题.html.vue"]]);export{h as default};
