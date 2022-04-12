---
date: 2022-04-07
icon: page
---

# 腾讯 CodeTop

#### [459. 重复的子字符串](https://leetcode-cn.com/problems/repeated-substring-pattern/)

> 老规矩，先去除异常情况
> 观察一下如果有循环子串会有什么规律
>
> 完全由单个字母组成
> 由多个字母组成的话，子串的结尾一定跟 s 的结尾字母一致，同时s % 子串.length === 0，否则肯定拼不上
> 然后遍历找到所有符合要求的就行了

```js
var repeatedSubstringPattern = function (s) {
  // 1 清理异常
  if (s.length === 1) return false
  if (s.length === 2) return s[0] === s[1]

  // 2 判断是否由单个字母组成
  let l = s.length
  let end = s[l - 1]
  if (s[0] === end) {
    if (s[0].repeat(s.length) === s) {
      return true
    }
  }

  // 遍历找到子串判断是否由多个组成
  for (let i = 1; i < l / 2; i++) {
    // 子串需要满足如下条件， 1.结尾跟 end 一直， 2.s.length % 子串.length === 0， 3. 循环s.length/子串.length === s
    if (s[i] === end && l % (i + 1) === 0 && s.slice(0, i + 1).repeat(l / (i + 1)) === s) {
      return true
    }
  }
  return false
};
```

#### [35. 搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/)

> nlog(n) 二分查找

```js
var searchInsert = function(nums, target) {
    const n = nums.length;
    let left = 0, right = n - 1, ans = n;
    while (left <= right) {
        let mid = (right + left) >> 1;
        if (target <= nums[mid]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};
```

#### [876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

> `Math.trunc()` 方法会将数字的小数部分去掉，只保留整数部分

```js
var middleNode = function(head) {
    let A = [head];
    while (A[A.length - 1].next != null) // 数组末尾节点的下一个不是null
        A.push(A[A.length - 1].next);
    return A[Math.trunc(A.length / 2)]; // 取整
};
```

#### [1013. 将数组分成和相等的三个部分](https://leetcode-cn.com/problems/partition-array-into-three-parts-with-equal-sum/)

```js
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canThreePartsEqualSum = function(arr) {
    let sum = arr.reduce((a,b) => a + b);
    let num = 3;
    let temp = 0;
    for(let a of arr){
        temp += a;
        if (temp === sum / 3) num--, temp = 0; // 顺序切片
    }
    return num <=  0;
};
```

