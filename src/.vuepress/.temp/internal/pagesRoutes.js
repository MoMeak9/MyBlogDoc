import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-79fdd481","/home.html",{"title":"项目主页","icon":"home","type":"home","readingTime":{"minutes":0.23,"words":68},"excerpt":"这是普通主页的案例。你可以在这里放置你的主体内容。 想要使用此布局，你需要在页面 front matter 中设置 home: true。 配置项的相关说明详见 项目主页配置。"},["/home","/home.md"]],
  ["v-8daa1a0e","/",{"title":"博客主页","icon":"home","type":"home","readingTime":{"minutes":0.17,"words":50},"excerpt":"这是一个博客主页。 要使用此布局，你应该在页面前端设置 layout: Blog 和 home: true。 相关配置文档请见 博客主页。"},["/index.html","/README.md"]],
  ["v-0e503981","/slide.html",{"title":"幻灯片页","icon":"slides","type":"slide","readingTime":{"minutes":4.47,"words":1342},"excerpt":"@slidestart 幻灯片演示 一个简单的幻灯片演示与各种小贴士。 \" 作者 Mr.Hope. 请滚动鼠标滚轮进入下一页\" --- 标注幻灯片 👇 -- 标注幻灯片 使用 --- 标注水平幻灯片 在水平幻灯片中使用 -- 分割垂直幻灯片 使用 `` 在幻灯片上添加属性 使用 `` 在前一个 HTML 元素上添加属性 --- Markdown 你可以在幻"},["/slide","/slide.md"]],
  ["v-4c863446","/guide/disable.html",{"title":"组件禁用","icon":"config","type":"article","readingTime":{"minutes":0.25,"words":74},"excerpt":"<p>你可以通过设置页面的 Frontmatter，在页面禁用一些功能。</p>\n","category":["使用指南"],"tag":["禁用"]},["/guide/disable","/guide/disable.md"]],
  ["v-bf720700","/guide/encrypt.html",{"title":"密码加密的文章","icon":"lock","type":"article","readingTime":{"minutes":0.48,"words":144},"excerpt":"密码加密的文章 实际的文章内容。 段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字。 段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字","category":["使用指南"],"tag":["文章加密"],"isEncrypted":true},["/guide/encrypt","/guide/encrypt.md"]],
  ["v-0978b044","/guide/markdown.html",{"title":"Markdown 增强","icon":"markdown","type":"article","readingTime":{"minutes":2.92,"words":875},"excerpt":"<p>VuePress 的每个文档页面都是由 Markdown 渲染而成。所以你需要通过在相应路径创建编写 Markdown 建立你的文档或博客页面。</p>\n","category":["使用指南"],"tag":["markdown"]},["/guide/markdown","/guide/markdown.md"]],
  ["v-4eaf9f84","/guide/page.html",{"title":"页面配置","icon":"page","type":"article","readingTime":{"minutes":0.65,"words":194},"excerpt":"<p><code>more</code> 注释之前的内容被视为文章摘要。</p>\n","author":"Ms.Hope","date":"2020-01-01T00:00:00.000Z","category":["使用指南"],"tag":["页面配置","使用指南"],"sticky":true,"star":true},["/guide/page","/guide/page.md"]],
  ["v-fffb8e28","/guide/",{"title":"主要功能与配置演示","icon":"creative","type":"article","readingTime":{"minutes":0.09,"words":28},"excerpt":"主要功能与配置演示 页面展示; Markdown 展示; 禁用展示; 加密展示;","category":["使用指南"]},["/guide/index.html","/guide/README.md"]],
  ["v-5a814a99","/posts/article10.html",{"title":"文章 10","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 10 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-10T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article10","/posts/article10.md"]],
  ["v-5c362338","/posts/article11.html",{"title":"文章 11","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 11 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-11T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article11","/posts/article11.md"]],
  ["v-5deafbd7","/posts/article12.html",{"title":"文章 12","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 12 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-12T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"],"star":true},["/posts/article12","/posts/article12.md"]],
  ["v-7beb5be1","/posts/article9.html",{"title":"文章 9","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 9 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-09T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article9","/posts/article9.md"]],
  ["v-03842690","/posts/article/article1.html",{"title":"文章 1","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 1 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-01T00:00:00.000Z","category":["CategoryA"],"tag":["tag A","tag B"]},["/posts/article/article1","/posts/article/article1.md"]],
  ["v-0538ff2f","/posts/article/article2.html",{"title":"文章 2","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 2 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-02T00:00:00.000Z","category":["CategoryA"],"tag":["tag A","tag B"],"star":true},["/posts/article/article2","/posts/article/article2.md"]],
  ["v-06edd7ce","/posts/article/article3.html",{"title":"文章 3","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 3 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-03T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article/article3","/posts/article/article3.md"]],
  ["v-08a2b06d","/posts/article/article4.html",{"title":"文章 4","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 4 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-04T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article/article4","/posts/article/article4.md"]],
  ["v-0a57890c","/posts/article/article5.html",{"title":"文章 5","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 5 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-05T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article/article5","/posts/article/article5.md"]],
  ["v-0c0c61ab","/posts/article/article6.html",{"title":"文章 6","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 6 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-06T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"],"star":10},["/posts/article/article6","/posts/article/article6.md"]],
  ["v-0dc13a4a","/posts/article/article7.html",{"title":"文章 7","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 7 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-07T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article/article7","/posts/article/article7.md"]],
  ["v-0f7612e9","/posts/article/article8.html",{"title":"文章 8","icon":"edit","type":"article","readingTime":{"minutes":0.06,"words":19},"excerpt":"文章 8 标题 2 这里是内容。 标题 3 这里是内容。","date":"2022-01-08T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article/article8","/posts/article/article8.md"]],
  ["v-3706649a","/404.html",{"title":"","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/404"]],
  ["v-5bc93818","/category/",{"title":"分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/index.html"]],
  ["v-744d024e","/tag/",{"title":"标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/index.html"]],
  ["v-e52c881c","/article/",{"title":"文章","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/article/index.html"]],
  ["v-75ed4ea4","/encrypted/",{"title":"加密","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/encrypted/index.html"]],
  ["v-2897d318","/slides/",{"title":"幻灯片","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/slides/index.html"]],
  ["v-154dc4c4","/star/",{"title":"收藏","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/star/index.html"]],
  ["v-01560935","/timeline/",{"title":"时间轴","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/timeline/index.html"]],
  ["v-03d57386","/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/",{"title":"使用指南 分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/使用指南/","/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/index.html"]],
  ["v-83e1f92e","/tag/%E7%A6%81%E7%94%A8/",{"title":"禁用 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/禁用/","/tag/%E7%A6%81%E7%94%A8/index.html"]],
  ["v-3e5b7b84","/category/categorya/",{"title":"CategoryA 分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/categorya/index.html"]],
  ["v-1e447d61","/tag/%E6%96%87%E7%AB%A0%E5%8A%A0%E5%AF%86/",{"title":"文章加密 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/文章加密/","/tag/%E6%96%87%E7%AB%A0%E5%8A%A0%E5%AF%86/index.html"]],
  ["v-3e5b7ba3","/category/categoryb/",{"title":"CategoryB 分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/categoryb/index.html"]],
  ["v-484552dc","/tag/markdown/",{"title":"markdown 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/markdown/index.html"]],
  ["v-a378ad66","/tag/%E9%A1%B5%E9%9D%A2%E9%85%8D%E7%BD%AE/",{"title":"页面配置 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/页面配置/","/tag/%E9%A1%B5%E9%9D%A2%E9%85%8D%E7%BD%AE/index.html"]],
  ["v-7b167472","/tag/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/",{"title":"使用指南 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/使用指南/","/tag/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/index.html"]],
  ["v-06bbb262","/tag/tag-a/",{"title":"tag A 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/tag-a/index.html"]],
  ["v-06bbb224","/tag/tag-b/",{"title":"tag B 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/tag-b/index.html"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
