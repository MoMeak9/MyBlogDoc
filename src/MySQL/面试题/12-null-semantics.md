# NULL值在MySQL中是如何处理的？对查询有什么影响？如何正确处理NULL值？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

NULL表示未知或缺失，比较表达式会进入三值逻辑；查询应使用IS NULL而不是等号判断。

## 面试口语版（约 60 秒）

NULL 表示没有值，不等于 0、空字符串或布尔假。普通比较 `= NULL`、`<> NULL` 的结果是 UNKNOWN，WHERE 只保留 TRUE，因此要用 IS NULL 或 IS NOT NULL。聚合、唯一约束、排序和子查询也会受 NULL 影响。设计字段时先确定“未知”“未填写”和“确实为空”是否是不同业务状态，再决定是否允许 NULL。

## 原理拆解与场景

```sql
SELECT id FROM users WHERE deleted_at IS NULL;
SELECT COUNT(*) AS all_users, COUNT(phone) AS with_phone FROM users;
SELECT 1 <=> NULL AS null_safe_comparison; -- 返回 0
SELECT NULL <=> NULL AS two_nulls;          -- 返回 1
```

`NOT IN (SELECT nullable_id ...)` 若子查询含 NULL 会产生 UNKNOWN；找不存在的关联行通常可用 `NOT EXISTS` 表达。

## 关键边界与工程取舍

不要将 `COALESCE(col, '') = ''` 无条件代替 `IS NULL`：它把空字符串与 NULL 合并，也可能妨碍索引使用。MySQL 升序排序时 NULL 排在非 NULL 前。CHECK 表达式的 UNKNOWN 会通过约束，需配合 NOT NULL。

## 面试官递进追问

### 1. 为什么 col = NULL 查不到 NULL 行？

**参考答案：** NULL 代表未知或缺失，普通等号无法判定一个未知值是否等于另一个值，所以 `col = NULL` 即使碰到 NULL 行也得到 UNKNOWN。WHERE 只保留 TRUE，因此查不到这些行；`NOT(col = NULL)` 也不能修复，因为否定 UNKNOWN 仍是 UNKNOWN。应写 `col IS NULL`；要把两个都为 NULL 的值视为相等，可使用 MySQL 的 NULL 安全等号 `<=>`，例如 `NULL <=> NULL` 为 1。

### 2. COUNT(*) 与 COUNT(phone) 为什么不同？

**参考答案：** COUNT(*) 计算筛选后的所有行，COUNT(phone) 只计算 phone 非 NULL 的行。例如手机号为 `'138...'、NULL、''` 的三名用户，结果是 3 和 2；空字符串仍是已存在的值，所以不能把 COUNT(phone) 直接当作“有效手机号人数”。若业务口径要求非空且格式合规，需要另加条件。LEFT JOIN 后 COUNT(*) 还会统计补出的空行，统计右侧关联记录时应使用右表非空键。无 GROUP BY 的空输入，两种 COUNT 都返回 0。

### 3. NOT IN 的 NULL 陷阱如何改写并验证？

**参考答案：** 若业务要找“没有关联订单的用户”，可写 `NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id=u.id)`，这样右表的 NULL 不会污染不匹配判断。若保留 NOT IN，可在子查询过滤 `user_id IS NOT NULL`，但还必须决定外层键为 NULL 时该保留还是排除；NOT EXISTS 用普通等号会把这种外层行视为无匹配，不能声称两者无条件等价。验证要覆盖正常匹配、不匹配、右侧含 NULL、右侧为空及外侧 NULL。例如下面两项分别应为 NULL 和 1：

```sql
SELECT 2 NOT IN (1, NULL) AS unknown_result,
       NULL NOT IN (SELECT 1 WHERE FALSE) AS empty_set_result;
```

若业务认为两侧 NULL 也算匹配，应明确改用 `<=>` 的相关条件。[EXISTS 与 NULL 处理](https://dev.mysql.com/doc/refman/8.4/en/subquery-optimization-with-exists.html)

## 自测

- 合上笔记，用 60 秒复述一句话结论、一个例子和一个边界。
- 完成第 3 个追问，写出你会核对的 SQL、指标或故障证据。

## 参考资料

以 MySQL 8.4 为版本基准；官方资料核对日期：2026-09-27。

- [NULL 值](https://dev.mysql.com/doc/refman/8.4/en/null-values.html)
- [NULL 问题与比较](https://dev.mysql.com/doc/refman/8.4/en/problems-with-null.html)
