---
date: 2022-05-13
category:
- Network
- HTTP
---

# TLS1.2连接过程解析

 HTTPS 协议，**它需要再用另外一个“握手”过程，在 TCP 上建立安全连接，之后才是收发 HTTP 报文。**

## TLS 协议的组成

**记录协议（Record Protocol）**规定了 TLS 收发数据的基本单位：记录（record）。它有点像是 TCP 里的 segment，所有的其他子协议都需要通过记录协议发出。但多个记录数据可以在一个 TCP 包里一次性发出，也并不需要像 TCP 那样返回 ACK。

**警报协议（Alert Protocol）**的职责是向对方发出警报信息，有点像是 HTTP 协议里的状态码。比如，protocol_version 就是不支持旧版本，bad_certificate 就是证书有问题，收到警报后另一方可以选择继续，也可以立即终止连接

**握手协议（Handshake Protocol）**是 TLS 里最复杂的子协议，要比 TCP 的 SYN/ACK 复杂的多，浏览器和服务器会在握手过程中协商 TLS 版本号、随机数、密码套件等信息，然后交换证书和密钥参数，最终双方协商得到会话密钥，用于后续的混合加密系统。

**变更密码规范协议（Change Cipher Spec Protocol）**，它非常简单，就是一个“通知”，告诉对方，后续的数据都将使用加密保护。那么反过来，在它之前，数据都是明文的。

下面的这张图简要地描述了 TLS 的握手过程，其中每一个“框”都是一个记录，多个记录组合成一个 TCP 包发送。所以，最多经过两次消息往返（4 个消息）就可以完成握手，然后就可以在安全的通信环境里发送 HTTP 报文，实现 HTTPS 协议。

<img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/69493b53f1b1d540acf886ebf021a26c.png" alt="img"  />

## ECDHE 握手过程

![img](https://my-doc-1259409954.file.myqcloud.com/MyImages/9caba6d4b527052bbe7168ed4013011e.png)

## RSA 握手过程

![img](https://my-doc-1259409954.file.myqcloud.com/MyImages/cb9a89055eadb452b7835ba8db7c3ad2.png)

## 双向认证

到这里 TLS 握手就基本讲完了。不过上面说的是“单向认证”握手过程，**只认证了服务器的身份，而没有认证客户端的身份。**这是因为通常单向认证通过后已经建立了安全通信，用账号、密码等简单的手段就能够确认用户的真实身份。

但为了防止账号、密码被盗，有的时候（比如网上银行）还会使用 U 盾给用户颁发客户端证书，实现“**双向认证**”，这样会更加安全。

双向认证的流程也没有太多变化，只是在“Server Hello Done”之后，“Client Key Exchange”之前，客户端要发送“Client Certificate”消息，服务器收到后也把证书链走一遍，验证客户端的身份。

## 小结

- HTTPS 协议会先与服务器执行 TCP 握手，然后执行 TLS 握手，才能建立安全连接；
- 握手的目标是安全地交换对称密钥，需要三个随机数，第三个随机数“Pre-Master”必须加密传输，绝对不能让黑客破解；
- “Hello”消息交换随机数，“Key Exchange”消息交换“Pre-Master”；
- “Change Cipher Spec”之前传输的都是明文，之后都是对称密钥加密的密文。

对于TLS 1.3

- 为了兼容 1.1、1.2 等“老”协议，TLS1.3 会“伪装”成 TLS1.2，新特性在“扩展”里实现；

- 1.1、1.2 在实践中发现了很多安全隐患，所以 TLS1.3 大幅度删减了加密算法，只保留了 ECDHE、AES、ChaCha20、SHA-2 等极少数算法，强化了安全；

- TLS1.3 也简化了握手过程，完全握手只需要一个消息往返，提升了性能。
