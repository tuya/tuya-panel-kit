# Notification 通知栏

---


<a name="FiWxF"></a>
## 简介

`Notification通知栏`顾名思义，是用来显示通知的，可以显示成功、警告、错误此类三种信息；


<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

<a name="77c3b6b8"></a>
### 警告通知

```jsx
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TopBar, Notification } from 'tuya-panel-kit';

export default class NotificationScene extends Component {
  state = {
    visible: true,
  };

  _handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.visible && (
          <Notification
            style={styles.notification}
            message="I am Notification"
            onClose={this._handleClose}
          />
        )}
        {!this.state.visible && (
          <Button
            text="显示Notification"
            textStyle={{ marginTop: 12, fontSize: 24, color: '#000' }}
            onPress={() => this.setState({ visible: true })}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  notification: {
    position: 'absolute',
    top: -TopBar.height,
    left: 0,
    right: 0,
  },
});
```

![notification.png](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/ec8decd9-d7a0-416c-85b6-3dfade812507.gif)

## 交互演示

<a name="API"></a>
## API

<a name="style"></a>
### style
容器样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |

<a name="icon"></a>
### icon
自定义 IconPath

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | null |

<a name="variant"></a>
### variant
通知栏类型

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| 'success'|'warning'|'error'  | 否 | 'warning' |

<a name="enableClose"></a>
### enableClose

是否显示关闭按钮，若为 `false`  ，则会隐藏关闭按钮并在 `autoCloseTime`  后自动触发 `onClose` 回调。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | true |


<a name="autoCloseTime"></a>
### autoCloseTime
自动关闭通知栏时间，只在 `enableClose` 为false时生效。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 1500 |


<a name="message"></a>
### message
通知文案

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | '' |


<a name="onClose"></a>
### onClose
点击关闭按钮时的回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `() => void`  | 否 | null |



<a name="children"></a>
### children
子元素

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `any` | 否 | null |



<a name="theme"></a>
### theme
通知栏的主题配置<br />

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `INotificationTheme`  | 否 | {} |


```typescript
interface INotificationTheme {
  background: ColorPropType;
  text: ColorPropType;
  successIcon: ColorPropType;
  noticeIcon: ColorPropType;
  errorIcon: ColorPropType;
  closeIcon: ColorPropType;
  radius: number;
}
```
