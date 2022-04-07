---
date: 2022-04-06
icon: page
sticky: true
star: true
---

# 字节跳动CodeTop（三）

#### [83. 删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if (!head) {
        return head;
    }

    let cur = head;
    while (cur.next) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
    }
    return head;
};
```

#### [543. 二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

> 子问题：比较左右子树最大深度 + 1

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204061659218.png" alt="baf2f6ea1ae76ba383eb1753254340f089dac9f03664f93990d6ae54f8560970-image.png" style="zoom: 33%;" />

```js
var diameterOfBinaryTree = function(root) {
    // 默认为1是因为默认了根节点自身的路径长度
    let ans = 1;

    function depth(rootNode) {
        if (!rootNode) {
            // 如果不存在根节点，则深度为0
            return 0;
        }
        // 递归，获取左子树的深度
        let L = depth(rootNode.left);
        // 递归，获取右子树的深度
        let R = depth(rootNode.right);

        /* 关键点1
        L+R+1的公式是如何而来？
        等同于：左子树深度(节点个数) + 右子树深度（节点个数） + 1个根节点
        便是这株二叉树从最左侧叶子节点到最右侧叶子节点的最长路径
        类似于平衡二叉树的最小值节点到最大值节点的最长路径
        之所以+1是因为需要经过根节点
         */
        // 获取该树的最长路径和现有最长路径中最大的那个
        ans = Math.max(ans, L + R + 1);
        /* 关键点2
        已知根节点的左右子树的深度，
        则，左右子树深度的最大值 + 1，
        便是以根节点为数的最大深度*/
        return Math.max(L, R) + 1; // 包括当前根节点
    }

    depth(root);

    // 由于depth函数中已经默认加上数节点的自身根节点路径了，故此处需减1
    return ans - 1;
}; 
```

#### [225. 用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)

```js
let MyStack = function() {
    this.queue = [];
    this._queue = [];
};

MyStack.prototype.push = function(x) {
    this.queue.push(x);
};

MyStack.prototype.pop = function() {
    while(this.queue.length > 1){
        this._queue.push(this.queue.shift());
    }
    let ans = this.queue.shift();
    while(this._queue.length){
        this.queue.push(this._queue.shift());
    }
    return ans;
};

MyStack.prototype.top = function() {
    return this.queue.slice(-1)[0];
};

MyStack.prototype.empty = function() {
    return !this.queue.length;
};
```

#### [572. 另一棵树的子树](https://leetcode-cn.com/problems/subtree-of-another-tree/)

```js
var isSubtree = function (s, t) {
  if (s == null) {
    return false;
  }
  if (isSameTree(s, t)) {
    return true;
  }
  return isSubtree(s.left, t) || isSubtree(s.right, t); // 有一个true就true
};
/*
  isSameTree
    两树同为 null 则相同
    一个 null 一个不是，则不同；
    两个树都不为 null，则递归判断左右子树是否相同
*/
function isSameTree(s, t) { // 100题
  if (s == null && t == null) {
    return true;
  };
  if (s == null || t == null) {
    return false;
  }
  return s.val == t.val && isSameTree(s.left, t.left) && isSameTree(s.right, t.right);
}
```

#### [剑指 Offer 61. 扑克牌中的顺子](https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/)

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
  let set = new Set();
  let max = 0,
    min = 14;
  for (let a of nums) {
    // 跳过大小王;
    if (a == 0) continue;
    max = Math.max(a, max);
    min = Math.min(a, min);
    // 若有重复，提前返回 false
    if (set.has(a)) return false;
    set.add(a);
  }
  // 最大牌 - 最小牌 < 5 则可构成顺子
  return max - min < 5;
};
```

#### [83. 删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if (!head) {
        return head;
    }

    let cur = head;
    while (cur.next) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next; // 跳过该节点
        } else {
            cur = cur.next;
        }
    }
    return head;
};
```

#### [剑指 Offer 29. 顺时针打印矩阵](https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)

> 模拟，并记录已经被访问的位置

```js
var spiralOrder = function(matrix) {
    if (!matrix.length || !matrix[0].length) {
        return [];
    }
    const rows = matrix.length, columns = matrix[0].length;
    const visited = new Array(rows).fill(0).map(() => new Array(columns).fill(false));
    const total = rows * columns;
    const order = new Array(total).fill(0);

    let directionIndex = 0, row = 0, column = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // 方向数组
    for (let i = 0; i < total; i++) { 
        order[i] = matrix[row][column];
        visited[row][column] = true;
        const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
        if (!(0 <= nextRow && nextRow < rows && 0 <= nextColumn && nextColumn < columns && !(visited[nextRow][nextColumn]))) {
            directionIndex = (directionIndex + 1) % 4; // 方向切换
        }
        row += directions[directionIndex][0];
        column += directions[directionIndex][1];
    }
    return order;
};
```

#### [剑指 Offer 11. 旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)

```js
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
    return numbers.sort((a, b) => a - b)[0]
};
```

#### [26. 删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            nums.splice(i, 1);
            i--; // 删除后数组缩短，留在原地
        }
    }
};
```

#### [191. 位1的个数](https://leetcode-cn.com/problems/number-of-1-bits/)

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    return n.toString(2).split('1').length - 1;
};
```

#### [剑指 Offer 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

```js
var findRepeatNumber = function(nums) {
    let map = new Map();
    for(let i of nums){
        if(map.has(i)) return i;
        map.set(i, 1);
    }
    return null;
};
```

#### [977. 有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    return nums.map((val) => val ** 2).sort((a, b) => a - b);
};
```

#### [108. 将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/) :star:

> 递归 + 左右分割

```js
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const sortedArrayToBST = nums => {
    if (!nums.length) return null;
    // 去中间索引（÷2取整）
    const mid = nums.length >> 1;
    // 构建二叉树，根节点为中间值，左子树为左侧值继续构建，右子树为右子树继续构建
    return new TreeNode(
        nums[mid],
        sortedArrayToBST(nums.slice(0, mid)),
        sortedArrayToBST(nums.slice(mid + 1))
    );
};
```

