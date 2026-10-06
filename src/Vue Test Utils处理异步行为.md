在 `wrapper` 上调用某些方法时，例如 `trigger` 和 `setValue`，你可能会注意到指南中的其他部分使用了 `await`。为什么需要这样做呢？

Vue 是被动更新的：当你更改一个值时，DOM 会自动更新以反映最新的值。[Vue 以异步方式执行这些更新](https://v3.vuejs.org/guide/change-detection.html#async-update-queue)。相比之下，像 Jest 这样的测试运行程序则是同步执行代码的。这种异步和同步的差异可能会在测试中产生一些意外的结果。

## 一个简单的例子：使用`trigger`进行更新

让我们通过一个简单的例子来说明这一点。假设我们有一个 `<Counter>` 组件：

```tsx
const Counter = {
  template: `
    <p>Count: {{ count }}</p>
    <button @click="handleClick">Increment</button>
  `,
  data() {
    return { count: 0 }
  },
  methods: {
    handleClick() {
      this.count += 1
    }
  }
}
```

现在，我们编写一个测试来验证 `count` 是否增加：

```tsx
test('increments by 1', () => {
  const wrapper = mount(Counter)
  wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('Count: 1')
})
```

令人惊讶的是，这个测试会失败。这是因为尽管`count`已经增加，但 Vue 在下一个事件循环的 tick 之前不会更新 DOM。因此，断言 (`expect()...`) 会在 Vue 更新 DOM 之前调用。

> 关于这一 JavaScript 核心行为，[可以阅读更多关于事件循环及其宏任务和微任务的信息](https://javascript.info/event-loop#macrotasks-and-microtasks)。

## 使用`nextTick`保障 DOM 更新

Vue 提供了一种等待 DOM 更新的方法：`nextTick`。让我们改进一下测试：

```ts
import { nextTick } from 'vue'

test('increments by 1', async () => {
  const wrapper = mount(Counter)
  wrapper.find('button').trigger('click')
  await nextTick()
  expect(wrapper.html()).toContain('Count: 1')
})
```

现在测试将通过，因为我们确保了下一个“tick”已执行，并且 DOM 在断言运行之前已更新。

为了简化这种常见的情况，Vue Test Utils 提供了一种快捷方式。导致 DOM 更新的方法，例如 `trigger` 和 `setValue` 返回 `nextTick`，因此你只需 `await` 这些方法即可：

```ts
test('increments by 1', async () => {
  const wrapper = mount(Counter)
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('Count: 1')
})
```

## 处理其他异步行为

虽然 `nextTick` 对于确保 Vue 数据的某些更改反映在 DOM 中非常有用，但有时你可能需要确保其他非 Vue 相关的异步行为也完成。

一个常见的示例是返回 `Promise` 的函数。也许你使用 `jest.mock` 模拟了你的 `axios` HTTP 客户端：

```ts
jest.spyOn(axios, 'get').mockResolvedValue({ data: 'some mocked data!' })
```

在这种情况下，Vue 不知道未解决的 Promise，因此调用 `nextTick` 将不起作用——你的断言可能会在 Promise 解决之前运行。对于这种情况，Vue Test Utils 提供了 [`flushPromises`](https://test-utils.vuejs.org/api/#flushPromises)，使所有未完成的 Promise 立即解决。

示例：

```ts
import { flushPromises } from '@vue/test-utils'
import axios from 'axios'

jest.spyOn(axios, 'get').mockResolvedValue({ data: 'some mocked data!' })

test('uses a mocked axios HTTP client and flushPromises', async () => {
  const wrapper = mount(AxiosComponent)
  await flushPromises()
  // 此时，axios 请求已解决，可以继续断言
})
```

> 有关组件测试请求的更多信息，可以查看 [发出 HTTP 请求](https://test-utils.vuejs.org/guide/advanced/http-requests.html) 指南。

## 测试异步 `setup`

如果你的组件使用异步 `setup`，则必须将该组件装载到 `Suspense` 组件中。以下是示例：

```ts
const Async = defineComponent({
  async setup() {
    // 等待一些异步操作
  }
})
```

测试此组件时，可以这样写：

```tsx
test('Async component', async () => {
  const TestComponent = defineComponent({
    components: { Async },
    template: '<Suspense><Async/></Suspense>'
  })

  const wrapper = mount(TestComponent)
  await flushPromises()
  // 其他测试逻辑
})
```

注意：要访问 `Async` 组件的 `vm` 实例，请使用 `wrapper.findComponent(Async)` 的返回值。由于我们在测试中定义并装载了一个新组件，因此 `mount(TestComponent)` 返回的包装器包含其自己的（空）`vm`。

## 总结

- Vue 异步更新 DOM，而测试运行程序是同步执行代码的。
- 使用 `await nextTick()` 确保 DOM 在测试继续之前已更新。
- 可能更新 DOM 的函数（如 `trigger` 和 `setValue`）返回 `nextTick`，需要 `await` 它们。
- 使用 Vue Test Utils 中的 `flushPromises` 来解决非 Vue 依赖项的未解析 Promise（如 API 请求）。
- 使用 `Suspense` 在异步测试函数中测试异步 `setup` 组件。

通过这些策略，你可以确保 Vue 组件在测试时按预期更新和运行，从而获得可靠的测试结果。
