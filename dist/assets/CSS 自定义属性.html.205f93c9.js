import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as a,e}from"./app.d7b34baa.js";const p={},t=e(`<h1 id="css-自定义属性-变量-variables" tabindex="-1"><a class="header-anchor" href="#css-自定义属性-变量-variables" aria-hidden="true">#</a> CSS 自定义属性/变量 (variables）</h1><p>自定义属性（有时候也被称作CSS 变量或者级联变量）是由 CSS 开发者自行定义的，它包含的值可以在整个文档中重复使用。由自定义属性标记设定值（比如： --main-color: black;），由 var() 函数来获取值（比如： color: var(--main-color);）复杂的网站都会有大量的 CSS 代码，通常也会有许多重复的值。</p><h2 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法" aria-hidden="true">#</a> 基本用法</h2><p>声明一个自定义属性，属性名需要以两个减号（<code>--</code>）开始，属性值则可以是任何有效的 CSS 值。和其他属性一样，自定义属性也是写在规则集之内的，如下：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">element</span> <span class="token punctuation">{</span>
  <span class="token property">--main-bg-color</span><span class="token punctuation">:</span> brown<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所定义自定义属性需要在其可见作用域内（即被嵌套的标签内使用），通常的最佳实践是定义在根伪类 :root 下，这样就可以在 HTML 文档的任何地方访问到它了：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">:root</span> <span class="token punctuation">{</span>
  <span class="token property">--main-bg-color</span><span class="token punctuation">:</span> brown<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关知识点" tabindex="-1"><a class="header-anchor" href="#相关知识点" aria-hidden="true">#</a> 相关知识点</h2><h3 id="var-函数" tabindex="-1"><a class="header-anchor" href="#var-函数" aria-hidden="true">#</a> var() 函数</h3><p>**<code>var()</code><strong>函数可以代替元素中任何属性中的</strong>值（value）**的任何部分。</p><p>**<code>var()</code>**方法的第一个参数是要替换的自定义属性的名称。函数的可选第二个参数用作回退值。如果第一个参数引用的自定义属性无效，则该函数将使用第二个值。</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>&lt;<span class="token function">var</span><span class="token punctuation">(</span><span class="token punctuation">)</span>&gt; = <span class="token function">var</span><span class="token punctuation">(</span> &lt;custom-property-name&gt; <span class="token punctuation">,</span> &lt;declaration-value&gt;<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="举个栗子" tabindex="-1"><a class="header-anchor" href="#举个栗子" aria-hidden="true">#</a> 举个栗子</h4><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* 后备值 */</span>

<span class="token comment">/* 在父元素样式中定义一个值 */</span>
<span class="token selector">.component</span> <span class="token punctuation">{</span>
  <span class="token property">--text-color</span><span class="token punctuation">:</span> #080<span class="token punctuation">;</span> <span class="token comment">/* header-color 并没有被设定 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 在 component 的样式中使用它： */</span>
<span class="token selector">.component .text</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--text-color<span class="token punctuation">,</span> black<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* 此处 color 正常取值 --text-color */</span>
<span class="token punctuation">}</span>
<span class="token selector">.component .header</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--header-color<span class="token punctuation">,</span> blue<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* 此处 color 被回退到 blue */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="特性" tabindex="-1"><a class="header-anchor" href="#特性" aria-hidden="true">#</a> 特性</h4><ul><li><p>**继承：**自定义属性会继承。这意味着如果在一个给定的元素上，没有为这个自定义属性设置值，在其父元素上的值会被使用。</p></li><li><p>**备用值嵌套：**var()本身可以作为第二个值进行无限嵌套</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.three</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--my-var<span class="token punctuation">,</span> <span class="token function">var</span><span class="token punctuation">(</span>--my-background<span class="token punctuation">,</span> pink<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样写可能会导致性能问题，因为它花了更多的时间在处理这些变量上。</p></li><li><p>**有效性：**当自定义属性值被解析，浏览器不知道它们什么时候会被使用，所以必须认为这些值都是有效的。但是真实情况是，只有当<code>var()</code>函数调用的时候才能知道这些值的有效性，即<em>计算时有效性</em>。</p></li><li><p><strong>无效情况：<strong>先会检查属性 color 是否为继承属性，如果不是则将该值设置为它的</strong>默认初始值</strong>。</p></li></ul><h3 id="root-伪类" tabindex="-1"><a class="header-anchor" href="#root-伪类" aria-hidden="true">#</a> <code>:root</code> 伪类</h3><p><code>:root</code> 这个 CSS 伪类匹配文档树的根元素。对于 HTML 来说，<code>:root</code> 表示 &lt;html&gt; 元素，除了优先级更高之外，与 html 选择器相同。实践中主要用于声明全局CSS变量。</p><h2 id="与less和sass变量的区别" tabindex="-1"><a class="header-anchor" href="#与less和sass变量的区别" aria-hidden="true">#</a> 与Less和Sass变量的区别</h2><h3 id="声明" tabindex="-1"><a class="header-anchor" href="#声明" aria-hidden="true">#</a> 声明</h3><p>LESS用@符号，SCSS用$符号表示</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token variable">@link-color<span class="token punctuation">:</span></span>#000
<span class="token variable">@main-top <span class="token punctuation">:</span></span> search<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$to-color</span></span><span class="token punctuation">:</span>#000
<span class="token property"><span class="token variable">$main-top</span></span> <span class="token punctuation">:</span> search<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><p>不同于CSS，声明变量以“插值”的形式使用，并且不但可以表示为数值，文本嵌入表达式，还可以作为类名、属性名等。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token variable">@myColor<span class="token punctuation">:</span></span> red<span class="token punctuation">;</span>

<span class="token selector">h1</span> <span class="token punctuation">{</span>
  <span class="token variable">@myColor<span class="token punctuation">:</span></span> green<span class="token punctuation">;</span>   <span class="token comment">// 只在 h1 里头有用，局部作用域</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">@myColor</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.@{myColor}</span><span class="token punctuation">{</span>
	<span class="token property">background-color</span><span class="token punctuation">:</span> red
<span class="token punctuation">}</span>

<span class="token variable">@url-prefix<span class="token punctuation">:</span></span> <span class="token string">&quot;http://XXXX&quot;</span><span class="token punctuation">;</span>

<span class="token selector">.test</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&quot;@{url-prefix}/images/picutre001.png&quot;</span><span class="token punctuation">)</span></span> no<span class="token operator">-</span>repeat<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$myColor</span></span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>

<span class="token selector">h1 </span><span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$myColor</span></span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>   <span class="token comment">// 只在 h1 里头有用，局部作用域</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$myColor</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 变量用#{}包裹</span>
<span class="token selector">.<span class="token variable">#{$myColor}</span></span><span class="token punctuation">{</span>
	<span class="token property">background-color</span><span class="token punctuation">:</span> red
<span class="token punctuation">}</span>

<span class="token property"><span class="token variable">$url-prefix</span></span><span class="token punctuation">:</span> <span class="token string">&quot;http://XXXX&quot;</span><span class="token punctuation">;</span>

<span class="token selector">.test </span><span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url">url</span><span class="token punctuation">(</span><span class="token string">&quot;#{$url-prefix}/images/picutre001.png&quot;</span><span class="token punctuation">)</span> no-repeat<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="less和sass作用域规则不同" tabindex="-1"><a class="header-anchor" href="#less和sass作用域规则不同" aria-hidden="true">#</a> Less和Sass作用域规则不同</h3><p>Less-作用域</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token variable">@color<span class="token punctuation">:</span></span> #00c<span class="token punctuation">;</span> <span class="token comment">/* 蓝色 */</span>
<span class="token selector">#header</span> <span class="token punctuation">{</span>
  <span class="token variable">@color<span class="token punctuation">:</span></span> #c00<span class="token punctuation">;</span> <span class="token comment">/* red */</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid <span class="token variable">@color</span><span class="token punctuation">;</span> <span class="token comment">/* 红色边框 */</span>
<span class="token punctuation">}</span>

<span class="token selector">#footer</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid <span class="token variable">@color</span><span class="token punctuation">;</span> <span class="token comment">/* 蓝色边框 */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Less-作用域编译后</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">#header</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #cc0000<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token selector">#footer</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #0000cc<span class="token punctuation">;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>scss-作用域</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> #00c<span class="token punctuation">;</span> <span class="token comment">/* 蓝色 */</span>

<span class="token selector">#header </span><span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> #c00<span class="token punctuation">;</span> <span class="token comment">/* red */</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid <span class="token variable">$color</span><span class="token punctuation">;</span> <span class="token comment">/* 红色边框 */</span>
<span class="token punctuation">}</span>

<span class="token selector">#footer </span><span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid <span class="token variable">$color</span><span class="token punctuation">;</span> <span class="token comment">/* 蓝色边框 */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Sass-作用域编译后</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">#header</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #c00<span class="token punctuation">}</span>
<span class="token selector">#footer</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #c00<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Less区分上下级作用域，使用与原生CSS <code>var()</code> 一致的作用域规则，SCSS为就近原则，即至顶向下的转换规则。</p>`,37),c=[t];function o(l,i){return n(),a("div",null,c)}const d=s(p,[["render",o],["__file","CSS 自定义属性.html.vue"]]);export{d as default};
