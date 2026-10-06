# 深入理解内容安全策略（CSP）：保障网页安全的利器

在当今的网络环境中，安全问题始终是重中之重。内容安全策略（CSP）作为一个额外的安全层，为我们抵御多种网络攻击提供了有效的手段。

## 一、CSP 的作用与兼容性
CSP 主要用于检测并削弱特定类型的攻击，像跨站脚本（XSS）和数据注入攻击等。这些攻击是数据盗取、网站内容污染和恶意软件分发的主要途径。

CSP 具有良好的向后兼容性。不支持 CSP 的浏览器与实现了 CSP 的服务器能正常工作，不支持的浏览器会忽略 CSP，按照标准的同源策略处理网页内容。若网站不提供 CSP 标头，浏览器同样使用标准同源策略。不过要使CSP 可用，需要配置网络服务器返回 `Content-Security-Policy` HTTP 标头（旧版本的 `X-Content-Security -Policy` 标头已无需使用），也可以使用 `<meta>` 元素来配置策略，但某些功能（如发送 CSP 违规报告）只有使用 HTTP 标头时才可用。

![A CSP broken into its directives.](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP/csp-overview.svg)

## 二、CSP 缓解的攻击类型

（一）跨站脚本攻击（XSS）

XSS 攻击利用了浏览器对服务器获取内容的信任。恶意脚本能在受害者浏览器中运行，因为浏览器信任其内容来源。CSP 通过指定有效域，即浏览器认可的可执行脚本的有效来源，让服务器管理者有能力减少或消除 XSS 攻击的载体。CSP 兼容的浏览器只会执行从白名单域获取的脚本文件，可忽略内联脚本和 HTML 事件处理属性，甚至站点也可以选择全面禁止脚本执行。

（二）数据包嗅探攻击

除限制内容加载域，服务器还能指明允许使用的协议。例如从安全角度出发，服务器可指定所有内容必须通过 HTTPS 加载，完整的数据安全传输策略还包括为所有 cookie 标记 secure 标识，以及提供自动重定向使 HTTP 页面导向 HTTPS 版本，还可以使用 `Strict-Transport-Security` HTTP 标头确保浏览器只使用加密通道。

## 三、CSP 策略的制定与编写

（一）制定策略

通过 `Content-Security-Policy` HTTP 标头指定策略，策略参数是包含各种 CSP 策略指令的字符串。

（二）编写策略

策略由一系列策略指令组成，每个指令针对特定资源类型和策略生效范围。策略应包含 default - src 策略指令，在其他资源类型无符合策略时应用。为防止内联脚本运行和杜绝 eval（）的使用，可以包含 default - src 或者 script - src 指令；限制 `<style>` 元素或者 style 属性的内联样式可包含 default - src 或 style - src 指令。不同类型的项目（如字体、frame、图像等）都有各自特定的指令。

![CSP diagram showing source expressions](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP/csp-source-expressions.svg)

## 四、常见用例示例

（一）仅允许来自站点同一源（不包括子域名）的所有内容

```http
Content-Security-Policy: default-src 'self'
```



（二）允许内容来自信任域名及其子域名

```http
Content-Security-Policy: default-src 'self' *.trusted.com
```



（三）允许网页应用用户在自己内容中包含任意来源图片，但限制音频、视频来源并指定脚本来源

```http
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com
```



（四）线上银行网站确保所有内容通过 SSL 方式从特定域名获取

```http
Content-Security-Policy: default-src https://onlinebanking.jumbobank.com
```



（五）在线邮箱允许邮件包含 HTML、任意来源图片，但不允许加载 JavaScript 等危险内容

```http
Content-Security-Policy: default-src 'self' *.mailsite.com; img-src *
```



## 五、CSP 策略的测试

（一）仅报告（report - only）模式

CSP 可部署为仅报告模式来降低部署成本。在此模式下，CSP 策略不强制，但违规行为会报告给指定 URI 地址。可以用 `Content-Security-Policy-Report-Only` HTTP 标头指定策略。若 `Content-Security-Policy-Report-Only` 标头和 `Content-Security-Policy` 同时出现，前者策略仅产生报告不强制，后者策略具有强制性。

（二）启用报告

默认不发送违规报告，要启用需指定 report - to 策略指令并提供至少一个 URI 地址递交报告，同时要设置服务器接收、存储和处理报告。

```http
Content-Security-Policy: default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi
```



## 六、违规报告

（一）违规报告语法

报告 CSP 违规行为的推荐方法是使用[报告 API](https://developer.mozilla.org/en-US/docs/Web/API/Reporting_API)，在中声明端点并使用标头的指令[`Reporting-Endpoints`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Reporting-Endpoints)将其中一个端点指定为 CSP 报告目标。`Content-Security-Policy`[`report-to`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-to)

当发生 CSP 违规时，浏览器会通过 HTTP 操作将报告作为 JSON 对象发送到指定端点`POST`，其值为[`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)。`application/reports+json`报告是[`Report`](https://developer.mozilla.org/en-US/docs/Web/API/Report)对象的序列化形式，其中包含`type`值为 的属性`"csp-violation"`，以及`body`为 的对象的序列化形式[`CSPViolationReportBody`](https://developer.mozilla.org/en-US/docs/Web/API/CSPViolationReportBody)。

[`disposition`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#disposition)

- 根据 [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only) 和 `Content-Security-Policy` 标头使用情况的不同，值为 `"enforce"` 或 `"report"`。

[`document-uri`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#document-uri)

- 发生违规的文档的 URI。

[`original-policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#original-policy)

- 由 `Content-Security-Policy` HTTP 标头指定的原始策略值。

[`status-code`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP#status-code)

- 全局对象被实例化的资源的 HTTP 状态代码。

（二）违规报告案例

```JSON
{
  "age": 53531,
  "body": {
    "blockedURL": "inline",
    "columnNumber": 39,
    "disposition": "enforce",
    "documentURL": "https://example.com/csp-report",
    "effectiveDirective": "script-src-elem",
    "lineNumber": 121,
    "originalPolicy": "default-src 'self'; report-to csp-endpoint-name",
    "referrer": "https://www.google.com/",
    "sample": "console.log(\"lo\")",
    "sourceFile": "https://example.com/csp-report",
    "statusCode": 200
  },
  "type": "csp-violation",
  "url": "https://example.com/csp-report",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
}
```

你需要设置一个服务器来接收具有给定 JSON 格式和内容类型的报告。处理这些请求的服务器随后可以以最适合您需求的方式存储或处理传入的报告。

## 七、浏览器兼容性
在某些版本的 Safari 浏览器中存在特殊不兼容性，设置内容安全策略标头但未设置相同来源（Same Origin）标头时，会阻止自托管内容和站外内容并报错。

总之，CSP 是保障网页安全的重要技术，合理制定和运用 CSP 策略能够有效提升网页的安全性，抵御多种网络攻击。