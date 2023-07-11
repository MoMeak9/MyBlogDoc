---
date: 2022-12-04
category:
- TypeScript
---

# BFE-TS  TypeScript类型体操练习 Easy 1-10

题目来自[TypeScript题目 | BFE.dev - 前端刷题，准备前端面试拿到心仪的Offer](https://bigfrontend.dev/zh/typescript)，总共60题，带你完爆类型体操！

## Utility types 内置工具类型实现

1.  **实现Partial**

    `Partial<T>`返回一个包含所有`T`的子集的type。

    ```ts
    type Foo = {
      a: string
      b: number
      c: boolean
    }
    ​
    // below are all valid
    ​
    const a: MyPartial<Foo> = {}
    ​
    const b: MyPartial<Foo> = {
      a: 'BFE.dev'
    }
    ​
    const c: MyPartial<Foo> = {
      b: 123
    }
    ​
    const d: MyPartial<Foo> = {
      b: 123,
      c: true
    }
    ​
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

0.  **实现Required**

    和`Partial<T>`正好相反， `Required<T>`会将所有的属性设为required。

    ```ts
    // all properties are optional
    type Foo = {
      a?: string
      b?: number
      c?: boolean
    }
    ​
    ​
    const a: MyRequired<Foo> = {}
    // Error
    ​
    const b: MyRequired<Foo> = {
      a: 'BFE.dev'
    }
    // Error
    ​
    const c: MyRequired<Foo> = {
      b: 123
    }
    // Error
    ​
    const d: MyRequired<Foo> = {
      b: 123,
      c: true
    }
    // Error
    ​
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

0.  **实现Readonly**

    **答案：**

    ```ts
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    };
    ```

0.  **实现Record**

    `Record<K, V>`返回一个key是K值是V的object type。

    ```ts
    type Key = 'a' | 'b' | 'c'
    ​
    const a: Record<Key, string> = {
      a: 'BFE.dev',
      b: 'BFE.dev',
      c: 'BFE.dev'
    }
    a.a = 'bigfrontend.dev' // OK
    a.b = 123 // Error
    a.d = 'BFE.dev' // Error
    ​
    type Foo = MyRecord<{a: string}, string> // Error
    ```

    **答案：**

    ```ts
    type Record<K extends keyof any, T> = {
        [P in K]: T;
    };
    ```

0.  **实现Pick**

    `Pick<T, K>`，正如其名所示，将从T中抽选出K中含有的属性然后返回一个新的type。

    ```ts
    type Foo = {
      a: string
      b: number
      c: boolean
    }
    ​
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

0.  **实现Omit**

    `Omit<T, K>`返回一个从T的属性中剔除掉K过后的type。

    ```ts
    type Foo = {
      a: string
      b: number
      c: boolean
    }
    ​
    type A = MyOmit<Foo, 'a' | 'b'> // {c: boolean}
    type B = MyOmit<Foo, 'c'> // {a: string, b: number}
    type C = MyOmit<Foo, 'c' | 'd'> // {a: string, b: number}
    ```

    **答案：**

    ```ts
    type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
    ```

0.  **实现Exclude**

    `Exclude<T, K>`返回一个从T中去掉能代入K的成员后的type。

    ```ts
    type Foo = 'a' | 'b' | 'c'
    ​
    type A = MyExclude<Foo, 'a'> // 'b' | 'c'
    type B = MyExclude<Foo, 'c'> // 'a' | 'b
    type C = MyExclude<Foo, 'c' | 'd'>  // 'a' | 'b'
    type D = MyExclude<Foo, 'a' | 'b' | 'c'>  // never
    ```

    **答案：**

    ```ts
    type Exclude<T, U> = T extends U ? never : T;
    ```

0.  **实现Extract**

    和Exclude正好相反， `Extract<T, U>`返回T中可以代入到U的成员所组成的type。

    ```ts
    type Foo = 'a' | 'b' | 'c'
    ​
    type A = MyExtract<Foo, 'a'> // 'a'
    type B = MyExtract<Foo, 'a' | 'b'> // 'a' | 'b'
    type C = MyExtract<Foo, 'b' | 'c' | 'd' | 'e'>  // 'b' | 'c'
    type D = MyExtract<Foo, never>  // never
    ```

    **答案：**

    ```ts
    type Extract<T, U> = T extends U ? T : never;
    ```

0.  **实现NonNullable**

    剔除 null | undefined 类型，表明非空

    **答案：**

    ```ts
    type NonNullable<T> = T extends null | undefined ? never : T;
    ```

0.  **实现Parameters**

    对于function type T， `Parameters<T>` 返回一个由其参数type组成的tuple type。

    ```ts
    type Foo = (a: string, b: number, c: boolean) => string
    ​
    type A = MyParameters<Foo> // [a:string, b: number, c:boolean]
    type B = A[0] // string
    type C = MyParameters<{a: string}> // Error
    ```

    **答案：**

    ```ts
    type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
    ```
