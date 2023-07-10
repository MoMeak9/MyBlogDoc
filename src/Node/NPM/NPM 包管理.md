# NPM 包管理

> 参照：
> https://juejin.cn/post/6844903870678695943

在我们写完一个应用程序后，需要发布到npm上，大多数人可能仅仅使用`npm publish`就完成了，在这里我讲一下如何更好的发布包。

### 1. registry

在下载包的时候，很多人喜欢设置`taobao`镜像，因为`npm`仓库服务器在国外，下载速度真是急死个人。发布的时候也一样，一般开源应用基本都发布到[npmjs](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2F)，公司内部包的话就会发到私有`Npm`仓库，我们可以在`package.json`设置一下你想要的发布的地址：

```json
"publishConfig": {
    "registry": "http://registry.npm.xxx.com/"
 }

```

也可以设置别名

```csharp
alias ynpm="npm --registry=http://registry.npm.xxx.com"
// 发布的时候
ynpm publish

```

### 2. 权限相关

发布包需要验证你的账号权限，第一次执行`npm adduser`,后面就只需要`npm login`了。有时候我们遇到说你用户名密码错误，但实际并没错，可能是因为你的`registry`设置成了淘宝镜像的url，npm配置可以前往`~/.npmrc`查看，可以通过`npm config delete registry`删除掉。如果你需要一个人帮你一起发包，可以使用`npm owner add <user> [<@scope>/]<pkg>`去添加一个用户，不过最好还是把发布权限收紧，其他人提MR，包的`owner`进行`code review`，然后发包。

### 3. 发布哪些文件？

发布一个包，考虑到别人的下载速度，包体积肯定需要尽量小，所以源文件最好不包括，那如何控制只发哪些文件呢？

第一种方式是在 `package.json` 里 `files` 字段来控制，`files` 字段的值是一个数组，你可以写具体文件名，也可以写目录，还支持 `glob` 模式。

第二种就是使用 `.npmignore` 配置文件，他类似于 `.gitignore` 文件，其实如果没有 `.npmignore`，会使用`.gitignore`来取代他的功能。在包的根目录下，`.npmignore`不会覆盖 `files` 字段，但在子目录中会覆盖。

有些文件无法通过配置排除或者包含：

- package.json
- README
- CHANGES / CHANGELOG / HISTORY
- LICENSE / LICENCE
- NOTICE
- main字段中的文件

以上文件无法忽略。

- .git
- CVS
- .svn
- .DS_Store
- ._*
- 等等

以上文件无法发布到 `npm`。

### 4. 版本管理

npm的发包需要遵循语义化版本，一个版本号包含三个部分：`MAJOR.MINOR.PATCH`，

- MAJOR 表示主版本号，当你做了不兼容的API修改；
- MINOR 表示次版本号，当你做了向下兼容的功能性新增；
- PATCH 表示修订号,当你做了向下兼容的问题修正;

我们可以使用`npm version` 命令来自动修改版本号，比如：

```arduino
// version = v1.0.0
npm version patch
// v1.0.1
npm version prepatch
// v1.0.2-0
npm version minor
// v1.1.0
npm version major
// v2.0.0

```

一般来说还有先行版本，测试版本等，他们这样命名

- 3.1.0-beta.0
- 3.1.0-alpha.0

如果我们发布先行版本，`npm version prepatch` 命令得出的版本号好像就不够规范了，我们只能使用 `npm version 1.0.0-alpha.1` 指定版本号，不过还好，在 `npm 6.4.0` 之后，我们可以使用 `--preid` 参数：

```ini
npm version prerelease --preid=alpha

```

### 5. Changelog

包发布了很多次后，使用者升级就需要知道他是否需要升级，需要查看文档看看有哪些不兼容性改动，所以需要一个 `Changelog` 来记录每次发布改了些什么。如果手动的维护肯定会有忘记的时候，所以需要使用工具来自动生成，我们可以使用[standard-version](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fstandard-version) 这个包来生成，这个包的作用是自动更新版本和生成`CHANGELOG`。

```css
standard-version --prerelease alpha
✔ bumping version in package.json from 3.0.2-0 to 3.0.2-alpha.0
✔ created CHANGELOG.md
✔ outputting changes to CHANGELOG.md
✔ committing package.json and CHANGELOG.md
✔ tagging release v3.0.2-alpha.0
ℹ Run `git push --follow-tags origin master && npm publish --tag alpha` to publish
// 再看下生成的Changelog

### Bug Fixes

* 添加功能1 75e2808

### [3.0.2-alpha.0](///compare/v3.0.2-0...v3.0.2-alpha.0) (2019-06-18)

```

有了这个工具我们都不需要使用`npm version prepatch`了。`standard-version`会根据你的`git commit`信息，自动生成日志，比如新增啥啥功能，修复啥啥啥bug。自动生成的同时，也就意味着你`git commit`需要遵循一定格式，比如：

- feat:     A new feature
- fix:      A bug fix
- docs:     Documentation only changes
- style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-co lons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf:     A code change that improves performance

我们可以使用 [commitlint](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fcommitlint)搭配 `husky` 来校验你commit的信息是否符合标准

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }  
  }
}

```

也可以使用交互式的方式来生成commit，[commitizen](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fcommitizen%2Fcz-cli)这个包就可以。

### 6. Tag

在说明npm的tag之前需要先将一讲git的tag：

##### git的tag

git上打标签我们应该比较熟悉，特别是开发sdk或者APP软件的同学。我们在使用`npm version prepatch`的时候就会默认执行一次`git tag version`，我们也可以手动打一个标签`git tag -a <tag名> -m <注释文字>`，通过`git push — tags origin master` 将标签推到远程。

##### npm的tag

我们可以通过 `npm dist-tag ls [<pkg>]` 来查看一个包的tag，一般来说我们至少会有三种类型的标签

- latest：最后版本，npm install的就是这个
- beta：测试版本，一般内测使用，需要指定版本号install，例如3.1.0-beta.0
- next: 先行版本，npm install foo@next安装，例如3.0.2-alpha.0

如果我们需要发布一个测试版本，在发布的时候需要执行

```css
npm publish --tag beta

```

如果你直接执行`npm publish`，那么即使你的版本号是`-beta.n`，默认会打上`latest`的标签，别人install的时候也会下载到。这个时候需要我们只要改一下tag：

```perl
// 不小心发错了
latest: 1.0.1-beta.0
// 将1.0.1-beta.0设置为beta
npm dist-tag add my-package@1.0.1-beta.0 beta
npm dist-tag add my-package@1.0.0 latest

```

这样就万事大吉了。
