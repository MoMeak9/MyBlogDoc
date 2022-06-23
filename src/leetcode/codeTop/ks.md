---
date: 2022-03-22
icon: page
sticky: true
star: true
---

# 快手CodeTop

## [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

> dfs

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const preorderTraversal = function (root) {
    let res = [];
    const dfs = function (root) {
        if (root === null) return;
        //先序遍历所以从父节点开始
        res.push(root.val);
        //递归左子树
        dfs(root.left);
        //递归右子树
        dfs(root.right);
    }
    dfs(root);
    return res;
};
```

## [110. 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

> 基于计算二叉树深度的递归算法
>
> ”如果左右最大深度大于 1，就不是平衡二叉树“

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
    // 记录二叉树是否平衡
    let flag = true; // 1
    const maxDepth = (root) => {
        if (root == null) return 0; // 终止
        // 提前返回
        if (!flag) return;
        let leftMaxDepth = maxDepth(root.left);
        let rightMaxDepth = maxDepth(root.right);
        // 如果左右最大深度大于 1，就不是平衡二叉树
        if (Math.abs(rightMaxDepth - leftMaxDepth) > 1) { // 2
            flag = false;
        }
        return 1 + Math.max(leftMaxDepth, rightMaxDepth); // 3
    };
    maxDepth(root);
    return flag;
};
```

## [7. 整数反转](https://leetcode-cn.com/problems/reverse-integer/)

> 自己手撕一下

```js
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    const arr = x.toString().split('');
    let flag = arr[0]==='-'
    if (flag) {
        arr.shift();
    }
    const ans = Number(arr.reverse().join(''))
    if (ans > 2 ** 31 - 1 || ans < -(2 ** 31)) {
        return 0
    }
    return flag ? -ans : ans
};

```

> 官方秀一点
>
> 每次除以10取到最低位，再逐个乘10至最高位

```js
var reverse = function(x) {
    let rev = 0;
    while (x !== 0) {
        const digit = x % 10;
        x = ~~(x / 10);
        rev = rev * 10 + digit;
        if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
            return 0;
        }
    }
    return rev;
};
```

## [227. 基本计算器 II](https://leetcode-cn.com/problems/basic-calculator-ii/)

```js
var calculate = function(s) {
	const nums = []
	let cur = 0
	let prevOp = '+'
	s = s + '+'
	
	for (let i = 0; i < s.length; i++) {
		if (s[i] >= '0' && s[i] <= '9') {
			cur = cur * 10 + s[i].charCodeAt(0) -'0'.charCodeAt(0)
		} else if (s[i] == ' ') {
			continue
		} else {
			if (prevOp == '+') { 
                nums.push(cur)
            } else if (prevOp == '-') {
                nums.push( -1 * cur) 
            } else if (prevOp == '*') {
                nums[nums.length - 1] *=  cur 
            } else if (prevOp == '/') {
                nums[nums.length - 1]  =  (nums[nums.length - 1] / cur) | 0
            }
            prevOp = s[i] 
            cur = 0 
		}
	}
    let sum = 0
    nums.forEach(v => {
        sum += v
    })
    return sum
};
```

## [698. 划分为k个相等的子集](https://leetcode-cn.com/problems/partition-to-k-equal-sum-subsets/)

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function (nums, k) {
    // 排除一些基本情况
    if (k > nums.length) return false;
    let sum = nums.reduce((pre, cur) => pre + cur);
    if (sum % k != 0) return false;
    /**
     * 递归穷举 nums 中的每个数字
     * @param {*} nums
     * @param {*} index 开始索引
     * @param {*} bucket 桶
     * @param {*} target 每个桶都需要达成的目标和
     */
    const backtrack = (nums, index, bucket, target) => {
        // 检查所有桶的数字之和是否都是 target
        if (index == nums.length) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i] != target) {
                    return false;
                }
            }
            // nums 成功平分成 k 个子集
            return true;
        }
        // 穷举 nums[index] 可能装入的桶
        for (let i = 0; i < bucket.length; i++) {
            // 剪枝，桶装装满了
            if (bucket[i] + nums[index] > target) {
                continue;
            }
            // 将 nums[index] 装入 bucket[i]
            bucket[i] += nums[index];
            // 递归穷举下一个数字的选择
            if (backtrack(nums, index + 1, bucket, target)) {
                return true;
            }
            // 撤销选择
            bucket[i] -= nums[index];
        }
        // nums[index] 装入哪个桶都不行
        return false;
    };
    // k 个桶（集合），记录每个桶装的数字之和
    let bucket = new Array(k).fill(0);
    // 理论上每个桶（集合）中数字的和
    let target = sum / k;
    /* 降序排序 nums 数组   优化方式，以期尽快的命中剪枝*/
    nums.sort((a, b) => b - a);
    // 穷举，看看 nums 是否能划分成 k 个和为 target 的子集
    return backtrack(nums, 0, bucket, target);
};
```

## [231. 2 的幂](https://leetcode-cn.com/problems/power-of-two/)

```js
var isPowerOfTwo = function(n) {
    return n > 0 && (n & (n - 1)) === 0; // 1000 0111
};
```

## [剑指 Offer 45. 把数组排成最小的数](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/)

> 我们最终要达到的效果是把数组里所有数字拼接起来排成一个数，并且这个数是拼接的所有数字中最小的
> 利用分治的思想，如果这个数组只有两个数字，那这两个数字(假设这俩数字叫a b)拼接的规则无非是ab或者ba，那么我们比较这俩拼接结果哪个小我们就采用哪个

```js
/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function (nums) {
  return nums.sort((a, b) => `${a}${b}` - `${b}${a}`).join(""); // sort改变原数组内容
};
```

## [169. 多数元素](https://leetcode-cn.com/problems/majority-element/)

```js
var majorityElement = function(nums) {
    nums.sort()
    return nums[parseInt(nums.length/2)]
};
```

