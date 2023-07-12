# Eslint

Eslint 是国外的前端大牛`Nicholas C. Zakas`在 2013 年发起的一个开源项目，有一本书被誉为前端界的"圣经"，叫《JavaScript 高级程序设计》(即红宝书)，他正是这本书的作者。

`Nicholas` 当初做这个开源项目，就是为了打造一款插件化的 JavaScript 代码静态检查工具，通过解析代码的 AST 来分析代码格式，检查代码的风格和质量问题。现在，Eslint 已经成为一个非常成功的开源项目了，基本上属于前端项目中 Lint 工具的标配。

ESLint 的使用并不复杂，主要通过配置文件对各种代码格式的规则(`rules`)进行配置，以指定具体的代码规范。目前开源社区也有一些成熟的规范集可供使用，著名的包括[Airbnb JavaScript 代码规范](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fairbnb%2Fjavascript)、[Standard JavaScript 规范](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fstandard%2Fstandard%2Fblob%2Fmaster%2Fdocs%2FREADME-zhcn.md)、[Google JavaScript 规范](https://link.juejin.cn/?target=https%3A%2F%2Fgoogle.github.io%2Fstyleguide%2Fjsguide.html)等等，你可以在项目中直接使用这些成熟的规范，也可以自己定制一套团队独有的代码规范，这在一些大型团队当中还是很常见的。

#### 安装 & 初始化

```bash
pnpm i eslint -D
```

接着执行 ESLint 的初始化命令，并进行如下的命令行交互:

```ts
npx eslint --init
```

#### 核心配置

#### 1. parser - 解析器

ESLint 底层默认使用 [Espree](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Feslint%2Fespree)来进行 AST 解析，这个解析器目前已经基于 `Acron` 来实现，虽然说 `Acron` 目前能够解析绝大多数的 [ECMAScript 规范的语法](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Facornjs%2Facorn%2Ftree%2Fmaster%2Facorn)，但还是不支持 TypeScript ，因此需要引入其他的解析器完成 TS 的解析。

社区提供了`@typescript-eslint/parser`这个解决方案，专门为了 TypeScript 的解析而诞生，将 `TS` 代码转换为 `Espree` 能够识别的格式(即 [**Estree 格式**](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Festree%2Festree))，然后在 Eslint 下通过`Espree`进行格式检查， 以此兼容了 TypeScript 语法。

#### 2. parserOptions - 解析器选项

这个配置可以对上述的解析器进行能力定制，默认情况下 ESLint 支持 ES5 语法，你可以配置这个选项，具体内容如下:

- ecmaVersion: 这个配置和 `Acron` 的 [ecmaVersion](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Facornjs%2Facorn%2Ftree%2Fmaster%2Facorn) 是兼容的，可以配置 `ES + 数字`(如 ES6)或者`ES + 年份`(如 ES2015)，也可以直接配置为`latest`，启用最新的 ES 语法。
- sourceType: 默认为`script`，如果使用 ES Module 则应设置为`module`
- ecmaFeatures: 为一个对象，表示想使用的额外语言特性，如开启 `jsx`

#### 3. rules - 具体代码规则

`rules` 配置即代表在 ESLint 中手动调整哪些代码规则，比如`禁止在 if 语句中使用赋值语句`这条规则可以像如下的方式配置:

```ts
// .eslintrc.js
module.exports = {
  // 其它配置省略
  rules: {
    // key 为规则名，value 配置内容
    "no-cond-assign": ["error", "always"]
  }
}
```

在 rules 对象中，`key` 一般为`规则名`，`value` 为具体的配置内容，在上述的例子中我们设置为一个数组，数组第一项为规则的 `ID`，第二项为`规则的配置`。

这里重点说一说规则的 ID，它的语法对所有规则都适用，你可以设置以下的值:

- `off` 或 `0`: 表示关闭规则。
- `warn` 或 `1`: 表示开启规则，不过违背规则后只抛出 warning，而不会导致程序退出。
- `error` 或 `2`: 表示开启规则，不过违背规则后抛出 error，程序会退出。

具体的规则配置可能会不一样，有的是一个字符串，有的可以配置一个对象，你可以参考 [ESLint 官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fcn.eslint.org%2Fdocs%2Frules%2F)。

当然，你也能直接将 `rules` 对象的 `value` 配置成 ID，如: `"no-cond-assign": "error"`。

#### 4. plugins

上面提到过 ESLint 的 parser 基于`Acorn`实现，不能直接解析 TypeScript，需要我们指定 parser 选项为`@typescript-eslint/parser`才能兼容 TS 的解析。同理，ESLint 本身也没有内置 TypeScript 的代码规则，这个时候 ESLint 的插件系统就派上用场了。我们需要通过添加 ESLint 插件来增加一些特定的规则，比如添加`@typescript-eslint/eslint-plugin` 来拓展一些关于 TS 代码的规则，如下代码所示:

```js
// .eslintrc.js
module.exports = {
  // 添加 TS 规则，可省略`eslint-plugin`
  plugins: ['@typescript-eslint']
}
```

值得注意的是，添加插件后只是拓展了 ESLint 本身的规则集，但 ESLint 默认并**没有开启**这些规则的校验！如果要开启或者调整这些规则，你需要在 rules 中进行配置，如:

```js
// .eslintrc.js
module.exports = {
  // 开启一些 TS 规则
  rules: {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  }
}
```

#### 5. extends - 继承配置

extends 相当于`继承`另外一份 ESLint 配置，可以配置为一个字符串，也可以配置成一个字符串数组。主要分如下 3 种情况:

1. 从 ESLint 本身继承；
2. 从类似 `eslint-config-xxx` 的 npm 包继承；
3. 从 ESLint 插件继承；
4. 从配置文件中继承。

```ts
// .eslintrc.js
module.exports = {
   "extends": [
     // 第1种情况 
     "eslint:recommended",
     // or 启用当前安装的 ESLint 中所有的核心规则
     "eslint:all",
     // 第2种情况，一般配置的时候可以省略 `eslint-config`
     "standard"
     // 第3种情况，可以省略包名中的 `eslint-plugin`
     // 格式一般为: `plugin:${pluginName}/${configName}`
     "plugin:react/recommended"
     "plugin:@typescript-eslint/recommended",
     // 第4种
     "./node_modules/coding-standard/eslintDefaults.js",
   ]
}
```

有了 extends 的配置，对于之前所说的 ESLint 插件中的繁多配置，我们就**不需要手动一一开启**了，通过 extends 字段即可自动开启插件中的推荐规则:

```js
extends: ["plugin:@typescript-eslint/recommended"]
```

更多继承配置项：[Configuring ESLint - ESLint中文文档](https://eslint.bootcss.com/docs/user-guide/configuring)

#### 6. env 和 globals

这两个配置分别表示`运行环境`和`全局变量`，在指定的运行环境中会预设一些全局变量，比如:

```js
// .eslint.js
module.export = {
  "env": {
    "browser": "true",
    "node": "true"
  }
}
```

指定上述的 `env` 配置后便会启用浏览器和 Node.js 环境，这两个环境中的一些全局变量(如 `window`、`global` 等)会同时启用。

有些全局变量是业务代码引入的第三方库所声明，这里就需要在`globals`配置中声明全局变量了。每个全局变量的配置值有 3 种情况:

1. `"writable"`或者 `true`，表示变量可重写；
2. `"readonly"`或者`false`，表示变量不可重写；
3. `"off"`，表示禁用该全局变量。

那`jquery`举例，我们可以在配置文件中声明如下:

```js
// .eslintrc.js
module.exports = {
  "globals": {
    // 不可重写
    "$": false, 
    "jQuery": false 
  }
}
```

相信有了上述核心配置部分的讲解，你再回头看看初始化生成的 ESLint 配置文件，你也能很好地理解各个配置项的含义了。

### eslint-plugin-vue

是Vue.js 的官方 ESLint 插件。这个插件允许我们使用 ESLint 检查文件的`<template>`和，以及文件中的 Vue 代码。

> Tips:
>
> 插件支持Vue.js 3.2的基本语法、`<script setup>`CSS变量注入，但尚不支持Vue.js 3.2的实验性特性ref糖。

#### 安装

```shell
npm install --save-dev eslint eslint-plugin-vue
# or 
yarn add -D eslint eslint-plugin-vue
```

 要求：

- ESLint v6.2.0 及以上版本
- Node.js v14.17.x、v16.x 及更高版本

#### 使用

实例**.eslintrc.js**

```js
module.exports = {
  extends: [
    'plugin:vue/base',
    // Vue3 配置
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    // Vue2 配置
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
  ],
}
```

查看[规则列表](https://eslint.vuejs.org/rules/)以获取此插件提供的`extends`和 `rules`

#### 捆绑配置

这个插件提供了一些预定义的配置，可以通过将以下配置添加到`extends`.

- `"plugin:vue/base"`...启用正确 ESLint 解析的设置和规则。
- 使用 Vue.js 3.x 的配置。
  - `"plugin:vue/vue3-essential"`... `base`，加上防止错误或意外行为的规则。
  - `"plugin:vue/vue3-strongly-recommended"`... 以上，加上可显着提高代码可读性和/或开发体验的规则。
  - `"plugin:vue/vue3-recommended"`... 以上，加上强制执行主观社区默认设置以确保一致性的规则。
- 使用 Vue.js 2.x 的配置。
  - `"plugin:vue/essential"`... `base`，加上防止错误或意外行为的规则。
  - `"plugin:vue/strongly-recommended"`... 以上，加上可显着提高代码可读性和/或开发体验的规则。
  - `"plugin:vue/recommended"`... 以上，加上强制执行主观社区默认设置以确保一致性的规则

#### 从命令行运行 ESLint

如果要`eslint`从命令行运行，请确保[使用选项](https://eslint.org/docs/user-guide/configuring#specifying-target-files-to-lint)`.vue`或 glob 模式包含扩展名[，`--ext`](https://eslint.org/docs/user-guide/configuring#specifying-target-files-to-lint)因为`.js`默认情况下 ESLint 仅针对文件。

举个例子：

```bash
eslint --ext .js,.vue src
eslint "src/**/*.{js,vue}"
```

如果你安装了[@vue/cli-plugin-eslint](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint)，你应该将`lint`脚本添加到你的`package.json`. 这意味着您可以运行`yarn lint`or `npm run lint`。

#### 如何使用自定义解析器？

如果你想使用自定义解析器，比如[@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)或[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)，你必须使用`parserOptions.parser`option 而不是`parser`option 。因为这个插件需要[vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser)来解析`.vue`文件，所以如果你覆盖这个选项，这个插件就不起作用了`parser`。

```diff
- "parser": "@typescript-eslint/parser",
+ "parser": "vue-eslint-parser",
  "parserOptions": {
+     "parser": "@typescript-eslint/parser",
      "sourceType": "module"
  }
```

该`parserOptions.parser`选项还可以指定一个对象来指定多个解析器。有关详细信息，请参阅[vue-eslint-parser README 。](https://github.com/vuejs/vue-eslint-parser#readme)

#### 解析器选项

如果使用[vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser)解析器。对于`parserOptions`，你可以使用`vueFeatures`选项去配置`vue-eslint-parser`。

```JSON
{
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "vueFeatures": {
      "filter": true,
      "interpolationAsNonHTML": false,
    }
  }
}
```

有关详细信息，请参阅[`parserOptions.vueFeatures`文档。`vue-eslint-parser`](https://github.com/vuejs/vue-eslint-parser#parseroptionsvuefeatures)

更多阅读：[用户指南 | eslint-插件-vue](https://eslint.vuejs.org/user-guide/)

### 在 Vite 中接入 ESLint

`vite-plugin-eslint`可以在开发阶段进行 ESLint 扫描，以命令行的方式展示出代码中的规范问题，并能够直接定位到原文件。

安装：

```bash
npm install eslint vite-plugin-eslint --save-dev
# or
yarn add eslint vite-plugin-eslint -D
```

`vite.config.ts` 中接入:

```ts
// vite.config.ts
import viteEslint from 'vite-plugin-eslint';

// 具体配置
{
  plugins: [
    // 省略其它插件
    viteEslint(),
  ]
}
```

## Prettier

### 安装 & 初始化

```bash
pnpm i prettier -D
```

在项目根目录新建`.prettierrc.js`配置文件

```js
// .prettierrc.js
module.exports = {
  printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, // 一个 tab 代表几个空格数，默认为 2 个
  useTabs: false, //是否使用 tab 进行缩进，默认为false，表示用空格进行缩减
  singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
  semi: true, // 行尾是否使用分号，默认为true
  trailingComma: "none", // 是否使用尾逗号
  bracketSpacing: true // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }
};
```

### 结合 Eslint

接下来我们将`Prettier`集成到现有的`ESLint`工具中，首先安装两个工具包:

```js
pnpm i eslint-config-prettier eslint-plugin-prettier -D
```

其中`eslint-config-prettier`用来覆盖 ESLint 本身的规则配置，避免冲突。而`eslint-plugin-prettier`则是用于让 Prettier 来接管`eslint --fix`即修复代码的能力。

```js

extends: [
  // 其他配置
  // 接入 prettier 的规则
  "prettier",
  "plugin:prettier/recommended"
],
```

## Stylelint

Stylelint 的强大源于：

- 拥有超过 **170 条内置规则** 赖检查最新的 CSS 语法和功能
- 支持 **插件** 以创建你自己的规则
- 自动 **修复** 大多数代码格式上的问题
- 经过 15000 多次的 **充分的单元测试**
- 支持扩展或创建 **可共享的配置**
- **非强制约束（unopinionated）**，可根据你自己的需求进行自定义
- 像 Prettier 一样可以 **美化打印** 效果
- 拥有一个 **不断增长的社区**，并且被 Google、GitHub 和 WordPress 所使用

还可以被扩展为：

- 解析 **类似 CSS 的语法**，例如 SCSS、Sass、Less 以及 SugarSS
- 能够从 HTML、Markdown 和 CSS-in-JS 对象以及模板文本中提取 **内嵌的样式代码**

**它是如何帮助你的？**
它可以帮助你避免错误，例如：

- 无效的东西，比如说畸形的网格区域
- 有问题的有效内容，如重复的选择器
- 未知的东西，例如，拼错的属性名称

不允许的事情，例如：

- 不允许的事情，比如说特定的单位
- 强制执行命名模式，例如，自定义属性的命名模式
- 设置限制，例如，ID选择器的数量
- 指定符号，例如，现代颜色功能的符号

我们建议在使用Stylelint的同时使用Prettier。Linters和pretty printers是互补的工具，它们一起工作，帮助你写出一致且无错误的代码。

### 使用




## 参考

- [深入浅出 Vite - 神三元 - 掘金小册](https://juejin.cn/book/7050063811973218341?enter_from=course_center&utm_source=course_center)
- [Home | Stylelint](https://stylelint.io/)
- [Introduction | eslint-plugin-vue](https://eslint.vuejs.org/)
