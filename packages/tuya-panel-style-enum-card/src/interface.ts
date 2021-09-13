import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { BackgroundType, IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;
export const defaultProps = {
  pageCount: 4,
  style: {}, // content容器 样式  优先级最高
  textStyle: {}, // 枚举项里面小文字样式 优先级最高
  titleStyle: {}, // 标题的样式 优先级最高
  padding: [cx(16), cx(16), cx(8), cx(16)],
  // icon属性
  iconColor: '#158CFB',
  activeIconColor: '#fff',
  iconSize: cx(18),
  // icon bg属性
  iconBgColor: 'rgba(21, 140, 251, 0.1)',
  activeIconBgColor: '#158CFB',
  iconBgSize: cx(48),
  iconBgRadius: cx(48),
  showIconBg: true,
  // 每项文字属性
  showText: true,
  textColor: 'rgba(61, 61, 61, 0.3)',
  activeTextColor: '#009FFF',
  textFontSize: cx(12),
  // textFontWeight: 'normal',
  // title属性
  title: '',
  showTitle: true,
  titleFontSize: cx(16),
  titleColor: '#000',
  titleFontWeight: 'normal' as TextStyle['fontWeight'],
  // 背景属性
  backgroundColor: '#fff',
  radius: cx(12),
  // 轮播图原点颜色
  dotSize: cx(6),
  dotColor: 'rgba(0, 0, 0, 0.05)',
  activeDotColor: '#158CFB',
  contentStyle: {},
  titleContentStyle: {
    marginBottom: cx(16),
  },
  dotWrapperStyle: {
    marginTop: cx(20),
  },
};

interface EnumItem {
  /**
   * @description.en text
   * @description.zh 文字
   */
  label?: string;
  /**
   * @description.en Icon
   * @description.zh 图标
   */
  icon: string;
  /**
   * @description.en Whether the icon is a picture
   * @description.zh 图标是否为图片
   * @default false
   */
  isImage?: boolean;
  /**
   * @description.en key
   * @description.zh key
   */
  key: string;
  /**
   * @description.en Whether to disable
   * @description.zh 是否禁用
   * @default false
   */
  disabled?: boolean;
}
export interface IEnumCardProps
  extends Omit<IconBackgroundProps, 'style' | 'imageRadius' | 'image'> {
  /**
   * @description.en DataSource
   * @description.zh 数据源
   */
  data: Array<EnumItem>;
  /**
   * @description.en How much data is on each page
   * @description.zh 每页有多少数据
   * @default 4
   */
  pageCount?: number;
  /**
   * @description.en change key callback
   * @description.zh key 改变回调
   */
  onActiveKeyChange?: (key: string) => void;
  /**
   * @description.en Whether to disable components
   * @description.zh 是否禁用组件
   */
  disabled?: boolean;
  /**
   * @description.en The outer container padding
   * @description.zh 外层容器的内边距
   */
  padding?: number[];
  /**
   * @description.en Component width
   * @description.zh 组件的宽度
   */
  width?: number;
  /**
   * @description.en Outer container Style
   * @description.zh 外层容器样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.en Button text style
   * @description.zh 按钮文字样式
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Card title style
   * @description.zh 卡片标题样式
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Card title container style
   * @description.zh 卡片标题容器样式
   */
  titleContentStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Content container style
   * @description.zh 内容容器样式
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en The dot style of the rotation diagram
   * @description.zh 轮播图小圆点样式
   */
  dotWrapperStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en current key
   * @description.zh 当前选中的key
   */
  activeKey?: string;
  /**
   * @description.en default key
   * @description.zh 默认选中的key
   */
  defaultActiveKey?: string;
  /**
   * @description.en Background color for each item
   * @description.zh 每项的背景颜色
   */
  iconBgColor?: BackgroundType;
  /**
   * @description.en Icon color of the currently selected icon
   * @description.zh 当前选中项的图标颜色
   */
  activeIconColor?: string;
  /**
   * @description.en Background color of the currently selected icon
   * @description.zh 当前选中项背景颜色
   */
  activeIconBgColor?: BackgroundType;
  // 每项文字属性
  /**
   * @description.en Whether the button text is displayed
   * @description.zh 按钮文字是否展示
   */
  showText?: boolean;
  /**
   * @description.en Button font color
   * @description.zh 按钮字体颜色
   */
  textColor?: string;
  /**
   * @description.en Button font size
   * @description.zh 按钮字体大小
   */
  textFontSize?: number;
  /**
   * @description.en Button font weight
   * @description.zh 按钮字重
   */
  textFontWeight?: TextStyle['fontWeight'];
  /**
   * @description.en Font color of the current selected item
   * @description.zh 当前选中项字体颜色
   */
  activeTextColor?: string;
  /**
   * @description.en Card title
   * @description.zh 卡片标题
   */
  title?: string;
  /**
   * @description.en Whether to display the card title
   * @description.zh 卡片标题是否显示
   */
  showTitle?: boolean;
  /**
   * @description.en Card title font size
   * @description.zh 开案标题字体大小
   */
  titleFontSize?: number;
  /**
   * @description.en Card title font color
   * @description.zh 卡片标题字体颜色
   */
  titleColor?: string;
  /**
   * @description.en Card title font weight
   * @description.zh 卡片标题字重
   */
  titleFontWeight?: TextStyle['fontWeight'];
  /**
   * @description.en Component background color
   * @description.zh 中午
   */
  backgroundColor?: string;
  /**
   * @description.en Component radius
   * @description.zh 组件圆角
   */
  radius?: number;
  // 轮播图原点颜色
  /**
   * @description.en dot size
   * @description.zh 圆点尺寸
   */
  dotSize?: number;
  /**
   * @description.en dot color
   * @description.zh 圆点颜色
   */
  dotColor?: string;
  /**
   * @description.en active dot color
   * @description.zh 选中圆点的颜色
   */
  activeDotColor?: string;
}
