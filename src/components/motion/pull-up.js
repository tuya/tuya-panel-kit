import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, Easing, ViewPropTypes, Dimensions } from 'react-native';

const { height: winHeight } = Dimensions.get('window');

const DEFAULT_ANIMATION_CONFIG = {
  duration: 300,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};

class PullUp extends PureComponent {
  static displayName = 'Motion.PullUp';
  static propTypes = {
    style: ViewPropTypes.style,
    show: PropTypes.bool,
    dropHeight: PropTypes.number,
    children: PropTypes.element.isRequired,
    showDuration: PropTypes.number,
    hideDuration: PropTypes.number,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    animationConfig: PropTypes.shape({
      duration: PropTypes.number,
      easing: PropTypes.func,
      delay: PropTypes.number,
      isInteraction: PropTypes.bool,
      useNativeDriver: PropTypes.bool,
    }),
  };

  static defaultProps = {
    style: null,
    show: undefined,
    dropHeight: undefined,
    showDuration: 300,
    hideDuration: 300,
    onShow: () => {},
    onHide: () => {},
    animationConfig: DEFAULT_ANIMATION_CONFIG,
  };

  constructor(props) {
    super(props);
    this._isAnimating = false;
    this.state = {
      show: props.show,
      animatedY: new Animated.Value(0),
      measuredHeight: props.dropHeight,
    };
  }

  componentDidMount() {
    if (this.state.show && typeof this.state.measuredHeight === 'number') {
      this.startShowAnimation();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof this.state.measuredHeight !== 'number') {
      return;
    }
    const { show } = nextProps;
    if (!this._isAnimating && typeof show !== 'undefined' && show !== this.state.show) {
      this.startAnimation(show);
    }
  }

  componentWillUnmount() {
    this.state.animatedY.stopAnimation();
  }

  startAnimation = show => {
    if (show) {
      this.setState({ show: true }, this.startShowAnimation);
    } else {
      this.startHideAnimation();
    }
  };

  startShowAnimation = () => {
    this._isAnimating = true;
    const { onShow, showDuration } = this.props;
    const animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...this.props.animationConfig };
    Animated.timing(this.state.animatedY, {
      toValue: 1,
      ...animationConfig,
      showEasing: Easing.bezier(0, 0, 0.25, 1),
      duration: showDuration,
    }).start(({ finished }) => {
      if (finished) {
        this._isAnimating = false;
        typeof onShow === 'function' && onShow();
      }
    });
  };

  startHideAnimation = () => {
    this._isAnimating = true;
    const { onHide, hideDuration } = this.props;
    const animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...this.props.animationConfig };
    Animated.timing(this.state.animatedY, {
      toValue: 0,
      ...animationConfig,
      hideEasing: Easing.bezier(0.38, 0, 0.25, 1),
      duration: hideDuration,
    }).start(({ finished }) => {
      if (finished) {
        this.setState({ show: false }, () => {
          this._isAnimating = false;
          typeof onHide === 'function' && onHide();
        });
      }
    });
  };

  render() {
    const { style, children } = this.props;
    if (!this.state.show || !React.isValidElement(children)) {
      return null;
    }
    return (
      <Animated.View
        style={[
          styles.container,
          style,
          {
            transform: [
              {
                translateY: this.state.animatedY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.measuredHeight || winHeight, 0],
                }),
              },
            ],
          },
        ]}
      >
        {React.cloneElement(children, {
          onLayout: ({ nativeEvent: { layout } }) => {
            if (
              layout &&
              typeof this.state.measuredHeight === 'undefined' &&
              typeof layout.height === 'number'
            ) {
              this.setState({ measuredHeight: layout.height }, () => {
                this.startAnimation(this.state.show);
              });
            }
          },
        })}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default PullUp;
