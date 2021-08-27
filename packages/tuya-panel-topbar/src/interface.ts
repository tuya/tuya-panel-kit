import React from 'react';
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  ImageSourcePropType,
} from 'react-native';
import { IconFontProps } from 'tuya-panel-kit';

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

export type BackgroundProps = string | LinearGradientBackground | RadialGradientBackground;

export interface ITopBarContentProps {
  /**
   * @description.zh-CN TopBar.Content 的样式
   * @description The container style of the top toolbar internally handles the three StatusBar situations of iOS versions below and above iPhoneX, and Android. You can also define your own style.
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh-CN TopBar.Content 标题及副标题颜色，副标题颜色为该颜色加 0.6 透明度
   * @description TopBar.Content Title and subtitle color, subtitle color is the color plus 0.6 transparency.
   * @default null
   */
  color?: string;
  /**
   * @description.zh-CN TopBar.Content 的标题
   * @description Title of TopBar.Content
   * @default ''
   */
  title?: string;
  /**
   * @description.zh-CN 标题样式
   * @description Title style
   * @default null
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * @description.zh-CN 副标题
   * @description SubTitle
   * @default ''
   */
  subTitle?: string;
  /**
   * @description.zh-CN 副标题样式
   * @description SubTitle style
   * @default null
   */
  subTitleStyle?: StyleProp<TextStyle>;
  /**
   * @description.zh-CN TopBar.Content 的位置，可为左对齐、居中对齐和右对齐
   * @description TopBar.Content  Can be left, center, and right
   * @default 'center'
   */
  position?: 'left' | 'center' | 'right';
  /**
   * @description.zh-CN 点击事件
   * @description Click event
   * @default () => {}
   */
  children?: React.ReactElement;
  /**
   * @description.zh-CN 子元素
   * @description Sub element
   * @default null
   */
  onPress?: () => void;
}

export interface ITopBarContainerProps {
  /**
   * @description.zh-CN TopBar.Container 的容器样式 内部处理了IOS、IPhoneX及安卓端三种StatusBar的情况，如果不需要StatusBar可以自行定义样式。
   * @description The container style of the top toolbar internally handles the three StatusBar situations of iOS versions below and above iPhoneX, and Android. You can also define your own style.
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh-CN TopBar.Container容器主体的样式
   * @description The style of the container content of the top toolbar.
   * @default null
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh-CN TopBar.Container容器的背景， 可为颜色或者渐变，渐变的格式可参考LinearGradient 或 RadialGradient
   * @description The background of the top toolbar container, which can be a solid color or a gradient color.
   * @default null
   */
  background?: BackgroundProps;
  /**
   * @description.zh-CN TopBar.Container容器的子元素，一般为TopBar.Action和TopBar.Content，TopBar.Container会对这两个组件进行自动适配位置。
   * @description The child elements of the TopBar.Container container are generally TopBar.Action and TopBar.Content. TopBar.Container will automatically adapt the position of these two components.
   * @default null
   */
  children: React.ReactNode[];
}

export interface ITopBarActionProps extends Omit<IconFontProps, 'style'> {
  /**
   * @description.zh-CN 测试标识符
   * @description Test identifier
   * @default null
   */
  accessibilityLabel?: string;
  /**
   * @description.zh-CN TopBar.Action 的样式
   * @description TopBar.Action style
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh-CN TopBar.Action主体的样式，可为图片、文字或IconFont的样式
   * @description TopBar.Action content style, which can be pictures, text, or IconFont.
   * @default null
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh-CN TopBar.Action 的 IconFont 的尺寸
   * @description TopBar.Action IconFont size.
   * @default 17
   */
  size?: number;
  /**
   * @description.zh-CN TopBar.Action 的左右边距，注若为文字类型 spacing 将会被作为额外宽度添加给 Action
   * @description The left and right margins of TopBar.Action.
   * @default 6
   */
  spacing?: number;
  /**
   * @description.zh-CN TopBar.Action 主体内容的颜色，可为图片的底色、文字颜色或 IconFont 颜色。
   * @description TopBar.Action content color, which can be the background color of the picture, text color, or IconFont color.
   * @default null
   */
  color?: string;
  /**
   * @description.zh-CN TopBar.Action的主体内容， 若为字符串则渲染文字组件，若为数值或网络图片则渲染图片组件，若不存在则渲染空View。
   * @description TopBar.Action content.
   * @default null
   */
  source?: ImageSourcePropType | string;
  /**
   * @description.zh-CN 是否禁用
   * @description Whether to disable or not.
   * @default false
   */
  disabled?: boolean;
  /**
   * @description.zh-CN 子元素
   * @description Sub element
   * @default null
   */
  children?: React.ReactElement;
  /**
   * @description.zh-CN 点击事件
   * @description Click event
   * @default () => {}
   */
  onPress?: (event: GestureResponderEvent) => void;
}

export interface ITopBarProps
  extends Omit<ITopBarContainerProps, 'children'>,
    Omit<ITopBarContentProps, 'style'> {
  /**
   * @description.zh-CN TopBar的左工具栏配置。如果它为空，它将呈现iOS和Android的默认返回按钮。
   * @description The left toolbar configuration of TopBar. If it is null, it will render the default return buttons for iOS and Android.
   * @default null
   */
  leftActions?: Omit<ITopBarActionProps, 'children'>[];
  /**
   * @description.zh-CN TopBar的右工具栏配置
   * @description The right toolbar configuration of TopBar.
   * @default null
   */
  actions?: Omit<ITopBarActionProps, 'children'>[];
  /**
   * @description.zh-CN 顶部工具栏的容器内容的样式
   * @description The style of the container content of the top toolbar.
   * @default null
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * @description.zh-CN 顶部工具栏容器的背景，可以是纯色或渐变色。
   * @description The background of the top toolbar container, which can be a solid color or a gradient color.
   * @default null
   */
  background?: BackgroundProps;
  /**
   * @description.zh-CN 返回按钮的回调
   * @description Callback of back
   * @default () => {}
   */
  onBack?: (...args: any[]) => void;
}

export interface IThemeTopBarProps extends ITopBarProps {
  /**
   * @description.zh-CN 头部栏主题
   * @description TopBar theme
   * @default null
   */
  theme?: {
    background?: string;
    color?: string;
  };
}
