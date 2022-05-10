import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.28325d67.js";const a={},e=s(`<h1 id="react-\u9879\u76EE\u4F18\u5316" tabindex="-1"><a class="header-anchor" href="#react-\u9879\u76EE\u4F18\u5316" aria-hidden="true">#</a> React \u9879\u76EE\u4F18\u5316</h1><h2 id="\u6253\u5305\u4F53\u79EF\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#\u6253\u5305\u4F53\u79EF\u5206\u6790" aria-hidden="true">#</a> \u6253\u5305\u4F53\u79EF\u5206\u6790</h2><p><code>\u672C\u8282\u76EE\u6807:</code> \u80FD\u591F\u5206\u6790\u9879\u76EE\u6253\u5305\u4F53\u79EF</p><p><strong>\u5206\u6790\u8BF4\u660E</strong>\u901A\u8FC7\u5206\u6790\u6253\u5305\u4F53\u79EF\uFF0C\u624D\u80FD\u77E5\u9053\u9879\u76EE\u4E2D\u7684\u54EA\u90E8\u5206\u5185\u5BB9\u4F53\u79EF\u8FC7\u5927\uFF0C\u624D\u80FD\u77E5\u9053\u5982\u4F55\u6765\u4F18\u5316</p><p><strong>\u4F7F\u7528\u6B65\u9AA4</strong></p><ol><li>\u5B89\u88C5\u5206\u6790\u6253\u5305\u4F53\u79EF\u7684\u5305\uFF1A<code>yarn add source-map-explorer</code></li><li>\u5728 package.json \u4E2D\u7684 scripts \u6807\u7B7E\u4E2D\uFF0C\u6DFB\u52A0\u5206\u6790\u6253\u5305\u4F53\u79EF\u7684\u547D\u4EE4</li><li>\u5BF9\u9879\u76EE\u6253\u5305\uFF1A<code>yarn build</code>\uFF08\u5982\u679C\u5DF2\u7ECF\u6253\u8FC7\u5305\uFF0C\u53EF\u7701\u7565\u8FD9\u4E00\u6B65\uFF09</li><li>\u8FD0\u884C\u5206\u6790\u547D\u4EE4\uFF1A<code>yarn analyze</code></li><li>\u901A\u8FC7\u6D4F\u89C8\u5668\u6253\u5F00\u7684\u9875\u9762\uFF0C\u5206\u6790\u56FE\u8868\u4E2D\u7684\u5305\u4F53\u79EF</li></ol><p><strong>\u6838\u5FC3\u4EE3\u7801</strong>\uFF1A</p><p>package.json \u4E2D\uFF1A</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>&quot;scripts&quot;: {
  &quot;analyze&quot;: &quot;source-map-explorer &#39;build/static/js/*.js&#39;&quot;,
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="\u4F18\u5316-\u914D\u7F6Ecdn" tabindex="-1"><a class="header-anchor" href="#\u4F18\u5316-\u914D\u7F6Ecdn" aria-hidden="true">#</a> \u4F18\u5316-\u914D\u7F6ECDN</h2><p><code>\u672C\u8282\u76EE\u6807:</code> \u80FD\u591F\u5BF9\u7B2C\u4E09\u65B9\u5305\u4F7F\u7528CDN\u4F18\u5316</p><p><strong>\u5206\u6790\u8BF4\u660E</strong>\uFF1A\u901A\u8FC7 craco \u6765\u4FEE\u6539 webpack \u914D\u7F6E\uFF0C\u4ECE\u800C\u5B9E\u73B0 CDN \u4F18\u5316</p><p><strong>\u6838\u5FC3\u4EE3\u7801</strong></p><p><code>craco.config.js</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const path = require(&#39;path&#39;)
const { whenProd, getPlugin, pluginByName } = require(&#39;@craco/craco&#39;)
module.exports = {
  // webpack \u914D\u7F6E
  webpack: {
    // \u914D\u7F6ECDN
    configure: (webpackConfig) =&gt; {
      let cdn = {
        js: [],
        css: []
      }
      // \u53EA\u6709\u751F\u4EA7\u73AF\u5883\u624D\u914D\u7F6E
      whenProd(() =&gt; {
        webpackConfig.externals = {
          react: &#39;React&#39;,
          &#39;react-dom&#39;: &#39;ReactDOM&#39;
        }
        cdn = {
          js: [
            &#39;https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js&#39;,
            &#39;https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js&#39;,
          ],
          css: []
        }
      })
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName(&#39;HtmlWebpackPlugin&#39;)
      )
      if (isFound) {
        // \u627E\u5230\u4E86HtmlWebpackPlugin\u7684\u63D2\u4EF6
        match.userOptions.cdn = cdn
      }
      return webpackConfig
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p><code>public/index.html </code></p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>&lt;body&gt;
  &lt;div id=&quot;root&quot;&gt;&lt;/div&gt;
  &lt;!-- \u52A0\u8F7D\u7B2C\u4E09\u53D1\u5305\u7684 CDN \u94FE\u63A5 --&gt;
  &lt;% htmlWebpackPlugin.userOptions.cdn.js.forEach(cdnURL =&gt; { %&gt;
    &lt;script src=&quot;&lt;%= cdnURL %&gt;&quot;&gt;&lt;/script&gt;
  &lt;% }) %&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="\u4F18\u5316-\u8DEF\u7531\u61D2\u52A0\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u4F18\u5316-\u8DEF\u7531\u61D2\u52A0\u8F7D" aria-hidden="true">#</a> \u4F18\u5316-\u8DEF\u7531\u61D2\u52A0\u8F7D</h2><p><code>\u672C\u8282\u76EE\u6807:</code> \u80FD\u591F\u5BF9\u8DEF\u7531\u8FDB\u884C\u61D2\u52A0\u8F7D\u5B9E\u73B0\u4EE3\u7801\u5206\u9694</p><p><strong>\u4F7F\u7528\u6B65\u9AA4</strong></p><ol><li>\u5728 App \u7EC4\u4EF6\u4E2D\uFF0C\u5BFC\u5165 Suspense \u7EC4\u4EF6</li><li>\u5728 \u8DEF\u7531Router \u5185\u90E8\uFF0C\u4F7F\u7528 Suspense \u7EC4\u4EF6\u5305\u88F9\u7EC4\u4EF6\u5185\u5BB9</li><li>\u4E3A Suspense \u7EC4\u4EF6\u63D0\u4F9B fallback \u5C5E\u6027\uFF0C\u6307\u5B9A loading \u5360\u4F4D\u5185\u5BB9</li><li>\u5BFC\u5165 lazy \u51FD\u6570\uFF0C\u5E76\u4FEE\u6539\u4E3A\u61D2\u52A0\u8F7D\u65B9\u5F0F\u5BFC\u5165\u8DEF\u7531\u7EC4\u4EF6</li></ol><p><strong>\u4EE3\u7801\u5B9E\u73B0</strong></p><p><code>App.js</code></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>import { Routes, Route } from &#39;react-router-dom&#39;
import { HistoryRouter, history } from &#39;./utils/history&#39;
import { AuthRoute } from &#39;./components/AuthRoute&#39;

// \u5BFC\u5165\u5FC5\u8981\u7EC4\u4EF6
import { lazy, Suspense } from &#39;react&#39;
// \u6309\u9700\u5BFC\u5165\u8DEF\u7531\u7EC4\u4EF6
const Login = lazy(() =&gt; import(&#39;./pages/Login&#39;))
const Layout = lazy(() =&gt; import(&#39;./pages/Layout&#39;))
const Home = lazy(() =&gt; import(&#39;./pages/Home&#39;))
const Article = lazy(() =&gt; import(&#39;./pages/Article&#39;))
const Publish = lazy(() =&gt; import(&#39;./pages/Publish&#39;))

function App () {
  return (
    &lt;HistoryRouter history={history}&gt;
      &lt;Suspense
        fallback={
          &lt;div
            style={{
              textAlign: &#39;center&#39;,
              marginTop: 200
            }}
          &gt;
            loading...
          &lt;/div&gt;
        }
      &gt;
        &lt;Routes&gt;
          {/* \u9700\u8981\u9274\u6743\u7684\u8DEF\u7531 */}
          &lt;Route path=&quot;/&quot; element={
            &lt;AuthRoute&gt;
              &lt;Layout /&gt;
            &lt;/AuthRoute&gt;
          }&gt;
            {/* \u4E8C\u7EA7\u8DEF\u7531\u9ED8\u8BA4\u9875\u9762 */}
            &lt;Route index element={&lt;Home /&gt;} /&gt;
            &lt;Route path=&quot;article&quot; element={&lt;Article /&gt;} /&gt;
            &lt;Route path=&quot;publish&quot; element={&lt;Publish /&gt;} /&gt;
          &lt;/Route&gt;
          {/* \u4E0D\u9700\u8981\u9274\u6743\u7684\u8DEF\u7531 */}
          &lt;Route path=&#39;/login&#39; element={&lt;Login /&gt;} /&gt;
        &lt;/Routes&gt;
      &lt;/Suspense&gt;
    &lt;/HistoryRouter&gt;
  )
}

export default App
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><p><strong>\u67E5\u770B\u6548\u679C</strong></p><p>\u6211\u4EEC\u53EF\u4EE5\u5728\u6253\u5305\u4E4B\u540E\uFF0C\u901A\u8FC7\u5207\u6362\u8DEF\u7531\uFF0C\u76D1\u63A7network\u9762\u677F\u8D44\u6E90\u7684\u8BF7\u6C42\u60C5\u51B5\uFF0C\u9A8C\u8BC1\u662F\u5426\u5206\u9694\u6210\u529F</p>`,26);function r(l,p){return e}var c=n(a,[["render",r],["__file","project.html.vue"]]);export{c as default};
