import React from 'react';
import { View, PanResponder, StyleSheet, Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { RatioUtils } from '../../utils';
import Divider from '../divider';
import TYText from '../TYText';

const { convertX: cx } = RatioUtils;

export default class SliderWithLine extends React.Component {
  static propTypes = {
    /**
     * @description 最大具体值
     */
    maxValue: PropTypes.number,
    /**
     * @description 最小具体值
     */
    minValue: PropTypes.number,
    /**
     * @description 是否为水平方向
     */
    horizontal: PropTypes.bool,
    /**
     * @description 步长
     */
    stepValue: PropTypes.number,
    /**
     * 触摸轨道是否可以更改值
     */
    canTouchTrack: PropTypes.bool,
    /**
     * @description 禁用滑动条滑动
     */
    disabled: PropTypes.bool,
    /**
     * @description 刻度宽度
     */
    nounWidth: PropTypes.number,
    /**
     * @description 刻度高度
     */
    nounHeight: PropTypes.number,
    /**
     * @description 刻度圆角
     */
    nounRadius: PropTypes.number,
    /**
     * @description 刻度 && 文字颜色
     */
    nounColor: PropTypes.string,
    /**
     * @description 文字大小
     */
    fontSize: PropTypes.number,
    /**
     * @description 激活刻度 && 文字颜色
     */
    activeNounColor: PropTypes.string,
    /**
     * @description 滑动条宽度
     */
    width: PropTypes.number,
    /**
     * @description 滑动条高度
     */
    height: PropTypes.number,
    /**
     * @description 滑动条圆角
     */
    borderRadius: PropTypes.number,
    /**
     * @description 滑动条背景色
     */
    backgroundColor: PropTypes.string,
    /**
     * @description 滑动条激活背景色
     */
    activeBackgroundColor: PropTypes.string,
    /**
     * @description 刻度数量
     */
    nounNumber: PropTypes.number,
    /**
     * @description 滑动开始文案
     */
    startText: PropTypes.string,
    /**
     * @description 滑动结束文案
     */
    endText: PropTypes.string,
    /**
     * @description 禁用最小值滑动
     */
    minDisabled: PropTypes.bool,
    /**
     * @description 禁用最大值滑动
     */
    maxDisabled: PropTypes.bool,
    /**
     * @description 最小值
     */
    min: PropTypes.number,
    /**
     * @description 最大值
     */
    max: PropTypes.number,
    /**
     * @description 开始滑动回调
     */
    onSlidingStart: PropTypes.func,
    /**
     * @description 滑动过程中回调
     */
    onValueChange: PropTypes.func,
    /**
     * @description 结束滑动回调
     */
    onSlidingComplete: PropTypes.func,
    /**
     * @description 刻度滑动条样式
     */
    style: ViewPropTypes.style,
  };
  static defaultProps = {
    maxValue: 50,
    minValue: 0,
    horizontal: true,
    nounColor: '#000',
    disabled: false,
    stepValue: 0,
    min: 0,
    max: 100,
    canTouchTrack: true,
    minDisabled: true,
    maxDisabled: false,
    width: cx(327),
    height: cx(60),
    borderRadius: cx(16),
    backgroundColor: '#FFF',
    activeBackgroundColor: '#57BCFB',
    activeNounColor: '#FFF',
    nounNumber: 9,
    nounWidth: cx(1),
    nounHeight: cx(14),
    nounRadius: cx(0.5),
    fontSize: cx(12),
    startText: '0%',
    endText: '100%',
    onSlidingStart: null,
    onValueChange: null,
    onSlidingComplete: null,
    style: null,
  };

  constructor(props) {
    super(props);
    this.left = new Animated.Value(this._handleValueToWidth(props.minValue));
    this.right = new Animated.Value(this._handleValueToWidth(props.maxValue));
    this.leftVal = 0;
    this.rightVal = 100;
    this.left.addListener(({ value }) => (this.leftVal = value));
    this.right.addListener(({ value }) => (this.rightVal = value));
    this.leftNegative = Animated.multiply(this.left, new Animated.Value(-1));
    this.width = Animated.add(this.right, this.leftNegative);
    this.createPanResponder();
    this.initSliderPosition(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.moving) return;
    this.initSliderPosition(nextProps);
  }

  get style() {
    const { width, height, borderRadius, backgroundColor } = this.props;
    return {
      width,
      height,
      borderRadius,
      backgroundColor,
    };
  }

  initSliderPosition(props) {
    const { minValue, maxValue } = props;
    const leftVal = this._handleValueToWidth(minValue);
    const rightVal = this._handleValueToWidth(maxValue);
    this.left.setValue(leftVal);
    this.right.setValue(rightVal);
  }

  createPanResponder() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !this.props.disabled,
      onStartShouldSetPanResponderCapture: () => !this.props.disabled,
      onPanResponderGrant: ({ nativeEvent }) => {
        const { minDisabled, maxDisabled, canTouchTrack, onSlidingStart, horizontal } = this.props;
        // 开始手势操作，确定点击位置。
        const { locationX, locationY } = nativeEvent;

        const { leftVal: leftValue, rightVal: rightValue } = this;
        const { height } = this.style;
        let direction = minDisabled ? 'max' : 'min';
        if (
          horizontal &&
          !maxDisabled &&
          Math.abs(locationX - leftValue) > Math.abs(locationX - rightValue)
        ) {
          direction = 'max';
        }

        if (
          !horizontal &&
          !maxDisabled &&
          Math.abs(height - locationY - leftValue) > Math.abs(height - locationY - rightValue)
        ) {
          direction = 'max';
        }

        this.direction = direction;
        this.cacheVal = direction === 'min' ? leftValue : rightValue;
        this.moving = true;
        if (canTouchTrack) {
          const realLocation = this._handleRealLocation(
            horizontal ? locationX : height - locationY
          );
          if (direction === 'min') {
            this.left.setValue(realLocation);
          } else {
            this.right.setValue(realLocation);
          }
        }
        onSlidingStart && onSlidingStart(this._handleToValues());
      },

      onPanResponderMove: ({ nativeEvent }, { dx, dy }) => {
        const { minDisabled, onValueChange, horizontal, stepValue, max, min } = this.props;
        // 正在滑动
        const { direction } = this;
        const { locationX, locationY } = nativeEvent;
        const { width, height } = this.style;

        let moveLocation = horizontal ? locationX : locationY;
        if (locationX > width) return;
        moveLocation = Math.min(
          Math.max(0, horizontal ? moveLocation : height - moveLocation),
          horizontal ? width : height
        );
        let everyWidth = 0;
        if (stepValue && max !== min) {
          everyWidth = ((horizontal ? width : height) * stepValue) / (max - min);
        }

        if (direction === 'min') {
          moveLocation = this._handleRangeNumber(
            moveLocation,
            0,
            this.rightVal - (minDisabled ? 0 : everyWidth)
          );
          this.left.setValue(this._handleRealLocation(moveLocation));
        } else {
          moveLocation = this._handleRangeNumber(
            moveLocation,
            this.leftVal + (minDisabled ? 0 : everyWidth),
            horizontal ? width : height
          );
          this.right.setValue(this._handleRealLocation(moveLocation));
        }
        onValueChange && onValueChange(this._handleToValues());
      },
      onPanResponderTerminate: this.releaseMove,
      onPanResponderRelease: this.releaseMove,
      onPanResponderTerminationRequest: () => false,
    });
  }

  _handleRealLocation = originLocation => {
    const { min, max, stepValue, horizontal } = this.props;
    const { width, height } = this.style;
    if (stepValue && max !== min) {
      const everyWidth = ((horizontal ? width : height) * stepValue) / (max - min);
      return Math.round(originLocation / everyWidth) * everyWidth;
    }
    return originLocation;
  };

  _handleRangeNumber = (val, min, max) => {
    return Math.max(Math.min(val, max), min);
  };

  _handleLocationToValue = location => {
    const { min, max, stepValue, horizontal } = this.props;
    const { width, height } = this.style;
    const hasPoint = `${stepValue}`.indexOf('.') !== -1;
    const pointNum = hasPoint ? `${stepValue}`.length - (`${stepValue}`.indexOf('.') + 1) : 0;
    return Math.min(
      max,
      Math.max(
        min,
        Number((location / (horizontal ? width : height)) * (max - min) + min).toFixed(pointNum)
      )
    );
  };

  _handleValueToWidth = value => {
    const { min, max, horizontal } = this.props;
    const { width, height } = this.style;
    return (value * (horizontal ? width : height)) / (max - min);
  };

  _handleToValues = () => {
    const { leftVal, rightVal } = this;
    const rightValue = this._handleLocationToValue(rightVal);
    const leftValue = this._handleLocationToValue(leftVal);
    return { minValue: leftValue, maxValue: rightValue };
  };

  releaseMove = () => {
    const { onSlidingComplete } = this.props;
    setTimeout(() => {
      this.moving = false;
    }, 500);
    onSlidingComplete && onSlidingComplete(this._handleToValues());
  };

  renderExtraInfo = (style, color) => {
    const {
      nounNumber,
      nounWidth,
      nounHeight,
      nounRadius,
      fontSize,
      startText,
      endText,
      horizontal,
    } = this.props;
    const { height, width } = this.style;
    return (
      <Animated.View
        style={[horizontal && { left: 0 }, style, { width, height, position: 'absolute' }]}
      >
        <View
          style={[
            styles.percentTextWrap,
            { height, width },
            horizontal && { flexDirection: 'row' },
          ]}
        >
          <TYText
            style={[
              styles.percentText,
              { color, fontSize },
              horizontal
                ? { left: Math.round((width * cx(12)) / cx(327)) }
                : { bottom: Math.round((height * cx(12)) / cx(327)) },
            ]}
          >
            {startText}
          </TYText>
          <TYText
            style={[
              styles.percentText,
              { color, fontSize },
              horizontal
                ? { right: Math.round((width * cx(12)) / cx(327)) }
                : { top: Math.round((height * cx(12)) / cx(327)) },
            ]}
          >
            {endText}
          </TYText>
        </View>
        {new Array(nounNumber).fill(0).map((_, index) => {
          const _left =
            Math.round(((horizontal ? width : height) * cx(53)) / cx(327)) +
            index *
              ((horizontal ? nounWidth : nounHeight) +
                Math.round(
                  ((horizontal ? width * cx(207) : height * cx(220)) / cx(327) -
                    (horizontal ? nounWidth : nounHeight) * nounNumber) /
                    (nounNumber - 1)
                ));
          return (
            <Divider
              key={`${index}`}
              width={nounWidth}
              height={nounHeight}
              color={color}
              style={[
                styles.dividerStyle,
                {
                  borderRadius: nounRadius,
                },
                horizontal
                  ? { top: (height - nounHeight) / 2, left: _left }
                  : { left: (width - nounWidth) / 2, bottom: _left },
              ]}
            />
          );
        })}
      </Animated.View>
    );
  };

  render() {
    const {
      activeBackgroundColor,
      disabled,
      nounColor,
      activeNounColor,
      horizontal,
      style,
    } = this.props;
    const { height } = this.style;
    return (
      <View style={[this.style, { opacity: disabled ? 0.7 : 1, overflow: 'hidden' }, style]}>
        {this.renderExtraInfo({}, nounColor)}
        <Animated.View
          style={[
            this.style,
            {
              backgroundColor: activeBackgroundColor,
              overflow: 'hidden',
            },
            horizontal
              ? { width: this.width, left: this.left }
              : {
                  height: this.width,
                  bottom: Animated.add(Animated.add(this.width, -height), this.left),
                },
          ]}
        >
          {this.renderExtraInfo(
            horizontal ? { left: this.leftNegative } : { bottom: this.leftNegative },
            activeNounColor
          )}
        </Animated.View>
        <View
          style={[this.style, styles.touchArea]}
          {...this._panResponder.panHandlers}
          pointerEvents="box-only"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchArea: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  percentTextWrap: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentText: {
    opacity: 0.5,
    position: 'absolute',
    fontWeight: '400',
  },
  dividerStyle: {
    position: 'absolute',
    opacity: 0.5,
  },
});
