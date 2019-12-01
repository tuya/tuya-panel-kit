# Slider - 滑动选择器


<a name="380c8eae"></a>
## 简介

滑动条，一般在面板内部用于处理可上报下发的数值型dp点。


<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)


<a name="23544d54"></a>
### 水平滑动条

```jsx
import React, { Component } from 'react';
import { View } from 'react-native';
import { Slider } from 'tuya-panel-kit';

export default class SliderHorizontalScene extends Component {
  state = {
    value: 0,
  }

  _handleComplete = value => {
    this.setState({ value: Math.round(value) });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Slider.Horizontal
          style={{ width: 295 }}
          maximumValue={100}
          minimumValue={0}
          value={this.state.value}
          maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
          minimumTrackTintColor="#4397D7"
          onSlidingComplete={this._handleComplete}
        />
      </View>
    );
  }
}
```


<a name="32781299"></a>
### 垂直滑动条

```jsx
import React, { Component } from 'react';
import { View } from 'react-native';
import { Slider } from 'tuya-panel-kit';

export default class SliderVerticalScene extends Component {
  state = {
    value: 24,
  }

  _handleComplete = value => {
    this.setState({ value: Math.round(value) });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Slider.Vertical
          style={{ height: 200 }}
          value={this.state.value}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#4A90E2"
          maximumTrackTintColor="#50E3C2"
        />
      </View>
    );
  }
}
```

## 交互演示

![slider.jpg](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/cf7573c1-87ba-48c4-83ff-077f59bf9a46.gif)<br />

<a name="API"></a>
## API


<a name="style"></a>
### style

容器样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |



<a name="horizontal"></a>
### horizontal

是否为水平方向

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | true |



<a name="disabled"></a>
### disabled

是否禁用

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | false |



<a name="value"></a>
### value

当前值

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 0 |



<a name="minimumValue"></a>
### minimumValue

最小值

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 0 |



<a name="maximumValue"></a>
### maximumValue

最大值

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 1 |



<a name="stepValue"></a>
### stepValue

步长,必须可被minimumValue和maximumValue整除

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 0 |



<a name="onSlidingStart"></a>
### onSlidingStart

滑动开始回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `(value) => void` | 否 | null |



<a name="onValueChange"></a>
### onValueChange

滑动值变更回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `(value) => void` | 否 | null |



<a name="onSlidingComplete"></a>
### onSlidingComplete

滑动结束回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `(value) => void` | 否 | null |



<a name="outerWidth"></a>
### outerWidth

轨道宽度

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | null |



<a name="onlyMaximumTrack"></a>
### onlyMaximumTrack

是否只显示大于当前值的轨道颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | false |



<a name="canTouchTrack"></a>
### canTouchTrack

触摸轨道是否可以更改值

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | false |



<a name="minimumTrackTintColor"></a>
### minimumTrackTintColor

小于当前值的轨道颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Color](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | '#3f3f3f' |



<a name="maximumTrackTintColor"></a>
### maximumTrackTintColor

大于当前值的轨道颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Color](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | '#b3b3b3' |



<a name="trackStyle"></a>
### trackStyle

通用的轨道样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |



<a name="renderMinimumTrack"></a>
### renderMinimumTrack

定制渲染小于当前值的轨道

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `() => React.element` | 否 | null |



<a name="renderMaximumTrack"></a>
### renderMaximumTrack

定制渲染大于当前值的轨道

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `() => React.element` | 否 | null |



<a name="thumbTintColor"></a>
### thumbTintColor

滑块颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Color](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | '#343434' |



<a name="thumbStyle"></a>
### thumbStyle

滑块样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |



<a name="renderThumb"></a>
### renderThumb

定制渲染滑块

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `() => React.element` | 否 | null |



<a name="ea340b9d"></a>
## 方法

| 名称 | 描述 |
| --- | --- |
| Vertical | 垂直的Slider |
| Horizontal | 水平的Slider |


