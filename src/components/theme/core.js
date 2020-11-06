import { CoreUtils } from '../../utils';
import baseTheme from './base';

const { get } = CoreUtils;

/**
 * 通用辅助函数
 */
export const getBrandColor = props => get(props, 'theme.global.brand', baseTheme.global.brand);
export const getDividerColor = props =>
  get(props, 'theme.global.dividerColor', baseTheme.global.dividerColor);
export const getTypedFontColor = (props, reverse = false) => {
  let type = get(props.theme, 'type', 'light');
  if (reverse) type = type === 'light' ? 'dark' : 'light';
  const path = `global.text.${type}`;
  return get(props.theme, path, baseTheme.global.text[type]);
};

export const normalizeFont = (props, fontSize, lineHeight) => {
  const baseline = get(props, 'theme.global.fontSizeBase', baseTheme.global.fontSizeBase);
  return {
    fontSize: fontSize * baseline,
    lineHeight: Math.round(lineHeight * baseline), // 不为整数小米会crash
  };
};
