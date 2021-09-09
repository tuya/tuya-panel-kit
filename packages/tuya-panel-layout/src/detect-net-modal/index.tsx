import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  View,
  Image,
  Dimensions,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { TYSdk } from 'tuya-panel-core';
import { Tips } from 'tuya-panel-kit';
import { Utils } from 'tuya-panel-utils';
import { Strings } from 'tuya-panel-i18n';
import TYText from 'tuya-panel-text';

const { convertX: cx } = Utils.RatioUtils;

const { height } = Dimensions.get('screen');

const TYNative = TYSdk.native;
const TYMobile = TYSdk.mobile;

const { compareVersion, get } = Utils.CoreUtils;

const Res = {
  close: require('../res/x.png'),
  wifi: require('../res/wifi.png'),
};

const requireRnVersion = '5.24';

export interface IDetectNetModalProps {
  style: StyleProp<ViewStyle>;
  animatedStyle: StyleProp<ViewStyle>;
  maskColor: string;
  onClose: () => void;
}

export interface IDetectNetModalState {
  value: Animated.Value;
}

export default class DetectNetModal extends PureComponent<
  IDetectNetModalProps,
  IDetectNetModalState
> {
  static defaultProps = {
    maskColor: 'rgba(51, 51, 51, 0.8)',
    onClose: null,
    style: null,
    animatedStyle: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.show();
  }

  handleToDetect = () => {
    const { devId } = TYSdk.devInfo;
    TYMobile.jumpTo(`tuyaSmart://dev_network_check?devId=${devId}`);
  };

  show = () => {
    Animated.spring(this.state.value, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  hide = () => {
    Animated.spring(this.state.value, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      typeof this.props.onClose === 'function' && this.props.onClose();
    });
  };

  render() {
    const { maskColor, style, animatedStyle } = this.props;
    const { value } = this.state;
    const appRnVersion = get(TYNative, 'mobileInfo.appRnVersion');
    const isGreater = appRnVersion && compareVersion(appRnVersion, requireRnVersion);
    const isShow = isGreater === 0 || isGreater === 1;
    return (
      <View style={[styles.modal, style]}>
        <Animated.View
          style={[StyleSheet.absoluteFill, { backgroundColor: maskColor, opacity: value }]}
        />
        <Animated.View
          style={[{ marginTop: (height - 328) / 2, opacity: this.state.value }, animatedStyle]}
        >
          <Tips show bgColor="#fff" showCorner={false} contentStyle={{ borderRadius: 8 }}>
            <View style={styles.signal}>
              <TouchableOpacity style={styles.closeImage} activeOpacity={0.8} onPress={this.hide}>
                <Image source={Res.close} style={styles.image} />
              </TouchableOpacity>
              <View style={styles.signalContent}>
                <Image source={Res.wifi} style={styles.signalWifi} />
                <TYText
                  text={Strings.getLang('wifiBadTitle')}
                  style={{ fontSize: 17, fontWeight: 'bold', color: '#22242C' }}
                />
                <View style={{ marginTop: cx(38), alignItems: 'flex-start' }}>
                  <TYText text={Strings.getLang('detectPlease')} style={styles.text} />
                  <TYText text={Strings.getLang('internetAccess')} style={styles.text} />
                  <TYText text={Strings.getLang('obstructions')} style={styles.text} />

                  {isShow && (
                    <TouchableOpacity activeOpacity={0.8} onPress={this.handleToDetect}>
                      <TYText
                        text={Strings.getLang('retest')}
                        style={[styles.text, { color: '#4A90E2', textDecorationLine: 'underline' }]}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </Tips>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closeImage: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: cx(14),
    height: cx(28),
    justifyContent: 'center',
    position: 'absolute',
    right: cx(0),
    top: cx(4),
    width: cx(28),
  },
  image: {
    height: cx(28),
    width: cx(28),
  },
  modal: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  signal: {
    backgroundColor: '#fff',
    borderRadius: cx(16),
    paddingHorizontal: cx(7),
    paddingVertical: cx(17),
    width: cx(268),
  },
  signalContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signalWifi: {
    height: cx(53),
    marginBottom: cx(12),
    marginTop: cx(15),
    width: cx(61),
  },
  text: {
    color: '#81828B',
    fontSize: cx(13),
    lineHeight: cx(20),
  },
});
