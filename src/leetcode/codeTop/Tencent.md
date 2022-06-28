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

#### [22. 括号生成](https://leetcode.cn/problems/generate-parentheses/)

数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 **有效的** 括号组合。

```
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
```

**回溯算法，死抓三点**

- 选择
  - 在这里，每次最多两个选择，选左括号或右括号，“选择”会展开出一棵解的空间树。
  - 用 DFS 遍历这棵树，找出所有的解，这个过程叫回溯。
- 约束条件
  - 即，什么情况下可以选左括号，什么情况下可以选右括号。
  - 利用约束做“剪枝”，即，去掉不会产生解的选项，即，剪去不会通往合法解的分支。
    比如()，现在左右括号各剩一个，再选)就成了())，不能让这个错的选择成为选项（不落入递归）：

```js
if (right > left) { // 右括号剩的比较多，才能选右括号
    dfs(str + ')', left, right - 1);
}
```

- 目标

  构建出一个用尽 n 对括号的合法括号串。
  意味着，当构建的长度达到 2*n，就可以结束递归（不用继续选了）。

```js
var generateParenthesis = function (n) {
  const res = [];

  const dfs = (lRemain, rRemain, str) => { // 左右括号所剩的数量，str是当前构建的字符串
    if (str.length == 2 * n) { // 字符串构建完成
      res.push(str);           // 加入解集
      return;                  // 结束当前递归分支
    }
    if (lRemain > 0) {         // 只要左括号有剩，就可以选它，然后继续做选择（递归）
      dfs(lRemain - 1, rRemain, str + "(");
    }
    if (lRemain < rRemain) {   // 右括号比左括号剩的多，才能选右括号
      dfs(lRemain, rRemain - 1, str + ")"); // 然后继续做选择（递归）
    }
  };

  dfs(n, n, ""); // 递归的入口，剩余数量都是n，初始字符串是空串
  return res;
};
```

#### [153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/)

![fig1](https://cdn.yihuiblog.top/images/1.png)

```js
var findMin = function(nums) {
    let low = 0;
    let high = nums.length - 1;
    while (low < high) {
        const pivot = low + Math.floor((high - low) / 2);
        if (nums[pivot] < nums[high]) {
            high = pivot;
        } else {
            low = pivot + 1;
        }
    }
    return nums[low];
};
```

#### [补充题：检测循环依赖](https://mp.weixin.qq.com/s/pCRscwKqQdYYN7M1Sia7xA)

> 拓扑排序

js实现

```js
```



```python
def haveCircularDependency(self, n: int, prerequisites):
    g = [[]for i in range(n)] #邻接表存储图结构
    indeg = [0 for i in range(n)] #每个点的入度
    res = [] #存储结果序列
    q = deque()
    #将依赖关系加入邻接表中g，并各个点入度
    for pre in prerequisites:
        a, b = pre[0], pre[1]
        g[a].append(b)
        indeg[b] += 1
    #一次性将入度为0的点全部入队
    for i in range(n):
        if indeg[i] == 0:
            q.append(i)
    while q:
        t = q.popleft()
        res.append(t)
        #删除边时，将终点的入度-1。若入度为0，果断入队
        for j in g[t]:
            indeg[j] -= 1
            if indeg[j] == 0:
                q.append(j)
    if len(res) == n:
        return res
    else:
        return []
```

#### [IP地址与int整数的转换](https://mp.weixin.qq.com/s/UWCuEtNS2kuAuDY-eIbghg)

> 例如，ip地址为10.0.3.193，把每段拆分成一个二进制形式组合起来为`00001010 00000000 00000011 11000001`，然后把这个二进制数转变成十进制整数就是167773121。

![](https://cdn.yihuiblog.top/images/202206241516296.png)

```js
const solution = (ip) => {
    const arr = ip.split('.');
    let res = 0;
    arr.forEach((item, index) => {
        res += parseInt(item) << ((3 - index) * 8)
    })
    return res;
}                
```

#### [107. 二叉树的层序遍历 II](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/)

> 给你二叉树的根节点 `root` ，返回其节点值 **自底向上的层序遍历** 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）



#### [402. 移掉 K 位数字](https://leetcode.cn/problems/remove-k-digits/)

```js
var removeKdigits = function(num, k) {
    const stk = [];
    for (const digit of num) {
        while (stk.length > 0 && stk[stk.length - 1] > digit && k) {
            stk.pop();
            k -= 1;
        }
        stk.push(digit);
    }
    // 此时已从小到大排列

    for (; k > 0; --k) {
        stk.pop(); // 删除尾部还要删除的项目
    }

    let ans = "";
    let isLeadingZero = true;
    for (const digit of stk) {
        if (isLeadingZero && digit === '0') {
            continue;
        }
        isLeadingZero = false;
        ans += digit;
    }
    return ans === "" ? "0" : ans;
};
```

#### [8. 字符串转换整数 (atoi)](https://leetcode.cn/problems/string-to-integer-atoi/)

模拟自动机：

![fig1](https://cdn.yihuiblog.top/images/202206281457630.png)

我们也可以用下面的表格来表示这个自动机：

![image-20220628145834471](https://cdn.yihuiblog.top/images/202206281458525.png)

```js
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    // 自动机类
    class Automaton{
        constructor() {
            // 执行阶段，默认处于开始执行阶段
            this.state = 'start';
            // 正负符号，默认是正数
            this.sign = 1;
            // 数值，默认是0
            this.answer = 0;
            /*
            关键点：
            状态和执行阶段的对应表
            含义如下：
            [执行阶段, [空格, 正负, 数值, 其他]]
            */
            this.map = new Map([
                ['start', ['start', 'signed', 'in_number', 'end']],
                ['signed', ['end', 'end', 'in_number', 'end']],
                ['in_number', ['end', 'end', 'in_number', 'end']],
                ['end', ['end', 'end', 'end', 'end']]
            ])
        }

        // 获取状态的索引
        getIndex(char) {
            if (char === ' ') {
                // 空格判断
                return 0;
            } else if (char === '-' || char === '+') {
                // 正负判断
                return 1;
            } else if (typeof Number(char) === 'number' && !isNaN(char)) {
                // 数值判断
                return 2;
            } else {
                // 其他情况
                return 3;
            }
        }

        /*
        关键点：
        字符转换执行函数
        */
        get(char) {
            /*
            易错点：
            每次传入字符时，都要变更自动机的执行阶段
            */
            this.state = this.map.get(this.state)[this.getIndex(char)];

            if(this.state === 'in_number') {
                /*
                小技巧：
                在JS中，对字符串类型进行减法操作，可以将得到一个数值型（Number）的值
        
                易错点：
                本处需要利用括号来提高四则运算的优先级
                */
                this.answer = this.answer * 10 + (char - 0);

                /*
                易错点：
                在进行负数比较时，需要将INT_MIN变为正数
                */
                this.answer = this.sign === 1 ? Math.min(this.answer, Math.pow(2, 31) - 1) : Math.min(this.answer, -Math.pow(-2, 31));
            } else if (this.state === 'signed') {
                /*
                优化点：
                对于一个整数来说，非正即负，
                所以正负号的判断，只需要一次。
                故，可以降低其判断的优先级
                */
                this.sign = char === '+' ? 1 : -1;
            }
        }
    }

    // 生成自动机实例
    let automaton = new Automaton();

    // 遍历每个字符
    for(let char of str) {
        // 依次进行转换
        automaton.get(char);
    }

    // 返回值，整数 = 正负 * 数值
    return automaton.sign * automaton.answer;
};
```

#### [670. 最大交换](https://leetcode.cn/problems/maximum-swap/)

>  参考递减规则，贪心算法
>
> 核心就一句话：就是把第一个小数和它后面最大的大数进行交换

```js
/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function (num) {
    let last = new Array(10).fill(-1);
    num = Array.from(num.toString());
    //找到相同值最后出现的位置
    for (let i = 0; i < num.length; i++) {
        last[num[i] - '0'] = i;
    }
    //原数组从左到右遍历，索引数组从后往前遍历
    //遇到比当前位值大的，交换，因为索引数组从后往前遍历的，所以保证了值为最大
    for (let i = 0; i < num.length; i++) {
        for (let d = 9; d > (num[i] - '0'); d--) {
            if (last[d] > i) {
                let temp = num[last[d]];
                num[last[d]] = num[i];
                num[i] = temp;
                return Number(num.join(""));
            }
        }
    }
    return Number(num.join(""));
};
```

> 数字最多只有 8 位，因此只有 28 个可用的互换。 :small_airplane:

```java
public class Solution {

    public int maximumSwap(int num) {
        String s = String.valueOf(num);
        int len = s.length();
        char[] charArray = s.toCharArray();
        int max = num;
        for (int i = 0; i < len; i++) {
            for (int j = i + 1; j < len; j++) {
                swap(charArray, i, j);
                max = Math.max(max, Integer.parseInt(new String(charArray)));
                swap(charArray, i, j);
            }
        }
        return max;
    }

    private void swap(char[] charArray, int index1, int index2) {
        char temp = charArray[index1];
        charArray[index1] = charArray[index2];
        charArray[index2] = temp;
    }
}
```

#### [214. 最短回文串](https://leetcode.cn/problems/shortest-palindrome/)

> 双指针
>
> ![image-20220628152153178](https://cdn.yihuiblog.top/images/202206281521229.png)

```js
var searchRange = function (nums, target) {
    const res = [];
    res.push(nums.indexOf(target));
    res.push(nums.lastIndexOf(target));
    return res;
};
```

#### [面试题 01.05. 一次编辑](https://leetcode.cn/problems/one-away-lcci/)





#### [847. 访问所有节点的最短路径](https://leetcode.cn/problems/shortest-path-visiting-all-nodes/)





#### [214. 最短回文串](https://leetcode.cn/problems/shortest-palindrome/)



#### [179. 最大数](https://leetcode.cn/problems/largest-number/)

> 输入：nums = [3,30,34,5,9]
> 输出："9534330"
>
> 注意：怎么选择3，30而不是30，3（长度不同如何选择）





#### [287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/)

> **进阶：**
>
> - 如何证明 `nums` 中至少存在一个重复的数字?
> - 你可以设计一个线性级时间复杂度 `O(n)` 的解决方案吗？

> 超时方法

```js
var findDuplicate = function (nums) {
    let res = -1;
    nums.forEach(item => {
        if(nums.indexOf(item)!==nums.lastIndexOf(item)){
            res =  item;
        }
    })
    return res;
};
```

> 哈希

```js
var findDuplicate = function (nums) {
    let obj = {};
    for (const val of nums) {
        if (!obj[val]) {
            obj[val] = 1;
        } else {
            return val;
        }
    }
};
```

> 二分查找





> 方法二：二进制



#### [61. 旋转链表](https://leetcode.cn/problems/rotate-list/)





#### [189. 轮转数组](https://leetcode.cn/problems/rotate-array/)

> 一个一个来

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    for (let i = 0; i < k; i++) {
        nums.unshift(nums.pop());
    }
};
```

