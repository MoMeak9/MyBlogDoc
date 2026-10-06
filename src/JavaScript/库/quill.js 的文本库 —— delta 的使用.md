Deltas 是一种简单但富有表现力的格式，可用于描述 Quill 的内容和变化。该格式是 JSON 的严格子集，是可读的，并且很容易被机器解析。Deltas 可以描述任何 Quill 文档，包括所有文本和格式信息，与HTML相比，Deltas 的优势在于其简洁性和易读性。HTML作为一种标记语言，包含了大量的标签和属性，使得文档结构复杂而难以理解。而达尔塔则采用了JSON格式，使得文档的结构清晰明了，易于阅读和理解。

Delta由操作[数组](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)组成，用于描述对文档的更改。它们可以[`insert`](https://github.com/quilljs/delta#insert-operation)、[`delete`](https://github.com/quilljs/delta#delete-operation)或[`retain`](https://github.com/quilljs/delta#retain-operation)。注意，操作不采用索引。它们总是描述当前索引的变化。使用 retains 可以“保留”或“跳过”文档的某些部分。

不要被它的名称 Delta 混淆 - Deltas 既表示文档，也表示对文档的更改。如果将 Deltas 视为从一个文档到另一个文档的指令，则 Deltas 表示文档的方式是从空文档开始表示指令。

Deltas 作为单独的[独立库](https://github.com/quilljs/delta/)实现，允许在 Quill 之外使用。它适用于[操作转换（Operational Transform）](https://en.wikipedia.org/wiki/Operational_transformation)，可以在realtime、Google Docs 等应用程序中使用。有关增量背后的更深入说明，请参阅[Designing the Delta Format](https://quilljs.com/guides/designing-the-delta-format/)。

> **注意：**不建议手动构造 Deltas，而是使用可链接的 [`insert()`](https://github.com/quilljs/delta#insert)、[`delete()`](https://github.com/quilljs/delta#delete)） 和 [`retain()`](https://github.com/quilljs/delta#retain) 方法来创建新的 Deltas。您可以使用 [`import()`](https://quilljs.com/docs/api/#import) 从 Quill 访问 Delta。

## 快速示例

```js
// Document with text "Gandalf the Grey"
// with "Gandalf" bolded, and "Grey" in grey
const delta = new Delta([
  { insert: 'Gandalf', attributes: { bold: true } },
  { insert: ' the ' },
  { insert: 'Grey', attributes: { color: '#ccc' } }
]);

// Change intended to be applied to above:
// Keep the first 12 characters, insert a white 'White'
// and delete the next four characters ('Grey')
const death = new Delta().retain(12)
                         .insert('White', { color: '#fff' })
                         .delete(4);
// {
//   ops: [
//     { retain: 12 },
//     { insert: 'White', attributes: { color: '#fff' } },
//     { delete: 4 }
//   ]
// }

// Applying the above:
const restored = delta.compose(death);
// {
//   ops: [
//     { insert: 'Gandalf', attributes: { bold: true } },
//     { insert: ' the ' },
//     { insert: 'White', attributes: { color: '#fff' } }
//   ]
// }
```

本自述文件描述了 Deltas 的一般形式和 API 功能。有关 Quill 具体使用 Delta 的方式的其他信息，请参阅其自己的 [Delta 文档](http://quilljs.com/docs/delta/)。Delta 背后的动机和设计思维的演练是关于[Delta 格式设计 ](http://quilljs.com/guides/designing-the-delta-format/)的。

此格式适用于[操作转换](https://en.wikipedia.org/wiki/Operational_transformation)，并定义了多个函数来支持此用例。

## Operations

- [`insert`](https://github.com/quilljs/delta#insert-operation)
- [`delete`](https://github.com/quilljs/delta#delete-operation)
- [`retain`](https://github.com/quilljs/delta#retain-operation)

### 插入操作

插入操作定义了`insert`键。String 值表示插入文本。任何其他类型都表示插入嵌入（但是，为了相等，将只执行一个级别的对象比较）。

在文本和嵌入这两种情况下，都可以使用 Object 定义可选`attributes`键来描述附加格式信息。可以通过`retain`操作更改格式。

```js
// Insert a bolded "Text"
{ insert: "Text", attributes: { bold: true } }

// Insert a link
{ insert: "Google", attributes: { link: 'https://www.google.com' } }

// Insert an embed
{
  insert: { image: 'https://octodex.github.com/images/labtocat.png' },
  attributes: { alt: "Lab Octocat" }
}

// Insert another embed
{
  insert: { video: 'https://www.youtube.com/watch?v=dMH0bHeiRNg' },
  attributes: {
    width: 420,
    height: 315
  }
}
```

### 删除操作

删除操作定义了一个数字删除键，表示要`delete`的字符数。所有嵌入的长度均为 1。

```js
// Delete the next 10 characters
{ delete: 10 }
```

### 保留操作

retain 操作定义了一个 Number `retain` 键，表示要保留的字符数（其他库可能使用名称 keep 或 skip）。可以使用 Object 定义可选`attributes`键，以描述对字符范围的格式更改。`attributes` Object 中的 `null` 值表示删除该键。

*注意：没有必要保留文档的最后字符，因为这是隐含的。*

```js
// Keep the next 5 characters
{ retain: 5 }

// Keep and bold the next 5 characters
{ retain: 5, attributes: { bold: true } }

// Keep and unbold the next 5 characters
// More specifically, remove the bold key in the attributes Object
// in the next 5 characters
{ retain: 5, attributes: { bold: null } }
```

## 构造器

- [`constructor`](https://github.com/quilljs/delta#constructor)
- [`insert`](https://github.com/quilljs/delta#insert)
- [`delete`](https://github.com/quilljs/delta#delete)
- [`retain`](https://github.com/quilljs/delta#retain)

### 构造函数

创建新的 Delta 对象。

*注意：使用 ops 或 delta 构造时，不执行有效性/健全性检查。新增量的内部操作数组也将从 ops 或 delta.ops 分配，而无需进行深拷贝。*

#### Example

```js
const delta = new Delta([
  { insert: 'Hello World' },
  { insert: '!', attributes: { bold: true }}
]);

const packet = JSON.stringify(delta);

const other = new Delta(JSON.parse(packet));

const chained = new Delta().insert('Hello World').insert('!', { bold: true });
```

------

### insert() 插入

追加插入操作。返回`this`值以获得可链接性。

#### Example例

```js
delta.insert('Text', { bold: true, color: '#ccc' });
delta.insert({ image: 'https://octodex.github.com/images/labtocat.png' });
```

****

### delete() 删除

追加删除操作。返回 `this` 以实现可链接性。

#### Example例子

```
delta.delete(5);
```

------

### retain() 保留

追加 retain 操作。返回`this`值以获得可链接性。

#### Example例子

```
delta.retain(4).retain(5, { color: '#0c6' });
```

## 文档操作

### concat()连接

返回一个新的 Delta，表示此文档与另一个文档 Delta 操作的串联。

```js
const a = new Delta().insert('Hello');
const b = new Delta().insert('!', { bold: true });


// {
//   ops: [
//     { insert: 'Hello' },
//     { insert: '!', attributes: { bold: true } }
//   ]
// }
const concat = a.concat(b);
```

### diff() 比较差异

返回表示两个文档之间差异的 Delta。 （可选）接受发生更改的建议索引，通常表示更改之前的光标位置。

```js
const a = new Delta().insert('Hello');
const b = new Delta().insert('Hello!');

const diff = a.diff(b);  // { ops: [{ retain: 5 }, { insert: '!' }] }
                         // a.compose(diff) == b
```

### eachLine() 迭代每行

迭代文档 Delta，使用 Delta 和表示线段的属性对象调用给定函数。

```js
const delta = new Delta().insert('Hello\n\n')
                         .insert('World')
                         .insert({ image: 'octocat.png' })
                         .insert('\n', { align: 'right' })
                         .insert('!');

delta.eachLine((line, attributes, i) => {
  console.log(line, attributes, i);
  // Can return false to exit loop early
});
// Should log:
// { ops: [{ insert: 'Hello' }] }, {}, 0
// { ops: [] }, {}, 1
// { ops: [{ insert: 'World' }, { insert: { image: 'octocat.png' } }] }, { align: 'right' }, 2
// { ops: [{ insert: '!' }] }, {}, 3
```

### invert() 反转

返回一个反向增量，其与基本文档增量具有相反的效果。即 `base.compose(delta).compose(inverted) === base`。

```js
const base = new Delta().insert('Hello\n')
                        .insert('World');
const delta = new Delta().retain(6, { bold: true }).insert('!').delete(5);

const inverted = delta.invert(base);  // { ops: [
                                      //   { retain: 6, attributes: { bold: null } },
                                      //   { insert: 'World' },
                                      //   { delete: 1 }
                                      // ]}
                                      // base.compose(delta).compose(inverted) === base
```

## 工具方法

delta本身格式就是以类数组的形式，那么他也就理所当然会支持数据

### filter()

返回传递给定函数的操作数组

```js
const delta = new Delta().insert('Hello', { bold: true })
                         .insert({ image: 'https://octodex.github.com/images/labtocat.png' })
                         .insert('World!');

const text = delta
  .filter((op) => typeof op.insert === 'string')
  .map((op) => op.insert)
  .join('');
```

### forEach()

迭代操作，为每个操作调用提供的函数

```js
delta.forEach((op) => {
  console.log(op);
});
```

### length()

返回 Delta 的长度，它是其操作的长度之和。

```js
new Delta().insert('Hello').length();  // Returns 5

new Delta().insert('A').retain(2).delete(1).length(); // Returns 4
```

### map()

返回一个新数组，其中包含对每个操作调用提供的函数的结果。

```js
const delta = new Delta().insert('Hello', { bold: true })
                         .insert({ image: 'https://octodex.github.com/images/labtocat.png' })
                         .insert('World!');

const text = delta
  .map((op) => {
    if (typeof op.insert === 'string') {
      return op.insert;
    } else {
      return '';
    }
  })
  .join('');
```

### partition() 组合

创建一个由两个数组组成的新数组，返回的数据组中的第一个数组包含通过给定函数操作的，另一个则是失败的数组。

```js
const delta = new Delta().insert('Hello', { bold: true })
                         .insert({ image: 'https://octodex.github.com/images/labtocat.png' })
                         .insert('World!');

const results = delta.partition((op) => typeof op.insert === 'string');
const passed = results[0];  // [{ insert: 'Hello', attributes: { bold: true }},
                            //  { insert: 'World'}]
const failed = results[1];  // [{ insert: { image: 'https://octodex.github.com/images/labtocat.png' }}]
```

### reduce()

将给定函数应用于累加器和每个操作以减少到单个值。

```js
const delta = new Delta().insert('Hello', { bold: true })
                         .insert({ image: 'https://octodex.github.com/images/labtocat.png' })
                         .insert('World!');

const length = delta.reduce((length, op) => (
  length + (op.insert.length || 1);
), 0);
```

### slice()

```js
const delta = new Delta().insert('Hello', { bold: true }).insert(' World');

// {
//   ops: [
//     { insert: 'Hello', attributes: { bold: true } },
//     { insert: ' World' }
//   ]
// }
const copy = delta.slice();

// { ops: [{ insert: 'World' }] }
const world = delta.slice(6);

// { ops: [{ insert: ' ' }] }
const space = delta.slice(5, 6);
```

## 操作（operations）转换

### compose() 撰写

返回一个 Delta，相当于应用自己的 Delta 的operations，然后再应用另一个 Delta。

```js
const a = new Delta().insert('abc');
const b = new Delta().retain(1).delete(1);

const composed = a.compose(b);  // composed == new Delta().insert('ac');
```

### transform() 转换

将给定的Delta转换为自己的operations

```js
const a = new Delta().insert('a');
const b = new Delta().insert('b').retain(5).insert('c');

a.transform(b, true);  // new Delta().retain(1).insert('b').retain(5).insert('c');
a.transform(b, false); // new Delta().insert('b').retain(6).insert('c');
```

### transformPosition() 变换位置

根据 Delta 变换索引。对于表示光标/选择位置很有用。

```js
const delta = new Delta().retain(5).insert('a');
delta.transformPosition(4); // 4
delta.transformPosition(5); // 6
```

## 参考 

- [quilljs/delta](https://github.com/quilljs/delta)
- [Designing the Delta Format - Quill](https://quilljs.com/guides/designing-the-delta-format/)
- [Delta - Quill Rich Text Editor](https://quilljs.com/docs/delta/)
