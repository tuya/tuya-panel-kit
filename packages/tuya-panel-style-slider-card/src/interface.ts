import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { IconBackgroundProps } from 'tuya-panel-style-icon-background';
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
  titleFontWeight: 'normal' as TextStyle['fontWeight'],
  // 参数属性 （title右侧 silder值）
  valueFontColor: '#158CFB',
  valueFontSize: cx(15),
  valueFontWeight: 'normal' as TextStyle['fontWeight'],
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
export interface ISliderProps
  extends Omit<IconBackgroundProps, 'style' | 'showIcon' | 'image' | 'imageRadius'> {
  /**
   * @description.en Slider props， Doc：https://panel-docs.tuyacn.com/docs/data-entry/slider
   * @description.zh Slider props 文档：https://panel-docs.tuyacn.com/docs/data-entry/slider
   */
  sliderProps?: SliderProps; // slider props 设置slider组件的参数 优先级最最高 ，slider组件文档：https://panel-docs.tuyacn.com/docs/data-entry/slider
  /**
   * @description.en Outer container Style
   * @description.zh 外层容器样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.en Title container Style
   * @description.zh 标题容器样式
   */
  titleStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Title text Style
   * @description.zh 标题字体样式
   */
  titleTextStyle?: StyleProp<TextStyle>;
  /**
   * @description.en Content container Style
   * @description.zh 内容容器样式
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Slider thumb Style
   * @description.zh Slider滑块样式
   */
  thumbStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en SliderProps.theme  Doc：https://panel-docs.tuyacn.com/docs/data-entry/slider
   * @description.zh SliderProps.theme  文档：https://panel-docs.tuyacn.com/docs/data-entry/slider
   */
  theme?: Record<string, string>;
  /**
   * @description.en Component background color
   * @description.zh 组件背景颜色
   */
  backgroundColor?: string;
  /**
   * @description.en Component background radius
   * @description.zh 组件背景圆角
   */
  radius?: number;
  /**
   * @description.en max value
   * @description.zh 最大值
   * @default 100
   */
  maximumValue?: number;
  /**
   * @description.en min value
   * @description.zh 最小值
   * @default 0
   */
  minimumValue?: number;
  /**
   * @description.en Sliding groove pattern
   * @description.zh 滑动槽样式
   */
  trackStyle?: StyleProp<ViewStyle>;
  /**
   * @description.en Slider value
   * @description.zh 滑动条的值
   */
  value?: number;
  /**
   * @description.en Value unit
   * @description.zh 参数的单位
   */
  unit?: string;
  /**
   * @description.en Slider Step length
   * @description.zh 滑动条步长
   * @default 1
   */
  stepValue?: number;
  /**
   * @description.en Whether the slider is controlled
   * @description.zh 滑动条是否为受控的
   * @default false
   */
  hasControl?: boolean;
  /**
   * @description.en Whether the value can be changed by touching the track.
   * @description.zh 触摸轨道是否可以更改值
   * @default false
   */
  canTouchTrack?: boolean;
  /**
   * @description.en Whether to disable or not
   * @description.zh 是否禁用
   */
  disabled?: boolean;
  /**
   * @description.en Value change callback
   * @description.zh 值改变回调
   */
  handValueChange?: (value: number) => void;
  /**
   * @description.en Value change completed callback
   * @description.zh 值改变完成回调
   */
  handSlidingComplete?: (value: number) => void;
  /**
   * @description.en Type of the slider: parcel: type of the parcel
   * @description.zh 滑块的类型，parcel：包裹类型
   * @default normal
   */
  type?: 'parcel' | 'normal';
  /**
   * @description.en Custom rendering of the tracks less than the current value.
   * @description.zh 定制渲染小于当前值的轨道
   */
  renderMinimumTrack?: () => React.ReactElement;
  /**
   * @description.en Custom rendering Title
   * @description.zh 自定义渲染标题
   */
  renderTitle?: (value: number) => React.ReactElement;
  /**
   * @description.en Outer container Padding [top, right, bottom, left]
   * @description.zh 外层容器的padding [上，右，下，左]
   */
  padding?: number[];
  /**
   * @description.en Component Width
   * @description.组件宽度
   */
  width?: number;
  /**
   * @description.en Title
   * @description.zh 标题
   */
  title?: string;
  /**
   * @description.en Show title or not
   * @description.zh 是否显示标题
   * @default true
   */
  showTitle?: boolean;
  /**
   * @description.en Title font color
   * @description.zh 标题字体颜色
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
   * @description.en Value font color
   * @description.zh 参数字体颜色
   */
  valueFontColor?: string;
  /**
   * @description.en Value font size
   * @description.zh 参数字体大小
   */
  valueFontSize?: number;
  /**
   * @description.en Value font weight
   * @description.zh 参数字重
   */
  valueFontWeight?: TextStyle['fontWeight'];
  /**
   * @description.en Slider background color
   * @description.zh 滑动条背景色
   */
  sliderBgColor?: string;
  /**
   * @description.en Sliding groove background color
   * @description.zh 滑动槽背景色
   */
  sliderGrooveBgColor?: string;
  /**
   * @description.en Slider thumb color
   * @description.zh 滑块颜色
   */
  sliderThumbColor?: string;
  /**
   * @description.en Slider thumb size
   * @description.zh 滑块大小
   */
  sliderThumbSize?: number;
  /**
   * @description.en Slider thumb radius
   * @description.zh 滑块圆角
   */
  sliderThumbRadius?: number;
  // 底部居左右提示文字
  /**
   * @description.en Bottom left and right prompt text
   * @description.zh 底部左右提示文字
   */
  bottomPromptTexts?: [string, string];
  /**
   * @description.en Button prompt text font size
   * @description.zh 底部提示文字字体大小
   */
  bottomPromptTextFontSize?: number;
  /**
   * @description.en Button prompt text font color
   * @description.zh 底部提示文字字体颜色
   */
  bottomPromptTextFontColor?: string;
  /**
   * @description.en Button prompt text font weight
   * @description.zh 底部提示文字字重
   */
  bottomPromptTextFontWeight?: TextStyle['fontWeight'];
  // slider两边展示的图标
  /**
   * @description.en ICONS on both sides of the slider
   * @description.zh 滑动条两侧的图标
   */
  bothSideIcons?: [IconItem, IconItem];
  /**
   * @description.en Size of ICONS on both sides of the slider
   * @description.zh 滑动条两侧图标的尺寸
   */
  bothSideIconSize?: number;
  /**
   * @description.en Color of ICONS on both sides of the slider
   * @description.zh 滑动条两侧图标的颜色
   */
  bothSideIconColor?: string;
  /**
   * @description.en Custom value rendering
   * @description.zh 自定义的值的渲染
   */
  renderValue?: (value: number) => React.ReactNode; // 自定义的渲染value的呈现 通常用于 slider做枚举时使用
  /**
   * @description.en Whether the card icon is a picture
   * @description.zh 卡片图标是否为图片
   * @default false
   */
  iconIsImage?: boolean;
}

interface IconItem {
  /**
   * @description.en icon or image path、
   * @description.zh 图标或者图片的路径
   */
  icon: string;
  /**
   * @description.en is Image
   * @description.zh 是否为图片
   * @default false
   */
  isImage?: boolean;
}
