/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  Animated,
  Easing,
} from 'react-native';

/**
 * 背景图旋转动画
 */
export default class RotationView extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    children: PropTypes.node,
    active: PropTypes.bool,
    duration: PropTypes.number,
    useNativeDriver: PropTypes.bool,
  };

  static defaultProps = {
    duration: 5000,
    active: true,
    useNativeDriver: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: props.active,
      rotationValue: new Animated.Value(0),
    };

    this.rotateV = 0;
    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
  }

  componentDidMount() {
    this.startAnimation();
  }

  componentWillReceiveProps(nextProps) {
    const { active } = nextProps;
    if (typeof active !== 'undefined' && active !== this.state.active) {
      this.setState({ active }, () => {
        if (active) {
          this.startAnimation();
        } else {
          this.stopAnimation();
        }
      });
    }
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  startAnimation() {
    if (this.isStateDisable) { return; }
    this.isStateDisable = true;

    if (!this.state.active) {
      this.isStateDisable = false;
      return;
    }

    this.state.rotationValue.setValue(this.rotateV);
    Animated.timing(
      this.state.rotationValue,
      {
        toValue: 1,
        duration: this.props.duration * (1 - this.rotateV),
        easing: Easing.linear,
        useNativeDriver: this.props.useNativeDriver,
      },
    ).start(() => {
      this.startAnimation();
    });
    this.rotateV = 0;
    this.isStateDisable = false;
  }

  stopAnimation() {
    this.state.rotationValue.stopAnimation(d => { this.rotateV = d; });
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, this.props.style, {
          transform: [{
            rotate: this.state.rotationValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          }],
        }]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
