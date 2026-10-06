# 什么是binlog？binlog的作用和工作原理是什么？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

binlog 是 MySQL 服务端记录数据变更事件的顺序日志，主要服务复制与全量备份后的时间点恢复。

## 30–90 秒口语版

源库把事务变更写入 binlog，副本读取并重放相应事件；做 PITR 时先恢复备份，再应用备份之后的 binlog 到目标时间点。MySQL 8.4 默认启用 binlog 且默认 ROW 格式，但部署配置可以改；ROW 记录行级变化，DDL 等仍以语句事件记录。它和 InnoDB redo 不同：binlog 是服务端逻辑复制/恢复事件流，redo 是页变更相关的崩溃恢复日志。binlog 不能单独充当全量备份，也不能无限期保留；清理周期需覆盖副本和恢复需求。

## 数据流示意

```mermaid
flowchart LR
  A[业务事务] --> B[源库 binlog]
  B --> C[副本读取并应用]
  D[全量备份] --> E[恢复基线]
  B --> F[应用备份后的事件至目标点]
  E --> F
```

```sql
SHOW VARIABLES LIKE 'log_bin';
SHOW VARIABLES LIKE 'binlog_format';
SHOW BINARY LOGS;
-- 故障恢复演练时，使用 mysqlbinlog 提取指定范围并应用于隔离实例。
```

## 关键边界与取舍

- ROW 格式不等于“binlog 只包含数据行”：DDL 等事件仍会出现；`binlog_format` 在 8.4 已标记弃用，新的复制部署应优先 ROW。
- `sync_binlog` 决定 binlog 同步到磁盘的策略；即使事务返回成功，若放宽同步也可能在主机故障后缺失最近事件。
- binlog 需要与备份的精确位置或 GTID 衔接；清理前确认恢复链与所有副本进度。

## 递进追问

### 1. binlog 与 redo 在用途、归属和记录内容上有何区别？

**参考答案：** binlog 属于 MySQL 服务端，记录可供重放的数据变更事件，用于复制、审计及基于备份的时间点恢复；ROW 格式主要记录行变化，DDL 等仍会使用语句事件。redo 属于 InnoDB，记录页修改相关的重做信息，用于崩溃后恢复数据页与事务状态。binlog 按保留策略追加和清理，redo 的旧空间随检查点推进循环复用。二者配合提交协调，但不能互相替代，也不能把 redo 理解为一份 SQL 操作流水。

### 2. 为什么仅有 binlog 通常不足以快速恢复整库？

**参考答案：** binlog 是变更流，通常没有某个时点的完整数据基线；日志也可能在建库之后才启用，或较早文件已按策略清理，因此仅凭现存 binlog 无法重建此前的数据。即使碰巧保留了从空库开始的全部变更，逐条重放也可能很慢，还需正确处理结构变更等事件。常规方案是先恢复经过验证的全量备份，再从其精确文件位点或 GTID 边界向后应用日志，并控制目标事务边界。

### 3. `sync_binlog=0` 时源库崩溃可能怎样影响副本一致性？

**参考答案：** `sync_binlog=0` 表示 MySQL 不主动按提交组同步 binlog，写入可能只到操作系统缓存。若是整机掉电或操作系统崩溃，已返回成功的最近事务事件可能从源端 binlog 丢失；即便 redo 已持久化，也不能由此推断复制日志完整。副本若尚未收到这些事件，可能缺少源库已保留的数据；若已经收到，则也可能与源端恢复后的日志历史不一致。纯 mysqld 退出不等同于断电，缓存未必丢失。故障后应核对源副本事务集合和数据，不能只重启复制就认定一致。[binlog 同步策略](https://dev.mysql.com/doc/refman/8.4/en/binary-log.html)。

## 延伸阅读

- [022-mysql-logs-binlog-redo-undo.md](/posts/MySQL/022-mysql-logs-binlog-redo-undo/)
- [041-replication.md](/posts/MySQL/041-replication/)

## 官方依据

以下均为 MySQL 8.4 官方手册，核对日期：2026-09-27。

- [The Binary Log](https://dev.mysql.com/doc/refman/8.4/en/binary-log.html)
- [Setting The Binary Log Format](https://dev.mysql.com/doc/refman/8.4/en/binary-log-setting.html)
- [Backup and Recovery Types](https://dev.mysql.com/doc/refman/8.4/en/backup-types.html)

## 自测

- 不看笔记，用 60 秒回答：什么是binlog？binlog的作用和工作原理是什么？
- 用示例 SQL 或故障时间线解释边界与取舍，并回答上面的递进追问。
