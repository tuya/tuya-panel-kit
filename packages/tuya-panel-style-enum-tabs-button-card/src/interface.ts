import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';

const { convertX: cx } = Utils.RatioUtils;
export const defaultProps = {
  data: [],
  padding: [cx(22), cx(20), cx(22), cx(20)],
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
  titleFontWeight: 'normal' as TextStyle['fontWeight'],
  // 参数属性 （title右侧 silder值）
  valueFontColor: '#158CFB',
  valueFontSize: cx(15),
  valueFontWeight: 'normal' as TextStyle['fontWeight'],
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

export interface EnumItem {
  /**
   * @description.en Label
   * @description.zh 名称
   */
  label: string;
  /**
   * @description.en Key
   * @description.zh key
   */
  key: string;
  /**
   * @description.en Whether the current button is disabled
   * @description.zh 当前按钮是否禁用
   * @default false
   */
  disabled?: boolean;
}
export interface IEnumTabsButtonCardProps extends Omit<IconBackgroundProps, 'style' | 'image'> {
  /**
   * @description.en The data source
   * @description.zh 数据源
   */
  data: Array<EnumItem>;
  /**
   * @description.en The currently selected key
   * @description.zh 当前选中的 key
   */
  activeKey?: string;
  /**
   * @description.en The key selected by default
   * @description.zh 默认选中的key
   */
  defaultActiveKey?: string;
  /**
   * @description.en Callback for key changes
   * @description.zh key改变的回调函数
   */
  onChange?: (key: string, data: EnumItem) => void;
  /**
   * @description.en Icon is a picture
   * @description.zh 图标是否为图片
   * @default false
   */
  iconIsImage?: boolean;
  /**
   * @description.en Outermost container style
   * @description.zh 最外层容器样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.en Content container style
   * @description.zh 内容容器样式
   */
  contentStyle?: StyleProp<ViewStyle>; // 内容容器样式 优先级最高
  /**
   * @description.en Title container style
   * @description.zh 标题容器痒死
   */
  titleStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Title text style
   * @description.zh 标题文字样式
   */
  titleTextStyle?: StyleProp<TextStyle>;
  // c?: FontWeightType;
  /**
   * @description.en The pattern of small dots in the sliding groove
   * @description.zh 滑动槽中小圆点的样式
   */
  circleStyle?: ViewStyle; // 滑动槽中小圆点的样式
  /**
   * @description.en Unit, the text to the right of value
   * @description.zh 单位，值右边的文字
   */
  unit?: string;
  /**
   * @description.en Padding of the outer container [top, right, bottom, left]
   * @description.zh 外层容器的内边距 [top, right, bottom, left]
   */
  padding?: number;
  /**
   * @description.en Title
   * @description.zh 标题
   */
  title?: string;
  /**
   * @description.en Whether to show the title
   * @description.zh 是否展示标题
   * @default true
   */
  showTitle?: boolean;
  /**
   * @description.en Title font color
   * @description.zh 标题字体眼神
   */
  titleFontColor?: string;
  /**
   * @description.en Title font size
   * @description.zh 标题字体大小
   */
  titleFontSize?: number;
  /**
   * @description.en Title font weight
   * @description.zh 标题字重
   */
  titleFontWeight?: TextStyle['fontWeight'];
  /**
   * @description.en The value font color
   * @description.zh 参数字体颜色
   */
  valueFontColor?: string;
  /**
   * @description.en The value font size
   * @description.zh 参数字体大小
   */
  valueFontSize?: number;
  /**
   * @description.en The value font weight
   * @description.zh 参数的字重
   */
  valueFontWeight?: TextStyle['fontWeight'];
  /**
   * @description.en Component background color
   * @description.zh 组件背景颜色
   */
  backgroundColor?: string;
  /**
   * @description.en Component radius
   * @description.zh 组件圆角
   */
  radius?: number;
  // 滑动槽
  /**
   * @description.en Slide groove background color
   * @description.zh 滑动槽背景颜色
   */
  grooveBgColor?: string;
  /**
   * @description.en Slide groove height
   * @description.zh 滑动槽高度
   */
  grooveHeight?: number;
  /**
   * @description.en Slider thumb background color
   * @description.zh 滑块背景颜色
   */
  thumbBgColor?: string;
  /**
   * @description.en  Slider thumb height
   * @description.zh 滑块高度
   */
  thumbHeight?: number;
  /**
   * @description.en The font color of the currently selected item
   * @description.zh 当前选中项的字体颜色
   */
  activeTextColor?: string;
  /**
   * @description.en The font size of the currently selected item
   * @description.zh 当前选中项的字体大小
   */
  activeTextFontSize?: number;
}
