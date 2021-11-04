import { StyleProp, ViewStyle, Animated } from 'react-native';

export interface IThemeSlider extends ISliderProps {
  /**
   * @description.zh 主题配置
   * @description.en Theme configuration
   * @defaultValue {}
   */
  theme?: {
    width?: number;
    trackRadius?: number;
    trackHeight?: number;
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
    thumbSize?: number;
    thumbRadius?: number;
    thumbTintColor?: string;
  };
}

export interface ISliderProps {
  /**
   * @description.zh 测试标识
   * @description.en Test identification
   * @defaultValue "Slider"
   */
  accessibilityLabel?: string;
  /**
   * @description.zh onLayout 回调
   * @description.en onLayout callback
   * @defaultValue undefined
   */
  onLayout?: (x: number) => void;
  /**
   * @description.zh 当前值
   * @description.en value
   * @defaultValue 0
   */
  value?: number;
  /**
   * @description.zh 是否禁用
   * @description.en Whether to disable or not.
   * @defaultValue undefined
   */
  disabled?: boolean;
  /**
   * @description.zh 最小值
   * @description.en The minimum value.
   * @defaultValue 0
   */
  minimumValue?: number;
  /**
   * @description.en 最大值
   * @description.en The maximum value.
   * @defaultValue 1
   */
  maximumValue?: number;
  /**
   * @description.zh 步长，取值必须大于 0，并且可被 (max - min) 整除
   * @description.en Step length. Must be exactly divisible by minimumValue and maximumValue.
   * @defaultValue 0
   */
  stepValue?: number;
  /**
   * @description.zh 是否翻转数值
   * @description.en Whether to flip the value
   * @defaultValue false
   */
  reverseValue?: boolean;
  /**
   * @description.zh 小于当前值的轨道颜色
   * @description.en Track color that is less than the current value.
   * @defaultValue '#3f3f3f'
   */
  minimumTrackTintColor?: string;
  /**
   * @description.zh 大于当前值的轨道颜色
   * @description.en Track color that is greater than the current value.
   * @defaultValue '#b3b3b3'
   */
  maximumTrackTintColor?: string;
  /**
   * @description.zh 滑块颜色
   * @description.en The color used to tint the default thumb images on iOS, or the color of the foreground switch grip on Android.
   * @defaultValue '#343434'
   */
  thumbTintColor?: string;
  /**
   * @description.zh 滑块大小
   * @description.en Thumb size
   * @defaultValue { width: 40, height: 40 }
   */
  thumbTouchSize?: {
    width: number;
    height: number;
  };
  /**
   * @description.zh 滑动值变更回调
   * @description.en Callback of changing the sliding value.
   * @defaultValue undefined
   */
  onValueChange?: (newValue: number) => void;
  /**
   * @description.zh 滑动开始回调
   * @description.en Callback of starting the slide.
   * @defaultValue undefined
   */
  onSlidingStart?: (newValue: number) => void;
  /**
   * @description.zh 滑动结束回调
   * @description.en Callback of ending the slide.
   * @defaultValue () => {}
   */
  onSlidingComplete?: (newValue: number) => void;
  /**
   * @description.zh 滑动事件
   * @description.en Sliding events
   * @defaultValue undefined
   */
  onScrollEvent?: ({ value: number }) => void;
  /**
   * @description.zh 容器样式
   * @description.en Container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue undefined
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 通用的轨道样式
   * @description.en General track style.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue undefined
   */
  trackStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 滑块样式
   * @description.en Style of the thumb.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue undefined
   */
  thumbStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 是否开启调试区域
   * @description.en Do you want to open the debugging area
   * @defaultValue false
   */
  debugTouchArea?: boolean;
  /**
   * @description.zh 是否只显示大于当前值的轨道颜色
   * @description.en Whether to display only track colors that are greater than the current value.
   * @defaultValue false
   */
  onlyMaximumTrack?: boolean;
  /**
   * @description.zh 触摸轨道是否可以更改值
   * @description.en Whether the value can be changed by touching the track.
   * @defaultValue false
   */
  canTouchTrack?: boolean;
  /**
   * @description.zh 是否添加动画滑动效果
   * @description.en Add animation slide effect
   * @defaultValue false
   */
  animateTransitions?: boolean;
  /**
   * @description.zh 动画类型，spring 弹性动画或 timing 线性动画
   * @description.en Animation type, spring elastic animation or timing linear animation
   * @defaultValue 'timing'
   */
  animationType?: 'spring' | 'timing';
  /**
   * @description.zh 动画配置
   * @description.en Animation configuration
   * @defaultValue undefined
   */
  animationConfig?: {
    friction?: number;
    tension?: number;
    duration?: number;
    easing?: () => void;
    delay?: number;
  };
  /**
   * @description.zh 定制渲染小于当前值的轨道
   * @description.en Custom rendering of the tracks less than the current value.
   * @defaultValue undefined
   */
  renderMinimumTrack?: () => React.ReactNode;
  /**
   * @description.zh 定制渲染大于当前值的轨道
   * @description.en Custom rendering of the tracks greater than the current value.
   * @defaultValue undefined
   */
  renderMaximumTrack?: () => React.ReactNode;
  /**
   * @description.zh 定制渲染滑块
   * @description.en Custom rendering of the thumb.
   * @defaultValue undefined
   */
  renderThumb?: () => React.ReactNode;
  /**
   * @description.zh 是否为水平方向
   * @description.en Is it horizontal
   * @defaultValue true
   */
  horizontal?: boolean;
  /**
   * @description.zh 滑动条样式集合
   * @description.en Slide bar styles collection
   * @defaultValue {}
   */
  styles?: {
    container?: StyleProp<ViewStyle>;
    track?: StyleProp<ViewStyle>;
    thumb?: StyleProp<ViewStyle>;
    touchArea?: StyleProp<ViewStyle>;
    debugThumbTouchArea?: StyleProp<ViewStyle>;
  };
  /**
   * @description.zh 滑块的类型，parcel：包裹类型
   * @description.en The type of slider, parcel: package type
   * @defaultValue normal
   */
  type?: 'normal' | 'parcel';
  /**
   * @description.zh 是否使用刻度
   * @description.en Whether to use the scale
   * @defaultValue false
   */
  useNoun?: boolean;
  /**
   * @description.zh 大于当前值的刻度样式
   * @description.en Scale style greater than the current value
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  maxNounStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 小于当前值的刻度样式
   * @description.en Scale style less than current value
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  minNounStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Whether to support click vibration
   * @description.zh 是否支持点按震动
   * @default true
   */
  isVibration?: boolean;
}

export interface ISliderState {
  containerSize: { width: number; height: number };
  trackSize: { width: number; height: number };
  thumbSize: { width: number; height: number };
  allMeasured: boolean;
  value: Animated.Value;
  actualValue: number;
}

export const sliderDefault = {
  accessibilityLabel: 'Slider',
  value: 0,
  minimumValue: 0,
  maximumValue: 1,
  stepValue: 0,
  reverseValue: false,
  minimumTrackTintColor: '#3f3f3f',
  maximumTrackTintColor: '#b3b3b3',
  thumbTintColor: '#343434',
  thumbTouchSize: { width: 40, height: 40 },
  canTouchTrack: false,
  animateTransitions: false,
  debugTouchArea: false,
  animationType: 'timing',
  horizontal: true,
  onlyMaximumTrack: false, // 大小滑动条一致时, 可以设置为True, 优化性能
  type: 'normal',
  useNoun: false,
  maxNounStyle: null,
  minNounStyle: null,
};
