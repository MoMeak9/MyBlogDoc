# 使用 Node.js、pm2 和 ssh2 模块实现一个简单的 Node.js 项目部署脚本

本文将介绍如何使用Node.js和ssh2模块实现一个简单的部署脚本，将本地的项目文件上传到远程服务器上。我们将使用dotenv模块来管理环境变量，以及child_process模块来执行命令行操作。

首先，我们需要安装ssh2和dotenv模块：

```bash
npm install ssh2 dotenv --save
```

然后，我们需要在项目根目录下创建一个.env文件，用来存放一些敏感的配置信息，例如服务器的IP地址、端口号、用户名、私钥等。这样，我们就可以避免将这些信息暴露在代码中，也方便我们根据不同的环境进行切换。.env文件的内容如下：

```env
HOST=192.168.1.100
SSHPORT=22
USER=root
KEYFILE=~/.ssh/id_rsa
SSHKEY="
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
"
```

```js
const fs = require('fs');
const Client = require('ssh2').Client;
require('dotenv').config();
```

其中，fs模块是Node.js内置的文件系统模块，用来读写文件；Client是ssh2模块提供的一个类，用来创建SSH连接；dotenv模块是用来加载.env文件中的配置信息到process.env对象中。

然后，我们需要定义一些常量，用来存放SSH连接配置和本地目录路径和远程目录路径：

```js
// SSH连接配置
const sshConfig = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.SSHPORT || 22,
    username: process.env.USER || 'root',
    privateKey: process.env.SSHKEY || fs.readFileSync(process.env.KEYFILE || '/.ssh/id_rsa').toString(),
    // 这里使用的是通过密钥登入，使用密码登入也是可以的，两种配置项可以并存，其中一个失败了ssh2会则尝试另一个方法
};

// 本地目录路径和远程目录路径
const localDir = __dirname;
const remoteDir = '/www/wwwroot/img-service';
```

其中，我们使用了process.env对象中的属性来获取环境变量的值，如果没有定义，则使用默认值。注意，私钥需要转换为字符串格式。

接着，我们需要创建一个Client实例，并调用connect方法来建立SSH连接：

```js
// 创建SSH连接
const conn = new Client();
conn.on('ready', () => {
    console.log('SSH连接成功');
    // ...
}).connect(sshConfig);

// 监听error事件  
conn.on('error', (err) => {  
    console.error('SSH连接失败', err);  
});  
  
// 结束SSH连接  
conn.on('end', () => {  
    console.log('SSH连接已断开');  
});
```

在ready事件的回调函数中，我们需要进行部署操作。具体来说，我们需要做两件事：一是执行npm run build命令来构建项目；二是将构建后的文件上传到远程服务器上。(当然，构建指令也可以在连接之前进行)

```js
// 项目构建
const { execSync } = require('child_process');
execSync('npm run build', { stdio: 'inherit' })
```

execSync 是 Node.js 的一个内置模块，它可以同步地执行一个子进程，并返回子进程的输出。这样可以避免异步的回调地狱，也可以保证构建的顺序和正确性。stdio 参数是用来控制子进程的输入输出的，它可以是一个数组或一个字符串。如果是一个数组，那么它表示子进程的标准输入、标准输出和标准错误的流。如果是一个字符串，那么它表示子进程的所有流的模式。inherit 表示子进程的流和父进程的流相同，也就是说，子进程的输出会显示在父进程的控制台中。

欧克，现在我们写一下将本地目录下的所有文件上传至服务器上指定目录的代码，使用sftp进行文件上传：

```js
    // 将本地目录下的所有文件上传至服务器上指定目录
    const uploadPromise = [];
    conn.sftp((err, sftp) => {
        if (err) throw err;
        // 待上传文件or目录
        const files = ['dist', 'package.json', '.env'];

        const uploadFile = (file) => {
            return new Promise((resolve, reject) => {
                try {
                    const localFilePath = localDir + '/' + file;
                    const remoteFilePath = remoteDir + '/' + file;
                    const readStream = fs.createReadStream(localFilePath);
                    const writeStream = sftp.createWriteStream(remoteFilePath);
                    writeStream.on('close', () => {
                        console.log(`文件 ${file} 上传成功`);
                        resolve();
                    });
                    writeStream.on('error', (err) => {
                        console.log(`文件 ${file} 上传失败：${err}`);
                        reject(err);
                    });
                    readStream.pipe(writeStream);
                } catch (error) {
                    reject(error);
                }
            });
        }
```

同时我们需要有人解析文件目录，并执行我们的上传指令：

```js
        const uploadDir = (files) => {
            files.forEach((file) => {
                // 检查是否存在文件
                const isExist = fs.existsSync(file);
                const stat = fs.lstatSync(file);
                if (!isExist) {
                    console.log(`文件 ${file} 不存在`);
                }else if (stat.isDirectory(file)){
                    const dirFiles = fs.readdirSync(file);
                    uploadDir(dirFiles.map((dirFile) => file + '/' + dirFile));
                }else if (stat.isFile(file)){
                    uploadPromise.push(uploadFile(file));
                }
            });
        }
        uploadDir(files);
```

最后，还记得我们收集的`Promise`数组吗？直接用`Promise.all`帮我们处理等待全部文件上传后的回调：

```js
        Promise.all(uploadPromise).then(() => {
            console.log('所有文件上传成功');
            // 执行SSH命令
            conn.shell((err, stream) => {
                if (err) throw err;
                stream.on('close', () => {
                    console.log('远程命令执行完毕');
                    conn.end();
                }).on('data', (data) => {
                    console.log('远程命令输出：\n' + data);
                }).stderr.on('data', (data) => {
                    console.log('远程命令错误：\n' + data);
                });
                stream.end('ls -l /www/wwwroot/img-service\npm2 restart img-service\nexit\n');
            });
        }).catch((err) => {
            console.log('上传失败：' + err);
        });
```

欧克，最后附上完整代码

```js
const fs = require('fs');
const Client = require('ssh2').Client;
require('dotenv').config();

// 项目构建
const { execSync } = require('child_process');
execSync('npm run build', { stdio: 'inherit' })

// SSH连接配置
const sshConfig = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.SSHPORT || 22,
    username: process.env.USER || 'root',
    privateKey: process.env.SSHKEY || fs.readFileSync(process.env.KEYFILE || '/.ssh/id_rsa').toString(),
};

// 本地目录路径和远程目录路径
const localDir = __dirname;
const remoteDir = '/www/wwwroot/img-service';


// 创建SSH连接
const conn = new Client();
// 监听ready事件
conn.on('ready', () => {
    console.log('SSH连接成功');

    // 将本地目录下的所有文件上传至服务器上指定目录
    const uploadPromise = [];
    conn.sftp((err, sftp) => {
        if (err) throw err;
        const files = ['dist', 'package.json', '.env'];

        const uploadFile = (file) => {
            return new Promise((resolve, reject) => {
                try {
                    const localFilePath = localDir + '/' + file;
                    const remoteFilePath = remoteDir + '/' + file;
                    const readStream = fs.createReadStream(localFilePath);
                    const writeStream = sftp.createWriteStream(remoteFilePath);
                    writeStream.on('close', () => {
                        console.log(`文件 ${file} 上传成功`);
                        resolve();
                    });
                    writeStream.on('error', (err) => {
                        console.log(`文件 ${file} 上传失败：${err}`);
                        reject(err);
                    });
                    readStream.pipe(writeStream);
                } catch (error) {
                    reject(error);
                }
            });
        }

        const uploadDir = (files) => {
            files.forEach((file) => {
                // 检查是否存在文件
                const isExist = fs.existsSync(file);
                const stat = fs.lstatSync(file);
                if (!isExist) {
                    console.log(`文件 ${file} 不存在`);
                }else if (stat.isDirectory(file)){
                    const dirFiles = fs.readdirSync(file);
                    uploadDir(dirFiles.map((dirFile) => file + '/' + dirFile));
                }else if (stat.isFile(file)){
                    uploadPromise.push(uploadFile(file));
                }
            });
        }
        uploadDir(files);

        Promise.all(uploadPromise).then(() => {
            console.log('所有文件上传成功');
            // 执行SSH命令
            conn.shell((err, stream) => {
                if (err) throw err;
                stream.on('close', () => {
                    console.log('远程命令执行完毕');
                    conn.end();
                }).on('data', (data) => {
                    console.log('远程命令输出：\n' + data);
                }).stderr.on('data', (data) => {
                    console.log('远程命令错误：\n' + data);
                });
                stream.end('ls -l /www/wwwroot/img-service\npm2 restart img-service\nexit\n');
            });
        }).catch((err) => {
            console.log('上传失败：' + err);
        });
    });
}).connect(sshConfig);

// 监听error事件
conn.on('error', (err) => {
    console.error('SSH连接失败', err);
});

// 结束SSH连接
conn.on('end', () => {
    console.log('SSH连接已断开');
});
```
