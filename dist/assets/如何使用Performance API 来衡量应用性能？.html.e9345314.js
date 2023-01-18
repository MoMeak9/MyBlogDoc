import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as i,a as n,b as s,d as t,e,r}from"./app.d7b34baa.js";const c={},l=e('<h1 id="如何使用performance-api-来衡量应用性能" tabindex="-1"><a class="header-anchor" href="#如何使用performance-api-来衡量应用性能" aria-hidden="true">#</a> 如何使用Performance API 来衡量应用性能？</h1><p>从历史上看，我们对客户端性能监控方式非常有限，而且还遇到了API浏览器的限制，阻碍了我们准确地衡量客户端性能。</p><p>幸运的是，由于有了新的面向性能的api，这种情况正在开始改变。现在，浏览器的Performance API给我们提供了精确度量Web页面性能的工具。</p><blockquote><p>不耐烦看的同学可以直接调到末尾<strong>使用方法一览</strong></p></blockquote><h2 id="使用-performance-api-的好处" tabindex="-1"><a class="header-anchor" href="#使用-performance-api-的好处" aria-hidden="true">#</a> 使用 Performance API 的好处</h2><ul><li>这些api增加了在开发工具中使用性能分析时的经验；</li><li>Chrome开发工具和其他工具，如Lighthouse只在开发阶段有帮助。但是使用Performance API，我们可以在生产中获得真实的用户度量数据(RUM - real user measurement)；</li><li>我们可以得到非常精确的时间戳数据，这使得这些性能指标的分析非常准确。</li></ul><blockquote><p>Performance 接口可以获取到当前页面中与性能相关的信息。它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、Navigation Timing API、 User Timing API 和 Resource Timing API。</p><p align="right"> —— MDN </p></blockquote><h3 id="high-resolution-time" tabindex="-1"><a class="header-anchor" href="#high-resolution-time" aria-hidden="true">#</a> High resolution time</h3><p>高分辨率时间的精确程度可达几分之一毫秒。相比之下，基于Date的时间只能精确到毫秒。这种精确度使它成为精确测量时间的理想工具。</p><p>由User-Agent (UA)测量的高分辨率时间不会随着系统时间的任何更改而更改，因为它是从UA创建的全局时钟中获取的。</p><p>在Performance API中测量的每个测量值都是高分辨率时间。这就是为什么你总是听到性能API是高分辨率时间API的一部分。</p><h3 id="performance-timeline-api" tabindex="-1"><a class="header-anchor" href="#performance-timeline-api" aria-hidden="true">#</a> Performance timeline API</h3><p>Performance timeline API 是Performance API的扩展。该扩展提供了基于特定筛选条件检索性能指标的接口。</p><p>Performance Timeline API提供了以下三个方法，包含在性能接口中:</p><ul><li><code>getEntries()</code></li><li><code>getEntriesByName()</code></li><li><code>getEntriesByType()</code></li></ul><p>每个方法返回从Performance API的所有其他扩展收集的<code>entries</code>列表。</p><p><code>PerformanceObserver</code> 是API中包含的另一个接口。它主要用于观察性能时间轴（Performance Timeline），并在浏览器记录时通知新的性能条目。它可以用来度量浏览器和 Node.js 应用程序中某些性能指标。</p><h3 id="performance-entries" tabindex="-1"><a class="header-anchor" href="#performance-entries" aria-hidden="true">#</a> Performance entries</h3><p>我们用Performance API度量的东西称为<code>entries</code>。以下是可供我们使用的性能项:</p><ul><li><code>mark</code></li><li><code>measure</code></li><li><code>navigation</code></li><li><code>resource</code></li><li><code>paint</code></li><li><code>frame</code></li></ul><p>使用这些条目和各自的API来度量性能。</p><h2 id="使用-navigation-timing-api-和-resource-timing-api测量" tabindex="-1"><a class="header-anchor" href="#使用-navigation-timing-api-和-resource-timing-api测量" aria-hidden="true">#</a> 使用 Navigation timing API 和 Resource timing API测量</h2>',22),u={href:"https://www.w3.org/TR/navigation-timing-2/#processing-model",target:"_blank",rel:"noopener noreferrer"},d=e(`<p>获取方法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Navigation Timing entries:</span>
<span class="token keyword">const</span> navigationEntries <span class="token operator">=</span> performance<span class="token punctuation">.</span><span class="token function">getEntriesByType</span><span class="token punctuation">(</span><span class="token string">&quot;navigation&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 内容</span>
<span class="token punctuation">{</span>
  <span class="token string-property property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://awebsite.com&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;entryType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;navigation&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;startTime&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;duration&quot;</span><span class="token operator">:</span> <span class="token number">7816.495000151917</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;initiatorType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;navigation&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;nextHopProtocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;workerStart&quot;</span><span class="token operator">:</span> <span class="token number">9.504999965429306</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;redirectStart&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;redirectEnd&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;fetchStart&quot;</span><span class="token operator">:</span> <span class="token number">39.72000000067055</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;domainLookupStart&quot;</span><span class="token operator">:</span> <span class="token number">39.72000000067055</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;domainLookupEnd&quot;</span><span class="token operator">:</span> <span class="token number">39.72000000067055</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;connectStart&quot;</span><span class="token operator">:</span> <span class="token number">39.72000000067055</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;connectEnd&quot;</span><span class="token operator">:</span> <span class="token number">39.72000000067055</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;secureConnectionStart&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;requestStart&quot;</span><span class="token operator">:</span> <span class="token number">39.72000000067055</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;responseStart&quot;</span><span class="token operator">:</span> <span class="token number">6608.200000133365</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;responseEnd&quot;</span><span class="token operator">:</span> <span class="token number">6640.834999969229</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;transferSize&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;encodedBodySize&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;decodedBodySize&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;serverTiming&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;unloadEventStart&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;unloadEventEnd&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;domInteractive&quot;</span><span class="token operator">:</span> <span class="token number">6812.060000142083</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;domContentLoadedEventStart&quot;</span><span class="token operator">:</span> <span class="token number">6812.115000095218</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;domContentLoadedEventEnd&quot;</span><span class="token operator">:</span> <span class="token number">6813.680000137538</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;domComplete&quot;</span><span class="token operator">:</span> <span class="token number">7727.995000081137</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;loadEventStart&quot;</span><span class="token operator">:</span> <span class="token number">7760.385000146925</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;loadEventEnd&quot;</span><span class="token operator">:</span> <span class="token number">7816.495000151917</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;navigate&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;redirectCount&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Resource Timing entries</span>
<span class="token keyword">const</span> resourceListEntries <span class="token operator">=</span> performance<span class="token punctuation">.</span><span class="token function">getEntriesByType</span><span class="token punctuation">(</span><span class="token string">&quot;resource&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这将返回一个资源计时对象数组。单个对象看起来是这样的，可用于获取某一Web资源的前后表现信息:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://awebsite.com/images/image.png&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;entryType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;resource&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;startTime&quot;</span><span class="token operator">:</span> <span class="token number">237.85999999381602</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;duration&quot;</span><span class="token operator">:</span> <span class="token number">11.274999938905239</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;initiatorType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;img&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;nextHopProtocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;h2&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;workerStart&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;redirectStart&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;redirectEnd&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;fetchStart&quot;</span><span class="token operator">:</span> <span class="token number">237.85999999381602</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;domainLookupStart&quot;</span><span class="token operator">:</span> <span class="token number">237.85999999381602</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;domainLookupEnd&quot;</span><span class="token operator">:</span> <span class="token number">237.85999999381602</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;connectStart&quot;</span><span class="token operator">:</span> <span class="token number">237.85999999381602</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;connectEnd&quot;</span><span class="token operator">:</span> <span class="token number">237.85999999381602</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;secureConnectionStart&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;requestStart&quot;</span><span class="token operator">:</span> <span class="token number">243.38999995961785</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;responseStart&quot;</span><span class="token operator">:</span> <span class="token number">244.40500000491738</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;responseEnd&quot;</span><span class="token operator">:</span> <span class="token number">249.13499993272126</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;transferSize&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;encodedBodySize&quot;</span><span class="token operator">:</span> <span class="token number">29009</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;decodedBodySize&quot;</span><span class="token operator">:</span> <span class="token number">29009</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;serverTiming&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用场景一览" tabindex="-1"><a class="header-anchor" href="#使用场景一览" aria-hidden="true">#</a> 使用场景一览</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// DNS解析</span>
<span class="token keyword">const</span> dnsTime <span class="token operator">=</span> navigationEntries<span class="token punctuation">.</span>domainLookupEnd <span class="token operator">-</span> navigationEntries<span class="token punctuation">.</span>domainLookupStart<span class="token punctuation">;</span>

<span class="token comment">// 响应 + 响应时间</span>
<span class="token keyword">const</span> totalTime <span class="token operator">=</span> navigationEntries<span class="token punctuation">.</span>responseEnd <span class="token operator">-</span> navigationEntries<span class="token punctuation">.</span>requestStart<span class="token punctuation">;</span>

<span class="token comment">// 缓存查找响应时间</span>
<span class="token keyword">const</span> fetchTime <span class="token operator">=</span> navigationEntries<span class="token punctuation">.</span>responseEnd <span class="token operator">-</span> navigationEntries<span class="token punctuation">.</span>fetchStart<span class="token punctuation">;</span>

<span class="token comment">// 使用Service worker响应时间</span>
<span class="token keyword">let</span> workerTime <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>navigationEntries<span class="token punctuation">.</span>workerStart <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
workerTime <span class="token operator">=</span> navigationEntries<span class="token punctuation">.</span>responseEnd <span class="token operator">-</span> navigationEntries<span class="token punctuation">.</span>workerStart<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 收到第一个字节</span>
<span class="token keyword">const</span> ttfb <span class="token operator">=</span> navigationEntries<span class="token punctuation">.</span>responseStart <span class="token operator">-</span> navigationEntries<span class="token punctuation">.</span>requestStart<span class="token punctuation">;</span>

<span class="token comment">// 重定向时间</span>
<span class="token keyword">const</span> redirectTime <span class="token operator">=</span> navigationEntries<span class="token punctuation">.</span>redirectEnd <span class="token operator">-</span> navigationEntries<span class="token punctuation">.</span>redirectStart<span class="token punctuation">;</span>

<span class="token comment">// 测量HTTP报头大小</span>
<span class="token keyword">const</span> headerSize <span class="token operator">=</span> navigationEntries<span class="token punctuation">.</span>transferSize <span class="token operator">-</span> navigationEntries<span class="token punctuation">.</span>encodedBodySize<span class="token punctuation">;</span>

<span class="token comment">// 测量资源加载时间</span>
resourceListEntries<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">resource</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>resource<span class="token punctuation">.</span>initiatorType <span class="token operator">==</span> <span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Time taken to load </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>resource<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">: </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> resource<span class="token punctuation">.</span>responseEnd <span class="token operator">-</span> resource<span class="token punctuation">.</span>startTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取单个资源指标</span>
<span class="token keyword">const</span> impResourceTime <span class="token operator">=</span> performance<span class="token punctuation">.</span><span class="token function">getEntriesByName</span><span class="token punctuation">(</span><span class="token string">&quot;https://awebsite.com/imp-resource.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),k={id:"补充-直接使用-performance-timing-计算",tabindex:"-1"},m=n("a",{class:"header-anchor",href:"#补充-直接使用-performance-timing-计算","aria-hidden":"true"},"#",-1),v={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/timing",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"performance.timing",-1),g=e(`<p><strong>警告：</strong> 该属性在 Navigation Timing Level 2 specification 中已经被废弃，请使用 PerformanceNavigationTiming 替代。虽然一些浏览器仍然支持它，但也许正准备移除或出于兼容性而保留。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> timingInfo <span class="token operator">=</span> window<span class="token punctuation">.</span>performance<span class="token punctuation">.</span>timing<span class="token punctuation">;</span>
<span class="token comment">// DNS解析，DNS查询耗时</span>
timingInfo<span class="token punctuation">.</span>domainLookupEnd <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>domainLookupStart<span class="token punctuation">;</span>

<span class="token comment">// TCP连接耗时</span>
timingInfo<span class="token punctuation">.</span>connectEnd <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>connectStart<span class="token punctuation">;</span>

<span class="token comment">// 获得首字节耗费时间，也叫TTFB</span>
timingInfo<span class="token punctuation">.</span>responseStart <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>navigationStart<span class="token punctuation">;</span>

<span class="token comment">// domReady时间(与DomContentLoad事件对应)</span>
timingInfo<span class="token punctuation">.</span>domContentLoadedEventStart <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>navigationStart<span class="token punctuation">;</span>

<span class="token comment">// DOM资源下载</span>
timingInfo<span class="token punctuation">.</span>responseEnd <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>responseStart<span class="token punctuation">;</span>

<span class="token comment">// 准备新页面时间耗时</span>
timingInfo<span class="token punctuation">.</span>fetchStart <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>navigationStart<span class="token punctuation">;</span>

<span class="token comment">// 重定向耗时</span>
timingInfo<span class="token punctuation">.</span>redirectEnd <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>redirectStart<span class="token punctuation">;</span>

<span class="token comment">// Appcache 耗时</span>
timingInfo<span class="token punctuation">.</span>domainLookupStart <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>fetchStart<span class="token punctuation">;</span>

<span class="token comment">// unload 前文档耗时</span>
timingInfo<span class="token punctuation">.</span>unloadEventEnd <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>unloadEventStart<span class="token punctuation">;</span>

<span class="token comment">// request请求耗时</span>
timingInfo<span class="token punctuation">.</span>responseEnd <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>requestStart<span class="token punctuation">;</span>

<span class="token comment">// 请求完毕至DOM加载</span>
timingInfo<span class="token punctuation">.</span>domInteractive <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>responseEnd<span class="token punctuation">;</span>

<span class="token comment">// 解释dom树耗时</span>
timingInfo<span class="token punctuation">.</span>domComplete <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>domInteractive<span class="token punctuation">;</span>

<span class="token comment">// 从开始至load总耗时</span>
timingInfo<span class="token punctuation">.</span>loadEventEnd <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>navigationStart<span class="token punctuation">;</span>

<span class="token comment">// 白屏时间</span>
timingInfo<span class="token punctuation">.</span>responseStart <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>fetchStart<span class="token punctuation">;</span>

<span class="token comment">// 首屏时间</span>
timingInfo<span class="token punctuation">.</span>domComplete <span class="token operator">-</span> timingInfo<span class="token punctuation">.</span>fetchStart<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),y=n("p",null,"参考：",-1),q={href:"https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Using_the_Performance_API",target:"_blank",rel:"noopener noreferrer"},f={href:"https://blog.logrocket.com/how-to-practically-use-performance-api-to-measure-performance/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/timing",target:"_blank",rel:"noopener noreferrer"};function I(P,E){const a=r("ExternalLinkIcon");return o(),i("div",null,[l,n("p",null,[s("navigation timing API 和 resource timing API 有许多内容重叠，你可以阅读"),n("a",u,[s("此文章"),t(a)]),s("详细了解他们之间的差异。")]),d,n("h2",k,[m,s(" 补充："),n("a",v,[s("直接使用 "),b,s(" 计算"),t(a)])]),g,n("blockquote",null,[y,n("p",null,[n("a",q,[s("Using the Performance API"),t(a)])]),n("p",null,[n("a",f,[s("How to practically use Performance API to measure performance"),t(a)])]),n("p",null,[n("a",h,[s("Performance.timing"),t(a)])])])])}const T=p(c,[["render",I],["__file","如何使用Performance API 来衡量应用性能？.html.vue"]]);export{T as default};
