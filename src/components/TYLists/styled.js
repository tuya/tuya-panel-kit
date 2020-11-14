import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import TYText from '../TYText';
import IconFont from '../iconfont';
import { defaultTheme } from '../theme';
import { RatioUtils, ThemeUtils } from '../../utils';

const DEFAULT_THEME = defaultTheme.list.light;

const { convertX: cx } = RatioUtils;
const { parseToCss, getTheme, ThemeConsumer } = ThemeUtils;

export const StyledItem = styled(TouchableOpacity)`
  flex-grow: 0;
  align-self: stretch;
  min-height: 48px;
  ${props => {
    const margin = getTheme(props, 'list.margin', DEFAULT_THEME.margin);
    return parseToCss(margin, 'margin');
  }};
  background-color: ${props => getTheme(props, 'list.cellBg', DEFAULT_THEME.cellBg)};
  border-radius: ${props => getTheme(props, 'list.cellRadius', DEFAULT_THEME.cellRadius)};
`;

export const StyledItemContent = styled(View)`
  flex-direction: row;
  align-items: center;
  ${props => {
    const padding = getTheme(props, 'list.padding', DEFAULT_THEME.padding);
    return parseToCss(padding, 'padding');
  }};
  opacity: ${props => (props.disabled ? 0.3 : 1)};
  border-radius: ${props => getTheme(props, 'list.cellRadius', DEFAULT_THEME.cellRadius)};
`;

export const StyledItemLeft = styled(View)`
  justify-content: center;
  margin-right: ${cx(10)};
`;

export const StyledItemCenter = styled(View)`
  flex: 1;
  justify-content: center;
`;

export const StyledItemRight = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-left: ${cx(10)};
`;

export const StyledTitle = styled(TYText).attrs({
  type: 'title',
  size: 'small',
})`
  color: ${props => getTheme(props, 'list.fontColor', DEFAULT_THEME.fontColor)};
`;

export const StyledSubTitle = styled(TYText).attrs({
  type: 'paragraph',
  size: 'large',
})`
  margin-top: 4px;
  color: ${props => getTheme(props, 'list.subFontColor', DEFAULT_THEME.subFontColor)};
`;

export const StyledValueText = styled(TYText).attrs({
  type: 'paragraph',
  size: 'large',
})`
  color: ${props => getTheme(props, 'list.descFontColor', DEFAULT_THEME.descFontColor)};
`;

export const StyledHeader = styled(View)`
  margin-left: ${cx(16)};
  margin-right: ${cx(16)};
  margin-top: 24px;
  margin-bottom: 8px;
`;

export const StyledHeaderText = styled(TYText).attrs({
  type: 'paragraph',
  size: 'normal',
})`
  color: ${props =>
    props.color || getTheme(props, 'list.subFontColor', DEFAULT_THEME.subFontColor)};
`;

export const StyledFooter = styled(View)`
  margin-left: ${cx(16)};
  margin-right: ${cx(16)};
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const StyledFooterText = styled(TYText).attrs({
  type: 'paragraph',
  size: 'normal',
})`
  color: ${props =>
    props.color || getTheme(props, 'list.subFontColor', DEFAULT_THEME.subFontColor)};
`;

export const StyledIconFont = props => {
  const { size, color, ...rest } = props;
  return (
    <ThemeConsumer>
      {theme => {
        const propsWithTheme = { ...props, theme };
        return (
          <IconFont
            size={size || 28}
            color={color || getTheme(propsWithTheme, 'list.iconColor', DEFAULT_THEME.iconColor)}
            {...rest}
          />
        );
      }}
    </ThemeConsumer>
  );
};

export const StyledImage = props => {
  const { style, ...rest } = props;
  return (
    <ThemeConsumer>
      {theme => {
        const propsWithTheme = { ...props, theme };
        const imageStyle = [
          props.size && { width: props.size, height: props.size },
          props.imageFollowIconColor && {
            tintColor:
              props.color || getTheme(propsWithTheme, 'list.iconColor', DEFAULT_THEME.iconColor),
          },
          style,
        ];
        return <Image style={imageStyle} {...rest} />;
      }}
    </ThemeConsumer>
  );
};

export const StyledArrowImage = props => (
  <StyledImage
    style={{ marginLeft: cx(6) }}
    source={require('../res/arrow.png')}
    imageFollowIconColor={true}
    {...props}
  />
);
