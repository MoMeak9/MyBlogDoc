const e=JSON.parse(`{"key":"v-4558e3c8","path":"/Vue/Vue%20keep-alive%20%E7%AC%94%E8%AE%B0.html","title":"Vue keep-alive","lang":"zh-CN","frontmatter":{"date":"2022-06-12T00:00:00.000Z","category":["Vue"],"description":"什么是 keep-alive 在平常开发中，有部分组件没有必要多次初始化，这时，我们需要将组件进行持久化，使组件的状态维持不变，在下一次展示时，也不会进行重新初始化组件。 也就是说，keepalive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染 。也就是所谓的组件缓存 是Vue的内置组件，能在组件切换过程中将状态保留在内存中...","head":[["meta",{"property":"og:url","content":"https://yihuiBlog.top/Vue/Vue%20keep-alive%20%E7%AC%94%E8%AE%B0.html"}],["meta",{"property":"og:site_name","content":"Yihui's Blog"}],["meta",{"property":"og:title","content":"Vue keep-alive"}],["meta",{"property":"og:description","content":"什么是 keep-alive 在平常开发中，有部分组件没有必要多次初始化，这时，我们需要将组件进行持久化，使组件的状态维持不变，在下一次展示时，也不会进行重新初始化组件。 也就是说，keepalive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染 。也就是所谓的组件缓存 是Vue的内置组件，能在组件切换过程中将状态保留在内存中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-11-25T08:26:33.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2022-06-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-11-25T08:26:33.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"什么是 keep-alive","slug":"什么是-keep-alive","link":"#什么是-keep-alive","children":[]},{"level":2,"title":"keep-alive的声明周期执行","slug":"keep-alive的声明周期执行","link":"#keep-alive的声明周期执行","children":[]},{"level":2,"title":"基本用法","slug":"基本用法","link":"#基本用法","children":[]},{"level":2,"title":"参数理解","slug":"参数理解","link":"#参数理解","children":[]},{"level":2,"title":"遇见 vue-router 结合router使用，缓存部分页面","slug":"遇见-vue-router-结合router使用-缓存部分页面","link":"#遇见-vue-router-结合router使用-缓存部分页面","children":[{"level":3,"title":"所有路径下的视图组件都会被缓存","slug":"所有路径下的视图组件都会被缓存","link":"#所有路径下的视图组件都会被缓存","children":[]},{"level":3,"title":"如果只想要router-view里面的某个组件被缓存，怎么办？","slug":"如果只想要router-view里面的某个组件被缓存-怎么办","link":"#如果只想要router-view里面的某个组件被缓存-怎么办","children":[]},{"level":3,"title":"【加盐】使用 router.meta 拓展","slug":"【加盐】使用-router-meta-拓展","link":"#【加盐】使用-router-meta-拓展","children":[]}]},{"level":2,"title":"防坑指南","slug":"防坑指南","link":"#防坑指南","children":[{"level":3,"title":"实现前进刷新，后退不刷新","slug":"实现前进刷新-后退不刷新","link":"#实现前进刷新-后退不刷新","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[{"level":3,"title":"生命周期函数：就是vue在某个时间段会自动执行的函数","slug":"生命周期函数-就是vue在某个时间段会自动执行的函数","link":"#生命周期函数-就是vue在某个时间段会自动执行的函数","children":[]}]},{"level":2,"title":"参考：","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1669364793000,"updatedTime":1669364793000,"contributors":[{"name":"MoMeak9","email":"1308994506@qq.com","commits":1}]},"readingTime":{"minutes":6.89,"words":2066},"copyright":"著作权归YihuiBlog所有\\n基于CC-BY 4.0协议\\n原文链接：https://yihuiblog.top/Vue/Vue%20keep-alive%20%E7%AC%94%E8%AE%B0.html","filePathRelative":"Vue/Vue keep-alive 笔记.md","localizedDate":"2022年6月12日"}`);export{e as data};
