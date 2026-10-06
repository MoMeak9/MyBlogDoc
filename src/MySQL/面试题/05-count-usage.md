# COUNT函数有哪些使用方式？性能有什么区别？如何优化COUNT查询？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions/q_1756285708194962267?activeIndex=0&from=50e19cbb-21c2-4330-b45f-5748ae5d8672)  
答案说明：根据可访问的题目详情改写

## 一句话答案

COUNT(*)统计行数，COUNT(列)统计该列非NULL的行，COUNT(DISTINCT 列)统计非NULL去重值；精确计数通常仍需扫描索引。

## 面试口语版（约 60 秒）

COUNT(*) 统计满足条件的行，COUNT(列)只统计该列非 NULL 的行，COUNT(DISTINCT 列)统计非 NULL 的不同值。COUNT(1) 的常量对每行非 NULL，语义上与 COUNT(*) 计行一致；不要把它当通用性能技巧。InnoDB 的 MVCC 使精确全表行数不能简单读一条共享元数据，通常需要扫描适当索引。

## 原理拆解与场景

设 `orders.status` 有 NULL：

```sql
SELECT COUNT(*) AS all_rows,
       COUNT(status) AS known_status,
       COUNT(DISTINCT status) AS kinds
FROM orders WHERE created_at >= '2026-09-01';
EXPLAIN ANALYZE SELECT COUNT(*) FROM orders
WHERE created_at >= '2026-09-01';
```

给高频条件建立合适索引可能减少扫描成本；用户界面若只需近似或延迟统计，可用事件增量汇总表，定期重算对账。

## 关键边界与工程取舍

`COUNT(*)` 和 `COUNT(1)` 的速度由计划、索引与缓存状态决定，不应声称后者恒快。空结果的 `COUNT(*)` 返回 0；`COUNT(DISTINCT a,b)` 的 NULL 语义要另行验证，不能直接套单列公式。近似计数要向业务声明误差和更新延迟。

## 面试官递进追问

### 1. COUNT(*) 与 COUNT(col) 在 NULL 行上有何差别？

**参考答案：** COUNT(*) 统计通过过滤的结果行，不关心任何列是否为 NULL；COUNT(col) 只统计该表达式非 NULL 的行。例如三行值是 `NULL、''、'paid'`，两者分别为 3 和 2，空字符串仍会计入。LEFT JOIN 中无匹配的左行也使 COUNT(*) 增加，但 `COUNT(右表非空主键)` 不增加，适合统计实际匹配数。二者只有在统计范围内该列保证非 NULL 时才等价，选法首先由业务口径决定。

### 2. 为什么 InnoDB 不直接保存一个供所有事务读取的精确行数？

**参考答案：** 因为精确行数是相对事务可见性而言的。一个事务删除了记录但尚未提交，另一个事务仍可能看到它；在 REPEATABLE READ 中，不同时间建立的读视图也可能看到不同的已提交版本。单个共享计数器无法同时代表这些视图，InnoDB 的 COUNT(*) 因而要统计当前事务可见的记录。简单无条件计数通常扫描较小的二级索引，没有二级索引才扫描聚簇索引；表统计中的行数是估算值，不能直接代替业务要求的精确结果。

### 3. 千万级频繁计数如何设计汇总和对账？

**参考答案：** 先明确是要求事务内精确、秒级延迟还是只需近似。强一致计数可与业务增删在同一事务内更新汇总行，但单个计数行可能成为锁热点，可按租户或时间分桶。允许延迟则用 outbox/CDC 产生增量事件，消费端用事件 ID 去重，并把去重记录与加减计数原子提交；状态变化要同时扣旧桶、加新桶。对账应在一致快照或明确日志进度上分桶重算，与同一进度的汇总比较，再带版本替换或从检查点重放，避免把正常同步延迟误判为丢数。监控积压、重复事件和计数偏差，不能只观察总数是否“大致接近”。

## 自测

- 合上笔记，用 60 秒复述一句话结论、一个例子和一个边界。
- 完成第 3 个追问，写出你会核对的 SQL、指标或故障证据。

## 延伸阅读

- [035-count-differences.md](/posts/MySQL/035-count-differences/)

## 参考资料

以 MySQL 8.4 为版本基准；官方资料核对日期：2026-09-27。

- [聚合函数 COUNT](https://dev.mysql.com/doc/refman/8.4/en/aggregate-functions.html)
- [EXPLAIN ANALYZE](https://dev.mysql.com/doc/refman/8.4/en/explain.html)
