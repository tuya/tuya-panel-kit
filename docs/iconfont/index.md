# IconFont - 图标

<a name="a4d3b02a"></a>
## 简介

语义化的矢量图标

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

### 基础使用
```jsx
import React from 'react';
import { ScrollView } from 'react-native';
import { IconFont } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/src/components/iconfont/svg/defaultSvg';
import TesterTitle from '../../components/TesterTitle';

const IconScene = () => {
  return (
    <ScrollView style={{ flex: 1, marginTop: 16 }}>
      <TesterTitle title="内置IconSvg" />
      <IconFont name="0" size={50 * 0.72} color="red" />
      <TesterTitle title="自定义IconSvg" />
      <IconFont d={svgs.plus} size={50 * 0.72} color="red" />
      <TesterTitle title="多个IconSvg" />
      <IconFont d={[svgs[1], svgs[2]]} size={50 * 0.72} color="red" />
    </ScrollView>
  );
};

export default IconScene;
```

<a name="0135bb11"></a>

### 所有内置图标
```jsx
import React from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/src/components/iconfont/svg/defaultSvg'; // eslint-disable-line

const iconDatas = Object.keys(svgs).map(name => ({
  key: name,
  title: name,
  iconSize: 24,
  iconColor: 'red',
  Icon: name,
}));

const IconScene = () => <TYFlatList data={iconDatas} />;

export default IconScene;
```

## 交互演示

![icon-font.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/0bc3f5a4-8747-4a35-956f-beaaa7f9a4a6.gif)

<a name="API"></a>
## API

### style
svg容器样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | 无 |

### viewBox
svg 视口

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | `0 0 1024 1024` |

<a name="name"></a>
### name

组件库内置图标名称，会从组件库默认图标里取，优先级大于 d，默认的内置图标 `name` 可参考`tuya-panel-kit/src/components/iconfont/svg/defaultSvg`

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string | 否 | null |

<a name="color"></a>
### color

图标颜色，fill 和 stroke 的缩写

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | #000 |

<a name="size"></a>
### size

图标大小，为width / height 的简写


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| number | 否 | 12 |

<a name="hFlip"></a>
### hFlip

水平翻转

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| bool | 否 | false |


<a name="vFlip"></a>
### vFlip

垂直翻转

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| bool | 否 | false |

<a name="d"></a>
### d

图标path，svg的path


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string | 否 | null |

<a name="width"></a>
### width

图标宽度，默认为size的值


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| number | 否 | `size`的值 |


<a name="height"></a>
### height

图标高度，默认为size的值


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| number | 否 | `size`的值 |


<a name="fill"></a>
### fill

填充色，若传递该值color会被忽略


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | `color`的值 |


<a name="stroke"></a>
### stroke

描边色


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 | `color`的值 |



<a name="strokeWidth"></a>
### strokeWidth

描边宽度


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| number | 否 | 1 |



<a name="strokeJoin"></a>
### strokeJoin

连接处形状：

- round：圆
- miter：斜方
- bevel：斜

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| enum: round, miter, bevel | 否 | round |



<a name="strokeCap"></a>
### strokeCap

首尾端形状：

- round：圆
- butt：无
- square：方

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| enum: round, butt, square | 否 | round |



<a name="strokeDash"></a>
### strokeDash

实虚线，数组内第一个元素为一段虚线的长度，第二个为间距


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| array | 否 | 无 |

<a name="0169e326"></a>
## 更多资料

[react-native-svg/Path](https://github.com/react-native-community/react-native-svg#path)
