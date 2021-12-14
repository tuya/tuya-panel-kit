import { StyleProp, ViewStyle, Animated } from 'react-native';

export interface MotionProps {
  /**
   * @description.zh 内容样式
   * @description.en Container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 是否显示内容
   * @description.en Display content?
   * @default undefined
   */
  show?: boolean;
  /**
   * @description.zh 自定义内容
   * @description.en Custom content
   * @default undefined
   */
  children?: React.ReactNode;
  /**
   * @description.zh 动画显示时长
   * @description.en Animation display duration
   * @default 300
   */
  showDuration?: number;
  /**
   * @description.zh 动画隐藏时长
   * @description.en Animation hide duration
   * @default 300
   */
  hideDuration?: number;
  /**
   * @description.zh 动画显示回调
   * @description.en Animation display callback
   * @default () => {}
   */
  onShow?: () => void;
  /**
   * @description.zh 动画隐藏回调
   * @description.en Animation hide callback
   * @default () => {}
   */
  onHide?: () => void;
  /**
   * @description.zh 动画配置参数
   * @description.en Animation configuration parameters
   * @default { duration: 300, delay: 0, isInteraction: true, useNativeDriver: true }
   */
  animationConfig?: {
    duration?: number;
    delay?: number;
    isInteraction?: boolean;
    useNativeDriver?: boolean;
  };
}

// Fade
export interface MotionFadeProps extends MotionProps {
  /**
   * @description.zh 动画不透明度
   * @description.en Animation opacity
   * @default 1
   */
  fadeOpacity?: number;
}

export interface MotionFadeState {
  show: boolean;
  opacity: Animated.Value;
  isAnimating: boolean;
}

// PullUp
export interface MotionPullUpProps extends MotionProps {
  /**
   * @description.zh 下拉的高度
   * @description.en Height of pull down
   * @default undefined
   */
  dropHeight?: number;
}

export interface MotionPullUpState {
  show: boolean;
  animatedY: Animated.Value;
  measuredHeight: number;
}

// PushDown
export interface MotionPushDownProps extends MotionProps {
  /**
   * @description.zh 下拉的高度
   * @description.en Height of pull down
   * @default 200
   */
  dropHeight?: number;
  /**
   * @description.zh 是否竖直居中
   * @description.en Is it vertically centered
   * @default true
   */
  isAlign?: boolean;
}

export interface MotionPushDownState {
  show: boolean;
  dropHeight: Animated.Value;
  isAnimating: boolean;
}

// ScaleFadeIn
export interface MotionScaleFadeInProps extends MotionProps {
  /**
   * @description.zh 初始缩放倍数
   * @description.en Initial zoom factor
   * @default 0
   */
  initScale?: number;
  /**
   * @description.zh 动画结束缩放倍数
   * @description.en Animation end zoom multiple
   * @default 0
   */
  finalScale?: number;
  /**
   * @description.zh 是否竖直居中
   * @description.en Is it vertically centered
   * @default true
   */
  isAlign?: boolean;
  /**
   * @description.zh 向左平移的距离，tips 气泡模拟 transform-origin 属性
   * @description.en The distance to the left, the tips bubble simulates the transform origin attribute
   * @default null
   */
  width?: number;
  /**
   * @description.zh 向上平移的距离，tips气泡模拟transform-origin属性
   * @description.en Up translation distance, tips bubble simulates transform origin attribute
   * @default null
   */
  height?: number;
}

export interface MotionScaleFadeInState {
  show: boolean;
  scale: Animated.Value;
  opacity: Animated.Value;
  isAnimating: boolean;
  translateX: Animated.Value;
  translateY: Animated.Value;
}

// ScalePullDown
export interface MotionScalePullDownProps extends MotionProps {
  /**
   * @description.zh 初始缩放倍数
   * @description.en Initial zoom factor
   * @default 0
   */
  initScale?: number;
  /**
   * @description.zh 是否竖直居中
   * @description.en Is it vertically centered
   * @default true
   */
  isAlign?: boolean;
}

export interface MotionScalePullDownState {
  show: boolean;
  scale: Animated.Value;
  opacity: Animated.Value;
  dropHeight: Animated.Value;
  measuredHeight: number;
  isAnimating: boolean;
}

export interface MotionToastProps extends Omit<MotionProps, 'onHide' | 'onShow'> {
  /**
   * @description.zh 初始缩放倍数
   * @description.en Initial zoom factor
   * @default 0.5
   */
  initScale?: number;
  /**
   * @description.zh 动画结束回调
   * @description.en Animation end callback
   * @default undefined
   */
  onFinish?: () => void;
}

export interface MotionToastState {
  fadeValue: Animated.Value;
  scale: Animated.Value;
  show: boolean;
}
