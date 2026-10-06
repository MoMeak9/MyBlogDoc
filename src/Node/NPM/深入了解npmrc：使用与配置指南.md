这文想给大家分享有关npmrc文件的使用和配置指南。npmrc是Node.js软件包管理器（npm）的配置文件，它允许我们自定义npm的行为，从而更好地管理项目依赖和开发流程。本文将深入介绍npmrc的作用、常见用法以及如何正确配置它来满足我们项目的需求。

## 什么是npmrc？

npmrc是npm（Node Package Manager）的配置文件，它位于用户主目录下的`.npmrc`文件或项目根目录下的`.npmrc`文件。npmrc文件由一系列键值对组成，用于配置npm在执行命令时的行为和参数。

## 常见用法

### 1. 定义镜像源

在国内，由于网络限制，直接使用npm的官方源可能会导致依赖包下载速度缓慢或失败。通过在npmrc中配置镜像源，我们可以切换到国内镜像（淘宝镜像），提高依赖包的下载速度。例如，使用淘宝镜像源：

```
@myscope:registry=https://registry.example.com/
```

同样的，有时候，我们可能需要将依赖包从私有源或其他第三方源获取，而不是默认的 npm 官方源。通过配置 `.npmrc`，可以指定特定的 registry 来获取依赖。

### 2. 管理依赖的存储路径

在默认情况下，npm将依赖安装到项目根目录下的`node_modules`文件夹中。但在某些情况下，我们可能希望将依赖安装到其他目录，例如统一管理全局依赖。这时，可以配置`prefix`来指定全局依赖的存储路径：

```
prefix=/path/to/global/node_modules
```

### 3. 保存开发依赖

当我们使用`npm install`安装一个开发依赖（如测试工具或构建工具）时，默认情况下npm不会将这些依赖保存到`package.json`的`devDependencies`中。如果希望自动保存这些依赖，可以开启`save-dev`配置：

```
save-dev=true
```

### 4. 使用作用域包

作用域包是一种有层次结构的npm软件包命名规范，通常用于将相关的模块组织在一起。如果我们希望将所有作用域包的下载路径指定到一个统一的目录，可以配置`@scope:registry`：

```
@myscope:registry=https://registry.example.com/
```

这在企业私有环境下也是非常常见的，比如需要安装cnpm镜像下的某个作用域包，可以指定其来源而不需要切换镜像。

## 配置优先级

npmrc的配置存在优先级，当我们在多个配置文件中定义相同的键时，npm将按照以下顺序查找和应用配置：

1. 项目根目录下的`.npmrc`文件
2. 用户主目录下的`.npmrc`文件
3. npm内置的默认配置

**注意**：项目根目录下的`.npmrc`文件优先级最高，它会覆盖用户主目录下的配置，而用户主目录下的配置又会覆盖npm的默认配置。

在pnpm项目下，区分的更细致：

1. 每个项目的配置文件（`/path/to/my/project/.npmrc`）
2. 每个工作区的配置文件（包含 `pnpm-workspace.yaml` 文件的目录）
3. 每位用户的配置文件（ `~/.npmrc` ）
4. 全局配置文件（ `/etc/npmrc` ）

## 创建和编辑npmrc文件

在大多数情况下，我们无需手动创建`.npmrc`文件，因为npm会在需要时自动生成并配置默认值。但有时为了满足特定需求，我们可能需要手动创建和编辑`.npmrc`文件。

我们可以通过编辑文本编辑器来创建和修改`.npmrc`文件，也可以通过命令行工具来实现。例如，使用`npm config edit`命令可以打开`.npmrc`文件进行编辑。

## 补充场景

### 企业内网下的源管理

例如，在企业内网中的Gitlab或者是Jenkins运行包安装的过程中，几乎使用的是私有源，而这些镜像可能并不频繁更新，当你想要使用社区的先进版本时就有可能会404，所以可以默认配置：

```
registry=https://registry.npm.taobao.org/
```

而对于发布在私有源的，则可以使用作用域包，二者写在一起，其中作用域包优先级更高：

```
registry=https://registry.npm.taobao.org/
@myscope:registry=https://registry.example.com/
```

### 开发中的源管理平替方法

**第一种：安装nrm源管理器**

```cmake
npm install nrm -g
```

通过 `nrm use xxx` 可以切换不同的源、或者 `nrm add xxx xxx域名` 进行安装，本地or服务器安装打包安装的时候，直接切换内部的`源` 在当前的私有服进行设置、当前私服找不到的话切换外网进行访问下载。

例如为bilibili内部cnpm镜像添加可选源

```
nrm add bili http://registry.npm.bilibili.co/
nrm ls
nrm use bili
```

> 原图引用为本地路径 `C:\Users\Admin\Downloads\1690477650523-202307280107498.webp`，仓库中暂未包含该图片。

**第二种：npm-registry**
原理其实跟第一种的方式一致，只是没有同意管理源的一个工具，同时也是最常用的

```stylus
npm install --registry=[域名]
```

## 总结

通过本文，我们深入了解了npmrc的作用、常见用法以及配置优先级。npmrc为我们的项目提供了更多的自定义和灵活性，帮助我们更好地管理依赖和开发流程。合理配置npmrc文件，可以显著提高我们在使用npm时的效率和便捷性。希望这篇文章对大家在使用和配置npmrc时有所帮助！
