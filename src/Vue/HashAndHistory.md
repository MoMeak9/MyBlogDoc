# 前端路由 hash 与 history 差异

## 储备知识

### 网页URL组成部分

| 属性               | 含义     |
| ------------------ | -------- |
| location.protocal  | 协议     |
| location.hostname  | 主机名   |
| location.host      | 主机     |
| location.port      | 端口号   |
| location.patchname | 访问页面 |
| location.search    | 搜索内容 |
| location.hash      | 哈希值   |

### history API

`HTML5` 新增的 `history API`

| API                                           | 定义                                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| history.**pushState**(data, title [, url])    | pushState主要用于**往历史记录堆栈顶部添加一条记录**。各参数解析如下：**①data**会在onpopstate事件触发时作为参数传递过去；**②title**为页面标题，当前所有浏览器都会忽略此参数；③**url**为页面地址，可选，缺少时表示为当前页地址 |
| history.**replaceState**(data, title [, url]) | 更改当前的历史记录，参数同上； 上面的pushState是添加，这个更改 |
| history.**state**                             | 用于存储以上方法的data数据，不同浏览器的读写权限不一样       |
| window.**onpopstate**                         | 每当激活同一文档中不同的历史记录条目时，`popstate` 事件就会在对应的 `window` 对象上触发。 |

> 调用 `history.pushState()` 或者 `history.replaceState()` 不会触发 `popstate` 事件。`popstate` 事件只会在浏览器某些行为下触发，比如点击后退按钮（或者在 JavaScript 中调用 `history.back()` 方法）。即，在同一文档的两个历史记录条目之间导航会触发该事件。

## hash模式

**工具人：**

- `window.location.hash`

- `onhashchange()`事件

**简介：**hash模式是开发中默认的模式，它的URL带着一个#，例如：[www.abc.com/#/mock]()，它的hash值就是`#/mock`，hash指的是地址中#号以及后面的字符，也称为散列值。hash也称作锚点，本身是用来做页面跳转定位的。。

**特点：**

- hash值会出现在URL里面，但是不会出现在HTTP请求中，对后端完全没有影响。所以改变hash值，不会重新加载页面。这种模式的浏览器支持度（兼容性）好，低版本的IE浏览器也支持这种模式。hash路由被称为是前端路由，已经成为SPA（单页面应用）的标配。
- 所有页面的跳转都是在客户端进行操作。因此，并不算是一次 `http` 请求，所以这种模式不利于 `SEO` 优化。`hash` 只能修改 `#` 后面的部分，所以只能跳转到与当前 `url` 同文档的 `url` 。

**原理：**hash模式的主要原理就是使用`window.location.hash`属性及`window.onhashchange()`事件：

```javascript
// 设置 url 的 hash，会在当前url后加上'#aabb'
window.location.hash='aabb';

window.addEventListener('hashchange',function(){
	// 监听hash变化
})
```

使用onhashchange()事件的好处就是，在页面的hash值发生变化时，无需向后端发起请求，window就可以监听事件的改变，并按规则加载相应的代码。除此之外，hash值变化对应的URL都会被浏览器记录下来，这样浏览器就能实现页面的前进和后退。虽然是没有请求后端服务器，但是页面的hash值和对应的URL关联起来了。

注意：页面第一次加载完不会触发 hashchange，因而在具体实践中通过监听load事件来获取hash值，再将视图渲染成对应的内容。

```js
window.addEventListener('DOMContentLoaded', () => {
    ......
})
```

### 触发情况

1.  浏览器地址栏散列值的变化（包括浏览器的前进、后退），从而使得`window.location.hash`值的变化，触发`onhashchange`事件（包括对`window.location.hash`的直接赋值）
2. **输入浏览器地址栏中URL包含哈希值**，如 `http://www.google.com/#/home`，这时按下输入，浏览器发送`http://www.baidu.com/`请求至服务器，请求完毕之后设置散列值为`#/home`，进而触发onhashchange事
3. **修改浏览器地址栏URL的哈希部分**，这时按下回车，浏览器不会发送任何请求至服务器，而是只设置散列值新修改的哈希值，并触发onhashchange事件
4. **html中`<a>`标签的属性 href 设置为页面的元素id**，如 `#top`实现跳转，当点击该链接时页面跳转至该id元素所在区域，同时浏览器自动设置 `window.location.hash` 属性，地址栏中的哈希值也会发生改变，并触发`onhashchange`事件；

## history 模式

**工具人：**

- `window.history.state`
- `onpopstate()`事件

操作历史记录：

- `history.pushState ` 往历史记录堆栈顶部添加一条记录

- `history.replaceState` 更改当前的历史记录

**概述：**

`history API` 是 `H5` 提供的新特性，允许开发者**直接更改前端路由**，即更新浏览器 `URL` 地址而**不重新发起请求**。

window.history 属性指向 History 对象，它表示当前窗口的浏览历史。当发生改变时，只会改变页面的路径，不会刷新页面。 History 对象保存了当前窗口访问过的所有页面网址。通过 history.length 可以得出当前窗口一共访问过几个网址。 由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航。 浏览器工具栏的“前进”和“后退”按钮，其实就是对 History 对象进行操作。

**API：** history api可以分为两大部分，切换历史状态和修改历史状态：

- **修改历史状态**：包括了 HTML5 History Interface 中新增的 `pushState()` 和 `replaceState()` 方法，这两个方法应用于浏览器的历史记录栈，提供了对历史记录进行修改的功能。只是当他们进行修改时，虽然修改了url，但浏览器不会立即向后端发送请求。如果要做到改变url但又不刷新页面的效果，就需要前端用上这两个API。
- **切换历史状态：** 包括`forward()`、`back()`、`go()`三个方法，对应浏览器的前进，后退，跳转操作。

### 触发情况

仅仅调用pushState()方法或replaceState()方法 ，并不会触发该事件; 只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用History.back()、History.forward()、History.go()方法时才会触发。

实际上的直接进行的router.push操作，是使用pushState()创建历史记录后，直接改变路由内的视图，同时达到对历史纪录的存储而不对服务器进行请求。而后退的时候触发会onpopstate()事件，通过监听此事件改变视图内容。

该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。 页面第一次加载的时候，浏览器不会触发popstate事件。 

回调函数的参数是一个 event 事件对象，它的 state 属性指向当前的 state 对象。

```js
window.addEventListener('popstate', function(e) {
	//e.state 相当于 history.state
});
```

#### history.pushState 和 history.push 区别

- history.pushState () 不会向服务器发送请求，只会改变浏览器地址栏中的地址，并且把地址记录到历史记录中，所以可以实现客户端路由 另外，IE10 以后才支持
- history.push () 路径发生变化，需要向服务器发送请求

### 缺陷和补救

history 致命的缺点就是当改变页面地址后，强制刷新浏览器时，（如果后端没有做准备的话）会报错，因为刷新是拿当前地址去请求服务器的，如果服务器中没有相应的响应，会出现 404 页面。

对于 `history` 来说，确实解决了不少 `hash` 存在的问题，但是也带来了新的问题。**具体如下：**

- 使用 `history` 模式时，在对当前的页面进行刷新时，此时浏览器会重新发起请求。如果 `nginx` 没有匹配得到当前的 `url` ，就会出现 `404` 的页面。
- 而对于 `hash` 模式来说，  它虽然看着是改变了 `url` ，但不会被包括在 `http` 请求中。所以，**它算是被用来指导浏览器的动作，并不影响服务器端**。因此，改变 `hash` 并没有真正地改变 `url` ，所以页面路径还是之前的路径， `nginx` 也就不会拦截。
- 因此，在使用 `history` 模式时，需要**通过服务端来允许地址可访问**，如果没有设置，就很容易导致出现 `404` 的局面。



> 参考：
>
> [hash和hashchange事件](https://blog.csdn.net/qq_36671474/article/details/79975846)
