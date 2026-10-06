### pinia

### onServerPrefetch()  钩子

注册一个异步函数，在组件实例在服务器上被渲染之前调用。

- **类型**

  ```ts
  function onServerPrefetch(callback: () => Promise<any>): void
  ```

- **详细信息**

  如果这个钩子返回了一个 Promise，服务端渲染会在渲染该组件前等待该 Promise 完成。

  这个钩子仅会在服务端渲染中执行，可以用于执行一些仅存在于服务端的数据抓取过程。

- **示例**

  ```vue
  <script setup>
  import { ref, onServerPrefetch, onMounted } from 'vue'
  
  const data = ref(null)
  
  onServerPrefetch(async () => {
    // 组件作为初始请求的一部分被渲染
    // 在服务器上预抓取数据，因为它比在客户端上更快。
    data.value = await fetchOnServer(/* ... */)
  })
  
  onMounted(async () => {
    if (!data.value) {
      // 如果数据在挂载时为空值，这意味着该组件
      // 是在客户端动态渲染的。将转而执行
      // 另一个客户端侧的抓取请求
      data.value = await fetchOnClient(/* ... */)
    }
  })
  </script>
  ```