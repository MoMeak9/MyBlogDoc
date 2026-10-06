在现代 Web 开发中，事件处理是不可或缺的一部分。开发者经常需要跟踪事件是否触发或者某些操作是否已经对某个事件执行过。这就引入了我们今天要介绍的这个脚本的使用场景。本文将详细介绍如何使用 `const eventSet = new WeakSet<Event>()` 以及相关的两个函数 `markEventEffectPerformed(event: Event): void` 和 `eventEffectNotPerformed(event: Event): boolean`，这些工具可以帮助开发者在复杂的事件处理逻辑中保持清晰和高效。

```js
const eventSet = new WeakSet<Event>()

export function markEventEffectPerformed (event: Event): void {
  eventSet.add(event)
}

export function eventEffectNotPerformed (event: Event): boolean {
  return !eventSet.has(event)
}
```

### 脚本概述

在深入了解这个脚本之前，让我们先了解一下 `WeakSet`。`WeakSet` 是一种集合类型，它允许你将对象存储为“弱引用”形式。在 `WeakSet` 中的对象不会阻止垃圾回收器将这些对象回收，这意味着它非常适合跟踪那些可能会自动消失的对象，比如 DOM 事件对象。

本脚本定义了一个 `WeakSet` 实例 `eventSet`，用于存储已经被处理过的事件对象。通过这种方式，开发者可以轻松地标记事件是否已经被处理，并据此决定是否需要再次处理。

### 使用场景

1. **事件去重**：在某些场景下，同一个事件可能会被触发多次，但我们只希望对其进行一次处理。使用这个脚本，我们可以确保每个事件只被处理一次。
2. **状态跟踪**：在复杂的事件处理逻辑中，跟踪事件是否已经被处理过是非常有用的。这有助于避免不必要的重复操作，提高应用性能。
3. **条件逻辑**：在某些情况下，我们可能希望仅当某个事件未被处理时才执行某些操作。通过这个脚本，我们可以轻松实现这一逻辑。

### 使用方法

#### 标记事件已处理

当事件被处理时，我们可以使用 `markEventEffectPerformed` 函数来标记这个事件。这个函数接受一个 `Event` 类型的参数，并将其添加到 `eventSet` 集合中。

```javascript
export function markEventEffectPerformed(event: Event): void {
  eventSet.add(event);
}
```

使用示例：

```javascript
document.addEventListener('click', function(event) {
  // 处理点击事件的逻辑...
  markEventEffectPerformed(event);
});
```

#### 检查事件是否未被处理

在需要确定事件是否已经被处理过的场景中，我们可以使用 `eventEffectNotPerformed` 函数。这个函数同样接受一个 `Event` 类型的参数，并返回一个布尔值，表示这个事件是否不在 `eventSet` 集合中。

```javascript
export function eventEffectNotPerformed(event: Event): boolean {
  return !eventSet.has(event);
}
```

使用示例：

```javascript
document.addEventListener('mousemove', function(event) {
  if (eventEffectNotPerformed(event)) {
    // 如果事件未被处理，则执行相关逻辑...
  }
});
```

### 结论

通过使用 `const eventSet = new WeakSet<Event>()` 及其相关函数，开发者可以在复杂的事件处理逻辑中保持代码的清晰和高效。这不仅有助于提高应用性能，还可以避免因重复处理相同事件而导致的潜在问题。无论是在大型应用还是在需要精细控制事件处理的场景中，这个脚本都是一个非常有用的工具。