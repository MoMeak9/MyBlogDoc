---
date: 2022-08-31
category:
- React
tags:
- Antd
---

# Antd 表单基础使用

## 获取表单实例


## 表单数据操作

### Antd form表单的使用、设值、取值、清空值

1、使用

```js
{this.props.form.getFieldDecorator("key",{})(<Input />)}
```

2、设值

```js
this.props.form.setFieldsValue({
    key: '123',
});
```

3、取值

```js
this.props.form.validateFields((err, values) => {
    if (!err) {
       console.log("表单信息", values);
    }
});
```

4、清空值

```js
this.props.form.resetFields();
```

