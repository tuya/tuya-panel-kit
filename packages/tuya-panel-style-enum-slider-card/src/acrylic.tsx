import React, { useState, useEffect } from 'react';
import { AcrylicSliderCard, SliderCardComponentProps } from 'tuya-panel-style-slider-card';
import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;

const defaultProps = {
  sliderDotSize: cx(4),
  sliderDotColor: 'rgba(255, 255, 255, 0.7)',
  activeSliderDotColor: 'rgba(255, 255, 255, 0.4)',
  canTouchTrack: true,
};

type EnumList = {
  label: string;
  key: string;
};

type omitProps =
  | 'minimumValue'
  | 'stepValue'
  | 'maximumValue'
  | 'handSlidingComplete'
  | 'handValueChange';

type Props = {
  data: Array<EnumList>;
  activeKey?: string;
  sliderDotSize?: number;
  sliderDotColor?: string; // 滑动块右边圆点的color
  activeSliderDotColor?: string; // 滑动块左边圆点的color
  handSlidingComplete?: (key: string, index: number) => void;
  handValueChange?: (key: string, index: number) => void;
} & Omit<SliderCardComponentProps, omitProps>;

const AcrylicComponent: React.FC<Props> = props => {
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
      silderProps={sliderProps}
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
