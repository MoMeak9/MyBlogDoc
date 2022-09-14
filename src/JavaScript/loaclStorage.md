# LocalStorage/sessionStorage 封装 - 基于TypeScript

实际上社区已经有非常成熟的库了，可以轻量化引入并使用[store2](https://www.npmjs.com/package/store2)，当然，我们这篇文章分享日常简单or局部使用时的简单封装。

我们经常需要在 localStorage 或者 sessionStorage 去持久化存储值，但是 localStorage 和 sessionStorage 提供的 api 在处理对象的时候，往往需要 stringify 去转成字符串去存储，再通过 parse 去转换回来，这样是比较麻烦的，我们就可以将这些操作封装成函数去调用

### 封装为自定义Hooks形式

支持以下方法

- get
- set
- remove
- clearAll
- clearExcept

**实现：**

```ts
type StorageService = {
    get: (key: string) => any;
    set: (key: string, value: any) => void;
    remove: (key: string) => void;
    clearExcept: (key: string) => void;
    clearAll: () => void;
}

type Func = ($storage?: Storage) => StorageService;

export const useStorage: Func = ($storage = localStorage) => {
    /**
     * 根据 key 值获取储存在 storage 中的值
     * @param key storage key
     */
    const get = (key: string) => {
        let value = $storage.getItem(key);
        try {
            value = JSON.parse(value);
            return value;
        } catch {
            return value;
        }
    }

    /**
     * 根据 key 值向 storage 中储存值
     * @param key storage key
     * @param value 需要储存在 storage 中的值
     */
    const set = (key: string, value: any) => {
        return $storage.setItem(key, value ? JSON.stringify(value) : value);
    }

    /**
     * 根据 key 值移除储存在 storage 中的值
     * @param key storage key
     */
    const remove = (key: string) => {
        return $storage.removeItem(key);
    }

    /**
     * 移除除了 key 之外的所有储存在 storage 中的值
     * @param key storage key
     */
    const clearExcept = (key: string) => {
        for (let i = 0; i < $storage.length; i++) {
            const itemKey: string | undefined = $storage.key(i);
            if (itemKey && itemKey !== key) {
                $storage.removeItem(itemKey);
            }
        }
    }

    /**
     * 移除所有储存在 storage 中的值
     */
    const clearAll = () => {
        for (const itemKey in $storage) {
            if (itemKey) {
                $storage.removeItem(itemKey);
            }
        }
    }

    return {
        get,
        set,
        remove,
        clearExcept,
        clearAll,
    }
}

export default useStorage;
```

**使用：**

```ts
const store = useStorage(); // 可选，默认localStorage
store.get('key');
store.set('key', { a: 1 });
store.remove('key');
store.clearExcept('key');
store.clearAll();
```

