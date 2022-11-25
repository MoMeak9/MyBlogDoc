# 深入理解JSX

`JSX`在编译时会被`Babel`编译为`React.createElement`方法。这也是为什么在每个使用`JSX`的JS文件中，你必须显式的声明。但在React 17 中，已经不需要显式导入React了。

> React 17 发布在即，尽管我们想对 JSX 的转换进行改进，但我们不想打破现有的配置。于是我们选择[与 Babel 合作](https://babeljs.io/blog/2020/03/16/7.9.0#a-new-jsx-transform-11154httpsgithubcombabelbabelpull11154) ，为想要升级的开发者**提供了一个全新的，重构过的 JSX 转换的版本**。
>
> - 使用全新的转换，你可以单独使用 JSX 而无需引入 React。
> - 根据你的配置，JSX 的编译输出可能会略微改善 bundle 的大小。
> - 它将减少你需要学习 React 概念的数量，以备未来之需。
>来源[介绍全新的 JSX 转换](https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

`JSX`并不是只能被编译为`React.createElement`方法，你可以通过[@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)插件显式告诉`Babel`编译时需要将`JSX`编译为什么函数的调用（默认为`React.createElement`）。

## React.createElement 做了什么

```js
export function createElement(type, config, children) {
  let propName;

  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    // 将 config 处理后赋值给 props
    // ...省略
  }

  const childrenLength = arguments.length - 2;
  // 处理 children，会被赋值给props.children
  // ...省略

  // 处理 defaultProps
  // ...省略

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}

const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // 标记这是个 React Element
    $$typeof: REACT_ELEMENT_TYPE,

    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
  };

  return element;
};
```

我们可以看到，`React.createElement`最终会调用`ReactElement`方法返回一个包含组件数据的对象，该对象有个参数`$$typeof: REACT_ELEMENT_TYPE`标记了该对象是个`React Element`。

`React`提供了验证合法`React Element`的全局API [React.isValidElement (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react/src/ReactElement.js#L547)：

```js
export function isValidElement(object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
```

可以看到，`$$typeof === REACT_ELEMENT_TYPE`的非`null`对象就是一个合法的`React Element`。换言之，在`React`中，所有`JSX`在运行时的返回结果（即`React.createElement()`的返回值）都是`React Element`。

## React Component 分类

`ClassComponent`对应的`Element`的`type`字段为`AppClass`自身。

`FunctionComponent`对应的`Element`的`type`字段为`AppFunc`自身。

同时，AppClass 和 AppFunc  都是函数类型

```js
AppClass instanceof Function === true;
AppFunc instanceof Function === true;
```

所以无法通过引用类型区分`ClassComponent`和`FunctionComponent`。`React`通过`ClassComponent`实例原型上的`isReactComponent`变量判断是否是`ClassComponent`。

```js
ClassComponent.prototype.isReactComponent = {};
```

## 由JSX生成Fiber节点

从上面的内容我们可以发现，`JSX`是一种描述当前组件内容的数据结构，他不包含组件**schedule**、**reconcile**、**render**所需的相关信息。

比如如下信息就不包括在`JSX`中：

-   组件在更新中的`优先级`
-   组件的`state`
-   组件被打上的用于**Renderer**的`标记`

**这些内容都包含在`Fiber节点`中。**

所以，在组件`mount`时，`Reconciler`根据`JSX`描述的组件内容生成组件对应的`Fiber节点`。

在`update`时，`Reconciler` 将`JSX`与`Fiber节点`保存的数据对比，生成组件对应的`Fiber节点`，并根据对比结果为`Fiber节点`打上`标记`。