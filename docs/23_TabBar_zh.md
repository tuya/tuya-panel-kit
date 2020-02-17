# TabBar 标签栏拆分版

<a name="e05dce83"></a>
## 简介

拆分tab，更细粒度的控制。<br />
目前有两种类型<br />
默认是最基础的Tab<br />

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/develop_2.0/example/src/scenes)

<a name="18c63459"></a>
### 默认

```jsx
import { TabBar } from 'tuya-panel-kit';

this.state = {
  tab: '2',
}

const tabs = Array.from(Array(10), (v, k) => k + 1).map(v => {
  return { key: `${v}`, title: `Tab${v}` };
});

<TabBar
  tabs={tabs}
  activeKey={this.state.tab}
  onChange={value => this.setState({ tab: value })}
  underlineStyle={{ width: 20, marginHorizontal: 30 }}
/>
```

<a name="Radio"></a>
### Radio

```jsx
import { TabBar } from 'tuya-panel-kit';

this.state = {
  tab: '2',
}

const tabRadios = Array.from(Array(3), (v, k) => k + 1).map(v => {
  return { key: `${v}`, title: `Tab${v}` };
});

<TabBar
  type="radio"
  tabs={tabRadios}
  activeKey={this.state.tab}
  onChange={value => this.setState({ tab: value })}
  style={{ borderColor: 'red', margin: 10 }}
/>
```

## 交互演示

![tab-bar.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/6540725c-cd74-4c40-91e7-9c694fe20c4b.gif)


<a name="API"></a>
## API

<a name="type"></a>
### type

tab类型

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| enum: radio、default | 否 | 'default' |


<a name="tabs"></a>
### tabs

tab数据

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| Array[[TabModel](#TabModel)] | 是 | 无 |


<a name="activeKey"></a>
### activeKey

高亮tab的key

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| string/number | 无 | 无 |


<a name="defaultActiveKey"></a>
### defaultActiveKey

默认高亮tab的key

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| string/number | 无 | 0 |


<a name="onChange"></a>
### onChange

tab切换的回调

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| key => {} | 无 | 无 |


<a name="wrapperStyle"></a>
### wrapperStyle

tab内层容器样式

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| ViewPropTyps.style | 无 | 无 |


<a name="style"></a>
### style

tab外层容器样式

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| ViewPropTyps.style | 无 | 无 |


<a name="34a215a3"></a>
## 默认Tab独有的props

<a name="underlineStyle"></a>
### underlineStyle

下划线的样式

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| ViewPropTyps.style | 无 | 无 |


<a name="tabStyle"></a>
### tabStyle

每个tab的样式

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| ViewPropTyps.style | 无 | 无 |


<a name="tabActiveStyle"></a>
### tabActiveStyle

高亮tab的样式

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| ViewPropTyps.style | 无 | 无 |


<a name="tabTextStyle"></a>
### tabTextStyle

每个tab内文字的样式

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| Text.propTypes.style | 无 | 无 |


<a name="tabActiveTextStyle"></a>
### tabActiveTextStyle

高亮tab的文字样式

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| Text.propTypes.style | 无 | 无 |


<a name="TabModel"></a>
## TabModel

<a name="title"></a>
### title

tab的文字或者节点

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| string/element | 无 | 无 |


<a name="style-1"></a>
### style

单独tab定制样式

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| ViewPropTyps.style | 无 | 无 |


<a name="activeStyle"></a>
### activeStyle

单独高亮tab定制样式（默认类型独有）

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| ViewPropTyps.style | 无 | 无 |


<a name="textStyle"></a>
### textStyle

单独tab定制文字样式

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| Text.propTypes.style | 无 | 无 |


<a name="activeTextStyle"></a>
### activeTextStyle

单独高亮tab定制文字样式

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| Text.propTypes.style | 无 | 无 |

<a name="4d913f71"></a>
## Radio独有属性

<a name="activeColor"></a>
### activeColor

高亮颜色

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| string | 无 | '#fff' |

<a name="a5Zrp"></a>
### gutter

tab间隔

| 类型(Type) | 必传(Required) | 默认值(default) |
| :---: | :---: | :---: |
| number | 无 | 2 |

