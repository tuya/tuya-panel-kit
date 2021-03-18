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
    wrapper.setProps({});
    wrapper.instance().moving = true;
    wrapper.setProps({});
  });
  it('Test method', () => {
    let wrapper = setup({ style: {} });
    wrapper.instance().toValue();
    wrapper.instance().calcValues();
    wrapper.instance().releaseMove();
    jest.runOnlyPendingTimers();
    inRangeNumber();

    wrapper = setup({ style: {}, onMoveRelease: () => {} });
    wrapper.instance().releaseMove();
    wrapper.instance().onValueChange();

    wrapper = setup({ style: {}, onValueChange: () => {} });
    wrapper.instance().onValueChange();
  });
  it('PanResponder', () => {
    let wrapper = setup({ maxValuePercentRange: [1, 2] });
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
    target.simulate('responderTerminationRequest');
    wrapper = setup({ minValuePercentRange: [1, 2], maxValuePercentRange: {} });
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
