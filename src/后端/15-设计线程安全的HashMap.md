# 设计线程安全的 HashMap

日期：2026-07-11  
标签：#面试 #八股 #后端 #系统设计 #场景题


## 一句话答案

HashMap 不是线程安全的；可通过分段锁、桶级锁或类似 ConcurrentHashMap 的 CAS + synchronized 方案实现，并发读主要依赖安全发布和 volatile 可见性。

## 面试口语版

最简单方案是在所有操作外加一把互斥锁，正确但并发度低。更好的方案是把哈希桶分段，不同段独立加锁；JDK 8 的 ConcurrentHashMap 不再使用 Segment，而是对空桶通过 CAS 插入，对桶冲突位置使用 synchronized 锁住首节点，扩容时多个线程可以协助迁移。读取通常不加锁，但节点关键字段和桶数组访问必须保证可见性。

如果题目要求“不加锁”，要先说明完全无同步无法保证并发写正确。可以用不可变 Map 配合 `AtomicReference` 做 Copy-on-Write CAS 替换，适合读多写极少；或设计无锁桶链表并用 CAS，但删除、扩容和 ABA 处理非常复杂，不应轻率手写用于生产。

## 关键细节

- `Collections.synchronizedMap` 是粗粒度锁方案；遍历时仍需按文档要求在外部同步。
- ConcurrentHashMap 不允许 null key/value，以避免并发读取中无法区分“无映射”和“值为 null”。
- 复合操作不能靠 `get` 后 `put` 保证原子，应使用 `computeIfAbsent`、`putIfAbsent` 等。
- Copy-on-Write 的写成本是复制整张表，只适合小表且写极少。

## 面试官追问

1. ConcurrentHashMap 扩容如何避免丢数据？
2. 为什么读可以不加锁？
3. CAS 有什么 ABA 问题？
4. `size()` 如何在高并发下统计？

## 面试官追问参考答案

### 1. ConcurrentHashMap 扩容如何避免丢数据？

JDK 8 用 `sizeCtl` 协调扩容，线程领取不同桶区间并迁移，迁移完成的旧桶放置 ForwardingNode。其他线程看到该节点会到新表查询或协助迁移；桶迁移期间通过 CAS 和桶头同步保护写入，全部完成后才发布新表。

### 2. 为什么读可以不加锁？

桶数组元素和节点值通过 volatile/安全发布保证可见性，节点结构中的关键引用遵守 happens-before 规则；读取遇到树节点或 ForwardingNode 会走对应查找逻辑。无锁读提供弱一致视图，不代表能与一组复合写操作组成事务。

### 3. CAS 有什么 ABA 问题？

一个值从 A 变 B 又变回 A，CAS 只比较当前值，会误以为从未变化。可使用版本号/戳记，把比较对象变成 `(value, version)`，Java 有 `AtomicStampedReference`；链表节点回收场景还需考虑内存复用。

### 4. `size()` 如何在高并发下统计？

每次更新一个全局计数器会形成热点。ConcurrentHashMap 类似 LongAdder：低竞争更新 baseCount，高竞争时分散到 CounterCell，读取时求和；结果在并发修改下是近似瞬时值，不能作为严格事务判断依据。

