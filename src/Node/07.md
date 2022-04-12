---
icon: edit
date: 2022-04-08
category:
- Node
---
# Node 笔记（7）Buffer的使用

我们会发现，对于前端开发来说，通常很少会和二进制打交道，但是对于服务器端为了做很多的功能，我们必须直接去操 作其二进制的数据；所以Node为了可以方便开发者完成更多功能，提供给了我们一个类Buffer，并且它是全局的。

**我们前面说过，Buffer中存储的是二进制数据，那么到底是如何存储呢？**

- 我们可以将Buffer看成是一个存储二进制的数组；
- 这个数组中的每一项，可以保存8位二进制： 00000000

**为什么是8位呢？**

- 在计算机中，很少的情况我们会直接操作一位二进制，因为一位二进制存储的数据是非常有限的；
- 所以通常会将8位合在一起作为一个单元，这个单元称之为一个字节（byte）；
- 也就是说 1byte = 8bit，1kb=1024byte，1M=1024kb;
- 比如很多编程语言中的int类型是4个字节，long类型时8个字节；
- 比如TCP传输的是字节流，在写入和读取时都需要说明字节的个数；
- 比如RGB的值分别都是255，所以本质上在计算机中都是用一个字节存储的；

## Buffer和字符串

```js
const buffer = Buffer.from(message);
console.log(buffer);
```

 Buffer相当于是一个字节的数组，数组中的每一项对于一个字节的大小：

![image-20220410201959635](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204102019733.png)

对中文，默认编码：utf-8，可以切换编码

```js
const message = "你好啊";
const buffer = Buffer.from(message, 'utf16le');
console.log(buffer);
console.log(buffer.toString('utf16le'));
```

## Buffer.alloc

```js
// 通过alloc的方式创建Buffer
const buffer = Buffer.alloc(8); // 创建了一个8位长度的Buffer，里面所有的数据默认为00
console.log(buffer);

buffer[0] = 88;
buffer[1] = 0x88;
console.log(buffer);
```

## Buffer和文件读取

```js
const fs = require('fs');
const sharp = require('sharp');

// 读取文本文件
fs.readFile("./foo.txt", (err, data) => {
  console.log(data);
  console.log(data.toString());
});

// 读取图片文件
fs.readFile("./bar.png", (err, data) => {
  console.log(data);

  fs.writeFile("./foo.png", data, err => {
    console.log(err);
  });
});

// sharp库的使用
sharp('./bar.png')
  .resize(200, 200)
  .toFile('./baz.png');

sharp('./foo.png')
  .resize(300, 300)
  .toBuffer()
  .then(data => {
    fs.writeFile('./bax.png', data, err => console.log(err));
  })
```

