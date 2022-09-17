# Git 常用语句与命令行

## 常用语句

### 新建（初始化）项目

初始化当前项目

```shell
git init
```

新建一个目录，将其初始化为Git代码库

```shell
git init [project-name]
```

 在指定目录创建一个空的 Git 仓库。运行这个命令会创建一个名为 directory，只包含 .git 子目录的空目录。 

```shell
git init --bare <directory>
```

下载一个项目和它的整个代码历史

这个命令就是将一个版本库拷贝到另一个目录中，同时也将分支都拷贝到新的版本库中。这样就可以在新的版本库中提交到远程分支

```shell
git clone [url]
```

### 修改配置项

显示当前的Git配置

```shell
git config --list
```

编辑Git配置文件
```
git config -e [--global]
```

输出、设置基本的全局变量（用户名、邮箱）

```shell
git config --global user.email
git config --global user.name

git config --global user.email "MyEmail@gmail.com"
git config --global user.name "My Name"
```

### 获取信息

显示commit历史，以及每次commit发生变更的文件

```shell
git log --stat
```

搜索提交历史，根据关键词

```shell
git log -S [keyword]
```

### 状态信息

显示分支，未跟踪文件，更改和其他不同

```shell
git status
```

### log、提交信息等

显示commit历史，以及每次commit发生变更的文件

```shell
git log --stat
```

搜索提交历史，根据关键词

```shell
git log -S [keyword]
```

显示某个commit之后的所有变动，每个commit占据一行

```shell
git log [tag] HEAD --pretty=format:%s
```

显示某个文件的版本历史，包括文件改名

```shell
git log --follow [file]
git whatchanged [file]
```

显示指定文件相关的每一次diff

```shell
git log -p [file]
```

显示过去5次提交

```shell
it log -5 --pretty --oneline
```

#### 分支操作

创建新的分支

```shell
git br <new_branch>
```

查看远程分支

```shell
git br -r
```

查看已经被合并到当前分支的分支

```shell
git br --merged
```

查看尚未被合并到当前分支的分支

```shell
git br --no-merged
```

## 常见问题

### merge 和 reabse 的区别

- git merge 会让2个分支的提交按照提交时间进行排序，并且会**把最新的2个commit合并成一个commit**，使得最后的分支树呈现非线性的结构

- git reabse 将当前的提交复制到master的最新提交之后，最终形成一个**线性的分支树**

> **社区评价：**
>
> 这个看公司需求，因为有些时候，注重提交日志的话，那我们应该选择merge，这样每一次的提交都清清楚楚记录着，如果说，我们不太注重日志的记录，那rebase是可以的，但是rebase有一个小小的缺点，就是基点变了，提交的多了，就不知道怎么是从哪个分支拉取的代码了
>
> rebase 空间消耗小，merge责任清晰。收验pr用merge更好。自己上传前校验和处理与仓库的冲突，rebase更好。

### 常用可视化工具

Webstorm、vscode 内置git可视化工具，[TortoiseGit](https://tortoisegit.org/) 小乌龟
