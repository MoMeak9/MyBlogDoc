# 如何使用 MySQL 的 EXPLAIN 语句进行查询分析？

日期：2026-07-11  
难度：中等  
标签：#面试 #MySQL #EXPLAIN #SQL优化

## 一句话答案

先对真实 SQL 执行 `EXPLAIN` 或 `EXPLAIN ANALYZE`，重点看访问类型、实际使用索引、估算/实际扫描行数和 Extra，再结合数据分布与耗时验证优化是否有效。

## 面试口语版

我会先用 `EXPLAIN SELECT ...` 看每张表的访问顺序和索引选择，重点关注 `type` 是否出现 `ALL`、`key` 是否为空、`rows` 是否过大，以及 `Extra` 是否有 `Using temporary`、`Using filesort`。`possible_keys` 只是候选，`key` 才是实际使用索引。MySQL 8 可以用 `EXPLAIN ANALYZE` 执行 SQL 并给出实际行数和时间，用它校验优化器估算；生产环境对高成本语句要谨慎。发现问题后不是盲目加索引，而是结合 WHERE、JOIN、ORDER BY、LIMIT 和选择性改写 SQL 或索引，再复测。

## 关键细节

| 字段 | 关注点 |
| --- | --- |
| `type` | 通常 `const/eq_ref/ref/range` 优于 `ALL`，需结合场景判断 |
| `key`、`key_len` | 实际索引与使用到的前缀长度 |
| `rows`、`filtered` | 估算扫描量与过滤比例，不是精确值 |
| `Extra` | `Using index` 常是覆盖索引；`temporary/filesort` 需评估 |

## 面试官追问

1. `Using filesort` 一定很差吗？
2. `EXPLAIN ANALYZE` 与 EXPLAIN 的区别？
3. 为什么有索引优化器却没选？

## 学习清单

- 为一条慢 SQL 做“执行计划—改索引/SQL—复测”闭环。
