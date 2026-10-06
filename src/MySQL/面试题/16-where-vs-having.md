# WHERE和HAVING有什么区别？什么时候使用HAVING？如何优化分组查询？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：简单  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

WHERE在分组前筛选原始行，HAVING在分组后筛选分组结果，聚合条件通常写在HAVING。

## 面试口语版（约 60 秒）

WHERE 筛选参与分组的原始行；HAVING 筛选分组或聚合后的结果。比如统计今年每个用户已支付订单数，支付状态和时间条件写 WHERE，`COUNT(*) >= 3` 写 HAVING。能在分组前判断的条件通常前置，以减少扫描和聚合工作，但最终物理执行还取决于优化器计划。

## 原理拆解与场景

```sql
SELECT user_id, COUNT(*) AS paid_count
FROM orders
WHERE status='paid' AND created_at >= '2026-01-01'
GROUP BY user_id
HAVING COUNT(*) >= 3;
```

如果常跑此类查询，可根据过滤选择性和分组需求评估 `(status, created_at, user_id)` 等索引；具体列顺序必须用真实数据与 `EXPLAIN ANALYZE` 验证。

## 关键边界与工程取舍

WHERE 不能直接使用聚合函数；HAVING 可以在无显式 GROUP BY 时用于单个隐式组。MySQL 有对 HAVING 的扩展和部分下推优化，因此“WHERE 必定先执行、HAVING 必定最后执行”只是理解语义的简化说法。不要把非聚合条件全塞 HAVING。

## 面试官递进追问

### 1. WHERE 能直接写 COUNT(*) > 3 吗？

**参考答案：** 不能在同一查询层的 `WHERE` 中直接写 `COUNT(*) > 3`，因为它筛选的是参与聚合的原始行，此时还没有该组的计数。应写成 `GROUP BY user_id HAVING COUNT(*) > 3`。也可以先在子查询或 CTE 中聚合出 `cnt`，外层再用 `WHERE cnt > 3`；此时 `cnt` 已是外层输入中的普通列。不要把“WHERE 中出现聚合子查询”与“WHERE 直接计算本层聚合”混为一谈。

### 2. 没有 GROUP BY 可以用 HAVING 吗？

**参考答案：** 可以。例如 `SELECT COUNT(*) AS cnt FROM orders HAVING COUNT(*) > 3`，把所有输入行视为一个隐式组，计数大于 3 才返回一行，否则返回空结果。若表为空，`COUNT(*)` 为 0，该条件也不成立。不要因此随意混入未聚合的明细列；默认启用的 `ONLY_FULL_GROUP_BY` 会检查这类语义。普通行过滤仍优先放在 `WHERE`。

### 3. 高基数分组慢时如何从索引、临时表和扫描量定位？

**参考答案：** 先用 `EXPLAIN ANALYZE` 看输入扫描行数、过滤后行数和聚合节点耗时，判断是读得太多还是分组状态太大。把能前置的时间、状态条件放进 `WHERE`，再比较过滤优先与分组顺序优先的联合索引；即使按索引分组，`COUNT(*)` 通常仍要读取每组参与统计的行，不能期待直接跳到结果。随后核对临时表、磁盘 I/O 和会话临时表计数，判断是否因分组过多、行过宽而溢出。高基数且扫描不可避免时，可缩短统计范围或预聚合，不能只增大临时表内存。[GROUP BY 优化](https://dev.mysql.com/doc/refman/8.4/en/group-by-optimization.html)。

## 自测

- 合上笔记，用 60 秒复述一句话结论、一个例子和一个边界。
- 完成第 3 个追问，写出你会核对的 SQL、指标或故障证据。

## 延伸阅读

- [076-sql-logical-execution-order.md](/posts/MySQL/076-sql-logical-execution-order/)

## 参考资料

以 MySQL 8.4 为版本基准；官方资料核对日期：2026-09-27。

- [SELECT 的 WHERE 与 HAVING](https://dev.mysql.com/doc/refman/8.4/en/select.html)
- [WHERE 优化](https://dev.mysql.com/doc/refman/8.4/en/where-optimization.html)
