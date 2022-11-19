---
date: 2022-08-28
category:
- 面试题
- 前端
- TypeScript
---

# TypeScript 面试专题

## interface 与 type 异同点

这可能是最经典的一道 TS 面试题了，因此这里我们放在第一个知识点来讲解。

### 及格线

不论如何，以下这些概念是你需要基本了解的，否则很容易被怀疑是否真的深入使用过 TypeScript 。

- 在对象扩展情况下，interface 使用 extends 关键字，而 type 使用交叉类型（`&`）。
- 同名的 interface 会自动合并，并且在合并时会要求兼容原接口的结构。
- interface 与 type 都可以描述对象类型、函数类型、Class 类型，但 interface 无法像 type 那样表达元组、一组联合类型等等。
- interface 无法使用映射类型等类型工具，也就意味着在类型编程场景中我们还是应该使用 type 。

### 优秀回答

只是回答这些概念定义显得过于枯燥，而且很容易被认为像是在背书，因此你可以穿插自己在工程中的实践， 比如小册中提过的，使用 interface 来定义对象类型，使用类型别名来处理函数签名、联合类型、工具类型等等。这同样也代表了你对这两个工具的理解：**interface 就是描述对象对外暴露的接口，其不应该具有过于复杂的类型逻辑，最多局限于泛型约束与索引类型这个层面。而 type alias 就是用于将一组类型的重命名，或是对类型进行复杂编程。**

另外，你也可以提到在官方的 Wiki 中，特别说明了在对象扩展的情况下，使用接口继承要比交叉类型的性能更好。

## 类型兼容性比较

这一问题主要考察你是否了解 TypeScript 类型系统的基本工作原理，以及使用的深入程度。因为通常来说，只有具有一定经验的使用者才会开始了解类型兼容性的相关规则，而了解这部分规则也就意味着你至少能够独立解决相当一部分类型报错。

### 及格线

TypeScript 使用鸭子类型，也即结构化类型系统进行类型兼容性的比较，即对于两个属性完全一致的类型，就认为它们属于同一种类型。而对于 A 类型、A + B 类型，认为后者属于前者的子类型。另外 TypeScript 类型中还存在着一部分特殊的规则，如 object、{} 以及 Top Type 等。

### 优秀回答

能回答出上面这些内容已经不错了，但你可是阅读完了这本小册的同学，怎么能轻易止步。如果想进一步升华回答，还可以从以下方面进行扩展。

- **结构化类型系统到标称类型系统**，你可以表达你不仅了解结构化类型系统，还了解与其可以作为对比的标称类型系统，包括存在意义与比较方式，以及如何在 TS 中实现标称类型系统。
- **类型层级**，类型兼容性的比较本质上其实也就是在类型层级中进行比较，一个类型能够兼容其子类型，就这么回事，因此，不妨扩展地讲一讲 TS 的类型层级是怎么样的。

## any、unknown 与 never

这一部分主要考察你对内置 Top Type、Bottom Type 的理解，属于相对少见的考察，因此通常也不会要求过高。

### 及格线

具体内容已经在小册中详细描述，这里只做简单叙述。any 与 unknown 在 TypeScript 类型层级中属于最顶层的 Top Type，也就意味所有类型都是它俩的子类型。而 never 则相反，作为 Bottom Type 的它是所有类型的子类型。

### 优秀回答

面试的重要原则之一就是 WHY，在回答一个知识点的同时，如果能把这个知识点背后的存在原因也讲述清楚，很难不让面试官暗暗点头为你折服，因此你可以考虑从以下这么几个角度出发来进行扩展。

- **为什么需要 Top Type 与 Bottom Type ？** 在实际开发中，我们不可能确保对所有地方的类型都进行精确的描述，因此就需要 Top Type 来表示一个包含任意类型的类型。而在类型编程中，如果对两个不存在交集的类型强行进行交集运算，也需要一个类型表示这个不存在的类型。这就是 Top Type 与 Bottom Type 的存在意义。
- **类型层级**，Top 与 Bottom 本身就是在描述它们在类型层级中的位置，因此，如果你能给面试官讲一遍从 Bottom 向上到 Top 的类型链，我觉得起码在 TypeScript 这个技能点上你已经基本得到肯定了。
- **条件类型**，Top Type 与 Bottom Type 带来的底层规则还不止表现在类型兼容性方面，在条件类型中同样存在对它们的特殊逻辑，请回想 any 与 never 在条件类型中的表现。

## 工具类型实现

这一部分有可能需要你进行手写，但对于完成了整本小册阅读的你来说，肯定不是难事，这一部分就不做过多叙述了。

### 及格线

比较简单的工具类型手写可能包括 Partial（Require）、Pick（Omit）、ReturnType（ParameterType），小册中均已介绍了相关实现与原理，这里就不再赘述。

### 优秀回答

在完成手写的基础上，其实你也可以主动进行扩展。

- 我不仅能写出这些基础实现，还能写出其在实际应用场景中的增强版，比如 DeepPartial 与 MarkAsPartial，PickByType 与 PickByStrictType 等等。
- 我不仅了解这些工具类型的实现，还了解它们可以被归纳为访问性修饰工具类型、结构处理工具类型、集合工具类型与模式匹配工具类型等等，同时对它们实现过程中使用到的类型工具也有较为深入的了解。

## 场景题题问：

[参考场景题](https://vue3js.cn/interview/typescript/typescript_javascript.html#%E4%BA%8C%E3%80%81%E7%89%B9%E6%80%A7)

### Typescript 的数据类型有哪些？

`typescript` 的数据类型主要有如下：

- boolean（布尔类型）
- number（数字类型）
- string（字符串类型）
- array（数组类型）
- tuple（元组类型）
- enum（枚举类型）
- any（任意类型）
- null 和 undefined 类型
- void 类型
- never 类型
- object 对象类型

### TypeScript 中函数的理解？与 JavaScript 函数的区别？

函数是`JavaScript` 应用程序的基础，帮助我们实现抽象层、模拟类、信息隐藏和模块

在`TypeScript` 里，虽然已经支持类、命名空间和模块，但函数仍然是主要定义行为的方式，`TypeScript` 为 `JavaScript` 函数添加了额外的功能，丰富了更多的应用场景

### 对 TypeScript 中泛型的理解？应用场景？

泛型程序设计（generic programming）是程序设计语言的一种风格或范式

泛型允许我们在强类型程序设计语言中编写代码时使用一些以后才指定的类型，在实例化时作为参数指明这些类型。

在`typescript`中，定义函数，接口或者类的时候，不预先定义好具体的类型，而在使用的时候在指定类型的一种特性。

### 对 TypeScript 中高级类型的理解？有哪些？

除了`string`、`number`、`boolean` 这种基础类型外，在 `typescript` 类型声明中还存在一些高级的类型应用

这些高级类型，是`typescript`为了保证语言的灵活性，所使用的一些语言特性。这些特性有助于我们应对复杂多变的开发场景

### 有哪些？

- 交叉类型

  ```ts
  T & U
  ```

- 联合类型

  ```ts
  T | U
  ```

- 类型别名

  type：类型别名会给一个类型起个新名字，类型别名有时和接口很像，但是可以作用于原始值、联合类型、元组以及其它任何你需要手写的类型

  可以使用类型别名来在属性里引用自己（也可以是泛型）：

  ```ts
  type Tree<T> = {
      value: T;
      left: Tree<T>;
      right: Tree<T>;
  }
  ```

- 类型索引

  `keyof` 类似于 `Object.keys` ，用于获取一个接口中 Key 结果作为联合类型返回。

- 类型约束

  通过关键字 `extend` 进行约束，不同于在 `class` 后使用 `extends` 的继承作用，泛型内使用的主要作用是对泛型加以约束（表示该泛型是xxx的子类）

- 映射类型

  通过 `in` 关键字做类型的映射，遍历已有接口的 `key` 或者是遍历联合类型，如下例子：

  ```ts
  type Readonly<T> = {
      readonly [P in keyof T]: T[P];
  };
  
  interface Obj {
    a: string
    b: string
  }
  
  type ReadOnlyObj = Readonly<Obj>
  ```

  最终`ReadOnlyObj`的接口为下述：

  ```ts
  interface ReadOnlyObj {
      readonly a: string;
      readonly b: string;
  }
  ```

- 条件类型

  条件类型的语法规则和三元表达式一致，经常用于一些类型不确定的情况。

  ```ts
  T extends U ? X : Y
  ```

  上面的意思就是，如果 T 是 U 的子集，就是类型 X，否则为类型 Y

### 对 TypeScript 装饰器@的理解？应用场景？

> 装饰器是一种包装代码的简单方法，它也是一种设计模式，能够扩展包装代码的功能而不修改它。
>
> 尽管装饰器在 TypeScript 和 Python 等语言中被广泛使用，但是 JavaScript 装饰器的支持仍处于第 2 阶段提案中。但是，我们可以借助 Babel 和 TypeScript 编译器使用 JavaScript 装饰器。

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上

是一种在不改变原类和使用继承的情况下，动态地扩展对象功能

同样的，本质也不是什么高大上的结构，就是一个普通的函数，`@expression` 的形式其实是`Object.defineProperty`的语法糖

`expression`求值后必须也是一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入

#### 使用方式

由于`typescript`是一个实验性特性，若要使用，需要在`tsconfig.json`文件启动，如下：

```ts
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

`typescript`装饰器的使用和`javascript`基本一致

类的装饰器可以装饰：

#### 类装饰

> 接收参数：构造器函数

例如声明一个函数 `addAge` 去给 Class 的属性 `age` 添加年龄

```ts
function addAge(constructor: Function) {
  constructor.prototype.age = 18;
}

@addAge
class Person{
  name: string;
  age!: number;
  constructor() {
    this.name = 'huihui';
  }
}

let person = new Person();

console.log(person.age); // 18
```

上述代码，实际等同于以下形式：

```ts
Person = addAge(function Person() { ... });
```

上述可以看到，当装饰器作为修饰类的时候，会把构造器传递进去。 `constructor.prototype.age` 就是在每一个实例化对象上面添加一个 `age` 属性

#### 方法/属性装饰

> target：对象的原型
> propertyKey：方法的名称
> descriptor：方法的属性描述符

可以看到，这三个属性实际就是`Object.defineProperty`的三个参数，如果是类的属性，则没有传递第三个参数

如下例子：

```ts
// 声明装饰器修饰方法/属性
function method(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log("prop " + propertyKey);
  console.log("desc " + JSON.stringify(descriptor) + "\n\n");
  descriptor.writable = false;
};

function property(target: any, propertyKey: string) {
  console.log("target", target)
  console.log("propertyKey", propertyKey)
}

class Person{
 @property
 name: string;
 constructor() {
   this.name = 'huihui';
 }

 @method
 say(){
   return 'instance method';
 }

 @method
 static run(){
   return 'static method';
 }
}

const xmz = new Person();

// 修改实例方法say
xmz.say = function() {
 return 'edit'
}
```

#### 参数装饰

> target ：当前对象的原型
> propertyKey ：参数的名称
> index：参数数组中的位置

```ts
function logParameter(target: Object, propertyName: string, index: number) {
  console.log(target);
  console.log(propertyName);
  console.log(index);
}

class Employee {
  greet(@logParameter message: string): string {
      return `hello ${message}`;
  }
}
const emp = new Employee();
emp.greet('hello');
```

#### 访问器装饰

> 使用起来方式与方法装饰一致，如下：

```ts
function modification(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log("prop " + propertyKey);
  console.log("desc " + JSON.stringify(descriptor) + "\n\n");
};

class Person{
 _name: string;
 constructor() {
   this._name = 'huihui';
 }

 @modification
 get name() {
   return this._name
 }
}
```

#### 装饰器工厂

如果想要传递参数，使装饰器变成类似工厂函数，只需要在装饰器函数内部再构造一个函数即可，如下：

```ts
function addAge(age: number) {
  return function(constructor: Function) {
    constructor.prototype.age = age
  }
}

@addAge(10)
class Person{
  name: string;
  age!: number;
  constructor() {
    this.name = 'huihui';
  }
}

let person = new Person();
```

#### 执行顺序

当多个装饰器应用于一个声明上，将由上至下依次对装饰器表达式求值，求值的结果会被当作函数，由下至上依次调用，例如如下：

```ts
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}

// 输出
f(): evaluated
g(): evaluated
g(): called
f(): called
```

**总结**

可以看到，使用装饰器存在两个显著的优点：

- 代码可读性变强了，装饰器命名相当于一个注释
- 在不改变原有代码情况下，对原来功能进行扩展

后面的使用场景中，借助装饰器的特性，除了提高可读性之后，针对已经存在的类，可以通过装饰器的特性，在不改变原有代码情况下，对原来功能进行扩展

### 对 TypeScript 中命名空间与模块的理解？区别？

`TypeScript` 与`ECMAScript` 2015 一样，任何包含顶级 `import` 或者 `export` 的文件都被当成一个模块

相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为全局可见的

其他模块特性与ES6无异

#### 命名空间 namespace

命名空间一个最明确的目的就是解决重名问题

命名空间定义了标识符的可见范围，一个标识符可在多个名字空间中定义，它在不同名字空间中的含义是互不相干的

这样，在一个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他名字空间中

`TypeScript` 中命名空间使用 `namespace` 来定义，语法格式如下：

```ts
namespace SomeNameSpaceName {
   export interface ISomeInterfaceName {      }
   export class SomeClassName {      }
}
```

以上定义了一个命名空间 `SomeNameSpaceName`，如果我们需要在外部可以调用 `SomeNameSpaceName` 中的类和接口，则需要在类和接口添加 `export` 关键字

使用方式如下：

```ts
SomeNameSpaceName.SomeClassName
```

**命名空间本质上是一个对象，作用是将一系列相关的全局变量组织到一个对象的属性，**如下：

```ts
namespace Letter {
  export let a = 1;
  export let b = 2;
  export let c = 3;
  // ...
  export let z = 26;
}
```

编译成`js`如下：

```js
var Letter;
(function (Letter) {
    Letter.a = 1;
    Letter.b = 2;
    Letter.c = 3;
    // ...
    Letter.z = 26;
})(Letter || (Letter = {}));
```

####  区别

- 命名空间是位于全局命名空间下的一个普通的带有名字的 JavaScript 对象，使用起来十分容易。但就像其它的全局命名空间污染一样，它很难去识别组件之间的依赖关系，尤其是在大型的应用中
- 像命名空间一样，模块可以包含代码和声明。 不同的是模块可以声明它的依赖
- **在正常的TS项目开发过程中并不建议用命名空间**，但通常在通过 **d.ts 文件标记 js 库**类型的时候使用命名空间，**主要作用是给编译器编写代码的时候参考使用**

### 说说如何在 React 项目中应用 TypeScript？

#### **函数组件：**

更加规范的写法是使用 `React` 里面定义好的 `FC` 属性，里面已经定义好 `children` 类型，如下：

```tsx
export const Logo: React.FC<IProps> = (props) => {
  const { logo, className, alt } = props;

  return <img src={logo} className={className} alt={alt} />;
};
```

- React.FC 显式地定义了返回类型，其他方式是隐式推导的
- React.FC 对静态属性：displayName、propTypes、defaultProps 提供了类型检查和自动补全
- React.FC 为 children 提供了隐式的类型（ReactElement | null）

#### **有状态的类式组件：**

可以是一个类组件且存在 `props` 和 `state` 属性

如果使用 `TypeScript` 声明则如下所示：

```tsx
import * as React from "React";

interface IProps {
  color: string;
  size?: string;
}
interface IState {
  count: number;
}
class App extends React.Component<IProps, IState> {
  public state = {
    count: 1,
  };
  public render() {
    return <div>Hello world</div>;
  }
}
```

上述通过泛型对 `props`、`state` 进行类型定义，然后在使用的时候就可以在编译器中获取更好的智能提示

关于 `Component` 泛型类的定义，可以参考下 React 的类型定义文件 `node_modules/@types/React/index.d.ts`，如下所示：

```ts
class Component<P, S> {
  readonly props: Readonly<{ children?: ReactNode }> & Readonly<P>;

  state: Readonly<S>;
}
```

从上述可以看到，`state` 属性也定义了可读类型，目的是为了防止直接调用 `this.state` 更新状态

#### **受控组件：**

受控组件的特性在于元素的内容通过组件的状态 `state` 进行控制

由于组件内部的事件是合成事件，不等同于原生事件，

例如一个 `input` 组件修改内部的状态，常见的定义的时候如下所示：

```ts
private updateValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ itemText: e.target.value })
}
```

常用 `Event` 事件对象类型：

- ClipboardEvent<T = Element> 剪贴板事件对象
- DragEvent<T = Element> 拖拽事件对象
- ChangeEvent<T = Element> Change 事件对象
- KeyboardEvent<T = Element> 键盘事件对象
- MouseEvent<T = Element> 鼠标事件对象
- TouchEvent<T = Element> 触摸事件对象
- WheelEvent<T = Element> 滚轮事件对象
- AnimationEvent<T = Element> 动画事件对象
- TransitionEvent<T = Element> 过渡事件对象

`T` 接收一个 `DOM` 元素类型

### 说说如何在Vue2项目中应用TypeScript？

在`Vue2`项目中应用`typescript`，我们需要引入一个库`vue-property-decorator`，

其是基于`vue-class-component`库而来，这个库`vue`官方推出的一个支持使用`class`方式来开发`vue`单文件组件的库

主要的功能如下：

- methods 可以直接声明为类的成员方法
- 计算属性可以被声明为类的属性访问器
- 初始化的 data 可以被声明为类属性
- data、render 以及所有的 Vue 生命周期钩子可以直接作为类的成员方法
- 所有其他属性，需要放在装饰器中

# 高频面试题

## 1. 为什么推荐使用TypeScript？

TypeScript是微软公司开发和维护的一种面向对象的编程语言。它是JavaScript的超集，包含其所有元素。

其中，强类型和弱类型、静态类型和动态类型是两组不同的概念。

类型强弱是针对类型转换是否显示来区分，静态和动态类型是针对类型检查的时机来区分。

TS对JS的改进主要是静态类型检查，静态类型检查有何意义？标准答案是“静态类型更有利于构建大型应用”。

推荐使用TypeScript的原因有：

- TypeScript是开源的。
- TypeScript为JavaScript ide和实践（如静态检查）提供了高效的开发工具。
- TypeScript使代码更易于阅读和理解。
- 使用TypeScript，我们可以大大改进普通的JavaScript。
- TypeScript为我们提供了ES6（ECMAScript 6）的所有优点，以及更高的生产率。
- TypeScript通过对代码进行类型检查，可以帮助我们避免在编写JavaScript时经常遇到的令人痛苦的错误。
- 强大的类型系统，包括泛型。
- TypeScript只不过是带有一些附加功能的JavaScript。
- TypeScript代码可以按照ES5和ES6标准编译，以支持最新的浏览器。
- 与ECMAScript对齐以实现兼容性。
- 以JavaScript开始和结束。
- 支持静态类型。
- TypeScript将节省开发人员的时间。
- TypeScript是ES3、ES5和ES6的超集。

## 2. 说说TypeScript中命名空间与模块的理解和区别

**命名空间**：命名空间一个最明确的目的就是解决重名问题

命名空间定义了标识符的可见范围，一个标识符可在多个名字空间中定义，它在不同名字空间中的含义是互不相干的

这样，在一个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他名字空间中

**模块**：`TypeScript` 与` ECMAScript` 2015 一样，任何包含顶级 `import` 或者 `export` 的文件都被当成一个模块

相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为全局可见的

**它们之间的区别**：

- 命名空间是位于全局命名空间下的一个普通的带有名字的 JavaScript 对象，使用起来十分容易。但就像其它的全局命名空间污染一样，它很难去识别组件之间的依赖关系，尤其是在大型的应用中
- 像命名空间一样，模块可以包含代码和声明。 不同的是模块可以声明它的依赖
- 在正常的TS项目开发过程中并不建议用命名空间，但通常在通过 d.ts 文件标记 js 库类型的时候使用命名空间，主要作用是给编译器编写代码的时候参考使用

## 3. TypeScript支持的访问修饰符有哪些？

TypeScript支持访问修饰符 public，private 和 protected，它们决定了类成员的可访问性。

- 公共（public），类的所有成员，其子类以及该类的实例都可以访问。
- 受保护（protected），该类及其子类的所有成员都可以访问它们。 但是该类的实例无法访问。
- 私有（private），只有类的成员可以访问它们。

如果未指定访问修饰符，则它是隐式公共的，因为它符合 JavaScript 的便利性。

## 4. TypeScript中有哪些声明变量的方式？

```ts
// 声明类型和值，Declaring type and value in a single statement
let [identifier] : [type-annotation] = value; 

// 只声明类型，Declaring type without value
let [identifier] : [type-annotation]; 

// 只声明值，Declaring its value without type
let [identifier] = value; 

// 声明变量无类型和值，Declaring without value and type
let [identifier]; 

```

## 5. TypeScript和JavaScript的区别是什么？

Typescript 是 JavaScript 的超集，可以被编译成 JavaScript 代码。用 JavaScript 编写的代码，在 TypeScript 中依然有效。Typescript 是纯面向对象的编程语言，包含类和接口的概念。 程序员可以用它来编写面向对象的服务端或客户端程序，并将它们编译成 JavaScript 代码。

## 6. TypeScript中的Declare关键字有什么作用？

我们知道所有的JavaScript库/框架都没有TypeScript声明文件，但是我们希望在TypeScript文件中使用它们时不会出现编译错误。为此，我们使用declare关键字。在我们希望定义可能存在于其他地方的变量的环境声明和方法中，可以使用declare关键字。

例如，假设我们有一个名为myLibrary的库，它没有TypeScript声明文件，在全局命名空间中有一个名为myLibrary的命名空间。如果我们想在TypeScript代码中使用这个库，我们可以使用以下代码:

```ts
declare let myLibrary;

```

TypeScript运行时将把myLibrary变量赋值为任意类型(any)。这是一个问题，我们不会得到智能感知在设计时，但我们将能够使用库在我们的代码。

## 7. 解释一下TypeScript中的枚举

枚举是TypeScipt数据类型，它允许我们定义一组命名常量。 使用枚举去创建一组不同的案例变得更加容易。 它是相关值的集合，可以是数字值或字符串值。

```ts
enum Gender {
  Male,
  Female,
  Other
}
console.log(Gender.Male); // Output: 0

//We can also access an enum value by it's number value.
console.log(Gender[1]); // Output: Female

```

## 8. TypeScript中什么是装饰器？

装饰器是一种特殊类型的声明，它能过被附加到类声明，方法，属性或者参数上，可以修改类的行为

通俗的来说就是一个方法，可以注入到类，方法，属性参数上来扩展类，属性，方法，参数的功能

**装饰器的分类**: 类装饰器、属性装饰器、方法装饰器、参数装饰器

## 9. TypeScript中的模块是什么？

TypeScript 中的模块是相关变量、函数、类和接口的集合。 你可以将模块视为包含执行任务所需的一切的容器。可以导入模块以轻松地在项目之间共享代码。

```ts
module module_name{
  class xyz{
    export sum(x, y){
      return x+y;
    }
  }
}

```

## 10. TypeScript的内置数据类型有哪些？

```ts
// 数字类型：用于表示数字类型的值。TypeScript 中的所有数字都存储为浮点值。

let num: number = 1;

// 布尔类型：一个逻辑二进制开关，包含true或false

let str: string = "CoderBin";

// Null 类型： Null 表示值未定义的变量。

let flag: boolean = true

// void 类型：分配给没有返回值的方法的类型。

let unusable: void = undefined;

```

## 11. TypeScript的主要特点是什么？

- **跨平台**：TypeScript 编译器可以安装在任何操作系统上，包括 Windows、macOS 和 Linux。
- **ES6 特性**：TypeScript 包含计划中的 ECMAScript 2015 (ES6) 的大部分特性，例如箭头函数。
- **面向对象的语言**：TypeScript 提供所有标准的 OOP 功能，如类、接口和模块。
- **静态类型检查**：TypeScript 使用静态类型并帮助在编译时进行类型检查。因此，你可以在编写代码时发现编译时错误，而无需运行脚本。
- **可选的静态类型**：如果你习惯了 JavaScript 的动态类型，TypeScript 还允许可选的静态类型。

## 12. TypeScript中never和void的区别？

- void 表示没有任何类型（可以被赋值为 null 和 undefined）。
- never 表示一个不包含值的类型，即表示永远不存在的值。
- 拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。

## 13. TypeScript中的类型断言是什么？

类型断言可以用来手动指定一个值具体的类型，即允许变量从一种类型更改为另一种类型。

当你比 TS 更了解某个值的类型，并且需要指定更具体的类型时，我们可以使用**类型断言**。

## 14. TS中any和unknown有什么区别？

unknown 和 any 的主要区别是 unknown 类型会更加严格：在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对 any 类型的值执行操作之前，我们不必进行任何检查。

```ts
let foo: any = 123;
console.log(foo.msg); // 符合TS的语法
let a_value1: unknown = foo;   // OK
let a_value2: any = foo;      // OK
let a_value3: string = foo;   // OK

let bar: unknown = 222; // OK 
console.log(bar.msg); // Error
let k_value1: unknown = bar;   // OK
let K_value2: any = bar;      // OK
let K_value3: string = bar;   // Error

```

因为bar是一个未知类型(任何类型的数据都可以赋给 `unknown` 类型)，所以不能确定是否有msg属性。不能通过TS语法检测；而 unknown 类型的值也不能将值赋给 any 和 unknown 之外的类型变量

**总结**: any 和 unknown 都是顶级类型，但是 unknown 更加严格，不像 any 那样不做类型检查，反而 unknown 因为未知性质，不允许访问属性，不允许赋值给其他有明确类型的变量。

## 15. 使用TS实现一个判断传入参数是否是数组类型的方法？

unknown 用于变量类型不确定，但肯定可以确定的情形下，比如下面这个示例中，参数总归会有个值，根据这个值的类型进行不同的处理，这里使用 unknown 替代 any 则会更加类型安全。

```ts
function isArray(x: unknown): boolean {
  if (Array.isArray(x)) {
    return true;
  }
  return false;
}

```

## 16. tsconfig.json有什么作用？

tsconfig.json文件是JSON格式的文件。

在tsconfig.json文件中，可以指定不同的选项来告诉编译器如何编译当前项目。

目录中包含tsconfig.json文件，表明该目录是TypeScript项目的根目录。

```json
// 常用配置
{
  /*
      tsconfig.json是ts编译器的配置文件，ts可以根据它的信息来对待吗进行编译 可以再tsconfig中写注释
      include : 用来指定哪些文件需要被编译
      exclude : 用来指定哪些文件不需要被编译 ：默认node_module
      extends : 用来指定继承的配置文件
      files   : 用来指定被编译的文件列表，只有编译少量文件才使用
      compilerOptions : 编译器的选项是配置文件中非常重要也是非常复杂的配置选项
  */
  "include":[
    // ** : 任意目录 ， * : 任意文件
    "./src/**/*"
  ],
  "exclude": [
    "./src/hello/**/*"
  ],
  // "extends": "./configs/base",
  "files": [
    "1.ts",
    // "2.ts"
  ],
  "compilerOptions": {
    // 用来指定 ES 版本 ESNext : 最新版。 'ES3', 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ESNext'
    "target": "ES2020",
    // 指定要使用模块化的规范 : 'None', 'CommonJS', 'AMD', 'System', 'UMD', 'ES6'/'ES2015', 'ES2020' or 'ESNext'
    "module": "ESNext",
    // 用来指定项目中要使用的库 'ES5', 'ES6', 'ES2015', 'ES7', 'ES2016', 'ES2017', 'ES2018', 'ESNext', 'DOM', 'DOM.Iterable',
    //                          'WebWorker', 'ScriptHost', 'ES2015.Core', 'ES2015.Collection', 'ES2015.Generator', 'ES2015.Iterable', 
    //                          'ES2015.Promise', 'ES2015.Proxy', 'ES2015.Reflect', 'ES2015.Symbol', 'ES2015.Symbol.WellKnown', 
    //                          'ES2016.Array.Include', 'ES2017.object', 'ES2017.Intl', 'ES2017.SharedMemory', 'ES2017.String', 
    //                          'ES2017.TypedArrays', 'ES2018.Intl', 'ES2018.Promise', 'ES2018.RegExp', 'ESNext.AsyncIterable', 
    //                          'ESNext.Array', 'ESNext.Intl', 'ESNext.Symbol'
    // 运行在浏览器中不用设置，运行在node或其他中才需要设置
    // "lib":[]，
    // 用来指定编译后文件的存放位置
    "outDir":"./dist",
    // 将代码合并为一个文件,设置之后所有的全局作用域中的代码会合并到同一个文件中 但是只能在  'amd' and 'system' 中才能使用
    // "outFile": "./dist/app.js",
    // 是否对js文件进行编译，默认false
    "allowJs": false,
    // 是否检查js代码是否符合语法规范，默认false
    "checkJs": false,
    // 是否移除注释，默认false
    "removeComments":false,
    // 是否不生成编译后文件，默认false
    "noEmit": false,
    // 当有错误时是否生成文件，默认false
    "noEmitOnError": false,
    // 是否生成sourceMap，默认false  这个文件里保存的，是转换后代码的位置，和对应的转换前的位置。有了它，出错的时候，通过断点工具可以直接显示原始代码，而不是转换后的代码。
    "sourceMap":false,

    // 所有的严格检查的总开关，默认false
    "strict": false,
    // 编译后的文件是否开启严格模式，默认false
    "alwaysStrict": false,
    // 不允许隐式的any，默认false(允许)
    "noImplicitAny": false,
    // 不允许隐式的this，默认false(允许)
    "noImplicitThis": false,
    // 是否严格的检查空值，默认false 检查有可能为null的地方
    "strictNullChecks": true,
    // 是否严格检查bind、call和apply的参数列表，默认false  检查是否有多余参数
    "strictBindCallApply":false,
    // 是否严格检查函数的类型，
    "strictFunctionTypes":false,
    // 是否严格检查属性是否初始化，默认false
    "strictPropertyInitialization":false,

    // 是否检查switch语句包含正确的break，默认false
    "noFallthroughCasesInSwitch":false,
    // 检查函数没有隐式的返回值，默认false
    "noImplicitReturns":false,
    // 是否检查检查未使用的局部变量，默认false
    "noUnusedLocals":false,
    // 是否检查未使用的参数，默认false
    "noUnusedParameters":false,

    // 是否检查不可达代码报错，默认false   true，忽略不可达代码 false，不可达代码将引起错误
    "allowUnreachableCode":false
  }
}

```

## 17. TypeScript中什么是类类型接口？

- 如果接口用于一个类的话，那么接口会表示“行为的抽象”
- 对类的约束，让类去实现接口，类可以实现多个接口
- 接口只能约束类的公有成员（实例属性/方法），无法约束私有成员、构造函数、静态属性/方法

## 18. TS中什么是方法重载？

方法重载是指在一个类中定义多个同名的方法，但要求每个方法具有不同的参数的类型或参数的个数。 基本上，它在派生类或子类中重新定义了基类方法。

方法覆盖规则：

- 该方法必须与父类中的名称相同。
- 它必须具有与父类相同的参数。
- 必须存在IS-A关系或继承。

## 19. TS中的类是什么，如何定义？

类表示一组相关对象的共享行为和属性。

例如，我们的类可能是Student，其所有对象都具有该attendClass方法。另一方面，John是一个单独的 type 实例，Student可能有额外的独特行为，比如attendExtracurricular.

你使用关键字声明类class：

```ts
class Student {    
  studCode: number;    
  studName: string;    
  constructor(code: number, name: string) {    
      this.studName = name;    
      this.studCode = code; 
  }
}

```

## 20. 如何在TS中实现继承？

继承是一种从另一个类获取一个类的属性和行为的机制。它是面向对象编程的一个重要方面，并且具有从现有类创建新类的能力，继承成员的类称为基类，继承这些成员的类称为派生类。

继承可以通过使用extend关键字来实现。我们可以通过下面的例子来理解它。

```ts
class Shape {     
  Area:number     
  constructor(area:number) {     
     this.Area = area    
  }     
}     
class Circle extends Shape {     
  display():void {     
     console.log("圆的面积: "+this.Area)     
  }     
}    
var obj = new Circle(320);     
obj.display() 

```

## 21. TS中的泛型是什么？

TypeScript Generics是提供创建可重用组件的方法的工具。 它能够创建可以使用多种数据类型而不是单一数据类型的组件。 而且，它在不影响性能或生产率的情况下提供了类型安全性。 泛型允许我们创建泛型类，泛型函数，泛型方法和泛型接口。

在泛型中，类型参数写在左括号（<）和右括号（>）之间，这使它成为强类型集合。 它使用一种特殊的类型变量来表示类型

```ts
function identity<T>(arg: T): T {
  return arg;
}
let output1 = identity<string>("CoderBin");
let output2 = identity<number>( 117 );
console.log(output1);
console.log(output2);

```

## 22. 说说TS中的类及其特性

TypeScript 引入了类，以便它们可以利用诸如封装和抽象之类的面向对象技术的好处。

TypeScript 编译器将 TypeScript 中的类编译为普通的 JavaScript 函数，以跨平台和浏览器工作。

一个类包括以下内容：

- 构造器（Constructor）
- 属性（Properties）
- 方法（Methods）

```ts
class Employee {
  empID: number;
  empName: string;

  constructor(ID: number, name: string) {
      this.empName = name;
      this.empID = ID;
  }

  getSalary(): number {
      return 40000;
  }
}

```

类的其他特性有：

- 继承（Inheritance）
- 封装（Encapsulation）
- 多态（Polymorphism）
- 抽象（Abstraction）

## 23. 解释如何使用TypeScript mixin

Mixin 本质上是在相反方向上工作的继承。Mixins 允许你通过组合以前类中更简单的部分类来设置构建新类。

相反，类A继承类B来获得它的功能，类B从类A需要返回一个新类的附加功能。

## 24. 什么是TypeScript映射文件？

- TypeScript Map文件是一个源映射文件，其中包含有关我们原始文件的信息。
- .map文件是源映射文件，可让工具在发出的JavaScript代码和创建它的TypeScript源文件之间进行映射。
- 许多调试器可以使用这些文件，因此我们可以调试TypeScript文件而不是JavaScript文件。

## 25. TS中的类型有哪些？

类型系统表示语言支持的不同类型的值。它在程序存储或操作所提供的值之前检查其有效性。

它可以分为两种类型，

- 内置：包括数字(number)，字符串(string)，布尔值(boolean)，无效(void)，空值(null)和未定义(undefined)。
- 用户定义的：它包括枚举(enums)，类(classes)，接口(interfaces)，数组(arrays)和元组(tuple)。

## 26. TS中的interface和type有什么区别？

**相同点：**

1. 都可以描述一个对象或者函数

**interface**

```ts
interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void;
}

```

**type**

```ts
type User = {
  name: string
  age: number
};

type SetUser = (name: string, age: number)=> void;

```

1. 都允许拓展（extends）

interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。

**不同点**

- type 可以而 interface 不行

**type 可以声明基本类型别名，联合类型，元组等类型**

```ts
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]

```

**type 语句中还可以使用 typeof 获取实例的类型进行赋值**

```ts
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div

```

**其他骚操作**

```ts
type StringOrNumber = string | number;  
type Text = string | { text: string };  
type NameLookup = Dictionary<string, Person>;  
type Callback<T> = (data: T) => void;  
type Pair<T> = [T, T];  
type Coordinates = Pair<number>;  
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };

```

- interface 可以而 type 不行

**interface 能够声明合并**

```ts
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/

```

一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。

## 27. TS中的getter/setter是什么？你如何使用它们？

Getter 和 setter 是特殊类型的方法，可帮助你根据程序的需要委派对私有变量的不同级别的访问。

Getters 允许你引用一个值但不能编辑它。Setter 允许你更改变量的值，但不能查看其当前值。这些对于实现封装是必不可少的。

例如，新雇主可能能够了解get公司的员工人数，但无权set了解员工人数。

```ts
const fullNameMaxLength = 10;
class Employee {
  private _fullName: string = "";
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }
    this._fullName = newName;
  }
}
let employee = new Employee();
employee.fullName = "Bin Coder";
if (employee.fullName) {
  console.log(employee.fullName);
}

```

## 28. 如何检查TS中的null和undefiend？

通过使用一个缓冲检查，我们可以检查空和未定义:

```ts
if (x == null) { }

```

如果我们使用严格的检查，它将总是对设置为null的值为真，而对未定义的变量不为真。

例子

```ts
var a: number;  
var b: number = null;  
function check(x, name) {  
    if (x == null) {  
        console.log(name + ' == null');  
    }  
    if (x === null) {  
        console.log(name + ' === null');  
    }  
    if (typeof x === 'undefined') {  
        console.log(name + ' is undefined');  
    }  
}  
check(a, 'a');  
check(b, 'b');  

```

输出

```ts
"a == null"
"a is undefined"
"b == null"
"b === null"

```

## 29. TypeScript中const和readonly的区别是什么？

- const用于变量，readonly用于属性
- const在运行时检查，readonly在编译时检查
- 使用const变量保存的数组，可以使用push，pop等方法。但是如果使用Readonly Array声明的数组不能使用push，pop等方法

## 30. Omit 类型有什么作用

Omit 以一个类型为基础支持剔除某些属性，然后返回一个新类型。 语法如下

```python
Omit<Type, Keys>

```

使用示例

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
  createdAt: number
}
type TodoPreview = Omit<Todo, "description">
```
