/* eslint-disable no-extra-boolean-cast */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-deprecated-custom-components';
import { View, StyleSheet, UIManager, BackHandler, Platform, AppState, Text } from 'react-native';
import { TYSdk } from '../../../TYNativeApi';
import MaskView from '../../modal/portalOut';
import FullView from '../full-view';
import Notification from '../../notification';
import TYNativeModules, { getRssi } from '../api';
import AnimatedModal from '../detect-net-modal';
import Strings from '../../i18n/strings';
import { RatioUtils, CoreUtils } from '../../../utils';

export const moreIcon =
  'M353.152 237.76a52.736 52.736 0 0 0 1.28 75.776l210.432 196.352-204.16 202.944a52.928 52.928 0 0 0-0.64 74.496 51.712 51.712 0 0 0 73.6 0.512l230.144-229.568a64 64 0 0 0-0.256-90.88l-232.96-229.888a54.912 54.912 0 0 0-77.44 0.256z';

const Res = require('../../res/wifi.png');

const { get } = CoreUtils;
const { isIos } = RatioUtils;

const TYEvent = TYSdk.event;
const TYMobile = TYSdk.mobile;
const TYNative = TYSdk.native;

// 处理Text在某种机型某种字体下宽度被截断的问题,
if (Platform.OS !== 'web') {
  const originRender = Text.render || Text.prototype.render;
  const parent = Text.render ? Text : Text.prototype;
  parent.render = function(...args) {
    const origin = originRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [!isIos && { fontFamily: '' }, origin.props.style],
    });
  };
}

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

    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      modalVisible: false,
      isMqttNoticeActive: false,
    };
  }

  componentDidMount() {
    const { hideSignalPop: hideSignalPopProps = false } = this.opts;

    const hideSignalPop = get(TYSdk, 'devInfo.panelConfig.fun.hideSignalPop', false);

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this._onBack);
    }

    if (hideSignalPop || hideSignalPopProps) return;

    TYNativeModules.receiverMqttData(23);
    TYNativeModules.sendMqttData(22);
    TYSdk.DeviceEventEmitter.addListener('receiveMqttData', this._handleMqttSignal);
    this.state.isMqttNoticeActive &&
      AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    const { hideSignalPop: hideSignalPopProps = false } = this.opts;
    const hideSignalPop = get(TYSdk, 'devInfo.panelConfig.fun.hideSignalPop', false);

    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this._onBack);
    }

    if (hideSignalPop || hideSignalPopProps) return;

    this.timer && clearTimeout(this.timer);
    TYSdk.DeviceEventEmitter.removeListener('receiveMqttData', this._handleMqttSignal);
    AppState.removeEventListener('change', this._handleAppStateChange);
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

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      Notification.hide();
    }
  };

  _handleMqttSignal = ({ data = {}, protocol } = {}) => {
    if (!data) return;
    if (protocol === 23) {
      const { data: result } = data;
      const { signal } = result;
      getRssi().then(res => {
        if (!res) {
          return;
        }
        const { value: rssi } = res;
        if (signal < rssi && AppState.currentState === 'active') {
          this.timer && clearTimeout(this.timer);
          this.setState({
            isMqttNoticeActive: true,
          });
          Notification.show({
            message: Strings.getLang('location'),
            backIcon: moreIcon,
            onClose: this._handleToDetail,
            onPress: this._handleToDetail,
            enableImage: true,
            backIconSize: 20,
            backIconCenter: true,
            imageSource: Res,
          });
          this.timer = setTimeout(() => {
            Notification.hide();
            this.setState({
              isMqttNoticeActive: false,
            });
          }, 3000);
        }
      });
    }
  };

  hookRoute(route) {
    return {};
  }

  _handleToDetail = () => {
    this.setState({
      modalVisible: true,
    });
  };

  dispatchRoute(route, navigator) {
    let contentLayout = null;
    const opts = this.hookRoute(route);
    this.opts = opts;
    const { enablePopGesture = true } = opts;
    if ((!!opts.gesture || opts.id === 'main') && enablePopGesture) {
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
          style={[styles.container, opts.style]}
          background={opts.background}
          topbarStyle={[styles.topbarStyle, opts.topbarStyle]}
          topbarTextStyle={opts.topbarTextStyle}
          capability={devInfo.capability}
          onBack={this._onBack}
          appOnline={devInfo.appOnline}
          deviceOnline={devInfo.deviceOnline}
          showMenu={route.id === 'main'}
          isBleOfflineOverlay={opts.isBleOfflineOverlay}
          renderStatusBar={opts.renderStatusBar}
          renderTopBar={opts.renderTopBar}
          hideTopbar={!!opts.hideTopbar}
          showOfflineView={showOfflineView}
          devInfo={devInfo}
          backgroundStyle={opts.backgroundStyle}
          renderWifiOfflineView={opts.renderWifiOfflineView}
          renderBleOfflineView={opts.renderBleOfflineView}
          reconnectTextStyle={opts.reconnectTextStyle}
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
        capability={devInfo.capability}
        onBack={this._onBack}
        showMenu={route.id === 'main'}
        isBleOfflineOverlay={opts.isBleOfflineOverlay}
        renderStatusBar={opts.renderStatusBar}
        renderTopBar={opts.renderTopBar}
        hideTopbar={!!opts.hideTopbar}
        showOfflineView={showOfflineView}
        backgroundStyle={opts.backgroundStyle}
        devInfo={devInfo}
        renderWifiOfflineView={opts.renderWifiOfflineView}
        renderBleOfflineView={opts.renderBleOfflineView}
        reconnectTextStyle={opts.reconnectTextStyle}
      >
        {contentLayout}
      </FullView>
    );
  }

  _onDidFocus(route) {
    TYEvent.fire('NAVIGATOR_ON_DID_FOCUS', route);
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          initialRoute={{ id: 'main', initialRoute: true }}
          configureScene={this._sceneConfigs}
          renderScene={this._renderScene}
          onDidFocus={this._onDidFocus}
          onWillFocus={this._onWillFocus}
        />
        {modalVisible && <AnimatedModal onClose={() => this.setState({ modalVisible: false })} />}
        <MaskView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topbarStyle: {},
});
