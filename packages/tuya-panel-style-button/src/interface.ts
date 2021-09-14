import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';
import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;

export const IDefaultProps = {
  disabled: false,
  width: cx(120),
  padding: [cx(12), 0, cx(12), 0],
  radius: cx(14),
  backgroundColor: '#FFF',
  iconBgColor: 'rgba(0, 159, 255, 0.1)',
  iconColor: '#158CFB',
  iconBgSize: cx(48),
  iconBgRadius: cx(24),
  fontColor: 'rgba(61, 61, 61, 0.5)',
  fontSize: cx(10),
  iconSize: cx(24),
  fontWeight: '400' as TextStyle['fontWeight'],
  milliseconds: 200,
  showIconBg: true,
  showIcon: true,
};

export interface IButtonProps extends Omit<IconBackgroundProps, 'style'> {
  /**
   * @description.en Outermost container style
   * @description.zh 最外层容器样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.en Icon background style
   * @description.zh 图标背景样式
   */
  iconBgStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Text style
   * @description.zh 文字样式
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Transparency at touch
   * @description.zh 触摸时的透明度
   */
  activeOpacity?: number;
  /**
   * @description.en Button text
   * @description.zh 按钮文字
   */
  text?: string;
  /**
   * @description.en Disable components
   * @description.zh 禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * @description.en Width
   * @description.zh 宽度
   */
  width?: number;
  /**
   * @description.en [paddingTop, paddingRight, paddingBottom, paddingLeft]
   * @description.zh 最外层容器内边距，格式为 [paddingTop, paddingRight, paddingBottom, paddingLeft]
   */
  padding?: number[];
  /**
   * @description.en Radius
   * @description.zh 圆角
   */
  radius?: number;
  /**
   * @description.en Component Background color
   * @description.zh 组件背景颜色
   */
  backgroundColor?: string;
  /**
   * @description.en Button text font color
   * @description.zh 按钮文字颜色
   */
  fontColor: string;
  /**
   * @description.en Button text font size
   * @description.zh 按钮文字大小
   */
  fontSize: number;
  /**
   * @description.en Button text font weight
   * @description.zh 按钮文字字重
   */
  fontWeight: TextStyle['fontWeight'];
  /**
   * @description.en Long press time  The unit is in ms
   * @description.zh 规定长安的时间 单位为 ms
   * @default 200
   */
  milliseconds?: number;
  /**
   * @description.en Click the button to call back
   * @description.zh 点击按钮回调函数
   */
  onPress?: () => void;
  /**
   * @description.en Long press button callback function
   * @description.zh 长按按钮回调函速
   */
  onLongPress?: () => void;
}
