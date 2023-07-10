# Tone.js —— Web Audio 框架中文使用指南

Tone.js 是一个Web Audio框架，用于在浏览器中创建交互式音乐。Tone.js旨在使音乐家和基于Web Audio 应用程序的音频程序员都能熟悉应用。在应用层，Tone.js 提供了常见的DAW(数字音频工作站)功能，如用于同步和调度事件的全局传输，以及预构建的合成器和音效。此外，Tone.js 提供高性能的构建模块，以创建您自己的合成器、音效和复杂的控制信号。

## 安装

安装最新稳定版本

```shell
npm install tone
```

或者安装最新`next`版本

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

## Time 时间

Web Audio具有先进的，样本精确调度功能。AudioContext时间是Web Audio API用来安排事件的时间，随当页面加载时从0开始，以秒为单位进行计数。

获取当前AudioContext时间

```js
setInterval(() => console.log(Tone.now()), 100);
```

Tone.js 抽象了AudioContext时间。任何以时间为参数的方法都可以接受数字或字符串，而不是以秒为单位定义所有值。例如，“4n”是四分音符，“8t”是八分音符三连音，“1m”是一个小节。

## Starting Audio 启动音频

浏览器不会播放任何音频，直到用户点击某些东西(如播放按钮)。只有在从事件监听器中调用`Tone.start()`之后，才能运行你的Tone.js代码，该事件监听器是由用户操作(如“单击”或“按下键”)触发的。

Tone.start()返回一个承诺，只有在该承诺被解决后，音频才会准备好。在AudioContext运行之前调度或播放音频将导致静默或不正确的调度。

```js
document.querySelector('button')?.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})
```

## Scheduling 调度

### Transport

`Tone.Transport`是主要的计时工具。与AudioContext时钟不同的是，它可以启动、停止、循环和动态调整。你可以把它想象成数字音频工作站中的排列视图或跟踪器中的通道。

多个事件和部分可以沿着传输安排和同步。`Tone.Loop`是一种创建循环回调的简单方法，可以计划启动和停止。

```js
// create two monophonic synths
const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
//play a note every quarter-note
const loopA = new Tone.Loop(time => {
	synthA.triggerAttackRelease("C2", "8n", time);
}, "4n").start(0);
//play another note every off quarter-note, by starting it "8n"
const loopB = new Tone.Loop(time => {
	synthB.triggerAttackRelease("C4", "8n", time);
}, "4n").start("8n");
// the loops start when the Transport is started
Tone.Transport.start()
// ramp up to 800 bpm over 10 seconds
Tone.Transport.bpm.rampTo(800, 10);
```

由于Javascript回调的时间不精确，事件的采样精确时间被传递到回调函数中。使用此时间值调度事件。

## Instruments 乐器

这里有许多合成器可供选择，包括 Tone.FMSynth, Tone.AMSynth and Tone.NoiseSynth.

所有这些乐器都是单声道(单声道)，这意味着它们一次只能演奏一个音符。

要创建一个复音合成器，请使用`Tone.PolySynth`，它接受单音合成器作为它的第一个参数，并自动处理音符分配，以便您可以传入多个音符。该API类似于单音合成，只是必须给triggerRelease一个音符或音符数组。

```js
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now()
synth.triggerAttack("D4", now);
synth.triggerAttack("F4", now + 0.5);
synth.triggerAttack("A4", now + 1);
synth.triggerAttack("C5", now + 1.5);
synth.triggerAttack("E5", now + 2);
synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
```

## Samples 采样器

声音生成并不局限于合成声音，还可以加载一个示例并以多种方式回放它。`Tone.Player`是一种加载和播放音频文件的方法。

```js
const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
Tone.loaded().then(() => {
	player.start();
});
```

`Tone.loaded()`返回一个promise，该promise在所有音频文件加载后解析。这是一种很有帮助的简写，而不是等待每个音频缓冲区的onload事件来解决。

### Tone.Sampler

多个采样器也可以组合成一个仪器。如果你的音频文件是按音符组织的，音调。采样器将音调转移的样本填补音符之间的空白。举个例子，如果你只有一架钢琴上每3个音符的样本，你可以把它变成一架完整的钢琴样本。

不像其他合成器，托尼。采样器是复调的，所以不需要传递到`Tone.PolySynth`

```js
const sampler = new Tone.Sampler({
	urls: {
		"C4": "C4.mp3",
		"D#4": "Ds4.mp3",
		"F#4": "Fs4.mp3",
		"A4": "A4.mp3",
	},
	release: 1,
	baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

Tone.loaded().then(() => {
	sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
})
```

## Effects 音效

在上面的例子中，音源总是直接连接到`Destination`，但synth的输出也可以通过一个(或多个)效果路由到扬声器。

```js
const player = new Tone.Player({
	url: "https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3",
	loop: true,
	autostart: true,
})
//create a distortion effect
const distortion = new Tone.Distortion(0.4).toDestination();
//connect a player to the distortion
player.connect(distortion);
```

连接路由非常灵活。连接可以串行运行，也可以并行运行。

```js
const player = new Tone.Player({
	url: "https://tonejs.github.io/audio/drum-samples/loops/ominous.mp3",
	autostart: true,
});
const filter = new Tone.Filter(400, 'lowpass').toDestination();
const feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();

// connect the player to the feedback delay and filter in parallel
player.connect(filter);
player.connect(feedbackDelay);
```

多个节点可以连接到相同的输入，使音源共享效果。对于创建复杂的路由，`Tone.Gain`是非常有用的实用节点。

## Signals 信号

和底层的Web Audio API一样，Tone.js构建时几乎所有内容都有音频速率信号控制。这是一个功能强大的特性，可以实现样本精确的同步和参数调度。

信号属性有一些用于创建自动化曲线的内置方法。

例如，振荡器上的频率参数是一个信号，因此您可以创建从一个频率到另一个频率的平滑斜坡。

```js
const osc = new Tone.Oscillator().toDestination();
// start at "C4"
osc.frequency.value = "C4";
// ramp to "C2" over 2 seconds
osc.frequency.rampTo("C2", 2);
// start the oscillator for 2 seconds
osc.start().stop("+3");
```

## AudioContext 音频上下文

js在加载时创建一个`AudioContext`，并使用标准化的`audio-context`填充它以获得最大的浏览器兼容性。`AudioContext`可以在`Tone.context`中访问。或者使用`Tone.setContext(AudioContext)`设置自己的`AudioContext`。

## MIDI 文件

要使用MIDI文件，首先需要将它们转换成JSON格式，使得Tone.js可以读取。
