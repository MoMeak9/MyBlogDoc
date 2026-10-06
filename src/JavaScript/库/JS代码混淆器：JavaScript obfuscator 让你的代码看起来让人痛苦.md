

在开发 JavaScript 应用程序时，保护源代码免受未经授权的访问和修改是一个重要的考虑因素。这就是 JavaScript Obfuscator 发挥作用的地方。本文将深入探讨 JavaScript Obfuscator 的原理和使用方法，帮助开发者有效地保护他们的代码。

## 什么是 JavaScript Obfuscator？

![image.png](https://raw.githubusercontent.com/javascript-obfuscator/javascript-obfuscator/master/images/logo.png)


JavaScript Obfuscator 是一个强大的工具，它通过转换和混淆代码来帮助开发者保护他们的 JavaScript 源代码。这种转换不会改变程序的执行方式，但会使代码难以理解和修改，从而为源代码提供了一层保护。

## 它是如何工作？

JavaScript Obfuscator 通过以下几种方式工作来混淆代码：

- **变量名和函数名替换**：将原始的变量名和函数名替换为难以理解的字符序列。
- **字符串混淆**：将字符串转换为不易读的格式，例如使用 ASCII 码表示。
- **控制流平坦化**：改变代码的控制流程，使逻辑难以跟踪。
- **插入死代码**：在代码中插入不会执行的代码段，增加分析和理解的难度。

### 执行过程

1. **解析**：首先，JavaScript Obfuscator读取原始的JavaScript代码，然后使用解析器将代码转换成抽象语法树（AST）。AST是一种树状结构，用于表示程序的语法结构，每个节点代表代码中的一个构造（如变量声明、函数调用等）。
   
2. **变量重命名**：在AST的基础上，工具会对变量和函数名进行重命名。它会用短序列或无意义的名称来替换原有的名称，从而使得代码难以阅读和理解。
   
3. **字符串加密**：JavaScript Obfuscator会识别代码中的字符串，并将它们加密或转换成一种不易直接理解的形式。在运行时，这些字符串会被解密或转换回原始内容，但在源代码中它们看起来是混乱的。
   
4. **控制流扁平化**：该工具会改变代码的执行流程，例如，将直线执行的代码转换成使用条件语句和跳转的形式，这使得静态分析变得更加困难。
   
5. **死代码注入**：为了进一步迷惑分析者，JavaScript Obfuscator可以在代码中注入无用的、不会被执行的代码段。这些代码看起来可能和正常代码无异，但实际上是为了增加分析的难度。
   
6. **代码转换**：除了上述操作外，JavaScript Obfuscator还会应用多种代码转换技术，如将数组访问转换为复杂的函数调用，或者使用其他方式改变代码的结构，而不改变其功能。
   
7. **生成**：最后，工具会根据处理后的AST生成新的JavaScript代码。这段代码在功能上与原始代码相同，但在形式上大为不同，难以被人直接理解。

通过这些步骤，JavaScript Obfuscator 能够有效地保护 JavaScript 代码，防止未经授权的复制、修改和逆向工程。需要注意的是，虽然代码混淆可以大大增加代码被理解和修改的难度，但它并不能完全防止这些行为。混淆是代码保护策略中的一环，应与其他安全措施（如代码签名、许可证检查等）结合使用，以提高整体的安全性。

## 快速开始

### 在 `Node. js` 中使用

首先，你需要通过 npm 安装 JavaScript Obfuscator：

```bash
npm install --save-dev javascript-obfuscator
```

然后，你可以在你的 `Node.js` 项目中如下使用它：

```javascript
var JavaScriptObfuscator = require('javascript-obfuscator');
var obfuscationResult = JavaScriptObfuscator.obfuscate(
    `(function(){
        var variable1 = '5' - 3;
        var variable2 = '5' + 3;
        // 更多代码...
    })();`,
    {
        compact: false,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        // 更多配置选项...
    }
);
console.log(obfuscationResult.getObfuscatedCode());
```

### 在浏览器中使用

你也可以直接在浏览器中使用 JavaScript Obfuscator，通过 CDN 引入：

```html
<script src="https://cdn.jsdelivr.net/npm/javascript-obfuscator/dist/index.browser.js"></script>
```

然后，你可以在浏览器端脚本中使用它来混淆代码：

```javascript
var obfuscationResult = JavaScriptObfuscator.obfuscate(
    // 你的JavaScript代码...
);
console.log(obfuscationResult.getObfuscatedCode());
```

## 常用配置项

JavaScript Obfuscator 提供了丰富的配置选项，让开发者可以根据自己的需求进行定制化的代码混淆。下面是一些常见的配置项：

- **compact**：类型为 `boolean`，默认值为 `true`。当设置为 `true` 时，生成的代码会被压缩成一行，有助于减少代码体积。
- **controlFlowFlattening**：类型为 `boolean`，默认值为 `false`。启用控制流平坦化可以使代码逻辑更加复杂，但可能会影响运行性能。
- **controlFlowFlatteningThreshold**：类型为 `number`，默认值为 `0.75`。这个阈值决定了哪些部分的代码会被控制流平坦化处理，范围从 `0` 到 `1`。
- **deadCodeInjection**：类型为 `boolean`，默认值为 `false`。启用后，会在代码中插入不会被执行的死代码，增加反向工程的难度。
- **deadCodeInjectionThreshold**：类型为 `number`，默认值为 `0.4`。这个阈值决定了有多少比例的代码会被插入死代码。
- **debugProtection**：类型为 `boolean`，默认值为 `false`。启用后，会使得浏览器的开发者工具变得不稳定，防止代码被调试。
- **stringArray**：类型为 `boolean`，默认值为 `true`。启用后，会将字符串放入一个特殊的数组中，通过索引访问，以增加代码的混淆程度。
- **stringArrayEncoding**：类型为 `string` 或 `boolean`，可以是 `none`、`base64` 或 `rc4`，用于设置字符串数组的编码方式。

### 预设配置模板

**默认预设，高性能**

```js
{
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    selfDefending: false,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayCallsTransform: false,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: [],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
}
```

**高混淆，低性能**

性能将比没有混淆时慢得多，并且代码体积也比较大

```js
{
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['rc4'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 5,
    stringArrayWrappersChainedCalls: true,    
    stringArrayWrappersParametersMaxCount: 5,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}
```

**中等混淆，最佳性能**

性能将比没有混淆时慢

```js
{
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 0.75,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}
```

**低混淆，高性能**

性能将处于相对正常的水平

```js
{
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayCallsTransform: false,
    stringArrayEncoding: [],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
}
```

## 在打包工具中使用 JavaScript Obfuscator

### Webpack

如果你使用的是 Webpack，可以通过 `webpack-obfuscator` 插件来集成 JavaScript Obfuscator。首先，安装这个插件：

```bash
npm install --save-dev webpack-obfuscator
```

**插件使用：**

在的 `webpack.config.js` 文件中配置这个插件：

```javascript
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    // 其他配置...
    plugins: [
        new JavaScriptObfuscator({
            rotateUnicodeArray: true
            // 其他混淆选项...
        }, ['excluded_bundle_name.js'])
    ]
};
```

**加载器使用：**

在 webpack 配置中定义一个规则，并使用混淆器-loader 作为模块的最后一个加载器。你可以添加 **enforce： 'post'** 标志，以确保在正常加载器之后调用加载器：

```js
var WebpackObfuscator = require('webpack-obfuscator');

// webpack loader rules array
rules: [
    {
        test: /\.js$/,
        exclude: [ 
            path.resolve(__dirname, 'excluded_file_name.js') 
        ],
        enforce: 'post',
        use: { 
            loader: WebpackObfuscator.loader, 
            options: {
                rotateStringArray: true
            }
        }
    }
]
```

### Rollup

对于使用 Rollup 的项目，可以通过 `rollup-plugin-javascript-obfuscator` 插件来集成。首先，安装这个插件：

```bash
npm install --save-dev rollup-plugin-javascript-obfuscator
```

然后，在 `rollup.config.js` 中配置这个插件：

```javascript
import javascriptObfuscator from 'rollup-plugin-javascript-obfuscator';

export default {
    // 其他配置...
    plugins: [
        javascriptObfuscator({
            compact: true,
            controlFlowFlattening: true
            // 其他混淆选项...
        })
    ]
};
```

### Gulp

如果你的项目使用 Gulp，可以通过 `gulp-javascript-obfuscator` 插件来集成。首先，安装这个插件：

```bash
npm install --save-dev gulp-javascript-obfuscator
```

然后，配置你的 `gulpfile.js` 使用这个插件：

```javascript
const gulp = require('gulp');
const javascriptObfuscator = require('gulp-javascript-obfuscator');

gulp.task('obfuscate', function () {
    return gulp.src('src/*.js')
        .pipe(javascriptObfuscator({
            compact: true,
            controlFlowFlattening: true
            // 其他混淆选项...
        }))
        .pipe(gulp.dest('dist'));
});
```

## Why use ？

普通的代码压缩工具（如 UglifyJS、Terser 等）主要目的是减少代码体积，提高加载速度，它们通过移除空白字符、注释、重命名变量（通常是缩短变量名）等方式来实现。虽然这些操作可以使代码难以阅读，但主要是从性能优化的角度出发，并不专注于增加代码的安全性或防止代码被逆向工程分析。

而JavaScript Obfuscator 提供的功能远超普通的代码压缩工具，它专门设计来保护 JavaScript 代码，防止被盗用或逆向工程。以下是它与普通代码压缩工具的主要区别：

1. **变量重命名**：JavaScript Obfuscator 不仅重命名变量，还可以使用更复杂的名称或生成无意义的名称，使得代码逻辑难以理解。

2. **字符串提取和加密**：将代码中的字符串提取出来，并进行加密，只有在运行时才解密，增加了逆向工程的难度。

3. **死代码注入**：在代码中注入不会执行的代码段，这些代码段看起来像是正常的代码，但实际上是为了迷惑逆向工程师。

4. **控制流平坦化**：改变代码的执行流程，使得代码的逻辑结构变得复杂，难以通过静态分析来理解程序的行为。

5. **多种代码转换**：应用多种代码转换技术，如将数组访问转换为复杂的函数调用，进一步增加代码的复杂性。

这些特性使得 JavaScript Obfuscator 不仅能压缩代码，还能大幅度提高代码的保护级别，使得即使是有经验的开发者或黑客也难以理解和修改被混淆的代码。因此，当需要保护 JavaScript 代码不被轻易理解和修改时，仅仅使用普通的代码压缩工具是不够的，需要使用专门的代码混淆工具如 JavaScript Obfuscator。

## 参考

- [JavaScript Obfuscator Tool](https://obfuscator.io/)
- [javascript-obfuscator/javascript-obfuscator: A powerful obfuscator for JavaScript and Node.js](https://github.com/javascript-obfuscator/javascript-obfuscator)
- [javascript-obfuscator/webpack-obfuscator: javascript-obfuscator plugin for Webpack](https://github.com/javascript-obfuscator/webpack-obfuscator)

