import React from 'react';
import {
  Image,
} from 'react-native';
import renderer from 'react-test-renderer';
import Slider from '../index';

const sliderHover = require('./res/slider_hover.png');

describe('Slider Component', () => {
  it('basic render', () => {
    const component = renderer.create(<Slider />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('onlyMaximumTrack render', () => {
    const component = renderer.create(<Slider onlyMaximumTrack={true} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('horizontal render', () => {
    const fn = value => console.log(value, '=== value ===');
    const HorizontalSlider = Slider.Horizontal;

    const component = renderer.create(
      <HorizontalSlider
        canTouchTrack={true}
        onValueChange={fn}
        value={24}
        minimumValue={0}
        maximumValue={100}
        onlyMaximumTrack={false}
        style={{
          width: 300,
          height: 48,
        }}
        trackStyle={{
          width: 300,
          height: 30,
          top: 36,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        renderThumb={() =>
          (<Image
            source={sliderHover}
           />)
        }
        thumbStyle={{
          width: 300,
          height: 30,
          top: 36,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        minimumTrackTintColor={'#4A90E2'}
        maximumTrackTintColor={'#50E3C2'}
        horizontal={true} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('vertical render', () => {
    const fn = value => console.log(value, '=== value ===');
    const VerticalSlider = Slider.Vertical;

    const component = renderer.create(
      <VerticalSlider
        canTouchTrack={true}
        onValueChange={fn}
        value={24}
        minimumValue={0}
        maximumValue={100}
        style={{
          width: 300,
          height: 48,
        }}
        trackStyle={{
          width: 300,
          height: 30,
          top: 36,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        renderThumb={() =>
          (<Image
            source={sliderHover}
           />)
        }
        thumbStyle={{
          width: 300,
          height: 30,
          top: 36,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        minimumTrackTintColor={'#4A90E2'}
        maximumTrackTintColor={'#50E3C2'}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should update', () => {
    const fn = jest.fn();
    const component = renderer.create(
      <Slider
        key="some-key"
        canTouchTrack={true}
        onValueChange={fn}
        value={0}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor={'#4A90E2'}
        maximumTrackTintColor={'#50E3C2'}
      />
    );
    component.update(
      <Slider
        key="some-key"
        style={{
          width: 300,
          height: 48,
        }}
        trackStyle={{
          width: 300,
          height: 30,
          top: 36,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        canTouchTrack={true}
        onValueChange={fn}
        value={50}
        minimumValue={0}
        maximumValue={100}
        disabled={true}
        minimumTrackTintColor={'#4A90E2'}
        maximumTrackTintColor={'#50E3C2'}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should gesture respond properly', () => {
    const SLIDER_WIDTH = 300;
    const THUMB_SIZE = 24;
    const onSlidingStart = jest.fn();
    const onValueChange = jest.fn();
    const onSlidingComplete = jest.fn();
    const component = renderer.create(
      <Slider
        key="some-key"
        style={{
          width: SLIDER_WIDTH,
          height: 48,
        }}
        thumbStyle={{
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: THUMB_SIZE / 2,
        }}
        canTouchTrack={true}
        onSlidingStart={onSlidingStart}
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
        value={0}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor={'#4A90E2'}
        maximumTrackTintColor={'#50E3C2'}
      />
    );
    const instance = component.root.instance;
    instance._handlePanResponderGrant({ nativeEvent: { locationX: 50, locationY: 100 } });
    expect(onSlidingStart).toHaveBeenCalled();

    instance._handlePanResponderMove({ nativeEvent: { locationX: 50, locationY: 100 } }, { dx: 50, dy: 0 });
    expect(onValueChange).toHaveBeenCalled();

    instance._handlePanResponderEnd({ nativeEvent: { locationX: 50, locationY: 100 } }, { dx: 60, dy: 0 });
    expect(onSlidingComplete).toHaveBeenCalled();
  })
});
