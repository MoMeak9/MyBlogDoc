---
date: 2022-04-06

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

#### [剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)

```js
var search = function (nums, target) {
    let count = 0;
    nums.forEach((val) => {
        if (val === target) count++;
    })
    return count;
};
```

#### [剑指 Offer 40. 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)

```js
var getLeastNumbers = function (arr, k) {
    arr.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < k; i++) {
        res.push(arr[i]);
    }
    return res;
};
```

#### [71. 简化路径](https://leetcode.cn/problems/simplify-path/)

> ![image-20220629153730110](https://cdn.yihuiblog.top/images/202206291537170.png)

```js
var simplifyPath = function(path) {
    const names = path.split("/");
    const stack = [];
    for (const name of names) {
        if (name === "..") {
            if (stack.length) {
                stack.pop();
            } 
        } else if (name.length && name !== ".") {
            stack.push(name);

        }
    }
    
    return "/" + stack.join("/");
};
```

#### [162. 寻找峰值](https://leetcode.cn/problems/find-peak-element/)

**方法一：寻找最大值**

**方法二：迭代爬坡**

> 你必须实现时间复杂度为 `O(log n)` 的算法来解决此问题。

**方法三：方法二的二分查找优化**

```js
var findPeakElement = function(nums) {
    const n = nums.length;
    let left = 0, right = n - 1, ans = -1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (compare(nums, mid - 1, mid) < 0 && compare(nums, mid, mid + 1) > 0) {
            ans = mid;
            break;
        }
        if (compare(nums, mid, mid + 1) < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return ans;
}

// 辅助函数，输入下标 i，返回一个二元组 (0/1, nums[i])
// 方便处理 nums[-1] 以及 nums[n] 的边界情况
const get = (nums, idx) => {
    if (idx === -1 || idx === nums.length) {
        return [0, 0];
    }
    return [1, nums[idx]];
}

const compare = (nums, idx1, idx2) => {
    const num1 = get(nums, idx1);
    const num2 = get(nums, idx2);
    if (num1[0] !== num2[0]) {
        return num1[0] > num2[0] ? 1 : -1;
    }
    if (num1[1] === num2[1]) {
        return 0;
    }
    return num1[1] > num2[1] ? 1 : -1;
}
```

#### [443. 压缩字符串](https://leetcode.cn/problems/string-compression/)

> 压缩后得到的字符串 s 不应该直接返回 ，需要转储到字符数组 chars 中。需要注意的是，如果组长度为 10 或 10 以上，则在 chars 数组中会被拆分为多个字符。
>
> 请在 修改完输入数组后 ，返回该数组的新长度。
>
> 你必须设计并实现一个只使用常量额外空间的算法来解决此问题。

```
输入：chars = ["a","a","b","b","c","c","c"]
输出：返回 6 ，输入数组的前 6 个字符应该是：["a","2","b","2","c","3"]
解释："aa" 被 "a2" 替代。"bb" 被 "b2" 替代。"ccc" 被 "c3" 替代。
```

> 参考  双指针

```js
var compress = function(chars) {
    const n = chars.length;
    let write = 0, left = 0;
    for (let read = 0; read < n; read++) {
        if (read === n - 1 || chars[read] !== chars[read + 1]) {
            chars[write++] = chars[read];
            let num = read - left + 1;
            if (num > 1) {
                const anchor = write;
                while (num > 0) {
                    chars[write++] = '' + num % 10;
                    num = Math.floor(num / 10);
                }
                reverse(chars, anchor, write - 1);
            }
            left = read + 1;
        }
    }
    return write;
};

const reverse = (chars, left, right) => {
    while (left < right) {
        const temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        left++;
        right--;
    }
}
```

> 正则

```js
const compress = function (chars) {
    const charStr = chars.join("");
    const matchList = charStr.match(/(.)\1*/g) || [];
    
    const result = matchList.reduce((prev, item) => {
        prev += item.length > 1 ? item[0] + item.length : item
        return prev
    }, "").split("");
    
    chars.splice(0, chars.length, ...result)
};
```

#### [673. 最长递增子序列的个数](https://leetcode.cn/problems/number-of-longest-increasing-subsequence/)

**方法一：动态规划**

![image-20220630184638629](https://cdn.yihuiblog.top/images/202206301846700.png)

#### [12. 整数转罗马数字](https://leetcode.cn/problems/integer-to-roman/)

```js
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    let res = '';
    for (let i = 0; i < 13; i++) {
        while (num >= values[i]) {
            num -= values[i];
            res += symbols[i];
        }
    }
    return res;
};
```

#### [498. 对角线遍历](https://leetcode.cn/problems/diagonal-traverse/)

![image-20220630190325081](https://cdn.yihuiblog.top/images/202206301903147.png)





> 错误模拟

```js
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findDiagonalOrder = function (mat) {
    const res = [];
    let x = 0, y = 0
    while (x < mat[0].length && y < mat.length) {
        res.push(mat[x][y])
        if ((x + y) % 2 !== 0) {
            if (x === mat.length - 1) {
                y++;
            } else if (y === 0) {
                x++;
            } else {
                x++;
                y--;
            }
        } else {
            if (y === mat[0].length - 1) {
                x++;
            } else if (x === 0) {
                y++;
            } else {
                x--;
                y++;
            }
        }
    }
    return res;
};
```

> 解决单行单列等特殊情况

```js
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findDiagonalOrder = function(mat) {
    const m = mat.length;
    const n = mat[0].length;
    const res = new Array(m * n).fill(0);
    let pos = 0;
    for (let i = 0; i < m + n - 1; i++) {
        if (i % 2 === 1) {
            let x = i < n ? 0 : i - n + 1;
            let y = i < n ? i : n - 1;
            while (x < m && y >= 0) {
                res[pos] = mat[x][y];
                pos++;
                x++;
                y--;
            }
        } else {
            let x = i < m ? i : m - 1;
            let y = i < m ? 0 : i - m + 1;
            while (x >= 0 && y < n) {
                res[pos] = mat[x][y];
                pos++;
                x--;
                y++;
            }
        }
    }
    return res;
};
```

#### [面试题 01.03. URL化](https://leetcode.cn/problems/string-to-url-lcci/)

```js
/**
 * @param {string} S
 * @param {number} length
 * @return {string}
 */
var replaceSpaces = function(S, length) {
    return S.substr(0, length).split(' ').join('%20')
};
```

```js
var replaceSpaces = function (S, length) {
    const arr = S.substring(0, length).split('')
    return arr.reduce((pre, item) => {
        if (item === ' ') {
            return pre + '%20'
        } else {
            return pre + item;
        }
    }, '')
};
```

#### [119. 杨辉三角 II](https://leetcode.cn/problems/pascals-triangle-ii/)

> **递推方法：**
>
> 注意到对第 i+1 行的计算仅用到了第 i*i* 行的数据，因此可以使用**滚动数组**的思想优化空间复杂度。

```js
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    let pre = [], cur = [];
    for (let i = 0; i <= rowIndex; ++i) {
        cur = new Array(i + 1).fill(0);
        cur[0] = cur[i] =1;
        for (let j = 1; j < i; ++j) {
            cur[j] = pre[j - 1] + pre[j];
        }
        pre = cur;
    }
    return pre;
};
```



#### [414. 第三大的数](https://leetcode.cn/problems/third-maximum-number/)

> 默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
    nums = Array.from([...new Set(nums)]).sort((a,b)=>a-b)
    if (nums.length < 3) return nums[nums.length - 1]
    return nums[nums.length - 3]
};
```

