import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.3dedad24.js";const a={},e=s(`<h1 id="\u5FEB\u624Bcodetop" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u624Bcodetop" aria-hidden="true">#</a> \u5FEB\u624BCodeTop</h1><h2 id="_144-\u4E8C\u53C9\u6811\u7684\u524D\u5E8F\u904D\u5386" tabindex="-1"><a class="header-anchor" href="#_144-\u4E8C\u53C9\u6811\u7684\u524D\u5E8F\u904D\u5386" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/binary-tree-preorder-traversal/" target="_blank" rel="noopener noreferrer">144. \u4E8C\u53C9\u6811\u7684\u524D\u5E8F\u904D\u5386</a></h2><blockquote><p>dfs</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const preorderTraversal = function (root) {
    let res = [];
    const dfs = function (root) {
        if (root === null) return;
        //\u5148\u5E8F\u904D\u5386\u6240\u4EE5\u4ECE\u7236\u8282\u70B9\u5F00\u59CB
        res.push(root.val);
        //\u9012\u5F52\u5DE6\u5B50\u6811
        dfs(root.left);
        //\u9012\u5F52\u53F3\u5B50\u6811
        dfs(root.right);
    }
    dfs(root);
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="_110-\u5E73\u8861\u4E8C\u53C9\u6811" tabindex="-1"><a class="header-anchor" href="#_110-\u5E73\u8861\u4E8C\u53C9\u6811" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/balanced-binary-tree/" target="_blank" rel="noopener noreferrer">110. \u5E73\u8861\u4E8C\u53C9\u6811</a></h2><blockquote><p>\u57FA\u4E8E\u8BA1\u7B97\u4E8C\u53C9\u6811\u6DF1\u5EA6\u7684\u9012\u5F52\u7B97\u6CD5</p><p>\u201D\u5982\u679C\u5DE6\u53F3\u6700\u5927\u6DF1\u5EA6\u5927\u4E8E 1\uFF0C\u5C31\u4E0D\u662F\u5E73\u8861\u4E8C\u53C9\u6811\u201C</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
    // \u8BB0\u5F55\u4E8C\u53C9\u6811\u662F\u5426\u5E73\u8861
    let flag = true; // 1
    const maxDepth = (root) =&gt; {
        if (root == null) return 0; // \u7EC8\u6B62
        // \u63D0\u524D\u8FD4\u56DE
        if (!flag) return;
        let leftMaxDepth = maxDepth(root.left);
        let rightMaxDepth = maxDepth(root.right);
        // \u5982\u679C\u5DE6\u53F3\u6700\u5927\u6DF1\u5EA6\u5927\u4E8E 1\uFF0C\u5C31\u4E0D\u662F\u5E73\u8861\u4E8C\u53C9\u6811
        if (Math.abs(rightMaxDepth - leftMaxDepth) &gt; 1) { // 2
            flag = false;
        }
        return 1 + Math.max(leftMaxDepth, rightMaxDepth); // 3
    };
    maxDepth(root);
    return flag;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="_7-\u6574\u6570\u53CD\u8F6C" tabindex="-1"><a class="header-anchor" href="#_7-\u6574\u6570\u53CD\u8F6C" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/reverse-integer/" target="_blank" rel="noopener noreferrer">7. \u6574\u6570\u53CD\u8F6C</a></h2><blockquote><p>\u81EA\u5DF1\u624B\u6495\u4E00\u4E0B</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    const arr = x.toString().split(&#39;&#39;);
    let flag = arr[0]===&#39;-&#39;
    if (flag) {
        arr.shift();
    }
    const ans = Number(arr.reverse().join(&#39;&#39;))
    if (ans &gt; 2 ** 31 - 1 || ans &lt; -(2 ** 31)) {
        return 0
    }
    return flag ? -ans : ans
};

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><blockquote><p>\u5B98\u65B9\u79C0\u4E00\u70B9</p><p>\u6BCF\u6B21\u9664\u4EE510\u53D6\u5230\u6700\u4F4E\u4F4D\uFF0C\u518D\u9010\u4E2A\u4E5810\u81F3\u6700\u9AD8\u4F4D</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var reverse = function(x) {
    let rev = 0;
    while (x !== 0) {
        const digit = x % 10;
        x = ~~(x / 10);
        rev = rev * 10 + digit;
        if (rev &lt; Math.pow(-2, 31) || rev &gt; Math.pow(2, 31) - 1) {
            return 0;
        }
    }
    return rev;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_227-\u57FA\u672C\u8BA1\u7B97\u5668-ii" tabindex="-1"><a class="header-anchor" href="#_227-\u57FA\u672C\u8BA1\u7B97\u5668-ii" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/basic-calculator-ii/" target="_blank" rel="noopener noreferrer">227. \u57FA\u672C\u8BA1\u7B97\u5668 II</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var calculate = function(s) {
	const nums = []
	let cur = 0
	let prevOp = &#39;+&#39;
	s = s + &#39;+&#39;
	
	for (let i = 0; i &lt; s.length; i++) {
		if (s[i] &gt;= &#39;0&#39; &amp;&amp; s[i] &lt;= &#39;9&#39;) {
			cur = cur * 10 + s[i].charCodeAt(0) -&#39;0&#39;.charCodeAt(0)
		} else if (s[i] == &#39; &#39;) {
			continue
		} else {
			if (prevOp == &#39;+&#39;) { 
                nums.push(cur)
            } else if (prevOp == &#39;-&#39;) {
                nums.push( -1 * cur) 
            } else if (prevOp == &#39;*&#39;) {
                nums[nums.length - 1] *=  cur 
            } else if (prevOp == &#39;/&#39;) {
                nums[nums.length - 1]  =  (nums[nums.length - 1] / cur) | 0
            }
            prevOp = s[i] 
            cur = 0 
		}
	}
    let sum = 0
    nums.forEach(v =&gt; {
        sum += v
    })
    return sum
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h2 id="_698-\u5212\u5206\u4E3Ak\u4E2A\u76F8\u7B49\u7684\u5B50\u96C6" tabindex="-1"><a class="header-anchor" href="#_698-\u5212\u5206\u4E3Ak\u4E2A\u76F8\u7B49\u7684\u5B50\u96C6" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/partition-to-k-equal-sum-subsets/" target="_blank" rel="noopener noreferrer">698. \u5212\u5206\u4E3Ak\u4E2A\u76F8\u7B49\u7684\u5B50\u96C6</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function (nums, k) {
    // \u6392\u9664\u4E00\u4E9B\u57FA\u672C\u60C5\u51B5
    if (k &gt; nums.length) return false;
    let sum = nums.reduce((pre, cur) =&gt; pre + cur);
    if (sum % k != 0) return false;
    /**
     * \u9012\u5F52\u7A77\u4E3E nums \u4E2D\u7684\u6BCF\u4E2A\u6570\u5B57
     * @param {*} nums
     * @param {*} index \u5F00\u59CB\u7D22\u5F15
     * @param {*} bucket \u6876
     * @param {*} target \u6BCF\u4E2A\u6876\u90FD\u9700\u8981\u8FBE\u6210\u7684\u76EE\u6807\u548C
     */
    const backtrack = (nums, index, bucket, target) =&gt; {
        // \u68C0\u67E5\u6240\u6709\u6876\u7684\u6570\u5B57\u4E4B\u548C\u662F\u5426\u90FD\u662F target
        if (index == nums.length) {
            for (let i = 0; i &lt; bucket.length; i++) {
                if (bucket[i] != target) {
                    return false;
                }
            }
            // nums \u6210\u529F\u5E73\u5206\u6210 k \u4E2A\u5B50\u96C6
            return true;
        }
        // \u7A77\u4E3E nums[index] \u53EF\u80FD\u88C5\u5165\u7684\u6876
        for (let i = 0; i &lt; bucket.length; i++) {
            // \u526A\u679D\uFF0C\u6876\u88C5\u88C5\u6EE1\u4E86
            if (bucket[i] + nums[index] &gt; target) {
                continue;
            }
            // \u5C06 nums[index] \u88C5\u5165 bucket[i]
            bucket[i] += nums[index];
            // \u9012\u5F52\u7A77\u4E3E\u4E0B\u4E00\u4E2A\u6570\u5B57\u7684\u9009\u62E9
            if (backtrack(nums, index + 1, bucket, target)) {
                return true;
            }
            // \u64A4\u9500\u9009\u62E9
            bucket[i] -= nums[index];
        }
        // nums[index] \u88C5\u5165\u54EA\u4E2A\u6876\u90FD\u4E0D\u884C
        return false;
    };
    // k \u4E2A\u6876\uFF08\u96C6\u5408\uFF09\uFF0C\u8BB0\u5F55\u6BCF\u4E2A\u6876\u88C5\u7684\u6570\u5B57\u4E4B\u548C
    let bucket = new Array(k).fill(0);
    // \u7406\u8BBA\u4E0A\u6BCF\u4E2A\u6876\uFF08\u96C6\u5408\uFF09\u4E2D\u6570\u5B57\u7684\u548C
    let target = sum / k;
    /* \u964D\u5E8F\u6392\u5E8F nums \u6570\u7EC4   \u4F18\u5316\u65B9\u5F0F\uFF0C\u4EE5\u671F\u5C3D\u5FEB\u7684\u547D\u4E2D\u526A\u679D*/
    nums.sort((a, b) =&gt; b - a);
    // \u7A77\u4E3E\uFF0C\u770B\u770B nums \u662F\u5426\u80FD\u5212\u5206\u6210 k \u4E2A\u548C\u4E3A target \u7684\u5B50\u96C6
    return backtrack(nums, 0, bucket, target);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div><h2 id="_231-2-\u7684\u5E42" tabindex="-1"><a class="header-anchor" href="#_231-2-\u7684\u5E42" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/power-of-two/" target="_blank" rel="noopener noreferrer">231. 2 \u7684\u5E42</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var isPowerOfTwo = function(n) {
    return n &gt; 0 &amp;&amp; (n &amp; (n - 1)) === 0; // 1000 0111
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="\u5251\u6307-offer-45-\u628A\u6570\u7EC4\u6392\u6210\u6700\u5C0F\u7684\u6570" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-45-\u628A\u6570\u7EC4\u6392\u6210\u6700\u5C0F\u7684\u6570" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 45. \u628A\u6570\u7EC4\u6392\u6210\u6700\u5C0F\u7684\u6570</a></h2><blockquote><p>\u6211\u4EEC\u6700\u7EC8\u8981\u8FBE\u5230\u7684\u6548\u679C\u662F\u628A\u6570\u7EC4\u91CC\u6240\u6709\u6570\u5B57\u62FC\u63A5\u8D77\u6765\u6392\u6210\u4E00\u4E2A\u6570\uFF0C\u5E76\u4E14\u8FD9\u4E2A\u6570\u662F\u62FC\u63A5\u7684\u6240\u6709\u6570\u5B57\u4E2D\u6700\u5C0F\u7684 \u5229\u7528\u5206\u6CBB\u7684\u601D\u60F3\uFF0C\u5982\u679C\u8FD9\u4E2A\u6570\u7EC4\u53EA\u6709\u4E24\u4E2A\u6570\u5B57\uFF0C\u90A3\u8FD9\u4E24\u4E2A\u6570\u5B57(\u5047\u8BBE\u8FD9\u4FE9\u6570\u5B57\u53EBa b)\u62FC\u63A5\u7684\u89C4\u5219\u65E0\u975E\u662Fab\u6216\u8005ba\uFF0C\u90A3\u4E48\u6211\u4EEC\u6BD4\u8F83\u8FD9\u4FE9\u62FC\u63A5\u7ED3\u679C\u54EA\u4E2A\u5C0F\u6211\u4EEC\u5C31\u91C7\u7528\u54EA\u4E2A</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function (nums) {
  return nums.sort((a, b) =&gt; \`\${a}\${b}\` - \`\${b}\${a}\`).join(&quot;&quot;); // sort\u6539\u53D8\u539F\u6570\u7EC4\u5185\u5BB9
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_169-\u591A\u6570\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#_169-\u591A\u6570\u5143\u7D20" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/majority-element/" target="_blank" rel="noopener noreferrer">169. \u591A\u6570\u5143\u7D20</a></h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var majorityElement = function(nums) {
    nums.sort()
    return nums[parseInt(nums.length/2)]
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,23);function r(l,p){return e}var u=n(a,[["render",r],["__file","ks.html.vue"]]);export{u as default};
