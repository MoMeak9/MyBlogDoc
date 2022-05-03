import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.3dedad24.js";const a={},e=s(`<h1 id="c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt02" tabindex="-1"><a class="header-anchor" href="#c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt02" aria-hidden="true">#</a> C\u8BED\u8A00\u8BAD\u7EC3\u8425Chaptrt02</h1><h3 id="_2-2-\u987A\u5E8F\u8868\u7684\u589E\u5220\u67E5" tabindex="-1"><a class="header-anchor" href="#_2-2-\u987A\u5E8F\u8868\u7684\u589E\u5220\u67E5" aria-hidden="true">#</a> 2.2 \u987A\u5E8F\u8868\u7684\u589E\u5220\u67E5</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

#define MaxSize 50
typedef int ElemType;//\u987A\u5E8F\u8868\u4E2D\u5143\u7D20\u7684\u7C7B\u578B
//\u9759\u6001\u5206\u914D
typedef struct {
	ElemType data[MaxSize];//\u5B9A\u4E49\u7684\u6570\u7EC4\uFF0C\u7528\u6765\u5B58\u5143\u7D20
	int length;//\u5F53\u524D\u987A\u5E8F\u8868\u4E2D\u6709\u591A\u5C11\u4E2A\u5143\u7D20
}SqList;

//i\u4EE3\u8868\u63D2\u5165\u7684\u4F4D\u7F6E\uFF0C\u4ECE1\u5F00\u59CB\uFF0Ce\u8981\u63D2\u5165\u7684\u5143\u7D20
bool ListInsert(SqList&amp; L, int i, ElemType e)
{
	if (i&lt;1 || i&gt;L.length + 1)//\u5224\u65AD\u8981\u63D2\u5165\u7684\u4F4D\u7F6E\u662F\u5426\u5408\u6CD5
		return false;
	if (L.length &gt;= MaxSize)//\u5143\u7D20\u5B58\u50A8\u6EE1\u4E86\uFF0C\u4E0D\u80FD\u518D\u5B58\u4E86
		return false;
	for (int j = L.length; j &gt;= i; j--)//\u79FB\u52A8\u987A\u5E8F\u8868\u4E2D\u7684\u5143\u7D20\uFF0C\u4F9D\u6B21\u5F80\u540E\u79FB\u52A8
		L.data[j] = L.data[j - 1];
	L.data[i - 1] = e;//\u6570\u7EC4\u4E0B\u6807\u4ECE\u96F6\u5F00\u59CB\uFF0C\u63D2\u5165\u7B2C\u4E00\u4E2A\u4F4D\u7F6E\uFF0C\u8BBF\u95EE\u7684\u4E0B\u6807\u4E3A0
	L.length++;
	return true;//\u8D70\u5230\u8FD9\u91CC\u4EE3\u8868\u63D2\u5165\u6210\u529F\uFF0C\u8FD4\u56DEtrue
}
//\u5220\u9664\u4F7F\u7528\u5143\u7D20e\u7684\u5F15\u7528\u7684\u76EE\u7684\u662F\u62FF\u51FA\u5BF9\u5E94\u7684\u503C
bool ListDelete(SqList&amp; L, int i, ElemType&amp; e)
{
	if (i&lt;1 || i&gt;L.length)//\u5982\u679C\u5220\u9664\u7684\u4F4D\u7F6E\u662F\u4E0D\u5408\u6CD5
		return false;
	if (L.length == 0)//\u987A\u5E8F\u8868\u4E2D\u6CA1\u6709\u5143\u7D20\uFF0C\u65E0\u9700\u5220\u9664
	{
		return false;
	}
	e = L.data[i - 1];//\u83B7\u53D6\u987A\u5E8F\u8868\u4E2D\u5BF9\u5E94\u7684\u5143\u7D20\uFF0C\u8D4B\u503C\u7ED9e
	for (int j = i; j &lt; L.length; j++)//\u4ECEi\u7684\u4F4D\u7F6E\u4F9D\u6B21\u628A\u5143\u7D20\u5F80\u524D\u8986\u76D6
		L.data[j - 1] = L.data[j];
	L.length--;//\u5220\u9664\u4E00\u4E2A\u5143\u7D20\uFF0C\u987A\u5E8F\u8868\u957F\u5EA6\u51CF1
	return true;
}
//\u6253\u5370\u987A\u5E8F\u8868\u5143\u7D20
void PrintList(SqList&amp; L)
{
	for (int i = 0; i &lt; L.length; i++)
	{
		printf(&quot;%3d&quot;, L.data[i]);//\u8981\u6C42\u6240\u6709\u5143\u7D20\u6253\u5370\u5230\u4E00\u6392
	}
	printf(&quot;\\n&quot;);
}

//\u67E5\u627E\u6210\u529F\uFF0C\u8FD4\u56DE\u4F4D\u7F6E\uFF0C\u4F4D\u7F6E\u4ECE1\u5F00\u59CB\uFF0C\u67E5\u627E\u5931\u8D25\uFF0C\u8FD4\u56DE0
int LocateElem(SqList L, ElemType e)
{
	int i;
	for (i = 0; i &lt; L.length; i++)//\u904D\u5386\u987A\u5E8F\u8868
		if (L.data[i] == e)
			return i + 1;//\u52A01\u5C31\u662F\u5143\u7D20\u5728\u987A\u5E8F\u8868\u4E2D\u7684\u4F4D\u7F6E
	return 0;
}

int main()
{
	SqList L;//\u987A\u5E8F\u8868\u7684\u540D\u79F0
	bool ret;//\u67E5\u770B\u8FD4\u56DE\u503C\uFF0C\u5E03\u5C14\u578B\u662FTrue,\u6216\u8005False
	ElemType del;//\u7528\u6765\u5B58\u8981\u5220\u9664\u7684\u5143\u7D20
	//\u9996\u5148\u624B\u52A8\u5728\u987A\u5E8F\u8868\u4E2D\u524D\u4E09\u4E2A\u5143\u7D20\u8D4B\u503C
	L.data[0] = 1;
	L.data[1] = 2;
	L.data[2] = 3;
	L.length = 3;//\u603B\u8BA1\u4E09\u4E2A\u5143\u7D20
	ret = ListInsert(L, 2, 60);//\u5F80\u7B2C\u4E8C\u4E2A\u4F4D\u7F6E\u63D2\u516560\u8FD9\u4E2A\u5143\u7D20
	if (ret)
	{
		printf(&quot;\u63D2\u5165\u6210\u529F\\n&quot;);
		PrintList(L);//\u6253\u5370\u6210\u529F\u540E\u7684\u987A\u5E8F\u8868
	}
	else {
		printf(&quot;\u63D2\u5165\u5931\u8D25\\n&quot;);
	}
	ret = ListDelete(L, 1, del);//\u5220\u9664\u7B2C\u4E00\u4E2A\u4F4D\u7F6E\u7684\u5143\u7D20\uFF0C\u5E76\u628A\u5143\u7D20\u503C\u8F93\u51FA
	if (ret)
	{
		printf(&quot;\u5220\u9664\u6210\u529F\\n&quot;);
		printf(&quot;\u5220\u9664\u5143\u7D20\u503C\u4E3A %d\\n&quot;, del);
		PrintList(L);
	}
	else {
		printf(&quot;\u5220\u9664\u5931\u8D25\\n&quot;);
	}
	int elem_pos;
	elem_pos = LocateElem(L, 60);
	if (elem_pos)
	{
		printf(&quot;\u67E5\u627E\u6210\u529F\\n&quot;);
		printf(&quot;\u5143\u7D20\u4F4D\u7F6E\u4E3A %d\\n&quot;, elem_pos);//\u4E3A\u4E86\u6253\u5370\u4E00\u4E0B\u5143\u7D20\u7684\u4F4D\u7F6E
	}
	else {
		printf(&quot;\u67E5\u627E\u5931\u8D25\\n&quot;);
	}
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br></div></div><h3 id="_2-3-\u987A\u5E8F\u8868\u7684\u94FE\u5F0F\u5C55\u793A" tabindex="-1"><a class="header-anchor" href="#_2-3-\u987A\u5E8F\u8868\u7684\u94FE\u5F0F\u5C55\u793A" aria-hidden="true">#</a> 2.3 \u987A\u5E8F\u8868\u7684\u94FE\u5F0F\u5C55\u793A</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

typedef int ElemType;
typedef struct LNode{
	ElemType data;
	struct LNode *next;//\u6307\u5411\u4E0B\u4E00\u4E2A\u7ED3\u70B9 
}LNode,*LinkList;
//\u5934\u63D2\u6CD5\u65B0\u5EFA\u94FE\u8868
LinkList CreatList1(LinkList &amp;L)//list_head_insert
{
	LNode *s;int x;
	L=(LinkList)malloc(sizeof(LNode));//\u5E26\u5934\u7ED3\u70B9\u7684\u94FE\u8868,\u4E0D\u5E26\u5934\u7ED3\u70B9
	L-&gt;next=NULL;//L-&gt;data\u91CC\u8FB9\u6CA1\u653E\u4E1C\u897F
	scanf(&quot;%d&quot;,&amp;x);//\u4ECE\u6807\u51C6\u8F93\u5165\u8BFB\u53D6\u6570\u636E
	//3 4 5 6 7 9999
	while(x!=9999){
		s=(LNode*)malloc(sizeof(LNode));//\u7533\u8BF7\u4E00\u4E2A\u7A7A\u95F4\u7A7A\u95F4\uFF0C\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362
		s-&gt;data=x;
		s-&gt;next=L-&gt;next;
		L-&gt;next=s;
		scanf(&quot;%d&quot;,&amp;x);//\u8BFB\u53D6\u6807\u51C6\u8F93\u5165
	}
	return L;
}
//\u5C3E\u63D2\u6CD5\u65B0\u5EFA\u94FE\u8868
LinkList CreatList2(LinkList &amp;L)//list_tail_insert
{
	int x;
	L=(LinkList)malloc(sizeof(LNode));//\u5E26\u5934\u8282\u70B9\u7684\u94FE\u8868
	LNode *s,*r=L;
	//3 4 5 6 7 9999
	scanf(&quot;%d&quot;,&amp;x);
	while(x!=9999){
		s=(LNode*)malloc(sizeof(LNode));
		s-&gt;data=x;
		r-&gt;next=s;
		r=s;//r\u6307\u5411\u65B0\u7684\u8868\u5C3E\u7ED3\u70B9
		scanf(&quot;%d&quot;,&amp;x);
	}
	r-&gt;next=NULL;//\u5C3E\u7ED3\u70B9\u7684next\u6307\u9488\u8D4B\u503C\u4E3ANULL
	return L;
}
//\u6309\u5E8F\u53F7\u67E5\u627E\u7ED3\u70B9\u503C
LNode *GetElem(LinkList L,int i)
{
	int j=1;
	LNode *p=L-&gt;next;
	if(i==0)
		return L;
	if(i&lt;1)
		return NULL;
	while(p&amp;&amp;j&lt;i)
	{
		p=p-&gt;next;
		j++;
	}
	return p;
}
//\u6309\u503C\u67E5\u627E
LNode *LocateElem(LinkList L,ElemType e)
{
	LNode *p=L-&gt;next;
	while(p!=NULL&amp;&amp;p-&gt;data!=e)
		p=p-&gt;next;
	return p;
}
//\u65B0\u7ED3\u70B9\u63D2\u5165\u7B2Ci\u4E2A\u4F4D\u7F6E
bool ListFrontInsert(LinkList L,int i,ElemType e)
{
	LinkList p=GetElem(L,i-1);
	if(NULL==p)
	{
		return false;
	}
	LinkList s=(LNode*)malloc(sizeof(LNode));//\u4E3A\u65B0\u63D2\u5165\u7684\u7ED3\u70B9\u7533\u8BF7\u7A7A\u95F4
	s-&gt;data=e;
	s-&gt;next=p-&gt;next;
	p-&gt;next=s;
	return true;
}
//\u5220\u9664\u7B2Ci\u4E2A\u7ED3\u70B9
bool ListDelete(LinkList L,int i)
{
	LinkList p=GetElem(L,i-1);
	if(NULL==p)
	{
		return false;
	}
	LinkList q;
	q=p-&gt;next;
	p-&gt;next=q-&gt;next;//\u65AD\u94FE
	free(q);//\u91CA\u653E\u5BF9\u5E94\u7ED3\u70B9\u7684\u7A7A\u95F4
	return true;
}
//\u6253\u5370\u94FE\u8868\u4E2D\u6BCF\u4E2A\u7ED3\u70B9\u7684\u503C
void PrintList(LinkList L)
{
	L=L-&gt;next;
	while(L!=NULL)
	{
		printf(&quot;%3d&quot;,L-&gt;data);
		L=L-&gt;next;
	}
	printf(&quot;\\n&quot;);
}
//\u300A\u738B\u9053C\u7763\u5B66\u8425\u300B\u8BFE\u7A0B
//2.3 \u7EBF\u6027\u8868\u7684\u94FE\u5F0F\u8868\u793A
int main()
{
	LinkList L;//\u94FE\u8868\u5934
	LinkList search;//\u7528\u6765\u5B58\u50A8\u62FF\u5230\u7684\u67D0\u4E00\u4E2A\u8282\u70B9
	//CreatList1(L);//\u8F93\u5165\u6570\u636E\u53EF\u4EE5\u4E3A3 4 5 6 7 9999
	CreatList2(L);//\u8F93\u5165\u6570\u636E\u53EF\u4EE5\u4E3A3 4 5 6 7 9999
	PrintList(L);
	search=GetElem(L,2);
	if(search!=NULL)
	{
		printf(&quot;\u6309\u5E8F\u53F7\u67E5\u627E\u6210\u529F\\n&quot;);
		printf(&quot;%d\\n&quot;,search-&gt;data);
	}
	search=LocateElem(L,6);//\u6309\u503C\u67E5\u8BE2
	if(search!=NULL)
	{
		printf(&quot;\u6309\u503C\u67E5\u627E\u6210\u529F\\n&quot;);
		printf(&quot;%d\\n&quot;,search-&gt;data);
	}
	ListFrontInsert(L,2,99);//\u65B0\u7ED3\u70B9\u63D2\u5165\u7B2Ci\u4E2A\u4F4D\u7F6E
	PrintList(L);
	ListDelete(L,4);//\u5220\u9664\u7B2C4\u4E2A\u7ED3\u70B9
	PrintList(L);
	system(&quot;pause&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br></div></div><h3 id="_2-3-3-\u53CC\u5411\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#_2-3-3-\u53CC\u5411\u94FE\u8868" aria-hidden="true">#</a> 2.3.3 \u53CC\u5411\u94FE\u8868</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

typedef int ElemType;
typedef struct DNode{
	ElemType data;
	struct DNode *prior,*next;//\u524D\u9A71\uFF0C\u540E\u7EE7
}DNode,*DLinkList;
//\u53CC\u5411\u94FE\u8868\u5934\u63D2\u6CD5
DLinkList Dlist_head_insert(DLinkList &amp;DL)
{
	DNode *s;int x;
	DL=(DLinkList)malloc(sizeof(DNode));//\u5E26\u5934\u7ED3\u70B9\u7684\u94FE\u8868,\u4E0D\u5E26\u5934\u7ED3\u70B9
	DL-&gt;next=NULL;
	DL-&gt;prior=NULL;
	scanf(&quot;%d&quot;,&amp;x);//\u4ECE\u6807\u51C6\u8F93\u5165\u8BFB\u53D6\u6570\u636E
	//3 4 5 6 7 9999
	while(x!=9999){
		s=(DLinkList)malloc(sizeof(DNode));//\u7533\u8BF7\u4E00\u4E2A\u7A7A\u95F4\u7A7A\u95F4\uFF0C\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362
		s-&gt;data=x;
		s-&gt;next=DL-&gt;next;
		if(DL-&gt;next!=NULL)//\u63D2\u5165\u7B2C\u4E00\u4E2A\u7ED3\u70B9\u65F6\uFF0C\u4E0D\u9700\u8981\u8FD9\u4E00\u6B65\u64CD\u4F5C
		{
			DL-&gt;next-&gt;prior=s;
		}
		s-&gt;prior=DL;
		DL-&gt;next=s;
		scanf(&quot;%d&quot;,&amp;x);//\u8BFB\u53D6\u6807\u51C6\u8F93\u5165
	}
	return DL;
}

//\u53CC\u5411\u94FE\u8868\u5C3E\u63D2\u6CD5
DLinkList Dlist_tail_insert(DLinkList &amp;DL)
{
	int x;
	DL=(DLinkList)malloc(sizeof(DNode));//\u5E26\u5934\u8282\u70B9\u7684\u94FE\u8868
	DNode *s,*r=DL;
	DL-&gt;prior=NULL;
	//3 4 5 6 7 9999
	scanf(&quot;%d&quot;,&amp;x);
	while(x!=9999){
		s=(DNode*)malloc(sizeof(DNode));
		s-&gt;data=x;
		r-&gt;next=s;
		s-&gt;prior=r;
		r=s;//r\u6307\u5411\u65B0\u7684\u8868\u5C3E\u7ED3\u70B9
		scanf(&quot;%d&quot;,&amp;x);
	}
	r-&gt;next=NULL;//\u5C3E\u7ED3\u70B9\u7684next\u6307\u9488\u8D4B\u503C\u4E3ANULL
	return DL;
}
//\u6309\u5E8F\u53F7\u67E5\u627E\u7ED3\u70B9\u503C
DNode *GetElem(DLinkList DL,int i)
{
	int j=1;
	DNode *p=DL-&gt;next;
	if(i==0)
		return DL;
	if(i&lt;1)
		return NULL;
	while(p&amp;&amp;j&lt;i)
	{
		p=p-&gt;next;
		j++;
	}
	return p;
}
//\u65B0\u7ED3\u70B9\u63D2\u5165\u7B2Ci\u4E2A\u4F4D\u7F6E
bool DListFrontInsert(DLinkList DL,int i,ElemType e)
{
	DLinkList p=GetElem(DL,i-1);
	if(NULL==p)
	{
		return false;
	}
	DLinkList s=(DLinkList)malloc(sizeof(DNode));//\u4E3A\u65B0\u63D2\u5165\u7684\u7ED3\u70B9\u7533\u8BF7\u7A7A\u95F4
	s-&gt;data=e;
	s-&gt;next=p-&gt;next;
	p-&gt;next-&gt;prior=s;
	s-&gt;prior=p;
	p-&gt;next=s;
	return true;
}
//\u5220\u9664\u7B2Ci\u4E2A\u7ED3\u70B9
bool DListDelete(DLinkList DL,int i)
{
	DLinkList p=GetElem(DL,i-1);
	if(NULL==p)
	{
		return false;
	}
	DLinkList q;
	q=p-&gt;next;
	if(q==NULL)//\u5220\u9664\u7684\u5143\u7D20\u4E0D\u5B58\u5728
		return false;
	p-&gt;next=q-&gt;next;//\u65AD\u94FE
	if(q-&gt;next!=NULL)
	{
		q-&gt;next-&gt;prior=p;
	}
	free(q);//\u91CA\u653E\u5BF9\u5E94\u7ED3\u70B9\u7684\u7A7A\u95F4
	return true;
}
//\u94FE\u8868\u6253\u5370
void PrintDList(DLinkList DL)
{
	DL=DL-&gt;next;
	while(DL!=NULL)
	{
		printf(&quot;%3d&quot;,DL-&gt;data);
		DL=DL-&gt;next;
	}
	printf(&quot;\\n&quot;);
}

//\u300A\u9F99\u54E5\u5E26\u4F60\u64B8\u4EE3\u7801\u300B\u8BFE\u7A0B
//2.3.3 \u53CC\u94FE\u8868\u589E\u5220\u67E5
int main()
{
	DLinkList DL;
	DLinkList search;
	Dlist_head_insert(DL);
	//Dlist_tail_insert(DL);
	//3 4 5 6 7 9999
	PrintDList(DL);
	search=GetElem(DL,2);
	if(search!=NULL)
	{
		printf(&quot;\u6309\u5E8F\u53F7\u67E5\u627E\u6210\u529F\\n&quot;);
		printf(&quot;%d\\n&quot;,search-&gt;data);
	}
	DListFrontInsert(DL,3,99);
	PrintDList(DL);
	DListDelete(DL,2);
	PrintDList(DL);
	system(&quot;pause&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br></div></div><h3 id="_2-3-\u4F5C\u4E1A" tabindex="-1"><a class="header-anchor" href="#_2-3-\u4F5C\u4E1A" aria-hidden="true">#</a> 2.3 \u4F5C\u4E1A</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#define _CRT_SECURE_NO_WARNINGS
#include &lt;stdio.h&gt;

struct student {
	int num;
	char name[20];
	char sex;
};//\u58F0\u660E\u4E00\u4E2A\u7ED3\u6784\u4F53\u7C7B\u578B

int main()
{
	struct student s;
	scanf(&quot;%d%s %c&quot;, &amp;s.num, s.name, &amp;s.sex);//scanf\u4F20\u9012\u65F6\uFF0C\u4E3A\u4EC0\u4E48\u540E\u9762\u8981\u7ED9\u4E00\u4E2A\u5730\u5740\uFF0C\u6307\u9488\u7684\u4F20\u9012\u7684\u4F7F\u7528\u573A\u666F
	printf(&quot;%d %s %c\\n&quot;, s.num, s.name, s.sex);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,9);function r(l,p){return e}var i=n(a,[["render",r],["__file","chapter2.html.vue"]]);export{i as default};
