> 原文：[This Pattern Will Wreck Your React App's TS Performance | Total TypeScript](https://www.totaltypescript.com/react-apps-ts-performance)
> 
> 原标题：This Pattern Will Wreck Your React App's TS Performance
>
> 作者：Matt Pocock

几年前，Sentry 在他们的 React 应用程序上遇到了大问题。他们不久前刚刚[将其迁移到 TypeScript](https://blog.sentry.io/slow-and-steady-converting-sentrys-entire-frontend-to-typescript)。并且这个应用是一个大型单体仓库的一部分。

但IDE性能很慢。进行更改后，通常需要等待几秒钟才能更新 TypeScript 语言服务器。并且运行 `tsc` 需要很长时间。

现在，对于一个大型 TypeScript 代码库来说，这并不罕见。但是 Sentry 团队有种预感，觉得有些不对劲。问题与代码库的大小不成比例。

结果表明，问题，如 [Jonas](https://twitter.com/JonasBadalic/status/1765006152150974919) 所概述的，归咎于单一模式 `single pattern`。

## 如何拖垮你的 React 应用的 TS 性能

在 Sentry 的代码库的许多地方，他们都在扩展 React 中的 HTML 类型。例如，定义 `ButtonProps` 将如下所示：

```tsx
import React from "react";
 
type ButtonProps =
  React.HTMLAttributes<HTMLButtonElement> & {
    extraProp: string;
  };
 
const Button = ({ extraProp, ...props }: ButtonProps) => {
  console.log(extraProp);
  return <button {...props} />;
};
```

这意味着你可以传入所有 `<button>` 元素可以接受的 props，再加上一个 `extraProp`：

```tsx
<Button
  extraProp="whatever"
  onClick={(e) => {
  // (parameter) e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  }}
/>;
```

但事实证明，这种模式极其缓慢。因此，Jonas 按照 [TypeScript Performance Wiki](https://github.com/microsoft/TypeScript/wiki/Performance) 的建议，将其中的每一个更改为使用 `interface`：

> **TypeScript 性能 Wiki：**
>
> 大多数时候，对象类型的简单类型别名的作用与接口非常相似。
>
> 但是，一旦你需要组合两个或多个类型，你就可以选择使用接口扩展这些类型，或者在类型别名中将它们相交，此时差异就开始变得重要了。
>
> 另一方面，交集只是递归地合并属性，并且在某些情况下会产生`never`接口创建一个单一的平面对象类型来检测属性冲突，这通常对于解决很重要！ 。 界面也始终显示得更好，而交叉点的类型别名无法显示在其他交叉点的部分中。 接口之间的类型关系也被缓存，而不是作为一个整体的交集类型。 最后一个值得注意的区别是，在检查目标交叉点类型时，在检查“有效”/“扁平”类型之前先检查每个成分。
>
> 因此，建议使用 `interface`s/`extends` 来扩展类型，而不是创建交集类型。
>
> ```ts
> - type Foo = Bar & Baz & {
> -     someProp: string;
> - }
> + interface Foo extends Bar, Baz {
> +     someProp: string;
> + }
> ```

```tsx
import React from "react";
 
interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  extraProp: string;
}
```

突然间，事情变得更加迅速了。TypeScript 语言服务器更快了，`tsc` 运行也更快了。仅仅是一点语法的改变。为什么呢？

## 为什么会发生这种情况？

你可能听说过 `interface` 比 `type` 稍微快那么一点。这其实并不完全正确。事实上，`interface extends` 稍微比 `&` 快一些。

在本文的早期版本中，我发布了基于一些模糊思维的解释，这要感谢我的老同事[Mateusz Burzyński](https://twitter.com/AndaristRake)，我现在明白是错误的。

问题比我意识到的要复杂 —— 查看[此帖子](https://twitter.com/AndaristRake/status/1770743549325115459)了解他的批评和我们的调查。

希望我可以再次更新这篇文章，明确说明为什么会发生这种情况 - 但就 TypeScript 性能而言，一切都不容易。

可以说 - `interface extends` 通常比 `&` 更快，因此在本例中也得到了证明。