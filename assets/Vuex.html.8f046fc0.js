import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9338189c.js";const a={},e=s(`<h1 id="vuex" tabindex="-1"><a class="header-anchor" href="#vuex" aria-hidden="true">#</a> Vuex</h1><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// 1.vuex\u5176\u5B9E\u662F\u4E00\u4E2A\u5BF9\u8C61 \u91CC\u9762\u6709\u4E00\u4E2Ainstall\u65B9\u6CD5\u548C\u4E00\u4E2AStore\u7C7B\uFF0C\u5728vue.use(plugin)\u7684\u9636\u6BB5\uFF0C\u5982\u679C\u7A7F\u8FDB\u53BB\u7684plugin\u662F\u5BF9\u8C61\uFF0C\u5219\u5FC5\u987B\u62E5\u6709install\u65B9\u6CD5\uFF0C\u8C03\u7528install\u65B9\u6CD5\uFF0C\u5982\u679C\u7A7F\u8FDB\u53BB\u7684\u662F\u51FD\u6570\uFF0C\u5219\u76F4\u63A5\u628A\u51FD\u6570\u5F53\u4F5Cinstall\u65B9\u6CD5\u3002

// 2.install\u65B9\u6CD5\u63A5\u6536vue\u5F53\u4F5C\u53C2\u6570\uFF0C\u4ECE$option\u6765\u4F20\u9012\u7ED9\u6BCF\u4E2A\u7EC4\u4EF6\u6302\u8F7Dstore\u5B9E\u4F8B

// 3.Store\u7C7B\u62E5\u6709 commit mutation dispatch getter\u7B49\u65B9\u6CD5\uFF0Cstate\u53CC\u5411\u7ED1\u5B9A\u662F\u56E0\u4E3A\uFF0CStore\u5C06\u4F20\u8FDB\u6765\u7684state\u5305\u88C5\u6210data\uFF0C\u4F5C\u4E3Anew Vue\u7684\u53C2\u6570\uFF0C\u4ECE\u800C\u5B9E\u73B0\u54CD\u5E94\u5F0F

class Store {
	constructor(options) {
		this.vm = new Vue({
			data: {
				state: options.state,
			},
		});

		let getters = options.getter || {};
		this.getters = {};
		Object.keys(getters).forEach((getterName) =&gt; {
			Object.defineProperty(this.getters, getterName, {
				get: () =&gt; {
					return getters[getterName](this.state);
				},
			});
		});

		let mutations = options.mutations || {};
		this.mutations = {};
		Object.keys(mutations).forEach((mutationName) =&gt; {
			this.mutations[mutationName] = (arg) =&gt; {
				mutations[mutationName](this.state, arg);
			};
		});

		let actions = options.actions;
		this.actions = {};
		Object.keys(actions).forEach((actionName) =&gt; {
			this.actions[actionName] = (arg) =&gt; {
				actions[actionName](this, arg);
			};
		});
	}
	dispatch(method, arg) {
		this.actions[method](arg);
	}
	commit = (method, arg) =&gt; {
		this.mutations[method](arg);
	};
	get state() {
		return this.vm.state;
	}
}
let install = (Vue) =&gt; {
	Vue.mixin({
		beforeCreate() {
			if (this.$options &amp;&amp; this.$options.store) {
				this.$store = this.$options;
			} else {
				this.$store = this.$parent &amp;&amp; this.$parent.$store;
			}
		},
	});
};

let Vuex = {
	Store,
	install,
};

export default Vuex;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br></div></div><h2 id="vuex\u8FDB\u9636" tabindex="-1"><a class="header-anchor" href="#vuex\u8FDB\u9636" aria-hidden="true">#</a> <strong>vuex\u8FDB\u9636</strong></h2><h2 id="\u4E00\u3001state" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001state" aria-hidden="true">#</a> <strong>\u4E00\u3001state</strong></h2><p>1.1 \u5F15\u5165vuex \u4EE5\u540E\uFF0C\u6211\u4EEC\u9700\u8981\u5728state\u4E2D\u5B9A\u4E49\u53D8\u91CF\uFF0C\u7C7B\u4F3C\u4E8Evue\u4E2D\u7684data\uFF0C\u901A\u8FC7state\u6765\u5B58\u653E\u72B6\u6001</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import Vue from &#39;vue&#39;
import Vuex from &#39;vuex&#39;
Vue.use(Vuex)
export default new Vuex.Store({
  state: { //\u5B58\u653E\u72B6\u6001
    nickname:&#39;Simba&#39;,
    age:20,
    gender:&#39;\u7537&#39;
  },
  mutations: {},
  actions: {},
  modules: {}
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u6CE8\u518C\u4E24\u4E2A\u7EC4\u4EF6\u5206\u522B\u5F15\u5165\u5230app.vue\u4E2D</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;div id=&quot;app&quot;&gt;
    &lt;vabout&gt; &lt;/vabout&gt;
    &lt;vhome&gt; &lt;/vhome&gt;
  &lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>vhome\u7EC4\u4EF6\u5185\u5BB9</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;div class=&quot;home&quot;&gt;{{$store.state.nickname}}&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>vabout\u7EC4\u4EF6\u5185\u5BB9</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;h1&gt;{{$store.state.nickname}}:{{$store.state.age}}&lt;/h1&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://pic1.zhimg.com/80/v2-8890ec305e093e06c90086591abbf42c_720w.jpg" alt="img"></p><p>\u5982\u56FE\uFF0C\u663E\u793A\u51FA\u663E\u793A\u51FA\u76F8\u5E94\u7684\u5185\u5BB9\uFF0C\u6709\u4E86vuex\uFF0C\u6211\u4EEC\u4E0D\u5FC5\u5728\u8003\u8651\u7EC4\u4EF6\u4E4B\u95F4\u7684\u4F20\u503C\uFF0C\u76F4\u63A5\u5C31\u53EF\u4EE5\u901A\u8FC7$store\u6765\u83B7\u53D6\u4E0D\u540C\u7684\u6570\u636E\uFF0C\u4F46\u662F\u5982\u679C\u9700\u8981vuex\u4E2D\u7684\u591A\u4E2A\u6570\u636E\u7684\u8FD9\u65F6\u5019\uFF0C\u8FD9\u6837\u5199\u5C31\u592A\u5570\u55E6\u4E86\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5C06\u5B83\u5B9A\u4E49\u5728computed\u4E2D\u3002</p><p><code>Props</code>\uFF0C<code>methods</code>,<code>data</code>\u548C<code>computed</code>\u7684\u521D\u59CB\u5316\u90FD\u662F\u5728<code>beforeCreated</code>\u548C<code>created</code>\u4E4B\u95F4\u5B8C\u6210\u7684\u3002</p><p>\u4F8B\uFF1A</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>&lt;template&gt;
  &lt;div class=&quot;home&quot;&gt;
    {{nickname}}
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  name: &#39;home&#39;,
  computed:{
    nickname(){
      return this.$store.state.nickname
    }
  }
}
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u8FD9\u6837\u5F15\u5165\u5C31\u65B9\u4FBF\u4E86\u5F88\u591A\u3002</p><h2 id="_1-2-mapstate-\u8F85\u52A9\u51FD\u6570-\u5E38\u7528" tabindex="-1"><a class="header-anchor" href="#_1-2-mapstate-\u8F85\u52A9\u51FD\u6570-\u5E38\u7528" aria-hidden="true">#</a> <strong>1.2 mapState \u8F85\u52A9\u51FD\u6570</strong> \u5E38\u7528</h2><p>1.1\u4E2D\u7684\u65B9\u6CD5\u867D\u7136\u5F15\u5165\u7684\u65F6\u5019\u65B9\u4FBF\u4E86\uFF0C\u4F46\u662Fcomputed\u4E2D\u5B9A\u4E49\u7684\u4EE3\u7801\u8FD8\u662F\u5F88\u591A\uFF0C\u800C\u8FD9\u65F6\u5019vuex\u53C8\u7ED9\u6211\u4EEC\u63D0\u4F9B\u4E86\u66F4\u7B80\u4FBF\u7684\u65B9\u6CD5mapState\u65B9\u6CD5</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import {mapState} from &#39;docs/Vue/vuex&#39;

export default {
    name: &#39;home&#39;,
    computed: mapState([&#39;nickname&#39;, &#39;age&#39;, &#39;gender&#39;])
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>mapState([&#39;nickname&#39;,&#39;age&#39;,&#39;gender&#39;]) //\u6620\u5C04\u54EA\u4E9B\u5B57\u6BB5\u5C31\u586B\u5165\u54EA\u4E9B\u5B57\u6BB5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u8FD9\u4E00\u53E5\u4EE3\u7801\u5C31\u76F8\u5F53\u4E8E\u4E0B\u9762\u8FD9\u4E9B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>nickname(){return this.$store.state.nickname}
age(){return this.$store.state.age}
gender(){return this.$store.state.gender}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>\u8BB0\u4F4F\uFF1A\u7528mapState\u7B49\u8FD9\u79CD\u8F85\u52A9\u51FD\u6570\u7684\u65F6\u5019\uFF0C\u524D\u9762\u7684\u65B9\u6CD5\u540D\u548C\u83B7\u53D6\u7684\u5C5E\u6027\u540D\u662F\u4E00\u81F4\u7684\u3002</strong></p><p>\u5982\u679C\u6211\u4EEC\u9700\u8981\u81EA\u5B9A\u4E49\u4E00\u4E2A\u8BA1\u7B97\u5C5E\u6027\u600E\u4E48\u529E\u5462\uFF1F\u600E\u4E48\u6DFB\u52A0\u5462\uFF1F</p><p>\u6BD5\u7ADF\u73B0\u5728\u5DF2\u7ECF\u6210\u8FD9\u6837\u4E86 computed: mapState([&#39;nickname&#39;,&#39;age&#39;,&#39;gender&#39;])</p><p>\u8FD9\u65F6\u5019\u6211\u4EEC\u5C31\u9700\u8981es6\u4E2D\u7684\u5C55\u5F00\u8FD0\u7B97\u7B26\uFF1A...</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>computed: {   //computed\u662F\u4E0D\u80FD\u4F20\u53C2\u6570\u7684
  value(){
   return this.val/7
},
  ...mapState([&#39;nickname&#39;,&#39;age&#39;,&#39;gender&#39;])
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="\u4E8C\u3001getters-\u5E38\u7528" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001getters-\u5E38\u7528" aria-hidden="true">#</a> <strong>\u4E8C\u3001getters</strong> \u5E38\u7528</h2><p>2.1 getters\u76F8\u5F53\u4E8Evue\u4E2D\u7684\u8BA1\u7B97\u5C5E\u6027\uFF0C\u901A\u8FC7getters\u8FDB\u4E00\u6B65\u5904\u7406\uFF0C\u5F97\u5230\u6211\u4EEC\u60F3\u8981\u7684\u503C\uFF0C\u800C\u4E14\u5141\u8BB8\u4F20\u53C2\uFF0C\u7B2C\u4E00\u4E2A\u53C2\u6570\u5C31\u662Fstate</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import Vue from &#39;vue&#39;
import Vuex from &#39;vuex&#39;
Vue.use(Vuex)
 
export default new Vuex.Store({
  state: { //\u5B58\u653E\u72B6\u6001
    nickname:&#39;Simba&#39;,
    firstname:&#39;\u5F20&#39;,
    lastname:&#39;\u4E09\u4E30&#39;,
    age:20,
    gender:&#39;\u7537&#39;,
    money:1000
  },
  getters:{
    realname(state){
      return state.firstname+state.lastname
    },
    money_us(state){
      return (state.money/7).toFixed(2)
    }
  },
  mutations: {},
  actions: {},
  modules: {}
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>vue\u90E8\u5206</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>computed: {  //computed\u662F\u4E0D\u80FD\u4F20\u53C2\u6570\u7684
 valued(){
   return this.value/7
 },
 ...mapGetters([&#39;realname&#39;,&#39;money_us&#39;])
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="\u4E09\u3001mutation" tabindex="-1"><a class="header-anchor" href="#\u4E09\u3001mutation" aria-hidden="true">#</a> <strong>\u4E09\u3001Mutation</strong></h2><p>3.1 \u6211\u4EEC\u4EE3\u7801\u4E2D\u5B9A\u4E49\u7684\u65F6\u5019\u9700\u8981\u4E9Bmutations\uFF0C\u5B83\u7C7B\u4F3C\u4E8Evue\u4E2D\u7684methods\uFF0C</p><p>mutations\u9700\u8981\u901A\u8FC7<strong>commit</strong>\u6765\u8C03\u7528\u5176\u91CC\u9762\u7684\u65B9\u6CD5\uFF0C\u5B83\u4E5F\u53EF\u4EE5\u4F20\u5165\u53C2\u6570\uFF0C\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F<strong>state</strong>\uFF0C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F<strong>\u8F7D\u8377</strong>\uFF08payLoad\uFF09\uFF0C\u4E5F\u5C31\u662F\u989D\u5916\u7684\u53C2\u6570</p><p>\u4EE3\u7801\u5982\u4E0B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>mutations: { //\u7C7B\u4F3C\u4E8Emethods
  addAge(state,payLoad){
     state.age+=payLoad.number
      // \u516C\u5171\u53C2\u6570\u4E0E\u4F20\u5165\u53C2\u6570\u90FD\u80FD\u4F7F\u7528\uFF0C\u4F20\u5165\u53C2\u6570\u6700\u597D\u4E3A\u5BF9\u8C61\uFF0C\u80FD\u4F20\u5165\u66F4\u591A\u6570\u636E
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>template\u90E8\u5206</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>&lt;div class=&quot;home&quot;&gt;
   &lt;div&gt;&lt;button @click=&quot;test&quot;&gt;\u6D4B\u8BD5&lt;/button&gt;&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>js\u90E8\u5206</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>methods:{
 test(){
   this.$store.commit(&#39;addAge&#39;,{
     number:5
   })
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u8C03\u7528\u7684\u65F6\u5019\u7B2C\u4E8C\u4E2A\u53C2\u6570\u6700\u597D\u5199\u6210<strong>\u5BF9\u8C61\u5F62\u5F0F</strong>\uFF0C\u8FD9\u6837\u6211\u4EEC\u5C31\u53EF\u4EE5\u4F20\u9012\u66F4\u591A\u4FE1\u606F\u3002</p><p>\u4F46\u662F\uFF0C\u8FD9\u6837\u5199\u8FD8\u662F\u4F1A\u9047\u5230\u540C\u6837\u7684\u95EE\u9898\uFF0C\u5C31\u662F<strong>\u5982\u679C\u9700\u8981\u64CD\u4F5C\u591A\u4E2A\u6570\u636E</strong>\uFF0C\u5C31\u4F1A\u53D8\u7684\u9EBB\u70E6\uFF0C\u8FD9\u65F6\u5019\u6211\u4EEC\u5C31\u9700\u8981<strong>mapMutations</strong>\uFF0C\u901A\u8FC7\u5B83\u5C06\u65B9\u6CD5\u6620\u5C04\u8FC7\u6765</p><h2 id="_3-2-mapmutations" tabindex="-1"><a class="header-anchor" href="#_3-2-mapmutations" aria-hidden="true">#</a> <strong>3.2 mapMutations</strong></h2><p>\u8DDFmapState\u3001mapGetters\u4E00\u6837</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>methods:{
 ...mapMutations([&#39;addAge&#39;])
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>mapMutations([&#39;addAge&#39;])\u8FD9\u4E00\u53E5\u5C31\u76F8\u5F53\u4E8E\u4E0B\u9762\u7684\u4EE3\u7801</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>addAge(payLoad){
  this.$store.commit(&#39;addAge&#39;,payLoad)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u53C2\u6570\u6211\u4EEC\u53EF\u4EE5\u5728\u8C03\u7528\u8FD9\u4E2A\u65B9\u6CD5\u7684\u65F6\u5019\u5199\u5165</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;button @click=&quot;addAge({number:5})&quot;&gt;\u6D4B\u8BD5&lt;/button&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u8FD9\u65F6\u5019\u4E00\u4E9B\u6760\u7CBE\u5C31\u8981\u8BF4\u4E86\uFF0C\u6211\u4E3A\u4EC0\u4E48\u8981\u7ED5\u4E00\u5708\uFF0C\u4ECEmutations\u91CC\u9762\u53BB\u6539state\u5462\uFF1F\u6211\u80FD\u4E0D\u80FD\u76F4\u63A5\u6539state\u5462\uFF1F</p><p>\u6BD4\u5982\u8FD9\u6837\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>addAge(){
 this.$store.state.age +=5;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u5B9E\u9645\u770B\u7ED3\u679C\u4E5F\u53EF\u4EE5\uFF0C\u90A3\u6211\u4E3A\u4EC0\u4E48\u4ECEmutations\u91CC\u9762\u4E2D\u8F6C\u4E00\u4E0B\u5462\uFF1F</p><p>\u539F\u56E0\u5982\u4E0B\uFF1A</p><p>\u2460 \u5728mutations\u4E2D\u4E0D\u4EC5\u4EC5\u80FD\u505A\u8D4B\u503C\u64CD\u4F5C</p><p>\u2461 \u4F5C\u8005\u5728mutations\u4E2D\u505A\u4E86\u7C7B\u4F3C\u57CB\u70B9\u64CD\u4F5C\uFF0C\u5982\u679C\u4ECEmutations\u4E2D\u64CD\u4F5C\u7684\u8BDD\uFF0C \u80FD\u88AB\u68C0\u6D4B\u5230\uFF0C\u53EF\u4EE5\u66F4\u65B9\u4FBF\u7528\u8C03\u8BD5\u5DE5\u5177\u8C03\u8BD5\uFF0C\u8C03\u8BD5\u5DE5\u5177\u53EF\u4EE5\u68C0\u6D4B\u5230\u5B9E\u65F6\u53D8\u5316\uFF0C\u800C\u76F4\u63A5\u6539\u53D8state\u4E2D\u7684\u5C5E\u6027\uFF0C\u5219\u65E0\u6CD5<strong>\u5B9E\u65F6\u76D1\u6D4B</strong></p><p>\u6CE8\u610F\uFF1Amutations\u53EA\u80FD\u5199\u540C\u6B65\u65B9\u6CD5\uFF0C<strong>\u4E0D\u80FD\u5199\u5F02\u6B65</strong>\uFF0C\u6BD4\u5982axios\u3001setTimeout\u7B49\uFF0C\u8FD9\u4E9B\u90FD\u4E0D\u80FD\u5199\uFF0C<strong>mutations\u7684\u4E3B\u8981\u4F5C\u7528\u5C31\u662F\u4E3A\u4E86\u4FEE\u6539state\u7684</strong>\u3002</p><p>\u539F\u56E0\u7C7B\u4F3C\uFF1A\u5982\u679C\u5728mutations\u4E2D\u5199\u5F02\u6B65\uFF0C\u4E5F\u80FD\u591F\u8C03\u6210\u529F\uFF0C\u4F46\u662F\u7531\u4E8E\u662F\u5F02\u6B65\u7684\uFF0C\u4E0D\u80FD\u88AB\u8C03\u8BD5\u5DE5\u5177\u8FFD\u8E2A\u5230\uFF0C\u6240\u6709\u4E0D\u63A8\u8350\u8FD9\u6837\u5199\uFF0C\u4E0D\u5229\u4E8E\u8C03\u8BD5,\u8FD9\u662F\u5B98\u65B9\u7684\u7EA6\u5B9A\u3002</p><h2 id="_3-3-\u4F7F\u7528\u5E38\u91CF\u66FF\u4EE3mutation\u4E8B\u4EF6\u7C7B\u578B-\u597D\u50CF\u4E0D\u592A\u597D\u7528" tabindex="-1"><a class="header-anchor" href="#_3-3-\u4F7F\u7528\u5E38\u91CF\u66FF\u4EE3mutation\u4E8B\u4EF6\u7C7B\u578B-\u597D\u50CF\u4E0D\u592A\u597D\u7528" aria-hidden="true">#</a> <strong>3.3 \u4F7F\u7528\u5E38\u91CF\u66FF\u4EE3Mutation\u4E8B\u4EF6\u7C7B\u578B</strong>(\u597D\u50CF\u4E0D\u592A\u597D\u7528)</h2><p>\u628A\u539F\u672C\u7684\u65B9\u6CD5\u540D\u79F0\u7531\u5B57\u7B26\u4E32\u8F6C\u53D8\u6210\u5E38\u91CF</p><p>\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import Vue from &#39;vue&#39;
import Vuex from &#39;vuex&#39;
export const ADD_AGE =&#39;addAge&#39; 
Vue.use(Vuex)
export default new Vuex.Store({
  state: { //\u5B58\u653E\u72B6\u6001
    nickname:&#39;Simba&#39;,
    firstname:&#39;\u5F20&#39;,
    lastname:&#39;\u4E09\u4E30&#39;,
    age:20,
    gender:&#39;\u7537&#39;,
    money:1000
  },
  getters:{ //\u7C7B\u4F3C\u4E8E computed
    realname:state =&gt;state.firstname+state.lastname,
    money_us(state){
      return (state.money/7).toFixed(2)
    }
  },
  mutations: { //\u7C7B\u4F3C\u4E8Emethods
     [ADD_AGE](state,payLoad){
         state.age+=payLoad.number
     }
  },
  actions: { },
  modules: {}
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>\u5C06addAge\u65B9\u6CD5\u540D\u5B57\u5B9A\u4E49\u4E3A\u4E00\u4E2A\u5E38\u91CF\uFF0C\u5F53\u8C03\u7528\u7684\u65F6\u5019\u76F4\u63A5\u5F15\u5165</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import {ADD_AGE} from &#39;../store&#39;
import {mapMutations} from &#39;vuex&#39;
export default {
  methods:{
    ...mapMutations([ADD_AGE])
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u8FD9\u6837\u5199\u7684\u597D\u5904\uFF1A</p><p>\u2460 \u4E0D\u5BB9\u6613\u5199\u9519\uFF0C\u5B57\u7B26\u4E32\u5BB9\u6613\u5199\u9519\uFF0C\u800C\u4E14\u5B57\u7B26\u4E32\u5199\u9519\u4EE5\u540E\u4E0D\u4F1A\u62A5\u9519\u4F4D\u7F6E\uFF0C\u800C\u7528\u5E38\u91CF\u66FF\u4EE3\uFF0C\u5982\u679C\u5199\u9519\uFF0Ceslint\u53EF\u4EE5\u63D0\u793A\u9519\u8BEF\u4F4D\u7F6E</p><p>\u7528\u5E38\u91CF\u66FF\u4EE3mutations\u7684\u65F6\u5019\u6211\u6211\u4EEC\u53EF\u4EE5\u65B0\u5EFA\u4E00\u4E2A\u6587\u4EF6\uFF08mutation_type.js\uFF09\u4E13\u95E8\u5B58\u50A8\u8FD9\u4E9B\u5E38\u91CF</p><p>mutation_type.js\u90E8\u5206</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export default {
   ADD_AGE: \u2018addAge\u2019
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u7136\u540E\u518Dstore/index.js\u4E2D\u5F15\u5165</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import MUTATION_TYPES from \u2018./mutation_type\u2019\uFF08\u5148\u5F15\u5165\uFF09
export let MUTATION_TYPE=MUTATION_TYPES \uFF08\u518D\u5BFC\u51FA\uFF09
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u8FD9\u4E2A\u5730\u65B9\u6709\u4E00\u4E2A<strong>\u5751</strong>\uFF0C\u4E0D\u8981\u5C06\u5F15\u5165\u548C\u5BFC\u51FA\u5408\u5E76\u6210\u4E00\u884C\u4EE3\u7801\uFF1A\u6BD4\u5982\u8FD9\u6837</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export { foo, bar } from &#39;my_module&#39;;
// \u53EF\u4EE5\u7B80\u5355\u7406\u89E3\u4E3A
import { foo, bar } from &#39;my_module&#39;;
export { foo, bar };
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C<strong>\u4E24\u8005\u5E76\u4E0D\u4E00\u6837</strong>\uFF0C\u5199\u6210\u4E00\u884C\u4EE5\u540E\uFF0Cfoo\u548Cbar\u5B9E\u9645\u4E0A\u5E76\u6CA1\u6709\u88AB\u5BFC\u5165\u5F53\u524D\u6A21\u5757\uFF0C\u53EA\u662F\u76F8\u5F53\u4E8E\u5BF9\u5916<strong>\u8F6C\u53D1</strong>\u4E86\u8FD9\u4E24\u4E2A\u63A5\u53E3\uFF0C<strong>\u5BFC\u81F4\u5F53\u524D\u6A21\u5757\u4E0D\u80FD\u76F4\u63A5\u4F7F\u7528</strong>foo\u548Cbar\u3002</p><p>vue\u90E8\u5206</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import {MUTATION_TYPE} from &#39;../store&#39;
methods:{
  ...mapMutations([MUTATION_TYPE.ADD_AGE])
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u603B\u7ED3\u4E00\u4E0B\uFF1A</p><p>\u2460 \u4F9D\u8D56state\u5F97\u5230\u65B0\u7684\u6570\u636E\uFF0C\u7528getters\uFF08\u8DDFcomputed\u4E00\u6837\uFF0C\u53EA\u8BFB\uFF09</p><p>\u2461 \u4FEE\u6539state\u7684\u5C5E\u6027\u503C\uFF0C\u5C31\u7528mutations\uFF08\u540C\u6B65\u64CD\u4F5C\uFF09</p><h2 id="\u56DB\u3001actions" tabindex="-1"><a class="header-anchor" href="#\u56DB\u3001actions" aria-hidden="true">#</a> <strong>\u56DB\u3001actions</strong></h2><p>4.1 action\u7C7B\u4F3C\u4E8Emutation</p><p>\u533A\u522B\uFF1Aaction\u53EF\u4EE5\u63D0\u4EA4mutation</p><p>action\u4E5F<strong>\u4E0D\u8981</strong>\u76F4\u63A5\u53BB\u64CD\u4F5Cstate\uFF0C\u800C\u662F<strong>\u53BB\u64CD\u4F5C</strong>mutation</p><p>action\u5305\u542B<strong>\u5F02\u6B65\u64CD\u4F5C</strong>\uFF0C\u7C7B\u4F3C\u4E8Eaxios\u8BF7\u6C42\uFF0C\u53EF\u4EE5\u90FD\u653E\u5728action\u4E2D\u5199</p><p><strong>action\u4E2D\u7684\u65B9\u6CD5\u9ED8\u8BA4\u7684\u5C31\u662F\u5F02\u6B65\uFF0C\u5E76\u4E14\u8FD4\u56DEpromise</strong></p><p>\u4EE3\u7801\u5982\u4E0B</p><p>store\u90E8\u5206</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>actions: {
  getUserInfo(){
    return {
      nickname:&#39;Simba&#39;,
      age:20
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u5728actions\u4E2D\u5B9A\u4E49\u4E00\u4E2A\u65B9\u6CD5\uFF1AgetUserInfo\uFF0C\u5E76\u4E14\u8FD4\u56DE\u4E00\u4E2A\u5BF9\u8C61</p><p>vue\u90E8\u5206</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>created(){
  var res = this.getUserInfo()
  console.log(res)
 
},
methods:{
  ...mapActions([&#39;getUserInfo&#39;])
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u5728created\u4E2D\u8C03\u7528\u6B64\u65B9\u6CD5\uFF0C\u5E76\u5C06\u7ED3\u679C\u8D4B\u503C\u7ED9res\uFF0C\u6253\u5370res\uFF0C\u7ED3\u679C\u6253\u5370\u51FAPromise</p><p><img src="https://pic1.zhimg.com/80/v2-20420772911405b87fb2a116b87083d4_720w.jpg" alt="img"></p><p>\u8FD9\u8868\u660E\uFF0C\u5728actions\u4E2D\u7684\u65B9\u6CD5\uFF0C\u9ED8\u8BA4\u5C31\u662F\u5F02\u6B65\u7684\uFF0C\u901A\u8FC7then\u83B7\u53D6\u6570\u636E</p><h4 id="mapactions-getuserinfo-\u76F8\u5F53\u4E8E\u4EE5\u4E0B\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#mapactions-getuserinfo-\u76F8\u5F53\u4E8E\u4EE5\u4E0B\u4EE3\u7801" aria-hidden="true">#</a> <strong>mapActions([&#39;getUserInfo&#39;]) \u76F8\u5F53\u4E8E\u4EE5\u4E0B\u4EE3\u7801</strong></h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>getUserInfo(){
  return this.$store.dispatch(\u2018getUserInfo\u2019)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u5728\u5B9E\u9645\u5F00\u53D1\u5F53\u4E2D\uFF0Cstate\u91CC\u9762\u7684\u5C5E\u6027\u503C\u662F\u7A7A\u7684\uFF0C\u5F53\u767B\u5F55\u4EE5\u540E\uFF0C\u518D\u8FDB\u884C\u83B7\u53D6\u5BF9\u5E94\u7684\u4FE1\u606F\u3002</p><p>\u767B\u5F55\u4EE5\u540E\uFF0C\u9700\u8981\u5F97\u5230\u7528\u6237\u4FE1\u606F\uFF0C\u90A3\u5982\u4F55\u5F97\u5230\u5462\uFF1F</p><p>\u9996\u5148\u8FDB\u5165\u9875\u9762\u7684\u65F6\u5019\u8C03\u7528actions\u4E2D\u7684getUserInfo\u65B9\u6CD5</p><p>\u4EE3\u7801\u5982\u4E0B</p><p>vue\u90E8\u5206</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>created(){ this.getUserInfo()}
methods:{ ...mapActions([\u2018getUserInfo\u2019])}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>store\u90E8\u5206</p><p>\u9996\u5148\u8981\u60F3\u5F97\u5230\u6570\u636E\uFF0C\u90A3\u5C31\u76F8\u5F53\u4E8E\u7ED9state\u8D4B\u503C\uFF0C\u90A3\u9996\u5148\u60F3\u5230\u7684\u5C31\u662Fmutations\u6765\u64CD\u4F5Cstate\uFF0C\u4F46\u662F\u8BF7\u6C42\u7684\u63A5\u53E3\u90FD\u662Faxios\u5F02\u6B65\uFF0C\u6240\u4EE5\u5C31\u4E0D\u80FD\u7528mutations\u800C\u662F\u7528actions\uFF0C\u901A\u8FC7actions\u6765\u64CD\u4F5Cmutations\u4ECE\u800C\u64CD\u4F5Cstate</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>export default new Vuex.Store({
 state: { 
  nickname:\u2018\u2019,
  age:0,
  gender:&#39;&#39;,
  money:0
 },
 mutations: {
  setUerInfo(state,payLoad){
   state.nickname = payLoad.nickname
   state.age = payLoad.age
   state.gender = payLoad.gender
   state.money = payLoad.money
  }
},
actions: { //actions\u6CA1\u6709\u63D0\u4F9Bstate\u5F53\u53C2\u6570
 async getToken({commit}){
   var res = await axios.get(&#39;/token\u63A5\u53E3&#39;)
   commit(&#39;setToken&#39;,res)
 },
async getUserInfo(context){ 
//context\u53EF\u4EE5\u7406\u89E3\u4E3A\u5B83\u662F\u6574\u4E2AStore\u7684\u5BF9\u8C61.\u7C7B\u4F3C\u4E8Ethis.$store\uFF0C
\u4ED6\u91CC\u9762\u5305\u542B\u4E86state\uFF0Cgetter\uFF0Cmutations\uFF0Cactions
  const res = await axios.get(&#39;/\u63A5\u53E3url&#39;)
  context.commit(&#39;setUerInfo&#39;,res) 
//\u76F8\u5F53\u4E8E this.$store.commit,\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u65B9\u6CD5\u540D\uFF0C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u8981\u4F20\u5165\u7684\u6570\u636E
  context.dispatch(&#39;getToken&#39;) 
//actions\u4E5F\u53EF\u4EE5\u8C03\u7528\u81EA\u5DF1\u7684\u5176\u4ED6\u65B9\u6CD5
    },
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>\u8FD0\u884C\u8FC7\u7A0B\uFF0C\u8C03\u7528getUserInfo\u65B9\u6CD5\u4EE5\u540E\uFF0C\u8FDB\u5165actions\uFF0C\u7136\u540E\u901A\u8FC7commit\u8C03\u7528setUserInfo\uFF0C\u5C06res\uFF08\u7528\u6237\u4FE1\u606F\uFF09\u4F5C\u4E3A\u53C2\u6570\u4F20\u5165\u4F20\u5165\u8FDB\u53BB\uFF0C\u5E76\u5C06\u76F8\u5BF9\u5E94\u7684\u5C5E\u6027\u503C\u8D4B\u503C\u7ED9state\uFF0C\u5B8C\u6210\u8FD9\u4E00\u8FC7\u7A0B\u7684\u64CD\u4F5C\u3002</p><p>getUserInfo\u7684\u53C2\u6570\u4E5F\u53EF\u4EE5\u7528\u89E3\u6784\uFF0C\u8FD9\u6837\u66F4\u65B9\u4FBF</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>async getUserInfo({commit,dispatch}){ 
  const res = await axios.get(&#39;/\u63A5\u53E3url&#39;)
  commit(&#39;setUerInfo&#39;,res) 
  dispatch(&#39;getToken&#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,111);function r(t,p){return e}var b=n(a,[["render",r],["__file","Vuex.html.vue"]]);export{b as default};
