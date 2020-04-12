import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  ColorPropType,
  StyleSheet,
  Animated,
  ViewPropTypes,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { RatioUtils, CoreUtils } from '../../../utils';
import TYSdk from '../../../TYNativeApi';
import TYText from '../../TYText';
import Tips from '../../tips';
import Strings from '../../../i18n/strings';

const { convertX: cx } = RatioUtils;

const { height } = Dimensions.get('screen');

const { compareVersion } = CoreUtils;
const TYNative = TYSdk.native;
const Res = {
  close: require('../../res/x.png'),
  wifi: require('../../res/wifi.png'),
};

const requireRnVersion = '5.24';

export default class DetectNetModal extends PureComponent {
  static propTypes = {
    maskColor: ColorPropType,
    onClose: PropTypes.func,
    style: ViewPropTypes.style,
    animatedStyle: ViewPropTypes.style,
  };

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
    TYSdk.device.getDeviceInfo().then(result => {
      if (!result) return;
      const { devId } = result;
      TYNative.jumpTo(`tuyaSmart://dev_network_check?devId=${devId}`);
    });
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
    const { appRnVersion } = TYNative.mobileInfo;
    const isRequire = compareVersion(appRnVersion, requireRnVersion);
    return (
      <View style={[styles.modal, style]}>
        <Animated.View
          style={[StyleSheet.absoluteFill, { backgroundColor: maskColor, opacity: value }]}
        />
        <Animated.View
          style={[{ marginTop: (height - 328) / 2, opacity: this.state.value }, animatedStyle]}
        >
          <Tips show={true} bgColor="#fff" showCorner={false} contentStyle={{ borderRadius: 8 }}>
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

                  {isRequire !== -1 && (
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
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  signal: {
    width: cx(268),
    borderRadius: cx(16),
    backgroundColor: '#fff',
    paddingHorizontal: cx(7),
    paddingVertical: cx(17),
  },
  closeImage: {
    width: cx(28),
    height: cx(28),
    borderRadius: cx(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: cx(4),
    right: cx(0),
  },
  image: {
    width: cx(28),
    height: cx(28),
  },
  signalWifi: {
    width: cx(61),
    height: cx(53),
    marginTop: cx(15),
    marginBottom: cx(12),
  },
  signalContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: cx(13),
    color: '#81828B',
    lineHeight: cx(20),
  },
});
