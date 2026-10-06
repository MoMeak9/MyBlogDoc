# MySQL有哪些索引类型？如何正确设计索引？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

先按业务约束选主键、唯一或普通索引，再按查询形态选单列、联合、前缀、全文或空间索引；对 InnoDB 的常规查找主要依赖 B-tree。

## 30–90 秒口语版

“索引类型”有两个维度：约束上有主键、唯一、普通；组织和用途上有单列、联合、前缀、函数键、全文和空间索引。InnoDB 主键对应聚簇索引，二级索引项含主键值。设计时我会先拿高频 SQL，找等值过滤、范围、排序和返回列，再根据列分布定联合索引列序，尽量一条索引服务一类访问路径。长字符串可评估前缀索引，但前缀不能直接覆盖完整列；文本检索考虑 FULLTEXT 或专业搜索服务。建完用 `EXPLAIN ANALYZE` 和真实数据验证，避免为每个列单独建索引。

## SQL 示例

```sql
CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  tenant_id BIGINT NOT NULL,
  external_no VARCHAR(64) NOT NULL,
  created_at DATETIME NOT NULL,
  UNIQUE KEY uk_tenant_external (tenant_id, external_no),
  KEY idx_tenant_time (tenant_id, created_at DESC)
) ENGINE=InnoDB;
-- 前者保证租户内外部单号不重复；后者服务按租户时间排序列表。
```

## 关键边界与取舍

- `UNIQUE` 首先是业务约束；单独的普通索引不能替代去重保证。NULL 在唯一约束中的行为需要单独核对。
- MySQL 8.4 的 `FULLTEXT`、`SPATIAL` 受列类型和存储引擎限制；空间索引不是普通字符串搜索的替代品。
- 小表、高命中率或高写入场景，新增索引未必划算；索引列越长，空间和二级索引成本越高。

## 递进追问

### 1. 主键索引与普通二级索引在 InnoDB 中分别保存什么？

**参考答案：** 有显式主键时，InnoDB 用它组织聚簇索引，叶子记录包含行数据及必要的事务元信息；较大字段可能存到页外。普通二级索引记录主要保存该索引的列值和主键值，不是行的物理地址。查询二级索引后，若需要其他列，就用主键再查聚簇索引；若查询已被覆盖则通常可省去这步。无显式主键时还可能由合适的唯一非空索引或隐藏键承担聚簇组织。

### 2. `(tenant_id,created_at)` 能否替代 `tenant_id` 单列索引？还要核对什么？

**参考答案：** 对按 `tenant_id` 等值、范围查找的普通查询，联合索引的最左前缀通常能承担单列索引的访问能力，但不代表可以立即删除后者。应核对单列索引是否有唯一约束、外键依赖或被 SQL 提示引用，以及联合索引的前缀长度、列顺序和可见性。联合索引更宽，全索引扫描与缓存成本可能更高；若还按主键排序，单列二级索引附带主键形成的顺序，也可能被中间的 `created_at` 改变。最后通过执行计划和不可见验证决定。

### 3. 长文本搜索为什么不能简单依赖普通 B-tree 索引？

**参考答案：** 普通 B-tree 按字符串整体的字典顺序排列，适合等值和可定位的前缀范围；任意位置的词语或 `LIKE '%关键词%'` 无法据此直接定位。长文本前缀索引只保存开头部分，也解决不了后部词语、相关性排名等需求。可用 `FULLTEXT` 与 `MATCH ... AGAINST`，中文等场景评估 ngram 分词，或使用专门搜索服务。但全文检索受分词、停用词和词长配置影响，语义不等同于任意子串匹配；应按召回需求验证。[全文检索](https://dev.mysql.com/doc/refman/8.4/en/fulltext-search.html)。

## 延伸阅读

- [006-mysql-index-types.md](/posts/MySQL/006-mysql-index-types/)
- [017-index-design-notes.md](/posts/MySQL/017-index-design-notes/)

## 官方依据

以下均为 MySQL 8.4 官方手册，核对日期：2026-09-27。

- [CREATE INDEX Statement](https://dev.mysql.com/doc/refman/8.4/en/create-index.html)
- [Clustered and Secondary Indexes](https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html)
- [Column Indexes](https://dev.mysql.com/doc/refman/8.4/en/column-indexes.html)

## 自测

- 不看笔记，用 60 秒回答：MySQL有哪些索引类型？如何正确设计索引？
- 用示例 SQL 或故障时间线解释边界与取舍，并回答上面的递进追问。
