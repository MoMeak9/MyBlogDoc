# Webpack 工作流程

Webpack 最核心的功能依然是：**At its core, webpack is a static module bundler for modern** **JavaScript** **applications**，也就是所谓的**静态模块打包能力**。

**一是使用适当 Loader 将任意类型文件转译为 JavaScript 代码**，例如将 CSS 代码转译为 JS 字符串，将多媒体文件转译为 Base64 代码等；

**二是将这些经过 Loader 处理的文件资源合并、打包成向下兼容的产物文件。**

总体逻辑步骤：

<img src="https://cdn.yihuiblog.top/images/202208191658874.png" alt="image-20220819165737954" style="zoom:67%;" />

为了实现这些功能，Webpack 底层的工作流程大致可以总结为这么几个阶段：

简化步骤：

<img src="https://cdn.yihuiblog.top/images/202208191657288.webp" alt="image.png" style="zoom:67%;" />

1. **初始化阶段**：修整配置参数，创建 Compiler、Compilation 等基础对象，并初始化插件及若干内置工厂、工具类，并最终根据 `entry` 配置，找到所有入口模块；

   > 「**初始化**」的重点是根据用户配置设置好构建环境；

2. **构建阶段**：从 `entry` 文件开始，调用 `loader` 将模块转译为 JavaScript 代码，调用 **Acorn** 将代码转换为 AST 结构，遍历 AST 从中找出该模块依赖的模块；之后 **递归** 遍历所有依赖模块，找出依赖的依赖，直至遍历所有项目资源后，构建出完整的**模块依赖关系图**；

   > 「**构建阶段**」则重在解读文件输入与文件依赖关系；

3. **生成阶段**：根据 `entry` 配置，将模块组装为一个个 Chunk 对象，之后调用一系列 Template 工厂类翻译 Chunk 代码并封装为 Asset，最后写出到文件系统。

   > 最后在「**生成阶段**」按规则组织、包装模块，并翻译为适合能够直接运行的产物包;

### 初始化阶段：

- **初始化参数**：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数；
- **创建编译器对象 **：用上一步得到的参数创建 Compiler 对象；
- **初始化编译环境**：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等；
- **开始编译**：执行 compiler 对象的 run 方法，创建 Compilation 对象；
- **确定入口**：根据配置中的 `entry` 找出所有的入口文件，调用 `compilation.addEntry` 将入口文件转换为 `dependence` 对象。

![image.png](https://cdn.yihuiblog.top/images/202208191709506.webp)



### 构建阶段：

- **编译模块(make)**：从 `entry` 文件开始，调用 `loader` 将模块转译为标准 JS 内容，调用 JS 解析器将内容转换为 AST 对象，从中找出该模块依赖的模块，再 **递归** 处理这些依赖模块，直到所有入口依赖的文件都经过了本步骤的处理；
- **完成模块编译**：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的`依赖关系图`。

![img](https://cdn.yihuiblog.top/images/202208191712130.webp)





### 封装生成阶段：

- **合并(seal)**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`；
- **优化(optimization)**：对上述 `Chunk` 施加一系列优化操作，包括：tree-shaking、terser、scope-hoisting、压缩、Code Split 等；
- **写入文件系统(emitAssets)**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

<img src="https://cdn.yihuiblog.top/images/202208191716020.webp" alt="image.png" style="zoom:67%;" />
