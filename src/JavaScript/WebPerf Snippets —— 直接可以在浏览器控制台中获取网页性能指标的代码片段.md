分享社区里的精选的代码段列表，用于获取 Web 性能指标，可以非常方便地在浏览器控制台中使用，或在 Chrome DevTools 上用作运行的代码段。

![image.png](https://fs.lwmc.net/uploads/2024/03/1710168653296-202403112250650.webp)

## 如何使用？

所有代码段均在 Google Chrome 中进行测试，因此请使用此浏览器来确保正确的功能~

### 在 Chrome DevTools 中作为代码段运行

你可以在 Chrome DevTools 的 `Sources` 标签页中将 `webperf-snippets` 用作代码段。

1. 复制任何 WebPerf 代码段
2. [打开 Chrome DevTools（在新选项卡中打开）](https://developer.chrome.com/docs/devtools/open/)
3. 选择`Sources`选项卡
4. 选择 `Snippets` 子选项卡
5.  [LCP(opens in a new tab)（在新选项卡中打开）](https://github.com/nucliweb/webperf-snippets#largest-contentful-paint-lcp)点击`New snippet`按钮，例如 LCP
![image.png](https://fs.lwmc.net/uploads/2024/03/1710168960032-202403112255758.webp)

6. 命名代码段名称 LCP
7. 将复制的代码粘贴到右侧区域
8. 运行代码段 `Ctrl + Enter`


![image.png](https://fs.lwmc.net/uploads/2024/03/1710169053011-202403112257200.webp)

## 代码

### 累计布局偏移 Cumulative Layout Shift (CLS)

当浏览器的焦点切换到另一个选项卡时，此脚本显示 CLS 值，因为 CLS 是在页面的生命周期内计算的。

```js
let cumulativeLayoutShiftScore = 0;
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      cumulativeLayoutShiftScore += entry.value;
    }
  }
});
 
observer.observe({ type: "layout-shift", buffered: true });
 
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    observer.takeRecords();
    observer.disconnect();
 
    console.log(`CLS: ${cumulativeLayoutShiftScore}`);
  }
});
```

### 最大内容绘制 Largest Contentful Paint (LCP)

在控制台中列出最大的内容绘制，并在 LCP 元素周围添加一条绿色虚线。

```js
const po = new PerformanceObserver((list) => {
  let entries = list.getEntries();
 
  entries = dedupe(entries, "startTime");
 
  entries.forEach((item, i) => {
    console.dir(item);
    console.log(
      `${i + 1} current LCP item : ${item.element}: ${item.startTime}`,
    );
    item.element ? (item.element.style = "border: 5px dotted lime;") : "";
  });
 
  const lastEntry = entries[entries.length - 1];
  console.log(`LCP is: ${lastEntry.startTime}`);
});
 
po.observe({ type: "largest-contentful-paint", buffered: true });
 
function dedupe(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
```

### 最大的内容绘制 LCP，Quick BPP（图像熵）检查

使用该脚本，可以获取站点上加载的所有图像的 BPP 列表。

> 忽略源为“data：image”的图片和第三方图片。

> 上下文：Chrome 112 对最大内容绘制指标进行更改，可忽略低熵图像

```js
console.table(
  [...document.images]
    .filter(
      (img) => img.currentSrc != "" && !img.currentSrc.includes("data:image"),
    )
    .map((img) => [
      img.currentSrc,
      (performance.getEntriesByName(img.currentSrc)[0]?.encodedBodySize * 8) /
        (img.width * img.height),
    ])
    .filter((img) => img[1] !== 0),
);
```

### 最大内容渲染时间 Largest Contentful Paint Sub-Parts (LCP)

```js
const LCP_SUB_PARTS = [
  "Time to first byte",
  "Resource load delay",
  "Resource load time",
  "Element render delay",
];
 
new PerformanceObserver((list) => {
  const lcpEntry = list.getEntries().at(-1);
  const navEntry = performance.getEntriesByType("navigation")[0];
  const lcpResEntry = performance
    .getEntriesByType("resource")
    .filter((e) => e.name === lcpEntry.url)[0];
 
  const ttfb = navEntry.responseStart;
  const lcpRequestStart = Math.max(
    ttfb,
    lcpResEntry ? lcpResEntry.requestStart || lcpResEntry.startTime : 0,
  );
  const lcpResponseEnd = Math.max(
    lcpRequestStart,
    lcpResEntry ? lcpResEntry.responseEnd : 0,
  );
  const lcpRenderTime = Math.max(
    lcpResponseEnd,
    lcpEntry ? lcpEntry.startTime : 0,
  );
 
  LCP_SUB_PARTS.forEach((part) => performance.clearMeasures(part));
 
  const lcpSubPartMeasures = [
    performance.measure(LCP_SUB_PARTS[0], {
      start: 0,
      end: ttfb,
    }),
    performance.measure(LCP_SUB_PARTS[1], {
      start: ttfb,
      end: lcpRequestStart,
    }),
    performance.measure(LCP_SUB_PARTS[2], {
      start: lcpRequestStart,
      end: lcpResponseEnd,
    }),
    performance.measure(LCP_SUB_PARTS[3], {
      start: lcpResponseEnd,
      end: lcpRenderTime,
    }),
  ];
 
  // Log helpful debug information to the console.
  console.log("LCP value: ", lcpRenderTime);
  console.log("LCP element: ", lcpEntry.element, lcpEntry?.url);
  console.table(
    lcpSubPartMeasures.map((measure) => ({
      "LCP sub-part": measure.name,
      "Time (ms)": measure.duration,
      "% of LCP": `${
        Math.round((1000 * measure.duration) / lcpRenderTime) / 10
      }%`,
    })),
  );
}).observe({ type: "largest-contentful-paint", buffered: true });
```

## 参考

- [WebPerf Snippets – Nextra](https://webperf-snippets.nucliweb.net/)