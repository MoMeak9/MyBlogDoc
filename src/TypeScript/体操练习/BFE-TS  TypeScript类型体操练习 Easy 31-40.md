---
date: 2022-12-07
category:
- TypeScript
---

# BFE-TS  TypeScript类型体操练习 Easy 31-40

题目来自[TypeScript题目 | BFE.dev - 前端刷题，准备前端面试拿到心仪的Offer](https://bigfrontend.dev/zh/typescript)，总共60题，带你完爆类型体操！

## 常用工具类型

31. **实现 Repeat<T, C>**

    返回一个进行重复复制操作的元组

    ```ts
    type A = Repeat<number, 3> // [number, number, number]
    type B = Repeat<string, 2> // [string, string]
    type C = Repeat<1, 1> // [1, 1]
    type D = Repeat<0, 0> // []
    ```

    **答案：**

    思路与RepeatString<T, C>差不多

    ```typescript
    type Repeat<T, C extends number, R extends any[] = []> = R['length'] extends C ? R : Repeat<T, C ,[...R, T]>
    ```

17. **实现 TupleToString\<T>**

    通过将所有字符串连接成为新的字符串类型

    ```ts
    type A = TupleToString<['a']> // 'a'
    type B = TupleToString<['B', 'F', 'E']> // 'BFE'
    type C = TupleToString<[]> // ''
    ```

    **答案：**

    ```typescript
    type TupleToString<T extends unknown[]> = T extends [infer F, ...infer R] ? F extends string ? `${F}${TupleToString<R>}` : never : "";
    ```

18. **实现 RepeatString<T, C>**

    类似于`String.prototype.repeat()`，即对字符串的重复复制，注意C为0的情况

    ```ts
    type A = RepeatString<'a', 3> // 'aaa'
    type B = RepeatString<'a', 0> // ''
    ```

    **答案：**

    即递归直至A（作为最终字符串的长度达到C的数值）

    ```typescript
    type RepeatString<T extends string, C extends number, A extends string[] = []> = A['length'] extends C
        ? ''
        : `${T}${RepeatString<T, C, [T, ...A]>}`;
    ```

19. **实现 Push<T, I>**

    类似数组Push操作，入栈

    ```ts
    type A = Push<[1,2,3], 4> // [1,2,3,4]
    type B = Push<[1], 2> // [1, 2]
    type C = Push<[], string> // [string]
    ```

    **答案：**

    ```typescript
    type Push<T extends any[], I> = [...T, I]
    ```

20. **实现 IsAny\<T>**

    ```ts
    type A = IsAny<string> // false
    type B = IsAny<any> // true
    type C = IsAny<unknown> // false
    type D = IsAny<never> // false
    ```

    **答案：**

    按照any作为顶级类型理解，就是说any是任何类型的父类，`any` 类型可以赋值给除了 `never `之外的任意其他类型，但反过来不能把 `unknown` 赋值给除了 `any` 之外的任何其他类型，但其他类型都可以赋值给 `unknown`。

    ```typescript
    type IsAny<T> = [unknown] extends [T] ? ([T] extends [string | number | symbol | boolean] ? true : false) : false
    ```

    > **补：Any与Unknown的区别**
    >
    > unknow类型只是一个Top Type，而any既是一个Top Type也是一个Bottom Type。正因为如此编辑器才不会对any进行类型检查。
    >
    > 总的来说：使用unknow还能保持类型安全，使用any就默认放弃类型检查。所以any是一个危险的类型，它可以自由转换为其他类型，其他类型也可以自由转换为any类型，编译器不对该类型的实例进行类型检查。所以开发者有义务确保不会发生错误解释类型的情况。

    一行的解决方法：

    ```typescript
    type IsAny<T> = 0 extends 1&T ? true:false;
    ```

21. **实现 Shift\<T>**

    类似数组Shift操作，去除元组第一个元素

    ```ts
    type A = Shift<[1,2,3]> // [2,3]
    type B = Shift<[1]> // []
    type C = Shift<[]> // []
    ```

    **答案：**

    ```typescript
    type Shift<T extends any[]> = T extends [infer P, ...infer M] ? M : []
    ```

22. **实现 IsEmptyType\<T>**

    检查T是否为空对象，注意any视为非空

    ```ts
    type A = IsEmptyType<string> // false
    type B = IsEmptyType<{a: 3}> // false
    type C = IsEmptyType<{}> // true
    type D = IsEmptyType<any> // false
    type E = IsEmptyType<object> // false
    type F = IsEmptyType<Object> // false
    ```

    **答案：**

    ```typescript
    type IsEmptyType<T> = T extends Record<string,string> ? [keyof T] extends [never] ? true: false: false
    ```

    抑或是分别检测是否为简单非空对象和Any类型

    ```typescript
    type simpleObject = { [key: string]: string }
    type IsAny<T> = false extends (true & T) ? true : false; 
    type IsEmptyType<T> = IsAny<T> extends true ? false : {} extends T ? T extends simpleObject ? true : false :false 
    ```

23. **实现 Flat\<T>**

    即实现元组类型扁平化

    ```ts
    type A = Flat<[1,2,3]> // [1,2,3]
    type B = Flat<[1,[2,3], [4,[5,[6]]]]> // [1,2,3,4,5,6]
    type C = Flat<[]> // []
    ```

    **答案：**

    ```typescript
    type Flat<T extends any[]> = T extends [infer K, ...infer R] ? (K extends any[] ? [...Flat<K>,...Flat<R>] : [K,...Flat<R>]) : T
    ```

24. **实现 ReverseTuple\<T>**

    即实现对元组类型的翻转

    ```ts
    type A = ReverseTuple<[string, number, boolean]> // [boolean, number, string]
    type B = ReverseTuple<[1,2,3]> // [3,2,1]
    type C = ReverseTuple<[]> // []
    ```

    **答案：**

    ```typescript
    type ReverseTuple<T extends any[]> = 
      T extends [...infer L, infer R] ? [R, ...ReverseTuple<L>]: []
    ```

25. **实现 UnwrapPromise\<T>**

    即展开Promise，返回resolved后的类型

    ```ts
    type A = UnwrapPromise<Promise<string>> // string
    type B = UnwrapPromise<Promise<null>> // null
    type C = UnwrapPromise<null> // Error
    ```

    **答案：**

    ```typescript
    type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer P> ? P :never
    ```
