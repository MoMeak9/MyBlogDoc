# MySQL 中 DELETE、DROP 和 TRUNCATE 的区别是什么？

日期：2026-07-11  
难度：中等  
标签：#面试 #MySQL #DDL #DML #VIP

## 一句话答案

DELETE 是可带 WHERE 的逐行 DML；TRUNCATE 是快速清空整表的 DDL；DROP 会删除整个数据库对象及其定义，破坏性依次增大。

## 原理拆解

| 对比项 | DELETE | TRUNCATE TABLE | DROP TABLE |
| --- | --- | --- | --- |
| 删除范围 | 可按 WHERE 删除 | 全部数据 | 数据与表定义 |
| 对象保留 | 保留表结构 | 保留表结构 | 不保留 |
| 事务语义 | InnoDB 中可回滚 | 隐式提交，不能按普通 DML 回滚 | 隐式提交 |
| 触发器 | 触发 DELETE trigger | 不触发 DELETE trigger | 不适用 |
| AUTO_INCREMENT | 通常不重置 | 通常重置 | 对象消失 |
| 典型成本 | 记录 undo/redo，可能很大 | 释放/重建表空间，通常更快 | 删除对象 |

## 面试口语版

需要按条件删除、保留事务回滚能力时用 DELETE，但大批量 DELETE 会产生大量 undo、redo 和锁，应拆批。要清空整张表且确认不需要事务回滚时可用 TRUNCATE，它保留表定义并重置自增计数，执行更像重新创建空表。DROP 则连表结构、索引和权限相关对象一起删除。三者都可能受外键和权限限制，生产执行 TRUNCATE 或 DROP 前必须备份、审批并确认目标库表。

## 关键细节

- MySQL 8.0 的 DDL 支持原子 DDL，但这不等于可以像普通 DML 一样在用户事务中随意回滚。
- `DELETE FROM t` 没有 WHERE 仍然是 DELETE，不等于 TRUNCATE。
- 大表清理还可考虑分区 `DROP PARTITION`、归档或在线清理。

## 面试官追问

1. TRUNCATE 为什么通常更快？
2. 大表 DELETE 如何避免长事务？
3. 三者对 AUTO_INCREMENT 的影响？

## 高分补充

生产操作的重点不只在语法，而在权限隔离、备份、审计、限速和可恢复性。

## 学习清单

- 通过“范围、结构、事务、自增、触发器”五项比较。
