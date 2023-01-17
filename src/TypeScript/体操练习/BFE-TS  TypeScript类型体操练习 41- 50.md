---
date: 2022-12-08
category:
- TypeScript
---

# BFE-TS  TypeScript类型体操练习 41- 50

题目来自[TypeScript题目 | BFE.dev - 前端刷题，准备前端面试拿到心仪的Offer](https://bigfrontend.dev/zh/typescript)，总共60题，带你完爆类型体操！

## 常用工具类型 41-44

41. **实现 LengthOfString\<T>**

    实现`LengthOfString<T>`用以返回字符串长度。

    ```ts
    type A = LengthOfString<'BFE.dev'> // 7
    type B = LengthOfString<''> // 0
    ```

    **答案：**

    1.  转为元组后直接访问泛型的.length属性

        ```ts
        type StringToTuple<T extends string> = T extends `${infer L}${infer R}` ? [L, ...StringToTuple<R>] : [];
        type LengthOfString<T extends string> = StringToTuple<T>['length'];
        ```

    0.  辅助数组统计长度

        ```ts
        type LengthOfString<
          T extends string,
          U extends 0[] = []
        > = T extends `${infer A}${infer B}`
          ? LengthOfString<B, [0, ...U]>
          : U["length"];
        ```

16. **实现 LengthOfTuple\<T>**

    实现`LengthOfTuple<T>`返回tuple type的长度。

    ```ts
    type A = LengthOfTuple<['B', 'F', 'E']> // 3
    type B = LengthOfTuple<[]> // 0
    ```

    **答案：**

    直接访问泛型的.length属性

    ```ts
    type LengthOfTuple<T extends any[]> = T["length"]
    ```

16. **实现 StringToTuple\<T>**

    实现`StringToTuple<T>`将字符串拆散为tuple，类似`String.prototype.split('')`效果

    ```ts
    type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
    type B = StringToTuple<''> // []
    ```

    **答案：**

    ```ts
    type StringToTuple<T extends string> = T extends `${infer A}${infer B}` ? [A, ...StringToTuple<B>] : []
    ```

16. **实现 LastItem\<T>**

    `FirstItem<T>`类似，请实现`LastItem<T>`用以返回tuple的最后一个type

    ```ts
    type A = LastItem<[string, number, boolean]> // boolean
    type B = LastItem<['B', 'F', 'E']> // 'E'
    type C = LastItem<[]> // never
    ```

    **答案：**

    ```ts
    type LastItem<T extends any[]> = T extends [...infer Firsts, infer Last] ? Last : never
    ```

    相类似的

    ```ts
    type LastItem<T extends any[]> = T extends [...any[], infer M] ? M : never;
    ```


## 有挑战性的题目 45-50

45. **实现UndefinedToNull\<T>**

    根据题 [176. undefined to null](https://bigfrontend.dev/problem/undefined-to-null)，实现`UndefinedToNull<T>`，将对象、元组or传入泛型的undefined转置为null

    ```ts
    type A = UndefinedToNull<string>    // string
    type B = UndefinedToNull<undefined> // null
    type C = UndefinedToNull<[undefined, null]> // [null, null]
    type D = UndefinedToNull<{
      a: undefined,
      b: [1, undefined]
    }> // {a: null, b: [1, null]}
    ```

    **答案：**

    ```ts
    type UndefinedToNull<T> = T extends Record<string, any> ? {
      [K in keyof T]: UndefinedToNull<T[K]>
    } : (T extends [infer A, ...infer B] ? [A, ...UndefinedToNull<B>] : T extends undefined ? null : T)
    ```

46. **实现MapStringUnionToObjectUnion\<U>**

    将字符串联合映射到联合对象类型，如下所示。

    ```ts
    type A = MapStringUnionToObjectUnion<'1'>
    // {
    //   value: '1'
    // } 
    ​
    type B = MapStringUnionToObjectUnion<'1' | '2'>
    // {
    //   value: '1'
    // } |
    // {
    //   value: '2
    // }
    ```

    **答案：**

    ```ts
    type MapStringUnionToObjectUnion<U extends string> = { [k in U]: { value: k } }[U]
    ```


47. **实现Diff<A, B>**

    找不同，即A，B中只存在一边的keys

    ```ts
    type A = DiffKeys<{a: 1, b: 2}, {b: 1, c: 2}> // 'a' | 'c'
    ```

    **答案：**

    ```ts
    type DiffKeys<
      A extends Record<string, any>,
      B extends Record<string, any>
    > = Exclude<keyof A, keyof B> | Exclude<keyof B, keyof A>
    ```

48. **实现ObjectPaths\<O>**

    `ObjectPaths<O>`，能够返回属性的所有有效路径

    ```ts
    type Obj = {
      a: {
        b: {
          c: 1,
          d: 2
        },
        e: 1
      },
      f: 3
    }
    ​
    type A = ObjectPaths<Obj>
    // 'a.b.c' | 'a.b.d' | 'a.e' | 'f'
    ```

    **答案：**

    ```ts
    type ObjectPaths<O extends Record<string, any>> = {
      [K in keyof O]: K extends string 
                      ? O[K] extends Record<string, any> ? `${K}.${ObjectPaths<O[K]>}` : `${K}`
                      : never
    }[keyof O];
    ```

49. **实现StringToNumber\<S>**

    将字符串转换为数字，假设字符串都是有效的非负整数

    ```ts
    type A = StringToNumber<'12'> // 123
    ```

    **答案：**

    ```ts
    type StringToNumber<S extends string, T extends any[] = []> =
      `${T['length']}` extends S ? T['length'] : StringToNumber<S, [...T, any]> 
    ```

50. **实现Abs\<N>**

    获取数字的绝对值，假设数字都是整数

    **答案：**

    ```ts
    type StringToNumber<S extends string, T extends any[] = []> =
      `${T['length']}` extends S ? T['length'] : StringToNumber<S, [...T, any]> 
    ​
    type Abs<N extends number, T extends any[] = []> =
      `${N}` extends `-${infer A}` ? Abs<StringToNumber<A>> : StringToNumber<`${N}`>
    ```
