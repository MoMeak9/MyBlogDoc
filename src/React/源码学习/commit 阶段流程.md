# commit 阶段流程

## 概览

- 副作用
- commit阶段工作

这些`副作用`对应的`DOM操作`在`commit`阶段执行。



除此之外，一些生命周期钩子（比如`componentDidXXX`）、`hook`（比如`useEffect`）需要在`commit`阶段执行。

`commit`阶段的主要工作（即`Renderer`的工作流程）分为三部分：

- before mutation阶段（执行`DOM`操作前）
- mutation阶段（执行`DOM`操作）
- layout阶段（执行`DOM`操作后）



在`before mutation阶段`之前和`layout阶段`之后还有一些额外工作，涉及到比如`useEffect`的触发、`优先级相关`的重置、`ref`的绑定/解绑。



## before mutation阶段



## mutation阶段



## layout阶段

