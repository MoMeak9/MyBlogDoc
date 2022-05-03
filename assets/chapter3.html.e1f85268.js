import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.3dedad24.js";const a={},e=s(`<h1 id="c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt02-\u9009\u62E9\u4E0E\u5FAA\u73AF" tabindex="-1"><a class="header-anchor" href="#c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt02-\u9009\u62E9\u4E0E\u5FAA\u73AF" aria-hidden="true">#</a> C\u8BED\u8A00\u8BAD\u7EC3\u8425Chaptrt02 \u9009\u62E9\u4E0E\u5FAA\u73AF</h1><h3 id="_3-1-\u6808" tabindex="-1"><a class="header-anchor" href="#_3-1-\u6808" aria-hidden="true">#</a> 3.1 \u6808</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

#define MaxSize 50
typedef int ElemType;
typedef struct{
	ElemType data[MaxSize];//\u6570\u7EC4
	int top;
}SqStack;
void InitStack(SqStack &amp;S)
{
	S.top=-1;//\u4EE3\u8868\u6808\u4E3A\u7A7A
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
	if(S.top==MaxSize-1)//\u6570\u7EC4\u7684\u5927\u5C0F\u4E0D\u80FD\u6539\u53D8\uFF0C\u907F\u514D\u8BBF\u95EE\u8D8A\u754C
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
	x=S.data[S.top--];//\u540E\u51CF\u51CF\uFF0Cx=S.data[S.top];S.top=S.top-1;
	return true;
}
//\u8BFB\u53D6\u6808\u9876\u5143\u7D20
bool GetTop(SqStack &amp;S,ElemType &amp;x)
{
	if(-1==S.top)//\u8BF4\u660E\u6808\u4E3A\u7A7A
		return false;
	x=S.data[S.top];
	return true;
}
//\u300A\u738B\u9053C\u7763\u5B66\u8425\u300B\u8BFE\u7A0B
//\u738B\u9053\u6570\u636E\u7ED3\u6784 3.1 \u6808
//\u5B9E\u73B0\u6808 \u53EF\u4EE5\u7528\u6570\u7EC4\uFF0C\u4E5F\u53EF\u4EE5\u7528\u94FE\u8868\uFF0C\u6211\u4EEC\u8FD9\u91CC\u4F7F\u7528\u6570\u7EC4
int main()
{
	SqStack S;//\u5148\u8FDB\u540E\u51FA FILO  LIFO
	bool flag;
	ElemType m;//\u7528\u6765\u5B58\u653E\u62FF\u51FA\u7684\u5143\u7D20
	InitStack(S);//\u521D\u59CB\u5316
	flag=StackEmpty(S);
	if(flag)
	{
		printf(&quot;\u6808\u662F\u7A7A\u7684\\n&quot;);
	}
	Push(S,3);//\u5165\u6808\u5143\u7D203
	Push(S,4);//\u5165\u6808\u5143\u7D204
	Push(S,5);
	flag=GetTop(S,m);//\u83B7\u53D6\u6808\u9876\u5143\u7D20
	if(flag)
	{
		printf(&quot;\u83B7\u53D6\u6808\u9876\u5143\u7D20\u4E3A %d\\n&quot;,m);
	}
	flag=Pop(S,m);//\u5F39\u51FA\u6808\u9876\u5143\u7D20
	if(flag)
	{
		printf(&quot;\u5F39\u51FA\u5143\u7D20\u4E3A %d\\n&quot;,m);
	}
	system(&quot;pause&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br></div></div><h3 id="_3-2-\u5FAA\u73AF\u961F\u5217" tabindex="-1"><a class="header-anchor" href="#_3-2-\u5FAA\u73AF\u961F\u5217" aria-hidden="true">#</a> 3.2 \u5FAA\u73AF\u961F\u5217</h3><blockquote><p>\u5FAA\u73AF\u961F\u5217\u5C31\u662F\u5C06\u961F\u5217\u5B58\u50A8\u7A7A\u95F4\u7684\u6700\u540E\u4E00\u4E2A\u4F4D\u7F6E\u7ED5\u5230\u7B2C\u4E00\u4E2A\u4F4D\u7F6E\uFF0C\u5F62\u6210\u903B\u8F91\u4E0A\u7684\u73AF\u72B6\u7A7A\u95F4\uFF0C\u4F9B\u961F\u5217\u5FAA\u73AF\u4F7F\u7528\u3002 \u5728\u5FAA\u73AF\u961F\u5217\u7ED3\u6784\u4E2D\uFF0C\u5F53\u5B58\u50A8\u7A7A\u95F4\u7684\u6700\u540E\u4E00\u4E2A\u4F4D\u7F6E\u5DF2\u88AB\u4F7F\u7528\u800C\u518D\u8981\u8FDB\u5165\u961F\u8FD0\u7B97\u65F6\uFF0C\u53EA\u9700\u8981\u5B58\u50A8\u7A7A\u95F4\u7684\u7B2C\u4E00\u4E2A\u4F4D\u7F6E\u7A7A\u95F2\uFF0C\u4FBF\u53EF\u5C06\u5143\u7D20\u52A0\u5165\u5230\u7B2C\u4E00\u4E2A\u4F4D\u7F6E\uFF0C\u5373\u5C06\u5B58\u50A8\u7A7A\u95F4\u7684\u7B2C\u4E00\u4E2A\u4F4D\u7F6E\u4F5C\u4E3A\u961F\u5C3E\u3002 \u5FAA\u73AF\u961F\u5217\u53EF\u4EE5\u66F4\u7B80\u5355\u9632\u6B62\u4F2A\u6EA2\u51FA\u7684\u53D1\u751F\uFF0C\u4F46\u961F\u5217\u5927\u5C0F\u662F\u56FA\u5B9A\u7684\u3002</p></blockquote><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

#define MaxSize 5
typedef int ElemType;
typedef struct{
	ElemType data[MaxSize];//\u6570\u7EC4,\u5B58\u50A8MaxSize-1\u4E2A\u5143\u7D20
	int front,rear;//\u961F\u5217\u5934 \u961F\u5217\u5C3E
}SqQueue;

void InitQueue(SqQueue &amp;Q)
{
	Q.rear=Q.front=0;
}
//\u5224\u7A7A
bool isEmpty(SqQueue &amp;Q)
{
	if(Q.rear==Q.front)//\u4E0D\u9700\u8981\u4E3A\u96F6
		return true;
	else
		return false;
}
//\u5165\u961F
bool EnQueue(SqQueue &amp;Q,ElemType x)
{
	if((Q.rear+1)%MaxSize==Q.front) //\u5224\u65AD\u662F\u5426\u961F\u6EE1
		return false;
	Q.data[Q.rear]=x;//3 4 5 6
	Q.rear=(Q.rear+1)%MaxSize;
	return true;
}
//\u51FA\u961F
bool DeQueue(SqQueue &amp;Q,ElemType &amp;x)
{
	if(Q.rear==Q.front)
		return false;
	x=Q.data[Q.front];//\u5148\u8FDB\u5148\u51FA
	Q.front=(Q.front+1)%MaxSize;
	return true;
}
//\u300A\u738B\u9053C\u7763\u5B66\u8425\u300B\u8BFE\u7A0B
//\u738B\u9053\u6570\u636E\u7ED3\u6784 3.2 \u5FAA\u73AF\u961F\u5217
int main()
{
	SqQueue Q;
	bool ret;//\u5B58\u50A8\u8FD4\u56DE\u503C
	ElemType element;//\u5B58\u50A8\u51FA\u961F\u5143\u7D20
	InitQueue(Q);
	ret=isEmpty(Q);
	if(ret)
	{
		printf(&quot;\u961F\u5217\u4E3A\u7A7A\\n&quot;);
	}else{
		printf(&quot;\u961F\u5217\u4E0D\u4E3A\u7A7A\\n&quot;);
	}
	EnQueue(Q,3);
	EnQueue(Q,4);
	EnQueue(Q,5);
	ret=EnQueue(Q,6);
	ret=EnQueue(Q,7);
	if(ret)
	{
		printf(&quot;\u5165\u961F\u6210\u529F\\n&quot;);
	}else{
		printf(&quot;\u5165\u961F\u5931\u8D25\\n&quot;);
	}
	ret=DeQueue(Q,element);
	if(ret)
	{
		printf(&quot;\u51FA\u961F\u6210\u529F,\u5143\u7D20\u503C\u4E3A %d\\n&quot;,element);
	}else{
		printf(&quot;\u51FA\u961F\u5931\u8D25\\n&quot;);
	}
	ret=DeQueue(Q,element);
	if(ret)
	{
		printf(&quot;\u51FA\u961F\u6210\u529F,\u5143\u7D20\u503C\u4E3A %d\\n&quot;,element);
	}else{
		printf(&quot;\u51FA\u961F\u5931\u8D25\\n&quot;);
	}
	ret=EnQueue(Q,8);
	if(ret)
	{
		printf(&quot;\u5165\u961F\u6210\u529F\\n&quot;);
	}else{
		printf(&quot;\u5165\u961F\u5931\u8D25\\n&quot;);
	}
	system(&quot;pause&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br></div></div><h3 id="_3-2-3-\u961F\u5217\u7684\u94FE\u5F0F\u5B58\u50A8" tabindex="-1"><a class="header-anchor" href="#_3-2-3-\u961F\u5217\u7684\u94FE\u5F0F\u5B58\u50A8" aria-hidden="true">#</a> 3.2.3 \u961F\u5217\u7684\u94FE\u5F0F\u5B58\u50A8</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

typedef int ElemType;

typedef struct LinkNode{
	ElemType data;
	struct LinkNode *next;
}LinkNode;

typedef struct{
	LinkNode *front,*rear;//\u94FE\u8868\u5934 \u94FE\u8868\u5C3E
}LinkQueue;//\u5148\u8FDB\u5148\u51FA

void InitQueue(LinkQueue &amp;Q)
{
	Q.front=Q.rear=(LinkNode*)malloc(sizeof(LinkNode));//\u5934\u548C\u5C3E\u6307\u5411\u540C\u4E00\u4E2A\u7ED3\u70B9
	Q.front-&gt;next=NULL;
}

bool IsEmpty(LinkQueue Q)
{
	if(Q.front==Q.rear)
		return true;
	else
		return false;
}
//\u5165\u961F\uFF0C\u5C3E\u90E8\u63D2\u5165\u6CD5
void EnQueue(LinkQueue &amp;Q,ElemType x)
{
	LinkNode *s=(LinkNode *)malloc(sizeof(LinkNode));
	s-&gt;data=x;s-&gt;next=NULL;
	Q.rear-&gt;next=s;//rear\u59CB\u7EC8\u6307\u5411\u5C3E\u90E8
	Q.rear=s;
}
//\u51FA\u961F  \u5934\u90E8\u5220\u9664\u6CD5
bool DeQueue(LinkQueue &amp;Q,ElemType &amp;x)
{
	if(Q.front==Q.rear) return false;//\u961F\u5217\u4E3A\u7A7A
	LinkNode *p=Q.front-&gt;next;//\u5934\u7ED3\u70B9\u4EC0\u4E48\u90FD\u6CA1\u5B58\uFF0C\u6240\u4EE5\u5934\u7ED3\u70B9\u7684\u4E0B\u4E00\u4E2A\u8282\u70B9\u624D\u6709\u6570\u636E
	x=p-&gt;data;
	Q.front-&gt;next=p-&gt;next;//\u65AD\u94FE
	if(Q.rear==p)//\u5220\u9664\u7684\u662F\u6700\u540E\u4E00\u4E2A\u5143\u7D20
		Q.rear=Q.front;//\u961F\u5217\u7F6E\u4E3A\u7A7A
	free(p);
	return true;
}
//\u300A\u738B\u9053C\u7763\u5B66\u8425\u300B\u8BFE\u7A0B
//\u738B\u9053\u8003\u7814\u6570\u636E\u7ED3\u6784 3.2.3 \u961F\u5217\u7684\u94FE\u5F0F\u5B58\u50A8
//\u5934\u90E8\u5220\u9664\u6CD5\uFF0C\u5C3E\u90E8\u63D2\u5165\u6CD5
int main()
{
	LinkQueue Q;
	bool ret;
	ElemType element;//\u5B58\u50A8\u51FA\u961F\u5143\u7D20
	InitQueue(Q);
	EnQueue(Q,3);
	EnQueue(Q,4);
	EnQueue(Q,5);
	EnQueue(Q,6);
	EnQueue(Q,7);
	ret=DeQueue(Q,element);
	if(ret)
	{
		printf(&quot;\u51FA\u961F\u6210\u529F,\u5143\u7D20\u503C\u4E3A %d\\n&quot;,element);
	}else{
		printf(&quot;\u51FA\u961F\u5931\u8D25\\n&quot;);
	}
	system(&quot;pause&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br></div></div><h3 id="_3-3-3-\u6590\u6CE2\u90A3\u5951\u6570\u5217" tabindex="-1"><a class="header-anchor" href="#_3-3-3-\u6590\u6CE2\u90A3\u5951\u6570\u5217" aria-hidden="true">#</a> 3.3.3 \u6590\u6CE2\u90A3\u5951\u6570\u5217</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
//Fib\u662F\u9012\u5F52\u51FD\u6570
int Fib(int n)
{
	if(n==0)
		return 0;
	else if(n==1)
		return 1;
	else
		return Fib(n-1)+Fib(n-2);
}
//\u738B\u9053\u6570\u636E\u7ED3\u6784 \u6590\u6CE2\u90A3\u5951\u6570\u5217
//\u9012\u5F52  \u51FD\u6570\u8C03\u7528\u81EA\u8EAB
//0  1  1  2  3   5 
//f(n)=f(n-1)+f(n-2)
//\u8003\u7814\u4E0D\u662F\u5F88\u91CD\u8981\uFF0C\u4E86\u89E3\u5373\u53EF

int main()
{
	int num;
	while(scanf(&quot;%d&quot;,&amp;num)!=EOF)
	{
		printf(&quot;Fib(%d) = %d\\n&quot;,num,Fib(num));
	}
	system(&quot;pause&quot;);
}
//\u9898\u76EE  n\u4E2A\u53F0\u9636\uFF0C\u6BCF\u6B21\u53EA\u80FD\u4E0A1\u4E2A\u53F0\u9636\uFF0C\u6216\u80052\u4E2A\u53F0\u9636\uFF0Cn\u4E2A\u53F0\u9636\uFF0C\u6709\u591A\u5C11\u79CD\u8D70\u6CD5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div>`,10);function r(p,l){return e}var u=n(a,[["render",r],["__file","chapter3.html.vue"]]);export{u as default};
