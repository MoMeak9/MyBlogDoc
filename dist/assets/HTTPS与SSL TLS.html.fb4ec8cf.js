import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as S,c as t,e as a}from"./app.d7b34baa.js";const p={},r=a('<h1 id="https与ssl-tls" tabindex="-1"><a class="header-anchor" href="#https与ssl-tls" aria-hidden="true">#</a> HTTPS与SSL/TLS</h1><p>问什么会有HTTP，因为HTTP不安全，是明文，可伪造。</p><p>如果通信过程具备了四个特性，就可以认为是“安全”的，这四个特性是：<strong>机密性、完整性，身份认证和不可否认。</strong></p><ul><li><p>**机密性（Secrecy/Confidentiality）**是指对数据的“保密”，只能由可信的人访问，对其他人是不可见的“秘密”，简单来说就是不能让不相关的人看到不该看的东西。</p></li><li><p>**完整性（Integrity，也叫一致性）**是指数据在传输过程中没有被篡改，不多也不少，“完完整整”地保持着原状。</p></li><li><p>**身份认证（Authentication）**是指确认对方的真实身份，也就是“证明你真的是你”，保证消息只能发送给可信的人。</p></li><li><p><strong>第四个特性是不可否认（Non-repudiation/Undeniable）</strong>，也叫不可抵赖，意思是不能否认已经发生过的行为，不能“说话不算数”“耍赖皮”。</p></li></ul><h2 id="https" tabindex="-1"><a class="header-anchor" href="#https" aria-hidden="true">#</a> HTTPS</h2><p>HTTPS 名字里的“S”，它把 HTTP 下层的传输协议由 TCP/IP 换成了 SSL/TLS，由“HTTP over TCP/IP”变成了“HTTP over SSL/TLS”，让 HTTP 运行在了安全的 SSL/TLS 协议上，收发报文不再使用 Socket API，而是调用专门的安全接口。</p><p><img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/50d57e18813e18270747806d5d73f0a3.png" alt="img"></p><p>所以说，HTTPS 本身并没有什么“惊世骇俗”的本事，全是靠着后面的 SSL/TLS“撑腰”。</p><h2 id="ssl-tls" tabindex="-1"><a class="header-anchor" href="#ssl-tls" aria-hidden="true">#</a> SSL/TLS</h2><p><strong>SSL 即安全套接层（Secure Sockets Layer），在 OSI 模型中处于第 5 层（会话层）</strong>，由网景公司于 1994 年发明，有 v2 和 v3 两个版本，而 v1 因为有严重的缺陷从未公开过。</p><p>SSL 发展到 v3 时已经证明了它自身是一个非常好的安全通信协议，于是互联网工程组 IETF 在 1999 年把它改名为 TLS（传输层安全，Transport Layer Security），正式标准化，版本号从 1.0 重新算起，所以 TLS1.0 实际上就是 SSLv3.1。</p><p>TLS 由记录协议、握手协议、警告协议、变更密码规范协议、扩展协议等几个子协议组成，综合使用了对称加密、非对称加密、身份认证等许多密码学前沿技术。</p><p><strong>浏览器和服务器在使用 TLS 建立连接时需要选择一组恰当的加密算法来实现安全通信，这些算法的组合被称为“密码套件”（cipher suite，也叫加密套件）。</strong></p><p><img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/5ead57e03f127ea8f244d715186adb24.png" alt="img"></p><h2 id="openssl" tabindex="-1"><a class="header-anchor" href="#openssl" aria-hidden="true">#</a> OpenSSL</h2><p>说到 TLS，就不能不谈到 OpenSSL，它是一个著名的开源密码学程序库和工具包，几乎支持所有公开的加密算法和协议，已经成为了事实上的标准，许多应用软件都会使用它作为底层库来实现 TLS 功能，包括常用的 Web 服务器 Apache、Nginx 等。</p><p>OpenSSL 是从另一个开源库 SSLeay 发展出来的，曾经考虑命名为“OpenTLS”，但当时（1998 年）TLS 还未正式确立，而 SSL 早已广为人知，所以最终使用了“OpenSSL”的名字</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>因为 HTTP 是明文传输，所以不安全，容易被黑客窃听或篡改；</p><p>通信安全必须同时具备机密性、完整性、身份认证和不可否认这四个特性；</p><p>HTTPS 的语法、语义仍然是 HTTP，但把下层的协议由 TCP/IP 换成了 SSL/TLS；SSL/TLS 是信息安全领域中的权威标准，采用多种先进的加密技术保证通信安全；</p><p>OpenSSL 是著名的开源密码学工具包，是 SSL/TLS 的具体实现。</p>',22),s=[r];function n(i,T){return S(),t("div",null,s)}const c=e(p,[["render",n],["__file","HTTPS与SSL TLS.html.vue"]]);export{c as default};
