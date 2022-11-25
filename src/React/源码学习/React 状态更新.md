## React 状态更新

## 流程概览



## 类比分支管理的心智模型





在`React`中，通过`ReactDOM.createBlockingRoot`和`ReactDOM.createRoot`创建的应用会采用`并发`的方式`更新状态`。

`高优更新`（红色节点）中断正在进行中的`低优更新`（蓝色节点），先完成`render - commit流程`。

待`高优更新`完成后，`低优更新`基于`高优更新`的结果`重新更新`。



## Update 对象



### Update与Fiber的联系

`Fiber节点`组成`Fiber树`，页面中最多同时存在两棵`Fiber树`：

- 代表当前页面状态的`current Fiber树`
- 代表正在`render阶段`的`workInProgress Fiber树`

类似`Fiber节点`组成`Fiber树`，`Fiber节点`上的多个`Update`会组成链表并被包含在`fiber.updateQueue`中。

> 什么情况下一个Fiber节点会存在多个Update？
>
> 方法内部多次调用this.setState

`Fiber节点`最多同时存在两个`updateQueue`：

- `current fiber`保存的`updateQueue`即`current updateQueue`
- `workInProgress fiber`保存的`updateQueue`即`workInProgress updateQueue`

在`commit阶段`完成页面渲染后，`workInProgress Fiber树`变为`current Fiber树`，`workInProgress Fiber树`内`Fiber节点`的`updateQueue`就变成`current updateQueue`。

### updateQueue



