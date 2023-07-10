---
date: 2022-12-26
star: true
category:
- 前端
- JavaScript
- 浏览器
---

# 来认识一下实用的、好用的：URL API

JavaScript 代码经常需要操作URL，目前，Node和所有浏览器（除了IE）之外，都实现了URL类用于对其的操作，但它并不是ES标准定义的。这个类是在WHATWG中标准化的。

使用`URL()` 构造器函数创建URL对象时，可以传入1个绝对URL作为参数，也可以传入2个参数，第一个作为相对URL，第二个传入绝对URL作为base URL。

```js
const myURL = new URL('https://example.org/foo');
// or
const myURL = new URL('/foo', 'https://example.org/');
```

可以获取到:

```js
URL {
  href: 'https://example.org/foo',
  origin: 'https://example.org',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'example.org',
  hostname: 'example.org',
  port: '',
  pathname: '/foo',
  search: '',
  searchParams: URLSearchParams {},
  hash: ''
}
```
除了支持http协议，同样还支持例如ftp协议等，并且我们对其属性的修改也会直接反应到href上。

### 有意思的特性

当 URL 路径或者查询参数中，带有中文或者特殊字符的时候，就需要对 URL 进行编码（采用十六进制编码格式）。URL 编码的原则是使用安全字符去表示那些不安全的字符。

> 安全字符，指的是没有特殊用途或者特殊意义的字符。

URL 之所以需要编码，是因为 URL 中的某些字符会引起歧义，比如 URL 查询参数中包含了”&”或者”%”就会造成服务器解析错误；再比如，URL 的编码格式采用的是 ASCII 码而非 Unicode 格式，这表明 URL 中不允许包含任何非 ASCII 字符（比如中文），否则就会造成 URL 解析错误。

URL 编码协议规定（RFC3986 协议）：URL 中只允许使用 ASCII 字符集可以显示的字符，比如英文字母、数字、和- _ . ~ ! *这 6 个特殊字符。当在 URL 中使用不属于 ASCII 字符集的字符时，就要使用特殊的符号对该字符进行编码，比如空格需要用%20来表示。

> **参考：**
>
> [URL编码/解码详解_睿科知识云的博客-CSDN博客_url解码](https://blog.csdn.net/ccc369639963/article/details/123398268)
>
> [URL - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/URL)
