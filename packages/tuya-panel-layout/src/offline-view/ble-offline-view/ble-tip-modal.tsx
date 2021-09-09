import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import TopBar from 'tuya-panel-topbar';
import { Strings } from 'tuya-panel-core';
import { Utils } from 'tuya-panel-utils';
import TYText from 'tuya-panel-text';

const { convertX: cx, isIphoneX } = Utils.RatioUtils;

const Res = {
  bleShare: require('../../res/bleShare.png'),
  bleSystem: require('../../res/bleSystem.png'),
};

export interface IBleOfflineModalProps {
  disabled?: boolean;
  maskColor?: string;
  onClose?: () => void;
}

export interface IBleTipModalState {
  value: Animated.Value;
  isMultiLine: boolean;
}

export default class BleTipModal extends PureComponent<IBleOfflineModalProps, IBleTipModalState> {
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
  absoluteText: {
    backgroundColor: 'transparent',
    color: '#22242C',
    fontSize: cx(11),
    left: cx(40),
    position: 'absolute',
    top: cx(61),
    width: cx(112),
  },

  flex: {
    flex: 1,
  },

  modal: {
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: TopBar.height,
  },

  tipModal: {
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: cx(16),
    height: cx(336),
    marginBottom: isIphoneX ? cx(32) : cx(12),
    width: cx(351),
  },

  tipParagraph: {
    color: '#999',
    fontSize: cx(12),
    marginTop: cx(4),
  },

  tipRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tipText: {
    backgroundColor: 'transparent',
    color: '#333',
    fontSize: cx(16),
    fontWeight: '500',
  },
});
