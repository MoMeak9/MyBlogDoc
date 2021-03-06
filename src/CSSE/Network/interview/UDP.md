---
date: 2022-07-31
category:
- Network
---

# UDP应知应会

文章仅作为给位考试、面试复习内容使用，不适合零基础学习UDP知识。

## UDP数据报 🤔

UDP实现了传输协议能够做的最少的工作，在IP的数据报服务上增加了两个最基本的服务：复用和分用以及差错控制。

### UPD优点

- UDP无需建立连接，不会有建立连接的时延
- 无连接状态，UDP不维护连接状态，应用服务器使用UDP时，能够支持更多的活动客户机
- 首部开销小

### 应用场景特点

UDP常用于一次性传输较少数据的网络应用，例如DNS，SNMP等等。UDP提供最大努力的交付，即不可靠交付，所有的维护传输可靠性的工作都需要应用层来完成。UPD是面向报文的，保温是UDP的最小处理单位。

### UDP首部

UDP首部非常短，仅携带以下四条信息

- 源端口号：发送方端口号，需要对方回信时使用，不需要可以全用0，

- 目的端口号：终点交付报文时必须使用

- 长度：UDP数据报长度（包括首部和数据），最小值8

- 检验和：检测UDP用户数据包在传输中是否有错，有错就会直接丢弃。该字段是可选的，当源主机不想计算校验和时，则直接令该字段为0

### 收到数据报之后的处理

根据首部中的目的端口，讲UDP数据报通过相应的端口上交给应用进程。如果接收方UDP发现接收的报文中的目的端口号不正确，会丢弃该报文，并由ICMP发送”端口不可达“的差错报文给发送方。

## UDP数据校验 🔍

UDP本身检错能力不强，但是简单，数据处理快（要么丢弃要么上报给上层，并附带错误报告），而且仅检查首部和数据部分。

其中要注意的是，校验时，对不满偶数个字节的数据部分，会进行补全一个全为0的字节。对错误的报文，要么丢弃，要么附带上错误报告交给上层处理（检错而不是纠错）。

其可以通过伪首部，检查源端口、目的端口号和UDP数据报的数据部分，还可以检查IP数据报的源IP地址和目的地址。



