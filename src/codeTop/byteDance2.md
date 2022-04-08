---
date: 2022-04-04
icon: page
---

# 字节跳动CodeTop（二）

## [700. 二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)

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

## [剑指 Offer 54. 二叉搜索树的第k大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)

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

## [342. 4的幂](https://leetcode-cn.com/problems/power-of-four/)

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

## [507. 完美数](https://leetcode-cn.com/problems/perfect-number/)

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

## [剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

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

## [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

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

## [252. 会议室](https://leetcode-cn.com/problems/meeting-rooms/)

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

## [704. 二分查找](https://leetcode-cn.com/problems/binary-search/)

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

## [9. 回文数](https://leetcode-cn.com/problems/palindrome-number/)

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

## [234. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)

```js
var isPalindrome = function(head) {
    const vals = [];
    while (head !== null) {
        vals.push(head.val);
        head = head.next;
    }
    for (let i = 0, j = vals.length - 1; i < j; ++i, --j) {
        if (vals[i] !== vals[j]) {
            return false;
        }
    }
    return true;
};
```

## [125. 验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let valid = s.toLowerCase().match(/[a-z0-9]+/g);// valid为进行正则匹配后筛选出来的数组
    if(!valid){
        return true;
    }
    let str = valid.join("");// 数据预处理(正则匹配)后得到的字符串
    let comp = str.split("").reverse().join("");// 将字符串每个字母逐个翻转
    return comp === str;
};
```

## [717. 1 比特与 2 比特字符](https://leetcode-cn.com/problems/1-bit-and-2-bit-characters/)

```js
var isOneBitCharacter = function(bits) {
    let i = 0, n = bits.length;
    while (i < n - 1) {
        i += bits[i] + 1; // 第一种字符一定以 00 开头，第二种字符一定以 11 开头。
    }
    return i === n - 1; // 完整遍历应该存在
};
```

## [剑指 Offer 39. 数组中出现次数超过一半的数字](https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/)

> 超过一半的数一定是中间数

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    return nums.sort()[~~(nums.length / 2)];
};
```

## [1356. 根据数字二进制下 1 的数目排序](https://leetcode-cn.com/problems/sort-integers-by-the-number-of-1-bits/)

```js
/**
 * @param {number[]} arr
 * @return {number[]}
 */
function sortByBits(arr) {
  function countBits(n) {
    let count = 0;
    while (n != 0) {  // 转二进制的操作
      count += n & 1; // 是1就+1，是0就+0 (判定二进制位最后是否是一（判定奇数）)
      n >>= 1;	      // 即，除以2
    }
    return count;
  }
  return arr.sort((a, b) => { // 如果有差，则按bits数排，如果无差，则按原值排
    return countBits(a) - countBits(b) || a - b;
  });
}
```

## [111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
const minDepth = function(root) {
    if(root == null) {
        return 0;
    }
    if(root.left == null && root.right == null) {
        return 1;
    }
    let ans = Number.MAX_SAFE_INTEGER;
    if(root.left != null) {
        ans = Math.min(minDepth(root.left), ans);
    }
    if(root.right != null) {
        ans = Math.min(minDepth(root.right), ans);
    }
    return ans + 1;
};
```

## [783. 二叉搜索树节点最小距离](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/)

> 中序遍历

```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function(root) {
    let ans = Number.MAX_SAFE_INTEGER, pre = -1;
    const dfs = (root) => {
        if (root === null) {
            return;
        }
        dfs(root.left);
        if (pre == -1) {
            pre = root.val;
        } else {
            ans = Math.min(ans, root.val - pre);
            pre = root.val;
        }
        dfs(root.right);
    }
    dfs(root);
    return ans;
};
```

## [剑指 Offer 42. 连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};
```

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        if (pre < 0) {
            pre = x;
        } else {
            pre = pre + x;
        }
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};
```

## [257. 二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)

```js
var binaryTreePaths = function(root) {
    const paths = [];
    const construct_paths = (root, path) => {
        if (root) {
            path += root.val.toString();
            if (root.left === null && root.right === null) { // 当前节点是叶子节点
                paths.push(path); // 把路径加入到答案中
            } else {
                path += "->"; // 当前节点不是叶子节点，继续递归遍历
                construct_paths(root.left, path);
                construct_paths(root.right, path);
            }
        }
    }
    construct_paths(root, "");
    return paths;
};
```

## [680. 验证回文字符串 Ⅱ](https://leetcode-cn.com/problems/valid-palindrome-ii/)

```js
function isPali(str, l, r) { // 判断str是否回文
  while (l < r) {            
    if (str[l] != str[r]) {  // 指向的字符不一样，不是回文串
      return false;
    }
    l++; // 指针相互逼近
    r--;
  }
  return true; // 始终没有不一样，返回true
}

var validPalindrome = function (str) {
  let l = 0, r = str.length - 1; // 头尾指针
  while (l < r) { 
    if (str[l] != str[r]) { // 指向的字符不一样，还不能死刑 
      return isPali(str, l + 1, r) || isPali(str, l, r - 1); //转为判断删掉一个字符后，是否回文
    }
    l++;
    r--;
  }
  return true;
};
```

## [剑指 Offer 04. 二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

开始位置即竖排最大，横排最小

> 1. 以二维数组左下角为原点，建立直角坐标轴。
> 2. 若当前数字大于了查找数，查找往上移一位。
> 3. 若当前数字小于了查找数，查找往右移一位。

```js
var findNumberIn2DArray = function(matrix, target) {
    if(!matrix.length) return false;
    let x = matrix.length - 1, y = 0;
    while(x >= 0 && y < matrix[0].length){
        if(matrix[x][y] === target){
            return true;
        }else if(matrix[x][y] > target){
            x--;
        }else{
            y++;
        }
    }
    return false;
};
```

## [242. 有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)

> 慢吞吞 O*(*n*log*n*)，

```js
var isAnagram = function (s, t) {
    s = s.split('').sort().join('');
    t = t.split('').sort().join('');
    return s === t;
};
```

```js
// 哈希表
var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }
    const table = new Array(26).fill(0);
    for (let i = 0; i < s.length; ++i) {
        table[s.codePointAt(i) - 'a'.codePointAt(0)]++; // charCodeAt
    }
    for (let i = 0; i < t.length; ++i) {
        table[t.codePointAt(i) - 'a'.codePointAt(0)]--;
        if (table[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) {
            return false;
        }
    }
    return true;
};
```

## [1047. 删除字符串中的所有相邻重复项](https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/)

> 栈  因为不考虑连续多个，只有俩俩

```js
var removeDuplicates = function(s) {
    const stk = [];
    for (const ch of s) { // 好好学！
        if (stk.length && stk[stk.length - 1] === ch) {
            stk.pop();
        } else {
            stk.push(ch);
        }
    }
    return stk.join('');
};
```

## [1556. 千位分隔数](https://leetcode-cn.com/problems/thousand-separator/)

```js
/**
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
    return n.toString().split('').reduce((pre, cur, index, arr) => {
        if (index !== 0 && (arr.length - index) % 3 === 0) {
            return pre + '.' + cur
        } else {
            return pre + cur
        }
    }, '')
};
```

