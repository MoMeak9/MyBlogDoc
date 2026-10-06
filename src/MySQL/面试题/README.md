# MySQL 面试题库

日期：2026-09-27  
标签：#面试 #MySQL #数据库

> 题目和难度采集自[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)。45 题均已扩写为可复习的参考答案；前 5 道可访问题在原改写基础上补充，40 道 VIP 题为独立整理，未读取站内会员答案。

## 阅读路线

- **基础与 SQL（01–16）**：表结构、类型、连接、聚合与查询语义。先能说清结果为何正确，再讨论性能。
- **索引与日志（17–29）**：用 SQL 和执行计划解释访问路径，再串起 binlog、redo、undo 与崩溃恢复。
- **事务与锁（30–36）**：区分普通一致性读、锁定读和写入路径，结合两个会话推演隔离与等待。
- **架构与运维（37–45）**：读写分离、分片、慢 SQL、监控、复制和故障切换，按“定位证据 → 方案 → 失败边界”练口述。

每篇保留原题来源与已有的延伸阅读，并加入约一分钟口语答案、原理或 SQL 示例、边界取舍、递进追问、自测和核对日期明确的官方资料。图解与伪代码用于解释实际流程。

## 题目目录

01. [什么是分库分表？何时需要进行分库分表？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/01-sharding-when/) · 中等 · 可访问·改写
02. [内连接与外连接有什么区别？ON和WHERE条件在连接查询中有什么不同？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/02-join-on-where/) · 中等 · 可访问·改写
03. [数据库三大范式是什么？实际项目中如何平衡范式化和反范式化？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/03-normalization/) · 中等 · 可访问·改写
04. [CHAR和VARCHAR有什么区别？如何选择字符串类型？存储空间如何计算？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/04-char-varchar/) · 中等 · 可访问·改写
05. [COUNT函数有哪些使用方式？性能有什么区别？如何优化COUNT查询？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/05-count-usage/) · 中等 · 可访问·改写
06. [DELETE、DROP、TRUNCATE有什么区别？如何选择合适的数据删除方式？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/06-delete-drop-truncate/) · 中等 · VIP·独立整理
07. [EXISTS和IN子查询有什么区别？性能如何？如何选择合适的子查询方式？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/07-exists-vs-in/) · 中等 · VIP·独立整理
08. [MySQL查询执行流程是怎样的？查询优化器是如何工作的？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/08-query-execution-optimizer/) · 中等 · VIP·独立整理
09. [MySQL缓存机制是怎样的？与Redis缓存有什么区别？如何设计缓存架构？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/09-mysql-cache-vs-redis/) · 中等 · VIP·独立整理
10. [MySQL有哪些常见存储引擎？InnoDB为什么成为默认引擎？如何选择合适的存储引擎？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/10-storage-engines/) · 中等 · VIP·独立整理
11. [MySQL有哪些约束类型？各自的业务作用是什么？如何选择合适的约束策略？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/11-mysql-constraints/) · 中等 · VIP·独立整理
12. [NULL值在MySQL中是如何处理的？对查询有什么影响？如何正确处理NULL值？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/12-null-semantics/) · 中等 · VIP·独立整理
13. [SQL与NoSQL有什么区别？MySQL和MongoDB如何选型？实际项目中如何选择？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/13-sql-vs-nosql/) · 简单 · VIP·独立整理
14. [UNION和UNION ALL有什么区别？性能如何？什么时候使用哪种方式？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/14-union-vs-union-all/) · 中等 · VIP·独立整理
15. [VARCHAR存储空间如何计算？内存和磁盘存储有什么差异？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/15-varchar-space/) · 中等 · VIP·独立整理
16. [WHERE和HAVING有什么区别？什么时候使用HAVING？如何优化分组查询？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/16-where-vs-having/) · 简单 · VIP·独立整理
17. [分页查询、排序、模糊查询如何进行索引优化？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/17-pagination-sort-like-index/) · 中等 · VIP·独立整理
18. [什么情况下索引会失效？如何通过EXPLAIN分析索引性能？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/18-index-not-used-explain/) · 中等 · VIP·独立整理
19. [什么是覆盖索引？索引下推如何优化查询？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/19-covering-index-icp/) · 中等 · VIP·独立整理
20. [什么是索引？为什么B+树是MySQL的主流选择？索引如何提升查询性能？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/20-bplus-index/) · 中等 · VIP·独立整理
21. [什么是最左前缀原则？复合索引如何优化查询性能？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/21-leftmost-prefix/) · 中等 · VIP·独立整理
22. [索引的维护成本有哪些？如何监控索引效果？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/22-index-maintenance-cost/) · 中等 · VIP·独立整理
23. [MySQL有哪些索引类型？如何正确设计索引？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/23-mysql-index-types/) · 中等 · VIP·独立整理
24. [日志文件过大如何处理？日志清理和归档策略是什么？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/24-mysql-log-retention/) · 困难 · VIP·独立整理
25. [什么是binlog？binlog的作用和工作原理是什么？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/25-binlog/) · 中等 · VIP·独立整理
26. [什么是redo log？redo log如何保证事务的持久性？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/26-redo-log/) · 中等 · VIP·独立整理
27. [什么是undo log？undo log如何实现事务回滚和MVCC？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/27-undo-log/) · 中等 · VIP·独立整理
28. [binlog与redo log有什么区别？两阶段提交如何保证一致性？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/28-binlog-redo-two-phase/) · 中等 · VIP·独立整理
29. [MySQL日志刷盘策略有哪些？如何平衡性能与安全性？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/29-mysql-log-flush/) · 中等 · VIP·独立整理
30. [乐观锁和悲观锁有什么区别？在什么场景下使用？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/30-optimistic-pessimistic-lock/) · 中等 · VIP·独立整理
31. [什么是事务？事务的ACID特性如何理解？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/31-transaction-acid/) · 中等 · VIP·独立整理
32. [什么是死锁？如何检测和预防死锁？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/32-deadlock/) · 中等 · VIP·独立整理
33. [什么是MVCC？MVCC如何实现事务的隔离性？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/33-mvcc/) · 中等 · VIP·独立整理
34. [Gap锁和Next-Key锁的作用是什么？如何解决幻读问题？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/34-gap-next-key-locks/) · 中等 · VIP·独立整理
35. [MySQL有哪些事务隔离级别？各自解决什么问题？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/35-isolation-levels/) · 中等 · VIP·独立整理
36. [MySQL有哪些锁类型？行锁、表锁、意向锁的作用是什么？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/36-mysql-lock-types/) · 简单 · VIP·独立整理
37. [读写分离如何实现？有什么注意事项？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/37-read-write-splitting/) · 中等 · VIP·独立整理
38. [分库分表后会产生哪些问题？如何解决跨库查询和分布式事务？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/38-sharding-aftereffects/) · 困难 · VIP·独立整理
39. [如何分析和优化慢SQL？慢查询的常见原因有哪些？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/39-slow-sql/) · 困难 · VIP·独立整理
40. [如何进行MySQL性能监控？关键性能指标有哪些？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/40-mysql-monitoring/) · 困难 · VIP·独立整理
41. [深分页查询如何优化？LIMIT大偏移量的性能问题如何解决？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/41-deep-pagination/) · 困难 · VIP·独立整理
42. [什么是MySQL主从复制？主从复制的完整过程是怎样的？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/42-replication-process/) · 中等 · VIP·独立整理
43. [MySQL配置参数如何调优？关键参数对性能的影响是什么？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/43-mysql-config-tuning/) · 困难 · VIP·独立整理
44. [MySQL主从复制有哪些延迟问题？如何解决数据延迟？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/44-replication-lag/) · 中等 · VIP·独立整理
45. [MySQL主库故障如何处理？故障切换的方案有哪些？](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/45-primary-failover/) · 中等 · VIP·独立整理
