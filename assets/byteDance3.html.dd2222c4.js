import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.3dedad24.js";const e={},a=s(`<h1 id="\u5B57\u8282\u8DF3\u52A8codetop-\u4E09" tabindex="-1"><a class="header-anchor" href="#\u5B57\u8282\u8DF3\u52A8codetop-\u4E09" aria-hidden="true">#</a> \u5B57\u8282\u8DF3\u52A8CodeTop\uFF08\u4E09\uFF09</h1><h4 id="_83-\u5220\u9664\u6392\u5E8F\u94FE\u8868\u4E2D\u7684\u91CD\u590D\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#_83-\u5220\u9664\u6392\u5E8F\u94FE\u8868\u4E2D\u7684\u91CD\u590D\u5143\u7D20" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/" target="_blank" rel="noopener noreferrer">83. \u5220\u9664\u6392\u5E8F\u94FE\u8868\u4E2D\u7684\u91CD\u590D\u5143\u7D20</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if (!head) {
        return head;
    }

    let cur = head;
    while (cur.next) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
    }
    return head;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="_543-\u4E8C\u53C9\u6811\u7684\u76F4\u5F84" tabindex="-1"><a class="header-anchor" href="#_543-\u4E8C\u53C9\u6811\u7684\u76F4\u5F84" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/diameter-of-binary-tree/" target="_blank" rel="noopener noreferrer">543. \u4E8C\u53C9\u6811\u7684\u76F4\u5F84</a></h4><blockquote><p>\u5B50\u95EE\u9898\uFF1A\u6BD4\u8F83\u5DE6\u53F3\u5B50\u6811\u6700\u5927\u6DF1\u5EA6 + 1</p></blockquote><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204061659218.png" alt="baf2f6ea1ae76ba383eb1753254340f089dac9f03664f93990d6ae54f8560970-image.png" style="zoom:33%;"><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var diameterOfBinaryTree = function(root) {
    // \u9ED8\u8BA4\u4E3A1\u662F\u56E0\u4E3A\u9ED8\u8BA4\u4E86\u6839\u8282\u70B9\u81EA\u8EAB\u7684\u8DEF\u5F84\u957F\u5EA6
    let ans = 1;

    function depth(rootNode) {
        if (!rootNode) {
            // \u5982\u679C\u4E0D\u5B58\u5728\u6839\u8282\u70B9\uFF0C\u5219\u6DF1\u5EA6\u4E3A0
            return 0;
        }
        // \u9012\u5F52\uFF0C\u83B7\u53D6\u5DE6\u5B50\u6811\u7684\u6DF1\u5EA6
        let L = depth(rootNode.left);
        // \u9012\u5F52\uFF0C\u83B7\u53D6\u53F3\u5B50\u6811\u7684\u6DF1\u5EA6
        let R = depth(rootNode.right);

        /* \u5173\u952E\u70B91
        L+R+1\u7684\u516C\u5F0F\u662F\u5982\u4F55\u800C\u6765\uFF1F
        \u7B49\u540C\u4E8E\uFF1A\u5DE6\u5B50\u6811\u6DF1\u5EA6(\u8282\u70B9\u4E2A\u6570) + \u53F3\u5B50\u6811\u6DF1\u5EA6\uFF08\u8282\u70B9\u4E2A\u6570\uFF09 + 1\u4E2A\u6839\u8282\u70B9
        \u4FBF\u662F\u8FD9\u682A\u4E8C\u53C9\u6811\u4ECE\u6700\u5DE6\u4FA7\u53F6\u5B50\u8282\u70B9\u5230\u6700\u53F3\u4FA7\u53F6\u5B50\u8282\u70B9\u7684\u6700\u957F\u8DEF\u5F84
        \u7C7B\u4F3C\u4E8E\u5E73\u8861\u4E8C\u53C9\u6811\u7684\u6700\u5C0F\u503C\u8282\u70B9\u5230\u6700\u5927\u503C\u8282\u70B9\u7684\u6700\u957F\u8DEF\u5F84
        \u4E4B\u6240\u4EE5+1\u662F\u56E0\u4E3A\u9700\u8981\u7ECF\u8FC7\u6839\u8282\u70B9
         */
        // \u83B7\u53D6\u8BE5\u6811\u7684\u6700\u957F\u8DEF\u5F84\u548C\u73B0\u6709\u6700\u957F\u8DEF\u5F84\u4E2D\u6700\u5927\u7684\u90A3\u4E2A
        ans = Math.max(ans, L + R + 1);
        /* \u5173\u952E\u70B92
        \u5DF2\u77E5\u6839\u8282\u70B9\u7684\u5DE6\u53F3\u5B50\u6811\u7684\u6DF1\u5EA6\uFF0C
        \u5219\uFF0C\u5DE6\u53F3\u5B50\u6811\u6DF1\u5EA6\u7684\u6700\u5927\u503C + 1\uFF0C
        \u4FBF\u662F\u4EE5\u6839\u8282\u70B9\u4E3A\u6570\u7684\u6700\u5927\u6DF1\u5EA6*/
        return Math.max(L, R) + 1; // \u5305\u62EC\u5F53\u524D\u6839\u8282\u70B9
    }

    depth(root);

    // \u7531\u4E8Edepth\u51FD\u6570\u4E2D\u5DF2\u7ECF\u9ED8\u8BA4\u52A0\u4E0A\u6570\u8282\u70B9\u7684\u81EA\u8EAB\u6839\u8282\u70B9\u8DEF\u5F84\u4E86\uFF0C\u6545\u6B64\u5904\u9700\u51CF1
    return ans - 1;
}; 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h4 id="_225-\u7528\u961F\u5217\u5B9E\u73B0\u6808" tabindex="-1"><a class="header-anchor" href="#_225-\u7528\u961F\u5217\u5B9E\u73B0\u6808" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/implement-stack-using-queues/" target="_blank" rel="noopener noreferrer">225. \u7528\u961F\u5217\u5B9E\u73B0\u6808</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>let MyStack = function() {
    this.queue = [];
    this._queue = [];
};

MyStack.prototype.push = function(x) {
    this.queue.push(x);
};

MyStack.prototype.pop = function() {
    while(this.queue.length &gt; 1){
        this._queue.push(this.queue.shift());
    }
    let ans = this.queue.shift();
    while(this._queue.length){
        this.queue.push(this._queue.shift());
    }
    return ans;
};

MyStack.prototype.top = function() {
    return this.queue.slice(-1)[0];
};

MyStack.prototype.empty = function() {
    return !this.queue.length;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h4 id="_572-\u53E6\u4E00\u68F5\u6811\u7684\u5B50\u6811" tabindex="-1"><a class="header-anchor" href="#_572-\u53E6\u4E00\u68F5\u6811\u7684\u5B50\u6811" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/subtree-of-another-tree/" target="_blank" rel="noopener noreferrer">572. \u53E6\u4E00\u68F5\u6811\u7684\u5B50\u6811</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var isSubtree = function (s, t) {
  if (s == null) {
    return false;
  }
  if (isSameTree(s, t)) {
    return true;
  }
  return isSubtree(s.left, t) || isSubtree(s.right, t); // \u6709\u4E00\u4E2Atrue\u5C31true
};
/*
  isSameTree
    \u4E24\u6811\u540C\u4E3A null \u5219\u76F8\u540C
    \u4E00\u4E2A null \u4E00\u4E2A\u4E0D\u662F\uFF0C\u5219\u4E0D\u540C\uFF1B
    \u4E24\u4E2A\u6811\u90FD\u4E0D\u4E3A null\uFF0C\u5219\u9012\u5F52\u5224\u65AD\u5DE6\u53F3\u5B50\u6811\u662F\u5426\u76F8\u540C
*/
function isSameTree(s, t) { // 100\u9898
  if (s == null &amp;&amp; t == null) {
    return true;
  };
  if (s == null || t == null) {
    return false;
  }
  return s.val == t.val &amp;&amp; isSameTree(s.left, t.left) &amp;&amp; isSameTree(s.right, t.right);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h4 id="\u5251\u6307-offer-61-\u6251\u514B\u724C\u4E2D\u7684\u987A\u5B50" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-61-\u6251\u514B\u724C\u4E2D\u7684\u987A\u5B50" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 61. \u6251\u514B\u724C\u4E2D\u7684\u987A\u5B50</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
  let set = new Set();
  let max = 0,
    min = 14;
  for (let a of nums) {
    // \u8DF3\u8FC7\u5927\u5C0F\u738B;
    if (a == 0) continue;
    max = Math.max(a, max);
    min = Math.min(a, min);
    // \u82E5\u6709\u91CD\u590D\uFF0C\u63D0\u524D\u8FD4\u56DE false
    if (set.has(a)) return false;
    set.add(a);
  }
  // \u6700\u5927\u724C - \u6700\u5C0F\u724C &lt; 5 \u5219\u53EF\u6784\u6210\u987A\u5B50
  return max - min &lt; 5;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="_83-\u5220\u9664\u6392\u5E8F\u94FE\u8868\u4E2D\u7684\u91CD\u590D\u5143\u7D20-1" tabindex="-1"><a class="header-anchor" href="#_83-\u5220\u9664\u6392\u5E8F\u94FE\u8868\u4E2D\u7684\u91CD\u590D\u5143\u7D20-1" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/" target="_blank" rel="noopener noreferrer">83. \u5220\u9664\u6392\u5E8F\u94FE\u8868\u4E2D\u7684\u91CD\u590D\u5143\u7D20</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if (!head) {
        return head;
    }

    let cur = head;
    while (cur.next) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next; // \u8DF3\u8FC7\u8BE5\u8282\u70B9
        } else {
            cur = cur.next;
        }
    }
    return head;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="\u5251\u6307-offer-29-\u987A\u65F6\u9488\u6253\u5370\u77E9\u9635" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-29-\u987A\u65F6\u9488\u6253\u5370\u77E9\u9635" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 29. \u987A\u65F6\u9488\u6253\u5370\u77E9\u9635</a></h4><blockquote><p>\u6A21\u62DF\uFF0C\u5E76\u8BB0\u5F55\u5DF2\u7ECF\u88AB\u8BBF\u95EE\u7684\u4F4D\u7F6E</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var spiralOrder = function(matrix) {
    if (!matrix.length || !matrix[0].length) {
        return [];
    }
    const rows = matrix.length, columns = matrix[0].length;
    const visited = new Array(rows).fill(0).map(() =&gt; new Array(columns).fill(false));
    const total = rows * columns;
    const order = new Array(total).fill(0);

    let directionIndex = 0, row = 0, column = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // \u65B9\u5411\u6570\u7EC4
    for (let i = 0; i &lt; total; i++) { 
        order[i] = matrix[row][column];
        visited[row][column] = true;
        const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
        if (!(0 &lt;= nextRow &amp;&amp; nextRow &lt; rows &amp;&amp; 0 &lt;= nextColumn &amp;&amp; nextColumn &lt; columns &amp;&amp; !(visited[nextRow][nextColumn]))) {
            directionIndex = (directionIndex + 1) % 4; // \u65B9\u5411\u5207\u6362
        }
        row += directions[directionIndex][0];
        column += directions[directionIndex][1];
    }
    return order;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h4 id="\u5251\u6307-offer-11-\u65CB\u8F6C\u6570\u7EC4\u7684\u6700\u5C0F\u6570\u5B57" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-11-\u65CB\u8F6C\u6570\u7EC4\u7684\u6700\u5C0F\u6570\u5B57" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 11. \u65CB\u8F6C\u6570\u7EC4\u7684\u6700\u5C0F\u6570\u5B57</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
    return numbers.sort((a, b) =&gt; a - b)[0]
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="_26-\u5220\u9664\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u91CD\u590D\u9879" tabindex="-1"><a class="header-anchor" href="#_26-\u5220\u9664\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u91CD\u590D\u9879" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/" target="_blank" rel="noopener noreferrer">26. \u5220\u9664\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u91CD\u590D\u9879</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    for (let i = 0; i &lt; nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            nums.splice(i, 1);
            i--; // \u5220\u9664\u540E\u6570\u7EC4\u7F29\u77ED\uFF0C\u7559\u5728\u539F\u5730
        }
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="_191-\u4F4D1\u7684\u4E2A\u6570" tabindex="-1"><a class="header-anchor" href="#_191-\u4F4D1\u7684\u4E2A\u6570" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/number-of-1-bits/" target="_blank" rel="noopener noreferrer">191. \u4F4D1\u7684\u4E2A\u6570</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    return n.toString(2).split(&#39;1&#39;).length - 1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="\u5251\u6307-offer-03-\u6570\u7EC4\u4E2D\u91CD\u590D\u7684\u6570\u5B57" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-03-\u6570\u7EC4\u4E2D\u91CD\u590D\u7684\u6570\u5B57" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 03. \u6570\u7EC4\u4E2D\u91CD\u590D\u7684\u6570\u5B57</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var findRepeatNumber = function(nums) {
    let map = new Map();
    for(let i of nums){
        if(map.has(i)) return i;
        map.set(i, 1);
    }
    return null;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="_977-\u6709\u5E8F\u6570\u7EC4\u7684\u5E73\u65B9" tabindex="-1"><a class="header-anchor" href="#_977-\u6709\u5E8F\u6570\u7EC4\u7684\u5E73\u65B9" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/squares-of-a-sorted-array/" target="_blank" rel="noopener noreferrer">977. \u6709\u5E8F\u6570\u7EC4\u7684\u5E73\u65B9</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    return nums.map((val) =&gt; val ** 2).sort((a, b) =&gt; a - b);
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="_108-\u5C06\u6709\u5E8F\u6570\u7EC4\u8F6C\u6362\u4E3A\u4E8C\u53C9\u641C\u7D22\u6811" tabindex="-1"><a class="header-anchor" href="#_108-\u5C06\u6709\u5E8F\u6570\u7EC4\u8F6C\u6362\u4E3A\u4E8C\u53C9\u641C\u7D22\u6811" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/" target="_blank" rel="noopener noreferrer">108. \u5C06\u6709\u5E8F\u6570\u7EC4\u8F6C\u6362\u4E3A\u4E8C\u53C9\u641C\u7D22\u6811</a> \u2B50</h4><blockquote><p>\u9012\u5F52 + \u5DE6\u53F3\u5206\u5272</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const sortedArrayToBST = nums =&gt; {
    if (!nums.length) return null;
    // \u53BB\u4E2D\u95F4\u7D22\u5F15\uFF08\xF72\u53D6\u6574\uFF09
    const mid = nums.length &gt;&gt; 1;
    // \u6784\u5EFA\u4E8C\u53C9\u6811\uFF0C\u6839\u8282\u70B9\u4E3A\u4E2D\u95F4\u503C\uFF0C\u5DE6\u5B50\u6811\u4E3A\u5DE6\u4FA7\u503C\u7EE7\u7EED\u6784\u5EFA\uFF0C\u53F3\u5B50\u6811\u4E3A\u53F3\u5B50\u6811\u7EE7\u7EED\u6784\u5EFA
    return new TreeNode(
        nums[mid],
        sortedArrayToBST(nums.slice(0, mid)),
        sortedArrayToBST(nums.slice(mid + 1))
    );
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="\u5251\u6307-offer-53-i-\u5728\u6392\u5E8F\u6570\u7EC4\u4E2D\u67E5\u627E\u6570\u5B57-i" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-53-i-\u5728\u6392\u5E8F\u6570\u7EC4\u4E2D\u67E5\u627E\u6570\u5B57-i" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 53 - I. \u5728\u6392\u5E8F\u6570\u7EC4\u4E2D\u67E5\u627E\u6570\u5B57 I</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var search = function (nums, target) {
    let count = 0;
    nums.forEach((val) =&gt; {
        if (val === target) count++;
    })
    return count;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="\u5251\u6307-offer-40-\u6700\u5C0F\u7684k\u4E2A\u6570" tabindex="-1"><a class="header-anchor" href="#\u5251\u6307-offer-40-\u6700\u5C0F\u7684k\u4E2A\u6570" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/" target="_blank" rel="noopener noreferrer">\u5251\u6307 Offer 40. \u6700\u5C0F\u7684k\u4E2A\u6570</a></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var getLeastNumbers = function (arr, k) {
    arr.sort((a, b) =&gt; a - b);
    const res = [];
    for (let i = 0; i &lt; k; i++) {
        res.push(arr[i]);
    }
    return res;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,35);function r(l,p){return a}var u=n(e,[["render",r],["__file","byteDance3.html.vue"]]);export{u as default};
