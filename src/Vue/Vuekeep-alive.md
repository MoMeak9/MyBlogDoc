
## 什么是 `keep-alive`

在平常开发中，有部分组件没有必要多次初始化，这时，我们需要将组件进行持久化，**使组件的状态维持不变**，在下一次展示时，也不会进行重新初始化组件。

也就是说，`keepalive` 是 `Vue` 内置的一个组件，可以**使被包含的组件保留状态，或避免重新渲染** 。也就是所谓的**组件缓存**

`<keep-alive>`是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。

> `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 `DOM` 元素，也不会出现在父组件链中。

**prop:**

- include: 字符串或正则表达式。只有匹配的组件会被缓存。
- exclude: 字符串或正则表达式。任何匹配的组件都不会被缓存。

## `keep-alive`的声明周期执行

- 页面第一次进入，钩子的触发顺序

```
created-> mounted-> activated`，
 退出时触发 `deactivated ` 当再次进入（前进或者后退）时，只触发 `activated
```

- 事件挂载的方法等，只执行一次的放在 `mounted` 中；组件每次进去执行的方法放在 `activated` 中；

## 基本用法

```html
<!--被keepalive包含的组件会被缓存-->
<keep-alive>
    <component><component />
</keep-alive>
复制代码
```

被`keepalive`包含的组件不会被再次初始化，也就意味着**不会重走生命周期函数**
 但是有时候是希望我们缓存的组件可以能够再次进行渲染，这时 `Vue` 为我们解决了这个问题 被包含在 `keep-alive` 中创建的组件，会多出两个生命周期的钩子: `activated` 与 `deactivated`：

- `activated` 当 `keepalive` 包含的组件再次渲染的时候触发
- `deactivated` 当 `keepalive` 包含的组件销毁的时候触发

`keepalive`**是一个抽象的组件，缓存的组件不会被** `mounted`,**为此提供**`activated`**和**`deactivated`**钩子函数**

## 参数理解

`keepalive` 可以接收3个属性做为参数进行匹配对应的组件进行缓存:

- `include` 包含的组件(可以为字符串，数组，以及正则表达式,只有匹配的组件会被缓存)
- `exclude` 排除的组件(以为字符串，数组，以及正则表达式,任何匹配的组件都不会被缓存)
- `max` 缓存组件的最大值(类型为字符或者数字,可以控制缓存组件的个数)

**注：当使用正则表达式或者数组时，一定要使用 `v-bind`**

```html
<!-- 将（只）缓存组件name为a或者b的组件, 结合动态组件使用 -->
<keep-alive include="a,b">
  <component></component>
</keep-alive>

<!-- 组件name为c的组件不缓存(可以保留它的状态或避免重新渲染) -->
<keep-alive exclude="c"> 
  <component></component>
</keep-alive>

<!-- 使用正则表达式，需使用v-bind -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 动态判断 -->
<keep-alive :include="includedComponents">
  <router-view></router-view>
</keep-alive>

<!-- 如果同时使用include,exclude,那么exclude优先于include， 下面的例子只缓存a组件 -->
<keep-alive include="a,b" exclude="b"> 
  <component></component>
</keep-alive>

<!-- 如果缓存的组件超过了max设定的值5，那么将删除第一个缓存的组件 -->
<keep-alive exclude="c" max="5"> 
  <component></component>
</keep-alive>
复制代码
```

## 遇见 `vue-router` 结合`router`使用，缓存部分页面

### **所有路径下的视图组件都会被缓存**

```html
<keep-alive>
    <router-view>
        <!-- 所有路径匹配到的视图组件都会被缓存！ -->
    </router-view>
</keep-alive>
复制代码
```

### **如果只想要`router-view`里面的某个组件被缓存，怎么办？**

- 使用 `include`/`exclude`
- 使用 `meta` 属性

1、用 `include` (`exclude`例子类似)

> 缺点：需要知道组件的 name，项目复杂的时候不是很好的选择

```html
<keep-alive include="a">
    <router-view>
        <!-- 只有路径匹配到的 include 为 a 组件会被缓存 -->
    </router-view>
</keep-alive>
复制代码
```

2、使用 meta 属性

> 优点：不需要例举出需要被缓存组件名称

使用$route.meta的keepAlive属性：

```html
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
复制代码
```

需要在`router`中设置router的元信息meta：

```js
//...router.js
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/page1',
      name: 'Page1',
      component: Page1,
      meta: {
        keepAlive: true // 需要被缓存
      }
    }
  ]
})
复制代码
```

### 【加盐】使用 router.meta 拓展

假设这里有 3 个路由： A、B、C。

- 需求：
  - 默认显示 A
  - B 跳到 A，A 不刷新
  - C 跳到 A，A 刷新
- 实现方式
  - 在 A 路由里面设置 meta 属性：

```js
{
        path: '/',
        name: 'A',
        component: A,
        meta: {
            keepAlive: true // 需要被缓存
        }
}
复制代码
```

- 在 B 组件里面设置 beforeRouteLeave：

```js
export default {
        data() {
            return {};
        },
        methods: {},
        beforeRouteLeave(to, from, next) {
             // 设置下一个路由的 meta
            to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
            next();
        }
};
复制代码
```

- 在 C 组件里面设置 beforeRouteLeave：

```js
export default {
        data() {
            return {};
        },
        methods: {},
        beforeRouteLeave(to, from, next) {
            // 设置下一个路由的 meta
            to.meta.keepAlive = false; // 让 A 不缓存，即刷新
            next();
        }
};
复制代码
```

这样便能实现 B 回到 A，A 不刷新；而 C 回到 A 则刷新。

## 防坑指南

1.`keep-alive` 先匹配被包含组件的 `name` 字段，如果 `name` 不可用，则匹配当前组件 `components` 配置中的注册名称。 2.`keep-alive` 不会在函数式组件中正常工作，因为它们没有缓存实例。
 3.当匹配条件同时在 `include` 与 `exclude` 存在时，以 `exclude` 优先级最高(当前vue 2.4.2 version)。比如：包含于排除同时匹配到了组件A，那组件A不会被缓存。
 4.包含在 `keep-alive` 中，但符合 `exclude` ，不会调用 `activated` 和 `deactivated`。

### 实现前进刷新，后退不刷新

感谢 [iceuncle](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fu%2Fbeced864ad95) 分享的 [《vue实现前进刷新，后退不刷新》](https://juejin.im/post/6844903555657269261)。

## 总结

路由大法不错，不需要关心哪个页面跳转过来的，只要 router.go(-1) 就能回去，不需要额外参数。

在非单页应用的时候，`keep-alive` 并不能有效的缓存了= =

**keep-alive生命周期钩子函数：activated、deactivated**

使用`<keep-alive>`会将数据保留在内存中，如果要在每次进入页面的时候获取最新的数据，需要在`activated`阶段获取数据，承担原来`created`钩子中获取数据的任务。

## 附录

### 生命周期函数：就是vue在某个时间段会自动执行的函数

1. `beforeCreate(){}`在执行的时候，data还有methods都没有被初始化
2. `created(){}` data还有methods都被初始化好了，如果要调用 `methods` 方法或者操作 `data` 里面的数据，最早只能在 `created` 里面进行操作。
3. `beforeMount(){}` 表示模板已经在内存中编辑完成了，但是尚未渲染到模板页面中。即页面中的元素，没有被真正的替换过来，只是之前写的一些模板字符串。
4. `mounted(){}` 表示内存中模板已经真实的挂载到页面中去了，用户可以看到渲染好的界面了

- **注意这是一个生命周期函数的最后一个函数了，执行完这个函数表示 整个vue实例已经初始化完成了，组件脱离了创建阶段，进入运行阶段。**
- **下面是运行期间的两个生命周期函数的钩子：**

1. `beforeUpdate(){}` 表示我们的界面还没更新 但是data里面的数据是最新的。即页面尚未和最新的data里面的数据保持同步。
2. `updated(){}` 表示页面和data里面的数据已经包吃同步了 都是最新的。
3. `beforeDestory(){}` 当执行这个生命周期钩子的时候 vue的实例从运行阶段进入销毁阶段 此时实例身上的data 还有 methods处于可用的状态。
4. `destoryed(){}` 表示组件已经完全被销毁了 组件中所有的实例方法都是不能用了

## 参考：

- [issues#811](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-router%2Fissues%2F811)
- [vue#keep-alive](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23keep-alive)
- [vue2.0 keep-alive最佳实践](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000008123035)
