---
date: 2022-03-22
icon: page
star: true
---

# 快手CodeTop

#### [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

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

#### [110. 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

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

#### [7. 整数反转](https://leetcode-cn.com/problems/reverse-integer/)

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

