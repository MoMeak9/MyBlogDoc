# MySQL 中 `LIMIT 100000000, 10` 和 `LIMIT 10` 的执行速度是否相同？

日期：2026-07-11  
难度：简单  
标签：#面试 #MySQL #深度分页 #LIMIT #VIP

## 一句话答案

通常不相同；`LIMIT 100000000, 10` 需要先定位、扫描并丢弃前一亿条候选记录，再返回 10 条，成本远高于直接 `LIMIT 10`。

## 面试口语版

LIMIT 的 offset 不是让存储引擎瞬间跳到第 N 行。MySQL 通常仍要按执行计划读取前 `offset + size` 条，再丢弃 offset 部分。如果查询还需要回表、排序或临时表，代价更大，所以页码越深越慢。优化一般用基于稳定索引的 seek 分页，比如 `WHERE id > last_id ORDER BY id LIMIT 10`；必须跳页时，可先用覆盖索引只取目标主键，再回表查询 10 行，减少前面大量记录的回表成本。

## 原理拆解

```sql
-- 深 offset：扫描并丢弃大量记录
SELECT * FROM orders ORDER BY id LIMIT 100000000, 10;

-- 游标/seek 分页
SELECT * FROM orders
WHERE id > ?
ORDER BY id
LIMIT 10;

-- 延迟关联，适合必须使用 offset 的场景
SELECT o.*
FROM orders o
JOIN (SELECT id FROM orders ORDER BY id LIMIT 100000000, 10) x
  ON x.id = o.id
ORDER BY o.id;
```

## 关键细节

- 即使使用覆盖索引，扫描一亿个索引项仍有成本，只是可能避免大量回表。
- 没有稳定 `ORDER BY` 的分页结果顺序不保证固定。
- Cursor 分页不适合直接跳到任意页，需要产品交互配合。

## 面试官追问

1. 为什么索引不能直接跳到第 N 条？
2. 延迟关联解决了什么，没解决什么？
3. 复合排序如何设计游标？

## 高分补充

深分页同时是数据库和产品问题；搜索类业务通常限制最大页数或改为“加载更多”。

## 学习清单

- 对比 OFFSET、延迟关联、Cursor 三种方案。
