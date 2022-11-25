---
date: 2022-05-12
category:
- Vue
---

# 数据流原理：Vuex & Pinia

## 如何使用Vuex设计你的数据流

### 前端数据管理

首先，我们需要掌握前端的数据怎么管理，现代 Web 应用都是由三大件构成，分别是：组件、数据和路由。

有一些数据组件之间需要共享的时候,专门定义一个全局变量，任何组件需要数据的时候都去这个全局变量中获取。一些通用的数据，比如用户登录信息，以及一个跨层级的组件通信都可以通过这个全局变量很好地实现。在下面的代码中我们使用 _store 这个全局变量存储数据。

```
window._store = {}
```



![img](https://cdn.yihuiblog.top/images/202205151955889.jpeg)

但这样就会产生一个问题，window._store 并不是响应式的，如果在 Vue 项目中直接使用，那么就无法自动更新页面。<u>所以我们需要用 ref 和 reactive 去把数据包裹成响应式数据，并且提供统一的操作方法，这其实就是数据管理框架 Vuex 的雏形了</u>。

### Vuex 是什么

Vuex 就相当于我们项目中的大管家，集中式存储管理应用的所有组件的状态。

我们使用 createStore 来创建一个数据存储，我们称之为 store。

store 内部除了数据，还需要一个 mutation 配置去修改数据，你可以把这个 mutation 理解为数据更新的申请单，mutation 内部的函数会把 state 作为参数，我们直接操作 state.count 就可以完成数据的修改。

```js
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 666
    }
  },
  mutations: {
    add (state) {
      state.count++
    }
  }
})
```

然后，我们使用 .use 就可以对路由进行注册，使用 .mount 就可以把 Vue 这个应用挂载到页面上，代码如下。

```js
const app = createApp(App)
app.use(store)
    .use(router)
    .mount('#app')
```

Test demo

```vue
<template>
<div @click="add">
    {{count}}
</div>
</template>

<script setup>
import { computed } from 'vue'
import {useStore} from 'vuex'
let store = useStore()
let count = computed(()=>store.state.count)

function add(){
    store.commit('add')
}
</script>
```

**什么时候的数据用 Vuex 管理，什么时候数据要放在组件内部使用 ref 管理呢？**

<u>对于一个数据，如果只是组件内部使用就是用 ref 管理；如果我们需要跨组件，跨页面共享的时候，我们就需要把数据从 Vue 的组件内部抽离出来，放在 Vuex 中去管理。</u>

我再结合例子具体说说：比如项目中的登录用户名，页面的右上角需要显示，有些信息弹窗也需要显示。这样的数据就需要放在 Vuex 中统一管理，每当需要抽离这样的数据的时候，我们都需要思考这个数据的初始化和更新逻辑。

![img](https://cdn.yihuiblog.top/images/202205152010731.jpeg)

### 手写迷你 Vuex

首先，我们需要创建一个变量 store 用来存储数据。下一步就是把这个 store 的数据包转成响应式的数据，并且提供给 Vue 组件使用。在 Vue 中有 **provide/inject** 这两个函数专门用来做数据共享，provide 注册了数据后，所有的子组件都可以通过 inject 获取数据，这两个函数官方文档介绍得比较详细，我在这里就不过多解释了。

完成刚才的数据转换之后，我们直接进入到 src/store 文件夹下，新建 gvuex.js。下面的代码中，我们使用一个 Store 类来管理数据，类的内部使用 _state 存储数据，使用 mutations 来存储数据修改的函数，注意这里的 state 已经使用 reactive 包裹成响应式数据了。

```js
import { inject, reactive } from 'vue'

const STORE_KEY = '__store__'
function useStore() {
  return inject(STORE_KEY)
}
function createStore(options) {
  return new Store(options)
}
class Store {
  constructor(options) {
    this._state = reactive({
      data: options.state()
    })
    this._mutations = options.mutations
  }
}
export { createStore, useStore }
```

最终我们使用 store 的方式，在项目入口文件 src/main.js 中使用 app.use(store) 注册。为了让 useStore 能正常工作，下面的代码中，我们需要给 store 新增一个 install 方法，这个方法会在 app.use 函数内部执行。我们通过 app.provide 函数注册 store 给全局的组件使用。

```js
class Store {
  // main.js入口处app.use(store)的时候，会执行这个函数
  install(app) {
    app.provide(STORE_KEY, this)
  }
}
```

下面的代码中，Store 类内部变量 _state 存储响应式数据，读取 state 的时候直接获取响应式数据 _state.data，并且提供了 commit 函数去执行用户配置好的 mutations。

```js
import { inject, reactive } from 'vue'
const STORE_KEY = '__store__'
function useStore() {
  return inject(STORE_KEY)
}
function createStore(options) {
  return new Store(options)
}
class Store {
  constructor(options) {
    this.$options = options
    this._state = reactive({
      data: options.state
    })
    this._mutations = options.mutations
  }
  get state() {
    return this._state.data
  }
  commit = (type, payload) => {
    const entry = this._mutations[type]
    entry && entry(this.state, payload)
  }
  install(app) {
    app.provide(STORE_KEY, this)
  }
}
export { createStore, useStore }
```

**action 并不是直接修改数据，而是通过 mutations 去修改，这是我提醒你需要注意的。**

Vuex 在整体上的逻辑如下图所示，从宏观来说，Vue 的组件负责渲染页面，组件中用到跨页面的数据，就是用 state 来存储，但是 Vue 不能直接修改 state，而是要通过 actions/mutations 去做数据的修改。

<img src="https://cdn.yihuiblog.top/images/202205152017572.png" alt="img" style="zoom: 50%;" />

下面这个图也是 Vuex 官方的结构图，很好地拆解了 Vuex 在 Vue 全家桶中的定位，我们项目中也会用 Vuex 来管理所有的跨组件的数据，并且我们也会在 Vuex 内部根据功能模块去做拆分，会把用户、权限等不同模块的组件分开去管理。

![img](https://cdn.yihuiblog.top/images/202205152017101.png)

总体来说，**我们在决定一个数据是否用 Vuex 来管理的时候，核心就是要思考清楚，这个数据是否有共享给其他页面或者是其他组件的需要。**如果需要，就放置在 Vuex 中管理；如果不需要，就应该放在组件内部使用 ref 或者 reactive 去管理。

## Pinia 就是未来的 Vuex

然后在 src/main.js 中，我们导入 createPinia 方法，通过 createPinia 方法创建 Pinia 的实例后，再通过 app.use 方法注册 Pinia。

我们导入 createPinia 方法，通过 createPinia 方法创建 Pinia 的实例后，再通过 app.use 方法注册 Pinia。

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia).mount('#app')
```

然后我们可以在 store 文件夹中创建一个 count.js。下面的代码中我们通过 Pinia 的 defineStore 方法定义了一个 store，store 内部通过 state 返回一个对象，并且通过 Actions 配置修改数据的方法 add。这里使用的语法和 Vuex 比较类似，只是**删除了 Mutation 的概念，统一使用 Actions 来配置。**

```js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('count', {
  id:'count',
  state: () => {
    return { count: 1 }
  },
  actions: {
    add() {
      this.count++
    },
  },
})
```

然后我们可以使用 Composition 的方式在代码中使用 store。注意上面的 store 返回的其实就是一个 Composition 风格的函数，使用 useCounterStore 返回 count 后，可以在 add 方法中直接使用 count.add 触发 Actions，实现数据的修改。

```js
import { useCounterStore } from '../stores/count'

const count = useCounterStore()
function add(){
  count.add()
}
```

**我们也可以使用 Composition 风格的语法，去创建一个 store。**使用 ref 或者 reactive 包裹后，通过 defineStore 返回，这样 store 就非常接近我们自己分装的 Composition 语法了，也去除了很多 Vuex 中特有的概念，学习起来更加简单。

```js
export const useCounterStore = defineStore('count', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

### Pinna 源码

首先我们进入到 Pinia 的 GitHub 中，我们可以在 packages/pinia/src/createPinia.ts 中看到 createPinia 函数的实现。

下面的代码中，我们通过 effectScope 创建一个作用域对象，并且通过 ref 创建了响应式的数据对象 state。然后通过 install 方法支持了 app.use 的注册，内部通过 provide 的语法和全局的 `$pinia` 变量配置 Pinia 对象，并且通过 use 方法和 toBeInstalled 数组实现了 Pinia 的插件机制。**最后还通过 pinia.use(devtoolsPlugin) 实现了对 VueDevtools 的支持。**

```ts
export function createPinia(): Pinia {
  const scope = effectScope(true)
  // NOTE: here we could check the window object for a state and directly set it
  // if there is anything like it with Vue 3 SSR
  const state = scope.run(() => ref<Record<string, StateTree>>({}))!

  let _p: Pinia['_p'] = []
  // plugins added before calling app.use(pinia)
  let toBeInstalled: PiniaPlugin[] = []

  const pinia: Pinia = markRaw({
    install(app: App) {
      // this allows calling useStore() outside of a component setup after
      // installing pinia's plugin
      setActivePinia(pinia)
      if (!isVue2) {
        pinia._a = app
        app.provide(piniaSymbol, pinia)
        app.config.globalProperties.$pinia = pinia
        toBeInstalled.forEach((plugin) => _p.push(plugin))
        toBeInstalled = []
      }
    },

    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin)
      } else {
        _p.push(plugin)
      }
      return this
    },

    _p,
    _a: null,
    _e: scope,
    _s: new Map<string, StoreGeneric>(),
    state,
  })
  if (__DEV__ && IS_CLIENT) {
    pinia.use(devtoolsPlugin)
  }

  return pinia
}
```

通过上面的代码，我们可以看到 Pinia 实例就是 ref({}) 包裹的响应式对象，项目中用到的 state 都会挂载到 Pinia 这个响应式对象内部。

然后我们去看下创建 store 的 defineStore 方法, defineStore 内部通过 useStore 方法去定义 store，并且每个 store 都会标记唯一的 ID。

首先通过 getCurrentInstance 获取当前组件的实例，如果 useStore 参数没有 Pinia 的话，就使用 inject 去获取 Pinia 实例，**这里 inject 的数据就是 createPinia 函数中 install 方法提供的。**

然后设置 activePinia，项目中可能会存在很多 Pinia 的实例，设置 activePinia 就是设置当前活跃的 Pinia 实例。这个函数的实现方式和 Vue 中的 componentInstance 很像，每次创建组件的时候都设置当前的组件实例，这样就可以在组件的内部通过 getCurrentInstance 获取，最后通过 createSetupStore 或者 createOptionsStore 创建组件。

这就是上面代码中我们使用 Composition 和 Option 两种语法创建 store 的不同执行逻辑，最后通过 pinia._s 缓存创建后的 store，_s 就是在 createPinia 的时候创建的一个 Map 对象，防止 store 多次重复创建。**到这 store 创建流程就结束了。**

```ts
export function defineStore(
  // TODO: add proper types from above
  idOrOptions: any,
  setup?: any,
  setupOptions?: any
): StoreDefinition {
  let id: string
  let options:...
  const isSetupStore = typeof setup === 'function'
  if (typeof idOrOptions === 'string') {
    id = idOrOptions
    // the option store setup will contain the actual options in this case
    options = isSetupStore ? setupOptions : setup
  } else {
    options = idOrOptions
    id = idOrOptions.id
  }

  function useStore(pinia?: Pinia | null, hot?: StoreGeneric): StoreGeneric {
    const currentInstance = getCurrentInstance()
    pinia =
      // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      (__TEST__ && activePinia && activePinia._testing ? null : pinia) ||
      (currentInstance && inject(piniaSymbol))
    if (pinia) setActivePinia(pinia)

    pinia = activePinia!

    if (!pinia._s.has(id)) {
      // creating the store registers it in `pinia._s`
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia)
      } else {
        createOptionsStore(id, options as any, pinia)
      }

      /* istanbul ignore else */
      if (__DEV__) {
        // @ts-expect-error: not the right inferred type
        useStore._pinia = pinia
      }
    }

    const store: StoreGeneric = pinia._s.get(id)!

    // save stores in instances to access them devtools
    if (
      __DEV__ &&
      IS_CLIENT &&
      currentInstance &&
      currentInstance.proxy &&
      // avoid adding stores that are just built for hot module replacement
      !hot
    ) {
      const vm = currentInstance.proxy
      const cache = '_pStores' in vm ? vm._pStores! : (vm._pStores = {})
      cache[id] = store
    }

    // StoreGeneric cannot be casted towards Store
    return store as any
  }

  useStore.$id = id

  return useStore
}
```

在 Pinia 中 createOptionsStore 内部也是调用了 createSetupStore 来创建 store 对象。下面的代码中，我们通过 assign 方法实现了 setup 函数，这里可以看到 computed 的实现，内部就是通过 pinia._s 缓存获取 store 对象，调用 store 的 getters 方法来模拟，最后依然通过 createSetupStore 创建。

```ts
function createOptionsStore<
  Id extends string,
  S extends StateTree,
  G extends _GettersTree<S>,
  A extends _ActionsTree
>(
  id: Id,
  options: DefineStoreOptions<Id, S, G, A>,
  pinia: Pinia,
  hot?: boolean
): Store<Id, S, G, A> {
  const { state, actions, getters } = options

  const initialState: StateTree | undefined = pinia.state.value[id]

  let store: Store<Id, S, G, A>

  function setup() {

    pinia.state.value[id] = state ? state() : {}
    return assign(
      localState,
      actions,
      Object.keys(getters || {}).reduce((computedGetters, name) => {
        computedGetters[name] = markRaw(
          computed(() => {
            setActivePinia(pinia)
            // it was created just before
            const store = pinia._s.get(id)!
            return getters![name].call(store, store)
          })
        )
        return computedGetters
      }, {} as Record<string, ComputedRef>)
    )
  }

  store = createSetupStore(id, setup, options, pinia, hot)

  return store as any
}
```

最后我们来看一下 createSetupStore 函数的实现。这个函数也是 Pinia 中最复杂的函数实现，内部的 `$patch` 函数可以实现数据的更新。如果传递的参数 partialStateOrMutator 是函数，则直接执行，否则就通过 mergeReactiveObjects 方法合并到 state 中，最后生成 subscriptionMutation 对象，**通过 triggerSubscriptions 方法触发数据的更新。**

```ts

 function $patch(
    partialStateOrMutator:
      | _DeepPartial<UnwrapRef<S>>
      | ((state: UnwrapRef<S>) => void)
  ): void {
    let subscriptionMutation: SubscriptionCallbackMutation<S>
    isListening = isSyncListening = false
    // reset the debugger events since patches are sync
    /* istanbul ignore else */
    if (__DEV__) {
      debuggerEvents = []
    }
    if (typeof partialStateOrMutator === 'function') {
      partialStateOrMutator(pinia.state.value[$id] as UnwrapRef<S>)
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents as DebuggerEvent[],
      }
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator)
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents as DebuggerEvent[],
      }
    }
    nextTick().then(() => {
      isListening = true
    })
    isSyncListening = true
    // because we paused the watcher, we need to manually call the subscriptions
    triggerSubscriptions(
      subscriptions,
      subscriptionMutation,
      pinia.state.value[$id] as UnwrapRef<S>
    )
  }
```

然后定义 partialStore 对象去存储 ID、`$patch`、Pinia 实例，并且新增了 subscribe 方法。再调用 reactive 函数把 partialStore 包裹成响应式对象，通过 pinia._s.set 的方法实现 store 的挂载。最后我们通过 pinia.\_s.get 获取的就是 partialStore 对象，defineStore 返回的方法 useStore 就可以通过 useStore 去获取缓存的 Pinia 对象，实现对数据的更新和读取。这里我们也可以看到，除了直接执行 Action 方法，还可以通过调用内部的 count.$patch({count:count+1}) 的方式来实现数字的累加。

```ts
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options = {}) {
      const removeSubscription = addSubscription(
        subscriptions,
        callback,
        options.detached,
        () => stopWatcher()
      )
      const stopWatcher = scope.run(() =>
        watch(
          () => pinia.state.value[$id] as UnwrapRef<S>,
          (state) => {
            if (options.flush === 'sync' ? isSyncListening : isListening) {
              callback(
                {
                  storeId: $id,
                  type: MutationType.direct,
                  events: debuggerEvents as DebuggerEvent,
                },
                state
              )
            }
          },
          assign({}, $subscribeOptions, options)
        )
      )!

      return removeSubscription
    }
    

  const store: Store<Id, S, G, A> = reactive(
    assign({}， partialStore )
  )

  // store the partial store now so the setup of stores can instantiate each other before they are finished without
  // creating infinite loops.
  pinia._s.set($id, store)
```

代码内部除了 __dev__ 调试环境中对 Devtools 支持的语法，还有很多适配 Vue 2 的语法，并且同时支持 Optipn 风格和 Composition 风格去创建 store。createSetupStore 等方法内部也会通过 Map 的方式实现缓存，并且 setActivePinia 方法可以在多个 Pinia 实例的时候获取当前的实例。这些思路在 Vue、vue-router 源码中都能看到类似的实现方式，这种性能优化的思路和手段也值得我们学习，在项目开发中也可以借鉴。

### 总结

Vuex5 针对 Vuex4 中的几个痛点，去掉了容易混淆的概念 Mutation，并且去掉了对 TypeScript 不友好的 namespace 功能，使用组合 store 的方式让 Vuex 对 TypeScript 更加友好。

Pinia 就是 Vuex5 提案产出的框架，现在已经是 Vue 官方的框架了，也就是 Vuex5 的实现。在 Pinia 的代码中，我们通过 createPinia 创建 Pinia 实例，并且可以通过 Option 和 Composition 两种风格的 API 去创建 store，返回 useStore 函数获取 Pinia 的实例后，就可以进行数据的修改和读取。
