import{_ as d}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as t,a as e,b as i,d as a,e as s,r as l}from"./app.d7b34baa.js";const c={},o=e("h1",{id:"grid-布局",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#grid-布局","aria-hidden":"true"},"#"),i(" Grid 布局")],-1),p=e("blockquote",null,[e("p",null,"作者：Gopal 链接：https://juejin.cn/post/6854573220306255880 来源：稀土掘金")],-1),u=e("h2",{id:"grid-布局是什么",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#grid-布局是什么","aria-hidden":"true"},"#"),i(" Grid 布局是什么？")],-1),v=e("code",null,"Grid",-1),m=e("code",null,"CSS",-1),g=e("code",null,"CSS",-1),b=e("code",null,"CSS",-1),x=e("code",null,"Grid",-1),h={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FqBbveKB%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},f=s('<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591885783dd~tplv-t2oaga2asx-watermark.awebp" alt="img"></p><h2 id="grid-布局和-flex-布局" tabindex="-1"><a class="header-anchor" href="#grid-布局和-flex-布局" aria-hidden="true">#</a> Grid 布局和 flex 布局</h2><p>讲到布局，我们就会想到 <code>flex</code> 布局，甚至有人认为竟然有 <code>flex</code> 布局了，似乎没有必要去了解 <code>Grid</code> 布局。但 <code>flex</code> 布局和 <code>Grid</code> 布局有实质的区别，那就是 <strong><code>flex</code> 布局是一维布局，<code>Grid</code> 布局是二维布局</strong>。<code>flex</code> 布局一次只能处理一个维度上的元素布局，一行或者一列。<code>Grid</code> 布局是将容器划分成了“行”和“列”，产生了一个个的网格，我们可以将网格元素放在与这些行和列相关的位置上，从而达到我们布局的目的。</p><p><strong><code>Grid</code> 布局远比 <code>flex</code> 布局强大！</strong></p><p>flex布局示例:</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/28/173945aadff842d1~tplv-t2oaga2asx-watermark.awebp" alt="img"></p><p>Grid 布局示例：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895918bcb5190~tplv-t2oaga2asx-watermark.awebp" alt="Grid 布局"></p><h2 id="grid-的一些基础概念" tabindex="-1"><a class="header-anchor" href="#grid-的一些基础概念" aria-hidden="true">#</a> Grid 的一些基础概念</h2>',9),w={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FQWyoexm%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},j=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;wrapper&quot;&gt;
  &lt;div class=&quot;one item&quot;&gt;One&lt;/div&gt;
  &lt;div class=&quot;two item&quot;&gt;Two&lt;/div&gt;
  &lt;div class=&quot;three item&quot;&gt;Three&lt;/div&gt;
  &lt;div class=&quot;four item&quot;&gt;Four&lt;/div&gt;
  &lt;div class=&quot;five item&quot;&gt;Five&lt;/div&gt;
  &lt;div class=&quot;six item&quot;&gt;Six&lt;/div&gt;
&lt;/div&gt;
复制代码
.wrapper {
  margin: 60px;
  /* 声明一个容器 */
  display: grid;
  /*  声明列的宽度  */
  grid-template-columns: repeat(3, 200px);
  /*  声明行间距和列间距  */
  grid-gap: 20px;
  /*  声明行的高度  */
  grid-template-rows: 100px 200px;
}
.one {
  background: #19CAAD;
}
.two { 
  background: #8CC7B5;
}
.three {
  background: #D1BA74;
}
.four {
  background: #BEE7E9;
}
.five {
  background: #E6CEAC;
}
.six {
  background: #ECAD9E;
}
.item {
  text-align: center;
  font-size: 200%;
  color: #fff;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895918bfd94e9~tplv-t2oaga2asx-watermark.awebp" alt="img"></p><p>容器和项目：我们通过在元素上声明 <code>display：grid</code> 或 <code>display：inline-grid</code> 来创建一个网格容器。一旦我们这样做，这个元素的所有直系子元素将成为网格项目。比如上面 <code>.wrapper</code> 所在的元素为一个网格容器，其直系子元素将成为网格项目。</p><p>网格轨道：<code>grid-template-columns</code> 和 <code>grid-template-rows</code> 属性来定义网格中的行和列。容器内部的水平区域称为行，垂直区域称为列。上图中 <code>One</code>、<code>Two</code>、<code>Three</code> 组成了一行，<code>One</code>、<code>Four</code> 则是一列</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895918ee0ecb6~tplv-t2oaga2asx-watermark.awebp" alt="行和列"></p><p>网格单元：一个网格单元是在一个网格元素中最小的单位， 从概念上来讲其实它和表格的一个单元格很像。上图中 <code>One</code>、<code>Two</code>、<code>Three</code>、<code>Four</code>...都是一个个的网格单元</p><p>网格线：划分网格的线，称为&quot;网格线&quot;。应该注意的是，当我们定义网格时，我们定义的是网格轨道，而不是网格线。Grid 会为我们创建编号的网格线来让我们来定位每一个网格元素。m 列有 m + 1 根垂直的网格线，n 行有 n + 1 跟水平网格线。比如上图示例中就有 4 根垂直网格线。一般而言，是从左到右，从上到下，1，2，3 进行编号排序。当然也可以从右到左，从下到上，按照 -1，-2，-3...顺序进行编号排序</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591934e1560~tplv-t2oaga2asx-watermark.awebp" alt="网格线"></p><h2 id="容器属性介绍" tabindex="-1"><a class="header-anchor" href="#容器属性介绍" aria-hidden="true">#</a> 容器属性介绍</h2><p><code>Grid</code> 布局相关的属性以及值众多，需要记忆的不少，建议可以跟 <code>demo</code> 一起结合起来，边敲代码边理解，再利用一些空闲时间记忆一下。笔者会在介绍每个属性的时候，做个小 <code>demo</code> 演示，建议大家可以自己修改看看效果加深记忆</p><p><code>Grid</code> 布局属性可以分为两大类，一类是容器属性，一类是项目属性。我们先来看容器属性</p><h3 id="display-属性" tabindex="-1"><a class="header-anchor" href="#display-属性" aria-hidden="true">#</a> display 属性</h3>`,12),_={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FwvMZwqY",target:"_blank",rel:"noopener noreferrer"},F=s(`<p>我们通过在元素上声明 <code>display：grid</code> 或 <code>display：inline-grid</code> 来创建一个网格容器。声明 <code>display：grid</code> 则该容器是一个块级元素，设置成 <code>display: inline-grid</code> 则容器元素为行内元素</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper {
  display: grid;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591baa442ef~tplv-t2oaga2asx-watermark.awebp" alt="块级元素"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper-1 {
  display: inline-grid;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591c03b6883~tplv-t2oaga2asx-watermark.awebp" alt="行内属性"></p><h3 id="grid-template-columns-属性和-grid-template-rows-属性" tabindex="-1"><a class="header-anchor" href="#grid-template-columns-属性和-grid-template-rows-属性" aria-hidden="true">#</a> grid-template-columns 属性和 grid-template-rows 属性</h3>`,6),y={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FBajEBYq%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},k=s(`<p><code>grid-template-columns</code> 属性设置列宽，<code>grid-template-rows</code> 属性设置行高，这两个属性在 <code>Grid</code> 布局中尤为重要，它们的值是有多种多样的，而且它们的设置是比较相似的，下面针对 <code>grid-template-columns</code> 属性进行讲解</p><p><strong>固定的列宽和行高</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper {
  display: grid;
  /*  声明了三列，宽度分别为 200px 100px 200px */
  grid-template-columns: 200px 100px 200px;
  grid-gap: 5px;
  /*  声明了两行，行高分别为 50px 50px  */
  grid-template-rows: 50px 50px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上表示固定列宽为 200px 100px 200px，行高为 50px 50px</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591c0fc1214~tplv-t2oaga2asx-watermark.awebp" alt="固定行高和列宽"></p><p><strong>repeat() 函数</strong>：可以简化重复的值。该函数接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。比如上面行高都是一样的，我们可以这么去实现，实际效果是一模一样的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper-1 {
  display: grid;
  grid-template-columns: 200px 100px 200px;
  grid-gap: 5px;
  /*  2行，而且行高都为 50px  */
  grid-template-rows: repeat(2, 50px);
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>auto-fill 关键字</strong>：表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格。<code>grid-template-columns: repeat(auto-fill, 200px)</code> 表示列宽是 200 px，但列的数量是不固定的，只要浏览器能够容纳得下，就可以放置元素，代码以及效果如下图所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper-2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591c300e81a~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><p><strong>fr 关键字</strong>：<code>Grid</code> 布局还引入了一个另外的长度单位来帮助我们创建灵活的网格轨道。<code>fr</code> 单位代表网格容器中可用空间的一等份。<code>grid-template-columns: 200px 1fr 2fr</code> 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3。代码以及效果如下图所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper-3 {
  display: grid;
  grid-template-columns: 200px 1fr 2fr;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591ccc256d1~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><p><strong>minmax() 函数</strong>：我们有时候想给网格元素一个最小和最大的尺寸，<code>minmax()</code> 函数产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。它接受两个参数，分别为最小值和最大值。<code>grid-template-columns: 1fr 1fr minmax(300px, 2fr)</code> 的意思是，第三个列宽最少也是要 300px，但是最大不能大于第一第二列宽的两倍。代码以及效果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper-4 {
  display: grid;
  grid-template-columns: 1fr 1fr minmax(300px, 2fr);
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591dc05edac~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><p><strong>auto 关键字</strong>：由浏览器决定长度。通过 <code>auto</code> 关键字，我们可以轻易实现三列或者两列布局。<code>grid-template-columns: 100px auto 100px</code> 表示第一第三列为 100px，中间由浏览器决定长度，代码以及效果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper-5 {
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591f2146e1d~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><h3 id="grid-row-gap-属性、grid-column-gap-属性以及-grid-gap-属性" tabindex="-1"><a class="header-anchor" href="#grid-row-gap-属性、grid-column-gap-属性以及-grid-gap-属性" aria-hidden="true">#</a> grid-row-gap 属性、grid-column-gap 属性以及 grid-gap 属性</h3>`,20),G={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FjOWRNeg",target:"_blank",rel:"noopener noreferrer"},A=s(`<p><code>grid-row-gap</code> 属性、<code>grid-column-gap</code> 属性分别设置行间距和列间距。<code>grid-gap</code> 属性是两者的简写形式。</p><p><code>grid-row-gap: 10px</code> 表示行间距是 10px，<code>grid-column-gap: 20px</code> 表示列间距是 20px。<code>grid-gap: 10px 20px</code> 实现的效果是一样的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper {
  display: grid;
  grid-template-columns: 200px 100px 100px;
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
复制代码
.wrapper-1 {
  display: grid;
  grid-template-columns: 200px 100px 100px;
  grid-auto-rows: 50px;
  grid-row-gap: 10px;
  grid-column-gap: 20px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上两种写法效果是一样的。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389591f78de6f2~tplv-t2oaga2asx-watermark.awebp" alt="img"></p><h3 id="grid-template-areas-属性" tabindex="-1"><a class="header-anchor" href="#grid-template-areas-属性" aria-hidden="true">#</a> grid-template-areas 属性</h3>`,6),q={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FRwrObEJ%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},C=s(`<p><code>grid-template-areas</code> 属性用于定义区域，一个区域由一个或者多个单元格组成</p><p>一般这个属性跟网格元素的 <code>grid-area</code> 一起使用，我们在这里一起介绍。 <code>grid-area</code> 属性指定项目放在哪一个区域</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px  120px  120px;
  grid-template-areas:
    &quot;. header  header&quot;
    &quot;sidebar content content&quot;;
  background-color: #fff;
  color: #444;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示划分出 6 个单元格，其中值得注意的是 <code>.</code> 符号代表空的单元格，也就是没有用到该单元格。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.sidebar {
  grid-area: sidebar;
}

.content {
  grid-area: content;
}

.header {
  grid-area: header;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码表示将类 <code>.sidebar</code> <code>.content</code> <code>.header</code>所在的元素放在上面 <code>grid-template-areas</code> 中定义的 <code>sidebar</code> <code>content</code> <code>header</code> 区域中</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895920bbe824a~tplv-t2oaga2asx-watermark.awebp" alt="img"></p><h3 id="grid-auto-flow-属性" tabindex="-1"><a class="header-anchor" href="#grid-auto-flow-属性" aria-hidden="true">#</a> grid-auto-flow 属性</h3>`,8),E={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FMWKRWKj%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},S=s(`<p><code>grid-auto-flow</code> 属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。默认的放置顺序是&quot;先行后列&quot;，即先填满第一行，再开始放入第二行，即下图英文数字的顺序 <code>one</code>,<code>two</code>,<code>three</code>...。这个顺序由 <code>grid-auto-flow</code> 属性决定，默认值是 <code>row</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-auto-flow: row;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895921548265c~tplv-t2oaga2asx-watermark.awebp" alt="img"></p><p>细心的同学可能发现了一个问题，就是第五个项目和第六个项目之间有个空白（如下图所示），这个是由于第六块的长度大于了空白处的长度，被挤到了下一行导致的。在实际应用中，我们可能想让下面长度合适的填满这个空白，这个时候可以设置 <code>grid-auto-flow: row dense</code>，表示尽可能填满表格。代码以及效果如下所示：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389592211e1d6b~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper-2 {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-auto-flow: row dense;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895923612a19b~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><p>可以设置 <code>grid-auto-flow: column</code>，表示先列后行，代码以及效果如下图所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper-1 {
  display: grid;
  grid-auto-columns: 100px;
  grid-auto-flow: column;
  grid-gap: 5px;
  grid-template-rows:  50px 50px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895923f11dd83~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><h3 id="justify-items-属性、align-items-属性以及-place-items-属性" tabindex="-1"><a class="header-anchor" href="#justify-items-属性、align-items-属性以及-place-items-属性" aria-hidden="true">#</a> justify-items 属性、align-items 属性以及 place-items 属性</h3>`,11),D={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FzYrXYrz%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},B=s(`<p><code>justify-items</code> 属性设置单元格内容的水平位置（左中右），<code>align-items</code> 属性设置单元格的垂直位置（上中下）</p><p>下面以 justify-items 属性为例进行讲解，align-items 属性同理，只是方向为垂直方向。它们都有如下属性：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其代码实现以及效果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper, .wrapper-1, .wrapper-2, .wrapper-3 {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-gap: 5px;
  grid-auto-rows: 50px;
  justify-items: start;
}
.wrapper-1 {
  justify-items: end;
}
.wrapper-2 {
  justify-items: center;
}
.wrapper-3 {
  justify-items: stretch;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>start：对齐单元格的起始边缘</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738959244947d96~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><ul><li>end：对齐单元格的结束边缘</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389592560e3fc2~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><ul><li>center：单元格内部居中</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895925bd879fa~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><ul><li>stretch：拉伸，占满单元格的整个宽度（默认值）</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738959270057d0c~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><h3 id="justify-content-属性、align-content-属性以及-place-content-属性" tabindex="-1"><a class="header-anchor" href="#justify-content-属性、align-content-属性以及-place-content-属性" aria-hidden="true">#</a> justify-content 属性、align-content 属性以及 place-content 属性</h3>`,14),z={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FqBbwBZx%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},O=s(`<p><code>justify-content</code> 属性是整个内容区域在容器里面的水平位置（左中右），<code>align-content</code> 属性是整个内容区域的垂直位置（上中下）。它们都有如下的属性值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面以 <code>justify-content</code> 属性为例进行讲解，<code>align-content</code> 属性同理，只是方向为垂直方向</p><ul><li>start - 对齐容器的起始边框</li><li>end - 对齐容器的结束边框</li><li>center - 容器内部居中</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper, .wrapper-1, .wrapper-2, .wrapper-3, .wrapper-4, .wrapper-5, .wrapper-6 {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-gap: 5px;
  grid-auto-rows: 50px;
  justify-content: start;
}
.wrapper-1 {
  justify-content: end;
}
.wrapper-2 {
  justify-content: center;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895926d20f5d6~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><ul><li>space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍</li><li>space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔</li><li>space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔</li><li>stretch - 项目大小没有指定时，拉伸占据整个网格容器</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper-3 {
  justify-content: space-around;
}
.wrapper-4 {
  justify-content: space-between;
}
.wrapper-5 {
  justify-content: space-evenly;
}
.wrapper-6 {
  justify-content: stretch;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895927ba770c4~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><h3 id="grid-auto-columns-属性和-grid-auto-rows-属性" tabindex="-1"><a class="header-anchor" href="#grid-auto-columns-属性和-grid-auto-rows-属性" aria-hidden="true">#</a> grid-auto-columns 属性和 grid-auto-rows 属性</h3>`,10),T={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FzYrXvYZ%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},Y=s(`<p>在讲 <code>grid-auto-columns</code> 属性和 <code>grid-auto-rows</code> 属性之前，先来看看隐式和显式网格的概念</p><p><strong>隐式和显式网格</strong>：显式网格包含了你在 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 属性中定义的行和列。如果你在网格定义之外又放了一些东西，或者因为内容的数量而需要的更多网格轨道的时候，网格将会在隐式网格中创建行和列</p><p>假如有多余的网格（也就是上面提到的隐式网格），那么它的行高和列宽可以根据 <code>grid-auto-columns</code> 属性和 <code>grid-auto-rows</code> 属性设置。它们的写法和<code>grid-template-columns</code> 和 <code>grid-template-rows</code> 完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper {
  display: grid;
  grid-template-columns: 200px 100px;
/*  只设置了两行，但实际的数量会超出两行，超出的行高会以 grid-auto-rows 算 */
  grid-template-rows: 100px 100px;
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>grid-template-columns</code> 属性和 <code>grid-template-rows</code> 属性只是指定了两行两列，但实际有九个元素，就会产生隐式网格。通过 <code>grid-auto-rows</code> 可以指定隐式网格的行高为 50px</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895927d99af1c~tplv-t2oaga2asx-watermark.awebp" alt="img"></p><h2 id="项目属性介绍" tabindex="-1"><a class="header-anchor" href="#项目属性介绍" aria-hidden="true">#</a> 项目属性介绍</h2><h3 id="grid-column-start-属性、grid-column-end-属性、grid-row-start-属性以及grid-row-end-属性" tabindex="-1"><a class="header-anchor" href="#grid-column-start-属性、grid-column-end-属性、grid-row-start-属性以及grid-row-end-属性" aria-hidden="true">#</a> grid-column-start 属性、grid-column-end 属性、grid-row-start 属性以及grid-row-end 属性</h3>`,8),N={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FPoZgopr",target:"_blank",rel:"noopener noreferrer"},Z=s(`<p>可以指定网格项目所在的四个边框，分别定位在哪根网格线，从而指定项目的位置</p><ul><li>grid-column-start 属性：左边框所在的垂直网格线</li><li>grid-column-end 属性：右边框所在的垂直网格线</li><li>grid-row-start 属性：上边框所在的水平网格线</li><li>grid-row-end 属性：下边框所在的水平网格线</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(100px, auto);
}
.one {
  grid-column-start: 1;
  grid-column-end: 2;
  background: #19CAAD;
}
.two { 
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  /*   如果有重叠，就使用 z-index */
  z-index: 1;
  background: #8CC7B5;
}
.three {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 4;
  background: #D1BA74;
}
.four {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 5;
  background: #BEE7E9;
}
.five {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 5;
  background: #E6CEAC;
}
.six {
  grid-column: 3;
  grid-row: 4;
  background: #ECAD9E;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，类 <code>.two</code> 所在的网格项目，垂直网格线是从 2 到 4，水平网格线是从 1 到 2。其中它跟 <code>.three</code> （垂直网格线是从3 到 4，水平网格线是从 1 到 4） 是有冲突的。可以设置 <code>z-index</code> 去决定它们的层级关系</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/173895928bc7e88e~tplv-t2oaga2asx-watermark.awebp" alt="img"></p><h3 id="grid-area-属性" tabindex="-1"><a class="header-anchor" href="#grid-area-属性" aria-hidden="true">#</a> grid-area 属性</h3><p><code>grid-area</code> 属性指定项目放在哪一个区域，在上面介绍 <code>grid-template-areas</code> 的时候有提到过，这里不再具体展开，具体的使用可以参考演示地址：</p>`,7),K={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FRwrObEJ",target:"_blank",rel:"noopener noreferrer"},L=e("h3",{id:"justify-self-属性、align-self-属性以及-place-self-属性",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#justify-self-属性、align-self-属性以及-place-self-属性","aria-hidden":"true"},"#"),i(" justify-self 属性、align-self 属性以及 place-self 属性")],-1),V={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FZEQZEJK%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},W=s(`<p><code>justify-self</code> 属性设置单元格内容的水平位置（左中右），跟 <code>justify-items</code> 属性的用法完全一致，但只作用于单个项目</p><p><code>align-self</code> 属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目</p><p>两者很相像，这里只拿 <code>justify-self</code> 属性演示，<code>align-self</code> 属性同理，只是作用于垂直方向。<code>place-self</code> 是设置 <code>align-self</code> 和 <code>justify-self</code> 的简写形式，这里也不重复介绍。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
复制代码
.item {
  justify-self: start;
}
.item-1 {
  justify-self: end;
}
.item-2 {
  justify-self: center;
}
.item-3 {
  justify-self: stretch;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>start：对齐单元格的起始边缘</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/1738959292160e78~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><ul><li>end：对齐单元格的结束边缘</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389592a0d5a3c0~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><ul><li><p>center：单元格内部居中</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389592b1378c8d~tplv-t2oaga2asx-watermark.awebp" alt="image"></p></li><li><p>stretch：拉伸，占满单元格的整个宽度（默认值）</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389592b895f0ed~tplv-t2oaga2asx-watermark.awebp" alt="image"></p></li></ul><h2 id="grid-实战——实现响应式布局" tabindex="-1"><a class="header-anchor" href="#grid-实战——实现响应式布局" aria-hidden="true">#</a> Grid 实战——实现响应式布局</h2><p>经过上面的介绍，相信大家都可以看出，Grid 是非常强大的。一些常见的 CSS 布局，如居中，两列布局，三列布局等等是很容易实现的。我们接下来看看 Grid 布局是如何实现响应式布局的</p><h3 id="fr-实现等分响应式" tabindex="-1"><a class="header-anchor" href="#fr-实现等分响应式" aria-hidden="true">#</a> fr 实现等分响应式</h3>`,12),I={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FwvMZKpB%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},J=s(`<p><code>fr</code> 等分单位，可以将容器的可用空间分成想要的多个等分空间。利用这个特性，我们能够轻易实现一个等分响应式。<code>grid-template-columns: 1fr 1fr 1fr</code> 表示容器分为三等分</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.wrapper</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 1fr 1fr 1fr<span class="token punctuation">;</span>
  <span class="token property">grid-gap</span><span class="token punctuation">:</span> 10px 20px<span class="token punctuation">;</span>
  <span class="token property">grid-auto-rows</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389592bf7e44dd~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><h3 id="repeat-auto-fit——固定列宽-改变列数量" tabindex="-1"><a class="header-anchor" href="#repeat-auto-fit——固定列宽-改变列数量" aria-hidden="true">#</a> repeat + auto-fit——固定列宽，改变列数量</h3><p>等分布局并不只有 <code>Grid</code> 布局才有，像 <code>flex</code> 布局也能轻松实现，接下来看看更高级的响应式</p><p>上面例子的始终都是三列的，但是需求往往希望我们的网格能够固定列宽，并根据容器的宽度来改变列的数量。这个时候，我们可以用到上面提到 <code>repeat()</code> 函数以及 <code>auto-fit</code> 关键字。<code>grid-template-columns: repeat(auto-fit, 200px)</code> 表示固定列宽为 200px，数量是自适应的，只要容纳得下，就会往上排列，代码以及效果实现如下：</p>`,6),M={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FeYJopVE%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},R=s(`<div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>.wrapper {
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389592c297495a~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><h3 id="repeat-auto-fit-minmax-去掉右侧空白" tabindex="-1"><a class="header-anchor" href="#repeat-auto-fit-minmax-去掉右侧空白" aria-hidden="true">#</a> repeat+auto-fit+minmax 去掉右侧空白</h3><p>上面看到的效果中，右侧通常会留下空白，这是我们不希望看到的。如果列的宽度也能在某个范围内自适应就好了。<code>minmax()</code> 函数就帮助我们做到了这点。将 <code>grid-template-columns: repeat(auto-fit, 200px)</code> 改成 <code>grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))</code> 表示列宽至少 200px，如果还有空余则一起等分。代码以及效果如下所示：</p>`,4),Q={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FdyGLYdQ",target:"_blank",rel:"noopener noreferrer"},X=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper {
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389592cc3c2bf9~tplv-t2oaga2asx-watermark.awebp" alt="auto-auto-minmax.gif"></p><h3 id="repeat-auto-fit-minmax-span-dense-解决空缺问题" tabindex="-1"><a class="header-anchor" href="#repeat-auto-fit-minmax-span-dense-解决空缺问题" aria-hidden="true">#</a> repeat+auto-fit+minmax-span-dense 解决空缺问题</h3><p>似乎一切进行得很顺利，但是某天 UI 来说，每个网格元素的长度可能不相同，这也简单，通过 <code>span</code> 关键字进行设置网格项目的跨度，<code>grid-column-start: span 3</code>，表示这个网格项目跨度为 3。具体的代码与效果如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.item-3 {
  grid-column-start: span 3;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),P={href:"https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FBajEoxy%3Feditors%3D1100",target:"_blank",rel:"noopener noreferrer"},U=s(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389592f9da3763~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><p>不对，怎么右侧又有空白了？原来是有一些长度太长了，放不下，这个时候就到我们的 <code>dense</code> 关键字出场了。<code>grid-auto-flow: row dense</code> 表示尽可能填充，而不留空白，代码以及效果如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.wrapper, .wrapper-1 {
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}

.wrapper-1 {
  grid-auto-flow: row dense;
}
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389593009f7fe7~tplv-t2oaga2asx-watermark.awebp" alt="image"></p><h2 id="grid-布局兼容性" tabindex="-1"><a class="header-anchor" href="#grid-布局兼容性" aria-hidden="true">#</a> Grid 布局兼容性</h2>`,5),H=e("code",null,"Grid",-1),$={href:"https://link.juejin.cn?target=https%3A%2F%2Fcaniuse.com%2F%23search%3Dgrid",target:"_blank",rel:"noopener noreferrer"},ee=e("p",null,[e("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/26/17389592fa541366~tplv-t2oaga2asx-watermark.awebp",alt:"image"})],-1),ie=e("h2",{id:"参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考","aria-hidden":"true"},"#"),i(" 参考")],-1),ne={href:"https://link.juejin.cn/?target=https%3A%2F%2Fgridbyexample.com%2Fexamples%2F",target:"_blank",rel:"noopener noreferrer"},ae={href:"https://link.juejin.cn/?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2019%2F03%2Fgrid-layout-tutorial.html",target:"_blank",rel:"noopener noreferrer"},se={href:"https://link.juejin.cn/?target=https%3A%2F%2Fdrafts.csswg.org%2Fcss-grid%2F%23intro",target:"_blank",rel:"noopener noreferrer"},de={href:"https://link.juejin.cn/?target=https%3A%2F%2Fwww.html.cn%2Farchives%2F8706",target:"_blank",rel:"noopener noreferrer"},re={href:"https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2FCSS_Grid_Layout%2FBasic_Concepts_of_Grid_Layout",target:"_blank",rel:"noopener noreferrer"};function te(le,ce){const n=l("ExternalLinkIcon");return r(),t("div",null,[o,p,u,e("p",null,[v,i(" 布局即网格布局，是一种新的 "),m,i(" 布局模型，比较擅长将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系。号称是最强大的的 "),g,i(" 布局方案，是目前唯一一种 "),b,i(" 二维布局。利用 "),x,i(" 布局，我们可以轻松实现类似下图布局，"),e("a",h,[i("演示地址"),a(n)])]),f,e("p",null,[i("我们使用 Grid 实现一个小例子，演示 Grid 的一些基础概念，"),e("a",w,[i("演示地址"),a(n)])]),j,e("p",null,[e("a",_,[i("display 属性演示"),a(n)])]),F,e("p",null,[e("a",y,[i("grid-template-columns 和 grid-template-rows 属性演示地址"),a(n)])]),k,e("p",null,[e("a",G,[i("grid-row-gap 属性、grid-column-gap 属性以及 grid-gap 属性演示地址"),a(n)])]),A,e("p",null,[e("a",q,[i("grid-area 以及 grid-template-areas演示地址"),a(n)])]),C,e("p",null,[e("a",E,[i("grid-auto-flow 属性演示地址"),a(n)])]),S,e("p",null,[e("a",D,[i("justify-items 属性、align-items 属性演示地址"),a(n)])]),B,e("p",null,[e("a",z,[i("justify-content 属性、align-content 属性演示地址"),a(n)])]),O,e("p",null,[e("a",T,[i("grid-auto-columns 属性和 grid-auto-rows 属性演示地址"),a(n)])]),Y,e("p",null,[e("a",N,[i("演示地址"),a(n)])]),Z,e("p",null,[e("a",K,[i("grid-area 以及 grid-template-areas 属性演示地址"),a(n)])]),L,e("p",null,[e("a",V,[i("justify-self 属性/ align-self 属性/ place-self 属性演示地址"),a(n)])]),W,e("p",null,[e("a",I,[i("fr 实现等分响应式"),a(n)])]),J,e("p",null,[e("a",M,[i("演示地址"),a(n)])]),R,e("p",null,[e("a",Q,[i("演示地址"),a(n)])]),X,e("p",null,[e("a",P,[i("演示地址"),a(n)])]),U,e("p",null,[i("最后，聊聊 "),H,i(" 布局兼容性问题，在 "),e("a",$,[i("caniuse"),a(n)]),i(" 中，我们可以看到的结果如下，总体兼容性还不错，但在 IE 10 以下不支持。个人建议在公司的内部系统运用起来是没有问题的，但 TOC 的话，可能目前还是不太合适")]),ee,ie,e("p",null,[e("a",ne,[i("常见的 Grid 布局用例"),a(n)])]),e("p",null,[e("a",ae,[i("CSS Grid 网格布局教程"),a(n)])]),e("p",null,[e("a",se,[i("Grid 布局草案"),a(n)])]),e("p",null,[e("a",de,[i("一行 CSS 代码实现响应式布局 – 使用 Grid 实现的响应式布局"),a(n)])]),e("p",null,[e("a",re,[i("MDN"),a(n)])])])}const ue=d(c,[["render",te],["__file","Grid 布局.html.vue"]]);export{ue as default};
