import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as d,a as n,b as e,d as v,e as a,r}from"./app.d7b34baa.js";const c={},m=n("h1",{id:"解决-chrome浏览器翻译功能无法使用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#解决-chrome浏览器翻译功能无法使用","aria-hidden":"true"},"#"),e(" 解决 Chrome浏览器翻译功能无法使用")],-1),u=n("p",null,"近日(2022.09.25)起，Chrome浏览器翻译功能逐渐在中国大陆无法使用。是由于谷歌撤销了谷歌中国翻译服务，将https://translate.google.cn/ 业务转移到了 海外。 导致大陆用户无法访问谷歌翻译。",-1),t=n("p",null,"Chrome浏览器的翻译功能是浏览器核心调用的API，不支持读取浏览器设置的代理服务器。 所以浏览器插件设置的浏览器代理无法解决翻译问题。",-1),o=n("p",null,"解决方案有两种：",-1),b=n("li",null,[e("使用 "),n("strong",null,"Clash"),e(" 等客户端")],-1),_=n("li",null,[e("安装 Chrome 浏览器上的第三方网页翻译插件，比如 "),n("strong",null,"腾讯翻译、Mate Translate"),e(" 等")],-1),h={href:"https://www.lingfenmao.com/it/5446.html",target:"_blank",rel:"noopener noreferrer"},p=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 注意：这些 IP 日后有可能会失效，如果你找到可用的也欢迎分享
# 修改前，你也可以先 ping 一下此 IP 地址是否正常
113.108.239.162 translate.google.com
113.108.239.162 translate.googleapis.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>理论上只要你修改 Hosts 的 IP 地址能访问，谷歌翻译功能就可以恢复正常使用。当然了，这些目前可用的服务器 IP 日后到底会不会全部失效，谁也说不准，且用且珍惜吧。</p><p>短期内，此方法可以暂时恢复解决谷歌浏览器的翻译功能不能用的问题。除此之外，如果你在办公、学习过程中特别需要使用翻译，那么也可以试一试自带必应翻译的 Edge 浏览器，或者安装 Chrome 浏览器上的第三方网页翻译插件，比如 <strong>腾讯翻译、Mate Translate</strong> 等</p><p>其他谷歌中国可用IP，任选其一,请自行测试。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>上海/电信：
180.163.150.34
180.163.151.34
180.163.151.162
180.163.150.162
180.163.150.33

上海/移动：
120.253.253.226
120.253.253.98
120.253.250.226
120.253.255.162
120.253.253.34
120.253.255.98
120.253.253.162
120.253.255.34

上海/Google数据中心/电信：
203.208.40.98
203.208.41.98
203.208.41.66
203.208.41.34
203.208.40.66
203.208.41.97
203.208.40.97
203.208.40.65
203.208.40.34

北京/电信：
220.181.174.226
220.181.174.34
220.181.174.98
220.181.174.162
220.181.174.33
203.208.50.162

北京/Google数据中心/电信：
203.208.43.66
203.208.39.194
203.208.50.66
203.208.43.98
203.208.50.34
203.208.39.226

北京/联通：
114.250.64.34
114.250.70.34
114.250.63.34
114.250.66.34
114.250.65.34

广州/电信：
113.108.239.226
58.63.233.98
113.108.239.162

广州/移动：
120.241.147.162
120.232.181.162

广州/联通：
58.254.137.226
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function g(x,f){const i=r("ExternalLinkIcon");return l(),d("div",null,[m,u,t,o,n("ol",null,[b,_,n("li",null,[e("修改系统hosts文件,增加如下两行。教程："),n("a",h,[e("hosts文件如何修改 - 零分猫"),v(i)])])]),p])}const P=s(c,[["render",g],["__file","浏览器翻译.html.vue"]]);export{P as default};
