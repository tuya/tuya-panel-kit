# RadialGradient 径向渐变

<a name="e05dce83"></a>
## 简介

径向渐变与线性渐变相似，只是它是从一个点开始发散绘制渐变

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

<a name="70a9d973"></a>
### 基础放射渐变

以下为渐变半径为100，内侧圆坐标(100,100), 外侧圆坐标(100, 100), 向外进行由黄色-蓝色的径向渐变

```jsx
import React from 'react';
import { View } from 'react-native';
import { RadialGradient } from 'tuya-panel-kit';
const dimension = { width: 200, height: 300 };
export default () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={dimension}>
      <RadialGradient
        style={dimension}
        stops={[{
          offset: '0%',
          stopColor: '#ff0',
          stopOpacity: '1',
        }, {
          offset: '100%',
          stopColor: '#00f',
          stopOpacity: '1',
        }]}
        rx="50%"
        ry="50%"
        fx="50%"
        fy="50%"
        cx="50%"
        cy="50%"
      />
    </View>
  </View>
);
```

<a name="e3EGZ"></a>
### 基础放射渐变2

以下为渐变半径为100，内侧圆坐标(200,100), 外侧圆坐标(100, 100), 向外进行由红色-黄色-粉色的径向渐变

```jsx
import React from 'react';
import { View } from 'react-native';
import { RadialGradient } from 'tuya-panel-kit';
const dimension = { width: 200, height: 300 };
export default () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={dimension}>
      <RadialGradient
        style={dimension}
        stops={[{
          offset: '0%',
          stopColor: 'red',
          stopOpacity: '1',
        }, {
          offset: '50%',
          stopColor: 'yellow',
          stopOpacity: '1',
        }, {
          offset: '100%',
          stopColor: 'pink',
          stopOpacity: '1',
        }]}
        rx="50%"
        ry="50%"
        fx="100%"
        fy="50%"
        cx="50%"
        cy="50%"
      />
    </View>
  </View>
);
```


<a name="UI29I"></a>
### 业务中给面板背景添加径向渐变效果

```jsx
import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { NavigatorLayout } from 'tuya-panel-kit';
import composeLayout from './composeLayout';
import configureStore from './redux/configureStore';
import { routers } from './config';
export const store = configureStore();
class MainLayout extends NavigatorLayout {
  hookRoute(route) {
    return {
      ...route,
      background: {
        stops: [{
          offset: '0%',
          stopColor: 'yellow',
          stopOpacity: '1',
        }, {
          offset: '100%',
          stopColor: 'red',
          stopOpacity: '1',
        }],
      },
    };
  }
  renderScene(route, navigator) {
    let Scene = <View />;
    let schema = {};
    let uiConfig = {};
    const { dispatch, devInfo, dpState } = this.props;
    if (!_.isEmpty(devInfo)) {
      schema = devInfo.schema || {};
      uiConfig = devInfo.uiConfig || {};
    }
    const router = routers.find(r => r.id === route.id);
    if (router && router.Scene) {
      const Component = router.Scene;
      Scene = (
        <Component
          dpData={{ state: dpState, schema, uiConfig }}
          dispatch={dispatch}
          navigator={navigator}
          {...route}
        />
      );
    }
    return Scene;
  }
}
export default composeLayout(store, MainLayout);
```

## 交互演示

![radial-gradient.png](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/c7a1dc7c-835d-4d98-acd1-24b9a495b67d.gif)



<a name="API"></a>
## API

<a name="style"></a>
### style

容器样式

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null | `all` |


<a name="rx"></a>
### rx

最内侧圆水平方向的半径(渐变长度)

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| `string` | 否 | '50%' | `all` |


<a name="ry"></a>
### ry

最内侧圆垂直方向的半径(渐变高度)

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| `string` | 否 | '50%' | `all` |


<a name="fx"></a>
### fx

最内侧圆的x轴坐标点(渐变中心点)

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| `string` | 否 | '50%' | `all` |


<a name="fy"></a>
### fy

最内侧圆的y轴坐标点(渐变中心点)

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| `string` | 否 | '50%' | `all` |


<a name="cx"></a>
### cx

最外侧圆的x轴坐标点

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| `string` | 否 | '50%' | `all` |


<a name="cy"></a>
### cy

最外侧圆的y轴坐标点

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| `string` | 否 | '50%' | `all` |


<a name="stops"></a>
### stops

渐变梯度停点

| 类型(Type) | 必传(Required) | 默认值(Default) | 平台(OS) |
| :---: | :---: | :---: | :---: |
| `array` | 否 | [{offset: '0%',stopColor: '#ff0',stopOpacity: '1'},{offset:'100%',stopColor:'#00f',stopOpacity:'1'}] | `all` |


> 以上默认值为由中心点向外发散的渐变(黄色 -> 蓝色)


<a name="0169e326"></a>
## 更多资料

[react-native-svg/RadialGradient](https://github.com/react-native-community/react-native-svg#radialgradient)
