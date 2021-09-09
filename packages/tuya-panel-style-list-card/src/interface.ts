import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;

export const IStyleListCardDefaultProps = {
  width: cx(327),
  padding: [cx(24), cx(16), cx(24), cx(16)],
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
  activeIconColor: '#FFF',
  inActiveIconColor: '#FFF',
  activeIconBgColor: '#1082FE',
  inActiveIconBgColor: '#1082FE',
  activeTextColor: 'rgba(0, 0, 0, 0.9)',
  textSize: cx(16),
  inActiveTextColor: 'rgba(0,0,0,0.5)',
  textWeight: 400,
  activeBgColor: 'rgba(16, 130, 254, 0.09)',
  inActiveBgColor: 'transparent',
  itemIconSize: cx(20),
  itemIconBgSize: cx(36),
};

export interface IStyleListCardProps extends Omit<IconBackgroundProps, 'style'> {
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
   * @description.en Container width
   * @description.zh 容器宽度
   * @default cx(327)
   */
  width?: number;
  /**
   * @description.en Container padding
   * @description.zh 容器内边距
   * @default [cx(24), cx(16), cx(24), cx(16)]
   */
  padding?: number[];
  /**
   * @description.en The container with rounded corners
   * @description.zh 容器圆角
   * @default cx(16)
   */
  radius?: number;
  /**
   * @description.en Background Color
   * @description.zh 背景色
   * @default '#FFF'
   */
  backgroundColor?: string;
  /**
   * @description.en Icon size
   * @description.zh 图标大小
   * @default cx(16)
   */
  iconSize?: number;
  /**
   * @description.en Icon color
   * @description.zh 图标颜色
   * @default '#1082FE'
   */
  iconColor?: string;
  /**
   * @description.en Title
   * @description.zh 标题
   * @default 'Temp'
   */
  text?: string;
  /**
   * @description.en Title Color
   * @description.zh 标题颜色
   * @default 'rgba(0, 0, 0, 0.9)'
   */
  fontColor?: string;
  /**
   * @description.en Title size
   * @description.zh 标题大小
   * @default cx(16)
   */
  fontSize?: number;
  /**
   * @description.en Title weight
   * @description.zh 标题字重
   * @default 400
   */
  fontWeight?: number | string;
  /**
   * @description.en Value
   * @description.zh 选中值
   * @default null
   */
  value: string;
  /**
   * @description.en The data source
   * @description.zh 数据源
   * @default null
   */
  dataSource: IDataSource[];
  /**
   * @description.en Icon color in active state
   * @description.zh 激活状态下的图标颜色
   * @default '#FFF'
   */
  activeIconColor?: string;
  /**
   * @description.en Color of the icon in inactive state
   * @description.zh 非激活状态下的图标颜色
   * @default '#FFF'
   */
  inActiveIconColor?: string;
  /**
   * @description.en Active icon background color
   * @description.zh 激活状态下的图标背景颜色
   * @default '#1082FE'
   */
  activeIconBgColor?: string;
  /**
   * @description.en InActive icon background color
   * @description.zh 非激活状态下的图标背景颜色
   * @default '#1082FE'
   */
  inActiveIconBgColor?: string;
  /**
   * @description.en List item icon size
   * @description.zh 列表项图标大小
   * @default cx(20)
   */
  itemIconSize?: number;
  /**
   * @description.en List item icon background size
   * @description.zh 列表项图标背景大小
   * @default cx(36)
   */
  itemIconBgSize?: number;
  /**
   * @description.en List item icon style
   * @description.zh 列表项图标样式
   * @default null
   */
  itemIconStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Color of text in active state
   * @description.zh 激活状态下的文字颜色
   * @default 'rgba(0, 0, 0, 0.9)'
   */
  activeTextColor?: string;
  /**
   * @description.en Data source text color
   * @description.zh 数据源文本颜色
   * @default null
   */
  inActiveTextColor?: string;
  /**
   * @description.en Data source text size
   * @description.zh 数据源文本大小
   * @default null
   */
  textSize?: number;
  /**
   * @description.en Data source text weight
   * @description.zh 数据源文本字重
   * @default null
   */
  textWeight?: number | string;
  /**
   * @description.en Data source text style
   * @description.zh 数据源文本样式
   * @default null
   */
  itemTextStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Active list item background color
   * @description.zh 激活的列表项背景颜色
   * @default 'rgba(16, 130, 254, 0.09)'
   */
  activeBgColor?: string;
  /**
   * @description.en List item background color
   * @description.zh 列表项背景颜色
   * @default 'transparent'
   */
  inActiveBgColor?: string;
  /**
   * @description.en Click the callback function
   * @description.zh 点按回调函数
   * @default null
   */
  onPress: (value: string) => void;
}

export interface IDataSource
  extends Omit<
    IconBackgroundProps,
    'style' | 'iconSize' | 'iconBgSize' | 'iconColor' | 'iconBgColor'
  > {
  /**
   * @description.en The label text corresponding to the data source text style value
   * @description.zh 值对应的标签文本
   * @default null
   */
  text: string;
  /**
   * @description.en Whether to disable
   * @description.zh  是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @description.en Value
   * @description.zh  数据源的列表值
   * @default null
   */
  value: string;
}
