import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Progress from '../index';

describe('Progress Component', () => {
  it('basic.render', () => {
    const component = renderer.create(
      <Progress
        foreColor="#1381FB"
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        value={50}
        startDegree={135}
        andDegree={270}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('stepValue = 0 render', () => {
    const component = renderer.create(
      <Progress
        foreColor="#1381FB"
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        value={50}
        startDegree={135}
        andDegree={270}
        stepValue={0}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('gradient.render', () => {
    const component = renderer.create(
      <Progress
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        value={50}
        startDegree={135}
        andDegree={270}
        renderCenterView={<View style={{ width: 40, height: 40 }} />}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('onValueChange.render', () => {
    const onValueChange = jest.fn();
    const component = renderer.create(
      <Progress
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        value={50}
        startDegree={135}
        andDegree={270}
        stepValue={0}
        needMaxCircle={true}
        needMinCircle={true}
        onValueChange={onValueChange}
      />
    );
    const { instance } = component.root;
    instance.onValueChange = onValueChange;
    instance.onValueChange(100);
    component.update(
      <Progress
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        value={100}
        stepValue={0}
        startDegree={135}
        andDegree={270}
        needMaxCircle={true}
        needMinCircle={true}
        onValueChange={onValueChange}
      />
    );
    expect(instance.onValueChange).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });

  it('countDegree === 360 render', () => {
    const onSlidingComplete = jest.fn();
    const component = renderer.create(
      <Progress
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        value={50}
        startDegree={135}
        andDegree={360}
        needMaxCircle={true}
        needMinCircle={true}
        onSlidingComplete={onSlidingComplete}
      />
    );
    const { instance } = component.root;
    instance.onSlidingComplete = onSlidingComplete;
    instance.onSlidingComplete(50);
    component.update(
      <Progress
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        value={100}
        startDegree={135}
        andDegree={270}
        needMaxCircle={true}
        needMinCircle={true}
        onSlidingComplete={onSlidingComplete}
      />
    );
    expect(instance.onSlidingComplete).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });
});

describe('Progress shallow', () => {
  it('basic render', () => {
    const component = shallow(<Progress value={0} />);
    const pander = component.find(View);
    pander.simulate('layout', { nativeEvent: { layout: {} } });
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { locationX: 60, locationY: 0 },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      gesture: { dx: 25, dy: 35 },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderTerminationRequest');
    pander.simulate('responderTerminate', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('startShouldSetResponderCapture', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('moveShouldSetPanResponderCapture');
    expect(component).toMatchSnapshot();
  });
});
