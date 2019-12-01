# ControllerBar - 底部栏


<a name="e05dce83"></a>
## 简介

ControllerBar是有着一个或以上按钮的控制栏

ControllerBar.Group是控制栏的集合


<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

<a name="ControllerBar"></a>
### ControllerBar


```jsx
import { ControllerBar } from 'tuya-panel-kit';

<ControllerBar
  size={44}
  button={[{ text: '1', type: 'primary' }, { text: '2', type: 'primary' }]}
/>
```

## 交互演示

![image.png](https://cdn.nlark.com/yuque/0/2019/png/237967/1554188115332-82a0bc43-a3e2-42b5-bffa-467d66cfd22e.png#align=left&display=inline&height=63&name=image.png&originHeight=126&originWidth=750&size=5357&status=done&width=375)

<a name="89c20a14"></a>
### ControllerBar.Group base版


```jsx
import { ControllerBar } from 'tuya-panel-kit';

<ControllerBar.Group style={{ marginTop: 20 }}>
  <ControllerBar
    size={44}
    button={[{ text: '1', type: 'primary' }, { text: '2', type: 'primary' }]}
  />
  <ControllerBar
    size={44}
    button={[{ text: '3', type: 'primary' }, { text: '4', type: 'primary' }]}
  />
</ControllerBar.Group>
```


![image.png](https://cdn.nlark.com/yuque/0/2019/png/237967/1554188208314-74b29280-105f-44b6-8084-5316e7d15de3.png#align=left&display=inline&height=90&name=image.png&originHeight=180&originWidth=750&size=7585&status=done&width=375)

<a name="496d4673"></a>
### ControllerBar.Group Swiper版

```jsx
import { ControllerBar } from 'tuya-panel-kit';

<ControllerBar.Group
  type="swiper"
  style={{ marginTop: 20 }}
  swiperConfig={{
    style: { height: 60 },
    dotActiveStyle: { backgroundColor: 'red' },
    dotStyle: { backgroundColor: 'blue' },
  }}
  size={44}
>
  <ControllerBar
    size={44}
    button={[{ text: '1', type: 'primary' }, { text: '2', type: 'primary' }]}
  />
  <ControllerBar
    size={44}
    button={[{ text: '3', type: 'primary' }, { text: '4', type: 'primary' }]}
  />
</ControllerBar.Group>
```


![image.png](https://cdn.nlark.com/yuque/0/2019/png/237967/1554188392274-4f76dfba-6170-4e3e-b77e-09f7db4918cd.png#align=left&display=inline&height=83&name=image.png&originHeight=166&originWidth=748&size=6480&status=done&width=374)

![controllerBar.png](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/857db451-df79-488e-8e14-b90a205d6253.gif)

<a name="066864c9"></a>
### ControllerBar divide版

```jsx
import { ControllerBar } from 'tuya-panel-kit';

<ControllerBar.Group type="divide" style={{ marginTop: 20 }}>
  <ControllerBar
    size={44}
    button={[{ text: '1', type: 'primary' }, { text: '2', type: 'primary' }]}
  />
  <ControllerBar
    size={44}
    button={[{ text: '3', type: 'primary' }, { text: '4', type: 'primary' }]}
  />
</ControllerBar.Group>
```


![image.png](https://cdn.nlark.com/yuque/0/2019/png/237967/1554188468780-5f423a27-bf07-4e36-98ff-7baf33ab92d8.png#align=left&display=inline&height=91&name=image.png&originHeight=182&originWidth=750&size=7062&status=done&width=375)

<a name="API"></a>
## API

<a name="style"></a>
### style

**外层**容器的样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |

<a name="wrapperStyle"></a>
### wrapperStyle

按钮样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |


<a name="type"></a>
### type

按钮背景类型

- primary: 跟随主题中的`global.brand`
- normal: 即默认背景色为`transparent`

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `enum` | 否 | normal |

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


<a name="stretch"></a>
### stretch

按钮是否拉伸，跟随父容器

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | true |

<a name="backgroundType"></a>
### backgroundType

背景是否为半透明

- pure 纯色
- alpha 半透明



<a name="backgroundColor"></a>
### backgroundColor

背景颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ColorPropType` | 否 | #fff |


<a name="hasBottomBorder"></a>
### hasBottomBorder

底部是否有边框

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | false |

<!-- TODO: button 链接 -->
<a name="button"></a>
### button

controllerBar内的按钮

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `Array`[[ButtonPropTypes](https://www.yuque.com/tuya/rh2ffq/hw74cf#API)] | 是 | 无 |

<a name="a1c9c99c"></a>
## Group API

<a name="style-1"></a>
### style
外层容器样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | 无 |

<a name="type"></a>
### type

群组类别

- warp：普通换行
- swiper：滑动
- divide：相邻有下划线样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `enum` | 否 | warp |


<!-- TODO: 链接 -->
<a name="size-1"></a>
### size

[见上方Size](#size)

<a name="swiperConfig"></a>
### swiperConfig

type为swiper时，swiper的配置

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [SwiperPropTypes](https://www.yuque.com/tuya/rh2ffq/rzh31p#24d67862) | 否 | 无 |



<a name="children"></a>
### children

子节点

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `node` | 是 | 无 |


