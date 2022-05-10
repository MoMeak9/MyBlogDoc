import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9338189c.js";const a={},e=s(`<h1 id="javascript\u9AD8\u9891\u624B\u6495" tabindex="-1"><a class="header-anchor" href="#javascript\u9AD8\u9891\u624B\u6495" aria-hidden="true">#</a> JavaScript\u9AD8\u9891\u624B\u6495</h1><blockquote><p>\u53C2\u7167:</p><p>https://juejin.cn/post/7020562888657993741,</p><p>https://juejin.cn/post/7018337760687685669</p><p>\u4F5C\u8005\uFF1A\u524D\u7AEF\u80D6\u5934\u9C7C</p></blockquote><h2 id="_1-\u9632\u6296" tabindex="-1"><a class="header-anchor" href="#_1-\u9632\u6296" aria-hidden="true">#</a> 1. \u9632\u6296\u2B50</h2><blockquote><p>\u641C\u7D22\u573A\u666F\uFF0C\u81EA\u52A8\u641C\u7D22</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u9632\u6296\uFF1A\u53EF\u4EE5\u548C\u4F60\u7684\u7535\u8111\u8BBE\u5B9A\u4E8610\u5206\u949F\u7761\u7720\u65F6\u95F4\u7684\u573A\u666F\u7ED3\u5408\u8D77\u6765\u7406\u89E3
// \u5982\u679C\u4F60\u4E00\u76F4\u5728\u7528\u7535\u8111\uFF0C\u90A3\u4E48\u7535\u8111\u5C31\u4E0D\u4F1A\u7761\u7720\uFF08\u9891\u7E41\u7684\u628A\u524D\u4E00\u4E2A\u5B9A\u65F6\u5668\u5173\u6389\uFF0C\u5F00\u542F\u65B0\u7684\u5B9A\u65F6\u5668\uFF09
// \u5F53\u4F60\u6700\u540E\u4E00\u6B21\u6CA1\u64CD\u4F5C\u7535\u811110\u5206\u949F\u4E4B\u540E\uFF0C\u7535\u8111\u9677\u5165\u7761\u7720

const debounce = function (func, delay) {
  let timer = null

  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() =&gt; {
      func.apply(this, args)
    }, delay)
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="_2-\u8282\u6D41" tabindex="-1"><a class="header-anchor" href="#_2-\u8282\u6D41" aria-hidden="true">#</a> 2. \u8282\u6D41\u2B50</h2><blockquote><p>\u8282\u6D41\uFF1A \u4EFB\u51ED\u4F60\u600E\u4E48\u89E6\u53D1\uFF0C\u5176\u5728\u6307\u5B9A\u7684\u65F6\u95F4\u95F4\u9694\u5185\u53EA\u4F1A\u89E6\u53D1\u4E00\u6B21</p></blockquote><h3 id="\u57FA\u4E8E\u65F6\u95F4\u6233-\u65B9\u5F0F1" tabindex="-1"><a class="header-anchor" href="#\u57FA\u4E8E\u65F6\u95F4\u6233-\u65B9\u5F0F1" aria-hidden="true">#</a> \u57FA\u4E8E\u65F6\u95F4\u6233(\u65B9\u5F0F1)</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const throttle = function (func, delay) {
  let startTime = Date.now()

  return function (...args) {
    let lastTime = Date.now()

    if (lastTime - startTime &gt; delay) {
      func.apply(this, args)
      startTime = Date.now()
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="\u57FA\u4E8Esettimeout-\u65B9\u5F0F2" tabindex="-1"><a class="header-anchor" href="#\u57FA\u4E8Esettimeout-\u65B9\u5F0F2" aria-hidden="true">#</a> \u57FA\u4E8EsetTimeout(\u65B9\u5F0F2)</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const throttle = function (func, delay) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() =&gt; {
                func.apply(this, args);
                this.timer = null;
            }, delay)
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="_3-\u51FD\u6570\u67EF\u91CC\u5316" tabindex="-1"><a class="header-anchor" href="#_3-\u51FD\u6570\u67EF\u91CC\u5316" aria-hidden="true">#</a> 3. \u51FD\u6570\u67EF\u91CC\u5316\u2B50</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const curry = (func, ...args) =&gt; { // \u4F20\u53C2
    // \u83B7\u53D6\u51FD\u6570\u7684\u53C2\u6570\u4E2A\u6570
    const fnLen = func.length // \u76EE\u6807\u51FD\u6570\u53C2\u6570\u957F\u5EA6

    return function (...innerArgs) { // \u4F20\u53C2
        innerArgs = args.concat(innerArgs) // \u53C2\u6570\u6570\u7EC4\u5408\u5E76 \uFF01
        // \u53C2\u6570\u672A\u641C\u96C6\u8DB3\u7684\u8BDD\uFF0C\u7EE7\u7EED\u9012\u5F52\u641C\u96C6
        if (innerArgs.length &lt; fnLen) {
            return curry.call(this, func, ...innerArgs) // \u9012\u5F52\u4F20\u9012\uFF0Ccall\u89E3\u6784
            // return curry.apply(this, [func, ...innerArgs])
        } else {
            // \u5426\u5219\u62FF\u7740\u641C\u96C6\u7684\u53C2\u6570\u8C03\u7528func
            func.apply(this, innerArgs)
        }
    }
}
// \u6D4B\u8BD5
const add = curry((num1, num2, num3) =&gt; {
    console.log(num1, num2, num3, num1 + num2 + num3)
})

add(1)(2)(3) // 1 2 3 6
add(1, 2)(3) // 1 2 3 6
add(1, 2, 3) // 1 2 3 6
add(1)(2, 3) // 1 2 3 6
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h2 id="_4-bind" tabindex="-1"><a class="header-anchor" href="#_4-bind" aria-hidden="true">#</a> 4. bind</h2><blockquote><p><code>bind() </code> \u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u51FD\u6570\uFF0C\u5728 <code>bind()</code> \u88AB\u8C03\u7528\u65F6\uFF0C\u8FD9\u4E2A\u65B0\u51FD\u6570\u7684 <code>this</code> \u88AB\u6307\u5B9A\u4E3A <code>bind()</code> \u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u800C\u5176\u4F59\u53C2\u6570\u5C06\u4F5C\u4E3A\u65B0\u51FD\u6570\u7684\u53C2\u6570\uFF0C\u4F9B\u8C03\u7528\u65F6\u4F7F\u7528\u3002<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fbind" target="_blank" rel="noopener noreferrer">MDN</a></p></blockquote><p><a href="https://juejin.cn/post/7018337760687685669#heading-18" target="_blank" rel="noopener noreferrer">\u59D0\u59B9\u7BC7 call\u5B9E\u73B0</a></p><p><a href="https://juejin.cn/post/7018337760687685669#heading-19" target="_blank" rel="noopener noreferrer">\u59D0\u59B9\u7BC7 apply\u5B9E\u73B0</a></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>Function.prototype.bind2 = function (context, ...args) {
  if (typeof this !== &#39;function&#39;) {
    throw new TypeError(&#39;Bind must be called on a function&#39;)
  }

  const executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) {
      // \u5982\u679C\u8C03\u7528\u65B9\u5F0F\u4E0D\u662Fnew func\u7684\u5F62\u5F0F\u5C31\u76F4\u63A5\u8C03\u7528sourceFunc\uFF0C\u5E76\u4E14\u7ED9\u5230\u5BF9\u5E94\u7684\u53C2\u6570\u5373\u53EF
      return sourceFunc.apply(context, args)
    } else {
      // \u7C7B\u4F3C\u4E8E\u6267\u884Cnew\u7684\u51E0\u4E2A\u8FC7\u7A0B
      const self = Object.create(sourceFunc.prototype) // \u5904\u7406new\u8C03\u7528\u7684\u5F62\u5F0F
      const result = sourceFunc.apply(self, args)
      // \u5224\u65AD\u51FD\u6570\u6267\u884C\u540E\u7684\u8FD4\u56DE\u7ED3\u679C \u975E\u5BF9\u8C61\u51FD\u6570\uFF0C\u5219\u8FD4\u56DEself
      if (result &amp;&amp; typeof result === &#39;object&#39; || typeof result === &#39;function&#39;) {
        return result
      } else {
        return self
      }
    }
  }
  const func = this
  
  const bound = function (...innerArgs) {
    return executeBound(func, bound, context, this, args.concat(innerArgs))
  }

  return bound
}

// \u6D4B\u8BD5
// 1. \u666E\u901A\u8C03\u7528
const showName = function (sex, age) {
  console.log(this, sex, age)
}

showName.bind2({ name: &#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39; }, &#39;boy&#39;)(100) // { name: &#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39; } &#39;boy&#39; 100

// 2. new \u8C03\u7528
const Person = function (name) {
  this.name = name
}

Person.prototype.showName = function (age) {
  console.log(this, this.name, age)
}

const bindPerson = Person.bind(null, &#39;boy&#39;)
const p1 = new bindPerson(&#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;)

p1.showName(100) // Person { name: &#39;boy&#39; } &#39;boy&#39; 100
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><h2 id="_5-\u5B9E\u73B0\u4E00\u4E2A\u7B80\u6613\u7248\u6A21\u677F\u5F15\u64CE" tabindex="-1"><a class="header-anchor" href="#_5-\u5B9E\u73B0\u4E00\u4E2A\u7B80\u6613\u7248\u6A21\u677F\u5F15\u64CE" aria-hidden="true">#</a> 5. \u5B9E\u73B0\u4E00\u4E2A\u7B80\u6613\u7248\u6A21\u677F\u5F15\u64CE</h2><blockquote><p>jQuery\u65F6\u4EE3\uFF0C\u6A21\u677F\u5F15\u64CE\u7528\u7684\u8FD8\u662F\u6BD4\u8F83\u591A\u7684\uFF0C\u53EF\u4EE5\u7406\u89E3\u4E3A\u5B83\u662F\u8FD9\u6837\u4E00\u4E2A\u51FD\u6570\uFF0C\u901A\u8FC7\u6A21\u677F + \u6570\u636E\u7ECF\u8FC7\u4E00\u6BB5\u9ED1\u76D2\u64CD\u4F5C\u6700\u540E\u5F97\u5230\u9700\u8981\u5C55\u793A\u7684\u9875\u9762</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const render = (template, data) =&gt; {
  // \\s*?\u662F\u4E3A\u4E86\u517C\u5BB9{{name}} {{ name }}\u8FD9\u79CD\u5199\u6CD5
  return template.replace(/{{\\s*?(\\w+)\\s*?}}/g, (match, key) =&gt; {
    // \u5339\u914D\u4E2D\u4E86\u5219\u8BFB\u53D6\u66FF\u6362\uFF0C\u5426\u5219\u66FF\u6362\u4E3A\u7A7A\u5B57\u7B26\u4E32
    return key &amp;&amp; data.hasOwnProperty(key) ? data[ key ] : &#39;&#39;
  })
}
const data = {
  name: &#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;,
  age: 100
}
const template = \`
  \u6211\u662F: {{ name }}
  \u5E74\u9F84\u662F: {{age}}
\`
console.log(render(template, data))
/*
\u6211\u662F: \u524D\u7AEF\u80D6\u5934\u9C7C
\u5E74\u9F84\u662F: 100
*/
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="_6-\u7C7B\u6570\u7EC4\u8F6C\u5316\u4E3A\u6570\u7EC4\u76844\u79CD\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#_6-\u7C7B\u6570\u7EC4\u8F6C\u5316\u4E3A\u6570\u7EC4\u76844\u79CD\u65B9\u5F0F" aria-hidden="true">#</a> 6. \u7C7B\u6570\u7EC4\u8F6C\u5316\u4E3A\u6570\u7EC4\u76844\u79CD\u65B9\u5F0F</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u7C7B\u6570\u7EC4\u8F6C\u5316\u4E3A\u6570\u7EC4
const arrayLikeObj = {
    0: &#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;,
    1: 100,
    length: 2
}

// 1. [].slice
console.log([].slice.call(arrayLikeObj))
// 2. Array.from !
console.log(Array.from(arrayLikeObj)) 
// 3. Array.apply ! 
console.log(Array.apply(null, arrayLikeObj))
// 4. [].concat
console.log([].concat.apply([], arrayLikeObj))
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="_7-\u8BF7\u5B9E\u73B0-dom2json-\u4E00\u4E2A\u51FD\u6570-\u53EF\u4EE5\u628A\u4E00\u4E2A-dom-\u8282\u70B9\u8F93\u51FA-json-\u7684\u683C\u5F0F" tabindex="-1"><a class="header-anchor" href="#_7-\u8BF7\u5B9E\u73B0-dom2json-\u4E00\u4E2A\u51FD\u6570-\u53EF\u4EE5\u628A\u4E00\u4E2A-dom-\u8282\u70B9\u8F93\u51FA-json-\u7684\u683C\u5F0F" aria-hidden="true">#</a> 7. \u8BF7\u5B9E\u73B0 DOM2JSON \u4E00\u4E2A\u51FD\u6570\uFF0C\u53EF\u4EE5\u628A\u4E00\u4E2A DOM \u8282\u70B9\u8F93\u51FA JSON \u7684\u683C\u5F0F</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const dom2json = (rootDom) =&gt; {
    if (!rootDom) {
        return
    }
    
    let rootObj = {
        tagName: rootDom.tagName,
        children: []
    }
    
    const children = rootDom.children
    // \u8BFB\u53D6\u5B50\u8282\u70B9\uFF08\u5143\u7D20\u8282\u70B9\uFF09
    if (children &amp;&amp; children.length) {
        Array.from(children).forEach((ele, i) =&gt; {
            // \u9012\u5F52\u5904\u7406
            rootObj.children[ i ] = dom2json(ele)
        })
    }
    
    return rootObj
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="_8-\u5217\u8868\u8F6C\u6811\u5F62\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#_8-\u5217\u8868\u8F6C\u6811\u5F62\u7ED3\u6784" aria-hidden="true">#</a> 8. \u5217\u8868\u8F6C\u6811\u5F62\u7ED3\u6784</h2><blockquote><p>\u76F8\u4FE1\u5927\u5BB6\u5DE5\u4F5C\u4E2D\u4E5F\u9047\u5230\u8FC7\u7C7B\u4F3C\u7684\u95EE\u9898\uFF0C\u524D\u7AEF\u9700\u8981\u7684\u662F\u6811\u5F62\u7ED3\u6784\u7684\u6570\u636E\uFF0C\u4F46\u662F\u540E\u53F0\u8FD4\u56DE\u7684\u662F\u4E00\u4E2Alist\uFF0C\u6211\u4EEC\u9700\u8981\u5C06list\u8F6C\u5316\u4E3A\u6811\u5F62\u7ED3\u6784\uFF08\u5F53\u7136\u8FD9\u91CC\u4F60\u4E5F\u53EF\u4EE5\u628A\u4F60\u7684<code>\u540E\u7AEF\u540C\u5B66\u5E72\u556A</code>\u4E3A\u5565\u4E0D\u7ED9\u6211\u60F3\u8981\u7684\u6570\u636E\uFF09\u3002</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const arrayToTree = (array) =&gt; {
  const hashMap = {}
  let result = []

  array.forEach((it) =&gt; {
    const { id, pid } = it

    // \u4E0D\u5B58\u5728\u65F6\uFF0C\u5148\u58F0\u660Echildren\u6811\u5F62
    // \u8FD9\u4E00\u6B65\u4E5F\u6709\u53EF\u80FD\u5728\u4E0B\u9762\u51FA\u73B0
    if (!hashMap[id]) {
      hashMap[id] = {
        children: []
      }
    }

    hashMap[id] = {
      ...it,
      children: hashMap[id].children
    }
    // \u5904\u7406\u5F53\u524D\u7684item
    const treeIt = hashMap[id]

    // \u6839\u8282\u70B9\uFF0C\u76F4\u63A5push
    if (pid === 0) {
      result.push(treeIt)
    } else {
      // \u4E5F\u6709\u53EF\u80FD\u5F53\u524D\u8282\u70B9\u7684\u7236\u7236\u8282\u70B9\u8FD8\u6CA1\u6709\u52A0\u5165hashMap\uFF0C\u6240\u4EE5\u9700\u8981\u5355\u72EC\u5904\u7406\u4E00\u4E0B
      if (!hashMap[pid]) {
        hashMap[pid] = {
          children: []
        }
      }
      // \u975E\u6839\u8282\u70B9\u7684\u8BDD\uFF0C\u627E\u5230\u7236\u8282\u70B9\uFF0C\u628A\u81EA\u5DF1\u585E\u5230\u7236\u8282\u70B9\u7684children\u4E2D\u5373\u53EF
      hashMap[pid].children.push(treeIt)
    }
  })

  return result
}

// \u6D4B\u8BD5
const data = [
  // \u6CE8\u610F\u8FD9\u91CC\uFF0C\u4E13\u95E8\u628Apid\u4E3A1\u7684\u5143\u7D20\u653E\u4E00\u4E2A\u5728\u524D\u9762
  { id: 2, name: &#39;\u90E8\u95E82&#39;, pid: 1 },
  { id: 1, name: &#39;\u90E8\u95E81&#39;, pid: 0 },
  { id: 3, name: &#39;\u90E8\u95E83&#39;, pid: 1 },
  { id: 4, name: &#39;\u90E8\u95E84&#39;, pid: 3 },
  { id: 5, name: &#39;\u90E8\u95E85&#39;, pid: 4 },
  { id: 7, name: &#39;\u90E8\u95E87&#39;, pid: 6 },
]

console.log(JSON.stringify(arrayToTree(data), null, 2))
/*
[
  {
    &quot;id&quot;: 1,
    &quot;name&quot;: &quot;\u90E8\u95E81&quot;,
    &quot;pid&quot;: 0,
    &quot;children&quot;: [
      {
        &quot;id&quot;: 2,
        &quot;name&quot;: &quot;\u90E8\u95E82&quot;,
        &quot;pid&quot;: 1,
        &quot;children&quot;: []
      },
      {
        &quot;id&quot;: 3,
        &quot;name&quot;: &quot;\u90E8\u95E83&quot;,
        &quot;pid&quot;: 1,
        &quot;children&quot;: [
          {
            &quot;id&quot;: 4,
            &quot;name&quot;: &quot;\u90E8\u95E84&quot;,
            &quot;pid&quot;: 3,
            &quot;children&quot;: [
              {
                &quot;id&quot;: 5,
                &quot;name&quot;: &quot;\u90E8\u95E85&quot;,
                &quot;pid&quot;: 4,
                &quot;children&quot;: []
              }
            ]
          }
        ]
      }
    ]
  }
]
*/
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br></div></div><h2 id="_9-\u6811\u5F62\u7ED3\u6784\u8F6C\u5217\u8868" tabindex="-1"><a class="header-anchor" href="#_9-\u6811\u5F62\u7ED3\u6784\u8F6C\u5217\u8868" aria-hidden="true">#</a> 9. \u6811\u5F62\u7ED3\u6784\u8F6C\u5217\u8868</h2><blockquote><p>\u53CD\u8FC7\u6765\u4E5F\u53EF\u4EE5\u8BD5\u8BD5\u770B</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const tree2list = (tree) =&gt; {
  let list = []
  let queue = [...tree]

  while (queue.length) {
    // \u4ECE\u524D\u9762\u5F00\u59CB\u53D6\u51FA\u8282\u70B9
    const node = queue.shift()
    const children = node.children
    // \u53D6\u51FA\u5F53\u524D\u8282\u70B9\u7684\u5B50\u8282\u70B9\uFF0C\u653E\u5230\u961F\u5217\u4E2D\uFF0C\u7B49\u5F85\u4E0B\u4E00\u6B21\u5FAA\u73AF
    if (children.length) {
      queue.push(...children)
    }
    // \u5220\u9664\u591A\u4F59\u7684children\u6811\u5F62
    delete node.children
    // \u653E\u5165\u5217\u8868
    list.push(node)
  }

  return list
}

// \u6D4B\u8BD5
const data = [
  {
    &quot;id&quot;: 1,
    &quot;name&quot;: &quot;\u90E8\u95E81&quot;,
    &quot;pid&quot;: 0,
    &quot;children&quot;: [
      {
        &quot;id&quot;: 2,
        &quot;name&quot;: &quot;\u90E8\u95E82&quot;,
        &quot;pid&quot;: 1,
        &quot;children&quot;: []
      },
      {
        &quot;id&quot;: 3,
        &quot;name&quot;: &quot;\u90E8\u95E83&quot;,
        &quot;pid&quot;: 1,
        &quot;children&quot;: [
          {
            &quot;id&quot;: 4,
            &quot;name&quot;: &quot;\u90E8\u95E84&quot;,
            &quot;pid&quot;: 3,
            &quot;children&quot;: [
              {
                &quot;id&quot;: 5,
                &quot;name&quot;: &quot;\u90E8\u95E85&quot;,
                &quot;pid&quot;: 4,
                &quot;children&quot;: []
              }
            ]
          }
        ]
      }
    ]
  }
]

console.log(tree2list(data))
/*
[ 
  { id: 1, name: &#39;\u90E8\u95E81&#39;, pid: 0 },
  { id: 2, name: &#39;\u90E8\u95E82&#39;, pid: 1 },
  { id: 3, name: &#39;\u90E8\u95E83&#39;, pid: 1 },
  { id: 4, name: &#39;\u90E8\u95E84&#39;, pid: 3 },
  { id: 5, name: &#39;\u90E8\u95E85&#39;, pid: 4 } 
]
*/

\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br></div></div><h2 id="_10-sleep\u5EF6\u8FDF\u6267\u884C" tabindex="-1"><a class="header-anchor" href="#_10-sleep\u5EF6\u8FDF\u6267\u884C" aria-hidden="true">#</a> 10. sleep\u5EF6\u8FDF\u6267\u884C\u2B50</h2><blockquote><p>\u5B9E\u73B0\u4E00\u4E2A\u51FD\u6570\uFF0Cn\u79D2\u540E\u6267\u884C\u51FD\u6570func</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const sleep = (func, delay) =&gt; {
  return new Promise((resolve) =&gt; {
    setTimeout(() =&gt; {
      resolve(func())
    }, delay)
  })
}

const consoleStr = (str) =&gt; {
  return () =&gt; {
    console.log(str)
    return str
  }
}

const doFns = async () =&gt; {
  const name = await sleep(consoleStr(&#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;), 1000)
  const sex = await sleep(consoleStr(&#39;boy&#39;), 1000)
  const age = await sleep(consoleStr(100), 1000)

  console.log(name, sex, age)
}

doFns()
// \u524D\u7AEF\u80D6\u5934\u9C7C  1s later
// boy 2s later
// 100 3s later
// \u524D\u7AEF\u80D6\u5934\u9C7C boy 100
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h2 id="_11-\u83F2\u6CE2\u90A3\u5207\u6570\u5217" tabindex="-1"><a class="header-anchor" href="#_11-\u83F2\u6CE2\u90A3\u5207\u6570\u5217" aria-hidden="true">#</a> 11. \u83F2\u6CE2\u90A3\u5207\u6570\u5217\u2B50</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>\u6590\u6CE2\u90A3\u5951\u6570\uFF0C\u901A\u5E38\u7528 F(n) \u8868\u793A\uFF0C\u5F62\u6210\u7684\u5E8F\u5217\u79F0\u4E3A \u6590\u6CE2\u90A3\u5951\u6570\u5217 \u3002\u8BE5\u6570\u5217\u7531 0 \u548C 1 \u5F00\u59CB\uFF0C\u540E\u9762\u7684\u6BCF\u4E00\u9879\u6570\u5B57\u90FD\u662F\u524D\u9762\u4E24\u9879\u6570\u5B57\u7684\u548C\u3002\u4E5F\u5C31\u662F\uFF1A

F(0) = 0\uFF0CF(1) = 1
F(n) = F(n - 1) + F(n - 2)\uFF0C\u5176\u4E2D n &gt; 1
\u7ED9\u4F60 n \uFF0C\u8BF7\u8BA1\u7B97 F(n) \u3002


\u793A\u4F8B 1\uFF1A

\u8F93\u5165\uFF1A2
\u8F93\u51FA\uFF1A1
\u89E3\u91CA\uFF1AF(2) = F(1) + F(0) = 1 + 0 = 1
\u793A\u4F8B 2\uFF1A

\u8F93\u5165\uFF1A3
\u8F93\u51FA\uFF1A2
\u89E3\u91CA\uFF1AF(3) = F(2) + F(1) = 1 + 1 = 2
\u793A\u4F8B 3\uFF1A

\u8F93\u5165\uFF1A4
\u8F93\u51FA\uFF1A3
\u89E3\u91CA\uFF1AF(4) = F(3) + F(2) = 2 + 1 = 3
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="\u66B4\u529B\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u66B4\u529B\u5B9E\u73B0" aria-hidden="true">#</a> \u66B4\u529B\u5B9E\u73B0</h3><blockquote><p>\u6839\u636E\u9898\u76EE\u610F\u601D\uFF0C\u5F88\u5BB9\u6613\u5199\u51FA\u4E0B\u9762\u9012\u5F52\u7684\u66B4\u529B\u4EE3\u7801</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const fib = (n) =&gt; {
  if (n === 0) {
    return 0
  }

  if (n === 1 || n === 2) {
    return 1
  }

  return fib(n -2) + fib(n - 1)
}

// \u6D4B\u8BD5
console.log(fib(1)) // 1
console.log(fib(2)) // 1
// \u8BD5\u7740\u7EDF\u8BA1\u4E00\u4E0B\u8BA1\u7B97\u65F6\u95F4
const t1 = Date.now()
console.log(fib(44)) // 701408733
console.log(Date.now() - t1) // \u63A5\u8FD14393
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="\u7F13\u5B58\u4F18\u5316" tabindex="-1"><a class="header-anchor" href="#\u7F13\u5B58\u4F18\u5316" aria-hidden="true">#</a> \u7F13\u5B58\u4F18\u5316\u2B50</h3><blockquote><p>\u4E0A\u9762\u7684\u4EE3\u7801\u53EF\u4EE5\u5B9E\u73B0\u6548\u679C\uFF0C\u4F46\u662F\u6027\u80FD\u582A\u5FE7\uFF0C\u6765\u770B\u4E00\u4E2A\u8BA1\u7B97<code>fib(10)</code>\u7684\u8FC7\u7A0B</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// \u8BA1\u7B9710
10 =&gt; 9 + 8 // \u9700\u8981\u8BA1\u7B979\u548C8
9 =&gt; 8 + 7 // \u9700\u8981\u8BA1\u7B978\u548C7
8 =&gt; 7 + 6 // \u9700\u8981\u8BA1\u7B977\u548C6
7 =&gt; 6 + 5 // \u9700\u8981\u8BA1\u7B976\u548C5
6 =&gt; 5 + 4 // \u9700\u8981\u8BA1\u7B975\u548C4
5 =&gt; 4 + 3 // \u9700\u8981\u8BA1\u7B974\u548C3
4 =&gt; 3 + 2 // \u9700\u8981\u8BA1\u7B973\u548C2
2 =&gt; 1 + 0 // \u9700\u8981\u8BA1\u7B971\u548C0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>\u8FD9\u4E2A\u8FC7\u7A0B\u4E2D\u5982\u679C\u6309\u7167\u4E0A\u9762\u66B4\u529B\u5B9E\u73B0\u7684\u4EE3\u7801\u4F1A\u91CD\u590D\u591A\u6B21\u8BA1\u7B97\u67D0\u4E9B\u66FE\u7ECF\u8BA1\u7B97\u8FC7\u7684\u503C\uFF0C\u6BD4\u59828\u30017\u30016\u30015...\u7B49\u7B49\uFF0C\u8FD9\u4E2A\u635F\u8017\u662F\u6CA1\u6709\u5FC5\u8981\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u53EF\u4EE5\u628A\u8BA1\u7B97\u7684\u7ED3\u679C\u8FDB\u884C\u7F13\u5B58\uFF0C\u4E0B\u6B21\u9047\u5230\u6C42\u540C\u6837\u7684\u503C\uFF0C\u76F4\u63A5\u8FD4\u56DE\u5373\u53EF</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const fib = (n) =&gt; {
    // \u7F13\u5B58\u8FC7\u76F4\u63A5\u8FD4\u56DE
    if (fib[n]) {
        return fib[n]
    }

    if (n === 0) {
        return 0
    }

    if (n === 1 || n === 2) {
        return 1
    }

    const res = fib(n - 2) + fib(n - 1)
    // \u7F13\u5B58\u8BA1\u7B97\u7684\u7ED3\u679C
    fib[n] = res

    return res
}

console.log(fib(1)) // 1
console.log(fib(2)) // 1

const t1 = Date.now()
console.log(fib(44)) // 701408733
console.log(Date.now() - t1) // 1ms
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h2 id="_12-\u5B9E\u73B0\u4E00\u4E2A\u51FD\u6570sum\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_12-\u5B9E\u73B0\u4E00\u4E2A\u51FD\u6570sum\u51FD\u6570" aria-hidden="true">#</a> 12. \u5B9E\u73B0\u4E00\u4E2A\u51FD\u6570sum\u51FD\u6570</h2><blockquote><p>\u5B9E\u73B0\u4E00\u4E2A\u51FD\u6570sum\u51FD\u6570\u6EE1\u8DB3\u4EE5\u4E0B\u89C4\u5F8B</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>sum(1, 2, 3).valueOf() // 6 
sum(2, 3)(2).valueOf() // 7 
sum(1)(2)(3)(4).valueOf() // 10
sum(2)(4, 1)(2).valueOf() // 9
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>\u5206\u6790</strong></p><p>\u4ED4\u7EC6\u89C2\u5BDF\u8FD9\u51E0\u79CD\u8C03\u7528\u65B9\u5F0F\u53EF\u4EE5\u5F97\u5230\u4EE5\u4E0B\u4FE1\u606F</p><ol><li>sum\u51FD\u6570\u53EF\u4EE5\u4F20\u9012\u4E00\u4E2A\u6216\u8005\u591A\u4E2A\u53C2\u6570</li><li>sum\u51FD\u6570\u8C03\u7528\u540E\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u65B0\u7684\u51FD\u6570\u4E14\u53C2\u6570\u53EF\u4F20\u9012\u4E00\u4E2A\u6216\u8005\u591A\u4E2A</li><li>\u8C03\u7528.valueOf\u65F6\u5B8C\u6210\u6700\u540E\u8BA1\u7B97</li></ol><p>\u770B\u8D77\u6765\u662F\u4E0D\u662F\u6709\u70B9<code>\u51FD\u6570\u67EF\u91CC\u5316</code>\u7684\u611F\u89C9\uFF0C\u524D\u9762\u7684\u51FD\u6570\u8C03\u7528\u4EC5\u4EC5\u662F\u5728\u7F13\u5B58\u6BCF\u6B21\u8C03\u7528\u7684\u53C2\u6570\uFF0C\u800CvalueOf\u7684\u8C03\u7528\u5219\u662F\u62FF\u7740\u8FD9\u4E9B\u53C2\u6570\u8FDB\u884C\u4E00\u6B21\u6C42\u548C\u8FD0\u7B97\u5E76\u8FD4\u56DE\u7ED3\u679C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const sum = (...args) =&gt; {
  // \u58F0\u660Eadd\u51FD\u6570\uFF0C\u5176\u5B9E\u4E3B\u8981\u662F\u7F13\u5B58\u53C2\u6570\u7684\u4F5C\u7528
  // \u6CE8\u610Fadd\u8C03\u7528\u5B8C\u6210\u8FD8\u662F\u4F1A\u8FD4\u56DEadd\u51FD\u6570\u672C\u8EAB\uFF0C\u4F7F\u5176\u53EF\u4EE5\u94FE\u5F0F\u8C03\u7528
  const add = (...args2) =&gt; {
    args = [ ...args, ...args2 ]
    return add
  }
  // \u6C42\u548C\u8BA1\u7B97
  add.valueOf = () =&gt; args.reduce((ret, num) =&gt; ret + num, 0)

  return add
}

// \u6D4B\u8BD5
console.log(sum(1, 2, 3).valueOf()) // 6
console.log(sum(2, 3)(2).valueOf()) // 7
console.log(sum(1)(2)(3)(4).valueOf()) // 10
console.log(sum(2)(4, 1)(2).valueOf()) // 9
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="_1-\u5B9E\u73B0instanceof\u76843\u79CD\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-\u5B9E\u73B0instanceof\u76843\u79CD\u65B9\u5F0F" aria-hidden="true">#</a> 1. \u5B9E\u73B0instanceOf\u76843\u79CD\u65B9\u5F0F</h2><blockquote><p><code>instanceof</code> <strong>\u8FD0\u7B97\u7B26</strong>\u7528\u4E8E\u68C0\u6D4B\u6784\u9020\u51FD\u6570\u7684 <code>prototype</code> \u5C5E\u6027\u662F\u5426\u51FA\u73B0\u5728\u67D0\u4E2A\u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578B\u94FE\u4E0A\u3002<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Finstanceof" target="_blank" rel="noopener noreferrer">MDN\u4E0A</a></p></blockquote><p><strong>\u5173\u952E\u70B9:</strong> \u6784\u9020\u51FD\u6570Fn\u7684<code>prototype</code>\uFF0C\u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578B\u94FE\u3002</p><p>\u6240\u4EE5\u53EA\u8981\u904D\u5386\u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578B\u94FE\uFF0C\u6328\u4E2A\u5F80\u4E0A\u67E5\u627E\u770B\u662F\u5426\u6709\u4E0EFn\u7684<code>prototype</code>\u76F8\u7B49\u7684\u539F\u578B\uFF0C\u76F4\u5230\u6700\u9876\u5C42<code>Object</code>\u8FD8\u627E\u4E0D\u5230\uFF0C\u90A3\u4E48\u5C31\u8FD4\u56DEfalse\u3002</p><h3 id="\u9012\u5F52\u5B9E\u73B0-\u65B9\u5F0F1" tabindex="-1"><a class="header-anchor" href="#\u9012\u5F52\u5B9E\u73B0-\u65B9\u5F0F1" aria-hidden="true">#</a> \u9012\u5F52\u5B9E\u73B0(\u65B9\u5F0F1)</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * 
 * @param {*} obj \u5B9E\u4F8B\u5BF9\u8C61
 * @param {*} func \u6784\u9020\u51FD\u6570
 * @returns true false
 */
const instanceOf1 = (obj, func) =&gt; {
  // \u5FC5\u987B\u662F\u5BF9\u8C61\u6216\u8005\u51FD\u6570 
  if (!(obj &amp;&amp; [&#39;object&#39;, &#39;function&#39;].includes(typeof obj))) {
    return false
  }

  let proto = Object.getPrototypeOf(obj)

  if (proto === func.prototype) {
    return true
  } else if (proto === null) {
    return false
  } else {
    return instanceOf1(proto, func)
  }
}

// \u6D4B\u8BD5
let Fn = function () { }
let p1 = new Fn()

console.log(instanceOf1({}, Object)) // true
console.log(instanceOf1(p1, Fn)) // true
console.log(instanceOf1({}, Fn)) // false
console.log(instanceOf1(null, Fn)) // false
console.log(instanceOf1(1, Fn)) // false
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h3 id="\u904D\u5386\u5B9E\u73B0-\u65B9\u5F0F2" tabindex="-1"><a class="header-anchor" href="#\u904D\u5386\u5B9E\u73B0-\u65B9\u5F0F2" aria-hidden="true">#</a> \u904D\u5386\u5B9E\u73B0(\u65B9\u5F0F2)</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * 
 * @param {*} obj \u5B9E\u4F8B\u5BF9\u8C61
 * @param {*} func \u6784\u9020\u51FD\u6570
 * @returns true false
 */
const instanceOf2 = (obj, func) =&gt; {
  // \u5FC5\u987B\u662F\u5BF9\u8C61\u6216\u8005\u51FD\u6570 
  if (!(obj &amp;&amp; [&#39;object&#39;, &#39;function&#39;].includes(typeof obj))) {
    return false
  }

  let proto = obj

  while (proto = Object.getPrototypeOf(proto)) {
    if (proto === func.prototype) {
      return true
    }
  }

  return false
}

// \u6D4B\u8BD5
let Fn = function () { }
let p1 = new Fn()

console.log(instanceOf2({}, Object)) // true
console.log(instanceOf2(p1, Fn)) // true
console.log(instanceOf2({}, Fn)) // false
console.log(instanceOf2(null, Fn)) // false
console.log(instanceOf2(1, Fn)) // false

\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><h3 id="\u904D\u5386\u5B9E\u73B0-\u65B9\u5F0F3" tabindex="-1"><a class="header-anchor" href="#\u904D\u5386\u5B9E\u73B0-\u65B9\u5F0F3" aria-hidden="true">#</a> \u904D\u5386\u5B9E\u73B0(\u65B9\u5F0F3)</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * 
 * @param {*} obj \u5B9E\u4F8B\u5BF9\u8C61
 * @param {*} func \u6784\u9020\u51FD\u6570
 * @returns true false
 */
const instanceOf3 = (obj, func) =&gt; {
  // \u5FC5\u987B\u662F\u5BF9\u8C61\u6216\u8005\u51FD\u6570 
  if (!(obj &amp;&amp; [&#39;object&#39;, &#39;function&#39;].includes(typeof obj))) {
    return false
  }

  let proto = Object.getPrototypeOf(obj)
  // \u56E0\u4E3A\u4E00\u5B9A\u4F1A\u6709\u7ED3\u675F\u7684\u65F6\u5019\uFF08\u6700\u9876\u5C42Object\uFF09\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u662F\u6B7B\u5FAA\u73AF
  while (true) {
    if (proto === null) {
      return false
    } else if (proto === func.prototype) {
      return true
    } else {
      proto = Object.getPrototypeOf(proto)
    }
  }
}

// \u6D4B\u8BD5
let Fn = function () { }
let p1 = new Fn()

console.log(instanceOf3({}, Object)) // true
console.log(instanceOf3(p1, Fn)) // true
console.log(instanceOf3({}, Fn)) // false
console.log(instanceOf3(null, Fn)) // false
console.log(instanceOf3(1, Fn)) // false


\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h2 id="_2-\u5B9E\u73B0json-stringify-\u8D85\u8BE6\u7EC6" tabindex="-1"><a class="header-anchor" href="#_2-\u5B9E\u73B0json-stringify-\u8D85\u8BE6\u7EC6" aria-hidden="true">#</a> 2. \u5B9E\u73B0JSON.stringify(\u8D85\u8BE6\u7EC6)</h2><p>\u770B\u4EE3\u7801\u5B9E\u73B0\u524D\uFF0C\u53EF\u4EE5\u5148\u770B\u770B\u524D\u51E0\u5929\u5199\u7684\u4E00\u7BC7\u60B2\u4F24\u7684\u6545\u4E8B<a href="https://juejin.cn/post/7017588385615200270" target="_blank" rel="noopener noreferrer">\u5C31\u56E0\u4E3AJSON.stringify\uFF0C\u6211\u7684\u5E74\u7EC8\u5956\u5DEE\u70B9\u6253\u6C34\u6F02\u4E86</a></p><blockquote><p><code>JSON.stringify() </code> \u65B9\u6CD5\u5C06\u4E00\u4E2A JavaScript \u5BF9\u8C61\u6216\u503C\u8F6C\u6362\u4E3A JSON \u5B57\u7B26\u4E32\uFF0C\u5982\u679C\u6307\u5B9A\u4E86\u4E00\u4E2A replacer \u51FD\u6570\uFF0C\u5219\u53EF\u4EE5\u9009\u62E9\u6027\u5730\u66FF\u6362\u503C\uFF0C\u6216\u8005\u6307\u5B9A\u7684 replacer \u662F\u6570\u7EC4\uFF0C\u5219\u53EF\u9009\u62E9\u6027\u5730\u4EC5\u5305\u542B\u6570\u7EC4\u6307\u5B9A\u7684\u5C5E\u6027\u3002<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FJSON%2Fstringify" target="_blank" rel="noopener noreferrer">MDN</a></p></blockquote><blockquote><p><code>JSON.stringify</code>\u672C\u8EAB\u6709\u975E\u5E38\u591A\u7684\u8F6C\u6362\u89C4\u5219\u548C\u7279\u6027(\u8BE6\u60C5\u8BF7\u67E5\u770BMDN)\uFF0C\u8981\u5B8C\u6574\u5B9E\u73B0\u8FD8\u662F\u633A\u9EBB\u70E6\u7684\uFF08\u4E3A\u4E86\u5B9E\u73B0\u8FD9\u4E2A\u51FD\u6570<code>\u80D6\u5934\u9C7C</code>\u5FEB\u4E0D\u4F1A\u52A8\u4E86o(\u2565\uFE4F\u2565)o\uFF09</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const jsonstringify = (data) =&gt; {
  // \u786E\u8BA4\u4E00\u4E2A\u5BF9\u8C61\u662F\u5426\u5B58\u5728\u5FAA\u73AF\u5F15\u7528
  const isCyclic = (obj) =&gt; {
  // \u4F7F\u7528Set\u6570\u636E\u7C7B\u578B\u6765\u5B58\u50A8\u5DF2\u7ECF\u68C0\u6D4B\u8FC7\u7684\u5BF9\u8C61
  let stackSet = new Set()
  let detected = false

  const detect = (obj) =&gt; {
    // \u4E0D\u662F\u5BF9\u8C61\u7C7B\u578B\u7684\u8BDD\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8DF3\u8FC7
    if (obj &amp;&amp; typeof obj != &#39;object&#39;) {
      return
    }
    // \u5F53\u8981\u68C0\u67E5\u7684\u5BF9\u8C61\u5DF2\u7ECF\u5B58\u5728\u4E8EstackSet\u4E2D\u65F6\uFF0C\u8868\u793A\u5B58\u5728\u5FAA\u73AF\u5F15\u7528
    if (stackSet.has(obj)) {
      return detected = true
    }
    // \u5C06\u5F53\u524Dobj\u5B58\u5982stackSet
    stackSet.add(obj)

    for (let key in obj) {
      // \u5BF9obj\u4E0B\u7684\u5C5E\u6027\u8FDB\u884C\u6328\u4E2A\u68C0\u6D4B
      if (obj.hasOwnProperty(key)) {
        detect(obj[key])
      }
    }
    // \u5E73\u7EA7\u68C0\u6D4B\u5B8C\u6210\u4E4B\u540E\uFF0C\u5C06\u5F53\u524D\u5BF9\u8C61\u5220\u9664\uFF0C\u9632\u6B62\u8BEF\u5224
    /*
      \u4F8B\u5982\uFF1A\u5BF9\u8C61\u7684\u5C5E\u6027\u6307\u5411\u540C\u4E00\u5F15\u7528\uFF0C\u5982\u679C\u4E0D\u5220\u9664\u7684\u8BDD\uFF0C\u4F1A\u88AB\u8BA4\u4E3A\u662F\u5FAA\u73AF\u5F15\u7528
      let tempObj = {
        name: &#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;
      }
      let obj4 = {
        obj1: tempObj,
        obj2: tempObj
      }
    */
    stackSet.delete(obj)
  }

  detect(obj)

  return detected
}

  // \u7279\u6027\u4E03:
  // \u5BF9\u5305\u542B\u5FAA\u73AF\u5F15\u7528\u7684\u5BF9\u8C61\uFF08\u5BF9\u8C61\u4E4B\u95F4\u76F8\u4E92\u5F15\u7528\uFF0C\u5F62\u6210\u65E0\u9650\u5FAA\u73AF\uFF09\u6267\u884C\u6B64\u65B9\u6CD5\uFF0C\u4F1A\u629B\u51FA\u9519\u8BEF\u3002
  if (isCyclic(data)) {
    throw new TypeError(&#39;Converting circular structure to JSON&#39;)
  }

  // \u7279\u6027\u4E5D:
  // \u5F53\u5C1D\u8BD5\u53BB\u8F6C\u6362 BigInt \u7C7B\u578B\u7684\u503C\u4F1A\u629B\u51FA\u9519\u8BEF
  if (typeof data === &#39;bigint&#39;) {
    throw new TypeError(&#39;Do not know how to serialize a BigInt&#39;)
  }

  const type = typeof data
  const commonKeys1 = [&#39;undefined&#39;, &#39;function&#39;, &#39;symbol&#39;]
  const getType = (s) =&gt; {
    return Object.prototype.toString.call(s).replace(/\\[object (.*?)\\]/, &#39;$1&#39;).toLowerCase()
  }

  // \u975E\u5BF9\u8C61
  if (type !== &#39;object&#39; || data === null) {
    let result = data
    // \u7279\u6027\u56DB\uFF1A
    // NaN \u548C Infinity \u683C\u5F0F\u7684\u6570\u503C\u53CA null \u90FD\u4F1A\u88AB\u5F53\u505A null\u3002
    if ([NaN, Infinity, null].includes(data)) {
      result = &#39;null&#39;
      // \u7279\u6027\u4E00\uFF1A
      // \`undefined\`\u3001\`\u4EFB\u610F\u7684\u51FD\u6570\`\u4EE5\u53CA\`symbol\u503C\`\u88AB\`\u5355\u72EC\u8F6C\u6362\`\u65F6\uFF0C\u4F1A\u8FD4\u56DE undefined
    } else if (commonKeys1.includes(type)) {
      // \u76F4\u63A5\u5F97\u5230undefined\uFF0C\u5E76\u4E0D\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32&#39;undefined&#39;
      return undefined
    } else if (type === &#39;string&#39;) {
      result = &#39;&quot;&#39; + data + &#39;&quot;&#39;
    }

    return String(result)
  } else if (type === &#39;object&#39;) {
    // \u7279\u6027\u4E94:
    // \u8F6C\u6362\u503C\u5982\u679C\u6709 toJSON() \u65B9\u6CD5\uFF0C\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u4EC0\u4E48\u503C\u5C06\u88AB\u5E8F\u5217\u5316
    // \u7279\u6027\u516D:
    // Date \u65E5\u671F\u8C03\u7528\u4E86 toJSON() \u5C06\u5176\u8F6C\u6362\u4E3A\u4E86 string \u5B57\u7B26\u4E32\uFF08\u540CDate.toISOString()\uFF09\uFF0C\u56E0\u6B64\u4F1A\u88AB\u5F53\u505A\u5B57\u7B26\u4E32\u5904\u7406\u3002
    if (typeof data.toJSON === &#39;function&#39;) {
      return jsonstringify(data.toJSON())
    } else if (Array.isArray(data)) {
      let result = data.map((it) =&gt; {
        // \u7279\u6027\u4E00:
        // \`undefined\`\u3001\`\u4EFB\u610F\u7684\u51FD\u6570\`\u4EE5\u53CA\`symbol\u503C\`\u51FA\u73B0\u5728\`\u6570\u7EC4\`\u4E2D\u65F6\u4F1A\u88AB\u8F6C\u6362\u6210 \`null\`
        return commonKeys1.includes(typeof it) ? &#39;null&#39; : jsonstringify(it)
      })

      return \`[\${result}]\`.replace(/&#39;/g, &#39;&quot;&#39;)
    } else {
      // \u7279\u6027\u4E8C\uFF1A
      // \u5E03\u5C14\u503C\u3001\u6570\u5B57\u3001\u5B57\u7B26\u4E32\u7684\u5305\u88C5\u5BF9\u8C61\u5728\u5E8F\u5217\u5316\u8FC7\u7A0B\u4E2D\u4F1A\u81EA\u52A8\u8F6C\u6362\u6210\u5BF9\u5E94\u7684\u539F\u59CB\u503C\u3002
      if ([&#39;boolean&#39;, &#39;number&#39;].includes(getType(data))) {
        return String(data)
      } else if (getType(data) === &#39;string&#39;) {
        return &#39;&quot;&#39; + data + &#39;&quot;&#39;
      } else {
        let result = []
        // \u7279\u6027\u516B
        // \u5176\u4ED6\u7C7B\u578B\u7684\u5BF9\u8C61\uFF0C\u5305\u62EC Map/Set/WeakMap/WeakSet\uFF0C\u4EC5\u4F1A\u5E8F\u5217\u5316\u53EF\u679A\u4E3E\u7684\u5C5E\u6027
        Object.keys(data).forEach((key) =&gt; {
          // \u7279\u6027\u4E09:
          // \u6240\u6709\u4EE5symbol\u4E3A\u5C5E\u6027\u952E\u7684\u5C5E\u6027\u90FD\u4F1A\u88AB\u5B8C\u5168\u5FFD\u7565\u6389\uFF0C\u5373\u4FBF replacer \u53C2\u6570\u4E2D\u5F3A\u5236\u6307\u5B9A\u5305\u542B\u4E86\u5B83\u4EEC\u3002
          if (typeof key !== &#39;symbol&#39;) {
            const value = data[key]
            // \u7279\u6027\u4E00
            // \`undefined\`\u3001\`\u4EFB\u610F\u7684\u51FD\u6570\`\u4EE5\u53CA\`symbol\u503C\`\uFF0C\u51FA\u73B0\u5728\`\u975E\u6570\u7EC4\u5BF9\u8C61\`\u7684\u5C5E\u6027\u503C\u4E2D\u65F6\u5728\u5E8F\u5217\u5316\u8FC7\u7A0B\u4E2D\u4F1A\u88AB\u5FFD\u7565
            if (!commonKeys1.includes(typeof value)) {
              result.push(\`&quot;\${key}&quot;:\${jsonstringify(value)}\`)
            }
          }
        })

        return \`{\${result}}\`.replace(/&#39;/, &#39;&quot;&#39;)
      }
    }
  }
}

// \u5404\u79CD\u6D4B\u8BD5

// 1. \u6D4B\u8BD5\u4E00\u4E0B\u57FA\u672C\u8F93\u51FA
console.log(jsonstringify(undefined)) // undefined 
console.log(jsonstringify(() =&gt; { })) // undefined
console.log(jsonstringify(Symbol(&#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;))) // undefined
console.log(jsonstringify((NaN))) // null
console.log(jsonstringify((Infinity))) // null
console.log(jsonstringify((null))) // null
console.log(jsonstringify({
  name: &#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;,
  toJSON() {
    return {
      name: &#39;\u524D\u7AEF\u80D6\u5934\u9C7C2&#39;,
      sex: &#39;boy&#39;
    }
  }
}))
// {&quot;name&quot;:&quot;\u524D\u7AEF\u80D6\u5934\u9C7C2&quot;,&quot;sex&quot;:&quot;boy&quot;}

// 2. \u548C\u539F\u751F\u7684JSON.stringify\u8F6C\u6362\u8FDB\u884C\u6BD4\u8F83
console.log(jsonstringify(null) === JSON.stringify(null));
// true
console.log(jsonstringify(undefined) === JSON.stringify(undefined));
// true
console.log(jsonstringify(false) === JSON.stringify(false));
// true
console.log(jsonstringify(NaN) === JSON.stringify(NaN));
// true
console.log(jsonstringify(Infinity) === JSON.stringify(Infinity));
// true
let str = &quot;\u524D\u7AEF\u80D6\u5934\u9C7C&quot;;
console.log(jsonstringify(str) === JSON.stringify(str));
// true
let reg = new RegExp(&quot;\\w&quot;);
console.log(jsonstringify(reg) === JSON.stringify(reg));
// true
let date = new Date();
console.log(jsonstringify(date) === JSON.stringify(date));
// true
let sym = Symbol(&#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;);
console.log(jsonstringify(sym) === JSON.stringify(sym));
// true
let array = [1, 2, 3];
console.log(jsonstringify(array) === JSON.stringify(array));
// true
let obj = {
  name: &#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;,
  age: 18,
  attr: [&#39;coding&#39;, 123],
  date: new Date(),
  uni: Symbol(2),
  sayHi: function () {
    console.log(&quot;hello world&quot;)
  },
  info: {
    age: 16,
    intro: {
      money: undefined,
      job: null
    }
  },
  pakingObj: {
    boolean: new Boolean(false),
    string: new String(&#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;),
    number: new Number(1),
  }
}
console.log(jsonstringify(obj) === JSON.stringify(obj)) 
// true
console.log((jsonstringify(obj)))
// {&quot;name&quot;:&quot;\u524D\u7AEF\u80D6\u5934\u9C7C&quot;,&quot;age&quot;:18,&quot;attr&quot;:[&quot;coding&quot;,123],&quot;date&quot;:&quot;2021-10-06T14:59:58.306Z&quot;,&quot;info&quot;:{&quot;age&quot;:16,&quot;intro&quot;:{&quot;job&quot;:null}},&quot;pakingObj&quot;:{&quot;boolean&quot;:false,&quot;string&quot;:&quot;\u524D\u7AEF\u80D6\u5934\u9C7C&quot;,&quot;number&quot;:1}}
console.log(JSON.stringify(obj))
// {&quot;name&quot;:&quot;\u524D\u7AEF\u80D6\u5934\u9C7C&quot;,&quot;age&quot;:18,&quot;attr&quot;:[&quot;coding&quot;,123],&quot;date&quot;:&quot;2021-10-06T14:59:58.306Z&quot;,&quot;info&quot;:{&quot;age&quot;:16,&quot;intro&quot;:{&quot;job&quot;:null}},&quot;pakingObj&quot;:{&quot;boolean&quot;:false,&quot;string&quot;:&quot;\u524D\u7AEF\u80D6\u5934\u9C7C&quot;,&quot;number&quot;:1}}

// 3. \u6D4B\u8BD5\u53EF\u904D\u5386\u5BF9\u8C61
let enumerableObj = {}

Object.defineProperties(enumerableObj, {
  name: {
    value: &#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;,
    enumerable: true
  },
  sex: {
    value: &#39;boy&#39;,
    enumerable: false
  },
})

console.log(jsonstringify(enumerableObj))
// {&quot;name&quot;:&quot;\u524D\u7AEF\u80D6\u5934\u9C7C&quot;}

// 4. \u6D4B\u8BD5\u5FAA\u73AF\u5F15\u7528\u548CBigint

let obj1 = { a: &#39;aa&#39; }
let obj2 = { name: &#39;\u524D\u7AEF\u80D6\u5934\u9C7C&#39;, a: obj1, b: obj1 }
obj2.obj = obj2

console.log(jsonstringify(obj2))
// TypeError: Converting circular structure to JSON
console.log(jsonStringify(BigInt(1)))
// TypeError: Do not know how to serialize a BigInt

\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br></div></div><h2 id="_3-\u5B9E\u73B0\u4E00\u4E2Apromise" tabindex="-1"><a class="header-anchor" href="#_3-\u5B9E\u73B0\u4E00\u4E2Apromise" aria-hidden="true">#</a> 3. \u5B9E\u73B0\u4E00\u4E2APromise</h2><blockquote><p>\u7BC7\u5E45\u539F\u56E0\uFF0C\u8FD9\u91CC\u5C31\u4E0D\u4ECB\u7ECDPromise A+\u89C4\u8303\u4EE5\u53CA<code>then</code>\u51FD\u6570\u4E4B\u5916\u7684\u5176\u4ED6\u8BE6\u7EC6\u5B9E\u73B0\u4E86\uFF0C\u4E0B\u9762\u8FD9\u4E2A\u7248\u672C\u6211\u4E00\u822C\u5728\u9762\u8BD5\u4E2D\u5E38\u7528\uFF0C\u57FA\u672C\u76F4\u63A5\u901A\u8FC7\u3002</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>class MyPromise {
  constructor (exe) {
    // \u6700\u540E\u7684\u503C\uFF0CPromise .then\u6216\u8005.catch\u63A5\u6536\u7684\u503C
    this.value = undefined
    // \u72B6\u6001\uFF1A\u4E09\u79CD\u72B6\u6001 pending success failure
    this.status = &#39;pending&#39;
    // \u6210\u529F\u7684\u51FD\u6570\u961F\u5217
    this.successQueue = []
    // \u5931\u8D25\u7684\u51FD\u6570\u961F\u5217
    this.failureQueue = []
    const resolve = (value) =&gt; {
      const doResolve = () =&gt; {
        // \u5C06\u7F13\u5B58\u7684\u51FD\u6570\u961F\u5217\u6328\u4E2A\u6267\u884C\uFF0C\u5E76\u4E14\u5C06\u72B6\u6001\u548C\u503C\u8BBE\u7F6E\u597D
        if (this.status === &#39;pending&#39;) {
          this.status = &#39;success&#39;
          this.value = value
  
          while (this.successQueue.length) {
            const cb = this.successQueue.shift()
  
            cb &amp;&amp; cb(this.value)
          }
        }
      }

      setTimeout(doResolve, 0)
    }

    const reject = (value) =&gt; {
      // \u57FA\u672C\u540Cresolve
      const doReject = () =&gt; {
        if (this.status === &#39;pending&#39;) {
          this.status = &#39;failure&#39;
          this.value = value
  
          while (this.failureQueue.length) {
            const cb = this.failureQueue.shift()
  
            cb &amp;&amp; cb(this.value)
          }
        }
      }

      setTimeout(doReject, 0)
    }

    exe(resolve, reject)
  }
  
  then (success = (value) =&gt; value, failure = (value) =&gt; value) {
    // .then\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u65B0\u7684Promise
    return new MyPromise((resolve, reject) =&gt; {
      // \u5305\u88C5\u56DE\u5230\u51FD\u6570
      const successFn = (value) =&gt; {
        try {
          const result = success(value)
          // \u5982\u679C\u7ED3\u679C\u503C\u662F\u4E00\u4E2APromise\uFF0C\u90A3\u4E48\u9700\u8981\u5C06\u8FD9\u4E2APromise\u7684\u503C\u7EE7\u7EED\u5F80\u4E0B\u4F20\u9012\uFF0C\u5426\u5219\u76F4\u63A5resolve\u5373\u53EF
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }
      // \u57FA\u672C\u7B52\u6210\u529F\u56DE\u8C03\u51FD\u6570\u7684\u5C01\u88C5
      const failureFn = (value) =&gt; {
        try {
          const result = failure(value)
          
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }
      // \u5982\u679CPromise\u7684\u72B6\u6001\u8FD8\u672A\u7ED3\u675F\uFF0C\u5219\u5C06\u6210\u529F\u548C\u5931\u8D25\u7684\u51FD\u6570\u7F13\u5B58\u5230\u961F\u5217\u91CC
      if (this.status === &#39;pending&#39;) {
        this.successQueue.push(successFn)
        this.failureQueue.push(failureFn)
        // \u5982\u679C\u5DF2\u7ECF\u6210\u529F\u7ED3\u675F\uFF0C\u76F4\u63A5\u6267\u884C\u6210\u529F\u56DE\u8C03 
      } else if (this.status === &#39;success&#39;) {
        success(this.value)
      } else {
        // \u5982\u679C\u5DF2\u7ECF\u5931\u8D25\uFF0C\u76F4\u63A5\u6267\u884C\u5931\u8D25\u56DE\u8C03
        failure(this.value)
      }
    })
  }
  // \u5176\u4ED6\u51FD\u6570\u5C31\u4E0D\u4E00\u4E00\u5B9E\u73B0\u4E86
  catch () {

  }
} 
// \u4EE5\u4E0B\u4E3E\u4E2A\u4F8B\u5B50\uFF0C\u9A8C\u8BC1\u4E00\u4E0B\u4EE5\u4E0A\u5B9E\u73B0\u7684\u7ED3\u679C
const pro = new MyPromise((resolve, reject) =&gt; {
  setTimeout(resolve, 1000)
  setTimeout(reject, 2000)
})

pro
  .then(() =&gt; {
    console.log(&#39;2_1&#39;)
    const newPro = new MyPromise((resolve, reject) =&gt; {
      console.log(&#39;2_2&#39;)
      setTimeout(reject, 2000)
    })
    console.log(&#39;2_3&#39;)
    return newPro
  })
  .then(
    () =&gt; {
      console.log(&#39;2_4&#39;)
    },
    () =&gt; {
      console.log(&#39;2_5&#39;)
    }
  )
  
pro
  .then(
    data =&gt; {
      console.log(&#39;3_1&#39;)
      throw new Error()
    },
    data =&gt; {
      console.log(&#39;3_2&#39;)
    }
  )
  .then(
    () =&gt; {
      console.log(&#39;3_3&#39;)
    },
    e =&gt; {
      console.log(&#39;3_4&#39;)
    }
  )
// 2_1
// 2_2
// 2_3
// 3_1
// 3_4
// 2_5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br></div></div><h2 id="_4-\u5B9E\u73B0\u591A\u7EF4\u6570\u7EC4\u6241\u5E73\u5316\u76843\u79CD\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#_4-\u5B9E\u73B0\u591A\u7EF4\u6570\u7EC4\u6241\u5E73\u5316\u76843\u79CD\u65B9\u5F0F" aria-hidden="true">#</a> 4. \u5B9E\u73B0\u591A\u7EF4\u6570\u7EC4\u6241\u5E73\u5316\u76843\u79CD\u65B9\u5F0F \u2B50</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>
/**
 * 
 * @param {*} array \u6DF1\u5C42\u5D4C\u5957\u7684\u6570\u636E
 * @returns array \u65B0\u6570\u7EC4
 */
const flat1 = (array) =&gt; {
  return array.reduce((result, it) =&gt; {
    return result.concat(Array.isArray(it) ? flat1(it) : it)
  }, [])
}

// \u6D4B\u8BD5
let arr1 = [
  1,
  [ 2, 3, 4 ],
  [ 5, [ 6, [ 7, [ 8 ] ] ] ]
]
console.log(flat1(arr1)) // [1, 2, 3, 4, 5, 6, 7, 8]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/**
 * 
 * @param {*} array \u6DF1\u5C42\u5D4C\u5957\u7684\u6570\u636E
 * @returns array \u65B0\u6570\u7EC4
 */
 
const flat2 = (array) =&gt; {
  const result = []
  // \u5C55\u5F00\u4E00\u5C42
  const stack = [ ...array ] // \u5229\u7528stack\u5B58\u50A8\u5B50array
  
  while (stack.length !== 0) {
    // \u53D6\u51FA\u6700\u540E\u4E00\u4E2A\u5143\u7D20
    const val = stack.pop()
    
    if (Array.isArray(val)) {
     // \u9047\u5230\u662F\u6570\u7EC4\u7684\u60C5\u51B5\uFF0C\u5F80stack\u540E\u9762\u63A8\u5165
      stack.push(...val)
    } else {
      // \u5F80\u6570\u7EC4\u524D\u9762\u63A8\u5165
      result.unshift(val)
    }
  }

  return result
}
// \u6D4B\u8BD5
let arr2 = [
  1,
  [ 2, 3, 4 ],
  [ 5, [ 6, [ 7, [ 8 ] ] ] ]
]

console.log(flat2(arr2)) // [1, 2, 3, 4, 5, 6, 7, 8]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>
/**
 * 
 * @param {*} array \u6DF1\u5C42\u5D4C\u5957\u7684\u6570\u636E
 * @returns \u65B0\u6570\u7EC4
 */
const flat3 = (array) =&gt; {
  return array.flat(Infinity)
}
// \u6D4B\u8BD5
let arr3 = [
  1,
  [ 2, 3, 4 ],
  [ 5, [ 6, [ 7, [ 8 ] ] ] ]
]

console.log(flat3(arr3)) // [1, 2, 3, 4, 5, 6, 7, 8]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="_12-\u5B9E\u73B0trim\u65B9\u6CD5\u7684\u4E24\u79CD\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#_12-\u5B9E\u73B0trim\u65B9\u6CD5\u7684\u4E24\u79CD\u65B9\u5F0F" aria-hidden="true">#</a> 12. \u5B9E\u73B0trim\u65B9\u6CD5\u7684\u4E24\u79CD\u65B9\u5F0F</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const trim = (str) =&gt; { 
  return str.replace(/^\\s*|\\s*$/g, &#39;&#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_13-\u5B9E\u73B0promise-all" tabindex="-1"><a class="header-anchor" href="#_13-\u5B9E\u73B0promise-all" aria-hidden="true">#</a> 13. \u5B9E\u73B0Promise.all</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>Promise.myAll = (promises) =&gt; {
  // \u7B26\u5408\u6761\u4EF63\uFF0C\u8FD4\u56DE\u4E00\u4E2APromise
  return new Promise((rs, rj) =&gt; {
    let count = 0
    let result = []
    const len = promises.length

    promises.forEach((p, i) =&gt; {
      // \u7B26\u5408\u6761\u4EF61\uFF0C\u5C06\u6570\u7EC4\u91CC\u7684\u9879\u901A\u8FC7Promise.resolve\u8FDB\u884C\u5305\u88C5
      Promise.resolve(p).then((res) =&gt; {
        count += 1
        result[ i ] = res
        // \u7B26\u5408\u6761\u4EF62 \u7B49\u5F85\u6240\u6709\u90FD\u5B8C\u6210
        if (count === len) {
          rs(result)
        }
        // \u7B26\u5408\u6761\u4EF62  \u53EA\u8981\u4E00\u4E2A\u5931\u8D25\u5C31\u90FD\u5931\u8D25
      }).catch(rj)
    })
  })
}

let p1 = Promise.resolve(1)
let p2 = 2
let p3 = new Promise((resolve, reject) =&gt; {
  setTimeout(resolve, 100, 3)
})

let p4 = Promise.reject(&#39;\u51FA\u9519\u5566&#39;)

Promise.myAll([p1, p2, p3]).then((res) =&gt; {
  console.log(res); // [ 1, 2, 3 ]
});


Promise.myAll([ p1, p2, 3 ]).then((res) =&gt; {
  console.log(res) // [ 1, 2, 3 ]
}).catch((err) =&gt; {
  console.log(&#39;err&#39;, err)
})


Promise.myAll([ p1, p2, p4 ]).then((res) =&gt; {
  console.log(res)
}).catch((err) =&gt; {
  console.log(&#39;err&#39;, err) // err \u51FA\u9519\u5566
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><h2 id="_14-\u5B9E\u73B0promise-race" tabindex="-1"><a class="header-anchor" href="#_14-\u5B9E\u73B0promise-race" aria-hidden="true">#</a> 14. \u5B9E\u73B0Promise.race</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>Promise.myRace = (promises) =&gt; {
  // \u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684Promise
  return new Promise((rs, rj) =&gt; {
    promises.forEach((p) =&gt; {
      // \u5305\u88C5\u4E00\u4E0Bpromises\u4E2D\u7684\u9879\uFF0C\u9632\u6B62\u975EPromise .then\u51FA\u9519
      // \u53EA\u8981\u6709\u4EFB\u610F\u4E00\u4E2A\u5B8C\u6210\u4E86\u6216\u8005\u62D2\u7EDD\u4E86\uFF0Crace\u4E5F\u5C31\u7ED3\u675F\u4E86
      Promise.resolve(p).then(rs).catch(rj)
    })
  })
}

const promise1 = new Promise((resolve, reject) =&gt; {
  setTimeout(resolve, 500, 1);
});

const promise2 = new Promise((resolve, reject) =&gt; {
  setTimeout(resolve, 100, 2);
});

Promise.myRace([promise1, promise2]).then((value) =&gt; {
  // \u56E0\u4E3Apromise2\u66F4\u5FEB\u6240\u4EE5\u6253\u5370\u51FA2
  console.log(value) // 2
});

Promise.myRace([promise1, promise2, 3]).then((value) =&gt; {
  // 3\u6BD4\u5176\u4ED6\u4E24\u4E2A\u66F4\u5FEB
  console.log(value) // 3
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div>`,80);function r(l,p){return e}var u=n(a,[["render",r],["__file","JavaScript.html.vue"]]);export{u as default};
