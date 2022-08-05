---
date: 2022-07-18
category:
- 面试题
tag:
- 前端安全
---

# 前端开发安全

## 攻击篇

### Cross-Site Scripting(XSS) 跨站脚本攻击

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241846476.png" alt="img" style="zoom: 25%;" /><img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241846618.png" alt="img" style="zoom:25%;" />

#### Demo

<img src="https://internal-api.feishu.cn/space/api/box/stream/download/wps/auth_code/?code=90e4f8091ee8e94b486779e653358843_8afbbfa1cbbafee7_VADUGKB3DO_CINI158S77PPK6VD37QFL6V8A4" alt="img" style="zoom: 50%;" />

通过恶意提交脚本注入正常HTML页面

<img src="https://internal-api.feishu.cn/space/api/box/stream/download/wps/auth_code/?code=cbaad21f3c2c0d12f2806acc356d5e82_8dc0e7bfcc81a6f9_IKAU5OJ3DO_SIK1CFMHR6SAB6GBPUS9A5F2S8" alt="img" style="zoom: 50%;" />

#### Stored XSS 

- 脚本被存储在数据库中
- 访问页面-> 读取数据 = 被攻击
- 危害最大，对全部用户可见

<img src="https://internal-api.feishu.cn/space/api/box/stream/download/wps/auth_code/?code=bc64f5b1b246356e624bc5a55a194b0a_d28c81ea93cdc0ac_5VPJJ5J3DO_129ETFV746KT3MMHL6C2VSPPIO" alt="img" style="zoom:33%;" />

#### Reflected XSS 

- 不涉及数据库
- 从URL上的参数进行攻击

**Demo**

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241852450.png" alt="img" style="zoom: 25%;" />

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241848767.png" alt="img" style="zoom: 50%;" />

#### DOM-based XSS

- 不需要服务器的参与
- 恶意攻击的发起 + 执行，全在浏览器完成

**Demo**

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241852450.png" alt="img" style="zoom: 25%;" />

![image-20220124185229575](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241852617.png)

#### Reflected vs DOM-based

主要区别在于注入脚本的地方

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241856355.png" alt="2b25df0e-6c92-4e6a-90a4-d4f637640467" style="zoom: 25%;" />

#### Mutation-based XSS

主要针对的是个别特殊浏览器对Dom内容的优化和处理，需要非常了解各浏览器核心的特性

- 利用浏览器渲染 DOM 的特性（独特优化）

- 不同浏览器会有区别（按照浏览器进行攻击）

### Cross-site request forgery(SCRF)

- 在用户不知情的前提下
- 利用用户权限（cookie）
- 构造指定HTTP请求，窃取或修改用户敏感信息

![image-20220124190212328](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241902405.png)

#### CSRF--GET

![image-20220124193950217](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241939316.png)

![image-20220124193959001](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241939082.png)

#### Beyond Get 隐藏表单

![image-20220124194042853](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241940963.png)

### SQL 注入 Injection

![image-20220124194114187](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241941320.png)

#### Demo SQL 语句注入

![image-20220124194205165](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241942268.png)

![image-20220124194217487](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241942567.png)

#### 执行代码注入

![image-20220124194455987](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241944035.png)

准备跑路

![image-20220124194511030](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241945063.png)

![image-20220124194520743](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241945813.png)

#### 读取 + 修改 被暴露的重要文件

![image-20220124194640752](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241946869.png)

#### SSRF (Server-Side Request Forgery) Demo

- 请求用户自定义的callback URL
- web server 通常有内网访问权限（绕开限制）

![image-20220124195207336](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241952440.png)

### DoS Denial of Service 拒绝服务

透支消耗服务器资源，使服务器来不及响应更多资源，导致请求挤压，进而雪崩

#### ReDos：基于正则表达式的Dos

不使用贪婪模式情况

![image-20220124195811420](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201241958546.png)

**导语**

`ReDoS(Regular expression Denial of Service)` 正则表达式拒绝服务攻击。

**概述**

`DFA`对于文本串里的每一个字符只需扫描一次，比较快，但特性较少；`NFA`要翻来覆去吃字符、吐字符，速度慢，但是特性(如:分组、替换、分割)丰富。

`NFA`支持 `惰性(lazy)`、`回溯(backtracking)`、`反向引用(backreference)`，`NFA`缺省应用`greedy`模式，`NFA`可能会陷入递归险境导致性能极差。

**说明**

我们定义一个正则表达式`^(a+)+$`来对字符串`aaaaX`匹配。使用`NFA`的正则引擎，必须经历`2^4=16`次尝试失败后才能否定这个匹配。

同理字符串为`aaaaaaaaaaX`就要经历`2^10=1024`次尝试。如果我们继续增加`a`的个数为20个、30个或者更多，那么这里的匹配会变成指数增长。

**防范手段**

防范手段只是为了降低风险而不能百分百消除 `ReDoS` 这种威胁。当然为了避免这种威胁的最好手段是尽量减少正则在业务中的使用场景或者多做测试, 增加服务器的性能监控等。

- 降低正则表达式的复杂度, 尽量少用分组
- 严格限制用户输入的字符串长度(特定情况下)
- 使用单元测试、fuzzing 测试保证安全
- 使用静态代码分析工具, 如: sonar
- 添加服务器性能监控系统, 如: zabbix

#### Logical Dos

- 耗时的同步操作
- 数据库写入
- SQL join
- 文件备份
- 循环执行逻辑

#### DDoS Distributed Dos

肉鸡、僵尸攻击

- 直接访问IP
- 任意API
- 消耗大量带宽

<img src="https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201242023570.png" alt="image-20220124202357468" style="zoom: 50%;" />

### 中间人攻击

![image-20220124202428940](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201242024014.png)

## 防御篇

https://bytedance.feishu.cn/file/boxcnjxLMwfSiMoZyxvTer1npHg
