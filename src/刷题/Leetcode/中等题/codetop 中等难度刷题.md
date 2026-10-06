# codetop 中等难度刷题

> https://codetop.cc/home

#### [剑指 Offer 48. 最长不含重复字符的子字符串](https://leetcode.cn/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/)

> 方法一：滑动窗口

```js
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};
```

> 方法三：双指针 + 哈希表

```js
var lengthOfLongestSubstring = function (s) {
    const map = new Map();
    let i = -1, res = 0;
    for (let j = 0; j < s.length; j++) {
        if (map.has(s[j])) {
            i = Math.max(i, map.get(s[j]));
        }
        map.set(s[j], j);
        res = Math.max(res, j - i);
    }
    return res;
};
```

#### [179. 最大数](https://leetcode.cn/problems/largest-number/)

> 交互比较组合

```js
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
    if (nums.length === 1) return nums[0].toString();
    for (let j = 0; j < nums.length; j++) {
        for (let i = 0; i < nums.length - 1; i++) {
            if (parseInt('' + nums[i] + nums[i + 1]) <
                parseInt('' + nums[i + 1] + nums[i])) {
                [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
            }
        }
    }
    if(nums[0]===0)return "0";
    return nums.reduce((pre, cur) => {
        return pre + cur;
    }, '')
};
```

> 简洁版本

```js
var largestNumber = function(nums) {
    nums.sort((a,b) => {
        var stra = b.toString() + a.toString(), strb = a.toString() + b.toString();
        if (stra > strb) { // 不需要转换为int
            return 1
        } else {
            return -1
        }
    });
    if (nums[0] == 0) return '0'
    return nums.join('');
};
```

#### [1143. 最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/)

> 动态规划
>
> <img src="https://cdn.yihuiblog.top/images/202207042004891.png" alt="image.png" style="zoom: 33%;" />

```js
var longestCommonSubsequence = function(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        const c1 = text1[i - 1];
        for (let j = 1; j <= n; j++) {
            const c2 = text2[j - 1];
            if (c1 === c2) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
};
```

#### [151. 颠倒字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)

> 利用正则匹配！！！

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.trim().split(/\s+/).reverse().join(' ');
};
```

