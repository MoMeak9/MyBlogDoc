import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.3dedad24.js";const a={},e=s(`<h1 id="c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt08-\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt08-\u6392\u5E8F" aria-hidden="true">#</a> C\u8BED\u8A00\u8BAD\u7EC3\u8425Chaptrt08 \u6392\u5E8F</h1><h3 id="_8-2-\u63D2\u5165\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#_8-2-\u63D2\u5165\u6392\u5E8F" aria-hidden="true">#</a> 8.2 \u63D2\u5165\u6392\u5E8F</h3><ol><li><strong>\u76F4\u63A5\u63D2\u5165\u6392\u5E8F</strong></li></ol><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>//\u63D2\u5165\u6392\u5E8F\uFF0C\u4ECE\u5C0F\u5230\u5927\u6392\u5E8F\uFF0C\u5347\u5E8F \u6709\u54E8\u5175\u7684
void InsertSort(ElemType A[],int n)
{
	int i,j;
	//24 66 94  2 15 74 28 51 22 18  2
	for(i=2;i&lt;=n;i++)//\u7B2C\u96F6\u4E2A\u5143\u7D20\u662F\u54E8\u5175\uFF0C\u4ECE\u7B2C\u4E8C\u4E2A\u5143\u7D20\u5F00\u59CB\u62FF\uFF0C\u5F80\u524D\u9762\u63D2\u5165
	{
		if(A[i]&lt;A[i-1])
		{
			A[0]=A[i];//\u653E\u5230\u6682\u5B58\u4F4D\u7F6E\uFF0CA[0]\u5373\u662F\u6682\u5B58\uFF0C\u4E5F\u662F\u54E8\u5175
			for(j=i-1;A[0]&lt;A[j];--j)//\u79FB\u52A8\u5143\u7D20\uFF0C\u5185\u5C42\u5FAA\u73AF\u63A7\u5236\u6709\u5E8F\u5E8F\u5217\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u548C\u8981\u63D2\u5165\u7684\u5143\u7D20\u6BD4\u8F83
				A[j+1]=A[j];
			A[j+1]=A[0];//\u628A\u6682\u5B58\u5143\u7D20\u63D2\u5165\u5230\u5BF9\u5E94\u4F4D\u7F6E
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><ol start="2"><li><strong>\u6298\u534A\u63D2\u5165\u6392\u5E8F</strong></li></ol><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>//\u6298\u534A\u67E5\u627E \u63D2\u5165\u6392\u5E8F\uFF0C\u8003\u7684\u5F88\u5C11
void MidInsertSort(ElemType A[],int n)
{
	int i,j,low,high,mid;
	for(i=2;i&lt;=n;i++)
	{
		A[0]=A[i];
		low=1;high=i-1;//low\u6709\u5E8F\u5E8F\u5217\u7684\u5F00\u59CB\uFF0Chigh\u6709\u5E8F\u5E8F\u5217\u7684\u6700\u540E
		while(low&lt;=high)//\u5148\u901A\u8FC7\u4E8C\u5206\u67E5\u627E\u627E\u5230\u5F85\u63D2\u5165\u4F4D\u7F6E
		{
			mid=(low+high)/2;
			if(A[mid]&gt;A[0])
				high=mid-1;
			else
				low=mid+1;
		}
		for(j=i-1;j&gt;=high+1;--j)
			A[j+1]=A[j];
		A[high+1]=A[0];
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><ol start="3"><li><strong>\u5E0C\u5C14\u6392\u5E8F</strong></li></ol><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>//\u5E0C\u5C14\u6392\u5E8F  
//\u591A\u8F6E\u63D2\u5165\u6392\u5E8F\uFF0C\u8003\u5927\u9898\u7684\u6982\u7387\u7EA6\u7B49\u4E8E\u96F6\uFF0C\u56E0\u4E3A\u7F16\u5199\u8D77\u6765\u590D\u6742\uFF0C\u540C\u65F6\u6548\u7387\u5E76\u4E0D\u5982\u5FEB\u6392\uFF0C\u5806\u6392
//\u5C0F\u9898\u4E3B\u8981\u8003\u6B65\u957F\u7684\u53D8\u5316\u662F\u5982\u4F55\u7684
void ShellSort(ElemType A[],int n)
{
	int dk,i,j;
	// 73 29 74 51 29 90 37 48 72 54 83
	for(dk=n/2;dk&gt;=1;dk=dk/2)//\u6B65\u957F\u53D8\u5316\uFF0C\u6B65\u957F\u53D8\u5316
	{
		for(i=dk+1;i&lt;=n;++i)//\u4EE5dk\u4E3A\u6B65\u957F\u8FDB\u884C\u63D2\u5165\u6392\u5E8F
		{
			if(A[i]&lt;A[i-dk])
			{
				A[0]=A[i];
				for(j=i-dk;j&gt;0&amp;&amp;A[0]&lt;A[j];j=j-dk)
					A[j+dk]=A[j];
				A[j+dk]=A[0];
			}
		}
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="_8-3-\u4EA4\u6362\u6392\u5E8F-\u5192\u6CE1\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#_8-3-\u4EA4\u6362\u6392\u5E8F-\u5192\u6CE1\u6392\u5E8F" aria-hidden="true">#</a> 8.3 \u4EA4\u6362\u6392\u5E8F\uFF08\u5192\u6CE1\u6392\u5E8F\uFF09</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>void BubbleSort(ElemType A[],int n)
{
	int i,j;
	bool flag;
	for(i=0;i&lt;n-1;i++)//i\u6700\u591A\u8BBF\u95EE\u52308
	{
		flag=false;
		for(j=n-1;j&gt;i;j--)//\u628A\u6700\u5C0F\u503C\u5C31\u653E\u5728\u6700\u524D\u9762
		{
			if(A[j-1]&gt;A[j])
			{
				swap(A[j-1],A[j]);
				flag=true;
			}
		}
		if(false==flag)
			return;
	}
}

void swap(ElemType &amp;a,ElemType &amp;b)
{
	ElemType tmp;
	tmp=a;
	a=b;
	b=tmp;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="_8-4-\u9009\u62E9\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#_8-4-\u9009\u62E9\u6392\u5E8F" aria-hidden="true">#</a> 8.4 \u9009\u62E9\u6392\u5E8F</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>void SelectSort(ElemType A[],int n)
{
	int i,j,min;//min\u8BB0\u5F55\u6700\u5C0F\u7684\u5143\u7D20\u7684\u4E0B\u6807
	for(i=0;i&lt;n-1;i++)//\u6700\u591A\u53EF\u4EE5\u4E3A8
	{
		min=i;
		for(j=i+1;j&lt;n;j++)//j\u6700\u591A\u53EF\u4EE5\u4E3A9
		{
			if(A[j]&lt;A[min])
				min=j;
		}
		if(min!=i)
		{
			swap(A[i],A[min]);
		}
	}
}

void swap(ElemType &amp;a,ElemType &amp;b)
{
	ElemType tmp;
	tmp=a;
	a=b;
	b=tmp;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h4 id="\u5806\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u5806\u6392\u5E8F" aria-hidden="true">#</a> \u5806\u6392\u5E8F</h4><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>//\u8C03\u6574\u67D0\u4E2A\u7236\u4EB2\u8282\u70B9
void AdjustDown(ElemType A[],int k,int len)
{
	int i;
	A[0]=A[k]; // \u4F5C\u4E3A\u4E34\u65F6\u53D8\u91CF
	for(i=2*k;i&lt;=len;i*=2)
	{
		if(i&lt;len&amp;&amp;A[i]&lt;A[i+1])//\u5DE6\u5B50\u8282\u70B9\u4E0E\u53F3\u5B50\u8282\u70B9\u6BD4\u8F83\u5927\u5C0F
			i++;
		if(A[0]&gt;=A[i])
			break;
		else{
			A[k]=A[i];
			k=i;
		}
	}
	A[k]=A[0];
}
//\u7528\u6570\u7EC4\u53BB\u8868\u793A\u6811   \u5C42\u6B21\u5EFA\u6811
void BuildMaxHeap(ElemType A[],int len)
{
	for(int i=len/2;i&gt;0;i--)
	{
		AdjustDown(A,i,len);
	}
}
void HeapSort(ElemType A[],int len)
{
	int i;
	BuildMaxHeap(A,len);//\u5EFA\u7ACB\u5927\u9876\u5806
	for(i=len;i&gt;1;i--)
	{
		swap(A[i],A[1]);
		AdjustDown(A,1,i-1);
	}
}


//\u8C03\u6574\u5B50\u6811
void AdjustDown1(ElemType A[], int k, int len)
{
	int dad = k;
	int son = 2 * dad + 1; //\u5DE6\u5B69\u5B50\u4E0B\u6807
	while (son&lt;=len)
	{
		if (son + 1 &lt;= len &amp;&amp; A[son] &lt; A[son + 1])//\u770B\u4E0B\u6709\u6CA1\u6709\u53F3\u5B69\u5B50\uFF0C\u6BD4\u8F83\u5DE6\u53F3\u5B69\u5B50\u9009\u5927\u7684
		{
			son++;
		}
		if (A[son] &gt; A[dad])//\u6BD4\u8F83\u5B69\u5B50\u548C\u7236\u4EB2
		{
			swap(A[son], A[dad]);
			dad = son;
			son = 2 * dad + 1;
		}
		else {
			break;
		}
	}
}
void HeapSort1(ElemType A[], int len)
{
	int i;
	//\u5EFA\u7ACB\u5927\u9876\u5806
	for (i = len / 2; i &gt;= 0; i--)
	{
		AdjustDown1(A, i, len);
	}
	swap(A[0], A[len]);//\u4EA4\u6362\u9876\u90E8\u548C\u6570\u7EC4\u6700\u540E\u4E00\u4E2A\u5143\u7D20
	for (i = len - 1; i &gt; 0; i--)
	{
		AdjustDown1(A, 0, i);//\u5269\u4E0B\u5143\u7D20\u8C03\u6574\u4E3A\u5927\u6839\u5806
		swap(A[0], A[i]);
	}
}

//\u300A\u738B\u9053C\u7763\u5B66\u8425\u300B\u8BFE\u7A0B
//\u9009\u62E9\u6392\u5E8F\u4E0E\u5806\u6392\u5E8F
int main()
{
	SSTable ST;
	ElemType A[10]={ 64, 94, 95, 79, 69, 84, 18, 22, 12 ,99};
	ST_Init(ST,10);//\u521D\u59CB\u5316
	memcpy(ST.elem,A,sizeof(A));
	ST_print(ST);
	//SelectSort(ST.elem,10);
	HeapSort(ST.elem, 9);//\u738B\u9053\u4E66\u96F6\u53F7\u5143\u7D20\u4E0D\u53C2\u4E0E\u6392\u5E8F
	//HeapSort1(ST.elem,9);//\u6240\u6709\u5143\u7D20\u53C2\u4E0E\u6392\u5E8F
	ST_print(ST);
	system(&quot;pause&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br></div></div><h3 id="_8-5-\u5F52\u5E76\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#_8-5-\u5F52\u5E76\u6392\u5E8F" aria-hidden="true">#</a> 8.5 \u5F52\u5E76\u6392\u5E8F</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>typedef int ElemType;
//49,38,65,97,76,13,27
void Merge(ElemType A[],int low,int mid,int high)
{
	ElemType B[N];//\u4E3A\u4E86\u964D\u4F4E\u64CD\u4F5C\u6B21\u6570
	int i,j,k;
	for(k=low;k&lt;=high;k++)//\u590D\u5236\u5143\u7D20\u5230B\u4E2D
		B[k]=A[k];
	for(i=low,j=mid+1,k=i;i&lt;=mid&amp;&amp;j&lt;=high;k++)//\u5408\u5E76\u4E24\u4E2A\u6709\u5E8F\u6570\u7EC4
	{
		if(B[i]&lt;=B[j])
			A[k]=B[i++];
		else
			A[k]=B[j++];
	}
	while(i&lt;=mid)//\u5982\u679C\u6709\u5269\u4F59\u5143\u7D20\uFF0C\u63A5\u7740\u653E\u5165\u5373\u53EF
		A[k++]=B[i++];
	while(j&lt;=high)
		A[k++]=B[j++];
}
//\u5F52\u5E76\u6392\u5E8F\u4E0D\u9650\u5236\u662F\u4E24\u4E24\u5F52\u5E76\uFF0C\u8FD8\u662F\u591A\u4E2A\u5F52\u5E76
// 1 3 5 7 9
// 2 4
// 1 2 3 4 5 7 9  \u4E3B\u8981\u7684\u4EE3\u7801\u903B\u8F91
void MergeSort(ElemType A[],int low,int high)//\u9012\u5F52\u5206\u5272
{
	if(low&lt;high)
	{
		int mid=(low+high)/2;
		MergeSort(A,low,mid);
		MergeSort(A,mid+1,high);
		Merge(A,low,mid,high);
	}
}

int main()
{
	int A[7]={49,38,65,97,76,13,27};//\u6570\u7EC4\uFF0C7\u4E2A\u5143\u7D20
	MergeSort(A,0,6);
	print(A);
	system(&quot;pause&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><h3 id="\u5FEB\u901F\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u901F\u6392\u5E8F" aria-hidden="true">#</a> \u5FEB\u901F\u6392\u5E8F</h3><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h3>`,18);function l(r,p){return e}var t=n(a,[["render",l],["__file","chapter8.html.vue"]]);export{t as default};
