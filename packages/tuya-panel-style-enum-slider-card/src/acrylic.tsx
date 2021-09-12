import React, { useState, useEffect } from 'react';
import { AcrylicSliderCard } from 'tuya-panel-style-slider-card';
import { IEnumSliderCardProps, defaultProps } from './interface';

const AcrylicComponent: React.FC<IEnumSliderCardProps> = props => {
  const {
    data,
    sliderDotSize,
    sliderDotColor,
    activeSliderDotColor,
    handSlidingComplete,
    handValueChange,
    activeKey,
  } = props;

  const [value, setValue] = useState(0);

  useEffect(() => {
    let currentValue = 0;
    if (!activeKey) {
      currentValue = 0;
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === activeKey) {
          currentValue = i;
          break;
        }
      }
    }
    setValue(currentValue);
  }, [activeKey, data]);

  const dotStyle = {
    width: sliderDotSize,
    height: sliderDotSize,
    borderRadius: sliderDotSize,
  };

  const sliderProps = {
    useNoun: true,
    minNounStyle: {
      ...dotStyle,
      backgroundColor: activeSliderDotColor,
    },
    maxNounStyle: {
      ...dotStyle,
      backgroundColor: sliderDotColor,
    },
  };

  const onValueChange = _value => {
    setValue(_value);
    const { key } = data[_value];
    handValueChange && handValueChange(key, _value);
  };

  const onSlidingComplete = _value => {
    setValue(_value);
    const { key } = data[_value];
    handSlidingComplete && handSlidingComplete(key, _value);
  };

  return (
    <AcrylicSliderCard
      sliderProps={sliderProps}
      value={value}
      renderValue={_value => data[_value].label}
      {...props}
      minimumValue={0}
      stepValue={1}
      maximumValue={data ? data.length - 1 : 1}
      handValueChange={onValueChange}
      handSlidingComplete={onSlidingComplete}
    />
  );
};

AcrylicComponent.defaultProps = defaultProps;

export default AcrylicComponent;
