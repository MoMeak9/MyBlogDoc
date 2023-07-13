# JavaScript 数组去重

在 JavaScript 中，有多种方法可以对数组进行去重操作。以下是几种常用的方法：

1. 使用 Set

Set 是 JavaScript 的内置对象，它是一种有序的集合，其中的元素不允许重复。我们可以利用 Set 对象来去除数组中的重复项。将数组转换为 Set 对象，再将 Set 对象转换回数组，即可实现去重。

```js
const arr = [1, 2, 2, 3, 3, 4];
const uniqueArr = [...new Set(arr)]; // [1, 2, 3, 4]
```

2. 使用 filter

filter 是数组的原生方法之一，它可以通过回调函数对数组的每个元素进行遍历，并返回满足条件的新数组。我们可以在 filter 方法的回调函数中利用 indexOf 方法判断当前元素是否为第一次出现的位置，从而过滤掉重复的元素，实现去重。

```js
const arr = [1, 2, 2, 3, 3, 4];
const uniqueArr = arr.filter((item, index) => arr.indexOf(item) === index); // [1, 2, 3, 4]
```

3. 使用 reduce

reduce 是数组的原生方法之一，它可以对数组进行归并操作，遍历数组并将数组的每个元素合并为一个值。我们可以利用 reduce 方法来保存不重复的元素，通过一个空数组作为累加器，并在每次迭代中判断当前元素是否在累加器中，如果不在，则添加到累加器中，从而实现去重。

```js
const arr = [1, 2, 2, 3, 3, 4];
const uniqueArr = arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []); // [1, 2, 3, 4]
```

4. 使用 Map

Map 是 JavaScript 的内置对象，它是一种有序的键值对集合，其中的键是唯一的。我们可以利用 Map 对象来存储数组中的元素，由于 Map 对象的键是唯一的特性，重复的元素只会保存一次。通过遍历数组，将每个元素作为键和值存储在 Map 对象中，再将 Map 对象转换回数组，即可实现

```js
const arr = [1, 2, 2, 3, 3, 4];
const map = new Map();
for (let i = 0; i < arr.length; i++) {
  map.set(arr[i], arr[i]);
}
const uniqueArr = [...map.values()]; // [1, 2, 3, 4]
```

这里首先利用 map 方法将数组中的每个元素转换为一个包含键值对的数组，其中键和值都设置为数组中的元素。然后将这个数组作为参数传给 Map 构造函数，创建一个 Map 对象。接着，再利用 Array.from 方法将 Map 对象转换为一个包含键值对的二维数组，最后通过 map 方法取出数组中的键，即可得到去重后的数组。

这些是 JavaScript 中常用的几种数组去重方法，它们都不需要使用外部的 API，而是使用了 JavaScript 自带的数组和对象方法来实现去重操作。根据具体的场景和需求，选择适合的方法可以高效地去除数组中的重复项。
