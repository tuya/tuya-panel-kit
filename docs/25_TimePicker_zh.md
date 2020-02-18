# TimerPicker 时间段选择器

<a name="a4d3b02a"></a>
## 简介

`TimerPicker`是一个时间段选择组件，即选择开始时间和结束时间。

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/develop_2.0/example/src/scenes)

<a name="a7ac592d"></a>
### 基础使用

```jsx
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TimerPicker } from 'tuya-panel-kit';

export default class TimerPickerScene extends Component {
  state = {
    startTime: 0,
    endTime: 0,
  };

  _handleTimerChange = (startTime, endTime) => {
    this.setState({ startTime, endTime });
  };

  render() {
    return (
      <View style={styles.container}>
        <TimerPicker
          title="时间段选择"
          cancelText="取消"
          confirmText="确认"
          startTime={this.state.startTime}
          endTime={this.state.endTime}
          is12Hours={true}
          onTimerChange={this._handleTimerChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

```

## 交互演示

![timer-picker.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/d639d032-51d4-473e-aa40-15174043bd1c.gif)

<a name="API"></a>
## API

<a name="style"></a>
### style

指定包裹timerPicker的容器样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |


<a name="mode"></a>
### startTime

开始时间

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 480(单位为分钟，即08:00) |


<a name="maxDate"></a>
### endTime

结束时间

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 840(单位为分钟，即14:00) |

<a name="pickerFontColor"></a>
### pickerFontColor

picker字体颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | #333 |
  

<a name="disabled"></a>
### disabled

picker是否支持手势

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | false |

<a name="loop"></a>
### loop

是否支持picker循环滚动

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | true |



<a name="is12Hours"></a>
### is12Hours

是否为12小时制

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | true |


<a name="isAmpmFirst"></a>
### singlePicker

是否只需要一个picker

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | false |


<a name="locale"></a>
### prefixPosition

前缀位置（即AMPM位置）

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `enum`: 'left', 'right' | 否 | 'right' |


<a name="onValueChange"></a>
### onTimerChange

时间段更改回调，调用时带有如下参数：

- startTime: 开始时间
- endTime：结束时间

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| (startTime, endTime) => void | 否 |


