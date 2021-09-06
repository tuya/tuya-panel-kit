import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Utils } from 'tuya-panel-utils';
import { IconFont } from 'tuya-panel-kit';
import TYText from 'tuya-panel-text';
import { defaultTheme } from 'tuya-panel-theme';

const { getTheme, ThemeConsumer } = Utils.ThemeUtils;
const { isIos, isIphoneX, statusBarHeight } = Utils.RatioUtils;

const DEFAULT_THEME = defaultTheme.topbar.light;

const ALIGN_ITEMS_MAP = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const TOPBAR_MARGIN = 6;
export const TOPBAR_HEIGHT = isIos ? (isIphoneX ? 88 : 64) : 56;
export const TOPBAR_ACTION_WIDTH = 17;
export const TOPBAR_ACTION_TEXT_WIDTH = 78;

export const StyledTopBarContainer = styled(View)`
  align-self: stretch;
  height: ${TOPBAR_HEIGHT}px;
`;

export const StyledTopBar = styled(View)`
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  height: ${isIos ? TOPBAR_HEIGHT - statusBarHeight : TOPBAR_HEIGHT};
  margin-top: ${isIos ? statusBarHeight : 0};
`;

export const StyledTopBarContent = styled(View)`
  position: absolute;
  height: 100%;
  align-self: center;
  align-items: ${(props: { align: 'left' | 'center' | 'right' }) =>
    ALIGN_ITEMS_MAP[props.align] || 'center'};
  justify-content: center;
`;

export const StyledTopBarTitle = styled(TYText).attrs({
  type: 'title',
  size: 17,
})`
  font-weight: 500;
  color: ${props => props.color || getTheme(props, 'topbar.color', DEFAULT_THEME.color)};
`;

export const StyledTopBarSubTitle = styled(TYText).attrs({
  type: 'paragraph',
  size: 'normal',
})`
  color: ${props => props.color || getTheme(props, 'topbar.color', DEFAULT_THEME.color)};
`;

export const StyledTopBarAction = styled(TouchableOpacity)`
  width: ${TOPBAR_ACTION_WIDTH}px;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const StyledTopBarText = styled(TYText)`
  font-size: 16px;
  color: ${props => props.color || getTheme(props, 'topbar.color', DEFAULT_THEME.color)};
`;

export const StyledImage = props => {
  const { style, ...rest } = props;
  return (
    <ThemeConsumer>
      {theme => {
        const propsWithTheme = { ...props, theme };
        const imageStyle = [
          {
            tintColor: props.color || getTheme(propsWithTheme, 'topbar.color', DEFAULT_THEME.color),
          },
          style,
        ];
        return <Image style={imageStyle} {...rest} />;
      }}
    </ThemeConsumer>
  );
};

export const StyledIconFont = props => {
  const { color, ...rest } = props;
  return (
    <ThemeConsumer>
      {theme => {
        const propsWithTheme = { ...props, theme };
        return (
          <IconFont
            color={color || getTheme(propsWithTheme, 'topbar.color', DEFAULT_THEME.color)}
            {...rest}
          />
        );
      }}
    </ThemeConsumer>
  );
};
