# Kafka如何保证消息不丢失

日期：2026-09-27  
标签：#面试 #场景设计 #消息队列 #Kafka  
难度：中等  
来源：[牛面场景题](https://niumianoffer.com/nm_practice/questions?bank_id=bank_1757645675392050216&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

防丢要逐段覆盖业务库到生产者、生产者到 Broker、副本故障，以及消费者处理到位点提交；无法靠单个 Kafka 参数保证所有外部副作用。

## 面试口语版（约 75 秒）

我会先画端到端链路，再找每一段的丢失窗口。业务数据写库后若进程在发消息前崩溃，用事务性 outbox 把业务状态和待发事件一起提交。生产端等待发送结果，对失败或结果不明的事件重试，并配合 acks=all、幂等生产者；Broker 配足副本和合适的 min.insync.replicas，避免非同步副本当选造成已确认数据丢失。消费者应关闭自动位点提交，由应用在业务处理成功后提交；处理失败重试或隔离并审计，不能悄悄跳过。即便如此，数据库提交后、位点提交前崩溃仍会重复处理，所以还要业务幂等。也必须监控保留期、积压和副本健康，别让未处理消息过期。

## 故障链路图

~~~mermaid
flowchart LR
  DB[(业务库 + outbox)] -->|可重试投递| P[生产者]
  P -->|acks=all| B[Broker 多副本]
  B -->|读取| C[消费者]
  C -->|处理成功| X[(业务副作用)]
  X -->|之后提交| O[消费位点]
~~~

| 环节 | 典型故障 | 对策 |
| --- | --- | --- |
| 业务库 → 生产者 | 业务提交后进程退出，事件未发 | 同库事务性 outbox、重试与对账 |
| 生产者 → Broker | 网络超时，结果未知；错误被忽略 | 等待回调/结果，重试并保留事件 ID；启用兼容的幂等配置 |
| Broker 副本 | Leader 仅自身写入后故障 | acks=all、合理副本数与 min.insync.replicas；评估禁止非同步副本选主 |
| 消费者 → 业务库 | 先提交位点，后处理失败 | 处理成功后提交，失败可重试、隔离或人工修复 |
| 保留与积压 | 消费太慢导致数据过期 | 监控最老待处理消息年龄、保留期和磁盘容量 |

## 具体失败分支

支付状态已入库，发 Kafka 前进程宕机：outbox 重启后继续发。若发送成功但确认回调丢失，重试可能产生业务层重复事件；生产者幂等只能处理它所覆盖的生产重试场景，消费者仍按事件 ID 做幂等。消费者完成积分入账后、提交位点前宕机，重启会再读该消息；积分唯一流水约束阻止二次入账。

## 取舍与易错点

- 使用应用控制的“处理成功后提交位点”流程时，设置 `enable.auto.commit=false`；否则后台自动提交可能先于业务事务完成。
- acks=all 的耐久性以仍存在同步副本为前提；它不保证机房级毁损、错误删除或外部数据库操作安全。
- min.insync.replicas 太高而同步副本不足时会拒绝写入，提高耐久性但影响可用性；太低则减少冗余确认。
- “成功写 Kafka”与“业务已处理成功”是两个不同承诺。业务接口应按真实完成状态返回。
- Kafka 事务可以原子关联 Kafka 输出与消费位点，但不能自动让任意外部数据库更新实现跨系统 exactly once。

## 面试官递进追问

1. **acks=1 和 acks=all 差在哪？** 前者 Leader 确认即可，后者等待同步副本确认。
2. **为什么先处理后提交位点？** 先提交会在处理失败时跳过消息；后提交允许重读，需幂等。
3. **业务入库成功但 Kafka 不可用怎么办？** outbox 保留待发事件，异步重试、告警与对账。

## 自测

- 画四段链路，给每段标一个失败窗口。
- 解释“消息不丢”与“不会重复处理”为什么要同时设计。
- 模拟同步副本不足时的写入决策和对用户的响应。

## 参考资料

核对日期：2026-09-27。

- [Apache Kafka Producer Configs：acks 与幂等](https://kafka.apache.org/43/configuration/producer-configs/)
- [Apache Kafka Broker Configs：副本和最小同步副本](https://kafka.apache.org/43/configuration/broker-configs/)
- [Apache Kafka Design：交付语义与事务边界](https://kafka.apache.org/43/design/design/)
- [Debezium Documentation：Outbox Event Router](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html)
