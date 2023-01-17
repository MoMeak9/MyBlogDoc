---
date: 2022-12-27
category:
- Node
---

# 使用Node.js 实现网络代理（无框架，通过http-proxy）

## 使用场景

使用场景自不必多说，包括正向代理、反向代理，在Node.js的特有场景中，其实还包含BFF，服务端中间件等等。如果你是在一个比Nginx更细粒度的，并且能够在框架内集成业务的场景，非常推荐继续阅读。

## 安装

```shell
npm install http-proxy
```

通过调用 `createProxyServer` 并将`options`对象作为参数传递来创建新的代理

```js
const httpProxy = require('http-proxy');
 
const proxy = httpProxy.createProxyServer(options);
```

新创建的对象拥有四个方法：
- web `req, res, [options]`用于代理常规 HTTP(S) 请求
- ws `req, socket, head, [options]` 用于代理 WS(S) 请求
- listen `port` 为方便起见，将对象包装在网络服务器中的函数
- close `[callback]` 关闭内部网络服务器并停止监听给定端口的函数

然后可以通过调用这些函数来代理请求

```js
http.createServer(function(req, res) {
  proxy.web(req, res, { target: 'http://mytarget.com:8080' });
});
```

同时可以使用 Event Emitter API 监听错误，传入回调函数

```js
proxy.on('error', function(e) {
  ...
});
```

或者在web方法中作为回调函数传入

```js
proxy.web(req, res, { target: 'http://mytarget.com:8080' }, function(e) { ... });
```

当请求被代理时，它遵循两个不同的管道，它们将转换应用于 req 和 res 对象。第一个管道（传入）负责创建和操作将客户端连接到目标的流。第二个管道（传出）负责创建和操作从您的目标向客户端返回数据的流。[源码位置](https://github.com/http-party/node-http-proxy/tree/9b96cd725127a024dabebec6c7ea8c807272223d/lib/http-proxy/passes)

## 使用案例

### 设置基本的独立代理服务器

```js
const http = require('http'),
    httpProxy = require('http-proxy');
//
// 创建代理服务器并在选项中设置目标服务器。
//
httpProxy.createProxyServer({target:'http://localhost:9000'}).listen(8000); // See (†)
 
//
// 创建测试用目标服务器
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9000);
```

调用 listen(..) 才会触发 Web 服务器的创建。否则，只创建代理实例。

### 使用自定义服务器逻辑设置独立代理服务器

此示例展示了如何使用自己的 HTTP 服务器代理请求，以及如何使用自己的逻辑来处理请求。

```js
const http = require('http'),
    httpProxy = require('http-proxy');
 
//
// 使用自定义应用程序逻辑创建代理服务器
//
const proxy = httpProxy.createProxyServer({});
 
//
// 创建您的自定义服务器，只需调用 `proxy.web()` 来代理
// 发送给目标的web请求传递在选项中
// 同样的，也可以使用`proxy.ws()`
//
const server = http.createServer(function(req, res) {
  // 你可以在这里添加处理逻辑
  proxy.web(req, res, { target: 'http://127.0.0.1:5050' });
});
```

### 关闭服务器

在另一个程序中测试或运行服务器时，可能需要关闭代理。 此操作将阻止代理接受新连接。

```js
const proxy = new httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 1337
  }
});
 
proxy.close();
```
