---
icon: edit
date: 2022-04-08
category:
- Node
---

# Node 笔记（4）包管理工具

**如果我们分享给世界上所有的程序员使用，有哪些方式呢？**

方式一：上传到GitHub上、其他程序员通过GitHub下载我们的代码手动的引用；

- 缺点是大家必须知道你的代码GitHub的地址，并且从GitHub上手动下载；
- 不需要使用的时候，需要手动来删除相关的依赖；
- 当遇到版本升级或者切换时，需要重复上面的操作；

方式二：使用一个专业的工具来管理我们的代码

- 我们通过工具将代码发布到特定的位置；
- 其他程序员直接通过工具来安装、升级、删除我们的工具代码；

## 包管理工具npm

Node Package Manager，也就是Node包管理器，但是目前已经不仅仅是Node包管理器了，在前端项目中我们也在使用它来管理依赖的包；

 **npm管理的包存放在哪里呢？**

我们发布自己的包其实是发布到registry上面的；

当我们安装一个包时其实是从registry上面下载的包；

## 项目配置文件 package.json

### 常见的属性

**必须填写的属性：name、version**

- name是项目的名称；
- version是当前项目的版本号；
- description是描述信息，很多时候是作为项目的基本描述；
- author是作者相关信息（发布时用到）；
- license是开源协议（发布时用到）；

**private属性：**

- private属性记录当前的项目是否是私有的；
- 当值为true时，npm是不能发布它的，这是防止私有项目或模块发布出去的方式；

**scripts属性**

- scripts属性用于配置一些脚本命令，以键值对的形式存在；
- 配置后我们可以通过 npm run 命令的key来执行这个命令；
- 对于常用的 start、 test、stop、restart可以省略掉run直接通过 npm start等方式运行；

**dependencies属性**

- <u>dependencies属性是指定无论开发环境还是生成环境都需要依赖的包；</u>
- 通常是我们项目实际开发用到的一些库模块；

**devDependencies属性**

- 一些包在生成环境是不需要的，比如webpack、babel等；
- 这个时候我们会通过 npm install webpack --save-dev，将它安装到devDependencies属性中；

**engines属性**

- engines属性用于指定Node和NPM的版本号；
- 在安装的过程中，会先检查对应的引擎版本，如果不符合就会报错；
- 事实上也可以指定所在的操作系统 "os" : [ "darwin", "linux" ]，只是很少用到；

**browserslist属性**

- 用于配置打包后的JavaScript浏览器的兼容情况

### 版本管理的问题

我们会发现安装的依赖版本出现：^2.0.3或~2.0.3，这是什么意思呢？

semver版本规范是X.Y.Z：

- X主版本号（major）：当你做了不兼容的 API 修改（可能不兼容之前的版本）；
- Y次版本号（minor）：当你做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本）；
- Z修订号（patch）：当你做了向下兼容的问题修正（没有新功能，修复了之前版本的bug）；

**我们这里解释一下 ^和~的区别：**

-  ^x.y.z：表示x是保持不变的，y和z永远安装最新的版本；
-  ~x.y.z：表示x和y保持不变的，z永远安装最新的版本；

## 常用指令

```sh
# 安装开发和生产依赖
npm install axios
npm i axios
# 开发依赖
npm install webpack --save-dev
npm install webpack -D
npm i webpack –D
# 根据package.json中的依赖包
npm install
# 卸载
npm uninstall package
npm uninstall package --save-dev
npm uninstall package -D
# 强制重新build
npm rebuild
# 清除缓存
npm cache clean
```

更多：https://docs.npmjs.com/cli-documentation/cli

### npm install 原理

![image-20220410141154236](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204101411323.png)

**npm install会检测是有package-lock.json文件：**

**没有lock文件:**

- 分析依赖关系，这是因为我们可能包会依赖其他的包，并且多个包之间会产生相同依赖的情况；
- 从registry仓库中下载压缩包（如果我们设置了镜像，那么会从镜像服务器下载压缩包）；
- 获取到压缩包后会对压缩包进行缓存（从npm5开始有的）；
- 将压缩包解压到项目的node_modules文件夹中（前面我们讲过，require的查找顺序会在该包下面查找）

**有lock文件:**

- 检测lock中包的版本是否和package.json中一致（会按照semver版本规范检测）；
  - 不一致，那么会重新构建依赖关系，直接会走顶层的流程；
- ü 一致的情况下，会去优先查找缓存
  - 没有找到，会从registry仓库下载，直接走顶层流程；
-  查找到，会获取缓存中的压缩文件，并且将压缩文件解压到node_modules文件夹中；

## Yarn工具

yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具；yarn 是为了弥补 npm 的一些缺陷而出现的；早期的npm存在很多的缺陷，比如安装依赖速度很慢、版本依赖混乱等等一系列的问题； 虽然从npm5版本开始，进行了很多的升级和改进，但是依然很多人喜欢使用yarn；

## cnpm工具

由于一些特殊的原因，某些情况下我们没办法很好的从 https://registry.npmjs.org下载下来一些需要的包。这个时候，我们可以使用cnpm，并且将cnpm设置为淘宝的镜像

## npx工具

npx是npm5.2之后自带的一个命令。 npx的作用非常多，但是比较常见的是使用它来调用项目中的某个模块的指令。

### 解决局部命令执行

方式一：在终端中使用如下命令（在项目根目录下）

```
./node_modules/.bin/webpack --version
```

方式二：修改package.json中的scripts

```
"scripts": {
	"webpack": "webpack --version"
}
```

方式三：使用npx

```
npx webpack --version
```

npx的原理非常简单，它会到当前目录的node_modules/.bin目录下查找对应的命令；
