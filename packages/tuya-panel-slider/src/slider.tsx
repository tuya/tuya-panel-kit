import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  PanResponder,
  PanResponderInstance,
  View,
  Easing,
  NativeModules,
} from 'react-native';
import _ from 'lodash';
import { Utils } from 'tuya-panel-utils';
import { ISliderProps, sliderDefault, ISliderState } from './interface';

const shallowCompare = require('react-addons-shallow-compare');
const styleEqual = require('style-equal');

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;
const { inMaxMin } = Utils.NumberUtils;

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
};

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  x: number;
  y: number;
  width: number;
  height: number;

  containsPoint(x, y) {
    return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height;
  }
}

export default class Slider extends Component<ISliderProps, ISliderState> {
  static defaultProps = sliderDefault;

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

  static Horizontal: React.ElementType<ISliderProps>;
  static Vertical: React.ElementType<ISliderProps>;
  static dpView: any;

  oldValue: number;
  touchLocked: boolean;
  _previousLeft: number;
  _containerSize: { width: number; height: number };
  _trackSize: { width: number; height: number };
  _thumbSize: { width: number; height: number };
  _panResponder: PanResponderInstance;

  _testValue(value, props) {
    const v = props.reverseValue ? props.maximumValue + props.minimumValue - value : value;
    return inMaxMin(props.minimumValue, props.maximumValue, v);
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
    // @ts-ignore
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
    const animationConfig = {
      ...DEFAULT_ANIMATION_CONFIGS[animationType],
      ...this.props.animationConfig,
      toValue: value,
    };
    // @ts-ignore
    Animated[animationType](this.state.value, animationConfig).start();
  }

  _fireValueChange() {
    const { isVibration, minimumValue, maximumValue } = this.props;
    const value = this._getCurrentValue();
    const newValue = this._testValue(value, this.props);
    if (this.props.onValueChange && this.oldValue !== value) {
      this.oldValue = value;
      if (NativeModules.TYRCTHapticsManager && isVibration) {
        if (newValue === minimumValue || newValue === maximumValue) {
          NativeModules.TYRCTHapticsManager.impact('Heavy');
        }
      }
      this.props.onValueChange(newValue);
    }
    if (this.props.onScrollEvent) {
      this.props.onScrollEvent({ value: newValue });
    }
  }

  _fireChangeEvent(event) {
    const { isVibration, minimumValue, maximumValue } = this.props;
    const value = this._getCurrentValue();
    const newValue = this._testValue(value, this.props);
    if (this.props[event]) {
      if (event === 'onSlidingComplete' && NativeModules.TYRCTHapticsManager && isVibration) {
        if (newValue === minimumValue || newValue === maximumValue) {
          NativeModules.TYRCTHapticsManager.impact('Heavy');
        }
      }
      this.props[event](newValue);
    }
    if (this.props.onScrollEvent) {
      this.props.onScrollEvent({ value: newValue });
    }
  }

  _getTouchOverflowSize() {
    const { state, props } = this;
    const size: { width?: number; height?: number } = {};
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
    const touchOverflowStyle: {
      marginTop?: number;
      marginBottom?: number;
      marginLeft?: number;
      marginRight?: number;
      backgroundColor?: string;
      opacity?: number;
    } = {};
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
    const { value, containerSize, thumbSize, allMeasured } = this.state;
    const mainStyles = styles || defaultStyles;
    const valueVisibleStyle: { opacity?: number } = {};
    let containerStyle = {};
    let minimumTrackStyle = {};
    let thumbTransformStyle = {};
    let thumbTranslate: any = 0;

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
          renderToHardwareTextureAndroid
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
  // @ts-ignore
  <Slider {..._props} ref={_props.sliderRef} horizontal={false} styles={verticalStyles} />
);

// @ts-ignore
Slider.Horizontal = _props => <Slider {..._props} ref={_props.sliderRef} horizontal />;

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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  // eslint-disable-next-line
  track: {
    borderRadius: TRACK_SIZE / 2,
    height: TRACK_SIZE,
  },
  // eslint-disable-next-line
  thumb: {
    borderRadius: THUMB_SIZE / 2,
    elevation: 2,
    height: THUMB_SIZE,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    width: THUMB_SIZE,
  },
  touchArea: {
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  debugThumbTouchArea: {
    backgroundColor: 'green',
    opacity: 0.5,
    position: 'absolute',
  },
  parcelNumStyle: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export const verticalStyles = StyleSheet.create({
  // eslint-disable-next-line
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  // eslint-disable-next-line
  track: {
    borderRadius: TRACK_SIZE / 2,
    width: TRACK_SIZE,
  },
  // eslint-disable-next-line
  thumb: {
    borderRadius: THUMB_SIZE / 2,
    elevation: 2,
    height: THUMB_SIZE,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    width: THUMB_SIZE,
  },
});
