import { css } from 'styled-components/native';
import CoreUtils from '../core';

const { get, isNil } = CoreUtils;

export const isObject = item => item && typeof item === 'object' && !Array.isArray(item);

export const deepMerge = (target, ...sources) => {
  if (!sources.length) {
    return target;
  }
  // making sure to not change target (immutable)
  const output = { ...target };
  sources.forEach(source => {
    if (isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key]) && isObject(output[key])) {
          if (!output[key]) {
            output[key] = { ...source[key] };
          } else {
            output[key] = deepMerge(output[key], source[key]);
          }
        } else {
          output[key] = source[key];
        }
      });
    }
  });
  return output;
};

/**
 * @desc 解析上下左右值
 *
 * @param {Array} values - 上右下左值
 * @param {String} key - 样式key，如margin、padding等
 */
export const parseToStyle = (values: number[], key: string): { [key: string]: number } => {
  if (!values || !Array.isArray(values)) {
    return {};
  }
  const [top, right, bottom, left] = values;
  return {
    [`${key}Top`]: top,
    [`${key}Right`]: right,
    [`${key}Bottom`]: bottom,
    [`${key}Left`]: left,
  };
};

/**
 * @desc 解析上下左右值
 *
 * @param {Array} values - 上右下左值
 * @param {String} key - 样式key，如margin、padding等
 */
/* istanbul ignore next */
export const parseToCss = (values: number[], key: string): any[] => {
  if (!values || !Array.isArray(values)) {
    return [];
  }
  const [top, right, bottom, left] = values;
  const cssStyle = css`
    ${key}-top: ${top}px;
    ${key}-right: ${right}px;
    ${key}-bottom: ${bottom}px;
    ${key}-left: ${left}px;
  `;
  return cssStyle;
};

/**
 * @desc 从 theme 中取需要的 `theme` 值，
 *
 * @param {Object} props - props，必须包含theme
 * @param {String} key - theme key
 * @param {String | Number} defaultValue - 默认主题值
 *
 * @example
 *
 * 优先级: (以Slider为例)
 * getTheme(props, 'slider.thumbTintColor', '#fff');
 * 
 * props.thumbTintColor ->
 * props.theme.slider.thumbTintColor ->
 * props.theme.slider[props.theme.slider.type].thumbTintColor ->
 * props.theme.slider[props.theme.type].thumbTintColor

 *
 * ```javascript
 *  const StyledView = styled(View)`
 *    background-color: ${props => getTheme(props, 'slider.thumbTintColor', defaultTheme.slider.light.thumbTintColor)};
 * `;
 * ```
 *
 * ```javascript
 *  const defaultTheme = {
 *    type: 'light',
 *    slider: {
 *       type: 'dark',
 *       light: {
 *         thumbTintColor: '#fff',
 *       },
 *       dark: {
 *         thumbTintColor: '#333',
 *         // thumbTintColor: props => props.disabled ? '#999' : '#fff',
 *       }
 *    }
 *  }
 * ```
 */
export const getTheme = (
  props: { [key: string]: any },
  key: string,
  defaultValue?: string | number
): any => {
  const [namespace, ...path] = key.split('.');
  const themeBasicPath = path.join('.');
  const themeType = get(props.theme, `${namespace}.type`) || get(props.theme, 'type', 'light');
  let themeValue;
  let themeTypePath;
  if (themeType) {
    themeTypePath = [namespace, themeType, ...path].join('.');
  }
  if (!isNil(get(props, themeBasicPath))) {
    themeValue = get(props, themeBasicPath);
  } else if (!isNil(get(props.theme, key))) {
    themeValue = get(props.theme, key);
  } else {
    themeValue = get(props.theme, themeTypePath, defaultValue);
  }
  if (typeof themeValue === 'function') {
    themeValue = themeValue(props);
  }
  return themeValue;
};

/* istanbul ignore next */
export const createGetTheme = (namespace: string) => (
  key: string,
  defaultValue: string | number
): string | number => {
  const themeKey = `${namespace}.${key}`;
  return getTheme({ theme: {} }, themeKey, defaultValue);
};

export const getValueFormObject = (
  namespace: string,
  object: Record<string, string | number>
): string | number | null => {
  const keys = Object.keys(object);
  const values = Object.values(object);
  const index = keys.indexOf(namespace);
  if (index !== -1) return values[index];
  return null;
};

type styleType = Record<string, string | number> & Record<string, string | number>[];

export const getPropsFromStyle = (namespace: string, style: styleType): string | number | void => {
  let result;
  if (style instanceof Object) {
    result = getValueFormObject(namespace, style);
  }
  if (style instanceof Array) {
    style.forEach(item => {
      if (isObject(item)) {
        result = getValueFormObject(namespace, item);
      }
    });
  }
  return result;
};
