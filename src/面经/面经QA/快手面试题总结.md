---
icon: edit
date: 2022-03-15
category:
- 面经
- 快手
---

# 快手面试题总结

## CSS

**BFC**

直译成：块级格式化上下文，是一个独立的渲染区域，并且有一定的布局规则。BFC 区域不会与 float box 重叠。BFC 是页面上的一个独立容器，子元素不会影响到外面计算 BFC 的高度时，浮动元素也会参与计算。

根元素
float 不为 none 的元素
position 为 fixed 和 absolute 的元素
display 为 inline-block、table-cell、table-caption，flex，inline-flex 的元素
overflow 不为 visible 的元

**优先级**

![image-20220331121644231](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220331121644231.png)

**判定以下输出**

```js
function A(){
    this.a=1
    return{
        a:2
    }
}
A.prototype.a=3
const a = new A()

console.log(a.a) // 强绑定返回对象的创建  2
console.log(a.constructor) // 构造函数 [Function: Object]
console.log(a.__proto__) // 构造函数原型  [Object: null prototype] {}
```

```js
function A(){
    this.a=1
}
A.prototype.a=3
const a = new A()

console.log(a.a) // 强绑定对象a的构造，访问this.a
console.log(a.constructor) // 构造函数 [Function: A]
console.log(a.__proto__) // 构造函数原型 { a: 3 } 被指定
```

**[剑指 Offer 52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)**/ [**160. 相交链表**](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

> 哈希集合

```js
var getIntersectionNode = function(headA, headB) {
    const visited = new Set();
    let temp = headA;
    while (temp !== null) {
        visited.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while (temp !== null) {
        if (visited.has(temp)) {
            return temp;
        }
        temp = temp.next;
    }
    return null;
};
```

> 双指针

```js
var getIntersectionNode = function(headA, headB) {
    if (headA === null || headB === null) {
        return null;
    }
    let pA = headA, pB = headB;
    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }
    return pA;
};
```

> 节点标记

## Node

```js
const http = require('http');
 
const server = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
})
 
server.listen(1337,'127.0.0.1'); // 不一定加上地址
console.log('Server running at http://127.0.0.1:1337/');
```

##  计算机网络

**CA如何工作**

CA是证书的签发机构,它是PKI的核心。CA是负责签发证书、认证证书、管理已颁发证书的机关。它要制定政策和具体步骤来验证、识别用户身份，并对用户证书进行签名，以确保证书持有者的身份和公钥的拥有权。

CA 也拥有一个证书（内含公钥）和私钥。网上的公众用户通过验证 CA 的签字从而信任 CA ，任何人都可以得到 CA 的证书（含公钥），用以验证它所签发的证书。

如果用户想得到一份属于自己的证书，他应先向 CA 提出申请。在 CA 判明申请者的身份后，便为他分配一个公钥，并且 CA 将该公钥与申请者的身份信息绑在一起，并为之签字后，便形成证书发给申请者。

如果一个用户想鉴别另一个证书的真伪，他就用 CA 的公钥对那个证书上的签字进行验证，一旦验证通过，该证书就被认为是有效的。

用户向本地

DNS 服务器发起请求属于递归请求，本地 DNS 服务器向各级域名服务器发起请求属于迭代请求。

### Webpack

**热更新实现原理**

依赖express的本地socket服务

### Vue

Vue实现数据双向绑定主要利用的就是: **数据劫持**和**发布订阅模式**。
所谓发布订阅模式就是，定义了对象间的一种**一对多的关系**，**让多个观察者对象同时监听某一个主题对象，当一个对象发生改变时，所有依赖于它的对象都将得到通知**。
所谓数据劫持，就是**利用JavaScript的访问器属性**，即**Object.defineProperty()方法**，当对对象的属性进行赋值时，Object.defineProperty就可以**通过set方法劫持到数据的变化**，然后**通知发布者(主题对象)去通知所有观察者**，观察者收到通知后，就会对视图进行更新。

可以使用 OPTIONS 方法对服务器发起请求，以检测服务器支持哪些 HTTP 方法：

### TypeScript中interface和type

1、声明方式不同

2、类型别名（type）还可以用于其他类型，如基本类型（原始值）、联合类型、元组

3、扩展时语法不同，且interface无法扩展联合类型的type

4、interface可以定义多次，并将被视为单个接口(合并所有声明的成员)；type不可以

5、interfac可以extends class，class也可以implements interface

6、type支持计算属性，生成映射类型，interface不可以

- type 能使用 in 关键字生成映射类型，但 interface 不行
- 语法与索引签名的语法类型，内部使用了 for .. in

### 进程间通信方式

- 匿名管道( pipe )：管道是一种半双工的通信方式，数据只能单向流动，而且只能在具有亲缘关系的进程间使用。进程的亲缘关系通常是指父子进程关系。
- 高级管道( popen )：将另一个程序当做一个新的进程在当前程序进程中启动，则它算是当前程序的子进程，这种方式我们成为高级管道方式。
- 有名管道 (FIFO) ： 有名管道也是半双工的通信方式，但是它允许无亲缘关系进程间的通信。
- 消息队列( message queue ) ： 消息队列是由消息的链表，存放在内核中并由消息队列标识符标识。消息队列克服了信号传递信息少、管道只能承载无格式字节流以及缓冲区大小受限等缺点。
- 信号量( semophore ) ： 信号量是一个计数器，可以用来控制多个进程对共享资源的访问。
- 信号 ( sinal ) ： 信号是一种比较复杂的通信方式，用于通知接收进程某个事件已经发生。
- 共享内存( shared memory ) ：共享内存就是映射一段能被其他进程所访问的内存，这段共享内存由一个进程创建，但多个进程都可以访问。
- 套接字( socket ) ： 套接口也是一种进程间通信机制，与其他通信机制不同的是，它可用于不同机器间的进程通信。
