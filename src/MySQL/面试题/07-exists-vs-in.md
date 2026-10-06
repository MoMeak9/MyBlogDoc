# EXISTS和IN子查询有什么区别？性能如何？如何选择合适的子查询方式？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

EXISTS 判断子查询是否至少返回一行（可以相关，也可以非相关），IN 判断值是否属于子查询结果；优化器可能将语义等价的写法改写为相近执行计划。

## 面试口语版（约 60 秒）

EXISTS 表达“子查询至少有一行”，IN 表达“值属于子查询结果”。当比较列非 NULL 且语义相同时，它们经常被优化成半连接等相近计划，不能说 EXISTS 永远快。最需警惕的是 NOT IN：子查询若产生 NULL，外层比较可能变 UNKNOWN，导致看起来该返回的行消失。要按业务语义、NULL 约束和 EXPLAIN ANALYZE 选。

## 原理拆解与场景

```sql
-- 查有订单的用户
SELECT u.id FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id=u.id);

-- 查无订单的用户，避免 nullable user_id 使 NOT IN 出错
SELECT u.id FROM users u
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id=u.id);
```

若 `orders.user_id` 可为 NULL，`u.id NOT IN (SELECT user_id FROM orders)` 在含 NULL 的结果集上可能一行都不返回。给 `orders(user_id)` 建索引，再比较计划中的半连接、物化和实际扫描行数。

## 关键边界与工程取舍

EXISTS 内 SELECT 1 只是表达不关心投影列，不是神奇提速开关。IN 子查询与 EXISTS 在 NULL、重复值和相关条件下不一定可直接文本替换；先确认结果语义。反连接优化对可空比较表达式有更多限制。

## 面试官递进追问

### 1. NOT IN 遇到 NULL 会怎样？

**参考答案：** 对标量比较，若子查询含 NULL，未匹配到非空值的 `x NOT IN (...)` 会得到 UNKNOWN，WHERE 不保留它；若明确匹配到某个非空值，则结果为 FALSE，而不是 UNKNOWN。因此右侧含 NULL 时通常找不到任何“未出现”的值。还要区分外层 NULL：右侧非空时其 NOT IN 也是 UNKNOWN；右侧为空子查询时则为 TRUE。可用 `SELECT 2 NOT IN (1,NULL), 1 NOT IN (1,NULL)` 看到 NULL 和 0，不能笼统说所有比较都会返回 NULL。

### 2. 什么时候 IN 与 EXISTS 可以有同类执行计划？

**参考答案：** 当二者表达相同的存在性过滤，且子查询满足优化器的半连接改写条件时，MySQL 8.4 可以给 IN 和等价 EXISTS 选择同类计划，例如首次匹配、去重、松散扫描或物化。常见前提是谓词处于 WHERE/ON 顶层或 AND 项中，子查询没有 UNION、聚合、HAVING、LIMIT 等限制；可被解关联的等值条件也有帮助。是否改写及选哪种策略仍由成本、统计信息和开关决定；投影中的三值结果不能简单套用 WHERE 过滤等价关系。[半连接与反连接优化](https://dev.mysql.com/doc/refman/8.4/en/semijoins-antijoins.html)

### 3. 怎样利用 EXPLAIN ANALYZE 判断半连接和物化开销？

**参考答案：** 先检查树形计划是否出现 semijoin、首次匹配、去重或 materialize 等节点，再分清一次性构建与每次外层探测的代价。若物化子查询只执行一次，但需扫描百万行并去重，主要成本在构建；若相关查找循环几十万次，则要看每次返回行数、循环次数和连接键索引。结合实际 rows、loops 与估算比较，识别数据倾斜或错误基数估计；节点时间包含子节点，不能直接全部相加。用相同数据和缓存条件比较总耗时，必要时检查临时表落盘。执行计划名称只是策略，最终依据是实际处理量和端到端耗时。

## 自测

- 合上笔记，用 60 秒复述一句话结论、一个例子和一个边界。
- 完成第 3 个追问，写出你会核对的 SQL、指标或故障证据。

## 延伸阅读

- [063-exists-vs-in.md](/posts/MySQL/063-exists-vs-in/)

## 参考资料

以 MySQL 8.4 为版本基准；官方资料核对日期：2026-09-27。

- [半连接与反连接优化](https://dev.mysql.com/doc/refman/8.4/en/semijoins-antijoins.html)
- [EXISTS 策略与 NULL](https://dev.mysql.com/doc/refman/8.4/en/subquery-optimization-with-exists.html)
