import PropTypes from 'prop-types';
import React from 'react';
import { ColorPropType } from 'react-native';
import Slider, { verticalStyles } from './slider';
import { CoreUtils, ThemeUtils } from '../../utils';

const { isNil } = CoreUtils;
const { getTheme, ThemeConsumer } = ThemeUtils;

const ThemedSlider = props => {
  const { theme: localTheme, ...rest } = props;
  return (
    <ThemeConsumer>
      {globalTheme => {
        const isHoriz = typeof props.horizontal === 'undefined' || props.horizontal;
        const theme = {
          ...globalTheme,
          slider: { ...globalTheme.slider, ...localTheme },
        };
        const propsWithTheme = { theme, ...rest };
        const width = getTheme(propsWithTheme, 'slider.width');
        const trackRadius = getTheme(propsWithTheme, 'slider.trackRadius');
        const trackHeight = getTheme(propsWithTheme, 'slider.trackHeight');
        const thumbSize = getTheme(propsWithTheme, 'slider.thumbSize');
        const thumbRadius = getTheme(propsWithTheme, 'slider.thumbRadius');
        const trackStyle = isHoriz ? { height: trackHeight } : { width: trackHeight };
        const themedProps = {
          style: isNil(width) ? null : { width },
          trackStyle: {
            borderRadius: trackRadius,
            ...trackStyle,
          },
          thumbStyle: {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbRadius,
          },
        };
        const keys = ['thumbTintColor', 'minimumTrackTintColor', 'maximumTrackTintColor'];
        keys.forEach(themeKey => {
          const path = `slider.${themeKey}`;
          themedProps[themeKey] = getTheme(propsWithTheme, path);
        });
        return <Slider {...themedProps} {...props} />;
      }}
    </ThemeConsumer>
  );
};

ThemedSlider.propTypes = {
  ...Slider.propTypes,
  theme: PropTypes.shape({
    /**
     * 滑块轨道宽度
     */
    width: PropTypes.number,
    /**
     * 滑块轨道圆角
     */
    trackRadius: PropTypes.number,
    /**
     * 滑块轨道高度
     */
    trackHeight: PropTypes.number,
    /**
     * 滑块圆球尺寸
     */
    thumbSize: PropTypes.number,
    /**
     * 滑块圆球圆角
     */
    thumbRadius: PropTypes.number,
    /**
     * 滑块圆球的背景色
     */
    thumbTintColor: ColorPropType,
    /**
     * 滑块小值轨道的背景色
     */
    minimumTrackTintColor: ColorPropType,
    /**
     * 滑块大值轨道的背景色
     */
    maximumTrackTintColor: ColorPropType,
  }),
};

ThemedSlider.defaultProps = {
  theme: null,
};

ThemedSlider.Vertical = _props => (
  <ThemedSlider {..._props} ref={_props.sliderRef} horizontal={false} styles={verticalStyles} />
);

ThemedSlider.Horizontal = _props => (
  <ThemedSlider {..._props} ref={_props.sliderRef} horizontal={true} />
);

ThemedSlider.dpView = WrappedComponent => _props => (
  <WrappedComponent
    {..._props}
    minimumValue={_props.min || _props.minimumValue}
    maximumValue={_props.max || _props.maximumValue}
    stepValue={_props.step || _props.stepValue}
  />
);

export default ThemedSlider;
