import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{d as s}from"./app.9da39742.js";const a={},e=s(`<blockquote><p>\u4F5C\u8005\uFF1ASimonMa \u94FE\u63A5\uFF1Ahttps://juejin.cn/post/6844903520441729037</p></blockquote><h1 id="less-\u77E5\u8BC6\u70B9\u6C47\u603B" tabindex="-1"><a class="header-anchor" href="#less-\u77E5\u8BC6\u70B9\u6C47\u603B" aria-hidden="true">#</a> Less \u77E5\u8BC6\u70B9\u6C47\u603B</h1><h2 id="\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#\u53D8\u91CF" aria-hidden="true">#</a> \u53D8\u91CF</h2><p><strong>\u503C\u53D8\u91CF</strong></p><div class="language-CSS ext-CSS line-numbers-mode"><pre class="language-CSS"><code>/* Less */
@color: #999;
@bgColor: skyblue;//\u4E0D\u8981\u6DFB\u52A0\u5F15\u53F7
@width: 50%;
#wrap {
  color: @color;
  background: @bgColor;
  width: @width;
}

/* \u751F\u6210\u540E\u7684 CSS */
#wrap {
  color: #999;
  background: skyblue;
  width: 50%;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>\u4EE5 <code>@</code> \u5F00\u5934 \u5B9A\u4E49\u53D8\u91CF\uFF0C\u5E76\u4E14\u4F7F\u7528\u65F6 \u76F4\u63A5 \u952E\u5165 <code>@</code>\u540D\u79F0\u3002</p><p>\u5728\u5E73\u65F6\u5DE5\u4F5C\u4E2D\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u628A \u5E38\u7528\u7684\u53D8\u91CF \u5C01\u88C5\u5230\u4E00\u4E2A\u6587\u4EF6\u4E2D\uFF0C\u8FD9\u6837\u5229\u4E8E\u4EE3\u7801\u7EC4\u7EC7\u7EF4\u62A4\u3002</p><div class="language-CSS ext-CSS line-numbers-mode"><pre class="language-CSS"><code>@lightPrimaryColor: #c5cae9;
@textPrimaryColor: #fff;
@accentColor: rgb(99, 137, 185);
@primaryTextColor: #646464;
@secondaryTextColor: #000;
@dividerColor: #b6b6b6;
@borderColor: #dadada;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>\u9009\u62E9\u5668\u53D8\u91CF</strong></p><p>\u8BA9 \u9009\u62E9\u5668 \u53D8\u6210 \u52A8\u6001</p><div class="language-CSS ext-CSS line-numbers-mode"><pre class="language-CSS"><code>/* Less */
@mySelector: #wrap;
@Wrap: wrap;
@{mySelector}{ //\u53D8\u91CF\u540D \u5FC5\u987B\u4F7F\u7528\u5927\u62EC\u53F7\u5305\u88F9
  color: #999;
  width: 50%;
}
.@{Wrap}{
  color:#ccc;
}
#@{Wrap}{
  color:#666;
}

/* \u751F\u6210\u7684 CSS */
#wrap{
  color: #999;
  width: 50%;
}
.wrap{
  color:#ccc;
}
#wrap{
  color:#666;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p><strong>\u5C5E\u6027\u53D8\u91CF</strong></p><p>\u53EF\u51CF\u5C11\u4EE3\u7801\u4E66\u5199\u91CF</p><div class="language-CSS ext-CSS line-numbers-mode"><pre class="language-CSS"><code>/* Less */
@borderStyle: border-style;
@Soild:solid;
#wrap{
  @{borderStyle}: @Soild;//\u53D8\u91CF\u540D \u5FC5\u987B\u4F7F\u7528\u5927\u62EC\u53F7\u5305\u88F9
}

/* \u751F\u6210\u7684 CSS */
#wrap{
  border-style:solid;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>url \u53D8\u91CF</strong></p><p>\u9879\u76EE\u7ED3\u6784\u6539\u53D8\u65F6\uFF0C\u4FEE\u6539\u5176\u53D8\u91CF\u5373\u53EF\u3002</p><div class="language-CSS ext-CSS line-numbers-mode"><pre class="language-CSS"><code>/* Less */
@images: &quot;../img&quot;;//\u9700\u8981\u52A0\u5F15\u53F7
body {
  background: url(&quot;@{images}/dog.png&quot;);//\u53D8\u91CF\u540D \u5FC5\u987B\u4F7F\u7528\u5927\u62EC\u53F7\u5305\u88F9
}

/* \u751F\u6210\u7684 CSS */
body {
  background: url(&quot;../img/dog.png&quot;);
}

\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>\u58F0\u660E\u53D8\u91CF</strong></p><p>\u6709\u70B9\u7C7B\u4F3C\u4E8E \u4E0B\u9762\u7684 \u6DF7\u5408\u65B9\u6CD5</p><ul><li>\u7ED3\u6784: @name: { \u5C5E\u6027: \u503C ;};</li><li>\u4F7F\u7528\uFF1A@name();</li></ul><div class="language-CSS ext-CSS line-numbers-mode"><pre class="language-CSS"><code>/* Less */
@background: {background:red;};
#main{
    @background();
}
@Rules:{
    width: 200px;
    height: 200px;
    border: solid 1px red;
};
#con{
  @Rules();
}

/* \u751F\u6210\u7684 CSS */
#main{
  background:red;
}
#con{
  width: 200px;
  height: 200px;
  border: solid 1px red;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p><strong>\u53D8\u91CF\u8FD0\u7B97</strong></p><p>\u4E0D\u5F97\u4E0D\u63D0\u7684\u662F\uFF0CLess \u7684\u53D8\u91CF\u8FD0\u7B97\u5B8C\u5168\u8D85\u51FA\u6211\u7684\u671F\u671B\uFF0C\u5341\u5206\u5F3A\u5927\u3002</p><ul><li>\u52A0\u51CF\u6CD5\u65F6 \u4EE5\u7B2C\u4E00\u4E2A\u6570\u636E\u7684\u5355\u4F4D\u4E3A\u57FA\u51C6</li><li>\u4E58\u9664\u6CD5\u65F6 \u6CE8\u610F\u5355\u4F4D\u4E00\u5B9A\u8981\u7EDF\u4E00</li></ul><div class="language-CSS ext-CSS line-numbers-mode"><pre class="language-CSS"><code>/* Less */
@width:300px;
@color:#222;
#wrap{
  width:@width-20;
  height:@width-20*5;
  margin:(@width-20)*5;
  color:@color*2;
  background-color:@color + #111;
}

/* \u751F\u6210\u7684 CSS */
#wrap{
  width:280px;
  height:200px;
  margin:1400px;
  color:#444;
  background-color:#333;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>\u53D8\u91CF\u4F5C\u7528\u57DF</strong></p><p>\u4E00\u53E5\u8BDD\u7406\u89E3\u5C31\u662F\uFF1A<strong>\u5C31\u8FD1\u539F\u5219</strong>\uFF0C\u4E0D\u8981\u8DDF\u6211\u63D0\u95ED\u5305\u3002</p><p><em>\u501F\u52A9\u5B98\u7F51\u7684Demo</em></p><div class="language-CSS ext-CSS line-numbers-mode"><pre class="language-CSS"><code>/* Less */
@var: @a;
@a: 100%;
#wrap {
  width: @var;
  @a: 9%;
}

/* \u751F\u6210\u7684 CSS */
#wrap {
  width: 9%;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>\u7528\u53D8\u91CF\u53BB\u5B9A\u4E49\u53D8\u91CF</strong></p><div class="language-CSS ext-CSS line-numbers-mode"><pre class="language-CSS"><code>/* Less */
@fnord:  &quot;I am fnord.&quot;;
@var:    &quot;fnord&quot;;
#wrap::after{
  content: @@var; //\u5C06@var\u66FF\u6362\u4E3A\u5176\u503C content:@fnord;
}
/* \u751F\u6210\u7684 CSS */
#wrap::after{
  content: &quot;I am fnord.&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="\u5D4C\u5957" tabindex="-1"><a class="header-anchor" href="#\u5D4C\u5957" aria-hidden="true">#</a> \u5D4C\u5957</h2><p><strong>&amp; \u7684\u5999\u7528</strong></p><p>&amp; \uFF1A\u4EE3\u8868\u7684\u4E0A\u4E00\u5C42\u9009\u62E9\u5668\u7684\u540D\u5B57\uFF0C\u6B64\u4F8B\u4FBF\u662F<code>header</code>\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
#header{
  &amp;:after{
    content:&quot;Less is more!&quot;;
  }
  .title{
    font-weight:bold;
  }
  &amp;_content{//\u7406\u89E3\u65B9\u5F0F\uFF1A\u76F4\u63A5\u628A &amp; \u66FF\u6362\u6210 #header
    margin:20px;
  }
}
/* \u751F\u6210\u7684 CSS */
#header::after{
  content:&quot;Less is more!&quot;;
}
#header .title{ //\u5D4C\u5957\u4E86
  font-weight:bold;
}
#header_content{//\u6CA1\u6709\u5D4C\u5957\uFF01
    margin:20px;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><strong>\u5A92\u4F53\u67E5\u8BE2</strong></p><p>\u5728\u4EE5\u5F80\u7684\u5DE5\u4F5C\u4E2D\uFF0C\u6211\u4EEC\u4F7F\u7528 \u5A92\u4F53\u67E5\u8BE2\uFF0C\u90FD\u8981\u628A\u4E00\u4E2A\u5143\u7D20 \u5206\u5F00\u5199</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#wrap{
  width:500px;
}
@media screen and (max-width:768px){
  #wrap{
    width:100px;
  }
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Less \u63D0\u4F9B\u4E86\u4E00\u4E2A\u5341\u5206\u4FBF\u6377\u7684\u65B9\u5F0F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
#main{
    //something...

    @media screen{
        @media (max-width:768px){
          width:100px;
        }
    }
    @media tv {
      width:2000px;
    }
}
/* \u751F\u6210\u7684 CSS */
@media screen and (maxwidth:768px){
  #main{
      width:100px; 
  }
}
@media tv{
  #main{
    width:2000px;
  }
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>\u552F\u4E00\u7684\u7F3A\u70B9\u5C31\u662F \u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u4F1A\u7F16\u8BD1\u51FA\u81EA\u5DF1 <code>@media</code> \u58F0\u660E\uFF0C\u5E76\u4E0D\u4F1A\u5408\u5E76\u3002</p><p><strong>\u5B9E\u6218\u6280\u5DE7</strong></p><p>\u53EF\u4EE5\u501F\u52A9 Less \u5728\u5143\u7D20\u4E2D\uFF0C\u53BB\u5B9A\u4E49\u81EA\u5DF1\u7684\u79C1\u6709\u6837\u5F0F\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
#main{
  // something..
  &amp;.show{
    display:block;
  }
}
.show{
  display:none;
}
\u590D\u5236\u4EE3\u7801
const main = document.getElementById(&quot;main&quot;);
main.classList.add(&quot;show&quot;);
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>\u7ED3\u679C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#main.show{
  display:block;
}
.show{
  display:none; //\u4F1A\u88AB\u8986\u76D6\u3002
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="\u6DF7\u5408\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u6DF7\u5408\u65B9\u6CD5" aria-hidden="true">#</a> \u6DF7\u5408\u65B9\u6CD5</h2><ol><li><p><strong>\u65E0\u53C2\u6570\u65B9\u6CD5</strong></p><p>\u65B9\u6CD5\u72B9\u5982 \u58F0\u660E\u7684\u96C6\u5408\uFF0C\u4F7F\u7528\u65F6 \u76F4\u63A5\u952E\u5165\u540D\u79F0\u5373\u53EF\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
.card { // \u7B49\u4EF7\u4E8E .card()
    background: #f6f6f6;
    -webkit-box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
    box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
}
#wrap{
  .card;//\u7B49\u4EF7\u4E8E.card();
}
/* \u751F\u6210\u7684 CSS */
#wrap{
  background: #f6f6f6;
  -webkit-box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
  box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>\u5176\u4E2D <code>.card</code> \u4E0E <code>.card()</code> \u662F\u7B49\u4EF7\u7684\u3002 \u4E2A\u4EBA\u5EFA\u8BAE\uFF0C\u4E3A\u4E86\u907F\u514D \u4EE3\u7801\u6DF7\u6DC6\uFF0C\u5E94\u5199\u6210 :</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.card(){
  //something...
}
#wrap{
  .card();
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u8981\u70B9\uFF1A</p><ul><li><code>.</code> \u4E0E <code>#</code> \u7686\u53EF\u4F5C\u4E3A \u65B9\u6CD5\u524D\u7F00\u3002</li><li>\u65B9\u6CD5\u540E\u5199\u4E0D\u5199 <code>()</code> \u770B\u4E2A\u4EBA\u4E60\u60EF\u3002</li></ul></li><li><p><strong>\u9ED8\u8BA4\u53C2\u6570\u65B9\u6CD5</strong></p><ul><li>Less \u53EF\u4EE5\u4F7F\u7528\u9ED8\u8BA4\u53C2\u6570\uFF0C\u5982\u679C \u6CA1\u6709\u4F20\u53C2\u6570\uFF0C\u90A3\u4E48\u5C06\u4F7F\u7528\u9ED8\u8BA4\u53C2\u6570\u3002</li><li><code>@arguments</code> \u72B9\u5982 JS \u4E2D\u7684 <code>arguments</code> \u6307\u4EE3\u7684\u662F \u5168\u90E8\u53C2\u6570\u3002</li><li>\u4F20\u7684\u53C2\u6570\u4E2D \u5FC5\u987B\u5E26\u7740\u5355\u4F4D\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
.border(@a:10px,@b:50px,@c:30px,@color:#000){
    border:solid 1px @color;
    box-shadow: @arguments;//\u6307\u4EE3\u7684\u662F \u5168\u90E8\u53C2\u6570
}
#main{
    .border(0px,5px,30px,red);//\u5FC5\u987B\u5E26\u7740\u5355\u4F4D
}
#wrap{
    .border(0px);
}
#content{
  .border;//\u7B49\u4EF7\u4E8E .border()
}

/* \u751F\u6210\u7684 CSS */
#main{
    border:solid 1px red;
    box-shadow:0px,5px,30px,red;
}
#wrap{
    border:solid 1px #000;
    box-shadow: 0px 50px 30px #000;
}
#content{
    border:solid 1px #000;
    box-shadow: 10px 50px 30px #000;
}

\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div></li><li><p><strong>\u65B9\u6CD5\u7684\u5339\u914D\u6A21\u5F0F</strong></p><p>\u4E0E \u9762\u5411\u5BF9\u8C61\u4E2D\u7684\u591A\u6001 \u5F88\u76F8\u4F3C</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
.triangle(top,@width:20px,@color:#000){
    border-color:transparent  transparent @color transparent ;
}
.triangle(right,@width:20px,@color:#000){
    border-color:transparent @color transparent  transparent ;
}

.triangle(bottom,@width:20px,@color:#000){
    border-color:@color transparent  transparent  transparent ;
}
.triangle(left,@width:20px,@color:#000){
    border-color:transparent  transparent  transparent @color;
}
.triangle(@_,@width:20px,@color:#000){
    border-style: solid;
    border-width: @width;
}
#main{
    .triangle(left, 50px, #999)
}
/* \u751F\u6210\u7684 CSS */
#main{
  border-color:transparent  transparent  transparent #999;
  border-style: solid;
  border-width: 50px;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>\u8981\u70B9</p><ul><li>\u7B2C\u4E00\u4E2A\u53C2\u6570 <code>left</code> \u8981\u4F1A\u627E\u5230\u65B9\u6CD5\u4E2D\u5339\u914D\u7A0B\u5EA6\u6700\u9AD8\u7684\uFF0C\u5982\u679C\u5339\u914D\u7A0B\u5EA6\u76F8\u540C\uFF0C\u5C06\u5168\u90E8\u9009\u62E9\uFF0C\u5E76\u5B58\u5728\u7740\u6837\u5F0F\u8986\u76D6\u66FF\u6362\u3002</li><li>\u5982\u679C\u5339\u914D\u7684\u53C2\u6570 \u662F\u53D8\u91CF\uFF0C\u5219\u5C06\u4F1A\u5339\u914D\uFF0C\u5982 <code>@_</code> \u3002</li></ul></li><li><p><strong>\u65B9\u6CD5\u7684\u547D\u540D\u7A7A\u95F4</strong></p><p>\u8BA9\u65B9\u6CD5\u66F4\u52A0\u89C4\u8303</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
#card(){
    background: #723232;
    .d(@w:300px){
        width: @w;
        
        #a(@h:300px){
            height: @h;//\u53EF\u4EE5\u4F7F\u7528\u4E0A\u4E00\u5C42\u4F20\u8FDB\u6765\u7684\u65B9\u6CD5
        }
    }
}
#wrap{
    #card &gt; .d &gt; #a(100px); // \u7236\u5143\u7D20\u4E0D\u80FD\u52A0 \u62EC\u53F7
}
#main{
    #card .d();
}
#con{
    //\u4E0D\u5F97\u5355\u72EC\u4F7F\u7528\u547D\u540D\u7A7A\u95F4\u7684\u65B9\u6CD5
    //.d() \u5982\u679C\u524D\u9762\u6CA1\u6709\u5F15\u5165\u547D\u540D\u7A7A\u95F4 #card \uFF0C\u5C06\u4F1A\u62A5\u9519
    
    #card; // \u7B49\u4EF7\u4E8E #card();
    .d(20px); //\u5FC5\u987B\u5148\u5F15\u5165 #card
}
/* \u751F\u6210\u7684 CSS */
#wrap{
  height:100px;
}
#main{
  width:300px;
}
#con{
  width:20px;
}

\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>\u8981\u70B9</p><ul><li>\u5728 CSS \u4E2D<code>&gt;</code> \u9009\u62E9\u5668\uFF0C\u9009\u62E9\u7684\u662F \u513F\u5B50\u5143\u7D20\uFF0C\u5C31\u662F \u5FC5\u987B\u4E0E\u7236\u5143\u7D20 \u6709\u76F4\u63A5\u8840\u6E90\u7684\u5143\u7D20\u3002</li><li>\u5728\u5F15\u5165\u547D\u4EE4\u7A7A\u95F4\u65F6\uFF0C\u5982\u4F7F\u7528 <code>&gt;</code> \u9009\u62E9\u5668\uFF0C\u7236\u5143\u7D20\u4E0D\u80FD\u52A0 \u62EC\u53F7\u3002</li><li>\u4E0D\u5F97\u5355\u72EC\u4F7F\u7528\u547D\u540D\u7A7A\u95F4\u7684\u65B9\u6CD5 \u5FC5\u987B\u5148\u5F15\u5165\u547D\u540D\u7A7A\u95F4\uFF0C\u624D\u80FD\u4F7F\u7528 \u5176\u4E2D\u65B9\u6CD5\u3002</li><li>\u5B50\u65B9\u6CD5 \u53EF\u4EE5\u4F7F\u7528\u4E0A\u4E00\u5C42\u4F20\u8FDB\u6765\u7684\u65B9\u6CD5</li></ul></li><li><p><strong>\u65B9\u6CD5\u7684\u6761\u4EF6\u7B5B\u9009</strong></p><p>Less \u6CA1\u6709 if else\uFF0C\u53EF\u662F\u5B83\u6709 <code>when</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
#card{
    
    // and \u8FD0\u7B97\u7B26 \uFF0C\u76F8\u5F53\u4E8E \u4E0E\u8FD0\u7B97 &amp;&amp;\uFF0C\u5FC5\u987B\u6761\u4EF6\u5168\u90E8\u7B26\u5408\u624D\u4F1A\u6267\u884C
    .border(@width,@color,@style) when (@width&gt;100px) and(@color=#999){
        border:@style @color @width;
    }

    // not \u8FD0\u7B97\u7B26\uFF0C\u76F8\u5F53\u4E8E \u975E\u8FD0\u7B97 !\uFF0C\u6761\u4EF6\u4E3A \u4E0D\u7B26\u5408\u624D\u4F1A\u6267\u884C
    .background(@color) when not (@color&gt;=#222){
        background:@color;
    }

    // , \u9017\u53F7\u5206\u9694\u7B26\uFF1A\u76F8\u5F53\u4E8E \u6216\u8FD0\u7B97 ||\uFF0C\u53EA\u8981\u6709\u4E00\u4E2A\u7B26\u5408\u6761\u4EF6\u5C31\u4F1A\u6267\u884C
    .font(@size:20px) when (@size&gt;50px) , (@size&lt;100px){
        font-size: @size;
    }
}
#main{
    #card&gt;.border(200px,#999,solid);
    #card .background(#111);
    #card &gt; .font(40px);
}
/* \u751F\u6210\u540E\u7684 CSS */
#main{
  border:solid #999 200px;
  background:#111;
  font-size:40px;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>\u8981\u70B9</p><ul><li>\u6BD4\u8F83\u8FD0\u7B97\u6709\uFF1A &gt; &gt;= = =&lt; &lt;\u3002</li><li>= \u4EE3\u8868\u7684\u662F\u7B49\u4E8E</li><li>\u9664\u53BB\u5173\u952E\u5B57 true \u4EE5\u5916\u7684\u503C\u90FD\u88AB\u89C6\u4E3A false\uFF1A</li></ul></li><li><p><strong>\u6570\u91CF\u4E0D\u5B9A\u7684\u53C2\u6570</strong></p><p>\u5982\u679C\u4F60\u5E0C\u671B\u4F60\u7684\u65B9\u6CD5\u63A5\u53D7\u6570\u91CF\u4E0D\u5B9A\u7684\u53C2\u6570\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528... \uFF0C\u72B9\u5982 ES6 \u7684\u6269\u5C55\u8FD0\u7B97\u7B26\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
.boxShadow(...){
    box-shadow: @arguments;
}
.textShadow(@a,...){
    text-shadow: @arguments;
}
#main{
    .boxShadow(1px,4px,30px,red);
    .textShadow(1px,4px,30px,red);
}

/* \u751F\u6210\u540E\u7684 CSS */
#main{
  box-shadow: 1px 4px 30px red;
  text-shadow: 1px 4px 30px red;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div></li><li><p><strong>\u65B9\u6CD5\u4F7F\u7528important\uFF01</strong></p><p>\u4F7F\u7528\u65B9\u6CD5 \u975E\u5E38\u7B80\u5355\uFF0C\u5728\u65B9\u6CD5\u540D\u540E \u52A0\u4E0A\u5173\u952E\u5B57\u5373\u53EF\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
.border{
    border: solid 1px red;
    margin: 50px;
}
#main{
    .border() !important;
}
/* \u751F\u6210\u540E\u7684 CSS */
#main {
    border: solid 1px red !important;
    margin: 50px !important;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div></li><li><p><strong>\u5FAA\u73AF\u65B9\u6CD5</strong></p><p>Less \u5E76\u6CA1\u6709\u63D0\u4F9B for \u5FAA\u73AF\u529F\u80FD\uFF0C\u4F46\u8FD9\u4E5F\u96BE\u4E0D\u5012 \u806A\u660E\u7684\u7A0B\u5E8F\u5458\uFF0C\u4F7F\u7528\u9012\u5F52\u53BB\u5B9E\u73B0\u3002 \u4E0B\u9762\u662F\u5B98\u7F51\u4E2D\u7684\u4E00\u4E2A Demo\uFF0C\u6A21\u62DF\u4E86\u751F\u6210\u6805\u683C\u7CFB\u7EDF\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =&lt; @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
/* \u751F\u6210\u540E\u7684 CSS */
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div></li><li><p><strong>\u5C5E\u6027\u62FC\u63A5\u65B9\u6CD5</strong></p><p><code>+_</code> \u4EE3\u8868\u7684\u662F \u7A7A\u683C\uFF1B<code>+</code> \u4EE3\u8868\u7684\u662F \u9017\u53F7\u3002</p><ul><li>\u9017\u53F7</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
.boxShadow() {
    box-shadow+: inset 0 0 10px #555;
}
.main {
  .boxShadow();
  box-shadow+: 0 0 20px black;
}
/* \u751F\u6210\u540E\u7684 CSS */
.main {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><ul><li>\u7A7A\u683C</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
.Animation() {
  transform+_: scale(2);
}
.main {
  .Animation();
  transform+_: rotate(15deg);
}

/* \u751F\u6210\u7684 CSS */
.main {
  transform: scale(2) rotate(15deg);
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div></li><li><p><strong>\u5B9E\u6218\u6280\u5DE7</strong></p><p>\u4E0B\u9762\u662F\u5B98\u7F51\u4E2D\u7684\u4E00\u4E2A\u975E\u5E38\u8D5E\u7684 Demo</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}

div {
  .average(16px, 50px); // \u8C03\u7528 \u65B9\u6CD5
  padding: @average;    // \u4F7F\u7528\u8FD4\u56DE\u503C
}

/* \u751F\u6210\u7684 CSS */
div {
  padding: 33px;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></li></ol><p>\u53EF\u4EE5\u8BF4 Less \u662F\u4E00\u95E8\u4F18\u96C5\u7F16\u7A0B\u8BED\u8A00\u3002</p><h2 id="\u7EE7\u627F" tabindex="-1"><a class="header-anchor" href="#\u7EE7\u627F" aria-hidden="true">#</a> \u7EE7\u627F</h2><p>extend \u662F Less \u7684\u4E00\u4E2A\u4F2A\u7C7B\u3002\u5B83\u53EF\u7EE7\u627F \u6240\u5339\u914D\u58F0\u660E\u4E2D\u7684\u5168\u90E8\u6837\u5F0F\u3002</p><ol><li><p><strong>extend \u5173\u952E\u5B57\u7684\u4F7F\u7528</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
.animation{
    transition: all .3s ease-out;
    .hide{
      transform:scale(0);
    }
}
#main{
    &amp;:extend(.animation);
}
#con{
    &amp;:extend(.animation .hide);
}

/* \u751F\u6210\u540E\u7684 CSS */
.animation,#main{
  transition: all .3s ease-out;
}
.animation .hide , #con{
    transform:scale(0);
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div></li><li><p><strong>all \u5168\u5C40\u641C\u7D22\u66FF\u6362</strong></p><p>\u4F7F\u7528\u9009\u62E9\u5668\u5339\u914D\u5230\u7684 \u5168\u90E8\u58F0\u660E\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
#main{
  width: 200px;
}
#main {
  &amp;:after {
    content:&quot;Less is good!&quot;;
  }
}
#wrap:extend(#main all) {}

/* \u751F\u6210\u7684 CSS */
#main,#wrap{
  width: 200px;
}
#main:after, #wrap:after {
    content: &quot;Less is good!&quot;;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div></li><li><p><strong>\u51CF\u5C11\u4EE3\u7801\u7684\u91CD\u590D\u6027</strong></p><p>\u4ECE\u8868\u9762 \u770B\u6765\uFF0Cextend \u4E0E \u65B9\u6CD5 \u6700\u5927\u7684\u5DEE\u522B\uFF0C\u5C31\u662F extend \u662F\u540C\u4E2A\u9009\u62E9\u5668\u5171\u7528\u540C\u4E00\u4E2A\u58F0\u660E\uFF0C\u800C \u65B9\u6CD5 \u662F\u4F7F\u7528\u81EA\u5DF1\u7684\u58F0\u660E\uFF0C\u8FD9\u65E0\u7591 \u589E\u52A0\u4E86\u4EE3\u7801\u7684\u91CD\u590D\u6027\u3002</p><p>\u65B9\u6CD5\u793A\u4F8B \u4E0E\u4E0A\u9762\u7684 extend \u8FDB\u884C\u5BF9\u6BD4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
.Method{
  width: 200px;
  &amp;:after {
      content:&quot;Less is good!&quot;;
  }
}
#main{
  .Method;
}
#wrap{
  .Method;
}

/* \u751F\u6210\u7684 CSS */
#main{
  width: 200px;
  &amp;:after{
    content:&quot;Less is good!&quot;;
  }  
}
#wrap{
  width: 200px;
  &amp;:after{
    content:&quot;Less is good!&quot;;
  }  
}

\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div></li><li><p><strong>\u8981\u70B9</strong></p><p><em>\u7FFB\u8BD1\u5B98\u7F51</em></p><ul><li>\u9009\u62E9\u5668\u548C\u6269\u5C55\u4E4B\u95F4 \u662F\u5141\u8BB8\u6709\u7A7A\u683C\u7684\uFF1Apre:hover :extend(div pre).</li><li>\u53EF\u4EE5\u6709\u591A\u4E2A\u6269\u5C55: pre:hover:extend(div pre):extend(.bucket tr) - \u6CE8\u610F\u8FD9\u4E0E pre:hover:extend(div pre, .bucket tr)\u4E00\u6837\u3002</li><li>\u8FD9\u662F\u4E0D\u53EF\u4EE5\u7684\uFF0C\u6269\u5C55\u5FC5\u987B\u5728\u6700\u540E : pre:hover:extend(div pre).nth-child(odd)\u3002</li><li>\u5982\u679C\u4E00\u4E2A\u89C4\u5219\u96C6\u5305\u542B\u591A\u4E2A\u9009\u62E9\u5668\uFF0C\u6240\u6709\u9009\u62E9\u5668\u90FD\u53EF\u4EE5\u4F7F\u7528extend\u5173\u952E\u5B57\u3002</li></ul><h3 id="\u5BFC\u5165" tabindex="-1"><a class="header-anchor" href="#\u5BFC\u5165" aria-hidden="true">#</a> \u5BFC\u5165</h3><ol><li>\u5BFC\u5165 less \u6587\u4EF6 \u53EF\u7701\u7565\u540E\u7F00</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import &quot;main&quot;; 
//\u7B49\u4EF7\u4E8E
import &quot;main.less&quot;;
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol><li><code>@import</code> \u7684\u4F4D\u7F6E\u53EF\u968F\u610F\u653E\u7F6E</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#main{
  font-size:15px;
}
@import &quot;style&quot;;
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li><li><p><strong>reference</strong></p><p>Less \u4E2D \u6700\u5F3A\u5927\u7684\u7279\u6027 \u4F7F\u7528 \u5F15\u5165\u7684 Less \u6587\u4EF6\uFF0C\u4F46\u4E0D\u4F1A \u7F16\u8BD1\u5B83\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
@import (reference) &quot;bootstrap.less&quot;; 

#wrap:extend(.navbar all){}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u7FFB\u8BD1\u5B98\u7F51\uFF1A</p><blockquote><p>\u4F7F\u7528@import (reference)\u5BFC\u5165\u5916\u90E8\u6587\u4EF6\uFF0C\u4F46\u4E0D\u4F1A\u6DFB\u52A0 \u628A\u5BFC\u5165\u7684\u6587\u4EF6 \u7F16\u8BD1\u5230\u6700\u7EC8\u8F93\u51FA\u4E2D\uFF0C\u53EA\u5F15\u7528\u3002</p></blockquote></li><li><p><strong>once</strong></p><blockquote><p>@import\u8BED\u53E5\u7684\u9ED8\u8BA4\u884C\u4E3A\u3002\u8FD9\u8868\u660E\u76F8\u540C\u7684\u6587\u4EF6\u53EA\u4F1A\u88AB\u5BFC\u5165\u4E00\u6B21\uFF0C\u800C\u968F\u540E\u7684\u5BFC\u5165\u6587\u4EF6\u7684\u91CD\u590D\u4EE3\u7801\u90FD\u4E0D\u4F1A\u89E3\u6790\u3002</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@import (once) &quot;foo.less&quot;;
@import (once) &quot;foo.less&quot;; // this statement will be ignored
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li><li><p><strong>multiple</strong></p><blockquote><p>\u4F7F\u7528@import (multiple)\u5141\u8BB8\u5BFC\u5165\u591A\u4E2A\u540C\u540D\u6587\u4EF6\u3002</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */

// file: foo.less
.a {
  color: green;
}
// file: main.less
@import (multiple) &quot;foo.less&quot;;
@import (multiple) &quot;foo.less&quot;;

/* \u751F\u6210\u540E\u7684 CSS */
.a {
  color: green;
}
.a {
  color: green;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div></li></ol><h2 id="\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u51FD\u6570" aria-hidden="true">#</a> \u51FD\u6570</h2><p><strong>\u5224\u65AD\u7C7B\u578B</strong></p><ul><li>isnumber</li></ul><blockquote><p>\u5224\u65AD\u7ED9\u5B9A\u7684\u503C \u662F\u5426 \u662F\u4E00\u4E2A\u6570\u5B57\u3002</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>isnumber(#ff0);     // false
isnumber(blue);     // false
isnumber(&quot;string&quot;); // false
isnumber(1234);     // true
isnumber(56px);     // true
isnumber(7.8%);     // true
isnumber(keyword);  // false
isnumber(url(...)); // false
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul><li>iscolor</li></ul><blockquote><p>\u5224\u65AD\u7ED9\u5B9A\u7684\u503C \u662F\u5426 \u662F\u4E00\u4E2A\u989C\u8272\u3002</p></blockquote><ul><li>isurl</li></ul><blockquote><p>\u5224\u65AD\u7ED9\u5B9A\u7684\u503C \u662F\u5426 \u662F\u4E00\u4E2A url \u3002</p></blockquote><p><strong>\u989C\u8272\u64CD\u4F5C</strong></p><ul><li>saturate</li></ul><blockquote><p>\u589E\u52A0\u4E00\u5B9A\u6570\u503C\u7684\u989C\u8272\u9971\u548C\u5EA6\u3002</p></blockquote><ul><li>lighten</li></ul><blockquote><p>\u589E\u52A0\u4E00\u5B9A\u6570\u503C\u7684\u989C\u8272\u4EAE\u5EA6\u3002</p></blockquote><ul><li>darken</li></ul><blockquote><p>\u964D\u4F4E\u4E00\u5B9A\u6570\u503C\u7684\u989C\u8272\u4EAE\u5EA6\u3002</p></blockquote><ul><li>fade</li></ul><blockquote><p>\u7ED9\u989C\u8272\u8BBE\u5B9A\u4E00\u5B9A\u6570\u503C\u7684\u900F\u660E\u5EA6\u3002</p></blockquote><ul><li>mix</li></ul><blockquote><p>\u6839\u636E\u6BD4\u4F8B\u6DF7\u5408\u4E24\u79CD\u989C\u8272\u3002</p></blockquote><p><strong>\u6570\u5B66\u51FD\u6570</strong></p><ul><li>ceil</li></ul><blockquote><p>\u5411\u4E0A\u53D6\u6574\u3002</p></blockquote><ul><li>floor</li></ul><blockquote><p>\u5411\u4E0B\u53D6\u6574\u3002</p></blockquote><ul><li>percentage</li></ul><blockquote><p>\u5C06\u6D6E\u70B9\u6570\u8F6C\u6362\u4E3A\u767E\u5206\u6BD4\u5B57\u7B26\u4E32\u3002</p></blockquote><ul><li>round</li></ul><blockquote><p>\u56DB\u820D\u4E94\u5165\u3002</p></blockquote><ul><li>sqrt</li></ul><blockquote><p>\u8BA1\u7B97\u4E00\u4E2A\u6570\u7684\u5E73\u65B9\u6839\u3002</p></blockquote><ul><li>abs</li></ul><blockquote><p>\u8BA1\u7B97\u6570\u5B57\u7684\u7EDD\u5BF9\u503C\uFF0C\u539F\u6837\u4FDD\u6301\u5355\u4F4D\u3002</p></blockquote><ul><li>pow</li></ul><blockquote><p>\u8BA1\u7B97\u4E00\u4E2A\u6570\u7684\u4E58\u65B9\u3002</p></blockquote><h2 id="\u5176\u4ED6" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6" aria-hidden="true">#</a> \u5176\u4ED6</h2><ol><li><p><strong>\u6CE8\u91CA</strong></p><ul><li>/* */ CSS\u539F\u751F\u6CE8\u91CA\uFF0C\u4F1A\u88AB\u7F16\u8BD1\u5728 CSS \u6587\u4EF6\u4E2D\u3002</li><li>/ / Less\u63D0\u4F9B\u7684\u4E00\u79CD\u6CE8\u91CA\uFF0C\u4E0D\u4F1A\u88AB\u7F16\u8BD1\u5728 CSS \u6587\u4EF6\u4E2D\u3002</li></ul></li><li><p><strong>\u907F\u514D\u7F16\u8BD1</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
#main{
  width:~&#39;calc(300px-30px)&#39;;
}

/* \u751F\u6210\u540E\u7684 CSS */
#main{
  width:calc(300px-30px);
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u7ED3\u6784\uFF1A <code>~&#39; \u503C &#39;</code></p></li><li><p><strong>\u53D8\u91CF\u62FC\u4E32</strong></p><p>\u5728\u5E73\u65F6\u5DE5\u4F5C\u4E2D\uFF0C\u8FD9\u79CD\u9700\u6C42 \u592A\u5E38\u89C1\u4E86\u3002 \u5728\u4E0B\u9762\u4F8B\u5B50\u4E2D\uFF0C \u5B9E\u73B0\u4E86\u4E0D\u540C\u7684 transtion-delay\u3001animation\u3001@keyframes</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.judge(@i) when(@i=1){
  @size:15px;
}
.judge(@i) when(@i&gt;1){
  @size:16px;
}
.loopAnimation(@i) when (@i&lt;16) {
  
  .circle:nth-child(@{i}){
      .judeg(@i);
      border-radius:@size @size 0 0;
      animation: ~&quot;circle-@{i}&quot; @duration infinite @ease;
      transition-delay:~&quot;@{i}ms&quot;;
  }
  @keyframes ~&quot;circle-@{i}&quot; {
      // do something...
  }
  .loopAnimation(@i + 1);
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>\u7ED3\u6784\uFF1A <code>~&quot;\u5B57\u7B26@{\u53D8\u91CF}\u5B57\u7B26&quot;</code>;</p></li><li><p><strong>\u4F7F\u7528 JS</strong></p><p>\u56E0\u4E3A Less \u662F\u7531 JS \u7F16\u5199\uFF0C\u6240\u4EE5 Less \u6709\u4E00\u5F97\u5929\u72EC\u539A\u7684\u7279\u6027\uFF1A\u4EE3\u7801\u4E2D\u4F7F\u7528 Javascript \u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Less */
@content:\`&quot;aaa&quot;.toUpperCase()\`;
#randomColor{
  @randomColor: ~&quot;rgb(\`Math.round(Math.random() * 256)\`,\`Math.round(Math.random() * 256)\`,\`Math.round(Math.random() * 256)\`)&quot;;
}
#wrap{
  width: ~&quot;\`Math.round(Math.random() * 100)\`px&quot;;
  &amp;:after{
      content:@content;
  }
  height: ~&quot;\`window.innerHeight\`px&quot;;
  alert:~&quot;\`alert(1)\`&quot;;
  #randomColor();
  background-color: @randomColor;
}
/* \u751F\u6210\u540E\u7684 CSS */

// \u5F39\u51FA 1
#wrap{
  width: \u968F\u673A\u503C\uFF080~100\uFF09px;
  height: 743px;//\u7531\u7535\u8111\u800C\u5F02
  background: \u968F\u673A\u989C\u8272;
}
#wrap::after{
  content:&quot;AAA&quot;;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div></li></ol><p>\u524D\u51E0\u4E2A\u6708 \uFF0C \u6709\u4E2A <code>CSS in JS</code> \u7684\u6982\u5FF5\u975E\u5E38\u706B\uFF0C\u73B0\u5728 \u770B\u6765 <code>JS in CSS</code> \u4E5F\u672A\u66FE\u4E0D\u53EF\u3002 \u6211\u89C9\u5F97\u5B8C\u5168\u53EF\u4EE5\u6839\u636E Less \u8FD9\u4E2A\u7279\u6027\u6765\u9020\u4E2A\u8F6E\u5B50\uFF0CJS\u6765\u63A7\u5236 CSS \uFF0C\u5F62\u6210 \u52A8\u6001\u5C5E\u6027\uFF0C\u5982\u679C\u6210\u529F \u5F88\u53EF\u80FD\u4F1A\u6539\u53D8 \u73B0\u5728\u524D\u7AEF\u7684\u6253\u5F00\u59FF\u52BF\u3002</p><h2 id="\u4E0Esass\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#\u4E0Esass\u533A\u522B" aria-hidden="true">#</a> \u4E0ESASS\u533A\u522B</h2><h4 id="_1\u3001\u7F16\u8BD1\u73AF\u5883\u4E0D\u4E00\u6837" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u7F16\u8BD1\u73AF\u5883\u4E0D\u4E00\u6837" aria-hidden="true">#</a> 1\u3001\u7F16\u8BD1\u73AF\u5883\u4E0D\u4E00\u6837</h4><p><code>Sass</code>\u7684\u5B89\u88C5\u9700\u8981Ruby\u73AF\u5883\uFF0C\u662F\u5728<strong>\u670D\u52A1\u7AEF</strong>\u5904\u7406\u7684\u3002 <code>Less</code>\u662F\u9700\u8981\u5F15\u5165less.js\u6765\u5904\u7406Less\u4EE3\u7801\u8F93\u51FAcss\u5230\u6D4F\u89C8\u5668\uFF0C\u4E5F\u53EF\u4EE5\u5728\u5F00\u53D1\u73AF\u8282\u4F7F\u7528Less\uFF0C\u7136\u540E<strong>\u7F16\u8BD1\u6210css\u6587\u4EF6</strong>\uFF0C\u76F4\u63A5\u653E\u5230\u9879\u76EE\u4E2D\uFF0C\u4E5F\u6709 Less.app\u3001SimpleLess\u3001CodeKit.app\u8FD9\u6837\u7684\u5DE5\u5177\uFF0C\u4E5F\u6709\u5728\u7EBF\u7F16\u8BD1\u5730\u5740\u3002</p><h4 id="_2\u3001\u53D8\u91CF\u7B26\u4E0D\u4E00\u6837" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u53D8\u91CF\u7B26\u4E0D\u4E00\u6837" aria-hidden="true">#</a> 2\u3001\u53D8\u91CF\u7B26\u4E0D\u4E00\u6837</h4><p><code>SASS</code> \u53D8\u91CF\u7B26\u662F $</p><p><code>LESS</code> \u53D8\u91CF\u7B26\u662F @</p><h4 id="_3\u3001\u53D8\u91CF\u7684\u4F5C\u7528\u57DF\u4E5F\u4E0D\u4E00\u6837" tabindex="-1"><a class="header-anchor" href="#_3\u3001\u53D8\u91CF\u7684\u4F5C\u7528\u57DF\u4E5F\u4E0D\u4E00\u6837" aria-hidden="true">#</a> 3\u3001\u53D8\u91CF\u7684\u4F5C\u7528\u57DF\u4E5F\u4E0D\u4E00\u6837</h4><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code>Less-\u4F5C\u7528\u57DF
<span class="token atrule"><span class="token rule">@color</span><span class="token punctuation">:</span> #00c<span class="token punctuation">;</span></span> <span class="token comment">/* \u84DD\u8272 */</span>
<span class="token selector">#header</span> <span class="token punctuation">{</span>
  <span class="token atrule"><span class="token rule">@color</span><span class="token punctuation">:</span> #c00<span class="token punctuation">;</span></span> <span class="token comment">/* red */</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid <span class="token atrule"><span class="token rule">@color</span><span class="token punctuation">;</span></span> <span class="token comment">/* \u7EA2\u8272\u8FB9\u6846 */</span>
<span class="token punctuation">}</span>

<span class="token selector">#footer</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid <span class="token atrule"><span class="token rule">@color</span><span class="token punctuation">;</span></span> <span class="token comment">/* \u84DD\u8272\u8FB9\u6846 */</span>
<span class="token punctuation">}</span>

<span class="token selector">Less-\u4F5C\u7528\u57DF\u7F16\u8BD1\u540E
#header</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #cc0000<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token selector">#footer</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #0000cc<span class="token punctuation">;</span><span class="token punctuation">}</span>

scss-\u4F5C\u7528\u57DF
$<span class="token property">color</span><span class="token punctuation">:</span> #00c<span class="token punctuation">;</span> <span class="token comment">/* \u84DD\u8272 */</span>

<span class="token selector">#header</span> <span class="token punctuation">{</span>

  $<span class="token property">color</span><span class="token punctuation">:</span> #c00<span class="token punctuation">;</span> <span class="token comment">/* red */</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid $color<span class="token punctuation">;</span> <span class="token comment">/* \u7EA2\u8272\u8FB9\u6846 */</span>
<span class="token punctuation">}</span>

<span class="token selector">#footer</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid $color<span class="token punctuation">;</span> <span class="token comment">/* \u84DD\u8272\u8FB9\u6846 */</span>
<span class="token punctuation">}</span>

<span class="token selector">Sass-\u4F5C\u7528\u57DF\u7F16\u8BD1\u540E

#header</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #c00<span class="token punctuation">}</span>
<span class="token selector">#footer</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #c00<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>Less\u533A\u5206\u4E0A\u4E0B\u7EA7\u4F5C\u7528\u57DF\uFF0CSCSS\u4E3A\u5C31\u8FD1\u539F\u5219</p><p>\u6211\u4EEC\u53EF\u4EE5\u770B\u51FA\u6765\uFF0Cless\u548Cscss\u4E2D\u7684\u53D8\u91CF\u4F1A\u968F\u7740\u4F5C\u7528\u57DF\u7684\u53D8\u5316\u800C\u4E0D\u4E00\u6837\u3002</p><h4 id="_4\u3001\u8F93\u51FA\u8BBE\u7F6E\u4E0D\u540C" tabindex="-1"><a class="header-anchor" href="#_4\u3001\u8F93\u51FA\u8BBE\u7F6E\u4E0D\u540C" aria-hidden="true">#</a> 4\u3001\u8F93\u51FA\u8BBE\u7F6E\u4E0D\u540C</h4><p><code>Sass</code>\u63D0\u4F9B4\u4E2D\u8F93\u51FA\u9009\u9879\uFF1A<strong>nested</strong>, <strong>compact</strong>, <strong>compressed</strong> \u548C <strong>expanded</strong>\u3002</p><p>\u8F93\u51FA\u6837\u5F0F\u7684\u98CE\u683C\u53EF\u4EE5\u6709\u56DB\u79CD\u9009\u62E9\uFF0C\u9ED8\u8BA4\u4E3Anested</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>nested\uFF1A\u5D4C\u5957\u7F29\u8FDB\u7684css\u4EE3\u7801
expanded\uFF1A\u5C55\u5F00\u7684\u591A\u884Ccss\u4EE3\u7801
compact\uFF1A\u7B80\u6D01\u683C\u5F0F\u7684css\u4EE3\u7801
compressed\uFF1A\u538B\u7F29\u540E\u7684css\u4EE3\u7801
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>Less</code>\u6CA1\u6709\u8F93\u51FA\u8BBE\u7F6E</p><h4 id="_5\u3001\u652F\u6301\u8BED\u53E5\u4E0D\u540C" tabindex="-1"><a class="header-anchor" href="#_5\u3001\u652F\u6301\u8BED\u53E5\u4E0D\u540C" aria-hidden="true">#</a> 5\u3001\u652F\u6301\u8BED\u53E5\u4E0D\u540C</h4><p><code>Sass</code>\u652F\u6301\u6761\u4EF6\u8BED\u53E5\uFF0C\u53EF\u4EE5\u4F7F\u7528if{}else{},for{}\u5FAA\u73AF\u7B49\u7B49\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/* Sample Sass \u201Cif\u201D statement */

@if lightness($color) &gt; 30% {

} @else {

}

/* Sample Sass \u201Cfor\u201D loop */

@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><code>Less</code>\u4E0D\u652F\u6301\u3002</p><h4 id="_6\u3001\u5F15\u7528\u5916\u90E8-css-\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_6\u3001\u5F15\u7528\u5916\u90E8-css-\u6587\u4EF6" aria-hidden="true">#</a> 6\u3001\u5F15\u7528\u5916\u90E8 CSS \u6587\u4EF6</h4><p><code>Scss</code>\u5F15\u7528\u7684\u5916\u90E8\u6587\u4EF6\u547D\u540D\u5FC5\u987B\u4EE5_\u5F00\u5934, \u5982\u4E0B\u4F8B\u6240\u793A:\u5176\u4E2D_test1.scss\u3001_test2.scss\u3001_test3.scss\u6587\u4EF6\u5206\u522B\u8BBE\u7F6E\u7684h1 h2 h3\u3002\u6587\u4EF6\u540D\u5982\u679C\u4EE5\u4E0B\u5212\u7EBF_\u5F00\u5934\u7684\u8BDD\uFF0CSass\u4F1A\u8BA4\u4E3A\u8BE5\u6587\u4EF6\u662F\u4E00\u4E2A\u5F15\u7528\u6587\u4EF6\uFF0C\u4E0D\u4F1A\u5C06\u5176\u7F16\u8BD1\u4E3Acss\u6587\u4EF6.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u6E90\u4EE3\u7801\uFF1A
@import &quot;_test1.scss&quot;;
@import &quot;_test2.scss&quot;;
@import &quot;_test3.scss&quot;;
// \u7F16\u8BD1\u540E\uFF1A
h1 {
  font-size: 17px;
}
 
h2 {
  font-size: 17px;
}
 
h3 {
  font-size: 17px;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><code>Less</code>\u5F15\u7528\u5916\u90E8\u6587\u4EF6\u548Ccss\u4E2D\u7684@import\u6CA1\u4EC0\u4E48\u5DEE\u5F02\u3002</p><h4 id="_7\u3001\u5DE5\u5177\u5E93\u4E0D\u540C" tabindex="-1"><a class="header-anchor" href="#_7\u3001\u5DE5\u5177\u5E93\u4E0D\u540C" aria-hidden="true">#</a> 7\u3001\u5DE5\u5177\u5E93\u4E0D\u540C</h4><p><code>Sass</code>\u6709\u5DE5\u5177\u5E93Compass, \u7B80\u5355\u8BF4\uFF0CSass\u548CCompass\u7684\u5173\u7CFB\u6709\u70B9\u50CFJavascript\u548CjQuery\u7684\u5173\u7CFB,Compass\u662FSass\u7684\u5DE5\u5177\u5E93\u3002\u5728\u5B83\u7684\u57FA\u7840\u4E0A\uFF0C\u5C01\u88C5\u4E86\u4E00\u7CFB\u5217\u6709\u7528\u7684\u6A21\u5757\u548C\u6A21\u677F\uFF0C\u8865\u5145\u5F3A\u5316\u4E86Sass\u7684\u529F\u80FD\u3002</p><p><code>Less</code>\u6709UI\u7EC4\u4EF6\u5E93Bootstrap,Bootstrap\u662Fweb\u524D\u7AEF\u5F00\u53D1\u4E2D\u4E00\u4E2A\u6BD4\u8F83\u6709\u540D\u7684\u524D\u7AEFUI\u7EC4\u4EF6\u5E93\uFF0CBootstrap\u7684\u6837\u5F0F\u6587\u4EF6\u90E8\u5206\u6E90\u7801\u5C31\u662F\u91C7\u7528Less\u8BED\u6CD5\u7F16\u5199\u3002</p>`,116);function r(l,p){return e}var c=n(a,[["render",r],["__file","Less.html.vue"]]);export{c as default};
