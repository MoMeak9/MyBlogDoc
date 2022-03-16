---
icon: edit
date: 2022-03-15
category:
- 牛客
- 美团
tag:
- tag A
- tag B
---

## 牛客网美团校招笔试

### 糕点

小团的蛋糕铺长期霸占着美团APP中“蛋糕奶茶”栏目的首位，因此总会吸引各路食客前来探店。

小团一天最多可以烤n个蛋糕，每个蛋糕有一个正整数的重量。

早上，糕点铺已经做好了m个蛋糕。

现在，有一个顾客要来买两个蛋糕，他希望买这一天糕点铺烤好的最重的和最轻的蛋糕，并且希望这两个蛋糕的重量恰好为a和b。剩余的n-m个蛋糕可以现烤，请问小团能否满足他的要求？

进阶：时间复杂度O(m)O(m) ,空间复杂度O(m)O(m) 

##### **输入描述:**

```
输入包含多组数据，每组数据两行。每组数据的第一行包含4个整数，n,m,a,b，空格隔开。这里不保证a和b的大小关系。接下来一行m个数，空格隔开，代表烤好的蛋糕重量
```

##### **输出描述:**

```
对于每一组数据，如果可以办到顾客的要求，输出YES，否则输出NO
```

链接：https://www.nowcoder.com/questionTerminal/10661f4d02564ba686bcba4645e0a029
来源：牛客网

示例1

输入

```
4 2 2 4
3 3
4 2 2 4
1 1
4 2 2 4
5 5
4 2 4 2
2 4
2 2 2 4
3 3
3 2 2 4
3 3
3 2 2 4
3 3
```

输出

```
YES
NO
NO
YES
NO
NO
NO
```

> 思路：检查已有烘培蛋糕是否满足，然后计算需要重新烘培的数量，然后对比是否足够。注意，如果a，b有比其更小的蛋糕，则直接驳回

```js
// 参考了别人代码，修改了一下，但是只有80%，希望指教一下
var start = readline();
while (start) {
    var [n, m, a, b] = start.split(" ");
    var dones = readline().split(" ");
    dones = dones.sort((x, y) => x - y);
    var left = n - m;
    var muti = 0;
    for (var i = 0; i < dones.length; i++) {
        if (dones[i] == a) {
            muti++;
        }
        if (dones[i] == b) {
            muti++;
        }
    }
    if (left == 0) {
        if (dones.includes(a) && dones.includes(b)) {
            print("YES");
        } else {
            print("NO");
        }
    }
    if (left == 1) {
        if (muti > 0) {
            print("YES");
        } else {
            print("NO");
        }
    }
    if (left >= 2) {
        if (muti > 0) {
            print("YES");
        } else {
            if (left > dones.length) {
                print("YES");
            } else if (a < dones[0] && b > dones[dones.length - 1]) {
                print("YES");
            } else {
                print("NO");
            }
        }
    }
    start = readline();
}
```

