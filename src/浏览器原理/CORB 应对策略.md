## [我如何确保 CORB 保护我网站上的资源？](https://www.chromium.org/Home/chromium-security/corb-for-developers/#how-can-i-ensure-corb-protects-resources-on-my-website)

为确保您网站上的敏感资源（例如包含用户特定信息的页面或 JSON 文件，或包含 CSRF 令牌的页面）不会泄漏到其他 Web 源，请采取以下步骤将它们与允许的资源区分开来由任何站点嵌入（例如，图像、JavaScript 库）。

### [对于 HTML、JSON 和 XML 资源：](https://www.chromium.org/Home/chromium-security/corb-for-developers/#for-html-json-and-xml-resources)

确保这些资源使用以下列表中的正确“Content-Type”响应标头以及“X-Content-Type-Options：nosniff”响应标头提供。这些标头确保 Chrome 可以将资源识别为需要保护，而不依赖于资源的内容。

- [HTML MIME 类型](https://mimesniff.spec.whatwg.org/#html-mime-type) - “文本/html”
- [XML MIME 类型](https://mimesniff.spec.whatwg.org/#xml-mime-type)- “text/xml”、“application/xml”或任何子类型以“+xml”结尾的 MIME 类型
- [JSON MIME 类型](https://mimesniff.spec.whatwg.org/#json-mime-type) - “text/json”、“application/json”或子类型以“+json”结尾的任何 MIME 类型

请注意，我们建议不要支持对敏感资源的**多部分** [范围请求](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests)，因为这会将 MIME 类型更改为 multipart/byteranges 并使 Chrome 更难保护。典型的范围请求不是问题，处理方式与 nosniff 情况类似。

除了上述推荐的情况外，Chrome 还将尽力保护标有上述任何 MIME 类型且没有“nosniff”标头的响应，但这有局限性。不幸的是，网络上的许多 JavaScript 文件都使用其中一些 MIME 类型进行了标记，如果 Chrome 阻止了对它们的访问，现有网站就会崩溃。因此，当“nosniff”标头不存在时，Chrome 首先查看文件的开头以尝试确认它是 HTML、XML 还是 JSON，然后再决定是否保护它。如果它不能确认这一点，它允许跨站点页面的进程接收响应。这是一种尽力而为的方法，它在保持与现有站点的兼容性的同时增加了一些有限的保护。我们建议网络开发人员包括“nosniff”

### [对于其他资源类型（例如 PDF、ZIP、PNG）：](https://www.chromium.org/Home/chromium-security/corb-for-developers/#for-other-resource-types-eg-pdf-zip-png)

确保这些资源仅在响应包含不可猜测的 CSRF 令牌的请求时提供（应通过上述 HTML、JSON 或 XML 步骤保护的资源分发）。

## [Chrome 报CORB 警告怎么办？](https://www.chromium.org/Home/chromium-security/corb-for-developers/#what-should-i-do-about-corb-warnings-reported-by-chrome)

当 CORB 阻止 HTTP 响应时，它会向 Chrome 中的 DevTools 控制台发出以下警告消息：

> 跨源读取阻止 (CORB) 阻止跨源响应 https://www.example.com/example.html MIME 类型为 text/html。有关详细信息，请参阅 [https://www.chromestatus.com/feature/5629709824032768 。](https://www.chromestatus.com/feature/5629709824032768)

> （在 Chrome 66 及更早版本中，此消息略有不同：Blocked current origin from receiving cross-site document at https://www.example.com/example.html with MIME type text/html。）

在大多数情况下，被阻止的响应不应影响网页的行为，并且可以安全地忽略 CORB 错误消息。例如，当被阻止的响应的主体已经为空时，或者当响应将被传递到无法处理它的上下文（例如，HTML 文档，如 404 错误页面）时，可能会出现警告传送到 <img> 标签）。 ***注意：** Chrome 将停止在 Chrome 69 中显示空响应或错误响应的警告消息，因为这些是不影响网站行为的误报。如果您在 Chrome 67 或 68 中看到 CORB 警告，请在 Chrome 69 中测试网站以查看是否仍然存在任何警告。*

在极少数情况下，CORB 警告消息可能表明网站存在问题，当某些响应被阻止时，这可能会破坏其行为。例如，带有“X-Content-Type-Options: nosniff”响应标头和不正确的“Content-Type”响应标头的响应可能会被阻止。例如，这可能会阻止被错误标记为“Content-Type：text/html”和“nosniff”的实际图像。如果发生这种情况并干扰页面的行为，我们建议通知网站并要求他们更正响应的“Content-Type”标头。

如果您怀疑 Chrome 错误地阻止了响应并且这正在破坏网站的行为，[请提交 Chromium 错误](https://goo.gl/XBoKtY)，描述错误阻止的响应（标头和正文）和/或提供它的 URL。您可以通过使用以下命令行标志启动 Chrome，暂时禁用它来确认问题是否由 CORB 引起：

```
--disable-features=CrossSiteDocumentBlockingAlways,CrossSiteDocumentBlockingIfIsolating
```

