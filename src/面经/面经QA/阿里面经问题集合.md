# 阿里面经问题集合 

> 收入一些不太会的

## 阿里巴巴ICBU

1. webpack怎么提高构建速度？

   减少 resolve 的解析

   把 loader 应用的文件范围缩小，例如 node_modules 目录下的其他依赖类库文件，基本就是直接编译好可用的代码，无须再经过 loader 处理了

   利用缓存提升构建速度，利用缓存提升构建速度

2. 外部扩展(externals) 排除啥？

   就是webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。

   有时我们希望我们通过script引入的库，如用CDN的方式引入的jquery，我们在使用时，依旧用require的方式来使用，但是却不希望webpack将它又编译进文件中。

3. Person是**构造**函数**, Person.**prototype** 是**原型对象（提供共有方法）**, person**是实例**, 实例可以通过\_proto_找到原型对象。

4. 每个对象都有\__proto__ ( **除了** var obj = Object.create(null) )

   每个函数对象都有 prototype。这个属性用于实现“实例化”（函数对象也是对象所以也有\__proto__，即 Func.\__proto__ = Function.prototype）

   函数对象的 prototype 所指向的也是对象，所以也有 \_\_proto\_\_，即 Func**.prototype.\__proto__**。这个属性用于实现“继承”

5. const a = 2 

   ```js
   const a = 2
   console.log(a.prototype) undefined
   console.log(a.__proto__) {}
   ```

6. instanceof 手写

   **关键点:** 构造函数Fn的`prototype`，实例对象的原型链。

   所以只要**遍历实例对象的原型链**，挨个往上查找看是否有与Fn的`prototype`相等的原型，直到最顶层`Object`还找不到，那么就返回false。

7. 可枚举对象有什么

   - 其中js中**基本包装类型的原型属性**是不可枚举的，如Object, Array, Number等。
   - 可枚举的属性可以通过[for...in](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)循环进行遍历（**除非该属性名是一个[Symbol](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)**），或者通过**Object.keys()**方法返回一个**可枚举属性的数组**。

   

