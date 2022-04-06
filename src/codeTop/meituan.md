---
icon: edit
date: 2022-03-15
category:
- 牛客
- 美团
---

# 美团CodeTop



```js
// 5. 动态规划：从起始点到终点
var minPathSum = function(grid) {
    const m = grid.length, n = grid[0].length

    // 状态定义：dp[i][j] 表示从 [0,0] 到 [i,j] 的最小路径和
    const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))

    // 状态初始化
    dp[0][0] = grid[0][0]

    // 状态转移
    for (let i = 0; i < m ; i++) {
        for (let j = 0; j < n ; j++) {
            if (i == 0 && j != 0) {
                dp[i][j] = grid[i][j] + dp[i][j - 1]
            } else if (i != 0 && j == 0) {
                dp[i][j] = grid[i][j] + dp[i - 1][j]
            } else if (i != 0 && j != 0) {
                dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }

    // 返回结果
    return dp[m - 1][n - 1]
}
```

#### [718. 最长重复子数组](https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/)

> 暴力

```js
const findLength = (A, B) => {
  const m = A.length;
  const n = B.length;
  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (A[i] == B[j]) { // 遇到相同项
        let subLen = 1;   // 公共子序列长度至少为1
        while (i + subLen < m && j + subLen < n && A[i + subLen] == B[j + subLen]) { //新的一项也相同
          subLen++; // 公共子序列长度每次增加 1，考察新的一项
        }
        res = Math.max(subLen, res);
      }
    }
  }
  return res;
};
```

![image.png](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/9b80364c7936ad0fdca0e9405025b2a207a10322e16872a6cb68eb163dee25ee-image.png)

> DP

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findLength = (nums1, nums2) => {
    // nums1、nums2数组的长度
    const [m, n] = [nums1.length, nums2.length];
    // dp数组初始化，都初始化为0 ！！
    const dp = new Array(m + 1).fill(0).map(x => new Array(n + 1).fill(0));
    // 初始化最大长度为0
    let res = 0;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // 遇到nums1[i - 1] === nums2[j - 1]，则更新dp数组
            if (nums1[i - 1] === nums2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }
            // 更新res
            res = dp[i][j] > res ? dp[i][j] : res;
        }
    }
    // 遍历完成，返回res
    return res;
};
```

#### [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

![image-20220330214024553](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220330214024553.png)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if (head === null|| head.next === null) {
        return head; // 终止条件
    }
    const newHead = head.next;
    head.next = swapPairs(newHead.next); // 子链来自后递归
    newHead.next = head;
    return newHead;
};
```

#### [48. 旋转图像](https://leetcode-cn.com/problems/rotate-image/)

> 旋转二位矩阵

> 创建新的矩阵

```js
var rotate = function(matrix) {
    const n = matrix.length;
    const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix_new[j][n - i - 1] = matrix[i][j]; // 行变列，列数值变成最后一个
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = matrix_new[i][j];
        }
    }
};
```

```js
var rotate = function(matrix) {
    const n = matrix.length;
    for (let i = 0; i < Math.floor(n / 2); ++i) {
        for (let j = 0; j < Math.floor((n + 1) / 2); ++j) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[n - j - 1][i];
            matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
            matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
            matrix[j][n - i - 1] = temp;
        }
    }
};
```

#### [69. x 的平方根 ](https://leetcode-cn.com/problems/sqrtx/)

```js
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let r = x

    while (r ** 2 > x) {
        r = ~~((r + x / r) / 2)
    }//取整

    return r
};
```

#### [剑指 Offer 10- II. 青蛙跳台阶问题](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)

```js
/**
 * @param {number} n
 * @return {number}
 */
var numWays = function(n) {
    let sum = 0;
    let x = 1;
    let y = 1;
    for(let i =0;i < n;i++){
        sum = (x + y);
        x = y;
        y = sum
    } 
    return x;
};
```

#### [387. 字符串中的第一个唯一字符](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

**使用哈希表存储索引**

`Object.entries()`方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 [for...in...] 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。

```js
var firstUniqChar = function(s) {
    const position = new Map();
    const n = s.length;
    for (let [i, ch] of Array.from(s).entries()) {
        if (position.has(ch)) {
            position.set(ch, -1);
        } else {
            position.set(ch, i);
        }
    }
    let first = -1;
    for (let pos of position.values()) {
        if (pos !== -1 && pos > first) {
            first = pos;
        }
    }
    return first;
};
```

**队列**

```js
var firstUniqChar = function(s) {
    const position = new Map();
    const q = [];
    const n = s.length;
    for (let [i, ch] of Array.from(s).entries()) {
        if (!position.has(ch)) {
            position.set(ch, i);
            q.push([s[i], i]);
        } else {
            position.set(ch, -1);
            while (q.length && position.get(q[0][0]) === -1) {
                q.shift();
            }
        }
    }
    return q.length ? q[0][1] : -1;
};
```

```js
var firstUniqChar = function (str) {
    const obj = {}
    Array.from(str).forEach((val, index) => {
        if (obj[val]) {
            obj[val] = -1;
        } else {
            obj[val] = index;
        }
    })
    let ans = -1;
    for (const key in obj) {
        let val = obj[key];
        if (val !== -1) {
            if (ans === -1) ans = val;
            ans = Math.min(ans, val);
        }
    }
    return ans;
};
```

