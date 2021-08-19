import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { BackgroundType } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;
export const defaultProps = {
  style: {}, // content容器 样式  优先级最高
  textStyle: {}, // 枚举项里面小文字样式 优先级最高
  titleStyle: {}, // 标题的样式 优先级最高
  padding: [cx(16), cx(16), cx(16), cx(16)],
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
  // titleFontWeight: 'normal',
  // 背景属性
  backgroundColor: '#fff',
  radius: cx(12),
  // 轮播图原点颜色
  dotSize: cx(6),
  dotColor: 'rgba(0, 0, 0, 0.05)',
  activeDotColor: '#158CFB',
  contentStyle: {},
  carouselPageContent: {
    paddingBottom: cx(20),
  },
  titleContentStyle: {
    marginBottom: cx(16),
  },
};

type EnumItem = {
  label?: string;
  icon: string;
  isImage?: boolean;
  key?: string;
  disabled?: boolean;
};

type FontWeightType =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

export type IEnumCardProps = {
  list: Array<EnumItem>;
  width?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle & TextStyle>;
  contentStyle: StyleProp<ViewStyle>;
  carouselPageContent: StyleProp<ViewStyle>;
  activeKey?: string;
  defaultActiveKey?: string;
  iconBgColor?: BackgroundType;
  activeIconBgColor?: BackgroundType;
  textFontWeight?: FontWeightType;
  titleFontWeight?: FontWeightType;
  titleContentStyle?: StyleProp<ViewStyle>;
  onActiveKeyChange?: (number) => void;
  disabled?: boolean;
} & Omit<Partial<typeof defaultProps>, 'iconBgColor' | 'activeIconBgColor' | 'textStyle'>;
