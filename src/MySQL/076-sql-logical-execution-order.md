# SQL 中 SELECT、FROM、JOIN、WHERE、GROUP BY、HAVING、ORDER BY、LIMIT 的执行顺序是什么？

日期：2026-07-11  
难度：中等  
标签：#面试 #MySQL #SQL #执行顺序 #VIP

## 一句话答案

逻辑处理顺序通常是 FROM/JOIN/ON → WHERE → GROUP BY → 聚合计算 → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT；实际物理执行会被优化器改写。

## 面试口语版

先从 FROM 确定数据源，按 JOIN 和 ON 形成连接结果；WHERE 在分组前过滤行；GROUP BY 分组并计算聚合；HAVING 过滤分组；SELECT 计算输出列，之后处理 DISTINCT；ORDER BY 排序，最后 LIMIT 截取结果。这个顺序能解释为什么聚合条件一般写 HAVING、WHERE 通常不能直接引用本层 SELECT 别名，而 ORDER BY 可以。但它是 SQL 的逻辑语义顺序，优化器可能做谓词下推、连接重排和提前 LIMIT，物理执行不一定逐阶段生成中间表。

## 原理拆解

```mermaid
flowchart LR
  A[FROM] --> B[JOIN/ON]
  B --> C[WHERE]
  C --> D[GROUP BY/聚合]
  D --> E[HAVING]
  E --> F[SELECT]
  F --> G[DISTINCT]
  G --> H[ORDER BY]
  H --> I[LIMIT]
```

## 关键细节

- ON 决定连接匹配，WHERE 过滤连接后的行；外连接中两者位置会影响结果。
- WHERE 不能使用聚合结果，因为此时尚未分组；聚合过滤用 HAVING。
- MySQL 对别名和 GROUP BY 有部分扩展语法，跨数据库时不要依赖非标准行为。

## 面试官追问

1. LEFT JOIN 的右表条件放 ON 和 WHERE 有何区别？
2. WHERE 与 HAVING 如何选择？
3. 为什么 ORDER BY 可以使用 SELECT 别名？

## 高分补充

区分“逻辑顺序”和“执行计划”能避免把 SQL 语义解释成数据库内部固定流水线。

## 学习清单

- 手写完整顺序，并用别名、聚合和 LEFT JOIN 各举一例。
