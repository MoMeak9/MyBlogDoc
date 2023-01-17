# Astro 中通过 Node.js 启用服务器端渲染

在 Astro 中启用服务端渲染（SSR, Server Side Rendering）非常简单，而且启用后可以使用新的特性：

- 在应用程序中实现登录状态会话。
- 用 `fetch` 动态调用 API 来渲染数据。
- 通过**适配器**部署你的网站。

##  适配器

为了启用 SSR，你需要使用适配器（Adapter)。这是因为 SSR 需要服务器**运行时**环境运行服务端代码。服务端代码可以调用该运行时提供的 API。

安装一个适配器可以让 Astro 访问相应的 API，并允许 Astro 输出一个脚本（server脚本），在服务器上运行我们项目。

现有以下适配器，未来将会有更多适配器支持：

- [Cloudflare](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare)
- [Deno](https://github.com/withastro/astro/tree/main/packages/integrations/deno)
- [Netlify](https://github.com/withastro/astro/tree/main/packages/integrations/netlify)
- [Node.js](https://github.com/withastro/astro/tree/main/packages/integrations/node)
- [Vercel](https://github.com/withastro/astro/tree/main/packages/integrations/vercel)

我们主要介绍Node.js 适配器

## 安装Node.js适配器

使用以下 astro add 命令添加适配器，以在 Astro 项目中启用 SSR。这将安装适配器并一步对项目的 `astro.config.mjs` 文件进行适当的更改。

```shell
# Using NPM
npx astro add node
# Using Yarn
yarn astro add node
# Using PNPM
pnpm astro add node
```

**手动安装：**

1. 在终端中安装Node.js适配器

   ```shell
   npm install @astrojs/node
   ```

2. 在 `astro.config.mjs` 项目配置文件中添加两行

   ```js
   // astro.config.mjs
   import { defineConfig } from 'astro/config';
   import node from '@astrojs/node';
   
   export default defineConfig({
     output: 'server',
     adapter: node({
       mode: 'standalone'
     }),
   });
   ```

## 配置项参数

`@astrojs/node` 可以通过将选项参数传递给适配器函数来配置：

### Mode 模式设置

控制适配器是构建为中间件`middleware`模式还是独立`standalone`模式。

- 中间件模式允许将构建的输出用作另一个 Node.js 服务器的中间件，例如 Express.js 或 Fastify。

  ```js
  import { defineConfig } from 'astro/config';
  import node from '@astrojs/node';
  
  export default defineConfig({
    output: 'server',
    adapter: node({
      mode: 'middleware'
    }),
  });
  ```

- 独立模式构建的服务器脚本，随着入口模块的运行自动启动。这使得我们可以更轻松地将构建部署到主机，而无需任何其他代码。

## 启动

根据两种不同的模式，有着不同的启动和使用方法

### 中间件模式

服务器入口点默认构建为 `./dist/server/entry.mjs`。该模块导出一个处理函数，可以与任何支持 Node 请求和响应对象的框架一起使用，比如Express：

```js
import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
app.use(express.static('dist/client/')) // 静态资源文件
app.use(ssrHandler);

app.listen(8080);
```

**注意：** 中间件模式不提供文件服务，需要配置 HTTP 框架，如上代码所示。默认情况下，客户端输出在` ./dist/client/`

### 独立模式

独立模式启动很简单，只要执行构建的入口文件`./dist/server/entry.mjs`

```shell
node ./dist/server/entry.mjs
```

对于独立模式，服务端除了处理页面和 API 路由之外还具有文件服务。

#### 自定义主机和端口

```shell
HOST=0.0.0.0 PORT=3000 node ./dist/server/entry.mjs
```



> **参考：**
>
> [astro/packages/integrations/node at main · withastro/astro](https://github.com/withastro/astro/tree/main/packages/integrations/node)
>
> [服务端渲染 🚀 Astro 文档](https://docs.astro.build/zh-cn/guides/server-side-rendering/)
