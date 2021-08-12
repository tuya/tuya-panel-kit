import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ViewPropTypes,
  TouchableWithoutFeedback,
} from 'react-native';
import TYSdk from '../../../TYNativeApi';
import Strings from '../../../i18n/strings';
import H5WebView from '../../webview';
import RefText from '../../TYText';
import IconFont from '../../iconfont';
import { RatioUtils, CoreUtils } from '../../../utils';

const TYEvent = TYSdk.event;
const TYMobile = TYSdk.mobile;
const TYNative = TYSdk.native;
const TYDevice = TYSdk.device;

const { convert, viewWidth } = RatioUtils;
const { get } = CoreUtils;

const OFFLINE_API_SUPPORT = TYMobile.verSupported('2.91');

const Res = {
  offline: require('./common_offline.png'),
};

const BlueToothOffData = {
  title: Strings.getLang('offlineTitle'),
  rowTitle1: Strings.getLang('devBeside'),
  row1: Strings.getLang('openBlueTooth'),
  rowTitle2: Strings.getLang('devNotBeside'),
  row2: Strings.getLang('offlineHelp'),
  beNotInUseTitle: Strings.getLang('beNotInUse'),
  beNotInUse: Strings.getLang('beNotInUseContent'),
};

const BlueToothOnData = {
  title: Strings.getLang('offlineTitle'),
  rowTitle2: Strings.getLang('iDotKnow'),
  row2: Strings.getLang('offlineHelp'),
  beNotInUseTitle: Strings.getLang('beNotInUse'),
  beNotInUse: Strings.getLang('beNotInUseContent'),
};

// const WiFiData = {
//   title: Strings.getLang('offlineTitle'),
//   rowTitle1: Strings.getLang('wifiConnected'),
//   row1: Strings.getLang('checkWifiStatus'),
//   rowTitle2: Strings.getLang('wifiUnConnected'),
//   row2: Strings.getLang('offlineHelp'),
//   beNotInUseTitle: Strings.getLang('beNotInUse'),
//   beNotInUse: Strings.getLang('beNotInUseContent'),
// };

export default class OfflineView extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: ViewPropTypes.style,
    text: PropTypes.string,
    isShare: PropTypes.bool,
    appOnline: PropTypes.bool,
  };

  static defaultProps = {
    style: null,
    textStyle: null,
    text: null,
    isShare: false,
    appOnline: true,
  };

  state = {
    bluetoothStatus: null,
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
  }

  openH5WebView(title) {
    TYDevice.getDeviceInfo().then(devInfo => {
      const { panelCommonConfig } = devInfo;
      const commonConfig = JSON.parse(panelCommonConfig);
      const bleOfflineHelpLink = get(commonConfig, 'bleOfflineHelpLink');
      if (!bleOfflineHelpLink) return;
      TYSdk.Navigator.push({
        element: H5WebView,
        noFullView: true,
        barStyle: 'default',
        titleStyle: {
          color: '#000'
        },
        appStyle: {
          backgroundColor: '#fff'
        },
        topBarStyle: {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: '#E1E1E1',
          backgroundColor: '#fff',
        },
        source: bleOfflineHelpLink,
        title,
      });
    }).catch(error => {
      console.warn('get bleOfflineHelpLink failed :>> ', error);
    });
  }

  checkWifi() {
    TYNative.gotoDeviceWifiNetworkMonitor();
  }

  checkBlueTooth() {
    TYNative.gotoBlePermissions();
  }

  deleteDevice() {
    TYNative.simpleConfirmDialog(
      '',
      Strings.getLang('beNotInUseCheck'),
      () => TYDevice.deleteDeviceInfo().then(TYMobile.back).catch(() => {
        TYNative.simpleTipDialog(Strings.getLang('removeFailed'), () => {});
      }),
      () => {}
    );
  }

  renderNewView(data, bleOpen) {
    const { isShare } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.content}>
          <View style={[styles.row, styles.header]}>
            <IconFont
              name="warning"
              size={convert(32)}
              color="#F2F2F2"
            />
            <Text style={[styles.txt, styles.headerTitle]}>{data.title}</Text>
          </View>
          {!bleOpen ? (
            <TouchableWithoutFeedback onPress={data.checkHandle}>
              <View style={styles.row}>
                <View style={styles.rowContent}>
                  <Text style={[styles.txt, styles.title]}>
                    {data.rowTitle1}
                  </Text>
                  <Text style={styles.txt}>{data.row1}</Text>
                </View>
                <IconFont name="arrow" color="rgba(0, 0, 0, 0.6)" />
              </View>
            </TouchableWithoutFeedback>
          ) : null}
          <TouchableWithoutFeedback
            onPress={() => {
              data.helpHandle(data.row2);
            }}
          >
            <View style={[styles.row, { borderBottomWidth: isShare ? 0 : 1 }]}>
              <View style={styles.rowContent}>
                <Text style={[styles.txt, styles.title]}>{data.rowTitle2}</Text>
                <Text style={styles.txt}>{data.row2}</Text>
              </View>
              <IconFont name="arrow" color="rgba(0, 0, 0, 0.6)" />
            </View>
          </TouchableWithoutFeedback>
          {!isShare ? (
            <TouchableWithoutFeedback onPress={data.delHandle}>
              <View style={[styles.row, { borderBottomWidth: 0 }]}>
                <View style={styles.rowContent}>
                  <Text style={[styles.txt, styles.title]}>
                    {data.beNotInUseTitle}
                  </Text>
                  <Text style={styles.txt}>{data.beNotInUse}</Text>
                </View>
                <IconFont name="arrow" color="rgba(0, 0, 0, 0.6)" />
              </View>
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </View>
    );
  }

  renderOldView() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Image style={styles.icon} source={Res.offline} />
        <RefText style={[styles.tip, this.props.textStyle]}>
          {this.props.text}
        </RefText>
      </View>
    );
  }

  render() {
    /*
      app版本不支持的，继续走老的离线提示
      部分老的面板未用NavigatorLayout，继续走老的离线提示
      分享的设备不支持删除操作
    */
    const { appOnline } = this.props;

    if (appOnline && OFFLINE_API_SUPPORT && TYSdk.Navigator && TYSdk.Navigator.push) {
      const { bluetoothStatus } = this.state;
      const isWifiDevice = TYDevice.isWifiDevice();
      const handles = {
        helpHandle: this.openH5WebView,
        delHandle: this.deleteDevice,
        checkHandle: this.checkBlueTooth
      };
      const data = bluetoothStatus
        ? { ...BlueToothOnData, ...handles }
        : { ...BlueToothOffData, ...handles };
      if (isWifiDevice) {
        return this.renderOldView();
        // data = {
        //   ...WiFiData,
        //   helpHandle: this.openH5WebView,
        //   delHandle: this.deleteDevice,
        //   checkHandle: this.checkWifi
        // };
      }
      return this.renderNewView(data, bluetoothStatus);
    }

    return this.renderOldView();
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: `rgba(0, 0, 0, 0.8)`
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 6,
    transform: [{ translateY: -convert(60) }]
  },
  icon: {
    resizeMode: 'stretch',
    width: convert(121),
    height: convert(81)
  },
  tip: {
    marginTop: convert(14),
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  },
  header: {
    backgroundColor: '#FF9700',
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  headerTitle: {
    marginLeft: convert(5),
    fontSize: convert(20),
    color: '#fff',
    opacity: 1
  },
  row: {
    height: convert(86),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    paddingRight: convert(10),
    paddingLeft: convert(15),
    width: viewWidth * 0.8
  },
  rowContent: {
    flex: 1
  },
  txt: {
    backgroundColor: 'transparent',
    fontSize: convert(12),
    color: '#333',
    opacity: 0.5
  },
  title: {
    fontSize: convert(15),
    opacity: 1,
    marginBottom: convert(2)
  },
});
