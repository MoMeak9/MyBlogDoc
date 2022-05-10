import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as e}from"./app.28325d67.js";const s={},a=e(`<h1 id="vue-set-\u548Cthis-set" tabindex="-1"><a class="header-anchor" href="#vue-set-\u548Cthis-set" aria-hidden="true">#</a> Vue.set()\u548Cthis.$set()</h1><blockquote><p>\u7528\u4EE5\u89E3\u51B3Vue2.x\u7684\u54CD\u5E94\u5F0F\u7F3A\u9677</p></blockquote><p>\u53D7 ES5 \u7684\u9650\u5236\uFF0CVue.js \u4E0D\u80FD\u68C0\u6D4B\u5230\u5BF9\u8C61\u5C5E\u6027\u7684\u6DFB\u52A0\u6216\u5220\u9664\u3002\u56E0\u4E3A Vue.js \u5728\u521D\u59CB\u5316\u5B9E\u4F8B\u65F6\u5C06\u5C5E\u6027\u8F6C\u4E3A getter/setter\uFF0C\u6240\u4EE5\u5C5E\u6027\u5FC5\u987B\u5728 data \u5BF9\u8C61\u4E0A\u624D\u80FD\u8BA9 Vue.js \u8F6C\u6362\u5B83\uFF0C\u624D\u80FD\u8BA9\u5B83\u662F\u54CD\u5E94\u7684\u3002</p><p>\u6B63\u786E\u5199\u6CD5\uFF1Athis.$set(this.data,\u201Dkey\u201D,value&#39;)</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>mounted () {
  this.$set(this.student,&quot;age&quot;, 24)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote><p>Vue \u4E0D\u5141\u8BB8\u52A8\u6001\u6DFB\u52A0\u6839\u7EA7\u54CD\u5E94\u5F0F\u5C5E\u6027</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const app = new Vue({
  data: {
    a: 1
  }
  // render: h =&gt; h(Suduko)
}).$mount(&#39;#app1&#39;)

Vue.set(app.data, &#39;b&#39;, 2)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u53EA\u53EF\u4EE5\u4F7F\u7528 Vue.set(object, propertyName, value) \u65B9\u6CD5\u5411\u5D4C\u5957\u5BF9\u8C61\u6DFB\u52A0\u54CD\u5E94\u5F0F\u5C5E\u6027\uFF0C\u4F8B\u5982</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var vm=new Vue({
    el:&#39;#test&#39;,
    data:{
        //data\u4E2D\u5DF2\u7ECF\u5B58\u5728info\u6839\u5C5E\u6027
        info:{
            name:&#39;\u5C0F\u660E&#39;;
        }
    }
});
//\u7ED9info\u6DFB\u52A0\u4E00\u4E2A\u6027\u522B\u5C5E\u6027
Vue.set(vm.info,&#39;sex&#39;,&#39;\u7537&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="vue-set-\u548Cthis-set-\u5B9E\u73B0\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#vue-set-\u548Cthis-set-\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a> Vue.set()\u548Cthis.$set()\u5B9E\u73B0\u539F\u7406</h2><p>\u6211\u4EEC\u5148\u6765\u770B\u770BVue.set()\u7684\u6E90\u7801\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { set } from &#39;../observer/index&#39;


Vue.set = set
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u518D\u6765\u770B\u770Bthis.$set()\u7684\u6E90\u7801\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { set } from &#39;../observer/index&#39;


Vue.prototype.$set = set
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u7ED3\u679C\u6211\u4EEC\u53D1\u73B0Vue.set()\u548C<code>this.$set()</code>\u8FD9\u4E24\u4E2Aapi\u7684\u5B9E\u73B0\u539F\u7406\u57FA\u672C\u4E00\u6A21\u4E00\u6837\uFF0C\u90FD\u662F\u4F7F\u7528\u4E86set\u51FD\u6570\u3002set\u51FD\u6570\u662F\u4ECE ../observer/index \u6587\u4EF6\u4E2D\u5BFC\u51FA\u7684\uFF0C\u533A\u522B\u5728\u4E8EVue.set()\u662F\u5C06set\u51FD\u6570\u7ED1\u5B9A\u5728Vue\u6784\u9020\u51FD\u6570\u4E0A\uFF0C<code>this.$set()</code>\u662F\u5C06set\u51FD\u6570\u7ED1\u5B9A\u5728Vue\u539F\u578B\u4E0A\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>function set (target: Array&lt;any&gt; | Object, key: any, val: any): any {
  if (p<wbr>rocess.env.NODE_ENV !== &#39;production&#39; &amp;&amp;
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(\`Cannot set reactive property on undefined, null, or primitive value: \${(target: any)}\`)
  }
  if (Array.isArray(target) &amp;&amp; isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target &amp;&amp; !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob &amp;&amp; ob.vmCount)) {
    p<wbr>rocess.env.NODE_ENV !== &#39;production&#39; &amp;&amp; warn(
      &#39;Avoid adding reactive properties to a Vue instance or its root $data &#39; +
      &#39;at runtime - declare it upfront in the data option.&#39;
    )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>\u6211\u4EEC\u53D1\u73B0set\u51FD\u6570\u63A5\u6536\u4E09\u4E2A\u53C2\u6570\u5206\u522B\u4E3A target\u3001key\u3001val\uFF0C\u5176\u4E2Dtarget\u7684\u503C\u4E3A\u6570\u7EC4\u6216\u8005\u5BF9\u8C61\uFF0C\u8FD9\u6B63\u597D\u548C\u5B98\u7F51\u7ED9\u51FA\u7684\u8C03\u7528Vue.set()\u65B9\u6CD5\u65F6\u4F20\u5165\u7684\u53C2\u6570\u53C2\u6570\u5BF9\u5E94\u4E0A\u3002</p>`,17);function r(p,t){return a}var b=n(s,[["render",r],["__file","set.html.vue"]]);export{b as default};
