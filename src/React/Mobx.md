# Mobx

## 简介

<img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501165700622.png" alt="image-20220501165700622" style="zoom:25%;" />

一个可以和React良好配合的集中状态管理工具，

mobx和react的关系，相当于vuex和vue

同类工具还有：

   1. redux

   2. dva

   3. recoil

 ### 优势

1. 简单

     编写无模板的极简代码来精准描述你的意图（原生js）

2. 轻松实现最优渲染

     依赖自动追踪最小渲染优化

3. 架构自由

     可移植，可测试

## 环境搭建

### 配置说明

Mobx是一个独立的响应式的库，可以独立于任何UI框架而存在，但是通常人们把它和React
来绑定使使用，用Mobx来做响应式数据建模，React作为UI视图框架渲染内容

所以配置方面我们需要三个部分：


1.  一个通过create-react-app 创建好的react项目环境
2.  mobx本身
3.  一个链接mobx和react的中间部件

### 如何配置

1. 使用 create-react-app初始化react项目

   ![image-20220501165845564](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501165845564.png)

2. 安装mobx和mobx-react-lite

   ![image-20220501165859457](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501165859457.png)

## 第一个store

需求：使用Mobx实现计数器案例，mobx负责计数逻辑，react负责渲染和事件触发

<img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501165935639.png" alt="image-20220501165935639" style="zoom: 67%;" />

### 初始化mobx

实现步骤


1. 定义数据状态（state）
2. 数据响应式处理
3. 定义action函数  （修改数据）
4. 实例化并导出实例

![image-20220501170023292](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501170023292.png)

### 连接react

实现步骤


1. 导入store实例
2. 使用store中的数据
3. 修改store中的数据
4. 让组件视图响应数据变化

![image-20220501170325716](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501170325716.png)

## computed

**概念：**基于现有的数据做计算得到新的数据，并且可以在依赖的数据发生变化时立刻进行计算（与Vue同理）

![image-20220501170441549](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501170441549.png)

实现步骤


1. 声明一个存在的数据
2. 定义get 计算属性 ( 定义计算公式 )
3. 在makeAutoObservable方法中标记

![image-20220501173035448](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501173035448.png)

## 模块化

一个项目有很多业务模块，我们不能把所有的代码都写到一起，这样很难维护，为了提供可维护性，需要引入模块化

<img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501173146255.png" alt="image-20220501173146255"  />

### 怎么做？

![image-20220501174752747](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501174752747.png)

1. 拆分Count和List模块，每个模块定义自己独立的state/actions
2. 在store/index.js中导入拆分之后的模块，进行模块组合
3. 使用React的 useContext机制导出统一的useStore方法，供业务组件使用

![image-20220501174855195](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501174855195.png)

### 总结

**1. 初始化mobx的过程是怎样的 ？**

声明数据 -> 响应式处理 -> 定义action函数 -> 实例化导出

**2. mobx如何配合react, 需要依赖什么包 ？**

mobx-react-lite作为链接包，导出observer方法，包裹组件（只能和函数组件配合）

**3. 模块化解决了什么问题 ？**

维护性问题

**4. 如何实现mobx的模块化 ？**

按照功能拆分store模块，根模块中组合子模块，利用context机制依赖注入

## 职责划分

![image-20220501175110210](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501175110210.png)
