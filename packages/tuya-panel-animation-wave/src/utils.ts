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

export const WAVE_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.linear,
  duration: 5000,
  delay: 2000,
  isInteraction: true,
  useNativeDriver: true,
};
