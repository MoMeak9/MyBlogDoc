const e=JSON.parse(`{"key":"v-7dc2a076","path":"/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/L5%20%E6%B8%B2%E6%9F%93%E6%B5%81%E7%A8%8B%EF%BC%88%E4%B8%8A%EF%BC%89%EF%BC%9AHTML%E3%80%81CSS%E5%92%8CJavaScript%E6%98%AF%E5%A6%82%E4%BD%95%E5%8F%98%E6%88%90%E9%A1%B5%E9%9D%A2%E7%9A%84.html","title":"L5 渲染流程（上）：HTML、CSS和JavaScript是如何变成页面的","lang":"zh-CN","frontmatter":{"icon":"edit","date":"2022-03-21T00:00:00.000Z","category":["浏览器原理"],"description":"在上一篇文章中我们介绍了导航相关的流程，那导航被提交后又会怎么样呢？就进入了渲染阶段。这个阶段很重要，了解其相关流程能让你“看透”页面是如何工作的，有了这些知识，你可以解决一系列相关的问题，比如能熟练使用开发者工具，因为能够理解开发者工具里面大部分项目的含义，能优化页面卡顿问题，使用JavaScript优化动画流程，通过优化样式表来防止强制同步布局，等...","head":[["meta",{"property":"og:url","content":"https://yihuiBlog.top/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/L5%20%E6%B8%B2%E6%9F%93%E6%B5%81%E7%A8%8B%EF%BC%88%E4%B8%8A%EF%BC%89%EF%BC%9AHTML%E3%80%81CSS%E5%92%8CJavaScript%E6%98%AF%E5%A6%82%E4%BD%95%E5%8F%98%E6%88%90%E9%A1%B5%E9%9D%A2%E7%9A%84.html"}],["meta",{"property":"og:site_name","content":"Yihui's Blog"}],["meta",{"property":"og:title","content":"L5 渲染流程（上）：HTML、CSS和JavaScript是如何变成页面的"}],["meta",{"property":"og:description","content":"在上一篇文章中我们介绍了导航相关的流程，那导航被提交后又会怎么样呢？就进入了渲染阶段。这个阶段很重要，了解其相关流程能让你“看透”页面是如何工作的，有了这些知识，你可以解决一系列相关的问题，比如能熟练使用开发者工具，因为能够理解开发者工具里面大部分项目的含义，能优化页面卡顿问题，使用JavaScript优化动画流程，通过优化样式表来防止强制同步布局，等..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-11-24T09:03:41.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2022-03-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-11-24T09:03:41.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"构建DOM树","slug":"构建dom树","link":"#构建dom树","children":[]},{"level":2,"title":"样式计算","slug":"样式计算","link":"#样式计算","children":[{"level":3,"title":"1. 把CSS转换为浏览器能够理解的结构","slug":"_1-把css转换为浏览器能够理解的结构","link":"#_1-把css转换为浏览器能够理解的结构","children":[]},{"level":3,"title":"2. 转换样式表中的属性值，使其标准化","slug":"_2-转换样式表中的属性值-使其标准化","link":"#_2-转换样式表中的属性值-使其标准化","children":[]},{"level":3,"title":"3. 计算出DOM树中每个节点的具体样式","slug":"_3-计算出dom树中每个节点的具体样式","link":"#_3-计算出dom树中每个节点的具体样式","children":[]}]},{"level":2,"title":"布局阶段","slug":"布局阶段","link":"#布局阶段","children":[{"level":3,"title":"1. 创建布局树","slug":"_1-创建布局树","link":"#_1-创建布局树","children":[]},{"level":3,"title":"2. 布局计算","slug":"_2-布局计算","link":"#_2-布局计算","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1669280621000,"updatedTime":1669280621000,"contributors":[{"name":"MoMeak9","email":"1308994506@qq.com","commits":1}]},"readingTime":{"minutes":12.45,"words":3735},"copyright":"著作权归YihuiBlog所有\\n基于CC-BY 4.0协议\\n原文链接：https://yihuiblog.top/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/L5%20%E6%B8%B2%E6%9F%93%E6%B5%81%E7%A8%8B%EF%BC%88%E4%B8%8A%EF%BC%89%EF%BC%9AHTML%E3%80%81CSS%E5%92%8CJavaScript%E6%98%AF%E5%A6%82%E4%BD%95%E5%8F%98%E6%88%90%E9%A1%B5%E9%9D%A2%E7%9A%84.html","filePathRelative":"浏览器工作原理/L5 渲染流程（上）：HTML、CSS和JavaScript是如何变成页面的.md","localizedDate":"2022年3月21日"}`);export{e as data};
