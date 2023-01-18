import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as p,a as n,b as s,d as o,e as c,r as l}from"./app.d7b34baa.js";const i={},r=n("h1",{id:"javascript-获取用户操作系统信息及浏览器信息",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#javascript-获取用户操作系统信息及浏览器信息","aria-hidden":"true"},"#"),s(" JavaScript 获取用户操作系统信息及浏览器信息")],-1),u=n("p",null,"部分项目场景中可能需要检测用户当前的浏览器环境，比如当前操作系统是window还是iOS，检测用户是通过什么浏览器访问的（Chrome、IE 等）。网上很多类似的代码，但是随着标准和浏览器更迭有所变动，特此汇总。",-1),k=n("h2",{id:"window-navigator-属性",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#window-navigator-属性","aria-hidden":"true"},"#"),s(" window.navigator 属性")],-1),d=n("strong",null,[n("code",null,"Window.navigator")],-1),g={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator",target:"_blank",rel:"noopener noreferrer"},v=n("code",null,"Navigator",-1),m=c(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> navigatorObject <span class="token operator">=</span> window<span class="token punctuation">.</span>navigator
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://cdn.yihuiblog.top/images/202301152204381.png" alt="image-20230115215017732"></p><p>其中常用的属性有：</p><table><thead><tr><th>属性名</th><th>作用</th></tr></thead><tbody><tr><td>appCodeName</td><td>返回浏览器的代码名</td></tr><tr><td>appMinorVersion</td><td>返回浏览器的次级版本</td></tr><tr><td>appName</td><td>返回浏览器的名称</td></tr><tr><td>appVersion</td><td>返回浏览器的平台和版本信息</td></tr><tr><td>browserLanguage</td><td>返回当前浏览器的语言</td></tr><tr><td>cookieEnabled</td><td>返回指明浏览器中是否启用 cookie 的布尔值</td></tr><tr><td>cpuClass</td><td>返回浏览器系统的 CPU 等级</td></tr><tr><td>onLine</td><td>返回指明系统是否处于脱机模式的布尔值。</td></tr><tr><td>platform</td><td>返回运行浏览器的操作系统平台</td></tr><tr><td>systemLanguage</td><td>返回 OS 使用的默认语言</td></tr><tr><td>userAgent</td><td>返回由客户机发送服务器的 user-agent 头部的值</td></tr><tr><td>userLanguage</td><td>返回 OS 的自然语言设置</td></tr></tbody></table><h2 id="获取客户端操作系统信息" tabindex="-1"><a class="header-anchor" href="#获取客户端操作系统信息" aria-hidden="true">#</a> 获取客户端操作系统信息</h2><p>简单法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>navigator<span class="token punctuation">.</span>platform<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>自定方法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">getUserOsInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> userAgent <span class="token operator">=</span> navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;Windows NT 10.0&quot;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;Windows 10&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;Windows NT 6.2&quot;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;Windows 8&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;Windows NT 6.1&quot;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;Windows 7&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;Windows NT 6.0&quot;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;Windows Vista&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;Windows NT 5.1&quot;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;Windows XP&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;Windows NT 5.0&quot;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;Windows 2000&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;Mac&quot;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;Mac/iOS&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;X11&quot;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;UNIX&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&quot;Linux&quot;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;Linux&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Other&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>navigator.userAgent</code>只读属性实际返回关于你运行信息的字符串</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token string">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="获取用户浏览器信息" tabindex="-1"><a class="header-anchor" href="#获取用户浏览器信息" aria-hidden="true">#</a> 获取用户浏览器信息</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 获取浏览器类型</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">getBrowserType</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> ua <span class="token operator">=</span> navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">.</span><span class="token function">toLocaleLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> browserType <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">msie</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">||</span> ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">trident</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    browserType <span class="token operator">=</span> <span class="token string">&#39;IE&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">firefox</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    browserType <span class="token operator">=</span> <span class="token string">&#39;firefox&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">ucbrowser</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    browserType <span class="token operator">=</span> <span class="token string">&#39;UC&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">opera</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">||</span> ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">opr</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    browserType <span class="token operator">=</span> <span class="token string">&#39;opera&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">bidubrowser</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    browserType <span class="token operator">=</span> <span class="token string">&#39;baidu&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">metasr</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    browserType <span class="token operator">=</span> <span class="token string">&#39;sougou&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">tencenttraveler</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">||</span> ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">qqbrowse</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    browserType <span class="token operator">=</span> <span class="token string">&#39;QQ&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">maxthon</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    browserType <span class="token operator">=</span> <span class="token string">&#39;maxthon&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">chrome</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> is360 <span class="token operator">=</span> <span class="token function">_mime</span><span class="token punctuation">(</span><span class="token string">&#39;type&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;application/vnd.chromium.remoting-viewer&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>is360<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      browserType <span class="token operator">=</span> <span class="token string">&#39;360&#39;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      browserType <span class="token operator">=</span> <span class="token string">&#39;chrome&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">safari</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    browserType <span class="token operator">=</span> <span class="token string">&#39;Safari&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    browserType <span class="token operator">=</span> <span class="token string">&#39;others&#39;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> browserType
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="风险" tabindex="-1"><a class="header-anchor" href="#风险" aria-hidden="true">#</a> 风险</h2><p>以上场景主要使用<code>navigator.userAgent</code>进行识别，但基于检测用户代理字符串agent string的浏览器识别是比较不可靠的，因为用户代理字符串是用户可配置的。例如：</p><ul><li>在 Firefox 中，你可以在 <code>about:config</code> 中更改首选项 <code>general.useragent.override</code>。一些火狐扩展是这样做的。但是，这只会更改发送并由<code>navigator.userAgent</code>返回的HTTP标头。可能还有其他方法利用 JavaScript 代码来识别浏览器。</li><li>Opera 6+ 允许用户通过菜单设置浏览器标识字符串。</li><li>Microsoft Internet Explorer使用Windows注册表。</li><li>Safari 和 iCab 允许用户通过菜单将浏览器用户代理字符串更改为预定义的 Internet Explorer 或 Netscape 字符串。</li></ul>`,16);function w(b,x){const a=l("ExternalLinkIcon");return t(),p("div",null,[r,u,k,n("p",null,[s("只读属性 "),d,s(" 会返回一个 "),n("a",g,[v,o(a)]),s(" 对象的引用，可以用于请求运行当前代码的应用程序的相关信息。")]),m])}const h=e(i,[["render",w],["__file","JavaScript 获取用户操作系统信息及浏览器信息.html.vue"]]);export{h as default};
