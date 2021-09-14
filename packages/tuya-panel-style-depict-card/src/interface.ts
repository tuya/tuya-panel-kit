import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;

export const IDefaultProps = {
  backgroundColor: 'transparent',
  radius: cx(14),
  padding: [cx(16), cx(45), cx(18), cx(47)],
  text: 'Current Temp',
  fontSize: cx(12),
  fontColor: 'rgba(80, 80, 80, 0.5)',
  fontWeight: 400,
  unit: '°C',
  unitSize: cx(18),
  unitColor: '#000',
  unitWeight: 400,
  value: 32,
  valueSize: cx(18),
  valueColor: '#505050',
  valueWeight: 600,
  isUnitInBottom: false,
  isAlignCenter: true,
  marginBottom: cx(6),
  showIcon: false,
};

export interface IDepictCardProps extends Omit<IconBackgroundProps, 'style'> {
  /**
   * @description.en Outermost container style
   * @description.zh 最外层容器样式
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.en Icon style
   * @description.zh 图标样式
   * @default null
   */
  iconStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Title style
   * @description.zh 标题样式
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
   * @description.en Background Color
   * @description.zh 背景色
   * @default '#Fff'
   */
  backgroundColor?: string;
  /**
   * @description.en The container with rounded corners
   * @description.zh 容器圆角
   * @default cx(14)
   */
  radius?: number;
  /**
   * @description.en Container width
   * @description.zh 容器宽度
   * @default null
   */
  width?: number;
  /**
   * @description.en Container padding
   * @description.zh 容器内边距
   * @default [cx(16), cx(45), cx(18), cx(47)]
   */
  padding?: number[];
  /**
   * @description.en Title
   * @description.zh 标题
   * @default 'Current Temp'
   */
  text?: string;
  /**
   * @description.en Title size
   * @description.zh 标题大小
   * @default cx(12)
   */
  fontSize?: number;
  /**
   * @description.en Title Color
   * @description.zh 标题颜色
   * @default 'rgba(80, 80, 80, 0.5)'
   */
  fontColor?: string;
  /**
   * @description.en Title weight
   * @description.zh 标题字重
   * @default 400
   */
  fontWeight?: number;
  /**
   * @description.en Unit
   * @description.zh 单位
   * @default '°C'
   */
  unit?: string;
  /**
   * @description.en Unit size
   * @description.zh 单位尺寸
   * @default cx(18)
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
   * @default 400
   */
  unitWeight?: number;
  /**
   * @description.en Value
   * @description.zh 具体值
   * @default 32
   */
  value?: string | number;
  /**
   * @description.en Value
   * @description.zh 具体值大小
   * @default cx(18)
   */
  valueSize?: number;
  /**
   * @description.en Value Color
   * @description.zh 具体值颜色
   * @default '#505050'
   */
  valueColor?: string;
  /**
   * @description.en Value Weight
   * @description.zh 具体值字重
   * @default 600
   */
  valueWeight?: number;
  /**
   * @description.en Whether the unit is in the lower right corner of the text
   * @description.zh 单位是否在文本右下角
   * @default false
   */
  isUnitInBottom?: boolean;
  /**
   * @description.en Whether the text is horizontally centered
   * @description.zh 文本是否水平居中
   * @default true
   */
  isAlignCenter?: boolean;
  /**
   * @description.en The spacing between the title and the specific value
   * @description.zh 标题和具体值的间距
   * @default cx(6)
   */
  marginBottom?: number;
}
