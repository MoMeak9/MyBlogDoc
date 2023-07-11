---
date: 2022-12-05
category:
- TypeScript
---

# BFE-TS  TypeScript类型体操练习 Easy 11-20

题目来自[TypeScript题目 | BFE.dev - 前端刷题，准备前端面试拿到心仪的Offer](https://bigfrontend.dev/zh/typescript)，总共60题，带你完爆类型体操！

## Utility types 内置工具类型实现 11-15

11. **实现 ConstructorParameters\<T>**

    Parameters处理的是function type。 与之类似，`ConstructorParameters<T>`针对的是class，返回constructor function T的其参数type组成的tuple type。

    ```ts
    class Foo {
      constructor (a: string, b: number, c: boolean) {}
    }
    
    type C = MyConstructorParameters<typeof Foo> 
    // [a: string, b: number, c: boolean]
    ```

    **答案：**

    ```ts
    type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
    ```

12. **实现ReturnType\<T>**

    `Parameters<T>`处理的是参数， `ReturnType<T>`，正如起名所述，处理的是function type T的返回值type

    ```ts
    type Foo = () => {a: string}
    
    type A = MyReturnType<Foo> // {a: string}
    ```

    通过 infer 推断函数返回值

    **答案：**

    ```ts
    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
    ```

13. **实现InstanceType\<T>**

    对于constructor function type T，`InstanceType<T>` 返回其instance type。

    ```ts
    class Foo {}
    type A = MyInstanceType<typeof Foo> // Foo
    type B = MyInstanceType<() => string> // Error
    ```

    通过 infer 推断 new 后返回的类型

    **答案：**

    ```ts
    type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
    ```

14. **实现ThisParameterType\<T>**

    对于function type T，`ThisParameterType<T>`返回`this` type。 如果没有指定，则使用`unknown`。

    ```ts
    function Foo(this: {a: string}) {}
    function Bar() {}
    
    type A = MyThisParameterType<typeof Foo> // {a: string}
    type B = MyThisParameterType<typeof Bar> // unknown
    ```

    通过 infer 推断函数的 this 类型

    **答案：**

    ```ts
    type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown;
    ```

15. **实现OmitThisParameter\<T>**

    `Function.prototype.bind()`返回一个`this`已经bind过后的function。 对于这种情况，可以用`OmitThisParameter<T>`来增加type信息。

    ```ts
    function foo(this: {a: string}) {}
    foo() // Error
    
    const bar = foo.bind({a: 'BFE.dev'})
    bar() // OK
    
    
    type Foo = (this: {a: string}) => string
    type Bar = MyOmitThisParameter<Foo> // () => string
    ```

    因推断时自动忽略函数的 this 类型，因此直接通过推断后的参数类型和返回值类型包装成个函数返回即可

    **答案：**

    ```ts
    type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;
    ```

## 16-20 常用工具类型

16. **实现FirstChar\<T>**

    ```ts
    type A = FirstChar<'BFE'> // 'B'
    type B = FirstChar<'dev'> // 'd'
    type C = FirstChar<''> // never
    ```

    **答案：**

    `TS`支持字符串使用`infer`推断，语法和模板字符串相似，因此使用`infer`即可完成。

    ```ts
    type FirstChar<T extends string> = T extends `${infer T}${any}` ? T : never
    ```

17. **实现LastChar\<T>**

    类似于`FirstChar<T>`，实现`LastChar<T>`。

    ```ts
    type A = LastChar<'BFE'> // 'E'
    type B = LastChar<'dev'> // 'v'
    type C = LastChar<''> // never
    ```

    **答案：**

    同样使用`infer`推断字符串中的类型。

    ```ts
    type LastChar<T extends string> = T extends `${infer F}${infer R}`
      ? R extends ''
        ? F
        : LastChar<R>
      : never
    ```

18. **实现 TupleToUnion\<T>**

    给定一个元组类型，实现 `TupleToUnion<T> `以从中获取联合类型。

    ```ts
    type Foo = [string, number, boolean]
    
    type Bar = TupleToUnion<Foo> // string | number | boolean
    ```

    **答案：**

    这题考察的是索引访问类型`Indexed Access Types`

    ```ts
    type TupleToUnion<T extends any[]> = T[number]
    ```

19. **实现 FirstItem\<T>**

    和 `FirstChar<T>`类似，请实现`FirstItem<T>`来返回tuple type的第一个type。

    ```ts
    type A = FirstItem<[string, number, boolean]> // string
    type B = FirstItem<['B', 'F', 'E']> // 'B'
    ```

    **答案：**

    ```typescript
    type FirstItem<T extends any[]> = T extends [infer P, ...infer R] ? P : never
    ```

20. **实现 IsNever\<T>**

    请实现`IsNever<T>`用以判断T是否是never。

    ```ts
    type A = IsNever<never> // true
    type B = IsNever<string> // false
    type C = IsNever<undefined> // false
    ```

    **答案：**

    ```typescript
    type IsNever<T> = [T] extends [never] ? true : false;
    ```
    
