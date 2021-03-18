import React from 'react';
import { View, PanResponder, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { RatioUtils } from '../../utils';
import Divider from '../divider';
import TYText from '../TYText';

const formatPercent = (value, { min = 0, max = 1000, minPercent = 0 } = {}) => {
  return Math.round(((100 - minPercent) * (value - min)) / (max - min) + minPercent);
};

const { convertX: cx } = RatioUtils;

export const inRangeNumber = (val, min, max) => {
  return Math.max(Math.min(val, max), min);
};

const defaultProps = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  // 左边和右边的值
  values: [0, 50],

  // 强调色
  activeColor: 'blue',

  // 禁用
  disabled: false,

  // 最小值
  min: 10,

  // 最大值
  max: 1000,

  // minValue的百分比范围
  minValuePercentRange: null,

  // maxValue的百分比范围
  maxValuePercentRange: null,

  // 禁用minValue调节
  minDisabled: false,

  // 禁用maxValue调节
  maxDisabled: false,
};

export default class SliderWithLine extends React.Component {
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.ItemSpaceW = this.WIDTH / 12;
    this.left = new Animated.Value(this.toVal(props.values[0]));
    this.right = new Animated.Value(this.toVal(props.values[1]));
    this.leftVal = 0;
    this.rightVal = 100;
    this.left.addListener(({ value }) => (this.leftVal = value));
    this.right.addListener(({ value }) => (this.rightVal = value));
    this.leftNegative = Animated.multiply(this.left, new Animated.Value(-1));
    this.width = Animated.add(this.right, this.leftNegative);

    this.createPanResponder();

    this.initSliderPosition(props);
  }

  get WIDTH() {
    if (this.props && this.props.style && this.props.style.width) {
      return +this.props.style.width;
    }
    return +330;
  }

  get HEIGHT() {
    if (this.props && this.props.style && this.props.style.height) {
      return +this.props.style.height;
    }
    return 60;
  }

  initSliderPosition(props) {
    const [minValue, maxValue] = props.values;
    const leftVal = this.toVal(minValue);
    const rightVal = this.toVal(maxValue);
    this.left.setValue(leftVal);
    this.right.setValue(rightVal);
  }

  createPanResponder() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !this.props.disabled,
      onStartShouldSetPanResponderCapture: () => !this.props.disabled,
      onPanResponderGrant: evt => {
        // 开始手势操作，确定点击位置。
        const locationX = evt.nativeEvent.locationX;
        const { leftVal: leftValue, rightVal: rightValue } = this;
        let direction = this.props.minDisabled ? null : 'min';
        if (
          !this.props.maxDisabled &&
          Math.abs(locationX - leftValue) > Math.abs(locationX - rightValue)
        ) {
          direction = 'max';
        }
        this.direction = direction;
        this.cacheVal = direction === 'min' ? leftValue : rightValue;
        this.props.onMoveStart && this.props.onMoveStart();
        this.moving = true;
      },
      onPanResponderMove: (_, gestureState) => {
        // 正在滑动
        const { direction } = this;
        const { dx } = gestureState;

        let newVal = this.cacheVal + dx;
        newVal = Math.min(Math.max(0, newVal), this.WIDTH);

        if (direction === 'min') {
          if (this.props.minValuePercentRange && this.props.minValuePercentRange.length === 2) {
            const percent = formatPercent(newVal, {
              min: 0,
              max: this.WIDTH,
            });
            // @ts-ignore
            const fixPercent = inRangeNumber(percent, ...this.props.minValuePercentRange);
            newVal = (this.WIDTH * fixPercent) / 100;
          }
          newVal = inRangeNumber(newVal, 0, this.rightVal - 1);
          this.left.setValue(newVal);
        } else {
          if (this.props.maxValuePercentRange && this.props.maxValuePercentRange.length === 2) {
            const percent = formatPercent(newVal, {
              min: 0,
              max: this.WIDTH,
            });
            // @ts-ignore
            const fixPercent = inRangeNumber(percent, ...this.props.maxValuePercentRange);
            newVal = (this.WIDTH * fixPercent) / 100;
          }
          newVal = inRangeNumber(
            newVal,
            this.leftVal + (this.props.minDisabled ? 0 : 1),
            this.WIDTH
          );
          this.right.setValue(newVal);
        }
        this.onValueChange();
      },
      onPanResponderTerminate: this.releaseMove,
      onPanResponderRelease: this.releaseMove,
      onPanResponderTerminationRequest: () => false,
    });
  }

  componentWillReceiveProps(nextProps: Readonly<IProps>) {
    if (this.moving) return;
    this.initSliderPosition(nextProps);
  }

  toValue = val => {
    const { min, max } = this.props;
    let value;
    value = (val / this.WIDTH) * (max - min) + min;
    value = Math.round(value);
    value = Math.min(max, Math.max(min, value));
    return value;
  };

  toVal = value => {
    const { min, max } = this.props;
    const percent = formatPercent(value, { min, max });
    const val = (this.WIDTH * percent) / 100;
    return val;
  };

  calcValues = () => {
    const { min, max } = this.props;
    const { leftVal, rightVal } = this;
    const rightValue = this.toValue(rightVal);
    const leftValue = this.toValue(leftVal);
    const data = {
      min: { value: leftValue, percent: formatPercent(leftValue, { min, max }) },
      max: { value: rightValue, percent: formatPercent(rightValue, { min, max }) },
    };
    return data;
  };

  releaseMove = () => {
    setTimeout(() => {
      this.moving = false;
    }, 500);
    if (!this.props.onMoveRelease) return;
    this.props.onMoveRelease(this.calcValues());
  };

  onValueChange = () => {
    if (!this.props.onValueChange) return;
    this.props.onValueChange(this.calcValues());
  };

  renderExtraInfo = (style, color) => {
    const height = this.HEIGHT;
    return (
      <Animated.View style={[{ left: 0, width: this.WIDTH, height, position: 'absolute' }, style]}>
        <View style={[styles.percentTextWrap, { height, width: this.WIDTH }]}>
          <TYText style={[styles.percentText, { left: cx(8), color }]}>1%</TYText>
          <TYText style={[styles.percentText, { right: cx(8), color }]}>100%</TYText>
        </View>
        {new Array(9).fill(0).map((_, index) => {
          const _left = (index + 2) * this.ItemSpaceW;
          const _width = StyleSheet.hairlineWidth * 2;
          return (
            <Divider
              key={index}
              width={_width}
              height={cx(14)}
              color={color}
              style={[styles.dividerStyle, { top: this.HEIGHT / 2 - cx(14) / 2, left: _left }]}
            />
          );
        })}
      </Animated.View>
    );
  };

  render() {
    const { style, activeColor } = this.props;
    const innerStyle = [styles.inner, { backgroundColor: activeColor }];
    return (
      <View style={[style, styles.wrap, { opacity: this.props.disabled ? 0.7 : 1 }]}>
        {this.renderExtraInfo({}, '#000')}
        <Animated.View
          style={[
            innerStyle,
            {
              width: this.width,
              left: this.left,
            },
          ]}
        >
          {this.renderExtraInfo({ left: this.leftNegative }, '#fff')}
        </Animated.View>
        <View style={[style, styles.wrap, styles.touchArea]} {...this._panResponder.panHandlers} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  inner: {
    height: '100%',
    borderRadius: cx(16),
  },
  touchArea: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  percentTextWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentText: {
    opacity: 0.5,
    fontSize: cx(12),
    position: 'absolute',
  },
  dividerStyle: {
    position: 'absolute',
    borderRadius: cx(0.5),
    opacity: 0.5,
  },
});
