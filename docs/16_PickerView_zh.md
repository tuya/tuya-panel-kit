# PickerView 滚动选择器

<a name="e05dce83"></a>
## 简介

`PickerView`是一个多选一的容器视图.<br />**请务必给`PickerView`指定一个宽高，否则无法渲染.**，常用在**时间选择**,**日期选择**等组件里出现配合实现。

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/develop_2.0/example/src/scenes)

<a name="e0d8ca9e"></a>
### 基础选择器

1个`PickerView`即代表一个选择器<br />在`PickerView`中, `selectedValue`代表当前选中的值,`onValueChange`是值滑动改变后的回调函数

```jsx
import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { Picker } from 'tuya-panel-kit';
import ExplorerLayout from '../../components/ExplorerLayout';

export default class PickerViewScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: ['clojure', 'elixir', 'haskell', 'scala'],
      value: 'elixir',
    };
  }

  _handleChange = value => {
    this.setState({ value });
    console.log(value);
  }

  renderContent = () => {
    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.tip}>Please Choose Your Favorite Language:</Text>
        <Picker
          style={[styles.picker]}
          itemStyle={styles.pickerItem}
          selectedValue={this.state.value}
          onValueChange={this._handleChange}
        >
          {this.state.languages.map(value => (
            <Picker.Item key={value} value={value} label={value} />
          ))}
        </Picker>
      </View>
    );
  }

  renderPlayground = () => {
    return (
      <View />
    );
  }

  render() {
    return (
      <ExplorerLayout
        renderContent={this.renderContent}
        renderPlayground={this.renderPlayground}
      />
    );
  }
}
```

<a name="824e6f89"></a>
### 时间选择器

最常用的就是时间选择器，每个选择都是一个`PickerView`, 这里实现的是一个12小时制的时间选择器, 所以需要3个`PickerView`

```jsx
import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Picker } from 'tuya-panel-kit';
import ExplorerLayout from '../components/ExplorerLayout';
import ControlNumber from '../components/ControlNumber';

export default class PickerViewScene extends Component {
  constructor(props) {
    super(props);
    this.hours = _.times(12, n => _.padStart(n === 0 ? 12 : n, 2, '0'));
    this.minutes = _.times(60, n => _.padStart(n, 2, '0'));
    this.state = {
      amPm: 'AM',
      hour: '12',
      minute: '00',
    };
  }

  _handleChange = key => value => {
    const v = typeof value === 'number' ? _.padStart(value, 2, '0') : value;
    this.setState({ [key]: v });
  };

  renderContent = () => {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          style={[styles.picker, styles.pickerLeft]}
          itemStyle={styles.pickerItem}
          selectedValue={this.state.amPm}
          onValueChange={this._handleChange('amPm')}
        >
          {['AM', 'PM'].map(value => (
            <PickerView.Item key={value} value={value} label={value} />
          ))}
        </Picker>
        <Picker
          style={[styles.picker, styles.pickerMiddle]}
          itemStyle={styles.pickerItem}
          selectedValue={this.state.hour}
          onValueChange={this._handleChange('hour')}
        >
          {this.hours.map(value => (
            <PickerView.Item key={value} value={value} label={value} />
          ))}
        </Picker>
        <Picker
          style={[styles.picker, styles.pickerRight]}
          itemStyle={styles.pickerItem}
          selectedValue={this.state.minute}
          onValueChange={this._handleChange('minute')}
        >
          {this.minutes.map(value => (
            <Picker.Item key={value} value={value} label={value} />
          ))}
        </Picker>
      </View>
    );
  }

  renderPlayground = () => {
    return (
      <View>
        <ControlNumber
          min={1}
          max={12}
          title="hour"
          value={+this.state.hour}
          stepValue={1}
          onChange={this._handleChange('hour')}
          onComplete={this._handleChange('hour')}
        />
        <ControlNumber
          min={0}
          max={59}
          title="minute"
          value={+this.state.minute}
          stepValue={1}
          onChange={this._handleChange('minute')}
          onComplete={this._handleChange('minute')}
        />
      </View>
    );
  }

  render() {
    return (
      <ExplorerLayout
        renderContent={this.renderContent}
        renderPlayground={this.renderPlayground}
      />
    );
  }
}
```

## 交互演示

![picker-view.png](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/2915530c-02eb-42cd-9baf-d45b8bfbc739.gif)

<a name="cf04522e"></a>
## Picker API

`iOS`上`PickerView`使用的是`PickerIOS`, [PickerIOS文档](https://facebook.github.io/react-native/docs/pickerios)<br />安卓上的API继承自`ViewPropTypes`, [ViewPropTypes文档](https://facebook.github.io/react-native/docs/view#props)

<a name="itemTextColor"></a>
### itemTextColor

Picker选项的文字颜色

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | `'#cccccc'` | `Android` |


<a name="selectedItemTextColor"></a>
### selectedItemTextColor

Picker选项选中的文字颜色

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | `'black'` | `Android` |


<a name="dividerColor"></a>
### dividerColor

Picker选项分割线颜色

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | `'#cccccc'` | `Android` |


<a name="visibleItemCount"></a>
### visibleItemCount

Picker可视区域项目个数

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| number | 否 | `8` | `Android` |


<a name="itemAlign"></a>
### itemAlign

Picker项目对齐方式

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| string | 否 | `'center'` | `Android` |


<a name="textSize"></a>
### textSize

Picker项目文字大小

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| number | 否 | `20` | `Android` |


<a name="children"></a>
### children

PickerView的子元素

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| `PropTypes.node` | 是 | `undefined` | `all` |


<a name="9f2e9dec"></a>
## Picker.Item API

<a name="value"></a>
### value

Picker Item的值

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| string, number | 否 | `undefined` | `all` |


<a name="label"></a>
### label

Picker Item的标签说明, 也就是展示给用户看的

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| string | 否 | `undefined` | `all` |


