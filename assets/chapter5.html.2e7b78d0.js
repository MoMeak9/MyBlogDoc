import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.28325d67.js";const a={},e=s(`<h1 id="c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt05-\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt05-\u6307\u9488" aria-hidden="true">#</a> C\u8BED\u8A00\u8BAD\u7EC3\u8425Chaptrt05 \u6307\u9488</h1><blockquote><p>\u672C\u8282\u987B\u53C2\u8003C\u8BED\u8A00\u57FA\u7840\u63CF\u8FF0\u9875</p></blockquote><h3 id="_5-1-\u6307\u9488\u7684\u672C\u8D28" tabindex="-1"><a class="header-anchor" href="#_5-1-\u6307\u9488\u7684\u672C\u8D28" aria-hidden="true">#</a> 5.1 \u6307\u9488\u7684\u672C\u8D28</h3><p>&amp;\u53D6\u5730\u5740/\u53D6\u5F15\u7528</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;

//&amp;\u7B26\u53F7\u662F\u53D6\u5730\u5740\uFF0C\u6307\u9488\u53D8\u91CF\u7684\u521D\u59CB\u5316\u4E00\u5B9A\u662F\u67D0\u4E2A\u53D8\u91CF\u53D6\u5730\u5740
int main()
{
	int i = 5;
	int* p=&amp;i;
	printf(&quot;i=%d\\n&quot;, i);//\u76F4\u63A5\u8BBF\u95EE
	printf(&quot;*p=%d\\n&quot;, *p);//\u95F4\u63A5\u8BBF\u95EE
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="_5-2-\u6307\u9488\u7684\u4F20\u9012" tabindex="-1"><a class="header-anchor" href="#_5-2-\u6307\u9488\u7684\u4F20\u9012" aria-hidden="true">#</a> 5.2 \u6307\u9488\u7684\u4F20\u9012</h3><p>*\u5355\u72EC\u5B58\u5728\u4F5C\u4E3A\u8FD0\u7B97\u7B26\uFF0C\u4E0E\u57FA\u672C\u91CF\u4E00\u8D77\u5B58\u5728\u662F\u6307\u9488\u6807\u8BC6\uFF08\u6307\u9488\u52A0\u4E86*\u53D6\u5F97\u4E0E\u4E00\u822C\u91CF\u76F8\u540C\u7684\u8868\u793A\u503C\u7684\u65B9\u5F0F\uFF09</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;

void change(int *j)//j\u79F0\u4E3A\u5F62\u53C2\uFF0Cj=&amp;i
{
	*j = 5;//\u6307\u9488\u7684\u95F4\u63A5\u8BBF\u95EE
}

int main()
{
	int i = 10;//i\u662F\u5C40\u90E8\u53D8\u91CF
	printf(&quot;before change i=%d\\n&quot;, i);
	change(&amp;i);//\u51FD\u6570\u8C03\u7528\u65F6\uFF0C\u628A&amp;i\u79F0\u4E3A\u5B9E\u53C2
	printf(&quot;after change i=%d\\n&quot;, i);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="_5-3-\u6307\u9488\u7684\u504F\u79FB" tabindex="-1"><a class="header-anchor" href="#_5-3-\u6307\u9488\u7684\u504F\u79FB" aria-hidden="true">#</a> 5.3 \u6307\u9488\u7684\u504F\u79FB</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;

int main()
{
	int a[5] = { 1,2,3,4,5 };

	int* p;//\u5BF9\u4E00\u4E2A\u6307\u9488\u53D8\u91CF\u8FDB\u884C\u53D6\u503C\uFF0C\u5F97\u5230\u7684\u7C7B\u578B\u662F\u5176\u57FA\u7C7B\u578B
	p = a;
	printf(&quot;*p=%d\\n&quot;, *p);
	for (int i = 0; i &lt; 5; i++)
	{
		printf(&quot;%d\\n&quot;, *(p + i));
	}
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="_5-4-\u81EA\u589E\u81EA\u51CF\u8FD0\u7B97\u7B26" tabindex="-1"><a class="header-anchor" href="#_5-4-\u81EA\u589E\u81EA\u51CF\u8FD0\u7B97\u7B26" aria-hidden="true">#</a> 5.4 \u81EA\u589E\u81EA\u51CF\u8FD0\u7B97\u7B26</h3><p>\u8001\u4E1C\u897F\u4E86\uFF0C\u6CE8\u610F\u7B26\u53F7\u5728\u524D\u548C\u540E\u7684\u533A\u522B</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;

//\u91CD\u8981\u7A0B\u5EA6\u4F4E\u4E00\u4E9B,\u4E0D\u7406\u89E3\u76F4\u63A5\u653E\u5F03\uFF0C\u4E0D\u91CD\u8981
int main()
{
	int a[3] = { 2,7,8 };
	int* p;
	int j;
	p = a;//\u8BA9\u6307\u9488\u53D8\u91CFp\uFF0C\u6307\u5411\u6570\u7EC4\u7684\u5F00\u5934
	j = *p++;//j=*p;(*p)++,\u7B2C\u4E00\u6B65\uFF1A\u4EFB\u4F55\u65F6\u5019\u90FD\u662F\u628A\u540E\u52A0\u52A0\u53BB\u6389\uFF0C\u7B2C\u4E8C\u6B65\u53E6\u5916\u4E00\u4E2A\u8FD0\u7B97\u7B26\u770B\u4F18\u5148\u7EA7\u662F\u5426\u9AD8\u4E8E++
	printf(&quot;a[0]=%d,j=%d,*p=%d\\n&quot;, a[0], j, *p);//2 2 7
	j = p[0]++;//j=p[0];p[0]++;
	printf(&quot;a[0]=%d,j=%d,*p=%d\\n&quot;, a[0], j, *p);//2,7,8
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="_5-5-\u6307\u9488\u52A8\u6001\u7F13\u5B58\u548C\u5185\u5B58\u7533\u8BF7" tabindex="-1"><a class="header-anchor" href="#_5-5-\u6307\u9488\u52A8\u6001\u7F13\u5B58\u548C\u5185\u5B58\u7533\u8BF7" aria-hidden="true">#</a> 5.5 \u6307\u9488\u52A8\u6001\u7F13\u5B58\u548C\u5185\u5B58\u7533\u8BF7</h3><p><code>malloc</code>\u5206\u914D\u5185\u5B58\u3001\u5B58\u50A8\u5668\u5206\u914D</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;

//malloc\u53EF\u4EE5\u5E2E\u6211\u4EEC\u5B9E\u73B0\u52A8\u6001\u6570\u7EC4
int main()
{
	int i;//\u7533\u8BF7\u591A\u5927\u7684\u7A7A\u95F4
	scanf(&quot;%d&quot;, &amp;i);
	char* p;
	p = (char*)malloc(i);//malloc\u7533\u8BF7\u7A7A\u95F4\u7684\u5355\u4F4D\u662F\u5B57\u8282
	strcpy(p, &quot;malloc success&quot;);
	puts(p);
	free(p);//\u91CA\u653E\u7A7A\u95F4,p\u7684\u503C\u5FC5\u987B\u548C\u6700\u521Dmalloc\u8FD4\u56DE\u7684\u503C\u4E00\u81F4
	p = NULL;//\u5982\u679C\u4E0D\u628Ap\u503C\u4E3ANULL\uFF0C\u628Ap\u79F0\u4E3A\u91CE\u6307\u9488\uFF0CNULL\u5C31\u662F0
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="_5-6-\u6307\u9488\u4E0E\u4E00\u4F4D\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#_5-6-\u6307\u9488\u4E0E\u4E00\u4F4D\u6570\u7EC4" aria-hidden="true">#</a> 5.6 \u6307\u9488\u4E0E\u4E00\u4F4D\u6570\u7EC4</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;

//\u6570\u7EC4\u540D\u4F5C\u4E3A\u5B9E\u53C2\u4F20\u9012\u7ED9\u5B50\u51FD\u6570\u65F6\uFF0C\u662F\u5F31\u5316\u4E3A\u6307\u9488\u7684
//\u7EC3\u4E60\u4F20\u9012\u4E0E\u504F\u79FB
void change(char *d)
{
	*d = &#39;H&#39;;
	d[1] = &#39;E&#39;;
	*(d + 2) = &#39;L&#39;;
}
int main()
{
	char c[10] = &quot;hello&quot;;
	change(c);
	puts(c);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="_5-7-\u5806\u7A7A\u95F4\u4E0E\u6808\u7A7A\u95F4\u7684\u5DEE\u5F02" tabindex="-1"><a class="header-anchor" href="#_5-7-\u5806\u7A7A\u95F4\u4E0E\u6808\u7A7A\u95F4\u7684\u5DEE\u5F02" aria-hidden="true">#</a> 5.7 \u5806\u7A7A\u95F4\u4E0E\u6808\u7A7A\u95F4\u7684\u5DEE\u5F02</h3><ol><li>\u6808\u7A7A\u95F4\u4F1A\u968F\u7740\u51FD\u6570\u7684\u6267\u884C\u7ED3\u675F\u800C\u91CA\u653E</li><li>\u5806\u7A7A\u95F4\u4E0D\u4F1A\u968F\u5B50\u51FD\u6570\u7684\u7ED3\u675F\u800C\u91CA\u653E\uFF0C\u5FC5\u987B\u81EA\u5DF1free</li></ol><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
char* print_stack()
{
	char c[17] = &quot;I am print_stack&quot;;
	puts(c);//\u80FD\u6B63\u5E38\u6253\u5370
	return c;
}

char* print_malloc()
{
	char* p = (char*)malloc(30);
	strcpy(p, &quot;I am print_malloc&quot;);
	puts(p);
	return p;
}

int main()
{
	char* p;
	p = print_stack();//\u6808\u7A7A\u95F4\u4F1A\u968F\u7740\u51FD\u6570\u7684\u6267\u884C\u7ED3\u675F\u800C\u91CA\u653E,\u76F8\u5F53\u4E8Ep=c
	//puts(p);//\u6253\u5370\u4E0D\u51FA\u6765
	p = print_malloc();//\u5806\u7A7A\u95F4\u4E0D\u4F1A\u968F\u5B50\u51FD\u6570\u7684\u7ED3\u675F\u800C\u91CA\u653E\uFF0C\u5FC5\u987B\u81EA\u5DF1free
	puts(p);
	free(p);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="_5-8-\u5B57\u7B26\u6307\u9488\u548C\u5B57\u7B26\u6570\u7EC4\u7684\u521D\u59CB\u5316" tabindex="-1"><a class="header-anchor" href="#_5-8-\u5B57\u7B26\u6307\u9488\u548C\u5B57\u7B26\u6570\u7EC4\u7684\u521D\u59CB\u5316" aria-hidden="true">#</a> 5.8 \u5B57\u7B26\u6307\u9488\u548C\u5B57\u7B26\u6570\u7EC4\u7684\u521D\u59CB\u5316</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

int main()
{
	char* p = &quot;hello&quot;;  //\u628A\u5B57\u7B26\u4E32\u578B\u5E38\u91CF&quot;hello&quot;\u7684\u9996\u5730\u5740\u8D4B\u7ED9p
	char c[10] = &quot;hello&quot;;  //\u7B49\u4EF7\u4E8Estrcpy(c,&quot;hello&quot;);
	c[0] = &#39;H&#39;;
	//p[0]=&#39;H&#39;;  //\u4E0D\u53EF\u4EE5\u5BF9\u5E38\u91CF\u533A\u6570\u636E\u8FDB\u884C\u4FEE\u6539
	printf(&quot;c[0]=%c\\n&quot;, c[0]);
	printf(&quot;p[0]=%c\\n&quot;, p[0]);
	p = &quot;world&quot;;  //\u5C06\u5B57\u7B26\u4E32world\u7684\u5730\u5740\u8D4B\u7ED9p
	//c=&quot;world&quot;;  //\u975E\u6CD5
	puts(p);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="_5-9-\u4E8C\u7EA7\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#_5-9-\u4E8C\u7EA7\u6307\u9488" aria-hidden="true">#</a> 5.9 \u4E8C\u7EA7\u6307\u9488</h3><p>\u4E0D\u8981\u6C42</p>`,25);function r(p,l){return e}var b=n(a,[["render",r],["__file","chapter5.html.vue"]]);export{b as default};
