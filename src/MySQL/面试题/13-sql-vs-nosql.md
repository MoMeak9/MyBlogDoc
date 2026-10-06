# SQL与NoSQL有什么区别？MySQL和MongoDB如何选型？实际项目中如何选择？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：简单  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

MySQL与MongoDB的主要差异在数据模型、事务边界、查询方式和模式演化；按业务访问模式和一致性需求选型。

## 面试口语版（约 60 秒）

SQL 与 NoSQL 是很宽的分类，不能据此断言有无事务或能否扩展。MySQL 以关系表、SQL JOIN 和约束建模，适合订单、支付等跨实体一致性强、报表关系清晰的场景。MongoDB 以文档为主要聚合单位，适合一起读取和更新的嵌套资料、结构演进频繁的内容；它也支持多文档事务。选型要从数据访问模式、事务边界、索引、容量和团队运维能力出发。

## 原理拆解与场景

例如电商订单与订单项若总是一起读取，MongoDB 可把明细嵌入订单文档；但商品价格是会独立更新的权威数据，通常用引用或订单快照，而不是把一个可变商品对象复制到所有订单。MySQL 可用 `orders` 与 `order_items` 两表、主外键和事务写入；文档检索频繁且结构多样的商品详情可以在 MongoDB 建模。

## 关键边界与工程取舍

不要说 MongoDB“不支持事务”或 MySQL“不能存 JSON”；两者都具备相关能力，差异在建模和工作负载。MongoDB 文档有大小限制，跨文档事务也有代价。多数据库并用会增加数据同步、故障处理和运维复杂度，先证明单一系统不足。

## 面试官递进追问

### 1. 订单与订单项在两种模型里怎样表示？

**参考答案：** MySQL 通常用 orders 保存订单头、order_items 保存明细，以 order_id 建立关系，并在同一个 InnoDB 事务中写入。MongoDB 若订单和明细经常一起读写、明细数量有合理上限，可把 items 数组嵌在订单文档中，让单文档更新天然原子；若明细持续增长或需大量独立操作，则可拆集合并引用。两种模型都应保留成交价格等快照，避免商品主数据变化改写历史；嵌入方案还要关注文档大小及单文档写热点。

### 2. MongoDB 的事务边界是什么？

**参考答案：** MongoDB 的单文档写操作是原子的，更新同一文档中的多个字段或嵌入明细也属于这一范围；一次 updateMany 涉及多文档时，不会自动让全部文档共同原子提交。需要多文档原子性时，可在副本集或分片集群上显式使用事务，范围能够跨集合、数据库及分片，standalone 部署不支持这种事务。读取隔离、持久性和跨分片外部可见性仍取决于 read concern、write concern 等设置，不能把任意配置都说成全局强一致。事务还要处理冲突、重试和执行时限，也不能覆盖 MySQL 或外部 HTTP 调用。[MongoDB 事务](https://www.mongodb.com/docs/manual/core/transactions/)、[部署限制](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/)

### 3. 双数据库同步失败时如何确认权威源并补偿？

**参考答案：** 先按实体甚至字段定义写入权威，例如订单状态以 MySQL 为准、MongoDB 只保存查询投影；不要在故障后根据“哪边更新时间更晚”临时决定。权威侧用本地事务同时写业务数据与 outbox，或用可靠 CDC 传递已提交变更；目标侧按业务键和版本幂等写入，保留删除标记以免旧消息复活记录。发生失败时告警积压和消费进度，从断点重放，并在相同版本或一致进度上对账、按权威数据修复。非权威副本通常可重建；若两边分别承担不同业务动作，应设计可追踪的业务状态和补偿步骤，不能把跨库双写当作一个本地事务。

## 自测

- 合上笔记，用 60 秒复述一句话结论、一个例子和一个边界。
- 完成第 3 个追问，写出你会核对的 SQL、指标或故障证据。

## 参考资料

以 MySQL 8.4 为版本基准；官方资料核对日期：2026-09-27。

- [MySQL InnoDB 简介](https://dev.mysql.com/doc/refman/8.4/en/innodb-introduction.html)
- [MongoDB 文档关系建模](https://www.mongodb.com/docs/manual/data-modeling/schema-design-process/map-relationships/)
- [MongoDB 事务](https://www.mongodb.com/docs/manual/core/transactions/)
