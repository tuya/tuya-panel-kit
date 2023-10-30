import React, { Component } from 'react';
import { Image, View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYSdk } from 'tuya-panel-core';
import TYText from 'tuya-panel-text';
import BleOfflineView from './ble-offline-view';
import NewOfflineView from './new-offline-view';

const TYMobile = TYSdk.mobile;
const TYNative = TYSdk.native;
const TYDevice = TYSdk.device;
const TYEvent = TYSdk.event;

const { convert } = Utils.RatioUtils;
const { compareVersion, get } = Utils.CoreUtils;
const { getBitValue } = Utils.NumberUtils;
const OFFLINE_API_SUPPORT = true;

const Res = {
  offline: require('../res/offline.png'),
};

const requireRnVersion = '5.23';

const requireWifiRnVersion = '5.30';

export interface IOfflineProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  appOnline?: boolean;
  deviceOnline?: boolean;
  capability?: number;
  isBleOfflineOverlay?: boolean;
  showDeviceImg?: boolean;
  maskColor?: string;
  renderWifiOfflineView?: () => JSX.Element;
  // 自定义蓝牙离线
  renderBleOfflineView?: () => JSX.Element;
  reconnectTextStyle?: StyleProp<TextStyle>;
}

export interface IOfflineViewState {
  bluetoothStatus: boolean;
  show: boolean;
}

export default class OfflineView extends Component<IOfflineProps, IOfflineViewState> {
  static defaultProps = {
    style: null,
    textStyle: null,
    text: null,
    appOnline: true,
    deviceOnline: true,
    capability: 1,
    isBleOfflineOverlay: true,
    showDeviceImg: true,
    maskColor: 'rgba(0, 0, 0, 0.8)',
    renderWifiOfflineView: null,
    renderBleOfflineView: null,
    reconnectTextStyle: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      bluetoothStatus: null,
      show: true,
    };
  }

  async componentDidMount() {
    try {
      if (OFFLINE_API_SUPPORT) {
        const bluetoothStatus = await TYDevice.getBleManagerState();
        this.setState({ bluetoothStatus });
      }
    } catch (e) {}
    TYEvent.on('bluetoothChange', this.bluetoothChangeHandle);
  }

  componentWillUnmount() {
    TYEvent.off('bluetoothChange', this.bluetoothChangeHandle);
  }

  bluetoothChangeHandle = bluetoothStatus => {
    this.setState({ bluetoothStatus });
  };

  _handleLinkPress = () => {
    const { devId } = TYSdk.devInfo;
    const isJumpToWifi = this._handleVersionToJump();
    if (isJumpToWifi) {
      // 为了处理安卓的生命周期问题（可能会导致进入不了配网页面）
      TYNative.jumpTo(`tuyaSmart://device_offline_reconnect?device_id=${devId}`);
      TYMobile.back();
    }
  };

  // 判断App RN版本是否为3.21及以上，且身份符合条件才可跳转至配网页面
  _handleVersionToJump = () => {
    const appRnVersion = get(TYNative, 'mobileInfo.appRnVersion');
    const role = get(TYSdk, 'devInfo.role');
    const isGreater = appRnVersion && compareVersion(appRnVersion, requireWifiRnVersion);
    const isJumpToWifi = isGreater === 0 || isGreater === 1;
    // role = 1: 家庭管理员  role = 2: 家庭超级管理员
    return isJumpToWifi && (role === 1 || role === 2);
  };

  _handleMoreHelp = () => {
    const { reconnectTextStyle } = this.props;
    const isJumpToWifi = this._handleVersionToJump();
    let linkJumpStyle;
    if (isJumpToWifi) {
      linkJumpStyle = [
        {
          color: '#FF4800',
          textDecorationLine: 'underline',
        },
        reconnectTextStyle,
      ];
    } else {
      linkJumpStyle = {
        textDecorationLine: 'none',
        color: '#999',
      };
    }
    TYMobile.jumpSubPage(
      { uiId: '000000cg8b' },
      {
        textLinkStyle: linkJumpStyle,
      }
    );
  };

  renderBleView() {
    const { deviceOnline, capability, isBleOfflineOverlay, renderBleOfflineView } = this.props;
    const isJumpToWifi = this._handleVersionToJump();
    // 在蓝牙状态未获取到之前不渲染该页面
    if (typeof this.state.bluetoothStatus !== 'boolean') {
      return null;
    }
    if (renderBleOfflineView) {
      return renderBleOfflineView();
    }
    return (
      <BleOfflineView
        bluetoothValue={this.state.bluetoothStatus}
        deviceOnline={deviceOnline}
        isBleOfflineOverlay={isBleOfflineOverlay}
        isJumpToWifi={isJumpToWifi}
        onLinkPress={this._handleLinkPress}
      />
    );
  }

  renderOldView() {
    const { showDeviceImg, maskColor, renderWifiOfflineView, reconnectTextStyle } = this.props;
    const { show } = this.state;
    if (renderWifiOfflineView) {
      return renderWifiOfflineView();
    }
    const appRnVersion = get(TYNative, 'mobileInfo.appRnVersion');
    // app版本大于3.16 →  appRNVersion >= 5.23才会显示新离线弹框
    const isGreater = appRnVersion && compareVersion(appRnVersion, requireRnVersion);
    const isShowNewOffline = isGreater === 0 || isGreater === 1;
    const showOldOffline = get(TYSdk, 'devInfo.panelConfig.fun.showOldOffline', false);
    const isJumpToWifi = this._handleVersionToJump();
    return !showOldOffline && isShowNewOffline ? (
      <NewOfflineView
        show={show}
        showDeviceImg={showDeviceImg}
        onLinkPress={this._handleLinkPress}
        onHelpPress={this._handleMoreHelp}
        maskColor={maskColor}
        isJumpToWifi={isJumpToWifi}
        reconnectTextStyle={reconnectTextStyle}
      />
    ) : (
      <View accessibilityLabel="OfflineView_Wifi" style={[styles.container, this.props.style]}>
        <Image style={styles.icon} source={Res.offline} />
        <TYText style={[styles.tip, this.props.textStyle]}>{this.props.text}</TYText>
      </View>
    );
  }

  render() {
    /*
      app版本不支持的，继续走老的离线提示
      部分老的面板未用NavigatorLayout，继续走老的离线提示
      分享的设备不支持删除操作
    */
    const { appOnline, deviceOnline, capability } = this.props;
    const isBle = !!getBitValue(capability, 10);
    const isBleMesh = !!getBitValue(capability, 11);
    const isSigMesh = !!getBitValue(capability, 15);
    // 新增蓝牙 Beacon 协议
    const isBleBeacon = !!getBitValue(capability, 21);
    const isBleDevice = isBle || isBleMesh || isSigMesh || isBleBeacon;

    // 如果是蓝牙设备，设备在线，但网络离线时不需要显示遮罩
    if (deviceOnline && isBleDevice) {
      return null;
    }

    if (appOnline && OFFLINE_API_SUPPORT && TYSdk.Navigator && TYSdk.Navigator.push) {
      const isWifiDevice = capability === 1;
      if (isWifiDevice || !appOnline) {
        return this.renderOldView();
      }
      if (isBleDevice) {
        return this.renderBleView();
      }
    }

    return this.renderOldView();
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: `rgba(0, 0, 0, 0.8)`,
    justifyContent: 'center',
  },
  icon: {
    height: convert(81),
    resizeMode: 'stretch',
    width: convert(121),
  },
  tip: {
    color: 'white',
    fontSize: 16,
    marginTop: convert(14),
    textAlign: 'center',
  },
});
