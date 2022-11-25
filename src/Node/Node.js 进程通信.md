---
date: 2022-04-06
icon: page
---

# Node.js 进程通信

> 由面试题引出的

黄金时代：事件驱动

为了解决高并发问题，基于事件驱动的服务模型出现了，像Node与Nginx均是基于事件驱动 的方式实现的，采用单线程避免了不必要的内存开销和上下文切换开销。

## 多进程架构

面对单进程单线程对多核使用不足的问题，前人的经验是启动多进程即可。理想状态下每个 进程各自利用一个CPU，以此实现多核CPU的利用。所幸，Node提供了child_process模块，并 且也提供了child_process.fork()函数供我们实现进程的复制。

```js
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(Math.round((1 + Math.random()) * 1000), '127.0.0.1');
```

通过`node worker.js`启动它，将会侦听1000到2000之间的一个随机端口。

将以下代码存为master.js，并通过node master.js启动它：

```js
var fork = require('child_process').fork;
var cpus = require('os').cpus();
for (var i = 0; i < cpus.length; i++) {
    fork('./worker.js');
} 
```

这段代码将会根据当前机器上的CPU数量复制出对应Node进程数。在*nix系统下可以通过ps aux | grep worker.js查看到进程的数量，如下所示：

```shell
$ ps aux | grep worker.js
jacksontian 1475 0.0 0.0 2432768 600 s003 S+ 3:27AM 0:00.00 grep worker.js
jacksontian 1440 0.0 0.2 3022452 12680 s003 S 3:25AM 0:00.14 /usr/local/bin/node ./worker.js
jacksontian 1439 0.0 0.2 3023476 12716 s003 S 3:25AM 0:00.14 /usr/local/bin/node ./worker.js
jacksontian 1438 0.0 0.2 3022452 12704 s003 S 3:25AM 0:00.14 /usr/local/bin/node ./worker.js
jacksontian 1437 0.0 0.2 3031668 12696 s003 S 3:25AM 0:00.15 /usr/local/bin/node ./worker.js 
```

这就是著名的Master-Worker模式，又称主从模式。图中的进程分为两种：主进程和工作进程。这是典型的分式架构中用于并行处理业务的模式，具备较好的可伸缩性和稳定性。主进程不负责具体的业务处理，而是负责调度或管理工作进程，它是趋向于稳定的。工作进程负责具体的业务处理，因为业务的多种多样，甚至一项业务由多人开发完成，所以工作进程的稳定性值得开发者关注。

![image-20220406221417509](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204062214585.png)



### 创建子进程







### 进程间通信

在Master-Worker模式中，要实现主进程管理和调度工作进程的功能，需要主进程和工作进程之间的通信。对于child_process模块，创建好了子进程，然后与父子进程间通信是十分容易的。 

在前端浏览器中，**JavaScript主线程与UI渲染共用同一个线程。执行JavaScript的时候UI渲染 是停滞的，渲染UI时，JavaScript是停滞的，两者互相阻塞。**长时间执行JavaScript将会造成UI停 顿不响应。为了解决这个问题，HTML5提出了WebWorker API。WebWorker允许创建工作线程并 在后台运行，使得一些阻塞较为严重的计算不影响主线程上的UI渲染。

Node中对应示例如下所示：

```js
// parent.js
var cp = require('child_process');
var n = cp.fork(__dirname + '/sub.js');
n.on('message', function (m) {
    console.log('PARENT got message:', m);
});
n.send({hello: 'world'});
// sub.js
process.on('message', function (m) {
    console.log('CHILD got message:', m);
});
process.send({foo: 'bar'}); 
```

通过fork()或者其他API，创建子进程之后，为了实现父子进程之间的通信，父进程与子进 程之间将会**<u>创建IPC通道</u>**。通过IPC通道，父子进程之间才能通过message和send()传递消息。

- 进程间通信原理

IPC的全称是Inter-Process Communication，即进程间通信。进程间通信的目的是为了让不同 的进程能够互相访问资源并进行协调工作。实现进程间通信的技术有很多，如**命名管道、匿名管道、socket、信号量、共享内存、消息队列、Domain Socket**等。Node中实现IPC通道的是**<u>管道（pipe） 技术</u>**。但此管道非彼管道，在Node中管道是个抽象层面的称呼，具体细节实现由libuv提供，**在 Windows下由<u>命名管道</u>（named pipe）实现，*nix系统则采用Unix Domain <u>Socket</u>实现**。**<u>表现在应用层上</u>**的进程间通信**<u>只有简单的message事件和send()方法</u>**，接口十分简洁和消息化。图9-2为IPC 创建和实现的示意图。

![image-20220406222630302](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204062226499.png)

父进程**在实际创建子进程之前，会创建IPC通道并监听它(中间者)**，然后才真正创建出子进程，并通 过环境变量（NODE_CHANNEL_FD）**告诉子进程这个IPC通道的文件描述符**。子进程在启动的过程中， 根据文件描述符去连接这个已存在的IPC通道，从而完成父子进程之间的连接。图9-3为创建IPC 管道的步骤示意图。

![image-20220406223102209](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204062231266.png)

建立连接之后的父子进程就可以自由地通信了。由于IPC通道是用命名管道或Domain Socket创建的，它们与网络socket的行为比较类似，**属于双向通信**。**不同的是它们在<u>系统内核</u>中就完成了进程间的通信**，而不用经过实际的网络层，非常高效。在Node中，IPC通道被抽象为Stream（流）对象，在调用send()时发送数据（类似于write()），接收到的消息会通过message事件（类似于data）触发给应用层。

