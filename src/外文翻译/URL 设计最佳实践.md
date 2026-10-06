> category:
>   - 前端
>   - JavaScript
>   - 外文翻译

> 原文：https://blog.jim-nielsen.com/2023/examples-of-great-urls/
>
> 标题：Examples of Great URL Design
>
> 作者：[**Jim Nielsen**](https://blog.jim-nielsen.com/)

以下是Kyle Aster关于为什么[深思熟虑的URL设计很重要（2010年）](https://warpspire.com/posts/url-design/)：

> *URL 是通用的。它们适用于 Firefox、Chrome、Safari、Internet Explorer、cURL、wget、iPhone、Android，甚至写在便签上。它们是 Web 的一种通用语法。不要认为这是理所当然的。*

我喜欢这个无处不在的 URL 提醒。它们不仅用于在浏览器栏中输入内容。它们的使用方式多种多样：

- 作为脚本和抓取以及其他编程数据检索的目标。
- 作为参考，印在实体书的脚注和附录中。
- 作为可通过物理介质访问的可操作触发器，例如可扫描的二维码或物联网设备按钮。
- 还有更多！

当我回想起这些年来我遇到的优秀URL设计的例子[[1]](https://blog.jim-nielsen.com/2023/examples-of-great-urls/#fn:1)时——当我看到它们时，我停下来想“哇，这真是太好了！”——这些是我想到的几个。

## StackOverflow

StackOverflow 是我记得第一个遇到 URL 的地方，它在计算机和人类的需求之间取得了很好的平衡。

URL 遵循如下模式：

`:id` 是问题的唯一标识符，不会透露任何有关内容的信息。另一方面，`:slug` 是人类可读的问题释义，可让您在不实际访问网站的情况下理解问题。

美妙的是`:slug` 是 URL 中的可选参数。例如：

[stackoverflow.com/questions/16245767](https://stackoverflow.com/questions/16245767)

没有告诉我们有关所问问题的信息，但它是一个有效的 URL，允许服务器轻松查找并提供该独特的内容。

但 StackOverflow 也支持 URL 的 `:slug` 部分，它允许人们快速理解该 URL 中的内容。

[stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript/](https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript/)

如前所述，`:slug` 是可选的。服务器不需要查找和提供相关内容。事实上，随着时间的推移，它可以很容易地改变，而不会破坏 URL（我觉得这很优雅）。

当然，它也可以被欺骗性地使用。例如，这与上面的 URL 相同，但它表示完全不同的内容（不破坏链接）：

[stackoverflow.com/questions/16245767/how-to-bake-a-cake](https://stackoverflow.com/questions/16245767/how-to-bake-a-cake)

但是，嘿，一切都要权衡取舍。

## Slack

我记得 Slack 发起了一项营销活动，让人们了解该产品。他们在页面文案和 URL 中使用了营销活动的语言[——“Slack 是......”](http://web.archive.org/web/20140212215308/slack.com/is)，例如

- `slack.com/is`
- `slack.com/is/team-communication`
- `slack.com/is/everything-in-one-place`
- `slack.com/is/wherever-you-are`

我记得我对这种将讲故事活动的设计一直带到 URL 本身的努力非常感兴趣。

从那时起，我总是对那些试图形成自然语言句子（`slack.com/is/team-communication`）而不是连接一系列分层关键字的 URL `slack.com/product/team-communication`。

说到在你的URL中用句子结构做一些有趣的事情......

## Jessica Hische 的网站

杰西卡·希什（Jessica Hische）的网站位于`.is`域名下（显然是[冰岛](https://en.wikipedia.org/wiki/.is)域名）。

她在她的网站上即兴演奏这种有趣的第三人称形式的“我是”。例如，单击主导航栏中的“关于”，它将带您：

[jessicahische.is/anoversharer](https://www.jessicahische.is/anoversharer)

这很有趣！`mydomain.com/about` 也很清楚，但我喜欢描述“关于”并在句子结构中这样做的奇思妙想。

她的主要导航中的所有名词都遵循这种模式，以及她的个人作品。就像这篇关于她的一个假日烹饪包装演出的文章一样，网址是：

[jessicahische.is/sofulloffancypopcorn](https://www.jessicahische.is/sofulloffancypopcorn)

Fun!乐趣！

## 作为产品的 URL

我一直很喜欢那些 URL 很好地映射到其域语义的服务。例如，[GitHub 的 URL 可以很好地映射到 git 语义，例如 git](https://www.quora.com/Which-sites-have-the-best-URL-design/answer/Simon-Willison) 中的三点差异比较：

```
/:owner/:project/compare/ref1...ref2
```

e.g.例如：

[github.com/django/django/compare/4.2.7...main](https://github.com/django/django/compare/4.2.7...main)

对于技术产品来说，这种在不一定看到用户界面的情况下浏览网站的能力是一种很酷的超能力。

NPM 有点相似。想在 NPM 上看到 `react-router` 吗？您不必转到 NPM 的主页并单击或使用他们的搜索框。一旦你熟悉了他们的网站结构，你就知道你可以使用以下方法查找包：

```
/package/:package-name
```

e.g.例如：

[npmjs.com/package/react-router](https://www.npmjs.com/package/react-router)

想要查找包的特定版本？

```
/package/:package-name/v/:semver
```

e.g.例如：

[npmjs.com/package/react-router/v/5.3.4](https://www.npmjs.com/package/react-router/v/5.3.4)

当您使用特定产品时，这些类型的快捷方式非常有用。对于 NPM，您正在搜寻 `package.json`，并且需要查找固定在特定版本的特定包的一些详细信息，只需识别所需的版本并将详细信息键入到 URL 栏中，即可导航到该包的 NPM 详细信息。

[像 unpkg 这样的](https://unpkg.com/) NPM CDN 在遵循这些语义方面也做得很好。想要从已发布的包中获取文件？unpkg的主页说：

```
unpkg.com/:package@:version/:file
```

在这种情况下，*URL可以是产品本身*，这使得其设计更加重要[[2]](https://blog.jim-nielsen.com/2023/examples-of-great-urls/#fn:2)

## What’s Yours?

这些是多年来我喜欢使用或看到的 URL 的几个示例。我敢肯定还有其他人，但我很好奇你最喜欢的是什么？

> - 我在“出色的URL设计”方面没有找到很多好资源。Alex[这篇文章](http://alexpounds.com/blog/2018/12/29/four-cool-urls)还不错。我几乎希望有一个“Dribble”专门用来展示出色的URL。对于有雄心壮志的人来说，url-gallery.com是可用的... 
>
> - unpkg的创建者Michael Jackson[指出](https://x.com/mjackson/status/1729551085554008417)：“令我惊讶的是，unpkg变得如此受欢迎，考虑到它的每个URL都是手工制作的。没有搜索框。”这确实令人惊讶！unpkg非常受欢迎：[2020 年 9 月至 10 月一个月内有 500 亿个请求](https://x.com/mjackson/status/1315718264035573761?s=20)
