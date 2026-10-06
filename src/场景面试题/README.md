# 场景面试题

日期：2026-09-27  
标签：#面试 #场景设计 #Redis #Kafka #MySQL #计算机网络

> 题目与难度来自[牛面场景题题库](https://niumianoffer.com/nm_practice/questions?bank_id=bank_1757645675392050216&activeIndex=0)。共 32 题；8 道可访问题的答案依据页面内容改写。24 道 VIP 题（04–19、21–28）已补齐独立参考答案，未读取站内会员答案。

## 阅读方式

VIP 题的参考答案包含一句话结论、约 60 秒口语版、机制与案例、故障分支、工程取舍、递进追问、自测及资料链接。适合先脱稿回答，再对照失败分支和官方资料检查边界。图解与伪代码仅在能解释实际流程时加入。

- Redis 与缓存：04–12，重点区分锁租约失效、穿透、击穿、雪崩和热 key。
- 消息队列与 Kafka：13–19，重点区分 Broker 交付、消费位点与业务副作用各自的保证范围。
- 网络与数据库：21–28，重点练习故障检测、慢 SQL 诊断、复制延迟和主库切换的排查顺序。

## 题目目录

01. [Redis可以做消息队列吗？什么时候能用Redis做消息队列？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/01-redis-as-message-queue/) · 中等 · 可访问·改写
02. [除了 Redis 实现分布式锁，还有哪些方案可以实现分布式锁？各有什么优缺点？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/02-distributed-lock-alternatives/) · 中等 · 可访问·改写
03. [分布式锁实现要点是什么？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/03-distributed-lock-essentials/) · 简单 · 可访问·改写
04. [基于 Redis 实现分布式锁有什么优缺点？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/04-redis-lock-pros-cons/) · 简单 · VIP·独立整理
05. [如何为Redis分布式锁设置合理的超时时间？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/05-redis-lock-timeout/) · 中等 · VIP·独立整理
06. [什么是大key问题？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/06-redis-big-key/) · 中等 · VIP·独立整理
07. [什么是缓存？有什么价值？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/07-cache-value/) · 简单 · VIP·独立整理
08. [什么是缓存穿透？如何解决？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/08-cache-penetration/) · 中等 · VIP·独立整理
09. [什么是缓存击穿？如何解决？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/09-cache-breakdown/) · 中等 · VIP·独立整理
10. [什么是缓存雪崩？如何解决？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/10-cache-avalanche/) · 中等 · VIP·独立整理
11. [什么是热key？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/11-redis-hot-key/) · 中等 · VIP·独立整理
12. [怎么用Redis实现可重入的分布式锁？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/12-redis-reentrant-lock/) · 中等 · VIP·独立整理
13. [什么情况下需要分发消息？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/13-message-fanout/) · 简单 · VIP·独立整理
14. [什么情况下需要解耦？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/14-message-decoupling/) · 简单 · VIP·独立整理
15. [什么情况下需要削峰？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/15-message-peak-shaving/) · 简单 · VIP·独立整理
16. [Kafka 为什么这么快？Kafka 性能为什么这么高？Kafka 吞吐量为什么这么大？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/16-kafka-throughput/) · 中等 · VIP·独立整理
17. [Kafka如何保证消息不丢失](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/17-kafka-message-loss/) · 中等 · VIP·独立整理
18. [Kafka如何保证消息不重复消费](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/18-kafka-duplicate-consumption/) · 中等 · VIP·独立整理
19. [MQ消息积压了怎么办](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/19-mq-backlog/) · 中等 · VIP·独立整理
20. [什么是分库分表？何时需要进行分库分表？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/20-database-sharding-when/) · 中等 · 可访问·改写
21. [建立连接后，若客户端突然出现故障，服务端会如何处理？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/21-tcp-client-failure-detection/) · 中等 · VIP·独立整理
22. [分库分表后会产生哪些问题？如何解决跨库查询和分布式事务？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/22-sharding-cross-query-transactions/) · 困难 · VIP·独立整理
23. [如何分析和优化慢SQL？慢查询的常见原因有哪些？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/23-mysql-slow-sql/) · 困难 · VIP·独立整理
24. [如何进行MySQL性能监控？关键性能指标有哪些？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/24-mysql-monitoring/) · 困难 · VIP·独立整理
25. [深分页查询如何优化？LIMIT大偏移量的性能问题如何解决？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/25-mysql-deep-pagination/) · 困难 · VIP·独立整理
26. [MySQL配置参数如何调优？关键参数对性能的影响是什么？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/26-mysql-configuration-tuning/) · 困难 · VIP·独立整理
27. [MySQL主从复制有哪些延迟问题？如何解决数据延迟？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/27-mysql-replication-lag/) · 中等 · VIP·独立整理
28. [MySQL主库故障如何处理？故障切换的方案有哪些？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/28-mysql-primary-failover/) · 中等 · VIP·独立整理
29. [服务端如何识别同一用户的多次 HTTP 请求 集群部署时如何处理](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/29-http-user-identity-cluster/) · 中等 · 可访问·改写
30. [服务端在哪些常见场景下会主动断开 TCP 连接？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/30-server-closes-tcp/) · 中等 · 可访问·改写
31. [若服务端进程崩溃或突然断电，已建立的 TCP 连接会发生什么情况？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/31-tcp-server-crash-power-loss/) · 中等 · 可访问·改写
32. [一个服务端进程最多可以建立多少条 TCP 连接？一个机器呢？](/posts/%E5%9C%BA%E6%99%AF%E9%9D%A2%E8%AF%95%E9%A2%98/32-tcp-connection-count/) · 中等 · 可访问·改写
