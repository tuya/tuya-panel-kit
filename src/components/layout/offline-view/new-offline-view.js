import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  ColorPropType,
  StyleSheet,
  Animated,
  ViewPropTypes,
  View,
  TouchableOpacity,
  Platform,
  Text,
  Image,
  Easing,
} from 'react-native';
import { TYSdk } from '@tuya-rn/tuya-native-kit';
import Motion from '../../motion';
import RefText from '../../TYText';
import Strings from '../../i18n/strings';
import { RatioUtils, CoreUtils } from '../../../utils';
import IconFont from '../../iconfont/svg';

const { convert, winWidth, isIos, isIphoneX } = RatioUtils;
const { get } = CoreUtils;

const TYNative = TYSdk.native;

export default class NewOfflineView extends PureComponent {
  static propTypes = {
    maskColor: ColorPropType,
    onClose: PropTypes.func,
    style: ViewPropTypes.style,
    animatedStyle: ViewPropTypes.style,
    showDeviceImg: PropTypes.bool,
    show: PropTypes.bool,
    onLinkPress: PropTypes.func,
    onHelpPress: PropTypes.func,
    /**
     * @description 判断App RN版本是否为3.21及以上，符合条件才可跳转至配网页面
     */

    isJumpToWifi: PropTypes.bool,
  };

  static defaultProps = {
    maskColor: 'rgba(0, 0, 0, 0.8)',
    onClose: null,
    style: null,
    animatedStyle: null,
    showDeviceImg: true,
    show: true,
    onLinkPress: () => {},
    onHelpPress: () => {},
    isJumpToWifi: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(0),
      show: props.show,
    };
  }

  componentDidMount() {
    this.show();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({
        show: nextProps.show,
      });
    }
  }

  show = () => {
    Animated.spring(this.state.value, {
      toValue: 1,
      useNativeDriver: true,
      showDuration: 250,
      easing: Easing.bezier(0, 0, 0.25, 1),
    }).start();
  };

  hide = () => {
    Animated.spring(this.state.value, {
      toValue: 0,
      useNativeDriver: true,
      hideDuration: 250,
      easing: Easing.bezier(0.42, 0, 1, 1),
    }).start(() => {
      typeof this.props.onClose === 'function' && this.props.onClose();
    });
  };

  cropString = (str, newStrArr) => {
    if (!str) return;
    if (str.indexOf('\n') !== -1) {
      const idx = str.indexOf('\n');
      const indexBefore = str.substring(0, idx);
      newStrArr.push(indexBefore);
      const strAfter = str.substring(idx + 1);
      this.cropString(strAfter, newStrArr);
    } else {
      newStrArr.push(str);
    }
    return newStrArr;
  };

  render() {
    const {
      maskColor,
      style,
      animatedStyle,
      showDeviceImg,
      onLinkPress,
      onHelpPress,
      isJumpToWifi,
    } = this.props;
    const { value, show } = this.state;
    const textLineBefore = Strings.getLang('offline_textLinkBefore');
    const textLink = Strings.getLang('offline_link');
    const textLineAfter = Strings.getLang('offline_textLinkAfter');
    const textLineMore = Strings.getLang('offline_textLinkMore');
    const linkBeforeArr = this.cropString(textLineBefore, []);
    const imgUrl =
      Platform.OS === 'ios' ? get(TYSdk, 'devInfo.iconUrl') : get(TYSdk, 'devInfo.icon');
    const topBarMoreIconName = get(TYSdk, 'devInfo.panelConfig.fun.topBarMoreIconName', 'pen');
    return (
      <View style={[show && styles.modal, style]}>
        <Animated.View
          style={[show && StyleSheet.absoluteFill, { backgroundColor: maskColor, opacity: value }]}
        />
        <Motion.ScaleFadeIn show={show} style={{ flex: 1 }}>
          <Animated.View style={[{ opacity: this.state.value }, animatedStyle]}>
            <View
              style={[
                styles.oldOfflineWrapper,
                {
                  paddingTop: showDeviceImg && !!imgUrl ? convert(24) : convert(32),
                },
              ]}
            >
              {showDeviceImg && !!imgUrl && (
                <Image
                  source={{ uri: imgUrl }}
                  style={{ width: convert(95), height: convert(95) }}
                />
              )}
              <RefText style={styles.offlineTitle}>
                {Strings.getLang('offline_alreadyOffline')}
              </RefText>
              <View style={{ paddingBottom: convert(32) }}>
                <RefText style={[styles.firstLine, { color: '#333', marginBottom: convert(8) }]}>
                  {Strings.getLang('offline_pleaseCheck')}
                </RefText>
                {linkBeforeArr &&
                  linkBeforeArr.length &&
                  linkBeforeArr.map(
                    item => !!item && <RefText key={item} style={styles.firstLine} text={item} />
                  )}
                {!!textLink && (
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.firstLine}>
                      {Strings.getLang('offline_linkFront')}
                      <Text
                        style={[
                          styles.firstLine,
                          isJumpToWifi && {
                            color: '#FF4800',
                            textDecorationLine: 'underline',
                          },
                        ]}
                        onPress={onLinkPress}
                      >
                        {textLink}
                      </Text>
                    </Text>
                  </View>
                )}
                {!!textLineAfter && (
                  <RefText style={[styles.firstLine, { marginBottom: 0 }]} text={textLineAfter} />
                )}
              </View>
              {!!textLineMore && (
                <TouchableOpacity
                  style={styles.confirmTouchable}
                  activeOpacity={0.8}
                  onPress={onHelpPress}
                >
                  <RefText style={styles.confirmText}>
                    {Strings.getLang('offline_moreHelp')}
                  </RefText>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </Motion.ScaleFadeIn>
        <TouchableOpacity
          style={styles.circleBlack}
          activeOpacity={0.8}
          onPress={() => TYNative.back()}
        >
          <IconFont name="backIos" color="#fff" size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moreBlack}
          activeOpacity={0.8}
          onPress={() => TYNative.showDeviceMenu()}
        >
          <IconFont name={topBarMoreIconName} color="#fff" size={18} />
        </TouchableOpacity>
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
    zIndex: 10000,
  },
  circleBlack: {
    width: convert(36),
    height: convert(36),
    borderRadius: convert(18),
    backgroundColor: '#000',
    position: 'absolute',
    top: isIos ? (isIphoneX ? 44 : 20) : 10,
    left: convert(6),
    justifyContent: 'center',
    paddingLeft: convert(9),
  },
  firstLine: {
    fontSize: 12,
    color: '#999',
    marginBottom: 7,
  },
  oldOfflineWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: convert(20),
    justifyContent: 'center',
    alignItems: 'center',
    width: winWidth - convert(32),
  },
  offlineTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 32,
    marginTop: 8,
    color: '#000',
  },
  confirmTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: convert(54),
    width: winWidth - convert(32),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5E5',
  },
  confirmText: {
    fontSize: 16,
    color: '#FF4800',
  },
  moreBlack: {
    width: convert(36),
    height: convert(36),
    borderRadius: convert(18),
    backgroundColor: '#000',
    position: 'absolute',
    top: isIos ? (isIphoneX ? 44 : 20) : 10,
    right: convert(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
