import { Utils } from 'tuya-panel-utils';
import { BackgroundType } from 'tuya-panel-style-icon-background';
import React from 'react';

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

export type RangeItem = {
  label: string;
  key: string;
  disabled?: boolean;
} & Record<string, unknown>;

type ActiveKeys = Array<string>;

type Props = {
  width?: number;
  // backgroundColor?: BackgroundType;
  iconBgColor?: BackgroundType;
  buttonFontWeight?: FontWeightType;
  activeButtonFontWeight?: FontWeightType;
  titleFontWeight?: FontWeightType;
  disabled?: boolean;
  list?: Array<RangeItem>;
  activeKeys?: ActiveKeys;
  defaultActiveKeys?: ActiveKeys;
  activeKeyChange?: (key: string, nextKeys: ActiveKeys, data: RangeItem) => void;
  renderButtonItem?: (data: RangeItem) => React.ReactElement; // 自定义button的渲染方法
  type?: 'radio' | 'multi'; // 单选还是多选 默认单选
};

// export type IButtonCardProps = Partial<Omit<typeof defaultProps, keyof Props>> & Props;
export type IButtonCardProps = Partial<typeof defaultProps> & Props;

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
