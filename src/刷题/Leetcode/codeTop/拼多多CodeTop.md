---
icon: edit
date: 2022-03-19
category:
- 面经
- PDD
---

# 拼多多CodeTop

#### [56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  let res = [];
  intervals.sort((a, b) => a[0] - b[0]);

  let prev = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    let cur = intervals[i];
    if (prev[1] >= cur[0]) { // 有重合
      prev[1] = Math.max(cur[1], prev[1]); 
    } else {       // 不重合，prev推入res数组 
      res.push(prev);
      prev = cur;  // 更新 prev
    }
  }

  res.push(prev);
  return res;
};
```

#### [46. 全排列](https://leetcode-cn.com/problems/permutations/)

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [], path = [], used = new Array(nums.length).fill(false);
    backtracking(nums, nums.length);
    return res;

    function backtracking(n, k) {
        if (path.length === k) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < k; i++) {
            if (used[i]) continue;

            path.push(n[i]);
            used[i] = true; // 同支

            backtracking(n, k);

            path.pop();
            used[i] = false;
        }
    }
};
```

#### [买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let low = prices[0],height = Number.MIN_VALUE
    prices.forEach((val)=>{
        low = Math.min(low,val)
        height = Math.max(height,val-low)
    })
    return height;
};
```

#### [102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = function(root) {
    const ret = [];
    if (!root) {
        return ret;
    }

    const q = [];
    q.push(root);
    while (q.length !== 0) {
        const currentLevelSize = q.length;
        ret.push([]);
        for (let i = 1; i <= currentLevelSize; ++i) {
            const node = q.shift();
            ret[ret.length - 1].push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
    return ret;
};
```

#### [54. 螺旋矩阵](https://leetcode-cn.com/problems/spiral-matrix/)

```js
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if (!matrix.length || !matrix[0].length) {
        return [];
    }

    const rows = matrix.length, columns = matrix[0].length;
    const order = [];
    let left = 0, right = columns - 1, top = 0, bottom = rows - 1;
    while (left <= right && top <= bottom) {
        for (let column = left; column <= right; column++) {
            order.push(matrix[top][column]);
        }
        for (let row = top + 1; row <= bottom; row++) {
            order.push(matrix[row][right]);
        }
        if (left < right && top < bottom) {
            for (let column = right - 1; column > left; column--) {
                order.push(matrix[bottom][column]);
            }
            for (let row = bottom; row > top; row--) {
                order.push(matrix[row][left]);
            }
        }
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
    }
    return order;
};
```

#### [53. 最大子数组和](https://leetcode-cn.com/problems/maximum-subarray/)

> 贪心，前为正则不断累加

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let maxSum = nums[0], preSum = 0
    for (let value of nums){
        if(preSum < 0){
            preSum = value
        }else{
            preSum += value
        }
        maxSum = Math.max(preSum,maxSum)
    }
    return maxSum
};

```

#### [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)

> dp 不要触发报警的前提拿到最大值

状态转移方程

![image-20220318112334782](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220318112334782.png)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const len = nums.length;
    if(len == 0)
        return 0;
    const dp = new Array(len + 1);
    dp[0] = 0;
    dp[1] = nums[0];
    for(let i = 2; i <= len; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i-1]);
    }
    return dp[len];
};
```

#### [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

> 贪心大法好
>
> 解题思路来自Ikaruga
> 硬币降序排列，从0到数组长度拿硬币，优先用大额硬币兑换
> amount / 硬币面值 取整 = 可用当前面值的硬币最多数量
> amount = 0，一次兑换结束，更新最小兑换数量。
> **剪枝：记录兑换数量，后续兑换数量不能大于最小兑换数量**

```js

```

> DP

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    const dp = new Array(amount+1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;
    for(let num of coins) {
        for(let i=num; i<=amount; i++) {
            dp[i] = Math.min(dp[i],dp[i-num]+1); // 记录之前的最小配比
        }
    }
    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
};
```

#### [剑指 Offer 62. 圆圈中最后剩下的数字](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)

> 递归

```js
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function (n, m) {
    const f = (n, m) => {
        if (n === 1) {
            return 0
        }
        let x = f(n - 1, m)
        return (m + x) % n
    }
    return f(n, m)
};

```



> 迭代

```js
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function (n, m) {
    let res = 0;
    for (let i = 2; i < n + 1; i++) {
        res = (m + res) % i;
    }
    return res;
};

```



#### [190. 颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)

将 nn 视作一个长为 3232 的二进制串，从低位往高位枚举 nn 的每一位，将其倒序添加到翻转结果 \textit{rev}rev 中。

代码实现中，每枚举一位就将 nn 右移一位，这样当前 nn 的最低位就是我们要枚举的比特位。当 nn 为 00 时即可结束循环。

需要注意的是，在某些语言（如 \texttt{Java}Java）中，没有无符号整数类型，因此对 nn 的右移操作应使用逻辑右移。

```js
var reverseBits = function(n) {
    let rev = 0;
    for (let i = 0; i < 32 && n > 0; ++i) {
        rev |= (n & 1) << (31 - i);
        n >>>= 1;
    }
    return rev >>> 0;
};
```

