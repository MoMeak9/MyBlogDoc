**介绍 Astro 5.0！**借助 Astro 内容层从任何来源加载你的内容，并通过服务器岛屿将缓存的静态内容与动态的个性化内容相结合。继续阅读以了解有关这些强大的新功能及更多信息！

**什么是 Astro？** [Astro](https://astro.build/) 是用于构建内容驱动型网站（包括博客、营销和电子商务）的网络框架。如果你需要一个加载速度快且具有良好搜索引擎优化的网站，那么 Astro 很适合你。

**发布亮点包括：**

-  **[“内容层 Content Layer”](https://astro.build/blog/astro-5/#content-layer)**
-  **[服务器群岛 Server Islands](https://astro.build/blog/astro-5/#server-islands)**
-  **[简化预渲染](https://astro.build/blog/astro-5/#simplified-prerendering)**
-  **[类型安全的环境变量](https://astro.build/blog/astro-5/#astroenv)**
- **[Vite 6](https://astro.build/blog/astro-5/#vite-6)**
-  **[实验性特征](https://astro.build/blog/astro-5/#experimental-features)**

访问[astro.new](https://astro.new/latest/)可直接在浏览器中试用 Astro 5.0，或者若要使用 Astro 5.0 启动新项目，请为你的包管理器运行`create astro`命令。

```
npm create astro@latest
```

要升级现有项目，可以使用自动化的`@astrojs/upgrade`命令行工具。或者，通过运行包管理器的安装命令手动进行升级。

```bash
# Recommended:
npx @astrojs/upgrade

# Manual:
npm install astro
pnpm install astro
yarn add astro
```

查看[我们的升级指南](https://docs.astro.build/en/guides/upgrade-to/v5/)以获取此版本每次变更的完整详细信息和单独的升级指导。

## “内容层 Content Layer”

Astro 是内容驱动型网站的最佳框架，随着 Astro 5.0 的推出，我们使其变得更加出色。Astro 内容层是一种新的灵活且可插拔的内容管理方式，为在 Astro 项目中定义、加载和访问内容提供了统一的、类型安全的 API，无论内容来自何处。

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { notionLoader } from "notion-astro-loader";

const blog = defineCollection({
  // Load data from Markdown files on disk
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
  schema: z.object({ /* optionally define a schema for type-safe data */  }),
});

const database = defineCollection({
  // Automatically fetch content in one line with a loader
  loader: notionLoader({ /* ... */ })
});

const countries = defineCollection({
  // Load data from anywhere!
  loader: () => fetch('https://api.example.com/countries').then(res => res.json()),
});

export const collections = { blog, database, countries }
```

自 Astro 2.0 以来，内容集合允许你在类型安全的集合中组织静态内容，然后在站点的任何页面中使用它们。然而，随着站点的发展，将内容放在 Git 存储库中的 Markdown 文件中可能变得不太实际。你可能想要使用内容管理系统，让站点的某些部分由 REST API 提供支持，或者使用来自 Cloudinary 等资产管理系统的优化图像。这可能很快就会变得难以管理，需要各种 API 和数据获取策略。

内容层是解决这个问题的方法，将你所有的内容整合到一个友好的、类型安全的数据存储中，随时准备在你的网站上使用。它们是你熟悉和喜爱的内容集合，但具有**加载器**的额外功能——可插拔的函数，可以从任何来源获取和转换数据。有了内容层，你可以：

- 使用[内置加载器](https://docs.astro.build/en/guides/content-collections/#built-in-loaders)从磁盘上的任何位置加载内容。
- 定义你自己的加载器，以便在短短几行代码中从任何 API 获取内容。
- 使用越来越多的[社区构建和第三方加载器](https://astro.build/integrations/?search=&categories%5B%5D=loaders)之一，从流行的来源（如[Storyblok](https://astro.build/blog/storyblok-loader/)、[Cloudinary](https://astro.build/blog/cloudinary-loader/)或[Hygraph](https://astro.build/blog/hygraph-loader/)）获取内容。

当你构建你的网站时，Astro 会从所有这些来源加载数据，并将集合缓存在一个单一的、类型安全的数据存储中，你可以在你的页面中使用这个数据存储。

![](https://astro.build/_astro/content-layer-architecture.D58x9rAj_1eUG2s.webp)

内容层不仅可以让你从更多地方加载内容。它还为你当前网站的性能带来了重大改进。在 Astro 5 中，对于内容丰富的网站上的 Markdown 页面，你的内容集合现在构建速度快达 5 倍，对于 MDX 则快达 2 倍，同时内存使用量减少了 25% - 50%。

内容层是对内容集合处理方式的重大改变，但我们内置的向后兼容性意味着大多数人无需对其现有代码进行任何更改。有关完整详细信息，请参阅[迁移指南](https://docs.astro.build/en/guides/upgrade-to/v5/#legacy-v20-content-collections-api)。

要开始使用新内容层的集合，请查看[内容集合指南](https://docs.astro.build/en/guides/content-collections/)。

## 服务器群岛 Server Islands

服务器孤岛是 Astro 帮助推向主流的“孤岛架构”概念的演变。“服务器孤岛”将同样的理念扩展到服务器。有了服务器孤岛，你可以在同一页面上结合高性能的静态 HTML 和动态服务器生成的组件。

在任何给定的网页上，你可能会有以下内容：

- 完全静态且永不改变。
- 动态地由一个不经常变化但比你部署频率更高地变化的数据库支持。
- _个性化_内容，为个人用户量身定制。

以前，你必须为所有这些类型的内容选择一种缓存策略，如果页面是登录体验，通常意味着根本不进行缓存。现在，有了服务器孤岛，你可以两全其美。

![A diagram showing the server island population parts of the page from the server.](https://astro.build/_astro/dark-mode-server-islands-diag.CCPm1I4W_ZDEJr.webp)

服务器孤岛用于你最具动态性的内容：个性化内容，如用户的头像、他们的购物车和产品评论。当这些组件被延迟加载时，你可以更积极地缓存页面本身。

这意味着无论用户是否登录，他们都将立即看到页面中最关键的部分，因为这些内容在 Edge CDN 上进行缓存。你还可以设置自定义备用内容，以便在动态岛加载之前短暂显示。

每个岛屿都是独立加载的，以优化访客体验。这意味着一个较慢的岛屿，例如连接到旧有后端的岛屿，不会延迟其余个性化内容的显示和交互。

服务器岛在过去几个月中一直可供测试。在此期间，我们听取了你的反馈，并通过以下方式增强了服务器岛：

- 在岛屿内部设置标头，使你能够自定义单个岛屿的缓存生命周期。
- 在执行自动页面压缩的平台上使用服务器岛。
- 通过使用在服务器上生成的密钥自动加密服务器孤岛属性来提高隐私性。

借助 Astro 5，我们正在重新思考一个站点“静态”的含义。服务器孤岛为你未来在 Astro 中构建静态项目提供了一个基础原语，只在你需要的地方有动态部分。

若要了解有关服务器孤岛的更多信息，请查看《服务器孤岛指南》。

### 简化预渲染

自两年多前 Astro 的 1.0 版本发布以来，Astro 一直为网站支持多种输出模式：静态模式，在构建时将网站构建为传统的静态`.html`文件；服务器模式，页面在运行时渲染，允许你构建高度动态的网站。

在众多请求之后，在 Astro 2.0 中，我们通过创建第三种输出模式使其更加细化：混合模式（Hybrid），它允许在同一网站中混合使用静态和服务器渲染的页面。

随着 Astro 不断发展并获得诸如 actions（操作）或 server islands（服务器岛）等强大功能，而这些功能在纯静态输出模式下无法使用，我们意识到“我需要使用哪些设置才能使用此功能？”的矩阵变得庞大且解释和记录起来很麻烦。我们还发现，人们最终进行服务器端渲染的次数超出了实际需要，因为这比使用精细控制更容易，从而使他们的网站比实际需要的速度更慢。

在 Astro 5.0 中，我们很高兴地说，我们已经简化了所有这些：**混合和静态选项已合并到默认的`static`选项中。**现在，只需添加一个适配器，你就可以在服务器上在运行时呈现单个路由，无需其他配置。

别担心，如果你仍然想要传统的静态生成的`.html`文件，你仍然可以得到它们：Astro 默认情况下仍然是静态的！但是，如果你碰巧将你的一个页面设置为`prerender = false`，Astro 现在将动态地切换其输出模式，允许你使用需要服务器端渲染的功能，而无需弄清楚你需要哪种配置模式。

想了解更多关于新输出模式的信息吗？请查看我们关于按需渲染的更新文档。

## astro:env

配置你的应用程序是开发过程中重要但复杂的一部分。Astro 5 中的新功能是 `astro:env` 模块，它为你提供了一种类型安全的方式来定义你的应用程序期望和需要的环境变量。

使用`astro:env`，你可以：

- 配置你的变量是在**客户端**还是**服务器**中使用，以帮助区分不同的用途。
- 将变量指定为**机密**，例如 API 密钥，你不希望在客户端公开，也不希望内联到服务器构建中（任何有权访问构建输出的人都可以查看服务器构建）。
- 指定变量是**必需的**还是只是一个可选的增强功能，让你在服务器完全启动之前捕获错误。
- 定义变量的**类型**，例如字符串、数字、布尔值或枚举类型，这样在你的应用程序中就无需进行类型转换。

我们构建了`astro:env`以提供对环境变量的更多控制和结构，并为你提供类型安全。一旦定义了变量，你就可以在任何模块中简单地导入并使用它们。

```ts
import { STRIPE_API_KEY } from 'astro:env/server';
```

对于如何使用`astro:env`的更多信息，请参阅我们关于[类型安全环境变量](https://docs.astro.build/en/guides/environment-variables/#type-safe-environment-variables)的指南。

## Vite 6

Astro 5 是首批搭载 Vite 6 的框架之一，Vite 6 一周前刚刚发布。（别担心：我们一直在使用测试版，所以当你升级到 Astro 5 时，可能不需要更改任何代码。）

Vite 6 的亮点是新的环境 API，这是一项内部重构，允许创建新环境，以更紧密地使开发体验与代码在生产环境中的运行方式保持一致。集成作者现在就可以开始使用这个新的 API；未来，我们希望找到在核心中使用它的方法，例如为 Cloudflare 用户提供更好的开发兼容性，或者提供边缘运行时以便在本地进行测试。

要了解有关 Vite 6 的更多信息，请查看他们的[官方发布公告](https://vite.dev/blog/announcing-vite6)。

## 实验性特征

以下是我们在过去几个月中一直在酝酿的新实验性功能。现在可以通过启用`experimental`标志来预览它们，并将在未来的 Astro 5.x 小版本中变得稳定。

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  experimental: {
    responsiveImages: true,
    svg: true,
  }
});
```

### 实验性：图像裁剪支持

Astro 现在支持在使用其默认的 Sharp 图像服务进行图像处理时裁剪图像。

使用新的`fit`和`position`属性，现在你可以创建与容器完美匹配的图像，节省宝贵的字节。

```ts
---
import { Image } from "astro:assets"
import rocket from "./rocket.jpg"
---

<Image src={rocket} width={800} height={600} layout="responsive" />
```

对于此功能的更多信息，请阅读[我们关于实验性响应式图像支持的参考](https://docs.astro.build/en/reference/experimental-flags/responsive-images/#responsive-image-properties)。

### 实验性：响应式图像布局

图像很棘手：有许多屏幕像素密度、许多屏幕尺寸……很多很多事情。要让图像在所有设备上都看起来很好是具有挑战性的，更不用说向小屏幕提供 4K 图像明显的性能影响了。

Astro 的最新实验性图像功能支持设置预定义的响应式图像布局。这些布局将自动生成适当的 ``srcset`` 和 ``sizes`` 值，以使你的图像在所有设备上都看起来美观且性能良好。

```ts
---
import { Image } from "astro:assets"
import rocket from "./rocket.jpg"
---

<Image src={rocket} width={800} height={600} layout="responsive" />
```

有关此功能的更多信息，请访问[我们关于实验性响应式图像支持的参考](https://docs.astro.build/en/reference/experimental-flags/responsive-images/#responsive-image-properties)。

### “实验性：SVG 组件”。

你是否曾希望在 Astro 中使用 SVG 更容易？我们也是！还有什么比组件更具 Astro 特色呢？

使用 Astro 5 的实验性 SVG 标志，你可以导入`.svg`文件，并像使用任何其他 Astro 组件一样使用它们。你可以传递诸如`width`、`height`、`fill`、`stroke`以及原生`<svg>`元素接受的任何其他属性，以便自动应用它们：

```ts
---
import Logo from '../assets/logo.svg'
---

<!-- Pass width and height to override default size -->
<Logo width={100} height={100} fill="blue" />
```

对于有关 SVG 组件以及如何使用它们的更多信息，请访问 [我们关于 SVG 组件的参考](https://docs.astro.build/en/reference/experimental-flags/svg/)。

### 漏洞修复及更多改进

除了所有这些出色的功能之外，这个版本还包括许多较小的功能和错误修复。查看[发行说明](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md#500)以了解更多信息。

感谢所有为此次发布做出贡献的人：

- [Bjorn Lu](https://github.com/bluwy)
- [Sarah Rainsberger](https://github.com/sarah11918)
- [Ben Holmes](https://github.com/bholmesdev)
- [Michael Stramel](https://github.com/stramel)
- [Nate Moore](https://github.com/natemoo-re)
- [Matthew Phillips](https://github.com/matthewcp)
- [Florian Lefebvre](https://github.com/florian-lefebvre)
- [Matt Kane](https://github.com/ascorbic)
- [Emanuele Stoppa](https://github.com/ematipico)
- [Rohan Godha](https://github.com/rgodha24)
- [Armand Philippot](https://github.com/ArmandPhilippot)
- [Kevin](https://github.com/kevinzunigacuellar)
- [Erika “Princesseuh”](https://github.com/Princesseuh)

我们希望你喜欢 Astro 5.0！如果你有任何问题或反馈，请随时通过 Bluesky、Twitter、Mastodon 或 Discord 与我们联系。