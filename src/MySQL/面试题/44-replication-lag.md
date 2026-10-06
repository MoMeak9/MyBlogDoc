# MySQL主从复制有哪些延迟问题？如何解决数据延迟？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

复制延迟要区分源库产生 binlog、从库接收 relay log 和从库回放提交三个阶段；先找到积压位置，再分别治理写入峰值、网络或回放瓶颈，并给一致性读提供兜底。

## 面试口语版（约 70 秒）

“MySQL 异步复制通常是主库提交后，由从库接收 binlog 并回放，所以从库读可能落后。我会先看复制连接和回放 worker 是否正常、有没有错误或重试，再比较已接收与已执行 GTID，区分传输慢还是回放慢。常见原因有大事务、主库写入突增、网络抖动、从库磁盘/CPU 忙、热点冲突和并行回放受依赖约束。处理上先恢复故障和资源，再缩小不必要的大事务、优化从库查询与 I/O，确认事务可并行后才调整 worker 数。业务上，刚提交后立刻读取的订单确认应路由主库，或携带提交 GTID 在从库等待其执行且设超时；超时后回退主库。不能只看一个 `Seconds_Behind_*` 字段，也不能把半同步的‘收到日志’等同于从库已经能读到数据。”

## 复制链路与排查

```mermaid
flowchart LR
  A[源库提交并写 binlog] --> B[从库 receiver 接收]
  B --> C[relay log]
  C --> D[applier worker 回放]
  D --> E[从库查询可见]
```

| 积压位置 | 证据 | 常见动作 |
| --- | --- | --- |
| 接收落后 | 连接断开、网络延迟、接收位点落后 | 修复连接和网络，检查源库发送能力 |
| 已接收但未执行 | relay log 积压、worker 错误/重试、I/O 高 | 排查大事务、热点冲突、从库负载和并行回放 |
| 位点看似正常但业务读陈旧 | 查询到错误副本、延迟指标口径不符、事务尚未执行 | 绑定实例与 GTID、业务写后读探针 |

**例子与失败分支：** 用户修改收货地址后立即打开订单页。应用记录该次提交的 GTID，读副本前用 `WAIT_FOR_EXECUTED_GTID_SET(gtid, timeout)` 等待；若超时或复制线程报错，改读主库并记录降级。这样只保护这次提交的“读己之写”，不能给所有跨库查询自动提供全局一致快照。

实现时，写连接需按驱动能力启用 `session_track_gtids=OWN_GTID` 并读取提交响应中的本次 GTID；等待函数要传明确的正数超时，检查返回值（0 为已执行，1 为超时），避免无限等待。

## 关键细节与常见误区

- MySQL 8.4 文档建议在支持事务时间戳的拓扑中用 Performance Schema 复制表诊断延迟；复杂拓扑只看 `SHOW REPLICA STATUS` 的 `Seconds_Behind_Source` 可能误判。即使该值为 0，也可能只是回放线程追上接收线程，而接收线程仍落后源库。
- 并行 worker 并非越多越快：依赖事务、热点行、提交顺序约束与单个大事务都会限制收益。拆大事务也必须保持原业务原子性要求。
- 半同步等待至少一个副本确认收到并记录事件，**不等于**该副本已经执行；超时配置还可能使源库退回异步模式。
- 一致性兜底要明确容量成本。所有写后读都走主库可能压垮主库，应按关键读路径和时间窗口路由。

## 面试官递进追问

### 1. 已接收 GTID 领先于已执行 GTID，说明瓶颈大致在哪一段？

**参考答案：** 在同一复制通道、同一来源下，已接收而未执行的 GTID 差集持续扩大，通常说明积压主要在接收后的回放或提交阶段。继续看 `replication_applier_status_by_worker` 的错误、当前事务和持续时间，以及磁盘、锁等待和 relay log 体积，区分大事务、热点冲突、资源饱和或 worker 停止。瞬时差距可能只是事务正在执行；收到 GTID 事件也不保证完整事务已收齐，因此仍要排除单个大事务尚在传输。不能把 GTID 当成单一递增数字比较，也不能把差集中的事务数直接换算成延迟秒数，因为每笔事务大小不同。

### 2. 从库并行 worker 从 4 提到 16 为什么可能没有明显收益？

**参考答案：** worker 只能并行处理可独立调度的事务，不能自动把一个大事务拆给 16 个线程。若大量事务更新同一热点行、存在依赖链，或受提交顺序约束，增加 worker 后仍会等待；如果瓶颈在日志接收或磁盘，增加回放并发也不能解决，反而可能增加争用。应观察各 worker 是否都有任务、具体等待状态、积压事务大小与 CPU/I/O 利用率；有些 worker 空闲而一个长期执行大事务时，先优化事务粒度，并保持业务原子性。只有独立待执行事务充足、资源有余量时，再逐步提高并行度，用消化积压速度与业务读取 P99 验证收益。

### 3. 半同步已收到 ACK，但用户读从库仍看到旧数据，如何实现读己之写？

**参考答案：** 半同步 ACK 确认副本已接收并持久化事务日志，不保证已回放，也不保证应用读的正是确认那台副本。关键写后读可以直接读仍承载该次提交的主库；需要读副本时，在写连接启用 `session_track_gtids=OWN_GTID` 并确认驱动支持会话状态跟踪，从提交响应取得本次 GTID。选定副本后执行 `WAIT_FOR_EXECUTED_GTID_SET(:gtid, 1)`，返回 0 后再查询，返回 1 或报错则按超时策略回退主库。

等待与后续查询必须绑定同一副本，且查询不能沿用等待前已经建立的 RR 快照。还需确认数据未被复制过滤；若已发生故障切主，新主也须包含目标 GTID，否则应返回可重试状态并对账，不能假定读主一定补齐丢失事务。[半同步语义](https://dev.mysql.com/doc/refman/8.4/en/replication-semisync.html)、[GTID 等待函数](https://dev.mysql.com/doc/refman/8.4/en/gtid-functions.html)。

## 自测与学习清单

- 画出源库提交、接收、回放、读可见四个时点，指出各自的观测指标。
- 设计“等待 GTID 超时”后的主库回退、错误码、告警和容量保护。
- 用大事务和网络限速两种故障注入，验证诊断路径是否能区分原因。

## 延伸阅读

- [042-replication-lag.md](/posts/MySQL/042-replication-lag/)
- [同题场景版参考答案](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/27-mysql-replication-lag/)

## 参考资料

- [MySQL 8.4：复制延迟监控](https://dev.mysql.com/doc/refman/8.4/en/replication-delayed.html)、[Performance Schema 复制表](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-replication-tables.html)、[GTID 等待函数](https://dev.mysql.com/doc/refman/8.4/en/gtid-functions.html)、[会话 GTID 跟踪变量](https://dev.mysql.com/doc/refman/8.4/en/server-system-variables.html)、[半同步复制](https://dev.mysql.com/doc/refman/8.4/en/replication-semisync.html)（核对日期：2026-09-27）。
