import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e as t}from"./app.d7b34baa.js";const p={},o=t(`<h1 id="前端路由原理-vue-router源码剖析" tabindex="-1"><a class="header-anchor" href="#前端路由原理-vue-router源码剖析" aria-hidden="true">#</a> 前端路由原理：vue-router源码剖析</h1><h2 id="vue-router-入口分析" tabindex="-1"><a class="header-anchor" href="#vue-router-入口分析" aria-hidden="true">#</a> vue-router 入口分析</h2><p>vue-router 提供了 createRouter 方法来创建路由配置，我们传入每个路由地址对应的组件后，使用 app.use 在 Vue 中加载 vue-router 插件，并且给 Vue 注册了两个内置组件，router-view 负责渲染当前路由匹配的组件，router-link 负责页面的跳转。</p><p>下面的代码中，参数 RouterOptions 是规范我们配置的路由对象，主要包含 history、routes 等数据。routes 就是我们需要配置的路由对象，类型是 RouteRecordRaw 组成的数组，并且 RouteRecordRaw 的类型是三个类型的合并。然后返回值的类型 Router 就是包含了 addRoute、push、beforeEnter、install 方法的一个对象，并且维护了 <strong>currentRoute 和 options 两个属性。</strong></p><p>我们知道 Vue 中 app.use 实际上执行的就是 router 对象内部的 install 方法，我们先进入到 install 方法看下是如何安装的。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// createRouter传递参数的类型</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">RouterOptions</span> <span class="token keyword">extends</span> <span class="token class-name">PathParserOptions</span> <span class="token punctuation">{</span>
  history<span class="token operator">:</span> RouterHistory
  routes<span class="token operator">:</span> RouteRecordRaw<span class="token punctuation">[</span><span class="token punctuation">]</span>
  scrollBehavior<span class="token operator">?</span><span class="token operator">:</span> RouterScrollBehavior
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
<span class="token comment">// 每个路由配置的类型</span>
<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">RouteRecordRaw</span> <span class="token operator">=</span>
  <span class="token operator">|</span> RouteRecordSingleView
  <span class="token operator">|</span> RouteRecordMultipleViews
  <span class="token operator">|</span> RouteRecordRedirect

<span class="token comment">//... other config</span>
<span class="token comment">// Router接口的全部方法和属性</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Router</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> currentRoute<span class="token operator">:</span> Ref<span class="token operator">&lt;</span>RouteLocationNormalizedLoaded<span class="token operator">&gt;</span>
  <span class="token keyword">readonly</span> options<span class="token operator">:</span> RouterOptions

  <span class="token function">addRoute</span><span class="token punctuation">(</span>parentName<span class="token operator">:</span> RouteRecordName<span class="token punctuation">,</span> route<span class="token operator">:</span> RouteRecordRaw<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
  <span class="token function">addRoute</span><span class="token punctuation">(</span>route<span class="token operator">:</span> RouteRecordRaw<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
  <span class="token function">Route</span><span class="token punctuation">(</span>name<span class="token operator">:</span> RouteRecordName<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>
  <span class="token function">hasRoute</span><span class="token punctuation">(</span>name<span class="token operator">:</span> RouteRecordName<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span>

  <span class="token function">getRoutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> RouteRecord<span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span>
    to<span class="token operator">:</span> RouteLocationRaw<span class="token punctuation">,</span>
    currentLocation<span class="token operator">?</span><span class="token operator">:</span> RouteLocationNormalizedLoaded
  <span class="token punctuation">)</span><span class="token operator">:</span> RouteLocation <span class="token operator">&amp;</span> <span class="token punctuation">{</span> href<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">}</span>
  <span class="token function">push</span><span class="token punctuation">(</span>to<span class="token operator">:</span> RouteLocationRaw<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>NavigationFailure <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span>
  <span class="token function">replace</span><span class="token punctuation">(</span>to<span class="token operator">:</span> RouteLocationRaw<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>NavigationFailure <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span>
  <span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ReturnType<span class="token operator">&lt;</span>Router<span class="token punctuation">[</span><span class="token string">&#39;go&#39;</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>
  <span class="token function">forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ReturnType<span class="token operator">&lt;</span>Router<span class="token punctuation">[</span><span class="token string">&#39;go&#39;</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>
  <span class="token function">go</span><span class="token punctuation">(</span>delta<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>
  <span class="token function">beforeEach</span><span class="token punctuation">(</span>guard<span class="token operator">:</span> NavigationGuardWithThis<span class="token operator">&lt;</span><span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
  <span class="token function">beforeResolve</span><span class="token punctuation">(</span>guard<span class="token operator">:</span> NavigationGuardWithThis<span class="token operator">&lt;</span><span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
  <span class="token function">afterEach</span><span class="token punctuation">(</span>guard<span class="token operator">:</span> NavigationHookAfter<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
  <span class="token function">onError</span><span class="token punctuation">(</span>handler<span class="token operator">:</span> _ErrorHandler<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
  <span class="token function">isReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span>
  <span class="token function">install</span><span class="token punctuation">(</span>app<span class="token operator">:</span> App<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createRouter</span><span class="token punctuation">(</span>options<span class="token operator">:</span> RouterOptions<span class="token punctuation">)</span><span class="token operator">:</span> Router <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由安装" tabindex="-1"><a class="header-anchor" href="#路由安装" aria-hidden="true">#</a> 路由安装</h2><p>从下面的代码中我们可以看到，在 createRouter 的最后，创建了包含 addRoute、push 等方法的对象，并且 install 方法内部注册了 RouterLink 和 RouterView 两个组件。所以我们可以在任何组件内部直接使用 和 组件，然后注册全局变量 router和route，其中 <strong>router</strong>就是我们通过createRouter返回的路由对象，包含addRoute、push等方法，<strong>route</strong> 使用 defineProperty 的形式返回 currentRoute 的值，可以做到和 currentRoute 值同步。</p><p>然后使用 computed 把路由变成响应式对象，存储在 reactiveRoute 对象中，再通过 app.provide 给全局注册了 route 和 reactive 包裹后的 reactiveRoute 对象。我们之前介绍 provide 函数的时候也介绍了，provide 提供的数据并没有做响应式的封装，**需要响应式的时候需要自己使用 ref 或者 reactive 封装为响应式对象，**最后注册 unmount 方法实现 vue-router 的安装。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createRouter</span><span class="token punctuation">(</span>options<span class="token operator">:</span> RouterOptions<span class="token punctuation">)</span><span class="token operator">:</span> Router <span class="token punctuation">{</span>
<span class="token operator">...</span><span class="token punctuation">.</span>
  <span class="token keyword">let</span> started<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">undefined</span>
  <span class="token keyword">const</span> installedApps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set<span class="token operator">&lt;</span>App<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// 路由对象</span>
  <span class="token keyword">const</span> router<span class="token operator">:</span> Router <span class="token operator">=</span> <span class="token punctuation">{</span>
    currentRoute<span class="token punctuation">,</span>

    addRoute<span class="token punctuation">,</span>
    removeRoute<span class="token punctuation">,</span>
    hasRoute<span class="token punctuation">,</span>
    getRoutes<span class="token punctuation">,</span>
    resolve<span class="token punctuation">,</span>
    options<span class="token punctuation">,</span>

    push<span class="token punctuation">,</span>
    replace<span class="token punctuation">,</span>
    go<span class="token punctuation">,</span>
    <span class="token function-variable function">back</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">go</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function-variable function">forward</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">go</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    beforeEach<span class="token operator">:</span> beforeGuards<span class="token punctuation">.</span>add<span class="token punctuation">,</span>
    beforeResolve<span class="token operator">:</span> beforeResolveGuards<span class="token punctuation">.</span>add<span class="token punctuation">,</span>
    afterEach<span class="token operator">:</span> afterGuards<span class="token punctuation">.</span>add<span class="token punctuation">,</span>

    onError<span class="token operator">:</span> errorHandlers<span class="token punctuation">.</span>add<span class="token punctuation">,</span>
    isReady<span class="token punctuation">,</span>
    <span class="token comment">// 插件按章</span>
    <span class="token function">install</span><span class="token punctuation">(</span>app<span class="token operator">:</span> App<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token comment">// 注册全局组件 router-link和router-view</span>
      app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;RouterLink&#39;</span><span class="token punctuation">,</span> RouterLink<span class="token punctuation">)</span>
      app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;RouterView&#39;</span><span class="token punctuation">,</span> RouterView<span class="token punctuation">)</span>

      app<span class="token punctuation">.</span>config<span class="token punctuation">.</span>globalProperties<span class="token punctuation">.</span>$router <span class="token operator">=</span> router
      Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>app<span class="token punctuation">.</span>config<span class="token punctuation">.</span>globalProperties<span class="token punctuation">,</span> <span class="token string">&#39;$route&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        enumerable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">unref</span><span class="token punctuation">(</span>currentRoute<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        isBrowser <span class="token operator">&amp;&amp;</span>
        <span class="token operator">!</span>started <span class="token operator">&amp;&amp;</span>
        currentRoute<span class="token punctuation">.</span>value <span class="token operator">===</span> <span class="token constant">START_LOCATION_NORMALIZED</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// see above</span>
        started <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token function">push</span><span class="token punctuation">(</span>routerHistory<span class="token punctuation">.</span>location<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>err <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;Unexpected error when starting the router:&#39;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">const</span> reactiveRoute <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token punctuation">{</span>
        <span class="token punctuation">[</span>k <span class="token keyword">in</span> <span class="token keyword">keyof</span> RouteLocationNormalizedLoaded<span class="token punctuation">]</span><span class="token operator">:</span> ComputedRef<span class="token operator">&lt;</span>
          RouteLocationNormalizedLoaded<span class="token punctuation">[</span>k<span class="token punctuation">]</span>
        <span class="token operator">&gt;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> <span class="token constant">START_LOCATION_NORMALIZED</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// @ts-expect-error: the key matches</span>
        reactiveRoute<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> currentRoute<span class="token punctuation">.</span>value<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 提供全局配置</span>
      app<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span>routerKey<span class="token punctuation">,</span> router<span class="token punctuation">)</span>
      app<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span>routeLocationKey<span class="token punctuation">,</span> <span class="token function">reactive</span><span class="token punctuation">(</span>reactiveRoute<span class="token punctuation">)</span><span class="token punctuation">)</span>
      app<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span>routerViewLocationKey<span class="token punctuation">,</span> currentRoute<span class="token punctuation">)</span>

      <span class="token keyword">const</span> unmountApp <span class="token operator">=</span> app<span class="token punctuation">.</span>unmount
      installedApps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span>
      app<span class="token punctuation">.</span><span class="token function-variable function">unmount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        installedApps<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span>
        <span class="token comment">// ...</span>
        <span class="token function">unmountApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__DEV__ <span class="token operator">||</span> __FEATURE_PROD_DEVTOOLS__<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> isBrowser<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">addDevtools</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> router<span class="token punctuation">,</span> matcher<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> router
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过下面的代码我们可以看到，RouterView 的 setup 函数返回了一个函数，这个函数就是 RouterView 组件的 render 函数。大部分我们使用的方式就是一个 组件，没有 slot 情况下返回的就是 component 变量。component 使用 h 函数返回 ViewComponent 的虚拟 DOM，而 ViewComponent 是根据 matchedRoute.components[props.name]计算而来。</p><p>matchedRoute 依赖的 matchedRouteRef 的计算逻辑在如下代码的第 12～15 行，数据来源 injectedRoute 就是上面我们注入的 currentRoute 对象。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>
<span class="token keyword">export</span> <span class="token keyword">const</span> RouterViewImpl <span class="token operator">=</span> <span class="token comment">/*#__PURE__*/</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&#39;RouterView&#39;</span><span class="token punctuation">,</span>
  props<span class="token operator">:</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token punctuation">{</span>
      type<span class="token operator">:</span> String <span class="token keyword">as</span> PropType<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;default&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    route<span class="token operator">:</span> Object <span class="token keyword">as</span> PropType<span class="token operator">&lt;</span>RouteLocationNormalizedLoaded<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// router-view组件源码</span>
  <span class="token function">setup</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> <span class="token punctuation">{</span> attrs<span class="token punctuation">,</span> slots <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 全局的reactiveRoute对象注入</span>
    <span class="token keyword">const</span> injectedRoute <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>routerViewLocationKey<span class="token punctuation">)</span><span class="token operator">!</span>
    
    <span class="token keyword">const</span> routeToDisplay <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> props<span class="token punctuation">.</span>route <span class="token operator">||</span> injectedRoute<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    <span class="token keyword">const</span> depth <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>viewDepthKey<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> matchedRouteRef <span class="token operator">=</span> <span class="token generic-function"><span class="token function">computed</span><span class="token generic class-name"><span class="token operator">&lt;</span>RouteLocationMatched <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> routeToDisplay<span class="token punctuation">.</span>value<span class="token punctuation">.</span>matched<span class="token punctuation">[</span>depth<span class="token punctuation">]</span>
    <span class="token punctuation">)</span>
    <span class="token comment">// 嵌套层级</span>
    <span class="token function">provide</span><span class="token punctuation">(</span>viewDepthKey<span class="token punctuation">,</span> depth <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment">// 匹配的router对象</span>
    <span class="token function">provide</span><span class="token punctuation">(</span>matchedRouteKey<span class="token punctuation">,</span> matchedRouteRef<span class="token punctuation">)</span>
    <span class="token function">provide</span><span class="token punctuation">(</span>routerViewLocationKey<span class="token punctuation">,</span> routeToDisplay<span class="token punctuation">)</span>

    <span class="token keyword">const</span> viewRef <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span>ComponentPublicInstance<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 返回的render函数</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> route <span class="token operator">=</span> routeToDisplay<span class="token punctuation">.</span>value
      <span class="token keyword">const</span> matchedRoute <span class="token operator">=</span> matchedRouteRef<span class="token punctuation">.</span>value
      <span class="token keyword">const</span> ViewComponent <span class="token operator">=</span> matchedRoute <span class="token operator">&amp;&amp;</span> matchedRoute<span class="token punctuation">.</span>components<span class="token punctuation">[</span>props<span class="token punctuation">.</span>name<span class="token punctuation">]</span>
      <span class="token keyword">const</span> currentName <span class="token operator">=</span> props<span class="token punctuation">.</span>name

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ViewComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">normalizeSlot</span><span class="token punctuation">(</span>slots<span class="token punctuation">.</span>default<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component<span class="token operator">:</span> ViewComponent<span class="token punctuation">,</span> route <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// props from route configuration</span>
      <span class="token keyword">const</span> routePropsOption <span class="token operator">=</span> matchedRoute<span class="token operator">!</span><span class="token punctuation">.</span>props<span class="token punctuation">[</span>props<span class="token punctuation">.</span>name<span class="token punctuation">]</span>
      <span class="token keyword">const</span> routeProps <span class="token operator">=</span> routePropsOption
        <span class="token operator">?</span> routePropsOption <span class="token operator">===</span> <span class="token boolean">true</span>
          <span class="token operator">?</span> route<span class="token punctuation">.</span>params
          <span class="token operator">:</span> <span class="token keyword">typeof</span> routePropsOption <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>
          <span class="token operator">?</span> <span class="token function">routePropsOption</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span>
          <span class="token operator">:</span> routePropsOption
        <span class="token operator">:</span> <span class="token keyword">null</span>

      <span class="token keyword">const</span> onVnodeUnmounted<span class="token operator">:</span> VNodeProps<span class="token punctuation">[</span><span class="token string">&#39;onVnodeUnmounted&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> vnode <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// remove the instance reference to prevent leak</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>component<span class="token operator">!</span><span class="token punctuation">.</span>isUnmounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          matchedRoute<span class="token operator">!</span><span class="token punctuation">.</span>instances<span class="token punctuation">[</span>currentName<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 创建需要渲染组件的虚拟dom</span>
      <span class="token keyword">const</span> component <span class="token operator">=</span> <span class="token function">h</span><span class="token punctuation">(</span>
        ViewComponent<span class="token punctuation">,</span>
        <span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> routeProps<span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> <span class="token punctuation">{</span>
          onVnodeUnmounted<span class="token punctuation">,</span>
          ref<span class="token operator">:</span> viewRef<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
  
      <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token comment">// pass the vnode to the slot as a prop.</span>
        <span class="token comment">// h and &lt;component :is=&quot;...&quot;&gt; both accept vnodes</span>
        <span class="token function">normalizeSlot</span><span class="token punctuation">(</span>slots<span class="token punctuation">.</span>default<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component<span class="token operator">:</span> component<span class="token punctuation">,</span> route <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">||</span>
        component
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由更新" tabindex="-1"><a class="header-anchor" href="#路由更新" aria-hidden="true">#</a> 路由更新</h2><p>到这我们可以看出，RouterView 渲染的组件是由当前匹配的路由变量 matchedRoute 决定的。接下来我们回到 createRouter 函数中，可以看到 matcher 对象是由 createRouterMatcher 创建，createRouterMatcher 函数传入 routes 配置的路由数组，并且返回创建的 RouterMatcher 对象，内部遍历 routes 数组，通过 addRoute 挨个处理路由配置。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createRouter</span><span class="token punctuation">(</span>options<span class="token operator">:</span> RouterOptions<span class="token punctuation">)</span><span class="token operator">:</span> Router <span class="token punctuation">{</span>
  <span class="token keyword">const</span> matcher <span class="token operator">=</span> <span class="token function">createRouterMatcher</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>routes<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token comment">///....</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createRouterMatcher</span><span class="token punctuation">(</span>
  routes<span class="token operator">:</span> RouteRecordRaw<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  globalOptions<span class="token operator">:</span> PathParserOptions
<span class="token punctuation">)</span><span class="token operator">:</span> RouterMatcher <span class="token punctuation">{</span>
  <span class="token comment">// matchers数组</span>
  <span class="token keyword">const</span> matchers<span class="token operator">:</span> RouteRecordMatcher<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token comment">// matcher对象</span>
  <span class="token keyword">const</span> matcherMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map<span class="token operator">&lt;</span>RouteRecordName<span class="token punctuation">,</span> RouteRecordMatcher<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  globalOptions <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span> strict<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> end<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> sensitive<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span> <span class="token keyword">as</span> PathParserOptions<span class="token punctuation">,</span>
    globalOptions
  <span class="token punctuation">)</span>
  <span class="token keyword">function</span> <span class="token function">addRoute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">remoteRoute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">getRoutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> matchers
  <span class="token punctuation">}</span>  
  <span class="token keyword">function</span> <span class="token function">insertMatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">// add initial routes</span>
  routes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>route <span class="token operator">=&gt;</span> <span class="token function">addRoute</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> addRoute<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> removeRoute<span class="token punctuation">,</span> getRoutes<span class="token punctuation">,</span> getRecordMatcher <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的代码中我们可以看到，addRoute 函数内部通过 createRouteRecordMatcher 创建扩展之后的 matcher 对象，包括了 record、parent、children 等树形，可以很好地描述路由之间的嵌套父子关系。这样整个路由对象就已经创建完毕，那我们如何在路由切换的时候寻找到正确的路由对象呢？</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">addRoute</span><span class="token punctuation">(</span>    
  record<span class="token operator">:</span> RouteRecordRaw<span class="token punctuation">,</span>
  parent<span class="token operator">?</span><span class="token operator">:</span> RouteRecordMatcher<span class="token punctuation">,</span>
  originalRecord<span class="token operator">?</span><span class="token operator">:</span> RouteRecordMatcher
<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;alias&#39;</span> <span class="token keyword">in</span> record<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 标准化alias</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> normalizedRecord <span class="token keyword">of</span> normalizedRecords<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    matcher <span class="token operator">=</span> <span class="token function">createRouteRecordMatcher</span><span class="token punctuation">(</span>normalizedRecord<span class="token punctuation">,</span> parent<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
    <span class="token function">insertMatcher</span><span class="token punctuation">(</span>matcher<span class="token punctuation">)</span>
      
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> originalMatcher
    <span class="token operator">?</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// since other matchers are aliases, they should be removed by the original matcher</span>
        <span class="token function">removeRoute</span><span class="token punctuation">(</span>originalMatcher<span class="token operator">!</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token operator">:</span> noop

<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createRouteRecordMatcher</span><span class="token punctuation">(</span>
  record<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span>RouteRecord<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  parent<span class="token operator">:</span> RouteRecordMatcher <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> PathParserOptions
<span class="token punctuation">)</span><span class="token operator">:</span> RouteRecordMatcher <span class="token punctuation">{</span>
  <span class="token keyword">const</span> parser <span class="token operator">=</span> <span class="token function">tokensToParser</span><span class="token punctuation">(</span><span class="token function">tokenizePath</span><span class="token punctuation">(</span>record<span class="token punctuation">.</span>path<span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token keyword">const</span> matcher<span class="token operator">:</span> RouteRecordMatcher <span class="token operator">=</span> <span class="token function">assign</span><span class="token punctuation">(</span>parser<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    record<span class="token punctuation">,</span>
    parent<span class="token punctuation">,</span>
    <span class="token comment">// these needs to be populated by the parent</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    alias<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>matcher<span class="token punctuation">.</span>record<span class="token punctuation">.</span>aliasOf <span class="token operator">===</span> <span class="token operator">!</span>parent<span class="token punctuation">.</span>record<span class="token punctuation">.</span>aliasOf<span class="token punctuation">)</span>
      parent<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>matcher<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> matcher
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 vue-router 中，路由更新可以通过 router-link 渲染的链接实现，也可以使用 router 对象的 push 等方法实现。下面的代码中，router-link 组件内部也是渲染一个 a 标签，并且注册了 a 标签的 onClick 函数，内部也是通过 router.replace 或者 router.push 来实现。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> RouterLinkImpl <span class="token operator">=</span> <span class="token comment">/*#__PURE__*/</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&#39;RouterLink&#39;</span><span class="token punctuation">,</span>
  props<span class="token operator">:</span> <span class="token punctuation">{</span>
    to<span class="token operator">:</span> <span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token punctuation">[</span>String<span class="token punctuation">,</span> Object<span class="token punctuation">]</span> <span class="token keyword">as</span> PropType<span class="token operator">&lt;</span>RouteLocationRaw<span class="token operator">&gt;</span><span class="token punctuation">,</span>
      required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token operator">...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// router-link源码</span>
  <span class="token function">setup</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> <span class="token punctuation">{</span> slots <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> link <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token function">useLink</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> options <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>routerKey<span class="token punctuation">)</span><span class="token operator">!</span>

    <span class="token keyword">const</span> elClass <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> children <span class="token operator">=</span> slots<span class="token punctuation">.</span>default <span class="token operator">&amp;&amp;</span> slots<span class="token punctuation">.</span><span class="token function">default</span><span class="token punctuation">(</span>link<span class="token punctuation">)</span>
      <span class="token keyword">return</span> props<span class="token punctuation">.</span>custom
        <span class="token operator">?</span> children
        <span class="token operator">:</span> <span class="token function">h</span><span class="token punctuation">(</span>
            <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              href<span class="token operator">:</span> link<span class="token punctuation">.</span>href<span class="token punctuation">,</span>
              onClick<span class="token operator">:</span> link<span class="token punctuation">.</span>navigate<span class="token punctuation">,</span>
              <span class="token keyword">class</span><span class="token operator">:</span> elClass<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            children
          <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//  跳转</span>
  <span class="token keyword">function</span> <span class="token function">navigate</span><span class="token punctuation">(</span>
    e<span class="token operator">:</span> MouseEvent <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token keyword">as</span> MouseEvent
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span> <span class="token operator">|</span> NavigationFailure<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">guardEvent</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> router<span class="token punctuation">[</span><span class="token function">unref</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>replace<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token string">&#39;replace&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;push&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span>
        <span class="token function">unref</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>to<span class="token punctuation">)</span>
        <span class="token comment">// avoid uncaught errors are they are logged anyway</span>
      <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>noop<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们回到 createRouter 函数中，可以看到 push 函数直接调用了 pushWithRedirect 函数来实现，内部通过 resolve(to) 生成 targetLocation 变量。这个变量会赋值给 toLocation，然后执行 navigate(toLocation) 函数。<strong>而这个函数内部会执行一系列的导航守卫函数</strong>，最后会执行 finalizeNavigation 函数完成导航。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">push</span><span class="token punctuation">(</span>to<span class="token operator">:</span> RouteLocationRaw <span class="token operator">|</span> RouteLocation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">pushWithRedirect</span><span class="token punctuation">(</span>to<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">replace</span><span class="token punctuation">(</span>to<span class="token operator">:</span> RouteLocationRaw <span class="token operator">|</span> RouteLocationNormalized<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token function">locationAsObject</span><span class="token punctuation">(</span>to<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> replace<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 路由跳转函数</span>
<span class="token keyword">function</span> <span class="token function">pushWithRedirect</span><span class="token punctuation">(</span>
  to<span class="token operator">:</span> RouteLocationRaw <span class="token operator">|</span> RouteLocation<span class="token punctuation">,</span>
  redirectedFrom<span class="token operator">?</span><span class="token operator">:</span> RouteLocation
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>NavigationFailure <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> targetLocation<span class="token operator">:</span> RouteLocation <span class="token operator">=</span> <span class="token punctuation">(</span>pendingLocation <span class="token operator">=</span> <span class="token function">resolve</span><span class="token punctuation">(</span>to<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> from <span class="token operator">=</span> currentRoute<span class="token punctuation">.</span>value
  <span class="token keyword">const</span> data<span class="token operator">:</span> HistoryState <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> <span class="token punctuation">(</span>to <span class="token keyword">as</span> RouteLocationOptions<span class="token punctuation">)</span><span class="token punctuation">.</span>state
  <span class="token keyword">const</span> force<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> <span class="token punctuation">(</span>to <span class="token keyword">as</span> RouteLocationOptions<span class="token punctuation">)</span><span class="token punctuation">.</span>force
  <span class="token comment">// to could be a string where \`replace\` is a function</span>
  <span class="token keyword">const</span> replace <span class="token operator">=</span> <span class="token punctuation">(</span>to <span class="token keyword">as</span> RouteLocationOptions<span class="token punctuation">)</span><span class="token punctuation">.</span>replace <span class="token operator">===</span> <span class="token boolean">true</span>


  <span class="token keyword">const</span> toLocation <span class="token operator">=</span> targetLocation <span class="token keyword">as</span> RouteLocationNormalized

  
  <span class="token keyword">return</span> <span class="token punctuation">(</span>failure <span class="token operator">?</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>failure<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">navigate</span><span class="token punctuation">(</span>toLocation<span class="token punctuation">,</span> from<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>error<span class="token operator">:</span> NavigationFailure <span class="token operator">|</span> NavigationRedirectError<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
      <span class="token function">isNavigationFailure</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
        <span class="token operator">?</span> error
        <span class="token operator">:</span> <span class="token comment">// reject any unknown error</span>
          <span class="token function">triggerError</span><span class="token punctuation">(</span>error<span class="token punctuation">,</span> toLocation<span class="token punctuation">,</span> from<span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>failure<span class="token operator">:</span> NavigationFailure <span class="token operator">|</span> NavigationRedirectError <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

        failure <span class="token operator">=</span> <span class="token function">finalizeNavigation</span><span class="token punctuation">(</span>
          toLocation <span class="token keyword">as</span> RouteLocationNormalizedLoaded<span class="token punctuation">,</span>
          from<span class="token punctuation">,</span>
          <span class="token boolean">true</span><span class="token punctuation">,</span>
          replace<span class="token punctuation">,</span>
          data
        <span class="token punctuation">)</span>

      <span class="token function">triggerAfterEach</span><span class="token punctuation">(</span>
        toLocation <span class="token keyword">as</span> RouteLocationNormalizedLoaded<span class="token punctuation">,</span>
        from<span class="token punctuation">,</span>
        failure
      <span class="token punctuation">)</span>
      <span class="token keyword">return</span> failure
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的代码中我们可以看到，finalizeNavigation 函数内部通过 routerHistory.push 或者 replace 实现路由跳转，并且更新 currentRoute.value。currentRoute 就是我们在 install 方法中注册的全局变量 route，每次页面跳转currentRoute都会更新为toLocation，在任意组件中都可以通过route 变量来获取当前路由的数据，<strong>最后在 handleScroll 设置滚动行为。</strong></p><p>routerHistory 在 createRouter 中通过 option.history 获取，就是我们创建 vue-router 应用时通过 createWebHistory 或者 createWebHashHistory 创建的对象。createWebHistory 返回的是 HTML5 的 history 模式路由对象，createWebHashHistory 是 Hash 模式的路由对象。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">finalizeNavigation</span><span class="token punctuation">(</span>
    toLocation<span class="token operator">:</span> RouteLocationNormalizedLoaded<span class="token punctuation">,</span>
    from<span class="token operator">:</span> RouteLocationNormalizedLoaded<span class="token punctuation">,</span>
    isPush<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    replace<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    data<span class="token operator">?</span><span class="token operator">:</span> HistoryState
  <span class="token punctuation">)</span><span class="token operator">:</span> NavigationFailure <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>



    <span class="token keyword">const</span> isFirstNavigation <span class="token operator">=</span> from <span class="token operator">===</span> <span class="token constant">START_LOCATION_NORMALIZED</span>
    <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token operator">!</span>isBrowser <span class="token operator">?</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">:</span> history<span class="token punctuation">.</span>state

    <span class="token keyword">if</span> <span class="token punctuation">(</span>isPush<span class="token punctuation">)</span> <span class="token punctuation">{</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>replace <span class="token operator">||</span> isFirstNavigation<span class="token punctuation">)</span>
        routerHistory<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
          toLocation<span class="token punctuation">.</span>fullPath
        <span class="token punctuation">)</span>
      <span class="token keyword">else</span> routerHistory<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>toLocation<span class="token punctuation">.</span>fullPath<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// accept current navigation</span>
    currentRoute<span class="token punctuation">.</span>value <span class="token operator">=</span> toLocation
    <span class="token function">handleScroll</span><span class="token punctuation">(</span>toLocation<span class="token punctuation">,</span> from<span class="token punctuation">,</span> isPush<span class="token punctuation">,</span> isFirstNavigation<span class="token punctuation">)</span>

    <span class="token function">markAsReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">function</span> <span class="token function">markAsReady</span><span class="token punctuation">(</span>err<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ready<span class="token punctuation">)</span> <span class="token keyword">return</span>
    ready <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token function">setupListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    readyHandlers
      <span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">[</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>err <span class="token operator">?</span> <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    readyHandlers<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的代码中我们可以看到，createWebHashHistory 和 createWebHistory 的实现，内部都是通过 useHistoryListeners 实现路由的监听，通过 useHistoryStateNavigation 实现路由的切换。useHistoryStateNavigation 会返回 push 或者 replace 方法来更新路由</p><blockquote><p>https://github.com/vuejs/router/blob/main/src/history/html5.ts#L57</p></blockquote><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createWebHashHistory</span><span class="token punctuation">(</span>base<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> RouterHistory <span class="token punctuation">{</span>
  base <span class="token operator">=</span> location<span class="token punctuation">.</span>host <span class="token operator">?</span> base <span class="token operator">||</span> location<span class="token punctuation">.</span>pathname <span class="token operator">+</span> location<span class="token punctuation">.</span>search <span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token comment">// allow the user to provide a \`#\` in the middle: \`/base/#/app\`</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>base<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">&#39;#&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> base <span class="token operator">+=</span> <span class="token string">&#39;#&#39;</span>
  <span class="token keyword">return</span> <span class="token function">createWebHistory</span><span class="token punctuation">(</span>base<span class="token punctuation">)</span>
<span class="token punctuation">}</span>



<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createWebHistory</span><span class="token punctuation">(</span>base<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> RouterHistory <span class="token punctuation">{</span>
  base <span class="token operator">=</span> <span class="token function">normalizeBase</span><span class="token punctuation">(</span>base<span class="token punctuation">)</span>

  <span class="token keyword">const</span> historyNavigation <span class="token operator">=</span> <span class="token function">useHistoryStateNavigation</span><span class="token punctuation">(</span>base<span class="token punctuation">)</span>
  <span class="token keyword">const</span> historyListeners <span class="token operator">=</span> <span class="token function">useHistoryListeners</span><span class="token punctuation">(</span>
    base<span class="token punctuation">,</span>
    historyNavigation<span class="token punctuation">.</span>state<span class="token punctuation">,</span>
    historyNavigation<span class="token punctuation">.</span>location<span class="token punctuation">,</span>
    historyNavigation<span class="token punctuation">.</span>replace
  <span class="token punctuation">)</span>
  <span class="token keyword">function</span> <span class="token function">go</span><span class="token punctuation">(</span>delta<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> triggerListeners <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>triggerListeners<span class="token punctuation">)</span> historyListeners<span class="token punctuation">.</span><span class="token function">pauseListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span>delta<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> routerHistory<span class="token operator">:</span> RouterHistory <span class="token operator">=</span> <span class="token function">assign</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
      <span class="token comment">// it&#39;s overridden right after</span>
      location<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
      base<span class="token punctuation">,</span>
      go<span class="token punctuation">,</span>
      createHref<span class="token operator">:</span> <span class="token function">createHref</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> base<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    historyNavigation<span class="token punctuation">,</span>
    historyListeners
  <span class="token punctuation">)</span>

  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>routerHistory<span class="token punctuation">,</span> <span class="token string">&#39;location&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    enumerable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> historyNavigation<span class="token punctuation">.</span>location<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>routerHistory<span class="token punctuation">,</span> <span class="token string">&#39;state&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    enumerable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> historyNavigation<span class="token punctuation">.</span>state<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> routerHistory
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),e=[o];function c(i,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","VueRouter.html.vue"]]);export{k as default};
