---
icon: edit
date: 2022-03-27
category:
- 前端
- 仓库源码学习 
---

# Axios 源码探秘

> 参照：全栈修仙之路-源码探秘篇 宝哥

Axios 是⼀个基于 Promise 的 HTTP 客户端，同时⽀持浏览器和 Node.js 环境。它是⼀个优秀的 HTTP
客户端，被⼴泛地应⽤在⼤量的 Web 项⽬中。

⽬前 Axios 项⽬的 Star 数为 79.9K，Fork 数也⾼达 7.6K，是⼀个很优秀的开源项⽬，所以接下来阿宝
哥将带⼤家⼀起来分析 Axios 项⽬中⼀些值得借鉴的地⽅。阅读完本章，你将了解以下内容：

HTTP 拦截器的设计与实现；

HTTP 适配器的设计与实现

如何防御 CSRF 攻击。

## ⼀、Axios 简介

Axios 是⼀个基于 Promise 的 HTTP 客户端，拥有以下特性：
⽀持 Promise API；

- 能够拦截请求和响应；
- 能够转换请求和响应数据；
- 客户端⽀持防御 CSRF 攻击；
- 同时⽀持浏览器和 Node.js 环境；
- 能够取消请求及⾃动转换 JSON 数据。

在浏览器端 Axios ⽀持⼤多数主流的浏览器，⽐如 Chrome、Firefox、Safari 和 IE 11。此外，Axios 还
拥有⾃⼰的⽣态：

![image-20220327223641999](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220327223641999.png)

（数据来源 —— https://github.com/axios/axios/blob/master/ECOSYSTEM.md）

简单介绍完 Axios，我们来分析⼀下它提供的⼀个核⼼功能 —— 拦截器。

## ⼆、HTTP 拦截器的设计与实现

### 2.1 拦截器简介

对于⼤多数 SPA 应⽤程序来说， 通常会使⽤ token 进⾏⽤户的身份认证。这就要求在认证通过后，我们需要在每个请求上都携带认证信息。针对这个需求，为了避免为每个请求单独处理，我们可以通过封装统⼀的 request 函数来为每个请求统⼀添加 token 信息。

但后期如果需要为某些 GET 请求设置缓存时间或者控制某些请求的调⽤频率的话，我们就需要不断修改request 函数来扩展对应的功能。此时，如果在考虑对响应进⾏统⼀处理的话，我们的 request 函数将变得越来越庞⼤，也越来越难维护。那么对于这个问题，该如何解决呢？Axios 为我们提供了解决⽅案 —— 拦截器。

Axios 是⼀个基于 Promise 的 HTTP 客户端，⽽ HTTP 协议是基于请求和响应：

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220327223940254.png" alt="image-20220327223940254" style="zoom:67%;" />

所以 Axios 提供了请求拦截器和响应拦截器来分别处理请求和响应，它们的作⽤如下：

- 请求拦截器：该类拦截器的作⽤是在请求发送前统⼀执⾏某些操作，⽐如在请求头中添加 token 字段。
- 响应拦截器：该类拦截器的作⽤是在接收到服务器响应后统⼀执⾏某些操作，⽐如发现响应状态码为 401 时，⾃动跳转到登录⻚。

在 Axios 中设置拦截器很简单，通过 `axios.interceptors.request` 和 `axios.interceptors.response` 对象提供的 use ⽅法，就可以分别设置请求拦截器和响应拦截器：

```ts
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	config.headers.token = 'added by interceptor';
	return config;
});

// 添加响应拦截器
axios.interceptors.response.use(function (data) {
    data.data = data.data + ' - modified by interceptor';
	return data;
});
```

那么拦截器是如何⼯作的呢？在看具体的代码之前，我们先来分析⼀下它的设计思路。Axios 的作⽤是⽤于发送 HTTP 请求，⽽请求拦截器和响应拦截器的本质都是⼀个实现特定功能的函数。

我们可以按照功能把发送 HTTP 请求拆解成不同类型的⼦任务，⽐如有⽤于处理请求配置对象的⼦任务，⽤于发送 HTTP 请求的⼦任务和⽤于处理响应对象的⼦任务。当我们按照指定的顺序来执⾏这些⼦任务时，就可以完成⼀次完整的 HTTP 请求。

了解完这些，接下来我们将从 **任务注册、任务编排和任务调度** 三个⽅⾯来分析 Axios 拦截器的实现。

### 2.2 任务注册

通过前⾯拦截器的使⽤示例，我们已经知道如何注册请求拦截器和响应拦截器，其中请求拦截器⽤于处 理请求配置对象的⼦任务，⽽响应拦截器⽤于处理响应对象的⼦任务。要搞清楚任务是如何注册的，就 需要了解 `axios `和 `axios.interceptors` 对象。

```ts
// lib/axios.js
function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);
    
    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context);
    // Copy context to instance
    utils.extend(instance, context);
    return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);
```

在 Axios 的源码中，我们找到了 `axios` 对象的定义，很明显默认的 `axios` 实例是通过 `createInstance` ⽅法创建的，该⽅法最终返回的是 `Axios.prototype.request` 函数对象。同时， 我们发现了 `Axios` 的构造函数：

```ts
// lib/core/Axios.js
function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    };
}
```

在构造函数中，我们找到了 `axios.interceptors` 对象的定义，也知道了 `interceptors.request` 和`interceptors.response` 对象都是 `InterceptorManager` 类的实例。因此接下来，进⼀步分析 `InterceptorManager` 构造函数及相关的 use ⽅法就可以知道任务是如何注册的：

```ts
// lib/core/InterceptorManager.js
function InterceptorManager() {
    this.handlers = [];
}
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
    });
    // 返回当前的索引，⽤于移除已注册的拦截器
    return this.handlers.length - 1;
};
```

通过观察 use ⽅法，我们可知注册的拦截器都会被保存到 `InterceptorManager` 对象的 `handlers` 属性中。下⾯我们⽤⼀张图来总结⼀下 `Axios` 对象与 `InterceptorManager` 对象的内部结构与关 系：

![image-20220327230345209](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220327230345209.png)

### 2.3 任务编排

现在我们已经知道如何注册拦截器任务，但仅仅注册任务是不够，我们还需要对已注册的任务进⾏编排，这样才能确保任务的执⾏顺序。这⾥我们把完成⼀次完整的 HTTP 请求分为**处理请求配置对象、发起 HTTP 请求和处理响应对象** 3 个阶段。

接下来我们来看⼀下 Axios 如何发请求的：

```ts
axios({
    url: '/hello',
    method: 'get',
}).then(res =>{
    console.log('axios res: ', res)
    console.log('axios res.data: ', res.data)
})
```

通过前⾯的分析，我们已经知道 axios 对象对应的是 `Axios.prototype.request` 函数对象，该函数 的具体实现如下：

![image-20220327232047665](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220327232047665.png)

### 2.4 任务调度

任务编排完成后，要发起 HTTP 请求，我们还需要按编排后的顺序执⾏任务调度。在 Axios 中具体的调 度⽅式很简单，具体如下所示：

```js
// lib/core/Axios.js
Axios.prototype.request = function request(config) {
    // 省略部分代码
    var promise = Promise.resolve(config);
    while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
    }
}
```

因为 chain 是数组，所以通过 while 语句我们就可以不断地取出设置的任务，然后组装成 Promise 调⽤ 链从⽽实现任务调度，对应的处理流程如下图所示：

![image-20220408130254710](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204081302794.png)

下⾯我们来回顾⼀下 Axios 拦截器完整的使⽤流程：

```js
// 添加请求拦截器 —— 处理请求配置对象
axios.interceptors.request.use(function (config) {
    config.headers.token = 'added by interceptor';
    return config;
});
// 添加响应拦截器 —— 处理响应对象
axios.interceptors.response.use(function (data) {
    data.data = data.data + ' - modified by interceptor';
    return data;
});
axios({
    url: '/hello',
    method: 'get',
}).then(res =>{
    console.log('axios res.data: ', res.data)
})
```

参考 Axios 拦截器的设计模型，我们就可以抽出以下通⽤的任务处理模型：

![image-20220408130447315](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204081304375.png)

## 三、HTTP 适配器的设计与实现

### 3.1 默认 HTTP 适配器

Axios 同时⽀持浏览器和 Node.js 环境，对于浏览器环境来说，我们可以通过 `XMLHttpRequest` 或 `fetch` API 来发送 HTTP 请求，⽽对于 Node.js 环境来说，我们可以通过 Node.js 内置的 `http` 或 `https` 模块来发送 HTTP 请求。

 Axios ⽀持⾃定义适配器，同时也提供了默认的适 配器。对于⼤多数场景，我们并不需要⾃定义适配器，⽽是直接使⽤默认的适配器。因此，默认的适配 器就会包含浏览器和 Node.js 环境的适配代码，其具体的适配逻辑如下所示：

```js
// lib/defaults.js
var defaults = {
    adapter: getDefaultAdapter(),
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    //...
}
function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
        // For browsers use XHR adapter
        adapter = require('./adapters/xhr');
    } else if (typeof process !== 'undefined' &&
        Object.prototype.toString.call(process) === '[object process]') {
        // For node use HTTP adapter
        adapter = require('./adapters/http');
    }
    return adapter;
}
```

在 `getDefaultAdapter` ⽅法中，⾸先通过平台中特定的对象来区分不同的平台，然后再导⼊不同的适 配器，具体的代码⽐较简单，这⾥就不展开介绍。

### 3.2 ⾃定义适配器

其实除了默认的适配器外，我们还可以⾃定义适配器...

## 四、CSRF 防御

### 4.1 CSRF 简介

跨站请求伪造（Cross-site request forgery），通常缩写为 CSRF 或者 XSRF， 是⼀种挟制⽤户在当前 已登录的 Web 应⽤程序上执⾏⾮本意的操作的攻击⽅法。 

跨站请求攻击，简单地说，是攻击者通过⼀些技术⼿段欺骗⽤户的浏览器去访问⼀个⾃⼰曾经认证过的 ⽹站并运⾏⼀些操作（如发邮件，发消息，甚⾄财产操作如转账和购买商品）。由于浏览器曾经认证 过，所以被访问的⽹站会认为是真正的⽤户操作⽽去运⾏。

![image-20220408133243984](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204081332065.png)

在上图中攻击者利⽤了 Web 中⽤户身份验证的⼀个漏洞：简单的身份验证只能保证请求发⾃某个⽤户的 浏览器，却不能保证请求本身是⽤户⾃愿发出的。

### 4.2 CSRF 防御措施

#### 4.2.1 检查 Referer 字段

HTTP 头中有⼀个 Referer 字段，这个字段⽤以标明**请求来源于哪个地址**。在处理敏感数据请求时，通常 来说，Referer 字段应和请求的地址位于同⼀域名下。

> **Referer**
>
> Referer 请求头包含了**当前请求来源页面的地址**，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 `Referer` 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。
>
> 在以下两种情况下，`Referer` 不会被发送：
>
> - 来源页面采用的协议为表示本地文件的 "file" 或者 "data" URI；
> - 当前请求页面采用的是非安全协议，而来源页面采用的是安全协议（HTTPS）（协议不同）。

#### 4.2.2 同步表单 CSRF 校验

CSRF 攻击之所以能够成功，是因为服务器⽆法区分正常请求和攻击请求。针对这个问题我们可以要求所 有的⽤户请求都携带⼀个 CSRF 攻击者⽆法获取到的 token。对于 CSRF 示例图中的表单攻击，我们可以 使⽤ **同步表单 CSRF 校验** 的防御措施。 

**同步表单 CSRF 校验** 就是在返回⻚⾯时将 token 渲染到⻚⾯上，在 form 表单提交的时候通过隐藏域或 者作为查询参数把 CSRF token 提交到服务器。⽐如，在同步渲染⻚⾯时，**在表单请求中增加⼀个 _csrf 的查询参数**，这样当⽤户在提交这个表单的时候就会将 CSRF token 提交上来：

```html
<form method="POST" action="/upload?_csrf={{由服务端⽣成}}"
enctype="multipart/form-data">
 ⽤户名: <input name="name" />
 选择头像: <input name="file" type="file" />
 <button type="submit">提交</button>
</form>
```

#### 4.2.3 双重 Cookie 防御

**双重 Cookie 防御** **就是将 token 设置在 Cookie 中**，在提交（POST、PUT、PATCH、DELETE）等请求 时提交 Cookie，**并通过请求头或请求体带上 Cookie 中已设置的 token**，服务端接收到请求后，再进⾏对⽐校验。

```js
let csrfToken = Cookies.get('csrfToken');
function csrfSafeMethod(method) {
    // 以下HTTP⽅法不需要进⾏CSRF防护
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader('x-csrf-token', csrfToken);
        }
    },
});
```

### 4.3 Axios CSRF 防御

介绍完 CSRF 攻击的⽅式和防御⼿段，最后我们来看⼀下 Axios 是如何防御 CSRF 攻击的。

Axios 提供了 xsrfCookieName 和 xsrfHeaderName 两个属性来分别设置 CSRF 的 Cookie 名称和 HTTP 请求头的名称，它们的默认值如下所示：

```js
// lib/defaults.js
var defaults = {
    adapter: getDefaultAdapter(),
    // 省略部分代码
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
};
```

前⾯我们已经知道在不同的平台中，Axios 使⽤不同的适配器来发送 HTTP 请求，这⾥我们以浏览器平 台为例，来看⼀下 Axios 如何防御 CSRF 攻击：

```js
// lib/adapters/xhr.js
module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestHeaders = config.headers;

        var request = new XMLHttpRequest();
        // 省略部分代码

        // 添加xsrf头部
        if (utils.isStandardBrowserEnv()) {
            var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) &&
            config.xsrfCookieName ?
                cookies.read(config.xsrfCookieName) :
                undefined;
            if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
            }
        }
        request.send(requestData);
    });
};
```

看完以上的代码，相信⼩伙伴们就已经知道答案了，原来 Axios 内部是使⽤ **双重 Cookie 防御** 的⽅案来 防御 CSRF 攻击。好的，到这⾥本章的主要内容都已经介绍完了，其实 Axios 项⽬还有⼀些值得我们借 鉴的地⽅，⽐如 CancelToken 的设计、异常处理机制等，感兴趣的⼩伙伴可以⾃⾏学习⼀下。

