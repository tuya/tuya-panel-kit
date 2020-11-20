# LinearGradient 线性渐变

<a name="e05dce83"></a>
## 简介
主要是给子节点提供一个线性渐变的效果

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/tuya/tuya-panel-kit/tree/master/example/src/scenes)

<a name="4df5d75b"></a>
### 垂直两段渐变

```jsx
import React from 'react';
import { View } from 'react-native';
import { Rect } from 'react-native-svg';
import { LinearGradient } from 'tuya-panel-kit';

const dimension = { width: 200, height: 300 };

export default () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={dimension}>
      <LinearGradient
        style={dimension}
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
        stops={{
          '0%': 'red',
          '100%': 'yellow',
        }}
      ><Rect {...dimension} />
      </LinearGradient>
    </View>
  </View>
);
```

<a name="6f50cd5a"></a>
### 斜向三段渐变

```jsx
import React from 'react';
import { View } from 'react-native';
import { Rect } from 'react-native-svg';
import { LinearGradient } from 'tuya-panel-kit';

const dimension = { width: 200, height: 300 };

export default () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={dimension}>
      <LinearGradient
        style={dimension}
        x1="100%"
        y1="0%"
        x2="0%"
        y2="100%"
        stops={{
          '0%': 'red',
          '30%': 'blue',
          '100%': 'yellow',
        }}
      ><Rect {...dimension} />
      </LinearGradient>
    </View>
  </View>
);
```

<a name="cc698dbd"></a>
### 面板背景渐变

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
        '3%': 'red',
        '90%': 'yellow',
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

![linear-gradient.png](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/93d12464-c7f1-4e40-b6d9-3fe67338882d.gif)

<a name="API"></a>
## API

<a name="style"></a>
### style

容器样式


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |



<a name="children"></a>
### children

该子节点会被添加渐变效果，一般为Rect


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `any` | 否 | null |



<a name="x1"></a>
### x1

起始点的x轴坐标


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | '0%' |



<a name="y1"></a>
### y1

起始点的y轴坐标


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | '0%' |



<a name="x2"></a>
### x2

终点的x轴坐标


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | '0%' |



<a name="y2"></a>
### y2

终点的y轴坐标


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | '100%' |



<a name="stops"></a>
### stops

渐变梯度停点


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `object` | 否 | { '0%': 'rgb(255, 255, 255)', '100%': 'rgb(0, 0, 0)' } |



> 以上默认值为从左上角至左下角进行由白色至黑色的线性渐变

<a name="0169e326"></a>
## 更多资料

[react-native-svg/LinearGradient](https://github.com/react-native-community/react-native-svg#lineargradient)
