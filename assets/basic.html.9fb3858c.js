import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{d as s}from"./app.75915693.js";const a={},e=s(`<h1 id="vue-\u8FDB\u9636\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#vue-\u8FDB\u9636\u4F7F\u7528" aria-hidden="true">#</a> Vue \u8FDB\u9636\u4F7F\u7528</h1><blockquote><p>\u622A\u53D6\u81EA</p><p>\u4F5C\u8005\uFF1A\u706B\u72FC1</p><p>\u94FE\u63A5\uFF1Ahttps://juejin.cn/post/6844903959266590728</p></blockquote><h2 id="_3-10-v-slot" tabindex="-1"><a class="header-anchor" href="#_3-10-v-slot" aria-hidden="true">#</a> 3.10 v-slot</h2><p>2.6.0 \u65B0\u589E 1.slot,slot-cope,scope \u5728 2.6.0 \u4E2D\u90FD\u88AB\u5E9F\u5F03,\u4F46\u672A\u88AB\u79FB\u9664 2.\u4F5C\u7528\u5C31\u662F\u5C06\u7236\u7EC4\u4EF6\u7684 template \u4F20\u5165\u5B50\u7EC4\u4EF6 3.\u63D2\u69FD\u5206\u7C7B: A.\u533F\u540D\u63D2\u69FD(\u4E5F\u53EB\u9ED8\u8BA4\u63D2\u69FD): \u6CA1\u6709\u547D\u540D,\u6709\u4E14\u53EA\u6709\u4E00\u4E2A;</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>// \u7236\u7EC4\u4EF6
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>todo-list</span><span class="token punctuation">&gt;</span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>default</span><span class="token punctuation">&gt;</span></span>
       \u4EFB\u610F\u5185\u5BB9
       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>\u6211\u662F\u533F\u540D\u63D2\u69FD <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>todo-list</span><span class="token punctuation">&gt;</span></span> 

// \u5B50\u7EC4\u4EF6
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">&gt;</span></span>\u6211\u662F\u9ED8\u8BA4\u503C<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>
//v-slot:default\u5199\u4E0A\u611F\u89C9\u548C\u5177\u540D\u5199\u6CD5\u6BD4\u8F83\u7EDF\u4E00,\u5BB9\u6613\u7406\u89E3,\u4E5F\u53EF\u4EE5\u4E0D\u7528\u5199
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>B.\u5177\u540D\u63D2\u69FD: \u76F8\u5BF9\u533F\u540D\u63D2\u69FD\u7EC4\u4EF6slot\u6807\u7B7E\u5E26name\u547D\u540D\u7684;</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>// \u7236\u7EC4\u4EF6
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>todo-list</span><span class="token punctuation">&gt;</span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>todo</span><span class="token punctuation">&gt;</span></span>
       \u4EFB\u610F\u5185\u5BB9
       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>\u6211\u662F\u533F\u540D\u63D2\u69FD <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>todo-list</span><span class="token punctuation">&gt;</span></span> 

//\u5B50\u7EC4\u4EF6
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>todo<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u6211\u662F\u9ED8\u8BA4\u503C<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>C.\u4F5C\u7528\u57DF\u63D2\u69FD: \u5B50\u7EC4\u4EF6\u5185\u6570\u636E\u53EF\u4EE5\u88AB\u7236\u9875\u9762\u62FF\u5230(\u89E3\u51B3\u4E86\u6570\u636E\u53EA\u80FD\u4ECE\u7236\u9875\u9762\u4F20\u9012\u7ED9\u5B50\u7EC4\u4EF6)</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>// \u7236\u7EC4\u4EF6
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>todo-list</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>todo</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slotProps<span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span>
   {{slotProps.user.firstName}}
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>todo-list</span><span class="token punctuation">&gt;</span></span> 
//slotProps \u53EF\u4EE5\u968F\u610F\u547D\u540D
//slotProps \u63A5\u53D6\u7684\u662F\u5B50\u7EC4\u4EF6\u6807\u7B7Eslot\u4E0A\u5C5E\u6027\u6570\u636E\u7684\u96C6\u5408\u6240\u6709v-bind:user=&quot;user&quot;

// \u5B50\u7EC4\u4EF6
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
// {{ user.lastName }}\u662F\u9ED8\u8BA4\u6570\u636E  v-slot:todo \u5F53\u7236\u9875\u9762\u6CA1\u6709(=&quot;slotProps&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="_3-11-eventbus" tabindex="-1"><a class="header-anchor" href="#_3-11-eventbus" aria-hidden="true">#</a> 3.11 EventBus</h2><p>1.\u5C31\u662F\u58F0\u660E\u4E00\u4E2A\u5168\u5C40Vue\u5B9E\u4F8B\u53D8\u91CF EventBus , \u628A\u6240\u6709\u7684\u901A\u4FE1\u6570\u636E\uFF0C\u4E8B\u4EF6\u76D1\u542C\u90FD\u5B58\u50A8\u5230\u8FD9\u4E2A\u53D8\u91CF\u4E0A; 2.\u7C7B\u4F3C\u4E8E Vuex\u3002\u4F46\u8FD9\u79CD\u65B9\u5F0F\u53EA\u9002\u7528\u4E8E\u6781\u5C0F\u7684\u9879\u76EE 3.\u539F\u7406\u5C31\u662F\u5229\u7528on\u548Con\u548Con\u548Cemit \u5E76\u5B9E\u4F8B\u5316\u4E00\u4E2A\u5168\u5C40 vue \u5B9E\u73B0\u6570\u636E\u5171\u4EAB</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5728 main.js
Vue.prototype.$eventBus=new Vue()

// \u4F20\u503C\u7EC4\u4EF6
this.$eventBus.$emit(&#39;eventTarget&#39;,&#39;\u8FD9\u662FeventTarget\u4F20\u8FC7\u6765\u7684\u503C&#39;)

// \u63A5\u6536\u7EC4\u4EF6
this.$eventBus.$on(&quot;eventTarget&quot;,v=&gt;{
  console.log(&#39;eventTarget&#39;,v);//\u8FD9\u662FeventTarget\u4F20\u8FC7\u6765\u7684\u503C
})
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>4.\u53EF\u4EE5\u5B9E\u73B0\u5E73\u7EA7,\u5D4C\u5957\u7EC4\u4EF6\u4F20\u503C,\u4F46\u662F\u5BF9\u5E94\u7684\u4E8B\u4EF6\u540DeventTarget\u5FC5\u987B\u662F\u5168\u5C40\u552F\u4E00\u7684</p><h2 id="_3-13-\u8DEF\u7531\u4F20\u53C2" tabindex="-1"><a class="header-anchor" href="#_3-13-\u8DEF\u7531\u4F20\u53C2" aria-hidden="true">#</a> 3.13 \u8DEF\u7531\u4F20\u53C2</h2><p>1.\u65B9\u6848\u4E00</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u8DEF\u7531\u5B9A\u4E49
{
  path: &#39;/describe/:id&#39;,
  name: &#39;Describe&#39;,
  component: Describe
}
// \u9875\u9762\u4F20\u53C2
this.$router.push({
  path: \`/describe/\${id}\`,
})
// \u9875\u9762\u83B7\u53D6
this.$route.params.id
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>2.\u65B9\u6848\u4E8C</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u8DEF\u7531\u5B9A\u4E49
{
  path: &#39;/describe&#39;,
  name: &#39;Describe&#39;,
  component: Describe
}
// \u9875\u9762\u4F20\u53C2
this.$router.push({
  name: &#39;Describe&#39;,
  params: {
    id: id
  }
})
// \u9875\u9762\u83B7\u53D6
this.$route.params.id
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>3.\u65B9\u6848\u4E09</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u8DEF\u7531\u5B9A\u4E49
{
  path: &#39;/describe&#39;,
  name: &#39;Describe&#39;,
  component: Describe
}
// \u9875\u9762\u4F20\u53C2
this.$router.push({
  path: &#39;/describe&#39;,
    query: {
      id: id
  \`}
)
// \u9875\u9762\u83B7\u53D6
this.$route.query.id
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>4.\u4E09\u79CD\u65B9\u6848\u5BF9\u6BD4 \u65B9\u6848\u4E8C\u53C2\u6570\u4E0D\u4F1A\u62FC\u63A5\u5728\u8DEF\u7531\u540E\u9762,\u9875\u9762\u5237\u65B0\u53C2\u6570\u4F1A\u4E22\u5931 \u65B9\u6848\u4E00\u548C\u4E09\u53C2\u6570\u62FC\u63A5\u5728\u540E\u9762,\u4E11,\u800C\u4E14\u66B4\u9732\u4E86\u4FE1\u606F</p><h1 id="_4-render-\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_4-render-\u51FD\u6570" aria-hidden="true">#</a> 4.render \u51FD\u6570</h1><p>1.\u573A\u666F:\u6709\u4E9B\u4EE3\u7801\u5728 template \u91CC\u9762\u5199\u4F1A\u91CD\u590D\u5F88\u591A,\u6240\u4EE5\u8FD9\u4E2A\u65F6\u5019 render \u51FD\u6570\u5C31\u6709\u4F5C\u7528\u5566</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u6839\u636E props \u751F\u6210\u6807\u7B7E
// \u521D\u7EA7
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

// \u4F18\u5316\u7248,\u5229\u7528 render \u51FD\u6570\u51CF\u5C0F\u4E86\u4EE3\u7801\u91CD\u590D\u7387
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

\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>2.render \u548C template \u7684\u5BF9\u6BD4 \u524D\u8005\u9002\u5408\u590D\u6742\u903B\u8F91,\u540E\u8005\u9002\u5408\u903B\u8F91\u7B80\u5355; \u540E\u8005\u5C5E\u4E8E\u58F0\u660E\u662F\u6E32\u67D3\uFF0C\u524D\u8005\u5C5E\u4E8E\u81EA\u5B9ARender\u51FD\u6570; \u524D\u8005\u7684\u6027\u80FD\u8F83\u9AD8\uFF0C\u540E\u8005\u6027\u80FD\u8F83\u4F4E\u3002</p><h1 id="_5-\u5F02\u6B65\u7EC4\u4EF6" tabindex="-1"><a class="header-anchor" href="#_5-\u5F02\u6B65\u7EC4\u4EF6" aria-hidden="true">#</a> 5.\u5F02\u6B65\u7EC4\u4EF6</h1><p>\u573A\u666F:\u9879\u76EE\u8FC7\u5927\u5C31\u4F1A\u5BFC\u81F4\u52A0\u8F7D\u7F13\u6162,\u6240\u4EE5\u5F02\u6B65\u7EC4\u4EF6\u5B9E\u73B0\u6309\u9700\u52A0\u8F7D\u5C31\u662F\u5FC5\u987B\u8981\u505A\u7684\u4E8B\u5566</p><p><strong>1.\u5F02\u6B65\u6CE8\u518C\u7EC4\u4EF6 3\u79CD\u65B9\u6CD5</strong></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u5DE5\u5382\u51FD\u6570\u6267\u884C resolve \u56DE\u8C03</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;async-webpack-example&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u8FD9\u4E2A\u7279\u6B8A\u7684 \`require\` \u8BED\u6CD5\u5C06\u4F1A\u544A\u8BC9 webpack</span>
  <span class="token comment">// \u81EA\u52A8\u5C06\u4F60\u7684\u6784\u5EFA\u4EE3\u7801\u5207\u5272\u6210\u591A\u4E2A\u5305, \u8FD9\u4E9B\u5305</span>
  <span class="token comment">// \u4F1A\u901A\u8FC7 Ajax \u8BF7\u6C42\u52A0\u8F7D</span>
  <span class="token function">require</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;./my-async-component&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> resolve<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// \u5DE5\u5382\u51FD\u6570\u8FD4\u56DE Promise</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span>
  <span class="token string">&#39;async-webpack-example&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// \u8FD9\u4E2A \`import\` \u51FD\u6570\u4F1A\u8FD4\u56DE\u4E00\u4E2A \`Promise\` \u5BF9\u8C61\u3002</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./my-async-component&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5DE5\u5382\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A\u914D\u7F6E\u5316\u7EC4\u4EF6\u5BF9\u8C61</span>
<span class="token keyword">const</span> <span class="token function-variable function">AsyncComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// \u9700\u8981\u52A0\u8F7D\u7684\u7EC4\u4EF6 (\u5E94\u8BE5\u662F\u4E00\u4E2A \`Promise\` \u5BF9\u8C61)</span>
  <span class="token literal-property property">component</span><span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./MyComponent.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// \u5F02\u6B65\u7EC4\u4EF6\u52A0\u8F7D\u65F6\u4F7F\u7528\u7684\u7EC4\u4EF6</span>
  <span class="token literal-property property">loading</span><span class="token operator">:</span> LoadingComponent<span class="token punctuation">,</span>
  <span class="token comment">// \u52A0\u8F7D\u5931\u8D25\u65F6\u4F7F\u7528\u7684\u7EC4\u4EF6</span>
  <span class="token literal-property property">error</span><span class="token operator">:</span> ErrorComponent<span class="token punctuation">,</span>
  <span class="token comment">// \u5C55\u793A\u52A0\u8F7D\u65F6\u7EC4\u4EF6\u7684\u5EF6\u65F6\u65F6\u95F4\u3002\u9ED8\u8BA4\u503C\u662F 200 (\u6BEB\u79D2)</span>
  <span class="token literal-property property">delay</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
  <span class="token comment">// \u5982\u679C\u63D0\u4F9B\u4E86\u8D85\u65F6\u65F6\u95F4\u4E14\u7EC4\u4EF6\u52A0\u8F7D\u4E5F\u8D85\u65F6\u4E86\uFF0C</span>
  <span class="token comment">// \u5219\u4F7F\u7528\u52A0\u8F7D\u5931\u8D25\u65F6\u4F7F\u7528\u7684\u7EC4\u4EF6\u3002\u9ED8\u8BA4\u503C\u662F\uFF1A\`Infinity\`</span>
  <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">3000</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>\u5F02\u6B65\u7EC4\u4EF6\u7684\u6E32\u67D3\u672C\u8D28\u4E0A\u5176\u5B9E\u5C31\u662F\u6267\u884C2\u6B21\u6216\u80052\u6B21\u4EE5\u4E0A\u7684\u6E32\u67D3, \u5148\u628A\u5F53\u524D\u7EC4\u4EF6\u6E32\u67D3\u4E3A\u6CE8\u91CA\u8282\u70B9, \u5F53\u7EC4\u4EF6\u52A0\u8F7D\u6210\u529F\u540E, \u901A\u8FC7 forceRender \u6267\u884C\u91CD\u65B0\u6E32\u67D3\u3002\u6216\u8005\u662F\u6E32\u67D3\u4E3A\u6CE8\u91CA\u8282\u70B9, \u7136\u540E\u518D\u6E32\u67D3\u4E3Aloading\u8282\u70B9, \u5728\u6E32\u67D3\u4E3A\u8BF7\u6C42\u5B8C\u6210\u7684\u7EC4\u4EF6</p><p>2.\u8DEF\u7531\u7684\u6309\u9700\u52A0\u8F7D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>webpack<span class="token operator">&lt;</span> <span class="token number">2.4</span> \u65F6
<span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">components</span><span class="token operator">:</span><span class="token parameter">resolve</span><span class="token operator">=&gt;</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;@/components/home&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>resolve<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

webpack<span class="token operator">&gt;</span> <span class="token number">2.4</span> \u65F6
<span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">components</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;@/components/home&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\u65B9\u6CD5\u7531es6\u63D0\u51FA\uFF0C<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\u65B9\u6CD5\u662F\u52A8\u6001\u52A0\u8F7D\uFF0C\u8FD4\u56DE\u4E00\u4E2APromise\u5BF9\u8C61\uFF0Cthen\u65B9\u6CD5\u7684\u53C2\u6570\u662F\u52A0\u8F7D\u5230\u7684\u6A21\u5757\u3002\u7C7B\u4F3C\u4E8ENode
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h1 id="_6-\u52A8\u6001\u7EC4\u4EF6" tabindex="-1"><a class="header-anchor" href="#_6-\u52A8\u6001\u7EC4\u4EF6" aria-hidden="true">#</a> 6.\u52A8\u6001\u7EC4\u4EF6</h1><p>\u573A\u666F:\u505A\u4E00\u4E2A tab \u5207\u6362\u65F6\u5C31\u4F1A\u6D89\u53CA\u5230\u7EC4\u4EF6\u52A8\u6001\u52A0\u8F7D</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name"><span class="token namespace">v-bind:</span>is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>currentTabComponent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u4F46\u662F\u8FD9\u6837\u6BCF\u6B21\u7EC4\u4EF6\u90FD\u4F1A\u91CD\u65B0\u52A0\u8F7D,\u4F1A\u6D88\u8017\u5927\u91CF\u6027\u80FD,\u6240\u4EE5 \u5C31\u8D77\u5230\u4E86\u4F5C\u7528</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name"><span class="token namespace">v-bind:</span>is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>currentTabComponent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u8FD9\u6837\u5207\u6362\u6548\u679C\u6CA1\u6709\u52A8\u753B\u6548\u679C,\u8FD9\u4E2A\u4E5F\u4E0D\u7528\u7740\u6025,\u53EF\u4EE5\u5229\u7528\u5185\u7F6E\u7684</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;transition&gt;
&lt;keep-alive&gt;
  &lt;component v-bind:is=&quot;currentTabComponent&quot;&gt;&lt;/component&gt;
&lt;/keep-alive&gt;
&lt;/transition&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h1 id="_7-\u9012\u5F52\u7EC4\u4EF6" tabindex="-1"><a class="header-anchor" href="#_7-\u9012\u5F52\u7EC4\u4EF6" aria-hidden="true">#</a> 7.\u9012\u5F52\u7EC4\u4EF6</h1><p>\u573A\u666F:\u5982\u679C\u5F00\u53D1\u4E00\u4E2A tree \u7EC4\u4EF6,\u91CC\u9762\u5C42\u7EA7\u662F\u6839\u636E\u540E\u53F0\u6570\u636E\u51B3\u5B9A\u7684,\u8FD9\u4E2A\u65F6\u5019\u5C31\u9700\u8981\u7528\u5230\u52A8\u6001\u7EC4\u4EF6</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>// \u9012\u5F52\u7EC4\u4EF6: \u7EC4\u4EF6\u5728\u5B83\u7684\u6A21\u677F\u5185\u53EF\u4EE5\u9012\u5F52\u7684\u8C03\u7528\u81EA\u5DF1\uFF0C\u53EA\u8981\u7ED9\u7EC4\u4EF6\u8BBE\u7F6Ename\u7EC4\u4EF6\u5C31\u53EF\u4EE5\u4E86\u3002
// \u8BBE\u7F6E\u90A3\u4E48House\u5728\u7EC4\u4EF6\u6A21\u677F\u5185\u5C31\u53EF\u4EE5\u9012\u5F52\u4F7F\u7528\u4E86,\u4E0D\u8FC7\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C
// \u5FC5\u987B\u7ED9\u4E00\u4E2A\u6761\u4EF6\u6765\u9650\u5236\u6570\u91CF\uFF0C\u5426\u5219\u4F1A\u629B\u51FA\u9519\u8BEF: max stack size exceeded
// \u7EC4\u4EF6\u9012\u5F52\u7528\u6765\u5F00\u53D1\u4E00\u4E9B\u5177\u4F53\u6709\u672A\u77E5\u5C42\u7EA7\u5173\u7CFB\u7684\u72EC\u7ACB\u7EC4\u4EF6\u3002\u6BD4\u5982\uFF1A
// \u8054\u7EA7\u9009\u62E9\u5668\u548C\u6811\u5F62\u63A7\u4EF6 

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(item,index) in treeArr<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      \u5B50\u7EC4\u4EF6\uFF0C\u5F53\u524D\u5C42\u7EA7\u503C\uFF1A {{index}} <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/&gt;</span></span>
      <span class="token comment">&lt;!-- \u9012\u5F52\u8C03\u7528\u81EA\u8EAB, \u540E\u53F0\u5224\u65AD\u662F\u5426\u4E0D\u5B58\u5728\u6539\u503C --&gt;</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tree</span> <span class="token attr-name">:item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.arr<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.flag<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tree</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u5FC5\u987B\u5B9A\u4E49name\uFF0C\u7EC4\u4EF6\u5185\u90E8\u624D\u80FD\u9012\u5F52\u8C03\u7528</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;tree&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// \u63A5\u6536\u5916\u90E8\u4F20\u5165\u7684\u503C</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span>Array<span class="token punctuation">,</span>
      <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>\u9012\u5F52\u7EC4\u4EF6\u5FC5\u987B\u8BBE\u7F6Ename \u548C\u7ED3\u675F\u7684\u9600\u503C</p><h1 id="_17-vue-filter" tabindex="-1"><a class="header-anchor" href="#_17-vue-filter" aria-hidden="true">#</a> 17. Vue.filter</h1><p>\u573A\u666F:\u65F6\u95F4\u6233\u8F6C\u5316\u6210\u5E74\u6708\u65E5\u8FD9\u662F\u4E00\u4E2A\u516C\u5171\u65B9\u6CD5,\u6240\u4EE5\u53EF\u4EE5\u62BD\u79BB\u6210\u8FC7\u6EE4\u5668\u4F7F\u7528</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u4F7F\u7528</span>
<span class="token comment">// \u5728\u53CC\u82B1\u62EC\u53F7\u4E2D</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> message <span class="token operator">|</span> capitalize <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token comment">// \u5728 \`v-bind\` \u4E2D</span>
<span class="token operator">&lt;</span>div v<span class="token operator">-</span>bind<span class="token operator">:</span>id<span class="token operator">=</span><span class="token string">&quot;rawId | formatId&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

<span class="token comment">// \u5168\u5C40\u6CE8\u518C</span>
Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;stampToYYMMDD&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token comment">// \u5904\u7406\u903B\u8F91</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// \u5C40\u90E8\u6CE8\u518C</span>
<span class="token literal-property property">filters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">stampToYYMMDD</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5904\u7406\u903B\u8F91</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u591A\u4E2A\u8FC7\u6EE4\u5668\u5168\u5C40\u6CE8\u518C</span>
<span class="token comment">// /src/common/filters.js</span>
<span class="token keyword">let</span> <span class="token function-variable function">dateServer</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> value<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\\d{4})(\\d{2})(\\d{2})</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;$1-$2-$3&#39;</span><span class="token punctuation">)</span> 
<span class="token keyword">export</span> <span class="token punctuation">{</span> dateServer <span class="token punctuation">}</span>
<span class="token comment">// /src/main.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> custom <span class="token keyword">from</span> <span class="token string">&#39;./common/filters/custom&#39;</span>
Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>custom<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=&gt;</span> Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> custom<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h1 id="_18-vue-compile" tabindex="-1"><a class="header-anchor" href="#_18-vue-compile" aria-hidden="true">#</a> 18.Vue.compile</h1><p>\u573A\u666F:\u5728 render \u51FD\u6570\u4E2D\u7F16\u8BD1\u6A21\u677F\u5B57\u7B26\u4E32\u3002\u53EA\u5728\u72EC\u7ACB\u6784\u5EFA\u65F6\u6709\u6548</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> res <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;div&gt;&lt;span&gt;{{ msg }}&lt;/span&gt;&lt;/div&gt;&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">render</span><span class="token operator">:</span> res<span class="token punctuation">.</span>render<span class="token punctuation">,</span>
  <span class="token literal-property property">staticRenderFns</span><span class="token operator">:</span> res<span class="token punctuation">.</span>staticRenderFns
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h1 id="_19-vue-version" tabindex="-1"><a class="header-anchor" href="#_19-vue-version" aria-hidden="true">#</a> 19.Vue.version</h1><p>\u573A\u666F:\u6709\u4E9B\u5F00\u53D1\u63D2\u4EF6\u9700\u8981\u9488\u5BF9\u4E0D\u540C vue \u7248\u672C\u505A\u517C\u5BB9,\u6240\u4EE5\u5C31\u4F1A\u7528\u5230 Vue.version \u7528\u6CD5:Vue.version()\u53EF\u4EE5\u83B7\u53D6 vue \u7248\u672C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> version <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>version<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>version <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Vue v2.x.x</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>version <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Vue v1.x.x</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// Unsupported versions of Vue</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h1 id="_20-vue-set" tabindex="-1"><a class="header-anchor" href="#_20-vue-set" aria-hidden="true">#</a> 20.Vue.set()</h1><p>\u573A\u666F:\u5F53\u4F60\u5229\u7528\u7D22\u5F15\u76F4\u63A5\u8BBE\u7F6E\u4E00\u4E2A\u6570\u7EC4\u9879\u65F6\u6216\u4F60\u4FEE\u6539\u6570\u7EC4\u7684\u957F\u5EA6\u65F6,\u7531\u4E8E Object.defineprototype()\u65B9\u6CD5\u9650\u5236,\u6570\u636E\u4E0D\u54CD\u5E94\u5F0F\u66F4\u65B0 \u4E0D\u8FC7vue.3.x \u5C06\u5229\u7528 proxy \u8FD9\u4E2A\u95EE\u9898\u5C06\u5F97\u5230\u89E3\u51B3 \u89E3\u51B3\u65B9\u6848:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5229\u7528 set
this.$set(arr,index,item)

// \u5229\u7528\u6570\u7EC4 push(),splice()
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h1 id="_22-vue-config-performance" tabindex="-1"><a class="header-anchor" href="#_22-vue-config-performance" aria-hidden="true">#</a> 22.Vue.config.performance</h1><p>\u573A\u666F:\u76D1\u542C\u6027\u80FD</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Vue.config.performance = true
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h1 id="_27-v-once" tabindex="-1"><a class="header-anchor" href="#_27-v-once" aria-hidden="true">#</a> 27.v-once</h1><p>\u573A\u666F:\u6709\u4E9B template \u4E2D\u7684\u9759\u6001 dom \u6CA1\u6709\u6539\u53D8,\u8FD9\u65F6\u5C31\u53EA\u9700\u8981\u6E32\u67D3\u4E00\u6B21,\u53EF\u4EE5\u964D\u4F4E\u6027\u80FD\u5F00\u9500</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;span v-once&gt; \u8FD9\u65F6\u53EA\u9700\u8981\u52A0\u8F7D\u4E00\u6B21\u7684\u6807\u7B7E&lt;/span&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>v-once \u548C v-pre \u7684\u533A\u522B: v-once\u53EA\u6E32\u67D3\u4E00\u6B21\uFF1Bv-pre\u4E0D\u7F16\u8BD1,\u539F\u6837\u8F93\u51FA</p><h1 id="_30-vue-router" tabindex="-1"><a class="header-anchor" href="#_30-vue-router" aria-hidden="true">#</a> 30.Vue-router \u2B50</h1><p>\u573A\u666F:Vue-router \u662F\u5B98\u65B9\u63D0\u4F9B\u7684\u8DEF\u7531\u63D2\u4EF6</p><h2 id="_30-1-\u7F13\u5B58\u548C\u52A8\u753B" tabindex="-1"><a class="header-anchor" href="#_30-1-\u7F13\u5B58\u548C\u52A8\u753B" aria-hidden="true">#</a> 30.1 \u7F13\u5B58\u548C\u52A8\u753B</h2><p>1.\u8DEF\u7531\u662F\u4F7F\u7528\u5B98\u65B9\u7EC4\u4EF6 vue-router,\u4F7F\u7528\u65B9\u6CD5\u76F8\u4FE1\u5927\u5BB6\u975E\u5E38\u719F\u6089; 2.\u8FD9\u91CC\u6211\u5C31\u53D9\u8FF0\u4E0B\u8DEF\u7531\u7684\u7F13\u5B58\u548C\u52A8\u753B; 3.\u53EF\u4EE5\u7528exclude(\u9664\u4E86)\u6216\u8005include(\u5305\u62EC),2.1.0 \u65B0\u589E\u6765\u5750\u5224\u65AD</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;transition&gt;
  &lt;keep-alive :include=&quot;[&#39;a&#39;, &#39;b&#39;]&quot;&gt;
  //\u6216include=&quot;a,b&quot; :include=&quot;/a|b/&quot;,a \u548C b \u8868\u793A\u7EC4\u4EF6\u7684 name
  //\u56E0\u4E3A\u6709\u4E9B\u9875\u9762,\u5982\u8BD5\u8BD5\u6570\u636E\u7EDF\u8BA1,\u8981\u5B9E\u65F6\u5237\u65B0,\u6240\u4EE5\u5C31\u4E0D\u9700\u8981\u7F13\u5B58
    &lt;router-view/&gt; //\u8DEF\u7531\u6807\u7B7E
  &lt;/keep-alive&gt;
  &lt;router-view exclude=&quot;c&quot;/&gt; 
  // c \u8868\u793A\u7EC4\u4EF6\u7684 name\u503C
&lt;/transition&gt;
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u6CE8:\u5339\u914D\u9996\u5148\u68C0\u67E5\u7EC4\u4EF6\u81EA\u8EAB\u7684 name \u9009\u9879\uFF0C\u5982\u679C name \u9009\u9879\u4E0D\u53EF\u7528\uFF0C\u5219\u5339\u914D\u5B83\u7684\u5C40\u90E8\u6CE8\u518C\u540D\u79F0 (\u7236\u7EC4\u4EF6 components \u9009\u9879\u7684\u952E\u503C)\u3002\u533F\u540D\u7EC4\u4EF6\u4E0D\u80FD\u88AB\u5339\u914D 4.\u7528 v-if \u505A\u5224\u65AD,\u7EC4\u4EF6\u4F1A\u91CD\u65B0\u6E32\u67D3,\u4F46\u662F\u4E0D\u7528\u4E00\u4E00\u5217\u4E3E\u7EC4\u4EF6 name</p><h2 id="_30-2-\u5168\u5C40\u8DEF\u7531\u94A9\u5B50" tabindex="-1"><a class="header-anchor" href="#_30-2-\u5168\u5C40\u8DEF\u7531\u94A9\u5B50" aria-hidden="true">#</a> 30.2 \u5168\u5C40\u8DEF\u7531\u94A9\u5B50</h2><p>1.router.beforeEach</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u5168\u5C40\u524D\u7F6E\u5B88\u536B\uFF1AbeforeEach -- next\u9700\u8981\u8C03\u7528&#39;</span><span class="token punctuation">)</span> <span class="token comment">//\u4E00\u822C\u767B\u5F55\u62E6\u622A\u7528\u8FD9\u4E2A,\u4E5F\u53EB\u5BFC\u822A\u94A9\u5B50\u5B88\u536B</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>path <span class="token operator">===</span> <span class="token string">&#39;/login&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>2.router.beforeResolve (v 2.5.0+) \u548CbeforeEach\u7C7B\u4F3C\uFF0C\u533A\u522B\u662F\u5728\u5BFC\u822A\u88AB\u786E\u8BA4\u4E4B\u524D\uFF0C\u540C\u65F6\u5728\u6240\u6709\u7EC4\u4EF6\u5185\u5B88\u536B\u548C\u5F02\u6B65\u8DEF\u7531\u7EC4\u4EF6\u88AB\u89E3\u6790\u4E4B\u540E\uFF0C\u89E3\u6790\u5B88\u536B\u5C31\u88AB\u8C03\u7528 \u5373\u5728 beforeEach\u4E4B\u540E\u8C03\u7528</p><p>3.router.afterEach \u5168\u5C40\u540E\u7F6E\u94A9\u5B50 \u5728\u6240\u6709\u8DEF\u7531\u8DF3\u8F6C\u7ED3\u675F\u7684\u65F6\u5019\u8C03\u7528 \u8FD9\u4E9B\u94A9\u5B50\u4E0D\u4F1A\u63A5\u53D7 next \u51FD\u6570\u4E5F\u4E0D\u4F1A\u6539\u53D8\u5BFC\u822A\u672C\u8EAB</p><h2 id="_30-3-\u7EC4\u4EF6\u8DEF\u7531\u94A9\u5B50" tabindex="-1"><a class="header-anchor" href="#_30-3-\u7EC4\u4EF6\u8DEF\u7531\u94A9\u5B50" aria-hidden="true">#</a> 30.3 \u7EC4\u4EF6\u8DEF\u7531\u94A9\u5B50</h2><p>1.beforeRouteEnter \u5728\u6E32\u67D3\u8BE5\u7EC4\u4EF6\u7684\u5BF9\u5E94\u8DEF\u7531\u88AB\u786E\u8BA4\u524D\u8C03\u7528\uFF0C\u7528\u6CD5\u548C\u53C2\u6570\u4E0Erouter.beforeEach\u7C7B\u4F3C\uFF0Cnext\u9700\u8981\u88AB\u4E3B\u52A8\u8C03\u7528 \u6B64\u65F6\u7EC4\u4EF6\u5B9E\u4F8B\u8FD8\u672A\u88AB\u521B\u5EFA\uFF0C\u4E0D\u80FD\u8BBF\u95EEthis \u53EF\u4EE5\u901A\u8FC7\u4F20\u4E00\u4E2A\u56DE\u8C03\u7ED9 next\u6765\u8BBF\u95EE\u7EC4\u4EF6\u5B9E\u4F8B\u3002\u5728\u5BFC\u822A\u88AB\u786E\u8BA4\u7684\u65F6\u5019\u6267\u884C\u56DE\u8C03\uFF0C\u5E76\u4E14\u628A\u7EC4\u4EF6\u5B9E\u4F8B\u4F5C\u4E3A\u56DE\u8C03\u65B9\u6CD5\u7684\u53C2\u6570</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">beforeRouteEnter</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u8FD9\u91CC\u8FD8\u65E0\u6CD5\u8BBF\u95EE\u5230\u7EC4\u4EF6\u5B9E\u4F8B\uFF0Cthis === undefined</span>
  <span class="token function">next</span><span class="token punctuation">(</span> <span class="token parameter">vm</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u901A\u8FC7 \`vm\` \u8BBF\u95EE\u7EC4\u4EF6\u5B9E\u4F8B</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>2.beforeRouteUpdate (v 2.2+) \u5728\u5F53\u524D\u8DEF\u7531\u6539\u53D8\uFF0C\u5E76\u4E14\u8BE5\u7EC4\u4EF6\u88AB\u590D\u7528\u65F6\u8C03\u7528\uFF0C\u53EF\u4EE5\u901A\u8FC7this\u8BBF\u95EE\u5B9E\u4F8B\uFF0C next\u9700\u8981\u88AB\u4E3B\u52A8\u8C03\u7528\uFF0C\u4E0D\u80FD\u4F20\u56DE\u8C03</p><p>3.beforeRouteLeave \u5BFC\u822A\u79BB\u5F00\u8BE5\u7EC4\u4EF6\u7684\u5BF9\u5E94\u8DEF\u7531\u65F6\u8C03\u7528\uFF0C\u53EF\u4EE5\u8BBF\u95EE\u7EC4\u4EF6\u5B9E\u4F8B this\uFF0Cnext\u9700\u8981\u88AB\u4E3B\u52A8\u8C03\u7528\uFF0C\u4E0D\u80FD\u4F20\u56DE\u8C03</p><h2 id="_30-4-\u8DEF\u7531\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_30-4-\u8DEF\u7531\u6A21\u5F0F" aria-hidden="true">#</a> 30.4 \u8DEF\u7531\u6A21\u5F0F</h2><p>\u8BBE\u7F6E mode \u5C5E\u6027:hash\u6216 history</p><h2 id="_30-5-vue-router" tabindex="-1"><a class="header-anchor" href="#_30-5-vue-router" aria-hidden="true">#</a> 30.5 Vue.$router</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>this.$router.push():\u8DF3\u8F6C\u5230\u4E0D\u540C\u7684url\uFF0C\u4F46\u8FD9\u4E2A\u65B9\u6CD5\u56DE\u5411history\u6808\u6DFB\u52A0\u4E00\u4E2A\u8BB0\u5F55\uFF0C\u70B9\u51FB\u540E\u9000\u4F1A\u8FD4\u56DE\u5230\u4E0A\u4E00\u4E2A\u9875\u9762
this.$router.replace():\u4E0D\u4F1A\u6709\u8BB0\u5F55
this.$router.go(n):n\u53EF\u4E3A\u6B63\u6570\u53EF\u4E3A\u8D1F\u6570\u3002\u6B63\u6570\u524D\u8FDB\uFF0C \u8D1F\u6570\u540E\u9000,\u7C7B\u4F3C window.history.go(n)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_30-6-vue-route" tabindex="-1"><a class="header-anchor" href="#_30-6-vue-route" aria-hidden="true">#</a> 30.6 Vue.$route</h2><p>\u8868\u793A\u5F53\u524D\u8DF3\u8F6C\u7684\u8DEF\u7531\u5BF9\u8C61,\u5C5E\u6027\u6709: name:\u8DEF\u7531\u540D\u79F0 path:\u8DEF\u5F84 query:\u4F20\u53C2\u63A5\u6536\u503C params:\u4F20\u53C2\u63A5\u6536\u503C fullPath:\u5B8C\u6210\u89E3\u6790\u540E\u7684 URL\uFF0C\u5305\u542B\u67E5\u8BE2\u53C2\u6570\u548C hash \u7684\u5B8C\u6574\u8DEF\u5F84 matched:\u8DEF\u7531\u8BB0\u5F55\u526F\u672C redirectedFrom:\u5982\u679C\u5B58\u5728\u91CD\u5B9A\u5411\uFF0C\u5373\u4E3A\u91CD\u5B9A\u5411\u6765\u6E90\u7684\u8DEF\u7531\u7684\u540D\u5B57</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>this.$route.params.id:\u83B7\u53D6\u901A\u8FC7 params \u6216/:id\u4F20\u53C2\u7684\u53C2\u6570
this.$route.query.id:\u83B7\u53D6\u901A\u8FC7 query \u4F20\u53C2\u7684\u53C2\u6570
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="_30-7-router-view-\u7684-key" tabindex="-1"><a class="header-anchor" href="#_30-7-router-view-\u7684-key" aria-hidden="true">#</a> 30.7 router-view \u7684 key</h2><p>\u573A\u666F:\u7531\u4E8E Vue \u4F1A\u590D\u7528\u76F8\u540C\u7EC4\u4EF6, \u5373 /page/1 =&gt; /page/2 \u6216\u8005 /page?id=1 =&gt; /page?id=2 \u8FD9\u7C7B\u94FE\u63A5\u8DF3\u8F6C\u65F6, \u5C06\u4E0D\u5728\u6267\u884Ccreated, mounted\u4E4B\u7C7B\u7684\u94A9\u5B50</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>$route.fullPath<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u8FD9\u6837\u7EC4\u4EF6\u7684 created \u548C mounted \u5C31\u90FD\u4F1A\u6267\u884C</p><h1 id="_33-vue-loader-\u5C0F\u6280\u5DE7" tabindex="-1"><a class="header-anchor" href="#_33-vue-loader-\u5C0F\u6280\u5DE7" aria-hidden="true">#</a> 33.vue-loader \u5C0F\u6280\u5DE7</h1><h2 id="_33-1-preservewhitespace" tabindex="-1"><a class="header-anchor" href="#_33-1-preservewhitespace" aria-hidden="true">#</a> 33.1 preserveWhitespace</h2><p>\u573A\u666F:\u5F00\u53D1 vue \u4EE3\u7801\u4E00\u822C\u4F1A\u6709\u7A7A\u683C,\u8FD9\u4E2A\u65F6\u5019\u6253\u5305\u538B\u7F29\u5982\u679C\u4E0D\u53BB\u6389\u7A7A\u683C\u4F1A\u52A0\u5927\u5305\u7684\u4F53\u79EF \u914D\u7F6EpreserveWhitespace\u53EF\u4EE5\u51CF\u5C0F\u5305\u7684\u4F53\u79EF</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>{
  vue: {
    preserveWhitespace: false
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_33-2-transformtorequire" tabindex="-1"><a class="header-anchor" href="#_33-2-transformtorequire" aria-hidden="true">#</a> 33.2 transformToRequire</h2><p>\u573A\u666F:\u4EE5\u524D\u5728\u5199 Vue \u7684\u65F6\u5019\u7ECF\u5E38\u4F1A\u5199\u5230\u8FD9\u6837\u7684\u4EE3\u7801\uFF1A\u628A\u56FE\u7247\u63D0\u524D require \u4F20\u7ED9\u4E00\u4E2A\u53D8\u91CF\u518D\u4F20\u7ED9\u7EC4\u4EF6</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>// page \u4EE3\u7801
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u73B0\u5728:\u901A\u8FC7\u914D\u7F6E transformToRequire \u540E\uFF0C\u5C31\u53EF\u4EE5\u76F4\u63A5\u914D\u7F6E\uFF0C\u8FD9\u6837vue-loader\u4F1A\u628A\u5BF9\u5E94\u7684\u5C5E\u6027\u81EA\u52A8 require \u4E4B\u540E\u4F20\u7ED9\u7EC4\u4EF6</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>// vue-cli 2.x\u5728vue-loader.conf.js \u9ED8\u8BA4\u914D\u7F6E\u662F
transformToRequire: {
    video: [&#39;src&#39;, &#39;poster&#39;],
    source: &#39;src&#39;,
    img: &#39;src&#39;,
    image: &#39;xlink:href&#39;
}

// \u914D\u7F6E\u6587\u4EF6,\u5982\u679C\u662Fvue-cli2.x \u5728vue-loader.conf.js\u91CC\u9762\u4FEE\u6539
  avatar: [&#39;default-src&#39;]

// vue-cli 3.x \u5728vue.config.js
// vue-cli 3.x \u5C06transformToRequire\u5C5E\u6027\u6362\u4E3A\u4E86transformAssetUrls
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

// page \u4EE3\u7801\u53EF\u4EE5\u7B80\u5316\u4E3A
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>avatar</span> <span class="token attr-name">img-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./assets/default-avatar.png<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>avatar</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h1 id="_34-\u4E3A\u8DEF\u5F84\u8BBE\u7F6E\u522B\u540D" tabindex="-1"><a class="header-anchor" href="#_34-\u4E3A\u8DEF\u5F84\u8BBE\u7F6E\u522B\u540D" aria-hidden="true">#</a> 34.\u4E3A\u8DEF\u5F84\u8BBE\u7F6E\u522B\u540D</h1><p>1.\u573A\u666F:\u5728\u5F00\u53D1\u8FC7\u7A0B\u4E2D\uFF0C\u6211\u4EEC\u7ECF\u5E38\u9700\u8981\u5F15\u5165\u5404\u79CD\u6587\u4EF6\uFF0C\u5982\u56FE\u7247\u3001CSS\u3001JS\u7B49\uFF0C\u4E3A\u4E86\u907F\u514D\u5199\u5F88\u957F\u7684\u76F8\u5BF9\u8DEF\u5F84\uFF08../\uFF09\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4E3A\u4E0D\u540C\u7684\u76EE\u5F55\u914D\u7F6E\u4E00\u4E2A\u522B\u540D</p><p>2.vue-cli 2.x \u914D\u7F6E</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u5728 webpack.base.config.js\u4E2D\u7684 resolve \u914D\u7F6E\u9879\uFF0C\u5728\u5176 alias \u4E2D\u589E\u52A0\u522B\u540D</span>
<span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.vue&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.json&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;vue$&#39;</span><span class="token operator">:</span> <span class="token string">&#39;vue/dist/vue.esm.js&#39;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>3.vue-cli 3.x \u914D\u7F6E</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u5728\u6839\u76EE\u5F55\u4E0B\u521B\u5EFAvue.config.js</span>
<span class="token keyword">var</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">resolve</span> <span class="token punctuation">(</span><span class="token parameter">dir</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span>
  <span class="token keyword">return</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> dir<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token parameter">config</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>resolve<span class="token punctuation">.</span>alias
      <span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token comment">// key,value\u81EA\u884C\u5B9A\u4E49\uFF0C\u6BD4\u5982.set(&#39;@@&#39;, resolve(&#39;src/components&#39;))</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h1 id="_35-img-\u52A0\u8F7D\u5931\u8D25" tabindex="-1"><a class="header-anchor" href="#_35-img-\u52A0\u8F7D\u5931\u8D25" aria-hidden="true">#</a> 35.img \u52A0\u8F7D\u5931\u8D25</h1><p>\u573A\u666F:\u6709\u4E9B\u65F6\u5019\u540E\u53F0\u8FD4\u56DE\u56FE\u7247\u5730\u5740\u4E0D\u4E00\u5B9A\u80FD\u6253\u5F00,\u6240\u4EE5\u8FD9\u4E2A\u65F6\u5019\u5E94\u8BE5\u52A0\u4E00\u5F20\u9ED8\u8BA4\u56FE\u7247</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>// page \u4EE3\u7801
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
      e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>src<span class="token operator">=</span><span class="token function">reqiure</span><span class="token punctuation">(</span><span class="token string">&#39;\u56FE\u7247\u8DEF\u5F84&#39;</span><span class="token punctuation">)</span> <span class="token comment">//\u5F53\u7136\u5982\u679C\u9879\u76EE\u914D\u7F6E\u4E86transformToRequire,\u53C2\u8003\u4E0A\u9762 33.2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h1 id="_36-css" tabindex="-1"><a class="header-anchor" href="#_36-css" aria-hidden="true">#</a> 36.css</h1><h2 id="_36-1-\u5C40\u90E8\u6837\u5F0F" tabindex="-1"><a class="header-anchor" href="#_36-1-\u5C40\u90E8\u6837\u5F0F" aria-hidden="true">#</a> 36.1 \u5C40\u90E8\u6837\u5F0F</h2><p>1.Vue\u4E2Dstyle\u6807\u7B7E\u7684scoped\u5C5E\u6027\u8868\u793A\u5B83\u7684\u6837\u5F0F\u53EA\u4F5C\u7528\u4E8E\u5F53\u524D\u6A21\u5757\uFF0C\u662F\u6837\u5F0F\u79C1\u6709\u5316.</p><p>2.\u6E32\u67D3\u7684\u89C4\u5219/\u539F\u7406\uFF1A \u7ED9HTML\u7684DOM\u8282\u70B9\u6DFB\u52A0\u4E00\u4E2A \u4E0D\u91CD\u590D\u7684data\u5C5E\u6027 \u6765\u8868\u793A \u552F\u4E00\u6027 \u5728\u5BF9\u5E94\u7684 CSS\u9009\u62E9\u5668 \u672B\u5C3E\u6DFB\u52A0\u4E00\u4E2A\u5F53\u524D\u7EC4\u4EF6\u7684 data\u5C5E\u6027\u9009\u62E9\u5668\u6765\u79C1\u6709\u5316\u6837\u5F0F\uFF0C\u5982\uFF1A.demo[data-v-2311c06a]{} \u5982\u679C\u5F15\u5165 less \u6216 sass \u53EA\u4F1A\u5728\u6700\u540E\u4E00\u4E2A\u5143\u7D20\u4E0A\u8BBE\u7F6E</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">// \u539F\u59CB\u4EE3\u7801
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

// \u6D4F\u89C8\u5668\u6E32\u67D3\u6548\u679C
&lt;div data-v-fed36922&gt;
  Vue.js scoped
&lt;/div&gt;
&lt;style type=&quot;text/css&quot;&gt;
.demo[data-v-039c5b43]</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.demo .content[data-v-039c5b43]</span> <span class="token punctuation">{</span> //.demo \u4E0A\u5E76\u6CA1\u6709\u52A0 data \u5C5E\u6027
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h2 id="_36-2-deep-\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#_36-2-deep-\u5C5E\u6027" aria-hidden="true">#</a> 36.2 deep \u5C5E\u6027</h2><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">// \u4E0A\u9762\u6837\u5F0F\u52A0\u4E00\u4E2A /deep/
&lt;style lang=&quot;less&quot; scoped&gt;
  .demo</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.demo /deep/ .content</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token selector">&lt;/style&gt;

// \u6D4F\u89C8\u5668\u7F16\u8BD1\u540E
&lt;style type=&quot;text/css&quot;&gt;
.demo[data-v-039c5b43]</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.demo[data-v-039c5b43] .content</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,114);function p(t,l){return e}var r=n(a,[["render",p],["__file","basic.html.vue"]]);export{r as default};
