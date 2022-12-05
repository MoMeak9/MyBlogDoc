---
date: 2022-11-13
category:
- 面试题
- 前端
- TypeScript
---

# TS进阶练习 BFE-TS

题目来自[TypeScript题目 | BFE.dev - 前端刷题，准备前端面试拿到心仪的Offer。](https://bigfrontend.dev/zh/typescript)，总共60题，带你完爆类型体操！

## 1-44 Easy

### 1-15 Utility types 内置工具类型实现

1. **实现Partial**

   `Partial<T>`返回一个包含所有`T`的子集的type。

   ```ts
   type Foo = {
     a: string
     b: number
     c: boolean
   }
   
   // below are all valid
   
   const a: MyPartial<Foo> = {}
   
   const b: MyPartial<Foo> = {
     a: 'BFE.dev'
   }
   
   const c: MyPartial<Foo> = {
     b: 123
   }
   
   const d: MyPartial<Foo> = {
     b: 123,
     c: true
   }
   
   const e: MyPartial<Foo> = {
     a: 'BFE.dev',
     b: 123,
     c: true
   }
   ```

   **答案：**

   ```ts
   type Partial<T> = {
       [P in keyof T]?: T[P];
   };
   ```

2. **实现Required**

   和`Partial<T>`正好相反， `Required<T>`会将所有的属性设为required。

   ```ts
   // all properties are optional
   type Foo = {
     a?: string
     b?: number
     c?: boolean
   }
   
   
   const a: MyRequired<Foo> = {}
   // Error
   
   const b: MyRequired<Foo> = {
     a: 'BFE.dev'
   }
   // Error
   
   const c: MyRequired<Foo> = {
     b: 123
   }
   // Error
   
   const d: MyRequired<Foo> = {
     b: 123,
     c: true
   }
   // Error
   
   const e: MyRequired<Foo> = {
     a: 'BFE.dev',
     b: 123,
     c: true
   }
   // valid
   ```

   **答案：**

   ```ts
   type Required<T> = {
       [P in keyof T]-?: T[P];
   };
   ```

3. **实现Readonly**

   **答案：**

   ```ts
   type Readonly<T> = {
       readonly [P in keyof T]: T[P];
   };
   ```

4. **实现Record**

   `Record<K, V>`返回一个key是K值是V的object type。

   ```ts
   type Key = 'a' | 'b' | 'c'
   
   const a: Record<Key, string> = {
     a: 'BFE.dev',
     b: 'BFE.dev',
     c: 'BFE.dev'
   }
   a.a = 'bigfrontend.dev' // OK
   a.b = 123 // Error
   a.d = 'BFE.dev' // Error
   
   type Foo = MyRecord<{a: string}, string> // Error
   ```

   **答案：**

   ```ts
   type Record<K extends keyof any, T> = {
       [P in K]: T;
   };
   ```

5. **实现Pick**

   `Pick<T, K>`，正如其名所示，将从T中抽选出K中含有的属性然后返回一个新的type。

   ```ts
   type Foo = {
     a: string
     b: number
     c: boolean
   }
   
   type A = MyPick<Foo, 'a' | 'b'> // {a: string, b: number}
   type B = MyPick<Foo, 'c'> // {c: boolean}
   type C = MyPick<Foo, 'd'> // Error
   ```

   **答案：**

   ```ts
   type Pick<T, K extends keyof T> = {
       [P in K]: T[P];
   };
   ```

6. **实现Omit**

   `Omit<T, K>`返回一个从T的属性中剔除掉K过后的type。

   ```ts
   type Foo = {
     a: string
     b: number
     c: boolean
   }
   
   type A = MyOmit<Foo, 'a' | 'b'> // {c: boolean}
   type B = MyOmit<Foo, 'c'> // {a: string, b: number}
   type C = MyOmit<Foo, 'c' | 'd'> // {a: string, b: number}
   ```

   **答案：**

   ```ts
   type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
   ```

7. **实现Exclude**

   `Exclude<T, K>`返回一个从T中去掉能代入K的成员后的type。

   ```ts
   type Foo = 'a' | 'b' | 'c'
   
   type A = MyExclude<Foo, 'a'> // 'b' | 'c'
   type B = MyExclude<Foo, 'c'> // 'a' | 'b
   type C = MyExclude<Foo, 'c' | 'd'>  // 'a' | 'b'
   type D = MyExclude<Foo, 'a' | 'b' | 'c'>  // never
   ```

   **答案：**

   ```ts
   type Exclude<T, U> = T extends U ? never : T;
   ```

8. **实现Extract**

   和Exclude正好相反， `Extract<T, U>`返回T中可以代入到U的成员所组成的type。

   ```ts
   type Foo = 'a' | 'b' | 'c'
   
   type A = MyExtract<Foo, 'a'> // 'a'
   type B = MyExtract<Foo, 'a' | 'b'> // 'a' | 'b'
   type C = MyExtract<Foo, 'b' | 'c' | 'd' | 'e'>  // 'b' | 'c'
   type D = MyExtract<Foo, never>  // never
   ```

   **答案：**

   ```ts
   type Extract<T, U> = T extends U ? T : never;
   ```

9. **实现NonNullable**

   剔除 null | undefined 类型，表明非空

   **答案：**

   ```ts
   type NonNullable<T> = T extends null | undefined ? never : T;
   ```

10. **实现Parameters**

    对于function type T， `Parameters<T>` 返回一个由其参数type组成的tuple type。

    ```ts
    type Foo = (a: string, b: number, c: boolean) => string
    
    type A = MyParameters<Foo> // [a:string, b: number, c:boolean]
    type B = A[0] // string
    type C = MyParameters<{a: string}> // Error
    ```

    **答案：**

    ```ts
    type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
    ```

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

### 16-44 实用工具类型

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

21. **implement ReplaceAll<S, F, T>**

    正如`String.prototype.replaceAll()`，请实现`ReplaceAll<S, F, T>`。

    ```ts
    type A = ReplaceAll<'aba', 'b', ''> // 'aa'
    type B = ReplaceAll<'ababbab', 'b', ''> // 'aaa'
    ```

    **答案：**

    1、前、中、后分别取一下infer。

    2、 判断F不为空

    ```ts
    type ReplaceAll<
      S extends string,
      F extends string,
      T extends string
      > = F extends '' ? S : (S extends `${F}${infer R}` ? `${T}${ReplaceAll<R, F, T>}` :
        (S extends `${infer A}${F}${infer B}` ? `${A}${T}${ReplaceAll<B, F, T>}` :
          S extends `${infer A}${F}` ? `${ReplaceAll<A, F, T>}${T}` : S
        ));
    ```

22. **implement Trim\<T>**
    正如`String.prototype.trim()`，请实现`Trim<T>`。

    ```ts
    type A = Trim<'    BFE.dev'> // 'BFE'
    type B = Trim<' BFE. dev  '> // 'BFE. dev'
    type C = Trim<'  BFE .   dev  '> // 'BFE .   dev'
    ```

    **答案：**

    ```typescript
    type Trim<T extends string> = T extends ` ${infer R}` 
      ? Trim<R> 
      : T extends `${infer L} `
        ? Trim<L>
        : T
    ```

23. **implement Equal<A, B>**
    检测俩类型是完全相同的

    ```ts
    Equal<any, any> // true
    Equal<any, 1> // false
    Equal<never, never> // true
    Equal<'BFE', 'BFE'> // true
    Equal<'BFE', string> // false
    Equal<1 | 2, 2 | 1> // true
    Equal<{a : number}, {a: number}> // true
    ```

    **答案：**

    

24. **implement FindIndex<T, E>**
    TypeScript
    容易

25. **implement UnionToIntersection<T>**
    TypeScript
    容易

26. **implement ToNumber<T>**
    TypeScript
    容易

27. **implement Add<A, B>**
    TypeScript
    容易

28. **implement SmallerThan<A, B>**
    TypeScript
    容易

29. **implement LargerThan<A, B>**
    TypeScript
    容易

30. **implement Filter<T, A>**
    TypeScript
    容易

31. **implement Repeat<T, C>**
    TypeScript
    容易

32. **implement TupleToString<T>**
    TypeScript
    容易

33. **implement RepeatString<T, C>**
    TypeScript
    容易

34. **implement Push<T, I>**
    TypeScript
    容易

35. **implement IsAny<T>**
    TypeScript
    容易

36. **implement Shift<T>**
    TypeScript
    容易

37. **implement IsEmptyType<T>**
    TypeScript
    容易

38. **implement Flat<T>**
    TypeScript
    容易

39. **实现ReverseTuple<T>**
    TypeScript
    容易

40. **implement UnwrapPromise<T>**
    TypeScript
    容易

41. **implement LengthOfString<T>**
    TypeScript
    容易

42. **implement LengthOfTuple<T>**
    TypeScript
    容易

43. **implement StringToTuple<T>**
    TypeScript
    容易

44. **implement LastItem<T>**
    TypeScript
    容易

## 45-60 Few challengers

45. **实现UndefinedToNull\<T>**

59. **实现MapStringUnionToObjectUnion\<U>**


47. **实现Diff<A, B>**

57. **实现ObjectPaths\<O>**


56. **实现Abs\<N>**


55. **实现StringToNumber\<S>**


54. **实现CamelCase\<S>**


53. **实现SnakeCase\<S>**


52. **实现Split<S, D>**


51. **实现Capitalize\<T>**


50. **实现Sort\<T>**

49. **asserts never**


48. **实现Divide<A, B>**


58. **实现Multiply<A, B>**

    ```ts
    type A = Multiply<1, 0> // 0
    type B = Multiply<4, 6> // 24
    ```

    **答案：**

    ```ts
    type Tuple<T extends number, U extends any[] = []> =
      U['length'] extends T ? U : Tuple<T, [...U, any]>
    type MinusOne<T extends number> =
      Tuple<T> extends [any, ...infer R] ? R['length'] : 0
    type MultiplyHelper<T extends any[], U extends number, I extends any[] = []> =
      U extends 0 ? I['length'] : MultiplyHelper<T, MinusOne<U>, [...T, ...I]>
    
    type Multiply<A extends number, B extends number> = MultiplyHelper<Tuple<A>, B>
    ```

59. **实现Subtract<A, B>**
    只需要考虑正整数，并且 B 保证小于或等于 A

    ```ts
    type A = Subtract<1, 1> // 0
    type B = Subtract<10, 3> // 7
    type C = Subtract<3, 10> // never
    ```

    **答案：**

    ```ts
    type _P<A, B, S = 0, T extends unknown[] = [], C extends unknown[] = []> = S extends 1 ? (
      // 1代表start已经相等了，在寻找end
      T['length'] extends B ? [...C, 1]['length'] : _P<A, B, S, [...T, 1], [...C, 1]>
    ) : (
        T['length'] extends B ? never :
        // 先和2位匹配到为never
        (
          _P<A, B, T['length'] extends A ? 1 : 0, [...T, 1], C>
          // 和第一位匹配到
        )
      )
    
    type Subtract<A extends number, B extends number> = A extends B ? 0 : _P<B, A>
    ```

60. **实现Slice<A, S, E>**

    即实现类似`Array.prototype.slice()`

    ```ts
    type A = Slice<[1,2,3,4], 0, 2> // [1, 2]
    type B = Slice<[1,2,3,4], 2> // [3, 4]
    type C = Slice<[number, boolean, bigint], 2, 5> // [bigint]
    type D = Slice<[string, boolean], 0, 1> // [string]
    type E = Slice<[number, boolean, bigint], 5, 6> // []
    ```

    其中`E`不为负数

    **答案：**

    ```ts
    // 截取L之后的元素，包括L
    type RemoveStart<
      A extends any[],
      L extends number,
      ResultType extends any[] = []
    > = ResultType['length'] extends L ? A : (
      A extends [infer First, ...infer Rest] ? (
        RemoveStart<Rest, L, [...ResultType, First]>
      ) : []
    );
    
    // 截取L之前的元素，不包括L
    type RemoveEnd<
      A extends any[],
      L extends number,
      ResultType extends any[] = []
    > = ResultType['length'] extends L ? ResultType : (
      A extends [infer First, ...infer Rest] ? (
        RemoveEnd<Rest, L, [...ResultType, First]>
      ) : [...ResultType, ...A]
    );
    
    type Slice<
      A extends any[], 
      S extends number = 0, 
      E extends number = A['length'],
    > = RemoveStart<RemoveEnd<A, E>, S>;
    ```

    
