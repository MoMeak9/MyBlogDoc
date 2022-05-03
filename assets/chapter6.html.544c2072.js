import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.3dedad24.js";const a={},e=s(`<h1 id="c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt06-\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#c\u8BED\u8A00\u8BAD\u7EC3\u8425chaptrt06-\u51FD\u6570" aria-hidden="true">#</a> C\u8BED\u8A00\u8BAD\u7EC3\u8425Chaptrt06 \u51FD\u6570</h1><h3 id="_6-3-\u56FE\u7684\u904D\u5386" tabindex="-1"><a class="header-anchor" href="#_6-3-\u56FE\u7684\u904D\u5386" aria-hidden="true">#</a> 6.3 \u56FE\u7684\u904D\u5386</h3><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;malloc.h&gt;
#include &lt;string.h&gt;

#define MAX 100
#define isLetter(a)  ((((a)&gt;=&#39;a&#39;)&amp;&amp;((a)&lt;=&#39;z&#39;)) || (((a)&gt;=&#39;A&#39;)&amp;&amp;((a)&lt;=&#39;Z&#39;)))
#define LENGTH(a)  (sizeof(a)/sizeof(a[0]))

// \u90BB\u63A5\u8868\u4E2D\u8868\u5BF9\u5E94\u7684\u94FE\u8868\u7684\u9876\u70B9
typedef struct _ENode
{
    int ivex;                   // \u8BE5\u8FB9\u6240\u6307\u5411\u7684\u9876\u70B9\u7684\u4F4D\u7F6E,\u662F\u6570\u7EC4\u7684\u4E0B\u6807
    struct _ENode *next_edge;   // \u6307\u5411\u4E0B\u4E00\u6761\u5F27\u7684\u6307\u9488
}ENode, *PENode;

// \u90BB\u63A5\u8868\u4E2D\u8868\u7684\u9876\u70B9
typedef struct _VNode
{
    char data;              // \u9876\u70B9\u4FE1\u606F
    ENode *first_edge;      // \u6307\u5411\u7B2C\u4E00\u6761\u4F9D\u9644\u8BE5\u9876\u70B9\u7684\u5F27
}VNode;

// \u90BB\u63A5\u8868
typedef struct _LGraph
{
    int vexnum;             // \u56FE\u7684\u9876\u70B9\u7684\u6570\u76EE
    int edgnum;             // \u56FE\u7684\u8FB9\u7684\u6570\u76EE
    VNode vexs[MAX];
}LGraph;

/*
 * \u8FD4\u56DEch\u5728matrix\u77E9\u9635\u4E2D\u7684\u4F4D\u7F6E
 */
static int get_position(LGraph g, char ch)
{
    int i;
    for(i=0; i&lt;g.vexnum; i++)//\u53BB\u9876\u70B9\u7ED3\u6784\u4F53\u6570\u7EC4\u4E2D\u904D\u5386\u6BCF\u4E2A\u9876\u70B9
        if(g.vexs[i].data==ch)
            return i;//\u8FD4\u56DE\u7684\u662F\u5BF9\u5E94\u9876\u70B9\u7684\u4E0B\u6807
    return -1;
}

/*
 * \u8BFB\u53D6\u4E00\u4E2A\u8F93\u5165\u5B57\u7B26
 */
static char read_char()
{
    char ch;

    do {
        ch = getchar();
    } while(!isLetter(ch));

    return ch;
}

/*
 * \u5C06node\u94FE\u63A5\u5230list\u7684\u672B\u5C3E
 */
static void link_last(ENode *list, ENode *node)
{
    ENode *p = list;

    while(p-&gt;next_edge)
        p = p-&gt;next_edge;
    p-&gt;next_edge = node;
}

/*
 * \u521B\u5EFA\u90BB\u63A5\u8868\u5BF9\u5E94\u7684\u56FE(\u81EA\u5DF1\u8F93\u5165)
 */
LGraph* create_lgraph()
{
    char c1, c2;
    int v, e;
    int i, p1, p2;
    ENode *node1, *node2;
    LGraph* pG;

    // \u8F93\u5165&quot;\u9876\u70B9\u6570&quot;\u548C&quot;\u8FB9\u6570&quot;
    printf(&quot;input vertex number: &quot;);
    scanf(&quot;%d&quot;, &amp;v);
    printf(&quot;input edge number: &quot;);
    scanf(&quot;%d&quot;, &amp;e);
    if ( v &lt; 1 || e &lt; 1 || (e &gt; (v * (v-1))))
    {
        printf(&quot;input error: invalid parameters!\\n&quot;);
        return NULL;
    }
 
    if ((pG=(LGraph*)malloc(sizeof(LGraph))) == NULL )
        return NULL;
    memset(pG, 0, sizeof(LGraph));

    // \u521D\u59CB\u5316&quot;\u9876\u70B9\u6570&quot;\u548C&quot;\u8FB9\u6570&quot;
    pG-&gt;vexnum = v;
    pG-&gt;edgnum = e;
    // \u521D\u59CB\u5316&quot;\u90BB\u63A5\u8868&quot;\u7684\u9876\u70B9
    for(i=0; i&lt;pG-&gt;vexnum; i++)
    {
        printf(&quot;vertex(%d): &quot;, i);
        pG-&gt;vexs[i].data = read_char();
        pG-&gt;vexs[i].first_edge = NULL;
    }

    // \u521D\u59CB\u5316&quot;\u90BB\u63A5\u8868&quot;\u7684\u8FB9
    for(i=0; i&lt;pG-&gt;edgnum; i++)
    {
        // \u8BFB\u53D6\u8FB9\u7684\u8D77\u59CB\u9876\u70B9\u548C\u7ED3\u675F\u9876\u70B9
        printf(&quot;edge(%d): &quot;, i);
        c1 = read_char();
        c2 = read_char();

        p1 = get_position(*pG, c1);
        p2 = get_position(*pG, c2);

        // \u521D\u59CB\u5316node1
        node1 = (ENode*)calloc(1,sizeof(ENode));
        node1-&gt;ivex = p2;
        // \u5C06node1\u94FE\u63A5\u5230&quot;p1\u6240\u5728\u94FE\u8868\u7684\u672B\u5C3E&quot;
        if(pG-&gt;vexs[p1].first_edge == NULL)
          pG-&gt;vexs[p1].first_edge = node1;
        else
            link_last(pG-&gt;vexs[p1].first_edge, node1);
        // \u521D\u59CB\u5316node2
        node2 = (ENode*)calloc(1,sizeof(ENode));
        node2-&gt;ivex = p1;
        // \u5C06node2\u94FE\u63A5\u5230&quot;p2\u6240\u5728\u94FE\u8868\u7684\u672B\u5C3E&quot;
        if(pG-&gt;vexs[p2].first_edge == NULL)
          pG-&gt;vexs[p2].first_edge = node2;
        else
            link_last(pG-&gt;vexs[p2].first_edge, node2);
    }

    return pG;
}

/*
 * \u521B\u5EFA\u90BB\u63A5\u8868\u5BF9\u5E94\u7684\u56FE(\u7528\u5DF2\u63D0\u4F9B\u7684\u6570\u636E)\uFF0C\u65E0\u5411\u56FE
 */
LGraph* create_example_lgraph()
{
    char c1, c2;
    char vexs[] = {&#39;A&#39;, &#39;B&#39;, &#39;C&#39;, &#39;D&#39;, &#39;E&#39;, &#39;F&#39;, &#39;G&#39;};
    char edges[][2] = {
        {&#39;A&#39;, &#39;C&#39;}, 
        {&#39;A&#39;, &#39;D&#39;}, 
        {&#39;A&#39;, &#39;F&#39;}, 
        {&#39;B&#39;, &#39;C&#39;}, 
        {&#39;C&#39;, &#39;D&#39;}, 
        {&#39;E&#39;, &#39;G&#39;}, 
        {&#39;F&#39;, &#39;G&#39;}}; 
    int vlen = LENGTH(vexs);
    int elen = LENGTH(edges);
    //\u4E0A\u9762\u7C7B\u4F3C\u4E00\u4E2A\u90BB\u63A5\u77E9\u9635\u5B58\u50A8
    int i, p1, p2;
    ENode *node1, *node2;
    LGraph* pG;//pG\u8868\u793A\u56FE


    if ((pG=(LGraph*)malloc(sizeof(LGraph))) == NULL )
        return NULL;
    memset(pG, 0, sizeof(LGraph));//\u5C31\u662F\u628A\u7533\u8BF7\u7684\u7A7A\u95F4\u5185\u521D\u59CB\u5316\u4E3A\u96F6

    // \u521D\u59CB\u5316&quot;\u9876\u70B9\u6570&quot;\u548C&quot;\u8FB9\u6570&quot;
    pG-&gt;vexnum = vlen;
    pG-&gt;edgnum = elen;
    // \u521D\u59CB\u5316&quot;\u90BB\u63A5\u8868&quot;\u7684\u9876\u70B9
    for(i=0; i&lt;pG-&gt;vexnum; i++)
    {
        pG-&gt;vexs[i].data = vexs[i];
        pG-&gt;vexs[i].first_edge = NULL;
    }

    // \u521D\u59CB\u5316&quot;\u90BB\u63A5\u8868&quot;\u7684\u8FB9
    for(i=0; i&lt;pG-&gt;edgnum; i++)
    {
        // \u8BFB\u53D6\u8FB9\u7684\u8D77\u59CB\u9876\u70B9\u548C\u7ED3\u675F\u9876\u70B9
        c1 = edges[i][0];
        c2 = edges[i][1];

        p1 = get_position(*pG, c1);//p1\u5BF9\u5E94\u8D77\u59CB\u9876\u70B9\u4E0B\u6807\u4F4D\u7F6E
        p2 = get_position(*pG, c2);//p1\u5BF9\u5E94\u7ED3\u675F\u9876\u70B9\u4E0B\u6807\u4F4D\u7F6E

        // \u521D\u59CB\u5316node1
        node1 = (ENode*)calloc(1,sizeof(ENode));
        node1-&gt;ivex = p2;
        // \u5C06node1\u94FE\u63A5\u5230&quot;p1\u6240\u5728\u94FE\u8868\u7684\u672B\u5C3E&quot;
        if(pG-&gt;vexs[p1].first_edge == NULL)
            pG-&gt;vexs[p1].first_edge = node1;
        else
            link_last(pG-&gt;vexs[p1].first_edge, node1);
        // \u521D\u59CB\u5316node2
        node2 = (ENode*)calloc(1,sizeof(ENode));
        node2-&gt;ivex = p1;
        // \u5C06node2\u94FE\u63A5\u5230&quot;p2\u6240\u5728\u94FE\u8868\u7684\u672B\u5C3E&quot;
        if(pG-&gt;vexs[p2].first_edge == NULL)
            pG-&gt;vexs[p2].first_edge = node2;
        else
            link_last(pG-&gt;vexs[p2].first_edge, node2);
    }

    return pG;
}

/*
 * \u6DF1\u5EA6\u4F18\u5148\u641C\u7D22\u904D\u5386\u56FE\u7684\u9012\u5F52\u5B9E\u73B0
 */
static void DFS(LGraph G, int i, int *visited)
{
    ENode *node;

    visited[i] = 1;//\u8981\u8BBF\u95EE\u5F53\u524D\u7ED3\u70B9\u4E86\uFF0C\u6240\u4EE5\u6253\u5370
    printf(&quot;%c &quot;, G.vexs[i].data);
    node = G.vexs[i].first_edge;//\u62FF\u5F53\u524D\u9876\u70B9\u7684\u540E\u9762\u4E00\u4E2A\u9876\u70B9
    while (node != NULL)
    {
        if (!visited[node-&gt;ivex])//\u53EA\u8981\u5BF9\u5E94\u9876\u70B9\u6CA1\u6709\u8BBF\u95EE\u8FC7\uFF0C\u6DF1\u5165\u5230\u4E0B\u4E00\u4E2A\u9876\u70B9\u8BBF\u95EE
            DFS(G, node-&gt;ivex, visited);
        node = node-&gt;next_edge;//\u67D0\u4E2A\u9876\u70B9\u7684\u4E0B\u4E00\u6761\u8FB9\uFF0C\u4F8B\u5982B\u7ED3\u70B9\u7684\u4E0B\u4E00\u6761\u8FB9
    }
}

/*
 * \u6DF1\u5EA6\u4F18\u5148\u641C\u7D22\u904D\u5386\u56FE
 */
void DFSTraverse(LGraph G)
{
    int i;
    int visited[MAX];       // \u9876\u70B9\u8BBF\u95EE\u6807\u8BB0

    // \u521D\u59CB\u5316\u6240\u6709\u9876\u70B9\u90FD\u6CA1\u6709\u88AB\u8BBF\u95EE
    for (i = 0; i &lt; G.vexnum; i++)
        visited[i] = 0;

    printf(&quot;DFS: &quot;);
	//\u4ECEA\u5F00\u59CB\u6DF1\u5EA6\u4F18\u5148\u904D\u5386
    for (i = 0; i &lt; G.vexnum; i++)
    {
        if (!visited[i])
            DFS(G, i, visited);
    }
    printf(&quot;\\n&quot;);
}

/*
 * \u5E7F\u5EA6\u4F18\u5148\u641C\u7D22\uFF08\u7C7B\u4F3C\u4E8E\u6811\u7684\u5C42\u6B21\u904D\u5386\uFF09
 */
void BFS(LGraph G)
{
    int head = 0;
    int rear = 0;
    int queue[MAX];     // \u8F85\u7EC4\u961F\u5217
    int visited[MAX];   // \u9876\u70B9\u8BBF\u95EE\u6807\u8BB0
    int i, j, k;
    ENode *node;

	//\u6BCF\u4E2A\u9876\u70B9\u672A\u88AB\u8BBF\u95EE
    for (i = 0; i &lt; G.vexnum; i++)
        visited[i] = 0;
	//\u4ECE\u96F6\u53F7\u9876\u70B9\u5F00\u59CB\u904D\u5386
    printf(&quot;BFS: &quot;);
    for (i = 0; i &lt; G.vexnum; i++)//\u5BF9\u6BCF\u4E2A\u8FDE\u540C\u5206\u91CF\u5747\u8C03\u7528\u4E00\u6B21BFS
    {
        if (!visited[i])//\u5982\u679C\u6CA1\u8BBF\u95EE\u8FC7\uFF0C\u5C31\u6253\u5370\uFF0C\u540C\u65F6\u5165\u961F,\u6700\u521D\u662FA
        {
            visited[i] = 1;//\u6807\u8BB0\u5DF2\u7ECF\u8BBF\u95EE\u8FC7
            printf(&quot;%c &quot;, G.vexs[i].data);
            queue[rear++] = i;  // \u5165\u961F\u5217
        }
        while (head != rear) //\u7B2C\u4E00\u4E2A\u8FDB\u6765\u7684\u662FA\uFF0C\u904D\u5386A\u7684\u6BCF\u4E00\u6761\u8FB9
        {
            j = queue[head++];  // \u51FA\u961F\u5217
            node = G.vexs[j].first_edge;
            while (node != NULL)
            {
                k = node-&gt;ivex;
                if (!visited[k])
                {
                    visited[k] = 1;
                    printf(&quot;%c &quot;, G.vexs[k].data);
                    queue[rear++] = k;//\u7C7B\u4F3C\u4E8E\u6811\u7684\u5C42\u6B21\u904D\u5386\uFF0C\u904D\u5386\u5230\u7684\u540C\u65F6\u5165\u961F
                }
                node = node-&gt;next_edge;
            }
        }
    }
    printf(&quot;\\n&quot;);
}

/*
 * \u6253\u5370\u90BB\u63A5\u8868\u56FE
 */
void print_lgraph(LGraph G)
{
    int i;
    ENode *node;

    printf(&quot;List Graph:\\n&quot;);
    for (i = 0; i &lt; G.vexnum; i++)//\u904D\u5386\u6240\u6709\u7684\u9876\u70B9
    {
        printf(&quot;%d(%c): &quot;, i, G.vexs[i].data);
        node = G.vexs[i].first_edge;
        while (node != NULL)//\u628A\u6BCF\u4E2A\u9876\u70B9\u5468\u56F4\u7684\u7ED3\u70B9\u90FD\u8F93\u51FA\u4E00\u4E0B
        {
            printf(&quot;%d(%c) &quot;, node-&gt;ivex, G.vexs[node-&gt;ivex].data);
            node = node-&gt;next_edge;
        }
        printf(&quot;\\n&quot;);
    }
}
/*
 * \u521B\u5EFA\u90BB\u63A5\u8868\u5BF9\u5E94\u7684\u56FE(\u6709\u5411\u56FE)
 */
LGraph* create_example_lgraph_directed()
{
    char c1, c2;
    char vexs[] = {&#39;A&#39;, &#39;B&#39;, &#39;C&#39;, &#39;D&#39;, &#39;E&#39;, &#39;F&#39;, &#39;G&#39;};
    char edges[][2] = {
        {&#39;A&#39;, &#39;B&#39;}, 
        {&#39;B&#39;, &#39;C&#39;}, 
        {&#39;B&#39;, &#39;E&#39;}, 
        {&#39;B&#39;, &#39;F&#39;}, 
        {&#39;C&#39;, &#39;E&#39;}, 
        {&#39;D&#39;, &#39;C&#39;}, 
        {&#39;E&#39;, &#39;B&#39;}, 
        {&#39;E&#39;, &#39;D&#39;}, 
        {&#39;F&#39;, &#39;G&#39;}}; 
    int vlen = LENGTH(vexs);
    int elen = LENGTH(edges);
    int i, p1, p2;
    ENode *node1;
    LGraph* pG;


    if ((pG=(LGraph*)malloc(sizeof(LGraph))) == NULL )
        return NULL;
    memset(pG, 0, sizeof(LGraph));

    // \u521D\u59CB\u5316&quot;\u9876\u70B9\u6570&quot;\u548C&quot;\u8FB9\u6570&quot;
    pG-&gt;vexnum = vlen;
    pG-&gt;edgnum = elen;
    // \u521D\u59CB\u5316&quot;\u90BB\u63A5\u8868&quot;\u7684\u9876\u70B9
    for(i=0; i&lt;pG-&gt;vexnum; i++)
    {
        pG-&gt;vexs[i].data = vexs[i];
        pG-&gt;vexs[i].first_edge = NULL;
    }

    // \u521D\u59CB\u5316&quot;\u90BB\u63A5\u8868&quot;\u7684\u8FB9
    for(i=0; i&lt;pG-&gt;edgnum; i++)
    {
        // \u8BFB\u53D6\u8FB9\u7684\u8D77\u59CB\u9876\u70B9\u548C\u7ED3\u675F\u9876\u70B9
        c1 = edges[i][0];
        c2 = edges[i][1];

        p1 = get_position(*pG, c1);
        p2 = get_position(*pG, c2);
        // \u521D\u59CB\u5316node1
        node1 = (ENode*)calloc(1,sizeof(ENode));
        node1-&gt;ivex = p2;
        // \u5C06node1\u94FE\u63A5\u5230&quot;p1\u6240\u5728\u94FE\u8868\u7684\u672B\u5C3E&quot;
        if(pG-&gt;vexs[p1].first_edge == NULL)
            pG-&gt;vexs[p1].first_edge = node1;
        else
            link_last(pG-&gt;vexs[p1].first_edge, node1);
    }

    return pG;
}
//\u300A\u738B\u9053C\u7763\u5B66\u8425\u300B\u8BFE\u7A0B
//\u56FE\u7684\u521B\u5EFA\uFF0C\u6253\u5370\uFF0C\u5E7F\u5EA6\u4F18\u5148\u904D\u5386\uFF0C\u6DF1\u5EA6\u4F18\u5148\u904D\u5386
//\u8BB2 \u6709\u5411\u56FE
void main()
{
    LGraph* pG;

    // \u65E0\u5411\u56FE\u81EA\u5B9A\u4E49&quot;\u56FE&quot;(\u81EA\u5DF1\u8F93\u5165\u6570\u636E\uFF0C\u8F93\u5165\u7684\u65B9\u6CD5\u53EF\u4EE5\u53C2\u8003create_example_lgraph\u521D\u59CB\u5316\u597D\u7684\u6570\u636E)
    //pG = create_lgraph();
    //// \u65E0\u5411\u56FE\u7684\u521B\u5EFA\uFF0C\u91C7\u7528\u5DF2\u6709\u7684&quot;\u56FE&quot;
    //pG = create_example_lgraph();
	//\u6709\u5411\u56FE\u7684\u521B\u5EFA
	pG = create_example_lgraph_directed();
    // \u6253\u5370\u56FE
    print_lgraph(*pG);
    DFSTraverse(*pG);//\u6DF1\u5EA6\u4F18\u5148\u904D\u5386
	BFS(*pG);//\u5E7F\u5EA6\u4F18\u5148\u904D\u5386
	system(&quot;pause&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br><span class="line-number">285</span><br><span class="line-number">286</span><br><span class="line-number">287</span><br><span class="line-number">288</span><br><span class="line-number">289</span><br><span class="line-number">290</span><br><span class="line-number">291</span><br><span class="line-number">292</span><br><span class="line-number">293</span><br><span class="line-number">294</span><br><span class="line-number">295</span><br><span class="line-number">296</span><br><span class="line-number">297</span><br><span class="line-number">298</span><br><span class="line-number">299</span><br><span class="line-number">300</span><br><span class="line-number">301</span><br><span class="line-number">302</span><br><span class="line-number">303</span><br><span class="line-number">304</span><br><span class="line-number">305</span><br><span class="line-number">306</span><br><span class="line-number">307</span><br><span class="line-number">308</span><br><span class="line-number">309</span><br><span class="line-number">310</span><br><span class="line-number">311</span><br><span class="line-number">312</span><br><span class="line-number">313</span><br><span class="line-number">314</span><br><span class="line-number">315</span><br><span class="line-number">316</span><br><span class="line-number">317</span><br><span class="line-number">318</span><br><span class="line-number">319</span><br><span class="line-number">320</span><br><span class="line-number">321</span><br><span class="line-number">322</span><br><span class="line-number">323</span><br><span class="line-number">324</span><br><span class="line-number">325</span><br><span class="line-number">326</span><br><span class="line-number">327</span><br><span class="line-number">328</span><br><span class="line-number">329</span><br><span class="line-number">330</span><br><span class="line-number">331</span><br><span class="line-number">332</span><br><span class="line-number">333</span><br><span class="line-number">334</span><br><span class="line-number">335</span><br><span class="line-number">336</span><br><span class="line-number">337</span><br><span class="line-number">338</span><br><span class="line-number">339</span><br><span class="line-number">340</span><br><span class="line-number">341</span><br><span class="line-number">342</span><br><span class="line-number">343</span><br><span class="line-number">344</span><br><span class="line-number">345</span><br><span class="line-number">346</span><br><span class="line-number">347</span><br><span class="line-number">348</span><br><span class="line-number">349</span><br><span class="line-number">350</span><br><span class="line-number">351</span><br><span class="line-number">352</span><br><span class="line-number">353</span><br><span class="line-number">354</span><br><span class="line-number">355</span><br><span class="line-number">356</span><br><span class="line-number">357</span><br><span class="line-number">358</span><br><span class="line-number">359</span><br><span class="line-number">360</span><br><span class="line-number">361</span><br><span class="line-number">362</span><br><span class="line-number">363</span><br><span class="line-number">364</span><br><span class="line-number">365</span><br><span class="line-number">366</span><br><span class="line-number">367</span><br><span class="line-number">368</span><br><span class="line-number">369</span><br><span class="line-number">370</span><br><span class="line-number">371</span><br><span class="line-number">372</span><br><span class="line-number">373</span><br><span class="line-number">374</span><br><span class="line-number">375</span><br><span class="line-number">376</span><br><span class="line-number">377</span><br><span class="line-number">378</span><br><span class="line-number">379</span><br><span class="line-number">380</span><br><span class="line-number">381</span><br><span class="line-number">382</span><br><span class="line-number">383</span><br><span class="line-number">384</span><br><span class="line-number">385</span><br><span class="line-number">386</span><br><span class="line-number">387</span><br><span class="line-number">388</span><br><span class="line-number">389</span><br><span class="line-number">390</span><br></div></div>`,3);function r(p,l){return e}var u=n(a,[["render",r],["__file","chapter6.html.vue"]]);export{u as default};
