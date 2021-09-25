import { StyleProp, ViewStyle, Animated } from 'react-native';

export interface DrawerPropTypes {
  /**
   * @description.zh 抽屉是否打开
   * @description.en Drawer open
   * @default false
   */
  visible?: boolean;
  /**
   * @description.zh 自定义子组件
   * @description.en Customize child components
   * @default null
   */
  children?: React.ReactNode;
  /**
   * @description.zh 遮罩样式
   * @description.en Mask style
   * @default null
   */
  maskStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 抽屉样式
   * @description.en Drawer style
   * @default null
   */
  drawerStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 最外层容器
   * @description.en Outermost container
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 抽屉出现方向
   * @description.en Direction of drawer appearance
   * @default 'left'
   */
  placement?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * @description.zh 点击遮罩回调
   * @description.en Click the mask callback
   * @default null
   */
  onMaskPress?: () => void;
  /**
   * @description.zh 抽屉状态回调
   * @description.en Drawer state callback
   * @default null
   */
  onStateChange?: (visible?: boolean) => void;
  /**
   * @description.zh 抽屉的宽度
   * @description.en Width
   * @default winWidth / 2
   */
  width?: number;
  /**
   * @description.zh 抽屉的高度
   * @description.en Height
   * @default winHeight
   */
  height?: number;
  /**
   * @description.zh 点击蒙层是否允许关闭
   * @description.en Click on whether the mask is allowed to close
   * @default true
   */
  maskClosable?: boolean;
  /**
   * @description.zh 抽屉弹出是否伴随遮罩
   * @description.en Drawer ejection is accompanied by a mask
   * @default true
   */
  hasMask?: boolean;
  /**
   * @description.zh 动画配置
   * @description.en Animation configuration
   * @default { easing: Easing.linear, duration: 400, delay: 0, isInteraction: true }
   */
  animationConfig?: {
    easing?: (...args: any[]) => any;
    duration?: number;
    delay?: number;
    isInteraction?: boolean;
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
