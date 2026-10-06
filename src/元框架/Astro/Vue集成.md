# Astro 集成 Vue 框架教程

Astro的集成能力支持我们使用Vue3编写的组件，并且支持SSR（server-side rendering）和CSH（client-side hydration）

> **Astro 集成简介：**
>
> 使用 **Astro 集成**只需几行代码就能为你的项目添加新的功能和行为。你可以自己编写一个自定义的集成，或者从 [npm](https://www.npmjs.com/search?q=keywords%3Aastro-component&ranking=popularity) 获取流行集成。
>
> - 解锁 React、Vue、Svelte、Solid 和其他流行的 UI 框架。
> - 只需几行代码就能整合 Tailwind 和 Partytown 等工具。
> - 为你的项目添加新功能，如自动生成网站地图。
> - 编写自定义代码，与构建过程、开发服务器等挂钩。
>
> 目前只默认支持官方 Astro 集成（发布在 npm 的 `@astrojs/` 范围包），以保护用户不被破坏。
>
> [使用集成 🚀 Astro 文档](https://docs.astro.build/zh-cn/guides/integrations-guide/)

## 安装

有两种方法可以将集成添加到项目中。让我们先介绍最方便的选项！

### `astro add` 指令

Astro 包括一个用于添加第一方集成的 CLI 工具：`astro add`。该命令将：

1. （可选）安装所有必要的依赖项和对等依赖项
2. （也是可选的）更新项目的 `astro.config.* `文件以应用此集成

要安装 @astrojs/vue，请在项目目录运行以下命令并按照提示操作：

```shell
# Using NPM
npx astro add vue
# Using Yarn
yarn astro add vue
# Using PNPM
pnpm astro add vue
```

### 手动安装依赖

1. 安装`@astrojs/vue`集成

   ```shell
   npm install @astrojs/vue
   ```

   大多数包管理器也会安装相关的对等依赖项。尽管如此，如果你在启动 Astro 时看到 “Cannot find package ‘vue’”（或类似的）警告，则你需要再次手动安装 Vue：

   ```shell
   npm install vue
   ```

2. 修改`astro.config.*`以应用集成

   ```js
   import vue from '@astrojs/vue';
   
   export default {
     // ...
     integrations: [vue()],
   }
   ```

## 开始使用

Astro 使用的是 jsx like的语法，所以如果你是React选手可能会比较熟悉，我这边演示一下Vue使用方法，详细内容可见[框架组件 🚀 Astro 文档](https://docs.astro.build/zh-cn/core-concepts/framework-components/#using-framework-components)

在 Astro 页面、布局和组件中就像 Astro 组件一样使用你的 JavaScript 框架组件。所有组件都可放在 `/src/components` 目录中，或者你也可以放在任何你喜欢的地方。

要使用框架组件，你需要在 Astro 组件脚本中使用相对路径导入它们。然后在其他组件、HTML 元素和类 JSX 表达式中使用它们。

比如在Layout组件中嵌套

```vue
// packages\app\src\layouts\Layout.astro
---
import Navbar from './components/Navbar.vue';

export interface Props {
    title: string;
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="generator" content={Astro.generator} />
        <title>{title}</title>
    </head>
    <Navbar client:load /> // 这里！
    <body>
        <slot />
    </body>
</html>
```

### 激活组件

框架组件可以使用 `client:*` 指令实现激活。它是个用来定义你的组件应该如何被**渲染**和激活的属性。

[客户端指令](https://docs.astro.build/zh-cn/reference/directives-reference/#客户端指令)描述了你的组件是否应该在构建时被渲染，以及你的组件的 JavaScript 何时应该被浏览器加载.

大多数指令会在构建时在服务器上渲染组件。组件 JS 将根据特定的指令被分发到客户端。当组件的 JS 导入完成后，组件将进行激活。

```vue
---
// 示例：浏览器中的激活框架组件。
import InteractiveButton from '../components/InteractiveButton.jsx';
import InteractiveCounter from '../components/InteractiveCounter.jsx';
---
<!-- 该组件 JS 将在页面加载开始时导入 -->
<InteractiveButton client:load />

<!-- 该组件 JS 将不会分发给客户端直到用户向下滚动，该组件在页面上是可见的 -->
<InteractiveCounter client:visible />
```

**可用激活指令**

几个适用于 UI 框架组件的激活指令：`client:load`、`client:idle`、`client:visible`、`client:media={QUERY}` 和 `client:only={FRAMEWORK}`。

> 这即使是在SSR模式下也是必要的

### 关于Typescript

Astro 内置了对 TypeScript的支持。你可以在 Astro 项目中导入 `.ts` 和 `.tsx` 文件，甚至可以直接在 Astro 组件中编写 TypeScript 代码。同样的，这对框架组件同样适用，比如Vue中：

```vue
<script lang="ts" setup>
// your code
</script>
```

直接就可以开始使用TS啦~

## Options

此集成由 `@vitejs/plugin-vue` 提供支持。如果要自定义 Vue 编译器，可以为集成提供选项。更多详细信息，请参阅`@vitejs/plugin-vue` 文档 [@vitejs/plugin-vue - npm](https://www.npmjs.com/package/@vitejs/plugin-vue)。

```js
import vue from '@astrojs/vue';

export default {
  // ...
  integrations: [vue({
    template: {
      compilerOptions: {
        // treat any tag that starts with ion- as custom elements
        isCustomElement: tag => tag.startsWith('ion-')
      }
    }
    // ...
  })],
}
```

## 应用入口 appEntrypoint

我们可以扩展 Vue 应用程序实例，将 appEntrypoint 选项设置为相对于根目录的导入说明符（例如，appEntrypoint：“/src/pages/_app”）。

```js
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [
    vue({ appEntrypoint: '/src/pages/_app' })
  ],
});
```

该文件的默认导出应该是一个在渲染之前接受 Vue App 实例的函数，允许使用自定义 Vue 插件、`app.use` 和其他针对高级用例的自定义。

```ts
import type { App } from 'vue';
import i18nPlugin from 'my-vue-i18n-plugin';

export default (app: App) => {
  app.use(i18nPlugin);
}
```

## 开启 jsx

设置 Vue JSX 为 true

```js
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [
    vue({ jsx: true })
  ],
});
```

此时需要自定义 Vue JSX 编译器的话，请传递Options对象而不是布尔值。有关详细信息，请参阅`@vitejs/plugin-vue-jsx` [@vitejs/plugin-vue-jsx - npm](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx)文档。

```js
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [
    vue({
      jsx: {
        // treat any tag that starts with ion- as custom elements
        isCustomElement: tag => tag.startsWith('ion-')
      }
    })
  ],
});
```