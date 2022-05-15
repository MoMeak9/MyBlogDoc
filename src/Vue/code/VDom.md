# Vue VDom

## Vue 虚拟 DOM 执行流程

我们从虚拟 DOM 在 Vue 的执行流程开始讲起。在 Vue 中，我们使用虚拟 DOM 来描述页面的组件，比如下面的 template 虽然格式和 HTML 很像，但是在 Vue 的内部会解析成 JavaScript 函数，这个函数就是用来返回虚拟 DOM：

```vue
<div id="app">
  <p>hello world</p>
  <Rate :value="4"></Rate>
</div>
```

上面的 template 会解析成下面的函数，最终返回一个 JavaScript 的对象能够描述这段 HTML：

```js
function render(){
  return h('div',{id:"app"},children:[
    h('p',{},'hello world'),
    h(Rate,{value:4}),
  ])
}
```

## DOM 的创建

在代码中，我们使用 createVNode 函数创建项目的虚拟 DOM，可以看到 **Vue 内部的虚拟 DOM，也就是 vnode，就是一个对象，通过 type、props、children 等属性描述整个节点：**

```ts
const vnode = createVNode(    
  rootComponent as ConcreteComponent,
  rootProps
)
function _createVNode() {

  // 处理属性和class
  if (props) {
    ...
  }

  // 标记vnode信息
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : __FEATURE_SUSPENSE__ && isSuspense(type)
    ? ShapeFlags.SUSPENSE
    : isTeleport(type)
    ? ShapeFlags.TELEPORT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : isFunction(type)
    ? ShapeFlags.FUNCTIONAL_COMPONENT
    : 0

  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  )
}

function createBaseVNode(type,props,children,...){
    const vnode = {
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    children,
    shapeFlag,
    patchFlag,
    dynamicProps,
     ...
  } as VNode
  // 标准化子节点
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children)
  } else if (children) {
    vnode.shapeFlag |= isString(children)
      ? ShapeFlags.TEXT_CHILDREN
      : ShapeFlags.ARRAY_CHILDREN
  }
  return vnode
}componentUpdateFn
```

createVNode 负责创建 Vue 中的虚拟 DOM，而上一讲中我们讲过 mount 函数的核心逻辑就是使用 setupComponent 执行我们写的

我们给组件注册了 update 方法，这个方法使用 effect 包裹后，当组件内的 ref、reactive 包裹的响应式数据变化的时候就会执行 update 方法，触发组件内部的更新机制。

看下面的代码，在 setupRenderEffect 内部的 componentUpdateFn 中，updateComponentPreRenderer 更新了属性和 slots，并且调用 renderComponentRoot 函数创建新的子树对象 nextTree，然后内部依然是调用 patch 函数。

**Vue 源码中的实现首次渲染和更新的逻辑都写在一起，我们在递归的时候如果对一个标签实现更新和渲染，就可以用一个函数实现。**

```ts

const componentUpdateFn = ()=>{
  if (!instance.isMounted) {
      //首次渲染
      instance,
        parentSuspense,
        isSVG
      )
      。。。
  }else{
    let { next, bu, u, parent, vnode } = instance
    if (next) {
      next.el = vnode.el
      updateComponentPreRender(instance, next, optimized)
    } else {
      next = vnode
    }
    const nextTree = renderComponentRoot(instance)
      patch(
        prevTree,
        nextTree,
        // parent may have changed if it's in a teleport
        hostParentNode(prevTree.el!)!,
        // anchor may have changed if it's in a fragment
        getNextHostNode(prevTree),
        instance,
        parentSuspense,
        isSVG
      )
    }
}

// 注册effect函数
const effect = new ReactiveEffect(
  componentUpdateFn,
  () => queueJob(instance.update),
  instance.scope // track it in component's effect scope
)
const update = (instance.update = effect.run.bind(effect) as S      chedulerJob)
update()

  const updateComponentPreRender = (
    instance: ComponentInternalInstance,
    nextVNode: VNode,
    optimized: boolean
  ) => {
    nextVNode.component = instance
    const prevProps = instance.vnode.props
    instance.vnode = nextVNode
    instance.next = null
    updateProps(instance, nextVNode.props, prevProps, optimized)
    updateSlots(instance, nextVNode.children, optimized)

    pauseTracking()
    // props update may have triggered pre-flush watchers.
    // flush them before the render update.
    flushPreFlushCbs(undefined, instance.update)
    resetTracking()
  }
```

比较关键的就是上面代码中 32-39 行的 **effect 函数，负责注册组件，这个函数也是 Vue 组件更新的入口函数。**

## patch 函数

数据更新之后就会执行 patch 函数，下图就是 patch 函数执行的逻辑图：

![img](https://cdn.yihuiblog.top/images/202205151821492.jpeg)