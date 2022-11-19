---
date: 2022-11-13
category:
- 面试题
- 前端
- TypeScript
---

# TS进阶练习 [BFE-TS]

所有题目来自[BFE](https://bigfrontend.dev/zh/typescript)

## 1-44 Easy

### 1-15 Utility types 内置工具类型实现

1. **实现Partial**

   ```ts
   type Partial<T> = {
       [P in keyof T]?: T[P];
   };
   ```

2. **实现Required**

   ```ts
   type Required<T> = {
       [P in keyof T]-?: T[P];
   };
   ```

   

3. **实现Readonly**

   ```ts
   type Readonly<T> = {
       readonly [P in keyof T]: T[P];
   };
   ```

4. **实现Record**

   ```ts
   type Record<K extends keyof any, T> = {
       [P in K]: T;
   };
   ```

5. **实现Pick**

   ```ts
   type Pick<T, K extends keyof T> = {
       [P in K]: T[P];
   };
   ```

6. **实现Omit**

   ```ts
   type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
   ```

7. **实现Exclude**

   ```ts
   type Exclude<T, U> = T extends U ? never : T;
   ```

8. **实现Extract**

   ```ts
   type Extract<T, U> = T extends U ? T : never;
   ```

9. **实现NonNullable**

   剔除 null | undefined 类型，表明非空

   ```ts
   type NonNullable<T> = T extends null | undefined ? never : T;
   ```

10. **实现Parameters**

    ```ts
    type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
    ```
    
11. **实现ConstructorParameters**

    ```ts
    type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
    ```

12. **实现ReturnType**

    通过 infer 推断函数返回值

    ```ts
    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
    ```

13. **实现InstanceType**

    通过 infer 推断 new 后返回的类型

    ```ts
    type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
    ```

14. **实现ThisParameterType**

    通过 infer 推断函数的 this 类型

    ```ts
    type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown;
    ```

15. **实现OmitThisParameter**

    因推断时自动忽略函数的 this 类型，因此直接通过推断后的参数类型和返回值类型包装成个函数返回即可

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

    `TS`支持字符串使用`infer`推断，语法和模板字符串相似，因此使用`infer`即可完成。

    ```ts
    type FirstChar<T extends string> = T extends `${infer T}${any}` ? T : never
    ```

17. **实现LastChar\<T>**

    实现`LastChar<T>`类型：

    ```ts
    type A = LastChar<'BFE'> // 'E'
    type B = LastChar<'dev'> // 'v'
    type C = LastChar<''> // never
    ```

    **答案：**
    
    同样使用`infer`推断字符串中的类型，模板字符串中的推断必须保证前面的`${any}`匹配一个，身下的都丢给最后的`${any}`匹配。
    
    举个栗子：
    
    用`${infer A}${infer B}${infer C}`匹配`'ab'`，`A`在前面匹配了`'a'`，`B`也在前面因此匹配一个`'b'`，剩下的都丢给`C`，因为没有剩余的了，所以`C`匹配到了`''`。
    
    晓得如何匹配了，那么再加上递归即可做出来
    
    ```ts
    type LastChar<T extends string> = T extends `${infer F}${infer R}`
      ? R extends ''
        ? F
        : LastChar<R>
      : never
    ```
    
18. **implement TupleToUnion\<T>**

    ```ts
    type Foo = [string, number, boolean]
    
    type Bar = TupleToUnion<Foo> // string | number | boolean
    ```

    **答案**

    这题考察的是索引访问类型`Indexed Access Types`，我们可以使用索引访问类型来查找另一种类型上的特定属性，`keyof`可以获得某类型的**所有**可访问的索引类型。

    ```ts
    type TupleToUnion<T extends any[]> = T[number]
    ```

    数组类型有个特殊的索引类型`number`，可以通过`arr[number]`获取一个数组中元素的类型。

19. **implement FirstItem\<T>**

    

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

    
