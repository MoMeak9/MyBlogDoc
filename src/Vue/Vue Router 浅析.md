---
date: 2022-04-13
category:
- Vue
---

# Vue Router 浅析

## 路由原理hash和history

众所周知， `hash` 和 `history` 在前端面试中是很常考的一道题目。在学习本文内容之前，周一对 `hash` 和 `history` 的认知可能就在 `hash` 的 `url` 里面多了个 `#` ，而 `history` 就不会。然后，我认知里还有一个是只有 `history` 才能做前后端分离，而 `hash` 跟前后端分离没有关系。

对于前端路由来说， `hash` 和 `history` 都可以用于前后端分离项目，且两者有各自的特点和各自的使用场景，在使用过程中主要要了解当前项目所处的场景，以便于更好地判断使用哪一种路由模式更佳。

### 前端路由原理

#### SPA

**SPA**，即**单页面应用**(Single Page Application)。所谓单页 `Web` 应用，就是只有一张 `Web` 页面的应用。单页应用程序 (SPA) 是加载单个 `HTML` 页面并在**用户与应用程序交互时**动态更新该页面的 `Web` 应用程序。浏览器一开始会加载必需的 `HTML` 、 `CSS` 和 `JavaScript` ，所有的操作都在这张页面上完成，都由 `JavaScript` 来控制。

现如今，为了配合单页面 `Web` 应用快速发展的节奏，各类**前端组件化技术栈**层出不穷。近几年来，通过不断的版本迭代， `vue` 和 `react` 两大技术栈脱颖而出，成为当下最受欢迎的两大技术栈。

#### 什么时候需要路由

对于现代开发的项目来说，稍微复杂一点的 `SPA` ，都需要用到**路由**。而 `vue-router` 正是 `vue` 的路由标配，且 `vue-router` 有**两种模式**： `hash` 和 `history` 。

### Hash模式

`hash` 模式是一种把前端路由的路径用井号 `#` 拼接在真实 `url` 后面的模式。当井号 `#` 后面的路径发生变化时，浏览器并不会重新发起请求，<u>而是会触发 `onhashchange` 事件</u>。

#### 网页url组成部分

**（1）了解几个url的属性**

| 属性               | 含义     |
| ------------------ | -------- |
| location.protocal  | 协议     |
| location.hostname  | 主机名   |
| location.host      | 主机     |
| location.port      | 端口号   |
| location.patchname | 访问页面 |
| location.search    | 搜索内容 |
| location.hash      | 哈希值   |

**（2）演示**

**下面用一个网址来演示以上属性：**

```js
//http://127.0.0.1:8001/01-hash.html?a=100&b=20#/aaa/bbb
location.protocal // 'http:'
localtion.hostname // '127.0.0.1'
location.host // '127.0.0.1:8001'
location.port //8001
location.pathname //'01-hash.html'
location.serach // '?a=100&b=20'
location.hash // '#/aaa/bbb'
复制代码
```

#### Hash的特点

- hash变化会触发网页跳转，即浏览器的前进和后退。

- `hash` 可以改变 `url` ，但是不会触发页面重新加载（hash的改变是记录在 `window.history` 中），即不会刷新页面。也就是说，所有页面的跳转都是在客户端进行操作。因此，这并不算是一次 `http` 请求，所以这种模式不利于 `SEO` 优化。`hash` 只能修改 `#` 后面的部分，所以只能跳转到与当前 `url` 同文档的 `url` 。

- `hash` 通过 `window.onhashchange` 的方式，来监听 `hash` 的改变，借此实现无刷新跳转的功能。

- `hash` 永远不会提交到 `server` 端（可以理解为只在前端自生自灭）。

#### 代码实现

```html
<!DOCTYPE html>
<html lang="en">
<body>
<ul>
    <ul>
        <!-- 定义路由 -->
        <li><a href="#/home">home</a></li>
        <li><a href="#/about">about</a></li>

        <!-- 渲染路由对应的 UI -->
        <div id="routeView"></div>
    </ul>
</ul>
</body>
<script>
    let routerView = routeView
    window.addEventListener('hashchange', ()=>{
        let hash = location.hash;
        routerView.innerHTML = hash
    })
    window.addEventListener('DOMContentLoaded', ()=>{
        if(!location.hash){//如果不存在hash值，那么重定向到#/
            location.hash="/"
        }else{//如果存在hash值，那就渲染对应UI
            let hash = location.hash;
            routerView.innerHTML = hash
        }
    })
</script>
</html>
```

解释下上面代码，其实很简单：

1. 我们通过a标签的href属性来改变URL的hash值（当然，你触发浏览器的前进后退按钮也可以，或者在控制台输入window.location赋值来改变hash）
2. 我们监听**hashchange**事件。一旦事件触发，就改变**routerView**的内容，若是在vue中，这改变的应当是**router-view**这个组件的内容
3. **为何又监听了load事件？这时应为页面第一次加载完不会触发 hashchange**，因而用load事件来监听hash值，再将视图渲染成对应的内容。

### History模式

`history API` 是 `H5` 提供的新特性，允许开发者**直接更改前端路由**，即更新浏览器 `URL` 地址而**不重新发起请求**。

#### 与hash的区别

**正常页面浏览**

```bash
https://github.com/xxx 刷新页面

https://github.com/xxx/yyy 刷新页面

https://github.com/xxx/yyy/zzz 刷新页面
```

**改造H5 history模式**

```bash
https://github.com/xxx 刷新页面

https://github.com/xxx/yyy 前端跳转，不刷新页面

https://github.com/xxx/yyy/zzz 前端跳转，不刷新页面
```

#### history的API

下面阐述几种 `HTML5` 新增的 `history API` 。**具体如下表（实现方式）：**

| API                                           | 定义                                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| history.**pushState**(data, title [, url])    | pushState主要用于**往历史记录堆栈顶部添加一条记录**。各参数解析如下：**①data**会在onpopstate事件触发时作为参数传递过去；**②title**为页面标题，当前所有浏览器都会忽略此参数；③**url**为页面地址，可选，缺少时表示为当前页地址 |
| history.**replaceState**(data, title [, url]) | 更改当前的历史记录，参数同上； 上面的pushState是添加，这个更改 |
| history.state                                 | 用于存储以上方法的data数据，不同浏览器的读写权限不一样       |
| window.**onpopstate**                         | 响应pushState或者replaceState的调用                          |

#### 代码实现

```html
<!DOCTYPE html>
<html lang="en">
<body>
<ul>
    <ul>
        <li><a href='/home'>home</a></li>
        <li><a href='/about'>about</a></li>

        <div id="routeView"></div>
    </ul>
</ul>
</body>
<script>
    let routerView = routeView
    window.addEventListener('DOMContentLoaded', onLoad)
    window.addEventListener('popstate', ()=>{
        routerView.innerHTML = location.pathname
    })
    function onLoad () {
        routerView.innerHTML = location.pathname
        var linkList = document.querySelectorAll('a[href]')
        linkList.forEach(el => el.addEventListener('click', function (e) {
            e.preventDefault()
            history.pushState(null, '', el.getAttribute('href'))
            routerView.innerHTML = location.pathname
        }))
    }

</script>
</html>
```

解释下上面代码，其实也差不多：

1. 我们通过a标签的href属性来改变URL的path值（当然，你触发浏览器的前进后退按钮也可以，或者在控制台输入history.go,back,forward赋值来触发popState事件）。这里需要注意的就是，当改变path值时，默认会触发页面的跳转，所以需要拦截` <a>` 标签点击事件默认行为， 点击时使用 pushState 修改 URL并更新手动 UI，从而实现点击链接更新 URL 和 UI 的效果。
2. 我们监听**popState**事件。一旦事件触发，就改变**routerView**的内容。
3. load事件则是一样的，这时应为页面第一次加载完不会触发。

#### 存在问题

对于 `history` 来说，确实解决了不少 `hash` 存在的问题，但是也带来了新的问题。**具体如下：**

- 使用 `history` 模式时，在对当前的页面进行刷新时，此时浏览器会重新发起请求。如果 `nginx` 没有匹配得到当前的 `url` ，就会出现 `404` 的页面。
- 而对于 `hash` 模式来说，  它虽然看着是改变了 `url` ，但不会被包括在 `http` 请求中。所以，**它算是被用来指导浏览器的动作，并不影响服务器端**。因此，改变 `hash` 并没有真正地改变 `url` ，所以页面路径还是之前的路径， `nginx` 也就不会拦截。
- 因此，在使用 `history` 模式时，需要**通过服务端来允许地址可访问**，如果没有设置，就很容易导致出现 `404` 的局面。

#### 两者选择

下面我们再来介绍下在实际的项目中，如何对这两者进行选择。**具体如下：**

- `to B` 的系统推荐用 `hash` ，相对简单且容易使用，且因为 `hash` 对 `url` 规范不敏感；
- `to C` 的系统，可以考虑选择 `H5 history` ，但是需**要服务端支持**；
- 能先用简单的，就别用复杂的，**要考虑成本和收益**。

### History路由模式下的Nginx配置。

#### Index.html存在服务器本地

这种方式应该是非常普遍的, 在VueRouter的官方文档中也提到了, 只需要配置一个<u>location try_files</u>默认指向index.html即可。

```awk
location / {
  add_header Cache-Control 'no-store, no-cache'; // 设置不缓存
  try_files $uri $uri/ /index.html;
}
```

**举例**

1. 要访问的基础页面Url是 [https://a.b.com/main/,](https://link.segmentfault.com/?enc=vm2ghX%2BHTv6A6fAgNJzMCw%3D%3D.c46jV4nu48mP9hFU1bjfXXzM5SGf1bOePpNTAoq%2Fk8A%3D) 并且index.html存储在服务器的/home/dist/index.html下

```awk
// 配置在a.b.com域名下
location /main/ {
  try_files $uri $uri/ /home/dist/index.html;
}
```

这样的配置就可以实现访问 https://a.b.com/main/a/ 或者 https://a.b.com/main/b/, 即访问 https://a.b.com/main/ 下的任意子路径, 都可以直接访问到index.html, 正常访问页面。

#### Index.html存在远程地址

有的时候我们的index.html并不会存在于服务器本地上，而是有可能上传到了oss或者cdn上，也就是一个远程的地址，比如 [https://oss.b.com/project/ind...](https://link.segmentfault.com/?enc=vuhQrAJ4M5ObfcoTW9j40A%3D%3D.r%2FdBpqNDtno4KM5kYaZVz0Iqy2Fj9Vgg7VC73CfFMtoAk37YfLYiClphtVtRj%2Fkf) 这时候就需要下面的这种配置方式了。

<u>（rewrite和proxy_pass）</u>

```awk
location ^~ /test/ {
    add_header Cache-Control 'no-store, no-cache'; // 设置不缓存
    rewrite ^ /project/index.html break;
    proxy_pass https://oss.b.com;
}
```

也就是先重写访问路径, 再通过proxy_pass代理到远端文件。

**举例**

1. 要访问的基础页面Url是 [https://a.b.com/main/,](https://link.segmentfault.com/?enc=11gS3fhgRHPqAcnczJM%2FlQ%3D%3D.wRxVkT1Zv%2FUMQ4fxcry6tojXyEyKeKOnKp5qYabapxM%3D) 并且index.html存储在 [https://oss.b.com/project/ind...](https://link.segmentfault.com/?enc=G9aqPshcDD4ms84kYn95qA%3D%3D.9V3UFtr545rHpg6UisCiEgsmKlg4n0vjUHHKiGXLF3JlgiJvy3Ox8qk6UxYpQ%2Ffu) 下

```awk
// 配置在a.b.com域名下
location /main/ {
    rewrite ^ /project/index.html break;
    proxy_pass https://oss.b.com;
}
```

这样的配置就可以实现访问 https://a.b.com/main/a/ 或者 https://a.b.com/main/b/, 即访问 https://a.b.com/main/ 下的任意子路径, 都可以直接访问到index.html, 正常访问页面。
