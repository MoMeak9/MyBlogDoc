# MySQL 面试八股

日期：2026-07-05
标签：#面试 #八股 #MySQL

这里用于沉淀 MySQL 面试题答案。后续你每提一个 MySQL 面试题，我会逐个生成对应 Markdown 文件，并按下面结构组织：

牛面题库整理：[MySQL 面试题库（45 题，一题一篇）](/posts/MySQL/%E9%9D%A2%E8%AF%95%E9%A2%98/README/)。

## 输出结构

1. 一句话答案
2. 面试口语版
3. 原理拆解
4. Mermaid 图解
5. 关键细节
6. 面试官追问
7. 常见错误说法
8. 学习清单

## 命名规则

- 单题文件：`序号-英文主题-slug.md`
- 示例：`001-mysql-index-principle.md`
- 汇总索引会维护在本文件中。

## 题目索引

- [001. 什么是分库分表？何时需要进行分库分表？](/posts/MySQL/001-database-sharding/)
- [002. 内连接与外连接有什么区别？ON 和 WHERE 条件在连接查询中有什么不同？](/posts/MySQL/002-sql-join-on-where/)
- [003. 数据库三大范式是什么？实际项目中如何平衡范式化和反范式化？](/posts/MySQL/003-normalization-denormalization/)
- [004. MySQL 中的数据排序是怎么实现的？](/posts/MySQL/004-mysql-order-by-sorting/)
- [005. 详细描述一条 SQL 语句在 MySQL 中的执行过程。](/posts/MySQL/005-sql-execution-process/)
- [006. MySQL 的索引类型有哪些？](/posts/MySQL/006-mysql-index-types/)
- [007. MySQL 的 Change Buffer 是什么？它有什么作用？](/posts/MySQL/007-change-buffer/)
- [008. 什么是批量数据入库？相比单条插入有什么优势？](/posts/MySQL/008-batch-insert/)
- [009. 什么是数据全量同步和增量同步？它们各有什么优缺点？](/posts/MySQL/009-full-and-incremental-sync/)
- [010. 什么是游标 Cursor 分页？相比传统 LIMIT OFFSET 分页有什么优势？](/posts/MySQL/010-cursor-pagination/)
- [011. MySQL 的存储引擎有哪些？它们之间有什么区别？](/posts/MySQL/011-storage-engines/)
- [012. MySQL InnoDB 引擎中的聚簇索引和非聚簇索引有什么区别？](/posts/MySQL/012-clustered-and-secondary-index/)
- [013. MySQL 中的回表是什么？](/posts/MySQL/013-index-back-to-table/)
- [014. MySQL 索引的最左前缀匹配原则是什么？](/posts/MySQL/014-leftmost-prefix-rule/)
- [015. MySQL 的覆盖索引是什么？](/posts/MySQL/015-covering-index/)
- [016. MySQL 的索引下推是什么？](/posts/MySQL/016-index-condition-pushdown/)
- [017. 在 MySQL 中建索引时需要注意哪些事项？](/posts/MySQL/017-index-design-notes/)
- [018. MySQL 中使用索引一定有效吗？如何排查索引效果？](/posts/MySQL/018-index-effect-troubleshooting/)
- [019. MySQL 中的索引数量是否越多越好？为什么？](/posts/MySQL/019-too-many-indexes/)
- [020. 请详细描述 MySQL 的 B+ 树中查询数据的全过程](/posts/MySQL/020-bplus-tree-query-process/)
- [021. 为什么 MySQL 选择使用 B+ 树作为索引结构？](/posts/MySQL/021-why-bplus-tree-index/)
- [022. MySQL 中的日志类型有哪些？binlog、redo log 和 undo log 的作用和区别是什么？](/posts/MySQL/022-mysql-logs-binlog-redo-undo/)
- [023. MySQL 是如何实现事务的？](/posts/MySQL/023-mysql-transaction-implementation/)
- [024. MySQL 中长事务可能会导致哪些问题？](/posts/MySQL/024-long-running-transactions/)
- [025. MySQL 中的 MVCC 是什么？](/posts/MySQL/025-mvcc/)
- [026. MySQL 二级索引有 MVCC 快照吗？](/posts/MySQL/026-secondary-index-mvcc/)
- [027. 如果 MySQL 中没有 MVCC，会有什么影响？](/posts/MySQL/027-without-mvcc/)
- [028. MySQL 中的事务隔离级别有哪些？](/posts/MySQL/028-transaction-isolation-levels/)
- [029. MySQL 默认的事务隔离级别是什么？为什么选择这个级别？](/posts/MySQL/029-default-isolation-level/)
- [030. 数据库的脏读、不可重复读和幻读分别是什么？](/posts/MySQL/030-dirty-nonrepeatable-phantom-read/)
- [031. MySQL 中有哪些锁类型？](/posts/MySQL/031-lock-types/)
- [032. MySQL 的乐观锁和悲观锁是什么？](/posts/MySQL/032-optimistic-pessimistic-lock/)
- [033. MySQL 中如果发生死锁应该如何解决？](/posts/MySQL/033-deadlock-handling/)
- [034. 如何使用 MySQL 的 EXPLAIN 语句进行查询分析？](/posts/MySQL/034-explain-query-analysis/)
- [035. MySQL 中 count(*)、count(1) 和 count(字段名) 有什么区别？](/posts/MySQL/035-count-differences/)
- [036. MySQL 中 int(11) 的 11 表示什么？](/posts/MySQL/036-int-display-width/)
- [037. MySQL 中 varchar 和 char 有什么区别？](/posts/MySQL/037-varchar-vs-char/)
- [038. MySQL 中如何进行 SQL 调优？](/posts/MySQL/038-sql-tuning/)
- [039. 如何在 MySQL 中避免单点故障？](/posts/MySQL/039-avoid-single-point-failure/)
- [040. 如何在 MySQL 中实现读写分离？](/posts/MySQL/040-read-write-splitting/)
- [041. 什么是 MySQL 的主从同步机制？它是如何实现的？](/posts/MySQL/041-replication/)
- [042. 如何处理 MySQL 的主从同步延迟？](/posts/MySQL/042-replication-lag/)
- [001. 什么是分库分表？分库分表有哪些类型（或策略）？](/posts/MySQL/001-database-sharding/)（已覆盖）
- [043. 如果组长要求你主导项目中的分库分表，大致的实施流程是？](/posts/MySQL/043-sharding-implementation-process/)
- [044. 对数据库进行分库分表可能会引发哪些问题？](/posts/MySQL/044-sharding-problems/)
- [045. 从 MySQL 获取数据，是从磁盘读取的吗？（Buffer Pool）](/posts/MySQL/045-buffer-pool-read-path/)
- [046. MySQL 的 Doublewrite Buffer 是什么？它有什么作用？](/posts/MySQL/046-doublewrite-buffer/)
- [047. MySQL 中的 Log Buffer 是什么？它有什么作用？](/posts/MySQL/047-log-buffer/)
- [048. 为什么在 MySQL 中不推荐使用多表 JOIN？](/posts/MySQL/048-avoid-multi-table-joins/)
- [010. MySQL 中如何解决深度分页的问题？](/posts/MySQL/010-cursor-pagination/)（已覆盖）
- [049. 如何在 MySQL 中监控和优化慢 SQL？](/posts/MySQL/049-slow-sql-monitoring-optimization/)
- [050. MySQL 中 DELETE、DROP 和 TRUNCATE 的区别是什么？](/posts/MySQL/050-delete-drop-truncate/)
- [002. MySQL 中 INNER JOIN、LEFT JOIN 和 RIGHT JOIN 的区别是什么？](/posts/MySQL/002-sql-join-on-where/)（已覆盖）
- [051. MySQL 中 `LIMIT 100000000, 10` 和 `LIMIT 10` 的执行速度是否相同？](/posts/MySQL/051-limit-offset-performance/)
- [052. MySQL 中 DATETIME 和 TIMESTAMP 类型的区别是什么？](/posts/MySQL/052-datetime-vs-timestamp/)
- [003. 数据库的三大范式是什么？](/posts/MySQL/003-normalization-denormalization/)（已覆盖）
- [053. 在 MySQL 中，你使用过哪些函数？](/posts/MySQL/053-common-mysql-functions/)
- [054. MySQL 中 TEXT 类型最大可以存储多长的文本？](/posts/MySQL/054-text-type-limits/)
- [055. MySQL 中 AUTO_INCREMENT 列达到最大值时会发生什么？](/posts/MySQL/055-auto-increment-maximum/)
- [056. 在 MySQL 中存储金额数据，应该使用什么数据类型？](/posts/MySQL/056-money-data-type/)
- [057. 什么是数据库的视图？](/posts/MySQL/057-database-view/)
- [058. 什么是数据库的游标？](/posts/MySQL/058-database-cursor/)
- [059. 为什么不推荐在 MySQL 中直接存储图片、音频、视频等大容量内容？](/posts/MySQL/059-large-binary-content-storage/)
- [060. 相比于 Oracle，MySQL 的优势有哪些？](/posts/MySQL/060-mysql-vs-oracle-advantages/)
- [061. MySQL 中 VARCHAR(100) 和 VARCHAR(10) 的区别是什么？](/posts/MySQL/061-varchar-length-difference/)
- [062. 在什么情况下，不推荐为数据库建立索引？](/posts/MySQL/062-when-not-to-create-index/)
- [063. MySQL 中 EXISTS 和 IN 的区别是什么？](/posts/MySQL/063-exists-vs-in/)
- [064. 什么是 Write-Ahead Logging（WAL）技术？它的优点是什么？MySQL 中是否用到了 WAL？](/posts/MySQL/064-write-ahead-logging/)
- [065. 你们生产环境的 MySQL 中使用了什么事务隔离级别？为什么？](/posts/MySQL/065-production-isolation-level-choice/)
- [066. 为什么阿里巴巴的 Java 手册不推荐使用存储过程？](/posts/MySQL/066-avoid-stored-procedures/)
- [067. 如何实现数据库的不停服迁移？](/posts/MySQL/067-zero-downtime-database-migration/)
- [068. MySQL 数据库的性能优化方法有哪些？](/posts/MySQL/068-mysql-performance-optimization/)
- [011. MySQL 中 InnoDB 存储引擎与 MyISAM 存储引擎的区别是什么？](/posts/MySQL/011-storage-engines/)（已覆盖）
- [069. MySQL 的查询优化器如何选择执行计划？](/posts/MySQL/069-query-optimizer-plan-selection/)
- [070. 什么是数据库的逻辑删除？数据库的物理删除和逻辑删除有什么区别？](/posts/MySQL/070-logical-vs-physical-delete/)
- [071. 什么是数据库的逻辑外键？数据库的物理外键和逻辑外键各有什么优缺点？](/posts/MySQL/071-logical-vs-physical-foreign-key/)
- [072. MySQL 事务的二阶段提交是什么？](/posts/MySQL/072-innodb-binlog-two-phase-commit/)
- [073. MySQL 三层 B+ 树能存多少数据？](/posts/MySQL/073-three-level-bplus-tree-capacity/)
- [074. MySQL 在设计表（建表）时需要注意什么？](/posts/MySQL/074-table-design-checklist/)
- [075. MySQL 插入一条 SQL 语句，redo log 记录的是什么？](/posts/MySQL/075-redo-log-insert-records/)
- [076. SQL 中 SELECT、FROM、JOIN、WHERE、GROUP BY、HAVING、ORDER BY、LIMIT 的执行顺序是什么？](/posts/MySQL/076-sql-logical-execution-order/)
- [021. 为什么 MySQL 索引用的是 B+ 树而不是红黑树？](/posts/MySQL/021-why-bplus-tree-index/)（已覆盖）
- [077. MySQL 一张表最多可以有多少列？](/posts/MySQL/077-maximum-table-columns/)
- [078. 什么是 CDC（Change Data Capture）？常见的 CDC 工具有哪些？](/posts/MySQL/078-change-data-capture/)
- [079. 多线程并发同步数据时（数据库的数据同步到数仓中）需要注意什么问题？](/posts/MySQL/079-multithreaded-data-warehouse-sync/)
