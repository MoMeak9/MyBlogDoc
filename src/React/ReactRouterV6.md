# ReactRouterV6

## 基础使用

基于项目模板安装react-router-dom

` yarn add react-router-dom@6`

## 核心组件

### BrowerRouter

**作用：**包裹整个应用，一个 React 应用只需要使用一次

**两种常用 Router** **:**  HashRouter 和 BrowserRouter

**HashRouter**

使用 URL 的哈希值实现（http://localhost:3000/#/first）

**BrowserRouter** **(** **推荐** **)**

使用 H5 的 history.pushState API 实现（http://localhost:3000/first）

### Link

**作用** **：**用于指定导航链接，完成路由跳转

**语法说明：** 组件通过to属性指定路由地址，最终会渲染为a链接元素

```jsx
<Link to = "/path">   </Link>
```

### Routes

**作用** **：**提供一个路由出口，满足条件的路由组件会渲染到组件内部，定义path和组件的对应关系。用于指定导航链接，完成路由匹配

**语法说明：** path属性指定匹配的路径地址，element属性指定要渲染的组件。

```jsx
<Route path="/about" element={<About/>}/>
```

**说明：**当url路径为 ‘/about’ 时，会渲染` <About/> `组件

## 编程式导航

### 跳转

**作用** **：**通过js编程的方式进行路由页面跳转，比如从登录页跳转到关于页

**语法说明：**

1. 导入useNavigate钩子函数


2. 执行钩子函数得到跳转函数


3. 执行跳转函数完成跳转

![image-20220501164235089](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501164235089.png)

 **注意**：如果在跳转时不想加历史记录，可以添加额外参数replace为true

### 跳转携带参数

**场景** **：**有些时候不光需要跳转路由还需要传递参数

**俩种方式：**

1. searchParams传参

   传参：

   ![image-20220501163904592](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501163904592.png)

   取参：

   ![image-20220501163925464](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501163925464.png)

2. params传参（path配合：/：id）

   传参：

   ![image-20220501163948813](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501163948813.png)

   取参：

   ![image-20220501164004751](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501164004751.png)

## 嵌套路由

### 代码实现

1. App.js: 定义嵌套路由声明

   ![image-20220501164359039](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501164359039.png)

2. Layout.js: 使用 `<Outlet />`指定二级路由出口

   ![image-20220501164447292](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501164447292.png)

### 默认二级路由

**场景：** 应用首次渲染完毕就需要显示的二级路由

**怎么做：** 1. 给默认路由标记index  2. 修改跳转路径path

![image-20220501164516536](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501164516536.png)

## 404页配置

**场景：**当所有的路径都没有匹配的时候显示

**语法说明：** 在各级路由的最后添加 * 号路由 作为兜底

![image-20220501164630342](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220501164630342.png)
