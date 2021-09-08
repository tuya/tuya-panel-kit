import { Text } from 'react-native';
import styled, { css } from 'styled-components/native';
import { defaultTheme } from 'tuya-panel-theme';
import { Utils } from 'tuya-panel-utils';

const { get } = Utils.CoreUtils;

export interface ITextTheme {
  fontSize: number;
  lineHeight: number;
}

const sizeStyles = (props: {
  size?: ('large' | 'normal' | 'small') | number;
  type?: 'heading' | 'title' | 'paragraph';
  theme: ITextTheme;
}) => {
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
  color: ${(props: { color?: string; theme: ITextTheme }) => {
    const type = get(props.theme, 'type', 'light');
    const path = `global.text.${type}`;
    return props.color || get(props.theme, path, defaultTheme.global.text.light);
  }};
`;

const textAlignStyle = props => {
  if (!props.align) return null;
  return css`
    text-align: ${props.align};
  `;
};

const weightStyle = props => {
  if (!props.weight) return null;
  return css`
    font-weight: ${props.weight};
  `;
};

const fontFamilyStyle = css`
  font-family: ${props => {
    return get(props.theme, 'global.fontFamily', defaultTheme.global.fontFamily);
  }};
`;

export default styled(Text)`
  ${colorStyle};
  ${props => textAlignStyle(props)};
  ${props => weightStyle(props)};
  ${props => sizeStyles(props)};
  background-color: transparent;
  ${props =>
    typeof get(props.theme, 'global.fontFamily', defaultTheme.global.fontFamily) === 'string' &&
    fontFamilyStyle}
`;
