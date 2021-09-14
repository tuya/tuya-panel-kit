import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;

export const IStudioDefaultProps = {
  buttonIconColor: '#158CFB',
  buttonIconSize: cx(32),
  buttonWidth: cx(140),
  buttonHeight: cx(48),
  buttonRadius: cx(24),
  buttonBgColor: '#FFF',
  minusDisabled: false,
  plusDisabled: false,
  value: 10,
  min: 0,
  max: 99,
  stepValue: 1,
  milliseconds: 500,
};

export interface IStudioStepCardProps {
  /**
   * @description.en Outermost container style
   * @description.zh 最外层容器样式
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.en Add and subtract button styles
   * @description.zh 加减按钮样式
   * @default null
   */
  buttonStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Add or subtract button width
   * @description.zh 加减按钮宽度
   * @default cx(140)
   */
  buttonWidth?: number;
  /**
   * @description.en Add and subtract button background colors
   * @description.zh 加减按钮高度
   * @default cx(48)
   */
  buttonHeight?: number;
  /**
   * @description.en
   * @description.zh 加减按钮圆角
   * @default
   */
  buttonRadius?: number;
  /**
   * @description.en
   * @description.zh 加减按钮背景色
   * @default
   */
  buttonBgColor?: string;
  /**
   * @description.en Subtraction button icon
   * @description.zh 减法按钮图标
   * @default null
   */
  minusIcon?: string;
  /**
   * @description.en Button icon color
   * @description.zh 按钮图标颜色
   * @default '#158CFB'
   */
  buttonIconColor?: string;
  /**
   * @description.en Add button icon
   * @description.zh 加法按钮图标
   * @default null
   */
  plusIcon?: string;
  /**
   * @description.en Button icon size
   * @description.zh 按钮图标尺寸
   * @default cx(16)
   */
  buttonIconSize?: number;
  /**
   * @description.en Whether to disable the subtraction button
   * @description.zh 是否禁用减法按钮
   * @default false
   */
  minusDisabled?: boolean;
  /**
   * @description.en Whether to disable the add button
   * @description.zh 是否禁用加法按钮
   * @default false
   */
  plusDisabled?: boolean;
  /**
   * @description.en Value
   * @description.zh 具体值
   * @default 10
   */
  value?: number;
  /**
   * @description.en Min
   * @description.zh 最小值
   * @default 0
   */
  min?: number;
  /**
   * @description.en Max
   * @description.zh 最大值
   * @default 99
   */
  max?: number;
  /**
   * @description.en Step length
   * @description.zh 步长
   * @default 1
   */
  stepValue?: number;
  /**
   * @description.en Hold down the interval
   * @description.zh 长按间隔时长
   * @default 500
   */
  milliseconds?: number;
  /**
   * @description.en Value change callback
   * @description.zh 值变化回调
   * @default null
   */
  onValueChange?: (value: number) => void;
}

export const INordicDefaultProps = {
  width: cx(327),
  padding: [cx(24), cx(20), cx(24), cx(20)],
  radius: cx(16),
  backgroundColor: '#FFF',
  showIconBg: false,
  iconSize: cx(16),
  iconColor: '#1082FE',
  text: 'Temp',
  fontSize: cx(16),
  fontWeight: 400,
  showIcon: true,
  fontColor: 'rgba(0, 0, 0, 0.9)',
  buttonIconColor: '#158CFB',
  buttonIconSize: cx(16),
  buttonWidth: cx(66),
  buttonHeight: cx(40),
  buttonRadius: cx(6.4),
  buttonBgColor: '#F7F7F7',
  minusDisabled: false,
  plusDisabled: false,
  value: 10,
  min: 0,
  max: 99,
  stepValue: 1,
  milliseconds: 500,
  valueSize: cx(24),
  valueColor: '#000',
  valueWeight: 500,
  unit: '',
};

export interface INordicStepCardProps
  extends IStudioStepCardProps,
    Omit<IconBackgroundProps, 'style'> {
  /**
   * @description.en Header icon style
   * @description.zh 头部栏图标样式
   * @default null
   */
  iconStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Header text style
   * @description.zh 头部栏文本样式
   * @default null
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Concrete value style
   * @description.zh 具体值样式
   * @default null
   */
  valueStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Container width
   * @description.zh 容器宽度
   * @default cx(327)
   */
  width?: number;
  /**
   * @description.en Container padding
   * @description.zh 容器内边距
   * @default [cx(24), cx(20), cx(24), cx(20)]
   */
  padding?: number[];
  /**
   * @description.en The container with rounded corners
   * @description.zh 容器圆角
   * @default cx(16)
   */
  radius?: number;
  /**
   * @description.en Container background color
   * @description.zh 容器背景颜色
   * @default #FFF'
   */
  backgroundColor?: string;
  /**
   * @description.en Header icon size
   * @description.zh 头部图标大小
   * @default  cx(16)
   */
  iconSize?: number;
  /**
   * @description.en Header icon color
   * @description.zh 头部图标大小
   * @default '#1082FE'
   */
  iconColor?: string;
  /**
   * @description.en Header text
   * @description.zh 头部栏文本
   * @default 'Temp'
   */
  text?: string;
  /**
   * @description.en Header text word color
   * @description.zh 头部栏文本颜色
   * @default 'rgba(0, 0, 0, 0.9)'
   */
  fontColor?: string;
  /**
   * @description.en Header text word size
   * @description.zh 头部栏文本大小
   * @default cx(16)
   */
  fontSize?: number;
  /**
   * @description.en Header text word weight
   * @description.zh 头部栏文本字重
   * @default 400
   */
  fontWeight?: number | string;
  /**
   * @description.en Specific value word size
   * @description.zh 具体值大小
   * @default cx(24)
   */
  valueSize?: number;
  /**
   * @description.en Specific value word color
   * @description.zh 具体值颜色
   * @default '#000'
   */
  valueColor?: string;
  /**
   * @description.en Specific value word weight
   * @description.zh 具体值字重
   * @default 500
   */
  valueWeight?: number | string;
  /**
   * @description.en Unit
   * @description.zh 单位
   * @default null
   */
  unit?: string;
}

export interface IStudioStepCardState {
  val: number;
}
