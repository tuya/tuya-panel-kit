import { Text } from 'react-native';
import styled, { css } from 'styled-components/native';
import { defaultTheme } from '../theme';
import CoreUtils from '../../utils/core';

const { get } = CoreUtils;

const sizeStyles = props => {
  if (typeof props.size === 'number') {
    return css`
      font-size: ${props.size}px;
    `;
  }
  if (!props.type || !props.size) {
    return null;
  }
  const path = `text.${props.type}.${props.size}`;
  const ret = get(props.theme, path, defaultTheme.text.title.normal);
  if (typeof ret === 'function') {
    const result = ret(props);
    const cssStyle = css`
      font-size: ${result.fontSize}px;
      line-height: ${result.lineHeight};
    `;
    return cssStyle;
  }
  const cssStyle = css`
    font-size: ${ret.fontSize}px;
    line-height: ${ret.lineHeight};
  `;
  return cssStyle;
};

const colorStyle = css`
  color: ${props => {
    const type = get(props.theme, 'type', 'light');
    const path = `global.text.${type}`;
    return props.color || get(props.theme, path, defaultTheme.global.text.light);
  }};
`;

const textAlignStyle = css`
  text-align: ${props => props.align};
`;

const weightStyle = css`
  font-weight: ${props => props.weight};
`;

export default styled(Text)`
  ${colorStyle};
  ${props => props.align && textAlignStyle};
  ${props => props.weight && weightStyle};
  ${props => sizeStyles(props)};
  background-color: transparent;
`;
