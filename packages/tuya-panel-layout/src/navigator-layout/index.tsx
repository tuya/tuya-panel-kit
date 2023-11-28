import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import {
  View,
  StyleSheet,
  UIManager,
  BackHandler,
  Platform,
  AppState,
  Text,
  TextStyle,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { TYSdk } from 'tuya-panel-core';
import MaskView from 'tuya-panel-kit/lib/components/modal/portalOut';
import { Notification } from 'tuya-panel-kit';
import { Strings } from 'tuya-panel-i18n';
import { Utils } from 'tuya-panel-utils';
import FullView from '../full-view';
import { IBackground } from '../full-view/interface';
import TYNativeModules, { getRssi } from '../api';
import AnimatedModal from '../detect-net-modal';
import { INavigatorState, INavigatorProps } from '../react-navigation/interface';

export const moreIcon =
  'M353.152 237.76a52.736 52.736 0 0 0 1.28 75.776l210.432 196.352-204.16 202.944a52.928 52.928 0 0 0-0.64 74.496 51.712 51.712 0 0 0 73.6 0.512l230.144-229.568a64 64 0 0 0-0.256-90.88l-232.96-229.888a54.912 54.912 0 0 0-77.44 0.256z';

const Res = require('../res/wifi.png');

const { get } = Utils.CoreUtils;
const { isIos } = Utils.RatioUtils;

const TYEvent = TYSdk.event;
const TYMobile = TYSdk.mobile;

// 处理Text在某种机型某种字体下宽度被截断的问题,
if (Platform.OS !== 'web') {
  // @ts-ignore
  const originRender = Text.render || Text.prototype.render;
  // @ts-ignore
  const parent = Text.render ? Text : Text.prototype;
  // @ts-ignore
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

export default class NavigatorLayout extends Component<INavigatorProps, INavigatorState> {
  constructor(props) {
    super(props);

    this._deviceRssiInfo = null;
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

  onBack() {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
      _navigator.pop();
      return true;
    }
    return false;
  }

  _getRssiInfo = async () => {
    if (this._deviceRssiInfo === null) {
      return getRssi().then(res => {
        if (!res) {
          this._deviceRssiInfo = {};
        } else {
          this._deviceRssiInfo = res;
        }
        return this._deviceRssiInfo;
      });
    }
    return this._deviceRssiInfo;
  };

  timer: number;
  opts: any;
  fullViewRef: any;
  _deviceRssiInfo: null | { value?: number; supported?: boolean };
  _onWillFocus: () => void;
  _renderScene: () => void;
  _sceneConfigs: () => void;
  _onBack: () => boolean;

  __sceneConfigs(route, routeStack) {
    return route.sceneConfigs ? route.sceneConfigs : SceneConfigs;
  }

  __renderScene(route, navigator) {
    _navigator = navigator;
    TYSdk.applyNavigator(navigator);
    return this.dispatchRoute(route, navigator);
  }

  __onDidFocus(route) {
    TYEvent.fire('NAVIGATOR_ON_DID_FOCUS', route);
  }

  __onWillFocus(route) {
    TYEvent.fire('NAVIGATOR_ON_WILL_FOCUS', route);
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      Notification.hide();
    }
  };

  _handleMqttSignal = ({
    data = {},
    protocol,
  }: {
    data?: { data?: { signal: number } };
    protocol?: number;
  } = {}) => {
    if (!data) return;
    if (protocol === 23) {
      const { data: result } = data;
      if (!result || result.signal === undefined) return;
      const { signal } = result;
      this._getRssiInfo().then((res: { value: number; supported: boolean }) => {
        if (!res) {
          return;
        }
        const { value: rssi, supported } = res;
        if (supported !== true) {
          return;
        }
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
    const opts: {
      enablePopGesture?: boolean;
      gesture?: boolean;
      id?: string;
      hideFullView?: boolean;
      title?: string;
      showOfflineView?: boolean;
      FullView?: any;
      renderWifiOfflineView?: () => JSX.Element;
      renderBleOfflineView?: () => JSX.Element;
      renderStatusBar?: () => JSX.Element;
      renderTopBar?: () => JSX.Element;
      topbarTextStyle?: Omit<TextStyle, 'color'> & { color?: string };
      topbarStyle?: StyleProp<ViewStyle>;
      style?: StyleProp<ViewStyle>;
      backgroundStyle?: StyleProp<ImageStyle>;
      reconnectTextStyle?: StyleProp<TextStyle>;
      hideTopbar?: boolean;
      isBleOfflineOverlay?: boolean;
      background?: IBackground;
    } = this.hookRoute(route);
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
      if (opts.hideFullView) return contentLayout;
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
    if (opts.FullView) {
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

  // 可重写此方法实现具体页面渲染
  renderScene(route, navigator) {
    const Element = route.element || View;
    return <Element navigator={navigator} {...route} />;
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
