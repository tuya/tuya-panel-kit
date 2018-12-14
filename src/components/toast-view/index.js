/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Easing,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default class ToastView extends React.PureComponent {

  static propTypes = {
    text: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onFinish: PropTypes.func.isRequired,
    showPosition: PropTypes.oneOf(['top', 'bottom', 'center']),
  }

  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
      text: props.text,
      show: props.show,
    };

    this.startShowAnimation = this.startShowAnimation.bind(this);
    this.startHideAnimation = this.startHideAnimation.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { show, text } = nextProps;
    if (typeof show !== 'undefined' && show !== this.state.show) {
      this.setState({ show, text });
      if (show) {
        this.startShowAnimation();
      } else {
        this.startHideAnimation();
      }
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  startShowAnimation = () => {
    this.state.fadeValue.setValue(0);
    Animated.timing(
      this.state.fadeValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.linear
      }
    ).start(() => this.timer());
  }

  startHideAnimation() {
    this.state.fadeValue.setValue(1);
    Animated.timing(
      this.state.fadeValue,
      {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }
    ).start();
  }

  timer() {
    setTimeout(() => this.props.onFinish(), 2000);
  }

  render() {
    const { showPosition = 'bottom' } = this.props;
    let position = { justifyContent: 'flex-end' };
    if (showPosition === 'top') {
      position = { justifyContent: 'flex-start' };
    } else if (showPosition === 'center') {
      position = { justifyContent: 'center' };
    }
    return (
      <View style={[styles.container, position]} pointerEvents="none">
        <Animated.View style={[styles.textbg, {
          opacity: this.state.fadeValue,
        }]}
        >
          <Text style={styles.text}>{this.state.text}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    width,
    top: 0,
  },

  textbg: {
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
    borderRadius: 20,
    marginBottom: 64,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 10,
    paddingBottom: 10,
  },

  text: {
    fontSize: 16,
    color: '#FFFFFF',
  }
});
