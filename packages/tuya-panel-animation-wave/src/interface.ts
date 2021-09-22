import { Animated, ViewStyle, StyleProp } from 'react-native';

export interface WaveViewProps {
  /**
   * @description.zh 水波高度（百分比）
   * @description.en Water wave height (percentage)
   * @default 50
   */
  H?: number;
  /**
   * @description.zh 水波数组: [{ A: 波峰高度, T: 单组波峰+波谷长度, fill: 填充色 }]
   * @description.en Wave array: [{ A: height of crest, T: length of single group of crest + trough, fill: fill color }]
   * @default []
   */
  waveParams?: { A: number; T: number; fill: string }[];
  /**
   * @description.zh 内容样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @description.en Container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default { justifyContent: 'center', alignItems: 'center' }
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 是否挂载后立刻运动
   * @description.en Whether to exercise immediately after mounting
   * @default true
   */
  animated?: boolean;
  /**
   * @description.zh 动画配置项
   * @description.en Animation configuration items
   * @default { easing: Easing.linear, duration: 5000, delay: 2000, isInteraction: true, useNativeDriver: true }
   */
  animationConfig?: {
    easing?: (...args: any[]) => any;
    duration?: number;
    delay?: number;
    isInteraction?: boolean;
    useNativeDriver?: boolean;
  };
}

type EndResult = { finished: boolean };
type EndCallback = (result: EndResult) => void;

export interface CompositeAnimation {
  start: (callback?: EndCallback) => void;
  stop: () => void;
  reset: () => void;
}

export interface DrawerStateTypes {
  boxLeft: Animated.Value;
  maskOpacity: Animated.Value;
  maskState: boolean;
}

export interface WaveViewStateTypes {
  H?: number;
  waveParams?: { A: number; T: number; fill: string }[];
  style?: { width: number };
}
