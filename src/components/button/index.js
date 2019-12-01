import PropTypes from 'prop-types';
import React from 'react';
import { ColorPropType } from 'react-native';
import Button from './button';
import { CoreUtils, ThemeUtils } from '../../utils';

const { isNil } = CoreUtils;
const { parseToStyle } = ThemeUtils;

const ThemedButton = props => {
  const { theme, wrapperStyle, style, textStyle, iconSize, iconColor, ...rest } = props;
  const themedWrapperStyle = [
    Array.isArray(theme.margin) && parseToStyle(theme.margin, 'margin'),
    wrapperStyle,
  ];
  const themedBtnStyle = [
    !isNil(theme.bgWidth) && { width: theme.bgWidth },
    !isNil(theme.bgHeight) && { height: theme.bgHeight },
    !isNil(theme.bgRadius) && { borderRadius: theme.bgRadius },
    theme.bgColor && { backgroundColor: theme.bgColor },
    style,
  ];
  const themedTextStyle = [
    !isNil(theme.fontSize) && { fontSize: theme.fontSize },
    theme.fontColor && { color: theme.fontColor },
    textStyle,
  ];
  return (
    <Button
      wrapperStyle={themedWrapperStyle}
      style={themedBtnStyle}
      textStyle={themedTextStyle}
      iconSize={iconSize || theme.iconSize}
      iconColor={iconColor || theme.iconColor}
      {...rest}
    />
  );
};

ThemedButton.propTypes = {
  ...Button.propTypes,
  theme: PropTypes.shape({
    /**
     * 按钮容器的边框
     */
    margin: PropTypes.array,
    /**
     * 按钮的文字大小
     */
    fontSize: PropTypes.number,
    /**
     * 按钮的文字颜色
     */
    fontColor: ColorPropType,
    /**
     * 按钮的Icon大小
     */
    iconSize: PropTypes.number,
    /**
     * 按钮的Icon颜色
     */
    iconColor: ColorPropType,
    /**
     * 按钮的背景宽度
     */
    bgWidth: PropTypes.number,
    /**
     * 按钮的背景高度
     */
    bgHeight: PropTypes.number,
    /**
     * 按钮的背景颜色
     */
    bgColor: ColorPropType,
  }),
};

ThemedButton.defaultProps = {
  theme: {},
};

export default ThemedButton;
