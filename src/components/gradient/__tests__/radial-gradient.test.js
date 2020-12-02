import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import RadialGradient from '../radial-gradient';

const radialGradient = {
  stops: [{
    offset: '0%',
    stopColor: 'red',
    stopOpacity: '1',
  }, {
    offset: '20%',
    stopColor: 'yellow',
    stopOpacity: '1',
  }, {
    offset: '40%',
    stopColor: 'blue',
    stopOpacity: '1',
  }],
  rx: '70%',
  ry: '90%',
  cx: '50%',
};

describe('RadialGradient Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <RadialGradient
        {...radialGradient}
      />
    );

    expect(component.root.instance.props.stops).toEqual(radialGradient.stops);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
