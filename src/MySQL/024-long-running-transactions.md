# MySQL 中长事务可能会导致哪些问题？

日期：2026-07-11  
难度：中等  
标签：#面试 #MySQL #InnoDB #事务

## 一句话答案

长事务会长期占用锁和 Read View，阻塞并发、拖住 undo 历史版本清理，并放大 redo/binlog、复制延迟和故障恢复成本。

## 面试口语版

InnoDB 里长事务最危险的不只是“执行慢”，而是它迟迟不提交。写事务可能一直持有行锁，后续写入排队甚至超时；任何长事务都可能让较老的 Read View 存活，purge 不能清理仍可能被看到的 undo 版本，导致 History list length 增长、undo 表空间膨胀。事务修改很多数据还会占用更多日志和内存，提交、复制回放及崩溃恢复都更慢。生产上要把事务缩短，不在事务中做远程调用、用户交互或大批量循环。

## 原理拆解

```mermaid
flowchart LR
  A[长事务未提交] --> B[锁长期持有]
  A --> C[旧 Read View 存活]
  B --> D[阻塞/锁等待/死锁概率上升]
  C --> E[undo 无法 purge]
  E --> F[版本链变长与空间膨胀]
```

## 关键细节

- 关注 `information_schema.innodb_trx`、`performance_schema.data_lock_waits`、`SHOW ENGINE INNODB STATUS` 与 `History list length`。
- `SELECT` 的一致性读通常不持锁，但长读事务仍会阻碍旧版本回收。
- 大事务会让从库单个事务回放时间变长；拆批需同时保证业务原子性。
- 处理时优先定位业务连接并安全终止；`KILL` 后回滚本身也可能耗时。

## 面试官追问

1. 为什么只读长事务也会造成问题？
2. undo log 为什么不能立即删除？
3. 如何在线排查并治理长事务？

## 学习清单

- 能区分“锁阻塞”和“MVCC 历史版本堆积”。
- 为写操作设置合理超时与批处理边界。
