import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9338189c.js";const a={},e=s(`<h1 id="c-c-\u57FA\u7840\u7EAA\u8981" tabindex="-1"><a class="header-anchor" href="#c-c-\u57FA\u7840\u7EAA\u8981" aria-hidden="true">#</a> C/C++\u57FA\u7840\u7EAA\u8981</h1><h3 id="\u5173\u4E8E\u53D6\u503C\u4E0E\u53D6\u5730\u5740\u8FD0\u7B97\u7B26-\u548C" tabindex="-1"><a class="header-anchor" href="#\u5173\u4E8E\u53D6\u503C\u4E0E\u53D6\u5730\u5740\u8FD0\u7B97\u7B26-\u548C" aria-hidden="true">#</a> \u5173\u4E8E\u53D6\u503C\u4E0E\u53D6\u5730\u5740\u8FD0\u7B97\u7B26\uFF08&amp;\u548C*\uFF09</h3><p>C++ \u63D0\u4F9B\u4E86\u4E24\u79CD\u6307\u9488\u8FD0\u7B97\u7B26\uFF0C\u4E00\u79CD\u662F\u53D6\u5730\u5740\u8FD0\u7B97\u7B26 &amp;\uFF0C\u4E00\u79CD\u662F\u95F4\u63A5\u5BFB\u5740\u8FD0\u7B97\u7B26 *\u3002</p><p>\u6307\u9488\u662F\u4E00\u4E2A\u5305\u542B\u4E86\u53E6\u4E00\u4E2A\u53D8\u91CF\u5730\u5740\u7684\u53D8\u91CF\uFF0C\u60A8\u53EF\u4EE5\u628A\u4E00\u4E2A\u5305\u542B\u4E86\u53E6\u4E00\u4E2A\u53D8\u91CF\u5730\u5740\u7684\u53D8\u91CF\u8BF4\u6210\u662F&quot;\u6307\u5411&quot;\u53E6\u4E00\u4E2A\u53D8\u91CF\u3002\u53D8\u91CF\u53EF\u4EE5\u662F\u4EFB\u610F\u7684\u6570\u636E\u7C7B\u578B\uFF0C\u5305\u62EC\u5BF9\u8C61\u3001\u7ED3\u6784\u6216\u8005\u6307\u9488\u3002</p><p>\u53D6\u5730\u5740\u8FD0\u7B97\u7B26 &amp; &amp; \u662F\u4E00\u5143\u8FD0\u7B97\u7B26\uFF0C\u8FD4\u56DE\u64CD\u4F5C\u6570\u7684\u5185\u5B58\u5730\u5740\u3002\u4F8B\u5982\uFF0C\u5982\u679C var \u662F\u4E00\u4E2A\u6574\u578B\u53D8\u91CF\uFF0C\u5219 &amp;var \u662F\u5B83\u7684\u5730\u5740\u3002\u8BE5\u8FD0\u7B97\u7B26\u4E0E\u5176\u4ED6\u4E00\u5143\u8FD0\u7B97\u7B26\u5177\u6709\u76F8\u540C\u7684\u4F18\u5148\u7EA7\uFF0C\u5728\u8FD0\u7B97\u65F6\u5B83\u662F\u4ECE\u53F3\u5411\u5DE6\u987A\u5E8F\u8FDB\u884C\u7684\u3002</p><p>\u60A8\u53EF\u4EE5\u628A &amp; \u8FD0\u7B97\u7B26\u8BFB\u4F5C&quot;\u53D6\u5730\u5740\u8FD0\u7B97\u7B26&quot;\uFF0C\u8FD9\u610F\u5473\u7740\uFF0C&amp;var \u8BFB\u4F5C&quot;var \u7684\u5730\u5740&quot;\u3002</p><p>\u95F4\u63A5\u5BFB\u5740\u8FD0\u7B97\u7B26 * \u7B2C\u4E8C\u4E2A\u8FD0\u7B97\u7B26\u662F\u95F4\u63A5\u5BFB\u5740\u8FD0\u7B97\u7B26 <em>\uFF0C\u5B83\u662F &amp; \u8FD0\u7B97\u7B26\u7684\u8865\u5145\u3002</em> \u662F\u4E00\u5143\u8FD0\u7B97\u7B26\uFF0C\u8FD4\u56DE\u64CD\u4F5C\u6570\u6240\u6307\u5B9A\u5730\u5740\u7684\u53D8\u91CF\u7684\u503C\u3002</p><p>\u8BF7\u770B\u4E0B\u9762\u7684\u5B9E\u4F8B\uFF0C\u7406\u89E3\u8FD9\u4E24\u79CD\u8FD0\u7B97\u7B26\u7684\u7528\u6CD5\u3002</p><h3 id="_3-1-if-\u4E0E-if-else" tabindex="-1"><a class="header-anchor" href="#_3-1-if-\u4E0E-if-else" aria-hidden="true">#</a> 3.1 if \u4E0E if-else</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;

int main()
{
	int i;
    // \u6587\u4EF6\u7ED3\u675F\u7B26\uFF08end of file\uFF09
	while (scanf(&quot;%d&quot;, &amp;i) != EOF)
	{
		if (i &gt; 0)//\u5728if\u7684\u62EC\u53F7\u540E\u9762\u4E0D\u53EF\u4EE5\u52A0;\uFF0C\u4F1A\u9020\u6210\u8868\u8FBE\u5F0F\u65E0\u8BBA\u662F\u771F\u8FD8\u662F\u5047\uFF0C\u90FD\u4F1A\u6267\u884C\u540E\u9762\u7684\u8BED\u53E5
		{ 
			printf(&quot;i is bigger than 0\\n&quot;);
		}
		else {//\u4E0A\u9762\u7684\u6761\u4EF6\u4E3A\u5047\u65F6\uFF0C\u8D70else
			printf(&quot;i is not bigger than 0\\n&quot;);
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="_3-2-while" tabindex="-1"><a class="header-anchor" href="#_3-2-while" aria-hidden="true">#</a> 3.2 while</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;

//\u4ECE1\u52A0\u5230100
int main()
{
	int i = 1;
	int total = 0;//\u5B58\u50A8\u6700\u7EC8\u7684\u548C
	while (i &lt;= 100)//while\u540E\u9762\u4E0D\u80FD\u591F\u52A0\u5206\u53F7\uFF0C\u5426\u5219\u4F1A\u6B7B\u5FAA\u73AF
	{
		total = total + i;
		i++;
	}
	printf(&quot;total=%d\\n&quot;, total);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="_3-3-for-\u5FAA\u73AF" tabindex="-1"><a class="header-anchor" href="#_3-3-for-\u5FAA\u73AF" aria-hidden="true">#</a> 3.3 for \u5FAA\u73AF</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;

//\u4ECE1\u52A0\u5230100
int main()
{
	int i, total;
	//for\u8BED\u53E5\u4E2D\u53EA\u80FD\u6709\u4E24\u4E2A\u5206\u53F7
	for (i = 1, total = 0; i &lt;= 100; i++)//for\u5FAA\u73AF\u540E\u4E0D\u80FD\u52A0\u5206\u53F7
	{
		total = total + i;
	}
	printf(&quot;total=%d\\n&quot;, total);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="_3-4-continue" tabindex="-1"><a class="header-anchor" href="#_3-4-continue" aria-hidden="true">#</a> 3.4 continue</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;

//\u4ECE1\u52A0\u5230100
int main()
{
	int i, total;
	//for\u8BED\u53E5\u4E2D\u53EA\u80FD\u6709\u4E24\u4E2A\u5206\u53F7
	for (i = 1, total = 0; i &lt;= 100; i++)//for\u5FAA\u73AF\u540E\u4E0D\u80FD\u52A0\u5206\u53F7
	{
		total = total + i;
	}
	printf(&quot;total=%d\\n&quot;, total);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="_3-5-break" tabindex="-1"><a class="header-anchor" href="#_3-5-break" aria-hidden="true">#</a> 3.5 Break</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;

//\u4ECE1\u52A0\u5230100,\u5F53\u548C\u5927\u4E8E2000,\u5C31\u7EC8\u6B62\u5FAA\u73AF
int main()
{
	int i, total;
	//for\u8BED\u53E5\u4E2D\u53EA\u80FD\u6709\u4E24\u4E2A\u5206\u53F7
	for (i = 1, total = 0; i &lt;= 100; i++)//for\u5FAA\u73AF\u540E\u4E0D\u80FD\u52A0\u5206\u53F7
	{
		if (total &gt; 2000)
		{
			break;//\u5F53\u6C42\u548C\u5927\u4E8E2000\uFF0C\u5C31\u7EC8\u6B62\u5FAA\u73AF
		}
		total = total + i;
	}
	printf(&quot;total=%d,i=%d\\n&quot;, total,i);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="_3-6-day6\u4F5C\u4E1A" tabindex="-1"><a class="header-anchor" href="#_3-6-day6\u4F5C\u4E1A" aria-hidden="true">#</a> 3.6 day6\u4F5C\u4E1A</h3><p>\u56DE\u6587\u6570\u5224\u5B9A</p><p>12321</p><p>12321</p><p>1234</p><p>4321</p><p>\u628A\u6700\u521D\u8F93\u5165\u7684\u6574\u578B\u6570a\uFF0C\u53CD\u8FC7\u6765\u540E\uFF0C\u518D\u5B58\u5230\u53E6\u5916\u4E00\u4E2A\u6574\u578B\u6570b\uFF0C\u5224\u65ADa\u548Cb\u662F\u5426\u76F8\u7B49\uFF0C\u5982\u679C\u76F8\u7B49\u5C31\u8F93\u51FAyes\uFF0C\u4E0D\u76F8\u7B49no</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;


int main()
{
	int a,b,c,tmp;
	while (scanf(&quot;%d&quot;, &amp;a) != EOF)
	{
		b = 0;
		c = a;
		while (a)
		{
			tmp = a % 10;
			b = b*10+tmp;
			a = a / 10;
		}
		if (c == b)
		{
			printf(&quot;yes\\n&quot;);
		}
		else {
			printf(&quot;no\\n&quot;);
		}
	}
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="_6-1-\u51FD\u6570\u5D4C\u5957\u8C03\u7528" tabindex="-1"><a class="header-anchor" href="#_6-1-\u51FD\u6570\u5D4C\u5957\u8C03\u7528" aria-hidden="true">#</a> 6.1 \u51FD\u6570\u5D4C\u5957\u8C03\u7528</h3><p>\u4E00\u4E2A\u5DE5\u7A0B\u5F53\u4E2D\u591A\u4E2A\u6587\u4EF6\u4E2D\u51FD\u6570\u7684\u4F7F\u7528</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &quot;func.h&quot;

int main()
{
	int a = 10;
	a = printstar(a);//printstar(a)\u51FD\u6570\u8C03\u7528\uFF0Ca\u662F\u4E00\u4E2A\u5B9E\u53C2
	print_message();//\u8C03\u7528print_message
	printstar(a);
	return 0;

}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>func.h \u5934\u6587\u4EF6</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt; //\u5934\u6587\u4EF6\u4E2D\u653E\u7684\u662F\u51FD\u6570\u58F0\u660E

int printstar(int i);//\u51FD\u6570\u58F0\u660E
void print_message();//\u51FD\u6570\u58F0\u660E
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>func.c</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &quot;func.h&quot;

//printstar\u51FD\u6570\u5B9A\u4E49\uFF0C\u5C31\u662F\u51FD\u6570\u5B9E\u73B0
int printstar(int i)  //i\u5373\u4E3A\u5F62\u5F0F\u53C2\u6570\uFF0C\u4E5F\u53EB\u5F62\u53C2
{
	printf(&quot;**********************\\n&quot;);
	printf(&quot;printstar %d\\n&quot;, i);
	return i + 3;
}
//print_message\u51FD\u6570\u5B9A\u4E49
void print_message()  //\u53EF\u4EE5\u8C03\u7528printstar
{
	printf(&quot;how do you do\\n&quot;);
	printstar(3);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="_6-2-\u5168\u5C40\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#_6-2-\u5168\u5C40\u53D8\u91CF" aria-hidden="true">#</a> 6.2 \u5168\u5C40\u53D8\u91CF</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;

int i = 10;  //\u5168\u5C40\u53D8\u91CF,\u5728\u51FD\u6570\u5916\u5B9A\u4E49\u7684\u53D8\u91CF\u53EB\u5168\u5C40\u53D8\u91CF
void print(int a)//\u81EA\u5B9A\u4E49\u7684print\u51FD\u6570
{
	printf(&quot;print i=%d\\n&quot;, i);
}
int main()
{
	printf(&quot;main i=%d\\n&quot;, i);
	int i = 5;//\u5F53\u8FD9\u91CC\u52A0\u4E86int\u540E\uFF0C\u5C31\u662F\u5728main\u5B9A\u4E49\u4E86\u4E00\u4E2A\u540D\u4E3Ai\u7684\u5C40\u90E8\u53D8\u91CF
	printf(&quot;main i=%d\\n&quot;, i);
	print(i);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="_6-3-\u9012\u5F52" tabindex="-1"><a class="header-anchor" href="#_6-3-\u9012\u5F52" aria-hidden="true">#</a> 6.3 \u9012\u5F52</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
//\u51FD\u6570\u81EA\u5DF1\u8C03\u7528\u81EA\u5DF1\u5C31\u662F\u9012\u5F52,\u521D\u8BD5\u8003\u7684\u6982\u7387\u6781\u4F4E\u7684\uFF0C\u673A\u8BD5\u6709\u7528\u5230
int f(int n)
{
	if (1 == n)
	{
		return 1;//\u4E00\u5B9A\u5199\u7ED3\u675F\u6761\u4EF6
	}
	return n * f(n - 1);//\u7B2C\u4E00\u6B65\u662F\u5199\u597D\u516C\u5F0F
}

int main()
{
	int n = 5;
	int result = f(n);
	printf(&quot;result=%d\\n&quot;, result);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="c\u8BED\u8A00\u9AD8\u7EA7\u90E8\u5206" tabindex="-1"><a class="header-anchor" href="#c\u8BED\u8A00\u9AD8\u7EA7\u90E8\u5206" aria-hidden="true">#</a> C\u8BED\u8A00\u9AD8\u7EA7\u90E8\u5206</h2><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;

//long long 32\u4F4D\u7684\u7A0B\u5E8F\u662F8\u4E2A\u5B57\u8282\uFF0C64\u4F4D\u7684\u662F8\u4E2A\u5B57\u8282
int main()
{
	int i=10;
	short a=32767;
	short b=0;
	long c;//32\u4F4D\u7684\u7A0B\u5E8F\u662F4\u4E2A\u5B57\u8282\uFF0C64\u4F4D\u7684\u662F8\u4E2A\u5B57\u8282
	b = a + 1;//\u53D1\u751F\u4E86\u6EA2\u51FA,\u89E3\u51B3\u6EA2\u51FA\u7684\u529E\u6CD5\u662F\u7528\u66F4\u5927\u7684\u7A7A\u95F4\u6765\u5B58
	//printf(&quot;%d\\n&quot;, b);
	//\u4E0B\u9762\u662F\u65E0\u7B26\u53F7\u6570
	unsigned int m = 3;
	unsigned short n = 0x8056;
	unsigned long k = 5;
	b = 0x8056;
	printf(&quot;%d\\n&quot;, b);
	//printf(&quot;i=%d\\n&quot;, i);
	printf(&quot;n=%u\\n&quot;, n);//\u65E0\u7B26\u53F7\u7C7B\u578B\u8981\u7528%u
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div>`,39);function r(p,l){return e}var b=n(a,[["render",r],["__file","index.html.vue"]]);export{b as default};
