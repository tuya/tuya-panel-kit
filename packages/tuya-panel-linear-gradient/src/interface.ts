import { StyleProp, ViewStyle } from 'react-native';

export interface ILinearProps extends LinearGradientBackground {
  /**
   * @description.zh 渐变 id
   * @description.en Gradient ID
   * @default "linear-gradient"
   */
  gradientId?: string;
  /**
   * @description.zh 容器样式
   * @description.en Container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 该子节点会被添加渐变效果，一般为 Rect
   * @description.en The child node is added with a gradient effect, usually rect
   * @default null
   */
  children?: React.ReactElement;
}

export interface LinearGradientBackground {
  /**
   * @description.zh 起始点的x轴坐标
   * @description.en The x-axis coordinate of the starting point
   * @default '0%'
   */
  x1?: string;
  /**
   * @description.zh 终点的x轴坐标
   * @description.en The x-axis coordinate of the ending point
   * @default '0%'
   */
  x2?: string;
  /**
   * @description.zh 起始点的y轴坐标
   * @description.en The y-axis coordinate of the starting point
   * @default '0%'
   */
  y1?: string;
  /**
   * @description.zh 终点的y轴坐标
   * @description.en The y-axis coordinate of the ending point
   * @default '0%'
   */
  y2?: string;
  /**
   * @description.zh 渐变梯度停点
   * @description.en The stop point of gradient
   * @default { '0%': 'rgb(255, 255, 255)', '100%': 'rgb(0, 0, 0)' }
   */
  stops?: Record<string, string>;
}

export interface IState {
  stops: Record<string, string>;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}

export const defaultLinear = {
  gradientId: 'linear-gradient',
  style: null,
  children: null,
  stops: {
    '0%': 'rgb(255, 255, 255)',
    '100%': 'rgb(0, 0, 0)',
  },
  x1: '0%',
  y1: '0%',
  x2: '0%',
  y2: '100%',
};
