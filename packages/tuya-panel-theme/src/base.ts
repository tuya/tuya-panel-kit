import { Utils } from 'tuya-panel-utils';
import { getBrandColor, getTypedFontColor, normalizeFont } from './core';

const { convertX: cx } = Utils.RatioUtils;

export interface IProps {
  [key: string]: any;
}

export interface IStyle {
  fontSize: number;
  lineHeight: number;
}

/**
 * 全局颜色变量
 */
const globalVariable = {
  brand: '#FF4800', // 品牌色
  background: '#f8f8f8', // 背景色
  fontSizeBase: 1, // 字体基准比例
  dividerColor: '#e5e5e5', // 分隔线颜色
  success: '#00C800',
  warning: '#FAAE17',
  error: '#F4182C',
  fontFamily: undefined,
  // info, // 信息色
  // disabled, // 禁用透明度
  mask: 'rgba(0, 0, 0, 0.7)', // 遮罩颜色
  text: {
    light: '#333',
    dark: '#fff',
  },
};

/**
 * 字体变量
 */
const text = {
  heading: {
    small: (props: IProps): IStyle => normalizeFont(props, 28, 40),
    normal: (props: IProps): IStyle => normalizeFont(props, 40, 56),
    large: (props: IProps): IStyle => normalizeFont(props, 72, 100),
  },
  title: {
    small: (props: IProps): IStyle => normalizeFont(props, 16, 22),
    normal: (props: IProps): IStyle => normalizeFont(props, 17, 24),
    large: (props: IProps): IStyle => normalizeFont(props, 20, 28),
  },
  // title以上都走主要字体色#333
  paragraph: {
    small: (props: IProps): IStyle => normalizeFont(props, 10, 14),
    normal: (props: IProps): IStyle => normalizeFont(props, 12, 17),
    large: (props: IProps): IStyle => normalizeFont(props, 14, 20),
  },
};

/**
 * 选择器
 */
const picker = {
  light: {
    fontSize: 30,
    fontColor: 'rgba(0,0,0,0.9)',
    dividerColor: 'rgba(0, 0, 0, 0.05)',
    unitFontSize: 14,
    unitFontColor: 'rgba(0,0,0,0.9)',
  },
  dark: {
    fontSize: 30,
    fontColor: '#fff',
    dividerColor: 'rgba(255, 255, 255, 0.1)',
    unitFontSize: 14,
    unitFontColor: '#fff',
  },
};

/**
 * 头部栏
 */
const topbar = {
  light: {
    background: '#fff',
    color: '#000',
  },
  dark: {
    background: '#323232',
    color: '#fff',
  },
};

/**
 * 按钮
 */
const switchButton = {
  light: {
    width: 48, // 按钮宽度
    height: 28, // 按钮宽度
    thumbSize: 24, // 滑块宽高尺寸
    // thumbWidth, // 滑块圆的宽度
    // thumbHeight, // 滑块圆的高度
    margin: 2, // 滑块四周边距
    tintColor: '#e5e5e5', // 关闭情况下背景色
    onTintColor: '#4CD964', // 开启情况下背景色
    thumbTintColor: '#fff', // 关闭情况下滑块背景色
    onThumbTintColor: '#fff', // 开启情况下滑块背景色
  },
  dark: {
    width: 48, // 按钮宽度
    height: 28, // 按钮宽度
    thumbSize: 24, // 滑块宽高尺寸
    margin: 2, // 滑块四周边距
    tintColor: 'rgba(255,255,255,0.3)', // 关闭情况下背景色
    onTintColor: '#4CD964', // 开启情况下背景色
    thumbTintColor: '#fff', // 关闭情况下滑块背景色
    onThumbTintColor: '#fff', // 开启情况下滑块背景色
  },
};

/**
 * 选择框
 */
const checkbox = {
  light: {
    size: 28,
    fontColor: '#333',
    activeColor: '#3388FF',
    disabledColor: '#333',
  },
  dark: {
    size: 28,
    fontColor: '#fff',
    activeColor: '#7ED321',
    disabledColor: '#fff',
  },
};

/**
 * 滑动器
 */
const slider = {
  light: {
    width: null, // 默认跟随父容器(滑块宽度)
    trackRadius: 2, // 滑块圆角
    trackHeight: 4, // 滑块高度
    minimumTrackTintColor: getBrandColor, // 最小值颜色
    maximumTrackTintColor: '#e5e5e5', // 最大值颜色
    thumbSize: 24, // 滑块圆的尺寸（TODO: 是否被宽高替代）
    thumbRadius: 14, // 滑块圆的圆角
    thumbTintColor: '#fff', // 滑块的颜色
    // thumbWidth, // 滑块圆的宽度
    // thumbHeight, // 滑块圆的高度
    // thumbBorder,
    // thumbColor,
  },
  dark: {
    width: null, // 默认跟随父容器
    trackRadius: 2,
    trackHeight: 4,
    minimumTrackTintColor: getBrandColor,
    maximumTrackTintColor: 'rgba(255, 255, 255, 0.3)',
    thumbSize: 24,
    thumbRadius: 14,
    thumbTintColor: '#fff',
  },
};

/**
 * 列表
 */
const list = {
  light: {
    boardBg: '#f8f8f8',
    iconColor: 'rgba(0, 0, 0, 0.2)',
    fontColor: '#333',
    subFontColor: 'rgba(51, 51, 51, 0.5)',
    descFontColor: 'rgba(51, 51, 51, 0.5)',
    cellLine: 'rgba(51, 51, 51, 0.1)',
    cellBg: '#fff',
    cellRadius: 0,
    margin: [0, 0, 0, 0],
    padding: [12, cx(14), 12, cx(14)],
  },
  dark: {
    boardBg: '#2b2c2a',
    fontColor: '#fff',
    iconColor: 'rgba(255, 255, 255, 0.5)',
    subFontColor: 'rgba(255, 255, 255, 0.5)',
    descFontColor: 'rgba(255, 255, 255, 0.5)',
    cellLine: 'rgba(255, 255, 255, 0.02)',
    cellBg: 'rgba(255, 255, 255, 0.02)',
    cellRadius: 0,
    margin: [0, 0, 0, 0],
    padding: [12, cx(14), 12, cx(14)],
  },
};

/**
 * 提示Toast，os平台不允许修改
 */
// const toast = {
//   light: {
//     bgColor: '#fff', // 背景颜色
//     fontColor: '#333', // 跟随主要字体颜色
//   },
// };

/**
 * 按钮
 */
const button = {
  light: {
    margin: [0, 0, 0, 0], // 按钮容器边距
    fontSize: 10, // 字体尺寸
    fontColor: getTypedFontColor,
    iconSize: 17,
    iconColor: (props: IProps): string => getTypedFontColor(props, props.type === 'primary'),
    bgWidth: null, // 按钮背景宽度，默认组件内部自适应
    bgHeight: null, // 按钮背景高度，默认组件内部自适应
    bgRadius: null, // 按钮背景圆角，默认组件内部自适应
    bgColor: getBrandColor, // 按钮背景色，默认跟随主色
    // bgBorder, // 安卓有瑕疵预留暂不支持
    // bgBorderWidth, // 安卓有瑕疵预留暂不支持
    // badgeText, // 预留暂不暴露
    // badgeTextColor, // 预留暂不暴露
  },
  dark: {
    margin: [0, 0, 0, 0], // 按钮容器边距
    fontSize: 10,
    fontColor: getTypedFontColor,
    iconSize: 17,
    iconColor: (props: IProps): string => getTypedFontColor(props, props.type === 'primary'),
    bgWidth: null, // 按钮背景宽度，默认组件内部自适应
    bgHeight: null, // 按钮背景高度，默认组件内部自适应
    bgRadius: null, // 按钮背景圆角，默认组件内部自适应
    bgColor: getBrandColor, // 按钮背景色，默认跟随主色
  },
};

// const controllerBar = {
//   fontColor, // 文字颜色
//   fontSize, // 文字大小
//   iconColor, // 图标颜色
//   iconSize, // 图标大小
//   iconInset, // 图标间距
//   iconBgColor, // 图标颜色
//   iconBgRadius, // 图标背景圆角
//   iconBgBorderColor, // 预留
//   iconBgBorderWidth, // 预留
// };

/**
 * brick按钮
 */
const brickButton = {
  light: {
    fontSize: 12,
    fontColor: '#fff',
    bgRadius: 24,
    bgColor: getBrandColor, // 跟随主色
    bgBorder: 'transparent',
    bgBorderWidth: 0,
    loadingColor: '#fff',
    loadingBackground: 'rgba(0,0,0,.1)',
  },
  dark: {
    fontSize: 12,
    fontColor: '#fff',
    bgRadius: 24,
    bgColor: getBrandColor, // 跟随主色
    bgBorder: 'transparent',
    bgBorderWidth: 0,
    loadingColor: '#fff',
    loadingBackground: 'rgba(0,0,0,.1)',
  },
};

/**
 * Tips 气泡
 */

const tips = {
  light: {
    bgColor: '#fff',
  },
  dark: {
    bgColor: '#4A4A4A',
  },
};

/**
 * Dialog 弹窗
 */
const dialog = {
  type: 'basic', // Enum: basic | dark | system

  /**
   * @desc 默认风格
   */
  basic: {
    width: cx(311), // 弹窗容器宽度
    bg: '#fff', // 弹窗背景色
    radius: cx(16), // 弹窗容器圆角
    cellHeight: 55, // 列表高度（头部、底部）
    lineColor: 'rgba(0, 0, 0, 0.1)', // 分隔线颜色
    titleFontSize: 17, // 标题字体大小
    titleFontColor: 'rgba(0, 0, 0, 0.9)', // 头部栏标题颜色
    subTitleFontSize: 15, // 副标题字体大小
    subTitleFontColor: 'rgba(0, 0, 0, 0.5)', // 头部栏副标题颜色
    cancelFontSize: 17,
    cancelFontColor: 'rgba(0, 0, 0, 0.7)', // 底部栏取消字体颜色
    confirmFontSize: 17,
    confirmFontColor: '#FF4800', // 底部栏确认字体颜色
    pressColor: '#E5E5E5',
    prompt: {
      padding: '12px 0px', // 输入框边距
      placeholder: 'rgba(0, 0, 0, 0.3)', // 占位符字体颜色
      bg: '#fff', // 输入框背景色
      radius: 0, // 输入框圆角
    },
  },
  /**
   * @desc 黑色主题
   */
  dark: {
    width: cx(311), // 弹窗容器宽度
    bg: '#1a1a1a', // 弹窗背景色
    radius: cx(16), // 弹窗容器圆角
    cellHeight: 55, // 列表高度（头部、底部）
    lineColor: 'rgba(255, 255, 255, 0.1)', // 分隔线颜色
    titleFontSize: 17, // 标题字体大小
    titleFontColor: '#FFF', // 头部栏标题颜色
    subTitleFontSize: 15, // 副标题字体大小
    subTitleFontColor: 'rgba(255, 255, 255, 0.7)', // 头部栏副标题颜色
    cancelFontSize: 17,
    cancelFontColor: 'rgba(255, 255, 255, 0.7)', // 底部栏取消字体颜色
    confirmFontSize: 17,
    confirmFontColor: '#FF4800', // 底部栏确认字体颜色
    prompt: {
      padding: '12px 0px', // 输入框边距
      placeholder: 'rgba(255, 255, 255, 0.3)', // 占位符字体颜色
      bg: '#fff', // 输入框背景色
      radius: 0, // 输入框圆角
    },
    pressColor: '#313131',
  },

  /**
   * @desc 系统风格
   */
  system: {
    width: cx(271), // 弹窗容器宽度
    bg: '#fff', // 背景色
    radius: cx(14), // 弹窗容器圆角
    cellHeight: 48, // 列表高度（头部、底部）
    lineColor: '#dbdbdb', // 分隔线颜色
    titleFontSize: 17,
    titleFontColor: '#333', // 头部栏标题颜色
    subTitleFontSize: 13, // 副标题字体大小
    subTitleFontColor: '#333', // 头部栏副标题颜色
    cancelFontSize: 16,
    cancelFontColor: '#0077FF', // 底部栏取消字体颜色
    confirmFontSize: 16,
    confirmFontColor: '#0077FF', // 底部栏确认字体颜色
    prompt: {
      bg: '#fff', // 输入框背景色
      radius: 0, // 输入框圆角
      padding: '3px 4px', // 输入框边距
      placeholder: '#b5b5b5', // 占位符字体颜色
    },
  },
};

/**
 * Popup 弹出层
 */
const popup = {
  type: 'basic', // Enum: basic| dark | ...
  basic: {
    cellHeight: 56, // 列表高度
    cellBg: '#fff', // 列表底色
    cellFontColor: 'rgba(0,0,0,0.9)', // 列表字体颜色
    cellFontSize: 16, // 列表字体大小
    subTitleFontColor: 'rgba(0, 0, 0, .5)', // 头部栏副标题颜色
    titleRadius: 16, // 头部圆角
    titleBg: '#ffffff', // 头部背景色
    titleHeight: 56, // 头部高度
    footerRadius: 0, // 底部圆角
    bottomBg: '#f8f8f8', // 底部栏底色
    lineColor: 'rgba(0, 0, 0, 0.1)', // 分隔线颜色
    titleFontSize: 14,
    checkboxColor: '#FF4800', // 选中icon颜色
    titleFontColor: 'rgba(0,0,0,0.9)', // 头部栏标题颜色
    cancelFontSize: 16,
    cancelFontColor: 'rgba(0,0,0,0.7)', // 底部栏取消字体颜色
    confirmFontSize: 16,
    confirmFontColor: '#FF4800', // 底部栏确认字体颜色
    pressColor: '#E5E5E5',
    backIconColor: '#000', // 返回文案和按钮颜色
    tintColor: '#e5e5e5', // SwitchButton 关闭情况下背景色，popup 需要独立
    numberSelector: {
      cellPlusColor: '#666', // Number-selector的加减颜色
      maximumTrackTintColor: '#D8D8D8', // 大于当前值的轨道颜色
    },
    list: {
      cellFontColor: 'rgba(0,0,0,0.9)', // List 内容字体颜色
    },
  },
  dark: {
    cellHeight: 56, // 列表高度
    cellBg: '#1A1A1A', // 列表底色
    cellFontColor: 'rgba(255, 255, 255, 0.9)', // 列表字体颜色
    cellFontSize: 16, // 列表字体大小
    subTitleFontColor: 'rgba(255,255,255,0.5)', // 头部栏副标题颜色
    titleRadius: 16, // 头部圆角
    titleBg: '#1A1A1A', // 头部背景色
    titleHeight: 56, // 头部高度
    footerRadius: 0, // 底部圆角
    bottomBg: '#000', // 底部栏底色
    lineColor: 'rgba(255,255,255, 0.1)', // 分隔线颜色
    titleFontSize: 14,
    checkboxColor: '#FF4800', // 选中icon颜色
    titleFontColor: 'rgba(255, 255, 255, 0.9)', // 头部栏标题颜色
    cancelFontSize: 16,
    cancelFontColor: 'rgba(255,255,255,0.7)', // 底部栏取消字体颜色
    confirmFontSize: 16,
    confirmFontColor: '#FF4800', // 底部栏确认字体颜色
    backIconColor: '#fff', // 返回文案和按钮颜色
    tintColor: 'rgba(255, 255, 255, 0.3)', // SwitchButton 关闭情况下背景色，popup 需要独立
    pressColor: '#313131',
    numberSelector: {
      cellPlusColor: '#fff', // Number-selector的加减颜色
      maximumTrackTintColor: '#1A1A1A', // 大于当前值的轨道颜色
    },
    list: {
      cellFontColor: 'rgba(255, 255, 255, 0.9)', // List 内容字体颜色
    },
  },
};

export default {
  type: 'light',
  global: globalVariable,
  text,
  picker,
  button,
  topbar,
  switchButton,
  slider,
  checkbox,
  list,
  brickButton,
  tips,
  dialog,
  popup,
};
