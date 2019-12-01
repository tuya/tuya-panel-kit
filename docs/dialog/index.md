# Dialog - 对话框

---


<a name="e05dce83"></a>
## 简介

`Dialog对话框`是一个包含了一系列常用对话框的集合，用于显示一些类似Native效果的组件。

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

<a name="da45c664"></a>
### 警告框

```jsx
Dialog.alert({
  title: '标题',
  subTitle: '副标题',
  confirmText: '确认',
});
```

<a name="9c208041"></a>
### 提示框

```jsx
Dialog.confirm({
  title: '标题',
  subTitle: '副标题',
  cancelText: '取消',
  confirmText: '确认',
});
```


<a name="f5c1aa73"></a>
### 输入对话框

```jsx
// 非受控输入框 
Dialog.prompt({
  title: '非受控输入框',
  subTitle: '副标题',
  cancelText: '取消',
  confirmText: '确认',
  defaultValue: this.state.promptUnControlled,
  placeholder: 'Password',
  onConfirm: text => {
    console.log('uncontrolled text :', text);
    this.setState({ promptUnControlled: text });
    Dialog.close();
  },
});

// 受控输入框
Dialog.prompt({
  title: '受控输入框',
  subTitle: '副标题',
  cancelText: '取消',
  confirmText: '确认',
  value: this.state.promptControlled,
  placeholder: 'Password',
  onChangeText: text => {
    // 使用value props 可令prompt成为受控组件，控制其输入框内容
    const t = +text;
    if (typeof t === 'number' && !Number.isNaN(t)) {
      return text;
    }
  },
  onConfirm: text => {
    console.log('controlled text :', text);
    this.setState({ promptControlled: text });
    Dialog.close();
  },
});
```

<a name="b1953e4a"></a>
### 单选/多选对话框

```jsx
Dialog.checkbox({
  title: 'Required',
  cancelText: '取消',
  confirmText: '确认',
  type: 'radio',
  value: this.state.checkValueRadio,
  dataSource: [
    {
      value: 'code1',
      title: '传感器选择',
    },
    {
      value: 'code2',
      title: '房间传感器校准',
    },
    {
      value: 'code3',
      title: '地板传感器校准',
      iconSize: 24,
      Icon: 'warning',
      reverse: true,
      hideOnUnselect: true,
    },
  ],
  onConfirm: value => {
    this.setState({ checkValueRadio: value });
    Dialog.close();
  },
});
```

<a name="f1c383c0"></a>
### 自定义对话框

弹出一个自定义内容对话框

```jsx
Dialog.custom({
  title: 'Custom',
  cancelText: '取消',
  confirmText: '确认',
  content: (
    <View style={{ height: 300, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, color: '#000' }}>自定义内容</Text>
    </View>
  ),
  onConfirm: () => {
    Dialog.close();
  },
});
```

## 交互演示

![dialog.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/d4752c92-2bb2-4472-815e-d35123fa300e.gif)<br />

<a name="API"></a>
## API

> Dialog API除了close以外的第一个参数为给对应组件的props，第二个参数为给Modal的props


`Dialog.someMethod(props: Object, modalProps?: Object)`

<a name="c980cfcb"></a>
### Dialog通用
| 属性 | 说明 | 类型 | 默认值 | 必传 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| style | 容器样式 | [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | null | 否 |
| headerStyle | 头部样式 | [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | null | 否 |
| title | 标题 | `string` | null | 是 |
| titleStyle | 标题样式 | [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | null | 否 |
| titleNumberOfLines | 标题超过多少行显示省略号 | `number` | 2 | 是 |
| subTitle | 副标题 | `string` | null | 否 |
| subTitleStyle | 副标题样式 | [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | null | 否 |
| footerWrapperStyle | footer容器样式 | [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | null | 否 |
| cancelText | 取消文案 | `string` | `''` | 否 |
| cancelTextStyle | 取消文字样式 | [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | null | 否 |
| confirmText | 确认文案 | `string` | `''` | 否 |
| confirmTextStyle | 确认文字样式 | [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | null | 否 |
| onCancel | 取消点击回调 | `function` | null | 否 |
| onConfirm | 确认点击回调 | `function` | null | 否 |



<a name="Dialog.alert"></a>
### Dialog.alert

**警告框:**（只包含confirm按钮，不包含cancel按钮）

`参考Dialog通用`, 但要注意alert不包含cancel相关属性(cancelText、cancelTextStyle、onCancel)

<a name="Dialog.confirm"></a>
### Dialog.confirm

**提示框:**（在警告框的基础上加上cancel按钮）

`参考Dialog通用`, 与Dialog通用props完全一致

<a name="Dialog.prompt"></a>
### Dialog.prompt

**输入对话框:**

`参考Dialog通用`，Dialog.prompt继承自TextInput，因此`prompt`另外还包含 [TextInput Prop](https://facebook.github.io/react-native/docs/textinput#props)及以下props


| 属性 | 说明 | 类型 | 默认值 | 必传 |
| :--- | :--- | :--- | :--- | :--- |
| showHelp | 是否显示帮助按钮 | `boolean` | `false` | 否 |
| onHelpPress | 点击帮助回调 | () => void | null | 否 |
| inputWrapperStyle | TextInput的容器样式 | [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | null | 否 |
| inputStyle | TextInput的样式 | TextInput.propTypes.style | null | 否 |


<a name="Dialog.checkbox"></a>
### Dialog.checkbox

**单选/多选对话框:**

`参考Dialog通用`, Dialog.checkbox中的每一个checkbox项都继承自CheckboxItem，因此`checkbox`还包含[CheckboxItem Prop](https://facebook.github.io/react-native/docs/textinput#props)及以下props

| 属性 | 说明 | 类型 | 默认值 | 必传 |
| :--- | :--- | :--- | :--- | :--- |
| type | checkbox类型 | `radio | switch` | `radio` | 否 |
| value | checkbox值，单选类型需为`string` 或者 `number`, 多选类型为 `array` | `string | number | array` | null | 是 |
| maxItemNum | 数据源超出多少可滚动 | `number` | `5` | 否 |
| dataSource | checkbox数据源 | Object | null | 否 |
| onChange | checkbox更改回调 | `value => void` | null | 否 |


<a name="Dialog.custom"></a>
### Dialog.custom

**自定义对话框:**<br />**<br />**`参考Dialog通用`,Dialog.custom另外包含以下props

| 属性 | 说明 | 类型 | 默认值 | 必传 |
| :--- | :--- | :--- | :--- | :--- |
| header | 自定义头部 | ReactElement | Function | null | 否 |
| footer | 自定义尾部 | ReactElement | Function | null | 否 |
| content | 自定义内容 | `any` | null | 是 |



<a name="Dialog.close"></a>
### Dialog.close

**关闭当前存在的对话框**

