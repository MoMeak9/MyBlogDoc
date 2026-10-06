# 深分页查询如何优化？LIMIT大偏移量的性能问题如何解决？

日期：2026-09-27  
标签：#面试 #场景设计 #MySQL  
难度：困难  
来源：[牛面场景题](https://niumianoffer.com/nm_practice/questions?bank_id=bank_1757645675392050216&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

大偏移量 `LIMIT` 仍需定位并跳过前面的记录；连续翻页用与排序索引一致的键集游标，任意页跳转则控制范围或设计专用读模型。

## 面试口语版（约 60 秒）

“`LIMIT 100000, 20` 只返回 20 行，但数据库仍要找到并跳过前面的 10 万行；如果还要回表或排序，开销更大。信息流和订单列表这种向后翻页，我会用键集分页：按 `created_at DESC, id DESC` 建稳定的全序，上一页最后一条的两个值作为游标，下一页只查比它更旧的记录，配合租户等过滤条件建联合索引。若业务必须跳到任意页，可限制最大页深，或用覆盖索引先取 ID 再读详情，但大偏移的索引扫描仍在；对于报表或导出，更适合异步任务。还要说明数据并发插入时游标分页通常比 OFFSET 少重复和漏项，但它也不自动提供跨页一致快照。”

## SQL 示例：订单倒序连续翻页

假设索引为 `(tenant_id, created_at DESC, id DESC)`，`id` 唯一，查询条件固定。第一页：

```sql
SELECT id, created_at, amount
FROM orders
WHERE tenant_id = ?
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

下一页保存上一页最后一条的 `created_at` 和 `id`，并使用同样的排序方向：

```sql
SELECT id, created_at, amount
FROM orders
WHERE tenant_id = ?
  AND (created_at < ? OR (created_at = ? AND id < ?))
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

**失败分支：** 若只用 `created_at` 游标，多条订单同一毫秒创建，翻页会漏掉同一时间戳的记录。必须用唯一 `id` 补齐排序；若排序字段可变，记录被更新后仍可能跨页重复或遗漏。优先使用不可变排序键；若必须得到稳定结果，需要物化结果集或跨页保持同一事务快照，并承担相应存储或长事务成本。信息流场景也可明确接受变化中的列表语义。

## 关键细节与取舍

- `LIMIT offset, size` 的偏移量不是“从索引第 offset 个位置瞬移”；有合适索引可减少排序，但深偏移的扫描成本仍随 offset 增长。
- “先查覆盖索引里的 ID 再回表”减少了大量无用行的详情读取，适合无法改 API 的场景；它不能消除跳过前置索引项的成本。
- 游标必须绑定查询过滤条件和排序版本，最好编码成不可随意篡改的 token；`NULL`、混合升降序和过滤条件变化要单独处理。
- 精确总数 `COUNT(*)` 可能也昂贵。连续浏览可只返回 `has_more`，后台报表可用异步计算或有时效说明的缓存总数。

## 面试官递进追问

1. 有索引时 `LIMIT 100000,20` 为什么仍可能慢？
2. 多行 `created_at` 相同时，游标应该记录什么？
3. 产品坚持“跳到第 5000 页”且要精确总数，你怎样说明成本并设计替代方案？

## 自测与学习清单

- 手写第一页和下一页 SQL，验证排序、过滤和游标条件完全一致。
- 用并发新增与修改记录模拟跨页重复或漏项，说明可接受的一致性语义。
- 比较 OFFSET、覆盖索引延迟回表、键集分页在不同页深的扫描行数与 P95。

## 参考资料

- [MySQL 8.4：SELECT 的 LIMIT/OFFSET 语义](https://dev.mysql.com/doc/refman/8.4/en/select.html)、[LIMIT Query Optimization](https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html)、[Optimization and Indexes](https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html)（核对日期：2026-09-27）。
