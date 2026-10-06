# 索引的维护成本有哪些？如何监控索引效果？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

索引的收益要减去空间、DML 维护和优化器选择成本；用慢查询、执行计划与长期索引使用统计评估，清理前验证业务覆盖。

## 30–90 秒口语版

每个二级索引都要存储和维护，`INSERT` 新增索引项，更新被索引列可能删除旧项并插入新项，删除也涉及索引记录和后续清理；索引越多，写入放大、缓存占用和 DDL 成本越高。我先从慢 SQL 找到真正需要优化的查询，再用 `EXPLAIN ANALYZE` 对比扫描行、回表和延迟。对疑似冗余索引，查 `sys.schema_redundant_indexes`、`sys.schema_unused_indexes` 和 Performance Schema 的索引使用统计，但“未使用”仅表示观测窗口内没记录，不能直接删除。先覆盖结算、月报等低频任务，再用不可见索引灰度验证，最后再删除。

## 排查示例

```sql
SHOW INDEX FROM orders;
SELECT * FROM sys.schema_redundant_indexes WHERE table_name = 'orders';
SELECT * FROM sys.schema_unused_indexes WHERE object_name = 'orders';
SELECT OBJECT_SCHEMA, OBJECT_NAME, INDEX_NAME, COUNT_FETCH
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = DATABASE() AND OBJECT_NAME = 'orders';
-- 验证前先记录原状态，观察所有关键业务周期
ALTER TABLE orders ALTER INDEX idx_old INVISIBLE;
```

## 关键边界与取舍

- 不可见索引仍被维护，唯一约束仍生效；它测试的是查询计划影响，并不会节省写入成本。
- 使用计数受重启、统计重置、采样窗口和工作负载影响；低频高价值查询不能凭零计数忽略。
- 有前缀关系的索引未必能互相替代：唯一约束、列序、排序、覆盖及外键依赖都需检查。

## 递进追问

### 1. 为什么索引越多，写入与缓存成本越高？

**参考答案：** 新增行通常要写入每个相关索引，更新索引键值也要维护旧、新索引项；页分裂、刷脏页和 redo 等工作会增加。索引页还与数据页争用 Buffer Pool，宽而多的索引可能挤出热点数据，造成更多 I/O。并非每次更新都会改所有二级索引，例如只改未索引列时不同；应结合写入字段、索引宽度、页分布和实测延迟评估，不能只数索引个数。

### 2. `schema_unused_indexes` 有结果，能立刻删吗？

**参考答案：** 不能。它只能说明观测窗口内没有记录到相应索引访问，窗口可能受重启、统计重置和监控配置影响，月报或结算查询也可能尚未执行。还要查唯一约束、外键依赖、索引提示及低频关键任务；即使没有用于查询，唯一索引仍可能承担业务正确性。先确认有可替代访问路径，再对允许隐藏的索引做不可见验证，覆盖关键业务周期后才决定是否删除。

### 3. 如何设计“不可见索引—观察—恢复/删除”的灰度流程？

**参考答案：** 先保存索引定义与关键 SQL 的计划、延迟基线，排除主键及外键等依赖，选一个可隐藏的候选索引。将其设为 `INVISIBLE` 后，确认业务会话未主动启用不可见索引，观察峰值、定时任务和低频报表的延迟、扫描量、错误及资源变化；引用该索引的提示也要检查。出现退化就恢复 `VISIBLE` 并复核原因，观察充分且无约束需求后再评估删除。不可见期间仍有写入维护成本，所以这一步验证查询影响；真正删除后还需确认空间和写入收益。[不可见索引](https://dev.mysql.com/doc/refman/8.4/en/invisible-indexes.html)。

## 延伸阅读

- [019-too-many-indexes.md](/posts/MySQL/019-too-many-indexes/)
- [018-index-effect-troubleshooting.md](/posts/MySQL/018-index-effect-troubleshooting/)

## 官方依据

以下均为 MySQL 8.4 官方手册，核对日期：2026-09-27。

- [Optimization and Indexes](https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html)
- [Invisible Indexes](https://dev.mysql.com/doc/refman/8.4/en/invisible-indexes.html)
- [The schema_unused_indexes View](https://dev.mysql.com/doc/refman/8.4/en/sys-schema-unused-indexes.html)
- [The schema_redundant_indexes View](https://dev.mysql.com/doc/refman/8.4/en/sys-schema-redundant-indexes.html)
- [Table I/O and Lock Wait Summary Tables](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-table-wait-summary-tables.html)

## 自测

- 不看笔记，用 60 秒回答：索引的维护成本有哪些？如何监控索引效果？
- 用示例 SQL 或故障时间线解释边界与取舍，并回答上面的递进追问。
