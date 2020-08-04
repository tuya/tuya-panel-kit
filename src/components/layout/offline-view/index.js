import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, View, StyleSheet, ViewPropTypes, ColorPropType } from 'react-native';
import TYSdk from '../../../TYNativeApi';
import RefText from '../../TYText';
import { RatioUtils, NumberUtils, CoreUtils } from '../../../utils';
import BleOfflineView from './ble-offline-view';
import NewOfflineView from './new-offline-view';

const TYEvent = TYSdk.event;
const TYMobile = TYSdk.mobile;
const TYDevice = TYSdk.device;
const TYNative = TYSdk.native;

const { convert } = RatioUtils;

const { compareVersion, get } = CoreUtils;

const OFFLINE_API_SUPPORT = TYMobile.verSupported('2.91');

const Res = {
  offline: require('../../res/offline.png'),
};

const requireRnVersion = '5.23';

export default class OfflineView extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: ViewPropTypes.style,
    text: PropTypes.string,
    // isShare: PropTypes.bool,
    appOnline: PropTypes.bool,
    deviceOnline: PropTypes.bool,
    capability: PropTypes.number,
    isBleOfflineOverlay: PropTypes.bool,
    showDeviceImg: PropTypes.bool,
    maskColor: ColorPropType,
  };

  static defaultProps = {
    style: null,
    textStyle: null,
    text: null,
    // isShare: false,
    appOnline: true,
    deviceOnline: true,
    capability: 1,
    isBleOfflineOverlay: true,
    showDeviceImg: true,
    maskColor: 'rgba(0, 0, 0, 0.8)',
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
    this.setState({
      show: false,
    });
  };

  _handleMoreHelp = () => {
    TYMobile.jumpSubPage(
      { uiId: '000000cg8b' },
      {
        textLinkStyle: {
          textDecorationLine: 'none',
          color: '#999',
        },
      }
    );
  };

  renderBleView() {
    const { deviceOnline, capability, isBleOfflineOverlay } = this.props;
    // 在蓝牙状态未获取到之前不渲染该页面
    if (typeof this.state.bluetoothStatus !== 'boolean') {
      return null;
    }
    return (
      <BleOfflineView
        bluetoothValue={this.state.bluetoothStatus}
        deviceOnline={deviceOnline}
        capability={capability}
        isBleOfflineOverlay={isBleOfflineOverlay}
      />
    );
  }

  renderOldView() {
    const { showDeviceImg, maskColor } = this.props;
    const { show } = this.state;
    const appRnVersion = get(TYNative, 'mobileInfo.appRnVersion');
    // app版本大于3.16 →  appRNVersion >= 5.23才会显示新离线弹框
    const isGreater = appRnVersion && compareVersion(appRnVersion, requireRnVersion);
    const isShowNewOffline = isGreater === 0 || isGreater === 1;
    return isShowNewOffline ? (
      <NewOfflineView
        show={show}
        showDeviceImg={showDeviceImg}
        onLinkPress={this._handleLinkPress}
        onConfirm={this._handleConfirm}
        onHelpPress={this._handleMoreHelp}
        maskColor={maskColor}
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
    const isBleDevice = isBle || isBleMesh || isSigMesh;

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
