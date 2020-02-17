# SwitchButton 开关

---


<a name="a4d3b02a"></a>
## 简介

`SwitchButton`是一个开关组件

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/develop_2.0/example/src/scenes)

<a name="dcabaf73"></a>
### 受控

```jsx
import React from 'react';
import { View } from 'react-native';
import { SwitchButton } from 'tuya-panel-kit';

export default class SwitchButtonDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: true;
    }
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <SwitchButton 
          value={this.state.value}
          onValueChange={value => { this.setState({ value }); }}
        />
      </View>
    )
  }
}
```

<a name="a7ac592d"></a>
### 非受控

```jsx
import React from 'react';
import { View } from 'react-native';
import { SwitchButton } from 'tuya-panel-kit';

const SwitchButtonDemo = () => (
  <View style={styles.wrapper}>
    <SwitchButton 
      defaultValue={true} 
      onValueChange={value => console.log(value)} 
    />
  </View>
) 
```

## 交互演示

![switch-button.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/7b862700-58c6-4fc6-be74-e562713aa7b5.gif)

<a name="API"></a>
## API

<a name="style"></a>
### style

指定包裹switchButton的容器样式


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |


<a name="thumbStyle"></a>
### thumbStyle

指定thumb的样式


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |



<a name="value"></a>
### value

当前选中的值，设置了该属性即为受控组件


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `bool` | 否 |



<a name="defaultValue"></a>
### defaultValue

默认选中的值


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | true |


<a name="useNativeDriver"></a>
### useNativeDriver

是否使用Native Driver

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | true |


<a name="size"></a>
### size

设置switchButton的大小：

- width：宽度
- height：高度
- activeSize：thumb的大小
- margin：thumb距离最近边界的大小

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `Object` | 否 | { width: 50, height: 28, activeSize: 26, margin: 1 } |



<a name="tintColor"></a>
### tintColor

设置当switchButton的value为false时背景颜色


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Color](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | transparent |



<a name="onTintColor"></a>
### onTintColor

设置当switchButton的value为true时颜色


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Color](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | #44DB5E |



<a name="thumbTintColor"></a>
### thumbTintColor

设置当switchButton的value为false时thumb颜色


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Color](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | #E5E5E5E5 |



<a name="onThumbTintColor"></a>
### onThumbTintColor

设置当switchButton的value为true时thumb颜色，若没有设置则为thumbTintColor的值


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Color](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | 无 |



<a name="borderColor"></a>
### borderColor

设置当switchButton的value为false时边框颜色<br />当switchButton的value为true时边框颜色等于onTintColor


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Color](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | #E5E5E5 |



<a name="disabled"></a>
### disabled

是否禁用switchButton


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | false |



<a name="onValueChange"></a>
### onValueChange

改变switchButton值时执行此回调

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| (value) => void | 否 |



