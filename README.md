# MyBlogDoc

[English](README.en.md) · [个人博客](https://yihuiblog.top/) · [设计参考 Chronicle](https://chronicle-83v.pages.dev/)

个人前端知识库与博客，使用 Astro 静态生成，继续以原来的 Markdown 文章为内容源。界面参照 Chronicle 的编辑部式排版，包含文章列表、分类筛选、搜索和文章阅读页；提供中文、英文界面，切换语言不会翻译文章正文。

## 本地开发

使用 Node.js 22.18 以上版本，CI 固定为 22.22.3；包管理器使用 `package.json` 固定的 pnpm 10.34.6。

```sh
corepack enable
pnpm install
pnpm dev
```

如果本地没有 Corepack，可以用 `npm install --global pnpm@10.34.6` 安装 pnpm。

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动开发服务器 |
| `pnpm check` | 检查 Astro 与 TypeScript |
| `pnpm test` | 检查 Markdown 元数据、文章链接和部署路径兼容性 |
| `pnpm build` | 静态生成到 `dist/` |
| `pnpm preview` | 预览生成的网站 |
| `pnpm commit` | 使用保留的 git-cz 配置提交已暂存的修改 |

## 写文章

继续编辑 `src/` 中原路径下的 `.md` 文件，无需把旧笔记搬到新目录。新增文章也放在 `src/` 中，可保留中文文件名与多层目录。`.vuepress`、`.obsidian` 等隐藏目录不会作为文章读取。

YAML frontmatter 为可选，原有 `date`、`category`、`tag`、`star` 字段继续支持，也支持 `categories`、`tags`。标题优先读取 `title`，否则从第一个一级标题或文件名提取；日期优先使用 `date`，否则使用 Git 最后提交时间。首次添加尚未提交的文章会使用文件时间。`star: true` 标记精选文章。

```md
---
title: 我的新文章
date: 2026-10-06
category:
  - 前端
tag:
  - Astro
description: 文章的简短介绍。
star: true
---

# 我的新文章

这里开始写正文。
```

保留标准 Markdown、表格、代码高亮、原生 HTML、图片和视频内容；旧 Vue 代码围栏作为 HTML 高亮。已有相对 `.md`、`.html` 文章链接会解析到新文章路由。旧 VuePress 的文章 `.html` 地址提供兼容入口。迁移不需要批量改写文章正文；VuePress 专属 Vue 组件不作为 Astro 组件运行。

中文界面为默认入口 `/`，英文界面为 `/en/`。两种界面共享同一份文章内容。

## 封面、字体与社交媒体

文章显式 `cover` 优先；没有设置时，仅当标题后的第一个正文段落为图片，才使用该图作为封面。文字开头或没有图片的文章呈现文字卡片，正文后续插图不作为封面。字体使用 `"PingFang SC", HarmonyOS_Regular, "Helvetica Neue", "Microsoft YaHei", sans-serif`，代码保留系统等宽字体，不加载外部字体。

在 `src/config/site.ts` 修改作者信息和 GitHub、Bilibili、邮箱入口；这些入口统一用于首页、关于页、页脚和手机菜单。界面翻译位于 `src/i18n.ts`。

关于页正文位于 `src/个人简介.md`，迁自 [GitHub 个人主页 README](https://github.com/MoMeak9/MoMeak9/blob/91250d88177a33aa6da667942a7e4f7c448c0580/README.md)。保留原始英文内容，frontmatter 记录来源和版本；配套 SVG 位于 `public/content-assets/github-profile/`，跟随站点浅色/深色主题。更新个人资料时，同时更新正文、SVG 和 `src/config/site.ts` 中的联系方式。

页面使用浏览器原生滚动。GSAP 观察滚动位置，驱动淡入与反向播放、卡片错峰、线条展开和数字计数。首屏使用 Canvas 绘制旋转线框二十面体及粒子，提供静态 SVG 后备；帧率最多 30 FPS，离屏或标签页隐藏时暂停。系统开启“减少动画”后，页面保留静态内容和数字。

## 部署到 GitHub Pages

1. 在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
2. 将修改提交到 `main` 或 `master`。工作流依次安装锁定依赖、执行检查与测试、构建静态站点，再使用 GitHub 官方 Pages Actions 部署。
3. 也可以在 **Actions → Build and deploy Astro to GitHub Pages → Run workflow** 手动运行。只有 `main`、`master` 会部署；Pull Request 会检查和构建。

工作流读取 `actions/configure-pages` 输出的站点域名与路径，支持项目站点、用户站点和已配置的自定义域名。对于普通 `MyBlogDoc` 项目仓库，路径为 `/MyBlogDoc/`。Pull Request 构建根据 `GITHUB_REPOSITORY` 推导对应路径。Git 历史完整检出，以保持无日期文章的时间一致。部署不需要 PAT 或手工维护 `gh-pages` 分支。

需要覆盖地址时，在 **Settings → Secrets and variables → Actions → Variables** 中设置：

| 变量 | 示例 | 说明 |
| --- | --- | --- |
| `SITE_URL` | `https://momeak9.github.io` | 站点域名，不含项目子路径 |
| `BASE_PATH` | `/MyBlogDoc/` | 项目部署路径；根域名部署设置为 `/` |

本地开发默认路径为 `/`。可用与 CI 相同的变量验证项目路径：

```sh
SITE_URL=https://momeak9.github.io BASE_PATH=/MyBlogDoc/ pnpm build
BASE_PATH=/MyBlogDoc/ pnpm preview
```

`.idea/`、`node_modules/`、`.astro/`、`dist/`、`.DS_Store` 和本地环境文件均已忽略。原来跟踪的 `.idea` 文件已移出 Git 跟踪，本地 IDE 文件可继续使用。

## 内容迁移与发现

`scripts/migrate-blog.mjs` 以审查清单为输入，默认 dry-run，`--apply` 才写入博客；源目录始终只读。迁移结果保存在 `reports/content-migration.json`，文章日期来源保存在 `src/data/migration-metadata.json`。已按请求排除抖音、法律目录，并排除私人通信与含认证信息的工作笔记。保留明确更新稿、统一旧文件别名和已确认的文档链接，无法确定目标的旧链接按普通文本保留。

归档每页静态生成 12 篇文章，搜索索引在使用筛选或搜索时加载；手机提供横滑分类、折叠目录、44px 触控目标和安全区留白。Mermaid 图示按需绘制，原始源码可展开阅读，无法绘制时保留代码内容。

## 本地全文与离线搜索

使用 [Pagefind](https://pagefind.app/) 在构建后为公开文章生成静态中文分片索引，检索、相关性排序和摘要高亮在浏览器本地完成。中英文界面共享原文索引，结果保留当前界面的链接；关键词搜索按需加载索引及当前页摘要，分类单独筛选仍使用轻量元数据。不需要搜索服务器、API Key 或外部搜索服务。

离线搜索在页面加载后利用空闲时间自动准备完整索引与所需静态资源，不显示下载按钮。后台任务使用低优先级请求，搜索输入、隐藏标签页、节省流量和慢速网络会让任务延后。准备完成后，可以断网搜索新关键词、筛选和分页；已访问的文章可离线阅读。后台更新失败保留原完整缓存，缓存只属于当前博客路径。[方案比较、构建与验收说明](docs/offline-search.md)。

## SEO 与 GEO

站点输出 Blog、Person、BlogPosting 和可见面包屑对应的 JSON-LD，补齐 OG/Twitter 分享图、可信发布时间与更新时间、原文作者与来源信息，以及 sitemap 的 lastmod。未知的发布时间不会用构建时间补造。英文界面共享原文，因此文章语言标注遵循正文语言。

`content-index.json` 提供公开文章元数据，`llms.txt` 提供可选的 canonical 内容导航；它是社区索引协议，不是 Google 排名因素，也不保证 AI 引用。[Google 的 AI 优化指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)强调可访问正文、结构化数据与可信内容。

GitHub 项目 Pages 的 `/MyBlogDoc/robots.txt` 不能控制整个主机，爬虫读取的是域名根路径 `/robots.txt`；自定义根域部署才能直接使用当前输出。未擅自改变训练爬虫与搜索爬虫的权限。上线后可在 Search Console 与 Bing Webmaster Tools 检查索引、抓取及引用情况。

## 交流

这个仓库主要维护个人笔记。发现文章或网站问题，欢迎提交 [Issue](https://github.com/MoMeak9/MyBlogDoc/issues)，也可以联系 [minntaki@foxmail.com](mailto:minntaki@foxmail.com)。
