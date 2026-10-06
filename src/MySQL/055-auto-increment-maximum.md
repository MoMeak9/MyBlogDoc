# MySQL 中 AUTO_INCREMENT 列达到最大值时会发生什么？

日期：2026-07-11  
难度：中等  
标签：#面试 #MySQL #AUTO_INCREMENT #容量规划 #VIP

## 一句话答案

当 AUTO_INCREMENT 达到字段类型上限后，MySQL 无法生成下一个序列值，后续依赖自动编号的 INSERT 会失败，不会自动扩容或从 1 循环覆盖。

## 面试口语版

行为取决于列的数据类型和是否 UNSIGNED。例如有符号 INT 最大是 2,147,483,647，INT UNSIGNED 最大约 42.9 亿；达到上限后下一次自动生成 ID 会报错。解决不能等故障发生再做，应该持续监控当前最大值与增长速度，提前把字段及所有外键、关联表改为 BIGINT，或重新设计 ID。在线修改大表字段可能触发表重建、复制延迟和长时间 DDL，需要先评估在线 DDL 或 gh-ost、pt-online-schema-change 等迁移方式。

## 原理拆解

```sql
-- 低成本查看下一次自增值（表元数据）
SELECT
  TABLE_SCHEMA,
  TABLE_NAME,
  AUTO_INCREMENT AS next_value
FROM information_schema.tables
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'your_table';
```

> `AUTO_INCREMENT` 是下一候选值，不等同于精确行数。超大表不要为监控而频繁执行无必要的全表聚合；可结合元数据、增长速率和离线采样计算剩余容量。

## 关键细节

- 删除历史行通常不会自动回收自增值，也不能作为可靠解决方案。
- 改主表类型时必须同步检查外键、消息协议、ORM、缓存键和下游数仓类型。
- INT 改 BIGINT 会增大主键和所有二级索引叶子节点，需要容量评估。

## 面试官追问

1. INT 与 BIGINT 的上限和存储大小？
2. 为什么 DELETE 不能根治自增耗尽？
3. 如何在线把大表主键升级为 BIGINT？

## 高分补充

容量治理应使用“剩余 ID 数 ÷ 峰值日增量”估算耗尽时间并提前告警。

## 学习清单

- 记住 signed/unsigned INT 范围。
- 列出主键类型变更的所有上下游影响。
