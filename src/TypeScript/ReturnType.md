# TS中的内置条件类型：ReturnType

## 先说一下条件类型是什么

1. 条件类型是一种由条件表达式所决定的类型。

2. 条件类型使类型具有了不唯一性,同样增加了语言的灵活性。

总言之，条件类型就是在类型中添加条件分支，以支持更加灵活的泛型，满足更多的使用场景。

例如：

```ts
T extends U ? X : Y
```

表示若类型T可被赋值给类型U,那么结果类型就是X类型,否则就是Y类型。

而**内置条件类型**则是TS内部封装好的一些类型处理，使用起来更加便利。

## 内置条件类型：ReturnType\<Type>
在 2.8 版本中，TypeScript 内置了一些与 `infer` 有关的映射类型，就比如说我们今天的主角：`ReturnType<Type>`


其用于提取函数的返回值类型：

>Constructs a type consisting of the return type of function `Type`.

手撕示例：

```ts
type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;
```
`ReturnType<T>` 只是将 `infer P` 从参数位置移动到返回值位置，因此此时 `P` 即是表示待推断的返回值类型。

```ts
// 比如
type Func = () => User;
type Test = ReturnType<Func>; // Test = User

// 其他例子
type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<<T>() => T>; // unknown
type T2 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
```

非法的例子：

```ts
type T = ReturnType<string>;
// Type 'string' does not satisfy the constraint '(...args: any) => any'.
```

```ts
type T = ReturnType<Function>;
// Type 'Function' does not satisfy the constraint '(...args: any) => any'.
// Type 'Function' provides no match for the signature '(...args: any): any'.
```

以上均不满足`(...args: any): any'.`,type T 将被视为`any`处理。

其他内置的条件类型还有：

```ts
Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
Extract<T, U> -- 提取T中可以赋值给U的类型。
NonNullable<T> -- 从T中剔除null和undefined。
InstanceType<T> -- 获取构造函数类型的实例类型。
```

## 讲回infer

`infer` 最早出现在此 [PR](https://github.com/Microsoft/TypeScript/pull/21496) 中，表示在 `extends` 条件语句中待推断的类型变量。

示例如下：

```
type ParamType<T> = T extends (arg: infer P) => any ? P : T;
```

在这个条件语句 `T extends (arg: infer P) => any ? P : T` 中，`infer P` 表示待推断的函数参数。

整句表示为：如果 `T` 能赋值给 `(arg: infer P) => any`，则结果是 `(arg: infer P) => any` 类型中的参数 `P`，否则返回为 `T`。

```ts
interface User {
  name: string;
  age: number;
}

type Func = (user: User) => void;

type Param = ParamType<Func>; // Param = User
type AA = ParamType<string>; // string
```


> **参考：**
> 
> [深入浅出TS](https://jkchao.github.io/typescript-book-chinese/tips/infer.html#%E4%BB%8B%E7%BB%8D)
> 
> [Utility Types TS文档](https://www.typescriptlang.org/docs/handbook/utility-types.html)
> 
> [大厂手撕](https://tehub.com/a/8K0Iqc8vej)
