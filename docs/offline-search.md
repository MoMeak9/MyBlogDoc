# 本地全文与离线搜索

## 方案选择

本博客使用 Astro 静态输出、Markdown 内容及 GitHub Pages，选择 Pagefind 1.5.2 在构建时生成搜索资源。搜索运行在读者设备上，索引与博客一起发布。

| 方案                                                    | 适用方式                                                | 本项目的选择理由                                                                 |
| ------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [Pagefind](https://pagefind.app/docs/)                  | 从静态 HTML 自动建索引，浏览器按需加载分片              | 原生适配静态站点，支持中文分词、相关性排序、过滤和摘要，直接使用发布后的文章正文 |
| [MiniSearch](https://github.com/lucaong/minisearch)     | 应用准备记录并维护内存索引，支持模糊/前缀匹配和字段加权 | 适合记录集型应用；博客还需要自行维护 HTML 提取、分词、分片与结果摘要             |
| [FlexSearch](https://github.com/nextapps-de/flexsearch) | 应用管理索引，可使用 Worker 和 IndexedDB                | 适合更定制的索引存储；当前博客使用 Pagefind 的静态发布流程                       |

参考：[Pagefind 中文与多语言](https://pagefind.app/docs/multilingual/)、[Node 索引 API](https://pagefind.app/docs/node-api/)、[浏览器 API](https://pagefind.app/docs/api/)、[浏览器缓存配置](https://pagefind.app/docs/search-config/)。

## 内容与检索

- `pnpm build` 先构建 Astro，再由 `scripts/build-search.mjs` 按 `content-index.json` 索引公开且非空的文章。每篇只索引一份正文，不包含英文界面镜像、作者简介、目录、导航及相关文章。
- 标题加权、正文、代码、摘要和标签可检索，分类用于过滤。摘要与标签以低权重加入索引，保留原有查询能力；元数据 JSON 本身不参与检索。原有隐私/草稿规则及抖音、法律目录排除继续生效。
- 中英文界面共享单一中文索引。中文查询根据索引实际词表切分，避免浏览器与索引器词典不同造成漏检；英文名称、标点与引号保留。只接受实际词表的正向前缀，防止未匹配长词被降级为无关短词。
- 关键词检索按相关性展示，仅读取当前页 12 条结果的详情。分类单独筛选继续使用公开元数据并按原顺序显示。
- 页面使用 Pagefind 的命中摘要；插入到 DOM 的内容仅保留文字与 `mark` 高亮，文章标题和其它元数据使用文本节点。
- 结果根据原文 id 通过 `postPath()` 生成当前界面链接，中文路径、字面 `%` 和 GitHub Pages 子路径沿用现有编码策略。

## 断网使用

浏览器在文章归档完成加载并进入空闲后，后台自动保存完整搜索包，不显示下载按钮。调度至少延迟 5 秒并利用空闲回调，优先让前台检索完成；隐藏页、节省流量或慢速网络不会启动自动下载。初次访问只加载当前页面及小型版本信息，首次查询再加载相关分片。下载包含 Pagefind 的 JS、Worker、WASM、索引、分类和所有文章摘要，以及中英文搜索页面、必要 JS/CSS、文章元数据及搜索页实际使用的本地封面。

Service Worker 仅控制博客自身路径，例如 `/MyBlogDoc/`。每个包使用内容版本号，在全部文件成功保存、大小及版本核对通过后才发布“就绪”标记。失败或中断的临时包不取代完整包；更新期间仍可使用原下载。`search-version.json` 与 `search-manifest.json` 由构建自动输出，稳定版本用于 Pagefind 元数据的缓存查询参数。

离线包下载完成后，**此前没有输入过的关键词**也可搜索，分类和结果分页不依赖网络。中英文归档可以重新打开并从 URL 恢复查询。离线阅读保留下载启用后访问的最近 20 篇文章；未访问页面显示返回离线搜索的入口。整个文章库的 HTML、远程媒体及外部字体不在离线搜索包中，字体使用 CSS 的本地回退。

缓存由浏览器管理，后台更新只操作本博客的缓存。离线保存需要支持 Service Worker 与 Cache Storage 的浏览器，以及 HTTPS 或 localhost；不支持时保留联网检索。缓存被用户或浏览器清理后，会在下次满足空闲条件时重新准备。

## 构建与验证

```sh
pnpm install --frozen-lockfile
BASE_PATH=/MyBlogDoc/ SITE_URL=https://momeak9.github.io pnpm check
pnpm test
BASE_PATH=/MyBlogDoc/ SITE_URL=https://momeak9.github.io pnpm build
BASE_PATH=/MyBlogDoc/ SITE_URL=https://momeak9.github.io pnpm test:build
BASE_PATH=/MyBlogDoc/ pnpm preview
```

Pagefind 资源在构建后产生，检索验收应使用 `pnpm build` 后的 `pnpm preview`；开发服务器可用于界面开发。CI 使用同一构建与产物验收命令。

浏览器验收覆盖中文长句、中英混合关键词、代码关键词、分类和分页、输入法组合事件、快速输入竞态、重试、字面 `%` 地址、两个界面的同一查询、下载失败/更新/清理，以及下载完成后的新查询、重新打开搜索页和已访问文章离线阅读。
