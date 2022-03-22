---
date: 2022-03-22
icon: page
star: true
---

# 字节跳动
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

