---
theme: devui-blue
highlight: a11y-dark
---

解析XML文件是开发中常见的需求之一。为了以一种简单易用的方式访问XML数据，你可能不想编译一个C解析器，而是想寻找一个更方便的解决方案。那么，xml2js就是你需要的工具！xml2js是一个简单的XML到JavaScript对象转换器，支持双向转换。它使用了sax-js和xmlbuilder-js这两个工具库。

## 安装

最简单的安装xml2js的方式是使用npm。只需执行`npm install xml2js`，npm将会下载xml2js及其所有依赖。xml2js也可以通过Bower进行安装，只需执行`bower install xml2js`，Bower将会下载xml2js及其所有依赖。

## 用法

由于你是一位非常聪明的开发者，所以不需要过多的教程指导。解析XML应该是一件简单的事情，我们直接通过一些示例进行学习。

### 简短用法

你希望尽可能简单、轻松地解析XML吗？使用以下代码：

```javascript
var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"
parseString(xml, function (err, result) {
    console.dir(result);
});
```

这真是再简单不过了，对吧？这个方法适用于xml2js的0.2.3版本及以上。使用CoffeeScript时，代码如下：

> CoffeeScript 可能比较小众，但是官方文档有举例了相关内容，故本文进行保留。

```coffeescript
{parseString} = require 'xml2js'
xml = "<root>Hello xml2js!</root>"
parseString xml, (err, result) ->
    console.dir result
```

如果你需要一些特殊的选项，也不用担心，xml2js支持许多选项（见下文），你可以将这些选项作为第二个参数进行指定：

```javascript
parseString(xml, {trim: true}, function (err, result) {
});
```

### 实例方法

如果你之前一直使用xml-simple或者自己封装的方法来处理XML，那么从0.1.11版本开始，xml2js为你添加了以下方法：

```javascript
var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/foo.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result);
        console.log('Done');
    });
});
```

看吧，没有事件监听器！

你还可以使用[CoffeeScript](https://github.com/jashkenas/coffeescript)来进一步减少代码的冗余：

```coffeescript
fs = require 'fs',
xml2js = require 'xml2js'

parser = new xml2js.Parser()
fs.readFile __dirname + '/foo.xml', (err, data) ->
  parser.parseString data, (err, result) ->
    console.dir result
    console.log 'Done.'
```

但是，如果你忘记使用`new`关键字创建一个新的`Parser`对象会怎么样？从0.2.8开始，你也可以不使用这个关键字。从0.2.8开始，你可以不使用它，在这种情况下，xml2js会帮助你添加它，以保证不会再出现意外和莫名其妙的bug!

### Promise 用法

```js
var xml2js = require('xml2js');
var xml = '<foo></foo>';

// 1. With parser
var parser = new xml2js.Parser(/* options */);
parser.parseStringPromise(xml).then(function (result) {
  console.dir(result);
  console.log('Done');
})
.catch(function (err) {
  // Failed
});

// 2. Without parser
xml2js.parseStringPromise(xml /*, options */).then(function (result) {
  console.dir(result);
  console.log('Done');
})
.catch(function (err) {
  // Failed
});
```

1.  使用解析器进行解析：通过创建xml2js解析器的实例，调用解析器的`parseStringPromise`方法对XML数据进行解析，并通过`.then()`方法处理解析成功的结果，通过`.catch()`方法处理解析过程中的错误。

2.  不使用解析器直接解析：直接调用xml2js库的`parseStringPromise`方法对XML数据进行解析，通过`.then()`方法处理解析成功的结果，通过`.catch()`方法处理解析过程中的错误。这种方法省去了创建解析器实例的步骤，直接调用库函数进行解析。

## 使用 XML 构建器

自 0.4.0 版本起，xml2js 还支持使用对象来构建 XML。下面是一个示例：

```javascript
const xml2js = require('xml2js');

const obj = {name: "Super", Surname: "Man", age: 23};

const builder = new xml2js.Builder();
const xml = builder.buildObject(obj);
```

上述代码将生成如下的 XML：

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root>
  <name>Super</name>
  <Surname>Man</Surname>
  <age>23</age>
</root>
```

通过设置 `cdata` 选项为 `true`，可以支持写入 CDATA。

### 指定属性

使用 xml2js，你可以指定 XML 元素的属性。下面是一个示例：

```javascript
const xml2js = require('xml2js');

const obj = {root: {$: {id: "my id"}, _: "my inner text"}};

const builder = new xml2js.Builder();
const xml = builder.buildObject(obj);
```

上述代码将生成如下的 XML：

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root id="my id">my inner text</root>
```

### 添加 xmlns 属性

xml2js 还支持在生成的 XML 中添加 XML 命名空间前缀和 URI 对，通过使用 `xmlns` 属性。

在根元素上声明默认命名空间的示例：

```javascript
const obj = { 
  Foo: {
    $: {
      "xmlns": "http://foo.com"
    }   
  }
};
```

通过调用 `buildObject(obj)` 方法，将生成以下 XML：

```xml
<Foo xmlns="http://foo.com"/>
```

在非根元素上声明非默认命名空间的示例：

```javascript
const obj = {
  'foo:Foo': {
    $: {
      'xmlns:foo': 'http://foo.com'
    },
    'bar:Bar': {
      $: {
        'xmlns:bar': 'http://bar.com'
      }
    }
  }
};
```

通过调用 `buildObject(obj)` 方法，将生成以下 XML：

```xml
<foo:Foo xmlns:foo="http://foo.com">
  <bar:Bar xmlns:bar="http://bar.com"/>
</foo:Foo>
```

### 处理属性、标签名和值

自 0.4.1 版本起，你可以选择提供解析器的属性名和标签名处理器，以及元素值处理器（自 0.4.14 版本起，还可以提供属性值处理器）。

下面是一个示例，演示如何将属性名和标签名转换为大写：

```javascript
function nameToUpperCase(name) {
  return name.toUpperCase();
}

// 将所有属性和标签名及其值转换为大写
parseString(xml, {
  tagNameProcessors: [nameToUpperCase],
  attrNameProcessors: [nameToUpperCase],
  valueProcessors: [nameToUpperCase],
  attrValueProcessors: [nameToUpperCase]
}, function (err, result) {
  // 处理后的数据
});
```

`tagNameProcessors` 和 `attrNameProcessors` 选项接受一个函数数组，函数的签名如下：

```javascript
function (name) {
  // 对 `name` 做一些处理
  return name;
}
```

`attrValueProcessors` 和 `valueProcessors` 选项接受一个函数数组，函数的签名如下：

```javascript
function (value, name) {
  // `name` 将是节点名或属性名
  // 对 `value` 做一些处理，可以根据节点或属性名自定义处理方式
  return value;
}
```

xml2js 提供了一些内置的处理器，可以在 `lib/processors.js` 文件中找到：

*   `normalize`：将名称转换为小写（当 `options.normalize` 设置为 `true` 时自动使用）
*   `firstCharLowerCase`：将首字母转换为小写。例如，'MyTagName' 变为 'myTagName'
*   `stripPrefix`：去除 XML 命名空间前缀。例如，`<foo:Bar/>` 将变为 'Bar'（注意：xmlns 前缀不会被去除）
*   `parseNumbers`：将类似整数的字符串解析为整数，将类似浮点数的字符串解析为浮点数。例如，"0" 变为 0，"15.56" 变为 15.56
*   `parseBooleans`：将类似布尔值的字符串解析为布尔值。例如，"true" 变为 true，"false" 变为 false

xml2js 提供了强大的功能，使得在 Node.js 应用程序中解析和构建 XML 变得简单而灵活。无论你是需要解析复杂的 XML 文档，还是需要构建自定义的 XML 输出，xml2js 都是一个值得尝试的工具。

参考文档：[Leonidas-from-XIV/node-xml2js: XML to JavaScript object converter.](https://github.com/Leonidas-from-XIV/node-xml2js)
