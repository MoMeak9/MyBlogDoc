# nodemailer：让Node.js 脚本帮你发邮件

邮件已经成为了我们日常生活中重要的通信方式之一，可以用来发送各种信息，如工作提醒、活动通知、个人私信等等。本文将介绍如何使用nodemailer库来发送邮件。我们将对给定的代码进行分析，并对其实现原理进行解释。

首先，我们需要了解一下 nodemailer 是什么。nodemailer 是一个 node.js 库，用于发送邮件。它支持不同的邮件协议，如 SMTP、IMAP 和 POP3 等，并且提供了一些附加功能，如使用 HTML 和附件发送邮件。

## 开始使用

首先肯定是安装并使用nodemailer库，我们通过require()函数引入nodemailer库。

```js
const nodemailer = require('nodemailer');
```

接下来使用JSDoc定义以下字段类型

```js
/**
 * @typedef {Object} Data
 * @property {string} email - 接收者的邮箱地址
 * @property {string} [content] - 邮件内容
 */

/**
 * @param {Data} data
 * @returns {Promise<void>}
 */
```

当然，TS也是可以的，这个随意

```ts
interface IData {
    email: string;
    content?: string;
};
```

在此之后，我们导出了一个异步函数。它接受一个Data类型的对象作为输入。该函数的作用是使用 nodemailer 发送邮件到给定的电子邮件地址。

```ts
export default async ({ email, content }: IData) => {
  //...
};
```

在函数的第一行，我们打印了要发送邮件的邮箱地址，以便在调试时跟踪代码。

```js
console.log('sendMail', email);
```

接下来，我们创建一个 nodemailer 的传输对象，并等待其完成初始化。创建传输对象时，我们需要提供以下信息：

- 发件人的邮箱服务商（如 QQ、Gmail、Outlook 等）[配置项](https://github.com/nodemailer/nodemailer-wellknown/blob/master/services.json)；
- 是否使用 SSL 安全连接；
- 发送者的账户名和密码（取决于你的登入方式，如果是SMTP，则为SMTP授权码）。

> SMTP配置项参考：
>
> [SMTP transport :: Nodemailer](https://nodemailer.com/smtp/)

```js
const transporter = await nodemailer.createTransport({
  service: 'QQ',
  secureConnection: true, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});
```

其中，用户账户名和密码是从环境变量中获取的。这是一种服务端安全友善的做法，可以避免在代码中硬编码敏感信息。

接下来，我们使用创建的传输对象发送邮件。为此，我们需要提供以下信息：

- 发送者的昵称和邮箱地址；
- 接收者的邮箱地址；
- 邮件主题；
- 邮件内容（支持HTML，text纯文本、附件）。

```js
const info = await transporter.sendMail({
  from: 'Gengmain<xxxx@qq.com>', 
  to: email, 
  subject: 'LightWorld', 
  html: content,
  // text: string
});
```

sendMail() 函数将返回一个 Promise，该 Promise 在邮件成功发送后解析。我们可以使用这个 Promise 获取有关已发送邮件的信息，例如消息 ID。

```js
console.log('Message sent: %s', info.messageId);
```

### 补充：为邮件添加附件

使用 nodemailer 发送邮件时，我们可以附加一些文件作为附件。nodemailer 提供了一个 `attachments` 选项，允许我们添加附件到发送的邮件中。

```js
const nodemailer = require('nodemailer');

async function sendEmail() {
  const transporter = nodemailer.createTransport({
  	service: 'QQ',
  	secureConnection: true, 
  	auth: {
   		 user: process.env.EMAIL_USER, 
   		 pass: process.env.EMAIL_PASS,
  	},
  });

  const message = {
    from: 'Example <example@gmail.com>',
    to: 'recipient@example.com',
    subject: 'Test email with attachments',
    text: 'This email contains attachments.',
    attachments: [
      {
        filename: 'document.txt',
        content: 'hello world!',
        // content: fs.createReadStream('./document.txt'),
        // content: new Buffer('hello world!','utf-8')，
      },
      {
        filename: 'image.png',
        path: '/path/to/image.png',
        // path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
      },
    ],
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
}

sendEmail();
```

在 `attachments` 数组中，我们可以添加要附加的文件。附件可以有以下属性：

- `filename`：附件的文件名。
- `content`：附件的文本内容，可以是字符串、Buffer或Stream的附件内容。
- `path`：附件的文件路径，比较适合大件文件。

注意，`content` 和 `path` 属性不能同时使用，更多详细配置见：[Attachments :: Nodemailer](https://nodemailer.com/message/attachments/)

## 完整代码

```js
const nodemailer = require('nodemailer');

/**
 * @typedef {Object} Data
 * @property {string} email - 接收者的邮箱地址
 * @property {string} [content] - 邮件内容
 */

/**
 * @param {Data} data
 * @returns {Promise<void>}
 */

export default async ({ email, content }) => {
    console.log('sendMail', email);
    const transporter = await nodemailer.createTransport({
        service: 'QQ', // 发送者的邮箱厂商
        secureConnection: true, // SSL安全链接
        auth: {
            //发送者的账户密码
            user: process.env.EMAIL_USER, //账户
            pass: process.env.EMAIL_PASS, //smtp授权码，到邮箱设置下获取
        },
    });
    const info = await transporter.sendMail({
        from: 'Gengmain<xxxx@qq.com>', // 发送者昵称和地址
        to: email, // 接收者的邮箱地址
        subject: 'LightWorld', // 邮件主题
        html: content,
    });
    console.log('Message sent: %s', info.messageId);
};
```

## 补充

官网下掉了流行服务商的[配置项展示页](https://nodemailer.com/smtp/well-known)，但测试了一下目前还能使用该配置项，还是推荐大家把配置项改为指定host和port：

```js
nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secureConnection: ture,
  auth: {
    user: "username",
    pass: "password",
  },
});
```

