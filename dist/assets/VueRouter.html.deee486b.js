const e=JSON.parse(`{"key":"v-5e86dd82","path":"/Vue/%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/VueRouter.html","title":"前端路由原理：vue-router源码剖析","lang":"zh-CN","frontmatter":{"date":"2022-05-12T00:00:00.000Z","category":["Vue"],"description":"vue-router 入口分析 vue-router 提供了 createRouter 方法来创建路由配置，我们传入每个路由地址对应的组件后，使用 app.use 在 Vue 中加载 vue-router 插件，并且给 Vue 注册了两个内置组件，router-view 负责渲染当前路由匹配的组件，router-link 负责页面的跳转。 下面的代码中...","head":[["meta",{"property":"og:url","content":"https://yihuiBlog.top/Vue/%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/VueRouter.html"}],["meta",{"property":"og:site_name","content":"Yihui's Blog"}],["meta",{"property":"og:title","content":"前端路由原理：vue-router源码剖析"}],["meta",{"property":"og:description","content":"vue-router 入口分析 vue-router 提供了 createRouter 方法来创建路由配置，我们传入每个路由地址对应的组件后，使用 app.use 在 Vue 中加载 vue-router 插件，并且给 Vue 注册了两个内置组件，router-view 负责渲染当前路由匹配的组件，router-link 负责页面的跳转。 下面的代码中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-11-25T08:26:33.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2022-05-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-11-25T08:26:33.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"vue-router 入口分析","slug":"vue-router-入口分析","link":"#vue-router-入口分析","children":[]},{"level":2,"title":"路由安装","slug":"路由安装","link":"#路由安装","children":[]},{"level":2,"title":"路由更新","slug":"路由更新","link":"#路由更新","children":[]}],"git":{"createdTime":1669364793000,"updatedTime":1669364793000,"contributors":[{"name":"MoMeak9","email":"1308994506@qq.com","commits":1}]},"readingTime":{"minutes":7.68,"words":2303},"copyright":"著作权归YihuiBlog所有\\n基于CC-BY 4.0协议\\n原文链接：https://yihuiblog.top/Vue/%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/VueRouter.html","filePathRelative":"Vue/源码学习/VueRouter.md","localizedDate":"2022年5月12日"}`);export{e as data};
