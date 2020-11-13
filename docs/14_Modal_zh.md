# Modal 遮罩

<a name="a4d3b02a"></a>
## 简介

`Modal`是一个遮罩层。

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

<a name="704f29e0"></a>
### 基本用法

```jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Modal } from 'tuya-panel-kit';
import ManyModal from './manyModal';

export default class CustomModalScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalText: 'I am a Portal111!!!',
    };
  }

  changeText = string => {
    this.setState({
      modalText: string || 'Ho~Ho~Ho!'
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.setState({ modalVisible: true })}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Click Me!</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.modalVisible}
          onMaskPress={() => this.setState({ modalVisible: false })}
        >
          <Text style={styles.textStyle}>{this.state.modalText}</Text>
          <TouchableOpacity
            onPress={() => this.setState({ modalText: 'Ho~Ho~Ho!' })}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>Change Text!</Text>
          </TouchableOpacity>
        </Modal>
        <ManyModal text={this.state.modalText} changeText={this.changeText} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 20,
  },
  textStyle: {
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#fff',
  }
});
```


<a name="Modal.List"></a>
### Modal.List

```jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Modal } from 'tuya-panel-kit';

export default class ListModalScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ['1'],
      visible: false,
    };
  }

  closeModal = () => {
    this.setState({ visible: false });
  }

  handleConfirm = value => {
    this.setState({ visible: false, value });
  }

  render() {
    const dataSource = [{
      key: '1',
      title: '1',
      value: '1'
    }, {
      key: '2',
      title: '2',
      value: '2',
    }];
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.setState({ visible: true })}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Click Me</Text>
        </TouchableOpacity>
        <Modal.List
          visible={this.state.visible}
          dataSource={dataSource}
          type="switch"
          value={this.state.value}
          onMaskPress={this.closeModal}
          onCancel={this.closeModal}
          // onSelect={this.onConfirm}
          onConfirm={this.handleConfirm}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 20,
  },

  textStyle: {
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});
```

<a name="Modal.Picker"></a>
### Modal.Picker

```jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Modal } from 'tuya-panel-kit';

export default class PickerModalScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
      visible: false,
    };
  }

  closeModal = () => {
    this.setState({ visible: false });
  }

  handleConfirm = value => {
    this.setState({ visible: false, value });
  }

  render() {
    const dataSource = [{
      label: '1',
      value: '1'
    }, {
      label: '2',
      value: '2',
    }];
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.setState({ visible: true })}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Click Me</Text>
        </TouchableOpacity>
        <Modal.Picker
          visible={this.state.visible}
          dataSource={dataSource}
          value={this.state.value}
          label="haha"
          onMaskPress={this.closeModal}
          onCancel={this.closeModal}
          onConfirm={this.handleConfirm}
          onValueChange={value => console.log('onValueChange', value)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 20,
  },

  textStyle: {
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});
```

<a name="Modal.Countdown"></a>
### Modal.Countdown

```jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Modal } from 'tuya-panel-kit';

export default class CountdownModalScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 0,
      visible: false,
    };
  }

  closeModal = () => {
    this.setState({ visible: false });
  }

  handleConfirm = data => {
    this.setState({ countdown: data.hour * 60 + data.minute });
    this.setState({ visible: false });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.setState({ visible: true })}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Click Me</Text>
        </TouchableOpacity>
        <Modal.Countdown
          visible={this.state.visible}
          value={this.state.countdown}
          onMaskPress={this.closeModal}
          onValueChange={this.handleValueChange}
          onCancel={this.closeModal}
          onConfirm={this.handleConfirm}
          title="倒计时"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 20,
  },

  textStyle: {
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});
```

<a name="Modal.DatePicker"></a>
### Modal.DatePicker

```jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Modal } from 'tuya-panel-kit';

export default class DatePickerModalScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      visible: false,
    };
  }

  closeModal = () => {
    this.setState({ visible: false });
  }

  handleConfirm = date => {
    this.setState({ date });
    this.setState({ visible: false });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.setState({ visible: true })}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Click Me</Text>
        </TouchableOpacity>
        <Modal.DatePicker
          visible={this.state.visible}
          onMaskPress={this.closeModal}
          onCancel={this.closeModal}
          onConfirm={this.handleConfirm}
          title="生日"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          date={this.state.date}
          mode="datetime"
          minDate={new Date(1918, 0, 1, 0, 0, 0)}
          maxDate={new Date(2018, 11, 31, 23, 59, 59)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 20,
  },

  textStyle: {
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});
```

## 交互演示

![Modal.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/64b6bb7d-adb3-486d-9a02-907fc3f77e53.gif)<br />

<a name="e0e1d99b"></a>
## API-通用

<a name="visible"></a>
### visible

modal是否显示

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| bool | 是 |


<a name="animationType"></a>
### animationType

modal出现的动画效果，如下

- fade：渐隐渐现
- none：无动画

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string | 否 | fade |


<a name="alignContainer"></a>
### alignContainer

modal默认出现的位置，如下：

- top：上方
- center：中间
- bottom：下方

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string | 否 | bottom |

<a name="onMaskPress"></a>
### onMaskPress

点击遮罩回调

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| () => void | 否 |


<a name="mask"></a>
### mask

是否有遮罩层

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| bool | 否 | true |


<a name="maskStyle"></a>
### maskStyle

遮罩层样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | 无 |


<a name="9c960162"></a>
## API-Modal高阶通用

<a name="titleTextStyle"></a>
### titleTextStyle

modal的头部的文字样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | 否 | 无 |


<a name="titleWrapperStyle"></a>
### titleWrapperStyle

modal的头部样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | 无 |


<a name="title"></a>
### title

modal的头部

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string/React.element | 否 | Modal |


<a name="onCancel"></a>
### onCancel

modal的footer内取消按钮回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| () => void | 否 | 无 |


<a name="onConfirm"></a>
### onConfirm

modal的footer内确认按钮回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| (value) => void | 否 | 无 |


<a name="cancelText"></a>
### cancelText

modal的footer内取消按钮文字

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string | 否 | Cancel |


<a name="confirmText"></a>
### confirmText

modal的footer内确认按钮文字

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string | 否 | Confirm |


<a name="cancelTextStyle"></a>
### cancelTextStyle

modal的footer内取消按钮文字样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | 否 | 无 |


<a name="confirmTextStyle"></a>
### confirmTextStyle

modal的footer内确认按钮文字样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | 否 | 无 |


<a name="footerWrapperStyle"></a>
### footerWrapperStyle

modal的footer样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | 无 |


<a name="footer"></a>
### footer

自定义modal的footer

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| React.element | 否 | 无 |


<a name="API-Modal.List"></a>
## API-Modal.List

`Modal.List`的`props`继承自`FlatList`，[FlatList文档](https://facebook.github.io/react-native/docs/flatlist#props)

<a name="dataSource"></a>
### dataSource

List的数据源

<a name="type"></a>
### type

Modal.List的类型：

- radio：单选
- switch：多选
| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string | 否 | radio |


<a name="selectedIcon"></a>
### selectedIcon

设置type为radio时选中的图标

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| React.element | 否 |


<a name="iconTintColor"></a>
### iconTintColor

设置type为radio时选中图标的颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Color](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | #44DB5E |


<a name="contentCenter"></a>
### contentCenter

内容是否居中

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| bool | 否 | true |


<a name="value"></a>
### value

选中的值，多选类型为array，单选则为string或者number

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string/number/array | 否 | 无 |


<a name="listItemStyle"></a>
### listItemStyle

设置每个listItem的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | 无 |


<a name="onSelect"></a>
### onSelect

点击每行的回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| (value) => void | 否 | 无 |


<a name="API-Modal.Picker"></a>
## API-Modal.Picker

<a name="label"></a>
### label

picker的label

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string | 否 | 无 |


<a name="dataSource-1"></a>
### dataSource

picker的数据源，具体类型如下：

```
PropTypes.arrayOf(PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  label: PropTypes.string,
}))
```

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| array | 否 | 无 |


<a name="value-1"></a>
### value

picker被选中的值

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string/number/bool | 否 | 无 |


<a name="onValueChange"></a>
### onValueChange

picker变化的回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| (value, idx) => void | 否 | 无 |


<a name="API-Modal.Countdown"></a>
## API-Modal.Countdown

<a name="value-2"></a>
### value

倒计时的值，范围为0-1440(24小时)，单位为分钟

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 是 | 无 |


<a name="onlyone"></a>
### onlyone

是否只显示一栏(分钟)，默认显示两栏(小时+分钟)

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | true |


<a name="max"></a>
### max

倒计时最大可选择的值，单位为分钟

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 1440 |


<a name="step"></a>
### step

倒计时步长，单位为分钟

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 1 |


<a name="hourText"></a>
### hourText

小时文案

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | Hour |


<a name="minuteText"></a>
### minuteText

分钟文案

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | Minute |


<a name="onValueChange-1"></a>
### onValueChange

倒计时值变化的回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| (value) => void | 否 | 无 |


<a name="API-Modal.DatePicker"></a>
## API-Modal.DatePicker

`Modal.DatePicker`的`props`完全继承自`DatePicker`
