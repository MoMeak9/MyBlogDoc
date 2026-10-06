# CHAR和VARCHAR有什么区别？如何选择字符串类型？存储空间如何计算？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions/q_1756285708193027028?activeIndex=0&from=50e19cbb-21c2-4330-b45f-5748ae5d8672)  
答案说明：根据可访问的题目详情改写

## 一句话答案

CHAR是固定声明长度的字符类型，VARCHAR按实际内容占用可变长度并带长度信息；选择时以数据分布和字符集为准。

## 面试口语版（约 60 秒）

CHAR(N) 是定长字符列，短值存储时填充空格，读取时通常去掉末尾填充空格；VARCHAR(N) 按实际数据字节加 1 或 2 字节长度前缀存储，并保留末尾空格。N 是字符数，磁盘字节数要结合字符集、行格式和 NULL 开销算。长度稳定且短的码可以评估 CHAR，变化明显的名称通常用 VARCHAR。

## 原理拆解与场景

在单字节字符集下，`CHAR(4)` 存 `'ab'` 占 4 字节，`VARCHAR(4)` 占 2 个内容字节 + 1 个长度字节；utf8mb4 下每个字符可占 1–4 字节，不能把 `VARCHAR(255)` 理解成固定 255 字节。

```sql
CREATE TABLE person (
  country_code CHAR(2) NOT NULL,
  display_name VARCHAR(120) NOT NULL
) CHARACTER SET utf8mb4;
SELECT CHAR_LENGTH(display_name), LENGTH(display_name) FROM person;
```

## 关键边界与工程取舍

VARCHAR 的 1/2 字节前缀由列最大可能字节长度决定，不是按某一行实际长度临时切换。CHAR 在 InnoDB 对很宽的多字节列也可能采用可变表示；别说“CHAR 必定 N 字节”。比较尾部空格还受排序规则 PAD 属性影响。性能要按实际行宽、索引和工作负载测。

## 面试官递进追问

### 1. VARCHAR(255) 的 255 指什么？

**参考答案：** 255 是最多可存储的字符数，不是固定磁盘字节数。使用 utf8mb4 时，一个字符可能占 1～4 字节，所以该列最大内容长度可到 1020 字节，实际短字符串只占其编码所需内容空间。还应区分字符数与用户看到的字形：组合字符或某些表情可能由多个 Unicode 字符组成。用 `CHAR_LENGTH(col)` 查看字符数，用 `LENGTH(col)` 查看当前值的字节数；后者也不包括整条 InnoDB 记录的额外开销。

### 2. 为什么 CHAR(4) 在 utf8mb4 下不是恒定 4 字节？

**参考答案：** 因为 4 是字符数，而 utf8mb4 是变长编码，四个 ASCII 字符的内容通常为 4 字节，四个常见汉字为 12 字节，四个四字节字符为 16 字节。物理存储还受行格式影响：REDUNDANT 按字符集最大宽度保留空间；COMPACT/DYNAMIC 这类格式可对多字节 CHAR 使用变长表示，CHAR(4) 的列内容占用可在 4～16 字节之间。它仍保有 CHAR 的补空格和读取语义，不能因此等同于 VARCHAR，也不能只用读取后的 LENGTH 推断实际记录大小。[InnoDB 数据大小优化](https://dev.mysql.com/doc/refman/8.4/en/data-size.html)

### 3. 尾部空格的存储与比较各受什么影响？

**参考答案：** 要分开看存储、读取和比较。CHAR 按声明字符长度补空格，MySQL 8.4 默认读取时移除末尾空格；启用已弃用的 `PAD_CHAR_TO_FULL_LENGTH` 模式可保留填充。VARCHAR 在声明长度范围内保留输入的末尾空格。非二进制字符串做等值比较时，排序规则为 PAD SPACE 会忽略尾空格，NO PAD 则把它视为有效字符；可查 `INFORMATION_SCHEMA.COLLATIONS.PAD_ATTRIBUTE`。因此 VARCHAR 保留了空格，也可能在唯一索引比较时与无尾空格的值冲突。LIKE 的尾空格规则又不同，不能直接套用等值比较结论；要求字节精确语义时需评估 VARBINARY。[字符串比较](https://dev.mysql.com/doc/refman/8.4/en/string-comparison-functions.html)、[CHAR 读取模式](https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/sql-mode.html#sqlmode_pad_char_to_full_length)

## 自测

- 合上笔记，用 60 秒复述一句话结论、一个例子和一个边界。
- 完成第 3 个追问，写出你会核对的 SQL、指标或故障证据。

## 延伸阅读

- [037-varchar-vs-char.md](/posts/MySQL/037-varchar-vs-char/)
- [061-varchar-length-difference.md](/posts/MySQL/061-varchar-length-difference/)

## 参考资料

以 MySQL 8.4 为版本基准；官方资料核对日期：2026-09-27。

- [CHAR 与 VARCHAR](https://dev.mysql.com/doc/refman/8.4/en/char.html)
- [字符集与排序规则](https://dev.mysql.com/doc/refman/8.4/en/charset.html)
