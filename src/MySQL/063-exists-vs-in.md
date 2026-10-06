# MySQL 中 EXISTS 和 IN 的区别是什么？

日期：2026-07-11  
难度：简单  
标签：#面试 #MySQL #EXISTS #IN #SQL #VIP

## 一句话答案

IN 判断表达式是否属于结果集合，EXISTS 只判断相关子查询是否至少返回一行；现代 MySQL 常将二者优化为半连接，性能应看执行计划，而 `NOT IN` 遇到 NULL 的语义尤其容易踩坑。

## 面试口语版

IN 更像集合成员判断，适合常量列表或子查询结果；EXISTS 通常写成相关子查询，只要找到第一条匹配就能判定为真。传统经验说“外表小用 EXISTS、子查询小用 IN”，但 MySQL 8 会做半连接、物化、去重等改写，不能机械套公式，应通过 EXPLAIN 和真实数据分布判断。语义上最重要的是 NULL：如果 `NOT IN` 的集合中包含 NULL，比较结果可能变成 UNKNOWN，导致一行都不返回；反连接通常优先写 `NOT EXISTS` 并明确关联条件。

## 原理拆解

```sql
-- 半连接：查有订单的用户
SELECT * FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- 反连接：查没有订单的用户
SELECT * FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);
```

## 关键细节

- EXISTS 子查询中的 `SELECT 1` 只是表达“不关心列”，优化器不会因为写 `SELECT *` 就必须读取整行。
- `IN` 常量列表太大会增加解析、计划和传输成本，可改临时表或批量关联。
- 关联列应类型一致并有合适索引。

## 面试官追问

1. `NOT IN` 遇到 NULL 会怎样？
2. 什么是半连接和反连接？
3. EXISTS 的子查询一定逐行执行吗？

## 高分补充

先保证 NULL 语义正确，再谈性能；性能结论必须以优化后的实际执行计划为准。

## 学习清单

- 用一个含 NULL 的例子比较 NOT IN 与 NOT EXISTS。
