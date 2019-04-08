/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity, View, ViewPropTypes } from 'react-native';

class SwitchButton extends React.PureComponent {
  static propTypes = {
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
  };
  static defaultProps = {
    defaultValue: true,
    disabled: false,
    onTintColor: '#44DB5E',
    thumbTintColor: '#fff',
    tintColor: '#E5E5E5',
    borderColor: '#E5E5E5',
  };
  constructor(props) {
    super(props);
    this.value = 'value' in props ? props.value : props.defaultValue;
    this.CGSize = { width: 52, height: 32, activeSize: 28, margin: 2, ...props.size };
    const left = this.calcLeft(this.value);
    this.state = {
      thumbLeft: new Animated.Value(left),
    };
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
    return left;
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
    const color = this.calcColor(value);
    const borderColor = this.calcColor(value, 'border');
    const thumbColor = this.calcColor(this.value, 'thumb');
    this._ref.setNativeProps({
      style: { backgroundColor: color, borderColor },
    });
    this.thumb.setNativeProps({
      style: { backgroundColor: thumbColor },
    });
    this.value = value;
    const left = this.calcLeft(value);
    this.state.thumbLeft.stopAnimation();
    Animated.spring(this.state.thumbLeft, { toValue: left, duration: 200 }).start();
  };

  render() {
    const { style, disabled } = this.props;
    const thumbColor = this.calcColor(this.value, 'thumb');
    const backgroundColor = this.calcColor(this.value);
    const borderColor = this.calcColor(this.value, 'border');
    const containerStyle = [style, disabled && { opacity: 0.8 }];
    const wrapperStyle = {
      backgroundColor,
      width: this.CGSize.width,
      height: this.CGSize.height,
      borderRadius: this.CGSize.height / 2,
      justifyContent: 'center',
      // borderWidth: 1.5,
      borderColor,
    };
    const thumbStyle = {
      width: this.CGSize.activeSize,
      height: this.CGSize.activeSize,
      borderRadius: this.CGSize.activeSize / 2,
      position: 'absolute',
      left: this.state.thumbLeft,
      backgroundColor: thumbColor,
    };
    return (
      <View style={containerStyle}>
        <TouchableOpacity
          ref={ref => {
            this._ref = ref;
          }}
          activeOpacity={0.8}
          onPress={this.onSwitchChange}
          style={wrapperStyle}
        >
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
export default SwitchButton;
