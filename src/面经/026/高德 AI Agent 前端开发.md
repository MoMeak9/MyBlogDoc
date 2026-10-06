# 高德 AI Agent 前端开发面经

## 一面（技术基础）

**1. CSS 盒模型及 box-sizing**

- **思路**：
  - **标准盒模型 (`content-box`)**：Width = content。Padding 和 Border 会撑大盒子。
  - **IE/怪异盒模型 (`border-box`)**：Width = content + padding + border。
  - **应用**：在布局中通常全局设置 `* { box-sizing: border-box; }` 以便于直观计算尺寸。

**2. JS 事件循环，特别是宏/微任务**

- **思路**：
  - 执行栈（同步任务） -> 清空微任务队列（Microtasks: Promise, MutationObserver） -> 渲染 UI -> 执行一个宏任务（Macrotasks: setTimeout, setInterval, MessageChannel） -> 循环。
  - **AI 场景关联**：流式输出频繁触发更新，如果解析逻辑都在主线程微任务中堆积，会阻塞 UI 渲染（掉帧）。

**3. AI 聊天流式输出 (Streaming) 实现**

- **核心 API**：`fetch` + `ReadableStream` + `TextDecoder`。

- **SSE vs WebSocket**：通常大模型对话使用 SSE (Server-Sent Events) 思想（单向流），通过 fetch 的 body 读取。

- **代码片段**：

  ```javascript
  const response = await fetch('/api/chat', { ... });
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value);
      // 更新 UI
  }
  ```

**4. Promise.all vs Promise.allSettled**

- **Promise.all**：有一个失败全失败（Fail-fast）。适合互相依赖的请求。
- **Promise.allSettled**：等待所有完成，无论成功失败。返回对象数组 `{status: 'fulfilled' | 'rejected', value/reason}`。适合并发请求多个不相关的 AI 服务/工具调用。

**5. 深拷贝函数**

- **思路**：
  1. **简单版**：`JSON.parse(JSON.stringify(obj))` (不支持函数、undefined、循环引用)。
  2. **现代版**：`structuredClone(obj)`。
  3. **手写版**：递归 + `WeakMap` (解决循环引用)。
- **特殊情况**：Date, RegExp, Set, Map, Symbol, 循环引用。

**6. 手写题：带并发限制的异步调度器 Scheduler**

- **代码**：

  ```javascript
  class Scheduler {
    constructor(limit) {
      this.limit = limit
      this.count = 0
      this.queue = []
    }
    async add(task) {
      if (this.count >= this.limit) {
        // 阻塞在这里，等待 resolve
        await new Promise(resolve => this.queue.push(resolve))
      }
      this.count++
      try {
        await task()
      } finally {
        this.count--
        if (this.queue.length) {
          // 唤醒下一个等待的任务
          this.queue.shift()()
        }
      }
    }
  }
  // 使用
  // const scheduler = new Scheduler(2);
  // scheduler.add(() => fetch(...));
  ```

---

## 二面（深入原理与项目）

**1. AI 聊天长列表滚动性能**

- **虚拟滚动 (Virtual Scrolling)**：只渲染可视区域。
- **难点**：AI 回复高度不定（Markdown 渲染）。
- **方案**：使用支持动态高度的库（如 `react-virtuoso` 或 `react-window` + `ResizeObserver`）。需要在渲染后测量高度并更新缓存。

**2. Prompt 模板与工程化**

- **处理**：使用模板引擎（Handlebars/Mustache）或简单的字符串替换 `Hello, {{name}}`。
- **工程化**：
  - **版本管理**：Git 或数据库存储 Prompt 版本。
  - **结构化**：区分 System, User, Assistant, Context。
  - **评估**：集成评测脚本，对比不同 Prompt 的输出质量。

**3. Markdown 代码块和公式渲染**

- **Markdown**：`react-markdown` 或 `markdown-it`。
- **代码高亮**：`prismjs` 或 `highlight.js` (注意按需加载语言包，防止包体积过大)。
- **公式**：`remark-math` + `rehype-katex` (使用 KaTeX 渲染)。
- **安全**：必须使用 `rehype-sanitize` 或 `dompurify` 防止 XSS 攻击。

**4. React Fiber 架构与流畅度**

- **原理**：将渲染任务拆分为小的工作单元（Fiber 节点）。
- **机制**：可中断渲染 (Time Slicing)。React 在浏览器空闲时执行 Diff，优先响应高优先级任务（如用户输入）。
- **AI 场景**：当 AI 正在流式输出大量内容（低优先级更新）时，用户在输入框打字（高优先级）不会卡顿。

**5. Function Calling 与前端注意点**

- **概念**：LLM 输出 JSON 指令 -> 前端/后端解析 -> 执行函数 -> 结果回传 LLM。
- **前端注意**：
  - **UI 状态**：展示 "正在查询天气..." 等中间状态。
  - **JSON 解析**：LLM 输出的 JSON 可能是流式的（不完整），需要使用支持流式 JSON 解析的库（如 `json-stream` 或容错解析）。
  - **权限**：敏感操作需用户二次确认。

**6. RAG 引用来源标注**

- **数据结构**：后端返回不仅是文本，还包含引用索引 `[1]` 和对应的 Metadata（URL, Title）。
- **渲染**：正则匹配 `[doc_id]`，替换为可点击的 Tooltip 或侧边栏链接组件，高亮对应的源文档片段。

**7. Web Worker 在 AI 前端场景**

- **场景**：
  - **Markdown 解析**：大段文本解析很耗时，移出主线程。
  - **代码高亮**：Tokenize 过程。
  - **本地 LLM**：运行 `WebLLM` 或 `Transformers.js`。

**8. 手写题：简单状态机**

- **代码**：

  ```javascript
  class AIAgentMachine {
    constructor() {
      this.state = "Idle"
      this.transitions = {
        Idle: { START: "Thinking" },
        Thinking: { TOOL_CALL: "Calling_Tool", OUTPUT: "Responding", ERROR: "Error" },
        Calling_Tool: { TOOL_DONE: "Thinking", ERROR: "Error" },
        Responding: { FINISH: "Idle" },
        Error: { RETRY: "Thinking", RESET: "Idle" }
      }
    }
    dispatch(action) {
      const nextState = this.transitions[this.state]?.[action]
      if (nextState) {
        console.log(`${this.state} -> ${nextState}`)
        this.state = nextState
      } else {
        console.warn(`Cannot action ${action} from ${this.state}`)
      }
    }
  }
  ```

---

## 三面（架构综合）

**1. AI Agent 前端架构核心模块**

- **连接层**：SSE/WebSocket 封装，处理流式断连重连。
- **状态层**：会话管理（History），多模态数据流（Text/Image）。
- **渲染层**：Markdown 渲染器，插件（Plugins）渲染系统（比如渲染地图卡片、图表）。
- **逻辑层**：Prompt 组装，Tool 调用逻辑，本地向量检索（Client-side RAG）。

**2. AI Agent 与地图组件深度交互**

- **方案**：
  - **意图识别**：LLM 输出结构化指令 `{ type: "map_pan", coordinates: [...] }`。
  - **总线机制**：Chat 组件通过 EventBus 或 Store 通知 Map 组件执行动作。
  - **图层叠加**：AI 生成的 POI 列表在地图上渲染为 Marker，Hover Marker 时 Chat 列表滚动到对应卡片。

**3. AI 用户体验指标**

- **TTFT (Time to First Token)**：首字延迟（最关键，应 < 1s）。
- **TPS (Tokens Per Second)**：生成速度（决定阅读流畅感）。
- **LCP/FCP**：常规页面加载指标。
- **交互指标**：中断生成的响应速度，输入框无卡顿。

**4. 端侧模型 (Local LLM)**

- **前景**：隐私保护、离线可用、零延迟。
- **技术**：WebGPU, WebAssembly, Transformers.js.
- **限制**：模型体积（下载慢）、显存限制、推理速度较慢。

**5. 最难的 AI 前端问题**

- _示例回答_：解决流式 Markdown 渲染时的“抖动”问题（HTML 结构不断变化导致高度跳变），或者是处理代码块未闭合时的语法高亮崩溃问题。

**6. Vue 到 React 或新框架推动**

- **策略**：
  - **技术调研**：对比优劣，POC（概念验证）。
  - **渐进式迁移**：Micro-frontends（微前端）架构，新页面用新框架，旧页面逐步重构。
  - **基建先行**：搭建新的组件库、CLI 工具。
  - **培训**：团队分享。
