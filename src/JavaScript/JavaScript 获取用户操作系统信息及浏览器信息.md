---
date: 2022-12-31
category:
- 前端
---

# JavaScript 获取用户操作系统信息及浏览器信息

部分项目场景中可能需要检测用户当前的浏览器环境，比如当前操作系统是window还是iOS，检测用户是通过什么浏览器访问的（Chrome、IE 等）。网上很多类似的代码，但是随着标准和浏览器更迭有所变动，特此汇总。

## window.navigator 属性

只读属性 **`Window.navigator`** 会返回一个 [`Navigator`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator) 对象的引用，可以用于请求运行当前代码的应用程序的相关信息。

```js
const navigatorObject = window.navigator
```

![image-20230115215017732](https://cdn.yihuiblog.top/images/202301152204381.png)

其中常用的属性有：

| 属性名 | 作用 |
| --- | --- |
|appCodeName   |    返回浏览器的代码名 |   
|appMinorVersion   | 返回浏览器的次级版本   | 
|appName           |    返回浏览器的名称    |
|appVersion       |    返回浏览器的平台和版本信息 |  
|browserLanguage  |  返回当前浏览器的语言  |
|cookieEnabled    |  返回指明浏览器中是否启用 cookie 的布尔值    |
|cpuClass           |    返回浏览器系统的 CPU 等级|
|onLine          |        返回指明系统是否处于脱机模式的布尔值。    
|platform        |         返回运行浏览器的操作系统平台   |
|systemLanguage  |  返回 OS 使用的默认语言    |
|userAgent      |       返回由客户机发送服务器的 user-agent 头部的值   |
|userLanguage  |  返回 OS 的自然语言设置|

## 获取客户端操作系统信息

简单法：
```js
console.log(window.navigator.platform);
```

自定方法：
```js
export function getUserOsInfo() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Windows NT 10.0") !== -1) return "Windows 10";
    if (userAgent.indexOf("Windows NT 6.2") !== -1) return "Windows 8";
    if (userAgent.indexOf("Windows NT 6.1") !== -1) return "Windows 7";
    if (userAgent.indexOf("Windows NT 6.0") !== -1) return "Windows Vista";
    if (userAgent.indexOf("Windows NT 5.1") !== -1) return "Windows XP";
    if (userAgent.indexOf("Windows NT 5.0") !== -1) return "Windows 2000";
    if (userAgent.indexOf("Mac") !== -1) return "Mac/iOS";
    if (userAgent.indexOf("X11") !== -1) return "UNIX";
    if (userAgent.indexOf("Linux") !== -1) return "Linux";
    return "Other";
}
```

`navigator.userAgent`只读属性实际返回关于你运行信息的字符串
```js
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
```

## 获取用户浏览器信息

```js
// 获取浏览器类型
export function getBrowserType () {
  let ua = navigator.userAgent.toLocaleLowerCase()
  let browserType = null
  if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
    browserType = 'IE'
  } else if (ua.match(/firefox/) != null) {
    browserType = 'firefox'
  } else if (ua.match(/ucbrowser/) != null) {
    browserType = 'UC'
  } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
    browserType = 'opera'
  } else if (ua.match(/bidubrowser/) != null) {
    browserType = 'baidu'
  } else if (ua.match(/metasr/) != null) {
    browserType = 'sougou'
  } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
    browserType = 'QQ'
  } else if (ua.match(/maxthon/) != null) {
    browserType = 'maxthon'
  } else if (ua.match(/chrome/) != null) {
    var is360 = _mime('type', 'application/vnd.chromium.remoting-viewer')
    if (is360) {
      browserType = '360'
    } else {
      browserType = 'chrome'
    }
  } else if (ua.match(/safari/) != null) {
    browserType = 'Safari'
  } else {
    browserType = 'others'
  }
  return browserType
}
```

## 风险

以上场景主要使用`navigator.userAgent`进行识别，但基于检测用户代理字符串agent string的浏览器识别是比较不可靠的，因为用户代理字符串是用户可配置的。例如：

-   在 Firefox 中，你可以在 `about:config` 中更改首选项 `general.useragent.override`。一些火狐扩展是这样做的。但是，这只会更改发送并由`navigator.userAgent`返回的HTTP标头。可能还有其他方法利用 JavaScript 代码来识别浏览器。
-   Opera 6+ 允许用户通过菜单设置浏览器标识字符串。
-   Microsoft Internet Explorer使用Windows注册表。
-   Safari 和 iCab 允许用户通过菜单将浏览器用户代理字符串更改为预定义的 Internet Explorer 或 Netscape 字符串。
