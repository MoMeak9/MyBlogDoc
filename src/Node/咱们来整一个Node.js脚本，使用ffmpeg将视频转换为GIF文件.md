# 咱们来整一个Node.js脚本，使用ffmpeg将视频转换为GIF文件

如果需要将视频转换为GIF文件，最先想到的肯定是使用ffmpeg，这是一个开源的跨平台的多媒体处理工具。ffmpeg具有强大的功能，可以处理视频和音频文件，并可以将它们转换为多种格式，包括GIF。

而当使用Node.js来一起进行音视频处理时，我们可以使用第三方库来简化代码。这次我们将使两个库：`@ffmpeg-installer/ffmpeg`和`fluent-ffmpeg`。

`@ffmpeg-installer/ffmpeg`是一个ffmpeg的二进制文件安装器，可以轻松安装和使用ffmpeg命令行工具。这个库可以自动下载和安装ffmpeg二进制文件，并提供一个指向它的路径，以便其他库和代码可以轻松地使用它。在代码示例中，我们使用`require()`函数导入了`@ffmpeg-installer/ffmpeg`，并使用它的路径设置了ffmpeg的路径。

`fluent-ffmpeg`是一个ffmpeg的Node.js接口库，可以帮助我们更轻松地使用ffmpeg来处理音视频文件。它提供了一个链式API，允许我们在JavaScript中构建ffmpeg命令。使用这个库，我们可以更容易地指定输入和输出文件，设置各种参数，添加过滤器等等。在代码示例中，我们使用`fluent-ffmpeg`创建了一个ffmpeg命令对象，并使用它的API来指定命令的参数和选项。

## 代码

下面是使用Node.js和ffmpeg库的代码，代码其实非常简单：

```js
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

export const video2Gif = async (videoPath: string, gifPath: string, width: number, fps: number) => {
    ffmpeg.setFfmpegPath(ffmpegPath); // 设置二进制客户端路径
    ffmpeg(videoPath) // 读入路径
        .outputOptions('-pix_fmt', 'rgb24') // 设置像素格式为rgb24
        .output(gifPath) // 输出路径
        .withFPS(fps) // 设置输出GIF的帧率
        .size(`${width}x?`) // 设置输出GIF的宽度，高度等比缩放
        .noAudio() // 禁用音频输出
        .on('end', () => {
            console.log('转换完成！')
        })
        .on('error', (err:any) => console.error(err))
        .run();
}

video2Gif('mp4路径', 'gif路径', 300, 10);
```

其中`video2Gif`函数接受四个参数：`videoPath`是要转换为GIF的视频文件路径，`gifPath`是要保存GIF文件的路径，`width`是输出GIF的宽度，`fps`是输出GIF的帧率。值得注意的是，对于输入和输出路径，你需要具体到文件名称，并给到准确的文件类型，例如`.mp4` or `.gif`

在`video2Gif`函数中，我们首先设置了ffmpeg的路径，然后使用`ffmpeg()`函数来创建一个ffmpeg命令对象。我们使用`outputOptions()`函数来设置像素格式为rgb24，并使用`output()`函数来指定输出文件路径。

接下来，我们使用`withFPS()`函数来设置输出GIF的帧率，使用`size()`函数来设置输出GIF的宽度，高度将按比例缩放，使用`noAudio()`函数来禁用音频输出。

最后，我们使用`on('end', ...)`函数来在转换完成时输出一条消息，并使用`on('error', ...)`函数来处理任何错误。最后，我们使用`run()`函数来运行ffmpeg命令。

使用上面的代码，我们就可以将视频文件转换为GIF文件，并将其保存到指定的路径。如果需要转换多个视频文件，你可以在函数调用中使用循环或迭代器。

## 关于outputOptions

`.outputOptions()`方法可以传入多个参数，用于设置输出的参数和选项。下面列出一些常用的参数和选项：

- `-ss`：指定开始时间，例如：`.outputOptions('-ss', '00:00:10')`表示从视频的第10秒开始转换。
- `-t`：指定转换的持续时间，例如：`.outputOptions('-t', '00:00:05')`表示转换视频的前5秒。
- `-r`：指定输出的帧率，例如：`.outputOptions('-r', '30')`表示输出GIF文件的帧率为30帧/秒。
- `-loop`：指定循环次数，例如：`.outputOptions('-loop', '0')`表示无限循环。
- `-vf`：指定视频过滤器，例如：`.outputOptions('-vf', 'scale=640:-1')`表示将视频缩放为宽度为640像素，高度按比例自动计算。
- `-preset`：指定输出的质量预设，例如：`.outputOptions('-preset', 'slow')`表示使用慢速编码器来获得更好的输出质量。
- `-crf`：指定视频的压缩比，例如：`.outputOptions('-crf', '23')`表示压缩比为23，数值越小表示质量越好但文件越大。

你可以查阅ffmpeg的文档以获取更多的参数和选项。当然，不同的参数和选项的作用和效果也是不同的，需要根据实际情况选择和使用。

## 了解更多

- [kribblo/node-ffmpeg-installer: Platform independent binary installer of FFmpeg for node projects](https://github.com/kribblo/node-ffmpeg-installer#readme)
- [fluent-ffmpeg/node-fluent-ffmpeg: A fluent API to FFMPEG (http://www.ffmpeg.org)](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#readme)
