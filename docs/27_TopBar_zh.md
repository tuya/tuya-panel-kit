# TopBar 头部栏


<a name="e05dce83"></a>
## 简介

`TopBar`是默认集成在`FullView`中的顶部工具栏，在安卓中也称为`ActionBar`, iOS中称为`UINavigationBar`<br />新版的`TopBar`统一了IOS及安卓两端的写法，且拆分出了[TopBar.Container](#e9bf4cb0)、[TopBar.Content](#38218db6)以及[TopBar.Action](#6f264062)三个组件，若存在高度定制情况，可使用三大组件进行组合构建。<br />此外我们还封装了一份常用的[TopBar](#450c4926)组件，用于较为基础的TopBar定制需求。<br />另外，`TopBar`的高度在安卓和iOS上分别做了适配，可以通过`TopBar.height`获取到`TopBar`的高度. 如果是IPhoneX以上机型，高度是88, 其余iOS机型高度是64, 安卓的TopBar高度是56.

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/tuya/tuya-panel-kit/tree/master/example/src/scenes)


<a name="50538bb4"></a>
### 基础使用

```jsx
import React from 'react';
import { View, Platform } from 'react-native';
import { TYNative, TopBar } from 'tuya-panel-kit';

const backIcon = Platform.OS === 'ios' ? 'backIos' : 'backAndroid';

export default () => (
  <View>
    {/* 拆分版 */}
    <TopBar.Container background="#000">
      <TopBar.Action name={backIcon} color="red" onPress={TYNative.Navigator.pop} />
      <TopBar.Content title="Title" />
      <TopBar.Action name="pen" color="yellow" onPress={TYNative.showDeviceMenu} />
    </TopBar.Container>

    {/* 封装版 */}
    <TopBar
      style={{ marginTop: 24 }}
      background="#000"
      title="Title"
      color="red"
      actions={[{
        name: 'pen',
        color: 'yellow',
        onPress: () => TYNative.showDeviceMenu(),
      }]}
      onBack={TYNative.Navigator.pop}
    />
  </View>
);
```

<a name="d9c2ace0"></a>
### 渐变

```jsx
import React from 'react';
import { View, Platform } from 'react-native';
import { TYNative, TopBar } from 'tuya-panel-kit';

const backIcon = Platform.OS === 'ios' ? 'backIos' : 'backAndroid';

const linearBackground = {
  stops: {
    '0%': 'red',
    '100%': 'yellow',
  },
};

const radialBackground = {
  stops: [{
    offset: '0%',
    stopColor: '#ff0',
    stopOpacity: '1',
  }, {
    offset: '100%',
    stopColor: '#00f',
    stopOpacity: '1',
  }]
};

export default () => (
  <View>
    {/* 拆分版 */}
    <TopBar.Container background={linearBackground}>
      <TopBar.Action
        name={backIcon}
        onPress={TYNative.Navigator.pop}
      />
      <TopBar.Content title="Title" />
    </TopBar.Container>

    {/* 封装版 */}
    <TopBar
      style={{ marginTop: 24 }}
      background={radialBackground}
      title="Title"
      onBack={TYNative.Navigator.pop}
    />
  </View>
);
```

<a name="fd8f9e7f"></a>
### 多工具栏

```jsx
import React from 'react';
import { View, Platform } from 'react-native';
import { TYNative, TopBar } from 'tuya-panel-kit';

const backIcon = Platform.OS === 'ios' ? 'backIos' : 'backAndroid';

export default () => (
  <View>
    {/* 拆分版 */}
    <TopBar.Container background="blue">
      <TopBar.Action
        name={backIcon}
        onPress={TYNative.Navigator.pop}
      />
      <TopBar.Action
        source="定时"
        color="red"
        onPress={() => {
          TYNative.simpleTipDialog('click 定时', () => {});
        }}
      />
      <TopBar.Content
        title="Very Very Very Very Very Long Title"
        subTitle="SubTitle"
        onPress={() => {
          TYNative.simpleTipDialog('click title', () => {});
        }}
      />
      {['plus', 'warning', 'edit'].map(v => (
        <TopBar.Action
          key={v}
          name={v}
          onPress={() => {
            TYNative.simpleTipDialog(`click ${v}`, () => {});
          }}
        />
      ))}
    </TopBar.Container>

    {/* 封装版 */}
    <TopBar
      style={{ marginTop: 24 }}
      background="blue"
      title="Very Very Very Very Very Long Title"
      subTitle="SubTitle"
      onPress={() => TYNative.simpleTipDialog('click title', () => {})}
      leftActions={[{
        name: backIcon,
        onPress: TYNative.Navigator.pop,
      }, {
        source: '定时',
        color: 'red',
        onPress: () => TYNative.simpleTipDialog('click 定时', () => {}),
      }]}
      actions={['plus', 'warning', 'edit'].map(v => ({
        name: v,
        onPress: () => TYNative.simpleTipDialog(`click ${v}`, () => {}),
      }))}
    />
  </View
);
```

## 交互演示

![top-bar.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/bee0ec1b-18bd-405f-8f57-b3414fed0636.gif)

<a name="e9bf4cb0"></a>
## TopBar.Container API

<a name="style"></a>
### style

`TopBar.Container`的容器样式，内部处理了IOS、IPhoneX及安卓端三种StatusBar的情况，如果不需要StatusBar可以自行定义样式。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |


<a name="contentStyle"></a>
### contentStyle

`TopBar.Container`容器主体的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |


<a name="background"></a>
### background

`TopBar.Container`容器的背景，可为颜色或者渐变，渐变的格式可参考`LinearGradient` 或 `RadialGradient`

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` or `object` | 否 | null  |


<a name="children"></a>
### children

`TopBar.Container`容器的子元素，一般为`TopBar.Action`和`TopBar.Content`，`TopBar.Container`会对这两个组件进行自动适配位置。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `any` | 否 | null |


<a name="6f264062"></a>
## TopBar.Action API

`TopBar.Action`为`TopBar`的主要组成部分，它可为`图片`、`文字`或`IconFont`，它会根据`source`来自动判断是什么类型的Action，当然如果存在`name`或`d`这两个props中的一个，那么它会优先渲染`IconFont`。

<a name="style-1"></a>
### style

`TopBar.Action`的样式。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |


<a name="contentStyle-1"></a>
### contentStyle

`TopBar.Action`主体的样式，可为图片、文字或IconFont的样式。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ImageStyleProps](https://facebook.github.io/react-native/docs/image-style-props) or [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) or [IconFontProps](/docs/basic-components/icon-font) | 否 | null |


<a name="size"></a>
### size

`TopBar.Action`的IconFont的尺寸

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 26 |


<a name="spacing"></a>
### spacing

`TopBar.Action`的左右边距，注若为文字类型`spacing`将会被作为额外宽度添加给`Action`

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 6 |


<a name="color"></a>
### color

`TopBar.Action`主体内容的颜色，可为图片的底色、文字颜色或IconFont颜色。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | #fff |


<a name="source"></a>
### source

`TopBar.Action`的主体内容，若为字符串则渲染`文字`组件，若为数值或网络图片则渲染`图片`组件，若不存在则渲染空View。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` or `number` or `{ uri }` | 否 | null |


<a name="disabled"></a>
### disabled

是否禁用

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | false |


<a name="background-1"></a>
### background

`TopBar`的背景，可为颜色或者渐变

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` or `object` | 否 |  |


<a name="children-1"></a>
### children

`TopBar.Action`的子元素，如果不传`TopBar.Action`会自动根据所传`source`的类型自动渲染所需子元素。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `any` | 否 | null |


<a name="38218db6"></a>
## TopBar.Content API

`TopBar.Content`顾名思义为`TopBar`的中央内容组件。

<a name="style-2"></a>
### style

`TopBar.Content`的样式。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |


<a name="color-1"></a>
### color

`TopBar.Content`标题及副标题颜色，副标题颜色为该颜色加0.6透明度

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | #fff |


<a name="title"></a>
### title

`TopBar.Content`的标题

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | '' |


<a name="titleStyle"></a>
### titleStyle

`TopBar.Content`的标题样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | 否 | null |


<a name="subTitle"></a>
### subTitle

`TopBar.Content`的副标题

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | '' |


<a name="subTitleStyle"></a>
### subTitleStyle

`TopBar.Content`的副标题样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | 否 | null |


<a name="position"></a>
### position

`TopBar.Content`的位置，可为左对齐、居中对齐和右对齐

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `enum: 'left','center','right'` | 否 | center |


<a name="children-2"></a>
### children

`TopBar.Content`的子元素

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `any` | 否 | null |


<a name="onPress"></a>
### onPress

`TopBar.Content`的点击事件

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `() => void` | 否 | null |


<a name="450c4926"></a>
## TopBar API

`TopBar`为封装好的组件，定制化程度较低时可使用，此外`TopBar`的`props`除以下列举的以外还可继承自`TopBar.Content`

<a name="style-3"></a>
### style

`TopBar.Container`的容器样式，内部处理了IOS、IPhoneX及安卓端三种StatusBar的情况，如果不需要StatusBar可以自行定义样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |


<a name="contentStyle-2"></a>
### contentStyle

`TopBar.Container`容器主体的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |


<a name="background-2"></a>
### background

`TopBar.Container`容器的背景，可为颜色或者渐变，渐变的格式可参考`LinearGradient` 或 `RadialGradient`
| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` or `object` | 否 |  |


<a name="color-2"></a>
### color

`TopBar.Action`主体内容的颜色，可为图片的底色、文字颜色或IconFont颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | #fff |


<a name="leftActions"></a>
### leftActions

`TopBar`的左侧工具栏配置，如果为`null`则会渲染默认的IOS、安卓对应的返回按钮

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `array` | 否 | null |


<a name="actions"></a>
### actions

`TopBar`的右侧工具栏配置，数组中的对象将会作为`props`传递给`TopBar.Action`

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `array` | 否 | null |


<a name="onBack"></a>
### onBack

返回事件

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `() => void` | 否 | null |
