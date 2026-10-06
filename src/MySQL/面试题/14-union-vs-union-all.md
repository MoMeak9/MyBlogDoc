# UNION和UNION ALL有什么区别？性能如何？什么时候使用哪种方式？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

UNION会对合并结果去重，UNION ALL保留重复行，后者通常少一次去重成本。

## 面试口语版（约 60 秒）

UNION 默认做 DISTINCT，合并多个查询结果后去重；UNION ALL 保留重复行。去重需要额外工作，因此确定重复行有业务意义或已经互斥时，优先 UNION ALL。最终结果的 ORDER BY 和 LIMIT 应作用于整个集合；分支中的排序若没有分支级限制，不应被当成最终顺序保证。

## 原理拆解与场景

```sql
-- 两种来源可能有相同 user_id，需按业务决定要不要去重
SELECT user_id FROM online_orders
UNION ALL
SELECT user_id FROM offline_orders;

-- 要“独立客户列表”，用 UNION 对 user_id 去重
SELECT user_id FROM online_orders
UNION
SELECT user_id FROM offline_orders
ORDER BY user_id;
```

比较时用 `EXPLAIN ANALYZE` 看真实行数、去重和临时表成本。

## 关键边界与工程取舍

UNION 的去重按**整行**比较，不只按第一列；若有 `source` 字段不同，同一 user_id 仍是不同结果行。分支必须列数一致，类型要可兼容；列名取第一分支。UNION ALL 也可能因外层排序/聚合产生临时结构，不能说它永远零额外开销。

## 面试官递进追问

### 1. UNION 按哪些列去重？

**参考答案：** UNION 按结果中的整行去重，即所有对应输出列共同决定两行是否重复，并不是只看第一列或某个主键。比如 `(42,'online')` 与 `(42,'offline')` 会同时保留，即使 user_id 相同。字符串还会按结果类型和排序规则比较，不能简单等同于原始字节完全一致。若需要独立用户列表，就只投影 user_id 后做 UNION；若要按用户保留最新一条完整记录，应另外定义排序和选行规则，UNION 不能替代它。

### 2. 两个分支数据天然互斥时怎么选？

**参考答案：** 若两分支在最终投影后确实互斥，而且业务允许保留各分支内部的重复，可用 UNION ALL，省掉全局去重工作。但“来源表互斥”不一定意味着投影结果互斥：按日期分开的两张订单表中，同一用户仍可能都出现，只选 user_id 就有重复；分支内部也可能重复。因此要按最终输出和目标粒度证明条件。若要求集合意义上的唯一结果，仍需 UNION 或其他显式去重方式，不能只根据分表规则判断。

### 3. 如何给合并结果排序并检查临时表开销？

**参考答案：** 把全局 ORDER BY、LIMIT 写在整个合并表达式之后，使用输出列名；需要稳定分页时加入能唯一确定顺序的键。例如：

```sql
SELECT user_id FROM online_orders
UNION
SELECT user_id FROM offline_orders
ORDER BY user_id
LIMIT 100;
```

随后看 EXPLAIN ANALYZE 中合并、去重、物化和 Sort 节点的实际行数与耗时，并在独立会话观察 Created_tmp_tables、Created_tmp_disk_tables 的增量。后者不覆盖 TempTable 使用内存映射文件的全部磁盘占用，可补查 Performance Schema 的 `memory/temptable/physical_disk`。UNION ALL 避免去重，但外层排序仍可能消耗临时空间。[内部临时表监控](https://dev.mysql.com/doc/refman/8.4/en/internal-temporary-tables.html)

## 自测

- 合上笔记，用 60 秒复述一句话结论、一个例子和一个边界。
- 完成第 3 个追问，写出你会核对的 SQL、指标或故障证据。

## 参考资料

以 MySQL 8.4 为版本基准；官方资料核对日期：2026-09-27。

- [UNION 子句](https://dev.mysql.com/doc/refman/8.4/en/union.html)
- [集合操作](https://dev.mysql.com/doc/refman/8.4/en/set-operations.html)
