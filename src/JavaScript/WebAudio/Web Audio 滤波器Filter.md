# Web Audio API - BiquadFilterNode简单低阶滤波器食用指南

`BiquadFilterNode` 接口表示一个简单低阶滤波器（双二阶滤波器），通过 [`AudioContext.createBiquadFilter()`](https://developer.mozilla.org/zh-CN/docs/Web/API/BaseAudioContext/createBiquadFilter) 方法创建。

这个节点拥有一个输入和输出,一个节点可以设置很多不同的滤波效果，例如让某段频率以下的声音通过什么的(低通).

## 属性

> #### BiquadFilterNode.frequency 类型是双精度浮点

当前滤波算法中以赫兹(Hz)为单位测量的频率的双精度浮点值。

> #### BiquadFilterNode.detune 类型为整数

频率失谐值

> #### BiquadFilterNode.Q 类型为双精度浮点

Q因子，或质量因子.默认值为 1,范围在 0.0001 至 1000.

> #### BiquadFilterNode.gain 类型为整数

在当前的过滤算法中使用.当它取正值时,即为增益，当它取负值时，即为衰减,以分贝(dB)为单位,范围为 -40 至 40.

> #### BiquadFilterNode.type 类型是字符串

这个属性决定了滤波器的效果，能使用的值在下列表格。除第一列以外都是对应节点的属性的描述 (给定的频率是指frequency.value)

### 属性依赖说明：

| type      | 描述                                                         | frequency                             | Q                                                   | gain                                               |
| --------- | ------------------------------------------------------------ | ------------------------------------- | --------------------------------------------------- | -------------------------------------------------- |
| lowpass   | 具有12dB/倍频程衰减的标准二阶谐振低通滤波器.给定频率以下的频率通过,高于它的频率会衰减. | 给定频率                              | 指示频率在截止频率附近的峰值。 该值越大，峰值越大。 | 未使用                                             |
| highpass  | 具有12dB/倍频程衰减的标准二阶谐振高通滤波器,给定频率以下的频率衰减,高于它的频率通过. | 给定频率                              | 指示频率在截止频率附近的峰值。 该值越大，峰值越大。 | 未使用                                             |
| bandpass  | 标准二阶带通滤波器.给定频率范围之外的频率被衰减,范围内的频率通过 | 频率范围内的中心                      | 控制频带的宽度。Q值越大，频带越小。                 | 未使用                                             |
| lowshelf  | 标准二阶低架滤波器.低于给定频率的频率得到提升或衰减,高于给定频率上的频率不变. | 该频率以上获得提升或衰减              | 未使用                                              | 要应用的增强(正数)或衰减(负数)，以分贝(dB)为单位； |
| highshelf | 标准二阶高架滤波器.高于给定频率的频率得到提升或衰减,低于给定的频率的频率不变. | 该频率以下获得提升或衰减              | 未使用                                              | 要应用的增强(正数)或衰减(负数)，以分贝(dB)为单位； |
| peaking   | 给定频率的范围内的频率得到提升或衰减,给定频率的范围之外的频率不变. | 频率范围内的频率得到增强或衰减        | 控制频带的宽度。Q值越大，频带越小。                 | 要应用的增强(正数)或衰减(负数)，以分贝(dB)为单位； |
| notch     | 标准陷波滤波器,也称为带阻或带阻滤波器.它的效果与带通滤波器相反:给定频率范围之外的频率通过,内部的频率被衰减. | 频率范围内的中心                      | 控制频带的宽度。Q值越大，频带越小。                 | 未使用                                             |
| allpass   | 标准二阶全通滤波器.它让所有频率通过，但会改变不同频率之间的相位关系. | 频率最大组延迟，即发生相变中心的频率. | 控制过渡在中频的锐度。该参数越大，过渡越锐利越大。  | 未使用                                             |

## 简单示例

```js
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 设置音频节点
const biquadFilter = audioCtx.createBiquadFilter();

// 连接节点
source = audioCtx.createMediaStreamSource(stream);
source.connect(biquadFilter);
biquadFilter.connect(audioCtx.destination);

// 设置参数
biquadFilter.type = "lowpass";
biquadFilter.frequency.value = 1000;
biquadFilter.Q.value = 1;
biquadFilter.gain.value = 25;
```

### 结合[wavesurfer.js](https://wavesurfer-js.org/)使用

```js
// 获取audio context，其中audioplayer为wavesurfer.create()创建的wavesurfer实例
const BiquadFilter = this.audioplayer.backend.ac.createBiquadFitter();

// 设置参数
BiquadFilter.type = 'lowpass'
BiquadFilter.frequency.value = 1000:
BiquadFiter.Q.value = 1;
BiquadFilter.gain.value = 0;

// 设置过滤器
this.audioplayer.backend.setFilter(BiquadFilter);
```

## 小作业预告

最近专业选修课作业写了个基于Web Audio API 的播放器，后续会更新文章关于如何边实践边学习Web Audio API，敬请期待~

[Online Demo](https://my-bucket-r4bp40x-1259409954.cos-website.ap-guangzhou.myqcloud.com)，成品是这个样子

![image-20221127225535081](https://cdn.yihuiblog.top/images/202211272255177.png)

![image-20221127225637069](https://cdn.yihuiblog.top/images/202211272256166.png)

> 参考文档：
>
> [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/BaseAudioContext/createBiquadFilter#%E7%A4%BA%E4%BE%8B)
>
> [MDN BiquadFilterNode](https://developer.mozilla.org/zh-CN/docs/Web/API/BiquadFilterNode)
>
> [wavesurfer](https://wavesurfer-js.org/)
