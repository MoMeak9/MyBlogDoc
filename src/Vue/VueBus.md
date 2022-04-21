---
---
# VueBus 总线传参数
## 简介

vue组件非常常见的有父子组件通信，兄弟组件通信。而父子组件通信就很简单，父组件会通过 `props` 向下传数据给子组件，当子组件有事情要告诉父组件时会通过 `$emit` 事件告诉父组件。今天就来说说如果两个页面没有任何引入和被引入关系，该如何通信了？

如果咱们的应用程序不需要类似Vuex这样的库来处理组件之间的数据通信，就可以考虑Vue中的 `事件总线` ，即 **`EventBus`**来通信。

## 什么是EventBus

`EventBus` 又称为事件总线。在Vue中可以使用 `EventBus` 来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件，但也就是太方便所以若使用不慎，就会造成难以维护的“灾难”，因此才需要更完善的Vuex作为状态管理中心，将通知的概念上升到共享状态层次。

## 如何使用EventBus

### 一、初始化

**首先需要创建事件总线并将其导出，以便其它模块可以使用或者监听它**。我们可以通过两种方式来处理。先来看第一种，新创建一个 .js 文件，比如 `event-bus.js`or`Bus.js`

```javascript
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```

实质上`EventBus`是一个不具备 `DOM` 的组件，它具有的仅仅只是它实例方法而已，因此它非常的轻便。

另外一种方式，可以直接在项目中的 `main.js` 初始化 `EventBus` :

```javascript
// main.js
Vue.prototype.$EventBus = new Vue()
```

> 注意，这种方式初始化的 `EventBus` 是一个 `全局的事件总线` 。稍后再来聊一聊全局的事件总线。

现在我们已经创建了 `EventBus` ，接下来你需要做到的就是在你的组件中加载它，并且调用同一个方法，就如你在父子组件中互相传递消息一样。

### 二、发送和接受事件

其实和父子组件的通信差不多,用 `EventBus.$emit('emit事件名'，数据) `发送， `EventBus.$on("emit事件名", callback(payload1,…))` 接受

```vue
// 发送消息
EventBus.$emit(channel: string, callback(payload1,…))

// 监听接收消息
EventBus.$on(channel: string, callback(payload1,…))
```

现在假设 A 组件与 B 组件通信

```vue
<!-- A.vue -->
<template>
    <p>{{msgB}}</p>
    <button @click="sendMsgA()">-</button>
</template>

<script> 
import { EventBus } from "../Bus.js";
export default {
    data(){
        return {
        msg: ''
        }
    },
    mounted() {
        EventBus.$on("bMsg", (msg) => {
            // a组件接受 b发送来的消息
            this.msg = msg;
        });
    },
    methods: {
        sendMsgA() {
            EventBus.$emit("aMsg", '来自A页面的消息'); // a 发送数据
        }
    }
}; 
</script>


<!-- B.vue -->
<template>
  <p>{{msgA}}</p>
    <button @click="sendMsgB()">-</button>
</template>

<script> 
import { EventBus } from "../event-bus.js";
export default {
    data(){
        return {
        msg: ''
        }
    },
    mounted() {
        EventBus.$on("aMsg", (msg) => {
            // b组件接受 a发送来的消息
            this.msg = msg;
        });
    },
    methods: {
        sendMsgB() {
            EventBus.$emit("bMsg", '来自b页面的消息'); // b发送数据
        }
    }
};
</script>
```

如果只监听(接受)一次数据可以使用 `EventBus.$once('事件名', callback(payload1,…)`

前面提到过，如果使用不善，`EventBus` 会是一种灾难，到底是什么样的`“灾难”`了？大家都知道vue是单页应用，如果你在某一个页面刷新了之后，与之相关的`EventBus`会被移除，这样就导致业务走不下去。还要就是如果业务有反复操作的页面，`EventBus` 在监听的时候就会触发很多次，也是一个非常大的隐患。这时候我们就需要好好处理 `EventBus` 在项目中的关系。通常会用到，在vue页面销毁时，同时移除`EventBus` 事件监听

### 三、移除移除事件监听者

EventBus.$off('事件名', 回调函数)

- `EventBus.$off('事件名', callback)`，只移除这个回调的监听器。
- `EventBus.$off('事件名')`，移除该事件所有的监听器。
- `EventBus.$off()`， 移除所有的事件监听器，注意不需要添加任何参数。

```vue
// 导入我们刚刚创建的 EventBus
import { EventBus } from '../Bus.js'

// 事件监听函数
const clickHandler = function(clickCount) {
  console.log(`Oh, hello)`)
}

// 开始监听事件
EventBus.$on('i-got-clicked', clickHandler);

// 停止监听
EventBus.$off('i-got-clicked', clickHandler);
```

### 四、全局EventBus

全局EventBus，虽然在某些示例中不提倡使用，但它是一种非常漂亮且简单的方法，可以跨组件之间共享数据。

它的工作原理是发布/订阅方法，通常称为 Pub/Sub 。

由于是全局的，必然所有事件都订阅它, 所有组件也发布到它，订阅组件获得更新。也就是说所有组件都能够将事件发布到总线，然后总线由另一个组件订阅，然后订阅它的组件将得到更新。

#### 创建全局EventBus

全局事件总线只不过是一个简单的 vue 组件。

```
var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})
// 这个初始化的第一种方法，个人感觉区别不大
```

#### 使用 `$on`和`$emit`

在这个特定的总线中使用两个方法。一个用于创建发出的事件，它就是`$emit`；另一个用于订阅`$on`：

```vue
this.$bus.$emit('nameOfEvent',{ ... pass some event data ...});

this.$bus.$on('nameOfEvent',($event) => {
    // ...
})
```

### EventBus的优缺点

#### 缺点

- 大家都知道vue是单页应用，如果你在某一个页面刷新了之后，与之相关的EventBus会被移除，这样就导致业务走不下去。
- 如果业务有反复操作的页面，EventBus在监听的时候就会触发很多次，也是一个非常大的隐患。这时候我们就需要好好处理EventBus在项目中的关系。通常会用到，在vue页面销毁时，同时移除EventBus事件监听。
- 由于是都使用一个Vue实例，所以容易出现重复触发的情景，两个页面都定义了同一个事件名，并且没有用$off销毁（常出现在路由切换时）。

#### 优点

- 解决了多层组件之间繁琐的事件传播。
- 使用原理十分简单，代码量少。

## 参考

> [使用 Vue.js 创建全局事件总线](https://learnku.com/vuejs/t/23292/creating-a-global-event-bus-using-vuejs)
>
> [**Vue事件总线（EventBus）使用详细介绍**](http://www.imooc.com/article/289043)
>
> [Vue事件总线（EventBus）使用详细介绍](https://zhuanlan.zhihu.com/p/72777951)
>
> [vue -- 事件总线 EventBus](https://segmentfault.com/a/1190000021707081)





{
  "title": "RG-RAP1200(FE)产品说明书",
  "type: "images",
  "tabs": [
    { "name": "产品信息", "key": "xinxi"， index‘：“1’ },
    { "name": "产品安装", "key": "anzhuang" },
    { "name": "接口及组网方式", "key": "wangkoulianjie" },
    { "name": "网络配置", "key": "peizhi" },
    { "name": "指示灯说明", "key": "zhishideng" },
    { "name": "售后服务", "key": "shouhou" }
  ],
  "contents":{
      “ xinxi”: [  " sadasda","aasdasdasdasd"],"anzhuang":[]

   }
}
