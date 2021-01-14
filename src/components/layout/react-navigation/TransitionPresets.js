import { Animated } from 'react-native';
import {
  TransitionPresets as originTransitionPresets,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

const { add, multiply } = Animated;

const SlideFromRightWithMargin = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, inverted, layouts: { screen }, insets }) => {
    const isLandscape = screen.width > screen.height;
    const topOffset = isLandscape ? 0 : 10;
    const translateFocused = multiply(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [screen.width, 0],
        extrapolate: 'clamp',
      }),
      inverted
    );

    const progress = add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 0
    );

    const translateUnfocused = next
      ? multiply(
          next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, screen.width * -1],
            extrapolate: 'clamp',
          }),
          inverted
        )
      : 0;

    const overlayOpacity = progress.interpolate({
      inputRange: [0, 1, 1.0001, 2],
      outputRange: [0, 0.3, 1, 1],
    });

    const statusBarHeight = insets.top;

    return {
      cardStyle: {
        flex: 1,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: statusBarHeight + topOffset,
        marginBottom: topOffset,
        transform: [{ translateX: translateFocused }, { translateX: translateUnfocused }],
      },
      overlayStyle: { opacity: overlayOpacity },
    };
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};

export default {
  ...originTransitionPresets,
  SlideFromRightWithMargin,
};
