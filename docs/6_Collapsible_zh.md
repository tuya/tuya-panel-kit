# Collapsible 折叠

---


<a name="e05dce83"></a>
## 简介

`Collapsible折叠`用于展示一个折叠下拉的动画效果。


<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/develop_2.0/example/src/scenes)


```jsx
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Collapsible } from 'tuya-panel-kit';

class CollapseScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }
  onChange = () => {
    console.log('Change');
  };

  tapBtn = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={this.tapBtn}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#fff',
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ color: '#333' }}>Click me</Text>
        </TouchableOpacity>
        <Collapsible
          collapsed={this.state.collapsed}
          onChange={this.onChange}
          align="top"
          // style={{ position: 'absolute', bottom: 0 }}
        >
          <View
            style={{
              borderRadius: 50,
              width: 375,
              height: 300,
              backgroundColor: '#fff',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                backgroundColor: '#fff',
                textAlign: 'center',
                color: '#333',
              }}
            >
              I am Content
            </Text>
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default CollapseScene;
```

## 交互演示

![collapsible.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/2a81cd4d-76d0-4c02-abf9-8ad7b1d80004.gif)

<a name="API"></a>
## API

<a name="style"></a>
### style

容器样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | 无 |


<a name="align"></a>
### align

子元素对齐方式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| 'top' | 'center' | 'bottom' | 否 | top |


<a name="contentStyle"></a>
### collapsed

是否折叠


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| boolean | 否 | true |



<a name="background"></a>
### collapsedHeight

需要折叠的高度


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| number | 否 | 0 |



<a name="wmGp9"></a>
### duration

折叠动画时长


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| number | 否 | 300 |


<a name="V5yQI"></a>
### easing

动画缓动函数


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Easing](https://facebook.github.io/react-native/docs/easing) | 否 | EaseOutCubic |


<a name="bIEJl"></a>
### onChange

变更回调方法


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| () => void | 否 | null |


<a name="0Ulew"></a>
### children

要折叠的子元素


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| ReactNode | 否 | null |


