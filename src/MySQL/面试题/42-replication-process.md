# 什么是MySQL主从复制？主从复制的完整过程是怎样的？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

MySQL 复制按“源库写 binlog → 从库 receiver 接收并写 relay log → applier 回放提交”运行；GTID 帮助识别已执行事务，但异步复制不保证从库立刻可读到最新写入。

## 面试口语版（约 60 秒）

我会把复制拆成日志产生、传输、回放三段。源库提交变更时记录 binlog；从库的 receiver 线程连接源库，读取 binlog 事件并写入本地 relay log；applier 线程或多个 worker 再读 relay log，在从库重放并提交。GTID 给事务一个可追踪标识，便于自动定位缺少的事务和故障切换，但“已接收”与“已执行”是两个不同阶段。异步复制下源库提交后，从库可能仍在接收或回放，所以读写分离要处理写后读一致性。故障排查时先看 receiver 是否连通、relay log 是否积压，再看 applier 错误、慢事务和资源瓶颈；不能只看一个延迟秒数。

## 原理拆解

```mermaid
flowchart LR
  C[客户端提交] --> S[源库事务提交与 binlog]
  S --> R[从库 receiver 读取]
  R --> L[从库 relay log]
  L --> A[applier 回放并提交]
  A --> Q[从库查询可见]
```

| 阶段 | 负责组件 | 应区分的状态 |
| --- | --- | --- |
| 产生 | 源库事务与 binlog | 事务已在源库提交，不代表副本完成 |
| 接收 | 从库 receiver 线程 | 已写入 relay log，不代表查询可见 |
| 应用 | 从库 applier 线程或 worker | 回放提交后，才可被从库查询读取 |

MySQL 8.4 官方文档将 receiver 与 applier 分开描述；具体线程数量和并行回放方式取决于配置。GTID 可用来比较事务集合和定位复制进度，但应核对事务是否完整接收、是否真正执行，不能把 `Retrieved_Gtid_Set` 当作可直接开放读写的证明。

## 例子与故障分支

订单事务 `T101` 已在源库提交，客户端立即从从库读取订单：如果 receiver 尚未接收或 applier 尚未回放，仍可能查不到。要求读己之写时，可短时读源库；若使用 GTID 等待从库回放，应设置明确超时，超时后回退源库。

若 receiver 中断但 applier 已处理完现有 relay log，从库的“当前待回放量”可能很低，业务数据却仍落后源库。诊断时同时看接收与执行位点、线程错误、事务时间戳和业务探针。半同步复制等待副本确认接收日志，也不等于副本已回放并可读。

## 关键细节与易错点

- binlog 格式可为 row、statement 或 mixed；MySQL 官方对 GTID 复制推荐 row 格式，具体方案按版本和业务兼容性决定。
- GTID 简化事务追踪与自动定位，但不能替代数据校验，也不能保证异步复制零延迟或零数据丢失。
- 从库回放可能受大事务、热点写、磁盘 I/O 和并行依赖限制；增加 worker 数之前应确认瓶颈确在应用阶段。
- 复制错误不能靠盲目跳过事件“修好”；需识别冲突事务、保留证据并验证数据一致性。

## 面试官递进追问

### 1. relay log 和 binlog 各存在哪里，由哪个线程写入？

**参考答案：** binlog 保存在启用二进制日志的 MySQL 实例本地，由执行事务的服务端线程在提交路径中写入，组提交可以合并写入与同步；源库的 Binlog Dump 线程负责读取并发送日志，不是负责生成业务变更的线程。relay log 保存在副本本地，由 receiver/I/O 线程接收源库事件后写入，再交给 applier 或 coordinator/worker 回放。副本也可以有自己的 binlog；启用 `log_replica_updates` 时，回放的事务还会写入该副本的 binlog，以支持级联复制或后续提升为源库。relay log 与副本自身的 binlog 是两个不同用途的日志。[官方依据：复制线程](https://dev.mysql.com/doc/refman/8.4/en/replication-threads.html)。

### 2. 从库已经收到 `T101`，为什么查询仍看不到订单？

**参考答案：** 收到日志只完成了传输，订单要等事务被 applier 回放并提交后，才可能对新的查询快照可见。它可能排在大事务之后、等待锁或磁盘，也可能因复制错误停住；而 `Retrieved_Gtid_Set` 出现 T101 的 GTID，甚至不保证整笔事务已传完。先检查完整日志及该事务是否进入目标副本的 `Executed_Gtid_Set`，再检查 worker 状态、错误和等待。即使已经执行，旧 RR 快照仍可能看不到，查询也可能被路由到别的副本。读己之写要绑定目标副本并在新快照建立前等待提交 GTID；超时后回退主库。

### 3. 主库突然故障时，怎样比较候选从库的事务完整性，避免提升后缺数据？

**参考答案：** 先隔离旧主写入口，再采集各候选的已执行 GTID 集合、复制来源、错误状态和完整可恢复的 relay log。用集合包含关系与差集判断缺失事务，不能比较一个最大序号，也不能把“接收最多”直接当成“数据最完整”。在保留证据后让候选回放完整事务；若其他副本保存了它缺少的合法事务，且日志可用，可先受控补齐。提升前重新核对已执行集合、复制过滤和异常本地事务，并验证关键业务数据。若旧主某些已提交事务从未传到任何副本，异步复制无法凭空恢复它们，只能明确损失窗口，结合旧主恢复或业务流水补偿。

## 延伸阅读

- [041-replication.md](/posts/MySQL/041-replication/)
- [复制延迟专题](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/44-replication-lag/)
- [主库故障切换专题](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/45-primary-failover/)

## 自测

- 不看笔记画出源库提交、从库接收、从库回放、查询可见四个时点。
- 用“源库提交成功但从库未读到”解释接收进度与执行进度的区别。
- 分别说出 GTID 能帮助什么，以及它不能保证什么。

## 参考资料

核对日期：2026-09-27。

- [MySQL 8.4：Replication Threads](https://dev.mysql.com/doc/refman/8.4/en/replication-threads.html)
- [MySQL 8.4：Relay Log and Replication Metadata Repositories](https://dev.mysql.com/doc/refman/8.4/en/replica-logs.html)
- [MySQL 8.4：Replication with GTIDs](https://dev.mysql.com/doc/refman/8.4/en/replication-gtids.html)
- [MySQL 8.4：SHOW REPLICA STATUS](https://dev.mysql.com/doc/refman/8.4/en/show-replica-status.html)
- [MySQL 8.4：Replication Delay](https://dev.mysql.com/doc/refman/8.4/en/replication-delayed.html)
- [MySQL 8.4：Semisynchronous Replication](https://dev.mysql.com/doc/refman/8.4/en/replication-semisync.html)
