---
date: 2022-05-12
category:
- Vue
---

# `Vue.set()`和`this.$set()`

> 用以解决Vue2.x的响应式缺陷

受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。

正确写法：this.$set(this.data,”key”,value')

```js
mounted () {
  this.$set(this.student,"age", 24)
}
```

> Vue 不允许动态添加根级响应式属性

```js
const app = new Vue({
  data: {
    a: 1
  }
  // render: h => h(Suduko)
}).$mount('#app1')

Vue.set(app.data, 'b', 2)
```

只可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性，例如

```js
var vm=new Vue({
    el:'#test',
    data:{
        //data中已经存在info根属性
        info:{
            name:'小明';
        }
    }
});
//给info添加一个性别属性
Vue.set(vm.info,'sex','男');
```

## Vue.set()和this.$set()实现原理

我们先来看看Vue.set()的源码：

```js
import { set } from '../observer/index'


Vue.set = set
```

再来看看this.$set()的源码：

```js
import { set } from '../observer/index'


Vue.prototype.$set = set
```

结果我们发现Vue.set()和`this.$set()`这两个api的实现原理基本一模一样，都是使用了set函数。set函数是从 ../observer/index 文件中导出的，区别在于Vue.set()是将set函数绑定在Vue构造函数上，`this.$set()`是将set函数绑定在Vue原型上。

```ts
function set (target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

我们发现set函数接收三个参数分别为 target、key、val，其中target的值为数组或者对象，这正好和官网给出的调用Vue.set()方法时传入的参数参数对应上。
