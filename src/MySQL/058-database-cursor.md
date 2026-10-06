# 什么是数据库的游标？

日期：2026-07-11  
难度：中等  
标签：#面试 #MySQL #游标 #存储过程 #VIP

## 一句话答案

游标是在存储程序中逐行遍历查询结果集的机制，通过 DECLARE、OPEN、FETCH、CLOSE 控制，适合必须逐行处理的场景，但通常不如集合 SQL 高效。

## 面试口语版

SQL 天然擅长集合运算，而游标把结果集变成一行一行处理。在 MySQL 存储过程中，先 `DECLARE CURSOR FOR SELECT`，再 OPEN，循环 FETCH 到变量，处理完成后 CLOSE；通常还要声明 `NOT FOUND` handler 结束循环。MySQL 游标是只读、不可滚动且 asensitive，不能像应用列表那样随意前后移动。它适合逐行调用复杂规则或无法集合化的维护任务，但大量数据上会产生 row-by-row 开销，应优先尝试 UPDATE JOIN、INSERT SELECT、窗口函数或批处理。

## 原理拆解

```sql
DECLARE done BOOLEAN DEFAULT FALSE;
DECLARE v_id BIGINT;
DECLARE cur CURSOR FOR SELECT id FROM task WHERE status = 'PENDING';
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

OPEN cur;
read_loop: LOOP
  FETCH cur INTO v_id;
  IF done THEN LEAVE read_loop; END IF;
  -- 逐行处理
END LOOP;
CLOSE cur;
```

## 关键细节

- 这里的数据库游标与 Web API 的 Cursor 分页不是同一个概念。
- 声明顺序是变量/条件、游标、handler；作用域在存储程序块内。
- 长游标事务可能持有快照或锁，增加 undo 压力和并发风险。

## 面试官追问

1. 为什么优先使用集合 SQL？
2. 游标和 Cursor 分页有什么区别？
3. 如何处理 FETCH 到末尾？

## 高分补充

如果确实要逐行处理大数据，通常放到应用侧按主键批量拉取、幂等处理并控制事务边界，比单个超长存储过程更易观测和恢复。

## 学习清单

- 能复述 DECLARE、OPEN、FETCH、CLOSE 生命周期。
