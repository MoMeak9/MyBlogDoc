在Web开发过程中，我们经常需要一个本地服务器来测试我们的网页。今天，我们将介绍两种常用的启动本地静态服务的方式：http-server和live-server，以及它们的使用方法和具体实践。

## 一、http-server介绍和使用方法

http-server是一个简单的零配置命令行HTTP服务器，它强大而易用。http-server是由Node.js编写的，因此，在此之前你需要在你的计算机上安装Node.js。

1.  安装

在命令行中输入以下命令来全局安装http-server：

```
npm install -g http-server
```

2.  使用

安装完成后，你可以在命令行中输入http-server来启动服务器。默认情况下，http-server将在你当前的目录中提供HTTP服务。

如果你想在特定的端口上运行服务器，你可以使用-p选项，如下所示：

```
http-server -p 8080
```

如果存在，`[path]` 默认为 `./public`文件夹，否则为`./`

现在，你可以通过访问 [http://localhost:8080](http://localhost:8080/) 查看您的服务器

> 注意：默认会开启缓存，通过添加 `-c -1` 选项可禁用缓存。

```
http-server [path] [options]
```

而使用 npx 可以在不安装脚本的情况下运行脚本：

```
npx http-server [path] [options]
```

值得注意的是：

-   `index.html`将作为任何目录请求的默认文件。
-   如果找不到文件，将令`404.html`服务，这可用于单页应用程序 (SPA) 托管以服务入口页面。

### SSL

首先，需要确保[openssl](https://github.com/openssl/openssl)已正确安装，并且拥有`key.pem`和`cert.pem`文件。之后可以使用以下命令生成它们：

```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

简单来说，就是当你要创建一个证书时，会有一些问题需要回答。如你想让这个证书在电脑或浏览器中被认可，就需要把通用名称设置为127.0.0.1。就好像你要进入一个游乐园，需要出示一张入场券一样，这个证书就是你进入电脑或浏览器的入场券，它们将在3650天内有效（大约10年）。

然后你需要使用-S参数来启动服务器，以启用SSL并使用-C参数指定证书文件。

```
http-server -S -C cert.pem
```

如果你想在私钥中使用密码短语，可以在openssl命令中通过`-passout`参数指定密码（使用密码为`foobar`）。

例如：`openssl req -newkey rsa:2048 -passout pass:foobar -keyout key.pem -x509 -days 365 -out cert.pem`

出于安全原因，密码短语将仅从`NODE_HTTP_SERVER_SSL_PASSPHRASE`环境变量中读取。

如果成功，应该会输出以下内容：

```
Starting up http-server, serving ./ through https

http-server settings:
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  https://127.0.0.1:8080
  https://192.168.1.101:8080
  https://192.168.1.104:8080
Hit CTRL-C to stop the server
```

## 二、live-server介绍和使用方法

live-server是一个简单的开发HTTP服务器，具有实时重载功能。这意味着当你修改文件并保存时，live-server将自动重新加载你的网页，这对于开发者来说非常方便。

使用它有两个原因：

-   由于安全限制，AJAX请求不能在file://协议下工作，也就是说，如果你的网站通过JavaScript获取内容，你需要一个服务器。
-   在文件更改后自动重新加载页面可以加快开发速度。

为了使重新加载功能工作，你不需要安装任何浏览器插件或手动添加代码片段到你的页面中。如果你不想/不需要实时重新加载，你可以使用更简单的东西，比如下面这个基于Python的一行代码：

```
python -m SimpleHTTPServer
```

1.  安装

在命令行中输入以下命令来全局安装live-server：

```
npm install -g live-server
```

2.  使用

安装完成后，你可以在命令行中输入live-server来启动服务器。默认情况下，live-server将在你当前的目录中提供HTTP服务。

如果你想在特定的端口上运行服务器，你可以使用-p选项，如下所示：

```
live-server --port=8080
```

这将在端口8080上启动服务器。

关于实时重载，举个例子，假设你有一个网页项目的文件夹，里面有一个index.html文件。运行live-server命令后，会自动启动一个服务器，并打开浏览器显示index.html的内容。如果你修改了index.html的内容，浏览器会自动刷新页面，显示最新的变化。如果你还有其他的CSS文件，修改CSS文件的内容后，页面也会自动更新，不需要刷新。

### 命令行指令

运行live-server命令可以自动在项目目录中启动一个服务器。它还会自动打开默认的浏览器。当你修改文件时，浏览器会自动重新加载页面（除非是CSS文件，在这种情况下，修改会立即显示在页面上，无需重新加载）。

命令行参数：

-   `--port=NUMBER`：选择要使用的端口，默认为环境变量中的PORT或8080。
-   `--host=ADDRESS`：选择要绑定的主机地址，默认为环境变量中的IP或0.0.0.0（表示任何地址）。
-   `--no-browser`：不自动打开浏览器。
-   `--browser=BROWSER`：指定要使用的浏览器，而不是系统默认浏览器。
-   `--quiet | -q`：不显示日志信息。
-   `--verbose | -V`：显示更详细的日志信息。
-   `--open=PATH`：在浏览器中打开指定路径的页面，而不是默认的服务器根目录。
-   `--watch=PATH`：仅监视指定路径的文件变化，默认会监视所有文件。
-   `--ignore=PATH`：指定要忽略的文件路径。
-   `--no-css-inject`：在CSS文件发生变化时重新加载页面，而不是动态注入样式。
-   `--middleware=PATH`：指定一个.js文件作为中间件，用于自定义服务器功能。
-   `--entry-file=PATH`：在缺少文件时，用指定路径的文件替代（适用于单页面应用）。
-   `--mount=ROUTE:PATH`：将指定路径下的文件内容在指定的路由下提供访问。（可以定义多个）
-   `--spa`：将类似/abc的请求转换为/#/abc的形式（对于单页面应用很方便）。
-   `--wait=MILLISECONDS`：在重新加载页面之前等待所有文件的变化，默认为100毫秒。
-   `--htpasswd=PATH`：启用http-auth，需要在指定路径上提供htpasswd文件。
-   `--cors`：允许跨域访问。
-   `--https=PATH`：指定一个HTTPS配置模块的路径。
-   `--https-module=MODULE_NAME`：指定自定义的HTTPS模块。
-   `--proxy=ROUTE:URL`：将指定路由下的请求代理到指定的URL上。
-   `--help | -h`：显示简要的使用说明。
-   `--version | -v`：显示版本号。

默认选项： 如果存在一个名为~/.live-server.json的文件，将会加载其中的配置作为live-server的默认选项。

### 具体实践

下面我们将通过一个简单的例子来演示如何使用http-server和live-server。

首先，我们创建一个简单的HTML文件，如下所示：

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
```

然后，我们在包含这个HTML文件的目录中打开命令行，并输入以下命令来启动http-server：

```
http-server
```

现在，如果你在浏览器中访问[http://localhost:8080](http://localhost:8080/)，你应该能看到你的网页。

接下来，我们试试live-server。首先，我们需要停止http-server。然后，在同一个目录中打开命令行，并输入以下命令来启动live-server：

```
live-server
```

现在，如果你在浏览器中访问[http://localhost:8080](http://localhost:8080/)， 你应该能看到你的网页。并且，如果你修改HTML文件并保存，你的网页也将自动重载。

与实践同理的，这个HTML文件目录可以是任何产物目录，例如`dist`。