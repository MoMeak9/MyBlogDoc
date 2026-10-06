# 什么是最左前缀原则？复合索引如何优化查询性能？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

联合索引按定义的列序排列，连续左侧键值可用于高效定位；后续列仍可能用于过滤、覆盖或排序，不能机械地说“范围后全部失效”。

## 30–90 秒口语版

如索引 `(tenant_id,status,created_at)`，`tenant_id=7 AND status=1 AND created_at>=...` 能形成较窄访问区间；只按 `status` 查询一般无法像有首列条件那样直接定位，但优化器可能选择全索引扫描或满足条件时使用 skip scan。等值条件固定前列后，索引还能服务后列排序；一旦前面是范围，不可笼统说后列“不能用”，要区分是否能进一步缩小区间、用于索引条件过滤或覆盖。列序要结合真实 WHERE、ORDER BY、选择性和写入成本，最后看计划和实测。

## SQL 示例

```sql
CREATE INDEX idx_tenant_status_time ON orders(tenant_id, status, created_at);
-- 连续前缀：等值、等值、范围
SELECT id FROM orders WHERE tenant_id=7 AND status=1
  AND created_at >= '2026-09-01';
-- 跳过 tenant_id：不能直接按同样的连续前缀定位
SELECT id FROM orders WHERE status=1;
```

## 关键边界与取舍

- “最左”指索引键顺序，不是 SQL 中 `WHERE` 条件的书写顺序。
- MySQL 8.4 的 skip scan 有适用条件，不能依赖它替代合适的业务索引；用 `EXPLAIN Extra` 的 `Using index for skip scan` 验证。
- 前缀索引、排序方向、范围条件及覆盖需求都可能改变合适列序；单凭“选择性最高放最左”不能完成设计。

## 递进追问

### 1. `(a,b,c)` 对 `WHERE b=1` 有哪些可能的访问方式？

**参考答案：** 缺少最左列 `a` 的条件，通常不能直接像查 `(a,b)` 连续前缀那样定位 `b=1`。优化器可能选择全表扫描，若查询列被覆盖，也可能选择扫描整个 `(a,b,c)` 索引后过滤。MySQL 8.4 在满足单表、仅引用索引列、无 `GROUP BY`/`DISTINCT` 等限制且成本合适时，还可能枚举不同 `a` 值进行 skip scan；应以计划中的 `Using index for skip scan` 验证。若 `b` 是高频查询入口，仍应评估以 `b` 开头的索引。

### 2. `a=1 AND b>5 AND c=9` 中 `c` 是否完全无用？

**参考答案：** 不是。对通常的 `(a,b,c)` 范围访问，`a=1` 固定首列，`b>5` 确定范围，`c=9` 一般不能继续把该连续访问区间缩窄。但引擎可在索引项上判断 `c`，若查询仍需完整行且满足 ICP 条件，可据此跳过无效回表；若所需列全部被覆盖，`c` 也能直接用于索引内过滤。要进一步减少扫描，可评估 `(a,c,b)`，但还需看其他查询、排序需求和写入代价。

### 3. 一个查询要按 `created_at DESC` 排序，索引列序如何取舍过滤与排序？

**参考答案：** 先固定必带的等值过滤列，再考虑把 `created_at` 放到能保持顺序的位置。例如租户与状态都是单值等值时，`(tenant_id,status,created_at)` 可同时过滤并按时间扫描。若前面存在金额范围或多个状态，时间值会分散在多个区间，通常不能直接满足全局时间排序。此时比较“选择性强的过滤后排序”与“按时间扫描再过滤”：前者适合命中很少，后者在 `LIMIT` 较小且合格行密集时可能占优。用真实分布、扫描量和耗时决定，分页时再加入唯一 ID。

## 延伸阅读

- [014-leftmost-prefix-rule.md](/posts/MySQL/014-leftmost-prefix-rule/)

## 官方依据

以下均为 MySQL 8.4 官方手册，核对日期：2026-09-27。

- [Multiple-Column Indexes](https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html)
- [Range Optimization](https://dev.mysql.com/doc/refman/8.4/en/range-optimization.html)
- [ORDER BY Optimization](https://dev.mysql.com/doc/refman/8.4/en/order-by-optimization.html)

## 自测

- 不看笔记，用 60 秒回答：什么是最左前缀原则？复合索引如何优化查询性能？
- 用示例 SQL 解释访问路径、边界与取舍，并回答上面的递进追问。
