# 为什么是 pnpm？我们为何使用monorepo？

## pnpm 是什么？

> Fast, disk space efficient package manager.

pnpm 是新一代 node 包管理器。它由 npm/yarn 衍生而来，但却解决了 npm/yarn 内部潜在的 bug，并且极大了地优化了性能，扩展了使用场景，相比 yarn、npm，pnpm安装包更快速，对包的依赖管理更偏平，对磁盘占用更少。

### 特点

**快速**：pnpm 比其他包管理器快 2 倍

pnpm 比 传统的 npm 和 Yarn 快 2 倍。[查看所有基准](https://r.pnpm.io/benchmarks)，是具有大量依赖项的应用程序的基准测试：

![img](https://camo.githubusercontent.com/83b108abddef5c40f6afc985fa8214edc92b6f2226a83d577074a720907463c8/68747470733a2f2f706e706d2e696f2f696d672f62656e63686d61726b732f616c6f7474612d66696c65732e737667)

**高效利用磁盘空间**：node_modules中的文件是从单个内容寻址存储中的克隆或硬链接 。

:star:**支持 monorepos**：pnpm 内置支持单仓多包。(接下来要讲)

**严格**：pnpm 默认创建了一个非平铺的 node_modules，因此代码无法访问任意包。



关于pnpm如何高效利用磁盘空间以及为何选择创建非扁平化的node_modules，可以查看文章[扁平 node_modules 不是唯一的方法](https://pnpm.io/blog/2020/05/27/flat-node-modules-is-not-the-only-way)。 

## 关于monorepo

前文提到pnpm支持monorepo，我们来说一下什么是monorepo，以及其的可用性：

**:star:注意：monorepo不是pnpm专属，yarn 也可以通过 workspace 管理 monorepo，可以看[Monorepo最佳实践之Yarn Workspaces](https://juejin.cn/post/7011024137707585544)了解 **

monorepo 是把多个项目的所有代码放到一个 git 仓库中进行管理，多个项目中会有共享的代码则可以分包引用。整个项目就是有 root 管理的 dependencies 加上多个 packages，每个 package 也可以在自己的作用域引入自己的 dependencies。

### 为什么要使用 monorepo

使用 monorepo 可以把原本一个项目的多个模块拆分成多个 packages，在 packages 之间相互引用，也可以单独发布成包，极大地解决了项目之间代码无法重用的痛点。在项目打包或者编译操作时也可重用一套配置，通吃所有 packages。

### Monorepo 与 Multirepo

> A monorepo keeps everything in one repository. A multirepo (multiple repositories) typically has one repository for each project. The more projects, the more repositories. A multirepo is also known as polyrepo.
>
> monorepo 将所有内容保存在一个存储库中。一个 multirepo（multiple repositories）通常为每个项目都提供一个存储库。项目越多，存储库就越多。multirepo 也称为 polyrepo。

#### Monorepo 通常最适合……

- 使用单个存储库可以查看每个项目的代码和资源，这可以帮助我们管理依赖项。

- 单个存储库使协作更容易。这是因为每个人都可以访问全部代码、文件和资源。因此，开发人员可以共享和重用资源。

- 使用单个存储库可以帮助加速开发。例如，我们可以进行原子更改（一个操作可以跨多个项目进行更改）。

#### Multirepo 通常最适合……

- **需要使用 Git 的大型项目**。使用 Git 管理的大规模 monorepo 不会永远高效，并不适合将团队项目全部梭哈，而是根据业务、依赖性选择性使用Multirepo。

- **开源或第三方库** 。在某些版本控制系统中，需要多个存储库才能使用的开源项目或与第三方团队合作，并且需要确保第三方开发人员只能访问他们正在处理的项目。

## 留下讨论问题

- 为什么不是全部进行软/硬连接？

- 什么是“幽灵依赖”？

-  这种思路很难想吗？为什么pnpm这么长时间才出现

> **参考：**
>
> [Github pnpm](https://github.com/pnpm/pnpm)
>
> [Flat node_modules is not the only way](https://pnpm.io/blog/2020/05/27/flat-node-modules-is-not-the-only-way)
>
> [单体仓库与多仓库都有哪些优势劣势](https://ssoor.github.io/2020/03/24/mono-repo-vs-multi-repo/)
>
> [What Is a Monorepo?](https://www.perforce.com/blog/vcs/what-monorepo)
