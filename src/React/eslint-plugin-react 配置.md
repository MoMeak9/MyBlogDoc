## 安装

```bash
npm install eslint eslint-plugin-react --save-dev
```

也可以全局而不是本地安装 ESLint（使用`npm install -g eslint`）。但是，不建议这样做，无论哪种情况，你使用的任何插件或可共享配置都必须安装在本地。

##  配置 `.eslintrc`

1. `.eslintrc.js` 或者`.eslintrc.json`,添加预设默认值：

```json
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended" // 当前插件的
  ]
```

如果在使用[来自 React 17 的新 JSX 转换](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports)，请使用[`react/jsx-runtime`](https://github.com/jsx-eslint/eslint-plugin-react/blob/c8917b0885094b5e4cc2a6f613f7fb6f16fe932e/index.js#L163-L176)扩展 eslint 配置（添加`"plugin:react/jsx-runtime"`到`"extends"`）以禁用相关规则。

```json
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended" // 当前插件的
    "plugin:react/jsx-runtime" // 补充配置
  ]
```

2. 将“React”添加到插件部分

```json
{
  "plugins": [
    "react"
  ]
}
```

3. 启用 JSX 支持。（eslint 2以上版本）

```json
{
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

4. 开启某些额外想要使用的规则

```json
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  }
```

### 可共享配置

这个插件导出了一个`recommended`强制执行 React 良好实践的配置。

要启用此配置，请使用配置文件`extends`中的属性`.eslintrc`：

```
{
  "extends": ["eslint:recommended", "plugin:react/recommended"]
}
```

有关扩展配置文件的更多信息，请参阅[`eslint`文档。](https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files)

#### 全部

此插件还导出`all`包含每个可用规则的配置。这与规则很相配`eslint:all`。

```
{
  "plugins": [
    "react"
  ],
  "extends": ["eslint:all", "plugin:react/all"]
}
```

**注意**：这些配置将在[解析器选项](https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options)`eslint-plugin-react`中导入和启用 JSX 。

## 新配置 `eslint.config.js` 

从[`v8.21.0`](https://github.com/eslint/eslint/releases/tag/v8.21.0)，eslint 宣布了一个新的配置系统。在新系统中，`.eslintrc*`不再使用。`eslint.config.js`将是默认的配置文件名。在 eslint 中`v8`，遗留系统 ( `.eslintrc*`) 仍将受支持，而在 eslint 中`v9`，仅支持新系统。

然后[`v8.23.0`](https://github.com/eslint/eslint/releases/tag/v8.23.0)，eslint CLI 开始查找`eslint.config.js`。 **因此，如果你的 eslint 是`>=8.23.0`，那么你得 100% 准备好使用新的配置系统。**

官方博客文章，

- https://eslint.org/blog/2022/08/new-config-system-part-1/
- https://eslint.org/blog/2022/08/new-config-system-part-2/
- https://eslint.org/blog/2022/08/new-config-system-part-3/

和[官方文档](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new)。

###  插件

默认导出的`eslint-plugin-react`是一个插件对象。

```js
const react = require('eslint-plugin-react');
const globals = require('globals');

module.exports = [
  …
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // ... any rules you want
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
     },
    // ... others are omitted for brevity
  },
  …
];
```

###  配置共享设置

参考[官方文档](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuring-shared-settings)。

对象的架构`settings.react`将与上面遗留配置部分中已经描述的架构相同。

### 可共享的配置

还有 3 个可共享的配置。

- `eslint-plugin-react/configs/all`
- `eslint-plugin-react/configs/recommended`
- `eslint-plugin-react/configs/jsx-runtime`

如果你的`eslint.config.js` 是 ESM，请包含`.js`扩展名，但是下个主要版本可以忽略。

在新的配置系统中，`plugin:`协议（例如`plugin:react/recommended`）不再有效。由于 eslint 不会自动导入预设配置（可共享配置），您需要自己明确地导入。

```js
const reactRecommended = require('eslint-plugin-react/configs/recommended');

module.exports = [
  …
  reactRecommended, // This is not a plugin object, but a shareable config object
  …
];
```

**注意**：我们的可共享配置不会预先配置`files`或[`languageOptions.globals`](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuration-objects). 对于大多数情况，你可能希望自己配置一些属性。

```js
const reactRecommended = require('eslint-plugin-react/configs/recommended');
const globals = require('globals');

module.exports = [
  …
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...reactRecommended,
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  …
];
```

上面的例子和下面的例子一样，因为新的配置系统是基于link的。

```js
const reactRecommended = require('eslint-plugin-react/configs/recommended');
const globals = require('globals');

module.exports = [
  …
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...reactRecommended,
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  …
];
```

## 支持规则列表

[jsx-eslint/eslint-plugin-react：ESLint 的特定于 React 的 linting 规则](https://github.com/jsx-eslint/eslint-plugin-react#list-of-supported-rules)

## 参考文档

- [jsx-eslint/eslint-plugin-react: React-specific linting rules for ESLint](https://github.com/jsx-eslint/eslint-plugin-react)
