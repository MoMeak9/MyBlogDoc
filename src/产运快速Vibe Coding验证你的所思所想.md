我现在有个想法，我想看看效果，但是我没有代码基础，只有几句话我不知道如何变成一个工程项目（对话框是低效的）

你有的：
- 产品文档
- 聊天记录
- 会议纪要

你需要准备的：
- Chat-GPT/Gemini AI/Claude Code账号
- Claude Code/Codex 编码工具
- 强化工具：https://github.com/obra/superpowers
- AI 资源：MiniMax-Key 或者 beats 平台 Key

开始工作：
- 写提示词的提示词 （解决我不会写提示词的问题）：我需要将一份产品构想转化为真实 Demo 工程，需要你帮我写一份提示词，目标是将产品文档转化为技术规格文档，以前端 Node. Js 技术栈为主，尽可能不考虑 DB、Docker 等部署场景。
	- https://chatgpt.com/c/69ce454c-c374-8332-96ad-433d7c32e0ff
- 审核提示词，开启 DeepSearch（AI 的脑子是有限的，得加上互联网的内容）
	- https://chatgpt.com/c/69ce465c-70ec-8331-986b-ab6f635770c0
	- 通过问答的方式，调整你的“规格文档”，规范驱动开发（SDD），不需要开启 DeepSearch 了，你的 AI 知道的上下文已经足够了
**半个小时过去了...**
- 开始实现，以 Claude Code 为例，工程化最优模型，其次使用 Codex，不要使用国产模型
	- 基于技术规格文档，着手开始实现项目，最后告知我需要提供什么配置，以及如何进行体验和测试
- 如何调试呢？
	- AI 帮我安装环境、启动项目
	- AI 帮我测试（https://github.com/ChromeDevTools/chrome-devtools-mcp）
	- AI.... 如何描述问题 -> 截图

**3-8 个小时过去了....**