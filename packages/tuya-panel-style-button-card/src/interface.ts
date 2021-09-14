import { Utils } from 'tuya-panel-utils';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';
import React from 'react';
import { TextStyle, ViewStyle, StyleProp } from 'react-native';

const { convertX: cx } = Utils.RatioUtils;

export const defaultProps = {
  style: {}, // content容器 样式  优先级最高
  textStyle: {}, // 枚举项里面小文字样式 优先级最高
  titleStyle: {}, // 标题的样式 优先级最高
  titleContentStyle: {}, // 标题容器的样式
  buttonStyle: {}, // 按钮的样式 优先级最高
  padding: [cx(24), cx(20), cx(24), cx(20)],
  // title属性
  title: '',
  showTitle: true,
  titleFontSize: cx(15),
  titleFontColor: '#3d3d3d',
  titleFontWeight: 'normal',
  // icon属性
  icon: '',
  iconSize: cx(14),
  iconColor: '#3d3d3d',
  // icon 背景属性
  iconBgSize: cx(30),
  iconBgColor: '#f8f8f8',
  iconBgRadius: cx(30),
  showIconBg: false,
  // 按钮样式相关
  buttonHeight: cx(32),
  buttonBgColor: 'rgba(21, 140, 251, 0.1)',
  buttonBgRadius: cx(32),
  buttonFontSize: cx(12),
  buttonFontColor: 'rgba(21, 140, 251, 1)',
  buttonFontWeight: 'normal',
  buttonOffset: cx(6),
  // 按钮选中样式
  activeButtonBgColor: '#158CFB',
  activeButtonFontSize: cx(12),
  activeButtonFontColor: '#fff',
  activeButtonFontWeight: 'normal',
  // 背景
  backgroundColor: '#fff',
  radius: cx(14),
  rowCount: 3, // 一行展示的按钮的个数
  type: 'radio',
};

export interface RangeItem extends Record<string, unknown> {
  /**
   * @description.en Label
   * @description.zh 名称
   */
  label: string;
  /**
   * @description.en Key
   * @description.zh 唯一的key
   */
  key: string;
  /**
   * @description.en Whether the current button is disabled
   * @description.zh 当前按钮是否禁用
   */
  disabled?: boolean;
}

type ActiveKeys = Array<string>;
export interface IButtonCardProps
  extends Omit<IconBackgroundProps, 'style' | 'image' | 'showIcon' | 'imageRadius'> {
  /**
   * @description.en The button data
   * @description.zh 按钮数据
   */
  list: Array<RangeItem>;
  /**
   * @description.en The currently selected Key is passed into the component for control
   * @description.zh 当前选中的key，传入组件受控
   */
  activeKeys?: ActiveKeys;
  /**
   * @description.en The key selected by default
   * @description.zh 默认选中的 key
   */
  defaultActiveKeys?: ActiveKeys;
  /**
   * @description.en Select the callback function for key
   * @description.zh 选择key的回调函数
   */
  activeKeyChange?: (key: string, nextKeys: ActiveKeys, data: RangeItem) => void;
  /**
   * @description.en Custom button rendering methods
   * @description.zh 自定义的button渲染方法
   */
  renderButtonItem?: (data: RangeItem) => React.ReactElement; // 自定义button的渲染方法
  /**
   * @description.en Number of buttons per row
   * @description.zh 每行按钮的个数
   */
  rowCount?: number;
  /**
   * @description.Single mode or multiple mode
   * @description.zh 单选模式还是多选模式
   * @default radio
   */
  type?: 'radio' | 'multi'; // 单选还是多选 默认单选
  /**
   * @description.en Disable
   * @description.zh 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @description.en The Outer container Style
   * @description.zh 外层容器样式
   */
  style?: StyleProp<ViewStyle>; // content容器 样式  优先级最高
  /**
   * @description.en The title container style
   * @description.zh 标题容器样式
   */
  titleContentStyle?: StyleProp<ViewStyle>; // 标题容器的样式
  /**
   * @description.en The title text style
   * @description.zh 标题文字样式
   */
  titleStyle?: StyleProp<TextStyle>; // 标题的样式 优先级最高
  /**
   * @description.en The button container style
   * @description.zh 按钮容器样式
   */
  buttonStyle?: StyleProp<ViewStyle>; // 按钮的样式 优先级最高
  /**
   * @description.en The button text style
   * @description.zh 按钮文字样式
   */
  textStyle?: StyleProp<TextStyle>; // 枚举项里面小文字样式 优先级最高
  /**
   * @description.en The content padding [Top, Right, Bottom, Left]
   * @description.zh 组件内边距 [上，右，下，左]
   * @default [cx(24), cx(20), cx(24), cx(20)]
   */
  padding?: number[];
  /**
   * @description.en Width
   * @description.zh 宽度
   */
  width?: number;
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
  /**
   * @description.en Button height
   * @description.zh 按钮高度
   */
  buttonHeight?: number;
  /**
   * @description.en Button background color
   * @description.zh 按钮背景颜色
   */
  buttonBgColor?: string;
  /**
   * @description.en Button radius
   * @description.zh 按钮圆角
   */
  buttonBgRadius?: number;
  /**
   * @description.en Button text font sie
   * @description.zh 按钮文字字体大小
   */
  buttonFontSize?: number;
  /**
   * @description.en Button text font color
   * @description.zh 按钮文字颜色
   * @default
   */
  buttonFontColor?: string;
  /**
   * @description.en The distance between the vertical buttons
   * @description.zh 竖直方向按钮之间的距离
   */
  buttonOffset?: number;
  /**
   * @description.en The button text font weight
   * @description.zh 按钮文字字重
   * @default normal
   */
  buttonFontWeight?: TextStyle['fontWeight'];
  /**
   * @description.en Active Button background color
   * @description.zh 选中的按钮的背景颜色
   */
  activeButtonBgColor?: string;
  /**
   * @description.en Active Button font size
   * @description.zh 选中的按钮的字体大小
   */
  activeButtonFontSize?: number;
  /**
   * @description.en Active Button font color
   * @description.zh 选中的按钮字体颜色
   */
  activeButtonFontColor?: string;
  /**
   * @description.en The selected button text font weight
   * @description.zh 选中的按钮文字字重
   * @default normal
   */
  activeButtonFontWeight?: TextStyle['fontWeight'];
  /**
   * @description.en The title
   * @description.zh 标题
   */
  title?: string;
  /**
   * @description.en The Show title or not
   * @description.zh 是否显示标题
   * @default true
   */
  showTitle?: boolean;
  /**
   * @description.en The title font size
   * @description.zh 标题的文字大小
   */
  titleFontSize?: number;
  /**
   * @description.en The title font color
   * @description.zh 标题字体颜色
   */
  titleFontColor?: string;
  /**
   * @description.en The title font weight
   * @description.zh 标题文字字重
   * @default normal
   */
  titleFontWeight?: TextStyle['fontWeight'];
}
