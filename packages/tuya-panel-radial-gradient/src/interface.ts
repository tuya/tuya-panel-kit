import { ViewStyle, StyleProp } from 'react-native';

export interface StopsProps {
  offset: string;
  stopColor: string;
  stopOpacity: string;
}

export interface RadialGradientBackground {
  /**
   * @description.zh 最外侧圆的x轴坐标点
   * @description.en The x-axis coordinate point of the outermost circle
   * @default '50%'
   */
  cx?: string;
  /**
   * @description.zh 最外侧圆的y轴坐标点
   * @description.en The y-axis coordinate point of the outermost circle
   * @default '50%'
   */
  cy?: string;
  /**
   * @description.zh 最内侧圆的x轴坐标点(渐变中心点)
   * @description.en The x-axis coordinate point of the innermost circle (gradient center point)
   * @default '50%'
   */
  fx?: string;
  /**
   * @description.zh 最内侧圆的y轴坐标点(渐变中心点)
   * @description.en The y-axis coordinate point of the innermost circle (gradient center point)
   * @default '50%'
   */
  fy?: string;
  /**
   * @description.zh 最内侧圆水平方向的半径(渐变长度)
   * @description.en The horizontal radius of the innermost circle (gradient length)
   * @default '50%'
   */
  rx?: string;
  /**
   * @description.zh 最内侧圆垂直方向的半径(渐变高度)
   * @description.en The vertical radius of the innermost circle (gradient height)
   * @default '50%'
   */
  ry?: string;
  /**
   * @description.zh 渐变梯度停点
   * @description.en The stop point of gradient
   * @default [{ offset: '0%', stopColor: '#ff0', stopOpacity: '1' }, { offset: '100%', stopColor: '#00f', stopOpacity: '1' }]
   */
  stops?: StopsProps[];
}

export interface RadialGradientProps extends RadialGradientBackground {
  /**
   * @description.zh 容器样式
   * @description.en Container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 渐变 id
   * @description.en Gradient ID
   * @default "linear-gradient"
   */
  gradientId?: string;
}
