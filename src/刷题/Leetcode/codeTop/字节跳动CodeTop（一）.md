---
date: 2022-03-22
---

# 字节跳动CodeTop（一）
## [400. 第 N 位数字](https://leetcode-cn.com/problems/nth-digit/)

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

## [165. 比较版本号](https://leetcode-cn.com/problems/compare-version-numbers/)

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

## [415. 字符串相加](https://leetcode-cn.com/problems/add-strings/)

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

## [43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)

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



## [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

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

## [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

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
    let l = 0, r = 0, res = 1; // 看成左中右也行，用于暂存数据
    for (let i = 1; i <= n; i++) {
        l = r // 逐个右移操作
        r = res
        res = l + r
    }
    return res
};
```

## [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

> 中心扩散方法，区分偶数与奇数长度回文串

```js
var longestPalindrome = function (s) {
    let res = ""
    for (let i = 0; i < s.length; i++) {
        // 处理奇数回文串
        const s1 = palindrome(s, i, i)
        // 处理偶数回文串
        const s2 = palindrome(s, i, i + 1)
        res = res.length <= s1.length ? s1 : res
        res = res.length <= s2.length ? s2 : res
    }
    return res
};

// 返回以l,r为中心点扩散的最长回文串
function palindrome(s, l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
        l--
        r++
    }
    return s.slice(l + 1, r)
}
```

## [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

```js
/**
 * Created by Yihui_Shi on 2022/2/25 13:07
 */
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let rows = grid.length,
        cols = grid[0].length;
    // 方向数组
    let directions = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
    ];
    // 深度优先搜索
    const dfs = (i, j) => {
        // 超出边界 或者本身就已经是海水了
        if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] == 0) return;
        // 淹没它 避免重复访问
        grid[i][j] = 0;
        for (let dir of directions) {
            dfs(dir[0] + i, dir[1] + j);
        }
    };
    let count = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] == 1) {
                count++;
                // 淹没整个岛屿
                dfs(i, j);
            }
        }
    }
    return count;
};
```

## [695. 岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/)

> 方法1.dfs
> 思路：深度优先，先循环网格， 当grid[x][y] === 1时，将当前单元格置为0并上下左右不断递归，计算每个岛屿的大小，然后不断更新最大岛屿
> 复杂度：时间复杂度O(mn)，m、n分别是网格的长和宽。空间复杂度O(mn)，递归最大深度

```js
var maxAreaOfIsland = function(grid) {
    let row = grid.length, col = grid[0].length;
    function dfs (x, y) {
      	//越界判断 当grid[x][y] === 0时 直接返回
        if (x < 0 || x >= row || y < 0 || y >= col || grid[x][y] === 0) return 0;
        grid[x][y] = 0;//当grid[x][y] === 1时，将当前单元格置为0
        let ans = 1, dx = [-1, 1, 0, 0], dy = [0, 0, 1, -1];//方向数组
        for (let i = 0; i < dx.length; i++) {//上下左右不断递归，计算每个岛屿的大小
            ans += dfs(x + dx[i], y + dy[i]);
        }
        return ans;
    }
    let res = 0;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            res = Math.max(res, dfs(i, j));//循环网格 更新最大岛屿
        }
    }
    return res;
};
```

> 方法2.bfs
> 思路：广度优先，循环网格，不断将当前网格的坐标加入队列，如果当前网格对应的值是1，则置为0，然后向四周扩散，找到下一层的网格坐标，加入队列，直到队列为空
> 复杂度：时间复杂度O(mn)，m、n分别是网格的长和宽。空间复杂度O(mn)，queue的大小
>

```js
var maxAreaOfIsland = function(grid) {
    let ans = 0, row = grid.length, col = grid[0].length;
    let dx = [1, -1, 0, 0], dy = [0, 0, 1, -1];//方向数组
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === 0) continue;//循环网格，遇到0就跳过
            let queue = [[i, j]], curr = 0;//在队列中加入当前网格的值
            while (queue.length > 0) {
                let [x, y] = queue.shift();//不断出队
              	// 越界判断
                if (x < 0 || x >= row || y < 0 || y >= col || grid[x][y] === 0) continue;
                ++curr;//更新岛屿的数量
                grid[x][y] = 0;//遍历过的网格置为0
                for (let k = 0; k < dx.length; k++) {//上下左右遍历，把下一层的节点加入队列
                    queue.push([x + dx[k], y + dy[k]]);
                }
            }
            ans = Math.max(ans, curr);//更新最大岛屿面积
        }
    }
    return ans;
};
```

## [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

> 标记

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = function(head) {
  while (head) {
    if (head.tag) {
      return true;
    }
    head.tag = true;
    head = head.next;
  }
  return false;
};
```

> json歪门邪道

```js
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    try {
        JSON.stringify(head)
    } catch{
        return true
    }
    return false
};
```

## [15. 三数之和](https://leetcode-cn.com/problems/3sum/)

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  // 最左侧值为定值，右侧所有值进行两边推进计算
  let res = [];
  nums.sort((a, b) => a - b);
  let size = nums.length;
  if (nums[0] <= 0 && nums[size - 1] >= 0) {
    // 保证有正数负数
    let i = 0;
    while (i < size - 2) {
      if (nums[i] > 0) break; // 最左侧大于0，无解
      let first = i + 1;
      let last = size - 1;
      while (first < last) {
        if (nums[i] * nums[last] > 0) break; // 三数同符号，无解
        let sum = nums[i] + nums[first] + nums[last];
        if (sum === 0) {
          res.push([nums[i], nums[first], nums[last]]);
        }
        if (sum <= 0) {
          // 负数过小，first右移
          while (nums[first] === nums[++first]) {} // 重复值跳过
        } else {
          while (nums[last] === nums[--last]) {} // 重复值跳过
        }
      }
      while (nums[i] === nums[++i]) {}
    }
```

## [155. 最小栈](https://leetcode-cn.com/problems/min-stack/)

> 双栈，维护一个最小值栈

```js
var MinStack = function() {
    this.x_stack = [];
    this.min_stack = [Infinity];
};

MinStack.prototype.push = function(x) {
    this.x_stack.push(x);
    this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

MinStack.prototype.pop = function() {
    this.x_stack.pop();
    this.min_stack.pop();
};

MinStack.prototype.top = function() {
    return this.x_stack[this.x_stack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.min_stack[this.min_stack.length - 1];
};
```

## [209. 长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

> 滑动窗口

```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */

var minSubArrayLen = function(target, nums) {
    // 长度计算一次
    const len = nums.length;
    let l = r = sum = 0, 
        res = len + 1; // 子数组最大不会超过自身
    while(r < len) {
        sum += nums[r++];
        // 窗口滑动
        while(sum >= target) {
            // r始终为开区间 [l, r)
            res = res < r - l ? res : r - l;
            sum-=nums[l++];
        }
    }
    return res > len ? 0 : res;
};
```

## [230. 二叉搜索树中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)

> 中序遍历（先找到最小元素并逐个遍历k次）

```js
var kthSmallest = function(root, k) {
    const stack = [];
    while (root != null || stack.length) {
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        --k;
        if (k === 0) {
            break;
        }
        root = root.right;
    }
    return root.val;
};
```

## [226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

```js
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (root === null) {
        return null;
    }
    const left = invertTree(root.left);
    const right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
};
```

```js
const invertTree = (root) => {
  if (root == null) { // 遍历到null节点时，不用翻转，直接返回它本身
    return root;
  }
  invertTree(root.left);
  invertTree(root.right);

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  return root;
};
```

## [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

> 递归
>
> 也就是说，两个链表头部值较小的一个节点与剩下元素的 `merge` 操作结果合并。

```js
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) {
        return l2;
    } else if (l2 === null) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};
```



> 迭代
>
> 更像是模仿过程，更适合理解

```js
var mergeTwoLists = function(l1, l2) {
    const prehead = new ListNode(-1);

    let prev = prehead;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }

    // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
    prev.next = l1 === null ? l2 : l1;

    return prehead.next;
};
```

## [94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

> 手写一个递归

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const res = [];
    const tracersal = (root) =>{
        if(root==null){
            return res;
        }
        tracersal(root.left);
        res.push(root.val);
        tracersal(root.right);
    }
    tracersal(root)
    return res;
};
```

> 不要忘记迭代

```js
var inorderTraversal = function(root) {
    const res = [];
    const stk = [];
    while (root || stk.length) {
        while (root) {
            stk.push(root);
            root = root.left;
        }
        root = stk.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
};
```

## [429. N 叉树的层序遍历](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)

> 并不像二叉树层序那么简单

```js
/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let res = [];
  if (root == null) return res;
  let queue = [root];
  while (queue.length) {
    let size = queue.length;
    let level = [];
    while (size--) {
      let cur = queue.shift();
      level.push(cur.val);
      for (let node of cur.children) { // 你不说谁知道这个是啥可迭代对象
        if (node) queue.push(node);
      }
    }
    res.push(level);
  }
  return res;
};
```

## [718. 最长重复子数组](https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/)

二维dp去做，有点难理解

## [93. 复原 IP 地址](https://leetcode-cn.com/problems/restore-ip-addresses/)

> ```
> 输入：s = "25525511135"
> 输出：["255.255.11.135","255.255.111.35"]
> ```

```js
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    const SEG_COUNT = 4;
    const segments = new Array(SEG_COUNT);
    const ans = [];

    const dfs = (s, segId, segStart) => {
        // 如果找到了 4 段 IP 地址并且遍历完了字符串，那么就是一种答案
        if (segId === SEG_COUNT) {
            if (segStart === s.length) {
                ans.push(segments.join('.'));
            }
            return;
        }

        // 如果还没有找到 4 段 IP 地址就已经遍历完了字符串，那么提前回溯
        if (segStart === s.length) {
            return;
        }

        // 由于不能有前导零，如果当前数字为 0，那么这一段 IP 地址只能为 0
        if (s.charAt(segStart) === '0') {
            segments[segId] = 0;
            dfs(s, segId + 1, segStart + 1);
        }

        // 一般情况，枚举每一种可能性并递归
        let addr = 0;
        for (let segEnd = segStart; segEnd < s.length; ++segEnd) {
            addr = addr * 10 + (s.charAt(segEnd) - '0');
            if (addr > 0 && addr <= 0xFF) {
                segments[segId] = addr;
                dfs(s, segId + 1, segEnd + 1);
            } else {
                break;
            }
        }
    }

    dfs(s, 0, 0);
    return ans;
};
```

## [912. 排序数组](https://leetcode-cn.com/problems/sort-an-array/)

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    return nums.sort((a,b)=> a - b)
};
```

## [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var maxDepth = function (root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```

## [113. 路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/)

> 同时维护res 答案数组和path路径数组（用于回溯）

```js
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
const pathSum = function (root, targetSum) {
    // 递归法
    // 要遍历整个树找到所有路径，所以递归函数不需要返回值, 与112不同
    const res = [];
    const travelsal = (node, cnt, path) => {
        // 遇到了叶子节点且找到了和为sum的路径
        if (cnt === 0 && !node.left && !node.right) {
            res.push([...path]); // 不能写res.push(path), 要深拷贝
            return;
        }
        if (!node.left && !node.right) return; // 遇到叶子节点而没有找到合适的边，直接返回
        // 左 （空节点不遍历）
        if (node.left) {
            path.push(node.left.val);
            travelsal(node.left, cnt - node.left.val, path); // 递归
            path.pop(); // 回溯
        }
        // 右 （空节点不遍历）
        if (node.right) {
            path.push(node.right.val);
            travelsal(node.right, cnt - node.right.val, path); // 递归
            path.pop(); // 回溯
        }
    };
    if (!root) return res;
    travelsal(root, targetSum - root.val, [root.val]); // 把根节点放进路径
    return res;
};
```

## [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

> 贪心不一定是对的

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

## [剑指 Offer 09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

> 将一个栈当作输入栈，用于压入 appendTail 传入的数据；另一个栈当作输出栈，用于 deleteHead 操作。
>
> deleteHead 时，若输出栈为空则将输入栈的全部数据依次弹出并压入输出栈，这样输出栈从栈顶往栈底的顺序就是队列从队首往队尾的顺序。
>

```js
var CQueue = function() {
    this.stackA = [];
    this.stackB = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stackA.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if(this.stackB.length){
        return this.stackB.pop();
    }else{
        while(this.stackA.length){
            this.stackB.push(this.stackA.pop());
        }
        if(!this.stackB.length){
            return -1;
        }else{
            return this.stackB.pop();
        }
    }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```

## [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

> 一边一直访问，并存入set

```js
var getIntersectionNode = function(headA, headB) {
    const visited = new Set();
    let temp = headA;
    while (temp !== null) {
        visited.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while (temp !== null) {
        if (visited.has(temp)) {
            return temp;
        }
        temp = temp.next;
    }
    return null;
};
```

## [62. 不同路径](https://leetcode-cn.com/problems/unique-paths/)

> 寻路问题
>
> 动态规划 *f*(*i*,*j*)=*f*(*i*−1,*j*)+*f*(*i*,*j*−1)

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const f = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        f[i][0] = 1; // 边界为1
    }
    for (let j = 0; j < n; j++) {
        f[0][j] = 1; // 边界为1
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            f[i][j] = f[i - 1][j] + f[i][j - 1];
        }
    }
    return f[m - 1][n - 1];
};
```

## [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

> 递归对比左右子树，终止为左右子树均null

```js
const isSymmetric = function(root) {
    if(!root) return true;
    const isMirror = (l, r) => {
        if(!l && !r) return true
        return !!(l && r && l.val === r.val &&
            isMirror(l.left, r.right) &&
            isMirror(l.right, r.left));
    }
    
    return isMirror(root.left, root.right);
};
```

## [14. 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)

> 取第一个字符串为默认ans（本就最长不超过此），后遍历

<img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220328124018508.png" alt="image-20220328124018508" style="zoom: 50%;" />

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length == 0) 
        return "";
    let ans = strs[0];
    for(let i =1;i<strs.length;i++) {
        let j=0;
        for(;j<ans.length && j < strs[i].length;j++) {
            if(ans[j] != strs[i][j])
                break;
        }
        ans = ans.substr(0, j);
        if(ans === "")
            return ans;
    }
    return ans;
};
```

## [468. 验证IP地址](https://leetcode-cn.com/problems/validate-ip-address/)

```js
var validIPAddress = function(IP) {
    const arr4 = IP.split(".");
    const arr6 = IP.split(":");
    if (arr4.length === 4) {
        if (arr4.every(part => (part.match(/^0$|^([1-9]\d{0,2})$/) && part < 256) )) {
            return "IPv4";
        }
    } else if (arr6.length === 8) {
        if (arr6.every(part => part.match(/^[0-9a-fA-F]{1,4}$/))) {
            return "IPv6";
        }
    }
    return "Neither";
};
```

## [105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

> 查找分割点（子树的根节点）

```js
var buildTree = function(preorder, inorder) {
    if(!preorder.length)
        return null;
    let root = new TreeNode(preorder[0]);
    let mid = inorder.findIndex((number) => number === root.val);// 分割点的关键
    root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
    root.right = buildTree(preorder.slice(mid + 1, preorder.length), inorder.slice(mid + 1, inorder.length));
    return root;
};
```



> 中后序

```js
var buildTree = function(inorder, postorder) {
    if (!postorder.length) return null
    
    let root = new TreeNode(postorder[postorder.length - 1])
    
    let index = inorder.findIndex(number => number === root.val)// 分割点的关键
    
    root.left = buildTree(inorder.slice(0, index), postorder.slice(0, index))
    root.right = buildTree(inorder.slice(index + 1, inorder.length), postorder.slice(index, postorder.length - 1))
    
    return root
};
```

## [199. 二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/)

> 看图我们发现, 右视图的节点都是**每一层的最后一个节点**, 所以采用**层序遍历**最为方便

```js
var rightSideView = function(root) {
    //二叉树右视图 只需要把每一层最后一个节点存储到res数组
    let res=[],queue=[];
    queue.push(root);
    while(queue.length&&root!==null){
        // 记录当前层级节点个数
        let length=queue.length;
        while(length--){
            let node=queue.shift();
            //length长度为0的时候表明到了层级最后一个节点
            if(!length){
                res.push(node.val);
            }
            node.left&&queue.push(node.left); // 同时成立，执行并返回第二个
            node.right&&queue.push(node.right);
        }
    }
    return res;
};
```

## [394. 字符串解码](https://leetcode-cn.com/problems/decode-string/)

> 有效括号 pluse 栈操作

双栈操作

![image-20220328161937446](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220328161937446.png)

```js
const decodeString = (s) => {
    let numStack = [];        // 存倍数的栈
    let strStack = [];        // 存 待拼接的str 的栈
    let num = 0;              // 倍数的“搬运工”
    let result = '';          // 字符串的“搬运工”
    
    for (const char of s) {   // 逐字符扫描
        if (!isNaN(char)) {   // 遇到数字
            num = num * 10 + Number(char); // 算出倍数
        } else if (char == '[') {  // 遇到 [
            strStack.push(result); // result串入栈
            result = '';           // 入栈后清零
            numStack.push(num);    // 倍数num进入栈等待（是算好的，比如32）
            num = 0;               // 入栈后清零
        } else if (char == ']') {  // 遇到 ]，两个栈的栈顶出栈
            let repeatTimes = numStack.pop(); // 获取拷贝次数
            result = strStack.pop() + result.repeat(repeatTimes); // 构建子串
        } else {                   
            result += char;        // 遇到字母，追加给result串
        }
    }
    return result;
};
```

## [剑指 Offer 62. 圆圈中最后剩下的数字](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)

> 迭代更合适

```js
var lastRemaining = function (n, m) {
    let res = 0;
    for (let i = 2; i <= n; i++) {
        res = (m + res) % i; // 除以循环被削减的个数
    }
    return res;
};
```

> 递归

```js
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

## [103. 二叉树的锯齿形层序遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

> 程序遍历变种，微调即可

```js
var zigzagLevelOrder = function(root) {
    if (!root) {
        return []; // 空值直接返回
    }

    const ans = [];
    const nodeQueue = [root]; // 记录访问的node点

    let isOrderLeft = true; // 顺序flag，从左开始

    while (nodeQueue.length) {
        let levelList = []; // 每层答案
        const size = nodeQueue.length; // 每层的节点个数，用于遍历计数
        for (let i = 0; i < size; ++i) {
            const node = nodeQueue.shift();
            if (isOrderLeft) { // 在程序遍历基础上，按照不同方向注入每行队列即可
                levelList.push(node.val);
            } else {
                levelList.unshift(node.val);
            }
            if (node.left !== null) {
                nodeQueue.push(node.left);
            }
            if (node.right !== null) {
                nodeQueue.push(node.right);
            }
        }            
        ans.push(levelList); // push每层节点
        isOrderLeft = !isOrderLeft; // 反转
    }

    return ans;
};
```

## [31. 下一个排列](https://leetcode-cn.com/problems/next-permutation/)

> 思路
> 如何变大：从低位挑一个大一点的数，交换前面一个小一点的数。
> 变大的幅度要尽量小。
> 像 [3,2,1] 这样递减的，没有下一个排列，已经稳定了，没法变大。
> 像 [1,5,2,4,3,2] 这种，怎么稍微变大？
>
> - **从右往左，寻找第一个比右邻居小的数**，把它换到后面去
>   - “第一个”意味着尽量是低位，“比右邻居小”意味着它是从右往左的第一个波谷
>     比如，1 5 (2) 4 3 2，中间这个 2。
>
> - **接着还是从右往左，寻找第一个比这个 2 大的数**。15 (2) 4 (3) 2，交换后：15 (3) 4 (2) 2。
>
> - 还没结束！变大的幅度可以再小一点，仟位微变大了，后三位可以再小一点。
>
> - **后三位肯定是递减的，翻转**，变成[1,5,3,2,2,4]，即为所求。

```js
function nextPermutation(nums) {
    let i = nums.length - 2;                   // 向左遍历，i从倒数第二开始是为了nums[i+1]要存在
    while (i >= 0 && nums[i] >= nums[i + 1]) { // 寻找第一个小于右邻居的数
        i--;
    }
    if (i >= 0) {                             // 这个数在数组中存在，从它身后挑一个数，和它换
        let j = nums.length - 1;                // 从最后一项，向左遍历
        while (j >= 0 && nums[j] <= nums[i]) {  // 寻找第一个大于 nums[i] 的数
            j--;
        }
        [nums[i], nums[j]] = [nums[j], nums[i]]; // 两数交换，实现变大
    }
    // 如果 i = -1，说明是递减排列，如 3 2 1，没有下一排列，直接翻转为最小排列：1 2 3
    let l = i + 1;           
    let r = nums.length - 1;
    while (l < r) {                            // i 右边的数进行翻转，使得变大的幅度小一些
        [nums[l], nums[r]] = [nums[r], nums[l]];
        l++;
        r--;
    }
}
```

## [283. 移动零](https://leetcode-cn.com/problems/move-zeroes/)

```js
var moveZeroes = function(nums) {
     nums.sort((a,b) => b? 1: -1) // b = 0 ，逆序排列
};
```

```js
var moveZeroes = function (nums) {
    let i = 0;
    const zeroes = [];
    while (i < nums.length) {
        if (nums[i] === 0) {
            let zero = nums.splice(i,1);
            zeroes.push(...zero);
            i--;
        }
        i++;
    }
    nums.push(...zeroes)
};
```

## [394. 字符串解码](https://leetcode-cn.com/problems/decode-string/)

> 有效括号加强版
>

```js
const decodeString = (s) => {
    let numStack = [];        // 存倍数的栈
    let strStack = [];        // 存 待拼接的str 的栈
    let num = 0;              // 倍数的“搬运工”
    let result = '';          // 字符串的“搬运工”
    for (const char of s) {   // 逐字符扫描
        if (!isNaN(char)) {   // 遇到数字
            num = num * 10 + Number(char); // 算出倍数
        } else if (char == '[') {  // 遇到 [
            strStack.push(result); // result串入栈
            result = '';           // 入栈后清零
            numStack.push(num);    // 倍数num进入栈等待
            num = 0;               // 入栈后清零
        } else if (char == ']') {  // 遇到 ]，两个栈的栈顶出栈
            let repeatTimes = numStack.pop(); // 获取拷贝次数
            result = strStack.pop() + result.repeat(repeatTimes); // 构建子串
        } else {                   
            result += char;        // 遇到字母，追加给result串
        }
    }
    return result;
};
```

## [171. Excel 表列序号](https://leetcode-cn.com/problems/excel-sheet-column-number/)

```js
var titleToNumber = function(columnTitle) {
    let number = 0;
    let multiple = 1;
    for (let i = columnTitle.length - 1; i >= 0; i--) {
        const k = columnTitle[i].charCodeAt() - 'A'.charCodeAt() + 1;
        number += k * multiple;
        multiple *= 26;
    }
    return number;
};
```

## [168. Excel表列名称](https://leetcode-cn.com/problems/excel-sheet-column-title/)

```js
var convertToTitle = function(columnNumber) {
    let ans = [];
    while (columnNumber > 0) {
        const a0 = (columnNumber - 1) % 26 + 1; // 算低位
        ans.push(String.fromCharCode(a0 - 1 + 'A'.charCodeAt()));
        columnNumber = Math.floor((columnNumber - a0) / 26); // 算进位
    }
    return ans.reverse().join('');
};
```

## [349. 两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    const res = new Set();
    if (nums1.length > nums2.length) {
        return intersection(nums2, nums1);
    }
    for (const val of nums1) {
        if (nums2.indexOf(val) !== -1) {
            res.add(val);
        }
    }
    return [...res];
};
```

## [836. 矩形重叠](https://leetcode-cn.com/problems/rectangle-overlap/)

> 转换为投影的公共部分

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204041647072.png" alt="ds_183" style="zoom:50%;" />

```js
var isRectangleOverlap = function(rec1, rec2) {
    const [x1, y1, x2, y2] = rec1;
    const [x3, y3, x4, y4] = rec2;
    return !(x1 >= x4 || x3 >= x2 || y3 >= y2 || y1 >= y4);
};
```

## [67. 二进制求和](https://leetcode-cn.com/problems/add-binary/)

> 溢出了

```js
var addBinary = function (a, b) {
    a = parseInt(a, 2);
    b = parseInt(b, 2);
    return (a + b).toString(2)
};
```

> 逐个计算

```js
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let ans = "";
    let ca = 0;
    for(let i = a.length - 1, j = b.length - 1;i >= 0 || j >= 0; i--, j--) {
        let sum = ca;
        sum += i >= 0 ? parseInt(a[i]) : 0;
        sum += j >= 0 ? parseInt(b[j]) : 0;
        ans += sum % 2;
        ca = Math.floor(sum / 2);
    }
    ans += ca == 1 ? ca : "";
    return ans.split('').reverse().join('');
};
```

## [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let head = null, tail = null; // 头节点和节点指针
    let carry = 0;
    while (l1 || l2) {
        const n1 = l1 ? l1.val : 0;
        const n2 = l2 ? l2.val : 0;
        const sum = n1 + n2 + carry;
        if (!head) {
            head = tail = new ListNode(sum % 10);
        } else {
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }
        carry = Math.floor(sum / 10);
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }
    if (carry > 0) {
        tail.next = new ListNode(carry);
    }
    return head;
};
```

## [221. 最大正方形](https://leetcode-cn.com/problems/maximal-square/)

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204041724654.png" alt="fig1" style="zoom:50%;" />

> 左、上、左上

```js
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  const row = matrix.length;
  const col = matrix[0].length;
  const dp = new Array(row).fill(0).map(() => new Array(col).fill(0));

  let maxLen = 0;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix[i][j] === "0") continue;
      dp[i][j] =
        Math.min(
          dp[i - 1]?.[j] || 0,
          dp[i][j - 1] || 0,
          dp[i - 1]?.[j - 1] || 0
        ) + 1;
      maxLen = Math.max(maxLen, dp[i][j]);
    }
  }

  return maxLen * maxLen;
};
```

