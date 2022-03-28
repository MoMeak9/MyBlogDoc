---
icon: edit
date: 2022-03-27
category:
- 前端
- 仓库源码学习 
---

> 参照：全栈修仙之路-源码探秘篇

Axios 是⼀个基于 Promise 的 HTTP 客户端，同时⽀持浏览器和 Node.js 环境。它是⼀个优秀的 HTTP
客户端，被⼴泛地应⽤在⼤量的 Web 项⽬中。

⽬前 Axios 项⽬的 Star 数为 79.9K，Fork 数也⾼达 7.6K，是⼀个很优秀的开源项⽬，所以接下来阿宝
哥将带⼤家⼀起来分析 Axios 项⽬中⼀些值得借鉴的地⽅。阅读完本章，你将了解以下内容：

HTTP 拦截器的设计与实现；

HTTP 适配器的设计与实现

如何防御 CSRF 攻击。

### ⼀、Axios 简介

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

### ⼆、HTTP 拦截器的设计与实现

2.1 拦截器简介

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

2.3 任务编排

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
