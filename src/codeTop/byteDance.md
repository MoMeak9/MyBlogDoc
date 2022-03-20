# 字节跳动
#### [400. 第 N 位数字](https://leetcode-cn.com/problems/nth-digit/)

**解题思路**
首先我们很容易明白如下规律:

```
1位数 9个 ===> 1 * 9

2位数 90个 ===> 2 * 90

3位数 900个 ===> 3 * 900

...
```

```js
/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function(n) {
    let cur = 1, base = 9;
    while(n > cur * base){
        n -= cur * base;
        cur++;
        base*=10;
        if(Number.MAX_SAFE_INTEGER / base < cur){
            break;
        }
    }
    n--;
    const num = Math.pow(10,cur - 1) + Math.floor(n / cur), idx = n % cur;
    return Math.floor(num / Math.pow(10,cur - 1 - idx)) % 10;
};
```

#### [165. 比较版本号](https://leetcode-cn.com/problems/compare-version-numbers/)

> 未标识位，如2.2和2，多出的位数比较视作为0

```js
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    const v1 = version1.split('.');
    const v2 = version2.split('.');
    for (let i = 0; i < v1.length || i < v2.length; ++i) {
        let x = 0, y = 0; // 多出的位数比较视作为0
        if (i < v1.length) {
            x = parseInt(v1[i]);
        }
        if (i < v2.length) {
            y = parseInt(v2[i]);
        }
        if (x > y) {
            return 1;
        }
        if (x < y) {
            return -1;
        }
    }
    return 0;
};
```

#### [415. 字符串相加](https://leetcode-cn.com/problems/add-strings/)

> 会溢出 ，去看一下字符串相乘

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    return (parseIn(num1)+parseInt(num2)).toString()
};
```

> 不会溢出

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @description 逐个相加
 * @return {string}
 */
var addStrings = function(num1, num2) {
    let i = num1.length - 1, j = num2.length - 1, add = 0;
    const ans = [];
    while (i >= 0 || j >= 0 || add != 0) {
        const x = i >= 0 ? num1.charAt(i) - '0' : 0;
        const y = j >= 0 ? num2.charAt(j) - '0' : 0;
        const result = x + y + add;
        ans.push(result % 10);
        add = Math.floor(result / 10);
        i -= 1;
        j -= 1;
    }
    return ans.reverse().join('');
};
```

#### [43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)

> 通过模仿笔算的步骤实现

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  let m = num1.length,
    n = num2.length;
  // 结果最多为m+n位
  let res = new Array(m + n).fill(0);
  // 从个位数开始逐位相乘
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      let mul = (num1[i] - 0) * (num2[j] - 0);
      // 乘积在res对应的索引位置
      let p1 = i + j,
        p2 = i + j + 1;
      // 叠加到res上
      let sum = mul + res[p2];
      res[p2] = sum % 10;
      res[p1] += parseInt(sum / 10);
    }
  }
  // 结果前缀可能存在0（未使用的位）
  let i = 0;
  while (i < res.length && res[i] == 0) {
    i++;
  }
  // 将计算结果转化成字符串
  let str = "";
  for (; i < res.length; i++) {
    str += res[i];
  }
  return str.length == 0 ? "0" : str;
};
```



#### [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

> map记录差值

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0, len = nums.length; i < len; i++){
        if(map.has(target - nums[i])){
            return [map.get(target - nums[i]), i];
        }else{
            map.set(nums[i], i);
        }
    }
    return [];
};
```

#### [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

> 聊天的时候得知常考

递归超时了~

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 2
    }
    return climbStairs(n - 1) + climbStairs(n - 2)
};

```

迭代算法

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    let l = 0, r = 0, res = 1; // 看成左中右也行
    for (let i = 1; i <= n; i++) {
        l = r // 逐个右移操作
        r = res
        res = l + r
    }
    return res
};
```

