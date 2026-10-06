# 如何在 MySQL 中监控和优化慢 SQL？

日期：2026-07-11  
难度：中等  
标签：#面试 #MySQL #慢查询 #SQL优化 #场景题 #VIP

## 一句话答案

通过慢查询日志、Performance Schema 和链路监控按总耗时、P99、调用量与扫描行数定位高价值 SQL，再用执行计划、数据分布和等待事件查根因，优化后用真实流量回归并持续监控。

## 面试口语版

我会先建立可观测性：开启并合理设置 slow query log 的 `long_query_time`，配合 `log_queries_not_using_indexes` 时要谨慎，避免日志风暴；再用 Performance Schema、sys schema、APM 按 SQL digest 聚合，不能只看单次最慢，还要看“平均耗时乘调用量”和 P95/P99。定位具体 SQL 后执行 EXPLAIN，MySQL 8 可在安全环境用 EXPLAIN ANALYZE 对比估算与实际行数，并检查锁等待、临时表、filesort、回表和磁盘 I/O。优化索引或 SQL 后做压测、结果一致性验证，观察写放大和缓存命中变化。

## 原理拆解

```mermaid
flowchart LR
  A[慢日志/APM/P_S] --> B[SQL Digest 聚合]
  B --> C[按总成本与P99排序]
  C --> D[执行计划/等待/数据分布]
  D --> E[SQL/索引/架构优化]
  E --> F[压测与持续监控]
```

## 关键细节

- 慢 SQL 不一定是执行计划差，也可能是锁等待、IO 抖动、连接池排队或网络延迟。
- `rows_examined`、返回行数、临时表落盘和锁时间往往比单一耗时更能解释根因。
- 新增索引会增加写入、空间和 DDL 成本，应删除重复或长期无用索引。

## 面试官追问

1. `long_query_time` 应如何设置？
2. 为什么不能只优化最慢的一条 SQL？
3. EXPLAIN 估算不准怎么办？
4. 如何灰度发布索引？

## 高分补充

建立“SQL 指纹—负责人—SLO—变更前后指标”闭环，避免慢查询治理变成一次性运动。

## 学习清单

- 熟悉慢日志、Performance Schema、sys schema 和 APM 的职责边界。
