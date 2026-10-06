

# 使用Node.js和Sharp库将图片转换为WebP格式

WebP是一种现代图像格式，它能够提供更好的图像压缩比和更快的加载速度。在本文中，我们将介绍如何使用Node.js和Sharp库将图片转换为WebP格式，以及如何使用TypeScript编写脚本程序。

1. 安装Sharp库

首先，我们需要在Node.js中安装Sharp库。可以通过npm安装：

```shell
npm install sharp
```

2. 创建转换脚本

我们将使用TypeScript编写脚本程序。在项目的根目录下创建一个名为"convert.ts"的文件，并输入以下代码：

```js
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const allowedTypes = ['image/jpeg', 'image/png'];

const convertToWebp = async (file: Express.Multer.File, commonPath: string) => {
  const isImage = allowedTypes.includes(file.mimetype);
  const isGif = file.mimetype === 'image/gif';
  const filepath = path.resolve(__dirname, '../', commonPath, file.filename);
  file.filename = isImage && !isGif ? file.filename.replace(/\.[^.]+$/, '.webp') : file.filename;
  const output = path.resolve(__dirname, '../', commonPath, `${file.filename}`);
  if (file.mimetype !== 'image/webp' && !isGif && isImage) {
    try {
      await sharp(filepath)
        .toFormat('webp')
        .webp({quality: 80, effort: 6})
        .toFile(output);
      fs.unlinkSync(filepath);
    } catch (e) {
      console.error(e);
    }
  }
};
```

在这个脚本程序中，我们使用Sharp库将图片转换为WebP格式。首先，我们检查文件的MIME类型是否为允许的图像类型之一。然后，我们检查文件是否为GIF格式，如果是，则不进行转换。接下来，我们使用Sharp库将文件转换为WebP格式，并将其保存在与原始文件相同的位置。最后，我们删除原始文件。

3. 使用转换脚本

我们可以将这个脚本程序用于上传图片的处理。假设我们有一个Express应用程序，用于处理文件上传，并将文件保存在"uploads"目录下。我们可以在文件上传处理程序中使用"toFormat"函数，将图片转换为WebP格式。

```js
app.post('/upload', async (req: Request, res: Response, next: NextFunction) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            next(new ParameterException(err.message));
            return;
        }
        const file = req.file;
        if (!file) {
            next(new ParameterException('文件不能为空'));
            return;
        }
        const isImage = allowedTypes.includes(file.mimetype);
        const isGif = file.mimetype === 'image/gif'
        const filepath = path.resolve(__dirname, '../', commonPath, file.filename);
        // 去除原文件后缀
        file.filename = isImage && !isGif ? file.filename.replace(/\.[^.]+$/, '.webp') : file.filename;
        const output = path.resolve(__dirname, '../', commonPath, `${file.filename}`);
        // 非webp格式的图片才进行转换
        if (file.mimetype !== 'image/webp' && !isGif && isImage) {
            try {
                // 转换为webp格式
                await sharp(filepath)
                    .toFormat('webp')
                    .webp({quality: 80, effort: 6})
                    .toFile(output);
                // 删除原文件
                fs.unlinkSync(filepath)
            } catch (e) {
                console.error(e);
                next(new ServerError('图片转换失败'));
            }
        }
        // 返回文件信息
        commonPath = commonPath.replace(/\\/g, '/');
        next(new Success({
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: `${process.env.BASEURL || 'http://localhost:3000'}/${commonPath}/${file.filename}`,
        }));
        commonPath = 'uploads/';
    });
});

```

使用multer中间件的"upload.single"方法，处理名为"file"的单个文件上传请求。

检查是否存在上传的文件，如果不存在则返回一个参数异常。

检查上传的文件类型是否是允许的图片类型（这里使用了一个名为"allowedTypes"的数组），并判断是否为GIF格式的图片。然后，定义了文件的完整路径、输出路径和WebP格式输出的质量等属性。

如果上传的文件不是WebP格式、不是GIF格式的图片，并且是允许的图片类型，那么将使用Sharp库将其转换为WebP格式，同时删除原始文件。

`.webp({quality: 80, effort: 6})` 是 Sharp 库中 `toFormat('webp')` 方法的一个参数，它用于设置 WebP 格式的编码选项。具体来说：

- `quality: 80` 指定了 WebP 编码的质量，这个值可以在 0 到 100 之间设置，数值越高，图像质量越好，但文件大小也会随之增大。在这里，quality 被设置为 80，意味着编码后的图像质量比默认值更高。
- `effort: 6` 指定了 WebP 编码器的压缩程度。这个值可以在 0 到 6 之间设置，数值越高，压缩效果越好，但也会增加编码时间。在这里，effort 被设置为 6，意味着压缩效果比默认值更好，但也可能会增加编码时间。

这些选项可以根据具体的需求进行调整，以获得最佳的编码效果。

最后，返回一个成功的响应，其中包括转换后文件的文件名、原始文件名、文件类型、文件大小和文件路径等信息。

## 测试转换功能

现在，我们已经完成了将图片转换为WebP格式的脚本程序和上传文件的处理程序。我们可以使用Postman或类似的工具测试转换功能。

在Postman中，选择POST请求，并将文件作为"form-data"发送。然后，检查响应中的文件路径，确保文件已经被正确转换为WebP格式。

## 总结

在本文中，我们介绍了如何使用Node.js和Sharp库将图片转换为WebP格式。我们还展示了如何使用TypeScript编写脚本程序，并在Express应用程序中使用它来处理文件上传。WebP格式是一种现代的图像格式，它能够提供更好的图像压缩比和更快的加载速度。通过将图片转换为WebP格式，我们可以提高网站的性能和用户体验。
