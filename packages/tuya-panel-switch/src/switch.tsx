import React from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
  NativeModules,
} from 'react-native';
import { Rect } from 'react-native-svg';
import IconFont from 'tuya-panel-icon';
import TYText from 'tuya-panel-text';
import LinearGradient from 'tuya-panel-linear-gradient';
import { ISwitchProps, switchDefaults, ISwitchState } from './interface';
import { DEFAULT_SIZE, DEFAULT_GRADIENT_SIZE, EXTRA_WIDTH, EXTRA_HEIGHT } from './constants';

export default class SwitchButton extends React.PureComponent<ISwitchProps, ISwitchState> {
  static defaultProps = switchDefaults;

  constructor(props) {
    super(props);
    const { value, defaultValue, smallThumbStyle } = props;
    this.value = 'value' in props ? value : defaultValue;
    let height;
    if (smallThumbStyle && smallThumbStyle.height) {
      [height] = smallThumbStyle;
    }
    const left = this.calcLeft(this.value);
    this.state = {
      height,
      thumbLeft: new Animated.Value(left),
      leftThumbHeight: new Animated.Value(this.value ? height || 16 : 0.2 * (height || 16)),
      rightThumbHeight: new Animated.Value(this.value ? 0.2 * (height || 16) : height || 16),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!('value' in nextProps) || this.value === nextProps.value) return;
    this.valueChange(nextProps.value);
  }

  onSwitchChange = () => {
    const { disabled, onValueChange, isVibration } = this.props;
    if (disabled) return;
    const newValue = !this.value;
    if (!('value' in this.props)) {
      this.valueChange(newValue);
    }
    if (NativeModules.TYRCTHapticsManager && isVibration) {
      NativeModules.TYRCTHapticsManager.peek();
    }
    onValueChange && onValueChange(newValue);
  };

  get CGSize() {
    if (!!this.props.onText && !!this.props.offText) {
      return { ...DEFAULT_GRADIENT_SIZE, ...this.props.size };
    }

    return { ...DEFAULT_SIZE, ...this.props.size };
  }

  value: boolean;
  _ref: any;
  thumb: any;

  calcLeft = value => {
    const { width, activeSize, margin } = this.CGSize;
    const left = value ? width - (activeSize + margin) : margin;
    return left + EXTRA_WIDTH / 2;
  };

  calcColor = (value: boolean, type?: 'thumb' | 'border') => {
    const { onThumbTintColor, thumbTintColor, onTintColor, tintColor, borderColor } = this.props;
    if (type === 'thumb') {
      const activeColor = onThumbTintColor || thumbTintColor;
      return value ? activeColor : thumbTintColor;
    }
    if (type === 'border') {
      return value ? onTintColor : borderColor;
    }
    return value ? onTintColor : tintColor;
  };

  valueChange = value => {
    const { useNativeDriver, switchType } = this.props;
    const { height } = this.state;
    const color = this.calcColor(value);
    const borderColor = this.calcColor(value, 'border');
    const thumbColor = this.calcColor(value, 'thumb');
    this._ref.setNativeProps({
      style: { backgroundColor: color, borderColor },
    });
    this.thumb.setNativeProps({
      style: { backgroundColor: thumbColor },
    });
    this.value = value;
    const left = this.calcLeft(value);
    this.state.thumbLeft.stopAnimation();
    Animated.spring(this.state.thumbLeft, {
      toValue: left,
      // @ts-ignore
      duration: 200,
      useNativeDriver,
    }).start();
    if (switchType === 'thumbMore') {
      Animated.parallel([
        Animated.spring(this.state.leftThumbHeight, {
          toValue: value ? height || 16 : 0.2 * (height || 16),
          // @ts-ignore
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.spring(this.state.rightThumbHeight, {
          toValue: value ? 0.2 * (height || 16) : height || 16,
          // @ts-ignore
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  renderBackground() {
    const { tintColor, onTintColor } = this.props;
    const { borderRadius, width, height } = this.CGSize;
    const backgroundColor = this.calcColor(this.value);
    const borderColor = this.calcColor(this.value, 'border');
    const wrapperStyle: StyleProp<ViewStyle> = {
      width,
      height,
      borderRadius: borderRadius || (15.5 / 28) * height,
      justifyContent: 'center',
    };
    const color = this.value ? onTintColor : tintColor;
    if (typeof color === 'string') {
      return (
        <View
          style={[
            wrapperStyle,
            {
              backgroundColor,
              borderColor,
            },
          ]}
          ref={ref => {
            this._ref = ref;
          }}
        />
      );
    }
    if (typeof color === 'object') {
      return (
        <View
          style={[
            wrapperStyle,
            {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
            },
          ]}
          ref={ref => {
            this._ref = ref;
          }}
        >
          <LinearGradient style={{ width, height }} stops={color} x1="0%" y1="0%" x2="100%" y2="0%">
            <Rect x="0" y="0" width="100%" height="100%" rx={height / 2} />
          </LinearGradient>
        </View>
      );
    }
    return null;
  }

  render() {
    const { width, height, activeSize, margin } = this.CGSize;
    const {
      accessibilityLabel,
      style,
      disabled,
      onText,
      offText,
      onTextStyle,
      offTextStyle,
      d,
      iconSize,
      iconColor,
      switchType,
    } = this.props;
    const { leftThumbHeight, rightThumbHeight } = this.state;
    const thumbColor = this.calcColor(this.value, 'thumb');
    const containerStyle = [style, disabled && { opacity: 0.8 }];
    const contentStyle: StyleProp<ViewStyle> = {
      width: width + EXTRA_WIDTH,
      height: Math.max(activeSize, height) + EXTRA_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
    };
    const thumbStyle = [
      {
        width: activeSize,
        height: activeSize,
        borderRadius: activeSize / 2,
        position: 'absolute',
        transform: [{ translateX: this.state.thumbLeft }],
        alignSelf: 'flex-start',
        backgroundColor: thumbColor,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 2,
      },
      this.props.thumbStyle,
    ];
    const smallThumbStyle: StyleProp<ViewStyle> = [
      {
        alignItems: 'center',
        justifyContent: 'center',
        width: 3,
        position: 'absolute',
        borderRadius: 1.5,
        backgroundColor: '#FFF',
      },
      this.props.smallThumbStyle,
    ];
    const textOn = onText.length > 3 ? `${onText.substr(0, 2)}...` : onText;
    const textOff = offText.length > 3 ? `${offText.substr(0, 2)}...` : offText;
    return (
      <View style={containerStyle} needsOffscreenAlphaCompositing>
        <TouchableOpacity
          style={contentStyle}
          accessibilityLabel={accessibilityLabel}
          activeOpacity={1}
          onPress={this.onSwitchChange}
        >
          {this.renderBackground()}
          {switchType === 'thumbMore' && (
            <Animated.View
              style={[smallThumbStyle, { left: 3 * margin, height: leftThumbHeight }]}
            />
          )}
          {switchType === 'thumbMore' && (
            <Animated.View
              style={[
                smallThumbStyle,
                {
                  right: 3 * margin,
                  height: rightThumbHeight,
                },
              ]}
            />
          )}
          {!!onText && (
            <TYText
              text={textOn}
              style={[
                {
                  fontSize: 10,
                  color: '#FFF',
                  position: 'absolute',
                  left: 6,
                  fontWeight: '500',
                  opacity: this.value ? 1 : 0,
                },
                onTextStyle,
              ]}
            />
          )}
          {!!offText && (
            <TYText
              text={textOff}
              style={[
                {
                  fontSize: 10,
                  color: '#999',
                  position: 'absolute',
                  right: 6,
                  fontWeight: '500',
                  opacity: this.value ? 0 : 1,
                },
                offTextStyle,
              ]}
            />
          )}
          <Animated.View
            // @ts-ignore
            style={[{ alignItems: 'center', justifyContent: 'center' }, thumbStyle]}
            ref={ref => {
              this.thumb = ref;
            }}
          >
            {!!d && <IconFont d={d} size={iconSize} color={iconColor} />}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}
