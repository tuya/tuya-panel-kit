import { Animated, Easing, EasingFunction } from 'react-native';
import { CompositeAnimation } from './interface';

export const createAnimation = (params: {
  value: Animated.Value;
  toValue: number;
  duration: number;
  delay: number;
  easing: EasingFunction;
  useNativeDriver: boolean;
  isInteraction: boolean;
}): CompositeAnimation => {
  const { value, toValue, duration, delay, easing, useNativeDriver, isInteraction } = params;
  return Animated.timing(value, {
    toValue,
    duration: duration || 400,
    delay: delay || 0,
    easing: easing || Easing.linear,
    useNativeDriver: useNativeDriver || false,
    isInteraction: isInteraction || false,
  });
};

export const DIFFUSION_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.bezier(0, 0, 0.25, 1),
  duration: 2000,
  delay: 0,
  isInteraction: true,
  useNativeDriver: false,
};
