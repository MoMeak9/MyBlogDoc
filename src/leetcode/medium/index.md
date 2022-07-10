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



#### [剑指 Offer 46. 把数字翻译成字符串](https://leetcode.cn/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)



#### [207. 课程表](https://leetcode.cn/problems/course-schedule/)

