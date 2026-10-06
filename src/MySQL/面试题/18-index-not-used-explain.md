# 什么情况下索引会失效？如何通过EXPLAIN分析索引性能？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

“索引失效”不是一种单一状态：可能无法做索引范围定位、可以扫索引但仍回表，也可能优化器算出全表扫描更便宜；用执行计划和实测定位。

## 30–90 秒口语版

我先核对 SQL、列类型与现有索引，随后看 `EXPLAIN` 的 `type`、`possible_keys`、`key`、`key_len`、`rows`、`filtered`、`Extra`，再用 `EXPLAIN ANALYZE`比较估计与真实行数、时间和循环次数。常见原因包括前导 `%`、对索引列做未索引表达式、隐式转换、联合索引缺少有效前缀，或低选择性导致扫描成本更低。但不把这些说成“索引绝对失效”：MySQL 8.4 还有 skip scan、索引全扫描、索引下推等策略。改写谓词、补合适索引或更新统计信息后，要再测延迟和写入代价。

## 排查示例

```sql
CREATE INDEX idx_created ON orders(created_at);
-- 对列求函数，通常难用 idx_created 做日期区间定位
SELECT * FROM orders WHERE DATE(created_at) = '2026-09-27';
-- 改成半开区间，保持列裸露
SELECT * FROM orders
WHERE created_at >= '2026-09-27' AND created_at < '2026-09-28';
EXPLAIN ANALYZE SELECT * FROM orders
WHERE created_at >= '2026-09-27' AND created_at < '2026-09-28';
```

## 关键边界与取舍

- `possible_keys` 是候选，`key` 是实际选择；`key=NULL` 不表示表上没有索引。`rows` 是估计，实际情况看 `EXPLAIN ANALYZE`。
- `type=ALL` 不自动代表坏计划，小表或命中占比很高时可能合理；`Using index` 表示覆盖读取，`Using index condition` 是 ICP，含义不同。
- `EXPLAIN ANALYZE` 会真正执行查询；在生产库先评估开销与副作用。统计信息偏差可考虑 `ANALYZE TABLE`，但应在合适窗口评估其影响。

## 递进追问

### 1. `key` 有值而 `rows` 很大，算“索引失效”吗？

**参考答案：** 不能仅凭 `rows` 很大就叫“索引失效”。`key` 有值说明选中了索引，但可能是全索引扫描、很宽的范围，或者索引仅用于覆盖、排序。`rows` 还是估计值，需要结合 `type`、过滤比例、返回列和 `EXPLAIN ANALYZE` 的实际行数判断。例如读取全表的窄覆盖索引可能合理；只返回十行却扫描百万索引项，则应继续检查列序、谓词和分页方式。

### 2. 如何区分索引过滤、回表与额外排序的成本？

**参考答案：** 先用执行计划区分访问区间、索引上可判断的条件、必须读聚簇记录的列和排序节点。`Using index` 表示覆盖读取，`Using index condition` 表示 ICP，`Using filesort` 表示额外排序，不等于落盘。再比较实际行数、循环次数与耗时，并结合 I/O 等待；节点耗时可能包含子节点，不能直接相加，ICP 节点输出行数也未必等于遍历的全部索引项。需要拆分回表成本时，可在同样数据和缓存条件下对比覆盖与非覆盖查询，或控制 ICP 开关做实验，结合排序行数与磁盘活动验证瓶颈。

### 3. 为什么优化器在有索引时仍选择 `ALL`，如何验证估算偏差？

**参考答案：** 小表、条件命中比例很高或二级索引需要大量回表时，全表扫描可能更便宜；有索引不代表一定应选它。先对比 `EXPLAIN ANALYZE` 的估计与实际行数，检查参数值、数据倾斜、列类型及统计信息是否过时。若偏差明显，在合适窗口执行 `ANALYZE TABLE`，必要时为适用的过滤列维护直方图，再重测计划。可在测试环境用索引提示对比备选路径，但不要直接用 `FORCE INDEX` 掩盖分布变化，也不要认为单列直方图能完整描述多列相关性。[统计信息维护](https://dev.mysql.com/doc/refman/8.4/en/analyze-table.html)。

## 延伸阅读

- [018-index-effect-troubleshooting.md](/posts/MySQL/018-index-effect-troubleshooting/)
- [034-explain-query-analysis.md](/posts/MySQL/034-explain-query-analysis/)

## 官方依据

以下均为 MySQL 8.4 官方手册，核对日期：2026-09-27。

- [EXPLAIN Statement](https://dev.mysql.com/doc/refman/8.4/en/explain.html)
- [WHERE Clause Optimization](https://dev.mysql.com/doc/refman/8.4/en/where-optimization.html)
- [Range Optimization](https://dev.mysql.com/doc/refman/8.4/en/range-optimization.html)

## 自测

- 不看笔记，用 60 秒回答：什么情况下索引会失效？如何通过EXPLAIN分析索引性能？
- 用示例 SQL 解释访问路径、边界与取舍，并回答上面的递进追问。
