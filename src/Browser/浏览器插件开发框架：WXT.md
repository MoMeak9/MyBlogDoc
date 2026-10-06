## 什么是WXT

WXT 可以加快Chrome扩展程序的开发速度。它默认使用TypeScript来创建大型项目，自动化发布扩展程序，并提供工具来分析最终扩展程序包并最小化扩展程序的大小。该框架注重开发者体验，通过提供打包和发布工具、最佳开发模式、规范的项目结构等功能，简化Chrome扩展程序的开发流程。开发者可以更快地迭代、开发功能，而不是编写脚本，并充分利用JavaScript生态系统。此外，该框架还提供美观的命令行界面。

## 快速开始

tai:* 


Ro 



### 项目安装与启动

启动新项目、从头开始或[迁移现有项目](https://wxt.dev/guide/migrate-to-wxt)。

```shell
# pnpm
pnpm dlx wxt@latest init <project-name>

# npm
npx wxt@latest init <project-name>

# bun
bunx wxt@latest init <project-name>
```

官方给到了基于主流前端框架的TS模版：

-  [`vanilla`](https://github.com/wxt-dev/wxt/tree/main/templates/vanilla)
-  [`vue`](https://github.com/wxt-dev/wxt/tree/main/templates/vue)
-  [`react`](https://github.com/wxt-dev/wxt/tree/main/templates/react)
- [`svelte`](https://github.com/wxt-dev/wxt/tree/main/templates/svelte)
-  [`solid`](https://github.com/wxt-dev/wxt/tree/main/templates/solid)

### 从0到1创建项目

```shell
# pnpm
mkdir project-name
cd project-name
pnpm init
echo 'shamefully-hoist=true' >> .npmrc

# npm 
mkdir project-name
cd project-name
npm init

# yarn
mkdir project-name
cd project-name
yarn init

# bun
mkdir project-name
cd project-name
bun init
```

然后安装 `wxt`：

```shell
# pnpm
pnpm add -D wxt

# npm 
npm i --save-dev wxt

# yarn
yarn add --dev wxt

# bun
bun add --dev wxt
```

添加第一个入口文件：

```ts
// entrypoints/background.ts
export default defineBackground(() => {
  console.log(`Hello from ${browser.runtime.id}!`);
});
```

最后，将相关脚本添加到`package.json`：

```json
{
  "scripts": {
    "dev": "wxt", 
    "dev:firefox": "wxt --browser firefox", 
    "build": "wxt build", 
    "build:firefox": "wxt build --browser firefox", 
    "zip": "wxt zip", 
    "zip:firefox": "wxt zip --browser firefox", 
    "postinstall": "wxt prepare"
  }
}
```

### 基本配置

## 内容脚本UI

在内容脚本中挂载 UI 的方法有以下三种：

- [Integrated](https://wxt.dev/guide/content-script-ui.html#integrated) 集成
- [Shadow Root](https://wxt.dev/guide/content-script-ui.html#shadow-root)
- [IFrame](https://wxt.dev/guide/content-script-ui.html#iframe)

每个都有自己的优点和缺点。

| 方法        | 独立的样式 |   独立事件    | HMR  | 使用页面上下文 |
| :---------- | :--------: | :-----------: | :--: | :------------: |
| Integrated  |     ❌      |       ❌       |  ❌   |       ✅        |
| Shadow Root |     ✅      | ✅（默认关闭） |  ❌   |       ✅        |
| IFrame      |     ✅      |       ✅       |  ✅   |       ❌        |

### 集成

集成内容脚本 UI 与页面内容一起注入。这意味着它们受到该页面上 CSS 的影响。

```ts
// entrypoints/example-ui.content/index.ts
import { createApp } from 'vue';
import App from './App.vue';

export default defineContentScript({
  matches: ['<all_urls>'],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      onMount: (container) => {
        // Create the app and mount it to the UI container
        const app = createApp(App);
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
        // Unmount the app when the UI is removed
        app.unmount();
      },
    });

    // Call mount to add the UI to the DOM
    ui.mount();
  },
});
```

请参阅 [API 参考](https://wxt.dev/api/wxt/client/functions/createIntegratedUi.html) 以获取完整的选项列表。

你可以使用 [`cssInjectionMode`](https://wxt.dev/api/wxt/interfaces/BaseContentScriptEntrypointOptions.html#cssinjectionmode) 属性控制如何为集成内容脚本 UI 注入 CSS。通常，你需要将其保留为默认值 `"manifest"`，以便 UI 继承网站 CSS 的样式。

### Shadow Root

通常，在 Web 扩展中，您不希望内容脚本的 CSS 影响页面，反之亦然。[`ShadowRoot`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) API 是理想的选择。

WXT 的 [`createShadowRootUi`](https://wxt.dev/api/wxt/client/functions/createShadowRootUi.html) 将所有 `ShadowRoot` 设置抽象出来，从而可以轻松创建具有独立 CSS 的 UI。它还支持可选的 `isolateEvents` 参数，以进一步隔离用户交互。

若要使用 `createShadowRootUi`，请按照下列步骤操作：

1. 在内容脚本顶部导入 CSS 文件
2. 在 `defineContentScript` 中设置 [`cssInjectionMode: "ui"`](https://wxt.dev/api/wxt/interfaces/BaseContentScriptEntrypointOptions.html#cssinjectionmode)
3. 使用 `createShadowRootUi()` 定义 UI
4. 挂载 UI，以便用户可见

例子：在Vue项目中

```ts
// 1. Import the style
import './style.css';
import { createApp } from 'vue';
import App from './App.vue';

export default defineContentScript({
  matches: ['<all_urls>'],
  // 2. Set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'inline',
      onMount: (container) => {
        // Define how your UI will be mounted inside the container
        const app = createApp(App);
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
        // Unmount the app when the UI is removed
        app?.unmount();
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
```

### IFrame





### 配置popup、new Tab页面或内容脚本

## Storage API

WXT 提供了简化的 API 来替换 `browser.storage.*` API（但是也非常的强大）。使用从 `wxt/storage` 自动导入的 `storage` 或手动导入来开始：

```ts
import { storage } from 'wxt/storage';
```

### 基本用法

所有存储键都必须以其存储区域为前缀。

```ts
// ❌
await storage.getItem('installDate');

// ✅
await storage.getItem('local:installDate');
```

可以使用`local:`、`session:`、`sync:`或`managed:`。

### 观察者

要监听存储更改，请使用 `storage.watch` 函数。它允许您为单个键设置侦听器：

```ts
const unwatch = storage.watch<number>('local:counter', (newCount, oldCount) => {
  console.log('Count changed:', { newCount, oldCount });
});
```

要删除监听器，请调用返回的 `unwatch` 函数：

```ts
const unwatch = storage.watch(...);

// Some time later...
unwatch();
```

### 元数据

`wxt/storage` 还支持设置键的元数据，存储在 `key + "$"` 中。元数据是与键关联的属性的集合。它可能是版本号、上次修改日期等。

[除了版本控制](https://wxt.dev/guide/storage.html#versioning)之外，您还负责管理字段的元数据：

```ts
await Promise.all([
  storage.setItem('local:preference', true),
  storage.setMeta('local:preference', { lastModified: Date.now() }),
]);
```

当通过多个调用设置元数据的不同属性时，这些属性将被组合而不是被覆盖：

### 定义存储项



## 其他特性

### ES模块支持





### 资产管理

WXT 有两个目录用于存储 CSS、图像或字体等资源：

- `<srcDir>/public`：存储将按原样复制到输出目录的文件
- `<srcDir>/assets`：存放构建过程中Vite会处理的文件

### 自动导入

WXT 使用与 Nuxt 相同的工具进行自动导入，[`unimport`](https://github.com/unjs/unimport)。

### 远程代码

WXT 将自动下载并捆绑带有 `url:` 前缀的导入，因此扩展不依赖于远程代码，[这是 Google 对 MV3 的要求](https://developer.chrome.com/docs/extensions/migrating/improve-security/#remove-remote-code)。

### 自动化发布



## 参考

[Next-gen Web Extension Framework – WXT](https://wxt.dev/)
