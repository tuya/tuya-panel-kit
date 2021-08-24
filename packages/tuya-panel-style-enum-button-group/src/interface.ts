import { Utils } from 'tuya-panel-utils';
import { BackgroundType } from 'tuya-panel-style-icon-background';
import { StyleProp, ViewStyle } from 'react-native';

const { convertX: cx } = Utils.RatioUtils;

export const defaultProps = {
  padding: [0, 0, 0, 0],
  // 按钮图标样式
  iconColor: '#FE7862',
  activeIconColor: '#fff',
  iconSize: cx(26),
  // 按钮背景样式
  iconBgSize: cx(64),
  iconBgColor: {
    deg: 139,
    stops: {
      '0%': '#fff',
      '34%': 'rgba(255, 255, 255, 0.7)',
      '100%': 'rgba(255, 255, 255, 0.3)',
    },
  },
  iconBgRadius: cx(32),
  // activeIconBgColor: '#FE7862',
  activeIconBgColor: {
    deg: 135,
    stops: {
      '0%': '#FF8976',
      '100%': '#FE7862',
    },
  },
  // 按钮文字样式
  textFontSize: cx(10),
  textFontColor: '#FE7862',
  // textFontWeight: '400',
  activeTextFontColor: 'rgba(255, 255, 255, 0.85)',
  // activeTextFontWeight: '400',
  // 翻页圆点样式
  dotSize: cx(7),
  dotBgColor: 'rgba(0, 0, 0, 0.05)',
  activeDotBgColor: '#FE724C',

  // 背景
  backgroundColor: 'rgba(0, 0, 0, 0)',
  radius: cx(20),
  rowMaxCount: 4, // 一行最多多少个
  pageMaxCount: 8, // 一页最多多少个
};

export type FontWeightType =
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

export type DataItem = {
  label: string;
  icon?: string;
  activeIcon?: string; // 选中之后的图标
  iconIsImage?: boolean;
  key: string;
  disable?: boolean;
};

type Props = {
  data: Array<DataItem>;
  style?: StyleProp<ViewStyle>; // 最外层容器
  width?: number;
  disable?: boolean;
  activeKeys?: string[];
  defaultActiveKeys?: string[];
  iconBgColor?: BackgroundType;
  activeIconBgColor?: BackgroundType;
  type?: 'radio' | 'multi';
  activeTextFontWeight?: FontWeightType;
  textFontWeight?: FontWeightType;
  handActiveKeyChange?: (key: string, nextKeys: string[], data: DataItem) => void;
};

// export type IEnumButtonGroupProps = Omit<Partial<typeof defaultProps>, FilterProps> & Props;
export type IEnumButtonGroupProps = typeof defaultProps & Props;
