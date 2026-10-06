> 标题：Using localStorage in Modern Applications: A Comprehensive Guide
>
> 作者：[RxDB - JavaScript Database | RxDB - JavaScript Database](https://rxdb.info/)
>
> 链接：https://rxdb.info/articles/localstorage.html

在谈到Web应用程序中的客户端存储时，localStorage API作为一种简单且广泛支持的解决方案脱颖而出。它允许开发人员直接在用户的浏览器中存储键值对。在本文中，我们将探讨localStorage API的各个方面，其优势、局限性以及现代应用程序可用的替代存储选项。


### 什么是localStorage API

localStorage API是Web浏览器的内置功能，它使Web开发人员能够在用户设备上持久地存储少量数据。它基于简单的键值对操作，允许开发人员保存字符串、数字和其他简单数据类型。即使用户关闭浏览器或离开页面，这些数据仍然可用。该API提供了一种方便的方式来维护状态并存储用户偏好，而无需依赖服务器端存储。

### 探索本地存储方法：实际案例

让我们深入一些实际的代码示例，以更好地了解如何利用 `localStorage` 的功能。该 API 提供了几种交互方法，包括 `setItem`、`getItem`、`removeItem` 和 `clear`。考虑以下代码片段：

```js
// 使用 setItem 存储数据
localStorage.setItem('username', 'john_doe');

// 使用 getItem 检索数据
const storedUsername = localStorage.getItem('username');

// 使用 removeItem 删除数据
localStorage.removeItem('username');

// 清除所有数据
localStorage.clear();
```

### 使用 JSON 序列化在 JavaScript 中存储复杂数据

虽然 js 的 localStorage 擅长处理简单的键值对，但它也支持通过 JSON 序列化来进行更复杂的数据存储。通过利用 `JSON.stringify` 和 `JSON.parse`，我们可以存储和检索结构化数据，如对象和数组。以下是一个存储文档的示例：

```js
const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com'
};

// 存储一个Uer对象
localStorage.setItem('user', JSON.stringify(user));

// 获取并解析该对象
const storedUser = JSON.parse(localStorage.getItem('user'));

```

### 了解本地存储的限制

尽管本地存储（localStorage）非常方便，但开发人员应该意识到它存在一系列限制：

**非异步阻塞式 API：**一个重要的缺点是，JavaScript 的 localStorage 操作是作为一个非异步阻塞式 API 运行的。这意味着对 localStorage 执行的任何操作都有可能阻塞主线程，导致应用性能变慢，用户体验不佳。

**有限的数据结构：**与更高级的数据库不同，localStorage 仅限于简单的键-值存储。这种限制使其不适合存储复杂的数据结构或管理数据元素之间的关系。

**字符串化开销：**在 localStorage 中存储 JSON 数据需要在存储之前对数据进行字符串化，并在检索时对其进行解析。这个过程会引入性能开销，可能使操作变慢多达 10 倍。

**缺乏索引：**localStorage 缺乏索引功能，这使得根据特定条件执行高效搜索或遍历数据变得困难。这种限制可能会妨碍依赖于复杂数据检索的应用程序。

**标签阻塞：**在多标签环境中，<u>一个标签的 localStorage 操作可能会影响其他标签的性能</u>，通过垄断 CPU 资源。你可以通过在两个浏览器窗口中打开此[测试文件](https://pubkey.github.io/client-side-databases/database-comparison/index.html)并在其中一个触发 localStorage 插入来重现此行为。你会观察到指示器在两个窗口中都会卡住。

**存储限制：**浏览器通常为每个来源的 localStorage 强加大约 [5 MiB](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#web_storage) 的存储限制。

### 仍然使用 localStorage 的原因

#### localStorage 是否运行缓慢？

与对性能的担忧相反，在与 IndexedDB 或 OPFS 等替代存储解决方案相比，JavaScript 中的 localStorage API 在处理**小键值分配时表现出色**。它在高效处理小键值分配方面表现出色。由于其与浏览器的简单直接集成，访问和修改 localStorage 数据所产生的开销很小。对于需要快速和简单数据存储的情况，localStorage 仍然是一个可行的选择。例如，RxDB 在 localStorage 元优化器中使用 localStorage 来管理简单的键值对，同时将“正常”文档存储在类似 IndexedDB 的另一个存储中。

### 何时不使用 localStorage

虽然 localStorage 提供了便利，但它可能并不适合每个用例。请考虑以下替代方法可能更合适的情况：

- **数据必须是可查询的**：如果应用程序严重依赖基于特定条件查询数据，则 localStorage 可能无法提供必要的查询功能。复杂的数据检索可能会导致代码效率低下和性能下降。
- **大型 JSON 文档**：在 localStorage 中存储大型 JSON 文档会消耗大量内存并降低性能。必须评估你打算存储的数据大小，并考虑使用更强大的解决方案来处理大量数据集。
- **大量读/写操作**：localStorage 上过多的读写操作会导致性能瓶颈。其他存储解决方案可能会为需要频繁处理数据的应用程序提供更好的性能和可伸缩性。
- **缺乏持久性**：如果应用程序可以在没有跨会话的持久性数据的情况下运行，请考虑使用内存中的数据结构，如 `new Map()` 或 `new Set()`这些选项为瞬态数据提供了速度和效率。

## 在 JavaScript 中使用什么来代替 localStorage API

### localStorage 与 IndexedDB

虽然 **localStorage** 是满足更简单数据需求的可靠存储解决方案，但在处理更复杂的需求时，探索 **IndexedDB** 等替代方案至关重要。**IndexedDB** 不仅可以存储键值对，还可以存储 JSON 文档。与 localStorage 不同，localStorage 通常每个域的存储限制约为 5-10MB，而 IndexedDB 可以处理更大的数据集。IndexDB 支持索引，有助于高效查询，使范围查询成为可能。但是，值得注意的是，IndexedDB 缺乏可观测性，这是 localStorage 通过`storage`复杂的查询可能会给 IndexedDB 带来挑战，虽然它的性能是可以接受的，但对于某些用例来说，IndexedDB 可能[太慢](https://rxdb.info/slow-indexeddb.html)事件独有的功能。也 了。

```js
// localStorage 可以通过 storage 事件观察更改。
// 这个功能在 IndexedDB 中缺失
addEventListener("storage", (event) => {});
```

对于那些希望利用 IndexedDB 的全部功能并添加更多功能的人，建议使用 [RxDB](https://rxdb.info/) 或 [Dexie.js](https://rxdb.info/rx-storage-dexie.html) 等包装库。这些库通过复杂查询和可观测性等功能增强了 IndexedDB，增强了其对现代应用程序的可用性。

总之，当比较 IndexedDB 和 localStorage 时，IndexedDB 将在处理大量数据的任何情况下获胜，而 localStorage 在较小的键值数据集上具有更好的性能。

### **文件系统 API (OPFS)**

OPFS 提供了令人印象深刻的性能优势。然而，使用 OPFS API 可能很复杂，并且只能在 **WebWorker** 中访问。为了简化其使用并扩展其功能，请考虑使用像 [RxDB 的 OPFS RxStorage](https://rxdb.info/rx-storage-opfs.html)另一个有趣的选项是 OPFS（文件系统 API）。该 API 提供对基于源的沙盒文件系统的直接访问，该文件系统针对性能进行了高度优化，并提供对其内容的就地写入访问。 这样的包装器库，它在 OPFS API 之上构建了一个综合数据库。这种抽象允许你利用 OPFS API 的强大功能，而无需复杂的直接使用。

### localStorage vs Cookies

Cookie 曾经是客户端数据存储的主要方法，但由于其局限性，在现代 Web 开发中已经失宠。虽然它们可以存储数据，但与 localStorage API 相比，它们**的速度要慢 100 倍**左右。此外，HTTP 标头中包含 cookie，这可能会影响网络性能。因此，不建议将 cookie 用于现代 Web 应用程序中的数据存储目的。

### localStorage vs WebSQL

尽管 WebSQL 为客户端数据存储提供了基于 SQL 的接口，但它是一种**不推荐使用的技术**，应该避免使用。它的 API 已经从现代浏览器中逐步淘汰，并且缺乏 IndexedDB 等替代品的健壮性。此外，WebSQL 往往比 IndexedDB 慢 10 倍左右，对于需要高效数据操作和检索的应用程序来说，它不是一个最佳选择。

### localStorage vs sessionStorage

在不需要会话之外的数据持久性的情况下，开发人员通常会求助于 sessionStorage。此存储机制仅在选项卡或浏览器会话期间保留数据。它可以在页面重新加载和恢复中幸存下来，为临时数据需求提供方便的解决方案。但是，请务必注意，sessionStorage 的范围有限，可能不适合所有场景。

### **用于 React Native 的 AsyncStorage**

对于 React Native 开发人员来说，[AsyncStorage API](https://reactnative.dev/docs/asyncstorage) 是首选解决方案，它反映了 localStorage 的行为，但具有异步支持。由于并非所有 JavaScript 运行时都支持 localStorage，因此 AsyncStorage 为 React Native 应用程序中的数据持久性提供了一种无缝的替代方案。

### Node.js 中使用 `node-localstorage`  

由于 **Node.js** JavaScript 运行时中缺少本机 localStorage，因此将收到错误 `ReferenceError: localStorage is not defined`在 Node.js 或基于节点的运行时（如 Next.js）中定义。[node-localstorage npm 包](https://github.com/lmaccherone/node-localstorage)弥合了这一差距。此软件包在Node.js环境中复制浏览器的 localStorage API，确保一致且兼容的数据存储功能。

### **localStorage 在浏览器扩展中**

虽然 chrome 和 firefox 的浏览器扩展支持 localStorage API，但不建议在浏览器插件上下文中使用它来存储与扩展相关的数据。在许多情况下，浏览器会清除数据，例如当用户清除浏览历史记录时。

相反，应该使用 [Extension Storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage#properties) 扩展存储API来开发浏览器扩展。与 localStorage 相比，存储 API 是异步工作的，所有操作都返回 Promise。此外，它提供自动同步功能，可以在用户登录的所有浏览器实例之间复制数据。存储 API 甚至可以存储可转换为 JSON 的对象，而不仅仅是普通字符串。"

```ts
await chrome.storage.local.set({ foobar: {nr: 1} });

const result = await chrome.storage.local.get('foobar');
console.log(result.foobar); // {nr: 1}
```

#### **deno 和 Bun 中的 localStorage**

**Deno** JavaScript 运行时有一个有效的 localStorage API，因此运行 `localStorage.setItem()` 和其他方法将正常工作，并且本地存储的数据会在多次运行中持久化。

**Bun** 不支持 localStorage JavaScript API。尝试使用 `localStorage` 将出现错误，并显示 `ReferenceError: Can't find variable: localStorage`。要在 Bun 中本地存储数据，你可以改用 `bun:sqlite` 模块，也可以直接使用支持 Bun 的 JavaScript 数据库（如 [RxDB](https://rxdb.info/)）

## **结论：选择正确的存储解决方案**

在现代 Web 开发的世界中，**localStorage** 是轻量级数据存储的宝贵工具。它的简单性和速度使其成为小型键值分配的绝佳选择。但是，随着应用程序复杂性的增加，开发人员必须仔细评估其存储需求。对于需要高级查询、复杂数据结构或大容量操作的方案，IndexedDB、具有附加功能的包装库（如 [RxDB）](https://rxdb.info/)或特定于平台的 API 等替代方案提供了更强大的解决方案。通过了解各种存储选项的优势和局限性，开发人员可以做出明智的决策，为高效和可扩展的应用程序铺平道路。

## 更进一步

- 在 [RxDB 快速入门](https://rxdb.info/quickstart.html) 中了解如何使用 RxDB 存储和查询数据
- [为什么 IndexedDB 很慢以及如何修复它](https://rxdb.info/slow-indexeddb.html)
- [RxStorage性能比较](https://rxdb.info/rx-storage-performance.html)
