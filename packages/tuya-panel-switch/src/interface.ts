import { ViewStyle, StyleProp, TextStyle, Animated, ColorValue } from 'react-native';

export interface IThemeSwitchProps extends ISwitchProps {
  /**
   * @description.zh 主题配置
   * @description.en Theme configuration
   * @default null
   */
  theme?: {
    width?: number;
    height?: number;
    thumbSize?: number;
    margin?: number | number[];
    tintColor?:
      | string
      | {
          [key: string]: string;
        };
    onTintColor?: string;
    thumbTintColor?: string;
    onThumbTintColor?: string;
  };
}

export interface ISwitchProps {
  /**
   * @description.zh 容器样式
   * @description.en Specify the style of the container that wraps the SwitchButton
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 测试标识
   * @description.en Test identification
   * @default "SwitchButton"
   */
  accessibilityLabel?: string;
  /**
   * @description.zh 是否禁用
   * @description.en Whether to disable the SwitchButton.
   * @default false
   */
  disabled?: boolean;
  /**
   * @description.zh 当前选中的值，设置了该属性即为受控组件
   * @description.en The currently selected value. After this property is set, it is a controlled component.
   * @default undefined
   */
  value?: boolean;
  /**
   * @description.zh 默认选中的值
   * @description.en The value selected by default
   * @default true
   */
  default?: boolean;
  /**
   * @description.zh 设置 SwitchButton 的大小
   * @description.en Set the size of the development component
   * @default undefined
   */
  size?: {
    width?: number;
    height?: number;
    activeSize?: number;
    margin?: number;
    borderRadius?: number;
  };
  /**
   * @description.zh 改变 SwitchButton 值时执行此回调
   * @description.en This callback is executed when the switch combination value is changed.
   * @default undefined
   */
  onValueChange: (value: boolean) => void;
  /**
   * @description.zh 设置当 SwitchButton的 value 为 false 时背景颜色
   * @description.en Set the background color when the value of the SwitchButton is false.
   * @default '#e5e5e5'
   */
  tintColor?: ColorValue;
  /**
   * @description.zh 设置当 SwitchButton的 value 为 true 时颜色
   * @description.en Set the color when the value of the SwitchButton is true.
   * @default '#44DB5E'
   */
  onTintColor?: ColorValue;
  /**
   * @description.zh 设置当 SwitchButton 的 value 为 false 时 thumb 颜色
   * @description.en Set the color of the sliding button when the value of the SwitchButton is false.
   * @default "#fff"
   */
  thumbTintColor?: string;
  /**
   * @description.zh 设置当 SwitchButton 的 value 为 true 时 thumb 颜色，若没有设置则为 thumbTintColor 的值
   * @description.en Set the color of the sliding button when the value of the SwitchButton is true. It is the value of thumbTintColor if it is not set.
   * @default undefined
   */
  onThumbTintColor?: string;
  /**
   * @description.zh 设置当 SwitchButton 的 value 为 false 时边框颜色 当 SwitchButton 的 value 为 true 时边框颜色等于 onTintColor
   * @description.en Set the color of the border when the value of the sliding button is false.
   * @default "#e5e5e5"
   */
  borderColor?: string;
  /**
   * @description.zh 指定 thumb 的样式
   * @description.en Specify the style of the icon used for dragging in the switch.
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  thumbStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 是否使用 Native Driver
   * @description.en Whether to use Native Driver.
   * @default true
   */
  useNativeDriver?: boolean;
  /**
   * @description.zh SwitchButton 的 value 值为 false 时左侧显示的字符，超过 3 个字符则显示显示 2 个字符，其余显示…
   * @description.en When the value of SwitchButton is false, the characters displayed on the left side are displayed. If the value exceeds 3 characters, 2 characters are displayed, and the rest are displayed ...
   * @default "ON"
   */
  onText?: string;
  /**
   * @description.zh SwitchButton 的 value 值为 true 时右侧显示的字符，超过 3 个字符则显示显示 2 个字符，其余显示…
   * @description.en When the value of SwitchButton is true, the characters displayed on the right side are displayed. If the value exceeds 3 characters, 2 characters are displayed, and the rest are displayed ...
   * @default "OFF"
   */
  offText?: string;
  /**
   * @description.zh SwitchButton 的 value 值为 false 时左侧显示的字符样式
   * @description.en The character style displayed on the left when the value of SwitchButton is false
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @default null
   */
  onTextStyle?: StyleProp<TextStyle>;
  /**
   * @description.zh SwitchButton 的 value 值为 true 时右侧显示的字符样式
   * @description.en The character style displayed on the right when the value of SwitchButton is true
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @default null
   */
  offTextStyle?: StyleProp<TextStyle>;
  /**
   * @description.zh Switch 开关类型，默认不传，特殊情况传值 thumbMore
   * @description.en Switch Switch type, not transmitted by default, in special cases transmitted by thumbMore
   * @default null
   */
  switchType?: 'thumbMore' | string;
  /**
   * @description.zh 当 switchType = 'thumbMore' 时，开关左右定位的滑块样式
   * @description.en When switchType = 'thumbMore', switch the left and right positioning slider style
   * @default null
   */
  smallThumbStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh 滑块上的图标路径
   * @description.en Icon path on the slider
   * @default null
   */
  d?: string;
  /**
   * @description.zh 滑块上的图标大小
   * @description.en Size of the icon on the slider
   * @default 18
   */
  iconSize?: number;
  /**
   * @description.zh 滑块上的图标颜色
   * @description.en The icon color on the slider
   * @default null
   */
  iconColor?: string;
  /**
   * @description.en Whether to support click vibration
   * @description.zh 是否支持点按震动
   * @default true
   */
  isVibration?: boolean;
}

export interface ISwitchState {
  thumbLeft: Animated.Value;
  leftThumbHeight: Animated.Value;
  rightThumbHeight: Animated.Value;
  height?: number;
}

export const switchDefaults = {
  accessibilityLabel: 'SwitchButton',
  defaultValue: true,
  disabled: false,
  onTintColor: '#44DB5E',
  thumbTintColor: '#fff',
  tintColor: '#e5e5e5',
  borderColor: '#e5e5e5',
  thumbStyle: null,
  useNativeDriver: true,
  onText: '',
  offText: '',
  onTextStyle: null,
  offTextStyle: null,
  d: null,
  iconSize: 18,
  iconColor: null,
  switchType: null,
  smallThumbStyle: {},
  isVibration: true,
};
