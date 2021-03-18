import React from 'react';
import { shallow } from 'enzyme';
import SliderProgress from '../index';

const setup = props => {
  const wrapper = shallow(<SliderProgress {...props} />);
  return wrapper;
};
describe('Name of the group', () => {
  it('componentWillReceiveProps', () => {
    let wrapper = setup({ value: '' });
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ value: 9 });
    wrapper = setup();
    wrapper.setProps({ value: '' });
  });
  it('PanResponder', () => {
    let wrapper = setup({ disabled: true });
    wrapper.instance()._handlePanResponderGrant({ nativeEvent: {} });
    let result = wrapper.instance()._handleStartShouldSetPanResponder();
    expect(result).toEqual(false);

    wrapper = setup({ disabled: false });
    result = wrapper.instance()._handleStartShouldSetPanResponder();
    expect(result).toEqual(true);

    wrapper.instance()._handleMoveShouldSetPanResponder();
    wrapper.instance()._handlePanResponderGrant({ nativeEvent: {} });

    wrapper.instance().moveDirection = 'middle';
    wrapper.instance()._handleMove({}, { dx: -10 });

    wrapper.instance()._handleMove({}, { dx: 10 });
    wrapper.instance().moveDirection = 'min';
    wrapper.instance()._handleMove({}, { dx: 10 });
    wrapper.instance().ifCanMove = false;
    wrapper.instance()._handleMove({}, { dx: 10 });
    wrapper = setup({ disabled: true });
    wrapper.instance()._handleMove({}, { dx: 10 });
  });
  it('_handleMove', () => {
    const wrapper = setup({ disabled: false });
    wrapper.instance().moveDirection = 'middle';
    wrapper.instance().isSingle = false;
    wrapper.instance()._handleMove({}, { dx: 10 });
  });
  it('_handleRelease', () => {
    let wrapper = setup({ disabled: true });
    wrapper.instance()._handleRelease({}, { dx: 10 });

    wrapper = setup({ disabled: false });
    wrapper.instance().isSingle = false;
    wrapper.instance()._handleRelease({}, { dx: 10 });
    wrapper.instance().isSingle = true;
    wrapper.instance()._handleRelease({}, { dx: 10 });

    wrapper.instance().ifCanMove = false;
    wrapper.instance()._handleRelease({}, { dx: 10 });
  });

  it('_getWhichMove', () => {
    let wrapper = setup({ ifAllowClick: false });
    wrapper.instance()._getWhichMove({}, { dx: 10 });
    wrapper = setup({ ifAllowClick: true });
    wrapper.instance().isSingle = false;
    wrapper.instance()._getWhichMove();
  });

  it('_getValueByGestureEvent', () => {
    const wrapper = setup({ ifAllowClick: false });
    wrapper.instance()._getValueByGestureEvent({ nativeEvent: { locationX: 10 } });
    wrapper.setState({ maxValue: 10, minValue: 9 });
    wrapper.instance().isSingle = false;
    wrapper.instance()._getValueByGestureEvent({ nativeEvent: { locationX: 10 } });
  });
});
