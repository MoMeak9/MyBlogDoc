---
date: 2022-03-28
icon: page
category:
- 面试题
- 前端
---

# JavaScript高频手撕

> 参照:
>
> https://juejin.cn/post/7020562888657993741,
>
> https://juejin.cn/post/7018337760687685669
>
> 作者：前端胖头鱼

## 1. 防抖:star:

> 搜索场景，自动搜索

```js
// 防抖：可以和你的电脑设定了10分钟睡眠时间的场景结合起来理解
// 如果你一直在用电脑，那么电脑就不会睡眠（频繁的把前一个定时器关掉，开启新的定时器）
// 当你最后一次没操作电脑10分钟之后，电脑陷入睡眠

const debounce = function (func, delay) {
  let timer = null

  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
```

## 2. 节流:star:

> 节流： 任凭你怎么触发，其在指定的时间间隔内只会触发一次

### 基于时间戳(方式1)

```js
const throttle = function (func, delay) {
  let startTime = Date.now()

  return function (...args) {
    let lastTime = Date.now()

    if (lastTime - startTime > delay) {
      func.apply(this, args)
      startTime = Date.now()
    }
  }
}
```

### 基于setTimeout(方式2)

```js
const throttle = function (func, delay) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
                this.timer = null;
            }, delay)
        }
    }
}
```

## 3. 函数柯里化:star:

```js
const curry = (func, ...args) => { // 传参
    // 获取函数的参数个数
    const fnLen = func.length // 目标函数参数长度

    return function (...innerArgs) { // 传参
        innerArgs = args.concat(innerArgs) // 参数数组合并 ！
        // 参数未搜集足的话，继续递归搜集
        if (innerArgs.length < fnLen) {
            return curry.call(this, func, ...innerArgs) // 递归传递，call解构
            // return curry.apply(this, [func, ...innerArgs])
        } else {
            // 否则拿着搜集的参数调用func
            func.apply(this, innerArgs)
        }
    }
}
// 测试
const add = curry((num1, num2, num3) => {
    console.log(num1, num2, num3, num1 + num2 + num3)
})

add(1)(2)(3) // 1 2 3 6
add(1, 2)(3) // 1 2 3 6
add(1, 2, 3) // 1 2 3 6
add(1)(2, 3) // 1 2 3 6
```

## 4. bind

> `bind() ` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。[MDN](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fbind)

[姐妹篇  call实现](https://juejin.cn/post/7018337760687685669#heading-18)

[姐妹篇  apply实现](https://juejin.cn/post/7018337760687685669#heading-19)

```javascript
Function.prototype.bind2 = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function')
  }

  const executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) {
      // 如果调用方式不是new func的形式就直接调用sourceFunc，并且给到对应的参数即可
      return sourceFunc.apply(context, args)
    } else {
      // 类似于执行new的几个过程
      const self = Object.create(sourceFunc.prototype) // 处理new调用的形式
      const result = sourceFunc.apply(self, args)
      // 判断函数执行后的返回结果 非对象函数，则返回self
      if (result && typeof result === 'object' || typeof result === 'function') {
        return result
      } else {
        return self
      }
    }
  }
  const func = this
  
  const bound = function (...innerArgs) {
    return executeBound(func, bound, context, this, args.concat(innerArgs))
  }

  return bound
}

// 测试
// 1. 普通调用
const showName = function (sex, age) {
  console.log(this, sex, age)
}

showName.bind2({ name: '前端胖头鱼' }, 'boy')(100) // { name: '前端胖头鱼' } 'boy' 100

// 2. new 调用
const Person = function (name) {
  this.name = name
}

Person.prototype.showName = function (age) {
  console.log(this, this.name, age)
}

const bindPerson = Person.bind(null, 'boy')
const p1 = new bindPerson('前端胖头鱼')

p1.showName(100) // Person { name: 'boy' } 'boy' 100
复制代码
```

## 5. 实现一个简易版模板引擎

> jQuery时代，模板引擎用的还是比较多的，可以理解为它是这样一个函数，通过模板 + 数据经过一段黑盒操作最后得到需要展示的页面

```javascript
const render = (template, data) => {
  // \s*?是为了兼容{{name}} {{ name }}这种写法
  return template.replace(/{{\s*?(\w+)\s*?}}/g, (match, key) => {
    // 匹配中了则读取替换，否则替换为空字符串
    return key && data.hasOwnProperty(key) ? data[ key ] : ''
  })
}
const data = {
  name: '前端胖头鱼',
  age: 100
}
const template = `
  我是: {{ name }}
  年龄是: {{age}}
`
console.log(render(template, data))
/*
我是: 前端胖头鱼
年龄是: 100
*/
```

## 6. 类数组转化为数组的4种方式

```javascript
// 类数组转化为数组
const arrayLikeObj = {
    0: '前端胖头鱼',
    1: 100,
    length: 2
}

// 1. [].slice
console.log([].slice.call(arrayLikeObj))
// 2. Array.from !
console.log(Array.from(arrayLikeObj)) 
// 3. Array.apply ! 
console.log(Array.apply(null, arrayLikeObj))
// 4. [].concat
console.log([].concat.apply([], arrayLikeObj))
```

## 7. 请实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式

```js
const dom2json = (rootDom) => {
    if (!rootDom) {
        return
    }
    
    let rootObj = {
        tagName: rootDom.tagName,
        children: []
    }
    
    const children = rootDom.children
    // 读取子节点（元素节点）
    if (children && children.length) {
        Array.from(children).forEach((ele, i) => {
            // 递归处理
            rootObj.children[ i ] = dom2json(ele)
        })
    }
    
    return rootObj
}
```

## 8. 列表转树形结构

> 相信大家工作中也遇到过类似的问题，前端需要的是树形结构的数据，但是后台返回的是一个list，我们需要将list转化为树形结构（当然这里你也可以把你的`后端同学干啪`为啥不给我想要的数据）。

```javascript
const arrayToTree = (array) => {
  const hashMap = {}
  let result = []

  array.forEach((it) => {
    const { id, pid } = it

    // 不存在时，先声明children树形
    // 这一步也有可能在下面出现
    if (!hashMap[id]) {
      hashMap[id] = {
        children: []
      }
    }

    hashMap[id] = {
      ...it,
      children: hashMap[id].children
    }
    // 处理当前的item
    const treeIt = hashMap[id]

    // 根节点，直接push
    if (pid === 0) {
      result.push(treeIt)
    } else {
      // 也有可能当前节点的父父节点还没有加入hashMap，所以需要单独处理一下
      if (!hashMap[pid]) {
        hashMap[pid] = {
          children: []
        }
      }
      // 非根节点的话，找到父节点，把自己塞到父节点的children中即可
      hashMap[pid].children.push(treeIt)
    }
  })

  return result
}

// 测试
const data = [
  // 注意这里，专门把pid为1的元素放一个在前面
  { id: 2, name: '部门2', pid: 1 },
  { id: 1, name: '部门1', pid: 0 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 7, name: '部门7', pid: 6 },
]

console.log(JSON.stringify(arrayToTree(data), null, 2))
/*
[
  {
    "id": 1,
    "name": "部门1",
    "pid": 0,
    "children": [
      {
        "id": 2,
        "name": "部门2",
        "pid": 1,
        "children": []
      },
      {
        "id": 3,
        "name": "部门3",
        "pid": 1,
        "children": [
          {
            "id": 4,
            "name": "部门4",
            "pid": 3,
            "children": [
              {
                "id": 5,
                "name": "部门5",
                "pid": 4,
                "children": []
              }
            ]
          }
        ]
      }
    ]
  }
]
*/
复制代码
```

## 9. 树形结构转列表

> 反过来也可以试试看

```javascript
const tree2list = (tree) => {
  let list = []
  let queue = [...tree]

  while (queue.length) {
    // 从前面开始取出节点
    const node = queue.shift()
    const children = node.children
    // 取出当前节点的子节点，放到队列中，等待下一次循环
    if (children.length) {
      queue.push(...children)
    }
    // 删除多余的children树形
    delete node.children
    // 放入列表
    list.push(node)
  }

  return list
}

// 测试
const data = [
  {
    "id": 1,
    "name": "部门1",
    "pid": 0,
    "children": [
      {
        "id": 2,
        "name": "部门2",
        "pid": 1,
        "children": []
      },
      {
        "id": 3,
        "name": "部门3",
        "pid": 1,
        "children": [
          {
            "id": 4,
            "name": "部门4",
            "pid": 3,
            "children": [
              {
                "id": 5,
                "name": "部门5",
                "pid": 4,
                "children": []
              }
            ]
          }
        ]
      }
    ]
  }
]

console.log(tree2list(data))
/*
[ 
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 } 
]
*/

复制代码
```

## 10. sleep延迟执行:star:

> 实现一个函数，n秒后执行函数func

```javascript
const sleep = (func, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(func())
    }, delay)
  })
}

const consoleStr = (str) => {
  return () => {
    console.log(str)
    return str
  }
}

const doFns = async () => {
  const name = await sleep(consoleStr('前端胖头鱼'), 1000)
  const sex = await sleep(consoleStr('boy'), 1000)
  const age = await sleep(consoleStr(100), 1000)

  console.log(name, sex, age)
}

doFns()
// 前端胖头鱼  1s later
// boy 2s later
// 100 3s later
// 前端胖头鱼 boy 100
```

## 11. 菲波那切数列:star:

```javascript
斐波那契数，通常用 F(n) 表示，形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n > 1
给你 n ，请计算 F(n) 。


示例 1：

输入：2
输出：1
解释：F(2) = F(1) + F(0) = 1 + 0 = 1
示例 2：

输入：3
输出：2
解释：F(3) = F(2) + F(1) = 1 + 1 = 2
示例 3：

输入：4
输出：3
解释：F(4) = F(3) + F(2) = 2 + 1 = 3
```

### 暴力实现

> 根据题目意思，很容易写出下面递归的暴力代码

```javascript
const fib = (n) => {
  if (n === 0) {
    return 0
  }

  if (n === 1 || n === 2) {
    return 1
  }

  return fib(n -2) + fib(n - 1)
}

// 测试
console.log(fib(1)) // 1
console.log(fib(2)) // 1
// 试着统计一下计算时间
const t1 = Date.now()
console.log(fib(44)) // 701408733
console.log(Date.now() - t1) // 接近4393
```

### 缓存优化:star:

> 上面的代码可以实现效果，但是性能堪忧，来看一个计算`fib(10)`的过程

```javascript
// 计算10
10 => 9 + 8 // 需要计算9和8
9 => 8 + 7 // 需要计算8和7
8 => 7 + 6 // 需要计算7和6
7 => 6 + 5 // 需要计算6和5
6 => 5 + 4 // 需要计算5和4
5 => 4 + 3 // 需要计算4和3
4 => 3 + 2 // 需要计算3和2
2 => 1 + 0 // 需要计算1和0
```

这个过程中如果按照上面暴力实现的代码会重复多次计算某些曾经计算过的值，比如8、7、6、5...等等，这个损耗是没有必要的，所以我们可以把计算的结果进行缓存，下次遇到求同样的值，直接返回即可

```javascript
const fib = (n) => {
    // 缓存过直接返回
    if (fib[n]) {
        return fib[n]
    }

    if (n === 0) {
        return 0
    }

    if (n === 1 || n === 2) {
        return 1
    }

    const res = fib(n - 2) + fib(n - 1)
    // 缓存计算的结果
    fib[n] = res

    return res
}

console.log(fib(1)) // 1
console.log(fib(2)) // 1

const t1 = Date.now()
console.log(fib(44)) // 701408733
console.log(Date.now() - t1) // 1ms
```

## 12. 实现一个函数sum函数

> 实现一个函数sum函数满足以下规律

```javascript
sum(1, 2, 3).valueOf() // 6 
sum(2, 3)(2).valueOf() // 7 
sum(1)(2)(3)(4).valueOf() // 10
sum(2)(4, 1)(2).valueOf() // 9
```

**分析**

仔细观察这几种调用方式可以得到以下信息

1. sum函数可以传递一个或者多个参数
2. sum函数调用后返回的是一个新的函数且参数可传递一个或者多个
3. 调用.valueOf时完成最后计算

看起来是不是有点`函数柯里化`的感觉，前面的函数调用仅仅是在缓存每次调用的参数，而valueOf的调用则是拿着这些参数进行一次求和运算并返回结果

```javascript
const sum = (...args) => {
  // 声明add函数，其实主要是缓存参数的作用
  // 注意add调用完成还是会返回add函数本身，使其可以链式调用
  const add = (...args2) => {
    args = [ ...args, ...args2 ]
    return add
  }
  // 求和计算
  add.valueOf = () => args.reduce((ret, num) => ret + num, 0)

  return add
}

// 测试
console.log(sum(1, 2, 3).valueOf()) // 6
console.log(sum(2, 3)(2).valueOf()) // 7
console.log(sum(1)(2)(3)(4).valueOf()) // 10
console.log(sum(2)(4, 1)(2).valueOf()) // 9
```

## 1.  实现instanceOf的3种方式

> `instanceof` **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。[MDN上](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Finstanceof)

**关键点:** 构造函数Fn的`prototype`，实例对象的原型链。

所以只要遍历实例对象的原型链，挨个往上查找看是否有与Fn的`prototype`相等的原型，直到最顶层`Object`还找不到，那么就返回false。

### 递归实现(方式1)

```javascript
/**
 * 
 * @param {*} obj 实例对象
 * @param {*} func 构造函数
 * @returns true false
 */
const instanceOf1 = (obj, func) => {
  // 必须是对象或者函数 
  if (!(obj && ['object', 'function'].includes(typeof obj))) {
    return false
  }

  let proto = Object.getPrototypeOf(obj)

  if (proto === func.prototype) {
    return true
  } else if (proto === null) {
    return false
  } else {
    return instanceOf1(proto, func)
  }
}

// 测试
let Fn = function () { }
let p1 = new Fn()

console.log(instanceOf1({}, Object)) // true
console.log(instanceOf1(p1, Fn)) // true
console.log(instanceOf1({}, Fn)) // false
console.log(instanceOf1(null, Fn)) // false
console.log(instanceOf1(1, Fn)) // false
```

### 遍历实现(方式2)

```javascript
/**
 * 
 * @param {*} obj 实例对象
 * @param {*} func 构造函数
 * @returns true false
 */
const instanceOf2 = (obj, func) => {
  // 必须是对象或者函数 
  if (!(obj && ['object', 'function'].includes(typeof obj))) {
    return false
  }

  let proto = obj

  while (proto = Object.getPrototypeOf(proto)) {
    if (proto === func.prototype) {
      return true
    }
  }

  return false
}

// 测试
let Fn = function () { }
let p1 = new Fn()

console.log(instanceOf2({}, Object)) // true
console.log(instanceOf2(p1, Fn)) // true
console.log(instanceOf2({}, Fn)) // false
console.log(instanceOf2(null, Fn)) // false
console.log(instanceOf2(1, Fn)) // false

复制代码
```

### 遍历实现(方式3)

```javascript
/**
 * 
 * @param {*} obj 实例对象
 * @param {*} func 构造函数
 * @returns true false
 */
const instanceOf3 = (obj, func) => {
  // 必须是对象或者函数 
  if (!(obj && ['object', 'function'].includes(typeof obj))) {
    return false
  }

  let proto = Object.getPrototypeOf(obj)
  // 因为一定会有结束的时候（最顶层Object），所以不会是死循环
  while (true) {
    if (proto === null) {
      return false
    } else if (proto === func.prototype) {
      return true
    } else {
      proto = Object.getPrototypeOf(proto)
    }
  }
}

// 测试
let Fn = function () { }
let p1 = new Fn()

console.log(instanceOf3({}, Object)) // true
console.log(instanceOf3(p1, Fn)) // true
console.log(instanceOf3({}, Fn)) // false
console.log(instanceOf3(null, Fn)) // false
console.log(instanceOf3(1, Fn)) // false


复制代码
```

## 2. 实现JSON.stringify(超详细)

看代码实现前，可以先看看前几天写的一篇悲伤的故事[就因为JSON.stringify，我的年终奖差点打水漂了](https://juejin.cn/post/7017588385615200270)

> `JSON.stringify() ` 方法将一个 JavaScript 对象或值转换为 JSON 字符串，如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的 replacer 是数组，则可选择性地仅包含数组指定的属性。[MDN](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FJSON%2Fstringify)

> `JSON.stringify`本身有非常多的转换规则和特性(详情请查看MDN)，要完整实现还是挺麻烦的（为了实现这个函数`胖头鱼`快不会动了o(╥﹏╥)o）

```javascript
const jsonstringify = (data) => {
  // 确认一个对象是否存在循环引用
  const isCyclic = (obj) => {
  // 使用Set数据类型来存储已经检测过的对象
  let stackSet = new Set()
  let detected = false

  const detect = (obj) => {
    // 不是对象类型的话，可以直接跳过
    if (obj && typeof obj != 'object') {
      return
    }
    // 当要检查的对象已经存在于stackSet中时，表示存在循环引用
    if (stackSet.has(obj)) {
      return detected = true
    }
    // 将当前obj存如stackSet
    stackSet.add(obj)

    for (let key in obj) {
      // 对obj下的属性进行挨个检测
      if (obj.hasOwnProperty(key)) {
        detect(obj[key])
      }
    }
    // 平级检测完成之后，将当前对象删除，防止误判
    /*
      例如：对象的属性指向同一引用，如果不删除的话，会被认为是循环引用
      let tempObj = {
        name: '前端胖头鱼'
      }
      let obj4 = {
        obj1: tempObj,
        obj2: tempObj
      }
    */
    stackSet.delete(obj)
  }

  detect(obj)

  return detected
}

  // 特性七:
  // 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
  if (isCyclic(data)) {
    throw new TypeError('Converting circular structure to JSON')
  }

  // 特性九:
  // 当尝试去转换 BigInt 类型的值会抛出错误
  if (typeof data === 'bigint') {
    throw new TypeError('Do not know how to serialize a BigInt')
  }

  const type = typeof data
  const commonKeys1 = ['undefined', 'function', 'symbol']
  const getType = (s) => {
    return Object.prototype.toString.call(s).replace(/\[object (.*?)\]/, '$1').toLowerCase()
  }

  // 非对象
  if (type !== 'object' || data === null) {
    let result = data
    // 特性四：
    // NaN 和 Infinity 格式的数值及 null 都会被当做 null。
    if ([NaN, Infinity, null].includes(data)) {
      result = 'null'
      // 特性一：
      // `undefined`、`任意的函数`以及`symbol值`被`单独转换`时，会返回 undefined
    } else if (commonKeys1.includes(type)) {
      // 直接得到undefined，并不是一个字符串'undefined'
      return undefined
    } else if (type === 'string') {
      result = '"' + data + '"'
    }

    return String(result)
  } else if (type === 'object') {
    // 特性五:
    // 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化
    // 特性六:
    // Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
    if (typeof data.toJSON === 'function') {
      return jsonstringify(data.toJSON())
    } else if (Array.isArray(data)) {
      let result = data.map((it) => {
        // 特性一:
        // `undefined`、`任意的函数`以及`symbol值`出现在`数组`中时会被转换成 `null`
        return commonKeys1.includes(typeof it) ? 'null' : jsonstringify(it)
      })

      return `[${result}]`.replace(/'/g, '"')
    } else {
      // 特性二：
      // 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
      if (['boolean', 'number'].includes(getType(data))) {
        return String(data)
      } else if (getType(data) === 'string') {
        return '"' + data + '"'
      } else {
        let result = []
        // 特性八
        // 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性
        Object.keys(data).forEach((key) => {
          // 特性三:
          // 所有以symbol为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
          if (typeof key !== 'symbol') {
            const value = data[key]
            // 特性一
            // `undefined`、`任意的函数`以及`symbol值`，出现在`非数组对象`的属性值中时在序列化过程中会被忽略
            if (!commonKeys1.includes(typeof value)) {
              result.push(`"${key}":${jsonstringify(value)}`)
            }
          }
        })

        return `{${result}}`.replace(/'/, '"')
      }
    }
  }
}

// 各种测试

// 1. 测试一下基本输出
console.log(jsonstringify(undefined)) // undefined 
console.log(jsonstringify(() => { })) // undefined
console.log(jsonstringify(Symbol('前端胖头鱼'))) // undefined
console.log(jsonstringify((NaN))) // null
console.log(jsonstringify((Infinity))) // null
console.log(jsonstringify((null))) // null
console.log(jsonstringify({
  name: '前端胖头鱼',
  toJSON() {
    return {
      name: '前端胖头鱼2',
      sex: 'boy'
    }
  }
}))
// {"name":"前端胖头鱼2","sex":"boy"}

// 2. 和原生的JSON.stringify转换进行比较
console.log(jsonstringify(null) === JSON.stringify(null));
// true
console.log(jsonstringify(undefined) === JSON.stringify(undefined));
// true
console.log(jsonstringify(false) === JSON.stringify(false));
// true
console.log(jsonstringify(NaN) === JSON.stringify(NaN));
// true
console.log(jsonstringify(Infinity) === JSON.stringify(Infinity));
// true
let str = "前端胖头鱼";
console.log(jsonstringify(str) === JSON.stringify(str));
// true
let reg = new RegExp("\w");
console.log(jsonstringify(reg) === JSON.stringify(reg));
// true
let date = new Date();
console.log(jsonstringify(date) === JSON.stringify(date));
// true
let sym = Symbol('前端胖头鱼');
console.log(jsonstringify(sym) === JSON.stringify(sym));
// true
let array = [1, 2, 3];
console.log(jsonstringify(array) === JSON.stringify(array));
// true
let obj = {
  name: '前端胖头鱼',
  age: 18,
  attr: ['coding', 123],
  date: new Date(),
  uni: Symbol(2),
  sayHi: function () {
    console.log("hello world")
  },
  info: {
    age: 16,
    intro: {
      money: undefined,
      job: null
    }
  },
  pakingObj: {
    boolean: new Boolean(false),
    string: new String('前端胖头鱼'),
    number: new Number(1),
  }
}
console.log(jsonstringify(obj) === JSON.stringify(obj)) 
// true
console.log((jsonstringify(obj)))
// {"name":"前端胖头鱼","age":18,"attr":["coding",123],"date":"2021-10-06T14:59:58.306Z","info":{"age":16,"intro":{"job":null}},"pakingObj":{"boolean":false,"string":"前端胖头鱼","number":1}}
console.log(JSON.stringify(obj))
// {"name":"前端胖头鱼","age":18,"attr":["coding",123],"date":"2021-10-06T14:59:58.306Z","info":{"age":16,"intro":{"job":null}},"pakingObj":{"boolean":false,"string":"前端胖头鱼","number":1}}

// 3. 测试可遍历对象
let enumerableObj = {}

Object.defineProperties(enumerableObj, {
  name: {
    value: '前端胖头鱼',
    enumerable: true
  },
  sex: {
    value: 'boy',
    enumerable: false
  },
})

console.log(jsonstringify(enumerableObj))
// {"name":"前端胖头鱼"}

// 4. 测试循环引用和Bigint

let obj1 = { a: 'aa' }
let obj2 = { name: '前端胖头鱼', a: obj1, b: obj1 }
obj2.obj = obj2

console.log(jsonstringify(obj2))
// TypeError: Converting circular structure to JSON
console.log(jsonStringify(BigInt(1)))
// TypeError: Do not know how to serialize a BigInt

复制代码
```

## 3.  实现一个Promise

> 篇幅原因，这里就不介绍Promise A+规范以及`then`函数之外的其他详细实现了，下面这个版本我一般在面试中常用，基本直接通过。

```javascript
class MyPromise {
  constructor (exe) {
    // 最后的值，Promise .then或者.catch接收的值
    this.value = undefined
    // 状态：三种状态 pending success failure
    this.status = 'pending'
    // 成功的函数队列
    this.successQueue = []
    // 失败的函数队列
    this.failureQueue = []
    const resolve = (value) => {
      const doResolve = () => {
        // 将缓存的函数队列挨个执行，并且将状态和值设置好
        if (this.status === 'pending') {
          this.status = 'success'
          this.value = value
  
          while (this.successQueue.length) {
            const cb = this.successQueue.shift()
  
            cb && cb(this.value)
          }
        }
      }

      setTimeout(doResolve, 0)
    }

    const reject = (value) => {
      // 基本同resolve
      const doReject = () => {
        if (this.status === 'pending') {
          this.status = 'failure'
          this.value = value
  
          while (this.failureQueue.length) {
            const cb = this.failureQueue.shift()
  
            cb && cb(this.value)
          }
        }
      }

      setTimeout(doReject, 0)
    }

    exe(resolve, reject)
  }
  
  then (success = (value) => value, failure = (value) => value) {
    // .then返回的是一个新的Promise
    return new MyPromise((resolve, reject) => {
      // 包装回到函数
      const successFn = (value) => {
        try {
          const result = success(value)
          // 如果结果值是一个Promise，那么需要将这个Promise的值继续往下传递，否则直接resolve即可
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }
      // 基本筒成功回调函数的封装
      const failureFn = (value) => {
        try {
          const result = failure(value)
          
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }
      // 如果Promise的状态还未结束，则将成功和失败的函数缓存到队列里
      if (this.status === 'pending') {
        this.successQueue.push(successFn)
        this.failureQueue.push(failureFn)
        // 如果已经成功结束，直接执行成功回调 
      } else if (this.status === 'success') {
        success(this.value)
      } else {
        // 如果已经失败，直接执行失败回调
        failure(this.value)
      }
    })
  }
  // 其他函数就不一一实现了
  catch () {

  }
} 
// 以下举个例子，验证一下以上实现的结果
const pro = new MyPromise((resolve, reject) => {
  setTimeout(resolve, 1000)
  setTimeout(reject, 2000)
})

pro
  .then(() => {
    console.log('2_1')
    const newPro = new MyPromise((resolve, reject) => {
      console.log('2_2')
      setTimeout(reject, 2000)
    })
    console.log('2_3')
    return newPro
  })
  .then(
    () => {
      console.log('2_4')
    },
    () => {
      console.log('2_5')
    }
  )
  
pro
  .then(
    data => {
      console.log('3_1')
      throw new Error()
    },
    data => {
      console.log('3_2')
    }
  )
  .then(
    () => {
      console.log('3_3')
    },
    e => {
      console.log('3_4')
    }
  )
// 2_1
// 2_2
// 2_3
// 3_1
// 3_4
// 2_5
```

## 4. 实现多维数组扁平化的3种方式 :star:

```js

/**
 * 
 * @param {*} array 深层嵌套的数据
 * @returns array 新数组
 */
const flat1 = (array) => {
  return array.reduce((result, it) => {
    return result.concat(Array.isArray(it) ? flat1(it) : it)
  }, [])
}

// 测试
let arr1 = [
  1,
  [ 2, 3, 4 ],
  [ 5, [ 6, [ 7, [ 8 ] ] ] ]
]
console.log(flat1(arr1)) // [1, 2, 3, 4, 5, 6, 7, 8]
```

```js
/**
 * 
 * @param {*} array 深层嵌套的数据
 * @returns array 新数组
 */
 
const flat2 = (array) => {
  const result = []
  // 展开一层
  const stack = [ ...array ] // 利用stack存储子array
  
  while (stack.length !== 0) {
    // 取出最后一个元素
    const val = stack.pop()
    
    if (Array.isArray(val)) {
     // 遇到是数组的情况，往stack后面推入
      stack.push(...val)
    } else {
      // 往数组前面推入
      result.unshift(val)
    }
  }

  return result
}
// 测试
let arr2 = [
  1,
  [ 2, 3, 4 ],
  [ 5, [ 6, [ 7, [ 8 ] ] ] ]
]

console.log(flat2(arr2)) // [1, 2, 3, 4, 5, 6, 7, 8]
```

```js

/**
 * 
 * @param {*} array 深层嵌套的数据
 * @returns 新数组
 */
const flat3 = (array) => {
  return array.flat(Infinity)
}
// 测试
let arr3 = [
  1,
  [ 2, 3, 4 ],
  [ 5, [ 6, [ 7, [ 8 ] ] ] ]
]

console.log(flat3(arr3)) // [1, 2, 3, 4, 5, 6, 7, 8]
```

## 12. 实现trim方法的两种方式

```js
const trim = (str) => { 
  return str.replace(/^\s*|\s*$/g, '')
}
```

## 13. 实现Promise.all

```js
Promise.myAll = (promises) => {
  // 符合条件3，返回一个Promise
  return new Promise((rs, rj) => {
    let count = 0
    let result = []
    const len = promises.length

    promises.forEach((p, i) => {
      // 符合条件1，将数组里的项通过Promise.resolve进行包装
      Promise.resolve(p).then((res) => {
        count += 1
        result[ i ] = res
        // 符合条件2 等待所有都完成
        if (count === len) {
          rs(result)
        }
        // 符合条件2  只要一个失败就都失败
      }).catch(rj)
    })
  })
}

let p1 = Promise.resolve(1)
let p2 = 2
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 3)
})

let p4 = Promise.reject('出错啦')

Promise.myAll([p1, p2, p3]).then((res) => {
  console.log(res); // [ 1, 2, 3 ]
});


Promise.myAll([ p1, p2, 3 ]).then((res) => {
  console.log(res) // [ 1, 2, 3 ]
}).catch((err) => {
  console.log('err', err)
})


Promise.myAll([ p1, p2, p4 ]).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log('err', err) // err 出错啦
})
```

## 14. 实现Promise.race

```js
Promise.myRace = (promises) => {
  // 返回一个新的Promise
  return new Promise((rs, rj) => {
    promises.forEach((p) => {
      // 包装一下promises中的项，防止非Promise .then出错
      // 只要有任意一个完成了或者拒绝了，race也就结束了
      Promise.resolve(p).then(rs).catch(rj)
    })
  })
}

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 1);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 2);
});

Promise.myRace([promise1, promise2]).then((value) => {
  // 因为promise2更快所以打印出2
  console.log(value) // 2
});

Promise.myRace([promise1, promise2, 3]).then((value) => {
  // 3比其他两个更快
  console.log(value) // 3
});
```

