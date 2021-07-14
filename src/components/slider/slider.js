/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  ColorPropType,
  Animated,
  StyleSheet,
  PanResponder,
  View,
  Easing,
  ViewPropTypes,
} from 'react-native';
import _ from 'lodash';

// import Utils from '../../utils';
import { NumberUtils } from '../../utils';

const shallowCompare = require('react-addons-shallow-compare');
const styleEqual = require('style-equal');

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;

const DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100,
  },
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0,
  },
  // decay : { // This has a serious bug
  //   velocity     : 1,
  //   deceleration : 0.997
  // }
};

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  containsPoint(x, y) {
    return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height;
  }
}

/* eslint-disable no-mixed-operators */

export default class Slider extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * 测试标志
     */
    accessibilityLabel: PropTypes.string,
    /**
     * onLayout回调
     */
    onLayout: PropTypes.func,
    /**
     * 当前值
     */
    value: PropTypes.number,
    /**
     * 是否禁用
     */
    disabled: PropTypes.bool,
    /**
     * 最小值
     */
    minimumValue: PropTypes.number,
    /**
     * 最大值
     */
    maximumValue: PropTypes.number,
    /**
     * 步长，取值必须大于 0，并且可被 (max - min) 整除
     */
    stepValue: PropTypes.number,
    /**
     * 是否翻转数值
     */
    reverseValue: PropTypes.bool, // eslint-disable-line
    /**
     * 小于当前值的轨道颜色
     */
    minimumTrackTintColor: ColorPropType,
    /**
     * 大于当前值的轨道颜色
     */
    maximumTrackTintColor: ColorPropType,
    /**
     * 滑块颜色
     */
    thumbTintColor: ColorPropType,
    /**
     * 滑块大小
     */
    thumbTouchSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    /**
     * 滑动值变更回调
     */
    onValueChange: PropTypes.func,
    /**
     * 滑动开始回调
     */
    onSlidingStart: PropTypes.func, // eslint-disable-line
    /**
     * 滑动结束回调
     */
    onSlidingComplete: PropTypes.func, // eslint-disable-line
    /**
     * 滑动事件
     */
    onScrollEvent: PropTypes.func,
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * 通用的轨道样式
     */
    trackStyle: ViewPropTypes.style,
    /**
     * 滑块样式
     */
    thumbStyle: ViewPropTypes.style,
    /**
     * 是否开启调试区域
     */
    debugTouchArea: PropTypes.bool,
    /**
     * 是否只显示大于当前值的轨道颜色
     */
    onlyMaximumTrack: PropTypes.bool,
    /**
     * 触摸轨道是否可以更改值
     */
    canTouchTrack: PropTypes.bool,
    /**
     * 是否添加动画滑动效果
     */
    animateTransitions: PropTypes.bool,
    /**
     * 动画类型，spring 弹性动画或 timing 线性动画
     */
    animationType: PropTypes.oneOf(['spring', 'timing']),
    /**
     * 动画配置
     */
    animationConfig: PropTypes.object,
    /**
     * 定制渲染小于当前值的轨道
     */
    renderMinimumTrack: PropTypes.func,
    /**
     * 定制渲染大于当前值的轨道
     */
    renderMaximumTrack: PropTypes.func,
    /**
     * 定制渲染滑块
     */
    renderThumb: PropTypes.func,
    /**
     * 是否为水平方向
     */
    horizontal: PropTypes.bool,
    /**
     * 滑动条分为 2 种类型，parcel：轨道包裹滑块
     *
     */
    type: PropTypes.oneOf(['parcel', 'normal']),
    /**
     * 是否使用刻度
     *
     */
    useNoun: PropTypes.bool,
    /**
     * 大于当前值的刻度样式
     *
     */
    maxNounStyle: ViewPropTypes.style,
    /**
     * 小于当前值的刻度样式
     *
     */
    minNounStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    accessibilityLabel: 'Slider',
    value: 0,
    minimumValue: 0,
    maximumValue: 1,
    stepValue: 0,
    reverseValue: false,
    minimumTrackTintColor: '#3f3f3f',
    maximumTrackTintColor: '#b3b3b3',
    thumbTintColor: '#343434',
    thumbTouchSize: { width: 40, height: 40 },
    canTouchTrack: false,
    animateTransitions: false,
    debugTouchArea: false,
    animationType: 'timing',
    horizontal: true,
    onlyMaximumTrack: false, // 大小滑动条一致时, 可以设置为True, 优化性能
    type: 'normal',
    useNoun: false,
    maxNounStyle: null,
    minNounStyle: null,
  };

  constructor(props) {
    super(props);

    this._measureContainer = this._measureContainer.bind(this);
    this._measureTrack = this._measureTrack.bind(this);
    this._measureThumb = this._measureThumb.bind(this);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminationRequest: this._handlePanResponderRequestEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
      onStartShouldSetResponderCapture: this._handlePanResponderRequestEnd.bind(this),
      onMoveShouldSetPanResponderCapture: this._handlePanResponderRequestEnd.bind(this),
    });

    this.oldValue = this._testValue(props.value, props);
    this.touchLocked = false;

    this.state = {
      containerSize: { width: 0, height: 0 },
      trackSize: { width: 0, height: 0 },
      thumbSize: { width: 0, height: 0 },
      allMeasured: false,
      value: new Animated.Value(this.oldValue),
      actualValue: this.oldValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value && !this.touchLocked) {
      const newValue = this._testValue(nextProps.value, nextProps);
      this.oldValue = newValue;
      this.setState({
        actualValue: newValue,
      });
      if (this.props.animateTransitions) {
        this._setCurrentValueAnimated(newValue);
      } else {
        this._setCurrentValue(newValue);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      shallowCompare(
        { props: this._getPropsForComponentUpdate(this.props), state: this.state },
        this._getPropsForComponentUpdate(nextProps),
        nextState
      ) ||
      !styleEqual(this.props.style, nextProps.style) ||
      !styleEqual(this.props.trackStyle, nextProps.trackStyle) ||
      !styleEqual(this.props.thumbStyle, nextProps.thumbStyle) ||
      !styleEqual(this.props.thumbTouchSize, nextProps.thumbTouchSize)
    );
  }

  setValue(value) {
    if (this.touchLocked) return;
    if (this.props.animateTransitions) {
      this._setCurrentValueAnimated(value);
    } else {
      this._setCurrentValue(value);
    }
  }

  /* istanbul ignore next */
  // eslint-disable-next-line
  setGestureGrant(gestureDistance) {
    this._previousLeft = this._getThumbLeft(this._getCurrentValue());
    this._fireChangeEvent('onSlidingStart');
  }

  /* istanbul ignore next */
  setGestureMove(gestureDistance) {
    const thumbLeft = this._previousLeft + gestureDistance;
    this._setCurrentValue(this.__getValue(thumbLeft));
    this._fireValueChange();
  }

  /* istanbul ignore next */
  setGestureEnd(gestureDistance) {
    const thumbLeft = this._previousLeft + gestureDistance;
    this._setCurrentValue(this.__getValue(thumbLeft));
    this._fireChangeEvent('onSlidingComplete');
  }

  _testValue(value, props) {
    const v = props.reverseValue ? props.maximumValue + props.minimumValue - value : value;
    return NumberUtils.inMaxMin(props.minimumValue, props.maximumValue, v);
  }

  _getPropsForComponentUpdate(props) {
    const {
      value, // eslint-disable-line
      onValueChange, // eslint-disable-line
      onSlidingStart, // eslint-disable-line
      onSlidingComplete, // eslint-disable-line
      onScrollEvent, // eslint-disable-line
      style, // eslint-disable-line
      trackStyle, // eslint-disable-line
      thumbStyle, // eslint-disable-line
      renderMinimumTrack, // eslint-disable-line
      renderMaximumTrack, // eslint-disable-line
      renderThumb, // eslint-disable-line
      onLayout, // eslint-disable-line
      thumbTouchSize, // eslint-disable-line
      ...neededProps
    } = props;
    return neededProps;
  }

  _handleStartShouldSetPanResponder(e) {
    if (this.props.disabled) return false;
    if (this.props.canTouchTrack) return true;
    return this._thumbHitTest(e);
  }

  _handleMoveShouldSetPanResponder() {
    return false;
  }

  // eslint-disable-next-line
  _handlePanResponderGrant(event, gestureState) {
    this.touchLocked = true;
    if (this.props.canTouchTrack) {
      const newValue = this._getValueByGestureEvent(event);

      if (this.props.animateTransitions) {
        this._setCurrentValueAnimated(newValue);
      } else {
        this._setCurrentValue(newValue);
      }
      this._previousLeft = this._getThumbLeft(newValue);
    } else {
      this._previousLeft = this._getThumbLeft(this._getCurrentValue());
    }

    this._fireChangeEvent('onSlidingStart');

    // if (this.props.canTouchTrack) {
    //   this._fireValueChange();
    // }
  }

  _handlePanResponderMove(event, gestureState) {
    this._setCurrentValue(this._getValueByGestureState(gestureState));
    this._fireValueChange();
  }

  _handlePanResponderRequestEnd() {
    return false;
  }

  _handlePanResponderEnd(event, gestureState) {
    this._setCurrentValue(this._getValueByGestureState(gestureState));
    this._fireChangeEvent('onSlidingComplete');
    this.touchLocked = false;
  }

  _measureContainer(x) {
    this._handleMeasure('containerSize', x);
    if (this.props.onLayout) this.props.onLayout(x);
  }

  _measureTrack(x) {
    this._handleMeasure('trackSize', x);
  }

  _measureThumb(x) {
    this._handleMeasure('thumbSize', x);
  }

  _handleMeasure(name, x) {
    const { width, height } = x.nativeEvent.layout;
    const size = { width, height };

    const storeName = `_${name}`;
    const currentSize = this[storeName];
    if (currentSize && width === currentSize.width && height === currentSize.height) {
      return;
    }
    this[storeName] = size;

    if (this._containerSize && this._trackSize && this._thumbSize) {
      this.setState({
        containerSize: this._containerSize,
        trackSize: this._trackSize,
        thumbSize: this._thumbSize,
        allMeasured: true,
      });
    }
  }

  _getRatio(value) {
    return (value - this.props.minimumValue) / (this.props.maximumValue - this.props.minimumValue);
  }

  _getThumbLeft(value) {
    return this._getThumbTranslate(value);
  }

  _getThumbTranslate(value) {
    const ratio = this._getRatio(value);
    const length = this.props.horizontal
      ? this.state.containerSize.width - this.state.thumbSize.width
      : this.state.containerSize.height - this.state.thumbSize.height;
    return ratio * length;
  }

  _getValueByGestureEvent(e) {
    const thumbLeft = this.props.horizontal
      ? e.nativeEvent.locationX - this.props.thumbTouchSize.width / 2
      : e.nativeEvent.locationY - this.props.thumbTouchSize.height / 2;
    return this.__getValue(thumbLeft);
  }

  _getValueByGestureState(gestureState) {
    const dsize = this.props.horizontal ? gestureState.dx : gestureState.dy;
    const thumbLeft = this._previousLeft + dsize;

    return this.__getValue(thumbLeft);
  }

  __getValue(thumbLeft) {
    const length = this.props.horizontal
      ? this.state.containerSize.width - this.state.thumbSize.width
      : this.state.containerSize.height - this.state.thumbSize.height;
    const ratio = thumbLeft / length;

    if (this.props.stepValue) {
      return Math.max(
        this.props.minimumValue,
        Math.min(
          this.props.maximumValue,
          Math.round(
            (ratio * (this.props.maximumValue - this.props.minimumValue)) / this.props.stepValue
          ) *
            this.props.stepValue +
            this.props.minimumValue
        )
      );
    }
    return Math.max(
      this.props.minimumValue,
      Math.min(
        this.props.maximumValue,
        ratio * (this.props.maximumValue - this.props.minimumValue) + this.props.minimumValue
      )
    );
  }

  _getCurrentValue() {
    return this.state.value.__getValue();
  }

  _setCurrentValue(value) {
    this.setState({
      actualValue: value,
    });
    this.state.value.setValue(value);
  }

  _setCurrentValueAnimated(value) {
    const { animationType } = this.props;
    const animationConfig = Object.assign(
      {},
      DEFAULT_ANIMATION_CONFIGS[animationType],
      this.props.animationConfig,
      { toValue: value }
    );

    Animated[animationType](this.state.value, animationConfig).start();
  }

  _fireValueChange() {
    const value = this._getCurrentValue();
    const newValue = this._testValue(value, this.props);
    if (this.props.onValueChange && this.oldValue !== value) {
      this.oldValue = value;
      this.props.onValueChange(newValue);
    }
    if (this.props.onScrollEvent) {
      this.props.onScrollEvent({ value: newValue });
    }
  }

  _fireChangeEvent(event) {
    const value = this._getCurrentValue();
    const newValue = this._testValue(value, this.props);
    if (this.props[event]) {
      this.props[event](newValue);
    }
    if (this.props.onScrollEvent) {
      this.props.onScrollEvent({ value: newValue });
    }
  }

  _getTouchOverflowSize() {
    const { state, props } = this;
    const size = {};
    if (state.allMeasured === true) {
      if (this.props.horizontal) {
        size.width = Math.max(0, props.thumbTouchSize.width - state.thumbSize.width);
        size.height = Math.max(0, props.thumbTouchSize.height - state.containerSize.height);
      } else {
        size.width = Math.max(0, props.thumbTouchSize.width - state.containerSize.width);
        size.height = Math.max(0, props.thumbTouchSize.height - state.thumbSize.height);
      }
    }

    return size;
  }

  _getTouchOverflowStyle() {
    const { width, height } = this._getTouchOverflowSize();
    const touchOverflowStyle = {};
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;

      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }

    if (this.props.debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = 'orange';
      touchOverflowStyle.opacity = 0.5;
    }

    return touchOverflowStyle;
  }

  _thumbHitTest(e) {
    const { nativeEvent } = e;
    const thumbTouchRect = this._getThumbTouchRect();
    return thumbTouchRect.containsPoint(nativeEvent.locationX, nativeEvent.locationY);
  }

  _getThumbTouchRect() {
    const { state, props } = this;
    const touchOverflowSize = this._getTouchOverflowSize();

    const rect = this.props.horizontal
      ? new Rect(
          touchOverflowSize.width / 2 +
            this._getThumbLeft(this._getCurrentValue()) +
            (state.thumbSize.width - props.thumbTouchSize.width) / 2,
          touchOverflowSize.height / 2 +
            (state.containerSize.height - props.thumbTouchSize.height) / 2,
          props.thumbTouchSize.width,
          props.thumbTouchSize.height
        )
      : new Rect(
          touchOverflowSize.width / 2 +
            (state.containerSize.width - props.thumbTouchSize.width) / 2,
          touchOverflowSize.height / 2 +
            this._getThumbLeft(this._getCurrentValue()) +
            (state.thumbSize.height - props.thumbTouchSize.height) / 2,
          props.thumbTouchSize.width,
          props.thumbTouchSize.height
        );
    return rect;
  }

  _renderDebugThumbTouchRect(thumbLeft) {
    const thumbTouchRect = this._getThumbTouchRect();
    const positionStyle = this.props.horizontal
      ? {
          left: thumbLeft,
          top: thumbTouchRect.y,
          width: thumbTouchRect.width,
          height: thumbTouchRect.height,
        }
      : {
          left: thumbTouchRect.x,
          top: thumbLeft,
          width: thumbTouchRect.width,
          height: thumbTouchRect.height,
        };

    return (
      <Animated.View
        style={[defaultStyles.debugThumbTouchArea, positionStyle]}
        pointerEvents="none"
      />
    );
  }

  renderMaxNounView = () => {
    const {
      horizontal,
      maxNounStyle,
      stepValue,
      minimumValue,
      maximumValue,
      type,
      thumbTouchSize,
      reverseValue,
    } = this.props;
    const { trackSize } = this.state;
    const time = Math.floor((maximumValue - minimumValue) / stepValue);
    if (horizontal) {
      if (type === 'parcel') {
        return _.times(time + 1, n => {
          return (
            <View
              key={n}
              style={[
                {
                  width: 3,
                  height: 14,
                  borderRadius: 1.5,
                },
                defaultStyles.parcelNumStyle,
                reverseValue
                  ? {
                      right:
                        thumbTouchSize.width / 2 +
                        (n * (trackSize.width - thumbTouchSize.width)) / time,
                    }
                  : {
                      left:
                        thumbTouchSize.width / 2 +
                        (n * (trackSize.width - thumbTouchSize.width)) / time,
                    },
                maxNounStyle,
              ]}
            />
          );
        });
      }
      return _.times(time + 1, n => {
        return (
          <View
            key={n}
            style={[
              {
                width: trackSize.height,
                height: trackSize.height,
                borderRadius: trackSize.height,
              },
              defaultStyles.parcelNumStyle,
              reverseValue
                ? {
                    right:
                      n * trackSize.height +
                      (n * (trackSize.width - trackSize.height * (time + 1))) / time,
                  }
                : {
                    left:
                      n * trackSize.height +
                      (n * (trackSize.width - trackSize.height * (time + 1))) / time,
                  },
              maxNounStyle,
            ]}
          />
        );
      });
    }
    if (type === 'parcel') {
      return _.times(time + 1, n => {
        return (
          <View
            key={n}
            style={[
              {
                width: 14,
                height: 3,
                borderRadius: 1.5,
              },
              defaultStyles.parcelNumStyle,
              reverseValue
                ? {
                    bottom:
                      thumbTouchSize.height / 2 +
                      (n * (trackSize.height - thumbTouchSize.height)) / time,
                  }
                : {
                    top:
                      thumbTouchSize.height / 2 +
                      (n * (trackSize.height - thumbTouchSize.height)) / time,
                  },
              maxNounStyle,
            ]}
          />
        );
      });
    }
    return _.times(time + 1, n => {
      return (
        <View
          key={n}
          style={[
            {
              width: trackSize.width,
              height: trackSize.width,
              borderRadius: trackSize.width,
            },
            defaultStyles.parcelNumStyle,
            reverseValue
              ? {
                  bottom:
                    n * trackSize.width +
                    (n * (trackSize.height - trackSize.width * (time + 1))) / time,
                }
              : {
                  top:
                    n * trackSize.width +
                    (n * (trackSize.height - trackSize.width * (time + 1))) / time,
                },
            maxNounStyle,
          ]}
        />
      );
    });
  };

  renderMinNounView = () => {
    const {
      horizontal,
      minNounStyle,
      stepValue,
      minimumValue,
      maximumValue,
      type,
      reverseValue,
      thumbTouchSize,
    } = this.props;
    const { actualValue, trackSize } = this.state;
    const actualNounNum = reverseValue
      ? Math.floor(maximumValue - actualValue) / stepValue + 1
      : Math.floor(actualValue - minimumValue) / stepValue + 1;
    const time = Math.floor(maximumValue - minimumValue) / stepValue;
    if (horizontal) {
      if (type === 'parcel') {
        return _.times(actualNounNum, n => {
          return (
            <View
              key={n}
              style={[
                {
                  width: 3,
                  height: 14,
                  borderRadius: 1.5,
                },
                defaultStyles.parcelNumStyle,
                reverseValue
                  ? {
                      right:
                        thumbTouchSize.width / 2 +
                        (n * (trackSize.width - thumbTouchSize.width)) / time,
                    }
                  : {
                      left:
                        thumbTouchSize.width / 2 +
                        (n * (trackSize.width - thumbTouchSize.width)) / time,
                    },
                minNounStyle,
              ]}
            />
          );
        });
      }
      return _.times(actualNounNum, n => {
        if (n === actualNounNum - 1) return null;
        return (
          <View
            key={n}
            style={[
              {
                width: trackSize.height,
                height: trackSize.height,
                borderRadius: trackSize.height,
              },
              defaultStyles.parcelNumStyle,
              reverseValue
                ? {
                    right:
                      n * trackSize.height +
                      (n * (trackSize.width - trackSize.height * (time + 1))) / time,
                  }
                : {
                    left:
                      n * trackSize.height +
                      (n * (trackSize.width - trackSize.height * (time + 1))) / time,
                  },
              minNounStyle,
            ]}
          />
        );
      });
    }
    if (type === 'parcel') {
      return _.times(actualNounNum, n => {
        return (
          <View
            key={n}
            style={[
              {
                width: 14,
                height: 3,
                borderRadius: 1.5,
              },
              defaultStyles.parcelNumStyle,
              reverseValue
                ? {
                    bottom:
                      thumbTouchSize.height / 2 +
                      n * 3 +
                      (n * (trackSize.height - 3 * (time + 1) - thumbTouchSize.height)) / time,
                  }
                : {
                    top:
                      thumbTouchSize.height / 2 +
                      n * 3 +
                      (n * (trackSize.height - 3 * (time + 1) - thumbTouchSize.height)) / time,
                  },
              minNounStyle,
            ]}
          />
        );
      });
    }
    return _.times(actualNounNum, n => {
      if (n === actualNounNum - 1) return null;
      return (
        <View
          key={n}
          style={[
            {
              width: trackSize.width,
              height: trackSize.width,
              borderRadius: trackSize.width,
            },
            defaultStyles.parcelNumStyle,
            reverseValue
              ? {
                  bottom:
                    n * trackSize.width +
                    (n * (trackSize.height - trackSize.width * (time + 1))) / time,
                }
              : {
                  top:
                    n * trackSize.width +
                    (n * (trackSize.height - trackSize.width * (time + 1))) / time,
                },
            minNounStyle,
          ]}
        />
      );
    });
  };

  render() {
    const {
      minimumValue,
      maximumValue,
      minimumTrackTintColor,
      maximumTrackTintColor,
      thumbTintColor,
      styles, //eslint-disable-line
      style,
      trackStyle,
      thumbStyle,
      debugTouchArea,
      renderMinimumTrack,
      renderMaximumTrack,
      renderThumb,
      horizontal,
      thumbTouchSize,
      onlyMaximumTrack,
      type,
      reverseValue,
      stepValue,
      useNoun,
    } = this.props;
    const { value, containerSize, trackSize, thumbSize, allMeasured } = this.state;
    const mainStyles = styles || defaultStyles;
    const valueVisibleStyle = {};
    let containerStyle = {};
    let minimumTrackStyle = {};
    let thumbTransformStyle = {};
    let thumbTranslate = 0;

    if (horizontal) {
      containerStyle = { height: thumbTouchSize.height, flexDirection: 'column' };
      const marginHeight = (containerSize.height - thumbSize.height) / 2;
      if (allMeasured) {
        thumbTranslate =
          type === 'normal'
            ? value.interpolate({
                inputRange: [minimumValue, maximumValue],
                outputRange: [0, containerSize.width - thumbSize.width],
              })
            : value.interpolate({
                inputRange: [minimumValue, maximumValue],
                outputRange: [marginHeight, containerSize.width - thumbSize.width - marginHeight],
              });

        thumbTransformStyle = {
          transform: [
            { translateX: thumbTranslate },
            // 暂时注释 Y 轴 transform 保证基础样式渲染正常，不知什么原因
            // { translateY: -(trackSize.height + thumbSize.height) / 2 },
          ],
        };
        if (!onlyMaximumTrack) {
          if (type === 'normal') {
            minimumTrackStyle = {
              width: Animated.add(thumbTranslate, thumbSize.width / 2),
            };
          } else if (type === 'parcel' && reverseValue) {
            minimumTrackStyle = {
              overflow: 'hidden',
              position: 'absolute',
              right: 0,
              width: Animated.add(
                value.interpolate({
                  inputRange: [minimumValue, maximumValue],
                  outputRange: [containerSize.width - thumbSize.width - marginHeight, marginHeight],
                }),
                thumbSize.width + marginHeight
              ),
            };
          } else if (type === 'parcel' && !reverseValue) {
            minimumTrackStyle = {
              width: Animated.add(thumbTranslate, thumbSize.width + marginHeight),
            };
          }
        }
      }
    } else {
      containerStyle = { width: thumbTouchSize.width, flexDirection: 'row' };
      const marginWidth = (containerSize.width - thumbSize.width) / 2;
      if (allMeasured) {
        thumbTranslate =
          type === 'normal'
            ? value.interpolate({
                inputRange: [minimumValue, maximumValue],
                outputRange: [0, containerSize.height - thumbSize.height],
              })
            : value.interpolate({
                inputRange: [minimumValue, maximumValue],
                outputRange: [marginWidth, containerSize.height - thumbSize.height - marginWidth],
              });
        thumbTransformStyle = {
          transform: [
            { translateY: thumbTranslate },
            // { translateX: -(trackSize.width + thumbSize.width) / 2 },
          ],
        };
        if (!onlyMaximumTrack) {
          if (type === 'normal') {
            minimumTrackStyle = {
              overflow: 'hidden',
              position: 'absolute',
              height: Animated.add(thumbTranslate, thumbSize.height / 2),
            };
          } else if (type === 'parcel' && reverseValue) {
            minimumTrackStyle = {
              overflow: 'hidden',
              position: 'absolute',
              bottom: 0,
              height: Animated.add(
                value.interpolate({
                  inputRange: [minimumValue, maximumValue],
                  outputRange: [containerSize.height - thumbSize.height - marginWidth, marginWidth],
                }),
                thumbSize.height + marginWidth
              ),
            };
          } else if (type === 'parcel' && !reverseValue) {
            minimumTrackStyle = {
              overflow: 'hidden',
              position: 'absolute',
              height: Animated.add(thumbTranslate, thumbSize.height + marginWidth),
            };
          }
        }
      }
    }

    if (!allMeasured) {
      valueVisibleStyle.opacity = 0;
    }

    const touchOverflowStyle = this._getTouchOverflowStyle();

    return (
      <View
        accessibilityLabel={this.props.accessibilityLabel}
        onLayout={this._measureContainer}
        style={[mainStyles.container, containerStyle, style]}
      >
        <View
          style={[
            { overflow: 'hidden', backgroundColor: maximumTrackTintColor },
            mainStyles.track,
            trackStyle,
          ]}
          onLayout={this._measureTrack}
        >
          {!!renderMaximumTrack && renderMaximumTrack()}
        </View>
        {!!stepValue && !!useNoun && this.renderMaxNounView()}
        {!onlyMaximumTrack && (
          <Animated.View
            style={[
              {
                overflow: 'hidden',
                position: 'absolute',
                backgroundColor: minimumTrackTintColor,
              },
              horizontal ? { justifyContent: 'center' } : { alignItems: 'center' },
              mainStyles.track,
              trackStyle,
              minimumTrackStyle,
              valueVisibleStyle,
            ]}
          >
            {!!renderMinimumTrack && renderMinimumTrack()}
          </Animated.View>
        )}
        {!!stepValue && !!useNoun && reverseValue && type !== 'parcel' && this.renderMaxNounView()}
        <Animated.View
          renderToHardwareTextureAndroid={true}
          style={[
            { position: 'absolute', backgroundColor: thumbTintColor },
            mainStyles.thumb,
            thumbStyle,
            thumbTransformStyle,
            valueVisibleStyle,
          ]}
          onLayout={this._measureThumb}
        >
          {!!renderThumb && renderThumb()}
        </Animated.View>
        {!!stepValue && !!useNoun && this.renderMinNounView()}
        <View
          style={[defaultStyles.touchArea, touchOverflowStyle]}
          {...this._panResponder.panHandlers}
        >
          {debugTouchArea === true && this._renderDebugThumbTouchRect(thumbTranslate)}
        </View>
      </View>
    );
  }
}

Slider.Vertical = _props => (
  <Slider {..._props} ref={_props.sliderRef} horizontal={false} styles={verticalStyles} />
);

Slider.Horizontal = _props => <Slider {..._props} ref={_props.sliderRef} horizontal={true} />;

Slider.dpView = WrappedComponent => _props => (
  <WrappedComponent
    {..._props}
    minimumValue={_props.min || _props.minimumValue}
    maximumValue={_props.max || _props.maximumValue}
    stepValue={_props.step || _props.stepValue}
  />
);

const defaultStyles = StyleSheet.create({
  // eslint-disable-next-line
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  // eslint-disable-next-line
  track: {
    height: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2,
  },
  // eslint-disable-next-line
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  },
  parcelNumStyle: {
    backgroundColor: '#FFF',
    position: 'absolute',
    justifyContent: 'center',
  },
});

export const verticalStyles = StyleSheet.create({
  // eslint-disable-next-line
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  // eslint-disable-next-line
  track: {
    width: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2,
  },
  // eslint-disable-next-line
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
});
