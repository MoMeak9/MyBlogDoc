# 在 MySQL 中，你使用过哪些函数？

日期：2026-07-11  
难度：简单  
标签：#面试 #MySQL #SQL函数 #VIP

## 一句话答案

常用函数可按聚合、字符串、日期时间、数值、条件与 JSON 分类回答，并说明函数放在索引列上可能影响索引使用。

## 面试口语版

我常用的聚合函数有 `COUNT`、`SUM`、`AVG`、`MIN`、`MAX`；字符串函数有 `CONCAT`、`SUBSTRING`、`LENGTH`、`CHAR_LENGTH`、`TRIM`；日期函数有 `NOW`、`DATE_ADD`、`DATE_SUB`、`DATEDIFF`、`DATE_FORMAT`；条件和空值处理有 `CASE WHEN`、`IF`、`IFNULL`、`COALESCE`；数值函数有 `ROUND`、`CEIL`、`FLOOR`；MySQL 8 项目里也会用 `JSON_EXTRACT`、`JSON_UNQUOTE` 等。使用时我会注意 NULL、字符集和时区，并避免在 WHERE 的普通索引列上直接套函数导致不能走常规索引范围。

## 原理拆解

| 类别 | 常用函数 | 易错点 |
| --- | --- | --- |
| 聚合 | COUNT、SUM、AVG、MIN、MAX | NULL 处理、GROUP BY |
| 字符串 | CONCAT、SUBSTRING、TRIM | LENGTH 是字节数，CHAR_LENGTH 是字符数 |
| 时间 | NOW、DATE_ADD、DATEDIFF | 会话时区、索引可用性 |
| 条件 | CASE、IFNULL、COALESCE | 类型隐式转换 |
| 数值 | ROUND、CEIL、FLOOR | 金额精度 |
| JSON | JSON_EXTRACT、JSON_SET | 路径、生成列索引 |

## 关键细节

- `COUNT(*)` 统计行，`COUNT(col)` 忽略 NULL。
- 将 `DATE(created_at)=?` 改为时间范围，通常更容易利用普通索引。
- 函数名背得多不如能说明使用场景和性能影响。

## 面试官追问

1. LENGTH 和 CHAR_LENGTH 区别？
2. COALESCE 与 IFNULL 有何区别？
3. 如何为 JSON 字段中的属性建立索引？

## 高分补充

复杂业务计算不一定应塞进 SQL；要在数据库计算、应用计算和预计算之间权衡可维护性与数据搬运成本。

## 学习清单

- 每类准备 3 个函数和一个实际例子。
