---
date: 2022-07-15
category:
- 前端
tag:
- uni-app
---

# 编程式路由

### `router.push() 等同于` [uni.navigateTo()](https://uniapp.dcloud.io/api/router?id=navigateto)

**注意：在 Vue 实例内部，你可以通过 $Router 访问路由实例。因此你可以调用 this.$Router.push。**

想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如:

```js
// 字符串
this.$Router.push('/pages/router/router1')

// 对象
this.$Router.push({path:'/pages/router/router1'})

// 命名的路由
this.$Router.push({ name: 'router1', params: { userId: '123' }})

// 带查询参数，变成 /router1?plan=private
this.$Router.push({ path: 'router1', query: { plan: 'private' }})
```

<u>**注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。所以字符串时必须是绝对的路径，name 时传递的参数必须为 params，相反 path 必须对应 query。**</u>

### `router.replace() 等同于` [uni.redirectTo()](https://uniapp.dcloud.io/api/router?id=redirectto)

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

### `router.replaceAll() 等同于` [uni.reLaunch()](https://uniapp.dcloud.io/api/router?id=redirectto)

跟 `router.replace` 很像，唯一的不同就是，它不会向 history 添加新记录，而是将所有的页面都关掉，打开一个新的页面。

### `router.pushTab() 等同于` [uni.switchTab()](https://uniapp.dcloud.io/api/router?id=switchtab)

跟 `router.push` 很像，打开 `uni-app` 自带的tab 菜单

### `router.back(n,{...}) 等同于` [uni.navigateBack()](https://uniapp.dcloud.io/api/router?id=navigateback)

这个方法的参数是一个正整数，意思是在 history 记录中后退多少步，类似 `window.history.go(n)`。

# 路由传参

##  非深度对象传递

```js
this.$Router.push({ path: '/pages/router1/router1', query: { userId: '123' }})

// 获取方式
this.$Route.query.userId;

// URL 表现
//http://xxxx/router1?userId=123
```

##  深度对象传递

```js
this.$Router.push({
    path:'/pages/404/404',
    query:{
        status:true,
        list:[
            {
                id:1
            },
        ]
    }
})
// 获取方式
this.$Route.query;

//URL 表现
http://xxxx/pages/404/404?query=%7B"status"%3Atrue,"list"%3A%5B%7B"id"%3A1%7D%5D%7D
```

## name 普通传参

```js
this.$Router.push({ name: 'router1', params: { userId: '123' }})

// 获取方式
this.$Route.query.userId;

// H5 URL 表现
//http://xxxx/router1

// 其他端 URL 表现
//http://xxxx/router1?userId=123
```

H5端默认情况下 `name+params` 传参不会显示在URL上，如果你想将 `name+params` 传参显示在URL上，请配置 `paramsToQuery:true`。[详细请查看配置](https://hhyang.cn/v2/api/routerInsatll.html#h5)，注意：**如果配置了paramsToQuery:true，那么将不支持动态路由传参**



##  name 动态传参

```js
// routes
{
    "path": "pages/page2/page2",
    "aliasPath": "/page2/:id",
    "name": "page2"
}

this.$Router.push({ name: 'page2', params: { id: '123' }})

// 获取方式
this.$Route.query.id;

// H5 URL 表现
//http://xxxx/page2/123

// 其他端 URL 表现
//http://xxxx/pages/page2/page2?id=123
```

