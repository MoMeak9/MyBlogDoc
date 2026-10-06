# MySQL有哪些事务隔离级别？各自解决什么问题？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

InnoDB 提供 RU、RC、RR、Serializable 四级隔离，逐级约束并发可见性与锁行为；默认 RR，选型还要看读类型和业务不变量。

## 面试口语版（约 60 秒）

“MySQL InnoDB 支持读未提交、读已提交、可重复读和串行化，默认是可重复读。RU 普通读可能看见未提交数据，即脏读；RC 每条一致性读用新快照，避免脏读，但同一事务第二次读可能变，范围里也可能出现新行；RR 的普通一致性读通常复用首次读建立的快照，重复结果稳定。RR 的锁定读和更新对范围会使用 Gap 或 Next-Key 锁抑制插入，但它们看的是较新的可锁定状态，不能与旧快照混为一谈。Serializable 在事务中加强普通读的锁定，隔离更强但等待和吞吐成本较高。选级别不能只背异常表：还要决定查询是展示快照，还是拿结果作后续写入依据；后者往往需要锁定读、唯一约束或条件更新。”

## 对照表（以 InnoDB 8.4 的普通一致性读为主）

| 隔离级别 | 普通读的核心行为 | 面试应说明的异常与代价 |
| --- | --- | --- |
| READ UNCOMMITTED（RU） | 可能读到未提交版本 | 允许脏读，不适合依赖读结果做业务决策。 |
| READ COMMITTED（RC） | 每条一致性读取得新快照 | 避免脏读；可能不可重复读、范围结果变化；锁定范围通常不保留 Gap 锁，外键和重复键检查例外。 |
| REPEATABLE READ（RR） | 同一事务普通一致性读通常复用首次快照 | 重复快照结果稳定；锁定读/写与普通读机制不同，范围操作可用 Next-Key/GAP 锁；默认级别。 |
| SERIALIZABLE | 在显式事务内，普通 `SELECT` 隐式按 `FOR SHARE` 对待 | 强隔离、更多等待；自动提交单条只读查询有特殊优化，不能说所有 SELECT 永远加锁。 |

**脏读**：B 尚未提交的修改被 A 读到，B 随后回滚。**不可重复读**：A 对同一记录前后读值不同，期间 B 修改并提交。**幻读**：A 对同一谓词查询，后一次出现此前没有的符合条件行，期间 B 插入并提交。标准术语是一种帮助记忆的模型；InnoDB 具体表现还取决于普通读、锁定读和语句类型。

## 两会话判断题

```sql
-- 会话 A：先 SET TRANSACTION ISOLATION LEVEL READ COMMITTED 或 REPEATABLE READ
START TRANSACTION;
SELECT v FROM t WHERE id = 1;  -- 假设读到 10
-- 此时会话 B: UPDATE t SET v=20 WHERE id=1; COMMIT;
SELECT v FROM t WHERE id = 1;  -- RC 通常 20；RR 通常 10
SELECT v FROM t WHERE id = 1 FOR UPDATE; -- 锁定读，读取较新可锁定版本
COMMIT;
```

`SET TRANSACTION` 的会话/下一事务作用域应按实际语法设置，并在事务开始前操作。若 A 在两次读取间自己修改记录，随后普通查询会看到本事务写入，不能机械套用“RR 第二次必定是 10”。`UPDATE`/`DELETE` 也不必受旧快照查询结果限制。

## 选择与边界

- 展示类请求常用 RC 或默认 RR，依据对一致视图的需求和锁冲突情况实测；重要写操作优先靠条件更新、唯一索引、明确锁定读保护不变量。
- 更高隔离不自动修复外部双写、跨库事务、客户端重试和业务规则缺失。
- 隔离级别与锁范围会影响吞吐、死锁与复制日志格式等；更改全局配置需验证实际负载和版本。

## 递进追问

### 1. RC 与 RR 下，两个普通 `SELECT` 的快照何时生成？

**参考答案：** RC 下每次普通一致性 SELECT 都创建新快照，因此第二次查询可以看到两次查询之间别人提交的修改；RR 下首次一致性 SELECT 通常建立快照，第二次复用它。两者都不读取其他事务尚未提交的修改，也都能看到本事务自己的写入。RR 的快照时刻通常不是执行 BEGIN 的时刻；`START TRANSACTION WITH CONSISTENT SNAPSHOT` 可以在 RR 下显式建立一致性快照。

### 2. RR 下先普通 SELECT 后 FOR UPDATE，为什么两次结果可能不同？

**参考答案：** 普通 SELECT 使用 MVCC 快照，`FOR UPDATE` 则是锁定读，要读取并锁定当前可用的记录版本，遇到其他事务的冲突锁时等待。因此 A 首次读到余额 10，B 改为 20 并提交后，A 普通读仍可能是 10，而 `FOR UPDATE` 可读到 20。这不表示 RR 失效，也不表示锁定读刷新了原快照。若读结果要作为后续扣减依据，应在同一事务内使用锁定读，或直接执行带余额条件的原子更新。

### 3. 若业务要求“同一类未完成订单最多 5 条”，仅设 RR 能保证并发插入不越限吗？你会用什么约束或锁方案？

**参考答案：** 不能，仅靠 RR 下的 `COUNT(*)` 再插入，两个事务可能都看到 4 条，各插一条后达到 6 条。可为每类订单预建一条额度记录，通过 `UPDATE category_quota SET used=used+1 WHERE category_id=? AND used<5` 原子占用名额，影响行数为 1 才在同一 InnoDB 事务中插入订单；插入失败就整体回滚。

订单完成或取消时，也要把状态转换和名额释放放在同一事务中，并用状态条件或幂等键避免重复释放。所有新增、重开等写入入口都必须遵守该协议，初始计数也要准确。它以每类额度行串行协调写入，代价是热点竞争；单行 CHECK 无法直接表达跨多行的数量限制。

## 自测

- 用两个会话分别写出脏读、不可重复读、幻读的最小时间线。
- 对同一普通 SELECT 场景预测 RC 和 RR 第二次读取结果，并说出例外。
- 解释为何 Serializable 的更强隔离有锁等待成本。

## 延伸阅读

- [028-transaction-isolation-levels.md](/posts/MySQL/028-transaction-isolation-levels/)
- [030-dirty-nonrepeatable-phantom-read.md](/posts/MySQL/030-dirty-nonrepeatable-phantom-read/)

## 官方参考（核对日期：2026-09-27）

- [MySQL 8.4：Transaction Isolation Levels](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)
- [MySQL 8.4：Consistent Nonlocking Reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html)
- [MySQL 8.4：SET TRANSACTION](https://dev.mysql.com/doc/refman/8.4/en/set-transaction.html)
