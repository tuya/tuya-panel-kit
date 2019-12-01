# NavigatorLayout - 导航布局

<a name="7azu2"></a>
## 简介

涂鸦设备控制面板几乎不会是由单个页面组成, 组织和管理多个页面之间的关联, 嵌套关系, 以及页面之间如何过渡的组件，我们通常称之为`Navigator`.<br />
而`NavigatorLayout`就是一个支持导航路由的基础布局, 能轻易的处理面板页面间的切换.<br />
`NavigatorLayout`底层使用的`Navigator`文档可以在这里看到: [查看React Native Navigator文档](https://facebook.github.io/react-native/docs/0.43/navigator.html)。


<a name="0c55c460"></a>
## 基础使用

使用`NavigatorLayout`, 需要以下步骤

1. 写一个`React`组件，继承`tuya-panel-kit`提供的`NavigatorLayout`,
2. 重写`renderScene`方法以渲染用户自己的页面, 需要返回一个合法的`React`组件
3. 由于页面之间跳转，可能会带一些参数，重写`hookRoute`方法，可以实现更精细的路由控制

<a name="69007334"></a>
## 代码演示

<a name="9964e8b8"></a>
### 在两个页面之间跳转

首先定义好一个路由配置，然后写一个组件继承自`NavigatorLayout`

```jsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigatorLayout } from 'tuya-panel-kit';
import Page from './page';
import Home from './home';

const routers = [{
  id: 'page1',
  title: 'page1',
  Scene: props => <Page {...props} num={1} />,
}, {
  id: 'page2',
  title: 'page2',
  Scene: props => <Page {...props} num={2} />,
}];

export default class MainLayout extends NavigatorLayout {
  // eslint-disable-next-line
  hookRoute(route) {
    const theRoute = routers.find(r => r.id === route.id);
    return {
      ...route,
      topbarStyle: { backgroundColor: '#ff6024' },
      showOfflineView: false,
      title: route.id === 'main' ? 'Basic Jump Usage' : theRoute.title,
    };
  }

  renderScene(route, navigator) {
    let Scene = <Home navigator={navigator} />;

    const router = routers.find(r => r.id === route.id);
    if (router && router.Scene) {
      const Component = router.Scene;
      Scene = (
        <Component
          navigator={navigator}
          {...route}
        />
      );
    }

    return Scene;
  }
}
```

这里我们定义了2个页面的路由表(`routers`), 分别是`page1`和`page2`, 在`renderScene`方法里我们可以拿到`Naviagtor`, 以及当前路由对象的情况，然后我们在渲染页面的时候, 根据当前路由的id去路由表查找相应的页面,如果没有对应的页面，我们就渲染默认的主页。<br />下面是`page`和`home`的实现

```jsx
// page.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'tuya-panel-kit';

// eslint-disable-next-line
export default ({ num, navigator }) => (
  <View style={[styles.container, styles.center]}>
    <Text style={styles.welcomeTxt}>This is Page {num}</Text>
    <Button
      style={styles.btnStyle}
      onPress={() => navigator.pop()}
    >
      <Text style={styles.navTxt}>Click to go back!</Text>
    </Button>
  </View>
);
```

```jsx
// home.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'tuya-panel-kit';

// eslint-disable-next-line
export default ({ navigator }) => (
  <View style={[styles.container, styles.center]}>
    <Text style={styles.welcomeTxt}>Welcome to basic usage of NavigatorLayout</Text>
    {
      [1, 2].map(v => (
        <Button
          style={styles.btnStyle}
          key={v}
          onPress={() => navigator.push({ id: `page${v}` })}
        ><Text style={styles.navTxt}>Go to page {v}</Text>
        </Button>
      ))
    }
  </View>
);
```

通过`Navigator`的`push`方法，我们能**跳转到某个页面**，通过`pop`方法，能**回退一个页面**。<br />在工程目录下运行`yarn start`, 并且在app输入相应的调试地址，之后我们就可以在app上看到效果了。<br />代码对应的demo可以在github上找到, 地址: [NavigatorLayout基础使用](https://github.com/TuyaInc/tuya-panel-kit/tree/master/demos/navigator-layout/basic-jump)

![navigator.gif](https://cdn.nlark.com/yuque/0/2019/gif/205266/1551515866018-c1954c8b-dde3-4cbe-b67b-35e62d24ebda.gif#align=left&display=inline&height=590&name=navigator.gif&originHeight=1920&originWidth=1080&size=3622598&status=done&width=332)<br />
<a name="bd3ac9f8"></a>
### 自定义过渡动画效果

`NavigatorLayout`使用了**默认的页面过渡动画配置**，即

```jsx
const SceneConfigs = {
  ...Navigator.SceneConfigs.HorizontalSwipeJump,
  gestures: {
    pop: {
      ...Navigator.SceneConfigs.FloatFromRight.gestures.pop,
    },
  },
};
```

体现出的行为将会是: **平台有关的水平滑动页面跳转, 以及从右到左的页面回退**.<br />使用3.1的例子，修改下`navigator.push`传入的参数，即可自定义过渡动画

```jsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'tuya-panel-kit';
import { Navigator } from 'react-native-deprecated-custom-components';

const sceneConfig = {
  ...Navigator.SceneConfigs.HorizontalSwipeJump,
  gestures: {
    pop: {
      ...Navigator.SceneConfigs.FloatFromRight.gestures.pop,
    },
  },
};

const RouterConfig = [
  {
    txt: `VerticalUpSwipeJump to page 1`,
    transition: {
      ...sceneConfig,
      ...Navigator.SceneConfigs.VerticalUpSwipeJump
    }
  },
  {
    txt: `SwipeFromLeft to page 2`,
    transition: {
      ...sceneConfig,
      ...Navigator.SceneConfigs.SwipeFromLeft
    }
  }
];

// eslint-disable-next-line
export default ({ navigator }) => (
  <View style={[styles.container, styles.center]}>
    <Text style={styles.welcomeTxt}>
      Screen Transition Example!
    </Text>
    {
      [1, 2].map(v => (
        <Button
          style={styles.btnStyle}
          key={v}
          onPress={() => navigator.push({
            id: `page${v}`,
            sceneConfigs: RouterConfig[v - 1].transition,
          })}
        ><Text style={styles.navTxt}>{RouterConfig[v - 1].txt}</Text>
        </Button>
      ))
    }
  </View>
);
```

这里我们使用了效果`VerticalUpSwipeJump`和`SwipeFromLeft`, 以下是效果图<br />![transition.gif](https://cdn.nlark.com/yuque/0/2019/gif/205266/1551515908362-875a3232-d952-4beb-96f4-59bbe1081820.gif#align=left&display=inline&height=548&name=transition.gif&originHeight=1920&originWidth=1080&size=3039515&status=done&width=308)

用户可以参考[React Native Navigator过渡动画](https://facebook.github.io/react-native/docs/0.43/navigator#configurescene)来使用自己的过渡动画, 比如我们修改下主页的`hookRoute`,

<a name="337b6295"></a>
## API

<a name="537b96b8"></a>
### renderScene(route, navigator) 渲染页面组件

- route: 一个普通对象，里面放着用于渲染的参数，这些参数可以被自定义组件获取到用于渲染。一般route会至少带以下参数
  - id: 当前页面的id
  - title: 当前页面的在`TopBar`里显示的标题
  - topbarStyle: 当前页面的`TopBar`的样式，是一个js对象, 值是`React Native`的`StyleSheet`允许的值。
  - background: 用于渲染页面背景, 可以是一个图片或者渐变
  - backgroundColor: 背景色，只能是合法的`ReactNative`颜色值字符串
  - style: `FullView`背景样式
  - hideFullView: `true`或者`false`, 表示隐藏FullView, 一般用于自定义`FullView`
  - renderFullView: 一个渲染函数,一般配合`hideFullView`一起使用, 允许用户自己渲染`FullView`
  - hideTopBar: 是否隐藏`TopBar`
  - OfflineView: 离线图组件，用于自定义离线图, 需要是一个合法的React组件
  - showOfflineView: 控制是否隐藏离线图, 一般开发调试的时候，会置为`false`
- navigator: 即`React Native`提供的Navigator, navigator的api可以在这里看到: [Navigator的函数](https://facebook.github.io/react-native/docs/0.43/navigator.html#methods)


> 用户需要根据route对象的值来决定渲染哪个子页面，`renderScene`的返回值**必须是一个合法的React组件**, 将会用于渲染当前路由页面。

<a name="20157e06"></a>
### hookRoute(route) 修改route参数

由于route对象放着用于渲染的参数，开发者会经常修改，为方便开发, 提供hookRoute函数用于修改route对象的值, route对象的属性和renderScene里的route是一致的，用户可以自行往里面放自定义参数, **route只是一个普通对象**.

<a name="fb60ea83"></a>
## PropTypes 传入属性定义

**此处是原始的`devInfo`定义，如果使用涂鸦提供的[模板](https://github.com/TuyaInc/tuya-panel-kit-template)，其中的`devInfo`经过了特殊的处理以便开发者使用**

- devInfo: 一个普通js对象，包含大量设备的信息, 至少会提供以下字段:
  - name: 设备名称
  - productId: 产品id
  - uiId: 当前产品对应的面板id
  - homeId: 设备所属的家庭的id
  - bv: 硬件基线版本
  - devId: 设备Id
  - gwId: 网关Id, 如果是单品，devId一般和gwId相等
  - ability: 只有蓝牙设备使用, 如果是单点蓝牙设备，值是5
  - attribute: 设备所属的产品的能力标志, 一般表示有没有开通某些服务, 如alexa语音控制
  - isOnline: 总判断是否在线
  - isLocalOnline: 局域网是否在线
  - isShare: 是否共享设备
  - isVDevice: 是否是演示设备
  - networkType: 设备的在线类型
  - schema: 设备所属产品的功能点(dp, data point)定义, 功能点解释请看[dp解释](https://docs.tuya.com/cn/product/function.html#%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%9F%E8%83%BD%E7%82%B9)
  - capability: 设备的能力类型, 标志设备支持什么能力， 如支持zigbee, 红外, 蓝牙等，具体可见下图

  ![设备能力值](https://cdn.nlark.com/yuque/0/2019/png/205266/1566537008454-ef7f283b-e69f-4829-96b8-e1a0c716eaee.png?x-oss-process=image/resize,w_1492)

