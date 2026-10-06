> 原文：[An intro to TSConfig for JavaScript Developers](https://deno.com/blog/intro-to-tsconfig)
> 
> 原标题：An intro to TSConfig for JavaScript Developers
>
> 作者：[Jo Franchetti](https://github.com/thisisjofrank)

JavaScript 从最初作为一种简单的脚本语言开始不断发展，成为用于构建复杂应用程序的强大、现代的语言工具。为了管理更大、复杂的代码库，JavaScript 开发人员不断寻找方法改善他们的工作流程、代码质量和生产力。TypeScript 是一个通过添加类型来提高代码质量和维护效率的重大创新，因此毫不奇怪[它是目前增长最快的语言之一](https://medium.com/@easycodingschool13/typescript-is-fastest-growing-programming-language-4c1ec9462ef8#:~:text=According to the JetBrains Status,growing programming language in 2022.)。

如果你从未使用过编译语言或编译器，TypeScript 可能会让你感到害怕。或者也许你遇到过复杂的 `tsconfig.json` 文件，而你并不完全理解。这篇博文是介绍 TypeScript (TS) 以及如何配置你的项目以轻松使用 TypeScript。

> 🚨️ **想要在没有任何配置的情况下编写和运行 TypeScript 吗？** 🚨️
>
> [Deno 原生支持 TypeScript。](https://deno.land/manual/advanced/typescript) 只需创建一个 `.ts` 文件并运行 `deno run yourfile.ts` 即可。

从 JS 到 TS
----------------------
TypeScript 构建在 JavaScript 之上。它是一个超集——任何有效的 JavaScript 是有效的 TypeScript。如果你是 TypeScript 新手，很容易将其视为 “超级强大的 linter”，为该语言添加新功能以帮助你编写 JavaScript 安全。它被设计为严格附加的——TypeScript 带有剥离出来的类型只是 JavaScript，但是有了类型，你会得到很多改进了工具、调试和一般开发人员体验。

由于 JavaScript 生态系统随着时间的推移而有机发展，TypeScript 旨在适应你现有的工具。现代编辑器、构建工具、包管理器、测试框架和 CI/CD 工具都与 TypeScript 集成。为了采用 TypeScript，并根据你的特定项目需求进行定制和工具，你将需要配置 TypeScript 编译器。这可以通过使用名为 `tsconfig.json` 的文件来完成。

如果你是第一次在新的代码库中使用 TypeScript，你可能将 `tsconfig.json` 中的大部分选项保留为默认值。对于项目使用需要互操作或具有特定怪癖的工具，`tsconfig.json` 提供你可能需要拉动与你的生态系统互动的所有离职者。

## TSConfig 设置

`tsconfig.json` 文件允许你配置 TypeScript 编译器如何处理你的 TypeScript 代码。`tsconfig.json` 文件只是一个具有定义编译器选项和项目设置的属性的 JSON 对象。我们会通过一些你在设置自己的 `tsconfig.json` 文件时可能需要的属性进行讲解：

### `compilerOptions` 中的编译器设置

`compilerOptions` 属性是你定义 TypeScript 编译器设置的位置。这些选项包括：

- `target` - 指定发出的 JavaScript 的 ECMAScript 目标版本。默认为 ES3。为了确保最大兼容性，请将其设置为你的代码需要运行的最低版本。`ESNext` 设置允许你定位 [最新支持的建议功能](https://github.com/tc39/proposals)。
- `module` - 定义要使用的模块系统（`CommonJS`、`AMD`、`ES6` 等）。使用取决于你的项目的要求和代码的环境。大多数现代项目将使用 `ES6` 或 `ESNext`。
- `outDir` - 指定编译后的 JavaScript 文件的输出目录。通常设置为 `dist` 为编译文件创建 dist 目录。
- `strict` - 启用严格的类型检查选项以帮助捕获错误代码。设置为 `true` 以进行严格的类型检查。
- `alwaysStrict` - 如果启用 `strict`，则自动设置为 `true`，此解析 JavaScript 严格模式下的代码并对每个源文件发出 `use strict`。
- `esModuleInterop` - 在 JavaScript 中，有两个主要的模块系统：ECMAScript 模块 (ESM) 和 CommonJS 模块 (CJS)。它们对导入和导出有不同的语法和语义。在使用 ESM 和 CJS 模块的 TypeScript 项目中工作时，将 `esModuleInterop` 设置为 `true` 确保 TypeScript 以一种方式处理导入和导出。

- `include` - 指定 TypeScript 的文件路径或 glob 模式数组，应该包含在编译过程中。仅匹配指定的文件模式将被考虑进行编译。你可以使用全局模式（例如，“src/**/*.
ts”）包含来自特定目录或特定文件的文件。
- `exclude` - 此设置指定文件路径或 glob 模式的数组，TypeScript 应从编译过程中排除（即使它们与 **`include`** 设置中指定的模式）。你可以使用 **`exclude`** 来忽略不希望被编译的文件或目录，例如测试文件、构建工件或第三方库。通常你会想要排除你的 `node_modules` 文件夹。

**其他可能有用的设置：**

- `jsx` – 如果你使用 JSX（例如与 React 一起），此设置决定 [你的 JSX 文件应如何被处理](https://github.com/microsoft/TypeScript-Handbook/blob/master/pages/JSX.md)（`preserve`、`react`、`react-native` 等）。

- `removeComments` – 从你编译的代码中去除注释。如果你要压缩编译后的代码，这非常有帮助。

- `sourceRoot` – 指定调试器在调试时应该在何处定位 TypeScript 文件，而不是源位置。如果运行时的源文件位置与设计时不同，使用此标志。指定的位置将被嵌入到源映射中，以引导你的调试器。

### **其他 TSConfig 设置**

- `include` – 指定 TypeScript 应该在编译过程中包含的文件路径或 glob 模式的数组。只有匹配指定模式的文件才会被考虑进行编译。你可以使用 glob 模式（如：“src/**/*.ts”）来包括特定目录或特定文件扩展名的文件。如果没有指定 include，TypeScript 默认将项目目录中的所有 `.ts`、`.tsx` 和 `.d.ts` 文件纳入编译。

- `exclude` – 此设置指定 TypeScript 应该从编译过程中排除的文件路径或通配模式数组（即使它们与 **`include`** 设置中指定的模式匹配）。你可以使用 **`exclude`** 忽略你不想要编译的文件或目录，例如测试文件、构建产物或第三方库。通常你会想要排除你的 `node_modules` 文件夹。

### TSConfig 的附加特性和功能

- **Declaration Maps 声明映射** - 如果在你的 `tsconfig.json` 中设置了 `declarationMap` 为 true，TypeScript 可以生成声明映射文件 (`.d.ts.map`) 与声明文件 (`.d.ts`)。声明映射的目的类似于源映射，但专用于 TypeScript 声明文件。这些声明映射提供了生成的声明文件及其相应的源映射文件之间的映射，有助于调试并提供更好的工具支持。
- **Watch Mode 观察模式** - TypeScript 的 watch 模式 `tsc --watch` 监视你的 TypeScript 文件的更改，并在修改时自动重新编译它们。这在开发过程中很有用，因为它加快了反馈循环并消除了每次更改后手动触发编译的需要。
- **Incremental Builds 增量构建** - TypeScript 的增量构建功能跟踪你的项目文件和依赖项的更改，允许它仅重新构建自上次编译以来已更改的项目部分。这可以提高大型项目的编译时间。
- **Override Options 选项覆盖** - 你可以使用 TypeScript 源文件中的注释指令为单个文件或文件集覆盖特定的编译器选项。例如，你可以使用 `// @ts-ignore` 禁用某些严格检查或使用 `// @ts-nocheck` 为特定代码段指定自定义编译器选项。

使用你的 `tsconfig.json` 文件作为解锁项目中 TypeScript 全部潜力的切入口。通过理解其目的并利用其功能，你可以自信地拥抱 TypeScript，并获得更可靠、高效和愉快的开发体验。

## 接下来是什么？

越来越多的开发者使用 TypeScript 来构建更高质量的代码库并且提高生产力。希望这篇文章能够使大家对使用 `tsconfig.json` 设置新的 TypeScript 项目时有所启发。

不过，如果你有兴趣在不进行任何配置的情况下深入了解 TypeScript，[Deno 原生支持 TypeScript](https://deno.land/manual/advanced/typescript)。只需创建一个 `.ts` 文件，编写一些类型定义，然后立即使用 `deno run your_file.ts` 运行它。