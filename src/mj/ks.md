# 快手暑期实习生面经合集

## **前端研发实习生（Docs）-协同办公中心** 


```js
import axios from 'axios'

const server = axios.create({})

export default async function (url, data) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject('Time out')
        }, 10000)
        server.request({
            method: 'get',
            url,
            data
        }).then((res) => {
            clearInterval(timer)
            resolve(res)
        })
    })
}
```

### 一面 45min

面试官迟到了，然后看简历，边看边解答一些问题

看到了Node.js 和TS，噩梦开始了

1. 我看你写Node的Web挺多的，我们来写个中间件吧？express的跨域中间件（手撕）

2. （打断）顺便问一下跨域怎么理解的？什么是跨域？

3. （打断）我很疑惑你为啥写了(req.method=="OPTIONS") 可以解释一下吗（我按照模板写的啊！）

4. 那问你一下PUT方法（提了一下RESTFUL）

5. 那我们现在来基于Vue实现一个吸顶组件，不用手撕

6. 那除了使用CSS的position: sticky 使用原生JS如何实现？（不会）

7. TS了解多少，怎么用的？怎么理解泛型？

8. 面向对象编程了解过吗？使用过React吗？画风一转至Vue不需要，React有类型组件

9. 手撕封装axios的get的请求，要求10s后reject，不用基础超时配置项怎么写？（手撕）

10. 那我们再来一个输出题（就考了异常，没有事件循环）

    尝试还原了一下，提了一下原型链

    ```js
    function a() {
        console.error("a")
    }
    
    function b() {
        throw 'b'
    }
    
    async function c() {
        this.c = 'c'
        function hello() {
            console.log('c')
        }
    }
    
    // 分别输出什么，一起会输出什么 b在程序中会？
    c.haha()
    b()
    a()
    ```

11. 反问业务场景和技术栈（时间充裕）

12. 被评价为前端发烧友，说面的问题接近社招了

结束，主动权大部分在我这里，我来主动扩展说明，所以面试问的很少
