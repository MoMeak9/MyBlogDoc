# NPM 源设置和管理方法

## 常见镜像源

#### 淘宝npm镜像

-   搜索地址：[](https://link.jianshu.com?t=http://npm.taobao.org/)[http://npm.taobao.org/](https://link.jianshu.com?t=http://npm.taobao.org/)
-   registry地址：[](https://link.jianshu.com?t=http://registry.npm.taobao.org/)[http://registry.npm.taobao.org/](https://link.jianshu.com?t=http://registry.npm.taobao.org/)

#### cnpmjs镜像

-   搜索地址：[](https://link.jianshu.com?t=http://cnpmjs.org/)[http://cnpmjs.org/](https://link.jianshu.com?t=http://cnpmjs.org/)
-   registry地址：[](https://link.jianshu.com?t=http://r.cnpmjs.org/)[http://r.cnpmjs.org/](https://link.jianshu.com?t=http://r.cnpmjs.org/)

## 源切换

### 临时使用

`npm install express --registry=https://registry.npm.taobao.org`

临时指定安装包的源，并将源地址作为参数传入

### 全局切换

**方式一：设置源地址并持久使用**

`npm config set registry https://registry.npm.taobao.org`

校验是否生效：

`npm config get registry`

**方式二：切换为cnpm**

`npm install -g cnpm --registry=https://registry.npm.taobao.org`

安装方式改为：

`cnpm install express`

校验cnpm源：

`cnpm config get registry `

### 还原

`npm config set registry=https://registry.npmjs.org`
