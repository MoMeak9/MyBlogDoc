import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e as n}from"./app.d7b34baa.js";const o={},i=n(`<h1 id="commitmessage的git格式规范" tabindex="-1"><a class="header-anchor" href="#commitmessage的git格式规范" aria-hidden="true">#</a> CommitMessage的Git格式规范</h1><p>每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&lt;</span>type<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>scope<span class="token operator">&gt;</span><span class="token punctuation">)</span>: <span class="token operator">&lt;</span>subject<span class="token operator">&gt;</span>
// 空一行
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
// 空一行
<span class="token operator">&lt;</span>footer<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，Header 是必需的，Body 和 Footer 可以省略。</p><p>不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。这是为了避免自动换行影响美观。</p><h3 id="header" tabindex="-1"><a class="header-anchor" href="#header" aria-hidden="true">#</a> Header</h3><p>Header部分只有一行，包括三个字段：<code>type</code>（必需）、<code>scope</code>（可选）和<code>subject</code>（必需）。</p><p><strong>（1）type</strong></p><p><code>type</code>用于说明 commit 的类别，只允许使用下面7个标识。</p><blockquote><ul><li>feat：新功能（feature）</li><li>fix：修补bug</li><li>docs：文档（documentation）</li><li>style： 格式（不影响代码运行的变动）</li><li>refactor：重构（即不是新增功能，也不是修改bug的代码变动）</li><li>test：增加测试</li><li>chore：构建过程或辅助工具的变动</li></ul></blockquote><p>如果<code>type</code>为<code>feat</code>和<code>fix</code>，则该 commit 将肯定出现在 Change log 之中。其他情况（<code>docs</code>、<code>chore</code>、<code>style</code>、<code>refactor</code>、<code>test</code>）由你决定，要不要放入 Change log，建议是不要。</p><p><strong>（2）scope</strong></p><p><code>scope</code>用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。</p><p><strong>（3）subject</strong></p><p><code>subject</code>是 commit 目的的简短描述，不超过50个字符。</p><blockquote><ul><li>以动词开头，使用第一人称现在时，比如<code>change</code>，而不是<code>changed</code>或<code>changes</code></li><li>第一个字母小写</li><li>结尾不加句号（<code>.</code>）</li></ul></blockquote><h3 id="body" tabindex="-1"><a class="header-anchor" href="#body" aria-hidden="true">#</a> Body</h3><p>Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。</p><blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>More detailed explanatory text, <span class="token keyword">if</span> necessary.  Wrap it to 
about <span class="token number">72</span> characters or so. 

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><p>有两个注意点。</p><p>（1）使用第一人称现在时，比如使用<code>change</code>而不是<code>changed</code>或<code>changes</code>。</p><p>（2）应该说明代码变动的动机，以及与以前行为的对比。</p><h3 id="footer" tabindex="-1"><a class="header-anchor" href="#footer" aria-hidden="true">#</a> Footer</h3><p>Footer 部分只用于两种情况。</p><p><strong>（1）不兼容变动</strong></p><p>如果当前代码与上一个版本不兼容，则 Footer 部分以<code>BREAKING CHANGE</code>开头，后面是对变动的描述、以及变动理由和迁移方法。</p><blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: <span class="token punctuation">{</span>
      myAttr: <span class="token string">&#39;attribute&#39;</span>,
    <span class="token punctuation">}</span>

    After:

    scope: <span class="token punctuation">{</span>
      myAttr: <span class="token string">&#39;@&#39;</span>,
    <span class="token punctuation">}</span>

    The removed <span class="token variable"><span class="token variable">\`</span>inject<span class="token variable">\`</span></span> wasn&#39;t generaly useful <span class="token keyword">for</span> directives so there should be no code using it.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><p><strong>（2）关闭 Issue</strong></p><p>如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。</p><blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Closes <span class="token comment">#234</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><p>也可以一次关闭多个 issue 。</p><blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Closes <span class="token comment">#123, #245, #992</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><h3 id="revert" tabindex="-1"><a class="header-anchor" href="#revert" aria-hidden="true">#</a> Revert</h3><p>还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以<code>revert:</code>开头，后面跟着被撤销 Commit 的 Header。</p><blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>revert: feat<span class="token punctuation">(</span>pencil<span class="token punctuation">)</span>: <span class="token function">add</span> <span class="token string">&#39;graphiteWidth&#39;</span> option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><p>Body部分的格式是固定的，必须写成<code>This reverts commit &lt;hash&gt;.</code>，其中的<code>hash</code>是被撤销 commit 的 SHA 标识符。</p><p>如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的<code>Reverts</code>小标题下面。</p>`,37),c=[i];function d(t,l){return s(),a("div",null,c)}const u=e(o,[["render",d],["__file","CommitMessage的Git格式规范.html.vue"]]);export{u as default};
