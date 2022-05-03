import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as a}from"./app.3dedad24.js";const s={},e=a(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_41-\u4F7F\u7528-arguments" tabindex="-1"><a class="header-anchor" href="#_41-\u4F7F\u7528-arguments" aria-hidden="true">#</a> 41. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fdf84fa320cbe49d3b4a17516974b1136%3FtpId%3D2%26tqId%3D37895%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u4F7F\u7528 arguments</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u51FD\u6570 useArguments \u53EF\u4EE5\u63A5\u6536 1 \u4E2A\u53CA\u4EE5\u4E0A\u7684\u53C2\u6570\u3002\u8BF7\u5B9E\u73B0\u51FD\u6570 useArguments\uFF0C\u8FD4\u56DE\u6240\u6709\u8C03\u7528\u53C2\u6570\u76F8\u52A0\u540E\u7684\u7ED3\u679C\u3002\u672C\u9898\u7684\u6D4B\u8BD5\u53C2\u6570\u5168\u90E8\u4E3A Number \u7C7B\u578B\uFF0C\u4E0D\u9700\u8003\u8651\u53C2\u6570\u8F6C\u6362\u3002 \u8F93\u5165\uFF1A1, 2, 3, 4 \u8F93\u51FA\uFF1A10</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u76F4\u63A5\u904D\u5386
function useArguments() {
    let count = 0
    for(let i = 0; i &lt; arguments.length; i++) {
        count+= arguments[i]
    }
    return count
}

// \u65B9\u6CD5\u4E8C\uFF1AES6\uFF0C\u628Aarguments\u8F6C\u5316\u6210\u6570\u7EC4\u7528\u6570\u7EC4\u7684\u65B9\u5F0F\u76F8\u52A0
function useArguments() {
    return Array.from(arguments).reduce((prev, item) =&gt; prev + item, 0)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>arguments \u2014\u2014 \u51FD\u6570\u53C2\u6570\u7684\u83B7\u53D6\u548C\u7C7B\u6570\u7EC4\u7684\u8FD0\u7B97\u3002</li></ul><h3 id="_42-\u4F7F\u7528-apply-\u8C03\u7528\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_42-\u4F7F\u7528-apply-\u8C03\u7528\u51FD\u6570" aria-hidden="true">#</a> 42. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fd47b482e7148497582c7a995df51f393%3FtpId%3D2%26tqId%3D37896%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u4F7F\u7528 apply \u8C03\u7528\u51FD\u6570</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5B9E\u73B0\u51FD\u6570 callIt\uFF0C\u8C03\u7528\u4E4B\u540E\u6EE1\u8DB3\u5982\u4E0B\u6761\u4EF6 1\u3001\u8FD4\u56DE\u7684\u7ED3\u679C\u4E3A\u8C03\u7528 fn \u4E4B\u540E\u7684\u7ED3\u679C 2\u3001fn \u7684\u8C03\u7528\u53C2\u6570\u4E3A callIt \u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u4E4B\u540E\u7684\u5168\u90E8\u53C2\u6570 \u8F93\u5165\uFF1A\u65E0 \u8F93\u51FA\uFF1A\u65E0</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u628A\u53C2\u6570\u4ECE\u7B2C\u4E00\u4E2A\u5F00\u59CB\u622A\u53D6\uFF0C\u7136\u540E\u8C03\u7528apply
function callIt(fn) {
    let newArr = Array.from(arguments).slice(1)
    return fn.apply(this,newArr)
}
// \u540C
function callIt(...arg) {
    let newArr = arg.slice(1)
    return arg[0].apply(this,newArr)
}

// \u65B9\u6CD5\u4E8C\uFF1A\u4F7F\u7528\u89E3\u6784\u8D4B\u503C\u83B7\u53D6\u5269\u4F59\u53C2\u6570
function callIt(fn) {
    let [arg, ...restArg] = arguments
    return fn.apply(this, restArg)
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>apply/arguments</li></ul><h3 id="_43-\u4E8C\u6B21\u5C01\u88C5\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_43-\u4E8C\u6B21\u5C01\u88C5\u51FD\u6570" aria-hidden="true">#</a> 43. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F694afeb930f74392bda01a815219d81b%3FtpId%3D2%26tqId%3D37897%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u4E8C\u6B21\u5C01\u88C5\u51FD\u6570</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5B9E\u73B0\u51FD\u6570 partialUsingArguments\uFF0C\u8C03\u7528\u4E4B\u540E\u6EE1\u8DB3\u5982\u4E0B\u6761\u4EF6\uFF1A 1\u3001\u8FD4\u56DE\u4E00\u4E2A\u51FD\u6570 result 2\u3001\u8C03\u7528 result \u4E4B\u540E\uFF0C\u8FD4\u56DE\u7684\u7ED3\u679C\u4E0E\u8C03\u7528\u51FD\u6570 fn \u7684\u7ED3\u679C\u4E00\u81F4 3\u3001fn \u7684\u8C03\u7528\u53C2\u6570\u4E3A partialUsingArguments \u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u4E4B\u540E\u7684\u5168\u90E8\u53C2\u6570\u4EE5\u53CA result \u7684\u8C03\u7528\u53C2\u6570 \u8F93\u5165\uFF1A \u65E0 \u8F93\u51FA\uFF1A\u65E0</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u7528call\u76F4\u63A5\u6269\u5C55\u8FD0\u7B97\u7B26
function partialUsingArguments(fn) {
    let args = [].slice.call(arguments,1)
    return function result(...newArgs) {
        return fn.call(this,...args,...newArgs)
    }
}

// \u65B9\u6CD5\u4E8C\uFF1A\u7528apply\u63A5\u6536\u6570\u7EC4
function partialUsingArguments(fn) {
    let args = [...arguments].slice(1);
    return function result(...newArgs) {
        return fn.apply(this,args.concat(newArgs))
    }
}

// \u65B9\u6CD5\u4E09\uFF1Abind
function partialUsingArguments(fn) {
    let args = [...arguments].slice(1);
    return function result(...newArgs) {
        return fn.bind(this,...args,...newArgs)()
    }
}
 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>arguments/apply/call/bind</li></ul><h3 id="_44-\u67EF\u91CC\u5316" tabindex="-1"><a class="header-anchor" href="#_44-\u67EF\u91CC\u5316" aria-hidden="true">#</a> 44. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fbb78d69986794470969674a8b504ac00%3FtpId%3D2%26tqId%3D37898%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u67EF\u91CC\u5316</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5DF2\u77E5 fn \u4E3A\u4E00\u4E2A\u9884\u5B9A\u4E49\u51FD\u6570\uFF0C\u5B9E\u73B0\u51FD\u6570 curryIt\uFF0C\u8C03\u7528\u4E4B\u540E\u6EE1\u8DB3\u5982\u4E0B\u6761\u4EF6\uFF1A 1\u3001\u8FD4\u56DE\u4E00\u4E2A\u51FD\u6570 a\uFF0Ca \u7684 length \u5C5E\u6027\u503C\u4E3A 1\uFF08\u5373\u663E\u5F0F\u58F0\u660E a \u63A5\u6536\u4E00\u4E2A\u53C2\u6570\uFF09 2\u3001\u8C03\u7528 a \u4E4B\u540E\uFF0C\u8FD4\u56DE\u4E00\u4E2A\u51FD\u6570 b, b \u7684 length \u5C5E\u6027\u503C\u4E3A 1 3\u3001\u8C03\u7528 b \u4E4B\u540E\uFF0C\u8FD4\u56DE\u4E00\u4E2A\u51FD\u6570 c, c \u7684 length \u5C5E\u6027\u503C\u4E3A 1 4\u3001\u8C03\u7528 c \u4E4B\u540E\uFF0C\u8FD4\u56DE\u7684\u7ED3\u679C\u4E0E\u8C03\u7528 fn \u7684\u8FD4\u56DE\u503C\u4E00\u81F4 5\u3001fn \u7684\u53C2\u6570\u4F9D\u6B21\u4E3A\u51FD\u6570 a, b, c \u7684\u8C03\u7528\u53C2\u6570 \u8F93\u5165 <code>var fn = function (a, b, c) {return a + b + c}; curryIt(fn)(1)(2)(3);</code> \u8F93\u51FA 6</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function curryIt(fn) {
    let len = fn.length // \u51FD\u6570\u7684length\u5C31\u662F\u53C2\u6570\u4E2A\u6570
    let args = []
    return function (arg){
        args.push(arg)
        if(len &gt; args.length) {
            return arguments.callee
        }
        return fn.apply(this, args)
    }
}
 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u67EF\u91CC\u5316</li></ul><blockquote><p><a href="https://juejin.cn/post/6863422127899590663" target="_blank" rel="noopener noreferrer">\u51FD\u6570\u5F0F\u7F16\u7A0B\uFF08\u4E09\uFF09\u2014\u2014 \u67EF\u91CC\u5316</a></p></blockquote><ul><li>\u51FD\u6570\u5F62\u53C2\u957F\u5EA6\u83B7\u53D6\uFF1Afn.length</li></ul><h3 id="_45-\u6216\u8FD0\u7B97" tabindex="-1"><a class="header-anchor" href="#_45-\u6216\u8FD0\u7B97" aria-hidden="true">#</a> 45. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F77f1e6e2f54044d0ad47ab14e3711489%3FtpId%3D2%26tqId%3D37899%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6216\u8FD0\u7B97</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u8FD4\u56DE\u53C2\u6570 a \u548C b \u7684\u903B\u8F91\u6216\u8FD0\u7B97\u7ED3\u679C \u8F93\u5165\uFF1A false, true ; \u8F93\u51FA\uFF1A true</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u76F4\u63A5\u6216\u8FD0\u7B97\u7B26
function or(a, b) {
    return a || b
}

// \u65B9\u6CD5\u4E8C\uFF1A\u4F4D\u8FD0\u7B97\u4E2D\u7684\u6216\u8FD0\u7B97\uFF0C\u8FD4\u56DE0\u6216\u80051\uFF0C\u9700\u8981\u8F6C\u5316\u7C7B\u578B\u4E3A\u5E03\u5C14\u503C
function or(a, b) {
    return a | b ? true : false
}
 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u6216\u8FD0\u7B97</li></ul><blockquote><p>|| \u8FD0\u7B97\u7B26\uFF0Ca\u548Cb\u90FD\u4E3Afalse\uFF0C\u624D\u662Ffalse\uFF0C\u5176\u4E2D\u4E00\u4E2A\u6709true\uFF0C\u5C31\u662Ffalse | \u8FD0\u7B97\u7B26\uFF0C\u662F\u4F4D\u8FD0\u7B97\uFF0C\u4F4D\u7F6E\u4E0A\u90FD\u662F0\u624D\u8FD4\u56DE0\uFF0C\u4F4D\u7F6E\u4E0A\u6709\u4E00\u4E2A1\u5C31\u8FD4\u56DE1\uFF0C\u5982\u679C\u8FD4\u56DE\u9700\u8981\u5E03\u5C14\u503C\uFF0C\u9700\u8981\u8F6C\u5316</p></blockquote><h3 id="_46-\u4E14\u8FD0\u7B97" tabindex="-1"><a class="header-anchor" href="#_46-\u4E14\u8FD0\u7B97" aria-hidden="true">#</a> 46. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F608780935ae44babb9785485bb650a76%3FtpId%3D2%26tqId%3D37900%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u4E14\u8FD0\u7B97</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u8FD4\u56DE\u53C2\u6570 a \u548C b \u7684\u903B\u8F91\u4E14\u8FD0\u7B97\u7ED3\u679C \u8F93\u5165\uFF1A false, true \u8F93\u51FA\uFF1A false</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u4E14\u8FD0\u7B97\u7B26\uFF0C\u8FD4\u56DE\u5E03\u5C14\u503C
function and(a, b) {
    return a &amp;&amp; b
}

// \u65B9\u6CD5\u4E8C\uFF1A\u4F4D\u8FD0\u7B97\u7684\u4E14\u8FD0\u7B97\u7B26\uFF0C\u8FD4\u56DE 0 \u548C 1\uFF0C\u9700\u8981\u8F6C\u5316\u6210\u5E03\u5C14\u503C
function and(a, b) {
    return a &amp; b ? true : false
}

 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u4E14\u8FD0\u7B97</li></ul><blockquote><p>&amp;&amp; \u8FD0\u7B97\u7B26\uFF0Ca\u548Cb\u90FD\u4E3Atrue\uFF0C\u624D\u662Ftrue\uFF0C\u5176\u4E2D\u4E00\u4E2A\u6709false\uFF0C\u5C31\u662Ffalse &amp; \u8FD0\u7B97\u7B26\uFF0C\u662F\u4F4D\u8FD0\u7B97\uFF0C\u4F4D\u7F6E\u4E0A\u90FD\u662F1\u624D\u8FD4\u56DE1\uFF0C\u4F4D\u7F6E\u4E0A\u6709\u4E00\u4E2A0\u5C31\u8FD4\u56DE0\uFF0C\u5982\u679C\u8FD4\u56DE\u9700\u8981\u5E03\u5C14\u503C\uFF0C\u9700\u8981\u8F6C\u5316</p></blockquote><h3 id="_47-\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#_47-\u6A21\u5757" aria-hidden="true">#</a> 47. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F48e53feaabe94506a61300edadb5496d%3FtpId%3D2%26tqId%3D37901%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6A21\u5757</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5B8C\u6210\u51FD\u6570 createModule\uFF0C\u8C03\u7528\u4E4B\u540E\u6EE1\u8DB3\u5982\u4E0B\u8981\u6C42\uFF1A 1\u3001\u8FD4\u56DE\u4E00\u4E2A\u5BF9\u8C61 2\u3001\u5BF9\u8C61\u7684 greeting \u5C5E\u6027\u503C\u7B49\u4E8E str1\uFF0C name \u5C5E\u6027\u503C\u7B49\u4E8E str2 3\u3001\u5BF9\u8C61\u5B58\u5728\u4E00\u4E2A sayIt \u65B9\u6CD5\uFF0C\u8BE5\u65B9\u6CD5\u8FD4\u56DE\u7684\u5B57\u7B26\u4E32\u4E3A greeting\u5C5E\u6027\u503C + &#39;, &#39; + name\u5C5E\u6027\u503C</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u5BF9\u8C61
function createModule(str1, str2) {
    return  {
        greeting: str1,
        name: str2,
        sayIt: function (){
            return this.greeting + &#39;, &#39; + this.name
        }
    }
}

// \u65B9\u6CD5\u4E8C\uFF1A \u6784\u9020\u51FD\u6570
function createModule(str1, str2) {
    function Obj() {
        this.greeting = str1
        this.name = str2
    }
    Obj.prototype.sayIt = function () {
        return this.greeting + &#39;, &#39; + this.name
    }
    return new Obj
}
 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u6A21\u5757\u5316\u3001\u6784\u9020\u51FD\u6570\u3001\u5BF9\u8C61</li></ul><h3 id="_48-\u4E8C\u8FDB\u5236\u8F6C\u6362" tabindex="-1"><a class="header-anchor" href="#_48-\u4E8C\u8FDB\u5236\u8F6C\u6362" aria-hidden="true">#</a> 48. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F2c7f25d532aa4e20b67af9d3c93dc65f%3FtpId%3D2%26tqId%3D37902%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u4E8C\u8FDB\u5236\u8F6C\u6362</a>\u2B50</h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u83B7\u53D6\u6570\u5B57 num \u4E8C\u8FDB\u5236\u5F62\u5F0F\u7B2C bit \u4F4D\u7684\u503C\u3002\u6CE8\u610F\uFF1A 1\u3001bit \u4ECE 1 \u5F00\u59CB 2\u3001\u8FD4\u56DE 0 \u6216 1 3\u3001\u4E3E\u4F8B\uFF1A2 \u7684\u4E8C\u8FDB\u5236\u4E3A 10\uFF0C\u7B2C 1 \u4F4D\u4E3A 0\uFF0C\u7B2C 2 \u4F4D\u4E3A 1 \u8F93\u5165\uFF1A 128\uFF0C8 \u8F93\u51FA\uFF1A 1</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1Awhile\u5FAA\u73AF
function valueAtBit(num, bit) {
    let arr = []
    while(num){
        arr.push(num % 2)
        num = Math.floor(num / 2)
    }
    return arr[bit-1]
}

// \u65B9\u6CD5\u4E8C\uFF1A\u4F4D\u8FD0\u7B97\u53F3\u79FB &gt;&gt; \u4F4D\u6570 - 1 \u7136\u540E\u53D6\u6A21 2
function valueAtBit(num, bit) {
    return (num &gt;&gt; bit - 1) % 2
}
 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u4E8C\u8FDB\u5236\u6570\u503C\u8FD0\u7B97</li><li>\u53D6\u6A21</li><li>\u4F4D\u8FD0\u7B97\u7B26 \u5DE6\u79FB &gt;&gt; \u53F3\u79FB &lt;&lt; \u65E0\u7B26\u53F7\u4F4D\u53F3\u79FB &lt;&lt;&lt;</li></ul><h3 id="_49-\u4E8C\u8FDB\u5236\u8F6C\u6362" tabindex="-1"><a class="header-anchor" href="#_49-\u4E8C\u8FDB\u5236\u8F6C\u6362" aria-hidden="true">#</a> 49. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F4123561150114d119ba41f28219a454f%3FtpId%3D2%26tqId%3D37903%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u4E8C\u8FDB\u5236\u8F6C\u6362</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u7ED9\u5B9A\u4E8C\u8FDB\u5236\u5B57\u7B26\u4E32\uFF0C\u5C06\u5176\u6362\u7B97\u6210\u5BF9\u5E94\u7684\u5341\u8FDB\u5236\u6570\u5B57 \u8F93\u5165\uFF1A&#39;11000000&#39; \u8F93\u51FA\uFF1A192</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1AparseInt(str,2) 

// \u65B9\u6CD5\u4E8C\uFF1A((1 * 1) * 2 + 1 * 1) * 2 + 0 * 1 ...
function base10(str) {
    let count = 0
    for(let i = 0; i &lt; str.length; i++) {
        count = count * 2 + str[i]*1
    }
    return count
}

// \u65B9\u6CD5\u4E09\uFF1A1 * (2 ** 7) + 1 * (2 ** 6) + 0 * (2 ** 5) + ...
function base10(str) {
    let num = 0
    for(let i = 0; i &lt; str.length; i++) {
        num += str[i] * Math.pow(2,str.length -1 - i)
    }
    return num
}
 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u8FDB\u5236\u8F6C\u6362</li></ul><blockquote><p>\u4E8C\u8FDB\u5236\u8F6C\u5341\u8FDB\u5236\uFF0C\u4ECE\u6700\u9AD8\u4F4D\u5F00\u59CB\u4E582\uFF0C\u5341\u8FDB\u5236\u8F6C\u4E8C\u8FDB\u5236\uFF0C\u96642\u53D6\u4F59\u540E\u53D6\u9006\u5411</p></blockquote><h3 id="_50-\u4E8C\u8FDB\u5236\u8F6C\u6362" tabindex="-1"><a class="header-anchor" href="#_50-\u4E8C\u8FDB\u5236\u8F6C\u6362" aria-hidden="true">#</a> 50. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F7b74386695cc48349af37196f45e62a8%3FtpId%3D2%26tqId%3D37904%26rp%3D1%26ru%3D%2Factivity%2Foj%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u4E8C\u8FDB\u5236\u8F6C\u6362</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5C06\u7ED9\u5B9A\u6570\u5B57\u8F6C\u6362\u6210\u4E8C\u8FDB\u5236\u5B57\u7B26\u4E32\u3002\u5982\u679C\u5B57\u7B26\u4E32\u957F\u5EA6\u4E0D\u8DB3 8 \u4F4D\uFF0C\u5219\u5728\u524D\u9762\u8865 0 \u5230\u6EE18\u4F4D\u3002 \u8F93\u5165\uFF1A65 \u8F93\u51FA\uFF1A01000001(\u5B57\u7B26\u4E32)</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u8F6C\u5316\u4E4B\u540E\u68C0\u67E5\u4F4D(\u7B97\u6CD5\u601D\u7EF4\uFF0C\u63A8\u8350)
function convertToBinary(num) {
    let arr = []
    while(num) {
        arr.push(num % 2)
        num = num &gt;&gt; 1
    }
    let str = &#39;&#39;
    let len = arr.length &gt; 8 ? arr.length : 8
    for(let i = len - 1; i &gt;= 0; i--){
        str = arr[i] ? str + &#39;1&#39; : str + &#39;0&#39;
    }
    return str
}

// \u65B9\u6CD5\u4E8C\uFF1A
function convertToBinary(num) {
    let arr = []
    while(num) {
        arr.push(num % 2)
        num = Math.floor(num / 2)
    }
    while(arr.length &lt; 8) {
        arr.push(&#39;0&#39;)
    }
    return arr.reverse().join(&#39;&#39;)
}

// \u65B9\u6CD5\u4E09\uFF1A\u4F7F\u7528API\u8F6C\u5316\u6210\u4E8C\u8FDB\u5236\u7136\u540E\u770B\u7F3A\u7684(\u5C3D\u91CF\u4E0D\u8981\u524D\u9762\u52A0\u5B57\u7B26\u4E32\uFF0C\u6027\u80FD\u6D88\u8017\u5927)
function convertToBinary(num) {
    var str = num.toString(2);
    while(str.length &lt; 8) {
        str = &quot;0&quot; + str;
    }
    return str;
}

// \u65B9\u6CD5\u56DB\uFF1A\u56E0\u4E3ApadStart\u65E0\u6CD5\u8FC7AJ
function convertToBinary(num) {
    let arr = []
    while(num) {
        arr.push(num % 2)
        num = Math.floor(num / 2)
    }
    return arr.reverse().join(&#39;&#39;).padStart(8, &#39;0&#39;)
}
 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u4E8C\u8FDB\u5236\u8F6C\u6362</li></ul><p>\u8FD8\u6709\u4E00\u4E2A\u5C31\u80DC\u5229\u4E86\uFF0C\u771F\u7684\u662F\u7531\u6D45\u5230\u96BE\u7684\u6DF1\u5EA6~~~~</p>`,57);function r(l,p){return e}var b=n(s,[["render",r],["__file","50.html.vue"]]);export{b as default};
