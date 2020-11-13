# Tab 标签栏

<a name="a4d3b02a"></a>
## 简介

`Tab`是一个标签栏组件，用于让用户在不同的视图中进行切换

<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

```jsx
import React from 'react';
import { Text } from 'react-native';
import { Tab } from 'tuya-panel-kit';

export default class TabDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { tab: '1' };
  }
  render() {
    const tabPaneArr = [1, 2, 3, 4];
    const contentStyle = {
      height: 200,
      color: '#333',
      textAlign: 'center',
      lineHeight: 200,
      backgroundColor: '#fff'
    };
    const tabPanes = tabPaneArr.map(item => (
      <Tab.TabPane key={`${item}`} tab={`${item}`}>
        <Text style={contentStyle}>{`The No.${item} Tab`}</Text>
      </Tab.TabPane>
    ));
    return (
      <Tab
        activeKey={this.state.tab}
        onChange={value => this.setState({ tab: value })}
      >
        { tabPanes }
      </Tab>
    );
  }
}
```

## 交互演示

![tab.gif](https://airtake-public-data.oss-cn-hangzhou.aliyuncs.com/fe-static/tuya-docs/bdf9fb44-ee16-4634-a8d3-ee0e7d4b4ad0.gif)<br />

<a name="API"></a>
## API

<a name="style"></a>
### style

包裹tab的容器样式


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |



<a name="activeKey"></a>
### activeKey

所激活视图的key


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `number`/`string` | 否 |



<a name="defaultActiveKey"></a>
### defaultActiveKey

默认激活视图的key


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `number`/`string` | 否 |



<a name="onChange"></a>
### onChange

切换视图的回调，参数如下：

- activeKey：所激活视图的key

| 类型(Type) | 必传(Required) |
| :---: | :---: |
| (activeKey) => void | 否 |



<a name="tabStyle"></a>
### tabStyle

设置每个tab的样式


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |



<a name="tabBarStyle"></a>
### tabBarStyle

设置tabBar的样式


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |

<a name="tabContentStyle"></a>
### tabContentStyle

设置tabContent的样式


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |



<a name="tabsContainerStyle"></a>
### tabsContainerStyle

设置包裹tabBar的容器样式


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |

<a name="i27JK"></a>
### tabBarBackgroundColor
设置tabBar的背景颜色


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |

<a name="tabBarUnderlineStyle"></a>
### tabBarUnderlineStyle

设置tabBar的下划线样式


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 |



<a name="tabTextStyle"></a>
### tabTextStyle

设置tab内文字样式


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | 否 |



<a name="tabActiveTextStyle"></a>
### tabActiveTextStyle

设置激活的tab内文字样式


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| [Text.propTypes.style](https://facebook.github.io/react-native/docs/text#style) | 否 |


<a name="82d64dd0"></a>
### tabBarPosition

tabBar的位置



| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `enum`(top、bottom) | 否 | 'top' |



<a name="animated"></a>
### animated

切换视图是否有动画


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | true |



<a name="swipeable"></a>
### swipeable

是否可滑动视图


| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | true |


<a name="useViewPagerOnAndroid"></a>
### useViewPagerOnAndroid

是否在安卓上使用viewPager



| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `bool` | 否 | true |


<a name="children"></a>
### children

子元素，参考`Tab.TabPane`


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `element`, `array` | 否 |



<a name="3b1ff0b0"></a>
## TabPane API

<a name="key"></a>
### key

视图的标识


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `string`/`number` | 是 |



<a name="tabWidth"></a>
### tabWidth

每个tab的宽度


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `number` | 否 |



<a name="tab"></a>
### tab

tab上文字或者自定义的元素


| 类型(Type) | 必传(Required) |
| :---: | :---: |
| `'string' | React.ReactNode` | 否 |
