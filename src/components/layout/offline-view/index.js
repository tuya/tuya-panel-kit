import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, View, StyleSheet, ViewPropTypes, ColorPropType, Text } from 'react-native';
import { TYSdk } from '../../../TYNativeApi';
import RefText from '../../TYText';
import { RatioUtils, NumberUtils, CoreUtils } from '../../../utils';
import BleOfflineView from './ble-offline-view';
import NewOfflineView from './new-offline-view';

const TYMobile = TYSdk.mobile;
const TYNative = TYSdk.native;
const TYDevice = TYSdk.device;
const TYEvent = TYSdk.event;

const { convert } = RatioUtils;
const { compareVersion, get } = CoreUtils;
const OFFLINE_API_SUPPORT = TYMobile.verSupported('2.91');

const Res = {
  offline: require('../../res/offline.png'),
};

const requireRnVersion = '5.23';

const requireWifiRnVersion = '5.30';

export default class OfflineView extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: ViewPropTypes.style,
    text: PropTypes.string,
    appOnline: PropTypes.bool,
    deviceOnline: PropTypes.bool,
    capability: PropTypes.number,
    isBleOfflineOverlay: PropTypes.bool,
    showDeviceImg: PropTypes.bool,
    maskColor: ColorPropType,
    // 自定义 wifi 离线
    renderWifiOfflineView: PropTypes.func,
    // 自定义蓝牙离线
    renderBleOfflineView: PropTypes.func,
    // wifi 离线的时候用户不想要重新连接跳转
    reconnectTextStyle: Text.propTypes.style,
  };

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

  state = {
    bluetoothStatus: null,
    show: true,
  };

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
        capability={capability}
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
        onConfirm={this._handleConfirm}
        onHelpPress={this._handleMoreHelp}
        maskColor={maskColor}
        isJumpToWifi={isJumpToWifi}
        reconnectTextStyle={reconnectTextStyle}
      />
    ) : (
      <View accessibilityLabel="OfflineView_Wifi" style={[styles.container, this.props.style]}>
        <Image style={styles.icon} source={Res.offline} />
        <RefText style={[styles.tip, this.props.textStyle]}>{this.props.text}</RefText>
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
    const isBle = !!NumberUtils.getBitValue(capability, 10);
    const isBleMesh = !!NumberUtils.getBitValue(capability, 11);
    const isSigMesh = !!NumberUtils.getBitValue(capability, 15);
    // 新增蓝牙 Beacon 协议
    const isBleBeacon = !!NumberUtils.getBitValue(capability, 21);
    const isBleDevice = isBle || isBleMesh || isSigMesh || isBleBeacon;

    // 如果是蓝牙设备，设备在线，但网络离线时不需要显示遮罩
    if (deviceOnline && isBleDevice) {
      return null;
    }

    if (appOnline && OFFLINE_API_SUPPORT && TYSdk.Navigator && TYSdk.Navigator.push) {
      const isWifiDevice = capability === 1;
      if (isWifiDevice || !appOnline) {
        return this.renderOldView();
      } else if (isBleDevice) {
        return this.renderBleView();
      }
    }

    return this.renderOldView();
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: `rgba(0, 0, 0, 0.8)`,
  },
  icon: {
    resizeMode: 'stretch',
    width: convert(121),
    height: convert(81),
  },
  tip: {
    marginTop: convert(14),
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
