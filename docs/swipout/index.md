# Swipeout - 侧滑

<a name="a4d3b02a"></a>
## 简介

`Swipeout`是一个仿iOS样式的侧滑操作组件

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

<a name="704f29e0"></a>
### 基本用法

```jsx
import React from 'react';
import { View } from 'react-native';
import { Swipeout } from 'tuya-panel-kit';

export default class SwipeoutDemo extends React.PureComponent {
  render() {
    const rightBtn = [{
      text: '删除',
      onPress: () => this.delete(),
      type: 'delete',
      textStyle: { color: '#fff', fontSize: 16 }
    }];
    return (
      <View style={styles.wrapper}>
        <Swipeout autoClose right={rightBtn}>
          <View style={styles.content} />
        </Swipout>
      </View>
    )
  }
}
```

<a name="861afe10"></a>
### 与FlatList配合

```jsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Swipeout } from 'tuya-panel-kit';

export default class SwipeoutDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{
        key: 1, 
        title: 'first', 
        rowOpen: false
      }, { 
        key: 2, 
        title: 'second', 
        rowOpen: false
      }];
    }
  }
  swipeoutOnOpen = index => {
    const dataSource = [].concat(this.state.dataSource);
    dataSource.forEach((item, mindex) => {
      item.rowOpen = mindex === index ? true : false;
    });
    this.setState({ dataSource });
  }

  delete = index => {
    let dataSource = [].concat(this.state.dataSource);
    dataSource.splice(index, 1);
  this.setState({ dataSource });
  }

  renderItem = ({ item, index }) => {
    <Swipeout
      autoClose
      onOpen={() => this.swipeoutOnOpen(index)}
      close={!this.state.dataSource[index].rowOpen}
      right={[{
        text: '删除',
        onPress: () => this.delete(index),
        type: 'delete',
        fontStyle: { color: '#fff', fontSize: 16 }
      }]}
    >
      <Text>{item.title}</Text>
    </Swipeout>
  }

  render() {
    <FlatList
      keyExtractor={(item) => item.key}
      data={this.state.dataSource}
      renderItem={this.renderItem}
    />
  }
}
```

<a name="b2a7a314"></a>
## 交互演示

![swipeout.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/62c8b7aa-fd94-4f65-bd2d-1766801835cf.gif)<br />

<a name="API"></a>
## API

<a name="style"></a>
### style

包裹swipeout的容器样式

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |


<a name="left"></a>
### left

往左滑出现的按钮

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| array[actionButton] | 否 |


<a name="right"></a>
### right

往右滑出现的按钮

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| array[actionButton] | 否 |


<a name="buttonWidth"></a>
### buttonWidth

侧滑之后出现按钮的宽度

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| number | 否 |


<a name="backgroundColor"></a>
### backgroundColor

设置swipeout的背景颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string | 否 | #dbddde |


<a name="disabled"></a>
### disabled

是否禁用swipeout所提供的侧滑操作

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| bool | 否 | false |


<a name="close"></a>
### close

当close从false变为true时，会隐藏所有侧滑操作按钮。<br />反过来true变为false无任何变化。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| bool | 否 | false |


<a name="autoClose"></a>
### autoClose

设置当侧滑操作按钮出现时，点击该按钮自动隐藏所有按钮。

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| bool | 否 | false |


<a name="sectionId"></a>
### sectionId

段Id

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| number | 否 | -1 |


<a name="rowId"></a>
### rowId

行Id

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| number | 否 | -1 |


<a name="onOpen"></a>
### onOpen

任意一侧按钮全显示的回调，带有如下参数：

- sectionId：所在的段Id
- rowId：所在的行Id

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| (sectionId, rowId) => void | 否 |


<a name="onClose"></a>
### onClose

任意一侧按钮全显示的回调，带有如下参数：

- sectionId：所在的段Id
- rowId：所在的行Id
- direction：左侧或是右侧，'left'，'right'

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| (sectionId, rowId, direction?) => void | 否 |


<a name="a192b761"></a>
## actionButton API

<a name="key"></a>
### key

按钮的标识

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| string/number | 否 |


<a name="disabled-1"></a>
### disabled

按钮是否可以点击

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| string/number | 否 | false |


<a name="onPress"></a>
### onPress

按钮点击的回调

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| () => void | 否 |


<a name="content"></a>
### content

自定义按钮，设置了content以后以下的props无效

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| React.ReactElemrnt | 否 |


<a name="backgroundColor-1"></a>
### backgroundColor

设置按钮颜色

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [Color](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 |


<a name="color"></a>
### color

设置按钮内字体颜色

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [Color](https://facebook.github.io/react-native/docs/colors#docsNav) | 否 |


<a name="text"></a>
### text

设置按钮内文字

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| string | 否 |


<a name="type"></a>
### type

设置按钮的类型：

- delete：backgroundColor为#fb3d38
- primary: backgroundColor为#006fff
- secondary：backgroundColor为#fd9427

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| enum: 'delete', 'primary', 'secondary' | 否 |


<a name="fontSize"></a>
### fontSize

设置按钮的文字大小

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| number | 否 | 14 |


<a name="textStyle"></a>
### textStyle

设置按钮的文字样式。<br />注：上方有关文字样式的props的权重较大。

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | 否 |


