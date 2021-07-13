import React from 'react';
import { shallow } from 'enzyme';
import Gesture from '../gesture';

const setup = (props = {}) => {
  return shallow(<Gesture {...props} />);
};

describe('Gesture Component', () => {
  it('basic render', () => {
    const wrapper = setup({ disabled: true });
    expect(wrapper).toMatchSnapshot();
    const target = wrapper.findWhere(c => !!c.prop('onResponderMove'));
    target.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    target.simulate('moveShouldSetResponder');
    target.simulate('responderGrant', {
      nativeEvent: { locationX: 60, locationY: 0 },
      touchHistory: { touchBank: [] },
    });
    wrapper.instance()._initialMoveDirection = undefined;
    wrapper.instance()._layout = { width: 100, height: 50 };
    target.props().onResponderMove({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    target.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    target.simulate('responderTerminationRequest');
    target.simulate('responderTerminate', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    target.props().onStartShouldSetResponderCapture({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    target.props().onMoveShouldSetResponderCapture({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    target.simulate('moveShouldSetResponder');
    wrapper.instance().getETargetId();
    wrapper.instance().getInitialMoveDirection();
    wrapper.instance().getTouchDirection(100, 50);
  });
  it('onLayout & onResponderMove', () => {
    const wrapper = setup();
    const target = wrapper.findWhere(c => !!c.prop('onLayout'));
    target.props().onLayout({
      nativeEvent: {
        layout: {
          height: 100,
          width: 100,
        },
      },
    });
  });
  it('disable', () => {
    const wrapper = setup({ disabled: false });
    const target = wrapper.findWhere(c => !!c.prop('onResponderMove'));
    wrapper.instance()._initialMoveDirection = 'right';
    target.props().onResponderMove({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    target.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    target.simulate('moveShouldSetResponder');
  });
});
