# MySQL 中的 Log Buffer 是什么？它有什么作用？

日期：2026-07-11  
难度：简单  
标签：#面试 #MySQL #InnoDB #RedoLog #VIP

## 一句话答案

Log Buffer 是 InnoDB 在内存中暂存 redo log 记录的区域，用来合并和顺序写日志、减少频繁磁盘 I/O，并在提交或缓冲区压力等时机写入 redo log 文件。

## 面试口语版

事务修改 Buffer Pool 中的数据页时，会同步生成 redo 记录，先放入内存里的 Log Buffer。之后由日志线程写到操作系统缓存和 redo 文件，是否在每次提交时 `fsync` 由 `innodb_flush_log_at_trx_commit` 控制。Log Buffer 能让多次小的 redo 记录批量、顺序写，提高吞吐。大事务如果生成的 redo 超过缓冲容量，会在提交前多次写出，所以大批量更新场景可以评估 `innodb_log_buffer_size`，但它不是越大越快。

## 原理拆解

```mermaid
flowchart LR
  A[事务修改数据页] --> B[生成 redo]
  B --> C[Log Buffer 内存]
  C --> D[OS 缓存]
  D --> E[Redo Log 文件]
```

## 关键细节

- “write 到文件”和“flush 到稳定介质”不是一回事。
- `innodb_flush_log_at_trx_commit=1` 通常提供最强的单机持久性；其他值用持久性换性能。
- Log Buffer 缓存的是 redo，不是 binlog，也不是查询结果。

## 面试官追问

1. 参数 0、1、2 有何区别？
2. Log Buffer 和 redo log file 的区别？
3. 大事务为何可能需要更大的 Log Buffer？

## 高分补充

调参前先确认日志等待、事务大小和磁盘延迟，避免把业务大事务问题掩盖成内存配置问题。

## 学习清单

- 记住 redo 的内存、OS 缓存、磁盘三层路径。
