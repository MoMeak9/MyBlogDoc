> 原文链接：https://darios.blog/posts/do-not-pass-dtos-to-ui-components
>
> 作者：dario's.blog
>
> 原标题：Do not pass DTOs to UI components

作为前端开发人员，我们经常使用来自后端 API 或服务的数据传输对象 （DTOs, data transfer objects）。这些 DTO 表示用于在网络中传输的原始数据结构。然而，在 UI 组件中直接使用 DTOs 可能会导致可维护性、可重用性和关注点分离方面的问题。

## **DTO 反模式**

将 DTOs 作为 props 直接传递给 UI 组件会将 UI 组件与后端的数据传输结构紧密耦合。当后端数据模型发生变化时，这可能会使得发展或重构组件接口变得困难，并且它们可能会在开发的早期阶段发生重大变化。直接在组件中使用 DTOs 也会违反最小权限原则，因为它为组件提供的数据超过了它们需要的数据。最后，将传输数据直接使用到组件中会模糊数据访问和 UI 呈现角色之间的界限。

我们应该引入一个数据访问层，而不是将原始 DTOs 传递给组件，利用该层充当我们的 UI 和后端服务之间的抽象边界。

## 数据访问层

将数据访问层视为一个映射层，该映射层将后端 DTOs 转换为专门针对应用程序 UI 需求而构建的简化对象模型。这可能意味着平展嵌套对象、选取属性子集、派生计算字段或任何其他必要的数据转换。

数据访问层本质上隔离了传输数据模型，防止它们泄漏到你的 UI 组件的域中并污染它。组件只需要知道为其特定职责塑形的对象模型，而不是数据在幕后传输的各种细节。

例如，假设你有一个后端 DTOs 用于博客文章，看起来像这样：

```ts
{
  id: "abc123",
  authorId: 42,
  title: "New Blog Post",
  content: "This is my new blog post...",
  metadata: {
    createdAt: "2022-01-15T08:25:00Z",
    updatedAt: "2022-01-15T08:25:00Z",
    tags: ["react", "javascript"]
  }
}
```

你的数据访问层可以将此 DTOs 映射为一个为 UI 渲染而设计的简化的 `Post` 对象：

数据访问层可以将此 DTOs 映射到专为在 UI 中呈现而设计的简化 `Post` 对象：

```ts
{
  id: "abc123",
  author: "Jane Doe",
  title: "New Blog Post",
  content: "This is my new blog post...",
  formattedDate: "January 15, 2022",
  tags: ["react", "javascript"]
}
```

请注意，后一个对象如何省略 UI 不需要的无关属性，例如 `authorId`。它还映射和派生新字段，如 author 和 `formattedDate`，这些字段是用于显示目的的更有用的抽象。

## **遵守抽象边界**

有了数据访问层来将 DTOs 转换为 UI 友好的视图模型，我们还可以在适当的抽象级别设计 UI 组件属性和接口。靠近组件树根目录的容器组件可以使用表示整个页面、屏幕或复杂功能的更高级别的抽象。

随着我们对组件层次结构的深入研究，我们可以引入更精细的抽象，其中更纤细的接口只关注其专用 UI 关注点所需的数据。这使我们能够遵守[最小权限原则](https://en.wikipedia.org/wiki/Principle_of_least_privilege) - 只为组件提供它们需要的精确数据，而不是更多。

例如，顶级 `BlogPost` 组件可能需要整个帖子数据模型来协调标题、内容、元数据等的呈现子组件：

```tsx
// BlogPost.jsx
const BlogPost = ({ post }) => {
  return (
    <article>
      <BlogPostHeader
        title={post.title}
        formattedDate={post.formattedDate}
        tags={post.tags}
      />
      <BlogPostContent content={post.content} />
    </article>
  )
}
```

而 `BlogPostHeader` 组件只需要该数据的一个子集：

```tsx
// BlogPostHeader.js
const BlogPostHeader = ({ title, formattedDate, tags }) => {
  return (
    <header>
      <h1>{title}</h1>
      <time>{formattedDate}</time>
      <BlogPostTags tags={tags} />
    </header>
  )
}
```

`BlogPostTags` 组件需要的更少：

```tsx
// BlogPostTags.js
const BlogPostTags = ({ tags }) => {
  return (
    <ul>
      {tags.map(tag => <li key={tag}>{tag}</li>)}
    </ul>
  )
}
```

通过保留抽象边界并有意识地对组件接口进行建模，我们可以构建一个更加模块化和可维护的 UI 架构。数据访问层将组件与后端数据模型中的更改隔离开来，而简化的属性则有助于更好地重用和组合 UI 元素。

因此，下次你处理前端应用程序时，请尝试单独考虑每个组件的接口。它真的需要你提供的大量数据吗？或者它可以用更少的数据工作吗？看看你是如何使用 API 中的数据的。通过线路传输的对象位于比 UI 中的组件更低的抽象层上，因此组件的接口应反映这一点。
