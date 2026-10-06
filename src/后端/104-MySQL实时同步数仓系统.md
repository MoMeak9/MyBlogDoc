# 设计 MySQL 实时同步到数据仓库的系统

日期：2026-07-12  
标签：#面试 #八股 #后端 #CDC #数据同步 #系统设计

## 一句话答案

系统由快照读取、binlog CDC、Schema 管理、消息缓冲、流式转换、幂等 Sink、检查点和监控组成，核心是位点可恢复与端到端数据语义清晰。

## 面试口语版

采集层读取 MySQL binlog，首次同步先做分片快照并记录一致位点；变更事件标准化为 before/after、主键、事务、源位点和 schema version。Kafka 解耦源库与下游，按表或主键分区。计算层做过滤、格式统一和维表关联，Sink 批量写入 ClickHouse、湖仓或其他数仓。Flink checkpoint 同时保存源位点与算子状态，恢复后重放；目标通过主键版本 upsert 或事务提交保证幂等。控制面管理任务、表映射、Schema 演进、限速、告警和补数。

## 核心组件

- Source：一致快照、binlog 解析、位点管理。
- Buffer：Kafka 持久化、分区、保留与回放。
- Processor：转换、路由、Schema 和检查点。
- Sink：批量、幂等、事务和死信。
- Control：任务编排、监控、对账与回补。

## 关键细节

- DDL 事件必须和 DML 顺序处理，Schema 不兼容要暂停而非静默丢字段。
- 大事务会导致单事件批次过大和延迟尖刺。
- 源库读取限速，防快照拖垮线上业务。
- 监控端到端 Lag，而不只看 Kafka Lag。

## 面试官追问

1. 如何处理表结构变更？
2. 如何做到断点续传？
3. 目标数仓不支持事务 Upsert 怎么办？

## 面试官追问参考答案

### 1. 如何处理表结构变更？

CDC 捕获 DDL 并更新 Schema Registry，事件携带版本；兼容新增列可自动演进，删除/改类型需评估并灰度。消费者不认识版本时进入隔离队列并告警，不能按旧 Schema 错写。

### 2. 如何做到断点续传？

检查点原子记录源 binlog 位点、各分区 Offset 和 Sink 提交状态。恢复时从最后完成 checkpoint 重放，Sink 幂等消除重复；检查点写入高可用存储并定期验证可恢复性。

### 3. 目标数仓不支持事务 Upsert 怎么办？

先写带批次 ID 的 staging/不可变增量表，完成后原子发布分区或通过 merge 生成新版本；读取只选择已提交批次。重复批次按 ID 跳过，后台 compaction 合并最新状态。

## 学习清单

- [ ] 能拆出 Source、Buffer、Processor、Sink、Control。
- [ ] 理解 Schema 与 checkpoint。

