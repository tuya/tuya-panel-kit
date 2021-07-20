import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Progress from '../index';

describe('Progress-Compose Component', () => {
  it('basic.render', () => {
    const component = renderer.create(
      <Progress.Compose
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        startColor="#1381FB"
        thumbRadius2={4}
        scaleNumber={70}
        value1={50}
        value2={10}
        startDegree1={135}
        andDegree2={270}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('basic.render with foreColor', () => {
    const component = renderer.create(
      <Progress.Compose
        foreColor="#1381FB"
        style={{ width: 100, height: 100 }}
        startColor="#1381FB"
        thumbRadius2={4}
        scaleNumber={70}
        value1={50}
        value2={10}
        startDegree1={135}
        andDegree2={270}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('basic.render with update', () => {
    const component = renderer.create(
      <Progress.Compose
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        startColor="#1381FB"
        thumbRadius2={4}
        scaleNumber={70}
        value1={50}
        value2={10}
        startDegree1={135}
        andDegree2={270}
      />
    );
    component.update(
      <Progress.Compose
        foreColor={{
          '0%': '#1381FB',
          '100%': '#00C36C',
        }}
        style={{ width: 100, height: 100 }}
        startColor="#1381FB"
        thumbRadius2={4}
        scaleNumber={70}
        value1={10}
        value2={20}
        startDegree1={135}
        andDegree2={270}
      />
    );
    expect(component).toMatchSnapshot();
  });
});

describe('Compose Component', () => {
  it('panel render', () => {
    const component = shallow(
      <Progress.Compose
        foreColor="#1381FB"
        style={{ width: 100, height: 100 }}
        needMaxCircle={true}
        startColor="#1381FB"
        thumbRadius={4}
        scaleNumber={70}
        value1={10}
        value2={20}
        andDegree1={390}
        reduceDegree2={460}
        startDegree={135}
        andDegree={270}
      />
    );
    const pander = component.find(View);
    pander.simulate('layout', { nativeEvent: { layout: {} } });
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
