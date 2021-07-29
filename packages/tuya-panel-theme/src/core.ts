import { Utils } from 'tuya-panel-utils';
import baseTheme from './base';

const { get } = Utils.CoreUtils;

/**
 * 通用辅助函数
 */
export const getBrandColor = (props: { [key: string]: any }): string =>
  get(props, 'theme.global.brand', baseTheme.global.brand);
export const getDividerColor = (props: { [key: string]: any }): string =>
  get(props, 'theme.global.dividerColor', baseTheme.global.dividerColor);
export const getTypedFontColor = (props: { [key: string]: any }, reverse = false): string => {
  let type: 'light' | 'dark' = get(props.theme, 'type', 'light');
  if (reverse) type = type === 'light' ? 'dark' : 'light';
  const path = `global.text.${type}`;
  return get(props.theme, path, baseTheme.global.text[type]);
};

export const normalizeFont = (
  props: { [key: string]: any },
  fontSize: number,
  lineHeight: number
): {
  fontSize: number;
  lineHeight: number;
} => {
  const baseline = get(props, 'theme.global.fontSizeBase', baseTheme.global.fontSizeBase);
  return {
    fontSize: fontSize * baseline,
    lineHeight: Math.round(lineHeight * baseline), // 不为整数小米会crash
  };
};

export const CoreTheme = {
  getBrandColor,
  getDividerColor,
  getTypedFontColor,
  normalizeFont,
};
