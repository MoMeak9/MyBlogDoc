# JDK 序列化问题排查

日期：2026-07-11  
标签：#面试 #八股 #Java #后端 #线上问题排查

## 一句话答案

先根据异常区分不可序列化、版本不兼容、类加载和性能安全问题，再核对对象图、serialVersionUID、运行包版本和字节流来源。

## 面试口语版

如果是 `NotSerializableException`，沿对象引用图查未实现 Serializable 的字段，非业务字段可标 transient；如果是 `InvalidClassException`，核对生产两端类版本和 serialVersionUID；`ClassNotFoundException` 则看反序列化端类路径与 ClassLoader。性能问题要看对象图是否过大、是否重复序列化以及 GC；安全上不能反序列化不可信 JDK 对象流，应使用 JEP 290 过滤器或改用有 Schema 的协议。

## 关键细节

- JDK 原生序列化会递归遍历对象图，任一非 transient 引用都需可序列化。
- 显式固定 serialVersionUID 只解决版本身份，不保证字段语义兼容。
- `readObject/writeObject/readResolve` 会改变默认行为，也带来安全风险。
- 持久化长期数据不宜依赖 Java 类结构的原生序列化。

## 面试官追问

1. serialVersionUID 有什么作用？
2. transient 字段反序列化后是什么值？
3. 为什么不应反序列化不可信数据？

## 面试官追问参考答案

### 1. serialVersionUID 有什么作用？

反序列化时用于验证字节流中的类版本与本地类是否兼容；不显式声明时编译器根据类结构计算，微小改动就可能变化。显式声明能控制兼容边界，但开发者仍需保证字段演进可正确处理。

### 2. transient 字段反序列化后是什么值？

默认不会从字节流恢复，得到类型默认值，如引用为 null、数字为 0。若需要重建，可在 `readObject` 中基于其他字段初始化，或在对象加载后显式恢复依赖。

### 3. 为什么不应反序列化不可信数据？

对象流可触发类路径中某些类型的 `readObject` 等方法，恶意对象图可能导致远程代码执行、资源耗尽或逻辑绕过。应拒绝不可信原生对象流，设置 ObjectInputFilter 白名单和大小限制，并优先使用安全 Schema 协议。

## 学习清单

- [ ] 熟悉三类常见序列化异常。
- [ ] 理解版本兼容和反序列化安全风险。

