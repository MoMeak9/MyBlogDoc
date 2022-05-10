import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as e}from"./app.9338189c.js";const a={},r=e(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_11-\u5C06\u5B57\u7B26\u4E32\u8F6C\u6362\u4E3A\u9A7C\u5CF0\u683C\u5F0F" tabindex="-1"><a class="header-anchor" href="#_11-\u5C06\u5B57\u7B26\u4E32\u8F6C\u6362\u4E3A\u9A7C\u5CF0\u683C\u5F0F" aria-hidden="true">#</a> 11. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F2ded24e34ec34325a62d42d0c8479bae%3FtpId%3D2%26tqId%3D10861%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u5C06\u5B57\u7B26\u4E32\u8F6C\u6362\u4E3A\u9A7C\u5CF0\u683C\u5F0F</a> \u2B50</h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 css \u4E2D\u7ECF\u5E38\u6709\u7C7B\u4F3C background-image \u8FD9\u79CD\u901A\u8FC7 - \u8FDE\u63A5\u7684\u5B57\u7B26\uFF0C\u901A\u8FC7 javascript \u8BBE\u7F6E\u6837\u5F0F\u7684\u65F6\u5019\u9700\u8981\u5C06\u8FD9\u79CD\u6837\u5F0F\u8F6C\u6362\u6210 backgroundImage \u9A7C\u5CF0\u683C\u5F0F\uFF0C\u8BF7\u5B8C\u6210\u6B64\u8F6C\u6362\u529F\u80FD</p><ol><li>\u4EE5 - \u4E3A\u5206\u9694\u7B26\uFF0C\u5C06\u7B2C\u4E8C\u4E2A\u8D77\u7684\u975E\u7A7A\u5355\u8BCD\u9996\u5B57\u6BCD\u8F6C\u4E3A\u5927\u5199</li><li>-webkit-border-image \u8F6C\u6362\u540E\u7684\u7ED3\u679C\u4E3A webkitBorderImage</li></ol><p>\u8F93\u5165 \uFF1A &#39;font-size&#39; \u8F93\u51FA \uFF1A fontSize</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function cssStyle2DomStyle(sName) {
    let arr = sName.split(&#39;-&#39;)
    for(let i = (arr[0] ? 1 : 2); i &lt; arr.length; i++) { // \u5206\u6790\u5B57\u7B26\u4E32\u9996\u5C3E\u662F\u5426\u6709-
        arr[i] = arr[i].slice(0,1).toUpperCase()+arr[i].slice(1)
    }
    return arr.join(&#39;&#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u6570\u7EC4\u5E38\u7528\u65B9\u6CD5 <ul><li>split/join</li><li>toUpperCase() \u2014\u2014 toUpperCase\u5C06\u5C0F\u5199\u5B57\u7B26\u8F6C\u6210\u5927\u5199\uFF0CtoLowerCase\u5C06\u5927\u5199\u5B57\u7B26\u8F6C\u6210\u5C0F\u5199</li><li>slice</li></ul></li></ul><h3 id="_12-\u5B57\u7B26\u4E32\u5B57\u7B26\u7EDF\u8BA1" tabindex="-1"><a class="header-anchor" href="#_12-\u5B57\u7B26\u4E32\u5B57\u7B26\u7EDF\u8BA1" aria-hidden="true">#</a> 12. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F777d0cd160de485cae0b1fd1dd973b44%3FtpId%3D2%26tqId%3D10862%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u5B57\u7B26\u4E32\u5B57\u7B26\u7EDF\u8BA1</a>\u2B50</h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u7EDF\u8BA1\u5B57\u7B26\u4E32\u4E2D\u6BCF\u4E2A\u5B57\u7B26\u7684\u51FA\u73B0\u9891\u7387\uFF0C\u8FD4\u56DE\u4E00\u4E2A Object\uFF0Ckey \u4E3A\u7EDF\u8BA1\u5B57\u7B26\uFF0Cvalue \u4E3A\u51FA\u73B0\u9891\u7387</p><ol><li>\u4E0D\u9650\u5236 key \u7684\u987A\u5E8F</li><li>\u8F93\u5165\u7684\u5B57\u7B26\u4E32\u53C2\u6570\u4E0D\u4F1A\u4E3A\u7A7A</li><li>\u5FFD\u7565\u7A7A\u767D\u5B57</li></ol><p>\u8F93\u5165 : &#39;hello world&#39; \u8F93\u51FA \uFF1A{h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1}</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>function count(str) {
    let obj = {}
    for (let i = 0; i &lt; str.length; i++) {
        // \u53BB\u6389\u7A7A\u767D\u5B57\u7B26
        if(str[i] !== &#39; &#39;) {
            // \u5982\u679C\u6709\u8BE5\u5C5E\u6027\u5C31+1\uFF0C\u6CA1\u6709\u5C31\u8BBE\u7F6E\u503C\u4E3A1
            obj[str[i]] = obj.hasOwnProperty(str[i]) ? obj[str[i]] + 1 : 1
            // obj[str[i]] = obj[str[i]] ? obj[str[i]] + 1 : 1
        }
    }
    return obj
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u5BF9\u8C61\u8D4B\u503C</li><li>hasOwnProperty</li></ul><h3 id="_13-\u52A0\u7C97\u6587\u5B57" tabindex="-1"><a class="header-anchor" href="#_13-\u52A0\u7C97\u6587\u5B57" aria-hidden="true">#</a> 13. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F919c502e497f4c53a3f7c336beec7cb4%3FtpId%3D2%26tqId%3D33258%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u52A0\u7C97\u6587\u5B57</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u4F7F\u7528\u4E00\u4E2A\u6807\u7B7E\u5C06\u201C\u725B\u5BA2\u7F51\u201D\u4E09\u4E2A\u5B57\u52A0\u7C97\u663E\u793A</p></blockquote><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>&lt;!--\u65B9\u6CD5\u4E00\uFF1Ahtml--&gt;
&lt;p&gt;&lt;strong&gt;\u725B\u5BA2\u7F51&lt;/strong&gt;\uFF0C\u7A0B\u5E8F\u5458\u5FC5\u5907\u6C42\u804C\u795E\u5668&lt;/p&gt;

&lt;!--\u65B9\u6CD5\u4E8C\uFF1Ajs\u6807\u7B7E\u9009\u62E9\u5668--&gt;
let p = document.getElementsByTagName(&#39;p&#39;)[0]
p.innerHTML = p.innerText.replace(&#39;\u725B\u5BA2\u7F51&#39;,&#39;&lt;strong&gt;\u725B\u5BA2\u7F51&lt;/strong&gt;&#39;)

&lt;!--\u65B9\u6CD5\u4E8C\uFF1Ajs h5\u9009\u62E9\u5668--&gt;
let p = document.querySelector(&#39;p&#39;);
p.innerHTML = p.innerText.replace(&#39;\u725B\u5BA2\u7F51&#39;,&#39;&lt;strong&gt;\u725B\u5BA2\u7F51&lt;/strong&gt;&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u83B7\u53D6\u5143\u7D20\u53CA\u5143\u7D20\u5185\u5BB9</li><li>\u52A0\u7C97\u6807\u7B7E</li></ul><h3 id="_14-\u6BB5\u843D\u6807\u8BC6" tabindex="-1"><a class="header-anchor" href="#_14-\u6BB5\u843D\u6807\u8BC6" aria-hidden="true">#</a> 14. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F0f318b9b88fa44339b588147e0a5e7b7%3FtpId%3D2%26tqId%3D33259%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6BB5\u843D\u6807\u8BC6</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u8BF7\u5C06\u4E0B\u9762\u8FD9\u53E5\u8BDD\u4EE5\u6BB5\u843D\u7684\u5F62\u5F0F\u5C55\u793A\u5728\u6D4F\u89C8\u5668\u4E2D\u2014\u2014\u201C\u725B\u5BA2\u7F51\u662F\u4E00\u4E2A\u4E13\u6CE8\u4E8E\u7A0B\u5E8F\u5458\u7684\u5B66\u4E60\u548C\u6210\u957F\u7684\u4E13\u4E1A\u5E73\u53F0\u3002\u201D</p></blockquote><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>&lt;!--\u65B9\u6CD5\u4E00\uFF1Ahtml--&gt;
&lt;p&gt;\u725B\u5BA2\u7F51\u662F\u4E00\u4E2A\u4E13\u6CE8\u4E8E\u7A0B\u5E8F\u5458\u7684\u5B66\u4E60\u548C\u6210\u957F\u7684\u4E13\u4E1A\u5E73\u53F0\u3002&lt;/p&gt;

&lt;!--\u65B9\u6CD5\u4E8C\uFF1Ajs--&gt;
let p = document.createElement(&#39;p&#39;)
p.innerHTML = &#39;\u725B\u5BA2\u7F51\u662F\u4E00\u4E2A\u4E13\u6CE8\u4E8E\u7A0B\u5E8F\u5458\u7684\u5B66\u4E60\u548C\u6210\u957F\u7684\u4E13\u4E1A\u5E73\u53F0\u3002&#39;
document.querySelector(&#39;body&#39;).append(p)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u521B\u5EFA\u6807\u7B7EcreateElement</li><li>\u5C06\u5143\u7D20\u6DFB\u52A0\u5230body\u4E2D append()</li></ul><h3 id="_15-\u8BBE\u7F6E\u6587\u5B57\u989C\u8272" tabindex="-1"><a class="header-anchor" href="#_15-\u8BBE\u7F6E\u6587\u5B57\u989C\u8272" aria-hidden="true">#</a> 15. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F679e4b1089a444e799736cde61d51bc6%3FtpId%3D2%26tqId%3D33260%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u8BBE\u7F6E\u6587\u5B57\u989C\u8272</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u8BF7\u4F7F\u7528\u5D4C\u5165\u6837\u5F0F\u5C06\u6240\u6709p\u6807\u7B7E\u8BBE\u7F6E\u4E3A\u7EA2\u8272\u6587\u5B57</p></blockquote><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>&lt;!--\u65B9\u6CD5\u4E00\uFF1A\u884C\u5185\u6837\u5F0F--&gt;
&lt;p style=&quot;color:red;&quot;&gt;\u6B22\u8FCE\u6765\u5230\u725B\u5BA2\u7F51&lt;/p&gt;
&lt;p style=&quot;color:red;&quot;&gt;\u5728\u8FD9\u91CC\uFF0C\u6211\u4EEC\u4E3A\u4F60\u63D0\u4F9B\u4E86IT\u540D\u4F01\u7684\u7B14\u8BD5\u9762\u8BD5\u9898\u5E93&lt;/p&gt;
&lt;p style=&quot;color:red;&quot;&gt;\u5728\u8FD9\u91CC\uFF0C\u6211\u4EEC\u4EE5\u9898\u4F1A\u53CB&lt;/p&gt;
&lt;p style=&quot;color:red;&quot;&gt;QQ\u7FA4\u53F7\uFF1A272820159&lt;/p&gt;
&lt;!--\u65B9\u6CD5\u4E8C\uFF1Acss\u6837\u5F0F--&gt;
&lt;style&gt;
    p {
        color: red;
    }
&lt;/style&gt;
&lt;p&gt;\u6B22\u8FCE\u6765\u5230\u725B\u5BA2\u7F51&lt;/p&gt;
&lt;p&gt;\u5728\u8FD9\u91CC\uFF0C\u6211\u4EEC\u4E3A\u4F60\u63D0\u4F9B\u4E86IT\u540D\u4F01\u7684\u7B14\u8BD5\u9762\u8BD5\u9898\u5E93&lt;/p&gt;
&lt;p&gt;\u5728\u8FD9\u91CC\uFF0C\u6211\u4EEC\u4EE5\u9898\u4F1A\u53CB&lt;/p&gt;
&lt;p&gt;QQ\u7FA4\u53F7\uFF1A272820159&lt;/p&gt;

&lt;!--\u65B9\u6CD5\u4E00\uFF1Ajs--&gt;
let p = document.querySelectorAll(&#39;p&#39;)
for(let i = 0; i &lt; p.length; i++) {
    p[i].style.color = &#39;red&#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9:</p><ul><li>\u83B7\u53D6\u6240\u6709p\u5143\u7D20\uFF1AquerySelectorAll</li><li>\u7ED9\u5143\u7D20\u8BBE\u7F6Estyle\u6837\u5F0F\uFF1Adom.style.color</li></ul><h3 id="_16-\u67E5\u627E\u6570\u7EC4\u5143\u7D20\u4F4D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_16-\u67E5\u627E\u6570\u7EC4\u5143\u7D20\u4F4D\u7F6E" aria-hidden="true">#</a> 16. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fe7835a8113dd48afb15f77ef8d1dcb1d%3FtpId%3D2%26tqId%3D37870%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u67E5\u627E\u6570\u7EC4\u5143\u7D20\u4F4D\u7F6E</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u627E\u51FA\u5143\u7D20 item \u5728\u7ED9\u5B9A\u6570\u7EC4 arr \u4E2D\u7684\u4F4D\u7F6E \u8F93\u51FA\u63CF\u8FF0: \u5982\u679C\u6570\u7EC4\u4E2D\u5B58\u5728 item\uFF0C\u5219\u8FD4\u56DE\u5143\u7D20\u5728\u6570\u7EC4\u4E2D\u7684\u4F4D\u7F6E\uFF0C\u5426\u5219\u8FD4\u56DE -1 \u8F93\u5165\uFF1A[ 1, 2, 3, 4 ], 3 \u8F93\u51FA\uFF1A2</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u7B80\u5355\u904D\u5386
function indexOf(arr, item) {
    for(let i = 0; i &lt; arr.length; i++) {
        if(arr[i] === item) return i
    }
    return -1
}

// \u65B9\u6CD5\u4E8C\uFF1A ES6\u65B0\u589E\u6570\u7EC4\u65B9\u6CD5
function indexOf(arr, item) {
    return arr.findIndex(val =&gt; val === item)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u6570\u7EC4\u904D\u5386</li><li>\u51FD\u6570\u8FD4\u56DE\u503C</li></ul><h3 id="_17-\u6570\u7EC4\u6C42\u548C" tabindex="-1"><a class="header-anchor" href="#_17-\u6570\u7EC4\u6C42\u548C" aria-hidden="true">#</a> 17. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fcc3ce199461c4c4cb8f63db61d7eba30%3FtpId%3D2%26tqId%3D37871%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6570\u7EC4\u6C42\u548C</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u8BA1\u7B97\u7ED9\u5B9A\u6570\u7EC4 arr \u4E2D\u6240\u6709\u5143\u7D20\u7684\u603B\u548C \u8F93\u5165\u63CF\u8FF0: \u6570\u7EC4\u4E2D\u7684\u5143\u7D20\u5747\u4E3A Number \u7C7B\u578B \u8F93\u5165 \uFF1A [ 1, 2, 3, 4 ] \u8F93\u51FA \uFF1A 10</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u7B80\u5355\u65B9\u6CD5\uFF0C\u666E\u901Afor\u5FAA\u73AF\u8FD9\u91CC\u4E0D\u591A\u52A0\u4ECB\u7ECD
function sum(arr) {
    let count = 0
    arr.forEach((value, index) =&gt; {
        count+=value
    })
    return count
}

// \u65B9\u6CD5\u4E8C\uFF1Areduce
function sum(arr) {
    return arr.reduce((prev, item) =&gt; item + prev,0)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u6570\u7EC4\u904D\u5386</li><li>reduce</li></ul><h3 id="_18-\u79FB\u9664\u6570\u7EC4\u4E2D\u7684\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#_18-\u79FB\u9664\u6570\u7EC4\u4E2D\u7684\u5143\u7D20" aria-hidden="true">#</a> 18. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fedbc7496a36e433c89d298b9256af856%3FtpId%3D2%26tqId%3D37872%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u79FB\u9664\u6570\u7EC4\u4E2D\u7684\u5143\u7D20</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u79FB\u9664\u6570\u7EC4 arr \u4E2D\u7684\u6240\u6709\u503C\u4E0E item \u76F8\u7B49\u7684\u5143\u7D20\u3002\u4E0D\u8981\u76F4\u63A5\u4FEE\u6539\u6570\u7EC4 arr\uFF0C\u7ED3\u679C\u8FD4\u56DE\u65B0\u7684\u6570\u7EC4 \u8F93\u5165 : [1, 2, 3, 4, 2], 2 \u8F93\u51FA : [1, 3, 4]</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u7B80\u5355\u904D\u5386
function remove(arr, item) {
    let newArr = []
    arr.forEach(value =&gt;{
        if(value !== item) newArr.push(value)
    })
    return newArr
}

// \u65B9\u6CD5\u4E8C\uFF1Afilter\u8FC7\u6EE4\u65B9\u6CD5
function remove(arr, item) {
    return arr.filter(val =&gt; val !== item)
}

// \u65B9\u6CD5\u4E09\uFF1A\u65B0\u6570\u7EC4\u4E2D\u4F7F\u7528splice\u5220\u9664
function remove(arr, item) {
    let newArr = arr.slice(0)
    for(let i = newArr.length - 1; i &gt;= 0 ; i--) {
        if(newArr[i] === item) newArr.splice(i, 1)
    }
    return newArr
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u6570\u7EC4\u65B9\u6CD5\u54EA\u4E9B\u662F\u5728\u539F\u6570\u7EC4\u4E2D\u6539\u7684\uFF0C\u54EA\u4E9B\u662F\u8FD4\u56DE\u65B0\u6570\u7EC4\u7684?</li></ul><blockquote><p>\u8FD4\u56DE\u65B0\u6570\u7EC4\u7684API slice \\ map \\ filter \\ reduce \\ concat ... \u8FD4\u56DE\u539F\u6570\u7EC4\u7684API push \\ unshift \\ shift \\ pop \\ splice \\ sort \\ reverse ...</p></blockquote><h3 id="_19-\u79FB\u9664\u6570\u7EC4\u4E2D\u7684\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#_19-\u79FB\u9664\u6570\u7EC4\u4E2D\u7684\u5143\u7D20" aria-hidden="true">#</a> 19. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2Fa93dd26ebb8c425d844acc17bcce9411%3FtpId%3D2%26tqId%3D37873%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u79FB\u9664\u6570\u7EC4\u4E2D\u7684\u5143\u7D20</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u79FB\u9664\u6570\u7EC4 arr \u4E2D\u7684\u6240\u6709\u503C\u4E0E item \u76F8\u7B49\u7684\u5143\u7D20\uFF0C\u76F4\u63A5\u5728\u7ED9\u5B9A\u7684 arr \u6570\u7EC4\u4E0A\u8FDB\u884C\u64CD\u4F5C\uFF0C\u5E76\u5C06\u7ED3\u679C\u8FD4\u56DE \u8F93\u5165: [1, 2, 2, 3, 4, 2, 2], 2 \u8F93\u51FA: [1, 3, 4]</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u5012\u7740\u904D\u5386\u4E0D\u7528\u8003\u8651\u6570\u7EC4\u957F\u5EA6
function removeWithoutCopy(arr, item) {
    for(let i = arr.length - 1; i &gt;= 0; i--) {
        if(item === arr[i]) arr.splice(i,1)
    }
    return arr
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u904D\u5386 + \u4FEE\u6539\u6570\u7EC4\u957F\u5EA6</li></ul><h3 id="_20-\u6DFB\u52A0\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#_20-\u6DFB\u52A0\u5143\u7D20" aria-hidden="true">#</a> 20. <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.nowcoder.com%2Fpractice%2F3c7905cea3264ddaac4bf637ab3a19f9%3FtpId%3D2%26tqId%3D37874%26rp%3D1%26ru%3D%2Fta%2Ffront-end%26qru%3D%2Fta%2Ffront-end%2Fquestion-ranking%26tab%3DanswerKey" target="_blank" rel="noopener noreferrer">\u6DFB\u52A0\u5143\u7D20</a></h3><blockquote><p>\u9898\u76EE\u63CF\u8FF0 \u5728\u6570\u7EC4 arr \u672B\u5C3E\u6DFB\u52A0\u5143\u7D20 item\u3002\u4E0D\u8981\u76F4\u63A5\u4FEE\u6539\u6570\u7EC4 arr\uFF0C\u7ED3\u679C\u8FD4\u56DE\u65B0\u7684\u6570\u7EC4 \u8F93\u5165: [1, 2, 3, 4], 10 \u8F93\u51FA: [1, 2, 3, 4, 10]</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u6CD5\u4E00\uFF1A\u7B80\u5355\u8FED\u4EE3
function append(arr, item) {
    let newArr = []
    arr.forEach(val =&gt; newArr.push(val))
    newArr.push(item)
    return newArr
}

// \u65B9\u6CD5\u4E8C\uFF1Aslice
function append(arr, item) {
    let arr1 = arr.slice(0)
    arr1.push(item)
    return arr1
}

/// \u65B9\u6CD5\u4E09\uFF1Aconcat
function append(arr, item) {
    return arr.concat(item)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>\u76F8\u5173\u77E5\u8BC6\u70B9\uFF1A</p><ul><li>\u5408\u5E76\u65B0\u5143\u7D20\uFF0C\u8FD4\u56DE\u65B0\u6570\u7EC4</li></ul><p>\u8FD9\u6B21\u597D\u591A\u7684\u65B9\u6CD5\u90FD\u662F\u6570\u7EC4\u65B9\u6CD5\uFF0C\u6240\u4EE5\u4E00\u5B9A\u8981\u975E\u5E38\u7684\u719F\u6089\u3002\u8FD9\u91CC\u518D\u628A\u6570\u7EC4\u7684\u65B9\u6CD5\u6574\u7406\u653E\u4E0A\u6765\u3002</p><p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F753e9c5a940e" target="_blank" rel="noopener noreferrer">Javascript\u5E38\u7528\u7684\u6570\u7EC4\u65B9\u6CD5</a></p>`,54);function s(l,t){return r}var c=n(a,[["render",s],["__file","20.html.vue"]]);export{c as default};
