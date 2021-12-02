import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;

// 超出可滑动边界时的摩擦值
export const FRICTION_LEVEL = 0.2;

// 滑动不超过多少距离可判断为点击事件
export const PRESS_THRESHOLD = 5;

// 加速度可判断为 Swipe 事件
export const VELOCITY_THRESHOLD = 0.3;

// 滑动不超过多少距离可判断为 Swipe 事件
export const SWIPE_THRESHOLD = 80;

// Swipe 减速度，与ScrollView默认值保持一致
export const DECELERATION = 0.998;

export const MASK_SIZE = { width: cx(64), height: 36 };
