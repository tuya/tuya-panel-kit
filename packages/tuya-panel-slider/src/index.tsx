import React from 'react';
import { Utils } from 'tuya-panel-utils';
import Slider, { verticalStyles } from './slider';
import { IThemeSlider } from './interface';

const { isNil } = Utils.CoreUtils;
const { getTheme, ThemeConsumer } = Utils.ThemeUtils;

const ThemedSlider = (props: IThemeSlider) => {
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

ThemedSlider.defaultProps = {
  theme: null,
};

ThemedSlider.Vertical = _props => (
  <ThemedSlider {..._props} ref={_props.sliderRef} horizontal={false} styles={verticalStyles} />
);

ThemedSlider.Horizontal = _props => <ThemedSlider {..._props} ref={_props.sliderRef} horizontal />;

ThemedSlider.dpView = WrappedComponent => _props => (
  <WrappedComponent
    {..._props}
    minimumValue={_props.min || _props.minimumValue}
    maximumValue={_props.max || _props.maximumValue}
    stepValue={_props.step || _props.stepValue}
  />
);

export default ThemedSlider;
