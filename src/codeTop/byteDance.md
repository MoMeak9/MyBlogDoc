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

> 会溢出

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

