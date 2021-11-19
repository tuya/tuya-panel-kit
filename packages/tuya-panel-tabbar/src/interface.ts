import { StyleProp, ViewStyle, Animated } from 'react-native';
import { IGroupProps } from './radio-button/interface';

export interface TabBarProps extends Omit<IGroupProps, 'style' | 'onChange'> {
  /**
   * @description.zh 下划线的样式
   * @description.en Style of the underline.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default {}
   */
  underlineStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 单个 Tab 的样式
   * @description.en The style of a single tab
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default {}
   */
  tabStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 单个激活 Tab 的样式
   * @description.en The style of a single active tab
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default {}
   */
  tabActiveStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh Tab 外层容器样式
   * @description.en Outer container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default {}
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 激活值，如果给定了则成为受控组件，需搭配 onChange 使用
   * @description.en Activation value. If the parameter value is set, it becomes a controlled component. It needs to be used with onChange.
   * @default undefined
   */
  activeKey?: string | number;
  /**
   * @description.zh 默认的激活值，想成为非受控组件时使用
   * @description.en The default activation value. It is used when it is set to uncontrolled components
   * @default 0
   */
  defaultActiveKey?: string | number;
  /**
   * @description.zh 下划线是否居中
   * @description.en Is the underline centered
   * @default true
   */
  isUnderlineCenter?: boolean;
  /**
   * @description.zh Tab 切换的回调
   * @description.en Callback of tab switching.
   * @default () => {}
   */
  onChange?: (index: string) => void;
}

export interface ITabBarState {
  activeKey: string | number;
  underlineLeft: Animated.Value;
  underlineWidth: Animated.Value;
}

export interface CompositeAnimation {
  start: () => void;
  /**
   * Stops any running animation.
   */
  stop: () => void;
  /**
   * Stops any running animation and resets the value to its original.
   */
  reset: () => void;
}
