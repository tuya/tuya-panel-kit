import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TYSdk } from '../../../../TYNativeApi';
import Modal from '../../../modal';
import H5WebView from '../webview';
import BleToast from './ble-toast';
import BleToastModal from './ble-toast-modal'; // 安卓开启蓝牙Toast提示框
import BleTipModal from './ble-tip-modal'; // IOS开启蓝牙弹窗提示框
import BleOfflineModal from './ble-offline-modal';
import Strings from '../../../i18n/strings';
import { CoreUtils, RatioUtils } from '../../../../utils';
import { StyledTitle, StyledCancelText } from './styled';
import { StyledFooter, StyledButton, StyledConfirmText } from '../../../dialog/styled';

const { get } = CoreUtils;
const { isIos } = RatioUtils;

const TYDevice = TYSdk.device;
const TYNative = TYSdk.native;

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
    /**
     * @description 判断App RN版本是否为3.21及以上，符合条件才可跳转至配网页面
     */
    isJumpToWifi: PropTypes.bool,
    /**
     * 跳转链接
     */
    onLinkPress: PropTypes.func,
  };

  static defaultProps = {
    deviceOnline: true,
    bluetoothValue: true,
    isBleOfflineOverlay: true,
    isJumpToWifi: false,
    onLinkPress: () => {},
  };

  componentDidMount() {
    this.showOverlayModal();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.deviceOnline !== this.props.deviceOnline ||
      prevProps.bluetoothValue !== this.props.bluetoothValue
    ) {
      this.showOverlayModal();
    }
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
            onPress={() => TYDevice.gotoBlePermissions()}
          />,
          { mask: false }
        );
        TYDevice.gotoBlePermissions();
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
    const { isBleOfflineOverlay, onLinkPress, isJumpToWifi } = this.props;
    Modal.render(
      <BleOfflineModal
        disabled={true}
        title={Strings.getLang('deviceOffline')}
        cancelText=""
        confirmText=""
        content={
          <View style={{ paddingBottom: 24, paddingHorizontal: 30 }}>
            <StyledTitle
              style={{
                fontSize: 13,
                textAlign: 'left',
                lineHeight: 20,
              }}
            >
              {Strings.getLang('deviceOfflineHelpNew')}
              <StyledTitle
                style={[
                  {
                    fontSize: 13,
                    lineHeight: 20,
                  },
                  isJumpToWifi && {
                    color: '#FF4800',
                    textDecorationLine: 'underline',
                  },
                ]}
                onPress={onLinkPress}
              >
                {Strings.getLang('offline_link')}
              </StyledTitle>
            </StyledTitle>
          </View>
        }
        onClose={Modal.close}
        footer={
          <StyledFooter>
            <StyledButton
              bordered={true}
              onPress={() => {
                Modal.close();
                isBleOfflineOverlay && TYNative.back();
              }}
            >
              <StyledCancelText style={{ fontWeight: '400' }}>
                {Strings.getLang(isBleOfflineOverlay ? 'backToHome' : 'alreadyKnow')}
              </StyledCancelText>
            </StyledButton>

            <StyledButton onPress={this.openH5HelpWebView} disabled={false}>
              <StyledConfirmText style={{ fontWeight: '400' }}>
                {Strings.getLang('checkHelp')}
              </StyledConfirmText>
            </StyledButton>
          </StyledFooter>
        }
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
        TYDevice.gotoBlePermissions();
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
