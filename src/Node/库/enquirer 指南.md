## 安装

[npm](https://www.npmjs.com/) 安装:

```shell
$ npm install enquirer --save
```

[yarn](https://yarnpkg.com/en/) 安装:

```shell
$ yarn add enquirer
```

## 使用

### 问答题

使用 enquirer 的最简单方法是将[问题对象](https://www.npmjs.com/package/enquirer#prompt-options)传递给该`prompt`方法。

```js
const { prompt } = require('enquirer');
 
const response = await prompt({
  type: 'input',
  name: 'username',
  message: 'What is your username?'
});
 
console.log(response); // { username: 'jonschlinkert' }
```

await（需要在 async 函数内部运行）

遇到多个问题，可以将多个问题对象以数组形式传给`prpmpt`方法，返回完整的答案对象。

```js
const response = await prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?'
  },
  {
    type: 'input',
    name: 'username',
    message: 'What is your username?'
  }
]);
 
console.log(response); // { name: 'Edward Chan', username: 'edwardmchan' }
```

#### 问题对象类型

```js
{
  type: String, // 表示提问的类型，下文会单独解释
  name: String, // 在最后获取到的answers回答对象中，作为当前这个问题的键
  message: String|Function, // 打印出来的问题标题，如果为函数的话
  default: String|Number|Array|Function, // 用户不输入回答时，问题的默认值。或者使用函数来return一个默认值。假如为函数时，函数第一个参数为当前问题的输入答案。
  choices: Array|Function, // 给出一个选择的列表，假如是一个函数的话，第一个参数为当前问题的输入答案。为数组时，数组的每个元素可以为基本类型中的值。
  validate: Function, // 接受用户输入，并且当值合法时，函数返回true。当函数返回false时，一个默认的错误信息会被提供给用户。
  filter: Function, // 接受用户输入并且将值转化后返回填充入最后的answers对象内。
  when: Function|Boolean, // 接受当前用户输入的answers对象，并且通过返回true或者false来决定是否当前的问题应该去问。也可以是简单类型的值。
  pageSize: Number, // 改变渲染list,rawlist,expand或者checkbox时的行数的长度。
}
```

### 运行查询器的不同方法

#### 1.通过导入特定的`built-in prompt`

```js
const { Confirm } = require('enquirer');
 
const prompt = new Confirm({
  name: 'question',
  message: 'Did you like enquirer?'
});
 
prompt.run().then(answer => console.log('Answer:', answer));
```

#### 2.通过将选项传递给`prompt`

```js
const { prompt } = require('enquirer');
 
prompt({
  type: 'confirm',
  name: 'question',
  message: 'Did you like enquirer?'
})
  .then(answer => console.log('Answer:', answer));
```

### 更多案例

-   [自动完成提示](https://www.npmjs.com/package/enquirer#autocomplete-prompt)
-   [BasicAuth 提示](https://www.npmjs.com/package/enquirer#basicauth-prompt)
-   [确认提示](https://www.npmjs.com/package/enquirer#confirm-prompt)
-   [表单提示](https://www.npmjs.com/package/enquirer#form-prompt)
-   [输入提示](https://www.npmjs.com/package/enquirer#input-prompt)
-   [隐形提示](https://www.npmjs.com/package/enquirer#invisible-prompt)
-   [列表提示](https://www.npmjs.com/package/enquirer#list-prompt)
-   [多选提示](https://www.npmjs.com/package/enquirer#multiselect-prompt)
-   [数字提示](https://www.npmjs.com/package/enquirer#numeral-prompt)
-   [密码提示](https://www.npmjs.com/package/enquirer#password-prompt)
-   [测验提示](https://www.npmjs.com/package/enquirer#quiz-prompt)
-   [调查提示](https://www.npmjs.com/package/enquirer#survey-prompt)
-   [比例提示](https://www.npmjs.com/package/enquirer#scale-prompt)
-   [选择提示](https://www.npmjs.com/package/enquirer#select-prompt)
-   [排序提示](https://www.npmjs.com/package/enquirer#sort-prompt)
-   [片段提示](https://www.npmjs.com/package/enquirer#snippet-prompt)
-   [切换提示](https://www.npmjs.com/package/enquirer#toggle-prompt)

#### 按类型分类示例

-   [数组提示](https://www.npmjs.com/package/enquirer#arrayprompt)
    -   [选项](https://www.npmjs.com/package/enquirer#options)
    -   [特性](https://www.npmjs.com/package/enquirer#properties)
    -   [方法](https://www.npmjs.com/package/enquirer#methods)
    -   [选择](https://www.npmjs.com/package/enquirer#choices)
    -   [定义选择](https://www.npmjs.com/package/enquirer#defining-choices)
    -   [选择属性](https://www.npmjs.com/package/enquirer#choice-properties)
    -   [相关提示](https://www.npmjs.com/package/enquirer#related-prompts)
-   [授权提示](https://www.npmjs.com/package/enquirer#authprompt)
-   [布尔提示](https://www.npmjs.com/package/enquirer#booleanprompt)
-   [号码提示](https://www.npmjs.com/package/enquirer#numberprompt)
-   [字符串提示符](https://www.npmjs.com/package/enquirer#stringprompt)

### 支持自动补全

提示在用户键入时自动完成，并将所选值作为字符串返回。

```js
const { AutoComplete } = require('enquirer');
 
const prompt = new AutoComplete({
  name: 'flavor',
  message: 'Pick your favorite flavor',
  limit: 10,
  initial: 2,
  choices: [
    'Almond',
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Cherry',
    'Chocolate',
    'Cinnamon',
    'Coconut',
    'Cranberry',
    'Grape',
    'Nougat',
    'Orange',
    'Pear',
    'Pineapple',
    'Raspberry',
    'Strawberry',
    'Vanilla',
    'Watermelon',
    'Wintergreen'
  ]
});
 
prompt.run()
  .then(answer => console.log('Answer:', answer))
  .catch(console.error);
```

## 参考文档

- [enquirer - npm](https://www.npmjs.com/package/enquirer)
- [NodeJs 交互式命令行工具 Inquirer.js - 开箱指南 - 掘金](https://juejin.cn/post/6844903480700698638)
- [inquirer.js —— 一个用户与命令行交互的工具_xhsdnn的博客-CSDN博客_inquirer.js](https://blog.csdn.net/qq_26733915/article/details/80461257)