---
icon: edit
date: 2022-04-04
category:
- 前端
- JavaScript
---
# JavaScript优雅写法及骚操作

### 1、 判断为空

```js
a = a || [];
    
params.success&&params.success(res);
```

### 2、多条件判断

```js
//将判断条件作为对象的属性名，将处理逻辑作为对象的属性值
var Statistics = function () {
    console.log('执行')
}
const comparativeTotles = new Map([
    [0, Statistics],
    [1, Statistics],
    [2, Statistics],
    [3, Statistics]
])
let map = function (val) {
    return comparativeTotles.get(val)
}
let getMap = map(1); //如果查找不到返回undefined
if (!getMap) {
    console.log('查找不到')
} else {
    console.log('执行操作')
    getMap()
}
```

if-else 改善

> 感觉对象更好一些

```js
//利用数组循环的特性，符合条件的逻辑都会被执行，那就可以同时执行公共逻辑和单独逻辑。
const functionA = ()=>{/*do sth*/}       // 单独业务逻辑
const functionB = ()=>{/*do sth*/}       // 单独业务逻辑
const functionC = ()=>{/*send log*/}   // 公共业务逻辑
const actions = new Map([
    ['guest_1', () => { functionA }],
    ['guest_2', () => {  functionB }],
    ['guest_3', () => { functionC }],
    ['guest_4', () => { functionA }],
    ['default', () => { functionC  }],
    //...
])
 
/**
 * 按钮点击事件
 * @param {string} identity 身份标识：guest客态 master主态
  * @param {number} status 活动状态：1开票中 2开票失败 3 开票成功 4 商品售罄 5 有库存未开团
 */
const onButtonClick = (identity, status) => {
  let action = actions.get(`${identity}_${status}`) || actions.get('default')
  action.call(this)
}
```

#### 生成随机ID

```js
// 生成长度为10的随机字母数字字符串
Math.random().toString(36).substring(2);
```

#### 每秒更新当前时间

```js
setInterval(()=>document.body.innerHTML=new Date().toLocaleString().slice(10,18))
```

#### 生成随机 16 进制 颜色 码 如 # ffffff

```js
'#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
```

#### 优雅的取整

```js
var a = ~~2.33   ----> 2
var b = 2.33 | 0   ----> 2
var c = 2.33 >> 0   ----> 2
```

#### 优雅的金钱格式化

```js
// 1、使用正则实现
var test1 = '1234567890'
var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
console.log(format) // 1,234,567,890
// 2、使用骚操作
function formatCash(str) {
       return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
       })
}
console.log(format) // 1,234,567,890
```

#### 五种方法实现值交换

```js
[a, b] = [b, a]; 
```

#### 实现深拷贝

```js
var b = JSON.parse(JSON.string(a))
```

#### 递归求阶乘

```js
function factorial(n) {
    return (n > 1) ? n * f(n - 1) : n
}
```

### 对象访问

```js
const obj = {a:{b:22}}

console.log(obj?.a?.b)
```
