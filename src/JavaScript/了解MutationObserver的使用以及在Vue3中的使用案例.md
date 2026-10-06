# MutationObserver的使用以及在Vue3中的使用案例

MutationObserver 是一种浏览器提供的 API，可以在 DOM 的一部分改变时通知我们。在本博客中，我们将逐步讨论如何在常规 JavaScript 和 Vue3 中使用 MutationObserver，并提供一些实际使用案例。

## MutationObserver 介绍

MutationObserver 是 JavaScript 中允许我们监视 DOM 变化的一种 API。当被观察的 DOM 中发生任何变化时，它就会通知我们。这可以帮助我们更轻松地处理动态 DOM 变化的情况。

基本上，MutationObserver 类的实例用于对 DOM 文档进行监听，当被监听的 DOM 树内容发生任何变动时，包括子树的修改、节点属性的更改，或者文本内容的变化，都能及时触发回调函数。

## 如何使用 MutationObserver

在使用 MutationObserver 之前，我们首先需要创建一个新的 `MutationObserver` 实例。然后，我们需要指定一个回调函数作为其参数，该函数将在 DOM 改变时执行。

```javascript
var observer = new MutationObserver(callback);
```

这个 `callback` 函数接收两个参数：一个是 `mutations` 数组，用于保存所有发生的变化的列表；另一个是观察者对象本身，可以用于停止或开始观察。

```javascript
function callback(mutations, observer) {
  mutations.forEach(mutation => {
    console.log(mutation);
  });
}
```

然后，我们需要选择要观察的 DOM 元素，并指定要观察的变化类型。`observe()` 方法接受两个参数：要观察的 DOM 节点和一个用于指定哪些变化将被观察的配置对象。

```javascript
var targetNode = document.getElementById('some-id');
observer.observe(targetNode, { childList: true, subtree: true });
```

在上述例子中，配置对象 `{ childList: true, subtree: true }` 表示我们将观察到目标节点的子节点的变化，以及子节点树下的所有更深层次的变化。

然后，我们可以禁用或启用观察器。例如，`disconnect()` 方法可以用来停止观察：

```javascript
observer.disconnect();
```

再次启动观察，只需再次调用 `observe()` 方法。

## Vue3 中的使用案例

在 Vue3 中使用 MutationObserver 与在普通 JavaScript 中使用 MutationObserver 相同。考虑到 Vue3 的一些新特性，实例使用可能会略有不同。看一下下面的例子：

```javascript
import { onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const targetNode = document.getElementById('some-id');
    const config = { childList: true, subtree: true };
    
    const observer = new MutationObserver((mutations, observer) => {
      mutations.forEach(mutation => {
        console.log(mutation);
      });
    });

    onMounted(() => {
      observer.observe(targetNode, config);
    });

    onUnmounted(() => {
      observer.disconnect();
    });
  },
};
```

在这个 Vue3 示例中，我们首先导入了 `onMounted` 和 `onUnmounted` 生命周期钩子。然后在 `setup` 函数中创建了一个 `MutationObserver` 实例。

在组件加载完成（`onMounted`）时，我们开始对目标节点进行观察。然后，当组件卸载（`onUnmounted`）时，我们停止了观察。

这样，就可以在 Vue3 组件中有效地使用 MutationObserver 来观察和响应 DOM 的变化。

## 结论

MutationObserver 是一个强大的 API，允许我们观察 DOM 的变化。无论是在普通的 JavaScript 中还是在 Vue3 中，都可以有效利用它来增强交互和动态响应。

但请注意，尽管 MutationObserver 是一个有用的工具，却不应该过度使用它。过度监测 DOM 变化可能会导致性能问题。因此，使用时要根据真正需要来进行合理配置。