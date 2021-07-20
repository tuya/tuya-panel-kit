import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Progress from '../index';

describe('Progress-Space Component', () => {
  it('basic.render', () => {
    const component = renderer.create(
      <Progress.Space
        foreColor="#1381FB"
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        scaleNumber={70}
        value={50}
        startDegree={135}
        andDegree={270}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('gradient.render', () => {
    const component = renderer.create(
      <Progress.Space
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        scaleNumber={70}
        value={50}
        startDegree={135}
        andDegree={270}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('render with update', () => {
    const component = renderer.create(
      <Progress.Space
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        scaleNumber={70}
        value={50}
        startDegree={135}
        andDegree={270}
      />
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Progress.Space
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        scaleNumber={70}
        value={43}
        startDegree={135}
        andDegree={270}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('render with startDegree', () => {
    const component = renderer.create(
      <Progress.Space
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        scaleNumber={70}
        value={50}
        startDegree={425}
        andDegree={370}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });
});

describe('Space component', () => {
  it('render with shallow', () => {
    const component = shallow(
      <Progress.Space
        foreColor="#1381FB"
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        scaleNumber={70}
        value={50}
        startDegree={135}
        andDegree={270}
      />
    );
    const pander = component.find(View);
    component.instance().onMove({}, { locationX: 2, locationY: 1 });
    pander.simulate('layout', { nativeEvent: { layout: {} } });
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { locationX: 60, locationY: 0 },
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
