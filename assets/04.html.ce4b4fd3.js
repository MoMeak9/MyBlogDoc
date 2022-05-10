import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9338189c.js";const e={},a=s(`<h1 id="node-\u7B14\u8BB0-3-node\u5E38\u7528\u5185\u7F6E\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#node-\u7B14\u8BB0-3-node\u5E38\u7528\u5185\u7F6E\u6A21\u5757" aria-hidden="true">#</a> Node \u7B14\u8BB0\uFF083\uFF09Node\u5E38\u7528\u5185\u7F6E\u6A21\u5757</h1><h2 id="\u5185\u7F6E\u6A21\u5757path" tabindex="-1"><a class="header-anchor" href="#\u5185\u7F6E\u6A21\u5757path" aria-hidden="true">#</a> \u5185\u7F6E\u6A21\u5757path</h2><p>path\u6A21\u5757\u7528\u4E8E\u5BF9\u8DEF\u5F84\u548C\u6587\u4EF6\u8FDB\u884C\u5904\u7406\uFF0C\u63D0\u4F9B\u4E86\u5F88\u591A\u597D\u7528\u7684\u65B9\u6CD5\u3002\u5E76\u4E14\u6211\u4EEC\u77E5\u9053\u5728Mac OS\u3001Linux\u548Cwindow\u4E0A\u7684\u8DEF\u5F84\u65F6\u4E0D\u4E00\u6837\u7684\uFF0Cwindow\u4E0A\u4F1A\u4F7F\u7528 \\\u6216\u8005 \\ \u6765\u4F5C\u4E3A\u6587\u4EF6\u8DEF\u5F84\u7684\u5206\u9694\u7B26\uFF0C\u5F53\u7136\u76EE\u524D\u4E5F\u652F\u6301 /\uFF0C\u5728Mac OS\u3001Linux\u7684Unix\u64CD\u4F5C\u7CFB\u7EDF\u4E0A\u4F7F\u7528 / \u6765\u4F5C\u4E3A\u6587\u4EF6\u8DEF\u5F84\u7684\u5206\u9694\u7B26\uFF1B</p><p>\u63D0\u4F9B\u53EF\u79FB\u690D\u64CD\u4F5C\u7CFB\u7EDF\u63A5\u53E3\uFF08\u82F1\u8BED\uFF1APortable Operating System Interface\uFF0C\u7F29\u5199\u4E3APOSIX\uFF09\uFF0C</p><p>Linux\u548CMac OS\u90FD\u5B9E\u73B0\u4E86POSIX\u63A5\u53E3\uFF0CWindow\u90E8\u5206\u7535\u8111\u5B9E\u73B0\u4E86POSIX\u63A5\u53E3\u3002</p><h3 id="\u5E38\u89C1\u7684api" tabindex="-1"><a class="header-anchor" href="#\u5E38\u89C1\u7684api" aria-hidden="true">#</a> \u5E38\u89C1\u7684API</h3><p>\u4ECE\u8DEF\u5F84\u4E2D\u83B7\u53D6\u4FE1\u606F\uFF1A</p><ul><li>dirname\uFF1A\u83B7\u53D6\u6587\u4EF6\u7684\u7236\u6587\u4EF6\u5939\uFF1B</li><li>basename\uFF1A\u83B7\u53D6\u6587\u4EF6\u540D\uFF1B</li><li>extname\uFF1A\u83B7\u53D6\u6587\u4EF6\u6269\u5C55\u540D\uFF1B</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// 1.\u83B7\u53D6\u8DEF\u5F84\u7684\u4FE1\u606F
const filepath = &#39;/User/why/abc.txt&#39;;

console.log(path.dirname(filepath));
console.log(path.basename(filepath));
console.log(path.extname(filepath));
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u8DEF\u5F84\u7684\u62FC\u63A5\uFF1A</p><ul><li>\u5982\u679C\u6211\u4EEC\u5E0C\u671B\u5C06\u591A\u4E2A\u8DEF\u5F84\u8FDB\u884C\u62FC\u63A5\uFF0C\u4F46\u662F\u4E0D\u540C\u7684\u64CD\u4F5C\u7CFB\u7EDF\u53EF\u80FD\u4F7F\u7528\u7684\u662F\u4E0D\u540C\u7684\u5206\u9694\u7B26\uFF1B\u8FD9\u4E2A\u65F6\u5019\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528path.join\u51FD\u6570\uFF1B</li></ul><p>\u5C06\u6587\u4EF6\u548C\u67D0\u4E2A\u6587\u4EF6\u5939\u62FC\u63A5\uFF1A</p><ul><li>\u5982\u679C\u6211\u4EEC\u5E0C\u671B\u5C06\u67D0\u4E2A\u6587\u4EF6\u548C\u6587\u4EF6\u5939\u62FC\u63A5\uFF0C\u53EF\u4EE5\u4F7F\u7528 path.resolve;</li><li>resolve\u51FD\u6570\u4F1A\u5224\u65AD\u6211\u4EEC\u62FC\u63A5\u7684\u8DEF\u5F84\u524D\u9762\u662F\u5426\u6709 /\u6216../\u6216./\uFF1B</li><li>\u5982\u679C\u6709\u8868\u793A\u662F\u4E00\u4E2A\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4F1A\u8FD4\u56DE\u5BF9\u5E94\u7684\u62FC\u63A5\u8DEF\u5F84\uFF1B</li><li>\u5982\u679C\u6CA1\u6709\uFF0C\u90A3\u4E48\u4F1A\u548C\u5F53\u524D\u6267\u884C\u6587\u4EF6\u6240\u5728\u7684\u6587\u4EF6\u5939\u8FDB\u884C\u8DEF\u5F84\u7684\u62FC\u63A5</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const path = require(&#39;path&#39;);

const basePath = &#39;/User/why&#39;;
const filename = &#39;abc.txt&#39;;

// const path = basePath + &quot;/&quot; + filename;

const filepath = path.resolve(basePath, filename);
console.log(filepath);  // C:\\User\\why\\abc.txt
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="\u5728webpack\u4E2D\u7684\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u5728webpack\u4E2D\u7684\u4F7F\u7528" aria-hidden="true">#</a> \u5728webpack\u4E2D\u7684\u4F7F\u7528</h3><p>\u5728webpack\u4E2D\u83B7\u53D6\u8DEF\u5F84\u6216\u8005\u8D77 \u522B\u540D\u7684\u5730\u65B9\u4E5F\u53EF\u4EE5\u4F7F\u7528</p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204141717534.png" alt="image-20220414171722469"></p><h2 id="\u5185\u7F6E\u6A21\u5757fs" tabindex="-1"><a class="header-anchor" href="#\u5185\u7F6E\u6A21\u5757fs" aria-hidden="true">#</a> \u5185\u7F6E\u6A21\u5757fs</h2><p>Node\u4E5F\u6709\u81EA\u5DF1\u7684\u6587\u4EF6\u7CFB\u7EDF\u64CD\u4F5C\u6A21\u5757\uFF0C\u5C31\u662Ffs\uFF1A</p><ul><li>\u501F\u52A9\u4E8ENode\u5E2E\u6211\u4EEC\u5C01\u88C5\u7684\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5728\u4EFB\u4F55\u7684\u64CD\u4F5C\u7CFB\u7EDF\uFF08window\u3001Mac OS\u3001Linux\uFF09\u4E0A\u9762\u76F4\u63A5\u53BB \u64CD\u4F5C\u6587\u4EF6\uFF1B</li><li>\u8FD9\u4E5F\u662FNode\u53EF\u4EE5\u5F00\u53D1\u670D\u52A1\u5668\u7684\u4E00\u5927\u539F\u56E0\uFF0C\u4E5F\u662F\u5B83\u53EF\u4EE5\u6210\u4E3A\u524D\u7AEF\u81EA\u52A8\u5316\u811A\u672C\u7B49\u70ED\u95E8\u5DE5\u5177\u7684\u539F\u56E0\uFF1B</li></ul><h3 id="fs\u7684api" tabindex="-1"><a class="header-anchor" href="#fs\u7684api" aria-hidden="true">#</a> fs\u7684API</h3><p>\u65B9\u5F0F\u4E00\uFF1A\u540C\u6B65\u64CD\u4F5C\u6587\u4EF6\uFF1A\u4EE3\u7801\u4F1A\u88AB\u963B\u585E\uFF0C\u4E0D\u4F1A\u7EE7\u7EED\u6267\u884C\uFF1B</p><p>\u65B9\u5F0F\u4E8C\uFF1A\u5F02\u6B65\u56DE\u8C03\u51FD\u6570\u64CD\u4F5C\u6587\u4EF6\uFF1A\u4EE3\u7801\u4E0D\u4F1A\u88AB\u963B\u585E\uFF0C\u9700\u8981\u4F20\u5165\u56DE\u8C03\u51FD\u6570\uFF0C\u5F53\u83B7\u53D6\u5230\u7ED3\u679C\u65F6\uFF0C\u56DE\u8C03\u51FD\u6570\u88AB\u6267\u884C\uFF1B</p><p>\u65B9\u5F0F\u4E09\uFF1A\u5F02\u6B65Promise\u64CD\u4F5C\u6587\u4EF6\uFF1A\u4EE3\u7801\u4E0D\u4F1A\u88AB\u963B\u585E\uFF0C\u901A\u8FC7 fs.promises \u8C03\u7528\u65B9\u6CD5\u64CD\u4F5C\uFF0C\u4F1A\u8FD4\u56DE\u4E00\u4E2APromise\uFF0C\u53EF\u4EE5\u901A\u8FC7then\u3001catch\u8FDB\u884C\u5904\u7406\uFF1B</p><p><strong>\u6848\u4F8B\uFF1A\u83B7\u53D6\u4E00\u4E2A\u6587\u4EF6\u7684\u72B6\u6001</strong></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const fs = require(&#39;fs&#39;);

// \u6848\u4F8B: \u8BFB\u53D6\u6587\u4EF6\u7684\u4FE1\u606F
const filepath = &quot;./abc.txt&quot;;

// 1.\u65B9\u5F0F\u4E00: \u540C\u6B65\u64CD\u4F5C
const info = fs.statSync(filepath);
console.log(&quot;\u540E\u7EED\u9700\u8981\u6267\u884C\u7684\u4EE3\u7801&quot;);
console.log(info);

// 2.\u65B9\u5F0F\u4E8C: \u5F02\u6B65\u64CD\u4F5C
fs.stat(filepath, (err, info) =&gt; {
  if (err) {
    console.log(err);
    return;
  }
  console.log(info);
  console.log(info.isFile());
  console.log(info.isDirectory());
});
console.log(&quot;\u540E\u7EED\u9700\u8981\u6267\u884C\u7684\u4EE3\u7801&quot;);

// 3.\u65B9\u5F0F\u4E09: Promise
fs.promises.stat(filepath).then(info =&gt; {
  console.log(info);
}).catch(err =&gt; {
  console.log(err);
});

console.log(&quot;\u540E\u7EED\u9700\u8981\u6267\u884C\u7684\u4EE3\u7801&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="\u6587\u4EF6\u63CF\u8FF0\u7B26" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u63CF\u8FF0\u7B26" aria-hidden="true">#</a> \u6587\u4EF6\u63CF\u8FF0\u7B26</h3><p><strong>\u6587\u4EF6\u63CF\u8FF0\u7B26\uFF08File descriptors\uFF09\u662F\u4EC0\u4E48\u5462\uFF1F</strong></p><ul><li>\u5728 POSIX \u7CFB\u7EDF\u4E0A\uFF0C\u5BF9\u4E8E\u6BCF\u4E2A\u8FDB\u7A0B\uFF0C\u5185\u6838\u90FD\u7EF4\u62A4\u7740\u4E00\u5F20\u5F53\u524D\u6253\u5F00\u7740\u7684\u6587\u4EF6\u548C\u8D44\u6E90\u7684\u8868\u683C\u3002</li><li>\u6BCF\u4E2A\u6253\u5F00\u7684\u6587\u4EF6\u90FD\u5206\u914D\u4E86\u4E00\u4E2A\u79F0\u4E3A\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684\u7B80\u5355\u7684\u6570\u5B57\u6807\u8BC6\u7B26\u3002</li><li>\u5728\u7CFB\u7EDF\u5C42\uFF0C\u6240\u6709\u6587\u4EF6\u7CFB\u7EDF\u64CD\u4F5C\u90FD\u4F7F\u7528\u8FD9\u4E9B\u6587\u4EF6\u63CF\u8FF0\u7B26\u6765\u6807\u8BC6\u548C\u8DDF\u8E2A\u6BCF\u4E2A\u7279\u5B9A\u7684\u6587\u4EF6\u3002</li><li>Windows \u7CFB\u7EDF\u4F7F\u7528\u4E86\u4E00\u4E2A\u867D\u7136\u4E0D\u540C\u4F46\u6982\u5FF5\u4E0A\u7C7B\u4F3C\u7684\u673A\u5236\u6765\u8DDF\u8E2A\u8D44\u6E90\u3002</li></ul><p>\u4E3A\u4E86\u7B80\u5316\u7528\u6237\u7684\u5DE5\u4F5C\uFF0CNode.js \u62BD\u8C61\u51FA\u64CD\u4F5C\u7CFB\u7EDF\u4E4B\u95F4\u7684\u7279\u5B9A\u5DEE\u5F02\uFF0C\u5E76\u4E3A\u6240\u6709\u6253\u5F00\u7684\u6587\u4EF6\u5206\u914D\u4E00\u4E2A\u6570\u5B57\u578B\u7684\u6587\u4EF6\u63CF\u8FF0 \u7B26\u3002</p><p>fs.open() \u65B9\u6CD5\u7528\u4E8E\u5206\u914D\u65B0\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26\u3002\u4E00\u65E6\u88AB\u5206\u914D\uFF0C\u5219\u6587\u4EF6\u63CF\u8FF0\u7B26\u53EF\u7528\u4E8E\u4ECE\u6587\u4EF6\u8BFB\u53D6\u6570 \u636E\u3001\u5411\u6587\u4EF6\u5199\u5165\u6570\u636E\u3001\u6216\u8BF7\u6C42\u5173\u4E8E\u6587\u4EF6\u7684\u4FE1\u606F\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const fs = require(&#39;fs&#39;);

fs.open(&quot;./abc.txt&quot;, (err, fd) =&gt; {
  if (err) {
    console.log(err);
    return;
  }

  // \u901A\u8FC7\u63CF\u8FF0\u7B26\u53BB\u83B7\u53D6\u6587\u4EF6\u7684\u4FE1\u606F
  fs.fstat(fd, (err, info) =&gt; {
    console.log(info);
  })
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="\u6587\u4EF6\u7684\u8BFB\u5199" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u7684\u8BFB\u5199" aria-hidden="true">#</a> \u6587\u4EF6\u7684\u8BFB\u5199</h3><p>\u5982\u679C\u6211\u4EEC\u5E0C\u671B\u5BF9\u6587\u4EF6\u7684\u5185\u5BB9\u8FDB\u884C\u64CD\u4F5C\uFF0C\u8FD9\u4E2A\u65F6\u5019\u53EF\u4EE5\u4F7F\u7528\u6587\u4EF6\u7684\u8BFB\u5199\uFF1A</p><ul><li>fs.readFile(path[, options], callback)\uFF1A\u8BFB\u53D6\u6587\u4EF6\u7684\u5185\u5BB9\uFF1B</li><li>fs.writeFile(file, data[, options], callback)\uFF1A\u5728\u6587\u4EF6\u4E2D\u5199\u5165\u5185\u5BB9\uFF1B</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// 1.\u6587\u4EF6\u5199\u5165
const content = &quot;\u4F60\u597D\u554A,\u674E\u94F6\u6CB3&quot;;

fs.writeFile(&#39;./abc.txt&#39;, content, {flag: &quot;a&quot;}, err =&gt; {
  console.log(err);
});

// 2.\u6587\u4EF6\u8BFB\u53D6
fs.readFile(&quot;./abc.txt&quot;, {encoding: &#39;utf-8&#39;}, (err, data) =&gt; {
  console.log(data);
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="flag\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#flag\u9009\u9879" aria-hidden="true">#</a> flag\u9009\u9879</h4><ul><li>w \u6253\u5F00\u6587\u4EF6\u5199\u5165\uFF0C\u9ED8\u8BA4\u503C\uFF1B</li><li>w+\u6253\u5F00\u6587\u4EF6\u8FDB\u884C\u8BFB\u5199\uFF0C\u5982\u679C\u4E0D\u5B58\u5728\u5219\u521B\u5EFA\u6587\u4EF6\uFF1B</li><li>r+ \u6253\u5F00\u6587\u4EF6\u8FDB\u884C\u8BFB\u5199\uFF0C\u5982\u679C\u4E0D\u5B58\u5728\u90A3\u4E48\u629B\u51FA\u5F02\u5E38\uFF1B</li><li>r\u6253\u5F00\u6587\u4EF6\u8BFB\u53D6\uFF0C\u8BFB\u53D6\u65F6\u7684\u9ED8\u8BA4\u503C\uFF1B</li><li>a\u6253\u5F00\u8981\u5199\u5165\u7684\u6587\u4EF6\uFF0C\u5C06\u6D41\u653E\u5728\u6587\u4EF6\u672B\u5C3E\u3002\u5982\u679C\u4E0D\u5B58\u5728\u5219\u521B\u5EFA\u6587\u4EF6\uFF1B</li><li>a+\u6253\u5F00\u6587\u4EF6\u4EE5\u8FDB\u884C\u8BFB\u5199\uFF0C\u5C06\u6D41\u653E\u5728\u6587\u4EF6\u672B\u5C3E\u3002\u5982\u679C\u4E0D\u5B58\u5728\u5219\u521B\u5EFA\u6587\u4EF6</li></ul><h4 id="encoding\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#encoding\u9009\u9879" aria-hidden="true">#</a> encoding\u9009\u9879</h4><p>\u76EE\u524D\u57FA\u672C\u7528\u7684\u90FD\u662FUTF-8\u7F16\u7801\uFF1B\u5982\u679C\u4E0D\u586B\u5199encoding\uFF0C\u8FD4\u56DE\u7684\u7ED3\u679C\u662FBuffer\uFF1B</p><h3 id="\u6587\u4EF6\u5939\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u5939\u64CD\u4F5C" aria-hidden="true">#</a> \u6587\u4EF6\u5939\u64CD\u4F5C</h3><p>\u65B0\u5EFA\u4E00\u4E2A\u6587\u4EF6\u5939: \u4F7F\u7528fs.mkdir()\u6216fs.mkdirSync()\u521B\u5EFA\u4E00\u4E2A\u65B0\u6587\u4EF6\u5939\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const fs = require(&#39;fs&#39;);
const path = require(&#39;path&#39;);

// 1.\u521B\u5EFA\u6587\u4EF6\u5939
const dirname = &#39;./why&#39;;
if (!fs.existsSync(dirname)) {
  fs.mkdir(dirname, err =&gt; {
    console.log(err);
  });
}

// 2.\u8BFB\u53D6\u6587\u4EF6\u5939\u4E2D\u7684\u6240\u6709\u6587\u4EF6
fs.readdir(dirname, (err, files) =&gt; {
  console.log(files);
});

function getFiles(dirname) {
  fs.readdir(dirname, { withFileTypes: true }, (err, files) =&gt; {
    for (let file of files) {
      // fs.stat(file) \u53EF\u4EE5, \u4F46\u662F\u6709\u70B9\u9EBB\u70E6
      if (file.isDirectory()) {
        const filepath = path.resolve(dirname, file.name);
        getFiles(filepath);
      } else {
        console.log(file.name);
      }
    }
  });
}

getFiles(dirname);

// 3.\u91CD\u547D\u540D
fs.rename(&quot;./why&quot;, &quot;./kobe&quot;, err =&gt; {
  console.log(err);
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h2 id="events\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#events\u6A21\u5757" aria-hidden="true">#</a> events\u6A21\u5757</h2><p>Node\u4E2D\u7684\u6838\u5FC3API\u90FD\u662F\u57FA\u4E8E\u5F02\u6B65\u4E8B\u4EF6\u9A71\u52A8\u7684\uFF1A</p><ul><li>\u5728\u8FD9\u4E2A\u4F53\u7CFB\u4E2D\uFF0C\u67D0\u4E9B\u5BF9\u8C61\uFF08\u53D1\u5C04\u5668\uFF08Emitters\uFF09\uFF09\u53D1\u51FA\u67D0\u4E00\u4E2A\u4E8B\u4EF6\uFF1B</li><li>\u6211\u4EEC\u53EF\u4EE5\u76D1\u542C\u8FD9\u4E2A\u4E8B\u4EF6\uFF08\u76D1\u542C\u5668 Listeners\uFF09\uFF0C\u5E76\u4E14\u4F20\u5165\u7684\u56DE\u8C03\u51FD\u6570\uFF0C\u8FD9\u4E2A\u56DE\u8C03\u51FD\u6570\u4F1A\u5728\u76D1\u542C\u5230\u4E8B\u4EF6\u65F6\u8C03\u7528\uFF1B</li></ul><p><strong>\u53D1\u51FA\u4E8B\u4EF6\u548C\u76D1\u542C\u4E8B\u4EF6\u90FD\u662F\u901A\u8FC7EventEmitter\u7C7B</strong>\u6765\u5B8C\u6210\u7684\uFF0C\u5B83\u4EEC\u90FD\u5C5E \u4E8Eevents\u5BF9\u8C61\u3002</p><ul><li>emitter.on(eventName, listener)\uFF1A\u76D1\u542C\u4E8B\u4EF6\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528addListener\uFF1B</li><li>emitter.off(eventName, listener)\uFF1A\u79FB\u9664\u4E8B\u4EF6\u76D1\u542C\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528removeListener\uFF1B</li><li>emitter.emit(eventName[, ...args])\uFF1A\u53D1\u51FA\u4E8B\u4EF6\uFF0C\u53EF\u4EE5\u643A\u5E26\u4E00\u4E9B\u53C2\u6570\uFF1B</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const EventEmitter = require(&quot;events&quot;);

// 1.\u521B\u5EFA\u53D1\u5C04\u5668
const emitter = new EventEmitter();

// 2.\u76D1\u542C\u67D0\u4E00\u4E2A\u4E8B\u4EF6
// addListener\u662Fon\u7684alias\u7B80\u5199
emitter.on(&#39;click&#39;, (args) =&gt; {
  console.log(&quot;\u76D1\u542C1\u5230click\u4E8B\u4EF6&quot;, args);
})

const listener2 = (args) =&gt; {
  console.log(&quot;\u76D1\u542C2\u5230click\u4E8B\u4EF6&quot;, args);
}
emitter.on(&#39;click&#39;, listener2)

// 3.\u53D1\u51FA\u4E00\u4E2A\u4E8B\u4EF6
setTimeout(() =&gt; {
  emitter.emit(&quot;click&quot;, &quot;coderwhy&quot;, &quot;james&quot;, &quot;kobe&quot;);
  emitter.off(&quot;click&quot;, listener2);
  emitter.emit(&quot;click&quot;, &quot;coderwhy&quot;, &quot;james&quot;, &quot;kobe&quot;);
}, 2000);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><strong>\u83B7\u53D6\u4FE1\u606F</strong></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const EventEmitter = require(&#39;events&#39;);

// 1.\u521B\u5EFA\u53D1\u5C04\u5668
const emitter = new EventEmitter();

// 2.\u76D1\u542C\u67D0\u4E00\u4E2A\u4E8B\u4EF6
// addListener\u662Fon\u7684alias\u7B80\u5199
emitter.on(&#39;click&#39;, (args) =&gt; {
  console.log(&quot;\u76D1\u542C1\u5230click\u4E8B\u4EF6&quot;, args);
})

const listener2 = (args) =&gt; {
  console.log(&quot;\u76D1\u542C2\u5230click\u4E8B\u4EF6&quot;, args);
}
emitter.on(&#39;click&#39;, listener2)

emitter.on(&quot;tap&quot;, (args) =&gt; {
  console.log(args);
})

// 3.\u83B7\u53D6\u6CE8\u518C\u7684\u4E8B\u4EF6
console.log(emitter.eventNames());
console.log(emitter.listenerCount(&quot;click&quot;));
console.log(emitter.listeners(&quot;click&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="\u5E38\u89C1\u7684\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u5E38\u89C1\u7684\u5C5E\u6027" aria-hidden="true">#</a> \u5E38\u89C1\u7684\u5C5E\u6027</h3><p>EventEmitter\u7684\u5B9E\u4F8B\u6709\u4E00\u4E9B\u5C5E\u6027\uFF0C\u53EF\u4EE5\u8BB0\u5F55\u4E00\u4E9B\u4FE1\u606F\uFF1A</p><ul><li>emitter.eventNames()\uFF1A\u8FD4\u56DE\u5F53\u524D EventEmitter\u5BF9\u8C61\u6CE8\u518C\u7684\u4E8B\u4EF6\u5B57\u7B26\u4E32\u6570\u7EC4\uFF1B</li><li>emitter.getMaxListeners()\uFF1A\u8FD4\u56DE\u5F53\u524D EventEmitter\u5BF9\u8C61\u7684\u6700\u5927\u76D1\u542C\u5668\u6570\u91CF\uFF0C\u53EF\u4EE5\u901A\u8FC7setMaxListeners()\u6765\u4FEE\u6539\uFF0C\u9ED8\u8BA4\u662F10\uFF1B</li><li>emitter.listenerCount(\u4E8B\u4EF6\u540D\u79F0)\uFF1A\u8FD4\u56DE\u5F53\u524D EventEmitter\u5BF9\u8C61\u67D0\u4E00\u4E2A\u4E8B\u4EF6\u540D\u79F0\uFF0C\u76D1\u542C\u5668\u7684\u4E2A\u6570\uFF1B</li><li>emitter.listeners(\u4E8B\u4EF6\u540D\u79F0)\uFF1A\u8FD4\u56DE\u5F53\u524D EventEmitter\u5BF9\u8C61\u67D0\u4E2A\u4E8B\u4EF6\u76D1\u542C\u5668\u4E0A\u6240\u6709\u7684\u76D1\u542C\u5668\u6570\u7EC4\uFF1B</li></ul><h3 id="\u65B9\u6CD5\u7684\u8865\u5145" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6CD5\u7684\u8865\u5145" aria-hidden="true">#</a> \u65B9\u6CD5\u7684\u8865\u5145</h3><ul><li>emitter.once(eventName, listener)\uFF1A\u4E8B\u4EF6\u76D1\u542C\u4E00\u6B21</li><li>emitter.prependListener()\uFF1A\u5C06\u76D1\u542C\u4E8B\u4EF6\u6DFB\u52A0\u5230\u6700\u524D\u9762</li><li>emitter.prependOnceListener()\uFF1A\u5C06\u76D1\u542C\u4E8B\u4EF6\u6DFB\u52A0\u5230\u6700\u524D\u9762\uFF0C\u4F46\u662F\u53EA\u76D1\u542C\u4E00\u6B21</li><li>emitter.removeAllListeners([eventName])\uFF1A\u79FB\u9664\u6240\u6709\u7684\u76D1\u542C\u5668</li></ul>`,56);function r(l,i){return a}var c=n(e,[["render",r],["__file","04.html.vue"]]);export{c as default};
