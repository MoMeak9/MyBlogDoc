---
date: 2022-07-13
star: ture
category:
- 前端
- TypeScript
---

# TypeScript 修仙进阶笔记（一）:sake:

> 参照来源：
>
> [TypeScript 全面进阶指南](https://juejin.cn/book/7086408430491172901/section)
>
> [重学TS v1.0](https://my-doc-1259409954.cos.ap-guangzhou.myqcloud.com/pdf/%E9%87%8D%E5%AD%A6TS-v1.0.pdf?ci-process=doc-preview&dstType=html)

<u>**PS: 本系列作为TypeScript进阶学习的部分，不适合初学者学习，并结合我个人学习情况对参考内容有所删减。系列文章将跟随学习进度同步更新...... :sake:**</u>

## 数据类型

### 元组和具名元组

### 对象的类型标注

特殊的`readonly` 不同于`const`

假设新增一个可选的函数类型属性，然后进行调用：`obj2.func()` ，此时将会产生一个类型报错：***不能调用可能是未定义的方法***。但可选属性标记不会影响你对这个属性进行赋值，如：

```typescript
obj2.male = false;
obj2.func = () => {};
```

即使你对可选属性进行了赋值，TypeScript 仍然会使用**接口的描述为准**进行类型检查，你可以使用类型断言、非空断言或可选链解决

### type 与 interface

我也知道，很多同学更喜欢用 type（Type Alias，类型别名）来代替接口结构描述对象，而我更推荐的方式是，interface 用来描述**对象、类的结构**，而类型别名用来**将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型**。但大部分场景下接口结构都可以被类型别名所取代，因此，只要你觉得统一使用类型别名让你觉得更整齐，也没什么问题。

### object、Object 以及 { }

`object`、`Object` 以及`{}`（一个空对象）这三者的使用可能也会让部分同学感到困惑，所以我也专门解释下。

首先是 Object 的使用。被 JavaScript 原型链折磨过的同学应该记得，原型链的顶端是 Object 以及 Function，这也就意味着所有的原始类型与对象类型最终都指向 Object，在 TypeScript 中就表现为 Object 包含了所有的类型：



- 在任何时候都**不要，不要，不要使用** Object 以及类似的装箱类型。
- 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 object。但我更推荐进一步区分，也就是使用 `Record<string, unknown>` 或 `Record<string, any>` 表示对象，`unknown[]` 或 `any[]` 表示数组，`(...args: any[]) => any`表示函数这样。
- 我们同样要避免使用`{}`。`{}`意味着任何非 `null / undefined` 的值，从这个层面上看，使用它和使用 `any` 一样恶劣。



### unique symbol

Symbol 在 JavaScript 中代表着一个唯一的值类型，它类似于字符串类型，可以作为对象的属性名，并用于避免错误修改 对象 / Class 内部属性的情况。而在 TypeScript 中，symbol 类型并不具有这一特性，一百个具有 symbol 类型的对象，它们的 symbol 类型指的都是 TypeScript 中的同一个类型。为了实现“独一无二”这个特性，TypeScript 中支持了 unique symbol 这一类型声明，它是 symbol 类型的子类型，每一个 unique symbol 类型都是独一无二的。

```typescript
const uniqueSymbolFoo: unique symbol = Symbol("linbudu")

// 类型不兼容
const uniqueSymbolBar: unique symbol = uniqueSymbolFoo
```

在 JavaScript 中，我们可以用 `Symbol.for` 方法来复用已创建的 Symbol，如 `Symbol.for("linbudu")` 会首先查找全局是否已经有使用 `linbudu` 作为 key 的 Symbol 注册，如果有，则返回这个 Symbol，否则才会创建新的 Symbol 。

在 TypeScript 中，如果要引用已创建的 unique symbol 类型，则需要使用类型查询操作符 typeof ：

```typescript
declare const uniqueSymbolFoo: unique symbol;

const uniqueSymbolBaz: typeof uniqueSymbolFoo = uniqueSymbolFoo
```

## 字面量类型与联合类型









## 枚举类型

