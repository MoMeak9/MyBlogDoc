const l=JSON.parse(`{"key":"v-36c74c1a","path":"/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/%E9%9D%A2%E8%AF%95%E9%A2%98/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8E%9F%E7%90%86%E9%9D%A2%E8%AF%95%E9%A2%98%E6%B1%87%E6%80%BB.html","title":"浏览器原理面试题汇总","lang":"zh-CN","frontmatter":{"description":"「2021」高频前端面试题汇总之浏览器原理篇 (https://juejin.cn/post/6916157109906341902/) 一、浏览器安全 1. 什么是 XSS 攻击？:star::star: （1）概念 XSS 攻击指的是跨站脚本攻击，是一种代码注入攻击。攻击者通过在网站注入恶意脚本，使之在用户的浏览器上运行，从而盗取用户的信息等如 c...","head":[["meta",{"property":"og:url","content":"https://yihuiBlog.top/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/%E9%9D%A2%E8%AF%95%E9%A2%98/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8E%9F%E7%90%86%E9%9D%A2%E8%AF%95%E9%A2%98%E6%B1%87%E6%80%BB.html"}],["meta",{"property":"og:site_name","content":"Yihui's Blog"}],["meta",{"property":"og:title","content":"浏览器原理面试题汇总"}],["meta",{"property":"og:description","content":"「2021」高频前端面试题汇总之浏览器原理篇 (https://juejin.cn/post/6916157109906341902/) 一、浏览器安全 1. 什么是 XSS 攻击？:star::star: （1）概念 XSS 攻击指的是跨站脚本攻击，是一种代码注入攻击。攻击者通过在网站注入恶意脚本，使之在用户的浏览器上运行，从而盗取用户的信息等如 c..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-11-24T09:03:41.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-11-24T09:03:41.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"一、浏览器安全","slug":"一、浏览器安全","link":"#一、浏览器安全","children":[{"level":3,"title":"1.  什么是 XSS 攻击？⭐⭐","slug":"_1-什么是-xss-攻击","link":"#_1-什么是-xss-攻击","children":[]},{"level":3,"title":"2. 如何防御 XSS 攻击？⭐⭐","slug":"_2-如何防御-xss-攻击","link":"#_2-如何防御-xss-攻击","children":[]},{"level":3,"title":"3. 什么是 CSRF 攻击？⭐⭐","slug":"_3-什么是-csrf-攻击","link":"#_3-什么是-csrf-攻击","children":[]},{"level":3,"title":"4. 如何防御 CSRF 攻击？⭐⭐","slug":"_4-如何防御-csrf-攻击","link":"#_4-如何防御-csrf-攻击","children":[]},{"level":3,"title":"5. 什么是中间人攻击？如何防范中间人攻击？","slug":"_5-什么是中间人攻击-如何防范中间人攻击","link":"#_5-什么是中间人攻击-如何防范中间人攻击","children":[]},{"level":3,"title":"6. 有哪些可能引起前端安全的问题?","slug":"_6-有哪些可能引起前端安全的问题","link":"#_6-有哪些可能引起前端安全的问题","children":[]},{"level":3,"title":"7. 网络劫持有哪几种，如何防范？","slug":"_7-网络劫持有哪几种-如何防范","link":"#_7-网络劫持有哪几种-如何防范","children":[]}]},{"level":2,"title":"二、进程与线程","slug":"二、进程与线程","link":"#二、进程与线程","children":[{"level":3,"title":"1. 进程与线程的概念 ⭐⭐","slug":"_1-进程与线程的概念","link":"#_1-进程与线程的概念","children":[]},{"level":3,"title":"2. 进程和线程的区别 ⭐⭐","slug":"_2-进程和线程的区别","link":"#_2-进程和线程的区别","children":[]},{"level":3,"title":"3. 浏览器渲染进程（Renderer进程）的线程有哪些","slug":"_3-浏览器渲染进程-renderer进程-的线程有哪些","link":"#_3-浏览器渲染进程-renderer进程-的线程有哪些","children":[]},{"level":3,"title":"4. 进程之间的通信方式 ⭐⭐","slug":"_4-进程之间的通信方式","link":"#_4-进程之间的通信方式","children":[]},{"level":3,"title":"5. 僵尸进程和孤儿进程是什么？","slug":"_5-僵尸进程和孤儿进程是什么","link":"#_5-僵尸进程和孤儿进程是什么","children":[]},{"level":3,"title":"6. 死锁产生的原因？ 如果解决死锁的问题？⭐⭐","slug":"_6-死锁产生的原因-如果解决死锁的问题","link":"#_6-死锁产生的原因-如果解决死锁的问题","children":[]},{"level":3,"title":"7. 如何实现浏览器内多个标签页之间的通信? ⭐","slug":"_7-如何实现浏览器内多个标签页之间的通信","link":"#_7-如何实现浏览器内多个标签页之间的通信","children":[]},{"level":3,"title":"8. 对Service Worker的理解","slug":"_8-对service-worker的理解","link":"#_8-对service-worker的理解","children":[]}]},{"level":2,"title":"三、浏览器缓存","slug":"三、浏览器缓存","link":"#三、浏览器缓存","children":[{"level":3,"title":"1. 对浏览器的缓存机制的理解 ⭐⭐","slug":"_1-对浏览器的缓存机制的理解","link":"#_1-对浏览器的缓存机制的理解","children":[]},{"level":3,"title":"2. 浏览器资源缓存的位置有哪些？⭐","slug":"_2-浏览器资源缓存的位置有哪些","link":"#_2-浏览器资源缓存的位置有哪些","children":[]},{"level":3,"title":"3. 协商缓存和强缓存的区别 ⭐⭐","slug":"_3-协商缓存和强缓存的区别","link":"#_3-协商缓存和强缓存的区别","children":[]},{"level":3,"title":"4. 为什么需要浏览器缓存？","slug":"_4-为什么需要浏览器缓存","link":"#_4-为什么需要浏览器缓存","children":[]},{"level":3,"title":"5. 点击刷新按钮或者按 F5、按 Ctrl+F5 （强制刷新）、地址栏回车有什么区别？","slug":"_5-点击刷新按钮或者按-f5、按-ctrl-f5-强制刷新-、地址栏回车有什么区别","link":"#_5-点击刷新按钮或者按-f5、按-ctrl-f5-强制刷新-、地址栏回车有什么区别","children":[]}]},{"level":2,"title":"四、浏览器组成","slug":"四、浏览器组成","link":"#四、浏览器组成","children":[{"level":3,"title":"1. 对浏览器的理解","slug":"_1-对浏览器的理解","link":"#_1-对浏览器的理解","children":[]},{"level":3,"title":"2. 对浏览器内核的理解 ⭐","slug":"_2-对浏览器内核的理解","link":"#_2-对浏览器内核的理解","children":[]},{"level":3,"title":"3. 常见的浏览器内核比较 ⭐","slug":"_3-常见的浏览器内核比较","link":"#_3-常见的浏览器内核比较","children":[]},{"level":3,"title":"4. 常见浏览器所用内核 ⭐","slug":"_4-常见浏览器所用内核","link":"#_4-常见浏览器所用内核","children":[]},{"level":3,"title":"5. 浏览器的主要组成部分 ⭐","slug":"_5-浏览器的主要组成部分","link":"#_5-浏览器的主要组成部分","children":[]}]},{"level":2,"title":"五、浏览器渲染原理","slug":"五、浏览器渲染原理","link":"#五、浏览器渲染原理","children":[{"level":3,"title":"1. 浏览器的渲染过程 ⭐⭐","slug":"_1-浏览器的渲染过程","link":"#_1-浏览器的渲染过程","children":[]},{"level":3,"title":"2. 浏览器渲染优化 ⭐⭐","slug":"_2-浏览器渲染优化","link":"#_2-浏览器渲染优化","children":[]},{"level":3,"title":"3. 渲染过程中遇到 JS 文件如何处理？⭐","slug":"_3-渲染过程中遇到-js-文件如何处理","link":"#_3-渲染过程中遇到-js-文件如何处理","children":[]},{"level":3,"title":"4. 什么是文档的预解析？","slug":"_4-什么是文档的预解析","link":"#_4-什么是文档的预解析","children":[]},{"level":3,"title":"5. CSS 如何阻塞文档解析？","slug":"_5-css-如何阻塞文档解析","link":"#_5-css-如何阻塞文档解析","children":[]},{"level":3,"title":"6. 如何优化关键渲染路径？","slug":"_6-如何优化关键渲染路径","link":"#_6-如何优化关键渲染路径","children":[]},{"level":3,"title":"7. 什么情况会阻塞渲染？⭐","slug":"_7-什么情况会阻塞渲染","link":"#_7-什么情况会阻塞渲染","children":[]}]},{"level":2,"title":"六、浏览器本地存储","slug":"六、浏览器本地存储","link":"#六、浏览器本地存储","children":[{"level":3,"title":"1. 浏览器本地存储方式及使用场景 ⭐⭐","slug":"_1-浏览器本地存储方式及使用场景","link":"#_1-浏览器本地存储方式及使用场景","children":[]},{"level":3,"title":"2. Cookie有哪些字段，作用分别是什么 ⭐","slug":"_2-cookie有哪些字段-作用分别是什么","link":"#_2-cookie有哪些字段-作用分别是什么","children":[]},{"level":3,"title":"3. Cookie、LocalStorage、SessionStorage区别 ⭐⭐","slug":"_3-cookie、localstorage、sessionstorage区别","link":"#_3-cookie、localstorage、sessionstorage区别","children":[]},{"level":3,"title":"4. 前端储存的方式有哪些？ ⭐⭐","slug":"_4-前端储存的方式有哪些","link":"#_4-前端储存的方式有哪些","children":[]},{"level":3,"title":"5. IndexedDB有哪些特点？","slug":"_5-indexeddb有哪些特点","link":"#_5-indexeddb有哪些特点","children":[]}]},{"level":2,"title":"七、浏览器同源策略","slug":"七、浏览器同源策略","link":"#七、浏览器同源策略","children":[{"level":3,"title":"1. 什么是同源策略 ⭐⭐","slug":"_1-什么是同源策略","link":"#_1-什么是同源策略","children":[]},{"level":3,"title":"2. 如何解决跨越问题 ⭐⭐","slug":"_2-如何解决跨越问题","link":"#_2-如何解决跨越问题","children":[]},{"level":3,"title":"3. 正向代理和反向代理的区别","slug":"_3-正向代理和反向代理的区别","link":"#_3-正向代理和反向代理的区别","children":[]},{"level":3,"title":"4. Nginx的概念及其工作原理","slug":"_4-nginx的概念及其工作原理","link":"#_4-nginx的概念及其工作原理","children":[]}]},{"level":2,"title":"八、浏览器事件机制","slug":"八、浏览器事件机制","link":"#八、浏览器事件机制","children":[{"level":3,"title":"1. 事件是什么？事件模型？⭐⭐","slug":"_1-事件是什么-事件模型","link":"#_1-事件是什么-事件模型","children":[]},{"level":3,"title":"2. 如何阻止事件冒泡","slug":"_2-如何阻止事件冒泡","link":"#_2-如何阻止事件冒泡","children":[]},{"level":3,"title":"3. 对事件委托的理解 ⭐⭐","slug":"_3-对事件委托的理解","link":"#_3-对事件委托的理解","children":[]},{"level":3,"title":"4. 事件委托的使用场景 ⭐⭐","slug":"_4-事件委托的使用场景","link":"#_4-事件委托的使用场景","children":[]},{"level":3,"title":"5. 同步和异步的区别","slug":"_5-同步和异步的区别","link":"#_5-同步和异步的区别","children":[]},{"level":3,"title":"6. 对事件循环的理解 ⭐⭐","slug":"_6-对事件循环的理解","link":"#_6-对事件循环的理解","children":[]},{"level":3,"title":"7. 宏任务和微任务分别有哪些 ⭐⭐","slug":"_7-宏任务和微任务分别有哪些","link":"#_7-宏任务和微任务分别有哪些","children":[]},{"level":3,"title":"8. 什么是执行栈（调用栈）","slug":"_8-什么是执行栈-调用栈","link":"#_8-什么是执行栈-调用栈","children":[]},{"level":3,"title":"9. Node 中的 Event Loop 和浏览器中的有什么区别？process.nextTick 执行顺序？⭐⭐","slug":"_9-node-中的-event-loop-和浏览器中的有什么区别-process-nexttick-执行顺序","link":"#_9-node-中的-event-loop-和浏览器中的有什么区别-process-nexttick-执行顺序","children":[]},{"level":3,"title":"10. 事件触发的过程是怎样的","slug":"_10-事件触发的过程是怎样的","link":"#_10-事件触发的过程是怎样的","children":[]}]},{"level":2,"title":"九、浏览器垃圾回收机制 ⭐⭐","slug":"九、浏览器垃圾回收机制","link":"#九、浏览器垃圾回收机制","children":[{"level":3,"title":"1. V8的垃圾回收机制是怎样的","slug":"_1-v8的垃圾回收机制是怎样的","link":"#_1-v8的垃圾回收机制是怎样的","children":[]},{"level":3,"title":"2. 哪些操作会造成内存泄漏？⭐","slug":"_2-哪些操作会造成内存泄漏","link":"#_2-哪些操作会造成内存泄漏","children":[]}]}],"git":{"createdTime":1669280621000,"updatedTime":1669280621000,"contributors":[{"name":"MoMeak9","email":"1308994506@qq.com","commits":1}]},"readingTime":{"minutes":95.21,"words":28563},"copyright":"著作权归YihuiBlog所有\\n基于CC-BY 4.0协议\\n原文链接：https://yihuiblog.top/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/%E9%9D%A2%E8%AF%95%E9%A2%98/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8E%9F%E7%90%86%E9%9D%A2%E8%AF%95%E9%A2%98%E6%B1%87%E6%80%BB.html","filePathRelative":"浏览器工作原理/面试题/浏览器原理面试题汇总.md","localizedDate":"2022年11月24日"}`);export{l as data};
