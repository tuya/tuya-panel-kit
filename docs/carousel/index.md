# Carousel - 轮播

<a name="e05dce83"></a>
## 简介

`Carousel`是一个轮播图组件。

<a name="480c216f"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

```jsx
import { Carousel } from 'tuya-panel-kit';
// 注：
// 轮播组件必须给组件设置高度
// 可以通过给父组件添加 onLayout={e => this._onLayout(e)} 获取父元素高度，通过变量
// 设置轮播组件的高度，进行自适应
<Carousel
  style={{ height: 300 }}
  selectedIndex={0}
  autoplay={true}
  loop={true}
  carouselChange={(index) => console.log(index)}
>
  <View style={{ backgroundColor: 'red' }}>
    <Text>Carousel 1</Text>
  </View>
  <View style={{ backgroundColor: 'blue' }}>
    <Text>Carousel 2</Text>
  </View>
  <View style={{ backgroundColor: 'yellow' }}>
    <Text>Carousel 3</Text>
  </View>
</Carousel>
```

## 交互演示

![carousel.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/94feacc8-59ff-4824-a216-a09591e05f57.gif)

<a name="API"></a>
## API

<a name="style"></a>
### style
轮播图的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | 无 |

<a name="dotStyle"></a>
### dotStyle
指示点样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | 无 |

<a name="dotActiveStyle"></a>
### dotActiveStyle
当前激活的指示点样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | 无 |

<a name="dotWrapperStyle"></a>
### dotWrapperStyle
指示点容器样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `ViewPropTypes.style` | 否 | 无 |

<a name="bounces"></a>
### bounces
当内容范围比滚动视图本身大时，是否弹性拉动一截

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | true |

<a name="hasDots"></a>
### hasDots
是否有指示点

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | true |

<a name="loop"></a>
### loop
是否循环

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | false |

<a name="useViewPagerOnAndroid"></a>
### useViewPagerOnAndroid
安卓的实现机制是否使用viewPager

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | true |

<a name="autoplay"></a>
### autoplay
是否自动播放

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | false |

<a name="autoplayInterval"></a>
### autoplayInterval
自动播放间隔时间(ms)

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 2000 |

<a name="selectedIndex"></a>
### selectedIndex
当前激活的索引

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 0 |

<a name="dots"></a>
### dots
自定义指示点

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `props => React.ReactNode` | 否 | defaultDots |

<a name="carouselChange"></a>
### carouselChange
切换回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `index => void` | 否 | 无 |
