## 异步进程创建

#### `child_process.spawn(command[, args][, options])`

#### `child_process.exec(command[, options][, callback])`

#### `child_process.execFile(file[, args][, options][, callback])`

## 同步进程创建

[`child_process.spawnSync()`](http://nodejs.cn/api/child_process.html#child_processspawnsynccommand-args-options)、[`child_process.execSync()`](http://nodejs.cn/api/child_process.html#child_processexecsynccommand-options) 和 [`child_process.execFileSync()`](http://nodejs.cn/api/child_process.html#child_processexecfilesyncfile-args-options) 方法是同步的，将阻塞 Node.js 事件循环，暂停任何其他代码的执行（阻塞主进程的执行），直到衍生的进程退出。像这样的阻塞调用对于简化通用脚本任务和在启动时简化应用程序配置的加载/处理非常有用。

这些方法返回的不再是`ChlidProcess`对象，而是`<Buffer> | <string>` 命令的标准输出。同时三个方法有着相同的`option`参数 [Child process | Node.js v18.14.2 Documentation](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#synchronous-process-creation)。

如果子进程拦截并处理了 `SIGTERM` 信号且没有退出，则父进程仍然会等待，直到子进程退出。

如果进程超时或具有非零退出码，则此方法将抛出 [`Error`](http://url.nodejs.cn/wCrkmp)，其中包含此方法的完整结果。

#### `child_process.execFileSync(file[, args][, options])`

child_process.execFile() 函数与 child_process.exec() 类似，不同之处在于它默认不衍生 shell。 而是，指定的可执行文件 file 直接作为新进程衍生，使其比 child_process.exec() 略有效率。

### `ChildProcess` 类


### 输出子进程控制台内容

## 参考文档
- [child_process 子进程 | Node.js API 文档](http://nodejs.cn/api/child_process.html#child_processexecfilefile-args-options-callback)
- [Child process | Node.js v18.14.2 Documentation](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html)