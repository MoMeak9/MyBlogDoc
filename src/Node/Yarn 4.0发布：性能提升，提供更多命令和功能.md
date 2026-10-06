> 原文开头：
>
> 就是今天！经过一年多的工作，我们的团队很高兴终于在4.x发布线的第一个版本上贴上了一个花哨的“稳定”标签！为了庆祝，让我们一起参观一下主要的变化;如果你想找一个更详细的列表，看看更新日志[Changelog | Yarn](https://yarnpkg.com/advanced/changelog#400)。
>
> 原文：[Release: Yarn 4.0 🪄⚗️](https://yarnpkg.com/blog/release/4.0)
>
> ****
>
> 进入省流模式
>
> ****

## 省流模式

### 破坏性更新|Breaking Changes

- 需要Node.js 18+
- 使用 `yarn init` 创建的新项目将不再默认启用零安装 [zero-installs](https://yarnpkg.com/features/caching#zero-installs)
- 使用 `yarn init` 创建的新项目将使用Corepack而不是 [yarnPath](https://yarnpkg.com/configuration/yarnrc#yarnPath)
- 所有官方插件（ `typescript` ， `interactive-tools` ，.）现在默认包括在内。
- [`yarn workspaces foreach`](https://yarnpkg.com/cli/workspaces/foreach) 命令的语法略有变化

### Hardened Mode 硬化模式

硬化模式能够进一步保护你的项目免受常见攻击，在此模式下运行时，Yarn将执行两个额外的验证：

- 它将验证存储在lockfile中的resolutions是否与可以解析的resolutions范围一致。
- 它将验证存储在lockfile中的包元数据与远程注册表元数据是否一致。

> 硬化模式通过切换 `enableHardenedMode` 启用，但当Yarn检测到它在公共存储库上的GitHub pull请求中运行时，它也会自动启用。这可以通过在yarnrc文件中显式关闭 `enableHardenedMode` 来禁用。
>
> 在硬化模式约束下运行的安装比通常要慢得多，因为它们需要执行许多网络请求。不建议默认开启，如果在特定的CI作业中需要它，开启方式通过环境变量：
>
> ```
> export YARN_ENABLE_HARDENED_MODE=1
> ```

###  JavaScript 约束

Prolog约束从Yarn 4开始被弃用，并且它们已经被一个闪亮的新的基于JavaScript的引擎所取代，具有可选的TypeScript支持！

### TypeScript集成，交互式工具

Yarn的一些功能以前是作为插件提供的，需要与主要包分开管理。尽管这有助于构建插件生态系统，但对用户来说管理起来很有挑战。我们实施了一些功能来简化管理（当你自动更新Yarn时自动升级插件），你现在可以在没有插件的情况下使用 `yarn upgrade-interactive` 和 `yarn stage` ，如果你在项目中配置了TypeScript，Yarn现在将在你使用 `yarn add` 和 `yarn remove` 更新依赖项时根据需要**自动**添加和删除 `@types` 包。

> Yarn仍然支持第三方插件（将来也会继续支持）

### 改进的用户界面

yarn4改进了UI，`yarn install` 现在会告诉添加的包及其总重量。你也会注意到它不会打印太多关于对等依赖的警告，因为Yarn4现在只尝试打印可操作情况的警告：

![image-20231031233207750](https://fs.lwmc.net/uploads/2023/10/1698766327223-202310312332799.webp)

另一个例子是 `yarn config` 命令，它支持一个新的树显示，现在还接受任意数量的设置作为位置参数:

![image-20231031233225298](https://fs.lwmc.net/uploads/2023/10/1698766344320-202310312332335.webp)

### 性能表现

安装速度明显快于3.6。在官方示例中（约提高3倍），通过新的包元数据缓存，显著提高了重复安装的性。这些变化使得Yarn在大多数情况下与pnpm一样快（[Performances | Yarn](https://yarnpkg.com/features/performances)），尽管竞争仍然激烈。

### 更好的官网

网站在风格和内容上都进行了大修，确实变得更好了，而且文档间链接能力非常完善。

### 结束语

在发布了53个候选版本后，Yarn 3已经过渡到Yarn 4。这次迭代的重点是改善用户体验并减少学习曲线。Yarn团队努力避免重大的破坏性变化，并鼓励反馈。未来的计划包括探索原生Yarn构建和解决性能问题。但是，目前还没有完全重写代码库的计划。Yarn团队将继续在现有的基础上，完善CLI、UI命令和减少学习曲线。