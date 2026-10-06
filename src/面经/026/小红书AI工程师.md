# 小红书 AI 工程师面经

## 一面（技术基础）

### 1. Promise 状态机与 async/await 异常

- **Promise:** 核心是维护一个状态（Pending -> Fulfilled/Rejected）和一个回调队列（`onFulfilled`, `onRejected`）。状态一旦改变不可逆。
- **async/await 异常:** `async` 函数其实是 Generator + 自动执行器的语法糖。
  - 当 `await` 后面的 Promise reject 时，执行器会通过 `generator.throw(error)` 将错误抛回 Generator 内部。
  - 因此可以使用同步的 `try/catch` 捕获异步错误。

### 2. AI 流式输出：SSE vs WebSocket

- **SSE (Server-Sent Events):**
  - **特点:** 基于 HTTP，单向通信（服务端 -> 客户端），自动重连，轻量级。
  - **AI 场景:** **首选方案**（如 ChatGPT）。因为 LLM 对话通常是“一问多答”的流式文本，不需要复杂的双向实时通信。
- **WebSocket:**
  - **特点:** TCP 协议，全双工，支持二进制。
  - **AI 场景:** 适用于需要实时语音打断、多模态实时交互（视频流+文字流）或多人协作 Coding 的场景。

### 3. TypeScript interface vs type

- **区别:**
  - **Interface:** 支持**声明合并**（Declaration Merging），适合定义库的公共 API 或对象结构。
  - **Type:** 支持**联合类型**（Union）、交叉类型、映射类型（Mapped Types）。
- **必须用 type 的场景:** 定义基本类型的别名（`type ID = string`）、联合类型（`type State = 'loading' | 'success'`）、元组（Tuple）。

### 4. 浏览器解析 AI 返回的 Markdown (流式)

这是富文本/编辑器领域的强项。

- **难点:** 流式数据可能导致 Markdown 语法符号（如 `**bold**`）被截断（如只收到 `**bo`），直接解析会导致样式闪烁或结构错乱。
- **解法:**
  1. **增量解析 (Incremental Parsing):** 使用支持 stream 的 parser（或者自行缓存未闭合的 token）。
  2. **防抖/缓冲:** 不要每收到一个字符就 render，而是积攒一小段或按换行符 buffer。
  3. **React 优化:** 使用 `React.memo` 控制渲染粒度，避免整个文档重绘。

### 5. [手写] 实现简单的 TextDecoder 处理流式字节

AI 返回的 chunk 经常将一个宽字符（如中文 UTF-8 占3字节）切断，导致乱码。

**代码示例:**

```javascript
class StreamDecoder {
  constructor() {
    this.buffer = new Uint8Array(0)
  }

  decode(chunk) {
    // chunk 是 Uint8Array
    // 1. 合并旧 buffer 和新 chunk
    const newBuffer = new Uint8Array(this.buffer.length + chunk.length)
    newBuffer.set(this.buffer)
    newBuffer.set(chunk, this.buffer.length)

    // 2. 找到最后一个完整的字符边界
    // UTF-8 规则：如果字节以 10xxxxxx 开头，它是多字节字符的后续字节
    let i = newBuffer.length - 1
    while (i >= 0 && i >= newBuffer.length - 4) {
      // UTF-8 最多4字节
      // 如果是单字节字符 (0xxxxxxx) 或多字节的头 (11xxxxxx)，则此处是完整边界
      // 这里简化判断：只要不是延续字节，且后面长度足够，就是完整的。
      // 更简单的做法是利用 TextDecoder 的 stream 选项
      break
    }

    // 面试通常期望利用原生 TextDecoder 的 stream 选项，或者手动处理截断
    // 生产环境解法（推荐回答）：
    // return this.nativeDecoder.decode(chunk, { stream: true });

    // 手写模拟核心逻辑：保留末尾不完整的字节
    // (此处省略复杂的 UTF-8 位运算细节，面试建议直接写下面的原生 API 封装)
  }
}

// 推荐的标准答案：
class SimpleTextDecoder {
  constructor() {
    this.decoder = new TextDecoder("utf-8")
  }

  decode(chunk) {
    // stream: true 会内部缓存未完成的字节
    return this.decoder.decode(chunk, { stream: true })
  }
}
```

### 6. Flex vs Grid

- **Flex:** 一维布局（流式）。适合组件内部对齐、导航栏。
- **Grid:** 二维布局（网格）。适合页面整体骨架、复杂的 Dashboard 布局。

---

## 二面（深入原理与项目）

### 1. React Fiber 与 AI 长文本

- **Fiber:** 解决了 **"Stack Reconciler" 无法中断**的问题。通过链表结构将渲染任务拆分为小单元（Time Slicing）。
- **AI 优势:** 当 AI 瞬间吐出大量 Markdown 代码块时，Fiber 允许浏览器在渲染这些重型 DOM 的间隙，优先响应用户的**输入打字**或**停止生成**按钮的点击，避免页面假死（Input Lag）。

### 2. AI Coding 助手：Monaco Editor 性能优化

- **Web Worker:** 将语法高亮、TS 语言服务、Lint 检查全部移到 Worker 线程。
- **Decorations 优化:** AI 生成代码时会有大量高亮/Diff。避免全量 `deltaDecorations`，计算最小 Diff 范围更新。
- **隐藏 DOM:** 对话历史中的旧代码块，使用 `content-visibility: auto` 或手动卸载 Monaco 实例（只保留截图或高亮后的 HTML），只在编辑时实例化 Monaco。

### 3. Prompt 模板引擎设计

- **核心模块:**
  - **解析器:** 识别 `{{variable}}` 语法。
  - **变量替换:** 支持 String, Function, 甚至是异步数据源。
  - **Context 管理:** **Token 计数器**（必须做，防止爆 Token），动态截断历史消息（Sliding Window）。
  - **防御:** 防止 Prompt Injection（注入攻击）。

### 4. RAG 知识库预览与引用

- **数据结构:** 后端返回文本时携带 `citations: [{ id: 'doc1', start_index: 10, end_index: 20 }]`。
- **渲染:**
  - 前端解析流式文本，维护一个 `currentIndex`。
  - 当渲染范围命中引用区间时，插入交互式组件（`<CitationTag />`）。
  - **交互:** Hover 时通过 `id` 异步拉取文档摘要或切片并在 Popover 中展示。

### 5. 长列表对话性能

- **虚拟滚动 (Virtual Scroll):** 必须使用。由于对话气泡高度不固定，需要支持**动态高度**的虚拟列表（如 `react-virtuoso`）。
- **Memoization:** 锁死历史消息组件，除非 ID 变动，否则不重绘。
- **DOM 瘦身:** 历史代码块如果是只读的，不要用 Monaco，用 `Shiki` 或 `PrismJS` 渲染成静态 HTML。

### 6. [手写] 带并发控制的请求调度器

这是非常标准的考题，针对 AI 场景（如并发请求 embedding 或多个 agent 思考）。

```javascript
class Scheduler {
  constructor(max) {
    this.max = max
    this.count = 0
    this.queue = []
  }

  async add(task) {
    if (this.count >= this.max) {
      // 阻塞：返回一个新的 Promise，把 resolve 权柄放进队列
      await new Promise(resolve => this.queue.push(resolve))
    }

    this.count++
    try {
      return await task()
    } finally {
      this.count--
      if (this.queue.length > 0) {
        // 唤醒队列中的下一个任务
        const next = this.queue.shift()
        next()
      }
    }
  }
}

// 用法
// const scheduler = new Scheduler(2);
// scheduler.add(() => fetchLLM(...));
```

### 7. AI 安全：XSS 与 恶意内容

- **Markdown XSS:** AI 可能输出 `<img src=x onerror=alert(1)>`。必须在 Markdown 解析后、渲染 HTML 前使用 **DOMPurify** 进行清洗。
- **恶意链接:** 拦截所有 `<a>` 标签点击，通过中间页提示风险，或仅允许白名单域名。
- **沙箱:** 如果 AI 生成 HTML/JS 让用户预览，必须放在 `<iframe>` (sandbox 属性) 或 WebContainer 中。

### 8. Web Worker 在 AI 前端用途

- **Token 计算:** 使用 `tiktoken` 等库在前端计算 Token 数，属于 CPU 密集型，必须放 Worker。
- **Markdown 解析:** 大段文本解析。
- **端侧模型:** 运行 WebLLM / Transformers.js，完全在 Worker 中推理，避免阻塞 UI。

---

## 三面（架构与综合能力）

### 1. AI Coding 助手前端架构设计

核心要展示模块化和分层思想：

- **接入层:** 适配不同 LLM (OpenAI, Claude, 本地模型) 的 Stream 适配器。
- **状态层:** 全局 Context 管理（当前文件代码、选区、终端报错、用户 Query）。
- **交互层 (UI):** Chat Panel, Inline Edit (Diff View), 快捷指令菜单。
- **执行层:** 虚拟文件系统 (VFS), 代码沙箱 (WebContainer), 语言服务 (LSP)。
- **监控层:** 响应速度、采纳率埋点。

### 2. AI 响应质量的前端监控

- **性能指标:**
  - **TTFT (Time to First Token):** 首字延迟（用户感知的最关键指标）。
  - **Token Generation Rate:** 生成速度（字/秒）。
- **质量指标:**
  - **Acceptance Rate:** 代码补全的采纳率（Tab 键次数 / 推荐弹窗次数）。
  - **Copy/Apply Rate:** 聊天复制代码的比例。
  - **User Feedback:** 点赞/点踩/修改后采纳。

### 3. 降低用户对 LLM 长响应的焦虑

- **视觉反馈:** 骨架屏、"Thinking..." 动画。
- **渐进式渲染:** 哪怕是 "思考中"，也可以展示 "正在搜索知识库..." -> "正在阅读文件..." 等中间步骤（类似 DeepSeek 的 Chain of Thought 展示）。
- **预测性 UI:** 在没生成完之前，先展示大致的结构（如代码块的壳子）。

### 4. WebContainer 技术与价值

- **理解:** 在浏览器端通过 WebAssembly 运行 Node.js 运行时。不是云端服务器，是纯本地。
- **价值:**
  - **零延迟:** AI 生成代码后，直接在浏览器本地运行 `npm install` 和 `npm start`，极速预览。
  - **安全:** 代码跑在浏览器沙箱里，不会搞坏用户电脑。
  - **成本:** 节省巨额的后端沙箱服务器开销。

### 5. 长上下文 (Long Context) 问题

- **问题:** 浏览器内存溢出、Prompt 超过 LLM 上限、网络传输慢。
- **前端策略:**
  - **RAG (检索):** 只把最相关的代码片段发给 AI，而不是整个项目。
  - **Summary:** 自动在后台将早期的对话总结成摘要，替换原始 Message。
  - **Sliding Window:** 仅保留最近 N 轮对话。
  - **KV Cache (端侧):** 如果未来端侧模型普及，前端需要管理推理缓存。

### 6. AI 改变前端工程链路

这是一个开放性宏观题目，建议从以下角度回答：

- **开发态:** 从 "写代码" 变成 "Review 代码" (Copilot)。
- **UI 生成:** **Generative UI** (V0.dev)，设计稿 -> 代码流程被压缩。
- **调试:** 遇到报错直接把 Error Stack 丢给 AI 分析，自动修复。
- **测试:** AI 自动根据业务逻辑生成 E2E 测试用例。

---
