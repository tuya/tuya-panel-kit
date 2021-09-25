import { ViewStyle, StyleProp } from 'react-native';

export interface DiffusionProps {
  /**
   * @description.zh 波纹颜色
   * @description.en Corrugated color
   * @default '#00FF00'
   */
  color?: string;
  /**
   * @description.zh 最内圈波纹半径
   * @description.en Innermost circle circle radius
   * @default cx(50)
   */
  radius?: number;
  /**
   * @description.zh 最外圈波纹大小
   * @description.en Outermost circle ripple size
   * @default cx(100)
   */
  maxRadius?: number;
  /**
   * @description.zh 波纹宽度大小
   * @description.en Ripple width
   * @default cx(5)
   */
  width?: number;
  /**
   * @description.zh 波纹循环一次条数
   * @description.en Number of ripple cycles at a time
   * @default 2
   */
  number?: number;
  /**
   * @description.zh 波纹循环间隔时间
   * @description.en Time between ripple cycles
   * @default 1000
   */
  mainDelay?: number;
  /**
   * @description.zh 间隔多久进行循环，为 0 代表持续循环
   * @description.en How often do you cycle? A value of 0 is continuous
   * @default 0
   */
  intervalTime?: number;
  /**
   * @description.zh 开始动画标志
   * @description.en Start animation flag
   * @default true
   */
  startAnimated?: boolean;
  /**
   * @description.zh 容器样式
   * @description.en
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 渲染自定义内容
   * @description.en The container style
   * @default null
   */
  children?: React.ReactNode;
  /**
   * @description.zh 动画配置项
   * @description.en Animation configuration
   * @default { easing: Easing.bezier(0, 0, 0.25, 1), duration: 2000, delay: 0, isInteraction: true, useNativeDriver: false }
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
