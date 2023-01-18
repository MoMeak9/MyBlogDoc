import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as t,a as e,b as n,d as l,e as d,r as c}from"./app.d7b34baa.js";const o={},r=d(`<h1 id="call-apply-bind-深入解析" tabindex="-1"><a class="header-anchor" href="#call-apply-bind-深入解析" aria-hidden="true">#</a> call/apply/bind 深入解析</h1><h2 id="call-apply-bind的核心理念-借用方法" tabindex="-1"><a class="header-anchor" href="#call-apply-bind的核心理念-借用方法" aria-hidden="true">#</a> call/apply/bind的核心理念：借用方法</h2><p>看到一个非常棒的例子：</p><p>生活中：</p><p>平时没时间做饭的我，周末想给孩子炖个腌笃鲜尝尝。但是没有适合的锅，而我又不想出去买。所以就问邻居借了一个锅来用，这样既达到了目的，又节省了开支，一举两得。</p><p>程序中：</p><p>A对象有个方法，B对象因为某种原因也需要用到同样的方法，那么这时候我们是单独为 B 对象扩展一个方法呢，还是借用一下 A 对象的方法呢？</p><p>当然是借用 A 对象的方法啦，既达到了目的，又节省了内存。</p><p><strong>这就是call/apply/bind的核心理念：借用方法</strong>。</p><p><strong>借助已实现的方法，改变方法中数据的this指向，减少重复代码，节省内存。</strong></p><h2 id="call-apply-bind的基本介绍" tabindex="-1"><a class="header-anchor" href="#call-apply-bind的基本介绍" aria-hidden="true">#</a> call,apply,bind的基本介绍</h2><h4 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法：</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>fun.call(thisArg, param1, param2, ...)
fun.apply(thisArg, [param1,param2,...])
fun.bind(thisArg, param1, param2, ...)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="返回值" tabindex="-1"><a class="header-anchor" href="#返回值" aria-hidden="true">#</a> 返回值：</h4><p>call/apply：<code>fun</code>执行的结果 bind：返回<code>fun</code>的拷贝，并拥有指定的<code>this</code>值和初始参数</p><h4 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h4><p><code>thisArg</code>(可选):</p><ol><li><strong><code>fun</code>的<code>this</code>指向<code>thisArg</code>对象</strong></li><li>非严格模式下：thisArg指定为null，undefined，fun中的this指向window对象.</li><li>严格模式下：<code>fun</code>的<code>this</code>为<code>undefined</code></li><li>值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象，如 String、Number、Boolean</li></ol><p><code>param1,param2</code>(可选): 传给<code>fun</code>的参数。</p><ol><li>如果param不传或为 null/undefined，则表示不需要传入任何参数.</li><li>apply第二个参数为数组，数组内的值为传给<code>fun</code>的参数。</li></ol><h3 id="调用call-apply-bind的必须是个函数" tabindex="-1"><a class="header-anchor" href="#调用call-apply-bind的必须是个函数" aria-hidden="true">#</a> 调用<code>call</code>/<code>apply</code>/<code>bind</code>的必须是个函数</h3><p>call、apply和bind是挂在Function对象上的三个方法,只有函数才有这些方法。</p><p>只要是函数就可以，比如: <code>Object.prototype.toString</code>就是个函数，我们经常看到这样的用法：<code>Object.prototype.toString.call(data)</code></p><h3 id="作用" tabindex="-1"><a class="header-anchor" href="#作用" aria-hidden="true">#</a> 作用：</h3><p>改变函数执行时的this指向，目前所有关于它们的运用，都是基于这一点来进行的。</p><h3 id="如何不弄混call和apply" tabindex="-1"><a class="header-anchor" href="#如何不弄混call和apply" aria-hidden="true">#</a> 如何不弄混call和apply</h3><blockquote><p>弄混这两个API的不在少数，不要小看这个问题，记住下面的这个方法就好了。</p></blockquote><p><code>apply</code>是以<code>a</code>开头，它传给<code>fun</code>的参数是<code>Array</code>，也是以<code>a</code>开头的。</p><h3 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别：</h3><h4 id="call与apply的唯一区别" tabindex="-1"><a class="header-anchor" href="#call与apply的唯一区别" aria-hidden="true">#</a> call与apply的唯一区别</h4><p>传给<code>fun</code>的参数写法不同：</p><ul><li><code>apply</code>是第2个参数，这个参数是一个数组：传给<code>fun</code>参数都写在数组中。</li><li><code>call</code>从第2~n的参数都是传给<code>fun</code>的。</li></ul><h4 id="call-apply与bind的区别" tabindex="-1"><a class="header-anchor" href="#call-apply与bind的区别" aria-hidden="true">#</a> call/apply与bind的区别</h4><p><strong>执行</strong>：</p><ul><li>call/apply改变了函数的this上下文后马上<strong>执行该函数</strong></li><li>bind则是返回改变了上下文后的函数,<strong>不执行该函数</strong></li></ul><p><strong>返回值</strong>:</p><ul><li>call/apply 返回<code>fun</code>的执行结果</li><li>bind返回fun的拷贝，并指定了fun的this指向，保存了fun的参数。</li></ul><p>返回值这段在下方bind应用中有详细的示例解析。</p><h2 id="call和apply的应用场景" tabindex="-1"><a class="header-anchor" href="#call和apply的应用场景" aria-hidden="true">#</a> call和apply的应用场景：</h2><blockquote><p>这些应用场景，多加体会就可以发现它们的理念都是：借用方法</p></blockquote><ol><li>判断数据类型：</li></ol><p><code>Object.prototype.toString</code>用来判断类型再合适不过，借用它我们几乎可以判断所有类型的数据：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function isType(data, type) {
    const typeObj = {
        &#39;[object String]&#39;: &#39;string&#39;,
        &#39;[object Number]&#39;: &#39;number&#39;,
        &#39;[object Boolean]&#39;: &#39;boolean&#39;,
        &#39;[object Null]&#39;: &#39;null&#39;,
        &#39;[object Undefined]&#39;: &#39;undefined&#39;,
        &#39;[object Object]&#39;: &#39;object&#39;,
        &#39;[object Array]&#39;: &#39;array&#39;,
        &#39;[object Function]&#39;: &#39;function&#39;,
        &#39;[object Date]&#39;: &#39;date&#39;, // Object.prototype.toString.call(new Date())
        &#39;[object RegExp]&#39;: &#39;regExp&#39;,
        &#39;[object Map]&#39;: &#39;map&#39;,
        &#39;[object Set]&#39;: &#39;set&#39;,
        &#39;[object HTMLDivElement]&#39;: &#39;dom&#39;, // document.querySelector(&#39;#app&#39;)
        &#39;[object WeakMap]&#39;: &#39;weakMap&#39;,
        &#39;[object Window]&#39;: &#39;window&#39;,  // Object.prototype.toString.call(window)
        &#39;[object Error]&#39;: &#39;error&#39;, // new Error(&#39;1&#39;)
        &#39;[object Arguments]&#39;: &#39;arguments&#39;,
    }
    let name = Object.prototype.toString.call(data) // 借用Object.prototype.toString()获取数据类型
    let typeName = typeObj[name] || &#39;未知类型&#39; // 匹配数据类型
    return typeName === type // 判断该数据类型是否为传入的类型
}
console.log(
    isType({}, &#39;object&#39;), // true
    isType([], &#39;array&#39;), // true
    isType(new Date(), &#39;object&#39;), // false
    isType(new Date(), &#39;date&#39;), // true
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>类数组借用数组的方法：</li></ol><p>类数组因为不是真正的数组所有没有数组类型上自带的种种方法，所以我们需要去借用数组的方法。</p><p>比如借用数组的push方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var arrayLike = {
  0: &#39;OB&#39;,
  1: &#39;Koro1&#39;,
  length: 2
}
Array.prototype.push.call(arrayLike, &#39;添加元素1&#39;, &#39;添加元素2&#39;);
console.log(arrayLike) // {&quot;0&quot;:&quot;OB&quot;,&quot;1&quot;:&quot;Koro1&quot;,&quot;2&quot;:&quot;添加元素1&quot;,&quot;3&quot;:&quot;添加元素2&quot;,&quot;length&quot;:4}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>apply获取数组最大值最小值：</li></ol><p>apply直接传递数组做要调用方法的参数，也省一步展开数组，比如使用<code>Math.max</code>、<code>Math.min</code>来获取数组的最大值/最小值:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const arr = [15, 6, 12, 13, 16];
const max = Math.max.apply(Math, arr); // 16
const min = Math.min.apply(Math, arr); // 6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>继承</li></ol><p>ES5的继承也都是通过借用父类的构造方法来实现父类方法/属性的继承：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 父类
function supFather(name) {
    this.name = name;
    this.colors = [&#39;red&#39;, &#39;blue&#39;, &#39;green&#39;]; // 复杂类型
}
supFather.prototype.sayName = function (age) {
    console.log(this.name, &#39;age&#39;);
};
// 子类
function sub(name, age) {
    // 借用父类的方法：修改它的this指向,赋值父类的构造函数里面方法、属性到子类上
    supFather.call(this, name);
    this.age = age;
}
// 重写子类的prototype，修正constructor指向
function inheritPrototype(sonFn, fatherFn) {
    sonFn.prototype = Object.create(fatherFn.prototype); // 继承父类的属性以及方法
    sonFn.prototype.constructor = sonFn; // 修正constructor指向到继承的那个函数上
}
inheritPrototype(sub, supFather);
sub.prototype.sayAge = function () {
    console.log(this.age, &#39;foo&#39;);
};
// 实例化子类，可以在实例上找到属性、方法
const instance1 = new sub(&quot;OBKoro1&quot;, 24);
const instance2 = new sub(&quot;小明&quot;, 18);
instance1.colors.push(&#39;black&#39;)
console.log(instance1) // {&quot;name&quot;:&quot;OBKoro1&quot;,&quot;colors&quot;:[&quot;red&quot;,&quot;blue&quot;,&quot;green&quot;,&quot;black&quot;],&quot;age&quot;:24}
console.log(instance2) // {&quot;name&quot;:&quot;小明&quot;,&quot;colors&quot;:[&quot;red&quot;,&quot;blue&quot;,&quot;green&quot;],&quot;age&quot;:18} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似的应用场景还有很多，就不赘述了，关键在于它们借用方法的理念，不理解的话多看几遍。</p><h2 id="call、apply-该用哪个-、" tabindex="-1"><a class="header-anchor" href="#call、apply-该用哪个-、" aria-hidden="true">#</a> call、apply，该用哪个？、</h2><p>call,apply的效果完全一样，它们的区别也在于</p><ul><li><strong>参数数量/顺序确定就用call，参数数量/顺序不确定的话就用apply</strong>。</li><li>考虑可读性：参数数量不多就用call，参数数量比较多的话，把参数整合成数组，使用apply。</li><li>参数集合已经是一个数组的情况，用apply，比如上文的获取数组最大值/最小值。</li></ul><p>参数数量/顺序不确定的话就用apply，比如以下示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const obj = {
    age: 24,
    name: &#39;OBKoro1&#39;,
}
const obj2 = {
    age: 777
}
callObj(obj, handle)
callObj(obj2, handle)
// 根据某些条件来决定要传递参数的数量、以及顺序
function callObj(thisAge, fn) {
    let params = []
    if (thisAge.name) {
        params.push(thisAge.name)
    }
    if (thisAge.age) {
        params.push(thisAge.age)
    }
    fn.apply(thisAge, params) // 数量和顺序不确定 不能使用call
}
function handle(...params) {
    console.log(&#39;params&#39;, params) // do some thing
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bind的应用场景" tabindex="-1"><a class="header-anchor" href="#bind的应用场景" aria-hidden="true">#</a> bind的应用场景：</h2><h4 id="_1-保存函数参数" tabindex="-1"><a class="header-anchor" href="#_1-保存函数参数" aria-hidden="true">#</a> 1. 保存函数参数：</h4><p>首先来看下一道经典的面试题：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for (var i = 1; i &lt;= 5; i++) {
   setTimeout(function test() {
        console.log(i) // 依次输出：6 6 6 6 6
    }, i * 1000);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>造成这个现象的原因是等到<code>setTimeout</code>异步执行时,<code>i</code>已经变成6了。</p>`,64),u={href:"https://juejin.cn/post/6844903621872582669",target:"_blank",rel:"noopener noreferrer"},v=d(`<p>那么如何使他输出: 1,2,3,4,5呢？</p><p>方法有很多：</p><ul><li>闭包, 保存变量</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for (var i = 1; i &lt;= 5; i++) {
    (function (i) {
        setTimeout(function () {
            console.log(&#39;闭包:&#39;, i); // 依次输出：1 2 3 4 5
        }, i * 1000);
    }(i));
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里创建了一个闭包，每次循环都会把<code>i</code>的最新值传进去，然后被闭包保存起来。</p><ul><li><strong>bind</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for (var i = 1; i &lt;= 5; i++) {
    // 缓存参数
    setTimeout(function (i) {
        console.log(&#39;bind&#39;, i) // 依次输出：1 2 3 4 5
    }.bind(null, i), i * 1000);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实际上这里也用了闭包，我们知道bind会返回一个函数，这个函数也是闭包</strong>。</p><p>它保存了函数的this指向、初始参数，每次<code>i</code>的变更都会被bind的闭包存起来，所以输出1-5。</p><p>具体细节，下面有个手写bind方法，研究一下，就能搞懂了。</p><ul><li><code>let</code></li></ul>`,11),p=e("code",null,"let",-1),b=e("code",null,"i",-1),m=e("code",null,"let",-1),h=e("code",null,"setTimeout",-1),g={href:"https://link.juejin.cn?target=https%3A%2F%2Fsegmentfault.com%2Fq%2F1010000007541743",target:"_blank",rel:"noopener noreferrer"},x=e("h2",{id:"中高级面试题-手写call-apply、bind",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#中高级面试题-手写call-apply、bind","aria-hidden":"true"},"#"),n(" 中高级面试题-手写call/apply、bind：")],-1),y=e("p",null,"在大厂的面试中，手写实现call,apply,bind(特别是bind)一直是比较高频的面试题，在这里我们也一起来实现一下这几个函数。",-1),f=e("h4",{id:"你能手写实现一个call吗",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#你能手写实现一个call吗","aria-hidden":"true"},"#"),n(" 你能手写实现一个"),e("code",null,"call"),n("吗？")],-1),_=e("p",null,[e("strong",null,"思路")],-1),q=e("li",null,[n("根据call的规则设置上下文对象,也就是"),e("code",null,"this"),n("的指向。")],-1),j=e("code",null,"context",-1),w={href:"https://juejin.cn/post/6844903630592540686#heading-4",target:"_blank",rel:"noopener noreferrer"},A=e("li",null,"通过隐式绑定执行函数并传递参数。",-1),O=e("li",null,"删除临时属性，返回函数执行结果",-1),k=d(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Function.prototype.myCall = function (context, ...arr) {
    if (context === null || context === undefined) {
       // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
        context = window 
    } else {
        context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
    }
    const specialPrototype = Symbol(&#39;特殊属性Symbol&#39;) // 用于临时储存函数
    context[specialPrototype] = this; // 函数的this指向隐式绑定到context上
    let result = context[specialPrototype](...arr); // 通过隐式绑定执行函数并传递参数
    delete context[specialPrototype]; // 删除上下文对象的属性
    return result; // 返回函数执行结果
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="判断函数的上下文对象" tabindex="-1"><a class="header-anchor" href="#判断函数的上下文对象" aria-hidden="true">#</a> 判断函数的上下文对象：</h4><p>很多人判断函数上下文对象，只是简单的以<code>context</code>是否为false来判断,比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 判断函数上下文绑定到\`window\`不够严谨
context = context ? Object(context) : window; 
context = context || window; 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过测试,以下三种为false的情况,函数的上下文对象都会绑定到<code>window</code>上：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 网上的其他绑定函数上下文对象的方案: context = context || window; 
function handle(...params) {
    this.test = &#39;handle&#39;
    console.log(&#39;params&#39;, this, ...params) // do some thing
}
handle.elseCall(&#39;&#39;) // window
handle.elseCall(0) // window
handle.elseCall(false) // window

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而<code>call</code>则将函数的上下文对象会绑定到这些原始值的实例对象上：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/4/16c5bdb742a5f2b0~tplv-t2oaga2asx-watermark.awebp" alt="原始值的实例对象"></p><p>所以正确的解决方案，应该是像我上面那么做：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 正确判断函数上下文对象
    if (context === null || context === undefined) {
       // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
        context = window 
    } else {
        context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
    }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用symbol临时储存函数" tabindex="-1"><a class="header-anchor" href="#使用symbol临时储存函数" aria-hidden="true">#</a> 使用<code>Symbol</code>临时储存函数</h3><p>尽管之前用的属性是<code>testFn</code>但不得不承认，还是有跟上下文对象的原属性冲突的风险,经网友提醒使用<code>Symbol</code>就不会出现冲突了。</p><p>考虑兼容的话,还是用尽量特殊的属性，比如带上自己的ID：<code>OBKoro1TestFn</code>。</p><h4 id="你能手写实现一个apply吗" tabindex="-1"><a class="header-anchor" href="#你能手写实现一个apply吗" aria-hidden="true">#</a> 你能手写实现一个<code>apply</code>吗？</h4><p>思路：</p><ol><li>传递给函数的参数处理，不太一样，其他部分跟<code>call</code>一样。</li><li><code>apply</code>接受第二个参数为类数组对象, 这里用了JavaScript权威指南中判断是否为类数组对象的方法。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Function.prototype.myApply = function (context) {
    if (context === null || context === undefined) {
        context = window // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    } else {
        context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
    }
    // JavaScript权威指南判断是否为类数组对象
    function isArrayLike(o) {
        if (o &amp;&amp;                                    // o不是null、undefined等
            typeof o === &#39;object&#39; &amp;&amp;                // o是对象
            isFinite(o.length) &amp;&amp;                   // o.length是有限数值
            o.length &gt;= 0 &amp;&amp;                        // o.length为非负值
            o.length === Math.floor(o.length) &amp;&amp;    // o.length是整数
            o.length &lt; 4294967296)                  // o.length &lt; 2^32
            return true
        else
            return false
    }
    const specialPrototype = Symbol(&#39;特殊属性Symbol&#39;) // 用于临时储存函数
    context[specialPrototype] = this; // 隐式绑定this指向到context上
    let args = arguments[1]; // 获取参数数组
    let result
    // 处理传进来的第二个参数
    if (args) {
        // 是否传递第二个参数
        if (!Array.isArray(args) &amp;&amp; !isArrayLike(args)) {
            throw new TypeError(&#39;myApply 第二个参数不为数组并且不为类数组对象抛出错误&#39;);
        } else {
            args = Array.from(args) // 转为数组
            result = context[specialPrototype](...args); // 执行函数并展开数组，传递函数参数
        }
    } else {
        result = context[specialPrototype](); // 执行函数 
    }
    delete context[specialPrototype]; // 删除上下文对象的属性
    return result; // 返回函数执行结果
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="你能手写实现一个bind吗" tabindex="-1"><a class="header-anchor" href="#你能手写实现一个bind吗" aria-hidden="true">#</a> 你能手写实现一个<code>bind</code>吗？</h4><p><strong>划重点</strong>：</p><p>手写<code>bind</code>是大厂中的一个高频的面试题，如果面试的中高级前端，只是能说出它们的区别，用法并不能脱颖而出，理解要有足够的深度才能抱得offer归！</p><p><strong>思路</strong></p><ol><li>拷贝源函数: <ul><li>通过变量储存源函数</li><li>使用<code>Object.create</code>复制源函数的prototype给fToBind</li></ul></li><li>返回拷贝的函数</li><li>调用拷贝的函数： <ul><li>new调用判断：通过<code>instanceof</code>判断函数是否通过<code>new</code>调用，来决定绑定的<code>context</code></li><li>绑定this+传递参数</li><li>返回源函数的执行结果</li></ul></li></ol>`,22);function F(S,T){const i=c("ExternalLinkIcon");return s(),t("div",null,[r,e("p",null,[n("关于js事件循环机制不理解的同学，可以看我这篇博客："),e("a",u,[n("Js 的事件循环(Event Loop)机制以及实例讲解"),l(i)])]),v,e("p",null,[n("用"),p,n("声明"),b,n("也可以输出1-5: 因为"),m,n("是块级作用域,所以每次都会创建一个新的变量,所以"),h,n("每次读的值都是不同的,"),e("a",g,[n("详解"),l(i)]),n("。")]),x,y,f,_,e("ol",null,[q,e("li",null,[n("通过设置"),j,n("的属性,将函数的this指向"),e("a",w,[n("隐式绑定"),l(i)]),n("到context上")]),A,O]),k])}const E=a(o,[["render",F],["__file","深入解析call、apply、bind.html.vue"]]);export{E as default};
