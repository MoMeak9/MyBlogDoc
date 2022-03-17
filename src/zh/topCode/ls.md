砍一刀的试题

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

