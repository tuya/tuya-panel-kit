import React from 'react';
import { Utils } from 'tuya-panel-utils';
import SwitchButton from './switch';
import { IThemeSwitchProps } from './interface';

const { getTheme, ThemeConsumer } = Utils.ThemeUtils;

const ThemedSwitchButton = (props: IThemeSwitchProps) => {
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

ThemedSwitchButton.defaultProps = {
  theme: null,
};

export default ThemedSwitchButton;
export type SwitchProps = IThemeSwitchProps;
