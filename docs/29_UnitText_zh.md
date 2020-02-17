# UnitText 字体单位

---


<a name="e05dce83"></a>
## 简介

`UnitText字体单位`用于可用于显示一些加粗的展示型文字类型。


<a name="da441097"></a>
## 代码演示

<a name="77c3b6b8"></a>
### 基础使用

```javascript
import React from 'react';
import { ScrollView } from 'react-native';
import { UnitText } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/src/components/iconfont/svg/defaultSvg'; // eslint-disable-line
import svgsART from 'tuya-panel-kit/src/components/iconfont/art/defaultSvg'; // eslint-disable-line
import TesterTitle from '../../components/TesterTitle';

const UnitTextScene = () => {
  return (
    <ScrollView style={{ flex: 1, marginTop: 16 }}>
      <TesterTitle title="基础UnitText" />
      <UnitText value="99" size={36} unit="celsius" valueColor="red" unitColor="red" />
      <TesterTitle title="自定义UnitText每个值的颜色" />
      <UnitText
        value="032"
        size={36}
        unit={svgs.fahrenheit}
        valueColor="red"
        valueColors={['rgba(0, 0, 0, 0.3)', undefined, 'blue']}
        unitColor="red"
      />

      <TesterTitle title="基础UnitText (ART版本)" />
      <UnitText
        useART={true}
        value="99"
        size={50}
        unit="celsius"
        valueColor="red"
        unitColor="red"
      />
      <TesterTitle title="自定义UnitText每个值的颜色 (ART版本)" />
      <UnitText
        useART={true}
        value="032"
        size={50}
        unit={svgsART.fahrenhei}
        valueColor="red"
        valueColors={['rgba(0, 0, 0, 0.3)', undefined, 'blue']}
        unitColor="red"
      />
    </ScrollView>
  );
};

export default UnitTextScene;
```

## 交互演示

![unit-text.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/0019fcf1-a3f4-4701-85df-1231181383a0.gif)


<a name="API"></a>
## API

`Button`的`Props`继承自`TouchableOpacity`，[TouchableOpacity文档](https://facebook.github.io/react-native/docs/touchableopacity#props)

<a name="style"></a>
### style

外层容器的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |


<a name="contentStyle"></a>
### size

字体尺寸大小，**valueSize **或** unitSize **的缩写版，其中 **valueSize** 将会和与 **size** 相同，**unitSize** 将会为 **size** 值的一半。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number`  | 否 | 96 |


<a name="background"></a>
### value

值

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 是 | null |

<a name="rqgMG"></a>
### 
<a name="kYPzG"></a>
### valueSize

值的大小

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | null |


<a name="ss4cg"></a>
### valueColor

值的颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | white |


<a name="066uN"></a>
### valueColors

可以用来定制每个值的颜色，components 3.0.0-rc.4以后开始加入

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `array` | 否 | [] |

<a name="6S3N1"></a>
### 
<a name="gnwHy"></a>
### unit

单位，字符串为内置的svg name，当前IconFont内置的字体图标可参考 `IconFont 文档`

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | '' |

<a name="ytEeh"></a>
### 
<a name="grMrB"></a>
### unitSize

单位的大小
<a name="backgroundStyle"></a>
### 
| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | null |

<a name="exCKS"></a>
### unitColor

单位的颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | white |


<a name="ktfEL"></a>
### unitPaddingLeft

单位的左边距
<a name="xvjRo"></a>
### 
| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 0 |


<a name="V8ofJ"></a>
### unitPaddingTop

单位的上边距
<a name="vBOOG"></a>
### 
| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 0 |


