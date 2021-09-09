import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;

export const IStudioDefaultProps = {
  backgroundColor: '#fff',
  radius: cx(14),
  width: cx(175),
  padding: [cx(16), cx(21), cx(21), cx(16)],
  text: 'Temp',
  fontWeight: 400,
  fontSize: cx(16),
  fontColor: '#3D3D3D',
  value: '42%',
  valueWeight: 600,
  valueSize: cx(24),
  valueColor: '#505050',
};

export const INordicDefaultProps = {
  backgroundColor: '#fff',
  radius: cx(16),
  width: cx(155),
  padding: [cx(24), cx(20), cx(18), cx(20)],
  text: 'Temp',
  fontWeight: 400,
  fontSize: cx(16),
  fontColor: 'rgba(0, 0, 0, 0.9)',
  value: '42%',
  valueWeight: 400,
  valueSize: cx(28),
  valueColor: 'rgba(0, 0, 0, 0.5)',
  arrowSize: cx(10),
  arrowColor: 'rgba(0, 0, 0, 0.2)',
  hasArrow: false,
  showIcon: true,
};

export const IAcrylicDefaultProps = {
  backgroundColor: '#fff',
  radius: cx(16),
  width: cx(150),
  padding: [cx(20), cx(20), cx(27), cx(20)],
  text: 'Temp',
  fontWeight: 500,
  fontSize: cx(14),
  fontColor: 'rgba(0, 0, 0, 0.5)',
  value: '42',
  unit: '°C',
  valueWeight: 600,
  valueSize: cx(32),
  valueColor: 'rgba(0, 0, 0, 0.9)',
  unitWeight: 400,
  unitColor: 'rgba(0, 0, 0, 0.5)',
  unitSize: cx(16),
};

export interface IStudioIconCardProps extends Omit<IconBackgroundProps, 'style'> {
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
   * @description.en Value style
   * @description.zh 数值样式
   * @default null
   */
  valueStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Unit style
   * @description.zh 单位样式
   * @default null
   */
  unitStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Background Color
   * @description.zh 背景色
   * @default '#FFF'
   */
  backgroundColor?: string;
  /**
   * @description.en The container with rounded corners
   * @description.zh 容器圆角
   * @default cx(16)
   */
  radius?: number;
  /**
   * @description.en Container width
   * @description.zh 容器宽度
   * @default cx(175)
   */
  width?: number;
  /**
   * @description.en Container padding
   * @description.zh 容器内边距
   * @default [cx(16), cx(21), cx(21), cx(16)]
   */
  padding?: number[];
  /**
   * @description.en Title
   * @description.zh 标题
   * @default 'Temp'
   */
  text?: string;
  /**
   * @description.en Title weight
   * @description.zh 标题字重
   * @default 400
   */
  fontWeight?: number;
  /**
   * @description.en Title size
   * @description.zh 标题大小
   * @default cx(16)
   */
  fontSize?: number;
  /**
   * @description.en Title Color
   * @description.zh 标题颜色
   * @default '#3D3D3D'
   */
  fontColor?: string;
  /**
   * @description.en Value
   * @description.zh 具体值
   * @default '42%'
   */
  value?: string | string;
  /**
   * @description.en Value Weight
   * @description.zh 具体值字重
   * @default 600
   */
  valueWeight?: number;
  /**
   * @description.en Value Color
   * @description.zh 具体值颜色
   * @default '#505050'
   */
  valueColor?: string;
  /**
   * @description.en Value
   * @description.zh 具体值大小
   * @default cx(24)
   */
  valueSize?: number;
  /**
   * @description.en Unit
   * @description.zh 单位
   * @default null
   */
  unit?: string;
  /**
   * @description.en Unit weight
   * @description.zh 单位字重
   * @default 400
   */
  unitWeight?: number;
  /**
   * @description.en Unit Color
   * @description.zh 单位颜色
   * @default 'rgba(0, 0, 0, 0.5)'
   */
  unitColor?: string;
  /**
   * @description.en Unit size
   * @description.zh 单位尺寸
   * @default cx(16)
   */
  unitSize?: number;
}

export interface INordicIconCardProps extends IStudioIconCardProps {
  /**
   * @description.en Whether arrow indicates the icon
   * @description.zh 是否有 arrow 指引图标
   * @default false
   */
  hasArrow?: boolean;
  /**
   * @description.en Arrow indicates the size of the icon
   * @description.zh arrow 指引图标的大小
   * @default cx(10)
   */
  arrowSize?: number;
  /**
   * @description.en Arrow indicates the color of the icon
   * @description.zh arrow 指引图标的颜色
   * @default 'rgba(0, 0, 0, 0.2)'
   */
  arrowColor?: string;
  /**
   * @description.en Press action callback
   * @description.zh 按下动作回调
   * @default null
   */
  onPress?: () => void;
}
