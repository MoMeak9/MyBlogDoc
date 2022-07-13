> 参照
>
> [HTTP灵魂之问，巩固你的 HTTP 知识体系](https://juejin.cn/post/6844904100035821575)

# HTTP专项面试题

说一说常见的请求头和相应头都有什么呢？
1)请求(客户端->服务端[request])
GET(请求的方式) /newcoder/hello.html(请求的目标资源) HTTP/1.1(请求采用的协议和版本号)
Accept: */*(客户端能接收的资源类型)
Accept-Language: en-us(客户端接收的语言类型)
Connection: Keep-Alive(维护客户端和服务端的连接关系)
Host: localhost:8080(连接的目标主机和端口号)
Referer: http://localhost/links.asp(告诉服务器我来自于哪里)
User-Agent: Mozilla/4.0(客户端版本号的名字)
Accept-Encoding: gzip, deflate(客户端能接收的压缩数据的类型)
If-Modified-Since: Tue, 11 Jul 2000 18:23:51 GMT(缓存时间)
Cookie(客户端暂存服务端的信息)
Date: Tue, 11 Jul 2000 18:23:51 GMT(客户端请求服务端的时间)


2)响应(服务端->客户端[response])
HTTP/1.1(响应采用的协议和版本号) 200(状态码) OK(描述信息)
Location: http://www.baidu.com(服务端需要客户端访问的页面路径)
Server:apache tomcat(服务端的Web服务端名)
Content-Encoding: gzip(服务端能够发送压缩编码类型)
Content-Length: 80(服务端发送的压缩数据的长度)
Content-Language: zh-cn(服务端发送的语言类型)
Content-Type: text/html; charset=GB2312(服务端发送的类型及采用的编码方式)
Last-Modified: Tue, 11 Jul 2000 18:23:51 GMT(服务端对该资源最后修改的时间)
Refresh: 1;url=http://www.it315.org(服务端要求客户端1秒钟后，刷新，然后访问指定的页面路径)
Content-Disposition: attachment; filename=aaa.zip(服务端要求客户端以下载文件的方式打开该文件)
Transfer-Encoding: chunked(分块传递数据到客户端）  
Set-Cookie:SS=Q0=5Lb_nQ; path=/search(服务端发送到客户端的暂存数据)
Expires: -1//3种(服务端禁止客户端缓存页面数据)
Cache-Control: no-***(服务端禁止客户端缓存页面数据)  
Pragma: no-***(服务端禁止客户端缓存页面数据)   
Connection: close(1.0)/(1.1)Keep-Alive(维护客户端和服务端的连接关系)  
Date: Tue, 11 Jul 2000 18:23:51 GMT(服务端响应客户端的时间)
在服务器响应客户端的时候，带上Access-Control-Allow-Origin头信息，解决跨域的一种方法。
