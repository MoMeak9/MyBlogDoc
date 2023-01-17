---
date: 2022-12-08
category:
- TypeScript
---

# BFE-TS  TypeScript类型体操练习 51- 60

题目来自[TypeScript题目 | BFE.dev - 前端刷题，准备前端面试拿到心仪的Offer](https://bigfrontend.dev/zh/typescript)，总共60题，带你完爆类型体操！

## 有挑战性的题目 51-60

51. **实现CamelCase\<S>**

    将下划线连接转为驼峰（snake case to camel case）

    ```ts
    type A = CamelCase<'big_front_end'> // BigFrontEnd
    ```

    **答案：**

    ```typescript
    type CamelCase<S extends string> = 
      S extends `${infer L}_${infer R}`
        ? CamelCase<`${Capitalize<L>}${Capitalize<R>}`>
        : Capitalize<S>
    ```

    > `Capitalize<S>` 为4.1新增关键字[TypeScript 4.1 新特性之字符串模板类型 - boygdm - 博客园](https://www.cnblogs.com/boyGdm/p/14489060.html)

52. **实现SnakeCase\<S>**

    经典的大驼峰转下划线连接（camel case to snake case），注意首字母转小写

    ```ts
    type A = SnakeCase<'BigFrontEnd'> // big_front_end
    ```

    **答案：**

    即分为大小写判定和添加前缀，然后组合成新的字符串，O(n)解法：

    ```typescript
    type isUpperCase<T extends string> = T extends '' ? false : (Uppercase<T> extends T ? true : false);
    
    type Prefix<T extends string, Skip extends boolean> = Skip extends false ? (isUpperCase<T> extends true ? `_${Lowercase<T>}` : T) : Lowercase<T>;
    
    type SnakeCase<T extends string, Skip extends boolean = true> = T extends `${infer A}${infer B}` ? (
      `${Prefix<A, Skip>}${SnakeCase<B, false>}`
    ) : T
    ```


53. **实现Split<S, D>**

    即实现类`String.prototype.split()`的功能

    ```ts
    type A = Split<'BFE.dev', '.'> // ['BFE', 'dev']
    type B = Split<'bfe.dev', 'e'> // ['bf', '.d', 'v']
    type C = Split<'bfe.bfe.bfe', 'bfe'> // ['', '.', '.', '']
    ```

    **答案：**

    ```typescript
    type Split<
      S extends string, 
      D extends string,
      ResultType extends string[] = [],
    > = S extends `${infer F}${D}${infer Rest}`
      ? Split<Rest, D, [...ResultType, F]>
      : [...ResultType, S];
    ```

    这与`StringToTuple<T>`有点相似，参考：

    ```ts
    type StringToTuple<T extends string> = T extends `${infer A}${infer B}` ? [A, ...StringToTuple<B>] : []
    ```


54. **实现Capitalize\<T>**

    实现字符串首字母大写，实际上TS已经内置了该工具类型，请尝试自己实现

    ```ts
    type A = MyCapitalize<'bfe'> // 'Bfe'
    ```

    **答案：**

    ```typescript
    type MyCapitalize<T extends string> = T extends `${infer P}${infer U}` ? `${Uppercase<P>}${U}` : T;
    ```


55. **实现Sort\<T>**

    升序排序。如果能够比较 `LargerThan<A,B>` 和 `SmallerThan<A,B>` 中的两个非负整数，那么你应该能够实现升序排序。

    ```ts
    type A = Sort<[100, 9, 20, 0, 0 55]>
    // [0, 0, 9, 55, 100]
    ```
    找不同，即A，B中只存在一边的keys

    ```ts
    type A = DiffKeys<{a: 1, b: 2}, {b: 1, c: 2}> // 'a' | 'c'
    ```

    **答案：**

    ```typescript
    type DiffKeys<
      A extends Record<string, any>,
      B extends Record<string, any>
    > = Exclude<keyof A, keyof B> | Exclude<keyof B, keyof A>
    ```

56. **asserts never**

    在`switch`，我们很容易犯一些错误，比如，

    ```ts
    type Value = 'a' | 'b' | 'c';
    declare let value: Value
    
    switch (value) {
      case 'a':
        break;
      case 'b':
        break;
      default:
        break;
    }
    ```

    我们遗忘了case `c`，但是编辑器没有给予提示

    所以，请实现函数`assertsNever()`去检查以保证没有遗漏的case

    ```ts
    type Value = 'a' | 'b' | 'c';
    declare let value: Value
    
    switch (value) {
      case 'a':
        break;
      case 'b':
        break;
      default:
        assertsNever(value)
        break;
    }
    ```

    此时TypeScript会警告你缺失了case `c`

    **答案：**

    可以通过的答案，但可能不太合适？

    ```typescript
    function assertsNever (arg:never) {
      throw new TypeError(`Missing case ${arg}`)
    };
    ```

57. **实现Divide<A, B>**

    即计算A/B，保留整数结果，注意对0的处理

    ```ts
    type A = Divide<1, 0> // never
    type B = Divide<4, 2> // 2
    type C = Divide<10, 3> // 3
    ```

    **答案：**

    可以理解为模拟计算，例如10/3，逐个减去3，计算可以减掉多少个3，直到剩下1，无法在被3减去，输出之前所减去的3的个数

    ```typescript
    type Tuple<T extends number, U extends any[] = []> =
      U['length'] extends T ? U : Tuple<T, [...U, any]>
    
    type Subtract<
      A extends number,
      B extends number
      > = Tuple<A> extends [...Tuple<B>, ...infer R] ? R['length'] : never
    
    type SmallerThan<
      A extends number,
      B extends number,
      S extends number[] = []
    > = S['length'] extends B
      ? false
      : S['length'] extends A
      ? true
      : SmallerThan<A, B, [A, ...S]>
    type Divide<A extends number, B extends number, S extends number[] = []> = 
    B extends 0 ? never : SmallerThan<A,B> extends true ? S['length'] : Divide<Subtract<A, B>, B, [...S, any]>;
    ```


58. **实现Multiply<A, B>**

    即A\*B的计算，其中A,B均为非负整数

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
