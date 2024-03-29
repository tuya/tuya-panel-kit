import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet, Platform } from 'react-native';
import { Rect } from 'react-native-svg';
import { TYSdk, Strings } from 'tuya-panel-core';
import TopBar from 'tuya-panel-topbar';
import { Utils } from 'tuya-panel-utils';
import { Notification, GlobalToast, LinearGradient, RadialGradient } from 'tuya-panel-kit';
import OfflineView from '../offline-view';
import { IFullViewProps, IFullViewState } from './interface';

const TYNative = TYSdk.native;
const TYMobile = TYSdk.mobile;
const TYEvent = TYSdk.event;

const { get, isArray } = Utils.CoreUtils;
const { withTheme } = Utils.ThemeUtils;
const { isIphoneX } = Utils.RatioUtils;
const Screen = Dimensions.get('screen');
const isIos = Platform.OS === 'ios';
const dropHeight = isIos ? (isIphoneX ? 88 : 64) : 56;

class FullView extends Component<IFullViewProps, IFullViewState> {
  static defaultProps = {
    theme: null,
    title: '',
    style: null,
    topbarStyle: null,
    hideTopbar: false,
    showMenu: true,
    background: null,
    onBack: null,
    capability: 0,
    isBleOfflineOverlay: true,
    renderWifiOfflineView: null,
    renderBleOfflineView: null,
    reconnectTextStyle: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      showNotification: false,
      showToast: false,
      isShare: false,
      information: {},
      motionStyle: {},
      successInformation: {},
      successStyle: {},
    };
  }

  componentDidMount() {
    TYEvent.on('showNotification', this.showNotification);
    TYEvent.on('hideNotification', this.hideNotification);
    TYEvent.on('showToast', this.showToast);
    TYEvent.on('hideToast', this.hideToast);
  }

  componentWillUnmount() {
    TYEvent.off('showNotification', this.showNotification);
    TYEvent.off('hideNotification', this.hideNotification);
    TYEvent.off('showToast', this.showToast);
    TYEvent.off('hideToast', this.hideToast);
  }

  onBack = tab => {
    if (!this.props.onBack || !this.props.onBack()) {
      if (tab === 'right') {
        TYNative.showDeviceMenu();
      } else {
        TYNative.back();
      }
    }
  };

  get topBarMoreIconName() {
    return (
      (TYSdk.devInfo.panelConfig &&
        TYSdk.devInfo.panelConfig.fun &&
        TYSdk.devInfo.panelConfig.fun.topBarMoreIconName) ||
      'pen'
    );
  }

  refBackground: any;
  refRootView: any;

  showNotification = data => {
    const { motionStyle, ...rest } = data;
    this.setState({ showNotification: true, information: rest, motionStyle });
  };

  showToast = data => {
    const { style, ...rest } = data;
    this.setState({ showToast: true, successInformation: rest, successStyle: style });
  };

  hideNotification = () => {
    this.setState({ showNotification: false });
  };

  hideToast = () => {
    this.setState({ showToast: false });
  };

  renderBackground(background) {
    const { backgroundStyle } = this.props;

    if (typeof background === 'number') {
      return (
        <Image
          fadeDuration={0}
          ref={ref => {
            this.refBackground = ref;
          }}
          style={[styles.background, backgroundStyle]}
          source={background}
        />
      );
    }

    if (typeof background === 'object') {
      const { uri, stops, ...others } = background;

      // 添加网络图片背景的支持
      if (uri) {
        return (
          <Image
            fadeDuration={0}
            ref={ref => {
              this.refBackground = ref;
            }}
            style={[styles.background, backgroundStyle]}
            source={{ uri }}
            {...others}
          />
        );
      }

      if (isArray(stops)) {
        if (TYMobile.verSupported('2.5')) {
          return (
            <RadialGradient
              ref={ref => {
                this.refBackground = ref;
              }}
              style={[styles.gradientStyle, backgroundStyle]}
              {...others}
              stops={stops}
            />
          );
        }
        return (
          <View
            ref={ref => {
              this.refBackground = ref;
            }}
            style={[styles.gradientStyle, backgroundStyle]}
            {...others}
            stops={stops}
          />
        );
      }

      const { x1, y1, x2, y2, ...ostops } = background;
      if (TYMobile.verSupported('2.5')) {
        return (
          <LinearGradient
            ref={ref => {
              this.refBackground = ref;
            }}
            style={[styles.gradientStyle, backgroundStyle]}
            // @ts-ignore
            stops={ostops}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
          >
            <Rect x="0" y="0" height={Screen.height} width={Screen.width} />
          </LinearGradient>
        );
      }
      return (
        <View
          ref={ref => {
            this.refBackground = ref;
          }}
          style={[styles.gradientStyle, backgroundStyle]}
          // @ts-ignore
          stops={ostops}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        >
          <Rect x="0" y="0" height={Screen.height} width={Screen.width} />
        </View>
      );
    }

    return null;
  }

  renderOfflineView() {
    const {
      appOnline,
      deviceOnline,
      showOfflineView,
      capability,
      isBleOfflineOverlay,
      renderBleOfflineView,
      renderWifiOfflineView,
      reconnectTextStyle,
    } = this.props;
    const show = !appOnline || !deviceOnline;
    const tipText = !appOnline
      ? Strings.getLang('appoffline')
      : !deviceOnline
      ? Strings.getLang('offline')
      : '';

    if (!show) {
      return null;
    }

    if (showOfflineView === undefined) {
      return null;
    }

    if (showOfflineView === false) {
      return null;
    }

    return (
      <OfflineView
        style={styles.offlineStyle}
        text={tipText}
        textStyle={styles.offlineText}
        appOnline={appOnline}
        deviceOnline={deviceOnline}
        capability={capability}
        isBleOfflineOverlay={isBleOfflineOverlay}
        renderWifiOfflineView={renderWifiOfflineView}
        renderBleOfflineView={renderBleOfflineView}
        reconnectTextStyle={reconnectTextStyle}
      />
    );
  }

  // 渲染Notification
  renderNotification() {
    return (
      <Notification
        onClose={() => this.setState({ showNotification: false })}
        // @ts-ignore 已提 pr 至 @types
        motionConfig={{ dropHeight }}
        {...this.state.information}
        show={this.state.showNotification}
        motionStyle={[{ zIndex: 99 }, this.state.motionStyle]}
      />
    );
  }

  // 渲染全局成功Toast
  renderGlobalToast() {
    return (
      // @ts-ignore 已提 pr 至 @types
      <GlobalToast
        onFinish={() => this.setState({ showToast: false })}
        {...this.state.successInformation}
        show={this.state.showToast}
        style={[{ zIndex: 999 }, this.state.successStyle]}
      />
    );
  }

  renderTopBar() {
    const { title, topbarStyle, hideTopbar, renderTopBar, topbarTextStyle } = this.props;
    const { isShare } = this.state;

    if (!hideTopbar) {
      if (renderTopBar) {
        return renderTopBar();
      }
      const uiPhase = TYSdk.devInfo.uiPhase || 'release';
      const { color } = StyleSheet.flatten(topbarTextStyle) || {};
      const isShowMore = !(isShare || !this.props.showMenu);
      const actions = [
        {
          accessibilityLabel: 'TopBar_Btn_RightItem',
          name: this.topBarMoreIconName,
          onPress: () => this.onBack('right'),
        },
        uiPhase !== 'release' && {
          accessibilityLabel: 'TopBar_Preview',
          style: {
            backgroundColor: '#57DD43',
            borderWidth: 1,
          },
          contentStyle: { fontSize: 12 },
          color: '#000',
          source: 'Preview',
          disabled: true,
        },
      ].filter(v => !!v);
      return (
        <TopBar
          style={[{ zIndex: 999 }, topbarStyle]}
          title={title}
          titleStyle={topbarTextStyle}
          color={color}
          actions={isShowMore ? actions : null}
          onBack={() => this.onBack('left')}
        />
      );
    }

    return null;
  }

  renderStatusBar() {
    const { renderStatusBar } = this.props;

    if (renderStatusBar) {
      return renderStatusBar();
    }

    return null;
  }

  render() {
    const { style, theme } = this.props;
    const background = this.props.background || get(theme, 'global.background', '#f8f8f8');
    const isBgColor = typeof background === 'string';
    return (
      <View
        ref={ref => {
          this.refRootView = ref;
        }}
        style={[styles.container, isBgColor && { backgroundColor: background }, style]}
      >
        {this.renderStatusBar()}
        {!isBgColor && this.renderBackground(background)}
        {this.renderNotification()}
        {this.renderTopBar()}
        {this.renderGlobalToast()}
        {this.props.children}
        {this.renderOfflineView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'transparent',
    bottom: 0,
    height: Screen.height,
    left: 0,
    position: 'absolute',
    resizeMode: 'stretch',
    right: 0,
    top: 0,
    width: Screen.width,
  },

  container: {
    flex: 1,
  },

  gradientStyle: {
    height: Screen.height,
    width: Screen.width,
  },

  offlineStyle: {
    height: Screen.height - TopBar.height,
    position: 'absolute',
    top: TopBar.height,
    width: Screen.width,
  },

  offlineText: {
    paddingBottom: TopBar.height * 2,
  },
});

export default withTheme(FullView);
