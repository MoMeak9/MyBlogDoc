---
date: 2022-05-12
category:
- React
---
# React 项目优化

## 打包体积分析

`本节目标:`   能够分析项目打包体积

**分析说明**通过分析打包体积，才能知道项目中的哪部分内容体积过大，才能知道如何来优化

**使用步骤**

1. 安装分析打包体积的包：`yarn add source-map-explorer`
2. 在 package.json 中的 scripts 标签中，添加分析打包体积的命令
3. 对项目打包：`yarn build`（如果已经打过包，可省略这一步）
4. 运行分析命令：`yarn analyze`
5. 通过浏览器打开的页面，分析图表中的包体积

**核心代码**：

package.json 中：

```json
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'",
}
```



## 优化-配置CDN

`本节目标:`  能够对第三方包使用CDN优化

**分析说明**：通过 craco 来修改 webpack 配置，从而实现 CDN 优化

**核心代码**

`craco.config.js`

```js
const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
module.exports = {
  // webpack 配置
  webpack: {
    // 配置CDN
    configure: (webpackConfig) => {
      let cdn = {
        js: [],
        css: []
      }
      // 只有生产环境才配置
      whenProd(() => {
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        cdn = {
          js: [
            'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
            'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
          ],
          css: []
        }
      })
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )
      if (isFound) {
        // 找到了HtmlWebpackPlugin的插件
        match.userOptions.cdn = cdn
      }
      return webpackConfig
    }
  }
}
```

`public/index.html `

```html
<body>
  <div id="root"></div>
  <!-- 加载第三发包的 CDN 链接 -->
  <% htmlWebpackPlugin.userOptions.cdn.js.forEach(cdnURL => { %>
    <script src="<%= cdnURL %>"></script>
  <% }) %>
</body>
```

 

## 优化-路由懒加载

`本节目标:`   能够对路由进行懒加载实现代码分隔

**使用步骤**

1. 在 App 组件中，导入 Suspense 组件
2. 在 路由Router 内部，使用 Suspense 组件包裹组件内容
3. 为 Suspense 组件提供 fallback 属性，指定 loading 占位内容
4. 导入 lazy 函数，并修改为懒加载方式导入路由组件

**代码实现**

`App.js`

```jsx
import { Routes, Route } from 'react-router-dom'
import { HistoryRouter, history } from './utils/history'
import { AuthRoute } from './components/AuthRoute'

// 导入必要组件
import { lazy, Suspense } from 'react'
// 按需导入路由组件
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App () {
  return (
    <HistoryRouter history={history}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200
            }}
          >
            loading...
          </div>
        }
      >
        <Routes>
          {/* 需要鉴权的路由 */}
          <Route path="/" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }>
            {/* 二级路由默认页面 */}
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          {/* 不需要鉴权的路由 */}
          <Route path='/login' element={<Login />} />
        </Routes>
      </Suspense>
    </HistoryRouter>
  )
}

export default App
```



**查看效果**

我们可以在打包之后，通过切换路由，监控network面板资源的请求情况，验证是否分隔成功

