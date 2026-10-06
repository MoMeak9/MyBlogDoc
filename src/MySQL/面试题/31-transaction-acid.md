# 什么是事务？事务的ACID特性如何理解？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

事务是一次提交或回滚的工作单元；ACID 描述其原子性、一致性、隔离性和持久性，但业务一致性仍要靠正确的约束与事务逻辑。

## 面试口语版（约 60 秒）

“比如账户 A 向 B 转 100 元，扣款和加款要作为一个事务提交：出错时整体回滚，这是原子性。执行前后总金额及余额规则都成立，是一致性；数据库的主键、外键、检查约束只覆盖部分规则，应用还得正确编排。并发转账相互如何可见由隔离级别和锁决定，这是隔离性；提交返回后即使数据库崩溃也要能恢复已提交数据，是持久性。InnoDB 用 undo 支持回滚和历史版本、redo 支持崩溃恢复，锁和 MVCC 支持隔离。还要注意事务只管数据库内的操作，不会自动回滚已经发出的 HTTP 请求或 MQ 消息；持久性强度也受日志刷盘配置和底层存储影响。”

## 转账示例

```sql
START TRANSACTION;
UPDATE account SET balance = balance - 100
WHERE id = 1 AND balance >= 100;
-- 必须确认影响行数为 1，否则 ROLLBACK
UPDATE account SET balance = balance + 100 WHERE id = 2;
-- 必须确认收款账户存在且影响行数为 1，否则 ROLLBACK
COMMIT;
```

两条 SQL 都在同一 InnoDB 事务中。示例省略了货币最小单位、账户冻结、重复请求、转账流水等业务规则；真实系统应以请求唯一键防重并记录流水。`ROLLBACK` 撤销本事务已执行但未提交的数据库修改，不能撤销外部副作用。`START TRANSACTION` 与 `COMMIT` 之间不要夹入会隐式提交的 DDL。

| 特性 | 可回答的具体问题 | InnoDB 中的主要机制与边界 |
| --- | --- | --- |
| A 原子性 | 扣款成功、加款失败怎么办？ | 事务提交或回滚；undo 参与回滚。错误发生后应用应明确 `ROLLBACK`。 |
| C 一致性 | 执行前后业务不变量是否成立？ | 约束、正确 SQL、事务边界共同维护；“有事务”不代表业务逻辑正确。 |
| I 隔离性 | 并发事务能看到彼此的什么状态？ | RC、RR 等隔离级别，配合 MVCC 与锁；隔离程度可配置。 |
| D 持久性 | COMMIT 成功后宕机会丢数据吗？ | redo 与崩溃恢复；`innodb_flush_log_at_trx_commit`、存储可靠性等影响断电保证。 |

## 容易说错的地方

- **一致性不是一种单独的日志**：数据库保证其能识别的约束和事务语义，诸如“不能重复发券”需要唯一约束或幂等策略。
- **隔离性不等于完全串行**：默认 RR 下普通快照读与锁定读行为不同，仍须分析并发写入的业务不变量。
- **原子性有边界**：单机事务不跨越两个独立 MySQL 实例，也不覆盖 Kafka、第三方支付等资源；跨系统要明确一致性模型。
- **持久性不等于每个配置都一样**：例如调整 `innodb_flush_log_at_trx_commit` 会改变崩溃时可能丢失最近提交的窗口；讨论时需说明配置与故障模型。

## 递进追问

### 1. 转账第二条 UPDATE 影响行数为 0 时，为什么不能直接 COMMIT？

**参考答案：** 示例中第二条 SQL 要给收款账户增加 100，影响行数为 0 表示这一步没有完成，常见原因是账户不存在。若直接提交，第一条扣款会生效而收款方没有入账，转账的金额守恒被破坏。数据库把“没有匹配行”视为正常执行结果，不会自动识别业务失败或替应用回滚；应用必须检查两条语句的结果，任一步不满足预期就回滚整个事务，并返回明确的失败原因。

### 2. undo、redo、MVCC 分别主要支持 ACID 中的哪些能力？

**参考答案：** undo 保存撤销修改所需的信息，主要支持原子性，也为 MVCC 重建旧版本提供基础；redo 支持崩溃恢复，使已经按持久性配置落盘的修改可以重放，主要支撑持久性。MVCC 结合 Read View 为一致性读选择可见版本，主要支撑隔离性，写冲突仍要由锁等机制协调。三者并非与 A、I、D 严格一一对应：崩溃恢复还需撤销未完成事务，而业务一致性依赖这些机制、约束与正确的事务逻辑共同维护。[MySQL 8.4：Undo Logs](https://dev.mysql.com/doc/refman/8.4/en/innodb-undo-logs.html)

### 3. 数据库提交成功而消息发送失败时，单库事务为什么无能为力？如何用 Outbox 缩小双写窗口？

**参考答案：** 单库事务的提交点只覆盖这个数据库中的事务性修改；MQ 不属于同一资源，库提交之后无法再用 `ROLLBACK` 撤销，改成先发消息又会出现“消息已发但数据库回滚”。Outbox 将业务写入和待发事件写入同一个本地事务，使两者一起成功或失败，再由独立发布器读取已提交事件发送。

它把双写问题转换成可恢复的投递任务：发送失败可重试，发送成功但标记失败可重发。后者要求消费者按事件 ID 幂等，并原子保存消费记录和业务结果；还需积压告警及对账。它解决的是本地状态与事件意图的原子性，不是数据库与 MQ 的同步原子提交。[AWS：Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)

## 自测

- 不看表格，用转账例子逐一解释 ACID，每项至少给一个故障或并发情景。
- 解释 `COMMIT` 成功后的“持久”需要附带哪两个前提：刷盘配置与存储故障模型。
- 说明业务一致性由数据库约束、SQL 条件、应用逻辑分别承担什么。

## 延伸阅读

- [023-mysql-transaction-implementation.md](/posts/MySQL/023-mysql-transaction-implementation/)

## 官方参考（核对日期：2026-09-27）

- [MySQL 8.4：InnoDB and the ACID Model](https://dev.mysql.com/doc/refman/8.4/en/mysql-acid.html)
- [MySQL 8.4：autocommit, Commit, and Rollback](https://dev.mysql.com/doc/refman/8.4/en/innodb-autocommit-commit-rollback.html)
- [MySQL 8.4：InnoDB Redo Log](https://dev.mysql.com/doc/refman/8.4/en/innodb-redo-log.html)
