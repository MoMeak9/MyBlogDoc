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

## JS

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





### Webpack

**热更新实现原理**

依赖express的本地socket服务
