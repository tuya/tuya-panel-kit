Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactNative = require('react-native');

var _stack = require('@react-navigation/stack');

var add = _reactNative.Animated.add,
    multiply = _reactNative.Animated.multiply;


var SlideFromRightWithMargin = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: _stack.TransitionSpecs.TransitionIOSSpec,
    close: _stack.TransitionSpecs.TransitionIOSSpec
  },
  cardStyleInterpolator: function cardStyleInterpolator(_ref) {
    var current = _ref.current,
        next = _ref.next,
        inverted = _ref.inverted,
        screen = _ref.layouts.screen,
        insets = _ref.insets;

    var isLandscape = screen.width > screen.height;
    var topOffset = isLandscape ? 0 : 10;
    var translateFocused = multiply(current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.width, 0],
      extrapolate: 'clamp'
    }), inverted);

    var progress = add(current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    }), next ? next.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    }) : 0);

    var overlayOpacity = progress.interpolate({
      inputRange: [0, 1, 1.0001, 2],
      outputRange: [0, 0.3, 1, 1]
    });

    var statusBarHeight = insets.top;

    return {
      cardStyle: {
        flex: 1,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: statusBarHeight + topOffset,
        marginBottom: topOffset,
        transform: [{ translateX: translateFocused }]
      },
      overlayStyle: { opacity: overlayOpacity }
    };
  },
  headerStyleInterpolator: _stack.HeaderStyleInterpolators.forFade
};

exports.default = _extends({}, _stack.TransitionPresets, {
  SlideFromRightWithMargin: SlideFromRightWithMargin
});