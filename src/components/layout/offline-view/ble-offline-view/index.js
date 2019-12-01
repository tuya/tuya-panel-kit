import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import TYSdk from '../../../../TYNativeApi';
import Strings from '../../../../i18n/strings';
import Modal from '../../../modal';
import H5WebView from '../webview';
import BleToast from './ble-toast';
import BleToastModal from './ble-toast-modal'; // 安卓开启蓝牙Toast提示框
import BleTipModal from './ble-tip-modal'; // IOS开启蓝牙弹窗提示框
import BleOfflineModal from './ble-offline-modal';
import { CoreUtils, RatioUtils } from '../../../../utils';

const TYNative = TYSdk.native;

const { get } = CoreUtils;
const { isIos } = RatioUtils;

const Res = {
  arrow: require('../../../res/arrow.png'),
  question: require('../../../res/question.png'),
};

const BLE_HELP_LINK = 'https://smartapp.tuya.com/faq/mesh1';

export default class BleOfflineView extends Component {
  static propTypes = {
    /**
     * 设备在线状态
     */
    deviceOnline: PropTypes.bool,
    /**
     * 蓝牙开关状态
     */
    bluetoothValue: PropTypes.bool,
    /**
     * 蓝牙离线提示是否覆盖全页面（除头部栏外）
     */
    isBleOfflineOverlay: PropTypes.bool,
  };

  static defaultProps = {
    deviceOnline: true,
    bluetoothValue: true,
    isBleOfflineOverlay: true,
  };

  componentDidMount() {
    this.showOverlayModal();
  }

  componentDidUpdate() {
    this.showOverlayModal();
  }

  componentWillUnmount() {
    Modal.close();
  }

  getTipText() {
    const { deviceOnline, bluetoothValue } = this.props;
    // 如果蓝牙开并且设备在线，啥都不显示
    if (bluetoothValue && deviceOnline) {
      return;
    }
    let tipText;
    if (!bluetoothValue) {
      // 如果蓝牙开关未开启
      tipText = Strings.getLang('bluetoothOfflineTip');
    } else if (!deviceOnline) {
      // 如果蓝牙开关已开启但设备离线
      tipText = Strings.getLang('deviceOffline');
    }
    return tipText;
  }

  showOverlayModal = () => {
    const { bluetoothValue, deviceOnline, isBleOfflineOverlay } = this.props;
    if (!isBleOfflineOverlay) {
      return;
    }
    if (!bluetoothValue) {
      if (isIos) {
        Modal.render(<BleTipModal disabled={true} maskColor="rgba(0, 0, 0, 0.6)" />, {
          mask: false,
        });
      } else {
        Modal.render(
          <BleToastModal
            style={{ top: 16 }}
            disabled={true}
            text={Strings.getLang('bluetoothOfflineTip')}
            image={Res.arrow}
            onPress={() => TYNative.gotoBlePermissions()}
          />,
          { mask: false }
        );
        TYNative.gotoBlePermissions();
      }
    } else if (!deviceOnline) {
      const routes =
        TYSdk.Navigator && TYSdk.Navigator.getCurrentRoutes && TYSdk.Navigator.getCurrentRoutes();
      const isOfflineWebView = get(routes, `${routes.length - 1}.isOfflineWebView`, false);
      if (isOfflineWebView) {
        return;
      }
      this.showBleOfflineModal();
    }
  };

  showBleOfflineModal = () => {
    const { isBleOfflineOverlay } = this.props;
    Modal.render(
      <BleOfflineModal
        disabled={true}
        title={Strings.getLang('deviceOffline')}
        subTitle={Strings.getLang('deviceOfflineHelp')}
        cancelText={Strings.getLang(isBleOfflineOverlay ? 'backToHome' : 'alreadyKnow')}
        confirmText={Strings.getLang('checkHelp')}
        onCancel={() => {
          Modal.close();
          isBleOfflineOverlay && TYNative.back();
        }}
        onConfirm={this.openH5HelpWebView}
        onClose={Modal.close}
      />,
      { mask: false }
    );
  };

  openH5HelpWebView = () => {
    Modal.close();
    TYSdk.Navigator.push({
      isOfflineWebView: true,
      element: H5WebView,
      hideFullView: true,
      barStyle: 'default',
      titleStyle: { color: '#000' },
      appStyle: { backgroundColor: '#fff' },
      topBarStyle: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E1E1E1',
        backgroundColor: '#fff',
      },
      source: BLE_HELP_LINK,
      title: Strings.getLang('offlineHelp'),
    });
  };

  _handleToastPress = () => {
    const { bluetoothValue, deviceOnline } = this.props;
    if (!bluetoothValue) {
      if (isIos) {
        Modal.render(<BleTipModal onClose={Modal.close} />, { mask: false });
      } else {
        TYNative.gotoBlePermissions();
      }
    } else if (!deviceOnline) {
      this.showBleOfflineModal(true);
    }
  };

  render() {
    const { bluetoothValue, isBleOfflineOverlay } = this.props;
    if (isBleOfflineOverlay) {
      return null;
    }
    const tipText = this.getTipText();
    if (!tipText) {
      return null;
    }
    return (
      <BleToast
        text={tipText}
        image={bluetoothValue ? Res.question : Res.arrow}
        onPress={this._handleToastPress}
      />
    );
  }
}
