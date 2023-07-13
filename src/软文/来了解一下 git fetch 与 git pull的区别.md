# 来了解一下 git fetch 与 git pull的区别

Git `pull` 和 `fetch` 是 Git 用户经常使用的两个命令，他们都可以将远端仓库更新至本地。我们看看这两个命令之间的区别。

## 背景

当我们正在克隆仓库，也就是说你拷贝一份他人的源代码。当源文件有更新的时候，要使你的克隆副本保持最新状态，就需要将这些更新引入到克隆副本，这时候就需要用到 fetch 和 pull。

<p align=center><img src="https://cdn.yihuiblog.top/images/202301152227631.png" alt="image.png"  width="70%"/></p>

### `git fetch`

在拉取代码过程中，git fetch会首先检查本地仓库和远程仓库的差异，检查哪些不存在于本地仓库，然后将这些变动的提交拉取到本地。

但是，这里请注意，它是把远程提交拉取到本地仓库，而不是本地工作目录，它不会自行将这些新数据合并到当前工作目录中，我们需要继续执行`git merge`才会把这些变动合并到当前工作目录。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27e408700e7d42bca90be8f4ca3b8291~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

### `git pull`

`git pull`和`git fetch`刚好相反，它直接获取远程的最新提交，直接拉取并合并到**本地工作目录**，而且在合并过程中不会经过我们的审查，如果不仔细检查，这样很容易遇到冲突。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68d68690d3a64544acac5e86bdddbb6d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

### 那么该用哪种方式呢？

相比之下，`git fetch`是一个更安全的选择，因为它从你的远程仓库拉入所有的提交，但不会对你的本地文件做任何修改。

这相当于给了个缓冲区，你有足够时间去发现远程仓库自从你上次拉取后到现在为止发生的变化。你可以在合并前检查哪些文件有变化，哪些文件可能导致冲突。

而`git pull`相当于运行`git fetch`，然后立即将你的改动合并到本地仓库，即pull=fetch+merge。这样的确少了一个步骤，但是也会带来一些风险。
