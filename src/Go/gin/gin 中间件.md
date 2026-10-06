Gin是一个轻便灵活的Web框架，它具有非常高的拓展性，并且对中间件的支持非常友好。在Gin中，所有的接口请求都要经过中间件的处理，这使得开发者可以自定义实现很多功能和逻辑。尽管Gin本身自带的功能很少，但是由第三方社区开发的Gin拓展中间件十分丰富。

中间件是Gin框架中非常重要的一部分，它可以在请求到达处理函数之前或之后执行一些操作，比如日志记录、权限验证、数据压缩等。通过使用中间件，开发者可以将一些通用的功能抽离出来，使得代码更加清晰和易于维护。

Gin框架本身提供了一些常用的中间件，比如Logger中间件用于记录请求日志，Recovery中间件用于恢复应用程序的panic。除此之外，Gin还支持开发者自定义中间件，这意味着可以根据具体的业务需求来编写自己的中间件，从而实现更加个性化的功能。

中间件本质上是一个接口处理器。

```go
// HandlerFunc defines the handler used by gin middleware as return value.
type HandlerFunc func(*Context)
```

从某种意义上来说，每一个请求对应的处理器也是中间件，只不过是作用范围非常小的局部中间件。

```go
func Default() *Engine {
   debugPrintWARNINGDefault()
   engine := New()
   engine.Use(Logger(), Recovery())
   return engine
}
```

在gin的源代码中，`Default`函数返回的默认`Engine`默认使用两个中间件`Logger()`和`Recovery()`。如果不想使用默认的中间件，可以使用`gin.New()`来代替。

### 全局中间件

全局中间件即作用范围为全局，整个系统所有的请求都会经过此中间件。

```go
func GlobalMiddleware() gin.HandlerFunc {
   return func(ctx *gin.Context) {
      fmt.Println("全局中间件被执行...")
   }
}
```

先创建一个闭包函数来创建中间件，再通过`Engine.Use()`来注册全局中间件。

```go
func main() {
   e := gin.Default()
   // 注册全局中间件
   e.Use(GlobalMiddleware())
   v1 := e.Group("/v1")
   {
      v1.GET("/hello", Hello)
      v1.GET("/login", Login)
   }
   v2 := e.Group("/v2")
   {
      v2.POST("/update", Update)
      v2.DELETE("/delete", Delete)
   }
   log.Fatalln(e.Run(":8080"))
}
```

测试

```text
curl --location --request GET 'http://localhost:8080/v1/hello'
```

输出

```text
[GIN-debug] Listening and serving HTTP on :8080
全局中间件被执行...
[GIN] 2022/12/21 - 11:57:52 | 200 |       538.9µs |             ::1 | GET      "/v1/hello"
```

### Next()方法

### 局部中间件

局部中间件即作用范围为局部，系统中局部的请求会经过此中间件。局部中间件可以注册到单个路由上，不过更多时候是注册到路由组上。

```go
func main() {
   e := gin.Default()
   // 注册全局中间件
   e.Use(GlobalMiddleware())
   // 注册路由组局部中间件
   v1 := e.Group("/v1", LocalMiddleware())
   {
      v1.GET("/hello", Hello)
      v1.GET("/login", Login)
   }
   v2 := e.Group("/v2")
   {
      // 注册单个路由局部中间件
      v2.POST("/update", LocalMiddleware(), Update)
      v2.DELETE("/delete", Delete)
   }
   log.Fatalln(e.Run(":8080"))
}
```

测试

```text
curl --location --request POST 'http://localhost:8080/v2/update'
```

输出

```text
全局中间件被执行...
局部中间件被执行
[GIN] 2022/12/21 - 12:05:03 | 200 |       999.9µs |             ::1 | POST     "/v2/update"
```

### 中间件原理

Gin中间的使用和自定义非常容易，其内部的原理也比较简单，为了后续的学习，需要简单的了解下内部原理。Gin中的中间件其实用到了责任链模式，`Context`中维护着一个`HandlersChain`，本质上是一个`[]HandlerFunc`，和一个`index`，其数据类型为`int8`。在`Engine.handlerHTTPRequest(c *Context)`方法中，有一段代码表明了调用过程：gin在路由树中找到了对应的路由后，便调用了`Next()`方法。

```go
if value.handlers != nil {
   // 将调用链赋值给Context
   c.handlers = value.handlers
   c.fullPath = value.fullPath
   // 调用中间件
   c.Next()
   c.writermem.WriteHeaderNow()
   return
}
```

`Next()`的调用才是关键，`Next()`会遍历路由的`handlers`中的`HandlerFunc` 并执行，此时可以看到`index`的作用就是记录中间件的调用位置。其中，给对应路由注册的接口函数也在`handlers`内，这也就是为什么前面会说接口也是一个中间件。

```go
func (c *Context) Next() {
   // 一进来就+1是为了避免陷入递归死循环，默认值是-1
   c.index++
   for c.index < int8(len(c.handlers)) {
      // 执行HandlerFunc
      c.handlers[c.index](c)
      // 执行完毕，index+1
      c.index++
   }
}
```

修改一下`Hello()`的逻辑，来验证是否果真如此

```go
func Hello(c *gin.Context) {
   fmt.Println(c.HandlerNames())
}
```

输出结果为

```text
[github.com/gin-gonic/gin.LoggerWithConfig.func1 github.com/gin-gonic/gin.CustomRecoveryWithWriter.func1 main.GlobalMiddleware.func1 main.LocalMiddleware.func1 main.Hello]
```

可以看到中间件调用链的顺序为：`Logger -> Recovery -> GlobalMiddleware -> LocalMiddleWare -> Hello`，调用链的最后一个元素才是真正要执行的接口函数，前面的都是中间件。

提示

在注册局部路由时，有如下一个断言

```go
finalSize := len(group.Handlers) + len(handlers) //中间件总数
assert1(finalSize < int(abortIndex), "too many handlers")
```

其中`abortIndex int8 = math.MaxInt8 >> 1`值为63，即使用系统时路由注册数量不要超过63个。

### 计时器中间件

在知晓了上述的中间件原理后，就可以编写一个简单的请求时间统计中间件。

```go
func TimeMiddleware() gin.HandlerFunc {
   return func(context *gin.Context) {
      // 记录开始时间
      start := time.Now()
      // 执行后续调用链
      context.Next()
      // 计算时间间隔
      duration := time.Since(start)
      // 输出纳秒，以便观测结果
      fmt.Println("请求用时: ", duration.Nanoseconds())
   }
}

func main() {
	e := gin.Default()
	// 注册全局中间件，计时中间件
	e.Use(GlobalMiddleware(), TimeMiddleware())
	// 注册路由组局部中间件
	v1 := e.Group("/v1", LocalMiddleware())
	{
		v1.GET("/hello", Hello)
		v1.GET("/login", Login)
	}
	v2 := e.Group("/v2")
	{
		// 注册单个路由局部中间件
		v2.POST("/update", LocalMiddleware(), Update)
		v2.DELETE("/delete", Delete)
	}
	log.Fatalln(e.Run(":8080"))
}
```

测试

```text
curl --location --request GET 'http://localhost:8080/v1/hello'
```

输出

```text
请求用时:  517600
```

一个简单的计时器中间件就已经编写完毕了，后续可以凭借自己的摸索编写一些功能更实用的中间件。