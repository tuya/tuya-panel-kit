import _ from 'lodash';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TYSdk, NavigatorLayout } from 'tuya-panel-kit';
import composeLayout from './composeLayout';
import configureStore from './redux/configureStore';
import { routers } from './config';
import Strings from './i18n';

export const store = configureStore();

// const linearGradientBackground = {
//   '3%': '#fa7e28',
//   '90%': '#fa7e28',
// };

console.disableYellowBox = true;

class MainLayout extends NavigatorLayout {
  constructor(props) {
    super(props);
    console.log('TYSdk :', TYSdk);
    console.log('Strings: ', Strings);
  }

  /*
  hookRoute 可以做一些控制处理
  return 是一个 Object,
  {
    background: backgroundImage | linearGradientBackground,
    backgroundColor: '#FCFCFC', // 颜色值
    style: ViewPropTypes.style,
    // topbarStyle: ViewPropTypes.style, // 需要 Android TopBar 组件支持设置 style
    hideFullView: true | false,   // 控制是否隐藏 FullView
    renderFullView: (props) => {
      return (
        <FullView>
        </FullView>
      );
    },
    FullView: ReactComponent,     // 自定义的 FullView 组件, 如果使用自定义 FullView 组件，TopBar、OfflineView 也需要在 FullView 里面调用
    hideTopbar: true | false,   // 控制是否隐藏 TopBar
    OfflineView: ReactComponent, // 自定义的 OfflineView 组件
    showOfflineView: true | false, // 是否渲染 OfflineView
  }
  */
  // eslint-disable-next-line
  hookRoute(route) {
  //   switch (route.id) {
  //     case 'main':
  //       // eslint-disable-next-line
  //       route.background = background;
  //       break;

  //     default:
  //       break;
  //   }
    return {
      ...route,
      style: styles.fullView,
      topbarStyle: { backgroundColor: '#ff6024' },
      showOfflineView: false,
      title: route.id === 'main' ? 'Tuya RN UI Explorer' : route.title,
    };
  }

  renderScene(route, navigator) {
    let Scene = <View />;
    let schema = {};
    let uiConfig = {};
    const { dispatch, devInfo, dpState } = this.props;

    if (!_.isEmpty(devInfo)) {
      schema = devInfo.schema || {};
      uiConfig = devInfo.uiConfig || {};
    }

    const router = routers.find(r => r.id === route.id);

    if (router && router.Scene) {
      const Component = router.Scene;
      Scene = (
        <Component
          dpData={{ state: dpState, schema, uiConfig }}
          dispatch={dispatch}
          navigator={navigator}
          {...route}
        />
      );
    }

    return Scene;
  }
}

const styles = StyleSheet.create({
  fullView: {
    backgroundColor: '#f8f8f8',
  },
});

export default composeLayout(store, MainLayout);
