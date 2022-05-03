import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{b as a}from"./app.3dedad24.js";const n={},s=a(`<h1 id="node-\u7B14\u8BB0-6-stream" tabindex="-1"><a class="header-anchor" href="#node-\u7B14\u8BB0-6-stream" aria-hidden="true">#</a> Node \u7B14\u8BB0\uFF086\uFF09Stream</h1><p>\u6211\u4EEC\u53EF\u4EE5\u60F3\u8C61\u5F53\u6211\u4EEC\u4ECE\u4E00\u4E2A\u6587\u4EF6\u4E2D\u8BFB\u53D6\u6570\u636E\u65F6\uFF0C\u6587\u4EF6\u7684\u4E8C\u8FDB\u5236\uFF08\u5B57\u8282\uFF09\u6570\u636E\u4F1A\u6E90\u6E90\u4E0D\u65AD\u7684\u88AB\u8BFB\u53D6\u5230\u6211\u4EEC\u7A0B\u5E8F\u4E2D\uFF1B</p><p>\u5728\u4E4B\u524D\u5B66\u4E60\u6587\u4EF6\u7684\u8BFB\u5199\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7 readFile\u6216\u8005 writeFile\u65B9\u5F0F\u8BFB\u5199\u6587\u4EF6\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u9700\u8981\u6D41\u5462\uFF1F</p><ul><li><p>\u76F4\u63A5\u8BFB\u5199\u6587\u4EF6\u7684\u65B9\u5F0F\uFF0C\u867D\u7136\u7B80\u5355\uFF0C\u4F46\u662F\u65E0\u6CD5\u63A7\u5236\u4E00\u4E9B\u7EC6\u8282\u7684\u64CD\u4F5C\uFF1B</p></li><li><p>\u6BD4\u5982\u4ECE\u4EC0\u4E48\u4F4D\u7F6E\u5F00\u59CB\u8BFB\u3001\u8BFB\u5230\u4EC0\u4E48\u4F4D\u7F6E\u3001\u4E00\u6B21\u6027\u8BFB\u53D6\u591A\u5C11\u4E2A\u5B57\u8282\uFF1B</p></li><li><p>\u8BFB\u5230\u67D0\u4E2A\u4F4D\u7F6E\u540E\uFF0C\u6682\u505C\u8BFB\u53D6\uFF0C\u67D0\u4E2A\u65F6\u523B\u6062\u590D\u8BFB\u53D6\u7B49\u7B49\uFF08\u5207\u7247\uFF0C\u65AD\u70B9\uFF09\uFF1B</p></li><li><p>\u6216\u8005\u8FD9\u4E2A\u6587\u4EF6\u975E\u5E38\u5927\uFF0C\u6BD4\u5982\u4E00\u4E2A\u89C6\u9891\u6587\u4EF6\uFF0C\u4E00\u6B21\u6027\u5168\u90E8\u8BFB\u53D6\u5E76\u4E0D\u5408\u9002\uFF1B</p></li></ul><h2 id="\u6587\u4EF6\u8BFB\u5199\u7684stream" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u8BFB\u5199\u7684stream" aria-hidden="true">#</a> \u6587\u4EF6\u8BFB\u5199\u7684Stream</h2><p>\u4E8B\u5B9E\u4E0ANode\u4E2D\u5F88\u591A\u5BF9\u8C61\u662F\u57FA\u4E8E\u6D41\u5B9E\u73B0\u7684\uFF1A</p><ul><li>http\u6A21\u5757\u7684Request\u548CResponse\u5BF9\u8C61\uFF1B</li><li>process.stdout\u5BF9\u8C61\uFF1B</li></ul><p><strong>Node.js\u4E2D\u6709\u56DB\u79CD\u57FA\u672C\u6D41\u7C7B\u578B\uFF1A</strong></p><ul><li>Writable\uFF1A\u53EF\u4EE5\u5411\u5176\u5199\u5165\u6570\u636E\u7684\u6D41\uFF08\u4F8B\u5982 fs.createWriteStream ()\uFF09\u3002</li><li>Readable\uFF1A\u53EF\u4EE5\u4ECE\u4E2D\u8BFB\u53D6\u6570\u636E\u7684\u6D41\uFF08\u4F8B\u5982 fs.createReadStream()\uFF09\u3002</li><li>Duplex\uFF1A\u540C\u65F6\u4E3AReadable\u548C\u7684\u6D41Writable\uFF08\u4F8B\u5982 net.Socket\uFF09\u3002</li><li>Transform\uFF1ADuplex\u53EF\u4EE5\u5728\u5199\u5165\u548C\u8BFB\u53D6\u6570\u636E\u65F6\u4FEE\u6539\u6216\u8F6C\u6362\u6570\u636E\u7684\u6D41\uFF08\u4F8B\u5982zlib.createDeflate()\uFF09\u3002</li></ul><h3 id="readable" tabindex="-1"><a class="header-anchor" href="#readable" aria-hidden="true">#</a> Readable</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u4F20\u7EDF\u7684\u65B9\u5F0F
fs.readFile(&#39;./foo.txt&#39;, (err, data) =&gt; {
  console.log(data);
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u8FD9\u79CD\u65B9\u5F0F\u662F\u4E00\u6B21\u6027\u5C06\u4E00\u4E2A\u6587\u4EF6\u4E2D\u6240\u6709\u7684\u5185\u5BB9\u90FD\u8BFB\u53D6\u5230\u7A0B\u5E8F\uFF08\u5185\u5B58\uFF09\u4E2D\uFF0C\u4F46\u662F\u8FD9\u79CD\u8BFB\u53D6\u65B9\u5F0F\u5C31\u4F1A\u51FA\u73B0\u6211\u4EEC\u4E4B\u524D\u63D0\u5230\u7684 \u5F88\u591A\u95EE\u9898\uFF1A\u6587\u4EF6\u8FC7\u5927\u3001\u8BFB\u53D6\u7684\u4F4D\u7F6E\u3001\u7ED3\u675F\u7684\u4F4D\u7F6E\u3001\u4E00\u6B21\u8BFB\u53D6\u7684\u5927\u5C0F\uFF1B</p><p>\u8FD9\u4E2A\u65F6\u5019\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 createReadStream\uFF0C\u6211\u4EEC\u6765\u770B\u51E0\u4E2A\u53C2\u6570\uFF0C\u66F4\u591A\u53C2\u6570\u53EF\u4EE5\u53C2\u8003\u5B98\u7F51\uFF1A</p><ul><li>start\uFF1A\u6587\u4EF6\u8BFB\u53D6\u5F00\u59CB\u7684\u4F4D\u7F6E\uFF1B</li><li>end\uFF1A\u6587\u4EF6\u8BFB\u53D6\u7ED3\u675F\u7684\u4F4D\u7F6E\uFF1B</li><li>highWaterMark\uFF1A\u4E00\u6B21\u6027\u8BFB\u53D6\u5B57\u8282\u7684\u957F\u5EA6\uFF0C\u9ED8\u8BA4\u662F64kb\uFF1B</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u6D41\u7684\u65B9\u5F0F\u8BFB\u53D6
const reader = fs.createReadStream(&quot;./foo.txt&quot;, {
  start: 3,
  end: 10,
  highWaterMark: 2
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u5B9E\u73B0\u76D1\u542C\u76F8\u5173\u4E8B\u4EF6\u3001\u6682\u505C\u6216\u8005\u6062\u590D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u6570\u636E\u8BFB\u53D6\u7684\u8FC7\u7A0B
reader.on(&quot;data&quot;, (data) =&gt; {
  console.log(data);

  reader.pause();

  setTimeout(() =&gt; {
    reader.resume();
  }, 1000);
});

reader.on(&#39;open&#39;, () =&gt; {
  console.log(&quot;\u6587\u4EF6\u88AB\u6253\u5F00&quot;);
})

reader.on(&#39;close&#39;, () =&gt; {
  console.log(&quot;\u6587\u4EF6\u88AB\u5173\u95ED&quot;);
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="writable" tabindex="-1"><a class="header-anchor" href="#writable" aria-hidden="true">#</a> Writable</h3><p>\u4E4B\u524D\u6211\u4EEC\u5199\u5165\u4E00\u4E2A\u6587\u4EF6\u7684\u65B9\u5F0F\u662F\u8FD9\u6837\u7684\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u4F20\u7EDF\u7684\u5199\u5165\u65B9\u5F0F
fs.writeFile(&quot;./bar.txt&quot;, &quot;Hello Stream&quot;, {flag: &quot;a&quot;}, (err) =&gt; {
      console.log(err);
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u8FD9\u79CD\u65B9\u5F0F\u76F8\u5F53\u4E8E\u4E00\u6B21\u6027\u5C06\u6240\u6709\u7684\u5185\u5BB9\u5199\u5165\u5230\u6587\u4EF6\u4E2D\uFF0C\u4F46\u662F\u8FD9\u79CD\u65B9\u5F0F\u4E5F\u6709\u5F88\u591A\u95EE\u9898\uFF1A\u6BD4\u5982\u6211\u4EEC\u5E0C\u671B\u4E00\u70B9\u70B9\u5199\u5165\u5185\u5BB9\uFF0C\u7CBE\u786E\u6BCF\u6B21\u5199\u5165\u7684\u4F4D\u7F6E\u3002</p><p>\u8FD9\u4E2A\u65F6\u5019\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 createWriteStream\uFF0C\u6211\u4EEC\u6765\u770B\u51E0\u4E2A\u53C2\u6570\uFF0C\u66F4\u591A\u53C2\u6570\u53EF\u4EE5\u53C2\u8003\u5B98\u7F51\uFF1A</p><ul><li>flags\uFF1A\u9ED8\u8BA4\u662Fw\uFF0C\u5982\u679C\u6211\u4EEC\u5E0C\u671B\u662F\u8FFD\u52A0\u5199\u5165\uFF0C\u53EF\u4EE5\u4F7F\u7528 a\u6216\u8005 a+\uFF1B</li><li>start\uFF1A\u5199\u5165\u7684\u4F4D\u7F6E\uFF1B</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// Stream\u7684\u5199\u5165\u65B9\u5F0F
const writer = fs.createWriteStream(&#39;./bar.txt&#39;, {
  flags: &quot;r+&quot;,
  start: 4
});

writer.write(&quot;\u4F60\u597D\u554A&quot;, (err) =&gt; {
  if (err) {
    console.log(err);
    return;
  }
  console.log(&quot;\u5199\u5165\u6210\u529F&quot;);
});

writer.write(&quot;\u674E\u94F6\u6CB3&quot;, (err) =&gt; {
  console.log(&quot;\u7B2C\u4E8C\u6B21\u5199\u5165&quot;);
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="close\u7684\u76D1\u542C" tabindex="-1"><a class="header-anchor" href="#close\u7684\u76D1\u542C" aria-hidden="true">#</a> close\u7684\u76D1\u542C</h4><p>\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C\u6211\u4EEC\u5E76\u4E0D\u80FD\u76D1\u542C\u5230 close \u4E8B\u4EF6\uFF1A</p><ul><li>\u8FD9\u662F\u56E0\u4E3A\u5199\u5165\u6D41\u5728\u6253\u5F00\u540E\u662F\u4E0D\u4F1A\u81EA\u52A8\u5173\u95ED\u7684\uFF1B</li><li>\u6211\u4EEC\u5FC5\u987B\u624B\u52A8\u5173\u95ED\uFF0C\u6765\u544A\u8BC9Node\u5DF2\u7ECF\u5199\u5165\u7ED3\u675F\u4E86\uFF1B</li><li>\u5E76\u4E14\u4F1A\u53D1\u51FA\u4E00\u4E2A finish \u4E8B\u4EF6\u7684\uFF1B</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>writer.close();
write(&quot;Hello World&quot;);
close();

writer.on(&#39;close&#39;, () =&gt; {
  console.log(&quot;\u6587\u4EF6\u88AB\u5173\u95ED&quot;);
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u53E6\u5916\u4E00\u4E2A\u975E\u5E38\u5E38\u7528\u7684\u65B9\u6CD5\u662F end\uFF1Aend\u65B9\u6CD5\u76F8\u5F53\u4E8E\u505A\u4E86\u4E24\u6B65\u64CD\u4F5C\uFF1A write\u4F20\u5165\u7684\u6570\u636E\u548C\u8C03\u7528close\u65B9\u6CD5\uFF1B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>writer.end(&quot;Hello World&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="pipe\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#pipe\u65B9\u6CD5" aria-hidden="true">#</a> pipe\u65B9\u6CD5</h3><p>\u6B63\u5E38\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5C06\u8BFB\u53D6\u5230\u7684 \u8F93\u5165\u6D41\uFF0C\u624B\u52A8\u7684\u653E\u5230 \u8F93\u51FA\u6D41\u4E2D\u8FDB\u884C\u5199\u5165\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u4F20\u7EDF\u7684\u5199\u6CD5
fs.readFile(&#39;./bar.txt&#39;, (err, data) =&gt; {
  fs.writeFile(&#39;./baz.txt&#39;, data, (err) =&gt; {
    console.log(err);
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u6211\u4EEC\u4E5F\u53EF\u4EE5\u901A\u8FC7pipe\u6765\u5B8C\u6210\u8FD9\u6837\u7684\u64CD\u4F5C\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// Stream\u7684\u5199\u6CD5
const reader = fs.createReadStream(&quot;./foo.txt&quot;);
const writer = fs.createWriteStream(&#39;./foz.txt&#39;);

reader.pipe(writer);
writer.close();
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,35);function r(l,i){return s}var c=e(n,[["render",r],["__file","Stream.html.vue"]]);export{c as default};
