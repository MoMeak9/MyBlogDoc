# CSS 父元素没有被子元素撑开

> 这个应该是昨天问题的复现和最优解

### 问题复现

在给未设置长度的容器变换背景的时候，加入一个超长内容，原父级容器没有被新的子元素撑开

![image-20220818143802901](https://cdn.yihuiblog.top/images/202208181438034.png)

而是自动获取为父级元素的100%

![image-20220818143831231](https://cdn.yihuiblog.top/images/202208181438310.png)

**源码**

```css
.main {
    background: grey;
    margin: auto;
    width: 50vw;
    height: 400px;
    overflow: auto;
}

.list {
    height: 100vw;
}

.long{
    width: 99999px;
}

.active {
    background: aqua;
}
```

```jsx
function App() {
    let preClickElement = null
    const handleClick = useCallback((e) => {
        const target = e.currentTarget
        target.className = 'active';
        preClickElement && (preClickElement.className = '')
        preClickElement = target;
    }, [])

    return (
        <div className={"main"}>
            <div className={"list"}>
                {
                    data.map((item, index) => {
                        return <div
                            key={index}
                            onClick={handleClick}>{item}</div>
                    })
                }
                <div className={'long'}>
                    longlongdiv
                </div>
            </div>
        </div>
    );
}
```

## 原因

块级元素被子元素撑开时，如果没设置宽度，宽度就是这个块级元素的父元素的100%，所以`.list`的宽度是`.mian`的100%。

块级元素的宽度（未设置的情况下with: auto）等于其父元素内容区的宽度，所以跟儿子撑不撑开没关系。浮动元素和行内块级元素这种失去了天生宽度的元素，才有被儿子撑开一说，所以解决起来也很简单，将`.list`加上

```css
display: inline-block;
```

即可 

<img src="https://cdn.yihuiblog.top/images/202208181443387.png" alt="image-20220818144322293" style="zoom:50%;" />

然后关于[with:auto](https://www.zhangxinxu.com/wordpress/2018/07/css-width-auto/)这篇文章非常不错
