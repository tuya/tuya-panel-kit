import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface StopsProps {
  offset: string;
  stopColor: string;
  stopOpacity: string;
}

export interface LinearGradientBackground {
  /**
   * @description.zh-CN 起始点的x轴坐标
   * @description The x-axis coordinate of the starting point
   * @default '0%'
   */
  x1?: string;
  /**
   * @description.zh-CN 终点的x轴坐标
   * @description The x-axis coordinate of the ending point
   * @default '0%'
   */
  x2?: string;
  /**
   * @description.zh-CN 起始点的y轴坐标
   * @description The y-axis coordinate of the starting point
   * @default '0%'
   */
  y1?: string;
  /**
   * @description.zh-CN 终点的y轴坐标
   * @description The y-axis coordinate of the ending point
   * @default '0%'
   */
  y2?: string;
  /**
   * @description.zh-CN 渐变梯度停点
   * @description The stop point of gradient
   * @default { '0%': 'rgb(255, 255, 255)', '100%': 'rgb(0, 0, 0)' }
   */
  stops?: Record<string, string>;
}

export interface RadialGradientBackground {
  /**
   * @description.zh-CN 最外侧圆的x轴坐标点
   * @description The x-axis coordinate point of the outermost circle
   * @default '50%'
   */
  cx?: string;
  /**
   * @description.zh-CN 最外侧圆的y轴坐标点
   * @description The y-axis coordinate point of the outermost circle
   * @default '50%'
   */
  cy?: string;
  /**
   * @description.zh-CN 最内侧圆的x轴坐标点(渐变中心点)
   * @description The x-axis coordinate point of the innermost circle (gradient center point)
   * @default '50%'
   */
  fx?: string;
  /**
   * @description.zh-CN 最内侧圆的y轴坐标点(渐变中心点)
   * @description The y-axis coordinate point of the innermost circle (gradient center point)
   * @default '50%'
   */
  fy?: string;
  /**
   * @description.zh-CN 最内侧圆水平方向的半径(渐变长度)
   * @description The horizontal radius of the innermost circle (gradient length)
   * @default '50%'
   */
  rx?: string;
  /**
   * @description.zh-CN 最内侧圆垂直方向的半径(渐变高度)
   * @description The vertical radius of the innermost circle (gradient height)
   * @default '50%'
   */
  ry?: string;
  /**
   * @description.zh-CN 渐变梯度停点
   * @description The stop point of gradient
   * @default [{ offset: '0%', stopColor: '#ff0', stopOpacity: '1' }, { offset: '100%', stopColor: '#00f', stopOpacity: '1' }]
   */
  stops?: StopsProps[];
}

export type IBackground =
  | number
  | string
  | { uri: string }
  | RadialGradientBackground
  | LinearGradientBackground;

export interface IFullViewProps {
  enablePopGesture?: boolean;
  gesture?: boolean;
  id?: string;
  hideFullView?: boolean;
  title?: string;
  topbarStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  backgroundStyle?: StyleProp<ImageStyle>;
  hideTopbar?: boolean;
  showMenu?: boolean;
  onBack?: () => any;
  capability?: number;
  /**
   * 蓝牙离线提示是否覆盖整个面板(除头部栏外)
   */
  isBleOfflineOverlay?: boolean;
  // 自定义 wifi 离线
  renderWifiOfflineView?: () => JSX.Element;
  // 自定义蓝牙离线
  renderBleOfflineView?: () => JSX.Element;
  /**
   * 自定义渲染状态栏
   */
  renderStatusBar?: () => JSX.Element;
  /**
   * 自定义渲染头部栏
   */
  renderTopBar?: () => JSX.Element;
  /**
   * 自定义头部栏文字样式
   */
  topbarTextStyle?: Omit<TextStyle, 'color'> & { color?: string };
  // wifi 离线的时候用户不想要重新连接跳转
  reconnectTextStyle?: StyleProp<TextStyle>;
  background?: IBackground;
  theme?: GlobalTheme;
  appOnline?: boolean;
  deviceOnline?: boolean;
  showOfflineView?: boolean;
}

export interface IFullViewState {
  showNotification: boolean;
  showToast: boolean;
  information: Record<string, unknown>;
  motionStyle: StyleProp<ViewStyle>;
  successInformation: Record<string, unknown>;
  successStyle: StyleProp<ViewStyle>;
  isShare: false;
}

export interface GlobalTheme {
  type: 'light' | 'dark' | string;
  global: Global;
  text: Text;
  picker: Picker;
  button: Button;
  topbar: Topbar;
  switchButton: SwitchButton;
  slider: Slider;
  checkbox: Checkbox;
  list: List;
  brickButton: BrickButton;
  tips: Tips;
  dialog: Dialog;
  popup: Popup;
}

export type BrickButton = {
  light: BrickButtonTheme;
  dark: BrickButtonTheme;
} & Partial<BrickButtonTheme>;

export interface BrickButtonTheme {
  fontSize: number;
  fontColor: string;
  bgRadius: number;
  bgBorder: string;
  bgBorderWidth: number;
  loadingColor: string;
  loadingBackground: string;
}

export type Button = {
  light: ButtonTheme;
  dark: ButtonTheme;
} & Partial<ButtonTheme>;

export interface ButtonTheme {
  margin: number[];
  fontSize: number;
  iconSize: number;
  bgWidth: number | null;
  bgHeight: number | null;
  bgRadius: number | null;
}

export type Checkbox = {
  light: CheckboxTheme;
  dark: CheckboxTheme;
} & Partial<CheckboxTheme>;

export interface CheckboxTheme {
  size: number;
  fontColor: string;
  activeColor: string;
  disabledColor: string;
}

export type Dialog = {
  type: string;
  basic: DialogTheme;
  dark: DialogTheme;
  system: DialogTheme;
} & Partial<DialogTheme>;

export interface DialogTheme {
  width: number;
  bg: string;
  radius: number;
  cellHeight: number;
  lineColor: string;
  titleFontSize: number;
  titleFontColor: string;
  subTitleFontSize: number;
  subTitleFontColor: string;
  cancelFontSize: number;
  cancelFontColor: string;
  confirmFontSize: number;
  confirmFontColor: string;
  prompt: PromptTheme;
}

export interface PromptTheme {
  bg: string;
  radius: number;
  padding: string;
  placeholder: string;
}

export interface Global {
  brand: string;
  background: string | LinearGradientBackground | RadialGradientBackground;
  fontSizeBase: number;
  dividerColor: string;
  success: string;
  warning: string;
  error: string;
  mask: string;
  text: GlobalText;
}

export interface GlobalText {
  light: string;
  dark: string;
}

export type List = {
  light: ListTheme;
  dark: ListTheme;
} & Partial<ListTheme>;

export interface ListTheme {
  boardBg: string;
  fontColor: string;
  iconColor: string;
  subFontColor: string;
  descFontColor: string;
  cellLine: string;
  cellBg: string;
  cellRadius: number;
  margin: number[];
  padding: number[];
}

export type Picker = {
  light: PickerTheme;
  dark: PickerTheme;
} & Partial<PickerTheme>;

export interface PickerTheme {
  fontSize: number;
  fontColor: string;
  unitFontSize: number;
  unitFontColor: string;
}

export type Popup = {
  type: string;
  basic: PopupTheme;
  dark: PopupTheme;
} & Partial<PopupTheme>;

export interface PopupTheme {
  cellHeight: number;
  cellBg: string;
  cellFontColor: string;
  cellFontSize: number;
  subTitleFontColor: string;
  titleRadius: number;
  titleBg: string;
  titleHeight: number;
  footerRadius: number;
  bottomBg: string;
  lineColor: string;
  titleFontSize: number;
  checkboxColor: string;
  titleFontColor: string;
  cancelFontSize: number;
  cancelFontColor: string;
  confirmFontSize: number;
  confirmFontColor: string;
  backIconColor: string;
  tintColor: string;
  numberSelector: PopupNumberSelectorTheme;
  list: PopupListTheme;
}

export interface PopupListTheme {
  cellFontColor: string;
}

export interface PopupNumberSelectorTheme {
  cellPlusColor: string;
  maximumTrackTintColor: string;
}

export type Slider = {
  light: SliderTheme;
  dark: SliderTheme;
} & Partial<SliderTheme>;

export interface SliderTheme {
  width: number | null;
  trackRadius: number;
  trackHeight: number;
  maximumTrackTintColor: string;
  thumbSize: number;
  thumbRadius: number;
  thumbTintColor: string;
}

export type SwitchButton = {
  light: SwitchButtonTheme;
  dark: SwitchButtonTheme;
} & Partial<SwitchButtonTheme>;

export interface SwitchButtonTheme {
  width: number;
  height: number;
  thumbSize: number;
  margin: number;
  tintColor: string;
  onTintColor: string;
  thumbTintColor: string;
  onThumbTintColor: string;
}

export interface Text {
  heading: TextThemeMap;
  title: TextThemeMap;
  paragraph: TextThemeMap;
}

export interface TextThemeMap {
  small: (props: any) => { fontSize: number; lineHeight: number };
  normal: (props: any) => { fontSize: number; lineHeight: number };
  large: (props: any) => { fontSize: number; lineHeight: number };
}

export type Tips = {
  light: TipsTheme;
  dark: TipsTheme;
} & Partial<TipsTheme>;

export interface TipsTheme {
  bgColor: string;
}

export type Topbar = {
  light: TopbarTheme;
  dark: TopbarTheme;
} & Partial<TopbarTheme>;

export interface TopbarTheme {
  background: string | LinearGradientBackground | RadialGradientBackground;
  color: string;
}
