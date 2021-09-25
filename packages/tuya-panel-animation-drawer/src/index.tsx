import _ from 'lodash';
import React, { Component } from 'react';
import { View, Animated, PanResponder, GestureResponderEvent } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { createAnimation, DRAWER_DEFAULT_ANIMATION_CONFIG } from './utils';
import { DrawerPropTypes, DrawerStateTypes } from './interface';

const { winWidth, winHeight } = Utils.RatioUtils;

export default class Drawer extends Component<DrawerPropTypes, DrawerStateTypes> {
  static defaultProps: DrawerPropTypes = {
    visible: false,
    maskStyle: {
      width: winWidth,
      height: winHeight,
      backgroundColor: 'rgba(0,0,0,0.6)',
      position: 'absolute',
    },
    drawerStyle: {
      backgroundColor: '#F8F8F8',
    },
    style: {},
    placement: 'left',
    hasMask: true,
    maskClosable: true,
    children: null,
    onMaskPress: () => null,
    onStateChange: () => null,
    width: winWidth / 2,
    height: winHeight,
    animationConfig: DRAWER_DEFAULT_ANIMATION_CONFIG,
  };

  constructor(props: DrawerPropTypes) {
    super(props);
    const { placement, visible } = props;
    this.direction = ['left', 'right'].includes(placement) ? 'row' : 'column';
    this.range = ['left', 'right'].includes(placement) ? winWidth : winHeight;
    this.endOnce = true;
    this.state = {
      boxLeft: new Animated.Value(visible ? 0 : -this.range),
      maskOpacity: new Animated.Value(+visible),
      maskState: visible,
    };
  }

  componentWillReceiveProps = (nextProps: DrawerPropTypes) => {
    const { placement, visible, onStateChange } = nextProps;
    if (placement !== this.props.placement) {
      this.direction = ['left', 'right'].includes(placement) ? 'row' : 'column';
      this.range = ['left', 'right'].includes(placement) ? winWidth : winHeight;
    }
    if (visible !== this.props.visible) {
      const animationConfig = {
        ...DRAWER_DEFAULT_ANIMATION_CONFIG,
        ...nextProps.animationConfig,
      };
      const { duration, delay, easing, isInteraction } = animationConfig;
      this.setState({ maskState: true }, () => {
        Animated.parallel([
          createAnimation({
            value: this.state.boxLeft,
            toValue: visible ? 0 : -this.range,
            duration,
            delay,
            easing,
            useNativeDriver: false,
            isInteraction,
          }),
          createAnimation({
            value: this.state.maskOpacity,
            toValue: +visible,
            duration,
            delay,
            easing,
            useNativeDriver: false,
            isInteraction,
          }),
        ]).start(() => {
          if (!visible) {
            this.setState({ maskState: false });
            this.endOnce = true;
          }
          typeof onStateChange === 'function' && onStateChange(visible);
        });
      });
      if (!visible) {
        this.boxLeft = 0;
      }
    }
  };

  range: number;
  boxLeft: number;
  endOnce: boolean;
  direction: string;

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderGrant: () => true,
    onPanResponderMove: () => false,
    onPanResponderRelease: _.throttle(evt => this._handleRelease(evt), 1000, {
      leading: true,
      trailing: false,
    }),
  });

  _handleRelease = (evt: GestureResponderEvent) => {
    const { visible, onMaskPress } = this.props;
    this.endOnce = false;
    if (this.endOnce || !visible || !evt || !evt.nativeEvent) return;
    typeof onMaskPress === 'function' && onMaskPress();
  };

  render() {
    const {
      maskStyle,
      drawerStyle,
      width,
      height,
      children,
      placement,
      hasMask,
      style,
    } = this.props;
    return (
      <View
        style={[
          {
            position: 'absolute',
            [['left', 'right'].includes(placement) ? 'top' : 'left']: 0,
            [placement]: 0,
          },
          style,
        ]}
      >
        {hasMask && this.state.maskState && (
          <Animated.View
            style={[
              { [['left', 'right'].includes(placement) ? 'top' : 'left']: 0 },
              maskStyle,
              { [placement]: 0, opacity: this.state.maskOpacity },
            ]}
            {...this._panResponder.panHandlers}
          />
        )}
        <Animated.View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            [['left', 'right'].includes(placement) ? 'top' : 'left']: 0,
            [placement]: this.state.boxLeft,
          }}
        >
          <View style={[drawerStyle, { width, height }]}>{children}</View>
        </Animated.View>
      </View>
    );
  }
}
