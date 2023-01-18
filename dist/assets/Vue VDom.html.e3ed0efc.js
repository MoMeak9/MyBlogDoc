import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e as t}from"./app.d7b34baa.js";const p={},e=t(`<h1 id="vue-vdom" tabindex="-1"><a class="header-anchor" href="#vue-vdom" aria-hidden="true">#</a> Vue VDom</h1><h2 id="vue-虚拟-dom-执行流程" tabindex="-1"><a class="header-anchor" href="#vue-虚拟-dom-执行流程" aria-hidden="true">#</a> Vue 虚拟 DOM 执行流程</h2><p>我们从虚拟 DOM 在 Vue 的执行流程开始讲起。在 Vue 中，我们使用虚拟 DOM 来描述页面的组件，比如下面的 template 虽然格式和 HTML 很像，但是在 Vue 的内部会解析成 JavaScript 函数，这个函数就是用来返回虚拟 DOM：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>hello world<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Rate</span> <span class="token attr-name">:value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>4<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Rate</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的 template 会解析成下面的函数，最终返回一个 JavaScript 的对象能够描述这段 HTML：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">&quot;app&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">h</span><span class="token punctuation">(</span>Rate<span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span><span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dom-的创建" tabindex="-1"><a class="header-anchor" href="#dom-的创建" aria-hidden="true">#</a> DOM 的创建</h2><p>在代码中，我们使用 createVNode 函数创建项目的虚拟 DOM，可以看到 <strong>Vue 内部的虚拟 DOM，也就是 vnode，就是一个对象，通过 type、props、children 等属性描述整个节点：</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">createVNode</span><span class="token punctuation">(</span>    
  rootComponent <span class="token keyword">as</span> ConcreteComponent<span class="token punctuation">,</span>
  rootProps
<span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">_createVNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token comment">// 处理属性和\bclass</span>
  <span class="token class-name"><span class="token keyword">if</span></span> <span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 标记vnode信息</span>
  <span class="token keyword">const</span> shapeFlag <span class="token operator">=</span> <span class="token function">isString</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ELEMENT</span>
    <span class="token operator">:</span> __FEATURE_SUSPENSE__ <span class="token operator">&amp;&amp;</span> <span class="token function">isSuspense</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">SUSPENSE</span>
    <span class="token operator">:</span> <span class="token function">isTeleport</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">TELEPORT</span>
    <span class="token operator">:</span> <span class="token function">isObject</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">STATEFUL_COMPONENT</span>
    <span class="token operator">:</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">FUNCTIONAL_COMPONENT</span>
    <span class="token operator">:</span> <span class="token number">0</span>

  <span class="token keyword">return</span> <span class="token function">createBaseVNode</span><span class="token punctuation">(</span>
    type<span class="token punctuation">,</span>
    props<span class="token punctuation">,</span>
    children<span class="token punctuation">,</span>
    patchFlag<span class="token punctuation">,</span>
    dynamicProps<span class="token punctuation">,</span>
    shapeFlag<span class="token punctuation">,</span>
    isBlockNode<span class="token punctuation">,</span>
    <span class="token boolean">true</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">createBaseVNode</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span>props<span class="token punctuation">,</span>children<span class="token punctuation">,</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
    type<span class="token punctuation">,</span>
    props<span class="token punctuation">,</span>
    key<span class="token operator">:</span> props <span class="token operator">&amp;&amp;</span> <span class="token function">normalizeKey</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">,</span>
    ref<span class="token operator">:</span> props <span class="token operator">&amp;&amp;</span> <span class="token function">normalizeRef</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">,</span>
    children<span class="token punctuation">,</span>
    shapeFlag<span class="token punctuation">,</span>
    patchFlag<span class="token punctuation">,</span>
    dynamicProps<span class="token punctuation">,</span>
     <span class="token operator">...</span>
  <span class="token punctuation">}</span> <span class="token keyword">as</span> VNode
  <span class="token comment">// 标准化子节点</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>needFullChildrenNormalization<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">normalizeChildren</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> children<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vnode<span class="token punctuation">.</span>shapeFlag <span class="token operator">|=</span> <span class="token function">isString</span><span class="token punctuation">(</span>children<span class="token punctuation">)</span>
      <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">TEXT_CHILDREN</span>
      <span class="token operator">:</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ARRAY_CHILDREN</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> vnode
<span class="token punctuation">}</span>componentUpdateFn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>createVNode 负责创建 Vue 中的虚拟 DOM，而上一讲中我们讲过 mount 函数的核心逻辑就是使用 setupComponent 执行我们写的</p><p>我们给组件注册了 update 方法，这个方法使用 effect 包裹后，当组件内的 ref、reactive 包裹的响应式数据变化的时候就会执行 update 方法，触发组件内部的更新机制。</p><p>看下面的代码，在 setupRenderEffect 内部的 componentUpdateFn 中，updateComponentPreRenderer 更新了属性和 slots，并且调用 renderComponentRoot 函数创建新的子树对象 nextTree，然后内部依然是调用 patch 函数。</p><p><strong>Vue 源码中的实现首次渲染和更新的逻辑都写在一起，我们在递归的时候如果对一个标签实现更新和渲染，就可以用一个函数实现。</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>
<span class="token keyword">const</span> <span class="token function-variable function">componentUpdateFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">.</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//首次渲染</span>
      instance<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG
      <span class="token punctuation">)</span>
      。。。
  <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token punctuation">{</span> next<span class="token punctuation">,</span> bu<span class="token punctuation">,</span> u<span class="token punctuation">,</span> parent<span class="token punctuation">,</span> vnode <span class="token punctuation">}</span> <span class="token operator">=</span> instance
    <span class="token keyword">if</span> <span class="token punctuation">(</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      next<span class="token punctuation">.</span>el <span class="token operator">=</span> vnode<span class="token punctuation">.</span>el
      <span class="token function">updateComponentPreRender</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> next<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      next <span class="token operator">=</span> vnode
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> nextTree <span class="token operator">=</span> <span class="token function">renderComponentRoot</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span>
      <span class="token function">patch</span><span class="token punctuation">(</span>
        prevTree<span class="token punctuation">,</span>
        nextTree<span class="token punctuation">,</span>
        <span class="token comment">// parent may have changed if it&#39;s in a teleport</span>
        <span class="token function">hostParentNode</span><span class="token punctuation">(</span>prevTree<span class="token punctuation">.</span>el<span class="token operator">!</span><span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">,</span>
        <span class="token comment">// anchor may have changed if it&#39;s in a fragment</span>
        <span class="token function">getNextHostNode</span><span class="token punctuation">(</span>prevTree<span class="token punctuation">)</span><span class="token punctuation">,</span>
        instance<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 注册effect函数</span>
<span class="token keyword">const</span> effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>
  componentUpdateFn<span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">queueJob</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>update<span class="token punctuation">)</span><span class="token punctuation">,</span>
  instance<span class="token punctuation">.</span>scope <span class="token comment">// track it in component&#39;s effect scope</span>
<span class="token punctuation">)</span>
<span class="token keyword">const</span> update <span class="token operator">=</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>update <span class="token operator">=</span> effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token constant">S</span>      chedulerJob<span class="token punctuation">)</span>
<span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> <span class="token function-variable function">updateComponentPreRender</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    instance<span class="token operator">:</span> ComponentInternalInstance<span class="token punctuation">,</span>
    nextVNode<span class="token operator">:</span> VNode<span class="token punctuation">,</span>
    optimized<span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    nextVNode<span class="token punctuation">.</span>component <span class="token operator">=</span> instance
    <span class="token keyword">const</span> prevProps <span class="token operator">=</span> instance<span class="token punctuation">.</span>vnode<span class="token punctuation">.</span>props
    instance<span class="token punctuation">.</span>vnode <span class="token operator">=</span> nextVNode
    instance<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token function">updateProps</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> nextVNode<span class="token punctuation">.</span>props<span class="token punctuation">,</span> prevProps<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span>
    <span class="token function">updateSlots</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> nextVNode<span class="token punctuation">.</span>children<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span>

    <span class="token function">pauseTracking</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// props update may have triggered pre-flush watchers.</span>
    <span class="token comment">// flush them before the render update.</span>
    <span class="token function">flushPreFlushCbs</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> instance<span class="token punctuation">.</span>update<span class="token punctuation">)</span>
    <span class="token function">resetTracking</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比较关键的就是上面代码中 32-39 行的 <strong>effect 函数，负责注册组件，这个函数也是 Vue 组件更新的入口函数。</strong></p><h2 id="patch-函数" tabindex="-1"><a class="header-anchor" href="#patch-函数" aria-hidden="true">#</a> patch 函数</h2><p>数据更新之后就会执行 patch 函数，下图就是 patch 函数执行的逻辑图：</p><p><img src="https://cdn.yihuiblog.top/images/202205151821492.jpeg" alt="img"></p>`,18),o=[e];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","Vue VDom.html.vue"]]);export{d as default};
