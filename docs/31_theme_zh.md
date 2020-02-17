# 主题


<a name="77b5e46c"></a>
## 作用

1. 统一管理全局样式
1. 便于样式复用及拓展
1. 减少过多样式props传递

<a name="44bb1897"></a>
## 自定义主题

> 你可以在本地主题配置文件中(src/config/theme.js)覆盖所有主题配置（所有主题变量可见文档最下方主题速查表），当然也可以自行在项目中拓展主题配置;


```javascript
export default {
  // 覆盖本地默认主题变量
  global: {
    brand: '#ff0000',
  },
  switchButton: {
    margin: 2,
    width: 40,
    height: 24,
    thumbSize: 20,
  },
  // 拓展主题配置
  myExtendTheme: {
    customKey: 'blue',
  },
};
```

<a name="ce509751"></a>
## API

<a name="q7E9g"></a>
### 1. 注入全局主题

> 添加 **Theme(ThemeProvider)** 到应用程序的顶层，将主题传递到React组件树。 然后，我们就可以通过后面三种方式去访问主题对象。


```jsx
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { TYSdk, Theme } from 'tuya-panel-kit';
import { devInfoChange, deviceChange, responseUpdateDp } from './redux/modules/common';
import DebugView from './components/DebugView';

const TYEvent = TYSdk.event;
const TYDevice = TYSdk.device;

const composeLayout = (store, component) => {
  const NavigatorLayoutContainer = connect(_.identity)(component);
  const ThemeContainer = connect(({ theme }) => ({ theme }))(Theme);
  const { dispatch } = store;

  TYEvent.on('deviceChanged', data => {
    dispatch(deviceChange(data));
  });

  // eslint-disable-next-line
  TYEvent.on('dpDataChange', data => {
    dispatch(responseUpdateDp(data));
  });

  TYEvent.on('appOnline', data => {
    dispatch(deviceChange({ appOnline: data.online }));
  });

  TYEvent.on('deviceOnline', data => {
    dispatch(deviceChange({ deviceOnline: data.online }));
  });

  class PanelComponent extends Component {
    static propTypes = {
      // eslint-disable-next-line
      devInfo: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);

      if (props && props.devInfo && props.devInfo.devId) {
        TYDevice.setDeviceInfo(props.devInfo);
        TYDevice.getDeviceInfo().then(data => dispatch(devInfoChange(data)));
        // eslint-disable-next-line
      } else if (props.preload) {
        // do something
      } else {
        TYDevice.getDeviceInfo().then(data => dispatch(devInfoChange(data)));
      }
    }

    render() {
      return (
        <Provider store={store}>
          <ThemeContainer>
            <View style={{ flex: 1 }}>
              <NavigatorLayoutContainer />
              <DebugView />
            </View>
          </ThemeContainer>
        </Provider>
      );
    }
  }

  return PanelComponent;
};

export default composeLayout;
```

<a name="xmZWz"></a>
### 2. 获取全局主题

- styled: 通过被 **styled-components** 中 **styled** 包装过的组件访问主题

```typescript
import styled from 'styled-components/native';

const defaultColor = '#333';

export const StyledTitle = styled(TYText).attrs({
  type: 'title',
  size: 'small',
})`
  color: ${props => getTheme(props, 'list.fontColor', '#333')};
  color: ${props => props.fontColor || props.theme.list.fontColor || props.theme.list.light.fontColor || '#333'};
`;
```

- withTheme: 通过被 **withTheme** 高阶函数包装过的组件访问主题

```typescript
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { withTheme } = Utils.ThemeUtils;

const ThemedView = props => {
  const { theme } = props;
  return <View style={{ backgroundColor: theme.global.brand }} />;
};

ThemedView.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(ThemedView);
```

- ThemeConsumer: 通过 **ThemeConsumer** 组件接收主题

```typescript
import { Utils } from 'tuya-panel-kit';

const { ThemeConsumer } = Utils.ThemeUtils;

export const StyledIconFont = props => {
  return (
    <ThemeConsumer>
      {theme => {
        const propsWithTheme = { ...props, theme };
        return (
          <IconFont
            color={getTheme(propsWithTheme, 'list.iconColor', DEFAULT_THEME.iconColor)}
            {...props}
          />
        );
      }}
    </ThemeConsumer>
  );
};
```

<a name="ac5dd388"></a>
## 主题速查表

```javascript
import { Platform } from 'react-native';
import { CoreUtils, RatioUtils } from '../../utils';

const { get } = CoreUtils;
const { convertX: cx } = RatioUtils;

/**
 * 通用辅助函数
 */
const getBrandColor = props => get(props, 'theme.global.brand', global.brand);
const getDividerColor = props => get(props, 'theme.global.dividerColor', global.dividerColor);
const getTypedFontColor = (props, reverse = false) => {
  let type = get(props.theme, 'type', 'light');
  if (reverse) type = type === 'light' ? 'dark' : 'light';
  const path = `global.text.${type}`;
  return get(props.theme, path, global.text[type]);
};

// 根据全局的字体基准比例调整字体大小
const normalizeFont = (props, fontSize, lineHeight) => {
  const baseline = get(props, 'theme.global.fontSizeBase', global.fontSizeBase);
  return {
    fontSize: fontSize * baseline,
    lineHeight: Math.round(lineHeight * baseline), // 不为整数小米会crash
  };
};

export default {
  type: 'light',

  /**
   * 全局基础变量
   */
  global: {
    brand: '#FF4800', // 品牌色（主题色）
    bgColor: '#f8f8f8', // 背景色
    fontSizeBase: 1, // 字体基准比例
    dividerColor: '#e5e5e5', // 分隔线颜色
    success: '#00C800', // 成功颜色
    warning: '#FAAE17', // 警告颜色
    error: '#F4182C', // 失败
    // info, // 信息色（暂未开放使用）
    // disabled, // 禁用透明度（暂未开放使用）
    mask: 'rgba(0, 0, 0, 0.7)', // 遮罩颜色
    text: {
      light: '#333', // 字体在 light 下的颜色
      dark: '#fff', // 字体在 dark 下的颜色
    },
  },

  /**
   * 字体大小变量
   */
  text: {
    heading: {
      // type 为 heading，size 为 small 对应的字体大小
      small: props => normalizeFont(props, 28, 40),
      normal: props => normalizeFont(props, 40, 56),
      large: props => normalizeFont(props, 72, 100),
    },
    title: {
      // type 为 title，size 为 small 对应的字体大小
      small: props => normalizeFont(props, 16, 22),
      normal: props => normalizeFont(props, 17, 24),
      large: props => normalizeFont(props, 20, 28),
    },
    // title以上都走主要字体色#333
    paragraph: {
      // type 为 paragraph，size 为 small 对应的字体大小
      small: props => normalizeFont(props, 10, 14),
      normal: props => normalizeFont(props, 12, 17),
      large: props => normalizeFont(props, 14, 20),
    },
  },

  /**
   * Picker 滚动选择器变量
   */
  picker: {
    fontSize: 16, // Picker 字体大小
    fontColor: '#000', // Picker 字体颜色
    dividerColor: getDividerColor, // 预留 IOS 暂不支持
    unitFontSize: 16, // Picker 单位大小
    unitFontColor: '#000', // Picker 单位颜色
  },

  /**
   * Button 按钮变量
   */
  button: {
    margin: [0, 0, 0, 0], // 按钮容器边距（上右下左）
    fontSize: 10, // 字体尺寸
    fontColor: getTypedFontColor, // 字体颜色
    iconSize: 24, // Icon 大小
    iconColor: props => getTypedFontColor(props, props.type === 'primary'), // Icon 颜色
    bgWidth: null, // 按钮背景宽度，默认组件内部自适应
    bgHeight: null, // 按钮背景高度，默认组件内部自适应
    bgRadius: null, // 按钮背景圆角，默认组件内部自适应
    bgColor: getBrandColor, // 按钮背景色，默认跟随主色
  },

  /**
   * TopBar 头部栏变量
   */
  topbar: {
    background: '#fff', // 头部栏背景色
    color: '#000', // 头部栏字体颜色（包括图标色）
  },

  /**
   * SwitchButton 开关变量
   */
  switchButton: {
    width: 50, // 按钮宽度
    height: Platform.select({ // 按钮宽度
      web: 28,
      ios: 28,
      android: 14,
    }),
    thumbSize: 26, // 滑块宽高尺寸
    margin: Platform.select({ // 滑块四周边距
      web: 1,
      ios: 1,
      android: 0,
    }),
    tintColor: '#e5e5e5', // 关闭情况下背景色
    onTintColor: '#4CD964', // 开启情况下背景色
    thumbTintColor: '#fff', // 关闭情况下滑块背景色
    onThumbTintColor: '#fff', // 开启情况下滑块背景色
  },

  /**
   * Slider 滑块变量
   */
  slider: {
    width: null, // 默认跟随父容器(滑块宽度)
    trackRadius: 2, // 滑块圆角
    trackHeight: 4, // 滑块高度
    minimumTrackTintColor: getBrandColor, // 最小值颜色
    maximumTrackTintColor: '#e5e5e5', // 最大值颜色
    thumbSize: 24, // 滑块圆的尺寸
    thumbRadius: 14, // 滑块圆的圆角
    thumbTintColor: '#fff', // 滑块的颜色
  },

  /**
   * Checkbox 选择框变量
   */
  checkbox: {
    size: 28, // Checkbox 尺寸
    fontColor: '#333', // Checkbox 字体颜色
    activeColor: '#3388FF', // Checkbox 激活时的颜色
    disabledColor: '#333', // Checkbox 禁用时的颜色
  },

  /**
   * List 列表项变量
   */
  list: {
    boardBg: '#f8f8f8', // 列表的容器底色
    iconColor: 'rgba(51, 51, 51, 0.5)', // 图标颜色
    fontColor: '#333', // 标题颜色
    subFontColor: 'rgba(51, 51, 51, 0.5)', // 副标题颜色
    descFontColor: 'rgba(51, 51, 51, 0.5)', // 描述性标题颜色
    cellLine: 'rgba(51, 51, 51, 0.1)', // 分隔线颜色
    cellBg: '#fff', // 列表项背景色
    cellRadius: 0, // 列表项圆角
    margin: [0, 0, 0, 0], // 列表项外边距（上右下左）
    padding: [12, cx(16), 12, cx(16)], // 列表项内边距（上右下左）
  },

  /**
   * BrickButton 块状按钮变量
   */
  brickButton: {
    fontSize: 12, // 字体大小
    fontColor: '#fff', // 字体颜色
    bgRadius: 24, // 背景圆角
    bgColor: getBrandColor, // 跟随主色
    bgBorder: 'transparent', // 背景边框
    bgBorderWidth: 0, // 背景边框宽度
    loadingColor: '#fff', // 加载颜色
    loadingBackground: 'rgba(0,0,0,.1)', // 加载的背景颜色
  },

  /**
   * Dialog 对话框变量
   */
  dialog: {
    width: cx(315), // 弹窗容器宽度
    bg: '#fff', // 弹窗背景色
    radius: cx(8), // 弹窗容器圆角
    cellHeight: 56, // 列表高度（头部、底部）
    lineColor: '#e5e5e5', // 分隔线颜色
    titleFontSize: 18, // 标题字体大小
    titleFontColor: '#333', // 头部栏标题颜色
    subTitleFontSize: 16, // 副标题字体大小
    subTitleFontColor: '#999', // 头部栏副标题颜色
    cancelFontSize: 16, // 底部栏取消字体大小
    cancelFontColor: '#666', // 底部栏取消字体颜色
    confirmFontSize: 16, // 底部栏确认字体大小
    confirmFontColor: '#333', // 底部栏确认字体颜色
    prompt: {
      bg: '#f8f8f8', // 输入框背景色
      radius: cx(4), // 输入框圆角
      padding: '12px 16px', // 输入框边距
      placeholder: '#d6d6de', // 占位符字体颜色
    },
  },

  /**
   * Popup 弹出层变量
   */
  popup: {
    cellHeight: 48, // 列表项的高度
    cellBg: '#fff', // 列表底色
    titleRadius: cx(8), // 头部圆角
    footerRadius: 0, // 底部圆角
    bottomBg: '#f5f5f5', // 底部栏底色
    lineColor: '#e5e5e5', // 分隔线颜色
    titleFontSize: 14, // 头部栏标题大小
    titleFontColor: '#999', // 头部栏标题颜色
    cancelFontSize: 16, // 底部栏取消字体大小
    cancelFontColor: '#666', // 底部栏取消字体颜色
    confirmFontSize: 16, // 底部栏确认字体大小
    confirmFontColor: '#333', // 底部栏确认字体颜色
  },
};
```
