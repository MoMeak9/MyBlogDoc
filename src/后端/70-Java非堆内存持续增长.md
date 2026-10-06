# Java 应用内存持续增长但堆内存没变化，可能是什么原因？

日期：2026-07-11  
标签：#面试 #八股 #后端 #JVM #场景题

## 一句话答案

重点排查直接内存、线程栈、元空间、Code Cache、JNI/native 分配、mmap 和文件页缓存，并先区分进程 RSS、容器 working set 与 Java 堆指标。

## 面试口语版

堆稳定但进程 RSS 增长说明内存可能在堆外。先确认监控口径，用 `jcmd VM.native_memory summary/diff` 看 NMT 分类，检查 DirectByteBuffer 数量和 `MaxDirectMemorySize`、线程数与 Xss、类加载数量和 Metaspace、Netty allocator、JNI/native 库以及 mmap。还要看文件 I/O 造成的页缓存和容器统计是否计入。若 NMT 无法解释，用 pmap、`/proc/PID/smaps`、JFR 或 native profiler 继续定位。修复后观察 RSS 是否能回落，注意 allocator 可能保留空闲内存不立即归还 OS。

## 关键细节

- NMT 需要提前开启，存在一定性能开销。
- DirectByteBuffer 对象在堆中很小，但 Cleaner 负责释放堆外内存，GC 不及时会积压。
- 线程数 × Xss 会占用大量虚拟/提交内存。
- RSS 增长不一定是泄漏，可能是页缓存或 allocator 高水位保留。

## 面试官追问

1. 如何判断是 Direct Memory 泄漏？
2. Metaspace 为什么会持续增长？
3. RSS 不下降就一定是内存泄漏吗？

## 面试官追问参考答案

### 1. 如何判断是 Direct Memory 泄漏？

结合 NMT、JFR、DirectByteBuffer 类直方图和 Netty allocator 指标，看直接内存已用是否持续增长且无法随负载回落。检查 ByteBuf 是否正确 release、引用计数泄漏日志和 Cleaner 队列；仅看堆中的 DirectByteBuffer 数量不一定完整。

### 2. Metaspace 为什么会持续增长？

动态生成代理类、脚本、热部署或 ClassLoader 泄漏会不断加载新类。类只有在其 ClassLoader 不可达且发生相应 GC 时才能卸载；通过 class histogram、`VM.classloader_stats` 和 GC 日志定位异常 ClassLoader。

### 3. RSS 不下降就一定是内存泄漏吗？

不一定。malloc 分配器可能保留空闲 Arena，文件页缓存和 mmap 也计入 RSS，内存已可复用但未归还 OS。应观察已用分类、负载周期和可复用性，持续不可达增长并最终触顶才更像泄漏。

## 学习清单

- [ ] 区分 Heap、Native Memory 与 RSS。
- [ ] 熟悉 NMT、smaps 和常见堆外来源。

