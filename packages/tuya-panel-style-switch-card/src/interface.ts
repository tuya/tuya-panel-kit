import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { SwitchButtonProps } from 'tuya-panel-kit';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';
import React from 'react';

const { convertX: cx } = Utils.RatioUtils;

export const IDefaultProps = {
  backgroundColor: '#FFF',
  width: cx(316),
  radius: cx(14),
  text: 'Switch Card',
  fontColor: '#3D3D3D',
  fontSize: cx(15),
  subFontColor: 'rgba(61, 61, 61, 0.5)',
  subFontSize: cx(14),
  showIcon: true,
  fontWeight: 400,
  subFontWeight: 400,
  switchSize: { width: cx(40), height: cx(24), activeSize: cx(20), margin: cx(2) },
  disabled: true,
  milliseconds: 500,
};

export interface ISwitchCardProps
  extends Omit<IconBackgroundProps, 'style'>,
    Omit<SwitchButtonProps, 'style' | 'iconSize' | 'iconColor' | 'size' | 'value' | 'disabled'> {
  /**
   * @description.en Outermost container style
   * @description.zh 最外层容器样式
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.en The background color
   * @description.zh 背景颜色
   * @default #FFF
   */
  backgroundColor?: string;
  /**
   * @description.en [paddingTop, paddingRight, paddingBottom, paddingLeft]
   * @description.zh 最外层容器内边距，格式为 [paddingTop, paddingRight, paddingBottom, paddingLeft]
   * @default null
   */
  padding?: number[];
  /**
   * @description.en Width of the container
   * @description.zh 容器宽度
   * @default cx(316)
   */
  width?: number;
  /**
   * @description.en Radius of the container
   * @description.zh 容器圆角
   * @default cx(14)
   */
  radius?: number;
  /**
   * @description.en The title
   * @description.zh 标题
   * @default 'Switch Card'
   */
  text: string;
  /**
   * @description.en The title color
   * @description.zh 标题颜色
   * @default #3D3D3D
   */
  fontColor?: string;
  /**
   * @description.en The title size
   * @description.zh 标题大小
   * @default cx(15)
   */
  fontSize?: number;
  /**
   * @description.en The title weight
   * @description.zh 标题字重
   * @default 400
   */
  fontWeight?: number | string;
  /**
   * @description.en The title style
   * @description.zh 标题样式
   * @default null
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * @description.en subtitle
   * @description.zh 副标题
   * @default null
   */
  subText?: string;
  /**
   * @description.en Subtitle color
   * @description.zh 副标题颜色
   * @default rgba(61, 61, 61, 0.5)
   */
  subFontColor?: string;
  /**
   * @description.en Subtitle size
   * @description.zh 副标题大小
   * @default cx(14)
   */
  subFontSize?: number;
  /**
   * @description.en Subtitle weight
   * @description.zh 副标题字重
   * @default 400
   */
  subFontWeight?: number | string;
  /**
   * @description.en Subtitle style
   * @description.zh 副标题样式
   * @default null
   */
  subTextStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Switch size
   * @description.zh 开关尺寸大小
   * @default { width: cx(40), height: cx(24), activeSize: cx(20), margin: cx(2) }
   */
  switchSize?: { width?: number; height?: number; activeSize?: number; margin?: number };
  /**
   * @description
   * @description.zh 滑块上的图标大小
   * @default 18
   */
  switchIconSize?: number;
  /**
   * @description
   * @description.zh Size of the icon on the slider
   * @default null
   */
  switchIconColor?: string;
  /**
   * @description.en Switch the style
   * @description.zh 开关样式
   * @default null
   */
  switchStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Icon style
   * @description.zh 图标样式
   * @default null
   */
  iconStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en The card type is a text card, which is not transmitted by default
   * @description.zh 卡片类型，默认不传，为文本类型卡片
   * @default null
   */
  type?: 'switch' | 'arrow';
  /**
   * @description.en Text on the right side of the card
   * @description.zh 卡片右侧文本
   * @default null
   */
  value?: boolean | string;
  /**
   * @description.en Color of text on the right side of the card
   * @description.zh 卡片右侧文本颜色
   * @default null
   */
  valueColor?: string;
  /**
   * @description.en Size of text on the right side of the card
   * @description.zh 卡片右侧文本大小
   * @default null
   */
  valueSize?: number;
  /**
   * @description.en Weight of text on the right side of the card
   * @description.zh 卡片右侧文本字重
   * @default null
   */
  valueFontWeight?: number | string;
  /**
   * @description.en Style of text on the right side of the card
   * @description.zh 卡片右侧文本样式
   * @default null
   */
  valueStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Unit on right side of card
   * @description.zh 卡片右侧单位
   * @default null
   */
  unit?: string;
  /**
   * @description.en Unit size on the right side of the card
   * @description.zh 卡片右侧单位大小
   * @default null
   */
  unitSize?: number;
  /**
   * @description.en Unit color on the right side of the card
   * @description.zh 卡片右侧单位颜色
   * @default null
   */
  unitColor?: string;
  /**
   * @description.en Unit weight on the right side of the card
   * @description.zh 卡片右侧单位字重
   * @default null
   */
  unitWeight?: number | string;
  /**
   * @description.en Unit style on the right side of the card
   * @description.zh 卡片右侧单位样式
   * @default null
   */
  unitStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Size of arrow on right side of card
   * @description.zh 卡片右侧箭头大小
   * @default cx(12)
   */
  arrowSize?: number;
  /**
   * @description.en Color of arrow on right side of card
   * @description.zh 卡片右侧箭头颜色
   * @default rgba(0, 0, 0, 0.25)
   */
  arrowColor?: string;
  /**
   * @description.en Custom components on the right of the card
   * @description.zh 卡片右侧自定义组件
   * @default null
   */
  children?: React.ReactNode;
  /**
   * @description.en Whether the card is disabled
   * @description.zh 卡片是否禁用
   * @default true
   */
  disabled?: boolean;
  /**
   * @description.en Short press
   * @description.zh 短按
   * @default null
   */
  onPress?: () => void;
  /**
   * @description.en Long press
   * @description.zh 长按
   * @default null
   */
  onLongPress?: () => void;
  /**
   * @description.en Long press the interval
   * @description.zh 长按时间间隔
   * @default 500
   */
  milliseconds?: number;
}
