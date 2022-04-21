# Leetcode 企业题库

#### [13. 罗马数字转整数](https://leetcode-cn.com/problems/roman-to-integer/)

```js
var romanToInt = function (s) {
    const symbolValues = new Map([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000],
    ]);
    // 亦可使用对象
    let ans = 0;
    const n = s.length;
    for (let i = 0; i < n; ++i) {
        const value = symbolValues.get(s[i]);
        if (i < n - 1 && value < symbolValues.get(s[i + 1])) {
            ans -= value;
        } else {
            ans += value;
        }
    }
    return ans;
};
```

#### [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

> 双指针迭代吧

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

#### [118. 杨辉三角](https://leetcode-cn.com/problems/pascals-triangle/)

```js
var generate = function(numRows) {
    const ret = []; // 三角

    for (let i = 0; i < numRows; i++) {
        const row = new Array(i + 1).fill(1); // 自动生成行数
        for (let j = 1; j < row.length - 1; j++) {
            row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
        }
        ret.push(row);
    }
    return ret;
};
```

#### [171. Excel 表列序号](https://leetcode-cn.com/problems/excel-sheet-column-number/)

```js
var titleToNumber = function (columnTitle) {
    let res = 0;
    for (let i = 0; i < columnTitle.length; i++) {
        let num = columnTitle.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
        res += num * (26 ** (columnTitle.length - i - 1))
    }
    return res;
};
```

#### [202. 快乐数](https://leetcode-cn.com/problems/happy-number/)

> 可能出现无限循环的情况
>
> 首先分析一下无限循环是什么情况，刚好刷过了循环链表的题，很简单就可以理解无限循环肯定是部分情况一直转圈，类似
> 2 4 16 37 58 89 145 42 20 => 4 16 ...
> 所有解法完全可以搬运循环链表问题
>
> hash 存储出现过的数字，如果有重复的就证明死循环了
> 快慢指针，如果一个指针步长为 1，另一个步长为 2，在一个圈子里转，那么两个指针早晚会遇到，如果不在一个圈子里，肯定不会遇到

```js
var isHappy = function (n) {
    const set = new Set();
    while (n !== 1) {
        if (set.has(n)) return false
        set.add(n)
        n = n.toString().split('').reduce((l, i) => l + i * i, 0)
    }
    return true
};
```

> 快慢指针

```js
let getNext = function (n) {
    return n.toString().split('').map(i => i ** 2).reduce((a, b) => a + b);
}
let isHappy = function (n) {
    let slow = n;
    let fast = getNext(n);
    while(fast !== 1 && fast !== slow){
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    return fast === 1;
};
```

#### [237. 删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/)

> 和儿子交换，然后杀了（没得指向了）

```js
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};
```

#### [326. 3 的幂](https://leetcode-cn.com/problems/power-of-three/)

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
    while (n !== 0 && n % 3 === 0) {
        n = n / 3;
    }
    return n === 1;
};
```

#### [268. 丢失的数字](https://leetcode-cn.com/problems/missing-number/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    nums.sort((a, b) => a - b);
    let res = nums[0] ? 0 : nums[nums.length - 1] + 1;
    nums.forEach((val, index) => {
        if (index < nums.length - 1 && (++val) !== nums[index + 1]) {
            res = val;
        }
    })
    return res;
};
```

#### [412. Fizz Buzz](https://leetcode-cn.com/problems/fizz-buzz/)

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
    const res = [];
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            res.push('FizzBuzz');
        } else if (i % 3 === 0) {
            res.push('Fizz')
        } else if (i % 5 === 0) {
            res.push('Buzz')
        } else {
            res.push(i.toString())
        }
    }
    return res;
};
```

#### [278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)

> 二分查找

```js
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    return function(n) {
        let left = 1, right = n;
        while (left < right) { // 循环直至区间左右端点相同
            const mid = Math.floor( right + left / 2); // 防止计算时溢出
            if (isBadVersion(mid)) {
                right = mid; // 答案在区间 [left, mid] 中之后的为错误版本
            } else {
                left = mid + 1; // 答案在区间 [mid+1, right] 中
            }
        }
        // 此时有 left == right，区间缩为一个点，即为答案
        return left;
    };
};
```

#### [剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

> 暂存下一节点，前驱节点和当前节点

```js
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next; // 下移
    }
    return prev;
};
```

#### [剑指 Offer 30. 包含min函数的栈](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/)

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

MinStack.prototype.min = function() {
    return this.min_stack[this.min_stack.length - 1];
};
```

#### [434. 字符串中的单词数](https://leetcode-cn.com/problems/number-of-segments-in-a-string/)

```js
var countSegments = function(s) {
    let segmentCount = 0;

    for (let i = 0; i < s.length; i++) {
        if ((i === 0 || s[i - 1] === ' ') && s[i] !== ' ') { // 确定为每个单词的开始且不为空
            segmentCount++;
        }
    }

    return segmentCount;
};
```

#### [575. 分糖果](https://leetcode-cn.com/problems/distribute-candies/)

```js
/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
    const type = {count: 0};
    candyType.forEach(val => {
        if (!type[val]) {
            type[val] = true;
            type.count++;
        }
    })
    return type.count < candyType.length / 2 ? type.count : candyType.length / 2;
};
```

#### [27. 移除元素](https://leetcode-cn.com/problems/remove-element/)

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let left = 0, right = nums.length;
    while (left < right) {
        if (nums[left] === val) {
            nums[left] = nums[right - 1];
            right--;
        } else {
            left++;
        }
    }
    return left;
};
```

#### [594. 最长和谐子序列](https://leetcode-cn.com/problems/longest-harmonious-subsequence/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function(nums) {
    const cnt = new Map();
    let res = 0;
    for (const num of nums) {
        cnt.set(num, (cnt.get(num) || 0) + 1);
    }
    for (const key of cnt.keys()) {
        if (cnt.has(key + 1)) {
            res = Math.max(res, cnt.get(key) + cnt.get(key + 1));
        }
    }
    return res;
};
```

#### [605. 种花问题](https://leetcode-cn.com/problems/can-place-flowers/)

```js
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
    let count = 0
    for (let i = 0, length = flowerbed.length; i < length; i++) {
      //当前位置是0，并且前后都不是1，考虑在最前和最后的特殊情况
        if (flowerbed[i] === 0 && flowerbed[i - 1] !== 1 && flowerbed[i + 1] !== 1) {
            count++
            i++
        }
    }
    return count >= n
};
```

#### [235. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

- 二叉搜索树性质决定了：如果 p.val 和 q.val 都比 root.val 小，则p、q肯定在 root 的左子树。
- 那问题规模就变小了，递归左子树就行！
- 如果 p.val 和 q.val 都比 root.val 大，递归右子树就行！
- 其他情况，root 即为所求！

````js
const lowestCommonAncestor = (root, p, q) => {
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    return root;
};
````

#### [258. 各位相加](https://leetcode-cn.com/problems/add-digits/)

```js
var addDigits = function (num) {
    const nums = num.toString().split('');
    if (nums.length === 1) return parseInt(nums.join(''));
    num = nums.reduce((a, b) => {
        return a + parseInt(b)
    }, 0)
    return addDigits(num);
};
```

#### [405. 数字转换为十六进制数](https://leetcode-cn.com/problems/convert-a-number-to-hexadecimal/)

```js
/**
 * @param {number} num
 * @return {string}
 */
var toHex = function (num) {
    if (num >= 0) return num.toString(16)
    let fill = 2**32;
    return (fill+num).toString(16)
};
```

#### [997. 找到小镇的法官](https://leetcode-cn.com/problems/find-the-town-judge/)

计算出度，入度，法官入度n-1，出度0

```js
var findJudge = function(n, trust) {
    const inDegrees = new Array(n + 1).fill(0);
    const outDegrees = new Array(n + 1).fill(0);
    for (const edge of trust) {
        const x = edge[0], y = edge[1];
        ++inDegrees[y];
        ++outDegrees[x];
    }
    for (let i = 1; i <= n; ++i) {
        if (inDegrees[i] === n - 1 && outDegrees[i] === 0) {
            return i;
        }
    }
    return -1;
};
```

#### [566. 重塑矩阵](https://leetcode-cn.com/problems/reshape-the-matrix/)

![image-20220414144744678](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204141447850.png)

```js
/**
 * @param {number[][]} mat
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function(nums, r, c) {
    const m = nums.length;
    const n = nums[0].length;
    if (m * n != r * c) {
        return nums;
    }

    const ans = new Array(r).fill(0).map(() => new Array(c).fill(0));
    for (let x = 0; x < m * n; ++x) {
        ans[Math.floor(x / c)][x % c] = nums[Math.floor(x / n)][x % n]; // 新旧映射关系
    }
    return ans;
};
```





**方法一：模拟**

```js
var luckyNumbers  = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const ret = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let isMin = true, isMax = true;
            for (let k = 0; k < n; k++) {
                if (matrix[i][k] < matrix[i][j]) {
                    isMin = false;
                    break;
                }
            }
            if (!isMin) {
                continue;
            }
            for (let k = 0; k < m; k++) {
                if (matrix[k][j] > matrix[i][j]) {
                    isMax = false;
                    break;
                }
            }
            if (isMax) {
                ret.push(matrix[i][j]);
            }
        }
    }
    return ret;
};
```

**方法二：预处理 + 模拟**

思路与算法

![image-20220414161719559](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204141617622.png)

```js
var luckyNumbers  = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const minRow = new Array(m).fill(Number.MAX_SAFE_INTEGER);
    const maxCol = new Array(n).fill(0);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            minRow[i] = Math.min(minRow[i], matrix[i][j]);
            maxCol[j] = Math.max(maxCol[j], matrix[i][j]);
        }
    }
    const ret = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === minRow[i] && matrix[i][j] === maxCol[j]) {
                ret.push(matrix[i][j]);
            }
        }
    }
    return ret;
};
```

#### [50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)

```js
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    return x**n;
};

var myPow = function (x, n) {
    if (n === 0) return 1 // n=0直接返回1
    if (n < 0) {   				//n<0时 x的n次方等于1除以x的-n次方分
        return 1 / myPow(x, -n)
    }
    if (n % 2) {    //n是奇数时 x的n次方 = x*x的n-1次方
        return x * myPow(x, n - 1)
    }
    return myPow(x * x, n / 2) //n是偶数，使用分治，一分为二，等于x*x的n/2次方 
}
```

#### [11. 盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0, right = height.length - 1, max = 0;
    while(left < right) {
        // 先 底乘高 ，底是两指针距离，高是两指针指向的数值小的那个，不然会水溢出
        max = Math.max(max, (right - left) * Math.min(height[left], height[right]));
        // 如果左指针指向的高度，小于等于 右指针，那就该它移
        if(height[left] <= height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return max;
};
```

