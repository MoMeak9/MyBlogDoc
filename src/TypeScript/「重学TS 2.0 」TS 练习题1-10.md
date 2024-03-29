---
date: 2022-03-19
category:
- 练习题
- 前端
- TypeScript
---

# 「重学TS 2.0 」TS 练习题1-10

### 第一题

```typescript
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2）
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T', 
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  return {
    id: u.id,
    kind: 'customer'
  }
}
```

**Answer**

```typescript
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2）
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T', 
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  return {
    id: u.id,
    kind: 'customer'
  }
}
回答：T 类型兼容 User类型，
第一种回答:
function makeCustomer<T extends User>(u: T): T {
	// Error（TS 编译器版本：v4.4.2）
	// Type '{ id: number; kind: string; }' is not assignable to type 'T'.
	// '{ id: number; kind: string; }' is assignable to the constraint of type 'T',
	// but 'T' could be instantiated with a different subtype of constraint 'User'.
	return {
                ...u,
		id: u.id,
		kind: 'customer',
	};
}
第二种返回值限制为User 类型的
function makeCustomer<T extends User>(u: T): ReturnMake<T, User> {
	// Error（TS 编译器版本：v4.4.2）
	// Type '{ id: number; kind: string; }' is not assignable to type 'T'.
	// '{ id: number; kind: string; }' is assignable to the constraint of type 'T',
	// but 'T' could be instantiated with a different subtype of constraint 'User'.
	return {
		id: u.id,
		kind: 'customer',
	};
}

type ReturnMake<T extends User, U> = {
	[K in keyof U as K extends keyof T ? K : never]: U[K];
};
```

### 第二题

本道题我们希望参数 `a` 和 `b` 的类型都是一致的，即 `a` 和 `b` 同时为 `number` 或 `string` 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。

```ts
function f(a: string | number, b: string | number) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok
```

**Answer**

```ts
function f<T extends string | number>(a: T, b: T) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return (a as number) + (b as number); // error as b can be number | string
  }
}

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f(2, 2) // Ok
```

### 第三题

在 [掌握 TS 这些工具类型，让你开发事半功倍](https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&mid=2247484142&idx=1&sn=946ba90d10e2625513f09e60a462b3a7&chksm=ea47a3b6dd302aa05af716d0bd70d8d7c682c9f4527a9a0c03cd107635711c394ab155127f9e&scene=21#wechat_redirect) 这篇文章中，阿宝哥介绍了 TS 内置的工具类型：`Partial<T>`，它的作用是将某个类型里的属性全部变为可选项 `?`。

```ts
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

// lib.es5.d.ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

那么如何定义一个 `SetOptional` 工具类型，支持把给定的 keys 对应的属性变成可选的？对应的使用示例如下所示：

```ts
type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;

// type SomeOptional = {
// 	a?: number; // 该属性已变成可选的
// 	b?: string; // 保持不变
// 	c: boolean; 
// }
```

在实现 `SetOptional` 工具类型之后，如果你感兴趣，可以继续实现 `SetRequired` 工具类型，利用它可以把指定的 keys 对应的属性变成必填的。对应的使用示例如下所示：

```ts
type Foo = {
	a?: number;
	b: string;
	c?: boolean;
}

// 测试用例
type SomeRequired = SetRequired<Foo, 'b' | 'c'>;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// }
```

**Answer**

3.1 SetOptional

```ts
type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

type Simplify<T> = {
  [P in keyof T]: T[P]
}

type SetOptional<T, K extends keyof T> = 
  Simplify<Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>>

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;
// type SomeOptional = {
// 	a?: number; // 该属性已变成可选的
// 	b?: string; // 保持不变
// 	c: boolean;
// }
```

在以上代码中，我们定义了一个 `Simplify` 工具类型，用来对交叉类型进行扁平化处理。具体的作用，你们可以实际体验一下。

3.2 SetRequired

```ts
type Foo = {
	a?: number;
	b: string;
	c?: boolean;
}

type Simplify<T> = {
  [P in keyof T]: T[P]
}

type SetRequired<T, K extends keyof T> = Simplify<Pick<T, Exclude<keyof T, K>> & Required<Pick<T, K>>>

// 测试用例
type SomeRequired = SetRequired<Foo, 'b' | 'c'>;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// }
```

### 第四题

`Pick<T, K extends keyof T>` 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};
```

那么如何定义一个 `ConditionalPick` 工具类型，支持根据指定的 `Condition` 条件来生成新的类型，对应的使用示例如下：

```ts
interface Example {
	a: string;
	b: string | number;
	c: () => void;
	d: {};
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
//=> {a: string}
```

**Answer**

```ts
interface Example {
  a: string;
  e: number;
  b: string | number;
  c: () => void;
  d: {};
  f: string | number | boolean;
}
type ConditionalPick<V, T> = {
  [K in keyof V as V[K] extends T ? K : never]: V[K];
};
type StringKeysOnly = ConditionalPick<Example, string | number>;
```

