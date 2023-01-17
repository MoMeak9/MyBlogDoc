---
date: 2022-12-06
category:
- TypeScript
---

# BFE-TS  TypeScript类型体操练习 Easy 21-30

## 常用工具类型

21. **实现 ReplaceAll<S, F, T>**

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

17. **实现 Trim\<T>**
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

18. **实现 Equal<A, B>**
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

    ```typescript
    type Equal<T, K> = [T] extends [K] ? [K] extends [T] ? (keyof T extends keyof K ? keyof K extends keyof T ? true : false : false) : false : false;
    
    // or
    
    type Equals<X, Y> =
      (<T>() => T extends X ? 1 : 2) extends
      (<T>() => T extends Y ? 1 : 2) ? true : false;
    ```

19. **实现 FindIndex<T, E>**
    正如`Array.prototype.findIndex()`， 请实现`FindIndex<T, E>`。

    ```ts
    type A = [any, never, 1, '2', true]
    type B = FindIndex<A, 1> // 2
    type C = FindIndex<A, 3> // never
    ```

    **答案：**

    ```typescript
    type Equals<X, Y> =
      (<T>() => T extends X ? 1 : 2) extends
      (<T>() => T extends Y ? 1 : 2) ? true : false;
    
    type FindIndex<T extends any[], E> =
      T extends [...infer Rest, infer EE]
      ? Equals<EE, E> extends true
        ? FindIndex<Rest, E> extends never
          ? Rest["length"]
          : FindIndex<Rest, E>
        : FindIndex<Rest, E>
      : never;
    ```

20. **实现 UnionToIntersection\<T>**
    请实现`UnionToIntersection<T>`用以从Union（或）得到Intersection（与/交）。

    ```ts
    type A = UnionToIntersection<{a: string} | {b: string} | {c: string}> 
    // {a: string} & {b: string} & {c: string}
    ```

    **答案：**

    ```typescript
    type UnionToIntersection<U> = 
      (
        U extends any 
          ? (x: U) => void 
          : never
      ) extends ((x: infer I) => void) 
          ? I 
          : never
    ```

    关于这是如何工作的可以参见[typescript - Transform union type to intersection type - Stack Overflow](https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type)

21. **实现 ToNumber\<T>**
    请实现`ToNumber<T>`用来转换字符串为整数。

    ```ts
    type A = ToNumber<'1'> // 1
    type B = ToNumber<'40'> // 40
    type C = ToNumber<'0'> // 0
    ```

    **答案：**

    ```typescript
    type ToNumber<T extends string, U extends number[] = []> =
      `${U['length']}` extends T
        ? U['length']
        : ToNumber<T, [...U, 1]>
    ```

22. **实现 Add<A, B>**
    实现`Add<A, B>`计算正整数之和。

    ```ts
    type A = Add<1, 2> // 3
    type B = Add<0, 0> // 0
    ```

    **答案：**

    ```typescript
    type Tuple<T extends number, U extends any[] = []> = U['length'] extends T ? U : Tuple<T, [...U, any]>
    
    type Add<A extends number, B extends number> = [...Tuple<A>, ...Tuple<B>]['length']
    ```

23. **实现 SmallerThan<A, B>**

    ```ts
    type A = SmallerThan<0, 1> // true
    type B = SmallerThan<1, 0> // false
    type C = SmallerThan<10, 9> // false
    ```

    **答案：**

    ```typescript
    type SmallerThan<
      A extends number,
      B extends number,
      S extends number[] = []
    > = S['length'] extends B
      ? false
      : S['length'] extends A
      ? true
      : SmallerThan<A, B, [A, ...S]>
    ```

24. **实现 LargerThan<A, B>**

    ```ts
    type A = LargerThan<0, 1> // false
    type B = LargerThan<1, 0> // true
    type C = LargerThan<10, 9> // true
    ```

    **答案：**

    ```typescript
    type LargerThan<A extends number, B extends number, S extends any[] = []> =
      S['length'] extends A
      ? false
      : S['length'] extends B
      ? true
      : LargerThan<A, B, [...S, any]>
    ```

    继续推进数组，直到它到达其中一个数字，到达的第一个数字就是较小的

25. **实现 Filter<T, A>**
    实现`Filter<T, A>`，返回T中能够assign给A的type所组成的新tuple。

    ```ts
    type A = Filter<[1,'BFE', 2, true, 'dev'], number> // [1, 2]
    type B = Filter<[1,'BFE', 2, true, 'dev'], string> // ['BFE', 'dev']
    type C = Filter<[1,'BFE', 2, any, 'dev'], string> // ['BFE', any, 'dev']
    ```

    **答案：**

    ```typescript
    type Filter<T extends any[], A, R extends A[] = []> = 
      T extends [infer F, ...infer O] 
        ? [F] extends [A]
          ? Filter<O, A, [...R, F]>
          : Filter<O, A, R>
        : R
    ```
