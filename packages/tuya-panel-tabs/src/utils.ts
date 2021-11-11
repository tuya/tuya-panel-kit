import { Utils } from 'tuya-panel-utils';
import { PRESS_THRESHOLD, SWIPE_THRESHOLD, VELOCITY_THRESHOLD } from './constant';

const { winWidth } = Utils.RatioUtils;
const { inMaxMin } = Utils.NumberUtils;

/**
 * @desc 计算tab的宽度
 *
 * @param {Number} maxNum - 一屏上的tab最大数量
 */
export const getTabWidth = (maxNum = 4, tabsWidth = winWidth): number => tabsWidth / maxNum;

/**
 * @desc 根据x轴的位置获取当前所处位置tab的索引
 *
 * @param {Number} deltaX - 当前 x 轴的偏移量
 * @param {Number} indexWidth - 一个索引对应的宽度
 */
export const getIndexByDeltaX = (deltaX: number, indexWidth: number): number =>
  Math.floor(deltaX / indexWidth);

/**
 * @desc 根据x轴偏移量获取距离最近tab的索引
 *
 * @param {Number} deltaX - 当前 x 轴的偏移量
 * @param {Number} indexWidth - 一个索引对应的宽度
 * @param {Number} maxIndex - 最大的索引值
 */
export const getNearestIndexByDeltaX = (
  deltaX: number,
  indexWidth: number,
  maxIndex = 100
): number => {
  if (deltaX > 0) return 0;
  return inMaxMin(0, maxIndex, Math.round(Math.abs(deltaX) / indexWidth));
};

/**
 * @desc 获取索引在循环范围内的邻近的值
 *
 * @param {Number} idx - 新索引
 * @param {Number} min - 最小值
 * @param {Number} max - 最大值
 */
export const getSiblingIndex = (index: number, min: number, max: number): number[] => {
  if (index === min && index === max) {
    return [index, index];
  }
  if (index === min) {
    return [index, index + 1];
  }
  if (index === max) {
    return [index - 1, index];
  }
  return [index - 1, index + 1];
};

/**
 *
 * @desc 获取居中对齐的tab索引
 *
 * @param {Number} idx - 当前tab的索引
 * @param {Number} oneScreenTabNum - 一屏可放下的tab数量
 * @param {Number} totalNum - tab总数量
 */
export const getCenteredScrollIndex = (
  idx: number,
  oneScreenTabNum: number,
  totalNum: number
): number => {
  const min = 0;
  const max = Math.max(0, totalNum - oneScreenTabNum);
  const median = Math.ceil(oneScreenTabNum / 2) - 1;
  const scrollToIdx = idx - median;
  const index = inMaxMin(min, max, scrollToIdx);
  return index;
};

/**
 * @desc 判断是否为合法的 Press 事件
 *
 * @param {Number} dx - x轴偏移量
 * @param {Number} dy - y轴偏移量
 */
export const isValidPress = (dx: number, dy: number): boolean =>
  Math.abs(dx) <= PRESS_THRESHOLD && Math.abs(dy) <= PRESS_THRESHOLD;

/**
 * @desc 判断是否为合法的 Swipe 事件
 *
 * @param {Number} velocity - 加速度
 * @param {Number} direction - 移动距离
 */
export const isValidSwipe = (velocity: number, direction: number): boolean => {
  return Math.abs(velocity) > VELOCITY_THRESHOLD && Math.abs(direction) < SWIPE_THRESHOLD;
};

/**
 * @desc 根据`tabLayout`累加算出每一个`tab`的`left`偏移量
 *
 * @param {Array} tabLayout - tab的布局属性，包含 x, y, width, height
 */
export const reduceTabLayoutLeft = tabLayout => {
  return tabLayout.reduce((acc, cur, index) => {
    if (index === 0) {
      return [{ ...cur, left: cur.x }];
    }
    const prev = acc[index - 1];
    const prevTotalX = prev.left + prev.width + prev.x;
    return [
      ...acc,
      {
        ...cur,
        left: prevTotalX + cur.x,
      },
    ];
  }, {});
};
