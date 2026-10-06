---
date: 2022-10-11
category:
- JavaScript
---
# JavaScript 如何跳出（终止）forEach 循环
在forEach中，不能使用 continue 和 break ，可以使用 return 或 return false 跳出循环，效果与 for 中 continue 一样，但是该方法无法一次结束所有循环。

如果直接使用 continue 或者 break 还会报错，如下所示：
```js
[1,2,3].forEach(()=>{
    break;
})
// SyntaxError: Illegal break statement
```
即解释器无法确定break出去之后的位置。
```js
[1,2,3].forEach(()=>{
    continue;
})
// SyntaxError: Illegal continue statement: no surrounding iteration statement
```
即语句并不在迭代语句内，不知道下一次循环在哪。

所以，不要将forEach语句等同for看待，那么我们来看看如何操作可以跳出循环：

## 跳出本次循环
forEach 跳出本次循环，使用return
```js
    [1,2,3].forEach(function(item,index){
        if(item == 2){
            return
        }
        console.log(item)
    })
```
## 跳出整个循环
forEach 跳出整个循环，需要抛出异常，并且哪里捕获哪里之后再继续执行，例如：

```js
try {
    [1,2,3].forEach(function(item,index){
        if(item == 2){
            thorw new Error(); //结束循环
        }
    })
} catch(e) {

}
```

### 跳出嵌套循环

```js
try {
    [1, 2, 3, 4, 5].forEach(function (item, index) {

        try {
            [1, 2, 3, 4, 5].forEach(function (item, index) {
                if (item === 3) {
                    throw new Error(); //抛出异常
                }
            })
        } finally {
        }//try不能单独存在
        //内层的catch不能存在，不然会捕获异常，只结束内层forEach
    })
} catch (e) { //在最外层捕获异常，可结束整个嵌套循环

}
```

## Tips

除了抛出异常以外，没有办法中止或跳出 `forEach()` 循环。如果你需要中止或跳出循环，`forEach()` 方法不是应当使用的工具。

若你需要提前终止循环，你可以使用：

- 一个简单的 for 循环
- `for...of` / `for...in` 循环

此外，这些数组方法则可以对数组元素判断，以便确定是否需要继续遍历：
- **`every()`**：`every()` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
- **`some()`**：`some()` 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个布尔值。
- **`find()`**：`find()` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 `undefined`。
- **`findIndex()`**：`findIndex()`方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。


只要条件允许，也可以使用 `filter()` 提前过滤出需要遍历的部分，再用 `forEach()` 处理。
