import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.28325d67.js";const a={},e=s(`<h1 id="\u7F8E\u56E2codetop" tabindex="-1"><a class="header-anchor" href="#\u7F8E\u56E2codetop" aria-hidden="true">#</a> \u7F8E\u56E2CodeTop</h1><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// 5. \u52A8\u6001\u89C4\u5212\uFF1A\u4ECE\u8D77\u59CB\u70B9\u5230\u7EC8\u70B9
var minPathSum = function(grid) {
    const m = grid.length, n = grid[0].length

    // \u72B6\u6001\u5B9A\u4E49\uFF1Adp[i][j] \u8868\u793A\u4ECE [0,0] \u5230 [i,j] \u7684\u6700\u5C0F\u8DEF\u5F84\u548C
    const dp = new Array(m).fill(0).map(() =&gt; new Array(n).fill(0))

    // \u72B6\u6001\u521D\u59CB\u5316
    dp[0][0] = grid[0][0]

    // \u72B6\u6001\u8F6C\u79FB
    for (let i = 0; i &lt; m ; i++) {
        for (let j = 0; j &lt; n ; j++) {
            if (i == 0 &amp;&amp; j != 0) {
                dp[i][j] = grid[i][j] + dp[i][j - 1]
            } else if (i != 0 &amp;&amp; j == 0) {
                dp[i][j] = grid[i][j] + dp[i - 1][j]
            } else if (i != 0 &amp;&amp; j != 0) {
                dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }

    // \u8FD4\u56DE\u7ED3\u679C
    return dp[m - 1][n - 1]
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h4 id="_718-\u6700\u957F\u91CD\u590D\u5B50\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#_718-\u6700\u957F\u91CD\u590D\u5B50\u6570\u7EC4" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/" target="_blank" rel="noopener noreferrer">718. \u6700\u957F\u91CD\u590D\u5B50\u6570\u7EC4</a></h4><blockquote><p>\u66B4\u529B</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const findLength = (A, B) =&gt; {
  const m = A.length;
  const n = B.length;
  let res = 0;
  for (let i = 0; i &lt; m; i++) {
    for (let j = 0; j &lt; n; j++) {
      if (A[i] == B[j]) { // \u9047\u5230\u76F8\u540C\u9879
        let subLen = 1;   // \u516C\u5171\u5B50\u5E8F\u5217\u957F\u5EA6\u81F3\u5C11\u4E3A1
        while (i + subLen &lt; m &amp;&amp; j + subLen &lt; n &amp;&amp; A[i + subLen] == B[j + subLen]) { //\u65B0\u7684\u4E00\u9879\u4E5F\u76F8\u540C
          subLen++; // \u516C\u5171\u5B50\u5E8F\u5217\u957F\u5EA6\u6BCF\u6B21\u589E\u52A0 1\uFF0C\u8003\u5BDF\u65B0\u7684\u4E00\u9879
        }
        res = Math.max(subLen, res);
      }
    }
  }
  return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/9b80364c7936ad0fdca0e9405025b2a207a10322e16872a6cb68eb163dee25ee-image.png" alt="image.png"></p><blockquote><p>DP</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findLength = (nums1, nums2) =&gt; {
    // nums1\u3001nums2\u6570\u7EC4\u7684\u957F\u5EA6
    const [m, n] = [nums1.length, nums2.length];
    // dp\u6570\u7EC4\u521D\u59CB\u5316\uFF0C\u90FD\u521D\u59CB\u5316\u4E3A0 \uFF01\uFF01
    const dp = new Array(m + 1).fill(0).map(x =&gt; new Array(n + 1).fill(0));
    // \u521D\u59CB\u5316\u6700\u5927\u957F\u5EA6\u4E3A0
    let res = 0;
    for (let i = 1; i &lt;= m; i++) {
        for (let j = 1; j &lt;= n; j++) {
            // \u9047\u5230nums1[i - 1] === nums2[j - 1]\uFF0C\u5219\u66F4\u65B0dp\u6570\u7EC4
            if (nums1[i - 1] === nums2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }
            // \u66F4\u65B0res
            res = dp[i][j] &gt; res ? dp[i][j] : res;
        }
    }
    // \u904D\u5386\u5B8C\u6210\uFF0C\u8FD4\u56DEres
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h4 id="_24-\u4E24\u4E24\u4EA4\u6362\u94FE\u8868\u4E2D\u7684\u8282\u70B9" tabindex="-1"><a class="header-anchor" href="#_24-\u4E24\u4E24\u4EA4\u6362\u94FE\u8868\u4E2D\u7684\u8282\u70B9" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/swap-nodes-in-pairs/" target="_blank" rel="noopener noreferrer">24. \u4E24\u4E24\u4EA4\u6362\u94FE\u8868\u4E2D\u7684\u8282\u70B9</a></h4><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220330214024553.png" alt="image-20220330214024553"></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if (head === null|| head.next === null) {
        return head; // \u7EC8\u6B62\u6761\u4EF6
    }
    const newHead = head.next;
    head.next = swapPairs(newHead.next); // \u5B50\u94FE\u6765\u81EA\u540E\u9012\u5F52
    newHead.next = head;
    return newHead;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="_48-\u65CB\u8F6C\u56FE\u50CF" tabindex="-1"><a class="header-anchor" href="#_48-\u65CB\u8F6C\u56FE\u50CF" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/rotate-image/" target="_blank" rel="noopener noreferrer">48. \u65CB\u8F6C\u56FE\u50CF</a></h4><blockquote><p>\u65CB\u8F6C\u4E8C\u4F4D\u77E9\u9635</p></blockquote><blockquote><p>\u521B\u5EFA\u65B0\u7684\u77E9\u9635</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var rotate = function(matrix) {
    const n = matrix.length;
    const matrix_new = new Array(n).fill(0).map(() =&gt; new Array(n).fill(0));
    for (let i = 0; i &lt; n; i++) {
        for (let j = 0; j &lt; n; j++) {
            matrix_new[j][n - i - 1] = matrix[i][j]; // \u884C\u53D8\u5217\uFF0C\u5217\u6570\u503C\u53D8\u6210\u6700\u540E\u4E00\u4E2A
        }
    }
    for (let i = 0; i &lt; n; i++) {
        for (let j = 0; j &lt; n; j++) {
            matrix[i][j] = matrix_new[i][j];
        }
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var rotate = function(matrix) {
    const n = matrix.length;
    for (let i = 0; i &lt; Math.floor(n / 2); ++i) {
        for (let j = 0; j &lt; Math.floor((n + 1) / 2); ++j) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[n - j - 1][i];
            matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
            matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
            matrix[j][n - i - 1] = temp;
        }
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="_69-x-\u7684\u5E73\u65B9\u6839" tabindex="-1"><a class="header-anchor" href="#_69-x-\u7684\u5E73\u65B9\u6839" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/sqrtx/" target="_blank" rel="noopener noreferrer">69. x \u7684\u5E73\u65B9\u6839 </a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let r = x

    while (r ** 2 &gt; x) {
        r = ~~((r + x / r) / 2)
    }//\u53D6\u6574

    return r
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="\u5251\u6307-offer-10-ii-\u9752\u86D9\u8DF3\u53F0\u9636\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-10-ii-\u9752\u86D9\u8DF3\u53F0\u9636\u95EE\u9898" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 10- II. \u9752\u86D9\u8DF3\u53F0\u9636\u95EE\u9898</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} n
 * @return {number}
 */
var numWays = function(n) {
    let sum = 0;
    let x = 1;
    let y = 1;
    for(let i =0;i &lt; n;i++){
        sum = (x + y);
        x = y;
        y = sum
    } 
    return x;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="_387-\u5B57\u7B26\u4E32\u4E2D\u7684\u7B2C\u4E00\u4E2A\u552F\u4E00\u5B57\u7B26" tabindex="-1"><a class="header-anchor" href="#_387-\u5B57\u7B26\u4E32\u4E2D\u7684\u7B2C\u4E00\u4E2A\u552F\u4E00\u5B57\u7B26" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/first-unique-character-in-a-string/" target="_blank" rel="noopener noreferrer">387. \u5B57\u7B26\u4E32\u4E2D\u7684\u7B2C\u4E00\u4E2A\u552F\u4E00\u5B57\u7B26</a></h4><p><strong>\u4F7F\u7528\u54C8\u5E0C\u8868\u5B58\u50A8\u7D22\u5F15</strong></p><p><code>Object.entries()</code>\u65B9\u6CD5\u8FD4\u56DE\u4E00\u4E2A\u7ED9\u5B9A\u5BF9\u8C61\u81EA\u8EAB\u53EF\u679A\u4E3E\u5C5E\u6027\u7684\u952E\u503C\u5BF9\u6570\u7EC4\uFF0C\u5176\u6392\u5217\u4E0E\u4F7F\u7528 [for...in...] \u5FAA\u73AF\u904D\u5386\u8BE5\u5BF9\u8C61\u65F6\u8FD4\u56DE\u7684\u987A\u5E8F\u4E00\u81F4\uFF08\u533A\u522B\u5728\u4E8E for-in \u5FAA\u73AF\u8FD8\u4F1A\u679A\u4E3E\u539F\u578B\u94FE\u4E2D\u7684\u5C5E\u6027\uFF09\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var firstUniqChar = function(s) {
    const position = new Map();
    const n = s.length;
    for (let [i, ch] of Array.from(s).entries()) {
        if (position.has(ch)) {
            position.set(ch, -1);
        } else {
            position.set(ch, i);
        }
    }
    let first = -1;
    for (let pos of position.values()) {
        if (pos !== -1 &amp;&amp; pos &gt; first) {
            first = pos;
        }
    }
    return first;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p><strong>\u961F\u5217</strong></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var firstUniqChar = function(s) {
    const position = new Map();
    const q = [];
    const n = s.length;
    for (let [i, ch] of Array.from(s).entries()) {
        if (!position.has(ch)) {
            position.set(ch, i);
            q.push([s[i], i]);
        } else {
            position.set(ch, -1);
            while (q.length &amp;&amp; position.get(q[0][0]) === -1) {
                q.shift();
            }
        }
    }
    return q.length ? q[0][1] : -1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var firstUniqChar = function (str) {
    const obj = {}
    Array.from(str).forEach((val, index) =&gt; {
        if (obj[val]) {
            obj[val] = -1;
        } else {
            obj[val] = index;
        }
    })
    let ans = -1;
    for (const key in obj) {
        let val = obj[key];
        if (val !== -1) {
            if (ans === -1) ans = val;
            ans = Math.min(ans, val);
        }
    }
    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="_172-\u9636\u4E58\u540E\u7684\u96F6" tabindex="-1"><a class="header-anchor" href="#_172-\u9636\u4E58\u540E\u7684\u96F6" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/factorial-trailing-zeroes/" target="_blank" rel="noopener noreferrer">172. \u9636\u4E58\u540E\u7684\u96F6</a></h4><blockquote><p>5 \u7684\u4E2A\u6570</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var trailingZeroes = function(n) {
    let ans = 0;
    for (let i = 5; i &lt;= n; i += 5) {
        for (let x = i; x % 5 == 0; x /= 5) {
            ++ans;
        }
    }
    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_1518-\u6362\u9152\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#_1518-\u6362\u9152\u95EE\u9898" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/water-bottles/" target="_blank" rel="noopener noreferrer">1518. \u6362\u9152\u95EE\u9898</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var numWaterBottles = function(numBottles, numExchange) {
    let bottle = numBottles, ans = numBottles;
    while (bottle &gt;= numExchange) {
        bottle -= numExchange;
        ++ans;
        ++bottle;
    }
    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_557-\u53CD\u8F6C\u5B57\u7B26\u4E32\u4E2D\u7684\u5355\u8BCD-iii" tabindex="-1"><a class="header-anchor" href="#_557-\u53CD\u8F6C\u5B57\u7B26\u4E32\u4E2D\u7684\u5355\u8BCD-iii" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/" target="_blank" rel="noopener noreferrer">557. \u53CD\u8F6C\u5B57\u7B26\u4E32\u4E2D\u7684\u5355\u8BCD III</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var reverseWords = function(s) {
    const ret = [];
    const length = s.length;
    let i = 0;
    while (i &lt; length) {
        let start = i;
        while (i &lt; length &amp;&amp; s.charAt(i) != &#39; &#39;) {
            i++;
        }
        for (let p = start; p &lt; i; p++) {
            ret.push(s.charAt(start + i - 1 - p));
        }
        while (i &lt; length &amp;&amp; s.charAt(i) == &#39; &#39;) {
            i++;
            ret.push(&#39; &#39;);
        }
    }
    return ret.join(&#39;&#39;);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,34);function r(l,i){return e}var c=n(a,[["render",r],["__file","meituan.html.vue"]]);export{c as default};
