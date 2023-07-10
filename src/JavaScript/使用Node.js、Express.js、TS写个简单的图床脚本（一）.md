在这篇博客文章中，我将介绍如何使用 TypeScript 和 Express 框架来编写一个简单的图床脚本，可以将本地图片上传到服务器，并返回图片的 URL。这样，你就可以在 Markdown 文档中方便地引用图片，而不用担心图片的存储和管理问题。

我将最新源码放在了[MoMeak9/img-service: 简单图床脚本](https://github.com/MoMeak9/img-service#readme)，但是这个是最终版本，添加了很多新的在后续文章才提到的功能，而本文的完整代码我放在了文末，请客官自行取用。

## 代码实现

首先，我们需要安装一些依赖包，包括 express、multer 和 dotenv。express 是一个流行的 Node.js Web 框架，提供了基本的路由和中间件功能。multer 是一个用于处理 multipart/form-data 类型的请求体的中间件，可以方便地获取上传的文件。fs 是 Node.js 的内置模块，用于操作文件系统。path 也是 Node.js 的内置模块，用于处理文件路径。dotenv 是一个用于加载环境变量的模块，可以让我们将一些敏感或配置信息存放在 .env 文件中，而不用暴露在代码里。

我们可以使用 npm 或 yarn 来安装这些依赖包：

```bash
npm install express multer fs path dotenv
# or
yarn add express multer fs path dotenv
```

然后，我们需要在项目根目录下创建一个 .env 文件，用来存放一些配置信息，比如服务器端口号、图片存储路径和访问域名等。例如：

```.env
PORT=8899
BASEURL=https://fs.lwmc.net
```

接下来，我们需要在项目根目录下创建一个 src 文件夹，用来存放 TypeScript 源码文件。在 src 文件夹下，我们创建一个 index.ts 文件，作为入口文件。在 index.ts 文件中，我们首先需要导入一些模块：

```ts
import express, {NextFunction, Request, Response} from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
```

你也看出来了，我们还需要添加一些类型辅助

```bash
npm install @types/express @types/multer @types/node -D
# or
yarn add @types/express @types/multer @types/node -D
```

### 跨域配置（上传和静态文件跨域访问能力）

```js
// 允许跨域请求
app.use((req: Request, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
```

### 路由

应该包含有静态资源路由和上传路由：

静态资源路由开放对`/uploads`路径下资源的访问

```js
// 静态文件路由
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
```

上传路由开放对`/upload`POST方法的访问：

1.  `upload.single('file')` 是一个 multer 中间件，表示只允许上传一个文件，并且上传的文件参数名是 'file'。
2.  `(req: Request, res: Response) => { ... }` 是路由处理函数，当客户端向 '/upload' 路径发送 POST 请求时，会执行这个函数。
3.  `const file = req.file;` 表示从请求中获取上传的文件。
4.  `if (!file) { ... }` 表示如果没有上传文件，返回一个 400 错误响应。
5.  `res.send({ ... })` 表示向客户端发送一个 JSON 响应，包含上传文件的信息，包括文件名、原始文件名、文件类型、文件大小和文件的访问路径。其中文件访问路径是通过拼接服务器地址和文件路径得到的。

```js
// 上传文件路由
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
        res.status(400).send('Please upload a file.');
        return;
    }
    
    // 返回文件信息
    res.send({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: `http://localhost:3000/${commonPath}/${file.filename}`,
    });
    // 复原公共路径
    commonPath = 'uploads/'
});
```

### multer 配置

代码使用了 multer 中间件来处理上传文件的请求。Multer 是一个 node.js 中间件，用于处理文件上传，支持多文件上传，可以设置文件大小、文件类型和保存路径等。

以下是对代码配置项的解释：

1.  `dest` 属性指定上传文件的保存目录，这里设置为 'uploads/' 目录下。如果目录不存在，则会自动创建。
2.  `limits` 属性设置上传文件的限制，这里限制文件大小为 10MB。
3.  `fileFilter` 属性指定上传文件的类型，这里限制只能上传 image/png、image/jpeg、image/gif、image/webp、image/svg+xml 这些类型的文件。如果文件类型不在指定的类型列表中，则会触发错误。
4.  `storage` 属性指定上传文件的存储方式，这里使用了 diskStorage 存储方式。在存储文件时，会根据上传时间按年月日来创建文件夹，并将文件存储在对应的文件夹下。
5.  `filename` 方法指定上传文件的命名规则，这里使用时间戳加原始文件名的方式来命名文件。

```js
// 上传文件的中间件
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 1024 * 1024 * 10, // 限制文件大小为10M
    },
    fileFilter: (req, file, cb) => {
        // 限制文件类型
        const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error('Invalid file type.'));
            return;
        }
        cb(null, true);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync('uploads/')) {
                fs.mkdirSync('uploads/');
            }
            // 获取日期
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            commonPath = path.join(commonPath, year.toString());
            if (!fs.existsSync(path.join(commonPath))) {
                fs.mkdirSync(path.join(commonPath));
            }
            commonPath = path.join(commonPath, month.toString().padStart(2, '0'));
            if (!fs.existsSync(path.join(commonPath))) {
                fs.mkdirSync(path.join(commonPath));
            }
            // 拼接路径
            cb(null, commonPath);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}${file.originalname}`);
        },
    }),
});
```

## 完整代码：

```js
import express, {Request, Response} from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const app = express();

// 公共路径
let commonPath = 'uploads/';
// 上传文件的中间件
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 1024 * 1024 * 10, // 限制文件大小为10M
    },
    fileFilter: (req, file, cb) => {
        // 限制文件类型
        const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error('Invalid file type.'));
            return;
        }
        cb(null, true);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync('uploads/')) {
                fs.mkdirSync('uploads/');
            }
            // 获取日期
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            commonPath = path.join(commonPath, year.toString());
            if (!fs.existsSync(path.join(commonPath))) {
                fs.mkdirSync(path.join(commonPath));
            }
            commonPath = path.join(commonPath, month.toString().padStart(2, '0'));
            if (!fs.existsSync(path.join(commonPath))) {
                fs.mkdirSync(path.join(commonPath));
            }
            // 拼接路径
            cb(null, commonPath);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}${file.originalname}`);
        },
    }),
});

// 允许跨域请求
app.use((req: Request, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

// 静态文件路由
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// 上传文件路由
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
        res.status(400).send('Please upload a file.');
        return;
    }
    
    // 返回文件信息
    res.send({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: `http://localhost:3000/${commonPath}/${file.filename}`,
    });
    commonPath = 'uploads/'
});

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
```