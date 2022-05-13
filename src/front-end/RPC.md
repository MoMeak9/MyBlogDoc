# RPC 笔记

> 如今分布式系统大行其道的年代，RPC 有着举足轻重的地位。风靡的 Duboo、Thrift、gRpc 等框架各领风骚，深入了解RPC是新手也是老鸟的必修课。

## RPC定义

远程服务调用（Remote procedure call）的概念历史已久，1981年就已经被提出，最初的目的就是为了**调用远程方法像调用本地方法一样简单**，经历了四十多年的更新与迭代，RPC 的大体思路已经趋于稳定，如今百家争鸣的 RPC 协议和框架，诸如 Dubbo （阿里）、Thrift（FaceBook）、gRpc（Google）、brpc （百度）等都在不同侧重点去解决最初的目的，有的想极致完美，有的追求极致性能，有的偏向极致简单。

## RPC原理

让我们回到 RPC 最初的目的，要想实现**调用远程方法像调用本地方法一样简单**，至少要解决如下问题：

1. 如何获取可用的远程服务器（服务注册与发现）
2. 如何表示数据（序列化与反序列化）
3. 如何传递数据（网络通讯）
4. 服务端如何确定并调用目标方法（调用方法映射）

上述四点问题，都能与现在分布式系统火热的术语一一对应，如何获取可用的远程服务器（服务注册与发现）、如何表示数据（序列化与反序列化）、如何传递数据（网络通讯）、服务端如何确定并调用目标方法（调用方法映射）。笔者将通过一个简单 RPC 项目来解决这些问题。

首先来看 RPC 的整体系统架构图：

![img](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204121622570.png)

图中服务端启动时将自己的服务节点信息注册到注册中心，客户端调用远程方法时会订阅注册中心中的可用服务节点信息，拿到可用服务节点之后远程调用方法，当注册中心中的可用服务节点发生变化时会通知客户端，避免客户端继续调用已经失效的节点。那客户端是如何调用远程方法的呢，来看一下远程调用示意图：

![img](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204121623828.png)

1. 客户端模块代理所有远程方法的调用
2. 将目标服务、目标方法、调用目标方法的参数等必要信息序列化
3. 序列化之后的数据包进一步压缩，压缩后的数据包通过网络通信传输到目标服务节点
4. 服务节点将接受到的数据包进行解压
5. 解压后的数据包反序列化成目标服务、目标方法、目标方法的调用参数
6. 通过服务端代理调用目标方法获取结果，结果同样需要序列化、压缩然后回传给客户端

通过以上描述，相信读者应该大体上了解了 RPC 是如何工作的，接下来看如何使用代码具体实现上述的流程。鉴于篇幅笔者会选择重要或者网络上介绍相对较少的模块来讲述。

## RPC与HTTP

### 先讲讲HTTP

HTTP：**Hypertext Transfer Protocol**即超文本传输协议。

HTTP协议在1990年才开始作为主流协议出现；之所以被我们所熟知，是因为通常HTTP用于web端，也就是web浏览器和web服务器交互。当ajax和json在前端大行其道的时候，json也开始发挥其自身能力，简洁易用的特性让json成为前后端数据传输主流选择。HTTP协议中以Restful规范为代表，其优势很大。它**可读性好**，且**可以得到防火墙的支持、跨语言的支持**。

HTTP的缺点也很快暴露：

1. **有用信息占比少**，HTTP在OSI的第七层，包含了大量的HTTP头等信息
2. **效率低**，因为第七层的缘故，中间有很多层传递
3. HTTP协议**调用远程方法复杂**，需要封装各种参数名和参数值以及加密通讯等

### 所以RPC好在哪？

1. **都是有用信息**
2. **效率高**
3. **调用简单**
4. **无需关心网络传输或者通讯问题**

### HTTP和RPC其实有联系

**http也是rpc实现的一种方式。**

### RPC和HTTP一句话说不同

RPC就像地区方言，只有内部知道，双方都需要知道方言，不然没法沟通

HTTP就是普通话，基本都能懂，也会说

## RPC一般用于什么地方？

在**微服务、分布式**已经成为日常的今天，服务通常都部署在不同的服务器，服务器也在不同地区，这时候就存在跨地域跨服务器调用问题，**RPC即用于这样类似的情况**。

RPC适用于公司内部使用，性能消耗低，传输效率高，服务治理方便，但是不建议传输较大的文本、视频等。






