import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9338189c.js";const a={},e=s(`<h1 id="c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt07-\u7ED3\u6784\u4F53" tabindex="-1"><a class="header-anchor" href="#c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt07-\u7ED3\u6784\u4F53" aria-hidden="true">#</a> C\u8BED\u8A00\u8BAD\u7EC3\u8425Chaptrt07 \u7ED3\u6784\u4F53</h1><h3 id="_7-1-\u7ED3\u6784\u4F53" tabindex="-1"><a class="header-anchor" href="#_7-1-\u7ED3\u6784\u4F53" aria-hidden="true">#</a> 7.1 \u7ED3\u6784\u4F53</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
//\u7ED3\u6784\u4F53\u6240\u5360\u7528\u7A7A\u95F4\u662F68\u4E2A\u5B57\u8282\uFF0C\u56E0\u4E3A\u5B58\u5728\u5BF9\u9F50\uFF0C\u5BF9\u9F50\u7684\u76EE\u7684\u662F
//\u4E3A\u4E86\u63D0\u9AD8cpu\u8BBF\u95EE\u5185\u5B58\u7684\u6548\u7387
struct student {
	int num;//num\u662F\u7ED3\u6784\u4F53\u6210\u5458
	char name[20];
	char sex;
	int age;
	float score;
	char addr[30];
};  //\u7ED3\u6784\u4F53\u7C7B\u578B\u58F0\u660E\uFF0C\u6CE8\u610F\u6700\u540E\u4E00\u5B9A\u8981\u52A0\u5206\u53F7

int main()
{
	struct student s = {1001,&quot;lele&quot;,&#39;m&#39;,20,98.5,&quot;Shenzhen&quot;};
	struct student sarr[3]; // \u7ED3\u6784\u4F53\u6570\u7EC4
	int i;
	printf(&quot;%d %s %c %d %5.2f %s\\n&quot;, s.num,s.name,s.sex,s.age,s.score,s.addr);
	for (i = 0; i &lt; 3; i++)
	{
		scanf(&quot;%d%s %c%d%f%s&quot;, &amp;sarr[i].num, sarr[i].name, &amp;sarr[i].sex, &amp;sarr[i].age, &amp;sarr[i].score, sarr[i].addr);
	}
	for (i = 0; i &lt; 3; i++)
	{
		printf(&quot;%d %s %c %d %f %s\\n&quot;, sarr[i].num, sarr[i].name, sarr[i].sex, sarr[i].age, sarr[i].score, sarr[i].addr);
	}

	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h3 id="_7-1-2-\u7ED3\u6784\u4F53\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#_7-1-2-\u7ED3\u6784\u4F53\u6307\u9488" aria-hidden="true">#</a> 7.1.2 \u7ED3\u6784\u4F53\u6307\u9488</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

//\u7ED3\u6784\u4F53\u6307\u9488
struct student {
	int num;
	char name[20];
	char sex;
};

int main()
{
	struct student s = { 1001,&quot;wangle&quot;,&#39;M&#39; };
	struct student* p;
	p = &amp;s;
	printf(&quot;%d %s %c\\n&quot;, (*p).num, (*p).name, (*p).sex);
	printf(&quot;%d %s %c\\n&quot;, p-&gt;num,p-&gt;name,p-&gt;sex);//\u6307\u9488\u7684\u6210\u5458\u9009\u62E9\uFF0C\u5F88\u91CD\u8981
	//\u7ED3\u6784\u4F53\u521D\u59CB\u5316
	struct student sarr[3] = { 1001,&quot;lilei&quot;,&#39;M&#39;,1005,&quot;zhangsan&quot;,&#39;M&#39;,1007,&quot;lili&quot;,&#39;F&#39; };
	int num;
	p = sarr;
	printf(&quot;------------------------------\\n&quot;);//\u4E0B\u9762\u4E00\u90E8\u5206\u4E0D\u91CD\u8981
	num = p-&gt;num++;//num=p-&gt;num;p-&gt;num++
	printf(&quot;num=%d,p-&gt;num=%d\\n&quot;, num, p-&gt;num);//1001,1002
	num = p++-&gt;num;//num=p-&gt;num;p++;
	printf(&quot;num=%d,p-&gt;num=%d\\n&quot;, num, p-&gt;num);//1002,1005
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="_7-1-3-typedef-\u7684\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_7-1-3-typedef-\u7684\u4F7F\u7528" aria-hidden="true">#</a> 7.1.3 typedef \u7684\u4F7F\u7528</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;

//\u7ED9\u7ED3\u6784\u4F53\u7C7B\u578B\u8D77\u522B\u540D\uFF0C\u53EBstu\uFF0C\u8D77\u4E86\u7ED3\u6784\u4F53\u6307\u9488\u7C7B\u578B\u7684\u522B\u540D\uFF0C\u53EBpstu\uFF0C\u4E0D\u7528\u5E26*
typedef struct student {
	int num;
	char name[20];
	char sex;
}stu, * pstu;

typedef int INTEGER;
int main()
{
	stu s= { 1001,&quot;wangle&quot;,&#39;M&#39; };
	pstu p;//stu* p1,\u90A3\u4E48p1\u4E5F\u662F\u4E00\u4E2A\u7ED3\u6784\u4F53\u6307\u9488
	INTEGER i = 10;
	p = &amp;s;
	printf(&quot;i=%d,p-&gt;num=%d\\n&quot;, i, p-&gt;num);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="_7-1-4-c-\u7684\u5F15\u7528" tabindex="-1"><a class="header-anchor" href="#_7-1-4-c-\u7684\u5F15\u7528" aria-hidden="true">#</a> 7.1.4 C++\u7684\u5F15\u7528</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
//\u628A&amp;\u5199\u5230\u5F62\u53C2\u7684\u4F4D\u7F6E\u662FC++\u7684\u8BED\u6CD5\uFF0C\u79F0\u4E3A\u5F15\u7528,\u8FD9\u4E2A\u65F6\u5019\u64CD\u4F5Cb\u548C\u5728\u4E3B\u51FD\u6570\u91CC\u8FB9\u4F7F\u7528a\u7B49\u4EF7\u7684
void modify_num(int&amp; b)
{
	++b;
}

void modify_pointer(int*&amp; p)//\u5728\u5B50\u51FD\u6570\u5185\u64CD\u4F5Cp\u548C\u4E3B\u51FD\u6570\u64CD\u4F5Cp\u624B\u6CD5\u4E00\u81F4
{
	p = (int*)malloc(20);
	p[0] = 5;
}
int main()
{
	int a = 10;
	modify_num(a);
	printf(&quot;a=%d\\n&quot;, a);
	int* p = NULL;
	modify_pointer(p);
	printf(&quot;p[0]=%d\\n&quot;, p[0]);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="_7-2-\u987A\u5E8F\u67E5\u627E\u4E0E\u6298\u534A\u67E5\u627E" tabindex="-1"><a class="header-anchor" href="#_7-2-\u987A\u5E8F\u67E5\u627E\u4E0E\u6298\u534A\u67E5\u627E" aria-hidden="true">#</a> 7.2 \u987A\u5E8F\u67E5\u627E\u4E0E\u6298\u534A\u67E5\u627E</h3><p><strong>\u987A\u5E8F\u67E5\u627E</strong></p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code>// \u987A\u5E8F\u67E5\u627E\uFF0C\u5176\u4E2D\u957F\u5EA6+1\uFF0C0\u4F4D\u7F6E\u4E3A\u54E8\u5175
int Search_Seq(SSTable ST,ElemType key)
{
	ST.elem[0]=key;//\u8BA9\u96F6\u53F7\u5143\u7D20\u4F5C\u4E3A\u54E8\u5175
	int i;
	for(i=ST.TableLen-1;ST.elem[i]!=key;--i);
	return i;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>\u4E8C\u5206\u67E5\u627E\u5B9E\u73B0\uFF08\u6298\u534A\u67E5\u627E\uFF09</strong></p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code>//\u65F6\u95F4\u590D\u6742\u5EA6  logn
int Binary_Search(SSTable L,ElemType key)
{
	int low=0,high=L.TableLen-1,mid;
	while(low&lt;=high)
	{
		mid=(low+high)/2;
		if(L.elem[mid]==key)
			return mid;//\u7B49\u4E8E\u5C31\u627E\u5230\u4E86
		else if(L.elem[mid]&gt;key)
			high=mid-1;
		else
			low=mid+1;
	}
	return -1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><strong>\u5B8C\u6574\u4EE3\u7801</strong></p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;time.h&gt;
typedef int ElemType;
typedef struct{
	ElemType *elem;//\u6574\u578B\u6307\u9488
	int TableLen;//\u5B58\u50A8\u52A8\u6001\u6570\u7EC4\u91CC\u8FB9\u5143\u7D20\u7684\u4E2A\u6570
}SSTable;

// \u987A\u5E8F\u67E5\u627E\uFF0C\u5176\u4E2D\u957F\u5EA6+1\uFF0C0\u4F4D\u7F6E\u4E3A\u54E8\u5175
int Search_Seq(SSTable ST,ElemType key)
{
	ST.elem[0]=key;//\u8BA9\u96F6\u53F7\u5143\u7D20\u4F5C\u4E3A\u54E8\u5175
	int i;
	for(i=ST.TableLen-1;ST.elem[i]!=key;--i);
	return i;
}
//init\u8FDB\u884C\u4E86\u968F\u673A\u6570\u751F\u6210
void ST_Init(SSTable &amp;ST,int len)
{
	ST.TableLen=len+1;//\u591A\u7533\u8BF7\u4E86\u4E00\u4E2A\u4F4D\u7F6E,\u4E3A\u4E86\u5B58\u54E8\u5175
	ST.elem=(ElemType *)malloc(sizeof(ElemType)*ST.TableLen);
	int i;
	srand(time(NULL));//\u968F\u673A\u6570\u751F\u6210
	for(i=0;i&lt;ST.TableLen;i++)//\u4E3A\u5565\u8FD9\u91CC\u96F6\u53F7\u4F4D\u7F6E\u4E5F\u968F\u673A\u4E86\u6570\u636E\uFF0C\u4E3A\u6298\u534A\u67E5\u627E\u670D\u52A1
	{
		ST.elem[i]=rand()%100;
	}
}

void ST_print(SSTable ST)
{
	for(int i=0;i&lt;ST.TableLen;i++)
	{
		printf(&quot;%3d&quot;,ST.elem[i]);
	}
	printf(&quot;\\n&quot;);
}

//\u65F6\u95F4\u590D\u6742\u5EA6  log(n)
int Binary_Search(SSTable L,ElemType key)
{
	int low=0,high=L.TableLen-1,mid;
	while(low&lt;=high)
	{
		mid=(low+high)/2;
		if(L.elem[mid]==key)
			return mid;//\u7B49\u4E8E\u5C31\u627E\u5230\u4E86
		else if(L.elem[mid]&gt;key)
			high=mid-1;
		else
			low=mid+1;
	}
	return -1;
}
int compare(const void *left,const void *right)//left\uFF0Cright\u662F\u4EFB\u610F\u4E24\u4E2A\u5143\u7D20\u7684\u5730\u5740\u503C
{
	return *(ElemType*)left-*(ElemType*)right;
	//return *(ElemType*)right - *(ElemType*)left;//\u4ECE\u5927\u5230\u5C0F
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div><h3 id="_7-5-\u5B57\u7B26\u4E32\u6A21\u5F0F\u5339\u914D" tabindex="-1"><a class="header-anchor" href="#_7-5-\u5B57\u7B26\u4E32\u6A21\u5F0F\u5339\u914D" aria-hidden="true">#</a> 7.5 \u5B57\u7B26\u4E32\u6A21\u5F0F\u5339\u914D</h3>`,17);function r(l,p){return e}var t=n(a,[["render",r],["__file","chapter7.html.vue"]]);export{t as default};
