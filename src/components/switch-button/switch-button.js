/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity, View, ViewPropTypes } from 'react-native';

const DEFAULT_SIZE = {
  width: 50,
  height: 28,
  activeSize: 26,
  margin: 1,
};

// for android，默认overflow: hidden会导致阴影被裁，效果很差;
const EXTRA_WIDTH = 2;
const EXTRA_HEIGHT = 3;

export default class SwitchButton extends React.PureComponent {
  static propTypes = {
    accessibilityLabel: PropTypes.string,
    style: ViewPropTypes.style,
    disabled: PropTypes.bool,
    value: PropTypes.bool,
    defaultValue: PropTypes.bool,
    size: PropTypes.object,
    onValueChange: PropTypes.func,
    tintColor: PropTypes.string,
    onTintColor: PropTypes.string,
    thumbTintColor: PropTypes.string,
    onThumbTintColor: PropTypes.string,
    borderColor: PropTypes.string,
    thumbStyle: ViewPropTypes.style,
    useNativeDriver: PropTypes.bool,
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
  };
  constructor(props) {
    super(props);
    this.value = 'value' in props ? props.value : props.defaultValue;
    const left = this.calcLeft(this.value);
    this.state = {
      thumbLeft: new Animated.Value(left),
    };
  }

  // eslint-disable-next-line react/sort-comp
  get CGSize() {
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
    const { useNativeDriver } = this.props;
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
  };

  render() {
    const { width, height, activeSize } = this.CGSize;
    const { accessibilityLabel, style, disabled } = this.props;
    const thumbColor = this.calcColor(this.value, 'thumb');
    const backgroundColor = this.calcColor(this.value);
    const borderColor = this.calcColor(this.value, 'border');
    const containerStyle = [style, disabled && { opacity: 0.8 }];
    const contentStyle = {
      width: width + EXTRA_WIDTH,
      height: Math.max(activeSize, height) + EXTRA_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    };
    const wrapperStyle = {
      backgroundColor,
      width,
      height,
      borderRadius: height / 2,
      justifyContent: 'center',
      // borderWidth: 1.5,
      borderColor,
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
    return (
      <View style={containerStyle}>
        <TouchableOpacity
          style={contentStyle}
          accessibilityLabel={accessibilityLabel}
          activeOpacity={1}
          onPress={this.onSwitchChange}
        >
          <View
            style={wrapperStyle}
            ref={ref => {
              this._ref = ref;
            }}
          />
          <Animated.View
            style={thumbStyle}
            ref={ref => {
              this.thumb = ref;
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
