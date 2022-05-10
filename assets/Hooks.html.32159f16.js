import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9338189c.js";const e={},a=s(`<h1 id="react-hooks" tabindex="-1"><a class="header-anchor" href="#react-hooks" aria-hidden="true">#</a> React+Hooks</h1><blockquote><p>React-hooks\u662Freact16.8\u4EE5\u540E\uFF0Creact\u65B0\u589E\u7684\u94A9\u5B50API\uFF0C\u76EE\u7684\u662F\u589E\u52A0\u4EE3\u7801\u7684\u53EF\u590D\u7528\u6027\uFF0C\u903B\u8F91\u6027\uFF0C\u5F25\u8865\u65E0\u72B6\u6001\u7EC4\u4EF6\u6CA1\u6709\u751F\u547D\u5468\u671F\uFF0C\u6CA1\u6709\u6570\u636E\u7BA1\u7406\u72B6\u6001state\u7684\u7F3A\u9677\u3002\u7B14\u8005\u8BA4\u4E3A\uFF0Creact-hooks\u601D\u60F3\u548C\u521D\u8877\uFF0C\u4E5F\u662F\u628A\u7EC4\u4EF6\uFF0C\u9897\u7C92\u5316\uFF0C\u5355\u5143\u5316\uFF0C\u5F62\u6210\u72EC\u7ACB\u7684\u6E32\u67D3\u73AF\u5883\uFF0C\u51CF\u5C11\u6E32\u67D3\u6B21\u6570\uFF0C\u4F18\u5316\u6027\u80FD\u3002</p></blockquote><p>useCallback\u2705</p><p>useContext\u2705</p><p>useEffect\u2705</p><p>useLayoutEffect \u2705</p><p>useMemo \u2705</p><p>useReducer\u2705</p><p>useRef\u2705</p><p>useState\u2705</p><h2 id="\u4E3A\u4EC0\u4E48\u8981\u4F7F\u7528hooks" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u8981\u4F7F\u7528hooks" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48\u8981\u4F7F\u7528hooks</h2><p>\u6211\u4EEC\u4E3A\u4EC0\u4E48\u8981\u4F7F\u7528react-hooks\u5462\uFF0C\u9996\u5148\u548C\u4F20\u7EDF\u7684class\u58F0\u660E\u7684\u6709\u72B6\u6001\u6709\u8FD9\u663E\u8457\u7684\u4F18\u70B9\u5C31\u662F</p><p>1 react-hooks\u53EF\u4EE5\u8BA9\u6211\u4EEC\u7684\u4EE3\u7801\u7684\u903B\u8F91\u6027\u66F4\u5F3A\uFF0C\u53EF\u4EE5\u62BD\u79BB\u516C\u5171\u7684\u65B9\u6CD5\uFF0C\u516C\u5171\u7EC4\u4EF6\u3002</p><p>2 react-hooks\u601D\u60F3\u66F4\u8D8B\u8FD1\u4E8E\u51FD\u6570\u5F0F\u7F16\u7A0B\u3002</p><p>3 react-hooks\u53EF\u80FD\u628A\u5E9E\u5927\u7684class\u7EC4\u4EF6\uFF0C\u5316\u6574\u4E3A\u96F6\u6210\u5F88\u591A\u5C0F\u7EC4\u4EF6\uFF0CuseMemo\u7B49\u65B9\u6CD5\u8BA9\u7EC4\u4EF6\u6216\u8005\u53D8\u91CF\u5236\u5B9A\u4E00\u4E2A\u9002\u5408\u81EA\u5DF1\u7684\u72EC\u7ACB\u7684\u6E32\u67D3\u7A7A\u95F4\uFF0C\u4E00\u5B9A\u7A0B\u5EA6\u4E0A\u53EF\u4EE5\u63D0\u9AD8\u6027\u80FD\uFF0C\u51CF\u5C11\u6E32\u67D3\u6B21\u6570\u3002</p><h2 id="\u5982\u4F55\u4F7F\u7528hooks" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u4F7F\u7528hooks" aria-hidden="true">#</a> \u5982\u4F55\u4F7F\u7528hooks</h2><h3 id="usestate-\u6570\u636E\u5B58\u50A8-\u6D3E\u53D1\u66F4\u65B0" tabindex="-1"><a class="header-anchor" href="#usestate-\u6570\u636E\u5B58\u50A8-\u6D3E\u53D1\u66F4\u65B0" aria-hidden="true">#</a> useState \u6570\u636E\u5B58\u50A8\uFF0C\u6D3E\u53D1\u66F4\u65B0</h3><p>useState\u51FA\u73B0\uFF0C\u4F7F\u5F97react\u65E0\u72B6\u6001\u7EC4\u4EF6\u80FD\u591F\u50CF\u6709\u72B6\u6001\u7EC4\u4EF6\u4E00\u6837\uFF0C\u53EF\u4EE5\u62E5\u6709\u81EA\u5DF1state,useState\u7684\u53C2\u6570\u53EF\u4EE5\u662F\u4E00\u4E2A\u5177\u4F53\u7684\u503C\uFF0C\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A\u51FD\u6570\u7528\u4E8E\u5224\u65AD\u590D\u6742\u7684\u903B\u8F91\uFF0C\u51FD\u6570\u8FD4\u56DE\u4F5C\u4E3A\u521D\u59CB\u503C\uFF0Cusestate \u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u7B2C\u4E00\u9879\u7528\u4E8E\u8BFB\u53D6\u6B64\u65F6\u7684state\u503C \uFF0C\u7B2C\u4E8C\u9879\u4E3A\u6D3E\u53D1\u6570\u636E\u66F4\u65B0\uFF0C\u7EC4\u4EF6\u6E32\u67D3\u7684\u51FD\u6570\uFF0C\u51FD\u6570\u7684\u53C2\u6570\u5373\u662F\u9700\u8981\u66F4\u65B0\u7684\u503C\u3002useState\u548CuseReduce \u4F5C\u4E3A\u80FD\u591F\u89E6\u53D1\u7EC4\u4EF6\u91CD\u65B0\u6E32\u67D3\u7684hooks,\u6211\u4EEC\u5728\u4F7F\u7528useState\u7684\u65F6\u5019\u8981\u7279\u522B\u6CE8\u610F\u7684\u662F\uFF0CuseState\u6D3E\u53D1\u66F4\u65B0\u51FD\u6570\u7684\u6267\u884C\uFF0C\u5C31\u4F1A\u8BA9\u6574\u4E2Afunction\u7EC4\u4EF6\u4ECE\u5934\u5230\u5C3E\u6267\u884C\u4E00\u6B21\uFF0C\u6240\u4EE5\u9700\u8981\u914D\u5408useMemo\uFF0Cusecallback\u7B49api\u914D\u5408\u4F7F\u7528\uFF0C\u8FD9\u5C31\u662F\u6211\u8BF4\u7684\u4E3A\u4EC0\u4E48\u6EE5\u7528hooks\u4F1A\u5E26\u6765\u8D1F\u4F5C\u7528\u7684\u539F\u56E0\u4E4B\u4E00\u4E86\u3002\u4E00\u4E0B\u4EE3\u7801\u4E3Ausestate\u57FA\u672C\u5E94\u7528</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>const DemoState = (props) =&gt; {
   /* number\u4E3A\u6B64\u65F6state\u8BFB\u53D6\u503C \uFF0CsetNumber\u4E3A\u6D3E\u53D1\u66F4\u65B0\u7684\u51FD\u6570 */
   let [number, setNumber] = useState(0) /* 0\u4E3A\u521D\u59CB\u503C */
   return (&lt;div&gt;
       &lt;span&gt;{ number }&lt;/span&gt;
       &lt;button onClick={ ()=&gt; {
         setNumber(number+1)
         console.log(number) /* \u8FD9\u91CC\u7684number\u662F\u4E0D\u80FD\u591F\u5373\u4F7F\u6539\u53D8\u7684  */
       } } &gt;&lt;/button&gt;
   &lt;/div&gt;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u4E0A\u8FB9\u7B80\u5355\u7684\u4F8B\u5B50\u8BF4\u660E\u4E86useState ,\u4F46\u662F\u5F53\u6211\u4EEC\u5728\u8C03\u7528\u66F4\u65B0\u51FD\u6570\u4E4B\u540E\uFF0Cstate\u7684\u503C\u662F\u4E0D\u80FD\u5373\u65F6\u6539\u53D8\u7684\uFF0C\u53EA\u6709\u5F53\u4E0B\u4E00\u6B21\u4E0A\u4E0B\u6587\u6267\u884C\u7684\u65F6\u5019\uFF0Cstate\u503C\u624D\u968F\u4E4B\u6539\u53D8\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>const a =1 
const DemoState = (props) =&gt; {
   /*  useState \u7B2C\u4E00\u4E2A\u53C2\u6570\u5982\u679C\u662F\u51FD\u6570 \u5219\u5904\u7406\u590D\u6742\u7684\u903B\u8F91 \uFF0C\u8FD4\u56DE\u503C\u4E3A\u521D\u59CB\u503C */
   let [number, setNumber] = useState(()=&gt;{
      // number
      return a===1 ? 1 : 2
   }) /* 1\u4E3A\u521D\u59CB\u503C */
   return (&lt;div&gt;
       &lt;span&gt;{ number }&lt;/span&gt;
       &lt;button onClick={ ()=&gt;setNumber(number+1) } &gt;&lt;/button&gt;
   &lt;/div&gt;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="useeffect-\u7EC4\u4EF6\u66F4\u65B0\u526F\u4F5C\u7528\u94A9\u5B50" tabindex="-1"><a class="header-anchor" href="#useeffect-\u7EC4\u4EF6\u66F4\u65B0\u526F\u4F5C\u7528\u94A9\u5B50" aria-hidden="true">#</a> useEffect \u7EC4\u4EF6\u66F4\u65B0\u526F\u4F5C\u7528\u94A9\u5B50</h3><p>\u5982\u679C\u4F60\u60F3\u5728function\u7EC4\u4EF6\u4E2D\uFF0C\u5F53\u7EC4\u4EF6\u5B8C\u6210\u6302\u8F7D\uFF0Cdom\u6E32\u67D3\u5B8C\u6210\uFF0C\u505A\u4E00\u4E9B\u64CD\u7EB5dom,\u8BF7\u6C42\u6570\u636E\uFF0C\u90A3\u4E48useEffect\u662F\u4E00\u4E2A\u4E0D\u4E8C\u9009\u62E9\uFF0C\u5982\u679C\u6211\u4EEC\u9700\u8981\u5728\u7EC4\u4EF6\u521D\u6B21\u6E32\u67D3\u7684\u65F6\u5019\u8BF7\u6C42\u6570\u636E\uFF0C\u90A3\u4E48useEffect\u53EF\u4EE5\u5145\u5F53class\u7EC4\u4EF6\u4E2D\u7684 componentDidMount , <strong>\u4F46\u662F\u7279\u522B\u6CE8\u610F\u7684\u662F\uFF0C\u5982\u679C\u4E0D\u7ED9useEffect\u6267\u884C\u52A0\u5165\u9650\u5B9A\u6761\u4EF6\uFF0C\u51FD\u6570\u7EC4\u4EF6\u6BCF\u4E00\u6B21\u66F4\u65B0\u90FD\u4F1A\u89E6\u53D1effect ,\u90A3\u4E48\u4E5F\u5C31\u8BF4\u660E\u6BCF\u4E00\u6B21state\u66F4\u65B0\uFF0C\u6216\u662Fprops\u7684\u66F4\u65B0\u90FD\u4F1A\u89E6\u53D1useEffect\u6267\u884C\uFF0C\u6B64\u65F6\u7684effect\u53C8\u5145\u5F53\u4E86componentDidUpdate\u548Ccomponentwillreceiveprops\uFF0C\u6240\u4EE5\u8BF4\u5408\u7406\u7684\u7528\u4E8EuseEffect\u5C31\u8981\u7ED9effect\u52A0\u5165\u9650\u5B9A\u6267\u884C\u7684\u6761\u4EF6\uFF0C\u4E5F\u5C31\u662FuseEffect\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\uFF0C\u8FD9\u91CC\u8BF4\u662F\u9650\u5B9A\u6761\u4EF6\uFF0C\u4E5F\u53EF\u4EE5\u8BF4\u662F\u4E0A\u4E00\u6B21useeffect\u66F4\u65B0\u6536\u96C6\u7684\u67D0\u4E9B\u8BB0\u5F55\u6570\u636E\u53D8\u5316\u7684\u8BB0\u5FC6\uFF0C\u5728\u65B0\u7684\u4E00\u8F6E\u66F4\u65B0\uFF0Cuseeffect\u4F1A\u62FF\u51FA\u4E4B\u524D\u7684\u8BB0\u5FC6\u503C\u548C\u5F53\u524D\u503C\u505A\u5BF9\u6BD4\uFF0C\u5982\u679C\u53D1\u751F\u4E86\u53D8\u5316\u5C31\u6267\u884C\u65B0\u7684\u4E00\u8F6EuseEffect\u7684\u526F\u4F5C\u7528\u51FD\u6570\uFF0CuseEffect\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u6570\u7EC4\uFF0C\u7528\u6765\u6536\u96C6\u591A\u4E2A\u9650\u5236\u6761\u4EF6 \u3002</strong></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>/* \u6A21\u62DF\u6570\u636E\u4EA4\u4E92 */
function getUserInfo(a){
    return new Promise((resolve)=&gt;{
        setTimeout(()=&gt;{ 
           resolve({
               name:a,
               age:16,
           }) 
        },500)
    })
}

const Demo = ({ a }) =&gt; {
    const [ userMessage , setUserMessage ] :any= useState({})
    const div= useRef()
    const [number, setNumber] = useState(0)
    /* \u6A21\u62DF\u4E8B\u4EF6\u76D1\u542C\u5904\u7406\u51FD\u6570 */
    const handleResize =()=&gt;{}
    /* useEffect\u4F7F\u7528 \uFF0C\u8FD9\u91CC\u5982\u679C\u4E0D\u52A0\u9650\u5236 \uFF0C\u4F1A\u662F\u51FD\u6570\u91CD\u590D\u6267\u884C\uFF0C\u9677\u5165\u6B7B\u5FAA\u73AF*/
    useEffect(()=&gt;{
        /* \u8BF7\u6C42\u6570\u636E */
       getUserInfo(a).then(res=&gt;{
           setUserMessage(res)
       })
       /* \u64CD\u4F5Cdom  */
       console.log(div.current) /* div */
       /* \u4E8B\u4EF6\u76D1\u542C\u7B49 */
        window.addEventListener(&#39;resize&#39;, handleResize)
    /* \u53EA\u6709\u5F53props-&gt;a\u548Cstate-&gt;number\u6539\u53D8\u7684\u65F6\u5019 ,useEffect\u526F\u4F5C\u7528\u51FD\u6570\u91CD\u65B0\u6267\u884C \uFF0C\u5982\u679C\u6B64\u65F6\u6570\u7EC4\u4E3A\u7A7A[]\uFF0C\u8BC1\u660E\u51FD\u6570\u53EA\u6709\u5728\u521D\u59CB\u5316\u7684\u65F6\u5019\u6267\u884C\u4E00\u6B21\u76F8\u5F53\u4E8EcomponentDidMount */
    },[ a ,number ])
    return (&lt;div ref={div} &gt;
        &lt;span&gt;{ userMessage.name }&lt;/span&gt;
        &lt;span&gt;{ userMessage.age }&lt;/span&gt;
        &lt;div onClick={ ()=&gt; setNumber(1) } &gt;{ number }&lt;/div&gt;
    &lt;/div&gt;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>\u5982\u679C\u6211\u4EEC\u9700\u8981\u5728\u7EC4\u4EF6\u9500\u6BC1\u7684\u9636\u6BB5\uFF0C\u505A\u4E00\u4E9B\u53D6\u6D88dom\u76D1\u542C\uFF0C\u6E05\u9664\u5B9A\u65F6\u5668\u7B49\u64CD\u4F5C\uFF0C\u90A3\u4E48\u6211\u4EEC\u53EF\u4EE5\u5728useEffect\u51FD\u6570\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u7ED3\u5C3E\u8FD4\u56DE\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u4E8E\u6E05\u9664\u8FD9\u4E9B\u526F\u4F5C\u7528\u3002\u76F8\u5F53\u4E0EcomponentWillUnmount\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>const Demo = ({ a }) =&gt; {
    /* \u6A21\u62DF\u4E8B\u4EF6\u76D1\u542C\u5904\u7406\u51FD\u6570 */
    const handleResize =()=&gt;{}
    useEffect(()=&gt;{
       /* \u5B9A\u65F6\u5668 \u5EF6\u65F6\u5668\u7B49 */
       const timer = setInterval(()=&gt;console.log(666),1000)
       /* \u4E8B\u4EF6\u76D1\u542C */
       window.addEventListener(&#39;resize&#39;, handleResize)
       /* \u6B64\u51FD\u6570\u7528\u4E8E\u6E05\u9664\u526F\u4F5C\u7528 */
       return function(){
           clearInterval(timer) 
           window.removeEventListener(&#39;resize&#39;, handleResize)
       }
    },[ a ])
    return (&lt;div  &gt;
    &lt;/div&gt;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="\u5F02\u6B65-async-effect" tabindex="-1"><a class="header-anchor" href="#\u5F02\u6B65-async-effect" aria-hidden="true">#</a> \u5F02\u6B65 async effect ?</h4><p>\u63D0\u9192\u5927\u5BB6\u7684\u662F useEffect\u662F\u4E0D\u80FD\u76F4\u63A5\u7528 async await \u8BED\u6CD5\u7CD6\u7684</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/* \u9519\u8BEF\u7528\u6CD5 \uFF0Ceffect\u4E0D\u652F\u6301\u76F4\u63A5 async await \u88C5\u9970\u7684 */
 useEffect(async ()=&gt;{
        /* \u8BF7\u6C42\u6570\u636E */
      const res = await getUserInfo(payload)
    },[ a ,number ])

\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u5982\u679C\u6211\u4EEC\u60F3\u8981\u7528 async effect \u53EF\u4EE5\u5BF9effect\u8FDB\u884C\u4E00\u5C42\u5305\u88C5\uFF08\u4F20\u5165async await\u88C5\u9970\u7684\u56DE\u8C03\u51FD\u6570\uFF09</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const asyncEffect = (callback, deps)=&gt;{
   useEffect(()=&gt;{
       callback()
   },deps)
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="uselayouteffect-\u6E32\u67D3\u66F4\u65B0\u4E4B\u524D\u7684-useeffect" tabindex="-1"><a class="header-anchor" href="#uselayouteffect-\u6E32\u67D3\u66F4\u65B0\u4E4B\u524D\u7684-useeffect" aria-hidden="true">#</a> useLayoutEffect \u6E32\u67D3\u66F4\u65B0\u4E4B\u524D\u7684 useEffect</h3><p>useEffect \u6267\u884C\u987A\u5E8F\uFF1A\u7EC4\u4EF6\u66F4\u65B0\u6302\u8F7D\u5B8C\u6210 -&gt; \u6D4F\u89C8\u5668dom \u7ED8\u5236\u5B8C\u6210 -&gt; \u6267\u884CuseEffect\u56DE\u8C03 \u3002</p><p>useLayoutEffect \u6267\u884C\u987A\u5E8F\uFF1A\u7EC4\u4EF6\u66F4\u65B0\u6302\u8F7D\u5B8C\u6210 -&gt; \u6267\u884CuseLayoutEffect\u56DE\u8C03-&gt; \u6D4F\u89C8\u5668dom \u7ED8\u5236\u5B8C\u6210</p><p>\u6240\u4EE5\u8BF4useLayoutEffect \u4EE3\u7801\u53EF\u80FD\u4F1A\u963B\u585E\u6D4F\u89C8\u5668\u7684\u7ED8\u5236 \u5982\u679C\u6211\u4EEC\u5728useEffect \u91CD\u65B0\u8BF7\u6C42\u6570\u636E\uFF0C\u6E32\u67D3\u89C6\u56FE\u8FC7\u7A0B\u4E2D\uFF0C\u80AF\u5B9A\u4F1A\u9020\u6210\u753B\u9762\u95EA\u52A8\u7684\u6548\u679C,\u800C\u5982\u679C\u7528useLayoutEffect \uFF0C<strong>\u56DE\u8C03\u51FD\u6570\u7684\u4EE3\u7801\u5C31\u4F1A\u963B\u585E\u6D4F\u89C8\u5668\u7ED8\u5236</strong>\uFF0C\u6240\u4EE5\u53EF\u5B9A\u4F1A\u5F15\u8D77\u753B\u9762\u5361\u987F\u7B49\u6548\u679C\uFF0C\u90A3\u4E48\u5177\u4F53\u8981\u7528 useLayoutEffect \u8FD8\u662F useEffect \uFF0C\u8981\u770B\u5B9E\u9645\u9879\u76EE\u7684\u60C5\u51B5\uFF0C\u5927\u90E8\u5206\u7684\u60C5\u51B5 useEffect \u90FD\u53EF\u4EE5\u6EE1\u8DB3\u7684\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>const DemoUseLayoutEffect = () =&gt; {
    const target = useRef()
    useLayoutEffect(() =&gt; {
        /*\u6211\u4EEC\u9700\u8981\u5728dom\u7ED8\u5236\u4E4B\u524D\uFF0C\u79FB\u52A8dom\u5230\u5236\u5B9A\u4F4D\u7F6E*/
        const { x ,y } = getPositon() /* \u83B7\u53D6\u8981\u79FB\u52A8\u7684 x,y\u5750\u6807 */
        animate(target.current,{ x,y })
    }, []);
    return (
        &lt;div &gt;
            &lt;span ref={ target } className=&quot;animate&quot;&gt;&lt;/span&gt;
        &lt;/div&gt;
    )
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="useref-\u83B7\u53D6\u5143\u7D20-\u7F13\u5B58\u6570\u636E\u3002" tabindex="-1"><a class="header-anchor" href="#useref-\u83B7\u53D6\u5143\u7D20-\u7F13\u5B58\u6570\u636E\u3002" aria-hidden="true">#</a> useRef \u83B7\u53D6\u5143\u7D20 ,\u7F13\u5B58\u6570\u636E\u3002</h3><p>\u548C\u4F20\u7EDF\u7684class\u7EC4\u4EF6ref\u4E00\u6837\uFF0Creact-hooks \u4E5F\u63D0\u4F9B\u83B7\u53D6\u5143\u7D20\u65B9\u6CD5 useRef,\u5B83\u6709\u4E00\u4E2A\u53C2\u6570\u53EF\u4EE5\u4F5C\u4E3A\u7F13\u5B58\u6570\u636E\u7684\u521D\u59CB\u503C\uFF0C\u8FD4\u56DE\u503C\u53EF\u4EE5\u88ABdom\u5143\u7D20ref\u6807\u8BB0\uFF0C\u53EF\u4EE5\u83B7\u53D6\u88AB\u6807\u8BB0\u7684\u5143\u7D20\u8282\u70B9.</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>const DemoUseRef = ()=&gt;{
    const dom= useRef(null)
    const handerSubmit = ()=&gt;{
        /*  &lt;div &gt;\u8868\u5355\u7EC4\u4EF6&lt;/div&gt;  dom \u8282\u70B9 */
        console.log(dom.current)
    }
    return &lt;div&gt;
        {/* ref \u6807\u8BB0\u5F53\u524Ddom\u8282\u70B9 */}
        &lt;div ref={dom} &gt;\u8868\u5355\u7EC4\u4EF6&lt;/div&gt;
        &lt;button onClick={()=&gt;handerSubmit()} &gt;\u63D0\u4EA4&lt;/button&gt; 
    &lt;/div&gt;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="\u9AD8\u9636\u7528\u6CD5-\u7F13\u5B58\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u9AD8\u9636\u7528\u6CD5-\u7F13\u5B58\u6570\u636E" aria-hidden="true">#</a> \u9AD8\u9636\u7528\u6CD5 \u7F13\u5B58\u6570\u636E</h4><p><strong>\u5F53\u7136useRef\u8FD8\u6709\u4E00\u4E2A\u5F88\u91CD\u8981\u7684\u4F5C\u7528\u5C31\u662F\u7F13\u5B58\u6570\u636E\uFF0C\u6211\u4EEC\u77E5\u9053usestate ,useReducer \u662F\u53EF\u4EE5\u4FDD\u5B58\u5F53\u524D\u7684\u6570\u636E\u6E90\u7684\uFF0C\u4F46\u662F\u5982\u679C\u5B83\u4EEC\u66F4\u65B0\u6570\u636E\u6E90\u7684\u51FD\u6570\u6267\u884C\u5FC5\u5B9A\u4F1A\u5E26\u6765\u6574\u4E2A\u7EC4\u4EF6\u4ECE\u65B0\u6267\u884C\u5230\u6E32\u67D3\uFF0C\u5982\u679C\u5728\u51FD\u6570\u7EC4\u4EF6\u5185\u90E8\u58F0\u660E\u53D8\u91CF\uFF0C\u5219\u4E0B\u4E00\u6B21\u66F4\u65B0\u4E5F\u4F1A\u91CD\u7F6E\uFF0C\u5982\u679C\u6211\u4EEC\u60F3\u8981\u6084\u6084\u7684\u4FDD\u5B58\u6570\u636E\uFF0C\u800C\u53C8\u4E0D\u60F3\u89E6\u53D1\u51FD\u6570\u7684\u66F4\u65B0\uFF0C\u90A3\u4E48useRef\u662F\u4E00\u4E2A\u5F88\u68D2\u7684\u9009\u62E9\u3002</strong></p><blockquote><p>const currenRef = useRef(InitialData)</p></blockquote><p>\u83B7\u53D6 currenRef.current \u6539\u53D8 currenRef.current = newValue</p><p>useRef\u53EF\u4EE5\u7B2C\u4E00\u4E2A\u53C2\u6570\u53EF\u4EE5\u7528\u6765\u521D\u59CB\u5316\u4FDD\u5B58\u6570\u636E\uFF0C\u8FD9\u4E9B\u6570\u636E\u53EF\u4EE5\u5728current\u5C5E\u6027\u4E0A\u83B7\u53D6\u5230 \uFF0C\u5F53\u7136\u6211\u4EEC\u4E5F\u53EF\u4EE5\u901A\u8FC7\u5BF9current\u8D4B\u503C\u65B0\u7684\u6570\u636E\u6E90\u3002</p><h3 id="usecontext-\u81EA\u7531\u83B7\u53D6context" tabindex="-1"><a class="header-anchor" href="#usecontext-\u81EA\u7531\u83B7\u53D6context" aria-hidden="true">#</a> useContext \u81EA\u7531\u83B7\u53D6context</h3><p>\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528useContext \uFF0C\u6765\u83B7\u53D6\u7236\u7EA7\u7EC4\u4EF6\u4F20\u9012\u8FC7\u6765\u7684context\u503C\uFF0C<strong>\u8FD9\u4E2A\u5F53\u524D\u503C\u5C31\u662F\u6700\u8FD1\u7684\u7236\u7EA7\u7EC4\u4EF6 Provider \u8BBE\u7F6E\u7684value\u503C</strong>\uFF0CuseContext\u53C2\u6570\u4E00\u822C\u662F\u7531 createContext \u65B9\u5F0F\u5F15\u5165 ,\u4E5F\u53EF\u4EE5\u7236\u7EA7\u4E0A\u4E0B\u6587context\u4F20\u9012 ( \u53C2\u6570\u4E3Acontext )\u3002useContext \u53EF\u4EE5\u4EE3\u66FF context.Consumer \u6765\u83B7\u53D6Provider\u4E2D\u4FDD\u5B58\u7684value\u503C</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>/* \u7528useContext\u65B9\u5F0F */
const DemoContext = ()=&gt; {
    const value:any = useContext(Context)
    /* my name is alien */
return &lt;div&gt; my name is { value.name }&lt;/div&gt;
}

/* \u7528Context.Consumer \u65B9\u5F0F */
const DemoContext1 = ()=&gt;{
    return &lt;Context.Consumer&gt;
         {/*  my name is alien  */}
        { (value)=&gt; &lt;div&gt; my name is { value.name }&lt;/div&gt; }
    &lt;/Context.Consumer&gt;
}

export default ()=&gt;{
    return &lt;div&gt;
        &lt;Context.Provider value={{ name:&#39;alien&#39; , age:18 }} &gt;
            &lt;DemoContext /&gt;
            &lt;DemoContext1 /&gt;
        &lt;/Context.Provider&gt;
    &lt;/div&gt;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="usereducer-\u65E0\u72B6\u6001\u7EC4\u4EF6\u4E2D\u7684redux" tabindex="-1"><a class="header-anchor" href="#usereducer-\u65E0\u72B6\u6001\u7EC4\u4EF6\u4E2D\u7684redux" aria-hidden="true">#</a> useReducer \u65E0\u72B6\u6001\u7EC4\u4EF6\u4E2D\u7684redux</h3><p>useReducer \u662Freact-hooks\u63D0\u4F9B\u7684\u80FD\u591F\u5728\u65E0\u72B6\u6001\u7EC4\u4EF6\u4E2D\u8FD0\u884C\u7684\u7C7B\u4F3Credux\u7684\u529F\u80FDapi\uFF0C\u81F3\u4E8E\u5B83\u5230\u5E95\u80FD\u4E0D\u80FD\u4EE3\u66FFredux react-redux ,\u6211\u4E2A\u4EBA\u7684\u770B\u6CD5\u662F\u4E0D\u80FD\u7684 \uFF0Credux \u80FD\u591F\u590D\u6742\u7684\u903B\u8F91\u4E2D\u5C55\u73B0\u4F18\u52BF \uFF0C\u800C\u4E14 redux\u7684\u4E2D\u95F4\u4EF6\u6A21\u5F0F\u601D\u60F3\u4E5F\u662F\u975E\u5E38\u4F18\u79C0\u4E86\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4E2D\u95F4\u4EF6\u7684\u65B9\u5F0F\u6765\u589E\u5F3Adispatch redux-thunk redux-sage redux-action redux-promise\u90FD\u662F\u6BD4\u8F83\u4E0D\u9519\u7684\u4E2D\u95F4\u4EF6\uFF0C\u53EF\u4EE5\u628A\u540C\u6B65reducer\u7F16\u7A0B\u5F02\u6B65\u7684reducer\u3002useReducer \u63A5\u53D7\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u6211\u4EEC\u53EF\u4EE5\u8BA4\u4E3A\u5B83\u5C31\u662F\u4E00\u4E2Areducer ,reducer\u7684\u53C2\u6570\u5C31\u662F\u5E38\u89C4reducer\u91CC\u9762\u7684state\u548Caction,\u8FD4\u56DE\u6539\u53D8\u540E\u7684state, useReducer\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E3Astate\u7684\u521D\u59CB\u503C \u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u7684\u7B2C\u4E00\u9879\u5C31\u662F\u66F4\u65B0\u4E4B\u540Estate\u7684\u503C \uFF0C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u6D3E\u53D1\u66F4\u65B0\u7684dispatch\u51FD\u6570 \u3002<strong>dispatch \u7684\u89E6\u53D1\u4F1A\u89E6\u53D1\u7EC4\u4EF6\u7684\u66F4\u65B0\uFF0C\u8FD9\u91CC\u80FD\u591F\u4FC3\u4F7F\u7EC4\u4EF6\u4ECE\u65B0\u7684\u6E32\u67D3\u7684\u4E00\u4E2A\u662FuseState\u6D3E\u53D1\u66F4\u65B0\u51FD\u6570\uFF0C\u53E6\u4E00\u4E2A\u5C31 useReducer\u4E2D\u7684dispatch</strong></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>const DemoUseReducer = ()=&gt;{
    /* number\u4E3A\u66F4\u65B0\u540E\u7684state\u503C,  dispatchNumbner \u4E3A\u5F53\u524D\u7684\u6D3E\u53D1\u51FD\u6570 */
   const [ number , dispatchNumbner ] = useReducer((state,action)=&gt;{
       const { payload , name  } = action
       /* return\u7684\u503C\u4E3A\u65B0\u7684state */
       switch(name){
           case &#39;add&#39;:
               return state + 1
           case &#39;sub&#39;:
               return state - 1 
           case &#39;reset&#39;:
             return payload       
       }
       return state
   },0)
   return &lt;div&gt;
      \u5F53\u524D\u503C\uFF1A{ number }
      { /* \u6D3E\u53D1\u66F4\u65B0 */ }
      &lt;button onClick={()=&gt;dispatchNumbner({ name:&#39;add&#39; })} &gt;\u589E\u52A0&lt;/button&gt;
      &lt;button onClick={()=&gt;dispatchNumbner({ name:&#39;sub&#39; })} &gt;\u51CF\u5C11&lt;/button&gt;
      &lt;button onClick={()=&gt;dispatchNumbner({ name:&#39;reset&#39; ,payload:666 })} &gt;\u8D4B\u503C&lt;/button&gt;
      { /* \u628Adispatch \u548C state \u4F20\u9012\u7ED9\u5B50\u7EC4\u4EF6  */ }
      &lt;MyChildren  dispatch={ dispatchNumbner } State={{ number }} /&gt;
   &lt;/div&gt;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>\u5F53\u7136\u5B9E\u9645\u4E1A\u52A1\u903B\u8F91\u53EF\u80FD\u66F4\u590D\u6742\u7684\uFF0C\u9700\u8981\u6211\u4EEC\u5728reducer\u91CC\u9762\u505A\u66F4\u590D\u6742\u7684\u903B\u8F91\u64CD\u4F5C\u3002</p><h3 id="usememo-\u5C0F\u800C\u9999\u6027\u80FD\u4F18\u5316" tabindex="-1"><a class="header-anchor" href="#usememo-\u5C0F\u800C\u9999\u6027\u80FD\u4F18\u5316" aria-hidden="true">#</a> useMemo \u5C0F\u800C\u9999\u6027\u80FD\u4F18\u5316</h3><p>useMemo\u6211\u8BA4\u4E3A\u662FReact\u8BBE\u8BA1\u6700\u4E3A\u7CBE\u5999\u7684hooks\u4E4B\u4E00\uFF0C\u4F18\u70B9\u5C31\u662F\u80FD\u5F62\u6210\u72EC\u7ACB\u7684\u6E32\u67D3\u7A7A\u95F4\uFF0C\u80FD\u591F\u4F7F\u7EC4\u4EF6\uFF0C\u53D8\u91CF\u6309\u7167\u7EA6\u5B9A\u597D\u89C4\u5219\u66F4\u65B0\u3002\u6E32\u67D3\u6761\u4EF6\u4F9D\u8D56\u4E8E\u7B2C\u4E8C\u4E2A\u53C2\u6570deps\u3002 \u6211\u4EEC\u77E5\u9053\u65E0\u72B6\u6001\u7EC4\u4EF6\u7684\u66F4\u65B0\u662F\u4ECE\u5934\u5230\u5C3E\u7684\u66F4\u65B0\uFF0C\u5982\u679C\u4F60\u60F3\u8981\u4ECE\u65B0\u6E32\u67D3\u4E00\u90E8\u5206\u89C6\u56FE\uFF0C\u800C\u4E0D\u662F\u6574\u4E2A\u7EC4\u4EF6\uFF0C\u90A3\u4E48\u7528useMemo\u662F\u6700\u4F73\u65B9\u6848\uFF0C\u907F\u514D\u4E86\u4E0D\u9700\u8981\u7684\u66F4\u65B0\uFF0C\u548C\u4E0D\u5FC5\u8981\u7684\u4E0A\u4E0B\u6587\u7684\u6267\u884C\uFF0C\u5728\u4ECB\u7ECDuseMemo\u4E4B\u524D\uFF0C\u6211\u4EEC\u5148\u6765\u8BF4\u4E00\u8BF4, memo, \u6211\u4EEC\u77E5\u9053class\u58F0\u660E\u7684\u7EC4\u4EF6\u53EF\u4EE5\u7528componentShouldUpdate\u6765\u9650\u5236\u66F4\u65B0\u6B21\u6570\uFF0C\u90A3\u4E48memo\u5C31\u662F\u65E0\u72B6\u6001\u7EC4\u4EF6\u7684ShouldUpdate \uFF0C \u800C\u6211\u4EEC\u4ECA\u5929\u8981\u8BB2\u7684useMemo\u5C31\u662F\u66F4\u4E3A\u7EC6\u5C0F\u7684ShouldUpdate\u5355\u5143\uFF0C</p><p>\u5148\u6765\u770B\u770Bmemo ,memo\u7684\u4F5C\u7528\u7ED3\u5408\u4E86pureComponent\u7EAF\u7EC4\u4EF6\u548C componentShouldUpdate\u529F\u80FD\uFF0C\u4F1A\u5BF9\u4F20\u8FDB\u6765\u7684props\u8FDB\u884C\u4E00\u6B21\u5BF9\u6BD4\uFF0C\u7136\u540E\u6839\u636E\u7B2C\u4E8C\u4E2A\u51FD\u6570\u8FD4\u56DE\u503C\u6765\u8FDB\u4E00\u6B65\u5224\u65AD\u54EA\u4E9Bprops\u9700\u8981\u66F4\u65B0\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>/* memo\u5305\u88F9\u7684\u7EC4\u4EF6\uFF0C\u5C31\u7ED9\u8BE5\u7EC4\u4EF6\u52A0\u4E86\u9650\u5236\u66F4\u65B0\u7684\u6761\u4EF6\uFF0C\u662F\u5426\u66F4\u65B0\u53D6\u51B3\u4E8Ememo\u7B2C\u4E8C\u4E2A\u53C2\u6570\u8FD4\u56DE\u7684boolean\u503C\uFF0C */
const DemoMemo = connect(state =&gt;
    ({ goodList: state.goodList })
)(memo(({ goodList, dispatch, }) =&gt; {
    useEffect(() =&gt; {
        dispatch({
            name: &#39;goodList&#39;,
        })
    }, [])
    return &lt;Select placeholder={&#39;\u8BF7\u9009\u62E9&#39;} style={{ width: 200, marginRight: 10 }} onChange={(value) =&gt; setSeivceId(value)} &gt;
        {
            goodList.map((item, index) =&gt; &lt;Option key={index + &#39;asd&#39; + item.itemId} value={item.itemId} &gt; {item.itemName} &lt;/Option&gt;)
        }
    &lt;/Select&gt;
    /* \u5224\u65AD\u4E4B\u524D\u7684goodList \u548C\u65B0\u7684goodList \u662F\u5426\u76F8\u7B49\uFF0C\u5982\u679C\u76F8\u7B49\uFF0C
    \u5219\u4E0D\u66F4\u65B0\u6B64\u7EC4\u4EF6 \u8FD9\u6837\u5C31\u53EF\u4EE5\u5236\u5B9A\u5C5E\u4E8E\u81EA\u5DF1\u7684\u6E32\u67D3\u7EA6\u5B9A \uFF0C\u8BA9\u7EC4\u4EF6\u53EA\u6709\u6EE1\u8DB3\u9884\u5B9A\u7684\u4E0B\u624D\u91CD\u65B0\u6E32\u67D3 */
}, (pre, next) =&gt; is(pre.goodList, next.goodList)))
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>useMemo\u7684\u5E94\u7528\u7406\u5FF5\u548Cmemo\u5DEE\u4E0D\u591A\uFF0C\u90FD\u662F\u5224\u5B9A\u662F\u5426\u6EE1\u8DB3\u5F53\u524D\u7684\u9650\u5B9A\u6761\u4EF6\u6765\u51B3\u5B9A\u662F\u5426\u6267\u884CuseMemo\u7684callback\u51FD\u6570\uFF0C\u800CuseMemo\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2Adeps\u6570\u7EC4\uFF0C\u6570\u7EC4\u91CC\u7684\u53C2\u6570\u53D8\u5316\u51B3\u5B9A\u4E86useMemo\u662F\u5426\u66F4\u65B0\u56DE\u8C03\u51FD\u6570\uFF0CuseMemo\u8FD4\u56DE\u503C\u5C31\u662F\u7ECF\u8FC7\u5224\u5B9A\u66F4\u65B0\u7684\u7ED3\u679C\u3002\u5B83\u53EF\u4EE5\u5E94\u7528\u5728\u5143\u7D20\u4E0A\uFF0C\u5E94\u7528\u5728\u7EC4\u4EF6\u4E0A\uFF0C\u4E5F\u53EF\u4EE5\u5E94\u7528\u5728\u4E0A\u4E0B\u6587\u5F53\u4E2D\u3002\u5982\u679C\u53C8\u4E00\u4E2A\u5FAA\u73AF\u7684list\u5143\u7D20\uFF0C\u90A3\u4E48useMemo\u4F1A\u662F\u4E00\u4E2A\u4E0D\u4E8C\u9009\u62E9\uFF0C\u63A5\u4E0B\u6765\u6211\u4EEC\u4E00\u8D77\u63A2\u5BFB\u4E00\u4E0BuseMemo\u7684\u4F18\u70B9</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/* \u7528 useMemo\u5305\u88F9\u7684list\u53EF\u4EE5\u9650\u5B9A\u5F53\u4E14\u4EC5\u5F53list\u6539\u53D8\u7684\u65F6\u5019\u624D\u66F4\u65B0\u6B64list\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u907F\u514DselectList\u91CD\u65B0\u5FAA\u73AF */
 {useMemo(() =&gt; (
      &lt;div&gt;{
          selectList.map((i, v) =&gt; (
              &lt;span
                  className={style.listSpan}
                  key={v} &gt;
                  {i.patentName} 
              &lt;/span&gt;
          ))}
      &lt;/div&gt;
), [selectList])}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>1 useMemo\u53EF\u4EE5\u51CF\u5C11\u4E0D\u5FC5\u8981\u7684\u5FAA\u73AF\uFF0C\u51CF\u5C11\u4E0D\u5FC5\u8981\u7684\u6E32\u67D3</strong></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code> useMemo(() =&gt; (
    &lt;Modal
        width={&#39;70%&#39;}
        visible={listshow}
        footer={[
            &lt;Button key=&quot;back&quot; &gt;\u53D6\u6D88&lt;/Button&gt;,
            &lt;Button
                key=&quot;submit&quot;
                type=&quot;primary&quot;
             &gt;
                \u786E\u5B9A
            &lt;/Button&gt;
        ]}
    &gt; 
     { /* \u51CF\u5C11\u4E86PatentTable\u7EC4\u4EF6\u7684\u6E32\u67D3 */ }
        &lt;PatentTable
            getList={getList}
            selectList={selectList}
            cacheSelectList={cacheSelectList}
            setCacheSelectList={setCacheSelectList} /&gt;
    &lt;/Modal&gt;
 ), [listshow, cacheSelectList])
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><strong>2 useMemo\u53EF\u4EE5\u51CF\u5C11\u5B50\u7EC4\u4EF6\u7684\u6E32\u67D3\u6B21\u6570</strong></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>const DemoUseMemo=()=&gt;{
  /* \u7528useMemo \u5305\u88F9\u4E4B\u540E\u7684log\u51FD\u6570\u53EF\u4EE5\u907F\u514D\u4E86\u6BCF\u6B21\u7EC4\u4EF6\u66F4\u65B0\u518D\u91CD\u65B0\u58F0\u660E \uFF0C\u53EF\u4EE5\u9650\u5236\u4E0A\u4E0B\u6587\u7684\u6267\u884C */
    const newLog = useMemo(()=&gt;{
        const log =()=&gt;{
            console.log(6666)
        }
        return log
    },[])
    return &lt;div onClick={()=&gt;newLog()} &gt;&lt;/div&gt;
}
\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>3 useMemo\u8BA9\u51FD\u6570\u5728\u67D0\u4E2A\u4F9D\u8D56\u9879\u6539\u53D8\u7684\u65F6\u5019\u624D\u8FD0\u884C\uFF0C\u8FD9\u53EF\u4EE5\u907F\u514D\u5F88\u591A\u4E0D\u5FC5\u8981\u7684\u5F00\u9500\uFF08\u8FD9\u91CC\u8981\u6CE8\u610F\u26A0\uFE0F\u26A0\uFE0F\u26A0\uFE0F\u7684\u662F\u5982\u679C\u88ABuseMemo\u5305\u88F9\u8D77\u6765\u7684\u4E0A\u4E0B\u6587,\u5F62\u6210\u4E00\u4E2A\u72EC\u7ACB\u7684\u95ED\u5305\uFF0C\u4F1A\u7F13\u5B58\u4E4B\u524D\u7684state\u503C,\u5982\u679C\u6CA1\u6709\u52A0\u76F8\u5173\u7684\u66F4\u65B0\u6761\u4EF6\uFF0C\u662F\u83B7\u53D6\u4E0D\u5230\u66F4\u65B0\u4E4B\u540E\u7684state\u7684\u503C\u7684\uFF0C\u5982\u4E0B\u8FB9\u{1F447}\u2B07\uFE0F\uFF09</strong></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>const DemoUseMemo=()=&gt;{
    const [ number ,setNumber ] = useState(0)
    const newLog = useMemo(()=&gt;{
        const log =()=&gt;{
            /* \u70B9\u51FBspan\u4E4B\u540E \u6253\u5370\u51FA\u6765\u7684number \u4E0D\u662F\u5B9E\u65F6\u66F4\u65B0\u7684number\u503C */
            console.log(number)
        }
        return log
      /* [] \u6CA1\u6709 number */  
    },[])
    return &lt;div&gt;
        &lt;div onClick={()=&gt;newLog()} &gt;\u6253\u5370&lt;/div&gt;
        &lt;span onClick={ ()=&gt; setNumber( number + 1 )  } &gt;\u589E\u52A0&lt;/span&gt;
    &lt;/div&gt;
}

\u590D\u5236\u4EE3\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>useMemo\u5F88\u4E0D\u9519\uFF0Creact-redux \u7528react-hooks\u91CD\u5199\u540E\u8FD0\u7528\u4E86\u5927\u91CF\u7684useMemo\u60C5\u666F\uFF0C\u6211\u4E3A\u5927\u5BB6\u5206\u6790\u4E24\u5904</strong></p><p>useMemo \u540C\u8FC7 store didStoreComeFromProps contextValue \u5C5E\u6027\u5236\u5B9A\u662F\u5426\u9700\u8981\u91CD\u7F6E\u66F4\u65B0\u8BA2\u9605\u8005subscription \uFF0C\u8FD9\u91CC\u6211\u5C31\u4E0D\u4E3A\u5927\u5BB6\u8BB2\u89E3react-redux\u4E86\uFF0C\u6709\u5174\u8DA3\u7684\u540C\u5B66\u53EF\u4EE5\u770B\u770Breact-redux\u6E90\u7801\uFF0C\u770B\u770B\u662F\u600E\u4E48\u7528useMemo\u7684</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const [subscription, notifyNestedSubs] = useMemo(() =&gt; {
  if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY

  const subscription = new Subscription(
    store,
    didStoreComeFromProps ? null : contextValue.subscription // old 
  )
  
  const notifyNestedSubs = subscription.notifyNestedSubs.bind(
    subscription
  )

  return [subscription, notifyNestedSubs]
}, [store, didStoreComeFromProps, contextValue])
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>react-redux\u901A\u8FC7 \u5224\u65AD redux store\u7684\u6539\u53D8\u6765\u83B7\u53D6\u4E0E\u4E4B\u5BF9\u5E94\u7684state</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code> const previousState = useMemo(() =&gt; store.getState(), [store])
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u8BB2\u5230\u8FD9\u91CC\uFF0C<strong>\u5982\u679C\u6211\u4EEC\u5E94\u7528useMemo\u6839\u636E\u4F9D\u8D56\u9879\u5408\u7406\u7684\u9897\u7C92\u5316\u6211\u4EEC\u7684\u7EC4\u4EF6\uFF0C\u80FD\u8D77\u5230\u5F88\u68D2\u7684\u4F18\u5316\u7EC4\u4EF6\u7684\u4F5C\u7528\u3002</strong></p><h3 id="_8-usecallback-usememo\u7248\u672C\u7684\u56DE\u8C03\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_8-usecallback-usememo\u7248\u672C\u7684\u56DE\u8C03\u51FD\u6570" aria-hidden="true">#</a> 8 useCallback useMemo\u7248\u672C\u7684\u56DE\u8C03\u51FD\u6570</h3><p>useMemo\u548CuseCallback\u63A5\u6536\u7684\u53C2\u6570\u90FD\u662F\u4E00\u6837\uFF0C\u90FD\u662F\u5728\u5176\u4F9D\u8D56\u9879\u53D1\u751F\u53D8\u5316\u540E\u624D\u6267\u884C\uFF0C\u90FD\u662F\u8FD4\u56DE\u7F13\u5B58\u7684\u503C\uFF0C\u533A\u522B\u5728\u4E8EuseMemo\u8FD4\u56DE\u7684\u662F\u51FD\u6570\u8FD0\u884C\u7684\u7ED3\u679C\uFF0CuseCallback\u8FD4\u56DE\u7684\u662F\u51FD\u6570\uFF0C\u8FD9\u4E2A\u56DE\u8C03\u51FD\u6570\u662F\u7ECF\u8FC7\u5904\u7406\u540E\u7684\u4E5F\u5C31\u662F\u8BF4\u7236\u7EC4\u4EF6\u4F20\u9012\u4E00\u4E2A\u51FD\u6570\u7ED9\u5B50\u7EC4\u4EF6\u7684\u65F6\u5019\uFF0C\u7531\u4E8E\u662F\u65E0\u72B6\u6001\u7EC4\u4EF6\u6BCF\u4E00\u6B21\u90FD\u4F1A\u91CD\u65B0\u751F\u6210\u65B0\u7684props\u51FD\u6570\uFF0C\u8FD9\u6837\u5C31\u4F7F\u5F97\u6BCF\u4E00\u6B21\u4F20\u9012\u7ED9\u5B50\u7EC4\u4EF6\u7684\u51FD\u6570\u90FD\u53D1\u751F\u4E86\u53D8\u5316\uFF0C\u8FD9\u65F6\u5019\u5C31\u4F1A\u89E6\u53D1\u5B50\u7EC4\u4EF6\u7684\u66F4\u65B0\uFF0C\u8FD9\u4E9B\u66F4\u65B0\u662F\u6CA1\u6709\u5FC5\u8981\u7684\uFF0C\u6B64\u65F6\u6211\u4EEC\u5C31\u53EF\u4EE5\u901A\u8FC7usecallback\u6765\u5904\u7406\u6B64\u51FD\u6570\uFF0C\u7136\u540E\u4F5C\u4E3Aprops\u4F20\u9012\u7ED9\u5B50\u7EC4\u4EF6</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>/* \u7528react.memo */
const DemoChildren = React.memo((props)=&gt;{
   /* \u53EA\u6709\u521D\u59CB\u5316\u7684\u65F6\u5019\u6253\u5370\u4E86 \u5B50\u7EC4\u4EF6\u66F4\u65B0 */
    console.log(&#39;\u5B50\u7EC4\u4EF6\u66F4\u65B0&#39;)
   useEffect(()=&gt;{
       props.getInfo(&#39;\u5B50\u7EC4\u4EF6&#39;)
   },[])
   return &lt;div&gt;\u5B50\u7EC4\u4EF6&lt;/div&gt;
})

const DemoUseCallback=({ id })=&gt;{
    const [number, setNumber] = useState(1)
    /* \u6B64\u65F6usecallback\u7684\u7B2C\u4E00\u53C2\u6570 (sonName)=&gt;{ console.log(sonName) }
     \u7ECF\u8FC7\u5904\u7406\u8D4B\u503C\u7ED9 getInfo */
    const getInfo  = useCallback((sonName)=&gt;{
          console.log(sonName)
    },[id])
    return &lt;div&gt;
        {/* \u70B9\u51FB\u6309\u94AE\u89E6\u53D1\u7236\u7EC4\u4EF6\u66F4\u65B0 \uFF0C\u4F46\u662F\u5B50\u7EC4\u4EF6\u6CA1\u6709\u66F4\u65B0 */}
        &lt;button onClick={ ()=&gt;setNumber(number+1) } &gt;\u589E\u52A0&lt;/button&gt;
        &lt;DemoChildren getInfo={getInfo} /&gt;
    &lt;/div&gt;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><strong>\u8FD9\u91CC\u5E94\u8BE5\u63D0\u9192\u7684\u662F\uFF0CuseCallback \uFF0C\u5FC5\u987B\u914D\u5408 react.memo pureComponent \uFF0C\u5426\u5219\u4E0D\u4F46\u4E0D\u4F1A\u63D0\u5347\u6027\u80FD\uFF0C\u8FD8\u6709\u53EF\u80FD\u964D\u4F4E\u6027\u80FD</strong></p>`,73);function r(l,t){return a}var c=n(e,[["render",r],["__file","Hooks.html.vue"]]);export{c as default};
