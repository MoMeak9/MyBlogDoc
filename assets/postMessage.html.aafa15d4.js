import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.28325d67.js";const a={},e=s(`<h2 id="\u901A\u4FE1\u6D88\u606F\u683C\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u901A\u4FE1\u6D88\u606F\u683C\u5F0F" aria-hidden="true">#</a> \u901A\u4FE1\u6D88\u606F\u683C\u5F0F</h2><p>\u5206\u4EAB</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>let postData = {
    command: &#39;share&#39;,   //\u8868\u540D\u610F\u56FE
    payload: {  //\u76F8\u5173\u53C2\u6570
        title: this.pageTitle || this.pageTitleMain, //\u6807\u9898
        key: \`share\${this.pageKeyWord}\`, //key
        description,  //\u63CF\u8FF0
        url, // \u5206\u4EAB\u94FE\u63A5
        accountId: this.accountId, //\u624B\u673A\u53F7
        thumbImage:
            this.picUrl ||
            (this.pageImg.indexOf(&#39;https://&#39;) != -1 &amp;&amp; this.pageImg) ||
            &#39;&#39;,  //\u5206\u4EAB\u5C01\u9762
        mId,  //\u5206\u4EAB\u7D20\u6750id -\u53EF\u4E3A\u7A7A
        params: {
            mId,  //\u7D20\u6750id
            description, //\u7D20\u6750\u63CF\u8FF0
        },

    },
};
window.postMessage(JSON.stringify(postData));
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="\u4E0B\u8F7D\u56FE\u7247" tabindex="-1"><a class="header-anchor" href="#\u4E0B\u8F7D\u56FE\u7247" aria-hidden="true">#</a> \u4E0B\u8F7D\u56FE\u7247</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>  const data = {
    command: &#39;downloadImg&#39;, //\u5FC5\u987B
    payload: {
      title: &#39;\u5DE5\u7A0B\u5546\u8D44\u8D28\u8BA4\u8BC1\u8BC1\u4E66&#39;,
      key: &#39;imgDown&#39;,
      description: &#39;\u5DE5\u7A0B\u5546\u8D44\u8D28\u8BA4\u8BC1\u8BC1\u4E66&#39;, //\u63CF\u8FF0
      url: imgUrl, //\u56FE\u7247\u5730\u5740 https
      params: {
        fileName: &#39;story&#39;, //\u6587\u4EF6\u540D
        endFileType: &#39;.png&#39;, //\u5FC5\u987B \u6587\u4EF6\u540E\u7F00
      },
     
    },
  };
  window.postMessage(JSON.stringify(data));
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="\u56FE\u7247\u5927\u56FE\u67E5\u770B" tabindex="-1"><a class="header-anchor" href="#\u56FE\u7247\u5927\u56FE\u67E5\u770B" aria-hidden="true">#</a> \u56FE\u7247\u5927\u56FE\u67E5\u770B</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>let postData = {
    command: &#39;showImgApp&#39;,
    payload: {
        url, //\u53EF\u4E3A\u7A7A
        title, //\u6807\u9898
        imgUrlArray,  //\u5FC5\u987B\uFF0C\u56FE\u7247\u94FE\u63A5
        mId //\u53EF\u4E3A\u7A7A
    },
}
window.postMessage(JSON.stringify(data));
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,7);function r(p,l){return e}var c=n(a,[["render",r],["__file","postMessage.html.vue"]]);export{c as default};
