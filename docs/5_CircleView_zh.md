# CircleView 圆形视图

<a name="e05dce83"></a>
## 简介

`CircleView`封装了需要使用圆形视图容器的场景

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

<a name="50538bb4"></a>
### 基础使用

只需要传入半径即可, 其他样式可以通过`style`来指定

```jsx
import { CircleView } from 'tuya-panel-kit';

<CircleView radius={this.state.radius} color="red">
  <View />
</CircleView>
```

## 交互演示

![circle-view.png](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/61ef8ab5-ac51-4aba-97b4-8e7e0523f288.gif)<br />

<a name="API"></a>
## API

<a name="style"></a>
### style

`CircleView`的样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |

<a name="radius"></a>
### radius

圆形视图的半径

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| number | 是 |


<a name="children"></a>
### children

`CircleView`的嵌套子元素

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `PropTypes.node` | 否 |


<a name="color"></a>
### color

圆形视图的背景色

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 |


<a name="borderColor"></a>
### borderColor

圆形视图边框的背景色

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 |


<a name="borderWidth"></a>
### borderWidth

圆形视图边框的尺寸

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| number | 否 |
