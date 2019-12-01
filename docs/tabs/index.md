# Tabs - 纯手势标签栏


<a name="7RMTX"></a>
## 简介

Tabs标签栏通过纯手势编写，解决了之前ScrollView实现导致的互相嵌套出现的问题，此外增加了**懒加载**的功能，拆分出了 **TabContent** 组件，可单独使用。



<a name="da441097"></a>
## 代码演示

> 详细demo可参考[此处](https://github.com/TuyaInc/tuya-panel-kit/tree/master/example/src/scenes)

<a name="77c3b6b8"></a>
### 基础Tabs

一屏默认显示四个Tab标签，可通过 **maxItem** 自定义控制一屏显示数量；<br />如果 **dataSource **长度超过** maxItem **则会自动成为多屏；

```jsx
import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';

export default class OnlyTabsScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      activeKey2: '3',
      d1: [
        { value: '1', label: '探测器' },
        { value: '2', label: '遥控器' },
        { value: '3', label: 'RFID' },
        { value: '4', label: '有限探测器' },
      ],
      d2: [
        { value: '1', label: '1' },
        { value: '2', label: '22' },
        { value: '3', label: '333' },
        { value: '4', label: '有限探测器' },
        { value: '5', label: '55555' },
        { value: '6', label: '666666' },
        { value: '7', label: '7777777' },
        { value: '8', label: '88888888' },
      ],
    };
  }

  _handleD1Change = tab => {
    this.setState({ activeKey1: tab.value });
  };

  _handleD2Change = tab => {
    this.setState({ activeKey2: tab.value });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TesterTitle title="基础Tabs" />
        <Tabs
          activeKey={this.state.activeKey1}
          dataSource={this.state.d1}
          onChange={this._handleD1Change}
        />
        <TesterTitle title="多屏Tabs" />
        <Tabs
          activeKey={this.state.activeKey2}
          dataSource={this.state.d2}
          onChange={this._handleD2Change}
        />
        <TesterTitle title="基础Tabs（无状态组件）" />
        <Tabs dataSource={this.state.d1} />
        <TesterTitle title="多屏Tabs（无状态组件）" />
        <Tabs dataSource={this.state.d2} />
        <TesterTitle title="下划线宽度固定的Tabs" />
        <Tabs underlineWidth={30} dataSource={this.state.d2} />
      </View>
    );
  }
}

```

![aaa.gif](https://cdn.nlark.com/yuque/0/2019/gif/205266/1573477675576-9ca80f82-48ad-4e6b-b6b9-3bf85b04e47a.gif#align=left&display=inline&height=492&name=aaa.gif&originHeight=492&originWidth=276&search=&size=2833339&status=done&width=276)


<a name="zTMVC"></a>
### 单独使用TabContent

可用于某些不需要标签页的场景，比如模拟页面切换

```jsx
/* eslint-disable react/no-array-index-key */
import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';
import Panel from './components/Panel';

export default class OnlyContentTabsScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      d1: [
        { value: '1', label: '111' },
        { value: '2', label: '222' },
        { value: '3', label: '333' },
        { value: '4', label: '444' },
      ],
    };
  }

  _handleRelease = (gestureState, index) => {
    this.setState({ activeIndex: index });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TesterTitle title="我的内容都很轻量不需要预加载" />
        <Tabs.TabContent
          preload={false}
          activeIndex={this.state.activeIndex}
          onRelease={this._handleRelease}
        >
          {this.state.d1.map((data, idx) => (
            <Panel key={idx} title={`${idx}`} />
          ))}
        </Tabs.TabContent>
        <TesterTitle title="单独的TabContent" />
        <Tabs.TabContent activeIndex={this.state.activeIndex} onRelease={this._handleRelease}>
          {this.state.d1.map((data, idx) => (
            <Panel key={idx} largeData={idx === 1} title={data.label} />
          ))}
        </Tabs.TabContent>
      </View>
    );
  }
}
```

![b'b'b.gif](https://cdn.nlark.com/yuque/0/2019/gif/205266/1573477840273-1acf5b46-2bcb-4e27-89d3-4eb3c55394de.gif#align=left&display=inline&height=492&name=b%27b%27b.gif&originHeight=492&originWidth=276&search=&size=1587423&status=done&width=276)

<a name="L8Dvo"></a>
### 标签页配合TabContent

```jsx
import _ from 'lodash';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Tabs, TYListItem } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';
import Panel from './components/Panel';

export default class WithContentTabsScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      activeKey2: '3',
      d1: [
        { value: '1', label: '探测器' },
        { value: '2', label: '遥控器' },
        { value: '3', label: 'RFID' },
        { value: '4', label: '有限探测器' },
      ],
      d2: [
        { value: '1', label: '1' },
        { value: '2', label: '22' },
        { value: '3', label: '333' },
        { value: '4', label: '有限探测器' },
        { value: '5', label: '55555' },
        { value: '6', label: '666666' },
        { value: '7', label: '7777777' },
        { value: '8', label: '88888888' },
      ],
    };
  }

  _handleD1Change = tab => {
    this.setState({ activeKey1: tab.value });
  };

  _handleD2Change = tab => {
    this.setState({ activeKey2: tab.value });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* https://github.com/facebook/react-native/issues/11206 */}
        <TesterTitle title="一屏存在可滚动内容的Tabs" />
        <Tabs
          activeKey={this.state.activeKey1}
          dataSource={this.state.d1}
          swipeable={true}
          onChange={this._handleD1Change}
        >
          <Tabs.TabPanel>
            <ScrollView>
              {_.times(10, n => (
                <TYListItem key={n} title={`测试_${n}`} />
                // <TYText key={n} text={`测试_${n}`} />
              ))}
            </ScrollView>
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <TYListItem title="第二页" />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <TYListItem title="第三页" />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <TYListItem title="第四页" />
          </Tabs.TabPanel>
        </Tabs>
        <TesterTitle title="多屏存在内容的Tabs" />
        <Tabs
          activeKey={this.state.activeKey2}
          dataSource={this.state.d2}
          onChange={this._handleD2Change}
        >
          {this.state.d2.map((data, idx) => (
            <Panel key={idx} title={data.label} />
          ))}
        </Tabs>
        <TesterTitle title="多屏存在内容的Tabs且tabs位置在下面" />
        <Tabs
          tabPosition="bottom"
          activeKey={this.state.activeKey2}
          dataSource={this.state.d2}
          onChange={this._handleD2Change}
        >
          {this.state.d2.map((data, idx) => (
            <Panel key={idx} title={data.label} />
          ))}
        </Tabs>
      </View>
    );
  }
}
```

![ccc.gif](https://cdn.nlark.com/yuque/0/2019/gif/205266/1573477993771-5bc11c2d-ee81-4d65-bf8c-5f1017744ba3.gif#align=left&display=inline&height=492&name=ccc.gif&originHeight=492&originWidth=276&search=&size=4356244&status=done&width=276)

<a name="NihG4"></a>
### 嵌套的Tabs

```jsx
import React from 'react';
import { View } from 'react-native';
import { Tabs, TYListItem } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';
import Panel from './components/Panel';

export default class NestedTabsScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      activeKey2: '3',
      d1: [
        { value: '1', label: '探测器' },
        { value: '2', label: '遥控器' },
        { value: '3', label: 'RFID' },
        { value: '4', label: '有限探测器' },
      ],
      d2: [
        { value: '1', label: '1' },
        { value: '2', label: '22' },
        { value: '3', label: '333' },
        { value: '4', label: '4444' },
        { value: '5', label: '55555' },
        { value: '6', label: '666666' },
        { value: '7', label: '7777777' },
        { value: '8', label: '88888888' },
      ],
    };
  }

  _handleD1Change = tab => {
    this.setState({ activeKey1: tab.value });
  };

  _handleD2Change = tab => {
    this.setState({ activeKey2: tab.value });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TesterTitle title="嵌套的Tabs" />
        <Tabs
          tabPosition="bottom"
          underlineStyle={{ backgroundColor: 'transparent' }}
          activeKey={this.state.activeKey1}
          dataSource={this.state.d1}
          swipeable={false}
          onChange={this._handleD1Change}
        >
          <Tabs.TabPanel background="#fff">
            <Tabs
              activeKey={this.state.activeKey2}
              dataSource={this.state.d2}
              onChange={this._handleD2Change}
            >
              {this.state.d2.map((data, idx) => (
                <Panel key={idx} title={data.label} />
              ))}
            </Tabs>
          </Tabs.TabPanel>
          <Tabs.TabPanel background="#fff">
            <TYListItem title="第二页" />
          </Tabs.TabPanel>
          <Tabs.TabPanel background="#fff">
            <TYListItem title="第三页" />
          </Tabs.TabPanel>
          <Tabs.TabPanel background="#fff">
            <TYListItem title="第四页" />
          </Tabs.TabPanel>
        </Tabs>
      </View>
    );
  }
}
```

![ddd.gif](https://cdn.nlark.com/yuque/0/2019/gif/205266/1573478309070-35a7a962-c0db-431f-a8c2-ffbb2b314282.gif#align=left&display=inline&height=492&name=ddd.gif&originHeight=492&originWidth=276&search=&size=2407329&status=done&width=276)

<a name="cfuPh"></a>
## Tabs API

<a name="style"></a>
### style

Tabs的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |


<a name="Pk69l"></a>
### wrapperStyle

存在 TabContent 时才有效，包裹着 Tabs 以及 TabContent 的容器样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |


<a name="j3AKI"></a>
### tabContentStyle

存在 TabContent 时才有效，TabContent 的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |


<a name="j3AKI"></a>
### tabActiveStyle

单个激活 Tab 的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |

<a name="j3AKI"></a>
### tabTextStyle
未激活的文本样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |

<a name="j3AKI"></a>
### tabActiveTextStyle

激活的文本样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |


<a name="M3KHb"></a>
### underlineStyle

下划线的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |



<a name="JSQVR"></a>
### underlineWidth

下划线的宽度，不设置则默认跟随文字宽度

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | null |

<a name="1XPx1"></a>
### 
<a name="ZoLHW"></a>
### defaultActiveKey

默认的激活值，想成为非受控组件时使用

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number | string` | 否 | 0 |


<a name="IMWKj"></a>
### activeKey

激活值，如果给定了则成为受控组件，需搭配 onChange 使用

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number | string` | 否 | null |

<a name="knnP8"></a>
### 
<a name="15hA4"></a>
### dataSource

数据源

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| ITabsDataSource | 是 | null |

<a name="GddON"></a>
### 
```typescript
interface ITabsDataSource {
  value: string; // 标签值
  label?: string; // 标签文案
  renderTab?: (isActive: boolean, state: ITabState, props: ITabProps) => React.Element; // 自定义渲染tab标签
}
```

<a name="3qRzl"></a>
### 
<a name="pS0wy"></a>
### disabled

是否禁用 Tabs 标签页（注意只针对 Tabs，不针对 TabContent）

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | false |

<a name="763Sg"></a>
### 
<a name="vH4gQ"></a>
### swipeable

TabContent 是否可滚动

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | true |

<a name="qYb3T"></a>
### 
<a name="KfwQi"></a>
### maxItem

一屏下最多可存在的 Tab 标签数量

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | 4 |


<a name="EruoX"></a>
### tabPosition

Tab 与 TabContent 同时存在时，Tab 的排列位置

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `'top' | 'bottom'` | 否 | 'top' |

<a name="8jwSA"></a>
### 
<a name="CCqU3"></a>
### activeColor

激活时的颜色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | 主题色 |



<a name="f3ALk"></a>
### background

Tab 标签页的背景色

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ColorPropType](https://facebook.github.io/react-native/docs/colors) | 否 | #fff |

<a name="a6LWQ"></a>
### 
<a name="xmX1x"></a>
### preload

TabContent 是否需要预加载

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | true |

<a name="OeYuF"></a>
### 
<a name="wV9y2"></a>
### preloadTimeout

TabContent 预加载延时时间

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | null |


<a name="gzAWI"></a>
### renderPlaceholder

自定义渲染预加载中的占位容器

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `(activeIndex, children) => React.Element` | 否 | null |


<a name="OCW8l"></a>
### onChange

Tab 变更回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `(tab, index) => void` | 否 | null |



<a name="lv1Xl"></a>
### children

Tab 的子元素，一般为 TabContent

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `array` | 否 | null |


<a name="iVRQ1"></a>
### animationConfig

动画配置

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `IAnimationConfig` | 否 | 见下 |


渐变示例:

```typescript
interface IAnimationConfig {
  duration?: number;
  easing?: EasingFunction;
  delay?: number;
  isInteraction?: bool;
  useNativeDriver?: bool; // tabs 永远都是false，width 动画不支持
}

// 默认值
{
  duration: 200,
  easing: Easing.linear,
  delay: 0,
  isInteraction: true,
  useNativeDriver: false,
}
```


<a name="yKlfF"></a>
## Tabs.Content API

<a name="JFNHD"></a>
### style

TabContent 的样式

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| [ViewPropTypes.style](https://facebook.github.io/react-native/docs/style) | 否 | null |

<a name="xKq6G"></a>
### 
<a name="rFIIb"></a>
### activeIndex

当前激活所处的索引

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 是 | 0 |


<a name="K7YUn"></a>
### disabled

是否禁用 TabContent

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | false |


<a name="nZQYq"></a>
### preload

TabContent 是否需要预加载

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `boolean` | 否 | true |

<a name="qexSb"></a>
### 
<a name="8DOBK"></a>
### preloadTimeout

TabContent 预加载延时时间

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `number` | 否 | null |


<a name="dSKwP"></a>
### onMove

TabContent 滑动回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `(gestureState, index, percent) => void` | 否 | null |


<a name="ATyrI"></a>
### onRelease

TabContent 滑动结束回调

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `(gestureState, index, percent) => void` | 否 | null |


<a name="RthEP"></a>
### renderPlaceholder

自定义渲染预加载中的占位容器

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `(activeIndex, children) => React.Element` | 否 | null |



<a name="JPkhN"></a>
### children

TabContent 的子元素

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `array` | 否 | null |


<a name="gWMk5"></a>
### animationConfig

动画配置

| 类型(Type) | 必传(Required) | 默认值 |
| :---: | :---: | :---: |
| `IAnimationConfig` | 否 | 见下 |


渐变示例:

```typescript
interface IAnimationConfig {
  duration?: number;
  easing?: EasingFunction;
  delay?: number;
  isInteraction?: bool;
  useNativeDriver?: bool;
}

// 默认值
{
  duration: 200,
  easing: Easing.linear,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
}
```

