import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Platform,
  Text,
  Image,
  Easing,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { Motion, IconFont } from 'tuya-panel-kit';
import { TYSdk } from 'tuya-panel-core';
import { Strings } from 'tuya-panel-i18n';
import TYText from 'tuya-panel-text';

const { convert, winWidth, isIos, isIphoneX } = Utils.RatioUtils;
const { get } = Utils.CoreUtils;

const TYNative = TYSdk.native;

export interface INewOfflineViewProps {
  maskColor?: string;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
  animatedStyle?: StyleProp<ViewStyle>;
  showDeviceImg?: boolean;
  show?: boolean;
  onLinkPress?: () => void;
  onHelpPress?: () => void;
  /**
   * @description 判断App RN版本是否为3.21及以上，符合条件才可跳转至配网页面
   */

  isJumpToWifi?: boolean;
  // wifi 离线的时候用户不想要重新连接跳转
  reconnectTextStyle?: StyleProp<TextStyle>;
}

export interface INewOfflineViewState {
  value: Animated.Value;
  show: boolean;
}

export default class NewOfflineView extends PureComponent<
  INewOfflineViewProps,
  INewOfflineViewState
> {
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
    reconnectTextStyle: null,
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
      // @ts-ignore
      showDuration: 250,
      easing: Easing.bezier(0, 0, 0.25, 1),
    }).start();
  };

  hide = () => {
    Animated.spring(this.state.value, {
      toValue: 0,
      useNativeDriver: true,
      // @ts-ignore
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
      reconnectTextStyle,
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
              <TYText style={styles.offlineTitle}>
                {Strings.getLang('offline_alreadyOffline')}
              </TYText>
              <View style={{ paddingBottom: convert(32) }}>
                <TYText style={[styles.firstLine, { color: '#333', marginBottom: convert(8) }]}>
                  {Strings.getLang('offline_pleaseCheck')}
                </TYText>
                {linkBeforeArr &&
                  linkBeforeArr.length &&
                  linkBeforeArr.map(
                    item => !!item && <TYText key={item} style={styles.firstLine} text={item} />
                  )}
                {!!textLink && (
                  <View style={{ flexDirection: 'row' }}>
                    <TYText style={styles.firstLine}>
                      {Strings.getLang('offline_linkFront')}
                      <Text
                        style={[
                          styles.firstLine,
                          isJumpToWifi && {
                            color: '#FF4800',
                            textDecorationLine: 'underline',
                          },
                          reconnectTextStyle,
                        ]}
                        onPress={onLinkPress}
                      >
                        {textLink}
                      </Text>
                    </TYText>
                  </View>
                )}
                {!!textLineAfter && (
                  <TYText style={[styles.firstLine, { marginBottom: 0 }]} text={textLineAfter} />
                )}
              </View>
              {!!textLineMore && (
                <TouchableOpacity
                  style={styles.confirmTouchable}
                  activeOpacity={0.8}
                  onPress={onHelpPress}
                >
                  <TYText style={styles.confirmText}>{Strings.getLang('offline_moreHelp')}</TYText>
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
  circleBlack: {
    backgroundColor: '#000',
    borderRadius: convert(18),
    height: convert(36),
    justifyContent: 'center',
    left: convert(6),
    paddingLeft: convert(9),
    position: 'absolute',
    top: isIos ? (isIphoneX ? 44 : 20) : 10,
    width: convert(36),
  },
  confirmText: {
    color: '#FF4800',
    fontSize: 16,
  },
  confirmTouchable: {
    alignItems: 'center',
    borderTopColor: '#E5E5E5',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: convert(54),
    justifyContent: 'center',
    width: winWidth - convert(32),
  },
  firstLine: {
    color: '#999',
    fontSize: 12,
    marginBottom: 7,
  },
  modal: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10000,
  },
  moreBlack: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: convert(18),
    height: convert(36),
    justifyContent: 'center',
    position: 'absolute',
    right: convert(6),
    top: isIos ? (isIphoneX ? 44 : 20) : 10,
    width: convert(36),
  },
  offlineTitle: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 32,
    marginTop: 8,
  },
  oldOfflineWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: convert(20),
    width: winWidth - convert(32),
  },
});
