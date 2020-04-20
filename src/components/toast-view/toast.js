import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Text,
  View,
  Image,
  StyleSheet,
  Easing,
  Dimensions,
  ViewPropTypes,
} from 'react-native';

const { width } = Dimensions.get('window');

class ToastView extends React.PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    imageStyle: Image.propTypes.style,
    text: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onFinish: PropTypes.func.isRequired,
    showPosition: PropTypes.oneOf(['top', 'bottom', 'center']),
    image: PropTypes.number,
    children: PropTypes.any,
  };

  static defaultProps = {
    style: null,
    contentStyle: null,
    textStyle: null,
    imageStyle: null,
    text: '',
    showPosition: 'bottom',
    image: null,
    children: null,
  };

  constructor(props) {
    super(props);
    this._timerId = null;
    this.state = {
      fadeValue: new Animated.Value(0),
      text: props.text,
      show: props.show,
    };
  }

  componentDidMount() {
    const { show, text } = this.props;
    if (typeof show !== 'undefined') {
      this.setState({ show, text });
      if (show) {
        this.startShowAnimation();
      }
    }
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
    this._timerId && clearTimeout(this._timerId);
  }

  startShowAnimation = () => {
    this.state.fadeValue.setValue(0);
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
    }).start(() => this.timer());
  };

  startHideAnimation = () => {
    this.state.fadeValue.setValue(1);
    Animated.timing(this.state.fadeValue, {
      toValue: 0,
      duration: 250,
      easing: Easing.linear,
    }).start();
  };

  timer = () => {
    clearTimeout(this._timerId);
    this._timerId = setTimeout(() => this.props.onFinish(), 2000);
  };

  render() {
    const {
      style,
      contentStyle,
      textStyle,
      imageStyle,
      showPosition = 'bottom',
      image,
      children,
    } = this.props;
    const { text } = this.state;
    let position = { justifyContent: 'flex-end' };
    if (showPosition === 'top') {
      position = { justifyContent: 'flex-start' };
    } else if (showPosition === 'center') {
      position = { justifyContent: 'center' };
    }
    return (
      <View style={[styles.container, style, position]} pointerEvents="none">
        <Animated.View
          style={[
            styles.textBg,
            contentStyle,
            {
              opacity: this.state.fadeValue,
            },
          ]}
        >
          {typeof image === 'number' && <Image style={[styles.image, imageStyle]} source={image} />}
          {children}
          {text ? <Text style={[styles.text, textStyle]}>{text}</Text> : null}
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

  textBg: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
    borderRadius: 20,
    marginBottom: 64,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },

  image: {
    marginBottom: 6,
  },

  text: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default ToastView;
