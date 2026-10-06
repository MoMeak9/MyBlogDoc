

# Cross-Origin Read Blocking (CORB) 网络兼容性和对其他资源的影响问题

### CORB 对图像的影响

CORB 对标签应该没有明显的影响`<img>`，除非图像资源 1) 被错误地标记为不正确的、非图像的、受 CORB 保护的 Content-Type 和 2) 与响应标头一起提供`X-Content-Type-Options: nosniff`。

例子：

- **正确标记的 HTML 文档**
  - 标签中使用的资源`<img>`：
    - 正文：一个 HTML 文档
    - `Content-Type: text/html`
    - 没有`X-Content-Type-Options`标题
  - 预期行为：**无明显差异**。当 1) 尝试将 html 文档呈现为图像（没有 CORB）和 2) 尝试将空响应呈现为图像（当 CORB 阻止响应时）时，呈现的图像应该是相同的损坏图像。
  - WPT测试：`fetch/corb/img-html-correctly-labeled.sub.html`
- **错误标记的图像（嗅探）**
  - 标签中使用的资源`<img>` ：
    - 正文：图像
    - `Content-Type: text/html`
    - 没有`X-Content-Type-Options`标题
  - 预期行为：**无差异**。CORB 将嗅探到响应主体实际上*不是*受 CORB 保护的类型，因此将允许响应。
  - WPT测试：`fetch/corb/img-png-mislabeled-as-html.sub.html`
- **错误标记的图像（nosniff）**
  - 标签中使用的资源`<img>`：
    - 正文：图像
    - `Content-Type: text/html`
    - `X-Content-Type-Options: nosniff`
  - 预期行为：**可观察到的差异**。由于`nosniff`标头，CORB 将不得不依赖`Content-Type`标头。因为此响应被错误标记（正文是图像，但标题`Content-Type`说它是 html 文档），CORB 将错误地将响应分类为需要 CORB 保护。
  - WPT测试：`fetch/corb/img-png-mislabeled-as-html-nosniff.tentative.sub.html`

除了 HTML`<img>`标记之外，上面的示例还适用于其他使用图像的网络功能 - 包括但不限于：

- `/favicon.ico`
- SVG 的`<image>`，
- `<link rel="preload" as="image" ...>`（参见 WPT 测试`fetch/corb/preload-image-png-mislabeled-as-html-nosniff.tentative.sub.html`：）
- `background-image`在样式表中
- 将图像绘制到（可能被污染的）HTML 上`<canvas>`

> [ [lukasza@chromium.org](mailto:lukasza@chromium.org) ] 早期尝试阻止具有不兼容 MIME 类型的 nosniff 图像[失败了](https://github.com/whatwg/fetch/issues/395)。我们认为 CORB 会更幸运，因为它只会阻止 CORB 保护的 MIME 类型的子集（例如，它不会`application/octet-stream`像[Firefox 错误](https://bugzilla.mozilla.org/show_bug.cgi?id=1302539)中引用的那样阻止）

### CORB 对多媒体的影响

音频和视频资源应该会看到与图像类似的影响，尽管 206 响应更有可能出现在媒体上。

### CORB 对脚本的影响

CORB 应该对标签没有明显的影响`<script>`，除非将标有正确 MIME 类型的受 CORB 保护的非 JavaScript 资源作为脚本加载 - 在这些情况下，资源通常会导致语法错误，但受 CORB 保护响应的空主体不会导致错误。

例子：

- 正确标记的 HTML 文档
  - 标签中使用的资源 `<script>`：
    - 正文：一个 HTML 文档
    - `Content-Type: text/html`
    - 没有`X-Content-Type-Options`标题
  - 预期行为：通过[GlobalEventHandlers.onerror](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror)**可观察到的差异**。大多数受 CORB 保护的资源在解析为 JavaScript 时会导致语法错误。在 CORB 阻止响应后语法错误消失，因为被阻止响应的空主体可以像 JavaScript 一样正常解析。
  - WPT测试：`fetch/corb/script-html-correctly-labeled.tentative.sub.html`

> [ [lukasza@chromium.org](mailto:lukasza@chromium.org) ] 理论上，在 CORB 阻塞响应中使用非空响应可能会重新引入丢失的语法错误。我们没有走那条路，因为
>
> 1. 使用非空响应将与 Fetch 规范的其他部分不一致（如[不透明过滤响应](https://fetch.spec.whatwg.org/#concept-filtered-response-opaque)）。
> 2. 保留语法错误的存在可能需要更改 CORB 阻塞的响应主体的内容，具体取决于原始响应主体是否会导致语法错误。这会增加额外的复杂性，这对于 CORB 实现者和 Web 开发人员来说似乎都是不可取的。

- **错误标记的脚本（嗅探）**

  - 标签中使用的资源`<script>`：

    - 正文：适当的 JavaScript 脚本
    - `Content-Type: text/html`
    - 没有`X-Content-Type-Options`标题

  - 预期行为：**无差异**。CORB 将嗅探到响应主体实际上*不是*受 CORB 保护的类型，因此将允许响应。请注意，CORB 嗅探对于某些语法元素在 HTML 和 JavaScript 之间共享这一事实具有弹性（例如[comments](http://www.ecma-international.org/ecma-262/6.0/#sec-html-like-comments)）。

  - WPT测试：`fetch/corb/script-js-mislabeled-as-html.sub.html`
  
- **错误标记的脚本（nosniff）**

  - 标签中使用的资源 `<script>`：
    - 正文：适当的 JavaScript 脚本
    - `Content-Type: text/html`
    - `X-Content-Type-Options: nosniff`
  - 预期行为：**无明显差异**。无论有没有 CORB，脚本都不会执行，因为当响应头响应的 MIME 类型（在示例中）不是[JavaScript MIME 类型](https://html.spec.whatwg.org/multipage/scripting.html#javaScript-mime-type)`nosniff`时，响应将导致响应被阻塞（ [Fetch 规范](https://fetch.spec.whatwg.org/#should-response-to-request-be-blocked-due-to-nosniff?)要求此行为）。`text/html`
  - WPT测试：`fetch/corb/script-js-mislabeled-as-html-nosniff.sub.html`

除了 HTML`<script>`标记之外，上面的示例还适用于其他使用 JavaScript 的网络功能，包括[类似脚本的目标](https://fetch.spec.whatwg.org/#request-destination-script-like)，如`importScripts()`、`navigator.serviceWorker.register()`、`audioWorklet.addModule()`等。

### CORB 对样式表的影响

CORB 对样式表应该没有明显的影响。

例子：

- **任何未标记为文本/css 的内容**
  - 标签中使用的资源示例`<link rel="stylesheet" href="...">`：
    - 正文：一个 HTML 文档或一个简单有效的样式表或一个多语言 HTML/CSS 样式表
    - `Content-Type: text/html`
    - 没有`X-Content-Type-Options`标题
  - 预期行为：**无明显差异**。即使没有 CORB，这样的样式表示例也会被拒绝，因为由于CSS[宽松的语法规则](https://scarybeastsecurity.blogspot.dk/2009/12/generic-cross-browser-cross-domain.html)，跨源 CSS 需要正确的 Content-Type 标头（限制因浏览器而异：[IE](http://msdn.microsoft.com/en-us/library/ie/gg622939(v=vs.85).aspx)、[Firefox](http://www.mozilla.org/security/announce/2010/mfsa2010-46.html)、[Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=9877)、[Safari](http://support.apple.com/kb/HT4070)（向下滚动到 CVE -2010-0051) 和[歌剧](http://www.opera.com/support/kb/view/943/))。此行为包含在[HTML 规范](https://html.spec.whatwg.org/C/#link-type-stylesheet)`text/css`中，其中 1) 如果嵌入样式表的文档已设置为怪癖模式并且具有相同的来源，则仅要求采用Content-Type，并且 2) 仅要求运行创建 CSS 样式表的步骤如果获取的资源的 Content-Type 是`text/css`.
  - WPT 测试：`fetch/corb/style-css-mislabeled-as-html.sub.html`,`fetch/corb/style-html-correctly-labeled.sub.html`
- **任何未标记为文本/css 的内容（nosniff）**
  - 标签中使用的资源 `<link rel="stylesheet" href="...">`：
    - 正文：一个简单的样式表
    - `Content-Type: text/html`
    - `X-Content-Type-Options: nosniff`
  - 预期行为：**无明显差异**。使用和不使用 CORB，样式表都不会加载，因为响应标头响应将导致响应在其 MIME 类型（在示例中）不是（ [Fetch 规范](https://fetch.spec.whatwg.org/#should-response-to-request-be-blocked-due-to-nosniff?)要求此行为）`nosniff`时被阻止。`text/html``text/css`
  - WPT测试：`fetch/corb/style-css-mislabeled-as-html-nosniff.sub.html`
- **带有 JSON 安全前缀的正确标记的样式表**
  - 标签中使用的资源`<link rel="stylesheet" href="...">`：
    - 正文：以[JSON 安全前缀开头的样式表](https://docs.angularjs.org/api/ng/service/$http#json-vulnerability-protection)
    - `Content-Type: text/css`
    - 没有`X-Content-Type-Options`标题
  - 预期行为：**没有区别**，因为对于标记为 的响应，不会执行CORB 嗅探[JSON 安全前缀](https://docs.angularjs.org/api/ng/service/$http#json-vulnerability-protection)`Content-Type: text/css`。
  - WPT测试：`fetch/corb/style-css-with-json-parser-breaker.sub.html`

### CORB 对其他网络平台功能的影响

CORB 对以下场景没有影响：

- **[XHR](https://xhr.spec.whatwg.org/)和[fetch()](https://fetch.spec.whatwg.org/#dom-global-fetch)**
  - CORB 没有明显的影响，因为[XHR](https://xhr.spec.whatwg.org/)和[fetch()](https://fetch.spec.whatwg.org/#dom-global-fetch)已经对响应应用了同源策略（例如，CORB 应该只阻止由于缺少 CORS 而导致跨源 XHR 错误的响应）。
- **[预取](https://html.spec.whatwg.org/C/#link-type-prefetch)**
  - CORB 阻止响应主体到达跨源渲染器，但 CORB 不会阻止响应主体被浏览器进程缓存（并随后传递到另一个同源渲染器进程）。
- **跟踪和报告**
  - 各种技术试图通过触发对记录用户访问的 HTTP 服务器的 Web 请求来检查用户是否访问了某些内容。Web 请求经常由`img`HTTP URI 的不可见元素触发，通常使用 204 或简短的 HTML 文档进行回复。除了`img`标签之外，网站还可以使用`style`和`script`其他标签来跟踪使用情况。
  - CORB 不会影响这些技术，因为它们不依赖于 HTTP 服务器返回的实际内容。这也适用于其他不关心响应的网络功能：信标、ping、CSP 违规报告等。
- **服务人员**
  - Service Worker 可以拦截跨域请求并在 Service Worker*中*人为地构建响应（即不跨域和/或安全边界）。CORB 不会阻止此类响应。
  - 当 service worker 缓存实际的跨源响应时（例如，在“no-cors”请求模式下），响应是“不透明的”，因此 CORB 可以在不改变 service worker 的行为的情况下阻止此类响应（“不透明”响应具有不可访问的体甚至没有 CORB）。
- **Blob 和文件 API**
  - 即使没有 CORB，获取跨源 blob URL 也会被阻止（请参阅https://github.com/whatwg/fetch/issues/666）。
  - WPT 测试：（`script-html-via-cross-origin-blob-url.sub.html`以及[此处提交所](https://github.com/mkruisselbrink/web-platform-tests/commit/9524a71919340eacc8aaa6e55ffe0b5aa72f9bfd)涵盖的导航请求测试）。
- **内容脚本和插件**
  - CORB 不包括这些——CORB 假定适当的安全策略由内容脚本和插件的某些其他机制强制执行（例如，Adobe Flash 通过 crossdomain.xml 实现类似 CORS 的机制[）](https://www.adobe.com/devnet/articles/crossdomain_policy_file_spec.html)。

### 量化 CORB 对现有网站的影响

CORB 已在可选的站点隔离模式和现场试验中启用，并且 Chromium 已被用来计算有多少符合 CORB 条件的响应被阻止。（符合 CORB 条件的响应不包括[导航请求](https://fetch.spec.whatwg.org/#navigation-request)和下载；请参阅上文“哪些类型的请求符合 CORB 条件？”部分。）我们对 2018 年 2 月 Chrome Canary 的初始数据的分析显示案例数量的上限较低对网页可见，并有可能进一步降低界限。

总体而言，**所有符合 CORB 条件的响应中有 0.961% 被阻止。** 然而，其中超过一半已经是空响应（即，实际上有一个`Content-Length: 0`响应标头），因此实际上不会导致行为改变（即，只有[非安全列表的](https://fetch.spec.whatwg.org/#cors-safelisted-response-header-name)标头会受到影响）。请注意，如果省略嗅探，几乎 20% 的响应将被阻止，因此嗅探显然是必要的。

仔细观察，**所有符合 CORB 条件的响应中有 0.456% 是非空和阻塞的。** 然而，这些情况中的大多数都属于上面小节中描述的不可观察的类别，例如将 HTML 响应作为跟踪像素传递给图像标签。

我们可以关注两组可能具有明显影响的受阻响应。

- 由于 nosniff 标头或范围请求，0.115% 的符合 CORB 条件的响应可能已被明显阻止。

   这特定于状态代码不是 204 的非空响应，请求的上下文不会以其他方式忽略错误标记的 nosniff 内容（例如，作为脚本标签）。在这个组内：

  - 其中 95.16% 是标记为图像标签请求的 HTML 的 nosniff 响应。这些被屏蔽并且可能包含真实图像。然而，我们预计其中许多案例实际上包含 HTML，并且无论如何都不会在图像标签中呈现（正如我们在一个案例中观察到的那样）。

> [ [creis@chromium.org](mailto:creis@chromium.org) ] 我们正在考虑通过嗅探这些响应来进一步降低这个界限，以确认有多少可能包含实际图像。

- 另外 3.76% 是来自媒体上下文的文本/纯文本范围请求。我们尚未在实践中找到示例，但我们正在考虑允许对 text/plain 的范围请求响应以避免此处中断。
- **所有符合 CORB 条件的响应中有 0.014% 是对脚本标签的无效输入**，因为 CORB 嗅探显示它们是 HTML、XML 或 JSON。同样，这特定于没有 204 状态代码的非空响应。这些案例在实践中应该具有最小的中断风险（例如，超过一半具有错误状态代码并且可能表示断开的链接），但在技术上可以根据是否报告语法错误来观察差异。

这些受影响案例的数量非常少，表明从 Web 兼容性的角度来看，CORB 很有前途。