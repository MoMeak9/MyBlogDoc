---
date: 2022-05-12
category:
- React
- React Hooks
---
# 函数组件设计模式

**所谓设计模式，就是针对特定场景，提供一种公认的最佳实践。**

## 容器模式：实现按条件执行 Hooks

>  Hooks 必须在顶层作用域调用，而不能放在条件判断、循环等语句中，同时也不能在可能的 return 语句之后执行。换句话说，Hooks 必须按顺序被执行到。

这个规则存在的原因就在于，React 需要在函数组件内部维护所用到的 Hooks 的状态，所以我们无法在条件语句中使用 Hooks，这因而会给我们实现业务逻辑带来一定的局限。

比如说，对于一个对话框组件，通过 visible 属性来控制是否显示。那么在 visible 为 false 的时候，其实不应该执行任何对话框内部的逻辑，因为还没展示在 UI 上。

```jsx
import { Modal } from "antd";
import useUser from "../09/useUser";

function UserInfoModal({ visible, userId, ...rest }) {
  // 当 visible 为 false 时，不渲染任何内容
  if (!visible) return null;
  // 这一行 Hook 在可能的 return 之后，会报错！
  const { data, loading, error } = useUser(userId);

  return (
    <Modal visible={visible} {...rest}>
      {/* 对话框的内容 */}
    </Modal>
  );
};
```

可以看到，我们期望在对话框隐藏时通过返回 null 不去渲染任何内容，这个逻辑看上去非常自然直观。但是呢，它却通不过编译，因为在 return 语句之后使用了 useUser 这个 Hook。所以在你的编辑器配置了 React Hooks 的 ESLint 插件之后，会给出下面的错误提示：

![img](https://cdn.yihuiblog.top/images/497d0d88e18a8a75237e7c22c2b9b3fb.png)

<u>解决做法就是**把条件判断的结果放到两个组件之中，确保真正 render UI 的组件收到的所有属性都是有值的。**</u>

可以在 UserInfoModal 外层加一个容器，这样就能实现条件渲染了。实现的代码如下：

```jsx
// 定义一个容器组件用于封装真正的 UserInfoModal
export default function UserInfoModalWrapper({
  visible,
  ...rest, // 使用 rest 获取除了 visible 之外的属性
}) {
  // 如果对话框不显示，则不 render 任何内容
  if (!visible) return null; 
  // 否则真正执行对话框的组件逻辑
  return <UserInfoModal visible {...rest} />;
}
```

在容器模式中我们其实也可以看到，条件的隔离对象是多个子组件，这就意味着它通常用于一些比较大块逻辑的隔离。所以对于一些比较细节的控制，其实还有一种做法，**就是把判断条件放到 Hooks 中去。**

```jsx
const ArticleView = ({ id }) => {
  const { data: article, loading } = useArticle(id);
  let user = null;
  if (article?.userId) user = useUser(article?.userId).data;
  // 组件其它逻辑
}
```

```jsx
function useUser(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // 当 id 不存在，直接返回，不发送请求
    if (!id) return
    // 获取用户信息的逻辑
  });
}
```

<u>通过这样一个容器模式，我们把原来需要条件运行的 Hooks 拆分成子组件，然后通过一个容器组件来进行实际的条件判断，从而渲染不同的组件，实现按条件渲染的目的</u>

## 使用 render props 模式重用 UI 逻辑

**render props 就是把一个 render 函数作为属性传递给某个组件，由这个组件去执行这个函数从而 render 实际的内容。**

在 Class 组件时期，render props 和 HOC（高阶组件）两种模式可以说是进行逻辑重用的两把利器，但是实际上，HOC 的所有场景几乎都可以用 render props 来实现。可以说，**Hooks 是逻辑重用的第一选择。**

不过在如今的函数组件情况下，Hooks 有一个局限，那就是只能用作数据逻辑的重用，而一旦涉及 UI 表现逻辑的重用，就有些力不从心了，而这正是 render props 擅长的地方。所以，即使有了 Hooks，我们也要掌握 render props 这个设计模式的用法。

如果有 UI 展示的逻辑需要重用，那么我们还是必须借助于 render props 的逻辑，这就是我一再强调必须要掌握 render props 这种设计模式的原因。

### 举个栗子



```jsx
import { Popover } from "antd";

function ListWithMore({ renderItem, data = [], max }) {
  const elements = data.map((item, index) => renderItem(item, index, data));
  const show = elements.slice(0, max);
  const hide = elements.slice(max);
  return (
    <span className="exp-10-list-with-more">
      {show}
      {hide.length > 0 && (
        <Popover content={<div style={{ maxWidth: 500 }}>{hide}</div>}>
          <span className="more-items-wrapper">
            and{" "}
            <span className="more-items-trigger"> {hide.length} more...</span>
          </span>
        </Popover>
      )}
    </span>
  );
}
```



```jsx
// 这里用一个示例数据
import data from './data';

function ListWithMoreExample () => {
  return (
    <div className="exp-10-list-with-more">
      <h1>User Names</h1>
      <div className="user-names">
        Liked by:{" "}
        <ListWithMore
          renderItem={(user) => {
            return <span className="user-name">{user.name}</span>;
          }}
          data={data}
          max={3}
        />
      </div>
      <br />
      <br />
      <h1>User List</h1>
      <div className="user-list">
        <div className="user-list-row user-list-row-head">
          <span className="user-name-cell">Name</span>
          <span>City</span>
          <span>Job Title</span>
        </div>
        <ListWithMore
          renderItem={(user) => {
            return (
              <div className="user-list-row">
                <span className="user-name-cell">{user.name}</span>
                <span>{user.city}</span>
                <span>{user.job}</span>
              </div>
            );
          }}
          data={data}
          max={5}
        />
      </div>
    </div>
  );
};
```

可以看到，代码里使用了两个 ListWithMore 组件，通过 renderItem 这个属性，我们可以自主决定该如何渲染每一个列表项，从而把一部分 UI 逻辑抽象出来，形成一个可复用的逻辑，以简化不同场景的使用。
