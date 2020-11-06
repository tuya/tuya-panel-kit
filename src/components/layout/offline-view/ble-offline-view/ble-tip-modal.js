import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity, ColorPropType, StyleSheet, Animated } from 'react-native';
import TopBar from '../../../layout/topbar';
import TYText from '../../../TYText';
import Strings from '../../../i18n/strings';
import { RatioUtils } from '../../../../utils';

const { convertX: cx, isIphoneX } = RatioUtils;

const Res = {
  bleShare: require('../../../res/bleShare.png'),
  bleSystem: require('../../../res/bleSystem.png'),
};

export default class BleTipModal extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    maskColor: ColorPropType,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    maskColor: 'rgba(0, 0, 0, 0.4)',
    onClose: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(0),
      isMultiLine: false,
    };
  }

  componentDidMount() {
    this.show();
  }

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
    const { disabled, maskColor } = this.props;
    const { value, isMultiLine } = this.state;
    return (
      <TouchableOpacity
        style={styles.modal}
        activeOpacity={1}
        disabled={disabled}
        onPress={this.hide}
      >
        <Animated.View
          style={[StyleSheet.absoluteFill, { backgroundColor: maskColor, opacity: value }]}
        />
        <Animated.View
          onStartShouldSetResponder={() => true}
          style={[
            styles.tipModal,
            {
              transform: [
                {
                  translateY: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.tipRow,
              {
                borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                borderBottomWidth: 1,
              },
            ]}
          >
            <View style={[styles.flex, { marginLeft: cx(16) }]}>
              <TYText style={styles.tipText} text={Strings.getLang('openBleShare')} />
              <TYText
                style={[styles.tipText, styles.tipParagraph]}
                text={Strings.getLang('openBleShareStep')}
              />
            </View>
            <View>
              <Image source={Res.bleShare} />
              <TYText
                style={[styles.absoluteText, isMultiLine && { top: cx(56) }]}
                text={Strings.getLang('bluetoothShare')}
                numberOfLines={2}
                onLayout={({ nativeEvent }) => {
                  const { height } = nativeEvent.layout;
                  this.setState({ isMultiLine: height >= cx(23) });
                }}
              />
            </View>
          </View>
          <View style={styles.tipRow}>
            <View style={[styles.flex, { marginLeft: cx(16) }]}>
              <TYText style={styles.tipText} text={Strings.getLang('openBle')} />
            </View>
            <Image source={Res.bleSystem} />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: TopBar.height,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
  },

  flex: {
    flex: 1,
  },

  tipModal: {
    alignSelf: 'center',
    marginBottom: isIphoneX ? cx(32) : cx(12),
    width: cx(351),
    height: cx(336),
    borderRadius: cx(16),
    backgroundColor: '#f0f0f0',
  },

  tipRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tipText: {
    fontWeight: '500',
    fontSize: cx(16),
    color: '#333',
    backgroundColor: 'transparent',
  },

  tipParagraph: {
    marginTop: cx(4),
    fontSize: cx(12),
    color: '#999',
  },

  absoluteText: {
    position: 'absolute',
    left: cx(40),
    top: cx(61),
    fontSize: cx(11),
    width: cx(112),
    color: '#22242C',
    backgroundColor: 'transparent',
  },
});
