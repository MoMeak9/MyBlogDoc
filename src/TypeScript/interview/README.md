---
date: 2022-08-16
category:
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

https://vue3js.cn/interview/typescript/typescript_javascript.html#%E4%BA%8C%E3%80%81%E7%89%B9%E6%80%A7

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

### 对 TypeScript 中枚举类型（enum）的理解？应用场景？



### 说说你对 TypeScript 中接口（interface）的理解？应用场景？



### 对 TypeScript 中类的理解？应用场景？



### TypeScript 中函数的理解？与 JavaScript 函数的区别？





### 对 TypeScript 中泛型的理解？应用场景？



### 你对 TypeScript 中高级类型的理解？有哪些？





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
