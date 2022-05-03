import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.3dedad24.js";const e={},a=s(`<h1 id="\u5B57\u8282\u8DF3\u52A8codetop-\u4E00" tabindex="-1"><a class="header-anchor" href="#\u5B57\u8282\u8DF3\u52A8codetop-\u4E00" aria-hidden="true">#</a> \u5B57\u8282\u8DF3\u52A8CodeTop\uFF08\u4E00\uFF09</h1><h2 id="_400-\u7B2C-n-\u4F4D\u6570\u5B57" tabindex="-1"><a class="header-anchor" href="#_400-\u7B2C-n-\u4F4D\u6570\u5B57" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/nth-digit/" target="_blank" rel="noopener noreferrer">400. \u7B2C N \u4F4D\u6570\u5B57</a></h2><p><strong>\u89E3\u9898\u601D\u8DEF</strong> \u9996\u5148\u6211\u4EEC\u5F88\u5BB9\u6613\u660E\u767D\u5982\u4E0B\u89C4\u5F8B:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>1\u4F4D\u6570 9\u4E2A ===&gt; 1 * 9

2\u4F4D\u6570 90\u4E2A ===&gt; 2 * 90

3\u4F4D\u6570 900\u4E2A ===&gt; 3 * 900

...
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function(n) {
    let cur = 1, base = 9;
    while(n &gt; cur * base){
        n -= cur * base;
        cur++;
        base*=10;
        if(Number.MAX_SAFE_INTEGER / base &lt; cur){
            break;
        }
    }
    n--;
    const num = Math.pow(10,cur - 1) + Math.floor(n / cur), idx = n % cur;
    return Math.floor(num / Math.pow(10,cur - 1 - idx)) % 10;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="_165-\u6BD4\u8F83\u7248\u672C\u53F7" tabindex="-1"><a class="header-anchor" href="#_165-\u6BD4\u8F83\u7248\u672C\u53F7" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/compare-version-numbers/" target="_blank" rel="noopener noreferrer">165. \u6BD4\u8F83\u7248\u672C\u53F7</a></h2><blockquote><p>\u672A\u6807\u8BC6\u4F4D\uFF0C\u59822.2\u548C2\uFF0C\u591A\u51FA\u7684\u4F4D\u6570\u6BD4\u8F83\u89C6\u4F5C\u4E3A0</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    const v1 = version1.split(&#39;.&#39;);
    const v2 = version2.split(&#39;.&#39;);
    for (let i = 0; i &lt; v1.length || i &lt; v2.length; ++i) {
        let x = 0, y = 0; // \u591A\u51FA\u7684\u4F4D\u6570\u6BD4\u8F83\u89C6\u4F5C\u4E3A0
        if (i &lt; v1.length) {
            x = parseInt(v1[i]);
        }
        if (i &lt; v2.length) {
            y = parseInt(v2[i]);
        }
        if (x &gt; y) {
            return 1;
        }
        if (x &lt; y) {
            return -1;
        }
    }
    return 0;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h2 id="_415-\u5B57\u7B26\u4E32\u76F8\u52A0" tabindex="-1"><a class="header-anchor" href="#_415-\u5B57\u7B26\u4E32\u76F8\u52A0" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/add-strings/" target="_blank" rel="noopener noreferrer">415. \u5B57\u7B26\u4E32\u76F8\u52A0</a></h2><blockquote><p>\u4F1A\u6EA2\u51FA \uFF0C\u53BB\u770B\u4E00\u4E0B\u5B57\u7B26\u4E32\u76F8\u4E58</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    return (parseIn(num1)+parseInt(num2)).toString()
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote><p>\u4E0D\u4F1A\u6EA2\u51FA</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {string} num1
 * @param {string} num2
 * @description \u9010\u4E2A\u76F8\u52A0
 * @return {string}
 */
var addStrings = function(num1, num2) {
    let i = num1.length - 1, j = num2.length - 1, add = 0;
    const ans = [];
    while (i &gt;= 0 || j &gt;= 0 || add != 0) {
        const x = i &gt;= 0 ? num1.charAt(i) - &#39;0&#39; : 0;
        const y = j &gt;= 0 ? num2.charAt(j) - &#39;0&#39; : 0;
        const result = x + y + add;
        ans.push(result % 10);
        add = Math.floor(result / 10);
        i -= 1;
        j -= 1;
    }
    return ans.reverse().join(&#39;&#39;);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="_43-\u5B57\u7B26\u4E32\u76F8\u4E58" tabindex="-1"><a class="header-anchor" href="#_43-\u5B57\u7B26\u4E32\u76F8\u4E58" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/multiply-strings/" target="_blank" rel="noopener noreferrer">43. \u5B57\u7B26\u4E32\u76F8\u4E58</a></h2><blockquote><p>\u901A\u8FC7\u6A21\u4EFF\u7B14\u7B97\u7684\u6B65\u9AA4\u5B9E\u73B0</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  let m = num1.length,
    n = num2.length;
  // \u7ED3\u679C\u6700\u591A\u4E3Am+n\u4F4D
  let res = new Array(m + n).fill(0);
  // \u4ECE\u4E2A\u4F4D\u6570\u5F00\u59CB\u9010\u4F4D\u76F8\u4E58
  for (let i = m - 1; i &gt;= 0; i--) {
    for (let j = n - 1; j &gt;= 0; j--) {
      let mul = (num1[i] - 0) * (num2[j] - 0);
      // \u4E58\u79EF\u5728res\u5BF9\u5E94\u7684\u7D22\u5F15\u4F4D\u7F6E
      let p1 = i + j,
        p2 = i + j + 1;
      // \u53E0\u52A0\u5230res\u4E0A
      let sum = mul + res[p2];
      res[p2] = sum % 10;
      res[p1] += parseInt(sum / 10);
    }
  }
  // \u7ED3\u679C\u524D\u7F00\u53EF\u80FD\u5B58\u57280\uFF08\u672A\u4F7F\u7528\u7684\u4F4D\uFF09
  let i = 0;
  while (i &lt; res.length &amp;&amp; res[i] == 0) {
    i++;
  }
  // \u5C06\u8BA1\u7B97\u7ED3\u679C\u8F6C\u5316\u6210\u5B57\u7B26\u4E32
  let str = &quot;&quot;;
  for (; i &lt; res.length; i++) {
    str += res[i];
  }
  return str.length == 0 ? &quot;0&quot; : str;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h2 id="_1-\u4E24\u6570\u4E4B\u548C" tabindex="-1"><a class="header-anchor" href="#_1-\u4E24\u6570\u4E4B\u548C" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/two-sum/" target="_blank" rel="noopener noreferrer">1. \u4E24\u6570\u4E4B\u548C</a></h2><blockquote><p>map\u8BB0\u5F55\u5DEE\u503C</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0, len = nums.length; i &lt; len; i++){
        if(map.has(target - nums[i])){
            return [map.get(target - nums[i]), i];
        }else{
            map.set(nums[i], i);
        }
    }
    return [];
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="_70-\u722C\u697C\u68AF" tabindex="-1"><a class="header-anchor" href="#_70-\u722C\u697C\u68AF" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/climbing-stairs/" target="_blank" rel="noopener noreferrer">70. \u722C\u697C\u68AF</a></h2><blockquote><p>\u804A\u5929\u7684\u65F6\u5019\u5F97\u77E5\u5E38\u8003</p></blockquote><p>\u9012\u5F52\u8D85\u65F6\u4E86~</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 2
    }
    return climbStairs(n - 1) + climbStairs(n - 2)
};

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>\u8FED\u4EE3\u7B97\u6CD5</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    let l = 0, r = 0, res = 1; // \u770B\u6210\u5DE6\u4E2D\u53F3\u4E5F\u884C\uFF0C\u7528\u4E8E\u6682\u5B58\u6570\u636E
    for (let i = 1; i &lt;= n; i++) {
        l = r // \u9010\u4E2A\u53F3\u79FB\u64CD\u4F5C
        r = res
        res = l + r
    }
    return res
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="_5-\u6700\u957F\u56DE\u6587\u5B50\u4E32" tabindex="-1"><a class="header-anchor" href="#_5-\u6700\u957F\u56DE\u6587\u5B50\u4E32" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/longest-palindromic-substring/" target="_blank" rel="noopener noreferrer">5. \u6700\u957F\u56DE\u6587\u5B50\u4E32</a></h2><blockquote><p>\u4E2D\u5FC3\u6269\u6563\u65B9\u6CD5\uFF0C\u533A\u5206\u5076\u6570\u4E0E\u5947\u6570\u957F\u5EA6\u56DE\u6587\u4E32</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var longestPalindrome = function (s) {
    let res = &quot;&quot;
    for (let i = 0; i &lt; s.length; i++) {
        // \u5904\u7406\u5947\u6570\u56DE\u6587\u4E32
        const s1 = palindrome(s, i, i)
        // \u5904\u7406\u5076\u6570\u56DE\u6587\u4E32
        const s2 = palindrome(s, i, i + 1)
        res = res.length &lt;= s1.length ? s1 : res
        res = res.length &lt;= s2.length ? s2 : res
    }
    return res
};

// \u8FD4\u56DE\u4EE5l,r\u4E3A\u4E2D\u5FC3\u70B9\u6269\u6563\u7684\u6700\u957F\u56DE\u6587\u4E32
function palindrome(s, l, r) {
    while (l &gt;= 0 &amp;&amp; r &lt; s.length &amp;&amp; s[l] === s[r]) {
        l--
        r++
    }
    return s.slice(l + 1, r)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="_200-\u5C9B\u5C7F\u6570\u91CF" tabindex="-1"><a class="header-anchor" href="#_200-\u5C9B\u5C7F\u6570\u91CF" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/number-of-islands/" target="_blank" rel="noopener noreferrer">200. \u5C9B\u5C7F\u6570\u91CF</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * Created by Yihui_Shi on 2022/2/25 13:07
 */
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let rows = grid.length,
        cols = grid[0].length;
    // \u65B9\u5411\u6570\u7EC4
    let directions = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
    ];
    // \u6DF1\u5EA6\u4F18\u5148\u641C\u7D22
    const dfs = (i, j) =&gt; {
        // \u8D85\u51FA\u8FB9\u754C \u6216\u8005\u672C\u8EAB\u5C31\u5DF2\u7ECF\u662F\u6D77\u6C34\u4E86
        if (i &lt; 0 || j &lt; 0 || i &gt;= rows || j &gt;= cols || grid[i][j] == 0) return;
        // \u6DF9\u6CA1\u5B83 \u907F\u514D\u91CD\u590D\u8BBF\u95EE
        grid[i][j] = 0;
        for (let dir of directions) {
            dfs(dir[0] + i, dir[1] + j);
        }
    };
    let count = 0;
    for (let i = 0; i &lt; rows; i++) {
        for (let j = 0; j &lt; cols; j++) {
            if (grid[i][j] == 1) {
                count++;
                // \u6DF9\u6CA1\u6574\u4E2A\u5C9B\u5C7F
                dfs(i, j);
            }
        }
    }
    return count;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h2 id="_695-\u5C9B\u5C7F\u7684\u6700\u5927\u9762\u79EF" tabindex="-1"><a class="header-anchor" href="#_695-\u5C9B\u5C7F\u7684\u6700\u5927\u9762\u79EF" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/max-area-of-island/" target="_blank" rel="noopener noreferrer">695. \u5C9B\u5C7F\u7684\u6700\u5927\u9762\u79EF</a></h2><blockquote><p>\u65B9\u6CD51.dfs \u601D\u8DEF\uFF1A\u6DF1\u5EA6\u4F18\u5148\uFF0C\u5148\u5FAA\u73AF\u7F51\u683C\uFF0C \u5F53grid[x][y] === 1\u65F6\uFF0C\u5C06\u5F53\u524D\u5355\u5143\u683C\u7F6E\u4E3A0\u5E76\u4E0A\u4E0B\u5DE6\u53F3\u4E0D\u65AD\u9012\u5F52\uFF0C\u8BA1\u7B97\u6BCF\u4E2A\u5C9B\u5C7F\u7684\u5927\u5C0F\uFF0C\u7136\u540E\u4E0D\u65AD\u66F4\u65B0\u6700\u5927\u5C9B\u5C7F \u590D\u6742\u5EA6\uFF1A\u65F6\u95F4\u590D\u6742\u5EA6O(mn)\uFF0Cm\u3001n\u5206\u522B\u662F\u7F51\u683C\u7684\u957F\u548C\u5BBD\u3002\u7A7A\u95F4\u590D\u6742\u5EA6O(mn)\uFF0C\u9012\u5F52\u6700\u5927\u6DF1\u5EA6</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var maxAreaOfIsland = function(grid) {
    let row = grid.length, col = grid[0].length;
    function dfs (x, y) {
      	//\u8D8A\u754C\u5224\u65AD \u5F53grid[x][y] === 0\u65F6 \u76F4\u63A5\u8FD4\u56DE
        if (x &lt; 0 || x &gt;= row || y &lt; 0 || y &gt;= col || grid[x][y] === 0) return 0;
        grid[x][y] = 0;//\u5F53grid[x][y] === 1\u65F6\uFF0C\u5C06\u5F53\u524D\u5355\u5143\u683C\u7F6E\u4E3A0
        let ans = 1, dx = [-1, 1, 0, 0], dy = [0, 0, 1, -1];//\u65B9\u5411\u6570\u7EC4
        for (let i = 0; i &lt; dx.length; i++) {//\u4E0A\u4E0B\u5DE6\u53F3\u4E0D\u65AD\u9012\u5F52\uFF0C\u8BA1\u7B97\u6BCF\u4E2A\u5C9B\u5C7F\u7684\u5927\u5C0F
            ans += dfs(x + dx[i], y + dy[i]);
        }
        return ans;
    }
    let res = 0;
    for (let i = 0; i &lt; row; i++) {
        for (let j = 0; j &lt; col; j++) {
            res = Math.max(res, dfs(i, j));//\u5FAA\u73AF\u7F51\u683C \u66F4\u65B0\u6700\u5927\u5C9B\u5C7F
        }
    }
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><blockquote><p>\u65B9\u6CD52.bfs \u601D\u8DEF\uFF1A\u5E7F\u5EA6\u4F18\u5148\uFF0C\u5FAA\u73AF\u7F51\u683C\uFF0C\u4E0D\u65AD\u5C06\u5F53\u524D\u7F51\u683C\u7684\u5750\u6807\u52A0\u5165\u961F\u5217\uFF0C\u5982\u679C\u5F53\u524D\u7F51\u683C\u5BF9\u5E94\u7684\u503C\u662F1\uFF0C\u5219\u7F6E\u4E3A0\uFF0C\u7136\u540E\u5411\u56DB\u5468\u6269\u6563\uFF0C\u627E\u5230\u4E0B\u4E00\u5C42\u7684\u7F51\u683C\u5750\u6807\uFF0C\u52A0\u5165\u961F\u5217\uFF0C\u76F4\u5230\u961F\u5217\u4E3A\u7A7A \u590D\u6742\u5EA6\uFF1A\u65F6\u95F4\u590D\u6742\u5EA6O(mn)\uFF0Cm\u3001n\u5206\u522B\u662F\u7F51\u683C\u7684\u957F\u548C\u5BBD\u3002\u7A7A\u95F4\u590D\u6742\u5EA6O(mn)\uFF0Cqueue\u7684\u5927\u5C0F</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var maxAreaOfIsland = function(grid) {
    let ans = 0, row = grid.length, col = grid[0].length;
    let dx = [1, -1, 0, 0], dy = [0, 0, 1, -1];//\u65B9\u5411\u6570\u7EC4
    for (let i = 0; i &lt; row; i++) {
        for (let j = 0; j &lt; col; j++) {
            if (grid[i][j] === 0) continue;//\u5FAA\u73AF\u7F51\u683C\uFF0C\u9047\u52300\u5C31\u8DF3\u8FC7
            let queue = [[i, j]], curr = 0;//\u5728\u961F\u5217\u4E2D\u52A0\u5165\u5F53\u524D\u7F51\u683C\u7684\u503C
            while (queue.length &gt; 0) {
                let [x, y] = queue.shift();//\u4E0D\u65AD\u51FA\u961F
              	// \u8D8A\u754C\u5224\u65AD
                if (x &lt; 0 || x &gt;= row || y &lt; 0 || y &gt;= col || grid[x][y] === 0) continue;
                ++curr;//\u66F4\u65B0\u5C9B\u5C7F\u7684\u6570\u91CF
                grid[x][y] = 0;//\u904D\u5386\u8FC7\u7684\u7F51\u683C\u7F6E\u4E3A0
                for (let k = 0; k &lt; dx.length; k++) {//\u4E0A\u4E0B\u5DE6\u53F3\u904D\u5386\uFF0C\u628A\u4E0B\u4E00\u5C42\u7684\u8282\u70B9\u52A0\u5165\u961F\u5217
                    queue.push([x + dx[k], y + dy[k]]);
                }
            }
            ans = Math.max(ans, curr);//\u66F4\u65B0\u6700\u5927\u5C9B\u5C7F\u9762\u79EF
        }
    }
    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="_141-\u73AF\u5F62\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#_141-\u73AF\u5F62\u94FE\u8868" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/linked-list-cycle/" target="_blank" rel="noopener noreferrer">141. \u73AF\u5F62\u94FE\u8868</a></h2><blockquote><p>\u6807\u8BB0</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = function(head) {
  while (head) {
    if (head.tag) {
      return true;
    }
    head.tag = true;
    head = head.next;
  }
  return false;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><blockquote><p>json\u6B6A\u95E8\u90AA\u9053</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    try {
        JSON.stringify(head)
    } catch{
        return true
    }
    return false
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_15-\u4E09\u6570\u4E4B\u548C" tabindex="-1"><a class="header-anchor" href="#_15-\u4E09\u6570\u4E4B\u548C" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/3sum/" target="_blank" rel="noopener noreferrer">15. \u4E09\u6570\u4E4B\u548C</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  // \u6700\u5DE6\u4FA7\u503C\u4E3A\u5B9A\u503C\uFF0C\u53F3\u4FA7\u6240\u6709\u503C\u8FDB\u884C\u4E24\u8FB9\u63A8\u8FDB\u8BA1\u7B97
  let res = [];
  nums.sort((a, b) =&gt; a - b);
  let size = nums.length;
  if (nums[0] &lt;= 0 &amp;&amp; nums[size - 1] &gt;= 0) {
    // \u4FDD\u8BC1\u6709\u6B63\u6570\u8D1F\u6570
    let i = 0;
    while (i &lt; size - 2) {
      if (nums[i] &gt; 0) break; // \u6700\u5DE6\u4FA7\u5927\u4E8E0\uFF0C\u65E0\u89E3
      let first = i + 1;
      let last = size - 1;
      while (first &lt; last) {
        if (nums[i] * nums[last] &gt; 0) break; // \u4E09\u6570\u540C\u7B26\u53F7\uFF0C\u65E0\u89E3
        let sum = nums[i] + nums[first] + nums[last];
        if (sum === 0) {
          res.push([nums[i], nums[first], nums[last]]);
        }
        if (sum &lt;= 0) {
          // \u8D1F\u6570\u8FC7\u5C0F\uFF0Cfirst\u53F3\u79FB
          while (nums[first] === nums[++first]) {} // \u91CD\u590D\u503C\u8DF3\u8FC7
        } else {
          while (nums[last] === nums[--last]) {} // \u91CD\u590D\u503C\u8DF3\u8FC7
        }
      }
      while (nums[i] === nums[++i]) {}
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h2 id="_155-\u6700\u5C0F\u6808" tabindex="-1"><a class="header-anchor" href="#_155-\u6700\u5C0F\u6808" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/min-stack/" target="_blank" rel="noopener noreferrer">155. \u6700\u5C0F\u6808</a></h2><blockquote><p>\u53CC\u6808\uFF0C\u7EF4\u62A4\u4E00\u4E2A\u6700\u5C0F\u503C\u6808</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var MinStack = function() {
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

MinStack.prototype.getMin = function() {
    return this.min_stack[this.min_stack.length - 1];
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="_209-\u957F\u5EA6\u6700\u5C0F\u7684\u5B50\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#_209-\u957F\u5EA6\u6700\u5C0F\u7684\u5B50\u6570\u7EC4" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/minimum-size-subarray-sum/" target="_blank" rel="noopener noreferrer">209. \u957F\u5EA6\u6700\u5C0F\u7684\u5B50\u6570\u7EC4</a></h2><blockquote><p>\u6ED1\u52A8\u7A97\u53E3</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */

var minSubArrayLen = function(target, nums) {
    // \u957F\u5EA6\u8BA1\u7B97\u4E00\u6B21
    const len = nums.length;
    let l = r = sum = 0, 
        res = len + 1; // \u5B50\u6570\u7EC4\u6700\u5927\u4E0D\u4F1A\u8D85\u8FC7\u81EA\u8EAB
    while(r &lt; len) {
        sum += nums[r++];
        // \u7A97\u53E3\u6ED1\u52A8
        while(sum &gt;= target) {
            // r\u59CB\u7EC8\u4E3A\u5F00\u533A\u95F4 [l, r)
            res = res &lt; r - l ? res : r - l;
            sum-=nums[l++];
        }
    }
    return res &gt; len ? 0 : res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="_230-\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7B2Ck\u5C0F\u7684\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#_230-\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7B2Ck\u5C0F\u7684\u5143\u7D20" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/" target="_blank" rel="noopener noreferrer">230. \u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7B2CK\u5C0F\u7684\u5143\u7D20</a></h2><blockquote><p>\u4E2D\u5E8F\u904D\u5386\uFF08\u5148\u627E\u5230\u6700\u5C0F\u5143\u7D20\u5E76\u9010\u4E2A\u904D\u5386k\u6B21\uFF09</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var kthSmallest = function(root, k) {
    const stack = [];
    while (root != null || stack.length) {
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        --k;
        if (k === 0) {
            break;
        }
        root = root.right;
    }
    return root.val;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="_226-\u7FFB\u8F6C\u4E8C\u53C9\u6811" tabindex="-1"><a class="header-anchor" href="#_226-\u7FFB\u8F6C\u4E8C\u53C9\u6811" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/invert-binary-tree/" target="_blank" rel="noopener noreferrer">226. \u7FFB\u8F6C\u4E8C\u53C9\u6811</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (root === null) {
        return null;
    }
    const left = invertTree(root.left);
    const right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const invertTree = (root) =&gt; {
  if (root == null) { // \u904D\u5386\u5230null\u8282\u70B9\u65F6\uFF0C\u4E0D\u7528\u7FFB\u8F6C\uFF0C\u76F4\u63A5\u8FD4\u56DE\u5B83\u672C\u8EAB
    return root;
  }
  invertTree(root.left);
  invertTree(root.right);

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  return root;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="_21-\u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#_21-\u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u94FE\u8868" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/merge-two-sorted-lists/" target="_blank" rel="noopener noreferrer">21. \u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u94FE\u8868</a></h2><blockquote><p>\u9012\u5F52</p><p>\u4E5F\u5C31\u662F\u8BF4\uFF0C\u4E24\u4E2A\u94FE\u8868\u5934\u90E8\u503C\u8F83\u5C0F\u7684\u4E00\u4E2A\u8282\u70B9\u4E0E\u5269\u4E0B\u5143\u7D20\u7684 <code>merge</code> \u64CD\u4F5C\u7ED3\u679C\u5408\u5E76\u3002</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var mergeTwoLists = function(l1, l2) {
    if (l1 === null) {
        return l2;
    } else if (l2 === null) {
        return l1;
    } else if (l1.val &lt; l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><blockquote><p>\u8FED\u4EE3</p><p>\u66F4\u50CF\u662F\u6A21\u4EFF\u8FC7\u7A0B\uFF0C\u66F4\u9002\u5408\u7406\u89E3</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var mergeTwoLists = function(l1, l2) {
    const prehead = new ListNode(-1);

    let prev = prehead;
    while (l1 != null &amp;&amp; l2 != null) {
        if (l1.val &lt;= l2.val) {
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }

    // \u5408\u5E76\u540E l1 \u548C l2 \u6700\u591A\u53EA\u6709\u4E00\u4E2A\u8FD8\u672A\u88AB\u5408\u5E76\u5B8C\uFF0C\u6211\u4EEC\u76F4\u63A5\u5C06\u94FE\u8868\u672B\u5C3E\u6307\u5411\u672A\u5408\u5E76\u5B8C\u7684\u94FE\u8868\u5373\u53EF
    prev.next = l1 === null ? l2 : l1;

    return prehead.next;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="_94-\u4E8C\u53C9\u6811\u7684\u4E2D\u5E8F\u904D\u5386" tabindex="-1"><a class="header-anchor" href="#_94-\u4E8C\u53C9\u6811\u7684\u4E2D\u5E8F\u904D\u5386" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/binary-tree-inorder-traversal/" target="_blank" rel="noopener noreferrer">94. \u4E8C\u53C9\u6811\u7684\u4E2D\u5E8F\u904D\u5386</a></h2><blockquote><p>\u624B\u5199\u4E00\u4E2A\u9012\u5F52</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const res = [];
    const tracersal = (root) =&gt;{
        if(root==null){
            return res;
        }
        tracersal(root.left);
        res.push(root.val);
        tracersal(root.right);
    }
    tracersal(root)
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><blockquote><p>\u4E0D\u8981\u5FD8\u8BB0\u8FED\u4EE3</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var inorderTraversal = function(root) {
    const res = [];
    const stk = [];
    while (root || stk.length) {
        while (root) {
            stk.push(root);
            root = root.left;
        }
        root = stk.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="_429-n-\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386" tabindex="-1"><a class="header-anchor" href="#_429-n-\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/" target="_blank" rel="noopener noreferrer">429. N \u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386</a></h2><blockquote><p>\u5E76\u4E0D\u50CF\u4E8C\u53C9\u6811\u5C42\u5E8F\u90A3\u4E48\u7B80\u5355</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let res = [];
  if (root == null) return res;
  let queue = [root];
  while (queue.length) {
    let size = queue.length;
    let level = [];
    while (size--) {
      let cur = queue.shift();
      level.push(cur.val);
      for (let node of cur.children) { // \u4F60\u4E0D\u8BF4\u8C01\u77E5\u9053\u8FD9\u4E2A\u662F\u5565\u53EF\u8FED\u4EE3\u5BF9\u8C61
        if (node) queue.push(node);
      }
    }
    res.push(level);
  }
  return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="_718-\u6700\u957F\u91CD\u590D\u5B50\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#_718-\u6700\u957F\u91CD\u590D\u5B50\u6570\u7EC4" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/" target="_blank" rel="noopener noreferrer">718. \u6700\u957F\u91CD\u590D\u5B50\u6570\u7EC4</a></h2><p>\u4E8C\u7EF4dp\u53BB\u505A\uFF0C\u6709\u70B9\u96BE\u7406\u89E3</p><h2 id="_93-\u590D\u539F-ip-\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#_93-\u590D\u539F-ip-\u5730\u5740" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/restore-ip-addresses/" target="_blank" rel="noopener noreferrer">93. \u590D\u539F IP \u5730\u5740</a></h2><blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u8F93\u5165\uFF1As = &quot;25525511135&quot;
\u8F93\u51FA\uFF1A[&quot;255.255.11.135&quot;,&quot;255.255.111.35&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    const SEG_COUNT = 4;
    const segments = new Array(SEG_COUNT);
    const ans = [];

    const dfs = (s, segId, segStart) =&gt; {
        // \u5982\u679C\u627E\u5230\u4E86 4 \u6BB5 IP \u5730\u5740\u5E76\u4E14\u904D\u5386\u5B8C\u4E86\u5B57\u7B26\u4E32\uFF0C\u90A3\u4E48\u5C31\u662F\u4E00\u79CD\u7B54\u6848
        if (segId === SEG_COUNT) {
            if (segStart === s.length) {
                ans.push(segments.join(&#39;.&#39;));
            }
            return;
        }

        // \u5982\u679C\u8FD8\u6CA1\u6709\u627E\u5230 4 \u6BB5 IP \u5730\u5740\u5C31\u5DF2\u7ECF\u904D\u5386\u5B8C\u4E86\u5B57\u7B26\u4E32\uFF0C\u90A3\u4E48\u63D0\u524D\u56DE\u6EAF
        if (segStart === s.length) {
            return;
        }

        // \u7531\u4E8E\u4E0D\u80FD\u6709\u524D\u5BFC\u96F6\uFF0C\u5982\u679C\u5F53\u524D\u6570\u5B57\u4E3A 0\uFF0C\u90A3\u4E48\u8FD9\u4E00\u6BB5 IP \u5730\u5740\u53EA\u80FD\u4E3A 0
        if (s.charAt(segStart) === &#39;0&#39;) {
            segments[segId] = 0;
            dfs(s, segId + 1, segStart + 1);
        }

        // \u4E00\u822C\u60C5\u51B5\uFF0C\u679A\u4E3E\u6BCF\u4E00\u79CD\u53EF\u80FD\u6027\u5E76\u9012\u5F52
        let addr = 0;
        for (let segEnd = segStart; segEnd &lt; s.length; ++segEnd) {
            addr = addr * 10 + (s.charAt(segEnd) - &#39;0&#39;);
            if (addr &gt; 0 &amp;&amp; addr &lt;= 0xFF) {
                segments[segId] = addr;
                dfs(s, segId + 1, segEnd + 1);
            } else {
                break;
            }
        }
    }

    dfs(s, 0, 0);
    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><h2 id="_912-\u6392\u5E8F\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#_912-\u6392\u5E8F\u6570\u7EC4" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/sort-an-array/" target="_blank" rel="noopener noreferrer">912. \u6392\u5E8F\u6570\u7EC4</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    return nums.sort((a,b)=&gt; a - b)
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_104-\u4E8C\u53C9\u6811\u7684\u6700\u5927\u6DF1\u5EA6" tabindex="-1"><a class="header-anchor" href="#_104-\u4E8C\u53C9\u6811\u7684\u6700\u5927\u6DF1\u5EA6" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/" target="_blank" rel="noopener noreferrer">104. \u4E8C\u53C9\u6811\u7684\u6700\u5927\u6DF1\u5EA6</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var maxDepth = function (root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_113-\u8DEF\u5F84\u603B\u548C-ii" tabindex="-1"><a class="header-anchor" href="#_113-\u8DEF\u5F84\u603B\u548C-ii" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/path-sum-ii/" target="_blank" rel="noopener noreferrer">113. \u8DEF\u5F84\u603B\u548C II</a></h2><blockquote><p>\u540C\u65F6\u7EF4\u62A4res \u7B54\u6848\u6570\u7EC4\u548Cpath\u8DEF\u5F84\u6570\u7EC4\uFF08\u7528\u4E8E\u56DE\u6EAF\uFF09</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
const pathSum = function (root, targetSum) {
    // \u9012\u5F52\u6CD5
    // \u8981\u904D\u5386\u6574\u4E2A\u6811\u627E\u5230\u6240\u6709\u8DEF\u5F84\uFF0C\u6240\u4EE5\u9012\u5F52\u51FD\u6570\u4E0D\u9700\u8981\u8FD4\u56DE\u503C, \u4E0E112\u4E0D\u540C
    const res = [];
    const travelsal = (node, cnt, path) =&gt; {
        // \u9047\u5230\u4E86\u53F6\u5B50\u8282\u70B9\u4E14\u627E\u5230\u4E86\u548C\u4E3Asum\u7684\u8DEF\u5F84
        if (cnt === 0 &amp;&amp; !node.left &amp;&amp; !node.right) {
            res.push([...path]); // \u4E0D\u80FD\u5199res.push(path), \u8981\u6DF1\u62F7\u8D1D
            return;
        }
        if (!node.left &amp;&amp; !node.right) return; // \u9047\u5230\u53F6\u5B50\u8282\u70B9\u800C\u6CA1\u6709\u627E\u5230\u5408\u9002\u7684\u8FB9\uFF0C\u76F4\u63A5\u8FD4\u56DE
        // \u5DE6 \uFF08\u7A7A\u8282\u70B9\u4E0D\u904D\u5386\uFF09
        if (node.left) {
            path.push(node.left.val);
            travelsal(node.left, cnt - node.left.val, path); // \u9012\u5F52
            path.pop(); // \u56DE\u6EAF
        }
        // \u53F3 \uFF08\u7A7A\u8282\u70B9\u4E0D\u904D\u5386\uFF09
        if (node.right) {
            path.push(node.right.val);
            travelsal(node.right, cnt - node.right.val, path); // \u9012\u5F52
            path.pop(); // \u56DE\u6EAF
        }
    };
    if (!root) return res;
    travelsal(root, targetSum - root.val, [root.val]); // \u628A\u6839\u8282\u70B9\u653E\u8FDB\u8DEF\u5F84
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h2 id="_322-\u96F6\u94B1\u5151\u6362" tabindex="-1"><a class="header-anchor" href="#_322-\u96F6\u94B1\u5151\u6362" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/coin-change/" target="_blank" rel="noopener noreferrer">322. \u96F6\u94B1\u5151\u6362</a></h2><blockquote><p>\u8D2A\u5FC3\u4E0D\u4E00\u5B9A\u662F\u5BF9\u7684</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="\u5251\u6307-offer-09-\u7528\u4E24\u4E2A\u6808\u5B9E\u73B0\u961F\u5217" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-09-\u7528\u4E24\u4E2A\u6808\u5B9E\u73B0\u961F\u5217" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 09. \u7528\u4E24\u4E2A\u6808\u5B9E\u73B0\u961F\u5217</a></h2><blockquote><p>\u5C06\u4E00\u4E2A\u6808\u5F53\u4F5C\u8F93\u5165\u6808\uFF0C\u7528\u4E8E\u538B\u5165 appendTail \u4F20\u5165\u7684\u6570\u636E\uFF1B\u53E6\u4E00\u4E2A\u6808\u5F53\u4F5C\u8F93\u51FA\u6808\uFF0C\u7528\u4E8E deleteHead \u64CD\u4F5C\u3002</p><p>deleteHead \u65F6\uFF0C\u82E5\u8F93\u51FA\u6808\u4E3A\u7A7A\u5219\u5C06\u8F93\u5165\u6808\u7684\u5168\u90E8\u6570\u636E\u4F9D\u6B21\u5F39\u51FA\u5E76\u538B\u5165\u8F93\u51FA\u6808\uFF0C\u8FD9\u6837\u8F93\u51FA\u6808\u4ECE\u6808\u9876\u5F80\u6808\u5E95\u7684\u987A\u5E8F\u5C31\u662F\u961F\u5217\u4ECE\u961F\u9996\u5F80\u961F\u5C3E\u7684\u987A\u5E8F\u3002</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var CQueue = function() {
    this.stackA = [];
    this.stackB = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stackA.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if(this.stackB.length){
        return this.stackB.pop();
    }else{
        while(this.stackA.length){
            this.stackB.push(this.stackA.pop());
        }
        if(!this.stackB.length){
            return -1;
        }else{
            return this.stackB.pop();
        }
    }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h2 id="_160-\u76F8\u4EA4\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#_160-\u76F8\u4EA4\u94FE\u8868" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/intersection-of-two-linked-lists/" target="_blank" rel="noopener noreferrer">160. \u76F8\u4EA4\u94FE\u8868</a></h2><blockquote><p>\u4E00\u8FB9\u4E00\u76F4\u8BBF\u95EE\uFF0C\u5E76\u5B58\u5165set</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var getIntersectionNode = function(headA, headB) {
    const visited = new Set();
    let temp = headA;
    while (temp !== null) {
        visited.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while (temp !== null) {
        if (visited.has(temp)) {
            return temp;
        }
        temp = temp.next;
    }
    return null;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="_62-\u4E0D\u540C\u8DEF\u5F84" tabindex="-1"><a class="header-anchor" href="#_62-\u4E0D\u540C\u8DEF\u5F84" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/unique-paths/" target="_blank" rel="noopener noreferrer">62. \u4E0D\u540C\u8DEF\u5F84</a></h2><blockquote><p>\u5BFB\u8DEF\u95EE\u9898</p><p>\u52A8\u6001\u89C4\u5212 <em>f</em>(<em>i</em>,<em>j</em>)=<em>f</em>(<em>i</em>\u22121,<em>j</em>)+<em>f</em>(<em>i</em>,<em>j</em>\u22121)</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const f = new Array(m).fill(0).map(() =&gt; new Array(n).fill(0));
    for (let i = 0; i &lt; m; i++) {
        f[i][0] = 1; // \u8FB9\u754C\u4E3A1
    }
    for (let j = 0; j &lt; n; j++) {
        f[0][j] = 1; // \u8FB9\u754C\u4E3A1
    }
    for (let i = 1; i &lt; m; i++) {
        for (let j = 1; j &lt; n; j++) {
            f[i][j] = f[i - 1][j] + f[i][j - 1];
        }
    }
    return f[m - 1][n - 1];
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="_101-\u5BF9\u79F0\u4E8C\u53C9\u6811" tabindex="-1"><a class="header-anchor" href="#_101-\u5BF9\u79F0\u4E8C\u53C9\u6811" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/symmetric-tree/" target="_blank" rel="noopener noreferrer">101. \u5BF9\u79F0\u4E8C\u53C9\u6811</a></h2><blockquote><p>\u9012\u5F52\u5BF9\u6BD4\u5DE6\u53F3\u5B50\u6811\uFF0C\u7EC8\u6B62\u4E3A\u5DE6\u53F3\u5B50\u6811\u5747null</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const isSymmetric = function(root) {
    if(!root) return true;
    const isMirror = (l, r) =&gt; {
        if(!l &amp;&amp; !r) return true
        return !!(l &amp;&amp; r &amp;&amp; l.val === r.val &amp;&amp;
            isMirror(l.left, r.right) &amp;&amp;
            isMirror(l.right, r.left));
    }
    
    return isMirror(root.left, root.right);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="_14-\u6700\u957F\u516C\u5171\u524D\u7F00" tabindex="-1"><a class="header-anchor" href="#_14-\u6700\u957F\u516C\u5171\u524D\u7F00" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/longest-common-prefix/" target="_blank" rel="noopener noreferrer">14. \u6700\u957F\u516C\u5171\u524D\u7F00</a></h2><blockquote><p>\u53D6\u7B2C\u4E00\u4E2A\u5B57\u7B26\u4E32\u4E3A\u9ED8\u8BA4ans\uFF08\u672C\u5C31\u6700\u957F\u4E0D\u8D85\u8FC7\u6B64\uFF09\uFF0C\u540E\u904D\u5386</p></blockquote><img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220328124018508.png" alt="image-20220328124018508" style="zoom:50%;"><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length == 0) 
        return &quot;&quot;;
    let ans = strs[0];
    for(let i =1;i&lt;strs.length;i++) {
        let j=0;
        for(;j&lt;ans.length &amp;&amp; j &lt; strs[i].length;j++) {
            if(ans[j] != strs[i][j])
                break;
        }
        ans = ans.substr(0, j);
        if(ans === &quot;&quot;)
            return ans;
    }
    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="_468-\u9A8C\u8BC1ip\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#_468-\u9A8C\u8BC1ip\u5730\u5740" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/validate-ip-address/" target="_blank" rel="noopener noreferrer">468. \u9A8C\u8BC1IP\u5730\u5740</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var validIPAddress = function(IP) {
    const arr4 = IP.split(&quot;.&quot;);
    const arr6 = IP.split(&quot;:&quot;);
    if (arr4.length === 4) {
        if (arr4.every(part =&gt; (part.match(/^0$|^([1-9]\\d{0,2})$/) &amp;&amp; part &lt; 256) )) {
            return &quot;IPv4&quot;;
        }
    } else if (arr6.length === 8) {
        if (arr6.every(part =&gt; part.match(/^[0-9a-fA-F]{1,4}$/))) {
            return &quot;IPv6&quot;;
        }
    }
    return &quot;Neither&quot;;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="_105-\u4ECE\u524D\u5E8F\u4E0E\u4E2D\u5E8F\u904D\u5386\u5E8F\u5217\u6784\u9020\u4E8C\u53C9\u6811" tabindex="-1"><a class="header-anchor" href="#_105-\u4ECE\u524D\u5E8F\u4E0E\u4E2D\u5E8F\u904D\u5386\u5E8F\u5217\u6784\u9020\u4E8C\u53C9\u6811" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" target="_blank" rel="noopener noreferrer">105. \u4ECE\u524D\u5E8F\u4E0E\u4E2D\u5E8F\u904D\u5386\u5E8F\u5217\u6784\u9020\u4E8C\u53C9\u6811</a></h2><blockquote><p>\u67E5\u627E\u5206\u5272\u70B9\uFF08\u5B50\u6811\u7684\u6839\u8282\u70B9\uFF09</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var buildTree = function(preorder, inorder) {
    if(!preorder.length)
        return null;
    let root = new TreeNode(preorder[0]);
    let mid = inorder.findIndex((number) =&gt; number === root.val);// \u5206\u5272\u70B9\u7684\u5173\u952E
    root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
    root.right = buildTree(preorder.slice(mid + 1, preorder.length), inorder.slice(mid + 1, inorder.length));
    return root;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><blockquote><p>\u4E2D\u540E\u5E8F</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var buildTree = function(inorder, postorder) {
    if (!postorder.length) return null
    
    let root = new TreeNode(postorder[postorder.length - 1])
    
    let index = inorder.findIndex(number =&gt; number === root.val)// \u5206\u5272\u70B9\u7684\u5173\u952E
    
    root.left = buildTree(inorder.slice(0, index), postorder.slice(0, index))
    root.right = buildTree(inorder.slice(index + 1, inorder.length), postorder.slice(index, postorder.length - 1))
    
    return root
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_199-\u4E8C\u53C9\u6811\u7684\u53F3\u89C6\u56FE" tabindex="-1"><a class="header-anchor" href="#_199-\u4E8C\u53C9\u6811\u7684\u53F3\u89C6\u56FE" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/binary-tree-right-side-view/" target="_blank" rel="noopener noreferrer">199. \u4E8C\u53C9\u6811\u7684\u53F3\u89C6\u56FE</a></h2><blockquote><p>\u770B\u56FE\u6211\u4EEC\u53D1\u73B0, \u53F3\u89C6\u56FE\u7684\u8282\u70B9\u90FD\u662F<strong>\u6BCF\u4E00\u5C42\u7684\u6700\u540E\u4E00\u4E2A\u8282\u70B9</strong>, \u6240\u4EE5\u91C7\u7528<strong>\u5C42\u5E8F\u904D\u5386</strong>\u6700\u4E3A\u65B9\u4FBF</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var rightSideView = function(root) {
    //\u4E8C\u53C9\u6811\u53F3\u89C6\u56FE \u53EA\u9700\u8981\u628A\u6BCF\u4E00\u5C42\u6700\u540E\u4E00\u4E2A\u8282\u70B9\u5B58\u50A8\u5230res\u6570\u7EC4
    let res=[],queue=[];
    queue.push(root);
    while(queue.length&amp;&amp;root!==null){
        // \u8BB0\u5F55\u5F53\u524D\u5C42\u7EA7\u8282\u70B9\u4E2A\u6570
        let length=queue.length;
        while(length--){
            let node=queue.shift();
            //length\u957F\u5EA6\u4E3A0\u7684\u65F6\u5019\u8868\u660E\u5230\u4E86\u5C42\u7EA7\u6700\u540E\u4E00\u4E2A\u8282\u70B9
            if(!length){
                res.push(node.val);
            }
            node.left&amp;&amp;queue.push(node.left); // \u540C\u65F6\u6210\u7ACB\uFF0C\u6267\u884C\u5E76\u8FD4\u56DE\u7B2C\u4E8C\u4E2A
            node.right&amp;&amp;queue.push(node.right);
        }
    }
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="_394-\u5B57\u7B26\u4E32\u89E3\u7801" tabindex="-1"><a class="header-anchor" href="#_394-\u5B57\u7B26\u4E32\u89E3\u7801" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/decode-string/" target="_blank" rel="noopener noreferrer">394. \u5B57\u7B26\u4E32\u89E3\u7801</a></h2><blockquote><p>\u6709\u6548\u62EC\u53F7 pluse \u6808\u64CD\u4F5C</p></blockquote><p>\u53CC\u6808\u64CD\u4F5C</p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/image-20220328161937446.png" alt="image-20220328161937446"></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const decodeString = (s) =&gt; {
    let numStack = [];        // \u5B58\u500D\u6570\u7684\u6808
    let strStack = [];        // \u5B58 \u5F85\u62FC\u63A5\u7684str \u7684\u6808
    let num = 0;              // \u500D\u6570\u7684\u201C\u642C\u8FD0\u5DE5\u201D
    let result = &#39;&#39;;          // \u5B57\u7B26\u4E32\u7684\u201C\u642C\u8FD0\u5DE5\u201D
    
    for (const char of s) {   // \u9010\u5B57\u7B26\u626B\u63CF
        if (!isNaN(char)) {   // \u9047\u5230\u6570\u5B57
            num = num * 10 + Number(char); // \u7B97\u51FA\u500D\u6570
        } else if (char == &#39;[&#39;) {  // \u9047\u5230 [
            strStack.push(result); // result\u4E32\u5165\u6808
            result = &#39;&#39;;           // \u5165\u6808\u540E\u6E05\u96F6
            numStack.push(num);    // \u500D\u6570num\u8FDB\u5165\u6808\u7B49\u5F85\uFF08\u662F\u7B97\u597D\u7684\uFF0C\u6BD4\u598232\uFF09
            num = 0;               // \u5165\u6808\u540E\u6E05\u96F6
        } else if (char == &#39;]&#39;) {  // \u9047\u5230 ]\uFF0C\u4E24\u4E2A\u6808\u7684\u6808\u9876\u51FA\u6808
            let repeatTimes = numStack.pop(); // \u83B7\u53D6\u62F7\u8D1D\u6B21\u6570
            result = strStack.pop() + result.repeat(repeatTimes); // \u6784\u5EFA\u5B50\u4E32
        } else {                   
            result += char;        // \u9047\u5230\u5B57\u6BCD\uFF0C\u8FFD\u52A0\u7ED9result\u4E32
        }
    }
    return result;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="\u5251\u6307-offer-62-\u5706\u5708\u4E2D\u6700\u540E\u5269\u4E0B\u7684\u6570\u5B57" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-62-\u5706\u5708\u4E2D\u6700\u540E\u5269\u4E0B\u7684\u6570\u5B57" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 62. \u5706\u5708\u4E2D\u6700\u540E\u5269\u4E0B\u7684\u6570\u5B57</a></h2><blockquote><p>\u8FED\u4EE3\u66F4\u5408\u9002</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var lastRemaining = function (n, m) {
    let res = 0;
    for (let i = 2; i &lt;= n; i++) {
        res = (m + res) % i; // \u9664\u4EE5\u5FAA\u73AF\u88AB\u524A\u51CF\u7684\u4E2A\u6570
    }
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><blockquote><p>\u9012\u5F52</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var lastRemaining = function (n, m) {
    const f = (n, m) =&gt; {
        if (n === 1) {
            return 0
        }
        let x = f(n - 1, m)
        return (m + x) % n
    }
    return f(n, m)
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="_103-\u4E8C\u53C9\u6811\u7684\u952F\u9F7F\u5F62\u5C42\u5E8F\u904D\u5386" tabindex="-1"><a class="header-anchor" href="#_103-\u4E8C\u53C9\u6811\u7684\u952F\u9F7F\u5F62\u5C42\u5E8F\u904D\u5386" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/" target="_blank" rel="noopener noreferrer">103. \u4E8C\u53C9\u6811\u7684\u952F\u9F7F\u5F62\u5C42\u5E8F\u904D\u5386</a></h2><blockquote><p>\u7A0B\u5E8F\u904D\u5386\u53D8\u79CD\uFF0C\u5FAE\u8C03\u5373\u53EF</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var zigzagLevelOrder = function(root) {
    if (!root) {
        return [];
    }

    const ans = [];
    const nodeQueue = [root]; // \u8BB0\u5F55\u8BBF\u95EE\u7684node\u70B9

    let isOrderLeft = true; // \u987A\u5E8F\u6807\u8BB0

    while (nodeQueue.length) {
        let levelList = []; // \u6BCF\u5C42\u7B54\u6848
        const size = nodeQueue.length;
        for (let i = 0; i &lt; size; ++i) {
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
        isOrderLeft = !isOrderLeft; // \u53CD\u8F6C
    }

    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h2 id="_31-\u4E0B\u4E00\u4E2A\u6392\u5217" tabindex="-1"><a class="header-anchor" href="#_31-\u4E0B\u4E00\u4E2A\u6392\u5217" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/next-permutation/" target="_blank" rel="noopener noreferrer">31. \u4E0B\u4E00\u4E2A\u6392\u5217</a></h2><blockquote><p>\u601D\u8DEF \u5982\u4F55\u53D8\u5927\uFF1A\u4ECE\u4F4E\u4F4D\u6311\u4E00\u4E2A\u5927\u4E00\u70B9\u7684\u6570\uFF0C\u4EA4\u6362\u524D\u9762\u4E00\u4E2A\u5C0F\u4E00\u70B9\u7684\u6570\u3002 \u53D8\u5927\u7684\u5E45\u5EA6\u8981\u5C3D\u91CF\u5C0F\u3002 \u50CF [3,2,1] \u8FD9\u6837\u9012\u51CF\u7684\uFF0C\u6CA1\u6709\u4E0B\u4E00\u4E2A\u6392\u5217\uFF0C\u5DF2\u7ECF\u7A33\u5B9A\u4E86\uFF0C\u6CA1\u6CD5\u53D8\u5927\u3002 \u50CF [1,5,2,4,3,2] \u8FD9\u79CD\uFF0C\u600E\u4E48\u7A0D\u5FAE\u53D8\u5927\uFF1F</p><ul><li><p><strong>\u4ECE\u53F3\u5F80\u5DE6\uFF0C\u5BFB\u627E\u7B2C\u4E00\u4E2A\u6BD4\u53F3\u90BB\u5C45\u5C0F\u7684\u6570</strong>\uFF0C\u628A\u5B83\u6362\u5230\u540E\u9762\u53BB</p><ul><li>\u201C\u7B2C\u4E00\u4E2A\u201D\u610F\u5473\u7740\u5C3D\u91CF\u662F\u4F4E\u4F4D\uFF0C\u201C\u6BD4\u53F3\u90BB\u5C45\u5C0F\u201D\u610F\u5473\u7740\u5B83\u662F\u4ECE\u53F3\u5F80\u5DE6\u7684\u7B2C\u4E00\u4E2A\u6CE2\u8C37 \u6BD4\u5982\uFF0C1 5 (2) 4 3 2\uFF0C\u4E2D\u95F4\u8FD9\u4E2A 2\u3002</li></ul></li><li><p><strong>\u63A5\u7740\u8FD8\u662F\u4ECE\u53F3\u5F80\u5DE6\uFF0C\u5BFB\u627E\u7B2C\u4E00\u4E2A\u6BD4\u8FD9\u4E2A 2 \u5927\u7684\u6570</strong>\u300215 (2) 4 (3) 2\uFF0C\u4EA4\u6362\u540E\uFF1A15 (3) 4 (2) 2\u3002</p></li><li><p>\u8FD8\u6CA1\u7ED3\u675F\uFF01\u53D8\u5927\u7684\u5E45\u5EA6\u53EF\u4EE5\u518D\u5C0F\u4E00\u70B9\uFF0C\u4EDF\u4F4D\u5FAE\u53D8\u5927\u4E86\uFF0C\u540E\u4E09\u4F4D\u53EF\u4EE5\u518D\u5C0F\u4E00\u70B9\u3002</p></li><li><p><strong>\u540E\u4E09\u4F4D\u80AF\u5B9A\u662F\u9012\u51CF\u7684\uFF0C\u7FFB\u8F6C</strong>\uFF0C\u53D8\u6210[1,5,3,2,2,4]\uFF0C\u5373\u4E3A\u6240\u6C42\u3002</p></li></ul></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function nextPermutation(nums) {
    let i = nums.length - 2;                   // \u5411\u5DE6\u904D\u5386\uFF0Ci\u4ECE\u5012\u6570\u7B2C\u4E8C\u5F00\u59CB\u662F\u4E3A\u4E86nums[i+1]\u8981\u5B58\u5728
    while (i &gt;= 0 &amp;&amp; nums[i] &gt;= nums[i + 1]) { // \u5BFB\u627E\u7B2C\u4E00\u4E2A\u5C0F\u4E8E\u53F3\u90BB\u5C45\u7684\u6570
        i--;
    }
    if (i &gt;= 0) {                             // \u8FD9\u4E2A\u6570\u5728\u6570\u7EC4\u4E2D\u5B58\u5728\uFF0C\u4ECE\u5B83\u8EAB\u540E\u6311\u4E00\u4E2A\u6570\uFF0C\u548C\u5B83\u6362
        let j = nums.length - 1;                // \u4ECE\u6700\u540E\u4E00\u9879\uFF0C\u5411\u5DE6\u904D\u5386
        while (j &gt;= 0 &amp;&amp; nums[j] &lt;= nums[i]) {  // \u5BFB\u627E\u7B2C\u4E00\u4E2A\u5927\u4E8E nums[i] \u7684\u6570
            j--;
        }
        [nums[i], nums[j]] = [nums[j], nums[i]]; // \u4E24\u6570\u4EA4\u6362\uFF0C\u5B9E\u73B0\u53D8\u5927
    }
    // \u5982\u679C i = -1\uFF0C\u8BF4\u660E\u662F\u9012\u51CF\u6392\u5217\uFF0C\u5982 3 2 1\uFF0C\u6CA1\u6709\u4E0B\u4E00\u6392\u5217\uFF0C\u76F4\u63A5\u7FFB\u8F6C\u4E3A\u6700\u5C0F\u6392\u5217\uFF1A1 2 3
    let l = i + 1;           
    let r = nums.length - 1;
    while (l &lt; r) {                            // i \u53F3\u8FB9\u7684\u6570\u8FDB\u884C\u7FFB\u8F6C\uFF0C\u4F7F\u5F97\u53D8\u5927\u7684\u5E45\u5EA6\u5C0F\u4E00\u4E9B
        [nums[l], nums[r]] = [nums[r], nums[l]];
        l++;
        r--;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="_283-\u79FB\u52A8\u96F6" tabindex="-1"><a class="header-anchor" href="#_283-\u79FB\u52A8\u96F6" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/move-zeroes/" target="_blank" rel="noopener noreferrer">283. \u79FB\u52A8\u96F6</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var moveZeroes = function(nums) {
     nums.sort((a,b) =&gt; b? 1: -1) // b = 0 \uFF0C\u9006\u5E8F\u6392\u5217
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var moveZeroes = function (nums) {
    let i = 0;
    const zeroes = [];
    while (i &lt; nums.length) {
        if (nums[i] === 0) {
            let zero = nums.splice(i,1);
            zeroes.push(...zero);
            i--;
        }
        i++;
    }
    nums.push(...zeroes)
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="_394-\u5B57\u7B26\u4E32\u89E3\u7801-1" tabindex="-1"><a class="header-anchor" href="#_394-\u5B57\u7B26\u4E32\u89E3\u7801-1" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/decode-string/" target="_blank" rel="noopener noreferrer">394. \u5B57\u7B26\u4E32\u89E3\u7801</a></h2><blockquote><p>\u6709\u6548\u62EC\u53F7\u52A0\u5F3A\u7248</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const decodeString = (s) =&gt; {
    let numStack = [];        // \u5B58\u500D\u6570\u7684\u6808
    let strStack = [];        // \u5B58 \u5F85\u62FC\u63A5\u7684str \u7684\u6808
    let num = 0;              // \u500D\u6570\u7684\u201C\u642C\u8FD0\u5DE5\u201D
    let result = &#39;&#39;;          // \u5B57\u7B26\u4E32\u7684\u201C\u642C\u8FD0\u5DE5\u201D
    for (const char of s) {   // \u9010\u5B57\u7B26\u626B\u63CF
        if (!isNaN(char)) {   // \u9047\u5230\u6570\u5B57
            num = num * 10 + Number(char); // \u7B97\u51FA\u500D\u6570
        } else if (char == &#39;[&#39;) {  // \u9047\u5230 [
            strStack.push(result); // result\u4E32\u5165\u6808
            result = &#39;&#39;;           // \u5165\u6808\u540E\u6E05\u96F6
            numStack.push(num);    // \u500D\u6570num\u8FDB\u5165\u6808\u7B49\u5F85
            num = 0;               // \u5165\u6808\u540E\u6E05\u96F6
        } else if (char == &#39;]&#39;) {  // \u9047\u5230 ]\uFF0C\u4E24\u4E2A\u6808\u7684\u6808\u9876\u51FA\u6808
            let repeatTimes = numStack.pop(); // \u83B7\u53D6\u62F7\u8D1D\u6B21\u6570
            result = strStack.pop() + result.repeat(repeatTimes); // \u6784\u5EFA\u5B50\u4E32
        } else {                   
            result += char;        // \u9047\u5230\u5B57\u6BCD\uFF0C\u8FFD\u52A0\u7ED9result\u4E32
        }
    }
    return result;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="_171-excel-\u8868\u5217\u5E8F\u53F7" tabindex="-1"><a class="header-anchor" href="#_171-excel-\u8868\u5217\u5E8F\u53F7" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/excel-sheet-column-number/" target="_blank" rel="noopener noreferrer">171. Excel \u8868\u5217\u5E8F\u53F7</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var titleToNumber = function(columnTitle) {
    let number = 0;
    let multiple = 1;
    for (let i = columnTitle.length - 1; i &gt;= 0; i--) {
        const k = columnTitle[i].charCodeAt() - &#39;A&#39;.charCodeAt() + 1;
        number += k * multiple;
        multiple *= 26;
    }
    return number;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="_168-excel\u8868\u5217\u540D\u79F0" tabindex="-1"><a class="header-anchor" href="#_168-excel\u8868\u5217\u540D\u79F0" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/excel-sheet-column-title/" target="_blank" rel="noopener noreferrer">168. Excel\u8868\u5217\u540D\u79F0</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var convertToTitle = function(columnNumber) {
    let ans = [];
    while (columnNumber &gt; 0) {
        const a0 = (columnNumber - 1) % 26 + 1; // \u7B97\u4F4E\u4F4D
        ans.push(String.fromCharCode(a0 - 1 + &#39;A&#39;.charCodeAt()));
        columnNumber = Math.floor((columnNumber - a0) / 26); // \u7B97\u8FDB\u4F4D
    }
    return ans.reverse().join(&#39;&#39;);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="_349-\u4E24\u4E2A\u6570\u7EC4\u7684\u4EA4\u96C6" tabindex="-1"><a class="header-anchor" href="#_349-\u4E24\u4E2A\u6570\u7EC4\u7684\u4EA4\u96C6" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/intersection-of-two-arrays/" target="_blank" rel="noopener noreferrer">349. \u4E24\u4E2A\u6570\u7EC4\u7684\u4EA4\u96C6</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    const res = new Set();
    if (nums1.length &gt; nums2.length) {
        return intersection(nums2, nums1);
    }
    for (const val of nums1) {
        if (nums2.indexOf(val) !== -1) {
            res.add(val);
        }
    }
    return [...res];
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="_836-\u77E9\u5F62\u91CD\u53E0" tabindex="-1"><a class="header-anchor" href="#_836-\u77E9\u5F62\u91CD\u53E0" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/rectangle-overlap/" target="_blank" rel="noopener noreferrer">836. \u77E9\u5F62\u91CD\u53E0</a></h2><blockquote><p>\u8F6C\u6362\u4E3A\u6295\u5F71\u7684\u516C\u5171\u90E8\u5206</p></blockquote><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204041647072.png" alt="ds_183" style="zoom:50%;"><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var isRectangleOverlap = function(rec1, rec2) {
    const [x1, y1, x2, y2] = rec1;
    const [x3, y3, x4, y4] = rec2;
    return !(x1 &gt;= x4 || x3 &gt;= x2 || y3 &gt;= y2 || y1 &gt;= y4);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_67-\u4E8C\u8FDB\u5236\u6C42\u548C" tabindex="-1"><a class="header-anchor" href="#_67-\u4E8C\u8FDB\u5236\u6C42\u548C" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/add-binary/" target="_blank" rel="noopener noreferrer">67. \u4E8C\u8FDB\u5236\u6C42\u548C</a></h2><blockquote><p>\u6EA2\u51FA\u4E86</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var addBinary = function (a, b) {
    a = parseInt(a, 2);
    b = parseInt(b, 2);
    return (a + b).toString(2)
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><blockquote><p>\u9010\u4E2A\u8BA1\u7B97</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let ans = &quot;&quot;;
    let ca = 0;
    for(let i = a.length - 1, j = b.length - 1;i &gt;= 0 || j &gt;= 0; i--, j--) {
        let sum = ca;
        sum += i &gt;= 0 ? parseInt(a[i]) : 0;
        sum += j &gt;= 0 ? parseInt(b[j]) : 0;
        ans += sum % 2;
        ca = Math.floor(sum / 2);
    }
    ans += ca == 1 ? ca : &quot;&quot;;
    return ans.split(&#39;&#39;).reverse().join(&#39;&#39;);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="_2-\u4E24\u6570\u76F8\u52A0" tabindex="-1"><a class="header-anchor" href="#_2-\u4E24\u6570\u76F8\u52A0" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/add-two-numbers/" target="_blank" rel="noopener noreferrer">2. \u4E24\u6570\u76F8\u52A0</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let head = null, tail = null; // \u5934\u8282\u70B9\u548C\u8282\u70B9\u6307\u9488
    let carry = 0;
    while (l1 || l2) {
        const n1 = l1 ? l1.val : 0;
        const n2 = l2 ? l2.val : 0;
        const sum = n1 + n2 + carry;
        if (!head) {
            head = tail = new ListNode(sum % 10);
        } else {
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }
        carry = Math.floor(sum / 10);
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }
    if (carry &gt; 0) {
        tail.next = new ListNode(carry);
    }
    return head;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h2 id="_221-\u6700\u5927\u6B63\u65B9\u5F62" tabindex="-1"><a class="header-anchor" href="#_221-\u6700\u5927\u6B63\u65B9\u5F62" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/maximal-square/" target="_blank" rel="noopener noreferrer">221. \u6700\u5927\u6B63\u65B9\u5F62</a></h2><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204041724654.png" alt="fig1" style="zoom:50%;"><blockquote><p>\u5DE6\u3001\u4E0A\u3001\u5DE6\u4E0A</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  const row = matrix.length;
  const col = matrix[0].length;
  const dp = new Array(row).fill(0).map(() =&gt; new Array(col).fill(0));

  let maxLen = 0;

  for (let i = 0; i &lt; row; i++) {
    for (let j = 0; j &lt; col; j++) {
      if (matrix[i][j] === &quot;0&quot;) continue;
      dp[i][j] =
        Math.min(
          dp[i - 1]?.[j] || 0,
          dp[i][j - 1] || 0,
          dp[i - 1]?.[j - 1] || 0
        ) + 1;
      maxLen = Math.max(maxLen, dp[i][j]);
    }
  }

  return maxLen * maxLen;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div>`,151);function r(l,p){return a}var u=n(e,[["render",r],["__file","byteDance.html.vue"]]);export{u as default};
