# Web Woker 常见使用问题和解决方案

## 问题汇总

1. new Worker(aURL, options) URL 必须遵守同源策略。同源策略是浏览器的一种安全特性，限制了在不同源（协议、域名、端口）之间的 JavaScript 代码的访问。这意味着在 Web Worker 中，只能加载与当前页面在同一源下的脚本，否则会触发安全错误。
2. Web Worker中限制了部分Web API。Web Worker 有一些限制，其中包括无法直接操作 DOM 和无法使用 localStorage。这是因为 Web Workers 是在独立的线程中运行的，与主线程分离，并且没有直接的访问主线程的 DOM 或 JavaScript 运行环境的能力。
3. Web Worker与主线程的通信， 默认情况下Web Worker与主线程或其他Worker不能共享内存。Web Workers 默认情况下是无法直接共享内存的，因为它们在独立的线程中运行，拥有各自的运行环境和内存空间。

## 解决方案

### 解决跨域限制

### 解决API限制

### 使Web Worker共享内存



new Worker(aURL, options) URL 必须遵守同源策略

-   解决方法

-   通过 Blob  + createObjectURL 规避

创建worker使用的脚本链接应该遵守同源策略

准备一些胶水代码 通过 blob + createObjectURL的方式创建worker 再从worker中加载其他脚本


Web Worker中限制了部分Web API

-   无法操作DOM 无法使用localStorage ……

-   通过主线程进行代理

-   也有部分只能在worker中使用的API

-   importScripts()
-   FileReaderSync API


Web Worker与主线程的通信

-   默认情况下Web Worker与主线程或其他Worker不能共享内存

-   变量数据需要通过postMessage方式在线程间传递
-   例外 SharedArrayBuffer
	-   存在兼容性问题


Web Worker与主线程的通信  postMessage(aMessage, transferList)

-   postMessage 有序列化和反序列化的过程

-   数据会经过 structured clone 再传递给其他线程
-   例外 Transferable 对象

-   ArrayBuffer MessagePort ImageBitmap …
-   将对象的所有权移交给其他线程

Web Worker与主线程的通信

-   postMessage方式在业务场景中使用不够简洁

-   使用Promise封装
-   并行计算 规避顺序问题

-   使用Promise.all

> 传递数据规模较大时 结构化克隆会产生性能瓶颈


通过一个外部标识记录浏览器对结构化克隆能力的记录
https://chat.openai.com/c/4aa3b97a-8440-4948-b1af-fca0ac40cb84
