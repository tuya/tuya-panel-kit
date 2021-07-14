import { Animated } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import RotationView from '../index';

Animated.timing = jest.fn((height, config) => {
  return {
    start: jest.fn(callback => callback()),
  };
});

describe('RotationView Component', () => {
  it('basic render', () => {
    const component = renderer.create(<RotationView active={true} />);
    expect(component.toJSON()).toMatchSnapshot();

    const component2 = renderer.create(<RotationView active={false} />);
    expect(component2.toJSON()).toMatchSnapshot();
  });

  it('should update properly', () => {
    const component = renderer.create(<RotationView active={true} key="some-key" />);
    const { instance } = component.root;
    instance.startAnimation = jest.fn();
    const spy = jest.spyOn(instance, 'stopAnimation');
    jest.useFakeTimers();
    jest.runAllTimers();

    component.update(<RotationView active={false} key="some-key" />);
    expect(spy).toHaveBeenCalled();

    component.update(<RotationView active={true} key="some-key" />);
    expect(instance.startAnimation).toHaveBeenCalled();

    instance.componentWillUnmount();
    expect(instance.stopAnimation).toHaveBeenCalled();
  });
});
