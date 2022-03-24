---
date: 2022-03-22
icon: page
star: true
---

# 字节跳动CodeTop
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

#### [43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)

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

#### [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

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

#### [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

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

#### [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

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

#### [695. 岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/)

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

#### [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

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

#### [15. 三数之和](https://leetcode-cn.com/problems/3sum/)

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

#### [155. 最小栈](https://leetcode-cn.com/problems/min-stack/)

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

#### [209. 长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

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

#### [230. 二叉搜索树中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)

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

#### [226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

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

#### [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

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

#### [94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

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

#### [429. N 叉树的层序遍历](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)

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

#### [718. 最长重复子数组](https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/)

二维dp去做，有点难理解

#### [93. 复原 IP 地址](https://leetcode-cn.com/problems/restore-ip-addresses/)

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

#### [912. 排序数组](https://leetcode-cn.com/problems/sort-an-array/)

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    return nums.sort((a,b)=> a - b)
};
```

#### [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

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

#### [113. 路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/)

> 同时维护res 答案数组和path路径数组（用于回溯）

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

#### [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

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

#### [剑指 Offer 09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

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

