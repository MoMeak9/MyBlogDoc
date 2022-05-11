
## 通信消息格式

分享

```js
let postData = {
    command: 'share',   //表名意图
    payload: {  //相关参数
        title: this.pageTitle || this.pageTitleMain, //标题
        key: `share${this.pageKeyWord}`, //key
        description,  //描述
        url, // 分享链接
        accountId: this.accountId, //手机号
        thumbImage:
            this.picUrl ||
            (this.pageImg.indexOf('https://') != -1 && this.pageImg) ||
            '',  //分享封面
        mId,  //分享素材id -可为空
        params: {
            mId,  //素材id
            description, //素材描述
        },

    },
};
window.postMessage(JSON.stringify(postData));
```

## 下载图片

```js
  const data = {
    command: 'downloadImg', //必须
    payload: {
      title: '工程商资质认证证书',
      key: 'imgDown',
      description: '工程商资质认证证书', //描述
      url: imgUrl, //图片地址 https
      params: {
        fileName: 'story', //文件名
        endFileType: '.png', //必须 文件后缀
      },
     
    },
  };
  window.postMessage(JSON.stringify(data));
```


## 图片大图查看

```js
let postData = {
    command: 'showImgApp',
    payload: {
        url, //可为空
        title, //标题
        imgUrlArray,  //必须，图片链接
        mId //可为空
    },
}
window.postMessage(JSON.stringify(data));
```

