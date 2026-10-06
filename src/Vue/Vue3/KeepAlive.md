# KeepAlive 使用及其原理

非活跃的组件将会被缓存，即保存被包裹组件的状态（保活）

在切换时创建新的组件实例通常是有意义的，但在这个例子中，我们的确想要组件能在被“切走”的时候保留它们的状态。要解决这个问题，我们可以用 `<KeepAlive>` 内置组件将这些动态组件包装起来：

```vue
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

现在，在组件切换时状态也能被保留了：

> **component 动态组件：**
>
> 被传给 `:is` 的值可以是以下几种：
>
> - 被注册的组件名
> - 导入的组件对象

### 组件匹配

`<KeepAlive>` 默认会缓存内部的所有组件实例，但我们可以通过 `include` 和 `exclude` prop 来定制该行为。这两个 prop 的值都可以是：

- 字符串
- 正则表达式
- 包含这两种类型的一个数组

```vue
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

它会根据组件的 [`name`](https://cn.vuejs.org/api/options-misc.html#name) 选项进行匹配，所以组件如果想要条件性地被 `KeepAlive` 缓存，就必须显式声明一个 `name` 选项。

在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项，无需再手动声明。当你在使用单文件组件时，组件已经会根据其文件名推导出其名称。举例来说，一个名为 `MyComponent.vue` 的文件会推导出显示名称为“MyComponent”。有一种场景下 `name` 必须是已显式声明的：即 [`KeepAlive`](https://cn.vuejs.org/guide/built-ins/keep-alive.html) 通过其 `include / exclude` prop 来匹配其需要缓存的组件时。

### 缓存数

我们可以通过传入 `max` prop 来限制可被缓存的最大组件实例数。`<KeepAlive>` 的行为在指定了 `max` 后类似一个 [LRU 缓存](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU))（最近访问缓存）

### 独有生命周期

一个持续存在的组件可以通过 [`onActivated()`](https://cn.vuejs.org/api/composition-api-lifecycle.html#onactivated) 和 [`onDeactivated()`](https://cn.vuejs.org/api/composition-api-lifecycle.html#ondeactivated) 注册相应的两个状态的生命周期钩子：

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>
```

请注意：

- **`onActivated` 在组件挂载时也会调用，并且 `onDeactivated` 在组件卸载时也会调用。**
- **这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件。（被继承）**
