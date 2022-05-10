import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as a}from"./app.9338189c.js";const e={},s=a(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_31-\u6B63\u786E\u7684\u51FD\u6570\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#_31-\u6B63\u786E\u7684\u51FD\u6570\u5B9A\u4E49" aria-hidden="true">#</a> 31. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fa5de760a7cf24c0e890eb02eed34bc02%3FtpId%3D2%26tqId%3D37885%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6B63\u786E\u7684\u51FD\u6570\u5B9A\u4E49</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u8BF7\u4FEE\u590D\u7ED9\u5B9A\u7684 js \u4EE3\u7801\u4E2D\uFF0C\u51FD\u6570\u5B9A\u4E49\u5B58\u5728\u7684\u95EE\u9898 \u8F93\u5165\uFF1Atrue \u8F93\u51FA\uFF1Aa</p><p>\uFF1F\u597D\u50CF\u6CA1\u6709\u95EE\u9898</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function functions(flag) {
 if (flag) {
   function getValue() { return &#39;a&#39;; }
 } else {
   function getValue() { return &#39;b&#39;; }
 }
 return getValue();
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u4F7F\u7528\u51FD\u6570\u8868\u8FBE\u5F0F
function functions(flag) {
    if (flag) {
      var getValue = ()  =&gt; { return &#39;a&#39;; }
    } else {
      var getValue = () =&gt; { return &#39;b&#39;; }
    }
 
    return getValue();
}

// \u4E0A\u9762\u7684\u7B49\u540C\u4E8E\u4E0B\u9762\u7684\uFF0C\u53D8\u91CF\u63D0\u5347
function functions(flag) {
    var getValue
    if (flag) {
      getValue = () =&gt; { return &#39;a&#39;; }
    } else {
      getValue = () =&gt; { return &#39;b&#39;; }
    }

    return getValue();
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u51FD\u6570\u7684\u5B9A\u4E49\u65B9\u5F0F</li></ul><blockquote><p>\u51FD\u6570\u58F0\u660E\u5F0F\uFF1A<strong>\u51FD\u6570\u58F0\u660E\u5728\u51FD\u6570\u6CA1\u6709\u6267\u884C\u4E4B\u524D\u5C31\u5DF2\u7ECF\u5728\u4F5C\u7528\u57DF\u4E2D\u4F1A\u63D0\u5347\uFF0C\u540C\u540D\u7684\u58F0\u660E\u4F1A\u8FDB\u884C\u8986\u76D6</strong>\uFF0C\u4EE5\u4E0B\u9762\u7684\u4E3A\u51C6\uFF0C\u90A3\u4E48\u7A0B\u5E8F\u6267\u884C\u7684\u65F6\u5019\u4E00\u76F4\u8F93\u51FA\u7684\u5C31\u662Fb\u3002</p><p>\u51FD\u6570\u8868\u8FBE\u5F0F\uFF1A\u4F7F\u7528<strong>\u51FD\u6570\u8868\u8FBE\u5F0F</strong>\uFF0C\u8FD8\u662F\u4F1A\u8FDB\u884C\u53D8\u91CF\u7684\u63D0\u5347\uFF0C\u53EA\u4E0D\u8FC7\u8FD9\u6B21\u63D0\u5347\u7684\u662F\u53D8\u91CFgetValue\uFF0C\u5728\u6267\u884C\u7684\u65F6\u5019\uFF0C\u624D\u4F1A\u6839\u636Eif\u8BED\u53E5\u7684\u6D41\u7A0B\u63A7\u5236\u6267\u884C\u4E0D\u540C\u7684\u51FD\u6570\u3002</p></blockquote><h3 id="_32-\u6B63\u786E\u7684\u4F7F\u7528-parseint" tabindex="-1"><a class="header-anchor" href="#_32-\u6B63\u786E\u7684\u4F7F\u7528-parseint" aria-hidden="true">#</a> 32. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fa14f83473c384abba1bb51017d0dbd42%3FtpId%3D2%26tqId%3D37886%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6B63\u786E\u7684\u4F7F\u7528 parseInt</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u4FEE\u6539 js \u4EE3\u7801\u4E2D parseInt \u7684\u8C03\u7528\u65B9\u5F0F\uFF0C\u4F7F\u4E4B\u901A\u8FC7\u5168\u90E8\u6D4B\u8BD5\u7528\u4F8B \u8F93\u5165\uFF1A&#39;12&#39; \u8F93\u51FA\uFF1A12 \u8F93\u5165\uFF1A &#39;12px&#39; \u8F93\u51FA\uFF1A12 \u8F93\u5165\uFF1A &#39;0x12&#39; \u8F93\u51FA\uFF1A0</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\uFF0C\u786E\u5B9A\u662F10\u8FDB\u5236
function parse2Int(num) {
    return parseInt(num,10);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>parseInt</li></ul><blockquote><p>parseInt\u7ECF\u5E38\u7528\u4E8E\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\u4E2D\u663E\u5F0F\u8F6C\u6362\u6210\u6570\u5B57\uFF0C\u63A5\u6536\u4E24\u4E2A\u53C2\u6570\uFF0C\u8FD4\u56DE\u6570\u503C\u6216\u8005NaN</p><p>parseInt(string, radix) \u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u5B57\u7B26\u4E32\uFF0C\u5FC5\u987B\u4F20\u7684\u3002 \u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u6570\u5B57\u7684\u57FA\u6570\uFF0C2-36\uFF0C\u5982\u679C\u4E0D\u4F20\u6216\u8005\u4F200\u90FD\u662F\u4EE510\u4F4D\u57FA\u6570\u6765\u8BA1\u7B97\uFF0C\u5982\u679C\u5C0F\u4E8E2(\u4E0D\u7B49\u4E8E0)\u6216\u8005\u5927\u4E8E36\u4E00\u5F8B\u8FD4\u56DENaN\uFF0C\u5982\u679C&#39;0x&#39;\u5F00\u5934\u4E3A16\u8FDB\u5236\uFF0C&#39;0&#39;\u5F00\u5934\u4E0D\u5305\u62EC0\u662F8\u8FDB\u5236\u3002</p><p>parseInt\u5F3A\u5236\u7C7B\u578B\u8F6C\u5316\u7684\u65F6\u5019\uFF0C**\u5982\u679C\u7B2C\u4E00\u4F4D\u4E0D\u662F\u6570\u5B57\u5C31\u4F1A\u8FD4\u56DENaN\uFF0C\u5982\u679C\u7B2C\u4E00\u4F4D\u662F\u6570\u5B57\uFF0C\u90A3\u4E48\u4F1A\u628A\u540E\u9762\u662F\u6570\u5B57\u7684\u8FD4\u56DE\uFF0C\u4E0D\u662F\u6570\u5B57\u7684\u8FC7\u6EE4\u6389\u3002**\u5982\u679C\u662F\u5C0F\u6570\u7684\u8BDD\uFF0C<strong>\u4F1A\u5411\u4E0B\u53D6\u6574\u6210\u6574\u6570</strong>\u3002</p></blockquote><h3 id="_33-\u5B8C\u5168\u7B49\u540C" tabindex="-1"><a class="header-anchor" href="#_33-\u5B8C\u5168\u7B49\u540C" aria-hidden="true">#</a> 33. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F1d7e4611cea64950aa3a10caf2529c92%3FtpId%3D2%26tqId%3D37887%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u5B8C\u5168\u7B49\u540C</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5224\u65AD val1 \u548C val2 \u662F\u5426\u5B8C\u5168\u7B49\u540C</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function identity(val1, val2) {
     return val1 === val2
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u7B49\u540C</li></ul><blockquote><p>== \u548C === \u7684\u533A\u522B\uFF0C\u7B80\u5355\u6765\u8BF4\u5728\u4E8E\uFF0C== \u53EA\u5224\u65AD\u503C\u76F8\u540C\uFF0C\u9047\u5230\u95EE\u9898\uFF0C=== \u8FD8\u8981\u5224\u65AD\u7C7B\u578B\u662F\u5426\u76F8\u540C\u3002 \u8FD9\u91CC\u5176\u5B9E\u6211\u89C9\u5F97\u8FD8\u9700\u8981\u8003\u8651NaN\u7684\u95EE\u9898\uFF0CNaN !== NaN</p></blockquote><h3 id="_34-\u6B63\u786E\u7684\u51FD\u6570\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#_34-\u6B63\u786E\u7684\u51FD\u6570\u5B9A\u4E49" aria-hidden="true">#</a> 34. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fa5de760a7cf24c0e890eb02eed34bc02%3FtpId%3D2%26tqId%3D37885%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6B63\u786E\u7684\u51FD\u6570\u5B9A\u4E49</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5B9E\u73B0\u4E00\u4E2A\u6253\u70B9\u8BA1\u65F6\u5668\uFF0C\u8981\u6C42</p><ol><li>\u4ECE start \u5230 end\uFF08\u5305\u542B start \u548C end\uFF09\uFF0C\u6BCF\u9694 100 \u6BEB\u79D2 console.log \u4E00\u4E2A\u6570\u5B57\uFF0C\u6BCF\u6B21\u6570\u5B57\u589E\u5E45\u4E3A 1</li><li>\u8FD4\u56DE\u7684\u5BF9\u8C61\u4E2D\u9700\u8981\u5305\u542B\u4E00\u4E2A cancel \u65B9\u6CD5\uFF0C\u7528\u4E8E\u505C\u6B62\u5B9A\u65F6\u64CD\u4F5C</li><li>\u7B2C\u4E00\u4E2A\u6570\u9700\u8981\u7ACB\u5373\u8F93\u51FA</li></ol></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function count(start, end) {
    // \u7B2C\u4E00\u4E2A\u7ACB\u5373\u8F93\u51FA
    console.log(start++)
    let time = setInterval(function () {
        if(start &gt;= end) clearInterval(time)
        console.log(start++)
    },100)
    return {
        // \u8FD4\u56DE\u7684\u65B9\u6CD5\u662F\u4E00\u4E2A\u51FD\u6570
        cancel: function () {
            clearInterval(time)
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>setInterval</li></ul><blockquote><p>\u8BA1\u65F6\u5668\uFF0C\u5982\u679C\u7B2C\u4E00\u4E2A\u8981\u7ACB\u5373\u8F93\u51FA\uFF0C\u90A3\u4E48\u9700\u8981\u624B\u52A8\u5199\u4E00\u6B21\u3002 \u5B9A\u4E49\u7684\u65F6\u5019\u63A5\u6536\u4E24\u4E2A\u53C2\u6570\uFF0C\u7B2C\u4E00\u4E2A\u662F\u6BCF\u6B21\u6267\u884C\u7684\u51FD\u6570\uFF0C\u7B2C\u4E8C\u4E2A\u662F\u6267\u884C\u65F6\u95F4\u95F4\u9694\u3002 \u8FD4\u56DE\u503C\u63A5\u6536\u8BA1\u65F6\u5668\u540D\u79F0\uFF0C\u53EF\u4EE5\u7528\u4E8E\u6E05\u7A7A\u8BA1\u65F6\u5668\u7528\u3002</p></blockquote><ul><li>\u95ED\u5305</li></ul><h3 id="_35-\u6D41\u7A0B\u63A7\u5236" tabindex="-1"><a class="header-anchor" href="#_35-\u6D41\u7A0B\u63A7\u5236" aria-hidden="true">#</a> 35. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F8a7bff7ab0d345d5ac5c82e41d9f7115%3FtpId%3D2%26tqId%3D37889%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6D41\u7A0B\u63A7\u5236</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5B9E\u73B0 fizzBuzz \u51FD\u6570\uFF0C\u53C2\u6570 num \u4E0E\u8FD4\u56DE\u503C\u7684\u5173\u7CFB\u5982\u4E0B\uFF1A 1\u3001\u5982\u679C num \u80FD\u540C\u65F6\u88AB 3 \u548C 5 \u6574\u9664\uFF0C\u8FD4\u56DE\u5B57\u7B26\u4E32 fizzbuzz 2\u3001\u5982\u679C num \u80FD\u88AB 3 \u6574\u9664\uFF0C\u8FD4\u56DE\u5B57\u7B26\u4E32 fizz 3\u3001\u5982\u679C num \u80FD\u88AB 5 \u6574\u9664\uFF0C\u8FD4\u56DE\u5B57\u7B26\u4E32 buzz 4\u3001\u5982\u679C\u53C2\u6570\u4E3A\u7A7A\u6216\u8005\u4E0D\u662F Number \u7C7B\u578B\uFF0C\u8FD4\u56DE false 5\u3001\u5176\u4F59\u60C5\u51B5\uFF0C\u8FD4\u56DE\u53C2\u6570 num \u8F93\u5165\uFF1A 15 ; \u8F93\u51FA\uFF1A fizzbuzz</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1Aif-else if-else
function fizzBuzz(num) {
    // \u5982\u679Cnum\u4E3A\u7A7A\u6216\u8005\u4E0D\u4F20\uFF0CisNaN\u90FD\u4E3Atrue
    if(isNaN(num)) return false
    if(num % 3 === 0 &amp;&amp; num % 5 === 0) {
        return &#39;fizzbuzz&#39;
    } else if (num % 3 === 0) {
        return &#39;fizz&#39;
    } else if (num % 5 === 0) {
        return &#39;buzz&#39;
    } else {
        return num
    }
}

// \u65B9\u6CD5\u4E8C\uFF1A\u89C2\u5BDF\u5408\u7406\u4F7F\u7528if
function fizzBuzz(num) {
    if (isNaN(num)) return false;
    let str = &#39;&#39;;
    if (num % 3 === 0) str += &#39;fizz&#39;;
    if (num % 5 === 0) str += &#39;buzz&#39;;
    
    return str === &#39;&#39; ? num : str;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u6D41\u7A0B\u63A7\u5236\uFF1Aif-else</li><li>isNaN</li></ul><blockquote><p>isNaN()\uFF0C\u9047\u5230\u4E0D\u662FNumber\u7C7B\u578B\u7684\u5224\u65AD\u90FD\u7528\u8FD9\u4E2A\u51FD\u6570\uFF0C\u5982\u679C\u53C2\u6570\u4E0D\u662F\u6570\u5B57\u5C31\u8FD4\u56DEtrue\uFF0C\u5176\u4ED6\u7684\u5224\u65AD\u6211\u89C9\u5F97\u90FD\u4E0D\u662F\u8FD9\u4E2A\u9898\u8981\u8003\u7684\u3002ES6\u4E4B\u540E\u65B0\u589E\u4E86\u65B9\u6CD5Number.isNaN() \u5224\u65AD\u662F\u5426\u662FNaN</p></blockquote><ul><li>\u53D6\u4F59 %</li></ul><h3 id="_36-\u51FD\u6570\u4F20\u53C2" tabindex="-1"><a class="header-anchor" href="#_36-\u51FD\u6570\u4F20\u53C2" aria-hidden="true">#</a> 36. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F80365a2685144559817e3d5e0c27f3a8%3FtpId%3D2%26tqId%3D37890%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u51FD\u6570\u4F20\u53C2</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5C06\u6570\u7EC4 arr \u4E2D\u7684\u5143\u7D20\u4F5C\u4E3A\u8C03\u7528\u51FD\u6570 fn \u7684\u53C2\u6570 \u8F93\u5165\uFF1A function (greeting, name, punctuation) {return greeting + &#39;, &#39; + name + (punctuation || &#39;!&#39;);}, [&#39;Hello&#39;, &#39;Ellie&#39;, &#39;!&#39;] \u8F93\u51FA\uFF1A Hello, Ellie!</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u91CF\u8EAB\u5B9A\u505A\uFF0C\u4F20\u7684\u662F\u6570\u7EC4
function argsAsArray(fn, arr) {
    return fn.apply(this,arr)
}

// \u65B9\u6CD5\u4E8C\uFF1A\u5982\u679C\u7528call\u5C31\u9700\u8981\u4F7F\u7528\u6269\u5C55\u7B26\u6253\u6563
function argsAsArray(fn, arr) {
    return fn.call(this,...arr)
}

// \u65B9\u6CD5\u4E09\uFF1A\u5982\u679Cbind\u5904\u7406
function argsAsArray(fn, arr) {
    return fn.bind(this,...arr)()
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>apply/call/bind (\u8BE6\u60C5\u89C1\u4E00\u7684\u7B2C\u4E00\u9898)</li><li>fn\u4F20\u53C2\u95EE\u9898</li></ul><h3 id="_37-\u51FD\u6570\u7684\u4E0A\u4E0B\u6587" tabindex="-1"><a class="header-anchor" href="#_37-\u51FD\u6570\u7684\u4E0A\u4E0B\u6587" aria-hidden="true">#</a> 37. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F5e97b94794bd438f893137b2d3b28a6a%3FtpId%3D2%26tqId%3D37891%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u51FD\u6570\u7684\u4E0A\u4E0B\u6587</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5C06\u51FD\u6570 fn \u7684\u6267\u884C\u4E0A\u4E0B\u6587\u6539\u4E3A obj \u5BF9\u8C61 \u8F93\u5165\uFF1A function () {return this.greeting + &#39;, &#39; + this.name + &#39;!!!&#39;;}, {greeting: &#39;Hello&#39;, name: &#39;Rebecca&#39;} \u8F93\u51FA\uFF1AHello, Rebecca!!!</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1Aapply
function speak(fn, obj) {
    return fn.apply(obj)
}

// \u65B9\u6CD5\u4E00\uFF1Acall
function speak(fn, obj) {
    return fn.call(obj)
}

// \u65B9\u6CD5\u4E00\uFF1Abind
function speak(fn, obj) {
    return fn.bind(obj)()
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>this\u6307\u5411</li></ul><blockquote><p>apply/call/bind \u90FD\u53EF\u4EE5\u4FEE\u6539\u6267\u884C\u4E0A\u4E0B\u6587\uFF0C\u5982\u679C\u76F4\u63A5\u8C03\u7528fn\uFF0Cthis\u6307\u7684\u662Fwindow\uFF0C\u5982\u679C\u7528 apply/call/bind \u53EF\u4EE5\u5C06this\u6539\u6210\u5BF9\u8C61obj</p></blockquote><h3 id="_38-\u8FD4\u56DE\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_38-\u8FD4\u56DE\u51FD\u6570" aria-hidden="true">#</a> 38. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F1f9fd23cdfd14675ab10207191e1d035%3FtpId%3D2%26tqId%3D37892%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u8FD4\u56DE\u51FD\u6570</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5B9E\u73B0\u51FD\u6570 functionFunction\uFF0C\u8C03\u7528\u4E4B\u540E\u6EE1\u8DB3\u5982\u4E0B\u6761\u4EF6\uFF1A 1\u3001\u8FD4\u56DE\u503C\u4E3A\u4E00\u4E2A\u51FD\u6570 f 2\u3001\u8C03\u7528\u8FD4\u56DE\u7684\u51FD\u6570 f\uFF0C\u8FD4\u56DE\u503C\u4E3A\u6309\u7167\u8C03\u7528\u987A\u5E8F\u7684\u53C2\u6570\u62FC\u63A5\uFF0C\u62FC\u63A5\u5B57\u7B26\u4E3A\u82F1\u6587\u9017\u53F7\u52A0\u4E00\u4E2A\u7A7A\u683C\uFF0C\u5373 &#39;, &#39; 3\u3001\u6240\u6709\u51FD\u6570\u7684\u53C2\u6570\u6570\u91CF\u4E3A 1\uFF0C\u4E14\u5747\u4E3A String \u7C7B\u578B \u8F93\u5165\uFF1A functionFunction(&#39;Hello&#39;)(&#39;world&#39;) \u8F93\u51FA\uFF1A Hello, world</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u76F4\u63A5\u7528\u6269\u5C55\u8FD0\u7B97\u7B26\u83B7\u53D6\u53C2\u6570
function functionFunction(str) {
    return function f(...arg) {
        // \u8BB0\u5F97\u9017\u53F7\u4E4B\u540E\u8981\u52A0\u4E00\u4E2A\u7A7A\u683C\uFF0C\u624D\u80FD\u8FC7oj
        return str + &#39;, &#39;+arg
    }
}

// \u65B9\u6CD5\u4E8C\uFF1A\u7528\u539F\u751F\u65B9\u6CD5\u83B7\u53D6\u53C2\u6570
function functionFunction(str) {
    return function() {
        return  str+ &#39;, &#39; + arguments[0]
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u95ED\u5305 + \u67EF\u91CC\u5316</li></ul><blockquote><p>\u95ED\u5305\u662F\u4E00\u4E2A\u51FD\u6570\u53EF\u4EE5\u8BBF\u95EE\u53E6\u4E00\u4E2A\u51FD\u6570\u4F5C\u7528\u57DF\u7684\u53D8\u91CF\u3002</p></blockquote><h3 id="_39-\u4F7F\u7528\u95ED\u5305" tabindex="-1"><a class="header-anchor" href="#_39-\u4F7F\u7528\u95ED\u5305" aria-hidden="true">#</a> 39. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F578026cd24e3446bbf27fe565473dc26%3FtpId%3D2%26tqId%3D37893%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u4F7F\u7528\u95ED\u5305</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5B9E\u73B0\u51FD\u6570 makeClosures\uFF0C\u8C03\u7528\u4E4B\u540E\u6EE1\u8DB3\u5982\u4E0B\u6761\u4EF6\uFF1A 1\u3001\u8FD4\u56DE\u4E00\u4E2A\u51FD\u6570\u6570\u7EC4 result\uFF0C\u957F\u5EA6\u4E0E arr \u76F8\u540C 2\u3001\u8FD0\u884C result \u4E2D\u7B2C i \u4E2A\u51FD\u6570\uFF0C\u5373 <code>result[i]()</code>\uFF0C\u7ED3\u679C\u4E0E <code>fn(arr[i])</code> \u76F8\u540C \u8F93\u5165\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>[1, 2, 3], function (x) { 
	return x * x; 
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u8F93\u51FA\uFF1A4</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u95ED\u5305
function makeClosures(arr, fn) {
    let result = []
    for(let i = 0; i &lt; arr.length; i++) {
        result.push(function(){
          return fn(arr[i])  
        })
    }
    return result
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u95ED\u5305</li></ul><blockquote><p>\u4E0A\u9762\u7684\u9898\uFF0C\u5982\u679C\u4E0D\u7528\u95ED\u5305\uFF0C\u90A3\u4E48for\u5FAA\u73AF\u7684\u5636\u543C\uFF0C\u6700\u540E\u8C03\u7528\u51FD\u6570\u7684\u65F6\u5019\uFF0Ci\u90FD\u662Farr.length,\u5982\u679C\u4F7F\u7528\u95ED\u5305\uFF0C\u53EF\u4EE5\u662F\u5F53\u65F6\u5FAA\u73AF\u7684i\u503C\u3002</p></blockquote><h3 id="_40-\u4E8C\u6B21\u5C01\u88C5\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_40-\u4E8C\u6B21\u5C01\u88C5\u51FD\u6570" aria-hidden="true">#</a> 40. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Ffb2d46b99947455a897f2e9fe2268355%3FtpId%3D2%26tqId%3D37894%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u4E8C\u6B21\u5C01\u88C5\u51FD\u6570</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5DF2\u77E5\u51FD\u6570 fn \u6267\u884C\u9700\u8981 3 \u4E2A\u53C2\u6570\u3002\u8BF7\u5B9E\u73B0\u51FD\u6570 partial\uFF0C\u8C03\u7528\u4E4B\u540E\u6EE1\u8DB3\u5982\u4E0B\u6761\u4EF6\uFF1A 1\u3001\u8FD4\u56DE\u4E00\u4E2A\u51FD\u6570 result\uFF0C\u8BE5\u51FD\u6570\u63A5\u53D7\u4E00\u4E2A\u53C2\u6570 2\u3001\u6267\u884C result(str3) \uFF0C\u8FD4\u56DE\u7684\u7ED3\u679C\u4E0E fn(str1, str2, str3) \u4E00\u81F4 \u8F93\u5165\uFF1A <code>var sayIt = function(greeting, name, punctuation) { return greeting + &#39;, &#39; + name + (punctuation || &#39;!&#39;); }; partial(sayIt, &#39;Hello&#39;, &#39;Ellie&#39;)(&#39;!!!&#39;);</code></p><p>\u8F93\u51FA\uFF1AHello, Ellie!!!</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u76F4\u63A5\u8C03\u7528\uFF0C\u56E0\u4E3A\u6CA1\u6709\u6D89\u53CA\u5230this\uFF0C\u8FD9\u91CC\u76F4\u63A5\u7528arguments\u6765\u83B7\u53D6\uFF0C\u56E0\u4E3Aarguments\u662F\u7C7B\u6570\u7EC4
function partial(fn, str1, str2) {
    return function result() {
        return fn(str1,str2,arguments[0])
    }
}

// \u65B9\u6CD5\u4E8C\uFF1A\u7528\u6269\u5C55\u8FD0\u7B97\u7B26\u62FF\u5230\u53C2\u6570\u4F20\u5165\uFF0C\u66F4\u52A0\u7684\u901A\u7528
function partial(fn, str1, str2) {
    return function result(...arg) {
        return fn(str1,str2,arg)
    }
}

// \u65B9\u6CD5\u4E8C\uFF1AES6\u7BAD\u5934\u51FD\u6570\uFF0Cthis\u6307\u7684\u662Fundefined
const partial = (fn, str1, str2) =&gt; str3 =&gt; fn(str1, str2, str3)

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u95ED\u5305</li><li>\u83B7\u53D6\u51FD\u6570\u53C2\u6570arguments</li></ul><blockquote><p>arguments \u7C7B\u6570\u7EC4\uFF0C \u83B7\u53D6\u957F\u5EA6arguments.length \u83B7\u53D6\u5143\u7D20\u7528\u6570\u7EC4\u4E0B\u6807arguments[0] \u83B7\u53D6\u5F53\u524D\u6267\u884C\u7684\u51FD\u6570 arguments.callee (ES5\u4E25\u683C\u6A21\u5F0F\u4E0B\u7981\u7528)</p></blockquote><p>\u540E\u9762\u7684\u4E1C\u897F\u53EF\u80FD\u4F1A\u4E0A\u4E00\u4E9B\u5C0F\u96BE\u5EA6~~~</p>`,63);function r(l,i){return s}var u=n(e,[["render",r],["__file","40.html.vue"]]);export{u as default};
