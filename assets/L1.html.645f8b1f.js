import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9338189c.js";const a={},e=s(`<h1 id="typescript-\u7B14\u8BB0" tabindex="-1"><a class="header-anchor" href="#typescript-\u7B14\u8BB0" aria-hidden="true">#</a> TypeScript \u7B14\u8BB0</h1><p><strong>\u2B50PS: \u672C\u5185\u5BB9\u4E0D\u80FD\u4F5C\u4E3A\u5165\u95E8\u5B66\u4E60\u4F7F\u7528\uFF0C\u4EC5\u7528\u4E8E\u8865\u5145\u5B8C\u5584\u6211\u4E2A\u4EBA\u5BF9TS\u7684\u77E5\u8BC6\u70B9</strong></p><blockquote><p>TypeScript\u662F\u62E5\u6709\u7C7B\u578B\u7684JavaScript\u8D85\u96C6\uFF0C\u5B83\u53EF\u4EE5\u7F16\u8BD1\u6210\u666E\u901A\u3001\u5E72\u51C0\u3001\u5B8C\u6574\u7684JavaScript\u4EE3\u7801</p></blockquote><h2 id="\u7406\u89E3" tabindex="-1"><a class="header-anchor" href="#\u7406\u89E3" aria-hidden="true">#</a> \u7406\u89E3</h2><ul><li>\u6211\u4EEC\u53EF\u4EE5\u5C06TypeScript\u7406\u89E3\u6210\u52A0\u5F3A\u7248\u7684JavaScript\u3002</li><li>JavaScript\u6240\u62E5\u6709\u7684\u7279\u6027\uFF0CTypeScript\u5168\u90E8\u90FD\u662F\u652F\u6301\u7684\uFF0C\u5E76\u4E14\u5B83\u7D27\u968FECMAScript\u7684\u6807\u51C6\uFF0C\u6240\u4EE5ES6\u3001ES7\u3001ES8\u7B49\u65B0\u8BED\u6CD5\u6807\u51C6\uFF0C\u5B83\u90FD\u662F \u652F\u6301\u7684\uFF1B</li><li>\u5E76\u4E14\u5728\u8BED\u8A00\u5C42\u9762\u4E0A\uFF0C\u4E0D\u4EC5\u4EC5\u589E\u52A0\u4E86\u7C7B\u578B\u7EA6\u675F\uFF0C\u800C\u4E14\u5305\u62EC\u4E00\u4E9B\u8BED\u6CD5\u7684\u6269\u5C55\uFF0C\u6BD4\u5982\u679A\u4E3E\u7C7B\u578B\uFF08Enum\uFF09\u3001\u5143\u7EC4\u7C7B\u578B\uFF08Tuple\uFF09\u7B49\uFF1B</li><li>\u5E76\u4E14TypeScript\u6700\u7EC8\u4F1A\u88AB\u7F16\u8BD1\u6210JavaScript\u4EE3\u7801\uFF0C\u6240\u4EE5\u4F60\u5E76\u4E0D\u9700\u8981\u62C5\u5FC3\u5B83\u7684\u517C\u5BB9\u6027\u95EE\u9898\uFF0C<strong>\u5728\u7F16\u8BD1\u65F6\u4E5F\u4E0D\u9700\u8981\u501F\u52A9\u4E8EBabel\u8FD9\u6837\u7684\u5DE5\u5177\uFF1B</strong></li></ul><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204091318973.png" alt="image-20220409131819866"></p><h2 id="\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u578B" aria-hidden="true">#</a> \u7C7B\u578B</h2><ul><li><p>number</p></li><li><p>boolean</p></li><li><p>string</p></li><li><p>Array</p></li><li><p>Object</p></li><li><p>Symbol</p></li><li><p>null</p></li><li><p>undefined</p></li><li><p>any</p></li><li><p>unknown \uFF1A\u662FTypeScript\u4E2D\u6BD4\u8F83\u7279\u6B8A\u7684\u4E00\u79CD\u7C7B\u578B\uFF0C\u5B83\u7528\u4E8E\u63CF\u8FF0\u7C7B\u578B\u4E0D\u786E\u5B9A\u7684\u53D8\u91CF\u3002</p></li><li><p>void\uFF1A\u4E5F\u5C31\u662F\u51FD\u6570\u53EF\u4EE5\u8FD4\u56DEnull\u6216\u8005undefined</p></li><li><p>never\uFF1A\u662F\u4E00\u4E2A\u6B7B\u5FAA\u73AF\u6216\u8005\u629B\u51FA\u4E00\u4E2A\u5F02\u5E38</p></li><li><p>tuple\u5143\u7EC4\uFF1A</p><p>\u6570\u7EC4\u4E2D\u901A\u5E38\u5EFA\u8BAE\u5B58\u653E\u76F8\u540C\u7C7B\u578B\u7684\u5143\u7D20\uFF0C\u4E0D\u540C\u7C7B\u578B\u7684\u5143\u7D20\u662F\u4E0D\u63A8\u8350\u653E\u5728\u6570\u7EC4\u4E2D\u3002\uFF08\u53EF\u4EE5\u653E\u5728\u5BF9\u8C61\u6216\u8005\u5143\u7EC4 \u4E2D\uFF09</p><p>\u5143\u7EC4\u4E2D\u6BCF\u4E2A\u5143\u7D20\u90FD\u6709\u81EA\u5DF1\u7279\u6027\u7684\u7C7B\u578B\uFF0C\u6839\u636E\u7D22\u5F15\u503C\u83B7\u53D6\u5230\u7684\u503C\u53EF\u4EE5\u786E\u5B9A\u5BF9\u5E94\u7684\u7C7B\u578B\uFF1B</p></li></ul><h3 id="\u533F\u540D\u51FD\u6570\u7684\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#\u533F\u540D\u51FD\u6570\u7684\u53C2\u6570" aria-hidden="true">#</a> \u533F\u540D\u51FD\u6570\u7684\u53C2\u6570</h3><p>\u533F\u540D\u51FD\u6570\u4E0E\u51FD\u6570\u58F0\u660E\u4F1A\u6709\u4E00\u4E9B\u4E0D\u540C\uFF1A</p><ul><li>\u5F53\u4E00\u4E2A\u51FD\u6570\u51FA\u73B0\u5728TypeScript\u53EF\u4EE5\u786E\u5B9A\u8BE5\u51FD\u6570\u4F1A\u88AB\u5982\u4F55\u8C03\u7528\u7684\u5730\u65B9\u65F6\uFF1B\u8BE5\u51FD\u6570\u7684\u53C2\u6570\u4F1A\u81EA\u52A8\u6307\u5B9A\u7C7B\u578B\uFF1B</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>const names = [&quot;a&quot;, &quot;b&quot;];
names.forEach(item =&gt; {
    console.log(item.toUpperCase());
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u6211\u4EEC\u5E76\u6CA1\u6709\u6307\u5B9Aitem\u7684\u7C7B\u578B\uFF0C\u4F46\u662Fitem\u662F\u4E00\u4E2Astring\u7C7B\u578B\uFF1A</p><ul><li><p>\u8FD9\u662F\u56E0\u4E3ATypeScript\u4F1A\u6839\u636EforEach\u51FD\u6570\u7684\u7C7B\u578B\u4EE5\u53CA\u6570\u7EC4\u7684\u7C7B\u578B\u63A8\u65AD\u51FAitem\u7684\u7C7B\u578B\uFF1B</p></li><li><p>\u8FD9\u4E2A\u8FC7\u7A0B\u79F0\u4E4B\u4E3A\u4E0A\u4E0B\u6587\u7C7B\u578B\uFF08contextual typing\uFF09\uFF0C\u56E0\u4E3A\u51FD\u6570\u6267\u884C\u7684\u4E0A\u4E0B\u6587\u53EF\u4EE5\u5E2E\u52A9\u786E\u5B9A\u53C2\u6570\u548C\u8FD4\u56DE\u503C\u7684\u7C7B\u578B\uFF1B</p></li></ul><h3 id="\u8054\u5408\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u8054\u5408\u7C7B\u578B" aria-hidden="true">#</a> \u8054\u5408\u7C7B\u578B</h3><p>\u6211\u4EEC\u6765\u4F7F\u7528\u7B2C\u4E00\u79CD\u7EC4\u5408\u7C7B\u578B\u7684\u65B9\u6CD5\uFF1A\u8054\u5408\u7C7B\u578B\uFF08Union Type\uFF09</p><ul><li>\u8054\u5408\u7C7B\u578B\u662F\u7531\u4E24\u4E2A\u6216\u8005\u591A\u4E2A\u5176\u4ED6\u7C7B\u578B\u7EC4\u6210\u7684\u7C7B\u578B\uFF1B</li><li>\u8868\u793A\u53EF\u4EE5\u662F\u8FD9\u4E9B\u7C7B\u578B\u4E2D\u7684\u4EFB\u4F55\u4E00\u4E2A\u503C\uFF1B</li><li>\u8054\u5408\u7C7B\u578B\u4E2D\u7684\u6BCF\u4E00\u4E2A\u7C7B\u578B\u88AB\u79F0\u4E4B\u4E3A\u8054\u5408\u6210\u5458\uFF08union&#39;s members\uFF09\uFF1B</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>function printID(id: string | number) {
    console.log(id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>\u4F7F\u7528\u8054\u5408\u7C7B\u578B</strong></p><p>\u4F46\u662F\u6211\u4EEC\u62FF\u5230\u8FD9\u4E2A\u503C\u4E4B\u540E\uFF0C\u6211\u4EEC\u5E94\u8BE5\u5982\u4F55\u4F7F\u7528\u5B83\u5462\uFF1F\u56E0\u4E3A\u5B83\u53EF\u80FD\u662F\u4EFB\u4F55\u4E00\u79CD\u7C7B\u578B\u3002\u6BD4\u5982\u6211\u4EEC\u62FF\u5230\u7684\u503C\u53EF\u80FD\u662Fstring\u6216\u8005number\uFF0C\u6211\u4EEC\u5C31\u4E0D\u80FD\u5BF9\u5176\u8C03\u7528string\u4E0A\u7684\u4E00\u4E9B\u65B9\u6CD5\uFF1B</p><p><strong>\u4F7F\u7528\u7F29\u5C0F\uFF08narrow\uFF09\u8054\u5408</strong></p><p>TypeScript\u53EF\u4EE5\u6839\u636E\u6211\u4EEC\u7F29\u5C0F\u7684\u4EE3\u7801\u7ED3\u6784\uFF0C\u63A8\u65AD\u51FA\u66F4\u52A0\u5177\u4F53\u7684\u7C7B\u578B\uFF1B</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>function printID(id: string | number) {
    if (typeof id === &#39;string&#39;) {
        console.log(id.toUpperCase())
    } else {
        console.log(id)
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>\u53EF\u9009\u7C7B\u578B\u8865\u5145</strong></p><p>\u53EF\u9009\u7C7B\u578B\u53EF\u4EE5\u770B\u505A\u662F \u7C7B\u578B \u548C undefined \u7684\u8054\u5408\u7C7B\u578B\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>function print(message?: string) {
    console.log(message)
}

print(null) //Argument of type &#39;null&#39; is not assignable to parameter of type &#39;string | undefined&#39;.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="\u7C7B\u578B\u522B\u540D" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u578B\u522B\u540D" aria-hidden="true">#</a> \u7C7B\u578B\u522B\u540D</h3><p>\u5728\u524D\u9762\uFF0C\u6211\u4EEC\u901A\u8FC7\u5728\u7C7B\u578B\u6CE8\u89E3\u4E2D\u7F16\u5199 \u5BF9\u8C61\u7C7B\u578B \u548C \u8054\u5408\u7C7B\u578B\uFF0C\u4F46\u662F\u5F53\u6211\u4EEC\u60F3\u8981\u591A\u6B21\u5728\u5176\u4ED6\u5730\u65B9\u4F7F\u7528\u65F6\uFF0C\u5C31\u8981\u7F16\u5199\u591A \u6B21\u3002</p><p>\u6BD4\u5982\u6211\u4EEC\u53EF\u4EE5\u7ED9\u5BF9\u8C61\u7C7B\u578B\u8D77\u4E00\u4E2A\u522B\u540D\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// type\u7528\u4E8E\u5B9A\u4E49\u7C7B\u578B\u522B\u540D(type alias)
type IDType = string | number | boolean
type PointType = {
  x: number
  y: number
  z?: number
}

function printId(id: IDType) {}

function printPoint(point: PointType) {}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="\u7C7B\u578B\u65AD\u8A00as" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u578B\u65AD\u8A00as" aria-hidden="true">#</a> \u7C7B\u578B\u65AD\u8A00as</h3><p>\u6709\u65F6\u5019TypeScript\u65E0\u6CD5\u83B7\u53D6\u5177\u4F53\u7684\u7C7B\u578B\u4FE1\u606F\uFF0C\u8FD9\u4E2A\u6211\u4EEC\u9700\u8981\u4F7F\u7528\u7C7B\u578B\u65AD\u8A00\uFF08Type Assertions\uFF09</p><p>\u6BD4\u5982\u6211\u4EEC\u901A\u8FC7 document.getElementById\uFF0CTypeScript\u53EA\u77E5\u9053\u8BE5\u51FD\u6570\u4F1A\u8FD4\u56DE HTMLElement \uFF0C\u4F46\u5E76\u4E0D\u77E5\u9053\u5B83 \u5177\u4F53\u7684\u7C7B\u578B\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// 1.\u7C7B\u578B\u65AD\u8A00 as
const el = document.getElementById(&quot;why&quot;) as HTMLImageElement
el.src = &quot;url\u5730\u5740&quot;


// 2.\u53E6\u5916\u6848\u4F8B: Person\u662FStudent\u7684\u7236\u7C7B
class Person {

}

class Student extends Person {
  studying() {

  }
}

function sayHello(p: Person) {
  (p as Student).studying()
}

const stu = new Student()
sayHello(stu)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>TypeScript\u53EA\u5141\u8BB8\u7C7B\u578B\u65AD\u8A00\u8F6C\u6362\u4E3A \u66F4\u5177\u4F53 \u6216\u8005 \u4E0D\u592A\u5177\u4F53 \u7684\u7C7B\u578B\u7248\u672C\uFF0C\u6B64\u89C4\u5219\u53EF\u9632\u6B62\u4E0D\u53EF\u80FD\u7684\u5F3A\u5236\u8F6C\u6362\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>const message = &quot;Hello World&quot;
const num: number = (message as unknown) as number
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="\u975E\u7A7A\u7C7B\u578B\u65AD\u8A00" tabindex="-1"><a class="header-anchor" href="#\u975E\u7A7A\u7C7B\u578B\u65AD\u8A00" aria-hidden="true">#</a> \u975E\u7A7A\u7C7B\u578B\u65AD\u8A00 !</h3><p>\u975E\u7A7A\u65AD\u8A00\u4F7F\u7528\u7684\u662F ! \uFF0C\u8868\u793A\u53EF\u4EE5\u786E\u5B9A\u67D0\u4E2A\u6807\u8BC6\u7B26\u662F\u6709\u503C\u7684\uFF0C\u8DF3\u8FC7ts\u5728\u7F16\u8BD1\u9636\u6BB5\u5BF9\u5B83\u7684\u68C0\u6D4B\uFF1B</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// message? -&gt; undefined | string
function printMessageLength(message?: string) {
  // if (message) {
  //   console.log(message.length)
  // }
  // vue3\u6E90\u7801
  console.log(message!.length)
}

printMessageLength(&quot;aaaa&quot;)
printMessageLength(&quot;hello world&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="\u53EF\u9009\u94FE\u7684\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u53EF\u9009\u94FE\u7684\u4F7F\u7528" aria-hidden="true">#</a> \u53EF\u9009\u94FE\u7684\u4F7F\u7528</h3><p>\u53EF\u9009\u94FE\u4E8B\u5B9E\u4E0A\u5E76\u4E0D\u662FTypeScript\u72EC\u6709\u7684\u7279\u6027\uFF0C\u5B83\u662FES11\uFF08ES2020\uFF09\u4E2D\u589E\u52A0\u7684\u7279\u6027\uFF1A</p><p>\u53EF\u9009\u94FE\u4F7F\u7528\u53EF\u9009\u94FE\u64CD\u4F5C\u7B26 ?.\uFF1B\u5B83\u7684\u4F5C\u7528\u662F\u5F53\u5BF9\u8C61\u7684\u5C5E\u6027\u4E0D\u5B58\u5728\u65F6\uFF0C\u4F1A\u77ED\u8DEF\uFF0C\u76F4\u63A5\u8FD4\u56DEundefined\uFF0C\u5982\u679C\u5B58\u5728\uFF0C\u90A3\u4E48\u624D\u4F1A\u7EE7\u7EED\u6267\u884C\uFF1B\u867D\u7136\u53EF\u9009\u94FE\u64CD\u4F5C\u662FECMAScript\u63D0\u51FA\u7684\u7279\u6027\uFF0C\u4F46\u662F\u548CTypeScript\u4E00\u8D77\u4F7F\u7528\u66F4\u7248\u672C\uFF1B</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>type Person = {
  name: string
  friend?: {
    name: string
    age?: number,
    girlFriend?: {
      name: string
    }
  }
}

const info: Person = {
  name: &quot;why&quot;,
  friend: {
    name: &quot;kobe&quot;,
    girlFriend: {
      name: &quot;lily&quot;
    }
  }
}


// \u53E6\u5916\u4E00\u4E2A\u6587\u4EF6\u4E2D
console.log(info.name)
// console.log(info.friend!.name)
console.log(info.friend?.name)
console.log(info.friend?.age)
console.log(info.friend?.girlFriend?.name)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="\u548C-\u7684\u4F5C\u7528" tabindex="-1"><a class="header-anchor" href="#\u548C-\u7684\u4F5C\u7528" aria-hidden="true">#</a> ??\u548C!!\u7684\u4F5C\u7528</h3><p><strong>!!\u64CD\u4F5C\u7B26\uFF1A</strong></p><ul><li>\u5C06\u4E00\u4E2A\u5176\u4ED6\u7C7B\u578B\u8F6C\u6362\u6210boolean\u7C7B\u578B\uFF1B</li><li>\u7C7B\u4F3C\u4E8EBoolean(\u53D8\u91CF)\u7684\u65B9\u5F0F\uFF1B</li></ul><p><strong>??\u64CD\u4F5C\u7B26\uFF1A</strong></p><ul><li>\u5B83\u662FES11\u589E\u52A0\u7684\u65B0\u7279\u6027\uFF1B<strong>\u7A7A\u503C\u5408\u5E76\u64CD\u4F5C\u7B26\uFF08??\uFF09\u662F\u4E00\u4E2A\u903B\u8F91\u64CD\u4F5C\u7B26\uFF0C\u5F53\u64CD\u4F5C\u7B26\u7684\u5DE6\u4FA7\u662F null \u6216\u8005 undefined \u65F6\uFF0C\u8FD4\u56DE\u5176\u53F3\u4FA7\u64CD\u4F5C\u6570\uFF0C \u5426\u5219\u8FD4\u56DE\u5DE6\u4FA7\u64CD\u4F5C\u6570\uFF1B</strong></li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>let message: string|null = &quot;Hello World&quot;

const content = message ?? &quot;\u4F60\u597D\u554A, \u674E\u94F6\u6CB3&quot;
// const content = message ? message: &quot;\u4F60\u597D\u554A, \u674E\u94F6\u6CB3&quot;
console.log(content)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="\u5B57\u9762\u91CF\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u5B57\u9762\u91CF\u7C7B\u578B" aria-hidden="true">#</a> \u5B57\u9762\u91CF\u7C7B\u578B</h3><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u5355\u72EC\u4F7F\u7528\u662F\u6CA1\u6709\u592A\u5927\u7684\u610F\u4E49\u7684\uFF0C\u4F46\u662F\u6211\u4EEC\u53EF\u4EE5\u5C06\u591A\u4E2A\u7C7B\u578B\u8054\u5408\u5728\u4E00\u8D77</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// &quot;Hello World&quot;\u4E5F\u662F\u53EF\u4EE5\u4F5C\u4E3A\u7C7B\u578B\u7684, \u53EB\u505A\u5B57\u9762\u91CF\u7C7B\u578B
const message: &quot;Hello World&quot; = &quot;Hello World&quot;

// let num: 123 = 123
// num = 321


// \u5B57\u9762\u91CF\u7C7B\u578B\u7684\u610F\u4E49, \u5C31\u662F\u5FC5\u987B\u7ED3\u5408\u8054\u5408\u7C7B\u578B
type Alignment = &#39;left&#39; | &#39;right&#39; | &#39;center&#39;

let align: Alignment = &#39;left&#39;
align = &#39;right&#39;
align = &#39;center&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>\u5B57\u9762\u91CF\u63A8\u7406</strong></p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// const info = {
//   name: &quot;why&quot;,
//   age: 18
// }

// info.name = &quot;kobe&quot;

// 

type Method = &#39;GET&#39; | &#39;POST&#39;
function request(url: string, method: Method) {}

type Request = {
  url: string,
  method: Method
}
// \u65B9\u6CD5\u4E00
const options = {
  url: &quot;https://www.coderwhy.org/abc&quot;,
  method: &quot;POST&quot;
} as const

request(options.url, options.method)

// \u65B9\u6CD5\u4E8C
const options = {
    url: &quot;https://www.coderwhy.org/abc&quot;,
    method: &quot;POST&quot;
}

request(options.url, options.method as &#39;GET&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h3 id="\u7C7B\u578B\u7F29\u5C0F" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u578B\u7F29\u5C0F" aria-hidden="true">#</a> \u7C7B\u578B\u7F29\u5C0F</h3><p>\u5728\u7ED9\u5B9A\u7684\u6267\u884C\u8DEF\u5F84\u4E2D\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7F29\u5C0F\u6BD4\u58F0\u660E\u65F6\u66F4\u5C0F\u7684\u7C7B\u578B\uFF0C\u8FD9\u4E2A\u8FC7\u7A0B\u79F0\u4E4B\u4E3A \u7F29\u5C0F;\u800C\u6211\u4EEC\u7F16\u5199\u7684 typeof padding === &quot;number \u53EF\u4EE5\u79F0\u4E4B\u4E3A \u7C7B\u578B\u4FDD\u62A4\uFF08type guards\uFF09\uFF1B</p><p>\u5E38\u89C1\u7684\u7C7B\u578B\u4FDD\u62A4\u6709\u5982\u4E0B\u51E0\u79CD\uFF1A</p><ul><li>typeof</li><li>\u5E73\u7B49\u7F29\u5C0F\uFF08\u6BD4\u5982===\u3001!==\uFF09</li><li>instanceof</li><li>in</li><li>\u7B49\u7B49...</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// 1.typeof\u7684\u7C7B\u578B\u7F29\u5C0F
type IDType = number | string
function printID(id: IDType) {
  if (typeof id === &#39;string&#39;) {
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}

// 2.\u5E73\u7B49\u7684\u7C7B\u578B\u7F29\u5C0F(=== == !== !=/switch)
type Direction = &quot;left&quot; | &quot;right&quot; | &quot;top&quot; | &quot;bottom&quot;
function printDirection(direction: Direction) {
  // 1.if\u5224\u65AD
  // if (direction === &#39;left&#39;) {
  //   console.log(direction)
  // } else if ()

  // 2.switch\u5224\u65AD
  // switch (direction) {
  //   case &#39;left&#39;:
  //     console.log(direction)
  //     break;
  //   case ...
  // }
}

// 3.instanceof
function printTime(time: string | Date) {
  if (time instanceof Date) {
    console.log(time.toUTCString())
  } else {
    console.log(time)
  }
}

class Student {
  studying() {}
}

class Teacher {
  teaching() {}
}

function work(p: Student | Teacher) {
  if (p instanceof Student) {
    p.studying()
  } else {
    p.teaching()
  }
}

const stu = new Student()
work(stu)

// 4. in
type Fish = {
  swimming: () =&gt; void
}

type Dog = {
  running: () =&gt; void
}

function walk(animal: Fish | Dog) {
  if (&#39;swimming&#39; in animal) {
    animal.swimming()
  } else {
    animal.running()
  }
}

const fish: Fish = {
  swimming() {
    console.log(&quot;swimming&quot;)
  }
}

walk(fish)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br></div></div><h3 id="typescript\u51FD\u6570\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#typescript\u51FD\u6570\u7C7B\u578B" aria-hidden="true">#</a> TypeScript\u51FD\u6570\u7C7B\u578B</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// 1.\u51FD\u6570\u4F5C\u4E3A\u53C2\u6570\u65F6, \u5728\u53C2\u6570\u4E2D\u5982\u4F55\u7F16\u5199\u7C7B\u578B
function foo() {}

type FooFnType = () =&gt; void
function bar(fn: FooFnType) {
  fn()
}

bar(foo)

// 2.\u5B9A\u4E49\u5E38\u91CF\u65F6, \u7F16\u5199\u51FD\u6570\u7684\u7C7B\u578B
type AddFnType = (num1: number, num2: number) =&gt; number
const add: AddFnType = (a1: number, a2: number) =&gt; {
  return a1 + a2
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u6848\u4F8B</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>function calc(n1: number, n2: number, fn: (num1: number, num2: number) =&gt; number) {
  return fn(n1, n2)
}

const result1 = calc(20, 30, function(a1, a2) {
  return a1 + a2
})
console.log(result1)

const result2 = calc(20, 30, function(a1, a2) {
  return a1 * a2
})
console.log(result2)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="this\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#this\u7C7B\u578B" aria-hidden="true">#</a> this\u7C7B\u578B</h3><p>TypeScript\u8FDB\u884C\u7C7B\u578B\u68C0\u6D4B\u7684\u76EE\u7684\u662F\u8BA9\u6211\u4EEC\u7684\u4EE3\u7801\u66F4\u52A0\u7684\u5B89\u5168\uFF0C\u4F1A\u53BB\u63A8\u5BFC\u4F7F\u7528\u7684this\u662F\u5426\u5B89\u5168\u5408\u6CD5\u3002</p><h2 id="\u91CD\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u91CD\u8F7D" aria-hidden="true">#</a> \u91CD\u8F7D</h2><h3 id="\u51FD\u6570\u7684\u91CD\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u51FD\u6570\u7684\u91CD\u8F7D" aria-hidden="true">#</a> \u51FD\u6570\u7684\u91CD\u8F7D</h3><p>\u5728TypeScript\u4E2D\uFF0C\u5982\u679C\u6211\u4EEC\u7F16\u5199\u4E86\u4E00\u4E2Aadd\u51FD\u6570\uFF0C\u5E0C\u671B\u53EF\u4EE5\u5BF9\u5B57\u7B26\u4E32\u548C\u6570\u5B57\u7C7B\u578B\u8FDB\u884C\u76F8\u52A0\uFF0C\u5E94\u8BE5\u5982\u4F55\u7F16\u5199\u5462\uFF1F</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// \u51FD\u6570\u7684\u91CD\u8F7D: \u51FD\u6570\u7684\u540D\u79F0\u76F8\u540C, \u4F46\u662F\u53C2\u6570\u4E0D\u540C\u7684\u51E0\u4E2A\u51FD\u6570, \u5C31\u662F\u51FD\u6570\u7684\u91CD\u8F7D
function add(num1: number, num2: number): number; // \u6CA1\u51FD\u6570\u4F53
function add(num1: string, num2: string): string;

function add(num1: any, num2: any): any {
  if (typeof num1 === &#39;string&#39; &amp;&amp; typeof num2 === &#39;string&#39;) {
    return num1.length + num2.length
  }
  return num1 + num2
}

const result = add(20, 30)
const result2 = add(&quot;abc&quot;, &quot;cba&quot;)
console.log(result)
console.log(result2)

// \u5728\u51FD\u6570\u7684\u91CD\u8F7D\u4E2D, \u5B9E\u73B0\u51FD\u6570\u662F\u4E0D\u80FD\u76F4\u63A5\u88AB\u8C03\u7528\u7684
// add({name: &quot;why&quot;}, {age: 18})

export {}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="\u8054\u5408\u7C7B\u578B\u548C\u91CD\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u8054\u5408\u7C7B\u578B\u548C\u91CD\u8F7D" aria-hidden="true">#</a> \u8054\u5408\u7C7B\u578B\u548C\u91CD\u8F7D</h3><p>\u6211\u4EEC\u73B0\u5728\u6709\u4E00\u4E2A\u9700\u6C42\uFF1A\u5B9A\u4E49\u4E00\u4E2A\u51FD\u6570\uFF0C\u53EF\u4EE5\u4F20\u5165\u5B57\u7B26\u4E32\u6216\u8005\u6570\u7EC4\uFF0C\u83B7\u53D6\u5B83\u4EEC\u7684\u957F\u5EA6\u3002</p><p>\u8FD9\u91CC\u6709\u4E24\u79CD\u5B9E\u73B0\u65B9\u6848\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// \u5B9E\u73B0\u65B9\u5F0F\u4E00: \u8054\u5408\u7C7B\u578B
function getLength(args: string | any[]) {
    return args.length
}


// \u5B9E\u73B0\u65B9\u5F0F\u4E8C: \u51FD\u6570\u7684\u91CD\u8F7D
function getLength(args: string): number;
function getLength(args: any[]): number;

function getLength(args: any): number {
  return args.length
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="\u7C7B\u7684\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u7684\u4F7F\u7528" aria-hidden="true">#</a> \u7C7B\u7684\u4F7F\u7528</h2><h3 id="getters-setters" tabindex="-1"><a class="header-anchor" href="#getters-setters" aria-hidden="true">#</a> getters/setters</h3><p>\u5728\u524D\u9762\u4E00\u4E9B\u79C1\u6709\u5C5E\u6027\u6211\u4EEC\u662F\u4E0D\u80FD\u76F4\u63A5\u8BBF\u95EE\u7684\uFF0C\u6216\u8005\u67D0\u4E9B\u5C5E\u6027\u6211\u4EEC\u60F3\u8981\u76D1\u542C\u5B83\u7684\u83B7\u53D6(getter)\u548C\u8BBE\u7F6E(setter)\u7684\u8FC7\u7A0B\uFF0C \u8FD9\u4E2A\u65F6\u5019\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u5B58\u53D6\u5668\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>class Person {
  private _name: string
  constructor(name: string) {
    this._name = name
  }

  // \u8BBF\u95EE\u5668setter/getter
  // setter
  set name(newName) {
    this._name = newName
  }
  // getter
  get name() {
    return this._name
  }
}

const p = new Person(&quot;why&quot;)
p.name = &quot;coderwhy&quot;
console.log(p.name)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="\u9759\u6001\u6210\u5458" tabindex="-1"><a class="header-anchor" href="#\u9759\u6001\u6210\u5458" aria-hidden="true">#</a> \u9759\u6001\u6210\u5458</h3><p>\u524D\u9762\u6211\u4EEC\u5728\u7C7B\u4E2D\u5B9A\u4E49\u7684\u6210\u5458\u548C\u65B9\u6CD5\u90FD\u5C5E\u4E8E\u5BF9\u8C61\u7EA7\u522B\u7684, \u5728\u5F00\u53D1\u4E2D, \u6211\u4EEC\u6709\u65F6\u5019\u4E5F\u9700\u8981\u5B9A\u4E49\u7C7B\u7EA7\u522B\u7684\u6210\u5458\u548C\u65B9\u6CD5\u3002\u5728TypeScript\u4E2D\u901A\u8FC7\u5173\u952E\u5B57static\u6765\u5B9A\u4E49\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>class Student {
  static time: string = &quot;20:00&quot;

  static attendClass() {
    console.log(&quot;\u53BB\u5B66\u4E60~&quot;)
  }
}

console.log(Student.time)
Student.attendClass()
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="\u62BD\u8C61\u7C7Babstract" tabindex="-1"><a class="header-anchor" href="#\u62BD\u8C61\u7C7Babstract" aria-hidden="true">#</a> \u62BD\u8C61\u7C7Babstract</h3><p>\u5728TypeScript\u4E2D\u6CA1\u6709\u5177\u4F53\u5B9E\u73B0\u7684\u65B9\u6CD5(\u6CA1\u6709\u65B9\u6CD5\u4F53)\uFF0C\u5C31\u662F\u62BD\u8C61\u65B9\u6CD5</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>
function makeArea(shape: Shape) {
  return shape.getArea()
}


abstract class Shape {
  abstract getArea(): number
}


class Rectangle extends Shape {
  private width: number
  private height: number

  constructor(width: number, height: number) {
    super()
    this.width = width
    this.height = height
  }

  getArea() {
    return this.width * this.height
  }
}

class Circle extends Shape {
  private r: number

  constructor(r: number) {
    super()
    this.r = r
  }

  getArea() {
    return this.r * this.r * 3.14
  }
}

const rectangle = new Rectangle(20, 30)
const circle = new Circle(10)

console.log(makeArea(rectangle))
console.log(makeArea(circle))
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><h3 id="\u7C7B\u7684\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u7684\u7C7B\u578B" aria-hidden="true">#</a> \u7C7B\u7684\u7C7B\u578B</h3><p>\u7C7B\u672C\u8EAB\u4E5F\u662F\u53EF\u4EE5\u4F5C\u4E3A\u4E00\u79CD\u6570\u636E\u7C7B\u578B\u7684\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>class Person {
  name: string = &quot;123&quot;
  eating() {

  }
}

const p = new Person()

const p1: Person = {
  name: &quot;why&quot;,
  eating() {

  }
}

function printPerson(p: Person) {
  console.log(p.name)
}

printPerson(new Person())
printPerson({name: &quot;kobe&quot;, eating: function() {}})

export {}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="\u53EF\u9009\u5C5E\u6027-\u53EA\u8BFB\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u53EF\u9009\u5C5E\u6027-\u53EA\u8BFB\u5C5E\u6027" aria-hidden="true">#</a> \u53EF\u9009\u5C5E\u6027 \u53EA\u8BFB\u5C5E\u6027</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// \u901A\u8FC7\u7C7B\u578B(type)\u522B\u540D\u6765\u58F0\u660E\u5BF9\u8C61\u7C7B\u578B
// type InfoType = {name: string, age: number}

// \u53E6\u5916\u4E00\u79CD\u65B9\u5F0F\u58F0\u660E\u5BF9\u8C61\u7C7B\u578B: \u63A5\u53E3interface
// \u5728\u5176\u4E2D\u53EF\u4EE5\u5B9A\u4E49\u53EF\u9009\u7C7B\u578B
// \u4E5F\u53EF\u4EE5\u5B9A\u4E49\u53EA\u8BFB\u5C5E\u6027
interface IInfoType {
  readonly name: string
  age: number
  friend?: {
    name: string
  }
}

const info: IInfoType = {
  name: &quot;why&quot;,
  age: 18,
  friend: {
    name: &quot;kobe&quot;
  }
}

console.log(info.friend?.name)
console.log(info.name)
// info.name = &quot;123&quot;
info.age = 20

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="\u7D22\u5F15\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u7D22\u5F15\u7C7B\u578B" aria-hidden="true">#</a> \u7D22\u5F15\u7C7B\u578B</h3><p>\u524D\u9762\u6211\u4EEC\u4F7F\u7528interface\u6765\u5B9A\u4E49\u5BF9\u8C61\u7C7B\u578B\uFF0C\u8FD9\u4E2A\u65F6\u5019\u5176\u4E2D\u7684\u5C5E\u6027\u540D\u3001\u7C7B\u578B\u3001\u65B9\u6CD5\u90FD\u662F\u786E\u5B9A\u7684\uFF0C\u4F46\u662F\u6709\u65F6\u5019\u6211\u4EEC\u4F1A\u9047 \u5230\u7C7B\u4F3C\u4E0B\u9762\u7684\u5BF9\u8C61\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// \u901A\u8FC7interface\u6765\u5B9A\u4E49\u7D22\u5F15\u7C7B\u578B
interface IndexLanguage {
  [index: number]: string
}

const frontLanguage: IndexLanguage = {
  0: &quot;HTML&quot;,
  1: &quot;CSS&quot;,
  2: &quot;JavaScript&quot;,
  3: &quot;Vue&quot;
}


interface ILanguageYear {
  [name: string]: number
}

const languageYear: ILanguageYear = {
  &quot;C&quot;: 1972,
  &quot;Java&quot;: 1995,
  &quot;JavaScript&quot;: 1996,
  &quot;TypeScript&quot;: 2014
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="\u51FD\u6570\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u51FD\u6570\u7C7B\u578B" aria-hidden="true">#</a> \u51FD\u6570\u7C7B\u578B</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// type CalcFn = (n1: number, n2: number) =&gt; number
// \u53EF\u8C03\u7528\u7684\u63A5\u53E3
interface CalcFn {
  (n1: number, n2: number): number
}

function calc(num1: number, num2: number, calcFn: CalcFn) {
  return calcFn(num1, num2)
}

const add: CalcFn = (num1, num2) =&gt; {
  return num1 + num2
}

calc(20, 30, add)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u9664\u975E\u7279\u522B\u7684\u60C5\u51B5\uFF0C\u8FD8\u662F\u63A8\u8350\u5927\u5BB6\u4F7F\u7528\u7C7B\u578B\u522B\u540D\u6765\u5B9A\u4E49\u51FD\u6570\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>type CalcFunc = (nums1: number, num2: number) =&gt; number
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="\u63A5\u53E3\u7EE7\u627F" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u7EE7\u627F" aria-hidden="true">#</a> \u63A5\u53E3\u7EE7\u627F</h3><p>\u63A5\u53E3\u548C\u7C7B\u4E00\u6837\u662F\u53EF\u4EE5\u8FDB\u884C\u7EE7\u627F\u7684\uFF0C\u4E5F\u662F\u4F7F\u7528extends\u5173\u952E\u5B57\uFF1A</p><p>\u5E76\u4E14\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C\u63A5\u53E3\u662F\u652F\u6301\u591A\u7EE7\u627F\u7684**\uFF08\u7C7B\u4E0D\u652F\u6301\u591A\u7EE7\u627F\uFF09**</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>interface ISwim {
  swimming: () =&gt; void
}

interface IFly {
  flying: () =&gt; void
}


interface IAction extends ISwim, IFly {

}

const action: IAction = {
  swimming() {

  },
  flying() {
    
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="\u63A5\u53E3\u7684\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u7684\u5B9E\u73B0" aria-hidden="true">#</a> \u63A5\u53E3\u7684\u5B9E\u73B0</h3><p>\u63A5\u53E3\u5B9A\u4E49\u540E\uFF0C\u4E5F\u662F\u53EF\u4EE5\u88AB\u7C7B\u5B9E\u73B0\u7684\uFF1A</p><ul><li>\u5982\u679C\u88AB\u4E00\u4E2A\u7C7B\u5B9E\u73B0\uFF0C\u90A3\u4E48\u5728\u4E4B\u540E\u9700\u8981\u4F20\u5165\u63A5\u53E3\u7684\u5730\u65B9\uFF0C\u90FD\u53EF\u4EE5\u5C06\u8FD9\u4E2A\u7C7B\u4F20\u5165\uFF1B</li><li>\u8FD9\u5C31\u662F\u9762\u5411\u63A5\u53E3\u5F00\u53D1\uFF1B</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>class Animal {
  
}

// \u7EE7\u627F: \u53EA\u80FD\u5B9E\u73B0\u5355\u7EE7\u627F
// \u5B9E\u73B0: \u5B9E\u73B0\u63A5\u53E3, \u7C7B\u53EF\u4EE5\u5B9E\u73B0\u591A\u4E2A\u63A5\u53E3
class Fish extends Animal implements ISwim, IEat {
  swimming() {
    console.log(&quot;Fish Swmming&quot;)
  }

  eating() {
    console.log(&quot;Fish Eating&quot;)
  }
}


class Person implements ISwim {
  swimming() {
    console.log(&quot;Person Swimming&quot;)
  }
}


// \u7F16\u5199\u4E00\u4E9B\u516C\u5171\u7684API: \u9762\u5411\u63A5\u53E3\u7F16\u7A0B
function swimAction(swimable: ISwim) {
  swimable.swimming()
}

// 1.\u6240\u6709\u5B9E\u73B0\u4E86\u63A5\u53E3\u7684\u7C7B\u5BF9\u5E94\u7684\u5BF9\u8C61, \u90FD\u662F\u53EF\u4EE5\u4F20\u5165
swimAction(new Fish())
swimAction(new Person())


swimAction({swimming: function() {}})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="\u4EA4\u53C9\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u4EA4\u53C9\u7C7B\u578B" aria-hidden="true">#</a> \u4EA4\u53C9\u7C7B\u578B</h3><p>\u53E6\u5916\u4E00\u79CD\u7C7B\u578B\u5408\u5E76\uFF0C\u5C31\u662F\u4EA4\u53C9\u7C7B\u578B\uFF08Intersection Types\uFF09\uFF1A</p><p>\u4EA4\u53C9\u7C7B\u4F3C\u8868\u793A\u9700\u8981\u6EE1\u8DB3\u591A\u4E2A\u7C7B\u578B\u7684\u6761\u4EF6\uFF0C\u4EA4\u53C9\u7C7B\u578B\u4F7F\u7528 &amp; \u7B26\u53F7\uFF1B</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// \u4E00\u79CD\u7EC4\u5408\u7C7B\u578B\u7684\u65B9\u5F0F: \u8054\u5408\u7C7B\u578B
type WhyType = number | string
type Direction = &quot;left&quot; | &quot;right&quot; | &quot;center&quot;


// \u53E6\u4E00\u79CD\u7EC4\u4EF6\u7C7B\u578B\u7684\u65B9\u5F0F: \u4EA4\u53C9\u7C7B\u578B
type WType = number &amp; string

interface ISwim {
  swimming: () =&gt; void
}

interface IFly {
  flying: () =&gt; void
}

type MyType1 = ISwim | IFly
type MyType2 = ISwim &amp; IFly // \u9700\u8981\u540C\u65F6\u5B9E\u73B0

const obj1: MyType1 = {
  flying() {

  }
}

const obj2: MyType2 = {
  swimming() {

  },
  flying() {
    
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h3 id="\u679A\u4E3E\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u679A\u4E3E\u7C7B\u578B" aria-hidden="true">#</a> \u679A\u4E3E\u7C7B\u578B</h3><p>\u679A\u4E3E\u7C7B\u578B\u662F\u4E3A\u6570\u4E0D\u591A\u7684TypeScript\u7279\u6027\u6709\u7684\u7279\u6027\u4E4B\u4E00\uFF1A</p><ul><li>\u679A\u4E3E\u5176\u5B9E\u5C31\u662F\u5C06\u4E00\u7EC4\u53EF\u80FD\u51FA\u73B0\u7684\u503C\uFF0C\u4E00\u4E2A\u4E2A\u5217\u4E3E\u51FA\u6765\uFF0C\u5B9A\u4E49\u5728\u4E00\u4E2A\u7C7B\u578B\u4E2D\uFF0C\u8FD9\u4E2A\u7C7B\u578B\u5C31\u662F\u679A\u4E3E\u7C7B\u578B\uFF1B</li><li>\u679A\u4E3E\u5141\u8BB8\u5F00\u53D1\u8005\u5B9A\u4E49\u4E00\u7EC4\u547D\u540D\u5E38\u91CF\uFF0C\u5E38\u91CF\u53EF\u4EE5\u662F\u6570\u5B57\u3001\u5B57\u7B26\u4E32\u7C7B\u578B\uFF1B</li></ul><p><strong>\u679A\u4E3E\u7C7B\u578B\u7684\u503C</strong></p><p>\u679A\u4E3E\u7C7B\u578B\u9ED8\u8BA4\u662F\u6709\u503C\u7684\uFF0C\u6BD4\u5982\u4E0A\u9762\u7684\u679A\u4E3E\uFF0C\u9ED8\u8BA4\u503C\u662F\u8FD9\u6837\u7684:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>enum Direction {
  LEFT = 0,
  RIGHT = 1,
  TOP = 2,
  BOTTOM = 3
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u4EE3\u7801\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// type Direction = &quot;left&quot; | &quot;Right&quot; | &quot;Top&quot; | &quot;Bottom&quot;

enum Direction {
  LEFT = &quot;LEFT&quot;,
  RIGHT = &quot;RIGHT&quot;,
  TOP = &quot;TOP&quot;,
  BOTTOM = &quot;BOTTOM&quot;
}

let name: string = &quot;abc&quot;
let d: Direction = Direction.BOTTOM

function turnDirection(direction: Direction) {
  console.log(direction)
  switch (direction) {
    case Direction.LEFT:
      console.log(&quot;\u6539\u53D8\u89D2\u8272\u7684\u65B9\u5411\u5411\u5DE6&quot;)
      break;
    case Direction.RIGHT:
      console.log(&quot;\u6539\u53D8\u89D2\u8272\u7684\u65B9\u5411\u5411\u53F3&quot;)
      break;
    case Direction.TOP:
      console.log(&quot;\u6539\u53D8\u89D2\u8272\u7684\u65B9\u5411\u5411\u4E0A&quot;)
      break;
    case Direction.BOTTOM:
      console.log(&quot;\u6539\u53D8\u89D2\u8272\u7684\u65B9\u5411\u5411\u4E0B&quot;)
      break;
    default:
      const foo: never = direction;
      break;
  }
}

turnDirection(Direction.LEFT)
turnDirection(Direction.RIGHT)
turnDirection(Direction.TOP)
turnDirection(Direction.BOTTOM)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h3 id="\u6CDB\u578B" tabindex="-1"><a class="header-anchor" href="#\u6CDB\u578B" aria-hidden="true">#</a> \u6CDB\u578B</h3><p>\u8F6F\u4EF6\u5DE5\u7A0B\u7684\u4E3B\u8981\u76EE\u7684\u662F\u6784\u5EFA\u4E0D\u4EC5\u4EC5\u660E\u786E\u548C\u4E00\u81F4\u7684API\uFF0C\u8FD8\u8981\u8BA9\u4F60\u7684\u4EE3\u7801\u5177\u6709\u5F88\u5F3A\u7684\u53EF\u91CD\u7528\u6027\uFF1A</p><ul><li>\u6BD4\u5982\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u51FD\u6570\u6765\u5C01\u88C5\u4E00\u4E9BAPI\uFF0C\u901A\u8FC7\u4F20\u5165\u4E0D\u540C\u7684\u51FD\u6570\u53C2\u6570\uFF0C\u8BA9\u51FD\u6570\u5E2E\u52A9\u6211\u4EEC\u5B8C\u6210\u4E0D\u540C\u7684\u64CD\u4F5C\uFF1B\u4F46\u662F\u5BF9\u4E8E\u53C2\u6570\u7684\u7C7B\u578B\u662F\u5426\u4E5F\u53EF\u4EE5\u53C2\u6570\u5316\u3002</li></ul><p><strong>\u4EC0\u4E48\u662F\u7C7B\u578B\u7684\u53C2\u6570\u5316\uFF1F</strong></p><p>\u5C01\u88C5\u4E00\u4E2A\u51FD\u6570\uFF0C\u4F20\u5165\u4E00\u4E2A\u53C2\u6570\uFF0C\u5E76\u4E14\u8FD4\u56DE\u8FD9\u4E2A\u53C2\u6570\uFF1B</p><p>TS\u901A\u8FC7\u7C7B\u578B\u63A8\u5230\uFF0C\u81EA\u52A8\u63A8\u5230\u51FA\u6211\u4EEC\u4F20\u5165\u53D8\u91CF\u7684\u7C7B\u578B</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>// \u5728\u5B9A\u4E49\u8FD9\u4E2A\u51FD\u6570\u65F6, \u6211\u4E0D\u51B3\u5B9A\u8FD9\u4E9B\u53C2\u6570\u7684\u7C7B\u578B
// \u800C\u662F\u8BA9\u8C03\u7528\u8005\u4EE5\u53C2\u6570\u7684\u5F62\u5F0F\u544A\u77E5,\u6211\u8FD9\u91CC\u7684\u51FD\u6570\u53C2\u6570\u5E94\u8BE5\u662F\u4EC0\u4E48\u7C7B\u578B
function sum&lt;Type&gt;(num: Type): Type {
  return num
}

// 1.\u8C03\u7528\u65B9\u5F0F\u4E00: \u660E\u786E\u7684\u4F20\u5165\u7C7B\u578B
sum&lt;number&gt;(20)
sum&lt;{name: string}&gt;({name: &quot;why&quot;})
sum&lt;any[]&gt;([&quot;abc&quot;])

// 2.\u8C03\u7528\u65B9\u5F0F\u4E8C: \u7C7B\u578B\u63A8\u5230
sum(50)
sum(&quot;abc&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>\u5E73\u65F6\u5728\u5F00\u53D1\u4E2D\u6211\u4EEC\u53EF\u80FD\u4F1A\u770B\u5230\u4E00\u4E9B\u5E38\u7528\u7684\u540D\u79F0\uFF1A</strong></p><p>T\uFF1AType\u7684\u7F29\u5199\uFF0C\u7C7B\u578B</p><p>K\u3001V\uFF1Akey\u548Cvalue\u7684\u7F29\u5199\uFF0C\u952E\u503C\u5BF9</p><p>E\uFF1AElement\u7684\u7F29\u5199\uFF0C\u5143\u7D20</p><p>O\uFF1AObject\u7684\u7F29\u5199\uFF0C\u5BF9\u8C61</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>function foo&lt;T, E, O&gt;(arg1: T, arg2: E, arg3?: O, ...args: T[]) {

}

foo&lt;number, string, boolean&gt;(10, &quot;abc&quot;, true)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="\u6CDB\u578B\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#\u6CDB\u578B\u63A5\u53E3" aria-hidden="true">#</a> \u6CDB\u578B\u63A5\u53E3</h3><p>\u5728\u5B9A\u4E49\u63A5\u53E3\u7684\u65F6\u5019\u6211\u4EEC\u4E5F\u53EF\u4EE5\u4F7F\u7528\u6CDB\u578B\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>interface IPerson&lt;T1 = string, T2 = number&gt; {
  name: T1
  age: T2
}

const p: IPerson = {
  name: &quot;why&quot;,
  age: 18
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="\u6CDB\u578B\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u6CDB\u578B\u7C7B" aria-hidden="true">#</a> \u6CDB\u578B\u7C7B</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>class Point&lt;T&gt; {
  x: T
  y: T
  z: T

  constructor(x: T, y: T, z: T) {
    this.x = x
    this.y = y
    this.z = y
  }
}

const p1 = new Point(&quot;1.33.2&quot;, &quot;2.22.3&quot;, &quot;4.22.1&quot;)
const p2 = new Point&lt;string&gt;(&quot;1.33.2&quot;, &quot;2.22.3&quot;, &quot;4.22.1&quot;)
const p3: Point&lt;string&gt; = new Point(&quot;1.33.2&quot;, &quot;2.22.3&quot;, &quot;4.22.1&quot;)

const names1: string[] = [&quot;abc&quot;, &quot;cba&quot;, &quot;nba&quot;]
const names2: Array&lt;string&gt; = [&quot;abc&quot;, &quot;cba&quot;, &quot;nba&quot;] // \u4E0D\u63A8\u8350(react jsx &lt;&gt;)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="\u6CDB\u578B\u7EA6\u675F" tabindex="-1"><a class="header-anchor" href="#\u6CDB\u578B\u7EA6\u675F" aria-hidden="true">#</a> \u6CDB\u578B\u7EA6\u675F</h3><p>\u6709\u65F6\u5019\u6211\u4EEC\u5E0C\u671B\u4F20\u5165\u7684\u7C7B\u578B\u6709\u67D0\u4E9B\u5171\u6027\uFF0C\u4F46\u662F\u8FD9\u4E9B\u5171\u6027\u53EF\u80FD\u4E0D\u662F\u5728\u540C\u4E00\u79CD\u7C7B\u578B\u4E2D\uFF1A</p><ul><li>\u6BD4\u5982string\u548Carray\u90FD\u662F\u6709length\u7684\uFF0C\u6216\u8005\u67D0\u4E9B\u5BF9\u8C61\u4E5F\u662F\u4F1A\u6709length\u5C5E\u6027\u7684\uFF1B</li><li>\u90A3\u4E48\u53EA\u8981\u662F\u62E5\u6709length\u7684\u5C5E\u6027\u90FD\u53EF\u4EE5\u4F5C\u4E3A\u6211\u4EEC\u7684\u53C2\u6570\u7C7B\u578B\uFF0C\u90A3\u4E48\u5E94\u8BE5\u5982\u4F55\u64CD\u4F5C\u5462\uFF1F</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>interface ILength {
  length: number
}

function getLength&lt;T extends ILength&gt;(arg: T) {
  return arg.length
}

getLength(&quot;abc&quot;)
getLength([&quot;abc&quot;, &quot;cba&quot;])
getLength({length: 100})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="\u6A21\u5757\u5316\u5F00\u53D1" tabindex="-1"><a class="header-anchor" href="#\u6A21\u5757\u5316\u5F00\u53D1" aria-hidden="true">#</a> \u6A21\u5757\u5316\u5F00\u53D1</h2><p>TypeScript\u652F\u6301\u4E24\u79CD\u65B9\u5F0F\u6765\u63A7\u5236\u6211\u4EEC\u7684\u4F5C\u7528\u57DF\uFF1A</p><ul><li>\u6A21\u5757\u5316\uFF1A\u6BCF\u4E2A\u6587\u4EF6\u53EF\u4EE5\u662F\u4E00\u4E2A\u72EC\u7ACB\u7684\u6A21\u5757\uFF0C\u652F\u6301ES Module\uFF0C\u4E5F\u652F\u6301CommonJS\uFF1B</li><li>\u547D\u540D\u7A7A\u95F4\uFF1A\u901A\u8FC7namespace\u6765\u58F0\u660E\u4E00\u4E2A\u547D\u540D\u7A7A\u95F4</li></ul><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204112144853.png" alt="image-20220411214442768"></p><h3 id="\u547D\u540D\u7A7A\u95F4namespace" tabindex="-1"><a class="header-anchor" href="#\u547D\u540D\u7A7A\u95F4namespace" aria-hidden="true">#</a> \u547D\u540D\u7A7A\u95F4namespace</h3><p>\u547D\u540D\u7A7A\u95F4\u5728TypeScript\u65E9\u671F\u65F6\uFF0C\u79F0\u4E4B\u4E3A\u5185\u90E8\u6A21\u5757\uFF0C\u4E3B\u8981\u76EE\u7684\u662F\u5C06\u4E00\u4E2A\u6A21\u5757\u5185\u90E8\u518D\u8FDB\u884C\u4F5C\u7528\u57DF\u7684\u5212\u5206\uFF0C\u9632\u6B62\u4E00\u4E9B\u547D\u540D \u51B2\u7A81\u7684\u95EE\u9898\u3002</p><p><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204112145215.png" alt="image-20220411214531141"></p>`,144);function r(l,p){return e}var u=n(a,[["render",r],["__file","L1.html.vue"]]);export{u as default};
