# MySQL有哪些锁类型？行锁、表锁、意向锁的作用是什么？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：简单  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

InnoDB 用表级意向锁协调表锁与行锁，并在索引记录上使用共享/排他、记录、Gap、Next-Key 等锁；“行锁”实际与索引访问路径密切相关。

## 面试口语版（约 60 秒）

“我会按三个维度说。粒度上有表级锁和行级锁；模式上有共享 S 锁与排他 X 锁；InnoDB 的行级锁落在索引记录及其间隙上，具体有 record、gap、next-key。意向锁是表级的 IS/IX，表示事务准备在表中持有共享或排他行锁，这让表级锁请求能够快速判断冲突，而不需要逐行扫描；两个事务各更新不同的行时，IX 与 IX 可以兼容。`SELECT ... FOR SHARE` 取得共享锁，`FOR UPDATE` 或更新需要排他锁。普通 RC/RR 下的 SELECT 通常是一致性非锁定读。锁住哪些记录取决于索引和隔离级别：合适的唯一索引等值命中可缩小范围，缺少有效索引时扫描可能锁到大量记录，所以不能把‘WHERE 只匹配一行’直接说成‘只锁一行’。”

## 分类与冲突例子

| 锁 | 级别/对象 | 主要作用 |
| --- | --- | --- |
| S / X | 锁模式 | S 允许共享读但阻止竞争修改；X 阻止其他事务取得冲突的 S/X 锁。 |
| IS / IX | 表级意向锁 | 声明事务将持有表内的 S/X 行锁；与整表 S/X 锁协调。 |
| Record | 索引记录 | 锁已有索引记录；通过聚簇或二级索引定位。 |
| Gap | 索引记录之间 | 限制在间隙插入；不锁间隙两端的现有记录。 |
| Next-Key | Gap + 后一个索引记录 | 保护范围扫描结果，RR 范围锁定操作常见。 |
| Insert intention | 插入位置所在 Gap | 插入前表达插入意图；不同位置插入可并发，受已有 Gap 锁影响。 |

意向锁兼容性的一个关键记忆点：`IX` 与 `IX` 兼容，两个事务可以分别修改表中不同的行；`IX` 与整表 `S`/`X` 冲突。因此“有一个 IX，就整表无法再写”是错的。MySQL 还存在元数据锁（MDL，协调 DDL 与表访问）和 `LOCK TABLES` 等表锁，它们与 InnoDB 行锁的目的和生命周期不同，排障时不要混为一谈。

## SQL 与排障

```sql
START TRANSACTION;
SELECT * FROM orders WHERE id = 100 FOR SHARE;  -- 意向共享 + 对应记录的 S 锁
SELECT * FROM orders WHERE id = 200 FOR UPDATE; -- 意向排他 + 对应记录的 X 锁
COMMIT;

EXPLAIN SELECT * FROM orders WHERE customer_id = 8 FOR UPDATE;
SELECT * FROM performance_schema.data_locks;
SELECT * FROM performance_schema.data_lock_waits;
```

上述“对应记录”是唯一主键等值命中时的直观情况。非唯一条件或范围访问的实际锁可能覆盖更多记录和间隙；对 `EXPLAIN` 的索引访问路径及 `data_locks` 的 `INDEX_NAME`、`LOCK_MODE`、`LOCK_DATA` 一起核对。`autocommit=1` 的单条锁定读结束便释放锁，不能保护后续另一条语句。

## 边界与取舍

- 普通 SELECT 在 RC/RR 下通常不加这些行级读锁，但仍可能受 MDL 等其他机制影响；“无锁”只限于相应的一致性读语义。
- 锁粒度越大不一定总是差：一次批量操作要综合吞吐、内存、死锁与访问模式；不要凭“行锁优于表锁”设计。
- 若查询走二级索引并要更新行，可能同时涉及二级索引与聚簇索引记录，分析死锁必须看真实锁日志。

## 递进追问

### 1. 为什么 IX 与 IX 兼容？IX 与整表 S 锁为什么冲突？

**参考答案：** IX 只声明“本事务要在表内某些记录上加排他锁”，不表示独占整张表。两个事务可能分别更新不同记录，所以 IX 与 IX 可以兼容；若最终竞争同一条记录，再由记录 X 锁决定等待。整表 S 锁要求表内记录受到共享保护，与其他事务修改任意记录的意图冲突，因此不能与 IX 同时授予。意向锁让整表锁请求检查表级状态即可判断冲突，避免逐条检查全部行锁。

### 2. `WHERE customer_id=8` 只返回一条记录，为什么可能仍锁住其他索引区间？

**参考答案：** 结果行数不等于扫描行数或锁范围。若 `customer_id` 是非唯一索引，RR 下锁定查询即使只返回一行，也可能使用 Next-Key/Gap 锁覆盖相邻区间，阻止插入新的 `customer_id=8`；如果没有有效索引，扫描并加锁的范围可能更大。使用二级索引取得排他锁还可能锁对应聚簇记录。这里说的是锁定读或写入；RC/RR 的普通一致性 SELECT 通常不加这些行锁。应同时检查执行计划、隔离级别与实际锁记录。

### 3. `ALTER TABLE` 长时间等待时，为什么仅查看 `data_locks` 可能不够？

**参考答案：** `data_locks` 主要展示存储引擎的数据锁，而 `ALTER TABLE` 常常等待服务器层的元数据锁 MDL。某连接即使只做过普通 SELECT，只要事务没有结束，也可能继续持有表的 MDL，阻塞修改表结构。

应查看 `performance_schema.metadata_locks` 的对象、`LOCK_STATUS` 和 `OWNER_THREAD_ID`，结合 `threads`、事务及会话信息找出等待者和持有者；`sys.schema_table_lock_waits` 也可辅助定位。处理重点是让阻塞事务合理结束，并检查是否存在空闲未提交连接，不能因 `data_locks` 没有等待就排除锁问题。[MySQL 8.4：metadata_locks](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-metadata-locks-table.html)

## 自测

- 画出表级 IS/IX 与行级 S/X 的关系，说明意向锁解决什么检查成本。
- 在 30 秒内说清 Record、Gap、Next-Key 的覆盖范围。
- 说明用哪个表看当前 InnoDB 行锁等待，用什么方式核对 SQL 是否走了预期索引。

## 延伸阅读

- [031-lock-types.md](/posts/MySQL/031-lock-types/)

## 官方参考（核对日期：2026-09-27）

- [MySQL 8.4：InnoDB Locking](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html)
- [MySQL 8.4：Locking Reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html)
- [MySQL 8.4：Performance Schema data_locks Table](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-data-locks-table.html)
