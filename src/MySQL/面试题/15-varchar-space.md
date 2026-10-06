# VARCHAR存储空间如何计算？内存和磁盘存储有什么差异？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

VARCHAR的磁盘占用取决于实际内容字节数、长度信息和行格式；声明上限与实际存储量不能画等号。

## 面试口语版（约 60 秒）

VARCHAR(N) 的 N 是最大字符数，磁盘上的值主要占“实际编码字节 + 1 或 2 字节长度前缀”，还要考虑行记录、NULL 位图和 InnoDB 行格式。以 utf8mb4 为例，英文 A 通常 1 字节，汉字通常 3 字节，表情常是 4 字节。内存中的排序、临时表和客户端缓冲区采用各自结构，不能把磁盘公式直接当运行时内存占用。

## 原理拆解与场景

例子：`VARCHAR(100)` 使用 utf8mb4，最大内容可能 400 字节，长度前缀需 2 字节；实际存 `'ABC'` 的内容是 3 字节，因此该列值的基础存储约为 5 字节，还未计入记录其他开销。

```sql
SELECT CHAR_LENGTH('你好A') AS chars, LENGTH('你好A') AS bytes;
-- utf8mb4 下通常为 3 个字符、7 个字节
```

可用 `EXPLAIN ANALYZE` 与内存/临时表指标评估长字符串排序，而非凭列声明长度推算。

## 关键边界与工程取舍

1/2 字节前缀由列定义的**最大可能字节数**决定，`VARCHAR(100)` utf8mb4 即使当前只存 ASCII，也通常是 2 字节前缀。行大小上限、页外存储和索引前缀限制还会影响设计。不同字符集、行格式与计算场景的空间不能用单一固定公式概括。

## 面试官递进追问

### 1. VARCHAR(100) 的 N 是字符还是字节？

**参考答案：** N 是最大字符数，VARCHAR(100) 最多保存 100 个字符；在 utf8mb4 下最大内容可到 400 字节，但不会为每条记录预留满 400 字节。按数据类型层面的估算，还需长度信息；具体 InnoDB 页内表示则取决于行格式和记录布局，不能把一个简化公式当作整行磁盘大小。可用 `CHAR_LENGTH(col)` 与 `LENGTH(col)` 分别核对字符数和实际编码字节，建表还要考虑整行及索引长度限制。

### 2. 为什么同列 ASCII 与中文占用不同？

**参考答案：** 因为 utf8mb4 是变长编码，同一列中的 ASCII 字符通常每个占 1 字节，常见汉字占 3 字节，部分补充平面汉字和表情占 4 字节。例如 `'ABC'` 与 `'你好A'` 都是 3 个字符，但内容分别为 3 和 7 字节。这里算的是内容编码，不包含 NULL 位图、长度元数据、记录头、页与索引开销。声明长度决定允许的字符上限，实际值和行格式共同决定物理占用，不能假定所有中文都固定 3 字节。

### 3. 排序内存能否直接用磁盘字节数估算？

**参考答案：** 不能直接等同。排序会保存排序键、行定位信息或附加输出列，并受排序规则、算法、参与行数和 sort_buffer_size 影响；中间结果若进入临时表，还有其自身布局。MySQL 8.4 的 TempTable 可变长存储字符串，并有单元格、长度和指针等元数据；MEMORY 临时表则采用定长行，可能把 VARCHAR 填充到声明上限。因此既不能用磁盘内容字节直接估算，也不能一概认为内存总按最大宽度分配。应减少不必要的宽列，结合实际计划、排序合并次数、临时表指标和 Performance Schema 内存统计测量峰值，再按并发量评估容量。[内部临时表格式](https://dev.mysql.com/doc/refman/8.4/en/internal-temporary-tables.html)、[ORDER BY 优化](https://dev.mysql.com/doc/refman/8.4/en/order-by-optimization.html)

## 自测

- 合上笔记，用 60 秒复述一句话结论、一个例子和一个边界。
- 完成第 3 个追问，写出你会核对的 SQL、指标或故障证据。

## 延伸阅读

- [037-varchar-vs-char.md](/posts/MySQL/037-varchar-vs-char/)
- [061-varchar-length-difference.md](/posts/MySQL/061-varchar-length-difference/)

## 参考资料

以 MySQL 8.4 为版本基准；官方资料核对日期：2026-09-27。

- [CHAR 与 VARCHAR 存储](https://dev.mysql.com/doc/refman/8.4/en/char.html)
- [行大小限制](https://dev.mysql.com/doc/refman/8.4/en/column-count-limit.html)
