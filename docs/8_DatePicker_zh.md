# DatePicker 日期选择器

<a name="a4d3b02a"></a>
## 简介

在涂鸦设备控制面板中，选择时间和日期是一项常见的需求。<br />`DatePicker`是一个灵活的支持多种模式的时间日期选择组件。

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/develop_2.0/example/src/scenes)

<a name="dcabaf73"></a>
### 受控

```jsx
import React from 'react';
import { View } from 'react-native';
import { DatePicker } from 'tuya-panel-kit';

export default class DatePickerDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectDate: new Date();
    }
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <DatePicker 
          date={this.state.selectDate}
          onDateChange={selectDate => this.setState({ selectDate })}
          style={styles.datePickerStyle}
        />
      </View>
    )
  }
}
```

在选择过程中DatePicker会将当前选择的值作为onDateChange回调的参数传回。<br />上面的例子中，DatePicker是一个受控组件，有关受控组件的解释可以参考这里：[Forms](https://reactjs.org/docs/forms.html)。<br />DatePicker的值取决于传入的date，因此我们需要将传回的值手动重新传给组件，这样就完成了一次选择。

<a name="a7ac592d"></a>
### 非受控

```jsx
import React from 'react';
import { View } from 'react-native';
import { DatePicker } from 'tuya-panel-kit';

const DatePickerDemo = () => (
  <View style={styles.wrapper}>
    <DatePicker 
      defaultDate={new Date()} 
      onDateChange={date => console.log(date)} 
      style={styles.datePickerStyle} 
    />
  </View>
) 
```

这个例子中，DatePicker是一个非受控组件，有关非受控组件的解释可以参考这里：[Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html)。<br />DatePicker的值取决于内部的state。

<a name="b2a7a314"></a>
## 交互演示

![datePicker.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/1129ca96-2a18-4fc4-bf4e-7364e57a33d2.gif)<br />

<a name="API"></a>
## API

<a name="style"></a>
### style

指定包裹datePicker的容器样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |


<a name="mode"></a>
### mode

选择器的选择类型：

- date：日期选择（年月日）
- time：时间选择（时分）
- datetime：日期+时间选择（年月日时分）
- year：年份选择（年）
- month：月份选择（年月）

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `enum`: 'date', 'time', 'datetime', 'year', 'month' | 否 |

<a name="loop"></a>
### loop

选择picker是否可循环

| 类型(Type) | 必传(Required) | 默认
| :---: | :---: | :---: |
| `bool` | 否 | false


<a name="pickerFontColor"></a>
### pickerFontColor

picker里字体颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | #333 |

<a name="date"></a>
### date

当前选中的值，设置了该属性即为受控组件

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `Date` | 否 |


<a name="defaultDate"></a>
### defaultDate

默认选中的值

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `Date` | 否 |


<a name="minDate"></a>
### minDate

设置最小可选择的值

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `Date` | 否 | 2000/01/01 |


<a name="maxDate"></a>
### maxDate

设置最大可选择的值

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `Date` | 否 | 2030/12/31 |


<a name="use12Hours"></a>
### use12Hours

是否为12小时制

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | false |


<a name="isAmpmFirst"></a>
### isAmpmFirst

选择上午下午的列是否为第一个选择列，只有当`use12Hours`为true时生效

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | false |


<a name="isTimeFirst"></a>
### isTimeFirst


`小时` 及 `分钟` 选择项是否位于 `年` `月` `日` 之前

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | false |


<a name="locale"></a>
### locale

多语言设置：

- cn：中文，有单位显示
- en：英文，无单位显示
- ILocale：多语言对象，可复写默认key对应的语言值

```typescript
interface ILocale {
  am?: string;
  pm?: string;
  year?: string;
  month?: string;
  day?: string;
  hour?: string;
  minute?: string;
}
```

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `enum`: 'cn', 'en' | ILocale | 否 | 'en' |



<a name="onValueChange"></a>
### dateSortKeys


年月日选择项排序规则，默认为年/月/日/

`['month', 'day', 'year']`  此项排序规则为 月 / 日 / 年

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `Array` | 否 | null |

<a name="O5azw"></a>
### onValueChange

某一项被选中时执行此回调。调用时带有如下参数：

- value: 被选中的value值
- index：改变值所在的列在整个datePicker中是第几列

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| (value, index) => void | 否 |



<a name="onDateChange"></a>
### onDateChange

某一项被选中时执行此回调。调用时带有如下参数：

- date: 改变后完整的日期或是时间

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| (date) => void | 否 |



