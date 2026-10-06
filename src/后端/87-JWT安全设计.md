# 项目使用 JWT，Token 被别人拿到不就能登录吗？如何保证安全？

日期：2026-07-12  
标签：#面试 #八股 #后端 #JWT #认证 #安全 #场景题

## 一句话答案

JWT 本质是 Bearer Token，泄漏后在有效期内可被冒用；安全依赖 TLS、安全存储、短期有效、严格验签、Refresh Token 轮换、撤销机制和风险检测，而不是 JWT 自身防盗。

## 面试口语版

JWT 签名只能防篡改，不能防窃取，也不等于加密。Access Token 设为短有效期，只包含最小必要声明，服务端固定允许算法并校验 iss、aud、exp、nbf、kid；浏览器优先放 Secure、HttpOnly、SameSite Cookie，避免 localStorage 被 XSS 直接读取，同时处理 CSRF。Refresh Token 长期保存于服务端会话记录，采用一次性轮换和复用检测，退出或风险事件可撤销。敏感操作做二次认证，配合设备、IP 异常和并发会话检测。

## 关键细节

- 禁止接受 `alg=none` 或由客户端任意决定算法。
- 密钥放 KMS/Secrets，定期轮换并支持 kid 过渡。
- Token 不放密码、证件等敏感明文。
- 不用指纹做绝对绑定，移动网络和设备信息会变化，可作为风险信号。

## 面试官追问

1. JWT 如何立即失效？
2. Refresh Token 轮换如何发现被盗？
3. Cookie 存 JWT 如何防 CSRF？

## 面试官追问参考答案

### 1. JWT 如何立即失效？

维护用户 sessionVersion、jti 黑名单或服务端活跃会话，敏感请求查询撤销状态；同时缩短 Access Token 有效期并撤销 Refresh Token。完全无状态 JWT 无法做到立即撤销。

### 2. Refresh Token 轮换如何发现被盗？

每次刷新返回新 Token 并使旧 Token 失效，服务端保存 Token family。若已使用过的旧 Token 再次出现，说明可能被复制，应撤销整个 family、终止会话并要求重新登录。

### 3. Cookie 存 JWT 如何防 CSRF？

设置 SameSite，并对跨站业务使用 CSRF Token/双重提交校验，验证 Origin/Referer；敏感操作不使用 GET。HttpOnly 防脚本读取，但不能单独防浏览器自动携带 Cookie 的 CSRF。

## 学习清单

- [ ] 理解签名、防窃取和撤销是不同问题。
- [ ] 掌握短 Access Token 与 Refresh Token 轮换。

