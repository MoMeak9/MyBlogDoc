# GitHub Discussions 评论

文章评论使用 [Giscus](https://giscus.app/)，数据保存在公开仓库 `MoMeak9/MyBlogDoc` 的 GitHub Discussions 中。访客通过 GitHub 登录留言，不需要在博客中配置 GitHub Token。

## 启用

1. 在仓库 **Settings → General → Features** 开启 **Discussions**。
2. 安装 [Giscus GitHub App](https://github.com/apps/giscus)，允许它访问 `MyBlogDoc`。
3. 选择 **Announcements** 类型的讨论分类，并将真实的分类名和 GraphQL 分类 ID 写入 `src/config/site.ts` 的 `comments` 配置。仓库 ID 已填入真实值；分类 ID 为空时保留 GitHub 交流入口，不请求 Giscus。

读取仓库与分类 ID：

```sh
gh api graphql -f query='query { repository(owner:"MoMeak9", name:"MyBlogDoc") { id discussionCategories(first:25) { nodes { id name slug } } } }'
```

启用后运行 `pnpm check`、`pnpm build`、`pnpm test:build`，将构建部署到站点。浏览器需要访问 `giscus.app`，登录需要 GitHub；博客本身没有评论服务器。

## 映射与行为

- 只在公开且非空的文章页面显示评论，位置在正文和公众号关注卡之后，不进入文章搜索索引。
- 使用 `specific` 映射，讨论标识为 Markdown 文章的 `post.id`；中英文界面、项目部署前缀与自定义域名共享同一讨论。修改文章标题不会改变讨论；移动文章源文件会改变标识，需要单独迁移已有讨论。
- `strict` 开启，避免相似文章名匹配到其他讨论。尚无评论时的 `Discussion not found` 是正常状态，首次留言或表情会由 Giscus 创建讨论。
- 接近评论区时才加载；明暗主题切换时同步 iframe。加载失败提供重试与 GitHub 交流入口，收到当前 iframe 的讨论元数据后将入口指向对应线程。
- GitHub App 安装状态不能仅凭博客构建判断；需在部署后的页面核验评论显示与 GitHub 登录，且不要把未实际提交的评论描述为已验证。
