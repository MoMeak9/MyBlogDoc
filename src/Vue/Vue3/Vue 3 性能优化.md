# Vue 3 性能优化

## 分析工具

生产检测：

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

用于本地开发期间的性能分析：

- [Chrome 开发者工具“性能”面板](https://developer.chrome.com/docs/devtools/evaluate-performance/)
- [Vue 开发者扩展](https://cn.vuejs.org/guide/scaling-up/tooling.html#browser-devtools)

## 页面加载

页面加载优化有许多跟框架无关的方面 - 这份 [web.dev 指南](https://web.dev/fast/)提供了一个全面的总结。

### 渲染方式

如果你的用例对页面加载性能很敏感，请避免将其部署为纯客户端的 SPA，而是让服务器直接发送包含用户想要查看的内容的 HTML 代码。纯客户端渲染存在首屏加载缓慢的问题，这可以通过[服务器端渲染 (SSR)](https://cn.vuejs.org/guide/extras/ways-of-using-vue.html#fullstack-ssr) 或[静态站点生成 (SSG)](https://cn.vuejs.org/guide/extras/ways-of-using-vue.html#jamstack-ssg) 来缓解。

### 拆包 ｜ Treee-sharking

- 尽可能地**采用构建步骤**
  - 如果使用的是相对现代的打包工具，许多 Vue 的 API 都是可以被 [tree-shake](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) 的。举例来说，如果你根本没有使用到内置的 `<Transition>` 组件，它将不会被打包进入最终的产物里。T**ree-shaking 也可以移除你源代码中其他未使用到的模块。**
  - 当使用了构建步骤时，模板会被预编译，因此我们无须在浏览器中载入 Vue 编译器。这在同样最小化加上 gzip 优化下会相对缩小 **14kb** 并避免运行时的编译开销。
- 在引入新的依赖项时要小心包体积膨胀！在现实的应用中，包体积膨胀通常因为无意识地引入了过重的依赖导致的。
  - 如果使用了构建步骤，应当**尽量选择提供 ES 模块格式的依赖**，它们对 tree-shaking 更友好。举例来说，选择 `lodash-es` 比 `lodash` 更好。
  - 查看依赖的体积，并评估与其所提供的功能之间的性价比。如果依赖对 tree-shaking 友好，实际增加的体积大小将取决于你从它之中导入的 API。**像 [bundlejs.com](https://bundlejs.com/) 这样的工具**可以用来做快速的检查，但是根据实际的构建设置来评估总是最准确的。
- 如果你只在渐进式增强的场景下使用 Vue，并想要避免使用构建步骤，请考虑使用 [petite-vue](https://github.com/vuejs/petite-vue) (只有 **6kb**) 来代替。

### 代码分割-基于`import()`ESM动态导入

#### 异步组件

在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。Vue 提供了 [`defineAsyncComponent`](https://cn.vuejs.org/api/general.html#defineasynccomponent) 方法来实现此功能：

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`
```

如你所见，`defineAsyncComponent` 方法接收一个返回 Promise 的加载函数。这个 Promise 的 `resolve` 回调方法应该在从服务器获得组件定义时调用。你也可以调用 `reject(reason)` 表明加载失败。

[ES 模块动态导入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)也会返回一个 Promise，所以多数情况下我们会将它和 `defineAsyncComponent` 搭配使用。类似 Vite 和 Webpack 这样的构建工具也支持此语法 (并且会将它们作为打包时的代码分割点)，因此我们也可以用它来导入 Vue 单文件组件：

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

最后得到的 `AsyncComp` 是一个外层包装过的组件，仅在页面需要它渲染时才会调用加载内部实际组件的函数。它会将接收到的 props 和插槽传给内部组件，所以你可以使用这个异步的包装组件无缝地替换原始组件，同时实现延迟加载。

与普通组件一样，异步组件可以使用 `app.component()` [全局注册](https://cn.vuejs.org/guide/components/registration.html#global-registration)：

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

也可以直接在父组件中直接定义它们：

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

#### 懒加载路由

Vue Router 支持开箱即用的[动态导入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports)，这意味着你可以用动态导入代替静态导入：

```js
// 将
// import UserDetails from './views/UserDetails.vue'
// 替换成
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: UserDetails }],
})
```

`component` (和 `components`) 配置接收一个返回 Promise 组件的函数，Vue Router **只会在第一次进入页面时才会获取这个函数**，然后使用缓存数据。这意味着你也可以使用更复杂的函数，只要它们返回一个 Promise ：

```js
const UserDetails = () =>
  Promise.resolve({
    /* 组件定义 */
  })
```

#### 组件分块

**使用 webpack**

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用[命名 chunk](https://webpack.js.org/guides/code-splitting/#dynamic-imports)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)：

```js
const UserDetails = () =>
  import(/* webpackChunkName: "group-user" */ './UserDetails.vue')
const UserDashboard = () =>
  import(/* webpackChunkName: "group-user" */ './UserDashboard.vue')
const UserProfileEdit = () =>
  import(/* webpackChunkName: "group-user" */ './UserProfileEdit.vue')
```

webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。

**使用 Vite**

在Vite中，你可以在[`rollupOptions`](https://vitejs.dev/config/#build-rollupoptions)下定义分块：

```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          'group-user': [
            './src/UserDetails',
            './src/UserDashboard',
            './src/UserProfileEdit',
          ],
        },
      },
    },
  },
})
```

## 数据更新

### 维持 Props 稳定性

在 Vue 之中，一个子组件只会在其至少一个 props 改变时才会更新。思考以下示例：

```vue
<ListItem
  v-for="item in list"
  :id="item.id"
  :active-id="activeId" />
```

在 `<ListItem>` 组件中，它使用了 `id` 和 `activeId` 两个 props 来确定它是否是当前活跃的那一项。虽然这是可行的，但问题是每当 `activeId` 更新时，列表中的**每一个** `<ListItem>` 都会跟着更新！

理想情况下，只有活跃状态发生改变的项才应该更新。我们可以将活跃状态比对的逻辑移入父组件来实现这一点，然后让 `<ListItem>` 改为接收一个 `active` prop：

```vue
<ListItem
  v-for="item in list"
  :id="item.id"
  :active="item.id === activeId" />
```

现在，对于大多数的组件来说，`activeId` 改变时，它们的 `active` prop 都会保持不变，因此它们无需再更新。总结一下，这个技巧的核心思想就是让传给子组件的 props 尽量保持稳定。

### 通过内置指令

#### v-once

仅渲染元素和组件一次，并跳过之后的更新。

- **无需传入**

- **详细信息**

  在随后的重新渲染，元素/组件及其所有子项将被当作静态内容并跳过渲染。这可以用来优化更新时的性能。

  ```vue
  <!-- 单个元素 -->
  <span v-once>This will never change: {{msg}}</span>
  <!-- 带有子元素的元素 -->
  <div v-once>
    <h1>comment</h1>
    <p>{{msg}}</p>
  </div>
  <!-- 组件 -->
  <MyComponent v-once :comment="msg" />
  <!-- `v-for` 指令 -->
  <ul>
    <li v-for="i in list" v-once>{{i}}</li>
  </ul>
  ```

#### v-memo

与React useMemo 的比较数组及其相似，开发者负责指定依赖数组来避免更新。

缓存一个模板的子树。在元素和组件上都可以使用。为了实现缓存，该指令需要传入一个固定长度的依赖值数组进行比较。如果数组里的每个值都与最后一次的渲染相同，那么整个子树的更新将被跳过。举例来说：

```vue
<div v-memo="[valueA, valueB]">
  ...
</div>
```

当组件重新渲染，如果 `valueA` 和 `valueB` 都保持不变，这个 `<div>` 及其子项的所有更新都将被跳过。实际上，甚至虚拟 DOM 的 vnode 创建也将被跳过，因为缓存的子树副本可以被重新使用。

正确指定缓存数组很重要，否则应该生效的更新可能被跳过。`v-memo` 传入空依赖数组 (`v-memo="[]"`) 将与 `v-once` 效果相同。

**与 `v-for` 一起使用**

`v-memo` 仅用于性能至上场景中的微小优化，应该很少需要。最常见的情况可能是有助于渲染海量 `v-for` 列表 (长度超过 1000 的情况)：

```vue
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```

当组件的 `selected` 状态改变，默认会重新创建大量的 vnode，尽管绝大部分都跟之前是一模一样的。`v-memo` 用在这里本质上是在说“只有当该项的被选中状态改变时才需要更新”。这使得每个选中状态没有变的项能完全重用之前的 vnode 并跳过差异比较。注意这里 memo 依赖数组中并不需要包含 `item.id`，因为 Vue 也会根据 item 的 `:key` 进行判断。

警告

当搭配 `v-for` 使用 `v-memo`，确保两者都绑定在同一个元素上。**`v-memo` 不能用在 `v-for` 内部。**

## 场景优化

### 虚拟列表

我们并不需要立刻渲染出全部的列表。在大多数场景中，用户的屏幕尺寸只会展示这个巨大列表中的一小部分。我们可以通过**列表虚拟化**来提升性能，这项技术使我们只需要渲染用户视口中能看到的部分。

要实现列表虚拟化并不简单，幸运的是，你可以直接使用现有的社区库：

- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- [vue-virtual-scroll-grid](https://github.com/rocwang/vue-virtual-scroll-grid)
- [vueuc/VVirtualList](https://github.com/07akioni/vueuc)

### 数据响应开销

例如一次渲染需要访问 100,000+ 个属性时，才会变得比较明显。因此，它只会影响少数特定的场景。

Vue 确实也为此提供了一种解决方案，通过使用 [`shallowRef()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 和 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 来绕开深度响应。浅层式 API 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理。这使得对深层级属性的访问变得更快，但代价是，我们现在必须将所有深层级对象视为不可变的，并且只能通过替换整个根状态来触发更新：

```js
const shallowArray = shallowRef([
  /* 巨大的列表，里面包含深层的对象 */
])

// 这不会触发更新...
shallowArray.value.push(newObject)
// 这才会触发更新
shallowArray.value = [...shallowArray.value, newObject]

// 这不会触发更新...
shallowArray.value[0].foo = 1
// 这才会触发更新
shallowArray.value = [
  {
    ...shallowArray.value[0],
    foo: 1
  },
  ...shallowArray.value.slice(1)
]
```

变成了React下的数据更新情况。

### 减少不必的组件抽象，改用自定义Hooks

组件实例比普通 DOM 节点要昂贵得多，而且为了逻辑抽象创建太多组件实例将会导致性能损失。

## 参考文章

- [性能优化 | Vue.js](https://cn.vuejs.org/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures)

- [18 | 实战痛点4：Vue 3项目中的性能优化](https://time.geekbang.org/column/article/455487)
- [内置指令 | Vue.js](https://cn.vuejs.org/api/built-in-directives.html#v-pre)

