> 链接：https://thenewstack.io/5-javascript-security-best-practices-for-2024/
>
> 作者：Alexander T. Williams
>
> 原标题：5 JavaScript Security Best Practices for 2024

网络安全已成为一个瞬息万变的战场，JavaScript 应用程序的安全性也不例外。Web 应用程序已成为黑客试图获取敏感数据和财务详细信息的常见目标，这凸显了 [JavaScript Web 应用程序在](https://thenewstack.io/a-developers-step-by-step-guide-to-app-security/) 2024 年的重要性。

本文将探讨 2024 年最新的 JavaScript 最佳实践，解决最常见的漏洞以及如何缓解这些漏洞。除此之外，我们还在解决保护 API、[防止跨站点脚本 （XSS） 攻击](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)以及实施内容安全策略 （CSP） 的问题。

此外，我们还将评估最新的安全工具和技术，这些工具和技术可帮助开发人员保护其 JavaScript 应用程序免受现代威胁。

## 2024年常见JavaScript安全漏洞

JavaScript （JS） 应用程序可以通过多种方式成为网络犯罪分子的目标，特别是通过使用一系列策略和技术利用 JS [的客户端执行](https://www.geeksforgeeks.org/what-is-client-side-exploitation/)。让我们快速回顾一下 2024 年需要防范的一些最常见的 JavaScript 漏洞。

- **跨站点脚本 （XSS）：** 恶意脚本被注入易受攻击的应用程序或网站中，使黑客能够操纵 Web 浏览器返回的内容。
- **中间人攻击 （MitM）：**涉及黑客将自己定位在应用程序和用户之间以获取敏感数据的攻击的总称。
- **拒绝服务攻击 （DoS）：**一种攻击，它用无数的请求淹没服务器，使应用程序脱机。
- **跨站请求伪造 （CSRF）：**一种恶意漏洞，诱骗授权用户执行意外操作，例如提交金融交易。
- **会话劫持：**黑客可能会使用一系列技术来窃取用户的唯一会话 ID，从而使他们能够劫持活动会话。

## 当前的 JavaScript 安全最佳实践

JavaScript 开发人员在构建应用程序时需要充分了解网络安全漏洞。这是因为，从根本上说，JavaScript 在设计时并没有考虑到安全性——这意味着黑客可以很容易地输入恶意脚本。使用[各种第三方库和框架](https://thenewstack.io/top-10-javascript-libraries-to-use-in-2024/)会增加应用程序的攻击面，使此问题进一步复杂化。

下面我们概述了 2024 年的五种安全最佳实践，所有开发人员都需要将这些最佳实践集成到他们的 JavaScript 开发过程中。从定期审计到输入清理，在开发的所有阶段都[遵守安全设计原则](https://sternumiot.com/iot-blog/secure-by-design-compliance-aspects-principles-and-best-practices/)对于最大限度地减少漏洞并确保快速解决任何威胁至关重要。

**1. 保护 API**

许多 API 都是在 Node.js（领先的 JavaScript 运行时）中构建的，通常使用具象状态传输 （REST） 架构。[在 Node.js 中保护 REST API](https://www.turing.com/kb/build-secure-rest-api-in-nodejs) 时，有几个关键注意事项：

- 始终对所有 API 使用 HTTPS，以防止对数据进行未经授权的访问。
- [使用访问控制列表](https://www.computernetworkingnotes.com/ccna-study-guide/access-control-list-explained-with-examples.html) （ACL） 将访问权限限制为仅授权用户。
- 实施身份验证方法以防止未经授权的访问。[使用 API 密钥](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys/)是最常见的身份验证形式，但 Node.js 也支持其他方法，例如 [OAuth 和 JWT](https://frontegg.com/blog/oauth-vs-jwt)。
- 配置输入验证，防止将恶意或错误数据发送到 API。

**2. 实施内容安全策略 （CSP）**

任何 JavaScript Web 应用程序[都需要具有内容安全策略 （CSP），](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)这是一种浏览器安全标准，规定了浏览器可以加载的内容——无论是域、子域还是资源。如果没有 CSP，黑客可以利用跨站点脚本漏洞，从而导致数据泄露。

若要启用 CSP，应用程序和网站需要具有 CSP 标头或使用 CSP 元标记，告诉浏览器允许加载什么。同时，CSP 指令提供了进一步的控制，说明允许哪些域加载特定类型的资源。

注意：在可以将任何域分配给 CSP 指令之前，你应了解并清点每个域加载的[每种资源类型](https://www.ardoq.com/knowledge-hub/application-inventory-management)，以避免任何功能损失。

**3. 输入消毒**

在 JavaScript 中，输入清理是指清理和验证用户输入的任何数据，包括检查格式问题。这样可以避免输入错误，同时还可以在执行恶意代码之前将其删除。除了增强安全性外，输入清理还可以提高应用程序的性能和可用性，同时显着[减少调试输入错误所花费的时间](https://www.shakebugs.com/blog/app-debugging-time-tactics/)，确保输入数据始终有效。

JavaScript 中最常见的输入审查形式是逃避用户输入，这一过程可以减少恶意输入的机会，例如用于发起 XSS 攻击的脚本。转义用户输入涉及对可能被错误或恶意使用的特殊字符进行编码。

**4. 防止跨站脚本 （XSS） 攻击**

除了清理用户输入和实施内容安全策略外，还可以通过[验证和编码输入](https://aptori.dev/blog/input-validation-output-encoding-api-security-testing)来防止 XSS 攻击，此外还可以[使用仅限 HTTP 的 Cookie](https://cookie-script.com/documentation/httponly-cookies)。验证用户输入可确保在页面上显示数据之前，仅使用允许的字符。此外，编码输入会将任何特殊字符转换为 Web 浏览器无法执行的 HTML 实体，从而增加了额外的安全层。

还建议使用仅限 HTTP 的 cookie，因为这些 cookie 只能由 Web 服务器访问，而不能由客户端 JavaScript 代码访问。因此，防止黑客注入恶意代码。

**5. 定期安全审计**

定期进行安全审计[对于识别 JavaScript 应用程序中的潜在漏洞](https://www.learnwithjason.dev/blog/audit-logging-node-express/)至关重要。这[延伸到数字资产管理系统](https://www.mediavalet.com/what-is-digital-asset-management)，其中定期审计确保资产得到适当的保护和管理，从而降低未经授权访问的风险。

典型的 JavaScript 安全审计可能包括以下步骤：

1. [检查依赖项](https://dev.to/katepapineni/how-to-check-for-missing-unused-or-out-of-date-javascript-dependencies-34i5)，通过使用 [Dependabot 等工具](https://docs.github.com/en/code-security/dependabot?ref=blog.arcjet.com)可以保持更新，以便在新版本或安全补丁可用时接收通知。
2. 确保输入验证和清理正确无误。
3. 确保没有环境变量或组件在客户端公开。
4. [确认所有安全标头都已实现](https://web.dev/articles/security-headers)。除了 CSP 之外，应用程序还应包含 Strict-Transport-Security （HSTS）、X-Content-Type-Options、Permissions-Policy 和 Referrer-Policy 标头。
5. 验证所有关键功能是否都已集中进行，以避免不一致并优化测试、审计和维护。
6. 使用内置的代码编辑器安全工具（[如 linting](https://www.perforce.com/blog/qac/what-is-linting#:~:text=Linting is the automated checking,a Unix utility for C.) 和静态分析）来突出显示潜在的安全问题。

## JavaScript 开发人员需要了解的安全工具

如果没有正确的工具和技术，在开发 JavaScript 应用程序时遵循最佳实践是困难的，如果不是不可能的话。以下是 [2024 年我们最喜欢的一些 Web 应用程序安全工具](https://thenewstack.io/4-essential-tools-for-protecting-apis-and-web-applications/)。

### Snyk

这个开发人员优先的安全平台可以自动识别 JavaScript 代码、依赖项和容器中的漏洞。通过访问自己的安全数据库并实时使用逻辑编程规则，[Snyk](https://snyk.io/) 可以在编码时突出显示任何漏洞。

### OWASP 开发的 Zed Attack Proxy （ZAP）

[Zed Attack Proxy （ZAP）](https://www.zaproxy.org/) 是一种用于 Web 应用程序的开源渗透测试工具，支持[自动和手动测试](https://amatas.com/blog/the-pros-and-cons-of-manual-and-automated-penetration-testing/#:~:text=Manual penetration testing provides detailed,the strengths of each approach.)。ZAP 因其易用性和不同技能水平的可访问性而受到青睐，是突出安全问题的理想开发工具。

ZAP的 heads-up display（HUD）用户界面可以叠加在Web应用程序上，使开发人员能够在Web浏览器中进行实时测试。ZAP 市场还提供广泛的附加组件，以进一步提高该工具的功能。

ZAP是一种开源解决方案，有望[帮助控制安全成本](https://thenewstack.io/tips-for-controlling-the-costs-of-security-tools/)并使大型项目更加可行。

### Cypress 测试框架

[Cypress](https://www.cypress.io/) 通常比 [Selenium 等 JavaScript 测试框架](https://www.browserstack.com/guide/cypress-vs-selenium)更受欢迎，因为它具有快速执行、可靠性、实时处理、可视化调试功能和 API 测试功能。它的简单性使其在开发人员中非常受欢迎，使他们能够创建定制的安全测试，这些测试可以作为持续集成 （CI） 方法的一部分自动运行。

## 结论

使用 JavaScript 编码的 Web 应用程序可能包含一系列漏洞，如果开发人员不遵守安全流程和最佳实践，则可能会遗漏这些漏洞。

最佳实践包括[实施 API 安全性](https://thenewstack.io/secure-the-web-with-an-api-driven-backend-for-frontend/)、内容安全策略 （CSP） 和输入审查，而跨站点脚本 （XSS） 等攻击可以通过确保输入数据得到验证和编码来防止。

为了制定有效的 JavaScript 安全策略，开发人员还必须定期进行审计，检查应用程序可能存在安全风险的每个方面。