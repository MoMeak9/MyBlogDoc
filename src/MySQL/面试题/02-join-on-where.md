# 内连接与外连接有什么区别？ON和WHERE条件在连接查询中有什么不同？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions/q_1756285708185879381?activeIndex=0&from=50e19cbb-21c2-4330-b45f-5748ae5d8672)  
答案说明：根据可访问的题目详情改写

## 一句话答案

内连接只保留匹配行；外连接会保留指定一侧的未匹配行，因此ON与WHERE在外连接中可能产生不同结果。

## 面试口语版（约 60 秒）

内连接只返回能匹配的组合；左外连接还保留左表无匹配的行，右表列用 NULL 补齐。ON 描述怎样匹配，WHERE 则筛最终结果。内连接中很多条件可等价改写；但左连接里把右表过滤条件放在 ON 和 WHERE，结果往往不同，因为 WHERE 会把补出的 NULL 行过滤掉。性能上仍要看连接列索引和实际执行计划。

## 原理拆解与场景

假设用户 1 没有已支付订单：

```sql
-- 保留用户 1，订单列为 NULL
SELECT u.id, o.id FROM users u
LEFT JOIN orders o ON o.user_id=u.id AND o.status='paid';

-- 用户 1 被 WHERE 排除
SELECT u.id, o.id FROM users u
LEFT JOIN orders o ON o.user_id=u.id
WHERE o.status='paid';
```

若要查询“没有已支付订单的用户”，在第一条基础上加 `WHERE o.id IS NULL`；`o.id` 应是右表非空键。

## 关键边界与工程取舍

不要笼统说 WHERE 一定在物理执行上最后运行：优化器可推下过滤或改写外连接；这里讨论的是 SQL 结果语义。多对一关系没约束时 JOIN 会放大行数，不能靠 `DISTINCT` 掩盖数据建模问题。

## 面试官递进追问

### 1. 左连接无匹配时右表列是什么？

**参考答案：** LEFT JOIN 对每一条没有右侧匹配的左表记录，会生成一条右表各列均为 NULL 的结果行，右表原来声明为 NOT NULL 的列也一样；这属于查询结果补齐，不是往表里插入了 NULL。若要找没有订单的用户，可检查 `o.id IS NULL`，其中 `o.id` 必须是右表非空键。检查右表可空业务列会把“匹配到了、但该列本来为空”的行也算进去。

### 2. 为什么右表条件移到 WHERE 后可能丢左表行？

**参考答案：** ON 决定哪些右表记录可与左表匹配，匹配失败后 LEFT JOIN 仍保留左表记录；WHERE 则判断连接后的结果。把 `o.status='paid'` 移到 WHERE，补齐行上的比较得到 UNKNOWN，因此被过滤。这个结论针对会拒绝 NULL 的条件，`WHERE o.id IS NULL` 就不是如此。也不要简单补 `OR o.id IS NULL`：若用户只有未支付订单，连接已经匹配到记录，不会再生成一条空行；想保留这类用户，应把“已支付”条件放在 ON 中。

### 3. 如何用 EXPLAIN ANALYZE 诊断连接放大？

**参考答案：** 先看连接节点输出多少行，再看左右输入和内层查找的实际 `rows`、`loops`。例如左侧有 100 个用户，内层平均返回 20 条订单且执行 100 次，约产生 2000 条匹配记录；继续连接明细还可能进一步放大。多次循环的行数应结合循环次数理解，不能只看一个 rows 值。再用 `GROUP BY 连接键 HAVING COUNT(*)>1` 核对本应唯一的一侧，并检查是否漏了租户等连接条件。真实的一对多并非错误；只判断存在时改用 EXISTS，需要汇总则先聚合到目标粒度。节点耗时包含子节点，不应直接逐项相加。[EXPLAIN ANALYZE](https://dev.mysql.com/doc/refman/8.4/en/explain.html)

## 自测

- 合上笔记，用 60 秒复述一句话结论、一个例子和一个边界。
- 完成第 3 个追问，写出你会核对的 SQL、指标或故障证据。

## 延伸阅读

- [002-sql-join-on-where.md](/posts/MySQL/002-sql-join-on-where/)

## 参考资料

以 MySQL 8.4 为版本基准；官方资料核对日期：2026-09-27。

- [MySQL JOIN 子句](https://dev.mysql.com/doc/refman/8.4/en/join.html)
- [外连接优化](https://dev.mysql.com/doc/refman/8.4/en/outer-join-optimization.html)
