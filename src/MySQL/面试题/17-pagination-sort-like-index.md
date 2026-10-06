# 分页查询、排序、模糊查询如何进行索引优化？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

把等值过滤、稳定排序和分页游标放在同一访问路径上；`LIKE '前缀%'`可尝试范围查找，`LIKE '%词%'`不能按普通 B-tree 前缀定位。

## 30–90 秒口语版

我先看真实 SQL、筛选比例与 `EXPLAIN ANALYZE`。列表页若按 `created_at DESC,id DESC` 排序，可建 `(tenant_id,created_at DESC,id DESC)`：租户等值后沿索引顺序取一页，并用唯一的 `id` 作为同时间戳的稳定排序键。`LIMIT 100000,20`仍要跳过大量行，通常改键集分页；若必须随机跳页，可先在窄索引上取 ID 再关联取大列，并核对成本。`LIKE 'abc%'`可以利用合适的字符列索引做前缀范围；`LIKE '%abc%'`不具备这种定位能力，考虑全文索引、倒排搜索或业务侧 n-gram。最后比较扫描行数、排序、回表与写入成本，而非只看是否用了索引。

## SQL 示例与执行路径

示例假设 `created_at NOT NULL` 且 `id` 唯一；若排序列允许 NULL，游标条件还必须显式处理 NULL 分支。

```sql
CREATE INDEX idx_tenant_time_id ON orders(tenant_id, created_at DESC, id DESC);
SELECT id, created_at, amount FROM orders
WHERE tenant_id = 7
ORDER BY created_at DESC, id DESC LIMIT 20;
-- 下一页：传入上一页最后一行的时间与 ID
SELECT id, created_at, amount FROM orders
WHERE tenant_id = 7
  AND (created_at < :last_time OR (created_at = :last_time AND id < :last_id))
ORDER BY created_at DESC, id DESC LIMIT 20;
```

键集分页适合顺序翻页，不能直接跳任意页；并发写入时跨页视图可能变化，如需严格快照要另定一致性策略。

## 关键边界与取舍

- `Using filesort` 表示额外排序阶段，不等于必然落盘；索引扫描也未必比筛选后排序更便宜。
- `LIKE` 的索引能力还受字符集、排序规则、数据分布及优化器成本影响；函数包裹列时可考虑改写或函数索引。
- 联合索引越宽，写入与空间成本越高；不要为了一个列表页无限追加展示列。

## 递进追问

### 1. 为什么排序中加入唯一 `id`？

**参考答案：** 当多行的 `created_at` 相同，只按时间排序时这些行的先后顺序没有保证，不同计划或两次分页查询可能返回不同顺序。加入唯一 `id` 后，`(created_at,id)` 能确定完整顺序，游标也可精确表示上一页结束位置。下一页必须同时比较时间和 ID，并保持方向一致。但稳定排序不等于跨请求快照：记录的排序字段被更新或数据被删除时，仍可能发生跨页变化。

### 2. 深分页时“先查 ID 再回表”和键集分页各适合什么场景？

**参考答案：** 先查 ID 再回表适合必须保留页码、随机跳页且每行较宽的页面：先在窄索引中完成排序和偏移，仅对当前页的少量 ID 读取大列，外层仍需显式保证排序。它减少大量无效回表，却仍需遍历并跳过 `offset` 条索引项。键集分页适合连续翻页、滚动列表或批量遍历，从上一页游标附近继续范围扫描，成本较少随页数增长；代价是不能直接跳到任意页。两者都需唯一的稳定排序键，还要约定并发修改下的可见性。

### 3. `WHERE tenant_id=7 AND status=1 ORDER BY created_at DESC` 如何比较两种列序的索引？

**参考答案：** 可比较 `(tenant_id,status,created_at)` 与 `(tenant_id,created_at,status)`。前者先固定租户和状态，随后按时间顺序扫描，通常更适合这个固定查询；后者先固定租户并按时间扫描，再过滤状态，可能为取满一页检查更多索引项，但还能服务不带状态的租户时间列表。测试时应覆盖不同租户、状态比例及时间分布，并比较扫描量、回表、额外排序和 `LIMIT` 提前结束的效果。不能只看状态取值少就把它移到最后；若按页展示，还应补唯一 ID，避免同时间戳顺序不稳定。

## 延伸阅读

- [004-mysql-order-by-sorting.md](/posts/MySQL/004-mysql-order-by-sorting/)
- [010-cursor-pagination.md](/posts/MySQL/010-cursor-pagination/)
- [017-index-design-notes.md](/posts/MySQL/017-index-design-notes/)

## 官方依据

以下均为 MySQL 8.4 官方手册，核对日期：2026-09-27。

- [ORDER BY Optimization](https://dev.mysql.com/doc/refman/8.4/en/order-by-optimization.html)
- [Range Optimization](https://dev.mysql.com/doc/refman/8.4/en/range-optimization.html)
- [LIMIT Query Optimization](https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html)

## 自测

- 不看笔记，用 60 秒回答：分页查询、排序、模糊查询如何进行索引优化？
- 用示例 SQL 解释访问路径、边界与取舍，并回答上面的递进追问。
