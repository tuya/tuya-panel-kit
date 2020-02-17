# RotationView 旋转视图

<a name="e05dce83"></a>
## 简介

`RotationView`封装了需要旋转动画的视图容器

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/develop_2.0/example/src/scenes)

<a name="50538bb4"></a>
### 基础使用

只需要传入`active`属性，就可以控制容器的旋转与否。

```jsx
import { RotationView } from 'tuya-panel-kit';

<RotationView active={this.state.active}>
  <View style={styles.wrapperStyle}>
    <TYText style={{ textAlign: 'center' }}>Rotation!!!</TYText>
  </View>
</RotationView>
```

## 交互演示

![rotation-view.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/09053afe-cabe-4c6b-88bc-2c64fb1cccdf.gif)<br />

<a name="API"></a>
## API

<a name="style"></a>
### style

`RotationView`的样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |

<a name="active"></a>
### active

是否开启旋转动画

| 类型(Type) | 必传(Required) | 默认值(Default) |
| :---: | :---: | :---: |
| bool | 否 | true |


<a name="duration"></a>
### duration

旋转动画一圈的时间, 单位是`ms`

| 类型(Type) | 必传(Required) | 默认值(Default) |
| :---: | :---: | :---: |
| number | 否 | 5000 |


<a name="useNativeDriver"></a>
### useNativeDriver

是否使用原生动画驱动, 一般在安卓低端机上会比较有用

| 类型(Type) | 必传(Required) | 默认值(Default) |
| :---: | :---: | :---: |
| bool | 否 | false |


<a name="children"></a>
### children

`RotationView`的嵌套子元素

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `PropTypes.node` | 否 |


