import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.28325d67.js";const e={},a=s(`<h1 id="leetcode-\u4F01\u4E1A\u9898\u5E93" tabindex="-1"><a class="header-anchor" href="#leetcode-\u4F01\u4E1A\u9898\u5E93" aria-hidden="true">#</a> Leetcode \u4F01\u4E1A\u9898\u5E93</h1><h4 id="_13-\u7F57\u9A6C\u6570\u5B57\u8F6C\u6574\u6570" tabindex="-1"><a class="header-anchor" href="#_13-\u7F57\u9A6C\u6570\u5B57\u8F6C\u6574\u6570" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/roman-to-integer/" target="_blank" rel="noopener noreferrer">13. \u7F57\u9A6C\u6570\u5B57\u8F6C\u6574\u6570</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var romanToInt = function (s) {
    const symbolValues = new Map([
        [&#39;I&#39;, 1],
        [&#39;V&#39;, 5],
        [&#39;X&#39;, 10],
        [&#39;L&#39;, 50],
        [&#39;C&#39;, 100],
        [&#39;D&#39;, 500],
        [&#39;M&#39;, 1000],
    ]);
    // \u4EA6\u53EF\u4F7F\u7528\u5BF9\u8C61
    let ans = 0;
    const n = s.length;
    for (let i = 0; i &lt; n; ++i) {
        const value = symbolValues.get(s[i]);
        if (i &lt; n - 1 &amp;&amp; value &lt; symbolValues.get(s[i + 1])) {
            ans -= value;
        } else {
            ans += value;
        }
    }
    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h4 id="_21-\u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#_21-\u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u94FE\u8868" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/merge-two-sorted-lists/" target="_blank" rel="noopener noreferrer">21. \u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u94FE\u8868</a></h4><blockquote><p>\u53CC\u6307\u9488\u8FED\u4EE3\u5427</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var mergeTwoLists = function(l1, l2) {
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="_118-\u6768\u8F89\u4E09\u89D2" tabindex="-1"><a class="header-anchor" href="#_118-\u6768\u8F89\u4E09\u89D2" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/pascals-triangle/" target="_blank" rel="noopener noreferrer">118. \u6768\u8F89\u4E09\u89D2</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var generate = function(numRows) {
    const ret = []; // \u4E09\u89D2

    for (let i = 0; i &lt; numRows; i++) {
        const row = new Array(i + 1).fill(1); // \u81EA\u52A8\u751F\u6210\u884C\u6570
        for (let j = 1; j &lt; row.length - 1; j++) {
            row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
        }
        ret.push(row);
    }
    return ret;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="_171-excel-\u8868\u5217\u5E8F\u53F7" tabindex="-1"><a class="header-anchor" href="#_171-excel-\u8868\u5217\u5E8F\u53F7" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/excel-sheet-column-number/" target="_blank" rel="noopener noreferrer">171. Excel \u8868\u5217\u5E8F\u53F7</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var titleToNumber = function (columnTitle) {
    let res = 0;
    for (let i = 0; i &lt; columnTitle.length; i++) {
        let num = columnTitle.charCodeAt(i) - &#39;A&#39;.charCodeAt(0) + 1;
        res += num * (26 ** (columnTitle.length - i - 1))
    }
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="_202-\u5FEB\u4E50\u6570" tabindex="-1"><a class="header-anchor" href="#_202-\u5FEB\u4E50\u6570" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/happy-number/" target="_blank" rel="noopener noreferrer">202. \u5FEB\u4E50\u6570</a></h4><blockquote><p>\u53EF\u80FD\u51FA\u73B0\u65E0\u9650\u5FAA\u73AF\u7684\u60C5\u51B5</p><p>\u9996\u5148\u5206\u6790\u4E00\u4E0B\u65E0\u9650\u5FAA\u73AF\u662F\u4EC0\u4E48\u60C5\u51B5\uFF0C\u521A\u597D\u5237\u8FC7\u4E86\u5FAA\u73AF\u94FE\u8868\u7684\u9898\uFF0C\u5F88\u7B80\u5355\u5C31\u53EF\u4EE5\u7406\u89E3\u65E0\u9650\u5FAA\u73AF\u80AF\u5B9A\u662F\u90E8\u5206\u60C5\u51B5\u4E00\u76F4\u8F6C\u5708\uFF0C\u7C7B\u4F3C 2 4 16 37 58 89 145 42 20 =&gt; 4 16 ... \u6240\u6709\u89E3\u6CD5\u5B8C\u5168\u53EF\u4EE5\u642C\u8FD0\u5FAA\u73AF\u94FE\u8868\u95EE\u9898</p><p>hash \u5B58\u50A8\u51FA\u73B0\u8FC7\u7684\u6570\u5B57\uFF0C\u5982\u679C\u6709\u91CD\u590D\u7684\u5C31\u8BC1\u660E\u6B7B\u5FAA\u73AF\u4E86 \u5FEB\u6162\u6307\u9488\uFF0C\u5982\u679C\u4E00\u4E2A\u6307\u9488\u6B65\u957F\u4E3A 1\uFF0C\u53E6\u4E00\u4E2A\u6B65\u957F\u4E3A 2\uFF0C\u5728\u4E00\u4E2A\u5708\u5B50\u91CC\u8F6C\uFF0C\u90A3\u4E48\u4E24\u4E2A\u6307\u9488\u65E9\u665A\u4F1A\u9047\u5230\uFF0C\u5982\u679C\u4E0D\u5728\u4E00\u4E2A\u5708\u5B50\u91CC\uFF0C\u80AF\u5B9A\u4E0D\u4F1A\u9047\u5230</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var isHappy = function (n) {
    const set = new Set();
    while (n !== 1) {
        if (set.has(n)) return false
        set.add(n)
        n = n.toString().split(&#39;&#39;).reduce((l, i) =&gt; l + i * i, 0)
    }
    return true
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><blockquote><p>\u5FEB\u6162\u6307\u9488</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>let getNext = function (n) {
    return n.toString().split(&#39;&#39;).map(i =&gt; i ** 2).reduce((a, b) =&gt; a + b);
}
let isHappy = function (n) {
    let slow = n;
    let fast = getNext(n);
    while(fast !== 1 &amp;&amp; fast !== slow){
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    return fast === 1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="_237-\u5220\u9664\u94FE\u8868\u4E2D\u7684\u8282\u70B9" tabindex="-1"><a class="header-anchor" href="#_237-\u5220\u9664\u94FE\u8868\u4E2D\u7684\u8282\u70B9" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/delete-node-in-a-linked-list/" target="_blank" rel="noopener noreferrer">237. \u5220\u9664\u94FE\u8868\u4E2D\u7684\u8282\u70B9</a></h4><blockquote><p>\u548C\u513F\u5B50\u4EA4\u6362\uFF0C\u7136\u540E\u6740\u4E86\uFF08\u6CA1\u5F97\u6307\u5411\u4E86\uFF09</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="_326-3-\u7684\u5E42" tabindex="-1"><a class="header-anchor" href="#_326-3-\u7684\u5E42" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/power-of-three/" target="_blank" rel="noopener noreferrer">326. 3 \u7684\u5E42</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
    while (n !== 0 &amp;&amp; n % 3 === 0) {
        n = n / 3;
    }
    return n === 1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="_268-\u4E22\u5931\u7684\u6570\u5B57" tabindex="-1"><a class="header-anchor" href="#_268-\u4E22\u5931\u7684\u6570\u5B57" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/missing-number/" target="_blank" rel="noopener noreferrer">268. \u4E22\u5931\u7684\u6570\u5B57</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    nums.sort((a, b) =&gt; a - b);
    let res = nums[0] ? 0 : nums[nums.length - 1] + 1;
    nums.forEach((val, index) =&gt; {
        if (index &lt; nums.length - 1 &amp;&amp; (++val) !== nums[index + 1]) {
            res = val;
        }
    })
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="_412-fizz-buzz" tabindex="-1"><a class="header-anchor" href="#_412-fizz-buzz" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/fizz-buzz/" target="_blank" rel="noopener noreferrer">412. Fizz Buzz</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
    const res = [];
    for (let i = 1; i &lt;= n; i++) {
        if (i % 3 === 0 &amp;&amp; i % 5 === 0) {
            res.push(&#39;FizzBuzz&#39;);
        } else if (i % 3 === 0) {
            res.push(&#39;Fizz&#39;)
        } else if (i % 5 === 0) {
            res.push(&#39;Buzz&#39;)
        } else {
            res.push(i.toString())
        }
    }
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="_278-\u7B2C\u4E00\u4E2A\u9519\u8BEF\u7684\u7248\u672C" tabindex="-1"><a class="header-anchor" href="#_278-\u7B2C\u4E00\u4E2A\u9519\u8BEF\u7684\u7248\u672C" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/first-bad-version/" target="_blank" rel="noopener noreferrer">278. \u7B2C\u4E00\u4E2A\u9519\u8BEF\u7684\u7248\u672C</a></h4><blockquote><p>\u4E8C\u5206\u67E5\u627E</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    return function(n) {
        let left = 1, right = n;
        while (left &lt; right) { // \u5FAA\u73AF\u76F4\u81F3\u533A\u95F4\u5DE6\u53F3\u7AEF\u70B9\u76F8\u540C
            const mid = Math.floor( right + left / 2); // \u9632\u6B62\u8BA1\u7B97\u65F6\u6EA2\u51FA
            if (isBadVersion(mid)) {
                right = mid; // \u7B54\u6848\u5728\u533A\u95F4 [left, mid] \u4E2D\u4E4B\u540E\u7684\u4E3A\u9519\u8BEF\u7248\u672C
            } else {
                left = mid + 1; // \u7B54\u6848\u5728\u533A\u95F4 [mid+1, right] \u4E2D
            }
        }
        // \u6B64\u65F6\u6709 left == right\uFF0C\u533A\u95F4\u7F29\u4E3A\u4E00\u4E2A\u70B9\uFF0C\u5373\u4E3A\u7B54\u6848
        return left;
    };
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h4 id="\u5251\u6307-offer-24-\u53CD\u8F6C\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-24-\u53CD\u8F6C\u94FE\u8868" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 24. \u53CD\u8F6C\u94FE\u8868</a></h4><blockquote><p>\u6682\u5B58\u4E0B\u4E00\u8282\u70B9\uFF0C\u524D\u9A71\u8282\u70B9\u548C\u5F53\u524D\u8282\u70B9</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next; // \u4E0B\u79FB
    }
    return prev;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="\u5251\u6307-offer-30-\u5305\u542Bmin\u51FD\u6570\u7684\u6808" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-30-\u5305\u542Bmin\u51FD\u6570\u7684\u6808" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 30. \u5305\u542Bmin\u51FD\u6570\u7684\u6808</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var MinStack = function() {
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

MinStack.prototype.min = function() {
    return this.min_stack[this.min_stack.length - 1];
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h4 id="_434-\u5B57\u7B26\u4E32\u4E2D\u7684\u5355\u8BCD\u6570" tabindex="-1"><a class="header-anchor" href="#_434-\u5B57\u7B26\u4E32\u4E2D\u7684\u5355\u8BCD\u6570" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/number-of-segments-in-a-string/" target="_blank" rel="noopener noreferrer">434. \u5B57\u7B26\u4E32\u4E2D\u7684\u5355\u8BCD\u6570</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var countSegments = function(s) {
    let segmentCount = 0;

    for (let i = 0; i &lt; s.length; i++) {
        if ((i === 0 || s[i - 1] === &#39; &#39;) &amp;&amp; s[i] !== &#39; &#39;) { // \u786E\u5B9A\u4E3A\u6BCF\u4E2A\u5355\u8BCD\u7684\u5F00\u59CB\u4E14\u4E0D\u4E3A\u7A7A
            segmentCount++;
        }
    }

    return segmentCount;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="_575-\u5206\u7CD6\u679C" tabindex="-1"><a class="header-anchor" href="#_575-\u5206\u7CD6\u679C" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/distribute-candies/" target="_blank" rel="noopener noreferrer">575. \u5206\u7CD6\u679C</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
    const type = {count: 0};
    candyType.forEach(val =&gt; {
        if (!type[val]) {
            type[val] = true;
            type.count++;
        }
    })
    return type.count &lt; candyType.length / 2 ? type.count : candyType.length / 2;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="_27-\u79FB\u9664\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#_27-\u79FB\u9664\u5143\u7D20" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/remove-element/" target="_blank" rel="noopener noreferrer">27. \u79FB\u9664\u5143\u7D20</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let left = 0, right = nums.length;
    while (left &lt; right) {
        if (nums[left] === val) {
            nums[left] = nums[right - 1];
            right--;
        } else {
            left++;
        }
    }
    return left;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="_594-\u6700\u957F\u548C\u8C10\u5B50\u5E8F\u5217" tabindex="-1"><a class="header-anchor" href="#_594-\u6700\u957F\u548C\u8C10\u5B50\u5E8F\u5217" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/longest-harmonious-subsequence/" target="_blank" rel="noopener noreferrer">594. \u6700\u957F\u548C\u8C10\u5B50\u5E8F\u5217</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function(nums) {
    const cnt = new Map();
    let res = 0;
    for (const num of nums) {
        cnt.set(num, (cnt.get(num) || 0) + 1);
    }
    for (const key of cnt.keys()) {
        if (cnt.has(key + 1)) {
            res = Math.max(res, cnt.get(key) + cnt.get(key + 1));
        }
    }
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="_605-\u79CD\u82B1\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#_605-\u79CD\u82B1\u95EE\u9898" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/can-place-flowers/" target="_blank" rel="noopener noreferrer">605. \u79CD\u82B1\u95EE\u9898</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
    let count = 0
    for (let i = 0, length = flowerbed.length; i &lt; length; i++) {
      //\u5F53\u524D\u4F4D\u7F6E\u662F0\uFF0C\u5E76\u4E14\u524D\u540E\u90FD\u4E0D\u662F1\uFF0C\u8003\u8651\u5728\u6700\u524D\u548C\u6700\u540E\u7684\u7279\u6B8A\u60C5\u51B5
        if (flowerbed[i] === 0 &amp;&amp; flowerbed[i - 1] !== 1 &amp;&amp; flowerbed[i + 1] !== 1) {
            count++
            i++
        }
    }
    return count &gt;= n
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h4 id="_235-\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148" tabindex="-1"><a class="header-anchor" href="#_235-\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" target="_blank" rel="noopener noreferrer">235. \u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148</a></h4><ul><li>\u4E8C\u53C9\u641C\u7D22\u6811\u6027\u8D28\u51B3\u5B9A\u4E86\uFF1A\u5982\u679C p.val \u548C q.val \u90FD\u6BD4 root.val \u5C0F\uFF0C\u5219p\u3001q\u80AF\u5B9A\u5728 root \u7684\u5DE6\u5B50\u6811\u3002</li><li>\u90A3\u95EE\u9898\u89C4\u6A21\u5C31\u53D8\u5C0F\u4E86\uFF0C\u9012\u5F52\u5DE6\u5B50\u6811\u5C31\u884C\uFF01</li><li>\u5982\u679C p.val \u548C q.val \u90FD\u6BD4 root.val \u5927\uFF0C\u9012\u5F52\u53F3\u5B50\u6811\u5C31\u884C\uFF01</li><li>\u5176\u4ED6\u60C5\u51B5\uFF0Croot \u5373\u4E3A\u6240\u6C42\uFF01</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const lowestCommonAncestor = (root, p, q) =&gt; {
    if (p.val &lt; root.val &amp;&amp; q.val &lt; root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    if (p.val &gt; root.val &amp;&amp; q.val &gt; root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    return root;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_258-\u5404\u4F4D\u76F8\u52A0" tabindex="-1"><a class="header-anchor" href="#_258-\u5404\u4F4D\u76F8\u52A0" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/add-digits/" target="_blank" rel="noopener noreferrer">258. \u5404\u4F4D\u76F8\u52A0</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var addDigits = function (num) {
    const nums = num.toString().split(&#39;&#39;);
    if (nums.length === 1) return parseInt(nums.join(&#39;&#39;));
    num = nums.reduce((a, b) =&gt; {
        return a + parseInt(b)
    }, 0)
    return addDigits(num);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="_405-\u6570\u5B57\u8F6C\u6362\u4E3A\u5341\u516D\u8FDB\u5236\u6570" tabindex="-1"><a class="header-anchor" href="#_405-\u6570\u5B57\u8F6C\u6362\u4E3A\u5341\u516D\u8FDB\u5236\u6570" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/convert-a-number-to-hexadecimal/" target="_blank" rel="noopener noreferrer">405. \u6570\u5B57\u8F6C\u6362\u4E3A\u5341\u516D\u8FDB\u5236\u6570</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} num
 * @return {string}
 */
var toHex = function (num) {
    if (num &gt;= 0) return num.toString(16)
    let fill = 2**32;
    return (fill+num).toString(16)
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_997-\u627E\u5230\u5C0F\u9547\u7684\u6CD5\u5B98" tabindex="-1"><a class="header-anchor" href="#_997-\u627E\u5230\u5C0F\u9547\u7684\u6CD5\u5B98" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/find-the-town-judge/" target="_blank" rel="noopener noreferrer">997. \u627E\u5230\u5C0F\u9547\u7684\u6CD5\u5B98</a></h4><p>\u8BA1\u7B97\u51FA\u5EA6\uFF0C\u5165\u5EA6\uFF0C\u6CD5\u5B98\u5165\u5EA6n-1\uFF0C\u51FA\u5EA60</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var findJudge = function(n, trust) {
    const inDegrees = new Array(n + 1).fill(0);
    const outDegrees = new Array(n + 1).fill(0);
    for (const edge of trust) {
        const x = edge[0], y = edge[1];
        ++inDegrees[y];
        ++outDegrees[x];
    }
    for (let i = 1; i &lt;= n; ++i) {
        if (inDegrees[i] === n - 1 &amp;&amp; outDegrees[i] === 0) {
            return i;
        }
    }
    return -1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="_566-\u91CD\u5851\u77E9\u9635" tabindex="-1"><a class="header-anchor" href="#_566-\u91CD\u5851\u77E9\u9635" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/reshape-the-matrix/" target="_blank" rel="noopener noreferrer">566. \u91CD\u5851\u77E9\u9635</a></h4><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204141447850.png" alt="image-20220414144744678"></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[][]} mat
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function(nums, r, c) {
    const m = nums.length;
    const n = nums[0].length;
    if (m * n != r * c) {
        return nums;
    }

    const ans = new Array(r).fill(0).map(() =&gt; new Array(c).fill(0));
    for (let x = 0; x &lt; m * n; ++x) {
        ans[Math.floor(x / c)][x % c] = nums[Math.floor(x / n)][x % n]; // \u65B0\u65E7\u6620\u5C04\u5173\u7CFB
    }
    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>\u65B9\u6CD5\u4E00\uFF1A\u6A21\u62DF</strong></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var luckyNumbers  = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const ret = [];
    for (let i = 0; i &lt; m; i++) {
        for (let j = 0; j &lt; n; j++) {
            let isMin = true, isMax = true;
            for (let k = 0; k &lt; n; k++) {
                if (matrix[i][k] &lt; matrix[i][j]) {
                    isMin = false;
                    break;
                }
            }
            if (!isMin) {
                continue;
            }
            for (let k = 0; k &lt; m; k++) {
                if (matrix[k][j] &gt; matrix[i][j]) {
                    isMax = false;
                    break;
                }
            }
            if (isMax) {
                ret.push(matrix[i][j]);
            }
        }
    }
    return ret;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p><strong>\u65B9\u6CD5\u4E8C\uFF1A\u9884\u5904\u7406 + \u6A21\u62DF</strong></p><p>\u601D\u8DEF\u4E0E\u7B97\u6CD5</p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204141617622.png" alt="image-20220414161719559"></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var luckyNumbers  = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const minRow = new Array(m).fill(Number.MAX_SAFE_INTEGER);
    const maxCol = new Array(n).fill(0);
    for (let i = 0; i &lt; m; i++) {
        for (let j = 0; j &lt; n; j++) {
            minRow[i] = Math.min(minRow[i], matrix[i][j]);
            maxCol[j] = Math.max(maxCol[j], matrix[i][j]);
        }
    }
    const ret = [];
    for (let i = 0; i &lt; m; i++) {
        for (let j = 0; j &lt; n; j++) {
            if (matrix[i][j] === minRow[i] &amp;&amp; matrix[i][j] === maxCol[j]) {
                ret.push(matrix[i][j]);
            }
        }
    }
    return ret;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="_50-pow-x-n" tabindex="-1"><a class="header-anchor" href="#_50-pow-x-n" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/powx-n/" target="_blank" rel="noopener noreferrer">50. Pow(x, n)</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    return x**n;
};

var myPow = function (x, n) {
    if (n === 0) return 1 // n=0\u76F4\u63A5\u8FD4\u56DE1
    if (n &lt; 0) {   				//n&lt;0\u65F6 x\u7684n\u6B21\u65B9\u7B49\u4E8E1\u9664\u4EE5x\u7684-n\u6B21\u65B9\u5206
        return 1 / myPow(x, -n)
    }
    if (n % 2) {    //n\u662F\u5947\u6570\u65F6 x\u7684n\u6B21\u65B9 = x*x\u7684n-1\u6B21\u65B9
        return x * myPow(x, n - 1)
    }
    return myPow(x * x, n / 2) //n\u662F\u5076\u6570\uFF0C\u4F7F\u7528\u5206\u6CBB\uFF0C\u4E00\u5206\u4E3A\u4E8C\uFF0C\u7B49\u4E8Ex*x\u7684n/2\u6B21\u65B9 
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="_11-\u76DB\u6700\u591A\u6C34\u7684\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#_11-\u76DB\u6700\u591A\u6C34\u7684\u5BB9\u5668" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/container-with-most-water/" target="_blank" rel="noopener noreferrer">11. \u76DB\u6700\u591A\u6C34\u7684\u5BB9\u5668</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0, right = height.length - 1, max = 0;
    while(left &lt; right) {
        // \u5148 \u5E95\u4E58\u9AD8 \uFF0C\u5E95\u662F\u4E24\u6307\u9488\u8DDD\u79BB\uFF0C\u9AD8\u662F\u4E24\u6307\u9488\u6307\u5411\u7684\u6570\u503C\u5C0F\u7684\u90A3\u4E2A\uFF0C\u4E0D\u7136\u4F1A\u6C34\u6EA2\u51FA
        max = Math.max(max, (right - left) * Math.min(height[left], height[right]));
        // \u5982\u679C\u5DE6\u6307\u9488\u6307\u5411\u7684\u9AD8\u5EA6\uFF0C\u5C0F\u4E8E\u7B49\u4E8E \u53F3\u6307\u9488\uFF0C\u90A3\u5C31\u8BE5\u5B83\u79FB
        if(height[left] &lt;= height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return max;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,65);function r(l,p){return a}var c=n(e,[["render",r],["__file","Leetcode.html.vue"]]);export{c as default};
