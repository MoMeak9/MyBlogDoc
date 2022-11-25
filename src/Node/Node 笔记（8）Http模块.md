---
icon: edit
date: 2022-04-11
category:
- Node
---
# Node 笔记（8）Http模块

比较简单，直接上代码吧~

## 服务创建

```js
const http = require('http');

// 创建一个web服务器
const server = http.createServer((req, res) => {
  res.end("Hello Server");
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});
```

```js
// 方式二
const server2 = new http.Server((req, res) => {
  res.end("Server2");
});

server2.listen(8001, () => {
  console.log("server2启动成功~");
});
```

## 获取请求信息 request

```js
const http = require('http');

// 创建一个web服务器
const server = http.createServer((req, res) => {
  // request对象中封装了客户端给我们服务器传递过来的所有信息
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);

  res.end("Hello Server");
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});
```



## 响应信息 response

### 响应结果

```js
const http = require('http');

// 创建一个web服务器
const server = http.createServer((req, res) => {

  // 响应结果
  res.write("响应结果一");
  res.end("Hello World");
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});
```

### 设置状态码

```js
const http = require('http');

// 创建一个web服务器
const server = http.createServer((req, res) => {

  // 设置状态码
  // 方式一: 直接给属性赋值
  res.statusCode = 400;
  // 方式二: 和Head一起设置
  res.writeHead(503)

  // 响应结果
  res.write("响应结果一");
  res.end("Hello World");
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});
```

### 设置响应头

```js
const http = require('http');

// 创建一个web服务器
const server = http.createServer((req, res) => {

  // 设置响应的header
  // 设置方式一:
  res.setHeader("Content-Type", "text/plain;charset=utf8");
  // 方式二
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf8"
  });

  // 响应结果
  res.end("<h2>Hello Server</h2>");
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});
```

## 发送网络请求

```js
// http发送post请求
const req = http.request({
  method: 'POST',
  hostname: 'localhost',
  port: 8888
}, (res) => {
  res.on('data', (data) => {
    console.log(data.toString());
  });

  res.on('end', () => {
    console.log("获取到了所有的结果");
  })
});

req.end();
```

## 文件上传案例

```js
const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  if (req.url === '/upload') {
    if (req.method === 'POST') {
      req.setEncoding('binary');

      let body = '';
      const totalBoundary = req.headers['content-type'].split(';')[1];
      const boundary = totalBoundary.split('=')[1];

      req.on('data', (data) => {
        body += data;
      });

      req.on('end', () => {
        console.log(body);
        // 处理body
        // 1.获取image/png的位置
        const payload = qs.parse(body, "\r\n", ": ");
        const type = payload["Content-Type"];

        // 2.开始在image/png的位置进行截取
        const typeIndex = body.indexOf(type);
        const typeLength = type.length;
        let imageData = body.substring(typeIndex + typeLength);

        // 3.将中间的两个空格去掉
        imageData = imageData.replace(/^\s\s*/, '');

        // 4.将最后的boundary去掉
        imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`));

        fs.writeFile('./foo.png', imageData, 'binary', (err) => {
          res.end("文件上传成功~");
        })
      })
    }
  }
});

server.listen(8000, () => {
  console.log("文件上传服务器开启成功~");
})
```

