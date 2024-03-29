---
date: 2022-08-17
category:
- TypeScript
---

# TypeScript 笔记

**:star:PS: 本内容不能作为入门学习使用，仅用于补充完善我个人对TS的知识点**

> TypeScript是拥有类型的JavaScript超集，它可以编译成普通、干净、完整的JavaScript代码

## 理解

- 我们可以将TypeScript理解成加强版的JavaScript。
- JavaScript所拥有的特性，TypeScript全部都是支持的，并且它紧随ECMAScript的标准，所以ES6、ES7、ES8等新语法标准，它都是 支持的；
- 并且在语言层面上，不仅仅增加了类型约束，而且包括一些语法的扩展，比如枚举类型（Enum）、元组类型（Tuple）等；
- 并且TypeScript最终会被编译成JavaScript代码，所以你并不需要担心它的兼容性问题，**在编译时也不需要借助于Babel这样的工具；**

![image-20220409131819866](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204091318973.png)

## 类型

- number

- boolean

- string

- Array

- Object

- Symbol

- null

- undefined

- any

- unknown ：是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量。

- void：也就是函数可以返回null或者undefined

- never：是一个死循环或者抛出一个异常

- tuple元组：

  数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中。（可以放在对象或者元组 中）

  元组中每个元素都有自己特性的类型，根据索引值获取到的值可以确定对应的类型；

### 匿名函数的参数

匿名函数与函数声明会有一些不同：

- 当一个函数出现在TypeScript可以确定该函数会被如何调用的地方时；该函数的参数会自动指定类型；

```ts
const names = ["a", "b"];
names.forEach(item => {
    console.log(item.toUpperCase());
});
```

我们并没有指定item的类型，但是item是一个string类型：

- 这是因为TypeScript会根据forEach函数的类型以及数组的类型推断出item的类型；

- 这个过程称之为上下文类型（contextual typing），因为函数执行的上下文可以帮助确定参数和返回值的类型；

### 联合类型

我们来使用第一种组合类型的方法：联合类型（Union Type）

- 联合类型是由两个或者多个其他类型组成的类型；
- 表示可以是这些类型中的任何一个值；
- 联合类型中的每一个类型被称之为联合成员（union's members）；

```ts
function printID(id: string | number) {
    console.log(id);
}
```

**使用联合类型**

但是我们拿到这个值之后，我们应该如何使用它呢？因为它可能是任何一种类型。比如我们拿到的值可能是string或者number，我们就不能对其调用string上的一些方法；

**使用缩小（narrow）联合**

TypeScript可以根据我们缩小的代码结构，推断出更加具体的类型；

```ts
function printID(id: string | number) {
    if (typeof id === 'string') {
        console.log(id.toUpperCase())
    } else {
        console.log(id)
    }
}
```

**可选类型补充**

可选类型可以看做是 类型 和 undefined 的联合类型：

```ts
function print(message?: string) {
    console.log(message)
}

print(null) //Argument of type 'null' is not assignable to parameter of type 'string | undefined'.
```

### 类型别名

在前面，我们通过在类型注解中编写 对象类型 和 联合类型，但是当我们想要多次在其他地方使用时，就要编写多 次。

比如我们可以给对象类型起一个别名：

```ts
// type用于定义类型别名(type alias)
type IDType = string | number | boolean
type PointType = {
  x: number
  y: number
  z?: number
}

function printId(id: IDType) {}

function printPoint(point: PointType) {}
```

### 类型断言as

有时候TypeScript无法获取具体的类型信息，这个我们需要使用类型断言（Type Assertions）

比如我们通过 document.getElementById，TypeScript只知道该函数会返回 HTMLElement ，但并不知道它 具体的类型：

```ts
// 1.类型断言 as
const el = document.getElementById("why") as HTMLImageElement
el.src = "url地址"


// 2.另外案例: Person是Student的父类
class Person {

}

class Student extends Person {
  studying() {

  }
}

function sayHello(p: Person) {
  (p as Student).studying()
}

const stu = new Student()
sayHello(stu)
```

TypeScript只允许类型断言转换为 更具体 或者 不太具体 的类型版本，此规则可防止不可能的强制转换：

```ts
const message = "Hello World"
const num: number = (message as unknown) as number
```

### 非空类型断言 !

非空断言使用的是 ! ，表示可以确定某个标识符是有值的，跳过ts在编译阶段对它的检测；

```ts
// message? -> undefined | string
function printMessageLength(message?: string) {
  // if (message) {
  //   console.log(message.length)
  // }
  // vue3源码
  console.log(message!.length)
}

printMessageLength("aaaa")
printMessageLength("hello world")
```

### 可选链的使用

可选链事实上并不是TypeScript独有的特性，它是ES11（ES2020）中增加的特性：

可选链使用可选链操作符 ?.；它的作用是当对象的属性不存在时，会短路，直接返回undefined，如果存在，那么才会继续执行；虽然可选链操作是ECMAScript提出的特性，但是和TypeScript一起使用更版本；

```ts
type Person = {
  name: string
  friend?: {
    name: string
    age?: number,
    girlFriend?: {
      name: string
    }
  }
}

const info: Person = {
  name: "why",
  friend: {
    name: "kobe",
    girlFriend: {
      name: "lily"
    }
  }
}


// 另外一个文件中
console.log(info.name)
// console.log(info.friend!.name)
console.log(info.friend?.name)
console.log(info.friend?.age)
console.log(info.friend?.girlFriend?.name)
```

### ??和!!的作用

**!!操作符：**

- 将一个其他类型转换成boolean类型；
- 类似于Boolean(变量)的方式；

**??操作符：**

- 它是ES11增加的新特性；**空值合并操作符（??）是一个逻辑操作符，当操作符的左侧是 null 或者 undefined 时，返回其右侧操作数， 否则返回左侧操作数；**

```ts
let message: string|null = "Hello World"

const content = message ?? "你好啊, 李银河"
// const content = message ? message: "你好啊, 李银河"
console.log(content)
```

### 字面量类型

默认情况下单独使用是没有太大的意义的，但是我们可以将多个类型联合在一起

```ts
// "Hello World"也是可以作为类型的, 叫做字面量类型
const message: "Hello World" = "Hello World"

// let num: 123 = 123
// num = 321


// 字面量类型的意义, 就是必须结合联合类型
type Alignment = 'left' | 'right' | 'center'

let align: Alignment = 'left'
align = 'right'
align = 'center'
```

**字面量推理**

```ts
// const info = {
//   name: "why",
//   age: 18
// }

// info.name = "kobe"

// 

type Method = 'GET' | 'POST'
function request(url: string, method: Method) {}

type Request = {
  url: string,
  method: Method
}
// 方法一
const options = {
  url: "https://www.coderwhy.org/abc",
  method: "POST"
} as const

request(options.url, options.method)

// 方法二
const options = {
    url: "https://www.coderwhy.org/abc",
    method: "POST"
}

request(options.url, options.method as 'GET')
```

### 类型缩小

在给定的执行路径中，我们可以缩小比声明时更小的类型，这个过程称之为 缩小;而我们编写的 typeof padding === "number 可以称之为 类型保护（type guards）；

常见的类型保护有如下几种：

- typeof
- 平等缩小（比如===、!==）
- instanceof
- in
- 等等...

```ts
// 1.typeof的类型缩小
type IDType = number | string
function printID(id: IDType) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}

// 2.平等的类型缩小(=== == !== !=/switch)
type Direction = "left" | "right" | "top" | "bottom"
function printDirection(direction: Direction) {
  // 1.if判断
  // if (direction === 'left') {
  //   console.log(direction)
  // } else if ()

  // 2.switch判断
  // switch (direction) {
  //   case 'left':
  //     console.log(direction)
  //     break;
  //   case ...
  // }
}

// 3.instanceof
function printTime(time: string | Date) {
  if (time instanceof Date) {
    console.log(time.toUTCString())
  } else {
    console.log(time)
  }
}

class Student {
  studying() {}
}

class Teacher {
  teaching() {}
}

function work(p: Student | Teacher) {
  if (p instanceof Student) {
    p.studying()
  } else {
    p.teaching()
  }
}

const stu = new Student()
work(stu)

// 4. in
type Fish = {
  swimming: () => void
}

type Dog = {
  running: () => void
}

function walk(animal: Fish | Dog) {
  if ('swimming' in animal) {
    animal.swimming()
  } else {
    animal.running()
  }
}

const fish: Fish = {
  swimming() {
    console.log("swimming")
  }
}

walk(fish)
```

### TypeScript函数类型

```ts
// 1.函数作为参数时, 在参数中如何编写类型
function foo() {}

type FooFnType = () => void
function bar(fn: FooFnType) {
  fn()
}

bar(foo)

// 2.定义常量时, 编写函数的类型
type AddFnType = (num1: number, num2: number) => number
const add: AddFnType = (a1: number, a2: number) => {
  return a1 + a2
}
```

案例

```ts
function calc(n1: number, n2: number, fn: (num1: number, num2: number) => number) {
  return fn(n1, n2)
}

const result1 = calc(20, 30, function(a1, a2) {
  return a1 + a2
})
console.log(result1)

const result2 = calc(20, 30, function(a1, a2) {
  return a1 * a2
})
console.log(result2)
```

### this类型

TypeScript进行类型检测的目的是让我们的代码更加的安全，会去推导使用的this是否安全合法。

## 重载

### 函数的重载

在TypeScript中，如果我们编写了一个add函数，希望可以对字符串和数字类型进行相加，应该如何编写呢？

```ts
// 函数的重载: 函数的名称相同, 但是参数不同的几个函数, 就是函数的重载
function add(num1: number, num2: number): number; // 没函数体
function add(num1: string, num2: string): string;

function add(num1: any, num2: any): any {
  if (typeof num1 === 'string' && typeof num2 === 'string') {
    return num1.length + num2.length
  }
  return num1 + num2
}

const result = add(20, 30)
const result2 = add("abc", "cba")
console.log(result)
console.log(result2)

// 在函数的重载中, 实现函数是不能直接被调用的
// add({name: "why"}, {age: 18})

export {}
```

### 联合类型和重载

我们现在有一个需求：定义一个函数，可以传入字符串或者数组，获取它们的长度。

这里有两种实现方案：

```ts
// 实现方式一: 联合类型
function getLength(args: string | any[]) {
    return args.length
}


// 实现方式二: 函数的重载
function getLength(args: string): number;
function getLength(args: any[]): number;

function getLength(args: any): number {
  return args.length
}
```

## 类的使用

### getters/setters

在前面一些私有属性我们是不能直接访问的，或者某些属性我们想要监听它的获取(getter)和设置(setter)的过程， 这个时候我们可以使用存取器。

```ts
class Person {
  private _name: string
  constructor(name: string) {
    this._name = name
  }

  // 访问器setter/getter
  // setter
  set name(newName) {
    this._name = newName
  }
  // getter
  get name() {
    return this._name
  }
}

const p = new Person("why")
p.name = "coderwhy"
console.log(p.name)
```

### 静态成员

前面我们在类中定义的成员和方法都属于对象级别的, 在开发中, 我们有时候也需要定义类级别的成员和方法。在TypeScript中通过关键字static来定义：

```ts
class Student {
  static time: string = "20:00"

  static attendClass() {
    console.log("去学习~")
  }
}

console.log(Student.time)
Student.attendClass()
```

### 抽象类abstract

在TypeScript中没有具体实现的方法(没有方法体)，就是抽象方法

```ts

function makeArea(shape: Shape) {
  return shape.getArea()
}


abstract class Shape {
  abstract getArea(): number
}


class Rectangle extends Shape {
  private width: number
  private height: number

  constructor(width: number, height: number) {
    super()
    this.width = width
    this.height = height
  }

  getArea() {
    return this.width * this.height
  }
}

class Circle extends Shape {
  private r: number

  constructor(r: number) {
    super()
    this.r = r
  }

  getArea() {
    return this.r * this.r * 3.14
  }
}

const rectangle = new Rectangle(20, 30)
const circle = new Circle(10)

console.log(makeArea(rectangle))
console.log(makeArea(circle))
```

### 类的类型

类本身也是可以作为一种数据类型的：

```ts
class Person {
  name: string = "123"
  eating() {

  }
}

const p = new Person()

const p1: Person = {
  name: "why",
  eating() {

  }
}

function printPerson(p: Person) {
  console.log(p.name)
}

printPerson(new Person())
printPerson({name: "kobe", eating: function() {}})

export {}
```

### 可选属性 只读属性

```ts
// 通过类型(type)别名来声明对象类型
// type InfoType = {name: string, age: number}

// 另外一种方式声明对象类型: 接口interface
// 在其中可以定义可选类型
// 也可以定义只读属性
interface IInfoType {
  readonly name: string
  age: number
  friend?: {
    name: string
  }
}

const info: IInfoType = {
  name: "why",
  age: 18,
  friend: {
    name: "kobe"
  }
}

console.log(info.friend?.name)
console.log(info.name)
// info.name = "123"
info.age = 20

```

### 索引类型

前面我们使用interface来定义对象类型，这个时候其中的属性名、类型、方法都是确定的，但是有时候我们会遇 到类似下面的对象：

```ts
// 通过interface来定义索引类型
interface IndexLanguage {
  [index: number]: string
}

const frontLanguage: IndexLanguage = {
  0: "HTML",
  1: "CSS",
  2: "JavaScript",
  3: "Vue"
}


interface ILanguageYear {
  [name: string]: number
}

const languageYear: ILanguageYear = {
  "C": 1972,
  "Java": 1995,
  "JavaScript": 1996,
  "TypeScript": 2014
}
```

### 函数类型

```ts
// type CalcFn = (n1: number, n2: number) => number
// 可调用的接口
interface CalcFn {
  (n1: number, n2: number): number
}

function calc(num1: number, num2: number, calcFn: CalcFn) {
  return calcFn(num1, num2)
}

const add: CalcFn = (num1, num2) => {
  return num1 + num2
}

calc(20, 30, add)
```

除非特别的情况，还是推荐大家使用类型别名来定义函数：

```ts
type CalcFunc = (nums1: number, num2: number) => number
```

### 接口继承

接口和类一样是可以进行继承的，也是使用extends关键字：

并且我们会发现，接口是支持多继承的**（类不支持多继承）**

```ts
interface ISwim {
  swimming: () => void
}

interface IFly {
  flying: () => void
}


interface IAction extends ISwim, IFly {

}

const action: IAction = {
  swimming() {

  },
  flying() {
    
  }
}
```

### 接口的实现

接口定义后，也是可以被类实现的：

- 如果被一个类实现，那么在之后需要传入接口的地方，都可以将这个类传入；
- 这就是面向接口开发；

```ts
class Animal {
  
}

// 继承: 只能实现单继承
// 实现: 实现接口, 类可以实现多个接口
class Fish extends Animal implements ISwim, IEat {
  swimming() {
    console.log("Fish Swmming")
  }

  eating() {
    console.log("Fish Eating")
  }
}


class Person implements ISwim {
  swimming() {
    console.log("Person Swimming")
  }
}


// 编写一些公共的API: 面向接口编程
function swimAction(swimable: ISwim) {
  swimable.swimming()
}

// 1.所有实现了接口的类对应的对象, 都是可以传入
swimAction(new Fish())
swimAction(new Person())


swimAction({swimming: function() {}})
```

### 交叉类型

另外一种类型合并，就是交叉类型（Intersection Types）：

交叉类似表示需要满足多个类型的条件，交叉类型使用 & 符号；

```ts
// 一种组合类型的方式: 联合类型
type WhyType = number | string
type Direction = "left" | "right" | "center"


// 另一种组件类型的方式: 交叉类型
type WType = number & string

interface ISwim {
  swimming: () => void
}

interface IFly {
  flying: () => void
}

type MyType1 = ISwim | IFly
type MyType2 = ISwim & IFly // 需要同时实现

const obj1: MyType1 = {
  flying() {

  }
}

const obj2: MyType2 = {
  swimming() {

  },
  flying() {
    
  }
}
```

### 枚举类型

 枚举类型是为数不多的TypeScript特性有的特性之一：

- 枚举其实就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型；
- 枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型；

**枚举类型的值**

枚举类型默认是有值的，比如上面的枚举，默认值是这样的:

```ts
enum Direction {
  LEFT = 0,
  RIGHT = 1,
  TOP = 2,
  BOTTOM = 3
}
```

代码：

```ts 
// type Direction = "left" | "Right" | "Top" | "Bottom"

enum Direction {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM"
}

let name: string = "abc"
let d: Direction = Direction.BOTTOM

function turnDirection(direction: Direction) {
  console.log(direction)
  switch (direction) {
    case Direction.LEFT:
      console.log("改变角色的方向向左")
      break;
    case Direction.RIGHT:
      console.log("改变角色的方向向右")
      break;
    case Direction.TOP:
      console.log("改变角色的方向向上")
      break;
    case Direction.BOTTOM:
      console.log("改变角色的方向向下")
      break;
    default:
      const foo: never = direction;
      break;
  }
}

turnDirection(Direction.LEFT)
turnDirection(Direction.RIGHT)
turnDirection(Direction.TOP)
turnDirection(Direction.BOTTOM)
```

### 泛型

软件工程的主要目的是构建不仅仅明确和一致的API，还要让你的代码具有很强的可重用性：

- 比如我们可以通过函数来封装一些API，通过传入不同的函数参数，让函数帮助我们完成不同的操作；但是对于参数的类型是否也可以参数化。

**什么是类型的参数化？**

封装一个函数，传入一个参数，并且返回这个参数；

TS通过类型推到，自动推到出我们传入变量的类型

```ts
// 在定义这个函数时, 我不决定这些参数的类型
// 而是让调用者以参数的形式告知,我这里的函数参数应该是什么类型
function sum<Type>(num: Type): Type {
  return num
}

// 1.调用方式一: 明确的传入类型
sum<number>(20)
sum<{name: string}>({name: "why"})
sum<any[]>(["abc"])

// 2.调用方式二: 类型推到
sum(50)
sum("abc")
```

**平时在开发中我们可能会看到一些常用的名称：**

T：Type的缩写，类型

K、V：key和value的缩写，键值对

E：Element的缩写，元素

O：Object的缩写，对象

```ts
function foo<T, E, O>(arg1: T, arg2: E, arg3?: O, ...args: T[]) {

}

foo<number, string, boolean>(10, "abc", true)
```

### 泛型接口

在定义接口的时候我们也可以使用泛型：

```ts
interface IPerson<T1 = string, T2 = number> {
  name: T1
  age: T2
}

const p: IPerson = {
  name: "why",
  age: 18
}
```

### 泛型类

```ts
class Point<T> {
  x: T
  y: T
  z: T

  constructor(x: T, y: T, z: T) {
    this.x = x
    this.y = y
    this.z = y
  }
}

const p1 = new Point("1.33.2", "2.22.3", "4.22.1")
const p2 = new Point<string>("1.33.2", "2.22.3", "4.22.1")
const p3: Point<string> = new Point("1.33.2", "2.22.3", "4.22.1")

const names1: string[] = ["abc", "cba", "nba"]
const names2: Array<string> = ["abc", "cba", "nba"] // 不推荐(react jsx <>)
```

### 泛型约束

有时候我们希望传入的类型有某些共性，但是这些共性可能不是在同一种类型中：

- 比如string和array都是有length的，或者某些对象也是会有length属性的；
- 那么只要是拥有length的属性都可以作为我们的参数类型，那么应该如何操作呢？

```ts
interface ILength {
  length: number
}

function getLength<T extends ILength>(arg: T) {
  return arg.length
}

getLength("abc")
getLength(["abc", "cba"])
getLength({length: 100})
```

##  模块化开发

TypeScript支持两种方式来控制我们的作用域：

- 模块化：每个文件可以是一个独立的模块，支持ES Module，也支持CommonJS；
- 命名空间：通过namespace来声明一个命名空间

![image-20220411214442768](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204112144853.png)

### 命名空间namespace

命名空间在TypeScript早期时，称之为内部模块，主要目的是将一个模块内部再进行作用域的划分，防止一些命名 冲突的问题。

![image-20220411214531141](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204112145215.png)
