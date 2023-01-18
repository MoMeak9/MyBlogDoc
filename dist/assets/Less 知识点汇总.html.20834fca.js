import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as e,e as s}from"./app.d7b34baa.js";const d={},l=s(`<blockquote><p>作者：SimonMa 链接：https://juejin.cn/post/6844903520441729037</p></blockquote><h1 id="less-知识点汇总" tabindex="-1"><a class="header-anchor" href="#less-知识点汇总" aria-hidden="true">#</a> Less 知识点汇总</h1><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2><p><strong>值变量</strong></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* Less */
@color: #999;
@bgColor: skyblue;//不要添加引号
@width: 50%;
#wrap {
  color: @color;
  background: @bgColor;
  width: @width;
}

/* 生成后的 CSS */
#wrap {
  color: #999;
  background: skyblue;
  width: 50%;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以 <code>@</code> 开头 定义变量，并且使用时 直接 键入 <code>@</code>名称。</p><p>在平时工作中，我们就可以把 常用的变量 封装到一个文件中，这样利于代码组织维护。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>@lightPrimaryColor: #c5cae9;
@textPrimaryColor: #fff;
@accentColor: rgb(99, 137, 185);
@primaryTextColor: #646464;
@secondaryTextColor: #000;
@dividerColor: #b6b6b6;
@borderColor: #dadada;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>选择器变量</strong></p><p>让 选择器 变成 动态</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* Less */
@mySelector: #wrap;
@Wrap: wrap;
@{mySelector}{ //变量名 必须使用大括号包裹
  color: #999;
  width: 50%;
}
.@{Wrap}{
  color:#ccc;
}
#@{Wrap}{
  color:#666;
}

/* 生成的 CSS */
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>属性变量</strong></p><p>可减少代码书写量</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* Less */
@borderStyle: border-style;
@Soild:solid;
#wrap{
  @{borderStyle}: @Soild;//变量名 必须使用大括号包裹
}

/* 生成的 CSS */
#wrap{
  border-style:solid;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>url 变量</strong></p><p>项目结构改变时，修改其变量即可。</p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* Less */
@images: &quot;../img&quot;;//需要加引号
body {
  background: url(&quot;@{images}/dog.png&quot;);//变量名 必须使用大括号包裹
}

/* 生成的 CSS */
body {
  background: url(&quot;../img/dog.png&quot;);
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>声明变量</strong></p><p>有点类似于 下面的 混合方法</p><ul><li>结构: @name: { 属性: 值 ;};</li><li>使用：@name();</li></ul><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* Less */
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

/* 生成的 CSS */
#main{
  background:red;
}
#con{
  width: 200px;
  height: 200px;
  border: solid 1px red;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>变量运算</strong></p><p>不得不提的是，Less 的变量运算完全超出我的期望，十分强大。</p><ul><li>加减法时 以第一个数据的单位为基准</li><li>乘除法时 注意单位一定要统一</li></ul><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* Less */
@width:300px;
@color:#222;
#wrap{
  width:@width-20;
  height:@width-20*5;
  margin:(@width-20)*5;
  color:@color*2;
  background-color:@color + #111;
}

/* 生成的 CSS */
#wrap{
  width:280px;
  height:200px;
  margin:1400px;
  color:#444;
  background-color:#333;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>变量作用域</strong></p><p>一句话理解就是：<strong>就近原则</strong>，不要跟我提闭包。</p><p><em>借助官网的Demo</em></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* Less */
@var: @a;
@a: 100%;
#wrap {
  width: @var;
  @a: 9%;
}

/* 生成的 CSS */
#wrap {
  width: 9%;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>用变量去定义变量</strong></p><div class="language-CSS line-numbers-mode" data-ext="CSS"><pre class="language-CSS"><code>/* Less */
@fnord:  &quot;I am fnord.&quot;;
@var:    &quot;fnord&quot;;
#wrap::after{
  content: @@var; //将@var替换为其值 content:@fnord;
}
/* 生成的 CSS */
#wrap::after{
  content: &quot;I am fnord.&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="嵌套" tabindex="-1"><a class="header-anchor" href="#嵌套" aria-hidden="true">#</a> 嵌套</h2><p><strong>&amp; 的妙用</strong></p><p>&amp; ：代表的上一层选择器的名字，此例便是<code>header</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
#header{
  &amp;:after{
    content:&quot;Less is more!&quot;;
  }
  .title{
    font-weight:bold;
  }
  &amp;_content{//理解方式：直接把 &amp; 替换成 #header
    margin:20px;
  }
}
/* 生成的 CSS */
#header::after{
  content:&quot;Less is more!&quot;;
}
#header .title{ //嵌套了
  font-weight:bold;
}
#header_content{//没有嵌套！
    margin:20px;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>媒体查询</strong></p><p>在以往的工作中，我们使用 媒体查询，都要把一个元素 分开写</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#wrap{
  width:500px;
}
@media screen and (max-width:768px){
  #wrap{
    width:100px;
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Less 提供了一个十分便捷的方式</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
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
/* 生成的 CSS */
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>唯一的缺点就是 每一个元素都会编译出自己 <code>@media</code> 声明，并不会合并。</p><p><strong>实战技巧</strong></p><p>可以借助 Less 在元素中，去定义自己的私有样式。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
#main{
  // something..
  &amp;.show{
    display:block;
  }
}
.show{
  display:none;
}

const main = document.getElementById(&quot;main&quot;);
main.classList.add(&quot;show&quot;);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#main.show{
  display:block;
}
.show{
  display:none; //会被覆盖。
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="混合方法" tabindex="-1"><a class="header-anchor" href="#混合方法" aria-hidden="true">#</a> 混合方法</h2><ol><li><p><strong>无参数方法</strong></p><p>方法犹如 声明的集合，使用时 直接键入名称即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
.card { // 等价于 .card()
    background: #f6f6f6;
    -webkit-box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
    box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
}
#wrap{
  .card;//等价于.card();
}
/* 生成的 CSS */
#wrap{
  background: #f6f6f6;
  -webkit-box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
  box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code>.card</code> 与 <code>.card()</code> 是等价的。 个人建议，为了避免 代码混淆，应写成 :</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.card(){
  //something...
}
#wrap{
  .card();
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要点：</p><ul><li><code>.</code> 与 <code>#</code> 皆可作为 方法前缀。</li><li>方法后写不写 <code>()</code> 看个人习惯。</li></ul></li><li><p><strong>默认参数方法</strong></p><ul><li>Less 可以使用默认参数，如果 没有传参数，那么将使用默认参数。</li><li><code>@arguments</code> 犹如 JS 中的 <code>arguments</code> 指代的是 全部参数。</li><li>传的参数中 必须带着单位。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
.border(@a:10px,@b:50px,@c:30px,@color:#000){
    border:solid 1px @color;
    box-shadow: @arguments;//指代的是 全部参数
}
#main{
    .border(0px,5px,30px,red);//必须带着单位
}
#wrap{
    .border(0px);
}
#content{
  .border;//等价于 .border()
}

/* 生成的 CSS */
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


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>方法的匹配模式</strong></p><p>与 面向对象中的多态 很相似</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
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
/* 生成的 CSS */
#main{
  border-color:transparent  transparent  transparent #999;
  border-style: solid;
  border-width: 50px;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要点</p><ul><li>第一个参数 <code>left</code> 要会找到方法中匹配程度最高的，如果匹配程度相同，将全部选择，并存在着样式覆盖替换。</li><li>如果匹配的参数 是变量，则将会匹配，如 <code>@_</code> 。</li></ul></li><li><p><strong>方法的命名空间</strong></p><p>让方法更加规范</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
#card(){
    background: #723232;
    .d(@w:300px){
        width: @w;
        
        #a(@h:300px){
            height: @h;//可以使用上一层传进来的方法
        }
    }
}
#wrap{
    #card &gt; .d &gt; #a(100px); // 父元素不能加 括号
}
#main{
    #card .d();
}
#con{
    //不得单独使用命名空间的方法
    //.d() 如果前面没有引入命名空间 #card ，将会报错
    
    #card; // 等价于 #card();
    .d(20px); //必须先引入 #card
}
/* 生成的 CSS */
#wrap{
  height:100px;
}
#main{
  width:300px;
}
#con{
  width:20px;
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要点</p><ul><li>在 CSS 中<code>&gt;</code> 选择器，选择的是 儿子元素，就是 必须与父元素 有直接血源的元素。</li><li>在引入命令空间时，如使用 <code>&gt;</code> 选择器，父元素不能加 括号。</li><li>不得单独使用命名空间的方法 必须先引入命名空间，才能使用 其中方法。</li><li>子方法 可以使用上一层传进来的方法</li></ul></li><li><p><strong>方法的条件筛选</strong></p><p>Less 没有 if else，可是它有 <code>when</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
#card{
    
    // and 运算符 ，相当于 与运算 &amp;&amp;，必须条件全部符合才会执行
    .border(@width,@color,@style) when (@width&gt;100px) and(@color=#999){
        border:@style @color @width;
    }

    // not 运算符，相当于 非运算 !，条件为 不符合才会执行
    .background(@color) when not (@color&gt;=#222){
        background:@color;
    }

    // , 逗号分隔符：相当于 或运算 ||，只要有一个符合条件就会执行
    .font(@size:20px) when (@size&gt;50px) , (@size&lt;100px){
        font-size: @size;
    }
}
#main{
    #card&gt;.border(200px,#999,solid);
    #card .background(#111);
    #card &gt; .font(40px);
}
/* 生成后的 CSS */
#main{
  border:solid #999 200px;
  background:#111;
  font-size:40px;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要点</p><ul><li>比较运算有： &gt; &gt;= = =&lt; &lt;。</li><li>= 代表的是等于</li><li>除去关键字 true 以外的值都被视为 false：</li></ul></li><li><p><strong>数量不定的参数</strong></p><p>如果你希望你的方法接受数量不定的参数，你可以使用... ，犹如 ES6 的扩展运算符。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
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

/* 生成后的 CSS */
#main{
  box-shadow: 1px 4px 30px red;
  text-shadow: 1px 4px 30px red;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>方法使用important！</strong></p><p>使用方法 非常简单，在方法名后 加上关键字即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
.border{
    border: solid 1px red;
    margin: 50px;
}
#main{
    .border() !important;
}
/* 生成后的 CSS */
#main {
    border: solid 1px red !important;
    margin: 50px !important;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>循环方法</strong></p><p>Less 并没有提供 for 循环功能，但这也难不倒 聪明的程序员，使用递归去实现。 下面是官网中的一个 Demo，模拟了生成栅格系统。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =&lt; @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
/* 生成后的 CSS */
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>属性拼接方法</strong></p><p><code>+_</code> 代表的是 空格；<code>+</code> 代表的是 逗号。</p><ul><li>逗号</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
.boxShadow() {
    box-shadow+: inset 0 0 10px #555;
}
.main {
  .boxShadow();
  box-shadow+: 0 0 20px black;
}
/* 生成后的 CSS */
.main {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>空格</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
.Animation() {
  transform+_: scale(2);
}
.main {
  .Animation();
  transform+_: rotate(15deg);
}

/* 生成的 CSS */
.main {
  transform: scale(2) rotate(15deg);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>实战技巧</strong></p><p>下面是官网中的一个非常赞的 Demo</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}

div {
  .average(16px, 50px); // 调用 方法
  padding: @average;    // 使用返回值
}

/* 生成的 CSS */
div {
  padding: 33px;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>可以说 Less 是一门优雅编程语言。</p><h2 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h2><p>extend 是 Less 的一个伪类。它可继承 所匹配声明中的全部样式。</p><ol><li><p><strong>extend 关键字的使用</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
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

/* 生成后的 CSS */
.animation,#main{
  transition: all .3s ease-out;
}
.animation .hide , #con{
    transform:scale(0);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>all 全局搜索替换</strong></p><p>使用选择器匹配到的 全部声明。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
#main{
  width: 200px;
}
#main {
  &amp;:after {
    content:&quot;Less is good!&quot;;
  }
}
#wrap:extend(#main all) {}

/* 生成的 CSS */
#main,#wrap{
  width: 200px;
}
#main:after, #wrap:after {
    content: &quot;Less is good!&quot;;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>减少代码的重复性</strong></p><p>从表面 看来，extend 与 方法 最大的差别，就是 extend 是同个选择器共用同一个声明，而 方法 是使用自己的声明，这无疑 增加了代码的重复性。</p><p>方法示例 与上面的 extend 进行对比：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
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

/* 生成的 CSS */
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


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>要点</strong></p><p><em>翻译官网</em></p><ul><li>选择器和扩展之间 是允许有空格的：pre:hover :extend(div pre).</li><li>可以有多个扩展: pre:hover:extend(div pre):extend(.bucket tr) - 注意这与 pre:hover:extend(div pre, .bucket tr)一样。</li><li>这是不可以的，扩展必须在最后 : pre:hover:extend(div pre).nth-child(odd)。</li><li>如果一个规则集包含多个选择器，所有选择器都可以使用extend关键字。</li></ul><h3 id="导入" tabindex="-1"><a class="header-anchor" href="#导入" aria-hidden="true">#</a> 导入</h3><ol><li>导入 less 文件 可省略后缀</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import &quot;main&quot;; 
//等价于
import &quot;main.less&quot;;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>@import</code> 的位置可随意放置</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#main{
  font-size:15px;
}
@import &quot;style&quot;;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>reference</strong></p><p>Less 中 最强大的特性 使用 引入的 Less 文件，但不会 编译它。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
@import (reference) &quot;bootstrap.less&quot;; 

#wrap:extend(.navbar all){}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>翻译官网：</p><blockquote><p>使用@import (reference)导入外部文件，但不会添加 把导入的文件 编译到最终输出中，只引用。</p></blockquote></li><li><p><strong>once</strong></p><blockquote><p>@import语句的默认行为。这表明相同的文件只会被导入一次，而随后的导入文件的重复代码都不会解析。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@import (once) &quot;foo.less&quot;;
@import (once) &quot;foo.less&quot;; // this statement will be ignored

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>multiple</strong></p><blockquote><p>使用@import (multiple)允许导入多个同名文件。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */

// file: foo.less
.a {
  color: green;
}
// file: main.less
@import (multiple) &quot;foo.less&quot;;
@import (multiple) &quot;foo.less&quot;;

/* 生成后的 CSS */
.a {
  color: green;
}
.a {
  color: green;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><p><strong>判断类型</strong></p><ul><li>isnumber</li></ul><blockquote><p>判断给定的值 是否 是一个数字。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>isnumber(#ff0);     // false
isnumber(blue);     // false
isnumber(&quot;string&quot;); // false
isnumber(1234);     // true
isnumber(56px);     // true
isnumber(7.8%);     // true
isnumber(keyword);  // false
isnumber(url(...)); // false

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>iscolor</li></ul><blockquote><p>判断给定的值 是否 是一个颜色。</p></blockquote><ul><li>isurl</li></ul><blockquote><p>判断给定的值 是否 是一个 url 。</p></blockquote><p><strong>颜色操作</strong></p><ul><li>saturate</li></ul><blockquote><p>增加一定数值的颜色饱和度。</p></blockquote><ul><li>lighten</li></ul><blockquote><p>增加一定数值的颜色亮度。</p></blockquote><ul><li>darken</li></ul><blockquote><p>降低一定数值的颜色亮度。</p></blockquote><ul><li>fade</li></ul><blockquote><p>给颜色设定一定数值的透明度。</p></blockquote><ul><li>mix</li></ul><blockquote><p>根据比例混合两种颜色。</p></blockquote><p><strong>数学函数</strong></p><ul><li>ceil</li></ul><blockquote><p>向上取整。</p></blockquote><ul><li>floor</li></ul><blockquote><p>向下取整。</p></blockquote><ul><li>percentage</li></ul><blockquote><p>将浮点数转换为百分比字符串。</p></blockquote><ul><li>round</li></ul><blockquote><p>四舍五入。</p></blockquote><ul><li>sqrt</li></ul><blockquote><p>计算一个数的平方根。</p></blockquote><ul><li>abs</li></ul><blockquote><p>计算数字的绝对值，原样保持单位。</p></blockquote><ul><li>pow</li></ul><blockquote><p>计算一个数的乘方。</p></blockquote><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h2><ol><li><p><strong>注释</strong></p><ul><li>/* */ CSS原生注释，会被编译在 CSS 文件中。</li><li>/ / Less提供的一种注释，不会被编译在 CSS 文件中。</li></ul></li><li><p><strong>避免编译</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
#main{
  width:~&#39;calc(300px-30px)&#39;;
}

/* 生成后的 CSS */
#main{
  width:calc(300px-30px);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结构： <code>~&#39; 值 &#39;</code></p></li><li><p><strong>变量拼串</strong></p><p>在平时工作中，这种需求 太常见了。 在下面例子中， 实现了不同的 transtion-delay、animation、@keyframes</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.judge(@i) when(@i=1){
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结构： <code>~&quot;字符@{变量}字符&quot;</code>;</p></li><li><p><strong>使用 JS</strong></p><p>因为 Less 是由 JS 编写，所以 Less 有一得天独厚的特性：代码中使用 Javascript 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Less */
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
/* 生成后的 CSS */

// 弹出 1
#wrap{
  width: 随机值（0~100）px;
  height: 743px;//由电脑而异
  background: 随机颜色;
}
#wrap::after{
  content:&quot;AAA&quot;;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>前几个月 ， 有个 <code>CSS in JS</code> 的概念非常火，现在 看来 <code>JS in CSS</code> 也未曾不可。 我觉得完全可以根据 Less 这个特性来造个轮子，JS来控制 CSS ，形成 动态属性，如果成功 很可能会改变 现在前端的打开姿势。</p><h2 id="与sass区别" tabindex="-1"><a class="header-anchor" href="#与sass区别" aria-hidden="true">#</a> 与SASS区别</h2><h4 id="_1、编译环境不一样" tabindex="-1"><a class="header-anchor" href="#_1、编译环境不一样" aria-hidden="true">#</a> 1、编译环境不一样</h4><p><code>Sass</code>的安装需要Ruby环境，是在<strong>服务端</strong>处理的。 <code>Less</code>是需要引入less.js来处理Less代码输出css到浏览器，也可以在开发环节使用Less，然后<strong>编译成css文件</strong>，直接放到项目中，也有 Less.app、SimpleLess、CodeKit.app这样的工具，也有在线编译地址。</p><h4 id="_2、变量符不一样" tabindex="-1"><a class="header-anchor" href="#_2、变量符不一样" aria-hidden="true">#</a> 2、变量符不一样</h4><p><code>SASS</code> 变量符是 $</p><p><code>LESS</code> 变量符是 @</p><h4 id="_3、变量的作用域也不一样" tabindex="-1"><a class="header-anchor" href="#_3、变量的作用域也不一样" aria-hidden="true">#</a> 3、变量的作用域也不一样</h4><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>Less-作用域
<span class="token atrule"><span class="token rule">@color</span><span class="token punctuation">:</span> #00c<span class="token punctuation">;</span></span> <span class="token comment">/* 蓝色 */</span>
<span class="token selector">#header</span> <span class="token punctuation">{</span>
  <span class="token atrule"><span class="token rule">@color</span><span class="token punctuation">:</span> #c00<span class="token punctuation">;</span></span> <span class="token comment">/* red */</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid <span class="token atrule"><span class="token rule">@color</span><span class="token punctuation">;</span></span> <span class="token comment">/* 红色边框 */</span>
<span class="token punctuation">}</span>

<span class="token selector">#footer</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid <span class="token atrule"><span class="token rule">@color</span><span class="token punctuation">;</span></span> <span class="token comment">/* 蓝色边框 */</span>
<span class="token punctuation">}</span>

<span class="token selector">Less-作用域编译后
#header</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #cc0000<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token selector">#footer</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #0000cc<span class="token punctuation">;</span><span class="token punctuation">}</span>

scss-作用域
$<span class="token property">color</span><span class="token punctuation">:</span> #00c<span class="token punctuation">;</span> <span class="token comment">/* 蓝色 */</span>

<span class="token selector">#header</span> <span class="token punctuation">{</span>
  $<span class="token property">color</span><span class="token punctuation">:</span> #c00<span class="token punctuation">;</span> <span class="token comment">/* red */</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid $color<span class="token punctuation">;</span> <span class="token comment">/* 红色边框 */</span>
<span class="token punctuation">}</span>

<span class="token selector">#footer</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid $color<span class="token punctuation">;</span> <span class="token comment">/* 蓝色边框 */</span>
<span class="token punctuation">}</span>

<span class="token selector">Sass-作用域编译后

#header</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #c00<span class="token punctuation">}</span>
<span class="token selector">#footer</span><span class="token punctuation">{</span><span class="token property">border</span><span class="token punctuation">:</span>1px solid #c00<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Less区分上下级作用域，SCSS为就近原则</p><p>我们可以看出来，less和scss中的变量会随着作用域的变化而不一样。</p><h4 id="_4、输出设置不同" tabindex="-1"><a class="header-anchor" href="#_4、输出设置不同" aria-hidden="true">#</a> 4、输出设置不同</h4><p><code>Sass</code>提供4中输出选项：<strong>nested</strong>, <strong>compact</strong>, <strong>compressed</strong> 和 <strong>expanded</strong>。</p><p>输出样式的风格可以有四种选择，默认为nested</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>nested：嵌套缩进的css代码
expanded：展开的多行css代码
compact：简洁格式的css代码
compressed：压缩后的css代码

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Less</code>没有输出设置</p><h4 id="_5、支持语句不同" tabindex="-1"><a class="header-anchor" href="#_5、支持语句不同" aria-hidden="true">#</a> 5、支持语句不同</h4><p><code>Sass</code>支持条件语句，可以使用if{}else{},for{}循环等等。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* Sample Sass “if” statement */

@if lightness($color) &gt; 30% {

} @else {

}

/* Sample Sass “for” loop */

@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Less</code>不支持。</p><h4 id="_6、引用外部-css-文件" tabindex="-1"><a class="header-anchor" href="#_6、引用外部-css-文件" aria-hidden="true">#</a> 6、引用外部 CSS 文件</h4><p><code>Scss</code>引用的外部文件命名必须以_开头, 如下例所示:其中_test1.scss、_test2.scss、_test3.scss文件分别设置的h1 h2 h3。文件名如果以下划线_开头的话，Sass会认为该文件是一个引用文件，不会将其编译为css文件.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 源代码：
@import &quot;_test1.scss&quot;;
@import &quot;_test2.scss&quot;;
@import &quot;_test3.scss&quot;;
// 编译后：
h1 {
  font-size: 17px;
}
 
h2 {
  font-size: 17px;
}
 
h3 {
  font-size: 17px;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Less</code>引用外部文件和css中的@import没什么差异。</p><h4 id="_7、工具库不同" tabindex="-1"><a class="header-anchor" href="#_7、工具库不同" aria-hidden="true">#</a> 7、工具库不同</h4><p><code>Sass</code>有工具库Compass, 简单说，Sass和Compass的关系有点像Javascript和jQuery的关系,Compass是Sass的工具库。在它的基础上，封装了一系列有用的模块和模板，补充强化了Sass的功能。</p><p><code>Less</code>有UI组件库Bootstrap,Bootstrap是web前端开发中一个比较有名的前端UI组件库，Bootstrap的样式文件部分源码就是采用Less语法编写。</p>`,116),a=[l];function r(v,c){return i(),e("div",null,a)}const o=n(d,[["render",r],["__file","Less 知识点汇总.html.vue"]]);export{o as default};
