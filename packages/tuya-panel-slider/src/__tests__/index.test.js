/**
 * @jest-environment jsdom
 */
import 'react-native';
import React from 'react';
import { Image, View } from 'react-native';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ThemeSlider from '../index';
import { Utils } from 'tuya-panel-utils';
import Slider from '../slider';

const sliderHover = require('./res/slider_hover.png');

const { ThemeProvider } = Utils.ThemeUtils;

describe('ThemeSlider Component', () => {
  it('componentWillReceiveProps(nextProps)', () => {
    let wrapper = shallow(
      <Slider
        min={0}
        max={0}
        value={10}
        horizontal={false}
        disabled={true}
        renderMaximumTrack={() => <View style={{ height: 20, backgroundColor: 'red' }} />}
        renderMinimumTrack={() => <View style={{ height: 20, backgroundColor: 'blue' }} />}
        debugTouchArea={true}
        animateTransitions={true}
      />
    );
    wrapper.setProps({ value: 11 });
    wrapper.instance().touchLocked = true;
    wrapper.instance().setValue(1);
    wrapper.instance().touchLocked = false;
    wrapper.instance().setValue(2);
    wrapper = shallow(
      <Slider
        min={0}
        max={0}
        value={10}
        horizontal={false}
        disabled={true}
        renderMaximumTrack={() => <View style={{ height: 20, backgroundColor: 'red' }} />}
        renderMinimumTrack={() => <View style={{ height: 20, backgroundColor: 'blue' }} />}
        debugTouchArea={true}
        animateTransitions={false}
      />
    );
    wrapper.instance().touchLocked = false;
    wrapper.instance().setValue(2);
  });
  it('basic render', () => {
    const component = renderer.create(
      <ThemeProvider>
        <ThemeSlider />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('onlyMaximumTrack render', () => {
    const component = renderer.create(
      <ThemeProvider>
        <ThemeSlider onlyMaximumTrack={true} />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('horizontal render', () => {
    const fn = value => console.log(value, '=== value ===');
    const HorizontalSlider = ThemeSlider.Horizontal;

    const component = renderer.create(
      <ThemeProvider>
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
          renderThumb={() => <Image source={sliderHover} />}
          thumbStyle={{
            width: 300,
            height: 30,
            top: 36,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          minimumTrackTintColor="#4A90E2"
          maximumTrackTintColor="#50E3C2"
          horizontal={true}
        />
      </ThemeProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('vertical render', () => {
    const fn = value => console.log(value, '=== value ===');
    const VerticalSlider = ThemeSlider.Vertical;

    const component = renderer.create(
      <ThemeProvider>
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
          renderThumb={() => <Image source={sliderHover} />}
          thumbStyle={{
            width: 300,
            height: 30,
            top: 36,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          minimumTrackTintColor="#4A90E2"
          maximumTrackTintColor="#50E3C2"
        />
      </ThemeProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should update', () => {
    const fn = jest.fn();
    const component = renderer.create(
      <ThemeProvider>
        <ThemeSlider
          key="some-key"
          canTouchTrack={true}
          onValueChange={fn}
          value={0}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#4A90E2"
          maximumTrackTintColor="#50E3C2"
        />
      </ThemeProvider>
    );

    component.update(
      <ThemeProvider>
        <ThemeSlider
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
          minimumTrackTintColor="#4A90E2"
          maximumTrackTintColor="#50E3C2"
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('dpView render', () => {
    const NewHoc = ThemeSlider.dpView('View');
    const component = renderer.create(
      <NewHoc
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
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('basic render', () => {
    const wrapper1 = shallow(
      <Slider
        min={0}
        max={0}
        value={10}
        horizontal={false}
        disabled={true}
        renderMaximumTrack={() => <View style={{ height: 20, backgroundColor: 'red' }} />}
        renderMinimumTrack={() => <View style={{ height: 20, backgroundColor: 'blue' }} />}
        debugTouchArea={true}
      />
    );
    const wrapper2 = shallow(
      <Slider.Horizontal
        canTouchTrack={true}
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
      />
    );
    const wrapper3 = shallow(
      <Slider.Vertical
        canTouchTrack={true}
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
      />
    );
    const NewHoc = Slider.dpView('View');
    const wrapper4 = shallow(
      <NewHoc
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
      />
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper3).toMatchSnapshot();
    expect(wrapper4).toMatchSnapshot();
  });

  it(' render width allMeasured', () => {
    const wrapper = shallow(
      <Slider
        min={0}
        max={0}
        value={10}
        horizontal={true}
        canTouchTrack={true}
        animateTransitions={true}
        disabled={true}
      />
    );
    const wrapper1 = shallow(<Slider min={0} max={0} value={10} horizontal={false} />);
    wrapper.setState({
      allMeasured: true,
    });
    wrapper1.setState({
      allMeasured: true,
      disabled: true,
    });
    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );
    const pander1 = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderTerminationRequest');
    pander1.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper1).toMatchSnapshot();
  });

  it(' render width canTouchTrack', () => {
    const wrapper = shallow(
      <Slider
        min={0}
        max={0}
        value={10}
        horizontal={true}
        canTouchTrack={true}
        reverseValue={true}
      />
    );
    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderTerminationRequest');
    expect(wrapper).toMatchSnapshot();
  });

  it(' render width animateTransitions', () => {
    const wrapper = shallow(
      <Slider
        min={0}
        max={100}
        value={10}
        horizontal={true}
        animateTransitions={true}
        reverseValue={true}
        stepValue={5}
        onLayout={jest.fn()}
        horizontal={true}
        onValueChange={jest.fn()}
        onScrollEvent={jest.fn()}
        onSlidingStart={jest.fn()}
      />
    );

    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );

    const layout = wrapper.findWhere(c => !!c.prop('onLayout'));
    wrapper.instance()._containerSize = { width: 0, height: 0 };
    layout
      .at(0)
      .props()
      .onLayout({ nativeEvent: { layout: { width: 0, height: 0 } } });
    layout
      .at(1)
      .props()
      .onLayout({ nativeEvent: { layout: { width: 100, height: 100 } } });
    layout
      .at(2)
      .props()
      .onLayout({ nativeEvent: { layout: { width: 100, height: 100 } } });
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    wrapper.instance().oldValue = 100;
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderTerminationRequest');

    wrapper.update(
      <Slider
        min={0}
        max={100}
        value={30}
        horizontal={true}
        animateTransitions={true}
        reverseValue={true}
        stepValue={5}
        onLayout={jest.fn()}
        horizontal={true}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it(' render with useNoun = true', () => {
    const wrapper = shallow(
      <Slider
        theme={{
          width: 318,
          height: 6,
          trackRadius: 3,
          trackHeight: 6,
          thumbSize: 26,
          thumbRadius: 26,
          thumbTintColor: '#FFF',
          minimumTrackTintColor: '#57BCFB',
          maximumTrackTintColor: '#E3E9EE',
        }}
        style={{ marginVertical: 10 }}
        maximumValue={100}
        minimumValue={0}
        stepValue={25}
        useNoun={true}
        value={10}
        onValueChange={jest.fn()}
        minNounStyle={{ backgroundColor: '#f0f' }}
      />
    );

    const wrapper2 = shallow(
      <Slider
        theme={{
          width: 318,
          height: 46,
          trackRadius: 16,
          trackHeight: 46,
          thumbSize: 20,
          thumbRadius: 20,
          thumbTintColor: '#57BCFB',
          minimumTrackTintColor: '#57BCFB',
          maximumTrackTintColor: '#E3E9EE',
        }}
        maximumValue={100}
        stepValue={25}
        thumbStyle={{
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        type="parcel"
        useNoun={true}
        style={{ marginVertical: 10 }}
      />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
  });

  it(' render with useNoun = true vertical', () => {
    const wrapper = shallow(
      <Slider
        theme={{
          thumbSize: 20,
          thumbRadius: 20,
          thumbTintColor: '#57BCFB',
          minimumTrackTintColor: '#57BCFB',
          maximumTrackTintColor: '#E3E9EE',
        }}
        horizontal={false}
        type="parcel"
        trackStyle={{ width: 46, height: 200, borderRadius: 16 }}
        style={{ marginHorizontal: 10 }}
        value={0}
        minimumValue={0}
        maximumValue={100}
        reverseValue={true}
        thumbStyle={{
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        useNoun={true}
        stepValue={25}
        minNounStyle={{ backgroundColor: '#f0f' }}
      />
    );
    const wrapper2 = shallow(
      <Slider
        theme={{
          thumbSize: 26,
          thumbRadius: 26,
          thumbTintColor: '#FFF',
          minimumTrackTintColor: '#E3E9EE',
          maximumTrackTintColor: '#57BCFB',
        }}
        trackStyle={{ width: 6, height: 200, borderRadius: 3 }}
        style={{ marginHorizontal: 10 }}
        value={0}
        reverseValue={true}
        minimumValue={0}
        maximumValue={100}
        useNoun={true}
        stepValue={25}
        minNounStyle={{ backgroundColor: '#f0f' }}
        horizontal={false}
      />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
  });
});
