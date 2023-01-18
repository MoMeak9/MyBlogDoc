import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e as t}from"./app.d7b34baa.js";const p={},e=t(`<h1 id="typescript-笔记" tabindex="-1"><a class="header-anchor" href="#typescript-笔记" aria-hidden="true">#</a> TypeScript 笔记</h1><p><strong>⭐PS: 本内容不能作为入门学习使用，仅用于补充完善我个人对TS的知识点</strong></p><blockquote><p>TypeScript是拥有类型的JavaScript超集，它可以编译成普通、干净、完整的JavaScript代码</p></blockquote><h2 id="理解" tabindex="-1"><a class="header-anchor" href="#理解" aria-hidden="true">#</a> 理解</h2><ul><li>我们可以将TypeScript理解成加强版的JavaScript。</li><li>JavaScript所拥有的特性，TypeScript全部都是支持的，并且它紧随ECMAScript的标准，所以ES6、ES7、ES8等新语法标准，它都是 支持的；</li><li>并且在语言层面上，不仅仅增加了类型约束，而且包括一些语法的扩展，比如枚举类型（Enum）、元组类型（Tuple）等；</li><li>并且TypeScript最终会被编译成JavaScript代码，所以你并不需要担心它的兼容性问题，<strong>在编译时也不需要借助于Babel这样的工具；</strong></li></ul><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204091318973.png" alt="image-20220409131819866"></p><h2 id="类型" tabindex="-1"><a class="header-anchor" href="#类型" aria-hidden="true">#</a> 类型</h2><ul><li><p>number</p></li><li><p>boolean</p></li><li><p>string</p></li><li><p>Array</p></li><li><p>Object</p></li><li><p>Symbol</p></li><li><p>null</p></li><li><p>undefined</p></li><li><p>any</p></li><li><p>unknown ：是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量。</p></li><li><p>void：也就是函数可以返回null或者undefined</p></li><li><p>never：是一个死循环或者抛出一个异常</p></li><li><p>tuple元组：</p><p>数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中。（可以放在对象或者元组 中）</p><p>元组中每个元素都有自己特性的类型，根据索引值获取到的值可以确定对应的类型；</p></li></ul><h3 id="匿名函数的参数" tabindex="-1"><a class="header-anchor" href="#匿名函数的参数" aria-hidden="true">#</a> 匿名函数的参数</h3><p>匿名函数与函数声明会有一些不同：</p><ul><li>当一个函数出现在TypeScript可以确定该函数会被如何调用的地方时；该函数的参数会自动指定类型；</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> names <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
names<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>item <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们并没有指定item的类型，但是item是一个string类型：</p><ul><li><p>这是因为TypeScript会根据forEach函数的类型以及数组的类型推断出item的类型；</p></li><li><p>这个过程称之为上下文类型（contextual typing），因为函数执行的上下文可以帮助确定参数和返回值的类型；</p></li></ul><h3 id="联合类型" tabindex="-1"><a class="header-anchor" href="#联合类型" aria-hidden="true">#</a> 联合类型</h3><p>我们来使用第一种组合类型的方法：联合类型（Union Type）</p><ul><li>联合类型是由两个或者多个其他类型组成的类型；</li><li>表示可以是这些类型中的任何一个值；</li><li>联合类型中的每一个类型被称之为联合成员（union&#39;s members）；</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">printID</span><span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用联合类型</strong></p><p>但是我们拿到这个值之后，我们应该如何使用它呢？因为它可能是任何一种类型。比如我们拿到的值可能是string或者number，我们就不能对其调用string上的一些方法；</p><p><strong>使用缩小（narrow）联合</strong></p><p>TypeScript可以根据我们缩小的代码结构，推断出更加具体的类型；</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">printID</span><span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> id <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>id<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>可选类型补充</strong></p><p>可选类型可以看做是 类型 和 undefined 的联合类型：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">print</span><span class="token punctuation">(</span>message<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">print</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">//Argument of type &#39;null&#39; is not assignable to parameter of type &#39;string | undefined&#39;.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类型别名" tabindex="-1"><a class="header-anchor" href="#类型别名" aria-hidden="true">#</a> 类型别名</h3><p>在前面，我们通过在类型注解中编写 对象类型 和 联合类型，但是当我们想要多次在其他地方使用时，就要编写多 次。</p><p>比如我们可以给对象类型起一个别名：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// type用于定义类型别名(type alias)</span>
<span class="token keyword">type</span> <span class="token class-name">IDType</span> <span class="token operator">=</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">boolean</span>
<span class="token keyword">type</span> <span class="token class-name">PointType</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token builtin">number</span>
  y<span class="token operator">:</span> <span class="token builtin">number</span>
  z<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">printId</span><span class="token punctuation">(</span>id<span class="token operator">:</span> IDType<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">printPoint</span><span class="token punctuation">(</span>point<span class="token operator">:</span> PointType<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类型断言as" tabindex="-1"><a class="header-anchor" href="#类型断言as" aria-hidden="true">#</a> 类型断言as</h3><p>有时候TypeScript无法获取具体的类型信息，这个我们需要使用类型断言（Type Assertions）</p><p>比如我们通过 document.getElementById，TypeScript只知道该函数会返回 HTMLElement ，但并不知道它 具体的类型：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 1.类型断言 as</span>
<span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;why&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> HTMLImageElement
el<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&quot;url地址&quot;</span>


<span class="token comment">// 2.另外案例: Person是Student的父类</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  <span class="token function">studying</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">sayHello</span><span class="token punctuation">(</span>p<span class="token operator">:</span> Person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>p <span class="token keyword">as</span> Student<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">studying</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> stu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">sayHello</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>TypeScript只允许类型断言转换为 更具体 或者 不太具体 的类型版本，此规则可防止不可能的强制转换：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token string">&quot;Hello World&quot;</span>
<span class="token keyword">const</span> num<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token punctuation">(</span>message <span class="token keyword">as</span> <span class="token builtin">unknown</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">number</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="非空类型断言" tabindex="-1"><a class="header-anchor" href="#非空类型断言" aria-hidden="true">#</a> 非空类型断言 !</h3><p>非空断言使用的是 ! ，表示可以确定某个标识符是有值的，跳过ts在编译阶段对它的检测；</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// message? -&gt; undefined | string</span>
<span class="token keyword">function</span> <span class="token function">printMessageLength</span><span class="token punctuation">(</span>message<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// if (message) {</span>
  <span class="token comment">//   console.log(message.length)</span>
  <span class="token comment">// }</span>
  <span class="token comment">// vue3源码</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token operator">!</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">printMessageLength</span><span class="token punctuation">(</span><span class="token string">&quot;aaaa&quot;</span><span class="token punctuation">)</span>
<span class="token function">printMessageLength</span><span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="可选链的使用" tabindex="-1"><a class="header-anchor" href="#可选链的使用" aria-hidden="true">#</a> 可选链的使用</h3><p>可选链事实上并不是TypeScript独有的特性，它是ES11（ES2020）中增加的特性：</p><p>可选链使用可选链操作符 ?.；它的作用是当对象的属性不存在时，会短路，直接返回undefined，如果存在，那么才会继续执行；虽然可选链操作是ECMAScript提出的特性，但是和TypeScript一起使用更版本；</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Person</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  friend<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
    age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
    girlFriend<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      name<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> info<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&quot;why&quot;</span><span class="token punctuation">,</span>
  friend<span class="token operator">:</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&quot;kobe&quot;</span><span class="token punctuation">,</span>
    girlFriend<span class="token operator">:</span> <span class="token punctuation">{</span>
      name<span class="token operator">:</span> <span class="token string">&quot;lily&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">// 另外一个文件中</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token comment">// console.log(info.friend!.name)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span>friend<span class="token operator">?.</span>name<span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span>friend<span class="token operator">?.</span>age<span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span>friend<span class="token operator">?.</span>girlFriend<span class="token operator">?.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="和-的作用" tabindex="-1"><a class="header-anchor" href="#和-的作用" aria-hidden="true">#</a> ??和!!的作用</h3><p><strong>!!操作符：</strong></p><ul><li>将一个其他类型转换成boolean类型；</li><li>类似于Boolean(变量)的方式；</li></ul><p><strong>??操作符：</strong></p><ul><li>它是ES11增加的新特性；<strong>空值合并操作符（??）是一个逻辑操作符，当操作符的左侧是 null 或者 undefined 时，返回其右侧操作数， 否则返回左侧操作数；</strong></li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token operator">|</span><span class="token keyword">null</span> <span class="token operator">=</span> <span class="token string">&quot;Hello World&quot;</span>

<span class="token keyword">const</span> content <span class="token operator">=</span> message <span class="token operator">??</span> <span class="token string">&quot;你好啊, 李银河&quot;</span>
<span class="token comment">// const content = message ? message: &quot;你好啊, 李银河&quot;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字面量类型" tabindex="-1"><a class="header-anchor" href="#字面量类型" aria-hidden="true">#</a> 字面量类型</h3><p>默认情况下单独使用是没有太大的意义的，但是我们可以将多个类型联合在一起</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// &quot;Hello World&quot;也是可以作为类型的, 叫做字面量类型</span>
<span class="token keyword">const</span> message<span class="token operator">:</span> <span class="token string">&quot;Hello World&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;Hello World&quot;</span>

<span class="token comment">// let num: 123 = 123</span>
<span class="token comment">// num = 321</span>


<span class="token comment">// 字面量类型的意义, 就是必须结合联合类型</span>
<span class="token keyword">type</span> <span class="token class-name">Alignment</span> <span class="token operator">=</span> <span class="token string">&#39;left&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;right&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;center&#39;</span>

<span class="token keyword">let</span> align<span class="token operator">:</span> Alignment <span class="token operator">=</span> <span class="token string">&#39;left&#39;</span>
align <span class="token operator">=</span> <span class="token string">&#39;right&#39;</span>
align <span class="token operator">=</span> <span class="token string">&#39;center&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>字面量推理</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// const info = {</span>
<span class="token comment">//   name: &quot;why&quot;,</span>
<span class="token comment">//   age: 18</span>
<span class="token comment">// }</span>

<span class="token comment">// info.name = &quot;kobe&quot;</span>

<span class="token comment">// </span>

<span class="token keyword">type</span> <span class="token class-name">Method</span> <span class="token operator">=</span> <span class="token string">&#39;GET&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;POST&#39;</span>
<span class="token keyword">function</span> <span class="token function">request</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> method<span class="token operator">:</span> Method<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Request</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  method<span class="token operator">:</span> Method
<span class="token punctuation">}</span>
<span class="token comment">// 方法一</span>
<span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
  url<span class="token operator">:</span> <span class="token string">&quot;https://www.coderwhy.org/abc&quot;</span><span class="token punctuation">,</span>
  method<span class="token operator">:</span> <span class="token string">&quot;POST&quot;</span>
<span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token keyword">const</span>

<span class="token function">request</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>url<span class="token punctuation">,</span> options<span class="token punctuation">.</span>method<span class="token punctuation">)</span>

<span class="token comment">// 方法二</span>
<span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
    url<span class="token operator">:</span> <span class="token string">&quot;https://www.coderwhy.org/abc&quot;</span><span class="token punctuation">,</span>
    method<span class="token operator">:</span> <span class="token string">&quot;POST&quot;</span>
<span class="token punctuation">}</span>

<span class="token function">request</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>url<span class="token punctuation">,</span> options<span class="token punctuation">.</span>method <span class="token keyword">as</span> <span class="token string">&#39;GET&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类型缩小" tabindex="-1"><a class="header-anchor" href="#类型缩小" aria-hidden="true">#</a> 类型缩小</h3><p>在给定的执行路径中，我们可以缩小比声明时更小的类型，这个过程称之为 缩小;而我们编写的 typeof padding === &quot;number 可以称之为 类型保护（type guards）；</p><p>常见的类型保护有如下几种：</p><ul><li>typeof</li><li>平等缩小（比如===、!==）</li><li>instanceof</li><li>in</li><li>等等...</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 1.typeof的类型缩小</span>
<span class="token keyword">type</span> <span class="token class-name">IDType</span> <span class="token operator">=</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span>
<span class="token keyword">function</span> <span class="token function">printID</span><span class="token punctuation">(</span>id<span class="token operator">:</span> IDType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> id <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>id<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 2.平等的类型缩小(=== == !== !=/switch)</span>
<span class="token keyword">type</span> <span class="token class-name">Direction</span> <span class="token operator">=</span> <span class="token string">&quot;left&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;right&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;top&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;bottom&quot;</span>
<span class="token keyword">function</span> <span class="token function">printDirection</span><span class="token punctuation">(</span>direction<span class="token operator">:</span> Direction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 1.if判断</span>
  <span class="token comment">// if (direction === &#39;left&#39;) {</span>
  <span class="token comment">//   console.log(direction)</span>
  <span class="token comment">// } else if ()</span>

  <span class="token comment">// 2.switch判断</span>
  <span class="token comment">// switch (direction) {</span>
  <span class="token comment">//   case &#39;left&#39;:</span>
  <span class="token comment">//     console.log(direction)</span>
  <span class="token comment">//     break;</span>
  <span class="token comment">//   case ...</span>
  <span class="token comment">// }</span>
<span class="token punctuation">}</span>

<span class="token comment">// 3.instanceof</span>
<span class="token class-name"><span class="token keyword">function</span></span> <span class="token function">printTime</span><span class="token punctuation">(</span>time<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> Date<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>time <span class="token keyword">instanceof</span> <span class="token class-name">Date</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">toUTCString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
  <span class="token function">studying</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Teacher</span> <span class="token punctuation">{</span>
  <span class="token function">teaching</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">work</span><span class="token punctuation">(</span>p<span class="token operator">:</span> Student <span class="token operator">|</span> Teacher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token keyword">instanceof</span> <span class="token class-name">Student</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    p<span class="token punctuation">.</span><span class="token function">studying</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    p<span class="token punctuation">.</span><span class="token function">teaching</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> stu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">work</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span>

<span class="token comment">// 4. in</span>
<span class="token keyword">type</span> <span class="token class-name">Fish</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">swimming</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Dog</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">running</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">walk</span><span class="token punctuation">(</span>animal<span class="token operator">:</span> Fish <span class="token operator">|</span> Dog<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;swimming&#39;</span> <span class="token keyword">in</span> animal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    animal<span class="token punctuation">.</span><span class="token function">swimming</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    animal<span class="token punctuation">.</span><span class="token function">running</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> fish<span class="token operator">:</span> Fish <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">swimming</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;swimming&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">walk</span><span class="token punctuation">(</span>fish<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="typescript函数类型" tabindex="-1"><a class="header-anchor" href="#typescript函数类型" aria-hidden="true">#</a> TypeScript函数类型</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 1.函数作为参数时, 在参数中如何编写类型</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">FooFnType</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span>fn<span class="token operator">:</span> FooFnType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">bar</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>

<span class="token comment">// 2.定义常量时, 编写函数的类型</span>
<span class="token keyword">type</span> <span class="token class-name">AddFnType</span> <span class="token operator">=</span> <span class="token punctuation">(</span>num1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> num2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">number</span>
<span class="token keyword">const</span> add<span class="token operator">:</span> <span class="token function-variable function">AddFnType</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> a2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a1 <span class="token operator">+</span> a2
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>案例</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">calc</span><span class="token punctuation">(</span>n1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> n2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token punctuation">(</span>num1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> num2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> result1 <span class="token operator">=</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>a1<span class="token punctuation">,</span> a2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a1 <span class="token operator">+</span> a2
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result1<span class="token punctuation">)</span>

<span class="token keyword">const</span> result2 <span class="token operator">=</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>a1<span class="token punctuation">,</span> a2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a1 <span class="token operator">*</span> a2
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="this类型" tabindex="-1"><a class="header-anchor" href="#this类型" aria-hidden="true">#</a> this类型</h3><p>TypeScript进行类型检测的目的是让我们的代码更加的安全，会去推导使用的this是否安全合法。</p><h2 id="重载" tabindex="-1"><a class="header-anchor" href="#重载" aria-hidden="true">#</a> 重载</h2><h3 id="函数的重载" tabindex="-1"><a class="header-anchor" href="#函数的重载" aria-hidden="true">#</a> 函数的重载</h3><p>在TypeScript中，如果我们编写了一个add函数，希望可以对字符串和数字类型进行相加，应该如何编写呢？</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 函数的重载: 函数的名称相同, 但是参数不同的几个函数, 就是函数的重载</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>num1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> num2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// 没函数体</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>num1<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> num2<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>num1<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> num2<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> num1 <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> num2 <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num1<span class="token punctuation">.</span>length <span class="token operator">+</span> num2<span class="token punctuation">.</span>length
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> num1 <span class="token operator">+</span> num2
<span class="token punctuation">}</span>

<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> result2 <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;cba&quot;</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result2<span class="token punctuation">)</span>

<span class="token comment">// 在函数的重载中, 实现函数是不能直接被调用的</span>
<span class="token comment">// add({name: &quot;why&quot;}, {age: 18})</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="联合类型和重载" tabindex="-1"><a class="header-anchor" href="#联合类型和重载" aria-hidden="true">#</a> 联合类型和重载</h3><p>我们现在有一个需求：定义一个函数，可以传入字符串或者数组，获取它们的长度。</p><p>这里有两种实现方案：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 实现方式一: 联合类型</span>
<span class="token keyword">function</span> <span class="token function">getLength</span><span class="token punctuation">(</span>args<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> args<span class="token punctuation">.</span>length
<span class="token punctuation">}</span>


<span class="token comment">// 实现方式二: 函数的重载</span>
<span class="token keyword">function</span> <span class="token function">getLength</span><span class="token punctuation">(</span>args<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">getLength</span><span class="token punctuation">(</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">getLength</span><span class="token punctuation">(</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> args<span class="token punctuation">.</span>length
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="类的使用" tabindex="-1"><a class="header-anchor" href="#类的使用" aria-hidden="true">#</a> 类的使用</h2><h3 id="getters-setters" tabindex="-1"><a class="header-anchor" href="#getters-setters" aria-hidden="true">#</a> getters/setters</h3><p>在前面一些私有属性我们是不能直接访问的，或者某些属性我们想要监听它的获取(getter)和设置(setter)的过程， 这个时候我们可以使用存取器。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> _name<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_name <span class="token operator">=</span> name
  <span class="token punctuation">}</span>

  <span class="token comment">// 访问器setter/getter</span>
  <span class="token comment">// setter</span>
  <span class="token keyword">set</span> <span class="token function">name</span><span class="token punctuation">(</span>newName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_name <span class="token operator">=</span> newName
  <span class="token punctuation">}</span>
  <span class="token comment">// getter</span>
  <span class="token keyword">get</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_name
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;why&quot;</span><span class="token punctuation">)</span>
p<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;coderwhy&quot;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="静态成员" tabindex="-1"><a class="header-anchor" href="#静态成员" aria-hidden="true">#</a> 静态成员</h3><p>前面我们在类中定义的成员和方法都属于对象级别的, 在开发中, 我们有时候也需要定义类级别的成员和方法。在TypeScript中通过关键字static来定义：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> time<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;20:00&quot;</span>

  <span class="token keyword">static</span> <span class="token function">attendClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;去学习~&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Student<span class="token punctuation">.</span>time<span class="token punctuation">)</span>
Student<span class="token punctuation">.</span><span class="token function">attendClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="抽象类abstract" tabindex="-1"><a class="header-anchor" href="#抽象类abstract" aria-hidden="true">#</a> 抽象类abstract</h3><p>在TypeScript中没有具体实现的方法(没有方法体)，就是抽象方法</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>
<span class="token keyword">function</span> <span class="token function">makeArea</span><span class="token punctuation">(</span>shape<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> shape<span class="token punctuation">.</span><span class="token function">getArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
  <span class="token keyword">abstract</span> <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> width<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">private</span> height<span class="token operator">:</span> <span class="token builtin">number</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>width<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> width
    <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> height
  <span class="token punctuation">}</span>

  <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">*</span> <span class="token keyword">this</span><span class="token punctuation">.</span>height
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> r<span class="token operator">:</span> <span class="token builtin">number</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>r<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>r <span class="token operator">=</span> r
  <span class="token punctuation">}</span>

  <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>r <span class="token operator">*</span> <span class="token keyword">this</span><span class="token punctuation">.</span>r <span class="token operator">*</span> <span class="token number">3.14</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> rectangle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> circle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">makeArea</span><span class="token punctuation">(</span>rectangle<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">makeArea</span><span class="token punctuation">(</span>circle<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类的类型" tabindex="-1"><a class="header-anchor" href="#类的类型" aria-hidden="true">#</a> 类的类型</h3><p>类本身也是可以作为一种数据类型的：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;123&quot;</span>
  <span class="token function">eating</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> p1<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&quot;why&quot;</span><span class="token punctuation">,</span>
  <span class="token function">eating</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">printPerson</span><span class="token punctuation">(</span>p<span class="token operator">:</span> Person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">printPerson</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">printPerson</span><span class="token punctuation">(</span><span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">&quot;kobe&quot;</span><span class="token punctuation">,</span> <span class="token function-variable function">eating</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="可选属性-只读属性" tabindex="-1"><a class="header-anchor" href="#可选属性-只读属性" aria-hidden="true">#</a> 可选属性 只读属性</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 通过类型(type)别名来声明对象类型</span>
<span class="token comment">// type InfoType = {name: string, age: number}</span>

<span class="token comment">// 另外一种方式声明对象类型: 接口interface</span>
<span class="token comment">// 在其中可以定义可选类型</span>
<span class="token comment">// 也可以定义只读属性</span>
<span class="token keyword">interface</span> <span class="token class-name">IInfoType</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span>
  friend<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> info<span class="token operator">:</span> IInfoType <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&quot;why&quot;</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  friend<span class="token operator">:</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&quot;kobe&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span>friend<span class="token operator">?.</span>name<span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token comment">// info.name = &quot;123&quot;</span>
info<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">20</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="索引类型" tabindex="-1"><a class="header-anchor" href="#索引类型" aria-hidden="true">#</a> 索引类型</h3><p>前面我们使用interface来定义对象类型，这个时候其中的属性名、类型、方法都是确定的，但是有时候我们会遇 到类似下面的对象：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 通过interface来定义索引类型</span>
<span class="token keyword">interface</span> <span class="token class-name">IndexLanguage</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> frontLanguage<span class="token operator">:</span> IndexLanguage <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token number">0</span><span class="token operator">:</span> <span class="token string">&quot;HTML&quot;</span><span class="token punctuation">,</span>
  <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&quot;CSS&quot;</span><span class="token punctuation">,</span>
  <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&quot;JavaScript&quot;</span><span class="token punctuation">,</span>
  <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&quot;Vue&quot;</span>
<span class="token punctuation">}</span>


<span class="token keyword">interface</span> <span class="token class-name">ILanguageYear</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> languageYear<span class="token operator">:</span> ILanguageYear <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&quot;C&quot;</span><span class="token operator">:</span> <span class="token number">1972</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;Java&quot;</span><span class="token operator">:</span> <span class="token number">1995</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;JavaScript&quot;</span><span class="token operator">:</span> <span class="token number">1996</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;TypeScript&quot;</span><span class="token operator">:</span> <span class="token number">2014</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数类型" tabindex="-1"><a class="header-anchor" href="#函数类型" aria-hidden="true">#</a> 函数类型</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// type CalcFn = (n1: number, n2: number) =&gt; number</span>
<span class="token comment">// 可调用的接口</span>
<span class="token keyword">interface</span> <span class="token class-name">CalcFn</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>n1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> n2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">calc</span><span class="token punctuation">(</span>num1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> num2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> calcFn<span class="token operator">:</span> CalcFn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">calcFn</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> add<span class="token operator">:</span> <span class="token function-variable function">CalcFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> num1 <span class="token operator">+</span> num2
<span class="token punctuation">}</span>

<span class="token function">calc</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> add<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除非特别的情况，还是推荐大家使用类型别名来定义函数：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">CalcFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span>nums1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> num2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">number</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="接口继承" tabindex="-1"><a class="header-anchor" href="#接口继承" aria-hidden="true">#</a> 接口继承</h3><p>接口和类一样是可以进行继承的，也是使用extends关键字：</p><p>并且我们会发现，接口是支持多继承的**（类不支持多继承）**</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">ISwim</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">swimming</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">IFly</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">flying</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>


<span class="token keyword">interface</span> <span class="token class-name">IAction</span> <span class="token keyword">extends</span> <span class="token class-name">ISwim</span><span class="token punctuation">,</span> IFly <span class="token punctuation">{</span>

<span class="token punctuation">}</span>

<span class="token keyword">const</span> action<span class="token operator">:</span> IAction <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">swimming</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">flying</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="接口的实现" tabindex="-1"><a class="header-anchor" href="#接口的实现" aria-hidden="true">#</a> 接口的实现</h3><p>接口定义后，也是可以被类实现的：</p><ul><li>如果被一个类实现，那么在之后需要传入接口的地方，都可以将这个类传入；</li><li>这就是面向接口开发；</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
  
<span class="token punctuation">}</span>

<span class="token comment">// 继承: 只能实现单继承</span>
<span class="token comment">// 实现: 实现接口, 类可以实现多个接口</span>
<span class="token keyword">class</span> <span class="token class-name">Fish</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span> <span class="token keyword">implements</span> <span class="token class-name">ISwim</span><span class="token punctuation">,</span> IEat <span class="token punctuation">{</span>
  <span class="token function">swimming</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Fish Swmming&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">eating</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Fish Eating&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token keyword">implements</span> <span class="token class-name">ISwim</span> <span class="token punctuation">{</span>
  <span class="token function">swimming</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Person Swimming&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">// 编写一些公共的API: 面向接口编程</span>
<span class="token keyword">function</span> <span class="token function">swimAction</span><span class="token punctuation">(</span>swimable<span class="token operator">:</span> ISwim<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  swimable<span class="token punctuation">.</span><span class="token function">swimming</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 1.所有实现了接口的类对应的对象, 都是可以传入</span>
<span class="token function">swimAction</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Fish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">swimAction</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token function">swimAction</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token function-variable function">swimming</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="交叉类型" tabindex="-1"><a class="header-anchor" href="#交叉类型" aria-hidden="true">#</a> 交叉类型</h3><p>另外一种类型合并，就是交叉类型（Intersection Types）：</p><p>交叉类似表示需要满足多个类型的条件，交叉类型使用 &amp; 符号；</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 一种组合类型的方式: 联合类型</span>
<span class="token keyword">type</span> <span class="token class-name">WhyType</span> <span class="token operator">=</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span>
<span class="token keyword">type</span> <span class="token class-name">Direction</span> <span class="token operator">=</span> <span class="token string">&quot;left&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;right&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;center&quot;</span>


<span class="token comment">// 另一种组件类型的方式: 交叉类型</span>
<span class="token keyword">type</span> <span class="token class-name">WType</span> <span class="token operator">=</span> <span class="token builtin">number</span> <span class="token operator">&amp;</span> <span class="token builtin">string</span>

<span class="token keyword">interface</span> <span class="token class-name">ISwim</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">swimming</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">IFly</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">flying</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">MyType1</span> <span class="token operator">=</span> ISwim <span class="token operator">|</span> IFly
<span class="token keyword">type</span> <span class="token class-name">MyType2</span> <span class="token operator">=</span> ISwim <span class="token operator">&amp;</span> IFly <span class="token comment">// 需要同时实现</span>

<span class="token keyword">const</span> obj1<span class="token operator">:</span> MyType1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">flying</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> obj2<span class="token operator">:</span> MyType2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">swimming</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">flying</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="枚举类型" tabindex="-1"><a class="header-anchor" href="#枚举类型" aria-hidden="true">#</a> 枚举类型</h3><p>枚举类型是为数不多的TypeScript特性有的特性之一：</p><ul><li>枚举其实就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型；</li><li>枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型；</li></ul><p><strong>枚举类型的值</strong></p><p>枚举类型默认是有值的，比如上面的枚举，默认值是这样的:</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">enum</span> Direction <span class="token punctuation">{</span>
  <span class="token constant">LEFT</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token constant">RIGHT</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token constant">TOP</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token constant">BOTTOM</span> <span class="token operator">=</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// type Direction = &quot;left&quot; | &quot;Right&quot; | &quot;Top&quot; | &quot;Bottom&quot;</span>

<span class="token keyword">enum</span> Direction <span class="token punctuation">{</span>
  <span class="token constant">LEFT</span> <span class="token operator">=</span> <span class="token string">&quot;LEFT&quot;</span><span class="token punctuation">,</span>
  <span class="token constant">RIGHT</span> <span class="token operator">=</span> <span class="token string">&quot;RIGHT&quot;</span><span class="token punctuation">,</span>
  <span class="token constant">TOP</span> <span class="token operator">=</span> <span class="token string">&quot;TOP&quot;</span><span class="token punctuation">,</span>
  <span class="token constant">BOTTOM</span> <span class="token operator">=</span> <span class="token string">&quot;BOTTOM&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;abc&quot;</span>
<span class="token keyword">let</span> d<span class="token operator">:</span> Direction <span class="token operator">=</span> Direction<span class="token punctuation">.</span><span class="token constant">BOTTOM</span>

<span class="token keyword">function</span> <span class="token function">turnDirection</span><span class="token punctuation">(</span>direction<span class="token operator">:</span> Direction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>direction<span class="token punctuation">)</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>direction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> Direction<span class="token punctuation">.</span><span class="token constant">LEFT</span><span class="token operator">:</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;改变角色的方向向左&quot;</span><span class="token punctuation">)</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> Direction<span class="token punctuation">.</span><span class="token constant">RIGHT</span><span class="token operator">:</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;改变角色的方向向右&quot;</span><span class="token punctuation">)</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> Direction<span class="token punctuation">.</span><span class="token constant">TOP</span><span class="token operator">:</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;改变角色的方向向上&quot;</span><span class="token punctuation">)</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> Direction<span class="token punctuation">.</span><span class="token constant">BOTTOM</span><span class="token operator">:</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;改变角色的方向向下&quot;</span><span class="token punctuation">)</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">const</span> foo<span class="token operator">:</span> <span class="token builtin">never</span> <span class="token operator">=</span> direction<span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">turnDirection</span><span class="token punctuation">(</span>Direction<span class="token punctuation">.</span><span class="token constant">LEFT</span><span class="token punctuation">)</span>
<span class="token function">turnDirection</span><span class="token punctuation">(</span>Direction<span class="token punctuation">.</span><span class="token constant">RIGHT</span><span class="token punctuation">)</span>
<span class="token function">turnDirection</span><span class="token punctuation">(</span>Direction<span class="token punctuation">.</span><span class="token constant">TOP</span><span class="token punctuation">)</span>
<span class="token function">turnDirection</span><span class="token punctuation">(</span>Direction<span class="token punctuation">.</span><span class="token constant">BOTTOM</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="泛型" tabindex="-1"><a class="header-anchor" href="#泛型" aria-hidden="true">#</a> 泛型</h3><p>软件工程的主要目的是构建不仅仅明确和一致的API，还要让你的代码具有很强的可重用性：</p><ul><li>比如我们可以通过函数来封装一些API，通过传入不同的函数参数，让函数帮助我们完成不同的操作；但是对于参数的类型是否也可以参数化。</li></ul><p><strong>什么是类型的参数化？</strong></p><p>封装一个函数，传入一个参数，并且返回这个参数；</p><p>TS通过类型推到，自动推到出我们传入变量的类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 在定义这个函数时, 我不决定这些参数的类型</span>
<span class="token comment">// 而是让调用者以参数的形式告知,我这里的函数参数应该是什么类型</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">sum</span><span class="token generic class-name"><span class="token operator">&lt;</span>Type<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>num<span class="token operator">:</span> Type<span class="token punctuation">)</span><span class="token operator">:</span> Type <span class="token punctuation">{</span>
  <span class="token keyword">return</span> num
<span class="token punctuation">}</span>

<span class="token comment">// 1.调用方式一: 明确的传入类型</span>
<span class="token generic-function"><span class="token function">sum</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token generic-function"><span class="token function">sum</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">}</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">&quot;why&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token generic-function"><span class="token function">sum</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">// 2.调用方式二: 类型推到</span>
<span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token function">sum</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>平时在开发中我们可能会看到一些常用的名称：</strong></p><p>T：Type的缩写，类型</p><p>K、V：key和value的缩写，键值对</p><p>E：Element的缩写，元素</p><p>O：Object的缩写，对象</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">foo</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">E</span><span class="token punctuation">,</span> <span class="token constant">O</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>arg1<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> arg2<span class="token operator">:</span> <span class="token constant">E</span><span class="token punctuation">,</span> arg3<span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">O</span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>

<span class="token generic-function"><span class="token function">foo</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">boolean</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token string">&quot;abc&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="泛型接口" tabindex="-1"><a class="header-anchor" href="#泛型接口" aria-hidden="true">#</a> 泛型接口</h3><p>在定义接口的时候我们也可以使用泛型：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IPerson<span class="token operator">&lt;</span><span class="token constant">T1</span> <span class="token operator">=</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token constant">T2</span> <span class="token operator">=</span> <span class="token builtin">number</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token constant">T1</span>
  age<span class="token operator">:</span> <span class="token constant">T2</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> p<span class="token operator">:</span> IPerson <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&quot;why&quot;</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">18</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="泛型类" tabindex="-1"><a class="header-anchor" href="#泛型类" aria-hidden="true">#</a> 泛型类</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Point<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token constant">T</span>
  y<span class="token operator">:</span> <span class="token constant">T</span>
  z<span class="token operator">:</span> <span class="token constant">T</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> z<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x
    <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y
    <span class="token keyword">this</span><span class="token punctuation">.</span>z <span class="token operator">=</span> y
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token string">&quot;1.33.2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2.22.3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4.22.1&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Point<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&quot;1.33.2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2.22.3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4.22.1&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p3<span class="token operator">:</span> Point<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token string">&quot;1.33.2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2.22.3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4.22.1&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> names1<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;cba&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;nba&quot;</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> names2<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;cba&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;nba&quot;</span><span class="token punctuation">]</span> <span class="token comment">// 不推荐(react jsx &lt;&gt;)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="泛型约束" tabindex="-1"><a class="header-anchor" href="#泛型约束" aria-hidden="true">#</a> 泛型约束</h3><p>有时候我们希望传入的类型有某些共性，但是这些共性可能不是在同一种类型中：</p><ul><li>比如string和array都是有length的，或者某些对象也是会有length属性的；</li><li>那么只要是拥有length的属性都可以作为我们的参数类型，那么应该如何操作呢？</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">ILength</span> <span class="token punctuation">{</span>
  length<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">getLength</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> ILength<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>arg<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> arg<span class="token punctuation">.</span>length
<span class="token punctuation">}</span>

<span class="token function">getLength</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span>
<span class="token function">getLength</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;cba&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token function">getLength</span><span class="token punctuation">(</span><span class="token punctuation">{</span>length<span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块化开发" tabindex="-1"><a class="header-anchor" href="#模块化开发" aria-hidden="true">#</a> 模块化开发</h2><p>TypeScript支持两种方式来控制我们的作用域：</p><ul><li>模块化：每个文件可以是一个独立的模块，支持ES Module，也支持CommonJS；</li><li>命名空间：通过namespace来声明一个命名空间</li></ul><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204112144853.png" alt="image-20220411214442768"></p><h3 id="命名空间namespace" tabindex="-1"><a class="header-anchor" href="#命名空间namespace" aria-hidden="true">#</a> 命名空间namespace</h3><p>命名空间在TypeScript早期时，称之为内部模块，主要目的是将一个模块内部再进行作用域的划分，防止一些命名 冲突的问题。</p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204112145215.png" alt="image-20220411214531141"></p>`,144),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","TypeScript 笔记.html.vue"]]);export{k as default};
