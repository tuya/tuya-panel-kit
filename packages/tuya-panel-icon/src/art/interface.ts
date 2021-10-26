import { StyleProp, ViewStyle } from 'react-native';

export interface IconARTProps {
  /**
   * @description.zh 图标宽度，默认为 size 的值
   * @description.en Icon width. It is the value of size by default
   * @default 12
   */
  width?: number;
  /**
   * @description.zh 图标高度，默认为 size 的值
   * @description.en Icon height. It is the value of size by default
   * @default 12
   */
  height?: number;
  /**
   * @description.zh 图标起始横坐标
   * @description.en Starting abscissa of Icon
   * @default 0
   */
  x?: number;
  /**
   * @description.zh 图标起始纵坐标
   * @description.en Icon starting ordinate
   * @default 0
   */
  y?: number;
  /**
   * @description.zh 图标宽度放大倍数
   * @description.en Magnification of icon width
   * @default null
   */
  scaleX?: number;
  /**
   * @description.zh 图标高度放大倍数
   * @description.en Multiple of icon height
   * @default null
   */
  scaleY?: number;
  /**
   * @description.zh 图标的放大倍数
   * @description.en Magnification of Icon
   * @default 1.0
   */
  scale?: number;
  /**
   * @description.zh 图标 path，svg 的 path
   * @description.en Icon path and svg path
   * @default ''
   */
  d?: string | { d?: string; viewBox?: string };
  /**
   * @description.zh 填充色，若传递该值 color 会被忽略
   * @description.en Fill color. If this value is passed, color will be ignored.
   * @default null
   */
  fill?: string;
  /**
   * @description.zh 描边色
   * @description.en Stroke color
   * @default null
   */
  stroke?: string;
  /**
   * @description.zh 容器样式
   * @description.en Container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @default null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description.zh 描边宽度
   * @description.en Stroke width
   * @default 1
   */
  strokeWidth?: number;
  /**
   * @description.zh 连接处形状
   * @description.en Shape of the stroke join
   * @default "round"
   */
  strokeJoin?: 'round' | 'miter' | 'bevel';
  /**
   * @description.zh 首尾端形状
   * @description.en Shape of the stroke cap
   * @default "round"
   */
  strokeCap?: 'round' | 'butt' | 'square';
  /**
   * @description.zh 实虚线，数组内第一个元素为一段虚线的长度，第二个为间距
   * @description.en Stroke dash. The first element in the array is the length of a dashed line, and the second parameter is the spacing
   * @default [0, 0]
   */
  strokeDash?: number[];
  /**
   * @description.zh 多个实体渲染时, 空白间隔偏移量, 可以让渲染更紧凑些
   * @description.en When rendering multiple entities, the space offset can make the rendering more compact
   * @default 0
   */
  spaceOffset?: number;
  /**
   * @description.zh 水平翻转
   * @description.en Horizontal flip
   * @default false
   */
  hFlip?: boolean;
  /**
   * @description.zh 垂直翻转
   * @description.en Vertical flip
   * @default false
   */
  vFlip?: boolean;
  /**
   * @description.zh 此道具指定颜色的不透明度或填充当前对象的内容。
   * @description.en This prop specifies the opacity of the color or the content the current object is filled with.
   * @default 1
   */
  fillOpacity?: number;
}

export const iconArtDefault = {
  d: '',
  fill: '#000',
  height: 44,
  width: 44,
  x: 0,
  y: 0,
  scaleX: null,
  scaleY: null,
  scale: 1.0,
  stroke: null,
  strokeWidth: 1,
  style: null,
  strokeJoin: 'round',
  strokeCap: 'round',
  strokeDash: [0, 0],
  spaceOffset: 0,
};

export interface ARTProps extends IconARTProps {
  /**
   * @description.zh 是否使用 ART 形式
   * @description.en Are art forms used
   * @default true
   */
  useART?: true;
  /**
   * @description.zh 上升
   * @description.en ascent
   * @default 896
   */
  ascent?: number;
  /**
   * @description.zh 下降
   * @description.en descent
   * @default -128
   */
  descent?: number;
  /**
   * @description.zh 单位制
   * @description.en unitsPerEm
   * @default 1024
   */
  unitsPerEm?: number;

  /**
   * @description.zh 图标颜色，fill 和 stroke 的缩写
   * @description.en Icon color. Its semantics is equivalent to the combination of fill and stroke
   * @default "#000"
   */
  color?: any;
  /**
   * @description.zh Icon 尺寸，width / height 的缩写
   * @description.en Icon size. Its semantics is equivalent to the combination of width and height.
   * @default 12
   */
  size?: number;

  /**
   * @description.zh 图标id，会从组件库默认图标里取，优先级小于 d
   * @description.en The name of the built-in icon of the component library, which can be obtained from the default icons of the component library. The priority is greater than d.
   * @default undefined
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>IconFontName</a>
   */
  name?: IconFontName;
}

export interface artSvgState {
  currentAppState: boolean;
}

export const artDefault = {
  color: '#000',
  size: 16,
  unitsPerEm: 1024,
  ascent: 896,
  descent: -128,
  hFlip: null,
  vFlip: null,
  name: undefined,
};

export type IconFontName =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 'power'
  | 'arrow'
  | '+'
  | '-'
  | '.'
  | ':'
  | ','
  | 'celsius'
  | 'fahrenheit'
  | '%'
  | 'edit'
  | 'minus'
  | 'plus'
  | 'error'
  | 'warning'
  | 'correct'
  | 'backIos'
  | 'backAndroid'
  | 'moreV'
  | 'moreH'
  | 'close'
  | 'notice-sharp'
  | 'selected-sharp'
  | 'unselected-sharp'
  | 'volume-sharp-off'
  | 'volume-sharp-max'
  | 'volume-border-2'
  | 'volume-border-1'
  | 'volume-border-off'
  | 'help-sharp';
