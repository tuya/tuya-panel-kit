import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;

export const IDefaultProps = {
  backgroundColor: 'transparent',
  radius: 0,
  padding: [cx(26), cx(19), cx(26), cx(31)],
  width: cx(198),
  text: 'Current Temp',
  fontSize: cx(14),
  fontColor: 'rgba(0, 0, 0, 0.5)',
  fontWeight: 400,
  unit: '°C',
  unitSize: cx(20),
  unitColor: '#000',
  unitWeight: 500,
  value: 32,
  valueSize: cx(74),
  valueColor: '#000',
  valueWeight: 700,
  isUnitInTop: true,
  isAlignCenter: false,
  showIcon: false,
};

export interface IDisplayCardProps extends Omit<IconBackgroundProps, 'style'> {
  /**
   * @description.en Outermost container style
   * @description.zh 最外层容器样式
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.en description style
   * @description.zh 描述样式
   * @default null
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Unit style
   * @description.zh 单位样式
   * @default null
   */
  unitStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Value style
   * @description.zh 数值样式
   * @default null
   */
  valueStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Icon style
   * @description.zh 图标样式
   * @default null
   */
  iconStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Background Color
   * @description.zh 背景色
   * @default 'transparent'
   */
  backgroundColor?: string;
  /**
   * @description.en The container with rounded corners
   * @description.zh 容器圆角
   * @default 0
   */
  radius?: number;
  /**
   * @description.en Container width
   * @description.zh 容器宽度
   * @default cx(198)
   */
  width?: number;
  /**
   * @description.en Container padding
   * @description.zh 容器内边距
   * @default [cx(26), cx(19), cx(26), cx(31)]
   */
  padding?: number[];
  /**
   * @description.en Description text
   * @description.zh 描述文本
   * @default null 'Current Temp'
   */
  text?: string;
  /**
   * @description.en Text size
   * @description.zh 文本大小
   * @default cx(14)
   */
  fontSize?: number;
  /**
   * @description.en Text Color
   * @description.zh 文本颜色
   * @default 'rgba(0, 0, 0, 0.5)'
   */
  fontColor?: string;
  /**
   * @description.en Text weight
   * @description.zh 文本字重
   * @default 400
   */
  fontWeight?: number | string;
  /**
   * @description.en Unit
   * @description.zh 单位
   * @default '°C'
   */
  unit?: string;
  /**
   * @description.en Unit size
   * @description.zh 单位尺寸
   * @default cx(20)
   */
  unitSize?: number;
  /**
   * @description.en Unit Color
   * @description.zh 单位颜色
   * @default '#000'
   */
  unitColor?: string;
  /**
   * @description.en Unit weight
   * @description.zh 单位字重
   * @default 500
   */
  unitWeight?: number | string;
  /**
   * @description.en Value
   * @description.zh 具体值
   * @default 32
   */
  value?: string | number;
  /**
   * @description.en Value
   * @description.zh 具体值大小
   * @default cx(74)
   */
  valueSize?: number;
  /**
   * @description.en Value Color
   * @description.zh 具体值颜色
   * @default '#000'
   */
  valueColor?: string;
  /**
   * @description.en Value Weight
   * @description.zh 具体值字重
   * @default 700
   */
  valueWeight?: number;
  /**
   * @description.en Whether the unit is in the upper right corner of the text
   * @description.zh 单位是否在文本右上角
   * @default true
   */
  isUnitInTop?: boolean;
  /**
   * @description.en Whether the text is horizontally centered
   * @description.zh 文本是否水平居中
   * @default true
   */
  isAlignCenter?: boolean;
}
