# BrickButton 块状按钮

<a name="PlFF7"></a>
## 简介

`BrickButton`是在原Button功能基础上进行的丰富。

<a name="3sQyU"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/develop_2.0/example/src/scenes)

```jsx
import { BrickButton } from 'tuya-panel-kit';

<BrickButton text="loading" loading={true} />
```

## 交互演示

![brickButton.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/42dd767f-a73a-457a-a7c6-e5dd00aced48.gif)

<a name="cYZJL"></a>
## API

<a name="hxYFn"></a>
### style

容器样式:

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | null |

<a name="ez0mR"></a>
### onPress

点击事件:

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `() => void` | 否 | () => {} |

<a name="saEPp"></a>
### onChange

事件监听集合:<br />"onShowUnderlay",<br />"onHideUnderlay"

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `(eventName, ...args) => void` | 否 | () => {} |

<a name="EZEtJ"></a>
### loading

loading状态:

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | false |

<a name="ic04m"></a>
### text

按钮文字:

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| PropTypes.string || PropTypes.array<br /> | 否 | '' |


<a name="NT5J8"></a>
### textStyle

按钮文字样式:

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `Text.propTypes.style` | 否 | null |

<a name="AantP"></a>
### type

按钮类型:<br />  <br />'primary',  长条型<br />'primaryGradient', 长条型带渐变<br />'primaryBorder', 长条形带圆角<br />'normal', 正常大小按钮<br />'small' 小型按钮

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `oneOfType` | 否 | primary |

<a name="PPh0T"></a>
### 
<a name="aDDBB"></a>
### wrapperStyle

按钮内部包裹内容样式:

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | null |

<a name="59Iqc"></a>
### 
<a name="nYSP5"></a>
### underlayColor

按钮点按时的颜色 :

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ColorPropType` | 否 | null |

<a name="FBp1c"></a>
### 
<a name="oErSL"></a>
### showUnderlay

是否显示点击时的按钮颜色:

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ColorPropType` | 否 | true |

<a name="m1Suc"></a>
### 
<a name="NLAnT"></a>
### loadingColor

loading组件主颜色:

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ColorPropType` | 否 | '#fff' |

<a name="HTRUV"></a>
### 
<a name="LJ1tc"></a>
### loadingBackground

loading背景颜色:

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 'rgba(0, 0, 0, 0.1)' |

<a name="Sh4hl"></a>
### 
<a name="kBqcn"></a>
### loadingSize

loading大小:<br />'small',<br />'large',<br />数值

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `'small' | 'large' | number` | 否 | 'small' |



<a name="F6rLC"></a>
### loadingStrokeWidth

loading外边框粗细:

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 2 |



<a name="CTYVk"></a>
### background

渐变背景:

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| object | 否 | `{      x1: '0%',      y1: '0%',      x2: '0%',      y2: '100%',      stops: {        '0%': 'red',        '30%': 'blue',        '100%': 'yellow',      },    }` |

