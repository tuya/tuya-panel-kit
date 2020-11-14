import React from 'react';
import PropTypes from 'prop-types';
import { ColorPropType } from 'react-native';
import SwitchButton from './switch-button';
import { ThemeUtils } from '../../utils';

const { getTheme, ThemeConsumer } = ThemeUtils;

const ThemedSwitchButton = props => {
  const { theme: localTheme, size, ...rest } = props;
  return (
    <ThemeConsumer>
      {globalTheme => {
        const theme = {
          ...globalTheme,
          switchButton: { ...globalTheme.switchButton, ...localTheme },
        };
        const propsWithTheme = { theme, ...rest };
        const { onTintColor } = rest;
        const isGradient = onTintColor && typeof onTintColor === 'object';
        // 1、在 满足isGradient为true的情况下，传onText、offText属性，且不为空。
        // 2、在 满足isGradient为true的情况下，没传onText、offText属性，使用默认。
        const hasText =
          (rest.onText !== undefined &&
            rest.offText !== undefined &&
            !!rest.onText &&
            !!rest.offText) ||
          (rest.onText === undefined && rest.offText === undefined);
        const themedProps = {
          size: {
            width:
              isGradient && hasText
                ? getTheme(propsWithTheme, 'switchButton.width') + 9
                : getTheme(propsWithTheme, 'switchButton.width'),
            height: getTheme(propsWithTheme, 'switchButton.height'),
            activeSize: getTheme(propsWithTheme, 'switchButton.thumbSize'),
            margin: getTheme(propsWithTheme, 'switchButton.margin'),
            ...size,
          },
        };

        const keys = ['tintColor', 'onTintColor', 'thumbTintColor', 'onThumbTintColor'];
        keys.forEach(themeKey => {
          const path = `switchButton.${themeKey}`;
          themedProps[themeKey] = getTheme(propsWithTheme, path);
        });
        return <SwitchButton {...themedProps} {...rest} />;
      }}
    </ThemeConsumer>
  );
};

ThemedSwitchButton.propTypes = {
  ...SwitchButton.propTypes,
  theme: PropTypes.shape({
    /**
     * 开关轨道宽度
     */
    width: PropTypes.number,
    /**
     * 开关轨道高度
     */
    height: PropTypes.number,
    /**
     * 开关圆球尺寸
     */
    thumbSize: PropTypes.number,
    /**
     * 开关圆球距离轨道边距
     */
    margin: PropTypes.number,
    /**
     * 轨道未激活的背景色
     */
    tintColor: ColorPropType,
    /**
     * 轨道激活的背景色
     */
    onTintColor: ColorPropType,
    /**
     * 圆球未激活的背景色
     */
    thumbTintColor: ColorPropType,
    /**
     * 圆球激活的背景色
     */
    onThumbTintColor: ColorPropType,
  }),
};

ThemedSwitchButton.defaultProps = {
  theme: null,
};

export default ThemedSwitchButton;
