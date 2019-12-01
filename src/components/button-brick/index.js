import React from 'react';
import PropTypes from 'prop-types';
import { ColorPropType } from 'react-native';
import Button from './button';
import { ThemeUtils } from '../../utils';

const { getTheme, ThemeConsumer, parseToStyle } = ThemeUtils;
const keysNeedToMerge = {
  wrapperStyle: {
    bgWidth: 'width',
    bgHeight: 'height',
    bgRadius: 'borderRadius',
    bgBorderWidth: 'borderWidth',
    bgBorder: 'borderColor',
    margin: 'margin',
    padding: 'padding',
    bgColor: 'backgroundColor',
  },
  textStyle: {
    fontSize: 'fontSize',
    fontColor: 'color',
  },
};

const ThemedBrickButton = props => {
  const { theme: localTheme, ...rest } = props;
  return (
    <ThemeConsumer>
      {globalTheme => {
        const theme = {
          ...globalTheme,
          brickButton: { ...globalTheme.brickButton, ...localTheme },
        };
        const propsWithTheme = { theme, ...rest };
        const {
          type,
          theme: {
            global: { brand },
          },
        } = propsWithTheme;
        const isBorderType = type === 'primaryBorder';
        const themedProps = {
          wrapperStyle: {
            backgroundColor: isBorderType ? 'transparent' : brand,
            borderColor: isBorderType ? brand : 'transparent',
          },
          textStyle: {
            color: isBorderType ? brand : '#fff',
          },
          style: {},
          loadingColor: getTheme(propsWithTheme, 'brickButton.loadingColor'),
          loadingBackground: getTheme(propsWithTheme, 'brickButton.loadingBackground'),
        };
        const keys = Object.keys(keysNeedToMerge);
        const keysFromThemeButton = keys.reduce(
          (pre, cur) => [...pre, ...Object.keys(keysNeedToMerge[cur])],
          []
        );
        keysFromThemeButton.forEach(key => {
          const path = `brickButton.${key}`;
          const _idx = keys.findIndex(it => key in keysNeedToMerge[it]);
          const result = getTheme(propsWithTheme, path);
          if (_idx !== -1 && result) {
            const indexer = keys[_idx];
            const target = themedProps[indexer];
            const curKey = keysNeedToMerge[indexer][key];
            if (['margin', 'padding'].includes(curKey)) {
              curKey === 'padding' && Object.assign(target, parseToStyle(result, curKey));
              curKey === 'margin' &&
                Object.assign(themedProps, {
                  style: parseToStyle(result, curKey),
                });
            } else {
              target[curKey] = result;
            }
          }
        });
        if (isBorderType) {
          themedProps.wrapperStyle = {
            ...themedProps.wrapperStyle,
            backgroundColor: 'transparent',
            borderColor: brand,
          };
          themedProps.textStyle = {
            ...themedProps.textStyle,
            color: brand,
          };
        }
        return <Button {...themedProps} {...rest} />;
      }}
    </ThemeConsumer>
  );
};

ThemedBrickButton.propTypes = {
  ...Button.propTypes,
  theme: PropTypes.shape({
    /**
     * 按钮字体大小
     */
    fontSize: PropTypes.number,

    /**
     * 按钮字体颜色
     */
    fontColor: ColorPropType,

    /**
     * 按钮borderRadius
     */
    bgRadius: PropTypes.number,

    /**
     * 按钮高度
     */
    bgHeight: PropTypes.number,

    /**
     * 按钮宽度
     */
    bgWidth: PropTypes.number,

    /**
     * 按钮外部margin
     */
    margin: PropTypes.array,

    /**
     * 按钮内部padding
     */
    padding: PropTypes.array,

    /**
     * 按钮背景色
     */
    bgColor: ColorPropType,

    /**
     * 按钮borderColor
     */
    bgBorder: ColorPropType,

    /**
     * 按钮borderWidth
     */
    bgBorderWidth: PropTypes.number,

    /**
     * loading主题色
     */
    loadingColor: ColorPropType,

    /**
     * loading背景色
     */
    loadingBackground: ColorPropType,
  }),
};

ThemedBrickButton.defaultProps = {
  theme: null,
};

export default ThemedBrickButton;
