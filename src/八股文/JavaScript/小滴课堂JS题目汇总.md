---
date: 2022-06-29
category:
- 前端
- JavaScript
---
# 小滴课堂JS题目汇总

### 第四章 应聘大厂工程师的编程语言JavaScript了解多少《上》

#### 你知道JS的事件循环机制吗？

**简介：剖析JS事件循环**

- 难度【***】

- JavaScript语言

  - 是一门**单线程**的**非阻塞**的脚本语言

    - 为什么 JS 是一门单线程的语言？

      ```
      因为在浏览器中，需要对各种的DOM操作；
      当JS是多线程的话，如果有两个线程同时对同一个DOM进行操作，一个是在这个DOM上绑定事件，另外一个是删除该DOM，此时就会产生歧义
      因此为了保证这种事情不会发生，所以JS以单线程来执行代码，保证了一致性
      ```

    - JS 非阻塞应该如何理解？

      ```
      当JS代码从上往下执行，遇到需要进行一项异步任务的时候，
      主线程会挂起这个任务，继续往下执行代码，然后在异步任务返回结果的时候再根据一定规则去执行
      ```

      思考：那么这个非阻塞是如何实现的呢？此时就需要用到事件循环（event loop）

  - 事件循环

    <img src="https://cdn.yihuiblog.top/images/202206292132167.png" alt="image-20220222182348608" style="zoom:150%;" />

    - 结合代码分析事件循环

    ```js
    // 同步任务
    console.log('首次同步任务开始');
    
    // 异步任务（宏任务）
    setTimeout(() => {
      console.log('setTimeout 1');
      new Promise((resolve) => {
        console.log('Promise1');
        resolve();
      }).then(() => {
        console.log('Promise then 1');
      });
    }, 1000);
    
    // 同步任务
    console.log('首次同步任务结束');
    
    // 异步任务（微任务）
    new Promise((resolve) => {
      console.log('Promise2');
      resolve();
    }).then(() => {
      console.log('Promise then 2');
    });
    ```

    - 异步任务分类：宏任务（setTimeout），微任务（promise）
    - 所有同步任务都在主线程上执行，形成一个执行栈
    - 遇到异步任务放到任务表中，等事件执行完成（ajax请求完成、setTimeout设置时间到期），之后放入到任务队列
    - 当执行栈的同步任务执行完成之后，就会执行任务队列的第一个异步任务，其中把宏观任务和微观任务都执行完成后才进行下一次循环


#### 你知道深浅拷贝吗？

**简介：剖析深浅拷贝**

- 难度【***】


- 深浅拷贝都是针对复杂类型数据才有的概念，基本类型数据不具备

<img src="https://cdn.yihuiblog.top/images/202206292132166.png" alt="image-20220222190544024" style="zoom:150%;" />

- 浅拷贝

  - 两个引用类型指向同一个地址，改变一个，另一个也会随之改变

    ```js
    var c = { num: 18 };
    var d = c;
    c.num = 20;
    console.log('c:', c, 'd:', d);
    ```

- 深拷贝

  - 复制后引用类型指向一个新的内存地址，两个对象改变互不影响

    ```js
    var c = { num: 18 };
    var d = JSON.parse(JSON.stringify(c))
    c.num = 20;
    console.log('c:', c, 'd:', d);
    ```



- 连环问

  - 基本类型数据的赋值是浅拷贝还是深拷贝？

    ```js
    赋值既不是深拷贝也不是浅拷贝，只是跟深拷贝是类似
    ```

  - 数组的方法：concat、slice是浅拷贝还是深拷贝？

    ```js
    concat、slice对一维数组来说是深拷贝，多维数组的话是浅拷贝
    
    var a = [1, 2, 3];
    var b = [4, 5];
    var ab = a.concat(b);
    a = [2, 3];
    
    console.log(ab);
    ```

#### 你知道JS中new的作用吗？

**简介：关键字new的作用**

难度【**】

- 当没使用new关键字，直接调用构造函数时

  ```js
  // 构造函数内部的this指向的是window
  function Student(obj) {
    this.name = obj.name;
    this.score = obj.score;
    this.grade = obj.grade;
    console.log(this);
  }
  
  var stu1 = Student({
    name: 'Jack',
    score: 88,
    grade: 3,
  });
  console.log(stu1);
  
  // 1.把对象返回了回来
  // 2.把构造函数的this指向了要返回的对象 
  ```

- new 

  - 创建了新空对象 

  - 将构造函数的作用域赋值给新对象(this指向新对象)

  - 执行构造函数代码 （为这个新对象添加属性）

  - 返回新对象

    ```js
    function Student(obj) {
      // this={};
      this.name = obj.name;
      this.score = obj.score;
      this.grade = obj.grade;
      // return this;
    }
    var a = new Student({ name: '1', score: '2', grade: '3' });
    console.log(a);
    ```


#### 说说你对JS中的原型链的理解

**简介：剖析原型链**

难度【***】

- 原型（`prototype`）

  - 是function对象的一个属性，它定义了构造函数制造出的对象的公共祖先，通过该构造函数产生的对象，可以继承该原型的属性和方法，原型也是对象

    ```js
    function Person() {}
    Person.prototype.name = '大钊';
    Person.prototype.a = function () {
      console.log(11);
    };
    
    var person1 = new Person();
    
    console.log(person1.name);
    person1.a();
    ```

  - 作用

    - 构造函数实例化出来的对象可以使用公共的属性或者⽅法


- 函数对象才有`prototype`属性

- 原型链

  - js⾥万物皆对象，所以⼀直访问`__proto__`属性就会产⽣⼀条链条 

  - 链条的尽头是null  (Object.prototype.`__proto__`)

  - 当js引擎查找对象的属性时，会先判断对象本身是否存在该属性 

  - 不存在的属性就会沿着原型链往上找

    <img src="https://cdn.yihuiblog.top/images/202206292132184.png" alt="image-20220222215340646" style="zoom: 50%;" />

    

    ```js
    function Car() {}
    Car.prototype.name = '大钊';
    var car = new Car();
    ```



- 总结

  - 原型主要是解决继承问题
  - 每个对象拥有一个原型对象，通过 `__proto__` 指针指向其原型对象，并从中继承方法和属性
  - 同时原型对象也可能拥有原型，这样一层一层，最终指向 null（Object.proptotype.proto指向的是null）
  - 上述的关系被称为原型链，通过原型链一个对象可以拥有定义在其他对象中的属性和方法


#### 第5集 如何理解JS中的闭包

**简介：剖析闭包**

难度【**】

- 思考一个计数器

  ```js
  // 初始化计数器
  var a = 0;
  
  // 递增计数器的函数
  function add() {
   a++;
   console.log(a)
  }
  
  // 调⽤三次 add()
  add();
  add();
  add();
  ```

- 闭包

  ```js
  function add() {
    var a = 0;
    return function adds() {
      a++;
      console.log(a);
    };
  }
  
  // 调⽤三次 add()
  const xd = add();
  xd();
  xd();
  xd();
  ```

  - 闭包是指有权访问另⼀个函数作⽤域中的变量的函数
  - 实现外界访问函数体内部的变量 

#### 第6集 你知道JS中的执行上下文是什么吗？

**简介：剖析执行上下文**

难度【***】

- 执行上下文

  - JS代码被解析和执行时存在的环境（ECMAscript中定义的抽象概念）

- 类型

  - 全局执行上下文

    - 声明在全局下的变量和函数所处的环境

  - 函数执行上下文

    - 函数每次被调用都会创建新的执行上下文，可以存在任意数量的函数执行上下文

  - eval函数执行上下文

    - 运行在eval函数中的执行上下文（用不到不做讨论）

- 生命周期

  - 创建阶段

    - 创建变量对象：初始化参数、提升函数声明和变量声明

    - 确定this指向

      - 源代码

        ```js
        // 代码执行
        console.log(xd);
        fn();
        
        // 函数定义
        function fn() {
          console.log('你好');
        }
        
        // 变量定义
        var xd = '小滴课堂';
        ```

      - 编译后的代码

        ```js
        // 声明
        function fn(){
        	console.log('你好');
        }
        var xd
        
        console.log(xd);
        fn();
        
        xd = '小滴课堂';
        ```

        

- 执行阶段

  - 变量赋值
    - 代码执行

  - 回收阶段

  - 执行上下文出栈，js自动执行垃圾回收机制

#### JS中的作用域和作用域链是什么？

**简介：剖析作用域**

难度【***】

- 作用域

  - 可访问变量，对象，函数的集合

- 分类

  - 全局作用域

    - 全局变量定义在函数外部，具有全局作用域

  - 函数作用域（局部作用域）

    - 局部变量定义在函数内部，具有局部作用域

  - 块级作用域（ES6的let、const）

    - 在 {} 中使用ES6的let、const方式声明，具有块级作用域

- 代码示例

  ```js
  function A() {
    var a = 'a函数变量';
  
    function B() {
      var b = 'b函数变量';
    }
    B();
  }
  
  var c = '全局变量';
  A();
  ```

- 图解

  <img src="https://cdn.yihuiblog.top/images/202206292132733.png" alt="image-20220223173624476" style="zoom: 80%;" />



- 连环问

  - 执行上下文和作用域有什么区别？ :star:

    ```
    函数定义时，作用域就已经确认了，每次函数调用时与变量的访问有关， 并且每次调用都是独立的
    而执行上下文主要是关键字this的值，这个是由函数运行时决定的，简单来说就是谁调用此函数，this就指向谁
    ```

#### 第8集 你知道改变this指向call/apply/bind的用法吗？

**简介：剖析call/apply/bind**

- 难度【**】


- 用法

  - 三个方法都是改变this指向的

- 思考


  - 情况一

    ```js
    var xd = '小滴课堂';
    function show() {
      console.log(this.xd);
    }
    
    show();  // 小滴课堂
    ```

  - 情况二

    ```js
    var name = '张三';
    var age = '18';
    var obj1 = {
      name: '李四',
      say: function () {
        console.log(this.name + this.age);
      },
    };
    
    obj1.say()		// 李四 + undefined
    ```

  - 两种情况函数里的 this 指向不同，第一个 this 指向 obj，第二个是指向window

- 对比三者的使用

  ```js
  const name = '张三';
  const age = '18';
  const obj1 = {
    name: '李四',
    fun: function () {
      console.log('名字:' + this.name + ' 年龄:' + this.age);
    },
  };
  
  const obj2 = {
    name: '王五',
    age: '19',
  };
  
  obj1.fun.call(obj2);    // 名字:王五 年龄:19
  obj1.fun.apply(obj2);   // 名字:王五 年龄:19
  obj1.fun.bind(obj2)();  // 名字:王五 年龄:19
  ```

- 对比三者的传参

  ```js
  const name = '张三';
  const age = '18';
  const obj1 = {
    name: '李四',
    fun: function (sex, hobby) {
      console.log(
        '名字:' +
          this.name + ' 年龄:' + this.age + ' 性别:' + sex + ' 爱好:' + hobby
      );
    },
  };
  
  const obj2 = {
    name: '王五',
    age: '19',
  };
  
  obj1.fun.call(obj2, '男', '敲代码');     // 名字:王五 年龄:19 性别:男 爱好:敲代码
  obj1.fun.apply(obj2, ['男', '敲代码']);  // 名字:王五 年龄:19 性别:男 爱好:敲代码
  obj1.fun.bind(obj2, '男', '敲代码')();   // 名字:王五 年龄:19 性别:男 爱好:敲代码
  ```


#### 说说JS的回调地狱是什么以及解决

**简介：JS回调地狱**

- 难度【**】

- 回调地狱

  - 为了实现某些逻辑会写出层层嵌套的回调函数，嵌套过多会影响代码的可读性和逻辑，当某个请求失败时难以定位问题，这情况被称为回调地狱

  - 代码示例

    ```js
    getData() {
      axios.get("./mock/data_a.json").then((res1) => {
        console.log(res1.data.code);
        axios.get("./mock/data_b.json").then((res2) => {
          console.log(res2.data.code);
          axios.get("./mock/data_c.json").then((res3) => {
            console.log(res3.data.code);
          });
        });
      });
    },
    ```

  - 通过promise解决

    ```js
    methods:{
      getData1(url) {
        return new Promise((resolve, reject) => {
          axios.get(url).then((res1) => {
            if (res1.data.code <= 1) {
              resolve("成功");
            } else {
              reject("失败");
            }
          });
        });
      },
    }
    
    
    mounted(){
    	this.getData1("./mock/data_a.json")
        .then((res) => {
          console.log(res);
          return this.getData1("./mock/data_b.json");
        })
        .then((res) => {
          console.log(res);
          return this.getData1("./mock/data_c.json");
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    ```

    

  - Promise.all / Promise.race

    ```js
    methods:{
      getData1(url) {
        return new Promise((resolve, reject) => {
          axios.get(url).then((res1) => {
            // if (res1.data.code <= 1) {
            resolve(res1.data.code);
            // } else {
            //   reject("失败");
            // }
          });
        });
      },
    }
    
    mounted(){
      Promise.all([
      this.getData1("./mock/data_a.json"),
      this.getData1("./mock/data_b.json"),
      this.getData1("./mock/data_c.json"),
    ])
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
    ```

    

    

  - async/await解决promise链式调用不够优雅的问题

    ```js
    async getData2() {
      try {
        const res1 = await this.getData1("./mock/data_a.json");
        const res2 = await this.getData1("./mock/data_b.json");
        const res3 = await this.getData1("./mock/data_c.json");
        console.log(res1, res2, res3);
      } catch (err) {
        console.log("err:", err);
      }
    },
    ```

#### 关于ES6法新增了哪些高级用法？

**简介：ES6的几种好用的技巧**

- 难度【*】

- let /const

  - let、const
    - let/const声明的变量只有在当前作用域有效 {}
    - 不存在变量提升
    - 不允许重复声明
  - const
    - 声明的常量不可以改变
    - 声明的常量必须赋值
    - 声明了一个对象，仅仅保证地址不变

  ```js
  1.声明的变量不需要改变，那么使用const
  2.声明的变量需要改变，那么用let
  3.暂时性死区：在声明变量前，使用该变量
  ```

- 模板字符串   `` 

  - 它为JavaScript提供了简单的字符串插值（模板字面量）功能

    ```js
    let name = "小明"
    let age = '18'
    console.log('大家好，我是'+ name + '今年' + age);
    console.log(`大家好, 我是${name}今年${age}`);
    ```

- 箭头函数

  - ```html
    <script>     
      function fun1(a, b) {        
        return a + b  
      }
      var fun2 = (a, b) => a + b;     
      console.log(fun1(1, 2));       
      console.log(fun2(3, 4));   
    </script>
    ```

- 解构赋值

  - 数组

    - ```js
      let [a, b, c] = [1, 2, 3];
      ```

  - 对象

    - ```js
      let {name,age} = {name:'小明',age:18}
      console.log(name,age)//小明,18
      ```

  

- 扩展运算符 `...`

  - ```js
    console.log(...[1, 2, 3]) //1 2 3
    console.log(1, ...[2, 3, 4], 5)  //1 2 3 4 5
    ```

#### 怎么通过JS实现防抖与节流？

**简介：防抖与节流**

- 难度【**】

- 什么是防抖

  - 在事件被触发n秒后再执行回调函数，如果在这n秒内又被触发，则重新计时

    - 用户在输入框中连续输入一串字符后，只会在输入完后去执行最后一次的查询ajax请求，这样可以有效减少请求次数，节约请求资源
    - window的scroll事件，不断地调整浏览器的窗口大小、或者滚动时会触发对应事件，防抖让其只触发一次

  - 实现

    ```js
    handleClick() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log(111);
      }, 1000);
    },
    ```

- 什么是节流

  - 规定一个单位时间，只能有一次触发事件的回调函数执行，如果在同一时间内某事件被触发多次，只有一次能生效

    - 鼠标连续不断地触发某事件（如点击），按照设置的时间来逐次执行；
    - 在页面的无限加载场景下，当用户频繁滚动页面时，每隔一段时间才发一次请求展示数据，而不是按照用户滚动次数来请求数据

  - 实现

    ```js
    handleClick() {
      if (this.isRun) {
        return;
      }
      this.isRun = true;
      setTimeout(() => {
        this.isRun = false;
        console.log(111);
      }, 1000);
    },
    ```



#### 关于JS的设计模式了解多少？

**简介：设计模式**

- 难度【***】

- 单例模式

  - 确保一个类仅有一个实例，并提供一个访问它的全局访问点

    ```js
    class Car {
      constructor(name) {
        this.name = name;
      }
      drive() {
        console.log('启动');
      }
    }
    
    Car.singleInstance = (function () {
      let instance;
      return function (name) {
        if (!instance) {
          instance = new Car(name);
        }
        return instance;
      };
      })();
    var benchi = Car.singleInstance('benchi');
    var baoma = Car.singleInstance('baoma');
    ```

  - 应用场景

    - 网站的登录页
    - 购物车
    - vuex

- 工厂模式

  - 工厂模式就是把实现相同功能写在函数中，需要实现相同逻辑的地方直接调用函数，减少代码重复

    ```js
    function createCar(name,age){
       var obj = {}
       obj.brand = name,
       obj.color = age,
       obj.sayHelllo = function(){
        console.log('你好，小滴课堂')
      }
      return obj;
    }
    
    const car1 = createCar('宝马','白色')
    const car2 = createCar('奔驰','黑色')
    ```


> 补充设计模式汇总 >
