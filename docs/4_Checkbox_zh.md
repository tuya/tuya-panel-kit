# Checkbox 选择框

---


<a name="e05dce83"></a>
## 简介

单选框或多选框

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

<a name="c8038ad8"></a>
### 简单checkbox

```jsx
import React, { Component } from 'react';
import { View } from 'react-native';
import { Checkbox } from 'tuya-panel-kit';

export default class CheckboxScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      disabled: false,
    };
  }

  _handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    return (
      <View>
        <Checkbox
          checked={this.state.checked}
          disabled={this.state.disabled}
          onChange={checked => this.setState({ checked })}
        >
          点击选中
        </Checkbox>
        <Checkbox
          color="red"
          checked={this.state.disabled}
          hideOnUnselect={true}
          onChange={disabled => this.setState({ disabled })}
        >
          点击禁用上面那个
        </Checkbox>
      </View>
    );
  }
}
```

## 交互演示

![checkbox.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/1393bcc6-efd8-4320-9cf8-b8259b8f4710.gif)

<a name="API"></a>
## API

<a name="style"></a>
### style

Checkbox的样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |

<a name="size"></a>
### size

Checkbox图标大小

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number`  | 否 | 28 |

<a name="disabled"></a>
### disabled

是否禁用

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean`  | 否 | false |

<a name="disabledColor"></a>
### disabledColor

未选中时的图标颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | null |

<a name="checked"></a>
### checked

是否选中

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean`  | 否 | false |

<a name="checkedIcon"></a>
### checkedIcon

选中状态图标Path

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string`  | 否 | null |


<a name="unCheckedIcon"></a>
### unCheckedIcon

未选中状态图标Path

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string`  | 否 | null |

<a name="reverse"></a>
### reverse

是否颠倒checkbox图标和子元素的位置

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean`  | 否 | false |


<a name="hideOnUnselect"></a>
### hideOnUnselect

非选中状态下是否隐藏图标

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean`  | 否 | false |

<a name="color"></a>
### color

checkbox图标颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | #44DB5E |

<a name="onChange"></a>
### onChange

checkbox的变更事件

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `(checked) => void` | 否 | null |

<a name="children"></a>
### children

checkbox的子元素，一般为Text

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `any` | 否 | null |
