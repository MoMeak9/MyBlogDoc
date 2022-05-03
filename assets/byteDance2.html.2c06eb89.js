import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.3dedad24.js";const a={},e=s(`<h1 id="\u5B57\u8282\u8DF3\u52A8codetop-\u4E8C" tabindex="-1"><a class="header-anchor" href="#\u5B57\u8282\u8DF3\u52A8codetop-\u4E8C" aria-hidden="true">#</a> \u5B57\u8282\u8DF3\u52A8CodeTop\uFF08\u4E8C\uFF09</h1><h2 id="_700-\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7684\u641C\u7D22" tabindex="-1"><a class="header-anchor" href="#_700-\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7684\u641C\u7D22" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/search-in-a-binary-search-tree/" target="_blank" rel="noopener noreferrer">700. \u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7684\u641C\u7D22</a></h2><blockquote><p>\u9012\u5F52</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var searchBST = function(root, val) {
    if (!root) {
        return null;
    }
    if (val === root.val) {
        return root;
    }
    return searchBST(val &lt; root.val ? root.left : root.right, val);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><blockquote><p>\u8FED\u4EE3</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var searchBST = function(root, val) {
    while (root) {
        if (val === root.val) {
            return root;
        }
        root = val &lt; root.val ? root.left : root.right;
    }
    return null;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="\u5251\u6307-offer-54-\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u7B2Ck\u5927\u8282\u70B9" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-54-\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u7B2Ck\u5927\u8282\u70B9" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 54. \u4E8C\u53C9\u641C\u7D22\u6811\u7684\u7B2Ck\u5927\u8282\u70B9</a></h2><blockquote><p><strong>\u4E8C\u53C9\u641C\u7D22\u6811\u7684 \u4E2D\u5E8F\u904D\u5386\u5012\u5E8F \u4E3A \u9012\u51CF\u5E8F\u5217 \u3002</strong></p><p>\u56E0\u6B64\uFF0C\u6C42 \u201C\u4E8C\u53C9\u641C\u7D22\u6811\u7B2C kk \u5927\u7684\u8282\u70B9\u201D \u53EF\u8F6C\u5316\u4E3A\u6C42 \u201C\u6B64\u6811\u7684\u4E2D\u5E8F\u904D\u5386\u5012\u5E8F\u7684\u7B2C k \u4E2A\u8282\u70B9\u201D\u3002or \u6B63\u5E8F\u5012\u6570\u7B2C\u4E09\u4E2A\u3002</p></blockquote><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204042015665.png" alt="Picture1.png" style="zoom:33%;"><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var kthLargest = function (root, k) {
    const res = [];
    const inOrder = (root) =&gt; {
        if (!root) return;
        inOrder(root.left);
        res.push(root.val)
        inOrder(root.right);
    }
    inOrder(root);
    return res[res.length - k]
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="_342-4\u7684\u5E42" tabindex="-1"><a class="header-anchor" href="#_342-4\u7684\u5E42" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/power-of-four/" target="_blank" rel="noopener noreferrer">342. 4\u7684\u5E42</a></h2><blockquote><p>\u5FAA\u73AF</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var isPowerOfFour = function(n) {
    if(n&lt;=0)return false
    if(n==1)return true
    let i=1
    while(i&lt;n){
        let temp = i*4
        if(temp==n){
            return true
        }else if(temp&gt;n){
            return false
        }
        i=temp
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><blockquote><p>\u8F6C\u6362\u4E3A2\u7684\u5E42</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var isPowerOfFour = function (n) {
    if (n &lt;= 0) return false
    if (n === 1) return true
    n = n ** 0.5;
    if (n % 1 !== 0) return false;
    return (n &amp; n - 1) === 0;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_507-\u5B8C\u7F8E\u6570" tabindex="-1"><a class="header-anchor" href="#_507-\u5B8C\u7F8E\u6570" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/perfect-number/" target="_blank" rel="noopener noreferrer">507. \u5B8C\u7F8E\u6570</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var checkPerfectNumber = function(num) {
    if (num === 1) {
        return false;
    }

    let sum = 1;
    for (let d = 2; d * d &lt;= num; ++d) {
        if (num % d === 0) {
            sum += d; // \u56E0\u65701\u53EF\u4EE5\u88AB\u9664
            if (d * d &lt; num) {
                sum += Math.floor(num / d); // \u5BF9\u5E94\u7684\u56E0\u65702\u5B58\u5728\u4E14\uFF0C\u5219\u52A0\u4E0A
            }
        }
    }
    return sum === num;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="\u5251\u6307-offer-21-\u8C03\u6574\u6570\u7EC4\u987A\u5E8F\u4F7F\u5947\u6570\u4F4D\u4E8E\u5076\u6570\u524D\u9762" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-21-\u8C03\u6574\u6570\u7EC4\u987A\u5E8F\u4F7F\u5947\u6570\u4F4D\u4E8E\u5076\u6570\u524D\u9762" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 21. \u8C03\u6574\u6570\u7EC4\u987A\u5E8F\u4F7F\u5947\u6570\u4F4D\u4E8E\u5076\u6570\u524D\u9762</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
	return nums.sort((a,b)=&gt;b%2-a%2); // \u5947\u6570\u524D\uFF0C\u5076\u6570\u540E
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var exchange = function (nums) {
    const even = [];
    const res = [];
    nums.forEach((val) =&gt; {
        if (val % 2 === 0) {
            even.push(val);
        } else {
            res.push(val);
        }
    })
    return res.concat(even);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_122-\u4E70\u5356\u80A1\u7968\u7684\u6700\u4F73\u65F6\u673A-ii" tabindex="-1"><a class="header-anchor" href="#_122-\u4E70\u5356\u80A1\u7968\u7684\u6700\u4F73\u65F6\u673A-ii" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/" target="_blank" rel="noopener noreferrer">122. \u4E70\u5356\u80A1\u7968\u7684\u6700\u4F73\u65F6\u673A II</a></h2><blockquote><p>\u8D2A\u5FC3\u5927\u6CD5\u597D</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let ans = 0;
    let n = prices.length;
    for (let i = 1; i &lt; n; ++i) {
        ans += Math.max(0, prices[i] - prices[i - 1]);
    }
    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_252-\u4F1A\u8BAE\u5BA4" tabindex="-1"><a class="header-anchor" href="#_252-\u4F1A\u8BAE\u5BA4" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/meeting-rooms/" target="_blank" rel="noopener noreferrer">252. \u4F1A\u8BAE\u5BA4</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function (intervals) {
  // \u5C06\u4F20\u5165\u7684\u6570\u7EC4\u6309\u7167 \u7B2C\u4E00\u4E2A\u6570\u5B57\u5347\u5E8F\u6392\u5217
  intervals.sort((a, b) =&gt; {
    return a[0] - b[0];
  })

  for (let i = 0; i &lt; intervals.length - 1; i++) {
    if (intervals[i][1] &gt; intervals[i + 1][0]) {
      return false
    }
  }
  return true
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="_704-\u4E8C\u5206\u67E5\u627E" tabindex="-1"><a class="header-anchor" href="#_704-\u4E8C\u5206\u67E5\u627E" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/binary-search/" target="_blank" rel="noopener noreferrer">704. \u4E8C\u5206\u67E5\u627E</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low &lt;= high) {
        const mid = Math.floor((high + low) / 2);
        const num = nums[mid];
        if (num === target) {
            return mid;
        } else if (num &gt; target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="_9-\u56DE\u6587\u6570" tabindex="-1"><a class="header-anchor" href="#_9-\u56DE\u6587\u6570" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/palindrome-number/" target="_blank" rel="noopener noreferrer">9. \u56DE\u6587\u6570</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var isPalindrome = function (x) {
    if (x &lt; 0) return false;
    const str = x.toString()
    return str === str.split(&#39;&#39;).reverse().join(&#39;&#39;);
};
// \u89E3\u6CD5\u4E00\uFF1A\u7FFB\u8F6C\u5B57\u7B26\u4E32\u6CD5
var isPalindrome = function(x) {
    return x.toString() === x.toString().split(&#39;&#39;).reverse().join(&#39;&#39;);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} x
 * @return {boolean}
 */
// \u89E3\u6CD5\u4E8C\uFF1A\u53CC\u6307\u9488\u904D\u5386\u6BD4\u8F83\u6CD5
var isPalindrome = function(x) {
    let temp = x.toString()
    const n = Math.floor(temp.length / 2)
    for(let i = 0; i &lt; n; i++){
        if(temp[i] != temp[temp.length-i-1]) return false
    }
    return true
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="_234-\u56DE\u6587\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#_234-\u56DE\u6587\u94FE\u8868" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/palindrome-linked-list/" target="_blank" rel="noopener noreferrer">234. \u56DE\u6587\u94FE\u8868</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var isPalindrome = function(head) {
    const vals = [];
    while (head !== null) {
        vals.push(head.val);
        head = head.next;
    }
    for (let i = 0, j = vals.length - 1; i &lt; j; ++i, --j) {
        if (vals[i] !== vals[j]) {
            return false;
        }
    }
    return true;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="_125-\u9A8C\u8BC1\u56DE\u6587\u4E32" tabindex="-1"><a class="header-anchor" href="#_125-\u9A8C\u8BC1\u56DE\u6587\u4E32" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/valid-palindrome/" target="_blank" rel="noopener noreferrer">125. \u9A8C\u8BC1\u56DE\u6587\u4E32</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let valid = s.toLowerCase().match(/[a-z0-9]+/g);// valid\u4E3A\u8FDB\u884C\u6B63\u5219\u5339\u914D\u540E\u7B5B\u9009\u51FA\u6765\u7684\u6570\u7EC4
    if(!valid){
        return true;
    }
    let str = valid.join(&quot;&quot;);// \u6570\u636E\u9884\u5904\u7406(\u6B63\u5219\u5339\u914D)\u540E\u5F97\u5230\u7684\u5B57\u7B26\u4E32
    let comp = str.split(&quot;&quot;).reverse().join(&quot;&quot;);// \u5C06\u5B57\u7B26\u4E32\u6BCF\u4E2A\u5B57\u6BCD\u9010\u4E2A\u7FFB\u8F6C
    return comp === str;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="_717-1-\u6BD4\u7279\u4E0E-2-\u6BD4\u7279\u5B57\u7B26" tabindex="-1"><a class="header-anchor" href="#_717-1-\u6BD4\u7279\u4E0E-2-\u6BD4\u7279\u5B57\u7B26" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/1-bit-and-2-bit-characters/" target="_blank" rel="noopener noreferrer">717. 1 \u6BD4\u7279\u4E0E 2 \u6BD4\u7279\u5B57\u7B26</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var isOneBitCharacter = function(bits) {
    let i = 0, n = bits.length;
    while (i &lt; n - 1) {
        i += bits[i] + 1; // \u7B2C\u4E00\u79CD\u5B57\u7B26\u4E00\u5B9A\u4EE5 00 \u5F00\u5934\uFF0C\u7B2C\u4E8C\u79CD\u5B57\u7B26\u4E00\u5B9A\u4EE5 11 \u5F00\u5934\u3002
    }
    return i === n - 1; // \u5B8C\u6574\u904D\u5386\u5E94\u8BE5\u5B58\u5728
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="\u5251\u6307-offer-39-\u6570\u7EC4\u4E2D\u51FA\u73B0\u6B21\u6570\u8D85\u8FC7\u4E00\u534A\u7684\u6570\u5B57" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-39-\u6570\u7EC4\u4E2D\u51FA\u73B0\u6B21\u6570\u8D85\u8FC7\u4E00\u534A\u7684\u6570\u5B57" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 39. \u6570\u7EC4\u4E2D\u51FA\u73B0\u6B21\u6570\u8D85\u8FC7\u4E00\u534A\u7684\u6570\u5B57</a></h2><blockquote><p>\u8D85\u8FC7\u4E00\u534A\u7684\u6570\u4E00\u5B9A\u662F\u4E2D\u95F4\u6570</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    return nums.sort()[~~(nums.length / 2)];
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_1356-\u6839\u636E\u6570\u5B57\u4E8C\u8FDB\u5236\u4E0B-1-\u7684\u6570\u76EE\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#_1356-\u6839\u636E\u6570\u5B57\u4E8C\u8FDB\u5236\u4E0B-1-\u7684\u6570\u76EE\u6392\u5E8F" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/sort-integers-by-the-number-of-1-bits/" target="_blank" rel="noopener noreferrer">1356. \u6839\u636E\u6570\u5B57\u4E8C\u8FDB\u5236\u4E0B 1 \u7684\u6570\u76EE\u6392\u5E8F</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} arr
 * @return {number[]}
 */
function sortByBits(arr) {
  function countBits(n) {
    let count = 0;
    while (n != 0) {  // \u8F6C\u4E8C\u8FDB\u5236\u7684\u64CD\u4F5C
      count += n &amp; 1; // \u662F1\u5C31+1\uFF0C\u662F0\u5C31+0 (\u5224\u5B9A\u4E8C\u8FDB\u5236\u4F4D\u6700\u540E\u662F\u5426\u662F\u4E00\uFF08\u5224\u5B9A\u5947\u6570\uFF09)
      n &gt;&gt;= 1;	      // \u5373\uFF0C\u9664\u4EE52
    }
    return count;
  }
  return arr.sort((a, b) =&gt; { // \u5982\u679C\u6709\u5DEE\uFF0C\u5219\u6309bits\u6570\u6392\uFF0C\u5982\u679C\u65E0\u5DEE\uFF0C\u5219\u6309\u539F\u503C\u6392
    return countBits(a) - countBits(b) || a - b;
  });
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="_111-\u4E8C\u53C9\u6811\u7684\u6700\u5C0F\u6DF1\u5EA6" tabindex="-1"><a class="header-anchor" href="#_111-\u4E8C\u53C9\u6811\u7684\u6700\u5C0F\u6DF1\u5EA6" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/" target="_blank" rel="noopener noreferrer">111. \u4E8C\u53C9\u6811\u7684\u6700\u5C0F\u6DF1\u5EA6</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {TreeNode} root
 * @return {number}
 */
const minDepth = function(root) {
    if(root == null) {
        return 0;
    }
    if(root.left == null &amp;&amp; root.right == null) {
        return 1;
    }
    let ans = Number.MAX_SAFE_INTEGER;
    if(root.left != null) {
        ans = Math.min(minDepth(root.left), ans);
    }
    if(root.right != null) {
        ans = Math.min(minDepth(root.right), ans);
    }
    return ans + 1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="_783-\u4E8C\u53C9\u641C\u7D22\u6811\u8282\u70B9\u6700\u5C0F\u8DDD\u79BB" tabindex="-1"><a class="header-anchor" href="#_783-\u4E8C\u53C9\u641C\u7D22\u6811\u8282\u70B9\u6700\u5C0F\u8DDD\u79BB" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/" target="_blank" rel="noopener noreferrer">783. \u4E8C\u53C9\u641C\u7D22\u6811\u8282\u70B9\u6700\u5C0F\u8DDD\u79BB</a></h2><blockquote><p>\u4E2D\u5E8F\u904D\u5386</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function(root) {
    let ans = Number.MAX_SAFE_INTEGER, pre = -1;
    const dfs = (root) =&gt; {
        if (root === null) {
            return;
        }
        dfs(root.left);
        if (pre == -1) {
            pre = root.val;
        } else {
            ans = Math.min(ans, root.val - pre);
            pre = root.val;
        }
        dfs(root.right);
    }
    dfs(root);
    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="\u5251\u6307-offer-42-\u8FDE\u7EED\u5B50\u6570\u7EC4\u7684\u6700\u5927\u548C" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-42-\u8FDE\u7EED\u5B50\u6570\u7EC4\u7684\u6700\u5927\u548C" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 42. \u8FDE\u7EED\u5B50\u6570\u7EC4\u7684\u6700\u5927\u548C</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) =&gt; {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) =&gt; {
        if (pre &lt; 0) {
            pre = x;
        } else {
            pre = pre + x;
        }
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="_257-\u4E8C\u53C9\u6811\u7684\u6240\u6709\u8DEF\u5F84" tabindex="-1"><a class="header-anchor" href="#_257-\u4E8C\u53C9\u6811\u7684\u6240\u6709\u8DEF\u5F84" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/binary-tree-paths/" target="_blank" rel="noopener noreferrer">257. \u4E8C\u53C9\u6811\u7684\u6240\u6709\u8DEF\u5F84</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var binaryTreePaths = function(root) {
    const paths = [];
    const construct_paths = (root, path) =&gt; {
        if (root) {
            path += root.val.toString();
            if (root.left === null &amp;&amp; root.right === null) { // \u5F53\u524D\u8282\u70B9\u662F\u53F6\u5B50\u8282\u70B9
                paths.push(path); // \u628A\u8DEF\u5F84\u52A0\u5165\u5230\u7B54\u6848\u4E2D
            } else {
                path += &quot;-&gt;&quot;; // \u5F53\u524D\u8282\u70B9\u4E0D\u662F\u53F6\u5B50\u8282\u70B9\uFF0C\u7EE7\u7EED\u9012\u5F52\u904D\u5386
                construct_paths(root.left, path);
                construct_paths(root.right, path);
            }
        }
    }
    construct_paths(root, &quot;&quot;);
    return paths;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="_680-\u9A8C\u8BC1\u56DE\u6587\u5B57\u7B26\u4E32-ii" tabindex="-1"><a class="header-anchor" href="#_680-\u9A8C\u8BC1\u56DE\u6587\u5B57\u7B26\u4E32-ii" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/valid-palindrome-ii/" target="_blank" rel="noopener noreferrer">680. \u9A8C\u8BC1\u56DE\u6587\u5B57\u7B26\u4E32 \u2161</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function isPali(str, l, r) { // \u5224\u65ADstr\u662F\u5426\u56DE\u6587
  while (l &lt; r) {            
    if (str[l] != str[r]) {  // \u6307\u5411\u7684\u5B57\u7B26\u4E0D\u4E00\u6837\uFF0C\u4E0D\u662F\u56DE\u6587\u4E32
      return false;
    }
    l++; // \u6307\u9488\u76F8\u4E92\u903C\u8FD1
    r--;
  }
  return true; // \u59CB\u7EC8\u6CA1\u6709\u4E0D\u4E00\u6837\uFF0C\u8FD4\u56DEtrue
}

var validPalindrome = function (str) {
  let l = 0, r = str.length - 1; // \u5934\u5C3E\u6307\u9488
  while (l &lt; r) { 
    if (str[l] != str[r]) { // \u6307\u5411\u7684\u5B57\u7B26\u4E0D\u4E00\u6837\uFF0C\u8FD8\u4E0D\u80FD\u6B7B\u5211 
      return isPali(str, l + 1, r) || isPali(str, l, r - 1); //\u8F6C\u4E3A\u5224\u65AD\u5220\u6389\u4E00\u4E2A\u5B57\u7B26\u540E\uFF0C\u662F\u5426\u56DE\u6587
    }
    l++;
    r--;
  }
  return true;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="\u5251\u6307-offer-04-\u4E8C\u7EF4\u6570\u7EC4\u4E2D\u7684\u67E5\u627E" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-04-\u4E8C\u7EF4\u6570\u7EC4\u4E2D\u7684\u67E5\u627E" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 04. \u4E8C\u7EF4\u6570\u7EC4\u4E2D\u7684\u67E5\u627E</a></h2><p>\u5F00\u59CB\u4F4D\u7F6E\u5373\u7AD6\u6392\u6700\u5927\uFF0C\u6A2A\u6392\u6700\u5C0F</p><blockquote><ol><li>\u4EE5\u4E8C\u7EF4\u6570\u7EC4\u5DE6\u4E0B\u89D2\u4E3A\u539F\u70B9\uFF0C\u5EFA\u7ACB\u76F4\u89D2\u5750\u6807\u8F74\u3002</li><li>\u82E5\u5F53\u524D\u6570\u5B57\u5927\u4E8E\u4E86\u67E5\u627E\u6570\uFF0C\u67E5\u627E\u5F80\u4E0A\u79FB\u4E00\u4F4D\u3002</li><li>\u82E5\u5F53\u524D\u6570\u5B57\u5C0F\u4E8E\u4E86\u67E5\u627E\u6570\uFF0C\u67E5\u627E\u5F80\u53F3\u79FB\u4E00\u4F4D\u3002</li></ol></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var findNumberIn2DArray = function(matrix, target) {
    if(!matrix.length) return false;
    let x = matrix.length - 1, y = 0;
    while(x &gt;= 0 &amp;&amp; y &lt; matrix[0].length){
        if(matrix[x][y] === target){
            return true;
        }else if(matrix[x][y] &gt; target){
            x--;
        }else{
            y++;
        }
    }
    return false;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="_242-\u6709\u6548\u7684\u5B57\u6BCD\u5F02\u4F4D\u8BCD" tabindex="-1"><a class="header-anchor" href="#_242-\u6709\u6548\u7684\u5B57\u6BCD\u5F02\u4F4D\u8BCD" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/valid-anagram/" target="_blank" rel="noopener noreferrer">242. \u6709\u6548\u7684\u5B57\u6BCD\u5F02\u4F4D\u8BCD</a></h2><blockquote><p>\u6162\u541E\u541E O*(<em>n</em>log<em>n</em>)\uFF0C</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var isAnagram = function (s, t) {
    s = s.split(&#39;&#39;).sort().join(&#39;&#39;);
    t = t.split(&#39;&#39;).sort().join(&#39;&#39;);
    return s === t;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u54C8\u5E0C\u8868
var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }
    const table = new Array(26).fill(0);
    for (let i = 0; i &lt; s.length; ++i) {
        table[s.codePointAt(i) - &#39;a&#39;.codePointAt(0)]++; // charCodeAt
    }
    for (let i = 0; i &lt; t.length; ++i) {
        table[t.codePointAt(i) - &#39;a&#39;.codePointAt(0)]--;
        if (table[t.codePointAt(i) - &#39;a&#39;.codePointAt(0)] &lt; 0) {
            return false;
        }
    }
    return true;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="_1047-\u5220\u9664\u5B57\u7B26\u4E32\u4E2D\u7684\u6240\u6709\u76F8\u90BB\u91CD\u590D\u9879" tabindex="-1"><a class="header-anchor" href="#_1047-\u5220\u9664\u5B57\u7B26\u4E32\u4E2D\u7684\u6240\u6709\u76F8\u90BB\u91CD\u590D\u9879" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/" target="_blank" rel="noopener noreferrer">1047. \u5220\u9664\u5B57\u7B26\u4E32\u4E2D\u7684\u6240\u6709\u76F8\u90BB\u91CD\u590D\u9879</a></h2><blockquote><p>\u6808 \u56E0\u4E3A\u4E0D\u8003\u8651\u8FDE\u7EED\u591A\u4E2A\uFF0C\u53EA\u6709\u4FE9\u4FE9</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var removeDuplicates = function(s) {
    const stk = [];
    for (const ch of s) { // \u597D\u597D\u5B66\uFF01
        if (stk.length &amp;&amp; stk[stk.length - 1] === ch) {
            stk.pop();
        } else {
            stk.push(ch);
        }
    }
    return stk.join(&#39;&#39;);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="_1556-\u5343\u4F4D\u5206\u9694\u6570" tabindex="-1"><a class="header-anchor" href="#_1556-\u5343\u4F4D\u5206\u9694\u6570" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/thousand-separator/" target="_blank" rel="noopener noreferrer">1556. \u5343\u4F4D\u5206\u9694\u6570</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
    return n.toString().split(&#39;&#39;).reduce((pre, cur, index, arr) =&gt; {
        if (index !== 0 &amp;&amp; (arr.length - index) % 3 === 0) {
            return pre + &#39;.&#39; + cur
        } else {
            return pre + cur
        }
    }, &#39;&#39;)
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div>`,66);function r(l,p){return e}var c=n(a,[["render",r],["__file","byteDance2.html.vue"]]);export{c as default};
