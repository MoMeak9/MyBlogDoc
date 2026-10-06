# 什么是缓存穿透？如何解决？

日期：2026-09-27  
标签：#面试 #场景设计 #Redis  
难度：中等  
来源：[牛面场景题](https://niumianoffer.com/nm_practice/questions?bank_id=bank_1757645675392050216&activeIndex=0)  
答案说明：独立整理（站内题目标记为 VIP，未读取会员答案）

## 一句话答案

缓存穿透是请求反复查询根本不存在的对象，缓存没有正向数据，每次都回源；通过参数校验、空结果短期缓存、限流及适合场景时的布隆过滤器组合治理。

## 面试口语版（约 60 秒）

假设商品 ID 不存在，请求查 Redis 未命中，查数据库也是空。若不存在的 ID 被持续请求，数据库仍会承压，这就是穿透。第一层做参数格式、租户和权限校验；对已确认不存在的 ID 缓存能与正常数据区分的空值，并设较短 TTL，新商品创建时主动删除相应空值。若合法 ID 集合足够大且可维护，可加布隆过滤器：它判断“不存在”时可以拦截；判断“可能存在”仍要查缓存和数据库，因为存在误判。最后对随机 ID 扫描式流量做限流，并监控负缓存数量，避免攻击者用大量不同 ID 填满缓存。

## 请求路径与例子

```text
if invalid_format_or_no_permission(id): reject
if bloom_enabled and bloom_says_absent(id): return not_found
value = cache.get(id)
if value == NOT_FOUND_SENTINEL: return not_found
if value exists: return value
value = database.get(id)
if value is absent:
    cache.set(id, NOT_FOUND_SENTINEL, short_ttl)
    return not_found
cache.set(id, value, normal_ttl)
return value
```

新商品创建时，先前对该 ID 的负缓存可能还在，创建路径应主动失效哨兵。布隆过滤器也必须同步新增 ID；若漏录真实存在的数据，它可能错误地拦掉请求。标准布隆过滤器“没有假阴性”的前提是实际集合已完整写入过滤器，不能省略数据同步设计。

## 取舍与易错点

- 空值缓存适合重复查询相同无效键；随机键扫描会占内存，需要限制 TTL、容量及请求速率。
- 布隆过滤器省内存，但有假阳性；“可能存在”不能当成真实存在。删除与新增维护也较复杂。
- 穿透的对象本来不存在；击穿是存在的热点对象缓存失效后集中回源。
- 观察无效参数率、负缓存命中与数量、数据库查无结果比例及来源分布。

## 面试官递进追问

1. 空值缓存的 TTL 为什么通常短于正常数据？
2. 布隆过滤器返回“可能存在”时能直接给用户返回存在吗？
3. 新增对象时，负缓存和布隆过滤器分别需要如何维护？

## 自测

- 不看笔记，60 秒说出请求路径、三种防护手段及布隆过滤器误判方向。
- 设计能发现恶意随机 ID 请求的监控指标组合。

## 参考资料

- [Redis 官方：Cache-aside 的缺失记录处理](https://redis.io/docs/latest/develop/use-cases/cache-aside/nodejs/)
- [Redis 官方：Bloom filter](https://redis.io/docs/latest/data-types/probabilistic/bloom-filter/)

资料核对日期：2026-09-27。
