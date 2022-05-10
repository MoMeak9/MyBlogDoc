import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9338189c.js";const e={},a=s(`<h1 id="\u300C\u91CD\u5B66ts-2-0-\u300Dts-\u7EC3\u4E60\u98981-10" tabindex="-1"><a class="header-anchor" href="#\u300C\u91CD\u5B66ts-2-0-\u300Dts-\u7EC3\u4E60\u98981-10" aria-hidden="true">#</a> \u300C\u91CD\u5B66TS 2.0 \u300DTS \u7EC3\u4E60\u98981-10</h1><h3 id="\u7B2C\u4E00\u9898" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E00\u9898" aria-hidden="true">#</a> \u7B2C\u4E00\u9898</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>type User = {
  id: number;
  kind: string;
};

function makeCustomer&lt;T extends User&gt;(u: T): T {
  // Error\uFF08TS \u7F16\u8BD1\u5668\u7248\u672C\uFF1Av4.4.2\uFF09
  // Type &#39;{ id: number; kind: string; }&#39; is not assignable to type &#39;T&#39;.
  // &#39;{ id: number; kind: string; }&#39; is assignable to the constraint of type &#39;T&#39;, 
  // but &#39;T&#39; could be instantiated with a different subtype of constraint &#39;User&#39;.
  return {
    id: u.id,
    kind: &#39;customer&#39;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>Answer</strong></p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>type User = {
  id: number;
  kind: string;
};

function makeCustomer&lt;T extends User&gt;(u: T): T {
  // Error\uFF08TS \u7F16\u8BD1\u5668\u7248\u672C\uFF1Av4.4.2\uFF09
  // Type &#39;{ id: number; kind: string; }&#39; is not assignable to type &#39;T&#39;.
  // &#39;{ id: number; kind: string; }&#39; is assignable to the constraint of type &#39;T&#39;, 
  // but &#39;T&#39; could be instantiated with a different subtype of constraint &#39;User&#39;.
  return {
    id: u.id,
    kind: &#39;customer&#39;
  }
}
\u56DE\u7B54\uFF1AT \u7C7B\u578B\u517C\u5BB9 User\u7C7B\u578B\uFF0C
\u7B2C\u4E00\u79CD\u56DE\u7B54:
function makeCustomer&lt;T extends User&gt;(u: T): T {
	// Error\uFF08TS \u7F16\u8BD1\u5668\u7248\u672C\uFF1Av4.4.2\uFF09
	// Type &#39;{ id: number; kind: string; }&#39; is not assignable to type &#39;T&#39;.
	// &#39;{ id: number; kind: string; }&#39; is assignable to the constraint of type &#39;T&#39;,
	// but &#39;T&#39; could be instantiated with a different subtype of constraint &#39;User&#39;.
	return {
                ...u,
		id: u.id,
		kind: &#39;customer&#39;,
	};
}
\u7B2C\u4E8C\u79CD\u8FD4\u56DE\u503C\u9650\u5236\u4E3AUser \u7C7B\u578B\u7684
function makeCustomer&lt;T extends User&gt;(u: T): ReturnMake&lt;T, User&gt; {
	// Error\uFF08TS \u7F16\u8BD1\u5668\u7248\u672C\uFF1Av4.4.2\uFF09
	// Type &#39;{ id: number; kind: string; }&#39; is not assignable to type &#39;T&#39;.
	// &#39;{ id: number; kind: string; }&#39; is assignable to the constraint of type &#39;T&#39;,
	// but &#39;T&#39; could be instantiated with a different subtype of constraint &#39;User&#39;.
	return {
		id: u.id,
		kind: &#39;customer&#39;,
	};
}

type ReturnMake&lt;T extends User, U&gt; = {
	[K in keyof U as K extends keyof T ? K : never]: U[K];
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><h3 id="\u7B2C\u4E8C\u9898" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E8C\u9898" aria-hidden="true">#</a> \u7B2C\u4E8C\u9898</h3><p>\u672C\u9053\u9898\u6211\u4EEC\u5E0C\u671B\u53C2\u6570 <code>a</code> \u548C <code>b</code> \u7684\u7C7B\u578B\u90FD\u662F\u4E00\u81F4\u7684\uFF0C\u5373 <code>a</code> \u548C <code>b</code> \u540C\u65F6\u4E3A <code>number</code> \u6216 <code>string</code> \u7C7B\u578B\u3002\u5F53\u5B83\u4EEC\u7684\u7C7B\u578B\u4E0D\u4E00\u81F4\u7684\u503C\uFF0CTS \u7C7B\u578B\u68C0\u67E5\u5668\u80FD\u81EA\u52A8\u63D0\u793A\u5BF9\u5E94\u7684\u9519\u8BEF\u4FE1\u606F\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>function f(a: string | number, b: string | number) {
  if (typeof a === &#39;string&#39;) {
    return a + &#39;:&#39; + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}

f(2, 3); // Ok
f(1, &#39;a&#39;); // Error
f(&#39;a&#39;, 2); // Error
f(&#39;a&#39;, &#39;b&#39;) // Ok
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>Answer</strong></p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>function f&lt;T extends string | number&gt;(a: T, b: T) {
  if (typeof a === &#39;string&#39;) {
    return a + &#39;:&#39; + b; // no error but b can be number!
  } else {
    return (a as number) + (b as number); // error as b can be number | string
  }
}

f(2, 3); // Ok
f(1, &#39;a&#39;); // Error
f(&#39;a&#39;, 2); // Error
f(2, 2) // Ok
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="\u7B2C\u4E09\u9898" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E09\u9898" aria-hidden="true">#</a> \u7B2C\u4E09\u9898</h3><p>\u5728 <a href="https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&amp;mid=2247484142&amp;idx=1&amp;sn=946ba90d10e2625513f09e60a462b3a7&amp;chksm=ea47a3b6dd302aa05af716d0bd70d8d7c682c9f4527a9a0c03cd107635711c394ab155127f9e&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">\u638C\u63E1 TS \u8FD9\u4E9B\u5DE5\u5177\u7C7B\u578B\uFF0C\u8BA9\u4F60\u5F00\u53D1\u4E8B\u534A\u529F\u500D</a> \u8FD9\u7BC7\u6587\u7AE0\u4E2D\uFF0C\u963F\u5B9D\u54E5\u4ECB\u7ECD\u4E86 TS \u5185\u7F6E\u7684\u5DE5\u5177\u7C7B\u578B\uFF1A<code>Partial&lt;T&gt;</code>\uFF0C\u5B83\u7684\u4F5C\u7528\u662F\u5C06\u67D0\u4E2A\u7C7B\u578B\u91CC\u7684\u5C5E\u6027\u5168\u90E8\u53D8\u4E3A\u53EF\u9009\u9879 <code>?</code>\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial&lt;Todo&gt;) {
  return { ...todo, ...fieldsToUpdate };
}

// lib.es5.d.ts
type Partial&lt;T&gt; = {
  [P in keyof T]?: T[P];
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u90A3\u4E48\u5982\u4F55\u5B9A\u4E49\u4E00\u4E2A <code>SetOptional</code> \u5DE5\u5177\u7C7B\u578B\uFF0C\u652F\u6301\u628A\u7ED9\u5B9A\u7684 keys \u5BF9\u5E94\u7684\u5C5E\u6027\u53D8\u6210\u53EF\u9009\u7684\uFF1F\u5BF9\u5E94\u7684\u4F7F\u7528\u793A\u4F8B\u5982\u4E0B\u6240\u793A\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

// \u6D4B\u8BD5\u7528\u4F8B
type SomeOptional = SetOptional&lt;Foo, &#39;a&#39; | &#39;b&#39;&gt;;

// type SomeOptional = {
// 	a?: number; // \u8BE5\u5C5E\u6027\u5DF2\u53D8\u6210\u53EF\u9009\u7684
// 	b?: string; // \u4FDD\u6301\u4E0D\u53D8
// 	c: boolean; 
// }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>\u5728\u5B9E\u73B0 <code>SetOptional</code> \u5DE5\u5177\u7C7B\u578B\u4E4B\u540E\uFF0C\u5982\u679C\u4F60\u611F\u5174\u8DA3\uFF0C\u53EF\u4EE5\u7EE7\u7EED\u5B9E\u73B0 <code>SetRequired</code> \u5DE5\u5177\u7C7B\u578B\uFF0C\u5229\u7528\u5B83\u53EF\u4EE5\u628A\u6307\u5B9A\u7684 keys \u5BF9\u5E94\u7684\u5C5E\u6027\u53D8\u6210\u5FC5\u586B\u7684\u3002\u5BF9\u5E94\u7684\u4F7F\u7528\u793A\u4F8B\u5982\u4E0B\u6240\u793A\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>type Foo = {
	a?: number;
	b: string;
	c?: boolean;
}

// \u6D4B\u8BD5\u7528\u4F8B
type SomeRequired = SetRequired&lt;Foo, &#39;b&#39; | &#39;c&#39;&gt;;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // \u4FDD\u6301\u4E0D\u53D8
// 	c: boolean; // \u8BE5\u5C5E\u6027\u5DF2\u53D8\u6210\u5FC5\u586B
// }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>Answer</strong></p><p>3.1 SetOptional</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

type Simplify&lt;T&gt; = {
  [P in keyof T]: T[P]
}

type SetOptional&lt;T, K extends keyof T&gt; = 
  Simplify&lt;Partial&lt;Pick&lt;T, K&gt;&gt; &amp; Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;&gt;

// \u6D4B\u8BD5\u7528\u4F8B
type SomeOptional = SetOptional&lt;Foo, &#39;a&#39; | &#39;b&#39;&gt;;
// type SomeOptional = {
// 	a?: number; // \u8BE5\u5C5E\u6027\u5DF2\u53D8\u6210\u53EF\u9009\u7684
// 	b?: string; // \u4FDD\u6301\u4E0D\u53D8
// 	c: boolean;
// }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>\u5728\u4EE5\u4E0A\u4EE3\u7801\u4E2D\uFF0C\u6211\u4EEC\u5B9A\u4E49\u4E86\u4E00\u4E2A <code>Simplify</code> \u5DE5\u5177\u7C7B\u578B\uFF0C\u7528\u6765\u5BF9\u4EA4\u53C9\u7C7B\u578B\u8FDB\u884C\u6241\u5E73\u5316\u5904\u7406\u3002\u5177\u4F53\u7684\u4F5C\u7528\uFF0C\u4F60\u4EEC\u53EF\u4EE5\u5B9E\u9645\u4F53\u9A8C\u4E00\u4E0B\u3002</p><p>3.2 SetRequired</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>type Foo = {
	a?: number;
	b: string;
	c?: boolean;
}

type Simplify&lt;T&gt; = {
  [P in keyof T]: T[P]
}

type SetRequired&lt;T, K extends keyof T&gt; = Simplify&lt;Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt; &amp; Required&lt;Pick&lt;T, K&gt;&gt;&gt;

// \u6D4B\u8BD5\u7528\u4F8B
type SomeRequired = SetRequired&lt;Foo, &#39;b&#39; | &#39;c&#39;&gt;;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // \u4FDD\u6301\u4E0D\u53D8
// 	c: boolean; // \u8BE5\u5C5E\u6027\u5DF2\u53D8\u6210\u5FC5\u586B
// }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="\u7B2C\u56DB\u9898" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u56DB\u9898" aria-hidden="true">#</a> \u7B2C\u56DB\u9898</h3><p><code>Pick&lt;T, K extends keyof T&gt;</code> \u7684\u4F5C\u7528\u662F\u5C06\u67D0\u4E2A\u7C7B\u578B\u4E2D\u7684\u5B50\u5C5E\u6027\u6311\u51FA\u6765\uFF0C\u53D8\u6210\u5305\u542B\u8FD9\u4E2A\u7C7B\u578B\u90E8\u5206\u5C5E\u6027\u7684\u5B50\u7C7B\u578B\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick&lt;Todo, &quot;title&quot; | &quot;completed&quot;&gt;;

const todo: TodoPreview = {
  title: &quot;Clean room&quot;,
  completed: false
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u90A3\u4E48\u5982\u4F55\u5B9A\u4E49\u4E00\u4E2A <code>ConditionalPick</code> \u5DE5\u5177\u7C7B\u578B\uFF0C\u652F\u6301\u6839\u636E\u6307\u5B9A\u7684 <code>Condition</code> \u6761\u4EF6\u6765\u751F\u6210\u65B0\u7684\u7C7B\u578B\uFF0C\u5BF9\u5E94\u7684\u4F7F\u7528\u793A\u4F8B\u5982\u4E0B\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>interface Example {
	a: string;
	b: string | number;
	c: () =&gt; void;
	d: {};
}

// \u6D4B\u8BD5\u7528\u4F8B\uFF1A
type StringKeysOnly = ConditionalPick&lt;Example, string&gt;;
//=&gt; {a: string}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>Answer</strong></p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>interface Example {
  a: string;
  e: number;
  b: string | number;
  c: () =&gt; void;
  d: {};
  f: string | number | boolean;
}
type ConditionalPick&lt;V, T&gt; = {
  [K in keyof V as V[K] extends T ? K : never]: V[K];
};
type StringKeysOnly = ConditionalPick&lt;Example, string | number&gt;;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div>`,30);function r(l,p){return a}var t=n(e,[["render",r],["__file","10.html.vue"]]);export{t as default};
