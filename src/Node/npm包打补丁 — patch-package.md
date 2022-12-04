# npm包打补丁 — patch-package

## 背景

在开发过程中（尤其是基于第三方平台）遇到 npm 包与当前环境有兼容性问题时，需要改动 npm 包内文件。一种方法是将需要改动的文件复制出来一份放在项目中引用或者每次手动替换；但这也太不 intelligent 了，所以我采用了 patch-package 添加补丁的方式。 （npm >=5 或者 yarn）

# 二、给npm包打补丁

## 1. 安装，yarn add patch-package -D/-g

```js
// 官方推荐同时安装 postinstall-postinstall
yarn add patch-package postinstall-postinstall
```

[为什么使用postinstall-postinstall（官方说明）](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpatch-package%23why-use-postinstall-postinstall-with-yarn)。

**简单来说就是在使用 yarn/yarn add 等命令时补丁一定会生效，使用 yarn remove 时不一定生效，postinstall-postinstall 就是用来解决这个问题的。** 下面举个例子，现在有 packageA 的 npm包，此时修改了 packageA。

- a. 没有 postinstall-postinstall 时，运行 yarn/yarn add 会自动运行补丁；运行 yarn remove **except**PackageA 补丁不生效。
- b. 有 postinstall-postinstall 时，运行 yarn/yarn add/yarn remove **except**PackageA  都会自动打补丁。

## 2.修改npm包

为了避免 v4.15.3 版本之前的其他组件存在未知bug，本次补丁我们基于 4.15.3 版本给 upload 组件打补丁。

打开目标项目代码 `node_modules` 文件夹，确认是4.15.3版本

![image.png](https://my-doc-1259409954.file.myqcloud.com/MyImages/6b31001de25e4ebf98d3b4465dc2cdbd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

打开一个不用的工程，安装 v4.9.4 版本并同样打开antd目录

![image.png](https://my-doc-1259409954.file.myqcloud.com/MyImages/4611557cd5a446b2a22996db7c1e6a2e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

使用复制大法将我们要修改的upload组件代码从 4.9.4 copy到 4.15.3 ，然后 `npm run dev`启动项目，测试upload组件的bug是否被修复。

## 3.生成补丁

经验证效果符合预期，此时`cd`到根木录下，执行如下命令生成补丁文件：

```shell
npx patch-package antd
复制代码
```

此时在根目录下会得到如下文件

![image.png](https://my-doc-1259409954.file.myqcloud.com/MyImages/d4f4b67bab2c4ff280869479886fea61~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

很好奇`.patch`文件是个什么东东，打开文件一目了然，其实就是一些`git diff`记录描述，补丁原理呼之欲出 —— `patch-package`会将当前`node_modules`下的源码与原始源码进行`git diff`，并在项目根目录下生成一个`patch`补丁文件。

![image.png](https://my-doc-1259409954.file.myqcloud.com/MyImages/c3ca74bc47884af29d82b51201823ad1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 4.加入版本管理

至此补丁文件已经生成完毕，我们需要将它提交到`git`中，直接执行常规git操作即可：

```Shell
git add patches/antd+4.15.3.patch

git commit -m "feat:添加antd补丁"

git push
```

## 5.完善npm脚本

当其他同事拉到代码如何应用补丁呢？基于上述操作我们在`npm install`后执行`patch-package`命令即可，这个流程可借助`npm script`实现，在`package.json`的`script`中添加如下字段及内容：

```json
{
    "postinstall":"patch-package"
}
```

执行一次完成的「依赖安装 -> 构建发布」，一切符合预期，大功告成~

# 三、其他方式

那其实想要单纯修改 `npm` 包方法不止本文介绍的patch-package，对比下其他方法，才能感受到为何patch-package是最优解。

## 1、单文件修改法

原理是先找到要修改的`npm`包的文件，先把这个文件拷贝一份到项目目录下，接着修改文件内容并使用

- 拷贝覆盖法

还是用`postinstall`这个勾子，在这个勾子执行`cp `修改过的文件 `./node_modules/包名/原始文件`拷贝过去，最终`node_modules`下的文件就变成了修改后的文件了，应用在本篇antd例子中如下：

```json
"scripts": {
    "postinstall": "cp ./patches/upload/* ./node_modules/antd/lib/"
}
```

即在每次install包后执行用修改后文件覆盖原始文件逻辑。

- 修改引用法

配置一个`webpack alias`别名，如`'原始文件的引用路径': '修改后文件的引用路径'`，使得最终修改后的文件被引用，如：

```js
resolve: {
      alias: {
          'antd/upload': path.resolve(__dirname, './patched/upload/*'),
      }
  }
```

## 2、整体copy项目法

将需要修改的包的项目源码整个拷贝下来，进行修改，然后使用

- 直接引用法

  直接使用完成的源码，不再通过npm包方式引用。

- 发布私库法

  适合一个npm包几个项目在用的场景，可以把修改后的源码发布到私有的npm仓库上，供项目使用，这样多个项目就只需要修改一次源码

## 3、外部代码修改法

这个方法就是不直接修改 `node_modules` 的源码，而是利用js特性，在执行时，修改这个包的内部属性，从而达到目的。

简单来说就是利用`defineProperty`、`prototype`等特性修改包内的类，举个不恰当的例子，如`Vue2.0`中使用`defineProperty`给组件实例做`数据劫持和代理`。在vue项目中我们也经常在`main.js`中给`Vue根实例`通过`Vue.prototype.xxx=xxxx`挂一些全局属性和方法。

## 4、patch-package优势

使用上述三种方式虽然能通过一些骚操作解决某些特定场景下的问题，但都无法避免`版本升级`带来的困扰，如果该npm包升级，可能会导致原先的修改产生错误，所以如果想使用上述三种办法，最好还是要将版本号写死。然而patch-package有如下特性：

- 版本试错

  如果你装的包版本和你之前生成的补丁中记录的版本不一样，`npx patch-package`会直接报错`**ERROR** Failed to apply patch for package xxxx at path`，通过提示你可以更方便的定位问题

- 节省空间

  使用`git diff`来记录补丁比起重写一份源码的方法更节省空间，`即安全`，`又便捷`
