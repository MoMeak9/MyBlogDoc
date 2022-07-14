---
date: 2022-06-21
category:
- 牛客网刷题
---

# JavaScript刷题【错题本】

1. AMD和CMD都是浏览器端的js模块化规范，分别由require.js和sea.js实现。 CommonJS是服务器端的js模块化规范，由NodeJS实现。

2. (()=>{}).length; 获取方法形参个数，形参为0

3. +[] 隐式类型转换，因为[]是对象，所以toPrimitive->valueOf->toString为''，结果就是+''===0

4. 阻止默认事件：

   e.preventDefault()

   e.returnValue = false (IE)

   阻止冒泡：

   e.stopPropagation()

   e.cancelBubble = true (IE)

5. 虽然在绝大多数编程语言中，0是不能作为分母，但在js中，0是可以作分母的，0/0的结果为NaN，并不会抛出异常，因此会执行try块中所有代码

6. readystatechange 读取状态变化

   pageshow 页面展示

   beforeunload 页面退出

   DOMContentLoaded dom内容加载完成

7. **模块查找顺序：**

   (1):首先，Node在当前目录下查找package.json(CommonJS包规范定义的包描述文件)，通过JSON.parse()解析出包描述对象，从中取出main属性指定的文件名进行定位。如果文件缺少扩展名，将会进入扩展名分析的步骤。 　　

   (2):而如果main属性制定的文件名错误，或者压根没有package.json文件，Node会将index当做默认文件名，然后依次查找index.js、index.node、index.json. 　　

   (3):如果在目录分析的过程中没有定位成功任何文件，则自定义模块进入下一个模块路径进行查找。如果模块路径数组都被遍历完毕，依然没有查找到目标文件，则会抛出查找失败异常。 　　

   按照上面的思路，首先应该查找package.json文件，看看里面有没有核心模块，应该是C最先，othermodule不是核心模块，那么接着应该进入扩展名分析的步骤，就应该是查找othermodule. js，对应B，紧接着就是以index为默认文件名，也就是A，再接下来就是上一个文件目录D了，

8. JavaScript的全局函数:

   decodeURI() 解码某个编码的 URI。

   decodeURIComponent() 解码一个编码的 URI 组件。

   encodeURI() 把字符串编码为 URI。

   encodeURIComponent() 把字符串编码为 URI 组件。

   escape() 对字符串进行编码。

   eval() 计算 JavaScript 字符串，并把它作为脚本代码来执行。

   isFinite() 检查某个值是否为有穷大的数。

   isNaN() 检查某个值是否是数字。

   Number() 把对象的值转换为数字。

   parseFloat() 解析一个字符串并返回一个浮点数。

   parseInt() 解析一个字符串并返回一个整数。

   String() 把对象的值转换为字符串。

   unescape() 对由 escape() 编码的字符串进行解码

   **setTimeout 是 DOM 提供的函数**

9. document对象方法

10. window对象方法

11. parseInt() 函数可解析一个字符串，并返回一个整数。所以说，number类型的12.34发生隐式转换为string。

12. 关于立即执行函数：

    ```js
    (function add(){
        add = 100;//此行代码作废，无效，因为此行代码的意思是要修改函数名，此处是立即执行函数，不允许被修改！
        console.log(add);
    })();
    ```

    ```js
    (function (){
        a = 100;// 此时的a成为全局变量，挂在到window上！
        console.log(a);
    })();
    console.log(a);//100
    ```

    ```js
    var add = 1;
    function add(){
        add = 2;
        console.log(add);//2
    }
    add();//
    ```

    ```js
    var a = 1;
    function add(a=2){  
       console.log(a);//2  这地方的a在预解析变量声明提升处理完成后，最后一步会把同名的参数a的值2，赋值给变量a
       var a = 3;
       console.log(a);//3
    
    }
    add();
    console.log(a)//1 
    ```

13. ES6中的类可以视为ES5中构造函数的另一种写法，所以`typeof` `Phone`的输出结果为function而不是Object

14. 下面哪些方法可以用于JavaScript 异步模式的编程？

    回调函数，这是异步编程最基本的方法。
    事件监听，另一种思路是采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。
    发布/订阅，上一节的"事件"，完全可以理解成"信号"。
    Promises对象，Promises 对象是CommonJS 工作组提出的一种规范，目的是为异步编程提供统一接口。

15. **ES5:**

    orEach(), filter(), reduce(), every() 和some()都会跳过空位。

    map()会跳过空位，但会保留这个值

    join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

    **ES6 中都会将空位当做undefined**

16. 类型隐式转换：

    参照左侧转换为右侧

17. Referer是request Header里的内容，不是response header里的内容

18. preventDefault()    取消事件默认行为，如阻止点击提交按钮时对表单的提交（本题中click并没有什么默认行为）
    stopImmediatePropagation()   取消事件冒泡同时阻止当前节点上的事件处理程序被调用，影响当前的事件

    stopPropagation()   取消事件冒泡，不影响事件

    cancelBubbe()     取消事件冒泡

    returnValue()      取消事件默认行为

19. a标签不能套a标签，p标签不能套块标签

20. B选项输出值为0是因为forEach方法在数组元素为空时会跳过执行回调函数，相当于此选项回调函数并未执行，所以还是输出0。
