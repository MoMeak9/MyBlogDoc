在当今数字化时代，浏览器已经成为人们生活中不可或缺的一部分。无论是在个人计算机、移动设备还是智能电视上，浏览器都是人们访问互联网内容的重要工具。对于开发者来说，了解用户使用的浏览器的供应商和版本信息至关重要，因为不同的浏览器可能会有不同的渲染器，这可能会对网页的显示和功能产生影响。而在浏览器中，WebGL是一种用于在网页上呈现3D图形的技术。通过WebGL，开发者可以使用JavaScript编写代码，利用GPU来进行图形渲染，从而实现更加流畅和逼真的视觉效果。

如果我们想要获取浏览器中WebGL渲染器的供应商和版本信息，可以使用WebGLRenderingContext的getExtension方法来获取WEBGL_debug_renderer_info扩展。这个扩展提供了一些额外的函数和常量，用于获取渲染器的详细信息。

> 注意：根据浏览器的隐私设置，此扩展可能仅适用于特权上下文或根本不工作。在Firefox中，如果 `privacy.resistFingerprinting` 设置为 `true` ，则此扩展将被禁用。且此扩展可用于WebGL1和WebGL2上下文。

## 获取WebGL渲染器的供应商和版本信息

我们需要获取WebGLRenderingContext的实例。通常，我们可以通过canvas元素的getContext方法来获取WebGLRenderingContext实例。代码如下所示：

```js
const canvas = document.createElement("canvas")
const gl = canvas.getContext('webgl');
```

接下来，我们可以使用getExtension方法来获取WEBGL_debug_renderer_info扩展的实例。如果扩展名称（区分大小写）与 `WebGLRenderingContext.getSupportedExtensions` 中的任何结果都不匹配，则只会返回 `null`。代码如下所示：

```js
const extension = gl.getExtension('WEBGL_debug_renderer_info');
```

一旦我们获取了扩展的实例，我们就可以使用它提供的常量来获取供应商和渲染器的信息。在`WEBGL_debug_renderer_info`扩展中，有两个常量可以用于获取供应商和渲染器的信息，分别是`UNMASKED_VENDOR_WEBGL`和`UNMASKED_RENDERER_WEBGL`。我们可以通过调用getParameter方法，并传入这两个常量，来获取相应的信息。代码如下所示：

```js
const vendor = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
const renderer = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
```

最后，我们可以使用console.log方法将供应商和渲染器的信息打印到控制台上，以便进一步的使用和分析。代码如下所示：

```js
console.log('Vendor:', vendor);
console.log('Renderer:', renderer);

// Vendor: Google Inc. (Apple)
// Renderer: ANGLE (Apple, Apple M2 Pro, OpenGL 4.1)

// 用完别忘了删除节点 canvas.remove()
```

通过以上步骤，我们可以在浏览器中使用WebGL获取渲染器的供应商和版本信息。这对于开发者来说非常有用，可以根据不同的渲染器做出相应的优化和适配，以提供更好的用户体验。

## 获取webglStr

同上文内容，我们有时候想要直接获取webglStr的字符描述信息，即webgl信息，可以通过：

```js
const canvas = document.createElement("canvas")
const gl = canvas.getContext("webgl")
const webglStr = gl.getParameter(gl.VERSION)
```

通过这种方式，我们可以在前端浏览器中获取到webglStr，即webgl的版本字符串。这对于开发基于webgl的图形应用程序或游戏非常有用，因为它可以提供有关浏览器支持的webgl版本的重要信息。
## 参考

- [WEBGL_debug_renderer_info extension - Web APIs | MDN --- WEBGL_debug_renderer_info扩展—Web API| MDN](https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_renderer_info)
- [WebGLRenderingContext.getExtension() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getExtension)
- [WebGLRenderingContext.getParameter() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getParameter)