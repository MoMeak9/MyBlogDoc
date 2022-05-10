import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.28325d67.js";const e={},a=s(`<h1 id="node-\u7B14\u8BB0-9-http\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#node-\u7B14\u8BB0-9-http\u6A21\u5757" aria-hidden="true">#</a> Node \u7B14\u8BB0\uFF089\uFF09Http\u6A21\u5757</h1><p>\u6BD4\u8F83\u7B80\u5355\uFF0C\u76F4\u63A5\u4E0A\u4EE3\u7801\u5427~</p><h2 id="\u670D\u52A1\u521B\u5EFA" tabindex="-1"><a class="header-anchor" href="#\u670D\u52A1\u521B\u5EFA" aria-hidden="true">#</a> \u670D\u52A1\u521B\u5EFA</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const http = require(&#39;http&#39;);

// \u521B\u5EFA\u4E00\u4E2Aweb\u670D\u52A1\u5668
const server = http.createServer((req, res) =&gt; {
  res.end(&quot;Hello Server&quot;);
});

// \u542F\u52A8\u670D\u52A1\u5668,\u5E76\u4E14\u5236\u5B9A\u7AEF\u53E3\u53F7\u548C\u4E3B\u673A
server.listen(8888, &#39;0.0.0.0&#39;, () =&gt; {
  console.log(&quot;\u670D\u52A1\u5668\u542F\u52A8\u6210\u529F~&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u65B9\u5F0F\u4E8C
const server2 = new http.Server((req, res) =&gt; {
  res.end(&quot;Server2&quot;);
});

server2.listen(8001, () =&gt; {
  console.log(&quot;server2\u542F\u52A8\u6210\u529F~&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="\u83B7\u53D6\u8BF7\u6C42\u4FE1\u606F-request" tabindex="-1"><a class="header-anchor" href="#\u83B7\u53D6\u8BF7\u6C42\u4FE1\u606F-request" aria-hidden="true">#</a> \u83B7\u53D6\u8BF7\u6C42\u4FE1\u606F request</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const http = require(&#39;http&#39;);

// \u521B\u5EFA\u4E00\u4E2Aweb\u670D\u52A1\u5668
const server = http.createServer((req, res) =&gt; {
  // request\u5BF9\u8C61\u4E2D\u5C01\u88C5\u4E86\u5BA2\u6237\u7AEF\u7ED9\u6211\u4EEC\u670D\u52A1\u5668\u4F20\u9012\u8FC7\u6765\u7684\u6240\u6709\u4FE1\u606F
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);

  res.end(&quot;Hello Server&quot;);
});

// \u542F\u52A8\u670D\u52A1\u5668,\u5E76\u4E14\u5236\u5B9A\u7AEF\u53E3\u53F7\u548C\u4E3B\u673A
server.listen(8888, &#39;0.0.0.0&#39;, () =&gt; {
  console.log(&quot;\u670D\u52A1\u5668\u542F\u52A8\u6210\u529F~&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="\u54CD\u5E94\u4FE1\u606F-response" tabindex="-1"><a class="header-anchor" href="#\u54CD\u5E94\u4FE1\u606F-response" aria-hidden="true">#</a> \u54CD\u5E94\u4FE1\u606F response</h2><h3 id="\u54CD\u5E94\u7ED3\u679C" tabindex="-1"><a class="header-anchor" href="#\u54CD\u5E94\u7ED3\u679C" aria-hidden="true">#</a> \u54CD\u5E94\u7ED3\u679C</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const http = require(&#39;http&#39;);

// \u521B\u5EFA\u4E00\u4E2Aweb\u670D\u52A1\u5668
const server = http.createServer((req, res) =&gt; {

  // \u54CD\u5E94\u7ED3\u679C
  res.write(&quot;\u54CD\u5E94\u7ED3\u679C\u4E00&quot;);
  res.end(&quot;Hello World&quot;);
});

// \u542F\u52A8\u670D\u52A1\u5668,\u5E76\u4E14\u5236\u5B9A\u7AEF\u53E3\u53F7\u548C\u4E3B\u673A
server.listen(8888, &#39;0.0.0.0&#39;, () =&gt; {
  console.log(&quot;\u670D\u52A1\u5668\u542F\u52A8\u6210\u529F~&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="\u8BBE\u7F6E\u72B6\u6001\u7801" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u72B6\u6001\u7801" aria-hidden="true">#</a> \u8BBE\u7F6E\u72B6\u6001\u7801</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const http = require(&#39;http&#39;);

// \u521B\u5EFA\u4E00\u4E2Aweb\u670D\u52A1\u5668
const server = http.createServer((req, res) =&gt; {

  // \u8BBE\u7F6E\u72B6\u6001\u7801
  // \u65B9\u5F0F\u4E00: \u76F4\u63A5\u7ED9\u5C5E\u6027\u8D4B\u503C
  res.statusCode = 400;
  // \u65B9\u5F0F\u4E8C: \u548CHead\u4E00\u8D77\u8BBE\u7F6E
  res.writeHead(503)

  // \u54CD\u5E94\u7ED3\u679C
  res.write(&quot;\u54CD\u5E94\u7ED3\u679C\u4E00&quot;);
  res.end(&quot;Hello World&quot;);
});

// \u542F\u52A8\u670D\u52A1\u5668,\u5E76\u4E14\u5236\u5B9A\u7AEF\u53E3\u53F7\u548C\u4E3B\u673A
server.listen(8888, &#39;0.0.0.0&#39;, () =&gt; {
  console.log(&quot;\u670D\u52A1\u5668\u542F\u52A8\u6210\u529F~&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="\u8BBE\u7F6E\u54CD\u5E94\u5934" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u54CD\u5E94\u5934" aria-hidden="true">#</a> \u8BBE\u7F6E\u54CD\u5E94\u5934</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const http = require(&#39;http&#39;);

// \u521B\u5EFA\u4E00\u4E2Aweb\u670D\u52A1\u5668
const server = http.createServer((req, res) =&gt; {

  // \u8BBE\u7F6E\u54CD\u5E94\u7684header
  // \u8BBE\u7F6E\u65B9\u5F0F\u4E00:
  res.setHeader(&quot;Content-Type&quot;, &quot;text/plain;charset=utf8&quot;);
  // \u65B9\u5F0F\u4E8C
  res.writeHead(200, {
    &quot;Content-Type&quot;: &quot;text/html;charset=utf8&quot;
  });

  // \u54CD\u5E94\u7ED3\u679C
  res.end(&quot;&lt;h2&gt;Hello Server&lt;/h2&gt;&quot;);
});

// \u542F\u52A8\u670D\u52A1\u5668,\u5E76\u4E14\u5236\u5B9A\u7AEF\u53E3\u53F7\u548C\u4E3B\u673A
server.listen(8888, &#39;0.0.0.0&#39;, () =&gt; {
  console.log(&quot;\u670D\u52A1\u5668\u542F\u52A8\u6210\u529F~&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="\u53D1\u9001\u7F51\u7EDC\u8BF7\u6C42" tabindex="-1"><a class="header-anchor" href="#\u53D1\u9001\u7F51\u7EDC\u8BF7\u6C42" aria-hidden="true">#</a> \u53D1\u9001\u7F51\u7EDC\u8BF7\u6C42</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// http\u53D1\u9001post\u8BF7\u6C42
const req = http.request({
  method: &#39;POST&#39;,
  hostname: &#39;localhost&#39;,
  port: 8888
}, (res) =&gt; {
  res.on(&#39;data&#39;, (data) =&gt; {
    console.log(data.toString());
  });

  res.on(&#39;end&#39;, () =&gt; {
    console.log(&quot;\u83B7\u53D6\u5230\u4E86\u6240\u6709\u7684\u7ED3\u679C&quot;);
  })
});

req.end();
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="\u6587\u4EF6\u4E0A\u4F20\u6848\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u4E0A\u4F20\u6848\u4F8B" aria-hidden="true">#</a> \u6587\u4EF6\u4E0A\u4F20\u6848\u4F8B</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const http = require(&#39;http&#39;);
const fs = require(&#39;fs&#39;);
const qs = require(&#39;querystring&#39;);

const server = http.createServer((req, res) =&gt; {
  if (req.url === &#39;/upload&#39;) {
    if (req.method === &#39;POST&#39;) {
      req.setEncoding(&#39;binary&#39;);

      let body = &#39;&#39;;
      const totalBoundary = req.headers[&#39;content-type&#39;].split(&#39;;&#39;)[1];
      const boundary = totalBoundary.split(&#39;=&#39;)[1];

      req.on(&#39;data&#39;, (data) =&gt; {
        body += data;
      });

      req.on(&#39;end&#39;, () =&gt; {
        console.log(body);
        // \u5904\u7406body
        // 1.\u83B7\u53D6image/png\u7684\u4F4D\u7F6E
        const payload = qs.parse(body, &quot;\\r\\n&quot;, &quot;: &quot;);
        const type = payload[&quot;Content-Type&quot;];

        // 2.\u5F00\u59CB\u5728image/png\u7684\u4F4D\u7F6E\u8FDB\u884C\u622A\u53D6
        const typeIndex = body.indexOf(type);
        const typeLength = type.length;
        let imageData = body.substring(typeIndex + typeLength);

        // 3.\u5C06\u4E2D\u95F4\u7684\u4E24\u4E2A\u7A7A\u683C\u53BB\u6389
        imageData = imageData.replace(/^\\s\\s*/, &#39;&#39;);

        // 4.\u5C06\u6700\u540E\u7684boundary\u53BB\u6389
        imageData = imageData.substring(0, imageData.indexOf(\`--\${boundary}--\`));

        fs.writeFile(&#39;./foo.png&#39;, imageData, &#39;binary&#39;, (err) =&gt; {
          res.end(&quot;\u6587\u4EF6\u4E0A\u4F20\u6210\u529F~&quot;);
        })
      })
    }
  }
});

server.listen(8000, () =&gt; {
  console.log(&quot;\u6587\u4EF6\u4E0A\u4F20\u670D\u52A1\u5668\u5F00\u542F\u6210\u529F~&quot;);
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div>`,18);function r(l,p){return a}var t=n(e,[["render",r],["__file","09.html.vue"]]);export{t as default};
