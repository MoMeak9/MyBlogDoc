# Redis 内存溢出如何排查和解决？

日期：2026-07-11  
标签：#面试 #八股 #后端 #Redis #场景题

## 一句话答案

先止损并区分数据量增长、Big Key、内存碎片、客户端缓冲和持久化 COW，再通过清理、拆分、限流、合理淘汰与扩容处理，最后补容量和水位治理。

## 面试口语版

我先确认是 Redis 返回 OOM、进程被系统 OOMKill，还是宿主机内存告警，并看 `used_memory`、`used_memory_rss`、`maxmemory`、evicted_keys、碎片率和各类缓冲。数据内存高就查 Key 数、TTL、Big Key 和数据结构；RSS 远高于 used_memory 重点看碎片和 fork/COW；复制 backlog、AOF buffer、客户端输出缓冲也可能吃内存。应急可以限制写入、清理可丢缓存、异步删除大 Key、扩容分片或故障转移。根治要设置 TTL、选择合适淘汰策略、拆大 Key、紧凑编码，并建立容量预测和告警。

## 关键细节

- `maxmemory` 不等于进程 RSS 上限，持久化和复制需要额外内存。
- `DEL` 大 Key 可能阻塞主线程，优先 `UNLINK`。
- 缓存场景可以淘汰，队列、锁、会话等业务状态不能随意淘汰。
- RDB/AOF rewrite 的 fork 期间写流量会产生 COW 内存峰值。

## 面试官追问

1. used_memory 不高但 RSS 很高可能是什么原因？
2. noeviction 和 allkeys-lru 如何选择？
3. 如何安全删除 Big Key？

## 面试官追问参考答案

### 1. used_memory 不高但 RSS 很高可能是什么原因？

可能是 allocator 碎片未归还操作系统、RDB/AOF fork 的 COW 页、客户端/复制缓冲、线程栈或模块原生内存。结合 `INFO memory`、NMT 不适用于 Redis，需看 allocator 指标、进程映射和持久化时序。

### 2. noeviction 和 allkeys-lru 如何选择？

纯缓存且所有 Key 都可重建时可选 allkeys-lru/lfu；包含不可丢业务状态时应 noeviction，让写请求失败并告警，或把缓存与状态拆到不同实例。策略必须和数据语义一致。

### 3. 如何安全删除 Big Key？

先确认业务影响并停止继续写大 Key，集合类可用渐进扫描分批删除成员，最终用 `UNLINK` 异步释放。低峰执行、观察 lazyfree 队列和内存，避免同时删除大量 Key 造成后台释放压力。

## 学习清单

- [ ] 区分 used_memory、RSS、碎片和 COW。
- [ ] 能按数据语义选择淘汰策略。

