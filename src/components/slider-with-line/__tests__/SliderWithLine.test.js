import React from 'react';
import { shallow } from 'enzyme';
import SliderWithLine, { inRangeNumber } from '../index';

const setup = props => {
  const wrapper = shallow(<SliderWithLine style={{ width: 100, height: 100 }} {...props} />);
  return wrapper;
};

describe('SliderWithLine', () => {
  jest.useFakeTimers();
  it('basic render', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ maxValue: 43 });
    wrapper.instance().moving = true;
    wrapper.setProps({});
  });
  it('minDisabled render', () => {
    const wrapper = setup({ minDisabled: false, onSlidingStart: res => console.log(res) });
    let target = wrapper.findWhere(c => !!c.prop('onMoveShouldSetResponder'));
    target.simulate('startShouldSetResponder');
    target.simulate('startShouldSetResponderCapture', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    target.simulate('panResponderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({});
    wrapper.instance().moving = true;
    wrapper.setProps({});
  });
  it('PanResponder', () => {
    let wrapper = setup({ horizontal: false, width: 40, height: 327 });
    const instance = wrapper.instance();
    let target = wrapper.findWhere(c => !!c.prop('onMoveShouldSetResponder'));
    target.simulate('startShouldSetResponder');
    target.simulate('startShouldSetResponderCapture', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    target.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    instance._handleToValues();
    target.simulate('responderTerminate');
    target.simulate('responderRelease');
    target.simulate('responderTerminationRequest');
    wrapper = setup({ stepValue: 20 });
    target = wrapper.findWhere(c => !!c.prop('onMoveShouldSetResponder'));
    target.simulate('responderGrant', {
      nativeEvent: { locationX: 60, locationY: 0 },
      touchHistory: { touchBank: [] },
    });
    wrapper.instance().direction = 'min';
    target.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
  });
});
