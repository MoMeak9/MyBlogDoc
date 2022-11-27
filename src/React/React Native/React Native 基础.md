---
date: 2022-05-12
category:
- React
- ReactNative
---

# React Native 基础

## TextInput

### 受控（Controlled）组件

受控的意思说的是使用 JavaScript 中的 state 去控制宿主组件中的值。一个受控的 ControlledTextInput 组件示例如下：

```jsx
function ControlledTextInput() {
  const [text, setText] = React.useState('');
  return  <TextInput value={text} onChangeText={setText} />
}
```

在这个示例中，我们先使用了 useState 创建了一个状态 text 和状态更新函数setText，并将状态text赋值给了 TextInput 的属性 value，value 是控制 TextInput 宿主组件展示的值用的。在用户输入文字后，会触发 onChangeText 事件，这时就会调用 setText，将状态 text 更新为用户最新输入的值。

受控组件和非受控组件有什么区别：

![img](https://my-doc-1259409954.file.myqcloud.com/MyImages/7621791793d0d73030124e472f9117a9.png)

**使用受控组件，并且使用异步的文字改变事件**，这也符合大部分人的代码习惯。

### 输入框的焦点

你需要关注的第二件事是，如何控制输入框的焦点。通常光标放置在哪个输入框上，那个输入框就是页面的唯一焦点。

有些场景下，输入框的焦点是程序自动控制的，无需开发者处理。比如用户点击手机屏幕上的输入框，此时焦点和光标都会移到输入框上。

有些场景下，是需要代码介入控制焦点的。比如你购物搜索商品，从首页跳到搜索页时，搜索页的焦点就是用代码控制的。或者你在填写收货地址时，为了让你少点几次输入框，当你按下键盘的下一项按钮时，焦点就会从当前输入框自动转移到下一个输入框。

我们先来看怎么实现自动“对焦”，以搜索页的搜索输入框自动对焦为例，示例代码如下：

```jsx
<TextInput autoFocus/>
```

TextInput 的 autoFocus 属性，就是用于控制自动对焦用的，其默认值是 false。也就是说，所有的 TextInput 元素默认都不会自动的对焦，而我们将 TextInput 的 autoFocus 属性设置为 true 时，框架会在 TextInput 元素挂载后，自动帮我们进行对焦。

搜索页面只有一个搜索框的场景下 ，autoFocus 是好用的。但当一个页面有多个输入框时，autoFocus 就没法实现焦点的转移了。比如，在购物 App 中填写收货地址时，你每完成一项填写，点击键盘中的下一项按钮，焦点就会自动转移一次，从姓名到电话再到地址。我们以前讲过，React/React Native 是声明式的，但是在操作自带状态的宿主属性时，比如焦点转移，声明式就不管用了，还得用给宿主组件下命令。那怎么下命令呢？

我们先从最简单的控制 TextInput 焦点讲起，示例代码如下：

```jsx
function AutoNextFocusTextInputs() {
  const ref1 = React.useRef<TextInput>(null);

  useEffect(()=>{
    ref1.current?.focus()
  },[])

  return  (
    <TextInput ref={ref1}  />
    )
}
```

在这段代码中，先声明了一个 ref1 用于保存 TextInput 宿主组件。在该宿主组件上封装了 Native/C++ 层暴露给 JavaScript 的命令，比如对焦focus()、失焦blur()、控制选中文字的光标setSelection。

AutoNextFocusTextInputs组件在挂载完成后，程序会调用ref1.current.focus()，将焦点对到 TextInput 元素上，这就是使用focus()实现对焦的原理。

<u>使用 focus()命令对焦和使用autoFocus属性对焦，在原生应用层面的实现原理是一样的，只不过在 JavaScript 层面，前者是命令式的，后者是声明式的。</u>对自带状态的宿主组件而言，命令式的方法能够进行更复杂的操作。

那要实现每点一次键盘的“下一项”按钮，将焦点对到下一个 TextInput 元素上，怎么实现呢？具体的示例代码如下：

```jsx
function AutoNextFocusTextInputs() {
  const ref1 = React.useRef<TextInput>(null);
  const ref2 = React.useRef<TextInput>(null);
  const ref3 = React.useRef<TextInput>(null);

  return (
    <>
      <TextInput ref={ref1} onSubmitEditing={ref2.current?.focus} /> // 姓名输入框
      <TextInput ref={ref2} onSubmitEditing={ref3.current?.focus} /> // 电话输入框
      <TextInput ref={ref3} /> // 地址输入框
    </>
  );
}
```

首先，我们得声明 3 个 ref 用于保存 3 个 TextInput 元素。其次，实现这三个元素，它们依次是姓名输入框、电话输入框、地址输入框。最后，需要监听点击键盘完成按钮的提交事件onSubmitEditing，在onSubmitEditing的回调中，将焦点通过ref.focus()转移到下一个 TextInput 元素上。

### 联动键盘的体验

先来看第一个体验细节，iOS 微信搜索框的键盘右下角按钮有一个“置灰置蓝”的功能。默认情况下，键盘右下角的按钮显示的是置灰的“搜索”二字，当你在搜索框输入文字后，置灰的“搜索”按钮会变成蓝色背景的“搜索”二字。

置灰的作用是提示用户，没有输入文字不能进行搜索，按钮变蓝提示的是有内容了，可以搜索了。

控制键盘右下角按钮置灰置蓝的，是 TextInput 的enablesReturnKeyAutomatically属性，这个属性是 iOS 独有的属性，默认是false，也就是任何使用键盘右下角的按钮，都可以点击。你也可以通过将其设置为 true，使其在输入框中没有文字时置灰。

<img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/de5c8eb7862fd38405b1caba07eaf258.png" alt="img" style="zoom:67%;" />

有两个属性可以设置这些文案，包括 iOS/Android 通用的 returnKeyType 和 Android 独有的 returnKeyLabel。全部的属性你可以查一下文档，我这里只说一下通用属性：

![img](https://my-doc-1259409954.file.myqcloud.com/MyImages/dyyda94cdbb8d899c9852225d7e6f4fd.png)

第三个体验细节是，登录页面的自动填写账号密码功能。虽然现在有了二维码登录，但传统的账号密码登录场景还是非常多的。每次登录的时候，要输入一遍账号密码，就很麻烦了。

无论是 iOS 还是 Android，它们都有系统层面的记住账号密码的功能，帮助用户快速完成账号密码的填写。完成快速填写功能的 TextInput 属性，在 iOS 上叫做textContentType，在 Android 上叫做autoComplete。

你可以将账号输入框的快速填写属性设置为username，将密码输入框的快速填写属性设置为password，帮助用户节约一些时间，提高一下整体的成功率。除此之外，一些姓名、电话、地址信息也可以快速填写。

<img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/aa7378ddf3c2c193832f76b90323316c.png" alt="img" style="zoom: 50%;" />

还有一些键盘的体验细节，比如keyboardType可以控制键盘类型，可以让用户更方便地输入电话号码phone-pad、邮箱地址email-address等等。

<img src="https://my-doc-1259409954.file.myqcloud.com/MyImages/6decc25dc3b45cc03e19ea533f15dc6f.png" alt="img" style="zoom: 50%;" />

当你知道这些键盘细节后，你就可以利用这些系统的特性，帮你的 App 体验变得更好。

```jsx
function AutoNextFocusTextInputs() {
  const ref1,ref2,ref3 ...

  return (
    <>
      <TextInput ref={ref1} placeholder="姓名" textContentType="name" returnKeyType="next" onSubmitEditing={ref2.current?.focus}/>
      <TextInput ref={ref2} placeholder="电话"  keyboardType="phone-pad" returnKeyType="done" onSubmitEditing={ref3.current?.focus}
      />
      <TextInput  ref={ref3}  placeholder="地址"  returnKeyType="done" />
    </>
  );
}
```

在这段代码中，我们使用了placeholder来提醒用户该输入框应该输入什么，使用了 textContentType="name" 来辅助用户填写姓名，使用了 keyboardType="phone-pad" 来指定键盘只用于输入电话号码，使用returnKeyType="next" 或 "done"来提示用户当前操作的含义，当然还有ref.current.focus()的自动聚焦功能。

###  总结

学会处理输入框的文字。有两种处理方式受控组件和非受控组件，受控组件更强大一些，也更符合大多数 React/React Native 开发者的习惯；学会处理输入框的焦点。处理焦点有两种方式：一种是声明式的autoFocus属性，另一种是命令式的ref.current.focus()方法，前者适用场景有限，后者适用场景更多；学会处理与输入框联动的键盘，包括键盘右下角的按钮、键盘提示文案、键盘类型等等。

## List(FlatList, RecyclerListView)

为什么开源社区的 RecyclerListView 比官方的 FlastList 性能更好？FlastList、RecyclerListView 的优化原理是什么？FlastList 和 RecyclerListView 的底层实现都是滚动组件 ScrollView，所以我们先从 ScrollView 聊起。

### ScrollView：渲染所有内容的滚动组件

ScrollView 是一个支持横向或竖向的滚动组件，几乎所有页面都会用到。

ScrollView 组件类似于 Web 中的 或 标签，浏览器中的页面之所以能上下滚动，就是因为 html 或 body 标签默认有一个 overflow-y: scroll 的属性，如果你把标签的属性设置为 overflow-y: hidden，页面就不能滚动了。

React Native 的 ScrollView 组件在 Android 的底层实现用的是 ScrollView 和 HorizontalScrollView，在 iOS 的底层实现用的是 UIScrollView。

**所谓的滚动，解决的是在有限高度的屏幕内浏览无限高度的内容的问题。有限高度的容器是 ScrollView，无限高度，或者说高度不确定的内容是 ScrollView 的 children。**

使用 ScrollView 组件时，**我们通常并不直接给 ScrollView 设置固定高度或宽度，而是给其父组件设置固定高度或宽度。**

一般而言，我们会使用安全区域组件 SafeAreaView 组件作为 ScrollView 的父组件，并给 SafeAreaView 组件设置布局属性 flex:1，让内容自动撑高 SafeAreaView。使用 SafeAreaView 作为最外层组件的好处是，它可以帮我们适配 iPhone 的刘海屏，节约我们的适配成本，示例代码如下：

```jsx
<SafeAreaView style={{flex: 1}}>
  <ScrollView>
    <Text>1</Text>
  <ScrollView/>
</SafeAreaView>    
```

了解完 ScrollView 组件的基本使用方法后，我们再来看下 ScrollView 的性能，看看如果使用 ScrollView 来实现无限列表会怎么样。

```jsx

// 10 个 item 就能填满整个屏幕，渲染很快
// 1000 个 item 相当于 100+ 个屏幕的高度，渲染很慢
const NUM_ITEMS = 1000; 

const makeContent = (nItems: number, styles: any) => {
  return Array(nItems)
    .fill(1)
    .map((_, i) => (
      <Pressable
        key={i}
        style={styles}>
        <Text>{'Item ' + i}</Text>
      </Pressable>
    ));
};

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>{makeContent(NUM_ITEMS, styles.itemWrapper)}</ScrollView>
    </SafeAreaView>
  );
};
```

上面这段代码，说的就是使用 ScrollView 组件一次性直接渲染 1000 个子视图，这里没有做任何懒加载优化。

以信息流业务为例，用户进入页面后第一眼看到的只有屏幕中的信息，一般不超过 10 条。一次性渲染 10 条信息，其实很快，就是一眨眼的功夫。但如果是 1000 条呢？算力乘以 100，内存乘以 100，耗时也乘以 100，渲染速度就慢下来了。大量的计算和内存浪费在了用户看不到的地方。

### FlatList：按需渲染的列表组件

FlatList 列表组件就是 “自动”按需渲染的。

FlatList 是 React Native 官方提供的第二代列表组件。FlatList 组件底层使用的是虚拟列表 VirtualizedList，VirtualizedList 底层组件使用的是 ScrollView 组件。因此 VirtualizedList 和 ScrollView 组件中的大部分属性，FlatList 组件也可以使用。关于 FlatList 更具体的使用方法，你可以查看[官方文档](https://reactnative.dev/docs/flatlist)。现在，我们还是回到 FlatList 的原理，先从理论层面上理解 FlatList 为什么可以自动按需渲染

简单地讲，FlatList 性能比 ScrollView 好的原因是， **FlatList 列表组件利用按需渲染机制减少了首次渲染的视图，利用空视图的占位机制回收了原有视图的内存，**你可以对比一下二者的区别：

```js
// 从上到下滚动时的渲染方式
// SrcollView 渲染方式：一次渲染所有视图
SrcollView0_9  = [{👁},{ },{ },{ }]  // 浏览0~9条列表项
SrcollView10_19 = [{ },{👁},{ },{ }] // 浏览10~19条列表项
SrcollView20_29 = [{ },{ },{👁},{ }] // 浏览20~29条列表项
SrcollView30_39 = [{ },{ },{ },{👁}] // 浏览30~39条列表项

// FlatList 渲染方式：按需渲染，看不见的地方用 $empty 占位
FlatList0_9  = [{👁},{ }]               // 浏览0~9条列表项
FlatList10_19 = [{ },{👁},{ }]          // 浏览10~19条列表项
FlatList20_29 = [$empty,{},{👁},{}]     // 浏览20~29条列表项
FlatList30_39 = [$empty,$empty,{ },{👁}]// 浏览30~39条列表项
```

$empty，这就是内存回收

40 条列表只是一个假设的例子，实现 FlatList 自动按需渲染的思路具体可以分为三步：

1. 通过滚动事件的回调参数，计算需要按需渲染的区域；
2. 通过需要按需渲染的区域，计算需要按需渲染的列表项索引；
3. 只渲染需要按需渲染列表项，不需要渲染的列表项用空视图代替。

### RecyclerListView：可复用的列表组件



### PK：ScrollView、FlatList、RecyclerListView

- ScrollView 适合内容少的页面，只有几个屏幕高页面是适合的；

- FlatList 性能还过得去，但我不推荐你优先使用它，只有在你的列表项内容高度不能事先确定，或者不可枚举的情况下使用它；

- RecyclerListView 性能最好，你应该优先使用它，但使用它的前提是可枚举且高度确定或大致确定

![image-20220512154131387](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220512154131387.png)

![image-20220512154139286](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220512154139286.png)

## Fast Refresh：提高 UI 调试效率神器

React Native 快速刷新（Fast Refresh）是默认开启的，你不用做任何额外的配置，就能立刻体验到。

在使用快速刷新时，你应该知道一个提升开发效率的小技巧。我日常开发时习惯把模拟器放在代码编辑器右边，并且会把模拟器勾选window => stay on top选项，在把模拟器置顶在编辑器上方。

这样，我们就能在写代码和调试的同时，立刻看到模拟器中的效果。相比真机调试或者多屏来回切换，置顶模拟器可以减少手离开键盘和视野来回切换的次数，提高你的开发效率。

![img](https://my-doc-1259409954.file.myqcloud.com/MyImages/57463070f313cb6e0e1425ee3930e8f4.png)

### 基础原理：模块热替换

**React Native 的快速刷新功能的最早期版本，叫做热重载 Hot Reload，是基于 Webpack 的模块热替换（Hot Module Replacement）的原理开发的**。

我们写 React Native 之前，都会运行一个 react-native start 命令，启动一个 Metro 服务，而 Metro 服务就实现了模块热替换的功能。Metro 服务会把更新的代码打包发送给 React Native 应用，让应用能够及时更新，那这个过程大概是怎么样的呢？首先，Metro 服务会监听代码文件的变化，当你修改完代码（①），保存文件时（②），Metro 服务就会收到通知。在你保存好后，Metro 就会编译涉及到的更新文件（③），编译完成后再生成一个用于更新的 bundle。而 Metro 的模块热替换服务和 React Native 应用中的模块热替换客户端（HMR Client），在启动时其实已经建立好了 socket 连接。所以，当新 bundle 生成时，模块热替换服务会通过 socket 通知块热替换客户端，热替换客户端实际就是运行在 React Native 应用中的一段 JavaScript 代码，它一开始就执行了一个 socket 监听事件（④）。React Native 收到通知后，就会向请求 bundle 服务发起请求。然后，bundle 服务会返回一个用于更新的 bundle（⑤），并使用 JavaScript 引擎，在原来 React Native 应用的 JavaScript 上下文中执行用于更新的 bundle。这个 bundle 是由多个模块组成的，你修改代码文件对应的模块及其依赖模块都是新模块，新模块会把原先的旧模块替换掉。⑥这就是整个模块热替换的全部过程，这里我放了一张流程图，你可以参考一下：

![img](https://my-doc-1259409954.file.myqcloud.com/MyImages/2fd3716c54b10fe645b9a3d4301cdb15.jpg)

基础的模块热替换功能只能实现组件级别的强制刷新，而组件状态的丢失，会导致开发效率的降低。

### 进阶能力：复用组件及其状态

**简而言之，React Native 的快速刷新功能，就是通过“代理”组件的方式，实现了组件状态不丢失，原生视图不重建。**

![img](https://my-doc-1259409954.file.myqcloud.com/MyImages/6eb61b9eb4d62b0519aed1a2a23e22a9.jpg)

当然，并不是所有情况都会复用状态和原生视图：

> The simple answer is “replace them on the prototype” but even with Proxies, in my experience there are too many gnarly edge cases for this to work reliably.

所以，我给你的建议是，尽可能地拥抱函数组件，放弃类组件。这样你在 UI 调试的时候，就能更多的享受函数组件带来的状态保留好处。特别是一些入口很深的组件，需要多次操作后才能调试，一旦导航、蒙层、滚动之类的组件状态丢失了，整个操作就要重新再来一遍，才能重新进行调试。拥抱函数组件，你的调试效率才会更高。

### 整体策略：逐步降级

快速刷新的整体策略就是逐步降级。如果颗粒度最小的更新不能使用，就换成颗粒度大一些的更新：

代码块：如果你只修改了函数组件中的一些代码块，并且没有改动 hooks 的顺序。快速刷新在复用状态和原生视图的同时，你对该文件的所有修改都会生效，包括样式、渲染逻辑、事件处理、甚至一些副作用；

组件：如果你修改了类组件中的任意代码，快速刷新会使用新的类组件进行重新渲染，原来的状态和原生视图都会被销毁；

模块：如果你修改的模块导出的东西不只是 React 组件，快速刷新将重新执行该模块以及所有依赖它的模块；

React Native 应用：如果你修改的文件被 React 组件树之外的模块引用了，快速刷新将重新渲染整个 React Native 应用。

可以看到，快速刷新的逐步降级策略是，**从更新颗粒度最小代码块开始的，然后是组件、模块，最后是大颗粒度的 React Native 应用。**越小颗粒度的更新，为我们保留了越多原来的状态和环境，我们的开发调试效率也更高。

![image-20220512160143506](https://my-doc-1259409954.file.myqcloud.com/MyImages/image-20220512160143506.png)

## Debug：解决 BUG 思路有哪些？

### 一个模型：发现问题、找到原因、修复 Bug

![img](https://my-doc-1259409954.file.myqcloud.com/MyImages/8326a0d730d4ac2fd526ec02dc7125c0.png)

## 两个原则：不带上线原则和本地复现原则

https://time.geekbang.org/column/article/508776
