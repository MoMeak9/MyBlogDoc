> 链接：https://medium.com/@technicadil_001/how-to-write-better-typescript-codes-dbfe43d85103
>
> 作者：Debabrata Dash
>
> 原标题：How to write better Typescript codes?

在本文中，我们将讨论大约 15 个编写更好的 Typescript 代码的技巧。

![img](https://miro.medium.com/v2/resize:fit:1050/0*SRR86DEw4kT7lXnQ)

> 译者：本文讨论了 15 个实用技巧，以帮助开发者编写更好的 TypeScript 代码。这些技巧包括可选链接、映射类型、实用类型等，旨在提高代码的安全性、可读性和功能性。通过这些技巧，开发者可以更有效地管理数据类型，从而构建更稳健的应用程序。

## 1 可选链 （？.）：

通过可选的链接，您可以安全地访问嵌套的属性或方法，而无需担心 null 值或未定义的值。如果任何中间属性为 null 或未定义，它就会短路评估。

```ts
const user = {
  name: 'Piotr',
  address: {
    city: 'Warsaw',
    postalCode: '00-240'
  }
};


const postalCode = user.address?.postalCode;
console.log(postalCode); // 00-240

const invalidCode = user.address?.postalCode?.toLowerCase();
console.log(invalidCode); // Output: undefined
```

## 2 使用映射类型进行转换

映射类型允许您通过转换现有类型的属性来创建新类型。

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## 3 善用实用程序类型

***TypeScript*** 提供了多种实用程序类型来帮助进行常见的类型转换。

i）`Partial<T>`：使所有属性成为可选属性。
ii) `Required<T>`: 使所有属性成为必需属性。
iii) `Readonly<T>`: 将所有属性设置为只读。
iv) `Record<K, T>`: 使用类型为 T 的键 K 创建一个类型。

```ts
type Person = {
  name: string;
  age: number;
};
type PartialPerson = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

## 4 类型防护

使用 ***Type Guards*** 缩小条件块中的类型范围

```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

## 5 模板文字类型

Tese 允许您通过组合字符串文字来创建新的字符串类型。

```ts
type EventName = 'click' | 'hover';
type EventHandlerName = `${EventName}Handler`; // 'clickHandler' | 'hoverHandler'
```

## 6 使用索引访问类型

使用索引访问类型来提取属性的类型。

```ts
type Person = { name: string; age: number };
type NameType = Person['name']; // string
```

## 7 将映射类型中的键重新映射

创建新类型时，转换键。

```ts
type PrefixKeys<T, P extends string> = {
  [K in keyof T as `${P}${K & string}`]: T[K]
};
type PrefixedPerson = PrefixKeys<{ name: string; age: number }, 'prefix_'>;
// { prefix_name: string; prefix_age: number }
```

## 8 Discriminated 联合类型

这些可以帮助您创建不同类型的类型安全联合。

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number };

function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2;
    case 'square': return shape.side ** 2;
  }
}
```

## 9 泛型中的类型推断

利用 ***‘infer’*** 提取并使用条件类型中的类型。

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type Fn = () => number;
type Result = ReturnType<Fn>; // number
```

## 10 模块增强

使用新功能扩展现有模块。

```ts
// augmentations.ts
import 'express';
declare module 'express' {
  interface Request {
    user?: { id: string; role: string };
  }
}
```

## 11 声明合并的interface

合并 interface 以扩展类型，对于第三方库尤其有用。

```ts
interface Window {
  myCustomProperty: string;
}
window.myCustomProperty = 'Hello!';
```

## 12 函数重载

提供多个函数签名以更好地进行类型检查。

```ts
function createDate(timestamp: number): Date;
function createDate(year: number, month: number, day: number): Date;
function createDate(x: number, y?: number, z?: number): Date {
  return y !== undefined && z !== undefined ? new Date(x, y, z) : new Date(x);
}
```

## 13 Branded 类型

使用 Branded 类型来创建名义类型。

```ts
type UserId = string & { _brand: 'UserId' };
function createUserId(id: string): UserId {
  return id as UserId;
}
```

## 14 具有条件类型的模板文字类型

将模板文字类型与条件类型相结合以进行高级字符串操作。

```ts
type ExtractRouteParams<T extends string> = T extends `/${infer Param}/${infer Rest}`
  ? { param: Param } & ExtractRouteParams<`/${Rest}`>
  : {};

type Params = ExtractRouteParams<'/user/:id/posts/:postId'>;
// { param: 'user' } & { param: 'posts' }
```

## 15 可变参数元组类型

Typescript 4+ 支持可变元组类型，允许元组捕获数组的其余部分。

```ts
type Push<T extends any[], V> = [...T, V];
type Result = Push<[1, 2, 3], 4>; // [1, 2, 3, 4]
```
