import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as e}from"./app.3dedad24.js";const s={},a=e(`<h1 id="\u817E\u8BAF-codetop" tabindex="-1"><a class="header-anchor" href="#\u817E\u8BAF-codetop" aria-hidden="true">#</a> \u817E\u8BAF CodeTop</h1><h4 id="_459-\u91CD\u590D\u7684\u5B50\u5B57\u7B26\u4E32" tabindex="-1"><a class="header-anchor" href="#_459-\u91CD\u590D\u7684\u5B50\u5B57\u7B26\u4E32" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/repeated-substring-pattern/" target="_blank" rel="noopener noreferrer">459. \u91CD\u590D\u7684\u5B50\u5B57\u7B26\u4E32</a></h4><blockquote><p>\u8001\u89C4\u77E9\uFF0C\u5148\u53BB\u9664\u5F02\u5E38\u60C5\u51B5 \u89C2\u5BDF\u4E00\u4E0B\u5982\u679C\u6709\u5FAA\u73AF\u5B50\u4E32\u4F1A\u6709\u4EC0\u4E48\u89C4\u5F8B</p><p>\u5B8C\u5168\u7531\u5355\u4E2A\u5B57\u6BCD\u7EC4\u6210 \u7531\u591A\u4E2A\u5B57\u6BCD\u7EC4\u6210\u7684\u8BDD\uFF0C\u5B50\u4E32\u7684\u7ED3\u5C3E\u4E00\u5B9A\u8DDF s \u7684\u7ED3\u5C3E\u5B57\u6BCD\u4E00\u81F4\uFF0C\u540C\u65F6s % \u5B50\u4E32.length === 0\uFF0C\u5426\u5219\u80AF\u5B9A\u62FC\u4E0D\u4E0A \u7136\u540E\u904D\u5386\u627E\u5230\u6240\u6709\u7B26\u5408\u8981\u6C42\u7684\u5C31\u884C\u4E86</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var repeatedSubstringPattern = function (s) {
  // 1 \u6E05\u7406\u5F02\u5E38
  if (s.length === 1) return false
  if (s.length === 2) return s[0] === s[1]

  // 2 \u5224\u65AD\u662F\u5426\u7531\u5355\u4E2A\u5B57\u6BCD\u7EC4\u6210
  let l = s.length
  let end = s[l - 1]
  if (s[0] === end) {
    if (s[0].repeat(s.length) === s) {
      return true
    }
  }

  // \u904D\u5386\u627E\u5230\u5B50\u4E32\u5224\u65AD\u662F\u5426\u7531\u591A\u4E2A\u7EC4\u6210
  for (let i = 1; i &lt; l / 2; i++) {
    // \u5B50\u4E32\u9700\u8981\u6EE1\u8DB3\u5982\u4E0B\u6761\u4EF6\uFF0C 1.\u7ED3\u5C3E\u8DDF end \u4E00\u76F4\uFF0C 2.s.length % \u5B50\u4E32.length === 0\uFF0C 3. \u5FAA\u73AFs.length/\u5B50\u4E32.length === s
    if (s[i] === end &amp;&amp; l % (i + 1) === 0 &amp;&amp; s.slice(0, i + 1).repeat(l / (i + 1)) === s) {
      return true
    }
  }
  return false
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h4 id="_35-\u641C\u7D22\u63D2\u5165\u4F4D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_35-\u641C\u7D22\u63D2\u5165\u4F4D\u7F6E" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/search-insert-position/" target="_blank" rel="noopener noreferrer">35. \u641C\u7D22\u63D2\u5165\u4F4D\u7F6E</a></h4><blockquote><p>nlog(n) \u4E8C\u5206\u67E5\u627E</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var searchInsert = function(nums, target) {
    const n = nums.length;
    let left = 0, right = n - 1, ans = n;
    while (left &lt;= right) {
        let mid = (right + left) &gt;&gt; 1;
        if (target &lt;= nums[mid]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="_876-\u94FE\u8868\u7684\u4E2D\u95F4\u7ED3\u70B9" tabindex="-1"><a class="header-anchor" href="#_876-\u94FE\u8868\u7684\u4E2D\u95F4\u7ED3\u70B9" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/middle-of-the-linked-list/" target="_blank" rel="noopener noreferrer">876. \u94FE\u8868\u7684\u4E2D\u95F4\u7ED3\u70B9</a></h4><blockquote><p><code>Math.trunc()</code> \u65B9\u6CD5\u4F1A\u5C06\u6570\u5B57\u7684\u5C0F\u6570\u90E8\u5206\u53BB\u6389\uFF0C\u53EA\u4FDD\u7559\u6574\u6570\u90E8\u5206</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var middleNode = function(head) {
    let A = [head];
    while (A[A.length - 1].next != null) // \u6570\u7EC4\u672B\u5C3E\u8282\u70B9\u7684\u4E0B\u4E00\u4E2A\u4E0D\u662Fnull
        A.push(A[A.length - 1].next);
    return A[Math.trunc(A.length / 2)]; // \u53D6\u6574
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="_1013-\u5C06\u6570\u7EC4\u5206\u6210\u548C\u76F8\u7B49\u7684\u4E09\u4E2A\u90E8\u5206" tabindex="-1"><a class="header-anchor" href="#_1013-\u5C06\u6570\u7EC4\u5206\u6210\u548C\u76F8\u7B49\u7684\u4E09\u4E2A\u90E8\u5206" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/partition-array-into-three-parts-with-equal-sum/" target="_blank" rel="noopener noreferrer">1013. \u5C06\u6570\u7EC4\u5206\u6210\u548C\u76F8\u7B49\u7684\u4E09\u4E2A\u90E8\u5206</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canThreePartsEqualSum = function(arr) {
    let sum = arr.reduce((a,b) =&gt; a + b);
    let num = 3;
    let temp = 0;
    for(let a of arr){
        temp += a;
        if (temp === sum / 3) num--, temp = 0; // \u987A\u5E8F\u5207\u7247
    }
    return num &lt;=  0;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,12);function r(l,p){return a}var b=n(s,[["render",r],["__file","Tencent.html.vue"]]);export{b as default};
