import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as s,e as t}from"./app.d7b34baa.js";const p={},e=t(`<h1 id="antd-表单基础使用" tabindex="-1"><a class="header-anchor" href="#antd-表单基础使用" aria-hidden="true">#</a> Antd 表单基础使用</h1><h2 id="获取表单实例" tabindex="-1"><a class="header-anchor" href="#获取表单实例" aria-hidden="true">#</a> 获取表单实例</h2><h2 id="表单数据操作" tabindex="-1"><a class="header-anchor" href="#表单数据操作" aria-hidden="true">#</a> 表单数据操作</h2><h3 id="antd-form表单的使用、设值、取值、清空值" tabindex="-1"><a class="header-anchor" href="#antd-form表单的使用、设值、取值、清空值" aria-hidden="true">#</a> Antd form表单的使用、设值、取值、清空值</h3><p>1、使用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>form<span class="token punctuation">.</span><span class="token function">getFieldDecorator</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>Input <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、设值</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>form<span class="token punctuation">.</span><span class="token function">setFieldsValue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;123&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、取值</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>form<span class="token punctuation">.</span><span class="token function">validateFields</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> values</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;表单信息&quot;</span><span class="token punctuation">,</span> values<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、清空值</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>form<span class="token punctuation">.</span><span class="token function">resetFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,12),o=[e];function c(i,u){return a(),s("div",null,o)}const d=n(p,[["render",c],["__file","Antd 表单基础使用.html.vue"]]);export{d as default};
