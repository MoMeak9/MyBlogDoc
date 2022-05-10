import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9338189c.js";const a={},e=s(`<h1 id="\u62FC\u591A\u591Acodetop" tabindex="-1"><a class="header-anchor" href="#\u62FC\u591A\u591Acodetop" aria-hidden="true">#</a> \u62FC\u591A\u591ACodeTop</h1><h4 id="_56-\u5408\u5E76\u533A\u95F4" tabindex="-1"><a class="header-anchor" href="#_56-\u5408\u5E76\u533A\u95F4" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/merge-intervals/" target="_blank" rel="noopener noreferrer">56. \u5408\u5E76\u533A\u95F4</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  let res = [];
  intervals.sort((a, b) =&gt; a[0] - b[0]);

  let prev = intervals[0];

  for (let i = 1; i &lt; intervals.length; i++) {
    let cur = intervals[i];
    if (prev[1] &gt;= cur[0]) { // \u6709\u91CD\u5408
      prev[1] = Math.max(cur[1], prev[1]); 
    } else {       // \u4E0D\u91CD\u5408\uFF0Cprev\u63A8\u5165res\u6570\u7EC4 
      res.push(prev);
      prev = cur;  // \u66F4\u65B0 prev
    }
  }

  res.push(prev);
  return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h4 id="_46-\u5168\u6392\u5217" tabindex="-1"><a class="header-anchor" href="#_46-\u5168\u6392\u5217" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/permutations/" target="_blank" rel="noopener noreferrer">46. \u5168\u6392\u5217</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [], path = [], used = new Array(nums.length).fill(false);
    backtracking(nums, nums.length);
    return res;

    function backtracking(n, k) {
        if (path.length === k) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i &lt; k; i++) {
            if (used[i]) continue;

            path.push(n[i]);
            used[i] = true; // \u540C\u652F

            backtracking(n, k);

            path.pop();
            used[i] = false;
        }
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h4 id="\u4E70\u5356\u80A1\u7968\u7684\u6700\u4F73\u65F6\u673A" tabindex="-1"><a class="header-anchor" href="#\u4E70\u5356\u80A1\u7968\u7684\u6700\u4F73\u65F6\u673A" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/" target="_blank" rel="noopener noreferrer">\u4E70\u5356\u80A1\u7968\u7684\u6700\u4F73\u65F6\u673A</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let low = prices[0],height = Number.MIN_VALUE
    prices.forEach((val)=&gt;{
        low = Math.min(low,val)
        height = Math.max(height,val-low)
    })
    return height;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="_102-\u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386" tabindex="-1"><a class="header-anchor" href="#_102-\u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/binary-tree-level-order-traversal/" target="_blank" rel="noopener noreferrer">102. \u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = function(root) {
    const ret = [];
    if (!root) {
        return ret;
    }

    const q = [];
    q.push(root);
    while (q.length !== 0) {
        const currentLevelSize = q.length;
        ret.push([]);
        for (let i = 1; i &lt;= currentLevelSize; ++i) {
            const node = q.shift();
            ret[ret.length - 1].push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
    return ret;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h4 id="_54-\u87BA\u65CB\u77E9\u9635" tabindex="-1"><a class="header-anchor" href="#_54-\u87BA\u65CB\u77E9\u9635" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/spiral-matrix/" target="_blank" rel="noopener noreferrer">54. \u87BA\u65CB\u77E9\u9635</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if (!matrix.length || !matrix[0].length) {
        return [];
    }

    const rows = matrix.length, columns = matrix[0].length;
    const order = [];
    let left = 0, right = columns - 1, top = 0, bottom = rows - 1;
    while (left &lt;= right &amp;&amp; top &lt;= bottom) {
        for (let column = left; column &lt;= right; column++) {
            order.push(matrix[top][column]);
        }
        for (let row = top + 1; row &lt;= bottom; row++) {
            order.push(matrix[row][right]);
        }
        if (left &lt; right &amp;&amp; top &lt; bottom) {
            for (let column = right - 1; column &gt; left; column--) {
                order.push(matrix[bottom][column]);
            }
            for (let row = bottom; row &gt; top; row--) {
                order.push(matrix[row][left]);
            }
        }
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
    }
    return order;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h4 id="_53-\u6700\u5927\u5B50\u6570\u7EC4\u548C" tabindex="-1"><a class="header-anchor" href="#_53-\u6700\u5927\u5B50\u6570\u7EC4\u548C" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/maximum-subarray/" target="_blank" rel="noopener noreferrer">53. \u6700\u5927\u5B50\u6570\u7EC4\u548C</a></h4><blockquote><p>\u8D2A\u5FC3\uFF0C\u524D\u4E3A\u6B63\u5219\u4E0D\u65AD\u7D2F\u52A0</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let maxSum = nums[0], preSum = 0
    for (let value of nums){
        if(preSum &lt; 0){
            preSum = value
        }else{
            preSum += value
        }
        maxSum = Math.max(preSum,maxSum)
    }
    return maxSum
};

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="_198-\u6253\u5BB6\u52AB\u820D" tabindex="-1"><a class="header-anchor" href="#_198-\u6253\u5BB6\u52AB\u820D" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/house-robber/" target="_blank" rel="noopener noreferrer">198. \u6253\u5BB6\u52AB\u820D</a></h4><blockquote><p>dp \u4E0D\u8981\u89E6\u53D1\u62A5\u8B66\u7684\u524D\u63D0\u62FF\u5230\u6700\u5927\u503C</p></blockquote><p>\u72B6\u6001\u8F6C\u79FB\u65B9\u7A0B</p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220318112334782.png" alt="image-20220318112334782"></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const len = nums.length;
    if(len == 0)
        return 0;
    const dp = new Array(len + 1);
    dp[0] = 0;
    dp[1] = nums[0];
    for(let i = 2; i &lt;= len; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i-1]);
    }
    return dp[len];
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h4 id="_322-\u96F6\u94B1\u5151\u6362" tabindex="-1"><a class="header-anchor" href="#_322-\u96F6\u94B1\u5151\u6362" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/coin-change/" target="_blank" rel="noopener noreferrer">322. \u96F6\u94B1\u5151\u6362</a></h4><blockquote><p>\u8D2A\u5FC3\u5927\u6CD5\u597D</p><p>\u89E3\u9898\u601D\u8DEF\u6765\u81EAIkaruga \u786C\u5E01\u964D\u5E8F\u6392\u5217\uFF0C\u4ECE0\u5230\u6570\u7EC4\u957F\u5EA6\u62FF\u786C\u5E01\uFF0C\u4F18\u5148\u7528\u5927\u989D\u786C\u5E01\u5151\u6362 amount / \u786C\u5E01\u9762\u503C \u53D6\u6574 = \u53EF\u7528\u5F53\u524D\u9762\u503C\u7684\u786C\u5E01\u6700\u591A\u6570\u91CF amount = 0\uFF0C\u4E00\u6B21\u5151\u6362\u7ED3\u675F\uFF0C\u66F4\u65B0\u6700\u5C0F\u5151\u6362\u6570\u91CF\u3002 <strong>\u526A\u679D\uFF1A\u8BB0\u5F55\u5151\u6362\u6570\u91CF\uFF0C\u540E\u7EED\u5151\u6362\u6570\u91CF\u4E0D\u80FD\u5927\u4E8E\u6700\u5C0F\u5151\u6362\u6570\u91CF</strong></p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p>DP</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    const dp = new Array(amount+1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;
    for(let num of coins) {
        for(let i=num; i&lt;=amount; i++) {
            dp[i] = Math.min(dp[i],dp[i-num]+1); // \u8BB0\u5F55\u4E4B\u524D\u7684\u6700\u5C0F\u914D\u6BD4
        }
    }
    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="\u5251\u6307-offer-62-\u5706\u5708\u4E2D\u6700\u540E\u5269\u4E0B\u7684\u6570\u5B57" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-62-\u5706\u5708\u4E2D\u6700\u540E\u5269\u4E0B\u7684\u6570\u5B57" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 62. \u5706\u5708\u4E2D\u6700\u540E\u5269\u4E0B\u7684\u6570\u5B57</a></h4><blockquote><p>\u9012\u5F52</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function (n, m) {
    const f = (n, m) =&gt; {
        if (n === 1) {
            return 0
        }
        let x = f(n - 1, m)
        return (m + x) % n
    }
    return f(n, m)
};

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><blockquote><p>\u8FED\u4EE3</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function (n, m) {
    let res = 0;
    for (let i = 2; i &lt; n + 1; i++) {
        res = (m + res) % i;
    }
    return res;
};

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="_190-\u98A0\u5012\u4E8C\u8FDB\u5236\u4F4D" tabindex="-1"><a class="header-anchor" href="#_190-\u98A0\u5012\u4E8C\u8FDB\u5236\u4F4D" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/reverse-bits/" target="_blank" rel="noopener noreferrer">190. \u98A0\u5012\u4E8C\u8FDB\u5236\u4F4D</a></h4><p>\u5C06 nn \u89C6\u4F5C\u4E00\u4E2A\u957F\u4E3A 3232 \u7684\u4E8C\u8FDB\u5236\u4E32\uFF0C\u4ECE\u4F4E\u4F4D\u5F80\u9AD8\u4F4D\u679A\u4E3E nn \u7684\u6BCF\u4E00\u4F4D\uFF0C\u5C06\u5176\u5012\u5E8F\u6DFB\u52A0\u5230\u7FFB\u8F6C\u7ED3\u679C \\textit{rev}rev \u4E2D\u3002</p><p>\u4EE3\u7801\u5B9E\u73B0\u4E2D\uFF0C\u6BCF\u679A\u4E3E\u4E00\u4F4D\u5C31\u5C06 nn \u53F3\u79FB\u4E00\u4F4D\uFF0C\u8FD9\u6837\u5F53\u524D nn \u7684\u6700\u4F4E\u4F4D\u5C31\u662F\u6211\u4EEC\u8981\u679A\u4E3E\u7684\u6BD4\u7279\u4F4D\u3002\u5F53 nn \u4E3A 00 \u65F6\u5373\u53EF\u7ED3\u675F\u5FAA\u73AF\u3002</p><p>\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u5728\u67D0\u4E9B\u8BED\u8A00\uFF08\u5982 \\texttt{Java}Java\uFF09\u4E2D\uFF0C\u6CA1\u6709\u65E0\u7B26\u53F7\u6574\u6570\u7C7B\u578B\uFF0C\u56E0\u6B64\u5BF9 nn \u7684\u53F3\u79FB\u64CD\u4F5C\u5E94\u4F7F\u7528\u903B\u8F91\u53F3\u79FB\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var reverseBits = function(n) {
    let rev = 0;
    for (let i = 0; i &lt; 32 &amp;&amp; n &gt; 0; ++i) {
        rev |= (n &amp; 1) &lt;&lt; (31 - i);
        n &gt;&gt;&gt;= 1;
    }
    return rev &gt;&gt;&gt; 0;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,34);function r(l,p){return e}var u=n(a,[["render",r],["__file","PDD.html.vue"]]);export{u as default};
