---
date: 2022-10-11
category:
- JavaScript
---
# CORS 跨域及其 Nodejs 服务端配置实践 

CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

## 简单请求和复杂请求

### 简单请求

不会触发CORS预检的请求称为简单请求，满足以下**所有条件**的才会被视为简单请求，基本上我们日常开发只会关注前面两点

1. 使用`GET、POST、HEAD`其中一种方法
2. 只使用了如下的**安全首部字段**，不得人为设置其他首部字段
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` 仅限以下三种
        - `text/plain`
        - `multipart/form-data`
        - `application/x-www-form-urlencoded`
    - HTML头部header field字段：`DPR、Download、Save-Data、Viewport-Width、WIdth`
3. 请求中的任意`XMLHttpRequestUpload` 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问
4. 请求中没有使用 ReadableStream 对象

### 预检请求

需预检的请求要求必须首先使用 `OPTIONS` 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响

下面的请求会触发预检请求，其实非简单请求之外的就会触发预检，就不用记那么多了：

1. 使用了`PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH`方法
2. 人为设置了非规定内的其他首部字段，参考上面简单请求的安全字段集合，还要特别注意`Content-Type`的类型
3. `XMLHttpRequestUpload` 对象注册了任何事件监听器
4. 请求中使用了`ReadableStream`对象

## 基本配置所需头部字段 `Access-Contro-***`

### Access-Control-Allow-Origin

该字段是必须的。它的值要么是请求时`Origin`字段的值，要么是一个`*`，表示接受任意域名的请求。

### Access-Control-Allow-Credentials

该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。

### Access-Control-Allow-Headers

如果浏览器请求包括[`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers)字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。

### Access-Control-Allow-Methods

该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

## Nodejs 服务 CORS 配置

基于 `express` 中间件配置：

```js
const express = require('express')

const app = express();

app.use('*', (req, res, next) => {
    res.set({
        'Access-Control-Allow-Credentials': true, //允许后端发送cookie
        'Access-Control-Allow-Origin': req.headers.origin || '*', //任意域名都可以访问,或者基于我请求头里面的域
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
        'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
    })
    req.method === 'OPTIONS' ? res.status(204).end() : next(); // 预检请求快速返回 
})
```

使用 cors 库的配置

```js
// npm install cors

var express = require('express')
var cors = require('cors')
var app = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 204 
}

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

> 参考：
>
> [CORS 简单请求+预检请求（彻底理解跨域](https://github.com/amandakelake/blog/issues/62)
