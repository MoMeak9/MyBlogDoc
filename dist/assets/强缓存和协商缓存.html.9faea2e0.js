import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c,e as d}from"./app.d7b34baa.js";const a={},t=d('<h1 id="强缓存和协商缓存" tabindex="-1"><a class="header-anchor" href="#强缓存和协商缓存" aria-hidden="true">#</a> 强缓存和协商缓存</h1><blockquote><p>参考：</p><p>https://juejin.cn/post/7011171333761400862</p><p>https://juejin.cn/post/6844903736196726798</p></blockquote><h2 id="为什么有这个东西" tabindex="-1"><a class="header-anchor" href="#为什么有这个东西" aria-hidden="true">#</a> 为什么有这个东西？</h2><h3 id="web缓存描述" tabindex="-1"><a class="header-anchor" href="#web缓存描述" aria-hidden="true">#</a> web缓存描述 ：</h3><p>Web 缓存是可以自动保存常见文档副本的 HTTP 设备。当 Web 请求抵达缓存时， 如果本地有“已缓存的”副本，就可以从本地存储设备而不是原始服务器中提取这 个文档。（此结论来自http权威指南）</p><h6 id="缓存的优缺点" tabindex="-1"><a class="header-anchor" href="#缓存的优缺点" aria-hidden="true">#</a> 缓存的优缺点：</h6><p>优点：</p><ul><li>缓存减少了冗余的数据传输，节省了你的网络费用。</li><li>缓存缓解了网络瓶颈的问题。不需要更多的带宽就能够更快地加载页面。</li><li>缓存降低了对原始服务器的要求。服务器可以更快地响应，避免过载的出现。</li><li>缓存降低了距离时延，因为从较远的地方加载页面会更慢一些。</li></ul><p>缺点：</p><ul><li>缓存中的数据可能与服务器的数据不一致；</li><li>消耗内存；</li></ul><h2 id="第一阶段、强缓存验证" tabindex="-1"><a class="header-anchor" href="#第一阶段、强缓存验证" aria-hidden="true">#</a> 第一阶段、强缓存验证：</h2><p>根据请求头相关控制字段开始尝试命中</p><p>1、 验证位置：<strong>本地</strong>（内存或者硬盘，根据浏览器策略决定）， 2、 验证字段：就两个，<code>expires (http1.0中出现)</code>和<code>cache-control (http1.1中出现)</code>，如果这两个字段同时出现，<code>cache-control</code>会覆盖<code>expires</code></p><p><img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/doc/202203232118246.png" alt="image-20220323211858097"></p><p>3、验证流程： 查看两个字段的指定时间，如果过期则跳到下一阶段（协商缓存）</p><p>4、如果命中： 状态码：200 (from disk cache)或是200 OK (from memory cache) <strong>注释：根据该缓存的内存占用进行存储，内存占用过高则存入磁盘</strong></p><h3 id="cache-control-常用的参数" tabindex="-1"><a class="header-anchor" href="#cache-control-常用的参数" aria-hidden="true">#</a> <code>cache-control</code> 常用的参数：</h3><blockquote><p><strong>private</strong>：客户端可以缓存 <strong>public</strong>：客户端和代理服务器均可缓存； <strong>max-age=xxx</strong>：缓存的资源将在 xxx 秒后过期，常见：2592000（三十天）、31536000（一年）； <strong>no-cache</strong>：跳过当前强验证步骤，使用下一阶段协商缓存来验证是否过期； <strong>must-revalidate</strong>：如果强缓存时间过期，必须去服务器进行有效性检验这个旧的缓存 <strong>no-transform</strong>：多用于图片，不允许对资源进行转换压缩</p></blockquote><h2 id="第二阶段、协商缓存验证" tabindex="-1"><a class="header-anchor" href="#第二阶段、协商缓存验证" aria-hidden="true">#</a> 第二阶段、协商缓存验证：</h2><p>1、验证位置：<strong>服务器</strong>；</p><p>2、验证字段：有两组，<code>Last-Modified + If-Modified-Since</code>和<code>ETag + If-None-Match</code></p><p>3、验证流程： <strong>①<code>Last-Modified + If-Modified-Since</code>: 修改日期比较</strong> 上次请求时，缓存文件中的<code>Last-Modified</code>记录该资源的修改日期，本次请求时，<code>Last-Modified</code>会通过请求头<code>If-Modified-Since</code>传递给服务器，<strong>服务器端的最新修改日期和该缓存文件的最新修改日期比较；</strong><strong>② <code>ETag</code> + <code>If-None-Match</code>: 缓存验证</strong><code>ETag</code>是服务器端认为设置的一串唯一字符串（一般是哈希或者版本号），本次请求时，<code>If-None-Match</code> 传入缓存文件的<code>ETag</code>值，<strong>去和服务器里的该资源的<code>ETag</code>比较，以达到缓存验证的目的；</strong></p><p>4、验证结果： ①<code>Last-Modified + If-Modified-Since</code>: 如果<code>If-Modified-Since</code>值 <strong>就是</strong> 服务器端该文件的最新修改日期，说明缓存是新鲜的，服务器返回304，浏览器使用本地缓存； 如果<code>If-Modified-Since</code>值 <strong>早于</strong> 服务器端该文件的最新修改日期，说明缓存不新鲜，服务器返回新的该资源，并且更新该资源<code>Last-Modified</code>日期 ② <code>ETag</code> + <code>If-None-Match</code>： 如果<code>If-None-Match</code>传递给后台的缓存<code>ETag</code>值和后台对应该文件的<code>ETag</code>值一样，说明该缓存新鲜，服务器返回 304 状态码，浏览器使用本地缓存； 如果<code>If-None-Match</code>传递给后台的缓存<code>ETag</code>值和后台对应该文件的<code>ETag</code>值不一样，说明该缓存不新鲜，服务器返回更新的资源和新的 <code>Etag</code>值；</p>',23),r=[t];function i(n,s){return o(),c("div",null,r)}const g=e(a,[["render",i],["__file","强缓存和协商缓存.html.vue"]]);export{g as default};
