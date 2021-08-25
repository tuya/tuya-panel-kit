import { StyleProp, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { BackgroundType } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;
export const defaultProps = {
  data: [],
  padding: [22, 20, 22, 20],
  style: {}, // 最外层容器 样式  优先级最高
  titleStyle: {
    marginBottom: cx(24),
  }, // title容器样式 优先级最高
  titleTextStyle: {},
  contentStyle: {}, // 内容容器样式 优先级最高
  // 图标属性 title左侧图标
  icon: '',
  iconIsImage: false, // icon是否为图片
  iconSize: cx(14),
  iconColor: '#3d3d3d',
  // 图标背景
  iconBgSize: cx(24),
  iconBgColor: '#fff',
  iconBgRadius: cx(24),
  showIconBg: false,
  // title属性
  title: '',
  showTitle: true,
  titleFontColor: '#3d3d3d',
  titleFontSize: cx(15),
  titleFontWeight: 'normal',
  // 参数属性 （title右侧 silder值）
  valueFontColor: '#158CFB',
  valueFontSize: cx(15),
  valueFontWeight: 'normal',
  // 组件背景
  backgroundColor: '#fff',
  radius: cx(14),
  // 滑动槽
  grooveBgColor: '#E3E9EE',
  grooveHeight: cx(38),
  // 滑块
  thumbBgColor: '#158CFB',
  thumbHeight: cx(30),
  // 当前选中的文字样式
  activeTextColor: '#fff',
  activeTextFontSize: cx(14),
  circleStyle: {
    width: cx(4),
    height: cx(4),
    opacity: 0.4,
    borderRadius: cx(4),
  },
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
  | '900';

export type EnumItem = {
  label: string;
  key: string;
  disabled?: boolean;
};

type Props = {
  data: Array<EnumItem>;
  contentStyle?: StyleProp<ViewStyle>; // 内容容器样式 优先级最高
  titleStyle?: StyleProp<ViewStyle>;
  iconBgColor?: BackgroundType;
  titleTextStyle?: StyleProp<ViewStyle>;
  titleFontWeight?: FontWeightType;
  valueFontWeight?: FontWeightType;
  // c?: FontWeightType;
  circleStyle?: ViewStyle; // 滑动槽中小圆点的样式
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string, data: EnumItem) => void;
  unit?: string;
};

export type IEnumTabsButtonCardProps = Omit<Partial<typeof defaultProps>, 'data'> & Props;
