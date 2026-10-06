> 原标题：Making WebAssembly better for Rust & for all languages
>
> 作者：Lin Clark
>
> 链接：https://hacks.mozilla.org/2018/03/making-webassembly-better-for-rust-for-all-languages/



2018 年 Rust 社区的一大目标是成为一门网络语言。通过瞄准 WebAssembly，Rust 可以像 JavaScript 一样在网络上运行。但这意味着什么？是否意味着 Rust 试图取代 JavaScript？

答案是否定的。我们并不期望 Rust WebAssembly 应用完全用 Rust 编写。事实上，我们预计大部分应用代码仍将是 JS，即便在多数 Rust WebAssembly 应用中也是如此。

这是因为 JavaScript 是大多数场景的理想选择。使用 JavaScript 可以快速轻松地启动和运行。更重要的是，JavaScript 开发者组成的蓬勃生态系统为网络上的各类问题创造了极具创新性的解决方案。

[![Rust logo and JS logo with a heart in between](https://fs.yihuiblog.top/i/2025/06/15/8abc709c-bf8a-6b82-c4e2-4b47406c67fc-0.png)](https://hacks.mozilla.org/wp-content/uploads/2018/03/01_rust_loves_js.png)

但对于应用的某些特定部分，Rust+WebAssembly 才是合适的工具...比如当你需要[解析源码映射](https://hacks.mozilla.org/2018/01/oxidizing-source-maps-with-rust-and-webassembly/)时，或是像 [Ember](https://www.youtube.com/watch?v=qfnkDyHVJzs&feature=youtu.be&t=5880) 那样计算 DOM 变更时。

因此，对于 Rust 和 WebAssembly 来说，前进的道路不仅仅是将 Rust 编译成 WebAssembly。我们需要确保 WebAssembly 能够融入 JavaScript 生态系统。Web 开发者需要能像使用 JavaScript 那样轻松地使用 WebAssembly。

但 WebAssembly 目前尚未达到这一目标。为了实现这一愿景，我们需要构建工具来简化 WebAssembly 的加载过程，并使其与 JavaScript 的交互更加顺畅。这项工作不仅将助力 Rust 的发展，也将惠及所有以 WebAssembly 为编译目标的其他语言。

[![Pipeline from compiling, to generating bindings, to packaging, to bundling](https://fs.yihuiblog.top/i/2025/06/15/8ddd9fb4-feed-9bd5-034a-91b6ce930c16-0.png)](https://hacks.mozilla.org/wp-content/uploads/2018/03/02_pipeline.png)

我们正在解决哪些 WebAssembly 的可用性挑战？以下是几个关键方向：

1. 如何简化 WebAssembly 与 JavaScript 之间的对象传递？
2. 如何将所有内容打包到 [npm](https://www.npmjs.com/)？
3. 开发者如何轻松地在打包工具或浏览器中结合使用 JS 和 WASM 包？

但首先，我们能在 Rust 中实现什么？

Rust 将能够调用 JavaScript 函数。JavaScript 将能够调用 Rust 函数。Rust 将能够调用来自主机平台的函数，比如 `alert`。Rust 的 crate 将能够依赖 npm 包。在整个过程中，Rust 和 JavaScript 将以双方都能理解的方式传递对象。

[![Rust crate graph](https://fs.yihuiblog.top/i/2025/06/15/bdd2d31c-8e82-da1e-2999-2518fed33c89-0.png)](https://hacks.mozilla.org/wp-content/uploads/2018/03/03_crate_graph.png)

这就是我们在 Rust 中实现的目标。现在让我们看看需要解决的 WebAssembly 可用性挑战。

### 问：如何简化 WebAssembly 与 JS 之间的对象传递？

答： [wasm-bindgen](https://github.com/alexcrichton/wasm-bindgen)

使用 WebAssembly 最困难的部分之一就是让不同类型的值传入和传出函数。这是因为 WebAssembly 目前只支持两种类型：整数和浮点数。

这意味着你不能直接将字符串传入 WebAssembly 函数。相反，必须通过一系列步骤：

1. 在 JavaScript 端，使用类似 TextEncoder API 将字符串编码为数字
   [![Encoder ring encoding Hello into number equivalent](https://fs.yihuiblog.top/i/2025/06/15/6bddb065-8ed2-f01a-a50f-68c686e91288-0.png)](https://hacks.mozilla.org/wp-content/uploads/2018/03/04_wasm_bindgen_01.png)
2. 将这些数字放入 WebAssembly 的内存中（本质上是一个数字数组）
   [![JS putting numbers into WebAssembly's memory](https://fs.yihuiblog.top/i/2025/06/15/820920ec-d4fc-9de1-fa4c-bc404202295e-0.png)](https://hacks.mozilla.org/wp-content/uploads/2018/03/04_wasm_bindgen_02.png)
3. 将字符串首字母的数组索引传递给 WebAssembly 函数
   [![img](https://hacks.mozilla.org/wp-content/uploads/2018/03/04_wasm_bindgen_03-500x295.png)](https://hacks.mozilla.org/wp-content/uploads/2018/03/04_wasm_bindgen_03.png)
4. 在 WebAssembly 端，使用该整数作为指针来提取数字
   [![img](https://fs.yihuiblog.top/i/2025/06/15/11a78968-e8f8-466b-8e33-0eb55cfb66f8-0.png)](https://hacks.mozilla.org/wp-content/uploads/2018/03/04_wasm_bindgen_04.png)

而这仅仅是处理字符串所需的工作。如果涉及更复杂的数据类型，那么来回传递数据的流程将变得更加繁琐。

如果你大量使用 WebAssembly 代码，很可能会将这类胶水代码抽象成库。但要是根本不用编写这些胶水代码岂不更好？如果只需跨语言边界传递复杂值，它们就能自动生效呢？

这就是 `wasm-bindgen` 的作用。当你为 Rust 代码添加一些注解时，它会自动生成所需代码（双向），使更复杂的类型能够正常工作。

[![JS passing the string Hello to wasm-bindgen, which does all of the other work](https://hacks.mozilla.org/wp-content/uploads/2018/03/05_wasm_bindgen_2-500x261.png)](https://hacks.mozilla.org/wp-content/uploads/2018/03/05_wasm_bindgen_2.png)

这意味着从 Rust 调用 JS 函数时可以使用这些函数所期望的任何类型：

```
#[wasm_bindgen]
extern {
    type console;

    #[wasm_bindgen(static = console)]
    fn log(s: &str);
}
#[wasm_bindgen]
pub fn foo() {
    console::log("hello!");
}
```

… 或者在 Rust 中使用结构体，并让它们在 JS 中像类一样工作：

```
// Rust
#[wasm_bindgen]
pub struct Foo {
    contents: u32,
}

#[wasm_bindgen]
impl Foo {
    pub fn new() -> Foo {
        Foo { contents: 0 }
    }
    pub fn add(&mut self, amt: u32) -> u32 {
        self.contents += amt;
        return self.contents
    }
}
// JS
import { Foo } from "./js_hello_world";
let foo = Foo.new();
assertEq(foo.add(10), 10);
foo.free();
```

……或者许多其他便利功能。

从底层看，`wasm-bindgen` 的设计是语言无关的。这意味着随着工具的稳定，未来有望扩展对其他语言（如 C/C++）结构的支持。

Alex Crichton 将在未来几周内撰写更多关于 `wasm-bindgen` 的内容，敬请关注这篇即将发布的文章。

### 问：开发者如何轻松地在打包工具、浏览器或 Node 中结合使用 JS 和 WASM？

A. ES 模块

既然我们已经将 WebAssembly 发布到 npm 上，那么如何在 JS 应用中便捷地使用这些 WebAssembly 呢？

让添加 WebAssembly 包作为依赖变得简单……以便将其纳入 JS 模块的依赖图中。

[![module graph with JS and WASM modules](https://fs.yihuiblog.top/i/2025/06/15/5c6de96d-623b-382c-96c8-4beee27e5960-0.png)](https://hacks.mozilla.org/wp-content/uploads/2018/03/02_js_wasm_graph.png)

目前，WebAssembly 拥有用于创建模块的命令式 JS API。从文件获取到依赖项准备，每个步骤都需要编写代码来实现。这项工作相当繁琐。

但随着浏览器原生模块支持的实现，我们可以添加声明式 API。具体来说，我们可以使用 ES 模块 API。这样一来，处理 WebAssembly 模块就会像导入它们一样简单。

[![import {myFunction} from "myModule.wasm"](https://fs.yihuiblog.top/i/2025/06/15/e2b767f6-a431-1bdd-180c-7f7e8a95fb35-0.png)](https://hacks.mozilla.org/wp-content/uploads/2018/03/08_import_2.png)

我们正在与 TC39 和 WebAssembly 社区小组合作，以将其标准化。

但我们不仅需要标准化 ES 模块支持。即便浏览器和 Node 支持了 ES 模块，开发者可能仍会使用打包工具。这是因为打包工具能减少模块文件所需的请求次数，从而缩短代码下载时间。

打包工具通过将不同文件中的多个模块合并为一个文件来实现这一点，然后在文件顶部添加少量运行时代码来加载它们。

[![a module graph being combined into a single file](https://hacks.mozilla.org/wp-content/uploads/2018/03/18_bundle_graph_02-500x296.png)](https://hacks.mozilla.org/wp-content/uploads/2018/03/18_bundle_graph_02.png)

短期内，打包工具仍需使用 JS API 来创建模块。但用户将使用 ES 模块语法编写代码。这些用户会期望他们的模块能像 ES 模块一样运作。我们需要为 WebAssembly 添加一些功能，使打包工具更容易模拟 ES 模块行为。

我将撰写更多关于为 WebAssembly 规范添加 ES 模块集成的工作。在接下来的几个月里，我还将深入探讨打包工具及其对 WebAssembly 的支持。

### 结语

要成为一门实用的 Web 语言，Rust 需要与 JavaScript 生态系统良好协作。我们还有一些工作要做才能实现这一目标，幸运的是，这些工作也将惠及其他语言。您想帮助改进 WebAssembly 对每种语言的支持吗？加入我们吧！我们很乐意[帮助您入门 ](http://fitzgeraldnick.com/2018/02/27/wasm-domain-working-group.html) 😀