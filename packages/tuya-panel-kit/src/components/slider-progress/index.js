import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, PanResponder, StyleSheet } from 'react-native';
import _ from 'lodash';

export default class SliderProgress extends Component {
  static propTypes = {
    accessibilityLabel: PropTypes.string, // 测试标志
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    style: PropTypes.any,
    onValueChange: PropTypes.func,
    onComplete: PropTypes.func,
    disabled: PropTypes.bool,
    thumbWidth: PropTypes.number,
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    activeBase: PropTypes.number, // 限制可触摸的区域,倍数,thumbWidth的N倍（双边情况下必须限制范围，否则无法判断更改最大值还是最小值）
    ifAllowClick: PropTypes.bool,
    // 是否允许点击更改值；(允许情况:1.单边点击改变最大值,2.双边最大值右侧点击改变最大值，最小值左侧点击改变最小值。不允许情况：1.双边最大值左侧和最小值右侧点击改变值）
  };

  static defaultProps = {
    accessibilityLabel: 'SliderProgress',
    value: 10,
    min: 0,
    max: 100,
    onValueChange() {},
    onComplete() {},
    style: {},
    disabled: false,
    thumbWidth: 4,
    activeColor: '#5E719F',
    inactiveColor: 'rgba(94,113,159,0.2)',
    activeBase: 4,
    ifAllowClick: true,
  };

  constructor(props) {
    super(props);
    this.isSingle = typeof this.props.value === 'number';
    this.state = {
      maxValue: this.isSingle
        ? this.props.value
        : props.value[1] > props.max
        ? props.max
        : props.value[1],
      minValue: this.isSingle ? props.min : props.value[0] > props.min ? props.value[0] : props.min,
    };
    this._minPrevious = 0;
    this._maxPrevious = 0;
    this._minCurrent = 0;
    this._maxCurrent = 0;
    this.moveDirection = ''; // 移动的方向
    this.ifCanMove = true; // 超过限制的区域不能改变值
    const { style } = props;
    const { height: boxHeight, width: boxWidth } = StyleSheet.flatten([styles.root, style]);
    this.boxSize = { height: boxHeight, width: boxWidth };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this), // 开始
      onPanResponderMove: this._handleMove.bind(this), // 移动
      onPanResponderRelease: this._handleRelease.bind(this), // 放开
    });
  }
  componentDidMount = () => {
    this._minPrevious = this.mapValueToLeft(this.state.minValue);
    this._maxPrevious = this.mapValueToLeft(this.state.maxValue);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      if (this.isSingle) {
        this.setState({ maxValue: nextProps.value });
      } else {
        this.setState({ maxValue: nextProps.value[1], minValue: nextProps.value[0] });
      }
    }
  }

  _handleStartShouldSetPanResponder() {
    if (this.props.disabled) {
      return false;
    }
    return true;
  }

  _handleMoveShouldSetPanResponder() {
    return false;
  }

  _handlePanResponderGrant(evt) {
    if (this.props.disabled) return;
    this._getValueByGestureEvent(evt);
  }
  limitValue = value => {
    if (this.moveDirection === 'max') {
      return value > this.state.minValue ? value : this.state.minValue;
    } else if (this.moveDirection === 'min') {
      return value < this.state.maxValue ? value : this.state.maxValue;
    }
  };

  _handleMove(evt, { dx }) {
    if (this.props.disabled) return;
    if (!this.ifCanMove) return;
    if ((!this.props.ifAllowClick && Math.abs(dx) >= 1) || this.props.ifAllowClick) {
      if (this.moveDirection === 'middle') {
        if (dx > 0) this.moveDirection = 'max';
        if (dx < 0) this.moveDirection = 'min';
      }
      this[`_${this.moveDirection}Current`] = dx;
      const left = this[`_${this.moveDirection}Previous`] + dx;
      const value = this.limitValue(this.mapLeftToValue(left));
      this.setState({ [`${this.moveDirection}Value`]: value }, () => {
        if (this.isSingle) {
          this.props.onValueChange(this.state.maxValue);
        } else {
          this.props.onValueChange({
            minValue: this.state.minValue,
            maxValue: this.state.maxValue,
          });
        }
      });
    }
  }

  _handleRelease(evt, { dx }) {
    if (this.props.disabled) return;
    if (!this.ifCanMove) return;
    if (
      (!this.props.ifAllowClick &&
        Math.abs(this[`_${this.moveDirection}Previous`] - this[`_${this.moveDirection}Current`]) >=
          1) ||
      this.props.ifAllowClick
    ) {
      let value = 0;
      this[`_${this.moveDirection}Previous`] += dx;
      value = this.limitValue(this.mapLeftToValue(this[`_${this.moveDirection}Previous`]));
      this.setState({ [`${this.moveDirection}Value`]: value }, () => {
        if (this.isSingle) {
          this.props.onComplete(this.state.maxValue);
        } else {
          this.props.onComplete({
            minValue: this.state.minValue,
            maxValue: this.state.maxValue,
          });
        }
      });
    }
  }

  _getWhichMove = locationX => {
    let isMax = false;
    let isMin = false;
    const { activeBase, thumbWidth, ifAllowClick, max, min } = this.props;
    if (ifAllowClick) {
      if (this.isSingle) {
        isMax = true;
        isMin = false;
      } else {
        isMax = locationX > this._maxPrevious;
        isMin = locationX < this._minPrevious;
      }
    } else {
      isMax =
        Math.abs(locationX - this._maxPrevious) <= activeBase * thumbWidth ||
        (this.state.maxValue === max && locationX >= this.boxSize.width - activeBase * thumbWidth);
      isMin =
        Math.abs(this._minPrevious - locationX) <= activeBase * thumbWidth ||
        (this.state.minValue === min && locationX <= activeBase * thumbWidth);
    }
    return { isMax, isMin };
  };

  _getValueByGestureEvent({ nativeEvent: { locationX } }) {
    const { ifAllowClick } = this.props;
    const { isMax, isMin } = this._getWhichMove(locationX);

    // 特殊情况，当最大跟最小值差距小，并且为移动手势时，无法判断改变哪个值；
    if (this.state.maxValue - this.state.minValue <= 5 && !ifAllowClick) {
      this._previousMiddle = locationX;
      this.moveDirection = 'middle';
      this.ifCanMove = true;

      // 改变最小值
    } else if (isMin && !isMax && !this.isSingle) {
      this._minPrevious = locationX;
      this.moveDirection = 'min';
      this.ifCanMove = true;
    } else if (!isMax && !this.isSingle) {
      this.ifCanMove = false;
      // 改变最大值
    } else if (isMax) {
      this._maxPrevious = locationX;
      this.moveDirection = 'max';
      this.ifCanMove = true;
    }
  }

  mapLeftToValue(v) {
    const left = _.clamp(v, 0, this.boxSize.width);
    const { min, max } = this.props;
    const value = Math.round((left / this.boxSize.width) * (max - min) + min);
    return value;
  }
  mapValueToLeft(v) {
    const { min, max } = this.props;
    const left = Math.round(this.boxSize.width * [(v - min) / (max - min)] - this.props.thumbWidth);
    return left;
  }

  renderTrackView = ({ style } = {}) => {
    const { thumbWidth, activeColor, inactiveColor, min, max } = this.props;
    const { maxValue, minValue } = this.state;
    const num = Math.floor((this.boxSize.width / thumbWidth + 1) / 2); // 块数
    const arr = new Array(num).fill({}).map((item, index) => {
      const rate = (index + 1) / num;
      const keyValue = Math.round((max - min) * rate + min);
      const isActive = keyValue <= maxValue && keyValue >= minValue;
      return (
        <View
          key={keyValue}
          style={{
            height: this.boxSize.height,
            width: thumbWidth,
            backgroundColor: isActive ? activeColor : inactiveColor,
          }}
        />
      );
    });

    return (
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            ...StyleSheet.absoluteFillObject,
          },
          style,
        ]}
        pointerEvents="box-only"
      >
        {arr}
      </View>
    );
  };
  render() {
    const { style, accessibilityLabel } = this.props;
    return (
      <View style={[styles.root, style]} accessibilityLabel={accessibilityLabel}>
        <View
          style={[styles.touchArea, { height: this.boxSize.height, width: this.boxSize.width }]}
          {...this._panResponder.panHandlers}
        >
          {this.renderTrackView()}
          <View style={[styles.track]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: 300,
    height: 33,
  },
  track: {
    ...StyleSheet.absoluteFillObject,
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
  },
});
