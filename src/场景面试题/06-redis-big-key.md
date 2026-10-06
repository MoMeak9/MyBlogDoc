# 什么是大key问题？

日期：2026-09-27  
标签：#面试 #场景设计 #Redis  
难度：中等  
来源：[牛面场景题](https://niumianoffer.com/nm_practice/questions?bank_id=bank_1757645675392050216&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

大 key 指单个键占用内存过多或集合成员过多；没有统一字节阈值，要看它是否造成单次命令、传输、删除或迁移的异常成本。

## 面试口语版（约 60 秒）

例如把一个活动的所有参与者放进同一个 Set，人数持续增长，这个键既占内存，一次全量读取、删除或迁移也会越来越慢。大 key 不等于 Redis 总内存大，它关注单个键的体量和操作方式。我会先从应用慢请求、Redis 慢日志和内存指标定位可疑业务键，再用 `redis-cli --bigkeys`、`--memkeys` 或受控 `SCAN` 配合 `MEMORY USAGE` 查看。治理时优先调整数据模型：按业务维度拆键，读取改为分页或增量遍历，限制无限增长。删除大键可用 `UNLINK` 异步回收，但仍需观察后台释放带来的资源压力。

## 机制与例子

假设 `participants:event-1` 集合不断增长，而接口用 `SMEMBERS` 全量获取：返回包、Redis 操作和应用反序列化成本都会随成员数增长。可以按活动分区或时间拆键，使用 `SSCAN` 增量处理；若业务要随机查询，还须设计成员到分片的定位规则，避免每次扫所有分片。

| 排查对象 | 手段 | 注意点 |
| --- | --- | --- |
| 成员很多或值很长 | `redis-cli --bigkeys`、类型相关长度命令 | 找到候选后结合访问模式判断风险 |
| 内存占用 | `redis-cli --memkeys`、`MEMORY USAGE key` | 聚合类型默认采样；扫描所有成员更耗时 |
| 扫描键空间 | `SCAN` 分批遍历 | `COUNT` 是提示值；数据变化时可能重复 |
| 删除 | `UNLINK key` | 键先移除，内存后台回收，仍要观察资源 |

## 取舍与易错点

- 不在生产高峰用 `KEYS *` 枚举全库，也不要盲目用 `HGETALL`、`SMEMBERS` 全量读取大集合。
- 拆键会增加键数量和聚合逻辑，先确定访问模式再决定按租户、时间还是哈希片拆分。
- 大 key 说的是体量，热 key 说的是访问频率，两者可能同时出现。
- 关注最大键体量、命令耗时、网络出入量、迁移和删除期间的延迟。

## 面试官递进追问

1. 一个小键每秒访问很多次，是大 key 吗？
2. `SCAN` 与 `KEYS` 在生产排查时有什么区别？
3. 为什么 `UNLINK` 减少删除阻塞，却不意味着释放资源零成本？

## 自测

- 不看笔记，60 秒给出定义、一个大集合例子、定位与治理路径。
- 设计将单个超大活动参与者集合拆分的读写定位规则。

## 参考资料

- [Redis 官方：Redis CLI 的大键与内存扫描](https://redis.io/docs/latest/develop/tools/cli/)
- [Redis 官方：SCAN](https://redis.io/docs/latest/commands/scan/)
- [Redis 官方：MEMORY USAGE](https://redis.io/docs/latest/commands/memory-usage/)
- [Redis 官方：UNLINK](https://redis.io/docs/latest/commands/unlink/)

资料核对日期：2026-09-27。
