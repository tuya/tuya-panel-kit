import { Animated } from 'react-native';
import {
  TransitionPresets as originTransitionPresets,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { RatioUtils } from '../../../utils';

const { add, multiply } = Animated;
const { isIphoneX, isIos } = RatioUtils;

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

    const overlayOpacity = progress.interpolate({
      inputRange: [0, 0.3, 0.6, 1, 1.3, 1.7, 2],
      outputRange: [0, 0.1, 0.2, 0.3, 0.2, 0.1, 0],
    });

    const statusBarHeight = insets.top - (isIos ? 44 : 0);

    return {
      cardStyle: {
        flex: 1,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: statusBarHeight + topOffset,
        transform: [{ translateX: translateFocused }],
      },
      overlayStyle: { opacity: overlayOpacity },
    };
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};

export const ModalPresentationIOS = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ index, current, next, inverted, layouts: { screen }, insets }) => {
    const isLandscape = screen.width > screen.height;
    const topOffset = isLandscape ? 0 : 10;
    const statusBarHeight = insets.top - (isIos ? 44 : 0);
    const aspectRatio = screen.height / screen.width;

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

    const translateY = multiply(
      progress.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [
          screen.height,
          index === 0 ? 0 : topOffset,
          (index === 0 ? statusBarHeight : 0) - topOffset * aspectRatio,
        ],
      }),
      inverted
    );

    const overlayOpacity = progress.interpolate({
      inputRange: [0, 0.5, 0.9, 1, 2],
      outputRange: [0, 0.1, 0.2, 0.3, 0.3],
    });

    const scale = isLandscape
      ? 1
      : progress.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [1, 1, screen.width ? 1 - (topOffset * 2) / screen.width : 1],
        });

    const borderRadius = isLandscape
      ? 0
      : index === 0
      ? progress.interpolate({
          inputRange: [0, 1, 1.0001, 2],
          outputRange: [0, 0, isIphoneX ? 38 : 0, 10],
        })
      : 10;

    return {
      cardStyle: {
        overflow: 'hidden',
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        marginTop: index === 0 ? 0 : statusBarHeight,
        marginBottom: index === 0 ? 0 : topOffset,
        transform: [{ translateY }, { scale }],
      },
      overlayStyle: { opacity: overlayOpacity },
    };
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};

export default {
  ...originTransitionPresets,
  SlideFromRightWithMargin,
  ModalPresentationIOS,
};
