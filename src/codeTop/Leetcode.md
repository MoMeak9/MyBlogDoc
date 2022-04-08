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