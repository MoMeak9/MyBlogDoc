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

22. **实现 Trim\<T>**

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

23. **实现 Equal\<A, B>**

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

24. **实现 FindIndex\<T, E>**

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

25. **实现 UnionToIntersection\<T>**

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

26. **实现 ToNumber\<T>**
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

27. **实现 Add<A, B>**
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

28. **实现 SmallerThan<A, B>**

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

29. **实现 LargerThan<A, B>**

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

30. **实现 Filter\<T, A>**

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

31. **实现 Repeat\<T, C>**

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

32. **实现 TupleToString\<T>**

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

33. **实现 RepeatString<T, C>**
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

34. **实现 Push\<T, I>**
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

35. **实现 IsAny\<T>**

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

    > **any与unknown的区别**
    > unknow类型只是一个Top Type，而any既是一个Top Type也是一个Bottom Type。正因为如此编辑器才不会对any进行类型检查。
    >
    > 总的来说：使用unknow还能保持类型安全，使用any就默认放弃类型检查。所以any是一个危险的类型，它可以自由转换为其他类型，其他类型也可以自由转换为any类型，编译器不对该类型的实例进行类型检查。所以开发者有义务确保不会发生错误解释类型的情况。

    一行解决方法：

    ```typescript
    type IsAny<T> = 0 extends 1&T ? true:false;
    ```

36. **实现 Shift\<T>**
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

37. **实现 IsEmptyType\<T>**
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

38. **实现 Flat\<T>**
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

39. **实现 ReverseTuple\<T>**
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

40. **实现 UnwrapPromise\<T>**

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

41. **实现 LengthOfString\<T>**

    实现`LengthOfString<T>`用以返回字符串长度。

    ```ts
    type A = LengthOfString<'BFE.dev'> // 7
    type B = LengthOfString<''> // 0
    ```

    **答案：**

    1. 转为元组后直接访问泛型的.length属性

       ```ts
       type StringToTuple<T extends string> = T extends `${infer L}${infer R}` ? [L, ...StringToTuple<R>] : [];
       type LengthOfString<T extends string> = StringToTuple<T>['length'];
       ```

    2. 辅助数组统计长度

       ```typescript
       type LengthOfString<
         T extends string,
         U extends 0[] = []
       > = T extends `${infer A}${infer B}`
         ? LengthOfString<B, [0, ...U]>
         : U["length"];
       ```

42. **实现 LengthOfTuple\<T>**
    实现`LengthOfTuple<T>`返回tuple type的长度。

    ```ts
    type A = LengthOfTuple<['B', 'F', 'E']> // 3
    type B = LengthOfTuple<[]> // 0
    ```

    **答案：**

    直接访问泛型的.length属性

    ```typescript
    type LengthOfTuple<T extends any[]> = T["length"]
    ```

43. **实现 StringToTuple\<T>**
    实现`StringToTuple<T>`将字符串拆散为tuple，类似`String.prototype.split('')`效果
    
    ```ts
    type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
    type B = StringToTuple<''> // []
    ```
    
    **答案：**
    
    ```typescript
    type StringToTuple<T extends string> = T extends `${infer A}${infer B}` ? [A, ...StringToTuple<B>] : []
    ```
    
44. **实现 LastItem\<T>**

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

    ```typescript
    type LastItem<T extends any[]> = T extends [...any[], infer M] ? M : never;
    ```

## 45-60 有挑战性的

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


53. **实现Split\<S, D>**

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

57. **实现Divide\<A, B>**

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


58. **实现Multiply\<A, B>**

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

59. **实现Subtract\<A, B>**

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

60. **实现Slice\<A, S, E>**

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
