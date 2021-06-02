/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity, View, ViewPropTypes, Text } from 'react-native';
import { Rect } from 'react-native-svg';
import LinearGradient from '../gradient/linear-gradient';
import IconFont from '../iconfont';
import TYText from '../TYText';

const DEFAULT_SIZE = {
  width: 48,
  height: 28,
  activeSize: 24,
  margin: 2,
};

const DEFAULT_GRADIENT_SIZE = {
  width: 57,
  height: 28,
  activeSize: 24,
  margin: 2,
};

// for android，默认overflow: hidden会导致阴影被裁，效果很差;
const EXTRA_WIDTH = 2;
const EXTRA_HEIGHT = 3;

export default class SwitchButton extends React.PureComponent {
  static propTypes = {
    /**
     * 测试标志
     */
    accessibilityLabel: PropTypes.string,
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * 是否禁用
     */
    disabled: PropTypes.bool,
    /**
     * 当前选中的值，设置了该属性即为受控组件
     */
    value: PropTypes.bool,
    /**
     * 默认选中的值
     */
    defaultValue: PropTypes.bool,
    /**
     * 设置switchButton的大小
     */
    size: PropTypes.object,
    /**
     * 改变switchButton值时执行此回调
     */
    onValueChange: PropTypes.func,
    /**
     * 设置当switchButton的value为false时背景颜色
     */
    tintColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * 设置当switchButton的value为true时颜色
     */
    onTintColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * 设置当switchButton的value为false时thumb颜色
     */
    thumbTintColor: PropTypes.string,
    /**
     * 设置当switchButton的value为true时thumb颜色，若没有设置则为thumbTintColor的值
     */
    onThumbTintColor: PropTypes.string,
    /**
     * 设置当switchButton的value为false时边框颜色
     *当switchButton的value为true时边框颜色等于onTintColor
     */
    borderColor: PropTypes.string,
    /**
     * 指定thumb的样式
     */
    thumbStyle: ViewPropTypes.style,
    /**
     * 是否使用Native Driver
     */
    useNativeDriver: PropTypes.bool,
    /**
     * switchButton的value值为false时左侧显示的字符,超过3个字符则显示显示2个字符，其余显示…
     */
    onText: PropTypes.string,
    /**
     * switchButton的value值为true时右侧显示的字符，超过3个字符则显示显示2个字符，其余显示…
     */
    offText: PropTypes.string,
    /**
     * switchButton的value值为false时左侧显示的字符样式
     */
    onTextStyle: Text.propTypes.style,
    /**
     * switchButton的value值为true时右侧显示的字符样式
     */
    offTextStyle: Text.propTypes.style,
    /**
     * 滑块上的图标路径
     */
    d: PropTypes.string,
    /**
     * 滑块上的图标大小
     */
    iconSize: PropTypes.number,
    /**
     * 滑块上的图标颜色
     */
    iconColor: PropTypes.string,
    /**
     * Switch 开关类型，默认不传，特殊情况传值 thumbMore
     */
    switchType: PropTypes.string,
    /**
     * 当 switchType = 'thumbMore' 时，开关左右定位的滑块样式
     */
    smallThumbStyle: ViewPropTypes.style,
  };
  static defaultProps = {
    accessibilityLabel: 'SwitchButton',
    defaultValue: true,
    disabled: false,
    onTintColor: '#44DB5E',
    thumbTintColor: '#fff',
    tintColor: '#e5e5e5',
    borderColor: '#e5e5e5',
    thumbStyle: null,
    useNativeDriver: true,
    onText: '',
    offText: '',
    onTextStyle: null,
    offTextStyle: null,
    d: null,
    iconSize: 18,
    iconColor: null,
    switchType: null,
    smallThumbStyle: {},
  };
  constructor(props) {
    super(props);
    this.value = 'value' in props ? props.value : props.defaultValue;
    const { height } = props.smallThumbStyle;
    const left = this.calcLeft(this.value);
    this.state = {
      thumbLeft: new Animated.Value(left),
      leftThumbHeight: new Animated.Value(this.value ? height || 16 : 0.2 * (height || 16)),
      rightThumbHeight: new Animated.Value(this.value ? 0.2 * (height || 16) : height || 16),
    };
  }

  // eslint-disable-next-line react/sort-comp
  get CGSize() {
    if (!!this.props.onText && !!this.props.offText) {
      return { ...DEFAULT_GRADIENT_SIZE, ...this.props.size };
    }

    return { ...DEFAULT_SIZE, ...this.props.size };
  }

  componentWillReceiveProps(nextProps) {
    if (!('value' in nextProps) || this.value === nextProps.value) return;
    this.valueChange(nextProps.value);
  }

  onSwitchChange = () => {
    const { disabled, onValueChange } = this.props;
    if (disabled) return;
    const newValue = !this.value;
    if (!('value' in this.props)) {
      this.valueChange(newValue);
    }
    onValueChange && onValueChange(newValue);
  };

  calcLeft = value => {
    const { width, activeSize, margin } = this.CGSize;
    const left = value ? width - (activeSize + margin) : margin;
    return left + EXTRA_WIDTH / 2;
  };

  calcColor = (value, type) => {
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
    const { useNativeDriver, switchType, smallThumbStyle } = this.props;
    const { height } = smallThumbStyle;
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
      duration: 200,
      useNativeDriver,
    }).start();
    if (switchType === 'thumbMore') {
      Animated.parallel([
        Animated.spring(this.state.leftThumbHeight, {
          toValue: value ? height || 16 : 0.2 * (height || 16),
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.spring(this.state.rightThumbHeight, {
          toValue: value ? 0.2 * (height || 16) : height || 16,
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
    const wrapperStyle = {
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
    } else if (typeof color === 'object') {
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
    const contentStyle = {
      width: width + EXTRA_WIDTH,
      height: Math.max(activeSize, height) + EXTRA_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
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
    const smallThumbStyle = [
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
      <View style={containerStyle} needsOffscreenAlphaCompositing={true}>
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
