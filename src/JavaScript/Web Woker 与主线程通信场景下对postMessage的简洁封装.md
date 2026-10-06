# Web Worker 与主线程通信场景问题和对postMessage的简单封装

在Web Worker与主线程之间进行通信时，使用`postMessage`是一种常见的方式。然而，在某些业务场景中，`postMessage`可能会显得不够简洁，因为它涉及到手动序列化和反序列化数据，以及通过事件监听器处理消息。以下是一些常见问题和解决方案，以简化在Web Worker与主线程之间的通信场景中使用`postMessage`的问题。

## 结构化克隆问题

在Web Worker与主线程之间传输数据时，使用postMessage()方法进行通信，浏览器会对传递的数据进行序列化和反序列化的过程，以便在不同的线程间传递数据。这个序列化和反序列化的过程就是结构化克隆（Structured Cloning）。

结构化克隆是一种浏览器内置的序列化和反序列化算法，它可以将复杂的JavaScript对象、数组、字符串、数字、布尔值等数据类型转换成一个可以在不同线程间传递的二进制数据流，然后再将这个二进制数据流反序列化为与原始数据相同的JavaScript对象。

结构化克隆有一些特点和限制：

1. 支持的数据类型：结构化克隆支持包括对象、数组、字符串、数字、布尔值、日期、正则表达式、Blob、File、ImageData等常见的JavaScript数据类型。但并不支持函数、Map、Set、Symbol等一些特殊的JavaScript数据类型。
2. 克隆整个对象：结构化克隆会克隆整个对象，包括对象的所有属性和方法。这可能会导致性能开销较大，尤其是在传输大规模数据时。
3. 不共享内存：结构化克隆会生成一份完整的副本，而不是共享内存。这意味着在主线程和Web Worker之间传递数据时，会产生复制的开销，并且对数据的修改在不同线程中是不共享的。
4. 兼容性：结构化克隆在大多数现代浏览器中得到支持，但并不是所有浏览器都支持。一些老旧的浏览器可能不支持结构化克隆或者只支持部分数据类型的结构化克隆。

在传输过程中，当使用postMessage()方法传递数据时，浏览器会自动使用结构化克隆对数据进行序列化和反序列化的过程，以便在不同线程间传递数据，但结构化克隆可能会带来性能开销和兼容性问题，需要根据具体情况来选择合适的解决方案。在不支持结构化克隆的浏览器下，使用postMessage()传输数据需要使用JSON对数据内容进行字符串转化和解析，这也会带来一定的性能损耗和数据类型限制。

### 优化方案

1. 分割数据：将大规模的数据分割成较小的块进行传递，而不是一次性传递整个数据。例如，可以将大型数组切割成多个小块，分别传递给Web Worker，然后在Web Worker中重新组合这些小块，从而减少单次传递的数据量。
2. 使用共享内存：共享内存是一种在Web Worker和主线程之间共享数据的方式，而无需进行复制。这样可以避免结构化克隆的性能开销。共享内存可以通过使用TypedArray和ArrayBuffer来实现，可以在主线程和Web Worker之间直接共享数据的引用，而不需要进行复制。需要注意的是，共享内存可能需要使用锁或其他同步机制来确保对共享数据的访问是安全的。
3. 使用其他序列化方式：除了结构化克隆，还可以考虑使用其他的序列化方式，例如JSON.stringify和JSON.parse。虽然JSON序列化和反序列化可能比结构化克隆更慢，但它不会像结构化克隆一样复制整个数据（因仅支持部分数据类型，以及会无视undefined的字段等），而是将数据转换为JSON字符串，并在接收方解析JSON字符串成JavaScript对象。这样可以一定的避免复制大规模的数据，从而降低性能开销。
4. 使用压缩算法：对于大规模的数据，可以考虑使用压缩算法对数据进行压缩，从而减小数据的大小，降低传输的数据量。在接收方进行解压缩后再进行处理。常见的压缩算法有gzip、zlib等，可以在主线程和Web Worker之间使用这些算法对数据进行压缩和解压缩。

## postMessage 简单封装

### 主进程封装

```js
// 定义一个 WorkerMessage 类，用于向 Worker 发送消息并处理返回结果

let canStructuredClone;

export class WorkerMessage {
    constructor(workerUrl) {
        this.worker = new Worker(workerUrl);
        this.callbacks = new Map();
        canStructuredClone === undefined && this.isStructuredCloneSupported();

        // 监听从 Worker 返回的消息
        this.worker.addEventListener('message', event => {
            const {id, type, payload} = event.data;
            const callback = this.callbacks.get(id);

            if (!callback) {
                console.warn(`未知的消息 ID：${id}`);
                return;
            }

            switch (type) {
                case 'SUCCESS':
                    callback.resolve(payload);
                    break;
                case 'ERROR':
                    callback.reject(payload);
                    break;
                default:
                    console.warn('未知的消息类型：', type);
            }

            this.callbacks.delete(id);
        });
    }

    // 发送消息给 Worker
    postMessage(payload) {
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        const message = canStructuredClone ? {id, payload} : JSON.stringify({id, payload})
        this.worker.postMessage(message);
        return new Promise((resolve, reject) => {
            this.callbacks.set(id, {resolve, reject});
        });
    }

    // 关闭 Worker
    terminate() {
        this.worker.terminate();
    }

    // 判断当前浏览器是否支持结构化克隆算法
    isStructuredCloneSupported() {
        try {
            const obj = {data: 'Hello'};
            const clonedObj = window.postMessage ? window.postMessage(obj, '*') : obj;
            return canStructuredClone = clonedObj !== obj;
        } catch (error) {
            // 捕获到异常，说明浏览器不支持结构化克隆
            return canStructuredClone = false;
        }
    }
}
```

在上面的代码中，我们定义了一个名为 `WorkerMessage` 的类，用于向 Worker 发送消息并处理返回结果。在该类的构造函数中，我们首先创建了一个 Worker 实例，并监听了 message 事件。我们使用一个 Map 对象来保存每个消息的回调函数，以便后续能够根据消息 ID 找到对应的回调函数。当从 Worker 返回的消息中包含了 ID 时，我们从 Map 中找到对应的回调函数，并根据消息的类型分别调用 resolve 和 reject 方法。在调用这些方法后，我们需要从 Map 中删除对应的回调函数，以避免内存泄漏。

在 `WorkerMessage` 类中，我们定义了一个 `postMessage` 方法，用于向 Worker 发送消息并处理返回结果。在该方法中，我们首先生成一个唯一的消息 ID，并构造了要发送给 Worker 的消息。然后我们使用 worker.postMessage 方法发送该消息，并返回一个 Promise 对象，以便业务层进行异步处理。在该 `Promise` 对象中，我们使用 callbacks.set 方法将该消息 ID 和对应的回调函数保存到 Map 中。

在 `WorkerMessage` 类中，我们还定义了一个 `terminate` 方法，用于关闭 Worker 实例。该方法会调用 `worker.terminate` 方法来关闭 Worker。

同时，我们使用 `isStructuredCloneSupported` 方法判断当前浏览器or环境是否支持结构化克隆，以外部 `canStructuredClone` 进行标记，并只在对象首次实例化的时候进行复制。如果当前浏览器不支持结构化克隆，则`postMessage`使用`JSON.stringify`转换成字符串。


### 子进程封装类const res = this.config[type](canStructuredClone ? payload.payload : JSON.parse(payload.payload));

```js
export class childMessage {
    constructor(self, config) {
        this.self = self;
        this.config = config;
    }

    // 监听从主线程传来的消息
    addEventListener(callback) {
        this.self.addEventListener('message', event => {
            const {id, payload} = event.data;
            const {type} = payload;
            try {
                const res = this.config[type](canStructuredClone ? payload.payload : JSON.parse(payload.payload));
                if (res instanceof Promise) {
                    res.then(data => {
                        this.self.postMessage({
                            id,
                            type: 'SUCCESS',
                            payload: canStructuredClone ? data : JSON.stringify(data)
                        });
                    }).catch(e => {
                        this.self.postMessage({id, type: 'ERROR', payload: e.toString()});
                    });
                } else {
                    this.self.postMessage({
                        id,
                        type: 'SUCCESS',
                        payload: canStructuredClone ? res : JSON.stringify(res)
                    });
                }
            } catch (e) {
                this.self.postMessage({id, type: 'ERROR', payload: e.toString()});
            } finally {
                callback?.();
            }
        });
    }
}
```

这个子进程消息传递的类，通过监听主线程发送的消息，并使用传入的 `config` 对象处理不同类型的消息，主进程通过指定执行函数的type，由worker来调用制定的函数。其中，`callback` 参数是一个可选的回调函数，在处理完一条消息后可以执行。其中`addEventListener(callback)`通过添加一个消息监听器，接收一个回调函数作为参数。在这个方法中，通过调用 `addEventListener` 方法，监听主线程发送过来的消息。然后对收到的消息进行处理，并将处理结果返回给主线程。如果结果是一个 Promise，则使用 `then` 方法处理异步结果，并将结果发送给主线程。如果结果是一个普通值，则直接将结果发送给主线程。在处理完一条消息后，会执行可选的 `callback` 回调函数。

同时也使用了`canStructuredClone`，如果浏览器支持结构化克隆（structured clone）算法，则直接将 payload 传给处理函数。否则，将 `payload` 进行 JSON 转换，并将其传给处理函数。

## 使用案例

### 主进程

```js
// 创建一个 WorkerMessage 实例，并指定要加载的 Worker 文件路径
import {WorkerMessage} from "../index.js";

console.log('WorkerMessage start')

const worker = new WorkerMessage('./worker.js');

// 发送一个消息给 Worker，并处理返回结果
worker.postMessage({type: 'CALCULATE', payload: 10}).then(
    result => {
        console.log('计算结果：', result);
    },
    error => {
        console.error('计算出错：', error);
    }
);

// 关闭 Worker 实例
// worker.terminate();

worker.postMessage({type: 'PLUS', payload: 10}).then(
    result => {
        console.log('计算结果：', result);
    },
    error => {
        console.error('计算出错：', error);
    }
);


```

#### worker.js worker进程

```js
import {childMessage} from "../index.js";

// 执行计算的函数
function doCalculate(num) {
    // 这里可以执行一些复杂的计算任务
    return num * 2;
}

function doPlus(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num + 1);
        }, 1000);
    });
}

const child = new childMessage(self, {
    CALCULATE: doCalculate,
    PLUS: doPlus
});

// 起到分发执行的效果
child.addEventListener(()=>{
    console.log('worker is listened');
});
```

### 输出

![image-20230420130706140](https://fs.lwmc.net/uploads/2023/04/1681967227502-202304201307354.webp)

[Web Worker 常见使用问题和解决方案](/posts/JavaScript/Web%20Woker%20%E5%B8%B8%E8%A7%81%E4%BD%BF%E7%94%A8%E9%97%AE%E9%A2%98%E5%92%8C%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/)