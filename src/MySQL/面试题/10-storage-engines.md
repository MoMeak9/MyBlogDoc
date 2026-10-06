# MySQL有哪些常见存储引擎？InnoDB为什么成为默认引擎？如何选择合适的存储引擎？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

MySQL存储引擎负责表数据的存取实现；InnoDB因事务、行级锁、崩溃恢复和外键等能力成为多数业务表的默认选择。

## 面试口语版（约 60 秒）

存储引擎决定一张表的数据组织和读写能力。MySQL 8.4 默认 InnoDB，它支持事务、MVCC、行锁、崩溃恢复和外键，适合订单、账户等联机业务；MyISAM 是非事务型，MEMORY 数据存于内存，ARCHIVE 偏归档。选型应先看事务和恢复要求，再评估并发、索引、备份和运维成本，通常业务主表先选 InnoDB。

## 原理拆解与场景

```sql
CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  amount DECIMAL(12,2) NOT NULL
) ENGINE=InnoDB;

SHOW ENGINES;
SHOW TABLE STATUS LIKE 'orders';
```

订单写入与库存扣减要求事务一致性，InnoDB 合适；临时计算结果若可重建且允许重启丢失，才可评估 MEMORY。

## 关键边界与工程取舍

不能说 MyISAM 永远读取更快：性能取决于查询、索引、并发和硬件。MEMORY 表重启后数据消失，索引和行类型也有局限；不要用来承载持久业务状态。外键能力还受引擎和表设计限制。更换引擎需评估停机、复制和约束行为。

## 面试官递进追问

### 1. MySQL 8.4 默认引擎是什么？

**参考答案：** MySQL 8.4 默认存储引擎是 InnoDB，未显式指定 ENGINE 时通常采用会话的 `default_storage_engine` 设置。但管理员或连接可以修改默认值，既有表也不会因为改默认值就自动转换。实际排查应查 `SELECT @@default_storage_engine` 和 `SHOW CREATE TABLE 表名`，或在 SHOW ENGINES 中查看 DEFAULT 标记。订单等业务常用它，主要因为事务、MVCC、行级锁和崩溃恢复等能力，而不只是默认配置。

### 2. 为什么订单表不宜用 MEMORY？

**参考答案：** MEMORY 的记录保存在内存，服务重启后表定义还在但数据丢失，而且不提供事务回滚和 InnoDB 那样的恢复能力。订单既要求持久留存，也常要与库存、支付状态协调，不能容忍半次更新或重启丢单。MEMORY 还使用表级锁，并发写入有不同限制；“内存里快”不能替代一致性要求。它更适合可重新生成的中间结果；需要加速订单读取时，通常让 InnoDB 保存权威数据，再评估缓存。[MEMORY 引擎](https://dev.mysql.com/doc/refman/8.4/en/memory-storage-engine.html)

### 3. 迁移 MyISAM 到 InnoDB 时如何核对约束和恢复行为？

**参考答案：** 先盘点建表语句、主键、唯一键、索引长度、字符集、外键和应用对表锁或计数行为的依赖。MyISAM 不执行的外键规则不会自动变成可靠约束，应先查孤儿记录和缺失键，再显式建立适合 InnoDB 的约束，并测试违规写入能否被拒绝。用生产规模副本演练重建耗时、额外磁盘、元数据锁与切换，核对行数、分段校验和及关键查询。恢复验证要覆盖事务中断回滚、崩溃恢复、备份恢复和复制追平；持久性还取决于日志配置。切换后若已有新写入，回退也必须保存这些增量，不能直接换回旧表。[转换为 InnoDB](https://dev.mysql.com/doc/refman/8.4/en/converting-tables-to-innodb.html)

## 自测

- 合上笔记，用 60 秒复述一句话结论、一个例子和一个边界。
- 完成第 3 个追问，写出你会核对的 SQL、指标或故障证据。

## 延伸阅读

- [011-storage-engines.md](/posts/MySQL/011-storage-engines/)

## 参考资料

以 MySQL 8.4 为版本基准；官方资料核对日期：2026-09-27。

- [设置存储引擎](https://dev.mysql.com/doc/refman/8.4/en/storage-engine-setting.html)
- [InnoDB 简介](https://dev.mysql.com/doc/refman/8.4/en/innodb-introduction.html)
