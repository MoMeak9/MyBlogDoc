---
date: 2022-08-16
category:
- React
---

# React 中使用 TypeScript

> 笔记总结自《TS全面进阶指南》

## 泛型坑位

### useState

**基本类型**

首先是 useState，可以由输入值隐式推导或者显式传入泛型：

```tsx
const Container = () => {
  // 推导为 string 类型
  const [state1, setState1] = useState('linbudu');
  // 此时类型为 string | undefined
  const [state2, setState2] = useState<string>();
};
```

需要注意的是在显式传入泛型时，如果像上面的例子一样没有提供初始值，那么 state2 的类型实际上会是 `string | undefined`，这是因为在 useState 声明中对是否提供初始值的两种情况做了区分重载

```ts
// 提供了默认值
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

// 没有提供默认值
function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
```

**空对象**

```typescript
const [data, setData] = useState<IData>({} as IData);
```

这么做的坏处在于，后续的调用方中会认为这是一个完整实现了 IData 结构的对象，可能会出现遗漏的未赋值属性，此时你也可以使用 Partial 类型标记它为可选：

```typescript
const [data, setData] = useState<Partial<IData>>({});
```

如果你需要消费 useState 返回值的类型，可以搭配 ReturnType：

```typescript
// 相当于 useState(0) 的返回值类型
type State = ReturnType<typeof useState<number>>;
```

### useCallback 与 useMemo

然后是 useCallback 与 useMemo，它们的泛型参数分别表示包裹的函数和计算产物，使用方式类似，也分为**隐式推导**与**显式提供**两种：

```ts
const Container = () => {
  // 泛型推导为 (input: number) => boolean
  const handler1 = useCallback((input: number) => {
    return input > 599;
  }, []);

  // 显式提供为 (input: number, compare: boolean) => boolean
  const handler2 = useCallback<(input: number, compare: boolean) => boolean>(
    (input: number) => {
      return input > 599;
    },
    []
  );
  
  // 推导为 string
  const result1 = useMemo(() => {
    return 'some-expensive-process';
  }, []);

  // 显式提供
  const result2 = useMemo<{ name?: string }>(() => {
    return {};
  }, []);
};
```

通常情况下，我们不会主动为 useCallback 提供泛型参数，因为其传入的函数往往已经确定。而为 useMemo 提供泛型参数则要常见一些，因为我们可能希望通过这种方式来约束 useMemo 最后的返回值。

### [useReducer](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)

useReducer 可以被视为更复杂一些的 useState，它们关注的都是数据的变化。不同的是 useReducer 中只能由 reducer 按照特定的 action 来修改数据，但 useState 则可以随意修改。useReducer 有三个泛型坑位，分别为 reducer 函数的类型签名、数据的结构以及初始值的计算函数，我们直接看实际使用即可：

```tsx
import { useReducer } from 'react';

const initialState = { count: 0 };

type Actions =
  | {
      type: 'inc';
      payload: {
        count: number;
        max?: number;
      };
    }
  | {
      type: 'dec';
      payload: {
        count: number;
        min?: number;
      };
    };

function reducer(state: typeof initialState, action: Actions) {
  switch (action.type) {
    case 'inc':
      return {
        count: action.payload.max
          ? Math.min(state.count + action.payload.count, action.payload.max)
          : state.count + action.payload.count,
      };
    case 'dec':
      return {
        count: action.payload.min
          ? Math.max(state.count + action.payload.count, action.payload.min)
          : state.count - action.payload.count,
      };
    default:
      throw new Error('Unexpected Action Received.');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      Count: {state.count}
      <button
        onClick={() =>
          dispatch({ type: 'dec', payload: { count: 599, min: 0 } })
        }
      >
        -(min: 0)
      </button>
      <button
        onClick={() =>
          dispatch({
            type: 'inc',
            payload: {
              count: 599,
              max: 599,
            },
          })
        }
      >
        +(max: 599)
      </button>
    </>
  );
}
```

在上面的例子中，useReducer 的泛型参数分别被填充为 reducer 函数的类型签名，以及其初始状态。

```ts
type Reducer<S, A> = (prevState: S, action: A) => S;
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;

function useReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
```

R 被填充为了一整个函数类型，而 `ReducerState<R>` 实际上就是提取了 reducer 中代表 state 的参数，即状态的类型，在这里即是 `{ count: number }` 这么一个结构。

需要注意的是，在 reducer 中其实也应用了我们此前提到过的**可辨识联合类型概念**，这里的 `action.type` 即为可辨识属性，通过 type 判断，我们就能在每一个 case 语句中获得联合类型对应分支的类型。

### useRef 与 [useImperativeHandle](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle)

useRef 的常见使用场景主要包括两种，存储一个 DOM 元素引用和持久化保存一个值。这两者情况对应的类型其实也是不同的：

```tsx
const Container = () => {
  const domRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<number>(599);

  const operateRef = () => {
    domRef.current?.getBoundingClientRect();
    valueRef.current += 1;
  };

  return (
    <div ref={domRef}>
      <p>林总</p>
    </div>
  );
};
```

对于 domRef，此时其类型（current）会被推断为 `RefObject<HTMLDivElement>`，而 valueRef 的值类型则为 `MutableRefObject<number>`，这是完全符合预期的。因为我们并不会去修改挂载了 DOM 引用的 ref，而确实会修改值引用的 ref ，所以后者会是 Mutable 的。

从 useRef 的类型定义可以看出，对于初始值为 null 的 useRef，其类型均会被推导为 RefObject

```ts
function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T | null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
```

useImperativeHandle 并非常用的 hook，常与[`React.forwardRef`](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref) 共同使用

## 内置类型定义

### **MouseEvent、ChangeEvent**

除了上面介绍的泛型坑位以外，在 React 中想要用好 TypeScript 的另一个关键因素就是使用 `@types/react` 提供的类型定义，最常见的就是事件类型，比如输入框值变化时的 ChangeEvent 和鼠标事件通用的 MouseEvent：

```ts
import { useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';

const Container = () => {
  const [v, setV] = useState('linbudu');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {};

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <input value={v} onChange={handleChange} />
      <button onClick={handleClick}>Click me!</button>
    </>
  );
};
```

ChangeEvent 和 MouseEvent 上还具有一个泛型坑位，用于指定发生此事件的元素类型，我们可以在这里进一步传入 **HTMLButtonElement** 这样更精确的元素类型获得更严格的类型检查。

### **ChangeEventHandler**

除了使用 ChangeEvent 作为参数类型，React 还提供了整个函数的类型签名，如 ChangeEventHandler：

```typescript
const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {};
```

由于上下文类型的存在，此时就无需再为 e 声明类型了，它会自动被推导为 `ChangeEvent<HTMLInputElement>` 。

类似的事件定义还有非常多，如 FormEvent、TouchEvent、DragEvent 等，但无需对所有定义都了解，在实际用到时再去导入即可。需要注意的是，由于 InputEvent [并非在所有浏览器都得到了支持](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FInputEvent)，因此并不存在对应的类型定义，你可以使用 KeyboardEvent 来代替。

### **CSSProperties**

CSS样式属性

```tsx
import type { CSSProperties } from 'react';

export interface IContainerProps {
  style: CSSProperties;
}

const css: CSSProperties = {
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
};

const Container = ({ style }: IContainerProps) => {
  return <p style={style}>林总！</p>;
};
```

#### ComponentProps

基于原生 HTML 元素去封装组件时，通常会需要将这个原生元素的所有 HTML 属性都保留下来作为组件的属性，可以使用 ComponentProps 来提取出一个元素上所有的属性，避免一个个重复声明：

```typescript
import type { ComponentProps } from 'react';

interface IButtonProps extends ComponentProps<'button'> {
  size?: 'small' | 'large';
  link?: boolean;
}
const Button = (props: IButtonProps) => {
  return <button {...props} >{props.children}</button>;
};
```

除了对原生 DOM 元素使用以外，这一用法在使用组件库时也有奇效，比如组件库只导出了这个组件而没有导出这个组件的属性类型定义，而我们又需要基于这个组件进行定制封装，此时就可以使用 ComponentProps 去提取它的属性类型：

```typescript
import { Button } from "ui-lib";
import type { ComponentProps } from 'react';

interface IButtonProps extends ComponentProps<Button> {
  display: boolean;
}
const EnhancedButton = (props: IButtonProps) => {
  return <Button {...props} >{props.children}</Button>;
};
```

> 由于 React 中 ref 的存在，有些时候我们会希望区分组件使用 ref 和没使用 ref 的情况，此时可以使用内置类型 ComponentPropsWithRef 或 ComponentPropsWithoutRef ，其使用方式与 ComponentProps 一致。

#### ReactElement 与 ReactNode

ReactElement 是 createElement、cloneElement 等 factory 方法的返回值类型，它本质上指的是一个有效的 JSX 元素，即 `JSX.Element`。而 ReactNode 可以认为包含了 ReactElement ，它还包含 null、undefined 以及 ReactFragment 等一些特殊的部分，其类型定义如下：

```ts
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```

## 项目中的类型声明文件划分

在实际应用中使用 TypeScript 进行开发时，我们往往需要大量的类型代码，而如何存放这些类型代码，其实就需要预先有一个明确的规范。目前我使用的方式是，在项目中使用一个专门的文件夹存放类型代码，其中又按照这些类型的作用进行了划分，其分布大致是这样的：

```text
PROJECT
├── src
│   ├── types
│   │   ├── shared.ts
│   │   ├── [biz].ts
│   │   ├── request.ts
│   │   ├── tool.ts
│   ├── typings.d.ts
└── tsconfig.json
```

我们来依次讲解下这些类型声明文件的作用：

- `shared.ts`，被其他类型定义所使用的类型，如简单的联合类型封装、简单的结构工具类型等。

- `[biz].ts`，与业务逻辑对应的类型定义，比如 `user.ts` `module.ts` 等，推荐的方式是在中大型项目中尽可能按照业务模型来进行细粒度的拆分。

- `request.ts`，请求相关的类型定义，推荐的方式是定义响应结构体，然后使用 biz 中的业务逻辑类型定义进行填充：

  ```typescript
  import type { Status } from "./shared";
  
  export interface IRequestStruct<TData = never> {
      status: Status;
      code: number;
      data: TData;
  }
  
  export interface IPaginationRequestStruct<TData = never> {
      status: Status;
      curPage: number;
      totalCount: number;
      hasNextPage: boolean;
      data: TData[];
  }
  ```

  实际使用时：

  ```typescript
  import type { IPaginationRequestStruct } from "@/types/request";
  import type { IUserProfile } from "@/types/user";
  
  export function fetchUserList: Promise<IPaginationRequestStruct<IUserProfile>> {}
  ```

  通过这种方式，你的类型代定义之间就能够建立起清晰的、和业务逻辑一致的引用关系。

- `tool.ts`，工具类型定义，一般是推荐把比较通用的工具类型抽离到专门的工具类型库中，这里只存放使用场景特殊的部分。

- `typings.d.ts`，全局的类型声明，包括非代码文件的导入、无类型 npm 包的类型声明、全局变量的类型定义等等，你也可以进一步拆分为 `env.d.ts` `runtime.d.ts` `module.d.ts` 等数个各司其职的声明文件。

在实际场景中，这一规范的粒度并不一定能够满足你的需要，但你仍然可以按照这一思路进行类型定义的梳理和妥善放置。另外，我们并不需要将所有的类型定义都专门放到这个文件夹里，比如仅被组件自身消费的类型就应该使用就近原则，直接和组件代码一起即可。

## 组件与组件类型

在 React 父子组件中一个常见的场景是，父组件导入各个子组件，传递属性时会进行额外的数据处理，其结果的类型被这多个子组件共享，而这个类型又仅被父子组件消费，不应当放在全局的类型定义中，而将这个类型定义在父组件中，子组件使用仅类型导入去导入这个类型。

```tsx
// Parent.tsx

import { ChildA } from "./ChildA";
import { ChildB } from "./ChildB";
import { ChildC } from "./ChildC";

//  被多个子组件消费的类型
export interface ISpecialDataStruct {}

const Parent = () => {
  const data: ISpecialDataStruct = {};

  return (
    <>
    <ChildA inputA={data} />
    <ChildB inputB={data} />
    <ChildC inputC={data} />
    </>
  )
}

// ChildA.tsx
import type { ISpecialDataStruct } from "./parent";

interface IAProp {
  inputA: ISpecialDataStruct;
}

export const ChildA: FC<IAProp> = (props) => {
  // ...
}
```

