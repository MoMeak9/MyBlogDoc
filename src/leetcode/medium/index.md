# 中等题刷题

#### [剑指 Offer 32 - III. 从上到下打印二叉树 III](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/)

> 层序遍历变种

```js
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) {
        return [];
    }

    const ans = [];
    const nodeQueue = [root];

    let isOrderLeft = true;

    while (nodeQueue.length) {
        let levelList = [];
        const size = nodeQueue.length;
        for (let i = 0; i < size; ++i) {
            const node = nodeQueue.shift();
            if (isOrderLeft) {
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
        ans.push(levelList);
        isOrderLeft = !isOrderLeft;
    }

    return ans;
};
```

#### [63. 不同路径 II](https://leetcode.cn/problems/unique-paths-ii/)

> 动态规划
>
> ![image-20220710193414013](https://cdn.yihuiblog.top/images/202207101934096.png)

```js
var uniquePathsWithObstacles = function (obstacleGrid) {
    const m = obstacleGrid.length
    const n = obstacleGrid[0].length
    // m*n 的矩阵
    const dp = new Array(m).fill('').map(i => new Array(n).fill(0))
    //(0,0)这个格子可能有障碍物
    dp[0][0] = (obstacleGrid[0][0] === 1) ? 0 : 1;

    //第一行都赋予 1
    for (let i = 1; i < n; i++) {
        if (obstacleGrid[0][i] === 1 || dp[0][i - 1] === 0) {
            dp[0][i] = 0;
        } else {
            dp[0][i] = 1;
        }
    }
    //第一列都赋予 1
    for (let i = 1; i < m; i++) {
        if (obstacleGrid[i][0] === 1 || dp[i - 1][0] === 0) {
            dp[i][0] = 0;
        } else {
            dp[i][0] = 1;
        }
    }

    //两个for循环推导，对于(i,j)来说，只能由上方或者左方转移过来
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            //如果当前格子是障碍物，返回 0，否则返回 dp[i - 1][j] + dp[i][j - 1]
            dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1];
        }
    }

    // m、n 为矩阵的宽高，索引要减 1
    return dp[m - 1][n - 1]
};
```

> 注意
>
> ```
> const dp = new Array(m).fill(new Array(n).fill(0))
> ```
> 导致每行均指向同一位置

#### [6. Z 字形变换](https://leetcode.cn/problems/zigzag-conversion/)

![image-20220710195949832](https://cdn.yihuiblog.top/images/202207101959873.png)

```js
var convert = function (s, numRows) {
    if (numRows < 2) return s;
    const rows = new Array(numRows).fill('');
    let i = 0, flag = -1;
    for (const c of s) {
        rows[i] += c;
        if(i === 0 || i === numRows -1) flag = - flag;
        i += flag
    }
    let res = ""
    for (const row of rows) {
        res += row
    }
    return res;
};
```

#### [86. 分隔链表](https://leetcode.cn/problems/partition-list/)

#### [148. 排序链表](https://leetcode.cn/problems/sort-list/):star:

> 归并排序 nlog(n)

**递归法（自顶向下迭代分割）**

```js
const merge = (head1, head2) => {
    const dummyHead = new ListNode(0);
    let temp = dummyHead, temp1 = head1, temp2 = head2;
    while (temp1 !== null && temp2 !== null) {
        if (temp1.val <= temp2.val) {
            temp.next = temp1;
            temp1 = temp1.next;
        } else {
            temp.next = temp2;
            temp2 = temp2.next;
        }
        temp = temp.next;
    }
    if (temp1 !== null) {
        temp.next = temp1;
    } else if (temp2 !== null) {
        temp.next = temp2;
    }
    return dummyHead.next; // 虚拟头部
}

const toSortList = (head, tail) => {
    if (head === null) {
        return head;
    }
    if (head.next === tail) {
        head.next = null;
        return head;
    }
    let slow = head, fast = head;
    while (fast !== tail) {
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }
    const mid = slow;
    return merge(toSortList(head, mid), toSortList(mid, tail));
}

var sortList = function(head) {
    return toSortList(head, null);
};
```

> 使用：[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

#### [147. 对链表进行插入排序](https://leetcode.cn/problems/insertion-sort-list/):star:

![img](https://cdn.yihuiblog.top/images/202207102129344.png)

```js
var insertionSortList = function(head) {
    if (head === null) {
        return head;
    }
    const dummyHead = new ListNode(0);
    dummyHead.next = head;
    let lastSorted = head, curr = head.next;
    while (curr !== null) {
        if (lastSorted.val <= curr.val) {
            lastSorted = lastSorted.next;
        } else {
            let prev = dummyHead;
            while (prev.next.val <= curr.val) {
                prev = prev.next;
            }
            lastSorted.next = curr.next;
            curr.next = prev.next;
            prev.next = curr;
        }
        curr = lastSorted.next;
    }
    return dummyHead.next;
};
```



#### [560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)

> 土办法，向前枚举

```js
var subarraySum = function(nums, k) {
    let count = 0;
    for (let start = 0; start < nums.length; ++start) {
        let sum = 0;
        for (let end = start; end >= 0; --end) {
            sum += nums[end];
            if (sum == k) {
                count++;
            }
        }
    }
    return count;
};
```

> 前缀和
>
> ![img](https://cdn.yihuiblog.top/images/202207111301866.png)

```js
var subarraySum = function(nums, k) {
    const mp = new Map();
    mp.set(0, 1);
    let count = 0, pre = 0;
    for (const x of nums) {
        pre += x;
        if (mp.has(pre - k)) {
            count += mp.get(pre - k);
        }
        if (mp.has(pre)) {
            mp.set(pre, mp.get(pre) + 1);
        } else {
            mp.set(pre, 1);
        }
    }
    return count;
};
```



#### [剑指 Offer 46. 把数字翻译成字符串](https://leetcode.cn/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)

```js
/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function(num) {
    if(num < 10)return 1;
    if (num % 100 < 26 && num % 100 > 9) {
        return translateNum(~~(num / 10)) + translateNum(~~(num / 100));
    } else {
        return translateNum(~~(num / 10));
    }
};
```



#### [207. 课程表](https://leetcode.cn/problems/course-schedule/)

> 类似图的依赖关系
>
> 本题是一道经典的「拓扑排序」问题，找一找有没有环

拓扑排序

```js
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
const canFinish = (numCourses, prerequisites) => {
  const inDegree = new Array(numCourses).fill(0); // 入度数组
  const map = {};                                 // 邻接表
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++;              // 求课的初始入度值
    if (map[prerequisites[i][1]]) {               // 当前课已经存在于邻接表
      map[prerequisites[i][1]].push(prerequisites[i][0]); // 添加依赖它的后续课
    } else {                                      // 当前课不存在于邻接表
      map[prerequisites[i][1]] = [prerequisites[i][0]];
    }
  }
  const queue = [];
  for (let i = 0; i < inDegree.length; i++) { // 所有入度为0的课入列
    if (inDegree[i] == 0) queue.push(i);
  }
  let count = 0;
  while (queue.length) {
    const selected = queue.shift();           // 当前选的课，出列
    count++;                                  // 选课数+1
    const toEnQueue = map[selected];          // 获取这门课对应的后续课
    if (toEnQueue && toEnQueue.length) {      // 确实有后续课
      for (let i = 0; i < toEnQueue.length; i++) {
        inDegree[toEnQueue[i]]--;             // 依赖它的后续课的入度-1
        if (inDegree[toEnQueue[i]] == 0) {    // 如果因此减为0，入列
          queue.push(toEnQueue[i]);
        }
      }
    }
  }
  return count == numCourses; // 选了的课等于总课数，true，否则false
};
```

#### [1424. 对角线遍历 II](https://leetcode.cn/problems/diagonal-traverse-ii/)

![img](https://cdn.yihuiblog.top/images/202207111336268.png)

> 从左上角进行广度优先搜索

```js
/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var findDiagonalOrder = function(nums) {
    let q = [[0,0]];
    let res = [];
    while(q.length !== 0){
        let cur = q.pop();
        if(cur[1] === 0 && cur[0]+1 < nums.length) q.unshift([cur[0]+1,cur[1]]);
        if(cur[1]+1 < nums[cur[0]].length) q.unshift([cur[0],cur[1]+1]);
        res.push(nums[cur[0]][cur[1]]);
    }
    return res;
};

```

#### [79. 单词搜索](https://leetcode.cn/problems/word-search/)

> 广度优先、区分方向

```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const W = board.length;
  const H = board[0].length
  const K = word.length

  //搜索的方向
  const dirs = [[0, -1], [1, 0],[0, 1],[-1, 0]]
  function helper(i, j, k) {
    if (k>=K) return true
    if (i >= W || j >= H || i < 0 || j < 0) return false

    if (board[i][j] !== word[k]) return false
    board[i][j]='*'
    for (let [x,y] of dirs) {
      if(helper(i+x,j+y,k+1)) return true
    }
    board[i][j]=word[k]
    return false
  }
  for (let i = 0; i < W; i++) {
    for (let j = 0; j < H; j++) {
      if (helper(i,j,0)) return true
    }
  }
  return false
};
```

#### [139. 单词拆分](https://leetcode.cn/problems/word-break/) :star:稍后查看

```ts
function wordBreak(s: string, wordDict: string[]): boolean {
    const n: number = s.length;
    const wordDictSet: Set<string> = new Set(wordDict);
    const dp: Array<boolean> = new Array(n + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordDictSet.has(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
};
```

#### [967. 连续差相同的数字](https://leetcode.cn/problems/numbers-with-same-consecutive-differences/)

> DFS + 回溯法

```js
/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
var numsSameConsecDiff = function (n, k) {
    let ans = [];
    for (let i = 1; i <= 9; i++) {
        backtrack(ans, [i], 1, n, k);
    }
    return ans;
};

function backtrack(ans, track, i, n, k) {
    if (i === n) {
        let str = track.join("");
        ans.push(+str);
        return;
    }
    if (track[track.length - 1] + k <= 9) {
        track.push(track[track.length - 1] + k)
        backtrack(ans, track, i + 1, n, k);
        track.pop();
    }
    if (k !== 0) {
        if (track[track.length - 1] - k >= 0) {
            track.push(track[track.length - 1] - k)
            backtrack(ans, track, i + 1, n, k);
            track.pop();
        }
    }
}
```

#### [451. 根据字符出现频率排序](https://leetcode.cn/problems/sort-characters-by-frequency/)

> map统计后再进行排序复原

```js
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    const map = new Map();
    const length = s.length;
    // map统计
    for (let i = 0; i < length; i++) {
        const c = s[i];
        const frequency = (map.get(c) || 0) + 1;
        map.set(c, frequency);
    }
    const list = [...map.keys()]; // 获取字符并排序
    list.sort((a, b) => map.get(b) - map.get(a));
    // 还原为字符串
    const sb = []; // 答案寄存
    const size = list.length;
    for (let i = 0; i < size; i++) {
        const c = list[i];
        const frequency = map.get(c);
        for (let j = 0; j < frequency; j++) {
            sb.push(c);
        }
    }
    return sb.join('');
};
```

#### [986. 区间列表的交集](https://leetcode.cn/problems/interval-list-intersections/)

> 双指针移动法

```js
const intervalIntersection = (A, B) => {
	const res = [];
	let i = 0;
	let j = 0;
	while (i < A.length && j < B.length) {
		const start = Math.max(A[i][0], B[j][0]); // 交集区间的左端，取它们的较大者
		const end = Math.min(A[i][1], B[j][1]); // 交集区间的右端，取它们的较小者
		if (start <= end) {       // 形成了交集区间
			res.push([start, end]);
		}
		if (A[i][1] < B[j][1]) {  // 谁先结束，谁的指针就步进，考察下一个子区间
			i++;
		} else {
			j++;
		}
	}
	return res;
};
```

#### [593. 有效的正方形](https://leetcode.cn/problems/valid-square/)

> 正方形内只存在两种边长

```js
/**
 * @param {number[]} p1
 * @param {number[]} p2
 * @param {number[]} p3
 * @param {number[]} p4
 * @return {boolean}
 */
var validSquare = function (p1, p2, p3, p4) {
    // arguments数组收集了四个点
    const res = new Set(),arr = arguments
    // 暴力遍历任意两点的距离并存入set
    for (let i = 0; i < 3; i++) {
        for(let j = i+1;j<4;j++){
            res.add(
                Math.sqrt((arr[i][0] - arr[j][0])**2 + (arr[i][1] - arr[j][1])**2)
            )
            // 如果已经出现第三种距离，提前false
            if(res.size > 2)return false
        }
    }
    // 理论上正方形只有两种距离（边和对角线）
    if(res.size !== 2)return false

    // const temp = [...res].sort((a,b) => a - b)
    // return temp[0] > 0 && temp[1] === temp[0]*Math.sqrt(2)
    // 注意没必要判断长距离是短距离的根号2 倍，会出现精度问题

    // 任意四边形的对角线距离和边长若只有两种
    // 等价于（互为充分必要）
    // 这个四边形是正方形

    const temp = [...res]
    return temp[0] > 0 && temp[1] > 0
};
```

#### [264. 丑数 II](https://leetcode.cn/problems/ugly-number-ii/)

> *x* 是最小的丑数，由于 2x, 3x, 5x2*x*,3*x*,5*x* 也是丑数
>
> ![image-20220713113504235](https://cdn.yihuiblog.top/images/202207131135298.png)

```js
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    let p2 = 1, p3 = 1, p5 = 1;
    for (let i = 2; i <= n; i++) {
        const num2 = dp[p2] * 2, num3 = dp[p3] * 3, num5 = dp[p5] * 5;
        dp[i] = Math.min(Math.min(num2, num3), num5);
        if (dp[i] === num2) {
            p2++;
        }
        if (dp[i] === num3) {
            p3++;
        }
        if (dp[i] === num5) {
            p5++;
        }
    }
    return dp[n];
};
```

#### [面试题 16.25. LRU 缓存](https://leetcode.cn/problems/lru-cache-lcci/)

> 设计和构建一个“最近最少使用”缓存，该缓存会删除最近最少使用的项目。缓存应该从键映射到值(允许你插入和检索特定键对应的值)，并在初始化时指定最大容量。当缓存被填满时，它应该删除最近最少使用的项目。

#### [739. 每日温度](https://leetcode.cn/problems/daily-temperatures/)

> **单调栈**，将最小数维持在栈顶



