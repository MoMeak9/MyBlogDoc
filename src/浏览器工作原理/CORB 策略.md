# Cross-Origin Read Blocking (CORB) 跨域读阻塞

跨源读取阻止 (CORB)，这是一种算法，通过该算法可以识别可疑的跨源资源加载，并在它们到达网页之前被 Web 浏览器阻止。CORB 通过使敏感数据远离跨源网页来降低泄露敏感数据的风险。在大多数浏览器中，它将此类数据排除在不受信任的脚本执行上下文之外。在具有[Site Isolation](https://www.chromium.org/Home/chromium-security/site-isolation)的浏览器中，它可以将此类数据完全排除在不受信任的渲染器进程之外，甚至有助于抵御边信道攻击。

## 问题

同源策略通常会阻止一个源从另一个源读取任意网络资源。在实践中，执行此策略并不像阻止所有跨源加载那么简单：必须为 Web 功能建立例外，例如`<img>`或`<script>`由于历史原因可以针对跨源资源，以及允许某些资源的 CORS 机制有选择地跨源阅读。

然而，某些类型的内容可能被证明与所有历史上允许的宽容上下文不兼容。JSON 就是这样一种类型：JSON 响应在标记为目标时会导致解码错误`<img>`，在标记为目标时会导致空操作或语法错误`<script>`，等等。网页可以加载具有可观察结果的 JSON 的唯一情况是通过`fetch()`或`XMLHttpRequest`；在这些情况下，跨源读取由 CORS 调节。

通过尽早检测和阻止受 CORB 保护的资源的加载——也就是说，在响应进入图像解码器或 JavaScript 解析器阶段之前——CORB 可以防御可能出现在被跳过的阶段中的侧信道漏洞。

## CORB 减轻了哪些攻击？

CORB 缓解以下攻击来源：

- 跨站点脚本包含 (XSSI)
  - `<script>`XSSI 是将标记指向非 JavaScript 的目标资源，并在将结果资源解释为 JavaScript 时观察一些副作用的技术。2006 年发现了这种攻击的一个早期示例：通过覆盖 JavaScript Array 构造函数，JSON 列表的内容可以像以下一样简单地被拦截：`<script src="https://example.com/secret.json">`。虽然数组构造函数攻击向量在当前浏览器中得到修复，但在随后的十年中发现并修复了许多类似的漏洞利用。例如，请参阅[此处的幻灯片](https://www.owasp.org/images/6/6a/OWASPLondon20161124_JSON_Hijacking_Gareth_Heyes.pdf)。
  - CORB 可防止此类攻击，因为受 CORB 保护的资源将被阻止传送到跨站点`<script>`元素。
  - CORB 在没有其他 XSSI 防御（如[XSRF 令牌](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#synchronizer-token-pattern)和/或[JSON 安全前缀）](https://docs.angularjs.org/api/ng/service/$http#json-vulnerability-protection)的情况下特别有价值。[此外，XSSI 防御（如JSON 安全前缀）](https://docs.angularjs.org/api/ng/service/$http#json-vulnerability-protection)的存在也可以用作 CORB 算法的信号，表明资源应该受 CORB 保护。
- 嗅探性旁道攻击（例如 Spectre）。
  - 例如，攻击者可能会使用一个`<img src="https://example.com/secret.json">`元素将跨站点秘密拉入攻击者运行 JavaScript 的进程中，然后使用推测性侧通道攻击（例如[Spectre](https://spectreattack.com/)）来读取该秘密。
  - [当与站点隔离](https://www.chromium.org/Home/chromium-security/site-isolation)一起使用时，CORB 可以防止此类攻击，方法是防止 JSON 资源出现在托管跨站点页面的进程的内存中。

## CORB 如何“阻止”响应？

当 CORB 决定响应需要受 CORB 保护时，响应被修改如下：

- 响应主体替换为空主体。
- 响应标头已删除。

> [ [lukasza@chromium.org](mailto:lukasza@chromium.org) ] Chromium 目前保留了 Access-Control-* 标头（这有助于为 CORS 生成更好的错误消息）。

为了有效抵御推测性旁路攻击，CORB 阻塞必须在响应到达托管请求的跨域发起者的进程之前发生。换句话说，CORB 阻止应该防止受 CORB 保护的响应数据出现在托管跨源网站的进程的内存中（即使是暂时的或短期的）。[这与过滤响应](https://fetch.spec.whatwg.org/#concept-filtered-response)（例如[CORS 过滤响应](https://fetch.spec.whatwg.org/#concept-filtered-response-cors)或[不透明过滤响应](https://fetch.spec.whatwg.org/#concept-filtered-response-opaque)）的概念不同，过滤响应仅提供对完整数据的有限视图，这些数据仍然存储在[内部响应](https://fetch.spec.whatwg.org/#concept-internal-response)中，并且可以在渲染器进程中实现。

[此处提供了](https://anforowicz.github.io/xsdb-demo/index.html)CORB 演示页面。

## 哪些请求符合 CORB 允许的条件？

以下类型的请求是 CORB 豁免的：

- [导航请求](https://fetch.spec.whatwg.org/#navigation-request)或请求[目标](https://fetch.spec.whatwg.org/#concept-request-destination)为“对象”或“嵌入”的请求。跨源`<iframe>`s、`<object>`s 和`<embed>`s 创建一个单独的安全上下文，因此泄露数据的风险较小。在大多数浏览器中，这种单独的上下文意味着恶意页面在推断内容时比将内容加载到自己的执行上下文中并观察副作用（例如，XSSI、样式标签等）更麻烦。在具有站点隔离功能的浏览器中，此安全上下文使用一个单独的进程，将数据完全排除在恶意页面的地址空间之外。

> [ [lukasza@chromium.org](mailto:lukasza@chromium.org) ] TODO：弄清楚[Edge 的基于 VM 的隔离](https://cloudblogs.microsoft.com/microsoftsecure/2017/10/23/making-microsoft-edge-the-most-secure-browser-with-windows-defender-application-guard/)是如何工作的（例如，如果某些来源在特定渲染器中是禁区，那么这将大大增加 CORB 在 Edge 中的实用性）。

- 下载请求（例如[发起者](https://fetch.spec.whatwg.org/#concept-request-initiator)为“下载”的请求）。在这种情况下，来自响应的数据将保存到磁盘（而不是共享到跨源上下文），因此不会受益于 CORB 保护。

> [ [lukasza@chromium.org](mailto:lukasza@chromium.org) ] AFAIK，在 Chrome 中，对下载请求的响应永远不会通过渲染器进程的内存。不确定在其他浏览器中是否如此。

所有其他类型的请求可能符合 CORB 条件。这包括：

- [XHR](https://xhr.spec.whatwg.org/)和[fetch()](https://fetch.spec.whatwg.org/#dom-global-fetch)

- `ping`,`navigator.sendBeacon()`

- `<link rel="prefetch" ...>`

- 具有以下

  请求目的地的

  请求：

  - “图像”请求，如`<img>`标签`/favicon.ico`、SVG `<image>`、CSS`background-image`等。
  - [类似脚本的目的地，](https://fetch.spec.whatwg.org/#request-destination-script-like)如, `<script>`, ,等`importScripts()``navigator.serviceWorker.register()``audioWorklet.addModule()`
  - “音频”、“视频”或“曲目”
  - “字体”
  - “风格”
  - “报告”请求，如 CSP 报告、NEL 报告等。

CORB 的基本思想是考虑特定资源是否可能不适合在上面列出的*每个*上下文中使用。如果每一种可能的使用都会导致 CORS 错误、语法/解码错误或没有可观察到的结果，CORB 应该能够阻止跨源加载而不改变加载的可观察到的结果。在 CORB 之前，详细信息已经被抑制跨域错误，以防止信息泄露。因此，此类错误的可观察后果已经是有限的，并且可以在阻塞时保留。

## 哪些类型的内容受 CORB 保护？

如下所述，以下类型的内容受 CORB 保护：

- JSON
- HTML
- XML

这些将在以下各节中分别讨论。

### JSON

JSON 是网络上广泛使用的数据格式；Web 平台内置了对 JSON 的支持。JSON 响应很可能包含值得保护的用户数据。此外，与 HTML 或图像格式不同，没有允许跨源嵌入 JSON 资源的遗留 HTML 机制（即早于 CORS）。

由于 JSON 语法源自 JavaScript 并与之重叠，因此必须注意处理 JavaScript/JSON 多语言的可能性。CORB 为 JSON 处理以下情况：

- 非空 JSON 对象字面量：非空 JSON 对象（例如`{"key": "value"}`）。这正是 JSON 语法的子集，它是无效的 JavaScript 语法——第一个字符串文字后的冒号会产生语法错误。CORB 可以通过嗅探响应主体来保护这些情况，即使标有不同的内容类型。

- 其他 JSON 文字：JSON 语法的其余子集（例如，`null`or `[1, 2, "3"]`）也恰好是有效的 JavaScript 语法。特别是，当作为脚本进行评估时，它们是应该没有副作用的值表达式。因此，如果可以检测到它们，则可以对它们进行 CORB 保护。此处的检测是可能的，但需要实现一个理解完整 JSON 语法的验证器：

  - 如果响应未标有 JSON 内容类型，CORB 可能会通过将整个响应主体缓冲和验证为 JSON 来检测这些情况；必须考虑整个响应，因为有效的、有副作用的 JavaScript 程序（如`[1, 2, "3"].map(...)`.
  - 如果响应确实标有 JSON 内容类型，CORB 可能会决定嗅探响应以确认它是有效的 JSON，但最多只能达到一定数量的字节。这将避免在无限量的内存中进行缓冲和解析。

- JSON served with [an XSSI-defeating prefix](https://docs.angularjs.org/api/ng/service/$http#json-vulnerability-protection)：作为过去浏览器漏洞的缓解措施，许多实际的网站和框架采用一种约定，在其可获取的资源前面加上一个旨在强制 JavaScript 错误的字符串。这些前缀在 CORB 之前尚未标准化，但有几种方法似乎很普遍：

  - 字符序列`)]}'`内置于[angular.js 框架](https://docs.angularjs.org/api/ng/service/$http)和[Java Spring 框架](https://goo.gl/xP7FWn)中，并在 google.com 域中得到广泛使用。
  - 字符序列在历史上`{} &&`被[内置到 Java Spring 框架中](https://goo.gl/JYPFAv)。
  - 无限循环，例如`for(;;);`，在 facebook.com 域中被广泛使用。

  这些公认的 XSSI 防御的存在是对 CORB 算法的强烈信号，表明资源应该受 CORB 保护。因此，这些前缀几乎在所有情况下都应触发 CORB 保护，无论它们后面是什么。这被认为是安全的，因为：

  - [如果JSON 安全前缀](https://docs.angularjs.org/api/ng/service/$http#json-vulnerability-protection)出现在以 JavaScript MIME 类型（例如`text/javascript`.
  - [JSON 安全前缀](https://docs.angularjs.org/api/ng/service/$http#json-vulnerability-protection)不会与图像、视频或字体等二进制资源发生冲突（通常需要将前几个字节硬编码为特定序列——例如`FF D8 FF`图像/jpeg）。
  - 与样式表的冲突`text/css`在理论上是可能的，因为可以构造一个以[JSON security prefix](https://docs.angularjs.org/api/ng/service/$http#json-vulnerability-protection)开头的文件，但同时可以像样式表一样很好地解析。`text/css`因此被确定为例外，尽管这种情况的实际可能性似乎很低。有关此类样式表的示例，请参见下文：

```
)]} '
 {} 
h1 {颜色：红色；}  
```

一些网络功能也使用 JSON。一个示例是`<link rel="manifest">`，其`href`属性指定一个 JSON 清单文件。幸运的是，当清单指定为跨源时，此机制需要 CORS，因此其 CORB 处理与应用于 fetch() 的规则相同。

> [ [nick@chromium.org](mailto:nick@chromium.org) ] TODO：当解释为脚本时，是否有 JSON 无副作用的规范链接？

### HTML

`<iframe>`HTML 可以通过（如上所述）嵌入跨源，但除此之外，HTML 文档只能通过 fetch() 和 XHR 加载，这两者都需要 CORS。HTML 嗅探已经广为人知，因此（与 JSON 不同）可以相对容易地以高置信度识别 HTML 资源。

已确定 CORB 需要保守处理的一种模棱两可的多语言情况：HTML 样式的注释，它是[JavaScript 语法的一部分](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-html-like-comments)。

- CORB 在嗅探以确认 HTML 内容类型时跳过 HTML 注释块。这意味着（与[正常的 HTML 嗅探](https://mimesniff.spec.whatwg.org/#identifying-a-resource-with-an-unknown-mime-type)不同）“ `<!--`” 字符串的存在不会立即确认嗅探资源是 HTML 文档 - HTML 注释仍然必须跟在有效的 HTML 标记之后。
- 此外，在 HTML 注释结束后，CORB 嗅探器将跳过所有字符，直到行终止字符。这有助于适应[`SingleLineHTMLCloseComment`](https://www.ecma-international.org/ecma-262/8.0/index.html#prod-annexB-SingleLineHTMLCloseComment)可以在“ ”字符*之后*使用的规则。[`SingleLineCommentChars`](https://www.ecma-international.org/ecma-262/8.0/index.html#prod-SingleLineCommentChars) `-->`

在真实网站上使用的 html/javascript 多语言示例：

```html
<!--/*--><html><body><script type="text/javascript"><!--//*/
var x = "This is both valid html and valid javascript";
//--></script></body></html>
<!-- comment --> <script type='text/javascript'>
//<![CDATA[
var x = "This is both valid html and valid javascript";
//]]>--></script>
```

### XML

与 JSON 一样，XML 是一种广泛使用的数据交换格式，并且与 HTML 一样，是一种内置于 Web 平台中的文档格式（特别是通过 XmlHttpRequest）。

通过嗅探确认 XML 内容类型比 JSON 或 HTML 更直接：XML 由 pattern 表示`<?xml`，可能前面有空格。

唯一标识的需要 CORB 特殊处理的 XML 案例是`image/svg+xml`，它是一种图像类型。所有其他 XML mime 类型都被视为受 CORB 保护。

## 确定响应是否受 CORB 保护

CORB 根据以下内容决定响应是否需要保护（即响应是 JSON、HTML 还是 XML 资源）：

- 如果响应包含响应标头，并且响应标头是以下之一`X-Content-Type-Options: nosniff`，则响应将受 CORB 保护：`Content-Type`
  - [HTML MIME 类型](https://mimesniff.spec.whatwg.org/#html-mime-type)
  - [XML MIME 类型](https://mimesniff.spec.whatwg.org/#xml-mime-type)（`image/svg+xml`如上所述是 CORB 豁免的除外）
  - [JSON MIME 类型](https://mimesniff.spec.whatwg.org/#json-mime-type)
  - `text/plain`
- `Content-Type`如果响应是 206 响应，并且响应的标头是以下之一，则该响应将受 CORB 保护：
  - [HTML MIME 类型](https://mimesniff.spec.whatwg.org/#html-mime-type)
  - [XML MIME 类型](https://mimesniff.spec.whatwg.org/#xml-mime-type)（`image/svg+xml`如上所述是 CORB 豁免的除外）
  - [JSON MIME 类型](https://mimesniff.spec.whatwg.org/#json-mime-type)
- 否则，CORB 会尝试嗅探响应主体：
  - [嗅探为 HTML的 HTML MIME 类型](https://mimesniff.spec.whatwg.org/#html-mime-type)受 CORB 保护
  - `image/svg+xml`嗅探为 XML 的[XML MIME 类型](https://mimesniff.spec.whatwg.org/#xml-mime-type)（除了）受 CORB 保护
  - [嗅探为 JSON的 JSON MIME 类型](https://mimesniff.spec.whatwg.org/#json-mime-type)受 CORB 保护
  - `text/plain`嗅探为 JSON、HTML 或 XML 受 CORB 保护
  - `text/css`任何以[JSON 安全前缀](https://docs.angularjs.org/api/ng/service/$http#json-vulnerability-protection)开头的响应（除了）都受 CORB 保护

嗅探是必要的，以避免阻止依赖于错误标记的跨源响应（例如，作为图像`text/html`）的现有网页。如果不进行嗅探，CORB 将阻止大约 16 倍的响应。

- CORB 将仅嗅探以*确认*基于标头的分类`Content-Type`（即，如果`Content-Type`标头是`text/json`，则 CORB 将嗅探 JSON 而不会嗅探 HTML 或 XML）。
- 如果某些语法元素在受 CORB 保护和不受 CORB 保护的 MIME 类型之间共享，那么这些元素必须被 CORB 嗅探忽略。例如，当嗅探（受 CORB 保护的）HTML 时，CORB 会忽略并跳过 HTML 注释，因为[它们也可能出现](http://www.ecma-international.org/ecma-262/6.0/#sec-html-like-comments)在（不受 CORB 保护的）JavaScript 中。[这与在其他上下文中使用的HTML 嗅探规则](https://mimesniff.spec.whatwg.org/#rules-for-identifying-an-unknown-mime-type)不同。
- 嗅探是一种尽力而为的启发式方法，为了获得最佳安全结果，我们建议 Web 开发人员 1) 使用正确的`Content-Type`标头标记响应和 2) 使用标头选择退出嗅探`X-Content-Type-Options: nosniff`。

> [ [nick@chromium.org](mailto:nick@chromium.org) ] 本节需要强有力的理由来说明为什么 text/plain 得到这种特殊解释。理想情况下，显示 text/plain 的数据通常用于提供 HTML、JSON 或 XML。我们当前实现中对 text/plain 的处理实际上可能是早期原型的产物，它在标准 mime 嗅探之后运行，并且当响应省略 Content- 时，可能已经看到“text/plain”MIME 类型被应用为默认 MIME 类型类型标题。

请注意，以上意味着以下响应不受 CORB 保护：

- 标记为 的响应`multipart/*`。这避免了必须解析嵌套部分的内容类型。我们建议不支持对敏感文档的多部分范围请求。
- 没有标题的响应`Content-Type`。
- 带有 JavaScript MIME 类型的响应，例如`text/javascript`. 这包括 JSONP（“带填充的 JSON”），它与 JSON 不同的是要在跨源上下文中读取和执行。

## 附录：CORB 和网络标准

[Fetch 规范中的 CORB 部分涵盖了自](https://fetch.spec.whatwg.org/#corb)[2018 年 5 月](https://github.com/whatwg/fetch/pull/686)以来处理`nosniff`和 206 个响应。

CORB 确认嗅探尚未标准化。

[CORB 的某些方面](https://github.com/whatwg/fetch/issues?utf8=✓&q=is%3Aissue+CORB+)正在讨论中，并且可能会随着时间的推移而发展。

## 附录：CORB 实现状态

跟踪错误：

- Chrome: https://crbug.com/268640 and https://crbug.com/802835 and https://www.chromestatus.com/feature/5629709824032768
- Edge: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/17382911/
- Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1459357
- Safari/WebKit: https://bugs.webkit.org/show_bug.cgi?id=185331

Status of Web Platform Tests:

- [Experimental builds](https://master-dot-wptdashboard.appspot.com/results/fetch/corb?label=experimental)
- [Stable releases](https://master-dot-wptdashboard.appspot.com/results/fetch/corb)

## 参考

- [Cross-Origin Read Blocking (CORB)](https://chromium.googlesource.com/chromium/src/+/master/services/network/cross_origin_read_blocking_explainer.md)
- [Web 开发人员的跨域读阻塞](https://www.chromium.org/Home/chromium-security/corb-for-developers/)

