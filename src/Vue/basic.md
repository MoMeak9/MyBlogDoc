---
title: Vue 使用技巧
date: 2022-2-17
author: MoMeaks
sidebar: 'auto'
categories:
- wiki
tags:
- Vue
---

> 截取：
>
> 作者：火狼1
>
> 链接：https://juejin.cn/post/6844903959266590728

## 3.10 v-slot

2.6.0 新增 1.slot,slot-cope,scope 在 2.6.0 中都被废弃,但未被移除 2.作用就是将父组件的 template 传入子组件 3.插槽分类: A.匿名插槽(也叫默认插槽): 没有命名,有且只有一个;

```vue
// 父组件
<todo-list> 
    <template v-slot:default>
       任意内容
       <p>我是匿名插槽 </p>
    </template>
</todo-list> 

// 子组件
<slot>我是默认值</slot>
//v-slot:default写上感觉和具名写法比较统一,容易理解,也可以不用写
```

B.具名插槽: 相对匿名插槽组件slot标签带name命名的;

```vue
// 父组件
<todo-list> 
    <template v-slot:todo>
       任意内容
       <p>我是匿名插槽 </p>
    </template>
</todo-list> 

//子组件
<slot name="todo">我是默认值</slot>
```

C.作用域插槽: 子组件内数据可以被父页面拿到(解决了数据只能从父页面传递给子组件)

```vue
// 父组件
<todo-list>
 <template v-slot:todo="slotProps" >
   {{slotProps.user.firstName}}
 </template> 
</todo-list> 
//slotProps 可以随意命名
//slotProps 接取的是子组件标签slot上属性数据的集合所有v-bind:user="user"

// 子组件
<slot name="todo" :user="user" :test="test">
    {{ user.lastName }}
 </slot> 
data() {
    return {
      user:{
        lastName:"Zhang",
        firstName:"yue"
      },
      test:[1,2,3,4]
    }
  },
// {{ user.lastName }}是默认数据  v-slot:todo 当父页面没有(="slotProps")
```

## 3.11 EventBus

1.就是声明一个全局Vue实例变量 EventBus , 把所有的通信数据，事件监听都存储到这个变量上; 2.类似于 Vuex。但这种方式只适用于极小的项目 3.原理就是利用on和on和on和emit 并实例化一个全局 vue 实现数据共享

```
// 在 main.js
Vue.prototype.$eventBus=new Vue()

// 传值组件
this.$eventBus.$emit('eventTarget','这是eventTarget传过来的值')

// 接收组件
this.$eventBus.$on("eventTarget",v=>{
  console.log('eventTarget',v);//这是eventTarget传过来的值
})
复制代码
```

4.可以实现平级,嵌套组件传值,但是对应的事件名eventTarget必须是全局唯一的

## 3.13 路由传参

1.方案一

```
// 路由定义
{
  path: '/describe/:id',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  path: `/describe/${id}`,
})
// 页面获取
this.$route.params.id
复制代码
```

2.方案二

```
// 路由定义
{
  path: '/describe',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  name: 'Describe',
  params: {
    id: id
  }
})
// 页面获取
this.$route.params.id
复制代码
```

3.方案三

```
// 路由定义
{
  path: '/describe',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  path: '/describe',
    query: {
      id: id
  `}
)
// 页面获取
this.$route.query.id
复制代码
```

4.三种方案对比 方案二参数不会拼接在路由后面,页面刷新参数会丢失 方案一和三参数拼接在后面,丑,而且暴露了信息

# 4.render 函数

1.场景:有些代码在 template 里面写会重复很多,所以这个时候 render 函数就有作用啦

```
// 根据 props 生成标签
// 初级
<template>
  <div>
    <div v-if="level === 1"> <slot></slot> </div>
    <p v-else-if="level === 2"> <slot></slot> </p>
    <h1 v-else-if="level === 3"> <slot></slot> </h1>
    <h2 v-else-if="level === 4"> <slot></slot> </h2>
    <strong v-else-if="level === 5"> <slot></slot> </stong>
    <textarea v-else-if="level === 6"> <slot></slot> </textarea>
  </div>
</template>

// 优化版,利用 render 函数减小了代码重复率
<template>
  <div>
    <child :level="level">Hello world!</child>
  </div>
</template>

<script type='text/javascript'>
  import Vue from 'vue'
  Vue.component('child', {
    render(h) {
      const tag = ['div', 'p', 'strong', 'h1', 'h2', 'textarea'][this.level-1]
      return h(tag, this.$slots.default)
    },
    props: {
      level: {  type: Number,  required: true  } 
    }
  })   
  export default {
    name: 'hehe',
    data() { return { level: 3 } }
  }
</script>

复制代码
```

2.render 和 template 的对比 前者适合复杂逻辑,后者适合逻辑简单; 后者属于声明是渲染，前者属于自定Render函数; 前者的性能较高，后者性能较低。

# 5.异步组件

场景:项目过大就会导致加载缓慢,所以异步组件实现按需加载就是必须要做的事啦 

**1.异步注册组件 3种方法**

```js
// 工厂函数执行 resolve 回调
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包, 这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})

// 工厂函数返回 Promise
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)

// 工厂函数返回一个配置化组件对象
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

异步组件的渲染本质上其实就是执行2次或者2次以上的渲染, 先把当前组件渲染为注释节点, 当组件加载成功后, 通过 forceRender 执行重新渲染。或者是渲染为注释节点, 然后再渲染为loading节点, 在渲染为请求完成的组件

2.路由的按需加载

```js
webpack< 2.4 时
{
  path:'/',
  name:'home',
  components:resolve=>require(['@/components/home'],resolve)
}

webpack> 2.4 时
{
  path:'/',
  name:'home',
  components:()=>import('@/components/home')
}

import()方法由es6提出，import()方法是动态加载，返回一个Promise对象，then方法的参数是加载到的模块。类似于Node
```

# 6.动态组件

场景:做一个 tab 切换时就会涉及到组件动态加载

```vue
<component v-bind:is="currentTabComponent"></component>
```

但是这样每次组件都会重新加载,会消耗大量性能,所以 就起到了作用

```vue
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

这样切换效果没有动画效果,这个也不用着急,可以利用内置的

```
<transition>
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
</transition>
```

# 7.递归组件

场景:如果开发一个 tree 组件,里面层级是根据后台数据决定的,这个时候就需要用到动态组件

```vue
// 递归组件: 组件在它的模板内可以递归的调用自己，只要给组件设置name组件就可以了。
// 设置那么House在组件模板内就可以递归使用了,不过需要注意的是，
// 必须给一个条件来限制数量，否则会抛出错误: max stack size exceeded
// 组件递归用来开发一些具体有未知层级关系的独立组件。比如：
// 联级选择器和树形控件 

<template>
  <div v-for="(item,index) in treeArr">
      子组件，当前层级值： {{index}} <br/>
      <!-- 递归调用自身, 后台判断是否不存在改值 -->
      <tree :item="item.arr" v-if="item.flag"></tree>
  </div>
</template>
<script>
export default {
  // 必须定义name，组件内部才能递归调用
  name: 'tree',
  data(){
    return {}
  },
  // 接收外部传入的值
  props: {
     item: {
      type:Array,
      default: ()=>[]
    }
  }
}
</script>
```

递归组件必须设置name 和结束的阀值

# 17. Vue.filter

场景:时间戳转化成年月日这是一个公共方法,所以可以抽离成过滤器使用

```js
// 使用
// 在双花括号中
{{ message | capitalize }}

// 在 `v-bind` 中
<div v-bind:id="rawId | formatId"></div>

// 全局注册
Vue.filter('stampToYYMMDD', (value) =>{
  // 处理逻辑
})

// 局部注册
filters: {
  stampToYYMMDD: (value)=> {
    // 处理逻辑
  }
}

// 多个过滤器全局注册
// /src/common/filters.js
let dateServer = value => value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') 
export { dateServer }
// /src/main.js
import * as custom from './common/filters/custom'
Object.keys(custom).forEach(key => Vue.filter(key, custom[key]))
```

# 18.Vue.compile

场景:在 render 函数中编译模板字符串。只在独立构建时有效

```js
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```

# 19.Vue.version

场景:有些开发插件需要针对不同 vue 版本做兼容,所以就会用到 Vue.version 用法:Vue.version()可以获取 vue 版本

```js
var version = Number(Vue.version.split('.')[0])

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
```

# 20.Vue.set()

场景:当你利用索引直接设置一个数组项时或你修改数组的长度时,由于 Object.defineprototype()方法限制,数据不响应式更新 不过vue.3.x 将利用 proxy 这个问题将得到解决 解决方案:

```
// 利用 set
this.$set(arr,index,item)

// 利用数组 push(),splice()
```

# 22.Vue.config.performance

场景:监听性能

```
Vue.config.performance = true
```

# 27.v-once

场景:有些 template 中的静态 dom 没有改变,这时就只需要渲染一次,可以降低性能开销

```
<span v-once> 这时只需要加载一次的标签</span>
```

v-once 和 v-pre 的区别: v-once只渲染一次；v-pre不编译,原样输出

# 30.Vue-router :star:

场景:Vue-router 是官方提供的路由插件

## 30.1 缓存和动画

1.路由是使用官方组件 vue-router,使用方法相信大家非常熟悉;
 2.这里我就叙述下路由的缓存和动画;
 3.可以用exclude(除了)或者include(包括),2.1.0 新增来坐判断

```
<transition>
  <keep-alive :include="['a', 'b']">
  //或include="a,b" :include="/a|b/",a 和 b 表示组件的 name
  //因为有些页面,如试试数据统计,要实时刷新,所以就不需要缓存
    <router-view/> //路由标签
  </keep-alive>
  <router-view exclude="c"/> 
  // c 表示组件的 name值
</transition>
复制代码
```

注:匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配
 4.用 v-if 做判断,组件会重新渲染,但是不用一一列举组件 name

## 30.2 全局路由钩子

1.router.beforeEach

```js
router.beforeEach((to, from, next) => {
  console.log('全局前置守卫：beforeEach -- next需要调用') //一般登录拦截用这个,也叫导航钩子守卫
  if (path === '/login') {
    next()
    return
  }
  if (token) {
    next();
  } 
})
```

2.router.beforeResolve (v 2.5.0+) 和beforeEach类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用 即在 beforeEach之后调用

3.router.afterEach 全局后置钩子 在所有路由跳转结束的时候调用 这些钩子不会接受 next 函数也不会改变导航本身

## 30.3 组件路由钩子

1.beforeRouteEnter 在渲染该组件的对应路由被确认前调用，用法和参数与router.beforeEach类似，next需要被主动调用 此时组件实例还未被创建，不能访问this 可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数

```js
beforeRouteEnter (to, from, next) {
  // 这里还无法访问到组件实例，this === undefined
  next( vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

2.beforeRouteUpdate (v 2.2+) 在当前路由改变，并且该组件被复用时调用，可以通过this访问实例， next需要被主动调用，不能传回调

3.beforeRouteLeave 导航离开该组件的对应路由时调用，可以访问组件实例 this，next需要被主动调用，不能传回调

## 30.4 路由模式

设置 mode 属性:hash或 history

## 30.5 Vue.$router

```
this.$router.push():跳转到不同的url，但这个方法回向history栈添加一个记录，点击后退会返回到上一个页面
this.$router.replace():不会有记录
this.$router.go(n):n可为正数可为负数。正数前进， 负数后退,类似 window.history.go(n)
```

## 30.6 Vue.$route

表示当前跳转的路由对象,属性有: name:路由名称 path:路径 query:传参接收值 params:传参接收值 fullPath:完成解析后的 URL，包含查询参数和 hash 的完整路径 matched:路由记录副本 redirectedFrom:如果存在重定向，即为重定向来源的路由的名字

```vue
this.$route.params.id:获取通过 params 或/:id传参的参数
this.$route.query.id:获取通过 query 传参的参数
```

## 30.7 router-view 的 key

场景:由于 Vue 会复用相同组件, 即 /page/1 => /page/2 或者 /page?id=1 => /page?id=2 这类链接跳转时, 将不在执行created, mounted之类的钩子

```vue
<router-view :key="$route.fullPath"></router-view>
```

这样组件的 created 和 mounted 就都会执行

# 33.vue-loader 小技巧

## 33.1 preserveWhitespace

场景:开发 vue 代码一般会有空格,这个时候打包压缩如果不去掉空格会加大包的体积 配置preserveWhitespace可以减小包的体积

```vue
{
  vue: {
    preserveWhitespace: false
  }
}
```

## 33.2 transformToRequire

场景:以前在写 Vue 的时候经常会写到这样的代码：把图片提前 require 传给一个变量再传给组件

```vue
// page 代码
<template>
  <div>
    <avatar :img-src="imgSrc"></avatar>
  </div>
</template>
<script>
  export default {
    created () {
      this.imgSrc = require('./assets/default-avatar.png')
    }
  }
</script>
```

现在:通过配置 transformToRequire 后，就可以直接配置，这样vue-loader会把对应的属性自动 require 之后传给组件

```vue
// vue-cli 2.x在vue-loader.conf.js 默认配置是
transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
}

// 配置文件,如果是vue-cli2.x 在vue-loader.conf.js里面修改
  avatar: ['default-src']

// vue-cli 3.x 在vue.config.js
// vue-cli 3.x 将transformToRequire属性换为了transformAssetUrls
module.exports = {
  pages,
  chainWebpack: config => {
    config
      .module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
      options.transformAssetUrls = {
        avatar: 'img-src',
      }
      return options;
      });
  }
}

// page 代码可以简化为
<template>
  <div>
    <avatar img-src="./assets/default-avatar.png"></avatar>
  </div>
</template>
```

# 34.为路径设置别名

1.场景:在开发过程中，我们经常需要引入各种文件，如图片、CSS、JS等，为了避免写很长的相对路径（../），我们可以为不同的目录配置一个别名

2.vue-cli 2.x 配置

```js
// 在 webpack.base.config.js中的 resolve 配置项，在其 alias 中增加别名
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
```

3.vue-cli 3.x 配置

```js
// 在根目录下创建vue.config.js
var path = require('path')
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set(key, value) // key,value自行定义，比如.set('@@', resolve('src/components'))
  }
}
```

# 35.img 加载失败

场景:有些时候后台返回图片地址不一定能打开,所以这个时候应该加一张默认图片

```vue
// page 代码
<img :src="imgUrl" @error="handleError" alt="">
<script>
export default{
  data(){
    return{
      imgUrl:''
    }
  },
  methods:{
    handleError(e){
      e.target.src=reqiure('图片路径') //当然如果项目配置了transformToRequire,参考上面 33.2
    }
  }
}
</script>
```

# 36.css

## 36.1 局部样式

1.Vue中style标签的scoped属性表示它的样式只作用于当前模块，是样式私有化.

2.渲染的规则/原理： 给HTML的DOM节点添加一个 不重复的data属性 来表示 唯一性 在对应的 CSS选择器 末尾添加一个当前组件的 data属性选择器来私有化样式，如：.demo[data-v-2311c06a]{} 如果引入 less 或 sass 只会在最后一个元素上设置

```css
// 原始代码
<template>
  <div class="demo">
    <span class="content">
      Vue.js scoped
    </span>
  </div>
</template>

<style lang="less" scoped>
  .demo{
    font-size: 16px;
    .content{
      color: red;
    }
  }
</style>

// 浏览器渲染效果
<div data-v-fed36922>
  Vue.js scoped
</div>
<style type="text/css">
.demo[data-v-039c5b43] {
  font-size: 14px;
}
.demo .content[data-v-039c5b43] { //.demo 上并没有加 data 属性
  color: red;
}
</style>
```

## 36.2 deep 属性

```css
// 上面样式加一个 /deep/
<style lang="less" scoped>
  .demo{
    font-size: 14px;
  }
  .demo /deep/ .content{
    color: blue;
  }
</style>

// 浏览器编译后
<style type="text/css">
.demo[data-v-039c5b43] {
  font-size: 14px;
}
.demo[data-v-039c5b43] .content {
  color: blue;
}
</style>
```
