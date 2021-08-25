import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { BackgroundType } from 'tuya-panel-style-icon-background';
import { SliderProps } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

export const defaultProps = {
  padding: [20, 24, 20, 24],
  style: {}, // 最外层容器 样式  优先级最高
  titleStyle: {
    marginBottom: cx(24),
  }, // title容器样式 优先级最高
  titleTextStyle: {},
  contentStyle: {}, // 内容容器样式 优先级最高
  // 图标属性 title左侧图标
  icon: '',
  iconIsImage: false, // icon是否为图片
  iconSize: cx(12),
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
  // 滑动条
  sliderBgColor: '#158CFB', // 滑动条背景色
  sliderGrooveBgColor: '#E3E9EE', // 滑动槽背景色
  sliderThumbColor: '#fff',
  sliderThumbSize: cx(26), // 滑块大小
  sliderThumbRadius: cx(26),
  // 组件背景
  backgroundColor: '#fff',
  radius: cx(14),
  // slider组件props
  theme: {},
  maximumValue: 100,
  minimumValue: 0,
  // 滑槽样式 优先级最高
  trackStyle: {
    height: cx(6),
    borderRadius: cx(6),
  },
  thumbStyle: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.8,
  },
  unit: '', // 单位
  stepValue: 1,
  hasControl: false, // value是否是受控制的
  canTouchTrack: false,
  disabled: false, // 是否禁用
};

type FontWeight =
  | '500'
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '600'
  | '700'
  | '800'
  | '900';

type Props = {
  sliderProps?: SliderProps; // slider props 设置slider组件的参数 优先级最最高 ，slider组件文档：https://panel-docs.tuyacn.com/docs/data-entry/slider
  width?: number;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  thumbStyle?: Partial<typeof defaultProps.thumbStyle> & StyleProp<ViewStyle>;
  iconBgColor?: BackgroundType;
  titleFontWeight?: FontWeight;
  valueFontWeight?: FontWeight;
  value?: number;
  handValueChange?: (value: number) => void;
  handSlidingComplete?: (value: number) => void;
  type?: 'parcel' | 'normal';
  renderMinimumTrack?: () => React.ReactElement;
  renderTitle?: (value) => React.ReactElement; // title部分自定义渲染 title 和 value部分
  // 底部居左右提示文字
  bottomPromptTexts?: [string, string];
  bottomPromptTextFontSize?: number;
  bottomPromptTextFontColor?: string;
  bottomPromptTextFontWeight?: FontWeight;
  // slider两边展示的图标
  bothSideIcons?: [string, string];
  bothSideIconIsImage?: boolean;
  bothSideIconSize?: number;
  bothSideIconColor?: string;
  canTouchTrack?: boolean;
  disabled?: boolean;
  renderValue?: (value: number) => React.ReactNode; // 自定义的渲染value的呈现 通常用于 slider做枚举时使用
};

export type ISliderProps = Omit<Partial<typeof defaultProps>, 'thumbStyle'> & Props;
