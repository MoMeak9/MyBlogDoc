# 前端路由原理：vue-router源码剖析

## vue-router 入口分析

vue-router 提供了 createRouter 方法来创建路由配置，我们传入每个路由地址对应的组件后，使用 app.use 在 Vue 中加载 vue-router 插件，并且给 Vue 注册了两个内置组件，router-view 负责渲染当前路由匹配的组件，router-link 负责页面的跳转。

下面的代码中，参数 RouterOptions 是规范我们配置的路由对象，主要包含 history、routes 等数据。routes 就是我们需要配置的路由对象，类型是 RouteRecordRaw 组成的数组，并且 RouteRecordRaw 的类型是三个类型的合并。然后返回值的类型 Router 就是包含了 addRoute、push、beforeEnter、install 方法的一个对象，并且维护了 **currentRoute 和 options 两个属性。**

我们知道 Vue 中 app.use 实际上执行的就是 router 对象内部的 install 方法，我们先进入到 install 方法看下是如何安装的。

```ts
// createRouter传递参数的类型
export interface RouterOptions extends PathParserOptions {
  history: RouterHistory
  routes: RouteRecordRaw[]
  scrollBehavior?: RouterScrollBehavior
  ...
}
// 每个路由配置的类型
export type RouteRecordRaw =
  | RouteRecordSingleView
  | RouteRecordMultipleViews
  | RouteRecordRedirect

//... other config
// Router接口的全部方法和属性
export interface Router {
  readonly currentRoute: Ref<RouteLocationNormalizedLoaded>
  readonly options: RouterOptions

  addRoute(parentName: RouteRecordName, route: RouteRecordRaw): () => void
  addRoute(route: RouteRecordRaw): () => void
  Route(name: RouteRecordName): void
  hasRoute(name: RouteRecordName): boolean

  getRoutes(): RouteRecord[]
  resolve(
    to: RouteLocationRaw,
    currentLocation?: RouteLocationNormalizedLoaded
  ): RouteLocation & { href: string }
  push(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
  replace(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
  back(): ReturnType<Router['go']>
  forward(): ReturnType<Router['go']>
  go(delta: number): void
  beforeEach(guard: NavigationGuardWithThis<undefined>): () => void
  beforeResolve(guard: NavigationGuardWithThis<undefined>): () => void
  afterEach(guard: NavigationHookAfter): () => void
  onError(handler: _ErrorHandler): () => void
  isReady(): Promise<void>
  install(app: App): void
}

export function createRouter(options: RouterOptions): Router {

}
```

## 路由安装

从下面的代码中我们可以看到，在 createRouter 的最后，创建了包含 addRoute、push 等方法的对象，并且 install 方法内部注册了 RouterLink 和 RouterView 两个组件。所以我们可以在任何组件内部直接使用 和 组件，然后注册全局变量 router和route，其中 **router**就是我们通过createRouter返回的路由对象，包含addRoute、push等方法，**route** 使用 defineProperty 的形式返回 currentRoute 的值，可以做到和 currentRoute 值同步。

然后使用 computed 把路由变成响应式对象，存储在 reactiveRoute 对象中，再通过 app.provide 给全局注册了 route 和 reactive 包裹后的 reactiveRoute 对象。我们之前介绍 provide 函数的时候也介绍了，provide 提供的数据并没有做响应式的封装，**需要响应式的时候需要自己使用 ref 或者 reactive 封装为响应式对象，**最后注册 unmount 方法实现 vue-router 的安装。

```ts
export function createRouter(options: RouterOptions): Router {
....
  let started: boolean | undefined
  const installedApps = new Set<App>()
  // 路由对象
  const router: Router = {
    currentRoute,

    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve,
    options,

    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),

    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,

    onError: errorHandlers.add,
    isReady,
    // 插件按章
    install(app: App) {
      const router = this
      // 注册全局组件 router-link和router-view
      app.component('RouterLink', RouterLink)
      app.component('RouterView', RouterView)

      app.config.globalProperties.$router = router
      Object.defineProperty(app.config.globalProperties, '$route', {
        enumerable: true,
        get: () => unref(currentRoute),
      })
      if (
        isBrowser &&
        !started &&
        currentRoute.value === START_LOCATION_NORMALIZED
      ) {
        // see above
        started = true
        push(routerHistory.location).catch(err => {
          if (__DEV__) warn('Unexpected error when starting the router:', err)
        })
      }

      const reactiveRoute = {} as {
        [k in keyof RouteLocationNormalizedLoaded]: ComputedRef<
          RouteLocationNormalizedLoaded[k]
        >
      }
      for (const key in START_LOCATION_NORMALIZED) {
        // @ts-expect-error: the key matches
        reactiveRoute[key] = computed(() => currentRoute.value[key])
      }
      // 提供全局配置
      app.provide(routerKey, router)
      app.provide(routeLocationKey, reactive(reactiveRoute))
      app.provide(routerViewLocationKey, currentRoute)

      const unmountApp = app.unmount
      installedApps.add(app)
      app.unmount = function () {
        installedApps.delete(app)
        // ...
        unmountApp()
      }

      if ((__DEV__ || __FEATURE_PROD_DEVTOOLS__) && isBrowser) {
        addDevtools(app, router, matcher)
      }
    },
  }

  return router
}
```

通过下面的代码我们可以看到，RouterView 的 setup 函数返回了一个函数，这个函数就是 RouterView 组件的 render 函数。大部分我们使用的方式就是一个 组件，没有 slot 情况下返回的就是 component 变量。component 使用 h 函数返回 ViewComponent 的虚拟 DOM，而 ViewComponent 是根据 matchedRoute.components[props.name]计算而来。

matchedRoute 依赖的 matchedRouteRef 的计算逻辑在如下代码的第 12～15 行，数据来源 injectedRoute 就是上面我们注入的 currentRoute 对象。

```ts

export const RouterViewImpl = /*#__PURE__*/ defineComponent({
  name: 'RouterView',
  props: {
    name: {
      type: String as PropType<string>,
      default: 'default',
    },
    route: Object as PropType<RouteLocationNormalizedLoaded>,
  },
  // router-view组件源码
  setup(props, { attrs, slots }) {
    // 全局的reactiveRoute对象注入
    const injectedRoute = inject(routerViewLocationKey)!
    
    const routeToDisplay = computed(() => props.route || injectedRoute.value)
    const depth = inject(viewDepthKey, 0)
    const matchedRouteRef = computed<RouteLocationMatched | undefined>(
      () => routeToDisplay.value.matched[depth]
    )
    // 嵌套层级
    provide(viewDepthKey, depth + 1)
    // 匹配的router对象
    provide(matchedRouteKey, matchedRouteRef)
    provide(routerViewLocationKey, routeToDisplay)

    const viewRef = ref<ComponentPublicInstance>()
    // 返回的render函数
    return () => {
      const route = routeToDisplay.value
      const matchedRoute = matchedRouteRef.value
      const ViewComponent = matchedRoute && matchedRoute.components[props.name]
      const currentName = props.name

      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route })
      }

      // props from route configuration
      const routePropsOption = matchedRoute!.props[props.name]
      const routeProps = routePropsOption
        ? routePropsOption === true
          ? route.params
          : typeof routePropsOption === 'function'
          ? routePropsOption(route)
          : routePropsOption
        : null

      const onVnodeUnmounted: VNodeProps['onVnodeUnmounted'] = vnode => {
        // remove the instance reference to prevent leak
        if (vnode.component!.isUnmounted) {
          matchedRoute!.instances[currentName] = null
        }
      }
      // 创建需要渲染组件的虚拟dom
      const component = h(
        ViewComponent,
        assign({}, routeProps, attrs, {
          onVnodeUnmounted,
          ref: viewRef,
        })
      )
  
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) ||
        component
      )
    }
  },
})
```

## 路由更新

到这我们可以看出，RouterView 渲染的组件是由当前匹配的路由变量 matchedRoute 决定的。接下来我们回到 createRouter 函数中，可以看到 matcher 对象是由 createRouterMatcher 创建，createRouterMatcher 函数传入 routes 配置的路由数组，并且返回创建的 RouterMatcher 对象，内部遍历 routes 数组，通过 addRoute 挨个处理路由配置。

```ts
export function createRouter(options: RouterOptions): Router {
  const matcher = createRouterMatcher(options.routes, options)
  ///....
}
export function createRouterMatcher(
  routes: RouteRecordRaw[],
  globalOptions: PathParserOptions
): RouterMatcher {
  // matchers数组
  const matchers: RouteRecordMatcher[] = []
  // matcher对象
  const matcherMap = new Map<RouteRecordName, RouteRecordMatcher>()
  globalOptions = mergeOptions(
    { strict: false, end: true, sensitive: false } as PathParserOptions,
    globalOptions
  )
  function addRoute(){}
  function remoteRoute(){}
  function getRoutes(){
    return matchers
  }  
  function insertMatcher(){}
  function resolve(){}
  // add initial routes
  routes.forEach(route => addRoute(route))

  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher }
}
```

在下面的代码中我们可以看到，addRoute 函数内部通过 createRouteRecordMatcher 创建扩展之后的 matcher 对象，包括了 record、parent、children 等树形，可以很好地描述路由之间的嵌套父子关系。这样整个路由对象就已经创建完毕，那我们如何在路由切换的时候寻找到正确的路由对象呢？

```ts
function addRoute(    
  record: RouteRecordRaw,
  parent?: RouteRecordMatcher,
  originalRecord?: RouteRecordMatcher
){
  if ('alias' in record) {
    // 标准化alias
  }
  for (const normalizedRecord of normalizedRecords) {
    // ...
    matcher = createRouteRecordMatcher(normalizedRecord, parent, options)
    insertMatcher(matcher)
      
  }
  return originalMatcher
    ? () => {
        // since other matchers are aliases, they should be removed by the original matcher
        removeRoute(originalMatcher!)
      }
    : noop

}

export function createRouteRecordMatcher(
  record: Readonly<RouteRecord>,
  parent: RouteRecordMatcher | undefined,
  options?: PathParserOptions
): RouteRecordMatcher {
  const parser = tokensToParser(tokenizePath(record.path), options)
  const matcher: RouteRecordMatcher = assign(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: [],
  })

  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher)
  }

  return matcher
}
```

在 vue-router 中，路由更新可以通过 router-link 渲染的链接实现，也可以使用 router 对象的 push 等方法实现。下面的代码中，router-link 组件内部也是渲染一个 a 标签，并且注册了 a 标签的 onClick 函数，内部也是通过 router.replace 或者 router.push 来实现。

```ts
export const RouterLinkImpl = /*#__PURE__*/ defineComponent({
  name: 'RouterLink',
  props: {
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      required: true,
    },
      ...
  },
  // router-link源码
  setup(props, { slots }) {
    const link = reactive(useLink(props))
    const { options } = inject(routerKey)!

    const elClass = computed(() => ({
      ...
    }))

    return () => {
      const children = slots.default && slots.default(link)
      return props.custom
        ? children
        : h(
            'a',
            {
              href: link.href,
              onClick: link.navigate,
              class: elClass.value,
            },
            children
          )
    }
  },
})
//  跳转
  function navigate(
    e: MouseEvent = {} as MouseEvent
  ): Promise<void | NavigationFailure> {
    if (guardEvent(e)) {
      return router[unref(props.replace) ? 'replace' : 'push'](
        unref(props.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop)
    }
    return Promise.resolve()
  }
```

现在我们回到 createRouter 函数中，可以看到 push 函数直接调用了 pushWithRedirect 函数来实现，内部通过 resolve(to) 生成 targetLocation 变量。这个变量会赋值给 toLocation，然后执行 navigate(toLocation) 函数。**而这个函数内部会执行一系列的导航守卫函数**，最后会执行 finalizeNavigation 函数完成导航。

```ts
function push(to: RouteLocationRaw | RouteLocation) {
  return pushWithRedirect(to)
}

function replace(to: RouteLocationRaw | RouteLocationNormalized) {
  return push(assign(locationAsObject(to), { replace: true }))
}
// 路由跳转函数
function pushWithRedirect(
  to: RouteLocationRaw | RouteLocation,
  redirectedFrom?: RouteLocation
): Promise<NavigationFailure | void | undefined> {
  const targetLocation: RouteLocation = (pendingLocation = resolve(to))
  const from = currentRoute.value
  const data: HistoryState | undefined = (to as RouteLocationOptions).state
  const force: boolean | undefined = (to as RouteLocationOptions).force
  // to could be a string where `replace` is a function
  const replace = (to as RouteLocationOptions).replace === true


  const toLocation = targetLocation as RouteLocationNormalized

  
  return (failure ? Promise.resolve(failure) : navigate(toLocation, from))
    .catch((error: NavigationFailure | NavigationRedirectError) =>
      isNavigationFailure(error)
        ? error
        : // reject any unknown error
          triggerError(error, toLocation, from)
    )
    .then((failure: NavigationFailure | NavigationRedirectError | void) => {

        failure = finalizeNavigation(
          toLocation as RouteLocationNormalizedLoaded,
          from,
          true,
          replace,
          data
        )

      triggerAfterEach(
        toLocation as RouteLocationNormalizedLoaded,
        from,
        failure
      )
      return failure
    })
}
```

在下面的代码中我们可以看到，finalizeNavigation 函数内部通过 routerHistory.push 或者 replace 实现路由跳转，并且更新 currentRoute.value。currentRoute 就是我们在 install 方法中注册的全局变量 route，每次页面跳转currentRoute都会更新为toLocation，在任意组件中都可以通过route 变量来获取当前路由的数据，**最后在 handleScroll 设置滚动行为。**

routerHistory 在 createRouter 中通过 option.history 获取，就是我们创建 vue-router 应用时通过 createWebHistory 或者 createWebHashHistory 创建的对象。createWebHistory 返回的是 HTML5 的 history 模式路由对象，createWebHashHistory 是 Hash 模式的路由对象。

```ts
function finalizeNavigation(
    toLocation: RouteLocationNormalizedLoaded,
    from: RouteLocationNormalizedLoaded,
    isPush: boolean,
    replace?: boolean,
    data?: HistoryState
  ): NavigationFailure | void {



    const isFirstNavigation = from === START_LOCATION_NORMALIZED
    const state = !isBrowser ? {} : history.state

    if (isPush) {

      if (replace || isFirstNavigation)
        routerHistory.replace(
          toLocation.fullPath
        )
      else routerHistory.push(toLocation.fullPath, data)
    }

    // accept current navigation
    currentRoute.value = toLocation
    handleScroll(toLocation, from, isPush, isFirstNavigation)

    markAsReady()
  }
  
  function markAsReady(err?: any): void {
    if (ready) return
    ready = true
    setupListeners()
    readyHandlers
      .list()
      .forEach(([resolve, reject]) => (err ? reject(err) : resolve()))
    readyHandlers.reset()
  }
```

下面的代码中我们可以看到，createWebHashHistory 和 createWebHistory 的实现，内部都是通过 useHistoryListeners 实现路由的监听，通过 useHistoryStateNavigation 实现路由的切换。useHistoryStateNavigation 会返回 push 或者 replace 方法来更新路由

> https://github.com/vuejs/router/blob/main/src/history/html5.ts#L57

```ts

export function createWebHashHistory(base?: string): RouterHistory {
  base = location.host ? base || location.pathname + location.search : ''
  // allow the user to provide a `#` in the middle: `/base/#/app`
  if (!base.includes('#')) base += '#'
  return createWebHistory(base)
}



export function createWebHistory(base?: string): RouterHistory {
  base = normalizeBase(base)

  const historyNavigation = useHistoryStateNavigation(base)
  const historyListeners = useHistoryListeners(
    base,
    historyNavigation.state,
    historyNavigation.location,
    historyNavigation.replace
  )
  function go(delta: number, triggerListeners = true) {
    if (!triggerListeners) historyListeners.pauseListeners()
    history.go(delta)
  }

  const routerHistory: RouterHistory = assign(
    {
      // it's overridden right after
      location: '',
      base,
      go,
      createHref: createHref.bind(null, base),
    },

    historyNavigation,
    historyListeners
  )

  Object.defineProperty(routerHistory, 'location', {
    enumerable: true,
    get: () => historyNavigation.location.value,
  })

  Object.defineProperty(routerHistory, 'state', {
    enumerable: true,
    get: () => historyNavigation.state.value,
  })

  return routerHistory
}
```

