# ToastView 吐司

<a name="a4d3b02a"></a>
## 简介

轻提示，用于提醒用户，不打断操作。

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/tuya/tuya-panel-kit/tree/master/example/src/scenes)

<a name="dcabaf73"></a>
### 受控

```jsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Toast } from 'tuya-panel-kit';

export default class DatePickerDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Toast
            show={this.state.show}
            text="I'm Iron Man!!!"
            onFinish={() => this.setState({ show: false })}
          />
          <TouchableOpacity
            style={styles.wrapperStyle}
            onPress={() => this.setState({ show: true })}
          >
            <Text style={{ textAlign: 'center' }}>Click Me!</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
```

## 交互演示

![toast.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/a5199e04-84d2-4fb6-8ce0-0713b0116774.gif)<br />

<a name="API"></a>
## API

<a name="text"></a>
### text

提示文字


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| string | 否 |



<a name="show"></a>
### show

是否显示


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| bool | 是 |



<a name="onFinish"></a>
### onFinish

即将消失的回调


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| () => void | 是 |



<a name="showPosition"></a>
### showPosition

显示位置

- top：上方
- bottom：下方
- center：中间

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| enum: top, bottom, center | 否 | bottom |

<a name="nTLMr"></a>
### style

toast样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| ViewPropTypes.style | 否 | null |

<a name="SymoK"></a>
### contentStyle

toast内容样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| ViewPropTypes.style | 否 | null |


<a name="3HYsu"></a>
### textStyle

toast文字样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| Text.propTypes.style | 否 | null |

<a name="iQe0t"></a>
### image

toast图标

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| number | 否 | null |

<a name="r5yLY"></a>
### imageStyle

toast图标样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| Image.propTypes.style | 否 | null |


<a name="KjcOP"></a>
### children

自定义toast内容

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| any | 否 | null |
