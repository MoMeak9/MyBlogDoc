import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as e}from"./app.9338189c.js";const a={},s=e(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_1-\u4FEE\u6539this\u6307\u5411" tabindex="-1"><a class="header-anchor" href="#_1-\u4FEE\u6539this\u6307\u5411" aria-hidden="true">#</a> 1. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fa616b3de81b948fda9a92db7e86bd171%3FtpId%3D2%26tqId%3D10851%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u4FEE\u6539this\u6307\u5411</a></h3><blockquote><p>\u5C01\u88C5\u51FD\u6570 f\uFF0C\u4F7F f \u7684 this \u6307\u5411\u6307\u5B9A\u7684\u5BF9\u8C61\u3002</p></blockquote><p>\u8FD9\u91CC\u7ED9\u51FA\u4E09\u79CD\u5199\u6CD5\uFF0C\u54EA\u79CD\u90FD\u53EF\u4EE5\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// apply\u4FEE\u6539this\u4F5C\u7528\u57DF
function bindThis(f, oTarget) {
    return function () {
        return f.apply(oTarget,arguments)
    }
}

// call\u4FEE\u6539this\u4F5C\u7528\u57DF
function bindThis(f, oTarget) {
    return function (){
        return f.call(oTarget,...arguments)
    }
}
// bind\u4FEE\u6539this\u4F5C\u7528\u57DF
function bindThis(f, oTarget) {
    return function (){
        return f.bind(oTarget,...arguments)() // \u624B\u52A8\u8C03\u7528
    }
}
// \u6216\u8005\u76F4\u63A5\u7B80\u5199,bind\u8FD4\u56DE\u66F4\u6539\u4E86\u51FD\u6570\u4E0A\u4E0B\u6587\u7684\u65B0\u51FD\u6570
function bindThis(f, oTarget) {
    return f.bind(oTarget)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ol><li>apply\u3001call\u3001bind\u533A\u522B</li></ol><blockquote><p>apply\u3001call\u3001bind\u7684\u4F5C\u7528\u90FD\u662F\u4FEE\u6539\u6267\u884C\u4E0A\u4E0B\u6587 apply\u3001call\u90FD\u662F\u8FD4\u56DE\u51FD\u6570\u7ACB\u5373\u6267\u884C\u7684<u>\u7ED3\u679C</u>\uFF0C\u5176\u4E2Dapply\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E4B\u540E\u662F\u6570\u7EC4Array\uFF0Ccall\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E4B\u540E\u662F\u9010\u4E2A\u53C2\u6570\u3002 bind\u8FD4\u56DE\u7684\u662F\u51FD\u6570\uFF0C\u9700\u8981\u624B\u52A8\u6267\u884C\u7ED3\u679C\u3002\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E4B\u540E\u662F\u9010\u4E2A\u53C2\u6570\u3002</p></blockquote><h3 id="_2-\u83B7\u53D6url\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#_2-\u83B7\u53D6url\u53C2\u6570" aria-hidden="true">#</a> 2. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fa3ded747e3884a3c86d09d88d1652e10%3FtpId%3D2%26tqId%3D10852%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u83B7\u53D6url\u53C2\u6570</a></h3><blockquote><p>\u83B7\u53D6 url \u4E2D\u7684\u53C2\u6570</p><ol><li>\u6307\u5B9A\u53C2\u6570\u540D\u79F0\uFF0C\u8FD4\u56DE\u8BE5\u53C2\u6570\u7684\u503C \u6216\u8005 \u7A7A\u5B57\u7B26\u4E32</li><li>\u4E0D\u6307\u5B9A\u53C2\u6570\u540D\u79F0\uFF0C\u8FD4\u56DE\u5168\u90E8\u7684\u53C2\u6570\u5BF9\u8C61 \u6216\u8005 {}</li><li>\u5982\u679C\u5B58\u5728\u591A\u4E2A\u540C\u540D\u53C2\u6570\uFF0C\u5219\u8FD4\u56DE\u6570\u7EC4</li></ol><p>\u8F93\u5165\uFF1A<code>http://www.nowcoder.com?key=1&amp;key=2&amp;key=3&amp;test=4#hehe key</code></p><p>\u8F93\u51FA\uFF1A[1, 2, 3]</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function getUrlParam(sUrl, sKey) {
        let newArr = []
        let newObj = {}
        // \u83B7\u53D6?\u53F7\u540E\u9762#\u53F7\u524D\u9762\u7684\u503C
        let query = sUrl.split(&#39;#&#39;)[0].split(&#39;?&#39;)[1]
        // \u5982\u679Cquery\u5B58\u5728
        if (query) {
          let arr = query.split(&#39;&amp;&#39;)
          for(let i = 0 ; i &lt; arr.length; i++) {
            if (arr[i]) {
              arr[i] = arr[i].split(&#39;=&#39;)
              // \u6570\u7EC4
              if (sKey !== undefined) {
                if(arr[i][0] === sKey) {
                  newArr.push(arr[i][1])
                }
              // \u5BF9\u8C61
              } else {
                if(arr[i][0] in newObj) {
                  newObj[arr[i][0]].push(arr[i][1])
                } else {
                  newObj[arr[i][0]] = [arr[i][1]]
                }
              }
            }
          }
          // \u5224\u65ADsKey\u6709\u6CA1\u6709\u503C
          if(sKey !== undefined) {
            switch(newArr.length) {
              case 0 : return &#39;&#39;;break;
              case 1 : return newArr[0]; break;
              default: return newArr;break;
            }
          } else {
            return newObj
          }
        // \u5982\u679Cquery\u4E0D\u5B58\u5728\uFF0C\u5224\u65ADsKey\u662F\u5426\u5B58\u5728\uFF0C\u5982\u679C\u5B58\u5728\u5C31\u8FD4\u56DE\u7A7A\u5BF9\u8C61\uFF0C\u5982\u679C\u4E0D\u5B58\u5728\u5C31\u8FD4\u56DE\u7A7A\u5B57\u7B26\u4E32
        } else {
          return sKey !== undefined ? &#39;&#39; : {}
        }
      }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>url\u7684\u7EC4\u6210\u90E8\u5206</li></ul><blockquote><p><code>https://user:pass@www.baidu.com:80/index.html?type=1&amp;name=2#haha</code><code>http/https</code> \u662F\u534F\u8BAE <code>user:pass@</code> \u662F\u767B\u5F55\u8BA4\u8BC1 <code>www.baidu.com</code> \u662F\u57DF\u540D\uFF0C\u670D\u52A1\u5668\u5730\u5740 <code>:80</code> \u662F\u7AEF\u53E3\u53F7 <code>/index.html</code> \u662F\u8BF7\u6C42\u8D44\u6E90\u6587\u4EF6\u8DEF\u5F84 <code>?type=1&amp;name=2</code> \u662F\u67E5\u8BE2\u5B57\u7B26\u4E32\uFF0C\u643A\u5E26\u53C2\u6570\uFF0C\u7ED9\u670D\u52A1\u5668\u4F20\u7684\u5185\u5BB9\u3002 <code>#haha</code> \u662F\u54C8\u5E0C\uFF0C\u7247\u6BB5\u6807\u8BC6\u7B26</p></blockquote><ul><li>split\u65B9\u6CD5</li></ul><blockquote><p>\u5B57\u7B26\u4E32\u5206\u5272\u6210\u6570\u7EC4\u7684\u65B9\u6CD5\uFF0C\u91CC\u9762\u7684\u53C2\u6570\u662F\u4EE5\u4EC0\u4E48\u5206\u5272\uFF0C\u5982\u679C\u4E0D\u4F20\u5C31\u662F\u7A7A\u5B57\u7B26\u4E32\u4E3A\u5206\u5272\uFF0C\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A\u6570\u7EC4\u3002</p></blockquote><ul><li>query\u90E8\u5206\u53EF\u4EE5\u4F7F\u7528\u6B63\u5219</li></ul><h3 id="_3-dom\u8282\u70B9\u67E5\u627E" tabindex="-1"><a class="header-anchor" href="#_3-dom\u8282\u70B9\u67E5\u627E" aria-hidden="true">#</a> 3. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F74d74be449af4c66907fe2d6961c255c%3FtpId%3D2%26tqId%3D10853%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">dom\u8282\u70B9\u67E5\u627E</a></h3><blockquote><p>\u67E5\u627E\u4E24\u4E2A\u8282\u70B9\u7684\u6700\u8FD1\u7684\u4E00\u4E2A\u5171\u540C\u7236\u8282\u70B9\uFF0C\u53EF\u4EE5\u5305\u62EC\u8282\u70B9\u81EA\u8EAB</p><p>\u8F93\u5165\u63CF\u8FF0: oNode1 \u548C oNode2 \u5728\u540C\u4E00\u6587\u6863\u4E2D\uFF0C\u4E14\u4E0D\u4F1A\u4E3A\u76F8\u540C\u7684\u8282\u70B9</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function commonParentNode(oNode1, oNode2) {
    if(oNode1.contains(oNode2)) {
        return oNode1
    } else {
        // \u4E00\u76F4\u5C06node1\u5411\u4E0A\u5347
        return commonParentNode(oNode1.parentNode,oNode2)
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>contains API</li></ul><blockquote><p>\u67E5\u770Bdom\u5143\u7D20\u5305\u542B\u5173\u7CFB\uFF0C\u5305\u542B\u8FD4\u56DEtrue\uFF0C\u4E0D\u5305\u542B\u8FD4\u56DEfalse <a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FNode%2Fcontains" target="_blank" rel="noopener noreferrer">\u53C2\u8003MDN</a></p></blockquote><ul><li>\u9012\u5F52(\u53C2\u8003\u6570\u636E\u7ED3\u6784\u6811)</li></ul><h3 id="_4-\u6839\u636E\u5305\u540D-\u5728\u6307\u5B9A\u7A7A\u95F4\u4E2D\u521B\u5EFA\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#_4-\u6839\u636E\u5305\u540D-\u5728\u6307\u5B9A\u7A7A\u95F4\u4E2D\u521B\u5EFA\u5BF9\u8C61" aria-hidden="true">#</a> 4. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fa82e035501504cedbe881d08c824a381%3FtpId%3D2%26tqId%3D10854%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6839\u636E\u5305\u540D\uFF0C\u5728\u6307\u5B9A\u7A7A\u95F4\u4E2D\u521B\u5EFA\u5BF9\u8C61</a></h3><blockquote><p>\u6839\u636E\u5305\u540D\uFF0C\u5728\u6307\u5B9A\u7A7A\u95F4\u4E2D\u521B\u5EFA\u5BF9\u8C61 \u8F93\u5165\u63CF\u8FF0: namespace({a: {test: 1, b: 2}}, &#39;a.b.c.d&#39;) \u8F93\u51FA\u63CF\u8FF0: {a: {test: 1, b: {c: {d: {}}}}}</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function namespace(oNamespace, sPackage) {
    let scope = sPackage.split(&#39;.&#39;)
    let ns = oNamespace
    for(let i = 0; i&lt; scope.length; i++) {
        // \u5982\u679C\u5BF9\u8C61\u4E2D\u6CA1\u6709\u8BE5\u5143\u7D20\uFF0C\u6216\u8005\u4E0D\u662F\u5BF9\u8C61\uFF0C\u90A3\u4E48\u5C31\u7F6E\u4E3A\u7A7A\u5BF9\u8C61
       if(!ns.hasOwnProperty(scope[i]) || Object.prototype.toString.call(ns[scope[i]]) !== &#39;[object Object]&#39;) {
            ns[scope[i]] = {}
        }
        // \u7136\u540E\u7EE7\u7EED\u5F80\u4E0B\u627E
        ns = ns[scope[i]]
    }
    return oNamespace
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u8003\u5BDF\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u5224\u65AD\u5BF9\u8C61\u7684\u81EA\u8EAB\u662F\u5426\u6709\u67D0\u5C5E\u6027(hasOwnProperty)</li><li>hasOwnProperty / typeof / in / instanceof \u7684\u533A\u522B</li></ul><blockquote><ul><li>hasOwnProperty \u662F\u5224\u65AD\u5BF9\u8C61\u81EA\u8EAB\u6709\u6CA1\u6709\u67D0\u5C5E\u6027\uFF0C\u4E0D\u5305\u542B\u539F\u578B\u94FE\u7684\u65B9\u6CD5\u3002</li><li>in \u662F\u5224\u65AD\u5BF9\u8C61\u5728\u81EA\u8EAB\u548C\u539F\u578B\u94FE\u4E0A\u6709\u6CA1\u6709\u8BE5\u65B9\u6CD5\u3002</li><li>instanceof \u662F\u5224\u65AD\u5BF9\u8C61\u5728\u539F\u578B\u94FE\u4E0A\u6709\u6CA1\u6709\u8BE5\u65B9\u6CD5\u3002</li><li>typeof \u5224\u65AD\u64CD\u4F5C\u6570\u7684\u7C7B\u578B\uFF0C\u4F46\u662Fnull\u4E5F\u4F1A\u5224\u65AD\u4E3A&quot;object&quot;</li></ul></blockquote><ul><li>\u51C6\u786E\u5224\u65AD\u67D0\u503C\u7684\u7C7B\u578B</li></ul><blockquote><p>Object.prototype.toString.call(123) === &quot;[object Number]&quot; Object.prototype.toString.call(&#39;aaa&#39;) === &quot;[object String]&quot; Object.prototype.toString.call(true) === &quot;[object Boolean]&quot; Object.prototype.toString.call(undefined) === &quot;[object Undefined]&quot; Object.prototype.toString.call(null) === &#39;[object Null]&#39; Object.prototype.toString.call({}) === &#39;[object Object]&#39; Object.prototype.toString.call([]) === &#39;[object Array]&#39; Object.prototype.toString.call(Math) === &quot;[object Math]&quot; Object.prototype.toString.call(new Date()) === &quot;[object Date]&quot; Object.prototype.toString.call(new RegExp) === &quot;[object RegExp]&quot;</p></blockquote><ul><li>\u9012\u5F52(\u5BF9\u8C61\u7684\u5D4C\u5957\u53C2\u8003\u6570\u636E\u7ED3\u6784\u4E2D\u7684\u6811)</li></ul><h3 id="_5-\u6570\u7EC4\u53BB\u91CD" tabindex="-1"><a class="header-anchor" href="#_5-\u6570\u7EC4\u53BB\u91CD" aria-hidden="true">#</a> 5. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F0b5ae9c4a8c546f79e2547c0179bfdc2%3FtpId%3D2%26tqId%3D10855%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6570\u7EC4\u53BB\u91CD</a> \u2B50</h3><blockquote><p>\u4E3A Array \u5BF9\u8C61\u6DFB\u52A0\u4E00\u4E2A\u53BB\u9664\u91CD\u590D\u9879\u7684\u65B9\u6CD5 \u8F93\u5165 [false, true, undefined, null, NaN, 0, 1, {}, {}, &#39;a&#39;, &#39;a&#39;, NaN] \u8F93\u51FA [false, true, undefined, null, NaN, 0, 1, {}, {}, &#39;a&#39;]</p></blockquote><p><u>\u8FD9\u4E2A\u9898\uFF0C\u72D7\u5C31\u72D7\u5728\uFF0C\u8FD8\u6709NaN</u></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u7EC8\u6781\u601D\u8DEF
Array.prototype.uniq = function () {
    return [...new Set(this)]
}

// \u65B9\u6CD5\u4E8C\uFF1Aincludes\u907F\u514DNaN\u7684\u95EE\u9898
Array.prototype.uniq = function () {
    const arr = [];
    this.forEach((val, index) =&gt; {
        if (!arr.includes(val)) {
            arr.push(val)
        }
    })
    return arr;
}

// \u65B9\u6CD5\u4E09\uFF1A\u4F7F\u7528reduce+includes
Array.prototype.uniq = function () {
    return this.reduce((prev, val) =&gt; {
        if (!prev.includes(val)) {
            prev.push(val)
        }
        return prev
    }, [])
}

// \u65B9\u6CD5\u56DB\uFF1A\u666E\u901A\u601D\u8DEF\uFF0C\u904D\u5386\u4E4B\u540E\u6BD4\u8F83\u503C
Array.prototype.uniq = function () {
    let arr = []
    let flag = true
    this.forEach(value =&gt; {
        // == -1 \u6709\u4E24\u79CD\u60C5\u51B5\uFF0C\u4E00\u79CD\u662FNaN\uFF0C\u4E00\u79CD\u662F\u6709\u76F8\u540C\u503C
        if(arr.indexOf(value) === -1) {
            // \u5982\u679C\u662FNaN
            if(value !== value) {
                // flag\u662F\u6807\u8BB0\uFF0C\u7B2C\u4E00\u4E2ANaN\u5C31\u8FDB\uFF0C\u4E4B\u540E\u7684\u5C31\u4E0D\u8FDB\u53BB
                if(flag){
                  arr.push(value)  
                  flag = false
                }
            } else {
                arr.push(value)  
            }
        }
    })
    return arr
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>uniq\u65B9\u6CD5\u4E2D\u7684this\u6307\u5411\u54EA\u91CC?</li></ul><blockquote><p>Array\u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u65B9\u6CD5\u4E2D\u7684this\u6307\u7684\u662F\u6570\u7EC4\u5B9E\u4F8B\u3002</p></blockquote><ul><li>Set\u7684\u7279\u6027</li></ul><blockquote><p>Set\u5B58\u50A8\u7684\u6210\u5458\u662F\u552F\u4E00\u7684\uFF0C\u4E0D\u662F\u91CD\u590D\u7684\uFF0C\u5982\u679C\u6709\u91CD\u590D\u4F1A\u81EA\u52A8\u8FC7\u6EE4\u6389. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2Fc36684658aba" target="_blank" rel="noopener noreferrer">ES6\uFF08\u4E03\uFF09\u2014\u2014 Set &amp; Map</a></p></blockquote><ul><li>(NaN === NaN) =&gt; false</li></ul><blockquote><p>NaN \uFF1A is not a number\uFF0C\u4E0D\u7B49\u4E8E\u81EA\u5DF1 typeof NaN =&gt; number Object.prototype.toString.call(NaN) =&gt; &quot;[object Number]&quot; ES6 \u65B0\u589E\u65B9\u6CD5\uFF1ANumber.isNaN() \u7528\u6765\u5224\u65AD\u662F\u5426\u5C5E\u4E8E\u6570\u5B57</p></blockquote><h3 id="_6-\u6590\u6CE2\u90A3\u5951\u6570\u5217" tabindex="-1"><a class="header-anchor" href="#_6-\u6590\u6CE2\u90A3\u5951\u6570\u5217" aria-hidden="true">#</a> 6. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Faa8ffe28ec7c4050b2aa8bc9d26710e9%3FtpId%3D2%26tqId%3D10856%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6590\u6CE2\u90A3\u5951\u6570\u5217</a></h3><blockquote><p>\u7528 JavaScript \u5B9E\u73B0\u6590\u6CE2\u90A3\u5951\u6570\u5217\u51FD\u6570,\u8FD4\u56DE\u7B2Cn\u4E2A\u6590\u6CE2\u90A3\u5951\u6570\u3002 f(1) = 1, f(2) = 1 \u7B49</p></blockquote><p>\u6590\u6CE2\u90A3\u5951\u6570\u5217\u57FA\u672C\u5B66js\u90FD\u4F1A\uFF0C1 1 2 3 5 8 13\uFF0C\u540E\u4E00\u4E2A\u662F\u524D\u4E24\u4E2A\u7684\u548C\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u9012\u5F52\u601D\u8DEF
function fibonacci(n) {
    if(n === 0) return 0
    if(n === 1 || n === 2) return 1
    return fibonacci(n-1) + fibonacci(n-2)
}

// \u65B9\u6CD5\u4E8C\uFF1A\u8FED\u4EE3\u601D\u8DEF
function fibonacci(n) {
    let num1 = 1
    let num2 = 1
    let sum = 0
    for(let i = 3; i &lt;= n; i++) {
        sum = num1 + num2
        num1 = num2
        num2 = sum
    }
    return sum
}

// \u4E0A\u9762\u5199\u6CD5\u53EF\u4EE5\u8FC7oj\uFF0C\u4F46\u662F\u5982\u679C\u6570\u5B57\u5927\u70B9\u5C31\u8D85\u7EA7\u6162\uFF0C\u4F7F\u7528\u7F13\u5B58\u5F88\u53EF
// \u65B9\u6CD5\u4E09\uFF1A\u9012\u5F52\u4F18\u5316\u601D\u8DEF
function fibonacci(n,cache = {}) {
    // \u6709\u7F13\u5B58\u5C31\u76F4\u63A5\u8BFB\u7F13\u5B58
    if(n in cache) return cache[n]
    if(n === 1 || n === 2) {
        cache[n] = 1
        return 1
    }
    // \u6CA1\u6709\u7F13\u5B58\u7B97\u5B8C\u4E4B\u540E\u5B58\u5165\u7F13\u5B58
    let temp = fibonacci(n-1, cache) + fibonacci(n-2,cache)
    cache[n] = temp
    return temp
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u9012\u5F52</li></ul><h3 id="_7-\u65F6\u95F4\u683C\u5F0F\u5316\u8F93\u51FA" tabindex="-1"><a class="header-anchor" href="#_7-\u65F6\u95F4\u683C\u5F0F\u5316\u8F93\u51FA" aria-hidden="true">#</a> 7. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fa789783e7c984f10a0bf649f6d4e2d59%3FtpId%3D2%26tqId%3D10857%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u65F6\u95F4\u683C\u5F0F\u5316\u8F93\u51FA</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u6309\u6240\u7ED9\u7684\u65F6\u95F4\u683C\u5F0F\u8F93\u51FA\u6307\u5B9A\u7684\u65F6\u95F4 \u683C\u5F0F\u8BF4\u660E \u5BF9\u4E8E 2014.09.05 13:14:20 yyyy: \u5E74\u4EFD\uFF0C2014 yy: \u5E74\u4EFD\uFF0C14 MM: \u6708\u4EFD\uFF0C\u8865\u6EE1\u4E24\u4F4D\uFF0C09 M: \u6708\u4EFD, 9 dd: \u65E5\u671F\uFF0C\u8865\u6EE1\u4E24\u4F4D\uFF0C05 d: \u65E5\u671F, 5 HH: 24\u5236\u5C0F\u65F6\uFF0C\u8865\u6EE1\u4E24\u4F4D\uFF0C13 H: 24\u5236\u5C0F\u65F6\uFF0C13 hh: 12\u5236\u5C0F\u65F6\uFF0C\u8865\u6EE1\u4E24\u4F4D\uFF0C01 h: 12\u5236\u5C0F\u65F6\uFF0C1 mm: \u5206\u949F\uFF0C\u8865\u6EE1\u4E24\u4F4D\uFF0C14 m: \u5206\u949F\uFF0C14 ss: \u79D2\uFF0C\u8865\u6EE1\u4E24\u4F4D\uFF0C20 s: \u79D2\uFF0C20 w: \u661F\u671F\uFF0C\u4E3A [&#39;\u65E5&#39;, &#39;\u4E00&#39;, &#39;\u4E8C&#39;, &#39;\u4E09&#39;, &#39;\u56DB&#39;, &#39;\u4E94&#39;, &#39;\u516D&#39;] \u4E2D\u7684\u67D0\u4E00\u4E2A\uFF0C\u672C demo \u7ED3\u679C\u4E3A \u4E94</p><p>\u8F93\u5165 formatDate(new Date(1409894060000), &#39;yyyy-MM-dd HH:mm:ss \u661F\u671Fw&#39;)</p><p>\u8F93\u51FA 2014-09-05 13:14:20 \u661F\u671F\u4E94</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function formatDate(t,str) {
    let year = &#39;&#39;+t.getFullYear()
    let month = t.getMonth() + 1
    let day = t.getDate()
    let hour = t.getHours()
    let minutes = t.getMinutes()
    let second = t.getSeconds()
    let week = [&#39;\u65E5&#39;,&#39;\u4E00&#39;,&#39;\u4E8C&#39;,&#39;\u4E09&#39;,&#39;\u56DB&#39;,&#39;\u4E94&#39;,&#39;\u516D&#39;]
    let date = {
      &#39;yyyy&#39;: year,
      &#39;yy&#39;: year.slice(2),
      &#39;MM&#39;: ten(month),
      &#39;M&#39;: month,
      &#39;dd&#39;: ten(day),
      &#39;d&#39;: day,
      &#39;HH&#39;: ten(hour),
      &#39;H&#39;: hour,
      &#39;hh&#39;: ten(hour % 12),
      &#39;h&#39;: hour % 12,
      &#39;mm&#39;: ten(minutes),
      &#39;m&#39;: minutes,
      &#39;ss&#39;: ten(second),
      &#39;s&#39;: second,
      &#39;w&#39;: week[t.getDay()]
    }
    for(let key in date) { 
      str = str.replace(key,date[key])
    }
    return str
  }

  // \u4E0D\u8DB310\u7684\u524D\u9762\u8981\u52A00
  const ten = num  =&gt; num &gt;= 10 ? num : &#39;0&#39; + num
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>\u8003\u5BDF\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u83B7\u53D6\u5E74\u6708\u65E5\u5468\u65F6\u5206\u79D2\u7684\u7CFB\u7EDFAPI</li><li>\u683C\u5F0F\u7EDF\u4E00\u5904\u7406</li><li>\u5B57\u7B26\u4E32\u66FF\u6362 (replace)</li></ul><h3 id="_8-\u83B7\u53D6\u5B57\u7B26\u4E32\u7684\u957F\u5EA6" tabindex="-1"><a class="header-anchor" href="#_8-\u83B7\u53D6\u5B57\u7B26\u4E32\u7684\u957F\u5EA6" aria-hidden="true">#</a> 8. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fe436bbc408744b73b69a8925fac26efc%3FtpId%3D2%26tqId%3D10858%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u83B7\u53D6\u5B57\u7B26\u4E32\u7684\u957F\u5EA6</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5982\u679C\u7B2C\u4E8C\u4E2A\u53C2\u6570 bUnicode255For1 === true\uFF0C\u5219\u6240\u6709\u5B57\u7B26\u957F\u5EA6\u4E3A 1 \u5426\u5219\u5982\u679C\u5B57\u7B26 Unicode \u7F16\u7801 &gt; 255 \u5219\u957F\u5EA6\u4E3A 2 \u8F93\u5165 hello world, \u725B\u5BA2&#39;, false \u8F93\u51FA 17</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function strLength(s, bUnicode255For1) {
    if(bUnicode255For1) return s.length;
    let len = s.length
    for(let i = 0; i &lt; s.length; i++) {
        if(s[i].charCodeAt() &gt; 255) len++
    }
    return len
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u83B7\u53D6\u5B57\u7B26\u7684 Unicode \u7F16\u7801 API \u2014\u2014 <u>str.charCodeAt()</u></li></ul><h3 id="_9-\u90AE\u7BB1\u5B57\u7B26\u4E32\u5224\u65AD" tabindex="-1"><a class="header-anchor" href="#_9-\u90AE\u7BB1\u5B57\u7B26\u4E32\u5224\u65AD" aria-hidden="true">#</a> 9. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fc72b2b5472704d4a98597cb74b0257a7%3FtpId%3D2%26tqId%3D10859%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u90AE\u7BB1\u5B57\u7B26\u4E32\u5224\u65AD</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5224\u65AD\u8F93\u5165\u662F\u5426\u662F\u6B63\u786E\u7684\u90AE\u7BB1\u683C\u5F0F</p></blockquote><p>\u8003\u5BDF\u6B63\u5219\u7684\u4E00\u9053\u9898\u76EE\uFF0C\u65B9\u6CD5\u4E5F\u662F\u591A\u79CD\u591A\u6837\uFF0C\u8FD9\u91CC\u53EA\u6709\u4E00\u79CD\u7B80\u5355\u7684\u53C2\u8003\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// ^ \u8868\u793A\u5F00\u5934
// [] \u8868\u793A\u5339\u914D\u5B57\u7B26\u7684\u8303\u56F4
// \\w \u8868\u793A\u6B63\u5E38\u7B26\u53F7 [0-9a-zA-Z_]
// \\. \u662F\u5BF9\u4EFB\u610F\u7B26.\u8FDB\u884C\u8F6C\u4E49\uFF0C\u8868\u793A\u5B57\u7B26.
// + \u8868\u793A\u524D\u9762\u7684\u8868\u8FBE\u5F0F\uFF0C\u4E00\u6B21\u5230\u591A\u6B21
function isAvailableEmail(sEmail) {
    return /^[\\w\\.]+@\\w+\\.\\w+/.test(sEmail)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u90AE\u7BB1\u683C\u5F0F</li><li>\u6B63\u5219\u8868\u8FBE\u5F0F\u7684\u89C4\u5219\u548C\u5339\u914D</li></ul><h3 id="_10-\u989C\u8272\u5B57\u7B26\u4E32\u8F6C\u6362-\u817E\u8BAF\u8003\u9898" tabindex="-1"><a class="header-anchor" href="#_10-\u989C\u8272\u5B57\u7B26\u4E32\u8F6C\u6362-\u817E\u8BAF\u8003\u9898" aria-hidden="true">#</a> 10. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F80b08802a833419f9c4ccc6e042c1cca%3FtpId%3D2%26tqId%3D10860%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u989C\u8272\u5B57\u7B26\u4E32\u8F6C\u6362</a> \u2B50\u817E\u8BAF\u8003\u9898</h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5C06 rgb \u989C\u8272\u5B57\u7B26\u4E32\u8F6C\u6362\u4E3A\u5341\u516D\u8FDB\u5236\u7684\u5F62\u5F0F\uFF0C\u5982 rgb(255, 255, 255) \u8F6C\u4E3A #ffffff</p><ol><li>rgb \u4E2D\u6BCF\u4E2A , \u540E\u9762\u7684\u7A7A\u683C\u6570\u91CF\u4E0D\u56FA\u5B9A</li><li>\u5341\u516D\u8FDB\u5236\u8868\u8FBE\u5F0F\u4F7F\u7528\u516D\u4F4D\u5C0F\u5199\u5B57\u6BCD</li><li>\u5982\u679C\u8F93\u5165\u4E0D\u7B26\u5408 rgb \u683C\u5F0F\uFF0C\u8FD4\u56DE\u539F\u59CB\u8F93\u5165</li></ol><p>\u8F93\u5165 \uFF1A&#39;rgb(255, 255, 255)&#39; \u8F93\u51FA \uFF1A<code>#ffffff</code></p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function rgb2hex(sRGB) {
    // \u6B63\u5219\u5339\u914D\u83B7\u53D6!!\u4E09\u4E2A\u6570\u503C,\\d\u586B\u5145
    let reg = sRGB.match(/^rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)/)
    if(!reg) return sRGB;
    // \u5B57\u7B26\u4E32\u62FC\u63A5
    let str = &#39;#&#39;
    for(let i = 1; i &lt; reg.length; i++) {
      // \u5C06\u5B57\u7B26\u4E32\u8F6C\u6210\u6570\u5B57
      let m = parseInt(reg[i])
      if (m &gt;= 0 &amp;&amp; m &lt;= 255) {
        // \u7136\u540E\u8F6C\u5316\u621016\u8FDB\u5236
        str += (m &gt;= 16 ? m.toString(16) : &#39;0&#39; + m.toString(16))
      } else {
        return sRGB
      }
    }
    return str
  }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>toString\u7684\u8FDB\u5236\u8F6C\u6362</li></ul><blockquote><p>\u989C\u8272\u662F16\u8FDB\u5236\uFF0C\u6240\u4EE5toString(16)\u53EF\u4EE5\u5F97\u5230\u7ED3\u679C</p></blockquote><ul><li>\u5B57\u7B26\u4E32\u4E2D\u5982\u4F55\u622A\u53D6\u6570\u5B57(\u4E0D\u9650\u4E8E\u6B63\u5219) match</li></ul><p><strong>\u6CE8\u610F\uFF1A\u4E00\u5B9A\u8981\u7406\u89E3\u4E4B\u540E\u53BB\u7A0B\u5E8F\u91CC\u9762\u8FD0\u884C\u4E00\u904D\u3002</strong></p>`,74);function r(l,p){return s}var b=n(a,[["render",r],["__file","10.html.vue"]]);export{b as default};
