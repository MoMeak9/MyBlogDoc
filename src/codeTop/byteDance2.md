---
date: 2022-04-04
icon: page
sticky: true
star: true
---

# 字节跳动CodeTop（二）

#### [700. 二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)

> 递归

```js
var searchBST = function(root, val) {
    if (!root) {
        return null;
    }
    if (val === root.val) {
        return root;
    }
    return searchBST(val < root.val ? root.left : root.right, val);
};
```

> 迭代

```js
var searchBST = function(root, val) {
    while (root) {
        if (val === root.val) {
            return root;
        }
        root = val < root.val ? root.left : root.right;
    }
    return null;
};
```

#### [剑指 Offer 54. 二叉搜索树的第k大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)

> **二叉搜索树的 中序遍历倒序 为 递减序列 。**
>
> 因此，求 “二叉搜索树第 kk 大的节点” 可转化为求 “此树的中序遍历倒序的第 k 个节点”。or 正序倒数第三个。

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204042015665.png" alt="Picture1.png" style="zoom:33%;" />

```js
var kthLargest = function (root, k) {
    const res = [];
    const inOrder = (root) => {
        if (!root) return;
        inOrder(root.left);
        res.push(root.val)
        inOrder(root.right);
    }
    inOrder(root);
    return res[res.length - k]
};
```

#### [342. 4的幂](https://leetcode-cn.com/problems/power-of-four/)

> 循环

```js
var isPowerOfFour = function(n) {
    if(n<=0)return false
    if(n==1)return true
    let i=1
    while(i<n){
        let temp = i*4
        if(temp==n){
            return true
        }else if(temp>n){
            return false
        }
        i=temp
    }
};
```

> 转换为2的幂

```js
var isPowerOfFour = function (n) {
    if (n <= 0) return false
    if (n === 1) return true
    n = n ** 0.5;
    if (n % 1 !== 0) return false;
    return (n & n - 1) === 0;
};
```

#### [507. 完美数](https://leetcode-cn.com/problems/perfect-number/)

```js
var checkPerfectNumber = function(num) {
    if (num === 1) {
        return false;
    }

    let sum = 1;
    for (let d = 2; d * d <= num; ++d) {
        if (num % d === 0) {
            sum += d; // 因数1可以被除
            if (d * d < num) {
                sum += Math.floor(num / d); // 对应的因数2存在且，则加上
            }
        }
    }
    return sum === num;
};
```

#### [剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
	return nums.sort((a,b)=>b%2-a%2); // 奇数前，偶数后
};
```

```js
var exchange = function (nums) {
    const even = [];
    const res = [];
    nums.forEach((val) => {
        if (val % 2 === 0) {
            even.push(val);
        } else {
            res.push(val);
        }
    })
    return res.concat(even);
};
```

#### [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

> 贪心大法好

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let ans = 0;
    let n = prices.length;
    for (let i = 1; i < n; ++i) {
        ans += Math.max(0, prices[i] - prices[i - 1]);
    }
    return ans;
};
```

#### [252. 会议室](https://leetcode-cn.com/problems/meeting-rooms/)

```js
/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function (intervals) {
  // 将传入的数组按照 第一个数字升序排列
  intervals.sort((a, b) => {
    return a[0] - b[0];
  })

  for (let i = 0; i < intervals.length - 1; i++) {
    if (intervals[i][1] > intervals[i + 1][0]) {
      return false
    }
  }
  return true
};
```

#### [704. 二分查找](https://leetcode-cn.com/problems/binary-search/)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor((high + low) / 2);
        const num = nums[mid];
        if (num === target) {
            return mid;
        } else if (num > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
};
```

#### [9. 回文数](https://leetcode-cn.com/problems/palindrome-number/)

```js
var isPalindrome = function (x) {
    if (x < 0) return false;
    const str = x.toString()
    return str === str.split('').reverse().join('');
};
// 解法一：翻转字符串法
var isPalindrome = function(x) {
    return x.toString() === x.toString().split('').reverse().join('');
};
```

```js
/**
 * @param {number} x
 * @return {boolean}
 */
// 解法二：双指针遍历比较法
var isPalindrome = function(x) {
    let temp = x.toString()
    const n = Math.floor(temp.length / 2)
    for(let i = 0; i < n; i++){
        if(temp[i] != temp[temp.length-i-1]) return false
    }
    return true
};
```

#### [234. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)

