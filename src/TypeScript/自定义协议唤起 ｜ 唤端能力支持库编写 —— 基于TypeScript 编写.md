此前发现了社区非常nice的检测浏览器（FF、Chrome、IE8、IE9、IE10、IE11、Edge）是否有自定义协议的仓库 - [vireshshah/custom-protocol-check: Detect whether a custom protocol is available in browser (FF, Chrome, IE8, IE9, IE10, IE11, and Edge)](https://github.com/vireshshah/custom-protocol-check)。他的存在正因为不同浏览器的实现方式不同，有时还甚至取决于操作系统。日常开发中的大部分实现都是一些技巧性的方法，意味着解决方案可能不是最优雅的。当然它已经提供了npm 包 [custom-protocol-check](https://www.npmjs.com/package/custom-protocol-check)，本教程中的TypeScript实现，更多的是学习他人的代码和提供完善的TypeScript类型支持（或许之后我也会发布一个TypeScript版本的npm包？持续更新中......）

## 开始搞起

我希望以Class的方式去使用ProtocolCheck的能力，所以我们先按照这个思路去设计：

```ts
export class ProtocolCheck {
    private readonly userAgent: string = ""
    private defaultCustomFailTimeOut: number = 2000
    constructor() {
        this.userAgent = isSSR() ? "" : navigator.userAgent
    }
}
```

考虑到node环境，通过调用isSSR()函数来判断是否在服务器端渲染环境中，如果是的话，userAgent属性被赋值为空字符串，否则使用navigator.userAgent获取用户代理信息并赋值给userAgent属性。

```ts
export const isSSR = (): boolean => {
    return typeof window === "undefined"
}
```

## 你是什么浏览器？

接下来是必要的基础方法，用于判断用户的浏览器类别：

```ts
export class ProtocolCheck {
  //...
	userAgentContains(browserName: string): boolean {
        browserName = browserName.toLowerCase()
        return this.userAgent.toLowerCase().indexOf(browserName) > -1
  }
  //...
}
```

该方法用于检查用户代理字符串中是否包含指定的浏览器名称。它首先将传入的浏览器名称转换为小写，然后使用`indexOf`方法在用户代理字符串中查找该名称，如果找到则返回`true`，否则返回`false`。

此方法服务于我们的判断函数：

```ts
export class ProtocolCheck {
  //...
  isOSX(): boolean {
        return this.userAgentContains("Macintosh")
    }

    isFirefox(): boolean {
        return this.userAgentContains("firefox")
    }

    isInternetExplorer(): boolean {
        return this.userAgentContains("trident")
    }

    /**
     * Detects IE 11 and older
     * @return {Boolean} Returns true when IE 11 and older
     */
    isIE(): boolean {
        const ua = this.userAgent.toLowerCase()

        const msie = ua.indexOf("msie")
        if (msie > 0) {
            // IE 10 or older
            return true
        }

        const trident = ua.indexOf("trident/")
        if (trident > 0) {
            // IE 11
            return true
        }

        // other browser
        return false
    }

    isEdge(): boolean {
        const ua = this.userAgent.toLowerCase()
        const edge = ua.indexOf("edge")
        return edge > 0
    }

    isChrome(): boolean {
        // IE11 returns undefined for window.chrome
        // and new Opera 30 outputs true for window.chrome
        // but needs to check if window.opr is not undefined
        const isChromium = window.chrome
        const winNav = window.navigator
        const vendorName = winNav.vendor
        const isOpera = typeof window.opr !== "undefined"
        const isIEedge = winNav.userAgent.indexOf("Edge") > -1
        const isIOSChrome = winNav.userAgent.match("CriOS")
        return !!(
            (isChromium !== null &&
                typeof isChromium !== "undefined" &&
                vendorName === "Google Inc." &&
                !isOpera &&
                !isIEedge) ||
            isIOSChrome
        )
    }

    isOpera(): boolean {
        return this.userAgentContains("OPR/")
    }
 		//...
}
```

其中比较特殊的是IE和Chrome浏览器的判断。`isIE` 函数内部首先将`this.userAgent`转换为小写，然后使用`indexOf`方法查找字符串中是否包含"msie"和"trident/"。如果包含"msie"，则表示是IE 10或更早版本，返回`true`。如果包含"trident/"，则表示是IE 11，返回`true`。如果都不包含，则表示是其他浏览器，返回`false`。

而对于Chrome浏览器的判断，通过几个变量：

- isChromium: 检测 window.chrome 是否存在且不为 null

  > 在大多数Chrome浏览器中，这个属性是存在的，但在IE11中，这个属性是`undefined`。新版本的Opera浏览器虽然也有这个属性，但是它还有一个`window.opr`属性。

- winNav: 获取 window.navigator 对象

- vendorName: 获取浏览器厂商信息

- isOpera: 检测 window.opr 是否存在，用于排除 Opera 浏览器

- isIEedge: 检测 userAgent 是否包含 Edge 关键字，用于排除 Edge 浏览器

- isIOSChrome: 通过匹配 userAgent 中的 CriOS 关键字检测是否为 iOS 系统的 Chrome 浏览器

如果以上结果同时满足：

- isChromium 存在且不为 null
- vendorName 为 "Google Inc.",说明浏览器厂商是 Google
- 不是 Opera 浏览器(isOpera 为 false)
- 不是 IE Edge 浏览器(isIEedge 为 false)

- 或者是 iOS 系统的 Chrome 浏览器(isIOSChrome 为 true)

则返回 true,表示是 Chrome 浏览器

### 获取浏览器版本

```ts
/**
* @description 获取浏览器版本
* @returns {number} 浏览器版本
*/
getBrowserVersion(): number {
  const ua = this.userAgent
  let tem
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return parseFloat(tem[1])
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
    if (tem !== null) {
      return parseFloat(tem[2])
    }
  }
  M = M[2] ? [M[1], M[2]] : [window.navigator.appName, window.navigator.appVersion, "-?"]
  if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1])
  return parseFloat(M[1])
}
```

代码首先获取用户代理字符串（ua），然后定义了两个变量tem和M。变量M通过正则表达式匹配用户代理字符串中的浏览器名称和版本号。如果匹配成功，它会返回一个数组，其中M[1]是浏览器名称，M[2]是浏览器版本号。

接下来，代码检查是否是IE浏览器（通过检查M[1]是否包含"trident"）。如果是IE浏览器，它会使用正则表达式从用户代理字符串中提取版本号，并将其转换为浮点数后返回。

如果不是IE浏览器，代码继续检查浏览器是否是Chrome。如果是Chrome浏览器，它会尝试从用户代理字符串中提取Edge或OPR浏览器的版本号，并返回该版本号。最后，如果以上条件都不满足，代码将使用浏览器的名称和版本号作为备用值，并从中提取版本号。

## 工具方法

### 检查协议

```ts
export interface IProtocolCheckOptions {
  uri: string
  failCb?: () => void
  successCb?: () => void
  timeout?: number
  unsupportedCb?: () => void
}

protocolCheck({ uri, failCb, successCb, timeout, unsupportedCb }: IProtocolCheckOptions) {
  const failCallback = () => {
    failCb?.()
  }
  const successCallback = () => {
    successCb?.()
  }

  const openUri = () => {
    if (this.isFirefox()) {
      const browserVersion = this.getBrowserVersion()
      if (browserVersion >= 64) {
        this.openUriWithHiddenFrame(uri, failCallback, successCallback)
      } else {
        this.openUriUsingFirefox(uri, failCallback, successCallback)
      }
    } else if (this.isChrome()) {
      this.openUriWithTimeoutHack(uri, failCallback, successCallback)
    } else if (this.isOSX()) {
      this.openUriWithHiddenFrame(uri, failCallback, successCallback)
    } else {
      // not supported, implement please
      unsupportedCb?.()
    }
  }

  if (timeout) {
    this.defaultCustomFailTimeOut = timeout
  }

  if (this.isEdge() || this.isIE()) {
    //for IE and Edge in Win 8 and Win 10
    this.openUriWithMsLaunchUri(uri, failCallback, successCallback)
  } else {
    if (document.hasFocus()) {
      openUri()
    } else {
      const focusHandler = this.registerEvent(window, "focus", () => {
        focusHandler.remove()
        openUri()
      })
      }
  }
}

// 工具方法
createHiddenIframe = (target: HTMLElement, uri: string): HTMLIFrameElement => {
  const iframe = document.createElement("iframe")
  iframe.src = uri
  iframe.id = "hiddenIframe"
  iframe.style.display = "none"
  target.appendChild(iframe)
  return iframe
}

registerEvent = (
  target: Window | HTMLElement,
  eventType: string,
  cb: () => void
): { remove: () => void } => {
  target.addEventListener(eventType, cb)
  return {
    remove: () => {
      target.removeEventListener(eventType, cb)
    }
  }
}
```

它接受一个对象作为参数，该对象具有属性`uri`、`failCb`、`successCb`、`timeout`和`unsupportedCb`。函数首先定义了两个回调函数`failCallback`和`successCallback`，稍后在代码中调用这些函数。

然后，函数定义了另一个名为`openUri`的函数，它使用各种方法（`isFirefox`、`isChrome`、`isOSX`、`isEdge`、`isIE`）检查浏览器类型，并根据不同的情况执行不同的操作。

如果浏览器是Firefox，并且版本大于等于64，则使用提供的`uri`、`failCallback`和`successCallback`作为参数调用`openUriWithHiddenFrame`函数。否则，使用相同的参数调用`openUriUsingFirefox`函数。

如果浏览器是Chrome，则使用提供的参数调用`openUriWithTimeoutHack`函数。

如果浏览器是OSX，则也使用提供的参数调用`openUriWithHiddenFrame`函数。

如果以上条件都不满足，则调用`unsupportedCb`回调函数（如果存在）。

接下来，如果提供了`timeout`值，则将`defaultCustomFailTimeOut`属性设置为该值。然后，检查浏览器是否为Edge或IE。如果是，则使用提供的参数调用`openUriWithMsLaunchUri`函数。

如果文档具有焦点，则立即调用`openUri`函数。否则，它注册一个`focus`事件的事件监听器，并在触发事件时调用`openUri`函数。

这段代码检查浏览器类型，并根据浏览器类型和版本执行不同的操作。它还处理超时，并在执行某些操作之前将焦点放在文档上。

接下来我们继续补充这些被不同浏览器or版本下调用的工具函数，以获得最大的兼容性

### `openUriWithHiddenFrame`

```ts
openUriWithHiddenFrame(uri: string, failCb: () => void, successCb: () => void): void {
  const timeout = setTimeout(function () {
    failCb()
    handler.remove()
  }, this.defaultCustomFailTimeOut)

  const iframe = this.createHiddenIframe(document.body, uri)

  const onBlur = () => {
    clearTimeout(timeout)
    handler.remove()
    successCb()
  }

  const handler = this.registerEvent(window, "blur", onBlur)

  iframe.contentWindow!.location.href = uri
}
```

主要逻辑：

1. 创建一个隐藏的 iframe,并将其添加到 document.body 中。
2. 在 iframe 的 src 属性上设置要加载的 uri。这会触发对该 uri 的请求。
3. 设置一个超时定时器 timeout,如果在默认时间内没有加载成功，就执行失败回调 failCb。
4. 注册 window 的 blur 事件，在 iframe 加载完成后，window 会失去焦点，触发 blur 事件。
5. 在 blur 事件回调函数 onBlur 中，清除超时定时器，移除事件监听，并执行成功回调 successCb。
6. 这样就实现了使用 iframe 加载 uri,并在加载完成时执行回调，同时处理了加载超时的情况。

它实现了一个带超时处理的 iframe 加载 uri 的机制，通过 blur 事件判断加载是否成功。

### `openUriWithTimeoutHack`

```ts
openUriWithTimeoutHack(uri: string, failCb: () => void, successCb: () => void): void {
  const timeout = setTimeout(function () {
    failCb()
    handler.remove()
  }, this.defaultCustomFailTimeOut)

  // handle page running in an iframe (blur must be registered with top level window)
  let target = window as Window
  while (target.parent && target !== target.parent) {
    target = target.parent
  }

const onBlur = () => {
  clearTimeout(timeout)
  handler.remove()
  successCb()
}

const handler = this.registerEvent(target, "blur", onBlur)

window.location.href = uri
}
```

主要逻辑：

1. 设置一个定时器timeout,在默认超时时间defaultCustomFailTimeOut后执行失败回调函数failCb。
2. 获取顶层窗口对象target,以处理页面在iframe内的情况。
3. 定义blur事件处理函数onBlur,在blur事件触发时清除定时器，移除事件监听，并执行成功回调函数successCb。
4. 在顶层窗口target上注册blur事件监听器handler。
5. 打开目标网页URI。
6. 如果在超时时间内页面失去焦点(触发blur事件)，则说明目标页面已打开，清除定时器，执行成功回调。
7. 如果超时时间耗尽，则执行失败回调。

同样通过blur事件判断目标页面是否打开，以实现打开网页的超时检测。

### `openUriUsingFirefox`

```ts
openUriUsingFirefox(uri: string, failCb: () => void, successCb: () => void): void {
  let iframe = document.querySelector("#hiddenIframe") as HTMLIFrameElement

  if (!iframe) {
    iframe = this.createHiddenIframe(document.body, "about:blank")
  }

try {
  iframe.contentWindow!.location.href = uri
  successCb()
} catch (e: any) {
  if (e.name === "NS_ERROR_UNKNOWN_PROTOCOL") {
    failCb()
  }
}
}
```

主要逻辑：

1. 尝试获取一个已经存在的 id 为 hiddenIframe 的 iframe。如果不存在，则使用 createHiddenIframe 方法在 body 里创建一个新的 iframe,并加载 about:blank 页面。

2. 它将传入的 uri 设置为 iframe 的 src,这样就会在 iframe 中加载这个页面，但对用户不可见。

   它有两个回调函数参数：

   - failCb:如果设置 src 抛出 NS_ERROR_UNKNOWN_PROTOCOL 错误(表示不支持的协议)，则调用这个回调函数。
   - successCb:如果设置 src 成功，则调用这个回调函数。

这样，通过 iframe 加载页面就可以避免页面直接打开而跳转了现在的页面。同时通过回调函数可以处理加载是否成功的状态。

### `openUriWithMsLaunchUri`

```ts
openUriWithMsLaunchUri = (
  uri: string,
  failCb: (error: any) => void,
  successCb: () => void
  ): void => {
    navigator.msLaunchUri?.(uri, successCb, failCb)
  }
```

这里唯一要注意的是，`msLaunchUri`是非标准化的～

## 完整代码

```ts
declare global {
  interface Navigator {
    msLaunchUri?: (
    uri: string,
    successCallback?: () => void,
    errorCallback?: (error: any) => void
    ) => void
  }
  interface Window {
    chrome: unknown
    opr: unknown
  }
}

interface IProtocolCheckOptions {
  uri: string
  failCb?: () => void
  successCb?: () => void
  timeout?: number
  unsupportedCb?: () => void
}

const isSSR = (): boolean => {
    return typeof window === "undefined"
}

export class ProtocolCheck {
  private readonly userAgent: string = ""
  private defaultCustomFailTimeOut: number = 2000
  constructor() {
    this.userAgent = isSSR() ? "" : navigator.userAgent
  }

  userAgentContains(browserName: string): boolean {
    browserName = browserName.toLowerCase()
    return this.userAgent.toLowerCase().indexOf(browserName) > -1
  }

  isOSX(): boolean {
    return this.userAgentContains("Macintosh")
  }

  isFirefox(): boolean {
    return this.userAgentContains("firefox")
  }

  isInternetExplorer(): boolean {
    return this.userAgentContains("trident")
  }

  /**
     * Detects IE 11 and older
     * @return {Boolean} Returns true when IE 11 and older
     */
  isIE(): boolean {
    const ua = this.userAgent.toLowerCase()

    const msie = ua.indexOf("msie")
    if (msie > 0) {
      // IE 10 or older
      return true
    }

    const trident = ua.indexOf("trident/")
    if (trident > 0) {
      // IE 11
      return true
    }

    // other browser
    return false
  }

  isEdge(): boolean {
    const ua = this.userAgent.toLowerCase()
    const edge = ua.indexOf("edge")
    return edge > 0
  }

  isChrome(): boolean {
    // IE11 returns undefined for window.chrome
    // and new Opera 30 outputs true for window.chrome
    // but needs to check if window.opr is not undefined
    const isChromium = window.chrome
    const winNav = window.navigator
    const vendorName = winNav.vendor
    const isOpera = typeof window.opr !== "undefined"
    const isIEedge = winNav.userAgent.indexOf("Edge") > -1
    const isIOSChrome = winNav.userAgent.match("CriOS")
    return !!(
      (isChromium !== null &&
       typeof isChromium !== "undefined" &&
       vendorName === "Google Inc." &&
       !isOpera &&
       !isIEedge) ||
      isIOSChrome
    )
  }

  isOpera(): boolean {
    return this.userAgentContains("OPR/")
  }

  /**
     * @description 获取浏览器版本
     * @returns {number} 浏览器版本
     */
  getBrowserVersion(): number {
    const ua = this.userAgent
    let tem
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || []
      return parseFloat(tem[1])
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
      if (tem !== null) {
        return parseFloat(tem[2])
      }
    }
    M = M[2] ? [M[1], M[2]] : [window.navigator.appName, window.navigator.appVersion, "-?"]
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1])
    return parseFloat(M[1])
  }

  openUriWithHiddenFrame(uri: string, failCb: () => void, successCb: () => void): void {
    const timeout = setTimeout(() => {
      failCb()
      handler.remove()
    }, this.defaultCustomFailTimeOut)

    const iframe = this.createHiddenIframe(document.body, uri)

    const onBlur = () => {
      clearTimeout(timeout)
      handler.remove()
      successCb()
    }

    const handler = this.registerEvent(window, "blur", onBlur)

    iframe.contentWindow!.location.href = uri
  }

  openUriWithTimeoutHack(uri: string, failCb: () => void, successCb: () => void): void {
    const timeout = setTimeout(() => {
      failCb()
      handler.remove()
    }, this.defaultCustomFailTimeOut)

    // handle page running in an iframe (blur must be registered with top level window)
    let target = window as Window
    while (target.parent && target !== target.parent) {
      target = target.parent
    }

    const onBlur = () => {
      clearTimeout(timeout)
      handler.remove()
      successCb()
    }

    const handler = this.registerEvent(target, "blur", onBlur)

    window.location.href = uri
  }

  openUriUsingFirefox(uri: string, failCb: () => void, successCb: () => void): void {
    let iframe = document.querySelector("#hiddenIframe") as HTMLIFrameElement

    if (!iframe) {
      iframe = this.createHiddenIframe(document.body, "about:blank")
    }

    try {
      iframe.contentWindow!.location.href = uri
      successCb()
    } catch (e: any) {
      if (e.name === "NS_ERROR_UNKNOWN_PROTOCOL") {
        failCb()
      }
    }
  }

  openUriWithMsLaunchUri = (
    uri: string,
    failCb: (error: any) => void,
  successCb: () => void
  ): void => {
    navigator.msLaunchUri?.(uri, successCb, failCb)
  }

registerEvent = (
  target: Window | HTMLElement,
  eventType: string,
  cb: () => void
): { remove: () => void } => {
  target.addEventListener(eventType, cb)
  return {
    remove: () => {
      target.removeEventListener(eventType, cb)
    }
  }
}

    createHiddenIframe = (target: HTMLElement, uri: string): HTMLIFrameElement => {
      const iframe = document.createElement("iframe")
      iframe.src = uri
      iframe.id = "hiddenIframe"
      iframe.style.display = "none"
      target.appendChild(iframe)
      return iframe
    }

    protocolCheck({ uri, failCb, successCb, timeout, unsupportedCb }: IProtocolCheckOptions) {
      const failCallback = () => {
        failCb?.()
      }
      const successCallback = () => {
        successCb?.()
      }

      const openUri = () => {
        if (this.isFirefox()) {
          const browserVersion = this.getBrowserVersion()
          if (browserVersion >= 64) {
            this.openUriWithHiddenFrame(uri, failCallback, successCallback)
          } else {
            this.openUriUsingFirefox(uri, failCallback, successCallback)
          }
        } else if (this.isChrome()) {
          this.openUriWithTimeoutHack(uri, failCallback, successCallback)
        } else if (this.isOSX()) {
          this.openUriWithHiddenFrame(uri, failCallback, successCallback)
        } else {
          // not supported, implement please
          unsupportedCb?.()
        }
      }

      if (timeout) {
        this.defaultCustomFailTimeOut = timeout
      }

      if (this.isEdge() || this.isIE()) {
        //for IE and Edge in Win 8 and Win 10
        this.openUriWithMsLaunchUri(uri, failCallback, successCallback)
      } else {
        if (document.hasFocus()) {
          openUri()
        } else {
          const focusHandler = this.registerEvent(window, "focus", () => {
            focusHandler.remove()
            openUri()
          })
          }
      }
    }
   }

```

