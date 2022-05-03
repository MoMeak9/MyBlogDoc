import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.3dedad24.js";const a={},e=s(`<h1 id="c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt04-\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt04-\u6570\u7EC4" aria-hidden="true">#</a> C\u8BED\u8A00\u8BAD\u7EC3\u8425Chaptrt04 \u6570\u7EC4</h1><h3 id="_4-1-\u4E00\u7EF4\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#_4-1-\u4E00\u7EF4\u6570\u7EC4" aria-hidden="true">#</a> 4.1 \u4E00\u7EF4\u6570\u7EC4</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt; // \u6807\u51C6\u8F93\u5165\u8F93\u51FA\uFF08standard input/output\uFF09

//\u6253\u5370\u6570\u7EC4\u91CC\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20,\u6570\u7EC4\u5728\u4F20\u9012\u65F6\uFF0C\u5143\u7D20\u4E2A\u6570\u4F20\u9012\u4E0D\u8FC7\u53BB
//print\u662F\u6211\u4EEC\u81EA\u5B9A\u4E49\u7684\u4E00\u4E2A\u51FD\u6570
void print(int b[],int len)
{
	int i;
	for (i = 0; i &lt; len; i++)
	{
		printf(&quot;a[%d]=%d\\n&quot;, i, b[i]);
	}
	b[4] = 20;//\u5728\u5B50\u51FD\u6570\u4E2D\u4FEE\u6539\u6570\u7EC4\u5143\u7D20
}
int main()
{
	//\u5B9A\u4E49\u6570\u7EC4\u5C31\u662F\u5199\u4E00\u4E2A\u53D8\u91CF\u540D\uFF0C\u540E\u9762\u52A0\u4E0A\u65B9\u62EC\u53F7\uFF0C\u65B9\u62EC\u53F7\u5185\u5199\u4E0A\u6574\u578B\u5E38\u91CF
	//\u5B9A\u4E49\u6570\u7EC4\u7684\u4E00\u77AC\u95F4\uFF0C\u6570\u7EC4\u5360\u636E\u7684\u7A7A\u95F4\u5927\u5C0F\u5C31\u786E\u5B9A\u4E0B\u6765\u4E86
	int j = 10;
	int a[5] = {1,2,3,4,5};
	int i = 3;
	//a[5] = 20;//\u8BBF\u95EE\u8D8A\u754C\uFF0C\u8BBF\u95EE\u4E86\u4E0D\u5C5E\u4E8E\u4F60\u81EA\u5DF1\u7684\u7A7A\u95F4
	//a[6] = 21;
	//a[7] = 22;
	//printf(&quot;j=%d\\n&quot;, j);
	print(a,5);//\u8C03\u7528\u51FD\u6570
	printf(&quot;a[4]=%d\\n&quot;, a[4]);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="_4-2-\u5B57\u7B26\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#_4-2-\u5B57\u7B26\u6570\u7EC4" aria-hidden="true">#</a> 4.2 \u5B57\u7B26\u6570\u7EC4</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;

//\u521D\u59CB\u5316\u5B57\u7B26\u6570\u7EC4\u65F6\uFF0C\u4E00\u5B9A\u8981\u8BA9\u5B57\u7B26\u6570\u7EC4\u7684\u5927\u5C0F\u6BD4\u770B\u5230\u7684\u5B57\u7B26\u4E32\u7684\u957F\u5EA6\u591A1
int main()
{
	char c[6] = { &#39;h&#39;,&#39;e&#39;,&#39;l&#39;,&#39;l&#39;,&#39;o&#39; };
	char d[5] = &quot;how&quot;;
	printf(&quot;%s----%s\\n&quot;, c, d);//printf\u7684%s\uFF0C\u5BF9\u5E94\u540E\u9762\u8981\u5199\u7684\u662F\u5B57\u7B26\u6570\u7EC4\u540D\uFF0C\u5B57\u7B26\u4E32\u5E38\u91CF
	char e[20],f[20];
	scanf(&quot;%s%s&quot;, e,f);
	printf(&quot;%s---%s\\n&quot;, e,f);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_4-3-day8-\u4F5C\u4E1A" tabindex="-1"><a class="header-anchor" href="#_4-3-day8-\u4F5C\u4E1A" aria-hidden="true">#</a> 4.3 day8 \u4F5C\u4E1A</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;


int main()
{
	int n;
	int a[20];
	scanf(&quot;%d&quot;, &amp;n);
	int i;
	for (i = 0; i &lt; n; i++)
	{
		scanf(&quot;%d&quot;, &amp;a[i]);
	}
	int m = 0;
	for (i = 0; i &lt; n; i++)
	{
		if (a[i] == 2)
		{
			m++;
		}
	}
	printf(&quot;%d\\n&quot;, m);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="_4-4-\u5B57\u7B26\u6570\u7EC4\u4F20\u9012" tabindex="-1"><a class="header-anchor" href="#_4-4-\u5B57\u7B26\u6570\u7EC4\u4F20\u9012" aria-hidden="true">#</a> 4.4 \u5B57\u7B26\u6570\u7EC4\u4F20\u9012</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;
//\u6211\u4EEC\u628Ad\u79F0\u4E3A\u5F62\u53C2
void print(char d[])
{
	int i = 0;
	while (d[i])
	{
		printf(&quot;%c&quot;, d[i]);//\u5B57\u7B26\u6570\u7EC4\u53BB\u8F93\u51FA\u67D0\u4E00\u4E2A\u5143\u7D20\u65F6\uFF0C\u7528%c
		i++;
	}
	printf(&quot;\\n&quot;);
	//\u4FEE\u6539\u5B57\u7B26\u6570\u7EC4\u4E2D\u7684\u5B57\u7B26\u4E32\u7684\u5185\u5BB9\uFF0C\u628A\u9996\u5B57\u6BCD\u53D8\u5927\u5199
	d[0] = d[0] - 32;
}

int main()
{
	char c[10] = &quot;hello&quot;;//c\u91CC\u8FB9\u662F10\uFF0C\u6216\u800520\u90FD\u53EF\u4EE5\uFF0C\u53EA\u8981\u5927\u4E8E\u7B49\u4E8E6\u5373\u53EF
	print(c);//\u6211\u4EEC\u628Ac\u79F0\u4E3A\u5B9E\u53C2\uFF0C\u8C03\u7528print\u51FD\u6570\u65F6\uFF0C\u662Fd=c
	printf(&quot;%s\\n&quot;, c);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="_4-5-gets-and-puts" tabindex="-1"><a class="header-anchor" href="#_4-5-gets-and-puts" aria-hidden="true">#</a> 4.5 gets and puts</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;

int main()
{
	char c[20];//\u5B57\u7B26\u6570\u7EC4\u7684\u6570\u7EC4\u540D\u91CC\u5B58\u7684\u5C31\u662F\u5B57\u7B26\u6570\u7EC4\u7684\u8D77\u59CB\u5730\u5740\uFF0C\u7C7B\u578B\u662F\u5B57\u7B26\u6307\u9488
	//\u4E0D\u80FD\u4F7F\u7528gets\u7684VS\uFF0CVS2017 \u8BF7\u4F7F\u7528\u4E0B\u9762\u64CD\u4F5C
	//fgets(c, sizeof(c), stdin);//gets(c)\u662F\u4E00\u6837\u7684
	gets(c);//\u5F53\u4E00\u6B21\u8BFB\u53D6\u4E00\u884C\u65F6\uFF0C\u4F7F\u7528gets
	puts(c);//\u7B49\u4EF7\u4E8Eprintf(&quot;%s\\n&quot;,c);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="_4-6-str\u51FD\u6570\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_4-6-str\u51FD\u6570\u4F7F\u7528" aria-hidden="true">#</a> 4.6 str\u51FD\u6570\u4F7F\u7528</h3><p>#include &lt;string.h&gt;</p><p><code>strlen(),strcpy(),strcat()</code></p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

//char* strcpy(char* to, const char* from); \u6709const\u4FEE\u9970\u4EE3\u8868\u8FD9\u4E2A\u5730\u65B9\u53EF\u4EE5\u653E\u4E00\u4E2A\u5B57\u7B26\u4E32\u5E38\u91CF

int main()
{
	char c[20] = &quot;wangdao&quot;;
	printf(&quot;\u6570\u7EC4c\u5185\u5B57\u7B26\u4E32\u7684\u957F\u5EA6=%d\\n&quot;, strlen(c));
	char d[20];
	strcpy(d, &quot;study&quot;);
	puts(d);
	//\u4E0B\u9762\u662F\u770Bstrcmp,\u4E24\u4E2A\u5B57\u7B26\u4E32\u6BD4\u8F83\uFF0C\u662F\u6BD4\u8F83\u5BF9\u5E94\u5B57\u7B26\u4F4D\u7F6E\u7684ascii\u7801\u503C
	int ret = strcmp(&quot;hello&quot;, &quot;how&quot;);
	printf(&quot;\u4E24\u4E2A\u5B57\u7B26\u4E32\u6BD4\u8F83\u540E\u7684\u7ED3\u679C=%d\\n&quot;, ret);
	//\u4E0B\u9762\u770Bstrcat,\u62FC\u63A5\u4E24\u4E2A\u5B57\u7B26\u4E32,\u76EE\u6807\u6570\u7EC4\u8981\u80FD\u591F\u5BB9\u7EB3\u62FC\u63A5\u540E\u7684\u5B57\u7B26\u4E32
	strcat(c, d);
	puts(c);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="_4-3-2-\u4E8C\u53C9\u6811\u904D\u5386" tabindex="-1"><a class="header-anchor" href="#_4-3-2-\u4E8C\u53C9\u6811\u904D\u5386" aria-hidden="true">#</a> 4.3.2 \u4E8C\u53C9\u6811\u904D\u5386</h3><p><strong>\u5934\u6587\u4EF6 function.h</strong></p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
//\u4F5C\u8005 \u738B\u9053\u8BAD\u7EC3\u8425 \u9F99\u54E5
typedef char BiElemType;
typedef struct BiTNode{
	BiElemType c;//c\u5C31\u662F\u4E66\u7C4D\u4E0A\u7684data
	struct BiTNode *lchild;
	struct BiTNode *rchild;
}BiTNode,*BiTree;

typedef struct tag{
	BiTree p;//\u6811\u7684\u67D0\u4E00\u4E2A\u7ED3\u70B9\u7684\u5730\u5740\u503C
	struct tag *pnext;
}tag_t,*ptag_t;

//\u6808\u7684\u76F8\u5173\u6570\u636E\u7ED3\u6784
#define MaxSize 50
typedef BiTree ElemType;
typedef struct{
	ElemType data[MaxSize];
	int top;
}SqStack;
void InitStack(SqStack &amp;S);
bool StackEmpty(SqStack &amp;S);
bool Push(SqStack &amp;S,ElemType x);
bool Pop(SqStack &amp;S,ElemType &amp;x);
bool GetTop(SqStack &amp;S,ElemType &amp;x);
//\u961F\u5217\u7684\u76F8\u5173\u6570\u636E\u7ED3\u6784
typedef struct LinkNode{
	ElemType data;
	struct LinkNode *next;
}LinkNode;
typedef struct{
	LinkNode *front,*rear;
}LinkQueue;
void InitQueue(LinkQueue &amp;Q);
bool IsEmpty(LinkQueue Q);
void EnQueue(LinkQueue &amp;Q,ElemType x);
bool DeQueue(LinkQueue &amp;Q,ElemType &amp;x);

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><p><strong>\u4E3B\u51FD\u6570 \u4E8C\u53C9\u6811\u904D\u5386</strong></p><p>\u4E00\u822C\u8003\u5BDF\u9012\u5F52\u5F0F\u904D\u5386</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code>#include &quot;function.h&quot;

//\u9012\u5F52\u5B9E\u73B0
//abdhiejcfg  \u524D\u5E8F\u904D\u5386\uFF0C\u524D\u5E8F\u904D\u5386\u5C31\u662F\u6DF1\u5EA6\u4F18\u5148\u904D\u5386
void preOrder(BiTree p)
{
	if(p!=NULL)
	{
		putchar(p-&gt;c);//\u7B49\u4EF7\u4E8Evisit\u51FD\u6570
		preOrder(p-&gt;lchild);
		preOrder(p-&gt;rchild);
	}
}
//\u4E2D\u5E8F\u904D\u5386  hdibjeafcg
void InOrder(BiTree p)
{
	if(p!=NULL)
	{
		InOrder(p-&gt;lchild);
		putchar(p-&gt;c);
		InOrder(p-&gt;rchild);
	}
}
//hidjebfgca  \u540E\u5E8F\u904D\u5386
void PostOrder(BiTree p)
{
	if(p!=NULL)
	{
		PostOrder(p-&gt;lchild);
		PostOrder(p-&gt;rchild);
		putchar(p-&gt;c);
	}
}
//\u4E2D\u5E8F\u904D\u5386\u975E\u9012\u5F52\uFF0C\u975E\u9012\u5F52\u6267\u884C\u6548\u7387\u66F4\u9AD8\uFF0C\u8003\u7684\u6982\u7387\u5F88\u4F4E
void InOrder2(BiTree T)
{
	SqStack S;
	InitStack(S);BiTree p=T;
	while(p||!StackEmpty(S))//\u903B\u8F91\u6216||
	{
		if(p)
		{//\u5F53\u4E00\u4E2A\u7ED3\u70B9\u4E0D\u4E3A\u7A7A\uFF0C\u538B\u6808\uFF0C\u5E76\u53D6\u5DE6\u5B69\u5B50
			Push(S,p);
			p=p-&gt;lchild;
		}else{//\u5F39\u51FA\u6808\u4E2D\u5143\u7D20\u5E76\u6253\u5370\uFF0C\u83B7\u53D6\u6253\u5370\u5143\u7D20\u7684\u53F3\u7ED3\u70B9
			Pop(S,p);putchar(p-&gt;c);
			p=p-&gt;rchild;
		}
	}
}
//\u5C42\u6B21\u904D\u5386,\u5C42\u5E8F\u904D\u5386\uFF0C\u5E7F\u5EA6\u4F18\u5148\u904D\u5386
void LevelOrder(BiTree T)
{
	LinkQueue Q;//\u8F85\u52A9\u961F\u5217
	InitQueue(Q);//\u521D\u59CB\u5316\u961F\u5217
	BiTree p;
	EnQueue(Q,T);//\u6811\u6839\u5165\u961F
	while(!IsEmpty(Q))
	{
		DeQueue(Q,p);//\u51FA\u961F\u5F53\u524D\u7ED3\u70B9\u5E76\u6253\u5370
		putchar(p-&gt;c);
		if(p-&gt;lchild!=NULL) //\u5165\u961F\u5DE6\u5B69\u5B50
			EnQueue(Q,p-&gt;lchild);
		if(p-&gt;rchild!=NULL)  //\u5165\u961F\u53F3\u5B69\u5B50
			EnQueue(Q,p-&gt;rchild);
	}
}
//\u300A\u738B\u9053C\u7763\u5B66\u8425\u300B\u8BFE\u7A0B

//\u4E8C\u53C9\u6811\u7684\u5EFA\u6811\uFF08\u5C42\u6B21\u5EFA\u6811\uFF09\uFF0C\u524D\u5E8F\u3001\u4E2D\u5E8F\u3001\u540E\u5E8F\u904D\u5386\u3001\u4E2D\u5E8F\u975E\u9012\u5F52\u904D\u5386\u3001\u5C42\u6B21\u904D\u5386
int main()
{
	BiTree pnew;
	int i,j,pos;
	char c;
	BiTree tree=NULL;//\u6811\u6839
	ptag_t phead=NULL,ptail=NULL,listpnew=NULL,pcur=NULL;//phead\u5C31\u662F\u961F\u5217\u5934\uFF0Cptail\u5C31\u662F\u961F\u5217\u5C3E
	//abcdefghij
	while(scanf(&quot;%c&quot;,&amp;c)!=EOF)
	{
		if(c==&#39;\\n&#39;)
		{
			break;
		}
		pnew=(BiTree)calloc(1,sizeof(BiTNode));//calloc\u7533\u8BF7\u7A7A\u95F4\u5E76\u5BF9\u7A7A\u95F4\u8FDB\u884C\u521D\u59CB\u5316\uFF0C\u8D4B\u503C\u4E3A0
		pnew-&gt;c=c;//\u6570\u636E\u653E\u8FDB\u53BB
		listpnew=(ptag_t)calloc(1,sizeof(tag_t));//\u7ED9\u961F\u5217\u7ED3\u70B9\u7533\u8BF7\u7A7A\u95F4
		listpnew-&gt;p=pnew;
		if(NULL==tree)
		{
			tree=pnew;//\u6811\u7684\u6839
			phead=listpnew;//\u961F\u5217\u5934
			ptail=listpnew;//\u961F\u5217\u5C3E
			pcur=listpnew;
			continue;
		}else{
			ptail-&gt;pnext=listpnew;//\u65B0\u7ED3\u70B9\u653E\u5165\u94FE\u8868\uFF0C\u901A\u8FC7\u5C3E\u63D2\u6CD5
			ptail=listpnew;//ptail\u6307\u5411\u961F\u5217\u5C3E\u90E8
		}//pcur\u59CB\u7EC8\u6307\u5411\u8981\u63D2\u5165\u7684\u7ED3\u70B9\u7684\u4F4D\u7F6E
		if(NULL==pcur-&gt;p-&gt;lchild)//\u5982\u4F55\u628A\u65B0\u7ED3\u70B9\u653E\u5165\u6811
		{
			pcur-&gt;p-&gt;lchild=pnew;//\u628A\u65B0\u7ED3\u70B9\u653E\u5230\u8981\u63D2\u5165\u7ED3\u70B9\u7684\u5DE6\u8FB9
		}else if(NULL==pcur-&gt;p-&gt;rchild)
		{
			pcur-&gt;p-&gt;rchild=pnew;//\u628A\u65B0\u7ED3\u70B9\u653E\u5230\u8981\u63D2\u5165\u7ED3\u70B9\u7684\u53F3\u8FB9
			pcur=pcur-&gt;pnext;//\u5DE6\u53F3\u90FD\u653E\u4E86\u7ED3\u70B9\u540E\uFF0Cpcur\u6307\u5411\u961F\u5217\u7684\u4E0B\u4E00\u4E2A
		}
	}
	printf(&quot;--------\u524D\u5E8F\u904D\u5386----------\\n&quot;);//\u4E5F\u53EB\u5148\u5E8F\u904D\u5386\uFF0C\u5148\u6253\u5370\u5F53\u524D\u7ED3\u70B9\uFF0C\u6253\u5370\u5DE6\u5B69\u5B50\uFF0C\u6253\u5370\u53F3\u5B69\u5B50
	preOrder(tree);
	printf(&quot;\\n--------\u4E2D\u5E8F\u904D\u5386------------\\n&quot;);//\u5148\u6253\u5370\u5DE6\u5B69\u5B50\uFF0C\u6253\u5370\u7236\u4EB2\uFF0C\u6253\u5370\u53F3\u5B69\u5B50
	InOrder(tree);
	printf(&quot;\\n--------\u540E\u5E8F\u904D\u5386------------\\n&quot;);//\u5148\u6253\u5370\u5DE6\u5B69\u5B50\uFF0C\u6253\u5370\u53F3\u5B69\u5B50\uFF0C\u6700\u540E\u6253\u5370\u7236\u4EB2
	PostOrder(tree);
	printf(&quot;\\n--------\u4E2D\u5E8F\u904D\u5386\u975E\u9012\u5F52------\\n&quot;);//\u91CD\u8981\u6027\u4F4E
	InOrder2(tree); 
	printf(&quot;\\n--------\u5C42\u6B21\u904D\u5386-----------\\n&quot;);
	LevelOrder(tree);
	printf(&quot;\\n&quot;);
	system(&quot;pause&quot;);
} 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br></div></div><p><strong>\u6808\u65B9\u6CD5 stack.cpp</strong></p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code>#include &quot;function.h&quot;


void InitStack(SqStack &amp;S)
{
	S.top=-1;
}

bool StackEmpty(SqStack &amp;S)
{
	if(S.top==-1)
		return true;
	else
		return false;
}
//\u5165\u6808
bool Push(SqStack &amp;S,ElemType x)
{
	if(S.top==MaxSize-1)
	{
		return false;
	}
	S.data[++S.top]=x;
	return true;
}
//\u51FA\u6808
bool Pop(SqStack &amp;S,ElemType &amp;x)
{
	if(-1==S.top)
		return false;
	x=S.data[S.top--];
	return true;
}
//\u8BFB\u53D6\u6808\u9876\u5143\u7D20
bool GetTop(SqStack &amp;S,ElemType &amp;x)
{
	if(-1==S.top)
		return false;
	x=S.data[S.top];
	return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><p><strong>\u961F\u5217\u65B9\u6CD5 queue.cpp</strong></p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code>#include &quot;function.h&quot;
//\u5E26\u5934\u7ED3\u70B9\u7684\u961F\u5217
void InitQueue(LinkQueue &amp;Q)
{
	Q.front=Q.rear=(LinkNode*)malloc(sizeof(LinkNode));
	Q.front-&gt;next=NULL;
}

bool IsEmpty(LinkQueue Q)
{
	if(Q.front==Q.rear)
		return true;
	else
		return false;
}

void EnQueue(LinkQueue &amp;Q,ElemType x)
{
	LinkNode *s=(LinkNode *)malloc(sizeof(LinkNode));
	s-&gt;data=x;s-&gt;next=NULL;
	Q.rear-&gt;next=s;
	Q.rear=s;
}

bool DeQueue(LinkQueue &amp;Q,ElemType &amp;x)
{
	if(Q.front==Q.rear) return false;
	LinkNode *p=Q.front-&gt;next;//\u5934\u7ED3\u70B9\u4EC0\u4E48\u90FD\u6CA1\u5B58\uFF0C\u6240\u4EE5\u5934\u7ED3\u70B9\u7684\u4E0B\u4E00\u4E2A\u8282\u70B9\u624D\u6709\u6570\u636E
	x=p-&gt;data;
	Q.front-&gt;next=p-&gt;next;
	if(Q.rear==p)
		Q.rear=Q.front;
	free(p);
	return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div>`,25);function r(p,l){return e}var i=n(a,[["render",r],["__file","chapter4.html.vue"]]);export{i as default};
