import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e}from"./app.d7b34baa.js";const t={},p=e(`<h1 id="vue-进阶使用" tabindex="-1"><a class="header-anchor" href="#vue-进阶使用" aria-hidden="true">#</a> Vue 进阶使用</h1><blockquote><p>截取自</p><p>作者：火狼1</p><p>链接：https://juejin.cn/post/6844903959266590728</p></blockquote><h2 id="_3-10-v-slot" tabindex="-1"><a class="header-anchor" href="#_3-10-v-slot" aria-hidden="true">#</a> 3.10 v-slot</h2><p>2.6.0 新增 1.slot,slot-cope,scope 在 2.6.0 中都被废弃,但未被移除 2.作用就是将父组件的 template 传入子组件 3.插槽分类: A.匿名插槽(也叫默认插槽): 没有命名,有且只有一个;</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>// 父组件
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>todo-list</span><span class="token punctuation">&gt;</span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>default</span><span class="token punctuation">&gt;</span></span>
       任意内容
       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>我是匿名插槽 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>todo-list</span><span class="token punctuation">&gt;</span></span> 

// 子组件
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">&gt;</span></span>我是默认值<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>
//v-slot:default写上感觉和具名写法比较统一,容易理解,也可以不用写
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>B.具名插槽: 相对匿名插槽组件slot标签带name命名的;</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>// 父组件
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>todo-list</span><span class="token punctuation">&gt;</span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>todo</span><span class="token punctuation">&gt;</span></span>
       任意内容
       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>我是匿名插槽 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>todo-list</span><span class="token punctuation">&gt;</span></span> 

//子组件
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>todo<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>我是默认值<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>C.作用域插槽: 子组件内数据可以被父页面拿到(解决了数据只能从父页面传递给子组件)</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>// 父组件
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>todo-list</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>todo</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slotProps<span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span>
   {{slotProps.user.firstName}}
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>todo-list</span><span class="token punctuation">&gt;</span></span> 
//slotProps 可以随意命名
//slotProps 接取的是子组件标签slot上属性数据的集合所有v-bind:user=&quot;user&quot;

// 子组件
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>todo<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:user</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>user<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>test<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    {{ user.lastName }}
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span> 
data() {
    return {
      user:{
        lastName:&quot;Zhang&quot;,
        firstName:&quot;yue&quot;
      },
      test:[1,2,3,4]
    }
  },
// {{ user.lastName }}是默认数据  v-slot:todo 当父页面没有(=&quot;slotProps&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-11-eventbus" tabindex="-1"><a class="header-anchor" href="#_3-11-eventbus" aria-hidden="true">#</a> 3.11 EventBus</h2><p>1.就是声明一个全局Vue实例变量 EventBus , 把所有的通信数据，事件监听都存储到这个变量上; 2.类似于 Vuex。但这种方式只适用于极小的项目 3.原理就是利用on和on和on和emit 并实例化一个全局 vue 实现数据共享</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 在 main.js
Vue.prototype.$eventBus=new Vue()

// 传值组件
this.$eventBus.$emit(&#39;eventTarget&#39;,&#39;这是eventTarget传过来的值&#39;)

// 接收组件
this.$eventBus.$on(&quot;eventTarget&quot;,v=&gt;{
  console.log(&#39;eventTarget&#39;,v);//这是eventTarget传过来的值
})
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.可以实现平级,嵌套组件传值,但是对应的事件名eventTarget必须是全局唯一的</p><h2 id="_3-13-路由传参" tabindex="-1"><a class="header-anchor" href="#_3-13-路由传参" aria-hidden="true">#</a> 3.13 路由传参</h2><p>1.方案一</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 路由定义
{
  path: &#39;/describe/:id&#39;,
  name: &#39;Describe&#39;,
  component: Describe
}
// 页面传参
this.$router.push({
  path: \`/describe/\${id}\`,
})
// 页面获取
this.$route.params.id
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.方案二</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 路由定义
{
  path: &#39;/describe&#39;,
  name: &#39;Describe&#39;,
  component: Describe
}
// 页面传参
this.$router.push({
  name: &#39;Describe&#39;,
  params: {
    id: id
  }
})
// 页面获取
this.$route.params.id
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.方案三</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 路由定义
{
  path: &#39;/describe&#39;,
  name: &#39;Describe&#39;,
  component: Describe
}
// 页面传参
this.$router.push({
  path: &#39;/describe&#39;,
    query: {
      id: id
  \`}
)
// 页面获取
this.$route.query.id
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.三种方案对比 方案二参数不会拼接在路由后面,页面刷新参数会丢失 方案一和三参数拼接在后面,丑,而且暴露了信息</p><h1 id="_4-render-函数" tabindex="-1"><a class="header-anchor" href="#_4-render-函数" aria-hidden="true">#</a> 4.render 函数</h1><p>1.场景:有些代码在 template 里面写会重复很多,所以这个时候 render 函数就有作用啦</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 根据 props 生成标签
// 初级
&lt;template&gt;
  &lt;div&gt;
    &lt;div v-if=&quot;level === 1&quot;&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/div&gt;
    &lt;p v-else-if=&quot;level === 2&quot;&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/p&gt;
    &lt;h1 v-else-if=&quot;level === 3&quot;&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/h1&gt;
    &lt;h2 v-else-if=&quot;level === 4&quot;&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/h2&gt;
    &lt;strong v-else-if=&quot;level === 5&quot;&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/stong&gt;
    &lt;textarea v-else-if=&quot;level === 6&quot;&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/textarea&gt;
  &lt;/div&gt;
&lt;/template&gt;

// 优化版,利用 render 函数减小了代码重复率
&lt;template&gt;
  &lt;div&gt;
    &lt;child :level=&quot;level&quot;&gt;Hello world!&lt;/child&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script type=&#39;text/javascript&#39;&gt;
  import Vue from &#39;vue&#39;
  Vue.component(&#39;child&#39;, {
    render(h) {
      const tag = [&#39;div&#39;, &#39;p&#39;, &#39;strong&#39;, &#39;h1&#39;, &#39;h2&#39;, &#39;textarea&#39;][this.level-1]
      return h(tag, this.$slots.default)
    },
    props: {
      level: {  type: Number,  required: true  } 
    }
  })   
  export default {
    name: &#39;hehe&#39;,
    data() { return { level: 3 } }
  }
&lt;/script&gt;

复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.render 和 template 的对比 前者适合复杂逻辑,后者适合逻辑简单; 后者属于声明是渲染，前者属于自定Render函数; 前者的性能较高，后者性能较低。</p><h1 id="_5-异步组件" tabindex="-1"><a class="header-anchor" href="#_5-异步组件" aria-hidden="true">#</a> 5.异步组件</h1><p>场景:项目过大就会导致加载缓慢,所以异步组件实现按需加载就是必须要做的事啦</p><p><strong>1.异步注册组件 3种方法</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 工厂函数执行 resolve 回调</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;async-webpack-example&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 这个特殊的 \`require\` 语法将会告诉 webpack</span>
  <span class="token comment">// 自动将你的构建代码切割成多个包, 这些包</span>
  <span class="token comment">// 会通过 Ajax 请求加载</span>
  <span class="token function">require</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;./my-async-component&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> resolve<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 工厂函数返回 Promise</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span>
  <span class="token string">&#39;async-webpack-example&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 这个 \`import\` 函数会返回一个 \`Promise\` 对象。</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./my-async-component&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token comment">// 工厂函数返回一个配置化组件对象</span>
<span class="token keyword">const</span> <span class="token function-variable function">AsyncComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// 需要加载的组件 (应该是一个 \`Promise\` 对象)</span>
  <span class="token literal-property property">component</span><span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./MyComponent.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// 异步组件加载时使用的组件</span>
  <span class="token literal-property property">loading</span><span class="token operator">:</span> LoadingComponent<span class="token punctuation">,</span>
  <span class="token comment">// 加载失败时使用的组件</span>
  <span class="token literal-property property">error</span><span class="token operator">:</span> ErrorComponent<span class="token punctuation">,</span>
  <span class="token comment">// 展示加载时组件的延时时间。默认值是 200 (毫秒)</span>
  <span class="token literal-property property">delay</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
  <span class="token comment">// 如果提供了超时时间且组件加载也超时了，</span>
  <span class="token comment">// 则使用加载失败时使用的组件。默认值是：\`Infinity\`</span>
  <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">3000</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>异步组件的渲染本质上其实就是执行2次或者2次以上的渲染, 先把当前组件渲染为注释节点, 当组件加载成功后, 通过 forceRender 执行重新渲染。或者是渲染为注释节点, 然后再渲染为loading节点, 在渲染为请求完成的组件</p><p>2.路由的按需加载</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>webpack<span class="token operator">&lt;</span> <span class="token number">2.4</span> 时
<span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">components</span><span class="token operator">:</span><span class="token parameter">resolve</span><span class="token operator">=&gt;</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;@/components/home&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>resolve<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

webpack<span class="token operator">&gt;</span> <span class="token number">2.4</span> 时
<span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">components</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;@/components/home&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法由es6提出，<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法是动态加载，返回一个Promise对象，then方法的参数是加载到的模块。类似于Node
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_6-动态组件" tabindex="-1"><a class="header-anchor" href="#_6-动态组件" aria-hidden="true">#</a> 6.动态组件</h1><p>场景:做一个 tab 切换时就会涉及到组件动态加载</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name"><span class="token namespace">v-bind:</span>is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>currentTabComponent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是这样每次组件都会重新加载,会消耗大量性能,所以 就起到了作用</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name"><span class="token namespace">v-bind:</span>is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>currentTabComponent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样切换效果没有动画效果,这个也不用着急,可以利用内置的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;transition&gt;
&lt;keep-alive&gt;
  &lt;component v-bind:is=&quot;currentTabComponent&quot;&gt;&lt;/component&gt;
&lt;/keep-alive&gt;
&lt;/transition&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_7-递归组件" tabindex="-1"><a class="header-anchor" href="#_7-递归组件" aria-hidden="true">#</a> 7.递归组件</h1><p>场景:如果开发一个 tree 组件,里面层级是根据后台数据决定的,这个时候就需要用到动态组件</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>// 递归组件: 组件在它的模板内可以递归的调用自己，只要给组件设置name组件就可以了。
// 设置那么House在组件模板内就可以递归使用了,不过需要注意的是，
// 必须给一个条件来限制数量，否则会抛出错误: max stack size exceeded
// 组件递归用来开发一些具体有未知层级关系的独立组件。比如：
// 联级选择器和树形控件 

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(item,index) in treeArr<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      子组件，当前层级值： {{index}} <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/&gt;</span></span>
      <span class="token comment">&lt;!-- 递归调用自身, 后台判断是否不存在改值 --&gt;</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tree</span> <span class="token attr-name">:item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.arr<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.flag<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tree</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token comment">// 必须定义name，组件内部才能递归调用</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;tree&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 接收外部传入的值</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span>Array<span class="token punctuation">,</span>
      <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>递归组件必须设置name 和结束的阀值</p><h1 id="_17-vue-filter" tabindex="-1"><a class="header-anchor" href="#_17-vue-filter" aria-hidden="true">#</a> 17. Vue.filter</h1><p>场景:时间戳转化成年月日这是一个公共方法,所以可以抽离成过滤器使用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 使用</span>
<span class="token comment">// 在双花括号中</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> message <span class="token operator">|</span> capitalize <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token comment">// 在 \`v-bind\` 中</span>
<span class="token operator">&lt;</span>div v<span class="token operator">-</span>bind<span class="token operator">:</span>id<span class="token operator">=</span><span class="token string">&quot;rawId | formatId&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

<span class="token comment">// 全局注册</span>
Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;stampToYYMMDD&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token comment">// 处理逻辑</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 局部注册</span>
<span class="token literal-property property">filters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">stampToYYMMDD</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理逻辑</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 多个过滤器全局注册</span>
<span class="token comment">// /src/common/filters.js</span>
<span class="token keyword">let</span> <span class="token function-variable function">dateServer</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> value<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\\d{4})(\\d{2})(\\d{2})</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;$1-$2-$3&#39;</span><span class="token punctuation">)</span> 
<span class="token keyword">export</span> <span class="token punctuation">{</span> dateServer <span class="token punctuation">}</span>
<span class="token comment">// /src/main.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> custom <span class="token keyword">from</span> <span class="token string">&#39;./common/filters/custom&#39;</span>
Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>custom<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=&gt;</span> Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> custom<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_18-vue-compile" tabindex="-1"><a class="header-anchor" href="#_18-vue-compile" aria-hidden="true">#</a> 18.Vue.compile</h1><p>场景:在 render 函数中编译模板字符串。只在独立构建时有效</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> res <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;div&gt;&lt;span&gt;{{ msg }}&lt;/span&gt;&lt;/div&gt;&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">render</span><span class="token operator">:</span> res<span class="token punctuation">.</span>render<span class="token punctuation">,</span>
  <span class="token literal-property property">staticRenderFns</span><span class="token operator">:</span> res<span class="token punctuation">.</span>staticRenderFns
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_19-vue-version" tabindex="-1"><a class="header-anchor" href="#_19-vue-version" aria-hidden="true">#</a> 19.Vue.version</h1><p>场景:有些开发插件需要针对不同 vue 版本做兼容,所以就会用到 Vue.version 用法:Vue.version()可以获取 vue 版本</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> version <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>version<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>version <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Vue v2.x.x</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>version <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Vue v1.x.x</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// Unsupported versions of Vue</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_20-vue-set" tabindex="-1"><a class="header-anchor" href="#_20-vue-set" aria-hidden="true">#</a> 20.Vue.set()</h1><p>场景:当你利用索引直接设置一个数组项时或你修改数组的长度时,由于 Object.defineprototype()方法限制,数据不响应式更新 不过vue.3.x 将利用 proxy 这个问题将得到解决 解决方案:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 利用 set
this.$set(arr,index,item)

// 利用数组 push(),splice()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_22-vue-config-performance" tabindex="-1"><a class="header-anchor" href="#_22-vue-config-performance" aria-hidden="true">#</a> 22.Vue.config.performance</h1><p>场景:监听性能</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Vue.config.performance = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="_27-v-once" tabindex="-1"><a class="header-anchor" href="#_27-v-once" aria-hidden="true">#</a> 27.v-once</h1><p>场景:有些 template 中的静态 dom 没有改变,这时就只需要渲染一次,可以降低性能开销</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;span v-once&gt; 这时只需要加载一次的标签&lt;/span&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>v-once 和 v-pre 的区别: v-once只渲染一次；v-pre不编译,原样输出</p><h1 id="_30-vue-router" tabindex="-1"><a class="header-anchor" href="#_30-vue-router" aria-hidden="true">#</a> 30.Vue-router ⭐</h1><p>场景:Vue-router 是官方提供的路由插件</p><h2 id="_30-1-缓存和动画" tabindex="-1"><a class="header-anchor" href="#_30-1-缓存和动画" aria-hidden="true">#</a> 30.1 缓存和动画</h2><p>1.路由是使用官方组件 vue-router,使用方法相信大家非常熟悉; 2.这里我就叙述下路由的缓存和动画; 3.可以用exclude(除了)或者include(包括),2.1.0 新增来坐判断</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;transition&gt;
  &lt;keep-alive :include=&quot;[&#39;a&#39;, &#39;b&#39;]&quot;&gt;
  //或include=&quot;a,b&quot; :include=&quot;/a|b/&quot;,a 和 b 表示组件的 name
  //因为有些页面,如试试数据统计,要实时刷新,所以就不需要缓存
    &lt;router-view/&gt; //路由标签
  &lt;/keep-alive&gt;
  &lt;router-view exclude=&quot;c&quot;/&gt; 
  // c 表示组件的 name值
&lt;/transition&gt;
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注:匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配 4.用 v-if 做判断,组件会重新渲染,但是不用一一列举组件 name</p><h2 id="_30-2-全局路由钩子" tabindex="-1"><a class="header-anchor" href="#_30-2-全局路由钩子" aria-hidden="true">#</a> 30.2 全局路由钩子</h2><p>1.router.beforeEach</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;全局前置守卫：beforeEach -- next需要调用&#39;</span><span class="token punctuation">)</span> <span class="token comment">//一般登录拦截用这个,也叫导航钩子守卫</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>path <span class="token operator">===</span> <span class="token string">&#39;/login&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.router.beforeResolve (v 2.5.0+) 和beforeEach类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用 即在 beforeEach之后调用</p><p>3.router.afterEach 全局后置钩子 在所有路由跳转结束的时候调用 这些钩子不会接受 next 函数也不会改变导航本身</p><h2 id="_30-3-组件路由钩子" tabindex="-1"><a class="header-anchor" href="#_30-3-组件路由钩子" aria-hidden="true">#</a> 30.3 组件路由钩子</h2><p>1.beforeRouteEnter 在渲染该组件的对应路由被确认前调用，用法和参数与router.beforeEach类似，next需要被主动调用 此时组件实例还未被创建，不能访问this 可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">beforeRouteEnter</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 这里还无法访问到组件实例，this === undefined</span>
  <span class="token function">next</span><span class="token punctuation">(</span> <span class="token parameter">vm</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 通过 \`vm\` 访问组件实例</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.beforeRouteUpdate (v 2.2+) 在当前路由改变，并且该组件被复用时调用，可以通过this访问实例， next需要被主动调用，不能传回调</p><p>3.beforeRouteLeave 导航离开该组件的对应路由时调用，可以访问组件实例 this，next需要被主动调用，不能传回调</p><h2 id="_30-4-路由模式" tabindex="-1"><a class="header-anchor" href="#_30-4-路由模式" aria-hidden="true">#</a> 30.4 路由模式</h2><p>设置 mode 属性:hash或 history</p><h2 id="_30-5-vue-router" tabindex="-1"><a class="header-anchor" href="#_30-5-vue-router" aria-hidden="true">#</a> 30.5 Vue.$router</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>this.$router.push():跳转到不同的url，但这个方法回向history栈添加一个记录，点击后退会返回到上一个页面
this.$router.replace():不会有记录
this.$router.go(n):n可为正数可为负数。正数前进， 负数后退,类似 window.history.go(n)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_30-6-vue-route" tabindex="-1"><a class="header-anchor" href="#_30-6-vue-route" aria-hidden="true">#</a> 30.6 Vue.$route</h2><p>表示当前跳转的路由对象,属性有: name:路由名称 path:路径 query:传参接收值 params:传参接收值 fullPath:完成解析后的 URL，包含查询参数和 hash 的完整路径 matched:路由记录副本 redirectedFrom:如果存在重定向，即为重定向来源的路由的名字</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>this.$route.params.id:获取通过 params 或/:id传参的参数
this.$route.query.id:获取通过 query 传参的参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_30-7-router-view-的-key" tabindex="-1"><a class="header-anchor" href="#_30-7-router-view-的-key" aria-hidden="true">#</a> 30.7 router-view 的 key</h2><p>场景:由于 Vue 会复用相同组件, 即 /page/1 =&gt; /page/2 或者 /page?id=1 =&gt; /page?id=2 这类链接跳转时, 将不在执行created, mounted之类的钩子</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>$route.fullPath<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样组件的 created 和 mounted 就都会执行</p><h1 id="_33-vue-loader-小技巧" tabindex="-1"><a class="header-anchor" href="#_33-vue-loader-小技巧" aria-hidden="true">#</a> 33.vue-loader 小技巧</h1><h2 id="_33-1-preservewhitespace" tabindex="-1"><a class="header-anchor" href="#_33-1-preservewhitespace" aria-hidden="true">#</a> 33.1 preserveWhitespace</h2><p>场景:开发 vue 代码一般会有空格,这个时候打包压缩如果不去掉空格会加大包的体积 配置preserveWhitespace可以减小包的体积</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>{
  vue: {
    preserveWhitespace: false
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_33-2-transformtorequire" tabindex="-1"><a class="header-anchor" href="#_33-2-transformtorequire" aria-hidden="true">#</a> 33.2 transformToRequire</h2><p>场景:以前在写 Vue 的时候经常会写到这样的代码：把图片提前 require 传给一个变量再传给组件</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>// page 代码
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>avatar</span> <span class="token attr-name">:img-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>imgSrc<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>avatar</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>imgSrc <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./assets/default-avatar.png&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在:通过配置 transformToRequire 后，就可以直接配置，这样vue-loader会把对应的属性自动 require 之后传给组件</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>// vue-cli 2.x在vue-loader.conf.js 默认配置是
transformToRequire: {
    video: [&#39;src&#39;, &#39;poster&#39;],
    source: &#39;src&#39;,
    img: &#39;src&#39;,
    image: &#39;xlink:href&#39;
}

// 配置文件,如果是vue-cli2.x 在vue-loader.conf.js里面修改
  avatar: [&#39;default-src&#39;]

// vue-cli 3.x 在vue.config.js
// vue-cli 3.x 将transformToRequire属性换为了transformAssetUrls
module.exports = {
  pages,
  chainWebpack: config =&gt; {
    config
      .module
        .rule(&#39;vue&#39;)
        .use(&#39;vue-loader&#39;)
        .loader(&#39;vue-loader&#39;)
        .tap(options =&gt; {
      options.transformAssetUrls = {
        avatar: &#39;img-src&#39;,
      }
      return options;
      });
  }
}

// page 代码可以简化为
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>avatar</span> <span class="token attr-name">img-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./assets/default-avatar.png<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>avatar</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_34-为路径设置别名" tabindex="-1"><a class="header-anchor" href="#_34-为路径设置别名" aria-hidden="true">#</a> 34.为路径设置别名</h1><p>1.场景:在开发过程中，我们经常需要引入各种文件，如图片、CSS、JS等，为了避免写很长的相对路径（../），我们可以为不同的目录配置一个别名</p><p>2.vue-cli 2.x 配置</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 在 webpack.base.config.js中的 resolve 配置项，在其 alias 中增加别名</span>
<span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.vue&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.json&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;vue$&#39;</span><span class="token operator">:</span> <span class="token string">&#39;vue/dist/vue.esm.js&#39;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.vue-cli 3.x 配置</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 在根目录下创建vue.config.js</span>
<span class="token keyword">var</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">resolve</span> <span class="token punctuation">(</span><span class="token parameter">dir</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span>
  <span class="token keyword">return</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> dir<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token parameter">config</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>resolve<span class="token punctuation">.</span>alias
      <span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token comment">// key,value自行定义，比如.set(&#39;@@&#39;, resolve(&#39;src/components&#39;))</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_35-img-加载失败" tabindex="-1"><a class="header-anchor" href="#_35-img-加载失败" aria-hidden="true">#</a> 35.img 加载失败</h1><p>场景:有些时候后台返回图片地址不一定能打开,所以这个时候应该加一张默认图片</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>// page 代码
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>imgUrl<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@error</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleError<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">{</span>
      <span class="token literal-property property">imgUrl</span><span class="token operator">:</span><span class="token string">&#39;&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token function">handleError</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>src<span class="token operator">=</span><span class="token function">reqiure</span><span class="token punctuation">(</span><span class="token string">&#39;图片路径&#39;</span><span class="token punctuation">)</span> <span class="token comment">//当然如果项目配置了transformToRequire,参考上面 33.2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_36-css" tabindex="-1"><a class="header-anchor" href="#_36-css" aria-hidden="true">#</a> 36.css</h1><h2 id="_36-1-局部样式" tabindex="-1"><a class="header-anchor" href="#_36-1-局部样式" aria-hidden="true">#</a> 36.1 局部样式</h2><p>1.Vue中style标签的scoped属性表示它的样式只作用于当前模块，是样式私有化.</p><p>2.渲染的规则/原理： 给HTML的DOM节点添加一个 不重复的data属性 来表示 唯一性 在对应的 CSS选择器 末尾添加一个当前组件的 data属性选择器来私有化样式，如：.demo[data-v-2311c06a]{} 如果引入 less 或 sass 只会在最后一个元素上设置</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">// 原始代码
&lt;template&gt;
  &lt;div class=&quot;demo&quot;&gt;
    &lt;span class=&quot;content&quot;&gt;
      Vue.js scoped
    &lt;/span&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style lang=&quot;less&quot; scoped&gt;
  .demo</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
    <span class="token selector">.content</span><span class="token punctuation">{</span>
      <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token selector">&lt;/style&gt;

// 浏览器渲染效果
&lt;div data-v-fed36922&gt;
  Vue.js scoped
&lt;/div&gt;
&lt;style type=&quot;text/css&quot;&gt;
.demo[data-v-039c5b43]</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.demo .content[data-v-039c5b43]</span> <span class="token punctuation">{</span> //.demo 上并没有加 data 属性
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_36-2-deep-属性" tabindex="-1"><a class="header-anchor" href="#_36-2-deep-属性" aria-hidden="true">#</a> 36.2 deep 属性</h2><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">// 上面样式加一个 /deep/
&lt;style lang=&quot;less&quot; scoped&gt;
  .demo</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.demo /deep/ .content</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token selector">&lt;/style&gt;

// 浏览器编译后
&lt;style type=&quot;text/css&quot;&gt;
.demo[data-v-039c5b43]</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.demo[data-v-039c5b43] .content</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,114),i=[p];function l(c,o){return s(),a("div",null,i)}const d=n(t,[["render",l],["__file","Vue 进阶使用.html.vue"]]);export{d as default};
