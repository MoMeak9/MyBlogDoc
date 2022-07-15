# UmiJS 乌米学习实战:rice:

> 参照文档
>
> [官方文档](https://umijs.org/)
>
> [Umi 4 发布啦 🎈](https://juejin.cn/post/7111528216631705608)
>
> [umi3教程](https://juejin.cn/post/7021358536504393741)

目前umi已经更新到4啦~，文章就只挑重要的讲解记录~

## 简介

Umi，中文发音为「乌米」，是可扩展的企业级前端应用框架。Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。然后配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。

Umi 是蚂蚁集团的底层前端框架，已直接或间接地服务了 10000+ 应用，包括 Java、Node、H5 无线、离线（Hybrid）应用、纯前端 assets 应用、CMS 应用、Electron 应用、Serverless 应用等。他已经很好地服务了我们的内部用户，同时也服务了不少外部用户，包括淘系、飞猪、阿里云、字节、腾讯、口碑、美团等。在 2021 年字节的[调研报告](https://zhuanlan.zhihu.com/p/403206195)中，Umi 是其中 25.33% 开发者的选择。

Umi 有很多非常有意思的特性，比如。

1、**企业级**，在安全性、稳定性、最佳实践、约束能力方面会考虑更多
<u>2、**插件化**，啥都能改，Umi 本身也是由插件构成</u>
3、**MFSU**，比 Vite 还快的 Webpack 打包方案
4、基于 React Router 6 的完备路由
5、默认最快的请求
6、SSR & SSG
7、稳定白盒性能好的 ESLint 和 Jest
8、React 18 的框架级接入
9、Monorepo 最佳实践
...

引用一下云谦大佬的话：

> 

### 啥时候不用？

总结一下：低版本浏览器、React或者Node14以下环境，需要高粒度的路由管理和Webpack处理的

### 为什么不用？

**create-react-app：**有没有可能，Vue CLI 这种渐进式设计就是很好的正面例子？create-react-app就是逊啦（狗头）、

**next.js**：如果要做 SSR，next.js 是非常好的选择，但是作者也说了，Umi更好的扩展性（插件很好用），更接地气

**remix**：还没了解....

### [快速上手](https://umijs.org/docs/tutorials/getting-started)

去官方文档看吧~

### 请求的封装

src文件夹下新建 `request`文件夹 新建`request.ts`

```js
request.ts
/**
 * 网络请求工具 封装umi-request
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

import { extend } from 'umi-request';
import type { RequestOptionsInit } from 'umi-request';
import { notification } from 'antd';

// codeMessage仅供参考 具体根据和后端协商,在详细定义.
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  500: '服务器发生错误，请检查服务器。',
};
type mapCode = 200 | 400 | 500;

/**
 * 错误异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    let errorText = codeMessage[response.status as mapCode] || response.statusText;
    const { status, url } = response;
    response
      ?.clone()
      ?.json()
      ?.then((res) => {
        // 后端返回错误信息,就用后端传回的
        errorText = res.msg ? res.msg : errorText;
        notification.error({
          message: `请求错误 ${status}: ${url}`,
          description: errorText,
        });
      });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// 根据不同的开发环境,配置请求前缀
interface ApiPrefix {
  dev: string;
  test: string;
  prd: string;
}
const apiPreFix: ApiPrefix = {
  dev: 'http://120.55.193.14:3030/',
  test: 'http://120.55.193.14:3030/',
  prd: 'http://120.55.193.14:3030/',
};
// request拦截器, 携带token,以及根据环境,配置不同的请求前缀
request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  // 不携带token的请求数组
  let notCarryTokenArr: string[] = [];
  if (notCarryTokenArr.includes(url)) {
    return {
      url: `${apiPreFix[CurrentEnvironment]}${url}`,
      options,
    };
  }
  // 给每个请求带上token
  let token = localStorage.getItem('tokens') || '';
  let headers = {
    Authorization: `Bearer ${token}`,
  };
  return {
    url: `${apiPreFix[CurrentEnvironment]}${url}`,
    options: { ...options, interceptors: true, headers },
  };
});

/**
 * @url 请求的url
 * @parameter 上传的参数
 */

// 封装的get,post.put,delete请求
const get = async (url: string, parameter?: Record<string, unknown>): Promise<any> => {
  try {
    const res = await request(url, { method: 'get', params: parameter });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const deletes = async (url: string, parameter?: Record<string, unknown>): Promise<any> => {
  try {
    const res = await request(url, { method: 'delete', params: parameter });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const post = async (url: string, parameter?: Record<string, unknown>): Promise<any> => {
  try {
    const res = await request(url, { method: 'post', data: parameter });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const put = async (url: string, parameter?: Record<string, unknown>): Promise<any> => {
  try {
    const res = await request(url, { method: 'put', data: parameter });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export default {
  get,
  post,
  put,
  deletes,
};
复制代码
```

这里封装了umi-request,统一处理了接口错误,请求拦截器携带token等.最后在配合useRequest 非常的好用.

## 设计思路

1、技术收敛 :star:

我们希望开发者依赖 Umi 之后就无需关心 babel、webpack、postcss、react、react-router 等依赖，而依赖 @umijs/max 之后无需再关心开发中台项目的依赖和技术栈。

2、插件和插件集 :star:

Umi 通过提供插件和插件集的机制来满足不同场景和业务的需求。插件是为了扩展一个功能，而插件集是为了扩展一类业务。比如要支持 vue，我们可以有 `@umijs/preset-vue`，包含 vue 相关的构建和运行时；比如要支持 h5 的应用类型，可以有 `@umijs/preset-h5`，把 h5 相关的功能集合到一起。

3、最佳实践

4、企业级

5、import all from umi :star:

很多人可能都第一次听到。import all from umi 意思是所有 import 都来自 `umi`。比如 dva 不是 `import { connect } from 'dva'`，而是 `import { connect } from 'umi'`，从 umi 中导出。导出的方法不仅来自 umi 自身，还来自 umi 插件。

6、编译时框架

7、依赖预打包

8、默认快

9、约束与开放

## 常用API



## [Umi Max 简介](https://umijs.org/docs/max/introduce)

> 为了方便开发者更加方便的使用这些插件，在我们这些插件开源的基础上，直接将他们集成到一起，打造了 `@umijs/max`。 让开发者直接可以通过脚手架马上获得和蚂蚁集团开发 Umi 应用一样的开发体检。

新建的项目默认安装以下插件, 可以按需开启：

- [权限](https://umijs.org/docs/max/access)
- [站点统计](https://umijs.org/docs/max/analytics)
- [Antd](https://umijs.org/docs/max/antd)
- [dva](https://umijs.org/docs/max/dva)
- [initial-state](https://umijs.org/docs/api/runtime-config#getinitialstate)
- [布局和菜单](https://umijs.org/docs/max/layout-menu)
- [多语言](https://umijs.org/docs/max/locale)
- [model](https://umijs.org/docs/max/data-flow)
- [乾坤微前端](https://umijs.org/docs/max/micro-frontend)
- [请求库](https://umijs.org/docs/max/request)
- [tailwindCSS支持](https://umijs.org/docs/max/tailwindcss)

## UmiJS 4更新内容

**多构建引擎。** Umi 4 同时支持 Vite 和 Webpack 两种构建方式，并尽量确保他们之间功能的一致性，让开发者可以通过一行配置进行切换。可能有些同学会喜欢 dev 用 vite，build 用 webpack 这样的组合。同时我们也在探索包括 ESMi 在内的其他构建方案的探索。

**默认快。** 默认快是多维度的，我们通过 MFSU V3 + Webpack 5 缓存解 Dev 时编译慢的问题；内网还有通过 Webpack 5 物理缓存和 CD 平台结合解 Build 时编译慢的问题；有使用 esbuild 做 js 和 css 的压缩器、配置和 MOCK 文件的读取、jest 的 transformer，让除构建之外的其他环节也飞快；此外还有运行时速度也有考虑。

**MFSU V3。** Umi 3 的 MFSU 大家可能多少有接触过，虽然有用，但 DX 不够好。用的时候会遇到一些坑，以至于很多同学都掌握了一项特殊技能，遇到问题时 rm -rf src/.umi。大家可能会遇到 monorepo 不支持、热更新导致 Tab 卡死、请求多导致页面打开慢、一些语法不支持的问题。以上问题在 MFSU V3 中全解！基于此，我们非常有信心地在 Umi 4 中默认开启 MFSU 功能。当然，如果你不喜欢，会保留手动配置 mfsu: false 关闭的口子。同时，MFSU V3 还可脱离 Umi 独立使用。

**Umi Max。** 这是内部 Bigfish 框架的对外版本，解我们自己的问题，同时也给社区另一个集中化框架的选择，定位是中后台框架，包含了中后台相关的大量最佳实践的插件。如果有定制需求，大家可以参考他来实现内网框架的定制，比如快手团队就有基于 Umi 4 的框架定制，还有 Alita 也是基于 Umi 定制的面向移动端的框架。

**React Router 6。** 我们升级了路由方案到 React Router 6，喜忧参半。好消息是，React Router 6 是 Remix 的基础库，面向框架层做了很多优化，路由实现层更优雅，Umi 得以删除大量路由渲染的代码；坏消息是，带来不少 Break Change，比如之前父路由渲染子路由用 children，得换成 。

**支持 Vue。** Umi 4 中提供了 Vue 支持，记得我在 Umi 2 时画过一张架构图，其中就有 Vue 的一环，Umi 3 时也有过尝试，但那会 Vue 3 还不太成熟，接入时遇到不少坑，这个坑今天总算是补上了。此功能由社区同学操刀，只需装载一个 preset 即可切换到 Vue。

**默认最快的 CSR 请求。** 项目构建快解的是 DX 问题，但同时也应该关注 UX。Client Loader 的目的是让应用加载默认快，避免 React 项目经典的 Render-Then-Fetch 的加载瀑布流问题。效果见下图，示例项目的从 9s 降到 6s，这 6s 还是之前截的图，上了 Preload 功能之后其实已更快。

**白盒文档的 Lint。** Umi 4 里内置了我们精挑细选的 lint 规则，只有质量类不开可能会导致项目问题的规则，不包含风格类的规则，不包含 TypeScript 中 type-aware 类的规则，这类规则需要跑整个项目，会导致性能问题；同时，我们通过 @rushstack/eslint-pach 的方式锁定了 config 里找 plugin 的规则，确保规则是长期稳定的。

**SSR。** Umi 4 重写了 SSR 功能，目前此功能还在 beta 阶段，请勿将其用于生产环境。Umi 4 的 SSR 有以下特点，1）server 代码的构建基于 esbuild，所以极快，2）请求的处理类似 next.js 的 getServerSideProps 和 remix 的 loader，只在服务端跑，3）基于 react 18 的 suspense 和 renderToPipeableStream。实现原因，部署层目前仅实现了 vercel 的 adapter。这里有个简单的 Todos 示例：[test-vercel-chencheng.vercel.app/](https://link.juejin.cn?target=https%3A%2F%2Ftest-vercel-chencheng.vercel.app%2F)

**Umi UI 卷土重来？** 日常排查问题时，很多 Umi 框架的内部状态是看不到的，比如插件启用情况、appData 元数据、修改过的最终配置、修改过的最终 webpack 配置、修改过的最终路由、MFSU 的 module graph 信息等。Umi 4 提供了 /__umi/ 路由，dev 阶段可用，效果见下图。定位是开发辅助，大家也可以理解为是「丐版 Umi UI」。

## 额外的:octopus:

**基于 React 的应用研发框架 icejs** [[**飞冰**](https://ice.work/)](https://ice.work/)
