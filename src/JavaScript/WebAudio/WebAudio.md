# Tone.js 框架食用指南

Tone.js 是一个Web Audio框架，用于在浏览器中创建交互式音乐。js的体系结构旨在使音乐家和基于web的音频应用程序的音频程序员都熟悉。在高层，Tone提供了常见的DAW(数字音频工作站)功能，如用于同步和调度事件的全局传输以及预构建的合成和效果。此外，Tone提供高性能的构建块，以创建您自己的合成器，效果和复杂的控制信号。

## 安装

安装最新稳定版本

```shell
npm install tone
```

或者安装`next`最新版本

```shell
npm install tone@next
```

导入Tone.js

```shell
import * as Tone from 'tone'
```

## Hello Tone

```js
//创建一个synth并将其连接到主输出设备(您的扬声器)
const synth = new Tone.Synth().toDestination();

//播放中 'C' 调在8个音符的持续时间内
synth.triggerAttackRelease("C4", "8n");
```

### Tone.Synth

`Tone.Synth` 是一个具有单[**振荡器**](https://tonejs.github.io/docs/14.7.77/OmniOscillator.html)和ADSR [Envelope **(波封)**](https://tonejs.github.io/docs/14.7.77/Envelope.html)的基本合成器。

> 波封（Envelope）是指将一种音色波形的大致轮廓描绘出来用以表示出该音色在音量变化上的特性的参数。 一个波封可以用4种参数来描述，分别是Attack(起音)、Decay(衰减)、Sustain(延持)、与Release(释音)，这四者也就是一般称的“ADSR”。
>
> Tone中，Envelope是ADSR信封生成器。信封输出一个信号，可以连接到AudioParam或Tone.Signal。

#### triggerAttack / triggerRelease

triggerAttack启动音符(振幅在上升)，而triggerRelease是当振幅回到0(即音符关闭)。

```js
const synth = new Tone.Synth().toDestination();
const now = Tone.now()
// trigger the attack immediately
synth.triggerAttack("C4", now)
// wait one second before triggering the release
synth.triggerRelease(now + 1)
```

#### triggerAttackRelease

`triggerAttackRelease`是`triggerAttack`和`triggerRelease`的组合

音符的第一个参数可以是赫兹频率(如440)或“音高-八度”符号(如“d# 2”)。

第二个参数是音符的持续时间。该值可以以秒为单位，也可以作为一个时间相对值。

`triggerAttackRelease`的第三个(可选)参数是音符在`AudioContext`时间内应该播放的时间。它可以用于计划未来事件。

```js
const synth = new Tone.Synth().toDestination();
const now = Tone.now()
synth.triggerAttackRelease("C4", "8n", now)
synth.triggerAttackRelease("E4", "8n", now + 0.5)
synth.triggerAttackRelease("G4", "8n", now + 1)
```

## Time

Web Audio具有先进的，样本精确调度功能。AudioContext时间是Web Audio API用来安排事件的时间，随当页面加载时从0开始，以秒为单位进行计数。

获取当前AudioContext时间

```js
setInterval(() => console.log(Tone.now()), 100);
```

Tone.js 抽象了AudioContext时间。任何以时间为参数的方法都可以接受数字或字符串，而不是以秒为单位定义所有值。例如，“4n”是四分音符，“8t”是八分音符三连音，“1m”是一个小节。

## Starting Audio

浏览器不会播放任何音频，直到用户点击某些东西(如播放按钮)。只有在从事件监听器中调用Tone.start()之后，才能运行你的Tone.js代码，该事件监听器是由用户操作(如“单击”或“按下键”)触发的。

Tone.start()返回一个承诺，只有在该承诺被解决后，音频才会准备好。在AudioContext运行之前调度或播放音频将导致静默或不正确的调度。

```js
document.querySelector('button')?.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})
```

## Scheduling

