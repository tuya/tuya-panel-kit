/* eslint-disable no-extra-boolean-cast */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-deprecated-custom-components';
import { View, StyleSheet, UIManager, BackHandler, Platform } from 'react-native';
import TYSdk from '../../../TYNativeApi';
import MaskView from '../../modal/portalOut';
import FullView from '../full-view';

const TYEvent = TYSdk.event;
const TYMobile = TYSdk.mobile;

const SceneConfigs = {
  ...Navigator.SceneConfigs.HorizontalSwipeJump,
  gestures: {
    pop: {
      ...Navigator.SceneConfigs.FloatFromRight.gestures.pop,
    },
  },
};

let _navigator;

BackHandler.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

export default class NavigatorLayout extends Component {
  static propTypes = {
    devInfo: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this._sceneConfigs = this.__sceneConfigs.bind(this);
    this._renderScene = this.__renderScene.bind(this);
    this._onDidFocus = this.__onDidFocus.bind(this);
    this._onWillFocus = this.__onWillFocus.bind(this);
    this._onBack = this.onBack.bind(this);

    // this.state = {
    //   initialized: false,
    // };

    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this._onBack);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this._onBack);
    }
  }

  // 可重写此方法实现具体页面渲染
  renderScene(route, navigator) {
    const Element = route.element || View;
    return <Element navigator={navigator} {...route} />;
  }

  __sceneConfigs(route, routeStack) {
    return route.sceneConfigs ? route.sceneConfigs : SceneConfigs;
  }

  __renderScene(route, navigator) {
    _navigator = navigator;
    TYSdk.applyNavigator(navigator);
    // this.props.dispatch({ type: '_NAVIGATOR_', navigator });
    // }
    // eslint-disable-next-line
    // console.log(this.state, '=======navigator-layout __renderScene');
    // route.initialized = this.state.initialized;
    return this.dispatchRoute(route, navigator);
  }

  __onDidFocus(route) {
    TYEvent.fire('NAVIGATOR_ON_DID_FOCUS', route);
  }

  __onWillFocus(route) {
    TYEvent.fire('NAVIGATOR_ON_WILL_FOCUS', route);
  }

  onBack() {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
      _navigator.pop();
      return true;
    }
    return false;
  }

  hookRoute(route) {
    return {};
  }

  dispatchRoute(route, navigator) {
    let contentLayout = null;
    const opts = this.hookRoute(route);

    if (!!opts.gesture || opts.id === 'main') {
      TYMobile.enablePopGesture();
    } else {
      TYMobile.disablePopGesture();
    }

    contentLayout = this.renderScene(route, navigator);
    if (!!opts.hideFullView || route.initialized) {
      contentLayout = this.renderScene(route, navigator);
      if (!!opts.hideFullView) return contentLayout;
    }
    const { devInfo } = this.props;
    const title = opts.title ? opts.title : devInfo.name;

    let showOfflineView =
      opts.showOfflineView !== undefined
        ? opts.showOfflineView
        : !devInfo.appOnline || !devInfo.deviceOnline;
    if (Object.keys(devInfo).length <= 1) {
      showOfflineView = false;
    }
    if (!!opts.FullView) {
      const CustomFullView = opts.FullView;
      return (
        <CustomFullView
          ref={ref => {
            if (ref) this.fullViewRef = ref;
          }}
          title={title}
          onBack={this._onBack}
          appOnline={devInfo.appOnline}
          deviceOnline={devInfo.deviceOnline}
          renderStatusBar={opts.renderStatusBar}
          renderTopBar={opts.renderTopBar}
          hideTopbar={!!opts.hideTopbar}
          showOfflineView={showOfflineView}
        >
          {contentLayout}
        </CustomFullView>
      );
    }

    return (
      <FullView
        ref={ref => {
          if (ref) this.fullViewRef = ref;
        }}
        title={title}
        style={[styles.container, opts.style]}
        background={opts.background}
        topbarStyle={[styles.topbarStyle, opts.topbarStyle]}
        topbarTextStyle={opts.topbarTextStyle}
        appOnline={devInfo.appOnline}
        deviceOnline={devInfo.deviceOnline}
        onBack={this._onBack}
        showMenu={route.id === 'main'}
        renderStatusBar={opts.renderStatusBar}
        renderTopBar={opts.renderTopBar}
        hideTopbar={!!opts.hideTopbar}
        showOfflineView={showOfflineView}
        backgroundStyle={opts.backgroundStyle}
      >
        {contentLayout}
      </FullView>
    );
  }

  _onDidFocus(route) {
    TYEvent.fire('NAVIGATOR_ON_DID_FOCUS', route);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          initialRoute={{ id: 'main', initialRoute: true }}
          configureScene={this._sceneConfigs}
          renderScene={this._renderScene}
          onDidFocus={this._onDidFocus}
          onWillFocus={this._onWillFocus}
        />
        <MaskView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F8F8F8',
  },

  topbarStyle: {},
});
