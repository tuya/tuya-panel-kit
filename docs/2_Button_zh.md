# Button 按钮

<a name="e05dce83"></a>
## 简介

`Button`是一个最常用的组件，用于一些纯文本、图片、Icon等需要点击的场合


<!-- 增加 demo -->
<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

<a name="Text"></a>
### Text

```jsx
import { Button } from 'tuya-panel-kit';

<Button text="点击一下我" />
```

<a name="Icon"></a>
### Icon

```jsx
import { Button } from 'tuya-panel-kit';

<Button icon="selected" iconSize={24} text="文字" />
```

<a name="Image"></a>
### Image

```jsx
import { Button } from 'tuya-panel-kit';

<Button image={require('../../res/2.png')} />
```

## 交互演示

![button.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/61304417-38fa-4d94-bace-00e3fa4773f8.gif)

<a name="API"></a>
## API

继承TouchableOpacity组件，详情请见[TouchableOpacity](https://facebook.github.io/react-native/docs/0.51/touchableopacity#props-1)。

<a name="stretch"></a>
### stretch
按钮是否拉伸，跟随父容器

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | false |

<a name="size"></a>
### size

按钮大小:

- noSet: 不设置，靠子元素填充
- large: 大，48px
- normal: 普通，40px
- small: 小，32px
- 数值型

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `enum/number` | 否 | 'noSet' |


<a name="type"></a>
### type

按钮类型：

- primary：跟随主题中的`global.brand`
- normal：即默认背景色为`transparent`

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `enum` | 否 | 'normal' |


<a name="text"></a>
### text

按钮的文字

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | '' |

<a name="background"></a>
### background
按钮背景,可为颜色值或渐变值

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` 或 `object` | 否 | 无 |

<a name="textSingleLine"></a>
### textSingleLine
按钮内的文字是否只显示一行，即超出显示省略号

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | true |

<a name="textDirection"></a>
### textDirection
按钮内的文字排列方向，默认放置文字位于按钮底部

- left: 左
- top: 顶部
- right: 右
- bottom: 底部
- center: 中间

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `enum` | 否 | 'bottom' |

<!-- TODO: 链接挂上 -->
<a name="icon"></a>
### icon

按钮图标id，请见`iconfont-name属性`<br />

<a name="iconPath"></a>
### iconPath

按钮图标路径，请见`iconfont-d属性`<br />

<a name="iconSize"></a>
### iconSize

按钮图标的大小，请见`iconfont-size属性`


<a name="iconColor"></a>
### iconColor

按钮图标的颜色，请见`iconfont-color属性`

<a name="image"></a>
### image

按钮图片的source<br />


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `Image.propTypes.source` | 否 | 无 |

<a name="imageColor"></a>
### imageColor

按钮图片的tintColor

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | 无 |

<a name="imageStyle"></a>
### imageStyle

按钮内的image样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | 无 |

<!-- 
<a name="border"></a>
### border

按钮的边框

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string`、`boolean`、`number` | 否 | 无 | -->


<a name="activeOpacity"></a>
### activeOpacity

按钮点击时的透明度

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number(0到1)` | 否 | 0.5 |


<a name="disabled"></a>
### disabled

是否不可点击

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | false |


<a name="disabledOpacity"></a>
### disabledOpacity

按钮不可用时的透明度

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number(0到1)` | 否 | 0.2 |


<!-- <a name="badgeText"></a>
### badgeText

徽标文字

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `string` | 否 | 无 | -->


<a name="style"></a>
### style

按钮的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | 无 |

<a name="wrapperStyle"></a>
### wrapperStyle

按钮最外部容器样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | 无 |


<a name="textStyle"></a>
### textStyle

按钮文字样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `Text.propTypes.style` | 否 | 无 |


<a name="badgeStyle"></a>
### badgeStyle

徽标样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | 无 |


<a name="badgeTextStyle"></a>
### badgeTextStyle

徽标文字样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `Text.propTypes.style` | 否 | 无 |


<a name="onPress"></a>
### onPress

点击回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `() => {}` | 否 | 无 |


<a name="onLayout"></a>
### onLayout

按钮onLayout回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `(e) => {}` | 否 | 无 |
