import { Utils } from 'tuya-panel-utils';
import { SliderCardComponentProps } from 'tuya-panel-style-slider-card';
const { convertX: cx } = Utils.RatioUtils;

export const defaultProps = {
  sliderDotSize: cx(4),
  sliderDotColor: 'rgba(255, 255, 255, 0.7)',
  activeSliderDotColor: 'rgba(255, 255, 255, 0.4)',
  canTouchTrack: true,
};

export interface EnumList {
  /**
   * @description.en Label
   * @description.zh 名称
   */
  label: string;
  /**
   * @description.en Key
   * @description.zh key
   */
  key: string;
}

type omitProps =
  | 'minimumValue'
  | 'stepValue'
  | 'maximumValue'
  | 'handSlidingComplete'
  | 'handValueChange';

export interface IEnumSliderCardProps extends Omit<SliderCardComponentProps, omitProps> {
  /**
   * @description.en dataSource
   * @description.zh 数据源
   */
  data: Array<EnumList>;
  /**
   * @description.en The currently selected key
   * @description.zh 当前选中的key
   */
  activeKey?: string;
  /**
   * @description.en value change completed callback
   * @description.zh 值改变完成后回调
   */
  handSlidingComplete?: (key: string, index: number) => void;
  /**
   * @description.en value change callback
   * @description.zh 值改变回调
   */
  handValueChange?: (key: string, index: number) => void;
  /**
   * @description.en Size of dot on scroll bar
   * @description.zh 滚动条上小圆点尺寸
   */
  sliderDotSize?: number;
  /**
   * @description.en The color of the dot to the right of the value
   * @description.zh 参数右边的小圆点颜色
   */
  sliderDotColor?: string; // 滑动块右边圆点的color
  /**
   * @description.en The color of the dot to the left of the value
   * @description.zh 参数左边的小圆点颜色
   */
  activeSliderDotColor?: string; // 滑动块左边圆点的color
}
