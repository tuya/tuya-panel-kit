# Popup 弹出层组件

<a name="e05dce83"></a>
## 简介

`Popup弹出层`是一个包含了一系列常用弹出层的集合，用于显示一些业务相关的组件。

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/develop_2.0/example/src/scenes)

<a name="ad988de0"></a>
### 倒计时弹出层

```jsx
Popup.countdown({
  title: '倒计时',
  cancelText: '取消',
  confirmText: '确认',
  hourText: '小时',
  minuteText: '分钟',
  value: this.state.countdown,
  onConfirm: data => {
    this.setState({ countdown: data.hour * 60 + data.minute });
    Popup.close();
  },
});
```


<a name="790e747d"></a>
### 日期选择弹出层

```jsx
Popup.datePicker({
  title: '生日',
  cancelText: '取消',
  confirmText: '确认',
  hourText: '小时',
  minuteText: '分钟',
  defaultDate: this.state.date,
  mode: 'datetime',
  minDate: new Date(1918, 0, 1, 0, 0, 0),
  maxDate: new Date(2018, 11, 31, 23, 59, 59),
  onConfirm: date => {
    this.setState({ date });
    Popup.close();
  },
});
```



<a name="93rPh"></a>
### 时间段选择弹出层

```jsx
Popup.timerPicker({
  title: '时间段选择',
  cancelText: '取消',
  confirmText: '确认',
  startTime: this.state.timerPickerValue[0],
  endTime: this.state.timerPickerValue[1],
  is12Hours: true,
  onConfirm: ({ startTime, endTime }) => {
    this.setState({ timerPickerValue: [startTime, endTime] });
    Popup.close();
  },
});
```

<a name="i5Nla"></a>
### 数值选择弹出层

```jsx
Popup.numberSelector({
  title: '温度调节 (℃)',
  cancelText: '取消',
  confirmText: '确认',
  value: this.state.numberValue,
  min: 0,
  max: 50,
  onConfirm: value => {
    this.setState({ numberValue: value });
    Popup.close();
  },
});
```


<a name="84866963"></a>
### 列表选择弹出层

```jsx
Popup.list({
  type: 'switch',
  dataSource: [
    {
      key: '1',
      title: '1',
      value: '1',
    },
    {
      key: '2',
      title: '2',
      value: '2',
    },
  ],
  title: 'List',
  cancelText: '取消',
  confirmText: '确认',
  value: this.state.listValue,
  onConfirm: value => {
    this.setState({ listValue: value });
    Popup.close();
  },
});
```

<a name="fc834d24"></a>
### Picker选择弹出层

1. **单picker**

```jsx
Popup.picker({
  dataSource: [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
  ],
  title: 'Picker',
  cancelText: '取消',
  confirmText: '确认',
  value: this.state.pickerValue,
  label: 'haha',
  onConfirm: value => {
    this.setState({ pickerValue: value });
    Popup.close();
  },
});
```

2. **多picker**


```jsx
Popup.picker({
  dataSource: [
    [
      {
        label: 'a',
        value: 'a',
      },
      {
        label: 'b',
        value: 'b',
      },
      {
        label: 'c',
        value: 'c',
      },
    ],
    [
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2',
      },
      {
        label: '3',
        value: '3',
      },
    ],
    [
      {
        label: 'm',
        value: 'm',
      },
      {
        label: 'x',
        value: 'x',
      },
      {
        label: 'd',
        value: 'd',
      },
    ],
  ],
  singlePicker: false,
  title: 'Picker',
  cancelText: '取消',
  confirmText: '确认',
  value: this.state.pickerValues,
  label: ['$', '%'],
  onConfirm: value => {
    this.setState({ pickerValues: value });
    Popup.close();
  },
});
```


<a name="e04893fb"></a>
### 自定义弹出层

弹出一个自定义内容对话框

```jsx
Popup.custom({
  content: (
    <View
      style={{
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Text style={{ fontSize: 36, color: '#000' }}>Custom Content</Text>
    </View>
  ),
  title: 'Custom',
  cancelText: '取消',
  confirmText: '确认',
  onConfirm: () => {
    Popup.close();
  },
});
```


<a name="102acc7d"></a>
### Toast弹出层

```jsx
Popup.toast({
  message: 'I am Toast',
});
```

## 交互演示

![popup.png](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/e0900672-bedf-4c0d-8368-d7f83c8678c1.gif)

<a name="API"></a>
## API

> Popup API除了close以外的第一个参数为给对应组件的props，第二个参数为给Modal的props


`Popup.someMethod(props: Object, modalProps?: Object)`

<a name="19eabada"></a>
### Popup通用
| 属性 | 说明 | 类型 | 默认值 | 必传 |  |
| :--- | :--- | :--- | :--- | :--- | :--- |
| wrapperStyle | 容器样式 | [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | null | 否 |  |
| title | Popup头部标题 | `string | ReactElement` | 'Modal' | 否 |  |
| titleTextStyle | Popup头部标题样式 | [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | null | 否 |  |
| titleWrapperStyle | Popup头部样式 | [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | null | 否 |  |
| switchValue | 头部栏按钮状态，若该值存在则头部栏将会显示Switch按钮<br /> | `boolean` | undefined | 否 |  |
| onSwitchValueChange | 头部栏按钮切换回调 | `value => void` | null | 否 |  |
| footer | 自定义footer | `ReactElement` | null | 否 |  |
| footerType  | footer容器显示状态，显示全部 | 只显示确认 | 只显示取消 | 'both' | 'singleConfirm' | 'singleCancel' | both | 否 |  |
| footerWrapperStyle | footer容器样式 | [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | null | 否 |  |
| cancelText | 取消文案 | `string` | `''` | 否 |  |
| cancelTextStyle | 取消文字样式 | [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | null | 否 |  |
| confirmText | 确认文案 | `string` | `''` | 否 |  |
| confirmTextStyle | 确认文字样式 | [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | null | 否 |  |
| onCancel | 取消点击回调 | `function` | null | 否 |  |
| onConfirm | 确认点击回调 | `function` | null | 否 |  |

<a name="Popup.countdown"></a>
### Popup.countdown

**倒计时弹出层:**

[参考Popup通用](#19eabada)，除通用属性以外还包括以下特有props

| 属性 | 说明 | 类型 | 默认值 | 必传 |
| :--- | :--- | :--- | :--- | :--- |
| value | 倒计时具体值 | `number` | null | 是 |
| onlyone | 是否只显示分钟 | `boolean` | false | 否 |
| min | 倒计时最小值，单位为分钟 | `number` | 0 | 否 |
| max | 倒计时最大值，单位为分钟 | `number` | 1440 | 否 |
| step | 倒计时步长 | `number` | 1 | 否 |
| hourText | 小时文案 | `string` | Hour | 否 |
| minuteText | 分钟文案 | `string` | Minute | 否 |


<a name="Popup.datePicker"></a>
### Popup.datePicker

**日期选择弹出层:**

[参考Popup通用](#19eabada)和`DatePicker`组件。

<a name="6vpm6"></a>
### Popup.timerPicker

[参考Popup通用](#19eabada)和`TimerPicker`组件。

<a name="Popup.numberSelector"></a>
### Popup.numberSelector

**数值选择弹出层:**

[参考Popup通用](#19eabada)，除通用属性以外还包括以下特有props

| 属性 | 说明 | 类型 | 默认值 | 必传 |
| :--- | :--- | :--- | :--- | :--- |
| type | 数值选择弹出层类型 | `basic | slider` | basic | 否 |
| value | 具体值 | `number` | null | 是 |
| max | 可选最大值 | `number` | 100 | 否 |
| min | 可选最小值 | `number` | 0 | 否 |
| step | 步长 | `number` | 1 | 否 |
| scale | 倍数 | `number` | 0 | 否 |
| onValueChange | 值变更事件 | `value => void` | () => {} | 否 |

<a name="Popup.list"></a>
### Popup.list

**列表选择弹出层:**

[参考Popup通用](#19eabada)，Popup.list继承自TYFlatList，因此另外还包含 `TYFlatList Prop`及以下特有props

| 属性 | 说明 | 类型 | 默认值 | 必传 |
| :--- | :--- | :--- | :--- | :--- |
| listItemStyle | 设置每个listItem的样式 | [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | null | 否 |
| maxItemNum | 最大列表数量 | `number` | 5 | 否 |
| dataSource | 数据源，继承自`TYFlatList.Item` | `array` | [] | 否 |
| selectedIcon | 设置type为radio时选中的图标 | `ReactElement` | null | 否 |
| type | 列表选择弹出层的类型 | `switch | radio` | radio | 否 |
| iconTintColor | 设置type为radio时选中图标的颜色 | [ColoPropType](https://facebook.github.io/react-native/docs/colors#docsNav) | #44DB5E | 否 |
| contentCenter | 内容是否居中 | `boolean` | true | 否 |
| value | 选中的值，多选类型为array，单选则为string或者number | `array | string | number` | -1 | 否 |
| onSelect | 选择事件回调 | `value => void` | () => {} | 否 |

<a name="Popup.picker"></a>
### Popup.picker

**Picker选择弹出层:**

[参考Popup通用](#19eabada)，除通用属性以外还包括以下特有props

| 属性 | 说明 | 类型 | 默认值 | 必传 |
| :--- | :--- | :--- | :--- | :--- |
| pickerWrapperStyle | Picker容器样式 | [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | null | 否 |
| pickerStyle | Picker样式 | [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | null | 否 |
| label | Picker的label  | `string | array` | '' | 否 |
| dataSource | Picker的数据源 | `array` | [] | 否 |
| onValueChange | 值变更事件 | `(value, idx)=> void` | () => {} | 否 |
| singlePicker | 是否只显示一个picker | `boolean` | true | 否 |
| spacing | picker两边的边距 | `boolean` | 0 | 否 |
| labelOffset | label距离picker的偏移量 | `number` | 22 | 否 |
| pickerFontColor | picker的字体颜色 | [ColorPropType](https://facebook.github.io/react-native/docs/colors) | #333 | 否 |
| pickerUnitColor | picker的单位颜色 | [ColorPropType](https://facebook.github.io/react-native/docs/colors) | #333 | 否 |

> picker的数据源，具体类型如下：


```typescript
PropTypes.arrayOf(PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array, // 若为多picker则需要为数组
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array, // 若为多picker则需要为数组
  ]),
}))
```

<a name="Popup.custom"></a>
### Popup.custom

**自定义对话框:**

[参考Popup通用](#19eabada)，Popup.custom另外包含以下props

| 属性 | 说明 | 类型 | 默认值 | 必传 |
| :--- | :--- | :--- | :--- | :--- |
| content | 自定义内容 | `any` | null | 是 |

<a name="Popup.toast"></a>
### Popup.toast

**自定义对话框:**

[参考Popup通用](#19eabada)，Dialog.custom另外包含以下props

| 属性 | 说明 | 类型 | 默认值 | 必传 |
| :--- | :--- | :--- | :--- | :--- |
| style | 容器样式 | [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | null | 否 |
| theme | 主题配置 | `Object` | `{<br />  background: '#fff5e5',<br />  text: '#F56351',<br />  closeIcon: 'rgba(0, 0, 0, 0.3)',`<br />`  noticeIcon: '#F56361',`<br />`}` | 否 |
| enableClose | 是否允许主动关闭 | `boolean` | true | 否 |
| onClose | 关闭事件回调 | `() => void` | null | 否 |
| children | 子元素 | `any` | null | 否 |

<a name="Popup.close"></a>
### Popup.close

**关闭当前存在的弹出层**

