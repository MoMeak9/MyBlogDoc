# 容器内列表选择高亮和滚动

基于React和antd技术栈下，对有限容器内列表选择的行进行高亮提示，并且不影响容器内部进行的滚动查看引发的思考，涉及的内容包括overflow熟悉，CSS 类名替换而不是改写style、React Element的复用和性能优化。

## 前置知识

### overflow

overflow 是overflow-x 和overflow-y的简写，用来设定当一块级元素（通常设置了height/max-height）的内容太大而超出范围的时候，元素内容如何加载。

```css
overflow：属性值；
overflow: [overflow-x] [overflow-y];
```

只设定一个值的话，则同时对x和y轴生效，当其中一方被设置了auto的话，visible的表现也会是auto

### 其他用途

- text-overflow 与 overflow 配合用于文字省略

  > 超出文字隐藏：overflow：hidden;
  > 文字不换行：text-wrap:nowrap;

- overflow: hidden 清除浮动

- overflow: hidden 解决外边距折叠问题（触发BFC）

## 分析实践

性能优化选择：

CSS 类名替换而不是改写style

### demo 展示

