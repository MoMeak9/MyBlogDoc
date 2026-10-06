> 原文：How to Iterate Over Object Keys in TypeScript
>
> 链接：https://www.totaltypescript.com/iterate-over-object-keys-in-typescript
>
> 作者：Matt Pocock

在TypeScript中迭代对象键`object keys`可能是一场噩梦。以下是我所知道的所有解决方案。

## 快速解释 - 省流

使用 `Object.keys` 迭代不起作用，是因为 `Object.keys` 返回一个字符串数组，而不是所有键的并集。这是设计出来的，不会改变。

```ts
function printUser(user: User) {
  Object.keys(user).forEach((key) => {
    // Doesn't work!
    console.log(user[key]);
// Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'User'.
// No index signature with a parameter of type 'string' was found on type 'User'.
  });
}
```

- 可以在正确的位置投射到 `keyof typeof` 使其工作：

```ts
const user = {
  name: "Daniel",
  age: 26,
};
 
const keys = Object.keys(user);
 
keys.forEach((key) => {
  console.log(user[key as keyof typeof user]);
});
```

- 自定义类型谓词也可以通过内联缩小类型来工作。

```ts
function isKey<T extends object>(
  x: T,
  k: PropertyKey
): k is keyof T {
  return k in x;
}
 
keys.forEach((key) => {
  if (isKey(user, key)) {
    console.log(user[key]);
  }
});
```

## 更长的解释

这里有一个问题：使用Object.keys似乎并不像期望的那样工作。这是因为它没有返回你需要的类型。它不是一个包含所有键的类型，而是将其扩展为一个字符串数组。

```ts
const user = {
  name: "Daniel",
  age: 26,
};
 
const keys = Object.keys(user); // const keys: string[]
```

这意味着你不能使用键来访问对象上的值：

```ts
const nameKey = keys[0]; // const nameKey: string


user[nameKey];
// Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ name: string; age: number; }'.
// No index signature with a parameter of type 'string' was found on type '{ name: string; age: number; }'.
```

TypeScript在这里返回字符串数组有一个很好的原因。TypeScript对象类型是开放式的。

在很多情况下，TS不能保证 `Object.keys` 返回的键实际上在对象上，因此将它们扩展为字符串是唯一合理的解决方案。查看此问题以了解更多详细信息。

### 在For循环中

如果你尝试做一个For...在循环中，你也会失败的。这是出于同样的原因——key被推断为字符串，就像 `Object.keys` 一样。

```ts
function printUser(user: User) {
    for (const key in user) {
        console.log(user[key]);
        // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'User'.
        // No index signature with a parameter of type 'string' was found on type 'User'.
    }
}
```

但在许多情况下，你实际上能够确认对象是什么样的。所以，你是怎么做的？

### 解决方案1：转换为 `keyof typeof`

第一个选项是使用 `keyof typeof` 将键转换为更特定的类型。在下面的示例中，我们将 `Object.keys` 的结果转换为包含这些键的数组。

```ts
const user = {
  name: "Daniel",
  age: 26,
};
 
const keys = Object.keys(user) as Array<keyof typeof user>;
 
keys.forEach((key) => { 
    // (parameter) key: "name" | "age"
    // No more error!
  console.log(user[key]);
});
```

我们也可以在索引到对象的时候这样做。在这里， `key` 仍然是一个字符串类型-但在我们索引到user时，我们将其转换为 `keyof typeof user` 。

```ts
const keys = Object.keys(user);
 
keys.forEach((key) => {
  // (parameter) key: string
  console.log(user[key as keyof typeof user]);
});
```

然而，以任何形式使用 `as` 通常都是不安全的，这也不例外。

```ts
const user = {
  name: "Daniel",
  age: 26,
};
 
const nonExistentKey = "id" as keyof typeof user;
// const nonExistentKey: "name" | "age"
 
// No error!
const value = user[nonExistentKey];
```

对于这种情况， `as` 是一个相当强大的工具-正如你所看到的，它让我们对TypeScript撒谎。

### 解决方案2：类型谓词 `Type Predicates`

让我们来看看一些更聪明，可能更安全的解决方案。类型谓词怎么样？通过使用 `isKey` helper，我们可以在索引到对象之前检查键是否确实在对象上。我们通过在 `isKey` 的返回类型中使用 `is` 语法来正确推断TypeScript。

```ts
function isKey<T extends object>(
  x: T,
  k: PropertyKey
): k is keyof T {
  return k in x;
}
 
keys.forEach((key) => {
  if (isKey(user, key)) {
    console.log(user[key]);
  }
});
```

这个令人敬畏的解决方案来自Stefan Baumgartner关于这个主题的伟大博客文章[TypeScript: Iterating over objects](https://fettblog.eu/typescript-iterating-over-objects/)。

### 解决方案3：泛型函数

让我们来看看一个稍微奇怪的解决方案。在泛型函数中，使用 `in` 操作符将类型缩小到键。我真的不知道为什么这里可以这样用，而非泛型版本不行。

```ts
function printEachKey<T extends object>(obj: T) {
  for (const key in obj) {
    console.log(obj[key]);  // const key: Extract<keyof T, string>
  }
}
 
// Each key gets printed!
printEachKey({
  name: "Daniel",
  age: 26,
});
```

### 解决方案4：在函数中包装Object.keys

另一种解决方案是将 `Object.keys` 包装在一个返回强制转换类型的函数中。

```ts
const objectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};
 
const keys = objectKeys({
  name: "Daniel",
  age: 26,
});
 
console.log(keys); // const keys: ("name" | "age")[]
```

这可能是最容易被滥用的解决方案——将转换操作隐藏在函数内部的方法会使其更具吸引力，但可能导致人们在使用时不加思考。

## 结论

我的首选解决方案？通常情况下，类型转换非常完美地完成了工作。它简单易懂，并且通常足够安全。

但是如果你喜欢类型谓词或通用解决方案的外观，请尽管使用。isKey函数看起来很有用，我会在下一个项目中借用它。











































