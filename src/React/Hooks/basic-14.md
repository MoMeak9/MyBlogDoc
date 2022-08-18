---
date: 2022-08-18
category:
- React
- React Hooks
---

# 如何展示对话框，并给对话框传递参数？

案例导入：处理对话框的误区为了方便你理解这两点，我给你举一个实际场景的例子，你就能明白为什么说在 React 中，常用的对话框是比较难处理的。比如说我们需要实现下面这个截图演示的功能：

![img](https://cdn.yihuiblog.top/images/202208181101388.png)

那么，一般会用类似下面的代码逻辑去实现：

```jsx
function MainLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const showUserModal = (user) => {
    setModalVisible(true);
    setUser(user);
  }
  return (
    <div className="main-layout">
      <Sider onNewUser={showUserModal}/>
      <UserList onEditUser={user => showUserModal(user)}/>
      <UserInfoModal visible={modalVisible} user={user} />
    </div>
  );
}
```

在这段代码中，我们将 UserInfoModal 这个对话框组件定义在了父组件 Layout 中，通过 visible 控制其是否显示。然后再在 Sider 和 UserList 这两个组件中，用自定义事件来告知父组件，用户点击了某个按钮了，应该显示对话框。

### 存在问题

**一、语义隔离不明**

MainLayout 这个组件应该只做布局的事情，而不应该有其他的业务逻辑。但是在这里，由于我们加入了用户信息处理的逻辑，就让本不相关的两块功能产生了依赖。而且，如果要增加另外一个对话框，那意味着又要在 Layout 上增加新的业务逻辑了。这样的话，代码很快就会变得臃肿，且难以理解和维护。

**二、 难以扩展**

现在我们只是在 MainLayout 下面的两个组件共享了对话框，但是如果和 MainLayout 同级的组件也要访问这个对话框呢？又或者， MainLayout 下面的某个深层级的孙子组件也要能显示同一个对话框呢？这样处理的话就会非常麻烦。前者意味着代码需要重构，继续提升状态到父组件；后者意味着业务逻辑处理更复杂，需要通过层层的自定义事件回调来完成。所以，按照 React 方式的做法，或者大多数教程上演示的对话框的用法，其实在实际项目中是会遇到上面所述的各种问题。

**而这些问题的本质就是，一个实现业务逻辑的 Modal 究竟应该在哪个组件中去声明？又该怎么和它进行交互呢？**

## 思路： 使用全局状态管理所有的对话框

基于这样一个设想，我们就来尝试去设计一个 API 去做对话框的全局管理。假设我们将这个对话框的实现命名为 NiceModal，那么我们的目标就是能够用以下的方式去操作对话框：

```js

// 通过 create API 创建一个对话框，主要为了能够全局的控制对话框的展现
const UserInfoModal = NiceModal.create(
  'user-info-modal',
  RealUserInfoModal
);

// 创建一个 useNiceModal 这样的 Hook，用于获取某个 id 的对话框的操作对象
const modal = useNiceModal('user-info-modal');
// 通过 modal.show 显示一个对话框，并能够给它传递参数
modal.show(args);
// 通过 modal.hide 关闭对话框
modal.hide();
```

## 实现：创建 NiceModal 组件和相关 API

首先要考虑的便是如何管理全局状态，在这里我们以 Redux 为例，来创建一个可以处理所有对话框状态的 reducer：

```js
const modalReducer = (state = { hiding: {} }, action) => {
  switch (action.type) {
    case "nice-modal/show":
      const { modalId, args } = action.payload;
      return {
        ...state,
        // 如果存在 modalId 对应的状态，就显示这个对话框
        [modalId]: args || true,
        // 定义一个 hiding 状态用于处理对话框关闭动画
        hiding: {
          ...state.hiding,
          [modalId]: false,
        },
      };
    case "nice-modal/hide":
     const { modalId, force } = action.payload;
      // 只有 force 时才真正移除对话框
      return action.payload.force
        ? {
            ...state,
            [modalId]: false,
            hiding: { [modalId]: false },
          }
        : { ...state, hiding: { [.modalId]: true } };
    default:
      return state;
  }
};
```

这段代码的主要思路就是通过 Redux 的 store 去存储每个对话框状态和参数。在这里，我们设计了两个 action ，分别用来显示和隐藏对话框。特别要注意的是，这里我们加入了 hiding 这样一个状态，用来处理对话框关闭过程的动画，确保用户体验。为了让 Redux 的 action 使用起来更方便，我们可以定义一个 useNiceModal 这样的 Hook，在其内部封装对 Store 的操作，从而实现对话框状态管理的逻辑重用，并以更友好的方式暴露给用户：

```js

// 使用 action creator 来创建显示和隐藏对话框的 action
function showModal(modalId, args) {
  return {
    type: "nice-modal/show",
    payload: {
      modalId,
      args,
    },
  };
}

function hideModal(modalId, force) {
  return {
    type: "nice-modal/hide",
    payload: {
      modalId,
      force,
    },
  };
}

// 创建自定义 Hook 用于处理对话框逻辑
export const useNiceModal = (modalId) => {
  const dispatch = useDispatch();
  // 封装 Redux action 用于显示对话框
  const show = useCallback((args) => {
    dispatch(showModal(modalId, args));
  }, [
    dispatch,
    modalId,
  ]);
  // 封装 Redux action 用于隐藏对话框
  const hide = useCallback((force) => {
    dispatch(hideModal(modalId, force));
  }, [
    dispatch,
    modalId,
  ]);

  const args = useSelector((s) => s[modalId]);
  const hiding = useSelector((s) => s.hiding[modalId]);

  // 只要有参数就认为对话框应该显示，如果没有传递 args，在reducer 中会使用
  // 默认值 true
  return { args, hiding, visible: !!args, show, hide };
};
```

同时，我们可以实现 NiceModal 这样一个组件，去封装通用的对话框操作逻辑。比如关闭按钮，确定按钮的事件处理，等等。为了方便演示，我们以 Ant Design 中的 Modal 组件为例：

```jsx
function NiceModal({ id, children, ...rest }) {
  const modal = useNiceModal(id);
  return (
    <Modal
      onCancel={() => modal.hide()} // 默认点击 cancel 时关闭对话框
      onOk={() => modal.hide()} // 默认点击确定关闭对话框
      afterClose={() => modal.hide(true)} // 动画完成后真正关闭
      visible={!modal.hiding}
      {...rest} // 允许在使用 NiceModal 时透传参数给实际的 Modal
    >
      {children}
    </Modal>
  );
}
```

最后呢，我们用一个第 10 讲提到的容器模式，它会在对话框不可见时直接返回 null，从而不渲染任何内容；并且确保即使页面上定义了 100 个对话框，也不会影响性能：

```jsx
export const createNiceModal = (modalId, Comp) => {
  return (props) => {
    const { visible, args } = useNiceModal(modalId);
    if (!visible) return null;
    return <Comp {...args} {...props} />;
  };
};
```

使用

```jsx

import { Button } from "antd";
import NiceModal, {
  createNiceModal,
  useNiceModal,
} from "./NiceModal";

const MyModal = createNiceModal("my-modal", () => {
  return (
    <NiceModal id="my-modal" title="Nice Modal">
      Hello NiceModal!
    </NiceModal>
  );
});

function MyModalExample() {
  const modal = useNiceModal("my-modal");
  return (
    <>
      <Button type="primary" onClick={() => modal.show()}>
        Show Modal
      </Button>
      <MyModal />
    </>
  );
}
```

通过这个 Modal ID，我们就能够在应用的任何组件中去管理这个对话框了。

### 处理对话框返回值

```js
const modal = useNiceModal('my-modal');
// 实现一个 promise API 来处理返回值
modal.show(args).then(result => {});
```

事实上，要实现这样一个机制并不困难，就是在 useNiceModal 这个 Hook 的实现中提供一个 modal.resolve 这样的方法，能够去 resolve modal.show 返回的 Promise。

代码的核心思路就是将 show 和 resolve 两个函数通过 Promise 联系起来。因为两个函数的调用位置不一样，所以我们使用了一个局部的临时变量，来存放 resolve 回调函数。通过这样的机制，就可以在对话框中去调用 modal.resolve 来返回值了。

```js

// 使用一个 object 缓存 promise 的 resolve 回调函数
const modalCallbacks = {};
export const useNiceModal = (modalId) => {
  const dispatch = useDispatch();
  const show = useCallback(
    (args) => {
      return new Promise((resolve) => {
        // 显示对话框时，返回 promise 并且将 resolve 方法临时存起来
        modalCallbacks[modalId] = resolve;
        dispatch(showModal(modalId, args));
      });
    },
    [dispatch, modalId],
  );
  const resolve = useCallback(
    (args) => {
      if (modalCallbacks[modalId]) {
        // 如果存在 resolve 回调函数，那么就调用
        modalCallbacks[modalId](args);
        // 确保只能 resolve 一次
        delete modalCallbacks[modalId];
      }
    },
    [modalId],
  );
  
  // 其它逻辑...

  // 将 resolve 也作为返回值的一部分
  return { show, hide, resolve, visible, hiding };
};
```

这段示意代码包括两个部分。首先是在 UserList 的表格组件中，由编辑按钮触发对话框的显示，并在对话框返回后，将用户输入更新到表格。第二部分则是在对话框中，用户点击了确定按钮后调用 modal.resolve 方法，将用户输入返回给 UserList 组件，从而完成整个编辑流程。

[演示代码](https://codesandbox.io/s/react-hooks-course-20vzg)
