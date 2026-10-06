# 【开源速递】探索 Rolldown：面向 Vite 未来的 JavaScript 打包工具

在现代前端开发中，打包工具扮演着至关重要的角色，它们帮助我们将多个文件和模块合并成一个或几个包，以便在浏览器中使用。近年来，我们见证了许多优秀的打包工具的诞生和发展，例如 Webpack、Rollup 和 esbuild 等。今天，我们要介绍的是一个新正式开源的打包工具——Rolldown，它旨在成为 [Vite](https://vitejs.dev/) 未来使用的打包工具。

## Rolldown 简介


Rolldown 是一个用 Rust 编写的 JavaScript 打包工具，它提供了与 Rollup 兼容的 API 和插件接口，但在范围上更类似于 esbuild。目前，Rolldown 还处于积极开发阶段，尚不适用于生产环境，但开发团队已经开源，以便开始与社区贡献者合作。

## 为什么要构建 Rolldown

Vite 目前内部依赖两个打包工具：esbuild 和 Rollup。Esbuild 以其惊人的速度和丰富的功能而闻名，但在应用程序打包方面，特别是在代码分割限制方面，其输出并不理想。而 Rollup 则在打包应用程序方面经过了实战考验，但与用编译到本地语言编写的打包工具相比，它的速度明显较慢。

使用两个不同的打包工具在多个方面都不是最佳选择，例如，输出之间的微妙差异可能会导致开发和生产构建之间的行为差异，以及在生产构建过程中，用户源代码被不同工具重复解析、转换和序列化，导致很多可以避免的开销。

理想情况下，Vite 希望能够利用一个单一的打包工具，该工具提供本地级别的性能，内置转换功能以避免解析/序列化开销，与 Rollup 兼容的插件接口，以及适合大规模应用程序的高级构建输出控制。这就是构建 Rolldown 的原因。

## Rolldown 的特点和未来规划

Rolldown 基于 Oxc 构建，目前利用其解析器和解析器，并计划在未来利用 Oxc 的转换器和压缩器。Rolldown 的内部架构更接近 esbuild 而非 Rollup，其代码分割逻辑可能也会与 Rollup 的不同。Rolldown 的范围也比 Rollup 更大，更类似于 esbuild，它将内置 CommonJS 支持、`node_modules` 解析，并在未来支持 TypeScript / JSX 转换和压缩。

## 加入 Rolldown

Rolldown 目前还处于早期阶段，其开发团队正面向社区贡献者进行招募，并积极寻找对改进 JavaScript 工具链有长期计划的团队成员。如果你对此感兴趣，可以通过以下链接了解更多信息和如何参与：

- [GitHub](https://github.com/rolldown/rolldown)
- [贡献指南](https://rolldown.rs/contrib-guide/)
- [Discord聊天](https://chat.rolldown.rs/)

Rolldown 的出现预示着前端打包工具的又一次进化，它的目标是提供一个高性能、易于使用且功能丰富的解决方案，以满足现代前端开发的需求。让我们拭目以待，看看 Rolldown 将如何改变我们构建和部署前端应用程序的方式。