# MySQL有哪些约束类型？各自的业务作用是什么？如何选择合适的约束策略？

日期：2026-09-27  
标签：#面试 #MySQL #数据库  
难度：中等  
来源：[牛面 MySQL 题库](https://niumianoffer.com/nm_practice/questions?bank_id=50e19cbb-21c2-4330-b45f-5748ae5d8672&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

约束把数据完整性要求放进数据库，包括主键、唯一、非空、外键和检查约束等。

## 面试口语版（约 60 秒）

约束是数据库层最后一道数据完整性防线：主键唯一且非空，UNIQUE 限制业务键重复，NOT NULL 限制缺失值，FOREIGN KEY 维护引用关系，CHECK 限制表达式范围。应用层校验负责友好提示，但并发写入的最终裁决应由合适的数据库约束承担。选择时把数据不变量、写入频率、跨服务边界和迁移成本一起考虑。

## 原理拆解与场景

```sql
CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  order_no VARCHAR(40) NOT NULL UNIQUE,
  user_id BIGINT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  CONSTRAINT chk_amount CHECK (amount >= 0),
  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;
```

下单接口可先校验金额并返回清晰错误；并发生成相同订单号时，最终靠唯一约束避免重复入库。

## 关键边界与工程取舍

MySQL 8.4 的 CHECK 默认 ENFORCED，但表达式结果为 UNKNOWN（例如 NULL）也被接受，所以需要 NOT NULL 时应单独声明。UNIQUE 对 NULL 有特殊处理：允许多个 NULL，具体唯一业务键应设 NOT NULL。跨数据库或拆分后的服务无法直接用单库外键保证全局关系，需要应用级校验、补偿和对账。

## 面试官递进追问

### 1. 唯一约束与应用预检查各解决什么？

**参考答案：** 应用预检查适合提前给出“订单号已存在”等友好提示，但查询与插入之间有并发窗口：两个请求都查到不存在后仍可能同时插入。唯一约束在数据库写入时统一裁决冲突，因此应用要保留约束并正确处理重复键错误，幂等接口还应确认重复请求的业务内容一致。业务键通常同时设 NOT NULL，因为 MySQL UNIQUE 允许多个 NULL；数据库只保证当前约束覆盖范围的唯一，跨分片唯一性还需专门设计。

### 2. CHECK(amount >= 0) 能阻止 NULL 吗？

**参考答案：** 不能。NULL 与 0 做普通比较得到 UNKNOWN，MySQL 的 CHECK 只拒绝 FALSE，TRUE 和 UNKNOWN 都能通过。因此 `CHECK(amount >= 0)` 可以阻止负数，却允许 NULL；金额必填时应写成 `amount DECIMAL(12,2) NOT NULL CHECK (amount >= 0)`。核对实际建表语句也很重要：MySQL 8.4 的 CHECK 默认执行，但可以显式声明为 NOT ENFORCED。验证时至少覆盖负数、0、正数和 NULL，分别确认范围与非空规则。

### 3. 拆库后如何维护原本由外键保障的引用完整性？

**参考答案：** 如果只是同一 MySQL 实例中的不同 schema，满足引擎等条件仍可建立跨 schema 外键；真正拆到不同实例或独立服务后，才无法沿用普通 InnoDB 外键。此时先确定父实体的唯一管理方，通过服务接口校验并约束删除流程；单次“先查存在再写子表”无法防止父记录随后被并发删除。可用软删除、状态机或保留引用的协议协调生命周期，再以 outbox/CDC 传播变更，消费端幂等处理并定期查孤儿记录、补偿未完成操作。若业务不能接受任何引用不一致，应收敛到同一事务边界或采用明确的分布式协调协议。[外键约束](https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html)

## 自测

- 合上笔记，用 60 秒复述一句话结论、一个例子和一个边界。
- 完成第 3 个追问，写出你会核对的 SQL、指标或故障证据。

## 延伸阅读

- [074-table-design-checklist.md](/posts/MySQL/074-table-design-checklist/)
- [071-logical-vs-physical-foreign-key.md](/posts/MySQL/071-logical-vs-physical-foreign-key/)

## 参考资料

以 MySQL 8.4 为版本基准；官方资料核对日期：2026-09-27。

- [CREATE TABLE 约束语法](https://dev.mysql.com/doc/refman/8.4/en/create-table.html)
- [CHECK 约束](https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html)
